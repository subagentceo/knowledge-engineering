

AWS Audit Manager is no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see [AWS Audit Manager availability change](https://docs.aws.amazon.com/audit-manager/latest/userguide/audit-manager-availability-change.html). 

# What is AWS Audit Manager?
<a name="what-is"></a>



Welcome to the AWS Audit Manager User Guide.

AWS Audit Manager helps you continually audit your AWS usage to simplify how you manage risk and compliance with regulations and industry standards. Audit Manager automates evidence collection so you can more easily assess whether your policies, procedures, and activities—also known as *controls*—are operating effectively. When it's time for an audit, Audit Manager helps you manage stakeholder reviews of your controls. This means that you can build audit-ready reports with much less manual effort.

Audit Manager provides prebuilt frameworks that structure and automate assessments for a given compliance standard or regulation. Frameworks include a prebuilt collection of controls with descriptions and testing procedures. These controls are grouped according to the requirements of the specified compliance standard or regulation. You can also customize frameworks and controls to support internal audits according to your specific requirements. 

You can create an assessment from any framework. When you create an assessment, Audit Manager automatically runs resource assessments. These assessments collect data for the AWS accounts that you define as in scope for your audit. The data that's collected is automatically transformed into audit-friendly evidence. Then, it's attached to the relevant controls to help you demonstrate compliance in security, change management, business continuity, and software licensing. This evidence collection process is ongoing, and starts when you create your assessment. After you complete an audit and you no longer need Audit Manager to collect evidence, you can stop evidence collection. To do this, change the status of your assessment to *inactive*. 

## Features of Audit Manager
<a name="features"></a>

With AWS Audit Manager, you can do the following tasks:
+ **Get started quickly** — [Create your first assessment](https://docs.aws.amazon.com/audit-manager/latest/userguide/tutorial-for-audit-owners.html) by selecting from a gallery of prebuilt frameworks that support a range of compliance standards and regulations. Then, initiate automatic evidence collection to audit your AWS service usage.
+ **Upload and manage evidence from hybrid or multicloud environments** — In addition to the evidence that Audit Manager collects from your AWS environment, you can also [upload](https://docs.aws.amazon.com/audit-manager/latest/userguide/upload-evidence.html) and centrally manage evidence from your on-premises or multicloud environment.
+ **Support common compliance standards and regulations** — Choose one of the [AWS Audit Manager standard frameworks](https://docs.aws.amazon.com/audit-manager/latest/userguide/framework-overviews.html). These frameworks provide prebuilt control mappings for common compliance standards and regulations. These include the CIS Foundation Benchmark, PCI DSS, GDPR, HIPAA, SOC2, GxP, and AWS operational best practices. 
+ **Monitor your active assessments** — Use the Audit Manager [dashboard](https://docs.aws.amazon.com/audit-manager/latest/userguide/dashboard.html) to view analytics data for your active assessments, and quickly identify non-compliant evidence that needs to be remediated.
+ **Search for evidence** — Use the [Evidence finder](evidence-finder.md) feature to quickly find evidence that’s relevant to your search query. You can generate an assessment report from your search results, or export your search results in CSV format.
+ **Create custom controls** — [Create your own control from scratch](https://docs.aws.amazon.com/audit-manager/latest/userguide/customize-control-from-scratch.html) or [make an editable copy of an existing standard control or custom control](https://docs.aws.amazon.com/audit-manager/latest/userguide/customize-control-from-existing.html). You can also use the custom controls feature to create risk assessment questions and store the responses to those questions as manual evidence.
+ **Map your enterprise controls to predefined groupings of AWS data sources** — Choose the common controls that represent your goals, and use them to [create custom controls](https://docs.aws.amazon.com/audit-manager/latest/userguide/customize-control-from-scratch.html) that collect evidence for your portfolio of compliance needs.
+ **Create custom frameworks** — [Create your own frameworks](https://docs.aws.amazon.com/audit-manager/latest/userguide/custom-frameworks.html) with standard or custom controls based on your specific requirements for internal audits.
+ **Share custom frameworks** —[ Share your custom Audit Manager frameworks](https://docs.aws.amazon.com/audit-manager/latest/userguide/share-custom-framework.html) with another AWS account, or replicate them into another AWS Region under your own account. 
+ **Support cross-team collaboration** — [Delegate control sets](https://docs.aws.amazon.com/audit-manager/latest/userguide/delegate-for-audit-owners.html) to subject matter experts who can review related evidence, add comments, and update the status of each control.
+ **Create reports for auditors** —[ Generate assessment reports](https://docs.aws.amazon.com/audit-manager/latest/userguide/generate-assessment-report.html) that summarize the relevant evidence that's collected for your audit and link to folders that contain the detailed evidence.
+ **Ensure evidence integrity** — [Store evidence](https://docs.aws.amazon.com/audit-manager/latest/userguide/settings-destination.html) in a secure location, where it remains unaltered.

**Note**  
AWS Audit Manager assists in collecting evidence that's relevant for verifying compliance with specific compliance standards and regulations. However, it doesn't assess your compliance itself. The evidence that's collected through AWS Audit Manager therefore might not include all the information about your AWS usage that's needed for audits. AWS Audit Manager isn't a substitute for legal counsel or compliance experts.  
 

## Pricing for Audit Manager
<a name="pricing"></a>

For more information about pricing, see [AWS Audit Manager Pricing](https://aws.amazon.com/audit-manager/pricing/).

## Are you a first-time user of Audit Manager?
<a name="first-time-user"></a>

If you're a first-time user of Audit Manager, we recommend that you start with the following pages:

1. [Understanding AWS Audit Manager concepts and terminology](concepts.md) – Learn about the key concepts and terms used in Audit Manager, such as assessments, frameworks, and controls.

1. [Understanding how AWS Audit Manager collects evidence](how-evidence-is-collected.md) – Learn about how Audit Manager gathers evidence for a resource assessment.

1. [Setting up AWS Audit Manager with the recommended settings](setting-up.md) – Learn about the setup requirements for Audit Manager.

1. [Getting started with AWS Audit Manager](getting-started.md) – Follow a tutorial to create your first Audit Manager assessment.

1. [AWS Audit Manager API Reference](https://docs.aws.amazon.com/audit-manager/latest/APIReference/Welcome.html) – Familiarize yourself with the Audit Manager API actions and data types.

## Related AWS services
<a name="related-services"></a>

AWS Audit Manager integrates with multiple AWS services to automatically collect evidence that you can include in your assessment reports. 

**AWS Security Hub CSPM**  
AWS Security Hub CSPM monitors your environment using automated security checks that are based on AWS best practices and industry standards. Audit Manager captures snapshots of your resource security posture by reporting the results of security checks directly from Security Hub CSPM. For more information about Security Hub CSPM, see [What is AWS Security Hub CSPM?](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html) in the *AWS Security Hub CSPM User Guide*.

**AWS CloudTrail**  
AWS CloudTrail helps you monitor the calls made to AWS resources in your account. These include calls made by the AWS Management Console, the AWS CLI, and other AWS services. Audit Manager collects log data from CloudTrail directly, and converts the processed logs into user activity evidence. For more information about CloudTrail, see [What is AWS CloudTrail?](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html) in the *AWS CloudTrail User Guide*. 

**AWS Config**  
AWS Config provides a detailed view of the configuration of AWS resources in your AWS account. This includes information about how resources are related to one another and how they were configured in the past. Audit Manager captures snapshots of your resource security posture by reporting findings directly from AWS Config. For more information about AWS Config, see [What is AWS Config?](https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html) in the *AWS Config User Guide*.

**AWS License Manager**  
AWS License Manager streamlines the process of bringing software vendor licenses to the cloud. As you build out cloud infrastructure on AWS, you can save costs by repurposing your existing license inventory for use with cloud resources. Audit Manager provides a License Manager framework to assist you with your audit preparation. This framework is integrated with License Manager to aggregate license usage information based on customer defined licensing rules. For more information on License Manager, see [What is AWS License Manager?](https://docs.aws.amazon.com/license-manager/latest/userguide/license-manager.html) in the *AWS License Manager User Guide*.

**AWS Control Tower**  
AWS Control Tower enforces preventative and detective guardrails for cloud infrastructure. Audit Manager provides an AWS Control Tower Guardrails framework to assist you with your audit preparation. This framework contains all of the AWS Config rules that are based on guardrails from AWS Control Tower. For more information about AWS Control Tower, see [What is AWS Control Tower?](https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html) in the *AWS Control Tower User Guide*.

**AWS Artifact**  
AWS Artifact is a self-service audit artifact retrieval portal that provides on-demand access to the compliance documentation and certifications for AWS infrastructure. AWS Artifact offers evidence to prove that the AWS Cloud infrastructure meets the compliance requirements. In contrast, AWS Audit Manager helps you collect, review, and manage evidence to demonstrate that your usage of AWS services is in compliance. For more information about AWS Artifact, see [What is AWS Artifact?](https://docs.aws.amazon.com/artifact/latest/ug/what-is-aws-artifact.html) in the *AWS Artifact User Guide*. You can download a [list of AWS reports](https://console.aws.amazon.com/artifact/reports) in the AWS Management Console.

**Amazon EventBridge**  
Amazon EventBridge helps you automate your AWS services and respond automatically to system events such as application availability issues or resource changes. You can use EventBridge rules to detect and react to Audit Manager events. Based on the rules that you create, EventBridge invokes one or more target actions when an event matches the values that you specify in a rule. For more information, see [Monitoring AWS Audit Manager with Amazon EventBridge](automating-with-eventbridge.md).

For a list of AWS services in scope of specific compliance programs, see [AWS services in Scope by Compliance Program](https://aws.amazon.com/compliance/services-in-scope/). For more general information, see [AWS Compliance Programs](https://aws.amazon.com/compliance/programs/).

## More Audit Manager resources
<a name="more-resources"></a>

Explore the following resources to learn more about Audit Manager.
+ Video: Collect Evidence and Manage Audit Data Using AWS Audit Manager  
[![AWS Videos](http://img.youtube.com/vi/G4yRj4nLwFI/0.jpg)](http://www.youtube.com/watch?v=G4yRj4nLwFI)
+  [Integrate across the Three Lines Model (Part 2): Transform AWS Config conformance packs into AWS Audit Manager assessments](https://aws.amazon.com/blogs/mt/integrate-across-the-three-lines-model-part-2-transform-aws-config-conformance-packs-into-aws-audit-manager-assessments/) from the *AWS Management & Governance Blog* 