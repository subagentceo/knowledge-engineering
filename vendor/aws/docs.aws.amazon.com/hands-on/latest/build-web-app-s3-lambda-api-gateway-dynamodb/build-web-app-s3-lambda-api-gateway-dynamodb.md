

# Build a Basic Web Application
<a name="build-web-app-s3-lambda-api-gateway-dynamodb"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Minimum time to complete** | 35 minutes  | 
| **Cost to complete** | [Free Tier](https://aws.amazon.com/free/?e=gs2020&p=build-a-react-app-intro) eligible  | 
| **Services used** | [AWS Amplify](https://aws.amazon.com/amplify/)<br /> [AWS AppSync](https://aws.amazon.com/appsync/) <br />[AWS Lambda](https://aws.amazon.com/lambda/)<br /> [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) | 
| **Last updated** | July 12, 2024  | 

## Overview
<a name="overview"></a>

In this tutorial, you will learn to create a simple full-stack web application using AWS Amplify. Throughout this tutorial, you will build and host a React application on AWS, use Amplify to add authentication, data, and a serverless function to capture the signed-up user's email and save it in the database. Then, you will implement a frontend for your app that integrates with your cloud resources.  

## What you will accomplish
<a name="what-you-will-accomplish"></a>

In this tutorial, you will: 
+ **Host:** Build and deploy a React application on the AWS global content delivery network (CDN). 
+ **Authenticate:** Add authentication to your app to enable sign-in and sign-out functionality. 
+ **Database:** Integrate a real-time API, database, and a serverless function. 
+ **Function:** Implement a lambda function that is triggered when a user signs up to the App. 

## Prerequisites
<a name="prerequisites"></a>

Before starting this tutorial, you will need: 
+ An **AWS account**: if you don't already have one follow the [Setup Your Environment](https://docs.aws.amazon.com/hands-on/latest/setup-environment/) tutorial. 
+ **Configure** your **AWS profile** for [local development](https://docs.amplify.aws/react/start/account-setup/).
+ **Installed** on your environment: [Nodejs](https://nodejs.org/en/download) and [npm](https://www.npmjs.com/). 
+ **Familiarity** with Git and a [Github](https://github.com/) account. 

## Application architecture
<a name="application-architecture"></a>

The following diagram provides a visual representation of the services used in this tutorial and how they are connected. This application uses AWS Amplify, GraphQL API, AWS Lambda, and Amazon DynamoDB. 

As you go through the tutorial, you will learn about the services in detail and find resources that will help you get up to speed with them. 

![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/build-web-app-s3-lambda-api-gateway-dynamodb/images/build-web-application-architecture.png)


## Tasks
<a name="tasks"></a>

This tutorial is divided into six tasks. You must complete each task in order before moving on to the next one. 

1. [Task 1: Create a Web App](module-one.md) (5 minutes): Deploy static resources for your web application using the AWS Amplify Console. 

1. [Task 2: Build a Serverless Function](module-two.md) (5 minutes): Build a serverless function using AWS Lambda. 

1. [Task 3: Create a Data Table](module-three.md) (10 minutes): Persist data in an Amazon DynamoDB table. 

1. [Task 4: Link a Serverless Function to a Web App](module-four.md) to Web App (5 minutes): Deploy your serverless function with API Gateway. 

1. [Task 5: Add Interactivity to Your Web App](module-five.md) (5 minutes): Modify your web app to invoke your API. 

1. [Task 6: Clean Up Resources](module-six.md) (5 minutes): Clean up resources used in this tutorial. 

You will be building this web application using the [AWS Management Console](https://docs.aws.amazon.com/hands-on/latest/getting-started-with-aws-management-console/) accessible directly from your browser. 