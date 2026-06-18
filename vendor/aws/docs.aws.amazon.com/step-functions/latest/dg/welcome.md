

# What is Step Functions?
<a name="welcome"></a>

**Managing state and transforming data**  
Learn about [Passing data between states with variables](workflow-variables.md) and [Transforming data with JSONata](transforming-data.md).

With AWS Step Functions, you can create workflows, also called [State machines](concepts-statemachines.md), to build distributed applications, automate processes, orchestrate microservices, and create data and machine learning pipelines.

Step Functions is based on *state machines* and *tasks*. In Step Functions, state machines are called *workflows*, which are a series of event-driven steps. Each step in a workflow is called a *state*. For example, a [Task state](state-task.md) represents a unit of work that another AWS service performs, such as calling another AWS service or API. Instances of running workflows performing tasks are called *executions* in Step Functions.

The work in your state machine tasks can also be done using [Activities](concepts-activities.md) which are workers that exist outside of Step Functions.

![Illustrative example of a Step Functions workflow diagram.](http://docs.aws.amazon.com/step-functions/latest/dg/images/step-functions-example.png)


In the Step Functions' console, you can **visualize**, edit, and debug your application’s workflow. You can examine the state of each step in your workflow to make sure that your application runs in order and as expected. 

Depending on your use case, you can have Step Functions call AWS services, such as Lambda, to perform tasks. You can have Step Functions control AWS services, such as AWS Glue, to create extract, transform, and load workflows. You also can create long-running, automated workflows for applications that require human interaction. 

For a complete list of AWS Regions where Step Functions is available, see the [AWS Region Table](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

**Learn how to use Step Functions**  
Start with the [Getting started tutorial](getting-started.md) in this guide. For advanced topics and use cases, see the modules in [The Step Functions Workshop](https://catalog.workshops.aws/stepfunctions).

## Standard and Express workflows types
<a name="welcome-workflows"></a>

Step Functions has two workflow types: 
+ **Standard** workflows are ideal for long-running, auditable workflows, as they show execution history and visual debugging. 

  Standard workflows have **exactly-once** workflow execution and can run for up to **one year**. This means that each step in a Standard workflow will execute exactly once. 
+ **Express** workflows are ideal for high-event-rate workloads, such as streaming data processing and IoT data ingestion.

  Express workflows have **at-least-once** workflow execution and can run for up to **five minutes**. This means that one or more steps in an Express Workflow can potentially run more than once, while each step in the workflow executes at least once.


| Standard workflows | Express workflows | 
| --- | --- | 
| 2,000 per second execution rate | 100,000 per second execution rate | 
| 4,000 per second state transition rate | Nearly unlimited state transition rate | 
| Priced by state transition | Priced by number and duration of executions | 
| Show execution history and visual debugging | Show execution history and visual debugging based on log level | 
| See execution history in Step Functions | Send execution history to [CloudWatch](https://aws.amazon.com/cloudwatch/) | 
| Support integrations with all services.Support optimized integrations with some services. | Support integrations with all services.  | 
| Support Request Response pattern for all services Support *Run a Job* and/or *Wait for Callback* patterns in specific services (see following section for details) | Support Request Response pattern for all services | 

For more information on Step Functions pricing and choosing workflow type, see the following:
+ [AWS Step Functions pricing](https://aws.amazon.com/step-functions/pricing/)
+ [Choosing workflow type in Step Functions](choosing-workflow-type.md)

## Integrating with other services
<a name="welcome-service-integrations"></a>

Step Functions integrates with multiple AWS services. To call other AWS services, you can use two integration types:
+ [AWS SDK integrations](supported-services-awssdk.md) provide a way to call any AWS service directly from your state machine, giving you access to thousands of API actions.
+ [Optimized integrations](integrate-optimized.md) provide custom options for using those services in your state machines.

To combine Step Functions with other services, there are three **service integration patterns**:
+  [Request Response (default)](connect-to-resource.md#connect-default) 

  Call a service, and let Step Functions progress to the next state after it gets an HTTP response.
+ [Run a job (.sync)](connect-to-resource.md#connect-sync)

  Call a service, and have Step Functions wait for a job to complete.
+ [Wait for a callback with a task token (.waitForTaskToken)](connect-to-resource.md#connect-wait-token)

  Call a service with a task token, and have Step Functions wait until the task token returns with a callback.

Standard Workflows and Express Workflows support the same **integrations** but not the same **integration patterns**. 
+  **Standard Workflows** support *Request Response* integrations. Certain services support *Run a Job (.sync)*, or *Wait for Callback (.waitForTaskToken)* , and both in some cases. See the following optimized integrations table for details. 
+  **Express Workflows** only support *Request Response* integrations. 

 To help decide between the two types, see [Choosing workflow type in Step Functions](choosing-workflow-type.md). 



**AWS SDK integrations in Step Functions**


| Integrated service | Request Response | Run a Job - *.sync* | Wait for Callback - *.waitForTaskToken* | 
| --- | --- | --- | --- | 
| [Over two hundred services](supported-services-awssdk.md#supported-services-awssdk-list) | Standard & Express | Not supported | Standard | 

**Optimized integrations in Step Functions**


| Integrated service | Request Response | Run a Job - *.sync* | Wait for Callback - *.waitForTaskToken* | 
| --- | --- | --- | --- | 
| [Amazon API Gateway](connect-api-gateway.md) | Standard & Express | Not supported | Standard | 
| [Amazon Athena](connect-athena.md) | Standard & Express | Standard | Not supported | 
| [AWS Batch](connect-batch.md) | Standard & Express | Standard | Not supported | 
| [Amazon Bedrock](connect-bedrock.md) | Standard & Express | Standard | Standard | 
| [Amazon Bedrock AgentCore](connect-bedrockagentcore.md) | Standard & Express | Not supported | Not supported | 
| [AWS CodeBuild](connect-codebuild.md) | Standard & Express | Standard | Not supported | 
| [Amazon DynamoDB](connect-ddb.md) | Standard & Express | Not supported | Not supported | 
| [Amazon ECS/Fargate](connect-ecs.md) | Standard & Express | Standard | Standard | 
| [Amazon EKS](connect-eks.md) | Standard & Express | Standard | Standard | 
| [Amazon EMR](connect-emr.md) | Standard & Express | Standard | Not supported | 
| [Amazon EMR on EKS](connect-emr-eks.md) | Standard & Express | Standard | Not supported | 
| [Amazon EMR Serverless](connect-emr-serverless.md) | Standard & Express | Standard | Not supported | 
| [Amazon EventBridge](connect-eventbridge.md) | Standard & Express | Not supported | Standard | 
| [AWS Glue](connect-glue.md) | Standard & Express | Standard | Not supported | 
| [AWS Glue DataBrew](connect-databrew.md) | Standard & Express | Standard | Not supported | 
| [AWS Lambda](connect-lambda.md) | Standard & Express | Not supported | Standard | 
| [AWS Elemental MediaConvert](connect-mediaconvert.md) | Standard & Express | Standard | Not supported | 
| [Amazon SageMaker AI](connect-sagemaker.md) | Standard & Express | Standard | Not supported | 
| [Amazon SNS](connect-sns.md) | Standard & Express | Not supported | Standard | 
| [Amazon SQS](connect-sqs.md) | Standard & Express | Not supported | Standard | 
| [AWS Step Functions](connect-stepfunctions.md) | Standard & Express | Standard | Standard | 

## Example use cases for workflows
<a name="application"></a>

Step Functions manages your application's components and logic, so you can write less code and focus on building and updating your application quickly. The following image shows six use cases for Step Functions workflows.

![Visual examples of six common workflow use cases, described in the following text.](http://docs.aws.amazon.com/step-functions/latest/dg/images/use-case-examples.png)




1. **Orchestrate tasks** – You can create workflows that orchestrate a series of tasks, or *steps*, in a specific order. For example, *Task A* might be a Lambda function which provides inputs for another Lambda function in *Task B*. The last step in your workflow provides the final result.

1. **Choose tasks based on data** – Using a `Choice` state, you can have Step Functions make decisions based on the state’s input. For example, imagine that a customer requests a credit limit increase. If the request is more than your customer’s pre-approved credit limit, you can have Step Functions send your customer's request to a manager for sign-off. If the request is less than your customer’s pre-approved credit limit, you can have Step Functions approve the request automatically.

1. **Error handling **(`Retry` / `Catch`) – You can retry failed tasks, or catch failed tasks and automatically run alternative steps.

   For example, after a customer requests a username, perhaps the first call to your validation service fails, so your workflow may retry the request. When the second request is successful, the workflow can proceed.

   Or, perhaps the customer requested a username that is invalid or unavailable, a `Catch` statement could lead to a Step Functions workflow step that suggests an alternative username.

   For examples of `Retry` and `Catch`, see [Handling errors in Step Functions workflows](concepts-error-handling.md).

1. **Human in the loop** – Step Functions can include human approval steps in the workflow. For example, imagine a banking customer attempts to send funds to a friend. With [a callback and a task token](connect-to-resource.md#connect-wait-token), you can have Step Functions wait until the customers friend confirms the transfer, and then Step Functions will continue the workflow to notify the banking customer that the transfer has completed.

   For an example, see [Create a callback pattern example with Amazon SQS, Amazon SNS, and Lambda](callback-task-sample-sqs.md). 

1. **Process data in parallel steps** – Using a `Parallel` state, Step Functions can process input data in parallel steps. For example, a customer might need to convert a video file into several display resolutions, so viewers can watch the video on multiple devices. Your workflow could send the original video file to several Lambda functions or use the optimized AWS Elemental MediaConvert integration to process a video into multiple display resolutions at the same time.

1. **Dynamically process data elements** – Using a `Map` state, Step Functions can run a set of workflow steps on each item in a dataset. The iterations run in parallel, which makes it possible to process a dataset quickly. For example, when your customer orders thirty items, your system needs to apply the same workflow to prepare each item for delivery. After all items have been gathered and packaged for delivery, the next step might be to quickly send your customer a confirmation email with tracking information.

   For an example **starter template**, see [Process data with a Map](sample-map-state.md).