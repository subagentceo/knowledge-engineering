

# What are CloudFormation Hooks?
<a name="what-is-cloudformation-hooks"></a>

CloudFormation Hooks is a feature that helps ensure that your CloudFormation resources, stacks, and change sets comply with your organization's security, operational, and cost optimization best practices. CloudFormation Hooks can also ensure this same level of compliance for your AWS Cloud Control API resources. With CloudFormation Hooks, you can provide code that proactively inspects the configuration of your AWS resources before provisioning. If non-compliant resources are found, CloudFormation either fails the operation and prevents the resources from being provisioned or emits a warning and allows the provisioning operation to continue.

You can use Hooks to enforce a variety of requirements and guidelines. For example, a security-related Hook can verify that security groups have appropriate inbound and outbound traffic rules for your [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html). A cost-related Hook can restrict development environments to use only smaller [Amazon EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) instance types. A Hook designed for data availability can enforce automatic backups for [Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html).

## Hook implementation options
<a name="hook-implementation-options"></a>

CloudFormation provides multiple options for implementing Hooks, giving you flexibility to choose the approach that best suits your needs.

### AWS Control Tower proactive controls
<a name="hook-control-tower-proactive-controls"></a>

The AWS Control Tower Control Catalog offers standardized proactive controls that you can implement as Hooks. This approach saves setup time and helps you validate resource configurations against AWS best practices across your organization without writing code.

### Guard rules
<a name="hook-guard-hooks"></a>

AWS CloudFormation Guard is a policy-as-code evaluation tool that provides a domain-specific language for writing custom evaluation logic for Hooks. This approach allows you to define compliance checks using Guard's declarative syntax, making it easy to create and maintain your evaluation logic without extensive programming knowledge.

### Lambda functions
<a name="hook-lambda-hooks"></a>

You can also implement Hooks using Lambda functions, allowing you to leverage the full power and flexibility of Lambda for your evaluation logic. You can use any Lambda-supported runtime language and integrate with other AWS services as needed.

### Custom Hooks
<a name="hook-custom-hooks"></a>

For advanced use cases, you can write your own evaluation logic using programming languages supported by the [CloudFormation CLI](https://docs.aws.amazon.com/cloudformation-cli/latest/userguide/what-is-cloudformation-cli.html). This approach provides maximum flexibility for implementing organization-specific governance requirements. As a supported extension type in the [CloudFormation registry](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html), your custom Hooks can be distributed and activated both publicly and privately. 