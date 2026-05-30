# Customize Claude Cowork

Claude Cowork runs full tasks across your files and tools. Customizing it once means every task after that starts with your systems connected and your team's process already in place. For the quickstart, see Get started in Cowork in three steps.

## Level 1: Your context and tools

### Connectors

Connectors plug Cowork into the systems where your work already is — Slack, Salesforce, Microsoft 365, Jira, your company's internal tools — giving it the context to understand a task and the ability to act on it. With a connector enabled, Claude can read your data _and_ write back: update a ticket, draft a reply, post to a channel, save a file.

Enable connectors from the **Customize** panel in the left sidebar. Authorize once; Claude can then use that tool in any session.

> **Permissions.** For enterprise users, your admin controls which connectors are available — including Claude in Chrome — and whether each has read-only or write authorization. You can adjust which tools are enabled for a given session from the **Customize** menu or in the chat bar. More on connector permissions.

### Instructions

Instructions are standing rules you write for how Claude should work — tone, formatting, which sources to check first, conventions to follow. Set them at two levels:

**1. Global instructions** apply to every Cowork session you run.  
_Edit them at Settings → Cowork → Global instructions (desktop app only)._

**2. Project instructions** apply only inside that Project, on top of your global ones.  
_Edit them in the_ _Project's_ _right panel under Instructions._

**3. Organization instructions:** For enterprise users, your admin may also set Organization preferences.  
This is org-wide guidance that applies across Chat, Cowork, and Code alongside your own instructions.

Instructions apply to every task — they're like the background rules Claude follows regardless of what you're working on. A Skill is for one specific kind of task, loads only when relevant, and can be shared with teammates. General rules go in Instructions; a repeatable process goes in a Skill.

## Level 2: Capture your process

### Skills

Skills are instruction files for Claude to complete specific tasks in a repeatable way. Use skills to encode your personal best practices — as well as your team's expertise — into a repeatable set of instructions. 

To use a skill, name it directly (`/skill-name`) or describe the task in plain language. Claude can recognize when a skill applies and load it.

Creating a skill can also be done with Claude in a prompt. Run through a workflow in Cowork the way you normally would. At the end of the work, ask Claude: `Package what we just did into a skill.`  
‍  
The built-in skill-creator captures the steps, templates, and source locations so the next run is one prompt. Create your first skill in Cowork.

## Level 3: Bundle and share

### Plugins

Plugins bundle together Connectors and Skills so teammates have what they need to get started. 

**Connectors**Access to your systems and tools

- **Skills**Best practices for the work

=

**Plugins**Both — installed in one click

#### Example plugins

Anthropic publishes ready-made plugins for common roles, each pairing the connectors that role relies on with skills for its core workflows:

- **Sales** — Salesforce and Outlook, with Skills for meeting prep, follow-up logging, pipeline reviews, and battle cards.
- **Product** — Jira, Confluence, and Slack, with Skills for feedback clustering, PRD writing, sprint updates, and competitive teardowns.
- **Legal** — SharePoint and Word, with Skills for contract redlines by type, regulatory monitoring, and renewal tracking.
- **Operations** — Jira and Salesforce, with Skills for queue triage, escalation routing, and customer-onboarding kickoffs.

Browse available Plugins in the **Customize** sidebar for more options, or ask Claude to bundle your own connectors and Skills into a custom plugin to share with your team. Browse plugins for my role in Cowork.

## Where to go from here

Most people start with connectors and Instructions, write a skill after running the same task a few times, and share it once a teammate asks how to set theirs up the same way. Plugins are how your admin distributes the org's standard set across roles.

Once you're set up, additional Cowork features can take you further:

- **Scheduled tasks** run a prompt at a set time, with access to everything you've connected — so a Skill you've written can run every weekday at 9am without you starting it. Type /schedule in any session to set one up. More on scheduled tasks.
- **Live artifacts** are dashboards, trackers, and comparison views that stay in the sidebar between sessions. Open one any time and ask Claude to refresh it with current data from your connectors. More on live artifacts.
- **Dispatch** lets you start a task from your phone. The work runs in Cowork on your desktop with your connectors, Skills, and files; you get the result on your phone when it's done. Dispatch in Claude Cowork.

For more on working in Cowork:

- When to use Chat vs Cowork — how to choose the right mode for the task you're working on.
- Building plugins from scratch — when the marketplace doesn't have what you need.
