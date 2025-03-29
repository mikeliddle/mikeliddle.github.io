---
layout: post
title: "Filtering Over AI"
author: mike
categories: ["AI", "project", "technology"]
tags: ["AI", "project", "technology"]
image: assets/img/drain.jpg
thumb: assets/img/drain-346.jpg
description: "To reduce the cost of AI, we need to filter requests before they hit the generative AI."
featured: true
---

# AI: The Cost

Anyone familiar with generative AI knows that it is expensive. Companies are investing in creating their own chips to avoid paying exorbitant amounts to nvidia and other third parties for GPUs. Then you have the energy efficiency. Microsoft, Google, and others have started looking to nuclear energy to power their data centers to subsidize the investments they are making to their AI platforms.

Have you ever paused to think about how much it costs to build and run a nuclear power plant? Or create a chip fabrication plant and hire the experts able to engineer and manufacture new chips? I'll give you a hint: These companies are multi-trillion dollar companies and have taken a hit to their stock price to invest in these projects. It's so significant to investors, that it represents a percentage of their market cap. It's a billion dollar number. And that's just the startup cost. Ongoing operations? Let's hope it pays off.

While generative AI has generated a lot of hype lately, and significant investments, AI has been around for a long time. Spell-checkers are a form of AI. So are search engines. We've had AI in so many things for so long, but without the recognition that this was AI. Why? Because it wasn't ever intelligent. It still isn't, but it has grown significantly. The big benefit to generative AI comes from the entropy that is fed into these models. In order to mimic the randomness of human thought, in order to create something that feels real, you need to introduce an element of randomness. Even in earlier AI models this was a necessity for non-deterministic problems. The more randomness you introduce, however, the more likely your answer is wrong. That's part of the reason why generative AI struggles so much with math and basic logic questions. It's trying to predict the next token, not answer the question. While those are very similar, they are not the same. In fact, in math, they are fatally different.

This randomness requires extensive data sets to coalesce into a useful output. And since we've had such incredible growth in computing power (via GPUs, Networking improvements, and NVMe storage), we have access to these large data sets and a way to put them to use. But why on earth would I try to get an image generator to answer a math question? Sure it could probably do it, but why?

# Filtering

This is why the industry needs to adopt more request filtering. Classifiers have been around for a lot longer than generative AI, and do a great job of taking even natural language and classifying it into a set of categories. This is a much simpler problem than generative AI, and can be done much faster. Why don't we fix generative AI by filtering out some requests and evaluating them based on a classification. Classification can be done cheaply, and efficiently, and many times, a generative AI is unnecessary to answer.

"But," you might ask, "why would you ask a chatbot a question it shouldn't answer?" Well, the powers that be are trying to make these ubiquitous, so by design, they should be the one-stop shop for all questions and interactions. Even though they are bad at it. This is why it is on the service owners to filter out requests and decide how to best answer them. For example, asking a chatbot, "What is 2+2?" can easily be classified as a math question. This can be fed into a simple, or even highly complex calculator, which would give an accurate, deterministic answer. That is what people want from math. I don't want a lesson on number theory or a hallucinated answer. I want the answer.

Similarly with search, some people access sites by going to google and typing, "gmail." Then clicking the first link. Why do you need to submit that prompt to an expensive AI, which will cost significant amounts of money to process when you could just link me to the site that is an exact match for my text query? Sure, give me a copilot button if I do want to interact with the AI and get the longer question, but why are you spending so much money on features that users actively dislike, or ignore?

# Architecture

How would we structure this? Let's imagine ourselves an API that looks like this (ignoring pagination to keep this simple):

**Search Endpoint**

- **URL**: `/search`
- **Method**: `GET`
- **Description**: Allows users to perform a search query. Requires an authentication token in the request header.
- **Headers**:

```
Authorization: Bearer <token>
```

- **Query Parameters**:
  - `q` (string): The search query.
  - `force` (boolean): Optional. If true, the request is re-evaluated.
- **Response**:

```json
{
  "results": [
    {
      "id": "string",
      "type": "search",
      "title": "string",
      "url": "string",
      "snippet": "string",
      "iconRef": "string"
    },
    {
      "id": "string",
      "type": "prompt",
      "title": "string",
      "content": "string"
    }, ...
  ],
  "total": "integer"
}
```

When you hit this endpoint, the service knows where you're coming from (IP), who you are (token), and what you're asking for (query). When you submit a query, your request is first authenticated. Then, you'll be passed on to the authenticated cache layer. If you've asked the question before (within a cache lifetime), let's make this deterministic and give you the same result unless you specifically ask for a new one. Cache lookups are fast, easy, and cheap. The next layer you'd move onto is the classifier. This takes a bit more time than a cache hit, but if you're question is a math question, forward the request to our math service. If we can determine its a website you're looking for, let's do a simple web search based on your location and who you are, just like google used to do. Let's say you have a question though. That would then be fed into the generative AI as a last resort, to try to answer your question. It still is useful to do the web search along with that, since generative AI lacks a lot of intelligence. But we can apply that filtering again now that we understand it better.

# Stepping Forward

I mentioned taking the filtering further. There's this concept called "Vibe Coding" where the thesis is you feed the AI prompts and you embrace what it gives you. Don't like what you get back, or it doesn't work? Re-roll. What a way to spend a million dollars. Why should I ever have to re-roll? With programming, where you have programs built to tell you if something will run and if not, why, why are we getting bad answers? Why can't we include a filter as part of our generative AI to weed out bad results before they happen? Why aren't we adding a filter layer during the token generation that is able to identify interpreter/compiler errors and correct them without a user needing to engage again, and likely again. This back and forth gets very expensive, and needlessly so. If you find a compilation error, its often a one-line error. Even re-rolling a single line with extra input, is much cheaper than re-rolling an entire prompt.

We can use this classifier layered with AI to give the user better results every time. And this will result in the user wanting to adopt AI even more, instead of getting frustrated and deciding its not worth the headache. Part of the classification output could be re-tokenizing the request to make it better for the AI to consume. People have started "Prompt Engineering" courses, by why should we have to learn how to talk with a computer when we can talk to a person "just fine?" I mean, if these classes are going to make people more civil and better at communicating, by all means, everyone should be in them. But I don't think people should need to learn how to talk to a computer differently for it to do what they want if our goal is to make these tasks easier. Calculators work so well because they are intuitive to someone who understands math, not just to the engineers who build and design calculators.

That healthy abstraction should be considered the minimum bar for generative AI. End-users are nutoriously stubborn and excellent at breaking expectations. We shouldn't try to have them get good, instead the AI should get good and understand what someone wants better. If you want ubiquity from an AI, it should make things easier coming from where you are, you shouldn't have to learn new skills in order to get the output you expect or want.

# Conclusion

All of this is not to take away from the advantage that is non-deterministic entropy in AI. The thing that makes generative AI so expensive is what makes it so versatile, useful, and powerful. The issue is, most of our problems don't need that power. We don't need to smash a fly with a bulldozer. We don't need to use a generative AI to do simple calculations, or direct us to what should be a bookmarked site. We don't need to re-solve solved problems. We should consider filtering requests to make our AI more intelligent and less expensive.
