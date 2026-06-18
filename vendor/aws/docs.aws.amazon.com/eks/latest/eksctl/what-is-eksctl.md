

# What is Eksctl?
<a name="what-is-eksctl"></a>

eksctl is a command-line utility tool that automates and simplifies the process of creating, managing, and operating Amazon Elastic Kubernetes Service (Amazon EKS) clusters. Written in Go, eksctl provides a declarative syntax through YAML configurations and CLI commands to handle complex EKS cluster operations that would otherwise require multiple manual steps across different AWS services.

eksctl is particularly valuable for DevOps engineers, platform teams, and Kubernetes administrators who need to consistently deploy and manage EKS clusters at scale. It’s especially useful for organizations transitioning from self-managed Kubernetes to EKS, or those implementing infrastructure as code (IaC) practices, as it can be integrated into existing CI/CD pipelines and automation workflows. The tool abstracts away many of the complex interactions between AWS services required for EKS cluster setup, such as VPC configuration, IAM role creation, and security group management.

Key features of eksctl include the ability to create fully functional EKS clusters with a single command, support for custom networking configurations, automated node group management, and GitOps workflow integration. The tool manages cluster upgrades, scales node groups, and handles add-on management through a declarative approach. eksctl also provides advanced capabilities such as Fargate profile configuration, managed node group customization, and spot instance integration, while maintaining compatibility with other AWS tools and services through native AWS SDK integration.

## Features
<a name="_features"></a>

The features that are currently implemented are:
+ Create, get, list and delete clusters
+ Create, drain and delete nodegroups
+ Scale a nodegroup
+ Update a cluster
+ Use custom AMIs
+ Configure VPC Networking
+ Configure access to API endpoints
+ Support for GPU nodegroups
+ Spot instances and mixed instances
+ IAM Management and Add-on Policies
+ List cluster Cloudformation stacks
+ Install coredns
+ Write kubeconfig file for a cluster