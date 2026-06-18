

# Detect, Analyze, and Compare Faces with Amazon Rekognition
<a name="detect-analyze-compare-faces-rekognition"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 10 minutes  | 
| **Cost to complete** | [Free Tier](https://aws.amazon.com/free/?e=gs2020&p=build-a-web-app-intro) eligible  | 
| **Services used** | [Amazon Rekognition](https://aws.amazon.com/rekognition/)  | 
| **Last updated** | July 11, 2022  | 

## Overview
<a name="overview"></a>

In this tutorial, you will learn how to use the face recognition features in Amazon Rekognition using the AWS Management Console. Amazon Rekognition is a deep learning-based image and video analysis service. 

As a developer, you might face the challenge of facial recognition and comparison if you are developing an employee verification system, or need to automate video editing or provide secondary authentication for other applications. To solve this, you could develop your own machine learning model, develop an API, and manage your own infrastructure. This option is expensive, requires advanced knowledge, and is time intensive. 

An easier route is to use Amazon Rekognition, which can detect faces in an image or video, find facial landmarks such as the position of eyes, and detect emotions such as happy or sad in near-real time or in batches without management of infrastructure or modeling. 

In this tutorial, you will use [Amazon Rekognition](https://aws.amazon.com/rekognition/) to analyze an image and then compare it to other images to see if the faces are the same. 

This tutorial is a demo of the functionality that is available when using the AWS CLI or the Rekognition API. For production or proof of concept implementations, we recommend using these programmatic interfaces rather than the Amazon Rekognition console. 

## Implementation
<a name="implementation"></a>

### Step 1: Analyze faces
<a name="analyze-faces"></a>

In this step, you will use the facial analysis feature in Amazon Rekognition to see the detailed JSON response you can receive from analyzing one image. 

1. Open the console

   Open the [AWS Management Console](https://console.aws.amazon.com/console/home), so you can keep this step-by-step guide open. When the screen loads, enter your user name and password to get started. Then type ****Rekognition**** in the search bar and select **Rekognition** to open the service console.   
![The navigation menu interface for opening the console.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/navigation-menu-interface-opening-console.png)

1. Select Facial analysis

   To start, select **Facial analysis** in the panel navigation on the left. This feature allows you to analyze faces in an image and receive a JSON response.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/selection-interface.png)

1. Save the first sample image

   Open and save the first sample image for this tutorial [here](https://d1.awsstatic.com/tmt/detect-analyze-faces-rekognition/detect-analyze-faces-rekognition-sample1.14b4e29a5f7a246639b1694612931acf9a45e752.jpg).   
![Portrait of happy multi-generation family sitting on sofa in living room at home.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/portrait-happy-multi-generation-family.jpeg)

1. Upload sample image

   Click the orange **Upload** button and select the sample image you just saved.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/interface-controls-buttons.png)

1. Review the quick results

   Notice that under the Results dropdown, you can click through and see quick results for each face that was detected.   
![The review and confirmation interface.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/confirmation-interface-1.png)

1. Open the Response dropdown

   Click on the **Response** dropdown to see the JSON results.   
![The navigation interface.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/navigation-interface.png)

1. View the JSON results

   Notice that under the emotions results, there are numerous detected emotions. Happy has a 99.98% confidence rating. 

   As a developer, detecting emotions in images and videos makes it possible to quickly catalog a digital library by emotion. Another use case for detecting emotions is to amplify ad targeting so users receive a personalized experience tailored to the current emotion.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/interface-interface-element.png)

### Step 2: Compare faces
<a name="compare-faces"></a>

In this step, you will use the face comparison feature to see the detailed JSON response from comparing two different images that don't match. 

1. Select Face comparison

   Select **Face comparison** in the panel navigation on the left.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/confirmation-interface-1.png)

1. Save second sample image

   Open and save the second sample image for this tutorial [here](https://d1.awsstatic.com/tmt/detect-analyze-faces-rekognition/detect-analyze-faces-rekognition-sample2.cc4e9e93d30d13eea75da8faed36ac66f6fce129.jpg).   
![The navigation menu interface.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/navigation-menu-interface.jpeg)

1. Upload the reference face image

   Click on the orange **Upload** button for the reference face and select the image you just saved.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/interface-controls-buttons-1.png)

1. Select first reference image

   Click on the orange **Upload** button for the comparison face and select our first sample image we used in step 2.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/selection-interface-1.png)

1. Review the Results

   Notice that in **Results** dropdown you can see that our reference wasn’t a match for any of the detected faces in our comparison faces image.   
![The review and confirmation interface.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/confirmation-interface-2.png)

1. Review the JSON results

   Click on the **Response** dropdown to see the JSON results. Notice that the “Similarity” score for each of the detected faces never exceeds 1. The similarity score ranges from 1-100 and the threshold can be adjusted when using the API. 

   As a developer, comparing faces at scale can be used in applications to track persons of interest, create a face-based employee verification system, or provide a VIP experience to guests staying at a hospitality venue.   
![The review and confirmation interface.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/confirmation-interface-3.png)

### Step 3: Compare faces (again)
<a name="compare-faces-again"></a>

In this step, you will use the face comparison feature to see the detailed JSON response from comparing two different images that have a match. 

1. Save the sample image

   Open and save the third and final sample image for this tutorial [here](https://d1.awsstatic.com/tmt/detect-analyze-faces-rekognition/detect-analyze-faces-rekognition-sample3.5b5c31997920aba8eff612d6f2a8829eefdb20ea.jpg).   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/interface.jpeg)

1. Upload the image

   Click on the orange **Upload** button for the reference face and select the image you just saved.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/interface-controls-buttons-2.png)

1. Review the Results

   Notice that the reference face that was compared to our other photo detected a 99% similarity score and detected that all other faces were not a match.   
![Amazon Rekognition interface showing a face comparison tool with reference and comparison faces, similarity results displayed on the right.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/reklong-interface-face-comparison-tool.png)

1. Review the JSON results

   Click on the **Response** dropdown to see the details of each comparison.   
![The AWS Rekognition console showing a JSON response with face matching data, including a similarity score of 99.9965% and confidence of 99.9786%.](http://docs.aws.amazon.com/hands-on/latest/detect-analyze-compare-faces-rekognition/images/rekognition-console-json-response-face.png)

## Conclusion
<a name="conclusion"></a>

You have learned how to use the console to analyze and compare faces. You can also perform this feature using the API so you can operate at scale. Use Amazon Rekognition when you need to perform facial analysis at scale without worrying about infrastructure or training a model for identifying persons of interest, cataloging a digital library, creating a face-based employee verification system, or performing sentiment analysis. 