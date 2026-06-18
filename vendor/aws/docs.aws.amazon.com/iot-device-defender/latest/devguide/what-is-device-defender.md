

# What is AWS IoT Device Defender?
<a name="what-is-device-defender"></a>

Use AWS IoT Device Defender, a security and monitoring service, to audit the configuration of your devices, monitor connected devices, and mitigate security risks. With AWS IoT Device Defender, you can enforce consistent security policies across your AWS IoT device fleet and respond quickly when devices are compromised. IoT fleets can consist of large numbers of devices that have diverse capabilities, are long-lived, and are geographically distributed. These characteristics make fleet setup complex and error-prone. Because devices are often constrained in computational power, memory, and storage capabilities, this limits the use of encryption and other forms of security on the devices themselves.

Devices often use software with known vulnerabilities. These factors make IoT fleets an attractive target for hackers and make it difficult to secure your device fleet on an ongoing basis. AWS IoT Device Defender addresses these challenges by providing tools to identify security issues and deviations from best practices. AWS IoT Device Defender can audit device fleets to confirm that they adhere to security best practices and detect abnormal behavior on devices. The following diagram shows the basic architecture of AWS IoT Device Defender and how it relates to services such as AWS IoT Core, Amazon CloudWatch, and Amazon SNS. ![AWS IoT Device Defender diagram showing Audit, Detect, and Publish alerts components.](http://docs.aws.amazon.com/iot-device-defender/latest/devguide/images/device-defender-architecture.jpg)

**Topics**
+ [Are you a first-time AWS IoT Device Defender user?](#first-time-user)
+ [How AWS IoT Device Defender works](#how-device-defender-works)
+ [Features of AWS IoT Device Defender](#features-of-device-defender)
+ [How to get started with AWS IoT Device Defender](#setting-up-device-defender)
+ [Related services](#related-services-device-defender)
+ [Accessing AWS IoT Device Defender](#accessing-device-defender)
+ [Pricing for AWS IoT Device Defender](#pricing-device-defender)

## Are you a first-time AWS IoT Device Defender user?
<a name="first-time-user"></a>

If you're a first-time user of AWS IoT Device Defender, we recommend that you begin by reading the following sections:
+ [How AWS IoT Device Defender works](#how-device-defender-works)
+ [Features of AWS IoT Device Defender](#features-of-device-defender)
+ [How to get started with AWS IoT Device Defender](#setting-up-device-defender)
+ [Related services](#related-services-device-defender)
+ [Accessing AWS IoT Device Defender](#accessing-device-defender)
+ [Pricing for AWS IoT Device Defender](#pricing-device-defender)

## How AWS IoT Device Defender works
<a name="how-device-defender-works"></a>

AWS IoT Device Defender is a fully managed security and monitoring service that helps you secure your fleet of IoT devices. AWS IoT Device Defender audits IoT resources associated with your devices to confirm that they comply with security best practices. Audit checks send alerts if there are any detected security risks, and provide relevant information to help mitigate any issues. AWS IoT Device Defender also continuously monitors security metrics from the cloud, and device-side to detect unexpected device behaviors to identify any possible compromised devices. You can launch audit checks on-demand or on a scheduled basis to assess your IoT device configurations. 

AWS IoT Device Defender works with AWS IoT Core to incorporate the context of device interactions to increase the accuracy of audit checks. AWS IoT Device Defender collects and analyzes high-value security metrics from your connected devices to detect abnormal behaviors. When you use *Rules Detect*, the metric data is continuously evaluated against user-defined behaviors. When you use *ML Detect*, the metric data is continuously evaluated by automatically built machine learning (ML) models to identify anomalies. 

The results from scheduled audit tasks and any detected device activity anomalies are published to the AWS IoT Console and AWS IoT Device Defender API. They are accessible through Amazon CloudWatch. Additionally, you can configure AWS IoT Device Defender to send results toAmazon SNS topics for integration with security dashboards or starting automated remediation workflows. 

AWS IoT Device Defender supports a wide range of use cases, including the following:
+ **Protect your devices: **You can audit your device-related resources against [AWS IoT security best practices](https://aws.amazon.com/architecture/security-identity-compliance/?cards-all.sort-by=item.additionalFields.sortDate&cards-all.sort-order=desc&awsf.content-type=*all&AWSf.methodology=*all) to help you detect device vulnerabilities. AWS IoT Device Defender audits can help you identify and uncover risks to your devices, and confirm that security measures are in place.
+ **Detect unusual device behavior: **You can pinpoint changes in connection patterns, reveal device communication with unauthorized endpoints, and identify changes in inbound and outbound device traffic patters.
+ **Get insight to mitigate risks: **You can take actions to mitigate issues uncovered in an *Audit finding* or *Detect alarm*.
+ **Uphold and maintain device security: ** You can use insights from Audit and Detect checks to diagnose and remediate possible security breaches.
+ **Enhance device security: ** You can distinguish an incorrectly configured device, probe the health of your device fleets, and locate unexpected device behavioral metrics.

## Features of AWS IoT Device Defender
<a name="features-of-device-defender"></a>

The following are a few of the key features of AWS IoT Device Defender.


**Key Features**  

|  |  | 
| --- | --- | 
| Audit | AWS IoT Device Defender audits your device-related resources against [AWS IoT security best practices.](https://docs.aws.amazon.com/iot/latest/developerguide/security.html) in the *IAM User Guide* AWS IoT Device Defender reports configurations that are out of compliance with security best practices, such as overly permissive policies that can allow one device to read and update data for many other devices. | 
| Rules Detect | AWS IoT Device Defenderdetects unusual device behavior that can be indicative of a compromise by continuously monitoring high-value security metrics from the device and AWS IoT Core. You can specify normal device behavior for a group of devices by setting up behaviors (rules) for these metrics. AWS IoT Device Defender monitors and evaluates each datapoint reported for these metrics against user-defined behaviors (rules) and alerts you if an anomaly is detected. | 
| ML Detect | AWS IoT Device Defender automatically sets device behaviors for you with machine learning (ML) models using device data across six cloud-side metrics and seven device-side metrics from a trailing 14-day period. It then retrains the models each day (as long as it has sufficient data to train the model) to refresh the expected device behaviors based on the latest trailing 14 days after initial models are built. AWS IoT Device Defender monitors and identifies anomalous datapoints for these metrics with the ML models and sets off an alarm if an anomaly is detected. | 
| Alerting | AWS IoT Device Defender publishes alarms to the AWS IoT Console, Amazon CloudWatch, and Amazon SNS. | 
| Mitigation | AWS IoT Device Defender can be used to investigate issues by providing contextual and historical information about the device such as device metadata, device statistics, and historical alerts for the device. You can also use AWS IoT Device Defender built-in mitigation actions to perform mitigation steps on Audit and Detect alarms such as adding things to a thing group, replacing default policy version, and updating device certificate. | 

## How to get started with AWS IoT Device Defender
<a name="setting-up-device-defender"></a>

For help getting started with AWS IoT Device Defender, see the following tutorials.
+ [Setting up](https://docs.aws.amazon.com/iot/latest/developerguide/dd-setting-up.html)
+ [ML Detect guide](https://docs.aws.amazon.com/iot/latest/developerguide/dd-detect-ml-getting-started.html)
+ [Audit guide](https://docs.aws.amazon.com/iot/latest/developerguide/audit-tutorial.html)
+ [Customize when and how you view AWS IoT Device Defender audit results](https://docs.aws.amazon.com/iot/latest/developerguide/dd-suppressions-example.html)

## Related services
<a name="related-services-device-defender"></a>
+ **AWS IoT Greengrass**: AWS IoT Greengrass provides pre-built integration with AWS IoT Device Defender to monitor device behaviors on an ongoing basis.
+ **AWS IoT Device Management: **You can use AWS IoT Device Management fleet indexing to index, search, and aggregate your AWS IoT Device Defender detect violations.

## Accessing AWS IoT Device Defender
<a name="accessing-device-defender"></a>

You can use the AWS IoT Device Defender console or the API to access AWS IoT Device Defender.

## Pricing for AWS IoT Device Defender
<a name="pricing-device-defender"></a>

With AWS IoT Device Defender, you only pay for what you use. There is no minimum fee or mandatory service usage. However, you are billed separately for Audit and Detect features. Audit pricing is per device count, per month. When you turn on Audit, you're charged based on the number of active device [principals](https://docs.aws.amazon.com/iot/latest/developerguide/client-authentication.html) in a month. Therefore, adding or removing audit checks would not affect your monthly bill when using this feature. You can calculate your AWS IoT Device Defender and architecture cost in a single estimate using the AWS Pricing Calculator.
+ [AWS Pricing Calculator](https://calculator.aws/#/addService/IoTDeviceDefender)