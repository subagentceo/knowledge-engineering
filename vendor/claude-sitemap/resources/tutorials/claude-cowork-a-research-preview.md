# Claude Cowork, a research preview

Claude Code showed developers what’s possible when Claude works in your environment. It can move across your files, pull from multiple sources, and perform actual work on your behalf. It can break complex work into pieces and keep going until the job is done.

Cowork brings Claude Code’s execution power to Claude Desktop for knowledge work, instead of just code. Delegate complex tasks that pull from multiple sources, need sustained effort, and produce real deliverables. The terminal happened to be where Claude Code lived. Now, that power runs directly on your desktop through a familiar interface.

## What makes Cowork different from regular chats

###### It works in your file environment.

Cowork runs locally on your desktop and operates directly in your folders—reading, organizing, and creating files where your work actually lives. Like Claude Code, it works the way you do: in your filesystem, with your existing files, not just generating new artifacts. Use the `Work in a folder` option to point Claude at the directory you want it to work with.

###### It can spin up sub-agents.

Cowork can break complex tasks across independent sub-agents that work in parallel, each with fresh context. Unlike a single chat thread where everything accumulates together, each sub-agent starts clean. This means larger pulls across multiple sources at once, longer tasks that don’t hit context limits, and complex work where each piece gets dedicated attention before results sync up.

###### You can hand off and check back.

Cowork handles the orchestration—breaking work into pieces, managing context, tracking what’s done—so you’re not needed at every step. Give Claude a task, review the approach, then let it run. The sidebar keeps you oriented: see steps as they unfold, track which tools and files are in use, and see outputs as they’re created. Check in and redirect if needed, or let it run to completion—you come back to a finished result. You can also schedule tasks to run on a recurring cadence, so work you hand off once keeps running without you.

## When to use Cowork vs regular chat

###### Use Cowork when:

- The work lives in your files—whether that’s organizing what you have, analyzing a folder, or creating outputs saved directly to your machine
- Tasks involve large amounts of material or many sources
- Work benefits from parallel exploration
- You want to delegate and come back to results
- Tasks might take longer than a typical chat session

###### Stay in regular chat when:

- You want real-time back-and-forth collaboration
- Tasks are quicker and conversational
- You want to stay more hands-on throughout
- The work is exploratory and you’re thinking alongside Claude

> **_Try:_** Ask Cowork to organize your desktop. It’ll ask a few questions about how you want things grouped, then get to work—a real task where Claude acts directly in your environment.

## What Cowork can do

Cowork shines when you want Claude to take action and follow through. That might mean acting in your environment—organizing files, processing batches, converting formats. Or work too big for a single thread—research across many sources, analysis with many angles. Or something that runs all the way to completion and produces a finished deliverable.

‍

###### Access local files.

Point Claude at folders on your machine: your notes, project directories, research archives. Claude reads, creates, and organizes files directly.

> ‍*“Organize my Downloads folder. Group by type and project.”*

> _“Find identical photos and screenshots I can delete.”_

‍

###### Create deliverables through deeper work.

**‍**Cowork can produce large slide decks, spreadsheets, and reports by researching across your connected tools, synthesizing information, and iterating on the output._‍_

> _“I have a week in Lisbon. Search my email inbox and calendar for all details regarding the trip. Search the web for the weather, neighborhoods, restaurants, and things to do. Create an itinerary and put it in a doc.”_

> _“I have 50+ customer feedback messages across Teams and Zendesk. Find the top complaints. Then search my SharePoint to find documents I’ve written to begin drafting responses.”_

‍

###### Complete long-running tasks.

Work that would get disrupted in regular chat (hitting context limits, losing the thread partway through) runs to completion in Cowork.

> _“Go through my entire notes vault. Find orphaned notes, surface connections I’ve missed, and suggest a better folder structure.”_

> _“Read all the documents in /contracts. Create a summary of key terms, renewal dates, and obligations for each.”_

‍

###### Parallelize complex work.

When a task has independent parts, Claude can spin up sub-agents to tackle them simultaneously and synthesize the results.

> ‍*“I’m evaluating four vendors for our team. Spin up subagents to research each one’s pricing, support reputation, and integration options. Give me a comparison.”*

> _“Spin up subagents to analyze this decision from three angles: financial impact, customer experience, and operational risk. Synthesize a recommendation.”_

‍

###### Work asynchronously.

Start a task, step away, and come back to finished work. Check progress when you want, or let Claude run on its own.

> _“I have a performance review Friday. Search my Slack, Google Drive, and Asana to look at my completed tickets, project updates, peer feedback. Draft a meeting prep sheet.”_

> _“Look at my team meeting notes from the last quarter in Drive and review our team Slack channel. What has my team accomplished?”_

‍

###### Schedule recurring tasks.

Set Claude to run scheduled tasks on a repeating cadence — daily, weekly, or any schedule you define. A morning briefing that pulls from your Slack and calendar. A weekly roundup of what shipped. A Monday flash report assembled from your connected tools. You describe the task and set when it runs, and Claude handles it each time.

Your desktop app needs to be open for scheduled tasks to run. If your computer was asleep or the app was closed when a task was due, Claude catches up when you’re back.

> _“Every Monday morning, check my Slack channels and calendar for the week. Summarize what’s coming up and flag anything that needs prep.”_

> _“Every Friday at 4pm, pull my completed Asana tasks and draft a weekly status update. Save it to my Reports folder.”_

## Getting started

Access Cowork from the Cowork tab in Claude Desktop. Cowork is a local desktop feature for macOS and Windows, available to paid plan users as a feature preview.

###### Grant folder access.

Point Claude at directories you want it to work with. It asks permission before writing.

###### Connect your tools.

Cowork becomes more useful with MCP connectors linking it to your actual work environment.

###### Use Claude in Chrome.

If you’ve set up Claude in Chrome, Cowork can use it for browser-based tasks: reading web pages, filling forms, extracting data from sites that don’t have APIs, and navigating across tabs.

## Tips to try

###### Start with prompt builders.

When you open Cowork, you’ll see suggestions like _“Create a file,”_ _“Crunch data,” “Organize files,” “Prep for the day.”_ Get inspired and easily try out tasks suited to your needs that work well in Cowork.

###### Think in terms of complete tasks.

Try describing a task with a specific end state. _“Analyze these documents and create a slide deck with the three main themes”_ gives Claude more to work with than “help me understand this research.”

###### Build your intuition.

Try tasks with clear boundaries—_“organize this folder,” “synthesize these documents”_—as you build up to tackling larger projects. Develop a sense for what Cowork handles well, then scale up.

## Current limitations

Cowork is available as a feature preview, with some known limitations:

- **Desktop only (macOS and Windows).** Sessions don’t sync to web or mobile.
- **No chat sharing.** Sessions stay on your machine.
- **Some features aren’t available yet.** Chat sharing, artifact sharing, and Memory don’t work with Cowork currently. You also can’t switch between Cowork and regular chat mid-conversation.

Local execution means faster iteration and direct file access. Sessions stay on your device and use your machine’s resources.

## The bigger picture

If you’ve been using Claude Code for non-coding work, Cowork provides the same power without needing to access the terminal.

And if you haven’t used Claude Code? Cowork on Claude Desktop is a good place to start.
