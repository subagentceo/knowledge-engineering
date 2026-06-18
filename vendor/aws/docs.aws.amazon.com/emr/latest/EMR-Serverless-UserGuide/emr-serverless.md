

# What is Amazon EMR Serverless?
<a name="emr-serverless"></a>

Amazon EMR Serverless is a deployment option for Amazon EMR that provides a serverless runtime environment. This simplifies the operation of analytics applications that use the latest open-source frameworks, such as Apache Spark and Apache Hive. With EMR Serverless, you don’t have to configure, optimize, secure, or operate clusters to run applications with these frameworks.

EMR Serverless helps you avoid over- or under-provisioning resources for your data processing jobs. EMR Serverless automatically determines the resources that the application needs, gets these resources to process your jobs, and releases the resources when the jobs finish. For use cases where applications need a response within seconds, such as interactive data analysis, you can pre-initialize the resources that the application needs when you create the application.

With EMR Serverless, you continue to get the benefits of Amazon EMR, such as open source compatibility, concurrency, and optimized runtime performance for popular frameworks.

EMR Serverless is suitable for customers who want ease in operating applications using open source frameworks. It offers quick job startup, automatic capacity management, and straightforward cost controls.

## Concepts
<a name="concepts"></a>

In this section, we cover EMR Serverless terms and concepts that appear throughout our EMR Serverless User Guide.

### Release version
<a name="concepts-release-version"></a>

An Amazon EMR *release* is a set of open-source applications from the big data ecosystem. Each release includes different big data applications, components, and features that you select for EMR Serverless to deploy and configure so that they can run your applications. When you create an application, specify its release version. Choose the Amazon EMR release version and the open source framework version that you want to use in your application. To learn more about pre-release versions, refer to [Amazon EMR Serverless release versions](release-versions.md).

### Application
<a name="concepts-application"></a>

With EMR Serverless, you can create one or more EMR Serverless applications that use open source analytics frameworks. To create an application, specify the following attributes: 
+ The Amazon EMR release version for the open source framework version that you want to use. To determine your release version, refer to [Amazon EMR Serverless release versions](release-versions.md).
+ The specific runtime that you want your application to use, such as Apache Spark or Apache Hive.

After you create an application, submit data-processing jobs or interactive requests to your application.

Each EMR Serverless application runs on a secure Amazon Virtual Private Cloud (VPC) strictly apart from other applications. Additionally, use AWS Identity and Access Management (IAM) policies to define which users and roles can access the application. You can also specify limits to control and track usage costs incurred by the application. 

Consider creating multiple applications when you must do the following:
+ Use different open source frameworks
+ Use different versions of open source frameworks for different use cases
+ Perform A/B testing when upgrading from one version to another
+ Maintain separate logical environments for test and production scenarios
+ Provide separate logical environments for different teams with independent cost controls and usage tracking
+ Separate different line-of-business applications

EMR Serverless is a Regional service that simplifies how workloads run across multiple Availability Zones in a Region. To learn more about how to use applications with EMR Serverless, refer to [Interact with and configure an EMR Serverless application](applications.md).

### Job run
<a name="concepts-job-run"></a>

A *job run* is a request submitted to an EMR Serverless application that the application asychronously executes and tracks through completion. Examples of jobs include a HiveQL query that you submit to an Apache Hive application, or a PySpark data processing script that you submit to an Apache Spark application. When you submit a job, you must specify a runtime role, authored in IAM, that the job uses to access AWS resources, such as Amazon S3 objects. You can submit multiple job run requests to an application, and each job run can use a different runtime role to access AWS resources. An EMR Serverless application starts executing jobs as soon as it receives them and runs multiple job requests concurrently. To learn more about how EMR Serverless runs jobs, refer to [Running jobs](jobs.md).

### Workers
<a name="concepts-workers"></a>

An EMR Serverless application internally uses *workers* to execute your workloads. The default sizes of these workers are based on your application type and Amazon EMR release version. When you schedule a job run, override these sizes.

When you submit a job, EMR Serverless computes the resources that the application needs for the job and schedules workers. EMR Serverless breaks down your workloads into tasks, downloads images, provisions and sets up workers, and decommissions them when the job finishes. EMR Serverless automatically scales workers up or down based on the workload and parallelism required at every stage of the job. This automatic scaling removes the need for you to estimate the number of workers that the application needs to run your workloads.

### Pre-initialized capacity
<a name="concepts-preinitialized-workers"></a>

EMR Serverless provides a *pre-initialized capacity* feature that keeps workers initialized and ready to respond in seconds. This capacity effectively creates a warm pool of workers for an application. To configure this feature for each application, set the `initial-capacity` parameter of an application. When you configure pre-initialized capacity, jobs can start immediately so that you can implement iterative applications and time-sensitive jobs. To learn more about pre-initialized workers, refer to [Configuring an application when working with EMR Serverless](application-capacity.md).

### EMR Studio
<a name="concepts-studio"></a>

EMR Studio is the user console for managing your EMR Serverless applications. If an EMR Studio doesn't exist in your account when you create your first EMR Serverless application, we automatically create one for you. Access EMR Studio either from the Amazon EMR console, or turn on federated access from your identity provider (IdP) through IAM or IAM Identity Center. When you do this, users can access Studio and manage EMR Serverless applications without direct access to the Amazon EMR console. To learn more about how EMR Serverless applications works with EMR Studio, refer to [Creating an EMR Serverless application from the EMR Studio console](studio.md) and [Running jobs from the EMR Studio console](jobs-studio.md).