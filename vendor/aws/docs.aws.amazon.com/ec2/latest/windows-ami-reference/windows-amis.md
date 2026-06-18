

# AWS Windows AMI reference
<a name="windows-amis"></a>

AWS provides a set of publicly available Amazon Machine Images (AMIs) that contain software configurations specific to the Windows platform. 

You can quickly start building and deploying your applications with Amazon EC2 by using these AMIs. First choose the AMI that meets your specific requirements, and then launch an instance using that AMI. You retrieve the password for the administrator account and then log in to the instance using Remote Desktop Connection, just as you would with any other Windows Server.

In general, the AWS Windows AMIs are configured with the default settings used by the Microsoft installation media. However, Amazon does apply some customizations. For example, the AWS Windows AMIs come with the following software and drivers:
+ EC2Launch v2 (Windows Server 2022 and 2025)
+ EC2Launch v1 (Windows Server 2016 and 2019)
+ EC2Config (through Windows Server 2012 R2)
+ AWS Systems Manager
+ AWS CloudFormation
+ AWS Tools for Windows PowerShell
+ Network drivers (SRIOV, ENA, Citrix PV)
+ Storage drivers (NVMe, AWS PV, Citrix PV)
+ Graphics drivers (NVidia GPU, Elastic GPU)

With the Windows fast launch feature, you can configure pre-provisioned snapshots to launch instances up to 65% faster. For more information, see [Configure Windows fast launch for your Windows Server AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/win-ami-config-fast-launch.html) in the *Amazon EC2 User Guide*.

To view changes to each release of the AWS Windows AMIs, including SQL Server updates, see the [AWS Windows AMI version history](ec2-windows-ami-version-history.md).