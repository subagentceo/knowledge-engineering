

# What is Amazon EMR on EKS?
<a name="emr-eks"></a>

Amazon EMR on EKS provides a deployment option for Amazon EMR that allows you to run open-source big data frameworks on Amazon Elastic Kubernetes Service (Amazon EKS). With this deployment option, you can focus on running analytics workloads while Amazon EMR on EKS builds, configures, and manages containers for open-source applications.

If you already use Amazon EMR, you can now run Amazon EMR based applications with other types of applications on the same Amazon EKS cluster. This deployment option also improves resource utilization and simplifies infrastructure management across multiple Availability Zones. If you already run big data frameworks on Amazon EKS, you can now use Amazon EMR to automate provisioning and management, and run Apache Spark more quickly.

Amazon EMR on EKS enables your team to collaborate more efficiently and process vast amounts of data more easily and cost-effectively:
+ You can run applications on a common pool of resources without having to provision infrastructure. You can use [Amazon EMR Studio](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-studio.html) and the AWS SDK or AWS CLI to develop, submit, and diagnose analytics applications running on EKS clusters. You can run scheduled jobs on Amazon EMR on EKS using self-managed Apache Airflow or Amazon Managed Workflows for Apache Airflow (MWAA).
+ Infrastructure teams can centrally manage a common computing platform to consolidate Amazon EMR workloads with other container-based applications. You can simplify infrastructure management with common Amazon EKS tools and take advantage of a shared cluster for workloads that need different versions of open-source frameworks. You can also reduce operational overhead with automated Kubernetes cluster management and OS patching. With Amazon EC2 and AWS Fargate, you can enable multiple compute resources to meet performance, operational, or financial requirements.

The following diagram shows the two different deployment models for Amazon EMR.

![Amazon EMR deployment options](http://docs.aws.amazon.com/emr/latest/EMR-on-EKS-DevelopmentGuide/images/emr-on-eks-deployment.png)


**Topics**
+ [Architecture for Amazon EMR on EKS](emr-eks-overview.md)
+ [Understanding Amazon EMR on EKS concepts and terminology](emr-eks-concepts.md)
+ [What happens when you submit work to an Amazon EMR on EKS virtual cluster](emr-eks-how.md)