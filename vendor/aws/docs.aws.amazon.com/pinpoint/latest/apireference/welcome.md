

**End of support notice:** On October 30, 2026, AWS will end support for Amazon Pinpoint. After October 30, 2026, you will no longer be able to access the Amazon Pinpoint console or Amazon Pinpoint resources (endpoints, segments, campaigns, journeys, and analytics). For more information, see [Amazon Pinpoint end of support](https://docs.aws.amazon.com/console/pinpoint/migration-guide). **Note:** APIs related to SMS, voice, mobile push, OTP, and phone number validate are not impacted by this change and are supported by AWS End User Messaging.

# Welcome
<a name="welcome"></a>

Welcome to the *Amazon Pinpoint API Reference*. This guide provides information about Amazon Pinpoint API resources, including supported HTTP methods, parameters, and schemas.

Amazon Pinpoint is an AWS service that you can use to engage with your customers across multiple messaging channels. You can use Amazon Pinpoint to send push notifications, email, SMS text messages, and voice messages.

If you're new to Amazon Pinpoint, you might find it helpful to also review the [Amazon Pinpoint Developer Guide](https://docs.aws.amazon.com/pinpoint/latest/developerguide/). The *Amazon Pinpoint Developer Guide* provides tutorials, code samples, and procedures that demonstrate how to use Amazon Pinpoint features programmatically and how to integrate Amazon Pinpoint functionality into mobile apps and other types of applications. The guide also provides information about key topics such as Amazon Pinpoint integration with other AWS services and the quotas that apply to using the service.

## Choosing between Amazon Pinpoint and Amazon Simple Email Service (SES)
<a name="sestransaction"></a>

If you send a large number of transactional emails, such as purchase confirmations or password reset messages, consider using Amazon SES. Amazon SES has an API and an SMTP interface, both of which are well suited to sending email from your applications or services. It also offers additional email features, including email receiving capabilities, configuration sets, and sending authorization capabilities.

Amazon SES also includes an SMTP interface that you can integrate with your existing third-party applications, including customer relationship management (CRM) services such as Salesforce. For more information about sending email using Amazon SES, see [Amazon SES API v2](https://docs.aws.amazon.com/ses/latest/APIReference-V2/welcome.html).

## Regional availability
<a name="rest-api-pin-endpoint"></a>

The Amazon Pinpoint API is available in several AWS Regions and it provides an endpoint for each of these Regions. For a list of all the Regions and endpoints where the API is currently available, see [AWS Service Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#pinpoint_region) and [Amazon Pinpoint endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/pinpoint.html) in the *Amazon Web Services General Reference*. To learn more about AWS Regions, see [Managing AWS Regions](https://docs.aws.amazon.com/general/latest/gr/rande-manage.html) in the *Amazon Web Services General Reference*. 

In each Region, AWS maintains multiple Availability Zones. These Availability Zones are physically isolated from each other, but are united by private, low-latency, high-throughput, and highly redundant network connections. These Availability Zones enable us to provide very high levels of availability and redundancy, while also minimizing latency. To learn more about the number of Availability Zones that are available in each Region, see [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/).

## Example REST request and response
<a name="rest-reference-example"></a>

The following is an example of a REST request that you send to Amazon Pinpoint:

```
GET /v1/apps/a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6/campaigns
Accept: application/json
```



```
Authorization: AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20161127/us-east-1/mobiletargeting/aws4_request, SignedHeaders=accept;host;x-amz-date, Signature=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1b2c3d4e5f6
Host: pinpoint.us-east-1.amazonaws.com
X-Amz-Date: 20161127T202324Z
```

Following this request, Amazon Pinpoint returns a response that includes the following header:

```
200
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 94237
Content-Type: application/json
Date: Sun, 27 Nov 2016 20:23:28 GMT
X-Amz-Cf-Id: BerfOyKjyRgVGEKS2q3gHdWBZYFrqq0w4KmpamCCbY6o_xsAzxR1Iw==
x-amzn-RequestId: 595c3386-b4df-11e6-855b-61b43929a1e2
X-Amzn-Trace-Id: Root=1-583b40bd-ca765532129bcbb6c5016375
```

## Hypertext Application Language
<a name="hal-overview"></a>

Amazon Pinpoint provides a resource-based API that uses Hypertext Application Language (HAL). HAL provides a standard convention for expressing the resources and relationships of an API as hyperlinks. Using HAL, you use HTTP methods—for example, GET, PUT, POST, DELETE—to submit requests and to receive information about the API in the response. Applications can use the information that's returned to explore the functionality of the API. For more information about HAL, see the draft [JSON Hypertext Application Language](http://tools.ietf.org/html/draft-kelly-json-hal-06) specification. 

To request a HAL response from Amazon Pinpoint, specify `application/hal+json` in the `Accept` request header.