# Method: projects.locations.instances.osPolicyAssignments.reports.list

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: projects.locations.instances.osPolicyAssignments.reports.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
    *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

List OS policy assignment reports for all Compute Engine VM instances in the specified zone.

### HTTP request

`GET https://osconfig.googleapis.com/v1alpha/{parent=projects/*/locations/*/instances/*/osPolicyAssignments/*}/reports`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

Required. The parent resource name.

Format: `projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/{assignment}/reports`

For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either `instance-name`, `instance-id`, or `-` can be provided. If '-' is provided, the response will include OSPolicyAssignmentReports for all instances in the project/location. For `{assignment}`, either `assignment-id` or `-` can be provided. If '-' is provided, the response will include OSPolicyAssignmentReports for all OSPolicyAssignments in the project/location. Either {instance} or {assignment} must be `-`.

For example: `projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/-/reports` returns all reports for the instance `projects/{project}/locations/{location}/instances/-/osPolicyAssignments/{assignment-id}/reports` returns all the reports for the given assignment across all instances. `projects/{project}/locations/{location}/instances/-/osPolicyAssignments/-/reports` returns all the reports for all assignments across all instances.

### Query parameters

 

Parameters

`pageSize`

`integer`

The maximum number of results to return.

`filter`

`string`

If provided, this field specifies the criteria that must be met by the `OSPolicyAssignmentReport` API resource that is included in the response.

`pageToken`

`string`

A pagination token returned from a previous call to the `reports.list` method that indicates where this listing should continue from.

### Request body

The request body must be empty.

### Response body

A response message for listing OS Policy assignment reports including the page of results and page token.

If successful, the response body contains data with the following structure:

JSON representation

{
  "osPolicyAssignmentReports": [
    {
      object (`OSPolicyAssignmentReport`)
    }
  ],
  "nextPageToken": string
}

 

Fields

`osPolicyAssignmentReports[]`

``object (`OSPolicyAssignmentReport`)``

List of OS policy assignment reports.

`nextPageToken`

`string`

The pagination token to retrieve the next page of OS policy assignment report objects.

### Authorization scopes

Requires the following OAuth scope:

*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

Requires the following IAM permission on the `parent` resource:

*   `osconfig.osPolicyAssignmentReports.list`

For more information, see the IAM documentation.

Send feedback