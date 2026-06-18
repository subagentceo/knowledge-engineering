# MongoDB to BigQuery template

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   Cloud Dataflow
*   Reference

Send feedback

# MongoDB to BigQuery template Stay organized with collections Save and categorize content based on your preferences.

**Beta**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms. Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions.

This template creates a batch pipeline that reads documents from MongoDB and writes them to BigQuery.

If you want to capture MongoDB change stream data, you can use the MongoDB to BigQuery (CDC) template.

## Pipeline requirements

*   The target BigQuery dataset must exist.
*   The source MongoDB instance must be accessible from the Dataflow worker machines.

### Output format

The format of the output records depends on the value of the `userOption` parameter. If `userOption` is `NONE`, the output has the following schema. The `source_data` field contains the document in JSON format.

  [
    {"name":"id","type":"STRING"},
    {"name":"source_data","type":"STRING"},
    {"name":"timestamp","type":"TIMESTAMP"}
  ]
  

If `userOption` is `FLATTEN`, the pipeline flattens the documents and writes the top-level fields as table columns. For example, suppose the documents in the MongoDB collection contain the following fields:

*   `"_id"` (`string`)
*   `"title"` (`string`)
*   `"genre"` (`string`)

Using `FLATTEN`, the output has the following schema. The `timestamp` field is added by the template.

  [
    {"name":"_id","type":"STRING"},
    {"name":"title","type":"STRING"},
    {"name":"genre","type":"STRING"},
    {"name":"timestamp","type":"TIMESTAMP"}
  ]
  

If `userOption` is `JSON`, the pipeline stores the document in the BigQuery JSON format. BigQuery has built-in support for JSON data using the JSON data type. For more information, see Working with JSON data in GoogleSQL.

## Template parameters

### Required parameters

*   **mongoDbUri**: The MongoDB connection URI in the format `mongodb+srv://:@.`.
*   **database**: Database in MongoDB to read the collection from. For example, `my-db`.
*   **collection**: Name of the collection inside MongoDB database. For example, `my-collection`.
*   **userOption**: `FLATTEN`, `JSON`, or `NONE`. `FLATTEN` flattens the documents to the single level. `JSON` stores document in BigQuery JSON format. `NONE` stores the whole document as a JSON-formatted STRING. Defaults to: NONE.
*   **outputTableSpec**: The BigQuery table to write to. For example, `bigquery-project:dataset.output_table`.

### Optional parameters

*   **KMSEncryptionKey**: Cloud KMS Encryption Key to decrypt the mongodb uri connection string. If Cloud KMS key is passed in, the mongodb uri connection string must all be passed in encrypted. For example, `projects/your-project/locations/global/keyRings/your-keyring/cryptoKeys/your-key`.
*   **filter**: Bson filter in json format. For example, `{ "val": { $gt: 0, $lt: 9 }}`.
*   **useStorageWriteApi**: If `true`, the pipeline uses the BigQuery Storage Write API (https://cloud.google.com/bigquery/docs/write-api). The default value is `false`. For more information, see Using the Storage Write API (https://beam.apache.org/documentation/io/built-in/google-bigquery/#storage-write-api).
*   **useStorageWriteApiAtLeastOnce**: When using the Storage Write API, specifies the write semantics. To use at-least-once semantics (https://beam.apache.org/documentation/io/built-in/google-bigquery/#at-least-once-semantics), set this parameter to `true`. To use exactly-once semantics, set the parameter to `false`. This parameter applies only when `useStorageWriteApi` is `true`. The default value is `false`.
*   **bigQuerySchemaPath**: The Cloud Storage path for the BigQuery JSON schema. For example, `gs://your-bucket/your-schema.json`.
*   **javascriptDocumentTransformGcsPath**: The Cloud Storage URI of the `.js` file that defines the JavaScript user-defined function (UDF) to use. For example, `gs://your-bucket/your-transforms/*.js`.
*   **javascriptDocumentTransformFunctionName**: The name of the JavaScript user-defined function (UDF) to use. For example, if your JavaScript function code is `myTransform(inJson) { /*...do stuff...*/ }`, then the function name is myTransform. For sample JavaScript UDFs, see UDF Examples (https://github.com/GoogleCloudPlatform/DataflowTemplates#udf-examples). For example, `transform`.

## User-defined function

Optionally, you can extend this template by writing a user-defined function (UDF) in JavaScript. The template calls the UDF for each input element. Element payloads are serialized as JSON strings.

To use a UDF, upload the JavaScript file to Cloud Storage and set the following template parameters:

Parameter

Description

`javascriptDocumentTransformGcsPath`

The Cloud Storage location of the JavaScript file.

`javascriptDocumentTransformFunctionName`

The name of the JavaScript function.

For more information, see Create user-defined functions for Dataflow templates.

### Function specification

The UDF has the following specification:

*   **Input**: a MongoDB document.
*   **Output**: an object serialized as a JSON string. If `userOption` is `NONE`, the JSON object must include a property named `_id` that contains the document ID.

## Run the template

### Console

1.  Go to the Dataflow **Create job from template** page.
Go to Create job from template3.  In the **Job name** field, enter a unique job name.
4.  Optional: For **Regional endpoint**, select a value from the drop-down menu. The default region is `us-central1`.
    
    For a list of regions where you can run a Dataflow job, see Dataflow locations.
    
5.  From the **Dataflow template** drop-down menu, select the **MongoDB to BigQuery** template.
6.  In the provided parameter fields, enter your parameter values.
7.  Click **Run job**.

### gcloud

**Note:** To use the Google Cloud CLI to run flex templates, you must have Google Cloud CLI version 284.0.0 or later.

In your shell or terminal, run the template:

gcloud dataflow flex-template run JOB_NAME \
    --project=PROJECT_ID \
    --region=REGION_NAME \
    --template-file-gcs-location=gs://dataflow-templates-REGION_NAME/VERSION/flex/MongoDB_to_BigQuery \
    --parameters \
outputTableSpec=OUTPUT_TABLE_SPEC,\
mongoDbUri=MONGO_DB_URI,\
database=DATABASE,\
collection=COLLECTION,\
userOption=USER_OPTION

Replace the following:

*   `PROJECT_ID`: the Google Cloud project ID where you want to run the Dataflow job
*   `JOB_NAME`: a unique job name of your choice
*   `REGION_NAME`: the region where you want to deploy your Dataflow job—for example, `us-central1`
*   `VERSION`: the version of the template that you want to use
    
    You can use the following values:
    
    *   `latest` to use the latest version of the template, which is available in the **non-dated** parent folder in the bucket— gs://dataflow-templates-REGION_NAME/latest/
    *   the version name, like `2023-09-12-00_RC00`, to use a specific version of the template, which can be found nested in the respective dated parent folder in the bucket— gs://dataflow-templates-REGION_NAME/
    
    **Caution:** The **latest** version of templates might update with breaking changes. Your production environments should use templates kept in the most recent **dated** parent folder to prevent these breaking changes from affecting your production workflows.
    
*   `OUTPUT_TABLE_SPEC`: your target BigQuery table name.
*   `MONGO_DB_URI`: your MongoDB URI.
*   `DATABASE`: your MongoDB database.
*   `COLLECTION`: your MongoDB collection.
*   `USER_OPTION`: FLATTEN, JSON, or NONE.

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
          "collection": "COLLECTION",
          "userOption": "USER_OPTION"
      },
      "containerSpecGcsPath": "gs://dataflow-templates-LOCATION/VERSION/flex/MongoDB_to_BigQuery",
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
    
*   `OUTPUT_TABLE_SPEC`: your target BigQuery table name.
*   `MONGO_DB_URI`: your MongoDB URI.
*   `DATABASE`: your MongoDB database.
*   `COLLECTION`: your MongoDB collection.
*   `USER_OPTION`: FLATTEN, JSON, or NONE.

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

import static com.google.cloud.teleport.v2.utils.GCSUtils.getGcsFileAsString;
import static com.google.cloud.teleport.v2.utils.KMSUtils.maybeDecrypt;

import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.bigquery.model.TableRow;
import com.google.api.services.bigquery.model.TableSchema;
import com.google.cloud.teleport.metadata.Template;
import com.google.cloud.teleport.metadata.TemplateCategory;
import com.google.cloud.teleport.v2.common.UncaughtExceptionLogger;
import com.google.cloud.teleport.v2.mongodb.options.MongoDbToBigQueryOptions.BigQueryWriteOptions;
import com.google.cloud.teleport.v2.mongodb.options.MongoDbToBigQueryOptions.JavascriptDocumentTransformerOptions;
import com.google.cloud.teleport.v2.mongodb.options.MongoDbToBigQueryOptions.MongoDbOptions;
import com.google.cloud.teleport.v2.mongodb.templates.MongoDbToBigQuery.Options;
import com.google.cloud.teleport.v2.options.BigQueryStorageApiBatchOptions;
import com.google.cloud.teleport.v2.transforms.JavascriptDocumentTransformer.TransformDocumentViaJavascript;
import com.google.cloud.teleport.v2.utils.BigQueryIOUtils;
import com.google.common.base.Strings;
import java.io.IOException;
import javax.script.ScriptException;
import org.apache.beam.sdk.Pipeline;
import org.apache.beam.sdk.io.FileSystems;
import org.apache.beam.sdk.io.gcp.bigquery.BigQueryIO;
import org.apache.beam.sdk.io.mongodb.FindQuery;
import org.apache.beam.sdk.io.mongodb.MongoDbIO;
import org.apache.beam.sdk.options.PipelineOptions;
import org.apache.beam.sdk.options.PipelineOptionsFactory;
import org.apache.beam.sdk.transforms.DoFn;
import org.apache.beam.sdk.transforms.ParDo;
import org.bson.BsonDocument;
import org.bson.Document;

/**
 * The {@link MongoDbToBigQuery} pipeline is a batch pipeline which ingests data from MongoDB and
 * outputs the resulting records to BigQuery.
 *
 * <p>Check out <a
 * href="https://github.com/GoogleCloudPlatform/DataflowTemplates/blob/main/v2/mongodb-to-googlecloud/README_MongoDB_to_BigQuery.md">README</a>
 * for instructions on how to use or modify this template.
 */
@Template(
    name = "MongoDB_to_BigQuery",
    category = TemplateCategory.BATCH,
    displayName = "MongoDB to BigQuery",
    description =
        "The MongoDB to BigQuery template is a batch pipeline that reads documents from MongoDB and writes them to "
            + "BigQuery as specified by the <code>userOption</code> parameter.",
    optionsClass = Options.class,
    flexContainerName = "mongodb-to-googlecloud",
    documentation =
        "https://cloud.google.com/dataflow/docs/guides/templates/provided/mongodb-to-bigquery",
    contactInformation = "https://cloud.google.com/support",
    preview = true,
    requirements = {
      "The target BigQuery dataset must exist.",
      "The source MongoDB instance must be accessible from the Dataflow worker machines."
    })
public class MongoDbToBigQuery {
  /**
   * Options supported by {@link MongoDbToBigQuery}
   *
   * <p>Inherits standard configuration options.
   */
  public interface Options
      extends PipelineOptions,
          MongoDbOptions,
          BigQueryWriteOptions,
          BigQueryStorageApiBatchOptions,
          JavascriptDocumentTransformerOptions {}

  private static class ParseAsDocumentsFn extends DoFn<String, Document> {
    @ProcessElement
    public void processElement(ProcessContext context) {
      context.output(Document.parse(context.element()));
    }
  }

  public static void main(String[] args)
      throws ScriptException, IOException, NoSuchMethodException {
    UncaughtExceptionLogger.register();

    Options options = PipelineOptionsFactory.fromArgs(args).withValidation().as(Options.class);

    BigQueryIOUtils.validateBQStorageApiOptionsBatch(options);

    run(options);
  }

  public static boolean run(Options options)
      throws ScriptException, IOException, NoSuchMethodException {
    Pipeline pipeline = Pipeline.create(options);
    String userOption = options.getUserOption();

    TableSchema bigquerySchema;

    // Get MongoDbUri plain text or base64 encrypted with a specific KMS encryption key
    String mongoDbUri = maybeDecrypt(options.getMongoDbUri(), options.getKMSEncryptionKey()).get();

    if (options.getBigQuerySchemaPath() != null) {
      // initialize FileSystem to read from GCS
      FileSystems.setDefaultPipelineOptions(options);
      String jsonSchema = getGcsFileAsString(options.getBigQuerySchemaPath());
      GsonFactory gf = new GsonFactory();
      bigquerySchema = gf.fromString(jsonSchema, TableSchema.class);
    } else if (options.getJavascriptDocumentTransformFunctionName() != null
        && options.getJavascriptDocumentTransformGcsPath() != null) {
      bigquerySchema =
          MongoDbUtils.getTableFieldSchemaForUDF(
              mongoDbUri,
              options.getDatabase(),
              options.getCollection(),
              options.getJavascriptDocumentTransformGcsPath(),
              options.getJavascriptDocumentTransformFunctionName(),
              options.getUserOption());
    } else {
      bigquerySchema =
          MongoDbUtils.getTableFieldSchema(
              mongoDbUri, options.getDatabase(), options.getCollection(), options.getUserOption());
    }

    MongoDbIO.Read readDocuments =
        MongoDbIO.read()
            .withUri(mongoDbUri)
            .withDatabase(options.getDatabase())
            .withCollection(options.getCollection());

    String filterJson = options.getFilter();
    BsonDocument filter;
    if (!Strings.isNullOrEmpty(filterJson)
        && !(filter = BsonDocument.parse(filterJson)).isEmpty()) {
      readDocuments = readDocuments.withQueryFn(FindQuery.create().withFilters(filter));
    }

    pipeline
        .apply("Read Documents", readDocuments)
        .apply(
            "UDF",
            TransformDocumentViaJavascript.newBuilder()
                .setFileSystemPath(options.getJavascriptDocumentTransformGcsPath())
                .setFunctionName(options.getJavascriptDocumentTransformFunctionName())
                .build())
        .apply(
            "Transform to TableRow",
            ParDo.of(
                new DoFn<Document, TableRow>() {

                  @ProcessElement
                  public void process(ProcessContext c) {
                    Document document = c.element();
                    TableRow row = MongoDbUtils.getTableSchema(document, userOption);
                    c.output(row);
                  }
                }))
        .apply(
            "Write to Bigquery",
            BigQueryIO.writeTableRows()
                .to(options.getOutputTableSpec())
                .withSchema(bigquerySchema)
                .withCreateDisposition(BigQueryIO.Write.CreateDisposition.CREATE_IF_NEEDED)
                .withWriteDisposition(BigQueryIO.Write.WriteDisposition.WRITE_APPEND));
    pipeline.run();
    return true;
  }
}
```

## What's next

*   Learn about Dataflow templates.
*   See the list of Google-provided templates.

Send feedback