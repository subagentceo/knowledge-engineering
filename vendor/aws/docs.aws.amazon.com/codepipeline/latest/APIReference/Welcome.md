

# Welcome
<a name="Welcome"></a>

 **Overview** 

This is the AWS CodePipeline API Reference. This guide provides descriptions of the actions and data types for CodePipeline. Some functionality for your pipeline can only be configured through the API. For more information, see the [AWS CodePipeline User Guide](https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html).

You can use the AWS CodePipeline API to work with pipelines, stages, actions, and transitions.

 *Pipelines* are models of automated release processes. Each pipeline is uniquely named, and consists of stages, actions, and transitions. 

You can work with pipelines by calling:
+  [CreatePipeline](API_CreatePipeline.md), which creates a uniquely named pipeline.
+  [DeletePipeline](API_DeletePipeline.md), which deletes the specified pipeline.
+  [GetPipeline](API_GetPipeline.md), which returns information about the pipeline structure and pipeline metadata, including the pipeline Amazon Resource Name (ARN).
+  [GetPipelineExecution](API_GetPipelineExecution.md), which returns information about a specific execution of a pipeline.
+  [GetPipelineState](API_GetPipelineState.md), which returns information about the current state of the stages and actions of a pipeline.
+  [ListActionExecutions](API_ListActionExecutions.md), which returns action-level details for past executions. The details include full stage and action-level details, including individual action duration, status, any errors that occurred during the execution, and input and output artifact location details.
+  [ListPipelines](API_ListPipelines.md), which gets a summary of all of the pipelines associated with your account.
+  [ListPipelineExecutions](API_ListPipelineExecutions.md), which gets a summary of the most recent executions for a pipeline.
+  [StartPipelineExecution](API_StartPipelineExecution.md), which runs the most recent revision of an artifact through the pipeline.
+  [StopPipelineExecution](API_StopPipelineExecution.md), which stops the specified pipeline execution from continuing through the pipeline.
+  [UpdatePipeline](API_UpdatePipeline.md), which updates a pipeline with edits or changes to the structure of the pipeline.

Pipelines include *stages*. Each stage contains one or more actions that must complete before the next stage begins. A stage results in success or failure. If a stage fails, the pipeline stops at that stage and remains stopped until either a new version of an artifact appears in the source location, or a user takes action to rerun the most recent artifact through the pipeline. You can call [GetPipelineState](API_GetPipelineState.md), which displays the status of a pipeline, including the status of stages in the pipeline, or [GetPipeline](API_GetPipeline.md), which returns the entire structure of the pipeline, including the stages of that pipeline. For more information about the structure of stages and actions, see [AWS CodePipeline Pipeline Structure Reference](https://docs.aws.amazon.com/codepipeline/latest/userguide/pipeline-structure.html).

Pipeline stages include *actions* that are categorized into categories such as source or build actions performed in a stage of a pipeline. For example, you can use a source action to import artifacts into a pipeline from a source such as Amazon S3. Like stages, you do not work with actions directly in most cases, but you do define and interact with actions when working with pipeline operations such as [CreatePipeline](API_CreatePipeline.md) and [GetPipelineState](API_GetPipelineState.md). Valid action categories are:
+ Source
+ Build
+ Test
+ Deploy
+ Approval
+ Invoke
+ Compute

Pipelines also include *transitions*, which allow the transition of artifacts from one stage to the next in a pipeline after the actions in one stage complete.

You can work with transitions by calling:
+  [DisableStageTransition](API_DisableStageTransition.md), which prevents artifacts from transitioning to the next stage in a pipeline.
+  [EnableStageTransition](API_EnableStageTransition.md), which enables transition of artifacts between stages in a pipeline. 

 **Using the API to integrate with AWS CodePipeline ** 

For third-party integrators or developers who want to create their own integrations with CodePipeline, the expected sequence varies from the standard API user. To integrate with CodePipeline, developers need to work with the following items:

 **Jobs**, which are instances of an action. For example, a job for a source action might import a revision of an artifact from a source. 

You can work with jobs by calling:
+  [AcknowledgeJob](API_AcknowledgeJob.md), which confirms whether a job worker has received the specified job.
+  [GetJobDetails](API_GetJobDetails.md), which returns the details of a job.
+  [PollForJobs](API_PollForJobs.md), which determines whether there are any jobs to act on.
+  [PutJobFailureResult](API_PutJobFailureResult.md), which provides details of a job failure. 
+  [PutJobSuccessResult](API_PutJobSuccessResult.md), which provides details of a job success.

 **Third party jobs**, which are instances of an action created by a partner action and integrated into CodePipeline. Partner actions are created by members of the AWS Partner Network.

You can work with third party jobs by calling:
+  [AcknowledgeThirdPartyJob](API_AcknowledgeThirdPartyJob.md), which confirms whether a job worker has received the specified job.
+  [GetThirdPartyJobDetails](API_GetThirdPartyJobDetails.md), which requests the details of a job for a partner action.
+  [PollForThirdPartyJobs](API_PollForThirdPartyJobs.md), which determines whether there are any jobs to act on. 
+  [PutThirdPartyJobFailureResult](API_PutThirdPartyJobFailureResult.md), which provides details of a job failure.
+  [PutThirdPartyJobSuccessResult](API_PutThirdPartyJobSuccessResult.md), which provides details of a job success.

This document was last published on June 17, 2026. 