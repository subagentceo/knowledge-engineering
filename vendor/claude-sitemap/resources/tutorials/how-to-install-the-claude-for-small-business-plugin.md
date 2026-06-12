# How to install and use the Claude for Small Business plugin

The Small Business plugin in Claude Cowork puts Claude to work across the tools you already use — your accounting, payments, CRM, design, contracts, email, files, and calendar. You describe the job in plain English, and Claude reads the data, does the work, and shows you the result before anything sends, posts, or pays.

> To learn more, see Customize Claude Cowork and Customizing plugins in Claude Cowork

## Install and run the plugin

You'll need the Claude desktop app on a Pro, Max, or Team plan.

1.  Open **Cowork** and click **Customize** in the left sidebar.
2.  Under **Plugins**, click **+**.
3.  Find **Small Business** and click **Install**.

After installing the plugin, you'll have all of the skills listed below available. To tailor the plugin to your business and workflow, see the _Customize the plugin for your business_ section of this guide.

#### To run a skill:

*   Type `/` in the Cowork chat bar and pick it from the list, or
*   Describe the job in plain English and Claude picks the skill that fits.

Either way, Claude follows the skill's instructions for that task. To learn more, see What are skills and Use plugins in Claude Cowork.

## What's in the plugin

A plugin bundles a set of skills and the connectors they read from. Each skill is a set of instructions for a specific task. With the plugin installed, Claude already knows the steps for a range of tasks, so when you prompt for one it only has to be a few words.

Some skills in this plugin run a few of the others in sequence, asking for your decision between steps, so a bigger job is still one ask. The table lists each skill, what it does, and the tools it reads from

Skill

What it does

Tools it uses

Money and finance

/plan-payroll

Builds a 30-day cash forecast, ranks overdue invoices, and drafts a reminder for each one.Runs `cash-flow-snapshot` `invoice-chase`

QuickBooks, PayPal

/month-heads-up

Reads the next 30 days of cash, finds your tightest week, and flags what to watch before month-end.Runs `cash-flow-snapshot`

QuickBooks

/close-month

Reconciles your books against your payment processor and writes the close packet for your accountant.Runs `month-end-prep`

QuickBooks, PayPal

/price-check

Builds a margin-by-product table and pricing scenarios with break-even math.Runs `margin-analyzer`

QuickBooks

/tax-prep

Calculates quarterly estimated taxes or builds a year-end 1099 list, formatted for your accountant.Runs `tax-season-organizer`

QuickBooks

cash-flow-snapshot

Reads cash, invoices, bills, and incoming settlements and builds a 30/60/90-day forecast with the tight weeks flagged.

QuickBooks, PayPal

invoice-chase

Ranks overdue invoices and drafts a reminder for each one, matched to how that customer has paid before.

QuickBooks, PayPal

margin-analyzer

Builds a margin-by-product table and pricing scenarios with break-even math. Shows the numbers; you decide what to charge.

QuickBooks, PayPal

month-end-prep

Reconciles your books against your payment processor, flags what's off, writes the close packet for your accountant.

QuickBooks, PayPal

tax-season-organizer

Calculates quarterly estimated taxes or builds a year-end 1099 list, formatted for your accountant.

QuickBooks, PayPal

Sales and marketing

/call-list

Scores your leads on engagement, fit, and urgency, and writes a call card for the top ones.Runs `lead-triage`

HubSpot

/sales-brief

Ranks top and bottom sellers and drafts a content plan that pushes the winners.Runs `content-strategy`

QuickBooks or PayPal

/run-campaign

Reads your sales history, finds the slow stretch, drafts the offer, builds the assets, and stages the send.Runs `content-strategy` `canva-creator` `lead-triage`

HubSpot, Canva

lead-triage

Scores your leads on engagement, fit, and urgency, and writes a call card for the top ones with talking points.

HubSpot

content-strategy

Reads your sales data, finds what's selling and what isn't, and drafts a content plan that pushes the winners.

QuickBooks or PayPal

canva-creator

Builds the campaign from a brief: posting calendar, social designs, captions, and a staged email.

Canva, HubSpot

Customers and operations

/handle-complaint

Reads a customer email, looks up their order and history, and drafts a reply matched to the situation.Runs `ticket-deflector` `customer-pulse`

Gmail, HubSpot

/customer-pulse-check

Reads disputes, tickets, emails, and reviews and groups them into themes with a draft response for each.Runs `customer-pulse` `ticket-deflector`

PayPal or HubSpot

/crm-cleanup

Finds stale deals, duplicate contacts, and missing fields. Shows what it found before changing anything.Runs `crm-maintenance`

HubSpot

/review-contract

Reads a contract and writes a plain-English summary, a red-flag list, and a marked-up redline.Runs `contract-review`

Uploaded file

ticket-deflector

Reads a customer email, looks up their order and history, and drafts a reply matched to the situation.

PayPal, HubSpot, Gmail

customer-pulse

Reads disputes, tickets, emails, and reviews and groups them into themes with the most fixable problems first.

PayPal or HubSpot

crm-maintenance

Finds stale deals, duplicate contacts, and missing fields. Shows what it found before changing anything.

HubSpot

contract-review

Reads a contract and writes a plain-English summary, a red-flag list, and a marked-up redline.

Uploaded file; Docusign optional

Business intelligence

/monday-brief

One page to start the week: cash, sales trend, pipeline, this week's calendar, and what most needs you today.Runs `business-pulse`

Whatever's connected

/friday-brief

Revenue against last week, what sold, wins and watches.Runs `business-pulse`

PayPal or HubSpot

/quarterly-review

Revenue and margin trends, customer health, opportunities, and risks, written as a narrative.Runs `business-pulse`

QuickBooks

business-pulse

One page: cash, sales trend, pipeline, this week's calendar, and the things that most need your attention.

Whatever's connected

Hiring and setup

job-post-builder

Writes a job post, a structured interview guide with a scoring rubric, and an offer letter template.

No connector required

smb-onboard

The setup skill. Asks about your business, helps you connect tools, and saves your context so every other skill knows it.

No connector required

The tools listed are the defaults. When you customize the plugin, you can point a skill at the tools you actually use — a different payment processor, accounting tool, or CRM — and the skill reads from those instead.

## Customize the plugin for your business

The skills come with defaults written for a typical small business. There are two ways to make them yours.

In **Customize → Plugins**, open **Claude for Small Business** and click **Customize**. Or type the prompt yourself in the Cowork chat bar:

Customize the "smb-complete" plugin for me based on my company.

Copy

Claude asks about your business — what you do, who works with you, what's hardest right now — and rewrites the plugin's defaults to match. From then on, the skills carry your context: your industry, your team size, your priorities, the way you like things done.

As you do tasks with Claude that run these skills and see the output they produce, you can tell Claude to update any of them at any time — say what you'd like different and the change is saved. Over time the skills get more tailored to how you like things done and how you want the outputs to come out.

For the full pattern, see How to customize plugins in Cowork.

## Examples to try

Pick something that's on your list this week and describe it the way you'd describe it to someone you trust to handle it. Claude reads your prompt and runs the skill that fits.

### Money and finance

*   _What does cash look like for the next 60 days?_
*   _Which invoices are open and which ones should I follow up on?_
*   _Help me close out April and reconcile the books._
*   _What are my margins on the catering side of the business?_
*   _Get my Q2 estimated taxes ready for my accountant._

### Sales and marketing

*   _Who should I call first today?_
*   _What's selling and what should I push this month?_
*   _June is usually a quieter month — help me plan a promo to fill it._

### Customers and operations

*   _A customer wrote about a late shipment. Help me draft a reply._
*   _What are customers saying lately, and what should I act on?_
*   _Tidy up the CRM and tell me what's worth a fresh look._
*   _Walk me through this NDA before I sign it._

### Business intelligence and hiring

*   _Give me my Monday brief._
*   _How'd we do this week?_
*   _Write the QBR narrative for last quarter._
*   _Help me hire a part-time bookkeeper — write the post and the interview guide._

For a step-by-step walkthrough of four of these — payroll, the month-end close, the Monday brief, and a campaign — see Using Claude for your small business.

## Things to note

*   **You approve before anything sends, posts, or pays** — skills draft, propose, and stage. Nothing goes out until you say so.
*   **Your existing permissions hold** — Claude reads what your account in each tool can read. It can't see data you don't already have access to.
*   **Anthropic doesn't train Claude on your business data** — and the permissions you've already set in your tools still apply. If an employee can't see something in QuickBooks today, they can't see it through Claude. The full policy is in the Trust Center.
*   **The big decisions stay with you** — Claude prepares the work and shows you what it found, but the calls that matter — what to charge, what to sign, what to send your accountant — are yours and your professionals' to make.
*   **Some features depend on your plan in a connected tool** — generating designs or staging sends may need a higher tier in that tool. When something isn't available, the skill tells you and offers a workaround.

## Learn more

*   Introducing Claude for Small Business — the launch announcement
*   Using Claude for your small business — four workflows the plugin runs end to end
*   How to customize plugins in Cowork — make the skills run from your context
*   What are skills — how skills work in Claude
*   AI Fluency for Small Business — a free course on running a small business with AI