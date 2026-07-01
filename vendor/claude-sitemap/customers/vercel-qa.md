# How Vercel built an ecosystem on the open skills standard

Vercel is a platform developers use to build and deploy web applications and agents. Its Chief of Software, Andrew Qu, built skills.sh, a registry on top of Anthropic's open Skills spec, where developers discover and install agent skills. 

Andrew sat down with Anthropic to talk through how Vercel runs on skills internally, what surprised him about who's building them, and where the ecosystem is heading. 

## Anthropic: Vercel was one of the first companies to build a skill for Claude's directory. What made you want to move early, and what does the Deploy to Vercel skill actually do?

**Andrew Qu, Vercel:** Our Deploy to Vercel skill, which we shipped for Claude Code and Claude Desktop, is an easy way for people to go from clicking and prompting around to having a full production app deployed on Vercel. We've always wanted to shorten the time from idea to production. People are already doing most of their creative process in Claude, so it makes sense to meet them where they are and let them deploy directly from Claude to Vercel.

With any deployment provider before the skill, people went from idea to prototype/design very quickly, but then ended up spending a lot of time downloading a zip, signing up for a new account, and figuring out how to deploy.

With the skill, you can go from having your work in Claude to saying "I want this on the web" and instantly get back a shareable link. You can claim it into your own Vercel account later, or discover that Vercel is the hosting provider underneath and sign up to do more.

## Do you remember the first skill you built, and what you started with?

**Qu:** One of our web engineers decided one night to write down everything he knows about performance and making things feel fast. By the end he had a whole "web bible," and we were trying to figure out the right form factor to distribute it. Publishing it as docs on our blog felt too slow. An MCP server felt too heavy for what was basically documentation. Skills had come out only a couple of months earlier, so I helped rebundled the contents as a skill with nested directories. We announced it as a React best practices skill, and it was clear from the millions of impressions that the community was looking for skills to uplevel their agents. People wanted the best practices in a portable, quick format. I didn't create skills inside Claude itself. Anthropic published Skills as a spec, and skills.sh is the part I built on top: a place to discover skills and pull a local copy into your own codebase.

## Once you started building skills internally, what changed on your own team?

**Qu:** A lot of our focus on how to work faster, how to make agents perform better, and how to get people up to speed sooner started to center on skills. How do you do this migration? How do you debug this on-call issue? How do you match the design system? All of that became skills we built internally, checked into mini repos dedicated to internal agent skills. Anecdotally, it makes us move a lot faster.

A good example is a data science agent I maintain, named d0. I went through all the phases, sub agents, file systems, and the version we serve today runs on roughly 100 skills: aggregation, customer metrics, product metrics, time series data. Every scenario it handles is now encoded as a skill, because once we've done something accurately we can capture it and turn it into something the agent can recall later. Skills have changed how we work with agents at Vercel.