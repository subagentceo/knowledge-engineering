

# Welcome
<a name="Welcome"></a>

 AWS CloudFormation allows you to create and manage AWS infrastructure deployments predictably and repeatedly. You can use CloudFormation to leverage AWS products, such as Amazon Elastic Compute Cloud, Amazon Elastic Block Store, Amazon Simple Notification Service, Elastic Load Balancing, and Amazon EC2 Auto Scaling to build highly reliable, highly scalable, cost-effective applications without creating or configuring the underlying AWS infrastructure.

With CloudFormation, you declare all your resources and dependencies in a template file. The template defines a collection of resources as a single unit called a stack. CloudFormation creates and deletes all member resources of the stack together and manages all dependencies between the resources for you.

For more information about CloudFormation, see the [AWS CloudFormation product page](http://aws.amazon.com/cloudformation/).

CloudFormation makes use of other AWS products. If you need additional technical information about a specific AWS product, you can find the product's technical documentation at [docs.aws.amazon.com](https://docs.aws.amazon.com/).

 **Stack actions**   
When you use CloudFormation, you manage related resources as a single unit called a stack. You create, update, and delete a collection of resources by creating, updating, and deleting stacks. All the resources in a stack are defined by the stack's template.  
 [CancelUpdateStack](API_CancelUpdateStack.md) \| [ContinueUpdateRollback](API_ContinueUpdateRollback.md) \| [CreateStack](API_CreateStack.md) \| [DeleteStack](API_DeleteStack.md) \| [DescribeStacks](API_DescribeStacks.md) \| [ListStacks](API_ListStacks.md) \| [RollbackStack](API_RollbackStack.md) \| [UpdateStack](API_UpdateStack.md)   
Stack events: [DescribeStackEvents](API_DescribeStackEvents.md)   
Stack resources: [DescribeStackResource](API_DescribeStackResource.md) \| [DescribeStackResources](API_DescribeStackResources.md) \| [ListStackResources](API_ListStackResources.md)   
Stack drift: [DescribeStackDriftDetectionStatus](API_DescribeStackDriftDetectionStatus.md) \| [DescribeStackResourceDrifts](API_DescribeStackResourceDrifts.md) \| [DetectStackDrift](API_DetectStackDrift.md) \| [DetectStackResourceDrift](API_DetectStackResourceDrift.md)   
Stack operations: [ListExports](API_ListExports.md) \| [ListImports](API_ListImports.md) \| [SignalResource](API_SignalResource.md) \| [UpdateTerminationProtection](API_UpdateTerminationProtection.md)   
Stack policies: [GetStackPolicy](API_GetStackPolicy.md) \| [SetStackPolicy](API_SetStackPolicy.md)   
Templates: [GetTemplate](API_GetTemplate.md) \| [GetTemplateSummary](API_GetTemplateSummary.md) \| [ValidateTemplate](API_ValidateTemplate.md) 

 **Change set actions**   
If you need to make changes to the running resources in a stack, you update the stack. Before making changes to your resources, you can generate a change set, which is summary of your proposed changes. Change sets allow you to see how your changes might impact your running resources, especially for critical resources, before implementing them.  
 [CreateChangeSet](API_CreateChangeSet.md) \| [DeleteChangeSet](API_DeleteChangeSet.md) \| [DescribeChangeSet](API_DescribeChangeSet.md) \| [DescribeChangeSetHooks](API_DescribeChangeSetHooks.md) \| [ExecuteChangeSet](API_ExecuteChangeSet.md) \| [ListChangeSets](API_ListChangeSets.md) 

 **StackSets actions**   
CloudFormation StackSets lets you create a collection, or *stack set*, of stacks that can automatically and safely provision a common set of AWS resources across multiple AWS accounts and multiple AWS Regions from a single CloudFormation template. When you create a StackSet, CloudFormation provisions a stack in each of the specified accounts and AWS Regions by using the supplied CloudFormation template and parameters. Stack sets let you manage a common set of AWS resources in a selection of accounts and AWS Regions in a single operation.  
 [CreateStackSet](API_CreateStackSet.md) \| [DeleteStackSet](API_DeleteStackSet.md) \| [DescribeStackSet](API_DescribeStackSet.md) \| [ListStackSets](API_ListStackSets.md) \| [UpdateStackSet](API_UpdateStackSet.md)   
Stack instances: [CreateStackInstances](API_CreateStackInstances.md) \| [DeleteStackInstances](API_DeleteStackInstances.md) \| [DescribeStackInstance](API_DescribeStackInstance.md) \| [ListStackInstances](API_ListStackInstances.md)   
StackSet operations: [DescribeStackSetOperation](API_DescribeStackSetOperation.md) \| [ListStackSetOperations](API_ListStackSetOperations.md) \| [ListStackSetOperationResults](API_ListStackSetOperationResults.md) \| [StopStackSetOperation](API_StopStackSetOperation.md) 

 **IaC Generator actions**   
Use CloudFormation IaC generator to scan your existing AWS resources and generate CloudFormation templates from them.  
For more information, see [Generating templates from existing resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/generate-IaC.html) in the * AWS CloudFormation User Guide*.  
Generated templates: [CreateGeneratedTemplate](API_CreateGeneratedTemplate.md) \| [DeleteGeneratedTemplate](API_DeleteGeneratedTemplate.md) \| [DescribeGeneratedTemplate](API_DescribeGeneratedTemplate.md) \| [GetGeneratedTemplate](API_GetGeneratedTemplate.md) \| [ListGeneratedTemplates](API_ListGeneratedTemplates.md) \| [UpdateGeneratedTemplate](API_UpdateGeneratedTemplate.md)   
Resource scanning: [DescribeResourceScan](API_DescribeResourceScan.md) \| [ListResourceScans](API_ListResourceScans.md) \| [ListResourceScanRelatedResources](API_ListResourceScanRelatedResources.md) \| [ListResourceScanResources](API_ListResourceScanResources.md) \| [StartResourceScan](API_StartResourceScan.md) 

 **Stack refactoring actions**   
Use CloudFormation stack refactoring to move resources between stacks or reorganize your stack architecture.  
For more information, see [Refactoring stacks](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stack-refactoring.html) in the * AWS CloudFormation User Guide*.  
 [CreateStackRefactor](API_CreateStackRefactor.md) \| [DescribeStackRefactor](API_DescribeStackRefactor.md) \| [ExecuteStackRefactor](API_ExecuteStackRefactor.md) \| [ListStackRefactors](API_ListStackRefactors.md) \| [ListStackRefactorActions](API_ListStackRefactorActions.md) 

 **CloudFormation registry actions**   
The CloudFormation registry serves as a centralized hub for managing extensions that can be used with CloudFormation templates, including CloudFormation Hooks, resource types, and modules.  
For more information, see [Managing extensions with the CloudFormation registry](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html) in the * AWS CloudFormation User Guide*.  
Discover and activate: [ActivateType](API_ActivateType.md) \| [DeactivateType](API_DeactivateType.md) \| [DescribeType](API_DescribeType.md) \| [ListTypes](API_ListTypes.md)   
Configure: [BatchDescribeTypeConfigurations](API_BatchDescribeTypeConfigurations.md) \| [SetTypeConfiguration](API_SetTypeConfiguration.md)   
Manage versions: [ListTypeVersions](API_ListTypeVersions.md) \| [SetTypeDefaultVersion](API_SetTypeDefaultVersion.md)   
Monitor results: [GetHookResult](API_GetHookResult.md) \| [ListHookResults](API_ListHookResults.md)   
Register privately: [DescribeTypeRegistration](API_DescribeTypeRegistration.md) \| [DeregisterType](API_DeregisterType.md) \| [ListTypeRegistrations](API_ListTypeRegistrations.md) \| [RegisterType](API_RegisterType.md)   
Publish: [DescribePublisher](API_DescribePublisher.md) \| [PublishType](API_PublishType.md) \| [RegisterPublisher](API_RegisterPublisher.md) \| [TestType](API_TestType.md) 

This document was last published on June 17, 2026. 