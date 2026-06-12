# REST Resource: users

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Databases
*   Cloud SQL
*   SQL Server
*   Reference

Send feedback

# REST Resource: users Stay organized with collections Save and categorize content based on your preferences.

*   Resource: User
    *   JSON representation
*   SqlUserType
*   SqlServerUserDetails
    *   JSON representation
*   UserPasswordValidationPolicy
    *   JSON representation
*   PasswordStatus
    *   JSON representation
*   DualPasswordType
*   Methods

## Resource: User

A Cloud SQL user resource.

JSON representation

{
  "kind": string,
  "password": string,
  "etag": string,
  "name": string,
  "host": string,
  "instance": string,
  "project": string,
  "type": enum (`SqlUserType`),
  "passwordPolicy": {
    object (`UserPasswordValidationPolicy`)
  },

  // Union field `user_details` can be only one of the following:
  "sqlserverUserDetails": {
    object (`SqlServerUserDetails`)
  }
  // End of list of possible types for union field `user_details`.
  "dualPasswordType": enum (`DualPasswordType`)
}

 

Fields

`kind`

`string`

This is always `sql#user`.

`password`

`string`

The password for the user.

`etag`

`string`

This field is deprecated and will be removed from a future version of the API.

`name`

`string`

The name of the user in the Cloud SQL instance. Can be omitted for `update` because it is already specified in the URL.

`host`

`string`

Optional. The host from which the user can connect. For `insert` operations, host defaults to an empty string. For `update` operations, host is specified as part of the request URL. The host name cannot be updated after insertion. For a MySQL instance, it's required; for a PostgreSQL or SQL Server instance, it's optional.

`instance`

`string`

The name of the Cloud SQL instance. This does not include the project ID. Can be omitted for `update` because it is already specified on the URL.

`project`

`string`

The project ID of the project containing the Cloud SQL database. The Google apps domain is prefixed if applicable. Can be omitted for `update` because it is already specified on the URL.

`type`

``enum (`SqlUserType`)``

The user type. It determines the method to authenticate the user during login. The default is the database's built-in user type.

`passwordPolicy`

``object (`UserPasswordValidationPolicy`)``

User level password validation policy.

Union field `user_details`. User details for specific database type `user_details` can be only one of the following:

`sqlserverUserDetails`

``object (`SqlServerUserDetails`)``

`dualPasswordType`

``enum (`DualPasswordType`)``

Dual password status for the user.

## SqlUserType

The user type.

 

Enums

`BUILT_IN`

The database's built-in user type.

`CLOUD_IAM_USER`

Cloud IAM user.

`CLOUD_IAM_SERVICE_ACCOUNT`

Cloud IAM service account.

`CLOUD_IAM_GROUP`

Cloud IAM group. Not used for login.

`CLOUD_IAM_GROUP_USER`

Read-only. Login for a user that belongs to the Cloud IAM group.

`CLOUD_IAM_GROUP_SERVICE_ACCOUNT`

Read-only. Login for a service account that belongs to the Cloud IAM group.

`ENTRAID_USER`

Microsoft Entra ID user.

## SqlServerUserDetails

Represents a Sql Server user on the Cloud SQL instance.

JSON representation

{
  "disabled": boolean,
  "serverRoles": [
    string
  ]
}

 

Fields

`disabled`

`boolean`

If the user has been disabled

`serverRoles[]`

`string`

The server roles for this user

## UserPasswordValidationPolicy

User level password validation policy.

JSON representation

{
  "allowedFailedAttempts": integer,
  "passwordExpirationDuration": string,
  "enableFailedAttemptsCheck": boolean,
  "status": {
    object (`PasswordStatus`)
  },
  "enablePasswordVerification": boolean
}

 

Fields

`allowedFailedAttempts`

`integer`

Number of failed login attempts allowed before user get locked.

`passwordExpirationDuration`

``string (`Duration` format)``

Expiration duration after password is updated.

A duration in seconds with up to nine fractional digits, ending with '`s`'. Example: `"3.5s"`.

`enableFailedAttemptsCheck`

`boolean`

If true, failed login attempts check will be enabled.

`status`

``object (`PasswordStatus`)``

Output only. Read-only password status.

`enablePasswordVerification`

`boolean`

If true, the user must specify the current password before changing the password. This flag is supported only for MySQL.

## PasswordStatus

Read-only password status.

JSON representation

{
  "locked": boolean,
  "passwordExpirationTime": string
}

 

Fields

`locked`

`boolean`

If true, user does not have login privileges.

`passwordExpirationTime`

``string (`Timestamp` format)``

The expiration time of the current password.

Uses RFC 3339, where generated output will always be Z-normalized and use 0, 3, 6 or 9 fractional digits. Offsets other than "Z" are also accepted. Examples: `"2014-10-02T15:01:23Z"`, `"2014-10-02T15:01:23.045123456Z"` or `"2014-10-02T15:01:23+05:30"`.

## DualPasswordType

The type of retained password.

 

Enums

`DUAL_PASSWORD_TYPE_UNSPECIFIED`

The default value.

`NO_MODIFY_DUAL_PASSWORD`

Do not update the user's dual password status.

`NO_DUAL_PASSWORD`

No dual password usable for connecting using this user.

`DUAL_PASSWORD`

Dual password usable for connecting using this user.

 

## Methods

### delete

Deletes a user from a Cloud SQL instance.

### get

Retrieves a resource containing information about a user.

### insert

Creates a new user in a Cloud SQL instance.

### list

Lists users in the specified Cloud SQL instance.

### update

Updates an existing user in a Cloud SQL instance.

Send feedback