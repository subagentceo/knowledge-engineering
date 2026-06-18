

# About this guide
<a name="about-cl3-upg"></a>

This guide describes how to upgrade or downgrade Conductor Live and worker nodes in an Conductor Live cluster. It covers versions 3.25.x and lower. These versions run on RHEL 7 (or CentOS 7). It also covers version 3.26.0 and higher. These versions run on RHEL 9.

It applies to the following *upgrade* scenarios:
+ You are currently running version 3.25.x or lower, and you want to upgrade to a version that is below 3.26.0.
+ You are currently running version 3.26.0 or higher, and you want to upgrade to a version that is higher than your current version.

It applies to the following *downgrade* scenarios:
+ You are currently running version 3.25.x or lower, and you want to downgrade to a version that is lower than your current version.
+ You are currently running version 3.26.0 or higher, and you want to downgrade to a different 3.26.x version.

If you want to upgrade or downgrade across the 3.25 / 3.26 divide, see the [AWS Elemental Conductor Live Migration Guide](https://docs.aws.amazon.com/elemental-cl3/latest/migrationguide/).

**Prerequisite knowledge**

We assume that you know how to:
+ Connect to the Conductor Live web interface using your web browser.
+ Log in to a remote terminal (Linux) session in order to work via the command line interface.

**Note**  
For assistance with your AWS Elemental appliances and software products, see the [AWS Elemental Support Center](https://console.aws.amazon.com/elemental-appliances-software/home?region=us-east-1#/supportcenter).

**Sending Commands**
+ Unless otherwise stated, enter all Linux shell commands from the home directory (/home/elemental). 
+ To ensure that the commands are executed regardless of your user permissions, use `sudo` to run the command as superuser.