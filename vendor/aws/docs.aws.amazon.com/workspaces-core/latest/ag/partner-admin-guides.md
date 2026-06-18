

# Administration guides for partner solutions on Amazon WorkSpaces Core
<a name="partner-admin-guides"></a>

Amazon WorkSpaces Core offers managed virtual desktop infrastructure designed to work with third-party management solutions. For more information, see [Amazon WorkSpaces Core](https://aws.amazon.com/workspaces/core/). Amazon WorkSpaces Core is part of the Amazon WorkSpaces Family of services. Amazon WorkSpaces Core gives technology partners like you flexibility and choice, while maintaining the security, global reliability, and cost efficiency customers have enjoyed from WorkSpaces for years. For more information, see [Amazon WorkSpaces Family](https://aws.amazon.com/workspaces/).

Amazon WorkSpaces Core supports two provisioning options:
+ **Amazon WorkSpaces Core bundles** – Similar to an Amazon WorkSpaces Personal bundle, an Amazon WorkSpaces Core bundle is a preconfigured combination of compute, storage, and software resources, along with an operating system that you can use to launch a virtual desktop in Amazon WorkSpaces Core. Use this option to deliver persistent desktops where user data and settings are preserved. Amazon WorkSpaces Core manages the underlying infrastructure on your behalf, including Amazon Machine Image (AMI), Amazon EC2 instances, and Amazon EBS volumes. Pricing is all-inclusive and available on hourly or monthly billing terms. For details about available public bundles, see [Deployment with WorkSpaces Core bundles](https://docs.aws.amazon.com/workspaces/latest/adminguide/bundle-options.html).
+ **Amazon WorkSpaces Core Managed Instances ** – An Amazon WorkSpaces Core Managed Instance is an EC2 instance that is launched and managed by WorkSpaces Core. Use this option if you prefer to have more visibility and control of the types of EC2 instances managed by WorkSpaces Core. This option allows you to leverage EC2 pricing models, including Reserved Instances and Savings Plans, for cost optimization. You are billed for an hourly service fee in addition to charges for any AWS resources used (such as EC2 and EBS). For details about support instances, see [Deployment with WorkSpaces Core Managed Instances](https://docs.aws.amazon.com/workspaces-core/latest/pg/deploy-instances.html).

WorkSpaces Core APIs require integration from VDI management solution partners. Workspot integrates with WorkSpaces Core Managed Instances while Citrix, Omnissa, and Leostream support WorkSpaces bundle configurations.

If you are an administrator who wants an immediate solution to configuring workspaces, without having to build or develop your own solution with Amazon WorkSpaces Core, please refer to the following administration guides from our partners:
+ If you want to set up Citrix DaaS on Amazon WorkSpaces Core, see [Citrix DaaS for Amazon WorkSpaces Core](https://docs.citrix.com/en-us/citrix-daas/install-configure/amazon-workspaces-core).
+ If you want to set up Workspot Cloud PCs with Amazon WorkSpaces Core, see [Getting Started with Workspot](https://community.workspot.com/getting-started-with-workspot-269/getting-started-with-workspot-947).
+ If you want to set up Leostream with Amazon WorkSpaces Core, see [Using Leostream to Manage Amazon WorkSpaces Core](https://docs.leostream.com/v202x/quick_start_Leostream_with_Amazon_WorkSpaces_Core.pdf).
+ If you want to set up Omnissa Horizon with Amazon WorkSpaces Core, see [Deploying Omnissa Horizon 8](https://techzone.omnissa.com/resource/deploying-omnissa-horizon-amazon-ec2-and-amazon-workspaces) or [Omnissa Horizon Cloud](https://techzone.omnissa.com/resource/horizon-cloud-service-next-gen-architecture#introduction).

## Using Amazon WorkSpaces Core Bundles
<a name="workspaces-core-bundles"></a>

Similar to Amazon WorkSpaces personal bundles, a WorkSpaces Core bundle is a predefined combination of an operating system, compute, storage, and software resources. When launching a WorkSpaces, you select the bundle that best meets your requirements. The default bundles provided by WorkSpaces are referred to as public bundles. For more information, see Amazon WorkSpaces Bundles.

A custom image contains only the operating system, installed software, and user-defined settings for the WorkSpace. A custom bundle combines that custom image with the selected hardware specifications—such as compute and storage—that define the configuration of the WorkSpace.

After creating a custom image, you can build a custom bundle by selecting the appropriate compute and storage resources to pair with the image. This custom bundle can then be used to launch new WorkSpaces with a consistent configuration, ensuring standardization across your deployments.

To apply software updates or install additional applications, you can modify your custom bundle and use it to rebuild your WorkSpaces.

For a list of available WorkSpaces Core bundles, visit the [Amazon WorkSpaces Core pricing page](https://aws.amazon.com/workspaces-family/core/pricing/). To help you choose the right bundle for your use case, refer to the available [bundle options](https://docs.aws.amazon.com/workspaces/latest/adminguide/bundle-options.html).

## Using Amazon WorkSpaces Managed Instances
<a name="workspaces-core-managed-instances"></a>

An Amazon WorkSpaces Core Managed Instance is an EC2 instance that is launched and managed by WorkSpaces Core. If you choose to use WorkSpaces Core Managed Instances, you will manage your own AWS infrastructure and WorkSpaces Core is responsible for tasks such as provisioning the instance, configuring software, scaling capacity, handling instance failures and replacements, and terminating the instance. You can deliver both persistent and non-persistent desktops while maintaining direct control over your EC2 instances launched through WorkSpaces Core. This option allows you to leverage EC2 pricing models, including Reserved Instances and Savings Plans, for cost optimization. You are billed for an hourly service fee in addition to charges for any AWS resources used (such as EC2 and EBS).

WorkSpaces Core Managed Instances only support instances with all sizes as shown below:


| Purpose | Size | 
| --- | --- | 
| General purpose | M5 \| M5a \| M5ad \| M5d \| M5dn \| M5n \| M5zn \| M6a \| M6g \| M6gd \| M6i \| M6id \| M6idn \| M6in \| M7a \| M7g \| M7gd \| M7i \| M7i-flex \| M8g \| M8gd \| T3 \| T3a \| T4g | 
| Compute optimized | C5 \| C5a \| C5ad \| C5d \| C5n \| C6a \| C6g \| C6gd \| C6gn \| C6i \| C6id \| C6in \| C7a \| C7g \| C7gd \| C7gn \| C7i \| C7i-flex \| C8g \| C8gd | 
| Memory optimized | R5 \| R5a \| R5ad \| R5b \| R5d \| R5dn \| R5n \| R6a \| R6g \| R6gd \| R6i \| R6idn \| R6in \| R6id \| R7a \| R7g \| R7gd \| R7i \| R7iz \| R8g \| R8gd \| X2gd \| X2idn \| X2iedn \| X2iezn \| X8g \| z1d | 
| Accelerated computing | G4ad \| G4dn \| G5 \| G5g \| G6 \| G6e \| Gr6 \| P3dn \| P4d \| P4de \| P5 \| P5e \| P5en | 

**Note**  
Bare metal sizes such as m7i.metal-24xlarge are not supported.

For a list of available WorkSpaces Core bundles, visit the [Amazon WorkSpaces Core pricing page](https://aws.amazon.com/workspaces-family/core/pricing/). To help you choose the right instances for your use case, refer to [Amazon EC2 instance types](https://aws.amazon.com/ec2/instance-types/).