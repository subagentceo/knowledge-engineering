# Method: folders.locations.buckets.get

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Observability
*   Cloud Logging
*   Reference

Send feedback

# Method: folders.locations.buckets.get Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Gets a log bucket.

### HTTP request

Choose a location:

global africa-south1 asia-east1 asia-east2 asia-northeast1 asia-northeast2 asia-northeast3 asia-south1 asia-south2 asia-southeast1 asia-southeast2 asia-southeast3 australia-southeast1 australia-southeast2 europe-central2 europe-north1 europe-north2 europe-north3 europe-southwest1 europe-west1 europe-west10 europe-west12 europe-west2 europe-west3 europe-west4 europe-west6 europe-west8 europe-west9 me-central1 me-central2 me-west1 northamerica-northeast1 northamerica-northeast2 northamerica-south1 southamerica-east1 southamerica-west1 us-central1 us-east1 us-east4 us-east5 us-south1 us-west1 us-west2 us-west3 us-west4 ca ch eu in sa us

  
`GET https://logging.googleapis.com/v2/{name=folders/*/locations/*/buckets/*}`

The URLs use gRPC Transcoding syntax.

### Path parameters

 

Parameters

`name`

`string`

Required. The resource name of the bucket:

```
"projects/[PROJECT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
"organizations/[ORGANIZATION_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
"billingAccounts/[BILLING_ACCOUNT_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
"folders/[FOLDER_ID]/locations/[LOCATION_ID]/buckets/[BUCKET_ID]"
```

For example:

`"projects/my-project/locations/global/buckets/my-bucket"`

Authorization requires the following IAM permission on the specified resource `name`:

*   `logging.buckets.get`

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `LogBucket`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/logging.read`
*   `https://www.googleapis.com/auth/logging.admin`
*   `https://www.googleapis.com/auth/cloud-platform.read-only`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

Send feedback