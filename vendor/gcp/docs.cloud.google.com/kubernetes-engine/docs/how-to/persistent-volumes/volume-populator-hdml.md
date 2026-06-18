# Automate data transfer from Cloud Storage to a Hyperdisk ML volume using GKE Volume Populator

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   Guides

Send feedback

# Automate data transfer from Cloud Storage to a Hyperdisk ML volume using GKE Volume Populator Stay organized with collections Save and categorize content based on your preferences.

Autopilot Standard

This guide describes how you can preload large amounts of data from a Cloud Storage bucket to a Google Kubernetes Engine (GKE) Hyperdisk ML volume during dynamic provisioning by using GKE Volume Populator. For more information, see About GKE Volume Populator.

This guide is for storage specialists who create and allocate storage, manage data security and access. To learn more about common roles and example tasks that we reference in Google Cloud content, see Common GKE user roles and tasks.

## Node pool management for GKE Volume Populator with Hyperdisk ML

Efficient node pool sizing, provisioning, and scaling is crucial for successfully running the data transfer Jobs that are created by GKE Volume Populator to populate Hyperdisk ML volumes. You use a compute class to define the node requirements, such as machine type and size, for these specific data transfer Jobs. A compute class lets you control the cost and performance of the data transfer process. For more information, see Benefits of custom compute classes.

To choose a cluster that is most suited for your data transfer Jobs, understand how compute classes work with different cluster types for Hyperdisk ML.

## Objectives

In this guide, you perform the following tasks:

*   Configure your GKE cluster environment to support data transfers using GKE Volume Populator, including cluster creation, compute class definition, and permissions setup.
*   Create a `GCPDataSource` custom resource to specify the source Cloud Storage bucket.
*   Define a `StorageClass` for Hyperdisk ML.
*   Create a `PersistentVolumeClaim` that references the `GCPDataSource` to trigger the data population to a Hyperdisk ML volume.
*   Verify the data transfer.
*   Consume the populated volume in a Pod.
*   Clean up the resources.

## Before you begin

Make sure you have performed the following tasks:

1.  Enable the GKE and Cloud Storage APIs.
    
    Enable the APIs
    
2.  Make sure that billing is enabled for your Google Cloud project.
    
3.  Download and install the Google Cloud CLI command-line tool, or use Cloud Shell to run `gcloud CLI` and `kubectl` commands. Cloud Shell is a shell environment for managing resources hosted on Google Cloud. It comes preinstalled with the gcloud and kubectl command-line tool.
    
4.  Set a default region and zone.
    
5.  Create, or use an existing Cloud Storage bucket. This guide assumes that you already have a Cloud Storage bucket populated with your model training data.
    
6.  Enable the Compute Engine Persistent Disk CSI driver on existing Standard clusters that might have the driver explicitly disabled. On new Autopilot and Standard clusters, GKE enables the driver by default. The destination Hyperdisk ML storage that you create must be managed by the Compute Engine Persistent Disk CSI driver.
    
7.  Enable Workload Identity Federation for GKE on your cluster. This allows the Kubernetes service account used by GKE Volume Populator to access the source Cloud Storage bucket. For more information, see Set up necessary permissions.
    

## Requirements

To transfer data by using GKE Volume Populator, meet the following requirements:

*   Your GKE cluster must be running version `1.33.2-gke.4780000` or later.
*   Your `GCPDataSource` custom resource must be in the same namespace as your GKE workload. Data sources that span different namespaces aren't supported.
*   Select a supported VM when you create your compute class. Confirm that your project has sufficient quota for the machine type you select.
*   The `gcs-to-hdml-compute-class` compute class name is predefined for the transfer Job, and it must be specified exactly when you create your compute class.

## Costs

Although there is no direct cost for using GKE Volume Populator, storage and data transfers incur billing charges. The associated indirect costs include the following:

*   **Compute Engine instances used by GKE**: the cost of the nodes used to run the data transfer Jobs. The node management and cost implications vary by cluster types. For more information, see the respective cluster types in Create your GKE cluster.
*   **Transfer Job node size**: for optimal transfer performance, a transfer Job by default scales up a node with 24 vCPUs. This applies to all cluster types. If you want to adjust the node size and type for specific cost or performance optimizations, you can do so when creating your compute class.
*   **Storage used in your Cloud Storage bucket**: for more information, see Cloud Storage pricing.
*   **Hyperdisk ML volume costs**: this includes the storage capacity and performance (IOPS/throughput) of the Hyperdisk ML volumes you create. For more information, see Hyperdisk pricing.

## Prepare your environment

In this section, you create your GKE cluster infrastructure with appropriate hardware, and set up necessary permissions to access your data in Cloud Storage.

Before creating your cluster to use GKE Volume Populator with Hyperdisk ML, understand how a compute class is applied to different types of clusters, and who is responsible for the node management--GKE or you.

### How compute classes work with different cluster types for Hyperdisk ML

GKE Volume Populator uses a custom compute class to determine the types of nodes to use for the data transfer Jobs. The following table describes the behavior of your compute class depending on your cluster configuration:

Consideration

GKE Autopilot, and GKE Standard _with_ node auto-provisioning

GKE Standard _without_ node auto-provisioning

**Compute class setting**

`nodePoolAutoCreation` enabled

`nodePoolAutoCreation` disabled

**Node management**

GKE automatically creates and manages nodes.

You manually create and manage nodes.

**Node scaling**

Automatic

Manual

**Node labeling**

Not applicable

You must label the nodes with `cloud.google.com/compute-class=gcs-to-hdml-compute-class`

**More information**

Node auto-provisioning and compute classes

Configure manually-created node pools

GKE initiates the data transfer Job after provisioning the `PersistentVolume` for the `PersistentVolumeClaim`. To populate the Hyperdisk ML volume, this `PersistentVolumeClaim` must reference the `GCPDataSource`, which defines the source data in Cloud Storage.

### Create your GKE cluster

You can choose to deploy your data transfer pipeline by using a Standard or Autopilot cluster with GKE version `1.33.2-gke.4780000` or later. Each cluster type has its own advantages and different pricing models.

*   Choose Autopilot for easier cluster management, cost efficiency, and autoscaling.
*   Choose Standard _with_ node auto-provisioning enabled if you need autoscaling with more control over node provisioning.
*   Choose Standard _without_ node auto-provisioning enabled if you need maximum control and are comfortable managing all aspects of node provisioning, scaling, and maintenance.

### Autopilot

In GKE Autopilot clusters, GKE automatically handles the creation and deletion of nodes required for the data transfer Jobs. When the transfer Job is complete, the node resources are automatically scaled down. You don't need to manually delete the transfer Pods or the nodes that the Pods ran on.

To create a new Autopilot cluster, run the following command:

    gcloud container clusters create-auto CLUSTER_NAME \
        --location=LOCATION \
        --cluster-version=CLUSTER_VERSION
    

Replace the following:

*   `CLUSTER_NAME`: the name for the cluster that you're creating.
*   `LOCATION`: the compute region for your cluster. For example, `us-central1`.
*   `CLUSTER_VERSION`: the GKE version for the cluster. Use `1.33.2-gke.4780000` in this guide.

### Standard (with node auto-provisioning)

In GKE Standard clusters _with_ node auto-provisioning enabled, GKE automatically handles the creation and deletion of nodes required for the data transfer Jobs. When the transfer Job is complete, the node resources are automatically scaled down. You don't need to manually delete the transfer Pods or the nodes that the Pods ran on.

To create a new Standard cluster with node auto-provisioning enabled, run the following command:

    gcloud container clusters create CLUSTER_NAME \
        --cluster-version=CLUSTER_VERSION \
        --location=LOCATION \
        --project=PROJECT_ID \
        --workload-pool=PROJECT_ID.svc.id.goog \
        --enable-autoprovisioning \
        --min-cpu MINIMUM_CPU \
        --min-memory MINIMUM_MEMORY \
        --max-cpu MAXIMUM_CPU \
        --max-memory MAXIMUM_MEMORY \
    --autoprovisioning-scopes=https://www.googleapis.com/auth/logging.write,https://www.googleapis.com/auth/monitoring,https://www.googleapis.com/auth/devstorage.read_only
    

Replace the following:

*   `CLUSTER_NAME`: the name for the cluster that you're creating with node auto-provisioning enabled.
*   `CLUSTER_VERSION`: the GKE version for the cluster. Use `1.33.2-gke.4780000` in this guide.
*   `LOCATION`: the compute zone or region for your cluster. For example, `us-central1-a` or `us-central1`.
*   `PROJECT_ID`: your Google Cloud project ID.
*   `MINIMUM_CPU`: the minimum number of vCPUs to auto-provision. For example, `10`.
*   `MINIMUM_MEMORY`: the minimum amount of memory in GiB to auto-provision. For example, `200`.
*   `MAXIMUM_CPU`: the maximum number of vCPUs to auto-provision. For example, `100`. This limit is the total of the CPU resources across all existing manually created node pools and all the node pools that GKE might automatically create.
*   `MAXIMUM_MEMORY`: the maximum amount of memory to auto-provision. For example, `1000`. This limit is the total of the memory resources across all existing, manually created node pools and all the node pools that GKE might automatically create.

### Standard (without node auto-provisioning)

To use GKE Volume Populator on a Standard cluster where node auto-provisioning is not enabled, you can use an existing node pool or create a dedicated transfer node pool. The nodes must have capacity to run the transfer Jobs and labels matching the `compute-class`.

Specify the `gcs-to-hdml-compute-class` compute class as a node label when you create your cluster and node pool. Note that the compute class name, `gcs-to-hdml-compute-class`, is predefined for the transfer Job, and it must be specified exactly.

To create a new Standard cluster without node auto-provisioning, and a new node pool within that cluster, run the following commands:

    gcloud container clusters create CLUSTER_NAME \
        --cluster-version=CLUSTER_VERSION \
        --location=LOCATION \
        --num-nodes=1 \
        --project=PROJECT_ID \
        --workload-pool=PROJECT_ID.svc.id.goog

    gcloud container node-pools create NODE_POOL_NAME\
        --cluster=CLUSTER_NAME \
        --location=LOCATION \
        --num-nodes=1 \
        --machine-type=c3-standard-44 \
        --node-labels="cloud.google.com/compute-class=gcs-to-hdml-compute-class" \
        --node-taints="cloud.google.com/compute-class=gcs-to-hdml-compute-class:NoSchedule"
    

Replace the following:

*   `CLUSTER_NAME`: the name for the cluster that you're creating without node auto-provisioning enabled.
*   `CLUSTER_VERSION`: the GKE version for the cluster. Use `1.33.2-gke.4780000` in this guide.
*   `LOCATION`: the compute region for your cluster. For example, `us-central1-a` or `us-central1`.
*   `PROJECT_ID` your Google Cloud project ID.
*   `NODE_POOL_NAME`: the name for the node pool that you're creating in your new cluster. This node pool is used by the GKE Volume Populator to deploy the temporary data transfer Jobs.

To avoid incurring unnecessary costs, run the `gcloud container node-pools delete` command to delete any manually created transfer node pools after the data transfer is complete.

### Create your compute class

To create a compute class to specify and prioritize the types of VMs that can be used as nodes in your cluster, follow these steps:

1.  Save the following manifest as `computeclass.yaml`:
    
    ### With node auto-provisioning
    
    For Autopilot clusters, and Standard clusters with node auto-provisioning enabled, define your compute class _with_ the `nodePoolAutoCreation` section as follows. When node auto-provisioning is enabled, GKE automatically creates new node pools with the `gcs-to-hdml-compute-class` compute class label.
    
        apiVersion: cloud.google.com/v1
        kind: ComputeClass
        metadata:
          name: gcs-to-hdml-compute-class
        spec:
          priorities:
          - machineFamily: c3
          - machineFamily: c3d
          nodePoolAutoCreation:
            enabled: true
          whenUnsatisfiable: DoNotScaleUp
        
    
    ### Without node auto-provisioning
    
    For Standard clusters without node auto-provisioning enabled, define your compute class _without_ the `nodePoolAutoCreation` section as follows. Make sure that you've already created a node pool with the `gcs-to-hdml-compute-class` compute class label.
    
        apiVersion: cloud.google.com/v1
        kind: ComputeClass
        metadata:
          name: gcs-to-hdml-compute-class
        spec:
          priorities:
          - machineFamily: c3
          - machineFamily: c3d
          whenUnsatisfiable: DoNotScaleUp
        
    
    You can specify any compatible `machineFamily` to meet your data transfer needs. For more information about selecting a suitable machine type, see Machine series support for Hyperdisk ML.
    
2.  To create the compute class, apply the manifest:
    
    kubectl apply -f computeclass.yaml
    

### Set up necessary permissions

To transfer data from a Cloud Storage bucket, set up required permissions for Workload Identity Federation for GKE. With the appropriate permissions, the transfer Job created by GKE Volume Populator can access your Cloud Storage bucket. This guide assumes that you already have a Cloud Storage bucket populated with the model training data that you want to transfer.

1.  Create a Kubernetes namespace:
    
    ```
    kubectl create namespace NAMESPACE
    ```
    
    Replace `NAMESPACE` with the namespace that you want your workloads to run on.
    
    Skip this step if you are using an existing namespace.
    
    **Note:** Make sure to use the same namespace to create all the resources in this guide.
    
2.  Create a Kubernetes service account:
    
    ```
    kubectl create serviceaccount KSA_NAME \
        --namespace=NAMESPACE
    ```
    
    Replace the following:
    
    *   `KSA_NAME`: the name of the Kubernetes service account that you'll specify in the `GCPDataSource` resource. The transfer Job created by GKE Volume Populator uses this service account to authenticate to Google Cloud APIs.
    *   `NAMESPACE`: the Kubernetes namespace you created in the previous step.
    
    **Caution:** Re-using this Kubernetes service account in other workloads within the same namespace allows that Pod to access the Cloud Storage bucket that you are using in this guide. We don't recommend re-using this service account for other workloads in the namespace.
    
3.  Grant your IAM service account) the appropriate role to access your Cloud Storage bucket:
    
    ```
    gcloud storage buckets \
        add-iam-policy-binding gs://GCS_BUCKET \
        --member "principal://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/PROJECT_ID.svc.id.goog/subject/ns/NAMESPACE/sa/KSA_NAME" \
        --role "ROLE"
    ```
    
    Replace the following:
    
    *   `GCS_BUCKET`: your Cloud Storage bucket name.
    *   `PROJECT_NUMBER`: the numerical identifier of your Google Cloud project where you created the cluster. To find your project number, see Identifying projects.
    *   `PROJECT_ID`: your Google Cloud project ID.
    *   `NAMESPACE`: the namespace you created earlier where your workloads will run.
    *   `KSA_NAME`: the name of the Kubernetes service account that you specified in the `GCPDataSource` resource. The transfer Job created by GKE Volume Populator uses this service account to authenticate to Google Cloud APIs.
    *   `ROLE`: the IAM role you want to grant to your service account. For the purpose of this guide, grant the `roles/storage.objectViewer` role to allow reading from the bucket.
    
    The `PROJECT_NUMBER`, `PROJECT_ID`, `NAMESPACE`, and `KSA_NAME` are used to construct the Workload Identity Federation for GKE principal identifier for your project.
    

## Create a Hyperdisk ML volume with preloaded data

Perform the following steps to set up the GKE infrastructure and configuration that's required to create a Hyperdisk ML volume, and to trigger and manage the automated data transfer process by using GKE Volume Populator:

1.  Create a `GCPDataSource` custom resource to define the source of the data.
2.  Create a StorageClass to define the type of persistent storage (a Hyperdisk ML volume) to be used.
3.  Create a PersistentVolumeClaim to enable dynamic provisioning of the storage, and enable access to the newly provisioned Hyperdisk ML volume.
4.  (Optional) View the data transfer progress.
5.  Create and deploy a Pod that consumes the Hyperdisk ML volume.

### Create a GCPDataSource custom resource

Create a `GCPDataSource` custom resource in GKE to specify the location of the source Cloud Storage bucket and the service account with the necessary permissions to access that bucket. This custom resource definition (CRD) is specific to the GKE Volume Populator.

1.  Save the following manifest as `gcpdatasource.yaml`.
    
    ```
    apiVersion: datalayer.gke.io/v1
    kind: GCPDataSource
    metadata:
      name: GCP_DATA_SOURCE
      namespace: NAMESPACE
    spec:
      cloudStorage:
        serviceAccountName: KSA_NAME
        uri: gs://GCS_BUCKET/
    ```
    
    Replace the following values:
    
    *   GCP_DATA_SOURCE: the name of the `GCPDataSource` CRD that holds a reference to your Cloud Storage bucket. For more information, se`GCPDataSource` CRD reference.
    *   NAMESPACE: the same namespace in which your workloads run. The `GCPDataSource` custom resource is created in this namespace.
    *   KSA_NAME: the name of the Kubernetes service account that you specified in the `GCPDataSource` resource. The transfer Job created by GKE Volume Populator uses this service account to authenticate to Google Cloud APIs. The `cloudStorage.serviceAccountName` value is the Kubernetes service account you set up for Workload Identity Federation for GKE in the Set up necessary permissions section.
    *   GCS_BUCKET: your Cloud Storage bucket name. The `uri` field specifies the source data.
        *   To copy the entire bucket, use `gs://GCS_BUCKET/`.
        *   To copy data from a specific folder within the bucket, use the format `gs://GCS_BUCKET/PATH_INSIDE_BUCKET/`. For example, to copy data from the `gemma/v1.0/weights/` folder inside the `my-project-llm-models` bucket, the URI would be `gs://my-project-llm-models/gemma/v1.0/weights/`. Ensure that the path ends with a trailing slash to indicate a folder.
2.  To create the `GCPDataSource` resource, apply the manifest:
    
    ```
    kubectl apply -f gcpdatasource.yaml
    ```
    

**Caution:** When cleaning up the resources, don't delete the `GCPDataSource` custom resource before you delete the `PersistentVolumeClaim` that refers to it. Deleting the `GCPDataSource` resource first will cause the `PersistentVolumeClaim` deletion to get stuck.

### Create a Hyperdisk ML StorageClass

Create a StorageClass that uses the pd.csi.storage.gke.io provisioner to provision a Hyperdisk ML volume in your chosen zone. If you want copies of your data to be accessible in more than one zone, you can create a multi-zone StorageClass. Here's an example of a multi-zone StorageClass.

1.  Save the following manifest as `hdml-class.yaml`.
    
    ```
    apiVersion: storage.k8s.io/v1
    kind: StorageClass
    metadata:
      name: hyperdisk-ml-single-zone
    parameters:
      type: hyperdisk-ml
      provisioned-throughput-on-create: "2400Mi"
    provisioner: pd.csi.storage.gke.io
    allowVolumeExpansion: false
    reclaimPolicy: Delete
    volumeBindingMode: Immediate
    allowedTopologies:
    - matchLabelExpressions:
      - key: topology.gke.io/zone
        values:
        - ZONE
    ```
    
    Replace `ZONE` with the target zone where you want the Hyperdisk ML volume to be created:
    
    *   For GKE Standard cluster without node auto-provisioning, the value for `ZONE` must be the location where you created your nodes.
    *   For GKE Autopilot or Standard clusters with node auto-provisioning, the value for `ZONE` must be the location where your cluster can scale up and create new nodes if required.
2.  (Optional) To list the node locations of your cluster, run the following command:
    
    ```
    gcloud container clusters describe CLUSTER_NAME --location=LOCATION --format="value(locations)"
    ```
    
    Replace the following:
    
    *   `CLUSTER_NAME`: the name of your cluster.
    *   `LOCATION`: the compute zone or region for your cluster. For example, `us-central1-a` or `us-central1`.
3.  To create the StorageClass, apply the manifest :
    
    ```
    kubectl apply -f hdml-class.yaml
    ```
    

### Create a PersistentVolumeClaim to access the volume

The following manifest shows an example of how to create a PersistentVolumeClaim in ReadOnlyMany access mode that references the StorageClass you created earlier.

1.  Save the following manifest as `volume-populator-pvc.yaml`:
    
    ```
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: PVC_NAME
      namespace: NAMESPACE
    spec:
      accessModes:
      - ReadOnlyMany
      storageClassName: hyperdisk-ml-single-zone
      resources:
        requests:
          storage: DISK_SIZE
      dataSourceRef:
        apiGroup: datalayer.gke.io
        kind: GCPDataSource
        name: GCP_DATA_SOURCE
    ```
    
    Replace the following values:
    
    *   `PVC_NAME`: the name of the PersistentVolumeClaim where you want to transfer your data.
    *   `NAMESPACE`: the namespace where your workloads will run.
    *   `DISK_SIZE`: the size of the disk, in gigabytes, that will be created to populate data. To successfully populate data, make sure that the requested disk size is greater than the size of your model's data that's in the Cloud Storage bucket. To conform to the supported range for the Hyperdisk ML volumes, the value of `DISK_SIZE` must be larger than 4 Gi. For more information, see Hyperdisk volume size limits.
    *   `GCP_DATA_SOURCE`: the name of the `GCPDataSource` CRD that holds a reference to your Cloud Storage bucket.
    
    You can customize the data transfer by adding optional annotations to your PVC. These annotations influence the behavior of the underlying transfer Job that copies data to your Hyperdisk ML volume.
    
    *   `volume-populator.datalayer.gke.io/cpu-request`: Use this annotation to specify a different CPU resource request for the transfer `Job`. If you don't specify a different CPU resource request, the PVC requests 24 vCPUs by default to optimize for transfer performance.
        
    *   `volume-populator.datalayer.gke.io/transfer-path`: Use this annotation to specify the destination path inside the new volume that will store the data copied from your `GCPDataSource` resource. If you don't specify a different path, the data is copied to the root path within the Hyperdisk ML volume.
        
2.  To create the PVC, apply the manifest:
    
    ```
    kubectl apply -f volume-populator-pvc.yaml
    ```
    

Note the following points:

*   If you set the `volumeBindingMode` field in your StorageClass to `immediate`, the data transfer is triggered immediately upon deploying the PVC.
*   If you set the `volumeBindingMode` field in your StorageClass to `WaitForFirstConsumer`, the data transfer is triggered only after you deploy a Pod that requests the PVC and that Pod is successfully scheduled to a node. Although your Pod can be scheduled, its containers will wait to start until the data transfer completes and the volume is ready for use.

To check the progress of your data transfer, see View the data transfer progress. If you encounter errors during resource provisioning or data transfer, see Troubleshooting GKE Volume Populator data transfer issues.

### (Optional) View the data transfer progress

This section shows how you can track the progress and success of your data transfers from a Cloud Storage bucket to a Hyperdisk ML volume.

1.  To verify the status of your PersistentVolumeClaim, run the following command. You can also run this command if your PersistentVolumeClaim binding operation takes too long to complete.
    
    ```
    kubectl describe pvc PVC_NAME -n NAMESPACE
    ```
    
    Replace the following:
    
    *   `PVC_NAME`: the name of your PVC that you created in the Create a PersistentVolumeClaim to access the volume section.
    *   `NAMESPACE`: the namespace used throughout this guide, which you created in the Set up Necessary permissions section.
2.  In the output, review the PersistentVolumeClaim events to monitor the data transfer progress. GKE logs the events approximately once a minute. The output is similar to the following:
    
    ```
    Name:          vp-pvc
    Namespace:     default
    StorageClass:  hyperdisk-ml-single-zone
    Status:        Bound
    Volume:        pvc-f7ae2ee2-106d-4b87-b458-481a3ff82b62
    Labels:        <none>
    Annotations:   pv.kubernetes.io/bind-completed: yes
                  pv.kubernetes.io/bound-by-controller: yes
                  volume.beta.kubernetes.io/storage-provisioner: pd.csi.storage.gke.io
                  volume.kubernetes.io/storage-provisioner: pd.csi.storage.gke.io
    Finalizers:    [kubernetes.io/pvc-protection]
    Capacity:      200Gi
    Access Modes:  ROX
    VolumeMode:    Filesystem
    DataSource:
      APIGroup:  datalayer.gke.io
      Kind:      GCPDataSource
      Name:      vp-gds
    Used By:     verify-data-665cfd4dbf-mwc7t
                verify-data-665cfd4dbf-n7xw9
    Events:
      Type     Reason                         Age                     From                                                                                              Message
      ----     ------                         ----                    ----                                                                                              -------
      Warning  ProvisioningFailed             9m8s                    persistentvolume-controller                                                                       Error saving claim: Operation cannot be fulfilled on persistentvolumeclaims "vp-pvc": the object has been modified; please apply your changes to the latest version and try again
      Normal   Provisioning                   9m5s                    pd.csi.storage.gke.io_gke-f110123a1cbd44cdaa7a-921b-b1f4-vm_1a100bd9-5231-4f20-8e65-1f8e995a03c0  External provisioner is provisioning volume for claim "default/vp-pvc"
      Normal   Provisioning                   9m5s                    external-provisioner                                                                              Assuming an external populator will provision the volume
      Normal   PopulateOperationStartSuccess  8m58s                   gkevolumepopulator-populator                                                                      populateFn: Populate operation started for zone us-central1-c
      Normal   TransferInProgress             8m58s (x2 over 8m58s)   gkevolumepopulator-populator                                                                      populateCompleteFn: For PVC vp-pvc in namespace default, transfer job with request ID populator-job-2304531e-4937-4534-a1a4-3eb11e5cb39f in zone us-central1-c waiting for pod to get created
      Normal   TransferInProgress             6m10s (x14 over 8m57s)  gkevolumepopulator-populator                                                                      populateCompleteFn: For PVC vp-pvc in namespace default, transfer job in zone us-central1-c with request ID populator-job-2304531e-4937-4534-a1a4-3eb11e5cb39f is still active with pod status as - Phase: Pending
      Normal   ExternalProvisioning           3m35s (x24 over 9m5s)   persistentvolume-controller                                                                       Waiting for a volume to be created either by the external provisioner 'pd.csi.storage.gke.io' or manually by the system administrator. If volume creation is delayed, please verify that the provisioner is running and correctly registered.
      Normal   TransferJobCompleted           3m24s (x2 over 3m26s)   gkevolumepopulator-populator                                                                      populateCompleteFn: For PVC vp-pvc in namespace default, job with request ID populator-job-2304531e-4937-4534-a1a4-3eb11e5cb39f for zone us-central1-c completed successfully
      Normal   TransferJobCompleted           3m24s (x2 over 3m26s)   gkevolumepopulator-populator                                                                      populateCompleteFn: For PVC vp-pvc in namespace default, transfer job for all zones have completed successfully
      Normal   PopulateOperationFinished      3m24s (x2 over 3m26s)   gkevolumepopulator-populator                                                                      Populate operation finished
      Normal   PopulatorFinished              3m19s (x3 over 3m20s)   gkevolumepopulator-populator                                                                      Populator finished
    ```
    

It can take several minutes for the populate operation to start, depending on the data size. If you don't see any data transfer progress after several minutes, see Troubleshooting GKE Volume Populator data transfer issues for help.

For multi-zone Hyperdisk ML volume data transfers, the Job is marked complete only if the data is successfully transferred to _all_ the zones specified in the StorageClass. If the transfer Job fails for one or more zones, the GKE Volume Populator retries transferring the data indefinitely as long as the PVC exists.

### Create and deploy a Pod that consumes the volume

To create a Pod to verify the contents of a PVC that has been populated with data:

1.  Save the following manifest as `verify-data.yaml`:
    
    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: verify-data
      namespace: NAMESPACE
    spec:
      nodeSelector:
        cloud.google.com/compute-class: gcs-to-hdml-compute-class
      containers:
      - name: verify-data
        image: busybox
        command:
        - sleep
        - infinity
        volumeMounts:
          - mountPath: /models
            name: mypvc
      volumes:
      - name: mypvc
        persistentVolumeClaim:
          claimName: PVC_NAME
    ```
    
    Replace the following:
    
    *   `NAMESPACE`: the namespace where your PVC is located and where you want to create the `verify-data` Pod.
    *   `PVC_NAME`: the name of the PVC you created for data population in the Create a PersistentVolumeClaim to access the volume section.
2.  Create the Pod with the following command:
    
    ```
    kubectl create -f verify-data.yaml
    ```
    
3.  To list the files, run the following command:
    
    ```
    kubectl exec -it verify-data -- /bin/sh
    # cd /models && ls
    ```
    

If the command is successful, you can find the populated data in the `/models` directory within your Cloud Storage bucket.

## Clean up

To avoid unnecessary costs and remove any misconfigured or orphaned resources, follow the steps to gracefully delete the PersistentVolumeClaim.

### Delete the PersistentVolumeClaim during dynamic provisioning

If you need to delete your PersistentVolumeClaim while data is still being transferred during dynamic provisioning, use the following steps for graceful deletion. Graceful deletion can take some time to complete.

Replace the following relevant variables during the deletion process:

*   `POD_NAME`: the name of the Pod you created in the Create and deploy a Pod that consumes the volume section.
*   `NAMESPACE`: the namespace where your PVC is located.
*   `PVC_NAME`: the name of the PVC you created in the Create a PersistentVolumeClaim to access the volume section.
*   `GCP_DATA_SOURCE`: the name of the `GCPDataSource` custom resource you created in the Create a `GCPDataSource` custom resource section.

1.  Delete the workload Pod:
    
    ```
    kubectl delete pod POD_NAME -n NAMESPACE
    ```
    
2.  Find the name of the temporary PersistentVolumeClaim:
    
    ```
    # Store the relevant environment variables
    export PVC_NAME=PVC_NAME
    export NAMESPACE=NAMESPACE
    ```
    
    ```
    # Check the status
    export PVC_UID=$(kubectl get pvc ${PVC_NAME} -n ${NAMESPACE} -o jsonpath='{.metadata.uid}')
    export TEMP_PVC=prime-${PVC_UID}
    echo ${TEMP_PVC}
    ```
    
3.  Delete the PVC that was created in the namespace:
    
    ```
    kubectl delete pvc PVC_NAME -n NAMESPACE
    ```
    
4.  The PVC might be stuck in the `Terminating` state:
    
    ```
    NAME           STATUS        VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS               VOLUMEATTRIBUTESCLASS   AGE
    vp-pvc   Terminating                                      hyperdisk-ml   <unset>                 7m23s
    ```
    
    If so, manually clean up the PVC by removing its finalizers:
    
    ```
    kubectl patch pvc PVC_NAME -n NAMESPACE  -p '{"metadata":{"finalizers":null}}'
    ```
    
5.  Delete the `GCPDataSource` resource only after the PVC is deleted. Deleting the `GCPDataSource` resource first will cause the PVC deletion to get stuck.
    
    ```
    kubectl delete gcpdatasource GCP_DATA_SOURCE -n NAMESPACE
    ```
    
6.  Check that the temporary resources are deleted.
    

## What's next

*   Learn About GKE Volume Populator.
*   For help with data transfer issues, see Troubleshooting GKE Volume Populator data transfer issues.
*   For an advanced Hyperdisk ML workload example, see Accelerate AI/ML data loading with Hyperdisk ML.

Send feedback