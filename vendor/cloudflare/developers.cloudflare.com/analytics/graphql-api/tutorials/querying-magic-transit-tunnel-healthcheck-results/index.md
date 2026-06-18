---
title: Querying Magic Transit and Cloudflare WAN IPsec/GRE tunnel health check results with GraphQL
description: Query Magic Transit tunnel health check results.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Querying Magic Transit and Cloudflare WAN IPsec/GRE tunnel health check results with GraphQL

This example uses the GraphQL Analytics API to query Magic Transit or Cloudflare WAN tunnel health check results. These results are aggregated from individual health checks that Cloudflare servers perform against the tunnels you configured in your account. You can query up to one week of data for dates up to three months in the past.

The following API call requests tunnel health checks for a specific account over a one-day period for a specific Cloudflare data center and outputs the requested fields. Replace `<CLOUDFLARE_ACCOUNT_TAG>` and `<API_TOKEN>`[1](#user-content-fn-1) with your API credentials, and adjust the `datetimeStart` and `datetimeEnd` variables as needed.

The API call returns tunnel health check results by Cloudflare data center. Cloudflare aggregates each data center's result from health checks conducted on individual servers. The `tunnelState` field represents the state of the tunnel. Magic Transit or Cloudflare WAN uses these states for routing. A `tunnelState` value of `0` represents a down tunnel, `0.5` represents a degraded tunnel, and `1` represents a healthy tunnel.

## API Call

Terminal window

```

echo '{ "query":

  "query GetTunnelHealthCheckResults($accountTag: string, $datetimeStart: string, $datetimeEnd: string) {

    viewer {

      accounts(filter: {accountTag: $accountTag}) {

        magicTransitTunnelHealthChecksAdaptiveGroups(

          limit: 100,

          filter: {

            datetime_geq: $datetimeStart,

            datetime_lt:  $datetimeEnd,

          }

        ) {

          avg {

            tunnelState

          }

          dimensions {

            tunnelName

            edgeColoName

          }

        }

      }

    }

  }",

  "variables": {

    "accountTag": "<CLOUDFLARE_ACCOUNT_TAG>",

    "datetimeStart": "2022-08-04T00:00:00.000Z",

    "datetimeEnd": "2022-08-04T01:00:00.000Z"

  }

}' | tr -d '\n' | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data @-


```

The results are returned in JSON (as requested), so piping the output to `jq` formats them for easier parsing, as in the following example:

Terminal window

```

... | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data @- | jq .


## Example response:

#=> {

#=>   "data": {

#=>     "viewer": {

#=>       "accounts": [

#=>         {

#=>           "conduitEdgeTunnelHealthChecks": [

#=>             {

#=>               {

#=>                 "avg": {

#=>                   "tunnelState": 1

#=>                 },

#=>                 "dimensions": {

#=>                   "edgeColoName": "mel01",

#=>                   "tunnelName": "tunnel_01",

#=>                   "tunnelState": 0.5

#=>                 }

#=>               },

#=>               {

#=>                 "avg": {

#=>                   "tunnelState": 0.5

#=>                 },

#=>                 "count": 310,

#=>                 "dimensions": {

#=>                   "edgeColoName": "mel01",

#=>                   "tunnelName": "tunnel_02",

#=>                   "tunnelState": 0.5

#=>                 }

#=>               }

#=>           ]

#=>         }

#=>       ]

#=>     }

#=>   },

#=>   "errors": null

#=> }


```

## Footnotes

1. For details, refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/). [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-magic-transit-tunnel-healthcheck-results/#page","headline":"Querying Magic Transit and Cloudflare WAN IPsec/GRE tunnel health check results with GraphQL · Cloudflare Analytics docs","description":"Query Magic Transit tunnel health check results.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-magic-transit-tunnel-healthcheck-results/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/tutorials/querying-magic-transit-tunnel-healthcheck-results/","name":"Querying Magic Transit and Cloudflare WAN IPsec/GRE tunnel health check results with GraphQL"}}]}
```
