# WorkloadAllowlist

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

Skip to main content

 ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

Technology areas

close

*   AI and ML
    
*   Application development
    
*   Application hosting
    
*   Compute
    
*   Data analytics and pipelines
    
*   Databases
    
*   Distributed, hybrid, and multicloud
    
*   Industry solutions
    
*   Migration
    
*   Networking
    
*   Observability and monitoring
    
*   Security
    
*   Storage
    

Cross-product tools

close

*   Access and resources management
    
*   Costs and usage management
    
*   Infrastructure as code
    
*   SDK, languages, frameworks, and tools
    

/

Console

*   English
*   Deutsch
*   Español – América Latina
*   Français
*   Português – Brasil
*   中文 – 简体
*   日本語
*   한국어

Sign in

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/kubernetes-engine-color.svg)

*   Google Kubernetes Engine (GKE)

Start free

Overview Guides Reference Samples Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/vab7d3990237361b4739a5005ec80b0af3ee973650a028ed684c6b12bd1dc988a/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Overview
    *   Guides
    *   Reference
    *   Samples
    *   Resources
*   Cross-product tools
    *   More
*   Console

*   Kubernetes Engine
    
*   Authenticate to the GKE API
*   All APIs and references
*   API organization and structure
*   API permissions
*   GKE API
    
    *   Overview
    *   v1 API
        
        *   REST Resources
            
        *   projects.aggregated.usableSubnetworks
            
            *   Overview
            *   list
            
        *   projects.locations
            
            *   Overview
            *   getServerConfig
            
        *   projects.locations.clusters
            
            *   Overview
            *   checkAutopilotCompatibility
            *   completeIpRotation
            *   create
            *   delete
            *   fetchClusterUpgradeInfo
            *   get
            *   getJwks
            *   list
            *   setAddons
            *   setLegacyAbac
            *   setLocations
            *   setLogging
            *   setMaintenancePolicy
            *   setMasterAuth
            *   setMonitoring
            *   setNetworkPolicy
            *   setResourceLabels
            *   startIpRotation
            *   update
            *   updateMaster
            
        *   projects.locations.clusters.nodePools
            
            *   Overview
            *   completeUpgrade
            *   create
            *   delete
            *   fetchNodePoolUpgradeInfo
            *   get
            *   list
            *   rollback
            *   setAutoscaling
            *   setManagement
            *   setSize
            *   update
            
        *   projects.locations.operations
            
            *   Overview
            *   cancel
            *   get
            *   list
            
        *   projects.zones
            
            *   Overview
            *   getServerconfig
            
        *   projects.zones.clusters
            
            *   Overview
            *   addons
            *   completeIpRotation
            *   create
            *   delete
            *   fetchClusterUpgradeInfo
            *   get
            *   legacyAbac
            *   list
            *   locations
            *   logging
            *   master
            *   monitoring
            *   resourceLabels
            *   setMaintenancePolicy
            *   setMasterAuth
            *   setNetworkPolicy
            *   startIpRotation
            *   update
            
        *   projects.zones.clusters.nodePools
            
            *   Overview
            *   autoscaling
            *   create
            *   delete
            *   fetchNodePoolUpgradeInfo
            *   get
            *   list
            *   rollback
            *   setManagement
            *   setSize
            *   update
            
        *   projects.zones.operations
            
            *   Overview
            *   cancel
            *   get
            *   list
            
        *   Types
            
        *   Action
        *   ClusterUpdate
        *   ClusterUpgradeInfo
        *   ConfidentialNodes
        *   ContainerdConfig
        *   DisruptionEvent
        *   DisruptionType
        *   EventType
        *   GcfsConfig
        *   GetOpenIDConfigRequest
        *   GetOpenIDConfigResponse
        *   IssueNodeCertificateRequest
        *   IssueNodeCertificateResponse
        *   LinuxNodeConfig
        *   ListClustersResponse
        *   ListNodePoolsResponse
        *   ListOperationsResponse
        *   MaxPodsConstraint
        *   NetworkTierConfig
        *   NodeConfig
        *   NodeKubeletConfig
        *   NodeLabels
        *   NodeManagement
        *   NodePoolLoggingConfig
        *   NodePoolUpgradeInfo
        *   NodeTaints
        *   PodCIDROverprovisionConfig
        *   ResourceLabels
        *   ResourceManagerTags
        *   SecurityBulletinEvent
        *   ServerConfig
        *   ShieldedInstanceConfig
        *   State
        *   StatusCondition
        *   UpgradeAvailableEvent
        *   UpgradeDetails
        *   UpgradeEvent
        *   UpgradeInfoEvent
        *   UpgradeResourceType
        *   UpgradeSettings
        
    *   v1beta1 API
        
        *   REST Resources
            
        *   projects.aggregated.usableSubnetworks
            
            *   Overview
            *   list
            
        *   projects.locations
            
            *   Overview
            *   getServerConfig
            *   list
            
        *   projects.locations.clusters
            
            *   Overview
            *   checkAutopilotCompatibility
            *   completeControlPlaneUpgrade
            *   completeIpRotation
            *   create
            *   delete
            *   fetchClusterUpgradeInfo
            *   get
            *   getJwks
            *   list
            *   setAddons
            *   setLegacyAbac
            *   setLocations
            *   setLogging
            *   setMaintenancePolicy
            *   setMasterAuth
            *   setMonitoring
            *   setNetworkPolicy
            *   setResourceLabels
            *   startIpRotation
            *   update
            *   updateMaster
            
        *   projects.locations.clusters.nodePools
            
            *   Overview
            *   completeUpgrade
            *   create
            *   delete
            *   fetchNodePoolUpgradeInfo
            *   get
            *   list
            *   rollback
            *   setAutoscaling
            *   setManagement
            *   setSize
            *   update
            
        *   projects.locations.operations
            
            *   Overview
            *   cancel
            *   get
            *   list
            
        *   projects.zones
            
            *   Overview
            *   getServerconfig
            
        *   projects.zones.clusters
            
            *   Overview
            *   addons
            *   completeControlPlaneUpgrade
            *   completeIpRotation
            *   create
            *   delete
            *   fetchClusterUpgradeInfo
            *   get
            *   legacyAbac
            *   list
            *   locations
            *   logging
            *   master
            *   monitoring
            *   resourceLabels
            *   setMaintenancePolicy
            *   setMasterAuth
            *   setNetworkPolicy
            *   startIpRotation
            *   update
            
        *   projects.zones.clusters.nodePools
            
            *   Overview
            *   autoscaling
            *   create
            *   delete
            *   fetchNodePoolUpgradeInfo
            *   get
            *   list
            *   rollback
            *   setManagement
            *   setSize
            *   update
            
        *   projects.zones.operations
            
            *   Overview
            *   cancel
            *   get
            *   list
            
        *   Types
            
        *   Action
        *   ClusterUpdate
        *   ClusterUpgradeInfo
        *   ConfidentialNodes
        *   ContainerdConfig
        *   DisruptionEvent
        *   DisruptionType
        *   EventType
        *   GcfsConfig
        *   GetOpenIDConfigRequest
        *   GetOpenIDConfigResponse
        *   HostMaintenancePolicy
        *   LinuxNodeConfig
        *   ListClustersResponse
        *   ListNodePoolsResponse
        *   ListOperationsResponse
        *   MaxPodsConstraint
        *   NetworkTierConfig
        *   NodeConfig
        *   NodeKubeletConfig
        *   NodeLabels
        *   NodeManagement
        *   NodePoolLoggingConfig
        *   NodePoolUpgradeInfo
        *   NodeTaints
        *   PodCIDROverprovisionConfig
        *   ResourceLabels
        *   ResourceManagerTags
        *   SecurityBulletinEvent
        *   ServerConfig
        *   ShieldedInstanceConfig
        *   State
        *   StatusCondition
        *   UpgradeAvailableEvent
        *   UpgradeDetails
        *   UpgradeEvent
        *   UpgradeInfoEvent
        *   UpgradeResourceType
        *   UpgradeSettings
        
    *   Shared types
        
        *   Types
            
        *   Code
        *   Date
        *   Status
        *   TimeOfDay
        
    
*   GKE MCP reference
    
    *   Overview
    *   Tools
        
        *   list_k8s_api_resources
        *   check_k8s_auth
        *   describe_k8s_resource
        *   list_k8s_events
        *   get_k8s_resource
        *   get_k8s_cluster_info
        *   get_k8s_version
        *   get_k8s_rollout_status
        *   list_clusters
        *   create_cluster
        *   delete_cluster
        *   update_cluster
        *   get_cluster
        *   list_operations
        *   get_operation
        *   cancel_operation
        *   create_node_pool
        *   list_node_pools
        *   get_node_pool
        *   update_node_pool
        *   delete_node_pool
        *   get_k8s_logs
        *   apply_k8s_manifest
        *   delete_k8s_resource
        *   patch_k8s_resource
        
    
*   gcloud CLI reference
*   Terraform reference
*   Custom resource definitions
    
    *   AllowlistSynchronizer
    *   Agent Sandbox
    *   ComputeClass
    *   GCPDataSource
    *   HighAvailabilityApplication
    *   PodSnapshot
    *   WorkloadAllowlist
    *   CapacityBuffer
    
*   Client libraries
*   Kubernetes documentation (external)
*   Cloud Storage FUSE CSI driver
    
    *   Volume attributes
    
*   Managed Lustre CSI driver
    
    *   Managed Lustre CSI driver reference
    

*   AI and ML
*   Application development
*   Application hosting
*   Compute
*   Data analytics and pipelines
*   Databases
*   Distributed, hybrid, and multicloud
*   Industry solutions
*   Migration
*   Networking
*   Observability and monitoring
*   Security
*   Storage

*   Access and resources management
*   Costs and usage management
*   Infrastructure as code
*   SDK, languages, frameworks, and tools

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   Reference

Send feedback

# WorkloadAllowlist Stay organized with collections Save and categorize content based on your preferences.

Autopilot

`WorkloadAllowlist` is a custom resource definition (CRD) that lets you create allowlists for privileged workloads that you want to run in Autopilot mode. Cluster operators can install eligible `WorkloadAllowlist` objects in their clusters so that the clusters can run these privileged Autopilot workloads.

For more information, see About privileged workloads in Autopilot mode.

```
apiVersion: auto.gke.io/v1
kind: WorkloadAllowlist
minGKEVersion: 1.32.0-gke.1000000
metadata:
  name: partner1-workload1-v1.0.3
  annotations:
    autopilot.gke.io/no-connect: "true"
exemptions:
- autogke-disallow-hostnamespaces
- autogke-disallow-privilege
matchingCriteria:
  hostIPC: true
  hostPID: true
  hostNetwork: true
  hostUsers: true
  containers:
  - name: example-container
    image: example-image
    args:
    - example-arg
    - example-arg2
    command:
    - example-command
    - example-command2
    env:
    - name: example-env
      value: example-value
    envFrom:
    - configMapRef:
        name: example-configmap
    - secretRef:
        name: example-secret
    lifecycle:
      postStart:
        exec:
          command:
          - example-post-start-command
      preStop:
        exec:
          command:
          - example-pre-stop-command
    livenessProbe:
      exec:
        command:
        - example-liveness-probe-command
    readinessProbe:
      exec:
        command:
        - example-readiness-probe-command
    startupProbe:
      exec:
        command:
        - example-startup-probe-command
    securityContext:
      capabilities:
        add:
        - example-add-capability
        drop:
        - example-drop-capability
      privileged: true
    volumeMounts:
    - name: example-volume-mount-name
      mountPath: /example-mount-path
      readOnly: true
      subPath: example-subpath
    volumeDevices:
    - name: example-volume-device-name
      devicePath: /example-volume-device-path
  initContainers:
  # same fields as containers
  volumes:
  - name: example-volume
    gcePersistentDisk:
      pdName: example-pd-name
      fsType: example-fs-type
      readOnly: true
    hostPath:
      path: example-host-path
    nfs:
      path: example-nfs-path
      readOnly: true
    persistentVolumeClaim:
      readOnly: true
    configMap:
      name: example-configmap
      defaultMode: 0644
containerImageDigests:
- containerName: example-container
  imageDigests:
  - 92068f05ef629d16fb52e4f5c6cbb29c9056917ba5dc0347b9534dc54d1eb80d
  - 0cfc884cb0b17f8b97ba7e93e2da6d6cd3994bf027abf7a8a48a65fa61de2486
  - ba403c0166f4406edb2013e154b9b309f3cd7f6d64f61ca3578edd168f263e20
```

## WorkloadAllowlist specification

minGKEVersion: string
metadata:
  name: string
  annotations:
    autopilot.gke.io/no-connect: boolean
exemptions: []string
matchingCriteria: object (matchingCriteria)
containerImageDigests: [
  object (containerImageDigests)
]

Fields

`minGKEVersion`

_optional_

`string`

The minimum GKE version that supports the workload, if a version requirement exists. The format is `1.32.0-gke.1000000`.

`metadata`

_required_

`object`

Identifies the allowlist and configures optional annotations for matched workloads.

`metadata.name`

_optional_

`string`

The name of the `WorkloadAllowlist` object.

We recommend that you use a versioning system in this field help you to keep track of files in the repository and to keep file names unique.

`metadata.annotations[]`

_optional_

`string`

Annotations on which to match the corresponding workload. The only supported annotation is `autopilot.gke.io/no-connect`, which we strongly recommend that you set to `true`.

When set to `true`, this annotation prevents `exec` access to Pods in the workload. Unless your workload explicitly requires `exec` access, set this annotation to `true`.

The following behavior applies based on this annotation:

*   Set to `true`: GKE mutates your workload to prevent `exec` access.
*   Set to `false`: GKE allows `exec` access to your workload.
*   Not set: GKE mutates your workload to prevent `exec` access. This is the default behavior.

`exemptions[]`

_optional_

`string`

A list of Autopilot security constraints that you want to ignore for your workload. The following values are supported:

*   `autogke-disallow-privilege`: allows your workload to run privileged containers.
*   `autogke-disallow-hostnamespaces`: allows your workload to use host namespaces.
*   `autogke-no-write-mode-hostpath`: allows your workload to mount host path volumes in write mode.
*   `autogke-no-host-port`: allows your workload to expose a host port.
*   `autogke-default-linux-capabilities`: allows your workload to use more than the default Linux capabilities for Autopilot.
*   `autogke-pod-limit-constraints`: allows your Pods to request resources that exceed the resource limits for Autopilot.
*   `autogke-node-affinity-selector-limitation`: allows your Pod to use restricted keys, such as `kubernetes.io/hostname`, in `nodeAffinity` selectors.

`matchingCriteria`

_required_

`object (matchingCriteria)`

A set of criteria on which to match your workload so that Autopilot applies the allowlist to the workload.

`containerImageDigests[]`

_optional_

`object (containerImageDigests)`

A list of allowed SHA-256 image digests. GKE matches these values even if the image is in a different image repository.

### appArmorProfile

- appArmorProfile:
    type: string
    localHostProfile: string

Fields

`type`

_optional_

`string`

The type of AppArmor profile to use. Must be an exact match to the value in your workload specification. If you set this field to `"Unconfined"` in the allowlist, GKE matches any value in the workload specification.

`localHostProfile`

_optional_

`string`

The path to the local AppArmor profile to use. Must be an exact match to the value in your workload specification.

### capabilities

capabilities:
  add: []string
  drop: []string

Fields

`add[]`

_optional_

`string`

A list of Linux capabilities that a workload can add to containers. The workload can add a subset of the capabilities in this list.

`drop[]`

_optional_

`string`

A list of Linux capabilities that a workload must drop from containers. The workload must drop all of the capabilities in this list.

### containers

containers:
- name: string
  image: string
  args: []string
  command: []string
  env: [
    object (env)
  ]
  envFrom: [
    object (envFrom)
  ]
  lifecycle: object (lifecycle)
  livenessProbe: object (probe)
  readinessProbe: object (probe)
  startupProbe: object (probe)
  securityContext: object (securityContext)
  volumeMounts: [
    object (volumeMounts)
  ]
  volumeDevices: [
    object (volumeDevices)
  ]

Fields

`name`

_required_

`string`

The name of the container. Used for error message quality improvements. The name doesn't have to match the container name in your workload specification, unless the workload uses the `cloud.google.com/matching-allowlist` label.

For more information about troubleshooting privileged workloads, see Privileged workload deployment issues.

`image`

_required_

`string`

The container image path. Don't include the image digest or the image tag in this field.

This field supports exact matches or regular expressions that use the Google RE2 syntax. Regular expressions must start with the `^` character and end with the `$` character. If you omit these characters, workload matching fails.

Wildcard matching is supported. If your use of wildcard characters is too broad in scope, your allowlist request might be rejected.

The following table shows examples of valid values:

`gcr.io/image/path`

Matches workloads with values like the following:

*   `gcr.io/image/path:1234567890`
*   `gcr.io/image/path:latest`

`^example-auth\.google\.com\/go_[a-z0-9]+\/google\/path$`

Matches workloads with values like the following:

*   `example-auth.google.com/go_1234567890/google/path:1223`
*   `example-auth.google.com/go_abcd12345/google/path:latest`

`args[]`

_optional_

`string`

The argument keys and values to match. Every key:value pair in your workload container must match a corresponding entry in the allowlist.

This field supports exact matches or regular expressions that use the Google RE2 syntax. Regular expressions must start with the `^` character and end with the `$` character. If you omit these characters, workload matching fails.

Wildcard matching is supported. If your use of wildcard characters is too broad in scope, your allowlist request might be rejected.

The following table shows examples of valid values:

args:
- arg1=value1
- arg2=true
- arg3
                

Matches workloads with values like the following:

args:
- arg1=value1
- arg2=true
- arg3
                

args:
- arg1=value1
- arg2=true
                

args:
- ^--arg1=[0-9]+s$
- ^--arg2=(true|false)$
- arg3
                  

Matches workloads with values like the following:

args:
- --arg1=3s
- --arg2=true
- arg3
                

`command[]`

_optional_

`string`

The commands to match. Every command in your workload container must match a corresponding entry in the allowlist.

`env[]`

_optional_

`object (env)`

A list of environment variables to match.

`envFrom[]`

_optional_

`object (envFrom)`

A list of ConfigMaps or Secrets that define environment variables for the container.

`lifecycle`

_optional_

`object (lifecycle)`

Lifecycle handler commands that match the same fields in the workload specification.

`livenessProbe`

_optional_

`object (probe)`

Liveness probe commands to match against the same fields in the workload specification.

`readinessProbe`

_optional_

`object (probe)`

Readiness probe commands to match against the same fields in the workload specification.

`startupProbe`

_optional_

`object (probe)`

Startup probe commands to match against the same fields in the workload specification.

`volumeMounts[]`

_optional_

`object (volumeMounts)`

Specific fields in every `containers.volumeMounts` field in the workload specification must exactly match entries in the allowlist.

`volumeDevices[]`

_optional_

`object (volumeDevices)`

Specific fields in every `containers.volumeDevices` field in the workload specification must exactly match entries in the allowlist.

### containerImageDigests

containerImageDigests:
- containerName: string
  imageDigests: []string

Fields

`containerName`

_required_

`string`

The name of a container image that can exist in a different image repository as long as the SHA-256 image digest matches one of the values that you specify in the `imageDigests[]` field.

Every container in the `matchingCriteria.containers` field can have a corresponding entry in the `containerImageDigests` field.

`imageDigests[]`

_required_

`string`

A list of approved SHA-256 image digests that can match against the allowlist criteria even if the container image is in a different image repository.

### env

env:
- name: string

Fields

`name`

_required_

`string`

The name of the environment variable. The name must match the `name` field of an environment variable in your workload specification. All other fields in the `env` field are ignored.

This field supports exact matches or regular expressions that use the Google RE2 syntax. Regular expressions must start with the `^` character and end with the `$` character. If you omit these characters, workload matching fails.

Wildcard matching is supported. If your use of wildcard characters is too broad in scope, your allowlist request might be rejected.

The following table shows examples of valid values:

env:
- name: env_1
- name: env_2
- name: env_3
                

Matches workloads with values like the following:

env:
- name: env_1
  value: "val_1"
- name: env_2
  value: "val_2"
                

env:
- name: ^ENV_.*$
- name: ^FOO_BAR$
                

Matches workloads with values like the following:

env:
- name: ENV_1
  value: "val_1"
- name: ENV_2
  valueFrom:
    secretKeyRef:
      name: secret-1
      key: key-1
- name: FOO_BAR
  value: "val_3"
                

### envFrom

envFrom:
- configMapRef:
    name: string
- secretRef:
    name: string

Fields

`configMapRef.name`

`secretRef.name`

_optional_

`string`

The `name` field of every `envFrom.configMapRef` or the `envFrom.secretRef` field in your workload specification must exactly match a corresponding entry in the allowlist. All other fields in the `envFrom` field are ignored.

The following table shows examples of valid values:

envFrom:
- configMapRef:
    name: configmap-name1
- secretRef:
    name: secret-name1
                

Matches workloads with values like the following:

envFrom:
- prefix: CONFIG_
  configMapRef:
    name: configmap-name1
- prefix: SECRET_
  secretRef:
    name: secret-name1
                

envFrom:
- prefix: CONFIG_
  configMapRef:
    name: configmap-name1

### gcePersistentDisk

gcePersistentDisk:
  fsType: string
  partition: string
  readOnly: boolean

Fields

`fsType`

_optional_

`string`

The file system type of the persistent disk. Must be an exact match to the value in your workload specification.

`partition`

_optional_

`string`

The partition of the persistent disk. Must be an exact match to the value in your workload specification.

`readOnly`

_optional_

`boolean`

Set to `false` if your matched workload specification sets this to `false` or if your workload omits this field. If your workload sets this to `true`, you can omit this field in the allowlist.

### configMap

configMap:
  name: string
  defaultMode: integer

Fields

`name`

_optional_

`string`

The name of the configMap populating the volume.

`defaultMode`

_optional_

`integer`

Mode bits used to set permissions on created files. Must be an octal value between 0000 and 0777, or a decimal value between 0 and 511. If omitted, any workloads must use the default value (0644) or omit. If included, a workload `configMap` must have an exactly matching `defaultMode` value.

### hostPath

hostPath:
  path: string

Fields

`path`

_optional_

`string`

The path of the host directory to mount. Must be an exact match to the path in your workload specification.

### initContainers

List of fields that match specific initContainer configuration fields in your workload specification. The requirements are the same as for the `containers` field.

### lifecycle

lifecycle:
  postStart: object (lifecycleHandler)
  preStop: object (lifecycleHandler)

Fields

`postStart`

`preStop`

_optional_

`object (lifecycleHandler)`

Commands from the postStart and preStop lifecycle handlers to match against the workload. All other fields in the `lifecycle` field are ignored.

### lifecycleHandler

postStart:
  exec:
    command: string
preStop:
  exec:
    command: string

Fields

`postStart.exec.command`

`preStop.exec.command`

_optional_

`string`

Every value in the `exec.command` fields of the `lifecycle.preStop` and the `lifecycle.postStart` fields in the workload specification must exactly match entries in the allowlist. All other fields in the `lifecycle` field are ignored.

The following table shows examples of valid values:

lifecycle:
  postStart:
    exec:
      command: ["sleep 5"]
  preStop:
    exec:
      command: ["/bin/sh", "-c"]
                

Matches workloads with values like the following:

lifecycle:
  postStart:
    exec:
      command: ["sleep 5"]
  preStop:
    exec:
      command: ["/bin/sh", "-c"]
                

lifecycle:
  postStart:
    exec:
      command: ["sleep 5"]
                

lifecycle:
  preStop:
    exec:
      command: ["/bin/sh", "-c"]
                

### matchingCriteria

matchingCriteria:
  hostIPC: boolean
  hostPID: boolean
  hostNetwork: boolean
  hostUsers: boolean
  containers: [
    object(containers)
  ]
  initContainers: [
    object(initContainers)
  ]
  volumes: [
    object (volumes)
  ]
  securityContext: object (PodSecurityContext)

Fields

`hostIPC`

_optional_

`boolean`

Set this field to `true` if your matched workload specification sets this to `true`.

`hostPID`

_optional_

`boolean`

Set this field to `true` if your matched workload specification sets this to `true`.

`hostNetwork`

_optional_

`boolean`

Set this field to `true` if your matched workload specification sets this to `true`.

`hostUsers`

_optional_

`boolean`

Set this field to `true` if your matched workload specification sets this to `true`.

`containers[]`

_optional_

`object (containers)`

A list of fields that match containers in your workload specification. For a workload to match the allowlist, specific fields in every container configuration in the workload must match entries in the allowlist `containers` field.

`initContainers[]`

_optional_

`object (initContainers)`

A list of fields that match initContainers in your workload specification. For a workload to match the allowlist, specific fields in every initContainer configuration in the workload must match entries in the allowlist `initContainers` field.

`volumes[]`

_optional_

`object` (`volumes`)

A list of fields that match volumes in your workload specification. For a workload to match the allowlist, specific volume configuration fields in the workload must match entries in the allowlist `volumes` field.

`securityContext`

_optional_

`object` (`PodSecurityContext`)

A list of fields that match entries in the Pod-level `securityContext` field. For a workload to match the allowlist, specific security configurations in the workload must match entries in the allowlist `securityContext` field.

### nfs

nfs:
  path: string
  readOnly: boolean

Fields

`path`

_optional_

`string`

The path of the NFS volume to mount. Must be an exact match to the path in your workload specification.

`readOnly`

_optional_

`boolean`

Set to `false` if your matched workload specification sets this to `false` or if your workload omits this field. If your workload sets this to `true`, you can omit this field in the allowlist.

### persistentVolumeClaim

persistentVolumeClaim:
  readOnly: boolean

Fields

`readOnly`

_optional_

`boolean`

Set to `false` if your matched workload specification sets this to `false` or if your workload omits this field. If your workload sets this to `true`, you can omit this field in the allowlist.

### PodSecurityContext

List of fields that match specific Pod `securityContext` configuration fields in your workload specification.

securityContext:
- appArmorProfile: object (appArmorProfile)

Fields

`appArmorProfile`

_optional_

`object (appArmorProfile)`

Match configured AppArmor profiles in the workload.

### probe

livenessProbe:
  exec:
    command: string
readinessProbe:
  exec:
    command: string
startupProbe:
  exec:
    command: string

Fields

`exec.command`

_optional_

`string`

Every command in the workload specification must exactly match the entire list of entries in this field in the allowlist. All other fields in the `livenessProbe` field, the `readinessProbe` field, and the `startupProbe` field are ignored.

### securityContext

securityContext:
  capabilities: object (capabilities)
  privileged: boolean

Fields

`capabilities`

_optional_

`object (capabilities)`

A list of Linux capabilities that a workload can add or remove.

`privileged`

_optional_

`boolean`

Set to `true` if your matched workload specification sets this to `true`. If your workload doesn't use privileged containers, omit this field.

### volumes

List of fields that match specific volume configuration fields in your workload specification. Every `volumes` field entry in your workload specification must match a `volumes` field entry in the allowlist.

- name: string
  hostPath: object (hostPath)
  nfs: object (nfs)
  persistentVolumeClaim: object (persistentVolumeClaim)
  gcePersistentDisk: object (gcePersistentDisk)
  configMap: object (configMap)

Fields

`name`

_optional_

`string`

The name of the volume. Used for identification and for error messages.

`hostPath`

_optional_

`object (hostPath)`

Match configured host instance directory mounts.

`nfs`

_optional_

`object (nfs)`

Match configured NFS volume mounts.

`persistentVolumeClaim`

_optional_

`object (persistentVolumeClaim)`

Match configured PersistentVolumeClaim references.

`gcePersistentDisk`

_optional_

`object (gcePersistentDisk)`

Match configured Compute Engine Persistent Disk references.

`configMap`

_optional_

`object (configMap)`

Match configured configMap references.

### volumeDevices

volumeDevices:
- name: string
  devicePath: string

Fields

`name`

_optional_

`string`

The name of the volume device. The value must exactly match an entry in the allowlist.

`devicePath`

_optional_

`string`

The path inside the container that the device is mapped to. The value must exactly match an entry in the allowlist.

### volumeMounts

volumeMounts:
- name: string
  mountPath: string
  readOnly: boolean
  subPath: string

Fields

`name`

_optional_

`string`

The name of the volume. Used for identification and for error messages.

`mountPath`

_optional_

`string`

The mount path of the volume.

`readOnly`

_optional_

`boolean`

Set to `false` if your matched workload specification sets this to `false` or if your workload omits this field. If your workload sets this to `true`, you can omit this field in the allowlist.

`subPath`

_optional_

`string`

Path within the volume from which the container's volume should be mounted. Defaults to "" (volume's root). If present in allowlist, workload must have an exact match.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-06-09 UTC.

*   ### Products and pricing
    
    *   See all products
    *   Google Cloud pricing
    *   Google Cloud Marketplace
    *   Contact sales
*   ### Support
    
    *   Community forums
    *   Support
    *   Release Notes
    *   System status
*   ### Resources
    
    *   GitHub
    *   Getting Started with Google Cloud
    *   Code samples
    *   Cloud Architecture Center
    *   Training and Certification
*   ### Engage
    
    *   Blog
    *   Events
    *   X (Twitter)
    *   Google Cloud on YouTube
    *   Google Cloud Tech on YouTube

*   About Google
*   Privacy
*   Site terms
*   Google Cloud terms
*   Manage cookies
*   Our third decade of climate action: join us
*   Sign up for the Google Cloud newsletter Subscribe

*   English
*   Deutsch
*   Español – América Latina
*   Français
*   Português – Brasil
*   中文 – 简体
*   日本語
*   한국어