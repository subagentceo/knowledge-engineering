# Change the disk type

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Guides

Send feedback

# Change the disk type Stay organized with collections Save and categorize content based on your preferences.

This document discusses how to perform certain tasks on a disk. To perform any of the following tasks, you must create a new disk. You can't make the following changes to a disk.

*   Change a disk's type, for example, change a Hyperdisk Throughput volume to a Hyperdisk Balanced volume.
*   Change the disk's encryption type, for example, modify a disk's encryption from using Google-generated keys to customer-managed encryption keys (CMEK).
*   Move a disk into or out of a Hyperdisk pool.
*   Move a disk to a different region or zone.

Follow these steps to perform any of the previously mentioned tasks:

1.  Create a snapshot of the existing disk.
2.  Create a new disk of the correct type or within a storage pool (referred to as its _placement_), using the snapshot as the data source for the disk.
3.  After verifying the new disk, you can delete the original disk.

## Before you begin

*   To place the new Hyperdisk volumes in a Hyperdisk Storage Pool or Hyperdisk Exapool, review the Limitations for creating disks in a Hyperdisk pool.
    
*   If you haven't already, set up authentication. Authentication verifies your identity for access to Google Cloud services and APIs. To run code or samples from a local development environment, you can authenticate to Compute Engine by selecting one of the following options:
    
    Select the tab for how you plan to use the samples on this page:
    
    ### Console
    
    When you use the Google Cloud console to access Google Cloud services and APIs, you don't need to set up authentication.
    
    ### gcloud
    
    1.  Install the Google Cloud CLI. After installation, initialize the Google Cloud CLI by running the following command:
        
        gcloud init
        
        If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
        
        **Note:** If you installed the gcloud CLI previously, make sure you have the latest version by running `gcloud components update`.
        
    2.  Set a default region and zone.
    
    ### REST
    
    To use the REST API samples on this page in a local development environment, you use the credentials you provide to the gcloud CLI.
    
    Install the Google Cloud CLI.
    
    If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
    For more information, see Authenticate for using REST in the Google Cloud authentication documentation.
    

### Required roles and permissions

To get the permissions that you need to change the disk type, ask your administrator to grant you the following IAM roles on the project:

*   Compute Instance Admin (v1) (`roles/compute.instanceAdmin.v1`)
*   To connect to a VM that can run as a service account: Service Account User (v1) (`roles/iam.serviceAccountUser`)

For more information about granting roles, see Manage access to projects, folders, and organizations.

These predefined roles contain the permissions required to change the disk type. To see the exact permissions that are required, expand the **Required permissions** section:

#### Required permissions

The following permissions are required to change the disk type:

*   To create a snapshot of the disk:
    *   `compute.snapshots.create` on the project
    *   `compute.disks.createSnapshot` on the disk
*   To create a new disk: `compute.disks.create` on the project
*   To create a disk in a pool:
    *   `compute.storagePools.use` on the project
    *   `compute.disks.create` on the project
*   To attach a disk to a VM:
    *   `compute.instances.attachDisk` on the VM
    *   `compute.disks.use` on the volume that you want to attach to the VM
*   To delete a disk: `compute.disks.delete` on the project

You might also be able to get these permissions with custom roles or other predefined roles.

## Change the type, placement, or location of a disk

To migrate a Persistent Disk volume to Hyperdisk, recreate a disk in or out of a pool, or move a disk to a different region or zone, you create a snapshot of the disk, and then use the snapshot when creating a new disk.

### Console

1.  Prepare for creating a disk snapshot:
    
    *   Review Best practices for Compute Engine disk snapshots to prepare your disk for snapshotting.
    *   Read Create schedules for disk snapshots to learn about creating a snapshot schedule and attaching it to your disks. Backing up your disks regularly with scheduled snapshots can reduce the risk of unexpected data loss.
    
    **Important:** If you pause your applications before creating a snapshot, resume your workloads only after the snapshot resource reaches the `UPLOADING` status.
    
    For more information, see the table in Manually creating application consistent snapshots.
    
2.  Create a snapshot of your existing disk.
    
    **Note:** When creating a snapshot, Google recommends using the `snapshots.insert` method instead of the `disks.createSnapshot` method because it supports more features, such as creating snapshots in a project different from the source disk project.
    
3.  Optional: To create a new Hyperdisks in a pool, you must create a storage pool, if one doesn't exist.
4.  Go to the **Disks** page.
    
    Go to Disks
5.  Click **+ Create Disk**.
6.  Under **Disk Type**, select **Hyperdisk Extreme**, **Hyperdisk Throughput**, or **Hyperdisk Balanced**.
    
    Optional: To use a pool, you must select either Hyperdisk Balanced or Hyperdisk Throughput.
    
7.  For **Disk source type**, select **Snapshot**, then select the name of the snapshot to restore.
8.  Specify the **Size** of the new disk, in GiB. This number must be equal to or larger than the original source disk for the snapshot.
9.  Optional: Change the defaults, if you are changing the disk type:
    
    *   Hyperdisk Balanced: Change the **Provisioned IOPS** value and **Provisioned throughput** value.
    *   Hyperdisk Extreme: Change the **Provisioned IOPS** value.
    *   Hyperdisk Throughput: Change the **Provisioned throughput** value.
10.  Optional: To create the new disk in a pool:
     
     1.  In the **Storage pool** section, select **Enable storage pool**.
     2.  Choose the name of the pool to create the disk in.
         
         Only pools that exist in the selected zone appear in the list.
         
11.  Click **Create** to create the new disk.
12.  After you create the disk, you can attach the disk to any running or stopped compute instance.

### gcloud

1.  Prepare for creating a disk snapshot:
    
    *   Review Best practices for Compute Engine disk snapshots to prepare your disk for snapshotting.
    *   Read Create schedules for disk snapshots to learn about creating a snapshot schedule and attaching it to your disks. Backing up your disks regularly with scheduled snapshots can reduce the risk of unexpected data loss.
    
    **Important:** If you pause your applications before creating a snapshot, resume your workloads only after the snapshot resource reaches the `UPLOADING` status.
    
    For more information, see the table in Manually creating application consistent snapshots.
    
2.  Create a snapshot of your existing disk.
    
    **Note:** When creating a snapshot, Google recommends using the `snapshots.insert` method instead of the `disks.createSnapshot` method because it supports more features, such as creating snapshots in a project different from the source disk project.
    
3.  Use the `disks create` command to create a Hyperdisk volume from your snapshot.
    
    gcloud compute disks create DISK_NAME \
     --zone=ZONE \
     --storage-pool=STORAGE_POOL_NAME \
     --size=SIZE \
     --source-snapshot=SNAPSHOT_NAME \
     --type=DISK_TYPE \
     --provisioned-iops=PROVISIONED_IOPS \
     --provisioned-throughput=PROVISIONED_THROUGHPUT
    
    Replace the following:
    
    *   DISK_NAME: a unique name for the disk. You can provide a list of disk names specified by spaces to create multiple disks with the same attributes.
    *   ZONE: the zone where you want to create the disk. If you want to create the disk in a pool, you must specify the zone where the pool is located. Specify this value in region-zone format, for example `us-central1-a`.
    *   STORAGE_POOL_NAME: Optional: the name of the pool to create the disk in. If you don't include this parameter, then a standalone Hyperdisk is created.
    *   SIZE: Optional: the provisioned capacity of the new disk. The size must be greater or equal to the size of the source Persistent Disk. The value must be a whole number followed by a size unit of GB for gibibyte, or TB for tebibyte. If no size is specified, 100 GB is used as the default value.
    *   SNAPSHOT_NAME: The name of the snapshot that you created from the original disk.
    *   DISK_TYPE: the type of disk to create. If creating a disk in a pool, then this value must match the type of the pool, either `hyperdisk-balanced` or `hyperdisk-throughput`.
    *   PROVISIONED_IOPS: Optional: the IOPS to provision for the disk. You can use this parameter only when you create a Hyperdisk Balanced or Hyperdisk Extreme disk.
    *   PROVISIONED_THROUGHPUT: Optional: for Hyperdisk Balanced and Hyperdisk Throughput disks, the throughput in megabyte (MB) per second to provision for the disk. The value must be a positive integer.
4.  After you create the disk, you can attach the disk to any running or stopped compute instance.
    

### REST

1.  Construct a `POST` request to create a zonal Hyperdisk by using the `disks.insert` method. Include the `name`, `sizeGb`, `type`, and `sourceSnapshot` properties.
    
    POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/disks
    {
       "name": "DISK_NAME",
       "sizeGb": "DISK_SIZE",
       "type": "https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/diskTypes/DISK_TYPE",
       "sourceSnapshot": "SNAPSHOT_NAME",
       "provisionedIops": "IOPS_LIMIT",
       "provisionedThroughput": "THROUGHPUT_LIMIT",
       "accessMode": "DISK_ACCESS_MODE"
    }
    
    Replace the following:
    
    *   `PROJECT_ID`: your project ID
    *   `ZONE`: the zone where your compute instance and new disk are located
    *   `DISK_NAME`: the name of the new disk
    *   `DISK_SIZE`: Optional: The size of the new disk. The value must be a whole number followed by a size unit of GB for gibibytes or TB for tebibytes.
    *   `DISK_TYPE`: the type of disk. To create a Hyperdisk volume, use one of the following values: `hyperdisk-balanced`, `hyperdisk-extreme`, `hyperdisk-ml`, or `hyperdisk-throughput`.
    *   `IOPS_LIMIT`: Optional: For Hyperdisk Balanced and Hyperdisk Extreme, this is the number of I/O operations per second that the disk can handle.
    *   `THROUGHPUT_LIMIT`: Optional: For Hyperdisk Balanced, Hyperdisk ML, or Hyperdisk Throughput volumes, this is an integer that represents the throughput, measured in MiB per second, that the disk can handle.
    *   `DISK_ACCESS_MODE`: how compute instances can access the data on the disk. Supported values are:
        
        *   `READ_WRITE_SINGLE`, for read-write access from one instance. This is the default value.
        *   `READ_WRITE_MANY`, for read-write access from multiple instances.
        *   `READ_ONLY_MANY`, for read-only access from multiple instances.
        
        You can set the access mode for the following disk types:
        
        *   Hyperdisk Balanced
        *   Hyperdisk ML
        *   Hyperdisk Balanced High Availability (Preview)
2.  Optional: Use the `compute.disks.get` method to see a description of your disk.
    
3.  After you create the disk, you can attach the disk to any running or stopped compute instance.
    

## Change a zonal disk to a regional Hyperdisk Balanced High Availability disk

How you change a zonal Hyperdisk to a Hyperdisk Balanced High Availability disk depends on the zonal disk's type:

*   If the zonal disk is a boot disk or a Hyperdisk ML or Hyperdisk Throughput disk, create a Hyperdisk Balanced High Availability volume from the snapshot of the zonal disk, as described in this section.
    
*   If the zonal disk is a Hyperdisk Balanced or Hyperdisk Extreme disk and is not a boot disk, create a Hyperdisk Balanced High Availability volume by cloning the source disk.
    

### Console

1.  Prepare for creating a disk snapshot:
    
    *   Review Best practices for Compute Engine disk snapshots to prepare your disk for snapshotting.
    *   Read Create schedules for disk snapshots to learn about creating a snapshot schedule and attaching it to your disks. Backing up your disks regularly with scheduled snapshots can reduce the risk of unexpected data loss.
    
    **Important:** If you pause your applications before creating a snapshot, resume your workloads only after the snapshot resource reaches the `UPLOADING` status.
    
    For more information, see the table in Manually creating application consistent snapshots.
    
2.  Create a snapshot of your existing disk.
    
    **Note:** When creating a snapshot, Google recommends using the `snapshots.insert` method instead of the `disks.createSnapshot` method because it supports more features, such as creating snapshots in a project different from the source disk project.
    
3.  Go to the **Disks** page.
    
    Go to Disks
4.  Click **+ Create Disk**.
5.  Specify a name for the disk.
6.  In the **Location** field, choose **Regional**.
7.  Specify the primary zone for the disk in the **Region** and **Zone** fields.
    
    The disk must be in the same region as the compute instance that you plan to attach it to.
    
8.  Specify the secondary zone in the **Replica zone** field.
9.  For **Disk source type**, select **Snapshot**, then select the name of the snapshot to restore.
10.  Under **Disk Type**, select **Hyperdisk Balanced High Availability**.
     
     If you don't see the Hyperdisk Balanced High Availability disk type in the list, you might have to choose a region that offers Hyperdisk Balanced High Availability disks.
     
11.  Specify the **Size** of the new disk, in GiB. This number must be equal to or larger than the original source disk for the snapshot.
12.  Optional: Change the default **Provisioned IOPS** and **Provisioned throughput** values for the new disk:
     
13.  Click **Create** to create the new disk.
14.  After you create the disk, you can attach the disk to any running or stopped compute instance.

### gcloud

1.  Prepare for creating a disk snapshot:
    
    *   Review Best practices for Compute Engine disk snapshots to prepare your disk for snapshotting.
    *   Read Create schedules for disk snapshots to learn about creating a snapshot schedule and attaching it to your disks. Backing up your disks regularly with scheduled snapshots can reduce the risk of unexpected data loss.
    
    **Important:** If you pause your applications before creating a snapshot, resume your workloads only after the snapshot resource reaches the `UPLOADING` status.
    
    For more information, see the table in Manually creating application consistent snapshots.
    
2.  Create a snapshot of your existing disk.
    
    **Note:** When creating a snapshot, Google recommends using the `snapshots.insert` method instead of the `disks.createSnapshot` method because it supports more features, such as creating snapshots in a project different from the source disk project.
    
3.  Use the `disks create` command to create a Hyperdisk Balanced High Availability disk from your snapshot.
    
    gcloud compute disks create DISK_NAME \
     --size=SIZE \
     --type=hyperdisk-balanced-high-availability \
     --source-snapshot=SNAPSHOT_NAME \
     --provisioned-iops=PROVISIONED_IOPS \
     --provisioned-throughput=PROVISIONED_THROUGHPUT \
     --region=REGION \
     --replica-zones=ZONE1,ZONE2
    
    Replace the following:
    
    *   `DISK_NAME`: a unique name for the disk.
    *   `SIZE`: Optional: the provisioned capacity of the new disk. The size must be greater or equal to the size of the source disk. The value must be a whole number followed by a size unit of GB for gibibyte, or TB for tebibyte.
    *   `SNAPSHOT_NAME`: The name of the snapshot that you created from the original disk.
    *   `PROVISIONED_IOPS`: Optional: the IOPS to provision for the disk.
    *   `PROVISIONED_THROUGHPUT`: Optional: the throughput in megabyte (MB) per second to provision for the disk.
    *   `REGION`: the region for the regional disk to reside in, for example: `europe-west1`
    *   `ZONE1`,`ZONE2`: the zones within the region where the two disk replicas are located, for example: `europe-west1-b,europe-west1-c`

### Terraform

To create a Hyperdisk Balanced High Availability volume, you can use the `google_compute_region_disk` resource, as shown in the following example, but change the disk type from `pd-ssd` to `hyperdisk-balanced-high-availability`.

```
resource "google_compute_region_disk" "regiondisk" {
  name                      = "region-disk-name"
  snapshot                  = google_compute_snapshot.snapdisk.id
  type                      = "pd-ssd"
  region                    = "us-central1"
  physical_block_size_bytes = 4096
  size                      = 11

  replica_zones = ["us-central1-a", "us-central1-f"]
}
```

To learn how to apply or remove a Terraform configuration, see Basic Terraform commands.

### REST

To create a Hyperdisk Balanced High Availability volume, construct a `POST` request to the `compute.regionDisks.insert` method.

POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/disks
{
  "name": "DISK_NAME",
  "sourceSnapshot": "SNAPSHOT_NAME",
  "region": "projects/PROJECT_ID/regions/REGION",
  "replicaZones": [
    "projects/PROJECT_ID/zones/ZONE1",
    "projects/PROJECT_ID/zones/ZONE2"
  ],
  "sizeGb": "DISK_SIZE",
  "type": "projects/PROJECT_ID/regions/REGION/diskTypes/hyperdisk-balanced-high-availability"
}

Replace the following:

*   `PROJECT_ID`: your project ID
*   `REGION`: the region for the regional disk to reside in, for example: `europe-west1`
*   `DISK_NAME`: the name of the new disk
*   `SNAPSHOT_NAME`: The name of the snapshot that you created from the original disk.
*   `ZONE1`,`ZONE2`: the zones where replicas of the new disk should be located, for example: `europe-west1-b,europe-west1-c`
*   `DISK_SIZE`: the size, in GiB, of the new disk

## Make the new disk accessible to your VM instance

After you create the disk, you must attach the disk or attach the regional disk to your compute instance before you can use it.

Because the new disk you created isn't a blank disk, after attaching the disk to an instance, you only need to mount the disk to make it available the operating system.

**Caution:** Don't format the disk before mounting it, because this will remove all the copied data from the disk.

For information on how to mount the disk, refer to the following:

*   Mount the disk (Linux)
*   Format and mount a non-boot disk on a Windows VM

## Remove the original disk

After verifying the new disk, you can:

*   Delete the original disk
*   Delete the snapshot

## What's next

*   Learn more about Hyperdisk.
*   Learn more about Hyperdisk pools
*   Learn how to manage Hyperdisk volumes.
*   Benchmark the performance of your new Hyperdisk.

Send feedback