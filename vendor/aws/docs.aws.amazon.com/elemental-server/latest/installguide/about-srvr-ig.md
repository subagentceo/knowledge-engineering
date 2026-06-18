

This is version 2.18 of the AWS Elemental Server documentation. This is the latest version. For prior versions, see the *Previous Versions* section of [AWS Elemental Conductor File and AWS Elemental Server Documentation](https://docs.aws.amazon.com/elemental-server/).

# About This Guide
<a name="about-srvr-ig"></a>

This guide describes how to install AWS Elemental Server software for the first time. The reference documents for the different types of installation are listed in the following table.


****  

| Installation type | Description | 
| --- | --- | 
| Node-locked licenses on AWS Elemental appliances | You received AWS Elemental Appliance edition hardware, which comes with the appropriate licenses already installed.If you're using AWS Elemental Conductor File to control your AWS Elemental Server nodes, see [AWS Elemental Conductor File Installation Guide](https://docs.aws.amazon.com/elemental-cf2/latest/installguide/) as well. | 
| Node-locked licenses on hardware | You're installing unique licenses for each piece of physical, qualified hardware that's running AWS Elemental software. See [Installing AWS Elemental Server Node-locked Licenses on Qualified Hardware](install-srvr-ig.md).<br />If you're using AWS Elemental Conductor File to control your AWS Elemental Server nodes, see [AWS Elemental Conductor File Installation Guide](https://docs.aws.amazon.com/elemental-cf2/latest/installguide/) as well. | 
| Node-locked licenses on a virtual machine (VM) | You're installing unique licenses for each VM guest that's running AWS Elemental software.See [Installing AWS Elemental Server Node-locked Licenses on a Virtual Machine (VM)](install-vm-srvr-ig.md).<br />If you're using AWS Elemental Conductor File to control your AWS Elemental Server nodes, see [AWS Elemental Conductor File Installation Guide](https://docs.aws.amazon.com/elemental-cf2/latest/installguide/) as well. | 
| Node-locked licenses on a kernel-based virtual machine (KVM) | You're installing unique licenses for each VM guest that's running AWS Elemental software.See [Installing AWS Elemental Server Node-locked Licenses on a Kernel-Based Virtual Machine (KVM)](install-kvm-srvr-ig.md).<br />If you're using AWS Elemental Conductor File to control your AWS Elemental Server nodes, see [AWS Elemental Conductor File Installation Guide](https://docs.aws.amazon.com/elemental-cf2/latest/installguide/) as well. | 
| Pooled licenses on a virtual machine (VM) | You're installing pooled licenses for each VM guest that's running AWS Elemental software. The AWS Elemental Conductor File nodes hold the license pool and disseminate licenses to the worker nodes. All worker nodes have the same licensing options.See the pooled license topic in [AWS Elemental Conductor File Installation Guide](https://docs.aws.amazon.com/elemental-cf2/latest/installguide/). | 

All of these scenarios get you through phase 1 of the installation process: the preconfigured operating system is installed, the software is installed, eth0 is configured, and licenses are installed. Phase 2 is configuration of the software and is addressed in [Configuring a Stand-alone Node Quick Guide](https://docs.aws.amazon.com/elemental-onprem/latest/pdf/DOC-1094.pdf).

**Note**  
To receive assistance with your AWS Elemental appliances and software products, see the forums and other helpful tools on the [AWS Elemental Support Center](https://console.aws.amazon.com/elemental-appliances-software/home?region=us-east-1#/supportcenter).