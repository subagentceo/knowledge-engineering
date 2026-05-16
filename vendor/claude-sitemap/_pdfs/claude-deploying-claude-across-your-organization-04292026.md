---
source_url: https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/69f24d3e09b921b92403774e_Claude-Deploying-Claude-Across-Your-Organization-04292026.pdf
referrer: https://claude.com/blog/new-guide-deploying-claude-across-the-enterprise-with-claude-cowork
pages: 24
fetched_at: 2026-05-16T06:14:03.387Z
kind: pdf-mirror
---

Deploying Claude across
your organization:
How Anthropic uses
Claude Cowork
A practical guide for deploying Claude Cowork
across your business, with use cases, timelines, and
lessons from Anthropic and other organizations.

-- 1 of 24 --

Contents
Foreword: The evolution of AI at work 	3
Introducing Claude Cowork 	4
A maturity model: Claude Cowork in five levels 	8
Getting started with Claude Cowork 	10
Driving Claude Cowork adoption at scale 	13
How teams at Anthropic use Claude Cowork 	16
Leveling up with Claude Cowork 	20
Additional resources 	22
2

-- 2 of 24 --

Foreword: The evolution
of AI at work
You lead a team that doesn't write code. The work is contracts, decks, financial
models, pipeline reviews, regulatory filings, executive reports. AI has been on
every board agenda for two years and while engineers at your company are
power users, most of your organization still uses it like a chatbot: ask a question,
get an answer, go do the work yourself.
The employees seeing real results are the ones that embed AI into how work
actually gets done. That means using AI that reads the same spreadsheets your
analysts read, drafting against the same templates your legal team uses, and
updating the same CRM your reps live in, then handing back finished work
rather than suggestions.
The trajectory has been fast. In 2024, using AI at work meant interfacing with
a chat window. In 2025, Claude Code put an agent at the command line and
developers started delegating hours of work at a time. In 2026, Claude Cowork
brings that same capability to the desktop for everyone else at your company:
the analysts, lawyers, account executives, product managers, marketers, and
more. And with plugins, skills, and commands, Claude becomes even more
customizable and capable.
This guide walks through how to deploy Claude Cowork across a business
function: where to start, how to structure a pilot, and best practices for scaling
what works. The examples come from Anthropic's own finance, legal, sales, and
product teams, alongside customers running Claude Cowork in production,
including Thomson Reuters, Zapier, and Jamf.
While the use cases are specific to Anthropic and other enterprises, the best
practices and patterns are not. We hope you find these lessons learned and best
practices applicable to your own workflows.
3

-- 3 of 24 --

Chapter 1
Introducing
Claude Cowork 4

-- 4 of 24 --

Chapter 1
Introducing Claude Cowork
Until recently, most AI tools have been conversational: you ask it a question, it
provides an output in the context of a chat window.
Agents change that relationship. You describe an outcome, AI plans the steps,
executes them, and delivers something tangible across your files and tools.
While coding agents paved the way, functions beyond software engineering are
transforming their work by building specialized agents.
Lean how enterprises are building and using agents in our 2026 State of AI
Agents Report.
Powered by Claude, Claude Cowork is the product surface where this happens
for knowledge work, the way Claude Code is the agentic harness for developers.
It runs on your desktop and meets your work where it already lives: local files and
folders, connected cloud apps like Slack and Google Drive, and the browser via
Claude in Chrome. Claude can also work across Excel and PowerPoint, carrying
context from one to the other so an analysis and the deck that presents it happen
in a single session.
The difference between Claude Cowork and a chat window is agency. You don't
re-explain your brand voice, your data schema, or your approval process on
every turn. Claude holds that context across the task and moves between the
spreadsheet, the slides, and the memo the way a colleague would.
Get started with Claude Cowork today.
Chat, Cowork, or Code: choosing the right Claude surface
Claude Cowork is one of three ways to work with Claude in the desktop
app. Part of deploying it well is helping people know when to reach for it
and when one of the other two is the better fit.
Chat is for quick exchanges: exploring an idea, iterating on a paragraph,
getting an answer without leaving the app you're already in, and most of
your organization is already here. In-flow tasks include reading a dense PDF
and asking for the one-sentence takeaway, sanity-checking a claim ahead of
a meeting, or making sense of a long Slack thread you walked into cold.
Cowork is for knowledge work that takes real effort: pulling information
from many sources, making sense of it, and producing something finished
like a document, deck, or spreadsheet. Folder access, enterprise connectors,
browser, scheduled tasks, plugins. When the output is a deliverable rather
than an answer, this is the surface.The projects Cowork excels at include
turning a folder of customer interview transcripts into a themed findings
doc, building a competitive landscape from a dozen vendor sites and their
recent announcements, or a scheduled Friday-morning task (for instance, a
weekly revenue report) that pulls metrics from connected tools and drops a
formatted brief into a shared folder.
Code is the full development environment for engineers: direct codebase
access, plan and code modes, visual diffs, git integration, local or remote
environments. It's where your developers already live, and Claude Cowork
doesn't try to replace it. Examples include shipping a feature across a multi-
service codebase with tests, building a web application, or migrating legacy
code.
5

-- 5 of 24 --

If the task is... 	Reach for 	Why
A question, a rewrite, a
quick brainstorm
Chat 	Fast, conversational,
no setup
Research, analysis, or
a finished document
built from your files and
systems
Claude Cowork 	Folder access,
connectors, skills,
scheduled runs
Writing, testing, or
shipping software
Claude Code 	Codebase access,
diffs, git, dev
environments
The three share the same Claude underneath; what changes is the
workspace around it.
Why Claude Cowork
For business leaders, the value of Claude Cowork shows up in four places.
Speed
With Claude Cowork, work that took hours compresses into minutes. Call prep
that took thirty minutes of digging through CRM notes, email threads, and call
recordings takes two. A first-pass contract review that blocked a deal for a week
happens the same afternoon. Now, employees can spend their time on work that
requires judgment calls, strategy, and cross-functional creativity.
Quality
Claude Cowork delivers finished deliverables, not drafts that need another
pass: a financial model with formulas that tie, a competitive teardown with
cited sources, a QBR narrative written the way your CRO expects to read it, or
a customer response that sounds like your brand because it's grounded in your
style guide and past replies. Because Cowork pulls directly from your systems of
record—whether that’s Google Drive, Excel, PowerPoint, Slack, Teams, or more—
the numbers and names are straight from the source.
Scale
When your best analyst's workflow lives in a skill rather than in her head, it
stops being tribal knowledge and becomes organizational infrastructure. Claude
Cwork allows organizations to tackle complex, multi-step tasks at scale, across
teams. The playbook your top AE uses to prep for renewals, the checklist your
senior counsel runs on every MSA, and the format your RevOps lead built for
pipeline reviews become encoded in your organizational workflows, allowing
every person on the team to work with the same context and processes.
Consistency improves because everyone runs the same playbook, and the
playbook itself compounds as the team refines it.
Capacity for work you weren't doing
The more interesting effect of Claude Cowork is the work that wasn't happening
at all because nobody had time to do it: the regulatory monitoring your legal
team wanted to do across forty jurisdictions but couldn't staff, the per-account
dashboards your sales managers wanted but couldn't get engineering cycles for,
or the quarterly competitive sweep marketing always meant to run. This is where
functional leads tend to see the biggest return—not doing the same work faster,
but doing the work that mattered but was never a P0.
Customizing Claude Cowork with plugins
Out of the box, Claude Cowork is a generalist. Plugins are what turn it into a
specialist for every function.
A plugin bundles three things:
• Skills are encoded workflows (markdown files) that tell Claude how your
team does something. A variance analysis skill knows which tables to query,
what to compare against, and how your CFO likes the output formatted. A
morning briefing skill knows to pull today's calendar, check your priority deals,
6

-- 6 of 24 --

and surface the three things that need attention before 9am. Skills can be
invoked directly via slash commands or triggered automatically when Claude
recognizes they're relevant.
• Subagents are autonomous workflows Claude runs end to end without
you watching: an agent that monitors regulatory filings across jurisdictions
and flags what's material to your business, or one that checks your book of
accounts for untracked revenue every Friday.
• Connectors are two-way integrations built on MCP (Model Context Protocol,
a universal standard for connecting AI applications to external data and tools)
that let Claude read from and write to the systems your team already uses,
including Salesforce, Slack, BigQuery, Docusign, Jira, Google Workspace, and
a growing directory of others. Connectors respect your existing permissions;
Claude sees what the user sees.
Plugins are file-based and written in markdown, which means they're portable,
version-controllable, and editable by anyone who can write a how-to doc. You
don't need an engineering team to build one. Anthropic's own Legal plugin
was built by a product lawyer in an afternoon by pointing Claude at the team's
existing memos, risk frameworks, and policy documents.
7

-- 7 of 24 --

Chapter 2
A maturity model:
Claude Cowork in five levels 8

-- 8 of 24 --

Chapter 2
A maturity model: Claude Cowork in five levels
The most common question we hear from new teams exploring Claude Cowork
is some version of “where do I even start?” The most useful answer we've found
is to think of Claude Cowork adoption as a ladder. Each rung builds on the one
below it, and nobody is expected to jump straight to the top. See our suggested
step-by-step “ladder” of adoption, below:
Levels 	What it looks like 	Example
Level 0 	Use Cowork as a chat Q&A.
Connect Slack or Drive, ask a
question, get an answer.
"Summarize what was decided
in #project-atlas this week."
Level 1 	Building something. Claude reads
your files and connects to your
tools to create something new: a
deck, an email, a spreadsheet, a
diagram. Your data and systems
are your oyster.
"Here's the deal folder. Draft an
investment memo."
Level 2 	Turn it into a skill. One markdown
file runs the same task the same
way every time.
A /variance-analysis skill
that knows your tables, your
thresholds, and your CFO's
preferred format.
Level 3 	Bundle skills, build your own,
and schedule them to run on
their own. Have the skill return
analysis or run a daily workflow.
A morning briefing that fires
at 7:30am, pulling calendar,
pipeline, and overnight Slack
into one page.
Level 4 	Create a plugin for every
department. Sales, Legal,
Finance, Marketing each run
a curated, admin-provisioned
bundle.
Anthropic's Legal plugin: intake
triage, regulatory monitoring,
and exec updates, encoded
once and shared with the
whole team.
Chat is everyone's Level 0. Claude Cowork is where Levels 1 through 4 happen
for knowledge work, and Code is where the same progression happens for
engineering. Level 0 is where almost everyone is today, and it's a perfectly fine
place to be on day one. The job of a deployment is to get every user one level
higher than they are now and to make sure the path upward is paved; nobody
needs to reach Level 4 in the first month.
The rest of this guide is organized around exactly that: Section 3 covers getting
teams from Level 0 to Level 1, Section 4 covers moving the organization from
Level 1 to Level 4, and Section 5 shows what Level 4 looks like in practice across
four Anthropic teams.
Learn how to tackle the adoption ladder by watching Claude Cowork in an
Hour, our on-demand webinar.
Thomson Reuters: Moving judgment up the stack
Thomson Reuters piloted Claude Cowork with Claude Enterprise across
teams that don't typically build software. The pattern they saw: non-
developers moving further into automation and light prototyping using
documents and data they already work with every day. The skeptics
converted not after a demo but after a couple hours of running real
workflows.
"Claude Cowork helps teams do work at a scale that was hard to justify
before. The human role becomes validation, refinement, and decision-
making. Not repetitive rework." — Joel Hron, CTO, Thomson Reuters
9

-- 9 of 24 --

Chapter 3
Getting started with
Claude Cowork 10

-- 10 of 24 --

Chapter 3
Getting started with Claude Cowork
Every function has work that is high-volume, information-dense, and process-
driven, and that's exactly the shape of work office agents like Claude Cowork are
good at. We suggest teams start with a pilot, evaluate the results, and scale from
there.
In levels terms, the goal of this phase is modest: get a handful of people from
Level 0 (asking Claude questions) to Level 1 (handing Claude a real folder
of work and getting a finished deliverable back). You're not building skills or
plugins yet; you're finding the two or three workflows where a Level 1 win is
obvious enough that the people who experience it will want to encode it.
Choosing your first use case
Good pilot candidates fall into one or a few of these categories:
• High volume, high repetition. Work that happens dozens of times a week
and follows a knowable pattern, like meeting prep docs or data pulls.
• Information-dense synthesis. Anywhere a human is spending time being
the integration layer between systems, including pipeline reviews, regulatory
monitoring, and quarterly financial reports.
• Bottleneck-creating work. Speeding up cross-functional work (i.e., legal
reviews of marketing blogs or creative briefs) doesn't save one person time; it
unblocks everyone downstream.
• Expertise-dependent but process-driven. Business reviews, specialized
recruiting screens, or product briefs–in other words, the work only your best
people do well today, because they've internalized a process nobody wrote
down–fit the bill. This category pays back the most: encode that process in a
skill and everyone on the team inherits it.
If you don't know where to start, ask Claude. Point Claude Cowork at your
department's recent intake, whether that's tickets, requests, email volume, or
whatever system holds the queue, and ask it to categorize the work and tell you
where the time goes. This is itself a Level 1 task, and a useful one: Anthropic's
Legal team did exactly this with 742 Jira tickets and the analysis reshaped how
they structure intake. (Jump ahead to learn more about this use case.)
Structure your evaluation
Before you pilot, run the security review. Claude Cowork reads local files and
connects to enterprise systems; your security team will want to understand the
data boundaries, the connector permission model, and the auditability options.
OpenTelemetry support lets admins export usage and tool activity to Datadog,
Splunk, or whatever backend you run. Get this done before users are waiting on it.
Share our Claude Cowork Enterprise Admin Guide with your IT team.
Pilot with two or three champion teams rather than one. A single team gives you
one data point, but a handful gives you enough to separate the pattern from the
team. Pick teams with a motivated lead who's already experimenting with AI.
They'll surface the real use cases faster than a top-down mandate will.
Define success before you start among relevant stakeholders. "Hours saved per
week" is measurable. "Transformation" is not.
Provision plugins at the admin level. When individuals adopt AI tools without
oversight you get shadow AI: dozens of private workflows nobody can see, audit,
11

-- 11 of 24 --

or improve. Admin-provisioned plugins mean consistency across teams, security
controls from the first user, and a single place to push updates when you improve
a workflow.
Starting points by function
Each of these is a Level 1 entry point: a single, real deliverable Claude produces
against your actual files and systems. They're chosen because they convert
quickly into Level 2 skills once a team has run them a few times by hand.
Function 	First use case 	What you'd measure
Legal 	NDA review and redline against
your playbook
Review turnaround time; queue
depth
Finance 	Variance analysis with root-
cause commentary
Time from close to narrative;
analyst hours per cycle
Sales 	Pre-call research and brief
generation
Prep time per call; rep-reported
confidence
Product 	PRD drafting from customer
feedback and analytics
Time to first reviewable draft
HR 	Performance review drafting
from rubric and manager notes
Cycle completion rate;
manager time per review
Marketing 	Campaign brief to asset draft
against brand guidelines
Concept-to-review time;
rounds of revision
Jamf: A custom app in 45 minutes, without the engineers
Jamf's performance review process lives in a spreadsheet most
organizations would recognize: seven competency facets, branching logic
by level and role, and a structure that makes perfect sense to the HR team
and almost nobody else. The usual path to making something like that
usable is a quarter of engineering time and a custom internal app.
Jamf built it as a Claude Cowork skill instead. The skill turns the
spreadsheet into a guided, interactive experience: it asks the manager
the right questions, applies the right rubric for the role, and produces the
review.
It's also a clean illustration of the Level 1 to Level 2 jump. The HR team had
run the review process by hand against the spreadsheet enough times to
know exactly what "good" looked like. Encoding it as a skill took 45 minutes
because the workflow was already proven; the skill just made it repeatable.
"We built a skill that turns a complex performance review spreadsheet,
seven competency facets, branching logic by level and role, into a guided,
interactive experience in Claude Cowork. What would have required a
team of engineers building a custom React app, Claude Cowork delivered
in 45 minutes. And it's more adaptive than anything we would have built."
— Matt Benyo, Director of AI Initiatives, Jamf
12

-- 12 of 24 --

Chapter 4
Driving Claude Cowork
adoption at scale 13

-- 13 of 24 --

Chapter 4
Driving Claude Cowork adoption at scale
Deploying the technology is the easy part; getting an organization to actually use
it is much harder.
Phase 	Timeline 	Target level 	Actions 	What you'd expect to see
Evaluate 	Month 1 	Champions reach Level 1 	Security review. Identify 2–3 champion teams.
Install pre-built plugins. Connect 1–2 core
systems.
Champions reporting back use cases. First "this
saved me an hour" moments.
Pilot 	Months 2-3 	Champions reach Levels 2-3 	Champions run real workflows. Weekly check-ins.
Measure against defined criteria. Demo wins to
adjacent teams.
Measurable time savings. Champions building and
scheduling custom skills. Pull from other teams.
Scale 	Months 4–6 	Department reaches Level 4 	Admin-provisioned plugin marketplace. Encode
pilot learnings as org-wide skills. Onboard next
wave.
Skills shared across teams. New hires ramping on
encoded workflows. Declining support tickets for
"how do I."
In this section, we share a month-by-month framework for scaling Claude
Cowork across your organization that maps to our adoption levels. Month 1 gets
your champions to Level 1, familiarizing themselves with the solution. Months
2 and 3 get those champions to Levels 2 and 3, building and scheduling their
own skills. Months 4 through 6 take what the champions built and provision
it as Level 4 department plugins for everyone else. Each phase has a different
audience, motion, and success signal.
Month 1: Evaluate
Find your Claude Cowork power users, the early adopters experimenting with
the tool in their day-to-day work. They're your first pilot leads, and most are
already using AI for chat. Let them surface Claude Cowork use cases that matter
to their function rather than prescribing from above.
Have champions leverage pre-configured plugins so they get value in the first
session. The cold-start problem is real: if someone opens Claude Cowork and
doesn't know what to do, they close it. If they open it, type /morning-briefing,
and get something useful in ninety seconds, they come back tomorrow. Check
out our open-source plugin library covering sales, legal, finance, marketing,
product, HR, and more.
Connect systems and data sources early on in the process. Our pre-built plugins
are much more useful when they use real data and have organizational context.
A sales plugin that reads your most critical Salesforce dashboard is categorically
more useful than one that doesn't. Connected systems are also what make Level
1 possible; without them, users stay stuck at Level 0 chat.
14

-- 14 of 24 --

Months 2-3: Pilot
At this stage, encourage your champions to show the impact of Claude Cowork
live with their teams. When your legal team watches a four-hour contract review
happen in forty-five minutes on a real contract they recognize, they’ll become
champions, too.
Run with your two or three champion teams against clear evaluation criteria.
Check in weekly, not to micromanage, but because pilot teams surface edge
cases fast and you want to hear about them while they're fresh so you can action
them before a broader rollout.
The signal that a pilot is working isn't just hours saved. It's champions starting
to write their own skills. When a rep takes the call-prep workflow she's been
running by hand and turns it into a /call-prep skill, she's crossed from Level 1
to Level 2, and that skill is now an asset the rest of the org can inherit. When she
schedules it to run before every calendar event tagged "external," she's at Level
3. Track how many champion-authored skills exist at the end of the pilot; it's the
leading indicator for the scale phase.
Months 4–6: Scale
This is where the economics shift. Every skill built during the pilot is an asset.
Your best rep's call prep is now everyone's call prep, and the marketing blog
review skill legal built is a template comms can adapt for their own use case.
Tribal knowledge gets encoded and reused rather than walking out the door
when someone leaves, and over time, shared among teams.
The pattern is bottom-up discovery, top-down scale. Let teams experiment and
find what works for their function, then take what works and provision it org-
wide through admin-managed plugin marketplaces. The finance plugin that one
team built becomes the finance plugin the whole finance org runs, with version
control and the ability to push improvements to everyone at once. That's Level
4: a curated, maintained bundle of skills, subagents, and connectors that defines
how a department works with Claude.
Level 4 also changes the onboarding equation. A new hire who installs the
department’s plugin on day one starts at Level 2, not Level 0. They get the
encoded workflows before they've had time to develop bad habits, and the floor
for the whole team rises.
Zapier: Skills that travel between projects
Zapier's product marketing team uses Claude Cowork to prototype
new homepage messaging before involving design or engineering. The
workflow is deliberately light: give Claude the existing homepage as a
baseline, load a custom skill that encodes the team's voice, positioning
intent, and page-structure conventions, then point Claude at the new
direction and ask for a revised concept.
Claude navigates to the live page, identifies the core modules, and
generates an HTML mockup aligned to the new positioning, something
with enough fidelity to evaluate copy direction and page structure before
anyone opens Figma. The operator stays in a review loop, giving directional
edits while Claude Cowork regenerates, and keeps working on other things
in parallel.
What makes this repeatable is the skill. The team's PMM context travels
with the tool. The next concepting task starts from the same strategic
foundation rather than a blank prompt, and anyone on the team can pick
it up. It's a Level 2 asset doing Level 4 work: one well-built skill that quietly
became how an entire function approaches a recurring problem.
"I connected Claude Cowork to our homepage, a custom skill with our
PMM guidelines, and our internal tools through MCP so it could pull from
Slack threads, Glean searches, whatever context it needed. Now I give
Claude new positioning and ask it to develop versions of our homepage
with improved messaging. It looks at the page, works through its steps, and
generates an HTML mockup. After 15 minutes I'm sharing it with our team
to build on." — Joe Stych, Head of Product Marketing, Zapier
15

-- 15 of 24 --

Chapter 5
How teams at Anthropic
use Claude Cowork 16

-- 16 of 24 --

Chapter 5
How teams at Anthropic use Claude Cowork
Four teams at Anthropic, four archetypes of knowledge work: data-heavy
(finance), document-heavy (legal), relationship-heavy (sales), cross-functional
(product). Each followed the same pattern: start with a specific pain point, build
a plugin, iterate. Read another way, each climbed the same five levels, just against
different work. Here’s how employees at Anthropic use Claude Cowork, with
patterns and best practices applicable to your own organizations.
Finance and strategy
The problem
Financial analysis at Anthropic requires deep knowledge of data warehouse
schemas, complex SQL, and front-end engineering cycles the team didn't have.
Dashboard builds took weeks. Alerts surfaced raw metrics with no context:
"revenue down 3%" instead of "revenue down 3% driven by a dip in APAC
enterprise renewals." The institutional knowledge of which tables to query and
how to interpret them lived in two or three people's heads.
The approach
The team's first step was connecting Claude Cowork to the data warehouse via
MCP and asking ad-hoc questions against live data. The jump to building skills
was encoding the four queries they kept re-running as skills: an insight agent
for ad-hoc questions, a financial statements skill that produces standard reports,
a variance analysis skill that explains deltas rather than only flagging them,
and a dashboard builder that generates interactive HTML dashboards from a
description of what you want to see.
The true unlock, however, came when they shipped a company-wide data skill
anyone at Anthropic can install. It knows the schema, the naming conventions,
and the quirks of the tables so that a PM or a sales manager can ask a question
of the warehouse without knowing SQL or which of seventeen tables has the
number they need.
The impact
Development velocity moved from weeks to hours. Non-technical team
members build interactive dashboards without filing a ticket. One account
executive built a book-of-business dashboard, credit usage, per-account ARR,
momentum indicators, drill-downs, that he uses multiple times a day. His
manager now uses it to look across every rep on her team.
Alerts got useful, too. When a metric moves, Claude pulls the context and
surfaces the likely driver alongside the number. The conversation moves from
"what happened"? to "what do we do about it?"
Legal
The problem
Legal is information-dense, high-stakes, and chronically bottlenecked.
Throughput work, including regulatory monitoring across jurisdictions, internal
comms, and ticket triage, consumed hours better spent on judgment calls and
complex legal questions. Before Claude, the team's institutional knowledge lived
in memos, risk frameworks, and a policy wiki most people hadn't read in full.
17

-- 17 of 24 --

The approach
The team built the Legal plugin in an afternoon, not by coding anything, but by
pointing Claude at their actual work product: the memos, the risk frameworks,
the policy docs. The plugin is markdown files that tell Claude how Anthropic's
legal team thinks about risk, reviews launches, and structures advice.
As Pike describes it, the project is recursive: he used Claude to build the plugin,
and now uses the plugin every day to do his actual job. The plugin is open-
source on GitHub alongside the other knowledge-work plugins, because there's
nothing proprietary about it. It's system instructions, not case law.
Legal is the clearest example in the company of skipping rungs of the Claude
Cowork adoption ladder. Because the team's process was already written down
in memos and frameworks, Pike could "here's our policy folder, draft this launch
review" to a department plugin in a single afternoon.
The impact
The Anthropic legal team saw the immediate returns when adopting Claude
Cowork.Regulatory monitoring across dozens of jurisdictions went from reading
everything and hoping you catch what matters to reading what Claude flagged
and deciding. The team reads what's material instead of triaging the full feed.
Biweekly legal updates for the executive team used to take the better part of
a day to compile. Now they take a fraction of that, because Claude does the
synthesis across intake tickets, Slack threads, and matter status before anyone
opens a doc.
And the team pointed Claude at 742 Jira tickets, the full legal intake backlog, and
asked what the work actually looked like. The analysis reshaped how the team
structures intake: which categories can be templated, which need a human from
the start, and where the queue was backing up and why.
The plugin is generic out of the box and gets good when customized. The version
Anthropic Legal runs internally has the team's playbooks, risk frameworks, and
what they call the Legal Constitution baked in.
Sales
The problem
Reps spent more time documenting work than doing it. The context for any
given account lives in Salesforce, email, Gong recordings, Slack, and somebody's
memory, and before every call, someone has to reassemble it. Thirty minutes
of prep for a call you might get fifteen minutes of useful conversation out of,
multiplied across a book of hundreds of accounts.
The approach
The sales plugin encodes how the team's best sellers work as five skills: a
morning briefing that organizes the day, call prep that pulls the full account
context into one brief, post-call follow-up that drafts the email and updates the
opportunity, competitive intelligence that tracks what's moving in the market,
and asset creation that generates custom collateral on demand.
These Claude Cowork-powered systems surface information to the rep rather
than requiring the rep to go find it.
The impact
The morning briefing organizes the day in about two minutes: today's calls,
which deals need attention, what changed overnight. Call prep that took thirty
minutes of manual research happens in the background while you're on the
previous call.
One rep built a skill that auto-updates Salesforce opportunities after calls: Claude
takes the call context, fills in every required field, and writes the description, use
cases, notes, and next steps, formatted the way he wants them. He started with a
validation step on every update. After enough manual checks confirmed Claude
was getting it right, he removed the validation and lets it run. That progression,
run it supervised, then run it scheduled, is the Level 2 to Level 3 move, and it
saves hours per week.
18

-- 18 of 24 --

Another Sales team hack? For ticket filing, copy a customer Slack thread into
Claude Cowork, ask it to summarize, create the ticket, and post it to the finance-
tickets channel after approval. Thirty seconds versus three to five minutes. A
teammate used Claude Cowork to bulk-correct a field that was wrong across
hundreds of Salesforce records, the kind of fix that would otherwise be a painful
manual afternoon or a ticket to ops.
Product management
The problem
Product management work spans dozens of activities daily and most of it
happens in meetings. The failure mode is things slipping through the cracks: a
decision made in a meeting that nobody wrote down, a customer insight from
a sales call that never made it into the PRD. Before Claude Cowork, Claude
couldn't help with the core PM work, strategy, roadmaps, PRDs, because it lacked
the organizational context to say anything useful.
The approach
The biggest unlock for PMs was plugin stacking. Rather than one PM plugin, the
team layers several: the productivity plugin for personal context and calendar,
the data plugin for live analytics, the sales plugin for customer insights from calls
and tickets, and the product plugin for PRD structure and roadmap methodology.
Individually, each plugin is useful. Stacked, Claude has org context, real usage
data, actual customer quotes, and a framework for turning all of it into a PRD, at
the same time, in the same session.
The impact
PRDs get written from real data and customer context rather than generic
templates. Claude pulls the usage numbers, surfaces the relevant customer
feedback, and drafts against the team's PRD structure. The PM's job shifts from
gathering to deciding.
The compounding effect of layering plugins is worth noting. Each plugin is useful
on its own. Together they're more than the sum, because the context from one
informs the others: a customer complaint from the sales plugin shapes the priority
call in the product plugin, grounded in the usage data from the data plugin.
19

-- 19 of 24 --

Chapter 6
Leveling up with
Claude Cowork 20

-- 20 of 24 --

Chapter 5
Leveling up with Claude Cowork
Across very different companies and teams at Anthropic, the arc was the same:
connect Claude to real work, get one deliverable back, encode what worked as a
skill, bundle and share it.
You don't need every employee using the same plugins to call a deployment
successful. You need every employee more productive than they are today, and a
clear path to the next rung of the adoption ladder. Connecting the systems to get
real work done is possible on day one. Give champions room to build, and then
provision their work so everyone after them has a leg up.
The teams in this guide didn't transform how they work in a single step. They
each took one, then kept going.
21

-- 21 of 24 --

Additional resources 22

-- 22 of 24 --

Additional resources
Learn
• Introduction to Claude Cowork
• Customize Claude Cowork with plugins
• Getting started with Claude Cowork
• Check out our open-source plugin repository
Watch
• The future of AI at work: Introducing Claude Cowork (webinar)
• Claude Cowork in an hour (webinar)
Get started
• Contact sales for a pilot scoping session
• Explore Claude for Enterprise
23

-- 23 of 24 --

claude.com/product/cowork

-- 24 of 24 --
