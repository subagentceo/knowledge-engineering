---
title: Signed agents
description: End-user-controlled agents verified through Web Bot Auth cryptographic signatures.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Signed agents

A signed agent is a bot controlled by an end user and verified through [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/) cryptographic signatures.

You can request for your agent to be added to Cloudflare's bots and agents directory by filling out an [online application ↗](https://dash.cloudflare.com/?to=/:account/configurations/verified-bots) in the Cloudflare dashboard.

Note

A bot cannot be registered as both a verified bot and a signed agent. Review Cloudflare's [verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/) to determine how to identify your bot.

## Signed agent requirement

For an agent to be recognized, it must meet the following requirements:

1. The agent must follow the [signed agents policy](https://developers.cloudflare.com/bots/concepts/bot/signed-agents/policy/).
2. The bot must be using [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/).

Once Cloudflare approves a signed agent, it should appear on [Cloudflare Radar's bots and agents directory ↗](https://radar.cloudflare.com/verified-bots).

---

## Verification method

The bot must be verified using [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/bots/concepts/bot/signed-agents/#page","headline":"Signed agents · Cloudflare bot solutions docs","description":"End-user-controlled agents verified through Web Bot Auth cryptographic signatures.","url":"https://developers.cloudflare.com/bots/concepts/bot/signed-agents/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/concepts/bot/","name":"Bots"}},{"@type":"ListItem","position":5,"item":{"@id":"/bots/concepts/bot/signed-agents/","name":"Signed agents"}}]}
```
