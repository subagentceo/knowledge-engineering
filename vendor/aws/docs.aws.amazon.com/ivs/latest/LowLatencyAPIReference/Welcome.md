

# Welcome
<a name="Welcome"></a>

 **Introduction** 

The Amazon Interactive Video Service (IVS) API is REST compatible, using a standard HTTP API and an AWS EventBridge event stream for responses. JSON is used for both requests and responses, including errors.

The API is an AWS regional service. For a list of supported regions and Amazon IVS HTTPS service endpoints, see the [Amazon IVS page](https://docs.aws.amazon.com/general/latest/gr/ivs.html) in the * AWS General Reference*.

 * **All API request parameters and URLs are case sensitive. ** * 

For a summary of notable documentation changes in each release, see [ Document History](https://docs.aws.amazon.com/ivs/latest/userguide/doc-history.html).

 **Allowed Header Values** 
+  ` Accept: ` application/json
+  ` Accept-Encoding: ` gzip, deflate
+  ` Content-Type: `application/json

 **Key Concepts** 
+  **Channel** — Stores configuration data related to your live stream. You first create a channel and then use the channel’s stream key to start your live stream.
+  **Stream key** — An identifier assigned by Amazon IVS when you create a channel, which is then used to authorize streaming. * **Treat the stream key like a secret, since it allows anyone to stream to the channel.** * 
+  **Playback key pair** — Video playback may be restricted using playback-authorization tokens, which use public-key encryption. A playback key pair is the public-private pair of keys used to sign and validate the playback-authorization token.
+  **Recording configuration** — Stores configuration related to recording a live stream and where to store the recorded content. Multiple channels can reference the same recording configuration.
+  **Playback restriction policy** — Restricts playback by countries and/or origin sites.

For more information about your IVS live stream, also see [Getting Started with IVS Low-Latency Streaming](https://docs.aws.amazon.com/ivs/latest/LowLatencyUserGuide/getting-started.html).

 **Tagging** 

A *tag* is a metadata label that you assign to an AWS resource. A tag comprises a *key* and a *value*, both set by you. For example, you might set a tag as `topic:nature` to label a particular video category. See [Best practices and strategies](https://docs.aws.amazon.com/tag-editor/latest/userguide/best-practices-and-strats.html) in *Tagging AWS Resources and Tag Editor* for details, including restrictions that apply to tags and "Tag naming limits and requirements"; Amazon IVS has no service-specific constraints beyond what is documented there.

Tags can help you identify and organize your AWS resources. For example, you can use the same tag for different resources to indicate that they are related. You can also use tags to manage access (see [ Access Tags](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_tags.html)). 

The Amazon IVS API has these tag-related operations: [TagResource](API_TagResource.md), [UntagResource](API_UntagResource.md), and [ListTagsForResource](API_ListTagsForResource.md). The following resources support tagging: Channels, Stream Keys, Playback Key Pairs, and Recording Configurations.

At most 50 tags can be applied to a resource. 

 **Authentication versus Authorization** 

Note the differences between these concepts:
+  *Authentication* is about verifying identity. You need to be authenticated to sign Amazon IVS API requests.
+  *Authorization* is about granting permissions. Your IAM roles need to have permissions for Amazon IVS API requests. In addition, authorization is needed to view [Amazon IVS private channels](https://docs.aws.amazon.com/ivs/latest/userguide/private-channels.html). (Private channels are channels that are enabled for "playback authorization.")

 **Authentication** 

All Amazon IVS API requests must be authenticated with a signature. The AWS Command-Line Interface (CLI) and Amazon IVS Player SDKs take care of signing the underlying API calls for you. However, if your application calls the Amazon IVS API directly, it’s your responsibility to sign the requests.

You generate a signature using valid AWS credentials that have permission to perform the requested action. For example, you must sign PutMetadata requests with a signature generated from a user account that has the `ivs:PutMetadata` permission.

For more information:
+ Authentication and generating signatures — See [Authenticating Requests (AWS Signature Version 4)](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html) in the * AWS General Reference*.
+ Managing Amazon IVS permissions — See [Identity and Access Management](https://docs.aws.amazon.com/ivs/latest/userguide/security-iam.html) on the Security page of the *Amazon IVS User Guide*.

 **Amazon Resource Names (ARNs)** 

ARNs uniquely identify AWS resources. An ARN is required when you need to specify a resource unambiguously across all of AWS, such as in IAM policies and API calls. For more information, see [Amazon Resource Names](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html) in the *AWS General Reference*.

This document was last published on June 17, 2026. 