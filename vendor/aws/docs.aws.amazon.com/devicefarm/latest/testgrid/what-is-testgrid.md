

# What is Device Farm desktop browser testing?
<a name="what-is-testgrid"></a>

This guide shows you how to run your Selenium tests on multiple desktop browsers hosted on AWS. The feature scales seamlessly so you can run your tests in parallel on multiple browser instances to speed up the execution of your test suite. For every browser the test is executed on, Device Farm generates video recordings and Selenium logs to help you quickly identify any issues with your web app. 

![Architecture diagram showing test suites connecting to DeviceFarm and browsers via WebDriver in AWS Cloud.](http://docs.aws.amazon.com/devicefarm/latest/testgrid/images/testgrid-overview-shared.png)


**Topics**
+ [Before you begin](#first-time-user)
+ [Terminology](#terminology)
+ [Accessing Device Farm desktop browser testing](#acessing-testgrid)
+ [Pricing for Device Farm desktop browser testing](#pricing-for-testgrid)

## Before you begin
<a name="first-time-user"></a>

We recommend that you read the following sections before you use this feature:
+ If you're using Selenium Grid or another browser testing provider, see [Migrating to Device Farm desktop browser testing from Selenium Grid](getting-started-migration.md) and [Supported capabilities, browsers, and platforms in Device Farm desktop browser testing](techref-support.md).
+ If you're already using Selenium for local testing, see [Migrating to Device Farm desktop browser testing from local Selenium WebDrivers](getting-started-local.md).

Device Farm desktop browser testing supports using Amazon VPC to test applications in an isolated environment. For more information, see [Using Amazon VPC with Device Farm desktop browser testing](techref-vpc.md).

## Terminology
<a name="terminology"></a>

The following terms are used throughout this guide:

Project  
A grouping of Selenium sessions in Device Farm. For more information, see [Projects in Device Farm desktop browser testing](managing-projects.md).

Session  
A single instance of a browser under your control. For more information, see [Look up Device Farm desktop browser testing sessions](managing-sessions.md).

Artifact  
A record (recordings, logs, and so on) produced by Device Farm during the execution of your tests. For more information, see [Artifacts in Device Farm desktop browser testing](managing-artifacts.md).

Action  
A record of your test suite interacting with Device Farm using the W3C WebDriver protocol. For more information, see [Actions in Device Farm desktop browser testing](managing-actions.md).

## Accessing Device Farm desktop browser testing
<a name="acessing-testgrid"></a>

You access this feature through the AWS SDK. For more information, see [AWS SDK and Tools](https://aws.amazon.com/getting-started/tools-sdks/).

## Pricing for Device Farm desktop browser testing
<a name="pricing-for-testgrid"></a>

This feature is billed on a per-minute basis. For more information, see [Device Farm Pricing](https://aws.amazon.com/device-farm/pricing/).