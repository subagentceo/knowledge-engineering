

# What is Network Access Analyzer?
<a name="what-is-network-access-analyzer"></a>

Network Access Analyzer is a feature that identifies unintended network access to your resources on AWS. You can use Network Access Analyzer to specify your network access requirements and to identify potential network paths that do not meet your specified requirements. You can use Network Access Analyzer to:
+ **Understand, verify, and improve your network security posture** – Network Access Analyzer helps you identify unintended network access relative to your security and compliance requirements, enabling you to take steps to improve your network security.
+ **Demonstrate compliance** – Network Access Analyzer helps you demonstrate that your network on AWS meets your compliance requirements.

Network Access Analyzer can help you verify the following example requirements:
+ **Network segmentation** – Verify that your production environment VPCs and development environment VPCs are isolated from one another. Likewise, you can verify that a separate logical network is used for systems that process credit card information, and that it's isolated from the rest of your environment.
+ **Internet accessibility** – Identify resources in your environment that can be accessed from internet gateways, and verify that they are limited to only those resources that have a legitimate need to be accessible from the internet.
+ **Trusted network paths** – Verify that you have appropriate network controls such as network firewalls and NAT gateways on all network paths between your resources and internet gateways.
+ **Trusted network access** – Verify that your resources have network access only from a trusted IP address range, over specific ports and protocols. You can specify your network access requirements in terms of:
  + Resource IDs (for example, `vpc-1234567890abcdef0`)
  + Resource types (for example, `AWS::EC2::InternetGateway`)
  + Resource tags
  + IP address ranges, port ranges, and traffic protocols

## Network Access Analyzer concepts
<a name="concepts"></a>

The following are the key concepts for Network Access Analyzer:

**Network Access Scopes**  
You can specify your network access requirements as Network Access Scopes, which determine the types of findings that the analysis produces. You add entries to **MatchPaths** to specify the types of network paths to identify. You add entries to **ExcludePaths** to specify the types of network paths to exclude.  
+ **MatchPaths** – Specifies the types of network paths that an analysis produces. Typically, you specify network paths that you consider to be a violation of your security or compliance requirements. For example, if you don't want to allow network paths that start in VPC A and end in VPC B, specify VPC A as a source and VPC B as a destination. When you analyze this Network Access Scope, you would see any findings that indicate any potential network paths that start in VPC A and end in VPC B.
+ **ExcludePaths** – Prevents certain network paths from appearing in your findings. Typically, you specify network paths that you consider to be a legitimate exception to your network security or compliance requirements. For example, to identify all network interfaces that are reachable from an internet gateway except for your web servers, specify the relevant paths using **MatchPaths**, and then exclude any path with your web servers as a destination using **ExcludePaths**. When you analyze this Network Access Scope, you would see any network paths that originate from an internet gateway and end at a network interface, except for any paths that end at your web servers.

**Findings**  
Findings are potential paths in your network that match any of the **MatchPaths** entries in your Network Access Scope, but do not match any of the **ExcludePaths** entries in your Network Access Scope.

## Access Network Access Analyzer
<a name="accessing"></a>

You can use any of the following interfaces to access and work with Network Access Analyzer:
+ **AWS Management Console** – Provides a web interface that you can use to create and manage Network Access Analyzer resources.
+ **AWS Command Line Interface (AWS CLI)** – Provides commands for AWS services including Network Access Analyzer. The AWS CLI is supported on Windows, macOS, and Linux. For more information, see the [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/).
+ **CloudFormation** – Create templates to provision and manage AWS resources as a single unit. For more information, see [AWS::EC2::NetworkInsightsAccessScope](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkinsightsaccessscope.html) and [AWS::EC2::NetworkInsightsAccessScopeAnalysis](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-networkinsightsaccessscopeanalysis.html).
+ **AWS SDKs** – Provides language-specific APIs and takes care of many of the connection details, such as calculating signatures, and handling request retries and errors. For more information, see [Tools to build on AWS](https://aws.amazon.com/developer/tools/).
+ **Query API** – Provides low-level API actions that you call using HTTPS requests. Using the Query API is the most direct way to access Network Access Analyzer. However, the Query API requires your application to handle low-level details such as generating the hash to sign the request and handling errors. For more information, see [Amazon VPC actions](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/OperationList-query-vpc.html) in the *Amazon EC2 API Reference*.

## Pricing
<a name="pricing"></a>

When you run a Network Access Analyzer analysis, you are charged based on the number of network interfaces that are analyzed. For more information, see [Pricing](https://aws.amazon.com/vpc/pricing/).