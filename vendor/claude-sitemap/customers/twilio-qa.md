# A Twilio PM on building a self-learning development platform with Claude Code

Twilio provides programmable tools and APIs that allow developers and businesses to integrate voice, video, text messaging, email, and authentication capabilities directly into their own applications. Michael Carpenter is Director of Product on Twilio's Programmable Voice team. Over the past 11 years at Twilio, he's helped developers build on the company's communications APIs. Over 51 days, working solo with Claude Code, Carpenter built the Feature Factory: a self-learning development system that takes a brainstorm idea through a subagent pipeline to produce specs, tests, working code, and documentation. The output is a Claude Code plugin that packages hundreds of hours of Twilio domain knowledge for any developer. We spoke with Carpenter about how the project changed how he thinks about AI-assisted development. 

## Anthropic: What made you start this project?

**Michael Carpenter, Twilio:** I spend my days helping customers build on Twilio's APIs, so I know the platform deeply: dozens of products, thousands of parameters, and the subtle interactions between them. The question I started with wasn't "can AI help?" Everyone knows AI can help write code. The question was: how do you structure AI collaboration to produce work you'd actually ship? Not prototypes. Production-ready serverless functions with test coverage, error handling, and documentation.

## Anthropic: You've been at Twilio for over a decade. What's the developer experience problem you were trying to solve?

**Carpenter**: Building production Twilio applications is challenging. Not because any single thing is difficult, but because the surface area is enormous and the failure modes are often silent. A misconfigured webhook doesn't throw an error, it just doesn't fire. A call that fails to connect can show completed status because the parent call completed even though the child call never answered. A recording callback with a relative URL generates an error that Twilio logs in the debugger, where no one looks.

I've watched developer after developer hit the same walls. Dozens of products, thousands of parameters, documentation that's comprehensive, but vast.

## Anthropic: Tell us about the Feature Factory. What does it actually do?

**Carpenter:** At the most simple level, you give it a brainstormed idea and it runs through a pipeline of specialized subagents: architect, spec, test generation, development, review, documentation. But the real leverage is that the system learns as it goes. I built hooks that catch new learnings whenever an error occurs, and custom skills that capture domain knowledge from every session.

When I started, I had a simple learnings file where I'd write down API quirks and debugging insights. But that failed within four sessions. My next step was to build a documentation flywheel: hooks that write suggestions to a file Claude can read, then auto-clearing when you actually update the docs. My theory is that the system capturing knowledge has to be lower-friction than the discipline it replaces. 

You can see what that buys you. A self-service IVR that used to take multiple iterations now takes 5 minutes and one pass. A full AI voice agent that takes pizza orders—recording, transcription, and SMS confirmation— now takes just 10 minutes.

The plugin is the output of all of that. It packages hundreds of hours of accumulated Twilio knowledge so any developer can use Claude Code with Twilio and get the benefit of everything the system has ever learned.
