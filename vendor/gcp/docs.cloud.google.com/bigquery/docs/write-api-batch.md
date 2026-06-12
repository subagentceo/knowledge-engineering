# Batch load data using the Storage Write API

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

# Batch load data using the Storage Write API

This document describes how to use the BigQuery Storage Write API to batch load data into BigQuery.

In batch-load scenarios, an application writes data and commits it as a single atomic transaction. When using the Storage Write API to batch load data, create one or more streams in _pending type_. Pending type supports stream-level transactions. Records are buffered in a pending state until you commit the stream.

For batch workloads, also consider using the Storage Write API through the Apache Spark SQL connector for BigQuery using Managed Service for Apache Spark, rather than writing custom Storage Write API code.

The Storage Write API is well-suited to a _data pipeline_ architecture. A main process creates a number of streams. For each stream, it assigns a worker thread or a separate process to write a portion of the batch data. Each worker creates a connection to its stream, writes data, and finalizes its stream when it's done. After all of the workers signal successful completion to the main process, the main process commits the data. If a worker fails, its assigned portion of the data will not show up in the final results, and the whole worker can be safely retried. In a more sophisticated pipeline, workers checkpoint their progress by reporting the last offset written to the main process. This approach can result in a robust pipeline that is resilient to failures.

## Batch load data using pending type

To use pending type, the application does the following:

1.  Call `CreateWriteStream` to create one or more streams in pending type.
2.  For each stream, call `AppendRows` in a loop to write batches of records.
3.  For each stream, call `FinalizeWriteStream`. After you call this method, you cannot write any more rows to the stream. If you call `AppendRows` after calling `FinalizeWriteStream`, it returns a `StorageError` with `StorageErrorCode.STREAM_FINALIZED` in the `google.rpc.Status` error. For more information the `google.rpc.Status` error model, see Errors.
4.  Call `BatchCommitWriteStreams` to commit the streams. After you call this method, the data becomes available for reading. If there is an error committing any of the streams, the error is returned in the `stream_errors` field of the `BatchCommitWriteStreamsResponse`.

Committing is an atomic operation, and you can commit multiple streams at once. A stream can only be committed once, so if the commit operation fails, it is safe to retry it. Until you commit a stream, the data is pending and not visible to reads.

After the stream is finalized and before it is committed, the data can remain in the buffer for up to 4 hours. Pending streams must be committed within 24 hours. There is a quota limit on the total size of the pending stream buffer.

The following code shows how to write data in pending type:

### C#

To learn how to install and use the client library for BigQuery, see BigQuery client libraries. For more information, see the BigQuery C# API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```

using Google.Api.Gax.Grpc;
using Google.Cloud.BigQuery.Storage.V1;
using Google.Protobuf;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Google.Cloud.BigQuery.Storage.V1.AppendRowsRequest.Types;

public class AppendRowsPendingSample
{
    /// <summary>
    /// This code sample demonstrates how to write records in pending mode.
    /// Create a write stream, write some sample data, and commit the stream to append the rows.
    /// The CustomerRecord proto used in the sample can be seen in Resources folder and generated C# is placed in Data folder in
    /// https://github.com/GoogleCloudPlatform/dotnet-docs-samples/tree/main/bigquery-storage/api/BigQueryStorage.Samples
    /// </summary>
    public async Task AppendRowsPendingAsync(string projectId, string datasetId, string tableId)
    {
        BigQueryWriteClient bigQueryWriteClient = await BigQueryWriteClient.CreateAsync();
        // Initialize a write stream for the specified table.
        // When creating the stream, choose the type. Use the Pending type to wait
        // until the stream is committed before it is visible. See:
        // https://cloud.google.com/bigquery/docs/reference/storage/rpc/google.cloud.bigquery.storage.v1#google.cloud.bigquery.storage.v1.WriteStream.Type
        WriteStream stream = new WriteStream { Type = WriteStream.Types.Type.Pending };
        TableName tableName = TableName.FromProjectDatasetTable(projectId, datasetId, tableId);

        stream = await bigQueryWriteClient.CreateWriteStreamAsync(tableName, stream);

        // Initialize streaming call, retrieving the stream object
        BigQueryWriteClient.AppendRowsStream rowAppender = bigQueryWriteClient.AppendRows();

        // Sending requests and retrieving responses can be arbitrarily interleaved.
        // Exact sequence will depend on client/server behavior.
        // Create task to do something with responses from server.
        Task appendResultsHandlerTask = Task.Run(async () =>
        {
            AsyncResponseStream<AppendRowsResponse> appendRowResults = rowAppender.GetResponseStream();
            while (await appendRowResults.MoveNextAsync())
            {
                AppendRowsResponse responseItem = appendRowResults.Current;
                // Do something with responses.
                if (responseItem.AppendResult != null)
                {
                    Console.WriteLine($"Appending rows resulted in: {responseItem.AppendResult}");
                }
                if (responseItem.Error != null)
                {
                    Console.Error.WriteLine($"Appending rows resulted in an error: {responseItem.Error.Message}");
                    foreach (RowError rowError in responseItem.RowErrors)
                    {
                        Console.Error.WriteLine($"Row Error: {rowError}");
                    }
                }
            }
            // The response stream has completed.
        });

        // List of records to be appended in the table.
        List<CustomerRecord> records = new List<CustomerRecord>
        {
            new CustomerRecord { CustomerNumber = 1, CustomerName = "Alice" },
            new CustomerRecord { CustomerNumber = 2, CustomerName = "Bob" }
        };

        // Create a batch of row data by appending serialized bytes to the
        // SerializedRows repeated field.
        ProtoData protoData = new ProtoData
        {
            WriterSchema = new ProtoSchema { ProtoDescriptor = CustomerRecord.Descriptor.ToProto() },
            Rows = new ProtoRows { SerializedRows = { records.Select(r => r.ToByteString()) } }
        };

        // Initialize the append row request.
        AppendRowsRequest appendRowRequest = new AppendRowsRequest
        {
            WriteStreamAsWriteStreamName = stream.WriteStreamName,
            ProtoRows = protoData
        };

        // Stream a request to the server.
        await rowAppender.WriteAsync(appendRowRequest);

        // Append a second batch of data.
        protoData = new ProtoData
        {
            Rows = new ProtoRows { SerializedRows = { new CustomerRecord { CustomerNumber = 3, CustomerName = "Charles" }.ToByteString() } }
        };

        // Since this is the second request, you only need to include the row data.
        // The name of the stream and protocol buffers descriptor is only needed in
        // the first request.
        appendRowRequest = new AppendRowsRequest
        {
            // If Offset is not present, the write is performed at the current end of stream.
            ProtoRows = protoData
        };

        await rowAppender.WriteAsync(appendRowRequest);

        // Complete writing requests to the stream.
        await rowAppender.WriteCompleteAsync();

        // Await the handler. This will complete once all server responses have been processed.
        await appendResultsHandlerTask;

        // A Pending type stream must be "finalized" before being committed. No new
        // records can be written to the stream after this method has been called.
        await bigQueryWriteClient.FinalizeWriteStreamAsync(stream.Name);
        BatchCommitWriteStreamsRequest batchCommitWriteStreamsRequest = new BatchCommitWriteStreamsRequest
        {
            Parent = tableName.ToString(),
            WriteStreams = { stream.Name }
        };

        BatchCommitWriteStreamsResponse batchCommitWriteStreamsResponse =
            await bigQueryWriteClient.BatchCommitWriteStreamsAsync(batchCommitWriteStreamsRequest);
        if (batchCommitWriteStreamsResponse.StreamErrors?.Count > 0)
        {
            // Handle errors here.
            Console.WriteLine("Error committing write streams. Individual errors:");
            foreach (StorageError error in batchCommitWriteStreamsResponse.StreamErrors)
            {
                Console.WriteLine(error.ErrorMessage);
            }            
        }
        else
        {
            Console.WriteLine($"Writes to stream {stream.Name} have been committed.");
        }
    }
}
```

### Go

To learn how to install and use the client library for BigQuery, see BigQuery client libraries. For more information, see the BigQuery Go API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```

import (
	"context"
	"fmt"
	"io"
	"math/rand"
	"time"

	"cloud.google.com/go/bigquery/storage/apiv1/storagepb"
	"cloud.google.com/go/bigquery/storage/managedwriter"
	"cloud.google.com/go/bigquery/storage/managedwriter/adapt"
	"github.com/GoogleCloudPlatform/golang-samples/bigquery/snippets/managedwriter/exampleproto"
	"google.golang.org/protobuf/proto"
)

// generateExampleMessages generates a slice of serialized protobuf messages using a statically defined
// and compiled protocol buffer file, and returns the binary serialized representation.
func generateExampleMessages(numMessages int) ([][]byte, error) {
	msgs := make([][]byte, numMessages)
	for i := 0; i < numMessages; i++ {

		random := rand.New(rand.NewSource(time.Now().UnixNano()))

		// Our example data embeds an array of structs, so we'll construct that first.
		sList := make([]*exampleproto.SampleStruct, 5)
		for i := 0; i < int(random.Int63n(5)+1); i++ {
			sList[i] = &exampleproto.SampleStruct{
				SubIntCol: proto.Int64(random.Int63()),
			}
		}

		m := &exampleproto.SampleData{
			BoolCol:    proto.Bool(true),
			BytesCol:   []byte("some bytes"),
			Float64Col: proto.Float64(3.14),
			Int64Col:   proto.Int64(123),
			StringCol:  proto.String("example string value"),

			// These types require special encoding/formatting to transmit.

			// DATE values are number of days since the Unix epoch.

			DateCol: proto.Int32(int32(time.Now().UnixNano() / 86400000000000)),

			// DATETIME uses the literal format.
			DatetimeCol: proto.String("2022-01-01 12:13:14.000000"),

			// GEOGRAPHY uses Well-Known-Text (WKT) format.
			GeographyCol: proto.String("POINT(-122.350220 47.649154)"),

			// NUMERIC and BIGNUMERIC can be passed as string, or more efficiently
			// using a packed byte representation.
			NumericCol:    proto.String("99999999999999999999999999999.999999999"),
			BignumericCol: proto.String("578960446186580977117854925043439539266.34992332820282019728792003956564819967"),

			// TIME also uses literal format.
			TimeCol: proto.String("12:13:14.000000"),

			// TIMESTAMP uses microseconds since Unix epoch.
			TimestampCol: proto.Int64(time.Now().UnixNano() / 1000),

			// Int64List is an array of INT64 types.
			Int64List: []int64{2, 4, 6, 8},

			// This is a required field, and thus must be present.
			RowNum: proto.Int64(23),

			// StructCol is a single nested message.
			StructCol: &exampleproto.SampleStruct{
				SubIntCol: proto.Int64(random.Int63()),
			},

			// StructList is a repeated array of a nested message.
			StructList: sList,
		}

		b, err := proto.Marshal(m)
		if err != nil {
			return nil, fmt.Errorf("error generating message %d: %w", i, err)
		}
		msgs[i] = b
	}
	return msgs, nil
}

// appendToPendingStream demonstrates using the managedwriter package to write some example data
// to a pending stream, and then committing it to a table.
func appendToPendingStream(w io.Writer, projectID, datasetID, tableID string) error {
	// projectID := "myproject"
	// datasetID := "mydataset"
	// tableID := "mytable"

	ctx := context.Background()
	// Instantiate a managedwriter client to handle interactions with the service.
	client, err := managedwriter.NewClient(ctx, projectID)
	if err != nil {
		return fmt.Errorf("managedwriter.NewClient: %w", err)
	}
	// Close the client when we exit the function.
	defer client.Close()

	// Create a new pending stream.  We'll use the stream name to construct a writer.
	pendingStream, err := client.CreateWriteStream(ctx, &storagepb.CreateWriteStreamRequest{
		Parent: fmt.Sprintf("projects/%s/datasets/%s/tables/%s", projectID, datasetID, tableID),
		WriteStream: &storagepb.WriteStream{
			Type: storagepb.WriteStream_PENDING,
		},
	})
	if err != nil {
		return fmt.Errorf("CreateWriteStream: %w", err)
	}

	// We need to communicate the descriptor of the protocol buffer message we're using, which
	// is analagous to the "schema" for the message.  Both SampleData and SampleStruct are
	// two distinct messages in the compiled proto file, so we'll use adapt.NormalizeDescriptor
	// to unify them into a single self-contained descriptor representation.
	m := &exampleproto.SampleData{}
	descriptorProto, err := adapt.NormalizeDescriptor(m.ProtoReflect().Descriptor())
	if err != nil {
		return fmt.Errorf("NormalizeDescriptor: %w", err)
	}

	// Instantiate a ManagedStream, which manages low level details like connection state and provides
	// additional features like a future-like callback for appends, etc.  NewManagedStream can also create
	// the stream on your behalf, but in this example we're being explicit about stream creation.
	managedStream, err := client.NewManagedStream(ctx, managedwriter.WithStreamName(pendingStream.GetName()),
		managedwriter.WithSchemaDescriptor(descriptorProto))
	if err != nil {
		return fmt.Errorf("NewManagedStream: %w", err)
	}
	defer managedStream.Close()

	// First, we'll append a single row.
	rows, err := generateExampleMessages(1)
	if err != nil {
		return fmt.Errorf("generateExampleMessages: %w", err)
	}

	// We'll keep track of the current offset in the stream with curOffset.
	var curOffset int64
	// We can append data asyncronously, so we'll check our appends at the end.
	var results []*managedwriter.AppendResult

	result, err := managedStream.AppendRows(ctx, rows, managedwriter.WithOffset(0))
	if err != nil {
		return fmt.Errorf("AppendRows first call error: %w", err)
	}
	results = append(results, result)

	// Advance our current offset.
	curOffset = curOffset + 1

	// This time, we'll append three more rows in a single request.
	rows, err = generateExampleMessages(3)
	if err != nil {
		return fmt.Errorf("generateExampleMessages: %w", err)
	}
	result, err = managedStream.AppendRows(ctx, rows, managedwriter.WithOffset(curOffset))
	if err != nil {
		return fmt.Errorf("AppendRows second call error: %w", err)
	}
	results = append(results, result)

	// Advance our offset again.
	curOffset = curOffset + 3

	// Finally, we'll append two more rows.
	rows, err = generateExampleMessages(2)
	if err != nil {
		return fmt.Errorf("generateExampleMessages: %w", err)
	}
	result, err = managedStream.AppendRows(ctx, rows, managedwriter.WithOffset(curOffset))
	if err != nil {
		return fmt.Errorf("AppendRows third call error: %w", err)
	}
	results = append(results, result)

	// Now, we'll check that our batch of three appends all completed successfully.
	// Monitoring the results could also be done out of band via a goroutine.
	for k, v := range results {
		// GetResult blocks until we receive a response from the API.
		recvOffset, err := v.GetResult(ctx)
		if err != nil {
			return fmt.Errorf("append %d returned error: %w", k, err)
		}
		fmt.Fprintf(w, "Successfully appended data at offset %d.\n", recvOffset)
	}

	// We're now done appending to this stream.  We now mark pending stream finalized, which blocks
	// further appends.
	rowCount, err := managedStream.Finalize(ctx)
	if err != nil {
		return fmt.Errorf("error during Finalize: %w", err)
	}

	fmt.Fprintf(w, "Stream %s finalized with %d rows.\n", managedStream.StreamName(), rowCount)

	// To commit the data to the table, we need to run a batch commit.  You can commit several streams
	// atomically as a group, but in this instance we'll only commit the single stream.
	req := &storagepb.BatchCommitWriteStreamsRequest{
		Parent:       managedwriter.TableParentFromStreamName(managedStream.StreamName()),
		WriteStreams: []string{managedStream.StreamName()},
	}

	resp, err := client.BatchCommitWriteStreams(ctx, req)
	if err != nil {
		return fmt.Errorf("client.BatchCommit: %w", err)
	}
	if len(resp.GetStreamErrors()) > 0 {
		return fmt.Errorf("stream errors present: %v", resp.GetStreamErrors())
	}

	fmt.Fprintf(w, "Table data committed at %s\n", resp.GetCommitTime().AsTime().Format(time.RFC3339Nano))

	return nil
}
```

### Java

To learn how to install and use the client library for BigQuery, see BigQuery client libraries. For more information, see the BigQuery Java API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
import com.google.api.core.ApiFuture;
import com.google.api.core.ApiFutureCallback;
import com.google.api.core.ApiFutures;
import com.google.api.gax.retrying.RetrySettings;
import com.google.cloud.bigquery.storage.v1.AppendRowsResponse;
import com.google.cloud.bigquery.storage.v1.BatchCommitWriteStreamsRequest;
import com.google.cloud.bigquery.storage.v1.BatchCommitWriteStreamsResponse;
import com.google.cloud.bigquery.storage.v1.BigQueryWriteClient;
import com.google.cloud.bigquery.storage.v1.CreateWriteStreamRequest;
import com.google.cloud.bigquery.storage.v1.Exceptions;
import com.google.cloud.bigquery.storage.v1.Exceptions.StorageException;
import com.google.cloud.bigquery.storage.v1.FinalizeWriteStreamResponse;
import com.google.cloud.bigquery.storage.v1.JsonStreamWriter;
import com.google.cloud.bigquery.storage.v1.StorageError;
import com.google.cloud.bigquery.storage.v1.TableName;
import com.google.cloud.bigquery.storage.v1.WriteStream;
import com.google.common.util.concurrent.MoreExecutors;
import com.google.protobuf.Descriptors.DescriptorValidationException;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Phaser;
import javax.annotation.concurrent.GuardedBy;
import org.json.JSONArray;
import org.json.JSONObject;
import org.threeten.bp.Duration;

public class WritePendingStream {

  public static void runWritePendingStream()
      throws DescriptorValidationException, InterruptedException, IOException {
    // TODO(developer): Replace these variables before running the sample.
    String projectId = "MY_PROJECT_ID";
    String datasetName = "MY_DATASET_NAME";
    String tableName = "MY_TABLE_NAME";

    writePendingStream(projectId, datasetName, tableName);
  }

  public static void writePendingStream(String projectId, String datasetName, String tableName)
      throws DescriptorValidationException, InterruptedException, IOException {
    BigQueryWriteClient client = BigQueryWriteClient.create();
    TableName parentTable = TableName.of(projectId, datasetName, tableName);

    DataWriter writer = new DataWriter();
    // One time initialization.
    writer.initialize(parentTable, client);

    try {
      // Write two batches of fake data to the stream, each with 10 JSON records.  Data may be
      // batched up to the maximum request size:
      // https://cloud.google.com/bigquery/quotas#write-api-limits
      long offset = 0;
      for (int i = 0; i < 2; i++) {
        // Create a JSON object that is compatible with the table schema.
        JSONArray jsonArr = new JSONArray();
        for (int j = 0; j < 10; j++) {
          JSONObject record = new JSONObject();
          record.put("col1", String.format("batch-record %03d-%03d", i, j));
          jsonArr.put(record);
        }
        writer.append(jsonArr, offset);
        offset += jsonArr.length();
      }
    } catch (ExecutionException e) {
      // If the wrapped exception is a StatusRuntimeException, check the state of the operation.
      // If the state is INTERNAL, CANCELLED, or ABORTED, you can retry. For more information, see:
      // https://grpc.github.io/grpc-java/javadoc/io/grpc/StatusRuntimeException.html
      System.out.println("Failed to append records. \n" + e);
    }

    // Final cleanup for the stream.
    writer.cleanup(client);
    System.out.println("Appended records successfully.");

    // Once all streams are done, if all writes were successful, commit all of them in one request.
    // This example only has the one stream. If any streams failed, their workload may be
    // retried on a new stream, and then only the successful stream should be included in the
    // commit.
    BatchCommitWriteStreamsRequest commitRequest =
        BatchCommitWriteStreamsRequest.newBuilder()
            .setParent(parentTable.toString())
            .addWriteStreams(writer.getStreamName())
            .build();
    BatchCommitWriteStreamsResponse commitResponse = client.batchCommitWriteStreams(commitRequest);
    // If the response does not have a commit time, it means the commit operation failed.
    if (commitResponse.hasCommitTime() == false) {
      for (StorageError err : commitResponse.getStreamErrorsList()) {
        System.out.println(err.getErrorMessage());
      }
      throw new RuntimeException("Error committing the streams");
    }
    System.out.println("Appended and committed records successfully.");
  }

  // A simple wrapper object showing how the stateful stream writer should be used.
  private static class DataWriter {

    private JsonStreamWriter streamWriter;
    // Track the number of in-flight requests to wait for all responses before shutting down.
    private final Phaser inflightRequestCount = new Phaser(1);

    private final Object lock = new Object();

    @GuardedBy("lock")
    private RuntimeException error = null;

    void initialize(TableName parentTable, BigQueryWriteClient client)
        throws IOException, DescriptorValidationException, InterruptedException {
      // Initialize a write stream for the specified table.
      // For more information on WriteStream.Type, see:
      // https://googleapis.dev/java/google-cloud-bigquerystorage/latest/com/google/cloud/bigquery/storage/v1/WriteStream.Type.html
      WriteStream stream = WriteStream.newBuilder().setType(WriteStream.Type.PENDING).build();

      // Configure in-stream automatic retry settings.
      // Error codes that are immediately retried:
      // * ABORTED, UNAVAILABLE, CANCELLED, INTERNAL, DEADLINE_EXCEEDED
      // Error codes that are retried with exponential backoff:
      // * RESOURCE_EXHAUSTED
      RetrySettings retrySettings =
          RetrySettings.newBuilder()
              .setInitialRetryDelay(Duration.ofMillis(500))
              .setRetryDelayMultiplier(1.1)
              .setMaxAttempts(5)
              .setMaxRetryDelay(Duration.ofMinutes(1))
              .build();

      CreateWriteStreamRequest createWriteStreamRequest =
          CreateWriteStreamRequest.newBuilder()
              .setParent(parentTable.toString())
              .setWriteStream(stream)
              .build();
      WriteStream writeStream = client.createWriteStream(createWriteStreamRequest);

      // Use the JSON stream writer to send records in JSON format.
      // For more information about JsonStreamWriter, see:
      // https://cloud.google.com/java/docs/reference/google-cloud-bigquerystorage/latest/com.google.cloud.bigquery.storage.v1.JsonStreamWriter
      streamWriter =
          JsonStreamWriter.newBuilder(writeStream.getName(), writeStream.getTableSchema())
              .setRetrySettings(retrySettings)
              .build();
    }

    public void append(JSONArray data, long offset)
        throws DescriptorValidationException, IOException, ExecutionException {
      synchronized (this.lock) {
        // If earlier appends have failed, we need to reset before continuing.
        if (this.error != null) {
          throw this.error;
        }
      }
      // Append asynchronously for increased throughput.
      ApiFuture<AppendRowsResponse> future = streamWriter.append(data, offset);
      ApiFutures.addCallback(
          future, new AppendCompleteCallback(this), MoreExecutors.directExecutor());
      // Increase the count of in-flight requests.
      inflightRequestCount.register();
    }

    public void cleanup(BigQueryWriteClient client) {
      // Wait for all in-flight requests to complete.
      inflightRequestCount.arriveAndAwaitAdvance();

      // Close the connection to the server.
      streamWriter.close();

      // Verify that no error occurred in the stream.
      synchronized (this.lock) {
        if (this.error != null) {
          throw this.error;
        }
      }

      // Finalize the stream.
      FinalizeWriteStreamResponse finalizeResponse =
          client.finalizeWriteStream(streamWriter.getStreamName());
      System.out.println("Rows written: " + finalizeResponse.getRowCount());
    }

    public String getStreamName() {
      return streamWriter.getStreamName();
    }

    static class AppendCompleteCallback implements ApiFutureCallback<AppendRowsResponse> {

      private final DataWriter parent;

      public AppendCompleteCallback(DataWriter parent) {
        this.parent = parent;
      }

      public void onSuccess(AppendRowsResponse response) {
        System.out.format("Append %d success\n", response.getAppendResult().getOffset().getValue());
        done();
      }

      public void onFailure(Throwable throwable) {
        synchronized (this.parent.lock) {
          if (this.parent.error == null) {
            StorageException storageException = Exceptions.toStorageException(throwable);
            this.parent.error =
                (storageException != null) ? storageException : new RuntimeException(throwable);
          }
        }
        System.out.format("Error: %s\n", throwable.toString());
        done();
      }

      private void done() {
        // Reduce the count of in-flight requests.
        this.parent.inflightRequestCount.arriveAndDeregister();
      }
    }
  }
}
```

### Node.js

To learn how to install and use the client library for BigQuery, see BigQuery client libraries. For more information, see the BigQuery Node.js API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
const {adapt, managedwriter} = require('@google-cloud/bigquery-storage');
const {WriterClient, Writer} = managedwriter;

const customer_record_pb = require('./customer_record_pb.js');
const {CustomerRecord} = customer_record_pb;

const protobufjs = require('protobufjs');
require('protobufjs/ext/descriptor');

async function appendRowsPending() {
  /**
   * If you make updates to the customer_record.proto protocol buffers definition,
   * run:
   *   pbjs customer_record.proto -t static-module -w commonjs -o customer_record.js
   *   pbjs customer_record.proto -t json --keep-case -o customer_record.json
   * from the /samples directory to generate the customer_record module.
   */

  // So that BigQuery knows how to parse the serialized_rows, create a
  // protocol buffer representation of your message descriptor.
  const root = protobufjs.loadSync('./customer_record.json');
  const descriptor = root.lookupType('CustomerRecord').toDescriptor('proto2');
  const protoDescriptor = adapt.normalizeDescriptor(descriptor).toJSON();

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // projectId = 'my_project';
  // datasetId = 'my_dataset';
  // tableId = 'my_table';

  const destinationTable = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;
  const streamType = managedwriter.PendingStream;
  const writeClient = new WriterClient({projectId});
  try {
    const writeStream = await writeClient.createWriteStreamFullResponse({
      streamType,
      destinationTable,
    });
    const streamId = writeStream.name;
    console.log(`Stream created: ${streamId}`);

    const connection = await writeClient.createStreamConnection({
      streamId,
    });
    const writer = new Writer({
      connection,
      protoDescriptor,
    });

    let serializedRows = [];
    const pendingWrites = [];

    // Row 1
    let row = {
      rowNum: 1,
      customerName: 'Octavia',
    };
    serializedRows.push(CustomerRecord.encode(row).finish());

    // Row 2
    row = {
      rowNum: 2,
      customerName: 'Turing',
    };
    serializedRows.push(CustomerRecord.encode(row).finish());

    // Set an offset to allow resuming this stream if the connection breaks.
    // Keep track of which requests the server has acknowledged and resume the
    // stream at the first non-acknowledged message. If the server has already
    // processed a message with that offset, it will return an ALREADY_EXISTS
    // error, which can be safely ignored.

    // The first request must always have an offset of 0.
    let offsetValue = 0;

    // Send batch.
    let pw = writer.appendRows({serializedRows}, offsetValue);
    pendingWrites.push(pw);

    serializedRows = [];

    // Row 3
    row = {
      rowNum: 3,
      customerName: 'Bell',
    };
    serializedRows.push(CustomerRecord.encode(row).finish());

    // Offset must equal the number of rows that were previously sent.
    offsetValue = 2;

    // Send batch.
    pw = writer.appendRows({serializedRows}, offsetValue);
    pendingWrites.push(pw);

    const results = await Promise.all(
      pendingWrites.map(pw => pw.getResult()),
    );
    console.log('Write results:', results);

    const {rowCount} = await connection.finalize();
    console.log(`Row count: ${rowCount}`);

    const response = await writeClient.batchCommitWriteStream({
      parent: destinationTable,
      writeStreams: [streamId],
    });

    console.log(response);
  } catch (err) {
    console.log(err);
  } finally {
    writeClient.close();
  }
}
```

### Python

This example shows a simple record with two fields. For a longer example that shows how to send different data types, including `STRUCT` types, see the append_rows_proto2 sample on GitHub.

To learn how to install and use the client library for BigQuery, see BigQuery client libraries. For more information, see the BigQuery Python API reference documentation.

To authenticate to BigQuery, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
"""
This code sample demonstrates how to write records in pending mode
using the low-level generated client for Python.
"""

from google.protobuf import descriptor_pb2

from google.cloud import bigquery_storage_v1
from google.cloud.bigquery_storage_v1 import types, writer

# If you update the customer_record.proto protocol buffer definition, run:
#
#   protoc --python_out=. customer_record.proto
#
# from the samples/snippets directory to generate the customer_record_pb2.py module.
from . import customer_record_pb2


def create_row_data(row_num: int, name: str):
    row = customer_record_pb2.CustomerRecord()
    row.row_num = row_num
    row.customer_name = name
    return row.SerializeToString()


def append_rows_pending(project_id: str, dataset_id: str, table_id: str):
    """Create a write stream, write some sample data, and commit the stream."""
    write_client = bigquery_storage_v1.BigQueryWriteClient()
    parent = write_client.table_path(project_id, dataset_id, table_id)
    write_stream = types.WriteStream()

    # When creating the stream, choose the type. Use the PENDING type to wait
    # until the stream is committed before it is visible. See:
    # https://cloud.google.com/bigquery/docs/reference/storage/rpc/google.cloud.bigquery.storage.v1#google.cloud.bigquery.storage.v1.WriteStream.Type
    write_stream.type_ = types.WriteStream.Type.PENDING
    write_stream = write_client.create_write_stream(
        parent=parent, write_stream=write_stream
    )
    stream_name = write_stream.name

    # Create a template with fields needed for the first request.
    request_template = types.AppendRowsRequest()

    # The initial request must contain the stream name.
    request_template.write_stream = stream_name

    # So that BigQuery knows how to parse the serialized_rows, generate a
    # protocol buffer representation of your message descriptor.
    proto_schema = types.ProtoSchema()
    proto_descriptor = descriptor_pb2.DescriptorProto()
    customer_record_pb2.CustomerRecord.DESCRIPTOR.CopyToProto(proto_descriptor)
    proto_schema.proto_descriptor = proto_descriptor
    proto_data = types.AppendRowsRequest.ProtoData()
    proto_data.writer_schema = proto_schema
    request_template.proto_rows = proto_data

    # Some stream types support an unbounded number of requests. Construct an
    # AppendRowsStream to send an arbitrary number of requests to a stream.
    append_rows_stream = writer.AppendRowsStream(write_client, request_template)

    # Create a batch of row data by appending proto2 serialized bytes to the
    # serialized_rows repeated field.
    proto_rows = types.ProtoRows()
    proto_rows.serialized_rows.append(create_row_data(1, "Alice"))
    proto_rows.serialized_rows.append(create_row_data(2, "Bob"))

    # Set an offset to allow resuming this stream if the connection breaks.
    # Keep track of which requests the server has acknowledged and resume the
    # stream at the first non-acknowledged message. If the server has already
    # processed a message with that offset, it will return an ALREADY_EXISTS
    # error, which can be safely ignored.
    #
    # The first request must always have an offset of 0.
    request = types.AppendRowsRequest()
    request.offset = 0
    proto_data = types.AppendRowsRequest.ProtoData()
    proto_data.rows = proto_rows
    request.proto_rows = proto_data

    response_future_1 = append_rows_stream.send(request)

    # Send another batch.
    proto_rows = types.ProtoRows()
    proto_rows.serialized_rows.append(create_row_data(3, "Charles"))

    # Since this is the second request, you only need to include the row data.
    # The name of the stream and protocol buffers DESCRIPTOR is only needed in
    # the first request.
    request = types.AppendRowsRequest()
    proto_data = types.AppendRowsRequest.ProtoData()
    proto_data.rows = proto_rows
    request.proto_rows = proto_data

    # Offset must equal the number of rows that were previously sent.
    request.offset = 2

    response_future_2 = append_rows_stream.send(request)

    print(response_future_1.result())
    print(response_future_2.result())

    # Shutdown background threads and close the streaming connection.
    append_rows_stream.close()

    # A PENDING type stream must be "finalized" before being committed. No new
    # records can be written to the stream after this method has been called.
    write_client.finalize_write_stream(name=write_stream.name)

    # Commit the stream you created earlier.
    batch_commit_write_streams_request = types.BatchCommitWriteStreamsRequest()
    batch_commit_write_streams_request.parent = parent
    batch_commit_write_streams_request.write_streams = [write_stream.name]
    write_client.batch_commit_write_streams(batch_commit_write_streams_request)

    print(f"Writes to stream: '{write_stream.name}' have been committed.")
```

This code example depends on a compiled protocol module, `customer_record_pb2.py`. To create the compiled module, execute `protoc --python_out=. customer_record.proto`, where `protoc` is the protocol buffer compiler. The `customer_record.proto` file defines the format of the messages used in the Python example.

```
// The BigQuery Storage API expects protocol buffer data to be encoded in the
// proto2 wire format. This allows it to disambiguate missing optional fields
// from default values without the need for wrapper types.
syntax = "proto2";

// Define a message type representing the rows in your table. The message
// cannot contain fields which are not present in the table.
message CustomerRecord {

  optional string customer_name = 1;

  // Use the required keyword for client-side validation of required fields.
  required int64 row_num = 2;
}
```

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