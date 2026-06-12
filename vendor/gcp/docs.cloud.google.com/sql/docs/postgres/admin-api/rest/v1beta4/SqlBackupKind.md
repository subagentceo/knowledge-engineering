# SqlBackupKind

    
    
      
    

    
      
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

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/sql-color.svg)

*   Cloud SQL
*   PostgreSQL

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

*   Cloud SQL for PostgreSQL
    
*   All APIs and reference
*   Error codes
*   Metrics
    
    *   Cloud SQL metrics
    
*   REST Reference
    
    *   Cloud SQL Admin API
    *   v1
        
        *   REST Resources
            
        *   Backups
            
            *   Overview
            *   CreateBackup
            *   DeleteBackup
            *   GetBackup
            *   ListBackups
            *   UpdateBackup
            
        *   backupRuns
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            
        *   connect
            
            *   Overview
            *   generateEphemeralCert
            *   get
            
        *   databases
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   update
            
        *   flags
            
            *   Overview
            *   list
            
        *   instances
            
            *   Overview
            *   ListServerCertificates
            *   RotateServerCertificate
            *   addServerCa
            *   addServerCertificate
            *   clone
            *   delete
            *   demote
            *   demoteMaster
            *   executeSql
            *   export
            *   failover
            *   get
            *   import
            *   insert
            *   list
            *   listServerCas
            *   patch
            *   pointInTimeRestore
            *   preCheckMajorVersionUpgrade
            *   promoteReplica
            *   reencrypt
            *   resetSslConfig
            *   restart
            *   restoreBackup
            *   rotateServerCa
            *   startReplica
            *   stopReplica
            *   switchover
            *   truncateLog
            *   update
            
        *   operations
            
            *   Overview
            *   cancel
            *   get
            *   list
            
        *   projects.instances
            
            *   Overview
            *   getDiskShrinkConfig
            *   getLatestRecoveryTime
            *   performDiskShrink
            *   rescheduleMaintenance
            *   startExternalSync
            *   verifyExternalSyncSettings
            
        *   sslCerts
            
            *   Overview
            *   createEphemeral
            *   delete
            *   get
            *   insert
            *   list
            
        *   tiers
            
            *   Overview
            *   list
            
        *   users
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   update
            
        *   Types
            
        *   BakType
        *   DiskEncryptionConfiguration
        *   DiskEncryptionStatus
        *   ExternalSyncMode
        *   ExternalSyncParallelLevel
        *   MigrationType
        *   MySqlSyncConfig
        *   OperationError
        *   SqlBackupKind
        *   SqlDatabaseVersion
        
    *   v1beta4
        
        *   REST Resources
            
        *   backupRuns
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            
        *   backups
            
            *   Overview
            *   createBackup
            *   deleteBackup
            *   getBackup
            *   listBackups
            *   updateBackup
            
        *   connect
            
            *   Overview
            *   generateEphemeralCert
            *   get
            
        *   databases
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   patch
            *   update
            
        *   flags
            
            *   Overview
            *   list
            
        *   instances
            
            *   Overview
            *   ListServerCertificates
            *   RotateServerCertificate
            *   addServerCa
            *   addServerCertificate
            *   clone
            *   delete
            *   demote
            *   demoteMaster
            *   executeSql
            *   export
            *   failover
            *   get
            *   import
            *   insert
            *   list
            *   listServerCas
            *   patch
            *   pointInTimeRestore
            *   preCheckMajorVersionUpgrade
            *   promoteReplica
            *   reencrypt
            *   resetSslConfig
            *   restart
            *   restoreBackup
            *   rotateServerCa
            *   startReplica
            *   stopReplica
            *   switchover
            *   truncateLog
            *   update
            
        *   operations
            
            *   Overview
            *   cancel
            *   get
            *   list
            
        *   projects.instances
            
            *   Overview
            *   getDiskShrinkConfig
            *   getLatestRecoveryTime
            *   performDiskShrink
            *   rescheduleMaintenance
            *   startExternalSync
            *   verifyExternalSyncSettings
            
        *   sslCerts
            
            *   Overview
            *   createEphemeral
            *   delete
            *   get
            *   insert
            *   list
            
        *   tiers
            
            *   Overview
            *   list
            
        *   users
            
            *   Overview
            *   delete
            *   get
            *   insert
            *   list
            *   update
            
        *   Types
            
        *   BakType
        *   DiskEncryptionConfiguration
        *   DiskEncryptionStatus
        *   ExternalSyncMode
        *   ExternalSyncParallelLevel
        *   MigrationType
        *   MySqlSyncConfig
        *   OperationError
        *   SqlBackupKind
        *   SqlDatabaseVersion
        
    
*   MCP reference
    
    *   Overview
    *   Cloud SQL server
        
        *   Overview
        *   Tools
            
            *   list_instances
            *   get_instance
            *   create_instance
            *   execute_sql
            *   execute_sql_readonly
            *   get_operation
            *   create_user
            *   update_user
            *   clone_instance
            *   update_instance
            *   create_backup
            *   restore_backup
            *   list_users
            *   import_data
            *   postgres_upgrade_precheck
            
        
    *   Database Insights server
        
        *   Overview
        *   Tools
            
            *   get_query_metrics
            *   get_system_metrics
            
        
    
*   API overview
    
    *   Use the Cloud SQL Admin API
    
*   API basics
    
    *   Authorize requests
    *   Performance tips
    
*   Client libraries and sample code
*   Stored procedures
*   Launch checklist
*   gcloud sql
    
    *   About the gcloud CLI
    *   gcloud sql
    
*   Cloud IAM references for Cloud SQL
    
    *   Cloud SQL permissions
    *   Cloud SQL roles
    

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
*   Databases
*   Cloud SQL
*   PostgreSQL
*   Reference

Send feedback

# SqlBackupKind Stay organized with collections Save and categorize content based on your preferences.

Defines the supported backup kinds

 

Enums

`SQL_BACKUP_KIND_UNSPECIFIED`

This is an unknown BackupKind.

`SNAPSHOT`

Snapshot-based backups.

`PHYSICAL`

Physical backups.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2025-05-30 UTC.

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