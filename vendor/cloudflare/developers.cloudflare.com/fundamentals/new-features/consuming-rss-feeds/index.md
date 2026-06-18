---
title: Consuming RSS Feeds
description: Learn how to consume our changelog RSS feeds.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Consuming RSS Feeds

Our [changelogs](https://developers.cloudflare.com/changelog/) are published to [various RSS feeds](https://developers.cloudflare.com/fundamentals/new-features/available-rss-feeds/) with HTML in the `<description>` tag.

In feeds with multiple products, such as the global or product-area feeds, the products associated with a given entry are in the `<category>` tag.

A single product will also appear in the custom `<product>` tag for legacy reasons, but we recommend you use the `<category>`

## Example XML

```

<rss version="2.0">

  <channel>

    <title>Cloudflare changelogs</title>

    <description>Updates to various Cloudflare products</description>

    <link>https://developers.cloudflare.com/changelog/</link>

    <item>

      <title>Agents, Workers, Workflows - Build AI Agents with Example Prompts</title>

      <link>https://developers.cloudflare.com/changelog/2025-02-14-example-ai-prompts/</link>

      <guid isPermaLink="true">https://developers.cloudflare.com/changelog/2025-02-14-example-ai-prompts/</guid>

      <description>

        <p>

          We've added an <a href="https://developers.cloudflare.com/workers/get-started/prompting/">example prompt</a> to help you get started with building AI agents and applications on Cloudflare ...

        </p>

      </description>

      <pubDate>Fri, 14 Feb 2025 19:00:00 GMT</pubDate>

      <product>Agents</product>

      <category>Agents</category>

      <category>Workers</category>

      <category>Workflows</category>

    </item>

  </channel>

</rss>


```

## Related resources

You can surface RSS feeds in several different providers, including:

* [Slack ↗](https://slack.com/help/articles/218688467-Add-RSS-feeds-to-Slack)
* [Microsoft Teams ↗](https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors)
* [Google Chat ↗](https://developers.google.com/workspace/chat/quickstart/webhooks)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/new-features/consuming-rss-feeds/#page","headline":"Consuming RSS Feeds · Cloudflare Fundamentals docs","description":"Learn how to consume our changelog RSS feeds.","url":"https://developers.cloudflare.com/fundamentals/new-features/consuming-rss-feeds/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/new-features/","name":"RSS Feeds"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/new-features/consuming-rss-feeds/","name":"Consuming RSS Feeds"}}]}
```
