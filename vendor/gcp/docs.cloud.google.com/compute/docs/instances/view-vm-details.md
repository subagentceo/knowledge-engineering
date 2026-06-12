# View the details of a VM

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Guides

Send feedback

# View the details of a VM Stay organized with collections Save and categorize content based on your preferences.

Linux Windows

This document explains how to view the details of an existing virtual machine (VM) instance.

Viewing the details of a VM is useful to see its configuration and status, such as attached disks, creation timestamp, machine type, and the ID of the VM—which you can use to reference the VM using an immutable value.

## Before you begin

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
    

### Required roles

To get the permission that you need to view the details of a VM, ask your administrator to grant you the Compute Instance Admin (v1) (`roles/compute.instanceAdmin.v1`) IAM role on the VM or project. For more information about granting roles, see Manage access to projects, folders, and organizations.

This predefined role contains the `compute.instances.get` permission, which is required to view the details of a VM.

You might also be able to get this permission with custom roles or other predefined roles.

## View details of a VM

To view the details of a VM, select one of the following options:

### Console

1.  In the Google Cloud console, go to the **VM instances** page.
    
    Go to VM instances
    
2.  On the **VM instances** page, you can view the following information for a compute instance:
    
    *   The name of the instance.
    *   The zone the instance is located in.
    *   The machine type used by the instance.
    *   The provisioning model.
    *   Any available recommendations for the instance.
    *   Whether the VM instance is part of an instance group
    *   The IP addresses used by the instance.
    
    The previous list contains the default columns shown on the **VM instances** page. You can click view_column **Column display options** to change what columns are displayed for each VM.
    
3.  In the **Name** column, click the VM name to view additional details about the VM instance.
    

### gcloud

To view the details of a VM, use the `gcloud compute instances describe` command.

```
gcloud compute instances describe VM_NAME \
    --zone=ZONE
```

Replace the following:

*   `VM_NAME`: the VM name.
    
*   `ZONE`: the zone where the VM is located.
    

The output is similar to the following:

```
canIpForward: false
confidentialInstanceConfig:
  enableConfidentialCompute: false
cpuPlatform: Intel Broadwell
creationTimestamp: '2023-08-18T10:00:21.801-07:00'
deletionProtection: false
description: ''
disks:
- architecture: X86_64
  autoDelete: true
  boot: true
  deviceName: example-vm
  diskSizeGb: '10'
  guestOsFeatures:
  - type: UEFI_COMPATIBLE
  - type: VIRTIO_SCSI_MULTIQUEUE
  - type: GVNIC
  - type: SEV_CAPABLE
  index: 0
  interface: SCSI
  kind: compute#attachedDisk
  licenses:
  - https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-11-bullseye
  mode: READ_WRITE
  source: https://www.googleapis.com/compute/v1/projects/example-project/zones/us-central1-a/disks/example-vm
  type: PERSISTENT
displayDevice:
  enableDisplay: false
fingerprint: CQp-QBEACqw=
id: '6404261768674286922'
keyRevocationActionType: NONE
kind: compute#instance
labelFingerprint: 42WmSpB8rSM=
lastStartTimestamp: '2023-08-18T10:00:28.182-07:00'
machineType: https://www.googleapis.com/compute/v1/projects/example-project/zones/us-central1-a/machineTypes/e2-medium
metadata:
  fingerprint: lQ-dD2sMrMY=
  items:
  - key: enable-oslogin
    value: 'true'
  kind: compute#metadata
name: example-vm
networkInterfaces:
- accessConfigs:
  - kind: compute#accessConfig
    name: External NAT
    natIP: 34.27.53.198
    networkTier: PREMIUM
    type: ONE_TO_ONE_NAT
  fingerprint: QR3z6TgVFjg=
  kind: compute#networkInterface
  name: nic0
  network: https://www.googleapis.com/compute/v1/projects/example-project/global/networks/default
  networkIP: 10.128.0.28
  stackType: IPV4_ONLY
  subnetwork: https://www.googleapis.com/compute/v1/projects/example-project/regions/us-central1/subnetworks/default
reservationAffinity:
  consumeReservationType: ANY_RESERVATION
scheduling:
  automaticRestart: true
  onHostMaintenance: MIGRATE
  preemptible: false
  provisioningModel: STANDARD
selfLink: https://www.googleapis.com/compute/v1/projects/example-project/zones/us-central1-a/instances/example-vm
serviceAccounts:
- email: 790569220780-compute@developer.gserviceaccount.com
  scopes:
  - https://www.googleapis.com/auth/devstorage.read_only
  - https://www.googleapis.com/auth/logging.write
  - https://www.googleapis.com/auth/monitoring.write
  - https://www.googleapis.com/auth/servicecontrol
  - https://www.googleapis.com/auth/service.management.readonly
  - https://www.googleapis.com/auth/trace.append
shieldedInstanceConfig:
  enableIntegrityMonitoring: true
  enableSecureBoot: false
  enableVtpm: true
shieldedInstanceIntegrityPolicy:
  updateAutoLearnPolicy: true
startRestricted: false
status: RUNNING
tags:
  fingerprint: 42WmSpB8rSM=
zone: https://www.googleapis.com/compute/v1/projects/example-project/zones/us-central1-a
```

### REST

To view the details of a VM, make a `GET` request to `instances.get` method.

```
GET https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances/VM_NAME
```

Replace the following:

*   `PROJECT_ID`: the ID of the project where the VM is located.
    
*   `ZONE`: the zone where the VM is located.
    
*   `VM_NAME`: the VM name.
    

The output is similar to the following:

```
{
  "canIpForward": false,
  "confidentialInstanceConfig": {
    "enableConfidentialCompute": false
  },
  "cpuPlatform": "Intel Broadwell",
  "creationTimestamp": "2023-08-18T10:00:21.801-07:00",
  "deletionProtection": false,
  "description": "",
  "disks": [
    {
      "architecture": "X86_64",
      "autoDelete": true,
      "boot": true,
      "deviceName": "example-vm",
      "diskSizeGb": "10",
      "guestOsFeatures": [
        {
          "type": "UEFI_COMPATIBLE"
        },
        {
          "type": "VIRTIO_SCSI_MULTIQUEUE"
        },
        {
          "type": "GVNIC"
        },
        {
          "type": "SEV_CAPABLE"
        }
      ],
      "index": 0,
      "interface": "SCSI",
      "kind": "compute#attachedDisk",
      "licenses": [
        "https://www.googleapis.com/compute/v1/projects/debian-cloud/global/licenses/debian-11-bullseye"
      ],
      "mode": "READ_WRITE",
      "source": "https://www.googleapis.com/compute/v1/projects/example-project/zones/us-central1-a/disks/example-vm",
      "type": "PERSISTENT"
    }
  ],
  "displayDevice": {
    "enableDisplay": false
  },
  "fingerprint": "CQp-QBEACqw=",
  "id": "6404261768674286922",
  "keyRevocationActionType": "NONE",
  "kind": "compute#instance",
  "labelFingerprint": "42WmSpB8rSM=",
  "lastStartTimestamp": "2023-08-18T10:00:28.182-07:00",
  "machineType": "https://www.googleapis.com/compute/v1/projects/example-project/zones/us-central1-a/machineTypes/e2-medium",
  "metadata": {
    "fingerprint": "lQ-dD2sMrMY=",
    "items": [
      {
        "key": "enable-oslogin",
        "value": "true"
      }
    ],
    "kind": "compute#metadata"
  },
  "name": "example-vm",
  "networkInterfaces": [
    {
      "accessConfigs": [
        {
        "kind": "compute#accessConfig",
        "name": "External NAT",
        "natIP": "34.27.53.198",
        "networkTier": "PREMIUM",
        "type": "ONE_TO_ONE_NAT"
        }
      ],
      "fingerprint": "QR3z6TgVFjg=",
      "kind": "compute#networkInterface",
      "name": "nic0",
      "network": "https://www.googleapis.com/compute/v1/projects/example-project/global/networks/default",
      "networkIP": "10.128.0.28",
      "stackType": "IPV4_ONLY",
      "subnetwork": "https://www.googleapis.com/compute/v1/projects/example-project/regions/us-central1/subnetworks/default"
    }
  ],
  "reservationAffinity": {
    "consumeReservationType": "ANY_RESERVATION"
  },
  "scheduling": {
    "automaticRestart": true,
    "onHostMaintenance": "MIGRATE",
    "preemptible": false,
    "provisioningModel": "STANDARD"
  },
  "selfLink": "https://www.googleapis.com/compute/v1/projects/example-project/zones/us-central1-a/instances/example-vm",
  "serviceAccounts": [
    {
    "email": "790569220780-compute@developer.gserviceaccount.com",
    "scopes": [
        "https://www.googleapis.com/auth/devstorage.read_only",
        "https://www.googleapis.com/auth/logging.write",
        "https://www.googleapis.com/auth/monitoring.write",
        "https://www.googleapis.com/auth/servicecontrol",
        "https://www.googleapis.com/auth/service.management.readonly",
        "https://www.googleapis.com/auth/trace.append"
      ]
    }
  ],
  "shieldedInstanceConfig": {
    "enableIntegrityMonitoring": true,
    "enableSecureBoot": false,
    "enableVtpm": true
  },
  "shieldedInstanceIntegrityPolicy": {
    "updateAutoLearnPolicy": true
  },
  "startRestricted": false,
  "status": "RUNNING",
  "tags": {
    "fingerprint": "42WmSpB8rSM="
  },
  "zone": "https://www.googleapis.com/compute/v1/projects/example-project/zones/us-central1-a"
}
```

## Determine the CPU and memory allocation for an instance

The number of CPUs and memory allocated to a compute instance can be determined from the machine type used by the instance, for example:

*   `c3-standard-22`: C3 is the machine series name, `standard` is the memory allocation type for the instance, and `22` is the number of vCPUs allocated to the instance. Typically, a `standard` machine type uses a ratio of 4 GB memory per vCPU. So, this machine type would have 88 GB of RAM.
    
    The memory to CPU ratios for `standard`, `highmem`, `highcpu`, `ultamem`, and `megamem` machine types can vary slightly for each machine series, so refer to the machine series page to determine the exact amount of memory allocated for each machine type.
    
*   `n2-custom-8-16384`: For custom machine types, the first part of the machine type is the machine series, except for N1 machine types, which don't include the machine series at all. The first number after `custom` is the number of vCPUs and the last number is the amount of memory (in MB) allocated to the instance.
    

For more information about machine types, see Machine families resource and comparison guide.

## What's next

*   Learn how to rename a VM.
    
*   Learn how to stop or start a VM.
    
*   Learn how to suspend or resume a VM.
    
*   Learn more about the VM life cycle.
    

Send feedback