

This is version 2.18 of the AWS Elemental Conductor File documentation. This is the latest version. For prior versions, see the *Archive* section of [AWS Elemental Conductor File and AWS Elemental Server Documentation](https://docs.aws.amazon.com/elemental-server).

# About This Guide
<a name="about-cf-ig"></a>

This guide describes how to install AWS Elemental Conductor File software for the first time. The table lists the reference documents for the different types of installation:


****  

| Installation type | Description | 
| --- | --- | 
| Node-locked licenses on AWS Elemental appliances | You received AWS Elemental Appliance edition hardware, which comes with the appropriate licenses already installed. For your worker nodes, see [AWS Elemental Server Installation Guide](https://docs.aws.amazon.com/elemental-server/latest/installguide) as well. | 
| Node-locked licenses on hardware | You're installing unique licenses for each piece of physical, qualified hardware that's running AWS Elemental software. See [Installing AWS Elemental Conductor File Node-locked Licenses on Qualified Hardware](install-cf-ig.md).<br />For your worker nodes, see [AWS Elemental Server Installation Guide](https://docs.aws.amazon.com/elemental-server/latest/installguide) as well. | 
| Node-locked licenses on a virtual machine (VM) | You're installing unique licenses for each VM guest that's running AWS Elemental software.See [Installing AWS Elemental Conductor File Node-locked Licenses on a Virtual Machine (VM)](install-vm-cf-ig.md).<br />For your worker nodes, see [AWS Elemental Server Installation Guide](https://docs.aws.amazon.com/elemental-server/latest/installguide) as well. | 
| Node-locked licenses on a kernel-based virtual machine (KVM) | You're installing unique licenses for each VM guest that's running AWS Elemental software.See [Installing AWS Elemental Conductor File Node-locked Licenses on a Kernel-based Virtual Machine (KVM)](install-kvm-cf-ig.md).<br />For your worker nodes, see [AWS Elemental Server Installation Guide](https://docs.aws.amazon.com/elemental-server/latest/installguide) as well. | 
| Pooled licenses on a virtual machine (VM) | You're installing pooled licenses for each VM guest that's running AWS Elemental software. The AWS Elemental Conductor File nodes hold the license pool and disseminate licenses to the worker nodes. All worker nodes have the same licensing options.See [Installing AWS Elemental Conductor File Pooled Licenses on a Virtual Machine (VM)](install-vm-p-cf-ig.md). Steps for your worker nodes are included in this section. | 

All of these scenarios get you through phase 1 of the installation process: the preconfigured operating system is installed, the software is installed, eth0 is configured, and licenses are installed. Phase 2 is configuration of the software and is addressed in [AWS Elemental Conductor File Configuration Guide](https://docs.aws.amazon.com/elemental-cf2/latest/configguide).

**Note**  
To receive assistance with your AWS Elemental appliances and software products, see the forums and other helpful tools on the [AWS Elemental Support Center](https://console.aws.amazon.com/elemental-appliances-software/home?region=us-east-1#/supportcenter).