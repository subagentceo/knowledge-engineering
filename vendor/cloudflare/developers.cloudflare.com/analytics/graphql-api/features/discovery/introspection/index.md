---
title: Introspection
description: Explore the GraphQL schema using introspection.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Introspection

Cloudflare GraphQL API has a dynamic schema and exposes more than 70 datasets across zone and account scopes. We constantly expand the list and replace existing ones with more capable alternatives.

To tackle the schema question, GraphQL provides an [introspection ↗](https://graphql.org/learn/introspection/) mechanism. It is part of the GraphQL specification and allows you to explore the graph of the datasets and fields.

The introspection results provide an overview of ALL available nodes and fields, their descriptions and deprecation status.

Although GraphQL has `query`, `subscription`, and `mutation` operations, Cloudflare GraphQL API only supports `query` operation.

## Description and Beta mode

With details on data exposed by a given node or a field, descriptions also indicate whether it is in Beta mode. Beta nodes (or fields) are for testing and exploration and are usually available for customers on more extensive plans. Please do not rely on beta data nodes since they are subject to change or removal without notice.

## Deprecation

Introspection provides information about deprecation status. Cloudflare uses it as a notification about replacement plans. If the sunset date is provided, please migrate to a replacement node(s) before that date to avoid any disruption.

## Availability

Some of the nodes might only be available to query for some users. Please refer to the [settings](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/) node for more details about availability and personal limits on a given node.

## Explore documentation

The most convenient way to introspect the schema is to use a documentation[explorer](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/) that usually is a part of a GraphQL client (like GraphiQL, Altair, etc).

Alternatively, you can also do it manually by using `__schema` node with the needed directives.

A typical introspection query

```

{

  __schema {

    queryType {

      name

    }

    mutationType {

      name

    }

    subscriptionType {

      name

    }

    types {

      ...FullType

    }

    directives {

      name

      description

      locations

      args {

        ...InputValue

      }

    }

  }

}

fragment TypeRef on __Type {

  kind

  name

  ofType {

    kind

    name

    ofType {

      kind

      name

      ofType {

        kind

        name

        ofType {

          kind

          name

          ofType {

            kind

            name

            ofType {

              kind

              name

              ofType {

                kind

                name

              }

            }

          }

        }

      }

    }

  }

}

fragment InputValue on __InputValue {

  name

  description

  type {

    ...TypeRef

  }

  defaultValue

}

fragment FullType on __Type {

  kind

  name

  description

  fields(includeDeprecated: true) {

    name

    description

    args {

      ...InputValue

    }

    type {

      ...TypeRef

    }

    isDeprecated

    deprecationReason

  }

  inputFields {

    ...InputValue

  }

  interfaces {

    ...TypeRef

  }

  enumValues(includeDeprecated: true) {

    name

    description

    isDeprecated

    deprecationReason

  }

  possibleTypes {

    ...TypeRef

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=N4KABGD6kM4MYAsCmBbAhmUEIEcCuSATgJ4AqxADkpuNhAHZopK0QC+rYKeALmjwEsA9vXJUadBkxZ0OdGHgBG8QgIqCRY6lkmNmnOdh6UkMCZIB0VgGJ4ANna0HOAEwGEkcQQDdT5unoyki6mcKrqwvScEHZCcPyRMNFgaIQA5mY6kmBWFgCS9BS8AGpodgTJhuy0HBwAZoRoacz0PGBaAEpIdWAiUJBa5gDWAvQutIG0QnWDWWAjY5yTdNOzyQvj2cuSqyb+khvJUvrZELvic9mHp9jbN+faRwejmze30k8rM3uXb9dvAQ+AK+a2Bz0WYMBJ0hVTesOy8OwiNhhlqIAaTRabQKRR4pXK1D60BxJTKBHM2xCKjUGiiEGMF04uU63RqtBCdTQ9jxZJY9UazSQrTAtgcgyJAx+tH+lNC4VptDqAiQdhcMAAFKM4OUQgARJAUDzxHhIFwALjAPEIBAAlPs7mAqWEaZFOKkMvsILkSTyCc46AzHtlmSYunV-dgBDB9YbPPxTa4DUaEiIumgYCI2RBRrjrMrVZkmVYffiKtVs60iJy4H45iGqGGs2AhXgUKXTJr6Nq8Hqk3GTebLdakHa5g6nfLXXQozHkwPE7HjZE0xm6WBDBQhDAYAJFHYkFpC3R60hG9U2EA&variables=N4XyA)

For more details on how to send a GraphQL request with curl, please refer to [Execute a GraphQL query with curl](https://developers.cloudflare.com/analytics/graphql-api/getting-started/execute-graphql-query/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/#page","headline":"Introspection · Cloudflare Analytics docs","description":"Explore the GraphQL schema using introspection.","url":"https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/features/","name":"Features"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/features/discovery/","name":"Discovery"}},{"@type":"ListItem","position":6,"item":{"@id":"/analytics/graphql-api/features/discovery/introspection/","name":"Introspection"}}]}
```
