# Configure connections with network attachments

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

# Configure connections with network attachments

BigQuery supports federated queries that let you send a query statement to external databases and get the result back as a temporary table. Federated queries use the BigQuery Connection API to establish a connection. This document shows you how to increase the security of this connection.

Because the connection connects directly to your database, you must allow traffic from Google Cloud to your database engine. To increase security, you should only allow traffic that comes from your BigQuery queries. This traffic restriction can be accomplished in one of two ways:

*   By defining a static IP address that is used by a BigQuery connection and adding it to the firewall rules of the external data source.
*   By creating a VPN between BigQuery and your internal infrastructure, and using it for your queries.

Both of these techniques are supported through the use of network attachments.

## Before you begin

Grant Identity and Access Management (IAM) roles that give users the necessary permissions to perform each task in this document.

### Required roles

To get the permissions that you need to configure a connection with network attachments, ask your administrator to grant you the Compute Admin (`roles/compute.admin`) IAM role on the project. For more information about granting roles, see Manage access to projects, folders, and organizations.

This predefined role contains the permissions required to configure a connection with network attachments. To see the exact permissions that are required, expand the **Required permissions** section:

#### Required permissions

The following permissions are required to configure a connection with network attachments:

*   `compute.networkAttachments.get`
*   `compute.networkAttachments.update`

You might also be able to get these permissions with custom roles or other predefined roles.

For more information about IAM roles and permissions in BigQuery, see BigQuery IAM roles and permissions.

## Limitations

Connections with network attachments are subject to the following limitations:

*   Network attachments are supported only for SAP Datasphere connections.
*   For standard regions, network attachments must be located in the same region as the connection. For connections in the `US` multi-region, the network attachment must be located in the `us-central1` region. For connections in the `EU` multi-region, the network attachment must be located in the `europe-west4` region.
*   You can't make any changes to your network attachment after you create it. To configure anything in a new way, you need to recreate the network attachment.
*   Network attachments can't be deleted unless the producer (BigQuery) deletes the allocated resources. To initiate the deletion process, you must contact BigQuery support.

## Create a network attachment

When you create a connection for query federation, you can use the optional network attachment parameter, which points to a network attachment that provides connectivity to the network from which the connection to your database is established. You can create a network attachment by either defining a static IP address or creating a VPN. For either option, do the following:

1.  If you don't already have one, create a VPC network and subnet.
    
2.  If you want to create a network attachment by defining a static IP address, create a Cloud NAT gateway with a static IP address, using the network, region, and subnet that you created. If you want to create a network attachment by creating a VPN, create a VPN that is connected to your private network.
    
3.  Create a network attachment using the network, region, and subnet that you created.
    
4.  Optional: Depending on your organization's security policies, you might need to configure your Google Cloud firewall to allow egress by creating a firewall rule with the following settings:
    
    *   Set **Targets** to **All instances in the network**.
    *   Set **Destination IPv4 ranges** to the entire IP address range.
    *   Set **Specified protocols and ports** to the port that is used by your database.
5.  Configure your internal firewall to allow ingress from the static IP address that you created. This process varies by data source.
    
6.  Create a connection, and include the name of the network attachment that you created.
    
7.  Run any federated query to synchronize your project with the network attachment.
    

Your connection is now configured with a network attachment, and you can run federated queries.

## Pricing

*   Standard federated query pricing applies.
*   Using VPC is subject to Virtual Private Cloud pricing.
*   Using Cloud VPN is subject to Cloud VPN pricing.
*   Using Cloud NAT is subject to Cloud NAT pricing.

## What's next

*   Learn about different connection types.
*   Learn about managing connections.
*   Learn about federated queries.

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