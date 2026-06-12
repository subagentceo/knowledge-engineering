# Allow direct connections to Autopilot Pods using hostPort

    
    
      
    

    
      
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
*   Español
*   Español – América Latina
*   Français
*   Indonesia
*   Italiano
*   Português
*   Português – Brasil
*   עברית
*   中文 – 简体
*   中文 – 繁體
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

*   Discover
    
*   Product overview
*   Explore GKE documentation
    
    *   Overview
    *   Main GKE documentation
    *   GKE AI/ML documentation
    *   GKE networking documentation
    *   GKE security documentation
    *   GKE fleet management documentation
    
*   Use GKE or Cloud Run?
*   Try it
    
    *   Create a cluster in the console
    *   Create a cluster with Terraform
    *   Explore your cluster
    
*   Fine-tune GKE services with Gemini assistance
*   Learn fundamentals
    
*   Start learning about GKE
*   Learn Kubernetes fundamentals
    
    *   Start learning about Kubernetes
    *   Introducing containers
    *   Kubernetes comic
    *   Kubernetes.io
    *   Video playlist: Learn Kubernetes with Google
    
*   Learn GKE essentials
    
    *   GKE modes of operation
    *   Video playlist: GKE Essentials
    
*   Common GKE user roles and tasks
*   Get started
    
*   Cluster lifecycle
*   Cluster administration overview
*   Cluster configuration
*   Deploying workloads
*   GKE cluster architecture
*   Workflows and tools
    
    *   gcloud CLI overview
    *   GKE in the Google Cloud console
    *   Provision GKE resources with Terraform
    *   Install kubectl and configure cluster access
    *   Simplify deployment using your IDE
    *   Use the GKE remote MCP server
    
*   Learning path: Containerize your app
    
    *   Overview
    *   Understand the monolith
    *   Modularize the monolith
    *   Prepare for containerization
    *   Containerize the modular app
    *   Deploy the app to a cluster
    
*   Learning path: Scalable apps
    
    *   Overview
    *   Create a cluster
    *   Monitor with Prometheus
    *   Scale workloads
    *   Simulate failure
    *   Centralize changes
    *   Production considerations
    
*   Design and plan
    
*   Code samples
*   Best practices for GKE
*   Architectures
    
    *   Develop and deliver apps with Cloud Code, Cloud Build, and Google Cloud Deploy
    *   Address continuous delivery challenges
    
*   Set up GKE clusters
    
*   Plan clusters for running your workloads
    
    *   Compare features in GKE Autopilot and Standard
    *   About regional clusters
    *   About feature gates
    *   About alpha clusters
    *   About machine support with GKE clusters
    
*   Set up Autopilot clusters
    
    *   About GKE Autopilot
    *   Create Autopilot clusters
    *   Extend the run time of Autopilot Pods
    
*   Set up Standard clusters
    
    *   Create a zonal cluster
    *   Create a regional cluster
    *   Create an alpha cluster
    *   Create a cluster using Windows node pools
    
*   Prepare to use clusters
    
    *   Use labels to organize clusters
    *   Manage GKE resources using Tags
    
*   Configure node pools
    
    *   About node pools
    *   Add and manage node pools
    *   About node images
    *   About Containerd images
    *   Specify a node image
    *   About Arm workloads on GKE
    *   Create Standard clusters and node pools with Arm nodes
    *   Plan GKE Standard node sizes
    *   About Spot VMs
    *   About Windows Server containers
    *   Auto-repair nodes
    *   Automatically bootstrap GKE nodes with DaemonSets
    *   Update Kubernetes node labels and taints for node pools
    *   Use nested VMs with GKE Standard clusters
    
*   Set up clusters for multi-tenancy
    
    *   About cluster multi-tenancy
    *   Plan a multi-tenant environment
    *   Prepare GKE clusters for third-party tenants
    *   Set up multi-tenant logging
    
*   Use fleets to simplify multi-cluster management
    
    *   About fleets
    *   Create fleets
    
*   Enhance scalability for clusters
    
    *   About GKE scalability
    *   Plan for scalability
    *   Plan for large GKE clusters
    *   Plan for large workloads
    *   About capacity buffers
    *   Configure capacity buffers
    *   Provision extra compute capacity for rapid Pod scaling
    *   Consume reserved zonal resources
    *   About quicker workload startup with fast-starting nodes
    
*   Reduce and optimize costs
    
*   Plan for cost-optimization
*   View GKE costs
    
    *   View cluster costs breakdown
    *   View cost-related optimization metrics
    
*   Optimize GKE costs
    
    *   Right-size your GKE workloads at scale
    *   Reduce costs by scaling down GKE clusters during off-peak hours
    *   Identify underprovisioned and overprovisioned GKE clusters
    *   Identify idle GKE clusters
    *   Identify underprovisioned and overprovisioned workloads
    
*   Configure autoscaling for infrastructure
    
    *   About cluster autoscaling
    *   Configure cluster autoscaling
    *   About node pool auto-creation
    *   Configure node pool auto-creation
    *   View cluster autoscaling events
    
*   Configure autoscaling for workloads
    
    *   Scaling deployed applications
    *   About autoscaling workloads based on metrics
    *   Optimize Pod autoscaling based on metrics
    *   About horizontal Pod autoscaling
    *   Autoscale deployments using horizontal Pod autoscaling
    *   Configure autoscaling for LLM workloads on GPUs
    *   Configure autoscaling for LLM workloads on TPUs
    *   View horizontal Pod autoscaler events
    *   Scale to zero using KEDA
    *   About vertical Pod autoscaling
    *   Configure multidimensional Pod autoscaling
    *   Scale container resource requests and limits
    *   Expose custom metrics
    
*   Provision storage
    
*   About storage for GKE clusters
*   Use Kubernetes features, primitives, and abstractions for storage
    
    *   Use persistent volumes and dynamic provisioning
    *   Use StatefulSets
    *   About volume snapshots
    *   Use volume expansion
    *   Populate volumes with data from Cloud Storage
        
        *   About the GKE Volume Populator
        *   Automate data transfer to Parallelstore
        *   Automate data transfer to Hyperdisk ML
        
    
*   Block storage
    
    *   Provision and use Persistent Disks
        
        *   Using the Compute Engine Persistent Disk CSI driver
        *   Persistent volume attach limits
        *   Using pre-existing persistent disks
        *   Manually install a CSI driver
        *   Using persistent disks with multiple readers (ReadOnlyMany)
        *   Persistent disks backed by SSD
        *   Regional persistent disks
        *   Increase stateful app availability with Stateful HA Operator
        
    *   Provision and use Hyperdisk
        
        *   About Hyperdisk
        *   Scale your storage performance using Hyperdisk
        *   Optimize storage performance and cost with Hyperdisk Storage Pools
        *   Accelerate AI/ML data loading using Hyperdisk ML
        
    *   Provision and use GKE Data Cache
        
        *   Accelerate read performance of stateful workloads with GKE Data Cache
        
    *   Manage your persistent storage
        
        *   Configure a boot disk for node file systems
        *   Clone persistent disks
        *   Back up and restore Persistent Disk storage using volume snapshots
        
    *   Optimize disk performance
        
        *   About optimizing disk performance
        *   Monitor disk performance
        
    
*   Local SSD and ephemeral storage
    
    *   About Local SSD storage for GKE
    *   Provision Local SSD-backed ephemeral storage
    *   Provision Local SSD-backed raw block storage
    *   Create a Deployment using an EmptyDir Volume
    *   Use dedicated Persistent Disks as ephemeral volumes
    
*   File storage
    
    *   Provision and use Lustre volumes
        
        *   About Managed Lustre for GKE
        *   Create and use a volume backed by Managed Lustre
        *   Access existing Managed Lustre instances
        *   Expand Managed Lustre volumes
        
    *   Provision and use Filestore
        
        *   About Filestore support for GKE
        *   Access Filestore instances
        *   Deploy a stateful workload with Filestore
        *   About Filestore multishares for GKE
        *   Optimize multishares for GKE
        *   Back up and restore Filestore storage using volume snapshots
        
    *   Provision and use Parallelstore volumes
        
        *   About Parallelstore for GKE
        *   Create and use a volume backed by Parallelstore
        *   Access existing Parallelstore instances
        *   Provision Managed Lustre on GKE using XPK
        *   Access existing Lustre instances
        
    
*   Object storage
    
    *   Quickstart: Cloud Storage FUSE CSI driver for GKE
    *   About the Cloud Storage FUSE CSI driver for GKE
    *   Set up the Cloud Storage FUSE CSI driver
    *   Mount Cloud Storage buckets as ephemeral volumes
    *   Mount Cloud Storage buckets as persistent volumes
    *   Configure the Cloud Storage FUSE CSI driver sidecar container
    *   Optimize Cloud Storage FUSE performance
        
        *   Automate performance tuning with performance profiles
        *   Manual performance tuning
        
    
*   Deploy and manage workloads
    
*   Deploy Autopilot workloads
    
    *   Plan resource requests for Autopilot workloads
    *   About Autopilot workloads in GKE Standard
    *   Run Autopilot workloads in Standard clusters
    
*   Configure node attributes with ComputeClasses
    
    *   About GKE ComputeClasses
    *   About built-in ComputeClasses in GKE
    *   About custom ComputeClasses
    *   Control autoscaled node attributes with custom ComputeClasses
    *   Apply ComputeClasses to Pods by default
    *   About Balanced and Scale-Out ComputeClasses in Autopilot clusters
    *   Choose predefined ComputeClasses for Autopilot Pods
    
*   Deploy workloads on optimized hardware
    
    *   Minimum CPU platforms for compute-intensive workloads
    *   Configure Pod bursting in GKE
    *   Analyze CPU performance using the PMU
    *   Run high performance computing (HPC) workloads with H4D
    *   Best practices for running HPC workloads
    
*   Deploy workloads that have special security requirements
    
    *   About privileged workload admission in Autopilot mode
    *   Create allowlists for privileged workloads in Autopilot mode
    *   GKE Autopilot partners
    *   Privileged open source workloads in Autopilot mode
    *   Restrict privileged Autopilot workloads in organizations
    *   Control privileged workload admission in Autopilot mode
    *   Troubleshoot privileged Autopilot workloads and allowlists
    
*   Deploy workloads that require specialized devices
    
    *   About dynamic resource allocation (DRA) in GKE
    *   Prepare your GKE infrastructure for DRA
    *   Deploy DRA workloads
    
*   Snapshot and restore workloads with Pod snapshots
    
    *   About Pod snapshots
    *   Restore from a Pod snapshot
    
*   Migrate workloads
    
    *   Identify Standard clusters to migrate to Autopilot
    *   Prepare to migrate to Autopilot clusters from Standard clusters
    
*   Manage workloads
    
    *   Place GKE Pods in specific zones
    *   Simulate zone failure
    *   Improve workload efficiency using NCCL Fast Socket
    *   About container image digests
    *   Using container image digests in Kubernetes manifests
    *   Improve workload initialization speed
        
        *   Use streaming container images
        *   Use secondary boot disks to preload data or container images
        
    *   Isolate your workloads using namespaces
    
*   Continuous integration and delivery
    
    *   Plan for continuous integration and delivery
    *   Create a CI/CD pipeline with Azure Pipelines
    *   GitOps-style continuous delivery with Cloud Build
    *   Modern CI/CD with GKE
        
        *   A software delivery framework
        *   Build a CI/CD system
        *   Apply the developer workflow
        
    
*   Deploy workloads by application types
    
*   AI/ML workloads
    
    *   AI/ML orchestration on GKE
    *   About GKE Hypercluster
    
*   Databases, caches, and data streaming workloads
    
    *   Data on GKE
    *   Plan your database deployments on GKE
    *   Managed databases
        
        *   Deploy an app using GKE Autopilot and Spanner
        *   Deploy WordPress on GKE with Persistent Disk and Cloud SQL
        *   Analyze data on GKE using BigQuery, Cloud Run, and Gemma
        
    *   Kafka
        
        *   Deploy Apache Kafka to GKE using Strimzi
        *   Deploy Apache Kafka to GKE using Confluent
        
    *   Redis
        
        *   Create a multi-tier web application with Redis and PHP
        *   Deploy a Redis cluster on GKE
        *   Deploy Redis to GKE using Redis Enterprise
        
    *   MySQL
        
        *   Deploy a stateful MySQL cluster
        *   Migrate your MySQL data from Persistent Disk to Hyperdisk using snapshots
        *   Migrate your MySQL data from Persistent Disk to Hyperdisk using Backup for GKE
        
    *   PostgreSQL
        
        *   Deploy a highly-available PostgreSQL database
        *   Deploy PostgreSQL to GKE using Zalando
        *   Deploy PostgreSQL to GKE using CloudNativePG
        
    *   SQL Server
        
        *   Deploy single instance SQL Server 2017 on GKE
        
    *   Memcached
        
        *   Deploy Memcached on GKE
        
    *   Vector databases
        
        *   Build a RAG chatbot using GKE and Cloud Storage
        *   Deploy a Qdrant database on GKE
        *   Deploy an Elasticsearch database on GKE
        *   Deploy a PostgreSQL vector database on GKE
        *   Deploy a Weaviate vector database on GKE
        
    
*   Web servers and applications
    
    *   Plan for serving websites
    *   Deploy a stateful app
    *   Ensure workloads are disruption-ready
    *   Deploy a stateless app
    *   Allow direct connections to Autopilot Pods using hostPort
    *   Run Django
    *   Deploy an application from Cloud Marketplace
    *   Run full-stack workloads at scale on GKE
    *   Deploy a containerized web server app
    
*   Game Servers
    
    *   Get support for Agones and Game Servers issues
    *   Isolate the Agones controller in your GKE cluster
    
*   Deploy Arm workloads
    
    *   Prepare an Arm workload for deployment to Standard clusters
    *   Build multi-arch images for Arm workloads
    *   Deploy Autopilot workloads on Arm architecture
    *   Migrate x86 application on GKE to multi-arch with Arm
    
*   Microsoft Windows
    
    *   Deploy a Windows Server application
    *   Build Windows Server multi-arch images
    *   Deploy ASP.NET apps with Windows Authentication in GKE Windows containers
    
*   Run fault-tolerant workloads at lower costs
    
    *   Use Spot Pods on Autopilot clusters
    *   Use Spot VMs to run workloads on GKE Standard clusters
    *   Use preemptible VMs to run workloads
    
*   Manage and optimize clusters
    
*   Manage cluster lifecycle changes to minimize disruption
*   Optimize your usage of GKE with insights and recommendations
*   Manage a GKE cluster
*   Configure a cluster and workload for staging
*   Upgrade clusters and node pools
    
    *   About GKE cluster upgrades
    *   Plan for cluster upgrades
    *   About release channels
    *   Use release channels
    *   About Autopilot cluster upgrades
    *   About Standard cluster upgrades
    *   Auto-upgrade nodes
    *   Manually upgrade a cluster's control plane or node pools
    *   About node upgrade strategies
    *   Configure node upgrade strategies
    *   About maintenance windows and exclusions
    *   Configure maintenance windows and exclusions
    *   About cluster upgrades with rollout sequencing
    *   Sequence the rollout of cluster upgrades
    *   Control the frequency of disruption from auto-upgrades
    
*   Get notifications for cluster events
    
    *   About cluster notifications
    *   Receive cluster notifications through Pub/Sub
    *   Configure cluster to receive email notifications
    *   Configure cluster notifications for third-party services
    *   Get visibility into cluster upgrades
    
*   Manage nodes
    
    *   Ensure resources for node upgrades
    *   Resize clusters by adding or removing nodes
    *   Define compact placement for nodes
    *   Migrate nodes to a different machine type
    *   Understand how to do host maintenance on GKE
    *   Perform host maintenance for nodes running training and inference workloads
    *   Migrate nodes to Linux cgroupv2
    *   Configure writable cgroups for containers
    *   Customize containerd configuration
    *   Customize node system configuration
    *   Configure nodes to use disk space as virtual memory
    *   Configure Windows Server nodes to join a domain
    *   Simultaneous multi-threading (SMT) for high performance compute
    
*   Delete clusters
*   Use Kubernetes beta APIs with GKE clusters
*   Ensure control plane stability when using webhooks
*   Use Backup for GKE
*   Monitor
    
*   Observability for GKE
*   Set up Google Cloud Managed Service for Prometheus
*   Use Managed OpenTelemetry
    
    *   Managed OpenTelemetry overview
    *   Deploy Managed OpenTelemetry
    
*   Monitor clusters and workloads
    
    *   Configure metrics collection
    *   Configure automatic application monitoring for workloads
    *   View observability metrics
    *   Collect and view observability metrics
        
        *   Collect and view control plane metrics
        *   Collect and view kube state metrics
        *   Collect and view cAdvisor/Kubelet metrics
        *   Collect and view DCGM metrics
        *   Use application performance metrics
        
    *   Monitor startup latency metrics
    *   Understand cluster usage profiles with GKE usage metering
    *   Application observability with Prometheus on GKE
    *   Set up Elastic Stack on GKE
    
*   View and process logs
    
    *   About GKE logs
    *   View GKE logs
    *   Control log ingestion
    *   Adjust log throughput
    *   Set up multi-tenant logging
    
*   Troubleshooting
    
*   Overview
*   Introduction to troubleshooting
    
    *   Overview
    *   Review service health and incidents
    *   Assess cluster and workload health
    *   Investigate a cluster's state
    *   Conduct historical analysis
    *   Perform proactive monitoring
    *   Accelerate diagnosis
    *   Example troubleshooting scenario
    
*   Cluster setup
    
    *   Cluster creation
    *   Autopilot clusters
    *   Kubectl command-line tool
    *   Standard node pools
    *   Node NotReady status
    *   Node registration
    *   Container runtime
    
*   Autoscaling
    
    *   Cluster autoscaler not scaling down
    *   Cluster autoscaler not scaling up
    *   Horizontal Pod autoscaling
    *   Custom ComputeClass
    
*   Storage
    
    *   Storage in GKE
    *   GKE Volume Populator
    
*   Cluster security
*   Networking
*   Workloads
    
    *   Deployed workloads
    *   Image pulls
    *   CrashLoopBackOff events
    *   OOM events
    *   Arm workloads
    *   TPUs
    *   GPUs
    *   Privileged workloads on Autopilot
    
*   Cluster management
    
    *   Upgrades
    *   Concurrent operations
    *   Webhooks
    *   Namespace stuck in the Terminating state
    *   Scalability
    
*   Monitoring
    
    *   System metrics
    *   Monitoring dashboards
    *   Missing logs
    
*   4xx errors
*   Known issues
*   Deprecations
    
*   Feature and API deprecations
*   Viewing deprecation insights and recommendations
*   Configure exec probe timeouts before upgrading to GKE version 1.35
*   Posture management feature deprecations
*   Transition from Container Registry to Artifact Registry in GKE
*   Migrate nodes to containerd 2
*   Workload vulnerability scanning removal in GKE standard edition
*   Deprecated authentication plugin for Kubernetes clients
*   PodSecurityPolicy deprecation
*   About the Docker node image deprecation
*   Ensure compatibility of TLS certificates before upgrading to GKE 1.29
*   Ensuring compatibility of webhook certificates before upgrading to v1.23
*   Kubernetes API deprecations
    
    *   Kubernetes 1.32 deprecated APIs
    *   Kubernetes 1.29 deprecated APIs
    *   Kubernetes 1.27 deprecated APIs
    *   Kubernetes 1.26 deprecated APIs
    *   Kubernetes 1.25 deprecated APIs
    *   Kubernetes Ingress Beta APIs removed in GKE 1.23
    *   Kubernetes 1.22 deprecated APIs
    
*   Archive
    
*   Creating GKE private clusters with network proxies for controller access
*   Windows Server Semi-Annual Channel end of servicing
*   Remotely access a private cluster using a bastion host
*   Setting up automated deployments
*   Migrate workloads to GKE
*   Performing rolling updates
*   Serve a model with a single GPU in GKE
*   Serve Gemma open models using GPUs on GKE with Hugging Face TGI
*   Serve Gemma using GPUs on GKE with Triton and TensorRT-LLM
*   Serve Llama models using GPUs on GKE with vLLM
*   Serve an LLM using TPUs on GKE with JetStream and PyTorch
*   Serve Gemma using TPUs on GKE with JetStream
*   Serve open source models using TPUs on GKE with Optimum TPU
*   Serve Gemma on TPUs with Saxml
*   Serve an LLM using multi-host TPUs with Saxml
*   Provision Cloud Service Mesh in an Autopilot cluster

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
*   Guides

Send feedback

# Allow direct connections to Autopilot Pods using hostPort Stay organized with collections Save and categorize content based on your preferences.

Autopilot

This page shows you how to expose a random port in a Pod running in a Google Kubernetes Engine (GKE) Autopilot cluster.

Exposing a port in a Pod lets the Pod accept incoming connections directly, without a load balancer. GKE chooses a random port to open from a range that you specify in the Pod specification. This type of random port exposure is useful when your workload requires direct incoming connections but doesn't rely on a persistent port number. An example of this type of workload is an Agones GameServer resource with the default `Dynamic` port policy.

When you request a random port, GKE overrides the value in the `hostPort` field in the container specification to the port that GKE selected for you.

## Before you begin

Before you start, make sure that you have performed the following tasks:

*   Enable the Google Kubernetes Engine API.
Enable Google Kubernetes Engine API*   If you want to use the Google Cloud CLI for this task, install and then initialize the gcloud CLI. If you previously installed the gcloud CLI, get the latest version by running the `gcloud components update` command. Earlier gcloud CLI versions might not support running the commands in this document.
    
    **Note:** For existing gcloud CLI installations, make sure to set the `compute/region` property. If you use primarily zonal clusters, set the `compute/zone` instead. By setting a default location, you can avoid errors in the gcloud CLI like the following: `One of [--zone, --region] must be supplied: Please specify location`. You might need to specify the location in certain commands if the location of your cluster differs from the default that you set.
    

*   Ensure that you have a GKE Autopilot cluster running version 1.24.7-gke.1200 and later or 1.25.3-gke.1100 and later.

### Limitations

You can only assign random hostPorts for static Pods or for Pods that are managed by a custom controller, such as Agones. This functionality isn't supported on Kubernetes managed controllers such as Deployments.

## Request a random port

1.  Save the following manifest as `host-port-pod.yaml`:
    
    ```
    apiVersion: v1
    kind: Pod
    metadata:
      name: game-pod
      annotations:
        autopilot.gke.io/host-port-assignment: '{"min":MIN_PORT,"max":MAX_PORT}'
    spec:
      containers:
      - name: local-chat
        image: ubuntu
        command: ["sleep", "infinity"]
        ports:
        - containerPort: 80
          hostPort: HOST_PORT1
          protocol: TCP
      - name: game-server
        image: ubuntu
        command: ["sleep", "infinity"]
        ports:
        - containerPort: 80
          hostPort: HOST_PORT2
          protocol: UDP
    ```
    
    Replace the following:
    
    *   `MIN_PORT`: the minimum port number for the range from which GKE chooses a random port.
    *   `MAX_PORT`: the maximum port number for the range from which GKE chooses a random port.
    *   `HOST_PORT1, HOST_PORT2`: any valid port number. When the Pod is scheduled, GKE updates this field with the randomly assigned port. If you have multiple containers, use different port numbers for each container.
    
    The port range (the difference between `MAX_PORT` and `MIN_PORT`) must be at least 1000 ports.
    
2.  Apply the manifest:
    
    ```
    kubectl apply -f host-port-pod.yaml
    ```
    

When you apply the manifest, GKE selects a random port from your range and assigns the port to your container. If GKE assigns the same port value to two Pods, GKE automatically places the Pods on separate nodes to avoid port conflict.

## Check the assigned port

To find the port number that GKE assigned to your containers, inspect the Pod:

```
kubectl get pod game-pod --output=yaml
```

The output is similar to the following:

```
apiVersion: v1
kind: Pod
metadata:
  annotations:
    autopilot.gke.io/host-port-assignment: '{"min":MIN_PORT,"max":MAX_PORT,"portsAssigned":{"HOST_PORT1":7300,"HOST_PORT2":7450}}'
  name: game-pod
  namespace: default
spec:
  containers:
  - name: local-chat
    image: ubuntu
    command:
    - sleep
    - infinity
    imagePullPolicy: IfNotPresent
    ports:
    - containerPort: 80
      hostPort: 7300
      protocol: TCP
  - name: game-server
    image: ubuntu
    command:
    - sleep
    - infinity
    imagePullPolicy: IfNotPresent
    ports:
    - containerPort: 80
      hostPort: 7450
      protocol: UDP
```

In this output:

*   `metadata.annotations.autopilot.gke.io/host-port-assignment`: the port assignments, showing the original value for `hostPort` that you set for each container and the updated value for `hostPort` that GKE assigned. This field is useful if you requested multiple ports in your Pod specification.
*   `spec.containers.ports.hostPort`: the opened port that GKE assigned to each container.

## What's next

Track Agones support on Autopilot on GitHub.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-06-10 UTC.

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
*   Español
*   Español – América Latina
*   Français
*   Indonesia
*   Italiano
*   Português
*   Português – Brasil
*   עברית
*   中文 – 简体
*   中文 – 繁體
*   日本語
*   한국어