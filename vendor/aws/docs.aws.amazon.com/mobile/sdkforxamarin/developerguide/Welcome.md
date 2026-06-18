

The AWS Mobile SDK for Xamarin is now included in the AWS SDK for .NET. This guide references the archived version of the Mobile SDK for Xamarin.

# What is the AWS Mobile SDK for .NET and Xamarin?
<a name="Welcome"></a>

The AWS Mobile SDK for Xamarin is included in the SDK for .NET. For more information, see the [https://docs.aws.amazon.com//sdk-for-net/latest/developer-guide/welcome.html](https://docs.aws.amazon.com//sdk-for-net/latest/developer-guide/welcome.html).

This guide is no longer updated—it references the archived version of the Mobile SDK for Xamarin.

## Related guides and topics
<a name="related-xamarin-links"></a>
+ For front-end and mobile app development, we recommend using [AWS Amplify](https://aws.amazon.com/amplify).
+ For special considerations for using the AWS SDK for .NET for your Xamarin apps, see [Special considerations for Xamarin support](https://docs.aws.amazon.com//sdk-for-net/latest/developer-guide/xamarin-special.html) in the *AWS SDK for .NET Developer Guide*.
+ For reference purposes, you can find the archived version of the [AWS Mobile SDK for Xamarin](https://github.com/amazon-archives/aws-sdk-xamarin) on GitHub.

## Archived reference content
<a name="xamarin-archive"></a>

The archived AWS Mobile SDK for .NET and Xamarin provides a set of .NET libraries, code samples, and documentation to help developers build connected mobile applications for:
+ Xamarin iOS
+ Xamarin Android
+ Windows Phone Silverlight
+ Windows RT 8.1
+ Windows Phone 8.1

Mobile apps written using the AWS Mobile SDK for .NET and Xamarin call native platform APIs so they have the look and feel of native applications. The .NET libraries in the SDK provide C\# wrappers around the AWS REST APIs.

### What’s included in the AWS Mobile SDK for .NET and Xamarin?
<a name="what-s-included-in-the-sdk-xamarin"></a>

Supported AWS services currently include, but are not limited to:
+  [Amazon Cognito](https://aws.amazon.com/cognito) 
+  [Amazon S3](https://aws.amazon.com/s3/) 
+  [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) 
+  [Amazon Mobile Analytics](https://aws.amazon.com/mobileanalytics/) 
+  [Amazon Simple Notification Service](https://aws.amazon.com/sns/) 

These services enable you to authenticate users, save player and game data, save objects in the cloud, receive push notifications, and collect and analyze usage data.

The AWS Mobile SDK for .NET and Xamarin also allows you to use most of the AWS services supported by the AWS SDK for .NET. The AWS services specific to mobile development are explained in this developer guide. For more information about the AWS SDK for .NET, see:
+  [AWS SDK for .NET Getting Started Guide](https://docs.aws.amazon.com/AWSSdkDocsNET/latest/DeveloperGuide/net-dg-setup.html) 
+  [AWS SDK for .NET Developer Guide](https://docs.aws.amazon.com/AWSSdkDocsNET/latest/V3/DeveloperGuide/welcome.html) 
+  [AWS SDK for .NET API Reference](https://docs.aws.amazon.com/sdkfornet/latest/apidocs/Index.html) 

### Compatability
<a name="compatability"></a>

The AWS Mobile SDK for .NET and Xamarin is shipped as a Portable Class Library (PCL). PCL Support was added in Xamarin.Android 4.10.1 and Xamarin.iOS 7.0.4. Portable Library projects are built in to Visual Studio.

#### IDEs
<a name="ides"></a>

For more information on using IDEs with the archived version of the Xamarin SDK, see [Setting Up the AWS Mobile SDK for .NET and Xamarin](setup.md).

### How do I get the AWS Mobile SDK for .NET and Xamarin?
<a name="how-do-i-get-the-sdk-xamarin"></a>

To get the AWS Mobile SDK for .NET and Xamarin, see [Setting Up the AWS Mobile SDK for .NET and Xamarin](setup.md). The AWS Mobile SDK for .NET and Xamarin is distributed as NuGet packages. You can find a complete list of AWS service packages at [AWS SDK packages on NuGet](https://www.nuget.org/packages?q=awssdk&amp;page=1) or at the AWS SDK for .NET [GitHub Repository](https://github.com/aws/aws-sdk-net#nuget-packages).

### About the AWS Mobile Services
<a name="about-the-aws-mobile-services"></a>

#### Amazon Cognito Identity
<a name="xamarin-welcome-cognito-identity"></a>

All calls made to AWS require AWS credentials. Rather than hard-coding your credentials into your apps, we recommend that you use [Amazon Cognito Identity](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html) to provide AWS credentials to your application. Follow the instructions in [Setting Up the AWS Mobile SDK for .NET and Xamarin](setup.md) to obtain AWS credentials via Amazon Cognito.

Cognito also allows you to authenticate users using public log-in providers like Amazon, Facebook, Twitter, and Google as well as providers that support [OpenID Connect](https://aws.amazon.com/blogs/aws/openid-connect-support/). Cognito also works with unauthenticated users. Cognito provides temporary credentials with limited access rights that you specify with an [Identity and Access Management](https://aws.amazon.com/iam) (IAM) role. Cognito is configured by creating an identity pool that is associated with an IAM role. The IAM role specifies the resources/services your app may access.

To get started with Cognito Identity, see [Setting Up the AWS Mobile SDK for .NET and Xamarin](setup.md).

To learn more about Cognito Identity, see [Amazon Cognito Identity](cognito-identity.md).

#### Amazon Cognito Sync
<a name="amazon-cognito-sync"></a>

Cognito Sync is an AWS service and client library that enables cross-device syncing of application-related user data. You can use the Cognito Sync API to synchronize user profile data across devices and across login providers - Amazon, Facebook, Google, and your own custom identity provider.

To get started with Cognito Sync, see [Sync User Data with Cognito Sync](getting-started-sync-data.md).

For more information about Cognito Sync, see [Amazon Cognito Sync](cognito-sync.md).

#### Mobile Analytics
<a name="mobile-analytics"></a>

Amazon Mobile Analytics lets you collect, visualize, and understand app usage for your mobile apps. Reports are available for metrics on active users, sessions, retention, in-app revenue, and custom events, and can be filtered by platform and date range. Amazon Mobile Analytics is built to scale with your business and can collect and process billions of events from many millions of endpoints.

To get started using Mobile Analytics, see [Tracking App Usage Data with Amazon Mobile Analytics](getting-started-analytics.md).

For more information about Mobile Analytics, see [Amazon Mobile Analytics](analytics.md).

#### Dynamo DB
<a name="dynamo-db"></a>

Amazon DynamoDB is a fast, highly scalable, highly available, cost-effective, non-relational database service. DynamoDB removes traditional scalability limitations on data storage while maintaining low latency and predictable performance.

To get started using Dynamo DB, see [Store and Retrieve Data with DynamoDB](getting-started-store-retrieve-data.md).

For more information about Dynamo DB, see [Amazon DynamoDB](dynamodb.md).

#### Amazon Simple Notification Service
<a name="amazon-simple-notification-service"></a>

Amazon Simple Notification Service (SNS) is a fast, flexible, fully managed push notification service that lets you send individual messages or to fan-out messages to large numbers of recipients. Amazon Simple Notification Service makes it simple and cost effective to send push notifications to mobile device users, email recipients or even send messages to other distributed services.

To get started using SNS for Xamarin iOS, see [Receive Push Notifications using SNS (Xamarin iOS)](getting-started-sns-ios.md).

To get started using SNS for Xamarin Android, see [Receive Push Notifications using SNS (Xamarin Android)](getting-started-sns-android.md).

For more information about SNS, see [Amazon Simple Notification Service (SNS)](sns.md).