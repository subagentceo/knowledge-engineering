

# What is Amazon Rekognition?
<a name="what-is"></a>

Amazon Rekognition is a cloud-based image and video analysis service that makes it easy to add advanced computer vision capabilities to your applications. The service is powered by proven deep learning technology and it requires no machine learning expertise to use. Amazon Rekognition includes a simple, easy-to-use API that can quickly analyze any image or video file that’s stored in Amazon S3.

You can add features that detect objects, text, unsafe content, analyze images/videos, and compare faces to your application using Rekognition's APIs. With Amazon Rekognition's face recognition APIs, you can detect, analyze, and compare faces for a wide variety of use cases, including user verification, cataloging, people counting, and public safety.

The service is based on the same proven, highly scalable, deep learning technology developed by Amazon’s computer vision scientists, technology that can analyze billions of images and videos daily. Rekognition routinely learns from new data, and we frequently add new labels and features to the service.

For more information, see the [Amazon Rekognition FAQs](https://aws.amazon.com/rekognition/faqs/). 



## Key capabilities
<a name="what-is-capabilities"></a>

 Image Analysis: 
+ Object, Scene, and Concept Detection - Detects and classify objects, scenes, concepts, and celebrities in images.
+ Text Detection - Detect and recognize printed and handwritten text in images in a variety of languages.
+ Unsafe Content - Detect and filter explicit, inappropriate, and violent content and images. Detects granular unsafe content labels.
+ Celebrity recognition - Recognize tens of thousands of celebrities in your images across different categories, such as politicians, athletes, actors, and musicians.
+ Facial Analysis - Detect, analyze, and compare faces, along with facial attributes, such as gender, age, and emotions. Use cases may include user verification, cataloging, people counting, and public safety.
+ Custom Labels - Build custom classifiers to detect objects specific to your use case, such as logos, products, characters.
+ Image Properties - Analyze image properties like quality, color, sharpness, contrast.

 Video Analysis: 
+ Object, Scene, and Concept Detection - Detects and classify objects, scenes, concepts, and celebrities in videos.
+ Text Detection - Detect and recognize printed and handwritten text in videos in a variety of languages.
+ People pathing - Track identified people as they move across video frames.
+ Facial Analysis - Detect, analyze, and compare faces in streaming or stored videos.
+ Celebrity recognition - Recognize tens of thousands of celebrities in your stored videos across different categories, such as politicians, athletes, actors, and musicians.
+ Unsafe Content Detection - Detect explicit, inappropriate, and violent content in videos.
+ Video segmentation - Automatically identify useful segments of video, such as black frames and end credits.
+ Face liveness - Detect if a live user is present during face verification.

## Use cases
<a name="what-is-use-cases"></a>

**Searchable Media Libraries** - Rekognition detects labels, objects, concepts and scenes in images and videos. You can make these labels searchable based on this visual content analysis. Useful for building searchable image and video libraries.

**Face-Based User Identity Verification** - Confirm user identities by comparing faces in images to reference face images. Useful for identity verification in applications. 

**Face Liveness Detection **- Rekognition Face Liveness is a fully managed machine learning (ML) feature designed to help developers deter fraud during face-based identity verification. The feature helps you verify that a user is physically present in front of the camera and isn’t a bad actor spoofing the user's face. Using Rekognition Face Liveness can help you detect spoof attacks presented to a camera, such as printed photos, digital photos/videos, or 3D masks. It also helps detect spoof attacks that bypass a camera, such as pre-recorded or deepfake videos injected directly into the video capture subsystem.

**Facial Search** - With Rekognition, you can search images, stored videos, and streaming videos for faces that match those stored in a container known as a face collection. A face collection is an index of faces that you own and manage. Searching for people based on their faces requires that you **Index ** the faces and then **Search **for the faces.

**Unsafe Content Detection** - Detect and filter explicit, inappropriate, and violent content in images and videos. Uses labels for granular filtering based on business needs. The Content Moderation API also returns a hierarchical list of any detected labels (objects and concepts), along with confidence scores. These objects/labels indicate specific categories of unsafe content, which enables granular filtering and management of large volumes of user-generated content (UGC). You can customize the output of the Content Moderation API with adapters, which enhance performance for images like those you provide as training data.

**Detection of Personal Protective Equipment** - Detect personal protective equipment in images to monitor safety compliance across various industries. You can automatically flag unsafe conditions by detecting improper equipment and receive alerts about these conditions, which can improve compliance and training.

**Celebrity Recognition** - Recognize celebrities in your images and videos across categories, such as politicians, athletes, actors, and musicians. You can identify celebrity appearances without needing to provide names. 

**Text Detection** - Detect and extract text in images for visual search or extracting metadata. This works on different fonts and styles. Detects orientation to handle text on signs and banners.

**Custom Labels** - Identify custom objects, concepts and scenes specific to business use cases, such as logo detection. You can train custom classifiers to handle niche or proprietary objects, which improves accuracy on key objects versus general classifiers. For more information, see [What is Amazon Rekognition Custom Labels?](https://docs.aws.amazon.com/rekognition/latest/customlabels-dg/what-is.html) in the *Amazon Rekognition Custom Labels Developer Guide*. 

## Benefits
<a name="what-is-use-benefits"></a>

**Integrating powerful image and video analysis into your app** - Add accurate image and video analysis to apps without expertise. The Amazon Rekognition API enables analysis via deep learning without requiring any machine learning knowledge. You can quickly build computer vision into web, mobile, and device apps.

**Deep learning-based image and video analysis** - Analyzes images and videos using deep learning for high accuracy. Amazon Rekognition' can detect labels, objects, scenes, faces, celebrities. Filter the results to include/exclude specific labels.

**Scalable image analysis** - Analyzes millions of images to organize massive visual data sets. Scales to handle growing image libraries and traffic. You do not need to plan for capacity, and you pay only for what you use.

**Analyze and filter images based on properties** - Analyze and filter images by properties, such as quality, color, and visual content, and detect image sharpness, brightness, contrast. 

**Integration with other AWS services** - Amazon Rekognition integrates out of the box with S3 and Lambda. You can call Amazon Rekognition' APIs from Lambda and process images in Amazon S3 without moving data. Rekognition has built-in scalability and security using AWS IAM.

**Low cost ** - Pay-as-you-go pricing, no minimums or commitments. Free tier available to get started. Save more as usage scales via tiered pricing. Cost effective relative to in-house solutions.

**Simple customization** - Customize accuracy for your use case with adapters. Provide sample images to train adapters. Improves object and label detection for given domains. Easy way to tailor analysis without ML expertise.

For more information, see the [Amazon Rekognition FAQs](https://aws.amazon.com/rekognition/faqs/).

## Amazon Rekognition and HIPAA eligibility
<a name="hipaa"></a>

This is a HIPAA Eligible Service. For more information about AWS, U.S. Health Insurance Portability and Accountability Act of 1996 (HIPAA), and using AWS services to process, store, and transmit protected health information (PHI), see [HIPAA Overview](https://aws.amazon.com/compliance/hipaa-compliance/).

## Are you a first-time Amazon Rekognition user?
<a name="first-time-user"></a>

If you're a first-time user of Amazon Rekognition, we recommend that you read the following sections in order:

1. **[How Amazon Rekognition works](how-it-works.md)** – This section introduces various Amazon Rekognition components that you work with to create an end-to-end experience. 

1. **[Getting started with Amazon Rekognition](getting-started.md)** – In this section, you set up your account, install the SDK that reflects the language of your choice, and test the Amazon Rekognition API. For a list of the programming languages supported by Amazon Rekognition, see [Using Rekognition with an AWS SDK](sdk-general-information-section.md).

1. **[Working with images](images.md)** – This section provides information about using Amazon Rekognition with images stored in Amazon S3 buckets and images loaded from a local file system.

1. **[Working with stored video analysis operations](video.md)** – This section provides information about using Amazon Rekognition with videos stored in an Amazon S3 bucket.

1. **[Working with streaming video events](streaming-video.md)** – This section provides information about using Amazon Rekognition with streaming videos.