# Data Masking/Tokenization from Cloud Storage to BigQuery (using Cloud DLP) template

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

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

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/categories/data-analytics-color.svg)

*   Cloud Dataflow

Start free

Overview Guides Dataflow ML Reference Samples Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

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

# Data Masking/Tokenization from Cloud Storage to BigQuery (using Cloud DLP) template Stay organized with collections Save and categorize content based on your preferences.

**Beta**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms. Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions.

The Data Masking/Tokenization from Cloud Storage to BigQuery template uses Sensitive Data Protection and creates a streaming pipeline that does the following steps:

1.  Reads CSV files from a Cloud Storage bucket.
2.  Calls the Cloud Data Loss Prevention API (part of Sensitive Data Protection) for de-identification.
3.  Writes the de-identified data into the specified BigQuery table.

The template supports using both a Sensitive Data Protection inspection template and a Sensitive Data Protection de-identification template. As a result, the template supports both of the following tasks:

*   Inspect for potentially sensitive information and de-identify the data.
*   De-identify structured data where columns are specified to be de-identified and no inspection is needed.

This template **does not** support a regional path for de-identification template location. Only a global path is supported.

## Pipeline requirements

*   The input data to tokenize must exist.
*   The Sensitive Data Protection templates must exist (for example, DeidentifyTemplate and InspectTemplate). For more details, see Sensitive Data Protection templates.
*   The BigQuery dataset must exist.

## Template parameters

### Required parameters

*   **inputFilePattern**: The CSV files to read input data records from. Wildcards are also accepted. For example, `gs://mybucket/my_csv_filename.csv or gs://mybucket/file-*.csv`.
*   **deidentifyTemplateName**: The Sensitive Data Protection de-identification template to use for API requests, specified with the pattern `projects/<PROJECT_ID>/deidentifyTemplates/<TEMPLATE_ID>`. For example, `projects/your-project-id/locations/global/deidentifyTemplates/generated_template_id`.
*   **datasetName**: The BigQuery dataset to use when sending tokenized results. The dataset must exist prior to execution.
*   **dlpProjectId**: The ID for the Google Cloud project that owns the DLP API resource. This project can be the same project that owns the Sensitive Data Protection templates, or it can be a separate project.

### Optional parameters

*   **inspectTemplateName**: The Sensitive Data Protection inspection template to use for API requests, specified with the pattern `projects/<PROJECT_ID>/identifyTemplates/<TEMPLATE_ID>`. For example, `projects/your-project-id/locations/global/inspectTemplates/generated_template_id`.
*   **batchSize**: The chunking or batch size to use for sending data to inspect and detokenize. For a CSV file, the value of `batchSize` is the number of rows in a batch. Determine the batch size based on the size of the records and the sizing of the file. The DLP API has a payload size limit of 524 KB per API call.

## Run the template

### Console

1.  Go to the Dataflow **Create job from template** page.
Go to Create job from template3.  In the **Job name** field, enter a unique job name.
4.  Optional: For **Regional endpoint**, select a value from the drop-down menu. The default region is `us-central1`.
    
    For a list of regions where you can run a Dataflow job, see Dataflow locations.
    
5.  From the **Dataflow template** drop-down menu, select the **Data Masking/Tokenization from Cloud Storage to BigQuery (using Cloud DLP)** template.
6.  In the provided parameter fields, enter your parameter values.
7.  Click **Run job**.

### gcloud

**Note:** To use the Google Cloud CLI to run classic templates, you must have Google Cloud CLI version 138.0.0 or later.

In your shell or terminal, run the template:

gcloud dataflow jobs run JOB_NAME \
    --gcs-location gs://dataflow-templates-REGION_NAME/VERSION/ \
    --region REGION_NAME \
    --staging-location STAGING_LOCATION \
    --parameters \
inputFilePattern=INPUT_DATA,\
datasetName=DATASET_NAME,\
batchSize=BATCH_SIZE_VALUE,\
dlpProjectId=DLP_API_PROJECT_ID,\
deidentifyTemplateName=projects/TEMPLATE_PROJECT_ID/deidentifyTemplates/DEIDENTIFY_TEMPLATE,\
inspectTemplateName=projects/TEMPLATE_PROJECT_ID/identifyTemplates/INSPECT_TEMPLATE_NUMBER

Replace the following:

*   `DLP_API_PROJECT_ID`: your DLP API project ID
*   `JOB_NAME`: a unique job name of your choice
*   `REGION_NAME`: the region where you want to deploy your Dataflow job—for example, `us-central1`
*   `VERSION`: the version of the template that you want to use
    
    You can use the following values:
    
    *   `latest` to use the latest version of the template, which is available in the **non-dated** parent folder in the bucket— gs://dataflow-templates-REGION_NAME/latest/
    *   the version name, like `2023-09-12-00_RC00`, to use a specific version of the template, which can be found nested in the respective dated parent folder in the bucket— gs://dataflow-templates-REGION_NAME/
    
    **Caution:** The **latest** version of templates might update with breaking changes. Your production environments should use templates kept in the most recent **dated** parent folder to prevent these breaking changes from affecting your production workflows.
    
*   `STAGING_LOCATION`: the location for staging local files (for example, `gs://your-bucket/staging`)
*   `INPUT_DATA`: your input file path
*   `DEIDENTIFY_TEMPLATE`: the Sensitive Data ProtectionDeidentify Template number
*   `DATASET_NAME`: the BigQuery dataset name
*   `INSPECT_TEMPLATE_NUMBER`: the Sensitive Data ProtectionInspect Template number
*   `BATCH_SIZE_VALUE`: the batch size (# of rows per API for CSV files)

### REST

To run the template using the REST API, send an HTTP POST request. For more information on the API and its authorization scopes, see `projects.templates.launch`.

POST https://dataflow.googleapis.com/v1b3/projects/PROJECT_ID/locations/LOCATION/templates:launch?gcsPath=gs://dataflow-templates-LOCATION/VERSION/
{
   "jobName": "JOB_NAME",
   "environment": {
       "ipConfiguration": "WORKER_IP_UNSPECIFIED",
       "additionalExperiments": []
   },
   "parameters": {
      "inputFilePattern":INPUT_DATA,
      "datasetName": "DATASET_NAME",
      "batchSize": "BATCH_SIZE_VALUE",
      "dlpProjectId": "DLP_API_PROJECT_ID",
      "deidentifyTemplateName": "projects/TEMPLATE_PROJECT_ID/deidentifyTemplates/DEIDENTIFY_TEMPLATE",
      "inspectTemplateName": "projects/TEMPLATE_PROJECT_ID/identifyTemplates/INSPECT_TEMPLATE_NUMBER"
   }
}

Replace the following:

*   `PROJECT_ID`: the Google Cloud project ID where you want to run the Dataflow job
*   `DLP_API_PROJECT_ID`: your DLP API project ID
*   `JOB_NAME`: a unique job name of your choice
*   `LOCATION`: the region where you want to deploy your Dataflow job—for example, `us-central1`
*   `VERSION`: the version of the template that you want to use
    
    You can use the following values:
    
    *   `latest` to use the latest version of the template, which is available in the **non-dated** parent folder in the bucket— gs://dataflow-templates-REGION_NAME/latest/
    *   the version name, like `2023-09-12-00_RC00`, to use a specific version of the template, which can be found nested in the respective dated parent folder in the bucket— gs://dataflow-templates-REGION_NAME/
    
    **Caution:** The **latest** version of templates might update with breaking changes. Your production environments should use templates kept in the most recent **dated** parent folder to prevent these breaking changes from affecting your production workflows.
    
*   `STAGING_LOCATION`: the location for staging local files (for example, `gs://your-bucket/staging`)
*   `INPUT_DATA`: your input file path
*   `DEIDENTIFY_TEMPLATE`: the Sensitive Data ProtectionDeidentify Template number
*   `DATASET_NAME`: the BigQuery dataset name
*   `INSPECT_TEMPLATE_NUMBER`: the Sensitive Data ProtectionInspect Template number
*   `BATCH_SIZE_VALUE`: the batch size (# of rows per API for CSV files)

## Template source code

### Java

```
/*
 * Copyright (C) 2018 Google LLC
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
package com.google.cloud.teleport.templates;

import com.google.api.services.bigquery.model.TableCell;
import com.google.api.services.bigquery.model.TableFieldSchema;
import com.google.api.services.bigquery.model.TableRow;
import com.google.api.services.bigquery.model.TableSchema;
import com.google.cloud.dlp.v2.DlpServiceClient;
import com.google.cloud.teleport.metadata.Template;
import com.google.cloud.teleport.metadata.TemplateCategory;
import com.google.cloud.teleport.metadata.TemplateParameter;
import com.google.cloud.teleport.templates.DLPTextToBigQueryStreaming.TokenizePipelineOptions;
import com.google.privacy.dlp.v2.ContentItem;
import com.google.privacy.dlp.v2.DeidentifyContentRequest;
import com.google.privacy.dlp.v2.DeidentifyContentRequest.Builder;
import com.google.privacy.dlp.v2.DeidentifyContentResponse;
import com.google.privacy.dlp.v2.FieldId;
import com.google.privacy.dlp.v2.ProjectName;
import com.google.privacy.dlp.v2.Table;
import com.google.privacy.dlp.v2.Value;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.channels.Channels;
import java.nio.channels.ReadableByteChannel;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import org.apache.beam.runners.dataflow.options.DataflowPipelineOptions;
import org.apache.beam.sdk.Pipeline;
import org.apache.beam.sdk.PipelineResult;
import org.apache.beam.sdk.coders.KvCoder;
import org.apache.beam.sdk.coders.StringUtf8Coder;
import org.apache.beam.sdk.io.Compression;
import org.apache.beam.sdk.io.FileIO;
import org.apache.beam.sdk.io.FileIO.ReadableFile;
import org.apache.beam.sdk.io.ReadableFileCoder;
import org.apache.beam.sdk.io.gcp.bigquery.BigQueryIO;
import org.apache.beam.sdk.io.gcp.bigquery.DynamicDestinations;
import org.apache.beam.sdk.io.gcp.bigquery.InsertRetryPolicy;
import org.apache.beam.sdk.io.gcp.bigquery.TableDestination;
import org.apache.beam.sdk.io.range.OffsetRange;
import org.apache.beam.sdk.metrics.Distribution;
import org.apache.beam.sdk.metrics.Metrics;
import org.apache.beam.sdk.options.PipelineOptionsFactory;
import org.apache.beam.sdk.options.Validation.Required;
import org.apache.beam.sdk.options.ValueProvider;
import org.apache.beam.sdk.options.ValueProvider.NestedValueProvider;
import org.apache.beam.sdk.transforms.DoFn;
import org.apache.beam.sdk.transforms.GroupByKey;
import org.apache.beam.sdk.transforms.ParDo;
import org.apache.beam.sdk.transforms.Watch;
import org.apache.beam.sdk.transforms.WithKeys;
import org.apache.beam.sdk.transforms.splittabledofn.OffsetRangeTracker;
import org.apache.beam.sdk.transforms.splittabledofn.RestrictionTracker;
import org.apache.beam.sdk.transforms.windowing.AfterProcessingTime;
import org.apache.beam.sdk.transforms.windowing.FixedWindows;
import org.apache.beam.sdk.transforms.windowing.Repeatedly;
import org.apache.beam.sdk.transforms.windowing.Window;
import org.apache.beam.sdk.values.KV;
import org.apache.beam.sdk.values.PCollection;
import org.apache.beam.sdk.values.PCollectionView;
import org.apache.beam.sdk.values.ValueInSingleWindow;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.joda.time.Duration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The {@link DLPTextToBigQueryStreaming} is a streaming pipeline that reads CSV files from a
 * storage location (e.g. Google Cloud Storage), uses Cloud DLP API to inspect, classify, and mask
 * sensitive information (e.g. PII Data like passport or SIN number) and at the end stores
 * obfuscated data in BigQuery (Dynamic Table Creation) to be used for various purposes. e.g. data
 * analytics, ML model. Cloud DLP inspection and masking can be configured by the user and can make
 * use of over 90 built in detectors and masking techniques like tokenization, secure hashing, date
 * shifting, partial masking, and more.
 *
 * <p><b>Pipeline Requirements</b>
 *
 * <ul>
 *   <li>DLP Templates exist (e.g. deidentifyTemplate, InspectTemplate)
 *   <li>The BigQuery Dataset exists
 * </ul>
 *
 * <p>Check out <a
 * href="https://github.com/GoogleCloudPlatform/DataflowTemplates/blob/main/v1/README_Stream_DLP_GCS_Text_to_BigQuery.md">README</a>
 * for instructions on how to use or modify this template.
 */
@Template(
    name = "Stream_DLP_GCS_Text_to_BigQuery",
    category = TemplateCategory.STREAMING,
    displayName = "Data Masking/Tokenization from Cloud Storage to BigQuery (using Cloud DLP)",
    description = {
      "The Data Masking/Tokenization from Cloud Storage to BigQuery template uses <a href=\"https://cloud.google.com/dlp/docs\">Sensitive Data Protection</a> and creates a streaming pipeline that does the following steps:\n"
          + "1. Reads CSV files from a Cloud Storage bucket.\n"
          + "2. Calls the Cloud Data Loss Prevention API (part of Sensitive Data Protection) for de-identification.\n"
          + "3. Writes the de-identified data into the specified BigQuery table.",
      "The template supports using both a Sensitive Data Protection <a href=\"https://cloud.google.com/dlp/docs/creating-templates\">inspection template</a> and a Sensitive Data Protection <a href=\"https://cloud.google.com/dlp/docs/creating-templates-deid\">de-identification template</a>. As a result, the template supports both of the following tasks:\n"
          + "- Inspect for potentially sensitive information and de-identify the data.\n"
          + "- De-identify structured data where columns are specified to be de-identified and no inspection is needed.",
      "Note: This template does not support a regional path for de-identification template location. Only a global path is supported."
    },
    optionsClass = TokenizePipelineOptions.class,
    documentation =
        "https://cloud.google.com/dataflow/docs/guides/templates/provided/dlp-text-to-bigquery",
    contactInformation = "https://cloud.google.com/support",
    preview = true,
    requirements = {
      "The input data to tokenize must exist.",
      "The Sensitive Data Protection templates must exist (for example, DeidentifyTemplate and InspectTemplate). For more details, see <a href=\"https://cloud.google.com/dlp/docs/concepts-templates\">Sensitive Data Protection templates</a>.",
      "The BigQuery dataset must exist."
    },
    streaming = true,
    hidden = true)
public class DLPTextToBigQueryStreaming {

  public static final Logger LOG = LoggerFactory.getLogger(DLPTextToBigQueryStreaming.class);

  /** Default interval for polling files in GCS. */
  private static final Duration DEFAULT_POLL_INTERVAL = Duration.standardSeconds(30);

  /** Expected only CSV file in GCS bucket. */
  private static final String ALLOWED_FILE_EXTENSION = String.valueOf("csv");

  /** Regular expression that matches valid BQ table IDs. */
  private static final Pattern TABLE_REGEXP = Pattern.compile("[-\\w$@]{1,1024}");

  /** Default batch size if value not provided in execution. */
  private static final Integer DEFAULT_BATCH_SIZE = 100;

  /** Regular expression that matches valid BQ column name . */
  private static final Pattern COLUMN_NAME_REGEXP = Pattern.compile("^[A-Za-z_]+[A-Za-z_0-9]*$");

  /** Default window interval to create side inputs for header records. */
  private static final Duration WINDOW_INTERVAL = Duration.standardSeconds(30);

  /**
   * Main entry point for executing the pipeline. This will run the pipeline asynchronously. If
   * blocking execution is required, use the {@link
   * DLPTextToBigQueryStreaming#run(TokenizePipelineOptions)} method to start the pipeline and
   * invoke {@code result.waitUntilFinish()} on the {@link PipelineResult}
   *
   * @param args The command-line arguments to the pipeline.
   */
  public static void main(String[] args) {

    TokenizePipelineOptions options =
        PipelineOptionsFactory.fromArgs(args).withValidation().as(TokenizePipelineOptions.class);
    run(options);
  }

  /**
   * Runs the pipeline with the supplied options.
   *
   * @param options The execution parameters to the pipeline.
   * @return The result of the pipeline execution.
   */
  public static PipelineResult run(TokenizePipelineOptions options) {
    // Create the pipeline
    Pipeline p = Pipeline.create(options);
    /*
     * Steps:
     *   1) Read from the text source continuously based on default interval e.g. 30 seconds
     *       - Setup a window for 30 secs to capture the list of files emitted.
     *       - Group by file name as key and ReadableFile as a value.
     *   2) Output each readable file for content processing.
     *   3) Split file contents based on batch size for parallel processing.
     *   4) Process each split as a DLP table content request to invoke API.
     *   5) Convert DLP Table Rows to BQ Table Row.
     *   6) Create dynamic table and insert successfully converted records into BQ.
     */

    PCollection<KV<String, Iterable<ReadableFile>>> csvFiles =
        p
            /*
             * 1) Read from the text source continuously based on default interval e.g. 300 seconds
             *     - Setup a window for 30 secs to capture the list of files emitted.
             *     - Group by file name as key and ReadableFile as a value.
             */
            .apply(
                "Poll Input Files",
                FileIO.match()
                    .filepattern(options.getInputFilePattern())
                    .continuously(DEFAULT_POLL_INTERVAL, Watch.Growth.never()))
            .apply("Find Pattern Match", FileIO.readMatches().withCompression(Compression.AUTO))
            .apply("Add File Name as Key", WithKeys.of(file -> getFileName(file)))
            .setCoder(KvCoder.of(StringUtf8Coder.of(), ReadableFileCoder.of()))
            .apply(
                "Fixed Window(30 Sec)",
                Window.<KV<String, ReadableFile>>into(FixedWindows.of(WINDOW_INTERVAL))
                    .triggering(
                        Repeatedly.forever(
                            AfterProcessingTime.pastFirstElementInPane()
                                .plusDelayOf(Duration.ZERO)))
                    .discardingFiredPanes()
                    .withAllowedLateness(Duration.ZERO))
            .apply(GroupByKey.create());

    PCollection<KV<String, TableRow>> bqDataMap =
        csvFiles

            // 2) Output each readable file for content processing.
            .apply(
                "File Handler",
                ParDo.of(
                    new DoFn<KV<String, Iterable<ReadableFile>>, KV<String, ReadableFile>>() {
                      @ProcessElement
                      public void processElement(ProcessContext c) {
                        String fileKey = c.element().getKey();
                        c.element()
                            .getValue()
                            .forEach(
                                file -> {
                                  c.output(KV.of(fileKey, file));
                                });
                      }
                    }))

            // 3) Split file contents based on batch size for parallel processing.
            .apply(
                "Process File Contents",
                ParDo.of(
                    new CSVReader(
                        NestedValueProvider.of(
                            options.getBatchSize(),
                            batchSize -> {
                              if (batchSize != null) {
                                return batchSize;
                              } else {
                                return DEFAULT_BATCH_SIZE;
                              }
                            }))))

            // 4) Create a DLP Table content request and invoke DLP API for each processing
            .apply(
                "DLP-Tokenization",
                ParDo.of(
                    new DLPTokenizationDoFn(
                        options.getDlpProjectId(),
                        options.getDeidentifyTemplateName(),
                        options.getInspectTemplateName())))

            // 5) Convert DLP Table Rows to BQ Table Row
            .apply("Process Tokenized Data", ParDo.of(new TableRowProcessorDoFn()));

    // 6) Create dynamic table and insert successfully converted records into BQ.
    bqDataMap.apply(
        "Write To BQ",
        BigQueryIO.<KV<String, TableRow>>write()
            .to(new BQDestination(options.getDatasetName(), options.getDlpProjectId()))
            .withFormatFunction(
                element -> {
                  return element.getValue();
                })
            .withWriteDisposition(BigQueryIO.Write.WriteDisposition.WRITE_APPEND)
            .withCreateDisposition(BigQueryIO.Write.CreateDisposition.CREATE_IF_NEEDED)
            .withoutValidation()
            .withFailedInsertRetryPolicy(InsertRetryPolicy.retryTransientErrors()));

    return p.run();
  }

  /**
   * The {@link TokenizePipelineOptions} interface provides the custom execution options passed by
   * the executor at the command-line.
   */
  public interface TokenizePipelineOptions extends DataflowPipelineOptions {

    @TemplateParameter.GcsReadFile(
        order = 1,
        groupName = "Source",
        description = "Input Cloud Storage File(s)",
        helpText = "The CSV files to read input data records from. Wildcards are also accepted.",
        example = "gs://mybucket/my_csv_filename.csv or gs://mybucket/file-*.csv")
    ValueProvider<String> getInputFilePattern();

    void setInputFilePattern(ValueProvider<String> value);

    @TemplateParameter.Text(
        order = 2,
        groupName = "Source",
        regexes = {
          "^projects\\/[^\\n\\r\\/]+(\\/locations\\/[^\\n\\r\\/]+)?\\/deidentifyTemplates\\/[^\\n\\r\\/]+$"
        },
        description = "Cloud DLP deidentify template name",
        helpText =
            "The Sensitive Data Protection de-identification template to use for API requests, specified with the pattern `projects/<PROJECT_ID>/deidentifyTemplates/<TEMPLATE_ID>`.",
        example =
            "projects/your-project-id/locations/global/deidentifyTemplates/generated_template_id")
    @Required
    ValueProvider<String> getDeidentifyTemplateName();

    void setDeidentifyTemplateName(ValueProvider<String> value);

    @TemplateParameter.Text(
        order = 3,
        groupName = "DLP Configuration",
        optional = true,
        regexes = {
          "^projects\\/[^\\n\\r\\/]+(\\/locations\\/[^\\n\\r\\/]+)?\\/inspectTemplates\\/[^\\n\\r\\/]+$"
        },
        description = "Cloud DLP inspect template name",
        helpText =
            "The Sensitive Data Protection inspection template to use for API requests, specified"
                + " with the pattern `projects/<PROJECT_ID>/identifyTemplates/<TEMPLATE_ID>`.",
        example =
            "projects/your-project-id/locations/global/inspectTemplates/generated_template_id")
    ValueProvider<String> getInspectTemplateName();

    void setInspectTemplateName(ValueProvider<String> value);

    @TemplateParameter.Integer(
        order = 4,
        groupName = "DLP Configuration",
        optional = true,
        description = "Batch size",
        helpText =
            "The chunking or batch size to use for sending data to inspect and detokenize. For a CSV file, the value of `batchSize` is the number of rows in a batch."
                + " Determine the batch size based on the size of the records and the sizing of the file."
                + " The DLP API has a payload size limit of 524 KB per API call.")
    @Required
    ValueProvider<Integer> getBatchSize();

    void setBatchSize(ValueProvider<Integer> value);

    @TemplateParameter.Text(
        order = 5,
        groupName = "Target",
        regexes = {"^[^.]*$"},
        description = "BigQuery Dataset",
        helpText =
            "The BigQuery dataset to use when sending tokenized results. The dataset must exist prior to execution.")
    ValueProvider<String> getDatasetName();

    void setDatasetName(ValueProvider<String> value);

    @TemplateParameter.ProjectId(
        order = 6,
        groupName = "DLP Configuration",
        description = "Cloud DLP project ID",
        helpText =
            "The ID for the Google Cloud project that owns the DLP API resource. This project"
                + " can be the same project that owns the Sensitive Data Protection templates, or it"
                + " can be a separate project.")
    ValueProvider<String> getDlpProjectId();

    void setDlpProjectId(ValueProvider<String> value);
  }

  /**
   * The {@link CSVReader} class uses experimental Split DoFn to split each csv file contents in
   * chunks and process it in non-monolithic fashion. For example: if a CSV file has 100 rows and
   * batch size is set to 15, then initial restrictions for the SDF will be 1 to 7 and split
   * restriction will be {{1-2},{2-3}..{7-8}} for parallel executions.
   */
  static class CSVReader extends DoFn<KV<String, ReadableFile>, KV<String, Table>> {

    private ValueProvider<Integer> batchSize;
    private PCollectionView<List<KV<String, List<String>>>> headerMap;

    /** This counter is used to track number of lines processed against batch size. */
    private Integer lineCount;

    public CSVReader(ValueProvider<Integer> batchSize) {
      lineCount = 1;
      this.batchSize = batchSize;
    }

    @ProcessElement
    public void processElement(ProcessContext c, RestrictionTracker<OffsetRange, Long> tracker)
        throws IOException {
      for (long i = tracker.currentRestriction().getFrom(); tracker.tryClaim(i); ++i) {
        String fileKey = c.element().getKey();
        try (BufferedReader br = getReader(c.element().getValue())) {
          List<Table.Row> rows = new ArrayList<>();
          Table dlpTable = null;
          /** finding out EOL for this restriction so that we know the SOL */
          int endOfLine = (int) (i * batchSize.get().intValue());
          int startOfLine = (endOfLine - batchSize.get().intValue());

          // getting the DLP table headers
          Iterator<CSVRecord> csvRows = CSVFormat.DEFAULT.parse(br).iterator();
          if (!csvRows.hasNext()) {
            LOG.info("File `" + c.element().getKey() + "` is empty");
            continue;
          }
          List<FieldId> dlpTableHeaders = toDlpTableHeaders(csvRows.next());

          /** skipping all the rows that's not part of this restriction */
          for (int line = 0; line < startOfLine; line++) {
            if (csvRows.hasNext()) {
              csvRows.next();
            }
          }
          /** looping through buffered reader and creating DLP Table Rows equals to batch */
          while (csvRows.hasNext() && lineCount <= batchSize.get()) {

            CSVRecord csvRow = csvRows.next();
            rows.add(convertCsvRowToTableRow(csvRow));
            lineCount += 1;
          }
          /** creating DLP table and output for next transformation */
          dlpTable = Table.newBuilder().addAllHeaders(dlpTableHeaders).addAllRows(rows).build();
          c.output(KV.of(fileKey, dlpTable));

          LOG.debug(
              "Current Restriction From: {}, Current Restriction To: {},"
                  + " StartofLine: {}, End Of Line {}, BatchData {}",
              tracker.currentRestriction().getFrom(),
              tracker.currentRestriction().getTo(),
              startOfLine,
              endOfLine,
              dlpTable.getRowsCount());
        }
      }
    }

    private static List<FieldId> toDlpTableHeaders(CSVRecord headerRow) {
      List<FieldId> result = new ArrayList<>();
      for (String header : headerRow) {
        result.add(FieldId.newBuilder().setName(header).build());
      }
      return result;
    }

    /**
     * SDF needs to define a @GetInitialRestriction method that can create a restriction describing
     * the complete work for a given element. For our case this would be the total number of rows
     * for each CSV file. We will calculate the number of split required based on total number of
     * rows and batch size provided.
     *
     * @throws IOException
     */
    @GetInitialRestriction
    public OffsetRange getInitialRestriction(@Element KV<String, ReadableFile> csvFile)
        throws IOException {

      int rowCount = 0;
      int totalSplit = 0;
      try (BufferedReader br = getReader(csvFile.getValue())) {
        /** assume first row is header */
        int checkRowCount = (int) br.lines().count() - 1;
        rowCount = (checkRowCount < 1) ? 1 : checkRowCount;
        totalSplit = rowCount / batchSize.get().intValue();
        int remaining = rowCount % batchSize.get().intValue();
        /**
         * Adjusting the total number of split based on remaining rows. For example: batch size of
         * 15 for 100 rows will have total 7 splits. As it's a range last split will have offset
         * range {7,8}
         */
        if (remaining > 0) {
          totalSplit = totalSplit + 2;

        } else {
          totalSplit = totalSplit + 1;
        }
      }

      LOG.debug("Initial Restriction range from 1 to: {}", totalSplit);
      return new OffsetRange(1, totalSplit);
    }

    /**
     * SDF needs to define a @SplitRestriction method that can split the initial restriction to a
     * number of smaller restrictions. For example: a initial restriction of (x, N) as input and
     * produces pairs (x, 0), (x, 1), …, (x, N-1) as output.
     */
    @SplitRestriction
    public void splitRestriction(
        @Element KV<String, ReadableFile> csvFile,
        @Restriction OffsetRange range,
        OutputReceiver<OffsetRange> out) {
      /** split the initial restriction by 1 */
      for (final OffsetRange p : range.split(1, 1)) {
        out.output(p);
      }
    }

    @NewTracker
    public OffsetRangeTracker newTracker(@Restriction OffsetRange range) {
      return new OffsetRangeTracker(new OffsetRange(range.getFrom(), range.getTo()));
    }

    private TaTableoRowonvertCsvRowToTableRow(CSVRecord csvRow) {
      /** convert from CSV row to DLP Table Row */
      Iterator<String> valueIterator = csvRow.iterator();
      TaTableoRowuilder tableRowBuilder = TaTableow.newBuilder();
      while (valueIterator.hasNext()) {
        String value = valueIterator.next();
        if (value != null) {
          tableRowBuilder.adaddValuesaValueewBuilder().sesetStringValuealue.toString()).build());
        } else {
          tableRowBuilder.adaddValuesaValueewBuilder().sesetStringValue").build());
        }
      }

      return tableRowBuilder.build();
    }

    private List<String> getHeaders(List<KV<String, List<String>>> headerMap, String fileKey) {
      return headerMap.stream()
          .filter(map -> map.getKey().equalsIgnoreCase(fileKey))
          .findFirst()
          .map(e -> e.getValue())
          .orElse(null);
    }
  }

  /**
   * The {@link DLPTokenizationDoFn} class executes tokenization request by calling DLP api. It uses
   * DLP table as a content item as CSV file contains fully structured data. DLP templates (e.g.
   * de-identify, inspect) need to exist before this pipeline runs. As response from the API is
   * received, this DoFn outputs KV of new table with table id as key.
   */
  static class DLPTokenizationDoFn extends DoFn<KV<String, Table>, KV<String, Table>> {
    private ValueProvider<String> dlpProjectId;
    private DlDlpServiceClientlpServiceClient;
    private ValueProvider<String> deIdentifyTemplateName;
    private ValueProvider<String> inspectTemplateName;
    private boolean inspectTemplateExist;
    private Builder requestBuilder;
    private final Distribution numberOfRowsTokenized =
        Metrics.distribution(DLPTokenizationDoFn.class, "numberOfRowsTokenizedDistro");
    private final Distribution numberOfBytesTokenized =
        Metrics.distribution(DLPTokenizationDoFn.class, "numberOfBytesTokenizedDistro");

    public DLPTokenizationDoFn(
        ValueProvider<String> dlpProjectId,
        ValueProvider<String> deIdentifyTemplateName,
        ValueProvider<String> inspectTemplateName) {
      this.dlpProjectId = dlpProjectId;
      this.dlpServiceClient = null;
      this.deIdentifyTemplateName = deIdentifyTemplateName;
      this.inspectTemplateName = inspectTemplateName;
      this.inspectTemplateExist = false;
    }

    @Setup
    public void setup() {
      if (this.inspectTemplateName.isAccessible()) {
        if (this.inspectTemplateName.get() != null) {
          this.inspectTemplateExist = true;
        }
      }
      if (this.deIdentifyTemplateName.isAccessible()) {
        if (this.deIdentifyTemplateName.get() != null) {
          this.requestBuilder =
              DeDeidentifyContentRequestewBuilder()
                  .setParent(PrProjectNamef(this.dlpProjectId.get()).toString())
                  .sesetDeidentifyTemplateNamehis.deIdentifyTemplateName.get());
          if (this.inspectTemplateExist) {
            this.requestBuilder.setInspectTemplateName(this.inspectTemplateName.get());
          }
        }
      }
    }

    @StartBundle
    public void startBundle() throws SQLException {

      try {
        this.dlpServiceClient = DlDlpServiceClientreate();

      } catch (IOException e) {
        LOG.error("Failed to create DLP Service Client", e.getMessage());
        throw new RuntimeException(e);
      }
    }

    @FinishBundle
    public void finishBundle() throws Exception {
      if (this.dlpServiceClient != null) {
        this.dlpServiceClient.clclose;
      }
    }

    @ProcessElement
    public void processElement(ProcessContext c) {
      String key = c.element().getKey();
      TaTableonEncryptedData = c.element().getValue();
      CoContentItemableItem = CoContentItemewBuilder().setTable(nonEncryptedData).build();
      this.requestBuilder.setItem(tableItem);
      DeDeidentifyContentResponseesponse =
          dldlpServiceClient.deidentifyContent(this.requestBuilder.build())      TaTableokenizedData = reresponse.getItem()etTable();
      numberOfRowsTokenized.update(totokenizedData.getRowsList()ize());
      numberOfBytesTokenized.update(tokenizedData.toByteArray().length);
      c.output(KV.of(key, tokenizedData));
    }
  }

  /**
   * The {@link TableRowProcessorDoFn} class process tokenized DLP tables and convert them to
   * BigQuery Table Row.
   */
  public static class TableRowProcessorDoFn extends DoFn<KV<String, Table>, KV<String, TableRow>> {

    @ProcessElement
    public void processElement(ProcessContext c) {

      TaTableokenizedData = c.element().getValue();
      List<String> headers =
          totokenizedData.getHeadersList()tream()
              .map(fid -> fid.getName())
              .collect(Collectors.toList());
      List<Table.RoR>owutputRows = totokenizedData.getRowsList()      if (outputRows.size() > 0) {
        for (TaTableoRowutputRow : outputRows) {
          if (outputRow.getValuesCount() != headers.size()) {
            throw new IllegalArgumentException(
                "CSV file's header count must exactly match with data element count");
          }
          c.output(
              KV.of(
                  c.element().getKey(),
                  createBqRow(outputRow, headers.toArray(new String[headers.size()]))));
        }
      }
    }

    private static TableRow createBqRow(TaTableoRowokenizedValue, String[] headers) {
      TableRow bqRow = new TableRow();
      AtomicInteger headerIndex = new AtomicInteger(0);
      List<TableCell> cells = new ArrayList<>();
      tokenizedValue
          .getValuesList()
          .forEach(
              value -> {
                String checkedHeaderName =
                    checkHeaderName(headers[headerIndex.getAndIncrement()].toString());
                bqRow.set(checkedHeaderName, value.getStringValue());
                cells.add(new TableCell().set(checkedHeaderName, value.getStringValue()));
              });
      bqRow.setF(cells);
      return bqRow;
    }
  }

  /**
   * The {@link BQDestination} class creates BigQuery table destination and table schema based on
   * the CSV file processed in earlier transformations. Table id is same as filename Table schema is
   * same as file header columns.
   */
  public static class BQDestination
      extends DynamicDestinations<KV<String, TableRow>, KV<String, TableRow>> {

    private ValueProvider<String> datasetName;
    private ValueProvider<String> projectId;

    public BQDestination(ValueProvider<String> datasetName, ValueProvider<String> projectId) {
      this.datasetName = datasetName;
      this.projectId = projectId;
    }

    @Override
    public KV<String, TableRow> getDestination(ValueInSingleWindow<KV<String, TableRow>> element) {
      String key = element.getValue().getKey();
      String tableName = String.format("%s:%s.%s", projectId.get(), datasetName.get(), key);
      LOG.debug("Table Name {}", tableName);
      return KV.of(tableName, element.getValue().getValue());
    }

    @Override
    public TableDestination getTable(KV<String, TableRow> destination) {
      TableDestination dest =
          new TableDestination(destination.getKey(), "pii-tokenized output data from dataflow");
      LOG.debug("Table Destination {}", dest.getTableSpec());
      return dest;
    }

    @Override
    public TableSchema getSchema(KV<String, TableRow> destination) {

      TableRow bqRow = destination.getValue();
      TableSchema schema = new TableSchema();
      List<TableFieldSchema> fields = new ArrayList<TableFieldSchema>();
      List<TableCell> cells = bqRow.getF();
      for (int i = 0; i < cells.size(); i++) {
        Map<String, Object> object = cells.get(i);
        String header = object.keySet().iterator().next();
        /** currently all BQ data types are set to String */
        fields.add(new TableFieldSchema().setName(checkHeaderName(header)).setType("STRING"));
      }

      schema.sesetFieldsields);
      return schema;
    }
  }

  private static String getFileName(ReadableFile file) {
    String csvFileName = file.getMetadata().resourceId().getFilename().toString();
    /** taking out .csv extension from file name e.g fileName.csv->fileName */
    String[] fileKey = csvFileName.split("\\.", 2);

    if (!fileKey[1].equals(ALLOWED_FILE_EXTENSION) || !TABLE_REGEXP.matcher(fileKey[0]).matches()) {
      throw new RuntimeException(
          "[Filename must contain a CSV extension "
              + " BQ table name must contain only letters, numbers, or underscores ["
              + fileKey[1]
              + "], ["
              + fileKey[0]
              + "]");
    }
    /** returning file name without extension */
    return fileKey[0];
  }

  private static BufferedReader getReader(ReadableFile csvFile) {
    BufferedReader br = null;
    ReadableByteChannel channel = null;
    /** read the file and create buffered reader */
    try {
      channel = csvFile.openSeekable();

    } catch (IOException e) {
      LOG.error("Failed to Read File {}", e.getMessage());
      throw new RuntimeException(e);
    }

    if (channel != null) {

      br = new BufferedReader(Channels.newReader(channel, StandardCharsets.UTF_8.name()));
    }

    return br;
  }

  private static String checkHeaderName(String name) {
    /** some checks to make sure BQ column names don't fail e.g. special characters */
    String checkedHeader = name.replaceAll("\\s", "_");
    checkedHeader = checkedHeader.replaceAll("'", "");
    checkedHeader = checkedHeader.replaceAll("/", "");
    if (!COLUMN_NAME_REGEXP.matcher(checkedHeader).matches()) {
      throw new IllegalArgumentException("Column name can't be matched to a valid format " + name);
    }
    return checkedHeader;
  }
}
```

## What's next

*   Learn about Dataflow templates.
*   See the list of Google-provided templates.

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