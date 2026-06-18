---
title: CASB
description: Review recent changes to Cloudflare CASB.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# CASB

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/casb.xml) 

## 2026-05-19

  
**CASB adds support for Claude Compliance API**   

[Cloudflare CASB](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/) now integrates with the [Claude Compliance API ↗](https://support.claude.com/en/articles/13015708-access-the-compliance-api). This enhancement gives security teams visibility into Claude usage patterns, admin activity, and compliance-relevant events across their organization.

The Claude Compliance API provides structured access to audit logs and administrative actions within Claude Enterprise and Claude Platform. Cloudflare CASB ingests this data to surface security findings that help organizations enhance their security posture and enforce AI governance.

#### Key capabilities

Starting today, security teams can scan for security findings across the following assets:

* **Public projects** — Projects set to public visibility
* **Project attachment** — Files and documents added to projects that violate DLP policies
* **Chat files** — User-uploaded and provider-generated files that violate DLP policies
* **Chat messages** — User prompts and provider responses that violate DLP policies
* **Artifacts** — Provider-generated documents and files that violate DLP policies

#### Learn more

This [integration](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/) is available to all Cloudflare One customers. New Cloudflare customers can sign up and start with their first two integrations for free. Existing customers can enable the integration directly in the dashboard. The integration begins scanning immediately and surfaces findings in the dashboard within minutes.

## 2026-04-09

  
**Send CASB posture finding instances with webhooks**   

You can now use **CASB webhooks** in Cloudflare One to send posture finding instances to external systems such as chat platforms, ticketing systems, SIEMs, SOAR tools, and custom automation services.

This gives security teams a simple way to route CASB posture findings into the tools and workflows they already use for triage and response.

To get started, go to **Integrations** \> **Webhooks** in the Cloudflare One dashboard to create a webhook destination. After you configure a webhook, open a posture finding instance and select **Send webhook** to send it.

#### Key capabilities

* **Flexible authentication** — Configure destinations using **None**, **Basic Auth**, **Bearer Auth**, **Static Headers**, or **HMAC-Signing**.
* **Built-in testing** — Use **Test delivery** to send a test request before sending a live finding instance.
* **Posture finding workflows** — Send posture finding instances directly from the finding details workflow in **Cloud & SaaS findings**.
* **HTTPS destinations** — Configure webhook destinations with public `https://` URLs.

#### Learn more

* Configure [CASB webhooks](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/webhooks/) in Cloudflare.
* Learn how to [manage findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/) in Cloudflare.

CASB webhooks are now available in Cloudflare One.

## 2026-02-20

  
**Understand CASB findings instantly with Cloudy Summaries**   

You can now easily understand your SaaS security posture findings and why they were detected with **Cloudy Summaries in CASB**. This feature integrates Cloudflare's Cloudy AI directly into your CASB Posture Findings to automatically generate clear, plain-language summaries of complex security misconfigurations, third-party app risks, and data exposures.

This allows security teams and IT administrators to drastically reduce triage time by immediately understanding the context, potential impact, and necessary remediation steps for any given finding—without needing to be an expert in every connected SaaS application.

To view a summary, simply navigate to your Posture Findings in the Cloudflare One dashboard (under **Cloud and SaaS findings**) and open the finding details of a specific instance of a Finding.

Cloudy Summaries are supported on all available integrations, including Microsoft 365, Google Workspace, Salesforce, GitHub, AWS, Slack, and Dropbox. See the full list of supported integrations [here](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/).

#### Key capabilities

* **Contextual explanations** — Quickly understand the specifics of a finding with plain-language summaries detailing exactly what was detected, from publicly shared sensitive files to risky third-party app scopes.
* **Clear risk assessment** — Instantly grasp the potential security impact of the finding, such as data breach risks, unauthorized account access, or email spoofing vulnerabilities.
* **Actionable guidance** — Get clear recommendations and next steps on how to effectively remediate the issue and secure your environment.
* **Built-in feedback** — Help improve future AI summarization accuracy by submitting feedback directly using the thumbs-up and thumbs-down buttons.

#### Learn more

* Learn more about managing [CASB Posture Findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/) in Cloudflare.

Cloudy Summaries in CASB are available to all Cloudflare CASB users today.

## 2025-11-14

  
**New SaaS Security weekly digests with API CASB**   

You can now stay on top of your SaaS security posture with the new **CASB Weekly Digest** notification. This opt-in email digest is delivered to your inbox every Monday morning and provides a high-level summary of your organization's Cloudflare API CASB findings from the previous week.

This allows security teams and IT administrators to get proactive, at-a-glance visibility into new risks and integration health without having to log in to the dashboard.

To opt in, navigate to **Manage Account** \> **Notifications** in the Cloudflare dashboard to configure the **CASB Weekly Digest** alert type.

#### Key capabilities

* **At-a-glance summary** — Review new high/critical findings, most frequent finding types, and new content exposures from the past 7 days.
* **Integration health** — Instantly see the status of all your connected SaaS integrations (Healthy, Unhealthy, or Paused) to spot API connection issues.
* **Proactive alerting** — The digest is sent automatically to all subscribed users every Monday morning.
* **Easy to configure** — Users can opt in by enabling the notification in the Cloudflare dashboard under **Manage Account** \> **Notifications**.

#### Learn more

* Configure [notification preferences](https://developers.cloudflare.com/notifications/) in Cloudflare.

The CASB Weekly Digest notification is available to all Cloudflare users today.

## 2025-10-28

  
**CASB introduces new granular roles**   

Cloudflare CASB (Cloud Access Security Broker) now supports two new granular roles to provide more precise access control for your security teams:

* **Cloudflare CASB Read:** Provides read-only access to view CASB findings and dashboards. This role is ideal for security analysts, compliance auditors, or team members who need visibility without modification rights.
* **Cloudflare CASB:** Provides full administrative access to configure and manage all aspects of the CASB product.

These new roles help you better enforce the principle of least privilege. You can now grant specific members access to CASB security findings without assigning them broader permissions, such as the **Super Administrator** or **Administrator** roles.

To enable [Data Loss Prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/), scans in CASB, account members will need the **Cloudflare Zero Trust** role.

You can find these new roles when inviting members or creating API tokens in the Cloudflare dashboard under **Manage Account** \> **Members**.

To learn more about managing roles and permissions, refer to the [Manage account members and roles documentation](https://developers.cloudflare.com/fundamentals/manage-members/roles/).

## 2025-08-26

  
**New CASB integrations for ChatGPT, Claude, and Gemini**   

[Cloudflare CASB ↗](https://www.cloudflare.com/zero-trust/products/casb/) now supports three of the most widely used GenAI platforms — **OpenAI ChatGPT**, **Anthropic Claude**, and **Google Gemini**. These API-based integrations give security teams agentless visibility into posture, data, and compliance risks across their organization’s use of generative AI.

![Cloudflare CASB showing selection of new findings for ChatGPT, Claude, and Gemini integrations.](https://developers.cloudflare.com/_astro/casb-ai-integrations-preview.B-zsSA1P_Z1wlfJX.webp) 

#### Key capabilities

* **Agentless connections** — connect ChatGPT, Claude, and Gemini tenants via API; no endpoint software required
* **Posture management** — detect insecure settings and misconfigurations that could lead to data exposure
* **DLP detection** — identify sensitive data in uploaded chat attachments or files
* **GenAI-specific insights** — surface risks unique to each provider’s capabilities

#### Learn more

* [ChatGPT integration docs ↗](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/openai/)
* [Claude integration docs ↗](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/)
* [Gemini integration docs ↗](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gemini/)

These integrations are available to all Cloudflare One customers today.

## 2025-06-23

  
**Data Security Analytics in the Zero Trust dashboard**   

Zero Trust now includes **Data security analytics**, providing you with unprecedented visibility into your organization sensitive data.

The new dashboard includes:

* **Sensitive Data Movement Over Time:**  
   * See patterns and trends in how sensitive data moves across your environment. This helps understand where data is flowing and identify common paths.
* **Sensitive Data at Rest in SaaS & Cloud:**  
   * View an inventory of sensitive data stored within your corporate SaaS applications (for example, Google Drive, Microsoft 365) and cloud accounts (such as AWS S3).
* **DLP Policy Activity:**  
   * Identify which of your Data Loss Prevention (DLP) policies are being triggered most often.  
   * See which specific users are responsible for triggering DLP policies.
![Data Security Analytics](https://developers.cloudflare.com/_astro/cf1-data-security-analytics-v1.BGl6fYXl_H3N0P.webp) 

To access the new dashboard, log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) and go to **Insights** on the sidebar.

## 2024-11-22

  
**Find security misconfigurations in your AWS cloud environment**   

You can now use CASB to find security misconfigurations in your AWS cloud environment using [Data Loss Prevention](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/).

You can also [connect your AWS compute account](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/aws-s3/#compute-account) to extract and scan your S3 buckets for sensitive data while avoiding egress fees. CASB will scan any objects that exist in the bucket at the time of configuration.

To connect a compute account to your AWS integration:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Cloud & SaaS findings** \> **Integrations**.
2. Find and select your AWS integration.
3. Select **Open connection instructions**.
4. Follow the instructions provided to connect a new compute account.
5. Select **Refresh**.

## 2024-06-03

**Atlassian Bitbucket integration**

You can now scan your Bitbucket Cloud workspaces for a variety of contextualized security issues such as source code exposure, admin misconfigurations, and more.

## 2024-05-23

**Data-at-rest DLP for Box and Dropbox**

You can now scan your [Box](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/box/#data-loss-prevention-optional) and [Dropbox](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/dropbox/#data-loss-prevention-optional) files for DLP matches.

## 2024-04-16

**Export CASB findings to CSV**

You can now export all top-level CASB findings or every instance of your findings to CSV.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/cloudflare-one/changelog/casb/#page","headline":"CASB Changelog · Cloudflare One docs","description":"Review recent changes to Cloudflare CASB.","url":"https://developers.cloudflare.com/cloudflare-one/changelog/casb/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/changelog/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/changelog/casb/","name":"CASB"}}]}
```
