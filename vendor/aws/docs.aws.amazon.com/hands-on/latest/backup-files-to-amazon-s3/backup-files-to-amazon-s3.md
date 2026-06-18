

# Store and Retrieve a File with Amazon S3
<a name="backup-files-to-amazon-s3"></a>


|  |  | 
| --- |--- |
| **Cost to complete** | Free Tier <br />AWS Free Tier includes 5GB storage, 20,000 Get Requests, and 2,000 Put Requests with Amazon S3. <br />[View AWS Free Tier Details »](https://aws.amazon.com/free/?e=gs21&src=introduction_freetier)  | 
| **Services used** | Amazon S3  | 
| **Requires** | Storing Your Files with AWS Requires an Account <br />[Create a free account in minutes](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html?e=gs21&src=introduction_signup)  | 
| **Last updated** | June 1, 2022  | 

## Overview
<a name="overview"></a>

This step-by-step how-to guide will help you store your files in the cloud using Amazon Simple Storage Service (Amazon S3). Amazon S3 is a service that enables you to store your data (referred to as **objects**) at massive scale. In this guide, you will create an Amazon S3 bucket (a container for data stored in Amazon S3), upload a file, retrieve the file, and delete the file. 

The resources you create in this guide are [AWS Free Tier](https://aws.amazon.com/free/) eligible. 

## Implementation
<a name="implementation"></a>

### Step 1: Upload a file
<a name="upload-a-file"></a>

In this step, you will upload a file to your new Amazon S3 bucket. 

1. Open the Amazon S3 console

   [Click on](https://console.aws.amazon.com/console/home/?pg=bckp-amz-s3) the AWS Management Console home to open the console in a new browser window, so you can keep this step-by-step guide open. When the screen loads, enter your user name and password to get started. Then type **S3** in the search bar and select S3 to open the console.   
![The navigation menu interface for the Amazon S3 console.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/navigation-menu-interface-console.png)

1. Create S3 bucket

   In the S3 dashboard, click **Create Bucket**. 

   If this is the first time you have created a bucket, you will see a screen that looks like the image pictured here. 

   If you have already created S3 buckets, your S3 dashboard will list all the buckets you have created.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/resource-creation-interface.png)

1. Enter bucket name

   Enter a bucket name. Bucket names must be unique across all existing bucket names in Amazon S3. For this guide, we have used **mysuperawsbucket**, but you should choose a name that is relevant and unique to you. There are a number of other [restrictions on S3 bucket names](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html) as well. Once you've selected a name, select a Region to create your bucket in.   
![The configuration settings interface.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/configuration-settings-interface.png)

1. Configure permissions

   You have the ability to set permission settings for your S3 bucket. Leave the default values and select **Next**.   
![AWS S3 bucket settings showing "Object Ownership" with ACLs disabled (recommended) and "Block Public Access" enabled for all public access settings.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/ifztho-object-ownership-bucket-settings.png)

1. Review and create

   You have many useful options for your S3 bucket including [Versioning](https://docs.aws.amazon.com/AmazonS3/latest/dev/Versioning.html), [Tags](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketBilling.html), [Default Encryption](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html), and [Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html). We won't enable them for this tutorial. 

   Select **Create bucket**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/resource-creation-interface-1.png)

### Step 2: Create an S3 bucket
<a name="create-an-s3-bucket"></a>

In this step, you will create an Amazon S3 bucket. A bucket is the container you store your files in. 

1. Open your bucket

   You will see your new bucket in the S3 console. Click on your bucket’s name to navigate to the bucket.   
![The navigation interface.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/navigation-interface.png)

1. Choose Upload

   You are in your bucket’s home page. Select **Upload**.   
![Amazon S3 bucket interface showing an empty bucket named "mysuperawsbucket" with an orange "Upload" button highlighted.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/upload-file-bucket-interface-empty-named.png)

1. Add files

   To select a file to upload, either click **Add files** or **Add folder** and select sample file(s) that you would like to store or **Drag and Drop** a file on the upload box. Your file(s) will be displayed after you have selected file(s) to upload.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/interface-controls-buttons.png)

1. Set permissions

   You have the ability to review destination details and permissions. For this tutorial, leave the default values.   
![An AWS S3 bucket settings page showing "Bucket Versioning," "Default Encryption," and "Object Lock" all disabled, with a recommendation to enable bucket versioning and a note about bucket owner enforced settings for object ownership.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/bucket-settings-page-versioning-default.png)

1. Configure properties

   You have the ability to set property settings like storage class, server-side encryption, additional checksums, tags, and metadata with your object. Leave the default values and select **Upload**.   
![Amazon S3 storage class options, server-side encryption settings, additional checksums, tags, and metadata configuration, with the "Standard" storage class selected and the "Upload" button highlighted.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/qik-bucket-properties-afbe-class-options.png)

1. Confirm upload

   You will see your object in your bucket’s home screen.   
![AWS S3 upload status page showing a successful upload of "kittens.png" file, 66.5 KB in size.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/upload-status-page-successful-kittens-file.png)

### Step 3: Retrieve the object
<a name="retrieve-the-object"></a>

In this step, you will download the file from your Amazon S3 bucket. 
+ Download the object

  Select the checkbox next to the file you would like to download, then select **Download**.   
![An Amazon S3 bucket named "mysuperawsbucket" showing a single file, "kittens.png," with options to download, copy URL, or perform other actions.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/bucket-named-mysuperawsbucket-single-file.png)

### (Optional) Clean up resources
<a name="delete-the-object-and-bucket"></a>

You can easily delete your object and bucket from the Amazon S3 console. In fact, it is a best practice to delete resources you are no longer using so you don’t keep getting charged for them. 

1. Delete the object

   You will first delete your object. Select the checkbox next to the file you want to delete and select **Delete**.   
![Amazon S3 bucket interface showing a file named "kittens.png" selected, with options to delete, download, or manage the file.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/bucket-interface-file-named-kittens.png)

1. Confirm deletion

   Review and enter **permanently delete** in the text input field to confirm deletion. Click **Delete objects**.   
![AWS S3 interface showing the "Delete objects" page with a warning that deletion is permanent, a specified object named "kittens.png," and a confirmation field requiring "permanently delete" before clicking the "Delete objects" button.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/interface-delete-objects-page-warning-that.png)

1. Navigate to your bucket

   Click on Amazon S3 > Buckets to view all your buckets in the region.   
![The Amazon S3 console showing the "Buckets" section with two buckets listed, their regions, access settings, and creation dates.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/console-buckets-section-two-listed-their.png)

1. Delete the bucket

   Select the radio button to the left of the bucket you created, then choose **Delete**.   
![AWS S3 console showing an account snapshot and a list of buckets, with "mysuperawsbucket" selected and the "Delete" button highlighted.](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/console-account-snapshot-list-buckets.png)

1. Confirm deletion

   To confirm deletion, enter the name of the bucket in the text input field and choose **Delete bucket**.   
![AWS S3 interface showing a "Delete bucket" confirmation screen with a warning that deletion is irreversible, requiring the bucket name "mysuperawsbucket" to be entered before clicking "Delete bucket.".](http://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/images/interface-delete-bucket-confirmation.png)

## Congratulations\!
<a name="congratulations"></a>

You have backed up your first file to the cloud by creating an Amazon S3 bucket and uploading your file as an S3 object. Amazon S3 is designed for 99.999999999% durability to help ensure that your data is always available when you want it. You’ve also learned how to retrieve your backed up file and how to delete the file and bucket. 