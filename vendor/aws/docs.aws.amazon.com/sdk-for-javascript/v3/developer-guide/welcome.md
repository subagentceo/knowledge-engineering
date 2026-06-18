

 The [AWS SDK for JavaScript V3 API Reference Guide](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) describes in detail all the API operations for the AWS SDK for JavaScript version 3 (V3). 

# What's the AWS SDK for JavaScript?
<a name="welcome"></a>

Welcome to the AWS SDK for JavaScript Developer Guide. This guide provides general information about setting up and configuring the AWS SDK for JavaScript. It also walks you through examples and tutorial of running various AWS services using the AWS SDK for JavaScript.

The [AWS SDK for JavaScript v3 API Reference Guide](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/) provides a JavaScript API for AWS services. You can use the JavaScript API to build libraries or applications for [Node.js](https://nodejs.org/en/) or the browser.

![Relationship between JavaScript environments, the SDK, and Amazon Web Services](http://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/images/sdk-overview-v3.png)


## Get started with the SDK
<a name="get-started-with-the-jssdkv3"></a>

If you’re ready to get hands-on with the SDK, follow the examples at [Get started with the AWS SDK for JavaScript](getting-started.md).

To set up your development environment, see [Set up the SDK for JavaScript](setting-up.md).

If you’re currently using version 2.x of SDK for JavaScript, see [Migrate to v3](migrating.md) for specific guidance.

If you’re looking for code examples for AWS services, see [SDK for JavaScript (v3) code examples](javascript_code_examples.md).

## Maintenance and support for SDK major versions
<a name="sdks-major-versions-maintenance-support"></a>

For information about maintenance and support for SDK major versions and their underlying dependencies, see the following in the [AWS SDKs and Tools Reference Guide](https://docs.aws.amazon.com/sdkref/latest/guide/overview.html):
+ [AWS SDKs and tools maintenance policy](https://docs.aws.amazon.com/sdkref/latest/guide/maint-policy.html)
+ [AWS SDKs and tools version support matrix](https://docs.aws.amazon.com/sdkref/latest/guide/version-support-matrix.html)

## Using the SDK with Node.js
<a name="welcome_node"></a>

Node.js is a cross-platform runtime for running server-side JavaScript applications. You can set up Node.js on an Amazon Elastic Compute Cloud (Amazon EC2) instance to run on a server. You can also use Node.js to write on-demand AWS Lambda functions.

Using the SDK for Node.js differs from the way in which you use it for JavaScript in a web browser. The difference comes from the way in which you load the SDK and in how you obtain the credentials needed to access specific web services. When use of particular APIs differs between Node.js and the browser, we call out those differences.

## Using the SDK with AWS Amplify
<a name="welcome_amplify"></a>

For browser-based web, mobile, and hybrid apps, you can also use the [AWS Amplify library on GitHub](https://github.com/aws/aws-amplify). It extends the SDK for JavaScript, providing a declarative interface.

**Note**  
Frameworks such as Amplify might not offer the same browser support as the SDK for JavaScript. See the framework's documentation for details.

## Using the SDK with web browsers
<a name="welcome_web"></a>

All major web browsers support execution of JavaScript. JavaScript code that is running in a web browser is often called *client-side JavaScript*.

For a list of browsers that are supported by the AWS SDK for JavaScript, see [Supported web browsers](setting-up.md#browsers-supported).

Using the SDK for JavaScript in a web browser differs from the way in which you use it for Node.js. The difference comes from the way in which you load the SDK and in how you obtain the credentials needed to access specific web services. When use of particular APIs differs between Node.js and the browser, we call out those differences.

### Using browsers in V3
<a name="v3_browsers"></a>

V3 enables you to bundle and include in the browser only the SDK for JavaScript files you require, reducing overhead.

To use V3 of the SDK for JavaScript in your HTML pages, you must bundle the required client modules and all required JavaScript functions into a single JavaScript file using Webpack, and add it in a script tag in the `<head>` of your HTML pages. For example:

```
<script src="./main.js"></script>
```

**Note**  
For more information about Webpack, see [Bundle applications with webpack](webpack.md).

To use V2 of the SDK for JavaScript, you add a script tag that points to the latest version of the V2 SDK instead. For more information, see the [sample](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-browser.html#getting-started-browser-write-sample) in the AWS SDK for JavaScript Developer Guide v2.

### Common use cases
<a name="welcome_use_cases"></a>

Using the SDK for JavaScript in browser scripts makes it possible to realize a number of compelling use cases. Here are several ideas for things you can build in a browser application by using the SDK for JavaScript to access various web services.
+ Build a custom console to AWS services in which you access and combine features across Regions and services to best meet your organizational or project needs.
+ Use Amazon Cognito Identity to enable authenticated user access to your browser applications and websites, including use of third-party authentication from Facebook and others.
+ Use Amazon Kinesis to process click streams or other marketing data in real time.
+ Use Amazon DynamoDB for serverless data persistence, such as individual user preferences for website visitors or application users.
+ Use AWS Lambda to encapsulate proprietary logic that you can invoke from browser scripts without downloading and revealing your intellectual property to users.

### About the examples
<a name="welcome_examples"></a>

You can browse the SDK for JavaScript examples in the [AWS Code Example Repository](https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/javascriptv3/example_code).

### Resources
<a name="welcome_resources"></a>

In addition to this guide, the following online resources are available for SDK for JavaScript developers:
+ [AWS SDK for JavaScript V3 API Reference Guide](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
+  [AWS SDKs and Tools Reference Guide](https://docs.aws.amazon.com/sdkref/latest/guide/): Contains settings, features, and other foundational concepts common among AWS SDKs. 
+ [JavaScript Developer Blog](https://aws.amazon.com/blogs/developer/category/programing-language/javascript/)
+ [AWS re:Post](https://repost.aws/en/search/content?globalSearch=aws-sdk-js)
+ [JavaScript examples in the AWS Code Library](https://docs.aws.amazon.com/code-library/latest/ug/javascript_3_code_examples.html)
+ [AWS Code Example Repository](https://github.com/awsdocs/aws-doc-sdk-examples/tree/master/javascriptv3/example_code)
+ [Gitter channel](https://gitter.im/aws/aws-sdk-js)
+ [Stack Overflow](https://stackoverflow.com/search?tab=newest&q=aws-sdk-js)
+ [Stack Overflow questions taggedAWS -sdk-js](https://stackoverflow.com/questions/tagged/aws-sdk-js?sort=newest)
+ GitHub
  + [SDK Source](https://github.com/aws/aws-sdk-js-v3/)
  + [Documentation Source](https://github.com/awsdocs/aws-sdk-for-javascript-v3)