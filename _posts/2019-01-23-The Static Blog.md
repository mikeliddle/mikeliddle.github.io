---
layout:            post
title:             "The Static Blog"
menutitle:         "The Static Blog"
category:          Technology
author:            mliddle
tags:              Static Blogging
---

# The Static Blog

This is my first attempt at making a static blog. I recently realized that I would
have to switch my hosting providers and wanted to find a free way to host a blog
and my website. My website was made using static HTML pages and a javascript framework
(which was, of course, overkill) which is easy to host from github pages or a similar
service. So I changed my DNS entry for my domain and my website was live from github.

The issue came, however, when I decided I wanted to start my own tech blog. Suddenly
I had memories of Wordpress come to me and I thought, "hey, maybe a CMS like Wordpress
is the best option." It's not hard to map a subdomain to another IP and host a site
somewhere else, but then I run into the problem that it isn't free. The problem with
a CMS is that you need some sort of back-end management system, whether that's a MySQL
database and templating engine, like wordpress uses, or just a dynamic templating engine.

So I looked on Google how to make a static blog, not using a CMS. I still rely on a
templating engine and template[^1], but since all the pages can be statically generated,
I don't have to worry about having a live back-end system that manages the content. I
decided that Jekyll would be the best option, first because Github supports it, but also,
it has a large community of support, I can write articles using markdown, and I don't
have to worry about any styling.

My reasoning for blogging is simple: I have experience that others can enjoy as well. I
enjoy watching videos on YouTube or reading tech blogs that talk about the cool projects
people have worked on, as well as reviews of the latest and greatest technology. Similarly,
I enjoy reading the experiences others have in their careers and learning from their
experiences.

[^1]: This template was taken from JekyllDecent by jwillmer on Github
