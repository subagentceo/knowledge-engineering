

# What is AWS End User Messaging Social?
<a name="what-is-service"></a>

AWS End User Messaging Social, also referred to as Social messaging, is a messaging service that allows developers to integrate WhatsApp into their applications. It provides access to WhatsApp's messaging capabilities, enabling the creation of branded, interactive content with images, videos, and buttons. By using this service, you can add WhatsApp messaging functionality to your applications alongside existing channels like SMS and push notifications. This allows you to engage with customers through their preferred communication channel.

To get started, either create a new WhatsApp Business Account (WABA) using the self-guided onboarding process in the AWS End User Messaging Social console, or link an existing WABA to the service.

**Note**  
AWS End User Messaging Social now supports Meta's Marketing Messages (MM) API to deliver marketing messages using the same AWS API endpoint. To send messages through MM API, you must accept Meta's MM API terms and conditions. You can proceed by clicking the MM API banner on the WhatsApp Business Account (WABA) details page in the AWS End User Messaging Social console, and accepting the terms in Meta's console. According to Meta, MM API has up to 9% higher deliverability for marketing messages, recipient optimization, and conversion tracking. For more information, see [Meta's Marketing Messages API documentation](https://developers.facebook.com/docs/whatsapp/business-management-api/marketing-messages).

**Topics**
+ [Are you a first-time AWS End User Messaging Social user?](#first-time-user)
+ [Features of AWS End User Messaging Social](#servicename-feature-overview)
+ [Related services](#related-services)
+ [Accessing AWS End User Messaging Social](#acessing-servicename)
+ [Regional availability](#social-regions)

## Are you a first-time AWS End User Messaging Social user?
<a name="first-time-user"></a>

If you are a first-time user of AWS End User Messaging Social, we recommend that you begin by reading the following sections:
+ [Setting up AWS End User Messaging Social](setting-up.md)
+ [Getting started with AWS End User Messaging Social](getting-started-whatsapp.md)
+ [Best practices for AWS End User Messaging Social](whatsapp-best-practices.md)

## Features of AWS End User Messaging Social
<a name="servicename-feature-overview"></a>

AWS End User Messaging Social provides the following features and capabilities:
+ Design consistent messages and reuse content more effectively by [creating and using message templates](managing-templates.md). A message template contains content and settings that you want to reuse in messages that you send.
+ Access to rich messaging capabilities for a more engaging experience. Beyond text and media, you can send locations and interactive messages.
+ Receive incoming text and media messages from your customers. 
+ Create interactive, multi-screen experiences using [WhatsApp Flows](managing-flows.md). Collect data through forms, surveys, appointment booking, and other structured interactions without users leaving WhatsApp.
+ Build trust with your customers by verifying your business identity through Meta. 

## Related services
<a name="related-services"></a>

AWS offers other messaging services that can be used together in a multi-channel workflow:
+ Use [AWS End User Messaging SMS](https://docs.aws.amazon.com//sms-voice/latest/userguide/what-is-service.html) to send SMS messages
+ Use [AWS End User Messaging Push](https://docs.aws.amazon.com//push-notifications/latest/userguide/what-is-service.html) to send push notifications
+ Use [Amazon SES](https://docs.aws.amazon.com//ses/latest/dg/Welcome.html) to send email

## Accessing AWS End User Messaging Social
<a name="acessing-servicename"></a>

You can access AWS End User Messaging Social using the following:

**AWS End User Messaging Social console**  
The web interface where you [create](getting-started-whatsapp.md#getting-started-step1-embedded.title) and manage resources.

**AWS Command Line Interface**  
Interact with AWS services using commands in your command line shell. The AWS Command Line Interface is supported on Windows, macOS, and Linux. For more information about the AWS CLI, see [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/). You can find the AWS End User Messaging Social commands in the [AWS CLI Command Reference](https://docs.aws.amazon.com/cli/latest/reference/).

**AWS SDKs**  
If you prefer to build applications using language-specific APIs instead of submitting a request over HTTP or HTTPS, use the libraries, sample code, tutorials, and other resources provided by AWS. These libraries provide basic functions that automate tasks, such as cryptographically signing your requests, retrying requests, and handling error responses. These functions make it more efficient for you to get started. For more information, see [Tools to Build on AWS](https://aws.amazon.com/developer/tools/).

## Regional availability
<a name="social-regions"></a>

AWS End User Messaging Social is available in several AWS Regions in North America, Europe, Asia, and Oceania. In each Region, AWS maintains multiple Availability Zones. These Availability Zones are physically isolated from each other, but are united by private, low-latency, high-throughput, and highly redundant network connections. These Availability Zones are used to provide high levels of availability and redundancy, while also minimizing latency.

To learn more about AWS Regions, see [Specify which AWS Regions your account can use](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html) in the *Amazon Web Services General Reference*. For a list of all the Regions where AWS End User Messaging Social is currently available and the endpoint for each Region, see [Endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/end-user-messaging.html) for AWS End User Messaging Social API and [AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#pinpoint_region) in the *Amazon Web Services General Reference*, or the following table. To learn more about the number of Availability Zones that are available in each Region, see [AWS global infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/).


**Region availability**  

| Region name | Region | Endpoint | WhatsApp API version | 
| --- | --- | --- | --- | 
| US East (N. Virginia) | us-east-1 | social-messaging.us-east-1.amazonaws.com<br />social-messaging.us-east-1.api.aws<br />social-messaging-fips.us-east-1.amazonaws.com<br />social-messaging-fips.us-east-1.api.aws | Version 20 and later | 
| US East (Ohio) | us-east-2 | social-messaging.us-east-2.amazonaws.com<br />social-messaging.us-east-2.api.aws<br />social-messaging-fips.us-east-2.amazonaws.com<br />social-messaging-fips.us-east-2.api.aws | Version 20 and later | 
| US West (Oregon) | us-west-2 | social-messaging.us-west-2.amazonaws.com<br />social-messaging.us-west-2.api.aws<br />social-messaging-fips.us-west-2.amazonaws.com<br />social-messaging-fips.us-west-2.api.aws | Version 20 and later | 
| Canada (Central) | ca-central-1 | social-messaging.ca-central-1.amazonaws.com<br />social-messaging.ca-central-1.api.aws<br />social-messaging-fips.ca-central-1.amazonaws.com<br />social-messaging-fips.ca-central-1.api.aws | Version 20 and later | 
| Canada West (Calgary) | ca-west-1 | social-messaging.ca-west-1.amazonaws.com<br />social-messaging.ca-west-1.api.aws<br />social-messaging-fips.ca-west-1.amazonaws.com<br />social-messaging-fips.ca-west-1.api.aws | Version 20 and later | 
| Africa (Cape Town) | af-south-1 | social-messaging.af-south-1.amazonaws.com<br />social-messaging.af-south-1.api.aws | Version 20 and later | 
| Asia Pacific (Tokyo) | ap-northeast-1 | social-messaging.ap-northeast-1.amazonaws.com<br />social-messaging.ap-northeast-1.api.aws | Version 20 and later | 
| Asia Pacific (Seoul) | ap-northeast-2 | social-messaging.ap-northeast-2.amazonaws.com<br />social-messaging.ap-northeast-2.api.aws | Version 20 and later | 
| Asia Pacific (Mumbai) | ap-south-1 | social-messaging.ap-south-1.amazonaws.com<br />social-messaging.ap-south-1.api.aws | Version 20 and later | 
| Asia Pacific (Hyderabad) | ap-south-2 | social-messaging.ap-south-2.amazonaws.com<br />social-messaging.ap-south-2.api.aws | Version 20 and later | 
| Asia Pacific (Singapore) | ap-southeast-1 | social-messaging.ap-southeast-1.amazonaws.com<br />social-messaging.ap-southeast-1.api.aws | Version 20 and later | 
| Asia Pacific (Sydney) | ap-southeast-2 | social-messaging.ap-southeast-2.amazonaws.com<br />social-messaging.ap-southeast-2.api.aws | Version 20 and later | 
| Asia Pacific (New Zealand) | ap-southeast-6 | social-messaging.ap-southeast-6.amazonaws.com<br />social-messaging.ap-southeast-6.api.aws | Version 20 and later | 
| Europe (Frankfurt) | eu-central-1 | social-messaging.eu-central-1.amazonaws.com<br />social-messaging.eu-central-1.api.aws | Version 20 and later | 
| Europe (Stockholm) | eu-north-1 | social-messaging.eu-north-1.amazonaws.com<br />social-messaging.eu-north-1.api.aws | Version 20 and later | 
| Europe (Spain) | eu-south-2 | social-messaging.eu-south-2.amazonaws.com<br />social-messaging.eu-south-2.api.aws | Version 20 and later | 
| Europe (Ireland) | eu-west-1 | social-messaging.eu-west-1.amazonaws.com<br />social-messaging.eu-west-1.api.aws | Version 20 and later | 
| Europe (London) | eu-west-2 | social-messaging.eu-west-2.amazonaws.com<br />social-messaging.eu-west-2.api.aws | Version 20 and later | 
| Middle East (Bahrain) | me-south-1 | social-messaging.me-south-1.amazonaws.com<br />social-messaging.me-south-1.api.aws | Version 20 and later | 
| Middle East (UAE) | me-central-1 | social-messaging.me-central-1.amazonaws.com<br />social-messaging.me-central-1.api.aws | Version 20 and later | 
| Mexico (Central) | mx-central-1 | social-messaging.mx-central-1.amazonaws.com<br />social-messaging.mx-central-1.api.aws | Version 20 and later | 
| South America (São Paulo) | sa-east-1 | social-messaging.sa-east-1.amazonaws.com<br />social-messaging.sa-east-1.api.aws | Version 20 and later | 
| Asia Pacific (Hong Kong) | ap-east-1 | social-messaging.ap-east-1.amazonaws.com<br />social-messaging.ap-east-1.api.aws | Version 20 and later | 
| Asia Pacific (Taipei) | ap-east-2 | social-messaging.ap-east-2.amazonaws.com<br />social-messaging.ap-east-2.api.aws | Version 20 and later | 
| Asia Pacific (Osaka) | ap-northeast-3 | social-messaging.ap-northeast-3.amazonaws.com<br />social-messaging.ap-northeast-3.api.aws | Version 20 and later | 
| Asia Pacific (Jakarta) | ap-southeast-3 | social-messaging.ap-southeast-3.amazonaws.com<br />social-messaging.ap-southeast-3.api.aws | Version 20 and later | 
| Asia Pacific (Melbourne) | ap-southeast-4 | social-messaging.ap-southeast-4.amazonaws.com<br />social-messaging.ap-southeast-4.api.aws | Version 20 and later | 
| Asia Pacific (Malaysia) | ap-southeast-5 | social-messaging.ap-southeast-5.amazonaws.com<br />social-messaging.ap-southeast-5.api.aws | Version 20 and later | 
| Asia Pacific (Thailand) | ap-southeast-7 | social-messaging.ap-southeast-7.amazonaws.com<br />social-messaging.ap-southeast-7.api.aws | Version 20 and later | 
| Europe (Zurich) | eu-central-2 | social-messaging.eu-central-2.amazonaws.com<br />social-messaging.eu-central-2.api.aws | Version 20 and later | 
| Europe (Milan) | eu-south-1 | social-messaging.eu-south-1.amazonaws.com<br />social-messaging.eu-south-1.api.aws | Version 20 and later | 
| Europe (Paris) | eu-west-3 | social-messaging.eu-west-3.amazonaws.com<br />social-messaging.eu-west-3.api.aws | Version 20 and later | 
| Israel (Tel Aviv) | il-central-1 | social-messaging.il-central-1.amazonaws.com<br />social-messaging.il-central-1.api.aws | Version 20 and later | 
| US West (N. California) | us-west-1 | social-messaging.us-west-1.amazonaws.com<br />social-messaging.us-west-1.api.aws<br />social-messaging-fips.us-west-1.amazonaws.com<br />social-messaging-fips.us-west-1.api.aws | Version 20 and later | 