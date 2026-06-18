# Method: projects.locations.clusters.nodePools.list

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   Reference

Send feedback

# Method: projects.locations.clusters.nodePools.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Lists the node pools for a cluster.

### HTTP request

`GET https://container.googleapis.com/v1beta1/{parent=projects/*/locations/*/clusters/*}/nodePools`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

The parent (project, location, cluster name) where the node pools will be listed. Specified in the format `projects/*/locations/*/clusters/*`.

Authorization requires the following IAM permission on the specified resource `parent`:

*   `container.clusters.get`

### Query parameters

 

Parameters

`projectId   **(deprecated)**`

`string`

Deprecated. The Google Developers Console project ID or project number. This field has been deprecated and replaced by the parent field.

`zone   **(deprecated)**`

`string`

Deprecated. The name of the Google Compute Engine zone in which the cluster resides. This field has been deprecated and replaced by the parent field.

`clusterId   **(deprecated)**`

`string`

Deprecated. The name of the cluster. This field has been deprecated and replaced by the parent field.

### Request body

The request body must be empty.

### Response body

If successful, the response body contains an instance of `ListNodePoolsResponse`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/cloud-platform`
*   `https://www.googleapis.com/auth/container`
*   `https://www.googleapis.com/auth/container.read-only`

For more information, see the Authentication Overview.

Send feedback