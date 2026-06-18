

# What is the lakehouse architecture of Amazon SageMaker?
<a name="what-is-smlh"></a>

The lakehouse architecture of Amazon SageMaker unifies data across Amazon S3 data lakes and Amazon Redshift data warehouses so you can work with your data in one place. You can bring data from operational databases and business applications into your lakehouse in near real-time through zero-ETL integrations. Additionally, run federated queries on data stored across multiple external data sources to access and query your data in-place. The lakehouse architecture is compatible with the Apache Iceberg open standard, giving you the flexibility to use your preferred analytics engine. Secure your data in the lakehouse architecture by defining fine-grained permissions that are enforced across all analytics and machine learning (ML) tools and engines.

The lakehouse architecture works by creating a single catalog where you can discover and query all your data. When you run a query, AWS Lake Formation checks your permissions while the query engine processes data directly from its original storage location, whether that's Amazon S3 or Amazon Redshift.

The lakehouse architecture leverages [Apache Iceberg](https://iceberg.apache.org/) table format for enhanced big data storage and analysis across multiple analytics engines. lakehouse architecture introduces Apache Iceberg REST API interface as part of the AWS Glue Data Catalog to support Iceberg compatible analytics query engines, both AWS and non-AWS. You can access both the Amazon S3 data lakes including Amazon S3 Tables and Amazon Redshift warehouse tables as Iceberg tables using the supported integrated engines, such as Amazon Athena and Spectrum.

## What is a data lakehouse?
<a name="lakehouse-intro"></a>

A data lakehouse is an architecture that unifies the scalability and cost-effectiveness of data lakes with the performance and reliability characteristics of data warehouses. This approach eliminates the traditional trade-offs between storing diverse data types and maintaining query performance for analytical workloads.

The lakehouse architecture provides the following key benefits:
+ **Transactional consistency** – ACID compliance ensures reliable concurrent operations
+ **Schema management** – Flexible schema evolution without breaking existing queries
+ **Compute-storage separation** – Independent scaling of processing and storage resources
+ **Open standards** – Compatibility with Apache Iceberg open standard
+ **Single source of truth** – Eliminates data silos and redundant storage costs
+ **Real-time and batch processing** – Supports both streaming and historical analytics
+ **Direct file access** – Enables both SQL queries and programmatic data access
+ **Unified governance** – Consistent security and compliance across all data types