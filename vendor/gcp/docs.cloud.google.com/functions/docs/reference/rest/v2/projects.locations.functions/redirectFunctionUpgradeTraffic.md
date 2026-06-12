# Method: projects.locations.functions.redirectFunctionUpgradeTraffic

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

Skip to main content

 ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/v8b2f8e7f8a7704cc38c0519ef05e8f889c427cc26f7c8f743e84df2a01b1dee7/clouddocs/images/lockup_full_color.svg)

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

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/run-color.svg)

*   Cloud Run
*   Cloud Run functions

Start free

Overview Guides Reference Samples Resources Versions

*   Site selector
*   Cloud Run functions (Recommended)
    
    Deploy functions from source code using Cloud Run
    
*   Cloud Run functions
    
    Manage functions with gcloud functions or Cloud Functions v2 API
    
*   Cloud Run functions (1st gen)
    
    Manage functions with Cloud Run functions (1st gen) ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/v8b2f8e7f8a7704cc38c0519ef05e8f889c427cc26f7c8f743e84df2a01b1dee7/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Overview
    *   Guides
    *   Reference
    *   Samples
    *   Resources
    *   Versions
        *   More
*   Cross-product tools
    *   More
*   Console

*   Cloud Functions v2 API
    
*   All APIs & references
*   Client Libraries
*   gcloud command reference
*   Terraform reference
    
    *   Function
    *   Terraform examples
        
        *   Terraform HTTP example
        *   Terraform Pub/Sub example
        
    
*   REST reference
    
    *   Overview
    *   v1
        
        *   REST Resources
            
        *   operations
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations
            
            *   Overview
            *   list
            
        *   projects.locations.functions
            
            *   Overview
            *   call
            *   create
            *   delete
            *   generateDownloadUrl
            *   generateUploadUrl
            *   get
            *   getIamPolicy
            *   list
            *   patch
            *   setIamPolicy
            *   testIamPermissions
            
        
    *   v2
        
        *   REST Resources
            
        *   projects.locations
            
            *   Overview
            *   list
            
        *   projects.locations.functions
            
            *   Overview
            *   abortFunctionUpgrade
            *   commitFunctionUpgrade
            *   create
            *   delete
            *   detachFunction
            *   generateDownloadUrl
            *   generateUploadUrl
            *   get
            *   getIamPolicy
            *   list
            *   patch
            *   redirectFunctionUpgradeTraffic
            *   rollbackFunctionUpgradeTraffic
            *   setIamPolicy
            *   setupFunctionUpgradeConfig
            *   testIamPermissions
            
        *   projects.locations.operations
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.runtimes
            
            *   Overview
            *   list
            
        
    *   v2alpha
        
        *   REST Resources
            
        *   projects.locations
            
            *   Overview
            *   list
            
        *   projects.locations.functions
            
            *   Overview
            *   abortFunctionUpgrade
            *   commitFunctionUpgrade
            *   create
            *   delete
            *   detachFunction
            *   generateDownloadUrl
            *   generateUploadUrl
            *   get
            *   getIamPolicy
            *   list
            *   patch
            *   redirectFunctionUpgradeTraffic
            *   rollbackFunctionUpgradeTraffic
            *   setIamPolicy
            *   setupFunctionUpgradeConfig
            *   testIamPermissions
            
        *   projects.locations.operations
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.runtimes
            
            *   Overview
            *   list
            
        
    *   v2beta
        
        *   REST Resources
            
        *   projects.locations
            
            *   Overview
            *   list
            
        *   projects.locations.functions
            
            *   Overview
            *   abortFunctionUpgrade
            *   commitFunctionUpgrade
            *   create
            *   delete
            *   detachFunction
            *   generateDownloadUrl
            *   generateUploadUrl
            *   get
            *   getIamPolicy
            *   list
            *   patch
            *   redirectFunctionUpgradeTraffic
            *   rollbackFunctionUpgradeTraffic
            *   setIamPolicy
            *   setupFunctionUpgradeConfig
            *   testIamPermissions
            
        *   projects.locations.operations
            
            *   Overview
            *   get
            *   list
            
        *   projects.locations.runtimes
            
            *   Overview
            *   list
            
        
    *   Types
        
    *   AuditConfig
    *   Binding
    *   Date
    *   GetIamPolicyRequest
    *   GetOperationRequest
    *   ListLocationsRequest
    *   ListLocationsResponse
    *   ListOperationsRequest
    *   ListOperationsResponse
    *   LogType
    *   Policy
    *   SetIamPolicyRequest
    *   TestIamPermissionsRequest
    *   TestIamPermissionsResponse
    
*   RPC reference
    
    *   Overview
    *   google.cloud.common
    *   google.cloud.functions.v1
    *   google.cloud.functions.v2
    *   google.cloud.functions.v2alpha
    *   google.cloud.functions.v2beta
    *   google.cloud.location
    *   google.iam.v1
    *   google.longrunning
    *   google.rpc
    *   google.type
    
*   Secure and control access
    
    *   Security overview
    *   Roles
    *   Function identity
    *   Use IAM to authorize access
    *   Authenticate for invocation
    *   Use customer-managed encryption keys
    *   Restrict new deployments by product version
    *   Manage function resources using custom constraints
    *   Secure your execution environment
    
*   IAM reference
    
    *   Overview
    *   Roles
    *   Permissions
    
*   System packages
*   Request headers
*   Cloud audit logging

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

*   Site selector
*   Cloud Run functions (Recommended)
*   Cloud Run functions
*   Cloud Run functions (1st gen)

If you are creating a new function, see the Console Quickstart on Cloud Run.

*   Home
*   Documentation
*   Application hosting
*   Cloud Run
*   Cloud Run functions
*   Reference

Send feedback

# Method: projects.locations.functions.redirectFunctionUpgradeTraffic Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Request body
*   Response body
*   Authorization scopes
*   Try it!

Changes the traffic target of a function from the original 1st gen function to the 2nd gen copy. This is the second step of the multi-step process to upgrade 1st gen functions to Cloud Run functions. After this operation, all new traffic will be served by the 2nd gen function copy.

### HTTP request

`POST https://cloudfunctions.googleapis.com/v2/{name}:redirectFunctionUpgradeTraffic`

### Path parameters

 

Parameters

`name`

`string`

Required. The name of the function for which traffic target should be changed to 2nd gen from 1st gen. It takes the form `projects/{project}/locations/{location}/functions/{function}`.

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

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-10-01 UTC.

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