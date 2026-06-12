# Configure CPU limits for services

    
    
      
    

    
      
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

 ![](https://docs.cloud.google.com/_static/clouddocs/images/icons/products/run-color.svg)

*   Cloud Run

Start free

Overview Guides Reference Samples Resources ![Google Cloud Documentation](https://www.gstatic.com/devrel-devsite/prod/v8b2f8e7f8a7704cc38c0519ef05e8f889c427cc26f7c8f743e84df2a01b1dee7/clouddocs/images/lockup_full_color.svg)

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
*   Cloud Run resource model
*   Container runtime contract
*   Use cases
    
    *   Is my app a good fit for a Cloud Run service?
    *   When should I deploy a function?
    *   AI use cases in Cloud Run
    
*   Get started
    
*   Overview
*   Deploy a sample web service
    
    *   Deploy a sample container
    *   Deploy from a git repository
    *   Deploy a Hello World service from source code
        
        *   Go
        *   Node.js
        *   Python
            
            *   Flask
            *   FastAPI
            *   Gradio
            *   LangChain
            *   Smolagents
            *   Streamlit
            *   Agent Development Kit (ADK) for Python
            
        *   Java
        *   Kotlin
        *   C#
        *   C++
        *   PHP
        *   Ruby
        *   Other
        *   Frameworks
            
            *   Overview
            *   Angular SSR
            *   Next.js
            *   Nuxt.js
            *   SvelteKit
            
        
    
*   Deploy a sample function
    
    *   Deploy a function using the console
    *   Deploy a function using gcloud
    
*   Execute a sample job
    
    *   Execute a job
    *   Execute a job from source code
        
        *   Go
        *   Node.js
        *   Python
        *   Java
        *   Shell
        
    
*   Deploy a sample worker pool
*   Develop
    
*   Set up your environment
*   Plan and prepare your service
    
    *   Develop your service
    *   Containerize your code
    *   Connect to Google Cloud services
    *   Install a system package in your container
    *   Run gcloud commands within your container
    
*   Plan and prepare your function
    
    *   Overview
    *   Compare Cloud Run functions
    *   Write Cloud Run functions
    *   Runtimes
        
        *   Overview
        *   Node.js
            
            *   Overview
            *   Node.js dependencies
            
        *   Python
            
            *   Overview
            *   Python dependencies
            
        *   Go
            
            *   Overview
            *   Go dependencies
            
        *   Java
            
            *   Overview
            *   Java dependencies
            
        *   .NET
        *   Ruby
        *   PHP
        
    *   Local functions development
    *   Function triggers
    *   Tutorials
        
        *   Create a function that returns BigQuery results
        *   Create a function that returns Spanner results
        *   Integrate with Cloud databases
        *   Codelabs
        
    
*   Build and test
    
    *   Build sources to containers
    *   Build functions to containers
    *   Local testing
    
*   Serve HTTP requests
    
*   Deploy services
    
    *   Deploy container images
    *   Continuous deployment from git
    *   Deploy from source code
    *   Deploy from Compose
    *   Use the Cloud Run remote MCP server
    *   Deploy functions
    
*   Serve web traffic
    
    *   Mapping custom domains
    *   Serving static assets with CDN
    *   Serving traffic from multiple regions
    *   Automate failover with service health
    *   Enable session affinity
    *   Frontend proxying using Nginx
    
*   Manage services
    
    *   View, copy, or delete services
    *   View or delete revisions
    *   Traffic migration, gradual rollouts, rollbacks
    
*   Configure services
    
    *   Overview
    *   Capacity
        
        *   Memory limits
        *   CPU limits
        *   GPU
            
            *   GPU configuration
            *   GPU performance best practices
            
        *   Request timeout
        *   Maximum concurrent requests
            
            *   About maximum concurrent requests per instance
            *   Configure maximum concurrent requests
            
        *   Billing
        *   Optimize service configurations with Recommender
        
    *   Environment
        
        *   Container port and entrypoint
        *   Environment variables
        *   Volume mounts
            
            *   Cloud Storage volumes
            *   NFS volumes
            *   In-memory volumes
            *   CIFS/SMB
            *   Ephemeral Disk
            
        *   Execution environment
        *   Container health checks
        *   HTTP/2 requests
        *   Secrets
        *   Service identity
        
    *   Scaling
        
        *   About instance autoscaling for services
        *   Maximum instances
            
            *   About maximum instances for services
            *   Configure maximum instances
            
        *   Minimum instances
        *   Configure custom scaling controls
        *   Manual scaling
        
    *   Metadata
        
        *   Description
        *   Labels
        *   Tags
        
    *   Source deploy configurations
        
        *   Supported language runtimes and base images
        *   Configure automatic base image updates
        *   Build environment variables
        *   Build service account
        *   Build worker pools
        
    
*   Invoke and trigger services
    
    *   Invoke with HTTPS requests
    *   Host a webhook target
    *   Stream with WebSockets
        
        *   Overview
        *   Build a WebSocket Chat service tutorial
        
    *   Invoke asynchronously
        
        *   Invoke services on a schedule
        *   Create a workflow
            
            *   Invoke services as part of a Workflow
            *   Connect a series of services from Cloud Functions and Cloud Run tutorial
            
        *   Execute asynchronous tasks
        *   Call a service from a Pub/Sub push subscription
            
            *   Trigger service from Pub/Sub
            *   Integrate image processing into Pub/Sub sample tutorial
            
        
    *   Trigger from events
        
        *   Create triggers with Eventarc
        *   Pub/Sub triggers
            
            *   Create Pub/Sub Eventarc triggers
            *   Trigger functions from Pub/Sub using Eventarc
            *   Trigger functions from routed log entries
            
        *   Cloud Storage triggers
            
            *   Create triggers with Cloud Storage
            *   Trigger services from Cloud Storage using Eventarc
            *   Trigger functions from Cloud Storage using Eventarc
            
        *   Firestore triggers
            
            *   Create triggers with Firestore
            *   Trigger functions from events in a Firestore database
            
        
    *   Connect with other services using gRPC
    
*   Best practices
    
    *   General development tips for services
    *   Cost optimization
    *   Optimize Java services
    *   Optimize Python services
    *   Optimize Node.js services
    *   Load testing best practices
    *   Understand zonal redundancy
    *   Functions best practices
        
        *   Overview
        *   Configure event-driven function retries
        
    
*   Execute job tasks to completion
    
*   Create jobs
*   Execute jobs
    
    *   Execute jobs
    *   Execute scheduled jobs
    *   Execute jobs from Workflows
    
*   Configure jobs
    
    *   Container entrypoint
    *   CPU limits
    *   Memory limits
    *   GPU
        
        *   GPU configuration
        *   GPU best practices
        
    *   Environment variables
    *   Container health checks
    *   Volume mounts
        
        *   Cloud Storage volumes
        *   NFS volumes
        *   In-memory volumes
        *   Using CIFS/SMB network file systems
        *   Ephemeral Disk
        
    *   Labels
    *   Maximum retries
    *   Parallelism
    *   Secrets
    *   Service identity
    *   Task timeout
    *   Tags
    
*   Manage jobs
    
    *   View or delete jobs
    *   View or stop job executions
    
*   Best practices
    
    *   Jobs retries and checkpoints
    *   Cost optimization
    
*   Perform continuous background work
    
*   Deploy worker pools
    
    *   Deploy worker pools
    *   Deploy worker pools from source code
    
*   Manage worker pools
    
    *   View or delete worker pools
    *   View or delete worker pool revisions
    *   Instance splits and rollbacks
    
*   Configure worker pools
    
    *   Capacity
        
        *   Memory limits
        *   CPU limits
        *   GPU
            
            *   GPU configuration
            *   GPU best practices
            
        
    *   Environment
        
        *   Container and entrypoint
        *   Environment variables
        *   Volume mounts
            
            *   Cloud Storage volumes
            *   NFS volumes
            *   In-memory volumes
            *   Using CIFS/SMB network file systems
            *   Ephemeral Disk
            
        *   Container health checks
        *   Secrets
        *   Service identity
        
    *   Instance count
    *   Metadata
        
        *   Description
        *   Labels
        
    
*   Scale based on external metrics
    
    *   Autoscale worker pools with external metrics
    *   Kafka autoscaler
    *   Host GitHub runners with worker pools
    *   Autoscale worker pools based on Prometheus metrics
    *   Autoscale worker pools with Pub/Sub pull subscriptions
    *   Automate scaling with Workflows
    
*   Cost optimization
*   Configure networking
    
*   Best practices for Cloud Run networking
*   Configure private networking
*   Send traffic to VPC network
    
    *   Overview
    *   Direct VPC
    *   Register private IPs for worker pools using Cloud DNS
    *   Dual-stack (IPv4 and IPv6)
    *   Migrate standard VPC connector to Direct VPC
    *   VPC connectors
    
*   Send traffic to Shared VPC network
    
    *   Overview
    *   Direct VPC
    *   Migrate Shared VPC connector to Direct VPC
    *   Connectors in service projects
    *   Connectors in host project
    
*   Static outbound IP address
*   Network security
    
    *   Restrict endpoint ingress (services)
    *   Use VPC Service Controls (VPC SC)
    
*   Cloud Service Mesh
*   Secure
    
*   Security design overview
*   Authenticate requests
    
    *   Overview
    *   Allow public access
    *   Custom audiences
    *   Authenticate developers
    *   Service-to-service
    *   Authenticate users
    *   End user authentication tutorial
    
*   Secure your resources
    
    *   Access control with IAM
    *   Configure IAP for Cloud Run
    *   Introduction to service identity
    *   Protect services with Cloud Armor
    *   Use Binary Authorization
    *   Use Cloud Run Threat Detection
    *   Use customer managed encryption keys
    *   Manage custom constraints for projects
    *   View software supply chain security insights
    *   Secure Cloud Run services tutorial
    *   Multi-tenant platforms running untrusted code
    
*   Monitor and log
    
*   Monitoring and logging overview
*   View built-in metrics
*   Write Prometheus metrics
*   Write OpenTelemetry metrics
*   Log and view logs
*   Audit logging
*   Error reporting
*   Use distributed tracing for services
*   Run AI solutions
    
*   Overview
*   Explore resources
*   AI agents
    
    *   Overview
    *   Build and deploy A2A agents
        
        *   Overview
        *   Deploy A2A agents
        
    *   Build and deploy ADK agents
    *   Build and deploy n8n agents
    
*   MCP servers
    
    *   Overview
    *   Build and deploy a remote MCP server
    
*   Tools
    
    *   Code execution
    *   Browser automation
    
*   Inference with GPUs
    
    *   Overview
    *   Services
        
        *   Run LLM inference on Cloud Run GPUs with Ollama
        *   Run agents with Gemma 4 models on Cloud Run
        *   Run OpenCV on Cloud Run with GPU acceleration
        *   Run LLM inference on Cloud Run GPUs with Hugging Face Transformers.js
        
    *   Jobs
        
        *   Fine tune LLMs using GPUs with Cloud Run jobs
        *   Run batch inference using GPUs with Cloud Run jobs
        *   GPU-accelerated video transcoding with FFmpeg
        
    
*   AI-assisted development and vibe coding
    
    *   Introduction to Cloud Run for AI-assisted developers
    
*   Cookbook
*   Migrate
    
*   An existing web service
*   From App Engine
*   From Cloud Run functions (1st gen)
*   From AWS Lambda
*   From Heroku
*   From Cloud Foundry
    
    *   Migration overview
    *   Choose an OCI-compliant-strategy
    *   Migrate to OCI containers
    *   Migrate configuration
    *   Sample migration: Spring Music
    
*   From VMWare Tanzu
*   From a VM using Migrate to Containers
*   From Kubernetes
*   To GKE
*   Troubleshoot
    
*   Introduction
*   Troubleshoot errors
*   Local troubleshooting tutorial
*   Known issues
*   Samples
    
*   All Cloud Run code samples
*   All Cloud Run functions code samples
*   Code samples for all products

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
*   Cloud Run
*   Guides

Send feedback

# Configure CPU limits for services Stay organized with collections Save and categorize content based on your preferences.

This page describes how to specify the number of vCPUs to use for each Cloud Run instance. By default, Cloud Run container instances are limited to 1 vCPU. You can increase or decrease this value as described in this page.

This page also describes how to enable or disable startup CPU boost, a feature that temporarily increases vCPU allocation during instance startup in order to reduce startup latency.

**Note:** in addition to specifying the number of vCPUs to use, you can also specify whether vCPUs are allocated for the lifetime of the instance or only allocated during request processing. For details, refer to Billing settings.

## Set and update vCPU limits

By default, each instance is limited to 1 vCPU. You can change this to any of the values shown in the following table.

### vCPU and memory table

The following are memory requirements for vCPUs:

CPUs

Memory required

.08 vCPU

Up to 512 MiB

.5 vCPU

Up to 1 GiB

1 vCPU

Up to 4 GiB

2 vCPU

Up to 8 GiB

4 vCPU

2 to 16 GiB

6 vCPU

4 to 24 GiB

8 vCPU

4 to 32 GiB

Values greater than 1 must be integer values.

**Note:** When selecting a vCPU limit greater than 1 vCPU, consider your application's threading model. If your application is single-threaded, it may only fully utilize one vCPU.

### Maximum amount of vCPU

The maximum amount of vCPU you can configure is 8 vCPU.

### Minimum amount of vCPU

The minimum vCPU setting is 0.08 vCPU.

If you want to use less than 1 vCPU, you can select any value between 0.08 and 1, in increments of 0.001.

_If you use less than 1 vCPU_, the following requirements are enforced:

Setting

Requirement

Memory

A minimum of 0.5 vCPU is needed to set a memory limit greater than 512MiB.  
A minimum of 1 vCPU is needed to set a memory limit greater than 1GiB.

Concurrency

Maximum concurrency must be set to `1`.

Billing

The billing settings must be set to request-based billing.

Execution environment

You must use the first generation execution environment.

### Cost considerations

The cost of your Cloud Run resource is impacted by its CPU configuration and how long your resource is active, among other factors. Overprovisioning your resources can increase your costs. To determine which CPU configuration might be best for your resource:

1.  Establish an initial baseline configuration for a CPU limit that balances CPU utilization and costs.
2.  Monitor your CPU utilization metrics in Cloud Monitoring while testing the system under load.
3.  Adjust your CPU configuration as necessary.

If CPU utilization is consistently low under peak load, consider reducing vCPU allocation. If latency is high, consider increasing vCPU allocation.

You can view summary cost data, utilization data, and cost optimization recommendations for services on the Cloud Hub Optimization page. Review Cloud Run pricing or estimate costs with the pricing calculator for more information.

## Required roles

To get the permissions that you need to configure and deploy Cloud Run services, ask your administrator to grant you the following IAM roles:

*   Cloud Run Developer (`roles/run.developer`) on the Cloud Run service
*   Service Account User (`roles/iam.serviceAccountUser`) on the service identity

If you are deploying a service or function from source code, you must also have additional roles granted to you on your project and Cloud Build service account.

For a list of IAM roles and permissions that are associated with Cloud Run, see Cloud Run IAM roles and Cloud Run IAM permissions. If your Cloud Run service interfaces with Google Cloud APIs, such as Cloud Client Libraries, see the service identity configuration guide. For more information about granting roles, see deployment permissions and manage access.

## Configure CPU limits

Any configuration change leads to the creation of a new revision. Subsequent revisions will also automatically get this configuration setting unless you make explicit updates to change it.

You can set CPU limits using the Google Cloud console, the gcloud command line, or a YAML file when you create a new service or deploy a new revision:

### Console

1.  In the Google Cloud console, go to Cloud Run:
    
    Go to Cloud Run
    
2.  Select **Services** from the Cloud Run navigation menu, and click **Deploy container** to configure a new service. If you are configuring an existing service, click the service, then click **Edit and deploy new revision**.
    
3.  If you are configuring a new service, fill out the initial service settings page, then click **Containers, Networking, Security** to expand the service configuration page.
    
4.  Click the **Container** tab.
    
    ![image](/static/run/docs/images/set-cpu.png)
    
    *   Select the desired CPU limit from the dropdown list, using **Custom** if you want to use less than 1 CPU. Select a value of `1`, `2`, `4`, `6`, or `8` CPUs, or for less than 1 CPU, specify a value from 0.08 to less than 1.00, in increments of 0.01. (See the table under Setting and updating CPU limits for required settings.)
    
5.  Click **Create** or **Deploy**.
    

### gcloud

You can update the CPU limits for a given service by using the following command:

gcloud run services update SERVICE --cpu CPU

Replace the following:

*   SERVICE: the name of your service.
*   CPU: the desired CPU limit. Specify the value `1`, `2`, `4`, `6`, or `8` CPUs, or for less than 1 CPU, specify a value from 0.08 to less than 1.00, in increments of 0.01. (See the table under Setting and updating CPU limits for required settings.).

You can also set CPU during deployment using the command:

gcloud run deploy --image IMAGE_URL --cpu CPU

Replace the following:

*   IMAGE_URL: a reference to the container image, for example, `us-docker.pkg.dev/cloudrun/container/hello:latest`. If you use Artifact Registry, the repository REPO_NAME must already be created. The URL follows the format of `LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/PATH:TAG` .
*   CPU: the value `1`, `2`, `4`, `6`, or `8` CPUs, or for less than 1 CPU, specify a value from 0.08 to less than 1.00, in increments of 0.01. (See the table under Setting and updating CPU limits for required settings.)

### YAML

1.  If you are creating a new service, skip this step. If you are updating an existing service, download its YAML configuration:
    
    gcloud run services describe SERVICE --format export > service.yaml
    
2.  Update the `cpu` attribute:
    
    apiVersion: serving.knative.dev/v1
    kind: Service
    metadata:
      name: SERVICE
    spec:
      template:
        metadata:
          name: REVISION
        spec:
          containers:
          - image: IMAGE
            resources:
              limits:
                cpu: CPU
    
    Replace the following:
    
    *   SERVICE: the name of your Cloud Run service.
    *   IMAGE_URL: a reference to the container image, for example, `us-docker.pkg.dev/cloudrun/container/hello:latest`. If you use Artifact Registry, the repository REPO_NAME must already be created. The URL follows the format of `LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/PATH:TAG` .
    *   CPU: the desired CPU limit value. Specify the value `1`, `2`, `4`, `6`, or `8` CPUs, or for less than 1 CPU, specify a value from 0.08 to less than 1.00, in increments of 0.01. (See the table under Setting and updating CPU limits for required settings.)
    *   REVISION with a new revision name or delete it (if present). If you supply a new revision name, it **must** meet the following criteria:
        *   Starts with `SERVICE-`
        *   Contains only lowercase letters, numbers and `-`
        *   Does not end with a `-`
        *   Does not exceed 63 characters
3.  Create or update the service using the following command:
    
    gcloud run services replace service.yaml
    

### Terraform

To learn how to apply or remove a Terraform configuration, see Basic Terraform commands.

Add the following to a `google_cloud_run_v2_service` resource in your Terraform configuration:  

```
resource "google_cloud_run_v2_service" "default" {
  name     = "cloudrun-service-cpu"
  location = "us-central1"

  deletion_protection = false # set to "true" in production

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"
      resources {
        limits = {
          # CPU usage limit
          cpu = "1"
        }
      }
    }
  }
}
```

The preceding `google_cloud_run_v2_service` resource specifies a CPU limit under `template.containers.resources.limits`.

Replace `1` with your desired CPU count. Tip: `1` corresponds to 1 vCPU.

## Set startup CPU boost

The _startup CPU boost_ feature for revisions provides additional CPU during instance startup time and for 10 seconds after the instance has started.

The actual CPU boost varies depending on your CPU limit settings:

CPU limit

Boosted CPU

0-1

2

2

4

4

8

6

8

8

8

You are charged for the allocated boosted CPU for the duration of the container startup time. For example, if your container startup time is 15 seconds, and you allocate 2 CPU, with startup CPU boost, you'll be charged for 4 CPU during the (possibly shorter) instance startup time, including the 10 seconds after your container finished starting, and for 2 CPU during the rest of the container lifecycle.

If your Cloud Run deployment uses sidecars, and you enable startup CPU boost, all containers receive the CPU boost. Cloud Run determines the boosted CPU amount for each container by the CPU limit.

You can enable or disable startup CPU boost using Google Cloud console, Google Cloud CLI, a YAML file, or a Terraform file.

### Console

1.  In the Google Cloud console, go to Cloud Run:
    
    Go to Cloud Run
    
2.  Select **Services** from the Cloud Run navigation menu, and click **Deploy container** to configure a new service. If you are configuring an existing service, click the service, then click **Edit and deploy new revision**.
    
3.  If you are configuring a new service, fill out the initial service settings page, then click **Containers, Networking, Security** to expand the service configuration page.
    
4.  Click the **Container** tab.
    
    ![image](/static/run/docs/images/set-cpu-boost.png)
    
    *   To enable startup CPU boost select the check box _Startup CPU boost_. To disable this feature, deselect the checkbox.
    
5.  Click **Create** or **Deploy**.
    

### gcloud

1.  You can enable startup CPU boost for a given service by using the following command:
    
    gcloud run services update SERVICE --cpu-boost
    
    Replace SERVICE with the name of your service.
    
    You can enable startup CPU boost during deployment using the command:
    
    gcloud run deploy --image IMAGE_URL --cpu-boost
    
    Replace IMAGE_URL with a reference to the container image, for example, `us-docker.pkg.dev/cloudrun/container/hello:latest`. If you use Artifact Registry, the repository REPO_NAME must already be created. The URL follows the format of `LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/PATH:TAG` .
    
2.  You can disable startup CPU boost for a given service by using the following command:
    
    gcloud run services update SERVICE --no-cpu-boost
    
    Replace SERVICE with the name of your service.
    
    You can disable startup CPU boost during deployment using the command:
    
    gcloud run deploy --image IMAGE_URL --no-cpu-boost
    

### YAML

1.  If you are creating a new service, skip this step. If you are updating an existing service, download its YAML configuration:
    
    gcloud run services describe SERVICE --format export > service.yaml
    
2.  Update the `run.googleapis.com/startup-cpu-boost` attribute by specifying `'true'` to enable startup CPU boost or `'false'` to disable:
    
    apiVersion: serving.knative.dev/v1
    kind: Service
    metadata:
      name: SERVICE
    spec:
      template:
        metadata:
          annotations:
            run.googleapis.com/startup-cpu-boost: 'true'
    
    Replace SERVICE the name of your Cloud Run service.
    
3.  Create or update the service using the following command:
    
    gcloud run services replace service.yaml
    

### Terraform

To learn how to apply or remove a Terraform configuration, see Basic Terraform commands.

Add the following to a `google_cloud_run_v2_service` resource in your Terraform configuration:  

```
resource "google_cloud_run_v2_service" "default" {
  name     = "SERVICE"
  location = "REGION"

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello"
      resources {
        startup_cpu_boost = CPU_BOOST
      }
    }
  }
}
```

Replace the following:

*   SERVICE: the name of your Cloud Run service.
*   REGION: the Google Cloud region—for example, `europe-west1`.
*   CPU_BOOST: `true` to enable startup CPU boost or `false` to disable it.

### Compose

To specify CPU limits in your `compose.yaml` file, add the `cpus` attribute to your service definition.

  services:
    web:
      image: IMAGE
      cpus: CPU_VALUE

Replace the following:

*   IMAGE: the URL of your container image.
*   CPU_VALUE: the needed CPU limit—for example, `2`.

**Deploy the services**

1.  To deploy the services, run the `gcloud run compose up` command:
    
    gcloud run compose up compose.yaml
    
2.  Respond `y` to any prompts to install required components or to enable APIs.
    
3.  Optional: Make your service public if you want to allow unauthenticated access to the service.
    

After deployment, the Cloud Run service URL is displayed. Copy this URL and paste it into your browser to view the running container. You can disable the default authentication from the Google Cloud console.

## View CPU settings

To view the current CPU settings for your Cloud Run service:

### Console

1.  In the Google Cloud console, go to the Cloud Run **Services** page:
    
    Go to Cloud Run
    
2.  Click the service you are interested in to open the **Service details** page.
    
3.  Click the **Revisions** tab.
    
4.  In the details panel at the right, the CPU setting is listed under the **Container** tab.
    

### gcloud

1.  Use the following command:
    
    gcloud run services describe SERVICE
    
2.  Locate the CPU setting in the returned configuration.
    

## Application threading and CPU utilization

When selecting a CPU limit greater than 1 vCPU, consider your application's threading model. When autoscaling, Cloud Run uses the average CPU utilization across all allocated CPUs. If your application is single-threaded, it may only fully utilize one core, which leads to a low average CPU utilization even under load. This can prevent CPU-based autoscaling from occurring as expected.

To avoid this behavior for a single-threaded application, if your memory requirements allow it, we recommend starting with 1 vCPU. This results in better CPU-based autoscaling. If higher memory needs force a multi-CPU selection for a single-threaded application, consider tuning your concurrency setting.

Send feedback

Except as otherwise noted, the content of this page is licensed under the Creative Commons Attribution 4.0 License, and code samples are licensed under the Apache 2.0 License. For details, see the Google Developers Site Policies. Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-06-11 UTC.

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