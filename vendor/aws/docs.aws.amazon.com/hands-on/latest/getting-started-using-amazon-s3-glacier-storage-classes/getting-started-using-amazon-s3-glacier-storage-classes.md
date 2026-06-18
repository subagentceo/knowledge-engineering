

# Getting started using the Amazon Glacier storage classes
<a name="getting-started-using-amazon-s3-glacier-storage-classes"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 20 minutes  | 
| **Cost to complete** | Less than $1 ([Amazon S3 pricing page](https://s3/pricing/))  | 
| **Services used** | [Amazon S3](https://s3/)  | 

## Overview
<a name="overview"></a>

The [Amazon Glacier storage classes](https://aws.amazon.com/s3/storage-classes/glacier/) are purpose-built for data archiving, providing you with the highest performance, most retrieval flexibility, and the lowest cost archive storage in the cloud. To keep costs low yet suitable for varying retrieval needs, these storage classes support flexible retrieval options from milliseconds to several hours. The purpose of this tutorial is to show you how easy it is to begin storing your archive datasets in the Amazon Glacier storage classes. 

You can choose from three archive storage classes optimized for different access patterns and storage duration. For archive data that needs immediate access, choose the [Amazon Glacier Instant Retrieval](https://aws.amazon.com/s3/storage-classes/glacier/instant-retrieval/) storage class, an archive storage class that delivers the lowest cost storage with milliseconds retrieval. For archive data that does not require immediate access but needs the flexibility to retrieve large sets of data at no cost, choose Amazon Glacier Flexible Retrieval (formerly Amazon Glacier), with retrieval in minutes or free bulk retrievals in 5-12 hours. To save even more on long-lived archive storage, choose Amazon S3 Glacier Deep Archive, the lowest cost storage in the cloud with data retrieval within twelve hours. 

By archiving on AWS you'll have access to very low cost cloud storage, you'll be able to digitally preserve and retain your data for the long term, and you'll be able to leverage comprehensive security and compliance capabilities. The Amazon Glacier storage classes are used by customers for their long-term enterprise archive data, media archives, backup data, and data lake archives.  

Use the [S3 console](https://s3.console.aws.amazon.com/s3/home) and S3 API to easily archive your data in [Amazon S3](https://aws.amazon.com/s3/) . The S3 console and S3 API allow you to access all the features and functionality that the Amazon S3 service provides. Follow this tutorial to begin using the S3 console to store your archive datasets in the Amazon Glacier storage classes. 

## What you'll accomplish
<a name="what-you-will-accomplish"></a>
+ Create an Amazon S3 bucket 
+ Upload objects to the Amazon Glacier storage classes 
+ Restore your objects stored in the Amazon Glacier Flexible Retrieval or S3 Glacier Deep Archive storage classes 

## Implementation
<a name="implementation"></a>

### Step 1: Getting started using the Amazon Glacier storage classes
<a name="primary-step"></a>

1. Sign into the Amazon S3 console
   + If you have not already done so, create an AWS account. [Access this support page for more information on how to create and activate a new AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). 
   + Log into the [AWS Management Console](https://console.aws.amazon.com/) using your account information. 
   + From the AWS console services search bar, enter ‘**S3**’. Under the services search results section, select **S3**. You may notice an option for Amazon Glacier. This option is for the Glacier service prior to integration with Amazon S3. We recommend all new Amazon Glacier users use the S3 console.   
![The AWS Management Console showing search results for 'S3', highlighting Amazon S3 (Scalable Storage in the Cloud) and Amazon Glacier (Archive Storage in the Cloud) services.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/ltjfi-console-ffde-search-results.png)

1. Create an S3 bucket

   Choose **Buckets** from the S3 menu on the left rail and then select the **Create bucket** button.   
![The Amazon S3 web console showing the Buckets overview, account storage snapshot, and the option to create a new bucket. The interface displays total storage, object count, and average object size, along with account navigation and Storage Lens dashboard options.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/console-buckets-overview-account-snapshot.png)

1. Configure the bucket
   + Enter a descriptive globally unique name for your bucket. 
   + Select which AWS Region you would like your bucket created in. 
   + The default Block Public Access setting is appropriate for this workload, so leave this section as is.   
![The AWS Management Console showing configuration of a new S3 bucket named 'glacier-accounting-archive-1001', with the AWS Region set to US East (N. Virginia) us-east-1. Part of a tutorial for using Glacier storage classes.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/configure-bucket-adc-console-configuration.png)

1. Enable versioning

   Next, enable bucket versioning to protect your data from accidental or malicious user deletes or overwrites. 

   [Read more about bucket versioning here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html). Then, add some tags to help track costs associated with our archive data over time. 

   [You can find more information about S3 bucket cost allocation tagging here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/CostAllocTagging.html).   
![The AWS S3 console with bucket versioning enabled and example tags (dept: accounting, archive: true) being added to an S3 bucket. Demonstrates how to configure versioning and tagging for an S3 bucket in Amazon Web Services.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/bucket-versioning-acfd-console-enabled.png)

1. Enable default encryption

   Next, you have the option of enabling default ‘at-rest’ encryption for the bucket. The settings here will apply to any objects uploaded to the bucket where you have not defined at-rest encryption details during the upload process. 

   For this example, enable server-side encryption leveraging S3 service managed keys (SSE-S3). If your workload requirements are not satisfied by SSE-S3, you can also leverage AWS Key Management Service (KMS). [More information about Amazon S3 and AWS KMS can be found here](https://docs.aws.amazon.com/kms/latest/developerguide/services-s3.html).   
![The default encryption settings for an S3 bucket in the AWS Management Console, with server-side encryption enabled using the Amazon S3 key (SSE-S3) option.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/encryption-default-settings-bucket-console.png)

1. Enable S3 Object Lock

   Now you have the option to enable [S3 Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html) in the **Advanced settings** section. With S3 Object Lock, you can store objects using a write-once-read-many (WORM) model. S3 Object Lock can help prevent objects from being deleted or overwritten for a fixed amount of time, or indefinitely. 

   S3 Object Lock can be used to help meet regulatory requirements that require WORM storage, or to simply add another layer of protection against object changes and deletion. 

   For this workload, it is appropriate to enable S3 Object Lock to ensure important archived data is not deleted prematurely by unauthorized users. 
   + Choose **Enable.** 
   + Select the check box to acknowledge enabling the S3 Object Lock settings 
   + Select the **Create bucket** button.   
![The AWS Management Console showing the advanced settings for enabling Object Lock on an S3 bucket. The 'Enable' option is selected, and a warning informs users that enabling Object Lock will permanently allow objects in the bucket to be locked, ensuring data integrity and regulatory compliance. The interface includes options, acknowledgments, and the 'Create bucket' button.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/object-lock-ebeff-console-advanced.png)

1. Configure S3 Object Lock

   Next, the S3 console will present a banner indicating the bucket creation was successful. The S3 console will also present a prompt informing you that additional configuration is needed to enable the S3 Object Lock feature. 

   Select the **bucket details** link presented in the prompt. Making this selection will open the **Properties** tab for your newly created bucket. 
**Note**  
For this exercise, use **Governance** mode for the S3 Object Lock configuration. This will allow you to permanently delete your test object using an admin user after this tutorial has completed.

   For more information about S3 Object Lock, read the blog featuring "[Protecting data with Amazon S3 Object Lock](https://aws.amazon.com/blogs/storage/protecting-data-with-amazon-s3-object-lock/)."   
![A successful creation of an Amazon S3 bucket named 'glacier-accounting-archive-100101' in the AWS Management Console. The image also highlights an additional configuration notice about enabling Object Lock to protect objects from being deleted or overwritten.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/successful-acbc-dbfe-creation-bucket-named.png)

1. Edit the S3 Object Lock

   On the bucket **Properties** tab, navigate to the **Object Lock** section and select the **Edit** button. Here you can set your default values for objects uploaded to your bucket. 

   For this example, you want to enable retention for all objects uploaded to this bucket for 5 years. Select **Enable** for the **Default retention** option, choose governance mode by selecting the **Governance** option under **Default retention** **mode** and enter **5** as the default retention period. 

   Lastly, select **Years** for the unit of measure and then select the **Save changes** button.   
![The AWS Management Console showing how to enable and configure object lock settings for Amazon Glacier storage classes, including default retention mode, retention period, and governance options.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/umdn-edit-object-lock-console-how-enable.png)

### Step 2: Uploading data to an Amazon S3 bucket
<a name="uploading-data-to-an-amazon-s3-bucket"></a>

Now that your bucket has been created and configured, you are ready to upload archive data to the Amazon Glacier storage classes.  

1. Select the bucket

   If you have logged out of your AWS Management Console session, log back in. 

   Navigate to the [S3 console](https://s3.console.aws.amazon.com/s3/home) and select the **Buckets** menu option. 

   From the list of available buckets, select the bucket name of the bucket you just created.   
![The Amazon S3 console showing the Buckets section, an account snapshot, and a list of buckets including a Glacier storage class archive, used in a tutorial for uploading objects to Amazon Glacier.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/object-upload-cdeaecb-console-buckets.png)

1. Start the upload

   Next, choose the **Objects** tab. Then from within the **Objects** section, select the **Upload** button.   
![The Amazon S3 console showing the 'glacier-accounting-archive-100101' bucket with the Objects tab selected, highlighting the 'Upload' button for uploading an object in a Glacier storage class tutorial.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/upload-object-console-accounting-archive.png)

1. Select the file to upload

   Then, select the **Add files** button. 

   Navigate your local file system to locate the archive file you would like to upload. 

   Select the appropriate file and then select **Open**. 

   Your file will be listed in the **Files and folders** section.   
![The Amazon S3 web console showing the Upload interface for Glacier storage classes, with the option to add files and folders. The interface highlights the process of uploading a file named '1G_tf_1.dat' with a size of 1.0 GB using the 'Add files' button.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/files-fdca-ebeff-console-upload-interface.png)

1. Select the storage class

   In the **Properties** section, select the S3 storage class you would like to upload your archive to. 

   Select **Glacier Deep Archive**, as the example dataset needs to be retained for 5 years and there is a low probability the data will be accessed often. 
**Note**  
If your workload requires milliseconds access and single API call access to your archived data, the Amazon Glacier Instant Retrieval storage class should be selected here instead. More information about the Amazon Glacier storage class options can be viewed [here](https://aws.amazon.com/s3/storage-classes/glacier/).

   Leave the rest of the options on the default settings and select the **Upload** button.  
**Note**  
Objects stored in many S3 storage classes have minimum object durations associated with them. In this case, uploading the test file to Glacier Deep Archive will result in 180 days of billing even if it is deleted early. Storing 1 GB in S3 Glacier Deep Archive for 180 days with the retrieval is \~$0.03. [You can read more about S3 pricing here](https://aws.amazon.com/s3/pricing/).  
![A table showing Amazon S3 storage classes, their use cases, availability zones, and minimum storage durations. The highlighted row describes 'Glacier Deep Archive', designed for long-lived archive data accessed less than once a year, with a minimum storage duration of 180 days.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/bnu-table-their-use-cases-availability.png)

1. Review the status

   A banner will be displayed providing you with details of the file’s upload status.   
![The upload status interface for Amazon Glacier storage classes in the AWS console, displaying uploading progress, remaining file size, estimated time, and transfer rate.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/por-upload-status-interface-console.png)

1. Confirm the upload completed

   After your file upload operations have completed, you will be presented with a summary of the operations indicating if it has completed successfully or if it has failed. 

   In this case, the file has uploaded successfully. Select the **Close** button.   
![The AWS Management Console showing a successful upload to an Amazon Glacier storage class, with 1 file (1.0 GB) uploaded and no failed uploads.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/glhqo-upload-successful-ecf-bda-console.png)

### Step 3: Restore your data
<a name="restore-your-data"></a>

Now that you have successfully uploaded your data to S3 Glacier Deep Archive, let’s go over the process of restoring your data. 

**Note**  
the process of restoring your data before it can be accessed, is required for data that is stored in the Amazon Glacier Flexible Retrieval and S3 Glacier Deep Archive storage classes. Data stored in the Amazon Glacier Instant Retrieval storge class does not require this restore request prior to being accessed. You can learn more about Amazon Glacier Instant Retrieval [here](https://aws.amazon.com/s3/storage-classes/glacier/instant-retrieval/).

1. Select the object to restore

   If you have logged out of your AWS Management Console session, log back in. 
   + Navigate to the [S3 console](https://s3.console.aws.amazon.com/s3/home) and select the **Buckets** menu option. 
   + From the list of available buckets, select the bucket name of the bucket you have created for this exercise. 
   + From the **Objects** menu, select the name of the test file you just uploaded.   
![The Amazon S3 management console showing a bucket named 'glacier-accounting-archive-100101' with objects stored in the Glacier Deep Archive storage class. The image demonstrates how to view and initiate the restore process for archived objects using Amazon Glacier storage classes.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/initiate-restore-management-console-bucket.png)

1. Initiate the restore

   After selecting your test file’s name, you will be presented with a banner indicating that your object is stored in the S3 Glacier Deep Archive storage class and that you need to restore it if you would like to access your data. 

   You can initiate the restore process by simply selecting the **Initiate restore button** attached to the information banner, or you can choose **Initiate restore** from the **Object actions** menu. 
**Note**  
The restore process will create a copy of your archived data and will store that copy in the S3 Standard storage class. During the restore initiation process you will set the number of days that you wish to have your data available. During this time period, you will incur applicable storage charges for your data in both the archive storage class as well as in the active storage class.  
![The Amazon S3 console showing an object stored in the Glacier Deep Archive storage class with an 'Initiate restore' option highlighted. This page demonstrates how to restore an archived object in AWS S3.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/initiate-restore-page-console-object.png)

1. Configure the restore

   From the **Initiate restore** page, you will define the number of days you desire to make your restored copy available. 

   Next, you will have a choice between standard or bulk retrieval. Data stored in the Amazon Glacier Flexible Retrieval storage class will additionally have an option to select expedited retrieval. [More information about restore options can be found here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html). 

   For this exercise, choose the **Standard retrieval** option. Then, select the **Initiate restore** button to continue.   
![The Amazon S3 console showing how to configure a restore request for objects stored in Glacier Deep Archive. The interface displays options to select the number of days the restored copy is available, retrieval tier (standard or bulk), and lists specified objects with details such as name, type, storage class, and last modified date.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/configure-restore-cda-caba-console-how.png)

1. Wait for the restore to complete

   A summary page will be displayed indicating if the restore request was successful or if any errors occurred. In this case, the restore request was successful. Select the **Close** button to continue. 

   For this standard restore from S3 Glacier Deep Archive, you will need to wait about 12 hours for the temporary object to be restored to the Amazon S3 Standard-IA storage class. S3 Event notifications support alerting when an object restore event has completed. [More information about S3 Event notifications can be found in the Amazon S3 documentation here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html).   
![The restore status page in Amazon S3 for Glacier storage classes, indicating a successfully initiated restore with 1 object restored and no failed restore requests.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/azk-restore-status-page-indicating.png)

1. Verify restore has completed

   Now you can verify that your object has been restored. After waiting about twelve hours for the restore operation to complete, log back into your [S3 console](https://s3.console.aws.amazon.com/s3/home). 

   Select **Buckets** from the left rail menu, and select the name of your bucket to view its contents. From the **Objects** section, select the file name of the object you have attempted to restore to see its current status. 

   Here you can see that the object’s **Restore status** is listed as **Completed**. The **Restoration** **expiry date**, which is based on the number of days we defined in the restore process, is listed as well. You have successfully restored your archived object. This object will be available until the time specified in the **Restoration expiry date** section. 

   You can now perform actions like run S3 select queries against this file, copy the object to another bucket in your account or to another account, or download the data to your local machine.   
![The Amazon S3 console showing a file stored in the Glacier Deep Archive storage class with restoration complete status and the restoration expiry date displayed.](http://docs.aws.amazon.com/hands-on/latest/getting-started-using-amazon-s3-glacier-storage-classes/images/restore-complete-console-file-stored-deep.png)

### Clean up resources
<a name="clean-up-resources"></a>

In the following steps, you clean up the resources you created in this tutorial. It is a best practice to delete resources that you are no longer using so that you do not incur unintended charges. 

1. Delete your test object

   1. If you have logged out of your AWS Management Console session, log back in. 

   1. Navigate to the [S3 console](https://s3.console.aws.amazon.com/s3/home) and select the **Buckets** menu option. 

   1. First you will need to delete the test object from your test bucket. Select the **name** of the bucket you have been working with for this tutorial. 

   1. Put a check mark in the checkbox to the left of your test object name, then select the **Delete** button. 

   1. On the **Delete objects** page, verify that you have selected the proper object to delete and type **permanently delete** into the **Permanently delete objects** confirmation box. 

   1. Then, select the **Delete object** button to continue. Next, you will be presented with a banner indicating if the deletion has been successful. 

1. Delete your test bucket

   1. Finally, you need to delete the test bucket you have created. Return to the list of buckets in your account. 

   1. Select the radio button to the left of the bucket you created for this tutorial, and then select the **Delete** button. 

   1. Review the warning message. If you desire to continue deletion of this bucket, type the bucket name into the **Delete bucket** confirmation box and select **Delete bucket**. 

## Congratulations\!
<a name="congratulations"></a>

You have learned how to create an Amazon S3 bucket, upload objects to the Amazon Glacier and S3 Glacier Deep Archive storage classes, and how to restore your objects so that they can be easily retrieved. 