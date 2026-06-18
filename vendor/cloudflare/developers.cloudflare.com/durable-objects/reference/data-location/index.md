---
title: Data location
description: Restrict Durable Objects to specific jurisdictions or provide location hints to control where data is stored and processed.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Data location

## Restrict Durable Objects to a jurisdiction

Jurisdictions are used to create Durable Objects that only run and store data within a region to comply with local regulations such as the [GDPR ↗](https://gdpr-info.eu/) or [FedRAMP ↗](https://blog.cloudflare.com/cloudflare-achieves-fedramp-authorization/).

Workers may still access Durable Objects constrained to a jurisdiction from anywhere in the world. The jurisdiction constraint only controls where the Durable Object itself runs and persists data. Consider using [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/) to control the regions from which Cloudflare responds to requests.

Logging

A [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) will be logged outside of the specified jurisdiction for billing and debugging purposes.

Durable Objects can be restricted to a specific jurisdiction by creating a [DurableObjectNamespace](https://developers.cloudflare.com/durable-objects/api/namespace/) restricted to a jurisdiction. All [Durable Object ID methods](https://developers.cloudflare.com/durable-objects/api/id/) are valid on IDs within a namespace restricted to a jurisdiction.

JavaScript

```

const euSubnamespace = env.MY_DURABLE_OBJECT.jurisdiction("eu");

const euId = euSubnamespace.newUniqueId();


```

* It is possible to have the same name represent different IDs in different jurisdictions.  
JavaScript  
```  
const euId1 = env.MY_DURABLE_OBJECT.idFromName("my-name");  
const euId2 = env.MY_DURABLE_OBJECT.jurisdiction("eu").idFromName("my-name");  
console.assert(!euId1.equal(euId2), "This should always be true");  
```
* You will run into an error if the jurisdiction on your [DurableObjectNamespace](https://developers.cloudflare.com/durable-objects/api/namespace/) and the jurisdiction on [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) are different.
* You will not run into an error if the [DurableObjectNamespace](https://developers.cloudflare.com/durable-objects/api/namespace/) is not associated with a jurisdiction.
* All [Durable Object ID methods](https://developers.cloudflare.com/durable-objects/api/id/) are valid on IDs within a namespace restricted to a jurisdiction.  
JavaScript  
```  
const euSubnamespace = env.MY_DURABLE_OBJECT.jurisdiction("eu");  
const euId = euSubnamespace.idFromName(name);  
const stub = env.MY_DURABLE_OBJECT.get(euId);  
```

Use `DurableObjectNamespace.jurisdiction`

When specifying a jurisdiction, Cloudflare recommends you first create a namespace restricted to a jurisdiction, using `const euSubnamespace = env.MY_DURABLE_OBJECT.jurisdiction("eu")`.

Note that it is also possible to specify a jurisdiction by creating an individual [DurableObjectId](https://developers.cloudflare.com/durable-objects/api/id) restricted to a jurisdiction, using `const euId = env.MY_DURABLE_OBJECT.newUniqueId({ jurisdiction: "eu" })`.

**However, Cloudflare does not recommend this approach.**

### Supported locations

| Parameter | Location                       |
| --------- | ------------------------------ |
| eu        | The European Union             |
| fedramp   | FedRAMP-compliant data centers |

### Read the jurisdiction from inside a Durable Object

The jurisdiction of a Durable Object is available inside the object via [ctx.id.jurisdiction](https://developers.cloudflare.com/durable-objects/api/id/#jurisdiction). The value is preserved across `toString()` and `idFromString()` round-trips and is also available inside [alarm handlers](https://developers.cloudflare.com/durable-objects/api/alarms/) for alarms scheduled on 2026-03-15 or later, which makes it suitable for region-aware logic inside the Durable Object.

## Provide a location hint

Durable Objects, as with any stateful API, will often add response latency as requests must be forwarded to the data center where the Durable Object, or state, is located.

Durable Objects do not currently change locations after they are created1. By default, a Durable Object is instantiated in a data center close to where the initial `get()` request is made. This may not be in the same data center that the `get()` request is made from, but in most cases, it will be in close proximity.

Initial requests to Durable Objects

It can negatively impact latency to pre-create Durable Objects prior to the first client request or when the first client request is not representative of where the majority of requests will come from. It is better for latency to create Durable Objects in response to actual production traffic or provide explicit location hints.

Location hints are the mechanism provided to specify the location that a Durable Object should be located regardless of where the initial `get()` request comes from.

To manually create Durable Objects in another location, provide an optional `locationHint` parameter to `get()`. Only the first call to `get()` for a particular Object will respect the hint.

JavaScript

```

let durableObjectStub = OBJECT_NAMESPACE.get(id, { locationHint: "enam" });


```

Warning

Hints are a best effort and not a guarantee. Unlike with jurisdictions, Durable Objects will not necessarily be instantiated in the hinted location, but instead instantiated in a data center selected to minimize latency from the hinted location.

### Supported locations

| Parameter | Location              |
| --------- | --------------------- |
| wnam      | Western North America |
| enam      | Eastern North America |
| sam       | South America 2       |
| weur      | Western Europe        |
| eeur      | Eastern Europe        |
| apac      | Asia-Pacific          |
| oc        | Oceania               |
| afr       | Africa 2              |
| me        | Middle East 2         |

1 Dynamic relocation of existing Durable Objects is planned for the future.

2 Durable Objects currently do not spawn in this location. Instead, the Durable Object will spawn in a nearby location which does support Durable Objects. For example, Durable Objects hinted to South America spawn in Eastern North America instead.

## Additional resources

* You can find our more about where Durable Objects are located using the website: [Where Durable Objects Live ↗](https://where.durableobjects.live/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/reference/data-location/#page","headline":"Data location · Cloudflare Durable Objects docs","description":"Restrict Durable Objects to specific jurisdictions or provide location hints to control where data is stored and processed.","url":"https://developers.cloudflare.com/durable-objects/reference/data-location/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/reference/data-location/","name":"Data location"}}]}
```
