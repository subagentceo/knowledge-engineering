---
title: Gateway analytics (DNS, HTTP, network sessions)
description: Reference information for Gateway analytics (DNS, HTTP, network sessions) in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Gateway analytics (DNS, HTTP, network sessions)

Gateway analytics include three separate dashboards:

* HTTP request analytics.
* DNS query analytics.
* Network policy analytics.

To review Gateway analytics:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights**.
2. Go to **Dashboards**.
3. Select your desired dashboard.

Refer to [Insights overview](https://developers.cloudflare.com/cloudflare-one/insights/) to learn how to use Analytics dashboards together with [Analytics Overview](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) and [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) for complete visibility and troubleshooting.

## HTTP request analytics

Your [Gateway HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) power the HTTP request analytics dashboard. If you are not using Gateway HTTP policies, the dashboard will appear empty.

The HTTP request analytics dashboard helps you identify trends in how your HTTP policies apply over time. By visualizing allowed, [isolated](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) (rendered in a remote browser), and [Do Not Inspect](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#do-not-inspect) (bypassing TLS decryption) requests, the dashboard provides insights into traffic behavior and policy trends, making it easier to spot anomalies or shifts in usage patterns.

To review a detailed description of an HTTP request and its associated policy:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights**.
2. Select **Logs**.
3. Select **HTTP request logs**.
4. Use the **Policy** filter to view HTTP requests that triggered a policy or other filters to narrow down your results.

### Provided analytics

* HTTP Requests over time  
   * Time series view of HTTP requests
* Top Actions
* Top Countries
* Top Blocked Users
* Top Bandwidth Consumers
* Top Devices
* Top Source IPs

## DNS query analytics

Your [Gateway DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) power the DNS query analytics dashboard. If you are not using Gateway DNS policies, the dashboard will appear empty.

The DNS query analytics dashboard helps you identify trends in how your DNS policies apply over time. By visualizing allowed, blocked, and overridden (DNS response replaced by a policy-defined address) queries, the dashboard provides insights into traffic behavior and policy trends, making it easier to spot anomalies or shifts in usage patterns.

To review a detailed description of a DNS query and its associated policy:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights**.
2. Select **Logs**.
3. Select **DNS query logs**.
4. Use the **Policy** filter to view DNS queries that triggered a policy or other filters to narrow down your results.

### Provided analytics

* DNS Queries over time  
   * Time series view of DNS queries
* Top Actions
* Top Countries
* Top Blocked Users
* Top Allowed Users
* Top Blocked Devices

## Network policy analytics

Your [Gateway network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) power the Network policy analytics dashboard. If you are not using Gateway network policies, the dashboard will appear empty.

The Network policy analytics dashboard helps you identify trends in how your Gateway network policies apply over time. By visualizing allowed, blocked, and overridden (traffic rerouted by a policy-defined rule) sessions, the dashboard provides insights into traffic behavior and policy trends, making it easier to spot anomalies or shifts in usage patterns.

To review a detailed description of a network session and its associated policy:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights**.
2. Select **Logs**.
3. Select **Network logs**.
4. Use the **Policy** filter to view network sessions that triggered a policy or other filters to narrow down your results.

### Provided analytics

* Network Sessions over time  
   * Time series view of network sessions
* Top Actions
* Top Countries
* Top Blocked Users
* Top Bandwidth Consumers
* Top Devices
* Top Source IPs

## GraphQL queries

You can use the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) to query your Gateway Analytics data. Available [datasets](https://developers.cloudflare.com/analytics/graphql-api/features/data-sets/) for Gateway include:

| Dataset                                                 | Description                                                                                                                                                               |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| gatewayL4DownstreamSessionsAdaptiveGroups               | Metrics for Gateway network sessions from user devices to the Cloudflare global network.                                                                                  |
| gatewayL4UpstreamSessionsAdaptiveGroups                 | Metrics for Gateway network sessions from the Cloudflare global network to user devices.                                                                                  |
| gatewayL4SessionsAdaptiveGroups                         | Metrics for Gateway network sessions with adaptive sampling.                                                                                                              |
| gatewayL7RequestsAdaptiveGroups                         | Metrics for Gateway HTTP requests with adaptive sampling.                                                                                                                 |
| gatewayResolverQueriesAdaptiveGroups                    | Metrics for Gateway DNS queries with adaptive sampling.                                                                                                                   |
| gatewayResolverByRuleExecutionPerformanceAdaptiveGroups | Time to execute Gateway DNS policies on the Cloudflare global network.                                                                                                    |
| gatewayResolverByCustomResolverGroups                   | Metrics for Gateway DNS queries resolved using custom resolvers.                                                                                                          |
| gatewayResolverByCategoryAdaptiveGroups                 | Metrics for Gateway DNS queries sorted by [domain category](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) with adaptive sampling. |

To explore the schema, you can use a GraphQL client such as [GraphiQL ↗](https://github.com/graphql/graphiql/tree/main/packages/graphiql#readme) or [Altair ↗](https://altairgraphql.dev/).

1. [Create an API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/) with the following permissions:  
| Type    | Item              | Permission |  
| ------- | ----------------- | ---------- |  
| Account | Account Analytics | Read       |
2. In your GraphQL client, [add your API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/graphql-client-headers/) as an Authorization header.
3. Compose a query to access your Gateway Analytics datasets. For example, you can query the `gatewayResolverQueriesAdaptiveGroups` dataset to return the adaptive groups of DNS queries resolved by Gateway:  
```  
query GatewaySampleQuery($accountTag: string!, $start: Time) {  
  viewer {  
    accounts(filter: { accountTag: $accountTag }) {  
      gatewayResolverQueriesAdaptiveGroups(  
        filter: { datetime_gt: $start }  
        limit: 10  
      ) {  
        count  
        dimensions {  
          queryNameReversed  
          resolverDecision  
        }  
      }  
    }  
  }  
}  
```  
[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA4gQwC5gO4KgZQQWwA4A2YAiuNABQAkCAxjQPYgB2SAKggOYBcMAzkhACWTDgEIANDEr8EEJD1aCcYAJQwA3gCgYMAG6C0kDdp0xaDZkl7kAZoIIoIPdWbqMW7blPPu2nGAC+alqmphzIaBgASmC89AS6kKSQBrwAggAmCHhIgolwEIx41iahOnYOkM4wWSi5ygD6HPJSMnKBpWUESoItAIwADJ06wcOmFixjOhlKYEy8gvTzxmVloJBQAHK4YDGJELxgGVOmELHx+wAiYDSCC0snAWNPoS8dAUA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQBnRMAJ0SxACYAGbgGwBaXsICMAdmRiAHJlmYAzGIBaIAL5A)

For more information, refer to [Compose a query in GraphiQL](https://developers.cloudflare.com/analytics/graphql-api/getting-started/compose-graphql-query/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/analytics/gateway/#page","headline":"Gateway analytics (DNS, HTTP, network sessions) · Cloudflare One docs","description":"Reference information for Gateway analytics (DNS, HTTP, network sessions) in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/analytics/gateway/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics","GraphQL"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/analytics/","name":"Dashboards"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/analytics/gateway/","name":"Gateway analytics (DNS, HTTP, network sessions)"}}]}
```
