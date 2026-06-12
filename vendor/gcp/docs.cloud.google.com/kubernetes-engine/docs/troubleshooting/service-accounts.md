# Troubleshoot service accounts in GKE

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   GKE security

Send feedback

# Troubleshoot service accounts in GKE Stay organized with collections Save and categorize content based on your preferences.

Autopilot Standard

Misconfigured or missing permissions for Google Kubernetes Engine (GKE) service accounts can lead to various issues, such as nodes failing to register or workloads being unable to access Google Cloud services.

Use this document to mitigate issues caused by misconfigured, disabled, or deleted service accounts.

This information is important for Platform admins and operators and Security engineers who configure and manage project-level IAM permissions for GKE nodes and core GKE components. For more information about the common roles and example tasks that we reference in Google Cloud content, see Common GKE user roles and tasks.

## Grant the required role for GKE to node service accounts

For GKE clusters using Kubernetes version 1.33 or earlier, the IAM service accounts that your GKE nodes use must have all of the permissions that are included in the Kubernetes Engine Default Node Service Account (`roles/container.defaultNodeServiceAccount`) IAM role. If a GKE node service account is missing one or more of these permissions, GKE can't perform system tasks like the following:

*   Send system and application logs from nodes to Cloud Logging.
*   Send system and application metrics from nodes to Cloud Monitoring.
*   Operate the performance profile of the Horizontal Pod Autoscaler.

Node service accounts might not have certain required permissions for reasons like the following:

*   The organization enforces the `iam.automaticIamGrantsForDefaultServiceAccounts` organization policy constraint, which prevents Google Cloud from automatically granting IAM roles to default IAM service accounts.
*   The IAM role that you grant to custom node service accounts doesn't include all of the required permissions that are included in the `roles/container.defaultNodeServiceAccount` role.

If your node service account is missing the permissions that GKE requires, you might see errors and notices like the following:

*   In the Google Cloud console, on the **Kubernetes clusters** page, a error **Grant critical permissions** error message appears in the **Notifications** column for a specific cluster.
*   In the Google Cloud console, on the cluster details page for a specific cluster, the following error message appears:
    
    ```
    Grant roles/container.defaultNodeServiceAccount role to Node service account to allow for non-degraded operations.
    ```
    
*   In Cloud Audit Logs, Admin Activity logs for Google Cloud APIs like `monitoring.googleapis.com` have the following values if the corresponding permissions to access those APIs are missing from the node service account:
    
    *   Severity: `ERROR`
    *   Message: `Permission denied (or the resource may not exist)`
*   Logs for specific nodes are missing from Cloud Logging and the Pod logs for the logging agent on those nodes show `401` errors. To get these Pod logs, run the following command:
    
    ```
    [[ $(kubectl logs -l k8s-app=fluentbit-gke -n kube-system -c fluentbit-gke | grep -cw "Received 401") -gt 0 ]] && echo "true" || echo "false"
    ```
    
    If the output is `true`, then the system workload is experiencing `401` errors, which indicate a lack of permissions.
    

To resolve this issue, grant the Kubernetes Engine Default Node Service Account (`roles/container.defaultNodeServiceAccount`) role on the project to the service account that's causing the errors. Select one of the following options:

### console

To find the name of the service account that your nodes use, do the following:

1.  Go to the **Kubernetes clusters** page:
    
    Go to Kubernetes clusters
    
2.  In the cluster list, click the name of the cluster that you want to inspect.
    
3.  Find the name of the node service account. You need this name later.
    
    *   For Autopilot mode clusters, in the **Security** section, find the **Service account** field.
    *   For Standard mode clusters, do the following:
    
    1.  Click the **Nodes** tab.
    2.  In the **Node pools** table, click a node pool name. The **Node pool details** page opens.
    3.  In the **Security** section, find the **Service account** field.
    
    If the value in the **Service account** field is `default`, your nodes use the Compute Engine default service account. If the value in this field is _not_ `default`, your nodes use a custom service account.
    

To grant the `Kubernetes Engine Default Node Service Account` role to the service account, do the following:

1.  Go to the **Welcome** page:
    
    Go to Welcome
    
2.  In the **Project number** field, click content_copy **Copy to clipboard**.
    
3.  Go to the **IAM** page:
    
    Go to IAM
    
4.  Click person_add **Grant access**.
    
5.  In the **New principals** field, specify the name of your node service account. If your nodes use the default Compute Engine service account, specify the following value:
    
    ```
    PROJECT_NUMBER-compute@developer.gserviceaccount.com
    ```
    
    Replace `PROJECT_NUMBER` with the project number that you copied.
    
6.  In the **Select a role** menu, select the **Kubernetes Engine Default Node Service Account** role.
    
7.  Click **Save**.
    

To verify that the role was granted, do the following:

1.  In the **IAM** page, click the **View by roles** tab.
2.  Expand the **Kubernetes Engine Default Node Service Account** section. A list of principals that have this role is displayed.
3.  Find your node service account in the list of principals.

### gcloud

1.  Find the name of the service account that your nodes use:
    
    *   For Autopilot mode clusters, run the following command:
    
    ```
    gcloud container clusters describe CLUSTER_NAME \
        --location=LOCATION \
        --flatten=autoscaling.autoprovisioningNodePoolDefaults.serviceAccount
    ```
    
    *   For Standard mode clusters, run the following command:
    
    ```
    gcloud container clusters describe CLUSTER_NAME \
        --location=LOCATION \
        --format="table(nodePools.name,nodePools.config.serviceAccount)"
    ```
    
    If the output is `default`, your nodes use the Compute Engine default service account. If the output is _not_ `default`, your nodes use a custom service account.
    
2.  Find your Google Cloud project number:
    
    ```
    gcloud projects describe PROJECT_ID \
        --format="value(projectNumber)"
    ```
    
    Replace `PROJECT_ID` with your project ID.
    
    The output is similar to the following:
    
    ```
    12345678901
    ```
    
3.  Grant the `roles/container.defaultNodeServiceAccount` role to the service account:
    
    ```
    gcloud projects add-iam-policy-binding PROJECT_ID \
        --member="SERVICE_ACCOUNT_NAME" \
        --role="roles/container.defaultNodeServiceAccount"
    ```
    
    Replace `SERVICE_ACCOUNT_NAME` with the name of the service account, which you found in the previous step. If your nodes use the Compute Engine default service account, specify the following value:
    
    ```
    serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com
    ```
    
    Replace `PROJECT_NUMBER` with the project number from the previous step.
    
4.  Verify that the role was granted successfully:
    
    ```
    gcloud projects get-iam-policy PROJECT_ID \
        --flatten="bindings[].members" --filter=bindings.role:roles/container.defaultNodeServiceAccount \
        --format='value(bindings.members)'
    ```
    
    The output is the name of your service account.
    

### Identify clusters that have node service accounts with missing permissions

Use GKE recommendations of the `NODE_SA_MISSING_PERMISSIONS` recommender subtype to identify Autopilot and Standard clusters that have node service accounts with missing permissions. Recommender identifies only clusters that were created on or after January 1, 2024. To find and fix the missing permissions by using Recommender, do the following:

1.  Find active recommendations in your project for the `NODE_SA_MISSING_PERMISSIONS` recommender subtype:
    
    ```
    gcloud recommender recommendations list \
        --recommender=google.container.DiagnosisRecommender \
        --location LOCATION \
        --project PROJECT_ID \
        --format yaml \
        --filter="recommenderSubtype:NODE_SA_MISSING_PERMISSIONS"
    ```
    
    Replace the following:
    
    *   `LOCATION`: the location to find recommendations in.
    *   `PROJECT_ID`: your Google Cloud project ID.
    
    The output is similar to the following, which indicates that a cluster has a node service account with missing permissions:
    
    ```
    associatedInsights:
    # lines omitted for clarity
    recommenderSubtype: NODE_SA_MISSING_PERMISSIONS
    stateInfo:
      state: ACTIVE
    targetResources:
    - //container.googleapis.com/projects/12345678901/locations/us-central1/clusters/cluster-1
    ```
    
    It might take up to 24 hours for the recommendation to appear. For detailed instructions, see view insights and recommendations.
    
2.  For every cluster that's in the output of the previous step, find the associated node service accounts and grant the required role to those service accounts. For details, see the instructions in the Grant node service accounts the required role for GKE section.
    
    After you grant the required role to the identified node service accounts, the recommendation might persist for up to 24 hours unless you manually dismiss it.
    

### Identify all node service accounts with missing permissions

You can run a script that searches node pools in your project's Standard and Autopilot clusters for any node service accounts that don't have the required permissions for GKE. This script uses the gcloud CLI and the `jq` utility. To view the script, expand the following section:

View the script

#!/bin/bash

# Set your project ID
project_id=`PROJECT_ID`
project_number=$(gcloud projects describe "$project_id" --format="value(projectNumber)")
declare -a all_service_accounts
declare -a sa_missing_permissions

# Function to check if a service account has a specific permission
# $1: project_id
# $2: service_account
# $3: permission
service_account_has_permission() {
  local project_id="$1"
  local service_account="$2"
  local permission="$3"

  local roles=$(gcloud projects get-iam-policy "$project_id" \
          --flatten="bindings[].members" \
          --format="table[no-heading](bindings.role)" \
          --filter="bindings.members:\"$service_account\"")

  for role in $roles; do
    if role_has_permission "$role" "$permission"; then
      echo "Yes" # Has permission
      return
    fi
  done

  echo "No" # Does not have permission
}

# Function to check if a role has the specific permission
# $1: role
# $2: permission
role_has_permission() {
  local role="$1"
  local permission="$2"
  gcloud iam roles describe "$role" --format="json" | \
  jq -r ".includedPermissions" | \
  grep -q "$permission"
}

# Function to add $1 into the service account array all_service_accounts
# $1: service account
add_service_account() {
  local service_account="$1"
  all_service_accounts+=( ${service_account} )
}

# Function to add service accounts into the global array all_service_accounts for a Standard GKE cluster
# $1: project_id
# $2: location
# $3: cluster_name
add_service_accounts_for_standard() {
  local project_id="$1"
  local cluster_location="$2"
  local cluster_name="$3"

  while read nodepool; do
    nodepool_name=$(echo "$nodepool" | awk '{print $1}')
    if [[ "$nodepool_name" == "" ]]; then
      # skip the empty line which is from running `gcloud container node-pools list` in GCP console
      continue
    fi
    while read nodepool_details; do
      service_account=$(echo "$nodepool_details" | awk '{print $1}')

      if [[ "$service_account" == "default" ]]; then
        service_account="${project_number}-compute@developer.gserviceaccount.com"
      fi
      if [[ -n "$service_account" ]]; then
        printf "%-60s| %-40s| %-40s| %-10s| %-20s\n" $service_account $project_id  $cluster_name $cluster_location $nodepool_name
        add_service_account "${service_account}"
      else
        echo "cannot find service account for node pool $project_id\t$cluster_name\t$cluster_location\t$nodepool_details"
      fi
    done <<< "$(gcloud container node-pools describe "$nodepool_name" --cluster "$cluster_name" --zone "$cluster_location" --project "$project_id" --format="table[no-heading](config.serviceAccount)")"
  done <<< "$(gcloud container node-pools list --cluster "$cluster_name" --zone "$cluster_location" --project "$project_id" --format="table[no-heading](name)")"

}

# Function to add service accounts into the global array all_service_accounts for an Autopilot GKE cluster
# Autopilot cluster only has one node service account.
# $1: project_id
# $2: location
# $3: cluster_name
add_service_account_for_autopilot(){
  local project_id="$1"
  local cluster_location="$2"
  local cluster_name="$3"

  while read service_account; do
      if [[ "$service_account" == "default" ]]; then
        service_account="${project_number}-compute@developer.gserviceaccount.com"
      fi
      if [[ -n "$service_account" ]]; then
        printf "%-60s| %-40s| %-40s| %-10s| %-20s\n" $service_account $project_id  $cluster_name $cluster_location $nodepool_name
        add_service_account "${service_account}"
      else
        echo "cannot find service account" for cluster  "$project_id\t$cluster_name\t$cluster_location\t"
      fi
  done <<< "$(gcloud container clusters describe "$cluster_name" --location "$cluster_location" --project "$project_id" --format="table[no-heading](autoscaling.autoprovisioningNodePoolDefaults.serviceAccount)")"
}

# Function to check whether the cluster is an Autopilot cluster or not
# $1: project_id
# $2: location
# $3: cluster_name
is_autopilot_cluster() {
  local project_id="$1"
  local cluster_location="$2"
  local cluster_name="$3"
  autopilot=$(gcloud container clusters describe "$cluster_name" --location "$cluster_location" --format="table[no-heading](autopilot.enabled)")
  echo "$autopilot"
}

echo "--- 1. List all service accounts in all GKE node pools"
printf "%-60s| %-40s| %-40s| %-10s| %-20s\n" "service_account" "project_id" "cluster_name" "cluster_location" "nodepool_name"
while read cluster; do
  cluster_name=$(echo "$cluster" | awk '{print $1}')
  cluster_location=$(echo "$cluster" | awk '{print $2}')
  # how to find a cluster is a Standard cluster or an Autopilot cluster
  autopilot=$(is_autopilot_cluster "$project_id" "$cluster_location" "$cluster_name")
  if [[ "$autopilot" == "True" ]]; then
    add_service_account_for_autopilot "$project_id" "$cluster_location"  "$cluster_name"
  else
    add_service_accounts_for_standard "$project_id" "$cluster_location"  "$cluster_name"
  fi
done <<< "$(gcloud container clusters list --project "$project_id" --format="value(name,location)")"

echo "--- 2. Check if service accounts have permissions"
unique_service_accounts=($(echo "${all_service_accounts[@]}" | tr ' ' '\n' | sort -u | tr '\n' ' '))

echo "Service accounts: ${unique_service_accounts[@]}"
printf "%-60s| %-40s| %-40s| %-20s\n" "service_account" "has_logging_permission" "has_monitoring_permission" "has_performance_hpa_metric_write_permission"
for sa in "${unique_service_accounts[@]}"; do
  logging_permission=$(service_account_has_permission "$project_id" "$sa" "logging.logEntries.create")
  time_series_create_permission=$(service_account_has_permission "$project_id" "$sa" "monitoring.timeSeries.create")
  metric_descriptors_create_permission=$(service_account_has_permission "$project_id" "$sa" "monitoring.metricDescriptors.create")
  if [[ "$time_series_create_permission" == "No" || "$metric_descriptors_create_permission" == "No" ]]; then
    monitoring_permission="No"
  else
    monitoring_permission="Yes"
  fi
  performance_hpa_metric_write_permission=$(service_account_has_permission "$project_id" "$sa" "autoscaling.sites.writeMetrics")
  printf "%-60s| %-40s| %-40s| %-20s\n" $sa $logging_permission $monitoring_permission $performance_hpa_metric_write_permission

  if [[ "$logging_permission" == "No" || "$monitoring_permission" == "No" || "$performance_hpa_metric_write_permission" == "No" ]]; then
    sa_missing_permissions+=( ${sa} )
  fi
done

echo "--- 3. List all service accounts that don't have the above permissions"
if [[ "${#sa_missing_permissions[@]}" -gt 0 ]]; then
  printf "Grant roles/container.defaultNodeServiceAccount to the following service accounts: %s\n" "${sa_missing_permissions[@]}"
else
  echo "All service accounts have the above permissions"
fi

This script applies to all of the GKE clusters in your project.

After you identify the names of the service accounts with missing permissions, grant them the required role. For details, see the instructions in the Grant node service accounts the required role for GKE section.

## Restore the default service account to your Google Cloud project

GKE's default service account, `container-engine-robot`, can accidentally become unbound from a project. The Kubernetes Engine Service Agent role (`roles/container.serviceAgent`) is an Identity and Access Management (IAM) role that grants the service account the permissions to manage cluster resources. If you remove this role binding from the service account, the default service account becomes unbound from the project, which can prevent you from deploying applications and performing other cluster operations.

To see if the service account is removed from your project, you can use the Google Cloud console or Google Cloud CLI.

### Console

*   In the Google Cloud console, go to the **IAM & Admin** page.
    
    Go to IAM & Admin
    

### gcloud

*   Run the following command:
    
    ```
    gcloud projects get-iam-policy PROJECT_ID
    ```
    
    Replace `PROJECT_ID` with your project ID.
    

If the dashboard or the command doesn't display `container-engine-robot` among your service accounts, the role is unbound.

To restore the Kubernetes Engine Service Agent role (`roles/container.serviceAgent`) binding, run the following commands:

```
PROJECT_NUMBER=$(gcloud projects describe "PROJECT_ID" \
    --format 'get(projectNumber)') \
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member "serviceAccount:service-${PROJECT_NUMBER}@container-engine-robot.iam.gserviceaccount.com" \
    --role roles/container.serviceAgent
```

Confirm that the role binding is restored:

```
gcloud projects get-iam-policy PROJECT_ID
```

If you see the service account name along with the `container.serviceAgent` role, the role binding is restored. For example:

```
- members:
  - serviceAccount:service-1234567890@container-engine-robot.iam.gserviceaccount.com
  role: roles/container.serviceAgent
```

## Enable the Compute Engine default service account

The service account used for the node pool is usually the Compute Engine default service account. If this default service account is deactivated, your nodes might fail to register with the cluster.

To see if the service account is deactivated in your project, you can use the Google Cloud console or gcloud CLI.

### Console

*   In the Google Cloud console, go to the **IAM & Admin** page.
    
    Go to IAM & Admin
    

### gcloud

*   Run the following command:

```
gcloud iam service-accounts list  --filter="NAME~'compute' AND disabled=true"
```

If the service account is deactivated, run the following commands to enable the service account:

1.  Find your Google Cloud project number:
    
    ```
    gcloud projects describe PROJECT_ID \
        --format="value(projectNumber)"
    ```
    
    Replace `PROJECT_ID` with your project ID.
    
    The output is similar to the following:
    
    ```
    12345678901
    ```
    
2.  Enable the service account:
    
    ```
    gcloud iam service-accounts enable PROJECT_NUMBER-compute@developer.gserviceaccount.com
    ```
    
    Replace `PROJECT_NUMBER` with your project number from the output of the preceding step.
    

For more information, see Troubleshoot node registration.

## Error 400/403: Missing edit permissions on account

If your service account is deleted, you might see a missing edit permissions error. To learn how to troubleshoot this error, see Error 400/403: Missing edit permissions on account.

## What's next

*   If you can't find a solution to your problem in the documentation, see Get support for further help, including advice on the following topics:
    
    *   Opening a support case by contacting Cloud Customer Care.
    *   Getting support from the community by asking questions on StackOverflow and using the `google-kubernetes-engine` tag to search for similar issues. You can also join the `#kubernetes-engine` Slack channel for more community support.
    *   Opening issues or feature requests by using the public issue tracker.

Send feedback