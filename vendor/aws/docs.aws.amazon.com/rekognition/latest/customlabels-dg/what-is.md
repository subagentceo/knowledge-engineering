

# What is Amazon Rekognition Custom Labels?
<a name="what-is"></a>

With Amazon Rekognition Custom Labels, you can identify the objects, logos, and scenes in images that are specific to your business needs. For example, you can find your logo in social media posts, identify your products on store shelves, classify machine parts in an assembly line, distinguish healthy and infected plants, or detect animated characters in images.

Developing a custom model to analyze images is a significant undertaking that requires time, expertise, and resources. It often takes months to complete. Additionally, it can require thousands or tens of thousands of hand-labeled images to provide the model with enough data to accurately make decisions. Generating this data can take months to gather, and can require large teams of labelers to prepare it for use in machine learning.

Amazon Rekognition Custom Labels extends Amazon Rekognition’s existing capabilities, which are already trained on tens of millions of images across many categories. Instead of thousands of images, you can upload a small set of training images (typically a few hundred images or less) that are specific to your use case. You can do this by using the easy-to-use console. If your images are already labeled, Amazon Rekognition Custom Labels can begin training a model in a short time. If not, you can label the images directly within the labeling interface, or you can use Amazon SageMaker AI Ground Truth to label them for you. 

After Amazon Rekognition Custom Labels begins training from your image set, it can produce a custom image analysis model for you in just a few hours. Behind the scenes, Amazon Rekognition Custom Labels automatically loads and inspects the training data, selects the right machine learning algorithms, trains a model, and provides model performance metrics. You can then use your custom model through the Amazon Rekognition Custom Labels API and integrate it into your applications.

**Topics**
+ [Key benefits](#key-benefits)
+ [Choosing to use Amazon Rekognition Custom Labels](#wi-choosing)
+ [Are you a first-time Amazon Rekognition Custom Labels user?](#first-time-user)

## Key benefits
<a name="key-benefits"></a>

**Simplified data labeling**  
The Amazon Rekognition Custom Labels console provides a visual interface to make labeling your images fast and simple. The interface allows you to apply a label to the entire image. You can also identify and label specific objects in images using bounding boxes with a click-and-drag interface. Alternately, if you have a large dataset, you can use [Amazon SageMaker Ground Truth](https://aws.amazon.com/sagemaker/groundtruth/) to efficiently label your images at scale.

**Automated machine learning**  
No machine learning expertise is required to build your custom model. Amazon Rekognition Custom Labels includes automated machine learning (AutoML) capabilities that take care of the machine learning for you. When the training images are provided, Amazon Rekognition Custom Labels can automatically load and inspect the data, select the right machine learning algorithms, train a model, and provide model performance metrics.

**Simplified model evaluation, inference, and feedback**  
You evaluate your custom model’s performance on your test set. For every image in the test set, you can see the side-by-side comparison of the model’s prediction vs. the label assigned. You can also review detailed performance metrics such as precision, recall, F1 scores, and confidence scores. You can start using your model immediately for image analysis, or you can iterate and retrain new versions with more images to improve performance. After you start using your model, you track your predictions, correct any mistakes, and use the feedback data to retrain new model versions and improve performance.

## Choosing to use Amazon Rekognition Custom Labels
<a name="wi-choosing"></a>

Amazon Rekognition provides two features that you can use to find labels (object, scenes, and concepts) in images: Amazon Rekognition Custom Labels and [Amazon Rekognition Image label detection](https://docs.aws.amazon.com/rekognition/latest/dg/labels.html). Use the following information to determine which feature you should use. 

### Amazon Rekognition Image label detection
<a name="wi-label-detection"></a>

You can use the label detection feature in Amazon Rekognition Image to identify, classify, and search for *common* labels in images and videos—at scale and without having to create a machine learning model. For example, you can easily detect thousands of common objects, such as cars and trucks, tomatoes, basketballs, and soccer balls.

If your application needs to find common labels, we recommend using Amazon Rekognition Image label detection, as you don't need to train a model. To get a list of the labels that Amazon Rekognition Image label detection finds, see [Detecting labels](https://docs.aws.amazon.com/rekognition/latest/dg/labels.html).

If your application needs to find labels not found by Amazon Rekognition Image label detection, such as custom machine parts on an assembly line, we recommend that you use Amazon Rekognition Custom Labels.

### Amazon Rekognition Custom Labels
<a name="wi-custom-labels"></a>

You can use Amazon Rekognition Custom Labels to easily train a machine learning model that find labels (objects, logos, scenes, and concepts) in images that are unique to your business needs. 

Amazon Rekognition Custom Labels can classify images (image level predictions) or detect object locations in an image (object/bounding box level predictions). 

Amazon Rekognition Custom Labels provides greater flexibility in the types of objects and scenes you can detect. For example, you can use Amazon Rekognition Image label detection to find plants and leaves. To distinguish between healthy, damaged, and infected plants you need to use Amazon Rekognition Custom Labels. 

The following are examples of how you can use Amazon Rekognition Custom Labels. 
+ Identify team logos on player jerseys and helmets
+ Distinguish between specific machine parts or products on an assembly line 
+ Identify cartoon characters in a media library
+ Locate products of a specific brand on retail shelves
+ Classify agricultural produce quality (such as rotten, ripe, or raw)

**Note**  
Amazon Rekognition Custom Labels is not designed for analyzing faces, detecting text, or finding unsafe image content in images. To perform these tasks, you can use Amazon Rekognition Image. For more information, see [What Is Amazon Rekognition](https://docs.aws.amazon.com/rekognition/latest/dg/what-is.html).

## Are you a first-time Amazon Rekognition Custom Labels user?
<a name="first-time-user"></a>

If you're a first-time user of Amazon Rekognition Custom Labels, we recommend that you read the following sections in order:

1. **[Setting up Amazon Rekognition Custom Labels](setting-up.md)** – In this section, you set your account details.

1. **[Understanding Amazon Rekognition Custom Labels](understanding-custom-labels.md)** – In this section, you learn about the workflow for creating a model.

1. **[Getting started with Amazon Rekognition Custom Labels](getting-started.md)** – In this section, you train a model using example projects created by Amazon Rekognition Custom Labels.

1. **[Classifying images](tutorial-classification.md)** – In this section, you learn how to train a model that classifies images with datasets that you create.