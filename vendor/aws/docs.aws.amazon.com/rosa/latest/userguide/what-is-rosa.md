

# What is Red Hat OpenShift Service on AWS?
<a name="what-is-rosa"></a>

 Red Hat OpenShift Service on AWS (ROSA) is a managed service that you can use to build, scale, and deploy containerized applications with the Red Hat OpenShift enterprise Kubernetes platform on AWS. ROSA streamlines moving on-premises Red Hat OpenShift workloads to AWS, and offers tight integration with other AWS services.

## Features
<a name="features"></a>

 ROSA is jointly supported and operated by AWS and Red Hat. Each ROSA cluster comes with 24-hour Red Hat site reliability engineer (SRE) support for cluster management, backed by Red Hat’s 99.95% uptime service-level agreement (SLA). For more information about the service’s support model, see [Getting ROSA support](rosa-support.md).

 ROSA also provides the following features:
+ Red Hat SRE-supported cluster installation, cluster maintenance, and cluster upgrades.
+  AWS service integrations include AWS compute, database, analytics, machine learning, networking, and mobile.
+ Run and scale the Kubernetes control plane across multiple AWS Availability Zones to ensure high availability.
+ Operate clusters using OpenShift APIs and developer productivity tools, including Service Mesh, CodeReady Workspaces, and Serverless.

## Accessing ROSA
<a name="access-rosa"></a>

You can define and configure your ROSA service deployments using the following interfaces.

 ** AWS ** 
+  ** ROSA console** — Provides a web interface to enable the ROSA subscription and purchase a ROSA software contract.
+  ** AWS Command Line Interface (AWS CLI)** — Provides commands for a broad set of AWS services and is supported on Windows, macOS, and Linux. For more information, see [AWS Command Line Interface](https://aws.amazon.com/cli).

 **Red Hat OpenShift** 
+  **Red Hat Hybrid Cloud Console** — Provides a web interface to create, update, and manage ROSA clusters, install cluster add-ons, and create and deploy applications to a ROSA cluster.
+  ** ROSA CLI (rosa)** — Provides commands to create, update, and manage ROSA clusters.
+  **OpenShift CLI (oc)** — Provides commands to create applications and manage OpenShift Container Platform projects.
+  **Knative CLI (kn)** - Provides commands that can be used to interact with OpenShift Serverless components, such as Knative Serving and Eventing.
+  **Pipelines CLI (tkn)** - Provides commands to interact with OpenShift Pipelines using the terminal.
+  **opm CLI** - Provides commands that help Operator developers and cluster administrators create and maintain OpenShift Operator catalogs from the terminal.
+  **Operator SDK CLI** - Provides commands that an Operator developer can use to build, test, and deploy an OpenShift operator.

## How to get started with ROSA
<a name="get-started-with-rosa"></a>

![How to get started](http://docs.aws.amazon.com/rosa/latest/userguide/images/rosa-get-started.png)


The following summarizes the getting started process for ROSA. For detailed getting started instructions, see [Get started with ROSA](getting-started.md).

 ** AWS Management Console/AWS CLI ** 

1. Configure permissions for AWS services that ROSA relies on to deliver service functionality. For more information, see [Prerequisites](getting-started-hcp.md#getting-started-hcp-prereqs).

1. Install and configure the latest AWS CLI tool. For more information, see [Installing our updating the latest version of the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) in the AWS CLI User Guide.

1. Enable ROSA in the [ROSA console](https://console.aws.amazon.com/rosa).

 **Red Hat Hybrid Cloud Console/ROSA CLI** 

1. Download the latest version of the ROSA CLI and OpenShift CLI from the [Red Hat Hybrid Cloud Console](https://console.redhat.com/openshift). For more information, see [Getting started with the ROSA CLI](https://access.redhat.com/documentation/en-us/red_hat_openshift_service_on_aws/4/html/rosa_cli/rosa-get-started-cli) in the Red Hat documentation.

1. Create ROSA clusters in the Red Hat Hybrid Cloud Console or with the ROSA CLI.

1. When your cluster is ready, configure an identity provider to grant user access to the cluster.

1. Deploy and manage workloads on your ROSA cluster the same way that you would with any other OpenShift environment.

## Pricing
<a name="pricing"></a>

The total cost of ROSA consists of two components: ROSA service fees and AWS infrastructure fees. For more information about pricing, see [Red Hat OpenShift Service on AWS Pricing](https://aws.amazon.com/rosa/pricing/).

### ROSA service fees
<a name="pricing-service-fees"></a>

By default, ROSA service fees accrue on demand at an hourly rate per 4 vCPU used by worker nodes. Service fees are uniform across all supported AWS standard Regions. In addition to the worker node service fee, ROSA with hosted control planes (HCP) clusters incur an hourly cluster fee.

 ROSA offers 1-year and 3-year service fee contracts that you can purchase for savings on the on-demand service fees for worker nodes. For more information, see [Purchasing a ROSA contract](integration-marketplace.md#rosa-contracts).

### AWS infrastructure fees
<a name="pricing-infrastructure-fees"></a>

 AWS infrastructure fees apply to the underlying worker nodes, infrastructure nodes, control plane nodes, storage, and network resources hosted on AWS global infrastructure. AWS infrastructure fees vary by AWS Region.