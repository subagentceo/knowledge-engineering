

# Welcome
<a name="Welcome"></a>

 AWS Control Tower offers application programming interface (API) operations that support programmatic interaction with these types of resources:
+  [https://docs.aws.amazon.com/controltower/latest/userguide/controls.html](https://docs.aws.amazon.com/controltower/latest/userguide/controls.html) 
  +  [DisableControl](https://docs.aws.amazon.com/controltower/latest/APIReference/API_DisableControl.html) 
  +  [EnableControl](https://docs.aws.amazon.com/controltower/latest/APIReference/API_EnableControl.html) 
  +  [GetEnabledControl](https://docs.aws.amazon.com/controltower/latest/APIReference/API_GetEnabledControl.html) 
  +  [GetControlOperation](https://docs.aws.amazon.com/controltower/latest/APIReference/API_GetControlOperation.html) 
  +  [ListControlOperations](https://docs.aws.amazon.com/controltower/latest/APIReference/API_ListControlOperations.html) 
  +  [ListEnabledControls](https://docs.aws.amazon.com/controltower/latest/APIReference/API_ListEnabledControls.html) 
  +  [ResetEnabledControl](https://docs.aws.amazon.com/controltower/latest/APIReference/API_ResetEnabledControl.html) 
  +  [UpdateEnabledControl](https://docs.aws.amazon.com/controltower/latest/APIReference/API_UpdateEnabledControl.html) 
+  [https://docs.aws.amazon.com/controltower/latest/userguide/lz-api-launch.html](https://docs.aws.amazon.com/controltower/latest/userguide/lz-api-launch.html) 
  +  [CreateLandingZone](https://docs.aws.amazon.com/controltower/latest/APIReference/API_CreateLandingZone.html) 
  +  [DeleteLandingZone](https://docs.aws.amazon.com/controltower/latest/APIReference/API_DeleteLandingZone.html) 
  +  [GetLandingZone](https://docs.aws.amazon.com/controltower/latest/APIReference/API_GetLandingZone.html) 
  +  [GetLandingZoneOperation](https://docs.aws.amazon.com/controltower/latest/APIReference/API_GetLandingZoneOperation.html) 
  +  [ListLandingZones](https://docs.aws.amazon.com/controltower/latest/APIReference/API_ListLandingZones.html) 
  +  [ListLandingZoneOperations](https://docs.aws.amazon.com/controltower/latest/APIReference/API_ListLandingZoneOperations.html) 
  +  [ResetLandingZone](https://docs.aws.amazon.com/controltower/latest/APIReference/API_ResetLandingZone.html) 
  +  [UpdateLandingZone](https://docs.aws.amazon.com/controltower/latest/APIReference/API_UpdateLandingZone.html) 
+  [https://docs.aws.amazon.com/controltower/latest/userguide/types-of-baselines.html](https://docs.aws.amazon.com/controltower/latest/userguide/types-of-baselines.html) 
  +  [DisableBaseline](https://docs.aws.amazon.com/controltower/latest/APIReference/API_DisableBaseline.html) 
  +  [EnableBaseline](https://docs.aws.amazon.com/controltower/latest/APIReference/API_EnableBaseline.html) 
  +  [GetBaseline](https://docs.aws.amazon.com/controltower/latest/APIReference/API_GetBaseline.html) 
  +  [GetBaselineOperation](https://docs.aws.amazon.com/controltower/latest/APIReference/API_GetBaselineOperation.html) 
  +  [GetEnabledBaseline](https://docs.aws.amazon.com/controltower/latest/APIReference/API_GetEnabledBaseline.html) 
  +  [ListBaselines](https://docs.aws.amazon.com/controltower/latest/APIReference/API_ListBaselines.html) 
  +  [ListEnabledBaselines](https://docs.aws.amazon.com/controltower/latest/APIReference/API_ListEnabledBaselines.html) 
  +  [ResetEnabledBaseline](https://docs.aws.amazon.com/controltower/latest/APIReference/API_ResetEnabledBaseline.html) 
  +  [UpdateEnabledBaseline](https://docs.aws.amazon.com/controltower/latest/APIReference/API_UpdateEnabledBaseline.html) 
+  [https://docs.aws.amazon.com/controltower/latest/controlreference/tagging.html](https://docs.aws.amazon.com/controltower/latest/controlreference/tagging.html) 
  +  [ListTagsForResource](https://docs.aws.amazon.com/controltower/latest/APIReference/API_ListTagsForResource.html) 
  +  [TagResource](https://docs.aws.amazon.com/controltower/latest/APIReference/API_TagResource.html) 
  +  [UntagResource](https://docs.aws.amazon.com/controltower/latest/APIReference/API_UntagResource.html) 

For more information about these types of resources, see the [https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html).

 **About control APIs** 

These interfaces allow you to apply the AWS library of pre-defined *controls* to your organizational units, programmatically. In AWS Control Tower, the terms "control" and "guardrail" are synonyms.

To call these APIs, you'll need to know:
+ the `controlIdentifier` for the control--or guardrail--you are targeting.
+ the ARN associated with the target organizational unit (OU), which we call the `targetIdentifier`.
+ the ARN associated with a resource that you wish to tag or untag.

 **To get the `controlIdentifier` for your AWS Control Tower control:** 

The `controlIdentifier` is an ARN that is specified for each control. You can view the `controlIdentifier` in the console on the **Control details** page, as well as in the documentation.

 **About identifiers for AWS Control Tower** 

The AWS Control Tower `controlIdentifier` is unique in each AWS Region for each control. You can find the `controlIdentifier` for each Region and control in the [Tables of control metadata](https://docs.aws.amazon.com/controltower/latest/controlreference/control-metadata-tables.html) or the [Control availability by Region tables](https://docs.aws.amazon.com/controltower/latest/controlreference/control-region-tables.html) in the * AWS Control Tower Controls Reference Guide*.

A quick-reference list of control identifers for the AWS Control Tower legacy *Strongly recommended* and *Elective* controls is given in [Resource identifiers for APIs and controls](https://docs.aws.amazon.com/controltower/latest/controlreference/control-identifiers.html.html) in the [https://docs.aws.amazon.com/controltower/latest/controlreference/control-identifiers.html](https://docs.aws.amazon.com/controltower/latest/controlreference/control-identifiers.html). Remember that *Mandatory* controls cannot be added or removed.

**Note**  
 **Some controls have two identifiers**   
 **ARN format for AWS Control Tower:** `arn:aws:controltower:{REGION}::control/{CONTROL_TOWER_OPAQUE_ID}`   
 **Example:**   
 `arn:aws:controltower:us-west-2::control/AWS-GR_AUTOSCALING_LAUNCH_CONFIG_PUBLIC_IP_DISABLED` 
 **ARN format for AWS Control Catalog:** `arn:{PARTITION}:controlcatalog:::control/{CONTROL_CATALOG_OPAQUE_ID}` 
You can find the `{CONTROL_CATALOG_OPAQUE_ID}` in the [https://docs.aws.amazon.com/controltower/latest/controlreference/all-global-identifiers.html](https://docs.aws.amazon.com/controltower/latest/controlreference/all-global-identifiers.html), or in the AWS Control Tower console, on the **Control details** page.  
The AWS Control Tower APIs for enabled controls, such as `GetEnabledControl` and `ListEnabledControls` always return an ARN of the same type given when the control was enabled.

 **To get the `targetIdentifier`:** 

The `targetIdentifier` is the ARN for an OU.

In the AWS Organizations console, you can find the ARN for the OU on the **Organizational unit details** page associated with that OU.

**Note**  
 **OU ARN format:**   
 `arn:${Partition}:organizations::${MasterAccountId}:ou/o-${OrganizationId}/ou-${OrganizationalUnitId}` 

 ** About landing zone APIs** 

You can configure and launch an AWS Control Tower landing zone with APIs. For an introduction and steps, see [Getting started with AWS Control Tower using APIs](https://docs.aws.amazon.com/controltower/latest/userguide/getting-started-apis.html).

For an overview of landing zone API operations, see [AWS Control Tower supports landing zone APIs](https://docs.aws.amazon.com/controltower/latest/userguide/2023-all.html#landing-zone-apis). The individual API operations for landing zones are detailed in this document, the [API reference manual](https://docs.aws.amazon.com/controltower/latest/APIReference/API_Operations.html), in the "Actions" section.

 **About baseline APIs** 

You can apply the `AWSControlTowerBaseline` baseline to an organizational unit (OU) as a way to register the OU with AWS Control Tower, programmatically. For a general overview of this capability, see [AWS Control Tower supports APIs for OU registration and configuration with baselines](https://docs.aws.amazon.com/controltower/latest/userguide/2024-all.html#baseline-apis).

You can call the baseline API operations to view the baselines that AWS Control Tower enables for your landing zone, on your behalf, when setting up the landing zone. These baselines are read-only baselines.

The individual API operations for baselines are detailed in this document, the [API reference manual](https://docs.aws.amazon.com/controltower/latest/APIReference/API_Operations.html), in the "Actions" section. For usage examples, see [Baseline API input and output examples with CLI](https://docs.aws.amazon.com/controltower/latest/userguide/baseline-api-examples.html).

 ** About AWS Control Catalog identifiers** 
+ The `EnableControl` and `DisableControl` API operations can be called by specifying either the AWS Control Tower identifer or the AWS Control Catalog identifier. The API response returns the same type of identifier that you specified when calling the API.
+ If you use an AWS Control Tower identifier to call the `EnableControl` API, and then call `EnableControl` again with an AWS Control Catalog identifier, AWS Control Tower returns an error message stating that the control is already enabled. Similar behavior applies to the `DisableControl` API operation. 
+ Mandatory controls and the landing-zone-level Region deny control have AWS Control Tower identifiers only.

**Details and examples**
+  [Control API input and output examples with CLI](https://docs.aws.amazon.com/controltower/latest/controlreference/control-api-examples-short.html) 
+  [Baseline API input and output examples with CLI](https://docs.aws.amazon.com/controltower/latest/userguide/baseline-api-examples.html) 
+  [Enable controls with CloudFormation](https://docs.aws.amazon.com/controltower/latest/controlreference/enable-controls.html) 
+  [Launch a landing zone with CloudFormation](https://docs.aws.amazon.com/controltower/latest/userguide/lz-apis-cfn-setup.html) 
+  [Control metadata tables (large page)](https://docs.aws.amazon.com/controltower/latest/controlreference/control-metadata-tables.html) 
+  [Control availability by Region tables (large page)](https://docs.aws.amazon.com/controltower/latest/controlreference/control-region-tables.html) 
+  [List of identifiers for legacy controls](https://docs.aws.amazon.com/controltower/latest/controlreference/control-identifiers.html) 
+  [Controls reference guide](https://docs.aws.amazon.com/controltower/latest/controlreference/controls.html) 
+  [Controls library groupings](https://docs.aws.amazon.com/controltower/latest/controlreference/controls-reference.html) 
+  [Creating AWS Control Tower resources with AWS CloudFormation](https://docs.aws.amazon.com/controltower/latest/userguide/creating-resources-with-cloudformation.html) 

To view the open source resource repository on GitHub, see [aws-cloudformation/aws-cloudformation-resource-providers-controltower](https://github.com/aws-cloudformation/aws-cloudformation-resource-providers-controltower) 

 **Recording API Requests** 

 AWS Control Tower supports AWS CloudTrail, a service that records AWS API calls for your AWS account and delivers log files to an Amazon S3 bucket. By using information collected by CloudTrail, you can determine which requests the AWS Control Tower service received, who made the request and when, and so on. For more about AWS Control Tower and its support for CloudTrail, see [Logging AWS Control Tower Actions with AWS CloudTrail](https://docs.aws.amazon.com/controltower/latest/userguide/logging-using-cloudtrail.html) in the AWS Control Tower User Guide. To learn more about CloudTrail, including how to turn it on and find your log files, see the AWS CloudTrail User Guide.

This document was last published on June 17, 2026. 