

# Deploy a P4d EC2 UltraCluster
<a name="deploy-a-p4d-ec2-ultracluster"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Intermediate  | 
| **Time to complete** | 10 minutes  | 
| **Last updated** | December 8, 2020  | 

## Overview
<a name="overview"></a>

[Amazon EC2 P4d instances](https://aws.amazon.com/ec2/instance-types/p4/) deliver the highest performance for machine learning (ML) training and high performance computing (HPC) applications in the cloud. Amazon EC2 P4d instances are deployed in clusters called EC2 UltraClusters that are comprised of the high performance compute, networking, and storage in the cloud. Each EC2 UltraCluster of P4d instances comprises more than 4,000 of the latest NVIDIA A100 GPUs, Petabit-scale non-blocking networking infrastructure, and high throughput low latency storage with FSx for Lustre. 

This step-by-step tutorial will help you launch a high performance HPC cluster in the cloud using EC2 UltraClusters of P4d Instances. You will setup the underlying networking for the cluster, deploy FSx for Lustre and P4d cluster, and delete your AWS resources.  

Before launching an EC2 UltraCluster it is recommended first to launch a single P4d instance and get familiar with the instance type. Also note in which Availability Zone in your account and region you launched the P4d instance. You will need this information later in the tutorial. 

## What you'll accomplish
<a name="what-you-will-accomplish"></a>
+ Login to the AWS Management Console 
+ Create a private subnet with a NAT Gateway 
+ Create three security groups for access to the EC2 UltraCluster 
+ Launch a FSx for Lustre file system 
+ Launch a cluster of EC2 P4d instances with four EFA ENIs 
+ Launch a jumphost 
+ Deprovision resources in the EC2 UltraCluster 

## Implementation
<a name="implementation"></a>

### Step 1: Create a private subnet with a NAT Gateway
<a name="create-a-private-subnet-with-a-nat-gateway"></a>

The EC2 UltraCluster will have multiple elastic network interfaces per instance. We will need to create the instances in a private subnet and route a NAT Gateway through a public subnet with the internet gateway (IGW) attached. 

1. Login to the AWS Management Console

   When you [click here](https://console.aws.amazon.com/console/home), the AWS Management Console will open in a new browser window, so you can keep this step-by-step guide open.  When the screen loads, enter your **user name** and **password** to get started. Then type **VPC** in the search bar and select **VPC** to open the console. 

1. Create a private subnet

   Create a subnet in your VPC with an available free CIDR range this CIDR range needs to be able to accommodate the number of instances you want to launch \* 4.   
![An example configuration for subnet settings in Amazon EC2, including subnet name, availability zone, IPv4 CIDR block, and tagging options.](http://docs.aws.amazon.com/hands-on/latest/deploy-a-p4d-ec2-ultracluster/images/subnet-settings-configuration-example-eaf.png)

1. Create a NAT Gateway

   Create a NAT Gateway by going to NAT Gateways in the side menu launching a gateway in public subnet in the VPC. This will take a few minutes to provision.   
![The NAT gateway settings page, including fields for the NAT gateway name, subnet selection, and Elastic IP allocation, as demonstrated in an EC2 tutorial.](http://docs.aws.amazon.com/hands-on/latest/deploy-a-p4d-ec2-ultracluster/images/nat-gateway-settings-page-including-fields.png)

1. Create a routing table

   After provisioning is complete go to **route tables** and create a new route table selecting the VPC that your Gateway was created in. In **Routes** for the route table add a route for the destination **0.0.0.0/0** where the target is the NAT Gateway ID you created earlier.   
![A sample AWS route tables configuration with destinations, targets, statuses, and propagation columns as part of a getting started tutorial.](http://docs.aws.amazon.com/hands-on/latest/deploy-a-p4d-ec2-ultracluster/images/route-tables-sample-configuration.png)

1. Associate the route table with the subnet

   Associate this route table with the private subnet you created earlier, right click on the route table **ID** and choose **Edit subnet associations**. 

### Step 2: Create security groups for access to the EC2 UltraCluster
<a name="create-security-groups-for-access-to-the-ec2-ultracluster"></a>

We will create 2 security groups with different policies for access for: 
+ external SSH access 
+ EFA networking 

1. Configure the security groups

   In the EC2 Console navigate to the security groups and choose **Create security groups**. 
   + Choose the VPC used earlier to associate this security group with 
   + For EFA: For inbound rules add All traffic on all ports in scope of the security group that is being created. 
   + For EFA: For outbound rules add All traffic on all ports in scope of the security group being create   
![The Inbound rules tab of an Amazon EC2 security group, with all traffic, all protocols, all port ranges allowed from a specific source security group.](http://docs.aws.amazon.com/hands-on/latest/deploy-a-p4d-ec2-ultracluster/images/security-group-inbound-rules-example-dbba.png)

1. Verify the TCP port settings

   For the new SSH security group ensure that **TCP port 22** is open inbound with outbound set to 0.0.0.0/0. 

### Step 3: Launch a FSx for Lustre file system
<a name="launch-a-fsx-for-lustre-file-system"></a>

As part of the EC2 UltraClusters you will need to launch a FSx for Lustre file system. You can use any process to launch the FSx for Lustre file system but it needs to be launched in the private subnet you created earlier. 

1. Create a file system

   In the FSx for Lustre console click on**Create file system.** 

   Choose Amazon FSx for Lustre and click **Next****.** 

1. Configure the file system

   Complete the form with the following parameters: 
   + For **Deployment & storage type** choose **Scratch,SSD** 
   + For **Throughput per unit of storage** choose** 200 MBs/TB** 
   + For **Storage Capacity** choose **2.4TiB** 
   + For **Virtual Private Cloud**: choose **VPC of the private subnet created earlier** 
   + For **VPC Security Groups** choose **Choose the EFA security group you created earlier** 
   + For **Subnet** choose. the private subnet you created earlier   
![The AWS FSx for Lustre 'Create file system' settings page, showing options for file system details, storage type, throughput, capacity, and network and security configuration.](http://docs.aws.amazon.com/hands-on/latest/deploy-a-p4d-ec2-ultracluster/images/lustre-file-settings-edaeb-fsxlustre-page.png)

1. Choose an S3 bucket

   Choose an S3 bucket for data ingestion. The dataset for this tutorial is the BERT dataset. If you don’t have it, we can use synthetic benchmarks.   
![A Data Repository Import/Export configuration interface, showing options to import data from and export data to an S3 bucket, including file and directory listing updates, import bucket and prefix entry, and export prefix selection.](http://docs.aws.amazon.com/hands-on/latest/deploy-a-p4d-ec2-ultracluster/images/vte-data-repo-import-export-fbedea.png)

1. Verify the file system was created

   Wait until the FSx cluster is in the **Available** state. 

   Note the dnsname and mountname of the cluster. 

### Step 4: Launch a cluster of EC2 P4d instances with four EFA ENIs
<a name="launch-a-cluster-of-ec2-p4d-instances-with-4-efa-enis"></a>

We can launch the compute layer of the EC2 UltraCluster. You can use the Deep Learning AMI v36 for support for P4d or create your own. You will need to install the FSx client drivers. 

In the EC2 management console, select in the EC2 Dashboard to launch an instance. 
+ Launch an instance

  1. Select the AMI with A100 support as well as have the FSx client driver installed. 

  1. For **Instance Type** choose **p4d.24xlarge** 

  1. For the instance details choose the number of instances you want in the count 

  1. Choose the VPC and private subnet created earlier. 

  1. Select a placement group created as a cluster. 

  1. For **network interfaces** add 3 more network interfaces with **Elastic Fabric Adapter** selected 

  1. Set the **NetworkCardIndex** for each EFA adapter to **0,1,2,3** . 

  1. Add any relevant tags in the next screen for the Security Group section choose the security groups created earlier for SSH and EFA access. 

  1. Launch the instance and confirm they have 4 private IP addresses per node.   
![The Amazon EC2 console interface for configuring multiple network interfaces with Elastic Fabric Adapter (EFA) attachment options.](http://docs.aws.amazon.com/hands-on/latest/deploy-a-p4d-ec2-ultracluster/images/network-interfaces-efa-attachment-console.png)

### Step 5: Launch a jumphost
<a name="launch-a-jumphost"></a>

Since the cluster is a private subnet. We need to launch a jumphost in the public subnet to be able to access the P4d instance in the EC2 UltraCluster.  

1. In the EC2 Console launch an EC2 instance, for example t3a.xlarge, in a public subnet of the VPC. 

1. Attach the security groups created earlier. 

1. After the instance has launched, you can ssh into the instance and then ssh into one of the p4d.24xlarge nodes in the cluster. 

### (Optional) Delete resources in the EC2 UltraCluster
<a name="delete-resources-in-the-ec2-ultracluster"></a>

You can easily delete the EC2 P4d cluster from the EC2 console and the FSx for Lustre file system from the FSx console. In fact, it is a best practice to delete resources you are no longer using so you don’t keep getting charged for them. 

## Congratulations\!
<a name="congratulations"></a>

You have just launched a P4d instance in the EC2 UltraCluster. With this cluster you can run large scale distributed deep learning workflows with the best practices for compute and storage. 

EC2 UltraClusters is an optimized placement strategy for the EC2 P4d instances and FSx for Lustre file system. EC2 UltraClusters are supported in managed services such as Amazon Elastic Kubernetes Service (Amazon EKS). Follow [examples on Github](https://github.com/aws-samples/eks-efa-examples) **** to launch an EC2 UltraCluster with containers using Amazon EKS. 