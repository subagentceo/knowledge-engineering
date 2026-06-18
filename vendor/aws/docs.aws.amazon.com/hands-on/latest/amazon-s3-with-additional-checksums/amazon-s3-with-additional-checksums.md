

# Check the Integrity of Data in Amazon S3 with Additional Checksums
<a name="amazon-s3-with-additional-checksums"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 20 minutes  | 
| **Cost to complete** | Less than $1 ([Amazon S3 pricing page](https://aws.amazon.com/s3/pricing/))  | 
| **Services used** | [Amazon S3](https://aws.amazon.com/s3/)  | 
| **Last updated** | August 15, 2022  | 

## Overview
<a name="overview"></a>

Organizations are constantly creating and migrating digital assets to [Amazon S3](https://aws.amazon.com/s3/). These assets include images, binary files, post-production renders, and more, all of which are business-critical. As assets are migrated and used across workflows, you want to make sure the files are not altered by network corruption, hard drive failure, or other unintentional issues. Today, the industry uses algorithms to scan a file byte by byte to generate a unique fingerprint for it, known as a checksum. 

With checksums, you can verify that assets are not altered when copied. Performing a checksum consists of using an algorithm to iterate sequentially over every byte in a file. 

[Amazon S3 offers multiple checksum options to accelerate integrity checking of data](https://aws.amazon.com/blogs/aws/new-additional-checksum-algorithms-for-amazon-s3/). These capabilities calculate a file’s checksum when a customer uploads an object. Customers migrating large volumes of data to Amazon S3 want to perform these integrity checks as a durability best practice, and to confirm that every byte is transferred without alteration. This allows customers to maintain end-to-end data integrity. The checksum is created the moment the object is uploaded, and it is preserved throughout the lifespan of the object. The same checksum is validated at the end when the object is downloaded, to offer end-to-end data integrity. The additional algorithms supported by Amazon S3 are: SHA-1, SHA-256, CRC32, CRC32-C, MD5, XXHash64, XXHash3, XXHash128, and SHA-512. With these new data integrity checking features, you can verify that your files were not altered during data transfer or during the upload or download. 

## What you will accomplish
<a name="what-you-will-accomplish"></a>
+ Upload a file to Amazon S3 
+ Compare the checksum on Amazon S3 and your local file to verify data integrity 

## Prerequisites
<a name="prerequisites"></a>

To complete this tutorial, you need an AWS account. [Access this support page for more information on how to create and activate a new AWS account.](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) 

## Implementation
<a name="implementation"></a>

### Step 1: Create an Amazon S3 bucket
<a name="create-an-amazon-s3-bucket"></a>

1. Sign in to the Amazon S3 console

   If you have not already done so, create an [AWS account.](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/) 

   Log into the [AWS Management Console](https://console.aws.amazon.com/) using your account information. 

   From the AWS console services search bar, enter **S3.** Under the services search results section, select **S3**. You may notice an option for Amazon Glacier. This option is for the Glacier service prior to integration with Amazon S3. We recommend Amazon Glacier users use the Amazon S3 console for an enhanced user experience.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/resource-creation-interface.png)

1. Create an S3 bucket

   Choose **Buckets** from the Amazon S3 menu on the left and then choose the **Create bucket** button.   
![The Amazon S3 web console showing the Buckets overview, account storage snapshot, and the option to create a new bucket. The interface displays total storage, object count, and average object size, along with account navigation and Storage Lens dashboard options.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/console-buckets-overview-account-snapshot.png)

1. Enter a bucket name and choose a region

   Enter a descriptive globally unique name for your bucket. Select which **AWS Region** you would like your bucket created in. The default **Block Public Access** setting is appropriate for this workload, so leave this section as is. 

   You can leave the remaining options as defaults, navigate to the bottom of the page, and choose **Create bucket.**   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/selection-interface.png)

### Step 2: Upload a file and specify the checksum algorithm
<a name="upload-a-file-and-specify-the-checksum-algorithm"></a>

Now that your bucket is created and configured, you are ready to upload a file and have the checksum calculated by Amazon S3. 

1. Open your S3 bucket

   If you have logged out of your AWS Management Console session, log back in. Navigate to the [S3 console](https://s3.console.aws.amazon.com/s3/home) and select the [Buckets](https://s3.console.aws.amazon.com/s3/home) menu option. From the list of available buckets, select the bucket name of the bucket you just created.   
![The navigation interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/navigation-interface.png)

1. Upload an object

   Next, select the **Objects** tab. Then, from within the **Objects** section, choose the **Upload** button.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/interface-controls-buttons.png)

1. Add files

   Choose the **Add files** button and then select the file you would like to upload from your file browser.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/interface-controls-buttons-1.png)

1. Expand properties

   Navigate down the page to find the **Properties** section. Then, select **Properties** and expand the section.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/interface.png)

1. Select additional checksums

   Under **Additional checksums** select the **On** option and choose **SHA-256**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/selection-interface-1.png)

1. (Optional) Enter a checksum value

   If your object is less than 16 MB and you have already calculated the SHA-256 checksum (base64 encoded), you can provide it in the **Precalculated value** input box. To use this functionality for objects larger than 16 MB, you can use the CLI or SDK. 

   When Amazon S3 receives the object, it calculates the checksum by using the algorithm specified. If the checksum values do not match, Amazon S3 generates an error and rejects the upload, as shown in the screenshot.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/interface-interface-element.png)

1. Upload the file

   Navigate down the page and choose the **Upload** button.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/interface-controls-buttons-2.png)

1. Complete the upload

   After your upload completes, choose the **Close** button.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/interface-controls-buttons-3.png)

### Step 3: Verify checksum
<a name="verify-checksum"></a>

1. View file properties

   Select the uploaded file by selecting the filename. This will take you to the **Properties** page.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/interface-interface-element-1.png)

1. Find the checksum value

   Navigate down the properties page and you will find the **Additional checksums** section. 

   This section displays the base64 encoded checksum that Amazon S3 calculated and verified at the time of upload.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/interface-1.png)

1. Compare checksum values

   To compare the object in your local computer, open a terminal window and navigate to where your file is. 

   Use a utility like shasum to calculate the file. The following command performs a sha256 calculation on the same file and converts the hex output to base64:

   ```
    shasum -a 256 image.jpg | cut -f1 -d\ | xxd -r -p | base64 
   ```

   When comparing this value, it should match the value in the Amazon S3 console.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/amazon-s3-with-additional-checksums/images/interface-2.png)

### Clean up resources
<a name="clean-up"></a>

In the following steps, you clean up the resources you created in this tutorial. It is a best practice to delete resources that you are no longer using so that you do not incur unintended charges. 

1. Delete test object

   If you have logged out of your AWS Management Console session, log back in. Navigate to the [S3 console](https://s3.console.aws.amazon.com/s3/home) and select the **Buckets** menu option. First you will need to delete the test object from your test bucket. 

   Select the name of the bucket you have been working with for this tutorial. Put a check mark in the checkbox to the left of your test object name, then choose the **Delete** button. 

   On the **Delete objects** page, verify that you have selected the proper object to delete and enter **permanently delete** into the **Permanently delete objects** confirmation box. 

   Then, choose the **Delete object** button to continue. Next, you will be presented with a banner indicating if the deletion has been successful. 

1. Delete test bucket

   Finally, you need to delete the test bucket you have created. Return to the list of buckets in your account. 

   Select the radio button to the left of the bucket you created for this tutorial, and then choose the **Delete** button. Review the warning message. 

   If you desire to continue deletion of this bucket, enter the bucket name into the **Delete bucket** confirmation box, and choose **Delete bucket.** 

## Conclusion
<a name="conclusion"></a>

Congratulations\! You have learned how to upload a file to Amazon S3, calculate additional checksums, and compare the checksum on Amazon S3 and your local file to verify data integrity. 