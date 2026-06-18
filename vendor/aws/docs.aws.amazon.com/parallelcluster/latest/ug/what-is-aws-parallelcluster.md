

# What is AWS ParallelCluster
<a name="what-is-aws-parallelcluster"></a>

AWS ParallelCluster is an AWS supported, open source cluster management tool that helps you to deploy and manage High-Performance Computing (HPC) clusters in the AWS Cloud. It automatically sets up the required compute resources, scheduler, and shared file system. You can use AWS ParallelCluster with AWS Batch and Slurm schedulers.

With AWS ParallelCluster, you can quickly build and deploy proof of concept and production HPC compute environments. You can also build and deploy a high level workflow on top of AWS ParallelCluster, such as a genomics portal that automates an entire DNA sequencing workflow.

You can access AWS ParallelCluster using these methods:
+ [AWS ParallelCluster command line interface (CLI)](install-v3-parallelcluster.md)
+ [AWS ParallelCluster API](api-ref-v3.md)
+ [PCUI](install-pcui-v3.md) (added with release 3.5.0)
+ [AWS ParallelCluster Python library API](pc-py-library-v3.md) (added with release 3.5.0)
+ As an [AWS CloudFormation custom resource](cloudformation-v3.md) (added with release 3.6.0)

**Pricing**

When using the AWS ParallelCluster command line interface (CLI) or API, you only pay for the AWS resources that are created when you create or update AWS ParallelCluster images and clusters. For more information, see [AWS services used by AWS ParallelCluster](aws-services-v3.md).