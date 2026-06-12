# Configure and use entity resolution in BigQuery

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

# Configure and use entity resolution in BigQuery

This document describes how to implement entity resolution for end users and identity providers.

You can use this document to connect with an identity provider and use their service to match records. Identity providers can use this document to set up services to share with you on the Google Cloud Marketplace.

## Workflow for end users

The following sections show you how to configure entity resolution in BigQuery. For a visual representation of the complete setup, see entity resolution architecture.

### Before you begin

1.  Contact an identity provider. BigQuery supports entity resolution with LiveRamp and TransUnion.
2.  Get the following items from the identity provider:
    *   Service account credentials
    *   Remote function signature
3.  Create two datasets in your Google Cloud project:
    *   Input dataset
    *   Output dataset

### Required roles

To get the permissions that you need to run entity resolution jobs, ask your administrator to grant you the following IAM roles:

*   For the identity provider's service account to read the input dataset and write to the output dataset:
    *   BigQuery Data Viewer (`roles/bigquery.dataViewer`) on the input dataset
    *   BigQuery Data Editor (`roles/bigquery.dataEditor`) on the output dataset

For more information about granting roles, see Manage access to projects, folders, and organizations.

You might also be able to get the required permissions through custom roles or other predefined roles.

### Translate or resolve entities

For identity provider-specific instructions, see the following sections.

### LiveRamp

#### Prerequisites

*   Configure LiveRamp Embedded Identity in BigQuery. For more information, see Enabling LiveRamp Embedded Identity in BigQuery.
*   Coordinate with LiveRamp to enable API credentials for use with Embedded Identity. For more information, see Authentication.

#### Setup

The following steps are required when you use LiveRamp Embedded Identity for the first time. After setup, you only need to modify the input table and metadata table between runs.

##### Create an input table

Create a table in the input dataset. Populate the table with RampIDs, target domains, and target types. For details and examples, see Input Table Columns and Descriptions.

##### Create a metadata table

The metadata table controls the execution of LiveRamp Embedded Identity on BigQuery. Create a metadata table in the input dataset. Populate the metadata table with client IDs, execution modes, target domains, and target types. For details and examples, see Metadata Table Columns and Descriptions.

##### Share tables with LiveRamp

Grant the LiveRamp Google Cloud service account access to view and process data in your input dataset. For details and examples, see Share Tables and Datasets with LiveRamp.

#### Run an embedded identity job

To run an embedded identity job with LiveRamp in BigQuery, complete the following steps:

1.  Confirm that all RampIDs that were encoded in your domain are in your input table.
2.  Confirm that your metadata table is still accurate before you run the job.
3.  Contact LiveRampIdentitySupport@liveramp.com with a job process request. Include the project ID, dataset ID, and table ID (if applicable) for your input table, metadata table, and output dataset.

Results are generally delivered to your output dataset within three business days.

#### LiveRamp support

For support issues, contact LiveRamp Identity Support.

#### LiveRamp billing

LiveRamp handles billing for entity resolution.

### TransUnion

#### Prerequisites

*   Contact TransUnion Cloud Support to sign an agreement to access the service. Provide your Google Cloud project ID, input data types, use case, and data volume.
*   TransUnion Cloud Support enables the service for your Google Cloud project and shares a detailed implementation guide that includes available output data.

#### Setup

The following steps are required when you use TransUnion's TruAudience Identity Resolution and Enrichment service in your BigQuery environment.

##### Create an external connection

Create a connection to an external data source of the **Vertex AI remote models, remote functions and BigLake (Cloud Resource)** type. You use this connection to trigger the identity resolution service hosted in the TransUnion Google Cloud account from your Google Cloud account.

Copy the connection ID and service account ID and share these identifiers with the TransUnion customer delivery team.

##### Create a remote function

Create a remote function to interact with the service orchestrator endpoint hosted on the TransUnion Google Cloud project to pass the necessary metadata (including schema mappings) to the TransUnion service. Use the connection ID from the external connection that you created and the TransUnion-hosted cloud function endpoint shared by the TransUnion customer delivery team.

##### Create an input table

Create a table in the input dataset. TransUnion supports name, postal address, email, phone, date of birth, IPv4 address, and device IDs as inputs. Follow the formatting guidelines in the implementation guide that TransUnion shared with you.

##### Create a metadata table

Create a metadata table to store the configuration required by the identity resolution service to process data, including schema mappings. For details and examples, see the implementation guide that TransUnion shared with you.

##### Create a job status table

Create a table to receive updates about the processing of an input batch. You can query this table to trigger other downstream processes in your pipeline. Possible job statuses include `RUNNING`, `COMPLETED`, or `ERROR`.

##### Create the service invocation

Use the following procedure to call the TransUnion identity resolution service after collecting all the metadata, packaging it, and passing it to the invocation cloud function endpoint hosted by TransUnion.

```
-- create service invocation procedure
CREATE OR REPLACE
  PROCEDURE
    `<project_id>.<dataset_id>.TransUnion_get_identities`(metadata_table STRING, config_id STRING)
      begin
        declare sql_query STRING;

declare json_result STRING;
declare base64_result STRING;

SET sql_query =
  '''select to_json_string(array_agg(struct(config_id,key,value))) from `''' || metadata_table
  || '''` where  config_id="''' || config_id || '''" ''';

EXECUTE immediate sql_query INTO json_result;

SET base64_result = (SELECT to_base64(CAST(json_result AS bytes)));

SELECT `<project_id>.<dataset_id>.remote_call_TransUnion_er`(base64_result);

END;
```

##### Create the matching output table

Run the following SQL script to create the matching output table. This is the standard output of the application, which includes match flags, scores, persistent individual IDs, and household IDs.

```
-- create output table
CREATE TABLE `<project_id>.<dataset_id>.TransUnion_identity_output`(
  batchid STRING,
  uniqueid STRING,
  ekey STRING,
  hhid STRING,
  collaborationid STRING,
  firstnamematch STRING,
  lastnamematch STRING,
  addressmatches STRING,
  addresslinkagescores STRING,
  phonematches STRING,
  phonelinkagescores STRING,
  emailmatches STRING,
  emaillinkagescores STRING,
  dobmatches STRING,
  doblinkagescore STRING,
  ipmatches STRING,
  iplinkagescore STRING,
  devicematches STRING,
  devicelinkagescore STRING,
  lastprocessed STRING);
```

##### Configure metadata

Follow the implementation guide that TransUnion shared with you to map your input schema to the application schema. This metadata also configures the generation of collaboration IDs, which are shareable non-persistent identifiers that can be used in data clean rooms.

#### Grant read and write access

Obtain the service account ID of the Apache Spark connection from the TransUnion customer delivery team and grant it read and write access to the dataset containing the input and output tables. We recommend providing the service account ID with a BigQuery Data Editor role on the dataset.

#### Invoke the application

You can invoke the application from within your environment by running the following script.

**Note:** You can use multiple input tables, as long as they are mapped to different metadata configurations.

```
call `<project_id>.<dataset_id>.TransUnion_get_identities`("<project_id>.<dataset_id>.TransUnion_er_metadata","1");
-- using metadata table, and 1 = config_id for the batch run
```

#### Support

For technical issues, contact TransUnion Cloud Support.

#### Billing and usage

TransUnion tracks usage of the application and uses it for billing purposes. Active customers can contact their TransUnion delivery representative for more information.

## Workflow for identity providers

The following sections show you how to configure entity resolution in BigQuery. For a visual representation of the complete setup, see entity resolution architecture.

### Before you begin

1.  Create a Cloud Run job or a Cloud Run function to integrate with the remote function. Both options are suitable for this purpose.
2.  Get the name of the service account that's associated with the Cloud Run or Cloud Run function:
    
    1.  In the Google Cloud console, go to the **Cloud Functions** page.
        
        Go to Cloud Functions
        
    2.  Click the function's name, and then click the **Details** tab.
        
    3.  In the **General Information** pane, find and record the service account name for the remote function.
        
3.  Create a remote function.
    
4.  Get end-user principals from the end user.
    

### Required roles

To get the permissions that you need to run entity resolution jobs, ask your administrator to grant you the following IAM roles:

*   For the service account that's associated with your function to read and write to associated datasets and launch jobs:
    *   BigQuery Data Editor (`roles/bigquery.dataEditor`) on the project
    *   BigQuery Job User (`roles/bigquery.jobUser`) on the project
*   For the end-user principal to see and connect to the remote function:
    *   BigQuery Connection User (`roles/bigquery.connectionUser`) on the connection
    *   BigQuery Data Viewer (`roles/bigquery.dataViewer`) on the control plane dataset with the remote function

For more information about granting roles, see Manage access to projects, folders, and organizations.

You might also be able to get the required permissions through custom roles or other predefined roles.

### Share entity resolution remote function

Modify and share the following remote interface code with the end user. The end user needs this code to start the entity resolution job.

```
`PARTNER_PROJECT_ID.DATASET_ID`.match`(LIST_OF_PARAMETERS)
```

Replace LIST_OF_PARAMETERS with the list of parameters that are passed to the remote function.

### Optional: Provide job metadata

You can optionally provide job metadata by using a separate remote function or by writing a new status table in the user's output dataset. Examples of metadata include job statuses and metrics.

## Billing for identity providers

To streamline customer billing and onboarding, integrate your entity resolution service with the Google Cloud Marketplace. This lets you set up a pricing model based on the entity resolution job usage, with Google handling the billing for you. For more information, see Offering software as a service (SaaS) products.

## What's next

*   Learn about entity resolution in BigQuery sharing.
*   Learn how to create a remote function.
*   Learn how to create a connection to an external data source.
*   For identity providers, learn how to make your entity resolution service available on Google Cloud Marketplace.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-06-09 UTC.

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