# Introduction to object tables

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

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/bigquery-color.svg)

*   BigQuery

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

*   Discover
    
*   Product overview
*   Try BigQuery using the sandbox
*   Get started
    
*   Console walkthroughs and videos
*   Use the console
    
    *   Explore the console
    *   Load and query data
    *   Use Notebook gallery
    *   Create reservations
    *   Try DataFrames
    
*   Use agents
    
    *   Analyze data with the Colab Data Science Agent
    
*   Use the bq CLI tool
*   Use the client libraries
*   Plan
    
*   Organize resources
*   API dependencies
*   Datasets
    
    *   Introduction
    *   Create datasets
    *   List datasets
    *   Cross-region replication
    *   Managed disaster recovery
    *   Migrate to managed disaster recovery
    *   Dataset data retention
    
*   Tables
    
    *   BigQuery tables
        
        *   Introduction
        *   Create and use tables
        *   Specify table schemas
            
            *   Specify a schema
            *   Specify nested and repeated columns
            *   Specify default column values
            *   Specify ObjectRef values
            
        *   Segment with partitioned tables
            
            *   Introduction
            *   Create partitioned tables
            *   Manage partitioned tables
            *   Query partitioned tables
            
        *   Optimize with clustered tables
            
            *   Introduction
            *   Create clustered tables
            *   Manage clustered tables
            *   Query clustered tables
            
        *   Use metadata indexing
        
    *   External data sources
        
        *   Introduction
        *   BigLake tables
            
            *   Introduction
            *   Create Amazon S3 BigLake tables
            *   Create Azure Blob storage BigLake tables
            *   Create Cloud Storage BigLake tables
            
        *   Object tables
            
            *   Introduction
            *   Create Cloud Storage object tables
            
        *   External tables
            
            *   Introduction
            *   Create Apache Iceberg external tables
            *   Create Bigtable external tables
            *   Create Cloud Storage external tables
            *   Create Google Drive external tables
            
        *   Use metadata caching
        *   Manage Hive partitioned data
        *   Create a table definition file for external data
        *   Federated datasets
            
            *   Create and manage AWS Glue federated datasets
            *   Create Spanner external datasets
            
        
    *   Apache Iceberg managed tables
    
*   Views
    
    *   Overview
    *   Logical views
        
        *   Introduction
        *   Create logical views
        
    *   Materialized views
        
        *   Introduction
        *   Create materialized views
        
    
*   Load, transform, and export
    
*   Introduction
*   Build a data pipeline with Data Engineering Agent
*   Migrate data
    
    *   Introduction
    *   BigQuery Migration Service
    *   Migration assessment
    *   Migrate schema and data
    *   Migrate data pipelines
    *   Use custom organization policies
    *   Migrate SQL
        
        *   Translate SQL queries interactively
        *   Translate SQL queries using the API
        *   Translate SQL queries in batch
        *   Generate metadata for translation and assessment
        *   Transform SQL translations with YAML
        *   Map SQL object names for batch translation
        
    
*   Load data
    
    *   Introduction
    *   Create data integration workflows using the BigQuery web UI
    *   Storage overview
    *   BigQuery Data Transfer Service
        
        *   Introduction
        *   Supported data sources
        *   Data location and transfers
        *   Authorize transfers
        *   Enable transfers
        *   Set up network connections
            
            *   Cloud SQL instance access
            *   AWS VPN and network attachment
            *   Azure VPN and network attachment
            
        *   Manage transfers
        *   Transfer run notifications
        *   Troubleshoot transfer configurations
        *   Use service accounts
        *   Use third-party transfers
        *   Use custom organization policies
        *   Data source change log
        *   Event-driven transfers
        *   Transfer data into Managed Iceberg tables
        
    *   Batch load data
        
        *   Introduction
        *   Auto-detect schemas
        *   Load Avro data
        *   Load Parquet data
        *   Load ORC data
        *   Load CSV data
        *   Load JSON data
        *   Load externally partitioned data
        *   Load data from a Datastore export
        *   Load data from a Firestore export
        *   Load data using the Storage Write API
        *   Load data into partitioned tables
        
    *   Write and read data with the Storage API
        
        *   Read data with the Storage Read API
        *   Write data with the Storage Write API
            
            *   Introduction
            *   Stream data with the Storage Write API
            *   Batch load data with the Storage Write API
            *   Best practices
            *   Supported protocol buffer and Arrow data types
            *   Stream updates with change data capture ingestion
            *   Use the legacy streaming API
            
        
    *   Load data from other Google services
    *   Discover and catalog Cloud Storage data
    *   Load data using third-party apps
    *   Load data using BigQuery Omni operations
    *   Optimize load jobs
    
*   Transform data
    
    *   Introduction
    *   Prepare data
        
        *   Introduction
        *   Prepare data with Gemini
        
    *   Transform with DML
    *   Transform data in partitioned tables
    *   Work with change history
    *   Transform data with pipelines
        
        *   Introduction
        *   Create pipelines
        
    
*   Export data
    
    *   Introduction
    *   Export query results
    *   Export to Cloud Storage
    *   Export to Bigtable
    *   Export to Spanner
    *   Export to AlloyDB
    *   Export to Pub/Sub
    *   Export as Protobuf columns
    
*   ELT tutorials
    
    *   Build ELT for marketing analytics data
    
*   Analyze
    
*   Introduction
*   Explore your data
    
    *   Search for resources
    *   Use table explorer
    *   Profile your data
    *   Data insights
        
        *   About data insights
        *   Generate table insights
        *   Generate dataset insights
        
    *   Analyze with a data canvas
    *   Analyze data with Gemini
    *   Analyze data with the Gemini CLI
    
*   Analyze your data
    
    *   Run a query
    *   Write queries with Gemini
    *   Write query results
    *   Query data with SQL
        
        *   Introduction
        *   Arrays
        *   JSON data
        *   Multi-statement queries
        *   Parameterized queries
        *   Pipe syntax
        *   Analyze data using pipe syntax
        *   Recursive CTEs
        *   Sketches
        *   Table sampling
        *   Time series
        *   Transactions
        *   Wildcard tables
        
    *   Use notebooks
        
        *   Introduction
        *   Use Colab notebooks
            
            *   Introduction
            *   Create notebooks
            *   Explore query results
            *   Visualize query results
            *   Create and share Data Apps
            *   Use Spark
            *   Use Colab Data Science Agent
            
        
    *   Use DataFrames
        
        *   Introduction
        *   Install DataFrames
        *   Manipulate data
        *   Customize Python functions
        *   Use ML and AI
        *   Use the data type system
        *   Manage sessions and I/O
        *   Visualize graphs
        *   Use DataFrames in dbt
        *   Optimize performance
        *   Migrate to DataFrames version 2.0
        *   Use the BigQuery JupyterLab plugin
        
    *   Use geospatial analytics
        
        *   Introduction
        *   Work with geospatial analytics
        *   Work with raster data
        *   Best practices for spatial analysis
        *   Visualize geospatial data
        *   Grid systems for spatial analysis
        *   Geospatial analytics syntax reference
        *   Geospatial analytics tutorials
            
            *   Get started with geospatial analytics
            *   Use geospatial analytics to plot a hurricane's path
            *   Visualize geospatial analytics data in a Colab notebook
            *   Use raster data to analyze temperature
            
        
    *   Routines
        
        *   Introduction
        *   Manage routines
        *   User-defined functions
        *   User-defined functions in Python
        *   User-defined aggregate functions
        *   Table functions
        *   Remote functions
        *   SQL stored procedures
        *   Stored procedures for Apache Spark
        *   Analyze object tables by using remote functions
        *   Remote functions and Translation API tutorial
        
    *   Analyze multimodal data
        
        *   Introduction
        *   Work with ObjectRef values
        *   Analyze multimodal data with SQL and BigQuery DataFrames
        
    *   Search indexes
        
        *   Introduction
        *   Manage search indexes
        *   Search indexed data
        *   Work with text analyzers
        
    *   Run global queries
    *   Access historical data
    *   Use open source Python libraries
    
*   Use BigQuery Graph
    
    *   Introduction
    *   Create and query a graph
    *   Schema overview
    *   Query overview
    *   Query best practices
    *   Work with measures
    *   Use the visual graph modeler
    *   Visualize graphs
    *   Chat with a graph
    *   Work with visualization tools and integrations
    *   Use BigQuery Graph and Spanner Graph
    *   Search a graph
    
*   Manage queries
    
    *   Save queries
        
        *   Introduction
        *   Create saved queries
        
    *   Continuous queries
        
        *   Introduction
        *   Create continuous queries
        *   Use stream-to-stream joins in continuous queries
        *   Understand window aggregation in continuous queries
        
    *   Use cached results
    *   Use sessions
        
        *   Introduction
        *   Work with sessions
        *   Write queries in sessions
        
    *   Troubleshoot queries
    *   Optimize queries
        
        *   Introduction
        *   Use the query plan explanation
        *   Get query performance insights
        *   Optimize query computation
        *   Use history-based optimizations
        *   Optimize storage for query performance
        *   Use materialized views
        *   Use BI Engine
        *   Use nested and repeated data
        *   Optimize functions
        *   Use the advanced runtime
        *   Use primary and foreign keys
        
    *   Paginate with the BigQuery API
    
*   Query external data sources
    
    *   Establish connections
        
        *   Introduction
        *   Create connections
            
            *   Create a Cloud resource connection
            *   Create a default Cloud resource connection
            *   AlloyDB connections
            *   Amazon S3 connections
            *   Apache Spark connections
            *   Azure Blob Storage connections
            *   Cloud SQL connections
            *   SAP Datasphere connections
            *   Spanner connections
            
        *   Manage connections
        *   Configure connections with network attachments
        
    *   Run queries on external data
        
        *   Query BigLake tables
            
            *   Amazon S3 BigLake tables
            *   Azure Blob storage BigLake tables
            *   Cloud Storage BigLake tables
            *   Analyze data with BigQuery Omni
            *   Export query results
                
                *   Export to Amazon S3
                *   Export to Azure Blob Storage
                
            
        *   Query external tables
            
            *   Apache Iceberg external tables
            *   Bigtable external tables
            *   Cloud Storage external tables
            *   Google Drive external tables
            
        *   Run federated queries
            
            *   Introduction
            *   Run AlloyDB federated queries
            *   Run Cloud SQL federated queries
            *   Run SAP Datasphere federated queries
            *   Run Spanner federated queries
            
        *   Analyze other external data types
            
            *   Query open table formats with manifest files
            *   Analyze Salesforce Data Cloud data
            
        
    
*   Use analysis and BI tools
    
    *   Introduction
    *   Use Connected Sheets
    *   Use Tableau Desktop
    *   Use Looker
    *   Use Data Studio
    *   Use third-party tools
    *   Google Cloud Ready - BigQuery
        
        *   Overview
        *   Partners
        
    
*   BigQuery AI
    
*   Introduction
*   Generative AI functions
    
    *   Overview
    *   End-to-end user journeys for generative AI models
    *   Choose a text generation function
    *   Set permissions for generative AI functions
    *   Control costs with token quotas
    *   Optimize costs with model distillation
    *   Cloud AI API functions
        
        *   Overview
        *   Choose a natural language processing function
        *   Choose a document processing function
        
    *   Tutorials
        
        *   Generate text
            
            *   Generate text with Gemini
            *   Generate text with Gemma
            *   Generate text with any supported model
            *   Generate text using AI.GENERATE
            *   Handle quota errors
            *   Analyze images
            *   Perform semantic analysis
            *   Tune text generation models
                
                *   Tune a model
                *   Use tuning and evaluation to improve model performance
                
            
        *   Generate structured data
            
            *   Generate structured data
            
        *   Natural language processing
            
            *   Understand text
            *   Translate text
            
        *   Document processing
            
            *   Process documents
            *   Parse PDFs in a retrieval-augmented generation pipeline
            
        *   Speech recognition
            
            *   Transcribe audio files
            
        *   Computer vision
            
            *   Annotate images
            *   Run inference on image data
            *   Analyze images with an imported classification model
            *   Analyze images with an imported feature vector model
            
        
    
*   Embeddings and vector search
    
    *   Overview
    *   Vector indexes
    *   Manage vector indexes
    *   Automate embedding generation
    *   Tutorials
        
        *   Generate embeddings
            
            *   Generate text embeddings using a remote model
            *   Generate text embeddings using an open model
            *   Generate image embeddings using an LLM
            *   Generate video embeddings using an LLM
            *   Handle quota errors by calling ML.GENERATE_EMBEDDING iteratively
            *   Generate and search multimodal embeddings
            *   Generate text embeddings using pretrained TensorFlow models
            *   Generate embeddings with transformer models in ONNX format
            
        *   Vector search
            
            *   Search embeddings with vector search
            *   Perform semantic search and retrieval-augmented generation
            
        
    
*   Assistive AI
    
    *   Gemini in BigQuery overview
    *   Set up Gemini in BigQuery
    *   Use Cloud Assist
    *   Security and privacy
    *   Gemini in BigQuery locations
    
*   Analyze with conversational analytics agent
    
    *   Overview
    *   Create data agents
    *   Analyze data with conversations
    
*   Machine learning
    
    *   Introduction
    *   Understand user journeys
        
        *   End-to-end user journeys for ML models
        *   End-to-end user journeys for forecasting models
        *   End-to-end user journeys for imported models
        *   The TimesFM time series forecasting model
        *   Reference patterns
        
    *   ML models and MLOps
        
        *   Model creation
        *   Feature engineering and management
            
            *   Feature preprocessing overview
            *   Supported input feature types
            *   Automatic preprocessing
            *   Manual preprocessing
            *   Feature serving
            *   Perform feature engineering with the TRANSFORM clause
            
        *   Hyperparameter tuning overview
        *   Model evaluation overview
        *   Model inference overview
        *   Explainable AI overview
        *   Model weights overview
        *   ML pipelines overview
        *   Model monitoring overview
        *   Manage BigQueryML models in Agent Platform
        
    *   Work with models
        
        *   List models
        *   Manage models
        *   Get model metadata
        *   Update model metadata
        *   Export models
        *   Delete models
        
    *   Classification
    *   Regression
    *   Dimensionality reduction
    *   Clustering
    *   Recommendation
    *   Forecasting
    *   Anomaly detection
    *   Contribution analysis
    *   Tutorials
        
        *   Getting started
            
            *   Get started with BigQuery ML using SQL
            *   Get started with BigQuery ML using the Cloud console
            
        *   Regression and classification
            
            *   Create a linear regression model
            *   Create a logistic regression classification model
            *   Create a boosted trees classification model
            
        *   Clustering
            
            *   Cluster data with a k-means model
            
        *   Recommendation
            
            *   Create recommendations based on explicit feedback with a matrix factorization model
            *   Create recommendations based on implicit feedback with a matrix factorization model
            
        *   Forecasting
            
            *   Forecast a single time series with an ARIMA_PLUS univariate model
            *   Forecast multiple time series with an ARIMA_PLUS univariate model
            *   Forecast time series with a TimesFM univariate model
            *   Scale an ARIMA_PLUS univariate model to millions of time series
            *   Forecast a single time series with a multivariate model
            *   Forecast multiple time series with a multivariate model
            *   Use custom holidays with an ARIMA_PLUS univariate model
            *   Limit forecasted values for an ARIMA_PLUS univariate model
            *   Forecast hierarchical time series with an ARIMA_PLUS univariate model
            
        *   Anomaly detection
            
            *   Anomaly detection with a TimesFM univariate model
            *   Anomaly detection with a multivariate time series
            
        *   Imported and remote models
            
            *   Make predictions with imported TensorFlow models
            *   Make predictions with scikit-learn models in ONNX format
            *   Make predictions with PyTorch models in ONNX format
            *   Make predictions with remote models on Agent Platform
            
        *   Hyperparameter tuning
            
            *   Improve model performance with hyperparameter tuning
            
        *   Export models
            
            *   Export a BigQuery ML model for online prediction
            
        *   Augmented analytics
            
            *   Get data insights from contribution analysis using a summable metric
            *   Get data insights from contribution analysis using a summable ratio metric
            
        
    
*   Administer
    
*   Introduction
*   Understand editions
*   Manage resources
    
    *   Organize resources
    *   Understand reliability
    *   Manage configuration settings
    *   Manage code assets
        
        *   Manage data preparations
        *   Manage notebooks
        *   Manage saved queries
        *   Manage pipelines
        *   Organize code assets with folders
            
            *   Introduction
            *   Create and manage folders
            
        
    *   Manage tables
        
        *   Manage tables
        *   Manage table data
        *   Modify table schemas
        *   Restore deleted tables
        
    *   Manage table clones
        
        *   Introduction
        *   Create table clones
        
    *   Manage table snapshots
        
        *   Introduction
        *   Create table snapshots
        *   Restore table snapshots
        *   List table snapshots
        *   View table snapshot metadata
        *   Update table snapshot metadata
        *   Delete table snapshots
        *   Create periodic table snapshots
        
    *   Manage datasets
        
        *   Manage datasets
        *   Update dataset properties
        *   Restore deleted datasets
        
    *   Manage views and materialized views
        
        *   Get information about views
        *   Manage views
        *   Manage materialized views
        *   Manage materialized view replicas
        
    
*   Schedule resources
    
    *   Introduction
    *   Schedule code assets
        
        *   Schedule data preparations
        *   Schedule notebooks
        *   Schedule pipelines
        *   Schedule DAGs
        
    *   Schedule jobs and queries
        
        *   Run jobs programmatically
        *   Schedule queries
        
    
*   Workload management
    
    *   Introduction
    *   Understand slots
    *   Understand reservations
    *   Manage workloads
        
        *   Work with slot reservations
        *   Manage assignments
        *   Manage commitments
        *   Manage jobs
        *   Manage query queues
        
    *   Plan workloads
        
        *   Estimate capacity requirements
        *   View slot recommendations
        
    *   Legacy reservations
        
        *   Introduction to legacy reservations
        *   Legacy slot commitments
        *   Purchase and manage legacy slot commitments
        *   Work with legacy slot reservations
        
    *   Manage BI Engine
        
        *   Introduction
        *   Reserve BI Engine capacity
        
    
*   Monitor workloads
    
    *   Introduction
    *   Monitor resource utilization
    *   Monitor jobs
    *   Monitor sharing listings
    *   Monitor BI Engine
    *   Monitor Data Transfer Service
    *   Monitor materialized views
    *   Monitor reservations
    *   Monitor continuous queries
    *   Dashboards, charts, and alerts
    *   Set up alerts with scheduled queries
    
*   Optimize resources
    
    *   Control costs
        
        *   Estimate and control costs
        *   Create custom query quotas
        
    *   Optimize with recommendations
        
        *   Introduction
        *   Manage cluster and partition recommendations
        *   Manage materialized view recommendations
        
    *   Organize with labels
        
        *   Introduction
        *   Add labels
        *   View labels
        *   Update labels
        *   Filter using labels
        *   Delete labels
        
    
*   Govern
    
*   Introduction
*   Manage data quality
    
    *   Scan for data quality issues
    *   Use Knowledge Catalog
    
*   Control access to resources
    
    *   Introduction
    *   IAM roles and permissions
    *   Changes to dataset-level access controls
    *   Basic roles and permissions
    *   Control access with IAM
        
        *   Control access to resources with IAM
        *   Control access with tags
        *   Control access with conditions
        *   Control access with custom constraints
        *   Troubleshoot IAM permissions
        
    *   Control access with authorization
        
        *   Authorized datasets
        *   Authorized routines
        *   Authorized views
        *   Tutorials
            
            *   Create an authorized view
            
        
    *   Restrict network access
        
        *   Control access with VPC service controls
        *   Regional endpoints
        
    *   Control column and row access
        
        *   Control access to table columns
            
            *   Introduction to column-level access control
            *   Restrict access with column-level access control
            *   Impact on writes
            
        *   Control access to table rows
            
            *   Introduction to row-level security
            *   Work with row-level security
            *   Use row-level security with other BigQuery features
            *   Best practices for row-level security
            
        *   Manage policy tags
            
            *   Manage policy tags across locations
            *   Best practices for using policy tags
            
        
    *   Protect sensitive data
        
        *   Mask data in table columns
            
            *   Introduction to data masking
            *   Mask column data
            
        *   Anonymize data with differential privacy
            
            *   Use differential privacy
            *   Extend differential privacy
            
        *   Restrict data access using analysis rules
        *   Use Sensitive Data Protection
        
    *   Manage encryption
        
        *   Encryption at rest
        *   Customer-managed encryption keys
        *   Column-level encryption with Cloud KMS
        *   AEAD encryption
        
    
*   Share data
    
    *   Introduction
    *   Configure user roles
    *   Manage data exchanges
    *   Manage listings
    *   Manage subscriptions
    *   View and subscribe to listings
    *   Manage resources with custom constraints
    *   Data clean rooms
        
        *   Introduction
        *   Use query templates
        
    *   Entity resolution
        
        *   Introduction
        *   Use entity resolution
        
    *   VPC Service Controls for Sharing
    *   Stream sharing with Pub/Sub
    *   Commercialize listings on Cloud Marketplace
    
*   Audit
    
    *   Introduction
    *   Audit policy tags
    *   View audit logs
        
        *   Data Policy audit logs
        *   Data Transfer Service audit logs
        *   Sharing audit logs
        *   BigLake API audit logs
        *   BigQuery Migration API audit logs
        
    *   Migrate audit logs
    *   BigQuery audit logs reference
    
*   Develop
    
*   Introduction
*   Authenticate to BigQuery
    
    *   Introduction
    *   Get started
    *   Authenticate as an end user
    *   Authenticate with JSON Web Tokens
    
*   Use the BigQuery MCP server
*   Use the Migration Service MCP server
*   Connect LLMs with MCP toolbox for databases
*   Use BigQuery agent analytics
*   Use ODBC and JDBC drivers
    
    *   Use the Google JDBC driver
    *   Use the Google ODBC driver
    *   Use the Simba ODBC and JDBC drivers
    
*   Version control with repositories and workspaces
    
    *   Use repositories
        
        *   Introduction
        *   Create and manage repositories
        *   Manage code with Git repositories
        
    *   Use workspaces
        
        *   Introduction
        *   Create and manage workspaces
        
    
*   Use the VS Code extension

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
*   Data analytics
*   BigQuery
*   Guides

Send feedback Stay organized with collections Save and categorize content based on your preferences.

# Introduction to object tables

This document describes object tables, which are read-only tables over unstructured data objects that reside in Cloud Storage.

Object tables let you analyze unstructured data in Cloud Storage. You can perform analysis with remote functions or perform inference by using BigQuery ML, and then join the results of these operations with the rest of your structured data in BigQuery.

Like BigLake tables, object tables use access delegation, which decouples access to the object table from access to the Cloud Storage objects. An external connection associated with a service account is used to connect to Cloud Storage, so you only have to grant users access to the object table. This lets you enforce row-level security and manage which objects users have access to.

You can use the `CREATE EXTERNAL TABLE` statement to create an object table, as shown in the following example:

```
CREATE EXTERNAL TABLE `myproject.mydataset.myobjecttable`
WITH CONNECTION `myproject.us.myconnection`
OPTIONS ( object_metadata = 'SIMPLE', uris = ['gs://mybucket/*'] );
```

To learn more about creating object tables, see Create object tables.

**Note:** When managing access for users in external identity providers, replace instances of Google Account principal identifiers—like `user:kiran@example.com`, `group:support@example.com`, and `domain:example.com`—with appropriate Workforce Identity Federation principal identifiers.

## Object table schema

An object table provides a metadata index over the unstructured data objects in a specified Cloud Storage bucket. Each row of the table corresponds to an object, and the table columns correspond to the object metadata generated by Cloud Storage, including any custom metadata.

An object table also contains a `data` pseudocolumn that represents the file content in raw bytes, which is auto-populated when the object table is created. This pseudocolumn is used by the `ML.DECODE_IMAGE` function when you run inference on image data. You can't include the `data` pseudocolumn in queries, and it doesn't appear as part of the object table schema.

The following table describes the fixed schema used by object tables:

**Field name**

**Type**

**Mode**

**Description**

`uri`

STRING

NULLABLE

`uri`: the Uniform Resource Identifier (URI) of the object, in the format `gs://bucket_name/[folder_name/]object_name`.

`generation`

INTEGER

NULLABLE

The generation of this object, which identifies the object version.

`content_type`

STRING

NULLABLE

The Content-Type of the object data, which identifies what kind of media it is. If an object is stored without a Content-Type, it is served as application/octet-stream.

`size`

INTEGER

NULLABLE

The Content-Length of the data in bytes.

`md5_hash`

STRING

NULLABLE

The MD5 hash of the data, encoded using base64. For more information about using the MD5 hash, see Cloud Storage object metadata.

`updated`

TIMESTAMP

NULLABLE

The last time the object's metadata was modified.

`metadata`

RECORD

REPEATED

Custom metadata for the object. Each piece of metadata is represented as a key-value pair in the child `(metadata.)name` and `(metadata.)value` fields of the `metadata` field.

`(metadata.)name`

STRING

NULLABLE

Key in an individual metadata entry.

`(metadata.)value`

STRING

NULLABLE

Value in an individual metadata entry.

`ref`

STRUCT

NULLABLE

Google-managed Cloud Storage metadata stored in the `ObjectRef` format.  
  
You can use this column to maintain `ObjectRef` values in standard tables. `ObjectRef` values let you integrate object data with structured data.

The rows in an object table look similar to the following:

```
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|  uri                 | generation | content_type | size  | md5_hash   | updated                        | metadata...name | metadata...value  | ref.uri              | ref.version | ref.authorizer | ref.details                                              |
—----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| gs://mybucket/a.jpeg | 165842…    | image/jpeg   | 26797 | 8c33be10f… | 2022-07-21 17:35:40.148000 UTC | null            | null              | gs://mybucket/a.jpeg | 12345678    | us.conn        | {"gcs_metadata":{"content_type":"image/jpeg","md5_hash"… |
—----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| gs://mybucket/b.bmp  | 305722…    | image/bmp    | 57932 | 44eb90cd1… | 2022-05-14 12:09:38.114000 UTC | null            | null              | gs://mybucket/b.bmp  | 23456789    | us.conn        | {"gcs_metadata":{"content_type":"image/bmp","md5_hash"…  |
—----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

## Use cases

You can query the metadata in an object table in the same way you would query any other BigQuery table. However, the primary use case for object tables is to make unstructured data accessible for analysis. You can use BigQuery ML to run inference on image object tables with TensorFlow, TensorFlow Lite, and PyTorch models. You can also use remote functions to analyze unstructured data almost any way you want to. For example, you could create a remote function that lets you analyze images by using Cloud Vision, or one that lets you extract metadata from PDF documents by using Apache Tika.

The following table describes the integration points you can use to do machine learning on object table data:

**Integration**

**Description**

**Use case**

**Tutorial**

The `AI.GENERATE_TEXT` function

Generate text by using a Gemini Enterprise Agent Platform, partner, or open model.

You want to generate text from object data.

Generate text by using the `AI.GENERATE_TEXT` function

The `AI.GENERATE_EMBEDDING` function

Generate embeddings by using a Gemini Enterprise Agent Platform multimodal model.

You want to generate embeddings for video or image data to use in vector searches, model input, or other use cases.

Generate image embeddings by using the `AI.GENERATE_EMBEDDING` function  
  
Generate video embeddings by using the `AI.GENERATE_EMBEDDING` function

Imported BigQuery ML models

Import TensorFlow, TensorFlow Lite, or ONNX models to BigQuery ML to run local inference in BigQuery .

You are using open-source or custom models that fit within supported limitations.

Tutorial: Run inference on an object table by using a feature vector model

Cloud Run functions

Use Cloud Run functions to call services or hosted models. This is the most generic integration.

You are self-hosting your models on Compute Engine, Google Kubernetes Engine, or other customer-owned infrastructure.

The `ML.ANNOTATE_IMAGE` function

Use the Cloud Vision API to annotate images.

You want to annotate images by using a Vision API pre-trained model.

Annotate images with the `ML.ANNOTATE_IMAGE` function

The `ML.PROCESS_DOCUMENT` function

Use the Document AI API to extract document insights.

You want to use Document AI pre-trained or custom document processors.

Process documents with the `ML.PROCESS_DOCUMENT` function

The `ML.TRANSCRIBE` function

Use the Speech-to-Text API to transcribe audio files.

You want to use Speech-to-Text pre-trained or custom speech recognizers.

Transcribe audio files with the `ML.TRANSCRIBE` function

You can create a view or table from the results of your analysis if you want to join your results with other structured data. For example, the following statement creates a table based on inference results:

CREATE TABLE my_dataset.my_inference_results AS
SELECT uri, content_type, vision_feature
FROM ML.PREDICT(
  MODEL my_dataset.vision_model,
  SELECT ML.DECODE_IMAGE(data) AS vision_input
  FROM my_dataset.object_table
);

After the table is created, you can join it with other tables based on either standard or custom metadata fields, as shown following:

SELECT a.vision_feature, a.uri, b.description
FROM my_dataset.my_inference_results a
JOIN my_dataset.image_description b
ON a.uri = b.uri;

You can also create a search index to power searches over the results of your analysis. For example, the following statement creates a search index over data extracted from PDF files:

CREATE SEARCH INDEX my_index ON pdf_text_extract(ALL COLUMNS);

You can then use the index to find what you need in those results:

SELECT * FROM pdf_text_extract WHERE SEARCH(pdf_text, 'Google');

## Benefits

Analyzing unstructured data natively in BigQuery provides the following benefits:

*   It reduces manual effort by letting you automate pre-processing steps such as tuning image sizes to model requirements.
*   It lets you use the familiar SQL interface to work with unstructured data.
*   It helps you save costs by utilizing existing BigQuery slots instead of having to provision new forms of compute.

## Signed URLs

To get access to the data represented by an object, generate a signed URL. You can use the signed URL to directly view the object data, and you can also pass signed URLs to remote functions to enable them to work with object table data.

Use the `EXTERNAL_OBJECT_TRANSFORM` function to generate signed URLs, as shown in the following example:

SELECT uri, signed_url
FROM EXTERNAL_OBJECT_TRANSFORM(TABLE `mydataset.myobjecttable`, ['SIGNED_URL']);

This returns results similar to the following:

```
---------------------------------------------------------------------------------------------------
|  uri                 | signed_url                                                               |
—--------------------------------------------------------------------------------------------------
| gs://mybucket/a.docx | https://storage.googleapis.com/mybucket/a.docx?X-Goog-Signature=abcd&... |
—-------------------------------------------------------------------------------------------------
| gs://mybucket/b.pdf  | https://storage.googleapis.com/mybucket/b.pdf?X-Goog-Signature=wxyz&...  |
—--------------------------------------------------------------------------------------------------
```

Signed URLs generated from object tables allow any user or procedure that possesses them to read the corresponding objects. Generated signed URLs expire after 6 hours. For more information, see Cloud Storage Signed URLs.

## Access control

Object tables are built on top of BigLake, so they use an external connection based on a service account to access Cloud Storage data. This decouples access to the table from access to the underlying object store through access delegation. You grant the service account permissions to access data and metadata from the objects and surface it in the table. You grant users permissions only on the table, where you can govern data access by using Identity and Access Management (IAM) and row-level security.

Object tables vary from other tables that use access delegation, in that having access to a row of an object table confers access to the underlying file content. While a user can't access the object directly, they can generate a signed URL that lets them see the file contents. For example, if the user has access to the object table row representing the `flower.jpg` image file, they can generate a signed URL to display the file and see that it is a picture of a daisy.

Setting a row-level access policy on an object table restricts a user or group's access to the object metadata in selected rows, and also to the objects represented by those rows. For example, the following statement grants the user Alice access only to rows that represent objects created before June 25, 2022:

CREATE ROW ACCESS POLICY before_20220625
ON my_dataset.my_object_table
GRANT TO ("user:alice@example.com")
FILTER USING (updated < TIMESTAMP("2022-06-25"));

With this row-level access policy in place, the following outcomes are true for Alice:

*   Running the query `SELECT * FROM my_dataset.my_object_table;` only returns rows that have an `updated` value prior to June 25, 2022.
*   Running inference on `my_dataset.my_object_table` only returns predictions for objects that have an `updated` value prior to June 25, 2022.
*   Generating signed URLs for `my_dataset.my_object_table` only creates URLs for objects that have an `updated` value prior to June 25, 2022.

You can also restrict access to object table rows by using custom metadata. For example, the following statement restricts the `users` group to only access rows where the object has been tagged as not containing any personally identifiable information:

CREATE ROW ACCESS POLICY no_pii
ON my_dataset.my_object_table
GRANT TO ("group:users@example.com")
FILTER USING (ARRAY_LENGTH(metadata)=1
AND metadata[OFFSET(0)].name="no_pii")

## Security model

The following organizational roles are typically involved in managing and using object tables:

*   **Data lake administrators.** These administrators typically manage Identity and Access Management (IAM) policies on Cloud Storage buckets and objects.
*   **Data warehouse administrators.** These administrators typically create, delete, and update tables.
*   **Data analysts.** Analysts typically read data and run queries.

Data lake administrators are responsible for creating connections and sharing them with data warehouse administrators. In turn, data warehouse administrators create tables, set appropriate access controls, and share the tables with data analysts.

**Caution:** Data analysts should **not** have the following:

*   The ability to read objects directly from Cloud Storage (see the Storage Object Viewer IAM role), which lets data analysts circumvent access controls placed by data warehouse administrators.
*   The ability to bind tables to connections (like the BigQuery Connection Administrator).
    
    Otherwise, data analysts can create new tables that do not have any access controls, thus circumventing controls placed by data warehouse administrators.
    

## Supported object files

You can create an object table over any type and size of unstructured data file, and you can create remote functions to work with any type of unstructured data. However, to perform inference by using BigQuery ML, an object table can only be over image files that meet several size and type requirements. For more information, see Limitations.

## Metadata caching for performance

You can use cached metadata to improve the performance of inference and other types of analysis on object tables. Metadata caching is especially helpful in cases where the object table is referencing large numbers of objects. BigQuery uses CMETA as a distributed metadata system to handle large tables efficiently. CMETA provides fine-grained metadata at the column and block level, accessible through system tables. This system helps improve query performance by optimizing data access and processing. To further accelerate query performance on large tables, BigQuery maintains a metadata cache. CMETA refresh jobs keep this cache up-to-date.

The metadata includes file names, partitioning information, and physical metadata from files such as row counts. You can choose whether or not to enable metadata caching on a table. Queries with a large number of files and with Apache Hive partition filters benefit the most from metadata caching.

If you don't enable metadata caching, queries on the table must read the external data source to get object metadata. Reading this data increases the query latency; listing millions of files from the external data source can take several minutes. If you enable metadata caching, queries can avoid listing files from the external data source and can partition and prune files more quickly.

Metadata caching also integrates with Cloud Storage object versioning. When the cache is populated or refreshed, it captures metadata based on the live version of the Cloud Storage objects at that time. As a result, metadata caching-enabled queries read data corresponding to the specific cached object version, even if newer versions become live in Cloud Storage. Accessing data from any subsequently updated object versions in Cloud Storage necessitates a metadata cache refresh.

There are two properties that control this feature:

*   **Maximum staleness** specifies when queries use cached metadata.
*   **Metadata cache mode** specifies how the metadata is collected.

When you have metadata caching enabled, you specify the maximum interval of metadata staleness that is acceptable for operations against the table. For example, if you specify an interval of 1 hour, then operations against the table use cached metadata if it has been refreshed within the past hour. If the cached metadata is older than that, the operation falls back to retrieving metadata from Cloud Storage instead. You can specify a staleness interval between 30 minutes and 7 days.

When you enable metadata caching for BigLake or object tables, BigQuery triggers metadata generation refresh jobs. You can choose to refresh the cache either automatically or manually:

*   For automatic refreshes, the cache is refreshed at a system defined interval, usually somewhere between 30 and 60 minutes. Refreshing the cache automatically is a good approach if the files in Cloud Storage are added, deleted, or modified at random intervals. If you need to control the timing of the refresh, for example to trigger the refresh at the end of an extract-transform-load job, use manual refresh.
*   For manual refreshes, you run the `BQ.REFRESH_EXTERNAL_METADATA_CACHE` system procedure to refresh the metadata cache on a schedule that meets your requirements. Refreshing the cache manually is a good approach if the files in Cloud Storage are added, deleted, or modified at known intervals, for example as the output of a pipeline.
    
    If you issue multiple concurrent manual refreshes, only one will succeed.
    

The metadata cache expires after 7 days if it isn't refreshed.

Both manual and automatic cache refreshes are executed with `INTERACTIVE` query priority.

### Use BACKGROUND reservations

If you choose to use automatic refreshes, we recommend that you create a reservation, and then create an assignment with a `BACKGROUND` job type for the project that runs the metadata cache refresh jobs. With `BACKGROUND` reservations, refresh jobs use a dedicated resource pool which prevents the refresh jobs from competing with user queries, and prevents the jobs from potentially failing if there aren't sufficient resources available for them.

While using a shared slot pool incurs no extra cost, using `BACKGROUND` reservations instead provides more consistent performance by allocating a dedicated resource pool, and improves the reliability of refresh jobs and overall query efficiency in BigQuery.

You should consider how the staleness interval and metadata caching mode values will interact before you set them. Consider the following examples:

*   If you are manually refreshing the metadata cache for a table, and you set the staleness interval to 2 days, you must run the `BQ.REFRESH_EXTERNAL_METADATA_CACHE` system procedure every 2 days or less if you want operations against the table to use cached metadata.
*   If you are automatically refreshing the metadata cache for a table, and you set the staleness interval to 30 minutes, it is possible that some of your operations against the table might read from Cloud Storage if the metadata cache refresh takes on the longer side of the usual 30 to 60 minute window.

To find information about metadata refresh jobs, query the `INFORMATION_SCHEMA.JOBS` view, as shown in the following example:

SELECT *
FROM `region-us.INFORMATION_SCHEMA.JOBS_BY_PROJECT`
WHERE job_id LIKE '%metadata_cache_refresh%'
AND creation_time > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 6 HOUR)
ORDER BY start_time DESC
LIMIT 10;

To learn more, see Metadata caching.

For more information on setting metadata caching options, see Create object tables.

## Limitations

*   Object tables are read-only, because they map to unstructured data objects in Cloud Storage. You can't alter an object table or modify object table data.
*   Object table support isn't available in Legacy SQL, or other cloud environments such as Amazon Web Services (AWS) and Microsoft Azure.
*   If you want to perform inference by using BigQuery ML, the model and the object table you use must meet the requirements described in Limitations.
*   Queries that include object tables can't access more than 10 GB of object metadata. For example, if a query accesses 100 TB from a combination of metadata columns in object tables and object data through signed URLs, only 10 GB of that 100 TB can be from the metadata columns.
*   Object tables are subject to the same limitations as all other BigQuery external tables. For more information, see Quotas.
*   Queries over object tables are subject to the same limitations as all other BigQuery queries. For more information, see Quotas.
*   Remote functions that process unstructured data from object tables are subject to the same limitations as all other remote functions.
*   Signed URLs generated for the objects in an object table expire after 6 hours, which is the query execution time limit.
*   Inference with BigQuery ML is not supported with on-demand pricing or with the Standard edition.
*   The following functions are not supported with on-demand pricing or with the Standard edition:
    
    *   `ML.CONVERT_COLOR_SPACE`
    *   `ML.CONVERT_IMAGE_TYPE`
    *   `ML.RESIZE_IMAGE`
*   Object tables can have a maximum of 300 million rows.
    
*   `UNION ALL` operations that combine both empty and non-empty object tables are not supported and might return an error.
    

## Costs

Costs are associated with the following aspects of object tables:

*   Querying the tables.
*   Refreshing the metadata cache.

If you have slot reservations, you are not charged for querying external tables. Instead, slots are consumed for these queries.

The following table shows how your pricing model affects how these costs are applied:

  
**On-demand pricing**

  
**Standard, Enterprise, and Enterprise Plus editions**

  
Queries

  
You are billed for the bytes processed by user queries.

  
Slots in reservation assignments with a `QUERY` job type are consumed during query time.

  
Manually refreshing the metadata cache.

  
You are billed for the bytes processed to refresh the cache.

  
Slots in reservation assignments with a `QUERY` job type are consumed during cache refresh.

  
Automatically refreshing the metadata cache.

  
You are billed for the bytes processed to refresh the cache.

  
Slots in reservation assignments with a `BACKGROUND` job type are consumed during cache refresh.  
  
If there are no `BACKGROUND` reservations available for refreshing the metadata cache, BigQuery automatically uses slots in `QUERY` reservations instead if you are using the Enterprise or Enterprise Plus edition.

You are also charged for storage and data access by Cloud Storage, Amazon S3, and Azure Blob Storage, subject to each product's pricing guidelines.

When BigQuery interacts with Cloud Storage, you might incur the following Cloud Storage costs:

*   Data storage costs for the amount of data stored.
*   Data retrieval costs for accessing data in Nearline, Coldline, and Archive storage classes. Take caution when querying tables or refreshing the metadata cache against these storage classes, as charges can be significant.
*   Network usage costs for data that you read across different regions, such as when your BigQuery dataset and Cloud Storage bucket are in different regions.
*   Data processing charges. However, you aren't charged for API calls that are made by BigQuery on your behalf, such as listing or getting resources.

## Using object tables with BigQuery sharing

Object tables are compatible with BigQuery sharing (formerly Analytics Hub). Datasets containing object tables can be published as Sharing listings. Sharing subscribers can subscribe to these listings, which provision a read-only dataset, called a _linked dataset_, in their project. Subscribers can query all tables in the linked dataset, including all object tables. For more information, see Subscribe to a listing.

## What's next

*   Learn how to create an object table.
*   Learn how to use object tables to maintain `ObjectRef` columns in standard tables.
*   Learn how to run inference on image object tables.
*   Learn how to analyze object tables by using remote functions.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-06-11 UTC.

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