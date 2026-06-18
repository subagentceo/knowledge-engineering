---
title: Verified bots policy
description: Requirements a bot must meet to be listed as a Cloudflare verified bot.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Verified bots policy

In order to be listed by Cloudflare as a [verified bot](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/), your bot must conform to the below requirements. To provide the best possible protection to our customers, this policy may change in the future as we adapt to new bot behaviors.

## Bot policy

### Minimum traffic

A bot or proxy must have a minimum amount of traffic for Cloudflare to be able to find it in the sampled data. The minimum traffic should have more than 1,000 requests per day across multiple domains.

Note

Minimum traffic is not a requirement if you are using [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/) as an authentication method.

### Minimum zones

Service must be made for a widespread use of zones.

#### Example

A bot crawling one site is not valid.

### Bot identification

The user-agent or message signature with the following requirements:

* Have at least five characters.
* Must not contain special characters.
* Must not include the same user-agent of another verified service.

#### Example

`GoogleBot/1.0` is a valid user-agent.

### Domain owner consent

Domains should only be crawled with the explicit or implicit consent of the zone's owner or terms of use. Search engines crawlers must read the `robots.txt` to exclude paths to crawl from the owner.

#### Example

A tool trying to scalp inventories from different websites might be breaking terms of use while a search engine bot indexing websites but complying with `robots.txt` is a valid service.

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

### Crawling etiquette

The crawling etiquette should check `robots.txt` if crawling the whole website, and it should not attempt to crawl sensitive paths.

#### Example

If a search engine crawler skips `robots.txt`, it will be rejected.

### Public documentation

The bot must have publicly documented expected behavior or user-agent format.

---

## Breach of Policy

If any of the requirements to validate are breached, a service will be removed from the global allowlist.

The following are examples of breaches of policy:

* Adding a set of IPs that are not solely used by verified service.
* The service IPs are breached by an attacker.
* The service has vulnerabilities that have not been patched.
* A block of IPs not briefed on onboarding is added to the list.
* The disclosed purpose of the service does not reflect on the traffic.
* An AI Crawler that does not respect the crawl-delay directive in robots.txt.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/concepts/bot/verified-bots/policy/#page","headline":"Verified bots policy · Cloudflare bot solutions docs","description":"Requirements a bot must meet to be listed as a Cloudflare verified bot.","url":"https://developers.cloudflare.com/bots/concepts/bot/verified-bots/policy/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/concepts/bot/","name":"Bots"}},{"@type":"ListItem","position":5,"item":{"@id":"/bots/concepts/bot/verified-bots/","name":"Verified bots"}},{"@type":"ListItem","position":6,"item":{"@id":"/bots/concepts/bot/verified-bots/policy/","name":"Verified bots policy"}}]}
```
