# Method: projects.locations.multicastDomainActivations.list

    
    
      
    

    
      
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
*   Español
*   Español – América Latina
*   Français
*   Indonesia
*   Italiano
*   Português
*   Português – Brasil
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어

Sign in

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/categories/networking-color.svg)

*   Virtual Private Cloud

Start free

Guides Reference Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Guides
    *   Reference
    *   Resources
*   Cross-product tools
    *   More
*   Console

*   Multicast API reference
    
*   Network Services API
    
    *   Overview
    *   Shared types
        
        *   Types
            
        *   Operation
        
    *   v1
        
        *   REST Resources
            
        *   projects.locations.multicastConsumerAssociations
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            
        *   projects.locations.multicastDomainActivations
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.locations.multicastDomainGroups
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            
        *   projects.locations.multicastDomains
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            
        *   projects.locations.multicastGroupConsumerActivations
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.locations.multicastGroupProducerActivations
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            
        *   projects.locations.multicastGroupRangeActivations
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.locations.multicastGroupRanges
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.locations.multicastProducerAssociations
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            
        *   Types
            
        *   ConsumerResourceState
        *   MulticastLogConfig
        *   MulticastResourceState
        
    *   v1beta1
        
        *   REST Resources
            
        *   projects.locations.multicastConsumerAssociations
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            
        *   projects.locations.multicastDomainActivations
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.locations.multicastDomainGroups
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            
        *   projects.locations.multicastDomains
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            
        *   projects.locations.multicastGroupConsumerActivations
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.locations.multicastGroupProducerActivations
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            
        *   projects.locations.multicastGroupRangeActivations
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.locations.multicastGroupRanges
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            *   patch
            
        *   projects.locations.multicastProducerAssociations
            
            *   Overview
            *   create
            *   delete
            *   get
            *   list
            
        *   Types
            
        *   ConsumerResourceState
        *   MulticastLogConfig
        *   MulticastResourceState
        
    
*   Multicast permissions reference
    
*   Permissions reference

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
*   Networking
*   Virtual Private Cloud
*   Reference

Send feedback

# Method: projects.locations.multicastDomainActivations.list Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
*   Response body
    *   JSON representation

Lists multicast domain activations in a given project and location.

### HTTP request

`GET https://networkservices.googleapis.com/v1beta1/{parent=projects/*/locations/*}/multicastDomainActivations`

The URL uses gRPC Transcoding syntax.

### Path parameters

 

Parameters

`parent`

`string`

Required. The parent resource for which to list multicast domain activations. Use the following format: `projects/*/locations/*`.

### Query parameters

 

Parameters

`pageSize`

`integer`

Optional. The maximum number of multicast domain activations to return per call.

`pageToken`

`string`

Optional. A page token from an earlier query, as returned in `nextPageToken`.

`filter`

`string`

Optional. A filter expression that filters the resources listed in the response. The expression must be of the form `<field> <operator> <value>` where operators: `<`, `>`, `<=`, `>=`, `!=`, `=`, `:` are supported (colon `:` represents a HAS operator which is roughly synonymous with equality). can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case.

Examples: * Filter by name: name = "RESOURCE_NAME" * Filter by labels: * Resources that have a key named `foo` labels.foo:* * Resources that have a key named `foo` whose value is `bar` labels.foo = bar

`orderBy`

`string`

Optional. A field used to sort the results by a certain order.

### Request body

The request body must be empty.

### Response body

Response message for `multicastDomainActivations.list`.

If successful, the response body contains data with the following structure:

JSON representation

{
  "multicastDomainActivations": [
    {
      object (`MulticastDomainActivation`)
    }
  ],
  "nextPageToken": string,
  "unreachable": [
    string
  ]
}

 

Fields

`multicastDomainActivations[]`

``object (`MulticastDomainActivation`)``

The list of multicast domain activations.

`nextPageToken`

`string`

A page token from an earlier query, as returned in `nextPageToken`.

`unreachable[]`

`string`

Locations that could not be reached.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-12-22 UTC.

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
*   Español
*   Español – América Latina
*   Français
*   Indonesia
*   Italiano
*   Português
*   Português – Brasil
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어