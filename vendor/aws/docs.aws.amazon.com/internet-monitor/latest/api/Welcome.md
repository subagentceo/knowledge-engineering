

# Welcome
<a name="Welcome"></a>

Internet Monitor is a feature of Amazon CloudWatch Network Monitoring that provides visibility into how internet issues impact performance and availability between your applications hosted on AWS and your end users. Internet Monitor uses the connectivity data that AWS captures from its global networking footprint to calculate a baseline of performance and availability for internet traffic. This is the same data that AWS uses to monitor internet uptime and availability. With those measurements as a baseline, Internet Monitor raises awareness for you when there are significant problems for your end users in the different geographic locations where your application runs.

Internet Monitor publishes internet measurements to CloudWatch Logs and CloudWatch Metrics,to easily support using CloudWatch tools with health information for geographies and networks specific to your application. Internet Monitor sends health events to Amazon EventBridge so that you can set up notifications. If an overall issue is caused by the AWS network, you also automatically receive an AWS Health Dashboard notification with the steps that AWS is taking to mitigate the problem.

To use Internet Monitor, you create a *monitor* and associate your application's resources with it - VPCs, NLBs, CloudFront distributions, or WorkSpaces directories - so Internet Monitor can determine where your application's internet traffic is. Internet Monitor then provides internet measurements from AWS that are specific to the locations and ASNs (typically, internet service providers or ISPs) that communicate with your application.

For more information, see [Using Internet Monitor](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-InternetMonitor.html) in the *Amazon CloudWatch User Guide*.

This document was last published on June 17, 2026. 