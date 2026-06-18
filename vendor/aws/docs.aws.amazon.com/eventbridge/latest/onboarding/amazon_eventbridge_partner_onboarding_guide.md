

# Amazon EventBridge Partner Onboarding Guide
<a name="amazon_eventbridge_partner_onboarding_guide"></a>

 [Amazon EventBridge](https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html) enables customers to build event-driven applications that subscribe to events from any participating software-as-a-service (SaaS) product without needing to write undifferentiated connection code. SaaS providers can enhance and extend their platform by publishing their events to EventBridge. They can rely on EventBridge to manage the routing of those events to customers in a reliable and secure manner. This capability enables customers to react to events emitted by SaaS applications as easily and reliably as they react to events originating from other AWS services. The events can then be sent to AWS services such as AWS Lambda, Amazon Simple Queue Service (Amazon SQS), Amazon Simple Notification Service (Amazon SNS), or Amazon Kinesis Data Firehose.

EventBridge provides a push API, [PutPartnerEvents](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_PutPartnerEvents.html), for SaaS applications to use to push events when a change happens in the SaaS system. After EventBridge receives an event, it routes it to the event buses of the appropriate customer. The event is then matched against rules configured by the customers and delivered to the appropriate targets in those customers’ accounts.

Amazon EventBridge is a set of APIs that make it easy for SaaS providers to inject events for their customers' applications to process inside AWS. This document describes how AWS Partner Network (APN) partners can set up integration with EventBridge.

## Terminology
<a name="AWS_EventBridge_Partner_Onboarding_Terminology"></a>

 **Partner event source**   
A resource created by a partner that can be "accepted" by customers as a source of events. To accept a partner event source, the customer creates a custom event bus tied to a partner event source with the same name. Each partner event source is customer-specific. For a partner to relay a type of event to multiple customers, the partner must create an event source for each customer.

 **Default event bus**   
An existing EventBridge resource that receives events from a variety of sources and delivers events. Currently, default event buses cannot be created or deleted, and each AWS customer has one default event bus.

 **Custom event bus for partner event source**   
A new EventBridge resource that can be created by customers and matched to event sources created by SaaS partners. A custom event bus receives events pushed by the partner and delivers them.

## Resources
<a name="AWS_EventBridge_Partner_Onboarding_Terminology_Resources"></a>

 [Amazon EventBridge Documentation](https://docs.aws.amazon.com/eventbridge/index.html) 

 [User Guide](https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html) 

 [API Reference](https://docs.aws.amazon.com/eventbridge/latest/APIReference/Welcome.html) 

 [CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/events/index.html) 

## Sending events
<a name="AWS_EventBridge_Partner_Onboarding_SendingEvents"></a>

In this process there are two roles, the AWS customer and the partner’s customer. In many cases these roles are be played by the same person, but in some cases there may be separate administrators responsible for managing a company’s AWS account and their SaaS application. The following diagram shows how events are sent.

![image1](http://docs.aws.amazon.com/eventbridge/latest/onboarding/images/image1.jpg)


The flow for this diagram is as follows.

1. The AWS customer looks up the AWS account ID and provides it to the partner’s customer (for example, 000000000101).

1. The partner’s customer navigates to the partner system, selects a partner resource that generates events (for example, acct1/repo1), and enters the AWS customer account ID along with the AWS Region where they want to receive events.

1. The partner system creates an event source by calling the [https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_CreatePartnerEventSource.html](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_CreatePartnerEventSource.html) in the Region specified by the customer and passing in the customer’s AWS account ID and a unique name for the event source.

1. The partner sends events to the event source.

1. The AWS customer creates a new custom event bus associated with the partner event source using the console or the `CreateEventBus` API.

1. The AWS customer adds rules and targets to the custom event bus to deliver events to other AWS services.

**Note**  
The partner can send events to an event source as soon as the event source is created. There is no need to wait until a customer associates an event bus before sending events.

 **Partner delete** 

The partner can delete an event source at any time by calling the [https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_DeletePartnerEventSource.html](https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_DeletePartnerEventSource.html) API. When this happens, the AWS customer sees that the event source is now DELETED. If the customer had an event bus associated with that event source, the event bus continues to exist but cannot receive events.

## Event source names
<a name="AWS_EventBridge_Partner_Onboarding_Names"></a>

Event sources and partner event buses share the same name, which must follow a specific convention. The name consists of two pieces: the partner name and a name that reflects the resource that will generate events. Both of these pieces must be ASCII strings so that we can use an Amazon Resource Name (ARN) to identify a partner event bus. 

 **Partner event source name**   
<partner\_name>/<event\_generator\_name>

 **Partner event bus name**   
<partner\_name>/<event\_generator\_name>

 **Partner event source ARN**   
arn:aws:events:<region>::event-source/aws.partner/<partner\_name>/<event\_generator\_name>

 **Partner event bus ARN**   
arn:aws:events:<region>:<aws\_customer\_account\_id>:event-bus/aws.partner/<partner\_name>/<event\_generator\_name>

The **partner name** is determined as part of partner registration and is a unique identifier that provides the AWS customer with confidence that the owner of the event source is a trusted APN partner and is who they claim to be. Each partner name begins with aws.partner/ followed by a fully qualified domain name owned by the partner. The fully qualified domain name (FQDN) used should be one that customers readily associate with the partner or SaaS product.

The **event generator name** is determined by the partner when creating the event source, and it should uniquely identify an event-generating resource within the partner system. It should ideally provide the AWS customer with enough information to decide whether to create a partner event bus. For example, multiple users of a SaaS system can own different resources with the same name (for example, “repo1”). To disambiguate between them, the event generator name should contain the account name as well as the repository name (for example, “acct1/repo1”). The resource names and ARNs for this example are as follows:

 **Partner event source name**   
aws.partner/partner\_x/acct1/repo1

 **Partner event bus name**   
aws.partner/partner\_x/acct1/repo1

 **Partner event source ARN**   
arn:aws:events:us-east-2::event-source/aws.partner/partner\_x/acct1/repo1

 **Partner event bus ARN**   
arn:aws:events:us-east-2:000000000101:event-bus/aws.partner/partner\_x/acct1/repo1

## Event source states
<a name="EventBridge-Partner-Onboarding-States"></a>

Event sources can be in one of the following states. From the partner side, this state can be found on the event source account rather than the event source itself.
+ Nonexistent (∅)
  + The event source either has never been created, has been deleted, or has expired.
  + Rejects events.
+ PENDING
  + The event source was recently created.
  + Accepts events.
+ ACTIVE
  + The AWS customer has created the corresponding partner event bus.
  + Accepts events.

The following diagram shows the relationship between these states.

![image2](http://docs.aws.amazon.com/eventbridge/latest/onboarding/images/image2.jpg)


From the AWS customer side, event sources can be in one of the following states.
+ Non-existent (∅), event bus does not exist
  + The event source either has never been created, has been deleted, or has expired
  + Rejects events sent by partner
+ PENDING, event bus does not exist
  + The event source was recently created
  + Visible to both the partner and the AWS customer
  + Accepts events sent by partner, but does not deliver them to customer
+ ACTIVE, event bus exists
  + The AWS customer created the corresponding partner event bus
  + Accepts events sent by the partner and delivers them to customer-defined rules
+ DELETED, event bus exists
  + After the event source became ACTIVE, the partner deleted it
  + Informs the AWS customer that the partner is no longer set up to send events
  + Allows the partner to recreate the corresponding event source without unexpectedly resurrecting a partner event bus along with any rules attached to it
  + Rejects events sent by partner
+ PENDING, event bus exists
  + After the event source became DELETED, the partner re-created it
  + Allows the partner to recreate the corresponding event source without unexpectedly resurrecting a partner event bus along with any rules attached to it
  + Allows the AWS customer to reattach an existing partner event bus to an event source without deleting the partner event bus
  + Accepts events sent by the partner, but does not deliver them to customer

The following diagram shows the relationship between these states.

![image3](http://docs.aws.amazon.com/eventbridge/latest/onboarding/images/image3.jpg)


## Event source expiration
<a name="event_source_expiration"></a>

Periodically, AWS checks all PENDING event sources. Any event sources that are in a PENDING state for over 7 days are automatically deleted. This feature addresses two issues:
+ A partner customer can make a mistake, by sharing events with a variety of AWS accounts that they do not own. This could confuse the AWS customer by presenting them with a large list of event sources, most of which are irrelevant or malicious. Automatic expiration helps drastically reduce the noise.
+ A partner does not want to send events that no one is listening to. Automatic expiration allows AWS to give partners a definitive response that no one is listening.