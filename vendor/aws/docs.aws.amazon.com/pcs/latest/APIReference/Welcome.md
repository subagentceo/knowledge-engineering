

# Welcome
<a name="Welcome"></a>

 AWS Parallel Computing Service (AWS PCS) is a managed service that makes it easier for you to run and scale your high performance computing (HPC) workloads, and build scientific and engineering models on AWS using Slurm. For more information, see the [AWS Parallel Computing Service User Guide](https://docs.aws.amazon.com/pcs/latest/userguide).

This reference describes the actions and data types of the service management API. You can use the AWS SDKs to call the API actions in software, or use the AWS Command Line Interface (AWS CLI) to call the API actions manually. These API actions manage the service through an AWS account.

The API actions operate on AWS PCS resources. A *resource* is an entity in AWS that you can work with. AWS services create resources when you use the features of the service. Examples of AWS PCS resources include clusters, compute node groups, and queues. For more information about resources in AWS, see [Resource](https://docs.aws.amazon.com/resource-explorer/latest/userguide/getting-started-terms-and-concepts.html#term-resource) in the * AWS Resource Explorer User Guide*. 

An AWS PCS *compute node* is an Amazon EC2 instance. You don't launch compute nodes directly. AWS PCS uses configuration information that you provide to launch compute nodes in your AWS account. You receive billing charges for your running compute nodes. AWS PCS automatically terminates your compute nodes when you delete the AWS PCS resources related to those compute nodes.

This document was last published on June 17, 2026. 