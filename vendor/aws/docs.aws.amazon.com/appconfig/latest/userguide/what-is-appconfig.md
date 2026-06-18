

# What is AWS AppConfig?
<a name="what-is-appconfig"></a>

AWS AppConfig helps you safely change application behavior in production without redeploying code. Using feature flags and dynamic free-form configurations, you can control how your application runs in real time. This approach reduces risk, accelerates releases, and enables faster responses to issues. You can gradually roll out new features to specific users, monitor their impact, and expand availability with confidence. You can also update block lists, allow lists, throttling limits, and logging levels instantly, allowing you to mitigate issues and fine-tune performance without a deployment.

AWS AppConfig experimentation enables software teams to run A/B tests and gradual feature rollouts using production traffic. Built on Amazon's 25\+ years of software experimentation expertise (including on Amazon.com), the service integrates experimentation directly into your existing AWS AppConfig feature flag workflows. Teams can define hypotheses, target specific audiences, split traffic between treatments, and gradually increase exposure while monitoring operational metrics using CloudWatch or other preferred monitoring tools. AWS AppConfig experimentation works with any compute environment supported by the AWS AppConfig Agent, including Amazon EC2, AWS Lambda, Amazon ECS, and Amazon EKS. Teams can export experiment assignment data to data warehouses such as Amazon Redshift, Snowflake, or Databricks for results analysis. As AI continues to accelerate how teams build and iterate on software, AWS AppConfig experimentation provides a way to validate AI-driven changes with measurable production data and reduced operational risk.

## Get started with AWS AppConfig
<a name="what-is-how-to-get-started-appconfig"></a>

The following video can help you understand the capabilities of AWS AppConfig.

**Video: Introduction to AWS AppConfig**  
View a video introduction to AWS AppConfig capabilities.

[![AWS Videos](http://img.youtube.com/vi/rL_e6W6SlMM?si=kmR92RLEuyhJP_hf/0.jpg)](http://www.youtube.com/watch?v=rL_e6W6SlMM?si=kmR92RLEuyhJP_hf)


View more AWS videos on the [Amazon Web Services YouTube Channel](https://www.youtube.com/user/AmazonWebServices).

## AWS AppConfig use cases
<a name="what-is-appconfig-when-to-use"></a>

AWS AppConfig supports a broad spectrum of use cases:
+ **Application experimentation** – Safely evaluate application changes in production using controlled audience exposure and feature flag-based treatments.
+ **Feature flags and toggles** – Gradually release new capabilities to targeted users, monitor impact, and instantly roll back changes if issues occur.
+ **Application tuning** – Introduce changes safely in production, measure their effects, and refine behavior without redeploying code.
+ **Allow list or block list** – Control access to features or restrict specific users in real time, without modifying application code. 
+ **Centralized configuration storage** – Manage configuration data consistently across workloads. AWS AppConfig can deploy configuration from the AWS AppConfig hosted configuration store, AWS Secrets Manager, Systems Manager Parameter Store, or Amazon S3.

## Benefits overview
<a name="what-is-benefits-overview"></a>

The following brief overview outlines the benefits of using AWS AppConfig.

**Improve efficiency and release changes faster**  
Feature flags help you release changes to production more quickly and with less risk. Instead of managing long-lived development branches and complex merges, you can adopt trunk-based development and control feature availability through flags. This approach allows you to deploy code that remains hidden from users until you are ready to release it. When the feature is ready, enable it without redeploying code. If issues occur after release, you can disable the feature immediately without rolling back the deployment.

**Avoid unintended changes or failures with built-in safety features**  
AWS AppConfig includes safety features that help prevent configuration changes from causing application failures:  
+ **Validators**: Ensure that configuration data is syntactically and semantically correct before deployment.
+ **Deployment strategies**: Gradually roll out changes over a defined period of time to reduce risk.
+ **Monitoring and automatic rollback**: AWS AppConfig integrates with Amazon CloudWatch to monitor application health. If a configuration change triggers an alarm, AWS AppConfig automatically rolls back the change to minimize impact.

**Secure and scalable feature flag deployments**  
AWS AppConfig integrates with AWS Identity and Access Management (IAM) to provide fine-grain, role-based access control. It also integrates with AWS Key Management Service (AWS KMS) for encryption and AWS CloudTrail for auditing.  
AWS developed and validated AWS AppConfig safety controls with internal teams that operate at scale before making them available to external customers. This foundation helps ensure the service is secure, reliable, and ready for production workloads.

## How AWS AppConfig works
<a name="what-is-appconfig-how-it-works"></a>

This section provides a high-level description of how AWS AppConfig works.

![A diagram of how AWS AppConfig works](http://docs.aws.amazon.com/appconfig/latest/userguide/images/AppConfigHowItWorks.png)


**1. Identify configuration data to manage in AWS AppConfig**  
Before creating a configuration profile, identify the configuration data in your code that you want to manage dynamically using AWS AppConfig. Common examples include feature flags, allow and block lists, logging levels, service limits, and throttling rules. These values tend to change frequently and can cause issues if misconfigured.  
If your configuration data already exists in cloud services such as SSM Parameter Store or Amazon S3, you can use AWS AppConfig to validate, deploy, and manage that data more effectively.

**2. Create a configuration profile in AWS AppConfig**  
A configuration profile defines how AWS AppConfig locates and manages your configuration data. It includes a URI that points to the data source and a profile type.  
AWS AppConfig supports two profile types  
+ **Feature flags** – Enable controlled feature releases, gradual rollouts, and testing in production.
+ **Free-form configurations** – Store and retrieve configuration data from external sources and update it without redeploying code.
Both profile types help decouple configuration from code, support continuous delivery, and reduce deployment risk.  
You can also add optional validators to ensure that configuration data is syntactically and semantically correct. During deployment, AWS AppConfig evaluates these validators and automatically rolls back changes if validation fails.  
Each configuration profile is associated with an application, which acts as a logical container for your configuration resources. For more information about creating a configuration profile, see [Creating a configuration profile in AWS AppConfig](appconfig-creating-configuration-profile.md).

**3. Deploy configuration data**  
When you start a deployment, AWS AppConfig:  

1. Retrieves configuration data from the source defined in the configuration profile

1. Validates the data using the configured validators

1. Delivers the validated configuration to AWS AppConfig Agent
The delivered configuration becomes the deployed version used by your application. For more information about deploying a configuration, see [Deploying feature flags and configuration data in AWS AppConfig](deploying-feature-flags.md).

**4. Retrieve configuration data**  
Your application retrieves configuration data by calling a local endpoint exposed by AWS AppConfig Agent, which caches the deployed configuration. Retrieving data is a metered event. AWS AppConfig Agent supports a variety of use cases, as described in [How to use AWS AppConfig Agent to retrieve configuration data](appconfig-agent-how-to-use.md).  
If the agent is not suitable for your use case, your application can retrieve configuration data directly from AWS AppConfig by calling the [StartConfigurationSession](https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_appconfigdata_StartConfigurationSession.html) and [GetLatestConfiguration](https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_appconfigdata_GetLatestConfiguration.html) API actions.   
For more information about retrieving a configuration, see [Retrieving feature flags and configuration data in AWS AppConfig](retrieving-feature-flags.md).

## Pricing for AWS AppConfig
<a name="what-is-appconfig-cost"></a>

Pricing for AWS AppConfig is pay-as-you-go based on configuration data and feature flag retrieval. We recommend using AWS AppConfig Agent to help optimize costs. For more information, see [AWS Systems Manager Pricing](https://aws.amazon.com/systems-manager/pricing/).