

# What is AWS Device Farm?
<a name="welcome"></a>

Device Farm is an app testing service that you can use to test and interact with your Android, iOS, and web apps on real, physical phones and tablets that are hosted by Amazon Web Services (AWS).

There are two main ways to use Device Farm:
+ Remotely access a device from your local computer, either interactively in your web browser or automatically testing it using Appium from a local client.
+ Automatically execute app tests using Device Farm's managed test execution environment.

**Note**  
Device Farm is only available in the `us-west-2` (Oregon) region.

## Remote access
<a name="remote-access-intro"></a>

Remote access allows you to interact with a device through your web browser in real time. Remote access also lets you to run Appium tests from your local client against remote Device Farm devices using a managed Appium endpoint.

Real-time interaction with a device can be useful for a number of scenarios, such as manual app testing, reproducing bugs on a specific device, checking the visual rendering of your app on different screen types, and app install and upgrade sequences. Device Farm's fully managed Appium endpoint enables you to develop, test, and debug your Appium tests, giving fast feedback.

The Appium endpoint supports any language of your choice, any local IDE, live debugging with breakpoints, live video and logs, and tools like [Appium Inspector](https://github.com/appium/appium-inspector). You can execute tests as many times as you like on the same device during your remote access session with a [150-minute limit](limits.md#service-limits).

During a remote access session, Device Farm logs details about actions that take place as you interact with the device. Logs with these details and a video capture of the session are produced at the end of the session.

## Automated app testing
<a name="automated-test-intro"></a>

Device Farm allows you to run automated tests on multiple devices in parallel by uploading your app and tests. The tests are automatically executed in a fully managed environment on test hosts that you can configure [a test spec file](custom-test-environment-test-spec.md). The environment uses Device Farm's [test hosts](custom-test-environments-hosts.md), so you don't need to worry about provisioning your own infrastructure for running tests. The test hosts and devices can securely connect to your VPC to access your private endpoints.

As tests are completed, a test report is generated that contains high-level results, low-level logs, screenshots, and your test artifacts.

Device Farm supports testing of native and hybrid Android and iOS apps. For more information about supported test types, see [Test frameworks and built-in tests in AWS Device Farm](test-types.md).

## Terminology
<a name="welcome-terminology"></a>

Device Farm introduces the following terms that define the way information is organized:

**device pool**  
A collection of devices that typically share similar characteristics, such as platform, manufacturer, or model.

**job**  
A request for Device Farm to test a single app against a single device. A job contains one or more suites.

**metering**  
Refers to billing for devices. You might see references to metered devices or unmetered devices in the documentation and API reference. For more information about pricing, see [AWS Device Farm Pricing](https://aws.amazon.com/device-farm/pricing/).

**project**  
A logical workspace that contains runs, one run for each test of a single app against one or more devices. You can use projects to organize workspaces in whatever way you choose. For example, you can have one project per app title or one project per platform. You can create as many projects as you need.

**report**  
Contains information about a run, which is a request for Device Farm to test a single app against one or more devices. For more information, see [Reports in AWS Device FarmReports](reports.md).

**run**  
A specific build of your app, with a specific set of tests, to be run on a specific set of devices. A run produces a report of the results. A run contains one or more jobs. For more information, see [Runs](test-runs.md).

**session**  
A real-time interaction with an actual, physical device through your web browser. For more information, see [Sessions](sessions.md).

**suite**  
The hierarchical organization of tests in a test package. A suite contains one or more tests.

**test**  
An individual test case in a test package.

For more information about Device Farm, see [Concepts](concepts.md).

## Setting up
<a name="welcome-setting-up"></a>

To use Device Farm, see [Setting up](setting-up.md).