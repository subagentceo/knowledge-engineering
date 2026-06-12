# Migrating from activity logs to audit logs

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Guides

Send feedback

# Migrating from activity logs to audit logs Stay organized with collections Save and categorize content based on your preferences.

If you use activity logs to view Compute Engine admin activity and system events, read this guide to understand how to find similar log entries using audit logs instead.

Compute Engine activity logs are deprecated. You can identify activity log entries based on their log name:

logName: "projects/PROJECT_ID/logs/compute.googleapis.com%2Factivity_log"

Compute Engine audit logs contain the same information that is available through activity logs, and more. But audit logs present the information differently compared to activity logs. So you'll need to adjust your queries.

## How to migrate from activity logs to audit logs

To use audit logs instead of activity logs, adjust your queries. Use the following steps.

1.  Find your old queries. For example, you might have saved them in a saved search in the Logs Explorer or created a script using the API or SDK. For more information about how you can monitor your resources, see the Logging documentation.
    
2.  Replace the activity log fields with appropriate audit log fields. Refer to the table to see how the fields map to each other.
    
    For example, if your legacy activity log query looked for a field named `jsonPayload.resource.name`, your new audit log query should look for `protoPayload.resourceName` instead.
    
3.  Save and use your new audit log query. For example, create a saved search in Cloud Logging or update your scripts.
    

### Examples

Here are some examples of converted queries:

**Querying for activity related to a specific resource**

Query example

Legacy activity log

`gcloud logging read jsonPayload.resource.name="VM_NAME"`

Audit log

Use one of the following options

1.  `gcloud logging read protoPayload.resourceName:"VM_NAME"`
2.  `gcloud logging read protoPayload.resourceName="projects/PROJECT_ID/zones/ZONE/instances/VM_NAME"`

With option 1, the "has" (`:`) operator matches all resources in your project that have a name that includes `VM_NAME`. With option 2, the "equals" operator (`=`) matches only on a specific fully qualified resource with that name.

**Querying for recent admin activity log entries**

Query example

Legacy activity log

`gcloud logging read logName="projects/PROJECT_ID/logs/compute.googleapis.com%2Factivity_log"`

Audit log

`gcloud logging read logName="projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Factivity"`

**Querying for recent instance creation log entries**

Query example

Legacy activity log

`gcloud logging read 'logName="projects/PROJECT_ID/logs/compute.googleapis.com%2Factivity_log" AND jsonPayload.event_subtype="compute.instances.insert"'`

Audit log

`gcloud logging read 'logName="projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Factivity" AND protoPayload.methodName:"compute.instances.insert"'`

**Querying for the start of all instance creation operations**

Query example

Legacy activity log

`gcloud logging read 'jsonPayload.event_type="GCE_API_CALL" AND jsonPayload.event_subtype="compute.instances.insert"'`

Audit log

`gcloud logging read 'operation.first="true" AND protoPayload.methodName:"compute.instances.insert"'`

**Querying for the completion of any operation**

Query example

Legacy activity log

`gcloud logging read jsonPayload.event_type="GCE_OPERATION_DONE"`

Audit log

`gcloud logging read operation.last="true"`

## Differences between activity logs and audit logs

Read this section to learn how audit logs are structured differently from activity logs. Keep these differences in mind as you convert legacy activity log queries into audit log queries. For example, in your queries, replace all legacy activity log field names with the corresponding audit log field names.

While audit logging and activity logging both return log entry objects, they have the following differences:

*   Different field names. See the field name mapping table for details.
*   Different field values, including:
    *   Different log names: Audit logs have log names that contain `cloudaudit.googleapis.com`.
    *   Different payloads: Audit logs return a `protoPayload` field instead of a `jsonPayload`.
    *   Fully qualified resource names: Audit logs return resource names that include their path, for example: `projects/my-project/zones/us-east1-b/instances/my-instance-name`.
    *   Versioned method names: Audit logs return method names that include their version, for example, `v1`.

Here is an example that shows differences in log names and payloads:

Log entry example

Legacy activity log

{
  insertId:  "1x3bbhjg2wwvz1x"
  jsonPayload: {
    event_subtype: "compute.instances.stop"
    ...
    resource: {
      id: "12345678900123456789"
      name: "my-instance-name"
      type: "instance"
      zone: "us-east1-b"
    }
    ...
  }
  labels: {…}
  logName:  "projects/my-project/logs/compute.googleapis.com%2Factivity_log"
  receiveTimestamp:  "2019-08-26T12:22:44.602794616Z"
  ...
}

Audit log

{
  insertId:  "-w6o499e22fwk"
  logName:  "projects/my-project/logs/cloudaudit.googleapis.com%2Factivity"
  protoPayload: {
    ...
    methodName: "beta.compute.instances.stop"
    ...
    resourceName: "projects/my-project/zones/us-east1-b/instances/my-instance-name"
  }
  receiveTimestamp:  "2019-08-26T12:22:46.881198276Z"
  ...
}

## Mapping fields from activity logs to audit logs

Use the following tables to map activity log fields to corresponding audit log fields in your queries.

### Fields

Use the following table to replace legacy activity log fields with audit log fields in your updated queries.

For example, if your legacy activity log query contained a filter based on `jsonPayload.resource.type`, your new audit log query should filter on `resource.type` instead.

Legacy activity log field

Audit log field

`insertId`

`insertId`

`jsonPayload.actor.user`

`protoPayload.authenticationInfo.principalEmail`

`jsonPayload.event_subtype`

`protoPayload.methodName`

`jsonPayload.event_timestamp_us`

`timestamp`

`jsonPayload.event_type="GCE_API_CALL"`

`operation.first="true"`

`jsonPayload.event_type="GCE_OPERATION_DONE"`

`operation.last="true"`

`jsonPayload.request`

`protoPayload.request`

`jsonPayload.operation`

`operation`

`jsonPayload.resource.id`

`resource.labels.instance_id`

`jsonPayload.resource.name`

`protoPayload.resourceName`

`jsonPayload.resource.type`

`resource.type`

`jsonPayload.resource.zone`

`resource.labels.zone`

`jsonPayload.trace_id`

`operation.id`

`jsonPayload.user_agent`

`protoPayload.requestMetadata.callerSuppliedUserAgent`

`labels.compute.googleapis.com/resource_id`

`resource.labels.[RESOURCE_TYPE]_id`

`labels.compute.googleapis.com/resource_name`

`protoPayload.resourceName`

`labels.compute.googleapis.com/resource_type`

`resource.type`

`labels.compute.googleapis.com/resource_zone`

One of:

*   `resource.labels.zone`
*   `resource.labels.region`
*   `resource.labels.location`

`logName`

`logName`

`receiveTimestamp`

`receiveTimestamp`

`resource.labels`

`resource.labels`

`severity`

`severity`

`timestamp`

`timestamp`

### Field values

Use the following tables to map legacy activity log field values to audit log field values. Compared to activity logs, audit logs have multiple log name values and different payload values. Audit log entries also return fully qualified resource names and versioned method names.

#### Log names

To find an audit log entry, look for a `logName` that includes `cloudaudit.googleapis.com`.

Log name

Log contents

Legacy activity log

`projects/PROJECT_ID/logs/compute.googleapis.com%2Factivity_log`

Admin activity and system events

Audit log

`projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Factivity`

Admin activity

`projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fsystem_event`

System events

`projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fdata_access`

Data access

#### Payloads

In each audit log entry, look for a `protoPayload` instead of a `jsonPayload`.

Payload type

Payload example

Legacy activity log

`jsonPayload`

    jsonPayload: {
      actor: {…}
      **event_subtype:  "compute.instances.start"**
      event_timestamp_us:  "1566404493487248"
      event_type:  "GCE_API_CALL"
      ip_address:  ""
      operation: {…}
      request: {…}
      resource: {…}
      trace_id:  "operation-1566404491560-590a2f74b4705-a1ae0686-d896d772"
      user_agent:  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36"
      version:  "1.2"
    }

Audit log

`protoPayload`

    protoPayload: {
      @type:  "type.googleapis.com/google.cloud.audit.AuditLog"
      authenticationInfo: {…}
      **methodName:  "v1.compute.instances.start"**
      request: {…}
      requestMetadata: {…}
      resourceName:  "projects/my-project/zones/us-central1-a/instances/alert"
      serviceName:  "compute.googleapis.com"
    }

To learn how these payloads relate to each other, and how to map legacy activity log fields to audit log fields, read log entry field mappings.

#### Resource names

In audit logs, API resource names (in the `protoPayload.resourceName` field) are fully qualified, for example:

resourceName: "projects/PROJECT_ID/zones/ZONE/instances/VM_NAME"

You can still use partial names but you must fix your query to use the "has" operator (`:`) instead of the "equals" operator.

Use one of the following options in your audit log queries to filter on a specific resource:

*   gcloud logging read protoPayload.resourceName:"VM_NAME"
    
*   gcloud logging read protoPayload.resourceName="projects/PROJECT_ID/zones/ZONE/instances/VM_NAME"
    

#### Method names

In audit logs, API method names (in the `protoPayload.methodName` field) are prefixed with their version, like: `v1.compute.instances.delete`.

Field

Value

Query example

Legacy activity log

jsonPayload.event_subtype

`RESOURCE.METHOD`

`jsonPayload.event_subtype=compute.instances.delete`

Audit log

protoPayload.methodName

`API_VERSION.RESOURCE.METHOD`

`protoPayload.methodName=v1.compute.instances.delete`  
or  
`protoPayload.methodName=beta.compute.instances.delete`  
or  
`protoPayload.methodName:compute.instances.delete`

You can still use unversioned method names in your audit log queries, but you must fix your query to use the "has" operator (`:`) instead of the "equals" operator (`=`). For example: `protoPayload.methodName:compute.instances.delete` returns all instance delete API calls, regardless of version. For more information about operators, see comparisions.

## What's next

*   Read the quick start for using logging tools.
*   Learn more about viewing log entries.
*   Learn about viewing logs with advanced logging filters.
*   Learn more about Compute Engine Cloud Audit Logs.

Send feedback