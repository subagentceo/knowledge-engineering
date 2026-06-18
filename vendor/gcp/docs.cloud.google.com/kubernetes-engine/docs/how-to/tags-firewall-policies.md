# Selectively enforce firewall policies in GKE

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   GKE security

Send feedback

# Selectively enforce firewall policies in GKE Stay organized with collections Save and categorize content based on your preferences.

Autopilot Standard

This page shows you how to selectively enforce Cloud Next Generation Firewall network firewall policies in Google Kubernetes Engine (GKE) by using Tags. Tags provide finer-grained control to organize your resource hierarchy when compared to the default Google Cloud resource hierarchy. Tags also allow the conditional enforcement of policies.

This page is for Security specialists who want fine-grained control over firewall policies in GKE. To learn more about common roles and example tasks that we reference in Google Cloud content, see Common GKE user roles and tasks.

Before reading this page, ensure that you're familiar with the following concepts:

*   General overview of Tags
*   How to use Tags for other purposes, like billing management or conditional IAM policies.

## About Tags

Tags are key-value pairs that let you annotate and manage your Google Cloud resources at the organization or project level. You can use tags to organize your resources and to conditionally apply policies like firewalls or IAM policies. You can use IAM access control to define who can attach, create, update, or delete tags.

To learn more about Tags, see the Tags overview in the Resource Manager documentation.

### Use Tags to enforce network firewall policies

**Key Term:** In this document, we sometimes use _firewall tags_ to refer to Tags that have a firewall policy enforcement purpose.

You can use Tags to conditionally apply global or regional network firewall policies to your GKE nodes. You must designate the `GCE_FIREWALL` purpose for tags that you want to use with network firewall policies. When you apply firewall purpose tags to GKE clusters or node pools, GKE automatically attaches those tags to the corresponding Compute Engine virtual machines (VMs).

Tags for network firewall policies replace the need to use _network tags_, which are metadata that anyone can attach to the underlying Compute Engine VMs for Virtual Private Cloud firewall rule enforcement, and which don't support IAM access control. If you use network tags with VPC firewall rules, we recommend that you migrate to network firewall policies and use secure firewall tags. For a detailed comparison, see Compare network tags with Tags in this document.

## Tags for network firewall policies workflow

To use tags with network firewall policies in GKE, you do the following:

1.  Create a tag:
    
    1.  Define a tag key at the organization or project level, such as `env`.
    2.  Define the possible tag values for the key, such as `dev`, `staging`, and `prod`.
    3.  Designate the tag for network firewall policy use.
        
        **Note:** Firewall policies can't target tags that aren't designated for firewall use.
        
2.  Grant users access to interact with the firewall tag.
    
3.  Apply tag key-value pairs to specific GKE clusters, node pools, or use them in custom ComputeClasses to apply them to nodes for specific workloads. GKE automatically attaches the tags to the underlying Compute Engine VMs for firewall policy enforcement.
    

## Before you begin

Before you start, make sure that you have performed the following tasks:

*   Enable the Google Kubernetes Engine API.
Enable Google Kubernetes Engine API*   If you want to use the Google Cloud CLI for this task, install and then initialize the gcloud CLI. If you previously installed the gcloud CLI, get the latest version by running the `gcloud components update` command. Earlier gcloud CLI versions might not support running the commands in this document.
    
    **Note:** For existing gcloud CLI installations, make sure to set the `compute/region` property. If you use primarily zonal clusters, set the `compute/zone` instead. By setting a default location, you can avoid errors in the gcloud CLI like the following: `One of [--zone, --region] must be supplied: Please specify location`. You might need to specify the location in certain commands if the location of your cluster differs from the default that you set.
    

### Requirements and limitations

*   Tags for network firewall policies are supported in GKE version 1.28 and later. If you use a GKE version earlier than 1.28, use network tags with VPC firewall rules instead.
*   In Standard clusters, each node pool supports up to five attached firewall tags.
*   Autopilot clusters support up to five firewall tags.
*   Custom Compute Class supports up to five tags.
*   GKE rejects tag keys that use the `gke-managed` prefix.
*   You must create the tag key-value pairs before you can attach them to clusters or node pools.

### IAM roles and permissions

To get the permissions that you need to use Tags for firewall policies in GKE, ask your administrator to grant you the following IAM roles:

*   To grant the required permissions for tags to users and GKE service agents:
    *   Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) on your project
    *   Organization Administrator (`roles/resourcemanager.organizationAdmin`) on the organization
*   To create and administer tags: Tag Administrator (`roles/resourcemanager.tagAdmin`) on the organization or the project
*   To attach tags to resources: Tag User (`roles/resourcemanager.tagUser`) on the project

For more information about granting roles, see Manage access to projects, folders, and organizations.

You might also be able to get the required permissions through custom roles or other predefined roles.

## Create tags

Tags must exist for you to attach them to clusters or nodes. To create a tag, see Use Tags for firewalls in the Cloud NGFW documentation.

Tag keys can have a `parent` of either `projects/PROJECT_ID` or `organizations/ORGANIZATION_ID`

To use a secure tag key with Cloud NGFW, you must set the `purpose` attribute to `GCE_FIREWALL`, and you must specify the value of the `purpose-data` attribute to either `network` or `organization=auto`.

1.  Create the tag key:
    
    *   Create the network-scoped tag key:
        
        This tag key is scoped to the VPC network specified in the `purpose-data` field.
        
        ```
        gcloud resource-manager tags keys create TAG_KEY \
            --parent=projects/PROJECT_ID \
            --purpose=GCE_FIREWALL \
            --purpose-data=network=PROJECT_ID/NETWORK_NAME
        ```
        
        Replace the following:
        
        *   `TAG_KEY`: the name of the tag key, such as `env`
        *   `PROJECT_ID`: your Google Cloud project ID
        *   `NETWORK_NAME`: the name of the VPC network that you'll use with the tag
    *   Create the organization-scoped tag key:
        
        This tag key can be used across any VPC network within the organization.
        
        ```
        gcloud resource-manager tags keys create TAG_KEY \
            --parent=projects/PROJECT_ID \
            --purpose=GCE_FIREWALL \
            --purpose-data=organization=auto
        ```
        
        Replace the following:
        
        *   `TAG_KEY`: the name of the tag key, such as `env`
        *   `PROJECT_ID`: your Google Cloud project ID
        
        `organization=auto` will be automatically replaced by the organization ID. For example:
        
        ```
        purposeData:
          organization: '123456789012'
        ```
        
2.  Get the ID of the tag key:
    
    ```
    gcloud resource-manager tags keys describe PROJECT_ID/TAG_KEY \
        --format="value(name)"
    ```
    
    The output is `tagKeys/KEY_ID`, where `KEY_ID` is a numerical ID for the key. Make a note of this ID for later.
    
3.  Add a tag value to the tag key:
    
    ```
    gcloud resource-manager tags values create TAG_VALUE \
        --parent=tagKeys/KEY_ID
    ```
    
    Replace `TAG_VALUE` with the name of an allowed value for that tag key, such as `dev`.
    

### Use correct tag syntax in gcloud CLI commands

When you refer to tags using the gcloud CLI, you must format the key-value pairs using one of the following syntaxes:

Tag syntax

tagKeys/KEY_ID=tagValues/VALUE_ID

Replace the following:

*   `KEY_ID`: the numerical key ID
*   `VALUE_ID`: the numerical value ID

For example, `tagKeys/123456789=tagValues/987654321`.

ORGANIZATION_ID/TAG_KEY=TAG_VALUE

Replace the following:

*   `ORGANIZATION_ID`: your numerical Google Cloud organization ID
*   `TAG_KEY`: the name of the tag key that you created
*   `TAG_VALUE`: the name of the tag value that you created

For example, `12345678901/env=dev`.

PROJECT_ID/TAG_KEY=TAG_VALUE

Replace the following:

*   `PROJECT_ID`: your Google Cloud project ID
*   `TAG_KEY`: the name of the tag key that you created
*   `TAG_VALUE`: the name of the tag value that you created

For example, `example-project/env=dev`.

PROJECT_NUMBER/TAG_KEY=TAG_VALUE

Replace the following:

*   `PROJECT_ID`: the numerical identifier for your Google Cloud project
*   `TAG_KEY`: the name of the tag key that you created
*   `TAG_VALUE`: the name of the tag value that you created

For example, `11223344556/env=dev`.

## Target tags with firewall policies

After you create tags, you can refer to specific key-value pairs in firewall policy rules. For instructions, see Use Tags for firewalls.

## Grant IAM permissions to service agents

For GKE to automatically attach tags to new nodes during scale-up events, you must grant the corresponding IAM roles to Google Cloud-managed service accounts, also called _service agents_.

1.  Grant the Tag User role (`roles/resourcemanager.tagUser`) to the Kubernetes Engine Service Agent:
    
    ```
    gcloud projects add-iam-policy-binding PROJECT_ID \
        --member=serviceAccount:service-PROJECT_NUMBER@container-engine-robot.iam.gserviceaccount.com \
        --role=roles/resourcemanager.tagUser \
        --condition=None
    ```
    
    Replace `PROJECT_NUMBER` with the Google Cloud project number of the cluster. To find the project number, run the following command:
    
    ```
    gcloud projects describe PROJECT_ID --format="value(projectNumber)"
    ```
    
2.  Grant the Tag Holds Administrator role (`roles/resourcemanager.tagHoldAdmin`) to the Kubernetes Engine Service Agent for the tag key-value pair:
    
    ```
    gcloud resource-manager tags values add-iam-policy-binding PROJECT_ID/TAG_KEY/TAG_VALUE \
        --member=serviceAccount:service-PROJECT_NUMBER@container-engine-robot.iam.gserviceaccount.com \
        --role=roles/resourcemanager.tagHoldAdmin
    ```
    
    This role lets the service agent prevent tag deletion if the key-value pair is still in use in GKE.
    
3.  Grant the Tag User role (`roles/resourcemanager.tagUser`) to the Google APIs Service Agent:
    
    ```
    gcloud projects add-iam-policy-binding PROJECT_ID \
        --member=serviceAccount:PROJECT_NUMBER@cloudservices.gserviceaccount.com \
        --role=roles/resourcemanager.tagUser \
        --condition=None
    ```
    

### Grant additional IAM roles for tags outside the project

To use tags that are owned by an organization or a different project than the cluster project, do the following additional steps:

1.  Grant the Tag User role (`roles/resourcemanager.tagUser`) to the Kubernetes Engine Service Agent access for the tags in the parent resource:
    
    ```
    gcloud resource-manager tags keys add-iam-policy-binding PARENT_RESOURCE/TAG_KEY \
        --member=serviceAccount:service-PROJECT_NUMBER@container-engine-robot.iam.gserviceaccount.com \
        --role=roles/resourcemanager.tagUser \
        --condition=None
    ```
    
    Replace the following:
    
    *   `PARENT_RESOURCE`: the project ID or the organization ID of the resource that owns that tag
    *   `PROJECT_NUMBER`: the project number of the **cluster** project
2.  Grant the Tag User role (`roles/resourcemanager.tagUser`) to the Google APIs Service Agent access for the tags in the parent resource:
    
    ```
    gcloud resource-manager tags keys add-iam-policy-binding PARENT_RESOURCE/TAG_KEY \
        --member=serviceAccount:PROJECT_NUMBER@cloudservices.gserviceaccount.com \
        --role=roles/resourcemanager.tagUser \
        --condition=None
    ```
    
3.  Grant the Tag Holds Administrator role (`roles/resourcemanager.tagHoldAdmin`) to the Kubernetes Engine Service Agent for the tag key-value pair:
    
    ```
    gcloud resource-manager tags values add-iam-policy-binding PARENT_RESOURCE/TAG_KEY/TAG_VALUE \
        --member=serviceAccount:service-PROJECT_NUMBER@container-engine-robot.iam.gserviceaccount.com \
        --role=roles/resourcemanager.tagHoldAdmin
    ```
    

## Attach firewall tags to Autopilot clusters

You attach firewall tags to Autopilot clusters at the _cluster level_. GKE automatically applies these cluster-level tags to every node.

### Attach tags when you create a new Autopilot cluster

Run the following command:

```
gcloud container clusters create-auto CLUSTER_NAME \
    --location=LOCATION \
    --autoprovisioning-resource-manager-tags=TAG1,TAG2,...
```

Replace the following:

*   `CLUSTER_NAME`: the name of the new cluster.
*   `LOCATION`: the Compute Engine region of the cluster.
*   `TAG1,TAG2,...`: a comma-separated set of key-value pairs to attach. Each key-value pair must use a supported syntax, as described in the Tag syntax in commands section. For example, `example-project/env=dev,1234567901/team=sre`.

### Attach tags to existing Autopilot clusters

Run the following command:

```
gcloud container clusters update CLUSTER_NAME \
    --location=LOCATION \
    --autoprovisioning-resource-manager-tags=TAG1,TAG2,...
```

When you update the tags on a cluster, GKE overwrites any existing tags on all of the nodes.

## Attach firewall tags to Standard clusters and node pools

The method that you use to attach tags depends on whether you want other node pools in the cluster to inherit the tags, as follows:

Standard cluster firewall tags

`--autoprovisioning-resource-manager-tags`

Cluster-level setting

GKE applies the tags to all **new** auto-provisioned node pools in the cluster.

If you use this flag in an existing cluster, GKE doesn't apply the tags to existing node pools in the cluster. Existing node pools retain any tags that were already applied before the update. To update the tags of existing node pools, use the `--resource-manager-tags` flag.

`--resource-manager-tags`

Node pool-level setting

GKE applies the tags to the specified node pool. If you use this flag during cluster creation, GKE applies the tags to the default node pool that GKE creates. If you use this flag on an auto-provisioned node pool, GKE overwrites any existing tags on the node pool.

### Attach firewall tags to Standard clusters

You can attach tags to new or existing Standard clusters. When you attach tags to an entire cluster, GKE considers these tags to be set at the _cluster-level_.

#### Attach tags to a new Standard cluster with node auto-provisioning

GKE uses cluster-level tags for new auto-provisioned nodes by default. The default node pool that GKE creates in the cluster isn't automatically provisioned and doesn't get those tags.

```
gcloud container clusters create CLUSTER_NAME \
    --location=LOCATION \
    --autoprovisioning-resource-manager-tags=TAG1,TAG2,... \
    --enable-autoprovisioning \
    --max-cpu=MAX_CPU \
    --max-memory=MAX_MEMORY
```

Replace the following:

*   `CLUSTER_NAME`: the name of the new cluster
*   `LOCATION`: the Compute Engine region or zone for the cluster
*   `TAG1,TAG2,...`: a comma-separated set of key-value pairs to attach. Each key-value pair must use a supported syntax, as described in the Tag syntax in commands section. For example, `example-project/env=dev,1234567901/team=sre`.
*   `MAX_CPU`: the maximum number of cores for the cluster
*   `MAX_MEMORY`: the maximum memory capacity for the cluster in gigabytes

#### Attach tags when you enable node auto-provisioning on an existing cluster

GKE only applies these tags to new auto-provisioned node pools. Existing node pools retain any tags that they had before the update.

1.  Attach tags to the cluster:
    
    ```
    gcloud container clusters update CLUSTER_NAME \
        --location=LOCATION \
        --autoprovisioning-resource-manager-tags=TAG1,TAG2,...
    ```
    
2.  Enable node auto-provisioning on the cluster:
    
    ```
    gcloud container clusters update CLUSTER_NAME \
        --location=LOCATION \
        --enable-autoprovisioning \
        --max-cpu=MAX_CPU \
        --max-memory=MAX_MEMORY
    ```
    

### Attach firewall tags to node pools

You can attach tags to new or existing node pools regardless of whether they use node auto-provisioning. GKE considers these tags to be a _node pool-level_ setting.

#### Attach tags to the default node pool

GKE attaches the tags that you specify using the `--resource-manager-tags` flag when you create a cluster to the default node pool that GKE creates in the cluster.

```
gcloud container clusters create CLUSTER_NAME \
    --location=LOCATION \
    --resource-manager-tags=TAG1,TAG2,...
```

Replace the following:

*   `CLUSTER_NAME`: the name of the new cluster
*   `LOCATION`: the Compute Engine region or zone for the cluster
*   `TAG1,TAG2,...`: a comma-separated set of key-value pairs to attach. Each key-value pair must use a supported syntax, as described in the Tag syntax in commands section. For example, `example-project/env=dev,1234567901/team=sre`.

#### Attach tags to a new node pool

When you use the `--resource-manager-tags` flag during node pool creation, GKE attaches the tags that you specify to that node pool.

```
gcloud container node-pools create NODE_POOL_NAME \
    --cluster=CLUSTER_NAME \
    --location=LOCATION \
    --resource-manager-tags=TAG1,TAG2,...
```

Replace the following:

*   `NODE_POOL_NAME`: the name of the new node pool
*   `CLUSTER_NAME`: the name of the cluster
*   `LOCATION`: the Compute Engine region or zone of the cluster
*   `TAG1,TAG2,...`:a comma-separated set of key-value pairs to attach. Each key-value pair must use a supported syntax, as described in the Tag syntax in commands section. For example, `example-project/env=dev,1234567901/team=sre`.

#### Attach tags to an existing node pool

When you update the tags on an existing node pool using the `--resource-manager-tags` flag, GKE overwrites any existing tags on that node pool. You can use this command to update the tags on auto-provisioned node pools.

```
gcloud container node-pools update NODE_POOL_NAME \
    --cluster=CLUSTER_NAME \
    --location=LOCATION \
    --resource-manager-tags=TAG1,TAG2,...
```

Replace `NODE_POOL_NAME` with the name of the node pool to update.

### Toggle auto-provisioning settings in existing clusters and node pools

**Key Point:** Existing node pools retain any attached tags when you enable or disable node auto-provisioning, even if you or GKE re-create the nodes later. To change the tags on existing node pools, attach new tags to those specific node pools.

When you update tags at the cluster level, GKE applies those new tags to all **new** node pools in the cluster and retains the tags that were attached to existing node pools.

When you update existing node pools to enable or disable node auto-provisioning, consider the following implications for tags:

*   When you enable or disable node auto-provisioning, the node pool retains any existing tags. GKE doesn't overwrite these tags with cluster-level tags, even during node re-creation.
*   If you manually update the tags on specific node pools, GKE overwrites the existing tags with your specified tags for that node pool.

## Apply tags to workloads with custom ComputeClasses

You can apply firewall tags to specific node pools in Autopilot clusters and in Standard clusters that use node auto-provisioning (NAP) by using custom ComputeClasses (CCCs). A Custom Compute Class is a resource that lets you define a configuration for a group of nodes, including defining the Resource Manager tags to apply to the nodes.

When you deploy a workload that requests a node with a specific Custom Compute Class label, NAP first checks if a node pool that matches all the requirements of the Custom Compute Class, including the specified Resource Manager tags, already exists.

If no matching node pool exists, NAP creates a new node pool for the workload with the specified configuration and attaches the tags to the underlying Compute Engine VMs. This automatic node pool creation helps ensure that workloads run on nodes with the correct firewall tags for policy enforcement.

### Create a custom ComputeClass by using Tags

1.  To create a `ComputeClass` with tags, save the following manifest as `my-compute-class.yaml`. In the `resourceManagerTags` field, specify the tag keys and values to associate with node pools that are created using this class.
    
    ```
    apiVersion: cloud.google.com/v1
    kind: ComputeClass
    metadata:
      name: COMPUTE_CLASS_NAME
    spec:
        nodePoolConfig:
          resourceManagerTags:
            - key: "PROJECT_ID/TAG_KEY_1"
              value: "TAG_VALUE_1"
            - key: "ORGANIZATION_ID/TAG_KEY_2"
              value: "TAG_VALUE_2"
            - key: "tagKeys/KEY_ID"
              value: "tagValues/VALUE_ID"
    ```
    
    Replace the following:
    
    *   `COMPUTE_CLASS_NAME`: the name for your Custom Compute Class, for example, `my-custom-class`.
    *   `PROJECT_ID`: your Google Cloud project ID.
    *   `TAG_KEY_1`: the name of the first tag key.
    *   `TAG_VALUE_1`: the name of the first tag value.
    *   `ORGANIZATION_ID`: your numerical Google Cloud organization ID.
    *   `TAG_KEY_2`: the name of the second tag key.
    *   `TAG_VALUE_2`: the name of the second tag value.
    *   `KEY_ID`: the numerical ID of a tag key.
    *   `VALUE_ID`: the numerical ID of a tag value.
2.  Apply the manifest:
    
    ```
    kubectl apply -f my-compute-class.yaml
    ```
    

If you specify an invalid tag or if the GKE service agents lack the required IAM permissions for the tag, GKE doesn't provision a node pool for your workload, and the workload remains in the `Pending` state. For more information about the error, see the `Status` field of your ComputeClass resource.

To check the status, run the following command:

```
kubectl get cc COMPUTE_CLASS_NAME -o jsonpath='{.status}' | jq .
```

Replace `COMPUTE_CLASS_NAME` with the name of your Custom Compute Class.

### Target the Custom Compute Class in your workload

1.  To target the ComputeClass you created, save the following manifest as `pod-with-ccc.yaml`. This manifest uses the `nodeSelector` field to target the Compute Class.
    
    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: nginx-server
    spec:
      nodeSelector:
        cloud.google.com/compute-class: "COMPUTE_CLASS_NAME"
      containers:
        - name: nginx
          image: nginx:latest
    ```
    
    Replace `COMPUTE_CLASS_NAME` with the name of your Custom Compute Class, for example, `my-custom-class`.
    
2.  Apply the manifest:
    
    ```
    kubectl apply -f pod-with-ccc.yaml
    ```
    

When you schedule a workload that targets a Custom Compute Class, GKE automatically applies a taint to the nodes created for that class and adds a corresponding toleration to your workload's Pods so that only Pods explicitly requesting the class are scheduled on those nodes.

### Authorize workloads with a Validating Admission Policy (VAP)

To help ensure that only authorized workloads can be scheduled on node pools with tags, we recommend using a Validating Admission Policy. This policy, a built-in Kubernetes feature, intercepts requests to create or update Pods before they are persisted. This interception prevents unauthorized workloads from running on tagged nodes.

The following policy denies Pod creation requests if the Pod contains a toleration for one of the listed Compute Class taints _and_ is not in a permitted namespace.

1.  Save the following manifest as `restrict-toleration.yaml`:
    
    ```
    # Copyright 2025 Google LLC
    #
    # Licensed under the Apache License, Version 2.0 (the "License");
    # you may not use this file except in compliance with the License.
    # You may obtain a copy of the License at
    #
    #      http://www.apache.org/licenses/LICENSE-2.0
    #
    # Unless required by applicable law or agreed to in writing, software
    # distributed under the License is distributed on an "AS IS" BASIS,
    # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    # See the License for the specific language governing permissions and
    # limitations under the License.
    
    apiVersion: admissionregistration.k8s.io/v1
    kind: ValidatingAdmissionPolicy
    metadata:
      name: restrict-toleration
    spec:
      failurePolicy: Fail
      paramKind:
        apiVersion: v1
        kind: ConfigMap
      matchConstraints:
        # GKE will mutate any pod specifying a CC label in a nodeSelector
        # or in a nodeAffinity with a toleration for the CC node label.
        # Mutation hooks will always mutate the K8s object before validating
        # the admission request.  
        # Pods created by Jobs, CronJobs, Deployments, etc. will also be validated.
        # See https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/#admission-control-phases for details
        resourceRules:
        - apiGroups:   [""]
          apiVersions: ["v1"]
          operations:  ["CREATE", "UPDATE"]
          resources:   ["pods"]
      matchConditions:
        - name: 'match-tolerations'
          # Validate only if compute class toleration exists
          # and the CC label tolerated is listed in the configmap.
          expression: > 
            object.spec.tolerations.exists(t, has(t.key) &&
            t.key == 'cloud.google.com/compute-class' &&
            params.data.computeClasses.split('\\n').exists(cc, cc == t.value))
      validations:
        # ConfigMap with permitted namespace list referenced via `params`.
        - expression: "params.data.namespaces.split('\\n').exists(ns, ns == object.metadata.namespace)"
          messageExpression: "'Compute class toleration not permitted on workloads in namespace ' + object.metadata.namespace"
    
    ---
    apiVersion: admissionregistration.k8s.io/v1
    kind: ValidatingAdmissionPolicyBinding
    metadata:
      name: restrict-toleration-binding
    spec:
      policyName: restrict-toleration
      validationActions: ["Deny"]
      paramRef:
        name: allowed-ccc-namespaces
        namespace: default
        parameterNotFoundAction: Deny
    ---
    apiVersion: v1
    kind: ConfigMap
    metadata:
      name: allowed-ccc-namespaces
      namespace: default
    data:
      # Replace example namespaces in line-separated list below.
      namespaces: |
        foo
        bar
        baz
      # ComputeClass names to monitor with this validation policy.
      # The 'autopilot' and 'autopilot-spot' CCs are present on
      # all NAP Standard and Autopilot clusters.
      computeClasses: |
        MY_COMPUTE_CLASS
        autopilot
        autopilot-spot
    ```
    
2.  Apply the manifest:
    
    ```
    kubectl apply -f restrict-toleration.yaml
    ```
    

Adjust the Validating Admission Policies to meet your organization's specific security needs.

## Verify the firewall tags on cluster

*   List the tags on Autopilot clusters:
    
    ```
    gcloud container clusters describe CLUSTER_NAME \
        --location=LOCATION \
        --format="value(nodePoolAutoConfig.resourceManagerTags)"
    ```
    
    Replace the following:
    
    *   `CLUSTER_NAME`: the name of the cluster.
    *   `LOCATION`: the Compute Engine region or zone of the cluster.
*   List the tags on specific node pools:
    
    This command also verifies tags on node pools auto-provisioned by a Custom Compute Class.
    
    ```
    gcloud container node-pools describe NODE_POOL_NAME \
      --cluster=CLUSTER_NAME \
      --location=LOCATION \
      --format="value(config.resourceManagerTags)"
    ```
    
    Replace the following:
    
    *   `NODE_POOL_NAME`: the name of the node pool.
    *   `CLUSTER_NAME`: the name of the cluster.
    *   `LOCATION`: the Compute Engine region or zone of the cluster.

## Detach firewall tags from clusters and node pools

To remove firewall tags from clusters and node pools, update the resource with an empty value for the tags.

### Detach tags from Autopilot clusters

Run the following command:

```
gcloud container clusters update CLUSTER_NAME \
    --location=LOCATION \
    --autoprovisioning-resource-manager-tags=
```

### Detach tags from node pools

1.  Detach cluster-level node `autoprovisioning` tags:
    
    ```
    gcloud container clusters update CLUSTER_NAME \
        --location=LOCATION \
        --autoprovisioning-resource-manager-tags=
    ```
    
    GKE won't attach tags to new auto-provisioned node pools.
    
2.  Detach node pool tags:
    
    ```
    gcloud container node-pools update NODE_POOL_NAME \
        --cluster=CLUSTER_NAME \
        --location=LOCATION \
        --resource-manager-tags=
    ```
    
    GKE removes existing tags from that node pool.
    

## Delete tags keys and values

To delete a tag key or value, ensure that the tag is detached from all resources. Then, see Deleting tags in the Resource Manager documentation.

## Compare network tags with Tags

Using Tags for firewall policy enforcement has significant security and usability benefits compared to network tags. Similarly, network firewall policies improve on the capabilities of VPC firewall rules by facilitating firewall rule enforcement across entire organizations, folders, projects, or networks.

Using Tags with network firewall policies is a more secure, scalable way to manage access to your GKE environments across your organization. You can use network tags in the same cluster as Tags, although you can't use network tags to enforce network firewall policies.

For a detailed comparison between Tags and network tags, see Comparison of Tags and network tags in the Cloud NGFW documentation.

### Functional differences in auto-provisioned node pools

In Autopilot clusters and in Standard node pools that don't use node auto-provisioning, network tags and Tags exhibit similar behavior. The following table shows the functional differences between network tags and Tags in **auto-provisioned** node pools in Standard clusters:

Action

Network tags behavior

Tags behavior

GKE auto-provisions a node pool

GKE applies the cluster-level network tags

GKE applies the cluster-level tags

You update tags or network tags on an auto-provisioned node pool

*   If cluster-level network tags exist, the update operation fails
*   If cluster-level network tags don't exist, GKE overwrites the existing network tags for the node pool

GKE overwrites existing tags for the node pool regardless of whether cluster-level tags exist

You update tags or network tags for the entire cluster

GKE overwrites the network tags for **new and existing** auto-provisioned node pools in the cluster.

GKE applies the new cluster-level tags to new auto-provisioned node pools. Existing auto-provisioned node pools retain the tags that they had prior to the update.

## What's next

*   Use Tags for usage tracking and IAM policy enforcement
*   Learn more about Tags for firewalls
*   Learn about Tags

Send feedback