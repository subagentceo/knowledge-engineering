

**End of support notice:** On October 30, 2026, AWS will end support for Amazon Pinpoint. After October 30, 2026, you will no longer be able to access the Amazon Pinpoint console or Amazon Pinpoint resources (endpoints, segments, campaigns, journeys, and analytics). For more information, see [Amazon Pinpoint end of support](https://docs.aws.amazon.com/console/pinpoint/migration-guide). **Note:** APIs related to SMS, voice, mobile push, OTP, and phone number validate are not impacted by this change and are supported by AWS End User Messaging.

# Welcome to the Amazon Pinpoint Resilient Architecture Guide
<a name="welcome"></a>

Welcome to the *Amazon Pinpoint Resilient Architecture Guide*. This guide describes important factors to consider when designing a multi-Region architecture for Amazon Pinpoint. It also includes example reference architectures.

Many Amazon Pinpoint customers use Amazon Pinpoint to run mission-critical applications and services. For use cases that can only tolerate minimal downtime, it's important to consider deploying your workloads across several AWS Regions.

The architectures described in this guide might not fit every use case. Determining the right design for your needs requires an understanding of your application's business criticality, dependencies, workload volumes, and the nature of the work that it performs. Also keep in mind that this guide only considers multi-Region designs for Amazon Pinpoint. If your AWS use case includes other services, you should consider those workloads when you design a resilient architecture. If your organization has an AWS Enterprise Support plan, we recommend that you work closely with your Account Manager and Solutions Architects to develop an architecture that meets your specific requirements.

For information about using the features of Amazon Pinpoint through the AWS Management Console, see the [Amazon Pinpoint User Guide](https://docs.aws.amazon.com/pinpoint/latest/userguide/). 

For information related to integrating Amazon Pinpoint with your web and mobile applications, see the [Amazon Pinpoint Developer Guide](https://docs.aws.amazon.com/pinpoint/latest/developerguide/). 

For reference content related to the Amazon Pinpoint API, see the [Amazon Pinpoint API Reference](https://docs.aws.amazon.com/pinpoint/latest/apireference/).

## What makes a workload "resilient"?
<a name="welcome-resiliency"></a>

A resilient workload is able to recover when stressed by load (more requests for service), attacks (either accidentally through a bug, or deliberately), and the failure of any component in the workload.

For more information about resiliency, see [Resiliency](https://wa.aws.amazon.com/wellarchitected/2020-07-02T19-33-23/wat.concept.resiliency.en.html) on the AWS Well-Architected Framework website.

## About Amazon Pinpoint
<a name="welcome-pinpoint"></a>

Amazon Pinpoint is an AWS service that you can use to engage with your customers across multiple messaging channels. You can use Amazon Pinpoint to send push notifications, in-app notifications, emails, text messages, voice messages, and messages over custom channels. It includes segmentation, campaign, and journey features that can help you send the right message to the right customer at the right time over the right channel.

## Regional availability
<a name="welcome-regions"></a>

Amazon Pinpoint is available in several AWS Regions in North America, Europe, Asia, and Oceania. In each Region, AWS maintains multiple Availability Zones. These Availability Zones are physically isolated from each other, but they are united by private, low-latency, high-throughput, and highly redundant network connections. These Availability Zones enable AWS to provide high levels of availability and redundancy, while also minimizing latency.

To learn more about AWS Regions, see [Specify which AWS Regions your account can use](https://docs.aws.amazon.com/general/latest/gr/rande-manage.html) in the *Amazon Web Services General Reference*. 

For a list of all the Regions where Amazon Pinpoint is currently available and the endpoint for each Region, see [Amazon Pinpoint endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/pinpoint.html) and [AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#pinpoint_region) in the *Amazon Web Services General Reference*. 

To learn more about the number of Availability Zones that are available in each Region, see [AWS global infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/).

## Additional resources
<a name="welcome-resources"></a>

AWS provides several additional resources for designing resilient architectures. For an overview of disaster recovery at AWS and related concepts, see the [AWS Disaster Recovery](https://disaster-recovery.workshop.aws/en/) Workshop and the [Reliability Pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html) section in the [Well-Architected Framework documentation](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html).