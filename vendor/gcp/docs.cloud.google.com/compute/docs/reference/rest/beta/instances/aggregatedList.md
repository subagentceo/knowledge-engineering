# Method: instances.aggregatedList

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   APIs & Reference

Send feedback

# Method: instances.aggregatedList Stay organized with collections Save and categorize content based on your preferences.

*   HTTP request
*   Path parameters
*   Query parameters
*   Request body
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
            *   JSON representation
            *   JSON representation
            *   JSON representation
            *   JSON representation
            *   JSON representation
            *   JSON representation
            *   JSON representation
            *   JSON representation
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

Retrieves an aggregated list of all of the instances in your project across all regions and zones.

The performance of this method degrades when a filter is specified on a project that has a very large number of instances.

To prevent failure, Google recommends that you set the `returnPartialSuccess` parameter to `true`.

### HTTP request

`GET https://compute.googleapis.com/compute/beta/projects/{project}/aggregated/instances`

The URL uses gRPC Transcoding syntax. To know more about valid error responses that can be thrown by this HTTP request, please refer to the service error catalog

### Path parameters

 

Parameters

`project`

`string`

Project ID for this request.

### Query parameters

 

Parameters

`maxResults`

`integer (uint32 format)`

The maximum number of results per page that should be returned. If the number of available results is larger than `maxResults`, Compute Engine returns a `nextPageToken` that can be used to get the next page of results in subsequent list requests. Acceptable values are `0` to `500`, inclusive. (Default: `500`)

`pageToken`

`string`

Specifies a page token to use. Set `pageToken` to the `nextPageToken` returned by a previous list request to get the next page of results.

`filter`

`string`

A filter expression that filters resources listed in the response. Most Compute resources support two types of filter expressions: expressions that support regular expressions and expressions that follow API improvement proposal AIP-160. These two types of filter expressions cannot be mixed in one request.

If you want to use AIP-160, your expression must specify the field name, an operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The operator must be either `=`, `!=`, `>`, `<`, `<=`, `>=` or `:`.

For example, if you are filtering Compute Engine instances, you can exclude instances named `example-instance` by specifying `name != example-instance`.

The `:*` comparison can be used to test whether a key has been defined. For example, to find all objects with `owner` label use:

```
labels.owner:*
```

You can also filter nested fields. For example, you could specify `scheduling.automaticRestart = false` to include instances only if they are not scheduled for automatic restarts. You can use filtering on nested fields to filter based on resource labels.

To filter on multiple expressions, provide each separate expression within parentheses. For example:

```
(scheduling.automaticRestart = true)
(cpuPlatform = "Intel Skylake")
```

By default, each expression is an `AND` expression. However, you can include `AND` and `OR` expressions explicitly. For example:

```
(cpuPlatform = "Intel Skylake") OR
(cpuPlatform = "Intel Broadwell") AND
(scheduling.automaticRestart = true)
```

If you want to use a regular expression, use the `eq` (equal) or `ne` (not equal) operator against a single un-parenthesized expression with or without quotes or against multiple parenthesized expressions. Examples:

`fieldname eq unquoted literal` `fieldname eq 'single quoted literal'` `fieldname eq "double quoted literal"` `(fieldname1 eq literal) (fieldname2 ne "literal")`

The literal value is interpreted as a regular expression using Google RE2 library syntax. The literal value must match the entire field.

For example, to filter for instances that do not end with name "instance", you would use `name ne .*instance`.

You cannot combine constraints on multiple fields using regular expressions.

`orderBy`

`string`

Sorts list results by a certain order. By default, results are returned in alphanumerical order based on the resource name.

You can also sort results in descending order based on the creation timestamp using `orderBy="creationTimestamp desc"`. This sorts results based on the `creationTimestamp` field in reverse chronological order (newest result first). Use this to sort resources like operations so that the newest operation is returned first.

Currently, only sorting by `name` or `creationTimestamp desc` is supported.

`returnPartialSuccess`

`boolean`

Opt-in for partial success behavior which provides partial results in case of failure. The default value is false.

For example, when partial success behavior is enabled, aggregatedList for a single zone scope either returns all resources in the zone or no resources, with an error code.

`includeAllScopes`

`boolean`

Indicates whether every visible scope for each scope type (zone, region, global) should be included in the response. For new resource types added after this field, the flag has no effect as new resource types will always include every visible scope for each scope type in response. For resource types which predate this field, if this flag is omitted or false, only scopes of the scope types where the resource type is expected to be found will be included.

`serviceProjectNumber`

`string (int64 format)`

The Shared VPC service project id or service project number for which aggregated list request is invoked for subnetworks list-usable api.

### Request body

The request body must be empty.

### Response body

If successful, the response body contains data with the following structure:

JSON representation

{
  "kind": string,
  "id": string,
  "items": {
    string: {
      "instances": [
        {
          "kind": string,
          "id": string,
          "creationTimestamp": string,
          "name": string,
          "description": string,
          "tags": {
            "items": [
              string
            ],
            "fingerprint": string
          },
          "machineType": string,
          "status": enum,
          "statusMessage": string,
          "zone": string,
          "canIpForward": boolean,
          "networkInterfaces": [
            {
              "kind": string,
              "network": string,
              "subnetwork": string,
              "networkIP": string,
              "ipv6Address": string,
              "internalIpv6PrefixLength": integer,
              "name": string,
              "accessConfigs": [
                {
                  "kind": string,
                  "type": enum,
                  "name": string,
                  "natIP": string,
                  "externalIpv6": string,
                  "externalIpv6PrefixLength": integer,
                  "setPublicPtr": boolean,
                  "publicPtrDomainName": string,
                  "networkTier": enum,
                  "securityPolicy": string
                }
              ],
              "ipv6AccessConfigs": [
                {
                  "kind": string,
                  "type": enum,
                  "name": string,
                  "natIP": string,
                  "externalIpv6": string,
                  "externalIpv6PrefixLength": integer,
                  "setPublicPtr": boolean,
                  "publicPtrDomainName": string,
                  "networkTier": enum,
                  "securityPolicy": string
                }
              ],
              "aliasIpRanges": [
                {
                  "ipCidrRange": string,
                  "subnetworkRangeName": string
                }
              ],
              "aliasIpv6Ranges": [
                {
                  "ipCidrRange": string,
                  "subnetworkRangeName": string
                }
              ],
              "fingerprint": string,
              "stackType": enum,
              "ipv6AccessType": enum,
              "queueCount": integer,
              "nicType": enum,
              "networkAttachment": string,
              "parentNicName": string,
              "vlan": integer,
              "igmpQuery": enum,
              "serviceClassId": string,
              "enableVpcScopedDns": boolean,
              "macAddress": string
            }
          ],
          "disks": [
            {
              "kind": string,
              "type": enum,
              "mode": enum,
              "savedState": enum,
              "source": string,
              "deviceName": string,
              "index": integer,
              "boot": boolean,
              "initializeParams": {
                "diskName": string,
                "sourceImage": string,
                "diskSizeGb": string,
                "diskType": string,
                "sourceImageEncryptionKey": {
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
                "sourceSnapshot": string,
                "sourceInstantSnapshot": string,
                "sourceSnapshotEncryptionKey": {
                  "rawKey": string,
                  "rsaEncryptedKey": string,
                  "kmsKeyName": string,
                  "sha256": string,
                  "kmsKeyServiceAccount": string
                },
                "description": string,
                "replicaZones": [
                  string
                ],
                "guestOsFeatures": [
                  {
                    "type": enum
                  }
                ],
                "resourcePolicies": [
                  string
                ],
                "onUpdateAction": enum,
                "provisionedIops": string,
                "multiWriter": boolean,
                "licenses": [
                  string
                ],
                "architecture": enum,
                "resourceManagerTags": {
                  string: string,
                  ...
                },
                "provisionedThroughput": string,
                "enableConfidentialCompute": boolean,
                "storagePool": string
              },
              "autoDelete": boolean,
              "licenses": [
                string
              ],
              "interface": enum,
              "guestOsFeatures": [
                {
                  "type": enum
                }
              ],
              "diskEncryptionKey": {
                "sha256": string,
                "kmsKeyServiceAccount": string,

                
                "rawKey": string,
                "rsaEncryptedKey": string,
                "kmsKeyName": string
                
              },
              "diskSizeGb": string,
              "shieldedInstanceInitialState": {
                "pk": {
                  "content": string,
                  "fileType": enum
                },
                "keks": [
                  {
                    "content": string,
                    "fileType": enum
                  }
                ],
                "dbs": [
                  {
                    "content": string,
                    "fileType": enum
                  }
                ],
                "dbxs": [
                  {
                    "content": string,
                    "fileType": enum
                  }
                ]
              },
              "forceAttach": boolean,
              "locked": boolean,
              "architecture": enum
            }
          ],
          "metadata": {
            "kind": string,
            "fingerprint": string,
            "items": [
              {
                "key": string,
                "value": string
              }
            ]
          },
          "serviceAccounts": [
            {
              "email": string,
              "scopes": [
                string
              ]
            }
          ],
          "selfLink": string,
          "scheduling": {
            "maxRunDuration": {
              "seconds": string,
              "nanos": integer
            },
            "terminationTime": string,
            "onInstanceStopAction": {
              "discardLocalSsd": boolean
            },
            "onHostMaintenance": enum,
            "automaticRestart": boolean,
            "preemptible": boolean,
            "nodeAffinities": [
              {
                "key": string,
                "operator": enum,
                "values": [
                  string
                ]
              }
            ],
            "minNodeCpus": integer,
            "locationHint": string,
            "maintenanceFreezeDurationHours": integer,
            "maintenanceInterval": enum,
            "availabilityDomain": integer,
            "provisioningModel": enum,
            "instanceTerminationAction": enum,
            "hostErrorTimeoutSeconds": integer,
            "gracefulShutdown": {
              "enabled": boolean,
              "maxDuration": {
                "seconds": string,
                "nanos": integer
              }
            },
            "localSsdRecoveryTimeout": {
              "seconds": string,
              "nanos": integer
            },
            "skipGuestOsShutdown": boolean,
            "preemptionNoticeDuration": {
              "seconds": string,
              "nanos": integer
            }
          },
          "cpuPlatform": string,
          "labels": {
            string: string,
            ...
          },
          "params": {
            "resourceManagerTags": {
              string: string,
              ...
            },
            "requestValidForDuration": {
              "seconds": string,
              "nanos": integer
            }
          },
          "labelFingerprint": string,
          "instanceEncryptionKey": {
            "rawKey": string,
            "rsaEncryptedKey": string,
            "kmsKeyName": string,
            "sha256": string,
            "kmsKeyServiceAccount": string
          },
          "minCpuPlatform": string,
          "guestAccelerators": [
            {
              "acceleratorType": string,
              "acceleratorCount": integer
            }
          ],
          "startRestricted": boolean,
          "deletionProtection": boolean,
          "resourcePolicies": [
            string
          ],
          "sourceMachineImage": string,
          "shieldedVmConfig": {
            "enableSecureBoot": boolean,
            "enableVtpm": boolean,
            "enableIntegrityMonitoring": boolean
          },
          "shieldedVmIntegrityPolicy": {
            "updateAutoLearnPolicy": boolean
          },
          "reservationAffinity": {
            "consumeReservationType": enum,
            "key": string,
            "values": [
              string
            ]
          },
          "hostname": string,
          "displayDevice": {
            "enableDisplay": boolean
          },
          "shieldedInstanceConfig": {
            "enableSecureBoot": boolean,
            "enableVtpm": boolean,
            "enableIntegrityMonitoring": boolean
          },
          "shieldedInstanceIntegrityPolicy": {
            "updateAutoLearnPolicy": boolean
          },
          "sourceMachineImageEncryptionKey": {
            "rawKey": string,
            "rsaEncryptedKey": string,
            "kmsKeyName": string,
            "sha256": string,
            "kmsKeyServiceAccount": string
          },
          "eraseWindowsVssSignature": boolean,
          "postKeyRevocationActionType": enum,
          "confidentialInstanceConfig": {
            "enableConfidentialCompute": boolean,
            "confidentialInstanceType": enum
          },
          "fingerprint": string,
          "privateIpv6GoogleAccess": enum,
          "advancedMachineFeatures": {
            "enableNestedVirtualization": boolean,
            "threadsPerCore": integer,
            "visibleCoreCount": integer,
            "enableUefiNetworking": boolean,
            "performanceMonitoringUnit": enum,
            "turboMode": string
          },
          "lastStartTimestamp": string,
          "lastStopTimestamp": string,
          "lastSuspendedTimestamp": string,
          "satisfiesPzs": boolean,
          "satisfiesPzi": boolean,
          "resourceStatus": {
            "effectiveInstanceMetadata": {
              "vmDnsSettingMetadataValue": string,
              "enableOsloginMetadataValue": boolean,
              "enableOsconfigMetadataValue": boolean,
              "enableOsInventoryMetadataValue": boolean,
              "enableGuestAttributesMetadataValue": boolean,
              "blockProjectSshKeysMetadataValue": boolean,
              "serialPortEnableMetadataValue": boolean,
              "serialPortLoggingEnableMetadataValue": boolean,
              "gceContainerDeclarationMetadataValue": boolean
            },
            "scheduling": {
              "availabilityDomain": integer,
              "terminationTimestamp": string
            },
            "upcomingMaintenance": {
              "type": enum,
              "canReschedule": boolean,
              "windowStartTime": string,
              "windowEndTime": string,
              "latestWindowStartTime": string,
              "maintenanceStatus": enum,
              "maintenanceOnShutdown": boolean,
              "maintenanceReasons": [
                enum
              ]
            },
            "physicalHost": string,
            "physicalHostTopology": {
              "cluster": string,
              "block": string,
              "subblock": string,
              "host": string
            },
            "shutdownDetails": {
              "stopState": enum,
              "targetState": enum,
              "requestTimestamp": string,
              "maxDuration": {
                "seconds": string,
                "nanos": integer
              }
            },
            "reservationConsumptionInfo": {
              "consumedReservation": string
            }
          },
          "networkPerformanceConfig": {
            "totalEgressBandwidthTier": enum
          },
          "keyRevocationActionType": enum,
          "partnerMetadata": {
            string: {
              "entries": {
                string: value,
                ...
              }
            },
            ...
          },
          "workloadIdentityConfig": {
            "identity": string,
            "identityCertificateEnabled": boolean
          }
        }
      ],
      "warning": {
        "code": enum,
        "message": string,
        "data": [
          {
            "key": string,
            "value": string
          }
        ]
      }
    },
    ...
  },
  "nextPageToken": string,
  "selfLink": string,
  "warning": {
    "code": enum,
    "message": string,
    "data": [
      {
        "key": string,
        "value": string
      }
    ]
  },
  "unreachables": [
    string
  ]
}

 

Fields

`kind`

`string`

Output only. Type of resource. Always `compute#instanceAggregatedList` for aggregated lists of Instance resources.

`id`

`string`

Output only. Unique identifier for the resource; defined by the server.

`items`

`map (key: string, value: object)`

An object that contains a list of instances scoped by zone.

**Key:** Output only. Name of the scope containing this set of instances.

`items.instances[]`

`object`

Output only. A list of instances contained in this scope.

`items.instances[].kind`

`string`

Output only. Type of the resource. Always `compute#instance` for instances.

`items.instances[].id`

`string (uint64 format)`

Output only. The unique identifier for the resource. This identifier is defined by the server.

`items.instances[].creationTimestamp`

`string`

Output only. Creation timestamp in RFC3339 text format.

`items.instances[].name`

`string`

The name of the resource, provided by the client when initially creating the resource. The resource name must be 1-63 characters long, and comply with RFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.

`items.instances[].description`

`string`

An optional description of this resource. Provide this property when you create the resource.

`items.instances[].tags`

`object`

Tags to apply to this instance. Tags are used to identify valid sources or targets for network firewalls and are specified by the client during instance creation. The tags can be later modified by the setTags method. Each tag within the list must comply with RFC1035. Multiple tags can be specified via the 'tags.items' field.

`items.instances[].tags.items[]`

`string`

An array of tags. Each tag must be 1-63 characters long, and comply with RFC1035.

`items.instances[].tags.fingerprint`

`string (bytes format)`

Specifies a fingerprint for this request, which is essentially a hash of the tags' contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update tags. You must always provide an up-to-date fingerprint hash in order to update or change tags.

To see the latest fingerprint, make `get()` request to the instance.

A base64-encoded string.

`items.instances[].machineType`

`string`

Full or partial URL of the machine type resource to use for this instance, in the format: `zones/zone/machineTypes/machine-type`. This is provided by the client when the instance is created. For example, the following is a valid partial url to a predefined machine type:

`zones/us-central1-f/machineTypes/n1-standard-1`

To create a custom machine type, provide a URL to a machine type in the following format, where CPUS is 1 or an even number up to 32 (2, 4, 6, ... 24, etc), and MEMORY is the total memory for this instance. Memory must be a multiple of 256 MB and must be supplied in MB (e.g. 5 GB of memory is 5120 MB):

`zones/zone/machineTypes/custom-CPUS-MEMORY`

For example: `zones/us-central1-f/machineTypes/custom-4-5120` For a full list of restrictions, read the Specifications for custom machine types.

`items.instances[].status`

`enum`

Output only. The status of the instance. One of the following values: `PROVISIONING`, `STAGING`, `RUNNING`, `STOPPING`, `SUSPENDING`, `SUSPENDED`, `REPAIRING`, and `TERMINATED`. For more information about the status of the instance, see Instance life cycle.

`items.instances[].statusMessage`

`string`

Output only. An optional, human-readable explanation of the status.

`items.instances[].zone`

`string`

Output only. URL of the zone where the instance resides. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.

`items.instances[].canIpForward`

`boolean`

Allows this instance to send and receive packets with non-matching destination or source IPs. This is required if you plan to use this instance to forward routes. For more information, see Enabling IP Forwarding.

`items.instances[].networkInterfaces[]`

`object`

An array of network configurations for this instance. These specify how interfaces are configured to interact with other network services, such as connecting to the internet. Multiple interfaces are supported per instance.

`items.instances[].networkInterfaces[].kind`

`string`

Output only. Type of the resource. Always `compute#networkInterface` for network interfaces.

`items.instances[].networkInterfaces[].network`

`string`

URL of the VPC network resource for this instance. When creating an instance, if neither the network nor the subnetwork is specified, the default network `global/networks/default` is used. If the selected project doesn't have the default network, you must specify a network or subnet. If the network is not specified but the subnetwork is specified, the network is inferred.

If you specify this property, you can specify the network as a full or partial URL. For example, the following are all valid URLs:

*   `https://www.googleapis.com/compute/v1/projects/project/global/networks/network`
*   `projects/project/global/networks/network`
*   `global/networks/default`

`items.instances[].networkInterfaces[].subnetwork`

`string`

The URL of the Subnetwork resource for this instance. If the network resource is in legacy mode, do not specify this field. If the network is in auto subnet mode, specifying the subnetwork is optional. If the network is in custom subnet mode, specifying the subnetwork is required. If you specify this field, you can specify the subnetwork as a full or partial URL. For example, the following are all valid URLs:

*   `https://www.googleapis.com/compute/v1/projects/project/regions/region/subnetworks/subnetwork`
*   `regions/region/subnetworks/subnetwork`

`items.instances[].networkInterfaces[].networkIP`

`string`

An IPv4 internal IP address to assign to the instance for this network interface. If not specified by the user, an unused internal IP is assigned by the system.

`items.instances[].networkInterfaces[].ipv6Address`

`string`

An IPv6 internal network address for this network interface. To use a static internal IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an internal IPv6 address from the instance's subnetwork.

`items.instances[].networkInterfaces[].internalIpv6PrefixLength`

`integer`

The prefix length of the primary internal IPv6 range.

`items.instances[].networkInterfaces[].name`

`string`

Output only. The name of the network interface, which is generated by the server. For a VM, the network interface uses the `nicN` naming format. Where `N` is a value between `0` and `7`. The default interface value is `nic0`.

`items.instances[].networkInterfaces[].accessConfigs[]`

`object`

An array of configurations for this interface. Currently, only one access config, `ONE_TO_ONE_NAT`, is supported. If there are no `accessConfigs` specified, then this instance will have no external internet access.

`items.instances[].networkInterfaces[].accessConfigs[].kind`

`string`

Output only. Type of the resource. Always `compute#accessConfig` for access configs.

`items.instances[].networkInterfaces[].accessConfigs[].type`

`enum`

The type of configuration. In `accessConfigs` (IPv4), the default and only option is `ONE_TO_ONE_NAT`. In `ipv6AccessConfigs`, the default and only option is `DIRECT_IPV6`.

`items.instances[].networkInterfaces[].accessConfigs[].name`

`string`

The name of this access configuration. In `accessConfigs` (IPv4), the default and recommended name is `External NAT`, but you can use any arbitrary string, such as `My external IP` or `Network Access`. In `ipv6AccessConfigs`, the recommend name is `External IPv6`.

`items.instances[].networkInterfaces[].accessConfigs[].natIP`

`string`

Applies to `accessConfigs` (IPv4) only. An external IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance.

`items.instances[].networkInterfaces[].accessConfigs[].externalIpv6`

`string`

Applies to `ipv6AccessConfigs` only. The first IPv6 address of the external IPv6 range associated with this instance, prefix length is stored in `externalIpv6PrefixLength` in `ipv6AccessConfig`. To use a static external IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an external IPv6 address from the instance's subnetwork.

`items.instances[].networkInterfaces[].accessConfigs[].externalIpv6PrefixLength`

`integer`

Applies to `ipv6AccessConfigs` only. The prefix length of the external IPv6 range.

`items.instances[].networkInterfaces[].accessConfigs[].setPublicPtr`

`boolean`

Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name.

This field is not used in `ipv6AccessConfig`. A default PTR record will be created if the VM has external IPv6 range associated.

`items.instances[].networkInterfaces[].accessConfigs[].publicPtrDomainName`

`string`

The DNS domain name for the public PTR record.

You can set this field only if the `setPublicPtr` field is enabled in `accessConfig`. If this field is unspecified in `ipv6AccessConfig`, a default PTR record will be created for first IP in associated external IPv6 range.

`items.instances[].networkInterfaces[].accessConfigs[].networkTier`

`enum`

This signifies the networking tier used for configuring this access configuration and can only take the following values: `PREMIUM`, `STANDARD`.

If an AccessConfig is specified without a valid external IP address, an ephemeral IP will be created with this networkTier.

If an AccessConfig with a valid external IP address is specified, it must match that of the networkTier associated with the Address resource owning that IP.

`items.instances[].networkInterfaces[].accessConfigs[].securityPolicy`

`string`

The resource URL for the security policy associated with this access config.

`items.instances[].networkInterfaces[].ipv6AccessConfigs[]`

`object`

An array of IPv6 access configurations for this interface. Currently, only one IPv6 access config, `DIRECT_IPV6`, is supported. If there is no `ipv6AccessConfig` specified, then this instance will have no external IPv6 Internet access.

`items.instances[].networkInterfaces[].ipv6AccessConfigs[].kind`

`string`

Output only. Type of the resource. Always `compute#accessConfig` for access configs.

`items.instances[].networkInterfaces[].ipv6AccessConfigs[].type`

`enum`

The type of configuration. In `accessConfigs` (IPv4), the default and only option is `ONE_TO_ONE_NAT`. In `ipv6AccessConfigs`, the default and only option is `DIRECT_IPV6`.

`items.instances[].networkInterfaces[].ipv6AccessConfigs[].name`

`string`

The name of this access configuration. In `accessConfigs` (IPv4), the default and recommended name is `External NAT`, but you can use any arbitrary string, such as `My external IP` or `Network Access`. In `ipv6AccessConfigs`, the recommend name is `External IPv6`.

`items.instances[].networkInterfaces[].ipv6AccessConfigs[].natIP`

`string`

Applies to `accessConfigs` (IPv4) only. An external IP address associated with this instance. Specify an unused static external IP address available to the project or leave this field undefined to use an IP from a shared ephemeral IP address pool. If you specify a static external IP address, it must live in the same region as the zone of the instance.

`items.instances[].networkInterfaces[].ipv6AccessConfigs[].externalIpv6`

`string`

Applies to `ipv6AccessConfigs` only. The first IPv6 address of the external IPv6 range associated with this instance, prefix length is stored in `externalIpv6PrefixLength` in `ipv6AccessConfig`. To use a static external IP address, it must be unused and in the same region as the instance's zone. If not specified, Google Cloud will automatically assign an external IPv6 address from the instance's subnetwork.

`items.instances[].networkInterfaces[].ipv6AccessConfigs[].externalIpv6PrefixLength`

`integer`

Applies to `ipv6AccessConfigs` only. The prefix length of the external IPv6 range.

`items.instances[].networkInterfaces[].ipv6AccessConfigs[].setPublicPtr`

`boolean`

Specifies whether a public DNS 'PTR' record should be created to map the external IP address of the instance to a DNS domain name.

This field is not used in `ipv6AccessConfig`. A default PTR record will be created if the VM has external IPv6 range associated.

`items.instances[].networkInterfaces[].ipv6AccessConfigs[].publicPtrDomainName`

`string`

The DNS domain name for the public PTR record.

You can set this field only if the `setPublicPtr` field is enabled in `accessConfig`. If this field is unspecified in `ipv6AccessConfig`, a default PTR record will be created for first IP in associated external IPv6 range.

`items.instances[].networkInterfaces[].ipv6AccessConfigs[].networkTier`

`enum`

This signifies the networking tier used for configuring this access configuration and can only take the following values: `PREMIUM`, `STANDARD`.

If an AccessConfig is specified without a valid external IP address, an ephemeral IP will be created with this networkTier.

If an AccessConfig with a valid external IP address is specified, it must match that of the networkTier associated with the Address resource owning that IP.

`items.instances[].networkInterfaces[].ipv6AccessConfigs[].securityPolicy`

`string`

The resource URL for the security policy associated with this access config.

`items.instances[].networkInterfaces[].aliasIpRanges[]`

`object`

An array of alias IP ranges for this network interface. You can only specify this field for network interfaces in VPC networks.

`items.instances[].networkInterfaces[].aliasIpRanges[].ipCidrRange`

`string`

The IP alias ranges to allocate for this interface. This IP CIDR range must belong to the specified subnetwork and cannot contain IP addresses reserved by system or used by other network interfaces. This range may be a single IP address (such as `10.2.3.4`), a netmask (such as `/24`) or a CIDR-formatted string (such as `10.1.2.0/24`).

`items.instances[].networkInterfaces[].aliasIpRanges[].subnetworkRangeName`

`string`

The name of a subnetwork secondary IP range from which to allocate an IP alias range. If not specified, the primary range of the subnetwork is used.

`items.instances[].networkInterfaces[].aliasIpv6Ranges[]`

`object`

An array of alias IPv6 ranges for this network interface. You can only specify this field for network interfaces in VPC networks.

`items.instances[].networkInterfaces[].aliasIpv6Ranges[].ipCidrRange`

`string`

The IP alias ranges to allocate for this interface. This IP CIDR range must belong to the specified subnetwork and cannot contain IP addresses reserved by system or used by other network interfaces. This range may be a single IP address (such as `10.2.3.4`), a netmask (such as `/24`) or a CIDR-formatted string (such as `10.1.2.0/24`).

`items.instances[].networkInterfaces[].aliasIpv6Ranges[].subnetworkRangeName`

`string`

The name of a subnetwork secondary IP range from which to allocate an IP alias range. If not specified, the primary range of the subnetwork is used.

`items.instances[].networkInterfaces[].fingerprint`

`string (bytes format)`

Fingerprint hash of contents stored in this network interface. This field will be ignored when inserting an `Instance` or adding a `NetworkInterface`. An up-to-date fingerprint must be provided in order to update the `NetworkInterface`. The request will fail with error `400 Bad Request` if the fingerprint is not provided, or `412 Precondition Failed` if the fingerprint is out of date.

A base64-encoded string.

`items.instances[].networkInterfaces[].stackType`

`enum`

The stack type for this network interface. To assign only IPv4 addresses, use IPV4_ONLY. To assign both IPv4 and IPv6 addresses, use `IPV4_IPV6`. If not specified, `IPV4_ONLY` is used.

This field can be both set at instance creation and update network interface operations.

`items.instances[].networkInterfaces[].ipv6AccessType`

`enum`

Output only. One of EXTERNAL, INTERNAL to indicate whether the IP can be accessed from the Internet. This field is always inherited from its subnetwork.

Valid only if `stackType` is `IPV4_IPV6`.

`items.instances[].networkInterfaces[].queueCount`

`integer`

The networking queue count that's specified by users for the network interface. Both Rx and Tx queues will be set to this number. It'll be empty if not specified by the users.

`items.instances[].networkInterfaces[].nicType`

`enum`

The type of vNIC to be used on this interface. This may be gVNIC or VirtioNet.

`items.instances[].networkInterfaces[].networkAttachment`

`string`

The URL of the network attachment that this interface should connect to in the following format: projects/{projectNumber}/regions/{region_name}/networkAttachments/{network_attachment_name}.

`items.instances[].networkInterfaces[].parentNicName`

`string`

Name of the parent network interface of a dynamic network interface.

`items.instances[].networkInterfaces[].vlan`

`integer`

VLAN tag of a dynamic network interface, must be an integer in the range from 2 to 255 inclusively.

`items.instances[].networkInterfaces[].igmpQuery`

`enum`

Indicate whether igmp query is enabled on the network interface or not. If enabled, also indicates the version of IGMP supported.

`items.instances[].networkInterfaces[].serviceClassId`

`string`

Optional. Producer Service's Service class Id for the region of this network interface. Can only be used with networkAttachment. It is not possible to use on its own however, networkAttachment can be used without serviceClassId.

`items.instances[].networkInterfaces[].enableVpcScopedDns`

`boolean`

Optional. If true, DNS resolution will be enabled over this interface. Only valid with networkAttachment.

`items.instances[].networkInterfaces[].macAddress`

`string`

Output only. MAC address assigned to this network interface.

`items.instances[].disks[]`

`object`

Array of disks associated with this instance. Persistent disks must be created before you can assign them.

`items.instances[].disks[].kind`

`string`

Output only. Type of the resource. Always `compute#attachedDisk` for attached disks.

`items.instances[].disks[].type`

`enum`

Specifies the type of the disk, either `SCRATCH` or `PERSISTENT`. If not specified, the default is `PERSISTENT`.

`items.instances[].disks[].mode`

`enum`

The mode in which to attach this disk, either `READ_WRITE` or `READ_ONLY`. If not specified, the default is to attach the disk in `READ_WRITE` mode.

`items.instances[].disks[].savedState`

`enum`

Output only. For LocalSSD disks on VM Instances in STOPPED or SUSPENDED state, this field is set to `PRESERVED` if the LocalSSD data has been saved to a persistent location by customer request. (see the discardLocalSsd option on instances.stop/instances.suspend). Read-only in the api.

`items.instances[].disks[].source`

`string`

Specifies a valid partial or full URL to an existing Persistent Disk resource. When creating a new instance boot disk, one of `initializeParams.sourceImage` or `initializeParams.sourceSnapshot` or `disks.source` is required.

If desired, you can also attach existing non-root persistent disks using this property. This field is only applicable for persistent disks.

Note that for InstanceTemplate, specify the disk name for zonal disk, and the URL for regional disk.

`items.instances[].disks[].deviceName`

`string`

Specifies a unique device name of your choice that is reflected into the `/dev/disk/by-id/google-*` tree of a Linux operating system running within the instance. This name can be used to reference the device for mounting, resizing, and so on, from within the instance.

If not specified, the server chooses a default device name to apply to this disk, in the form `persistent-disk-x`, where x is a number assigned by Google Compute Engine. This field is only applicable for persistent disks.

`items.instances[].disks[].index`

`integer`

Output only. A zero-based index to this disk, where 0 is reserved for the boot disk. If you have many disks attached to an instance, each disk would have a unique index number.

`items.instances[].disks[].boot`

`boolean`

Indicates that this is a boot disk. The virtual machine will use the first partition of the disk for its root filesystem.

`items.instances[].disks[].initializeParams`

`object`

[Input Only] Specifies the parameters for a new disk that will be created alongside the new instance. Use initialization parameters to create boot disks or local SSDs attached to the new instance.

This property is mutually exclusive with the `source` property; you can only define one or the other, but not both.

`items.instances[].disks[].initializeParams.diskName`

`string`

Specifies the disk name. If not specified, the default is to use the name of the instance. If a disk with the same name already exists in the given region, the existing disk is attached to the new instance and the new disk is not created.

`items.instances[].disks[].initializeParams.sourceImage`

`string`

The source image to create this disk. When creating a new instance boot disk, one of `initializeParams.sourceImage` or `initializeParams.sourceSnapshot` or `disks.source` is required.

To create a disk with one of the public operating system images, specify the image by its family name. For example, specify `family/debian-9` to use the latest Debian 9 image:

`projects/debian-cloud/global/images/family/debian-9`

Alternatively, use a specific version of a public operating system image:

`projects/debian-cloud/global/images/debian-9-stretch-vYYYYMMDD`

To create a disk with a custom image that you created, specify the image name in the following format:

`global/images/my-custom-image`

You can also specify a custom image by its image family, which returns the latest version of the image in that family. Replace the image name with `family/family-name`:

`global/images/family/my-image-family`

If the source image is deleted later, this field will not be set.

`items.instances[].disks[].initializeParams.diskSizeGb`

`string (int64 format)`

Specifies the size of the disk in base-2 GB. The size must be at least 10 GB. If you specify a `sourceImage`, which is required for boot disks, the default size is the size of the `sourceImage`. If you do not specify a `sourceImage`, the default disk size is 500 GB.

`items.instances[].disks[].initializeParams.diskType`

`string`

Specifies the disk type to use to create the instance. If not specified, the default is `pd-standard`, specified using the full URL. For example:

`https://www.googleapis.com/compute/v1/projects/project/zones/zone/diskTypes/pd-standard`

For a full list of acceptable values, see Persistent disk types. If you specify this field when creating a VM, you can provide either the full or partial URL. For example, the following values are valid:

*   `https://www.googleapis.com/compute/v1/projects/project/zones/zone/diskTypes/diskType`
*   `projects/project/zones/zone/diskTypes/diskType`
*   `zones/zone/diskTypes/diskType`

If you specify this field when creating or updating an instance template or all-instances configuration, specify the type of the disk, not the URL. For example: `pd-standard`.

`items.instances[].disks[].initializeParams.sourceImageEncryptionKey`

`object`

The customer-supplied encryption key of the source image. Required if the source image is protected by a customer-supplied encryption key.

InstanceTemplate and InstancePropertiesPatch do not store customer-supplied encryption keys, so you cannot create disks for instances in a managed instance group if the source images are encrypted with your own keys.

`items.instances[].disks[].initializeParams.sourceImageEncryptionKey.rawKey`

`string`

Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" 

`items.instances[].disks[].initializeParams.sourceImageEncryptionKey.rsaEncryptedKey`

`string`

Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine:

1.  The key is wrapped using a RSA public key certificate provided by Google.
2.  After being wrapped, the key must be encoded in RFC 4648 base64 encoding.

Gets the RSA public key certificate provided by Google at:

 https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem

`items.instances[].disks[].initializeParams.sourceImageEncryptionKey.kmsKeyName`

`string`

The name of the encryption key that is stored in Google Cloud KMS. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1

`items.instances[].disks[].initializeParams.sourceImageEncryptionKey.sha256`

`string`

Output only. The RFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.

`items.instances[].disks[].initializeParams.sourceImageEncryptionKey.kmsKeyServiceAccount`

`string`

The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example:

"kmsKeyServiceAccount": "name@ projectId.iam.gserviceaccount.com/ 

`items.instances[].disks[].initializeParams.labels`

`map (key: string, value: string)`

Labels to apply to this disk. These can be later modified by the `disks.setLabels` method. This field is only applicable for persistent disks.

`items.instances[].disks[].initializeParams.sourceSnapshot`

`string`

The source snapshot to create this disk. When creating a new instance boot disk, one of `initializeParams.sourceSnapshot` or `initializeParams.sourceImage` or `disks.source` is required.

To create a disk with a snapshot that you created, specify the snapshot name in the following format:

`global/snapshots/my-backup`

If the source snapshot is deleted later, this field will not be set.

Note: You cannot create VMs in bulk using a snapshot as the source. Use an image instead when you create VMs using the bulk insert method.

`items.instances[].disks[].initializeParams.sourceInstantSnapshot`

`string`

The source instant-snapshot to create this disk. When creating a new instance boot disk, one of `initializeParams.sourceSnapshot` or `initializeParams.sourceInstantSnapshot` `initializeParams.sourceImage` or `disks.source` is required.

To create a disk with a snapshot that you created, specify the snapshot name in the following format:

`us-central1-a/instantSnapshots/my-backup`

If the source instant-snapshot is deleted later, this field will not be set.

`items.instances[].disks[].initializeParams.sourceSnapshotEncryptionKey`

`object`

The customer-supplied encryption key of the source snapshot.

`items.instances[].disks[].initializeParams.sourceSnapshotEncryptionKey.rawKey`

`string`

Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" 

`items.instances[].disks[].initializeParams.sourceSnapshotEncryptionKey.rsaEncryptedKey`

`string`

Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine:

1.  The key is wrapped using a RSA public key certificate provided by Google.
2.  After being wrapped, the key must be encoded in RFC 4648 base64 encoding.

Gets the RSA public key certificate provided by Google at:

 https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem

`items.instances[].disks[].initializeParams.sourceSnapshotEncryptionKey.kmsKeyName`

`string`

The name of the encryption key that is stored in Google Cloud KMS. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1

`items.instances[].disks[].initializeParams.sourceSnapshotEncryptionKey.sha256`

`string`

Output only. The RFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.

`items.instances[].disks[].initializeParams.sourceSnapshotEncryptionKey.kmsKeyServiceAccount`

`string`

The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example:

"kmsKeyServiceAccount": "name@ projectId.iam.gserviceaccount.com/ 

`items.instances[].disks[].initializeParams.description`

`string`

An optional description. Provide this property when creating the disk.

`items.instances[].disks[].initializeParams.replicaZones[]`

`string`

Required for each regional disk associated with the instance. Specify the URLs of the zones where the disk should be replicated to. You must provide exactly two replica zones, and one zone must be the same as the instance zone.

`items.instances[].disks[].initializeParams.guestOsFeatures[]`

`object`

A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options.

Guest OS features are applied by merging `initializeParams.guestOsFeatures` and `disks.guestOsFeatures`

`items.instances[].disks[].initializeParams.guestOsFeatures[].type`

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

`items.instances[].disks[].initializeParams.resourcePolicies[]`

`string`

Resource policies applied to this disk for automatic snapshot creations. Specified using the full or partial URL. For instance template, specify only the resource policy name.

`items.instances[].disks[].initializeParams.onUpdateAction`

`enum`

Specifies which action to take on instance update with this disk. Default is to use the existing disk.

`items.instances[].disks[].initializeParams.provisionedIops`

`string (int64 format)`

Indicates how many IOPS to provision for the disk. This sets the number of I/O operations per second that the disk can handle. Values must be between 10,000 and 120,000. For more details, see the Extreme persistent disk documentation.

`items.instances[].disks[].initializeParams.multiWriter`

`boolean`

Indicates whether or not the disk can be read/write attached to more than one instance.

`items.instances[].disks[].initializeParams.licenses[]`

`string`

A list of publicly visible licenses. Reserved for Google's use.

`items.instances[].disks[].initializeParams.architecture`

`enum`

The architecture of the attached disk. Valid values are arm64 or x86_64.

`items.instances[].disks[].initializeParams.resourceManagerTags`

`map (key: string, value: string)`

Input only. Resource manager tags to be bound to the disk. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|projectId}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.

`items.instances[].disks[].initializeParams.provisionedThroughput`

`string (int64 format)`

Indicates how much throughput to provision for the disk. This sets the number of throughput mb per second that the disk can handle. Values must greater than or equal to 1.

`items.instances[].disks[].initializeParams.enableConfidentialCompute`

`boolean`

Whether this disk is using confidential compute mode.

`items.instances[].disks[].initializeParams.storagePool`

`string`

The storage pool in which the new disk is created. You can provide this as a partial or full URL to the resource. For example, the following are valid values:

*   `https://www.googleapis.com/compute/v1/projects/project/zones/zone/storagePools/storagePool`
*   `projects/project/zones/zone/storagePools/storagePool`
*   `zones/zone/storagePools/storagePool`

`items.instances[].disks[].autoDelete`

`boolean`

Specifies whether the disk will be auto-deleted when the instance is deleted (but not when the disk is detached from the instance).

`items.instances[].disks[].licenses[]`

`string`

Output only. Any valid publicly visible licenses.

`items.instances[].disks[].interface`

`enum`

Specifies the disk interface to use for attaching this disk, which is either `SCSI` or `NVME`. For most machine types, the default is `SCSI`. Local SSDs can use either NVME or SCSI. In certain configurations, persistent disks can use NVMe. For more information, see About persistent disks.

`items.instances[].disks[].guestOsFeatures[]`

`object`

A list of features to enable on the guest operating system. Applicable only for bootable images. Read Enabling guest operating system features to see a list of available options.

`items.instances[].disks[].guestOsFeatures[].type`

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

`items.instances[].disks[].diskEncryptionKey`

`object`

Encrypts or decrypts a disk using a customer-supplied encryption key.

If you are creating a new disk, this field encrypts the new disk using an encryption key that you provide. If you are attaching an existing disk that is already encrypted, this field decrypts the disk using the customer-supplied encryption key.

If you encrypt a disk using a customer-supplied key, you must provide the same key again when you attempt to use this resource at a later time. For example, you must provide the key when you create a snapshot or an image from the disk or when you attach the disk to a virtual machine instance.

If you do not provide an encryption key, then the disk will be encrypted using an automatically generated key and you do not need to provide a key to use the disk later.

Note:

Instance templates do not store customer-supplied encryption keys, so you cannot use your own keys to encrypt disks in a managed instance group.

You cannot create VMs that have disks with customer-supplied keys using the bulk insert method.

`items.instances[].disks[].diskEncryptionKey.rawKey`

`string`

Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" 

`items.instances[].disks[].diskEncryptionKey.rsaEncryptedKey`

`string`

Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine:

1.  The key is wrapped using a RSA public key certificate provided by Google.
2.  After being wrapped, the key must be encoded in RFC 4648 base64 encoding.

Gets the RSA public key certificate provided by Google at:

 https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem

`items.instances[].disks[].diskEncryptionKey.kmsKeyName`

`string`

The name of the encryption key that is stored in Google Cloud KMS. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1

`items.instances[].disks[].diskEncryptionKey.sha256`

`string`

Output only. The RFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.

`items.instances[].disks[].diskEncryptionKey.kmsKeyServiceAccount`

`string`

The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example:

"kmsKeyServiceAccount": "name@ projectId.iam.gserviceaccount.com/ 

`items.instances[].disks[].diskSizeGb`

`string (int64 format)`

The size of the disk in GB.

`items.instances[].disks[].shieldedInstanceInitialState`

`object`

Output only. shielded vm initial state stored on disk

`items.instances[].disks[].shieldedInstanceInitialState.pk`

`object`

The Platform Key (PK).

`items.instances[].disks[].shieldedInstanceInitialState.pk.content`

`string (bytes format)`

The raw content in the secure keys file.

A base64-encoded string.

`items.instances[].disks[].shieldedInstanceInitialState.pk.fileType`

`enum`

The file type of source file.

`items.instances[].disks[].shieldedInstanceInitialState.keks[]`

`object`

The Key Exchange Key (KEK).

`items.instances[].disks[].shieldedInstanceInitialState.keks[].content`

`string (bytes format)`

The raw content in the secure keys file.

A base64-encoded string.

`items.instances[].disks[].shieldedInstanceInitialState.keks[].fileType`

`enum`

The file type of source file.

`items.instances[].disks[].shieldedInstanceInitialState.dbs[]`

`object`

The Key Database (db).

`items.instances[].disks[].shieldedInstanceInitialState.dbs[].content`

`string (bytes format)`

The raw content in the secure keys file.

A base64-encoded string.

`items.instances[].disks[].shieldedInstanceInitialState.dbs[].fileType`

`enum`

The file type of source file.

`items.instances[].disks[].shieldedInstanceInitialState.dbxs[]`

`object`

The forbidden key database (dbx).

`items.instances[].disks[].shieldedInstanceInitialState.dbxs[].content`

`string (bytes format)`

The raw content in the secure keys file.

A base64-encoded string.

`items.instances[].disks[].shieldedInstanceInitialState.dbxs[].fileType`

`enum`

The file type of source file.

`items.instances[].disks[].forceAttach`

`boolean`

[Input Only] Whether to force attach the regional disk even if it's currently attached to another instance. If you try to force attach a zonal disk to an instance, you will receive an error.

`items.instances[].disks[].locked`

`boolean`

Output only. Whether to indicate the attached disk is locked. The locked disk is not allowed to be detached from the instance, or to be used as the source of the snapshot creation, and the image creation. The instance with at least one locked attached disk is not allow to be used as source of machine image creation, instant snapshot creation, and not allowed to be deleted with --keep-disk parameter set to true for locked disks.

`items.instances[].disks[].architecture`

`enum`

Output only. The architecture of the attached disk. Valid values are ARM64 or X86_64.

`items.instances[].metadata`

`object`

The metadata key/value pairs assigned to this instance. This includes metadata keys that were explicitly defined for the instance.

`items.instances[].metadata.kind`

`string`

Output only. Type of the resource. Always `compute#metadata` for metadata.

`items.instances[].metadata.fingerprint`

`string (bytes format)`

Specifies a fingerprint for this request, which is essentially a hash of the metadata's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update metadata. You must always provide an up-to-date fingerprint hash in order to update or change metadata, otherwise the request will fail with error `412 conditionNotMet`.

To see the latest fingerprint, make a `get()` request to retrieve the resource.

A base64-encoded string.

`items.instances[].metadata.items[]`

`object`

Array of key/value pairs. The total size of all keys and values must be less than 512 KB.

`items.instances[].metadata.items[].key`

`string`

Key for the metadata entry. Keys must conform to the following regexp: `[a-zA-Z0-9-_]+`, and be less than 128 bytes in length. This is reflected as part of a URL in the metadata server. Additionally, to avoid ambiguity, keys must not conflict with any other metadata keys for the project.

`items.instances[].metadata.items[].value`

`string`

Value for the metadata entry. These are free-form strings, and only have meaning as interpreted by the image running in the instance. The only restriction placed on values is that their size must be less than or equal to 262144 bytes (256 KiB).

`items.instances[].serviceAccounts[]`

`object`

A list of service accounts, with their specified scopes, authorized for this instance. Only one service account per VM instance is supported.

Service accounts generate access tokens that can be accessed through the metadata server and used to authenticate applications on the instance. See Service Accounts for more information.

`items.instances[].serviceAccounts[].email`

`string`

Email address of the service account.

`items.instances[].serviceAccounts[].scopes[]`

`string`

The list of scopes to be made available for this service account.

`items.instances[].selfLink`

`string`

Output only. Server-defined URL for this resource.

`items.instances[].scheduling`

`object`

Sets the scheduling options for this instance.

`items.instances[].scheduling.maxRunDuration`

`object`

Specifies the max run duration for the given instance. If specified, the instance termination action will be performed at the end of the run duration.

`items.instances[].scheduling.maxRunDuration.seconds`

`string (int64 format)`

Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years

`items.instances[].scheduling.maxRunDuration.nanos`

`integer`

Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.

`items.instances[].scheduling.terminationTime`

`string`

Specifies the timestamp, when the instance will be terminated, in RFC3339 text format. If specified, the instance termination action will be performed at the termination time.

`items.instances[].scheduling.onInstanceStopAction`

`object`

`items.instances[].scheduling.onInstanceStopAction.discardLocalSsd`

`boolean`

If true, the contents of any attached Local SSD disks will be discarded else, the Local SSD data will be preserved when the instance is stopped at the end of the run duration/termination time.

`items.instances[].scheduling.onHostMaintenance`

`enum`

Defines the maintenance behavior for this instance. For standard instances, the default behavior is `MIGRATE`. For preemptible instances, the default and only possible behavior is `TERMINATE`. For more information, see Set VM host maintenance policy.

`items.instances[].scheduling.automaticRestart`

`boolean`

Specifies whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user). You can only set the automatic restart option for standard instances. Preemptible instances cannot be automatically restarted.

By default, this is set to `true` so an instance is automatically restarted if it is terminated by Compute Engine.

`items.instances[].scheduling.preemptible`

`boolean`

Defines whether the instance is preemptible. This can only be set during instance creation or while the instance is stopped and therefore, in a `TERMINATED` state. See Instance Life Cycle for more information on the possible instance states.

`items.instances[].scheduling.nodeAffinities[]`

`object`

A set of node affinity and anti-affinity configurations. Refer to Configuring node affinity for more information. Overrides reservationAffinity.

`items.instances[].scheduling.nodeAffinities[].key`

`string`

Corresponds to the label key of Node resource.

`items.instances[].scheduling.nodeAffinities[].operator`

`enum`

Defines the operation of node selection. Valid operators are `IN` for affinity and `NOT_IN` for anti-affinity.

`items.instances[].scheduling.nodeAffinities[].values[]`

`string`

Corresponds to the label values of Node resource.

`items.instances[].scheduling.minNodeCpus`

`integer`

The minimum number of virtual CPUs this instance will consume when running on a sole-tenant node.

`items.instances[].scheduling.locationHint`

`string`

An opaque location hint used to place the instance close to other resources. This field is for use by internal tools that use the public API.

`items.instances[].scheduling.maintenanceFreezeDurationHours`

`integer`

Specifies the number of hours after VM instance creation where the VM won't be scheduled for maintenance.

`items.instances[].scheduling.maintenanceInterval`

`enum`

Specifies the frequency of planned maintenance events. The accepted values are: `PERIODIC`.

`items.instances[].scheduling.availabilityDomain`

`integer`

Specifies the availability domain to place the instance in. The value must be a number between 1 and the number of availability domains specified in the spread placement policy attached to the instance.

`items.instances[].scheduling.provisioningModel`

`enum`

Specifies the provisioning model of the instance.

`items.instances[].scheduling.instanceTerminationAction`

`enum`

Specifies the termination action for the instance.

`items.instances[].scheduling.hostErrorTimeoutSeconds`

`integer`

Specify the time in seconds for host error detection, the value must be within the range of [90, 330] with the increment of 30, if unset, the default behavior of host error recovery will be used.

`items.instances[].scheduling.gracefulShutdown`

`object`

`items.instances[].scheduling.gracefulShutdown.enabled`

`boolean`

Opts-in for graceful shutdown.

`items.instances[].scheduling.gracefulShutdown.maxDuration`

`object`

The time allotted for the instance to gracefully shut down. If the graceful shutdown isn't complete after this time, then the instance transitions to the STOPPING state.

`items.instances[].scheduling.gracefulShutdown.maxDuration.seconds`

`string (int64 format)`

Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years

`items.instances[].scheduling.gracefulShutdown.maxDuration.nanos`

`integer`

Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.

`items.instances[].scheduling.localSsdRecoveryTimeout`

`object`

Specifies the maximum amount of time a Local Ssd Vm should wait while recovery of the Local Ssd state is attempted. Its value should be in between 0 and 168 hours with hour granularity and the default value being 1 hour.

`items.instances[].scheduling.localSsdRecoveryTimeout.seconds`

`string (int64 format)`

Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years

`items.instances[].scheduling.localSsdRecoveryTimeout.nanos`

`integer`

Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.

`items.instances[].scheduling.skipGuestOsShutdown`

`boolean`

Default is false and there will be 120 seconds between GCE ACPI G2 Soft Off and ACPI G3 Mechanical Off for Standard VMs and 30 seconds for Spot VMs.

`items.instances[].scheduling.preemptionNoticeDuration`

`object`

Specifies the Metadata Service preemption notice duration before the GCE ACPI G2 Soft Off signal is triggered for Spot VMs only. If not specified, there will be no wait before the G2 Soft Off signal is triggered.

`items.instances[].scheduling.preemptionNoticeDuration.seconds`

`string (int64 format)`

Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years

`items.instances[].scheduling.preemptionNoticeDuration.nanos`

`integer`

Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.

`items.instances[].cpuPlatform`

`string`

Output only. The CPU platform used by this instance.

`items.instances[].labels`

`map (key: string, value: string)`

Labels to apply to this instance. These can be later modified by the `setLabels` method.

`items.instances[].params`

`object`

Input only. [Input Only] Additional params passed with the request, but not persisted as part of resource payload.

`items.instances[].params.resourceManagerTags`

`map (key: string, value: string)`

Input only. Resource manager tags to be bound to the instance. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|projectId}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.

`items.instances[].params.requestValidForDuration`

`object`

Relative deadline for waiting for capacity. Relevant only for Instances.Insert API.

`items.instances[].params.requestValidForDuration.seconds`

`string (int64 format)`

Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years

`items.instances[].params.requestValidForDuration.nanos`

`integer`

Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.

`items.instances[].labelFingerprint`

`string (bytes format)`

A fingerprint for this request, which is essentially a hash of the label's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update labels. You must always provide an up-to-date fingerprint hash in order to update or change labels.

To see the latest fingerprint, make `get()` request to the instance.

A base64-encoded string.

`items.instances[].instanceEncryptionKey`

`object`

Encrypts suspended data for an instance with a customer-managed encryption key.

If you are creating a new instance, this field will encrypt the local SSD and in-memory contents of the instance during the suspend operation.

If you do not provide an encryption key when creating the instance, then the local SSD and in-memory contents will be encrypted using an automatically generated key during the suspend operation.

`items.instances[].instanceEncryptionKey.rawKey`

`string`

Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" 

`items.instances[].instanceEncryptionKey.rsaEncryptedKey`

`string`

Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine:

1.  The key is wrapped using a RSA public key certificate provided by Google.
2.  After being wrapped, the key must be encoded in RFC 4648 base64 encoding.

Gets the RSA public key certificate provided by Google at:

 https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem

`items.instances[].instanceEncryptionKey.kmsKeyName`

`string`

The name of the encryption key that is stored in Google Cloud KMS. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1

`items.instances[].instanceEncryptionKey.sha256`

`string`

Output only. The RFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.

`items.instances[].instanceEncryptionKey.kmsKeyServiceAccount`

`string`

The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example:

"kmsKeyServiceAccount": "name@ projectId.iam.gserviceaccount.com/ 

`items.instances[].minCpuPlatform`

`string`

Specifies a minimum CPU platform for the VM instance. Applicable values are the friendly names of CPU platforms, such as `minCpuPlatform: "Intel Haswell"` or `minCpuPlatform: "Intel Sandy Bridge"`.

`items.instances[].guestAccelerators[]`

`object`

A list of the type and count of accelerator cards attached to the instance.

`items.instances[].guestAccelerators[].acceleratorType`

`string`

Full or partial URL of the accelerator type resource to attach to this instance. For example: `projects/my-project/zones/us-central1-c/acceleratorTypes/nvidia-tesla-p100` If you are creating an instance template, specify only the accelerator name. See GPUs on Compute Engine for a full list of accelerator types.

`items.instances[].guestAccelerators[].acceleratorCount`

`integer`

The number of the guest accelerator cards exposed to this instance.

`items.instances[].startRestricted`

`boolean`

Output only. Whether a VM has been restricted for start because Compute Engine has detected suspicious activity.

`items.instances[].deletionProtection`

`boolean`

Whether the resource should be protected against deletion.

`items.instances[].resourcePolicies[]`

`string`

Resource policies applied to this instance.

`items.instances[].sourceMachineImage`

`string`

Source machine image

`items.instances[].shieldedVmConfig`

`object`

Output only. Deprecating, please use shieldedInstanceConfig.

`items.instances[].shieldedVmConfig.enableSecureBoot`

`boolean`

Defines whether the instance has Secure Boot enabled.

`items.instances[].shieldedVmConfig.enableVtpm`

`boolean`

Defines whether the instance has the vTPM enabled.

`items.instances[].shieldedVmConfig.enableIntegrityMonitoring`

`boolean`

Defines whether the instance has integrity monitoring enabled.

`items.instances[].shieldedVmIntegrityPolicy`

`object`

Output only. Deprecating, please use shieldedInstanceIntegrityPolicy.

`items.instances[].shieldedVmIntegrityPolicy.updateAutoLearnPolicy`

`boolean`

Updates the integrity policy baseline using the measurements from the VM instance's most recent boot.

`items.instances[].reservationAffinity`

`object`

Specifies the reservations that this instance can consume from.

`items.instances[].reservationAffinity.consumeReservationType`

`enum`

Specifies the type of reservation from which this instance can consume resources: `ANY_RESERVATION` (default), `SPECIFIC_RESERVATION`, or `NO_RESERVATION`. See Consuming reserved instances for examples.

`items.instances[].reservationAffinity.key`

`string`

Corresponds to the label key of a reservation resource. To target a `SPECIFIC_RESERVATION` by name, specify `googleapis.com/reservation-name` as the key and specify the name of your reservation as its value.

`items.instances[].reservationAffinity.values[]`

`string`

Corresponds to the label values of a reservation resource. This can be either a name to a reservation in the same project or "projects/different-project/reservations/some-reservation-name" to target a shared reservation in the same zone but in a different project.

`items.instances[].hostname`

`string`

Specifies the hostname of the instance. The specified hostname must be RFC1035 compliant. If hostname is not specified, the default hostname is [INSTANCE_NAME].c.[PROJECT_ID].internal when using the global DNS, and [INSTANCE_NAME].[ZONE].c.[PROJECT_ID].internal when using zonal DNS.

`items.instances[].displayDevice`

`object`

Enables display device for the instance.

`items.instances[].displayDevice.enableDisplay`

`boolean`

Defines whether the instance has Display enabled.

`items.instances[].shieldedInstanceConfig`

`object`

`items.instances[].shieldedInstanceConfig.enableSecureBoot`

`boolean`

Defines whether the instance has Secure Boot enabled. Disabled by default.

`items.instances[].shieldedInstanceConfig.enableVtpm`

`boolean`

Defines whether the instance has the vTPM enabled. Enabled by default.

`items.instances[].shieldedInstanceConfig.enableIntegrityMonitoring`

`boolean`

Defines whether the instance has integrity monitoring enabled. Enabled by default.

`items.instances[].shieldedInstanceIntegrityPolicy`

`object`

`items.instances[].shieldedInstanceIntegrityPolicy.updateAutoLearnPolicy`

`boolean`

Updates the integrity policy baseline using the measurements from the VM instance's most recent boot.

`items.instances[].sourceMachineImageEncryptionKey`

`object`

Source machine image encryption key when creating an instance from a machine image.

`items.instances[].sourceMachineImageEncryptionKey.rawKey`

`string`

Specifies a 256-bit customer-supplied encryption key, encoded in RFC 4648 base64 to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rawKey": "SGVsbG8gZnJvbSBHb29nbGUgQ2xvdWQgUGxhdGZvcm0=" 

`items.instances[].sourceMachineImageEncryptionKey.rsaEncryptedKey`

`string`

Specifies an RFC 4648 base64 encoded, RSA-wrapped 2048-bit customer-supplied encryption key to either encrypt or decrypt this resource. You can provide either the `rawKey` or the `rsaEncryptedKey`. For example:

"rsaEncryptedKey": "ieCx/NcW06PcT7Ep1X6LUTc/hLvUDYyzSZPPVCVPTVEohpeHASqC8uw5TzyO9U+Fka9JFH z0mBibXUInrC/jEk014kCK/NPjYgEMOyssZ4ZINPKxlUh2zn1bV+MCaTICrdmuSBTWlUUiFoD D6PYznLwh8ZNdaheCeZ8ewEXgFQ8V+sDroLaN3Xs3MDTXQEMMoNUXMCZEIpg9Vtp9x2oe==" The key must meet the following requirements before you can provide it to Compute Engine:

1.  The key is wrapped using a RSA public key certificate provided by Google.
2.  After being wrapped, the key must be encoded in RFC 4648 base64 encoding.

Gets the RSA public key certificate provided by Google at:

 https://cloud-certs.storage.googleapis.com/google-cloud-csek-ingress.pem

`items.instances[].sourceMachineImageEncryptionKey.kmsKeyName`

`string`

The name of the encryption key that is stored in Google Cloud KMS. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key The fully-qualifed key name may be returned for resource GET requests. For example:

"kmsKeyName": "projects/ kms_project_id/locations/ region/keyRings/ key_region/cryptoKeys/key /cryptoKeyVersions/1

`items.instances[].sourceMachineImageEncryptionKey.sha256`

`string`

Output only. The RFC 4648 base64 encoded SHA-256 hash of the customer-supplied encryption key that protects this resource.

`items.instances[].sourceMachineImageEncryptionKey.kmsKeyServiceAccount`

`string`

The service account being used for the encryption request for the given KMS key. If absent, the Compute Engine default service account is used. For example:

"kmsKeyServiceAccount": "name@ projectId.iam.gserviceaccount.com/ 

`items.instances[].eraseWindowsVssSignature`

`boolean`

Specifies whether the disks restored from source snapshots or source machine image should erase Windows specific VSS signature.

`items.instances[].postKeyRevocationActionType`

`enum`

PostKeyRevocationActionType of the instance.

`items.instances[].confidentialInstanceConfig`

`object`

`items.instances[].confidentialInstanceConfig.enableConfidentialCompute`

`boolean`

Defines whether the instance should have confidential compute enabled.

`items.instances[].confidentialInstanceConfig.confidentialInstanceType`

`enum`

Defines the type of technology used by the confidential instance.

`items.instances[].fingerprint`

`string (bytes format)`

Specifies a fingerprint for this resource, which is essentially a hash of the instance's contents and used for optimistic locking. The fingerprint is initially generated by Compute Engine and changes after every request to modify or update the instance. You must always provide an up-to-date fingerprint hash in order to update the instance.

To see the latest fingerprint, make `get()` request to the instance.

A base64-encoded string.

`items.instances[].privateIpv6GoogleAccess`

`enum`

The private IPv6 google access type for the VM. If not specified, use `INHERIT_FROM_SUBNETWORK` as default.

`items.instances[].advancedMachineFeatures`

`object`

Controls for advanced machine-related behavior features.

`items.instances[].advancedMachineFeatures.enableNestedVirtualization`

`boolean`

Whether to enable nested virtualization or not (default is false).

`items.instances[].advancedMachineFeatures.threadsPerCore`

`integer`

The number of threads per physical core. To disable simultaneous multithreading (SMT) set this to 1. If unset, the maximum number of threads supported per core by the underlying processor is assumed.

`items.instances[].advancedMachineFeatures.visibleCoreCount`

`integer`

The number of physical cores to expose to an instance. Multiply by the number of threads per core to compute the total number of virtual CPUs to expose to the instance. If unset, the number of cores is inferred from the instance's nominal CPU count and the underlying platform's SMT width.

`items.instances[].advancedMachineFeatures.enableUefiNetworking`

`boolean`

Whether to enable UEFI networking for instance creation.

`items.instances[].advancedMachineFeatures.performanceMonitoringUnit`

`enum`

Type of Performance Monitoring Unit requested on instance.

`items.instances[].advancedMachineFeatures.turboMode`

`string`

Turbo frequency mode to use for the instance. Supported modes include: * ALL_CORE_MAX

Using empty string or not setting this field will use the platform-specific default turbo mode.

`items.instances[].lastStartTimestamp`

`string`

Output only. Last start timestamp in RFC3339 text format.

`items.instances[].lastStopTimestamp`

`string`

Output only. Last stop timestamp in RFC3339 text format.

`items.instances[].lastSuspendedTimestamp`

`string`

Output only. Last suspended timestamp in RFC3339 text format.

`items.instances[].satisfiesPzs`

`boolean`

Output only. Reserved for future use.

`items.instances[].satisfiesPzi`

`boolean`

Output only. Reserved for future use.

`items.instances[].resourceStatus`

`object`

Output only. Specifies values set for instance attributes as compared to the values requested by user in the corresponding input only field.

`items.instances[].resourceStatus.effectiveInstanceMetadata`

`object`

Output only. Effective metadata is a field that consolidates project, zonal instance settings, and instance-level predefined metadata keys to provide the overridden value for those metadata keys at the instance level.

`items.instances[].resourceStatus.effectiveInstanceMetadata.vmDnsSettingMetadataValue`

`string`

Effective VM DNS setting at Instance level.

`items.instances[].resourceStatus.effectiveInstanceMetadata.enableOsloginMetadataValue`

`boolean`

Effective enable-oslogin value at Instance level.

`items.instances[].resourceStatus.effectiveInstanceMetadata.enableOsconfigMetadataValue`

`boolean`

Effective enable-osconfig value at Instance level.

`items.instances[].resourceStatus.effectiveInstanceMetadata.enableOsInventoryMetadataValue`

`boolean`

Effective enable-os-inventory value at Instance level.

`items.instances[].resourceStatus.effectiveInstanceMetadata.enableGuestAttributesMetadataValue`

`boolean`

Effective enable-guest-attributes value at Instance level.

`items.instances[].resourceStatus.effectiveInstanceMetadata.blockProjectSshKeysMetadataValue`

`boolean`

Effective block-project-ssh-keys value at Instance level.

`items.instances[].resourceStatus.effectiveInstanceMetadata.serialPortEnableMetadataValue`

`boolean`

Effective serial-port-enable value at Instance level.

`items.instances[].resourceStatus.effectiveInstanceMetadata.serialPortLoggingEnableMetadataValue`

`boolean`

Effective serial-port-logging-enable value at Instance level.

`items.instances[].resourceStatus.effectiveInstanceMetadata.gceContainerDeclarationMetadataValue`

`boolean`

Effective gce-container-declaration value at Instance level.

`items.instances[].resourceStatus.scheduling`

`object`

`items.instances[].resourceStatus.scheduling.availabilityDomain`

`integer`

Specifies the availability domain to place the instance in. The value must be a number between 1 and the number of availability domains specified in the spread placement policy attached to the instance.

`items.instances[].resourceStatus.scheduling.terminationTimestamp`

`string`

Time in future when the instance will be terminated in RFC3339 text format.

`items.instances[].resourceStatus.upcomingMaintenance`

`object`

`items.instances[].resourceStatus.upcomingMaintenance.type`

`enum`

Defines the type of maintenance.

`items.instances[].resourceStatus.upcomingMaintenance.canReschedule`

`boolean`

Indicates if the maintenance can be customer triggered.

`items.instances[].resourceStatus.upcomingMaintenance.windowStartTime`

`string`

The current start time of the maintenance window. This timestamp value is in RFC3339 text format.

`items.instances[].resourceStatus.upcomingMaintenance.windowEndTime`

`string`

The time by which the maintenance disruption will be completed. This timestamp value is in RFC3339 text format.

`items.instances[].resourceStatus.upcomingMaintenance.latestWindowStartTime`

`string`

The latest time for the planned maintenance window to start. This timestamp value is in RFC3339 text format.

`items.instances[].resourceStatus.upcomingMaintenance.maintenanceStatus`

`enum`

`items.instances[].resourceStatus.upcomingMaintenance.maintenanceOnShutdown`

`boolean`

Indicates whether the UpcomingMaintenance will be triggered on VM shutdown.

`items.instances[].resourceStatus.upcomingMaintenance.maintenanceReasons[]`

`enum`

The reasons for the maintenance. Only valid for vms.

`items.instances[].resourceStatus.physicalHost`

`string`

Output only. The precise location of your instance within the zone's data center, including the block, sub-block, and host. The field is formatted as follows: blockId/subBlockId/hostId.

`items.instances[].resourceStatus.physicalHostTopology`

`object`

Output only. A series of fields containing the global name of the Compute Engine cluster, as well as the ID of the block, sub-block, and host on which the running instance is located.

`items.instances[].resourceStatus.physicalHostTopology.cluster`

`string`

Output only. The global name of the Compute Engine cluster where the running instance is located.

`items.instances[].resourceStatus.physicalHostTopology.block`

`string`

Output only. The ID of the block in which the running instance is located. Instances within the same block experience low network latency.

`items.instances[].resourceStatus.physicalHostTopology.subblock`

`string`

Output only. The ID of the sub-block in which the running instance is located. Instances in the same sub-block experience lower network latency than instances in the same block.

`items.instances[].resourceStatus.physicalHostTopology.host`

`string`

Output only. The ID of the host on which the running instance is located. Instances on the same host experience the lowest possible network latency.

`items.instances[].resourceStatus.shutdownDetails`

`object`

Output only. Details about the instance stopping state.

`items.instances[].resourceStatus.shutdownDetails.stopState`

`enum`

Current stopping state of the instance.

`items.instances[].resourceStatus.shutdownDetails.targetState`

`enum`

Target instance state.

`items.instances[].resourceStatus.shutdownDetails.requestTimestamp`

`string`

Past timestamp indicating the beginning of current `stopState` in RFC3339 text format.

`items.instances[].resourceStatus.shutdownDetails.maxDuration`

`object`

The duration for graceful shutdown. Only applicable when `stopState=PENDING_STOP`.

`items.instances[].resourceStatus.shutdownDetails.maxDuration.seconds`

`string (int64 format)`

Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years

`items.instances[].resourceStatus.shutdownDetails.maxDuration.nanos`

`integer`

Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.

`items.instances[].resourceStatus.reservationConsumptionInfo`

`object`

Output only. Reservation information that the instance is consuming from.

`items.instances[].resourceStatus.reservationConsumptionInfo.consumedReservation`

`string`

Output only. The full resource name of the reservation that this instance is consuming from.

`items.instances[].networkPerformanceConfig`

`object`

`items.instances[].networkPerformanceConfig.totalEgressBandwidthTier`

`enum`

`items.instances[].keyRevocationActionType`

`enum`

KeyRevocationActionType of the instance. Supported options are "STOP" and "NONE". The default value is "NONE" if it is not specified.

`items.instances[].partnerMetadata[]`

`map (key: string, value: object)`

Partner Metadata assigned to the instance. A map from a subdomain (namespace) to entries map.

`items.instances[].partnerMetadata[].entries`

``map (key: string, value: value (`Value` format))``

Map of a partner metadata that belong to the same subdomain. It accepts any value including google.protobuf.Struct.

`items.instances[].workloadIdentityConfig`

`object`

`items.instances[].workloadIdentityConfig.identity`

`string`

`items.instances[].workloadIdentityConfig.identityCertificateEnabled`

`boolean`

`items.warning`

`object`

Output only. Informational warning which replaces the list of instances when the list is empty.

`items.warning.code`

`enum`

Output only. A warning code, if applicable. For example, Compute Engine returns `NO_RESULTS_ON_PAGE` if there are no results in the response.

`items.warning.message`

`string`

Output only. A human-readable description of the warning code.

`items.warning.data[]`

`object`

Output only. Metadata about this warning in `key: value` format. For example:

"data": [  {  "key": "scope",  "value": "zones/us-east1-d"  }

`items.warning.data[].key`

`string`

Output only. A key that provides more detail on the warning being returned. For example, for warnings where there are no results in a list request for a particular zone, this key might be `scope` and the key value might be the zone name. Other examples might be a key indicating a deprecated resource and a suggested replacement, or a warning about invalid network settings (for example, if an instance attempts to perform IP forwarding but is not enabled for IP forwarding).

`items.warning.data[].value`

`string`

Output only. A warning data value corresponding to the key.

`nextPageToken`

`string`

Output only. This token allows you to get the next page of results for list requests. If the number of results is larger than `maxResults`, use the `nextPageToken` as a value for the query parameter `pageToken` in the next list request. Subsequent list requests will have their own `nextPageToken` to continue paging through the results.

`selfLink`

`string`

Output only. Server-defined URL for this resource.

`warning`

`object`

Output only. Informational warning message.

`warning.code`

`enum`

Output only. A warning code, if applicable. For example, Compute Engine returns `NO_RESULTS_ON_PAGE` if there are no results in the response.

`warning.message`

`string`

Output only. A human-readable description of the warning code.

`warning.data[]`

`object`

Output only. Metadata about this warning in `key: value` format. For example:

"data": [  {  "key": "scope",  "value": "zones/us-east1-d"  }

`warning.data[].key`

`string`

Output only. A key that provides more detail on the warning being returned. For example, for warnings where there are no results in a list request for a particular zone, this key might be `scope` and the key value might be the zone name. Other examples might be a key indicating a deprecated resource and a suggested replacement, or a warning about invalid network settings (for example, if an instance attempts to perform IP forwarding but is not enabled for IP forwarding).

`warning.data[].value`

`string`

Output only. A warning data value corresponding to the key.

`unreachables[]`

`string`

Output only. Unreachable resources.

### Authorization scopes

Requires one of the following OAuth scopes:

*   `https://www.googleapis.com/auth/compute.readonly`
*   `https://www.googleapis.com/auth/compute`
*   `https://www.googleapis.com/auth/cloud-platform`

For more information, see the Authentication Overview.

### IAM Permissions

In addition to any permissions specified on the fields above, authorization requires one or more of the following IAM permissions:

*   `compute.instances.list`

To find predefined roles that contain those permissions, see Compute Engine IAM Roles.

Send feedback