# Run a small batch workload with GPUs and Flex-start VMs

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

Skip to main content

 ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/v8b2f8e7f8a7704cc38c0519ef05e8f889c427cc26f7c8f743e84df2a01b1dee7/clouddocs/images/lockup_full_color.svg)

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
*   GKE AI/ML

Start free

Overview Guides ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/v8b2f8e7f8a7704cc38c0519ef05e8f889c427cc26f7c8f743e84df2a01b1dee7/clouddocs/images/lockup_full_color.svg)

*   Technology areas
    
    *   More
    
    *   Overview
    *   Guides
*   Cross-product tools
    *   More
*   Console

*   Discover
    
*   Introduction to AI/ML workloads on GKE
*   Explore GKE documentation
    
    *   Overview
    *   Main GKE documentation
    *   GKE AI/ML documentation
    *   GKE networking documentation
    *   GKE security documentation
    *   GKE fleet management documentation
    
*   Select how to obtain and consume accelerators on GKE
*   GKE AI/ML conformance
*   Get started
    
*   Why use GKE for AI/ML inference
*   Simplified autoscaling concepts for AI/ML workloads in GKE
*   Quickstart: Serve your first AI model on GKE
*   Serve AI models for inference
    
*   About AI/ML model inference on GKE
*   Analyze model serving performance and costs with GKE Inference Quickstart
*   Expose AI applications with GKE Inference Gateway
*   Best practices for inference
    
    *   Overview
    *   Choose a load balancing strategy for inference
    *   Autoscale inference workloads on GPUs
    *   Autoscale LLM inference workloads on TPUs
    *   Optimize LLM inference workloads on GPUs
    *   Optimize batch inference workloads
    
*   Try inference examples
    
    *   GPUs
        
        *   Serve Gemma open models using GPUs with vLLM
        *   Serve LLMs like DeepSeek-R1 671B or Llama 3.1 405B
        *   Serve an LLM with GKE Inference Gateway
        *   Serve an LLM with multiple GPUs
        *   Serve T5 with Torch Serve
        *   Fine-tune Gemma open models using multiple GPUs
        *   Secure a serving workload on GKE with Model Armor
        
    *   TPUs
        
        *   Serve Llama on TPUs with vLLM
        *   Serve LLMs using multi-host TPUs with JetStream and Pathways
        *   Serve Stable Diffusion XL on TPUs with MaxDiffusion
        *   Serve open models on TPUs with Terraform
        
    
*   Train AI models at scale
    
*   Train large-scale models with Multi-tier Checkpointing
*   Try training examples
    
    *   Train a model with GPUs on GKE Standard mode
    *   Train a model with GPUs on GKE Autopilot mode
    *   Train a Llama model on GPUs with Megatron-LM
    *   Fine-tune a LLM using TPUs on GKE with JAX
    
*   Run reinforcement learning workloads on GKE
    
    *   Fine-tune and scale reinforcement learning with verl
    *   Fine-tune and scale reinforcement learning with NeMo RL
    *   Monitor reinforcement learning workloads with OpenTelemetry
    
*   Deploy and orchestrate AI agents
    
*   Deploy AI agents with the ADK and Agent Platform API
*   Deploy AI agents with the ADK and a self-hosted LLM
*   Secure AI agentic workloads with Agent Sandbox
    
    *   About Agent Sandbox
    *   Enable Agent Sandbox on GKE
    *   Isolate AI code execution with Agent Sandbox
    *   Scale Agent Sandboxes dynamically using HPA and Capacity Buffers
    *   Save and restore Agent Sandbox environments
    *   Trigger Agent Sandbox snapshots from inside a cluster
    
*   Use Ray for distributed AI/ML applications
    
*   About Ray on GKE
*   Quickstart: Deploy your first Ray application on GKE
*   Enable managed KubeRay with the Ray Operator add-on
*   Deploy AI/ML workloads with Ray on GKE
    
    *   Serve AI models with Ray Serve on GKE
        
        *   Serve an LLM on GPUs with Ray Serve
        *   Serve an LLM with multi-cluster Ray Serve and Inference Gateway
        *   Serve an LLM on TPUs with Ray Serve
        *   Serve a diffusion model on GPUs with Ray
        *   Serve a diffusion model on TPUs with Ray
        
    *   Train AI models with Ray on GKE
        
        *   Train with PyTorch, Ray, and GKE
        *   Train an LLM using Jax and Ray Train on TPUs with GKE
        *   Multislice and Elastic Training on TPUs using Ray Train on GKE
        
    
*   Use GPUs with Ray on GKE
    
    *   Set up Ray on GKE with A4X and GB200
    
*   Use TPUs with Ray on GKE
    
    *   Set up Ray on GKE with TPU Trillium
    *   Optimize AI training on TPUs with DWS and Kueue
    
*   Monitor Ray on GKE
    
    *   View logs for the Ray Operator on GKE
    *   View logs and metrics for Ray clusters on GKE
    *   Debug completed Ray Jobs with Ray History Server
    
*   Use Slurm Operator for HPC and AI/ML workloads
    
*   About Slurm on GKE
*   Quickstart: Deploy a Slurm cluster on GKE
*   Enable the Slurm Operator add-on
*   Build custom Slurm Docker images
*   Configure shared storage for Slurm on GKE
    
    *   Configure Filestore for Slurm
    *   Managed Lustre for Slurm
    
*   Manage GPUs on GKE
    
*   About GPUs
*   Configure GPUs for AI/ML workloads
    
    *   Configure A3 or A4 VMs with AI Hypercomputer
    *   Deploy GPU workloads in Standard clusters
    *   Deploy GPU workloads in Autopilot clusters
    *   Configure autoscaling for LLM workloads on GPUs
    *   Manage the GPU stack with the NVIDIA GPU Operator
    *   Encrypt GPU workloads in-place
    
*   Provision resources for high performance computing (HPC)
    
    *   Deploy AI Hypercomputer clusters (A3, A4 VMs)
    
*   Optimize GPU utilization with GPU sharing strategies
    
    *   About GPU sharing strategies on GKE
    *   Use multi-instance GPUs
    *   Configure timesharing GPUs
    *   Use NVIDIA MPS
    
*   Optimize GPU provisioning with flex-start
    
    *   Overview
    *   Run a large-scale workload with flex-start
    *   Run a small batch workload with GPUs and flex-start
    
*   Manage TPUs on GKE
    
*   About TPUs
*   Versions
    
    *   Ironwood (TPU7x)
    
*   Plan TPUs on GKE
*   Configure TPUs for AI/ML workloads
    
    *   Deploy TPU workloads on Standard clusters
    *   Deploy TPU workloads on Autopilot clusters
    *   Deploy high-performance TPU workloads with auto-networking
    *   Deploy TPU Multislices on GKE
    *   Orchestrate TPU Multislice workloads using JobSet and Kueue
    
*   Configure autoscaling for LLM workloads on TPUs
*   Optimize TPU provisioning with flex-start
    
    *   Overview
    *   Run a small batch workload with TPUs and flex-start
    *   Request TPUs with future reservation in calendar mode
    
*   Optimize TPU utilization with dynamic slicing
    
    *   About TPU All Capacity mode
    *   About TPU dynamic slicing
        
        *   Overview
        *   Use dynamic slicing with a custom scheduler
        *   Schedule dynamic slices with Kueue and TAS
        
    
*   Manage GKE node disruption for GPUs and TPUs
    
*   About node disruption for GPUs and TPUs
*   Use Kueue for job queuing and resource optimization
    
    *   Best practices for running batch workloads on GKE
    *   Deploy a batch system using Kueue
    *   Implement a Job queuing system with quota sharing
    *   Optimize resource utilization for mixed AI/ML training and inference workloads
    *   Optimize AI/ML workload prioritization
    *   Orchestrate TPU Multislice workloads using JobSet and Kueue
    
*   Manage networking for AI/ML workloads
    
*   Allocate network resources using GKE managed DRANET
*   Configure auto-networking for accelerators
*   Manage data and storage for AI/ML workloads
    
*   About storage for GKE clusters
*   Accelerate data access and performance
    
    *   Accelerate model loading with Run:ai Model Streamer and vLLM
    *   About Cloud Storage FUSE CSI driver for GKE
    *   Accelerate AI/ML data loading with Hyperdisk ML
    *   Accelerate read performance of stateful workloads with GKE Data Cache
    *   Transfer data from Cloud Storage using GKE Volume Populator
    
*   Build applications with vector databases and RAG
    
    *   Build a RAG chatbot with GKE and Cloud Storage
    *   Deploy a Qdrant vector database on GKE
    
*   Secure AI/ML workloads
    
*   Secure a serving workload on GKE with Model Armor
*   Monitor AI/ML workloads
    
*   Deploy automatic application monitoring for AI/ML workloads
*   Troubleshoot
    
*   Troubleshoot accelerator issues
    
    *   Troubleshoot GPU issues
    *   Troubleshoot TPU issues
    

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
*   GKE AI/ML
*   Guides

Send feedback

# Run a small batch workload with GPUs and Flex-start VMs Stay organized with collections Save and categorize content based on your preferences.

Autopilot Standard

**Preview — flex-start**

This feature is subject to the "Pre-GA Offerings Terms" in the General Service Terms section of the Service Specific Terms. Pre-GA features are available "as is" and might have limited support. For more information, see the launch stage descriptions.

This guide shows you how to optimize GPU provisioning for medium- and small-scale training workloads by using Flex-start VMs. Flex-start VMs are created by using the flex-start consumption option. In this guide, you use Flex-start VMs to deploy a workload that consists of two Kubernetes Jobs. Each Job requires one GPU. GKE automatically provisions a _single node_ with two A100 GPUs to run _both Jobs_.

If your workload requires multi-node distributed processing, consider using _flex-start with queued provisioning_. For more information, see Run a large-scale workload with flex-start with queued provisioning.

This guide is intended for Machine learning (ML) engineers, Platform admins and operators, and for Data and AI specialists who are interested in using Kubernetes container orchestration capabilities for running batch workloads. For more information about common roles and example tasks that we reference in Google Cloud content, see Common GKE user roles and tasks.

## Flex-start pricing

Flex-start is recommended if your workload requires dynamically provisioned resources as needed, for up to seven days with short-term reservations, no complex quota management, and cost-effective access. Flex-start is powered by Dynamic Workload Scheduler and is billed using Dynamic Workload Scheduler pricing:

*   Discounted (up to 53%) for vCPUs, GPUs, and TPUs.
*   You pay as you go.

## Before you begin

Before you start, make sure that you have performed the following tasks:

*   Enable the Google Kubernetes Engine API.
Enable Google Kubernetes Engine API*   If you want to use the Google Cloud CLI for this task, install and then initialize the gcloud CLI. If you previously installed the gcloud CLI, get the latest version by running the `gcloud components update` command. Earlier gcloud CLI versions might not support running the commands in this document.
    
    **Note:** For existing gcloud CLI installations, make sure to set the `compute/region` property. If you use primarily zonal clusters, set the `compute/zone` instead. By setting a default location, you can avoid errors in the gcloud CLI like the following: `One of [--zone, --region] must be supplied: Please specify location`. You might need to specify the location in certain commands if the location of your cluster differs from the default that you set.
    

*   Verify that you have an Autopilot cluster or a Standard cluster that's running version 1.33.0-gke.1712000 or later.
*   Verify that you're familiar with limitations of flex-start.
*   When using a Standard cluster, verify that you maintain at least one node pool without flex-start enabled for the cluster to function correctly.
*   Verify that you have quota for preemptible GPUs in your node locations.

If you don't have a cluster or your cluster doesn't meet the requirements, you can create a Standard regional cluster using the gcloud CLI. Add the following flags so that you can learn about flex-start:

```
--location=us-central1 \
--node-locations=us-central1-a,us-central1-b \
--machine-type=g2-standard-8
```

When you create a flex-start node pool, use the previously mentioned flags flags and `--accelerator type=nvidia-l4,count=1`.

If you have a Standard cluster that meets the requirements, the next sections guide you through selecting a GPU accelerator type and machine type for your cluster.

### Choose a GPU accelerator type

If you use a cluster in Autopilot mode, skip this section and go to the Run a batch workload section.

GPU availability is specific to each zone. You need to find a GPU accelerator type that is available in a zone that the Standard cluster is in. If you have a regional Standard cluster, the zone in which the GPU accelerator type is available must be in the region that the cluster is in. When you create the node pool, you specify the accelerator type and the zones for the nodes. If you specify an accelerator type that isn't available in the cluster's location, the node pool creation fails.

Run the following commands to get your cluster's location and a supported GPU accelerator type.

1.  Get the location that the cluster is in:
    
    ```
    gcloud container clusters list
    ```
    
    The output is similar to the following:
    
    ```
    NAME                LOCATION  MASTER_VERSION      MASTER_IP     MACHINE_TYPE  NODE_VERSION        NUM_NODES  STATUS   STACK_TYPE
    example-cluster-1   us-west2  1.33.2-gke.1111000  34.102.3.122  e2-medium     1.33.2-gke.1111000  9          RUNNING  IPV4
    ```
    
2.  List the available GPU accelerator types, excluding Virtual Workstations in the location:
    
    ```
    gcloud compute accelerator-types list | grep CONTROL_PLANE_LOCATION | grep -v "Workstation"
    ```
    
    Replace `CONTROL_PLANE_LOCATION` with the cluster's location.
    
    For example, to get a list of GPU accelerator types in the `us-west2` region, run the following command:
    
    ```
    gcloud compute accelerator-types list | grep us-west2 | grep -v "Workstation"
    ```
    
    The output is similar to the following:
    
    ```
    nvidia-b200            us-west2-c                 NVIDIA B200 180GB
    nvidia-tesla-p4        us-west2-c                 NVIDIA Tesla P4
    nvidia-tesla-t4        us-west2-c                 NVIDIA T4
    nvidia-tesla-p4        us-west2-b                 NVIDIA Tesla P4
    nvidia-tesla-t4        us-west2-b                 NVIDIA T4
    ```
    

### Choose a compatible machine type

If you use a cluster in Autopilot mode, skip this section and go to the Run a batch workload section.

After you know which GPUs are available in the cluster's location, you can determine the compatible machine types. Google Cloud restricts GPUs to specific machine series. Use the following steps to find a machine type:

1.  Refer to the GPU models available table.
2.  Locate the row for the GPU accelerator type you have chosen.
3.  Look at the "Machine series" column for that row. This column tells you which machine series you must use.
4.  To see the machine type names you can specify, click the link on the machine series.

The only exception is the N1 machine series, which provides additional guidance on which N1 machine types you can use with your chosen accelerator type.

Before using an accelerator-optimized machine, make sure that it's supported with flex-start provisioning mode, as shown in Consumption option availability by machine type.

### Determine the accelerator count

If you use a cluster in Autopilot mode, skip this section and go to the Run a batch workload section.

To create a node pool, you need to determine the number of accelerators to attach to each node in the node pool. Valid values depend on your accelerator type and machine type. Each machine type has a limit on how many GPUs it can support. To determine what value to use (besides the default of `1`):

1.  Refer to GPU machine types.
2.  In the table, search for your accelerator type for your machine series type.
3.  Use the value in the "GPU count" column.

## Create a node pool with flex-start

If you use a cluster in Autopilot mode, skip this section and go to the Run a batch workload section.

To create a node pool with flex-start enabled on an existing Standard cluster, you can use the gcloud CLI or Terraform.

### gcloud

1.  Create a node pool with flex-start:
    
    ```
    gcloud container node-pools create NODE_POOL_NAME \
        --cluster CLUSTER_NAME \
        --location CONTROL_PLANE_LOCATION \
        --project PROJECT_ID \
        --accelerator type=ACCELERATOR_TYPE,count=COUNT \
        --machine-type MACHINE_TYPE \
        --max-run-duration MAX_RUN_DURATION \
        --flex-start \
        --node-locations NODE_ZONES \
        --num-nodes 0 \
        --enable-autoscaling \
        --total-min-nodes 0 \
        --total-max-nodes 5 \
        --location-policy ANY \
        --reservation-affinity none \
        --no-enable-autorepair \
        --consolidation-delay=CONSOLIDATION_DELAY
    ```
    
    Replace the following:
    
    *   `NODE_POOL_NAME`: the name you choose for your node pool.
    *   `CLUSTER_NAME`: the name of the Standard cluster you want to modify.
    *   `CONTROL_PLANE_LOCATION`: the compute region for the cluster control plane.
    *   `PROJECT_ID`: your project ID.
    *   `ACCELERATOR_TYPE`: the specific type of accelerator (for example, `nvidia-tesla-t4` for NVIDIA T4) to attach to the instances.
    *   `COUNT`: the number of accelerators to attach to the instances. The default value is `1`.
    *   `MACHINE_TYPE`: the type of machine to use for nodes.
    *   `MAX_RUN_DURATION`: optional. The maximum runtime of a node in seconds, up to the default of seven days. The number that you enter must end in `s`. For example, to specify one day, enter `86400s`.
    *   `CONSOLIDATION_DELAY`: optional. The duration that Cluster Autoscaler waits before it can scale down underutilized nodes. Use this setting to delay scale-down and keep the node pool for later reuse by other Pods. The number that you enter must end in `s`. For example, to specify one hour, enter `3600s`. Available in GKE version `1.34.1-gke.2364000` and later.
    *   `NODE_ZONES`: a comma-separated list of one or more zones where GKE creates the node pool.
    
    In this command, the `--flex-start` flag instructs `gcloud` to create a node pool with Flex-start VMs.
    
    GKE creates a node pool with nodes that contain two instances of the specified accelerator type. The node pool initially has zero nodes and autoscaling is enabled
    

### Terraform

You can use flex-start with GPUs by using a Terraform module.

1.  Add the following block to your Terraform configuration:

```
resource "google_container_node_pool" " "gpu_dws_pool" {
name = "gpu-dws-pool"

queued_provisioning {
    enabled = false
}

}
node_config {
    machine_type = "MACHINE_TYPE"
    accelerator_type = "ACCELERATOR_TYPE"
    accelerator_count = COUNT
    node_locations = ["NODE_ZONES"]
    flex_start = true
}
```

Replace the following:

*   `MACHINE_TYPE`: the type of machine to use for nodes.
*   `ACCELERATOR_TYPE`: the specific type of accelerator (for example, `nvidia-tesla-t4` for NVIDIA T4) to attach to the instances.
*   `COUNT`: the number of accelerators to attach to the instances. The default value is `1`.
*   `NODE_ZONES`: the comma-separated list of one or more zones where GKE creates the node pool.

Terraform calls Google Cloud APIs to create a cluster with a node pool that uses Flex-start VMs with GPUs. The node pool initially has zero nodes and autoscaling is enabled. To learn more about Terraform, see the `google_container_node_pool` resource spec on terraform.io.

## Verify the status of flex-start in the node pool

Run the following command:

```
gcloud container node-pools describe NODE_POOL_NAME \
    --cluster CLUSTER_NAME \
    --location CONTROL_PLANE_LOCATION \
    --format="get(config.flexStart)"
```

If flex-start is enabled in the node pool, the field `flexStart` is set to `True`.

## Run a batch workload

In this section, you create two Kubernetes Jobs that require one GPU each. A Job controller in Kubernetes creates one or more Pods and helps ensure that they successfully execute a specific task.

1.  In the Google Cloud console, launch a Cloud Shell session by clicking ![Cloud Shell activation icon](/static/shell/docs/images/activate_cloud_shell.svg) **Activate Cloud Shell**. A session opens in the bottom pane of the Google Cloud console.
    
2.  Create a file named `dws-flex-start.yaml`:
    
    ```
    apiVersion: batch/v1
    kind: Job
    metadata:
      name: job-1
    spec:
      template:
        spec:
          nodeSelector:
            cloud.google.com/gke-flex-start: "true"
            cloud.google.com/gke-accelerator: ACCELERATOR_TYPE
          containers:
          - name: container-1
            image: gcr.io/k8s-staging-perf-tests/sleep:latest
            args: ["10s"] # Sleep for 10 seconds
            resources:
              requests:
                  nvidia.com/gpu: 1
              limits:
                  nvidia.com/gpu: 1
          restartPolicy: OnFailure
    ---
    apiVersion: batch/v1
    kind: Job
    metadata:
      name: job-2
    spec:
      template:
        spec:
          nodeSelector:
            cloud.google.com/gke-flex-start: "true"
            cloud.google.com/gke-accelerator: ACCELERATOR_TYPE
          containers:
          - name: container-2
            image: gcr.io/k8s-staging-perf-tests/sleep:latest
            args: ["10s"] # Sleep for 10 seconds
            resources:
              requests:
                  nvidia.com/gpu: 1
              limits:
                  nvidia.com/gpu: 1
          restartPolicy: OnFailure
    ```
    
3.  Apply the `dws-flex-start.yaml` manifest:
    
    ```
    kubectl apply -f dws-flex-start.yaml
    ```
    
4.  Verify that the Jobs are running on the same node:
    
    ```
    kubectl get pods -l "job-name in (job-1,job-2)" -o wide
    ```
    
    The output is similar to the following:
    
    ```
    NAME    READY   STATUS      RESTARTS   AGE   IP       NODE               NOMINATED NODE   READINESS GATES
    job-1   0/1     Completed   0          19m   10.(...) gke-flex-zonal-a2  <none>           <none>
    job-2   0/1     Completed   0          19m   10.(...) gke-flex-zonal-a2  <none>           <none>
    ```
    

**Success:** You have successfully deployed two Jobs on the _same_ node by using Flex-start VMs. GKE deployed two Jobs on a newly provisioned Flex-start VM.

## Clean up

To avoid incurring charges to your Google Cloud account for the resources that you used on this page, either delete the project that contains the resources, or keep the project and delete the individual resources.

### Delete the project

**Caution**: Deleting a project has the following effects:

*   **Everything in the project is deleted.** If you used an existing project for the tasks in this document, when you delete it, you also delete any other work you've done in the project.
*   **Custom project IDs are lost.** When you created this project, you might have created a custom project ID that you want to use in the future. To preserve the URLs that use the project ID, such as an `appspot.com` URL, delete selected resources inside the project instead of deleting the whole project.

2.  In the Google Cloud console, go to the **Manage resources** page.
    
    Go to Manage resources
    
3.  In the project list, select the project that you want to delete, and then click **Delete**.
4.  In the dialog, type the project ID, and then click **Shut down** to delete the project.

### Delete the individual resource

1.  Delete the Jobs:
    
    ```
    kubectl delete job -l "job-name in (job-1,job-2)"
    ```
    
2.  Delete the node pool:
    
    ```
    gcloud container node-pools delete NODE_POOL_NAME \
          --location CONTROL_PLANE_LOCATION
    ```
    
3.  Delete the cluster:
    
    ```
    gcloud container clusters delete CLUSTER_NAME
    ```
    

## What's next

*   Learn more about GPUs in GKE.
*   Learn more about node auto-provisioning.
*   Learn more about Best practices for running batch workloads on GKE.

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