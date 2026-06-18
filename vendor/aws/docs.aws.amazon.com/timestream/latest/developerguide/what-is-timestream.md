

For similar capabilities to Amazon Timestream for LiveAnalytics, consider Amazon Timestream for InfluxDB. It offers simplified data ingestion and single-digit millisecond query response times for real-time analytics. Learn more [here](https://docs.aws.amazon.com//timestream/latest/developerguide/timestream-for-influxdb.html).

# What is Amazon Timestream for LiveAnalytics?
<a name="what-is-timestream"></a>

 Amazon Timestream for LiveAnalytics is a fast, scalable, fully managed, purpose-built time series database that makes it easy to store and analyze trillions of time series data points per day. Timestream for LiveAnalytics saves you time and cost in managing the lifecycle of time series data by keeping recent data in memory and moving historical data to a cost optimized storage tier based upon user defined policies. Timestream for LiveAnalytics's purpose-built query engine lets you access and analyze recent and historical data together, without having to specify its location. Amazon Timestream for LiveAnalytics has built-in time series analytics functions, helping you identify trends and patterns in your data in near real-time. Timestream for LiveAnalytics is serverless and automatically scales up or down to adjust capacity and performance. Because you don't need to manage the underlying infrastructure, you can focus on optimizing and building your applications.

 Timestream for LiveAnalytics also integrates with commonly used services for data collection, visualization, and machine learning. You can send data to Amazon Timestream for LiveAnalytics using AWS IoT Core, Amazon Kinesis, Amazon MSK, and open source Telegraf. You can visualize data using Quick, Grafana, and business intelligence tools through JDBC. You can also use Amazon SageMaker AI with Timestream for LiveAnalytics for machine learning. 

## Timestream for LiveAnalytics key benefits
<a name="what-is.features"></a>

 The key benefits of Amazon Timestream for LiveAnalytics are: 
+  *Serverless with auto-scaling -* With Amazon Timestream for LiveAnalytics, there are no servers to manage and no capacity to provision. As the needs of your application change, Timestream for LiveAnalytics automatically scales to adjust capacity. 
+  *Data lifecycle management -* Amazon Timestream for LiveAnalytics simplifies the complex process of data lifecycle management. It offers storage tiering, with a memory store for recent data and a magnetic store for historical data. Amazon Timestream automates the transfer of data from the memory store to the magnetic store based upon user configurable policies. 
+  *Simplified data access -* With Amazon Timestream for LiveAnalytics, you no longer need to use disparate tools to access recent and historical data. Amazon Timestream for LiveAnalytics's purpose-built query engine transparently accesses and combines data across storage tiers without you having to specify the data location. 
+  *Purpose-built for time series -* You can quickly analyze time series data using SQL, with built-in time series functions for smoothing, approximation, and interpolation. Timestream for LiveAnalytics also supports advanced aggregates, window functions, and complex data types such as arrays and rows. 
+  *Always encrypted -* Amazon Timestream for LiveAnalytics ensures that your time series data is always encrypted, whether at rest or in transit. Amazon Timestream for LiveAnalytics also enables you to specify an AWS KMS customer managed key (CMK) for encrypting data in the magnetic store. 
+  *High availability -* Amazon Timestream ensures high availability of your write and read requests by automatically replicating data and allocating resources across at least 3 different Availability Zones within a single AWS Region. For more information, see the [Timestream Service Level Agreement](https://aws.amazon.com/timestream/sla/). 
+  *Durability -* Amazon Timestream ensures durability of your data by automatically replicating your memory and magnetic store data across different Availability Zones within a single AWS Region. All of your data is written to disk before acknowledging your write request as complete. 

## Timestream for LiveAnalytics use cases
<a name="what-is.use-cases"></a>

 Examples of a growing list of use cases for Timestream for LiveAnalytics include: 
+ Monitoring metrics to improve the performance and availability of your applications.
+ Storage and analysis of industrial telemetry to streamline equipment management and maintenance.
+ Tracking user interaction with an application over time.
+ Storage and analysis of IoT sensor data.

## Getting started with Timestream for LiveAnalytics
<a name="what-is.getting-started"></a>

We recommend that you begin by reading the following sections:
+ **[Tutorial](getting-started.db-w-sample-data.md) -** To create a database populated with sample data sets and run sample queries.
+ **[Amazon Timestream for LiveAnalytics concepts](concepts.md) -** To learn essential Timestream for LiveAnalytics concepts.
+ **[Accessing Timestream for LiveAnalytics](accessing.md) -** To learn how to access Timestream for LiveAnalytics using the console, AWS CLI, or API.
+ **[QuotasDefault quotas](ts-limits.md) -** To learn about quotas on the number of Timestream for LiveAnalytics components that you can provision.

To learn how to quickly begin developing applications for Timestream for LiveAnalytics, see the following:
+ [Using the AWS SDKs](getting-started-sdks.md)
+ [Query language reference](reference.md)