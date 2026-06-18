

# About this guide
<a name="about-lv-ig"></a>

This guide describes how to install AWS Elemental Live software for the first time. (To perform a kickstart and fresh install on a node that you have already deployed, see the [AWS Elemental Live Upgrade Guide](https://docs.aws.amazon.com/elemental-live/latest/upgradeguide/).)

This guide applies to all versions of the software that are currently available for download from AWS Elemental. 



**Phase 1 of installation**

This guide describes how to install AWS Elemental Live software for the first time. The following table identifies the guide to read for the type of hardware you have obtained. 


****  

| Type of hardware | Description | Section in this guide | 
| --- | --- | --- | 
| AWS Elemental appliances | You obtained an AWS Elemental appliance. This hardware comes with the software and the appropriate licenses already installed. You don't need to perform any installation. Instead, you need to complete setup of the appliance. See the [AWS Elemental Live Configuration Guide](https://docs.aws.amazon.com/elemental-live/latest/configguide/). | None | 
| Qualified hardware | You're installing unique licenses for each qualified hardware unit that's running Elemental Live.  | [Installing Elemental Live on qualified hardware](install-lv-ig.md) in this guide | 
| Virtual machine (VM) | You're installing software and licenses for each VM guest that's running Elemental Live. | [Installing AWS Elemental Live on a virtual machine (VM)](install-vm-lv-ig.md) in this guide | 

The procedures in this guide get you through phase 1 of the installation process: 
+ The preconfigured operating system is installed.
+ The software is installed, eth0 is configured, and licenses are installed. 

Phase 2 is configuration of the software and is addressed in [AWS Elemental Live Configuration Guide](https://docs.aws.amazon.com/elemental-live/latest/configguide/)

**Note**  
For assistance with your AWS Elemental appliances and software products, see the [AWS Elemental Support Center](https://console.aws.amazon.com/elemental-appliances-software/home?region=us-east-1#/supportcenter).