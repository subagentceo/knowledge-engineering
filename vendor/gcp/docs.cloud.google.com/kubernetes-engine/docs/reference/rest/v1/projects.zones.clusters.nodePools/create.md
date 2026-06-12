# Method: projects.zones.clusters.nodePools.create

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   Reference

Send feedback

# Method: projects.zones.clusters.nodePools.create Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
    *   JSON representation
*   Response body
*   Authorization scopes
*   Try it!

Creates a node pool for a cluster.

### HTTP request

`POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}/nodePools`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

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

The request body contains data with the following structure:

JSON representation

{
  "nodePool": {
    object (`NodePool`)
  },
  "parent": string
}

 

Fields

`nodePool`

``object (`NodePool`)``

Required. The node pool to create.

`parent`

`string`

The parent (project, location, cluster name) where the node pool will be created. Specified in the format `projects/*/locations/*/clusters/*`.

Authorization requires the following IAM permission on the specified resource `parent`:

*   `container.clusters.update`

### Response body

If successful, the response body contains a newly created instance of `Operation`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/cloud-platform`
*   `https://www.googleapis.com/auth/container`

For more information, see the Authentication Overview.

Send feedback