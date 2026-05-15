

# What is Amazon Aurora DSQL?
<a name="what-is-aurora-dsql"></a>

Amazon Aurora DSQL is a serverless, distributed relational database service optimized for transactional workloads. Aurora DSQL offers virtually unlimited scale and doesn't require you to manage infrastructure. The active-active highly available architecture provides 99.99% single-Region and 99.999% multi-Region availability.

## When to use Aurora DSQL
<a name="when-to-use-dsql"></a>

Aurora DSQL is optimized for transactional workloads that benefit from ACID transactions and a relational data model. Because it's serverless, Aurora DSQL is ideal for application patterns of microservice, serverless, and event-driven architectures. Aurora DSQL is PostgreSQL-compatible, so you can use familiar drivers, object-relational mappings (ORMs), frameworks, and SQL features.

Aurora DSQL automatically manages system infrastructure and scales compute, I/O, and storage based on your workload. Because you have no servers to provision or manage, you don't have to worry about maintenance downtime related to provisioning, patching, or infrastructure upgrades.

Aurora DSQL helps you to build and maintain enterprise applications that are always available at any scale. The active-active serverless design automates failure recovery, so you don't need to worry about traditional database failover. Your applications benefit from Multi-AZ and multi-Region availability, and you don't have to be concerned about eventual consistency or missing data related to failovers.

## Key features in Aurora DSQL
<a name="what-is-core-components"></a>

The following key features help you create a serverless distributed database to support your high-availability applications:

**Distributed architecture**  
Aurora DSQL is composed of the following multi-tenant components:  
+ Relay and connectivity
+ Compute and databases
+ Transaction log, concurrency control, and isolation
+ Storage
A control plane coordinates the preceding components. Each component provide redundancy across three Availability Zones (AZs), with automatic cluster scaling and self-healing in case of component failures. To learn more about how this architecture supports high availability, see [Resilience in Amazon Aurora DSQL](disaster-recovery-resiliency.md).

**Single-Region and multi-Region clusters**  
Aurora DSQL clusters provide the following benefits:  
+ Synchronous data replication
+ Consistent read operations
+ Automatic failure recovery
+ Data consistency across multiple AZs or Regions
If an infrastructure component fails, Aurora DSQL automatically routes requests to healthy infrastructure without manual intervention. Aurora DSQL provides *atomicity, consistency, isolation, and durability (ACID) transactions* with strong consistency, snapshot isolation, atomicity, and cross-AZ and cross-Region durability.  
Multi-Region peered clusters provide the same resilience and connectivity as single-Region clusters. But they improve availability by offering two Regional endpoints, one in each peered cluster Region. Both endpoints of a peered cluster present a single logical database. They are available for concurrent read and write operations, and provide strong data consistency. You can build applications that run in multiple Regions at the same time for performance and resilience—and know that readers always see the same data.

**Compatibility with PostgreSQL**  
The distributed database layer (compute) in Aurora DSQL is based on a current major version of PostgreSQL. You can connect to Aurora DSQL with familiar PostgreSQL drivers and tools, such as `psql`. Aurora DSQL is currently compatible with PostgreSQL version 16 and supports a wide range of PostgreSQL features, expressions, and data types. For more information about the supported SQL features, see [SQL feature compatibility in Aurora DSQL](working-with-postgresql-compatibility.md).

## Region availability for Aurora DSQL
<a name="region-availability"></a>

 With Amazon Aurora DSQL, you can deploy database instances across multiple AWS Regions to support global applications and meet data residency requirements. Region availability determines where you can create and manage Aurora DSQL database clusters. Database administrators and application architects who need to design highly available, globally distributed database systems often need to understand Region support for their workloads. Common use cases include setting up cross-Region disaster recovery, serving users from geographically closer database instances to reduce latency, and maintaining data copies in specific locations for compliance. 

The following table shows the AWS Regions where Aurora DSQL is currently available and the endpoint for each AWS Region. 


| Region Name | Region | Endpoint | Protocol | 
| --- | --- | --- | --- | 
| US East (Ohio) | us-east-2 |  dsql.us-east-2.api.aws <br /> dsql-fips.us-east-2.api.aws  | HTTPS<br />HTTPS | 
| US East (N. Virginia) | us-east-1 |  dsql.us-east-1.api.aws <br /> dsql-fips.us-east-1.api.aws  | HTTPS<br />HTTPS | 
| US West (Oregon) | us-west-2 |  dsql.us-west-2.api.aws <br /> dsql-fips.us-west-2.api.aws  | HTTPS<br />HTTPS | 
| Asia Pacific (Hong Kong) | ap-east-1 |  dsql.ap-east-1.api.aws  | HTTPS | 
| Asia Pacific (Melbourne) | ap-southeast-4 |  dsql.ap-southeast-4.api.aws  | HTTPS | 
| Asia Pacific (Mumbai) | ap-south-1 |  dsql.ap-south-1.api.aws  | HTTPS | 
| Asia Pacific (Osaka) | ap-northeast-3 |  dsql.ap-northeast-3.api.aws  | HTTPS | 
| Asia Pacific (Seoul) | ap-northeast-2 |  dsql.ap-northeast-2.api.aws  | HTTPS | 
| Asia Pacific (Singapore) | ap-southeast-1 |  dsql.ap-southeast-1.api.aws  | HTTPS | 
| Asia Pacific (Sydney) | ap-southeast-2 |  dsql.ap-southeast-2.api.aws  | HTTPS | 
| Asia Pacific (Tokyo) | ap-northeast-1 |  dsql.ap-northeast-1.api.aws  | HTTPS | 
| Canada (Central) | ca-central-1 |  dsql.ca-central-1.api.aws <br /> dsql-fips.ca-central-1.api.aws  | HTTPS<br />HTTPS | 
| Canada West (Calgary) | ca-west-1 |  dsql.ca-west-1.api.aws <br /> dsql-fips.ca-west-1.api.aws  | HTTPS<br />HTTPS | 
| Europe (Frankfurt) | eu-central-1 |  dsql.eu-central-1.api.aws  | HTTPS | 
| Europe (Ireland) | eu-west-1 |  dsql.eu-west-1.api.aws  | HTTPS | 
| Europe (London) | eu-west-2 |  dsql.eu-west-2.api.aws  | HTTPS | 
| Europe (Paris) | eu-west-3 |  dsql.eu-west-3.api.aws  | HTTPS | 
| Europe (Stockholm) | eu-north-1 |  dsql.eu-north-1.api.aws  | HTTPS | 
| South America (São Paulo) | sa-east-1 |  dsql.sa-east-1.api.aws  | HTTPS | 

### Multi-Region cluster availability for Aurora DSQL
<a name="aurora-dsql-multi-region-availability"></a>

You can create Aurora DSQL multi-Region clusters within specific AWS Region sets. Each Region set groups geographically related Regions that can work together in a multi-Region cluster.

#### US Regions
<a name="aurora-dsql-us-regions"></a>
+ US East (N. Virginia)
+ US East (Ohio)
+ US West (Oregon)

#### Asia Pacific Regions
<a name="aurora-dsql-asia-pacific-regions"></a>
+ Asia Pacific (Osaka)
+ Asia Pacific (Seoul)
+ Asia Pacific (Tokyo)

#### European Regions
<a name="aurora-dsql-european-regions"></a>
+ Europe (Frankfurt)
+ Europe (Ireland)
+ Europe (London)
+ Europe (Paris)

#### Important Limitations
<a name="aurora-dsql-multi-region-limitations"></a>

Multi-Region clusters must be created within a single Region set. For example, you can't create a cluster that includes both US East (N. Virginia) and Europe (Ireland) Regions.

**Important**  
Aurora DSQL currently doesn't support cross-continent multi-Region clusters.

## Pricing for Aurora DSQL
<a name="dsql-pricing"></a>

For cost information, see [Aurora DSQL pricing](https://aws.amazon.com/rds/aurora/dsql/pricing/).

## What's next?
<a name="dsql-whats-next"></a>

For information about the core components in Aurora DSQL and to get started with the service, see the following:
+ [Getting started with Aurora DSQL](getting-started.md)
+ [SQL feature compatibility in Aurora DSQL](working-with-postgresql-compatibility.md)
+ [Accessing Aurora DSQL with PostgreSQL-compatible clients ](accessing.md)
+ [Aurora DSQL and PostgreSQL](working-with.md)