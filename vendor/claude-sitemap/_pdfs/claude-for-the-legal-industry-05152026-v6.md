---
source_url: https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/6a0775c566cb42bd866e108b_Claude-for-the-legal-industry-05152026_v6.pdf
referrer: https://claude.com/solutions/legal
pages: 21
fetched_at: 2026-05-16T04:29:29.801Z
kind: pdf-mirror
---

Claude for the
legal industry
A practical deployment guide

-- 1 of 21 --

Table of contents
Product overview 	4
How Anthropic’s Legal team uses Claude 	9
Claude for legal adoption roadmap 	11
Getting started 	15
Resources 	17
2

-- 2 of 21 --

3
Foreword
The legal profession is at an inflection point. The work is getting more demanding: matters are more
complex, clients expect faster turnaround, and hiring is harder than it used to be. At the same time, AI
has matured from a curiosity into a practical tool that can help with all three. Firms and legal departments
that adopt it thoughtfully now will be better positioned for what comes next.
A 2026 FTI Consulting / Relativity General Counsel Report found that 87% of general counsel now
report genAI use within their teams, compared with 44% the prior year. The longer-term trajectory is even
sharper: CLO gen AI use has climbed from 20% in 2023 to 87% in this year's report. Across drafting, research,
diligence, and matter management, the industry has historically been fast to adopt any technology that drives
productivity by accelerating repetitive workflows. Today, that's agentic AI: systems that act on the work, not
just answer questions about it. The same research found summarization (83%), contract clause identification
(63%), and transcription (53%) are the top gen AI use cases inside legal departments today.
At Anthropic, we are seeing this in action. Legal teams are using Claude for contract review and redlining,
legal research, M&A diligence, privacy impact assessments, matter management, regulatory monitoring,
and outside counsel oversight. Multiple Claude products can be used by legal teams and law firms: Claude
for chat and research, Claude Cowork for matter-level work across files and apps, and Claude for Microsoft
365 for the hours spent in Word, Excel, PowerPoint, and Outlook.
Legal work runs on a broad stack—contract lifecycle systems, research platforms, document management,
e-discovery, data rooms, and the firm-specific precedents and house style that sit on top. Claude connects
to all of it through three building blocks: MCP connectors bring matter data into Claude, practice-area
plugins bundle the workflows lawyers run most often, and an open-source ecosystem lets in-house teams
and firms extend Claude to match how they practice.
Beyond pure legal work, Claude is being used by businesses to manage the day-to-day knowledge work
that fills the rest of the workweek, such as triaging email, prepping for meetings, drafting status updates,
and other administrative work. Cowork is well suited to this kind of multi-app, multi-step overhead, so
the same tool that redlines an NDA in the morning can clear an inbox and prep tomorrow's deposition in
the afternoon.
This guide walks through each product, offers customer examples from across the legal industry, and shares
tips on how to roll out Claude inside your organization.

-- 3 of 21 --

Chapter 1
Product overview 4

-- 4 of 21 --

Chapter 1
Product overview
Claude shows up to work for lawyers in a few forms: Claude chat, Claude Cowork,
Claude for Microsoft 365, Claude Platform, and Claude Managed Agents.
Claude Chat
The Claude web and desktop app, at Claude.ai, is a chat interface for research
and drafting. An associate might use it to summarize a deposition transcript or
pressure-test an argument before pulling it into a brief. Use Chat when the work
fits inside a single conversation: a question to the model, a research summary,
an inline draft. Each conversation is its own session, so Chat is suited to one-off
tasks rather than ongoing matters. It is often the first place a new user starts.
Claude Cowork
Claude Cowork is a desktop application where Claude works across local files
and connected apps to complete multi-step matters. It can read and write local
documents, call connected services like iManage, NetDocuments, Box, and
Microsoft 365, and coordinate work across files and apps. Use Cowork when the
work spans multiple files, multiple apps, or multiple steps — reviewing every
contract in a data room, comparing third-party paper against the firm's playbook,
or drafting a PIA from a folder of prior assessments. Cowork can run for minutes
or hours on a single task, with the lawyer reviewing the output once it is done.
Claude Chat or Claude Cowork?
The simplest distinction: Chat is for asking questions and working with
Claude in the moment. Cowork is for delegating a project to Claude and
reviewing the result. Most lawyers use both — Chat for quick questions
through the day, and Cowork for the matter-level work that would
otherwise eat an afternoon.
Claude for Microsoft 365
Legal teams can use Claude inside Microsoft 365 in two ways. Add-ins from
the Microsoft Marketplace put Claude inside Word, Outlook, Excel, and
PowerPoint, so a lawyer can redline a contract with tracked changes and turn
the analysis into a memo without leaving the app. The Microsoft 365 connector
lets Claude search and analyze content in Outlook, Teams, SharePoint, and
OneDrive. Context carries across the suite, so a redline drafted in Word can be
turned into a client update without rebuilding anything.
Claude Platform
The Claude Platform is Anthropic's API for organizations building their own
applications on Claude. Legal engineering teams and legal tech companies use
it to embed Claude into contract lifecycle, e-discovery, matter management
systems, and other internal software.
Claude Managed Agents
Claude Managed Agents allows teams to take any agent it builds on the Claude
Platform and have Anthropic run it as a hosted service, with the long-running
sessions, scoped permissions, and audit trail handled for them. For example, a
Contract Review agent might handle NDA triage across thousands of incoming
agreements.
5

-- 5 of 21 --

Claude product matrix: when to use what
Surface 	Best for 	Primary users 	Where it runs 	Example task
Claude.ai
Conversational drafting,
research, and analysis in a
chat interface
All legal staff 	Browser, desktop, mobile
"Summarize this
deposition transcript and
flag inconsistencies."
Claude Cowork
Cross-app matter work
that touches files and
multiple tools
All legal staff 	Claude desktop app
"Review the data room
contracts in Box, flag
material issues, and produce
a diligence summary."
Claude for Microsoft 365
In-place drafting, redlining,
and comparison across the
Microsoft 365 suite; context
carries across apps
All legal staff
Word, Outlook, Excel,
PowerPoint (add-ins); Teams,
SharePoint, OneDrive (via
M365 connector)
"Redline this MSA against
our playbook and produce
a deviation summary."
Claude Platform (API)
Building custom legal
applications; embedding
Claude into CLM,
e-discovery, or matter
management
Legal engineering, platform
teams, legal tech vendors
Anthropic API, Amazon
Bedrock, Google Vertex AI,
Microsoft Foundry
"Integrate Claude into our
CLM to triage incoming
third-party paper"
Claude Managed Agents
Running custom legal agents
as hosted cloud services
with Anthropic handling
the runtime
Platform and legal
engineering teams Claude Platform
"Deploy our NDA triage
agent as a managed service
with scoped permissions
and audit tracing."
6

-- 6 of 21 --

Customizing Claude: connectors, skills, and plugins
Claude becomes specific to a legal organization through three building
blocks. Connectors give it access to the firm's matter data. Skills teach it how
to complete specific legal tasks in a repeatable way. Plugins bundle skills,
subagents, and connectors into installable packages for a specific practice area.
MCP Connectors
MCP Connectors give Claude access to a specific data source over the Model
Context Protocol (MCP), an open standard that lets Claude query the provider's
system directly rather than working off an uploaded copy. This matters in legal
work, where confidentiality and privilege must be preserved end to end.
Skills
Skills are reusable, encoded workflows that teach Claude how to complete
specific legal tasks in a repeatable way. They are valuable in legal work, where
consistency, oversight and accuracy are not optional.
Skills are best used for work that follows a standard format. An NDA review skill
captures the firm's playbook and fallback positions, while a citation skill enforces
Bluebook or local format.
Anthropic has pre-built skills for PDF, Word, Excel, and PowerPoint creation.
Firms can also build their own skills. Simple skills are written in Markdown with
no code; more advanced ones can include executable scripts. Either way, skills
are uploaded in Claude.ai settings, Claude Code, or the API.
The connectors most relevant to legal organizations include:
Contract lifecycle & drafting:
Document management:
Legal research & case law:
E-discovery and review:
Legal AI assistants, skills, and expert network:
Productivity and collaboration:
Public Service:
Deal rooms and transaction documents:
7

-- 7 of 21 --

Subagents
Subagents are narrowly-scoped helper agents that Claude can delegate to
mid-task. Where a skill tells Claude how to do something, a subagent is an
agent that runs in its own context window with its own system prompt and
tool access, completes one bounded job (check a citation, extract a clause, audit
defined terms) and reports back. They keep long matters from overloading a
single context window and let firms put tighter tool restrictions on the parts of a
workflow that touch sensitive systems.
Plugins can package subagents alongside skills and connectors so a practice area
ships with the right helpers built in.
Plugins
Plugins bundle skills, subagents, and connectors into a single installable package
for a practice area.
Anthropic-built plugins are open source, so firms can install them as shipped or
fork them to swap in their own playbooks and add approval workflows. Partner
plugins bring specialized data and provider-built skills into Claude.
Lawyers have different areas of expertise and focus. These plugins expand
beyond our initial legal plugin launched in early 2026, aligned to more specific
practice areas. Here is a list of plugins designed for legal professionals:
• Commercial Legal. Reviews vendor agreements, NDAs, and SaaS
subscriptions against the playbook you taught it, with separate positions for
sales-side and purchasing-side work. Tracks renewals, routes escalations,
and translates findings for business stakeholders.
• Corporate Legal. M&A diligence at scale: extracts issues from a data room,
builds disclosure schedules, drafts board consents, tracks the closing checklist,
and runs tabular review across hundreds of agreements. Modular setup for
deals, board work, public company governance, and entity compliance.
• Employment Legal. Jurisdiction-aware. Reviews hires and terminations,
classifies workers, tracks leave deadlines, runs investigations, and drafts
policies with state supplements.
• Privacy Legal. Reviews DPAs against your playbook, triages PIAs and DPIAs,
drafts DSAR responses with the right statutory timeline, and watches for drift
between what your policy promises and what your practice does.
• Product Legal. The connective tissue between a Product Review Doc and a
launch. Reviews launches against your framework, checks marketing claims
for substantiation, triages "can we do this?" questions, and learns what actually
blocks a launch at your company.
• Regulatory Legal. Watches regulatory feeds, filters by your materiality
threshold, diffs new rules against your policy library, tracks gaps and comment
deadlines, and drafts proposed policy updates for review.
• AI Governance Legal. Triages AI use cases against your governance tiers,
runs impact assessments, reviews vendor AI terms, and checks whether your
AI policy has kept pace with your practice. Ships with a policy-starter skill that
drafts a firm AI policy from published model policies.
• IP Legal. Trademark clearance, FTO triage, cease-and-desist drafting and
response, DMCA takedowns, OSS compliance, IP clause review, invention
intake screening, and portfolio tracking. Loud guardrails on anything that
needs a specialist.
• Litigation Legal. Matter intake, portfolio tracking, legal holds, demand letters,
subpoena triage, chronologies, depo prep, privilege logs, claim charts, and brief
drafting. Adapts to in-house, firm associate, or solo practice.
• Law Student. Socratic drilling that won't give you the answer, because
the point is learning. Case briefing, outlining, IRAC grading, bar prep with
jurisdiction distinctions.
• Legal Clinic. Client intake, deadline tracking, case memos, and supervisor
review queues. Supervisors set a pedagogy dial per practice area that controls
how much the plugin does versus how much the student does. Built within
ABA Formal Op. 512.
• Legal Builder Hub. Finds, reviews, installs, and updates community-built legal
skills from registries like Lawvable, with a security review, license gate, and
freshness check on every install. The trust layer for the open legal skills ecosystem.
Each role can run as a plugin in Cowork and the Microsoft 365 add-ins for
desktop use with a human in the loop. Lawyers stay in the workflow, reviewing
and approving the agent's outputs before anything moves downstream.
8

-- 8 of 21 --

Chapter 2
How Anthropic’s Legal
team uses Claude 9

-- 9 of 21 --

Chapter 2
How Anthropic’s Legal team uses Claude
Anthropic's own legal team has built four Claude-powered workflows into daily
practice. Each one targets work that follows a standard shape and gets reviewed
by a lawyer before anything moves downstream.
Marketing review
The Marketing Material Self-Review Tool lets go-to-market employees check
their own content before sending it to Legal for final review. Marketers paste
their draft into a Claude Project, and Claude analyzes it using a skill that
captures the legal team's historical guidance and review framework. The tool
flags issues like publicity rights concerns, overstated claims, and statistical
accuracy problems, and labels each as low, medium, or high risk. It also suggests
fixes before the marketer submits a formal review ticket.
When content does get submitted for formal review, it is triaged to the right
lawyer with the pre-flagged issues attached. Turnaround time dropped from two
to three days down to 24 hours after the tool went live. Lawyers still read every
blog post; the self-review layer just clears the obvious issues so review time can
go to the calls that require judgment.
Outside business activity review
The Outside Business Activity Request Form expedites conflict-of-interest
review for Anthropic employees who want to consult or join a nonprofit board.
Employment lawyers were previously spending significant time on routine COI
form reviews; this workflow takes the routine cases off their plate.
Employees fill out a form with their department, manager, and a description of
the proposed activity. Claude analyzes the submission against the COI policy
framework and sends a recommendation to lawyers via Slack for approval.
Where reviewers used to follow up with employees over multiple rounds to
surface details, Claude reads the form, asks for more information if needed, and
proposes an outcome. The recommendation lands in the legal team’s queue with
the analysis already completed.
Privacy impact assessments
Writing PIAs from scratch was tedious, even when assessments followed similar
patterns. Anthropic’s legal team now uses MCP servers to connect Claude to
a Google Drive folder of prior PIAs, paired with a Skill that captures the firm's
format and the issues to look for in each new assessment.
A lawyer can ask Claude to read the prior assessments, apply the standard
concerns from the Skill, and draft a new PIA from that context. The lawyer then
reviews and finalizes the document. End-to-end, this new workflow reduces time
spent on each PIA from roughly two hours to thirty minutes.
10

-- 10 of 21 --

Contract redlining
Comparing contract versions and recommending fallback language is time-
consuming work. Claude now compares document versions in Google Docs and
Microsoft 365, highlights the changes, and recommends language from the firm's
commercial playbook. The team configured Claude to work inside Google Docs
and comment with suggested edits in real time, so a reviewer can ask directly in
the document whether a piece of language meets the firm's standard, and get an
immediate answer.
The team also writes skills to streamline review of specific document types like
NDAs and third-party vendor agreements. This workflow has reduced redlining
from hours to minutes per agreement.
11

-- 11 of 21 --

Chapter 3
Claude for legal
adoption roadmap 12

-- 12 of 21 --

Chapter 3
Claude for legal adoption roadmap
Most successful Claude rollouts in legal organizations follow this sequence: the
team lays the foundation for a pilot program, runs a pilot with a focused practice
group, and scales out to the rest of the legal department or firm. Anthropic's
recommended Claude Cowork adoption playbook maps out these three phases.
Phase 1: Lay the foundation
Before launching a Claude pilot program, the responsible team needs to put
access and connectors in place. For most legal organizations, this means standing
up Claude on the first-party API, Amazon Bedrock, Google Vertex AI, or Microsoft
Foundry — whichever keeps Claude inside the firm's existing cloud perimeter.
Enterprise controls for SSO, SCIM, audit logs, and custom data retention need
to be configured at this stage. Scope governance in parallel: legal hold, privilege
protection, and data-privacy review should run alongside access setup.
The connector set usually starts with the Microsoft 365 connector for Outlook,
Teams, SharePoint, and OneDrive access, plus one or two systems the pilot team
relies on most. Common starting points are iManage or NetDocuments for matter
files, Thomson Reuters for research, and Ironclad or DocuSign for contracts.
Firms can install these a la carte as MCP connectors, or access them inside one of
Anthropic's legal plugins.
Next, use Claude to analyze your legal ticket requests to solve the cold start
problem. Point Claude at your inbox, your ticket queues, and other work to figure
out what Claude might be able to assist your department with.
Pick work that is document-heavy and standard-shape. For an in-house team,
that might be NDA triage or PIA drafting. For a law firm, that could be diligence
document review or first-draft research memos. Avoid piloting Claude on novel or
high-stakes matters without strong human review.
Pro-tip: Have your champions leverage pre-configured plugins so they get value
in the first session. If a lawyer opens Claude Cowork and does not know what to
do or what the desired outcome is, they’re unlikely to open it again. If they open
it, type /nda-triage, and get a clean redline in ninety seconds, they’re more likely
to return.
Phase 2: Pilot
At this stage, champions are running real workflows with real matter data
and measuring the pilot's success against pre-defined criteria. Time saved is a
common metric, specifically tracking the team's cycle time on the pilot job before
and after Claude. Another is how often a lawyer keeps Claude's draft without
a meaningful rewrite. Together, these two criteria help you assess whether the
pilot is working.
Another strong signal that a pilot is working is when champions start to build their
own skills. A privacy counsel takes the DPIA workflow she has been running by
hand and turns it into a skill with the firm's template and approval flow embedded.
That is now a skill the rest of the legal team can begin using immediately.
In most pilots, Claude's product surfaces come online in a specific order. Skills
and plugins come first because they are low-risk and high-reuse. The Microsoft
365 add-ins come next, extending what a pilot team has built into Word, Excel,
PowerPoint, and Outlook. Claude Cowork tends to come in at the back end of
the pilot, when the team is ready to move from single-document work to matter-
level work that spans files and apps.
Pro-tip: Schedule weekly check-ins with your pilot teams. They surface edge
cases fast, like citation hallucination or jurisdiction-specific variations, and you
want to hear about them while they are fresh.
13

-- 13 of 21 --

Phase 3: Scale
At this stage, plugins and skills that worked during the pilot are being rolled
out to more teams across the legal department or firm through admin-managed
plugin marketplaces. New hires benefit as well, as they start on day one with
already-encoded workflows. Onboarding is faster and the whole team can work
more efficiently.
Over time, skills begin compounding across teams. A skill built for one practice
area can be adapted for another when their work shares structure. A commercial
contract review workflow and an employment contract review workflow share
most of their structure. Adding a second practice group usually goes faster than
the first, and the firm's skill library grows.
Pro-tip: Align as a team on an intentional governance framework to enable
scaling with confidence and velocity. Have an understanding of how skills
are quality-controlled, tested before being rolled out, and maintained after
deployment to be kept up-to-date and functional.
The table below summarizes the actions you would take at each stage and what
you can expect to see as you go through rollout.
Phase 	Actions 	Phase
Foundation
Security and privilege review.
Identify 2–3 champion teams.
Install pre-built plugins.
Connect 1–2 core systems
(iManage/NetDocuments,
Thomson Reuters/Ironclad).
Champions reporting back
use cases. First "this saved
me an hour" moments.
Pilot
Champions run real
workflows. Weekly check-ins.
Measure against defined
criteria. Demo wins to
adjacent practice groups.
Measurable time savings.
Champions building and
sharing custom skills. Pull
from other teams.
Scale
Admin-provisioned plugin
marketplace. Encode pilot
learnings as firm-wide skills.
Onboard the next wave
of users.
Skills shared across practice
areas. New hires ramping
on encoded workflows.
Declining support tickets for
"how do I do this."
14

-- 14 of 21 --

Practice and segment use cases
The work legal teams tend to bring to Claude first is document-heavy and follows a standard shape, with human review before it ships. Still, Claude takes on the drafting
so reviewers can focus on the work that requires judgment, like client counseling and final contract review. The sections below show what that looks like across in-house
teams and different legal practices. They are illustrative rather than exhaustive, and legal use cases continue to expand as model intelligence and tool use evolves.
In-house legal departments
In-house teams spend most of their time on documents that need to ship
fast and are reviewed before going to the business or to outside counsel.
Claude speeds up the drafting, giving counsel more time for the work that
requires judgment, with:
• Contract review and redlining against playbook
• NDA triage and counterparty paper review
• Privacy impact assessments and data subject requests
• Outside counsel billing review and matter management
• Marketing copy and product feature review
• Board materials preparation and corporate governance tasks
• Regulatory monitoring and compliance updates
Transactional review
Transactional practices spend the majority of their time on documents
that follow standard formats and partner-led review. Claude can compress
diligence cycles and improve coverage with:
• M&A diligence document review and summary memos
• Pitch book preparation and competitive analysis
• Comparable transaction analysis
• CIM and offering document drafting
• Closing checklist tracking
Litigation and disputes
Litigation practices process huge volumes of unstructured material on tight
timelines. Claude can shorten review cycles and improve consistency with:
• Discovery document review and privilege coding
• Deposition preparation and witness summaries
• Brief drafting and citation checking
• Pleadings analysis and motion drafting
• Expert report review
Compliance and regulatory
Compliance and regulatory teams sit across structured filings and
unstructured guidance, much of it in regulated jurisdictions. Claude can
improve accuracy and timeliness across the program with:
• Regulatory filing preparation and review
• Audit response and gap analysis
• Policy drafting and jurisdictional comparison
• AI governance and vendor review
• KYC/AML screening and escalation
15

-- 15 of 21 --

Frequently asked questions for CIOs and IT leaders
To help you get up and running, here are some common questions related to
Claude and Claude Cowork that legal teams might need to address for their CIOs.
Note: The questions below cover Claude.ai (web and desktop chat) and Claude
Cowork (desktop application). Custom applications built on the Claude Platform
have additional configuration options handled directly with the account team.
Where are Claude.ai and Claude Cowork hosted? Both are SaaS products
hosted by Anthropic. Firms that need workloads to run inside their own cloud
perimeter typically build custom applications on the Claude Platform via
Amazon Bedrock, Google Vertex AI, or Microsoft Foundry, rather than using
Claude.ai or Cowork directly.
What does Claude Cowork install on user endpoints? Cowork is a signed
desktop application available for macOS and Windows. It runs as a standard
user-space application, requires no kernel-level components, and updates
through standard auto-update channels. IT can deploy and manage it through
MDM and standard endpoint management tools.
How does Claude Cowork access local files? Cowork only reads files in folders
the user explicitly grants access to from inside the application. Access is scoped
per user, the same way modern desktop applications handle file permissions on
macOS and Windows. There is no background indexing of the user's drive.
Is our data used to train Claude's models? No. Anthropic does not train on
inputs or outputs from Enterprise Plan accounts using Claude.ai or Cowork.
What retention controls are available? Enterprise plans support custom
data retention, including zero-retention configurations, for both Claude.ai
conversations and Cowork sessions.
Do you support Zero Data Retention (ZDR)? ZDR is available on the Claude
Platform (API) and Claude Code for approved customers. Claude.ai and Claude
Cowork are stateful products—conversation history, Projects, and Cowork
sessions require server-side storage to function—so ZDR does not apply
there. Enterprise plans for those surfaces support custom retention windows
configurable down to 30 days, and Anthropic does not train on customer data on
any surface.
What identity and access controls do you support? Enterprise plans include
SSO via SAML, SCIM for user provisioning, role-based access controls, and
admin-managed plugin marketplaces for both surfaces.
What certifications do you hold? Anthropic is ISO/IEC 42001:2023 certified
for responsible AI management and SOC 2 Type II audited. Additional
documentation is available at trust.anthropic.com.
How does Claude Cowork integrate with our document management
system? Cowork connects to iManage, NetDocuments, Box, and more document
management systems through MCP connectors. The connectors authenticate as
the end user and respect entitlements at the matter and folder level, so Cowork
only sees what the user already has access to.
How is attorney-client privilege protected? Privilege protection rests on access
control and data handling. Connectors in Cowork honor the access controls
already configured in your DMS or matter management system. Anthropic does
not train on customer data, and Enterprise plans support custom retention. Firms
working with privileged content typically pair this with firm-defined policies on
which matters and document types can be processed.
How do we set firm-wide policies and guardrails? Plugins, skills, and
connectors can be provisioned through admin-managed marketplaces in both
Claude.ai and Claude Cowork rather than installed per user. This gives IT a
single place to control which workflows are available and which approval steps
are required before output moves downstream.
Who are the subprocessors? A current list of Anthropic subprocessors is
published at trust.anthropic.com and updated as the list changes.
Learn more in our Claude Cowork Enterprise Admin Guide.
16

-- 16 of 21 --

Chapter 4
Getting started 17

-- 17 of 21 --

Chapter 4
Getting started
The Claude ecosystem for legal spans connectors, plugins, partner MCP
apps, and pre-built agent roles for in-house, law firm, and compliance work.
All of it runs on the enterprise controls regulated organizations require,
including SSO, SCIM, audit logs, custom data retention, and ISO/IEC
42001:2023 certification.
To explore how Claude fits your firm or legal department, visit our legal
solutions page or contact your Anthropic account team at sales@anthropic.com.
18

-- 18 of 21 --

Resources 19

-- 19 of 21 --

Resources
• Legal tutorials on Claude.com: step-by-step guides covering contract review,
NDA triage, legal research workflows, installing the legal plugins, and more.
• Claude skills catalog: Anthropic's public catalog of community-contributed
skills, useful for finding pre-built legal skills before authoring your own.
• Open-source legal plugins repository: The GitHub repo where Anthropic
publishes the legal plugins covered in this guide.
• Blog article: How Anthropic uses Claude for legal work: A look at how our
own legal team uses Claude in daily practice across PIAs, marketing review,
and contract redlining.
20

-- 20 of 21 --

claude.ai

-- 21 of 21 --
