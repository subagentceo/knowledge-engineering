

# What is AWS Cloud Digital Interface Software Development Kit?
<a name="what-is"></a>

The AWS Cloud Digital Interface (CDI) SDK is a software development kit that makes it easy for AWS customers, technical partners, and independent software vendors (ISV) to build low-latency uncompressed video workflows at scale in the AWS Cloud.

With the AWS CDI SDK, you can easily and reliably share live, uncompressed video between applications on Amazon Elastic Compute Cloud (Amazon EC2) instances, AWS Media Services, and a variety of software solutions from independent software vendors (ISVs) and AWS partners. The AWS CDI SDK uses the Elastic Fabric Adapter (EFA) and Secure Reliable Datagram (SRD) protocol to allow you to send uncompressed video with network latency as low as a single frame of video between the sending and receiving applications. This system also helps to maintain the reliability of video broadcast facilities.

The AWS CDI SDK helps to migrate timing-critical uncompressed video workflows to the cloud, unlocking the agility and scalability of AWS deployments without the need to compromise on quality or latency.

## Who is AWS Cloud Digital Interface Software Development Kit for?
<a name="who"></a>

The AWS CDI SDK is for broadcasters, television professionals, video engineers, and anyone who wants to build live video workflows in the cloud.

## Pricing for the AWS Cloud Digital Interface Software Development Kit
<a name="pricing"></a>

There are no fees or usage charges for using your AWS account to place orders with AWS. All new AWS accounts require a credit card for billing and fraud prevention, but you will not incur charges for using the AWS CDI SDK. As long as you don't use other AWS services, the credit card on file isn't charged.

The AWS Free Tier allows you to get hands-on experience with AWS services such as Amazon EC2, Amazon S3, and Amazon RDS. The AWS Free Tier includes services with a free tier available for 12 months following your AWS sign-up date, and additional service offers that do not automatically expire at the end of your 12-month AWS Free Tier term. The 12 months of free tier access refers to AWS services and doesn't impact your use of the AWS CDI SDK, which is always free to use.

## Use cases for the AWS Cloud Digital Interface Software Development Kit
<a name="usecase"></a>

AWS customers are likely to use the CDI SDK in two fundamental ways: 
+ ISVs can use the CDI SDK to build horizontally scalable, distributed solutions in the cloud. The CDI SDK provides choices when it comes to cloud architecture, supporting distributed processing and horizontally scaled input and output across multiple Amazon EC2 instances. Clustered placement groups ensure colocation of Amazon EC2 instances and minimize the latency between hosts.
+ ISVs can use the CDI SDK as an interoperability standard between solutions within their own product lines as well as with solutions from other vendors. A modern production control room (PCR) or master control room (MCR) contains equipment used by end-customers that rarely comes from a single vendor. On premises, products interoperate via standards such as serial-digital-interface (SDI), a digital uncompressed video transmission standard that uses coaxial cable, or SMTPE-2110, which is uncompressed video over IP. For these facilities to exist in the cloud, they need an equivalent standard that allows the same level of interoperability. The CDI SDK acts as that standard. In these cases, clustered placement groups might not be desirable—or even possible—due to lack of cross account support.

## AWS Cloud Digital Interface Software Development Kit technology stack overview
<a name="techstack"></a>

Developers who use the CDI SDK must have some understanding of the C\+\+ programming language. When the CDI SDKI is downloaded and integrated into an ISV’s software code base, developers create a buffer that corresponds with the type of payload they want to transmit. Resolution and video-standard are key parameters in the sizing of this buffer.

CDI SDK usage revolves around two basic operations: The sending of payloads, and the receiving of payloads. To send a frame of video, a developer fills the buffer with video-frame data and then calls the send API. They receive a call-back response from the receiver when the content has been successfully delivered, allowing them to refill the buffer with the next video frame. On the receiving side, the developer receives a call-back message from the SDK notifying them that a new frame of data has arrived.

**Note**  
Depending on the proximity of the Amazon EC2 nodes communicating with the CDI SDK, and whether they are inside of a placement group or outside of a placement group, latency in the form of additional frame buffering might be needed to ensure that the connection meets the AWS performance goal of not more than one dropped frame in a 24 hour period.

The underlying technology of the Cloud Digital Interface is a live video SDK built on top of the scalable reliable datagram protocol (SRD) and the elastic fabric adapter (EFA). Using these technologies, the CDI SDK can transport live video between Amazon EC2 instances located within the same Availability Zone at data rates that support up to uncompressed ultra-high definition (UHD) content at sixty frames per second (4K@60p). You must make use of clustered placement groups to ensure optimal performance, but we support high definition workflows without this constraint. Today, the Elastic Fabric Adapter (EFA) is only available on a limited number of Nitro-enabled Amazon EC2 instance types. AWS networking will continue to assess customer needs in terms of EFA support in the future.

 For more information on EFA, see [Elastic fabric adapter](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/efa.html) in the *Amazon Elastic Compute Cloud User Guide for Linux Instances*.

![CDI SDK](http://docs.aws.amazon.com/CDI-SDK/latest/ug/images/CDISDK.png)
