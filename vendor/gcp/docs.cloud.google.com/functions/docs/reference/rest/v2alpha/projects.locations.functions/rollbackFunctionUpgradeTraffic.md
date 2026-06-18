# Method: projects.locations.functions.rollbackFunctionUpgradeTraffic

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

If you are creating a new function, see the Console Quickstart on Cloud Run.

*   Home
*   Documentation
*   Application hosting
*   Cloud Run
*   Cloud Run functions
*   Reference

Send feedback

# Method: projects.locations.functions.rollbackFunctionUpgradeTraffic Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Reverts the traffic target of a function from the 2nd gen copy to the original 1st gen function. After this operation, all new traffic is served by the 1st gen function.

### HTTP request

`POST https://cloudfunctions.googleapis.com/v2alpha/{name}:rollbackFunctionUpgradeTraffic`

### Path parameters

 

Parameters

`name`

`string`

Required. The name of the function for which traffic target should be changed back to 1st gen from 2nd gen. It takes the form `projects/{project}/locations/{location}/functions/{function}`.

Authorization requires the following IAM permission on the specified resource `name`:

*   `cloudfunctions.functions.generationUpgrade`

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `Operation`.

### Authorization scopes

Requires the following OAuth scope:

*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

Send feedback