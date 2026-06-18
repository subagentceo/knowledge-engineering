

# What is Amazon Data Firehose?
<a name="what-is-this-service"></a>

Amazon Data Firehose is a fully managed service for delivering real-time [streaming data](http://aws.amazon.com/streaming-data/) to destinations such as Amazon Simple Storage Service (Amazon S3), Amazon Redshift, Amazon OpenSearch Service, Amazon OpenSearch Serverless, Splunk, Apache Iceberg Tables, and any custom HTTP endpoint or HTTP endpoints owned by supported third-party service providers, including Datadog, Dynatrace, LogicMonitor, MongoDB, New Relic, Coralogix, and Elastic. With Amazon Data Firehose, you don't need to write applications or manage resources. You configure your data producers to send data to Amazon Data Firehose, and it automatically delivers the data to the destination that you specified. You can also configure Amazon Data Firehose to transform your data before delivering it.

For more information about AWS big data solutions, see [Big Data on AWS](http://aws.amazon.com/big-data/). For more information about AWS streaming data solutions, see [What is Streaming Data?](http://aws.amazon.com/streaming-data/)

## Learn key concepts
<a name="key-concepts"></a>

As you get started with Amazon Data Firehose, you can benefit from understanding the following concepts.

**Firehose stream**  
The underlying entity of Amazon Data Firehose. You use Amazon Data Firehose by creating a Firehose stream and then sending data to it. For more information, see [Tutorial: Create a Firehose stream from console](basic-create.md) and [Send data to a Firehose stream](basic-write.md).

**Record**  
The data of interest that your data producer sends to a Firehose stream. A record can be as large as 1,000 KB.

**Data producer**  
Producers send records to Firehose streams. For example, a web server that sends log data to a Firehose stream is a data producer. You can also configure your Firehose stream to automatically read data from an existing Kinesis data stream, and load it into destinations. For more information, see [Send data to a Firehose stream](basic-write.md).

**Buffer size and buffer interval**  
Amazon Data Firehose buffers incoming streaming data to a certain size or for a certain period of time before delivering it to destinations. **Buffer Size** is in MBs and **Buffer Interval** is in seconds.

## Understand data flow in Amazon Data Firehose
<a name="data-flow-diagrams"></a>

For Amazon S3 destinations, streaming data is delivered to your S3 bucket. If data transformation is enabled, you can optionally back up source data to another Amazon S3 bucket.

![A diagram showing the Amazon Data Firehose data flow for Amazon S3.](http://docs.aws.amazon.com/firehose/latest/dev/images/fh-flow-s3.png)


For Amazon Redshift destinations, streaming data is delivered to your S3 bucket first. Amazon Data Firehose then issues an Amazon Redshift **COPY** command to load data from your S3 bucket to your Amazon Redshift cluster. If data transformation is enabled, you can optionally back up source data to another Amazon S3 bucket.

![A diagram showing Amazon Data Firehose data flow for Amazon Redshift.](http://docs.aws.amazon.com/firehose/latest/dev/images/fh-flow-rs.png)


For OpenSearch Service destinations, streaming data is delivered to your OpenSearch Service cluster, and it can optionally be backed up to your S3 bucket concurrently.

![A diagram showing Amazon Data Firehose data flow for OpenSearch Service.](http://docs.aws.amazon.com/firehose/latest/dev/images/fh-flow-es.png)


For Splunk destinations, streaming data is delivered to Splunk, and it can optionally be backed up to your S3 bucket concurrently. 

![A diagram showing Amazon Data Firehose data flow for Splunk.](http://docs.aws.amazon.com/firehose/latest/dev/images/fh-flow-splunk.png)
