# Backup for GKE API Version v1: Error Catalog

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   Documentation
*   Reference

Send feedback

# Backup for GKE API Version v1: Error Catalog Stay organized with collections Save and categorize content based on your preferences.

Backup for GKE is a managed Kubernetes workload backup and restore service for GKE clusters.

## Service: gkebackup.googleapis.com

When facing errors, refer to this catalog alongside using our client libraries. If you're using your own libraries, keep this guide handy for debugging and error resolution. To know more about the error response structure, visit the error overview page.

## Error codes

The following table lists HTTP status codes and associated errors that you might encounter when interacting with our API. Each status code corresponds to one or more reasons and descriptions to help you troubleshoot and handle errors effectively in your application. Within the descriptions, variables denoted by curly braces (`{}`) represent placeholders for values that are specific to your request.

**Note:** This list contains some error messages related to its API, but is not a complete list of those messages.

  

Reason

HTTP Status Code

Description

`MISSING_REQUIRED_FIELD`

`400`

{field_name} is required in this request. Populate {field_name} and try again.

`INVALID_FIELD`

`400`

The value for {field_name} is invalid. It must be {field_restriction}.

`UNSUPPORTED_CROSS_PROJECT_RESOURCE`

`400`

Cross project {resource_type} creation is not supported.

`INVALID_BACKUP_SCOPE`

`400`

Backup scope is invalid. Provide a valid scope and try again.

`EMPTY_SELECTED_NAMESPACES`

`400`

{scope_type} scope is invalid. Provide the list of namespaces to {operation}.

`EMPTY_SELECTED_APPLICATIONS`

`400`

{scope_type} scope is invalid. Provide the list of protected applications to {operation}.

`EMPTY_SELECTED_NAMESPACE_LABELS`

`400`

{scope_type} scope is invalid. Provide the list of Namespace labels to {operation}.

`CONFLICTING_BACKUP_PLAN_SCHEDULE_FIELDS`

`400`

A backup plan cannot have both a cron schedule and a RPO configuration. You can create a backup plan with cron schedule or RPO configuration.

`MISSING_RETENTION_POLICY`

`400`

Backup plan with a defined backup schedule require a 'backup_retain_days' value. Specify the number of days to retain backups in the 'backup_retain_days' field and try again.

`UNSUPPORTED_MULTIPLE_RECURRENCE_WINDOWS`

`400`

Multiple recurrence exclusion windows are not supported.

`DUPLICATE_DAYS_IN_EXCLUSION_WINDOW`

`400`

Duplicate days of the week found in the RPO configuration exclusion window recurrence settings. Ensure each day of the week is selected only once.

`INVALID_RPO_CONFIG`

`400`

Invalid RPO Config: {error_message}.

`INVALID_RPO_CONFIG_SIMULATION`

`400`

Unable to meet the defined RPO. This is likely due to exclusion windows being too long or too frequent. Please adjust your exclusion window settings and try again.

`INVALID_CRON_SCHEDULE`

`400`

Invalid Cron schedule in this request. Please provide a valid cron and try again.

`INVALID_KMS_KEY`

`400`

Invalid GCP KMS encryption key. Please provide a valid KMS key and try again.

`REGION_MISMATCH`

`400`

The {field_1} region does not match the {field_2} region. Ensure both are in the same region.

`OPERATION_TIMEOUT`

`499`

Operation {operation_name} timed out.

`INCOMPATIBLE_RESOURCE`

`400`

Mutations to this resource is not allowed via this version of the API.

`ETAG_MISMATCH`

`400`

Provided Etag does not match the current value.

`IMMUTABLE_FIELD`

`400`

Request is trying to update an immutable field {field_name}.

`INVALID_UPDATE_MASK`

`400`

The provided update mask is invalid and not supported for {resource_type} resources.

`LOCKED_RETENTION_POLICY`

`400`

The retention policy is locked and cannot be updated.

`DEACTIVATED_BACKUP_PLAN`

`400`

{operation_name} is not allowed on a deactivated backup plan.

`FAILED_RESOURCE`

`400`

The requested {operation_name} operation is not allowed on a failed {resource_type} resource.

`RESOURCE_SIZE_TOO_LARGE`

`400`

Resource creation failed. Reduce the size of the resource configuration and try again.

`INVALID_CLUSTER_REFERENCE`

`400`

Cluster validation failed: {error_message}.

`BILLING_DISABLED`

`403`

This API method requires billing to be enabled. Please enable billing on project {project_number} by visiting https://console.developers.google.com/billing/enable?project={project_number} then retry. If you enabled billing for this project recently, wait a few minutes for the action to propagate to our systems and retry.

`DEPENDENT_SERVICE_NOT_ENABLED`

`403`

{service} has not been used in project {project_number} before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/{service_name}/overview?project={project_number} then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.

`CLUSTER_ACCESS_DENIED`

`403`

Operation failed while attempting to communicate with the cluster. Ensure that Backup for GKE Service Account service-{project_number}@gcp-sa-gkebackup.iam.gserviceaccount.com has been granted role roles/gkebackup.serviceAgent in the project {project_number}.

`CLUSTER_IN_BAD_STATE`

`400`

The cluster is currently in an Error, Degraded, or Stopping state. Check the cluster details for more information and to take the necessary corrective action.

`UNSUPPORTED_GKE_VERSION`

`400`

Backup for GKE does not support the current cluster version ({current_version}). To enable backups, upgrade the cluster to version {min_supported_version} or higher.

`FAILED_AGENT_INSTALLATION`

`400`

Backup for GKE Agent installation failed: {external_error}.

`CONFLICTING_CLUSTER_RESOURCE_SCOPE_FIELDS`

`400`

Invalid value for Cluster Resource Scope. All cluster resource restore scope fields are mutually exclusive with other fields.

`MISSING_CLUSTER_RESOURCE_CONFLICT_POLICY`

`400`

Restore plans with cluster resource scope set must also set cluster resource conflict policy. Please populate cluster resource conflict policy and try again.

`UNSUPPORTED_RESOURCE_FOR_RESTORE`

`400`

Cannot select provided resource: {resource_name} for restore - {reason}

`INVALID_NAMESPACED_RESOURCE_RESTORE_SCOPE`

`400`

Invalid Namespaced resource restore scope in this request. Please provide a valid scope and try again.

`MISSING_NAMESPACED_RESOURCE_RESTORE_MODE`

`400`

Restore plans with namespaced resources selected to restore must also set namespaced resource restore mode. Please populate namespaced resource restore mode and try again.

`INVALID_VOLUME_DATA_RESTORE_POLICY`

`400`

Invalid volume data restore policy. Volume data cannot be restored from a backup that does not backup volume data.

`TOO_MANY_RESOURCE_TYPES`

`400`

Too many resource types specified in Cluster Resource restore scope.

`CONFLICTING_SUBSTITUTION_TRANSFORMATION_RULE_FIELDS`

`400`

Cannot set both Substitution and Transformation rules at the same time.

`TOO_MANY_SUBSTITUTION_RULES`

`400`

Too many Substitution rules specified in Restore Config.

`TOO_MANY_TRANSFORMATION_RULES`

`400`

Too many Transformation rules specified in Restore Config.

`INVALID_TRANSFORMATION_RULE`

`400`

Invalid Transformation rule[{rule_index}] defined: {error_message}.

`INVALID_VOLUME_DATA_RESTORE_POLICY_BINDING`

`400`

Invalid Volume data restore policy binding: {error_message}.

`RESOURCE_NOT_FOUND`

`404`

The resource: {resource_name} in the request is invalid or not found.

`BFG_AGENT_NOT_INSTALLED`

`400`

Backup for GKE agent is not installed on the cluster. Please ensure Backup for GKE is enabled for cluster {cluster_name}.

`FAILED_BACKUP_JOB_CREATION`

`400`

Backup Job creation in target cluster failed: {external_error}.

`LOCKED_STATE`

`400`

Backup is locked for {operation}. It will be eligible for {operation} after {time}.

`UNSUPPORTED_MODE_FOR_RESTORE_FILTER`

`400`

Fine-grained filtering is supported only with the following namespaced resource restore modes: MERGE_SKIP_ON_CONFLICT, MERGE_REPLACE_VOLUME_ON_CONFLICT, or MERGE_REPLACE_ON_CONFLICT.

`FILTERS_LIMIT_EXCEEDED`

`400`

Maximum allowed fine-grained filters are 50.

`INVALID_VOLUME_DATA_RESTORE_POLICY_OVERRIDE`

`400`

Invalid Volume data restore policy Override: {error_message}.

`FAILED_RESTORE_JOB_CREATION`

`400`

Restore job creation in target cluster failed: {external_error}.

`INVALID_BACKUP_PLAN`

`400`

Invalid parent Backup plan {backup_plan_name}. Missing backup config scope.

`INVALID_CLUSTER_VERSION`

`400`

The {feature} feature is supported in cluster versions starting from {cluster_version}. Please upgrade the cluster to a supported version and try again.

`BACKUP_INDEX_NOT_FOUND`

`404`

Backup index does not exist because the backup {backup_name} is in {backup_state} state.

`INTERNAL_ERROR`

`500`

Internal error occurred.

Send feedback