

# Remotely Run Commands on an EC2 Instance with AWS Systems Manager
<a name="remotely-run-commands-ec2-instance-systems-manager"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 10 minutes  | 
| **Cost to complete** | [Free Tier](https://aws.amazon.com/free/) eligible  | 
| **Last updated** | July 14, 2022  | 

## Overview
<a name="overview"></a>

In this hands-on tutorial, you will learn how to use AWS Systems Manager to remotely run commands on your Amazon EC2 instances. Systems Manager is a management tool that enables you to gain operational insights and take action on AWS resources safely and at scale. Using the run command, one of the automation features of Systems Manager, you can simplify management tasks by eliminating the need to use bastion hosts, SSH, or remote PowerShell. 

In our example scenario, as a System Administrator, you need to update the packages on your EC2 instances. To complicate this normally simple admin task, your security team does not allow you to direct access production servers via SSH or allow you to use bastion hosts. Fortunately, you can use Systems Manager to remotely run commands, like update packages, on your EC2 instances. 

To solve this challenging scenario, you will create an Identity and Access Management (IAM) role, enable an agent on your instance that communicates with Systems Manager, then follow best practices by running the AWS-UpdateSSMAgent document to upgrade your Systems Manager Agent, and finally use Systems Manager to run a command on your instance. 

AWS Systems Manager is an always free tier product. The EC2 instance you create in this tutorial is free tier eligible. 

Open the [AWS Management Console](https://console.aws.amazon.com/console/home), so you can keep this step-by-step guide open. When the screen loads, enter your user name and password to get started. 

## Implementation
<a name="implementation"></a>

### Step 1: Create an Identity and Access Management (IAM) role
<a name="create-an-identity-and-access-management-iam-role"></a>

In this step, you will create an EC2 instance using the EnablesEC2ToAccessSystemsManagerRole role. This will allow the EC2 instance to be managed by Systems Manager.

1. Open the IAM console

   Open the IAM console at [https://console.aws.amazon.com/iam/](https://console.aws.amazon.com/iam/).   
![The navigation menu interface for the IAM console.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/navigation-menu-interface-iam-console.png)

1. Create the role

   In the left navigation pane, choose **Roles**, and then choose **Create role**.   
![AWS Identity and Access Management (IAM) Roles page showing a list of roles with their trusted entities and a highlighted "Create role" button.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/iamlong-iam-roles-page-list-their-trusted.png)

1. Select trusted entity

   On the **Select trusted entity** page, under **AWS Service**, choose **EC2**, and then choose **Next**.   
![AWS IAM role creation page, showing 'Select trusted entity' step with 'AWS service' and 'EC2' options selected, and 'Next' button highlighted.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/iam-role-creation-page-select-trusted.png)

1. Add permissions

   On the **Add permissions** page, in the search bar type **AmazonEC2RoleforSSM**. From the policy list select **AmazonEC2RoleforSSM** and then choose **Next**.   
![Amazon Web Services (AWS) IAM interface showing the 'Add permissions' step, with the 'AmazonEC2RoleforSSM' policy selected and a note indicating the policy will soon be deprecated.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/iam-interface-permissions-amazonec-rolefor.png)

1. Enter a role name and description

   On the **Name, review, and create** page, in the **Role name** box, type in **EnablesEC2ToAccessSystemsManagerRole**. In the **Description** box, type in **Enables an EC2 instance to access Systems Manager**. Choose **Create role**.   
![The AWS IAM 'Name, review, and create' page showing a role named 'EnableEC2ToAccessSystemsManagerRole' with a description and permissions policy for EC2 to access Systems Manager, and the 'Create role' button highlighted.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/iam-name-page-role-named-enableec.png)

### Step 2: Create an EC2 instance
<a name="create-an-ec2-instance"></a>

Now that you have an EC2 instance running the Systems Manager agent, you can automate administration tasks and manage the instance. In this step, you run a pre-packaged command, called a document, that will upgrade the agent. It is best practice to update the Systems Manager Agent when you create a new instance.

1. Launch an EC2 instance

   Open the [Amazon EC2 console](https://console.aws.amazon.com/ec2/). From the EC2 console, select your preferred [Region](https://docs.aws.amazon.com/general/latest/gr/rande.html#ssm_region). Systems Manager is supported in all AWS Regions. Now choose **Launch instance**.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/interface-controls-buttons.png)

1. Enter an instance name and choose an AMI

   In the **Name** field, enter **MyEC2Tutorial**. Select the **Amazon Linux AMI**. Retain the default selection that appears in the dropdown. You can also install the Systems Manager Agent on your own Windows or Linux system.   
![Amazon EC2 launch instance page showing configuration options, including naming the instance "MyEC2Tutorial," selecting Amazon Linux 2 AMI, and t2.micro as the instance type with free tier eligibility highlighted.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/launch-instance-page-configuration-options.png)

1. Choose an instance type

   Choose the t2.micro instance type.   
![Amazon EC2 instance configuration screen showing the selection of a t2.micro instance type, which is free tier eligible with 1 vCPU and 1 GiB memory.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/instance-configuration-screen-selection.png)

1. Choose to proceed without a key pair

   You will not need a keypair to use Systems Manager to remotely run commands. Scroll down to **Key pair** and under the **Key pair name** dropdown, choose **Proceed without a key pair**.   
![Amazon EC2 instance launch configuration screen showing key pair settings with the option "Proceed without a key pair (Not recommended)" selected, alongside network settings and a summary panel.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/instance-launch-configuration-screen-key.png)

1. Keep default network and storage

   Retain default settings under **Network settings** and **Configure storage**.   
![Amazon EC2 instance launch settings page showing network settings, storage configuration, and a summary panel with free tier details.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/instance-launch-settings-page-network.png)

1. Attach the IAM role to the EC2 instance

   Under **Advanced details**, in the IAM instance profile dropdown choose the EnablesEC2ToAccessSystemsManagerRole role you created earlier. Leave everything else as default. Choose **Launch instance**.   
![Amazon EC2 instance launch configuration screen showing advanced details, including IAM instance profile "EnablesEC2ToAccessSystemsManagerRole," and a summary section with free tier information and a "Launch instance" button.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/instance-launch-configuration-screen.png)

### Step 3: Run a remote shell script
<a name="run-a-remote-shell-script"></a>

1. Open Systems Manager

   In the top navigation bar, search for **Systems Manager** and open the Systems Manager console.   
![The navigation interface.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/navigation-interface.png)

1. Choose Fleet Manager

   Under the **Node Management** section on the left navigation bar, choose **Fleet Manager**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/selection-interface-1.png)

1. Choose an instance

   Select the node ID created in step 2, MyEC2Tutorial, to open the node detail page.   
![AWS Fleet Manager interface showing one managed node with ID "i-0acdf9192e629ffb1," status "Running," and details including node name "MyEC2Tutorial," platform "Linux," and operating system "Amazon Linux.".](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/fleet-manager-interface-one-managed-node-1.png)

1. Choose Run Command

   On the node detail page, in the **Node actions** dropdown, select **Execute run command**.   
![AWS Systems Manager Fleet Manager showing details of a managed node, including Node ID, platform type (Linux), and node type (t2.micro), with the 'Execute run command' option highlighted in the Node actions menu.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/fleet-manager-details-managed-node-1.png)

1. Choose AWS-UpdateSSMAgent

   On the **Run a command** page, click in the search bar and select, **Document name prefix**, then click on **Equals**, then type in **AWS-UpdateSSMAgent**. 

   Now select the radio button on the left of **AWS-UpdateSSMAgent**. This document will upgrade the Systems Management agent on the instance.   
![AWS Systems Manager interface showing the "Run a command" page with the "AWS-UpdateSSMAgent" document selected for updating the Amazon SSM Agent.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/interface-run-command-page-update-agent.png)

1. Select targets

   Scroll down to the **Targets** panel and select the check box next to your managed EC2 instance. 

   Finally, scroll down and select **Run**.   
![AWS Systems Manager interface showing the selection of an EC2 instance with ID i-0acdf9192e629fbf1 and configuration options for running a command.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/interface-selection-instance-acdf-1.png)

1. Select targets

   Next you will see a page documenting your running command, and then overall success in green. Congrats, you have just run your first remote command using Systems Manager.   
![AWS Systems Manager interface showing a successful command execution with one target, no errors, and detailed status marked as "Success.".](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/interface-successful-command-execution-one.png)

### Step 4: Terminate your resources
<a name="terminate-your-resources"></a>

In this step, you will terminate your Systems Manager and EC2 related resources.

**Important**  
Terminating resources that are not actively being used reduces costs and is a best practice. Not terminating your resources can result in a charge.

1. Choose Fleet Manager

   Under the **Node Management** section on the left navigation bar, choose **Fleet Manager**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/selection-interface-1.png)

1. Choose an instance

   Select the node ID created in step 2, MyEC2Tutorial, to open the node detail page.   
![AWS Fleet Manager interface showing one managed node with ID "i-0acdf9192e629ffb1," status "Running," and details including node name "MyEC2Tutorial," platform "Linux," and operating system "Amazon Linux.".](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/fleet-manager-interface-one-managed-node-1.png)

1. Choose Run Command

   On the node detail page, in the **Node actions** dropdown, select **Execute run command**.   
![AWS Systems Manager Fleet Manager showing details of a managed node, including Node ID, platform type (Linux), and node type (t2.micro), with the 'Execute run command' option highlighted in the Node actions menu.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/fleet-manager-details-managed-node-1.png)

1. Choose AWS-RunShellScript

   On the **Run a command** page, click in the search bar and select, **Document name prefix**, then click on **Equals**, then type in **AWS-RunShellScript**. 

   Now select the radio button on the left of AWS-RunShellScript.   
![AWS Systems Manager 'Run a command' interface, showing a filtered command document named 'AWS-RunShellScript' for Linux and MacOS platforms.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/run-command-interface-filtered-document.png)

1. Enter update command

   Scroll down to the **Command Parameters** panel and insert the following command in the **Commands** text box: 

   ```
   sudo yum update –y
   ```  
![AWS Systems Manager interface showing a command parameter field with "sudo yum update -y" entered.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/interface-command-parameter-field-sudo-yum.png)

1. Select targets

   Scroll down to the **Targets** panel and select the check box next to your managed EC2 instance. 

   Finally, scroll down and select **Run**.   
![AWS Systems Manager interface showing the selection of an EC2 instance with ID i-0acdf9192e629fbf1 and configuration options for running a command.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/interface-selection-instance-acdf-1.png)

1. View command status

   While your script is running remotely on the managed EC2 instance, the **Overall status** will be **In Progress**. Soon the **Overall status** will turn to **Success**. When it does, scroll down to the **Targets** **and outputs** panel and select the Instance ID of your instance. Your Instance ID will be different than the one pictured.   
![AWS Systems Manager interface showing a successful command execution with overall status marked as "Success" and detailed status for one target also marked as "Success.".](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/interface-successful-command-execution.png)

1. View command output

   From the **Output on: i-XX** page, select the header of the **Output** panel to view the output of the update command from the instance.   
![AWS Systems Manager interface showing a successful command execution with output details, including loaded plugins and no packages marked for update.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/interface-successful-command-execution-1.png)

### Step 5: Update the Systems Manager Agent
<a name="update-the-systems-manager-agent"></a>

In this step, you will terminate your Systems Manager and EC2 related resources.

**Important**  
Terminating resources that are not actively being used reduces costs and is a best practice. Not terminating your resources can result in a charge.

1. Open the EC2 console and choose Instances

   Open the [Amazon EC2 console](https://console.aws.amazon.com/ec2/) and from the left navigation under the **Instances** heading, select **Instances**.   
![The navigation menu interface for the EC2 console.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/navigation-menu-interface-console.png)

1. Terminate your instance

   Select your instance's checkbox and choose **Instance state**, then select **Terminate instance**. This will terminate your instance completely.   
![Amazon EC2 dashboard showing a running instance named "MyEC2Tutorial" with the "Terminate instance" option highlighted in the dropdown menu.](http://docs.aws.amazon.com/hands-on/latest/remotely-run-commands-ec2-instance-systems-manager/images/dashboard-running-instance-named-myec.png)

## Congratulations
<a name="congratulations"></a>

Congratulations, you have successfully created a managed instance and remotely run a command using AWS Systems Manager. You first set up the correct permissions through IAM. Next you launched an Amazon Linux instance that was preinstalled with the Systems Manager agent. Finally, you used Run Command to update the agent and remotely perform a yum update. 

Systems Manager is a good choice when you need to view operation data for groups of resources, automate operational actions, understand and control the current state of your resources, manage hybrid environments, and maintain security and compliance. 