# Method: projects.locations.dataExchanges.subscribe

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Reference

Send feedback

# Method: projects.locations.dataExchanges.subscribe Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
    *   JSON representation
*   Response body
*   Authorization scopes
*   IAM Permissions
*   Try it!

Creates a Subscription to a Data Clean Room. This is a long-running operation as it will create one or more linked datasets. Throws a Bad Request error if the Data Exchange does not contain any listings.

### HTTP request

`POST https://analyticshub.googleapis.com/v1/{name=projects/*/locations/*/dataExchanges/*}:subscribe`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`name`

`string`

Required. Resource name of the Data Exchange. e.g. `projects/publisherproject/locations/us/dataExchanges/123`

### Request body

The request body contains data with the following structure:

JSON representation

{
  "destination": string,
  "destinationDataset": {
    object (`DestinationDataset`)
  },
  "subscription": string,
  "subscriberContact": string
}

 

Fields

`destination`

`string`

Required. The parent resource path of the Subscription. e.g. `projects/subscriberproject/locations/us`

`destinationDataset`

``object (`DestinationDataset`)``

Optional. BigQuery destination dataset to create for the subscriber.

`subscription`

`string`

Required. Name of the subscription to create. e.g. `subscription1`

`subscriberContact`

`string`

Email of the subscriber.

### Response body

If successful, the response body contains an instance of `Operation`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/bigquery`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

Requires the following IAM permission on the `destination` resource:

*   `analyticshub.subscriptions.create`

Requires the following IAM permission on the `name` resource:

*   `analyticshub.dataExchanges.subscribe`

For more information, see the IAM documentation.

Send feedback