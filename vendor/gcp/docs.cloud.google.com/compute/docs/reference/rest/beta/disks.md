# REST Resource: disks

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# REST Resource: disks Stay organized with collections Save and categorize content based on your preferences.

*   Resource: Disk
    *   JSON representation
        *   JSON representation
        *   JSON representation
*   Methods

## Resource: Disk

Represents a Persistent Disk resource.

Google Compute Engine has two Disk resources:

*   Zonal
*   Regional

Persistent disks are required for running your VM instances. Create both boot and non-boot (data) persistent disks. For more information, read Persistent Disks. For more storage options, read Storage options.

The `disks` resource represents a zonal persistent disk. For more information, read Zonal persistent disks.

The `regionDisks` resource represents a regional persistent disk. For more information, read Regional resources.

JSON representation

{
  "kind": string,
  "id": string,
  "creationTimestamp": string,
  "name": string,
  "description": string,
  "sizeGb": string,
  "zone": string,
  "status": enum,
  "sourceSnapshot": string,
  "sourceSnapshotId": string,
  "sourceStorageObject": string,
  "options": string,
  "selfLink": string,
  "sourceImage": string,
  "sourceImageId": string,
  "storageType": enum,
  "type": string,
  "licenses": [
    string
  ],
  "guestOsFeatures": [
    {
      "type": enum
    }
  ],
  "lastAttachTimestamp": string,
  "lastDetachTimestamp": string,
  "users": [
    string
  ],
  "diskEncryptionKey": {
    "rawKey": string,
    "rsaEncryptedKey": string,
    "kmsKeyName": string,
    "sha256": string,
    "kmsKeyServiceAccount": string
  },
  "sourceImageEncryptionKey": {
    "rawKey": string,
    "rsaEncryptedKey": string,
    "kmsKeyName": string,
    "sha256": string,
    "kmsKeyServiceAccount": string
  },
  "sourceSnapshotEncryptionKey": {
    "rawKey": string,
    "rsaEncryptedKey": string,
    "kmsKeyName": string,
    "sha256": string,
    "kmsKeyServiceAccount": string
  },
  "labels": {
    string: string,
    ...
  },
  "labelFingerprint": string,
  "region": string,
  "replicaZones": [
    string
  ],
  "licenseCodes": [
    string
  ],
  "physicalBlockSizeBytes": string,
  "resourcePolicies": [
    string
  ],
  "multiWriter": boolean,
  "sourceDisk": string,
  "sourceDiskId": string,
  "eraseWindowsVssSignature": boolean,
  "provisionedIops": string,
  "provisionedThroughput": string,
  "enableConfidentialCompute": boolean,
  "interface": enum,
  "sourceInstantSnapshot": string,
  "sourceInstantSnapshotId": string,
  "satisfiesPzs": boolean,
  "satisfiesPzi": boolean,
  "locationHint": string,
  "storagePool": string,
  "accessMode": enum,
  "asyncPrimaryDisk": {
    "disk": string,
    "diskId": string,
    "consistencyGroupPolicy": string,
    "consistencyGroupPolicyId": string
  },
  "asyncSecondaryDisks": {
    string: {
      "asyncReplicationDisk": {
        "disk": string,
        "diskId": string,
        "consistencyGroupPolicy": string,
        "consistencyGroupPolicyId": string
      }
    },
    ...
  },
  "resourceStatus": {
    "asyncPrimaryDisk": {
      "state": enum
    },
    "asyncSecondaryDisks": {
      string: {
        "state": enum
      },
      ...
    }
  },
  "sourceConsistencyGroupPolicy": string,
  "sourceConsistencyGroupPolicyId": string,
  "architecture": enum,
  "locked": boolean,
  "params": {
    "resourceManagerTags": {
      string: string,
      ...
    }
  }
}

 

Fields

`kind`

`string`

Output only. Type of the resource. Always `compute#disk` for disks.

`id`

`string (uint64 format)`

Output only. The unique identifier for the resource. This identifier is defined by the server.

`creationTimestamp`

`string`

Output only. Creation timestamp in RFC3339 text format.

`name`

`string`

Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.

`description`

`string`

An optional description of this resource. Provide this property when you create the resource.

`sizeGb`

`string (int64 format)`

Size, in GB, of the persistent disk. You can specify this field when creating a persistent disk using the `sourceImage`, `sourceSnapshot`, or `sourceDisk` parameter, or specify it alone to create an empty persistent disk.

If you specify this field along with a source, the value of `sizeGb` must not be less than the size of the source. Acceptable values are greater than `0`.

`zone`

`string`

Output only. URL of the zone where the disk resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.

`status`

`enum`

Output only. The status of disk creation.

*   `CREATING`: Disk is provisioning.
*   `RESTORING`: Source data is being copied into the disk.
*   `FAILED`: Disk creation failed.
*   `READY`: Disk is ready for use.
*   `DELETING`: Disk is deleting.

`sourceSnapshot`

`string`

The source snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values:

*   `https://www.googleapis.com/compute/v1/projects/project/global/snapshots/snapshot`
*   `projects/project/global/snapshots/snapshot`
*   `global/snapshots/snapshot`

`sourceSnapshotId`

`string`

Output only. The unique ID of the snapshot used to create this disk. This value identifies the exact snapshot that was used to create this persistent disk. For example, if you created the persistent disk from a snapshot that was later deleted and recreated under the same name, the source snapshot ID would identify the exact version of the snapshot that was used.

`sourceStorageObject`

`string`

The full Google Cloud Storage URI where the disk image is stored. This file must be a gzip-compressed tarball whose name ends in .tar.gz or virtual machine disk whose name ends in vmdk. Valid URIs may start with gs:// or https://storage.googleapis.com/. This flag is not optimized for creating multiple disks from a source storage object. To create many disks from a source storage object, use `gcloud compute images import` instead.

`options`

`string`

Internal use only.

`selfLink`

`string`

Output only. Server-defined fully-qualified URL for this resource.

`sourceImage`

`string`

The source image used to create this disk. If the source image is deleted, this field will not be set.

To create a disk with one of the public operating system images, specify the image by its family name. For example, specify `family/debian-9` to use the latest Debian 9 image:

`projects/debian-cloud/global/images/family/debian-9`

Alternatively, use a specific version of a public operating system image:

`projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD`

To create a disk with a custom image that you created, specify the image name in the following format:

`global/images/my-custom-image`

You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with `family/family-name`:

`global/images/family/my-image-family`

`sourceImageId`

`string`

Output only. The ID value of the image used to create this disk. This value identifies the exact image that was used to create this persistent disk. For example, if you created the persistent disk from an image that was later deleted and recreated under the same name, the source image ID would identify the exact version of the image that was used.

`storageType`

`enum`

[Deprecated] Storage type of the persistent disk.

`type`

`string`

URL of the disk type resource describing which disk type to use to create the disk. Provide this when creating the disk. For example: `projects/project/zones/zone/diskTypes/pd-ssd` . See Persistent disk types.

`licenses[]`

`string`

A list of publicly visible licenses. Reserved for Google's use.

`guestOsFeatures[]`

`object`

A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options.

`guestOsFeatures[].type`

`enum`

The ID of a supported feature. To add multiple values, use commas to separate values. Set to one or more of the following values:

*   `VIRTIO_SCSI_MULTIQUEUE`
*   `WINDOWS`
*   `MULTI_IP_SUBNET`
*   `UEFI_COMPATIBLE`
*   `GVNIC`
*   `SEV_CAPABLE`
*   `SUSPEND_RESUME_COMPATIBLE`
*   `SEV_LIVE_MIGRATABLE_V2`
*   `SEV_SNP_CAPABLE`
*   `TDX_CAPABLE`
*   `IDPF`
*   `SNP_SVSM_CAPABLE`
*   `CCA_CAPABLE`

For more information, see Enabling guest operating system features.

`lastAttachTimestamp`

`string`

Output only. Last attach timestamp in RFC3339 text format.

`lastDetachTimestamp`

`string`

Output only. Last detach timestamp in RFC3339 text format.

`users[]`

`string`

Output only. Links to the users of the disk (attached instances) in form: `projects/project/zones/zone/instances/instance`

`diskEncryptionKey`

`object`

Encrypts the disk using a customer-supplied encryption key or a customer-managed encryption key.

Encryption keys do not protect access to metadata of the disk.

After you encrypt a disk with a customer-supplied key, you must provide the same key if you use the disk later. For example, to create a disk snapshot, to create a disk image, to create a machine image, or to attach the disk to a virtual machine.

After you encrypt a disk with a customer-managed key, the `diskEncryptionKey.kmsKeyName` is set to a key _version_ name once the disk is created. The disk is encrypted with this version of the key. In the response, `diskEncryptionKey.kmsKeyName` appears in the following format:

"diskEncryptionKey.kmsKeyName": "projects/kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key /cryptoKeysVersions/version If you do not provide an encryption key when creating the disk, then the disk is encrypted using an automatically generated key and you don't need to provide a key to use the disk later.

`diskEncryptionKey.rawKey`

`string`

Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" 

`diskEncryptionKey.rsaEncryptedKey`

`string`

Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine:

1.  The key is wrapped using a RSA public key certificate provided by Google.
2.  After being wrapped, the key must be encoded in RFC 4648 base64 encoding.

Gets the RSA public key certificate provided by Google at:

 https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem

`diskEncryptionKey.kmsKeyName`

`string`

The name of the encryption key that is stored in Google Cloud KMS. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1

`diskEncryptionKey.sha256`

`string`

Output only. The RFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.

`diskEncryptionKey.kmsKeyServiceAccount`

`string`

The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example:

"kmsKeyServiceAccount": "name@ projectId.iam.gserviceaccount.com/ 

`sourceImageEncryptionKey`

`object`

The customer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key.

`sourceImageEncryptionKey.rawKey`

`string`

Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" 

`sourceImageEncryptionKey.rsaEncryptedKey`

`string`

Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine:

1.  The key is wrapped using a RSA public key certificate provided by Google.
2.  After being wrapped, the key must be encoded in RFC 4648 base64 encoding.

Gets the RSA public key certificate provided by Google at:

 https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem

`sourceImageEncryptionKey.kmsKeyName`

`string`

The name of the encryption key that is stored in Google Cloud KMS. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1

`sourceImageEncryptionKey.sha256`

`string`

Output only. The RFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.

`sourceImageEncryptionKey.kmsKeyServiceAccount`

`string`

The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example:

"kmsKeyServiceAccount": "name@ projectId.iam.gserviceaccount.com/ 

`sourceSnapshotEncryptionKey`

`object`

The customer-supplied encryption key of the source snapshot. Required if the source snapshot is protected by a customer-supplied encryption key.

`sourceSnapshotEncryptionKey.rawKey`

`string`

Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" 

`sourceSnapshotEncryptionKey.rsaEncryptedKey`

`string`

Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine:

1.  The key is wrapped using a RSA public key certificate provided by Google.
2.  After being wrapped, the key must be encoded in RFC 4648 base64 encoding.

Gets the RSA public key certificate provided by Google at:

 https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem

`sourceSnapshotEncryptionKey.kmsKeyName`

`string`

The name of the encryption key that is stored in Google Cloud KMS. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1

`sourceSnapshotEncryptionKey.sha256`

`string`

Output only. The RFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.

`sourceSnapshotEncryptionKey.kmsKeyServiceAccount`

`string`

The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example:

"kmsKeyServiceAccount": "name@ projectId.iam.gserviceaccount.com/ 

`labels`

`map (key: string, value: string)`

Labels to apply to this disk. These can be later modified by the `setLabels` method.

`labelFingerprint`

`string (bytes format)`

A fingerprint for the labels being applied to this disk, which is essentially a hash of the labels set used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels, otherwise the request will fail with error `412 conditionNotMet`.

To see the latest fingerprint, make a `get()` request to retrieve a disk.

A base64-encoded string.

`region`

`string`

Output only. URL of the region where the disk resides. Only applicable for regional resources. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.

`replicaZones[]`

`string`

URLs of the zones where the disk should be replicated to. Only applicable for regional resources.

`licenseCodes[]`

`string (int64 format)`

Integer license codes indicating which licenses are attached to this disk.

`physicalBlockSizeBytes`

`string (int64 format)`

Physical block size of the persistent disk, in bytes. If not present in a request, a default value is used. The currently supported size is 4096, other sizes may be added in the future. If an unsupported value is requested, the error message will list the supported values for the caller's project.

`resourcePolicies[]`

`string`

Resource policies applied to this disk for automatic snapshot creations.

`multiWriter`

`boolean`

Indicates whether or not the disk can be read/write attached to more than one instance.

`sourceDisk`

`string`

The source disk used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values:

*   `https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk`
*   `https://www.googleapis.com/compute/v1/projects/project/regions/region/disks/disk`
*   `projects/project/zones/zone/disks/disk`
*   `projects/project/regions/region/disks/disk`
*   `zones/zone/disks/disk`
*   `regions/region/disks/disk`

`sourceDiskId`

`string`

Output only. The unique ID of the disk used to create this disk. This value identifies the exact disk that was used to create this persistent disk. For example, if you created the persistent disk from a disk that was later deleted and recreated under the same name, the source disk ID would identify the exact version of the disk that was used.

`eraseWindowsVssSignature`

`boolean`

Specifies whether the disk restored from a source snapshot should erase Windows specific VSS signature.

`provisionedIops`

`string (int64 format)`

Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see the Extreme persistent disk documentation.

`provisionedThroughput`

`string (int64 format)`

Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must be greater than or equal to 1.

`enableConfidentialCompute`

`boolean`

Whether this disk is using confidential compute mode.

`interface   **(deprecated)**`

`enum`

This item is deprecated!

[Deprecated] Specifies the disk interface to use for attaching this disk, which is either `SCSI` or `NVME`. The default is `SCSI`.

`sourceInstantSnapshot`

`string`

The source instant snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values:

*   `https://www.googleapis.com/compute/v1/projects/project/zones/zone/instantSnapshots/instantSnapshot`
*   `projects/project/zones/zone/instantSnapshots/instantSnapshot`
*   `zones/zone/instantSnapshots/instantSnapshot`

`sourceInstantSnapshotId`

`string`

Output only. The unique ID of the instant snapshot used to create this disk. This value identifies the exact instant snapshot that was used to create this persistent disk. For example, if you created the persistent disk from an instant snapshot that was later deleted and recreated under the same name, the source instant snapshot ID would identify the exact version of the instant snapshot that was used.

`satisfiesPzs`

`boolean`

Output only. Reserved for future use.

`satisfiesPzi`

`boolean`

Output only. Reserved for future use.

`locationHint`

`string`

An opaque location hint used to place the disk close to other resources. This field is for use by internal tools that use the public API.

`storagePool`

`string`

The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values:

*   `https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool`
*   `projects/project/zones/zone/storagePools/storagePool`
*   `zones/zone/storagePools/storagePool`

`accessMode`

`enum`

The access mode of the disk.

*   `READ_WRITE_SINGLE`: The default AccessMode, means the disk can be attached to single instance in RW mode.
*   `READ_WRITE_MANY`: The AccessMode means the disk can be attached to multiple instances in RW mode.
*   `READ_ONLY_MANY`: The AccessMode means the disk can be attached to multiple instances in RO mode.

The AccessMode is only valid for Hyperdisk disk types.

`asyncPrimaryDisk`

`object`

Disk asynchronously replicated into this disk.

`asyncPrimaryDisk.disk`

`string`

The other disk asynchronously replicated to or from the current disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values:

*   `https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk`
*   `projects/project/zones/zone/disks/disk`
*   `zones/zone/disks/disk`

`asyncPrimaryDisk.diskId`

`string`

Output only. The unique ID of the other disk asynchronously replicated to or from the current disk. This value identifies the exact disk that was used to create this replication. For example, if you started replicating the persistent disk from a disk that was later deleted and recreated under the same name, the disk ID would identify the exact version of the disk that was used.

`asyncPrimaryDisk.consistencyGroupPolicy`

`string`

Output only. URL of the DiskConsistencyGroupPolicy if replication was started on the disk as a member of a group.

`asyncPrimaryDisk.consistencyGroupPolicyId`

`string`

Output only. ID of the DiskConsistencyGroupPolicy if replication was started on the disk as a member of a group.

`asyncSecondaryDisks`

`map (key: string, value: object)`

Output only. A list of disks this disk is asynchronously replicated to.

`asyncSecondaryDisks.asyncReplicationDisk`

`object`

`asyncSecondaryDisks.asyncReplicationDisk.disk`

`string`

The other disk asynchronously replicated to or from the current disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values:

*   `https://www.googleapis.com/compute/v1/projects/project/zones/zone/disks/disk`
*   `projects/project/zones/zone/disks/disk`
*   `zones/zone/disks/disk`

`asyncSecondaryDisks.asyncReplicationDisk.diskId`

`string`

Output only. The unique ID of the other disk asynchronously replicated to or from the current disk. This value identifies the exact disk that was used to create this replication. For example, if you started replicating the persistent disk from a disk that was later deleted and recreated under the same name, the disk ID would identify the exact version of the disk that was used.

`asyncSecondaryDisks.asyncReplicationDisk.consistencyGroupPolicy`

`string`

Output only. URL of the DiskConsistencyGroupPolicy if replication was started on the disk as a member of a group.

`asyncSecondaryDisks.asyncReplicationDisk.consistencyGroupPolicyId`

`string`

Output only. ID of the DiskConsistencyGroupPolicy if replication was started on the disk as a member of a group.

`resourceStatus`

`object`

Output only. Status information for the disk resource.

`resourceStatus.asyncPrimaryDisk`

`object`

`resourceStatus.asyncPrimaryDisk.state`

`enum`

`resourceStatus.asyncSecondaryDisks[]`

`map (key: string, value: object)`

Key: disk, value: AsyncReplicationStatus message

`resourceStatus.asyncSecondaryDisks[].state`

`enum`

`sourceConsistencyGroupPolicy`

`string`

Output only. URL of the DiskConsistencyGroupPolicy for a secondary disk that was created using a consistency group.

`sourceConsistencyGroupPolicyId`

`string`

Output only. ID of the DiskConsistencyGroupPolicy for a secondary disk that was created using a consistency group.

`architecture`

`enum`

The architecture of the disk. Valid values are ARM64 or X86_64.

`locked`

`boolean`

Output only. The field indicates if the disk is created from a locked source image. Attachment of a disk created from a locked source image will cause the following operations to become irreversibly prohibited:

*   R/W or R/O disk attachment to any other instance
*   Disk detachment. And the disk can only be deleted when the instance is deleted
*   Creation of images or snapshots
*   Disk cloning

Furthermore, the instance with at least one disk with locked flag set to true will be prohibited from performing the operations below:

*   Further attachment of secondary disks.
*   Detachment of any disks
*   Create machine images
*   Create instance template
*   disks.delete the instance with --keep-disk parameter set to true for locked disks
*   Attach a locked disk with --auto-delete parameter set to false

`params`

`object`

Input only. [Input Only] Additional params passed with the request, but not persisted as part of resource payload.

`params.resourceManagerTags`

`map (key: string, value: string)`

Input only. Resource manager tags to be bound to the disk. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|projectId}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.

 

## Methods

### addResourcePolicies

Adds existing resource policies to a disk.

### aggregatedList

Retrieves an aggregated list of persistent disks.

### bulkInsert

Bulk create a set of disks.

### bulkSetLabels

Sets the labels on many disks at once.

### createSnapshot

Creates a snapshot of a specified persistent disk.

### delete

Deletes the specified persistent disk.

### get

Returns the specified persistent disk.

### getIamPolicy

Gets the access control policy for a resource.

### insert

Creates a persistent disk in the specified project using the data in the request.

### list

Retrieves a list of persistent disks contained within the specified zone.

### removeResourcePolicies

Removes resource policies from a disk.

### resize

Resizes the specified persistent disk.

### setIamPolicy

Sets the access control policy on the specified resource.

### setLabels

Sets the labels on a disk.

### startAsyncReplication

Starts asynchronous replication.

### stopAsyncReplication

Stops asynchronous replication.

### stopGroupAsyncReplication

Stops asynchronous replication for a consistency group of disks.

### testIamPermissions

Returns permissions that a caller has on the specified resource.

### update

Updates the specified disk with the data included in the request.

### updateKmsKey

Rotates the customer-managed encryption key to the latest version for the specified persistent disk.

Send feedback