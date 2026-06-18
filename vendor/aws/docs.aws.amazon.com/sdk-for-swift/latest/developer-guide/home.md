

# AWS SDK for Swift Developer Guide
<a name="home"></a>

## What is the AWS SDK for Swift?
<a name="what-is-the-swift-sdk"></a>

Welcome to the AWS SDK for Swift, a pure Swift SDK that makes it easier to develop tools that take advantage of AWS services, including Amazon S3, Amazon EC2, DynamoDB, and more, all using the [Swift](https://swift.org) programming language.

## Supported targets
<a name="sdk-supported-platforms"></a>


| Platform | Operating system(s) | Processor | Notes | 
| --- | --- | --- | --- | 
| Apple (Darwin) | macOS, iOS/iPadOS, tvOS, watchOS, and visionOS. | Intel x86, Apple Silicon (arm64). | All Apple targets support 64-bit only. The only exception is watchOS, which also supports the hybrid 64/32-bit processors used in the Series 1 through Series 3 Apple watches. | 
| Linux | Amazon Linux 2 and Ubuntu. | Intel x86, arm64. |  | 
| AWS Lambda | Amazon Linux 2 | Intel x86, arm64. |  | 

The AWS SDK for Swift is not currently built, tested, or supported on Microsoft Windows. Support for Windows targets could be added in the future if customer demand warrants it.

## Get started with the SDK
<a name="get-started-with-the-sdk"></a>

To set up your development environment, see [Setting up the AWS SDK for Swift](setting-up.md). Then you can test drive the AWS SDK for Swift by creating your first project in [Getting started with the AWS SDK for Swift](getting-started.md).

For information on making requests to Amazon S3, DynamoDB, Amazon EC2, and other AWS services, see [Using the SDK for Swift](using.md).

## About this guide
<a name="about-this-guide"></a>

The AWS SDK for Swift Developer Guide covers how to install, configure, and use the SDK to create applications and tools in Swift that make use of AWS services.

This guide contains the following sections:

 [Getting started with the AWS SDK for Swift](getting-started.md)   
Explains how to create a project that imports the SDK for Swift using the Swift Package Manager in a shell environment on Linux and macOS, as well as how to add the SDK package to an Xcode project. Also included is a guide to building a project that uses the SDK to output a list of a user's Amazon S3 buckets.

[Configuring service clients in the AWS SDK for Swift](configuring.md)  
Content describing how to configure service clients to meet your requirements.

 [Using the SDK for Swift](using.md)   
Guides covering typical usage scenarios including creating service clients, performing common tasks, and more.

 [SDK for Swift code examples](swift_code_examples.md)  
Code examples demonstrating how to use various features of the SDK for Swift, as well as how to achieve specific tasks using the SDK.

 [Security in AWS SDK for Swift](security.md)   
Guides covering security topics in general, as well as considerations surrounding using the SDK for Swift in various contexts and while performing specific tasks.

 [Document history for the AWS SDK for Swift Developer Guide](doc-history.md)   
History of this document.

## Maintenance and support for SDK major versions
<a name="maintenance-and-support-for-sdk-major-versions"></a>

In general, the AWS SDK for Swift supports Apple's operating systems for two years after their release. Xcode and Swift versions are supported for a year after their release. For more details, see the SDK for Swift's [versioning policy](https://sdk.amazonaws.com/swift/api/awssdkforswift/latest/documentation/awssdkforswift/versioning) in the AWS SDK for Swift API Reference.

For information about maintenance and support for SDK major versions and their underlying dependencies, see the following in the [AWS SDKs and Tools Reference Guide](http://docs.aws.amazon.com/sdkref/latest/guide/).
+  [AWS SDKs and Tools Maintenance Policy](http://docs.aws.amazon.com/credref/latest/refdocs/maint-policy.html) 
+  [AWS SDKs and Tools Version Support Matrix](http://docs.aws.amazon.com/credref/latest/refdocs/version-support-matrix.html) 

## Additional resources
<a name="additional-resources"></a>

In addition to this guide, the following are valuable online resources for AWS SDK for Swift developers:
+  [AWS SDK for Swift API Reference](https://sdk.amazonaws.com/swift/api) 
+  [AWS SDK for Swift code examples](https://www.github.com/awsdocs/aws-doc-sdk-examples/tree/main/swift) 
+ [AWS SDK for Swift on GitHub](https://github.com/awslabs/aws-sdk-swift)

### Contributing to the SDK
<a name="contributing-to-the-sdk"></a>

Developers can also contribute feedback through the following channels:
+ [ Report bugs in the AWS SDK for Swift](https://github.com/awslabs/aws-sdk-swift/issues)