

AWS Chatbot is now Amazon Q Developer. [Learn more](service-rename.md)

# What is Amazon Q Developer in chat applications?
<a name="what-is"></a>

Amazon Q Developer in chat applications enables DevOps and software development teams to use messaging program chat channels to monitor and respond to operational events in their AWS Cloud. Amazon Q Developer in chat applications processes AWS service notifications from Amazon Simple Notification Service (Amazon SNS), and forwards them to chat channels so teams can analyze and act on them immediately, regardless of location.

Amazon Q Developer in chat applications also supports AWS CLI commands so you can manage AWS resources directly from your chat channels.

**Topics**
+ [Features of Amazon Q Developer in chat applications](#chatbot-benefits)
+ [How Amazon Q Developer in chat applications works](#chatbot-works)
+ [Amazon Q Developer in chat applications rename - Summary of changes](service-rename.md)
+ [Regions and quotas for Amazon Q Developer in chat applications](chatbot-regions.md)
+ [Supported services for Amazon Q Developer in chat applications](chatbot-services.md)
+ [Amazon Q Developer in chat applications requirements](#chatbot-requirements)
+ [Accessing Amazon Q Developer in chat applications](#chatbot-access)

## Features of Amazon Q Developer in chat applications
<a name="chatbot-benefits"></a>

Amazon Q Developer in chat applications enables ChatOps for AWS. *ChatOps* speeds software development and operations by enabling DevOps teams to use chat clients and chatbots to communicate and execute tasks. Amazon Q Developer in chat applications notifies chat users about events in their AWS services, so teams can collaboratively monitor and resolve issues in real time, instead of addressing emails from their SNS topics. Amazon Q Developer in chat applications also allows you to format incident metrics from Amazon CloudWatch as charts for viewing in chat notifications.

Important features of the Amazon Q Developer in chat applications service include the following:
+ **Ask Amazon Q** – You can get Amazon Q Developer, Generative Artifical Intelligence (AI) assistant powered answers to your AWS questions directly in your chat channels. For more information about see [Chatting with Amazon Q Developer in chat channels](asking-questions.md).
+ **Supports Amazon Chime, Microsoft Teams, and Slack** – You can add Amazon Q Developer in chat applications to your Amazon Chime chat rooms, Microsoft Teams channels, or Slack channels in just a few clicks.
+ **Predefined AWS Identity and Access Management (IAM) policy templates** – Amazon Q Developer in chat applications provides chat room-specific permission controls through AWS Identity and Access Management (IAM). The available predefined templates make it easy to select and set up the permissions you want associated with a given channel or chat room.
+ **Receive notifications** – Use Amazon Q Developer in chat applications to receive notifications about operational incidents and other events from supported sources, such as operational alarms, security alerts, or budget deviations. To set up notifications in the Amazon Q Developer in chat applications console, choose the channels or chat rooms you want to receive notifications and then choose which Amazon Simple Notification Service (Amazon SNS) topics should trigger notifications.
+ **Customize notifications** – You can define and receive customized AWS service and application notifications directly in your chat channels. Custom notifications can be as succint or comprehensive you desire and use the same Amazon SNS-based mechanisms as default notifications. 
+ **Create custom actions** – Custom actions transform your notifications into actionable items. A custom action appears as a button on your notifications. This button represents a Lambda function or CLI command that you define. You can use custom actions to retrieve telemetry information, run Lambda functions, run an automation runbook, and notify team members. When an issue arises, you can easily take action directly from your notifications. 
+ **Monitor and manage AWS resources through the AWS CLI with Microsoft Teams and Slack** – Amazon Q Developer in chat applications supports CLI commands for most AWS services, making it easy to monitor and manage your AWS resources from your chat clients on desktop and mobile devices. Your teams can retrieve diagnostic information in real-time, change your AWS resources, run AWS SSM runbooks, and start long running jobs from a centralized location. Amazon Q Developer in chat applications commands use the standard AWS Command Line Interface syntax.
+ **Supports developer tools** – You can manage your Amazon Q Developer in chat applications resources using developer tools such as AWS software development kits (SDKs), the AWS Cloud Development Kit (AWS CDK), AWS CloudFormation, and AWS Cloud Control API. You can also use third party infrastructure as code (IaaC) providers such as [Terraform](https://www.hashicorp.com/blog/managing-resources-with-the-terraform-aws-cloud-control-provider).

## How Amazon Q Developer in chat applications works
<a name="chatbot-works"></a>

Amazon Q Developer in chat applications uses Amazon Simple Notification Service (Amazon SNS) topics to send event and alarm notifications from AWS services to your chat channels. Once an SNS topic is associated with a configured chat client, events and alarms from various services are processed and notifications are delivered to the specified chat channels and webhooks. For Microsoft Teams and Slack, after an administrator approves Amazon Q Developer in chat applications support for the tenant or workspace, anyone in the team or workspace can add Amazon Q Developer in chat applications to their chat channels. For Amazon Chime, users with AWS Identity and Access Management (IAM) permissions to use Amazon Chime can add Amazon Q Developer in chat applications to their webhooks. You use the Amazon Q Developer in chat applications console to configure chat clients to receive notifications from SNS topics. 

You can also run AWS CLI commands directly in chat channels using Amazon Q Developer. You can retrieve diagnostic information, configure AWS resources, and run workflows. To run a command, Amazon Q Developer in chat applications checks that all required parameters are entered. If any are missing, Amazon Q Developer in chat applications prompts you for the required information. Amazon Q Developer in chat applications then confirms if the command is permissible by checking the command against what is allowed by the configured IAM roles and the channel guardrail policies. For more information, see [Running AWS CLI commands from chat channels](chatbot-cli-commands.md) and [Understanding permissions](understanding-permissions.md).

## Amazon Q Developer in chat applications requirements
<a name="chatbot-requirements"></a>

To use Amazon Q Developer in chat applications, you need the following:
+ An AWS account to associate with Amazon Chime, Microsoft Teams, or Slack chat clients during Amazon Q Developer in chat applications setup. 
+ Administrative privileges for your Amazon Chime chat room, Microsoft Teams tenant, or Slack workspace. You can be the Slack workspace owner or have the ability to work with workspace owners to get approval for installing Amazon Q Developer in chat applications.
+ Familiarity with AWS Identity and Access Management (IAM) and IAM roles and policies. For more information about IAM, see [What is IAM?](https://docs.aws.amazon.com/IAM/latest/UserGuide/) in the *IAM User Guide*.
+ Experience with the AWS services supported by Amazon Q Developer in chat applications, including experience configuring those services to subscribe to Amazon Simple Notification Service (Amazon SNS) topics to send notifications. For information about supported services, see [Using Amazon Q Developer in chat applications with Other AWS Services](related-services.md).

To access Amazon CloudWatch metrics, Amazon Q Developer in chat applications requires an AWS Identity and Access Management (IAM) role with a permissions policy and a trust policy. You create this IAM role, with the required policies, [using the Amazon Q Developer in chat applications console](https://us-east-2.console.aws.amazon.com/chatbot/home?region=us-east-2#/chat-clients). You can use an existing IAM role, but it must have the required policies.

## Accessing Amazon Q Developer in chat applications
<a name="chatbot-access"></a>

You access and configure Amazon Q Developer in chat applications through the Amazon Q Developer in chat applications console at [https://console.aws.amazon.com/chatbot/](https://console.aws.amazon.com/chatbot/).

You can also access the Amazon Q Developer in chat applications app from the [Slack app directory](https://amzn-aws.slack.com/apps/A6L22LZNH-aws-chatbot?settings=1).