---
layout: post
title: "AI For Juniors"
author: mike
menutitle: "AI For Juniors"
category: Technology
image: assets/img/blog-thumbnail.jpg
thumb: assets/img/blog-thumbnail-346.jpg
tags: [AI, Technology]
description: "AI can be a huge detriment to junior engineers onboarding to projects and learning valuable skills. Here is what to look out for, and how to leverage it to your benefit."
---

# AI Investments

At my work, there's been a lot of pressure to learn to use AI in our job. I was told that our company has invested so heavily in AI, that if some of the bets don't pay off, there would be widespread layoffs at our company. Since we are a tech company building out AI products, this isn't surprising. The issue that comes with this encouragement is that unlike most products we've shipped, AI sounds like a big unknown. We are encouraged to "Learn how to apply AI to our products", "Learn how to leverage AI to be more productive", but not told "Here's how AI will help you be more productive."

While this doesn't seem like a big problem, it leads to a troubling conclusion: No one really knows what AI has in store for us in the future. Most of the companies building out AI systems don't really have measured numbers that show how this will pay for itself, and how it will actually change humanity. This means our company is relying on us to generate the use-case, and the solution, which can pay off massively if we as engineers are passionate about using it, but can also lead to a lot of wasted time and money if we are not careful.

## AI: Junior problems

I heard AI described recently as having the "form of intelligence, but not the substance." I agree strongly with this sentiment. When you examine the output of a chat prompt, you see something that is surprisingly sophisticated, but as you dig deeper, you realize that there is a lack of underlying proof and substance. Take for example a pull request I recently reviewed at work:

We had a junior engineer assigned to write tests confirming specific authorization claims were properly validated. The PR had around 8 files, with obvious signs of AI involvement. The most obvious was that the merge validation pipeline was failing in the build stage after several revisions with build errors that should have easily been caught locally. The code didn't compile. Second, were odd patterns being used which didn't align with our codebase (different query languages mentioned in tests, odd namings, new interface patterns, etc.). The final code stink, was random edits across the codebase that appeared to have no relation to the changes mentioned in the PR. Some of these were functionally impacting, some were not (throwing an error was removed in one random file, some whitespace was removed in another, variable renaming for different casing, etc.).

Trusting this engineer to do their job, I spent time reviewing this change and giving feedback on ways to improve. While reviewing the actual test code, however, I got confused. There was a ServiceTestHelper, which was named in a way to suggest it provided an abstraction layer around our service code, likely simplifying some dependency injection, state configuration, or mock setup; 2 new test files; and an auth claim helper class. The auth claim helper class wasn't referenced anywhere in the changes, so eventually it was removed, and we narrowed in on this ServiceTestHelper class. I tried to understand how it connected to our service code, then realized, it didn't. It was a wrapper around the dotnet HttpClient class, providing an interface for Post/Get/Put against an arbitrary endpoint, with a URI, and claims object.

So I looked at the tests. Random routes were being tested that didn't lineup with our service. Where did those come from? Then I looked at the Test Initialization code. The HttpClient's functions were being mocked as well. So this PR, that had accumulated over $1000 of engineering time was a change to add a mock HTTP client, and test it to make sure the values returned by the mock, were the expected mock values. While I was reviewing this PR, the engineer kept updating the PR since the build was still failing. They also were closing comments with arbitrary, and often wrong changes.

One of those changes was a separate engineer noting, "It looks like this test, just tests your mock." So they removed a couple of lines, and closed the comment saying it was fixed.

Its easy to look at this story and blame the junior engineer, calling them incompetent, oblivious, lazy, but I don't think that is the case. I think this is a case of AI gone wrong for junior developers. This engineer's background is not in dotnet service code. They didn't understand how we used tokens, claims, OData, or how our magical test framework ran our service code for component/scenario tests. They were given a task they didn't understand in an unfamiliar codebase, and followed the vibes.

This is one of many experiences that have led me to believe that AI is like a chainsaw. And while I enjoy using a chainsaw to cut down a dead tree, I don't think you should hand a chainsaw to a child and ask them to figure out how to use it.

## AI Smell

If you can identify the bad patterns, the smell, that AI leaves behind, you can learn to avoid them. Here are some of the most common ones I've seen in my work, and how to avoid them.

### 1. Hallucinated APIs, Compile Errors

The first and easiest smell to identify is a hallucinated API. I can't tell you how many APIs, powershell modules, and libraries I've been recommended to use that just plain don't exist. This is a common problem with AI, since it seeks to solve your pattern. While AI has made great strides in understanding which modules exist, it still doesn't actually compile the code, and often won't use tools to search for existing APIs/modules. (MCPs have potential to help this assuming they are properly configured for the language and packages you are concerned with).

Bottom line: Don't assume that AI generated code will ever compile first time. It usually won't.

### 2. Unexplainable Output

The second smell is when you can't explain the output of the AI. Asking the engineer in the above examples why they did things resulted in ambiguous non-answers. If you are going to use AI to generate code, you need to be the first reviewer. This is a big pitfall for junior engineers especially, since AI can produce complex patterns and leverage advanced language features that junior engineers may not be aware of. How do you overcome this? Take the time to understand the code before you submit it for review. Ask the AI to explain parts of the code. Ask it to explain the patterns it used, and provide reasoning for its solution. Take time to think critically about the possible edge cases that could exist with the solution. Think about the security and privacy implications if applicable.

Thinking critically is an important skill for engineers to have and it is hard to develop, especially in the era of AI. Take time to review the AI's output like you would as a senior engineer reviewing a PR on a codebase they need to maintain. Add comments, look for ways to optimize, and think about the functionality and design. Are there better ways to do this? Does it actually do what the customer needs it to do? Is it secure? Taking this time is the best thing you can do when using AI to generate code.

### 3. The Path of Popularity

The third smell is when you see your intended solution replaced with what is popular. You ask for some database test queries, and instead of using the query language that is prevalent in your codebase, you get SQL. Instead of using the test framework that your codebase relies on, you're given JUnit. AI can try to shake itself from the chains of what's popular, but it will always fall back to the mainstream solution. This is a large issue for companies who like to build internal tools, or use custom implementations of common products/protocols. It is also an issue for products which operate on the technological edge and benefit from the ever-improving landscape of modern software development. AI will always be slower to adopt new technologies as long as it is trained on past data.

There are several good reasons to use something other than the mainstream solution. And if you're not able to figure out how to use a library from its documentation and source code, you need to practice reading documentation, and source code. AI can assist with this, but how are you going to justify your choice of library when you don't know what the library does? You shouldn't just accept that what's popular is right all of the time. Sometimes it might be, and other times it'll cost 10x your company's annual recurring revenue in infrastructure costs alone. As a good engineer, you need to defend design choices, and explain the considerations that go into the decisions you make. You can't do this, if you don't understand the decision that was made for you by an AI.

## AI is not the problem

If it isn't obvious from the above prose, using AI is not the problem. Engineers of all experience levels can successfully use AI and accelerate their growth and abilities with this miraculous tool. As a junior engineer, you need to be deliberate in your use of AI that you are prompting in a way that moves you forward, instead of it moving forward without you. If you are using it to generate code, you are the first reviewer. You are to first become the expert, then present it to your team. You will miss things and that is expected of junior engineers, but you will learn from the process instead of just being a proxy. You need to leverage AI to help you think critically.

If AI is going to replace junior engineers, it won't be because it is as good as a university graduate. It will be because university graduates are not what they should be. When we look at great technologies like AI which have a capacity to change the world, we need to be at the cusp adapting with it. If AI is credited with making life easier for companies shoveling out code, it should be making it equally easier to learn and grow for the prompter. The key just like in the past, is the engineer who is committed to learning and dedicated to their craft, will be the one who succeeds and prospers. Hard work, curiosity, and an excitement to learn will always be highly valued traits in engineers.
