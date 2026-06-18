

# What is Amazon Keyspaces (for Apache Cassandra)?
<a name="what-is-keyspaces"></a>

 Amazon Keyspaces (for Apache Cassandra) is a scalable, highly available, and managed Apache Cassandra–compatible database service. With Amazon Keyspaces, you don’t have to provision, patch, or manage servers, and you don’t have to install, maintain, or operate software. 

Amazon Keyspaces is serverless, so you pay for only the resources that you use, and the service automatically scales tables up and down in response to application traffic. You can build applications that serve thousands of requests per second with virtually unlimited throughput and storage. 

**Note**  
 Apache Cassandra is an open-source, wide-column datastore that is designed to handle large amounts of data. For more information, see [Apache Cassandra](http://cassandra.apache.org/).

Amazon Keyspaces makes it easy to migrate, run, and scale Cassandra workloads in the AWS Cloud. With just a few clicks on the AWS Management Console or a few lines of code, you can create keyspaces and tables in Amazon Keyspaces, without deploying any infrastructure or installing software.

With Amazon Keyspaces, you can run your existing Cassandra workloads on AWS using the same Cassandra application code and developer tools that you use today. 

With the [pricing calculator for Amazon Keyspaces (for Apache Cassandra)](https://aws-samples.github.io/sample-pricing-calculator-for-keyspaces/#cassandra) available on Github, you can estimate your monthly costs for Amazon Keyspaces based on your existing Apache Cassandra workload. Enter metrics from your Cassandra nodetool status output and intended serverless configuration for Amazon Keyspaces to compare direct costs between the two solutions. Note that this calculator focuses only on the operational costs of Amazon Keyspaces compared to your existing Cassandra deployment. It doesn't include total cost of ownership (TCO) factors like infrastructure maintenance, operational overhead, or support costs for Cassandra.

For a list of available AWS Regions and endpoints, see [Service endpoints for Amazon Keyspaces](https://docs.aws.amazon.com/keyspaces/latest/devguide/programmatic.endpoints.html).

We recommend that you start by reading the following sections:

**Topics**
+ [Amazon Keyspaces: How it works](how-it-works.md)
+ [Amazon Keyspaces use cases](use-cases.md)
+ [What is Cassandra Query Language (CQL)?](what-is-cql.md)