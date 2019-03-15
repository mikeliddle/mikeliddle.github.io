---
layout:            post
title:             "Designing a Web API 2"
menutitle:         "Designing a Web API 2 - TrashTalk"
category:          Technology
author:            ML
tags:              Web APIs
---

# Cap Theorem Revisited

In my previous article I discussed using multiple databases
as a method of achieving availability while using an RDBMS.
I would like to amend my previous statements and stat that
availability is what we should be prioritizing however,
currently, we are achieving consistency, not availability,
and therefore we should switch databases as we scale, but
this is too large a task to undertake at the scale we are
currently dealing with.

# Resources and Endpoints

Now we will review the design decisions employed in
creating the TrashTalk Web API. We will review the
structural choices of the resources as well as the
underlying database structures representing those resources.

## User Management

This is probably my least favorite part of this project. How
many articles are there that talk about good API design in
many ways? A ton. What about smart user management and
authorization? Barely any. Then we wonder why developers
store passwords in plaintext.

[Passlib](https://passlib.readthedocs.io/en/stable/) is a
great library in Python that helps developers use best
practices. Passlib automatically generates globally unique
salts for each password as it hashes it, and provides easy
interfaces for developers to hash and verify passwords with
a variety of algorithms.

During a design principles class at BYU, the professor, Dr.
Scott Woodfield, emphasized that we shouldn't get caught up
in datatypes. In other words, for design purposes, an
address shouldn't just be a string. An address is a type of
itself, just like a person, a leg, even an age could have
special properties or constraints making it a unique type.
In avoiding type obsession, and to allow for flexibility in
future implementations, I have found it useful to separate
Users from Contacts, Roles, and Authorization entities.

With this design, A user has an Authorization entity
allowing it to login and become authorized with our server.
A contact can exist independent of a User, but a User has a
contact representing the name, phone, email, and other
contact information the real person behind the user has. A
role can now be a flexible datatype instead of a simple
string, and can be a collection of permissions which we can
use to determine which resources a user is authorized to
use.

Some might think that the above method is overkill. And
maybe it is for a small project, but there is definitely
good worth in that method when you are working on a large
enterprise-class system.

Long story short, User-Management can be tricky, but make
sure to salt and hash your passwords, and don't get stuck
in the realm of type-obsession. Flexibility now can pay out
big down the road.

## Containers, Events, Locations, and Sensors

While designing this API, we quickly ran into some big
design questions: What happens when you have two containers
at the same location, one with two sensors, one with one,
and both sensors have around 100 events that are reported.
How do you store that in a database?

The choice we made was to have a location resource that had
a latitude and longitude, as well as a name. Each container
would have a name, an ID, a location, and a type. Sensors
would reference their company and which container they
belonged to. Events were stored in their own table and had
a sensor id reference.

This allowed flexibility for the above described situation,
but created a need for a couple of left outer joins in our
SQL query which aren't very efficient. The positive side,
though, is that the system works better than before. Before,
using firebase, the code would loop over every event the
container had (which could be thousands), just to find the
most recent. Now, that order is much easier to enforce, and
the collections looped over are rather small.

## Routes

This is an endpoint we are still battling with. Currently, a
route has no guaranteed order as defined on the back-end. We
need to somehow adjust that, likely by migrating this
endpoint to a NOSQL database, where it is easy to enforce
an ordering for a collection.
