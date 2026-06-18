# MCP Tools Reference: cloud-sql

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   PostgreSQL
*   Reference

Send feedback

# MCP Tools Reference: cloud-sql Stay organized with collections Save and categorize content based on your preferences.

## Tool: get_operation

Get the status of a long-running operation. A long-running operation can take several minutes to complete. If an operation takes an extended amount of time, then use a command line tool to pause for 30 seconds before rechecking the status of the operation.

The following sample demonstrate how to use `curl` to invoke the `get_operation` MCP tool.

Curl Request

                  
curl --location 'https://sqladmin.googleapis.com/mcp' \
--header 'content-type: application/json' \
--header 'accept: application/json, text/event-stream' \
--data '{
  "method": "tools/call",
  "params": {
    "name": "get_operation",
    "arguments": {
      // provide these details according to the tool's MCP specification
    }
  },
  "jsonrpc": "2.0",
  "id": 1
}'
                

## Input Schema

Operations get request.

### SqlOperationsGetRequest

JSON representation

{
  "operation": string,
  "project": string
}

 

Fields

`operation`

`string`

Required. Instance operation ID.

`project`

`string`

Required. Project ID of the project that contains the instance.

## Output Schema

An Operation resource. For successful operations that return an Operation resource, only the fields relevant to the operation are populated in the resource.

### Operation

JSON representation

{
  "kind": string,
  "targetLink": string,
  "status": enum (`SqlOperationStatus`),
  "user": string,
  "insertTime": string,
  "startTime": string,
  "endTime": string,
  "error": {
    object (`OperationErrors`)
  },
  "apiWarning": {
    object (`ApiWarning`)
  },
  "operationType": enum (`SqlOperationType`),
  "importContext": {
    object (`ImportContext`)
  },
  "exportContext": {
    object (`ExportContext`)
  },
  "backupContext": {
    object (`BackupContext`)
  },
  "preCheckMajorVersionUpgradeContext": {
    object (`PreCheckMajorVersionUpgradeContext`)
  },
  "name": string,
  "targetId": string,
  "selfLink": string,
  "targetProject": string,
  "acquireSsrsLeaseContext": {
    object (`AcquireSsrsLeaseContext`)
  },
  "subOperationType": {
    object (`SqlSubOperationType`)
  }
}

 

Fields

`kind`

`string`

This is always `sql#operation`.

`targetLink`

`string`

`status`

``enum (`SqlOperationStatus`)``

The status of an operation.

`user`

`string`

The email address of the user who initiated this operation.

`insertTime`

``string (`Timestamp` format)``

The time this operation was enqueued in UTC timezone in RFC 3339 format, for example `2012-11-15T16:19:00.094Z`.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`startTime`

``string (`Timestamp` format)``

The time this operation actually started in UTC timezone in RFC 3339 format, for example `2012-11-15T16:19:00.094Z`.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`endTime`

``string (`Timestamp` format)``

The time this operation finished in UTC timezone in RFC 3339 format, for example `2012-11-15T16:19:00.094Z`.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`error`

``object (`OperationErrors`)``

If errors occurred during processing of this operation, this field will be populated.

`apiWarning`

``object (`ApiWarning`)``

An Admin API warning message.

`operationType`

``enum (`SqlOperationType`)``

The type of the operation. Valid values are: * `CREATE` * `DELETE` * `UPDATE` * `RESTART` * `IMPORT` * `EXPORT` * `BACKUP_VOLUME` * `RESTORE_VOLUME` * `CREATE_USER` * `DELETE_USER` * `CREATE_DATABASE` * `DELETE_DATABASE`

`importContext`

``object (`ImportContext`)``

The context for import operation, if applicable.

`exportContext`

``object (`ExportContext`)``

The context for export operation, if applicable.

`backupContext`

``object (`BackupContext`)``

The context for backup operation, if applicable.

`preCheckMajorVersionUpgradeContext`

``object (`PreCheckMajorVersionUpgradeContext`)``

This field is only populated when the operation_type is PRE_CHECK_MAJOR_VERSION_UPGRADE. The PreCheckMajorVersionUpgradeContext message itself contains the details for that pre-check, such as the target database version for the upgrade and the results of the check (including any warnings or errors found).

`name`

`string`

An identifier that uniquely identifies the operation. You can use this identifier to retrieve the Operations resource that has information about the operation.

`targetId`

`string`

Name of the resource on which this operation runs.

`selfLink`

`string`

The URI of this resource.

`targetProject`

`string`

The project ID of the target instance related to this operation.

`acquireSsrsLeaseContext`

``object (`AcquireSsrsLeaseContext`)``

The context for acquire SSRS lease operation, if applicable.

`subOperationType`

``object (`SqlSubOperationType`)``

Optional. The sub operation based on the operation type.

### Timestamp

JSON representation

{
  "seconds": string,
  "nanos": integer
}

 

Fields

`seconds`

`string (int64 format)`

Represents seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z. Must be between -62135596800 and 253402300799 inclusive (which corresponds to 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z).

`nanos`

`integer`

Non-negative fractions of a second at nanosecond resolution. This field is the nanosecond portion of the duration, not an alternative to seconds. Negative second values with fractions must still have non-negative nanos values that count forward in time. Must be between 0 and 999,999,999 inclusive.

### OperationErrors

JSON representation

{
  "kind": string,
  "errors": [
    {
      object (`OperationError`)
    }
  ]
}

 

Fields

`kind`

`string`

This is always `sql#operationErrors`.

`errors[]`

``object (`OperationError`)``

The list of errors encountered while processing this operation.

### OperationError

JSON representation

{
  "kind": string,
  "code": string,
  "message": string
}

 

Fields

`kind`

`string`

This is always `sql#operationError`.

`code`

`string`

Identifies the specific error that occurred.

`message`

`string`

Additional information about the error encountered.

### ApiWarning

JSON representation

{
  "code": enum (`SqlApiWarningCode`),
  "message": string,
  "region": string
}

 

Fields

`code`

``enum (`SqlApiWarningCode`)``

Code to uniquely identify the warning type.

`message`

`string`

The warning message.

`region`

`string`

The region name for REGION_UNREACHABLE warning.

### ImportContext

JSON representation

{
  "uri": string,
  "database": string,
  "kind": string,
  "fileType": enum (`SqlFileType`),
  "csvImportOptions": {
    object (`SqlCsvImportOptions`)
  },
  "importUser": string,
  "bakImportOptions": {
    object (`SqlBakImportOptions`)
  },
  "sqlImportOptions": {
    object (`SqlImportOptions`)
  },
  "tdeImportOptions": {
    object (`SqlTdeImportOptions`)
  }
}

 

Fields

`uri`

`string`

Path to the import file in Cloud Storage, in the form `gs://bucketName/fileName`. Compressed gzip files (.gz) are supported when `fileType` is `SQL`. The instance must have write permissions to the bucket and read access to the file.

`database`

`string`

The target database for the import. If `fileType` is `SQL`, this field is required only if the import file does not specify a database, and is overridden by any database specification in the import file. For entire instance parallel import operations, the database is overridden by the database name stored in subdirectory name. If `fileType` is `CSV`, one database must be specified.

`kind`

`string`

This is always `sql#importContext`.

`fileType`

``enum (`SqlFileType`)``

The file type for the specified uri.`SQL`: The file contains SQL statements. \`CSV`: The file contains CSV data.

`csvImportOptions`

``object (`SqlCsvImportOptions`)``

Options for importing data as CSV.

`importUser`

`string`

The PostgreSQL user for this import operation. PostgreSQL instances only.

`bakImportOptions`

``object (`SqlBakImportOptions`)``

Import parameters specific to SQL Server .BAK files

`sqlImportOptions`

``object (`SqlImportOptions`)``

Optional. Options for importing data from SQL statements.

`tdeImportOptions`

``object (`SqlTdeImportOptions`)``

Optional. Import parameters specific to SQL Server TDE certificates

### SqlCsvImportOptions

JSON representation

{
  "table": string,
  "columns": [
    string
  ],
  "escapeCharacter": string,
  "quoteCharacter": string,
  "fieldsTerminatedBy": string,
  "linesTerminatedBy": string
}

 

Fields

`table`

`string`

The table to which CSV data is imported.

`columns[]`

`string`

The columns to which CSV data is imported. If not specified, all columns of the database table are loaded with CSV data.

`escapeCharacter`

`string`

Specifies the character that should appear before a data character that needs to be escaped.

`quoteCharacter`

`string`

Specifies the quoting character to be used when a data value is quoted.

`fieldsTerminatedBy`

`string`

Specifies the character that separates columns within each row (line) of the file.

`linesTerminatedBy`

`string`

This is used to separate lines. If a line does not contain all fields, the rest of the columns are set to their default values.

### SqlBakImportOptions

JSON representation

{
  "encryptionOptions": {
    object (`EncryptionOptions`)
  },
  "striped": boolean,
  "noRecovery": boolean,
  "recoveryOnly": boolean,
  "bakType": enum (`BakType`),
  "stopAt": string,
  "stopAtMark": string
}

 

Fields

`encryptionOptions`

``object (`EncryptionOptions`)``

`striped`

`boolean`

Whether or not the backup set being restored is striped. Applies only to Cloud SQL for SQL Server.

`noRecovery`

`boolean`

Whether or not the backup importing will restore database with NORECOVERY option. Applies only to Cloud SQL for SQL Server.

`recoveryOnly`

`boolean`

Whether or not the backup importing request will just bring database online without downloading Bak content only one of "no_recovery" and "recovery_only" can be true otherwise error will return. Applies only to Cloud SQL for SQL Server.

`bakType`

``enum (`BakType`)``

Type of the bak content, FULL or DIFF

`stopAt`

``string (`Timestamp` format)``

Optional. The timestamp when the import should stop. This timestamp is in the RFC 3339 format (for example, `2023-10-01T16:19:00.094`). This field is equivalent to the STOPAT keyword and applies to Cloud SQL for SQL Server only.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`stopAtMark`

`string`

Optional. The marked transaction where the import should stop. This field is equivalent to the STOPATMARK keyword and applies to Cloud SQL for SQL Server only.

### EncryptionOptions

JSON representation

{
  "certPath": string,
  "pvkPath": string,
  "pvkPassword": string,
  "keepEncrypted": boolean
}

 

Fields

`certPath`

`string`

Path to the Certificate (.cer) in Cloud Storage, in the form `gs://bucketName/fileName`. The instance must have write permissions to the bucket and read access to the file.

`pvkPath`

`string`

Path to the Certificate Private Key (.pvk) in Cloud Storage, in the form `gs://bucketName/fileName`. The instance must have write permissions to the bucket and read access to the file.

`pvkPassword`

`string`

Password that encrypts the private key

`keepEncrypted`

`boolean`

Optional. Whether the imported file remains encrypted.

### BoolValue

JSON representation

{
  "value": boolean
}

 

Fields

`value`

`boolean`

The bool value.

### SqlImportOptions

JSON representation

{
  "threads": integer,
  "parallel": boolean,
  "postgresImportOptions": {
    object (`PostgresImportOptions`)
  }
}

 

Fields

`threads`

`integer`

Optional. The number of threads to use for parallel import.

`parallel`

`boolean`

Optional. Whether or not the import should be parallel.

`postgresImportOptions`

``object (`PostgresImportOptions`)``

Optional. Options for importing from a Cloud SQL for PostgreSQL instance.

### Int32Value

JSON representation

{
  "value": integer
}

 

Fields

`value`

`integer`

The int32 value.

### PostgresImportOptions

JSON representation

{
  "clean": boolean,
  "ifExists": boolean
}

 

Fields

`clean`

`boolean`

Optional. The --clean flag for the pg_restore utility. This flag applies only if you enabled Cloud SQL to import files in parallel.

`ifExists`

`boolean`

Optional. The --if-exists flag for the pg_restore utility. This flag applies only if you enabled Cloud SQL to import files in parallel.

### SqlTdeImportOptions

JSON representation

{
  "certificatePath": string,
  "privateKeyPath": string,
  "privateKeyPassword": string,
  "name": string
}

 

Fields

`certificatePath`

`string`

Required. Path to the TDE certificate public key in the form gs://bucketName/fileName. The instance must have read access to the file. Applicable only for SQL Server instances.

`privateKeyPath`

`string`

Required. Path to the TDE certificate private key in the form gs://bucketName/fileName. The instance must have read access to the file. Applicable only for SQL Server instances.

`privateKeyPassword`

`string`

Required. Password that encrypts the private key.

`name`

`string`

Required. Certificate name. Applicable only for SQL Server instances.

### ExportContext

JSON representation

{
  "uri": string,
  "databases": [
    string
  ],
  "kind": string,
  "sqlExportOptions": {
    object (`SqlExportOptions`)
  },
  "csvExportOptions": {
    object (`SqlCsvExportOptions`)
  },
  "fileType": enum (`SqlFileType`),
  "offload": boolean,
  "bakExportOptions": {
    object (`SqlBakExportOptions`)
  },
  "tdeExportOptions": {
    object (`SqlTdeExportOptions`)
  }
}

 

Fields

`uri`

`string`

The path to the file in Google Cloud Storage where the export will be stored. The URI is in the form `gs://bucketName/fileName`. If the file already exists, the request succeeds, but the operation fails. If `fileType` is `SQL` and the filename ends with .gz, the contents are compressed.

`databases[]`

`string`

Databases to be exported.  
`MySQL instances:` If `fileType` is `SQL` and no database is specified, all databases are exported, except for the `mysql` system database. If `fileType` is `CSV`, you can specify one database, either by using this property or by using the `csvExportOptions.selectQuery` property, which takes precedence over this property.  
`PostgreSQL instances:` If you don't specify a database by name, all user databases in the instance are exported. This excludes system databases and Cloud SQL databases used to manage internal operations. Exporting all user databases is only available for directory-formatted parallel export. If `fileType` is `CSV`, this database must match the one specified in the `csvExportOptions.selectQuery` property.  
`SQL Server instances:` You must specify one database to be exported, and the `fileType` must be `BAK`.

`kind`

`string`

This is always `sql#exportContext`.

`sqlExportOptions`

``object (`SqlExportOptions`)``

Options for exporting data as SQL statements.

`csvExportOptions`

``object (`SqlCsvExportOptions`)``

Options for exporting data as CSV. `MySQL` and `PostgreSQL` instances only.

`fileType`

``enum (`SqlFileType`)``

The file type for the specified uri.

`offload`

`boolean`

Whether to perform a serverless export.

`bakExportOptions`

``object (`SqlBakExportOptions`)``

Options for exporting data as BAK files.

`tdeExportOptions`

``object (`SqlTdeExportOptions`)``

Optional. Export parameters specific to SQL Server TDE certificates

### SqlExportOptions

JSON representation

{
  "tables": [
    string
  ],
  "schemaOnly": boolean,
  "mysqlExportOptions": {
    object (`MysqlExportOptions`)
  },
  "threads": integer,
  "parallel": boolean,
  "postgresExportOptions": {
    object (`PostgresExportOptions`)
  }
}

 

Fields

`tables[]`

`string`

Tables to export, or that were exported, from the specified database. If you specify tables, specify one and only one database. For PostgreSQL instances, you can specify only one table.

`schemaOnly`

`boolean`

Export only schemas.

`mysqlExportOptions`

``object (`MysqlExportOptions`)``

`threads`

`integer`

Optional. The number of threads to use for parallel export.

`parallel`

`boolean`

Optional. Whether or not the export should be parallel.

`postgresExportOptions`

``object (`PostgresExportOptions`)``

Optional. Options for exporting from a Cloud SQL for PostgreSQL instance.

### MysqlExportOptions

JSON representation

{
  "masterData": integer
}

 

Fields

`masterData`

`integer`

Option to include SQL statement required to set up replication. If set to `1`, the dump file includes a CHANGE MASTER TO statement with the binary log coordinates, and --set-gtid-purged is set to ON. If set to `2`, the CHANGE MASTER TO statement is written as a SQL comment and has no effect. If set to any value other than `1`, --set-gtid-purged is set to OFF.

### PostgresExportOptions

JSON representation

{
  "clean": boolean,
  "ifExists": boolean
}

 

Fields

`clean`

`boolean`

Optional. Use this option to include DROP

`<object>`

SQL statements. Use these statements to delete database objects before running the import operation.

`ifExists`

`boolean`

Optional. Option to include an IF EXISTS SQL statement with each DROP statement produced by clean.

### SqlCsvExportOptions

JSON representation

{
  "selectQuery": string,
  "escapeCharacter": string,
  "quoteCharacter": string,
  "fieldsTerminatedBy": string,
  "linesTerminatedBy": string
}

 

Fields

`selectQuery`

`string`

The select query used to extract the data.

`escapeCharacter`

`string`

Specifies the character that should appear before a data character that needs to be escaped.

`quoteCharacter`

`string`

Specifies the quoting character to be used when a data value is quoted.

`fieldsTerminatedBy`

`string`

Specifies the character that separates columns within each row (line) of the file.

`linesTerminatedBy`

`string`

This is used to separate lines. If a line does not contain all fields, the rest of the columns are set to their default values.

### SqlBakExportOptions

JSON representation

{
  "striped": boolean,
  "stripeCount": integer,
  "bakType": enum (`BakType`),
  "copyOnly": boolean,
  "differentialBase": boolean,
  "exportLogStartTime": string,
  "exportLogEndTime": string
}

 

Fields

`striped`

`boolean`

Whether or not the export should be striped.

`stripeCount`

`integer`

Option for specifying how many stripes to use for the export. If blank, and the value of the striped field is true, the number of stripes is automatically chosen.

`bakType`

``enum (`BakType`)``

Type of this bak file will be export, FULL or DIFF, SQL Server only

`copyOnly   **(deprecated)**`

`boolean`

This item is deprecated!

Deprecated: copy_only is deprecated. Use differential_base instead

`differentialBase`

`boolean`

Whether or not the backup can be used as a differential base copy_only backup can not be served as differential base

`exportLogStartTime`

``string (`Timestamp` format)``

Optional. The begin timestamp when transaction log will be included in the export operation. RFC 3339 format (for example, `2023-10-01T16:19:00.094`) in UTC. When omitted, all available logs from the beginning of retention period will be included. Only applied to Cloud SQL for SQL Server.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`exportLogEndTime`

``string (`Timestamp` format)``

Optional. The end timestamp when transaction log will be included in the export operation. RFC 3339 format (for example, `2023-10-01T16:19:00.094`) in UTC. When omitted, all available logs until current time will be included. Only applied to Cloud SQL for SQL Server.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

### SqlTdeExportOptions

JSON representation

{
  "certificatePath": string,
  "privateKeyPath": string,
  "privateKeyPassword": string,
  "name": string
}

 

Fields

`certificatePath`

`string`

Required. Path to the TDE certificate public key in the form gs://bucketName/fileName. The instance must have write access to the bucket. Applicable only for SQL Server instances.

`privateKeyPath`

`string`

Required. Path to the TDE certificate private key in the form gs://bucketName/fileName. The instance must have write access to the location. Applicable only for SQL Server instances.

`privateKeyPassword`

`string`

Required. Password that encrypts the private key.

`name`

`string`

Required. Certificate name. Applicable only for SQL Server instances.

### BackupContext

JSON representation

{
  "backupId": string,
  "kind": string,
  "name": string
}

 

Fields

`backupId`

`string (int64 format)`

The identifier of the backup.

`kind`

`string`

This is always `sql#backupContext`.

`name`

`string`

The name of the backup. Format: projects/{project}/backups/{backup}

### PreCheckMajorVersionUpgradeContext

JSON representation

{
  "targetDatabaseVersion": enum (`SqlDatabaseVersion`),
  "preCheckResponse": [
    {
      object (`PreCheckResponse`)
    }
  ],
  "kind": string
}

 

Fields

`targetDatabaseVersion`

``enum (`SqlDatabaseVersion`)``

Required. The target database version to upgrade to.

`preCheckResponse[]`

``object (`PreCheckResponse`)``

Output only. The responses from the precheck operation.

`kind`

`string`

Optional. This is always `sql#preCheckMajorVersionUpgradeContext`.

### PreCheckResponse

JSON representation

{
  "actionsRequired": [
    string
  ],

  // Union field `_message` can be only one of the following:
  "message": string
  // End of list of possible types for union field `_message`.

  // Union field `_message_type` can be only one of the following:
  "messageType": enum (`MessageType`)
  // End of list of possible types for union field `_message_type`.
}

 

Fields

`actionsRequired[]`

`string`

The actions that the user needs to take. Use repeated for multiple actions.

Union field `_message`.

`_message` can be only one of the following:

`message`

`string`

The message to be displayed to the user.

Union field `_message_type`.

`_message_type` can be only one of the following:

`messageType`

``enum (`MessageType`)``

The type of message whether it is an info, warning, or error.

### AcquireSsrsLeaseContext

JSON representation

{

  // Union field `_setup_login` can be only one of the following:
  "setupLogin": string
  // End of list of possible types for union field `_setup_login`.

  // Union field `_service_login` can be only one of the following:
  "serviceLogin": string
  // End of list of possible types for union field `_service_login`.

  // Union field `_report_database` can be only one of the following:
  "reportDatabase": string
  // End of list of possible types for union field `_report_database`.

  // Union field `_duration` can be only one of the following:
  "duration": string
  // End of list of possible types for union field `_duration`.
}

 

Fields

Union field `_setup_login`.

`_setup_login` can be only one of the following:

`setupLogin`

`string`

The username to be used as the setup login to connect to the database server for SSRS setup.

Union field `_service_login`.

`_service_login` can be only one of the following:

`serviceLogin`

`string`

The username to be used as the service login to connect to the report database for SSRS setup.

Union field `_report_database`.

`_report_database` can be only one of the following:

`reportDatabase`

`string`

The report database to be used for SSRS setup.

Union field `_duration`.

`_duration` can be only one of the following:

`duration`

``string (`Duration` format)``

Lease duration needed for SSRS setup.

A duration in seconds with up to nine fractional digits, ending with '`s`'. Example: `"3.5s"`.

### Duration

JSON representation

{
  "seconds": string,
  "nanos": integer
}

 

Fields

`seconds`

`string (int64 format)`

Signed seconds of the span of time. Must be from -315,576,000,000 to +315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years

`nanos`

`integer`

Signed fractions of a second at nanosecond resolution of the span of time. Durations less than one second are represented with a 0 `seconds` field and a positive or negative `nanos` field. For durations of one second or more, a non-zero value for the `nanos` field must be of the same sign as the `seconds` field. Must be from -999,999,999 to +999,999,999 inclusive.

### SqlSubOperationType

JSON representation

{

  // Union field `sub_operation_details` can be only one of the following:
  "maintenanceType": enum (`SqlMaintenanceType`)
  // End of list of possible types for union field `sub_operation_details`.
}

 

Fields

Union field `sub_operation_details`. Sub operation details corresponding to the operation type. `sub_operation_details` can be only one of the following:

`maintenanceType`

``enum (`SqlMaintenanceType`)``

The type of maintenance to be performed on the instance.

### Tool Annotations

Destructive Hint: ❌ | Idempotent Hint: ❌ | Read Only Hint: ✅ | Open World Hint: ❌

Send feedback