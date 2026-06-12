# A conversation with Cursor on building coding agents for professional developers

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a28ae750a5981a9f2a00cc5_Screenshot%202026-06-09%20at%204.39.21%E2%80%AFPM_4mb.jpg)

"We started working on Cursor at the end of 2022, and the premise was that eventually all of software was going to flow through models." —Michael Truell, Cursor co-founder

Cursor is an AI coding platform used by software engineers at more than 60% of the Fortune 500 to build and ship production software, increasingly by directing coding agents rather than writing every line by hand. Co-founder Michael Truell sat down with Anthropic to talk about the role Claude plays in the product, how the work of building software has changed, and where coding is headed next. The following conversation has been edited for length and clarity.

## How do you describe Cursor these days?

**Michael Truell, Cursor:** For the longest time, building software was about writing in a language that only computers could understand. You write very basic statements: if this then that, loop over this many times, take this piece of data and move it over there. The thing that made it hard is that computers couldn't fill in the gaps. You had to spell out everything exactly for them. What's changed over the past few years is that building software is starting to feel like working with a human colleague. With Cursor, it looks like asking a bunch of helpers to go and build parts of your software. People with no engineering background at all can build their own internal tools, purpose-built for their workflow.

## Plenty of people try coding and bounce right off it. What made it stick for you?

**Truell:** I started coding when I was 12 and rapidly became obsessed with it. That came from the feeling of being able to build without barriers, which I think is one of the special things about programming. In so many other domains, you're limited by the people you know, or the resources you can pull together, or even lab space. But with coding, you just need a computer, and you can build things that you dream up in your mind.

## Early on, Cursor ran on other models by default. Sonnet 3.5 was the model that changed that. What did you see in it back then?

**Truell:** We started working on Cursor at the end of 2022, and the premise was that eventually all of software was going to flow through models. We were a very scrappy team back then, and we were using some other models by default. A couple of folks went and really went deep on evaluating the various models in the market, through offline evals, through internal dogfooding, and then also through A/B tests. They came back surprised. Sonnet 3.5 was this big jump, and so we moved quickly on it. That was the start of a multi-year run of improvements with each model since.