

# What Is the AWS Elemental MediaPackage VOD API Reference?
<a name="what-is-mp-vod"></a>

This is the AWS Elemental MediaPackage VOD REST API Reference. It contains examples of REST resources and their operations for video on demand (VOD).

For the AWS Elemental MediaPackage Live REST API Reference, see [AWS Elemental MediaPackage API Reference](https://docs.aws.amazon.com/mediapackage/latest/apireference/what-is.html).

 **AWS Elemental MediaPackage VOD REST API overview** 

The AWS Elemental MediaPackage VOD API comprises of three main resources: the asset, the packaging group, and the packaging configuration. The asset is the entry point to AWS Elemental MediaPackage VOD. A packaging group is associated with the asset, and holds one or more packaging configurations. The packaging configurations are the exit points from AWS Elemental MediaPackage VOD. The packaging configuration determines how outputs from this asset are formatted.

 **To get started with AWS Elemental MediaPackage VOD** 

Step 1: Create a packaging group.

The packaging group holds one or more packaging configurations. You can create the group once and associate multiple assets with it, so that they all use the same packaging configurations.

Step 2: Create packaging configurations.

The packaging configuration is held in a packaging group and is attached to an asset. The configuration represents the output of the content from AWS Elemental MediaPackage. Each configuration provides downstream content distribution networks (CDNs) and players access to the content for playback.

Step 3: Create an asset.

The asset represents the input to AWS Elemental MediaPackage VOD. Associate a packaging group to the asset so that content can be served for playback. When you create the asset, it initiates ingest of your specified source content from Amazon S3.

Step 4: Integrate AWS Elemental MediaPackage VOD.

When the asset is created and a packaging group is associated with it, AWS Elemental MediaPackage provides URLs for each packaging configuration on the asset. In the CDN or player, enter the configuration URL from the asset as the content request address.

For general information on the service, see the [https://docs.aws.amazon.com/mediapackage/latest/ug/what-is.html](https://docs.aws.amazon.com/mediapackage/latest/ug/what-is.html). 