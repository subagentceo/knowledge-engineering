

# Launch a Windows Virtual Machine in Amazon Lightsail
<a name="launch-windows-vm"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 10 minutes  | 
| **Cost to complete** | [Free Tier](https://aws.amazon.com/free/?e=gs2020&p=build-a-web-app-intro) eligible  | 
| **Requires** |  [See the AWS documentation website for more details](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/launch-windows-vm.html)  | 
| **Last updated** | August 23, 2022  | 

## Overview
<a name="overview"></a>

[Amazon Lightsail](https://aws.amazon.com/lightsail/) is one of the easiest ways to get started on AWS. It offers virtual servers, storage, databases, and networking, plus a cost-effective, monthly plan. 

In this tutorial, you create a Windows Server 2019 instance in Amazon Lightsail in seconds. After the instance is up and running, you connect to it via RDP within the Lightsail console using the browser-based RDP client. 

[Get started with Amazon Lightsail for free](https://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/#:~:text=Get%20started%20with%20Amazon%20Lightsail%20for%20free.%C2%A0). 

[![AWS Videos](http://img.youtube.com/vi/BTEvn7HLMGU/0.jpg)](http://www.youtube.com/watch?v=BTEvn7HLMGU)


## Implementation
<a name="implementation"></a>

### Step 1: Create a Windows Server 2019 instance in Amazon Lightsail
<a name="primary-step"></a>

1. Create an Amazon Lightsail account

   [Sign up for AWS](https://portal.aws.amazon.com/billing/signup?client=lightsail&fid=1A3F6B376ECAC516-2C15C39C5ACECACB&redirect_url=https%3A%2F%2Flightsail.aws.amazon.com%2Fls%2Fsignup#/start) 

   Already have an account? [Sign-in](https://lightsail.aws.amazon.com/ls/) 

   This tutorial is free tier eligible. 

1. Create a Windows Server 2019 instance in Amazon Lightsail

   Choose the **Create instance** button on the **Instances** tab of the Lightsail home page.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/resource-creation-interface.png)

### Step 2: Configure the instance
<a name="configure-the-instance"></a>

1. Specify a Region and Availability Zone

   An AWS Region and Availability Zone is selected for you. Choose **Change Region and Availability Zone** to create your instance in another location.   
![The configuration settings interface.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/configuration-settings-interface.png)

1. Choose a platform and image

   Choose the **Microsoft Windows** platform option, and choose **OS only** to view the operating system-only instance images available in Lightsail. Select the **Windows Server 2019** image. 

   To learn more about Lightsail instance images, see [Choose an Amazon Lightsail instance image](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/compare-options-choose-lightsail-instance-image).   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/selection-interface.png)

1. (Optional) Add a launch script

   Choose **Add launch script** to add a PowerShell script that will run on your instance when it launches.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/interface.png)

1. Select an instance plan

   Choose your instance plan. 

   You can try the $8 USD Lightsail plan free for three months (up to 750 hours). We'll credit three free months to your account. 

   [Learn more on the Lightsail pricing page](https://aws.amazon.com/lightsail/pricing/).   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/selection-interface-1.png)

1. Enter an instance name

   Enter a name for your instance.   
![Amazon Lightsail interface showing an instance being named 'Windows_Server_2019-1' with options for adding key-only and key-value tags.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/lightsaillong-interface-instance-being.png)

1. (Optional) Add tags

   Choose one of the following options to add tags to your instance: 
   + **Add key-only tags** — Enter your new tag into the tag key text box, and press Enter. Choose Save when you’re done entering your tags to add them, or choose Cancel to not add them. 
   + **Create a key-value tag** — Enter a key into the Key text box, and a value into the Value text box. Choose Save when you’re done entering your tags, or choose Cancel to not add them. 

   Key-value tags can only be added one at a time before saving. To add more than one key-value tag, repeat the previous steps. 

   For more information about key-only and key-value tags, see [Tags in Amazon Lightsail](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/amazon-lightsail-tags).   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/resource-creation-interface-1.png)

1. Create instance

   Choose **Create instance**.   
![Amazon Lightsail interface showing tagging options for a Windows Server instance, with fields for key-only and key-value tags, and a highlighted "Create instance" button.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/lightsaillong-interface-tagging-options.png)

### Step 3: Connect to your instance using the browser-based RDP client in Lightsail
<a name="connect-to-your-instance-using-the-browser-based-rdp-client-in-lightsail"></a>

1. Connect using RDP

   On the Instances tab of the [Lightsail home page](https://lightsail.aws.amazon.com/ls/), choose the RDP icon, or the ellipsis (⋮) icon next to the Windows Server 2019 instance you just created and choose **Connect**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/resource-creation-interface-2.png)

1. Use RDP to manage instance

   The browser-based RDP client window appears. You can use and manage your instance without configuring a third-party RDP client.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/resource-creation-interface-3.png)

### Step 4: Get administrator password for your Windows Server 2019 instance
<a name="get-administrator-password-for-your-windows-server-2019-instance"></a>

1. Choose the instance

   Choose the name of the Windows Server 2019 instance on the Instances tab of the Lightsail homepage.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/selection-interface-2.png)

1. Get the password

   Select the **Connect** tab, scroll down to the **Default login credentials** section of the page, and choose **Retrieve default password**. 
**Important**  
If you changed the administrator password after signing in to your Windows Server 2019 instance, then the administrator password displayed in the Lightsail console is no longer valid.   
![An Amazon Lightsail instance details page showing connection options, public and private IP addresses, and a button to retrieve the default password.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/lightsaillong-instance-details-page.png)

### Clean up resources
<a name="clean-up"></a>

1. Delete the instance

   On the **Instances** tab of the [Lightsail home page](https://lightsail.aws.amazon.com/), choose the ellipsis (⋮) icon next to the Windows Server instance you just created and choose **Delete**.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/interface-controls-buttons.png)

1. Confirm deletion

   Choose **Yes, delete** from the prompt.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/images/resource-creation-interface-4.png)

## Conclusion
<a name="conclusion"></a>

Congratulations\! You used Amazon Lightsail to spin up and configure a Windows instance. 

Amazon Lightsail is great for developers, web pros, and anyone looking to get started on AWS in a quick and cheap way. You can launch instances, databases, and SSD-based storage; transfer data; monitor your resources; and so much more in a managed way. 