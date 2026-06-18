

# What is the AWS Serverless Application Model (AWS SAM)?
<a name="what-is-sam"></a>

AWS Serverless Application Model (AWS SAM) is an open-source framework for building serverless applications using infrastructure as code (IaC). With AWS SAM's shorthand syntax, developers declare [CloudFormation](https://aws.amazon.com/cloudformation) resources and specialized serverless resources that are transformed to infrastructure during deployment. When working with AWS SAM, you will interact with:

1. AWS SAM CLI - A command-line tool that helps you develop, locally test, and deploy your serverless applications.

1. AWS SAM Template - An extension of CloudFormation that provides simplified syntax for defining serverless resources.

When you use the **sam init** command, it creates a project directory, which we will refer to as the AWS SAM project, that typically includes your AWS SAM template, application code, and other configuration files.

## When to use AWS SAM
<a name="when-to-use-sam"></a>

AWS SAM is an ideal IaC solution for scenarios where you want simplified serverless development with the full power of CloudFormation. For example, you can use SAM for:
+ **Serverless applications:** You can use SAM to quickly define AWS Lambda functions, Lambda durable functions, Amazon API Gateway APIs, Amazon DynamoDB tables, and other serverless resources with minimal code.
+ **CloudFormation enhancement:** You can combine SAM with existing CloudFormation templates to add serverless components to traditional infrastructure. SAM resources work alongside standard CloudFormation resources in the same template.
+ **Local development and testing:** You can use the SAM CLI to test Lambda functions locally, simulate API Gateway endpoints, and debug serverless applications on your development machine before deploying to AWS.
+ **CI/CD for serverless:** You can build deployment pipelines using SAM templates that automatically generate the CloudFormation infrastructure needed for staging and production environments.
+ **Migration from console-created resources:** You can convert Lambda functions and API Gateway resources created in the AWS Management Console into infrastructure as code using SAM templates.

**Comparing AWS SAM with other IaC tools**
+ Use SAM instead of CloudFormation to simplify serverless resource definitions while maintaining template compatibility.
+ Use SAM instead of AWS CDK if you prefer a declarative approach to describing your infrastructure rather than a programmatic one.
+ Combine SAM with AWS CDK by using SAM CLI's local testing features to enhance your CDK applications.

## Key features
<a name="what-is-sam-feature"></a>

AWS SAM offers a variety of benefits that improve the developer experience by allowing you to: 

**Define your application infrastructure code quickly, using less code**  
Author AWS SAM templates to define your serverless application infrastructure code. Deploy your templates directly to CloudFormation to provision your resources.

**Manage your serverless applications through their entire development lifecycle**  
Use the AWS SAM CLI to manage your serverless application through the authoring, building, deploying, testing, and monitoring phases of your development lifecycle. For more information, see [AWS SAM CLI](using-sam-cli.md).

**Quickly provision permissions between resources with AWS SAM connectors**  
Use AWS SAM connectors in your AWS SAM templates to define permissions between your AWS resources. AWS SAM transforms your code into the IAM permissions required to facilitate your intent. For more information, see [Managing resource permissions with AWS SAM connectors](managing-permissions-connectors.md).

**Continuously sync local changes to the cloud as you develop**  
Use the AWS SAM CLI **sam sync** command to automatically sync local changes to the cloud, speeding up your development and cloud testing workflows. For more information, see [Introduction to using sam sync to sync to AWS Cloud](using-sam-cli-sync.md).

**Manage your Terraform serverless applications**  
Use the AWS SAM CLI to perform local debugging and testing of your Lambda functions and layers. For more information, see [AWS SAM CLI Terraform support](terraform-support.md).

## Related information
<a name="w2aab5c15"></a>
+ For information on how AWS SAM works, see [How AWS SAM works](what-is-sam-overview.md).
+ To start using AWS SAM, see [Getting started with AWS SAM](serverless-getting-started.md). 
+ For an overview on how you can use AWS SAM to create a serverless application, see [How to use AWS SAM](chapter-using-sam.md).