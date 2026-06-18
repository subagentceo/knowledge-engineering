

# About this guide
<a name="about-lv-cg"></a>

This guide describes how to upgrade or downgrade the software running on an AWS Elemental Live node. It covers versions 2.25.x and lower. These versions run on RHEL 7 (or CentOS 7). It also covers version 2.26.0 and higher. These versions run on RHEL 9.

It applies to the following *upgrade* scenarios:
+ You are currently running version 2.25.x or lower, and you want to upgrade to a version that is below 2.26.0.
+ You are currently running version 2.26.0 or higher, and you want to upgrade to a version that is higher than your current version.

It applies to the following *downgrade* scenarios:
+ You are currently running version 2.25.x or lower, and you want to downgrade to a version that is lower than your current version.
+ You are currently running version 2.26.0 or higher, and you want to downgrade to a different 2.26.x version.

If you want to upgrade or downgrade across the 2.25 / 2.26 divide, see the [AWS Elemental Live Migration Guide](https://docs.aws.amazon.com/elemental-live/latest/migrationguide/)

**Upgrade scenarios**

The Elemental Live node might be running in stand-alone, or it might be a member of an AWS Elemental Conductor Live cluster. The following table identifies the guide to read for your deployment.


| Deployment type | Description | Guide | 
| --- | --- | --- | 
| Stand-alone deployments | Elemental Live nodes are not in a cluster controlled by AWS Elemental Conductor Live. | This guide. | 
| Single Conductor cluster, no worker redundancy | Elemental Live nodes *without* backup worker nodes in a cluster controlled by one AWS Elemental Conductor Live node. | [AWS Elemental Conductor Live Upgrade Guide](https://docs.aws.amazon.com/elemental-cl3/latest/upgradeguide/) | 
| Single Conductor cluster with worker redundancy | Elemental Live nodes *with* one or more backup worker nodes in a cluster controlled by one AWS Elemental Conductor Live node. | [AWS Elemental Conductor Live Upgrade Guide](https://docs.aws.amazon.com/elemental-cl3/latest/upgradeguide/) | 
| High-availability cluster, no worker redundancy | Elemental Live nodes *without* backup worker nodes in a cluster controlled by two AWS Elemental Conductor Live nodes. | [AWS Elemental Conductor Live Upgrade Guide](https://docs.aws.amazon.com/elemental-cl3/latest/upgradeguide/) | 
| High-availability cluster, with worker redundancy | Elemental Live nodes *with* backup worker nodes, in a cluster controlled by two AWS Elemental Conductor Live nodes (a primary and a backup). | [AWS Elemental Conductor Live Upgrade Guide](https://docs.aws.amazon.com/elemental-cl3/latest/upgradeguide/) | 

**Prerequisite knowledge**

We assume that you know how to:
+ Connect to the Elemental Live web interface using your web browser.
+ Log in to a remote terminal (Linux) session in order to work via the command line interface.

**Note**  
For assistance with your AWS Elemental appliances and software products, see the [AWS Elemental Support Center](https://console.aws.amazon.com/elemental-appliances-software/home?region=us-east-1#/supportcenter).

**Sending commands**
+ Unless otherwise stated, enter all Linux shell commands from the home directory (/home/elemental). 
+ To ensure that the commands are executed regardless of your user permissions, use `sudo` to run the command as a superuser.