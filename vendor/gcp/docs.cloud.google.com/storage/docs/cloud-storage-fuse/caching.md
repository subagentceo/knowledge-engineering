# Overview of caching in Cloud Storage FUSE

    
    
      
    

    
      
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
*   עברית
*   中文 – 简体
*   中文 – 繁體
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

*   Discover
    
*   Product overview
*   Storage Intelligence overview
*   Get started
    
*   Quickstarts
    
    *   Use the Console
    *   Use the gcloud CLI
    *   Use Terraform
    
*   Use client libraries
    
    *   Get started with client libraries
    *   Get started with the Storage Control API
    
*   Use gRPC
    
    *   Get started with gRPC
    *   Enable direct connectivity
    
*   Terraform support for Cloud Storage
*   Set up storage
    
*   About buckets
*   Create a bucket
*   Bucket locations
*   Storage classes
*   Folder types
*   Domain-named bucket verification
*   Set up Storage Intelligence
    
    *   Configure and manage Storage Intelligence
    *   30-day introductory trial for Storage Intelligence
        
        *   About the 30-day introductory trial
        *   Configure and manage the 30-day introductory trial
        
    
*   Store data
    
*   About objects
*   Upload objects
    
    *   About object uploads
    *   Upload objects from files
    *   Upload objects from memory
    *   Resumable uploads
        
        *   About resumable uploads
        *   Perform resumable uploads
        
    *   XML API multipart uploads
    *   Parallel composite uploads
    *   Streaming uploads
    
*   Copy, rename, or move objects
*   Perform batch operations on objects
    
    *   About storage batch operations
    *   Create and manage batch operation jobs
    
*   Composite objects
    
    *   About composite objects
    *   Compose objects
    
*   Object transcoding
*   Delete objects
    
    *   About object deletion
    *   Delete objects
    
*   Manage buckets
    
*   List buckets
*   Get bucket information
    
    *   About bucket metadata
    *   Get bucket metadata
    *   Get bucket size
    *   Get bucket storage layout
    
*   Tag and label buckets
    
    *   About labels and tags
    *   Label buckets
    
*   Relocate buckets
    
    *   About bucket relocation
    *   Plan bucket relocation
    *   Relocate buckets
    
*   Move data between buckets
*   Change the default storage class of a bucket
*   Delete buckets
*   Access data
    
*   Folder types in Cloud Storage
*   List objects
*   Get object metadata
    
    *   About object metadata
    *   View and edit object metadata
    *   Change an object's storage class
    
*   Download objects
    
    *   About object downloads
    *   Download objects as files
    *   Download objects into memory
    *   Sliced object downloads
    *   Streaming downloads
    
*   Access public data
*   Request endpoints
    
    *   Global endpoints
    *   Regional endpoints
    *   Locational endpoints for ITAR
    
*   Cross-origin resource sharing (CORS)
    
    *   About CORS
    *   Set up and view CORS configurations
    *   CORS configuration examples
    
*   Send batched requests
*   Charge users for data access
    
    *   About Requester Pays
    *   Enable or disable Requester Pays
    
*   Analyze data storage
    
*   Get activity and metadata insights
    
    *   About datasets
    *   Dataset tables and schemas
    *   Configure datasets
    *   Manage datasets
    
*   Analyze stored data with Gemini Cloud Assist
*   Get bucket inventory reports
    
    *   About inventory reports
    *   Use inventory reports
    
*   Attach contextual information to objects
    
    *   About object contexts
    *   Use object contexts
    
*   Optimize
    
*   Optimize AI/ML and analytics with Cloud Storage Rapid
*   Rapid Bucket for high performance storage
    
    *   About Rapid Bucket
    *   Create zonal buckets
    *   Read and append to objects in zonal buckets
    
*   AI zones
*   Rapid Cache
    
    *   About Rapid Cache
    *   Use Rapid Cache
    *   Get Rapid Cache recommendations
    
*   Built-in caching
*   Directory data structure
    
    *   About hierarchical namespace
    *   About folders in buckets with hierarchical namespace enabled
    *   Create buckets with hierarchical namespace enabled
    *   Create and manage folders
    *   Rename and move folders
    *   Use hierarchical namespace-enabled buckets for Hadoop workloads
    *   Optimize performance when using hierarchical namespace
    
*   Request rate and access distribution guidelines
*   Cost savings
    
    *   Options for controlling data lifecycles
    *   Object Lifecycle Management
        
        *   About Object Lifecycle Management
        *   Manage object lifecycles
        *   Configuration examples
        
    *   Autoclass
        
        *   About Autoclass
        *   Use Autoclass
        
    
*   Mount buckets using Cloud Storage FUSE
    
*   About Cloud Storage FUSE
*   Quickstart to Cloud Storage FUSE
*   Install Cloud Storage FUSE
*   Mount buckets as a file system
*   Caching in Cloud Storage FUSE
    
    *   About caching in Cloud Storage FUSE
    *   File caching
    *   List caching
    *   Stat caching
    
*   Performance
    
    *   Performance tuning best practices
    *   Profile-based configurations for AI/ML workloads
    *   Automated configuration values for high-performance machine types
    *   Use pre-configured GKE YAML files to optimize Cloud Storage FUSE performance
    
*   Monitor Cloud Storage FUSE
    
    *   Use metrics
    *   Forward Cloud Storage FUSE logs to Cloud Logging
    
*   Authenticate and manage requests
    
*   Authenticate to Cloud Storage
*   Access data on a user's behalf
*   OAuth 2.0 scopes
*   Projects
    
    *   About projects
    *   Get a service agent
    
*   HMAC keys
    
    *   About HMAC keys
    *   Manage HMAC keys for service accounts
    
*   Data consistency
    
    *   Cloud Storage consistency
    *   Request preconditions
    *   Data validation and change detection
    
*   Retry requests
*   Use long-running operations
*   Paginate results
*   URI wildcards
*   Secure and control access
    
*   About access control in Cloud Storage
*   Identity and Access Management (IAM)
    
    *   About IAM for Cloud Storage
    *   Set IAM policies on buckets
    *   Set IAM policies on managed folders
    *   IAM references for Cloud Storage
    *   Sharing and collaboration scenarios
    
*   Managed folders
    
    *   About managed folders
    *   Create and manage managed folders
    
*   Access control lists (ACLs)
    
    *   About ACLs
    *   Create and manage ACLs
    
*   Uniform bucket-level access
    
    *   About uniform bucket-level access
    *   Use uniform bucket-level access
    
*   Make data public
*   Public access prevention
    
    *   About public access prevention
    *   Use public access prevention
    
*   Bucket IP filtering
    
    *   About bucket IP filtering
    *   Create a bucket with IP filtering rules
    *   Create or update IP filtering rules on a bucket
    *   Get IP bucket filtering rules
    *   List bucket IP filtering rules
    *   Delete bucket IP filtering rules
    *   Disable bucket IP filtering
    *   Bypass bucket IP filtering rules
    
*   Authenticate with V4 signing
    
    *   About signed URLs
    *   V4 signing process with Cloud Storage tools
    *   V4 signing process with your own program
    *   Canonical requests
    *   Signatures
    *   Create signatures
    
*   Encryption
    
    *   Data encryption options
    *   Customer-managed encryption keys (CMEK)
        
        *   About CMEK
        *   Use CMEK
        
    *   Customer-supplied encryption keys (CSEK)
        
        *   About CSEK
        *   Use CSEK
        
    *   Standard encryption
    *   Client-side keys
    *   Enforce or restrict encryption types
    
*   Enforce bucket and object behaviors with organization policy constraints
    
    *   Predefined constraints
    *   Custom constraints
    
*   Protection, backup, and recovery
    
*   Data protection, backup, and recovery options
*   Availability and durability
    
    *   About data availability and durability
    *   Manage turbo replication
    *   Use cross-bucket replication
    
*   Recover deleted data
    
    *   About soft delete
    *   Set and manage soft delete policies
    *   Restore soft-deleted objects
    *   Restore soft-deleted buckets
    *   Set a default soft delete retention duration
    *   Use soft delete recommendations
    *   Disable soft delete
    
*   Object Versioning
    
    *   About Object Versioning
    *   Enable or disable Object Versioning
    *   Use versioned objects
    
*   Object holds
    
    *   About object holds
    *   Use object holds
    
*   Bucket Lock
    
    *   About Bucket Lock
    *   Use and lock retention policies
    
*   Object Retention Lock
    
    *   About Object Retention Lock
    *   Enable and use object retention configurations
    
*   Monitor
    
*   Monitor data and usage
    
    *   Bucket monitoring
    *   Bandwidth usage monitoring
    *   Storage usage monitoring
    *   Access monitoring data
    
*   Pub/Sub notifications for Cloud Storage
    
    *   About Pub/Sub notifications
    *   Configure Pub/Sub notifications
    
*   Cloud Audit Logs for Cloud Storage
    
    *   Use Cloud Audit Logs with Cloud Storage
    *   Use Cloud Audit Logs with storage batch operations
    *   Use Cloud Audit Logs with Storage Insights
    
*   Use Cloud Logs with storage batch operations
*   Usage logs and storage logs
*   Use gRPC client-side metrics
*   Use client-side traces
*   Migrate and integrate
    
*   Migrate from Amazon S3 to Cloud Storage
    
    *   Simple migration
    *   Full migration
    
*   Serve website content
    
    *   Host a static website
    *   Static website example and tips
    
*   Best practices for media workloads
*   Use Cloud Storage with big data
*   Integration with Google Cloud services and tools
*   Use the Cloud Storage MCP server
*   Connect LLMs with MCP toolbox for databases
*   Interoperability
*   Troubleshoot
    
*   Troubleshoot common issues
*   Troubleshoot Storage Insights issues
*   Troubleshoot Cloud Storage FUSE issues

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
*   Guides

Send feedback

# Overview of caching in Cloud Storage FUSE Stay organized with collections Save and categorize content based on your preferences.

This document provides details on caching options available for Cloud Storage FUSE and how each cache type can be configured.

To help increase the performance of data retrieval, Cloud Storage FUSE offers three types of optional caching. Use the following table to learn more about each type of caching:

Caching type

Description

File caching

Accelerates file data reads for read-heavy workloads that repetitively access data, especially artificial intelligence and machine learning training where the same large files are read multiple times, significantly reducing latency.

List caching

Accelerates directory listing operations for workloads that frequently list the entire contents of a directory, such as iterating over a large set of files at the beginning of a processing job, improving the speed of directory traversal.

Stat caching

Accelerates file metadata operations for applications that frequently check file attributes, which is common for many applications that repeatedly check if a file has changed, reducing the number of `GetMetadata` calls for Cloud Storage.

**Note:** Starting Cloud Storage FUSE v3.8.0, Type cache has been merged into Stat cache.

## Considerations

*   Enabling caching can increase performance but reduce consistency, which usually occurs when you access the same bucket using multiple clients with a high change rate. To reduce the impact on consistency, we recommend mounting buckets as read-only. To learn more about caching behavior, see Cloud Storage FUSE semantics in the Cloud Storage FUSE GitHub documentation.
    
*   To avoid cache thrashing, ensure that your entire dataset fits into the cache capacity. Also, consider the maximum capacity and performance that your cache media can provide. If you hit the provisioned cache's maximum performance, capacity limit, or both, it's beneficial to read directly from Cloud Storage which has much higher limits than Cloud Storage FUSE.
    

## Read path for cached data

The Cloud Storage FUSE cache accelerates repeat reads after they've been ingested to the cache. Both first-time reads and cache misses go directly to Cloud Storage and are subject to normal Cloud Storage network latencies. To improve first-time read performance, see Pre-populate the metadata cache.

## What's next

*   Learn more about each caching type:
    
    *   File caching
        
    *   List caching
        
    *   Stat caching
        

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-06-09 UTC.

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
*   עברית
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어