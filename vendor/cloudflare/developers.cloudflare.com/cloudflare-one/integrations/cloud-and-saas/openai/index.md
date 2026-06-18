---
title: OpenAI
description: Reference information for OpenAI in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# OpenAI

The OpenAI integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated OpenAI account that could leave you and your organization vulnerable.

This integration covers the following OpenAI products:

* ChatGPT Enterprise (Workspaces)
* OpenAI Platform Projects (API keys)
* GPTs (custom GPTs)

Note

Before you begin, ensure that OpenAI has enabled ChatGPT Enterprise Compliance API access for your organization. You will need a Project API key issued for your organization, your Organization ID, and your Workspace ID. These are available in your [OpenAI Project API Keys ↗](https://platform.openai.com/settings/organization/projects).

If Compliance API access is not yet turned on for your organization, refer to [Enable Compliance API access](#enable-combliane-api-access).

## Integration prerequisites

* An OpenAI organization with a ChatGPT Enterprise workspace
* Organization-level admin privileges to create and manage Admin API keys
* (Optional) A Project API key and the corresponding Project ID if you plan to include OpenAI Platform Projects in the scan scope

### Enable Compliance API access

Compliance API access is required to use the OpenAI CASB integration. To enable Compliance API access:

1. Contact `support@openai.com` to request access to the Compliance API for your organization and for the API key you will use with Cloudflare CASB. In your request, include:  
   * The last four characters of the API key  
   * The name of the API key  
   * The name of the user who created the key  
   * The requested scope (`read`, `write`, or both)
2. OpenAI will verify the key and grant the requested Compliance API scopes.
3. After the scopes are granted, [add the OpenAI integration to CASB](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/). When prompted, enter your Open AI Admin API key, Organization ID, and Workspace ID (available at `https://chatgpt.com/admin/settings`).

For more information, refer to the [OpenAI Help Center ↗](https://help.openai.com/articles/9261474-compliance-api-for-enterprise-customers).

## Integration permissions

For the OpenAI integration to function, Cloudflare CASB requires the following authorization via API keys:

* `Admin API key (organization-level)`: Grants read-only access to organization/workspace metadata, GPTs, users, invites, and audit/compliance objects exposed by the ChatGPT Enterprise Compliance API.
* (Optional) `Project API key (project-level)`: Grants read-only access to OpenAI Platform project metadata and keys.

These credentials follow the principle of least privilege so that only the minimum required access is granted.

## Security findings

The OpenAI integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/openai.mdx.atom).

### Model and tool governance

Flag risky tool and capability settings on custom GPTs.

| Finding type                              | FindingTypeID                        | Severity | ChatGPT Enterprise required |
| ----------------------------------------- | ------------------------------------ | -------- | --------------------------- |
| OpenAI: GPT with Custom Actions enabled   | 5a2995f5-0cc1-4af3-9045-cdf7e6601f7b | High     | ✅                           |
| OpenAI: GPT with Code Interpreter enabled | d368036a-be90-49f0-b7da-5092a3f8beb4 | Medium   | ✅                           |
| OpenAI: GPT with web browsing enabled     | 3af14358-5ff2-4502-921e-7ffd9a310093 | Medium   | ✅                           |

### Publishing and sharing

Identify GPTs that are externally visible beyond your organization.

| Finding type                                    | FindingTypeID                        | Severity | ChatGPT Enterprise required |
| ----------------------------------------------- | ------------------------------------ | -------- | --------------------------- |
| OpenAI: GPT publicly accessible via GPT Store   | c69adfa6-2362-4939-86ec-49ff34093cfd | High     | ✅                           |
| OpenAI: GPT publicly accessible via public link | de460c9f-55c0-4131-9cdf-e4c3b84f9549 | High     | ✅                           |

### API key hygiene

Detect API keys that may be stale, unused, or overdue for rotation.

| Finding type                        | FindingTypeID                        | Severity | ChatGPT Enterprise required |
| ----------------------------------- | ------------------------------------ | -------- | --------------------------- |
| OpenAI: Admin API key not rotated   | b72e971d-f5b9-4cf3-96f4-ef82bdf38453 | High     | ❌                           |
| OpenAI: Project API key not rotated | 2c079fe8-6188-43e1-a2e5-d0e2dd8c7686 | High     | ❌                           |
| OpenAI: Unused admin API key        | 49c75a36-1e64-437b-98a1-e54ec35d0a64 | Medium   | ❌                           |
| OpenAI: Unused project API key      | c8fd231b-de51-43cc-8c3f-e1e57114c5f5 | Medium   | ❌                           |

### Access security

Flag user/invite issues to help enforce best practices.

| Finding type                  | FindingTypeID                        | Severity | ChatGPT Enterprise required |
| ----------------------------- | ------------------------------------ | -------- | --------------------------- |
| OpenAI: High-privilege invite | 776ceb93-fa9a-4ca0-83db-668a67c09936 | High     | ❌                           |
| OpenAI: Inactive user         | 20ab9ddb-fd48-46a8-9fdf-9bb9b9061f21 | Medium   | ❌                           |
| OpenAI: Stale pending invite  | 18fd5b21-8489-485e-9c93-0bd4a696e724 | Low      | ❌                           |

### Data Loss Prevention (optional)

These findings will only appear if you [added DLP profiles](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/) to your CASB integration.

| Finding type                                                | FindingTypeID                        | Severity | ChatGPT Enterprise required |
| ----------------------------------------------------------- | ------------------------------------ | -------- | --------------------------- |
| OpenAI: File in ChatGPT Conversation with DLP Profile match | 9aca654d-b331-4052-a5b4-2ceecced8676 | High     | ✅                           |
| OpenAI: File in ChatGPT GPT with DLP Profile match          | 520200f5-7dcc-42c9-bc3c-423019159d45 | High     | ✅                           |
| OpenAI: File in ChatGPT Project with DLP Profile match      | 8e46ec69-e5c1-4f53-ab00-a92f2050ec33 | High     | ❌                           |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/openai/#page","headline":"OpenAI · Cloudflare One docs","description":"Reference information for OpenAI in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/openai/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/openai/","name":"OpenAI"}}]}
```
