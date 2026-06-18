

# What is AWS Lake Formation?
<a name="what-is-lake-formation"></a>

Welcome to the AWS Lake Formation Developer Guide.

AWS Lake Formation helps you centrally govern, secure, and globally share data for analytics and machine learning. With Lake Formation, you can manage fine-grained access control for your data lake data on Amazon Simple Storage Service (Amazon S3) and its metadata in AWS Glue Data Catalog.

Lake Formation provides its own permissions model that augments the IAM permissions model. Lake Formation permissions model enables fine-grained access to data stored in data lakes as well as external data sources such as Amazon Redshift data warehouses, Amazon DynamoDB databases, and third-party data sources through a simple grant or revoke mechanism, much like a relational database management system (RDBMS). Lake Formation permissions are enforced using granular controls at the column, row, and cell-levels across AWS analytics and machine learning services, including Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue. 

With Lake Formation hybrid access mode for AWS Glue Data Catalog (Data Catalog), you can secure and access the cataloged data using both Lake Formation permissions and IAM permissions policies for Amazon S3 and AWS Glue actions. With hybrid access mode, data administrators can onboard Lake Formation permissions selectively and incrementally, focusing on one data lake use case at a time.

Lake Formation also allows you to share data internally and externally across multiple AWS accounts, AWS organizations or directly with IAM principals in another account providing fine-grained access to the Data Catalog metadata and underlying data. 

**Topics**
+ [Lake Formation features](#lake-formation-features)
+ [AWS Lake Formation: How it works](how-it-works.md)
+ [Lake Formation components](how-it-works-components.md)
+ [Lake Formation terminology](how-it-works-terminology.md)
+ [AWS service integrations with Lake Formation](service-integrations.md)
+ [Additional Lake Formation resources](additional-resources.md)
+ [Getting started with Lake Formation](#what-is-lake-formation-start)

## Lake Formation features
<a name="lake-formation-features"></a>

Lake Formation helps you break down data silos and combine different types of structured and unstructured data into a centralized repository. First, identify existing data stores in Amazon S3 or relational and NoSQL databases, and move the data into your data lake. Then crawl, catalog, and prepare the data for analytics. Next, provide your users with secure self-service access to the data through their choice of analytics services. 

You can use Lake Formation console to create multi-level federated catalogs in the Data Catalog, and unify data across Amazon S3 data lakes and Amazon Redshift data warehouses. You can also integrate data from your operational databases such as Amazon DynamoDB, and third-party data sources such as Google BigQuery, MySQL, among others. The Data Catalog provides a centralized metadata repository that makes managing and discovering data across disparate systems easier.

For more information, see [Bringing your data into the AWS Glue Data Catalog](bring-your-data-overview.md).

**Topics**
+ [Data ingestion and management](#features-general)
+ [Security management](#Security-management)
+ [Bring your data into the Data Catalog](#data-sharing)

### Data ingestion and management
<a name="features-general"></a>

**Import data from databases already in AWS**  
Once you specify where your existing databases are and provide your access credentials, Lake Formation reads the data and its metadata (schema) to understand the contents of the data source. It then imports the data to your new data lake and records the metadata in a central catalog. With Lake Formation, you can import data from MySQL, PostgreSQL, SQL Server, MariaDB, and Oracle databases running in Amazon RDS or hosted in Amazon EC2. Both bulk and incremental data loading are supported.

**Import data from other external sources**  
You can use Lake Formation to move data from on-premises databases by connecting with Java Database Connectivity (JDBC). Identify your target sources and provide access credentials in the console, and Lake Formation reads and loads your data into the data lake. To import data from databases other than the ones listed above, you can create custom ETL jobs with AWS Glue.

**Catalog and label your data**  
You can use AWS Glue crawlers to read your data in Amazon S3 and extract database and table schema and store that data in a searchable Data Catalog. Then, use Lake Formation [Lake Formation tag-based access control](tag-based-access-control.md) (TBAC) to manage permissions on databases, tables, and columns. For more information about adding tables to the Data Catalog, see [Creating objects in the AWS Glue Data Catalog](populating-catalog.md).

### Security management
<a name="Security-management"></a>

**Define and manage access controls**  
Lake Formation provides a single place to manage access controls for data in your data lake. You can define security policies that restrict access to data at the database, table, column, row, and cell levels. These policies apply to IAM users and roles, and to users and groups when federating through an external identity provider. You can use fine-grained controls to access data secured by Lake Formation within Amazon Redshift Spectrum, Athena, AWS Glue ETL, and Amazon EMR for Apache Spark. Whenever you create IAM identities, make sure to follow IAM best practices. For more information, see [Security best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html) in the IAM User Guide.

**Hybrid access mode**  
 Lake Formation hybrid access mode provides the flexibility to selectively enable Lake Formation permissions for databases and tables in your Data Catalog. With hybrid access mode, you now have an incremental path that allows you to set Lake Formation permissions for a specific set of users without interrupting the permission policies of other existing users or workloads. For more information, see [Hybrid access mode](hybrid-access-mode.md).

**Implement audit logging**  
Lake Formation provides comprehensive audit logs with CloudTrail to monitor access and show compliance with centrally defined policies. You can audit data access history across analytics and machine learning services that read the data in your data lake via Lake Formation. This lets you see which users or roles have attempted to access what data, with which services, and when. You can access audit logs in the same way you access any other CloudTrail logs using the CloudTrail APIs and console. For more information about CloudTrail logs see [Logging AWS Lake Formation API calls using AWS CloudTrail](logging-using-cloudtrail.md). 

**Row and cell-level security**  
Lake Formation provides data filters that allow you to restrict access to a combination of columns and rows. Use row and cell-level security to protect sensitive data like Personal Identifiable Information (PII). For more information about row-level security, see [Data filtering and cell-level security in Lake Formation](data-filtering.md).

**Tag-based access control**  
Use Lake Formation [ attribute-based access control](https://docs.aws.amazon.com/lake-formation/latest/dg/tag-based-access-control.html) to manage hundreds or even thousands of data permissions by creating custom labels called LF-Tags. You can now define LF-Tags and attach them to databases, tables, or columns. Then, share controlled access across analytic, machine learning (ML), and extract, transform, and load (ETL) services for consumption. LF-Tags make sure that data governance can be scaled easily by replacing the policy definitions of thousands of resources with a few logical tags. Lake Formation provides a text-based search over this metadata, so your users can quickly find the data they need to analyze.

**Attribute-based access control**  
Use [ attribute-based access control](https://docs.aws.amazon.com/lake-formation/latest/dg/attribute-based-access-control.html) to grant access on Data Catalog objects. Attribute-based access control (ABAC) is an authorization strategy that defines permissions based on attributes. AWS calls these attributes tags. You can use ABAC to grant access to principals within the same account or in another account on the Data Catalog resources. Any IAM principal with matching IAM tag or session tag keys and values gains access to the resource. You must have grantable permissions on the resources to make these grants. 

**Cross account access**  
Lake Formation permission management capabilities simplify securing and managing distributed data lakes across multiple AWS accounts through a centralized approach, providing fine-grained access control to the Data Catalog and Amazon S3 locations. For more information, see [Cross-account data sharing in Lake Formation](cross-account-permissions.md).

### Bring your data into the Data Catalog
<a name="data-sharing"></a>

The federation capability allows you to create federated catalogs and set up permissions on datasets stored in different data sources like Amazon Redshift without migrating data or metadata into Amazon S3 or AWS Glue Data Catalog. You can use the following methods to bring data and manage permissions on external datasets in Lake Formation:

For more information, see [Bringing your data into the AWS Glue Data Catalog](https://docs.aws.amazon.com/lake-formation/latest/dg/bring-your-data-overview.html).
+ **Bringing data in Amazon Redshift data warehouses into the AWS Glue Data Catalog** – Register an existing [Amazon Redshift](https://docs.aws.amazon.com/redshift/index.html) namespace or a cluster with the Data Catalog, and create a multi-level federated catalog in the Data Catalog. 

  You can access your data using any query engine compatible with Apache Iceberg REST catalog OpenAPI specification, such as Amazon EMR Serverless, and Amazon Athena. 

  For more information, see [Bringing Amazon Redshift data into the AWS Glue Data Catalog](managing-namespaces-datacatalog.md).
+ **Federating into the Data Catalog from external data sources** – Connect the Data Catalog to external data sources using AWS Glue connections, and create federated catalogs to centrally manage access permissions on datasets using Lake Formation. No migration of metadata into the Data Catalog is necessary. 

  For more information, see [Federating into external data sources in the AWS Glue Data Catalog](federated-catalog-data-connection.md).
+ **Integrating Amazon S3 Table Buckets with Data Catalog** – You can publish and catalog Amazon S3 Tables as Data Catalog objects and register the catalog as a Lake Formation data location from Lake Formation console or using AWS Glue APIs.

  For more information, see [Amazon S3 Tables integration with AWS Glue Data Catalog and AWS Lake Formation](create-s3-tables-catalog.md).
+ **Create catalogs to manage Amazon Redshift tables in the Data Catalog** – You may not have an Amazon Redshift producer cluster or an Amazon Redshift datashare available today, but want to create and manage Amazon Redshift tables using Data Catalog. You can get started by creating an AWS Glue managed catalog using the `glue:CreateCatalog` API or the AWS Lake Formation console by setting the catalog type as `Managed` and `Catalog source` as **Redshift**.

  For more information, see [Creating an Amazon Redshift managed catalog in the AWS Glue Data Catalog](create-rms-catalog.md).
+ **Integrating Lake Formation with Amazon Redshift data sharing **– Use Lake Formation to centrally manage database, table, column, and row-level access permissions of [Amazon Redshift](https://docs.aws.amazon.com/redshift/index.html) datashares and restrict user access to objects within a datashare.
+ **Connecting Data Catalog to external metastores** – Connect AWS Glue Data Catalog to external metastores to manage access permissions on data sets in Amazon S3 using Lake Formation. No migration of metadata into the Data Catalog is necessary. 

   For more information, see [Managing permissions on datasets that use external metastores](data-sharing-hms.md). 
+ **Integrating Lake Formation with AWS Data Exchange** – Lake Formation supports licensing access to your data through AWS Data Exchange. If you're interested in licensing your Lake Formation data, see [What is AWS Data Exchange](https://docs.aws.amazon.com/data-exchange/latest/userguide/what-is.html) in the *AWS Data Exchange User Guide*.

## Getting started with Lake Formation
<a name="what-is-lake-formation-start"></a>

We recommend that you start with the following sections:
+ [AWS Lake Formation: How it works](how-it-works.md) — Learn about essential terminology and how the various components interact.
+ [Getting started with Lake Formation](getting-started-setup.md) — Get information about prerequisites, and complete important setup tasks.
+ [AWS Lake Formation tutorials](getting-started-tutorials.md) — Follow step-by-step tutorials to learn how to use Lake Formation.
+ [Security in AWS Lake Formation](security.md) — Understand how you can help secure access to data in Lake Formation.