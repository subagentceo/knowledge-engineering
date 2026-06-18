

# What is Amazon SageMaker?
<a name="what-is-sagemaker"></a>

 Bringing together widely adopted [artificial intelligence (AI)](https://aws.amazon.com/ai/) and [analytics](https://aws.amazon.com/big-data/datalakes-and-analytics/) capabilities, the next generation of [Amazon SageMaker](https://aws.amazon.com/sagemaker/) delivers an integrated experience for analytics and AI with unified access to all your data. Collaborate and build in Amazon SageMaker Unified Studio using familiar AWS tools for SQL analytics, data processing, model development, and generative AI, accelerated by [Amazon Q Developer](https://aws.amazon.com/q/). Access all your data whether it's stored in data lakes, data warehouses, or third-party or federated data sources, with governance built in to meet enterprise security needs. 

[![AWS Videos](http://img.youtube.com/vi/EJsbKexFzrc?si=JriG72jedZHpNZvX/0.jpg)](http://www.youtube.com/watch?v=EJsbKexFzrc?si=JriG72jedZHpNZvX)


## Guide to SageMaker
<a name="guide-to-sagemaker"></a>

 The next generation of Amazon SageMaker was [announced at re:Invent 2024](https://aws.amazon.com/blogs/big-data/the-next-generation-of-amazon-sagemaker-the-center-for-all-your-data-analytics-and-ai/) serves as the center for all data, analytics, and AI. Analytics and AI workflows are converging, with organizations now using the same data sources for traditional analytics, machine learning, and generative AI. In response, AWS has created the next generation of SageMaker to serve as a unified platform for these workflows. The next generation of SageMaker brings together the purpose-built components needed for data exploration, preparation and integration, big data processing, SQL analytics, machine learning (ML) model development and training, and generative AI application development. 

**Note**  
The original Amazon SageMaker has been renamed [SageMaker AI](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html). It is available in the next generation Amazon SageMaker for those who wish to use it alongside additional capabilities, or as a standalone service for those who wish to focus specifically on building, training, and deploying AI and ML models at scale. 

 The next generation of Amazon SageMaker consists of two primary components: 

1. Amazon SageMaker Unified Studio, which provides an integrated experience to use all your data and tools for analytics and AI

1. Data and AI governance, which applies enterprise-level security and data management with built-in governance throughout the entire data and AI lifecycle

Additionally, SageMaker is built upon an open lakehouse architecture that unifies access to all your data across Amazon Simple Storage Service ([Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html)) data lakes, [Amazon Redshift](https://docs.aws.amazon.com/redshift/) data warehouses, and other external sources

![A diagram showing the SageMaker architecture.](http://docs.aws.amazon.com/next-generation-sagemaker/latest/userguide/images/What_is_SageMaker_Diagram.png)


### Unified Studio
<a name="unified-studio"></a>

 [Amazon SageMaker Unified Studio](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/what-is-sagemaker-unified-studio.html) is a single data and AI development environment that brings together functionality and tools that AWS offers in [Amazon EMR](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html), [AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html), [Amazon Athena](https://docs.aws.amazon.com/athena/latest/ug/what-is.html), [Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html), [Amazon MWAA](https://docs.aws.amazon.com/mwaa/latest/userguide/what-is-mwaa.html), [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html), and [Amazon SageMaker AI](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html). From within the unified studio, you can discover, access, and query data and AI assets, then collaborate to build and share analytics and AI artifacts, including data, models, and generative AI applications. 

### Data & AI governance
<a name="data-ai-governance"></a>

 The next generation of Amazon SageMaker simplifies the discovery, governance, and collaboration for data and AI. With [Amazon SageMaker Catalog](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/working-with-business-catalog.html), users can securely discover and access approved data and assets using semantic search with generative AI–created metadata, or you could just ask [Amazon Q Developer](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html) with natural language to find your data. Seamlessly share and collaborate on data and AI assets through publishing and subscribing workflows. With SageMaker, you can apply [Amazon Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html) to protect and filter your model outputs, helping ensure responsible gen AI application development. Build trust throughout your organization with [data quality monitoring](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/data-quality.html), sensitive data detection, and data and machine learning (ML) [lineage](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/datazone-data-lineage.html). 

### Lakehouse architecture
<a name="lakehouse"></a>

 The next generation of Amazon SageMaker is built on an [open lakehouse architecture](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/lakehouse.html), fully compatible with [Apache Iceberg](https://docs.aws.amazon.com/prescriptive-guidance/latest/apache-iceberg-on-aws/introduction.html). Unify all your data across Amazon S3 data lakes and Amazon Redshift data warehouses to build analytics and AI/ML applications on a single copy of data. The lakehouse gives you the flexibility to access and [query your data with Apache Iceberg–compatible tools and engines](https://docs.aws.amazon.com/athena/latest/ug/querying-iceberg.html). You can also connect to [federated data sources](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/lakehouse-data-connection.html) such as Amazon DynamoDB, Google BigQuery, and Snowflake and query your data in-place. With [zero-ETL integrations](https://docs.aws.amazon.com/redshift/latest/mgmt/zero-etl-using.html), you can bring data from operational databases and 3rd party applications into your lakehouse in near real-time. Integrated fine-grained access controls help you secure your data to ensure only the right people have access to the right data. 

## Capabilities of Amazon SageMaker Unified Studio
<a name="capabilities"></a>

 The next generation of Amazon SageMaker and its unified studio provide an integrated experience to use all your data and tools for analytics and AI. Discover your data and put it to work using familiar AWS tools for model development, generative AI, data processing, and [SQL analytics](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/sql-query.html). Work across compute resources using unified notebooks, discover and query diverse data sources with a built-in SQL editor, train and deploy AI models at scale, and rapidly build custom generative AI applications. Create and securely share analytics and AI artifacts such as data, models, and generative AI applications to bring data products to market faster. 

Some common capabilities of Amazon SageMaker Unified Studio include the following:

### SQL analytics
<a name="sql-analytics"></a>

 Leverage SageMaker's SQL analytic capabilities across all of your unified data through Amazon SageMaker's lakehouse architecture. Users have the [flexibility to use Athena or Redshift query engines](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/query-editor-navigate.html) to support their analytical workloads. Query your data in open formats stored on Amazon S3 with high performance through [Amazon Athena](https://docs.aws.amazon.com/athena/latest/ug/what-is.html), eliminating the need to move or duplicate data between your data lakes and data warehouse. Include your Redshift data as part of the [lakehouse architecture](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/lakehouse-how.html), leveraging the Redshift query engine for SQL workloads on structured data. 

### Data processing
<a name="data-processing"></a>

 Prepare, orchestrate, and process your data with capabilities in SageMaker, allowing you to run Apache Spark, Trino, and other open-source analytics frameworks in a unified data and AI development environment. [Process your data](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/compute.html), wherever it lives, with connectivity to hundreds of data sources with Amazon Athena, Amazon EMR, and AWS Glue. 

### Data integration
<a name="data-integration"></a>

 You can use data integration capabilities in Amazon SageMaker to connect to and act on all your data. With AWS data integration capabilities, you can bring together data from multiple sources, operationalize it, and manage to deliver high quality data to your lakehouse architecture, across your data lakes and data warehouses. 

**Note**  
 *What data sources am I able to integrate with Amazon SageMaker?*   
 You are able to unify all your data across Amazon Redshift data warehouses and Amazon S3 data lakes, including S3 Tables, with SageMaker's lakehouse architecture. Bring your operational databases and 3rd party application data like Salesforce and SAP to the lakehouse in near real time through [zero-ETL integrations](https://docs.aws.amazon.com/glue/latest/dg/zero-etl-using.html). You can use [hundreds of connectors](https://docs.aws.amazon.com/glue/latest/dg/available-connections.html) to integrate data from various sources. Additionally, you can access and query data in-place with [federated query capabilities](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/lakehouse-data-connection.html#lakehouse-data-connection-supported) across third-party data sources. 

### Machine learning and model development
<a name="ml-model-development"></a>

 [Amazon SageMaker AI](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html) is a fully managed service that brings together a broad set of tools to enable high-performance, low-cost machine learning (ML). Most capabilities of SageMaker AI are available as part of Amazon SageMaker Unified Studio, in addition to being available in Amazon SageMaker Studio. With SageMaker AI, you can [build](https://docs.aws.amazon.com/sagemaker/latest/dg/gs-console.html), [train](https://docs.aws.amazon.com/sagemaker/latest/dg/train-model.html) and [deploy](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html) ML models at scale using tools like notebooks, debuggers, profilers, pipelines, MLOps, and more—all in one integrated development environment (IDE). 

**Note**  
 * When should I use [SageMaker Unified Studio](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/what-is-sagemaker-unified-studio.html) instead of [SageMaker AI](https://docs.aws.amazon.com/sagemaker/latest/dg/studio-updated.html) studio? *  
 Currently, SageMaker Unified Studio should be used when you are looking to unify and share your data as a single integrated experience across analytics, ML, and gen AI workloads. You are able to eliminate data silos with an open lakehouse architecture to unify access to data lakes, data warehouses, third-party or federated data sources, and meet all enterprise security needs with built-in data and AI governance.   
 If you want to solely focus on the purpose-built tools to perform all machine learning (ML) development steps, from preparing data to building, training, deploying, and managing your ML and gen AI models, SageMaker Studio remains a great choice. Additionally, use SageMaker Studio when there are requirements for [RStudio](https://docs.aws.amazon.com/sagemaker/latest/dg/rstudio.html), [Canvas](https://docs.aws.amazon.com/sagemaker/latest/dg/canvas.html), [real-time collaboration](https://docs.aws.amazon.com/sagemaker/latest/dg/domain-space.html) via shared spaces, and [Feature Store](https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html). 

### Generative AI application development
<a name="gen-ai-development"></a>

 [Access Amazon Bedrock's capabilities through SageMaker Unified Studio](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/bedrock.html) to quickly build and customize your generative AI applications. This intuitive interface lets you work with high-performing foundation models (FMs) from leading companies like Anthropic, Mistral, Meta, and Amazon, and use advanced features like [Amazon Bedrock Knowledge Bases](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/creating-a-knowledge-base-component.html), [Amazon Bedrock Guardrails](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/guardrails.html), [Amazon Bedrock Agents](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/app-deploy.html), and [Amazon Bedrock Flows](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/create-flows-app.html). You can develop generative AI applications faster within SageMaker Unified Studio's secure environment, ensuring alignment with your requirements and responsible AI guidelines. 

**Note**  
 * When should I use Bedrock in SageMaker Unified Studio versus the [standalone Amazon Bedrock service](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)? *  
 Amazon Bedrock's capabilities in Amazon SageMaker Unified Studio are ideal for enterprise teams who need a governed low-code/no-code environment for collaboratively building and deploying generative AI applications, alongside unified analytics and machine learning capabilities.   
 Customers can use the standalone Bedrock service from the AWS Management Console or Bedrock API when they want to leverage the full feature set of Bedrock including the latest agents, flow and guardrail enhancements, and the Bedrock SDK. 

## Get started with Amazon SageMaker
<a name="get-started"></a>

You can view demos of Amazon SageMaker and get started by setting up a domain and project.

### View demos of Amazon SageMaker
<a name="get-started-demos"></a>

 To see Amazon SageMaker before using it yourself, you can review the following clickthrough demos:
+ For an end-to-end demo, see [the Amazon SageMaker detailed clickthrough experience](https://aws.storylane.io/share/szmiwp3unlio). This demo includes SageMaker Lakehouse, Amazon SageMaker Catalog, and more in Amazon SageMaker Unified Studio.
+ For a demo of SageMaker Lakehouse, see [Amazon SageMaker: Access data in your lakehouse](https://aws.storylane.io/share/xo2xinwrkiey). This demo includes SageMaker Lakehouse in Amazon SageMaker Unified Studio, including adding a data source and querying data.
+ For a demo of the Amazon SageMaker Catalog, see [Amazon SageMaker: Catalog](https://aws.storylane.io/share/3siijvynnjzu). This demo includes Amazon SageMaker Catalog in Amazon SageMaker Unified Studio, including browsing assets and subscribing to an asset.
+ For a demo of generative AI, see [Amazon SageMaker: Generative AI playground and Gen AI app development](https://aws.storylane.io/share/a1mpxfjgstqw).

### Get started with setting up Amazon SageMaker
<a name="get-started-setup"></a>

 To get started using Amazon SageMaker, go to [Setting up Amazon SageMaker](setting-up.md) in this guide to set up a domain and create a project. This domain setup and project creation is a prerequisite for all other tasks in Amazon SageMaker. 