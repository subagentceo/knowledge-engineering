

# About Elastic Beanstalk platforms
<a name="welcome"></a>

AWS Elastic Beanstalk provides managed platforms that support running web applications developed for specific programming languages, frameworks, and web containers. A platform is a combination of an operating system (OS), runtime, web server, application server, and Elastic Beanstalk components. Elastic Beanstalk offers multiple platform versions for each platform branch. When you create an environment and choose a platform version, Elastic Beanstalk provisions the resources that your application needs, including one or more Amazon Elastic Compute Cloud (Amazon EC2) instances. The software stack running on the Amazon EC2 instances depends on the platform version you chose.

Each platform branch can be in one of several states: supported, beta, deprecated, or retired. You can always create an environment based on the recommended platform version in a supported platform branch. Deprecated platform branches continue to receive updates until their retirement date, but aren't recommended for use. Retired platform branches are no longer available for creating new environments. For more information, refer to the [Platform support policy](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-support-policy.html) topic in the *AWS Elastic Beanstalk Developer Guide*.

When Elastic Beanstalk releases a new platform version, the new version supersedes the previous version and becomes the recommended platform version for the corresponding platform branch. The recommended platform version in each supported platform branch is available to you unconditionally for environment creation. Previous platform versions lack the most up-to-date components and aren't recommended for use. We recommend that you use the recommended platform version in a supported platform branch. Previous platform versions remain accessible to accounts with active or terminated environments using them at the time they were superseded by a new version.

For more information about platforms, see [AWS Elastic Beanstalk Platforms](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/concepts-all-platforms.html) in the *AWS Elastic Beanstalk Developer Guide*. For more information about platform-related terms, see [Elastic Beanstalk platforms glossary](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/platforms-glossary.html).

Detailed release notes are available for recent releases at [AWS Elastic Beanstalk Release Notes](https://docs.aws.amazon.com/elasticbeanstalk/latest/relnotes/). 

## What's in this document
<a name="welcome.whats"></a>

This document contains two sets of lists:
+ [Elastic Beanstalk supported platforms](platforms-supported.md) – Lists of current platform versions.
+ [Elastic Beanstalk platform versions scheduled for retirement](platforms-retiring.md) – Lists of current platform versions scheduled for retirement.
+ [Platform history](platform-history.md) – Lists of historical platform versions and the date ranges they were current.

All platform lists have details about the platform versions available in each platform (now or in a historical date range) and about the software component versions associated with each platform version.

## Additional resources
<a name="welcome.resources"></a>

The following related resources can help you as you work with this service.
+ **[AWS Elastic Beanstalk Developer Guide](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/)** – Concepts, tutorials, and reference materials.
+ **[AWS Elastic Beanstalk Release Notes](https://docs.aws.amazon.com/elasticbeanstalk/latest/relnotes/)** – Details about new features, updates, and fixes related to the Elastic Beanstalk service, platform, console, and EB CLI.