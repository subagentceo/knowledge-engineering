

Version 5 (V5) of the AWS Tools for PowerShell has been released\!

For information about breaking changes and migrating your applications, see the [migration topic](https://docs.aws.amazon.com/powershell/v5/userguide/migrating-v5.html).

 [https://docs.aws.amazon.com/powershell/v5/userguide/migrating-v5.html](https://docs.aws.amazon.com/powershell/v5/userguide/migrating-v5.html)

# What are the AWS Tools for PowerShell?
<a name="pstools-welcome"></a>

The AWS Tools for PowerShell are a set of PowerShell modules that are built on the functionality exposed by the AWS SDK for .NET. The AWS Tools for PowerShell enable you to script operations on your AWS resources from the PowerShell command line.

The cmdlets provide an idiomatic PowerShell experience for specifying parameters and handling results even though they are implemented using the various AWS service HTTP query APIs. For example, the cmdlets for the AWS Tools for PowerShell support PowerShell pipelining—that is, you can pipe PowerShell objects in and out of the cmdlets.

The AWS Tools for PowerShell are flexible in how they enable you to handle credentials, including support for the AWS Identity and Access Management (IAM) infrastructure. You can use the tools with IAM user credentials, temporary security tokens, and IAM roles.

The AWS Tools for PowerShell support the same set of services and AWS Regions that are supported by the SDK. You can install the AWS Tools for PowerShell on computers running Windows, Linux, or macOS operating systems.

The AWS Tools for PowerShell are available as the following three distinct packages:
+ [`AWS.Tools`](#pwsh_structure_pstools)
+ [AWSPowerShell.NetCore](#pwsh_structure_pscore)
+ [AWSPowerShell](#pwsh_structure_psoldwin)

## Maintenance and support for SDK major versions
<a name="sdks-major-versions-maintenance-support"></a>

For information about maintenance and support for SDK major versions and their underlying dependencies, see the following in the [AWS SDKs and Tools Reference Guide](https://docs.aws.amazon.com/sdkref/latest/guide/overview.html):
+ [AWS SDKs and tools maintenance policy](https://docs.aws.amazon.com/sdkref/latest/guide/maint-policy.html)
+ [AWS SDKs and tools version support matrix](https://docs.aws.amazon.com/sdkref/latest/guide/version-support-matrix.html)

## `AWS.Tools` - A modularized version of the AWS Tools for PowerShell
<a name="pwsh_structure_pstools"></a>

 [https://www.powershellgallery.com/packages/AWS.Tools.Installer](https://www.powershellgallery.com/packages/AWS.Tools.Installer) [https://www.powershellgallery.com/packages/AWS.Tools.Common](https://www.powershellgallery.com/packages/AWS.Tools.Common) [https://sdk-for-net.amazonwebservices.com/ps/v5/latest/AWS.Tools.zip](https://sdk-for-net.amazonwebservices.com/ps/v5/latest/AWS.Tools.zip)

This version of AWS Tools for PowerShell is the recommended version for any computer running PowerShell in a production environment. Because it's modularized, you need to download and load only the modules for the services you want to use. This reduces download times, memory usage, and, in most cases, enables auto-importing of `AWS.Tools` cmdlets without the need to manually call `Import-Module` first.

This is the latest version of AWS Tools for PowerShell and runs on all supported operating systems, including Windows, Linux, and macOS. This package provides one installation module, `AWS.Tools.Installer`, one common module, `AWS.Tools.Common`, and one module for each AWS service, for example, `AWS.Tools.EC2`, `AWS.Tools.IdentityManagement`, `AWS.Tools.S3`, and so on.

The `AWS.Tools.Installer` module provides cmdlets that enable you to install, update, and remove the modules for each of the AWS services. The cmdlets in this module automatically ensure that you have all the dependent modules required to support the modules you want to use.

The `AWS.Tools.Common` module provides cmdlets for configuration and authentication that are not service specific. To use the cmdlets for an AWS service, you just run the command. PowerShell automatically imports the `AWS.Tools.Common` module and the module for the AWS service whose cmdlet you want to run. This module is automatically installed if you use the `AWS.Tools.Installer` module to install the service modules.

You can install this version of AWS Tools for PowerShell on computers that are running:
+ PowerShell Core 6.0 or later on Windows, Linux, or macOS.
+ Windows PowerShell 5.1 or later on Windows with the .NET Framework 4.7.2 or later.

Throughout this guide, when we need to specify this version only, we refer to it by its module name: *`AWS.Tools`*.

In this guide, you can find details about installing `AWS.Tools` on [Windows](ps-installing-awstools.md) and [Linux or macOS](install-aws.tools-on-linux-macos.md).

## AWSPowerShell.NetCore - A single-module version of the AWS Tools for PowerShell
<a name="pwsh_structure_pscore"></a>

[https://www.powershellgallery.com/packages/AWSPowerShell.NetCore/](https://www.powershellgallery.com/packages/AWSPowerShell.NetCore/) [https://sdk-for-net.amazonwebservices.com/ps/v5/latest/AWSPowerShell.NetCore.zip](https://sdk-for-net.amazonwebservices.com/ps/v5/latest/AWSPowerShell.NetCore.zip)

This version consists of a single, large module that contains support for all AWS services. Before you can use this module, you must manually import it.

You can install this version of AWS Tools for PowerShell on computers that are running:
+ PowerShell Core 6.0 or later on Windows, Linux, or macOS.
+ Windows PowerShell 3.0 or later on Windows with the .NET Framework 4.7.2 or later.

Throughout this guide, when we need to specify this version only, we refer to it by its module name: *AWSPowerShell.NetCore*.

In this guide, you can find details about installing AWSPowerShell.NetCore on [Windows](ps-installing-awspowershellnetcore.md) and [Linux or macOS](install-netcore-on-linux-macos.md).

## AWSPowerShell - A single-module version for Windows PowerShell
<a name="pwsh_structure_psoldwin"></a>

[https://www.powershellgallery.com/packages/AWSPowerShell/](https://www.powershellgallery.com/packages/AWSPowerShell/) [https://sdk-for-net.amazonwebservices.com/ps/v5/latest/AWSPowerShell.zip](https://sdk-for-net.amazonwebservices.com/ps/v5/latest/AWSPowerShell.zip)

This *legacy* version of AWS Tools for PowerShell is only compatible with and installable on Windows computers that are running Windows PowerShell versions 2.0 through 5.1. It is not compatible with PowerShell Core 6.0 or later, or any other operating system (Linux or macOS). This version consists of a single, large module that contains support for all AWS services.

Throughout this guide, when we need to specify this version only, we refer to it by its module name: *AWSPowerShell*.

In this guide, you can find details about installing AWSPowerShell on [Windows](ps-installing-awswindowspowershell.md).

## How to use this guide
<a name="how-to-use-this-guide"></a>

The guide is divided into the following major sections.

** [Get started with the AWS Tools for PowerShell](pstools-getting-set-up.md) **  
This section explains how to install the AWS Tools for PowerShell and specify credentials.

** [Configuring and using the AWS Tools for PowerShell](pstools-getting-started.md) **  
This section describes the fundamentals of using the AWS Tools for PowerShell, such as specifying AWS Regions, finding cmdlets for a particular service, and using aliases for cmdlets.

** [Calling AWS services in the AWS Tools for PowerShell](pstools-using.md) **  
This section includes information about using the AWS Tools for PowerShell to perform some of the most common AWS tasks.

## Additional topics in this section
<a name="w2aab7c27"></a>
+ [Revision history](revision-history.md)
+ [What's new in the AWS Tools for PowerShell](whats-new.md)