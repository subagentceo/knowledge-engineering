---
title: Metrics and analytics
description: Query Pipelines metrics for data ingested, processed, and delivered via the dashboard or GraphQL API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Metrics and analytics

Pipelines expose metrics which allow you to measure data ingested, processed, and delivered to sinks.

The metrics displayed in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) are queried from Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

### Operator metrics

Pipelines export the below metrics within the `pipelinesOperatorAdaptiveGroups` dataset. These metrics track data read and processed by pipeline operators.

| Metric        | GraphQL Field Name | Description                                                                                              |
| ------------- | ------------------ | -------------------------------------------------------------------------------------------------------- |
| Bytes In      | bytesIn            | Total number of bytes read by the pipeline (filter by streamId\_neq: "" to get data read from streams)   |
| Records In    | recordsIn          | Total number of records read by the pipeline (filter by streamId\_neq: "" to get data read from streams) |
| Decode Errors | decodeErrors       | Number of messages that could not be deserialized in the stream schema                                   |

For a detailed breakdown of why events were dropped (including specific error types like `missing_field`, `type_mismatch`, `parse_failure`, and `null_value`), refer to [User error metrics](#user-error-metrics).

The `pipelinesOperatorAdaptiveGroups` dataset provides the following dimensions for filtering and grouping queries:

* `pipelineId` \- ID of the pipeline
* `streamId` \- ID of the source stream
* `datetime` \- Timestamp of the operation
* `date` \- Timestamp of the operation, truncated to the start of a day
* `datetimeHour` \- Timestamp of the operation, truncated to the start of an hour

### Sink metrics

Pipelines export the below metrics within the `pipelinesSinkAdaptiveGroups` dataset. These metrics track data delivery to sinks.

| Metric                     | GraphQL Field Name       | Description                                                  |
| -------------------------- | ------------------------ | ------------------------------------------------------------ |
| Bytes Written              | bytesWritten             | Total number of bytes written to the sink, after compression |
| Records Written            | recordsWritten           | Total number of records written to the sink                  |
| Files Written              | filesWritten             | Number of files written to the sink                          |
| Row Groups Written         | rowGroupsWritten         | Number of row groups written (for Parquet files)             |
| Uncompressed Bytes Written | uncompressedBytesWritten | Total number of bytes written before compression             |

The `pipelinesSinkAdaptiveGroups` dataset provides the following dimensions for filtering and grouping queries:

* `pipelineId` \- ID of the pipeline
* `sinkId` \- ID of the destination sink
* `datetime` \- Timestamp of the operation
* `date` \- Timestamp of the operation, truncated to the start of a day
* `datetimeHour` \- Timestamp of the operation, truncated to the start of an hour

### User error metrics

Pipelines track events that are dropped during processing due to deserialization errors. When a structured stream receives events that do not match its defined schema, those events are accepted during ingestion but dropped during processing. The `pipelinesUserErrorsAdaptiveGroups` dataset provides visibility into these dropped events, telling you which events were dropped and why. You can explore the full schema of this dataset using GraphQL [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/).

| Metric | GraphQL Field Name | Description                             |
| ------ | ------------------ | --------------------------------------- |
| Count  | count              | Number of events that failed validation |

The `pipelinesUserErrorsAdaptiveGroups` dataset provides the following dimensions for filtering and grouping queries:

* `pipelineId` \- ID of the pipeline
* `errorFamily` \- Category of the error (for example, `deserialization`)
* `errorType` \- Specific error type within the family
* `date` \- Date of the error, truncated to start of day
* `datetime` \- Timestamp of the error
* `datetimeHour` \- Timestamp of the error, truncated to the start of an hour
* `datetimeMinute` \- Timestamp of the error, truncated to the start of a minute

#### Known error types

| Error family    | Error type     | Description                                                                                                  |
| --------------- | -------------- | ------------------------------------------------------------------------------------------------------------ |
| deserialization | missing\_field | A required field defined in the stream schema was not present in the event                                   |
| deserialization | type\_mismatch | A field value did not match the expected type in the schema (for example, string sent where number expected) |
| deserialization | parse\_failure | The event could not be parsed as valid JSON, or a field value could not be parsed into the expected type     |
| deserialization | null\_value    | A required field was present but had a null value                                                            |

Note

To prevent incorrect data from being ingested in the first place, consider using [typed pipeline bindings](https://developers.cloudflare.com/pipelines/streams/writing-to-streams/#typed-pipeline-bindings) to catch schema violations at compile time.

## View metrics and errors in the dashboard

Per-pipeline analytics are available in the Cloudflare dashboard. To view current and historical metrics for a pipeline:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select your account.
2. Go to **Pipelines** \> **Pipelines**.
3. Select a pipeline.
4. Go to the **Metrics** tab to view its metrics or **Errors** tab to view dropped events.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your pipelines via the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). This API queries the same datasets as the Cloudflare dashboard and supports GraphQL [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/).

Pipelines GraphQL datasets require an `accountTag` filter with your Cloudflare account ID.

### Measure operator metrics over time period

This query returns the total bytes and records read by a pipeline from streams, along with any decode errors.

```

query PipelineOperatorMetrics(

  $accountTag: String!

  $pipelineId: String!

  $datetimeStart: Time!

  $datetimeEnd: Time!

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      pipelinesOperatorAdaptiveGroups(

        limit: 10000

        filter: {

          pipelineId: $pipelineId

          streamId_neq: ""

          datetime_geq: $datetimeStart

          datetime_leq: $datetimeEnd

        }

      ) {

        sum {

          bytesIn

          recordsIn

          decodeErrors

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBACgSwA5gDYIHZgPIogQwBcB7CAWTEIgQGMBnACgCgYYASfGm4kDQgFXwBzAFwwAylUxCAhC3ZJkaTGACSAEzGTqGWfLbqilBAFswk-BEJj+psHNYGjhOwFEMmmLbNyAlDABveQA3BDAAd0hA+VZObl5CRgAzBFRCSDEAmDiePkFRdhyE-JgAX38g1iqYRRR0LDpcSCJSAEFDJBdgsABxCB4kRhjqmHQTBGsYAEYABjmZ4eqUtIzokZHa5SwNMTZN+rV1RZG6KjB8Ew0AfSxgMQAie+Pqw3SXMyuhMDv2V+MzCxWZ5VP7vMBXVDfXagtweYGlY4VYF0EAmNbrKoAIyg6ToqgwwNYEDA3Ag6jxBIxIJJxHUYFcEH6EDo8OOCOq7LKTFKQA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQAHASyYFMAbF+dqgEywgASgFEACgBl8oigHUqyABLU6jfmETtELALbsAyojAAnREIBMABgsA2ALRWHARgDsyZwA5MzgJyYrKwAtBhANLR19UXhBbGs7RxdPZECff0CQgF8gA)

### Measure sink delivery metrics

This query returns detailed metrics about data written to a specific sink, including file and compression statistics.

```

query PipelineSinkMetrics(

  $accountTag: String!

  $pipelineId: String!

  $sinkId: String!

  $datetimeStart: Time!

  $datetimeEnd: Time!

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      pipelinesSinkAdaptiveGroups(

        limit: 10000

        filter: {

          pipelineId: $pipelineId

          sinkId: $sinkId

          datetime_geq: $datetimeStart

          datetime_leq: $datetimeEnd

        }

      ) {

        sum {

          bytesWritten

          recordsWritten

          filesWritten

          rowGroupsWritten

          uncompressedBytesWritten

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBACgSwA5gDYIHZgMqYNYCyYALhAgMYDOAFAFAwwAkAhueQPYgbEAqzA5gC4Y2Upn4BCekyTI0mMAEkAJsNFkMk6Y0r4VasZqkNGy5sRIIAtjmLMIxYT2thjTMxeIuAohlUxnGykAShgAb2kANwQwAHdIcOkGVg4uYhoAMwRUCwhhMJgUzm4+ISYitNKYAF9QiIYGmFkUdCxKXAw8AEEzJC9IsABxCE4kGiTGmHQrBEcYAEYABmXFicasnMh8tcnm+Sx9GTlWpWUdxt1Ow509M8nJj0sbAH1+MGBhU3Mn23tic4ajy8L1Q70+QJ8fgB1R2dQBlBAVkS90aACMoBZKAB1MjECwYAEMCBgDgQZTY3H4wkwDZgCmzKkohojWLDUb0vFgAlMhhcDhWJDEyiUMDKABCGLpOIZXOhOxhjQVNVo1SAA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQAHASyYFMAbF+dqgEywgASgFEACgBl8oigHUqyABLU6jAM48A1gKFipM+YpW0GIfmETtELALbsAyojAAnREIBMABg8A2ALReAQCMAOzIwQAcmMEAnJheXgBaZhZWNvai8ILY3n6BIZHIiTHxiSkAvkA)

### Query dropped event errors

This query returns a summary of events that were dropped due to schema validation failures, grouped by error type and ordered by frequency.

```

query GetPipelineUserErrors(

  $accountTag: String!

  $pipelineId: String!

  $datetimeStart: Time!

  $datetimeEnd: Time!

) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      pipelinesUserErrorsAdaptiveGroups(

        limit: 100

        filter: {

          pipelineId: $pipelineId

          datetime_geq: $datetimeStart

          datetime_leq: $datetimeEnd

        }

        orderBy: [count_DESC]

      ) {

        count

        dimensions {

          date

          errorFamily

          errorType

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA4mALgBQJYAcwBtUDswCqAzpAKIQQD2ERAFAFAwwAkAhgMbuUi6IAqrAOYAuGAGVEEPIICEjFugzY8YAJIATURKm5Z85utaIkqALZgJrCIlF8zYOUwNGT50rk0w75uQEoYAN7yAG6oYADukIHyTBxcPIh0AGaoWMYQogEwcdy8AiIsOQn5MAC+-kFMVTCKmDj4RMRkFNREAIKG6IiowWBwVCDodDHVMDimqDYwAIwADLMj1SlpkJmLo7XK+BqizJv1aurr1YbG3eYA+oJgwLunrhaIVojHVffnYBdYN3cuH+5HUZVUqvajqSAAISgogA2vFeBcACKkMQAYQAuusKq94S8gUx1PZcERUJRidF8W8XK8mJAqBAAGKsCZYKA0mB06h8KCYV4goH84HyEGlIA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQAHASyYFMAbF+dqgEywgASgFEACgBl8oigHUqyABLU6jfmETtELALbsAyojAAnREIBMABgsA2ALRWHARgDsyZwA5MzgJyYrKwAtBhANLR19UXhBbGs7RxdPZECff0CQgF8gA)

Example response:

```

{

  "data": {

    "viewer": {

      "accounts": [

        {

          "pipelinesUserErrorsAdaptiveGroups": [

            {

              "count": 679,

              "dimensions": {

                "date": "2026-02-19",

                "errorFamily": "deserialization",

                "errorType": "missing_field"

              }

            },

            {

              "count": 392,

              "dimensions": {

                "date": "2026-02-19",

                "errorFamily": "deserialization",

                "errorType": "type_mismatch"

              }

            },

            {

              "count": 363,

              "dimensions": {

                "date": "2026-02-19",

                "errorFamily": "deserialization",

                "errorType": "parse_failure"

              }

            },

            {

              "count": 44,

              "dimensions": {

                "date": "2026-02-19",

                "errorFamily": "deserialization",

                "errorType": "null_value"

              }

            }

          ]

        }

      ]

    }

  },

  "errors": null

}


```

You can filter by a specific error type by adding `errorType` to the filter:

```

pipelinesUserErrorsAdaptiveGroups(

  limit: 100

  filter: {

    pipelineId: $pipelineId

    datetime_geq: $datetimeStart

    datetime_leq: $datetimeEnd

    errorType: "type_mismatch"

  }

  orderBy: [count_DESC]

)


```

To query errors across all pipelines on an account, omit the `pipelineId` filter and include `pipelineId` in the dimensions:

```

pipelinesUserErrorsAdaptiveGroups(

  limit: 100

  filter: {

    datetime_geq: $datetimeStart

    datetime_leq: $datetimeEnd

  }

  orderBy: [count_DESC]

) {

  count

  dimensions {

    pipelineId

    errorFamily

    errorType

  }

}


```

Note

In addition to `pipelinesUserErrorsAdaptiveGroups`, you can also query the `pipelinesUserErrorsAdaptive` dataset, which provides detailed error descriptions within the last 24 hours. Be aware that querying this dataset may return a large volume of data if your pipeline processes many events.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/observability/metrics/#page","headline":"Metrics and analytics · Cloudflare Pipelines Docs","description":"Query Pipelines metrics for data ingested, processed, and delivered via the dashboard or GraphQL API.","url":"https://developers.cloudflare.com/pipelines/observability/metrics/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/observability/metrics/","name":"Metrics and analytics"}}]}
```
