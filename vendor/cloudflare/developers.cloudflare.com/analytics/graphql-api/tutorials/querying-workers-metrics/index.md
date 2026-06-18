---
title: Querying Workers Metrics with GraphQL
description: Query Workers invocation metrics via GraphQL.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Querying Workers Metrics with GraphQL

In this example, we are going to use the GraphQL Analytics API to query for Workers Metrics over a specified time period. We can query up to one month of data for dates up to three months ago.

The following API call will request a Worker script's metrics over a one day period, and output the requested fields. Be sure to replace `<CLOUDFLARE_ACCOUNT_TAG>` and `<API_TOKEN>`[1](#user-content-fn-1) with your API credentials, and adjust the `datetimeStart`, `datetimeEnd`, and `scriptName` variables as needed.

## API Call

Terminal window

```

echo '{ "query":

  "query GetWorkersAnalytics($accountTag: string, $datetimeStart: string, $datetimeEnd: string, $scriptName: string) {

    viewer {

      accounts(filter: {accountTag: $accountTag}) {

        workersInvocationsAdaptive(limit: 100, filter: {

          scriptName: $scriptName,

          datetime_geq: $datetimeStart,

          datetime_leq: $datetimeEnd

        }) {

          sum {

            subrequests

            requests

            errors

          }

          quantiles {

            cpuTimeP50

            cpuTimeP99

          }

          dimensions{

            datetime

            scriptName

            status

          }

        }

      }

    }

  }",

  "variables": {

    "accountTag": "<CLOUDFLARE_ACCOUNT_TAG>",

    "datetimeStart": "2022-08-04T00:00:00.000Z",

    "datetimeEnd": "2022-08-04T01:00:00.000Z",

    "scriptName": "worker-subrequest-test-client"

  }

}' | tr -d '\n' | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data @-


```

The results returned will be in JSON (as requested), so piping the output to `jq` will make them easier to read, like in the following example:

Terminal window

```

... | curl --silent \

https://api.cloudflare.com/client/v4/graphql \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Accept: application/json" \

--header "Content-Type: application/json" \

--data @- | jq .


#=> {

#=>   "data": {

#=>     "viewer": {

#=>       "accounts": [

#=>         {

#=>           "workersInvocationsAdaptive": [

#=>             {

#=>               "dimensions": {

#=>                 "datetime": "2020-05-04T18:10:35Z",

#=>                 "scriptName": "worker-subrequest-test-client",

#=>                 "status": "success"

#=>               },

#=>               "quantiles": {

#=>                 "cpuTimeP50": 206,

#=>                 "cpuTimeP99": 206

#=>               },

#=>               "sum": {

#=>                 "errors": 0,

#=>                 "requests": 1,

#=>                 "subrequests": 0

#=>               }

#=>             },

#=>             {

#=>               "dimensions": {

#=>                 "datetime": "2020-05-04T18:10:34Z",

#=>                 "scriptName": "worker-subrequest-test-client",

#=>                 "status": "success"

#=>               },

#=>               "quantiles": {

#=>                 "cpuTimeP50": 291,

#=>                 "cpuTimeP99": 291

#=>               },

#=>               "sum": {

#=>                 "errors": 0,

#=>                 "requests": 1,

#=>                 "subrequests": 0

#=>               }

#=>             },

#=>             {

#=>               "dimensions": {

#=>                 "datetime": "2020-05-04T18:10:49Z",

#=>                 "scriptName": "worker-subrequest-test-client",

#=>                 "status": "success"

#=>               },

#=>               "quantiles": {

#=>                 "cpuTimeP50": 212.5,

#=>                 "cpuTimeP99": 261.19

#=>               },

#=>               "sum": {

#=>                 "errors": 0,

#=>                 "requests": 4,

#=>                 "subrequests": 0

#=>               }

#=>             }

#=>           ]

#=>         }

#=>       ]

#=>     }

#=>   },

#=>   "errors": null

#=> }


```

## Footnotes

1. Refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/) for more information on configuration and permissions. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/#page","headline":"Querying Workers Metrics with GraphQL · Cloudflare Analytics docs","description":"Query Workers invocation metrics via GraphQL.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-workers-metrics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/tutorials/querying-workers-metrics/","name":"Querying Workers Metrics with GraphQL"}}]}
```
