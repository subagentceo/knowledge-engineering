# Method: organizations.locations.buckets.views.list

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Observability
*   Cloud Logging
*   Reference

Send feedback

# Method: organizations.locations.buckets.views.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Lists views on a log bucket.

### HTTP request

Choose a location:

global africa-south1 asia-east1 asia-east2 asia-northeast1 asia-northeast2 asia-northeast3 asia-south1 asia-south2 asia-southeast1 asia-southeast2 asia-southeast3 australia-southeast1 australia-southeast2 europe-central2 europe-north1 europe-north2 europe-north3 europe-southwest1 europe-west1 europe-west10 europe-west12 europe-west2 europe-west3 europe-west4 europe-west6 europe-west8 europe-west9 me-central1 me-central2 me-west1 northamerica-northeast1 northamerica-northeast2 northamerica-south1 southamerica-east1 southamerica-west1 us-central1 us-east1 us-east4 us-east5 us-south1 us-west1 us-west2 us-west3 us-west4 ca ch eu in sa us

  
`GET https://logging.googleapis.com/v2/{parent=organizations/*/locations/*/buckets/*}/views`

The URLs use gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

Required. The bucket whose views are to be listed:

```
"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
```

Authorization requires the following IAM permission on the specified resource `parent`:

*   `logging.views.list`

### Query parameters

 

Parameters

`pageToken`

`string`

Optional. If present, then retrieve the next batch of results from the preceding call to this method. `pageToken` must be the value of `nextPageToken` from the previous response. The values of other method parameters should be identical to those in the previous call.

`pageSize`

`integer`

Optional. The maximum number of results to return from this request.

Non-positive values are ignored. The presence of `nextPageToken` in the response indicates that more results might be available.

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `ListViewsResponse`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/logging.read`
*   `https://www.googleapis.com/auth/logging.admin`
*   `https://www.googleapis.com/auth/cloud-platform.read-only`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

Send feedback