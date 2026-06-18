

# Deploy a Web App on Nginx Server using AWS App Runner
<a name="deploy-webapp-apprunner"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 20 minutes  | 
| **Cost to complete** | Less than $0.16 if completed within two hours and you delete your resources at the end of the tutorial.  | 
| **Get help** | [Troubleshooting AWS CLI](https://repost.aws/tags/TASjhA8h35SAyOPVeqNO2b4Q?view=all&search=troubleshooting&sort=relevant) <br />[Troubleshooting Docker commands and ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/common-errors-docker.html)  | 
| **Last updated** | June 1, 2022  | 

## Overview
<a name="overview"></a>

In this tutorial, you will learn how to deploy a sample containerized application on a Nginx server using AWS App Runner. 

AWS App Runner is a fully managed service that makes it easy for developers to quickly deploy containerized web applications and APIs, at scale and with no prior infrastructure experience required. Start with your source code or a container image. App Runner automatically builds and deploys the web application and load balances traffic with encryption. App Runner also scales up or down automatically to meet your traffic needs. 

## What you will accomplish
<a name="what-you-will-accomplish"></a>

In this tutorial, you will: 
+ Create a container image for your web app 
+ Push the image to Amazon Elastic Container Registry 
+ Create an AWS App Runner service 
+ Clean up your resources 

## Prerequisites
<a name="prerequisites"></a>

Before starting this tutorial, you will need: 
+ An AWS account: if you don't already have one follow the [Setup Your Environment](https://docs.aws.amazon.com/hands-on/latest/setup-environment/) tutorial. 
+ [AWS Command Line Interface](https://aws.amazon.com/cli/) **installed** and **configured**.  
+ [Docker Engine](https://docs.docker.com/engine/install/) **installed**, and the application **started**. 
+ Visual Studio Code **installed**.   

## Implementation
<a name="implementation"></a>

Use the following step-by-step written tutorial or watch the video to learn how to Deploy a Web Applicaton on Nginx Server using AWS App Runner. 

### Step 1: Push container image to Amazon ECR
<a name="push-container-image-to-amazon-ecr"></a>

In this step, you will create a private repository in Amazon ECR and push the container image you built in previous module to the newly created repository. 

1. Create a project directory

   In a new terminal window, **run** the following commands to **create** a new folder called **nginx-web-app**, and **navigate** to the folder. 

   ```
   mkdir nginx-web-appcd nginx-web-app
   ```

1. Open Visual Studio Code

   On your local machine, **navigate** to the Visual Studio Code application, and open the **nginx-web-app** folder.   
![The navigation interface.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/navigation-interface.png)

1. Create an HTML file

   In the **Explorer** section, select the **\+New file** icon, and enter **index.html** for the file name.   
![File explorer showing a new file named 'index.html' being created in the 'NGINX-WEB-APP' folder, with the new file icon highlighted.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/file-explorer-new-named-index-being.png)

1. Add HTML content

   Select the **index.html** file, and **update** it with the following code. Then, **save** the file. 

   ```
   <!DOCTYPE html>
   <html>
   <head>
       <title>Sample Web App</title>
       <style>
           html {
               color-scheme: light;
           }
           body {
               width: 35em;
               margin: 0 auto;
               font-family: Amazon Ember, Verdana, Arial, sans-serif;
           }
       </style>
   </head>
   <body>
       <h1>Welcome to AWS App Runner!</h1>
       <p>If you see this page, the nginx web server is successfully installed and
       working. Further configuration is required.</p>
       <p><em>Thank you for using AWS App Runner!</em></p>
   </body>
   </html>
   ```  
![A Visual Studio Code editor showing an open "index.html" file with basic HTML structure and inline CSS for a sample web app, including a welcome message for AWS App Runner.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/vscidelong-editor-open-index-file-basic.png)

1. Create Dockerfile

   Create another file named **Dockerfile**, and **update** it with the following code. Then, **save** the file. 

   ```
   FROM --platform=linux/amd64 nginx:latest
   WORKDIR /usr/share/nginx/html
   COPY index.html index.html
   ```  
![Visual Studio Code interface showing a Dockerfile with three lines of code: specifying the Nginx image, setting the working directory, and copying an index.html file.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/vscidelong-interface-dockerfile-three.png)

1. Build a container

   In the open terminal window, **run** the following command to create container image. 

   ```
   docker build -t nginx-web-app .
   ```  
![Terminal output showing the process of building a Docker image named "nginx-web-app" with detailed steps and layer information.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/terminal-output-process-building-docker.png)

### Step 2: Create an AWS App Runner Service
<a name="create-an-aws-app-runner-service"></a>

In this module, you will create an AWS App Runner service using the container image you built in previous module. 

1. Create an Amazon ECR repository

   **Sign in** to the AWS Management console in a new browser window, and **open** the Amazon Elastic Container Registry at [https://console.aws.amazon.com/ecr/home](https://console.aws.amazon.com/ecr/home). 

   For **Create a repository**, choose **Create**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/resource-creation-interface.png)

1. Configure repository settings

   On the **Create repository** page, for **Repository name** enter **nginx-web-app**, leave the default selections, and select **Create repository**.   
![AWS console interface for creating a repository, showing settings for visibility, repository name, tag immutability, image scan, and encryption, with "Create repository" button highlighted in orange.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/console-interface-creating-repository.png)

1. View push commands

   Once the repository has been created, select the **radio button** for the repository, and then select **View push commands**.   
![Amazon ECR interface showing a successfully created private repository named 'nginx-web-app' with options like 'View push commands,' 'Delete,' and 'Actions.'.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/ecr-interface-successfully-created-private.png)

1. Push your image

   **Follow** all the steps in the pop-up window, to **authenticate** and **push** the image to the repository.   
![Amazon ECR instructions for pushing a Docker image, showing steps for authentication, building, tagging, and pushing the image using AWS CLI and Docker commands.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/ecr-instructions-pushing-docker-image.png)

### Step 3: Create a container image
<a name="clean-up-resources"></a>

In this step, you will create a container image of a sample web app. 

1. Create an App Runner service

   In the Source and deployment section, leave the default selections for Repository type and Provider. For Container image URI, select Browse.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/resource-creation-interface-1.png)

1. Configure the source

   In the **Source and deployment** section, leave the default selections for **Repository type** and **Provider**. For **Container image URI**, select **Browse**.   
![App Runner source and deployment settings with options for repository type, provider, and container image URI, highlighting the 'Browse' button.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/source-deployment-settings-options.png)

1. Select the container image

   In the pop-up window, for **Image repository**, select **nginx-web-app**, and choose **Continue**.   
![Amazon ECR container image selection screen showing 'nginx-web-app' as the image repository and 'latest' as the image tag, with 'Continue' and 'Cancel' buttons.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/ecr-container-image-selection-screen-nginx.png)

1. Set up ECR access

   In the **Deployment settings** section, for **ECR access role**, select **Create new service role**, and choose **Next**.   
![Deployment settings screen with 'Manual' deployment trigger and 'Create new service role' selected, showing a service role name field pre-filled with 'AppRunnerECRAccessRole' and a highlighted 'Next' button.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/deployment-settings-screen-trigger-new.png)

1. Configure service settings

   On the **Configure service** page, for **Service name** enter **nginx-web-app-service**, and change the **Port** to **80**. Leave the rest as default, and select **Next**.   
![Configuration screen for an AWS service with settings for service name, virtual CPU, memory, and port, showing 'nginx-web-app-service' as the service name and port 80 selected.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/configuration-screen-service-settings-name.png)

1. Review and deploy

   On the **Review and create** page, review all inputs, and choose **Create & deploy**.   
![AWS App Runner interface showing "Review and create" steps for deploying a service, with configuration details and a highlighted "Create & deploy" button.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/arlong-interface-steps-deploying-service.png)

1. Monitor deployment

   It will take several minutes for the service to be deployed. You can **view** the event logs for progress.   
![AWS App Runner interface showing the deployment status "Operation in progress" for an nginx-web-app-service, with event logs detailing deployment steps.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/arlong-interface-deployment-status.png)

1. Access the application

   Once the status updates to **Running**, choose the default domain name URL to view the web app.   
![Service overview for 'nginx-web-app-service' showing status as 'Running' with a default domain URL highlighted.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/service-overview-nginx-status-running.png)

1. Verify the deployment

   The Welcome page and confirmation message should look like the image on the right.   
![Browser window displaying a welcome page for AWS App Runner with a message confirming successful nginx web server installation.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/browser-window-displaying-welcome-page.png)

### Clean up resources
<a name="create-a-container-image"></a>

In this step, you will go through the steps to delete all the resources you created throughout this tutorial. It is a best practice to delete resources you are no longer using to avoid unwanted charges. 

1. Delete the App Runner service

   In the AWS App Runner console, navigate to the **nginx-web-app-service**, choose **Actions**, and select **Delete**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/resource-creation-interface-2.png)

1. Confirm the deletion

   Follow the prompts in the pop-up window to **confirm** deletion of the service.   
![Confirmation dialog for deleting "nginx-web-app-service," requiring the user to type "delete" in a field and click the orange "Delete" button.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/confirmation-dialog-deleting-nginx-service.png)

1. Delete the ECR repository

   In the Amazon ECR console, select the radio button next to the **nginx-web-app repository**, and choose **Delete**.   
![A private repositories interface showing a repository named "nginx-web-app" with details like URI, creation date, tag immutability, scan frequency, and encryption type. The "Delete" button is highlighted in red.](http://docs.aws.amazon.com/hands-on/latest/deploy-webapp-apprunner/images/private-repositories-interface-repository.png)

## Congratulations
<a name="congratulations"></a>

You have containerized a sample web app running on a Nginx server and pushed the image to Amazon Elastic Container Registry. Then, you created an AWS App Runner service using the image. 