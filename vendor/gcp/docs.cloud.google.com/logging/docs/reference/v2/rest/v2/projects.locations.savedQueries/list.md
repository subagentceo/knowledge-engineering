# Method: projects.locations.savedQueries.list

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Observability
*   Cloud Logging
*   Reference

Send feedback

# Method: projects.locations.savedQueries.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Lists the SavedQueries that were created by the user making the request.

### HTTP request

Choose a location:

global africa-south1 asia-east1 asia-east2 asia-northeast1 asia-northeast2 asia-northeast3 asia-south1 asia-south2 asia-southeast1 asia-southeast2 asia-southeast3 australia-southeast1 australia-southeast2 europe-central2 europe-north1 europe-north2 europe-north3 europe-southwest1 europe-west1 europe-west10 europe-west12 europe-west2 europe-west3 europe-west4 europe-west6 europe-west8 europe-west9 me-central1 me-central2 me-west1 northamerica-northeast1 northamerica-northeast2 northamerica-south1 southamerica-east1 southamerica-west1 us-central1 us-east1 us-east4 us-east5 us-south1 us-west1 us-west2 us-west3 us-west4 ca ch eu in sa us

  
`GET https://logging.googleapis.com/v2/{parent=projects/*/locations/*}/savedQueries`

The URLs use gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

Required. The resource to which the listed queries belong.

```
"projects/[PROJECT_ID]/locations/[LOCATION_ID]"
"organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]"
"billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]"
"folders/[FOLDER_ID]/locations/[LOCATION_ID]"
```

For example:

```
"projects/my-project/locations/us-central1"
```

Note: The locations portion of the resource must be specified. To get a list of all saved queries, a wildcard character `-` can be used for [LOCATION_ID], for example:

```
"projects/my-project/locations/-"
```

Authorization requires the following IAM permission on the specified resource `parent`:

*   `logging.queries.list`

### Query parameters

 

Parameters

`pageToken`

`string`

Optional. If present, then retrieve the next batch of results from the preceding call to this method. `pageToken` must be the value of `nextPageToken` from the previous response. The values of other method parameters should be identical to those in the previous call.

`pageSize`

`integer`

Optional. The maximum number of results to return from this request.

Non-positive values are ignored. The presence of `nextPageToken` in the response indicates that more results might be available.

`filter`

`string`

Optional. Specifies the type ("Logging" or "OpsAnalytics") and the visibility (PRIVATE or SHARED) of the saved queries to list. If provided, the filter must contain either the `type` function or a `visibility` token, or both. If both are chosen, they can be placed in any order, but they must be joined by the AND operator or the empty character.

The two supported `type` function calls are:

*   `type("Logging")`
*   `type("OpsAnalytics")`

The two supported `visibility` tokens are:

*   `visibility = PRIVATE`
*   `visibility = SHARED`

For example:

`type("Logging") AND visibility = PRIVATE` `visibility=SHARED type("OpsAnalytics")` `type("OpsAnalytics)"` `visibility = PRIVATE` `visibility = SHARED`

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `ListSavedQueriesResponse`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/logging.read`
*   `https://www.googleapis.com/auth/logging.admin`
*   `https://www.googleapis.com/auth/cloud-platform.read-only`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

Send feedback