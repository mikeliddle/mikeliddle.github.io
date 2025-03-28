---
layout:            post
title:             "Cross-Signed Certificates"
menutitle:         "Cross-Signed Certificates and Distributed Trust"
category:          Technology
description:      "Cross-signed certificates allow for distributed trust in a system. This is important for redundancy and security."
image:            assets/img/certificates-350.jpg
author:            mike
tags:              X509 X.509 Cryptography Trust DistributedSystems
---

# Who do you trust?

One of the earliest internet protocols was http. Very quickly, engineers
discovered a need to secure content that they sent/received. This lead to
the development of the HTTPS, SSL, and TLS protocols. One of the main
features to this protocol is the reliance on X.509 Certificates[^1]. The
idea behind certificates is that developers can go to a central authority,
request authorization, and have a certificate that others can trust, if they
trust that central authority.

This works just fine if every connecting agent has trusts that central authority,
however, due to the complexities of X.509 Certificates, trust verification, and
the diversity of revocation checking methods, certificate revocation is
effectively broken for websites, with most major browsers performing a "best
effort" check if they check at all.

Sometimes Certification Authorities are compromised though. In 2011, a reseller
(RA) for Comodo (one of the largest CAs) was compromised, allowing several
fraudulent certificates to be issued and trusted for google.com and other major
domains. Later that year, DigiNotar was also compromised, issuing more fraudulent
certs. The mitigation was to revoke the intermediate cert/root cert that was
compromised, and remove the certificate from each computer's trust store. Doing so,
however, eliminated trust for all sites who could be trusted, but had certificates
issued by Comodo's reseller or DigiNotar. So those sites were effectively offline
until their certificates were re-issued (which is not a definite time frame).

# Cross-Signing

Cross-signing a certificate allows for a private/public key pair to be signed
by multiple CA's. By getting a cross-signed certificate, you effectively have
two certificates that can be used interchangeably depending on trust. In a
distributed environment, each node could have a trust authority, with which it
issues a certificate. That certificate can then be used to verify trust as, if
we trust our peer, and they trust another node, we can trust that node.

Along the same lines, having multiple certificates allows for redundancy in a
system. If our node has a certificate issued by Comodo and Digicert, and
our system was operating during 2011, once Comodo was removed from trust on
the different nodes, the nodes would continue to operate uninterrupted because
of the redundant certificate.

This issue is rare, however, with computational power increasing every year,
as well as connectivity speeds, it is increasingly difficult to detect a
compromise. This leads many systems to rotate certificates on a regular interval
so that even if the certificate is compromised, it can't damage the system for any
significant period of time.

[^1]: [X.509 on Wikipedia](https://en.wikipedia.org/wiki/X.509)