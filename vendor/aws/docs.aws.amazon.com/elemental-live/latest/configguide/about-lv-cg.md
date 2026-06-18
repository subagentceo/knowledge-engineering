

# About this guide
<a name="about-lv-cg"></a>

This guide describes how to configure an AWS Elemental Live node that is working in stand-alone mode. Stand-alone means that the nodes aren't being controlled by AWS Elemental Conductor Live. If your Elemental Live nodes are being controlled by AWS Elemental Conductor Live, see the [AWS Elemental Conductor Live Upgrade Guide](https://docs.aws.amazon.com/elemental-cl3/latest/installguide). 

This guide applies to all versions of the software that are currently available for download from AWS Elemental. It covers versions that run on RHEL 7 (or CentOS 7) and versions that run on RHEL 9. 

**Phase 2 of installation**

This guide provides detailed information about phase 2 of installation, including how to perform the following:
+ Enable user authentication so that users must log in to use any product.
+ Add users, if user authentication is enabled.
+ Configure the time zone, DNS server, NTP servers, firewall, and alert notifications.
+ Configure other Ethernet interfaces, as required.
+ Configure routers and other input devices.

Configuration is the same for all types of hardware — AWS Elemental appliances, qualified hardware, and virtual machines.

****Prerequisite knowledge****  
We assume that you know how to:
+ Connect to the Elemental Live web interface using your web browser.
+ Log in to a remote terminal (Linux) session in order to work via the command line interface.

**Note**  
For assistance with your AWS Elemental appliances and software products, see the [AWS Elemental Support Center](https://console.aws.amazon.com/elemental-appliances-software/home?region=us-east-1#/supportcenter)