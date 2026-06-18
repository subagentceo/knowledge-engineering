

# What is Reachability Analyzer?
<a name="what-is-reachability-analyzer"></a>

Reachability Analyzer is a configuration analysis tool that enables you to perform connectivity testing between a source resource and a destination resource in your virtual private clouds (VPCs). When the destination is reachable, Reachability Analyzer produces hop-by-hop details of the virtual network path between the source and the destination. When the destination is not reachable, Reachability Analyzer identifies the blocking component. For example, paths can be blocked by configuration issues in a security group, network ACL, route table, or load balancer.

## Use cases
<a name="use-cases"></a>

You can use Reachability Analyzer to do the following:
+ Troubleshoot connectivity issues caused by network misconfiguration.
+ Verify that your network configuration matches your intended connectivity.
+ Automate the verification of your connectivity intent as your network configuration changes.

## Get started
<a name="learn-more"></a>

To learn more about Reachability Analyzer, see [How Reachability Analyzer works](how-reachability-analyzer-works.md). For step-by-step directions using the AWS Management Console, see [Getting started with Reachability Analyzer](getting-started.md). For example commands using the AWS Command Line Interface (AWS CLI), see [Getting started with Reachability Analyzer using the AWS CLI](getting-started-cli.md).

## Access Reachability Analyzer
<a name="accessing"></a>

You can use any of the following options to create and manage Reachability Analyzer resources:
+ **AWS Management Console** — A web interface for AWS services, including Reachability Analyzer.
+ **AWS Command Line Interface (AWS CLI)** — Provides commands for AWS services, including Reachability Analyzer. The AWS CLI is supported on Windows, macOS, and Linux. For more information, see the [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/).
+ **CloudFormation** — Enables you to create templates that describe your AWS resources. You use a template to provision and manage AWS resources as a single unit. For more information, see the following resources: [AWS::EC2::NetworkInsightsAnalysis](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkinsightsanalysis.html) and [AWS::EC2::NetworkInsightsPath](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkinsightspath.html).
+ **AWS SDKs** — Provide language-specific APIs and take care of many of the connection details, such as calculating signatures, handling request retries, and handling errors. For more information, see [AWS SDKs](https://aws.amazon.com/developer/tools/).
+ **Query API** — Provides low-level API actions that you call using HTTPS requests. Using the Query API is the most direct way to access Reachability Analyzer. However, the Query API requires that your application handle low-level details such as generating the hash to sign the request, and handling errors. For more information, see the [Amazon EC2 API Reference](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/).

## Pricing
<a name="pricing"></a>

You are charged per analysis run between a source and destination. For pricing details, open the [Amazon VPC Pricing](https://aws.amazon.com/vpc/pricing/) page, choose the **Network Analysis** tab, and find **Reachability Analyzer Pricing**.