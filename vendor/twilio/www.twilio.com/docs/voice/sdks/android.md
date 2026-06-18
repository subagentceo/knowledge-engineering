# Voice Android SDK

Twilio Programmable Voice SDK for Android allows you to add voice-over-IP (VoIP) calling into your native Android applications.

> \[!NOTE]
>
> For step-by-step instructions to get up and running with the Android SDK for Programmable Voice, check out the [Quickstart on Github](https://github.com/twilio/voice-quickstart-android#quickstart).
>
> To make sure your app is ready for **Android 11** please visit [this page](https://github.com/twilio/voice-quickstart-android/issues/359).

> \[!WARNING]
>
> When using the Voice Android SDK with [Twilio Regions](/docs/global-infrastructure), please make sure the SDK version is updated to at least 6.1.0

## Authentication and Authorization

The Programmable Voice SDKs use a new authentication/authorization mechanism for your application server to give your clients access to your voice applications. Provide your app with an [Access Token](/docs/iam/access-tokens), which governs the client application's authentication session with your account in the Twilio cloud. Access Tokens are different from the Capability Tokens used in the previous versions of Twilio Client. Using a Capability Token in the Programmable Voice SDK will not work. Access Tokens, just like Capability Tokens, are [JWT tokens](https://jwt.io/introduction/), but use a new, more flexible format that is applied across all new Twilio server-side SDKs.

## Management Console

Developer tools and configuration options for [Programmable Voice](https://www.twilio.com/en-us/voice) can be found in the [Programmable Voice Dashboard](https://www.twilio.com/console/voice/dashboard). Use the Console to create TwiML apps, update push credentials, view logs, and much more.

## System requirements

### Supported devices and emulators

The Programmable Voice Android SDK supports `armeabi-v7a`, `arm64-v8a`, `x86`, and `x86_64` architectures, as well as emulator images for these architectures.

### Supported API Levels

The SDK supports Android API Level 25 (Nougat/MR1) and higher.

### Supported TLS version

Voice Android SDK uses TLS 1.2 for secure communications.

### Developer tools

To build the associated [Quickstart project](https://github.com/twilio/voice-quickstart-android) you will need [Android Studio](https://developer.android.com/studio/index.html) with installed SDK Platform for API Level 25, as well as the supporting libraries.

## Install the SDK

To install the latest Programmable Voice Android SDK add the following configuration to your `build.gradle` file:

```java
allprojects {
  repositories {
    mavenCentral()
  }
}

dependencies {
  // The Voice SDK resides on Maven Central
  implementation 'com.twilio:voice-android:6.10.2'
}
```

### Java compatibility

The SDK source and target compatibility is now set to Java 8. Starting with Voice Android SDK 5.4.1, the SDK is no longer binary compatible with applications that target Java 7. In order to use this and future releases, developers must upgrade their applications to target Java 8. Follow the snippet below for reference:

```java
android {
    compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }
}
```

## Set up the SDK

### Enable microphone permissions

In order to target Android API level 25 or later, you will need to ensure that your application requests runtime permissions for microphone access. To do this, perform the following two steps:

First, add the following to your Android Manifest file:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
```

Second, request microphone permissions from within your application code:

```java
ActivityCompat.requestPermissions(this,
    new String[]{Manifest.permission.RECORD_AUDIO}, MIC_PERMISSION_REQUEST_CODE);
}
```

See the [Official Android Documentation](https://developer.android.com/training/permissions/requesting.html) for more details.

### Set up ProGuard rules

Starting with the [Programmable Voice Android SDK 3.2.0 release](/docs/voice/sdks/android/3x-changelog#320), the SDK requires an updated set of ProGuard rules. The following snippets provide the correct ProGuard rules based on the release used by your application.

#### Voice Android 3.2.0+

```java
# Twilio Programmable Voice
-keep class com.twilio.** { *; }
-keep class tvo.webrtc.** { *; }
-dontwarn tvo.webrtc.**
-keep class com.twilio.voice.** { *; }
-keepattributes InnerClasses
```

#### Voice Android 3.0.0-preview1 to 3.1.2

```java
# Twilio Programmable Voice
-keep class com.twilio.** { *; }
-keep class org.webrtc.** { *; }
-dontwarn org.webrtc.**
-keep class com.twilio.voice.** { *; }
-keepattributes InnerClasses
```

These rules ensure that the Programmable Voice library is not removed by ProGuard.
