# How Notion is building a workspace where teams and agents collaborate

Notion is a collaborative AI workspace where teams and agents work together. With the launch of Claude Managed Agents, a suite of composable APIs for building and deploying agents at scale, Notion product manager Eric Liu and his team have been building agent orchestration that lets Notion users delegate real work to coding and knowledge work agents from their task boards. He spoke with Anthropic about what's hard about deploying agents across an organization and what surprised him when he started using it himself. 

## Most agent tools today are designed for a single person working with a single agent. What breaks when organizations try to scale that?

**Eric Liu, Notion:** The challenge of deploying agents at scale is really about collaboration. Right now, agents feel very one-to-one. It's you and an agent in an interface. But what does it look like for your whole team, with all of the approval processes and everything required to actually use agents at scale? That's fundamentally the same problem we've solved before at Notion, which is human collaboration. Now it's agent and human collaboration, and it turns out a lot of the same patterns around suggested edits, version history, and shared knowledge bases are really critical. Agents are doing so much of the work now that people are spending more of their time as editors and reviewers.

## Why did you decide to add Managed Agents into Notion?

**Liu:** Our customers don't want to use one agent to talk to another agent to do a backflip to get things connected. They just want to be in Notion and say, "Claude, help me make this website." Managed Agents was great because we just pull in the API and it works within the product. 

Our agent is good at using Notion, but it's not the best at coding, and Claude models are very good at that. We also don't generate the long tail of artifacts. We focus on what's native to Notion: your company knowledge. But there's a whole world of other files that Claude is really good at generating.

## Walk us through what you built.

**Liu:** The way I think about it is that you’re creating these software building blocks in Notion and you can construct them into any workflow you want. For example, we created a task board that acts as an orchestrator. You create a task, move it to "ready to start," and it invokes a Claude session. You can mention the task, and it exists in all the surfaces you're collaborating with your team on. Claude picks up context from connected pages, our design system, API docs, and product requirements documents. In other words, you're working with Claude just like a colleague.

The nice thing is that you're not limited to one task. For our customers, what that means is that they can kick off a ton of jobs in Notion, 30 or 40 at the same time, and our platform routes them to the right person for approvals. That's what makes doing it in Notion so valuable.