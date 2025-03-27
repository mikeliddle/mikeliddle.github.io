---
layout: default
title: Projects
permalink: /Projects
---

# Projects



## LiddleLaboratory.com

This is a personal website I created to showcase my projects and passions. It is built using Jekyll and hosted on Github Pages. It is helping me to stay sharp on my markdown syntax, which I use for doc writing frequently, as well as play around with some fun technologies.

The largest effort here is going towards the blog side of the site. The blog's primary purpose is to help me practice my communication skills. Secondary to that is sharing the cool projects I am working on and the lessons I learn along the way. I am hoping to use this blog to help me practice writing in a more concise and clear manner, as well as to help me learn how to communicate my ideas better.

## STM32H7 Tutorial

While working on my midi bass pedal project, I found that there was a lack of good resources specific to the H7 line from STM. I decided to create a tutorial walking through the process of programming for this microcontroller. The tutorial is a work in progress, but serves the purpose of helping me learn the technologies I'm unfamiliar with, like SPI, I2C, etc. and also provide a deep explanation of these technologies and how to use them on the H7 line of processors.

As a note on this, I deeply hate when people rely on code generation, IDE's, and other abstractions in tutorials, so I try to dive deeper into the reasoning behind the generated code and explore what is really necessary and why.

## MIDI Bass Pedals

This is an ongoing project to create a clone of the Moog Taurus pedals. I am using the STM32H750 MCU to power both the MIDI and input processing, as well as the Synthesizer portion of this project.

## Microsoft Tunnel

At Microsoft, I was on the team that created Microsoft Tunnel. This is a VPN solution based on the openconnect protocol targeted to Enterprise customers. I was specifically responsible for the AuthN/Z flows for our VPN management Agent, and AuthZ for the clients to the VPN server. I also worked on some miscellaneous features in the UX and Microservice, before focusing on the iOS client in Defender and SDK.

The iOS SDK was targeting unmanaged devices, and used techniques like swizzling, to intercept network traffic at the app layer, before wrapping it in an encrypted VPN packet and routing it off the device. This required deep knowledge of iOS's app lifecycle, the networking stack, and webkit on top of the networking specific knowledge (HTTP, TLS, TCP/UDP, Browser APIs, JS APIs, etc.).
