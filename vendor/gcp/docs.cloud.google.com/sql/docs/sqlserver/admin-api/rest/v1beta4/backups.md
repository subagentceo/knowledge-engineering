# REST Resource: backups

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   SQL Server
*   Reference

Send feedback

# REST Resource: backups Stay organized with collections Save and categorize content based on your preferences.

*   Resource: Backup
    *   JSON representation
*   SqlBackupType
*   SqlBackupState
*   Methods

## Resource: Backup

A backup resource.

JSON representation

{
  "name": string,
  "kind": string,
  "selfLink": string,
  "type": enum (`SqlBackupType`),
  "description": string,
  "instance": string,
  "location": string,
  "backupInterval": {
    object (`Interval`)
  },
  "state": enum (`SqlBackupState`),
  "error": {
    object (`OperationError`)
  },
  "kmsKey": string,
  "kmsKeyVersion": string,
  "backupKind": enum (`SqlBackupKind`),
  "timeZone": string,
  "databaseVersion": enum (`SqlDatabaseVersion`),
  "instanceDeletionTime": string,
  "instanceSettings": {
    object (`DatabaseInstance`)
  },
  "backupRun": string,
  "satisfiesPzs": boolean,
  "satisfiesPzi": boolean,

  // Union field `expiration` can be only one of the following:
  "ttlDays": string,
  "expiryTime": string
  // End of list of possible types for union field `expiration`.
  "maxChargeableBytes": string
}

 

Fields

`name`

`string`

Output only. The resource name of the backup. Format: projects/{project}/backups/{backup}.

`kind`

`string`

Output only. This is always `sql#backup`.

`selfLink`

`string`

Output only. The URI of this resource.

`type`

``enum (`SqlBackupType`)``

Output only. The type of this backup. The type can be "AUTOMATED", "ON_DEMAND", or “FINAL”.

`description`

`string`

The description of this backup.

`instance`

`string`

The name of the database instance.

`location`

`string`

The storage location of the backups. The location can be multi-regional.

`backupInterval`

``object (`Interval`)``

Output only. This output contains the following values: startTime: All database writes up to this time are available. endTime: Any database writes after this time aren't available.

`state`

``enum (`SqlBackupState`)``

Output only. The state of this backup.

`error`

``object (`OperationError`)``

Output only. Information about why the backup operation fails (for example, when the backup state fails).

`kmsKey`

`string`

Output only. This output contains the encryption configuration for a backup and the resource name of the KMS key for disk encryption.

`kmsKeyVersion`

`string`

Output only. This output contains the encryption status for a backup and the version of the KMS key that's used to encrypt the Cloud SQL instance.

`backupKind`

``enum (`SqlBackupKind`)``

Output only. Specifies the kind of backup, PHYSICAL or DEFAULT_SNAPSHOT.

`timeZone`

`string`

Output only. This output contains a backup time zone. If a Cloud SQL for SQL Server instance has a different time zone from the backup's time zone, then the restore to the instance doesn't happen.

`databaseVersion`

``enum (`SqlDatabaseVersion`)``

Output only. The database version of the instance of at the time this backup was made.

`instanceDeletionTime`

``string (`Timestamp` format)``

Optional. Output only. Timestamp in UTC of when the instance associated with this backup is deleted.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`instanceSettings`

``object (`DatabaseInstance`)``

Optional. Output only. Instance setting of the source instance that's associated with this backup.

`backupRun`

`string`

Output only. The mapping to backup run resource used for IAM validations.

`satisfiesPzs`

`boolean`

Output only. This status indicates whether the backup satisfies PZS.

The status is reserved for future use.

`satisfiesPzi`

`boolean`

Output only. This status indicates whether the backup satisfies PZI.

The status is reserved for future use.

Union field `expiration`.

`expiration` can be only one of the following:

`ttlDays`

`string (int64 format)`

Input only. The time-to-live (TTL) interval for this resource (in days). For example: ttlDays:7, means 7 days from the current time. The expiration time can't exceed 365 days from the time that the backup is created.

`expiryTime`

``string (`Timestamp` format)``

Backup expiration time. A UTC timestamp of when this resource expired.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

`maxChargeableBytes`

`string (int64 format)`

Output only. The maximum chargeable bytes for the backup.

## SqlBackupType

The backup type.

 

Enums

`SQL_BACKUP_TYPE_UNSPECIFIED`

This is an unknown backup type.

`AUTOMATED`

The backup schedule triggers a backup automatically.

`ON_DEMAND`

The user triggers a backup manually.

`FINAL`

The backup that's created when the instance is deleted.

## SqlBackupState

The backup's state

 

Enums

`SQL_BACKUP_STATE_UNSPECIFIED`

The state of the backup is unknown.

`ENQUEUED`

The backup that's added to a queue.

`RUNNING`

The backup is in progress.

`FAILED`

The backup failed.

`SUCCESSFUL`

The backup is successful.

`DELETING`

The backup is being deleted.

`DELETION_FAILED`

Deletion of the backup failed.

 

## Methods

### createBackup

Creates a backup for a Cloud SQL instance.

### deleteBackup

Deletes the backup.

### getBackup

Retrieves a resource containing information about a backup.

### listBackups

Lists all backups associated with the project.

### updateBackup

Updates the retention period and the description of the backup.

Send feedback