

# Introduction
<a name="intro"></a>

## How Amazon WorkSpaces Core works
<a name="how-core-works"></a>

Amazon WorkSpaces Core provides managed virtual desktop infrastructure (VDI) that integrates with third-party management solutions. Amazon WorkSpaces Core enables technology partners to build flexible and customizable desktop solutions while benefiting from the security, global availability, and cost efficiency of AWS infrastructure.

Amazon WorkSpaces Core supports two provisioning options:
+ **Amazon WorkSpaces Core bundle configurations** – Similar to an Amazon WorkSpaces Personal bundle, an Amazon WorkSpaces Core bundle is a preconfigured combination of compute, storage, and software resources, along with an operating system that you can use to launch a virtual desktop in Amazon WorkSpaces Core. Use this option to deliver persistent desktops where user data and settings are preserved. Amazon WorkSpaces Core manages the underlying infrastructure on your behalf, including Amazon Machine Image (AMI), Amazon EC2 instances, and Amazon EBS volumes. Pricing is all-inclusive and available on hourly or monthly billing terms. For details about available public bundles, see [Amazon WorkSpaces Bundles](https://docs.aws.amazon.com/workspaces/latest/adminguide/bundle-options.html).
+ **Amazon WorkSpaces Core Managed Instances** – An Amazon WorkSpaces Core Managed Instance is an Amazon EC2 instance that is launched and managed by Amazon WorkSpaces Core. Use this option if you prefer to have more visibility and control of the types of Amazon EC2 instances managed by WorkSpaces Core. You can deliver both persistent and non-persistent desktops while maintaining direct control over your Amazon EC2 instances. This option allows you to leverage Amazon EC2 pricing models, including Reserved Instances and Savings Plans, for cost optimization. You are billed for an hourly service fee in addition to charges for any AWS resources used (such as Amazon EC2 and Amazon EBS). For details about support instances, see [Amazon WorkSpaces Core Managed Instances ](https://docs.aws.amazon.com/workspaces- 22 core/latest/pg/managed-instances.html).

## Who should use Amazon WorkSpaces Core
<a name="who-use-core"></a>

This guide is intended for third-party VDI solution providers who want to build custom desktop experiences on AWS using Amazon WorkSpaces Core. Providers can use the Amazon WorkSpaces Core API to integrate desktop provisioning, management, and monitoring capabilities into their solutions.

If you're a customer interested in using a VDI or desktop as a service (DaaS) solution built on Amazon WorkSpaces Core, see [Amazon WorkSpaces Core](https://aws.amazon.com/workspaces/core/) and choose **WorkSpaces Core Partners** to learn more.

Amazon WorkSpaces Core is part of the Amazon WorkSpaces Family. For more information, see [Amazon WorkSpaces Family](https://aws.amazon.com/workspaces/).