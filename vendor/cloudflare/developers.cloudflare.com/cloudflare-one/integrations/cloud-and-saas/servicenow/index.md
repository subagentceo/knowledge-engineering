---
title: ServiceNow
description: Reference information for ServiceNow in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# ServiceNow

The ServiceNow integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated ServiceNow instance that could leave you and your organization vulnerable.

## Integration prerequisites

* `admin` access to a ServiceNow instance
* Ability to [create an OAuth API endpoint for external clients ↗](https://docs.servicenow.com/csh?topicname=t%5FCreateEndpointforExternalClients)

## Integration permissions

For the ServiceNow integration to function, Cloudflare CASB requires the following permissions:

* `Global` application scope

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [ServiceNow Application scope documentation ↗](https://docs.servicenow.com/bundle/utah-application-development/page/build/applications/concept/c%5FGlobalScope.html).

## Security findings

The ServiceNow integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/servicenow.mdx.atom).

### Instance security

Identify security risks related to the ServiceNow instance itself.

| Finding type                                                           | FindingTypeID                        | Severity |
| ---------------------------------------------------------------------- | ------------------------------------ | -------- |
| ServiceNow: Production instance with exposed admin credentials         | 6c75c56f-df42-454d-85ee-c919bba70191 | Critical |
| ServiceNow: Production instance with exposed database user credentials | 37652a12-93d3-453f-961b-de32f419ed33 | High     |
| ServiceNow: Instance with exposed admin credentials                    | 8235e0a2-6a53-4596-adff-632203c60ab2 | High     |
| ServiceNow: Instance with exposed database user credentials            | 4f8bf0e4-fa79-44fc-b171-84926cbc73c7 | Medium   |

### User security

Flag user-related security risks and misconfigurations.

| Finding type                                                 | FindingTypeID                        | Severity |
| ------------------------------------------------------------ | ------------------------------------ | -------- |
| ServiceNow: User with pending password reset                 | 42097604-73db-46b3-9a5c-c3e0d2629531 | High     |
| ServiceNow: User with 3+ failed login attempts               | 49079a4b-5280-4c9c-bf61-a45b53c2fd9f | Medium   |
| ServiceNow: User with locked account                         | 344f5a37-7df5-4a26-a0fe-4d3c4215df61 | Low      |
| ServiceNow: User without multi-factor authentication enabled | 4efbe128-608d-4b19-b7c8-10c312e4cd9f | Low      |
| ServiceNow: User with no assigned roles                      | 8b5ca10d-951c-46d8-b786-223756b39165 | Low      |
| ServiceNow: Inactive user                                    | a3ee8ec7-85de-480c-bd98-6bc9581bacf9 | Low      |
| ServiceNow: User with no recent activity                     | 2477faf4-1887-44bc-b663-94373afb03d7 | Low      |

### Incident management

Identify issues related to ServiceNow incidents.

| Finding type                                             | FindingTypeID                        | Severity |
| -------------------------------------------------------- | ------------------------------------ | -------- |
| ServiceNow: High priority incident with no assigned user | 8bd04e4e-4f2f-4b44-9c6c-df6341822521 | High     |
| ServiceNow: Incident with no assigned user               | 0ea6e2dc-4748-436f-9407-bf24997ae574 | Medium   |

### Knowledge management

Highlight potential misconfigurations in ServiceNow knowledge articles.

| Finding type                                          | FindingTypeID                        | Severity |
| ----------------------------------------------------- | ------------------------------------ | -------- |
| ServiceNow: Knowledge article without expiration date | 0bd59519-a5ec-4327-92ec-c74f26184a5c | Low      |
| ServiceNow: Knowledge article without any roles       | 3caf029c-9840-43e4-a024-6d4af9f3d57e | Low      |
| ServiceNow: Knowledge article with flagged status     | 12bd46d5-e627-4bba-8644-59e01cca6646 | Low      |

### Integration and access

Detect issues related to ServiceNow integrations and access controls.

| Finding type                             | FindingTypeID                        | Severity |
| ---------------------------------------- | ------------------------------------ | -------- |
| ServiceNow: Internal Integration user    | fa63799a-24ce-4f5f-8e88-09dbf87a6fb9 | Low      |
| ServiceNow: Web Service Access only user | 3523fbb4-8725-4ffc-b200-9aef44bbbe98 | Low      |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/servicenow/#page","headline":"ServiceNow · Cloudflare One docs","description":"Reference information for ServiceNow in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/servicenow/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["ServiceNow"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/servicenow/","name":"ServiceNow"}}]}
```
