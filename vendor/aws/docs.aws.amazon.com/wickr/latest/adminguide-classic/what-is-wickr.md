

This guide documents the classic version of the AWS Wickr administration console, released before March 13, 2025. For documentation on the new AWS Wickr administration console, see [ Administration Guide](https://docs.aws.amazon.com/wickr/latest/adminguide/what-is-wickr.html).

# What is AWS Wickr?
<a name="what-is-wickr"></a>

AWS Wickr is an end-to-end encrypted service that helps organizations and government agencies to communicate securely through one-to-one and group messaging, voice and video calling, file sharing, screen sharing, and more. Wickr can help customers overcome data retention obligations associated with consumer-grade messaging apps, and safely facilitate collaboration. Advanced security and administrative controls help organizations meet legal and regulatory requirements, and build custom solutions for data security challenges.

Information can be logged to a private, customer-controlled data store for retention and auditing purposes. Users have comprehensive administrative control over data, which includes setting permissions, configuring ephemeral messaging options, and defining security groups. Wickr integrates with additional services such as Active Directory (AD), single sign-on (SSO) with OpenID Connect (OIDC), and more. You can quickly create and manage a Wickr network through the AWS Management Console, and securely automate workflows using Wickr bots. To get started, see [Setting up for AWS Wickr](setting-up.md).

**Topics**
+ [Features of Wickr](#wickr-feature-overview)
+ [Regional availability](#regional-availability)
+ [Accessing Wickr](#wickr-accessing)
+ [Pricing](#wickr-pricing)
+ [Wickr end user documentation](#wickr-end-user-docs)

## Features of Wickr
<a name="wickr-feature-overview"></a>

**Enhanced security and privacy**  
Wickr uses 256-bit Advanced Encryption Standard (AES) end-to-end encryption for every feature. Communications are encrypted locally on user devices, and remain undecipherable in transit to anyone other than sender and receiver. Every message, call, and file is encrypted with a new random key, and no one but intended recipients (not even AWS) can decrypt them. Whether they are sharing sensitive and regulated data, discussing legal or HR matters, or even conducting tactical military operations, customers use Wickr to communicate when security and privacy are paramount.

**Data retention**  
Flexible administrative features are designed not only to safeguard sensitive information, but to retain data as required for compliance obligations, legal hold, and auditing purposes. Messages and files can be archived in a secure, customer-controlled data store.

**Flexible access**  
Users have multi-device (mobile, desktop) access and the ability to function in low-bandwidth environments, including disconnected and out-of-band communications.

**Administrative controls**  
Users have comprehensive administrative control over data, which includes setting permissions, configuring responsible ephemeral messaging options, and defining security groups.

**Powerful integrations and bots**  
Wickr integrates with additional services such as Active Directory, single sign-on (SSO) with OpenID Connect (OIDC), and more. Customers can quickly create and manage a Wickr network through the AWS Management Console, and securely automate workflows with Wickr Bots.

Following is a breakdown of Wickr collaboration offerings:
+ 1:1 and group messaging: Securely chat with your team in rooms with up to 500 members
+ Audio and video calling: Hold conference calls with up to 70 people
+ Screen sharing and broadcasting: Present with up to 500 participants
+ File sharing and saving: Transfer files up to 5GBs with unlimited storage
+ Ephemeral: Control expiration and burn-on-read timers
+ Global federation: Connect with Wickr users outside of your network

## Regional availability
<a name="regional-availability"></a>

Wickr is available in various AWS Regions throughout North America, Europe, and Asia. Wickr is also available in AWS GovCloud (US-West) Region. Each Region contains multiple Availability Zones, which are physically separate but connected by private, low-latency, high-bandwidth, and redundant network connections. These Availability Zones are used to provide enhanced availability, fault-tolerance, and minimized latency.

For a list of all the Regions where AWS Wickr is available, see [AWS Wickr endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/wickr.html) in the *AWS General Reference*. 

 To learn more about AWS Regions, see [Specify which AWS Regions your account can use](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html) in the *AWS General Reference*. For more information about the number of Availability Zones available in each Region, see [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/). 

## Accessing Wickr
<a name="wickr-accessing"></a>

Administrators access the AWS Management Console for Wickr at [https://console.aws.amazon.com/wickr/](https://console.aws.amazon.com/wickr/). Before you get started using Wickr you should complete the [Setting up for AWS Wickr](setting-up.md) and [Getting started with AWS Wickr](getting-started.md) guides.

**Note**  
Wickr API access is available only for Wickr Enterprise (self-hosted) and not for AWS Wickr.

End users access Wickr through the Wickr client. For more information, see the *[AWS Wickr User Guide](https://docs.aws.amazon.com/wickr/latest/userguide/)*.

## Pricing
<a name="wickr-pricing"></a>

Wickr is available in different plans for individuals, small teams, and large businesses. For more information, see [AWS Wickr Pricing](https://aws.amazon.com/wickr/pricing/).

## Wickr end user documentation
<a name="wickr-end-user-docs"></a>

If you are an end user of the Wickr client and need to access its documentation, see the [AWS Wickr User Guide](https://docs.aws.amazon.com/wickr/latest/userguide/).