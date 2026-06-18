

# Overview
<a name="solution-overview"></a>

Publication date: January 2026.

DeepRacer on AWS is an educational ecosystem built around a fully autonomous 1/18th scale race car driven by reinforcement learning. With DeepRacer on AWS, you can train reinforcement learning models and evaluate their performance in the DeepRacer simulator. After training your models, you can compete in virtual races against other participants or download your trained models for deployment to your AWS DeepRacer vehicle, enabling autonomous driving in physical environments.

The solution leverages [Amazon SageMaker AI](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html) for reinforcement learning model training and offers you the following capabilities.
+ Deploy the necessary infrastructure including a console, simulation application used in the reinforcement learning training jobs.
+ Provides option to customize reward function for the reinforcement learning model to train.
+ Enables setting up and managing community races where custom models can be imported into the solution.
+ Provides option to download the trained models which can be utilized in custom autonomous vehicles.

This implementation guide describes architectural considerations and configuration steps for deploying DeepRacer on AWS in the AWS Cloud. It includes links to an [AWS CloudFormation](https://aws.amazon.com/cloudformation/) template that launches and configures the AWS services required to deploy this solution using AWS best practices for security and availability.

The intended audience for implementing the DeepRacer on AWS solution in their environment includes solution architects, business decision makers, DevOps engineers, data scientists, and cloud professionals.

Use this navigation table to quickly find answers to these questions:


| If you want to . . . | Read . . . | 
| --- | --- | 
| Know the cost for running this solution. |  [Cost](cost.md)  | 
| Understand the security considerations for this solution. |  [Security](security-1.md)  | 
| Know how to plan for quotas for this solution. |  [Quotas](quotas.md)  | 
| Know which AWS Regions support this solution. |  [Supported AWS Regions](plan-your-deployment.md#supported-aws-regions)  | 
| View or download the AWS CloudFormation template included in this solution to automatically deploy the infrastructure resources (the "stack") for this solution. |  [CloudFormation template](https://solutions-reference.s3.amazonaws.com/deepracer-on-aws/latest/deepracer-on-aws.template)  | 
| Access the source code. |  [GitHub repository](https://github.com/aws-solutions/deepracer-on-aws/)  | 

**Note**  
For a general reference of AWS terms, see the [AWS Glossary](https://docs.aws.amazon.com/general/latest/gr/glos-chap.html).