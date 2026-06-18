---
title: Datasets (tables)
description: Explore available GraphQL Analytics API datasets.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Datasets (tables)

Cloudflare Analytics offers a range of datasets, including both general and product-specific ones. Datasets use a consistent naming scheme that explicitly identifies the type of data they return:

* **Domain** \- Each dataset is named after the field it describes and is associated with a set of nodes. Product-specific data nodes incorporate the name of the relevant product, for instance `loadBalancingRequests*` nodes.
* **Adaptive Sampling** \- Nodes that represent data acquired using adaptive sampling incorporate the `Adaptive` suffix. For more details, refer to[sampling](https://developers.cloudflare.com/analytics/graphql-api/sampling/).
* **Aggregated data** \- Nodes that represent aggregated data include the`Groups` suffix. For example, the `loadBalancingRequestsAdaptiveGroups` node represents aggregated data for Load Balancing requests. Aggregated data is returned in an array of `...Group` objects. Please note: we have a node that currently excluded from that naming convention - `workersInvocationsAdaptive`(beta).
* **Raw data** \- Raw data nodes, such as `loadBalancingRequestsAdaptive`, are not aggregated and so do not incorporate the `Groups` suffix. Raw data is returned in arrays containing objects of the relevant data type. For example, a query to `loadBalancingRequestsAdaptive` returns a variety of`LoadBalancingRequest` objects.

To find out more information about datasets, availability, beta, and deprecation statuses, please refer to GraphQL [discovery](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/) features.

## Working with datasets

### Aggregated fields

This example illustrates the structure for Groups:

```

type WhateverGroup {

    count # No subfields, it is just the group size. Not available for roll-up tables.

    sum {

        # fields that support summing (numbers, maps of numbers)

    }

    avg {

        # fields that support averaging (numbers)

    }

    uniq {

        # fields that support uniqueing (numbers, strings, enums, IPs, dates, etc.)

    }

}


```

Unique values are not available as a dimension but can be queried as demonstrated in this example:

```

{

  # Get number of bytes and unique IPs in each minute.

  httpRequests1mGroups {

    sum {

      bytes

    }

    uniq {

      uniques # unique IPs

    }

    dimensions {

      datetimeMinute

    }

  }


  # Count the number of events in each hour.

  firewallEventsAdaptiveGroups {

    count

    dimensions {

      datetimeHour

    }

  }

}


```

### Schema type definitions

Every exposed table has a GraphQL type definition. Type definitions observe the following rules:

* Regular fields represent themselves.
* Every field, including nested fields, has a type and represents a list of that type.
* The `enum` type represents an enumerated field.

Here is an example type definition for `ContentTypeMapElem`:

```

type ContentTypeMapElem {

    edgeResponseContentType: UInt32!

    requests: UInt64!

    bytes: UInt64!

}


# An array of httpRequestsGroup is the result of httpRequests1hGroups or

# httpRequests1mGroups query.

type httpRequestsGroup {

    date: Date!

    timeslot: DateTime!

    requests: UInt64!

    contentTypeMap: [ContentTypeMapElem!]!

    # ... other fields

}


enum TrustedClientCategory {

    UNKNOWN

    REAL_BROWSER

    HONEST_BOT

}


# An array of Request is the result of httpRequests query.

type Request {

    trustedClientCategory: TrustedClientCategory!

    # ... other fields

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/features/data-sets/#page","headline":"Datasets (tables) · Cloudflare Analytics docs","description":"Explore available GraphQL Analytics API datasets.","url":"https://developers.cloudflare.com/analytics/graphql-api/features/data-sets/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/features/","name":"Features"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/features/data-sets/","name":"Datasets (tables)"}}]}
```
