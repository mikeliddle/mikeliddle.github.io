---
layout:            post
title:             "Abstraction"
menutitle:         "Abstraction - The Key to Software"
math:              true
category:          Technology
author:            mliddle
tags:              Abstraction and Computer Science
---

# What is Abstraction

Abstraction is taking a narrow system and defining it generally. For
example, Writing pseudo-code takes a narrow system, and defines it in more
general terms (a set of human instructions). From this, we can develop
testable algorithms, which perform operations and yield a result. These can
be translated into machine code, program language code, rule-sets, etc. We
separate language/framework/implementation details from the functionality
and process itself.

## Example of Abstraction

This is not something that we are born doing. We develop this skill as we
grow and our brain develops. Some people are also more capable of thinking
abstractly than others. I was speaking to my wife, an elementary education
major, who grew up loving math, being one of the best in her school at it,
who loves playing music and is really good at it, yet she struggles to
think abstractly. We got in a discussion on the meaning of the word
"Schema." She used it referring to child development, and how children
have mental schemas of things in the world around them. For example, a
child who grows up with a dog learns very quickly that a dog has fur, that
dogs bark, they have teeth, that they are fun to play with, that they like
to lick you, etc. These are pieces that form a child's "Schema" of a dog.

I then tried to make the jump that, a schema doesn't have to be just a mental representation, but let's think of it as a classification model. A
schema is the attributes that let us determine what something is or what we know about it. For a person, we usually have names, birth dates, hair color, eye color, height, weight, etc. We can generalize a model about people that looks something like this:[^1]

```json
{
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98052",
    "streetAddress": "20341 Whitworth Institute 405 N. Whitworth"
  },
  "colleague": [
    "http://www.xyz.edu/students/alicejones.html",
    "http://www.xyz.edu/students/bobsmith.html"
  ],
  "email": "mailto:jane-doe@xyz.edu",
  "image": "janedoe.jpg",
  "jobTitle": "Professor",
  "name": "Jane Doe",
  "telephone": "(425) 123-4567",
  "url": "http://www.janedoe.com"
}
```

She didn't make the jump. Long before I pulled out the JSON schema, she
lost me since computers don't have a brain, they can't have a schema. This
is a manifestation of a lack of abstraction. Schema is much more general
than a JSON representation of the structure of an object, or a mental model
of a dog. Computer Science uses many terms in their most general
definition. Terms like, Schema, Set, Collection, Value, Function, Object,
Interface, Array, etc. We do have a tendency to use these terms in jargon,
however, the definition used is the most generic.

[^1]: [Schema.org](https://schema.org/Person)