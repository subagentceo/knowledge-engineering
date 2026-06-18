

# Batch Upload Files to Amazon S3 Using the AWS CLI
<a name="backup-to-s3-cli"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 10 minutes  | 
| **Cost to complete** | [Free Tier](https://aws.amazon.com/free/?e=gs2020&p=build-a-web-app-intro) eligible  | 
| **Requires** |  [See the AWS documentation website for more details](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/backup-to-s3-cli.html)  | 
| **Last updated** | Aug 9, 2022  | 

## Overview
<a name="overview"></a>

In this how-to guide, we are going to help you use the AWS Command Line Interface (AWS CLI) to access Amazon Simple Storage Service (Amazon S3). We will do this so you can easily build your own scripts for backing up your files to the cloud and easily retrieve them as needed. This will make automating your backup process faster, more reliable, and more programmatic. You can use this information to build a scheduled task (or cron job) to handle your backup operations. 

**Note**  
This guide builds upon the concepts from the [Store and Retrieve a File with Amazon S3](https://docs.aws.amazon.com/hands-on/latest/backup-files-to-amazon-s3/) how-to guide. If you haven't done that guide yet, you should complete it first.

## Implementation
<a name="implementation"></a>

### Step 1: Create an AWS IAM User
<a name="create-an-aws-iam-user"></a>

In this step, you will use the IAM service to create a user account with administrative permission. In later steps, you will use this user account to securely access AWS services using the AWS CLI. 

1. Sign in to the console

   Click on the [AWS Management Console home](https://console.aws.amazon.com/console/home/?bck-files-amz-s3) to open the console in a new browser window, so you can keep this step-by-step guide open. When this screen loads, enter your user name and password to get started. Then type IAM in the search bar and select **IAM** to open the Identity and Access Management dashboard.   
![The AWS Management Console with a search for IAM highlighted.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/oul-resource-creation-interface.png)

1. Choose Users

   From the AWS Identity and Access Management dashboard, click on Users on the left side.   
![The IAM dashboard.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/qfog-selection-interface.png)

1. Create a user

   Click the **Add user** button.   
![The IAM users window.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/movcb-resource-creation-interface.png)

1. Specify user details

   Enter a user name in the textbox next to **User name**: (we’ll use **AWS\_Admin** for this example) and select **Programmatic access** in the Select AWS Access Type section. Click the **Next: Permissions** button.   
![The IAM add users window.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/bzre-bcca-interface-controls-buttons.png)

1. Add permissions

   Click on **Attach existing policies directly** option. Select **AdministratorAccess** then click **Next: Tags**.   
![Adding permissions window.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/interface-controls-buttons.png)

1. Add tags

   IAM tags are key-value pairs you can add to your user. We’ll skip this step for this example. Click the **Next: Review** button.   
![The add tags window.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/lpix-afb-interface-controls-buttons.png)

1. Review and create

   Take this opportunity to review that all settings are correct. When you are ready, click on **Create user**.   
![Reviewing the user to be created and then creating the user.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/resource-creation-interface.png)

1. Review and create

   Click the **Download Credentials** button and save the `credentials.csv` file in a safe location (you’ll need this later in step 3) and then click the **Close** button.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/resource-creation-interface-1.png)

### Step 2: Install and configure the AWS CLI
<a name="install-and-configure-the-aws-cli"></a>

Now that you have your IAM user, you need to install the AWS CLI. For instructions, select the tab that corresponds to your operating system. 

------
#### [ Windows ]

1. Download and run the Windows installer ([64-bit](https://s3.amazonaws.com/aws-cli/AWSCLI64.msi), [32-bit](https://s3.amazonaws.com/aws-cli/AWSCLI32.msi)). 
**Note**  
Users of Windows Server 2008 v6.0.6002 will need to use a different install method, listed in the [AWS Command Line Interface User Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html?bck-files-amz-s3).

1. Open a command prompt by pressing the Windows Key \+ r to open the run box and enter `cmd` and press the OK button. 

1. Type **aws configure** and press enter. When prompted, enter the following: 

   **AWS Access Key ID [None]:** Enter the **Access Key Id from the credentials.csv** file you downloaded earlier 
**Note**  
This should look something like **AKIAIOSFODNN7EXAMPLE**

   **AWS Secret Access Key [None]:** **Enter the Secret Access Key from the credentials.csv** file you downloaded earlier 
**Note**  
This should look something like **je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY**

   **Default region name [None]:** Enter **us-east-1** 

   **Default output format [None]:** Enter **json** 

![Command prompt showing the aws configure command.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/configuration-settings-interface.png)


------
#### [ macOS / Linux ]

1. Follow [these directions](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html?bck-files-amz-s3) for installing the AWS CLI bundled installer. 

1. **MacOS users:** Open a terminal window by pressing **Command \+ Space** and typing **terminal** in the search window. Then press **enter** to open the terminal window. 

   **Linux users:** Open a terminal window. 

1. Type **aws configure** and press **enter**. Enter the following when prompted: 

   **AWS Access Key ID [None]:** Enter the **Access Key Id from the credentials.csv** file you downloaded earlier 
**Note**  
This should look something like **AKIAIOSFODNN7EXAMPLE**

   **AWS Secret Access Key [None]:** Enter the **Secret Access Key from the credentials.csv** file you downloaded earlier 
**Note**  
This should look something like **je7MtGbClwBF/2Zp9Utk/h3yCo8nvbEXAMPLEKEY**

   **Default region name [None]:** Enter **us-east-1** 

   **Default output format [None]:** Enter **json** 

![Terminal window showing the aws configure command.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/interface-interface-element.png)


------

### Step 3: Using the AWS CLI with Amazon S3
<a name="using-the-aws-cli-with-amazon-s3"></a>

In this step, you will use the AWS CLI to create a bucket in Amazon S3 and copy a file to the bucket. 

1. Create an S3 bucket

   Creating a bucket is optional if you already have a bucket created that you want to use. To create a new bucket named my-first-backup-bucket type: 

   ```
   aws s3 mb s3://my-first-backup-bucket
   ```
**Note**  
Bucket naming has some restrictions; one of those restrictions is that bucket names must be globally unique (for example, two different AWS users can not have the same bucket name); because of this, if you try the command above you will get a BucketAlreadyExists error.  
![Using the aws s3 command to create an S3 bucket.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/lsepzxaw-resource-creation-interface.png)

1. Upload files to Amazon S3

   To upload the file **my first backup.bak** located in the local directory (`C:\users`) to the S3 bucket **my-first-backup-bucket**, you would use the following command: 

   ```
   aws s3 cp “C:\users\my first backup.bak” s3://my-first-backup-bucket/
   ```

   Or, use the original syntax if the filename contains no spaces.   
![Using the aws s3 cp command to upload to an S3 bucket.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/oxl-bda-interface-1.png)

1. Download files from Amazon S3

   To download **my-first-backup.bak** from S3 to the local directory we would reverse the order of the commands as follows: 

   ```
   aws s3 cp s3://my-first-backup-bucket/my-first-backup.bak ./
   ```  
![Using the aws s3 cp command to download from an S3 bucket.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/oxl-bda-interface-1.png)

1. Delete files from Amazon S3

   To delete **my-first-backup.bak** from your **my-first-backup-bucket** bucket, use the following command: 

   ```
   aws s3 rm s3://my-first-backup-bucket/my-first-backup.bak
   ```  
![Using the aws s3 rm command to delete a file from an S3 bucket.](http://docs.aws.amazon.com/hands-on/latest/backup-to-s3-cli/images/interface.png)

## Conclusion
<a name="conclusion"></a>

Congratulations\! You have set up an IAM user, configured your machine for use with the AWS Command Line Interface, and learned how to create, copy, retrieve, and delete files from the cloud. 