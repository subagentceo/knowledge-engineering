

# Build a Flutter Mobile App Using AWS Amplify - Part 1
<a name="build-flutter-mobile-app-part-1"></a>

**Create a trip planner app for iOS and Android**


|  |  | 
| --- |--- |
| **AWS Experience** | Beginner | 
| **Time to Complete** | 60 minutes | 
| **Cost to Complete** | [Free Tier](https://aws.amazon.com/free/?e=gs2020&p=build-a-react-app-intro) eligible | 
| **Services used** | [AWS Amplify](https://aws.amazon.com/amplify) | 
| **Last updated** | August 23, 2023 | 

## Overview
<a name="overview"></a>

In this how-to guide, the first part of a two-part series, you will create a cross-platform Flutter mobile app using AWS Amplify. The app is a trip planner where users can create a trip and set its name, destination, and dates. Additionally, they can upload a banner image for the trip.

In the [second guide](https://docs.aws.amazon.com/hands-on/latest/build-flutter-mobile-app-part-two/build-flutter-mobile-app-part-2.html) of this series, you will add new features to the app, such as adding activities for the trips using a nested data model and creating the user's profile data using an Amplify function.

## What you will accomplish
<a name="what-you-will-accomplish"></a>

This how-to guide will walk you through the steps to create an app to help users plan trips. You will:
+ Create a Flutter app using the terminal and structure its folders using the Feature-First approach where you will create a folder for every app’s feature.
+ Use the Amplify CLI to create the Amplify backend for this app
+ Add Amplify authentication capabilities to your app and use the Amplify Authenticator UI library
+ Create a data model for the trips and use the GraphQL API to synchronize to the Amplify backend
+ Add Amplify storage to your app to enable users to upload an image for their trips

## Prerequisites
<a name="prerequisites"></a>
+ An AWS account: If you don't already have an account, follow the [Setting Up Your AWS Environment](https://aws.amazon.com/getting-started/guides/setup-environment/) tutorial for a quick overview.
+ [Install](https://docs.amplify.aws/cli/start/install/) and configure the Amplify CLI.
+ [Install](https://docs.flutter.dev/get-started/install) and configure Flutter.
+ A text editor combined with Flutter’s command-line tools. For this guide we will use VSCode, but you can use your preferred IDE.

## Modules
<a name="modules"></a>

This how-to guide is divided into the following short modules. You must complete each module before moving to the next one.

1. [Module 1: Create a Flutter app](module-1.md) (15 minutes): Create a Flutter app, add its dependencies, and create its folder structure. Additionally, you will also define the app colors and the routing constants.

1. [Module 2: Add Amplify authentication](module-2.md) (10 minutes): Create the Amplify backend for the app and implement authentication using the Amplify authenticator UI library.

1. [Module 3: Add API](module-3.md) (20 minutes): Create the Amplify GraphQL API for the app and implement the CRUD operation for the trip feature.

1. [Module 4: Add Amplify storage](module-4.md) (15 minutes): Create the Amazon S3 bucket for the app and implement the ability to upload an image for the trip.