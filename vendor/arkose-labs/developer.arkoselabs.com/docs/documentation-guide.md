# Documentation Guide

This page describes the documentation available for the Arkose Bot Manager. Its organization matches the order in which you should read the documentation when getting started, with more esoteric and rarely referenced documentation at the end.

## Implementation Guides

* [Arkose Bot Manager Quickstart](https://developer.arkoselabs.com/docs/arkose-labs-platform-quickstart)
  * Instructions for quickly getting a usable integration with Arkose Bot Manager up and running.
* [Setting Up Arkose Bot Manager](https://developer.arkoselabs.com/docs/getting-started)
  * Quick roadmap for setting up Arkose Bot Manager for your applications.
* [Arkose Labs Command Center](https://developer.arkoselabs.com/docs/arkose-labs-command-center)
  * The Arkose Command Center is your central hub for data insights and self-service functions for monitoring and managing applications protected by Arkose Bot Manager. Its customizable dashboards empower  better understanding and attack mitigation on Arkose Bot Manager protected applications. This page explains how to use the Command Center.

## Server-Side Setup

This section gives full details how to set up Arkose Bot Manager on your server-side.

* [Server-Side Instructions](https://developer.arkoselabs.com/docs/server-side-instructions-v4)
  * Provides an overview of why and how to use the Verify API to validate the Client API's response.
* [Content Delivery Network Setup](https://developer.arkoselabs.com/docs/cdn)
  * Points to pages for using Arkose Bot Manager with a Content Delivery Network (CDN).
  * [Arkose on Akamai - Reference Architecture](https://developer.arkoselabs.com/docs/arkose-on-akamai-reference-architecture)
    * [Akamai CDN Setup - Client Side](https://developer.arkoselabs.com/docs/akamai-cdn-setup-client-side)
      * Client-side setup instructions when using Akamai.
    * [Akamai CDN Setup - Server Side](https://developer.arkoselabs.com/docs/akamai-cdn-setup-server-side)
      * Server-side setup instructions when using Akamai.
  * [Arkose on Fastly - Reference Architecture](https://developer.arkoselabs.com/docs/arkose-on-fastly-reference-architecture)
    * Server-side setup instructions when using Fastly.
  * [Arkose on Cloudflare - Reference Architecture](https://developer.arkoselabs.com/docs/arkose-on-cloudflare-reference-architecture)
    * [Cloudflare CDN Setup - Client Side](https://developer.arkoselabs.com/docs/cloudflare-cdn-setup-client-side)
      * Client-side setup instructions for setting up Cloudflare CDN.
    * [Cloudflare CDN Setup - Server Side](https://developer.arkoselabs.com/docs/cloudflare-cdn-setup-server-side)
      * Server-side setup instructions for setting up Cloudflare CDN.

## Client-Side Setup

This section gives full details how to set up the Arkose Bot Manager on your client-side.

* [Client-Side Instructions](https://developer.arkoselabs.com/docs/standard-setup)
  * Covers how to set up Arkose Bot Manager for web-based clients.
* [Mobile](https://developer.arkoselabs.com/docs/mobile-setup)
  * Brief overview of the different ways of setting up Arkose Bot Manager for mobile-based applications.
  * [Android Mobile SDK](https://developer.arkoselabs.com/docs/android-mobile-sdk)
    * How to set up the preferred way of running Arkose Bot Manager on Android apps. The Android Mobile SDK lets you wrap our solution with Android native function calls.
  * [iOS Mobile SDK](https://developer.arkoselabs.com/docs/ios-mobile-sdk)
    * How to set up the preferred way of running Arkose Bot Manager on iOS apps. The iOS Mobile SDK lets you wrap our solution with iOS native function calls.
  * [Android Native Setup](https://developer.arkoselabs.com/docs/android-native-setup)
    * This page is about Arkose Labs' Webview direct integrations approach for Android. This approach requires you to write significant code yourself. We strongly urge you to use our [Android Mobile SDK](https://developer.arkoselabs.com/docs/android-mobile-sdk) instead. New functionality is *only* added to the SDK.
  * [iOS Native Setup](https://developer.arkoselabs.com/docs/ios-native-setup-1)
    * This page is about Arkose Labs' Webview direct integrations approach for iOS. This approach requires you to write significant code yourself. We strongly urge you to use our [iOS Mobile SDK](https://developer.arkoselabs.com/docs/ios-mobile-sdk) instead. New functionality is *only* added to the SDK.
* [Specialized Setup](https://developer.arkoselabs.com/docs/specialized-setup)
  * In addition to general Web Browser and Mobile platforms, there are some specialized cases that have specific setup instructions for Arkose Bot Manager.
  * [Subresource Integrity (SRI)](https://developer.arkoselabs.com/docs/subresource-integrity-sri)
    * *SRI (Subresource Integrity)* lets a browser verify that content delivered from a third party is valid and has not been altered. This page explains how to enable SRI for your Arkose Bot Manager implementation.
  * [Iframe Setup Guide](https://developer.arkoselabs.com/docs/iframe-setup-guide)
    * Shows details of how to set up and use the Arkose Bot Manager in the context of an iframe.
  * [Angular Setup Guide](https://developer.arkoselabs.com/docs/angular-setup-guide)
    * Describes how to use the Arkose Bot Manager with single page applications built using Angular.
  * [React Setup Guide](https://developer.arkoselabs.com/docs/react-setup-guide)
    * Describes how to use Arkose Bot Manager with single page applications built using React.
  * [Connected Devices Integration](https://developer.arkoselabs.com/docs/arkose-labsxbox-integration)
    * Discusses how to integrate web connected devices, such as gaming consoles and smart TVs, with Arkose Bot Manager.
  * [reCAPTCHA to Arkose Labs Migration Guide](https://developer.arkoselabs.com/docs/recaptcha-to-arkose-labs-migration-guide)
    * How to migrate from using reCAPTCHA to using Arkose Bot Manager.
  * [New Enforcement Challenge UI](https://developer.arkoselabs.com/docs/new-enforcement-challenge-ui)
    * Overview and requirements of the new Enforcement Challenge UI.

## Identity and Access Management (IAM) Setup

This section covers how to set up Arkose Bot Manager with identity and access management (IAM) and customer identity (CIAM) platforms.

* [Using Auth0 and Arkose for New Account Registration](https://developer.arkoselabs.com/docs/using-auth0-and-arkose-for-new-account-registration)
  * Shows a high-level overview of how to integrate Arkose Bot Manager via the Auth0 Development Console, covering both the Client API setup on the registration page and server-side token verification using an Auth0 Action Flow.
* [Auth0 Native Setup Guide](https://developer.arkoselabs.com/docs/auth0-native-setup-guide)
  * Step-by-step instructions for enabling Arkose Bot Manager through Auth0 Universal Login New's native Bot Detection settings.
* [Microsoft Entra - Integration Setup](https://developer.arkoselabs.com/docs/arkose-on-microsoft-entra-integration-setup)
  * Shows how to configure Arkose Bot Manager as a sign-up protection provider within Microsoft Entra, including creating a service integration policy and validating the protection in your application.
* [Azure Active Directory B2C - Integration Setup](https://learn.microsoft.com/en-us/azure/active-directory-b2c/partner-arkose-labs)
  * Shows how to integrate Arkose Bot Manager with Azure AD B2C sign-up flows using custom HTML, JavaScript, and an Azure Function to handle server-side token verification.
* [SAP Customer Data Cloud - Integration Setup](https://help.sap.com/docs/SAP_CUSTOMER_DATA_CLOUD/8b8d6fffe113457094a17701f63e3d6a/17dde8af68d048a599890255e4c6ef9a.html?locale=en-US\&version=LATEST)
  * Shows how to configure Arkose Bot Manager as a CAPTCHA provider within SAP Customer Data Cloud, covering integration with password login and registration flows via the Security console and Risk-Based Authentication (RBA) rules.
* [Descope - Integration Setup](https://docs.descope.com/connectors/connector-configuration-guides/fraud/arkose)
  * Shows how to set up the Arkose Labs connector in Descope to trigger enforcement challenges within authentication flows, protecting against bots and fraudulent activity.

## Arkose Labs APIs

This section covers the various Arkose APIs, including tutorial material on what they do and how to use them, and reference material on how to call them and descriptions of their request and response fields.

* [Arkose Labs API Guide](https://developer.arkoselabs.com/docs/arkose-labs-api-guide)
  * Brief descriptions of the APIs.

### Client API

* [Client API](https://developer.arkoselabs.com/docs/client-api)
  * Overview of how to use the Client API, descriptions of what callbacks you need to write code for and when they are triggered.
* [Callbacks](https://developer.arkoselabs.com/docs/callbacks)
* [Configuration Object](https://developer.arkoselabs.com/docs/configuration-object)
  * Listing and description of values in the Configuration Object used to configure Arkose Bot Manager Client API.
* [Response Object (`onCompleted`, `onError`, `onFailed`, `onResize`)](https://developer.arkoselabs.com/docs/response-object-oncompleted-onerror-onfailed-onresize)
  * Describes the Response Object used by several callbacks after either detection or enforcement is completed or an error occurred during either one.

### Verify API

* [Verify API](https://developer.arkoselabs.com/docs/verify-api-v4)
  * Overview of what the Verify API does, when to call it, and how to process call responses.
  * [Calling Verify API](https://developer.arkoselabs.com/docs/calling-verify-v4-api)
    * Covers available ways to make a Verify call.
  * [Verify Request and Response Schemas](https://developer.arkoselabs.com/docs/verify-request-and-response-schemas)
    * JSON descriptions of Verify request and response schema definitions.
  * [Verify API Response Fields and Examples](https://developer.arkoselabs.com/docs/verify-api-v4-response-fields)
    * Annotated descriptions of the Verify response fields.
  * [IP Velocity Fields](https://developer.arkoselabs.com/docs/ip-velocity-fields)
    * As an optional feature, you can add Verify response fields that provide information about IP velocity. This page tells you how to do so and describes the additional response fields.
  * [Risk Score](https://developer.arkoselabs.com/docs/risk-score)
    * As an optional feature, you can add Risk Scores, calculated from telltale data, to Verify response fields. This page tells you how to do so and describes the additional response fields.
  * [Migrating to Verify v4 from v1, v2, v3](https://developer.arkoselabs.com/docs/migrating-to-verify-v4-from-v1-v2-v3)
    * How to migrate from Verify v1, v2, or v3 and key differences between the versions.
  * [Enhanced Error Codes](https://developer.arkoselabs.com/docs/enhanced-error-codes)
    * Show default error responses returned by Verify v4.

## Truth Data

* [Truth Data System](https://developer.arkoselabs.com/docs/truth-data-system)
  * Provides an overview and walkthrough of Arkose Labs Truth Data system which lets you provide feedback to Arkose via the Arkose Labs Command Center.

## General Support and Status

This section has two pages, which cover:

* [General Support and Bug Bounty](https://developer.arkoselabs.com/docs/general-support-and-status):
  * This page tells you:
    * How and where to get Support for Arkose Bot Manager.
    * How to use our Bug Bounty program.
* [Troubleshooting, API Status, and Health Checks](https://developer.arkoselabs.com/docs/arkose-labs-api-status-and-health-checks)
  * This page tells you:
    * How to check on whether the Arkose Labs APIs are up.
    * How to see regional health checks.
    * How to troubleshoot problems with Arkose Bot Manager.
    * How to handle errors you may encounter.
  * [Client-Side Error Handling](https://developer.arkoselabs.com/docs/error-handling)
    * This page describes the following callbacks and error codes:
      * `onError` callback: Can be used to listen for occurrences of errors in our platform and allow the customer to take action when they occur
      * Error Codes: Values that could be passed to the `onError` callback.
      * `onerror` script: By listening to this callback a customer is able to catch any error that may occur during the loading of the initial api.js javascript file.

## Accessibility

* [Accessibility Conformance Report](https://developer.arkoselabs.com/docs/accessibility-standard):
  * This Accessibility Conformance Report is based on the standard Voluntary Product Accessibility Template (VPAT). It outlines Arkose Labs' conformance with Section 508 of the Rehabilitation Act and the Web Content Accessibility Guidelines (WCAG).
* [Assistive Technology Support](https://developer.arkoselabs.com/docs/assistive-technology-support):
  * Specifies which assistive technologies are supported for Arkose Bot Manager components. Included are
    * Supported Browser and Screen Reader Combinations - Desktop and Laptop and Mobile
    * Screen Magnification
    * Electronic Braille Displays
    * Support for Alternative Input Devices

## What We Support and Use

This section, at the end of the left sidebar menu, contains reference material for what browsers and languages (natural, not computer) the Arkose Bot Manager supports.

* [Support and Use Overview](https://developer.arkoselabs.com/docs/what-we-support-and-use)
  * Descriptions of the pages under *General Support and Status* and *What We Support and Use*.
* [Supported Languages](https://developer.arkoselabs.com/docs/supported-languages-1)
  * Arkose Bot Manager's Enforcement Challenge (EC) can be invoked in many languages. This page has a list of available languages for both text-based and audio-based ECs. It also has instructions for how to configure the Arkose client to use a particular language instead of the default use of browser settings to determine the language.
* [Supported Browsers](https://developer.arkoselabs.com/docs/supported-browsers)
  * Specifies which browsers are supported for the different Arkose Bot Manager components, including desktop, mobile, connected devices, and the Arkose Command Center.
* [Domain Policy](https://developer.arkoselabs.com/docs/domain-policy)
  * Specifies what domains the Arkose Bot Manager uses.
* [Product EOL Communications](https://developer.arkoselabs.com/docs/end-of-life-communications)\
  End of life communications to inform customers about the discontinuation of products and the availability of support and alternative solutions.