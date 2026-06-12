# How PwC trained 400 consultants on Claude Code in a single session

Pricewaterhouse Coopers, or PwC, is a global professional services firm offering audit, tax, and consulting services to businesses and organizations worldwide. PwC and Anthropic recently announced an expanded alliance, driving impact across client work and the firm. Partner Ussama Baggili leads legacy and mainframe modernization at PwC, where he built systemized Claude Code workflows that have spread to a firm-wide training initiative. We spoke with Baggili about why PwC puts business users on Claude Code from day one and how a single training session got 400 leaders and consultants building apps in under an hour, and what that means for the firm.

## Anthropic: You've been one of the more active Claude Code users inside PwC. What were you trying to solve when you started?

**Ussama Baggili, PwC:** Everybody's trying to figure out how to get ahead with AI, but not everybody is able to use AI effectively. Claude is giving us the ability to re-energize the AI mindset in our people. It's a lot more relatable. People feel that they're getting to results faster that are both higher fidelity and also more in tune with where they're going.

We have these blind spots in our organization that we weren't able to connect. Claude Code is how we started connecting those.

What we're trying to do is get people thinking differently by treating Claude as a capable colleague. We started with coding, which is the obvious entry point. But I discovered that a lot of what Claude Code is really good at is analysis: working through the problem before you even get to the coding part. The early realization was that the analysis itself was the deliverable. You could take it and then make it polished. And once I saw that, it changed how I thought about who should be using it.

## What do you mean by that? There's a common assumption that Claude Code is for developers and that non-technical users should start somewhere simpler.

**Baggili:** People say, "Maybe we’ll start with chat and then graduate to Claude Code. It’s too complicated for people to want to use it right away" But I think that's very limited. I think starting with Claude Code at the beginning is actually a more optimal and natural segway for continued progress into more technical realms. When we were first planning our internal training, the thought was that it’s best to use the Claude  chat version. However, believing in choice and not assuming we know best how the Claude products set will be used, we decided to run the training in Claude Code CLI within VS Code to start building muscle memory on more technical usage from which point the trainees can decide which one they preferred for their regular usage. 

## That's a bold bet with a non-technical audience. How did you set that up to succeed?

**Baggili:** Installing Claude Code can be complex if there are restrictions on package installations. We managed to get it down to a single-line script that people could run to get everything installed. 

Then the question become, how do we get 400 people to pace through a real training in about an hour and walk out energized? If things go wrong on the install, if they stumble on their prompting, they may not feel the benefit of using Claude Code.

So I thought, couldn't we build a skill or plugin within the training itself that helps people pace forward as they type their prompts? Think of it as a coach plugin within Claude Code. It tells people: great, here's what we're going to take you through in this training and helps set the training structure.  

Then, the second most notable thing is to coach on how to work with Claude with the outcome in mind first, and then working backwards from there. The Claude Code coach plugin is wired into a project distribution that has a CLAUDE.md that points to a coaching workflow for Claude. It is triggered upon session start and is visible to the user upon first interaction. It walks them through the steps to ‘here's your first prompt.’

## What did the training actually walk people through?

**Baggili:** It simulates a day in the life of three key tasks we do often. One, we respond to proposals. Two, we produce functional and technical specs for the things we're going to build. And three, we build applications or mobile applications. 

The coach plugin walks them through their first prompt. And within 15 to 20 minutes, people had their initial draft RFP responses ready for their review. Within another 15 to 20 minutes, they had their functional and technical draft specs. By the time we finished the hour, people were posting screenshots of the mobile apps they had built with Claude Code in the team chat.

Regardless of whether it was perfect, people walked out positive and optimistic about Claude Code and why they needed it.