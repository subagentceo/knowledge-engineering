

# What is the AWS Schema Conversion Tool?
<a name="CHAP_Welcome"></a>

You can use the AWS Schema Conversion Tool (AWS SCT) to convert your existing database schema from one database engine to another. You can convert relational OLTP schema, or data warehouse schema. Your converted schema is suitable for an Amazon Relational Database Service (Amazon RDS) MySQL, MariaDB, Oracle, SQL Server, PostgreSQL DB, an Amazon Aurora DB cluster, or an Amazon Redshift cluster. The converted schema can also be used with a database on an Amazon EC2 instance or stored as data on an Amazon S3 bucket.

AWS SCT supports several industry standards, including Federal Information Processing Standards (FIPS), for connections to an Amazon S3 bucket or another AWS resource. AWS SCT is also compliant with Federal Risk and Authorization Management Program (FedRAMP). For details about AWS and compliance efforts, see [AWS services in scope by compliance program](https://aws.amazon.com/compliance/services-in-scope/).

AWS SCT supports the following OLTP conversions. 


****  

| Source database | Target database | 
| --- | --- | 
| IBM Db2 for z/OS (version 12) | Amazon Aurora MySQL-Compatible Edition (Aurora MySQL), Amazon Aurora PostgreSQL-Compatible Edition (Aurora PostgreSQL), MySQL, PostgreSQL<br /> For more information, see [Connecting to IBM DB2 for z/OS](CHAP_Source.DB2zOS.md).  | 
| IBM Db2 LUW (versions 9.1, 9.5, 9.7, 10.5, 11.1, and 11.5) | Aurora MySQL, Aurora PostgreSQL, MariaDB, MySQL, PostgreSQL<br /> For more information, see [IBM Db2 LUW databases](CHAP_Source.DB2LUW.md).  | 
| Microsoft Azure SQL Database | Aurora MySQL, Aurora PostgreSQL, MySQL, PostgreSQL<br /> For more information, see [Connecting to Azure SQL](CHAP_Source.AzureSQL.md).  | 
| Microsoft SQL Server (version 2008 R2, 2012, 2014, 2016, 2017, 2019, and 2022) | Aurora MySQL, Aurora PostgreSQL, Babelfish for Aurora PostgreSQL (only for assessment reports), MariaDB, Microsoft SQL Server, MySQL, PostgreSQL <br /> For more information, see [SQL Server databases](CHAP_Source.SQLServer.md).  | 
| MySQL (version 5.5 and higher) | Aurora PostgreSQL, MySQL, PostgreSQL<br /> For more information, see [Using MySQL as a source](CHAP_Source.MySQL.md). <br />You can migrate schema and data from MySQL to an Aurora MySQL DB cluster without using AWS SCT. For more information, see [Migrating data to an Amazon Aurora DB cluster](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Migrate.html).  | 
| Oracle (version 10.1 and higher) |  Aurora MySQL, Aurora PostgreSQL, MariaDB, MySQL, Oracle, PostgreSQL <br /> For more information, see [Oracle databases](CHAP_Source.Oracle.md).  | 
| PostgreSQL (version 9.1 and higher) | Aurora MySQL, Aurora PostgreSQL, MySQL, PostgreSQL<br /> For more information, see [PostgreSQL databases](CHAP_Source.PostgreSQL.md).  | 
| SAP ASE (versions 12.5.4, 15.0.2, 15.5, 15.7, and 16.0) |  Aurora MySQL, Aurora PostgreSQL, MariaDB, MySQL, PostgreSQL <br /> For more information, see [SAP databases](CHAP_Source.SAP.md).  | 

AWS SCT supports the following data warehouse conversions. 


****  

| Source data warehouse | Target data warehouse | 
| --- | --- | 
| Amazon Redshift | Amazon Redshift<br /> For more information, see [Amazon Redshift](CHAP_Source.Redshift.md).  | 
| Azure Synapse Analytics | Amazon Redshift<br /> For more information, see [Azure Synapse Analytics as a source](CHAP_Source.AzureSynapse.md).  | 
| BigQuery | Amazon Redshift<br /> For more information, see [BigQuery as a source](CHAP_Source.BigQuery.md).  | 
| Greenplum Database (versions 4.3 and 6.21) | Amazon Redshift<br /> For more information, see [Greenplum databases](CHAP_Source.Greenplum.md).  | 
| Microsoft SQL Server (version 2008 and higher) | Amazon Redshift<br /> For more information, see [SQL Server Data Warehouses](CHAP_Source.SQLServerDW.md).  | 
| Netezza (version 7.0.3 and higher) | Amazon Redshift<br /> For more information, see [Netezza databases](CHAP_Source.Netezza.md).  | 
| Oracle (version 10.1 and higher) | Amazon Redshift<br /> For more information, see [Oracle data warehouse](CHAP_Source.OracleDW.md).  | 
| Snowflake (version 3) | Amazon Redshift<br /> For more information, see [Snowflake](CHAP_Source.Snowflake.md).  | 
| Teradata (version 13 and higher) | Amazon Redshift<br /> For more information, see [Teradata databases](CHAP_Source.Teradata.md).  | 
| Vertica (version 7.2.2 and higher) | Amazon Redshift<br /> For more information, see [Vertica databases](CHAP_Source.Vertica.md).  | 

AWS SCT supports the following data NoSQL database conversions. 


****  

| Source database | Target database | 
| --- | --- | 
| Apache Cassandra (versions 2.1.x, 2.2.16, and 3.11.x) | Amazon DynamoDB<br /> For more information, see [Connecting to Apache Cassandra](CHAP_Source.Cassandra.md).  | 

AWS SCT supports conversions of the following extract, transform, and load (ETL) processes. For more information, see [Converting Data Using ETL](CHAP-converting-etl.md). 


****  

| Source | Target | 
| --- | --- | 
| Informatica ETL scripts | Informatica | 
| Microsoft SQL Server Integration Services (SSIS) ETL packages | AWS Glue or AWS Glue Studio | 
| Shell scripts with embedded commands from Teradata Basic Teradata Query (BTEQ)  | Amazon Redshift RSQL | 
| Teradata BTEQ ETL scripts | AWS Glue or Amazon Redshift RSQL | 
| Teradata FastExport job scripts | Amazon Redshift RSQL | 
| Teradata FastLoad job scripts | Amazon Redshift RSQL | 
| Teradata MultiLoad job scripts | Amazon Redshift RSQL | 

AWS SCT supports the following big data framework migrations. For more information, see [Migrating big data frameworks](CHAP-migrating-big-data.md). 


****  

| Source | Target | 
| --- | --- | 
| Apache Hive (version 0.13.0 and higher) | Hive on Amazon EMR | 
| Apache HDFS | Amazon S3 or HDFS on Amazon EMR | 
| Apache Oozie | AWS Step Functions | 

## Schema conversion overview
<a name="CHAP_Welcome.Overview"></a>

AWS SCT provides a project-based user interface to automatically convert the database schema of your source database into a format compatible with your target Amazon RDS instance. If schema from your source database can't be converted automatically, AWS SCT provides guidance on how you can create equivalent schema in your target Amazon RDS database. 

For information about how to install AWS SCT, see [Installing and Configuring AWS Schema Conversion Tool](CHAP_Installing.md). 

For an introduction to the AWS SCT user interface, see [Navigating the user interface of the AWS SCT](CHAP_UserInterface.md). 

For information on the conversion process, see [Converting database schemas in AWS Schema Conversion Tool](CHAP_Converting.md). 

In addition to converting your existing database schema from one database engine to another, AWS SCT has some additional features that help you move your data and applications to the AWS Cloud: 
+ You can use data extraction agents to extract data from your data warehouse to prepare to migrate it to Amazon Redshift. To manage the data extraction agents, you can use AWS SCT. For more information, see [Migrating data from on-premises data warehouse to Amazon Redshift with AWS Schema Conversion Tool](agents.md). 
+ You can use AWS SCT to create AWS DMS endpoints and tasks. You can run and monitor these tasks from AWS SCT. For more information, see [Integrating AWS Database Migration Service with AWS Schema Conversion Tool](CHAP_DMSIntegration.md). 
+ In some cases, database features can't be converted to equivalent Amazon RDS or Amazon Redshift features. The AWS SCT extension pack wizard can help you install AWS Lambda functions and Python libraries to emulate the features that can't be converted. For more information, see [Using extension packs with AWS Schema Conversion Tool](CHAP_ExtensionPack.md). 
+ You can use AWS SCT to optimize your existing Amazon Redshift database. AWS SCT recommends sort keys and distribution keys to optimize your database. For more information, see [Converting data from Amazon Redshift using AWS Schema Conversion Tool](CHAP_Converting.DW.RedshiftOpt.md). 
+ You can use AWS SCT to copy your existing on-premises database schema to an Amazon RDS DB instance running the same engine. You can use this feature to analyze potential cost savings of moving to the cloud and of changing your license type. 
+ You can use AWS SCT to convert SQL in your C\+\+, C\#, Java, or other application code. You can view, analyze, edit, and save the converted SQL code. For more information, see [Converting application SQL using AWS SCT](CHAP_Converting.App.md). 
+ You can use AWS SCT to migrate extraction, transformation, and load (ETL) processes. For more information, see [Converting Data Using ETL Processes in AWS Schema Conversion Tool](CHAP-converting-etl.md). 

## Providing feedback
<a name="CHAP_Welcome.Feedback"></a>

You can provide feedback about AWS SCT. You can file a bug report, submit a feature request, or provide general information.

**To provide feedback about AWS SCT**

1. Start the AWS Schema Conversion Tool.

1. Open the **Help** menu and then choose **Leave Feedback**. The **Leave Feedback** dialog box appears. 

1. For **Area**, choose **Information**, **Bug report**, or **Feature request**. 

1. For **Source database**, choose your source database. Choose **Any** if your feedback is not specific to a particular database. 

1. For **Target database**, choose your target database. Choose **Any** if your feedback is not specific to a particular database. 

1. For **Title**, type a title for your feedback. 

1. For **Message**, type your feedback. 

1. Choose **Send** to submit your feedback. 