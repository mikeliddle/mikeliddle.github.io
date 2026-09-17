---
layout: post
title: "Pangolin and Dynamic NSG Rules"
author: mike
categories: [Technology, Homelab]
image: assets/img/pangolin.jpg
thumb: assets/img/pangolin-346.jpg
tags: [Technology, Homelab, DDNS, Azure]
description: "When your ISP rotates your IP, this can break your remote access setup. Scripting can easily help you stay connected"
---

## The Problem

Earlier this week my ISP suffered a fiber cut. The internet at our house was
down for about 8 hours, which forced me to work from my office instead of at
home. Normally when I work in my office, I'm able to access my home music server
to listen to music while I work. However, with my internet being out, I wasn't
able to access that (obviously). I can deal with that for a day, however, my
inability to connect to my homelab didn't end with that day.

The next day at work, I saw 502 errors coming back from all my resources instead
of 200s. I tried to look a bit deeper, but didn't have much luck. When I got
home, I logged into my Azure portal and looked at the NSG firewall rules for my
Pangolin VM. I had an issue before where I think someone maybe got access to my
VM and did something violating Azure's Terms of Service, resulting in my account
getting suspended, so I set up NSG firewall rules to restrict any ports I intended
to open to my home IP address, except for HTTPS. This would mean that if I
wanted to SSH into that VM, or connect back to the Pangolin VM, it would block
if my homelab moved IPs, or if someone tried to access my server that wasn't me.

As you can guess, when my internet came back on, my ISP's CGNAT assigned my
connection a different public IP address. It ended in 145 instead of 141.
Fixing it was simple, but who's to say when that would happen next?

## The Solution

Being competent in scripting and having used Azure before, there was a simple
solution. Write a cron job that would authenticate as a service principal with
its own credentials to my Azure tenant, compare the IP there with my public IP,
and update the NSG details if they don't match. Getting my public IP is easy,
just use jq to parse the response from jsonip.com. Note, you can't easily grab
your public IP from your machine since your public IP is what other people see,
not what your machine sees.

Steps:

1. Get my public IP address (jsonip.com)
2. Log in to my Azure account.
3. Pull the NSG rules and compare the IP addresses.
4. Update the NSG rules if they were different.

And since this isn't a regular occurrence for me, I decided to just run the job
once per day.

### Azure Setup

The script authenticates with an App Registration and its service principal
rather than my personal Azure account. To create and authorize it in the Azure
portal:

1. Open **Microsoft Entra ID**, then **App registrations**.
2. Select **New registration**, give the application a name, and register it.
3. Record the **Application (client) ID** and **Directory (tenant) ID** from the app's overview page.
4. Open **Certificates & secrets**, create a client secret, and save its value somewhere secure. Azure only displays the secret value once.
5. Navigate to the Network Security Group containing the rules that the script will update.
6. Open **Access control (IAM)** on the NSG and select **Add role assignment**.
7. Choose the **Network Contributor** role. On the members page, select **User, group, or service principal**, then select the App Registration by name and complete the assignment.

The role must be assigned on the NSG, not just the VM. Azure treats them as
separate resources, so a role assignment scoped to the VM does not grant access
to its NSG.

I store the credentials and resource names in a root-readable environment file
at `/etc/homelab/azure-nsg-ip.env` rather than putting secrets in the script:

```bash
export AZURE_CLIENT_ID='<application-client-id>'
export AZURE_CLIENT_SECRET='<client-secret>'
export AZURE_TENANT_ID='<tenant-id>'
export AZURE_SUBSCRIPTION_ID='<subscription-id>'
export AZURE_RESOURCE_GROUP='<resource-group-containing-the-nsg>'
export AZURE_NSG_NAME='<nsg-name>'
export SSH_RULE_NAME='<existing-ssh-rule-name>'
export PANGOLIN_RULE_NAME='<existing-pangolin-rule-name>'
```

The host running the job also needs Bash, Azure CLI, `curl`, and `jq` installed.

<!-- markdownlint-disable MD010 -->

```bash
#!/usr/bin/env bash

set -euo pipefail

readonly JSONIP_URL="${JSONIP_URL:-https://jsonip.com}"

required_commands=(az curl jq)
for command_name in "${required_commands[@]}"; do
	if ! command -v "$command_name" >/dev/null 2>&1; then
		echo "Error: required command '$command_name' was not found." >&2
		exit 1
	fi
done

required_variables=(
	AZURE_CLIENT_ID
	AZURE_CLIENT_SECRET
	AZURE_TENANT_ID
	AZURE_SUBSCRIPTION_ID
	AZURE_RESOURCE_GROUP
	AZURE_NSG_NAME
	SSH_RULE_NAME
	PANGOLIN_RULE_NAME
)
for variable_name in "${required_variables[@]}"; do
	if [[ -z "${!variable_name:-}" ]]; then
		echo "Error: required environment variable '$variable_name' is not set." >&2
		exit 1
	fi
done

created_config_dir=0
if [[ -z "${AZURE_CONFIG_DIR:-}" ]]; then
	AZURE_CONFIG_DIR="$(mktemp -d)"
	created_config_dir=1
fi
export AZURE_CONFIG_DIR

cleanup() {
	if [[ "$created_config_dir" -eq 1 ]]; then
		rm -rf "$AZURE_CONFIG_DIR"
	fi
}
trap cleanup EXIT

public_ip="$(
	curl --fail --silent --show-error --location --ipv4 \
		--connect-timeout 10 --max-time 30 "$JSONIP_URL" |
		jq --exit-status --raw-output '.ip | select(type == "string" and length > 0)'
)"

if [[ ! "$public_ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]]; then
	echo "Error: jsonip.com did not return a valid IPv4 address." >&2
	exit 1
fi

IFS='.' read -r -a public_ip_octets <<< "$public_ip"
for octet in "${public_ip_octets[@]}"; do
	if ((10#$octet > 255)); then
		echo "Error: jsonip.com did not return a valid IPv4 address." >&2
		exit 1
	fi
done

desired_source="${public_ip}/32"

az login \
	--service-principal \
	--username "$AZURE_CLIENT_ID" \
	--password "$AZURE_CLIENT_SECRET" \
	--tenant "$AZURE_TENANT_ID" \
	--output none
az account set --subscription "$AZURE_SUBSCRIPTION_ID"

rule_matches_source() {
	local rule_json="$1"

	jq --exit-status \
		--arg bare "$public_ip" \
		--arg cidr "$desired_source" \
		'[.sourceAddressPrefixes[]?,
			(.sourceAddressPrefix? | select(. != null and . != ""))] as $sources |
		 (($sources | length) == 1) and
		 (($sources[0] == $bare) or ($sources[0] == $cidr))' \
		<<< "$rule_json" >/dev/null
}

reconcile_rule() {
	local rule_name="$1"
	local rule_json

	rule_json="$(
		az network nsg rule show \
			--resource-group "$AZURE_RESOURCE_GROUP" \
			--nsg-name "$AZURE_NSG_NAME" \
			--name "$rule_name" \
			--query '{sourceAddressPrefix:sourceAddressPrefix,sourceAddressPrefixes:sourceAddressPrefixes}' \
			--output json
	)"

	if rule_matches_source "$rule_json"; then
		echo "Rule '$rule_name' already allows $desired_source; no change."
		return
	fi

	az network nsg rule update \
		--resource-group "$AZURE_RESOURCE_GROUP" \
		--nsg-name "$AZURE_NSG_NAME" \
		--name "$rule_name" \
		--source-address-prefixes "$desired_source" \
		--output none
	echo "Updated rule '$rule_name' source to $desired_source."
}

reconcile_rule "$SSH_RULE_NAME"
reconcile_rule "$PANGOLIN_RULE_NAME"
```

<!-- markdownlint-enable MD010 -->

### Scheduling the Job

I added the job to root's crontab with `sudo crontab -e`. This runs it every
morning at 5:00 AM in the host's local timezone and appends its output to a log:

```cron
0 5 * * * . /etc/homelab/azure-nsg-ip.env && /usr/local/sbin/azure_nsg_public_ip >> /var/log/azure-nsg-public-ip.log 2>&1
```

## Considerations

I've considered whitelisting a subnet that my ISP uses, but have decided against
that for now, since I don't control any of these IPs, so limiting the blast
radius as much as possible seems reasonable. This does require me accounting for
public IP rotations since I don't pay for a static IP.

Pangolin health checks have caused issues on some of my services in the past, so
I had to enable a local DNS caching service on my Newt VM. I looked at this
during the troubleshooting steps since this had caused issues in the past. Wasn't
the issue this time.

I use Pangolin in Azure since I have free Azure credits through work. Pangolin
puts me in control of the data and makes it so I'm in control of policies and
compliance. If some company decides that Plex, music streaming, or other data
transit isn't what they want, they can't block it if I'm hosting Pangolin.
Cloudflare explicitly doesn't like people doing video streaming over their
tunnels, and generally pointing things at your home's public IP creates a large
threat surface at your home's entry point. Why bother with this -- stay safe.
