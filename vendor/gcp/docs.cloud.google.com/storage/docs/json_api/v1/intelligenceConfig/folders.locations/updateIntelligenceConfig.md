# Method: folders.locations.updateIntelligenceConfig

    
    
      
    

    
      
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

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/storage-color.svg)

*   Cloud Storage

Start free

Overview Guides Reference Samples Resources Storage Intelligence dashboards ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Overview
    *   Guides
    *   Reference
    *   Samples
    *   Resources
    *   Storage Intelligence dashboards
*   Cross-product tools
    *   More
*   Console

*   Cloud Storage
    
*   All APIs & references
*   IAM references for Cloud Storage
    
    *   Cloud Storage permissions
    *   Cloud Storage roles
    *   IAM with the Console
    *   IAM with gcloud storage
    *   IAM with gsutil
    *   IAM with JSON
    *   IAM with XML
    *   IAM with MCP
    
*   Google Cloud console
*   Client libraries
    
    *   C++ reference
    *   C# reference
    *   Go reference
    *   Java reference
    *   Node.js reference
    *   PHP reference
    *   Python reference
    *   Ruby reference
    *   Rust reference
    
*   Command line interfaces
    
    *   gcloud tool
    *   gsutil tool
        
        *   Overview
        *   Transition from gsutil to gcloud storage
        *   Installing gsutil
        *   Boto configuration file
        *   Shim for running gcloud storage
        
    
*   Service APIs
    
    *   JSON API
        
        *   API overview
        *   API reference
            
            *   Overview
            *   AnywhereCache
                
                *   Overview
                *   create
                *   disable
                *   get
                *   list
                *   resume
                *   update
                
            *   BucketAccessControls
                
                *   Overview
                *   delete
                *   get
                *   insert
                *   list
                *   patch
                *   update
                
            *   Buckets
                
                *   Overview
                *   delete
                *   restore
                *   get
                *   getIamPolicy
                *   getStorageLayout
                *   insert
                *   list
                *   lockRetentionPolicy
                *   patch
                *   relocate
                *   setIamPolicy
                *   testIamPermissions
                *   update
                
            *   Folders
                
                *   Overview
                *   delete
                *   get
                *   insert
                *   list
                *   rename
                
            *   DefaultObjectAccessControls
                
                *   Overview
                *   delete
                *   get
                *   insert
                *   list
                *   patch
                *   update
                
            *   IntelligenceConfig
                
                *   Overview
                *   folders.locations
                    
                    *   Overview
                    *   getIntelligenceConfig
                    *   updateIntelligenceConfig
                    
                *   organizations.locations
                    
                    *   Overview
                    *   getIntelligenceConfig
                    *   updateIntelligenceConfig
                    
                *   projects.locations
                    
                    *   Overview
                    *   getIntelligenceConfig
                    *   updateIntelligenceConfig
                    
                
            *   ManagedFolders
                
                *   Overview
                *   insert
                *   delete
                *   get
                *   getIamPolicy
                *   list
                *   setIamPolicy
                *   testIamPermissions
                
            *   Notifications
                
                *   Overview
                *   delete
                *   get
                *   insert
                *   list
                
            *   ObjectAccessControls
                
                *   Overview
                *   delete
                *   get
                *   insert
                *   list
                *   patch
                *   update
                
            *   Objects
                
                *   Overview
                *   bulkRestore
                *   compose
                *   copy
                *   delete
                *   get
                *   insert
                *   list
                *   move
                *   patch
                *   restore
                *   rewrite
                *   update
                
            *   Operations
                
                *   Overview
                *   advanceRelocateBucket
                *   cancel
                *   get
                *   list
                
            *   Projects.hmacKeys
                
                *   Overview
                *   create
                *   delete
                *   get
                *   list
                *   update
                
            *   Projects.serviceAccount
                
                *   Overview
                *   get
                
            
        *   Headers and query parameters
        *   Status and error codes
        
    *   XML API
        
        *   API overview
        *   API reference
            
            *   Overview
            *   GET Service
            *   DELETE Bucket
            *   GET Bucket
                
                *   Overview
                *   List objects
                *   List multipart uploads
                *   Get ACLs
                *   Get Metadata
                
            *   HEAD Bucket
            *   POST Bucket
            *   PUT Bucket
                
                *   Overview
                *   Create a bucket
                *   Set ACLs
                *   Set metadata
                
            *   DELETE Object
                
                *   Delete an object
                *   Abort a multipart upload
                
            *   GET Object
                
                *   Overview
                *   Download an object
                *   List object parts
                *   Get object ACLs
                *   Get object encryption
                *   Get object retention
                
            *   HEAD Object
            *   POST Object
                
                *   Overview
                *   Initiate a resumable upload
                *   Initiate a multipart upload
                *   Complete a multipart upload
                *   Upload an object with HTML forms
                
            *   PUT Object
                
                *   Overview
                *   Upload an object
                *   Upload an object part
                *   Copy an object
                *   Compose an object
                *   Set object ACLs
                *   Set object retention
                
            *   GET HMAC Key
            *   POST HMAC Key
                
                *   Overview
                *   Create an HMAC key
                *   Update an HMAC key
                *   Delete an HMAC key
                
            
        *   Headers and query parameters
        *   Status and error codes
        
    *   RPC API
        
        *   Overview
        *   google.iam.v1
        *   google.longrunning
        *   google.rpc
        *   google.storage.control.v2
        *   google.storage.v1
        *   google.storage.v2
        *   google.type
        
    *   MCP reference
        
        *   Overview
        *   Tools
            
            *   create_bucket
            *   get_object_metadata
            *   list_buckets
            *   list_objects
            *   read_object
            *   read_text
            *   write_text
            
        
    *   Storage Insights
        
        *   Overview
        *   projects.locations
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.datasetConfigs
            
            *   Overview
            *   create
            *   delete
            *   get
            *   linkDataset
            *   list
            *   patch
            *   unlinkDataset
            
        *   projects.locations.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        *   projects.locations.reportConfigs
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.locations.reportConfigs.reportDetails
            
            *   Overview
            *   get
            *   list
            
        *   Types
            
        *   Status
        
    *   Storage batch operations
        
        *   Overview
        *   projects.locations.jobs
            
            *   Overview
            *   cancel
            *   create
            *   delete
            *   get
            *   list
            
        *   projects.locations.operations
            
            *   Overview
            *   cancel
            *   delete
            *   get
            *   list
            
        
    
*   Cloud Storage FUSE
    
    *   Cloud Storage FUSE CLI reference
    *   Configuration file
    
*   Connector for PyTorch
*   Firebase SDKs

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
*   Storage
*   Cloud Storage
*   Reference

Send feedback

# Method: folders.locations.updateIntelligenceConfig Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Updates the `IntelligenceConfig` resource associated with your folder.

**IAM Permissions**:

Requires `storage.intelligenceConfigs.update` IAM permission on the folder.

### HTTP request

`PATCH https://storage.googleapis.com/v2/folders/folderId/locations/global/intelligenceConfig`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`name`

`string`

Required. The name of the `IntelligenceConfig` resource associated with your folder.

Format: `folders/folderId/locations/global/intelligenceConfig`

### Query parameters

 

Parameters

`updateMask`

``string (`FieldMask` format)``

Required. The `updateMask` that specifies the fields within the `IntelligenceConfig` resource that should be modified by this update. Only the listed fields are updated.

`requestId`

`string`

Optional. The ID that uniquely identifies the request, preventing duplicate processing.

### Request body

The request body contains an instance of `IntelligenceConfig`.

### Response body

If successful, the response body contains an instance of `IntelligenceConfig`.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/devstorage.full_control`
*   `https://www.googleapis.com/auth/devstorage.read_only`
*   `https://www.googleapis.com/auth/devstorage.read_write`
*   `https://www.googleapis.com/auth/devstorage.write_only`
*   `https://www.googleapis.com/auth/cloud-platform`
*   `https://www.googleapis.com/auth/cloud-platform.read-only`

For more information, see the Authentication Overview.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-05-19 UTC.

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