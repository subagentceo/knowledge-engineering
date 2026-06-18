

# Create Continuous Delivery Pipeline
<a name="create-continuous-delivery-pipeline"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 35 minutes  | 
| **Cost to complete** | [Free Tier](https://aws.amazon.com/free/?e=gs2020&p=cicd-intro) eligible  | 
| **Services used** | [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)<br /> [AWS CodeBuild](https://aws.amazon.com/codebuild/)<br /> [AWS CodePipeline](https://aws.amazon.com/codepipeline/) | 
| **Last update** | August 18, 2023  | 

## Overview
<a name="overview"></a>

In this tutorial, you will create a continuous delivery pipeline for a simple web application. You will first use a version control system to store your source code. Then, you will learn how to create a continuous delivery pipeline that will automatically deploy your web application whenever your source code is updated. 

## What you will accomplish
<a name="what-you-will-accomplish"></a>

This tutorial will walk you through the steps to create the continuous delivery pipeline discussed above. You will learn to: 
+ Set up a [GitHub](https://github.com/) repository for the application code 
+ Create an [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/?e=gs2020&p=cicd-intro) environment to deploy the application 
+ Configure [AWS CodeBuild](https://aws.amazon.com/codebuild/?e=gs2020&p=cicd-intro) to build the source code from GitHub 
+ Use [AWS CodePipeline](https://aws.amazon.com/codepipeline/?e=gs2020&p=cicd-intro) to set up the continuous delivery pipeline with source, build, and deploy stages 

## Prerequisites
<a name="prerequisites"></a>

Before starting this tutorial, you will need: 
+ An AWS account 
+ A [GitHub](https://github.com/) account 
+ [Git](https://git-scm.com/) installed on your computer 

## Application architecture
<a name="application-architecture"></a>

The following diagram provides a visual representation of the services used in this tutorial and how they are connected. This application uses GitHub, AWS Elastic Beanstalk, AWS CodeBuild, and AWS CodePipeline. 

As we go through the tutorial, we will discuss the services in detail and point to resources that will help you get up to speed with them. 

![A diagram showing a CI/CD deployment workflow using AWS CodePipeline. The flow starts with users pushing source code to a Git repository, which triggers the CodePipeline in AWS Cloud. The pipeline includes steps for source (Git repository), build (AWS CodeBuild), manual approval (review), and deployment to AWS Elastic Beanstalk.](http://docs.aws.amazon.com/hands-on/latest/create-continuous-delivery-pipeline/images/diagram-deployment-workflow-using-acplong.png)


## Modules
<a name="modules"></a>

This tutorial is divided into five short modules. You must complete each module in order before moving on to the next one. 

1. [Module 1: Set Up Git Repo](module-one.md) (5 minutes): Set up a GitHub repository to store the application code. 

1. [Module 2: Deploy Web App](module-two.md) (10 minutes): Create the environment where the web application will be deployed using AWS Elastic Beanstalk. 

1. [Module 3: Create Build Project](module-three.md) (5 minutes): Configure and start the build process for the application using AWS CodeBuild. 

1. [Module 4: Create Delivery Pipeline](module-four.md) (10 minutes): Create a pipeline to automatically build and deploy the application using AWS CodePipeline. 

1. [Module 5: Finalize Pipeline and Test](module-five.md) (5 minutes): Add a review stage to the pipeline and test the pipeline. 