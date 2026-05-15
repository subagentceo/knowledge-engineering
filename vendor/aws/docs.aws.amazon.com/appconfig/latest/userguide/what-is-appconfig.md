

# What is AWS AppConfig?
<a name="what-is-appconfig"></a>

AWS AppConfig feature flags and dynamic configurations help software builders quickly and securely adjust application behavior in production environments without full code deployments. AWS AppConfig speeds up software release frequency, improves application resiliency, and helps you address emergent issues more quickly.

With feature flags, you can gradually release new capabilities to users and measure the impact of those changes before fully deploying the new capabilities to all users. With operational flags and dynamic configurations, you can update block lists, allow lists, throttling limits, logging verbosity, and perform other operational tuning to quickly respond to issues in production environments.

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
+ **Feature flags and toggles** – Safely release new capabilities to your customers in a controlled environment. Instantly roll back changes if you experience a problem.
+ **Application tuning** – Carefully introduce application changes while testing the impact of those changes with users in production environments.
+ **Allow list or block list** – Control access to premium features or instantly block specific users without deploying new code. 
+ **Centralized configuration storage** – Keep your configuration data organized and consistent across all of your workloads. You can use AWS AppConfig to deploy configuration data stored in the AWS AppConfig hosted configuration store, AWS Secrets Manager, Systems Manager Parameter Store, or Amazon S3.

## Benefits overview
<a name="what-is-benefits-overview"></a>

The following brief overview outlines the benefits of using AWS AppConfig.

**Improve efficiency and release changes faster**  
Using feature flags with new capabilities speeds up the process of releasing changes to production environments. Instead of relying on long-lived development branches that require complicated merges before a release, feature flags enable you to write software using trunk-based development. Feature flags enable you to safely roll out pre-release code in a CI/CD pipeline that is hidden from users. When you are ready to release the changes, you can update the feature flag without deploying new code. After the launch is complete, the flag can still function as a block switch to disable a new feature or capability without the need to roll back the code deployment.

**Avoid unintended changes or failures with built-in safety features**  
AWS AppConfig offers the following safety features to help you avoid enabling feature flags or updating configuration data that could cause application failures.  
+ **Validators**: A validator ensures that your configuration data is syntactically and semantically correct before deploying the changes to production environments.
+ **Deployment strategies**: A deployment strategy enables you to slowly release changes to production environments over minutes or hours.
+ **Monitoring and automatic rollback**: AWS AppConfig integrates with Amazon CloudWatch to monitor changes to your applications. If your application becomes unhealthy because of a bad configuration change and that change triggers an alarm in CloudWatch, AWS AppConfig automatically rolls back the change to minimize impact on your application users.

**Secure and scalable feature flag deployments**  
AWS AppConfig integrates with AWS Identity and Access Management (IAM) to provide fine-grain, role-based access to the service. AWS AppConfig also integrates with AWS Key Management Service (AWS KMS) for encryption and AWS CloudTrail for auditing. Before being released to external customers, all AWS AppConfig safety controls were initially developed with and validated by internal customers that use the service at scale.

## How AWS AppConfig works
<a name="what-is-appconfig-how-it-works"></a>

This section provides a high-level description of how AWS AppConfig works.

![A diagram of how AWS AppConfig works](http://docs.aws.amazon.com/appconfig/latest/userguide/images/AppConfigHowItWorks.png)


**1. Identify configuration values in code you want to manage in AWS AppConfig**  
Before you create a configuration profile in AWS AppConfig, we recommend you identify configuration data in your code that you want to dynamically manage using AWS AppConfig. Good examples include feature flags or toggles, allow and block lists, logging verbosity, service limits, and throttling rules, to name a few. These types of configuration change frequently and can cause problems if not correct.  
If your configuration data already exists in the cloud, for example in Parameter Store or Amazon S3, you can take advantage of AWS AppConfig validation, deployment, and extension features to further streamline configuration data management.

**2. Create a configuration profile in AWS AppConfig**  
A configuration profile includes, among other things, a URI that enables AWS AppConfig to locate your configuration data in its stored location and a profile type. AWS AppConfig supports two configuration profile types: feature flags and freeform configurations. Both types can reduce the risk and complexity of software development and deployment by decoupling feature releases from code deployments. They also enable continuous delivery and risk mitigation through staged rollouts. Additionally, feature flags enable testing in production with real users, while freeform configurations enable you to retrieve configuration data from other AWS services. Both profile types allow for faster iteration, experimentation, personalization, and efficient management of the software lifecycle. For more information about creating a configuration profile, see [Creating a configuration profile in AWS AppConfig](appconfig-creating-configuration-profile.md).  
A configuration profile can also include optional validators to ensure your configuration data is syntactically and semantically correct. AWS AppConfig performs a check using the validators when you start a deployment. If any errors are detected, the deployment rolls back to the previous configuration data.  
When you create a configuration profile, you also create an application in AWS AppConfig. An application is simply a namespace or an organizational construct like a folder. 

**3. Deploy configuration data**  
When you start a deployment, AWS AppConfig performs the following tasks:  

1. Retrieves the configuration data from the underlying data store by using the location path name in the configuration profile.

1. Verifies the configuration data is syntactically and semantically correct by using the validators you specified when you created your configuration profile.

1. Sends a copy of the data to AWS AppConfig Agent to be read by your application. This copy is called the *deployed data*.
For more information about deploying a configuration, see [Deploying feature flags and configuration data in AWS AppConfig](deploying-feature-flags.md).

**4. Retrieve the configuration**  
To retrieve the data, your application makes an HTTP call to the localhost server where AWS AppConfig Agent has cached a local copy of your deployed configuration data. Retrieving data is a metered event. AWS AppConfig Agent supports several use cases, as described in [How to use AWS AppConfig Agent to retrieve configuration data](appconfig-agent-how-to-use.md).  
If AWS AppConfig Agent isn't supported for your use case, you can configure your application to poll AWS AppConfig for configuration updates by directly calling the [StartConfigurationSession](https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_appconfigdata_StartConfigurationSession.html) and [GetLatestConfiguration](https://docs.aws.amazon.com/appconfig/2019-10-09/APIReference/API_appconfigdata_GetLatestConfiguration.html) API actions.   
For more information about retrieving a configuration, see [Retrieving feature flags and configuration data in AWS AppConfig](retrieving-feature-flags.md).

## Pricing for AWS AppConfig
<a name="what-is-appconfig-cost"></a>

Pricing for AWS AppConfig is pay-as-you-go based on configuration data and feature flag retrieval. We recommend using the AWS AppConfig Agent to help optimize costs. For more information, see [AWS Systems Manager Pricing](https://aws.amazon.com/systems-manager/pricing/).