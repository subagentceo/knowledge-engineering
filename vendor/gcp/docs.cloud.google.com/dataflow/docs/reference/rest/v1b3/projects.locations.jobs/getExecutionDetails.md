# Method: projects.locations.jobs.getExecutionDetails

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   Cloud Dataflow
*   Reference

Send feedback

# Method: projects.locations.jobs.getExecutionDetails Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
    *   JSON representation
*   Authorization scopes
*   StageSummary
    *   JSON representation
*   StragglerSummary
    *   JSON representation
*   Straggler
    *   JSON representation
*   StreamingStragglerInfo
    *   JSON representation
*   Try it!

Request detailed information about the execution status of the job.

EXPERIMENTAL. This API is subject to change or removal without notice.

### HTTP request

Choose a location:

global

  
`GET https://dataflow.googleapis.com/v1b3/projects/{projectId}/locations/{location}/jobs/{jobId}/executionDetails`

The URLs use gRPC Transcoding syntax.

### Path parameters

 

Parameters

`projectId`

`string`

A project id.

`location`

`string`

The regional endpoint that contains the job specified by jobId.

`jobId`

`string`

The job to get execution details for.

### Query parameters

 

Parameters

`pageSize`

`integer`

If specified, determines the maximum number of stages to return. If unspecified, the service may choose an appropriate default, or may return an arbitrarily large number of results.

`pageToken`

`string`

If supplied, this should be the value of nextPageToken returned by an earlier call. This will cause the next page of results to be returned.

### Request body

The request body must be empty.

### Response body

Information about the execution of a job.

If successful, the response body contains data with the following structure:

JSON representation

{
  "stages": [
    {
      object (`StageSummary`)
    }
  ],
  "nextPageToken": string
}

 

Fields

`stages[]`

``object (`StageSummary`)``

The stages of the job execution.

`nextPageToken`

`string`

If present, this response does not contain all requested tasks. To obtain the next page of results, repeat the request with pageToken set to this value.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

## StageSummary

Information about a particular execution stage of a job.

JSON representation

{
  "stageId": string,
  "state": enum (`ExecutionState`),
  "startTime": string,
  "endTime": string,
  "progress": {
    object (`ProgressTimeseries`)
  },
  "metrics": [
    {
      object (`MetricUpdate`)
    }
  ],
  "stragglerSummary": {
    object (`StragglerSummary`)
  }
}

 

Fields

`stageId`

`string`

ID of this stage

`state`

``enum (`ExecutionState`)``

State of this stage.

`startTime`

``string (`Timestamp` format)``

Start time of this stage.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`endTime`

``string (`Timestamp` format)``

End time of this stage.

If the work item is completed, this is the actual end time of the stage. Otherwise, it is the predicted end time.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`progress`

``object (`ProgressTimeseries`)``

Progress for this stage. Only applicable to Batch jobs.

`metrics[]`

``object (`MetricUpdate`)``

Metrics for this stage.

`stragglerSummary`

``object (`StragglerSummary`)``

Straggler summary for this stage.

## StragglerSummary

Summarized straggler identification details.

JSON representation

{
  "totalStragglerCount": string,
  "stragglerCauseCount": {
    string: string,
    ...
  },
  "recentStragglers": [
    {
      object (`Straggler`)
    }
  ]
}

 

Fields

`totalStragglerCount`

`string (int64 format)`

The total count of stragglers.

`stragglerCauseCount`

`map (key: string, value: string (int64 format))`

Aggregated counts of straggler causes, keyed by the string representation of the StragglerCause enum.

`recentStragglers[]`

``object (`Straggler`)``

The most recent stragglers.

## Straggler

Information for a straggler.

JSON representation

{

  // Union field `straggler_info` can be only one of the following:
  "batchStraggler": {
    object (`StragglerInfo`)
  },
  "streamingStraggler": {
    object (`StreamingStragglerInfo`)
  }
  // End of list of possible types for union field `straggler_info`.
}

 

Fields

Union field `straggler_info`. Information useful for straggler identification and debugging. `straggler_info` can be only one of the following:

`batchStraggler`

``object (`StragglerInfo`)``

Batch straggler identification and debugging information.

`streamingStraggler`

``object (`StreamingStragglerInfo`)``

Streaming straggler identification and debugging information.

## StreamingStragglerInfo

Information useful for streaming straggler identification and debugging.

JSON representation

{
  "startTime": string,
  "endTime": string,
  "workerName": string,
  "dataWatermarkLag": string,
  "systemWatermarkLag": string
}

 

Fields

`startTime`

``string (`Timestamp` format)``

Start time of this straggler.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`endTime`

``string (`Timestamp` format)``

End time of this straggler.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`workerName`

`string`

Name of the worker where the straggler was detected.

`dataWatermarkLag`

``string (`Duration` format)``

The event-time watermark lag at the time of the straggler detection.

A duration in seconds with up to nine fractional digits, ending with '`s`'. Example: `"3.5s"`.

`systemWatermarkLag`

``string (`Duration` format)``

The system watermark lag at the time of the straggler detection.

A duration in seconds with up to nine fractional digits, ending with '`s`'. Example: `"3.5s"`.

Send feedback