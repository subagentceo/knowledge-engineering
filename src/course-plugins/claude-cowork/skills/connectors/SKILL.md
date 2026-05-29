---
name: connectors
description: Set up and use connectors so Cowork can reach the apps where your work lives (email, calendar, messaging, drive, CRM), and know when to fall back to Claude in Chrome. Trigger when the user asks how to connect Gmail/Slack/Drive/M365, which connectors to add first, how to reference connected apps in a prompt, or how to reach a tool that has no connector.
---

# Connectors: Reaching the Apps Where Your Work Lives

> Distilled from the *Introduction to Claude Cowork* course.

Connectors are how Claude reaches into the apps where your work already happens — email, calendar, team messaging, CRM, cloud storage. You set them up once in the **Customize** area, then toggle off/on the connectors you need **per task**. Each task only uses the connectors you've toggled on.

## Which to set up first

- **Email and calendar** (Outlook via M365, or Gmail) — pull context from meetings, draft follow-ups, find past threads.
- **Messaging** (Slack, or Teams via M365) — search channel history, synthesize what your team said.
- **Cloud storage** (SharePoint/OneDrive via M365, Google Drive, Box) — access docs that don't live on your machine.
- **CRM and project tools** — Notion, Salesforce, HubSpot, Asana, Linear, etc., depending on where your real data lives.

For many users, **email and cloud storage are the highest-value first connectors.**

## Using them

Once a connector is on, reference it naturally in your prompt — *"Check what the team said in Slack about the launch"* or *"find the customer follow-up email from last quarter"* — and Claude knows where to look.

Reach narrows or widens with what you toggle. More connectors = broader reach but also more access to assess and trust. **Assess how much you trust a connector before turning it on**; full reach is powerful but means Claude can pull from every connected tool. If a needed source is off, Cowork drafts what it can reach and asks you to fill in the rest.

## When there's no connector: Claude in Chrome

For internal dashboards, vendor portals, or web apps behind a login, **Claude in Chrome** is the bridge — a browser extension that lets Claude read and interact with pages directly. "No connector" doesn't mean the data is out of reach. (Claude in Chrome may not be available on some enterprise plans.)

## Source
Course section(s): "Lesson 2: Setting up Claude Cowork" — "Adding connectors", "Toggle the connectors Cowork can reach for this task" — projects/courses/introduction-to-claude-cowork__cowork.txt
