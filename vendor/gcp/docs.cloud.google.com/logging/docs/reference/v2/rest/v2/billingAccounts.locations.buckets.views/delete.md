# Method: billingAccounts.locations.buckets.views.delete

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Observability
*   Cloud Logging
*   Reference

Send feedback

# Method: billingAccounts.locations.buckets.views.delete Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Deletes a view on a log bucket. If an `UNAVAILABLE` error is returned, this indicates that system is not in a state where it can delete the view. If this occurs, please try again in a few minutes.

### HTTP request

Choose a location:

global africa-south1 asia-east1 asia-east2 asia-northeast1 asia-northeast2 asia-northeast3 asia-south1 asia-south2 asia-southeast1 asia-southeast2 asia-southeast3 australia-southeast1 australia-southeast2 europe-central2 europe-north1 europe-north2 europe-north3 europe-southwest1 europe-west1 europe-west10 europe-west12 europe-west2 europe-west3 europe-west4 europe-west6 europe-west8 europe-west9 me-central1 me-central2 me-west1 northamerica-northeast1 northamerica-northeast2 northamerica-south1 southamerica-east1 southamerica-west1 us-central1 us-east1 us-east4 us-east5 us-south1 us-west1 us-west2 us-west3 us-west4 ca ch eu in sa us

  
`DELETE https://logging.googleapis.com/v2/{name=billingAccounts/*/locations/*/buckets/*/views/*}`

The URLs use gRPC Transcoding syntax.

### Path parameters

 

Parameters

`name`

`string`

Required. The full resource name of the view to delete:

```
"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]/views/[VIEW_ID]"
```

For example:

`"projects/my-project/locations/global/buckets/my-bucket/views/my-view"`

Authorization requires the following IAM permission on the specified resource `name`:

*   `logging.views.delete`

### Request body

The request body must be empty.

### Response body

If successful, the response body is an empty JSON object.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/logging.admin`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

Send feedback