---
layout:            post
title:             "Valeton GP-200 Teardown"
menutitle:         "Valeton GP-200 Teardown"
category:          Technology
author:            mike
image:             assets/img/GP200/GP200Back.jpg
thumb:             assets/img/GP200/GP200Back.jpg
tags:              [Music, Technology]
---

Recently while working on my midi bass project, I thought, "hey, I have a
multi-effect pedal which has both unbalanced and balanced outputs, I wonder if I
can reverse engineer that circuit and copy it for my own." So I got started
taking apart my Valeton GP-200, and had some fun learnings.

## The Teardown

Taking apart the Valeton GP-200 is not hard. First, remove the 5 machine screws
on the front o fthe unit. There are also 8 short machine screws on the back, 4
self-tapping screws for the XLR balanced jacks, and 6 nuts holding the TRS jacks
in place. Once you remove those, the back panel can swing free, but be careful.
The power switch has a short connector going from the button back to a PCB,
which is hard to disconnect while the rest of the unit is put together. From the
bottom, you will need to remove the 4 corner feet (you can leave the middle two
feet attached), a longer machine screw in the middle of two corners, and 2 more
machine screws in a line underneath the expression pedal. Once you remove those,
the bottom panel can be removed, revealing the PCBs mounted to the top panel.

## The Microcontroller

Once you remove the bottom panel, there is a small aluminum heatspreader that
catches your eye. By removing the two machine screws keeping that in place, you
can remove a daughter-board which houses the brain of this unit, the
MIMXRT106FDVL6B. This little microcontroller houses a single Arm Cortex M7 core
clocked at 600MHz, 1MB of onboard flash, and some multimedia features useful for
driving the LCD on this unit. Interestingly enough, I chose a similar CPU
(STM32H750) to drive my midi-synth project.

On the other side of the daughter board is a 256MB SDRAM chip which I'm guessing
is needed for holding the effects chain models during processing, but I'm no
expert in DSP.

## Other Circuitry of Note

Obviously with basic tools I'm not going to be able to reverse engineer the
circuits, however, I did find it interesting to note which components were being
used, and based on logical groupings on the PCB, it made sense which components
were paired with which circuits.

The first Circuit I was able to identify was the MIDI input circuit. The Midi
inputs are right next to the Microcontroller, but there's a little unmarked IC
with 6 legs, which I believe is an optocoupler. This is required for proper MIDI
input functionality to isolate incoming voltage from the rest of the operational
voltage. There are also two diodes, which are part of basic midi circuits. There
isn't anything to special or noteworthy about this circuit, and a quick google
of "MIDI Input Circuit" will give you a similar result design.

The board also uses a lot of 8-bit shift registers. Interestingly, there are
different shift registers, even though they are all 8-bit shift registers,
likely for combining the various digital inputs from the MFX unit. While one
side of the board is packed with capacitors, OP Amps and ports, the other has a
bunch of shift registers near where the rotary encoders, and breakout boards for
the foot switches attach.

As an example, there were several ICs around the board with the marking "SGM
82702XS8 N2EKC" which are OP Amps.

https://www.nxp.com/part/MIMXRT106FDVL6B#/

{% include responsive-image.html src="/assets/img/GP200/20240613_162721.jpg" alt="Opened Valeton GP-200 chassis showing the main circuit board, footswitch daughterboard, and ribbon cables" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_162802.jpg" alt="Angled view of the balanced XLR output board and its chassis grounding clips" width="1800" height="1014" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_162806.jpg" alt="Top-down view of the XLR output daughterboard with its ribbon connector and chassis lugs" width="1800" height="1014" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_162829.jpg" alt="Audio input and output section with quarter-inch jacks and capacitors secured by white adhesive" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_162834.jpg" alt="Top view of the quarter-inch audio jack solder joints and nearby analog input circuitry" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_162844.jpg" alt="Digital processing section of the GP-200 mainboard with an RF shield and USB-C port" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163118.jpg" alt="Upper footswitch circuit board with tactile switches and LED indicators" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163123.jpg" alt="Rear solder side of the footswitch circuit board mounted inside the upper chassis" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163137.jpg" alt="Chassis cavity showing the expression pedal pivot assembly and optical sensor bracket" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163156.jpg" alt="Close-up of the expression pedal axle, spring-loaded tensioner, and chassis pivot mount" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163202.jpg" alt="Mainboard section with front-panel rotary encoder terminals and logic shift registers" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163206.jpg" alt="Close-up of parallel-input and serial-output shift register chips on the mainboard" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163216.jpg" alt="Analog audio signal path with SGM8270 dual operational amplifiers and passive components" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163222.jpg" alt="Close-up of NE5532 low-noise operational amplifiers on the main audio board" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163225.jpg" alt="NE5532 operational amplifiers surrounded by surface-mount resistors and capacitors" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163229.jpg" alt="Audio converter section with a Cirrus Logic CS4272 stereo codec and support circuitry" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163233.jpg" alt="Close-up of the Cirrus Logic CS4272 audio codec integrated circuit" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163236.jpg" alt="Mainboard cutouts and ground-plane traces around the rear audio jack sockets" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163300.jpg" alt="Front-panel display connector and ribbon cable header on the main circuit board" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163319.jpg" alt="Expression pedal optical sensor module circuit board removed from the chassis" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163324.jpg" alt="Reverse side of the optical sensor board with its emitter, detector, and ribbon connector" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163332.jpg" alt="Underside of the removed expression pedal treadle with its optical interrupter vane" width="1800" height="3198" %}
{% include responsive-image.html src="/assets/img/GP200/20240613_163339.jpg" alt="Fully disassembled Valeton GP-200 with chassis parts, circuit boards, and hardware laid out" width="1800" height="3198" %}

## Future Steps

I hope to be able to look into this interesting hardware more, however it's been
a long time since I last wrote. It looks like I need to figure out how to
publish articles more regularly before I can take more time for longer projects
like this.
