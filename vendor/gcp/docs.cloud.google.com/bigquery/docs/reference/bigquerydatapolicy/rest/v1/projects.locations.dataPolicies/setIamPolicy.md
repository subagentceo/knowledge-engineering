# Method: projects.locations.dataPolicies.setIamPolicy

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   BigQuery
*   Reference

Send feedback

# Method: projects.locations.dataPolicies.setIamPolicy Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
    *   JSON representation
*   Response body
*   Authorization scopes
*   IAM Permissions
*   Try it!

Sets the IAM policy for the specified data policy.

### HTTP request

`POST https://bigquerydatapolicy.googleapis.com/v1/{resource=projects/*/locations/*/dataPolicies/*}:setIamPolicy`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`resource`

`string`

REQUIRED: The resource for which the policy is being specified. See Resource names for the appropriate value for this field.

### Request body

The request body contains data with the following structure:

JSON representation

{
  "policy": {
    object (`Policy`)
  },
  "updateMask": string
}

 

Fields

`policy`

``object (`Policy`)``

REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them.

`updateMask`

``string (`FieldMask` format)``

OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used:

`paths: "bindings, etag"`

This is a comma-separated list of fully qualified names of fields. Example: `"user.displayName,photo"`.

### Response body

If successful, the response body contains an instance of `Policy`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/bigquery`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

Requires the following IAM permission on the `resource` resource:

*   `bigquery.dataPolicies.setIamPolicy`

For more information, see the IAM documentation.

Send feedback