

# What is AWS CloudShell?
<a name="welcome"></a>

AWS CloudShell is a browser-based, pre-authenticated shell that you can launch directly from the AWS Management Console. You can navigate to CloudShell from the AWS Management Console a few different ways. For more information, see [Getting started with AWS CloudShell](getting-started.md)

You can run AWS CLI commands using your preferred shell, such as Bash, PowerShell, or Z shell. And you can do this without downloading or installing command line tools.

![AWS CloudShell interface after launch](http://docs.aws.amazon.com/cloudshell/latest/userguide/images/WhatisAWSCloudShell_updated.png)


When you launch AWS CloudShell, a [compute environment](vm-specs.md#vm-configuration) that's based on Amazon Linux 2023 is created. Within this environment, you can access an [extensive range of pre-installed development tools](vm-specs.md#pre-installed-software), options for [uploading](getting-started.md#folder-upload) and [downloading](getting-started.md#download-file) files, and [file storage that persists between sessions](#persistent-storage). You can use CloudShell in the most recent versions of Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari browsers.

(Try it now: [Getting started with AWS CloudShell](getting-started.md))

## Features of AWS CloudShell
<a name="cloudshell-features"></a>

AWS CloudShell provides the following features:

### AWS Command Line Interface
<a name="aws-cli-support"></a>

You can launch AWS CloudShell from the AWS Management Console. The AWS credentials that you used to sign in to the console are automatically available in a new shell session. Because AWS CloudShell users are pre-authenticated, you don't need to configure credentials when interacting with AWS services using AWS CLI version 2. The AWS CLI is pre-installed on the shell's compute environment.

For more information about interacting with AWS services using the command line interface, see [Manage AWS services from CLI in CloudShell](working-with-aws-cli.md). 

### Shells and development tools
<a name="shells-dev-tools"></a>

With the shell that's created for AWS CloudShell sessions, you can switch seamlessly between your preferred command line shells. More specifically, you can switch between Bash, PowerShell, and Z shell. You also have access to pre-installed tools and utilities. These include git, make, pip, sudo, tar, tmux, vim, wget, and zip. 

The shell environment is pre-configured with support for several leading major software languages, such as Node.js and Python. This means that, for example, you can run Node.js and Python projects without first performing runtime installations. PowerShell users can use the .NET Core runtime. 



For more information, see [AWS CloudShell compute environment: specifications and software](vm-specs.md).

### Persistent storage
<a name="persistent-storage"></a>

With AWS CloudShell, you can use up to 1 GB of persistent storage in each AWS Region at no additional cost. Persistent storage is located in your home directory (`$HOME`) and is private to you. Unlike ephemeral environment resources that are recycled after each shell session ends, data in your home directory persists between sessions.

For more information about the retention of data in persistent storage, see [Persistent storage](limits.md#persistent-storage-limitations).

**Note**  
 CloudShell VPC environments do not have persistent storage. The $HOME directory is deleted when your VPC environment times out (after 20-30 minutes of inactivity), or when you delete or restart your environment. 

### CloudShell VPC environments
<a name="cshell-VPC-env"></a>

 AWS CloudShell virtual private cloud (VPC) enables you to create a CloudShell environment in your VPC. For each VPC environment, you can assign a VPC, add a subnet, and associate one or more security groups. AWS CloudShell inherits the network configuration of the VPC and enables you to use AWS CloudShell securely within the same subnet as other resources in the VPC. 

### Security
<a name="security"></a>

The AWS CloudShell environment and its users are protected by specific security features. This includes such features as IAM permissions management, shell session restrictions, and Safe Paste for text input.

**Permissions management with IAM**

As administrator, you can grant and deny permissions to AWS CloudShell users using IAM policies. You can also create policies that specify the particular actions that users can perform with the shell environment. For more information, see [Managing AWS CloudShell access and usage with IAM policies](sec-auth-with-identities.md).

**Shell session management**

Inactive and long-running sessions are automatically stopped and recycled. For more information, see [Shell sessions](limits.md#session-lifecycle-limitations).

 **Safe Paste for text input**

Safe Paste is enabled by default. This security feature requires that you verify that the multiline text that you want to paste into the shell doesn't contain malicious scripts. For more information, see [Using Safe Paste for multiline text](customizing-cshell.md#safe-paste-enable).

### Customization options
<a name="shell-customization"></a>

You can customize your AWS CloudShell experience to your exact preference. For example, you can change the screen layouts (multiple tabs), displayed text sizes, and toggle between the light and dark interface themes. For more information, see [Customizing your AWS CloudShell experienceUsing AWS CloudShell in Amazon VPC](customizing-cshell.md).

You can also extend your shell environment by [installing your own software](vm-specs.md#installing-software) and [modifying your shell with scripts](vm-specs.md#modifying-shell-scripts).

### Session restore
<a name="session-restore"></a>

The session restore functionality restores sessions that you were running across single or multiple browser tabs in the CloudShell terminal. If you refresh or reopen recently closed browser tabs, this functionality resumes the session until the shell is stopped because of inactive session. To continue using your CloudShell session, press any key within the terminal window. For more information about Shell sessions, see [Shell sessions](limits.md#session-lifecycle-limitations).

Session restore also restores the latest terminal output and running processes in each terminal tabs.

**Note**  
Session restore isn't available in mobile applications.

## Pricing for AWS CloudShell
<a name="shell-pricing"></a>

AWS CloudShell is an AWS service that's available at no additional charge. However, you pay for other AWS resources that you run with AWS CloudShell. Moreover, [standard data transfer rates](https://calculator.aws/#/) also apply. For more information, see [AWS CloudShell pricing](https://aws.amazon.com/cloudshell/pricing/).

For more information, see [Service quotas and restrictions for AWS CloudShell](limits.md).

## Key AWS CloudShell topics
<a name="toolkit-resources-info"></a>
+ [Getting started with AWS CloudShell](getting-started.md)
+ [AWS CloudShell Concepts](working-with-aws-cloudshell.md)
+ [Manage AWS services from CLI in CloudShell](working-with-aws-cli.md)
+ [Customizing your AWS CloudShell experienceUsing AWS CloudShell in Amazon VPC](customizing-cshell.md)
+ [AWS CloudShell compute environment: specifications and software](vm-specs.md)