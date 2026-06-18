# Method: projects.getCmekSettings

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Observability
*   Cloud Logging
*   Reference

Send feedback

# Method: projects.getCmekSettings Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Gets the Logging CMEK settings for the given resource.

Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.

See Configure CMEK for Cloud Logging for more information.

### HTTP request

Choose a location:

global africa-south1 asia-east1 asia-east2 asia-northeast1 asia-northeast2 asia-northeast3 asia-south1 asia-south2 asia-southeast1 asia-southeast2 asia-southeast3 australia-southeast1 australia-southeast2 europe-central2 europe-north1 europe-north2 europe-north3 europe-southwest1 europe-west1 europe-west10 europe-west12 europe-west2 europe-west3 europe-west4 europe-west6 europe-west8 europe-west9 me-central1 me-central2 me-west1 northamerica-northeast1 northamerica-northeast2 northamerica-south1 southamerica-east1 southamerica-west1 us-central1 us-east1 us-east4 us-east5 us-south1 us-west1 us-west2 us-west3 us-west4 ca ch eu in sa us

  
`GET https://logging.googleapis.com/v2/{name=projects/*}/cmekSettings`

The URLs use gRPC Transcoding syntax.

### Path parameters

 

Parameters

`name`

`string`

Required. The resource for which to retrieve CMEK settings.

```
"projects/[PROJECT_ID]/cmekSettings"
"organizations/[ORGANIZATION_ID]/cmekSettings"
"billingAccounts/[BILLING_ACCOUNT_ID]/cmekSettings"
"folders/[FOLDER_ID]/cmekSettings"
```

For example:

`"organizations/12345/cmekSettings"`

Note: CMEK for the Log Router can be configured for Google Cloud projects, folders, organizations, and billing accounts. Once configured for an organization, it applies to all projects and folders in the Google Cloud organization.

Authorization requires the following IAM permission on the specified resource `name`:

*   `logging.cmekSettings.get`

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `CmekSettings`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/logging.read`
*   `https://www.googleapis.com/auth/logging.admin`
*   `https://www.googleapis.com/auth/cloud-platform.read-only`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

Send feedback