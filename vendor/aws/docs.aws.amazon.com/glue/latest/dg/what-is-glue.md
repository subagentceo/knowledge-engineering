

# What is AWS Glue?
<a name="what-is-glue"></a>

 AWS Glue is a serverless data integration service that makes it easy for analytics users to discover, prepare, move, and integrate data from multiple sources. You can use it for analytics, machine learning, and application development. It also includes additional productivity and data ops tooling for authoring, running jobs, and implementing business workflows. 

 With AWS Glue, you can discover and connect to more than 70 diverse data sources and manage your data in a centralized data catalog. You can visually create, run, and monitor extract, transform, and load (ETL) pipelines to load data into your data lakes. Also, you can immediately search and query cataloged data using Amazon Athena, Amazon EMR, and Amazon Redshift Spectrum. 

 AWS Glue consolidates major data integration capabilities into a single service. These include data discovery, modern ETL, cleansing, transforming, and centralized cataloging. It's also serverless, which means there's no infrastructure to manage. With flexible support for all workloads like ETL, ELT, and streaming in one service, AWS Glue supports users across various workloads and types of users. 

 Also, AWS Glue makes it easy to integrate data across your architecture. It integrates with AWS analytics services and Amazon S3 data lakes. AWS Glue has integration interfaces and job-authoring tools that are easy to use for all users, from developers to business users, with tailored solutions for varied technical skill sets. 

[![AWS Videos](http://img.youtube.com/vi/u14iVEc-C6E/0.jpg)](http://www.youtube.com/watch?v=u14iVEc-C6E)


 With the ability to scale on demand, AWS Glue helps you focus on high-value activities that maximize the value of your data. It scales for any data size, and supports all data types and schema variances. To increase agility and optimize costs, AWS Glue provides built-in high availability and pay-as-you-go billing. 

For pricing information, see [AWS Glue pricing](https://aws.amazon.com/glue/pricing).

 **AWS Glue Studio** 

 AWS Glue Studio is a graphical interface that makes it easy to create, run, and monitor data integration jobs in AWS Glue. You can visually compose data transformation workflows and seamlessly run them on the Apache Spark–based serverless ETL engine in AWS Glue. 

With AWS Glue Studio, you can create and manage jobs that gather, transform, and clean data. You can also use AWS Glue Studio to troubleshoot and edit job scripts. 

**Topics**
+ [AWS Glue features](#glue-features-summary)
+ [Learning about innovations in AWS Glue](#innovations-in-glue)
+ [Getting started with AWS Glue](#getting-started-with-glue)
+ [Accessing AWS Glue](#accessing-aws-glue)
+ [Related services](#what-is-glue-related-services)
+ [AWS Glue for Ray end of support](awsglue-ray-jobs-availability-change.md)

## AWS Glue features
<a name="glue-features-summary"></a>

AWS Glue features fall into three major categories: 
+  Discover and organize data 
+  Transform, prepare, and clean data for analysis 
+  Build and monitor data pipelines 

 **Discover and organize data** 
+  **Unify and search across multiple data stores** – Store, index, and search across multiple data sources and sinks by cataloging all your data in AWS. 
+  **Automatically discover data ** – Use AWS Glue crawlers to automatically infer schema information and integrate it into your AWS Glue Data Catalog. 
+  **Manage schemas and permissions** – Validate and control access to your databases and tables. 
+  **Connect to a wide variety of data sources** – Tap into multiple data sources, both on premises and on AWS, using AWS Glue connections to build your data lake. 

 **Transform, prepare, and clean data for analysis** 
+  **Visually transform data with a job canvas interface** – Define your ETL process in the visual job editor and automatically generate the code to extract, transform, and load your data. 
+  **Build complex ETL pipelines with simple job scheduling** – Invoke AWS Glue jobs on a schedule, on demand, or based on an event. 
+  **Clean and transform streaming data in transit** – Enable continuous data consumption, and clean and transform it in transit. This makes it available for analysis in seconds in your target data store. 
+ **Deduplicate and cleanse data with built-in machine learning** – Clean and prepare your data for analysis without becoming a machine learning expert by using the `FindMatches` feature. This feature deduplicates and finds records that are imperfect matches for each other. 
+  **Built-in job notebooks** – AWS Glue job notebooks provide serverless notebooks with minimal setup in AWS Glue so you can get started quickly. 
+  **Edit, debug, and test ETL code** – With AWS Glue interactive sessions, you can interactively explore and prepare data. You can explore, experiment on, and process data interactively using the IDE or notebook of your choice. 
+  **Define, detect, and remediate sensitive data** – AWS Glue sensitive data detection lets you define, identify, and process sensitive data in your data pipeline and in your data lake. 

 **Build and monitor data pipelines** 
+  **Automatically scale based on workload** – Dynamically scale resources up and down based on workload. This assigns workers to jobs only when needed. 
+  **Automate jobs with event-based triggers** – Start crawlers or AWS Glue jobs with event-based triggers, and design a chain of dependent jobs and crawlers. 
+  **Run and monitor jobs** – Run AWS Glue jobs with your choice of engine, Spark or Ray. Monitor them with automated monitoring tools, AWS Glue job run insights, and AWS CloudTrail. Improve your monitoring of Spark-backed jobs with the Apache Spark UI.
+  **Define workflows for ETL and integration activities** – Define workflows for ETL and integration activities for multiple crawlers, jobs, and triggers. 

## Learning about innovations in AWS Glue
<a name="innovations-in-glue"></a>

Learn about the latest innovations in AWS Glue and hear how customers use AWS Glue to enable self-service data preparation across their organization.

[![AWS Videos](http://img.youtube.com/vi/cDDPg_XxPqc/0.jpg)](http://www.youtube.com/watch?v=cDDPg_XxPqc)


Learn about how customers scale AWS Glue beyond the traditional setup and how they configure AWS Glue for job monitoring and performance.

[![AWS Videos](http://img.youtube.com/vi/ce6t3FqB_Z4/0.jpg)](http://www.youtube.com/watch?v=ce6t3FqB_Z4)


## Getting started with AWS Glue
<a name="getting-started-with-glue"></a>

 We recommend that you start with the following sections: 
+  [ Overview of using AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/start-console-overview.html) 
+  [AWS Glue concepts ](https://docs.aws.amazon.com/glue/latest/dg/components-key-concepts.html) 
+  [ Setting up IAM permissions for AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/set-up-iam.html) 
+  [ Getting started with the AWS Glue Data Catalog](https://docs.aws.amazon.com/glue/latest/dg/start-data-catalog.html) 
+  [ Authoring jobs in AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/author-job-glue.html) 
+  [ Getting started with AWS Glue interactive sessions ](https://docs.aws.amazon.com/glue/latest/dg/interactive-sessions.html) 
+  [ Orchestration in AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/etl-jobs.html) 

## Accessing AWS Glue
<a name="accessing-aws-glue"></a>

 You can create, view, and manage your AWS Glue jobs using the following interfaces: 
+  **AWS Glue console** – Provides a web interface for you to create, view, and manage your AWS Glue jobs. To access the console, see [https://console.aws.amazon.com/glue](https://console.aws.amazon.com/glue). 
+  **AWS Glue Studio** – Provides a graphical interface for you to create and edit your AWS Glue jobs visually. For more information, see [Building visual ETL jobs](author-job-glue.md). 
+  **AWS Glue section of the AWS CLI Reference** – Provides AWS CLI commands that you can use with AWS Glue. For more information, see [AWS CLI Reference for AWS Glue](https://docs.aws.amazon.com/cli/latest/reference/glue/index.html). 
+  **AWS Glue API** – Provides a complete API reference for developers. For more information, see [AWS Glue API](https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api.html). 

## Related services
<a name="what-is-glue-related-services"></a>

 Users of AWS Glue also use: 
+  ** [AWS Lake Formation](https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html) ** – A service that is an authorization layer that provides fine-grained access control to resources in the AWS Glue Data Catalog. 
+  ** [AWS Glue DataBrew](https://docs.aws.amazon.com/databrew/latest/dg/what-is.html) ** – A visual data preparation tool that you can use to clean and normalize data without writing any code. 