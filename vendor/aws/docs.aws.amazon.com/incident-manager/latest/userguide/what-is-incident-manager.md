

AWS Systems Manager Incident Manager is no longer open to new customers. Existing customers can continue to use the service as normal. For more information, see [AWS Systems Manager Incident Manager availability change](https://docs.aws.amazon.com/incident-manager/latest/userguide/incident-manager-availability-change.html). 

# What Is AWS Systems Manager Incident Manager?
<a name="what-is-incident-manager"></a>

Incident Manager, a tool in AWS Systems Manager, is designed to help you mitigate and recover from *incidents* affecting your applications hosted on AWS. 

In the context of AWS, an incident is any unplanned interruption or reduction in the quality of services that can have a significant impact on business operations. Therefore, it’s crucial for organizations to establish a response strategy to efficiently mitigate and recover from incidents, and implement actions to prevent future incidents.

Incident Manager helps reduce the time to resolve incidents by:
+ Providing automated plans for efficiently engaging the people responsible for responding to the incidents.
+ Providing relevant troubleshooting data.
+ Enabling automated response actions by using predefined Automation runbooks.
+ Providing methods to collaborate and communicate with all stakeholders.

The features and workflows built into Incident Manager are based on the best practices for incident response that Amazon has been developing almost since its inception. Incident Manager integrates with such AWS services as Amazon CloudWatch, AWS CloudTrail, AWS Systems Manager, and Amazon EventBridge.

## Primary components and features
<a name="features"></a>

This section describes the features in Incident Manager that you use to set up your incident response plans.

**Response plan **  
A response plan functions as a template that defines what must be in place when an incident occurs. It includes such information as:  
+ Who is required to respond when an incident occurs.
+ The established automated response to mitigate the incident.
+ The collaboration tool that responders must use to communicate and receive automatic notifications about the incident.

**Incident detection**  
You can configure Amazon CloudWatch alarms and Amazon EventBridge events to create incidents when conditions or changes that affect your AWS resources are detected. 

**Runbook automation support**  
You can initiate Automation runbooks from within Incident Manager to automate your critical response to incidents and provide detailed steps to first responders. 

**Engagement and escalation**  
An *engagement plan* specifies everyone to notify for each unique incident. You can specify individual contacts that you have added to Incident Manager or specify an on-call schedule that you created in Incident Manager. Engagement plans also specify an escalation path to help ensure visibility among stakeholders and active participation during the incident response process.

**On-call schedules**  
An *on-call schedule* in Incident Manager consists of one or more rotations that you create for the schedule. For each rotation, you can include up to 30 contacts. When added to an escalation plan or response plan, the on-call schedule defines who is notified when an incident occurs that requires responder intervention. On-call schedules help ensure that you have full, redundant, 24/7 coverage as needed for your incident response.

**Active collaboration**  
Incident responders actively respond to incidents through integration with the Amazon Q Developer in chat applications client. Amazon Q Developer in chat applications supports creating chat channels for Incident Manager that use Slack, Microsoft Teams, or Amazon Chime. Responders can communicate directly with one another, receive automated notifications about incidents, and—in Slack and Microsoft Teams—directly run some Incident Manager command line interface (CLI) operations.

**Incident diagnosis**  
Responders can view up-to-date information in the Incident Manager console during an incident. Based on the changes in information, responders can then create follow-up items and remediate them by using Automation runbooks.

**Findings from other services**  
To support responders' incident diagnosis, you can enable the Findings feature in Incident Manager. Findings are information about AWS CodeDeploy deployments and AWS CloudFormation stack updates that occurred around the time of an incident, and that involved one or more resources likely related to the incident. Having this information reduces the time needed to evaluate potential causes, which can reduce the mean time to recover (MTTR) from an incident.

**Post-incident analysis**  
After an incident is resolved, you use a post-incident analysis to identify improvements to your incident response, including time to detection and mitigation. An analysis can also help you understand the root cause of the incidents. Incident Manager creates recommended follow-up action items that you can use to improve your incident response.

## Benefits of using Incident Manager
<a name="benefits"></a>

Learn about the benefits of using Incident Manager in your incident detection and response operations.

This section describes the advantages that your organization can gain when you implement an Incident Manager response plan.

**Diagnose issues efficiently and immediately**  
Amazon CloudWatch alarms and Amazon EventBridge events that you configure can create incidents automatically when there is any unplanned interruption or reduction in the quality of your services. 

CloudWatch alarms detect and report when there are changes to the value of the metric or expression that is relative to a threshold over a number of time periods. EventBridge events are created as the result of change in an environment, application, or service that you have specified in an EventBridge rule. When you create an alarm or event, you can specify an action for an incident to be created in Incident Manager and the appropriate response plan to facilitate the engagement, escalation, and mitigation of the incident.

Incident Manager provides the ability to automatically collect and track the metrics related to an incident, through the use of CloudWatch metrics. In addition to the automated metrics generated for the incident when it is created through a CloudWatch alarm, you can add metrics manually in real time, to provide additional context and data to the responders in an incident.

Use the Incident Manager incident timeline to display points of interest in chronological order. Responders can also use the timeline to add custom events to describe what they did or what happened. Automated points of interest include:
+ A CloudWatch alarm or EventBridge rule creates an incident.
+ Incident metrics are reported to Incident Manager.
+ Responders are engaged.
+ Runbook steps complete successfully.

**Engage effectively**  
Incident Manager brings incident responders together through the use of contacts, on-call schedules, escalation plans, and chat channels. You define individual contacts directly in Incident Manager and specify contact preferences (email, SMS, or voice). You add contacts to on-call schedule rotations to determine who is engaged to deal with incidents during a given period. Using your defined contacts and on-call schedules, you create escalation plans to engage the necessary responders at the right time during an incident. 

**Collaborate in real time**  
Communication during an incident is the key to faster resolution. Using an Amazon Q Developer in chat applications client set up to use Slack, Microsoft Teams, or Amazon Chime, you can bring together responders in their preferred connected chat channel where they directly interact with the incident and with one another. Incident Manager also displays the real-time actions of incident responders in the chat channel, providing context to others.

**Automate service restoration**  
Incident Manager enables your responders to focus on the key tasks required to resolve an incident through the use of Automation *runbooks*. In Incident Manager, runbooks are a predefined series of actions taken to resolve an incident. They combine the power of automated tasks with manual steps as needed, leaving responders more available to analyze and respond to impact.

**Prevent future incidents**  
Using Incident Manager post incident analysis, your team can develop more robust response plans and effect change across your applications to prevent future incidents and downtime. Post-incident analysis also provides for iterative learning and improvement of runbooks, response plans, and metrics.

## Related services
<a name="related-services"></a>

Incident Manager integrates with several other AWS services and third-party services and tools to help you detect and resolve incidents, and to interact with its API operations indirectly and manage infrastructure. For information, see [Product and service integrations with Incident Manager](integration.md).

## Accessing Incident Manager
<a name="access"></a>

You can access Incident Manager in any of the following ways: 
+ **The [Incident Manager console](https://console.aws.amazon.com/systems-manager/incidents/home)**
+ **AWS CLI** – For general information, see [Getting started with the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) in the *AWS Command Line Interface User Guide*. For information about CLI commands for Incident Manager, see [https://docs.aws.amazon.com/cli/latest/reference/ssm-incidents/](https://docs.aws.amazon.com/cli/latest/reference/ssm-incidents/) and [https://docs.aws.amazon.com/cli/latest/reference/ssm-contacts/](https://docs.aws.amazon.com/cli/latest/reference/ssm-contacts/) in the *AWS CLI Command Reference*. 
+ **Incident Manager API** – For more information, see the [AWS Systems Manager Incident Manager API Reference](https://docs.aws.amazon.com/incident-manager/latest/APIReference/Welcome.html).
+ **AWS SDKs** – For more information, see [Tools to Build on AWS](http://aws.amazon.com/developer/tools).

## Incident Manager Regions and quotas
<a name="regions-quotas"></a>

Incident Manager isn't supported in all AWS Regions supported by Systems Manager. 

To view information about Incident Manager Regions and quotas, see [AWS Systems Manager Incident Manager endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/incident-manager.html) in the *Amazon Web Services General Reference*.

## Pricing for Incident Manager
<a name="pricing"></a>

There is a charge to use Incident Manager. For more information, see [AWS Systems Manager pricing](https://aws.amazon.com/systems-manager/pricing/).

**Note**  
Other AWS services, AWS content, and third-party content made available in connection with this service may be subject to separate charges and governed by additional terms.

For an overview of Trusted Advisor, a service that helps you optimize the costs, security, and performance of your AWS environment, see [AWS Trusted Advisor](https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html) in the *AWS Support User Guide*.