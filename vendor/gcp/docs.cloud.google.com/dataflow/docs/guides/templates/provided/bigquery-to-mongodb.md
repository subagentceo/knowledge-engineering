# BigQuery to MongoDB template

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

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
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어

Sign in

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/categories/data-analytics-color.svg)

*   Cloud Dataflow

Start free

Overview Guides Dataflow ML Reference Samples Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/v8b2f8e7f8a7704cc38c0519ef05e8f889c427cc26f7c8f743e84df2a01b1dee7/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Overview
    *   Guides
    *   Dataflow ML
    *   Reference
    *   Samples
    *   Resources
*   Cross-product tools
    *   More
*   Console

*   Dataflow
    
*   All APIs
*   Apache Beam SDKs
    
    *   SDK 2.x for Java
    *   SDK 2.x for Python
    *   SDK 2.x for Go
    *   SDK version support status
    *   Apache Beam runtime support
    *   SDK and worker dependencies
    *   Use an unsupported SDK
    
*   Client Libraries
    
    *   .Net Client Library
    *   Java Client Library
    *   Node.js Client Library
    *   PHP Client Library
    *   Python Client Library
    
*   Service APIs
    
    *   REST API
        
        *   Overview
        *   REST Resources
            
        *   projects.jobs
            
            *   Overview
            *   aggregated
            *   create
            *   get
            *   getMetrics
            *   list
            *   snapshot
            *   update
            
        *   projects.jobs.messages
            
            *   Overview
            *   list
            
        *   projects.locations.flexTemplates
            
            *   Overview
            *   launch
            
        *   projects.locations.jobs
            
            *   Overview
            *   create
            *   get
            *   getExecutionDetails
            *   getMetrics
            *   list
            *   snapshot
            *   update
            
        *   projects.locations.jobs.messages
            
            *   Overview
            *   list
            
        *   projects.locations.jobs.stages
            
            *   Overview
            *   getExecutionDetails
            
        *   projects.locations.templates
            
            *   Overview
            *   create
            *   get
            *   launch
            
        *   projects.templates
            
            *   Overview
            *   create
            *   get
            *   launch
            
        *   Types
            
        *   DynamicTemplateLaunchParams
        *   ExecutionState
        *   Filter
        *   GetTemplateResponse
        *   JobMessageImportance
        *   JobMetrics
        *   JobView
        *   LaunchTemplateParameters
        *   LaunchTemplateResponse
        *   ListJobMessagesResponse
        *   ListJobsResponse
        *   MetricUpdate
        *   ProgressTimeseries
        *   RuntimeEnvironment
        *   Snapshot
        *   StragglerInfo
        *   TemplateView
        
    *   RPC reference
        
        *   Overview
        *   google.dataflow.v1beta3
        *   google.rpc
        
    *   Data Pipelines reference
        
        *   Overview
        *   REST API
            
            *   REST Resources
                
            *   projects.locations.pipelines
                
                *   Overview
                *   create
                *   delete
                *   get
                *   list
                *   patch
                *   run
                *   stop
                
            *   projects.locations.pipelines.jobs
                
                *   Overview
                *   list
                
            *   Types
                
            *   Job
            
        *   RPC reference
            
            *   Overview
            *   google.cloud.datapipelines.v1
            *   google.rpc
            
        
    
*   Google-provided Dataflow templates
    
    *   Batch templates
        
        *   Any Source DB to Spanner
        *   Apache Cassandra to Bigtable
        *   AstraDB to BigQuery
        *   BigQuery to Bigtable
        *   BigQuery to Clickhouse
        *   BigQuery to Elasticsearch
        *   BigQuery to MongoDB
        *   BigQuery to Parquet files on Cloud Storage
        *   BigQuery to TFRecord files on Cloud Storage
        *   Bigtable to Avro files on Cloud Storage
        *   Bigtable to JSON files on Cloud Storage
        *   Bigtable to Parquet files on Cloud Storage
        *   Bigtable to SequenceFile files on Cloud Storage
        *   Bigtable change streams to Vertex AI Vector Search
        *   Bigtable to Vertex AI Vector Search files on Cloud Storage
        *   Spanner to Avro files on Cloud Storage
        *   Spanner to BigQuery
        *   Spanner to text files on Cloud Storage
        *   Spanner to Vertex AI Vector Search files on Cloud Storage
        *   Cloud Storage Avro files to Bigtable
        *   Cloud Storage Avro files to Spanner
        *   Cloud Storage CSV files to BigQuery
        *   Cloud Storage Parquet files to Bigtable
        *   Cloud Storage SequenceFile files to Bigtable
        *   Cloud Storage text files to BigQuery
        *   Cloud Storage text files to BigQuery with Python UDF
        *   Cloud Storage text files to Spanner
        *   Cloud Storage text files to Datastore
        *   Cloud Storage to Elasticsearch
        *   Cloud Storage text files to Firestore
        *   Cloud Storage text files to Pub/Sub
        *   Datastore to Cloud Storage
        *   Firestore to Cloud Storage
        *   Google Ads to BigQuery
        *   Google Cloud to Neo4j
        *   JDBC to BigQuery
        *   JDBC to Pub/Sub
        *   MongoDB to BigQuery
        *   MySQL to BigQuery
        *   Oracle to BigQuery
        *   PostgreSQL to BigQuery
        *   SQL Server to BigQuery
        
    *   Streaming templates
        
        *   Apache Kafka to Apache Kafka
        *   Apache Kafka to BigQuery
        *   Apache Kafka to Cloud Storage
        *   Bigtable change streams to BigQuery
        *   Bigtable change streams to Pub/Sub
        *   Spanner change streams to BigQuery
        *   Spanner change streams to Cloud Storage
        *   Spanner change streams to Pub/Sub
        *   Cloud Storage text files to BigQuery
        *   Cloud Storage text files to BigQuery with Python UDF
        *   Cloud Storage text files to Pub/Sub
        *   Data Masking/Tokenization using Cloud DLP to BigQuery
        *   Datastream to BigQuery
        *   Datastream to Spanner
        *   Datastream to SQL
        *   JMS to Pub/Sub
        *   MongoDB to BigQuery
        *   MySQL change data to BigQuery
        *   MQTT to Pub/Sub
        *   Pub/Sub to BigQuery
        *   Pub/Sub to BigQuery with Python UDF
        *   Pub/Sub Avro to BigQuery
        *   Pub/Sub Proto to BigQuery
        *   Pub/Sub Proto to BigQuery with Python UDF
        *   Pub/Sub subscription to BigQuery
        *   Pub/Sub to Avro files on Cloud Storage
        *   Pub/Sub topic to text files on Cloud Storage
        *   Pub/Sub topic or subscription to text files on Cloud Storage
        *   Pub/Sub to Datadog
        *   Pub/Sub to Elasticsearch
        *   Pub/Sub to JDBC
        *   Pub/Sub to MongoDB
        *   Pub/Sub to MongoDB with Python UDF
        *   Pub/Sub to Pub/Sub
        *   Pub/Sub to Redis
        *   Pub/Sub to Splunk
        *   Spanner to SourceDb
        
    *   Utility templates
        
        *   Bulk compress Cloud Storage files
        *   Bulk decompress Cloud Storage files
        *   Datastore bulk delete
        *   File format conversion
        *   Firestore bulk delete
        *   Streaming data generator
        
    

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
*   Cloud Dataflow
*   Reference

Send feedback

# BigQuery to MongoDB template Stay organized with collections Save and categorize content based on your preferences.

**Beta**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms. Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions.

The BigQuery to MongoDB template is a batch pipeline that reads rows from a BigQuery and writes them to MongoDB as documents. Currently each row is stored as a document.

## Pipeline requirements

*   The source BigQuery table must exist.
*   The target MongoDB instance should be accessible from the Dataflow worker machines.

## Template parameters

### Required parameters

*   **mongoDbUri**: The MongoDB connection URI in the format `mongodb+srv://:@`.
*   **database**: Database in MongoDB to store the collection. For example, `my-db`.
*   **collection**: The name of the collection in the MongoDB database. For example, `my-collection`.
*   **inputTableSpec**: The BigQuery table to read from. For example, `bigquery-project:dataset.input_table`.

## Run the template

### Console

1.  Go to the Dataflow **Create job from template** page.
Go to Create job from template3.  In the **Job name** field, enter a unique job name.
4.  Optional: For **Regional endpoint**, select a value from the drop-down menu. The default region is `us-central1`.
    
    For a list of regions where you can run a Dataflow job, see Dataflow locations.
    
5.  From the **Dataflow template** drop-down menu, select the **BigQuery to MongoDB** template.
6.  In the provided parameter fields, enter your parameter values.
7.  Click **Run job**.

### gcloud

**Note:** To use the Google Cloud CLI to run flex templates, you must have Google Cloud CLI version 284.0.0 or later.

In your shell or terminal, run the template:

  gcloud dataflow flex-template run JOB_NAME \
      --project=PROJECT_ID \
      --region=REGION_NAME \
      --template-file-gcs-location=gs://dataflow-templates-REGION_NAME/VERSION/flex/BigQuery_to_MongoDB \
      --parameters \
  inputTableSpec=INPUT_TABLE_SPEC,\
  mongoDbUri=MONGO_DB_URI,\
  database=DATABASE,\
  collection=COLLECTION
  

Replace the following:

*   `PROJECT_ID`: the Google Cloud project ID where you want to run the Dataflow job
*   `JOB_NAME`: a unique job name of your choice
*   `REGION_NAME`: the region where you want to deploy your Dataflow job—for example, `us-central1`
*   `VERSION`: the version of the template that you want to use
    
    You can use the following values:
    
    *   `latest` to use the latest version of the template, which is available in the **non-dated** parent folder in the bucket— gs://dataflow-templates-REGION_NAME/latest/
    *   the version name, like `2023-09-12-00_RC00`, to use a specific version of the template, which can be found nested in the respective dated parent folder in the bucket— gs://dataflow-templates-REGION_NAME/
    
    **Caution:** The **latest** version of templates might update with breaking changes. Your production environments should use templates kept in the most recent **dated** parent folder to prevent these breaking changes from affecting your production workflows.
    
*   `INPUT_TABLE_SPEC`: your source BigQuery table name.
*   `MONGO_DB_URI`: your MongoDB URI.
*   `DATABASE`: your MongoDB database.
*   `COLLECTION`: your MongoDB collection.

### API

To run the template using the REST API, send an HTTP POST request. For more information on the API and its authorization scopes, see `projects.templates.launch`.

  POST https://dataflow.googleapis.com/v1b3/projects/PROJECT_ID/locations/LOCATION/flexTemplates:launch
  {
     "launch_parameter": {
        "jobName": "JOB_NAME",
        "parameters": {
            "inputTableSpec": "INPUT_TABLE_SPEC",
            "mongoDbUri": "MONGO_DB_URI",
            "database": "DATABASE",
            "collection": "COLLECTION"
        },
        "containerSpecGcsPath": "gs://dataflow-templates-LOCATION/VERSION/flex/BigQuery_to_MongoDB",
     }
  }

Replace the following:

*   `PROJECT_ID`: the Google Cloud project ID where you want to run the Dataflow job
*   `JOB_NAME`: a unique job name of your choice
*   `LOCATION`: the region where you want to deploy your Dataflow job—for example, `us-central1`
*   `VERSION`: the version of the template that you want to use
    
    You can use the following values:
    
    *   `latest` to use the latest version of the template, which is available in the **non-dated** parent folder in the bucket— gs://dataflow-templates-REGION_NAME/latest/
    *   the version name, like `2023-09-12-00_RC00`, to use a specific version of the template, which can be found nested in the respective dated parent folder in the bucket— gs://dataflow-templates-REGION_NAME/
    
    **Caution:** The **latest** version of templates might update with breaking changes. Your production environments should use templates kept in the most recent **dated** parent folder to prevent these breaking changes from affecting your production workflows.
    
*   `INPUT_TABLE_SPEC`: your source BigQuery table name.
*   `MONGO_DB_URI`: your MongoDB URI.
*   `DATABASE`: your MongoDB database.
*   `COLLECTION`: your MongoDB collection.

## Template source code

### Java

```
/*
 * Copyright (C) 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.google.cloud.teleport.v2.mongodb.templates;

import com.google.api.services.bigquery.model.TableRow;
import com.google.cloud.teleport.metadata.Template;
import com.google.cloud.teleport.metadata.TemplateCategory;
import com.google.cloud.teleport.v2.common.UncaughtExceptionLogger;
import com.google.cloud.teleport.v2.mongodb.options.BigQueryToMongoDbOptions.BigQueryReadOptions;
import com.google.cloud.teleport.v2.mongodb.options.BigQueryToMongoDbOptions.MongoDbOptions;
import com.google.cloud.teleport.v2.mongodb.templates.BigQueryToMongoDb.Options;
import org.apache.beam.sdk.Pipeline;
import org.apache.beam.sdk.io.gcp.bigquery.BigQueryIO;
import org.apache.beam.sdk.io.mongodb.MongoDbIO;
import org.apache.beam.sdk.options.PipelineOptions;
import org.apache.beam.sdk.options.PipelineOptionsFactory;
import org.apache.beam.sdk.transforms.DoFn;
import org.apache.beam.sdk.transforms.ParDo;
import org.bson.Document;

/**
 * The {@link BigQueryToMongoDb} pipeline is a batch pipeline which reads data from BigQuery and
 * outputs the resulting records to MongoDB.
 *
 * <p>Check out <a
 * href="https://github.com/GoogleCloudPlatform/DataflowTemplates/blob/main/v2/googlecloud-to-mongodb/README_BigQuery_to_MongoDB.md">README</a>
 * for instructions on how to use or modify this template.
 */
@Template(
    name = "BigQuery_to_MongoDB",
    category = TemplateCategory.BATCH,
    displayName = "BigQuery to MongoDB",
    description =
        "The BigQuery to MongoDB template is a batch pipeline that reads rows from a BigQuery and writes them to MongoDB as documents. "
            + "Currently each row is stored as a document.",
    optionsClass = Options.class,
    flexContainerName = "googlecloud-to-mongodb",
    documentation =
        "https://cloud.google.com/dataflow/docs/guides/templates/provided/bigquery-to-mongodb",
    contactInformation = "https://cloud.google.com/support",
    preview = true,
    requirements = {
      "The source BigQuery table must exist.",
      "The target MongoDB instance should be accessible from the Dataflow worker machines."
    })
public class BigQueryToMongoDb {
  /**
   * Options supported by {@link BigQueryToMongoDb}
   *
   * <p>Inherits standard configuration options.
   */
  public interface Options extends PipelineOptions, MongoDbOptions, BigQueryReadOptions {}

  private static class ParseAsDocumentsFn extends DoFn<String, Document> {

    @ProcessElement
    public void processElement(ProcessContext context) {
      context.output(Document.parse(context.element()));
    }
  }

  public static void main(String[] args) {
    UncaughtExceptionLogger.register();

    Options options = PipelineOptionsFactory.fromArgs(args).withValidation().as(Options.class);
    run(options);
  }

  public static boolean run(Options options) {
    Pipeline pipeline = Pipeline.create(options);

    pipeline
        .apply(BigQueryIO.readTableRows().withoutValidation().from(options.getInputTableSpec()))
        .apply(
            "bigQueryDataset",
            ParDo.of(
                new DoFn<TableRow, Document>() {
                  @ProcessElement
                  public void process(ProcessContext c) {
                    Document doc = new Document();
                    TableRow row = c.element();
                    row.forEach(
                        (key, value) -> {
                          if (!key.equals("_id")) {
                            doc.append(key, value);
                          }
                        });
                    c.output(doc);
                  }
                }))
        .apply(
            MongoDbIO.write()
                .withUri(options.getMongoDbUri())
                .withDatabase(options.getDatabase())
                .withCollection(options.getCollection()));
    pipeline.run();
    return true;
  }
}
```

## What's next

*   Learn about Dataflow templates.
*   See the list of Google-provided templates.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-02-12 UTC.

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
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어