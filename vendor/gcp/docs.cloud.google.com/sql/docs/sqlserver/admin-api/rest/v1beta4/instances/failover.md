# Method: instances.failover

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   SQL Server
*   Reference

Send feedback

# Method: instances.failover Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   InstancesFailoverRequest
    *   JSON representation
*   FailoverContext
    *   JSON representation
*   Examples
*   Try it!

Initiates a manual failover of a high availability (HA) primary instance to a standby instance, which becomes the primary instance. Users are then rerouted to the new primary. For more information, see the Overview of high availability page in the Cloud SQL documentation. If using Legacy HA (MySQL only), this causes the instance to failover to its failover replica instance.

### HTTP request

`POST https://sqladmin.googleapis.com/sql/v1beta4/projects/{project}/instances/{instance}/failover`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`project`

`string`

ID of the project that contains the read replica.

`instance`

`string`

Cloud SQL instance ID. This does not include the project ID.

### Request body

The request body contains an instance of `InstancesFailoverRequest`.

### Response body

If successful, the response body contains an instance of `Operation`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/cloud-platform`
*   `https://www.googleapis.com/auth/sqlservice.admin`

For more information, see the Authentication Overview.

## InstancesFailoverRequest

Instance failover request.

JSON representation

{
  "failoverContext": {
    object (`FailoverContext`)
  }
}

 

Fields

`failoverContext`

``object (`FailoverContext`)``

instances.failover Context.

## FailoverContext

Database instance failover context.

JSON representation

{
  "settingsVersion": string,
  "kind": string
}

 

Fields

`settingsVersion`

`string (int64 format)`

The current settings version of this instance. Request will be rejected if this version doesn't match the current settings version.

`kind`

`string`

This is always `sql#failoverContext`.

Send feedback