

# What is Image Builder?
<a name="what-is-image-builder"></a>

EC2 Image Builder is a fully managed AWS service that helps you to automate the creation, management, and deployment of customized, secure, and up-to-date server images. You can use the AWS Management Console, AWS Command Line Interface, or APIs to create custom images in your AWS account.

You own the customized images that Image Builder creates in your account. You can configure pipelines to automate updates and system patching for the images that you own. You can also run a stand-alone command to create an image with the configuration resources that you've defined.

The Image Builder pipeline wizard can guide you through the steps to create a custom image, as follows:

## Step 1: Specify pipeline details
<a name="wiz-step1-specify-pipeline-details"></a>
+ Name your pipeline and add tags.
+ Define metadata and vulnerability scan settings.
+ Set up a schedule for your pipeline.

## Step 2: Customize your image
<a name="wiz-step2-choose-recipe"></a>

You can select an existing recipe or create a new one.
+ Choose a base image for your customizations.
+ Add to or remove software from your base image.
+ Customize settings and scripts with build components.
+ Select test components to run.

## Step 3: Define your workflow
<a name="wiz-step3-define-workflow"></a>

An image workflow defines the sequence of steps that Image Builder performs during the build and test stages of the image creation process. This is part of the overall Image Builder workflow framework.

## Step 4: Configure build infrastructure
<a name="wiz-step4-define-infra"></a>
+ Select an IAM role to associate with the instance profile for instances that Image Builder launches during the image creation process.
+ Select one or more instance types that can be applied at launch.
+ Select an Amazon Simple Notification Service (SNS) Topic to receive notifications from Image Builder.
+ Specify VPC, subnet, and security groups that apply for the image creation process.
+ Select troubleshooting settings such as where Image Builder writes logs, and whether to terminate the build instance on failure (default) or keep it running for further troubleshooting.

## Step 5: Define image distribution
<a name="wiz-step5-distribution-settings"></a>
+ Select AWS Regions where Image Builder distributes your Amazon Machine Image (AMI) or container image.
+ If your Image Builder pipeline creates an AMI, Image Builder also supports the following configuration:
  + Select a KMS key to use for encryption.
  + Configure AMI sharing across AWS accounts and Organizations.
  + Associate a License Manager self-managed license with your distributed image.
  + Configure a launch template for your image.

## Features of Image Builder
<a name="image-builder-features"></a>

EC2 Image Builder provides the following features:

**Increase productivity and reduce operations for building compliant and up-to-date images**

Image Builder reduces the amount of work involved in creating and managing images at scale by automating your build pipelines. You can automate your builds by providing your build execution schedule preference. Automation reduces the operational cost of maintaining your software with the latest operating system patches.

**Increase service uptime**

Image Builder provides access to test components that you can use to test your images before deployment. You can also create custom test components with AWS Task Orchestrator and Executor (AWSTOE), and use those. Image Builder distributes your image only if all of the configured tests have succeeded.

**Raise the security bar for deployments**

Image Builder allows you to create images that remove unnecessary exposure to component security vulnerabilities. You can apply AWS security settings to create secure, out-of-the-box images that meet industry and internal security criteria. Image Builder also provides collections of settings for companies in regulated industries. You can use these settings to help you quickly and easily build compliant images for STIG standards. For a complete list of STIG components available through Image Builder, see [Amazon managed STIG hardening components for Image Builder](ib-stig.md).

**Centralized enforcement and lineage tracking**

Using built-in integrations with AWS Organizations, Image Builder enables you to enforce policies that restrict accounts to run instances only from approved AMIs.

**Simplified sharing of resources across AWS accounts**

EC2 Image Builder integrates with AWS Resource Access Manager (AWS RAM) to allow you to share certain resources with any AWS account or through AWS Organizations. EC2 Image Builder resources that can be shared are:
+ Components
+ Images
+ Image recipes
+ Container recipes

For more information, see [Share Image Builder resources with AWS RAM](manage-shared-resources.md).

## Supported operating systems
<a name="image-builder-os"></a>

Image Builder supports the following operating system versions:


| Operating system/distribution | Supported versions | 
| --- | --- | 
| Amazon Linux | 2 and 2023 | 
| CentOS | 7 and 8 | 
| CentOS Stream | 8 | 
| macOS | 12.x (Monterey), 13.x (Ventura), 14.x (Sonoma), 15.x (Sequoia), 26.x (Tahoe) | 
| Red Hat Enterprise Linux (RHEL) | 7, 8, 9, and 10 | 
| SUSE Linux Enterprise Server (SUSE) | 12, 15 and 16 | 
| Ubuntu | 18.04 LTS, 20.04 LTS, 22.04 LTS, and 24.04 LTS | 
| Windows Server | 2012 R2, 2016, 2019, 2022, and 2025 | 

## Supported image formats
<a name="image-builder-image-formats"></a>

For your custom images that create an Amazon Machine Image (AMI), you can choose an existing AMI as a starting point. For Docker container images, you can choose from public images hosted on DockerHub, existing container images in Amazon ECR, or Amazon-managed container images as your starting point.

## Default quotas
<a name="image-builder-default-limits"></a>

To view the default quotas for Image Builder, see [Image Builder Endpoints and Quotas](https://docs.aws.amazon.com/general/latest/gr/imagebuilder.html). 

## AWS Regions and Endpoints
<a name="image-builder-regions"></a>

To view the service endpoints for Image Builder, see [Image Builder Endpoints and Quotas](https://docs.aws.amazon.com/general/latest/gr/imagebuilder.html).

## Concepts
<a name="image-builder-concepts"></a>

The following terms and concepts are central to your understanding and use of EC2 Image Builder.

**AMI**  
An Amazon Machine Image (AMI) is the basic unit of deployment in Amazon EC2, and is one of the types of images you can create with Image Builder. An AMI is a pre-configured virtual machine image that contains the operating system (OS) and preinstalled software to deploy EC2 instances. For more information, see [Amazon Machine Images (AMI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html).

**Image pipeline**  
An image pipeline provides an automation framework for building secure AMIs and container images on AWS. The Image Builder image pipeline is associated with an image recipe or container recipe that defines the build, validation, and test phases for an image build lifecycle.

An image pipeline can be associated with an infrastructure configuration that defines where your image is built. You can define attributes, such as instance type, subnets, security groups, logging, and other infrastructure-related configurations. You can also associate your image pipeline with a distribution configuration to define how you would like to deploy your image. 

**Managed image**  
A managed image is a resource in Image Builder that consists of an AMI or container image, plus metadata, such as version and platform. The managed image is used by Image Builder pipelines to determine which base image to use for the build. In this guide, managed images are sometimes referred to as "images," however, an image is not the same as an AMI.

**Image recipe**  
An Image Builder image recipe is a document that defines the base image and the components that are applied to the base image to produce the desired configuration for the output AMI image. You can use an image recipe to duplicate builds. Image Builder image recipes can be shared, branched, and edited using the console wizard, the AWS CLI, or the API. You can use image recipes with your version control software to maintain shareable, versioned image recipes.

**Container recipe**  
An Image Builder container recipe is a document that defines the base image and the components that are applied to the base image to produce the desired configuration for the output container image. You can use a container recipe to duplicate builds. You can share, branch, and edit Image Builder image recipes by using the console wizard, the AWS CLI, or the API. You can use container recipes with your version control software to maintain shareable, versioned container recipes.

**Base image**  
The base image is the selected image and operating system used in your image or container recipe document, along with the components. The base image and the component definitions combined produce the desired configuration for the output image.

**Components**  
A component defines the sequence of steps required to either customize an instance prior to image creation (a **build component**), or to test an instance that was launched from the created image (a **test component**).

A component is created from a declarative, plain-text YAML or JSON document that describes the runtime configuration for building and validating, or testing an instance that is produced by your pipeline. Components run on the instance using a component management application. The component management application parses the documents and runs the desired steps.

After they are created, one or more components are grouped together using an image recipe or container recipe to define the plan for building and testing a virtual machine or container image. You can use public components that are owned and managed by AWS, or you can create your own. For more information about components, see [How Image Builder uses the AWS Task Orchestrator and Executor application to manage components](toe-component-manager.md).

**Component document**  
A declarative, plain-text YAML or JSON document that describes configuration for a customization you can apply to your image. The document is used to create a build or test component.

**Runtime stages**  
EC2 Image Builder has two runtime stages: **build** and **test**. Each runtime stage has one or more phases with configuration defined by the component document.

**Configuration phases**  
The following list shows the phases that run during the **build** and **test** stages:*Build stage:*

Build phase  
An image pipeline begins with the build phase of the build stage when it runs. The base image is downloaded, and configuration that is specified for the build phase of the component is applied to build and launch an instance.

Validate phase  
After Image Builder launches the instance and applies all of the build phase customizations, the validation phase begins. During this phase, Image Builder ensures that all of the customizations work as expected, based on the configuration that the component specifies for the validate phase. If the instance validation succeeds, Image Builder stops the instance, creates an image, and then continues to the test stage.*Test stage:*

Test phase  
During this phase, Image Builder launches an instance from the image that it created after the validation phase completed successfully. Image Builder runs test components during this phase to verify that the instance is healthy and functions as expected.

Container host test phase  
After Image Builder runs the test phase for all of the components that you selected in the container recipe, Image Builder runs this phase for container workflows. The container host test phase can run additional tests that validate container management and custom runtime configurations.

**Workflow**  
Workflows define the sequence of steps that Image Builder performs when it creates a new image. All images have build, test, and distribution workflows.*Workflow types*

`BUILD`  
Covers build stage configuration for every image created.

`TEST`  
Covers test stage configuration for every image created.

`DISTRIBUTION`  
Covers distribution stage configuration for every image created.

## Pricing
<a name="image-builder-pricing"></a>

There is no cost to use EC2 Image Builder to create custom AMI or container images. However, standard pricing applies for other services that are used in the process. The following list includes the usage of some AWS services that can incur costs when you create, build, store, and distribute your custom AMI or container images, depending on your configuration.
+ Launching an EC2 instance
+ Storing logs on Amazon S3
+ Validating images with Amazon Inspector
+ Storing Amazon EBS Snapshots for your AMIs
+ Storing container images in Amazon ECR
+ Pushing and pulling container images into and out of Amazon ECR
+ If Systems Manager Advanced Tier is turned on, and Amazon EC2 instances run with on-premises activation, you might be charged for resources through Systems Manager

## Related AWS services
<a name="image-builder-related-services"></a>

EC2 Image Builder uses other AWS services to build images, depending on your Image Builder recipe configuration. For more information about product and service integration for your custom images, see [Integrate products and services in Image Builder](integrate-products-services.md).