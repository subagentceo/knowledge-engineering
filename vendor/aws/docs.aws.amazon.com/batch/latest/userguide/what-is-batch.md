

# What is AWS Batch?
<a name="what-is-batch"></a>

AWS Batch helps you to run batch computing workloads on the AWS Cloud. Batch computing is a common way for developers, scientists, and engineers to access large amounts of compute resources. AWS Batch removes the undifferentiated heavy lifting of configuring and managing the required infrastructure, similar to traditional batch computing software. This service can efficiently provision resources in response to jobs submitted in order to eliminate capacity constraints, reduce compute costs, and deliver results quickly.

As a fully managed service, AWS Batch helps you to run batch computing workloads of any scale. AWS Batch automatically provisions compute resources and optimizes the workload distribution based on the quantity and scale of the workloads. With AWS Batch, there's no need to install or manage batch computing software, so you can focus your time on analyzing results and solving problems.

![Showing the layers of AWS Batch for workloads, orchestration, and capacity](http://docs.aws.amazon.com/batch/latest/userguide/images/batch-diagram.png)


AWS Batch provides all of the necessary functionality to run high-scale, compute-intensive workloads on top of AWS managed container orchestration services, Amazon ECS and Amazon EKS. AWS Batch is able to scale compute capacity on Amazon EC2 instances and Fargate resources.

AWS Batch provides a fully managed service for batch workloads, and delivers the operational capabilities to optimize these types of workloads for throughput, speed, resource efficiency, and cost. 

AWS Batch also enables SageMaker Training job queuing, allowing data scientists and ML engineers to submit Training jobs with priorities to configurable queues. This capability ensures that ML workloads run automatically as soon as resources become available, eliminating the need for manual coordination and improving resource utilization.

For machine learning workloads, AWS Batch provides queuing capabilities for SageMaker Training jobs. You can configure queues with specific policies to optimize cost, performance, and resource allocation for your ML Training workloads.

![Workflow diagram showing administrator setting up roles, data scientist creating service environment and job queue, submitting SageMaker training jobs, and monitoring jobs in both AWS Batch queue and SageMaker AI execution](http://docs.aws.amazon.com/batch/latest/userguide/images/Batch-SageMaker-Diagram-Light-Mode.png)


This provides a shared responsibility model where administrators set up the infrastructure and permissions, while data scientists can focus on submitting and monitoring their ML training workloads. Jobs are automatically queued and executed based on configured priorities and resource availability.

## Are you a first-time AWS Batch user?
<a name="first-time-user"></a>

If you are a first-time user of AWS Batch, we recommend that you begin by reading the following sections:
+ [Components of AWS Batch](batch_components.md)
+ [Create IAM account and administrative user](create-an-iam-account.md)
+ [Setting up AWS Batch](get-set-up-for-aws-batch.md)
+ [Getting started with AWS Batch tutorials](Batch_GetStarted.md)
+ [Getting started with AWS Batch on SageMaker AI](getting-started-sagemaker.md) 

## Related services
<a name="related-services"></a>

AWS Batch is a fully managed batch computing service that plans, schedules, and runs your containerized batch ML, simulation, and analytics workloads across the full range of AWS compute offerings, such as Amazon ECS, Amazon EKS, AWS Fargate, and Spot or On-Demand Instances. For more information about each managed compute service, see:
+ [Amazon EC2 *User Guide*](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)
+ [AWS Fargate* Developer Guide*](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html)
+ [Amazon EKS *User Guide*](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html)
+ [Amazon SageMaker AI* Developer Guide*](https://docs.aws.amazon.com/sagemaker/latest/dg/gs.htm)

## Accessing AWS Batch
<a name="acessing-servicename"></a>

You can access AWS Batch using the following:

**AWS Batch console**  
The web interface where you create and manage resources.

**AWS Command Line Interface**  
Interact with AWS services using commands in your command line shell. The AWS Command Line Interface is supported on Windows, macOS, and Linux. For more information about the AWS CLI, see [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/). You can find the AWS Batch commands in the [AWS CLI Command Reference](https://docs.aws.amazon.com/cli/latest/reference/).

**AWS SDKs**  
If you prefer to build applications using language-specific APIs instead of submitting a request over HTTP or HTTPS, use the libraries, sample code, tutorials, and other resources provided by AWS. These libraries provide basic functions that automate tasks, such as cryptographically signing your requests, retrying requests, and handling error responses. These functions make it more efficient for you to get started. For more information, see [Tools to Build on AWS](https://aws.amazon.com/developer/tools/).