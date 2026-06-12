# The Go runtime

    
    
      
    

    
      
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

# The Go runtime Stay organized with collections Save and categorize content based on your preferences.

Your Cloud Run function runs in an environment consisting of an operating system version with add-on packages, language support, and the Go Functions Framework library that supports and invokes your function. This environment is identified by the language version, and is known as the runtime ID.

## Function preparation

You can prepare a function directly from the Google Cloud console or write it on your local machine and upload it. To prepare your local machine for Go development, see Set up a Go development environment.

## Supported Go runtimes and base images

Runtime

Runtime ID

Stacks

Runtime base image

Deprecation

Decommission

Go 1.26

go126

*   google-24 (default)
*   google-24-full

*   google-24/go126
*   google-24-full/go126

Go 1.25

go125

*   google-22 (default)
*   google-22-full

*   google-22/go125
*   google-22-full/go125

Go 1.24

go124

*   google-22 (default)
*   google-22-full

*   google-22/go124
*   google-22-full/go124

2026-09-02

2027-03-02

Go 1.23  

go123

*   google-22 (default)
*   google-22-full

*   google-22/go123
*   google-22-full/go123

2026-02-21

2026-08-21

Go 1.22

go122

*   google-22 (default)
*   google-22-full

*   google-22/go122
*   google-22-full/go122

2026-01-28

2026-07-28

Go 1.21

go121

*   google-22 (default)
*   google-22-full

*   google-22/go121
*   google-22-full/go121

2025-09-03

2026-03-03

Go 1.20

go120

*   google-22 (default)
*   google-22-full

*   google-22/go120
*   google-22-full/go120

2024-05-01

2025-05-01

Go 1.19

go119

*   google-22 (default)
*   google-22-full

*   google-22/go119
*   google-22-full/go119

2024-04-30

2025-01-30

Go 1.18

go118

*   google-22 (default)
*   google-22-full

*   google-22/go118
*   google-22-full/go120

2024-01-30

2025-01-30

Go 1.16

go116

google-18-full

google-18-full/go116

2024-01-30

2025-01-30

Go 1.13

go113

google-18-full

google-18-full/go113

2024-01-30

2025-01-30

Go 1.11

go111

Decommissioned

Decommissioned

2020-08-05

Feb 2021

**Note:** Go's release policy states that each major Go release is supported until there are two newer major releases. Thus, depending on when newer versions of Go are made publicly available, key dates such as end of support, deprecation, and decommission might be postponed.

## Select your runtime

You can select one of the supported Go runtimes for your function during deployment.

You can select a runtime version using the Google Cloud console, or the gcloud CLI. Click the tab for instructions on using the tool of your choice:

### gcloud

Specify the Go base image for your function using the `--base-image` flag, while deploying your function. For example:

```
gcloud run deploy FUNCTION \
    --source . \
    --function FUNCTION_ENTRYPOINT \
    --base-image go126
```

Replace:

*   FUNCTION with the name of the function you are deploying. You can omit this parameter entirely, but you will be prompted for the name if you omit it.
    
*   FUNCTION_ENTRYPOINT with the entry point to your function in your source code. This is the code Cloud Run executes when your function runs. The value of this flag must be a function name or fully-qualified class name that exists in your source code.
    

For detailed instructions on deploying a function using the gcloud CLI, see Deploy functions in Cloud Run.

### Console

You can select a runtime version when you create or update a Cloud Run function in the Google Cloud console. For detailed instructions on deploying a function, see Deploy functions in Cloud Run.

To select a runtime in the Google Cloud console when you create a function, follow these steps:

1.  In the Google Cloud console, go to the Cloud Run page:
    
    Go to Cloud Run
    
2.  Click **Write a function**.
    
3.  In the **Runtime** list, select a Go runtime version.
    
4.  Click **Create**, and wait for Cloud Run to create the service using a placeholder revision.
    
5.  The console will redirect you to the **Source** tab where you can see the source code of your function. Click **Save and redeploy**.
    

For detailed instructions on updating the runtime version after your function is deployed, see Re-deploy new source code.

## Source code structure

For Cloud Run functions to find your function's definition, your source code must follow a specific structure. See Write Cloud Run functions for more information.

## Specify dependencies

Cloud Run functions in Go must provide all of their dependencies either with Go modules and a `go.mod` file, or with a `vendor` directory. For more information, see Specify dependencies in Go.

## Environment variables

Your Go runtime automatically sets certain environment variables for your function to use as needed. For details, see Configure environment variables.

## Context type

Go's `context` package defines the `Context` type, which carries deadlines, cancellation signals, and other request-scoped values across API boundaries and between processes.

The following code shows an example of context access by a Pub/Sub client:

```

// Package helloworld provides a set of Cloud Functions samples.
package helloworld

import (
	"context"
	"fmt"
	"log"

	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"github.com/cloudevents/sdk-go/v2/event"
)

func init() {
	functions.CloudEvent("HelloPubSub", helloPubSub)
}

// MessagePublishedData contains the full Pub/Sub message
// See the documentation for more details:
// https://cloud.google.com/eventarc/docs/cloudevents#pubsub
type MessagePublishedData struct {
	Message PubSubMessage
}

// PubSubMessage is the payload of a Pub/Sub event.
// See the documentation for more details:
// https://cloud.google.com/pubsub/docs/reference/rest/v1/PubsubMessage
type PubSubMessage struct {
	Data []byte `json:"data"`
}

// helloPubSub consumes a CloudEvent message and extracts the Pub/Sub message.
func helloPubSub(ctx context.Context, e event.Event) error {
	var msg MessagePublishedData
	if err := e.DataAs(&msg); err != nil {
		return fmt.Errorf("event.DataAs: %w", err)
	}

	name := string(msg.Message.Data) // Automatically decoded from base64.
	if name == "" {
		name = "World"
	}
	log.Printf("Hello, %s!", name)
	return nil
}
```

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