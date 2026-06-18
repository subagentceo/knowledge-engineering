# Method: disks.insert

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: disks.insert Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
    *   JSON representation
        *   JSON representation
        *   JSON representation
*   Response body
    *   JSON representation
        *   JSON representation
            *   JSON representation
            *   JSON representation
            *   JSON representation
            *   JSON representation
        *   JSON representation
        *   JSON representation
        *   JSON representation
*   Authorization scopes
*   IAM Permissions
*   Try it!

Creates a persistent disk in the specified project using the data in the request. You can create a disk from a source (`sourceImage`, `sourceSnapshot`, or `sourceDisk`) or create an empty 500 GB data disk by omitting all properties. You can also create a disk that is larger than the default size by specifying the `sizeGb` property.

### HTTP request

`POST https://compute.googleapis.com/compute/beta/projects/{project}/zones/{zone}/disks`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

`zone`

`string`

The name of the zone for this request.

### Query parameters

 

Parameters

`sourceImage`

`string`

Source image to restore onto a disk. This field is optional.

`requestId`

`string`

An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed.

For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments.

The request ID must be a valid UUID with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`).

### Request body

The request body contains data with the following structure:

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

[REQUIRED] Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.

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

Authorization requires the following IAM permission on the specified resource `sourceSnapshot`:

*   `compute.snapshots.useReadOnly`

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

Authorization requires the following IAM permission on the specified resource `sourceImage`:

*   `compute.images.useReadOnly`

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

Authorization requires the following IAM permission on the specified resource `labels`:

*   `compute.disks.setLabels`

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

Authorization requires the following IAM permission on the specified resource `sourceDisk`:

*   `compute.disks.useReadOnly`

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

[Deprecated] Specifies the disk interface to use for attaching this disk, which is either `SCSI` or `NVME`. The default is `SCSI`.

`sourceInstantSnapshot`

`string`

The source instant snapshot used to create this disk. You can provide this as a partial or full URL to the resource. For example, the following are valid values:

*   `https://www.googleapis.com/compute/v1/projects/project/zones/zone/instantSnapshots/instantSnapshot`
*   `projects/project/zones/zone/instantSnapshots/instantSnapshot`
*   `zones/zone/instantSnapshots/instantSnapshot`

Authorization requires the following IAM permission on the specified resource `sourceInstantSnapshot`:

*   `compute.instantSnapshots.useReadOnly`

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

Authorization requires the following IAM permission on the specified resource `storagePool`:

*   `compute.storagePools.use`

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

### Response body

Represents an Operation resource.

Google Compute Engine has three Operation resources:

*   Global
*   Regional
*   Zonal

You can use an operation resource to manage asynchronous API requests. For more information, read Handling API responses.

Operations can be global, regional or zonal.

*   For global operations, use the `globalOperations` resource.
*   For regional operations, use the `regionOperations` resource.
*   For zonal operations, use the `zoneOperations` resource.

For more information, read Global, Regional, and Zonal Resources.

Note that completed Operation resources have a limited retention period.

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "id": string,
  "creationTimestamp": string,
  "name": string,
  "zone": string,
  "clientOperationId": string,
  "operationType": string,
  "targetLink": string,
  "targetId": string,
  "status": enum,
  "statusMessage": string,
  "user": string,
  "progress": integer,
  "insertTime": string,
  "startTime": string,
  "endTime": string,
  "error": {
    "errors": [
      {
        "code": string,
        "location": string,
        "message": string,
        "errorDetails": [
          {
            "errorInfo": {
              "reason": string,
              "domain": string,
              "metadatas": {
                string: string,
                ...
              }
            },
            "quotaInfo": {
              "metricName": string,
              "limitName": string,
              "dimensions": {
                string: string,
                ...
              },
              "limit": number,
              "futureLimit": number,
              "rolloutStatus": enum
            },
            "help": {
              "links": [
                {
                  "description": string,
                  "url": string
                }
              ]
            },
            "localizedMessage": {
              "locale": string,
              "message": string
            }
          }
        ]
      }
    ]
  },
  "warnings": [
    {
      "code": enum,
      "message": string,
      "data": [
        {
          "key": string,
          "value": string
        }
      ]
    }
  ],
  "httpErrorStatusCode": integer,
  "httpErrorMessage": string,
  "selfLink": string,
  "region": string,
  "description": string,
  "operationGroupId": string,

  // Union field `metadata` can be only one of the following:
  "setCommonInstanceMetadataOperationMetadata": {
    "clientOperationId": string,
    "perLocationOperations": {
      string: {
        "state": enum,
        "error": {
          "code": integer,
          "message": string,
          "details": [
            {
              "@type": string,
              field1: ...,
              ...
            }
          ]
        }
      },
      ...
    }
  },
  "instancesBulkInsertOperationMetadata": {
    "perLocationStatus": {
      string: {
        "status": enum,
        "targetVmCount": integer,
        "createdVmCount": integer,
        "failedToCreateVmCount": integer,
        "deletedVmCount": integer
      },
      ...
    }
  },
  "getVersionOperationMetadata": {
    "inlineSbomInfo": {
      "currentComponentVersions": {
        string: string,
        ...
      },
      "targetComponentVersions": {
        string: string,
        ...
      }
    }
  }
  // End of list of possible types for union field `metadata`.
}

 

Fields

`kind`

`string`

Output only. Type of the resource. Always `compute#operation` for Operation resources.

`id`

`string (uint64 format)`

Output only. The unique identifier for the operation. This identifier is defined by the server.

`creationTimestamp`

`string`

[Deprecated] This field is deprecated.

`name`

`string`

Output only. Name of the operation.

`zone`

`string`

Output only. The URL of the zone where the operation resides. Only applicable when performing per-zone operations.

`clientOperationId`

`string`

Output only. The value of `requestId` if you provided it in the request. Not present otherwise.

`operationType`

`string`

Output only. The type of operation, such as `insert`, `update`, or `delete`, and so on.

`targetLink`

`string`

Output only. The URL of the resource that the operation modifies. For operations related to creating a snapshot, this points to the disk that the snapshot was created from.

`targetId`

`string (uint64 format)`

Output only. The unique target ID, which identifies a specific incarnation of the target resource.

`status`

`enum`

Output only. The status of the operation, which can be one of the following: `PENDING`, `RUNNING`, or `DONE`.

`statusMessage`

`string`

Output only. An optional textual description of the current status of the operation.

`user`

`string`

Output only. User who requested the operation, for example: `user@example.com` or `alice_smith_identifier (global/workforcePools/example-com-us-employees)`.

`progress`

`integer`

Output only. An optional progress indicator that ranges from 0 to 100. There is no requirement that this be linear or support any granularity of operations. This should not be used to guess when the operation will be complete. This number should monotonically increase as the operation progresses.

`insertTime`

`string`

Output only. The time that this operation was requested. This value is in RFC3339 text format.

`startTime`

`string`

Output only. The time that this operation was started by the server. This value is in RFC3339 text format.

`endTime`

`string`

Output only. The time that this operation was completed. This value is in RFC3339 text format.

`error`

`object`

Output only. If errors are generated during processing of the operation, this field will be populated.

`error.errors[]`

`object`

Output only. The array of errors encountered while processing this operation.

`error.errors[].code`

`string`

Output only. The error type identifier for this error.

`error.errors[].location`

`string`

Output only. Indicates the field in the request that caused the error. This property is optional.

`error.errors[].message`

`string`

Output only. An optional, human-readable error message.

`error.errors[].errorDetails[]`

`object`

Output only. An optional list of messages that contain the error details. There is a set of defined message types to use for providing details.The syntax depends on the error code. For example, QuotaExceededInfo will have details when the error code is QUOTA_EXCEEDED.

`error.errors[].errorDetails[].errorInfo`

`object`

`error.errors[].errorDetails[].errorInfo.reason`

`string`

The reason of the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `[A-Z][A-Z0-9_]+[A-Z0-9]`, which represents UPPER_SNAKE_CASE.

`error.errors[].errorDetails[].errorInfo.domain`

`string`

The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com".

`error.errors[].errorDetails[].errorInfo.metadatas`

`map (key: string, value: string)`

Additional structured details about this error.

Keys must match a regular expression of `[a-z][a-zA-Z0-9-_]+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request.

`error.errors[].errorDetails[].quotaInfo`

`object`

`error.errors[].errorDetails[].quotaInfo.metricName`

`string`

The Compute Engine quota metric name.

`error.errors[].errorDetails[].quotaInfo.limitName`

`string`

The name of the quota limit.

`error.errors[].errorDetails[].quotaInfo.dimensions`

`map (key: string, value: string)`

The map holding related quota dimensions.

`error.errors[].errorDetails[].quotaInfo.limit`

`number`

Current effective quota limit. The limit's unit depends on the quota type or metric.

`error.errors[].errorDetails[].quotaInfo.futureLimit`

`number`

Future quota limit being rolled out. The limit's unit depends on the quota type or metric.

`error.errors[].errorDetails[].quotaInfo.rolloutStatus`

`enum`

Rollout status of the future quota limit.

`error.errors[].errorDetails[].help`

`object`

`error.errors[].errorDetails[].help.links[]`

`object`

URL(s) pointing to additional information on handling the current error.

`error.errors[].errorDetails[].help.links[].description`

`string`

Describes what the link offers.

`error.errors[].errorDetails[].help.links[].url`

`string`

The URL of the link.

`error.errors[].errorDetails[].localizedMessage`

`object`

`error.errors[].errorDetails[].localizedMessage.locale`

`string`

The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX"

`error.errors[].errorDetails[].localizedMessage.message`

`string`

The localized error message in the above locale.

`warnings[]`

`object`

Output only. If warning messages are generated during processing of the operation, this field will be populated.

`warnings[].code`

`enum`

Output only. A warning code, if applicable. For example, Compute Engine returns `NO_RESULTS_ON_PAGE` if there are no results in the response.

`warnings[].message`

`string`

Output only. A human-readable description of the warning code.

`warnings[].data[]`

`object`

Output only. Metadata about this warning in `key: value` format. For example:

"data": [  {  "key": "scope",  "value": "zones/us-east1-d"  }

`warnings[].data[].key`

`string`

Output only. A key that provides more detail on the warning being returned. For example, for warnings where there are no results in a list request for a particular zone, this key might be `scope` and the key value might be the zone name. Other examples might be a key indicating a deprecated resource and a suggested replacement, or a warning about invalid network settings (for example, if an instance attempts to perform IP forwarding but is not enabled for IP forwarding).

`warnings[].data[].value`

`string`

Output only. A warning data value corresponding to the key.

`httpErrorStatusCode`

`integer`

Output only. If the operation fails, this field contains the HTTP error status code that was returned. For example, a `404` means the resource was not found.

`httpErrorMessage`

`string`

Output only. If the operation fails, this field contains the HTTP error message that was returned, such as `NOT FOUND`.

`selfLink`

`string`

Output only. Server-defined URL for the resource.

`region`

`string`

Output only. The URL of the region where the operation resides. Only applicable when performing regional operations.

`description`

`string`

Output only. A textual description of the operation, which is set when the operation is created.

`operationGroupId`

`string`

Output only. An ID that represents a group of operations, such as when a group of operations results from a `bulkInsert` API request.

Union field `metadata`. Output only. Service-specific metadata attached to this operation. `metadata` can be only one of the following:

`setCommonInstanceMetadataOperationMetadata`

`object`

Output only. If the operation is for projects.setCommonInstanceMetadata, this field will contain information on all underlying zonal actions and their state.

`setCommonInstanceMetadataOperationMetadata.clientOperationId`

`string`

Output only. The client operation id.

`setCommonInstanceMetadataOperationMetadata.perLocationOperations[]`

`map (key: string, value: object)`

Output only. Status information per location (location name is key). Example key: zones/us-central1-a

`setCommonInstanceMetadataOperationMetadata.perLocationOperations[].state`

`enum`

Output only. Status of the action, which can be one of the following: `PROPAGATING`, `PROPAGATED`, `ABANDONED`, `FAILED`, or `DONE`.

`setCommonInstanceMetadataOperationMetadata.perLocationOperations[].error`

`object`

Output only. If state is `ABANDONED` or `FAILED`, this field is populated.

`setCommonInstanceMetadataOperationMetadata.perLocationOperations[].error.code`

`integer`

The status code, which should be an enum value of `google.rpc.Code`.

`setCommonInstanceMetadataOperationMetadata.perLocationOperations[].error.message`

`string`

A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the `google.rpc.Status.details` field, or localized by the client.

`setCommonInstanceMetadataOperationMetadata.perLocationOperations[].error.details[]`

`object`

A list of messages that carry the error details. There is a common set of message types for APIs to use.

An object containing fields of an arbitrary type. An additional field `"@type"` contains a URI identifying the type. Example: `{ "id": 1234, "@type": "types.example.com/standard/id" }`.

`instancesBulkInsertOperationMetadata`

`object`

`instancesBulkInsertOperationMetadata.perLocationStatus[]`

`map (key: string, value: object)`

Status information per location (location name is key). Example key: zones/us-central1-a

`instancesBulkInsertOperationMetadata.perLocationStatus[].status`

`enum`

Output only. Creation status of disks.bulkInsert operation - information if the flow is rolling forward or rolling back.

`instancesBulkInsertOperationMetadata.perLocationStatus[].targetVmCount`

`integer`

Output only. Count of VMs originally planned to be created.

`instancesBulkInsertOperationMetadata.perLocationStatus[].createdVmCount`

`integer`

Output only. Count of VMs successfully created so far.

`instancesBulkInsertOperationMetadata.perLocationStatus[].failedToCreateVmCount`

`integer`

Output only. Count of VMs that started creating but encountered an error.

`instancesBulkInsertOperationMetadata.perLocationStatus[].deletedVmCount`

`integer`

Output only. Count of VMs that got deleted during rollback.

`getVersionOperationMetadata`

`object`

`getVersionOperationMetadata.inlineSbomInfo`

`object`

`getVersionOperationMetadata.inlineSbomInfo.currentComponentVersions`

`map (key: string, value: string)`

A mapping of components to their currently-applied versions or other appropriate identifiers.

`getVersionOperationMetadata.inlineSbomInfo.targetComponentVersions`

`map (key: string, value: string)`

A mapping of components to their target versions or other appropriate identifiers.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.disks.create`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback