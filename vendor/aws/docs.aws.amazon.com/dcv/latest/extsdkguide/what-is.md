

# What is the Amazon DCV Extension SDK?
<a name="what-is"></a>

**Note**  
Amazon DCV was previously known as NICE DCV.

Amazon DCV is a high-performance remote display protocol. It lets you securely deliver remote desktops and application streaming from any cloud or data center to any device, over varying network conditions. By using Amazon DCV with Amazon EC2, you can run graphics-intensive applications remotely on Amazon EC2 instances. You can then stream the results to more modest client machines, which eliminates the need for expensive dedicated workstations.

With the Amazon DCV Extension SDK, developers can integrate Amazon DCV protocol with their applications. The following are typical use cases:
+ Provide high-level device redirection for custom hardware devices in remote sessions.
+ Establish virtual channels between Amazon DCV Server and Amazon DCV Client to enhance remote application usability.
+ Describe the Amazon DCV client and Amazon DCV server runtime components and allow applications to interact with them.

A DCV extension may communicate with either a Amazon DCV client or a Amazon DCV server, depending on where it is installed. In addition, the Amazon DCV Extension SDK could request a virtual channel via the Amazon DCV protocol and then use this virtual channel to send arbitrary data.

The purpose of this guide is to explain how to integrate third-party applications into the Amazon DCV Protocol using the Amazon DCV Extension SDK (Software Development Kit) and its associated API (Application Programming Interface).

**Topics**
+ [Prerequisites](#prereq)
+ [API Categories](#api-categories)
+ [Versioning convention](#versioning)

## Prerequisites
<a name="prereq"></a>

Before you start working with the Amazon DCV Extension SDK, ensure that you're familiar with Amazon DCV and Amazon DCV sessions. For more information, see the [Amazon DCV Administrator Guide](https://docs.aws.amazon.com/dcv/latest/adminguide/what-is-dcv.html).

The Amazon DCV Extension SDK supports Amazon DCV server and Amazon DCV Extension SDK version 2023.0 and later.

Amazon DCV Extensions are not supported with a Web Client

## API Categories
<a name="api-categories"></a>

There are three categories of Amazon DCV Extension SDK APIs:
+ **General API -**Available on both client and server, this API provides messages describing the Amazon DCV components and service information.
+ **Virtual Channel API -**Allows extensions to create virtual channels for transferring data between client and server. API is available on both client and server, and its behavior is symmetrical. Extensions running on either side can establish virtual channels.
+ **Geometry API -**Available only for client-side extensions, this API provides messages to obtain local views and the layout of the remote desktop.

## Versioning convention
<a name="versioning"></a>

The Amazon DCV Extension SDK version is defined in the following format: `{{major}}.{{minor}}.{{patch}}`. The versioning convention generally adheres to the [ semantic versioning model](https://semver.org/). A change in the major version, such as from `1.x.x` to `2.x.x`, indicates that breaking changes that might require code changes and a planned deployment have been introduced. A change in the minor version, such as from `1.1.x` to `1.2.x`, is backwards compatible, but might include deprecated elements.