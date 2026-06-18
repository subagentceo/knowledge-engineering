# Fraud & Abuse Response Guide

This guide is designed to help you quickly identify, contain, and remediate fraud or abuse on your Twilio account. It provides a practical phase-based approach you can follow when suspicious activity occurs, so you can act fast and reduce impact.

At Twilio, we view [security and fraud prevention as a shared responsibility](https://www.twilio.com/en-us/blog/insights/best-practices/quarterly-fraud-update-july-2025). While our internal systems proactively monitor for anomalies to provide a fast turnaround for intervention, no automated system can catch everything. The most resilient applications pair Twilio's built-in protections with custom [Usage Triggers](https://help.twilio.com/articles/223132387-Protect-your-Twilio-project-from-Fraud-with-Usage-Triggers) and proactive monitoring.

## When Twilio intervenes \[#when-twilio-intervenes]

We know that a service interruption is the last thing you want. However, if our systems flag activity that looks like a serious threat, we might step in to protect your account. This can usually look like placing restrictions, deprovisioning phone numbers, suspending your campaigns, or even [suspending your affected accounts](https://www.twilio.com/docs/api/errors/30002?_gl=1*8sbfiw*_gcl_aw*R0NMLjE3NjEyNDQxMDQuQ2p3S0NBandwT2ZIQmhBeEVpd0FtMVN3RXIzVlV5bzZmN0NTUWxPVDFmLWdqYmJRWVhGTk5SWHNEWXRucjJtN3hNeWEwVmRNS3UzcFlCb0MyMTBRQXZEX0J3RQ..*_gcl_au*MTg2NzYzMjkzMi4xNzYxMTY5NDc3*_ga*OTU3NzQwMzkwLjE3Mzc0ODA1NDY.*_ga_RRP8K4M4F3*czE3NjE3Nzc3MTYkbzIxMCRnMCR0MTc2MTc3NzcyMyRqNTMkbDAkaDA).

If your account has been restricted, don't panic. We want to help you get back online as much as you do. Following the containment steps in this guide is the fastest way to secure your integration and get back to building.

## Your incident response checklist \[#incident-response-checklist]

![Incident response checklist.](https://docs-resources.prod.twilio.com/dd83c9b2c20c27361e1fa456332aaefda80165567616fc9bc65141e27ba4a3c6.png)

Fraud response isn't always linear, but speed is your best friend. While you might jump between these steps, your primary goal is to reach the 'Contain' phase as fast as possible.

### Phase 1: Validate – Is this actually fraud? \[#phase-1-validate]

Before you pull any levers, confirm what you're seeing. Identify whether you're facing an Account Takeover (ATO), Artificially Inflated Traffic (AIT/SMS Pumping), or a smishing/vishing campaign. Confirming the "flavor" of the fraud ensures you apply the right fix. Here are some of the most common types of fraud:

* **[Account Takeover (ATO)](https://help.twilio.com/articles/360021347073-Proactive-Steps-for-Customers-Experiencing-Account-Takeover)** – This is a breach of access to your Twilio account(s). Look for unrecognized login activity, unexpected changes to your account credentials, or new API keys that your team didn't generate.
* **[Artificially Inflated Traffic (AIT)](https://www.infobip.com/blog/artificially-inflated-traffic#:~:text=Artificially%20inflated%20traffic%20\(AIT\)%20is%20a%20type,A2P%20SMS%20as%20a%20business%20messaging%20channel**)** – A broad category of fraud involving artificially generated usage designed to increase traffic and cost. [SMS pumping](https://www.twilio.com/docs/glossary/what-is-sms-pumping-fraud) is a common (but not the only) form of AIT, and typically appears as an unexpected, high-volume surge of traffic (usually messages) targeted at specific country prefixes (often high-cost or premium routes). This is typically driven by bots exploiting a signup form or a verification flow.
* **[Smishing/Vishing](https://www.twilio.com/en-us/blog/insights/best-practices/quarterly-fraud-update-july-2025#voice-impersonation)** – This is a breach of trust. This involves malicious links or deceptive voice calls originating from your Twilio numbers, often aimed at tricking your end-users into giving up their own private info.

### Phase 2: Engage – Contact Twilio Support \[#phase-2-engage]

While we recommend prioritizing Phase 3 (Contain) to stop the immediate impact, our team is here to help. You should reach out to Twilio Support if:

* Twilio proactively restricted your account due to fraud. We'll work together to verify containment before restoring service.
* You've followed the self-service steps in this guide but still need help auditing the affected accounts or identifying the root cause.
* You want a second pair of eyes to ensure your containment strategy is airtight.

To help us help you faster, when you open your ticket with [Twilio Support](https://help.twilio.com/), share everything you've found. Information like Account SIDs, specific phone numbers, targeted prefixes, or suspicious timestamps make a huge difference. The more data you provide, the faster we can get to the bottom of the incident.

### Phase 3: Contain – Immediate countermeasures \[#phase-3-contain]

**Do not wait for a response from Twilio Support to start this phase.** This is where you take immediate action to cut off the attacker's access. Whether it's rotating API keys, updating Geo-Permissions, or rate-limiting your forms, the goal is to stop the financial and reputational impact now.

### Phase 4: Analyze – Investigate \[#phase-4-analyze]

Once you have successfully completed the containment phase, gather the facts to answer: "How did this activity occur?" During this phase, you will perform a deep dive into your Twilio usage logs and application records to assess the full scope of the incident. By documenting the impact (including affected subaccounts, total traffic volume, and associated costs) you create the data set necessary to understand the breach and begin a full recovery.

### Phase 5: Diagnose – Root cause analysis \[#phase-5-diagnose]

This is where you answer the critical question: "Why did this activity occur?" You will identify the specific reasons the fraud was possible and how existing security controls were bypassed. By synthesizing the data gathered during the Analyze phase, you can build a comprehensive timeline and define a plan for long-term security improvements.

In some cases, you may be required to close out the investigation with an [RCA document](/docs/usage/fraud-response-guide/example-rca-summary-request-form). This document should detail the timeline of events, your investigative findings, and the specific recommendations you are implementing to harden your security posture.

## Navigating the response \[#navigating-the-response]

While this guide presents these phases in a specific order, incident response is often fluid. Here are a few key principles to keep in mind:

* We strongly recommend moving to the [Contain](#phase-3-contain) phase immediately after you have confirmed the nature of the activity in the [Validate](#phase-1-validate) phase.
* The transition between [Analyze](#phase-4-analyze) and [Diagnose](#phase-5-diagnose) is a continuous loop. The logs and data you pull to understand the scope will directly inform your understanding of the root cause.
* Reaching out to Twilio Support is optional if you have the tools to manage the incident internally. However, if your account has been restricted or you need help navigating our logs, loop us in as soon as possible so we can help you get back to building.

The remainder of this guide provides a deep dive into each phase, offering specific technical checklists, best practices, and the exact steps you need to take to secure your account.
