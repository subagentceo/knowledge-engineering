---
title: Signed agents policy
description: Requirements an agent must meet to be listed as a Cloudflare signed agent.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Signed agents policy

In order to be listed by Cloudflare as a signed agent, your agent must conform to the below requirements. To provide the best possible protection to our customers, this policy may change in the future as we adapt to new bot behaviors.

## Agent policy

### Minimum zones

Service must be made for a widespread use of zones.

#### Example

A bot crawling one site is not valid.

### Agent identification

The user-agent field is optional as it is not required for Web Bot Authentication.

However, if you choose to provide a user-agent, it and the message signature must meet the following requirements:

* Have at least five characters.
* Must not contain special characters.
* Must not include the same user-agent of another verified service.

#### Example

`cloudflare-browser-rendering` is a valid message signature.

### Service purpose

The purpose of the service should be benign or helpful to both the owner of a zone and the users of the service. The service cannot perform any of the following:

* Bot tooling
* Scalpers
* Credential-stuffing
* Directory-traversal scanning
* Excessive data scraping
* DDoS botnets

#### Example

Price scraping direct e-commerce competitors is not a valid use case.

### Public documentation

The agent must have a publicly documented purpose and expected behavior.

---

## Breach of policy

If any of the requirements to validate are breached, a service will be removed from the signed agent list.

The following are examples of breaches of policy:

* The service has vulnerabilities that have not been patched.
* The disclosed purpose of the service does not reflect on the traffic.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/concepts/bot/signed-agents/policy/#page","headline":"Signed agents policy · Cloudflare bot solutions docs","description":"Requirements an agent must meet to be listed as a Cloudflare signed agent.","url":"https://developers.cloudflare.com/bots/concepts/bot/signed-agents/policy/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/concepts/bot/","name":"Bots"}},{"@type":"ListItem","position":5,"item":{"@id":"/bots/concepts/bot/signed-agents/","name":"Signed agents"}},{"@type":"ListItem","position":6,"item":{"@id":"/bots/concepts/bot/signed-agents/policy/","name":"Signed agents policy"}}]}
```
