

# Amazon FSx API Reference
<a name="welcome"></a>

The Amazon FSx API is a network protocol based on [HTTP (RFC 2616)](https://www.ietf.org/rfc/rfc2616.txt). For each API call, you make an HTTP request to the region-specific Amazon FSx API endpoint for the AWS Region where you want to manage file systems. The API uses JSON (RFC 4627) documents for HTTP request/response bodies.

The Amazon FSx API is an RPC model. In this model, there is a fixed set of operations and the syntax for each operation is known to clients without any prior interaction. In the following section, you can find a description of each API operation using an abstract RPC notation. Each has an operation name that doesn't appear on the wire. For each operation, the topic specifies the mapping to HTTP request elements. 

The specific Amazon FSx operation to which a given request maps is determined by a combination of the request's method (GET, PUT, POST, or DELETE) and which of the various patterns its Request-URI matches. If the operation is PUT or POST, Amazon FSx extracts call arguments from the Request-URI path segment, query parameters, and the JSON object in the request body.

Although operation names, such as `CreateFileSystem`, don't appear on the wire, these names are meaningful in AWS Identity and Access Management (IAM) policies. The operation name is also used to name commands in command-line tools and elements of the AWS SDKs. For example, there is a AWS CLI command named `create-file-system` that maps to the `CreateFileSystem` operation. The operation name also appears in AWS CloudTrail logs for Amazon FSx API calls.

## API endpoints
<a name="api-reference-endpoint"></a>

The API endpoint is the DNS name used as a host in the HTTP URI for the API calls. These API endpoints are specific to AWS Regions. Amazon FSx supports both IPv4-only endpoints and dual stack (IPv4 and IPv6) API endpoints. They take the following form.

IPv4-only endpoint  

```
fsx.{{aws-region}}.amazonaws.com
```
The IPv4-only Amazon FSx API endpoint for the US East (N. Virginia) Region is the following.  

```
fsx.us-east-1.amazonaws.com
```
For China Regions in the `aws-cn` partition,the pattern for IPv4 service management endpoints is:  

```
fsx.{{region}}.amazonaws.com.cn
```
For example, when managing FSx resources in China (Beijing) Region, you will use the following IPv4 service management endpoint:  

```
fsx.cn-north-1.amazonaws.com.cn
```

Dual stack endpoint  
For AWS commercial Regions in the `aws` partition and AWS GovCloud (US) Regions in the `aws-us-gov` partition, the pattern for dual-stack endpoints is:  

```
fsx.{{region}}.api.aws
```
For example, when managing FSx resources in US East (N. Virginia) Region, you will use the following service management endpoint:  

```
fsx.us-east-1.api.aws
```
For China Regions in the `aws-cn` partition,the pattern for dual-stack endpoints is:  

```
fsx.{{region}}.api.amazonwebservices.com.cn
```
For example, when managing FSx resources in China (Beijing) Region, you will use the following service management endpoint:  

```
fsx.cn-north-1.api.amazonwebsservices.com.cn
```

For a list of AWS Regions that Amazon FSx supports (where you can create and manage file systems), see [Amazon FSx](https://docs.aws.amazon.com/general/latest/gr/rande.html#fsx-region) in the *AWS General Reference*.

The region-specific API endpoint defines the scope of the Amazon FSx resources that are accessible when you make an API call. For example, when you call the `DescribeFileSystems` operation using the preceding endpoint, you get a list of file systems in the US East (N. Virginia) Region Region that have been created in your account.

## API Version
<a name="api-reference-version"></a>

The version of the API being used for a call is identified by the first path segment of the request URI, and its form is an ISO 8601 date. The documentation describes API version 2018-03-01.

## Related Topics
<a name="api-reference-related-topics"></a>

For information on the necessary permissions for these API operations using IAM policies, see [Actions, resources, and condition keys for Amazon FSx](https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazonfsx.html) in the *Service Authorization Reference*.

## Amazon FSx Forums
<a name="fsx-forums"></a>

If you encounter issues while using Amazon FSx use the forums:
+ [Amazon FSx for Windows File Server forums](https://forums.aws.amazon.com/forum.jspa?forumID=308).
+ [Amazon FSx for Lustre forums](https://forums.aws.amazon.com/forum.jspa?forumID=311).
+ [Amazon FSx for NetApp ONTAP forums](https://forums.aws.amazon.com/forum.jspa?forumID=402).