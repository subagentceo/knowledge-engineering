

# What is Amazon Elastic Container Registry?
<a name="what-is-ecr"></a>

Amazon Elastic Container Registry (Amazon ECR) is an AWS managed container image registry service that is secure, scalable, and reliable. Amazon ECR supports private repositories with resource-based permissions using AWS IAM. This is so that specified users or Amazon EC2 instances can access your container repositories and images. You can use your preferred CLI to push, pull, and manage Docker images, Open Container Initiative (OCI) images, and OCI compatible artifacts.

**Note**  
Amazon ECR supports public container image repositories as well. For more information, see [What is Amazon ECR Public](https://docs.aws.amazon.com/AmazonECR/latest/public/what-is-ecr.html) in the *Amazon ECR Public User Guide*.

The AWS container services team maintains a public roadmap on GitHub. It contains information about what the teams are working on and allows all AWS customers the ability to give direct feedback. For more information, see [AWS Containers Roadmap](https://github.com/aws/containers-roadmap).

## Features of Amazon ECR
<a name="ecr-features"></a>

Amazon ECR provides the following features:
+ Lifecycle policies help with managing the lifecycle of the images in your repositories. You define rules that result in the cleaning up of unused images. You can test rules before applying them to your repository. For more information, see [Automate the cleanup of images by using lifecycle policies in Amazon ECR](LifecyclePolicies.md).
+ Image scanning helps in identifying software vulnerabilities in your container images. Each repository can be configured to **scan on push**. This ensures that each new image pushed to the repository is scanned. You can then retrieve the results of the image scan. For more information, see [Scan images for software vulnerabilities in Amazon ECR](image-scanning.md).
+ Cross-Region and cross-account replication makes it easier for you to have your images where you need them. This is configured as a registry setting and is on a per-Region basis. For more information, see [Private registry settings in Amazon ECR](registry-settings.md).
+ Pull through cache rules provide a way to cache repositories in an upstream registry in your private Amazon ECR registry. Using a pull through cache rule, Amazon ECR will periodically reach out to the upstream registry to ensure the cached image in your Amazon ECR private registry is up to date. For more information, see [Sync an upstream registry with an Amazon ECR private registry](pull-through-cache.md).
+ Repository creation templates allow you to define the settings for repositories created by Amazon ECR on your behalf during pull through cache, create on push, or replication actions. You can specify tag immutability, encryption configuration, repository policies, lifecycle policies, and resource tags for automatically created repositories. For more information, see [Templates to control repositories created during a pull through cache, create on push, or replication action](repository-creation-templates.md).
+ Managed signing automatically generates cryptographic signatures when images are pushed to Amazon ECR, simplifying container image signing. For more information, see [Managed signing](managed-signing.md).

## How to get started with Amazon ECR
<a name="ecr-get-started"></a>

If you are using Amazon Elastic Container Service (Amazon ECS) or Amazon Elastic Kubernetes Service (Amazon EKS), note that the setup for those two services is similar to the setup for Amazon ECR because Amazon ECR is an extension of both services.

When using the AWS Command Line Interface with Amazon ECR, use a version of the AWS CLI that supports the latest Amazon ECR features. If you don't see support for an Amazon ECR feature in the AWS CLI, upgrade to the latest version of the AWS CLI. For information about installing the latest version of the AWS CLI, see [Install or update to the latest version of the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) in the *AWS Command Line Interface User Guide*.

To learn how to push a container image to a private Amazon ECR repository using the AWS CLI and Docker, see [Moving an image through its lifecycle in Amazon ECR](getting-started-cli.md).

## Pricing for Amazon ECR
<a name="ecr-pricing"></a>

With Amazon ECR, you pay for the amount of data you store in your repositories, data transfer from your image pushes and pulls, and image actions that you opt in to such as image signing and replication. For more information, see [Amazon ECR pricing](https://aws.amazon.com/ecr/pricing/).