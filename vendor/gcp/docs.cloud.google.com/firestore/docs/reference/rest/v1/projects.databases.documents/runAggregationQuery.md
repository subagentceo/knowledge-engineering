# Method: projects.databases.documents.runAggregationQuery

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Firestore
*   Reference

Send feedback

# Method: projects.databases.documents.runAggregationQuery Stay organized with collections Save and categorize content based on your preferences.

Runs an aggregation query.

Rather than producing `Document` results like `Firestore.RunQuery`, this API allows running an aggregation to produce a series of `AggregationResult` server-side.

High-Level Example:

```
-- Return the number of documents in table given a filter.
SELECT COUNT(*) FROM ( SELECT * FROM k where a = true );
```

### HTTP request

Choose a location:

global africa-south1 asia-east1 asia-east2 asia-northeast1 asia-northeast2 asia-northeast3 asia-south1 asia-south2 asia-southeast1 asia-southeast2 asia-southeast3 australia-southeast1 australia-southeast2 europe-central2 europe-north1 europe-north2 europe-southwest1 europe-west1 europe-west10 europe-west12 europe-west2 europe-west3 europe-west4 europe-west6 europe-west8 europe-west9 me-central1 me-central2 me-west1 northamerica-northeast1 northamerica-northeast2 northamerica-south1 southamerica-east1 southamerica-west1 us-central1 us-east1 us-east4 us-east5 us-south1 us-west1 us-west2 us-west3 us-west4 eu us

  
`POST https://firestore.googleapis.com/v1/{parent=projects/*/databases/*/documents}:runAggregationQuery`

The URLs use gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

Required. The parent resource name. In the format: `projects/{projectId}/databases/{databaseId}/documents` or `projects/{projectId}/databases/{databaseId}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom`

### Request body

The request body contains data with the following structure:

JSON representation

{
  "explainOptions": {
    object (`ExplainOptions`)
  },

  // Union field `query_type` can be only one of the following:
  "structuredAggregationQuery": {
    object (`StructuredAggregationQuery`)
  }
  // End of list of possible types for union field `query_type`.

  // Union field `consistency_selector` can be only one of the following:
  "transaction": string,
  "newTransaction": {
    object (`TransactionOptions`)
  },
  "readTime": string
  // End of list of possible types for union field `consistency_selector`.
}

 

Fields

`explainOptions`

``object (`ExplainOptions`)``

Optional. Explain options for the query. If set, additional query statistics will be returned. If not, only query results will be returned.

Union field `query_type`. The query to run. `query_type` can be only one of the following:

`structuredAggregationQuery`

``object (`StructuredAggregationQuery`)``

An aggregation query.

Union field `consistency_selector`. The consistency mode for the query, defaults to strong consistency. `consistency_selector` can be only one of the following:

`transaction`

`string (bytes format)`

Run the aggregation within an already active transaction.

The value here is the opaque transaction ID to execute the query in.

A base64-encoded string.

`newTransaction`

``object (`TransactionOptions`)``

Starts a new transaction as part of the query, defaulting to read-only.

The new transaction ID will be returned as the first response in the stream.

`readTime`

``string (`Timestamp` format)``

Executes the query at the given timestamp.

This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

### Response body

The response for `Firestore.RunAggregationQuery`.

If successful, the response body contains data with the following structure:

JSON representation

{
  "result": {
    object (`AggregationResult`)
  },
  "transaction": string,
  "readTime": string,
  "explainMetrics": {
    object (`ExplainMetrics`)
  }
}

 

Fields

`result`

``object (`AggregationResult`)``

A single aggregation result.

Not present when reporting partial progress.

`transaction`

`string (bytes format)`

The transaction that was started as part of this request.

Only present on the first response when the request requested to start a new transaction.

A base64-encoded string.

`readTime`

``string (`Timestamp` format)``

The time at which the aggregate result was computed. This is always monotonically increasing; in this case, the previous AggregationResult in the result stream are guaranteed not to have changed between their `readTime` and this one.

If the query returns no results, a response with `readTime` and no `result` will be sent, and this represents the time at which the query was run.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`explainMetrics`

``object (`ExplainMetrics`)``

Query explain metrics. This is only present when the `RunAggregationQueryRequest.explain_options` is provided, and it is sent only once with the last response in the stream.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/datastore`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

## StructuredAggregationQuery

Firestore query for running an aggregation over a `StructuredQuery`.

JSON representation

{
  "aggregations": [
    {
      object (`Aggregation`)
    }
  ],

  // Union field `query_type` can be only one of the following:
  "structuredQuery": {
    object (`StructuredQuery`)
  }
  // End of list of possible types for union field `query_type`.
}

 

Fields

`aggregations[]`

``object (`Aggregation`)``

Optional. Series of aggregations to apply over the results of the `structuredQuery`.

Requires:

*   A minimum of one and maximum of five aggregations per query.

Union field `query_type`. The base query to aggregate over. `query_type` can be only one of the following:

`structuredQuery`

``object (`StructuredQuery`)``

Nested structured query.

## Aggregation

Defines an aggregation that produces a single result.

JSON representation

{
  "alias": string,

  // Union field `operator` can be only one of the following:
  "count": {
    object (`Count`)
  },
  "sum": {
    object (`Sum`)
  },
  "avg": {
    object (`Avg`)
  }
  // End of list of possible types for union field `operator`.
}

 

Fields

`alias`

`string`

Optional. Optional name of the field to store the result of the aggregation into.

If not provided, Firestore will pick a default name following the format `field_<incremental_id++>`. For example:

```
AGGREGATE
  COUNT_UP_TO(1) AS count_up_to_1,
  COUNT_UP_TO(2),
  COUNT_UP_TO(3) AS count_up_to_3,
  COUNT(*)
OVER (
  ...
);
```

becomes:

```
AGGREGATE
  COUNT_UP_TO(1) AS count_up_to_1,
  COUNT_UP_TO(2) AS field_1,
  COUNT_UP_TO(3) AS count_up_to_3,
  COUNT(*) AS field_2
OVER (
  ...
);
```

Requires:

*   Must be unique across all aggregation aliases.
*   Conform to `document field name` limitations.

Union field `operator`. The type of aggregation to perform, required. `operator` can be only one of the following:

`count`

``object (`Count`)``

Count aggregator.

`sum`

``object (`Sum`)``

Sum aggregator.

`avg`

``object (`Avg`)``

Average aggregator.

## Count

Count of documents that match the query.

The `COUNT(*)` aggregation function operates on the entire document so it does not require a field reference.

JSON representation

{
  "upTo": string
}

 

Fields

`upTo`

`string (Int64Value format)`

Optional. Optional constraint on the maximum number of documents to count.

This provides a way to set an upper bound on the number of documents to scan, limiting latency, and cost.

Unspecified is interpreted as no bound.

High-Level Example:

```
AGGREGATE COUNT_UP_TO(1000) OVER ( SELECT * FROM k );
```

Requires:

*   Must be greater than zero when present.

## Sum

Sum of the values of the requested field.

*   Only numeric values will be aggregated. All non-numeric values including `NULL` are skipped.
    
*   If the aggregated values contain `NaN`, returns `NaN`. Infinity math follows IEEE-754 standards.
    
*   If the aggregated value set is empty, returns 0.
    
*   Returns a 64-bit integer if all aggregated numbers are integers and the sum result does not overflow. Otherwise, the result is returned as a double. Note that even if all the aggregated values are integers, the result is returned as a double if it cannot fit within a 64-bit signed integer. When this occurs, the returned value will lose precision.
    
*   When underflow occurs, floating-point aggregation is non-deterministic. This means that running the same query repeatedly without any changes to the underlying values could produce slightly different results each time. In those cases, values should be stored as integers over floating-point numbers.
    

JSON representation

{
  "field": {
    object (`FieldReference`)
  }
}

 

Fields

`field`

``object (`FieldReference`)``

The field to aggregate on.

## Avg

Average of the values of the requested field.

*   Only numeric values will be aggregated. All non-numeric values including `NULL` are skipped.
    
*   If the aggregated values contain `NaN`, returns `NaN`. Infinity math follows IEEE-754 standards.
    
*   If the aggregated value set is empty, returns `NULL`.
    
*   Always returns the result as a double.
    

JSON representation

{
  "field": {
    object (`FieldReference`)
  }
}

 

Fields

`field`

``object (`FieldReference`)``

The field to aggregate on.

## AggregationResult

The result of a single bucket from a Firestore aggregation query.

The keys of `aggregateFields` are the same for all results in an aggregation query, unlike document queries which can have different fields present for each result.

JSON representation

{
  "aggregateFields": {
    string: {
      object (`Value`)
    },
    ...
  }
}

 

Fields

`aggregateFields`

``map (key: string, value: object (`Value`))``

The result of the aggregation functions, ex: `COUNT(*) AS total_docs`.

The key is the `alias` assigned to the aggregation function on input and the size of this map equals the number of aggregation functions in the query.

An object containing a list of `"key": value` pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`.

Send feedback