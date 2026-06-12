# Clone a Cloud SQL for MySQL Enterprise Plus Instance

    
    
      
    

    
      
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

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/sql-color.svg)

*   Cloud SQL
*   MySQL

Start free

Overview Guides Reference Samples Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/v8b2f8e7f8a7704cc38c0519ef05e8f889c427cc26f7c8f743e84df2a01b1dee7/clouddocs/images/lockup_full_color.svg)

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

*   Code samples for all products
*   Cloud SQL for MySQL
    
*   All Cloud SQL for MySQL samples
*   Add database flags
*   Clone a Cloud SQL for MySQL Enterprise Plus Instance
*   Clone a Cloud SQL for MySQL instance
*   Configure SSL certificates for TCP connection by using Go
*   Configure SSL certificates for TCP connection by using Python
*   Configure authorized networks
*   Configure public IP for a instance
*   Create MySQL Private IP
*   Create a Cloud SQL for MSSQL instance with a password validation policy
*   Create a TCP connection by using Go
*   Create a TCP connection by using Java
*   Create a TCP connection by using PHP
*   Create a TCP connection by using Python
*   Create a TCP connection when using ADO.NET
*   Create a TCP connection when using Node.js
*   Create a TCP connection with SSL certificates when using Node.js
*   Create a connection using the Cloud SQL Go Connector
*   Create a connection using the Cloud SQL Java Connector
*   Create a connection using the Cloud SQL Python Connector
*   Create a primary MySQL instance for replication
*   Create a read replica Cloud SQL for MySQL instance
*   Create a replica Cloud SQL for MySQL instance
*   Create a socket connection by using Go
*   Create a socket connection by using Java
*   Create a socket connection by using PHP
*   Create a socket connection by using Python
*   Create a socket connection when using ADO.NET
*   Create a socket connection when using Node.js
*   Create a source instance for cloning
*   Create a user in MySQL instance
*   Create an instance with password policy enabled
*   Enforce SSL/TLS encryption
*   Implement exponential backoff when using ADO.NET
*   Manage connections by using ActiveRecord
*   MySQL PDO connection
*   MySQL SQLAlchemy opening and closing connections
*   MySQL servlet connection
*   MySQL—mysql connection
*   Open or close a connection when using ADO.NET
*   Retry a failed connection when using HikariCP
*   Retry a failed connection when using Node.js
*   Retry a failed connection when using SQLAlchemy
*   Run an SQL INSERT statement using Go
*   Schedule automated backups for an instance
*   Set a custom location for backups
*   Set automated backup retention for an instance
*   Set connection pool and overflow limits when using ADO.NET
*   Set connection pool and overflow limits when using Go
*   Set connection pool and overflow limits when using HikariCP
*   Set connection pool and overflow limits when using Node.js
*   Set connection pool and overflow limits when using SQLAlchemy
*   Set the connection duration when using ADO.NET
*   Set the connection duration when using HikariCP
*   Set the connection duration when using SQLAlchemy
*   Set the connection timeout when using ADO.NET
*   Set the connection timeout when using Go
*   Set the connection timeout when using HikariCP
*   Set the connection timeout when using Node.js
*   Set the connection timeout when using PHP
*   Set the connection timeout when using SQLAlchemy
*   Upgrade MySQL instance maintenance version
*   Upgrade the database major version in-place

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
*   MySQL
*   Samples

# Clone a Cloud SQL for MySQL Enterprise Plus Instance Stay organized with collections Save and categorize content based on your preferences.

Create a clone of a MySQL Enterprise instance

## Code sample

### Terraform

To learn how to apply or remove a Terraform configuration, see Basic Terraform commands. For more information, see the Terraform provider reference documentation.

```
resource "google_sql_database_instance" "source" {
  name             = "mysql-enterprise-plus-instance-source-name"
  region           = "us-central1"
  database_version = "MYSQL_8_0"
  settings {
    tier    = "db-perf-optimized-N-2"
    edition = "ENTERPRISE_PLUS"
  }
  # set `deletion_protection` to true, will ensure that one cannot accidentally delete this instance by
  # use of Terraform whereas `deletion_protection_enabled` flag protects this instance at the GCP level.
  deletion_protection = false
}

resource "google_sql_database_instance" "clone" {
  name             = "mysql-enterprise-plus-instance-clone-name"
  region           = "us-central1"
  database_version = "MYSQL_8_0"
  settings {
    tier    = "db-perf-optimized-N-2"
    edition = "ENTERPRISE_PLUS"
  }
  clone {
    source_instance_name = google_sql_database_instance.source.id
  }
  # set `deletion_protection` to true, will ensure that one cannot accidentally delete this instance by
  # use of Terraform whereas `deletion_protection_enabled` flag protects this instance at the GCP level.
  deletion_protection = false
}
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

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