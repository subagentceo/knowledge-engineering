---
title: Capture GraphQL queries with Chrome DevTools
description: Capture dashboard GraphQL queries using Chrome DevTools.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Capture GraphQL queries with Chrome DevTools

Using [Chrome DevTools ↗](https://developer.chrome.com/docs/devtools), you can capture the queries running behind the Cloudflare Dashboard analytics. In this example, we will focus on the Network Analytics dataset, but the same process can be applied to any other analytics available in your dashboard.

1. In the Cloudflare dashboard, go to the **Network Analytics** page or any other analytics dashboard you are interested in seeing the GraphQL queries in.  
[ Go to **Network analytics** ](https://dash.cloudflare.com/?to=/:account/networking-insights/analytics/network-analytics/transport-analytics)
![Analytics tab](https://developers.cloudflare.com/_astro/analytics-tab.sJIMwybT_2gjMTY.webp) 
1. Open the [Chrome Developer Tools ↗](https://developer.chrome.com/docs/devtools) and select **Inspect**.
![Chrome developer tools](https://developers.cloudflare.com/_astro/chrome-developer-tools.D4a36rnA_1DYD77.webp) 
1. Select the **Network** tab in the Developer Tools panel.
2. In the filter bar, type `graphql` to filter out the GraphQL requests. If no requests appear, try reloading the page. As the page reloads, several network requests will populate the **Network** tab. Look for requests that contain `graphql` in the name.
![Type graphql in the search field](https://developers.cloudflare.com/_astro/search-field.BxHnt1F0_Z2pAlRo.webp) 
1. Select one of the GraphQL requests to open its details and go to the **Payload** tab. There you will find the GraphQL query. Select the query line and then **Copy value** to capture the query.
![Copy query value](https://developers.cloudflare.com/_astro/copy-value.BZMZMU5__2lVcIH.webp) 
1. If you want to capture a new query, adjust the filters in the **Network analytics** dashboard and a new query will appear in the GraphQL requests.
![Create a new query](https://developers.cloudflare.com/_astro/new-query.TN7tG2lX_Z7bye2.webp) 

You can now use this query as the basis for your API call. Refer to the [Get started](https://developers.cloudflare.com/analytics/graphql-api/getting-started/) section for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/capture-graphql-queries-from-dashboard/#page","headline":"Capture GraphQL queries with Chrome DevTools · Cloudflare Analytics docs","description":"Capture dashboard GraphQL queries using Chrome DevTools.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/capture-graphql-queries-from-dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/tutorials/capture-graphql-queries-from-dashboard/","name":"Capture GraphQL queries with Chrome DevTools"}}]}
```
