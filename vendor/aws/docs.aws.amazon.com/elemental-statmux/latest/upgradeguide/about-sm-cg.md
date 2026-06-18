

This is version 2.20 of the AWS Elemental Statmux documentation. This is the latest version. For prior versions, see the *Previous Versions* section of [AWS Elemental Statmux and AWS Elemental Live Documentation](https://docs.aws.amazon.com/elemental-live).

# About this Guide
<a name="about-sm-cg"></a>

This guide is intended for engineers who upgrade the software running on the nodes of AWS Elemental Statmux.

The full suite of upgrade information for AWS Elemental Statmux is described in the table:


| Deployment | Description | Information | 
| --- | --- | --- | 
| Stand-alone deployments | AWS Elemental Statmux nodes are not in a cluster controlled by AWS Elemental Conductor Live 3. | This guide. | 
| AWS Elemental Conductor Live 3 simple cluster | AWS Elemental Statmux nodes in a cluster controlled by one AWS Elemental Conductor Live 3 node without backup worker nodes. | [AWS Elemental Conductor Live 3 Upgrade Guide](https://docs.aws.amazon.com/elemental-cl3/latest/upgradeguide) | 
| AWS Elemental Conductor Live 3 high-availability cluster, no worker redundancy | AWS Elemental Statmux nodes in a cluster controlled by two AWS Elemental Conductor Live 3 nodes (a primary and a backup). No backup worker nodes. | [AWS Elemental Conductor Live 3 Upgrade Guide](https://docs.aws.amazon.com/elemental-cl3/latest/upgradeguide) | 
| AWS Elemental Conductor Live 3 with worker redundancy | One of the following:[See the AWS documentation website for more details](http://docs.aws.amazon.com/elemental-statmux/latest/upgradeguide/about-sm-cg.html) | [AWS Elemental Conductor Live 3 Installation Guide](https://docs.aws.amazon.com/elemental-cl3/latest/installguide) | 

**Prerequisite Knowledge**  
We assume that you know how to:
+ Connect to the AWS Elemental Statmux web interface using your web browser.
+ Log in to a remote terminal (Linux) session in order to work via the command line interface.

**Note**  
To receive assistance with your AWS Elemental appliances and software products, see the forums and other helpful tools on the [AWS Elemental Support Center](https://console.aws.amazon.com/elemental-appliances-software/home?region=us-east-1#/supportcenter).

**Sending Commands**  
Tips for sending commands:
+ Unless otherwise stated, enter all Linux shell commands from the home directory (/home/elemental). 
+ To ensure that the commands are executed regardless of your user permissions, use "sudo" to run the command as a superuser.