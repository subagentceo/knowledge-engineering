# Video Android Platform Overview

> To make sure your app is ready for Android 11 please visit this [page](https://github.com/twilio/video-quickstart-android/issues/543).

Twilio's Programmable Video Android SDK lets you add real time voice and video to your native Android applications.

## Prerequisites

* Android Studio 2.0 or higher
* Support for Android API level 25 or higher
* Support for Java 8

## Programmable Video Live Demo

Launch our [Twilio Programmable Video live demo](https://github.com/twilio/twilio-video-app-android) in less than 5 minutes. A high-quality, full-featured and open-source video collaboration application.

## Run the QuickStart app

To get started with Twilio Video, you should download and run the [QuickStart application](https://github.com/twilio/video-quickstart-android).

The QuickStart repository contains additional examples. These examples demonstrate the usage of new features and also help you build more complex applications.

To add Video to your app, follow the [Quickstart guide](/docs/video/android-getting-started).

## Add the SDK

The Android Video SDK is distributed through Maven Central.

To install the Android Video SDK, ensure the following configuration is in your build.gradle file:

[![Maven Central.](https://maven-badges.herokuapp.com/maven-central/com.twilio/video-android/badge.svg?style=svg)](https://maven-badges.herokuapp.com/maven-central/com.twilio/video-android)

### Gradle

```bash
allprojects {
    repositories {
        mavenCentral()
    }
}

// The Video library resides on Maven Central
implementation 'com.twilio:video-android:$version'

android {
    compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }
}
```

### Proguard

Add the following lines to your proguard-project.txt file.

```bash
-keep class tvi.webrtc.** { *; }
-keep class com.twilio.video.** { *; }
-keepattributes InnerClasses
```

### Supported Devices

The Android SDK supports Android API level 25 and higher. It is built for armeabi-v7a, arm64-v8a, x86, and x86\_64 architectures.
