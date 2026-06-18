

# What is the Amazon DCV Web Client SDK?
<a name="what-is"></a>

**Note**  
Amazon DCV was previously known as NICE DCV.

Amazon DCV is a high-performance remote display protocol. It lets you securely deliver remote desktops and application streaming from any cloud or data center to any device, over varying network conditions. By using Amazon DCV with Amazon EC2, you can run graphics-intensive applications remotely on Amazon EC2 instances. You can then stream the results to more modest client machines, which eliminates the need for expensive dedicated workstations.

The Amazon DCV Web Client SDK is a JavaScript library that you can use to develop your own Amazon DCV web browser client applications. Your end users can use these applications to connect to and interact with a running Amazon DCV session.

Using the Amazon DCV Web Client SDK as a building block, you can build customized web applications that provide users with instant access to their desktop or applications from anywhere, with a responsive and fluid performance that is almost indistinguishable from a natively installed application.

This guide explains how to use the Amazon DCV Web Client SDK to build your custom web browser client applications to interact with Amazon DCV sessions within your workflows.

**Topics**
+ [Prerequisites](#prereq)
+ [Supported features](#features)
+ [Browser support](#browser)
+ [Versioning convention](#versioning)

## Prerequisites
<a name="prereq"></a>

Before you start working with the Amazon DCV Web Client SDK, ensure that you're familiar with Amazon DCV and Amazon DCV sessions. For more information, see the [Amazon DCV Administrator Guide](https://docs.aws.amazon.com/dcv/latest/adminguide/what-is-dcv.html).

The Amazon DCV Web Client SDK supports Amazon DCV server version 2020 and later.

## Supported features
<a name="features"></a>

You can build custom web browser client applications that support the following Amazon DCV features:
+ Connect to Windows Amazon DCV servers
+ Connect to Linux Amazon DCV servers
+ Manage streaming modes
+ Transfer files
+ Print from sessions
+ Copy and paste
+ Stereo 2.0 audio playback
+ Stereo 2.0 audio recording (on Windows servers)
+ Touchscreen
+ Stylus (on Linux, Windows 10, and Windows Server 2019 servers)
+ Multiple monitor support

For more information about these features, see [Supported features](https://docs.aws.amazon.com/dcv/latest/userguide/client.html#client-features) in the *Amazon DCV User Guide*.

## Browser support
<a name="browser"></a>

The Amazon DCV Web Client SDK supports JavaScript (ES6) and it can be used from JavaScript or TypeScript applications.

The Amazon DCV Web Client SDK supports the following web browsers:


| Browser | Version | 
| --- | --- | 
| Google Chrome | Latest three major versions | 
| Mozilla Firefox | Latest three major versions | 
| Microsoft Edge | Latest three major versions | 
| Apple Safari for macOS | Latest three major versions | 

## Versioning convention
<a name="versioning"></a>

The Amazon DCV Web Client SDK version is defined in the following format: `{{major}}.{{minor}}.{{patch}}`. The versioning convention generally adheres to the [ semantic versioning model](https://semver.org/). A change in the major version, such as from `1.x.x` to `2.x.x`, indicates that breaking changes that might require code changes and a planned deployment have been introduced. A change in the minor version, such as from `1.1.x` to `1.2.x`, is backwards compatible, but might include deprecated elements.