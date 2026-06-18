---
title: Get started
description: Set up and access Network Analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Use these articles to get started with the Cloudflare GraphQL API:

* [Authentication](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/) \- walks you through the options and the steps required to set up your access to Cloudflare API successfully,
* [Querying basics](https://developers.cloudflare.com/analytics/graphql-api/getting-started/querying-basics/) \- brings simple query examples for you to start exploring the GraphQL API,
* [Introspect the GraphQL schema](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/) \- explains how-to surf the schema with GraphQL client,
* [Create a query in a GraphQL client](https://developers.cloudflare.com/analytics/graphql-api/getting-started/compose-graphql-query/) \- describes how to build and run a query against the Cloudflare GraphQL API in the GraphQL clients,
* [Use curl to query the GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/getting-started/execute-graphql-query/) \- walks you through running a query against the Cloudflare GraphQL API from the command line.

For examples of how to build your own GraphQL Analytics dashboard and query specific information, such as Firewall and Workers events, please refer to[Tutorials](https://developers.cloudflare.com/analytics/graphql-api/tutorials/).

Data unavailability: Customer Metadata Boundary configuration

If you encounter a message on the dashboard indicating that your data is unavailable due to your account's Metadata Boundary configuration, this is because you are trying to access data that is not stored in your region (that is, you are in the US and trying to access data that is only stored in the EU, or vice versa). If you receive this error message while being in the region where your data is stored, there are two potential reasons why you might get this message:

* Your account has Customer Metadata Boundary (CMB) enabled, and your request is being directed to an incorrect region. For example, if you are in the EU and CMB is configured to store your data in the US.
* If you are trying to access your data from the correct region, such as being in the EU with CMB configured to save your data in the EU, the issue may be caused by network congestion. Typically, this problem resolves within a few minutes.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/#page","headline":"Get started · Cloudflare Analytics docs","description":"Set up and access Network Analytics.","url":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/getting-started/","name":"Get started"}}]}
```
