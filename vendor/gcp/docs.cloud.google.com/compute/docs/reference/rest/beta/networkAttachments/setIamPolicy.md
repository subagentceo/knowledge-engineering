# Method: networkAttachments.setIamPolicy

    
    
      
    

    
      
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

# Method: networkAttachments.setIamPolicy Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
    *   JSON representation
        *   JSON representation
        *   JSON representation
        *   JSON representation
*   Response body
    *   JSON representation
        *   JSON representation
        *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

Sets the access control policy on the specified resource. Replaces any existing policy.

### HTTP request

`POST https://compute.googleapis.com/compute/beta/projects/{project}/regions/{region}/networkAttachments/{resource}/setIamPolicy`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

`region`

`string`

The name of the region for this request.

`resource`

`string`

Name or id of the resource for this request.

### Request body

The request body contains data with the following structure:

JSON representation

{
  "policy": {
    "version": integer,
    "bindings": [
      {
        "role": string,
        "members": [
          string
        ],
        "condition": {
          "expression": string,
          "title": string,
          "description": string,
          "location": string
        }
      }
    ],
    "auditConfigs": [
      {
        "service": string,
        "auditLogConfigs": [
          {
            "logType": enum,
            "exemptedMembers": [
              string
            ]
          }
        ]
      }
    ],
    "etag": string
  },
  "bindings": [
    {
      "role": string,
      "members": [
        string
      ],
      "condition": {
        "expression": string,
        "title": string,
        "description": string,
        "location": string
      }
    }
  ],
  "etag": string
}

 

Fields

`policy`

`object`

REQUIRED: The complete policy to be applied to the 'resource'. The size of the policy is limited to a few 10s of KB. An empty policy is in general a valid policy but certain services (like Projects) might reject them.

`policy.version`

`integer`

Specifies the format of the policy.

Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected.

Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations:

*   Getting a policy that includes a conditional role binding
*   Adding a conditional role binding to a policy
*   Changing a conditional role binding in a policy
*   Removing any role binding, with or without a condition, from a policy that includes conditions

**Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.

If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset.

To learn which resources support conditions in their IAM policies, see the IAM documentation.

`policy.bindings[]`

`object`

Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal.

The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`.

`policy.bindings[].role`

`string`

Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`.

For an overview of the IAM roles and permissions, see the IAM documentation. For a list of the available pre-defined roles, see here.

`policy.bindings[].members[]`

`string`

Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values:

*   `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account.
    
*   `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation.
    
*   `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` .
    

*   `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`.
    
*   `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account. For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`.
    
*   `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`.
    

*   `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`.

*   `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool.
    
*   `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{groupId}`: All workforce identities in a group.
    
*   `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value.
    
*   `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool.
    
*   `principal://iam.googleapis.com/projects/{projectNumber}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool.
    
*   `principalSet://iam.googleapis.com/projects/{projectNumber}/locations/global/workloadIdentityPools/{pool_id}/group/{groupId}`: A workload identity pool group.
    
*   `principalSet://iam.googleapis.com/projects/{projectNumber}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute.
    
*   `principalSet://iam.googleapis.com/projects/{projectNumber}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool.
    
*   `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding.
    
*   `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding.
    
*   `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding.
    
*   `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`.
    

`policy.bindings[].condition`

`object`

The condition that is associated with this binding.

If the condition evaluates to `true`, then this binding applies to the current request.

If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding.

To learn which resources support conditions in their IAM policies, see the IAM documentation.

`policy.bindings[].condition.expression`

`string`

Textual representation of an expression in Common Expression Language syntax.

`policy.bindings[].condition.title`

`string`

Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.

`policy.bindings[].condition.description`

`string`

Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.

`policy.bindings[].condition.location`

`string`

Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.

`policy.auditConfigs[]`

`object`

Specifies cloud audit logging configuration for this policy.

`policy.auditConfigs[].service`

`string`

Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services.

`policy.auditConfigs[].auditLogConfigs[]`

`object`

The configuration for logging of each type of permission.

`policy.auditConfigs[].auditLogConfigs[].logType`

`enum`

The log type that this config enables.

`policy.auditConfigs[].auditLogConfigs[].exemptedMembers[]`

`string`

Specifies the identities that do not cause logging for this type of permission. Follows the same format of `Binding.members`.

`policy.etag`

`string (bytes format)`

`etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy.

**Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.

A base64-encoded string.

`bindings[]`

`object`

Flatten Policy to create a backwacd compatible wire-format. Deprecated. Use 'policy' to specify bindings.

`bindings[].role`

`string`

Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`.

For an overview of the IAM roles and permissions, see the IAM documentation. For a list of the available pre-defined roles, see here.

`bindings[].members[]`

`string`

Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values:

*   `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account.
    
*   `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation.
    
*   `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` .
    

*   `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`.
    
*   `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account. For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`.
    
*   `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`.
    

*   `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`.

*   `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool.
    
*   `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{groupId}`: All workforce identities in a group.
    
*   `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value.
    
*   `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool.
    
*   `principal://iam.googleapis.com/projects/{projectNumber}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool.
    
*   `principalSet://iam.googleapis.com/projects/{projectNumber}/locations/global/workloadIdentityPools/{pool_id}/group/{groupId}`: A workload identity pool group.
    
*   `principalSet://iam.googleapis.com/projects/{projectNumber}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute.
    
*   `principalSet://iam.googleapis.com/projects/{projectNumber}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool.
    
*   `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding.
    
*   `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding.
    
*   `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding.
    
*   `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`.
    

`bindings[].condition`

`object`

The condition that is associated with this binding.

If the condition evaluates to `true`, then this binding applies to the current request.

If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding.

To learn which resources support conditions in their IAM policies, see the IAM documentation.

`bindings[].condition.expression`

`string`

Textual representation of an expression in Common Expression Language syntax.

`bindings[].condition.title`

`string`

Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.

`bindings[].condition.description`

`string`

Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.

`bindings[].condition.location`

`string`

Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.

`etag`

`string (bytes format)`

Flatten Policy to create a backward compatible wire-format. Deprecated. Use 'policy' to specify the etag.

A base64-encoded string.

### Response body

An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources.

A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role.

For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation.

**JSON example:**

    ```
    {
      "bindings": [
        {
          "role": "roles/resourcemanager.organizationAdmin",
          "members": [
            "user:mike@example.com",
            "group:admins@example.com",
            "domain:google.com",
            "serviceAccount:my-project-id@appspot.gserviceaccount.com"
          ]
        },
        {
          "role": "roles/resourcemanager.organizationViewer",
          "members": [
            "user:eve@example.com"
          ],
          "condition": {
            "title": "expirable access",
            "description": "Does not grant access after Sep 2020",
            "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')",
          }
        }
      ],
      "etag": "BwWWja0YfJA=",
      "version": 3
    }
```

**YAML example:**

    ```
    bindings:
    - members:
      - user:mike@example.com
      - group:admins@example.com
      - domain:google.com
      - serviceAccount:my-project-id@appspot.gserviceaccount.com
      role: roles/resourcemanager.organizationAdmin
    - members:
      - user:eve@example.com
      role: roles/resourcemanager.organizationViewer
      condition:
        title: expirable access
        description: Does not grant access after Sep 2020
        expression: request.time < timestamp('2020-10-01T00:00:00.000Z')
    etag: BwWWja0YfJA=
    version: 3
```

For a description of IAM and its features, see the IAM documentation.

If successful, the response body contains data with the following structure:

JSON representation

{
  "version": integer,
  "bindings": [
    {
      "role": string,
      "members": [
        string
      ],
      "condition": {
        "expression": string,
        "title": string,
        "description": string,
        "location": string
      }
    }
  ],
  "auditConfigs": [
    {
      "service": string,
      "auditLogConfigs": [
        {
          "logType": enum,
          "exemptedMembers": [
            string
          ]
        }
      ]
    }
  ],
  "etag": string
}

 

Fields

`version`

`integer`

Specifies the format of the policy.

Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected.

Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations:

*   Getting a policy that includes a conditional role binding
*   Adding a conditional role binding to a policy
*   Changing a conditional role binding in a policy
*   Removing any role binding, with or without a condition, from a policy that includes conditions

**Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.

If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset.

To learn which resources support conditions in their IAM policies, see the IAM documentation.

`bindings[]`

`object`

Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal.

The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`.

`bindings[].role`

`string`

Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`.

For an overview of the IAM roles and permissions, see the IAM documentation. For a list of the available pre-defined roles, see here.

`bindings[].members[]`

`string`

Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values:

*   `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account.
    
*   `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation.
    
*   `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` .
    

*   `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`.
    
*   `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account. For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`.
    
*   `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`.
    

*   `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`.

*   `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool.
    
*   `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{groupId}`: All workforce identities in a group.
    
*   `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value.
    
*   `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool.
    
*   `principal://iam.googleapis.com/projects/{projectNumber}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool.
    
*   `principalSet://iam.googleapis.com/projects/{projectNumber}/locations/global/workloadIdentityPools/{pool_id}/group/{groupId}`: A workload identity pool group.
    
*   `principalSet://iam.googleapis.com/projects/{projectNumber}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute.
    
*   `principalSet://iam.googleapis.com/projects/{projectNumber}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool.
    
*   `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding.
    
*   `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding.
    
*   `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding.
    
*   `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`.
    

`bindings[].condition`

`object`

The condition that is associated with this binding.

If the condition evaluates to `true`, then this binding applies to the current request.

If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding.

To learn which resources support conditions in their IAM policies, see the IAM documentation.

`bindings[].condition.expression`

`string`

Textual representation of an expression in Common Expression Language syntax.

`bindings[].condition.title`

`string`

Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression.

`bindings[].condition.description`

`string`

Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI.

`bindings[].condition.location`

`string`

Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file.

`auditConfigs[]`

`object`

Specifies cloud audit logging configuration for this policy.

`auditConfigs[].service`

`string`

Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services.

`auditConfigs[].auditLogConfigs[]`

`object`

The configuration for logging of each type of permission.

`auditConfigs[].auditLogConfigs[].logType`

`enum`

The log type that this config enables.

`auditConfigs[].auditLogConfigs[].exemptedMembers[]`

`string`

Specifies the identities that do not cause logging for this type of permission. Follows the same format of `Binding.members`.

`etag`

`string (bytes format)`

`etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy.

**Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost.

A base64-encoded string.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.networkAttachments.setIamPolicy`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-09-18 UTC.

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