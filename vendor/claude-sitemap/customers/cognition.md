# Building an autonomous AI engineer: A Q&A with Cognition

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a0c9be29f26b99ef8719a4d_Image2_cleaned.png)

"There’s so much more for us to do together than separate, and that’s what we’re excited about." —Scott Wu

Cognition is the company behind Devin, one of the first AI software engineers. Devin launched in early 2024 and has since become an established name in AI engineering and enterprise AI transformation. The early move into the emerging AI software engineering space drove explosive demand; Cognition has deployed its AI engineers across enterprises including Goldman Sachs, Mercedes-Benz, and the US Army.

Scott Wu, CEO, and Walden Yan, co-founder and CPO, sat down with Anthropic to discuss what makes autonomous agents fundamentally different from code-completion tools, how Claude's capabilities have shaped Devin's evolution, and what's ahead for software engineering. 

## Anthropic: You've always had a bet on autonomous agents, going back to early 2024 when the technology was much earlier. What's uniquely challenging about powering an agent that works autonomously?

**Scott Wu, Cognition:** The bar for an autonomous agent is fundamentally different from the bar for a code-completion tool. Users systematically under-specify tasks. They have context the agent doesn't. The agent has to clarify, ask the right questions back, and infer intent correctly, because a wrong starting point means the entire trajectory goes off course.

The agent also has to stay focused over long horizons without drifting. A lot of our engineering work goes into trajectory monitoring, which means detecting when an agent is going off track, and steering it back. Before today's frontier models, the primary failure mode was consistency. Some trajectories would work, but the output quality degraded over long contexts, variance was high, and it just wasn't reliable enough to trust autonomously.

Real-world success for us looks like this: a well-scoped ticket comes in, the agent ships it, the PR gets merged. That's the bar our customers hold us to

**Walden Yan, Cognition:** Claude models were very early on, natively agentic. Devin has a lot of particular behaviors that we like to keep around for our users. Having a long set of evals allows us to have the confidence that when we swap a new model in, we don't regress on any important product behaviors, which is really important for us. We want to be able to speak definitively internally about which models we think are best and use those for our capabilities. 

## How would you describe what the overall experience of working with Devin is like?

**Scott:** The whole idea is getting you to a point where you as a human can operate in terms of higher level decisions and trade-offs and not have to think about every single little detail in the code. Devin will send you a screen video recording of ‘You told me to fix a bug, I fixed it, here's the PR, but by the way, I actually went through and clicked through myself to make sure it works now.’ And here's like a video of that working.

![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a0c9c170d8bc33cdd66d95b_Image3_cleaned.png)

"The far-out vision is Devin not just being an IC engineer, but giving it much higher-level goals." —Walden Yan

## Cognition routes across multiple models. What specifically makes Claude well-suited for the autonomous, long-horizon work you route to it?

**Scott:** One is just the ability to do long-running tasks. With a lot of models, you generally see that after enough time, they get confused or forget what they were doing. Claude models have been ahead of the curve at being able to follow through and consistently work on a longer-running task.

Two is having intelligent usage of the tools available to it. With Devin, we give the model access to all sorts of different things: the PR itself, the commit history, different files of the codebase, the ability to ask a clarifying question. It takes a certain kind of intelligence to know how to use the different tools at your disposal, or when to use a tool at all.

The third is more subjective. You want to be able to give the agent a two-line description of what you _think_ needs to happen and have it expand from there and already know what you mean about the other details. It’s a little different from the binary of ‘Did it do the task or not?’ We've often found that Claude models perform particularly well at that.