---
title: Changelog
description: Track the latest updates and changes to Cloudflare bot solutions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/bots/changelog/index.xml)

## 2025-07-02

**Managed robots.txt will prepend existing files**

Cloudflare will prepend our managed `robots.txt` before your existing `robots.txt`, combining both into a single response.

## 2025-06-26

**Web Bot Auth is now available for bot verification**

Web Bot Auth is an authentication method that leverages cryptographic signatures in HTTP messages to verify that a request comes from an automated bot. This provides a more robust way of verifying bots.

## 2025-05-14

**Anomaly detection events now receive a bot score of 2**

Events detected by the [anomaly detection engine](https://developers.cloudflare.com/bots/concepts/bot-detection-engines/#anomaly-detection-enterprise) are now given a bot score of 2.

## 2025-05-08

**Machine Learning model v9 is now the default model**

[Machine Learning model v9](https://developers.cloudflare.com/bots/reference/machine-learning-models/#model-versions-and-release-notes) is now the default model for all new zones and existing zones set to use the latest machine learning model.

## 2025-04-28

**Managed robots.txt is now available**

Direct AI crawlers on what they can and cannot scrape from your website or application by [implementing a robots.txt file](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/) to your domain.

## 2025-04-24

**Bot Detection Alerts are now available**

You can now create a [Bot Detection Alert](https://developers.cloudflare.com/bots/reference/alerts/) to notify you when Cloudflare detects a spike in Bot traffic on your website.

## 2024-08-19

**AI bots is now a managed rule**

[AI bots protection](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots) has been upgraded from a custom rule to a managed rule.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/bots/changelog/#page","headline":"Changelog · Cloudflare bot solutions docs","description":"Track the latest updates and changes to Cloudflare bot solutions.","url":"https://developers.cloudflare.com/bots/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/changelog/","name":"Changelog"}}]}
```
