

# What is AWS Local Zones?
<a name="what-is-aws-local-zones"></a>

AWS Local Zones places compute, storage, database, and other select AWS resources close to large population and industry centers. You can use Local Zones to provide your users with low-latency access to your applications.

## Why use AWS Local Zones?
<a name="why-use-lzs"></a>

Here are some reasons to use AWS Local Zones.
+ **Run low-latency applications at the edge** — Build and deploy applications close to end users to enable real-time gaming, live streaming, augmented and virtual reality (AR/VR), virtual workstations, and more.
+ **Simplify hybrid cloud migrations** — Migrate your applications to a nearby AWS Local Zone, while still meeting the low-latency requirements of hybrid deployment.
+ **Meet stringent data residency requirements** — Comply with state and local data residency requirements in sectors such as healthcare, financial services, iGaming, and government.

## Managing Local Zones
<a name="deploying-in-local-zones"></a>

You can manage your AWS resources in a Local Zone using the following options:
+ **AWS Management Console** — Provides a web interface that you can use to manage your Local Zones and create resources in your Local Zones.
+ **AWS Command Line Interface (AWS CLI)** — Provides commands for a broad set of AWS services, including Amazon VPC, and is supported on Windows, macOS, and Linux. The services that you use in Local Zones continue to use their own namespaces. For example, Amazon EC2 uses the "ec2" namespace, and Amazon EBS uses the "ebs" namespace. For more information, see [AWS Command Line Interface](https://aws.amazon.com/cli/).
+ **AWS SDKs** — Provides language-specific APIs and takes care of many of the connection details, such as calculating signatures, handling request retries, and handling errors. For more information, see [AWS SDKs](https://aws.amazon.com/developer/tools/).

## Pricing for AWS Local Zones
<a name="local-zones-pricing"></a>

There's no additional charge for enabling Local Zones. You pay only for the resources that you deploy in your Local Zones. AWS resources in Local Zones have different prices than they do in parent AWS Regions. For more information, see [AWS Local Zones pricing](https://aws.amazon.com/about-aws/global-infrastructure/localzones/pricing/).