

# Build a Flutter Mobile App Using AWS Amplify - Part 2
<a name="build-flutter-mobile-app-part-2"></a>

**Use nested data and Amplify functions to create a trip planner app for iOS and Android**


|  |  | 
| --- |--- |
| **AWS Experience** | Beginner | 
| **Time to Complete** | 160 minutes | 
| **Cost to Complete** | [Free Tier](https://aws.amazon.com/free/) eligible | 
| **Last updated** | September 12, 2023 | 

## Overview
<a name="overview"></a>

In this how-to guide, you will continue building the cross-platform Flutter mobile app we started in the [first tutorial](https://docs.aws.amazon.com/hands-on/latest/build-flutter-mobile-app-part-one/build-flutter-mobile-app-part-1.html) in this series. The app is a trip planner where users can create a trip and set its name, destination, and dates. Additionally, they can upload a banner image for the trip.

You will introduce multiple new features to the App, such as allowing users to add activities for their trips, set their categories and dates, and upload a file and image for the activity. You will create an Amplify function to create the user’s profile data and you will allow them to use the App to update their profile, change their name, and set their home city.

You will clone the app from GitHub using the terminal in the first module. Then you will update the app to introduce additional features like displaying past trips, adding activities to a trip, and editing the profile of the app’s user. 

## Prerequisites
<a name="prerequisites"></a>
+ An AWS account: If you don't already have an account, follow the [Setting Up Your AWS Environment](https://aws.amazon.com/getting-started/guides/setup-environment/) tutorial for a quick overview.
+ [Install](https://docs.amplify.aws/cli/start/install/) and configure the Amplify CLI.
+ [Install](https://docs.flutter.dev/get-started/install) and configure Flutter.
+ [Install](https://docs.github.com/en/get-started/quickstart/set-up-git) and configure Git.
+ A text editor combined with Flutter’s command-line tools. For this guide we will use VSCode, but you can use your preferred IDE.

## What you will accomplish
<a name="what-you-will-accomplish"></a>

This how-to guide will walk you through creating an app to help users plan trips. You will:
+ Clone the app we built in an earlier [how-to guide](https://docs.aws.amazon.com/hands-on/latest/build-flutter-mobile-app-part-one/build-flutter-mobile-app-part-1.html) from GitHub
+ Use the Amplify CLI to create an Amplify backend for this app
+ Update the app to display past trips
+ Create a data model for the trip’s activities and the user's profile, and use the GraphQL API to synchronize to the Amplify backend

## Modules
<a name="modules"></a>

This how-to guide is divided into the following modules. You must complete each module before moving to the next one.

1. [Module 1: Clone the Flutter app](module-1.md) (30 minutes): Clone the Flutter app from Github, update its dependencies, and create an Amplify backend.

1. [Module 2: Add the Past Trips feature](module-2.md) (40 minutes): Implement logic and UI to display past trips, and introduce a navigation drawer to the app to allow the users to navigate the different pages you will introduce in this guide.

1. [Module 3: Add the Activity feature](module-3.md) (45 minutes): Add and display the activities of a trip using an Amplify GraphQL API.

1. [Module 4: Add the Profile feature](module-4.md) (45 minutes): Create a profile for the user using an Amplify function and implement the logic and UI of creating, updating, and displaying the profile in the app.