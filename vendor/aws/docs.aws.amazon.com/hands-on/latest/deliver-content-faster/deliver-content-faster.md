

# Deliver Content Faster with Amazon CloudFront
<a name="deliver-content-faster"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 10 minutes  | 
| **Cost to complete** | [Free Tier](https://aws.amazon.com/free/?e=gs2020&p=build-a-web-app-intro&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all) eligible  | 
| **Requires** |  [See the AWS documentation website for more details](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/deliver-content-faster.html)  | 
| **Last updated** | July 1, 2022  | 

## Overview
<a name="overview"></a>

In this tutorial, you will learn how to deliver content and decrease end-user latency of your web application using [Amazon CloudFront](https://aws.amazon.com/cloudfront/). CloudFront speeds up content delivery by leveraging its global network of data centers, known as edge locations, to reduce delivery time by caching your content close to your end users. CloudFront fetches your content from an **origin**, such as an Amazon Simple Storage Service (Amazon S3) bucket, an Amazon Elastic Compute Cloud (Amazon EC2) instance, an Elastic Load Balancing (ELB) load balancer, or your own web server, when it's not already in an edge location. CloudFront can be used to deliver your entire website or application, including dynamic, static, streaming, and interactive content. 

In the following steps, you will configure an [Amazon S3](https://aws.amazon.com/s3/) bucket as the origin and test your distribution using a web browser to ensure that your content is being delivered. 

Everything done in this tutorial is [free tier](https://aws.amazon.com/free/) eligible. 

## Implementation
<a name="implementation"></a>

### Step 1: Prepare your content
<a name="primary-step"></a>

In this step, we will upload sample static content to an Amazon S3 bucket. In later steps, we will use this bucket as a CloudFront origin. Amazon S3 is a good choice for an Amazon CloudFront origin that includes static content such as images, videos, HTML pages, .css files, and .js files. Create an HTML file. 

1. Enter the Amazon S3 console

   When you click [here](https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fconsole%2Fhome%3FhashArgs%3D%2523%26isauthcode%3Dtrue%26region%3Dus-east-1%26state%3DhashArgsFromTB_us-east-1_117fa3b00b737cf8&client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Fcanvas&forceMobileApp=0&code_challenge=3ReS1sAnk_egpuBAfZpFgASo4nqcngckg7qPCO3WQI8&code_challenge_method=SHA-256), the AWS Management Console will open in a new browser window. Type ****S3**** in the search bar and select **S3** to open the console.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/resource-creation-interface.png)

1. Create S3 bucket

   In the S3 dashboard, choose **Create bucket.** 

   If this is the first time you have created a bucket, you will see a screen that looks like the image pictured here. 

   If you have already created S3 buckets, your S3 dashboard will list all the buckets you have created.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/resource-creation-interface-1.png)

1. Enter bucket name

   Enter a unique bucket name. Bucket names must be unique across all existing bucket names in Amazon S3. There are a number of other [restrictions on S3 bucket names](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html) as well. Then select a Region to create your bucket in.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/resource-creation-interface-2.png)

1. Set permission settings

   You have the ability to set permission settings for your S3 bucket. By default, S3 objects are set to private. You will need to make your image publicly readable. Select **ACLs enabled** under Object Ownership, deselect “**Block all public access**” and select the checkbox **“I acknowledge that the current settings might result in this bucket and the objects within becoming public.”**   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/resource-creation-interface-3.png)

1. Create the bucket

   You have many useful options for your S3 bucket including [Versioning](https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html), [Server Access Logging](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/server-access-logging.html), [Tags](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketBilling.html), [Object-level Logging](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-management-and-data-events-with-cloudtrail.html?icmpid=docs_cloudtrail_console#logging-data-events) and [Default Encryption](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html). We won't enable these features for this tutorial. 

   Select **Create bucket.**   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/resource-creation-interface-4.png)

1. Navigate to the new bucket

   You will see your new bucket in the S3 console. Click on your bucket’s name to navigate to the bucket. Your bucket name will not be the same as pictured in the screenshot to the right.   
![The navigation interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/navigation-interface.png)

1. Select Upload

   You are in your bucket’s home page. 

   Select **Upload**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/selection-interface.png)

1. Upload sample content

   Upload the **cloudfront-test-image.png** file by selecting **Add files** and selecting the file **or** dragging the **cloudfront-test-image.png** file to the upload box. 

   Open the **Permissions** dropdown. Select **Choose from predefined ACLs** and then select **Grant public-read access.** Select the checkbox **“I understand the risk of granting public-read access to the specified objects.”** 

   Select **Upload**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/interface.png)

### Step 2: Enter the CloudFront console
<a name="enter-the-cloudfront-console"></a>

1. Open the CloudFront console

   When you [click here](https://console.aws.amazon.com/console/home), the AWS Management Console will open in a new browser tab. Type **CloudFront** in the search bar and select **CloudFront** to open the console.   
![The navigation menu interface for the CloudFront console.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/navigation-menu-interface-console.png)

1. Create a CloudFront distribution

   Select **Create a CloudFront distribution.**   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/resource-creation-interface-5.png)

### Step 3: Configure a Standard distribution
<a name="configure-a-standard-distribution"></a>

1. Get Started

   Connect your websites, apps, files, video streams, and other content to CloudFront. We optimize the performance, reliability, and security for your web traffic. 

   Under Distribution Options, enter a **Distribution name** for the standard distribution and optionally provide a description. 

   Make sure you select **Single website or app.** 

   For the purpose of this tutorial we will skip the **Custom domain** and **Tags** setup. Leave both of these optional fields blank.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/distribution-options-interface.png)

1. Specify Origin

   Under Origin type, select **Amazon S3** (which should be the default value). Under the Origin section, click the **Browse S3** button and select the name of the S3 bucket you stored the cloudfront-test-image.png in. 

   You can leave the rest of the settings on this page unchanged. This will setup your distribution with the correct settings for caching content from S3 automatically.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/origin-type-interface-controls-buttons.png)

1. Enable Security

   For the purposes of this tutorial we will choose **Do not enable security protections**. It is highly recommended to enable security protections for non-tutorial workloads which you will keep running on CloudFront.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/enable-security-eab-resource-creation.png)

### Step 4: Review Your Changes
<a name="review-your-changes"></a>
+ Review your changes to ensure everything is setup correctly and then click **Create Distribution.** 

  After CloudFront creates your distribution, the value of the **Status** column for your distribution will change from **Deploying** to the date and time that the distribution is deployed. 

**Note**  
This can take a few minutes to complete.

### Step 5: Create a distribution
<a name="create-a-distribution-1"></a>
+ Create an HTML file

  Open a text editor on your computer. Copy and paste the following HTML code: 

  ```
  <html>
  <head>My CloudFront Test</head>
  <body>
  <p>My text content goes here.</p>
  <p><img src="http://domain name/object name" alt="my test image">
  </body>
  </html>
  ```
  + Replace **domain name** with the domain name that CloudFront assigned to your distribution, such as **d111111abcdef8.cloudfront.net**. 
  + Replace **object name** with the name of your image file in the Amazon S3 bucket - in our case, **cloudfront-test-image.png.** 
  + Save the text in a file as **mycloudfronttest.html**. 

  Open your HTML file in a web browser to verify that the link works.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/interface-interface-element.png)

### (Optional) Disable and delete your distribution
<a name="disable-and-delete-your-distribution"></a>

1. Select the distribution to disable

   Select the checkbox next to the distribution you created and choose **Disable**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/selection-interface-1.png)

1. Confirm disabling the distribution

   You will be asked to confirm. Choose **Disable**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/resource-creation-interface-6.png)

1. Select the distribution to delete

   Select the checkbox next to the distribution you created and choose **Delete.**   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/selection-interface-2.png)

1. Confirm deleting the distribution

   You will be asked to confirm. Choose **Delete**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/deliver-content-faster/images/resource-creation-interface-7.png)

## Conclusion
<a name="conclusion"></a>

You created your first Amazon CloudFront web distribution and delivered a piece of static content hosted in the cloud through Amazon S3. With a few configuration changes, you can use CloudFront to deliver dynamic content, live events such as a meeting, conference, or concert, in real time over HTTP or HTTPS. Use Amazon Cloudfront to speed delivery of your entire website or application, including dynamic, static, streaming, and interactive content. 