# Access existing Managed Lustre instances on GKE using the Managed Lustre CSI driver

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   Guides

Send feedback

# Access existing Managed Lustre instances on GKE using the Managed Lustre CSI driver Stay organized with collections Save and categorize content based on your preferences.

Autopilot Standard

This guide describes how you can connect to an existing Managed Lustre instance by using the Managed Lustre CSI driver. This lets you access existing Managed Lustre instances as volumes for your stateful workloads, in a controlled and predictable way.

### Multi-NIC support for high-performance networking

For GKE clusters running version `1.35.2-gke.1842000` or later, the Managed Lustre CSI driver is enabled by default to use all available Network Interface Cards (NICs) for increased throughput. This support aggregates bandwidth by spreading TCP storage traffic across your network interfaces.

To use multi-NIC support, your nodes must meet the following requirements:

*   **Standard NICs for TCP:** your nodes must use standard NICs, such as Google Virtual NIC (gVNIC) or VirtIO-Net, to handle TCP storage traffic.
*   **Same VPC:** all standard NICs must reside in the same VPC network.
*   **RDMA considerations:** your nodes can also have RDMA NICs attached; however, the Managed Lustre CSI driver only uses the standard NICs for TCP storage traffic.

If you want to disable the multi-NIC support, see Disable multi-NIC for Lustre.

### Lustre communication ports

The GKE Managed Lustre CSI driver uses different ports for communication with Managed Lustre instances, depending on your GKE cluster version and existing Managed Lustre configurations.

*   **Default port (Recommended):** for new GKE clusters that run version `1.33.2-gke.4780000` or later, the driver uses port `988` for Lustre communication by default.
    
*   **Legacy Port (Deprecated):** use port `6988` by appending the `--enable-legacy-lustre-port` flag to your `gcloud` commands in the following scenarios:
    
    *   **Earlier GKE versions:** if your GKE cluster runs a version earlier than `1.33.2-gke.4780000`, the `--enable-legacy-lustre-port` flag works around a port conflict with the `gke-metadata-server` on GKE nodes.
    *   **Existing Lustre instances:** if you are connecting to an existing Managed Lustre instance that was created with the `gke-support-enabled` flag, you _must_ still include `--enable-legacy-lustre-port` in your `gcloud` commands, irrespective of your cluster version. Without this flag, your GKE cluster will fail to mount the existing Lustre instance.

You can configure the new and existing clusters to use either the default port `988`, or the legacy port `6988`.

## Before you begin

Before you start, make sure that you have performed the following tasks:

*   Enable the Google Cloud Managed Lustre API and the Google Kubernetes Engine API.
Enable APIs*   If you want to use the Google Cloud CLI for this task, install and then initialize the gcloud CLI. If you previously installed the gcloud CLI, get the latest version by running the `gcloud components update` command. Earlier gcloud CLI versions might not support running the commands in this document.
    
    **Note:** For existing gcloud CLI installations, make sure to set the `compute/region` property. If you use primarily zonal clusters, set the `compute/zone` instead. By setting a default location, you can avoid errors in the gcloud CLI like the following: `One of [--zone, --region] must be supplied: Please specify location`. You might need to specify the location in certain commands if the location of your cluster differs from the default that you set.
    

*   For limitations and requirements, see About the Google Cloud Managed Lustre CSI driver.
*   Make sure to enable the Managed Lustre CSI driver. It is disabled by default in Standard and Autopilot clusters.

### Set up environment variables

Set up the following environment variables:

```
export CLUSTER_NAME=CLUSTER_NAME
export PROJECT_ID=PROJECT_ID
export NETWORK_NAME=LUSTRE_NETWORK
export LOCATION=ZONE
```

Replace the following:

*   `CLUSTER_NAME`: the name of the cluster.
*   `PROJECT_ID`: your Google Cloud project ID.
*   `LUSTRE_NETWORK`: the shared Virtual Private Cloud network where both the GKE cluster and Managed Lustre instance reside.
*   `ZONE`: the geographical zone of your GKE cluster; for example, `us-central1-a`.

## Configure the Managed Lustre CSI driver

This section covers how you can enable and disable the Managed Lustre CSI driver.

### Enable the Managed Lustre CSI driver on a new GKE cluster

The following sections describe how to enable the Managed Lustre CSI driver on a new GKE cluster.

#### Use the default port 988

To enable the Managed Lustre CSI driver when creating a new GKE cluster that runs version `1.33.2-gke.4780000` or later, run the following command:

### Autopilot

```
gcloud container clusters create-auto "${CLUSTER_NAME}" \
    --location=${LOCATION} \
    --network="${NETWORK_NAME}" \
    --cluster-version=${CLUSTER_VERSION} \
    --enable-lustre-csi-driver
```

### Standard

```
gcloud container clusters create "${CLUSTER_NAME}" \
    --location=${LOCATION} \
    --network="${NETWORK_NAME}" \
    --cluster-version=${CLUSTER_VERSION} \
    --addons=LustreCsiDriver
```

#### Use the legacy port 6988

To enable the Managed Lustre CSI driver when creating a new GKE cluster that runs a version earlier than `1.33.2-gke.4780000`, run the following command:

### Autopilot

```
gcloud container clusters create-auto "${CLUSTER_NAME}" \
    --location=${LOCATION} \
    --network="${NETWORK_NAME}" \
    --cluster-version=${CLUSTER_VERSION} \
    --enable-lustre-csi-driver \
    --enable-legacy-lustre-port
```

### Standard

```
gcloud container clusters create "${CLUSTER_NAME}" \
    --location=${LOCATION} \
    --network="${NETWORK_NAME}" \
    --cluster-version=${CLUSTER_VERSION} \
    --addons=LustreCsiDriver \
    --enable-legacy-lustre-port
```

### Enable the Managed Lustre CSI driver on existing GKE clusters

The following sections describe how to enable the Managed Lustre CSI driver on existing GKE clusters.

#### Use the default port 988

To enable the Managed Lustre CSI driver on an existing GKE cluster that runs version `1.33.2-gke.4780000` or later, run the following command:

  ```
  gcloud container clusters update ${CLUSTER_NAME} \
      --location=${LOCATION} \
      --update-addons=LustreCsiDriver=ENABLED
```

#### Use the legacy port 6988

To enable the Managed Lustre CSI driver on an existing GKE cluster, you might need to use the legacy port `6988` by adding the `--enable-legacy-lustre-port` flag. This flag is required in the following scenarios:

*   If your GKE cluster runs on a version _earlier than `1.33.2-gke.4780000`_.
*   If you intend to connect this cluster to an existing Managed Lustre instance that was created with the `gke-support-enabled` flag.
    
    ```
    gcloud container clusters update ${CLUSTER_NAME} \
        --location=${LOCATION} \
        --enable-legacy-lustre-port
    ```
    

**Note:** If you enable the CSI driver on an existing cluster and later upgrade your cluster to `1.33.2-gke.4780000` or newer, you might still need this flag if you continue to connect to `gke-support-enabled` Lustre instances.

### Node upgrade required on existing clusters

Enabling the Managed Lustre CSI driver on existing clusters can trigger node re-creation in order to update the necessary kernel modules for the Managed Lustre client. For immediate availability, we recommend manually upgrading your node pools.

GKE clusters on a release channel upgrade according to their scheduled rollout, which can take several weeks depending on your maintenance window. If you're on a static GKE version, you need to manually upgrade your node pools.

Until the node upgrade fully completes, the CSI driver Pod might crashloop on nodes pending update. If you see an `Operation not permitted` error in the CSI driver Pod logs, this indicates that node upgrade or recreation is required.

After the node pool upgrade, CPU nodes might appear to be using a GPU image in the Google Cloud console or CLI output. This behavior is expected. The GPU image is being reused on CPU nodes to securely install the Managed Lustre kernel modules. You won't be charged for GPU usage.

### (Optional) Create a multi-NIC node pool

To use high-performance networking, you must create a node pool with an instance type that supports multiple network interfaces. The multi-NIC support is enabled by default on GKE clusters that run version `1.35.2-gke.1842000` or later. Ensure that your secondary network interfaces reside within the same VPC network as your primary interface.

Run the following command:

```
gcloud container node-pools create NODE_POOL_NAME \
    --cluster=CLUSTER_NAME \
    --location=LOCATION \
    --machine-type=MACHINE_TYPE \
    --enable-gvnic \
    --additional-node-network network=NETWORK_NAME,subnetwork=SECONDARY_SUBNET
```

Replace the following:

*   `NODE_POOL_NAME`: the name of your node pool.
*   `CLUSTER_NAME`: the name of your cluster.
*   `LOCATION`: the region or zone of your cluster.
*   `MACHINE_TYPE`: the machine type for the node pool, such as `a3-megagpu-8g` which is often used with multi-NIC for high-performance. Multi-NIC is supported on any machine type.
*   `NETWORK_NAME`: the VPC network name.
*   `SECONDARY_SUBNET`: the name of the secondary subnet.

### Disable multi-NIC on Lustre

While multi-NIC support is recommended for high-performance workloads, you might want to disable it in specific scenarios. For example, you might not want to spread Lustre traffic across all available hardware interfaces, or you might need to isolate connectivity issues to a single network path for troubleshooting.

**Note:** If you disable multi-NIC support on running nodes, you might need to recreate or manually upgrade your node pools for this change to take effect.

### For a cluster

To disable high-performance networking for the entire cluster, use the `--disable-multi-nic-lustre` flag when creating or updating the cluster. For example:

```
gcloud container clusters update CLUSTER_NAME \
    --location=LOCATION \
    --disable-multi-nic-lustre
```

Replace the following:

*   `CLUSTER_NAME`: the name of your cluster.
*   `LOCATION`: the region or zone of your cluster.

### For a node pool

To disable high-performance networking for a specific node pool, update the node pool to set the `lustre.csi.storage.gke.io/multi-nic` label to `false`:

```
gcloud container node-pools update NODE_POOL_NAME \
--cluster=CLUSTER_NAME \
--zone=LOCATION \
--node-labels=lustre.csi.storage.gke.io/multi-nic=false
```

Replace the following:

*   `NODE_POOL_NAME`: the name of your node pool.
*   `CLUSTER_NAME`: the name of your cluster.
*   `LOCATION`: the zone of your cluster.

### Disable the Managed Lustre CSI driver

You can disable the Managed Lustre CSI driver on an existing GKEcluster by using the Google Cloud CLI.

**Warning:** Disabling the Managed Lustre CSI driver can disrupt workloads that have Managed Lustre file systems mounted.

```
gcloud container clusters update ${CLUSTER_NAME} \
    --location=${LOCATION} \
    --update-addons=LustreCsiDriver=DISABLED
```

After the CSI driver is disabled, GKE automatically recreates your nodes and uninstalls the Managed Lustre kernel modules.

## Access an existing Managed Lustre instance using the Managed Lustre CSI driver

If you already provisioned a Managed Lustre instance within the same network as your GKE cluster, you can follow these instructions to statically provision a PersistentVolume that refers to your instance.

The following sections describe the typical process for accessing an existing Managed Lustre instance by using the Managed Lustre CSI driver:

1.  Create a PersistentVolume that refers to the Managed Lustre instance.
2.  Use a PersistentVolumeClaim to access the volume.
3.  Create a workload that consumes the volume.

### Create a PersistentVolume

1.  To locate your Managed Lustre instance, run the following command.
    
    ```
    gcloud lustre instances list \
        --project=${PROJECT_ID} \
        --location=${LOCATION}
    ```
    
    The output should look similar to the following. Before you proceed to the next step, make sure to note down the **Managed Lustre instance name**, **filesystem**, and the **mountPoint** fields.
    
    ```
    capacityGib: '9000'
    createTime: '2025-04-28T22:42:11.140825450Z'
    filesystem: testlfs
    gkeSupportEnabled: true
    mountPoint: 10.90.1.4@tcp:/testlfs
    name: projects/my-project/locations/us-central1-a/instances/my-lustre
    network: projects/my-project/global/networks/default
    perUnitStorageThroughput: '1000'
    state: ACTIVE
    updateTime: '2025-04-28T22:51:41.559098631Z'
    ```
    
2.  Save the following manifest in a file named `lustre-pv.yaml`:
    
    ```
    apiVersion: v1
    kind: PersistentVolume
    metadata:
      name: lustre-pv
    spec:
      storageClassName: "STORAGE_CLASS_NAME"
      capacity:
        storage: 9000Gi
      accessModes:
        - ReadWriteMany
      persistentVolumeReclaimPolicy: Retain
      volumeMode: Filesystem
      claimRef:
        namespace: default
        name: lustre-pvc
      csi:
        driver: lustre.csi.storage.gke.io
        volumeHandle: "PROJECT_ID/LOCATION/INSTANCE_NAME"
        volumeAttributes:
          ip: IP_ADDRESS
          filesystem: FILESYSTEM
    ```
    
    Replace the following:
    
    *   `storageClassName`: the name of your StorageClass. The value can be an empty string, but it must meet the specification of your PersistentVolumeClaim.
    *   `volumeHandle`: the identifier for this volume.
        *   PROJECT_ID: the Google Cloud project ID.
        *   LOCATION: the zonal location of your Lustre instance. You must specify a supported zone for the Managed Lustre CSI driver.
        *   INSTANCE_NAME: the name of your Lustre instance.
    *   `ip`: the IP address of your Lustre instance. You obtain this from the `mountPoint` field in the output of the previous command.
    *   `filesystem`: the file system name of your Managed Lustre instance.
    
    For the full list of fields that are supported in the PersistentVolume object, see the Managed Lustre CSI driver reference documentation.
    
3.  Create the PersistentVolume by running this command:
    
    ```
    kubectl apply -f lustre-pv.yaml
    ```
    

### Use the PersistentVolumeClaim to access the volume

You can create a PersistentVolumeClaim resource that references the Managed Lustre CSI driver's StorageClass.

The following manifest file shows an example of how to create a PersistentVolumeClaim in `ReadWriteMany` access mode , which references the StorageClass you created earlier.

1.  Save the following manifest in a file named `lustre-pvc.yaml`:
    
    ```
    kind: PersistentVolumeClaim
    apiVersion: v1
    metadata:
      name: lustre-pvc
    spec:
      accessModes:
        - ReadWriteMany
      storageClassName: "STORAGE_CLASS_NAME"
      volumeName: lustre-pv
      resources:
        requests:
          storage: STORAGE_SIZE
    ```
    
    Replace STORAGE_SIZE with the storage size; for example, `9000Gi`. It must match the specification in your PersistentVolume.
    
2.  Create the PersistentVolumeClaim by running this command:
    
    ```
    kubectl create -f lustre-pvc.yaml
    ```
    

### Create a workload that consumes the volume

This section shows how to create a Pod that consumes the PersistentVolumeClaim resource you created earlier.

Multiple Pods can share the same PersistentVolumeClaim resource.

1.  Save the following manifest in a file named `my-pod.yaml`.
    
    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: my-pod
    spec:
      containers:
      - name: nginx
        image: nginx
        volumeMounts:
          - name: lustre-volume
            mountPath: /data
      volumes:
      - name: lustre-volume
        persistentVolumeClaim:
          claimName: lustre-pvc
    ```
    
2.  Run the following command to apply the manifest to the cluster:
    
    ```
    kubectl apply -f my-pod.yaml
    ```
    
    The Pod waits until GKE provisions the PersistentVolumeClaim before it starts running. This operation might take several minutes to complete.
    
3.  Verify that the Pod is running:
    
    ```
    kubectl get pods
    ```
    
    It might take a few minutes for the Pod to reach the `Running` state.
    
    The output is similar to the following:
    
    ```
    NAME           READY   STATUS    RESTARTS   AGE
    my-pod         1/1     Running   0          11s
    ```
    

## Use fsGroup with Managed Lustre volumes

You can change the group ownership of the _root level directory_ of the mounted file system to match a user-requested fsGroup specified in the Pod's SecurityContext.

## Troubleshooting

For troubleshooting guidance, see the Troubleshooting page in the Managed Lustre documentation.

## Clean up

To avoid incurring charges to your Google Cloud account, delete the storage resources you created in this guide.

1.  Delete the Pod and PersistentVolumeClaim.
    
    **Note:** When you create the PersistentVolume with a "Retain" persistentVolumeReclaimPolicy, deleting the PersistentVolumeClaim won't remove the PersistentVolume or the underlying Managed Lustre instance.
    
    ```
    kubectl delete pod my-pod
    kubectl delete pvc lustre-pvc
    ```
    
2.  Check the PersistentVolume status. After deleting the Pod and PersistentVolumeClaim, the PersistentVolume should report a "Released" state:
    
    ```
    kubectl get pv
    ```
    
    The output is similar to the following:
    
    ```
    NAME        CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS     CLAIM                 STORAGECLASS   REASON   AGE
    lustre-pv   9000Gi      RWX            Retain        Released   default/preprov-pvc                           2m28s
    ```
    
3.  Reuse the PersistentVolume. To reuse the PersistentVolume, remove the claim reference (`claimRef`):
    
    ```
    kubectl patch pv lustre-pv --type json -p '[{"op": "remove", "path": "/spec/claimRef"}]'
    ```
    
    The PersistentVolume should now report an "Available" status, indicating its readiness to be bound to a new PersistentVolumeClaim. Check the PersistentVolume status:
    
    ```
    kubectl get pv
    ```
    
    The output is similar to the following:
    
    ```
    NAME        CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM   STORAGECLASS   REASON   AGE
    lustre-pv   9000Gi      RWX           Retain         Available                                   19m
    ```
    
4.  Delete the PersistentVolume if it is no longer needed. If the PersistentVolume is no longer needed, delete it:
    
    ```
    kubectl delete pv lustre-pv
    ```
    
    Deleting the PersistentVolume does not remove the underlying Managed Lustre instance.
    

## What's next

*   Explore the Managed Lustre documentation.

Send feedback