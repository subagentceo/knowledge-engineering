---
title: Namespaces and profiles
description: How Agent Memory isolates memory storage using namespaces for applications and profiles for individual users or agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-memory/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Namespaces and profiles

Agent Memory uses a two-level isolation model: **namespaces** define memory domains, and **profiles** provide isolated memory stores for individual users, agents, teams, tenants, or application objects.

## Namespaces

A namespace is a top-level container that scopes a set of memory profiles. Use namespaces to separate applications, environments, tenants, or memory layers such as user, team, and organization memory.

## Profiles

A profile is an isolated memory store for a single entity. Each profile has its own stored memories and retrieval indexes.

## Sessions

A session groups memories that come from the same interaction or conversation. Sessions are optional, but they make it easier to identify, inspect, and manage memories created from a specific conversation.

Sessions are scoped to a profile. Two different profiles can use the same session ID without conflict.

## Isolation model

Conceptually, memories are scoped as `namespace > profile > memory`. No data crosses these boundaries:

```

Namespace: my-assistant-prod

  Profile: alice

    Memories

    Messages

  Profile: bob

    Memories

    Messages


```

A `recall()` on Alice's profile never returns memories from Bob's profile. Each profile is a self-contained memory system.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-memory/concepts/namespaces-profiles/#page","headline":"Namespaces and profiles · Cloudflare Agent Memory docs","description":"How Agent Memory isolates memory storage using namespaces for applications and profiles for individual users or agents.","url":"https://developers.cloudflare.com/agent-memory/concepts/namespaces-profiles/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agent-memory/","name":"Agent Memory"}},{"@type":"ListItem","position":3,"item":{"@id":"/agent-memory/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/agent-memory/concepts/namespaces-profiles/","name":"Namespaces and profiles"}}]}
```
