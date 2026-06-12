# Structured logging

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Observability
*   Cloud Logging
*   Guides

Send feedback

# Structured logging Stay organized with collections Save and categorize content based on your preferences.

This document discusses the concept of structured logging and the methods for adding structure to log entry payload fields. When the log payload is formatted as a JSON object and that object is stored in the `jsonPayload` field, the log entry is called a _structured log_. For these logs, you can construct queries that search specific JSON paths and you can index specific fields in the log payload. In contrast, when the log payload is formatted as a string and stored in the `textPayload` field, the log entry is _unstructured_. You can search the text field, but you can't index its content.

To create structured log entries, do any of the following:

*   Call the `entries.write` API method and supply a fully formatted `LogEntry`.
*   Use the `gcloud logging write` command.

*   Use a Cloud Logging client library which writes structured logs.

*   Use the BindPlane service.

*   Use an agent to write logs:
    
    **Note:** We recommend that you use an agent to write logs, when that option is available. To write structured logs, configure your application to write serialized JSON objects. For a list of logging frameworks, see Recommended logging frameworks.
    
    *   Some Google Cloud services contain an integrated logging agent that sends the data written to `stdout` or `stderr` as logs to Cloud Logging. You can use this approach for Google Cloud services such as Google Kubernetes Engine, App Engine flexible environment, and Cloud Run functions.
        
    *   For Compute Engine virtual machines (VMs), you can install and configure the Ops Agent or the legacy Logging agent, and then use the installed agent to send logs to Cloud Logging.
        

For more information about these approaches, see the following sections.

## Write logs by using client libraries or the API

You can write log data by using the Cloud Logging client libraries, which call the Cloud Logging API, or by directly calling the Cloud Logging API. Client libraries can simplify population of the special JSON fields by automatically capturing some information and by providing interfaces to appropriately populate the fields. However, for full control over the structure of your payloads, directly call the Cloud Logging API and pass the full `LogEntry` structure to the Cloud Logging API.

For more information, see the `entries.write` reference.

For code examples, see Writing structured logs.

## Write logs by using the gcloud CLI

You can write log data by using the gcloud CLI. The interface supports unstructured logs and structured logs. When you want to write a structured log, provide the command a serialized JSON object.

For a quickstart, see Write and query log entries with the Google Cloud CLI.

For code examples, see the `gcloud logging write` reference.

## Write logs by using BindPlane

You can use the BindPlane service to send logs to Logging. For these logs, the payloads are in JSON format and are structured according to the source system. For information on finding and viewing logs ingested by using BindPlane, see the BindPlane Quickstart Guide.

## Write logs by using an agent

**Note:** The content of this section only applies to Compute Engine VM. This section doesn't apply if you are using other services such as Google Kubernetes Engine, App Engine flexible environment, and Cloud Run functions.

To get logs from your Compute Engine instances, you can use the Ops Agent or the legacy Cloud Logging agent. Both agents can collect metrics from third-party applications, and both provide support for structured logging:

*   The Ops Agent is the recommended agent for collecting telemetry from your Compute Engine instances. This agent combines logging and metrics into a single agent, provides a YAML-based configuration, and features high-throughput logging.
    
    For information about how to configure the Ops Agent to support structured logging or to customize the form of a structured log, see Configure the Ops Agent.
    
*   The legacy Cloud Logging agent collects logs. This agent doesn't collect other forms of telemetry.
    

The remainder of this section is specific to the legacy Logging agent.

### Logging agent: special JSON fields

Some fields in the JSON object are recognized as special by the legacy Logging agent and extracted into the `LogEntry` structure. These special JSON fields can be used to set the following fields in the `LogEntry`:

*   `severity`
*   `spanId`
*   `labels` defined by the user
*   `httpRequest`

Because JSON is more precise and versatile than text lines, you can use JSON objects to write multiline messages and add metadata.

To create structured log entries for your applications using the simplified format, see the following table, which lists the fields and their values in JSON:

**Note:** Each field is optional.

JSON log field

`LogEntry` field

Cloud Logging agent function

Example value

`severity`

`severity`

The Logging agent attempts to match a variety of common severity strings, which includes the list of LogSeverity strings recognized by the Logging API.

`"severity":"ERROR"`

`message`

`textPayload` (or part of `jsonPayload`)

The message that appears on the log entry line in the Logs Explorer.

`"message":"There was an error in the application."`  
  
**Note**: `message` is saved as `textPayload` if it is the only field remaining after the Logging agent moves the other special-purpose fields _and_ `detect_json` wasn't enabled; otherwise `message` remains in `jsonPayload`. `detect_json` is not applicable to managed logging environments like Google Kubernetes Engine. If your log entry contains an exception stack trace, the exception stack trace should be set in this `message` JSON log field, so that the exception stack trace can be parsed and saved to Error Reporting.

`log` (legacy Google Kubernetes Engine only)

`textPayload`

Only applies to legacy Google Kubernetes Engine: if, after moving special purpose fields, only a `log` field remains, then that field is saved as `textPayload`.

`httpRequest`

`httpRequest`

A structured record in the format of the `LogEntry` `HttpRequest` field.

`"httpRequest":{"requestMethod":"GET"}`

time-related fields

`timestamp`

For more information, see Time-related fields.

`"time":"2020-10-12T07:20:50.52Z"`

`logging.googleapis.com/insertId`

`insertId`

For more information, see `insertId` on the `LogEntry` page.

`"logging.googleapis.com/insertId":"42"`

`logging.googleapis.com/labels`

`labels`

The value of this field must be a structured record. For more information, see `labels` on the `LogEntry` page.

`"logging.googleapis.com/labels":` `{"user_label_1":"value_1","user_label_2":"value_2"}`

`logging.googleapis.com/operation`

`operation`

The value of this field is also used by the Logs Explorer to group related log entries. For more information, see `operation` on the `LogEntry` page.

`"logging.googleapis.com/operation":` `{"id":"get_data","producer":"github.com/MyProject/MyApplication",` `"first":"true"}`

`logging.googleapis.com/sourceLocation`

`sourceLocation`

Source code location information associated with the log entry, if any. For more information, see `LogEntrySourceLocation` on the `LogEntry` page.

`"logging.googleapis.com/sourceLocation":` `{"file":"get_data.py","line":"142","function":"getData"}`

`logging.googleapis.com/spanId`

`spanId`

The span ID within the trace associated with the log entry. For more information, see `spanId` on the `LogEntry` page.

`"logging.googleapis.com/spanId":"000000000000004a"`

`logging.googleapis.com/trace`

`trace`

Resource name of the trace associated with the log entry if any. For more information, see `trace` on the `LogEntry` page.

`"logging.googleapis.com/trace":"projects/my-projectid/traces/0679686673a"`  
  
**Note**: If not writing to `stdout` or `stderr`, the value of this field should be formatted as `projects/[PROJECT-ID]/traces/[TRACE-ID]`, so it can be used by the Logs Explorer and the Trace Viewer to group log entries and display them in line with traces. If `autoformat_stackdriver_trace` is true and `[V]` matches the format of ResourceTrace `traceId` the LogEntry `trace` field has the value `projects/[PROJECT-ID]/traces/[V]`.

`logging.googleapis.com/trace_sampled`

`traceSampled`

The value of this field must be either `true` or `false`. For more information, see `traceSampled` on the `LogEntry` page.

`"logging.googleapis.com/trace_sampled": false`

To create log entries in the simplified format, create a JSON representation of the entry using the fields. All of the fields are optional.

The following is an example of a simplified JSON log entry:

{
  "severity":**"ERROR"**,
  "message":**"There was an error in the application."**,
  "httpRequest":{
    "requestMethod":**"GET"**
  },
  "time":**"2020-10-12T07:20:50.52Z"**,
  "logging.googleapis.com/insertId":**"42"**,
  "logging.googleapis.com/labels":{
    "user_label_1":**"value_1"**,
    "user_label_2":**"value_2"**
  },
  "logging.googleapis.com/operation":{
    "id":**"get_data"**,
    "producer":**"github.com/MyProject/MyApplication"**,
    "first":**"true"**
  },
  "logging.googleapis.com/sourceLocation":{
    "file":**"get_data.py"**,
    "line":**"142"**,
    "function":**"getData"**
  },
  "logging.googleapis.com/spanId":**"000000000000004a"**,
  "logging.googleapis.com/trace":**"projects/my-projectid/traces/06796866738c859f2f19b7cfb3214824"**,
  "logging.googleapis.com/trace_sampled":**false**
}

The following is an example of the resulting log entry:

{
  **"insertId": "42"**,
  "jsonPayload": {
    **"message": "There was an error in the application"**,
    **"time": "2020-10-12T07:20:50.52Z"**
  },
  **"httpRequest": {
    "requestMethod": "GET"**
  },
  "resource": {
    "type": "k8s_container",
    "labels": {
      "container_name": "hello-app",
      "pod_name": "helloworld-gke-6cfd6f4599-9wff8",
      "project_id": "stackdriver-sandbox-92334288",
      "namespace_name": "default",
      "location": "us-west4",
      "cluster_name": "helloworld-gke"
    }
  },
  "timestamp": "2020-10-12T07:20:50.52Z",
  **"severity": "ERROR"**,
  **"labels": {
    "user_label_2": "value_2",
    "user_label_1": "value_1"**
  },
  "logName": "projects/stackdriver-sandbox-92334288/logs/stdout",
  **"operation": {
    "id": "get_data",
    "producer": "github.com/MyProject/MyApplication",
    "first": true**
  },
  **"trace": "projects/my-projectid/traces/06796866738c859f2f19b7cfb3214824"**,
  **"sourceLocation": {
    "file": "get_data.py",
    "line": "142",
    "function": "getData"**
  },
  "receiveTimestamp": "2020-10-12T07:20:57.52Z",
  **"spanId": "000000000000004a"**
}

### Logging agent: configuration

The legacy Logging agent, `google-fluentd`, is a Cloud Logging-specific packaging of the Fluentd log data collector. The Logging agent comes with the default Fluentd configuration and uses Fluentd input plugins to pull event logs from external sources such as files on disk, or to parse incoming log records.

Fluentd has a list of supported parsers that extract logs and convert them into structured (JSON) payloads.

By configuring a log source with `format [PARSER_NAME]`, you can build on the built-in parsers provided by Fluentd. For information about configuring the legacy Logging agent, see Configure the Logging agent.

The following code samples show the Fluentd configuration, the input log record, and the output structured payload, which is part of a Cloud Logging log entry:

*   Fluentd configuration:
    
      ```
      <source>
        @type tail
    
        format syslog # This uses a predefined log format regex named
                      # `syslog`. See details at https://docs.fluentd.org/parser/syslog.
    
        path /var/log/syslog
        pos_file /var/lib/google-fluentd/pos/syslog.pos
        read_from_head true
        tag syslog
      </source>
    ```
    
*   Log record (input):
    
      ```
      <6>Feb 28 12:00:00 192.168.0.1 fluentd[11111]: [error] Syslog test
    ```
    
*   Structured payload (output):
    
      ```
      jsonPayload: {
          "pri": "6",
          "host": "192.168.0.1",
          "ident": "fluentd",
          "pid": "11111",
          "message": "[error] Syslog test"
      }
    ```
    

For more information about how the `syslog` parser works, see the detailed Fluentd documentation.

### Logging agent: standard parsers enabled by default

The following table includes the standard parsers that are included in the agent if you enable structured logging:

Parser Name

Configuration file

`syslog`

`/etc/google-fluentd/config.d/syslog.conf`

`nginx`

`/etc/google-fluentd/config.d/nginx.conf`

`apache2`

`/etc/google-fluentd/config.d/apache.conf`

`apache_error`

`/etc/google-fluentd/config.d/apache.conf`

For instructions on enabling structured logging when installing the legacy Logging agent, see the Installation section.

### Logging agent: installation

To enable structured logging, you must change the default configuration of the legacy Logging agent when installing or reinstalling it. Enabling structured logging replaces the previously listed configuration files but doesn't change the operation of the agent itself.

When you enable structured logging, the listed logs are converted to log entries with different formats than they had before you enabled structured logs. If the logs are being routed to destinations outside of Logging, the change could affect any post-processing applications. For example, if routing logs to BigQuery, BigQuery rejects the new log entries for the remainder of the day as having an incorrect schema.

For instructions on installing the legacy Logging agent and enabling structured logging, refer to Installing the Logging agent.

You can find the legacy Logging agent configuration files at `/etc/google-fluentd/config.d/`, which should now include the Standard parsers enabled by default.

### Logging agent: configure Apache access log format

By default, the legacy Logging agent stores Apache access log data in the `jsonPayload` field. For example:

```
{
  "logName": ...,
  "resource": ...,
  "httpRequest": ...,
  "jsonPayload": {
    "user"   : "some-user",
    "method" : "GET",
    "code"   : 200,
    "size"   : 777,
    "host"   : "192.168.0.1",
    "path"   : "/some-path",
    "referer": "some-referer",
    "agent"  : "Opera/12.0"
  },
  ...
}
```

Alternatively, you can configure the legacy Logging agent to extract certain fields to the `httpRequest` field. For example:

```
{
  "logName": ...,
  "resource": ...,
  "httpRequest": {
    "requestMethod": "GET",
    "requestUrl": "/some-path",
    "requestSize": "777",
    "status": "200",
    "userAgent": "Opera/12.0",
    "serverIp": "192.168.0.1",
    "referrer":"some-referrer",
  },
  "jsonPayload": {
    "user":"some-user"
  },
  ...
}
```

Configuring the `httpRequest` field, as shown in the prior sample, assists tracing: the Google Cloud console presents all logs for a given HTTP request in a parent-child hierarchy.

To configure this extraction, add the following to the end of your `/etc/google-fluentd/config.d/apache.conf`:

```
<filter apache-access>
  @type record_transformer
  enable_ruby true
  <record>
    httpRequest ${ {"requestMethod" => record['method'], "requestUrl" => record['path'], "requestSize" => record['size'], "status" => record['code'], "userAgent" => record['agent'], "serverIp" => record['host'],
    "referer" => record['referer']} }
  </record>
  remove_keys method, path, size, code, agent, host, referer
</filter>
```

For more details on how to configure your log entries, see Modifying log records.

### Logging agent: configure nginx access log format

By default, the legacy Logging agent stores nginx access log data in the `jsonPayload` field. For example:

```
{
  "logName": ...,
  "resource": ...,
  "httpRequest": ...,
  "jsonPayload": {
    "remote":"127.0.0.1",
    "host":"192.168.0.1",
    "user":"some-user",
    "method":"GET",
    "path":"/some-path",
    "code":"200",
    "size":"777",
    "referrer":"some-referrer",
    "agent":"Opera/12.0",
    "http_x_forwarded_for":"192.168.3.3"
  },
  ...
}
```

Alternatively, you can configure the legacy Logging agent to extract certain fields to the `httpRequest` field. For example:

```
{
  "logName": ...,
  "resource": ...,
  "httpRequest": {
    "requestMethod": "GET",
    "requestUrl": "/some-path",
    "requestSize": "777",
    "status": "200",
    "userAgent": "Opera/12.0",
    "remoteIp": "127.0.0.1",
    "serverIp": "192.168.0.1",
    "referrer":"some-referrer",
  },
  "jsonPayload": {
    "user":"some-user",
    "http_x_forwarded_for":"192.168.3.3"
  },
  ...
}
```

Configuring the `httpRequest` field, as shown in the prior sample, assists tracing: the Google Cloud console presents all logs for a given HTTP request in a parent-child hierarchy.

To configure this extraction, add the following to the end of your `/etc/google-fluentd/config.d/nginx.conf`:

```
<filter nginx-access>
  @type record_transformer
  enable_ruby true
  <record>
    httpRequest ${ {"requestMethod" => record['method'], "requestUrl" => record['path'], "requestSize" => record['size'], "status" => record['code'], "userAgent" => record['agent'], "remoteIp" => record['remote'], "serverIp" => record['host'], "referer" => record['referer']} }
  </record>
  remove_keys method, path, size, code, agent, remote, host, referer
</filter>
```

For more details on how to configure your log entries, see Modifying log records.

## Write your own parser

If your logs aren't supported by the standard parsers, you can write your own parser. Parsers consist of a regular expression that is used to match log records and apply labels to the pieces.

The following code examples show a log line in the log record, a configuration with a regular expression that indicates the format of the log line, and the stored log entry:

*   A log line in the log record:
    
    ```
    REPAIR CAR $500
    ```
    
*   A configuration with a regular expression that indicates the format of the log line:
    
    ```
    $ sudo vim /etc/google-fluentd/config.d/test-structured-log.conf
    $ cat /etc/google-fluentd/config.d/test-structured-log.conf
    <source>
      @type tail
    
      # Format indicates the log should be translated from text to
      # structured (JSON) with three fields, "action", "thing" and "cost",
      # using the following regex:
      format /(?<action>\w+) (?<thing>\w+) \$(?<cost>\d+)/
      # The path of the log file.
      path /tmp/test-structured-log.log
      # The path of the position file that records where in the log file
      # we have processed already. This is useful when the agent
      # restarts.
      pos_file /var/lib/google-fluentd/pos/test-structured-log.pos
      read_from_head true
      # The log tag for this log input.
      tag structured-log
    </source>
    ```
    
*   The resulting log entry:
    
    ```
    {
    insertId:  "eps2n7g1hq99qp"
    jsonPayload: {
      "action": "REPAIR"
      "thing": "CAR"
      "cost": "500"
    }
    labels: {
      compute.googleapis.com/resource_name:  "add-structured-log-resource"
    }
    logName:  "projects/my-sample-project-12345/logs/structured-log"
    receiveTimestamp:  "2023-03-21T01:47:11.475065313Z"
    resource: {
      labels: {
        instance_id:  "3914079432219560274"
        project_id:  "my-sample-project-12345"
        zone:  "us-central1-c"
      }
      type:  "gce_instance"
    }
    timestamp:  "2023-03-21T01:47:05.051902169Z"
    }
    ```
    

## Troubleshoot issues

To troubleshoot common issues found with installing or interacting with the legacy Logging agent, see Troubleshooting the agent.

## What's next

*   To query and view log entries, see View logs by using the Logs Explorer.
    
*   To read log entries using the Google Cloud CLI, see Reading log entries.
    
*   To read log entries using the Logging API, see the `entries.list` method.
    

Send feedback