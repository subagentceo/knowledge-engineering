

# Set Up a Continuous Deployment Pipeline Using AWS CodePipeline
<a name="continuous-deployment-pipeline"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Minimum time to complete** | 30 minutes  | 
| **Cost to complete** | [Free Tier](https://aws.amazon.com/free/?e=gs2020&p=build-a-react-app-intro) eligible  | 
| **Services used** | [AWS CodePipeline](https://aws.amazon.com/codepipeline/) <br />[AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)  | 
| **Last updated** | February 14, 2023  | 

## Overview
<a name="overview"></a>

In this tutorial, you will learn how to create an automated software release pipeline that deploys a live sample app. You will create the pipeline using AWS CodePipeline, a service that builds, tests, and deploys your code every time there is a code change. You will use your GitHub account, an Amazon Simple Storage Service (Amazon S3) bucket, or an AWS CodeCommit repository as the source location for the sample app’s code. You will also use AWS Elastic Beanstalk as the deployment target for the sample app. Your completed pipeline will be able to detect changes made to the source repository containing the sample app and then automatically update your live sample app. 

Continuous deployment allows you to deploy revisions to a production environment automatically without explicit approval from a developer, making the entire software release process automated. 

Everything done in this tutorial is Free Tier eligible. 

## What you will accomplish
<a name="what-you-will-accomplish"></a>

In this tutorial, you will: 
+ create an automated software release pipeline that deploys a live sample app 
+ create the pipeline using AWS CodePipeline 
+ use AWS Elastic Beanstalk as the deployment target for the sample app 

## Prerequisites
<a name="prerequisites"></a>

Before starting this tutorial, you will need an AWS account. If you don't already have one, follow the [Setting Up Your AWS Environment](https://docs.aws.amazon.com/hands-on/latest/setup-environment/) getting started guide for a quick overview. 

## Implementation
<a name="implementation"></a>

### Step 1: Create a deployment environment
<a name="create-a-deployment-environment"></a>

Your continuous deployment pipeline will need a target environment containing virtual servers, or Amazon EC2 instances, where it will deploy sample code. You will prepare this environment before creating the pipeline. 

To simplify the process of setting up and configuring EC2 instances for this tutorial, you will spin up a sample environment using AWS Elastic Beanstalk. With Elastic Beanstalk you can easily host web applications without needing to launch, configure, or operate virtual servers on your own. It automatically provisions and operates the infrastructure (such as virtual servers and load balancers) and provides the application stack (such as OS, language and framework, and web and application server) for you. 

1. Create an application

   To start, open the [Elastic Beanstalk console](https://us-east-1.console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/welcome) and choose **Create Application.**   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/resource-creation-interface.png)

1. Configure the application

   For **Application name,** enter **Deployment Tutorial.** Select **PHP** from the dropdown menu under **Platform**, and choose **Create application.** 
**Note**  
If you have created an Elastic Beanstalk application before, choose **Create New Application** on the upper-right corner. Name your application and create a new **web server environment**. Select **PHP** as your **Platform** and **Single Instance** as your **Environment type.** If you are planning to remote login to your instances, select a key pair. Otherwise, leave default values for the remaining options and create the environment for your continuous deployment pipeline.  
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/resource-creation-interface-1.png)

1. Create a sample environment

   Elastic Beanstalk will begin creating a sample environment for you to deploy your application to. It will create an Amazon EC2 instance, a security group, an Auto Scaling group, an Amazon S3 bucket, Amazon CloudWatch alarms, and a domain name for your application. 
**Note**  
This will take several minutes to complete.  
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/resource-creation-interface-2.png)

### Step 2: Get a copy of the sample code
<a name="get-a-copy-of-the-sample-code"></a>

In this step, you will retrieve a copy of the sample app’s code and choose a source to host the code. The pipeline takes code from the source and then performs actions on it. 

You can use one of three options as your source: a GitHub repository, an Amazon S3 bucket, or an AWS CodeCommit repository. Select your preference and follow the steps. 

------
#### [ GitHub ]

Use this procedure if you would like to use your GitHub account as your source. 
+ Fork the repository

  If you would like to use your GitHub account: 
  + Visit our GitHub repository containing the sample code at [https://github.com/aws-samples/aws-codepipeline-s3-codedeploy-linux.](https://github.com/aws-samples/aws-codepipeline-s3-codedeploy-linux) 
  + Fork a copy of the repository to your own GitHub account by choosing the **Fork** button in the upper-right corner. 

  Then, go to **Create your pipeline**.   
![The navigation bar showing visit our github repository containing the sample code at https://github.com/aws-samp...](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/navigation-bar-visit-our-github-repository.png)

------
#### [ Amazon S3 ]

Use this procedure if you would like to use Amazon S3 as your source. 

1. Navigate to the sample code

   If you plan to use Amazon S3 as your source, you will retrieve the sample code from the AWS GitHub repository, save it to your computer, and upload it to an Amazon S3 bucket. 
   + Visit our GitHub repository containing the sample code at [https://github.com/aws-samples/aws-codepipeline-s3-codedeploy-linux](https://github.com/aws-samples/aws-codepipeline-s3-codedeploy-linux) 
   + Select the **dist** folder.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-1.png)

1. Download the files

   Save the source files to your computer: 

   1. Select the file named **aws-codepipeline-s3-aws-codedeploy\_linux.zip**. 

   1. Choose **View raw**. 

   1. Save the sample file to your local computer.   
![GitHub repository page showing a downloadable ZIP file with a "View raw" option highlighted in red.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/github-repository-page-downloadable-zip-1.png)

1. Create a bucket

   Open the [Amazon S3 console](https://console.aws.amazon.com/s3/) and choose **Create bucket**.   
![Amazon S3 dashboard showing a list of buckets with a highlighted 'Create bucket' button.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/dashboard-list-buckets-highlighted-bucket.png)

1. Configure bucket details

   **Bucket name:** Enter a unique name for your bucket, such as **awscodepipeline-demobucket-variables**. All bucket names in Amazon S3 must be unique, so use one of your own, not one with the name shown in the example. 

   **Region:** In the dropdown, select the Region where you will create your pipeline, such as US East (N. Virginia). 

   Choose **Create bucket**.   
![The AWS S3 "Create bucket" configuration page, showing fields for bucket name, region selection, object ownership, public access settings, versioning, tags, encryption, and an orange "Create bucket" button.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/bucket-configuration-page-fields-name.png)

1. View the created bucket

   The console displays the newly created bucket, which is empty.   
![The AWS S3 console showing a successfully created bucket notification and a list of buckets with details including name, region, access settings, and creation date.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/console-successfully-created-bucket.png)

1. Open the bucket

   You will now upload the sample code to the Amazon S3 bucket. Select the Amazon S3 bucket.   
![The Amazon S3 dashboard showing a successfully created bucket named "awscodepipeline-demobucket-8302022" with details about its region, access, and creation date.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/dashboard-successfully-created-bucket.png)

1. Upload the sample code

   Select **Upload**.   
![An empty Amazon S3 bucket interface with an "Upload" button highlighted in orange.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/empty-bucket-interface-upload-button.png)

1. Add files

   Select **Add files** to upload the zip file you downloaded earlier or drag and drop the file. Then select **Upload**. 

   Then, go to **Create your pipeline**.   
![The AWS S3 upload interface showing a selected file named 'aws-codepipeline-s3-aws-codedeploy_linux.zip' with a size of 5.8 KB, ready to be uploaded to the specified bucket.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/upload-interface-selected-file-named-1.png)

------
#### [ AWS CodeCommit ]

Use this procedure if you would like to use AWS CodeCommit as your source. 

1. Navigate to the sample code

   If you plan to use AWS CodeCommit as your source, you will retrieve the sample code from the AWS GitHub repository, save it to your computer, and upload it to an AWS CodeCommit repository. 
   + Visit our GitHub repository containing the sample code at [https://github.com/aws-samples/aws-codepipeline-s3-codedeploy-linux](https://github.com/aws-samples/aws-codepipeline-s3-codedeploy-linux) 
   + Select the **dist** folder.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-1.png)

1. Download the files

   Save the source files to your computer: 

   1. Select the file named **aws-codepipeline-s3-aws-codedeploy\_linux.zip**. 

   1. Choose **View raw**. 

   1. Save the sample file to your local computer.   
![GitHub repository page showing a downloadable ZIP file with a "View raw" option highlighted in red.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/github-repository-page-downloadable-zip-1.png)

1. Create a repository

   Open the [AWS CodeCommit console](https://us-east-1.console.aws.amazon.com/codesuite/codecommit/start) and choose **Create repository**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/resource-creation-interface-3.png)

1. Configure repository settings

   On the **Create repository** page: 

   Enter **PipelineRepo** for **Repository name**. 

   Choose **Create**.   
![AWS CodeCommit interface for creating a repository, with "PipelineRepo" entered as the repository name and the "Create" button highlighted.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/acclong-interface-creating-repository.png)

1. Upload sample code

   Once the repository is successfully created, scroll down to the **PipelineRepo** section and select **Add file**, then choose **Upload file**.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-controls-buttons.png)

1. Select the sample code file

   On the **Upload a file** page, choose the **Choose file** button and select the downloaded aws-codepipeline-s3-aws-codedeploy\_linux.zip file.   
![AWS CodeCommit interface showing the "Upload a file" section with a highlighted "Choose file" button.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/acclong-interface-upload-file-section-1.png)

1. Commit changes to main

   Enter an **Author name** and **Email address**, then choose **Commit changes**. 

   Then, go to **Create your pipeline**.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-controls-buttons-2.png)

------

### Step 3: Create your pipeline
<a name="create-your-pipeline"></a>

In this step, you will create and configure a simple pipeline with two actions: source and deploy. You will provide CodePipeline with the locations of your source repository and deployment environment. 

1. Create a pipeline

   Open the [AWS CodePipeline console.](https://console.aws.amazon.com/codepipeline) 

   On the **Welcome** page, choose **Create pipeline.**    
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/resource-creation-interface-4.png)

1. Configure pipeline settings

   On the **Step 1: Choose pipeline settings** page: 
   + **Pipeline name:** Enter the name for your pipeline, **DemoPipeline**.  
   + Choose **Next.** 
**Note**  
After you create a pipeline, you cannot change its name.  
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-2.png)

1. Choose your source

   On the **Step 2: Add source stage** page, select the location of the source you selected using the following instructions. 

------
#### [ GitHub ]

1. Add source

   Select **GitHub (Version 2)** for the **Source provider**. 

   Choose **Connect to GitHub**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-interface-element.png)

1. Enter a connection name

   Enter **Deployment Tutorial** for **Connection name** and choose **Connect to GitHub**.   
![AWS Developer Tools interface showing the 'Create a connection' page with a connection name 'Deployment Tutorial' and a highlighted 'Connect to GitHub' button.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/developer-tools-interface-connection-page.png)

1. Grant permissions

   Select **Authorize AWS Connector for GitHub**.   
![Authorization prompt for AWS Connector for GitHub requesting permissions, with options to "Cancel" or "Authorize AWS Connector for GitHub.".](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/authorization-connector-github-requesting.png)

1. Install a new app

   When redirected back to the connection screen, choose **Install a new app**.   
![AWS Developer Tools interface showing GitHub connection settings with a "Connection name" field, "Install a new app" button highlighted, and "Connect" button at the bottom.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/developer-tools-interface-github.png)

1. Install the forked repository

   On the **Install AWS Connector for GitHub** page, choose **Only select repositories** and select the **aws-codepipeline-s3-codedeploy-linux** repository forked in the previous step. 

   Choose **Install**.   
![Installation screen for AWS Connector for GitHub, showing the option to select specific repositories with one repository highlighted, and an 'Install' button at the bottom.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/installation-screen-connector-github.png)

1. Connect to GitHub

   Once redirected back to the **Connect to GitHub** page, choose **Connect**.   
![AWS Developer Tools interface showing GitHub connection settings with a connection name 'Deployment Tutorial' and a highlighted 'Connect' button.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/developer-tools-interface-github-1.png)

1. Specify a repository and branch

   The **Add source** page will be updated to reflect GitHub is ready to connect. Specify the repository and branch: 

   **Repository name:** In the dropdown list, select the GitHub repository you want to use as the source location for your pipeline. Select the forked repository in your GitHub account named aws-codepipeline-s3-codedeploy-linux. 

   **Branch name:** In the dropdown list, select the branch you want to use, **master**. 

   **Output artifact format**: Select **CodePipeline default**. 

   Choose **Next**.   
![AWS CodePipeline setup screen showing repository name "greggirl/aws-codepipeline-s3-codedeploy-linux," branch name "master," and selected options for change detection and output artifact format.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/acplong-setup-screen-repository-name.png)

1. Skip build stage

   A true continuous deployment pipeline requires a build stage, where code is compiled and unit tested. CodePipeline lets you plug your preferred build provider into your pipeline. However, in this tutorial you will skip the build stage. 

   In **Step 3: Add build stage**, choose **Skip build stage**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-4.png)

1. Choose Skip

   In the confirmation dialog, select **Skip**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-5.png)

1. Configure deploy stage

   In the **Step 4: Add deploy stage** page: 

   **Deploy provider**: Select **AWS Elastic Beanstalk**. 

   **Region**: Retain the default region. 

   **Application name**: Select **Deployment Tutorial**. 

   **Environment name**: Select **Deploymenttutorial-env**. 

   Click **Next**. 

   Continue to **Activate your pipeline to deploy your code**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-5.png)

------
#### [ Amazon S3 ]

1. Add source

   Select **Amazon S3** for the **Source provider**, select the Amazon S3 bucket you created, and then enter the S3 object key for the file uploaded, for example: **aws-codepipeline-s3-aws-codedeploy\_linux.zip**. 

   Choose **Next**.   
![AWS CodePipeline interface showing the "Add source stage" step, with Amazon S3 selected as the source provider, a specified bucket name, and an S3 object key entered, alongside change detection options.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/acplong-interface-source-stage-selected.png)

1. Skip build stage

   A true continuous deployment pipeline requires a build stage, where code is compiled and unit tested. CodePipeline lets you plug your preferred build provider into your pipeline. However, in this tutorial you will skip the build stage. 

   In **Step 3: Add build stage**, choose **Skip build stage**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-4.png)

1. Choose Skip

   In the confirmation dialog, select **Skip**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-5.png)

1. Configure deploy stage

   In the **Step 4: Add deploy stage** page: 

   **Deploy provider**: Select **AWS Elastic Beanstalk**. 

   **Region**: Retain the default region. 

   **Application name**: Select **Deployment Tutorial**. 

   **Environment name**: Select **Deploymenttutorial-env**. 

   Click **Next**. 

   Continue to **Activate your pipeline to deploy your code**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-5.png)

------
#### [ AWS CodeCommit ]

1. Add source

   Select **AWS CodeCommit** for the **Source provider**. 

   **Repository name:** In the dropdown list, choose the **PipelineRepo repository** you created to use as the source location for your pipeline. 

   **Branch name:** In the dropdown list, choose the branch you want to use, **main**. 

   **Output artifact format:** Choose **CodePipeline default**. 

   Choose **Next**.   
![AWS CodePipeline interface showing the "Add source stage" step with options for source provider (AWS CodeCommit), repository name (PipelineRepo), branch name (main), change detection (Amazon CloudWatch Events), and output artifact format (CodePipeline default).](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/acplong-interface-source-stage-options.png)

1. Skip build stage

   A true continuous deployment pipeline requires a build stage, where code is compiled and unit tested. CodePipeline lets you plug your preferred build provider into your pipeline. However, in this tutorial you will skip the build stage. 

   In **Step 3: Add build stage**, choose **Skip build stage**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-4.png)

1. Choose Skip

   In the confirmation dialog, select **Skip**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-5.png)

1. Configure deploy stage

   In the **Step 4: Add deploy stage** page: 

   **Deploy provider**: Select **AWS Elastic Beanstalk**. 

   **Region**: Retain the default region. 

   **Application name**: Select **Deployment Tutorial**. 

   **Environment name**: Select **Deploymenttutorial-env**. 

   Click **Next**. 

   Continue to **Activate your pipeline to deploy your code**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-5.png)

------

### Step 4: Activate your pipeline to deploy your code
<a name="activate-your-pipeline-to-deploy-your-code"></a>

In this step, you will launch your pipeline. Once your pipeline has been created, it will start to run automatically. First, it detects the sample app code in your source location, bundles up the files, and then moves them to the second stage that you defined. During this stage, it passes the code to Elastic Beanstalk, which contains the EC2 instance that will host your code. Elastic Beanstalk handles deploying the code to the EC2 instance. 

1. Review configuration and create pipeline

   In the **Step 5: Review** page, review the information and choose **Create pipeline**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/resource-creation-interface-5.png)

1. Monitor the pipeline status

   After your pipeline is created, the pipeline status page appears and the pipeline automatically starts to run. You can view progress as well as success and failure messages as the pipeline performs each action. 

   To verify your pipeline ran successfully, monitor the progress of the pipeline as it moves through each stage. The status of each stage will change from No executions yet to **In progress**, and then to either **Succeeded** or **Failed**. The pipeline should complete the first run within a few minutes.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/resource-creation-interface-6.png)

1. Select Elastic Beanstalk

   In the status area for the Beta stage, select **AWS Elastic Beanstalk**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-15.png)

1. Select the environment

   The AWS Elastic Beanstalk console opens with the details of the deployment. 

   Select the environment you created earlier, called **Default-Environment Deploymenttutorial-env**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-7.png)

1. Select the URL of the sample website

   Select the URL to view the sample website you deployed. 

   A webpage with a congratulations message indicating you successfully created a pipeline from your source to Amazon EC2 will open.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-17.png)

### Step 5: Commit a change and then update your app
<a name="commit-a-change-and-then-update-your-app"></a>

In this step, you will revise the sample code and commit the change to your repository. CodePipeline will detect your updated sample code and then automatically initiate deploying it to your EC2 instance by way of Elastic Beanstalk. 

Note that the sample web page you deployed refers to AWS CodeDeploy, a service that automates code deployments. In CodePipeline, CodeDeploy is an alternative to using Elastic Beanstalk for deployment actions. Let’s update the sample code so that it correctly states that you deployed the sample using Elastic Beanstalk. 

Choose the appropriate tab based on the code source you used.

------
#### [ GitHub ]

1. Edit the code

   Visit your own copy of the repository that you forked in GitHub. 

   Open **index.html**. 

   Select the **Edit icon**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-6.png)

1. Insert text

   Update the webpage by copying and pasting the following text on line 30: 

   You have successfully created a pipeline that retrieved this source application from GitHub and deployed it to one Amazon EC2 instance using AWS Elastic Beanstalk. You’re one step closer to practicing continuous deployment\!   
![HTML code snippet with a congratulatory message for successfully creating an AWS CodePipeline deployment.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/code-snippet-congratulatory-message.png)

1. Commit the change

   Commit the change to your repository. 

   Then, go to View the page you updated with GitHub.   
![An HTML code snippet displaying a "Congratulations!" message and instructions for AWS CodePipeline, alongside a GitHub interface for committing changes to a file.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/code-snippet-displaying-congratulations.png)

------
#### [ Amazon S3 ]

1. Edit the code

   On your desktop, visit the zip file you downloaded called **aws-codepipeline-s3-aws-codedeploy\_linux.zip**. 

   Edit the sample web app code: 

   1. Extract index.html from the zip file and open it using your preferred text editor. 

   1. Update the header text that comes after **Congratulations\!** so that it reads: 

      You have successfully created a pipeline that retrieved this source application from Amazon S3 and deployed it to one Amazon EC2 instance using AWS Elastic Beanstalk. You’re one step closer to practicing continuous deployment\! 

   1. Copy the updated index.html file back into **aws-codepipeline-s3-aws-codedeploy\_linux.zip** and replace the older version of index.html.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/resource-creation-interface-7.png)

1. Upload the file to your bucket

   Return to the S3 bucket that you created earlier and select **Upload**.   
![An Amazon S3 bucket interface showing one object, a zip file named "aws-codepipeline-s3-aws-codedeploy_linux.zip," with options to upload, create a folder, and perform actions.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/bucket-interface-one-object-zip-file-named.png)

1. Upload the file to your bucket

   Select **Add files** to upload the updated **aws-codepipeline-s3-aws-codedeploy\_linux.zip** file or drag and drop the file. Then choose **Upload**. 
**Note**  
Because you enabled versioning when you first created the S3 bucket, S3 will save a copy of every version of your files.

   Then, go to View the page you updated in Amazon S3.   
![The AWS S3 upload interface showing a selected file named 'aws-codepipeline-s3-aws-codedeploy_linux.zip' with a size of 5.8 KB, ready to be uploaded to the specified bucket.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/upload-interface-selected-file-named-1.png)

------
#### [ AWS CodeCommit ]

1. Edit the code

   On your desktop, visit the zip file you downloaded called **aws-codepipeline-s3-aws-codedeploy\_linux.zip**. 

   Edit the sample web app code: 

   1. Extract index.html from the zip file and open it using your preferred text editor. 

   1. Update the header text that comes after **Congratulations\!** so that it reads: 

      You have successfully created a pipeline that retrieved this source application from AWS CodeCommit and deployed it to one Amazon EC2 instance using AWS Elastic Beanstalk. You’re one step closer to practicing continuous deployment\!   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/resource-creation-interface-8.png)

1. Upload the file

   From the **CodeCommit PipelineRepo** page, choose **Add file** and select **Upload file**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-7.png)

1. Upload the file

   On the **Upload a file** page, choose the **Choose file** button and select the updated **aws-codepipeline-s3-aws-codedeploy\_linux.zip** file.   
![AWS CodeCommit interface showing the "Upload a file" section with a highlighted "Choose file" button.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/acclong-interface-upload-file-section-1.png)

1. Commit changes

   Enter an Author name and Email address, then choose **Commit changes**.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-controls-buttons-2.png)

------

### Step 6: View the page you updated
<a name="view-the-page-you-updated-with-github"></a>

In this step, you will view the page you updated.

Choose the appropriate tab based on the code source you used.

------
#### [ GitHub ]

1. Choose Elastic Beanstalk

   Return to your pipeline in the CodePipeline console. In a few minutes, you should see the Source change to blue, indicating that the pipeline has detected the changes you made to your source repository. Once this occurs, it will automatically move the updated code to Elastic Beanstalk. 

   After the pipeline status displays **Succeeded**, in the status area for the Beta stage, choose **AWS Elastic Beanstalk**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-15.png)

1. Select the environment

   The AWS Elastic Beanstalk console opens with the details of the deployment. Select the environment you created earlier, called **Deploymenttutorial-env**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-16.png)

1. Select the URL

   Select the URL to view the sample website again.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-17.png)

1. View the page

   Confirm that the updated text appears on the webpage.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-8.png)

------
#### [ Amazon S3 ]

1. Choose Elastic Beanstalk

   Return to your pipeline in the CodePipeline console. In a few minutes, you should see the Source change to blue, indicating that the pipeline has detected the changes you made to your source repository. Once this occurs, it will automatically move the updated code to Elastic Beanstalk. 

   After the pipeline status displays **Succeeded**, in the status area for the Beta stage, choose **AWS Elastic Beanstalk**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-15.png)

1. Select the environment

   The AWS Elastic Beanstalk console opens with the details of the deployment. Select the environment you created earlier, called **Deploymenttutorial-env**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-16.png)

1. Select the URL

   Select the URL to view the sample website again.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-17.png)

1. View the page

   Confirm that the updated text appears on the webpage.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-9.png)

------
#### [ AWS CodeCommit ]

1. Choose Elastic Beanstalk

   Return to your pipeline in the CodePipeline console. In a few minutes, you should see the Source change to blue, indicating that the pipeline has detected the changes you made to your source repository. Once this occurs, it will automatically move the updated code to Elastic Beanstalk. 

   After the pipeline status displays **Succeeded**, in the status area for the Beta stage, choose **AWS Elastic Beanstalk**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-15.png)

1. Select the environment

   The AWS Elastic Beanstalk console opens with the details of the deployment. Select the environment you created earlier, called **Deploymenttutorial-env**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-16.png)

1. Select the URL

   Select the URL to view the sample website again.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/selection-interface-17.png)

1. View the page

   Confirm that the updated text appears on the webpage.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-10.png)

------

### Clean up resources
<a name="clean-up-your-resources"></a>

To avoid future charges, you will delete all the resources you launched throughout this tutorial, which includes the pipeline, the Elastic Beanstalk application, and the source you set up to host the code.   

1. Delete the pipeline

   First, you will delete your pipeline. In the **Pipelines** view, select the pipeline radio button and select **Delete pipeline.**   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-controls-buttons-3.png)

1. Confirm deletion

   To confirm deletion, enter **delete** in the field and choose **Delete**.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-controls-buttons-4.png)

1. Delete the Beanstalk application

   Second, delete your Elastic Beanstalk application. Visit the Elastic Beanstalk **Applications** page. Select the radio button for the **Deployment Tutorial.** Select **Actions** and **Delete application.**   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-controls-buttons-5.png)

1. Confirm deletion

   In the **Confirm Application Deletion** window, enter the name of the application to be deleted and choose **Delete**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-11.png)

### (Optional) Delete Amazon S3 resources
<a name="delete-amazon-s3-resources"></a>

If you used Amazon S3 as your source, you can delete the resources to avoid future charges. 

1. Empty the bucket contents

   Visit the S3 console. First, we will empty the S3 bucket. Select the radio button next to the **awscodepipeline** bucket and choose **Empty.**   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-controls-buttons-6.png)

1. Confirm deletion

   When a confirmation message appears, enter **permanently delete** in the text input field and choose **Empty**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-interface-element-2.png)

1. Delete the bucket

   Now we will delete the bucket. Select the radio button next to the **awscodepipeline** bucket and choose **Delete.**   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-interface-element-2.png)

1. Confirm deletion

   When a confirmation message appears, enter the bucket name and then choose **Delete bucket.**   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-12.png)

### (Optional) Delete AWS CodeCommit resources
<a name="delete-aws-codecommit-resources"></a>

If you used AWS CodeCommit as your source, you can delete the resources to avoid future charges. 

1. Delete the repository

   Open the [AWS CodeCommit repository.](https://console.aws.amazon.com/codecommit) Select the radio button next to the repository you created and choose **Delete repository.**   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-controls-buttons-7.png)

1. Confirm deletion

   A confirmation window will pop up. Enter **delete** and choose **Delete**.    
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/continuous-deployment-pipeline/images/interface-controls-buttons-8.png)

## Conclusion
<a name="conclusion"></a>

Congratulations\! You have successfully created an automated software release pipeline using AWS CodePipeline. Using CodePipeline, you created a pipeline that uses GitHub, Amazon S3, or AWS CodeCommit as the source location for application code and then deploys the code to an Amazon EC2 instance managed by AWS Elastic Beanstalk. Your pipeline will automatically deploy your code every time there is a code change. You are one step closer to practicing continuous deployment\! 