# Set up Claude Cowork to work the way you do

## What you'll set up

Cowork is at its best with access to your work and a bit of context about how you do it.

*   **Your folder, connected tools, and browser** — so Claude can reach what you reach
*   **A Cowork Project,  context files, and Global Instructions** — so Claude knows how you work without you re-explaining
*   **A plugin for your function** — domain expertise built into the workflow
*   **Scheduled tasks** — work that repeats without a prompt

## 1. Open Cowork

_Open the_ _Claude desktop app_ _→ at the top, click_ **_Cowork_**_. Requires a_ _Pro or Max_ _subscription._

Chat Cowork Code

## 2. Create a Project

_In the sidebar, find_ **_Projects_** _and click the “+” button to see the three different ways to create a project:  
start from scratch, import a project, or use an existing folder._

A Project gives your work a home. The folder you pick is where Claude can work out of. For task you start inside the Project, Claude already has context about the work that's ongoing or inside. To learn more about setting up Projects, visit here.

Claude can read every file inside (PDFs, spreadsheets, Word docs, whatever's there) and saves finished work back to the same place. It reads your old reports to match your formatting, references your templates without being told to.

Q4-Earnings

Name Date Modified Size

ACME-Q4-Transcript.pdf Feb 24, 2026 2.1 MB

Birch-Q4-Transcript.pdf Feb 25, 2026 1.8 MB

Cypress-Q4-Transcript.pdf Feb 25, 2026 1.9 MB

Coverage-Model-2026.xlsx Feb 20, 2026 412 KB

Q3-Research-Note.docx Nov 12, 2025 86 KB

Describe what you'd like me to do with these files...

Q4-Earnings

+

Sonnet 4.6

Let's go

## 3. Connect your tools

_Open the_ **_Customize_** _sidebar → connect and toggle on the tools where your work lives._

Connect tools like Slack, Google Drive, Calendar, Gmail — you do this once, and every task from then on can pull from them.

Instead of copying a Slack thread into your prompt, you mention it ("check what the team said in Slack about this week's earnings") and Claude finds the relevant messages. Claude can also act in connected tools: draft an email in Gmail, save a file to Drive, leave a comment where the discussion lives.

Connectors

Slack

Google Drive

Google Calendar

## 4. Tell Claude how you work

_Click into your Project and find the instructions box → write what Claude should know._

A Project has an **Instructions** that carry into every task you start inside it — Claude reads it alongside everything in your folder.

What goes in is up to you. Standing context you'd otherwise re-explain at the top of every prompt: your role and function, the output format you default to, where things live across tools, judgment calls you want Claude to make the same way every time.

For anything that should evolve — a running log of decisions, notes that grow as the work does — put it in a file in your folder instead. "Add what we covered to my notes file" works on files; the Instructions panel is user-set and stays as you wrote it.  

#### Global instructions that apply across every Project

**_Settings > Cowork_** _→ click Edit next to Global Instructions → type and save._

For preferences that don't change between projects: things you want Claude to check before doing, defaults like "save drafts as .docx" or "ask before deleting anything." These carry into every conversation regardless of which Project you're in.

To check your context is being picked up: ask "tell me what you know about how I work here."

Both are optional. With more context, Claude knows more about your work without you spelling it out each time.

## 5. Add expertise, scheduling, and browser access

Each of these extends Cowork in a different direction, depending on what your work calls for.

### Plugins

_Open the_ **_Customize_** _sidebar → Plugins → install the one that fits your role._

If you want outputs with domain expertise built in (a finance analyst's framework, a sales team's workflows, a legal reviewer's checklist), install the plugin for your function.

A single prompt can then run a structured workflow with that expertise baked in. You can also customize a pre-built one or build your own for workflows specific to your team. More on plugins →

### Scheduled tasks

_Type `/schedule` in any conversation, or go to the_ **_Scheduled_** _tab in the sidebar → + New Task._

Once you have a task that works well (a status report, a weekly briefing, a data pull), you can set it to run on a schedule without prompting each time.

Claude walks you through the cadence, the folder, and what the output should look like. As long as the Claude desktop app is open, the task runs on its own and the finished file is waiting when you check. If not, the task will run once you reopen the app. More on scheduled tasks

### Claude in Chrome

_Open the_ **_Customize_** _sidebar → Claude in Chrome → install the extension and enable._

If your work lives behind logins (dashboards, admin panels, web apps), Claude in Chrome lets Cowork see your browser and work inside it.

Cowork can click through pages, fill forms, pull data from anything you're logged into, and make changes in web tools the same way it writes to your folder. Give browser access only to sites you trust. More on Claude in Chrome

Claude in Chrome Let Claude handle work in the browser

Claude (MCP)

Analytics — Dashboard ×

Settings

‹ ›

app.example.com/dashboard

Q4 Overview

Last 30 days Export report

42.8kSessions

3.2%Conversion

Claude

## One task, end to end

Here's how that looks in practice — an analyst updating a research note during earnings season. The shape is the same for any task where you're pulling from files and tools to produce something finished.

## 1. Describe what you want back

A prompt works well when it gives Claude **what to look at**, **what you want back**, and **where it should go**. You don't have to engineer a perfect prompt. Claude will ask follow-up questions for whatever you leave out.

Chat

Cowork

Code

Let's knock something off your list

Q4-Earnings

+

Sonnet 4.6

Let's go

## 2. Answer a few questions

**Based on your prompt and what it found, Claude asks a few questions to get the output right** — which approach to take, what to prioritize, how the finished work should look.

Pick one of the options Claude offers, or type your own answer. If a question isn't quite right, say so and Claude will ask differently.

Chat

Cowork

Code

Read the transcripts against our model, check #research-desk on Slack, and update the research note. Flag anything that changes our assumptions.

Thinking...

Which assumptions matter most?×

1

Revenue growthTop-line acceleration vs model

→✓

2

Margin trajectoryOperating and gross margin trends

→✓

3

Competitive positioningMarket share and moat indicators

→✓

4

All threeFlag across all assumption categories

→✓

 Skip

Assumptions? All three

Thinking...

How should I weight the data?×

1

Management toneForward guidance and sentiment

→✓

2

Reported metricsRevenue, margin, and growth figures

→✓

3

Both equallyWeight commentary and numbers together

→✓

 Skip

Weighting? Both equally

Thinking...

How should I structure the note?×

1

Same structure as last quarterMatch Q3-Research-Note.docx format

→✓

2

Restructure around changesLead with what moved most

→✓

3

Your callChoose the best structure for this quarter

→✓

 Skip

Structure? Same structure as last quarter

Working on it...

Reply...

Q4-Earnings

+

Sonnet 4.6

Replay

## 3. Step away — or step in

**A progress panel shows each step** — which files Claude's reading, what it's building.

For large tasks, Claude breaks the work into parts and handles them at once: reading several files, pulling from a connected tool, searching the web, all while drafting the output. The kind of multi-source work that would block out your day runs in the background.

Leave it and come back, or type in the chat to redirect if you see Claude heading somewhere you didn't mean. The app stays open; you don't have to be at your desk.

Working on your task... 3 steps running simultaneously

Progress

✓

Read coverage model and prior note

2

Reading Q4 transcript (1 of 3)

3

Reading Q4 transcript (2 of 3)

4

Reading Q4 transcript (3 of 3)

5

Pulling Slack thread

6

Cross-referencing assumptions

7

Drafting updated research note

Replay

## 4. Open your finished work

**The result lands where you pointed it.** In this walkthrough, that's the folder, saved right alongside the transcripts and model.

If the prompt had asked for something different ("draft this as an email in Gmail" or "save to the shared Drive folder"), it would show up there instead.

Q4-Earnings

Favorites

Name Date Modified Size

Q4-Earnings Today at 3:12 PM --

ACME-Q4-Transcript.pdf Feb 24, 2026 2.1 MB

Birch-Q4-Transcript.pdf Feb 25, 2026 1.8 MB

Coverage-Model-2026.xlsx Feb 20, 2026 854 KB

Cypress-Q4-Transcript.pdf Feb 25, 2026 1.6 MB

Q3-Research-Note.docx Nov 15, 2025 342 KB

Q4-Research-Note.docx Just now 128 KB

## What to try next

**Summarize something scattered** — Claude reads across sources; you get the picture in one place.

> "Look through my folder and Slack for everything related to [project]. Give me a one-page summary of where things stand."

**Turn a draft into a finished deliverable** — the thinking is already in your files — Claude does the shaping.

> "Take the notes in this file and turn them into a client-ready memo. Match the format of the last one I sent."

**Set up something recurring** — Type `/schedule` and tell Claude what to run, when, and where to save it. The weekly report you draft every Friday becomes a file already waiting when you sit down.

## Things to know

*   **Put what matters in files** — Cowork doesn't remember between sessions like Claude in chat does. Anything you want Claude to know every time belongs in Projects, global instructions or a file in your folder. The upside: your context stays visible and editable, and you can share it with anyone who works the same way.
*   **Bigger tasks use more of your plan** — A task that reads many files and runs for a while uses more than a quick question. **Settings > Usage** shows where you are. Max gives more headroom if you're running heavy tasks daily.
*   **Research preview** — Available to Pro, Max, Team, and Enterprise on the desktop app.

Download Claude Desktop