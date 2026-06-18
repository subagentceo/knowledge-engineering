

# Welcome
<a name="Welcome"></a>

 AWS Config provides a way to keep track of the configurations of all the AWS resources associated with your AWS account. You can use AWS Config to get the current and historical configurations of each AWS resource and also to get information about the relationship between the resources. An AWS resource can be an Amazon Compute Cloud (Amazon EC2) instance, an Elastic Block Store (EBS) volume, an elastic network Interface (ENI), or a security group. For a complete list of resources currently supported by AWS Config, see [Supported AWS resources](https://docs.aws.amazon.com/config/latest/developerguide/resource-config-reference.html#supported-resources).

You can access and manage AWS Config through the AWS Management Console, the AWS Command Line Interface (AWS CLI), the AWS Config API, or the AWS SDKs for AWS Config. This reference guide contains documentation for the AWS Config API and the AWS CLI commands that you can use to manage AWS Config. The AWS Config API uses the Signature Version 4 protocol for signing requests. For more information about how to sign a request with this protocol, see [Signature Version 4 Signing Process](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). For detailed information about AWS Config features and their associated actions or commands, as well as how to work with AWS Management Console, see [What Is AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html) in the * AWS Config Developer Guide*.

 **Configuration Recorder** 

Use the following APIs for the configuration recorder.

The following APIs can only be used for the customer managed configuration recorder:
+  [PutConfigurationRecorder](API_PutConfigurationRecorder.md), creates or updates the customer managed configuration recorder.
+  [StartConfigurationRecorder](API_StartConfigurationRecorder.md), starts the customer managed configuration recorder. The customer managed configuration recorder will begin recording configuration changes for the resource types you specify.
+  [StopConfigurationRecorder](API_StopConfigurationRecorder.md), stops the customer managed configuration recorder. The customer managed configuration recorder will stop recording configuration changes for the resource types you have specified.
+  [DeleteConfigurationRecorder](API_DeleteConfigurationRecorder.md), , deletes the customer managed configuration recorder.

The following APIs can only be used for service-linked configuration recorders:
+  [PutServiceLinkedConfigurationRecorder](API_PutServiceLinkedConfigurationRecorder.md), creates a service-linked configuration recorder.
+  [DeleteServiceLinkedConfigurationRecorder](API_DeleteServiceLinkedConfigurationRecorder.md), deletes an existing service-linked configuration recorder.

The following APIs can be used for both the customer managed configuration recorder and the service-linked configuration recorders:
+  [DescribeConfigurationRecorders](API_DescribeConfigurationRecorders.md), returns the details for the configuration recorders you specify.
+  [DescribeConfigurationRecorderStatus](API_DescribeConfigurationRecorderStatus.md), returns the current status of the configuration recorder you specify. 
+  [ListConfigurationRecorders](API_ListConfigurationRecorders.md), returns a list of configuration recording depending on the filters you specify.
+  [AssociateResourceTypes](API_AssociateResourceTypes.md), adds all the specified resource types to the recording group of the specified configuration recorder.
+  [DisassociateResourceTypes](API_DisassociateResourceTypes.md), removes all the specified resource types from the recording group of the specified configuration recorder.

 **Delivery Channel** 

Use the following APIs for the delivery channel:
+  [DeliverConfigSnapshot](API_DeliverConfigSnapshot.md), schedules delivery of a configuration snapshot to the Amazon S3 bucket in the specified delivery channel. 
+  [DescribeDeliveryChannels](API_DescribeDeliveryChannels.md), returns details about the specified delivery channel. 
+  [DescribeDeliveryChannelStatus](API_DescribeDeliveryChannelStatus.md), returns the current status of the specified delivery channel. 
+  [DeleteDeliveryChannel](API_DeleteDeliveryChannel.md), deletes the delivery channel.
+  [PutDeliveryChannel](API_PutDeliveryChannel.md), creates or updates a delivery channel to deliver configuration information and other compliance notifications. 

 **Resource Management** 

Use the following APIs for AWS Config resource management:
+  [BatchGetResourceConfig](API_BatchGetResourceConfig.md), returns the `BaseConfigurationItem` for one or more requested resources.
+  [DeleteResourceConfig](API_DeleteResourceConfig.md), records the configuration state for a custom resource that has been deleted. 
+  [DeleteRetentionConfiguration](API_DeleteRetentionConfiguration.md), deletes the retention configuration.
+  [DeliverConfigSnapshot](API_DeliverConfigSnapshot.md), schedules delivery of a configuration snapshot to the Amazon S3 bucket in the specified delivery channel. 
+  [DescribeRetentionConfigurations](API_DescribeRetentionConfigurations.md), returns the details of one or more retention configurations.
+  [GetDiscoveredResourceCounts](API_GetDiscoveredResourceCounts.md), returns the resource types, the number of each resource type, and the total number of resources that AWS Config is recording in this region for your AWS account. 
+  [GetResourceConfigHistory](API_GetResourceConfigHistory.md), returns a list of `ConfigurationItems` for the specified resource. 
+  [ListDiscoveredResources](API_ListDiscoveredResources.md), accepts a resource type and returns a list of resource identifiers for the resources of that type. 
+  [ListTagsForResource](API_ListTagsForResource.md), list the tags for AWS Config resource.
+  [PutResourceConfig](API_PutResourceConfig.md), records the configuration state for the resource provided in the request.
+  [PutRetentionConfiguration](API_PutRetentionConfiguration.md), creates and updates the retention configuration with details about retention period (number of days) that AWS Config stores your historical information.
+  [TagResource](API_TagResource.md), associates the specified tags to a resource with the specified `ResourceArn`.
+  [UntagResource](API_UntagResource.md), deletes specified tags from a resource.

 ** AWS Config rules** 

Use the following APIs for AWS Config rules:
+  [DeleteConfigRule](API_DeleteConfigRule.md), deletes the specified AWS Config rule and all of its evaluation results.
+  [DeleteEvaluationResults](API_DeleteEvaluationResults.md), deletes the evaluation results for the specified AWS Config rule. 
+  [DeleteOrganizationConfigRule](API_DeleteOrganizationConfigRule.md), deletes the specified organization AWS Config rule and all of its evaluation results from all member accounts in that organization. 
+  [DescribeComplianceByConfigRule](API_DescribeComplianceByConfigRule.md), indicates whether the specified AWS Config rules are compliant.
+  [DescribeComplianceByResource](API_DescribeComplianceByResource.md), indicates whether the specified AWS resources are compliant. 
+  [DescribeConfigRuleEvaluationStatus](API_DescribeConfigRuleEvaluationStatus.md), returns status information for each of your AWS Config managed rules. 
+  [DescribeConfigRules](API_DescribeConfigRules.md), returns details about your AWS Config rules.
+  [DescribeOrganizationConfigRules](API_DescribeOrganizationConfigRules.md), returns a list of organization AWS Config rules.
+  [DescribeOrganizationConfigRuleStatuses](API_DescribeOrganizationConfigRuleStatuses.md), provides organization AWS Config rule deployment status for an organization.
+  [GetComplianceDetailsByConfigRule](API_GetComplianceDetailsByConfigRule.md), returns the evaluation results for the specified AWS Config rule.
+  [GetComplianceDetailsByResource](API_GetComplianceDetailsByResource.md), returns the evaluation results for the specified AWS resource.
+  [GetComplianceSummaryByConfigRule](API_GetComplianceSummaryByConfigRule.md), returns the number of AWS Config rules that are compliant and noncompliant, up to a maximum of 25 for each. 
+  [GetComplianceSummaryByResourceType](API_GetComplianceSummaryByResourceType.md), returns the number of resources that are compliant and the number that are noncompliant. 
+  [GetCustomRulePolicy](API_GetCustomRulePolicy.md), returns the policy definition containing the logic for your AWS Config Custom Policy rule.
+  [GetOrganizationConfigRuleDetailedStatus](API_GetOrganizationConfigRuleDetailedStatus.md), returns detailed status for each member account within an organization for a given organization AWS Config rule.
+  [GetOrganizationCustomRulePolicy](API_GetOrganizationCustomRulePolicy.md), returns the metadata, the rule name, and the policy definition containing the logic for your organization AWS Config Custom Policy rule.
+  [GetResourceEvaluationSummary](API_GetResourceEvaluationSummary.md), returns a summary of resource evaluation for the specified resource evaluation ID from the proactive rules that were run.
+  [ListResourceEvaluations](API_ListResourceEvaluations.md), returns a list of proactive resource evaluations.
+  [PutConfigRule](API_PutConfigRule.md), adds or updates an AWS Config rule for evaluating whether your AWS resources comply with your desired configurations.
+  [PutEvaluations](API_PutEvaluations.md), used by an AWS Lambda function to deliver evaluation results to AWS Config. 
+  [PutOrganizationConfigRule](API_PutOrganizationConfigRule.md), adds or updates organization AWS Config rule for your entire organization evaluating whether your AWS resources comply with your desired configurations.
+  [StartConfigRulesEvaluation](API_StartConfigRulesEvaluation.md), runs an on-demand evaluation for the specified AWS Config rules against the last known configuration state of the resources.
+  [StartResourceEvaluation](API_StartResourceEvaluation.md), runs an on-demand evaluation for the specified resource to determine whether the resource details will comply with configured AWS Config rules.

 **Remediation** 

Use the following APIs for AWS Config remediation actions:
+  [DeleteRemediationConfiguration](API_DeleteRemediationConfiguration.md), deletes the remediation configuration.
+  [DeleteRemediationExceptions](API_DeleteRemediationExceptions.md), deletes one or more remediation exceptions mentioned in the resource keys.
+  [DescribeRemediationConfigurations](API_DescribeRemediationConfigurations.md), returns the details of one or more remediation configurations.
+  [DescribeRemediationExceptions](API_DescribeRemediationExceptions.md), returns the details of one or more remediation exceptions.
+  [DescribeRemediationExecutionStatus](API_DescribeRemediationExecutionStatus.md), provides a detailed view of a Remediation Execution for a set of resources including state, timestamps for when steps for the remediation execution occur, and any error messages for steps that have failed. 
+  [PutRemediationConfigurations](API_PutRemediationConfigurations.md), adds or updates the remediation configuration with a specific AWS Config rule with the selected target or action.
+  [PutRemediationExceptions](API_PutRemediationExceptions.md), adds a new exception or updates an exisiting exception for a specific resource with a specific AWS Config rule.
+  [StartRemediationExecution](API_StartRemediationExecution.md), runs an on-demand remediation for the specified AWS Config rules against the last known remediation configuration. 

 **Conformance Packs** 

Use the following APIs for conformance packs:
+  [DeleteConformancePack](API_DeleteConformancePack.md), deletes the specified conformance pack and all the AWS Config rules and all evaluation results within that conformance pack. 
+  [DeleteOrganizationConformancePack](API_DeleteOrganizationConformancePack.md), deletes the specified organization conformance pack and all of the AWS Config rules and remediation actions from all member accounts in that organization.
+  [DescribeConformancePackCompliance](API_DescribeConformancePackCompliance.md), returns compliance information for each rule in that conformance pack.
+  [DescribeConformancePacks](API_DescribeConformancePacks.md), returns a list of one or more conformance packs.
+  [DescribeConformancePackStatus](API_DescribeConformancePackStatus.md), provides one or more conformance packs deployment status.
+  [DescribeOrganizationConformancePacks](API_DescribeOrganizationConformancePacks.md), returns a list of organization conformance packs.
+  [DescribeOrganizationConformancePackStatuses](API_DescribeOrganizationConformancePackStatuses.md), provides organization conformance pack deployment status for an organization.
+  [GetConformancePackComplianceDetails](API_GetConformancePackComplianceDetails.md), returns compliance details of a conformance pack for all AWS resources that are monitered by conformance pack.
+  [GetConformancePackComplianceSummary](API_GetConformancePackComplianceSummary.md), returns compliance information for the conformance pack based on the cumulative compliance results of all the rules in that conformance pack.
+  [GetOrganizationConformancePackDetailedStatus](API_GetOrganizationConformancePackDetailedStatus.md), returns detailed status for each member account within an organization for a given organization conformance pack.
+  [ListConformancePackComplianceScores](API_ListConformancePackComplianceScores.md), returns a list of conformance pack compliance scores.
+  [PutConformancePack](API_PutConformancePack.md), creates or updates a conformance pack.
+  [PutOrganizationConformancePack](API_PutOrganizationConformancePack.md), deploys conformance packs across member accounts in an AWS Organization.
+  [PutExternalEvaluation](API_PutExternalEvaluation.md), add or updates the evaluations for process checks.

 **Aggregators** 

Use the following APIs for multi-account multi-Region data aggregation: 
+  [BatchGetAggregateResourceConfig](API_BatchGetAggregateResourceConfig.md), returns the current configuration items for resources that are present in your AWS Config aggregator.
+  [DeleteAggregationAuthorization](API_DeleteAggregationAuthorization.md), deletes the authorization granted to the specified configuration aggregator account in a specified region. 
+  [DeleteConfigurationAggregator](API_DeleteConfigurationAggregator.md), deletes the specified configuration aggregator and the aggregated data associated with the aggregator. 
+  [DeletePendingAggregationRequest](API_DeletePendingAggregationRequest.md), deletes pending authorization requests for a specified aggregator account in a specified region. 
+  [DescribeAggregateComplianceByConfigRules](API_DescribeAggregateComplianceByConfigRules.md), returns a list of compliant and noncompliant rules with the number of resources for compliant and noncompliant rules.
+  [DescribeAggregateComplianceByConformancePacks](API_DescribeAggregateComplianceByConformancePacks.md), returns a list of existing and deleted conformance packs and their associated compliance status with the count of compliant and noncompliant AWS Config rules within each conformance pack.
+  [DescribeAggregationAuthorizations](API_DescribeAggregationAuthorizations.md), returns a list of authorizations granted to various aggregator accounts and regions.
+  [DescribeConfigurationAggregators](API_DescribeConfigurationAggregators.md), returns the details of one or more configuration aggregators. If the configuration aggregator is not specified, this operation returns the details for all the configuration aggregators associated with the account. 
+  [DescribeConfigurationAggregatorSourcesStatus](API_DescribeConfigurationAggregatorSourcesStatus.md), returns status information for sources within an aggregator. The status includes information about the last time AWS Config verified authorization between the source account and an aggregator account.
+  [DescribePendingAggregationRequests](API_DescribePendingAggregationRequests.md), returns a list of all pending aggregation requests.
+  [GetAggregateConformancePackComplianceSummary](API_GetAggregateConformancePackComplianceSummary.md), returns the count of compliant and noncompliant conformance packs across all AWS accounts and AWS Regions in an aggregator.
+  [GetAggregateComplianceDetailsByConfigRule](API_GetAggregateComplianceDetailsByConfigRule.md), returns the evaluation results for the specified AWS Config rule for a specific resource in a rule. The results indicate which AWS resources were evaluated by the rule, when each resource was last evaluated, and whether each resource complies with the rule.
+  [GetAggregateConfigRuleComplianceSummary](API_GetAggregateConfigRuleComplianceSummary.md), returns the number of compliant and noncompliant rules for one or more accounts and regions in an aggregator.
+  [GetAggregateDiscoveredResourceCounts](API_GetAggregateDiscoveredResourceCounts.md), returns the resource counts across accounts and regions that are present in your AWS Config aggregator. 
+  [GetAggregateResourceConfig](API_GetAggregateResourceConfig.md), returns configuration item that is aggregated for your specific resource in a specific source account and region. 
+  [ListAggregateDiscoveredResources](API_ListAggregateDiscoveredResources.md), accepts a resource type and returns a list of resource identifiers that are aggregated for a specific resource type across accounts and regions. 
+  [PutAggregationAuthorization](API_PutAggregationAuthorization.md), authorizes the aggregator account and region to collect data from the source account and region. 
+  [PutConfigurationAggregator](API_PutConfigurationAggregator.md), creates and updates the configuration aggregator with the selected source accounts and regions.

 **Advanced Queries** 

Use the following APIs for AWS Config:
+  [SelectAggregateResourceConfig](API_SelectAggregateResourceConfig.md), accepts a structured query language (SQL) SELECT command and an aggregator to query configuration state of AWS resources across multiple accounts and regions.
+  [SelectResourceConfig](API_SelectResourceConfig.md), accepts a structured query language (SQL) SELECT command, performs the corresponding search, and returns resource configurations matching the properties.
+  [PutStoredQuery](API_PutStoredQuery.md), saves a new query or updates an existing saved query.
+  [GetStoredQuery](API_GetStoredQuery.md), returns the details of a specific stored query.
+  [ListStoredQueries](API_ListStoredQueries.md), lists the stored queries for a single AWS account and a single AWS Region.
+  [DeleteStoredQuery](API_DeleteStoredQuery.md), deletes the stored query for a single AWS account and a single AWS Region.

This document was last published on June 17, 2026. 