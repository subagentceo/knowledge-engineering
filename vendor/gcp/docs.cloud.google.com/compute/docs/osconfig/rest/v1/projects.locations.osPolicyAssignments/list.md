# Method: projects.locations.osPolicyAssignments.list

    
    
      
    

    
      
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

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/compute-engine-color.svg)

*   Compute Engine

Start free

Overview Guides APIs & Reference Samples Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Overview
    *   Guides
    *   APIs & Reference
    *   Samples
    *   Resources
*   Cross-product tools
    *   More
*   Console

*   Discover
    
*   All APIs and references
*   Authenticate to Compute Engine
*   Provision Compute Engine resources with Terraform
*   gcloud compute
    
    *   Overview
    *   Common commands
    *   Usage tips
    *   Reference
    
*   Google Cloud console
*   Compute Engine API
    
*   Prerequisites
*   API quota metrics reference
*   How-to guides
    
    *   Overview
    *   Creating API requests and handling responses
    *   Migrate API quota to regional metrics
    *   Use simplified API quota metrics to monitor API usage
    *   Standard query parameters
    *   Improving application performance
    *   Batch requests
    
*   Best practices
*   Client libraries
    
    *   Overview
    *   Using client libraries
    
*   REST API
    
    *   v1
        
        *   Overview
        *   errors
        *   REST Resources
            
        *   acceleratorTypes
            
            *   Overview
            *   aggregatedList
            *   get
            *   list
            
        *   addresses
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   move
            *   setLabels
            *   testIamPermissions
            
        *   advice
            
            *   Overview
            *   calendarMode
            
        *   autoscalers
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   backendBuckets
            
            *   Overview
            *   addSignedUrlKey
            *   aggregatedList
            *   delete
            *   deleteSignedUrlKey
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   listUsable
            *   patch
            *   setEdgeSecurityPolicy
            *   setIamPolicy
            *   testIamPermissions
            *   update
            
        *   backendServices
            
            *   Overview
            *   addSignedUrlKey
            *   aggregatedList
            *   delete
            *   deleteSignedUrlKey
            *   get
            *   getEffectiveSecurityPolicies
            *   getHealth
            *   getIamPolicy
            *   insert
            *   list
            *   listUsable
            *   patch
            *   setEdgeSecurityPolicy
            *   setIamPolicy
            *   setSecurityPolicy
            *   testIamPermissions
            *   update
            
        *   crossSiteNetworks
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            
        *   diskTypes
            
            *   Overview
            *   aggregatedList
            *   get
            *   list
            
        *   disks
            
            *   Overview
            *   addResourcePolicies
            *   aggregatedList
            *   bulkInsert
            *   bulkSetLabels
            *   createSnapshot
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   removeResourcePolicies
            *   resize
            *   setIamPolicy
            *   setLabels
            *   startAsyncReplication
            *   stopAsyncReplication
            *   stopGroupAsyncReplication
            *   testIamPermissions
            *   update
            *   updateKmsKey
            
        *   externalVpnGateways
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   setLabels
            *   testIamPermissions
            
        *   firewallPolicies
            
            *   Overview
            *   addAssociation
            *   addRule
            *   cloneRules
            *   delete
            *   get
            *   getAssociation
            *   getIamPolicy
            *   getRule
            *   insert
            *   list
            *   listAssociations
            *   move
            *   patch
            *   patchRule
            *   removeAssociation
            *   removeRule
            *   setIamPolicy
            *   testIamPermissions
            
        *   firewalls
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   forwardingRules
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   setLabels
            *   setTarget
            
        *   futureReservations
            
            *   Overview
            *   aggregatedList
            *   cancel
            *   delete
            *   get
            *   insert
            *   list
            *   update
            
        *   globalAddresses
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   move
            *   setLabels
            *   testIamPermissions
            
        *   globalForwardingRules
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   setLabels
            *   setTarget
            
        *   globalNetworkEndpointGroups
            
            *   Overview
            *   attachNetworkEndpoints
            *   delete
            *   detachNetworkEndpoints
            *   get
            *   insert
            *   list
            *   listNetworkEndpoints
            
        *   globalOperations
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   list
            *   wait
            
        *   globalOrganizationOperations
            
            *   Overview
            *   delete
            *   get
            *   list
            
        *   globalPublicDelegatedPrefixes
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            
        *   globalVmExtensionPolicies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   update
            
        *   healthChecks
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   httpHealthChecks
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   httpsHealthChecks
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   imageFamilyViews
            
            *   Overview
            *   get
            
        *   images
            
            *   Overview
            *   delete
            *   deprecate
            *   get
            *   getFromFamily
            *   getIamPolicy
            *   insert
            *   list
            *   patch
            *   setIamPolicy
            *   setLabels
            *   testIamPermissions
            
        *   instanceGroupManagerResizeRequests
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   insert
            *   list
            
        *   instanceGroupManagers
            
            *   Overview
            *   abandonInstances
            *   aggregatedList
            *   applyUpdatesToInstances
            *   createInstances
            *   delete
            *   deleteInstances
            *   deletePerInstanceConfigs
            *   get
            *   insert
            *   list
            *   listErrors
            *   listManagedInstances
            *   listPerInstanceConfigs
            *   patch
            *   patchPerInstanceConfigs
            *   recreateInstances
            *   resize
            *   resumeInstances
            *   setInstanceTemplate
            *   setTargetPools
            *   startInstances
            *   stopInstances
            *   suspendInstances
            *   updatePerInstanceConfigs
            
        *   instanceGroups
            
            *   Overview
            *   addInstances
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   listInstances
            *   removeInstances
            *   setNamedPorts
            *   testIamPermissions
            
        *   instanceSettings
            
            *   Overview
            *   get
            *   patch
            
        *   instanceTemplates
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   testIamPermissions
            
        *   instances
            
            *   Overview
            *   addAccessConfig
            *   addNetworkInterface
            *   addResourcePolicies
            *   aggregatedList
            *   attachDisk
            *   bulkInsert
            *   delete
            *   deleteAccessConfig
            *   deleteNetworkInterface
            *   detachDisk
            *   get
            *   getEffectiveFirewalls
            *   getGuestAttributes
            *   getIamPolicy
            *   getScreenshot
            *   getSerialPortOutput
            *   getShieldedInstanceIdentity
            *   insert
            *   list
            *   listReferrers
            *   performMaintenance
            *   removeResourcePolicies
            *   reportHostAsFaulty
            *   reset
            *   resume
            *   sendDiagnosticInterrupt
            *   setDeletionProtection
            *   setDiskAutoDelete
            *   setIamPolicy
            *   setLabels
            *   setMachineResources
            *   setMachineType
            *   setMetadata
            *   setMinCpuPlatform
            *   setName
            *   setScheduling
            *   setSecurityPolicy
            *   setServiceAccount
            *   setShieldedInstanceIntegrityPolicy
            *   setTags
            *   simulateMaintenanceEvent
            *   start
            *   startWithEncryptionKey
            *   stop
            *   suspend
            *   testIamPermissions
            *   update
            *   updateAccessConfig
            *   updateDisplayDevice
            *   updateNetworkInterface
            *   updateShieldedInstanceConfig
            
        *   instantSnapshotGroups
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   testIamPermissions
            
        *   instantSnapshots
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   setLabels
            *   testIamPermissions
            
        *   interconnectAttachmentGroups
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   getOperationalStatus
            *   insert
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   interconnectAttachments
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   setLabels
            
        *   interconnectGroups
            
            *   Overview
            *   createMembers
            *   delete
            *   get
            *   getIamPolicy
            *   getOperationalStatus
            *   insert
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   interconnectLocations
            
            *   Overview
            *   get
            *   list
            
        *   interconnectRemoteLocations
            
            *   Overview
            *   get
            *   list
            
        *   interconnects
            
            *   Overview
            *   delete
            *   get
            *   getDiagnostics
            *   getMacsecConfig
            *   insert
            *   list
            *   patch
            *   setLabels
            
        *   licenseCodes
            
            *   Overview
            *   get
            *   getIamPolicy
            *   setIamPolicy
            *   testIamPermissions
            
        *   licenses
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   testIamPermissions
            *   update
            
        *   machineImages
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   setLabels
            *   testIamPermissions
            
        *   machineTypes
            
            *   Overview
            *   aggregatedList
            *   get
            *   list
            
        *   networkAttachments
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   networkEdgeSecurityServices
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   patch
            
        *   networkEndpointGroups
            
            *   Overview
            *   aggregatedList
            *   attachNetworkEndpoints
            *   delete
            *   detachNetworkEndpoints
            *   get
            *   insert
            *   list
            *   listNetworkEndpoints
            *   testIamPermissions
            
        *   networkFirewallPolicies
            
            *   Overview
            *   addAssociation
            *   addPacketMirroringRule
            *   addRule
            *   aggregatedList
            *   cloneRules
            *   delete
            *   get
            *   getAssociation
            *   getIamPolicy
            *   getPacketMirroringRule
            *   getRule
            *   insert
            *   list
            *   patch
            *   patchPacketMirroringRule
            *   patchRule
            *   removeAssociation
            *   removePacketMirroringRule
            *   removeRule
            *   setIamPolicy
            *   testIamPermissions
            
        *   networkProfiles
            
            *   Overview
            *   get
            *   list
            
        *   networks
            
            *   Overview
            *   addPeering
            *   cancelRequestRemovePeering
            *   delete
            *   get
            *   getEffectiveFirewalls
            *   insert
            *   list
            *   listPeeringRoutes
            *   patch
            *   removePeering
            *   requestRemovePeering
            *   switchToCustomMode
            *   updatePeering
            
        *   nodeGroups
            
            *   Overview
            *   addNodes
            *   aggregatedList
            *   delete
            *   deleteNodes
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   listNodes
            *   patch
            *   performMaintenance
            *   setIamPolicy
            *   setNodeTemplate
            *   simulateMaintenanceEvent
            *   testIamPermissions
            
        *   nodeTemplates
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   testIamPermissions
            
        *   nodeTypes
            
            *   Overview
            *   aggregatedList
            *   get
            *   list
            
        *   organizationSecurityPolicies
            
            *   Overview
            *   addAssociation
            *   addRule
            *   copyRules
            *   delete
            *   get
            *   getAssociation
            *   getRule
            *   insert
            *   list
            *   listAssociations
            *   listPreconfiguredExpressionSets
            *   move
            *   patch
            *   patchRule
            *   removeAssociation
            *   removeRule
            
        *   packetMirrorings
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            
        *   previewFeatures
            
            *   Overview
            *   get
            *   list
            *   update
            
        *   projects
            
            *   Overview
            *   disableXpnHost
            *   disableXpnResource
            *   enableXpnHost
            *   enableXpnResource
            *   get
            *   getXpnHost
            *   getXpnResources
            *   listXpnHosts
            *   moveDisk
            *   moveInstance
            *   setCloudArmorTier
            *   setCommonInstanceMetadata
            *   setDefaultNetworkTier
            *   setUsageExportBucket
            
        *   publicAdvertisedPrefixes
            
            *   Overview
            *   announce
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   withdraw
            
        *   publicDelegatedPrefixes
            
            *   Overview
            *   aggregatedList
            *   announce
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   withdraw
            
        *   regionAutoscalers
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   regionBackendBuckets
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   listUsable
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   regionBackendServices
            
            *   Overview
            *   delete
            *   get
            *   getHealth
            *   getIamPolicy
            *   insert
            *   list
            *   listUsable
            *   patch
            *   setIamPolicy
            *   setSecurityPolicy
            *   testIamPermissions
            *   update
            
        *   regionCommitments
            
            *   Overview
            *   aggregatedList
            *   get
            *   insert
            *   list
            *   update
            
        *   regionCompositeHealthChecks
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getHealth
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            
        *   regionDiskTypes
            
            *   Overview
            *   get
            *   list
            
        *   regionDisks
            
            *   Overview
            *   addResourcePolicies
            *   bulkInsert
            *   createSnapshot
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   removeResourcePolicies
            *   resize
            *   setIamPolicy
            *   setLabels
            *   startAsyncReplication
            *   stopAsyncReplication
            *   stopGroupAsyncReplication
            *   testIamPermissions
            *   update
            *   updateKmsKey
            
        *   regionHealthAggregationPolicies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            
        *   regionHealthCheckServices
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            
        *   regionHealthChecks
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   regionHealthSources
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getHealth
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            
        *   regionInstanceGroupManagerResizeRequests
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   insert
            *   list
            
        *   regionInstanceGroupManagers
            
            *   Overview
            *   abandonInstances
            *   applyUpdatesToInstances
            *   createInstances
            *   delete
            *   deleteInstances
            *   deletePerInstanceConfigs
            *   get
            *   insert
            *   list
            *   listErrors
            *   listManagedInstances
            *   listPerInstanceConfigs
            *   patch
            *   patchPerInstanceConfigs
            *   recreateInstances
            *   resize
            *   resumeInstances
            *   setInstanceTemplate
            *   setTargetPools
            *   startInstances
            *   stopInstances
            *   suspendInstances
            *   updatePerInstanceConfigs
            
        *   regionInstanceGroups
            
            *   Overview
            *   get
            *   list
            *   listInstances
            *   setNamedPorts
            *   testIamPermissions
            
        *   regionInstanceTemplates
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            
        *   regionInstances
            
            *   Overview
            *   bulkInsert
            
        *   regionInstantSnapshotGroups
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   testIamPermissions
            
        *   regionInstantSnapshots
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   setLabels
            *   testIamPermissions
            
        *   regionNetworkEndpointGroups
            
            *   Overview
            *   attachNetworkEndpoints
            *   delete
            *   detachNetworkEndpoints
            *   get
            *   insert
            *   list
            *   listNetworkEndpoints
            
        *   regionNetworkFirewallPolicies
            
            *   Overview
            *   addAssociation
            *   addRule
            *   cloneRules
            *   delete
            *   get
            *   getAssociation
            *   getEffectiveFirewalls
            *   getIamPolicy
            *   getRule
            *   insert
            *   list
            *   patch
            *   patchRule
            *   removeAssociation
            *   removeRule
            *   setIamPolicy
            *   testIamPermissions
            
        *   regionNotificationEndpoints
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   testIamPermissions
            
        *   regionOperations
            
            *   Overview
            *   delete
            *   get
            *   list
            *   wait
            
        *   regionSecurityPolicies
            
            *   Overview
            *   addRule
            *   delete
            *   get
            *   getRule
            *   insert
            *   list
            *   patch
            *   patchRule
            *   removeRule
            *   setLabels
            
        *   regionSnapshotSettings
            
            *   Overview
            *   get
            *   patch
            
        *   regionSnapshots
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   setLabels
            *   testIamPermissions
            *   updateKmsKey
            
        *   regionSslCertificates
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            
        *   regionSslPolicies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   listAvailableFeatures
            *   patch
            
        *   regionTargetHttpProxies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   setUrlMap
            
        *   regionTargetHttpsProxies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   setSslCertificates
            *   setUrlMap
            
        *   regionTargetTcpProxies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            
        *   regionUrlMaps
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   update
            *   validate
            
        *   regionZones
            
            *   Overview
            *   list
            
        *   regions
            
            *   Overview
            *   get
            *   list
            
        *   reservationBlocks
            
            *   Overview
            *   get
            *   getIamPolicy
            *   list
            *   performMaintenance
            *   setIamPolicy
            *   testIamPermissions
            
        *   reservationSlots
            
            *   Overview
            *   get
            *   getVersion
            *   list
            *   update
            
        *   reservationSubBlocks
            
            *   Overview
            *   get
            *   getIamPolicy
            *   getVersion
            *   list
            *   performMaintenance
            *   reportFaulty
            *   setIamPolicy
            *   testIamPermissions
            
        *   reservations
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   performMaintenance
            *   resize
            *   setIamPolicy
            *   testIamPermissions
            *   update
            
        *   resourcePolicies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   rolloutPlans
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            
        *   rollouts
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   routers
            
            *   Overview
            *   aggregatedList
            *   delete
            *   deleteRoutePolicy
            *   get
            *   getNatIpInfo
            *   getNatMappingInfo
            *   getRoutePolicy
            *   getRouterStatus
            *   insert
            *   list
            *   listBgpRoutes
            *   listRoutePolicies
            *   patch
            *   patchRoutePolicy
            *   preview
            *   update
            *   updateRoutePolicy
            
        *   routes
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   testIamPermissions
            
        *   securityPolicies
            
            *   Overview
            *   addRule
            *   aggregatedList
            *   delete
            *   get
            *   getRule
            *   insert
            *   list
            *   listPreconfiguredExpressionSets
            *   patch
            *   patchRule
            *   removeRule
            *   setLabels
            
        *   serviceAttachments
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   snapshotSettings
            
            *   Overview
            *   get
            *   patch
            
        *   snapshots
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   setLabels
            *   testIamPermissions
            *   updateKmsKey
            
        *   sslCertificates
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            
        *   sslPolicies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   listAvailableFeatures
            *   patch
            
        *   storagePoolTypes
            
            *   Overview
            *   aggregatedList
            *   get
            *   list
            
        *   storagePools
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   listDisks
            *   setIamPolicy
            *   testIamPermissions
            *   update
            
        *   subnetworks
            
            *   Overview
            *   aggregatedList
            *   delete
            *   expandIpCidrRange
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   listUsable
            *   patch
            *   setIamPolicy
            *   setPrivateIpGoogleAccess
            *   testIamPermissions
            
        *   targetGrpcProxies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            
        *   targetHttpProxies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   setUrlMap
            
        *   targetHttpsProxies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   setCertificateMap
            *   setQuicOverride
            *   setSslCertificates
            *   setSslPolicy
            *   setUrlMap
            
        *   targetInstances
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   setSecurityPolicy
            *   testIamPermissions
            
        *   targetPools
            
            *   Overview
            *   addHealthCheck
            *   addInstance
            *   aggregatedList
            *   delete
            *   get
            *   getHealth
            *   insert
            *   list
            *   removeHealthCheck
            *   removeInstance
            *   setBackup
            *   setSecurityPolicy
            *   testIamPermissions
            
        *   targetSslProxies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   setBackendService
            *   setCertificateMap
            *   setProxyHeader
            *   setSslCertificates
            *   setSslPolicy
            *   testIamPermissions
            
        *   targetTcpProxies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   setBackendService
            *   setProxyHeader
            *   testIamPermissions
            
        *   targetVpnGateways
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   setLabels
            
        *   urlMaps
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   invalidateCache
            *   list
            *   patch
            *   testIamPermissions
            *   update
            *   validate
            
        *   vpnGateways
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getStatus
            *   insert
            *   list
            *   setLabels
            *   testIamPermissions
            
        *   vpnTunnels
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   setLabels
            
        *   wireGroups
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            
        *   zoneOperations
            
            *   Overview
            *   delete
            *   get
            *   list
            *   wait
            
        *   zoneVmExtensionPolicies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   update
            
        *   zones
            
            *   Overview
            *   get
            *   list
            
        
    *   Beta
        
        *   Overview
        *   errors
        *   REST Resources
            
        *   acceleratorTypes
            
            *   Overview
            *   aggregatedList
            *   get
            *   list
            
        *   addresses
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   move
            *   setLabels
            *   testIamPermissions
            
        *   advice
            
            *   Overview
            *   calendarMode
            *   capacity
            *   capacityHistory
            
        *   autoscalers
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   backendBuckets
            
            *   Overview
            *   addSignedUrlKey
            *   aggregatedList
            *   delete
            *   deleteSignedUrlKey
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   listUsable
            *   patch
            *   setEdgeSecurityPolicy
            *   setIamPolicy
            *   testIamPermissions
            *   update
            
        *   backendServices
            
            *   Overview
            *   addSignedUrlKey
            *   aggregatedList
            *   delete
            *   deleteSignedUrlKey
            *   get
            *   getEffectiveSecurityPolicies
            *   getHealth
            *   getIamPolicy
            *   insert
            *   list
            *   listUsable
            *   patch
            *   setEdgeSecurityPolicy
            *   setIamPolicy
            *   setSecurityPolicy
            *   testIamPermissions
            *   update
            
        *   crossSiteNetworks
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            
        *   diskSettings
            
            *   Overview
            *   get
            *   patch
            
        *   diskTypes
            
            *   Overview
            *   aggregatedList
            *   get
            *   list
            
        *   disks
            
            *   Overview
            *   addResourcePolicies
            *   aggregatedList
            *   bulkInsert
            *   bulkSetLabels
            *   createSnapshot
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   removeResourcePolicies
            *   resize
            *   setIamPolicy
            *   setLabels
            *   startAsyncReplication
            *   stopAsyncReplication
            *   stopGroupAsyncReplication
            *   testIamPermissions
            *   update
            *   updateKmsKey
            
        *   externalVpnGateways
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   setLabels
            *   testIamPermissions
            
        *   firewallPolicies
            
            *   Overview
            *   addAssociation
            *   addPacketMirroringRule
            *   addRule
            *   cloneRules
            *   delete
            *   get
            *   getAssociation
            *   getIamPolicy
            *   getPacketMirroringRule
            *   getRule
            *   insert
            *   list
            *   listAssociations
            *   move
            *   patch
            *   patchPacketMirroringRule
            *   patchRule
            *   removeAssociation
            *   removePacketMirroringRule
            *   removeRule
            *   setIamPolicy
            *   testIamPermissions
            
        *   firewalls
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   forwardingRules
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   setLabels
            *   setTarget
            *   testIamPermissions
            
        *   futureReservations
            
            *   Overview
            *   aggregatedList
            *   cancel
            *   delete
            *   get
            *   insert
            *   list
            *   update
            
        *   globalAddresses
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   move
            *   setLabels
            *   testIamPermissions
            
        *   globalForwardingRules
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   setLabels
            *   setTarget
            *   testIamPermissions
            
        *   globalNetworkEndpointGroups
            
            *   Overview
            *   attachNetworkEndpoints
            *   delete
            *   detachNetworkEndpoints
            *   get
            *   insert
            *   list
            *   listNetworkEndpoints
            
        *   globalOperations
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   list
            *   wait
            
        *   globalOrganizationOperations
            
            *   Overview
            *   delete
            *   get
            *   list
            
        *   globalPublicDelegatedPrefixes
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            
        *   globalVmExtensionPolicies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   update
            
        *   healthChecks
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   httpHealthChecks
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   httpsHealthChecks
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   imageFamilyViews
            
            *   Overview
            *   get
            
        *   images
            
            *   Overview
            *   delete
            *   deprecate
            *   get
            *   getFromFamily
            *   getIamPolicy
            *   insert
            *   list
            *   patch
            *   setIamPolicy
            *   setLabels
            *   testIamPermissions
            
        *   instanceGroupManagerResizeRequests
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   insert
            *   list
            
        *   instanceGroupManagers
            
            *   Overview
            *   abandonInstances
            *   aggregatedList
            *   applyUpdatesToInstances
            *   configureAcceleratorTopologies
            *   createInstances
            *   delete
            *   deleteInstances
            *   deletePerInstanceConfigs
            *   get
            *   getAvailableAcceleratorTopologies
            *   insert
            *   list
            *   listErrors
            *   listManagedInstances
            *   listPerInstanceConfigs
            *   patch
            *   patchPerInstanceConfigs
            *   recreateInstances
            *   resize
            *   resizeAdvanced
            *   resumeInstances
            *   setAutoHealingPolicies
            *   setInstanceTemplate
            *   setTargetPools
            *   startInstances
            *   stopInstances
            *   suspendInstances
            *   testIamPermissions
            *   update
            *   updatePerInstanceConfigs
            
        *   instanceGroups
            
            *   Overview
            *   addInstances
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   listInstances
            *   removeInstances
            *   setNamedPorts
            *   testIamPermissions
            
        *   instanceSettings
            
            *   Overview
            *   get
            *   patch
            
        *   instanceTemplates
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   testIamPermissions
            
        *   instances
            
            *   Overview
            *   addAccessConfig
            *   addNetworkInterface
            *   addResourcePolicies
            *   aggregatedList
            *   attachDisk
            *   bulkInsert
            *   delete
            *   deleteAccessConfig
            *   deleteNetworkInterface
            *   detachDisk
            *   get
            *   getEffectiveFirewalls
            *   getGuestAttributes
            *   getIamPolicy
            *   getPartnerMetadata
            *   getScreenshot
            *   getSerialPortOutput
            *   getShieldedInstanceIdentity
            *   getShieldedVmIdentity
            *   insert
            *   list
            *   listReferrers
            *   patchPartnerMetadata
            *   performMaintenance
            *   removeResourcePolicies
            *   reportHostAsFaulty
            *   reset
            *   resume
            *   sendDiagnosticInterrupt
            *   setDeletionProtection
            *   setDiskAutoDelete
            *   setIamPolicy
            *   setLabels
            *   setMachineResources
            *   setMachineType
            *   setMetadata
            *   setMinCpuPlatform
            *   setName
            *   setScheduling
            *   setSecurityPolicy
            *   setServiceAccount
            *   setShieldedInstanceIntegrityPolicy
            *   setShieldedVmIntegrityPolicy
            *   setTags
            *   simulateMaintenanceEvent
            *   start
            *   startWithEncryptionKey
            *   stop
            *   suspend
            *   testIamPermissions
            *   update
            *   updateAccessConfig
            *   updateDisplayDevice
            *   updateNetworkInterface
            *   updateShieldedInstanceConfig
            *   updateShieldedVmConfig
            
        *   instantSnapshotGroups
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   testIamPermissions
            
        *   instantSnapshots
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   setLabels
            *   testIamPermissions
            
        *   interconnectAttachmentGroups
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   getOperationalStatus
            *   insert
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   interconnectAttachments
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   setLabels
            *   testIamPermissions
            
        *   interconnectGroups
            
            *   Overview
            *   createMembers
            *   delete
            *   get
            *   getIamPolicy
            *   getOperationalStatus
            *   insert
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   interconnectLocations
            
            *   Overview
            *   get
            *   list
            
        *   interconnectRemoteLocations
            
            *   Overview
            *   get
            *   list
            
        *   interconnects
            
            *   Overview
            *   delete
            *   get
            *   getDiagnostics
            *   getMacsecConfig
            *   insert
            *   list
            *   patch
            *   setLabels
            *   testIamPermissions
            
        *   licenseCodes
            
            *   Overview
            *   get
            *   getIamPolicy
            *   setIamPolicy
            *   testIamPermissions
            
        *   licenses
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   testIamPermissions
            *   update
            
        *   machineImages
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   setLabels
            *   testIamPermissions
            
        *   machineTypes
            
            *   Overview
            *   aggregatedList
            *   get
            *   list
            
        *   networkAttachments
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   networkEdgeSecurityServices
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   patch
            
        *   networkEndpointGroups
            
            *   Overview
            *   aggregatedList
            *   attachNetworkEndpoints
            *   delete
            *   detachNetworkEndpoints
            *   get
            *   insert
            *   list
            *   listNetworkEndpoints
            *   testIamPermissions
            
        *   networkFirewallPolicies
            
            *   Overview
            *   addAssociation
            *   addPacketMirroringRule
            *   addRule
            *   aggregatedList
            *   cloneRules
            *   delete
            *   get
            *   getAssociation
            *   getIamPolicy
            *   getPacketMirroringRule
            *   getRule
            *   insert
            *   list
            *   patch
            *   patchPacketMirroringRule
            *   patchRule
            *   removeAssociation
            *   removePacketMirroringRule
            *   removeRule
            *   setIamPolicy
            *   testIamPermissions
            
        *   networkProfiles
            
            *   Overview
            *   get
            *   list
            
        *   networks
            
            *   Overview
            *   addPeering
            *   cancelRequestRemovePeering
            *   delete
            *   get
            *   getEffectiveFirewalls
            *   insert
            *   list
            *   listPeeringRoutes
            *   patch
            *   removePeering
            *   requestRemovePeering
            *   switchToCustomMode
            *   testIamPermissions
            *   updatePeering
            
        *   nodeGroups
            
            *   Overview
            *   addNodes
            *   aggregatedList
            *   delete
            *   deleteNodes
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   listNodes
            *   patch
            *   performMaintenance
            *   setIamPolicy
            *   setNodeTemplate
            *   simulateMaintenanceEvent
            *   testIamPermissions
            
        *   nodeTemplates
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   testIamPermissions
            
        *   nodeTypes
            
            *   Overview
            *   aggregatedList
            *   get
            *   list
            
        *   organizationSecurityPolicies
            
            *   Overview
            *   addAssociation
            *   addRule
            *   copyRules
            *   delete
            *   get
            *   getAssociation
            *   getRule
            *   insert
            *   list
            *   listAssociations
            *   listPreconfiguredExpressionSets
            *   move
            *   patch
            *   patchRule
            *   removeAssociation
            *   removeRule
            
        *   packetMirrorings
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            
        *   previewFeatures
            
            *   Overview
            *   get
            *   list
            *   update
            
        *   projects
            
            *   Overview
            *   disableXpnHost
            *   disableXpnResource
            *   enableXpnHost
            *   enableXpnResource
            *   get
            *   getXpnHost
            *   getXpnResources
            *   listXpnHosts
            *   moveDisk
            *   moveInstance
            *   setCloudArmorTier
            *   setCommonInstanceMetadata
            *   setDefaultNetworkTier
            *   setManagedProtectionTier
            *   setUsageExportBucket
            
        *   publicAdvertisedPrefixes
            
            *   Overview
            *   announce
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   withdraw
            
        *   publicDelegatedPrefixes
            
            *   Overview
            *   aggregatedList
            *   announce
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   withdraw
            
        *   regionAutoscalers
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   regionBackendBuckets
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   listUsable
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   regionBackendServices
            
            *   Overview
            *   delete
            *   get
            *   getHealth
            *   getIamPolicy
            *   insert
            *   list
            *   listUsable
            *   patch
            *   setIamPolicy
            *   setSecurityPolicy
            *   testIamPermissions
            *   update
            
        *   regionCommitments
            
            *   Overview
            *   aggregatedList
            *   get
            *   insert
            *   list
            *   testIamPermissions
            *   update
            *   updateReservations
            
        *   regionCompositeHealthChecks
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getHealth
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            
        *   regionDiskSettings
            
            *   Overview
            *   get
            *   patch
            
        *   regionDiskTypes
            
            *   Overview
            *   get
            *   list
            
        *   regionDisks
            
            *   Overview
            *   addResourcePolicies
            *   bulkInsert
            *   createSnapshot
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   removeResourcePolicies
            *   resize
            *   setIamPolicy
            *   setLabels
            *   startAsyncReplication
            *   stopAsyncReplication
            *   stopGroupAsyncReplication
            *   testIamPermissions
            *   update
            *   updateKmsKey
            
        *   regionHealthAggregationPolicies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            
        *   regionHealthCheckServices
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            
        *   regionHealthChecks
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            *   update
            
        *   regionHealthSources
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getHealth
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            
        *   regionInstanceGroupManagerResizeRequests
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   insert
            *   list
            
        *   regionInstanceGroupManagers
            
            *   Overview
            *   abandonInstances
            *   adoptInstances
            *   applyUpdatesToInstances
            *   createInstances
            *   delete
            *   deleteInstances
            *   deletePerInstanceConfigs
            *   get
            *   insert
            *   list
            *   listErrors
            *   listManagedInstances
            *   listPerInstanceConfigs
            *   patch
            *   patchPerInstanceConfigs
            *   recreateInstances
            *   resize
            *   resizeAdvanced
            *   resumeInstances
            *   setAutoHealingPolicies
            *   setInstanceTemplate
            *   setTargetPools
            *   startInstances
            *   stopInstances
            *   suspendInstances
            *   testIamPermissions
            *   update
            *   updatePerInstanceConfigs
            
        *   regionInstanceGroups
            
            *   Overview
            *   get
            *   list
            *   listInstances
            *   setNamedPorts
            *   testIamPermissions
            
        *   regionInstanceTemplates
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            
        *   regionInstances
            
            *   Overview
            *   bulkInsert
            
        *   regionInstantSnapshotGroups
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   testIamPermissions
            
        *   regionInstantSnapshots
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   setLabels
            *   testIamPermissions
            
        *   regionMultiMigMembers
            
            *   Overview
            *   get
            *   list
            
        *   regionMultiMigs
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            
        *   regionNetworkEndpointGroups
            
            *   Overview
            *   attachNetworkEndpoints
            *   delete
            *   detachNetworkEndpoints
            *   get
            *   insert
            *   list
            *   listNetworkEndpoints
            
        *   regionNetworkFirewallPolicies
            
            *   Overview
            *   addAssociation
            *   addRule
            *   cloneRules
            *   delete
            *   get
            *   getAssociation
            *   getEffectiveFirewalls
            *   getIamPolicy
            *   getRule
            *   insert
            *   list
            *   patch
            *   patchAssociation
            *   patchRule
            *   removeAssociation
            *   removeRule
            *   setIamPolicy
            *   testIamPermissions
            
        *   regionNetworkPolicies
            
            *   Overview
            *   addAssociation
            *   addTrafficClassificationRule
            *   aggregatedList
            *   delete
            *   get
            *   getAssociation
            *   getTrafficClassificationRule
            *   insert
            *   list
            *   patch
            *   patchTrafficClassificationRule
            *   removeAssociation
            *   removeTrafficClassificationRule
            
        *   regionNotificationEndpoints
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   testIamPermissions
            
        *   regionOperations
            
            *   Overview
            *   delete
            *   get
            *   list
            *   wait
            
        *   regionSecurityPolicies
            
            *   Overview
            *   addRule
            *   delete
            *   get
            *   getRule
            *   insert
            *   list
            *   patch
            *   patchRule
            *   removeRule
            *   setLabels
            
        *   regionSnapshotSettings
            
            *   Overview
            *   get
            *   patch
            
        *   regionSnapshots
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   setLabels
            *   testIamPermissions
            *   updateKmsKey
            
        *   regionSslCertificates
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   testIamPermissions
            
        *   regionSslPolicies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   listAvailableFeatures
            *   patch
            *   testIamPermissions
            
        *   regionTargetHttpProxies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   setUrlMap
            *   testIamPermissions
            
        *   regionTargetHttpsProxies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   setSslCertificates
            *   setUrlMap
            *   testIamPermissions
            
        *   regionTargetTcpProxies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   testIamPermissions
            
        *   regionUrlMaps
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   invalidateCache
            *   list
            *   patch
            *   testIamPermissions
            *   update
            *   validate
            
        *   regionZones
            
            *   Overview
            *   list
            
        *   regions
            
            *   Overview
            *   get
            *   list
            
        *   reservationBlocks
            
            *   Overview
            *   get
            *   getIamPolicy
            *   list
            *   performMaintenance
            *   setIamPolicy
            *   testIamPermissions
            
        *   reservationSlots
            
            *   Overview
            *   get
            *   getVersion
            *   list
            *   update
            
        *   reservationSubBlocks
            
            *   Overview
            *   get
            *   getIamPolicy
            *   getVersion
            *   list
            *   performMaintenance
            *   reportFaulty
            *   setIamPolicy
            *   testIamPermissions
            
        *   reservations
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   performMaintenance
            *   resize
            *   setIamPolicy
            *   testIamPermissions
            *   update
            
        *   resourcePolicies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   rolloutPlans
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            
        *   rollouts
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   routers
            
            *   Overview
            *   aggregatedList
            *   delete
            *   deleteNamedSet
            *   deleteRoutePolicy
            *   get
            *   getNamedSet
            *   getNatIpInfo
            *   getNatMappingInfo
            *   getRoutePolicy
            *   getRouterStatus
            *   insert
            *   list
            *   listBgpRoutes
            *   listNamedSets
            *   listRoutePolicies
            *   patch
            *   patchNamedSet
            *   patchRoutePolicy
            *   preview
            *   testIamPermissions
            *   update
            *   updateNamedSet
            *   updateRoutePolicy
            
        *   routes
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   testIamPermissions
            
        *   securityPolicies
            
            *   Overview
            *   addRule
            *   aggregatedList
            *   delete
            *   get
            *   getRule
            *   insert
            *   list
            *   listPreconfiguredExpressionSets
            *   patch
            *   patchRule
            *   removeRule
            *   setLabels
            *   testIamPermissions
            
        *   serviceAttachments
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        *   snapshotGroups
            
            *   Overview
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   testIamPermissions
            
        *   snapshotSettings
            
            *   Overview
            *   get
            *   patch
            
        *   snapshots
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   setIamPolicy
            *   setLabels
            *   testIamPermissions
            *   updateKmsKey
            
        *   sslCertificates
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   testIamPermissions
            
        *   sslPolicies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   listAvailableFeatures
            *   patch
            *   testIamPermissions
            
        *   storagePoolTypes
            
            *   Overview
            *   aggregatedList
            *   get
            *   list
            
        *   storagePools
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   listDisks
            *   setIamPolicy
            *   testIamPermissions
            *   update
            
        *   subnetworks
            
            *   Overview
            *   aggregatedList
            *   delete
            *   expandIpCidrRange
            *   get
            *   getIamPolicy
            *   insert
            *   list
            *   listUsable
            *   patch
            *   setIamPolicy
            *   setPrivateIpGoogleAccess
            *   testIamPermissions
            
        *   targetGrpcProxies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   testIamPermissions
            
        *   targetHttpProxies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   setUrlMap
            *   testIamPermissions
            
        *   targetHttpsProxies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   setCertificateMap
            *   setQuicOverride
            *   setSslCertificates
            *   setSslPolicy
            *   setUrlMap
            *   testIamPermissions
            
        *   targetInstances
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   setSecurityPolicy
            *   testIamPermissions
            
        *   targetPools
            
            *   Overview
            *   addHealthCheck
            *   addInstance
            *   aggregatedList
            *   delete
            *   get
            *   getHealth
            *   insert
            *   list
            *   removeHealthCheck
            *   removeInstance
            *   setBackup
            *   setSecurityPolicy
            *   testIamPermissions
            
        *   targetSslProxies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   setBackendService
            *   setCertificateMap
            *   setProxyHeader
            *   setSslCertificates
            *   setSslPolicy
            *   testIamPermissions
            
        *   targetTcpProxies
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   setBackendService
            *   setProxyHeader
            *   testIamPermissions
            
        *   targetVpnGateways
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   setLabels
            *   testIamPermissions
            
        *   urlMaps
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   invalidateCache
            *   list
            *   patch
            *   testIamPermissions
            *   update
            *   validate
            
        *   vpnGateways
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   getStatus
            *   insert
            *   list
            *   setLabels
            *   testIamPermissions
            
        *   vpnTunnels
            
            *   Overview
            *   aggregatedList
            *   delete
            *   get
            *   insert
            *   list
            *   setLabels
            *   testIamPermissions
            
        *   wireGroups
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            
        *   zoneOperations
            
            *   Overview
            *   delete
            *   get
            *   list
            *   wait
            
        *   zoneVmExtensionPolicies
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   update
            
        *   zones
            
            *   Overview
            *   get
            *   list
            
        
    *   Alpha
    
*   MCP server
    
    *   Use the Compute Engine remote MCP server
    *   MCP tools reference
        
        *   Overview
        *   Tools
            
            *   create_instance
            *   delete_instance
            *   start_instance
            *   stop_instance
            *   reset_instance
            *   get_instance_basic_info
            *   set_instance_machine_type
            *   list_instance_attached_disks
            *   list_instances
            *   get_instance_group_manager_basic_info
            *   list_instance_group_managers
            *   list_managed_instances
            *   list_instance_templates
            *   get_instance_template_basic_info
            *   get_instance_template_properties
            *   get_disk_basic_info
            *   get_disk_performance_config
            *   list_disks
            *   list_accelerator_types
            *   list_machine_types
            *   list_images
            *   get_zone_operation
            *   get_reservation_basic_info
            *   get_reservation_details
            *   list_reservations
            *   list_commitments
            *   get_commitment_basic_info
            *   list_commitment_reservations
            *   list_snapshots
            
        
    
*   OS Login API
    
*   REST API
    
    *   Overview
    *   Shared.Types
        
        *   Types
            
        *   OperatingSystemType
        *   PosixAccount
        *   SshPublicKey
        
    *   v1
        
        *   REST Resources
            
        *   users
            
            *   Overview
            *   getLoginProfile
            *   importSshPublicKey
            
        *   users.projects
            
            *   Overview
            *   delete
            
        *   users.sshPublicKeys
            
            *   Overview
            *   create
            *   delete
            *   get
            *   patch
            
        *   Types
            
        *   LoginProfile
        
    *   v1beta
        
        *   REST Resources
            
        *   projects.locations
            
            *   Overview
            *   signSshPublicKey
            
        *   users
            
            *   Overview
            *   getLoginProfile
            *   importSshPublicKey
            
        *   users.projects
            
            *   Overview
            *   delete
            *   provisionPosixAccount
            
        *   users.projects.locations
            
            *   Overview
            *   signSshPublicKey
            
        *   users.sshPublicKeys
            
            *   Overview
            *   create
            *   delete
            *   get
            *   patch
            
        *   Types
            
        *   LoginProfile
        *   LoginProfileView
        *   SignSshPublicKeyResponse
        
    *   v1alpha
        
        *   REST Resources
            
        *   users
            
            *   Overview
            *   getLoginProfile
            *   importSshPublicKey
            
        *   users.projects
            
            *   Overview
            *   delete
            
        *   users.projects.locations
            
            *   Overview
            *   signSshPublicKey
            
        *   users.sshPublicKeys
            
            *   Overview
            *   create
            *   delete
            *   get
            *   patch
            
        *   Types
            
        *   LoginProfile
        *   LoginProfileView
        *   SignSshPublicKeyResponse
        
    
*   OS Config API
    
*   REST API
    
    *   Overview
    *   Shared.Types
        
        *   Types
            
        *   ArchiveType
        *   CancelOperationRequest
        *   Date
        *   DayOfWeek
        *   DeleteOperationRequest
        *   DesiredState
        *   FixedOrPercent
        *   GetOperationRequest
        *   Interpreter
        *   ListOperationsRequest
        *   ListOperationsResponse
        *   Mode
        *   OSPolicy
        *   OSPolicyAssignment
        *   RolloutState
        *   TimeOfDay
        *   TimeZone
        
    *   v1
        
        *   REST Resources
            
        *   projects.locations.global
            
            *   Overview
            *   getProjectFeatureSettings
            *   updateProjectFeatureSettings
            
        *   projects.locations.instances.inventories
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.instances.osPolicyAssignments.reports
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.instances.vulnerabilityReports
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.osPolicyAssignments
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   listRevisions
            *   patch
            
        *   projects.locations.osPolicyAssignments.operations
            
            *   Overview
            *   cancel
            *   get
            
        *   projects.patchDeployments
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            *   pause
            *   resume
            
        *   projects.patchJobs
            
            *   Overview
            *   cancel
            *   execute
            *   get
            *   list
            
        *   projects.patchJobs.instanceDetails
            
            *   Overview
            *   list
            
        *   Types
            
        *   InventoryView
        *   OSPolicyAssignmentReport
        *   PatchConfig
        *   PatchInstanceFilter
        *   PatchRollout
        *   ProjectFeatureSettings
        
    *   v2
        
        *   REST Resources
            
        *   folders.locations.global.policyOrchestrators
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   folders.locations.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   organizations.locations.global.policyOrchestrators
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   organizations.locations.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   projects.locations.global.policyOrchestrators
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.locations.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   Types
            
        *   ListPolicyOrchestratorsResponse
        
    *   v1beta
        
        *   REST Resources
            
        *   projects.guestPolicies
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.patchDeployments
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            *   pause
            *   resume
            
        *   projects.patchJobs
            
            *   Overview
            *   cancel
            *   execute
            *   get
            *   list
            
        *   projects.patchJobs.instanceDetails
            
            *   Overview
            *   list
            
        *   projects.zones.instances
            
            *   Overview
            *   lookupEffectiveGuestPolicy
            
        *   Types
            
        *   PatchConfig
        *   PatchInstanceFilter
        *   PatchRollout
        
    *   v2beta
        
        *   REST Resources
            
        *   folders.locations.global.policyOrchestrators
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   folders.locations.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   organizations.locations.global.policyOrchestrators
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   organizations.locations.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   projects.locations.global.policyOrchestrators
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.locations.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   Types
            
        *   ListPolicyOrchestratorsResponse
        
    *   v1alpha
        
        *   REST Resources
            
        *   projects.locations.instanceOSPoliciesCompliances
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.instances.inventories
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.instances.osPolicyAssignments.reports
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.instances.vulnerabilityReports
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.osPolicyAssignments
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   listRevisions
            *   patch
            
        *   projects.locations.osPolicyAssignments.operations
            
            *   Overview
            *   cancel
            *   get
            
        *   Types
            
        *   InventoryView
        *   OSPolicyAssignmentReport
        
    
*   License Manager API
    
*   REST API
    
    *   Overview
    *   v1
        
        *   REST Resources
            
        *   projects.locations
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.configurations
            
            *   Overview
            *   aggregateUsage
            *   create
            *   deactivate
            *   delete
            *   get
            *   list
            *   patch
            *   queryLicenseUsage
            *   reactivate
            
        *   projects.locations.instances
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   projects.locations.products
            
            *   Overview
            *   get
            *   list
            
        
    

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
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: projects.locations.osPolicyAssignments.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
    *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

List the OS policy assignments under the parent resource.

For each OS policy assignment, the latest revision is returned.

### HTTP request

`GET https://osconfig.googleapis.com/v1/{parent=projects/*/locations/*}/osPolicyAssignments`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

Required. The parent resource name.

### Query parameters

 

Parameters

`pageSize`

`integer`

The maximum number of assignments to return.

`pageToken`

`string`

A pagination token returned from a previous call to `osPolicyAssignments.list` that indicates where this listing should continue from.

### Request body

The request body must be empty.

### Response body

A response message for listing all assignments under given parent.

If successful, the response body contains data with the following structure:

JSON representation

{
  "osPolicyAssignments": [
    {
      object (`OSPolicyAssignment`)
    }
  ],
  "nextPageToken": string
}

 

Fields

`osPolicyAssignments[]`

``object (`OSPolicyAssignment`)``

The list of assignments

`nextPageToken`

`string`

The pagination token to retrieve the next page of OS policy assignments.

### Authorization scopes

Requires the following OAuth scope:

*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

Requires the following IAM permission on the `parent` resource:

*   `osconfig.osPolicyAssignments.list`

For more information, see the IAM documentation.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-07-28 UTC.

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