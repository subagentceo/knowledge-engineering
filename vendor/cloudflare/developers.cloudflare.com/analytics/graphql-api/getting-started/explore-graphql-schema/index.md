---
title: Explore the GraphQL schema
description: Browse available datasets and fields via introspection.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Explore the GraphQL schema

Many GraphQL clients support browsing the GraphQL schema by taking care of[introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/). In this page, we will cover GraphiQL and Altair clients.

[GraphiQL ↗](https://github.com/graphql/graphiql/tree/main/packages/graphiql#readme) and [Altair ↗](https://altairgraphql.dev/#download) are open-source GraphQL clients that provide a tool to compose a query, execute it, and inspect the results. And as a bonus, they also allow you to browse GraphQL schema.

## Prerequisites

Before you begin, do not forget to [configure](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/graphql-client-headers/) the API endpoint and HTTP headers.

The screenshots below are done from GraphiQL. However, Altair provides the same functionality and you will not find any difficulties following the same instructions to explore the schema.

## Open the Documentation Explorer

To open the GraphiQL Documentation Explorer, select the **Docs** link in the header of the response pane:

![Clicking GraphiQL Docs link to open Documentation Explorer](https://developers.cloudflare.com/_astro/graphiql-docs-link.EkyLJzjS_Z1Sek3o.webp) 

The **Documentation Explorer** opens and displays a list of available objects:

![GraphiQL Doc Explorer pane](https://developers.cloudflare.com/_astro/graphiql-doc-explorer.Bd9kpJrN_2n3xdk.webp) 

Objects in the **Documentation Explorer** use this syntax:

```

  object-name: object-type-definition


```

## Find the type definition of an object

When you first open the **Documentation Explorer** pane, the `mutation` and`query` root types display:

![Documentation Explorer displaying mutation and query nodes](https://developers.cloudflare.com/_astro/graphiql-doc-explorer-query-mutations.BbRcxejs_Z25FbTt.webp) 

In this example, `query` is the name of a root, and `Query` is the type definition.

## Find the fields available for a type definition

Click on the **type definition** of a node to view the fields that it provides. The **Documentation Explorer** also displays descriptions of the nodes.

For example, select the **Query** type definition. The **Documentation Explorer**displays the fields that `Query` provides. In this example, the fields are`cost` and `viewer`:

![Documentation Explorer displaying cost and viewer fields](https://developers.cloudflare.com/_astro/graphiql-doc-explorer-view-cost.CT9nC44o_1eB1dc.webp) 

To explore the schema, select the names of objects and definitions. You can also use the search input (magnifying glass icon) and breadcrumb links in the header.

## Find the arguments associated with a field

Click the type definition of the `viewer` field (gold text) to list its sub-fields. The `viewer` field provides sub-fields that allow you to query`accounts` or `zones` data:

![Displaying viewer fields](https://developers.cloudflare.com/_astro/graphiql-doc-explorer-viewer-fields.BKFriIIB_1z6Vyc.webp) 

The `accounts` and `zones` nodes take arguments to specify which dataset to query.

For example, `zones` can take a filter of `ZoneFilter_InputObject` type as an argument. To view the fields available to filter, select**ZoneFilter\_InputObject**.

## Find the datasets available for a zone

To view a list of the datasets available to query, select the **zone** type definition (gold text):

![Clicking zone type definition](https://developers.cloudflare.com/_astro/graphiql-doc-explorer-zones.DMRVzjxA_Z8PoXc.webp) 

A list of datasets displays in the **Fields** section, each with list of valid arguments and a brief description. Arguments that end with an exclamation mark (`!`) are required.

![Fields section displaying datasets available](https://developers.cloudflare.com/_astro/graphiql-doc-explorer-zone-fields.OMeSzfCd_Zz7H9C.webp) 

Use the search input (magnifying glass icon) to find specific datasets:

![Searching a dataset in the Documentation Explorer](https://developers.cloudflare.com/_astro/graphiql-doc-explorer-find-firewall.CkSNHI_E_Z1tDCNv.webp) 

To select a dataset, select its name.

The definition for the dataset displays. This example shows the`firewallEventsAdaptive` dataset:

![Example of a dataset definition](https://developers.cloudflare.com/_astro/graphiql-doc-explorer-firewallevents-definition.CsFujHwT_1aT5lQ.webp) 

## Find the fields available for a dataset

To view the fields available for a particular dataset, select on its type definition (gold text).

For example, select the **ZoneFirewallEventsAdaptive** type definition to view the fields available for the `firewallEventsAdaptive` dataset:

![Clicking type definition to visualize fields available for a dataset](https://developers.cloudflare.com/_astro/graphiql-doc-explorer-firewall-type-definition.CKad-SDm_RyQzy.webp) 

The list of fields displays:

![Displaying available fields for a dataset](https://developers.cloudflare.com/_astro/graphiql-doc-explorer-firewall-fields.K45OyD1Z_Zj4g9g.webp) 

For more information on using GraphiQL, please visit this [guide](https://developers.cloudflare.com/analytics/graphql-api/getting-started/compose-graphql-query/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/#page","headline":"Explore the GraphQL schema · Cloudflare Analytics docs","description":"Browse available datasets and fields via introspection.","url":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/getting-started/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/getting-started/explore-graphql-schema/","name":"Explore the GraphQL schema"}}]}
```
