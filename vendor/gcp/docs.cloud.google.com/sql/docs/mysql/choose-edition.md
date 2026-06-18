# Choose a Cloud SQL edition

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   MySQL
*   Guides

Send feedback

# Choose a Cloud SQL edition Stay organized with collections Save and categorize content based on your preferences.

MySQL   |  PostgreSQL   |  SQL Server

When you create a new instance, you must choose a Cloud SQL edition. The edition you choose affects the machine series and location you can use for your instance. For more information about the requirements and decisions you must make before creating a new instance, see Plan and prepare overview.

Cloud SQL for MySQL editions use a tier-based pricing model. Each edition provides different performance, availability, observability, and data protection characteristics to support your business and application needs. Cloud SQL offers the following editions:

*   **Cloud SQL Enterprise Plus edition**: provides enhanced performance, availability, and observability to run applications. This edition also includes the core capabilities of Cloud SQL.
*   **Cloud SQL Enterprise edition**: provides all core capabilities of Cloud SQL and is suitable for applications with less stringent availability and performance requirements.

For details about Cloud SQL editions and the enhancements offered by the Cloud SQL Enterprise Plus edition, see Cloud SQL editions overview.

## Cloud SQL key features

The following table provides an overview of key feature enhancements available in Cloud SQL Enterprise Plus edition compared to Cloud SQL Enterprise edition:

**Cloud SQL Enterprise Plus edition**

**Cloud SQL Enterprise edition**

**Database versions**

MySQL 8.0, 8.4  

**Note:** If the database version for your instance is MySQL 8.4, then the default Cloud SQL edition is Enterprise Plus.

MySQL 5.6, 5.7, 8.0, 8.4

**Availability SLA**

99.99% (includes maintenance)

99.95% (excludes maintenance)

**_Performance_**

**Machine series**

N2  
C4A

General purpose shared core  
General purpose dedicated core  
N4

**Machine configuration limits**

**N2 machine series**  
Up to 128 vCPU  
Up to 864 GB RAM  
1:8 core:memory ratio  
  
**C4A machine series**  
Up to 72 vCPU  
Up to 576 GB RAM  
1:8 core:memory ratio

**General purpose shared core**  
1 vCPU  
Up to 1.7 GB RAM  
1:6.5 core:memory ratio  
  
**General purpose dedicated core**  
Up to 96 vCPU  
Up to 624 GB RAM  
1:6.5 core:memory ratio  
  
**N4 machine series**  
Up to 80 vCPU  
Up to 624 GB RAM  
1:8 core:memory ratio

**Data cache**  

Yes

No

**Optimized writes**  

Yes

No

**Point-in-time log retention**  

Up to 35 days

Up to 7 days

**Read pools**  

Yes

No

**_Availability_**

**Maintenance downtime**

< 1 second

< 60 seconds

**Planned operations downtime**  

Sub-second downtime

Few minutes

**Advanced disaster recovery (DR)**  

Yes

No

**Write endpoint for advanced disaster recovery (DR)**  

Yes

No

**Write endpoint connectivity**  

Yes

No

**Managed Connection Pooling**  

Yes

No

**_Observability_**

**AI-assisted troubleshooting**  

Yes

No

**Query insights**  

30 day metric retention  
1 MB query length  
200 query plan sample maximum  
Wait event analysis  
Index advisor recommendations

7 day metric retention  
4500 bytes query length  
20 query plan sample maximum

**Enhanced recommenders**  

Yes

No

## What's next

*   Plan and prepare to create a new instance.
*   Cloud SQL editions overview.
*   Machine series overview.
*   Create a new instance.

Send feedback