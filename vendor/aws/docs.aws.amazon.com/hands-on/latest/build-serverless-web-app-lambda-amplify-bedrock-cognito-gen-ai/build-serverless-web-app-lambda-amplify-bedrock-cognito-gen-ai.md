

# Build a Serverless Web Application using Generative AI
<a name="build-serverless-web-app-lambda-amplify-bedrock-cognito-gen-ai"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 35 minutes  | 
| **Cost to complete** | [Free tier](https://aws.amazon.com/free/) eligible  | 
| **Requires** |  [See the AWS documentation website for more details](http://docs.aws.amazon.com/hands-on/latest/build-serverless-web-app-lambda-amplify-bedrock-cognito-gen-ai/build-serverless-web-app-lambda-amplify-bedrock-cognito-gen-ai.html) Accounts created within the past 24 hours might not yet have access to the services required for this tutorial.  | 
| **Last updated** | July 19, 2024  | 

## Overview
<a name="overview"></a>

In this tutorial, you will learn how to use AWS Amplify to build a serverless web application powered by Generative AI using Amazon Bedrock and the [Claude 3 Sonnet](https://aws.amazon.com/bedrock/claude/) foundation model. Users can enter a list of ingredients, and the application will generate delicious recipes based on the input ingredients. The application includes an HTML-based user interface for ingredient submission and a backend web app to request AI-generated recipes. 

## What you will accomplish
<a name="what-you-will-accomplish"></a>

In this tutorial, you will: 
+ Configure AWS Amplify to host your frontend application with continuous deployment built in 
+ Configure Amplify Auth and enable Amazon Bedrock foundation model Access 
+ Build an app backend for handling requests for your web application 
+ Use Amplify Data to call the serverless backend 
+ Connect the app to the backend 

## Prerequisites
<a name="prerequisites"></a>

Before starting this tutorial, you will need: 
+ **An AWS account**: if you don't already have one follow the [Setup Your Environment](https://docs.aws.amazon.com/hands-on/latest/setup-environment/) tutorial. 
+ **Configure** your **AWS profile** for [local development](https://docs.amplify.aws/react/start/account-setup/).
+ **Installed** on your environment: [Nodejs](https://nodejs.org/en/download)and [npm](https://www.npmjs.com/). 
+ **Familiarity** with git and a [Github](https://github.com) account. 

## Application Architecture
<a name="application-architecture"></a>

The following diagram provides a visual representation of the services used in this tutorial and how they are connected. This application uses AWS Amplify, a GraphQL API built with AWS AppSync, AWS Lambda, and Amazon Bedrock. 

As you go through the tutorial, you will learn about the services in detail and find resources that will help you get up to speed with them. 

![Architecture diagram illustrating a serverless generative AI application on AWS, featuring user interaction through AWS Amplify, authentication via Amazon Cognito, data flow using AWS AppSync and GraphQL, AWS Lambda for compute, and Amazon Bedrock for generative AI capabilities.](http://docs.aws.amazon.com/hands-on/latest/build-serverless-web-app-lambda-amplify-bedrock-cognito-gen-ai/images/serverless-genai-architecture-diagram.png)


## Tasks
<a name="tasks"></a>

This tutorial is divided into the following tasks. You must complete each task before moving to the next one. 

1. [Task 1: Host a Static Website](module-one.md) (5 minutes): Configure AWS Amplify to host your frontend application with continuous deployment built in 

1. [Task 2: Manage Users](module-two.md) (5 minutes): Configure Amplify Auth and enable Amazon Bedrock foundation model Access 

1. [Task 3: Build a Serverless Backend](module-three.md) (10 minutes): Build an app backend for handling requests for your web application 

1. [Task 4: Deploy the Backend API](module-four.md) (5 minutes): Use Amplify Data to call the serverless backend 

1. [Task 5: Build the Frontend](module-five.md) (5 minutes): Connect the app to the backend 

1. [Task 6: Clean up Resources](module-six.md) (2 minutes): Clean up the resources used in this tutorial 