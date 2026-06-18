

**End of support notice:** On October 30, 2026, AWS will end support for Amazon Pinpoint. After October 30, 2026, you will no longer be able to access the Amazon Pinpoint console or Amazon Pinpoint resources (endpoints, segments, campaigns, journeys, and analytics). For more information, see [Amazon Pinpoint end of support](https://docs.aws.amazon.com/console/pinpoint/migration-guide). **Note:** APIs related to SMS, voice, mobile push, OTP, and phone number validate are not impacted by this change and are supported by AWS End User Messaging.

# What is Amazon Pinpoint?
<a name="welcome"></a>

Amazon Pinpoint is an AWS service that you can use to engage with your customers across multiple messaging channels. You can use Amazon Pinpoint to send push notifications, emails, SMS text messages, or voice messages.

The information in this developer guide is intended for application developers. This guide contains information about using the features of Amazon Pinpoint programmatically. It also contains information of particular interest to mobile app developers, such as procedures for [integrating analytics and messaging features with your application](integrate.md).

Amazon Pinpoint is available in several AWS Regions in North America, Europe, Asia, and Oceania. For more information about AWS Regions, see [Managing AWS Regions](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-regions.html) in the *Amazon Web Services General Reference*. For a list of all the Regions where Amazon Pinpoint is currently available, see [Amazon Pinpoint endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/pinpoint.html) and [AWS service endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#pinpoint_region) in the *Amazon Web Services General Reference*. To learn more about the number of Availability Zones that are available in each Region, see [AWS global infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/).

For more information about Amazon Pinpoint, see the following guides:
+ [Amazon Pinpoint API Reference](https://docs.aws.amazon.com/pinpoint/latest/apireference/)
+ [Amazon Pinpoint SMS and voice API](https://docs.aws.amazon.com/pinpoint-sms-voice/latest/APIReference/)
+ [Amazon Pinpoint User Guide](https://docs.aws.amazon.com/pinpoint/latest/userguide/)

## Use Amazon Pinpoint to message audience segments and analyze data
<a name="welcome-features"></a>

You can use Amazon Pinpoint to define audience segments, send messaging campaigns and transactional messages, and use metrics to analyze user behavior.

### Define audience segments
<a name="welcome-segments"></a>

Reach the right audience for your messages by [defining audience segments](segments.md). A segment designates which users receive the messages that are sent from a campaign. You can define dynamic segments based on data that's reported by your application, such as operating system or mobile device type. You can also import static segments that you define by using another service or application.

### Schedule messaging campaigns
<a name="welcome-campaigns"></a>

Engage your audience by [creating a messaging campaign](campaigns.md). A campaign sends tailored messages on a schedule that you define. You can create campaigns that send mobile push, email, or SMS messages.

To experiment with alternative campaign strategies, set up your campaign as an A/B test, and analyze the results with Amazon Pinpoint analytics.

### Send transactional messages
<a name="welcome-transactional"></a>

Keep your customers informed by sending transactional mobile push and SMS messages—such as new account activation messages, order confirmations, and password reset notifications— directly to specific users. You can send transactional messages by using the Amazon Pinpoint REST API.

### Use analytics and metrics reporting
<a name="welcome-analyze"></a>

Gain insights about your audience and the effectiveness of your campaigns by using the analytics that Amazon Pinpoint provides. You can view trends about your users' level of engagement, purchase activity, demographics, and more. You can also monitor your message traffic by viewing metrics such as the total number of messages that were sent or opened for a campaign or application. Through the Amazon Pinpoint API, your application can report custom data, which Amazon Pinpoint makes available for analysis, and you can query analytics data for certain standard metrics.

To analyze or store analytics data outside Amazon Pinpoint, you can configure Amazon Pinpoint to [stream the data](event-streams.md) to Amazon Kinesis.