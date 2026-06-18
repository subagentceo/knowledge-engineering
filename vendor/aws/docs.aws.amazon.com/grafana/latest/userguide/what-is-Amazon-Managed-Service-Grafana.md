

# What is Amazon Managed Grafana?
<a name="what-is-Amazon-Managed-Service-Grafana"></a>

Amazon Managed Grafana is a fully managed and secure data visualization service that you can use to instantly query, correlate, and visualize operational metrics, logs, and traces from multiple sources. Amazon Managed Grafana makes it easy to deploy, operate, and scale Grafana, a widely deployed data visualization tool that is popular for its extensible data support.

With Amazon Managed Grafana, you create logically isolated Grafana servers called *workspaces*. Then, you can create Grafana dashboards and visualizations to analyze your metrics, logs, and traces without having to build, package, or deploy any hardware to run your Grafana servers.

Amazon Managed Grafana manages the provisioning, setup, scaling, and maintenance of your logical Grafana servers so that you don't have to do these tasks yourself. Amazon Managed Grafana also provides built-in security features for compliance with corporate governance requirements, including single sign-on, data access control, and audit reporting.

Amazon Managed Grafana is integrated with AWS data sources that collect operational data, such as Amazon CloudWatch, Amazon OpenSearch Service, AWS X-Ray, AWS IoT SiteWise, Amazon Timestream, and Amazon Managed Service for Prometheus. Amazon Managed Grafana includes a permission provisioning feature for adding supported AWS services as data sources. Amazon Managed Grafana also supports many popular open-source, third-party, and other cloud data sources.

For user authentication and authorization, Amazon Managed Grafana can integrate with identity providers (IdPs) that support SAML 2.0 and also can integrate with AWS IAM Identity Center.

Amazon Managed Grafana is priced per active user in a workspace. For information about pricing, see [Amazon Managed Grafana Pricing](https://aws.amazon.com/grafana/pricing).

## Supported Regions
<a name="AMG-supported-Regions"></a>

Amazon Managed Grafana currently supports the following Regions:


| Region Name | Region | Endpoint | Protocol | 
| --- | --- | --- | --- | 
| US East (Ohio) | us-east-2 |  grafana.us-east-2.amazonaws.com <br /> grafana.us-east-2.api.aws  | HTTPS<br />HTTPS | 
| US East (N. Virginia) | us-east-1 |  grafana.us-east-1.amazonaws.com <br /> grafana.us-east-1.api.aws  | HTTPS<br />HTTPS | 
| US West (Oregon) | us-west-2 |  grafana.us-west-2.amazonaws.com <br /> grafana.us-west-2.api.aws  | HTTPS<br />HTTPS | 
| Asia Pacific (Seoul) | ap-northeast-2 |  grafana.ap-northeast-2.amazonaws.com <br /> grafana.ap-northeast-2.api.aws  | HTTPS<br />HTTPS | 
| Asia Pacific (Singapore) | ap-southeast-1 |  grafana.ap-southeast-1.amazonaws.com <br /> grafana.ap-southeast-1.api.aws  | HTTPS<br />HTTPS | 
| Asia Pacific (Sydney) | ap-southeast-2 |  grafana.ap-southeast-2.amazonaws.com <br /> grafana.ap-southeast-2.api.aws  | HTTPS<br />HTTPS | 
| Asia Pacific (Tokyo) | ap-northeast-1 |  grafana.ap-northeast-1.amazonaws.com <br /> grafana.ap-northeast-1.api.aws  | HTTPS<br />HTTPS | 
| Europe (Frankfurt) | eu-central-1 |  grafana.eu-central-1.amazonaws.com <br /> grafana.eu-central-1.api.aws  | HTTPS<br />HTTPS | 
| Europe (Ireland) | eu-west-1 |  grafana.eu-west-1.amazonaws.com <br /> grafana.eu-west-1.api.aws  | HTTPS<br />HTTPS | 
| Europe (London) | eu-west-2 |  grafana.eu-west-2.amazonaws.com <br /> grafana.eu-west-2.api.aws  | HTTPS<br />HTTPS | 
|  AWS GovCloud (US-East) | us-gov-east-1 |  grafana.us-gov-east-1.amazonaws.com <br /> grafana-fips.us-gov-east-1.api.aws <br /> grafana-fips.us-gov-east-1.amazonaws.com <br /> grafana.us-gov-east-1.api.aws  | HTTPS<br />HTTPS<br />HTTPS<br />HTTPS | 
|  AWS GovCloud (US-West) | us-gov-west-1 |  grafana.us-gov-west-1.amazonaws.com <br /> grafana-fips.us-gov-west-1.api.aws <br /> grafana-fips.us-gov-west-1.amazonaws.com <br /> grafana.us-gov-west-1.api.aws  | HTTPS<br />HTTPS<br />HTTPS<br />HTTPS | 