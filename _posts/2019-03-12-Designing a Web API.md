---
layout:            post
title:             "Designing a Web API"
menutitle:         "Designing a Web API - TrashTalk"
category:          Technology
author:            mike
tags:              WebAPIs
---

# Where to start

In designing the Web API for TrashTalk, there are many thing I would do
different. With that disclaimer, the approach I took was making the best
of what I had. I was given a team of 7 students and whatever we knew to
work with.

The first step was to understand what the web application needed to do.
I met with the founder of this company and reviewed the requirements and
put into words a more formal specification. I then chose a chief architect
from the team and we set out on creating an architectural document and
specification. We designed the initial database and outlined the routes
and how the routes should look, then turned to the team and started
working.

The first step to any good web API is a clear specification of
functionality and resources. Without that, you'll never know what to build.

## Technologies

My dad, a Ph.D. in Computer Science, recently asked me about our technology
decisions going into this project. My answer to him as to why we chose Vue
and Flask on an Apache server was, "That's what most people knew." Our
front-end developers all knew Vue, and one was very proficient in setting
up a Vue project. Likewise, the back-end developers all knew python, and
one had experience setting up a flask project from scratch. I had
experience setting up, configuring, and maintaining Apache servers. So the
choice was made. Use what you know when you need to move fast.

Now, reflecting on our choices, the technologies employed fit our needs
really well. Our Database is currently hosted through AWS using their
database tools, and our server is an EC2 virtual server. The plan is to
migrate the code to a serverless setup, reducing expenses and increasing
performance. Flask applications transfer to serverless systems very easily
so the choice to use Flask as an application framework was great!

Vue.js has been less promising. We serve the pages statically, but being a
SPA, it's still hard to get a lot of good SEO on our page, though not
too difficult, and it takes a little while to build the site and migrate,
but using a separate build server and deploying the static pages only would
speed up the deploy process and should be happening already.

## Databases and CAP Theorem

We chose a relational database for a couple of reasons:

1. We can afford to localize data into separate databases per customer or groupings of customers.
2. RDBMS's are very fast at filtering data and getting specific pieces of data or joining related resources even without direct id's.
3. We knew how to run SQL queries.

Looking at the data and how we use it, a relational database is an ok fit,
excluding two use-cases, and we care most about availability. Partitions
are easy to handle by having multiple databases and a serverless
architecture. Localities can be directed to different regions on AWS and
multiple services can cooperate easily without knowing about each other.
Availability is achieved by moving serverless and having multiple
databases and auto-scaling those. These are known problems.

### A note on SQL vs NOSQL

The data we are using is largely relational however, using a NOSQL database
might fit better for our use case on getting the container status. If I
have a database table for sensor events, telling us fill-level, and
containers, telling us where the container is and how big it is, I need to
perform a few Left Outer Joins in order to get the resource as we would
like it. Previously, we used firebase, and needed to loop over the entire
dataset to find which event was the most recent and then use it. This was
almost just as bad as what we have moved to. Instead of this, we've
discussed having a NOSQL database that would store the most recent event
for each sensor. This removes the need for Left Outer Joins, and speeds up
the process of getting a container's status, which occurs very frequently.

Another potential use-case is our routes. A route consists of an ID,
company information, and an ordered collection of containers. Since order
is significant, we want to have an easy way of enforcing that, which could
be acheived in a NOSQL database. This has been done in SQL databases
before, and works there, but we could simplify this with a NOSQL database.

## Resources

This will be covered in my next article.
