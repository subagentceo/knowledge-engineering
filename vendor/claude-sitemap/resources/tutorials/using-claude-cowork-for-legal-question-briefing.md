# Using Claude Cowork for legal: answer fast questions on past decisions

###### Watch the full workflow in the video, then follow the steps below to set it up yourself.

**In the video** — Mark, a product lawyer, gets a Slack message from a product manager: does a feature change reopen a review he wrote in January? He has a few minutes and none of the context he had when he wrote the memo. A scheduled task had already sorted his morning; a skill pulls the prior decision; he verifies the source line before he replies.

Follow along to set up

1Set up the brief skillSet up once2Schedule the morning briefSet up once3Run a brief on a questionPer question4Verify before you signPer question5Reply and close the loopPer question

If you haven’t set up Cowork yet, start with Get started in three steps, then Customize Cowork for connectors and skills.

To dive deeper into Claude Cowork, take the full Intro to Claude Cowork course.

Set up once

## Step 1: Set up the brief skill

Everything in this workflow runs on one skill — /brief. It knows where your past decisions live, how your reviews are structured, and writes back what was concluded with a citation for every claim.

You’ll use it two ways: a **daily** mode that sorts your morning in step 2, and a **topic** mode that answers a specific question in step 3. The Legal plugin ships with /brief already built. You install it, point it at your sources, and tell Claude to tailor it to your team.

Install and set it up:

1.  1In Customize → Plugins, open the Legal plugin and install it — it comes with the /brief skill, built on how a working legal team uses it.
2.  2In Customize → Connectors, connect the tools the skill draws on — your inbox, calendar, task tracker, chat, and wherever your reviews and decisions are stored. The skill reads across all of them.
3.  3In the Cowork chat bar, pick a working folder Claude can read, edit, and save to, so every brief lands somewhere you can find it later.

With the plugin installed and your sources connected, tell Claude to tailor /brief to your team — where your decisions live, how your reviews are structured, and the format you read fastest:

Customize the /brief skill from the Legal plugin for my team. Our reviews and past decisions live in where our reviews are stored — set up the daily memo and the topic brief around how my reviews are structured and the format I read fastest.

Copy prompt Open in Cowork

Working folder

Ask

Claude walks you through your document store and templates, then rewrites the skill to match. Run it on a question you already know the answer to, check the citations, and tell Claude to fix anything it got wrong.

Set up once

## Step 2: Schedule the morning brief

Put the /brief skill from step 1 on a morning schedule, so it runs on its own and you don’t type the same prompt every day. At the time you set in the scheduled task, it reads your inbox, tracker, and chat and leaves one short memo: what’s due today, what’s new, what’s urgent. You open Cowork to a sorted list instead of a full inbox to triage.

There are two ways to create it: type /schedule in any task, or open Scheduled in the sidebar and add a new one.

Here’s the prompt to set it up — replace the blanks with your own:

/schedule Every weekday at 8am, read my Gmail, issue tracker, and Slack and run /brief in daily mode to write a memo: what's due today, what's new, and what's urgent.

Copy prompt Open in Cowork

Working folder

Ask

Per question

## Step 3: Run a brief on a question

In step 2 you put /brief on a schedule for the daily memo. The other way to use it is on demand: when a specific question lands, you run /brief on that one question and get a cited answer back in minutes. In the video, the question is whether a feature change reopens a review from January.

It’s the same skill, so it already knows where your reviews live — your prompt only has to carry the question:

/brief does the new request change our conclusion on the prior review?

Copy prompt Open in Cowork

Reviews

Ask

The brief comes back short and organized: what you’d decided before, what’s different now, and where the two don’t line up. Every point links to the exact source it came from, so you can check it yourself — which is the next step.

Per question

## Step 4: Verify before you sign

Step 3 gave you the brief: the question answered quickly, with every claim cited back to its source. Before you act on it, read the source behind the finding you’ll rely on. You’re the one signing the reply.

To check the part that matters:

1.  1**Find what the question reopens** — the brief lists the parts of your prior review it affects.
2.  2**Click the citation on the claim you’re relying on** — every claim links back to its source section.
3.  3**Read the line in the source** — check that the brief quoted it correctly.
4.  4**Make your call** — the answer is yours to sign once you’ve read the source yourself.

Where your judgment applies

Claude did the prep, but the call is yours. Reading the source line yourself is how you apply your judgment before your name goes on the answer. That habit is what the AI Fluency framework calls **discernment**.

More on the habit: The 4 Ds of AI Fluency · the Framework and Foundations course

Per question

## Step 5: Reply and close the loop

Once you’ve verified the answer, finish the rest of the work — the part that happens in your other tools. Through connectors to your messaging and project-management tools, Claude can:

*   **Reply to your teammate** — with a messaging connector (Gmail, Slack), Claude drafts the response right in the tool you’d send it from.
*   **Close out the request** — with a task-tracker connector (Jira, Linear, Asana), Claude posts your decision, links the source, and marks the ticket done.

Claude asks before it sends or changes anything. You can do both in one prompt:

Draft a reply to the product manager in your messaging tool — my view: your call on the question. Then close the ticket in your task tracker: post my decision and the brief's list of what the question reopens, link the source review, and mark it done.

Copy prompt Open in Cowork

Working folder

Ask

## Make it yours

This setup isn’t legal-specific and can work for any role that fields fast questions about past decisions:

*   **Support and escalations** — what did we tell this customer last time, and what’s changed since?
*   **Compliance and risk** — which assessments does this change reopen?
*   **Finance** — what assumptions did we approve in the last forecast, and does the new request hold to them?
*   **Engineering on-call** — what did we decide about this system’s failure modes, and does the new alert fit a known one?

The setup is the same every time:

1.  1Get a skill that knows where your decisions are recorded and how you read them — from a plugin you tailor, or one you describe to Claude.
2.  2Schedule it so the day is sorted before you start it.
3.  3Run a brief on the question; verify the source line before you sign.
4.  4Close the loop with a connector so the decision lands where your team can find it.

## Learn more

*   Claude Cowork 101. Take the full Cowork course to dive deeper into the product.
*   Customize Cowork. Learn how to set up connectors, skills, and instructions.
*   AI Fluency: Framework and Foundations. Take the full AI fluency course to work towards effective, efficient, and ethical AI use.
*   The 4 Ds of AI Fluency. Learn practical skills and mental models behind building AI fluency.
*   Use Cowork safely. Understand access, approvals, and what Claude can see.