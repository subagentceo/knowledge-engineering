# Manage search indexes

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

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/bigquery-color.svg)

*   BigQuery

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

# Manage search indexes

A search index is a data structure designed to enable very efficient search with the `SEARCH` function. A search index can also optimize some queries that use supported functions and operators.

Much like the index you'd find in the back of a book, a search index for a column of string data acts like an auxiliary table that has one column for unique words and another for where in the data those words occur.

## Create a search index

To create a search index, use the `CREATE SEARCH INDEX` DDL statement. To specify primitive data types to be indexed, see Create a search index and specify the columns and data types. If you don't specify any data types, then by default, BigQuery indexes columns of the following types that contain `STRING` data:

*   `STRING`
*   `ARRAY<STRING>`
*   `STRUCT` containing at least one nested field of type `STRING` or `ARRAY<STRING>`
*   `JSON`

When you create a search index, you can specify the type of text analyzer to use. The text analyzer controls how data is tokenized for indexing and searching. The default is `LOG_ANALYZER`. This analyzer works well for machine generated logs and has special rules around tokens commonly found in observability data, such as IP addresses or emails. Use the `NO_OP_ANALYZER` when you have pre-processed data that you want to match exactly. `PATTERN_ANALYZER` extracts tokens from text using a regular expression.

### Create a search index with the default text analyzer

In the following example, a search index is created on columns `a` and `c` of `simple_table` and uses the `LOG_ANALYZER` text analyzer by default:

CREATE TABLE dataset.simple_table(a STRING, b INT64, c JSON);

CREATE SEARCH INDEX my_index
ON dataset.simple_table(a, c);

### Create a search index on all columns with the NO_OP_ANALYZER analyzer

When you create a search index on `ALL COLUMNS`, all `STRING` or `JSON` data in the table is indexed. If the table contains no such data, for example if all columns contain integers, the index creation fails. When you specify a `STRUCT` column to be indexed, all nested subfields are indexed.

In the following example, a search index is created on `a`, `c.e`, and `c.f.g`, and uses the `NO_OP_ANALYZER` text analyzer:

CREATE TABLE dataset.my_table(
  a STRING,
  b INT64,
  c STRUCT <d INT64,
            e ARRAY<STRING>,
            f STRUCT<g STRING, h INT64>>) AS
SELECT 'hello' AS a, 10 AS b, (20, ['x', 'y'], ('z', 30)) AS c;

CREATE SEARCH INDEX my_index
ON dataset.my_table(ALL COLUMNS)
OPTIONS (analyzer = 'NO_OP_ANALYZER');

Since the search index was created on `ALL COLUMNS`, any columns added to the table are automatically indexed if they contain `STRING` data.

### Create a search index and specify the columns and data types

When you create a search index, you can specify data types to use. Data types control types of columns and subfields of `JSON` and `STRUCT` columns for indexing. The default data type for indexing is `STRING`. To create a search index with more data types (for example, numeric types), use the `CREATE SEARCH INDEX` statement with the `data_types` option included.

In the following example, a search index is created on columns `a`, `b`, `c` and `d` of a table named `simple_table`. The supported column data types are `STRING`, `INT64`, and `TIMESTAMP`.

CREATE TABLE dataset.simple_table(a STRING, b INT64, c JSON, d TIMESTAMP);

CREATE SEARCH INDEX my_index
ON dataset.simple_table(a, b, c, d)
OPTIONS ( data_types = ['STRING', 'INT64', 'TIMESTAMP']);

### Create a search index on all columns and specify the data types

When you create a search index on `ALL COLUMNS` with the `data_types` option specified, any column that matches one of the specified data types is indexed. For `JSON` and `STRUCT` columns, any nested subfield that matches one of the specified data types is indexed.

In the following example, a search index is created on `ALL COLUMNS` with data types specified. Columns `a`, `b`, `c`, `d.e`, `d.f`, `d.g.h`, `d.g.i` of a table named `my_table` is indexed:

CREATE TABLE dataset.my_table(
  a STRING,
  b INT64,
  c TIMESTAMP,
  d STRUCT <e INT64,
            f ARRAY<STRING>,
            g STRUCT<h STRING, i INT64>>)
AS (
  SELECT
    'hello' AS a,
    10 AS b,
    TIMESTAMP('2008-12-25 15:30:00 UTC') AS c,
    (20, ['x', 'y'], ('z', 30)) AS d;
)

CREATE SEARCH INDEX my_index
ON dataset.my_table(ALL COLUMNS)
OPTIONS ( data_types = ['STRING', 'INT64', 'TIMESTAMP']);

Since the search index was created on `ALL COLUMNS`, any columns added to the table are automatically indexed if they match with any of the specified data types.

### Index with column granularity

When you create a search index, you can specify the column granularity for an indexed column. Column granularity lets BigQuery optimize certain kinds of search queries by storing additional column information in your search index. To set the column granularity for an indexed column, use the `index_granularity` option in the `index_column_option_list` when you run a `CREATE SEARCH INDEX` statement.

Internally, BigQuery tables are organized into files. When you create an index, BigQuery creates a mapping from tokens to the files that contain those tokens. When you run a search query, BigQuery scans all of the files that contain the tokens. This might be inefficient if your search token rarely appears in the column that you're searching but is common in a different column.

For example, suppose you have the following table that contains job postings:

```
CREATE TABLE my_dataset.job_postings (job_id INT64, company_name STRING, job_description STRING);
```

The word _skills_ probably appears frequently in the `job_description` column, but rarely in the `company_name` column. Suppose you run the following query:

```
SELECT * FROM my_dataset.job_postings WHERE SEARCH(company_name, 'skills');
```

If you created a search index on the columns `company_name` and `job_description` without specifying column granularity, then BigQuery would scan every file in which the word _skills_ appears in either the `job_description` or `company_name` column. To improve the performance of this query, you could set the column granularity for `company_name` to `COLUMN`:

```
CREATE SEARCH INDEX my_index
ON my_dataset.job_postings (
  company_name OPTIONS(index_granularity = 'COLUMN'),
  job_description);
```

Now when you run the query, BigQuery only scans the files in which the word _skills_ appears in the `company_name` column.

To see information about which options are set on the columns of an indexed table, query the `INFORMATION_SCHEMA.SEARCH_INDEX_COLUMN_OPTIONS` view.

There are limits to the number of columns that you can index with column granularity. For more information, see Quotas and limits.

## Understand index refresh

Search indexes are fully managed by BigQuery and automatically refreshed when the table changes. An index full refresh can happen in the following cases:

*   The partition expiration is updated.
*   An indexed column is updated due to a table schema change.
*   The index is stale due to a lack of `BACKGROUND` reservation slots for incremental refreshes. To prevent staleness, you can use autoscaling and monitor the workload to determine the best baseline and max reservation size.

In case an indexed column's data is updated in every row, such as during a backfill operation, the whole index needs to be updated, equivalent to a full refresh. We recommend that you perform backfills slowly, such as partition by partition, to minimize potential negative impact.

If you make any schema change to the base table that prevents an explicitly indexed column from being indexed, then the index is permanently disabled.

If you delete the only indexed column in a table or rename the table itself, then the search index is deleted automatically.

Search indexes are designed for large tables. If you create a search index on a table that is smaller than 10GB, then the index is not populated. Similarly, if you delete data from an indexed table and the table size falls below 10GB, then the index is temporarily disabled. In this case, search queries do not use the index and the `IndexUnusedReason` code is `BASE_TABLE_TOO_SMALL`. This happens whether or not you use your own reservation for your index-management jobs. When an indexed table's size exceeds 10GB, then its index is populated automatically. You are not charged for storage until the search index is populated and active. Queries that use the `SEARCH` function always return correct results even if some data is not yet indexed.

## Get information about search indexes

You can verify the existence and the readiness of a search index by querying `INFORMATION_SCHEMA`. There are three views that contain metadata on search indexes.

*   The `INFORMATION_SCHEMA.SEARCH_INDEXES` view has information on each search index created on a dataset.
*   The `INFORMATION_SCHEMA.SEARCH_INDEX_COLUMNS` view has information on which columns of each table in the dataset are indexed.
*   The `INFORMATION_SCHEMA.SEARCH_INDEXES_BY_ORGANIZATION` view has information on search indexes for the whole organization associated with the current project.

### INFORMATION_SCHEMA.SEARCH_INDEXES view examples

This section includes example queries of the `INFORMATION_SCHEMA.SEARCH_INDEXES` view.

The following example shows all active search indexes on tables in the dataset `my_dataset`, located in the project `my_project`. It includes their names, the DDL statements used to create them, their coverage percentage, and their text analyzer. If an indexed base table is less than 10GB, then its index is not populated, in which case `coverage_percentage` is 0.

```
SELECT table_name, index_name, ddl, coverage_percentage, analyzer
FROM my_project.my_dataset.INFORMATION_SCHEMA.SEARCH_INDEXES
WHERE index_status = 'ACTIVE';
```

The results should look like the following:

+-------------+-------------+--------------------------------------------------------------------------------------+---------------------+----------------+
| table_name  | index_name  | ddl                                                                                  | coverage_percentage | analyzer       |
+-------------+-------------+--------------------------------------------------------------------------------------+---------------------+----------------+
| small_table | names_index | CREATE SEARCH INDEX `names_index` ON `my_project.my_dataset.small_table`(names)      | 0                   | NO_OP_ANALYZER |
| large_table | logs_index  | CREATE SEARCH INDEX `logs_index` ON `my_project.my_dataset.large_table`(ALL COLUMNS) | 100                 | LOG_ANALYZER   |
+-------------+-------------+--------------------------------------------------------------------------------------+---------------------+----------------+

### INFORMATION_SCHEMA.SEARCH_INDEX_COLUMNS view examples

This section includes example queries of the `INFORMATION_SCHEMA.SEARCH_INDEX_COLUMNS` view.

The following example creates a search index on all columns of `my_table`.

CREATE TABLE dataset.my_table(
  a STRING,
  b INT64,
  c STRUCT <d INT64,
            e ARRAY<STRING>,
            f STRUCT<g STRING, h INT64>>) AS
SELECT 'hello' AS a, 10 AS b, (20, ['x', 'y'], ('z', 30)) AS c;

CREATE SEARCH INDEX my_index
ON dataset.my_table(ALL COLUMNS);

The following query extracts information on which fields are indexed. The `index_field_path` indicates which field of a column is indexed. This differs from the `index_column_name` only in the case of a `STRUCT`, where the full path to the indexed field is given. In this example, column `c` contains an `ARRAY<STRING>` field `e` and another `STRUCT` called `f` which contains a `STRING` field `g`, each of which is indexed.

```
SELECT table_name, index_name, index_column_name, index_field_path
FROM my_project.dataset.INFORMATION_SCHEMA.SEARCH_INDEX_COLUMNS
```

The result is similar to the following:

+------------+------------+-------------------+------------------+
| table_name | index_name | index_column_name | index_field_path |
+------------+------------+-------------------+------------------+
| my_table   | my_index   | a                 | a                |
| my_table   | my_index   | c                 | c.e              |
| my_table   | my_index   | c                 | c.f.g            |
+------------+------------+-------------------+------------------+

The following query joins the `INFORMATION_SCHEMA.SEARCH_INDEX_COLUMNS` view with the `INFORMATION_SCHEMA.SEARCH_INDEXES` and `INFORMATION_SCHEMA.COLUMNS` views to include the search index status and the data type of each column:

SELECT
  index_columns_view.index_catalog AS project_name,
  index_columns_view.index_SCHEMA AS dataset_name,
  indexes_view.TABLE_NAME AS table_name,
  indexes_view.INDEX_NAME AS index_name,
  indexes_view.INDEX_STATUS AS status,
  index_columns_view.INDEX_COLUMN_NAME AS column_name,
  index_columns_view.INDEX_FIELD_PATH AS field_path,
  columns_view.DATA_TYPE AS data_type
FROM
  mydataset.INFORMATION_SCHEMA.SEARCH_INDEXES indexes_view
INNER JOIN
  mydataset.INFORMATION_SCHEMA.SEARCH_INDEX_COLUMNS index_columns_view
  ON
    indexes_view.TABLE_NAME = index_columns_view.TABLE_NAME
    AND indexes_view.INDEX_NAME = index_columns_view.INDEX_NAME
LEFT OUTER JOIN
  mydataset.INFORMATION_SCHEMA.COLUMNS columns_view
  ON
    indexes_view.INDEX_CATALOG = columns_view.TABLE_CATALOG
    AND indexes_view.INDEX_SCHEMA = columns_view.TABLE_SCHEMA
    AND index_columns_view.TABLE_NAME = columns_view.TABLE_NAME
    AND index_columns_view.INDEX_COLUMN_NAME = columns_view.COLUMN_NAME
ORDER BY
  project_name,
  dataset_name,
  table_name,
  column_name;

The result is similar to the following:

+------------+------------+----------+------------+--------+-------------+------------+---------------------------------------------------------------+
| project    | dataset    | table    | index_name | status | column_name | field_path | data_type                                                     |
+------------+------------+----------+------------+--------+-------------+------------+---------------------------------------------------------------+
| my_project | my_dataset | my_table | my_index   | ACTIVE | a           | a          | STRING                                                        |
| my_project | my_dataset | my_table | my_index   | ACTIVE | c           | c.e        | STRUCT<d INT64, e ARRAY<STRING>, f STRUCT<g STRING, h INT64>> |
| my_project | my_dataset | my_table | my_index   | ACTIVE | c           | c.f.g      | STRUCT<d INT64, e ARRAY<STRING>, f STRUCT<g STRING, h INT64>> |
+------------+------------+----------+------------+--------+-------------+------------+---------------------------------------------------------------+

### INFORMATION_SCHEMA.SEARCH_INDEXES_BY_ORGANIZATION view examples

This section includes example queries of the `INFORMATION_SCHEMA.SEARCH_INDEXES_BY_ORGANIZATION` view.

#### Find if the consumption exceeds the limit in a given region

The following example illustrates if the total indexed base table size across an organization, utilizing shared slots within the US multi-region, exceeds 100 TB:

WITH
 indexed_base_table_size AS (
 SELECT
   SUM(base_table.total_logical_bytes) AS total_logical_bytes
 FROM
   `region-us`.INFORMATION_SCHEMA.SEARCH_INDEXES_BY_ORGANIZATION AS search_index
 JOIN
   `region-us`.INFORMATION_SCHEMA.TABLE_STORAGE_BY_ORGANIZATION AS base_table
 ON
   (search_index.table_name = base_table.table_name
     AND search_index.project_id = base_table.project_id
     AND search_index.index_schema = base_table.table_schema)
 WHERE
   TRUE
   -- Excludes search indexes that are permanently disabled.
   AND search_index.index_status != 'PERMANENTLY DISABLED'
   -- Excludes BASE_TABLE_TOO_SMALL search indexes whose base table size is
   -- less than 10 GB. These tables don't count toward the limit.
   AND search_index.index_status_details.throttle_status != 'BASE_TABLE_TOO_SMALL'
   -- Excludes search indexes whose project has BACKGROUND reservation purchased
   -- for search indexes.
   AND search_index.use_background_reservation = false
 -- Outputs the total indexed base table size if it exceeds 100 TB,
 -- otherwise, doesn't return any output.
)
SELECT * FROM indexed_base_table_size
WHERE total_logical_bytes >= 109951162777600 -- 100 TB

The result is similar to the following:

+---------------------+
| total_logical_bytes |
+---------------------+
|     109951162777601 |
+---------------------+

#### Find total indexed base table size by projects in a region

The following example gives the breakdown on each project in a US multi-region with the total size of indexed base tables:

SELECT
 search_index.project_id,
 search_index.use_background_reservation,
 SUM(base_table.total_logical_bytes) AS total_logical_bytes
FROM
 `region-us`.INFORMATION_SCHEMA.SEARCH_INDEXES_BY_ORGANIZATION AS search_index
JOIN
 `region-us`.INFORMATION_SCHEMA.TABLE_STORAGE_BY_ORGANIZATION AS base_table
ON
 (search_index.table_name = base_table.table_name
   AND search_index.project_id = base_table.project_id
   AND search_index.index_schema = base_table.table_schema)
WHERE
 TRUE
  -- Excludes search indexes that are permanently disabled.
  AND search_index.index_status != 'PERMANENTLY DISABLED'
  -- Excludes BASE_TABLE_TOO_SMALL search indexes whose base table size is
  -- less than 10 GB. These tables don't count toward limit.
 AND search_index.index_status_details.throttle_status != 'BASE_TABLE_TOO_SMALL'
GROUP BY search_index.project_id, search_index.use_background_reservation

The result is similar to the following:

+---------------------+----------------------------+---------------------+
|     project_id      | use_background_reservation | total_logical_bytes |
+---------------------+----------------------------+---------------------+
| projecta            |     true                   |     971329178274633 |
+---------------------+----------------------------+---------------------+
| projectb            |     false                  |     834638211024843 |
+---------------------+----------------------------+---------------------+
| projectc            |     false                  |     562910385625126 |
+---------------------+----------------------------+---------------------+

#### Find throttled search indexes

This following example returns all search indexes that are throttled within the organization and region:

SELECT project_id, index_schema, table_name, index_name
FROM
 `region-us`.INFORMATION_SCHEMA.SEARCH_INDEXES_BY_ORGANIZATION
WHERE
 -- Excludes search indexes that are permanently disabled.
 index_status != 'PERMANENTLY DISABLED'
 AND index_status_details.throttle_status IN ('ORGANIZATION_LIMIT_EXCEEDED', 'BASE_TABLE_TOO_LARGE')

The result is similar to the following:

+--------------------+--------------------+---------------+----------------+
|     project_id     |    index_schema    |  table_name   |   index_name   |
+--------------------+--------------------+---------------+----------------+
|     projecta       |     dataset_us     |   table1      |    index1      |
|     projectb       |     dataset_us     |   table1      |    index1      |
+--------------------+--------------------+---------------+----------------+

## Index management options

To create indexes and have BigQuery maintain them, you have two options:

*   Use the default shared slot pool: When the data you plan to index is below your per-organization limit, you can use the free shared slot pool for index management.
*   Use your own reservation: To achieve more predictable and consistent indexing progress on your larger production workloads, you can use your own reservations for index management.

### Use shared slots

If you have not configured your project to use a dedicated reservation for indexing, index management is handled in the free, shared slot pool, subject to the following constraints.

If you add data to a table which causes the total size of indexed tables to exceed your organization's limit, BigQuery pauses index management for that table. When this happens, the `index_status` field in the `INFORMATION_SCHEMA.SEARCH_INDEXES` view displays `PENDING DISABLEMENT` and the index is queued for deletion. While the index is pending disablement, it is still used in queries and you are charged for the index storage. After the index is deleted, the `index_status` field shows the index as `TEMPORARILY DISABLED`. In this state, queries don't use the index, and you are not charged for index storage. In this case, the `IndexUnusedReason` code is `BASE_TABLE_TOO_LARGE`.

If you delete data from the table and the total size of indexed tables falls below the per-organization limit, then index management is resumed. The `index_status` field in the `INFORMATION_SCHEMA.SEARCH_INDEXES` view is `ACTIVE`, queries can use the index, and you are charged for the index storage.

You can use the `INFORMATION_SCHEMA.SEARCH_INDEXES_BY_ORGANIZATION` view to understand your current consumption towards the per-organization limit in a given region, broken down by projects and tables.

BigQuery does not make guarantees about the available capacity of the shared pool or the throughput of indexing you see. For production applications, you might want to use dedicated slots for your index processing.

### Use your own reservation

Instead of using the default shared slot pool, you can optionally designate your own reservation to index your tables. Using your own reservation ensures predictable and consistent performance of index-management jobs, such as creation, refresh, and background optimizations.

*   There are no table size limits when an indexing job runs in your reservation.
*   Using your own reservation gives you flexibility in your index management. If you need to create a very large index or make a major update to an indexed table, you can temporarily add more slots to the assignment.

To index the tables in a project with a designated reservation, create a reservation in the region where your tables are located. Then, assign the project to the reservation with the `job_type` set to `BACKGROUND`, which shares resources across background optimization jobs:

### SQL

Use the `CREATE ASSIGNMENT` DDL statement.

1.  In the Google Cloud console, go to the **BigQuery** page.
    
    Go to BigQuery
    
2.  In the query editor, enter the following statement:
    
    CREATE ASSIGNMENT
      `ADMIN_PROJECT_ID.region-LOCATION.RESERVATION_NAME.ASSIGNMENT_ID`
    OPTIONS (
      assignee = 'projects/PROJECT_ID',
      job_type = 'BACKGROUND');
    
    Replace the following:
    
    *   `ADMIN_PROJECT_ID`: the project ID of the administration project that owns the reservation resource
    *   `LOCATION`: the location of the reservation
    *   `RESERVATION_NAME`: the name of the reservation
    *   `ASSIGNMENT_ID`: the ID of the assignment
        
        The ID must be unique to the project and location, start and end with a lowercase letter or a number, and contain only lowercase letters, numbers, and dashes.
        
    *   `PROJECT_ID`: the ID of the project containing the tables to index. This project is assigned to the reservation.
    
3.  Click play_circle **Run**.
    

For more information about how to run queries, see Run an interactive query.

### bq

Use the `bq mk` command:

bq mk \
    --project_id=ADMIN_PROJECT_ID \
    --location=LOCATION \
    --reservation_assignment \
    --reservation_id=RESERVATION_NAME \
    --assignee_id=PROJECT_ID \
    --job_type=BACKGROUND \
    --assignee_type=PROJECT

Replace the following:

*   `ADMIN_PROJECT_ID`: the project ID of the administration project that owns the reservation resource
*   `LOCATION`: the location of the reservation
*   `RESERVATION_NAME`: the name of the reservation
*   `PROJECT_ID`: the ID of the project to assign to this reservation

#### View your indexing jobs

A new indexing job is created every time an index is created or updated on a single table. To view information about the job, query the `INFORMATION_SCHEMA.JOBS*` views. You can filter for indexing jobs by setting ``job_type IS NULL AND SEARCH(job_id, '`search_index`')`` in the `WHERE` clause of your query. The following example lists the five most recent indexing jobs in the project `my_project`:

SELECT *
FROM
 region-us.INFORMATION_SCHEMA.JOBS
WHERE
  project_id  = 'my_project'
  AND job_type IS NULL
  AND SEARCH(job_id, '`search_index`')
ORDER BY
 creation_time DESC
LIMIT 5;

**Note:** You can't view information about indexing jobs run in the default shared slot pool.

#### Choose your reservation size

To choose the right number of slots for your reservation, you should consider when index-management jobs are run, how many slots they use, and what your usage looks like over time. BigQuery triggers an index-management job in the following situations:

*   You create an index on a table.
*   Data is modified in an indexed table.
*   The schema of a table changes and this affects which columns are indexed.
*   Index data and metadata are periodically optimized or updated.

The number of slots you need for an index-management job on a table depends on the following factors:

*   The size of the table
*   The rate of data ingestion to the table
*   The rate of DML statements applied to the table
*   The acceptable delay for building and maintaining the index
*   The complexity of the index, typically determined by attributes of the data, such as the number of duplicate terms

##### Initial Estimation

The following estimates can help you to approximate how many slots your reservation requires. Due to the highly variable nature of indexing workloads, you should re-evaluate your requirements after you start indexing data.

*   Existing data: With a 1000-slot reservation, an existing table in BigQuery can be indexed at an average rate of up to 4 GiB per second, which is approximately 336 TiB per day.
*   Newly ingested data: Indexing is typically more resource-intensive on newly ingested data, as the table and its index go through several rounds of transformative optimizations. On average, indexing newly ingested data consumes three times the resources compared to initial backfill-indexing of the same data.
*   Infrequently modified data: Indexed tables with little to no data modification need substantially fewer resources for continued index maintenance. A recommended starting point is to maintain 1/5 of the slots required for the initial backfill-indexing of the same data, and no fewer than 250 slots.
*   Indexing progress scales roughly linearly with the reservation size. However, we don't recommend using reservations smaller than 250 slots for indexing because it might lead to inefficiencies that can slow indexing progress.
*   These estimates may change as features, optimizations, and your actual usage vary.
*   If your organization's total table size exceeds your region's indexing limit, then you should maintain a non-zero reservation assigned for indexing. Otherwise, indexing might fall back to the default tier, resulting in unintended deletion of all indexes.

##### Monitor Usage and Progress

The best way to assess the number of slots you need to efficiently run your index-management jobs is to monitor your slot utilization and adjust the reservation size accordingly. The following query produces the daily slot usage for index-management jobs. Only the past 30 days are included in the region `us-west1`:

SELECT
  TIMESTAMP_TRUNC(job.creation_time, DAY) AS usage_date,
  -- Aggregate total_slots_ms used for index-management jobs in a day and divide
  -- by the number of milliseconds in a day. This value is most accurate for
  -- days with consistent slot usage.
  SAFE_DIVIDE(SUM(job.total_slot_ms), (1000 * 60 * 60 * 24)) AS average_daily_slot_usage
FROM
  `region-us-west1`.INFORMATION_SCHEMA.JOBS job
WHERE
  project_id = 'my_project'
  AND job_type IS NULL
  AND SEARCH(job_id, '`search_index`')
GROUP BY
  usage_date
ORDER BY
  usage_date DESC
limit 30;

When there are insufficient slots to run index-management jobs, an index can become out of sync with its table and indexing jobs might fail. In this case, BigQuery rebuilds the index from scratch. To avoid having an out-of-sync index, ensure you have enough slots to support index updates from data ingestion and optimization. For more information on monitoring slot usage, see admin resource charts.

## Best practices

*   Search indexes are designed for large tables. The performance gains from a search index increase with the size of the table.
*   Don't index columns that contain only a very small number of unique values.
*   Don't index columns that you never intend to use with the `SEARCH` function or any of the other supported functions and operators.
*   Be careful when creating a search index on `ALL COLUMNS`. Every time you add a column containing `STRING` or `JSON` data, it is indexed.
*   You should use your own reservation for index management in production applications. If you choose to use the default shared slot pool for your index-management jobs, then the per-organization sizing limits apply.

## Delete a search index

When you no longer need a search index or want to change which columns are indexed on a table, you can delete the index currently on that table. Use the `DROP SEARCH INDEX` DDL statement.

If an indexed table is deleted, its index is deleted automatically.

Example:

DROP SEARCH INDEX my_index ON dataset.simple_table;

## What's next

*   For an overview of search index use cases, pricing, required permissions, and limitations, see the Introduction to search in BigQuery.
*   For information about efficient searching of indexed columns, see Search with an index.

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