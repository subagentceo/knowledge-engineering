

# Set up an AWS Transfer Family web app
<a name="set-up-an-aws-transfer-family-web-app"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 25 minutes  | 
| **Cost to complete** | Less than $0.50 if completed in 1 hour  | 
| **Services used** | [AWS Transfer Family](https://aws.amazon.com/aws-transfer-family/web-apps/)<br /> [Amazon S3](https://aws.amazon.com/s3/)<br /> [AWS IAM Identity Center](https://aws.amazon.com/iam/identity-center/) | 
| **Last updated** | April 04, 2025  | 

## Overview
<a name="overview"></a>

[AWS Transfer Family web apps](https://docs.aws.amazon.com/transfer/latest/userguide/web-app.html) offer a straightforward, no-code, fully managed browser-based experience that enables secure file transfers to and from [Amazon Simple Storage Service (Amazon S3)](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html). Organizations can reduce their operational overhead by eliminating the need to install, support, and troubleshoot various file transfer clients across different end-user devices and operating systems by adopting this browser-based solution. 

This approach is particularly beneficial for non-technical users, as client applications can be challenging to operate. These web apps are natively integrated with [AWS IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html) and [Amazon S3 Access Grants](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-grants.html), ensuring that only authenticated users can view the data they are authorized to access. 

## What you will accomplish
<a name="what-you-will-accomplish"></a>

In this tutorial, you will: 
+ Create an AWS Transfer Family web app and assign a user. 
+ Create an S3 bucket and set up an access grant. 
+ Access the AWS Transfer Family web app. 

## Prerequisites
<a name="prerequisites"></a>

Before starting this tutorial, you will need: 
+ An AWS account: 
+ If you don't already have an account, follow the [Setting Up Your Environment](https://docs.aws.amazon.com/hands-on/latest/setup-environment/) tutorial. 

## Watch video
<a name="watch-video"></a>

[![AWS Videos](http://img.youtube.com/vi/Ie9M0qBGrCE/0.jpg)](http://www.youtube.com/watch?v=Ie9M0qBGrCE)


## Application architecture
<a name="application-architecture"></a>

The following diagram provides a visual representation of the services used in this tutorial and how they are connected. This application uses AWS IAM Identity Center, AWS Transfer Family, and Amazon S3. 

As you go through the tutorial, you will learn about the services in detail and find resources that will help you get up to speed with them. 

![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/set-up-an-aws-transfer-family-web-app/images/transfer-family-arch-interface.png)


## Tasks
<a name="tasks"></a>

This tutorial is divided into the following tasks. You must complete each task before moving on to the next one. 

1. [Task 1: Create the web app](module-1.md) (5 Minutes) 

1. [Task 2: Set up cross-origin resource sharing (CORS)](module-2.md) (5 Minutes) 

1. [Task 3: Create the instance](module-3.md) (5 Minutes) 

1. [Task 4: Access your AWS Transfer Family web app](module-4.md) (5 Minutes) 

1. [Task 5: Clean up resources](clean-up.md) (5 Minutes) 