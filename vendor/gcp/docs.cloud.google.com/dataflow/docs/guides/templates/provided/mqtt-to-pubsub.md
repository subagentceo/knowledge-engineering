# MQTT to Pub/Sub template

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Data analytics
*   Cloud Dataflow
*   Reference

Send feedback

# MQTT to Pub/Sub template Stay organized with collections Save and categorize content based on your preferences.

**Beta**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms. Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions.

The MQTT to Pub/Sub template is a streaming pipeline that reads messages from an MQTT topic and writes them to Pub/Sub. It includes the optional parameters `username` and `password` in case authentication is required by the MQTT server.

If the pipeline doesn't receive any message from the MQTT topic for more than 90 minutes, a `StackOverflowError` occurs. As a workaround, you can change the number of workers every 90 minutes. For more information about changing the number of workers without stopping your job, see In-flight job option update.

## Pipeline Requirements

*   The Pub/Sub output topic name must exist.
*   The MQTT host IP must exist and have the proper network configuration for worker machines to reach the MQTT host.
*   The MQTT topic that data is extracted from must have a name.

## Template parameters

### Required parameters

*   **inputTopic**: The name of the MQTT topic that data is read from. For example, `topic`.
*   **outputTopic**: The name of the output Pub/Sub topic that data is written to. For example, `projects/your-project-id/topics/your-topic-name`.
*   **username**: The username to use for authentication on the MQTT server. For example, `sampleusername`.
*   **password**: The password associated with the provided username. For example, `samplepassword`.

### Optional parameters

*   **brokerServer**: The MQTT broker server IP or host. For example, `tcp://host:1883`.

## Run the template

### Console

1.  Go to the Dataflow **Create job from template** page.
Go to Create job from template3.  In the **Job name** field, enter a unique job name.
4.  Optional: For **Regional endpoint**, select a value from the drop-down menu. The default region is `us-central1`.
    
    For a list of regions where you can run a Dataflow job, see Dataflow locations.
    
5.  From the **Dataflow template** drop-down menu, select MQTT to Pub/Sub template.
6.  In the provided parameter fields, enter your parameter values.
7.  Click **Run job**.

### gcloud

**Note:** To use the Google Cloud CLI to run flex templates, you must have Google Cloud CLI version 284.0.0 or later.

In your shell or terminal, run the template:

gcloud dataflow flex-template run JOB_NAME \
    --project=YOUR_PROJECT_ID \
    --region=REGION_NAME \
    --template-file-gcs-location=gs://dataflow-templates-REGION_NAME/VERSION/flex/ \
    --parameters \
brokerServer=MQTT_SERVER,\
inputTopic=INPUT_TOPIC,\
outputTopic=OUTPUT_TOPIC,\
username=USERNAME,\
password=PASSWORD
  

You must replace the following values in this example:

*   Replace YOUR_PROJECT_ID with your project ID.
*   Replace with Dataflow region name. For example: `us-central1`.
*   Replace JOB_NAME with a job name of your choice. The job name must match the regular expression `[a-z]([-a-z0-9]{0,38}[a-z0-9])?` to be valid.
*   Replace INPUT_TOPIC with the name of the MQTT server input topic. For example: `testtopic`.
*   Replace MQTT_SERVER with the MQTT server addresses. For example: `tcp://10.128.0.62:1883`
*   Replace OUTPUT_TOPIC with the name of Pub/Sub output topic. For example: `projects/myproject/topics/testoutput`.
*   Replace USERNAME with the username for the MQTT server. For example: `testuser`.
*   Replace PASSWORD with the password that corresponds to the username used with the MQTT server.

### API

To run the template using the REST API, send an HTTP POST request. For more information on the API and its authorization scopes, see `projects.templates.launch`.

POST https://dataflow.googleapis.com/v1b3/projects/PROJECT_ID/locations/LOCATION/flexTemplates:launch
{
   "launch_parameter": {
      "jobName": "JOB_NAME",
      "parameters": {
          "brokerServer": "MQTT_SERVER",
          "inputTopic": "INPUT_TOPIC",
          "outputTopic": "OUTPUT_TOPIC",
          "username": "USERNAME",
          "password": "PASSWORD"
      },
      "containerSpecGcsPath": "gs://dataflow-templates-LOCATION/VERSION/flex/",
   }
}
  

You must replace the following values in this example:

*   Replace YOUR_PROJECT_ID with your project ID.
*   Replace with Dataflow region name. For example: `us-central1`.
*   Replace JOB_NAME with a job name of your choice. The job name must match the regular expression `[a-z]([-a-z0-9]{0,38}[a-z0-9])?` to be valid.
*   Replace INPUT_TOPIC with the name of the MQTT server input topic. For example: `testtopic`.
*   Replace MQTT_SERVER with the MQTT server addresses. For example: `tcp://10.128.0.62:1883`
*   Replace OUTPUT_TOPIC with the name of Pub/Sub output topic. For example: `projects/myproject/topics/testoutput`.
*   Replace USERNAME with the username for the MQTT server. For example: `testuser`.
*   Replace PASSWORD with the password that corresponds to the username used with the MQTT server.

## Template source code

### Java

```
/*
 * Copyright (C) 2023 Google LLC
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
package com.google.cloud.teleport.v2.templates;

import com.google.cloud.teleport.metadata.Template;
import com.google.cloud.teleport.metadata.TemplateCategory;
import com.google.cloud.teleport.metadata.TemplateParameter;
import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;
import org.apache.beam.sdk.Pipeline;
import org.apache.beam.sdk.PipelineResult;
import org.apache.beam.sdk.io.gcp.pubsub.PubsubIO;
import org.apache.beam.sdk.io.mqtt.MqttIO;
import org.apache.beam.sdk.options.PipelineOptions;
import org.apache.beam.sdk.options.PipelineOptionsFactory;
import org.apache.beam.sdk.options.Validation;
import org.apache.beam.sdk.transforms.DoFn;
import org.apache.beam.sdk.transforms.ParDo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Dataflow template which reads data from Mqtt Topic and writes it to Cloud PubSub.
 *
 * <p>Check out <a
 * href="https://github.com/GoogleCloudPlatform/DataflowTemplates/blob/main/v2/mqtt-to-pubsub/README_Mqtt_to_PubSub.md">README</a>
 * for instructions on how to use or modify this template.
 */
@Template(
    name = "Mqtt_to_PubSub",
    category = TemplateCategory.STREAMING,
    displayName = "MQTT to Pubsub",
    description =
        "The MQTT to Pub/Sub template is a streaming pipeline that reads messages from an MQTT topic and writes them to Pub/Sub. "
            + "It includes the optional parameters <code>username</code> and <code>password</code> in case authentication is required by the MQTT server.",
    optionsClass = MqttToPubsub.MqttToPubsubOptions.class,
    flexContainerName = "mqtt-to-pubsub",
    contactInformation = "https://cloud.google.com/support",
    documentation =
        "https://cloud.google.com/dataflow/docs/guides/templates/provided/mqtt-to-pubsub",
    preview = true,
    requirements = {
      "The Pub/Sub output topic name must exist.",
      "The MQTT host IP must exist and have the proper network configuration for worker machines to reach the MQTT host.",
      "The MQTT topic that data is extracted from must have a name."
    },
    streaming = true,
    supportsAtLeastOnce = true)
public class MqttToPubsub {

  private static final Logger LOG = LoggerFactory.getLogger(MqttToPubsub.class);
  private static final Pattern PUBSUB_TOPIC_PATTERN =
      Pattern.compile("^projects/[\\w:-]+/topics/[\\w:-]+$");

  /**
   * Runs a pipeline which reads data from Mqtt topic and writes it to Cloud PubSub.
   *
   * @param args arguments to the pipeline
   */
  public static void main(String[] args) {
    MqttToPubsubOptions options =
        PipelineOptionsFactory.fromArgs(args).withValidation().as(MqttToPubsubOptions.class);
    run(options);
  }

  public static void validate(MqttToPubsubOptions options) {
    if (options != null) {
      if ((options.getUsername() != null && !options.getUsername().isEmpty())
          && (options.getPassword() == null || options.getPassword().isBlank())) {
        throw new IllegalArgumentException(
            "While username is provided, password is required for authentication");
      }
      if (options.getInputTopic() != null
          && PUBSUB_TOPIC_PATTERN.matcher(options.getInputTopic()).matches()) {
        LOG.warn(
            "The input topic '{}' matches the format of a Google Cloud Pub/Sub topic. "
                + "Please verify that this is a valid MQTT topic and not a misconfigured Pub/Sub topic.",
            options.getInputTopic());
      }
    }
  }

  public static PipelineResult run(MqttToPubsubOptions options) {
    validate(options);
    Pipeline pipeline = Pipeline.create(options);
    MqttIO.Read<byte[]> mqttIo;
    if (!options.getUsername().isEmpty() || !options.getPassword().isBlank()) {
      mqttIo =
          MqttIO.read()
              .withConnectionConfiguration(
                  MqttIO.ConnectionConfiguration.create(
                          options.getBrokerServer(), options.getInputTopic())
                      .withUsername(options.getUsername())
                      .withPassword(options.getPassword()));
    } else {
      mqttIo =
          MqttIO.read()
              .withConnectionConfiguration(
                  MqttIO.ConnectionConfiguration.create(
                      options.getBrokerServer(), options.getInputTopic()));
    }

    return pipeline
        .apply("ReadFromMqttTopic", mqttIo)
        .apply(ParDo.of(new ByteToStringTransform()))
        .apply("WriteToPubSubTopic", PubsubIO.writeStrings().to(options.getOutputTopic()))
        .getPipeline()
        .run();
  }

  static class ByteToStringTransform extends DoFn<byte[], String> {
    @ProcessElement
    public void processElement(@Element byte[] word, OutputReceiver<String> out) {
      out.output(new String(word, StandardCharsets.UTF_8));
    }
  }

  /**
   * The {@link MqttToPubsubOptions} interface provides the custom execution options passed by the
   * executor at the command-line.
   */
  public interface MqttToPubsubOptions extends PipelineOptions {
    @TemplateParameter.Text(
        order = 1,
        groupName = "Source",
        optional = true,
        regexes = {"[,\\/:a-zA-Z0-9._-]+"},
        description = "MQTT Broker IP",
        helpText = "The MQTT broker server IP or host.",
        example = "tcp://host:1883")
    @Validation.Required
    String getBrokerServer();

    void setBrokerServer(String brokerServer);

    @TemplateParameter.Text(
        order = 2,
        groupName = "Source",
        optional = false,
        regexes = {"[\\/a-zA-Z0-9._-]+"},
        description = "MQTT topic(s) to read the input from",
        helpText = "The name of the MQTT topic that data is read from.",
        example = "topic")
    @Validation.Required
    String getInputTopic();

    void setInputTopic(String inputTopics);

    @TemplateParameter.PubsubTopic(
        order = 3,
        groupName = "Target",
        description = "Output Pub/Sub topic",
        helpText = "The name of the output Pub/Sub topic that data is written to.",
        example = "projects/your-project-id/topics/your-topic-name")
    @Validation.Required
    String getOutputTopic();

    void setOutputTopic(String outputTopic);

    @TemplateParameter.Text(
        order = 4,
        description = "MQTT Username",
        helpText = "The username to use for authentication on the MQTT server.",
        example = "sampleusername")
    String getUsername();

    void setUsername(String username);

    @TemplateParameter.Password(
        order = 5,
        description = "MQTT Password",
        helpText = "The password associated with the provided username.",
        example = "samplepassword")
    String getPassword();

    void setPassword(String password);
  }
}
```

## What's next

*   Learn about Dataflow templates.
*   See the list of Google-provided templates.

Send feedback