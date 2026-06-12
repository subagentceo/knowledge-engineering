# Method: projects.zones.clusters.setMaintenancePolicy

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

Skip to main content

 ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

Technology areas

close

*   AI and ML
    
*   Application development
    
*   Application hosting
    
*   Compute
    
*   Data analytics and pipelines
    
*   Databases
    
*   Distributed, hybrid, and multicloud
    
*   Industry solutions
    
*   Migration
    
*   Networking
    
*   Observability and monitoring
    
*   Security
    
*   Storage
    

Cross-product tools

close

*   Access and resources management
    
*   Costs and usage management
    
*   Infrastructure as code
    
*   SDK, languages, frameworks, and tools
    

/

Console

*   English
*   Deutsch
*   Español – América Latina
*   Français
*   Português – Brasil
*   中文 – 简体
*   日本語
*   한국어

Sign in

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/kubernetes-engine-color.svg)

*   Google Kubernetes Engine (GKE)

Start free

Overview Guides Reference Samples Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Overview
    *   Guides
    *   Reference
    *   Samples
    *   Resources
*   Cross-product tools
    *   More
*   Console

*   Kubernetes Engine
    
*   Authenticate to the GKE API
*   All APIs and references
*   API organization and structure
*   API permissions
*   GKE API
    
    *   Overview
    *   v1 API
        
        *   REST Resources
            
        *   projects.aggregated.usableSubnetworks
            
            *   Overview
            *   list
            
        *   projects.locations
            
            *   Overview
            *   getServerConfig
            
        *   projects.locations.clusters
            
            *   Overview
            *   checkAutopilotCompatibility
            *   completeIpRotation
            *   create
            *   delete
            *   fetchClusterUpgradeInfo
            *   get
            *   getJwks
            *   list
            *   setAddons
            *   setLegacyAbac
            *   setLocations
            *   setLogging
            *   setMaintenancePolicy
            *   setMasterAuth
            *   setMonitoring
            *   setNetworkPolicy
            *   setResourceLabels
            *   startIpRotation
            *   update
            *   updateMaster
            
        *   projects.locations.clusters.nodePools
            
            *   Overview
            *   completeUpgrade
            *   create
            *   delete
            *   fetchNodePoolUpgradeInfo
            *   get
            *   list
            *   rollback
            *   setAutoscaling
            *   setManagement
            *   setSize
            *   update
            
        *   projects.locations.operations
            
            *   Overview
            *   cancel
            *   get
            *   list
            
        *   projects.zones
            
            *   Overview
            *   getServerconfig
            
        *   projects.zones.clusters
            
            *   Overview
            *   addons
            *   completeIpRotation
            *   create
            *   delete
            *   fetchClusterUpgradeInfo
            *   get
            *   legacyAbac
            *   list
            *   locations
            *   logging
            *   master
            *   monitoring
            *   resourceLabels
            *   setMaintenancePolicy
            *   setMasterAuth
            *   setNetworkPolicy
            *   startIpRotation
            *   update
            
        *   projects.zones.clusters.nodePools
            
            *   Overview
            *   autoscaling
            *   create
            *   delete
            *   fetchNodePoolUpgradeInfo
            *   get
            *   list
            *   rollback
            *   setManagement
            *   setSize
            *   update
            
        *   projects.zones.operations
            
            *   Overview
            *   cancel
            *   get
            *   list
            
        *   Types
            
        *   Action
        *   ClusterUpdate
        *   ClusterUpgradeInfo
        *   ConfidentialNodes
        *   ContainerdConfig
        *   DisruptionEvent
        *   DisruptionType
        *   EventType
        *   GcfsConfig
        *   GetOpenIDConfigRequest
        *   GetOpenIDConfigResponse
        *   IssueNodeCertificateRequest
        *   IssueNodeCertificateResponse
        *   LinuxNodeConfig
        *   ListClustersResponse
        *   ListNodePoolsResponse
        *   ListOperationsResponse
        *   MaxPodsConstraint
        *   NetworkTierConfig
        *   NodeConfig
        *   NodeKubeletConfig
        *   NodeLabels
        *   NodeManagement
        *   NodePoolLoggingConfig
        *   NodePoolUpgradeInfo
        *   NodeTaints
        *   PodCIDROverprovisionConfig
        *   ResourceLabels
        *   ResourceManagerTags
        *   SecurityBulletinEvent
        *   ServerConfig
        *   ShieldedInstanceConfig
        *   State
        *   StatusCondition
        *   UpgradeAvailableEvent
        *   UpgradeDetails
        *   UpgradeEvent
        *   UpgradeInfoEvent
        *   UpgradeResourceType
        *   UpgradeSettings
        
    *   v1beta1 API
        
        *   REST Resources
            
        *   projects.aggregated.usableSubnetworks
            
            *   Overview
            *   list
            
        *   projects.locations
            
            *   Overview
            *   getServerConfig
            *   list
            
        *   projects.locations.clusters
            
            *   Overview
            *   checkAutopilotCompatibility
            *   completeControlPlaneUpgrade
            *   completeIpRotation
            *   create
            *   delete
            *   fetchClusterUpgradeInfo
            *   get
            *   getJwks
            *   list
            *   setAddons
            *   setLegacyAbac
            *   setLocations
            *   setLogging
            *   setMaintenancePolicy
            *   setMasterAuth
            *   setMonitoring
            *   setNetworkPolicy
            *   setResourceLabels
            *   startIpRotation
            *   update
            *   updateMaster
            
        *   projects.locations.clusters.nodePools
            
            *   Overview
            *   completeUpgrade
            *   create
            *   delete
            *   fetchNodePoolUpgradeInfo
            *   get
            *   list
            *   rollback
            *   setAutoscaling
            *   setManagement
            *   setSize
            *   update
            
        *   projects.locations.operations
            
            *   Overview
            *   cancel
            *   get
            *   list
            
        *   projects.zones
            
            *   Overview
            *   getServerconfig
            
        *   projects.zones.clusters
            
            *   Overview
            *   addons
            *   completeControlPlaneUpgrade
            *   completeIpRotation
            *   create
            *   delete
            *   fetchClusterUpgradeInfo
            *   get
            *   legacyAbac
            *   list
            *   locations
            *   logging
            *   master
            *   monitoring
            *   resourceLabels
            *   setMaintenancePolicy
            *   setMasterAuth
            *   setNetworkPolicy
            *   startIpRotation
            *   update
            
        *   projects.zones.clusters.nodePools
            
            *   Overview
            *   autoscaling
            *   create
            *   delete
            *   fetchNodePoolUpgradeInfo
            *   get
            *   list
            *   rollback
            *   setManagement
            *   setSize
            *   update
            
        *   projects.zones.operations
            
            *   Overview
            *   cancel
            *   get
            *   list
            
        *   Types
            
        *   Action
        *   ClusterUpdate
        *   ClusterUpgradeInfo
        *   ConfidentialNodes
        *   ContainerdConfig
        *   DisruptionEvent
        *   DisruptionType
        *   EventType
        *   GcfsConfig
        *   GetOpenIDConfigRequest
        *   GetOpenIDConfigResponse
        *   HostMaintenancePolicy
        *   LinuxNodeConfig
        *   ListClustersResponse
        *   ListNodePoolsResponse
        *   ListOperationsResponse
        *   MaxPodsConstraint
        *   NetworkTierConfig
        *   NodeConfig
        *   NodeKubeletConfig
        *   NodeLabels
        *   NodeManagement
        *   NodePoolLoggingConfig
        *   NodePoolUpgradeInfo
        *   NodeTaints
        *   PodCIDROverprovisionConfig
        *   ResourceLabels
        *   ResourceManagerTags
        *   SecurityBulletinEvent
        *   ServerConfig
        *   ShieldedInstanceConfig
        *   State
        *   StatusCondition
        *   UpgradeAvailableEvent
        *   UpgradeDetails
        *   UpgradeEvent
        *   UpgradeInfoEvent
        *   UpgradeResourceType
        *   UpgradeSettings
        
    *   Shared types
        
        *   Types
            
        *   Code
        *   Date
        *   Status
        *   TimeOfDay
        
    
*   GKE MCP reference
    
    *   Overview
    *   Tools
        
        *   list_k8s_api_resources
        *   check_k8s_auth
        *   describe_k8s_resource
        *   list_k8s_events
        *   get_k8s_resource
        *   get_k8s_cluster_info
        *   get_k8s_version
        *   get_k8s_rollout_status
        *   list_clusters
        *   create_cluster
        *   delete_cluster
        *   update_cluster
        *   get_cluster
        *   list_operations
        *   get_operation
        *   cancel_operation
        *   create_node_pool
        *   list_node_pools
        *   get_node_pool
        *   update_node_pool
        *   delete_node_pool
        *   get_k8s_logs
        *   apply_k8s_manifest
        *   delete_k8s_resource
        *   patch_k8s_resource
        
    
*   gcloud CLI reference
*   Terraform reference
*   Custom resource definitions
    
    *   AllowlistSynchronizer
    *   Agent Sandbox
    *   ComputeClass
    *   GCPDataSource
    *   HighAvailabilityApplication
    *   PodSnapshot
    *   WorkloadAllowlist
    *   CapacityBuffer
    
*   Client libraries
*   Kubernetes documentation (external)
*   Cloud Storage FUSE CSI driver
    
    *   Volume attributes
    
*   Managed Lustre CSI driver
    
    *   Managed Lustre CSI driver reference
    

*   AI and ML
*   Application development
*   Application hosting
*   Compute
*   Data analytics and pipelines
*   Databases
*   Distributed, hybrid, and multicloud
*   Industry solutions
*   Migration
*   Networking
*   Observability and monitoring
*   Security
*   Storage

*   Access and resources management
*   Costs and usage management
*   Infrastructure as code
*   SDK, languages, frameworks, and tools

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   Reference

Send feedback

# Method: projects.zones.clusters.setMaintenancePolicy Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
    *   JSON representation
*   Response body
*   Authorization scopes
*   Try it!

Sets the maintenance policy for a cluster.

### HTTP request

`POST https://container.googleapis.com/v1/projects/{projectId}/zones/{zone}/clusters/{clusterId}:setMaintenancePolicy`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`projectId`

`string`

Required. The Google Developers Console project ID or project number.

`zone`

`string`

Required. The name of the Google Compute Engine zone in which the cluster resides.

`clusterId`

`string`

Required. The name of the cluster to update.

### Request body

The request body contains data with the following structure:

JSON representation

{
  "maintenancePolicy": {
    object (`MaintenancePolicy`)
  },
  "name": string
}

 

Fields

`maintenancePolicy`

``object (`MaintenancePolicy`)``

Required. The maintenance policy to be set for the cluster. An empty field clears the existing maintenance policy.

`name`

`string`

The name (project, location, cluster name) of the cluster to set maintenance policy. Specified in the format `projects/*/locations/*/clusters/*`.

Authorization requires the following IAM permission on the specified resource `name`:

*   `container.clusters.update`

### Response body

If successful, the response body contains an instance of `Operation`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/cloud-platform`
*   `https://www.googleapis.com/auth/container`

For more information, see the Authentication Overview.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-04-15 UTC.

*   ### Products and pricing
    
    *   See all products
    *   Google Cloud pricing
    *   Google Cloud Marketplace
    *   Contact sales
*   ### Support
    
    *   Community forums
    *   Support
    *   Release Notes
    *   System status
*   ### Resources
    
    *   GitHub
    *   Getting Started with Google Cloud
    *   Code samples
    *   Cloud Architecture Center
    *   Training and Certification
*   ### Engage
    
    *   Blog
    *   Events
    *   X (Twitter)
    *   Google Cloud on YouTube
    *   Google Cloud Tech on YouTube

*   About Google
*   Privacy
*   Site terms
*   Google Cloud terms
*   Manage cookies
*   Our third decade of climate action: join us
*   Sign up for the Google Cloud newsletter Subscribe

*   English
*   Deutsch
*   Español – América Latina
*   Français
*   Português – Brasil
*   中文 – 简体
*   日本語
*   한국어