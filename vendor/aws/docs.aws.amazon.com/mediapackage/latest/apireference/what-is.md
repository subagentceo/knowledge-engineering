

# What Is the AWS Elemental MediaPackage Live API Reference?
<a name="what-is"></a>

This is the AWS Elemental MediaPackage REST API Reference. It contains examples of REST resources and their operations.

 **AWS Elemental MediaPackage REST API overview** 

The AWS Elemental MediaPackage API comprises of two main resources: the channel and the endpoint. The channel is the entry point to AWS Elemental MediaPackage. The endpoint is a part of the channel and is the exit point from AWS Elemental MediaPackage. The endpoint is referred to as an `OriginEndpoint` in the REST API.

 **To get started with AWS Elemental MediaPackage** 

Step 1: Create a channel.

The channel is the first component in AWS Elemental MediaPackage. It represents the input to AWS Elemental MediaPackage for incoming content from an encoder.

Step 2: Create endpoints.

The endpoint is attached to the channel, and represents the output of the content from AWS Elemental MediaPackage. There can be multiple endpoints associated with one channel. Each endpoint provides downstream content distribution networks (CDNs) and players access to the content for playback.

Step 3: Integrate AWS Elemental MediaPackage.

When the channel and endpoints are created, they provide URLs that are used for input and output, respectively. In the encoder, use WebDAV to push the stream to AWS Elemental MediaPackage. For the stream destination information, enter the input URL from the channel. You also must configure the username and password from the channel on the encoder's output stream, or AWS Elemental MediaPackage denies the content push. In the CDN or player, enter the endpoint URL from the AWS Elemental MediaPackage endpoint as the content request address.

For general information on the service, see the [https://docs.aws.amazon.com/mediapackage/latest/ug/what-is.html](https://docs.aws.amazon.com/mediapackage/latest/ug/what-is.html). 