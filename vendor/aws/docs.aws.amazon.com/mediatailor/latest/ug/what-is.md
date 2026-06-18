

# What is AWS Elemental MediaTailor?
<a name="what-is"></a>

AWS Elemental MediaTailor is a scalable ad insertion and channel assembly service that runs in the AWS Cloud. With MediaTailor, you can serve targeted ad content to viewers and create linear streams while maintaining broadcast quality in over-the-top (OTT) video applications. MediaTailor ad insertion supports Apple HTTP Live Streaming (HLS) and MPEG Dynamic Adaptive Streaming over HTTP (DASH) for video on demand (VOD) and live workflows.

AWS Elemental MediaTailor ad insertion offers important advances over traditional ad-tracking systems: ads are better monetized, more consistent in video quality and resolution, and easier to manage across multi-platform environments. MediaTailor simplifies your ad workflow by allowing all IP-connected devices to render ads in the same way as they render other content. The service also offers advanced tracking of ad views, which further increases the monetization of content.

AWS Elemental MediaTailor channel assembly is a manifest-only service that allows you to create linear streaming channels using your existing video on demand (VOD) content. MediaTailor never touches your content segments, which are served directly from your origin server. Instead, MediaTailor fetches the manifests from your origin, and uses them to assemble a live sliding manifest window that references the underlying content segments.

 MediaTailor channel assembly makes it easy to monetize your channel by inserting ad breaks into your stream without having to condition it with SCTE-35 markers. You can use channel assembly with MediaTailor ad insertion, or another server-side ad insertion service. 

## Origin server requirements
<a name="what-is-origin-requirements"></a>

AWS Elemental MediaTailor has specific requirements for origin server communication:
+ **Supported ports** - MediaTailor only accepts origins using standard HTTP and HTTPS ports:
  + Port 80 for HTTP connections
  + Port 443 for HTTPS connections

  MediaTailor does not support custom ports for origin server communication.
+ **Protocol requirements** - For secure communication, MediaTailor requires HTTPS for certain origin types and authentication scenarios. For more information, see [Integrating a content source for MediaTailor ad insertion](integrating-origin.md).

## Related services
<a name="related-services"></a>
+ **Amazon CloudFront** is a global content delivery network (CDN) service that securely delivers data and videos to your viewers. Use CloudFront to deliver content with the best possible performance. For more information about CloudFront, see the [Amazon CloudFront website](https://aws.amazon.com/cloudfront/).
+ **AWS Elemental MediaPackage** is a just-in-time packaging and origination service that customizes live video assets for distribution in a format that is compatible with the device that makes the request. Use AWS Elemental MediaPackage as an origin server to prepare content and add ad markers before sending streams to MediaTailor. For more information about how MediaTailor works with origin servers, see [How MediaTailor ad insertion works](what-is-flow.md).
+ **AWS Identity and Access Management (IAM)** is a web service that helps you securely control access to AWS resources for your users. Use IAM to control who can use your AWS resources (authentication) and what resources they can use in which ways (authorization). For more information, see [Setting up AWS Elemental MediaTailor](setting-up.md).

## Accessing MediaTailor
<a name="accessing-emt"></a>

You can access MediaTailor using the service's console.

Access your AWS account by providing credentials that verify that you have permissions to use the services. 

To log in to the MediaTailor console, use the following link: **https://console.aws.amazon.com/mediatailor/home**.

## Pricing for MediaTailor
<a name="pricing"></a>

As with other AWS products, there are no contracts or minimum commitments for using MediaTailor. You are charged based on your use of the service. For more information, see [MediaTailor pricing](https://aws.amazon.com/mediatailor/pricing/).

## Regions for MediaTailor
<a name="regions-endpoints"></a>

To reduce data latency in your applications, MediaTailor offers regional endpoints to make your requests. To view the list of Regions in which MediaTailor is available, see [Regional endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints).