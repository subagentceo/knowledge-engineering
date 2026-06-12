# Apache Kafka

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Observability
*   Cloud Logging
*   Guides

Send feedback

# Apache Kafka Stay organized with collections Save and categorize content based on your preferences.

The Apache Kafka integration collects broker metrics, such as topic requests and failures. It also monitors the partitions on the broker. The integration collects Kafka logs and parses them into a JSON payload. The result includes fields for logger, level, and message.

For more information about Kafka, see the Apache Kafka documentation.

## Prerequisites

To collect Kafka telemetry, you must install the Ops Agent:

*   For metrics, install version 2.10.0 or higher.
*   For logs, install version 2.10.0 or higher.

This integration supports Kafka versions 0.8 through 3.0.0.

## Configure your Kafka instance

To expose a JMX endpoint, you must set the `com.sun.management.jmxremote.port` system property when starting the JVM. We also recommend setting the `com.sun.management.jmxremote.rmi.port` system property to the same port. To expose a JMX endpoint remotely, you must also set the `java.rmi.server.hostname` system property.

By default, these properties are set in a Kafka deployment's `bin/kafka-run-class.sh` file.

To set system properties by using command-line arguments, prepend the property name with `-D` when starting the JVM. For example, to set `com.sun.management.jmxremote.port` to port `9999`, specify the following when starting the JVM:

-Dcom.sun.management.jmxremote.port=9999

## Configure the Ops Agent for Kafka

Following the guide to Configure the Ops Agent, add the required elements to collect telemetry from Kafka instances, and restart the agent.

### Example configuration

The following commands create the configuration to collect and ingest telemetry for Kafka:

```
# Configures Ops Agent to collect telemetry from the app. You must restart the agent for the configuration to take effect.

set -e

# Check if the file exists
if [ ! -f /etc/google-cloud-ops-agent/config.yaml ]; then
  # Create the file if it doesn't exist.
  sudo mkdir -p /etc/google-cloud-ops-agent
  sudo touch /etc/google-cloud-ops-agent/config.yaml
fi

# Create a back up of the existing file so existing configurations are not lost.
sudo cp /etc/google-cloud-ops-agent/config.yaml /etc/google-cloud-ops-agent/config.yaml.bak

# Configure the Ops Agent.
sudo tee /etc/google-cloud-ops-agent/config.yaml > /dev/null << EOF
metrics:
  receivers:
    kafka:
      type: kafka
  service:
    pipelines:
      kafka:
        receivers:
          - kafka
logging:
  receivers:
    kafka:
      type: kafka
  service:
    pipelines:
      kafka:
        receivers:
          - kafka
EOF
```

For these changes to take effect, you must restart the Ops Agent:

### Linux

1.  To restart the agent, run the following command on your instance:
    
    sudo systemctl restart google-cloud-ops-agent
    
2.  To confirm that the agent restarted, run the following command and verify that the components "Metrics Agent" and "Logging Agent" started:
    
    sudo systemctl status "google-cloud-ops-agent*"
    

### Windows

1.  Connect to your instance using RDP or a similar tool and login to Windows.
2.  Open a PowerShell terminal with administrator privileges by right-clicking the PowerShell icon and selecting **Run as Administrator**
3.  To restart the agent, run the following PowerShell command:
    
    Restart-Service google-cloud-ops-agent -Force
    
4.  To confirm that the agent restarted, run the following command and verify that the components "Metrics Agent" and "Logging Agent" started:
    
    Get-Service google-cloud-ops-agent*
    

### Configure logs collection

To ingest logs from Kafka, you must create a receiver for the logs that Kafka produces and then create a pipeline for the new receiver.

To configure a receiver for your `kafka` logs, specify the following fields:

Field

Default

Description

`exclude_paths`

A list of filesystem path patterns to exclude from the set matched by `include_paths`.

`include_paths`

`[/var/log/kafka/*.log]`

A list of filesystem paths to read by tailing each file. A wild card (`*`) can be used in the paths; for example, `/var/log/kafka*/*.log`.

`record_log_file_path`

`false`

If set to `true`, then the path to the specific file from which the log record was obtained appears in the output log entry as the value of the `agent.googleapis.com/log_file_path` label. When using a wildcard, only the path of the file from which the record was obtained is recorded.

`type`

This value must be `kafka`.

`wildcard_refresh_interval`

`60s`

The interval at which wildcard file paths in `include_paths` are refreshed. Given as a time duration, for example `30s` or `2m`. This property might be useful under high logging throughputs where log files are rotated faster than the default interval.

#### What is logged

The `logName` is derived from the receiver IDs specified in the configuration. Detailed fields inside the `LogEntry` are as follows.

The `kafka` logs contain the following fields in the `LogEntry`:

Field

Type

Description

`jsonPayload.level`

string

Log entry level

`jsonPayload.logger`

string

Name of the logger where the log originated.

`jsonPayload.message`

string

Log message, including detailed stacktrace where provided

`jsonPayload.source`

string

Module and/or thread where the log originated.

`severity`

string (`LogSeverity`)

Log entry level (translated).

### Configure metrics collection

To ingest metrics from Kafka, you must create a receiver for the metrics that Kafka produces and then create a pipeline for the new receiver.

This receiver does not support the use of multiple instances in the configuration, for example, to monitor multiple endpoints. All such instances write to the same time series, and Cloud Monitoring has no way to distinguish among them.

To configure a receiver for your `kafka` metrics, specify the following fields:

Field

Default

Description

`collect_jvm_metrics`

`true`

Configures the receiver to also collect the supported JVM metrics.

`collection_interval`

`60s`

A time duration value, such as `30s` or `5m`.

`password`

The configured password if JMX is configured to require authentication.

`stub_status_url`

`localhost:9999`

The JMX Service URL or host and port used to construct the service URL. This value must be in the form of `service:jmx:<protocol>:<sap>` or `host:port`. Values in `host:port` form are used to create a service URL of `service:jmx:rmi:///jndi/rmi://<host>:<port>/jmxrmi`.

`type`

This value must be `kafka`.

`username`

The configured username if JMX is configured to require authentication.

#### What is monitored

The following table provides the list of metrics that the Ops Agent collects from the Kafka instance.

Metric type 

Kind, Type  
Monitored resources

Labels

`workload.googleapis.com/kafka.isr.operation.count`

`CUMULATIVE`, `INT64`  
**gce_instance**

`operation`

`workload.googleapis.com/kafka.message.count`

`CUMULATIVE`, `INT64`  
**gce_instance**

 

`workload.googleapis.com/kafka.network.io`

`CUMULATIVE`, `INT64`  
**gce_instance**

`state`

`workload.googleapis.com/kafka.partition.count`

`GAUGE`, `INT64`  
**gce_instance**

 

`workload.googleapis.com/kafka.partition.offline`

`GAUGE`, `INT64`  
**gce_instance**

 

`workload.googleapis.com/kafka.partition.under_replicated`

`GAUGE`, `INT64`  
**gce_instance**

 

`workload.googleapis.com/kafka.purgatory.size`

`GAUGE`, `INT64`  
**gce_instance**

`type`

`workload.googleapis.com/kafka.request.count`

`CUMULATIVE`, `INT64`  
**gce_instance**

`type`

`workload.googleapis.com/kafka.request.failed`

`CUMULATIVE`, `INT64`  
**gce_instance**

`type`

`workload.googleapis.com/kafka.request.time.total`

`CUMULATIVE`, `INT64`  
**gce_instance**

`type`

## Verify the configuration

This section describes how to verify that you correctly configured the Kafka receiver. It might take one or two minutes for the Ops Agent to begin collecting telemetry.

To verify that Kafka logs are being sent to Cloud Logging, do the following:

1.  In the Google Cloud console, go to the segment **Logs Explorer** page:
    
    Go to **Logs Explorer**
    
    If you use the search bar to find this page, then select the result whose subheading is **Logging**.
    
2.  Enter the following query in the editor, and then click **Run query**:  
    
    resource.type="gce_instance"
    log_id("kafka")
    

To verify that Kafka metrics are being sent to Cloud Monitoring, do the following:

1.  In the Google Cloud console, go to the _leaderboard_ **Metrics explorer** page:
    
    Go to **Metrics explorer**
    
    If you use the search bar to find this page, then select the result whose subheading is **Monitoring**.
    
2.  In the toolbar of the query-builder pane, select the button whose name is _code_ **PromQL**.
3.  Enter the following query in the editor, and then click **Run query**:  
    
    {"workload.googleapis.com/kafka.message.count", monitored_resource="gce_instance"}
    

## View dashboard

To view your Kafka metrics, you must have a chart or dashboard configured. The Kafka integration includes one or more dashboards for you. Any dashboards are automatically installed after you configure the integration and the Ops Agent has begun collecting metric data.

You can also view static previews of dashboards without installing the integration.

To view an installed dashboard, do the following:

1.  In the Google Cloud console, go to the dashboard **Dashboards** page:
    
    Go to **Dashboards**
    
    If you use the search bar to find this page, then select the result whose subheading is **Monitoring**.
    
2.  Select the **Dashboard List** tab, and then choose the **Integrations** category.
3.  Click the name of the dashboard you want to view.

If you have configured an integration but the dashboard has not been installed, then check that the Ops Agent is running. When there is no metric data for a chart in the dashboard, installation of the dashboard fails. After the Ops Agent begins collecting metrics, the dashboard is installed for you.

To view a static preview of the dashboard, do the following:

1.  In the Google Cloud console, go to the ![](/static/monitoring/images/integrations-icon.png) **Integrations** page:
    
    Go to **Integrations**
    
    If you use the search bar to find this page, then select the result whose subheading is **Monitoring**.
    
2.  Click the **Compute Engine** deployment-platform filter.
3.  Locate the entry for Kafka and click **View Details**.
4.  Select the **Dashboards** tab to see a static preview. If the dashboard is installed, then you can navigate to it by clicking **View dashboard**.

For more information about dashboards in Cloud Monitoring, see Dashboards and charts.

For more information about using the **Integrations** page, see Manage integrations.

## Install alerting policies

Alerting policies instruct Cloud Monitoring to notify you when specified conditions occur. The Kafka integration includes one or more alerting policies for you to use. You can view and install these alerting policies from the **Integrations** page in Monitoring.

To view the descriptions of available alerting policies and install them, do the following:

1.  In the Google Cloud console, go to the ![](/static/monitoring/images/integrations-icon.png) **Integrations** page:
    
    Go to **Integrations**
    
    If you use the search bar to find this page, then select the result whose subheading is **Monitoring**.
    
2.  Locate the entry for Kafka and click **View Details**.
3.  Select the **Alerts** tab. This tab provides descriptions of available alerting policies and provides an interface for installing them.
4.  Install alerting policies. Alerting policies need to know where to send notifications that the alert has been triggered, so they require information from you for installation. To install alerting policies, do the following:
    1.  From the list of available alerting policies, select those that you want to install.
    2.  In the **Configure notifications** section, select one or more notification channels. You have the option to disable the use of notification channels, but if you do, then your alerting policies fire silently. You can check their status in Monitoring, but you receive no notifications.
        
        For more information about notification channels, see Manage notification channels.
        
    3.  Click **Create Policies**.

For more information about alerting policies in Cloud Monitoring, see Introduction to alerting.

For more information about using the **Integrations** page, see Manage integrations.

## What's next

For a walkthrough on how to use Ansible to install the Ops Agent, configure a third-party application, and install a sample dashboard, see the Install the Ops Agent to troubleshoot third-party applications video.

Send feedback