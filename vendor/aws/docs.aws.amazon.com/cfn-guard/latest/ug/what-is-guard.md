

# What is AWS CloudFormation Guard?
<a name="what-is-guard"></a>

AWS CloudFormation Guard is an open-source, general-purpose, policy-as-code evaluation tool. The Guard command line interface (CLI) provides a simple-to-use and declarative domain-specific language (DSL) that you can use to express policy as code. In addition, you can use CLI commands to validate structured hierarchical JSON or YAML data against those rules. Guard also provides a built-in unit testing framework to verify that your rules work as intended.

Guard doesn't validate CloudFormation templates for valid syntax or allowed property values. You can use the [cfn-lint](https://github.com/aws-cloudformation/cfn-python-lint) tool to perform a thorough inspection of template structure.

Guard doesn’t provide server-side enforcement. You can use the CloudFormation Hooks to perform server-side validation and enforcement, where you can block or warn an operation.

For detailed information about AWS CloudFormation Guard development, refer to the [Guard GitHub repository](https://github.com/aws-cloudformation/cloudformation-guard/).

**Topics**
+ [Are you a first-time Guard user?](#first-time-user)
+ [Guard features](#cfn-guard-feature-overview)
+ [Using Guard with CloudFormation Hooks](#acessing-cfn-guard)
+ [Accessing Guard](#using-cfn-guard-hooks)
+ [Best practices](#best-practices)

## Are you a first-time Guard user?
<a name="first-time-user"></a>

If you're a first-time user of Guard, we recommend that you begin by reading the following sections:
+  [Setting up Guard](setting-up.md) – This section describes how to install Guard. With Guard, you can write policy rules using the Guard DSL and validate your JSON- or YAML-formatted structured data against those rules.
+  [Writing Guard rules](writing-rules.md) – This section provides detailed walkthroughs for writing policy rules.
+  [Testing Guard rules](testing-rules.md) – This section provides a detailed walkthrough for testing your rules to verify that they work as intended, and validating your JSON- or YAML-formatted structured data against your rules. 
+  [Validating input data against Guard rules](validating-rules.md) – This section provides a detailed walkthrough for validating your JSON- or YAML-formatted structured data against your rules. 
+  [Guard CLI reference](cfn-guard-command-reference.md) – This section describes the commands that are available in the Guard CLI. 

## Guard features
<a name="cfn-guard-feature-overview"></a>

Using Guard, you can write policy rules to validate any JSON- or YAML-formatted structured data against, including but not limited to CloudFormation templates. Guard supports the entire spectrum of end-to-end evaluation of policy checks. Rules are useful in the following business domains:
+ **Preventative governance and compliance (shift-left testing)** – Validate infrastructure as code (IaC) or infrastructure and service compositions against policy rules that represent your organizational best practices for security and compliance. For example, you can validate CloudFormation templates, CloudFormation change sets, JSON-based Terraform configuration files, or Kubernetes configurations.
+ **Detective governance and compliance** – Validate conformity of Configuration Management Database (CMDB) resources such as AWS Config-based configuration items (CIs). For example, developers can use Guard policies against AWS Config CIs to continuously monitor the state of deployed AWS and non-AWS resources, detect violations from policies, and start remediation.
+ **Deployment safety** – Ensure that changes are safe before deployment. For example, validate CloudFormation change sets against policy rules to prevent changes that result in resource replacement, such as renaming an Amazon DynamoDB table.

## Using Guard with CloudFormation Hooks
<a name="acessing-cfn-guard"></a>

You can use CloudFormation Guard to author a Hook in CloudFormation Hooks. CloudFormation Hooks allows you to proactively enforce your Guard rules before CloudFormation create, update, or delete operations and AWS Cloud Control API create or update operations. Hooks ensure your resource configurations are compliant with your organization's security, operational, and cost optimization best practices.

For details on how to use Guard to author CloudFormation Guard Hooks, see [Write Guard rules to evaluate resources for Guard Hooks](https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/guard-hooks-write-rules.html) in the *CloudFormation Hooks User Guide*.

## Accessing Guard
<a name="using-cfn-guard-hooks"></a>

To access the Guard DSL and commands, you must install the Guard CLI. For information about installing the Guard CLI, see [Setting up Guard](setting-up.md).

## Best practices
<a name="best-practices"></a>

Write simple rules, and use named rules to reference them in other rules. Complex rules can be difficult to maintain and test.