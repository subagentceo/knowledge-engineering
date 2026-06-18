

# Launch and Configure a WordPress Instance with Amazon Lightsail
<a name="launch-a-wordpress-website"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 10 minutes  | 
| **Cost to complete** | [Free Tier](https://aws.amazon.com/free/?e=gs2020&p=build-a-web-app-intro) eligible  | 
| **Last updated** | August 4, 2022  | 

## Overview
<a name="overview"></a>

[Amazon Lightsail](https://aws.amazon.com/lightsail/?p=gsrc&c=ho_lww) is one of the easiest ways to get started with AWS. It offers virtual servers, storage, databases, and networking, plus a cost-effective, monthly plan. 

This tutorial shows you how to launch and configure a WordPress instance on Lightsail. It includes steps to connect to your instance by using SSH, sign in to your WordPress website, create a static IP and attach it to your instance, create a DNS zone, and map it to your instance.  

When you're done with this tutorial, you will have the fundamentals to get your WordPress website up and running on Amazon Lightsail. 

[Get started with Lightsail for free](https://portal.aws.amazon.com/billing/signup?client=lightsail&fid=1A3F6B376ECAC516-2C15C39C5ACECACB&redirect_url=https%3A%2F%2Flightsail.aws.amazon.com%2Fls%2Fsignup#/start). 

## Implementation
<a name="implementation"></a>

### Step 1: Create a WordPress instance in Lightsail
<a name="create-a-wordpress-instance-in-lightsail"></a>

Complete the following steps to get your WordPress instance up and running on Lightsail. 

**Note**  
For more information about creating an instance in Lightsail, see [Create an Amazon Lightsail instance](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/how-to-create-amazon-lightsail-instance-virtual-private-server-vps) in the Lightsail documentation.

1. Create an Amazon Lightsail account

   This tutorial is free tier eligible. 

   [Sign up for AWS](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html?client=lightsail&fid=3BE5EA8FA64943AD-0284EED1954F5F15) 

   Already have an account? [Sign-in](https://lightsail.aws.amazon.com/ls/) 

1. Create a Lightsail instance

   Sign in to the [Lightsail console](https://lightsail.aws.amazon.com/).  

   On the Instances tab of the Lightsail home page, choose **Create instance**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/resource-creation-interface.png)

1. Select a Region

   An AWS Region and Availability Zone is selected for you. Choose **Change AWS Region and Availability Zone** if you want to create your instance in another location.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/selection-interface.png)

1. Choose an image

   Choose your instance image. 
   + Choose **Linux/Unix** as the platform. 
   + Choose **WordPress** as the blueprint.   
![Amazon Lightsail interface showing options to select a platform (Linux/Unix or Microsoft Windows) and a blueprint, with WordPress highlighted under Apps + OS.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/lightsaillong-interface-options-select.png)

1. Select an instance plan

   Choose an instance plan.  

   A plan includes a machine configuration (RAM, SSD, vCPU) at a low, predictable cost, and data transfer allowance. You can try the $3.50 USD Lightsail plan without charge for three months (up to 750 hours). AWS credits the first three months to your account.   
![Amazon Lightsail pricing plans with highlighted $3.5 USD plan offering 512 MB memory, 1 vCPU, 20 GB SSD, and 1 TB transfer, free for the first 3 months.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/lightsaillong-pricing-plans-highlighted.png)

1. Create your instance

   Enter a name for your instance and choose **Create instance**.  

   Resource name guidelines: 
   + Must be unique within each AWS Region in your Lightsail account. 
   + Must contain 2 to 255 characters. 
   + Must start and end with an alphanumeric character or number. 
   + Can include alphanumeric characters, numbers, periods, dashes, and underscores.   
![Amazon Lightsail interface showing instance naming as "WordPress-Tutorial-1" with options for tagging and a highlighted "Create instance" button.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/lightsaillong-interface-instance-naming.png)

### Step 2: Connect to your instance via SSH and get the password for your WordPress website
<a name="connect-to-your-instance-via-ssh-and-get-the-password-for-your-wordpress-website"></a>

The default password to sign in to the administration dashboard of your WordPress website is stored on the instance. 

Complete the following steps to connect to your instance using the browser-based SSH client in the Lightsail console, and get the password for the administration dashboard. 

**Note**  
For more information, see [Obtain the default application username and password for Lightsail Bitnami](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/log-in-to-your-bitnami-application-running-on-amazon-lightsail).

1. Connect using SSH

   On the **Instances** tab of the [Lightsail home page](https://lightsail.aws.amazon.com/), choose the SSH quick-connect icon for your WordPress instance.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/interface.png)

1. Retrieve the password

   After the browser-based SSH client window opens, enter the following command to retrieve the default application password: 

   ```
   cat $HOME/bitnami_application_password
   ```

1. Note the password

   Make note of the password displayed on the screen. You use it later to sign in to the administration dashboard of your WordPress website.   
![Terminal screen showing Bitnami WordPress setup information, with a highlighted application password "kqw65VnL882z2".](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/terminal-screen-bitnami-wordpress-setup.png)

### Step 3: Sign in to the administration dashboard of your WordPress website
<a name="sign-in-to-the-administration-dashboard-of-your-wordpress-website"></a>

Now that you have the password for the administration dashboard of your WordPress website, you can sign in. In the administration dashboard, you can change your user password, install plugins, change the theme of your website, and more. 

Complete the following steps to sign in to the administration dashboard of your WordPress website. 

1. Log in to WordPress

   In a browser, go to: 

   ```
   http://PublicIpAddress/wp-login.php
   ```

   In the address, replace **PublicIpAddress** with the public IP address of your WordPress instance. You can get your instance's public IP address from the Lightsail console as shown in the image at the right.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/interface-interface-element.png)

1. Enter your credentials

   Log in to your instance.  
   + In the **Username** **or Email Address** box, enter **user.** 
   + In the **Password** box, enter the default password obtained earlier in this tutorial. 
   + Choose **Log in.**    
![WordPress login page with fields for username and password, a "Remember Me" checkbox, and a "Log In" button.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/wordpress-login-page-fields-username.png)

1. Manage WordPress

   You are now signed in to the administration dashboard of your WordPress website where you can perform administrative actions. For more information about administering your WordPress website, see the [WordPress Codex](https://codex.wordpress.org/) in the WordPress documentation.   
![WordPress dashboard with a welcome message for version 5.9, featuring two balloon graphics and options to explore blocks, themes, and styles.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/wordpress-dashboard-welcome-message.png)

### Step 4: Create a Lightsail static IP address and attach it to your WordPress instance
<a name="create-a-lightsail-static-ip-address-and-attach-it-to-your-wordpress-instance"></a>

The default public IP for your WordPress instance changes if you stop and start your instance. A static IP address, attached to an instance, stays the same even if you stop and start your instance. 

Complete the following steps to create a static IP address and attach it to your WordPress instance. 

**Note**  
For more information, see [Create a static IP and attach it to an instance in Amazon Lightsail](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/lightsail-create-static-ip).

1. Choose your instance

   On the **Instances** tab of the [Lightsail home page](https://lightsail.aws.amazon.com/), choose your running WordPress instance.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/selection-interface-1.png)

1. Create a static IP

   Choose the **Networking** tab, then choose **Create static IP.**   
![Amazon Lightsail networking page with options to create a static IP or a content distribution network (CDN) distribution.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/lightsaillong-networking-page-options.png)

1. Attach to an instance

   The static IP location is preselected based on the instance zone that you chose earlier. Select the created WordPress instance from the **Attach to an instance** dropdown.   
![Amazon Lightsail interface for creating a static IP address, showing the region set to Virginia (us-east-1) and an instance named "WordPress-Tutorial-1" selected for attachment.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/lightsaillong-interface-creating-static.png)

1. Name your static IP

   Name your static IP, then choose **Create**.    
![The Amazon Lightsail interface showing the process to attach a static IP to a WordPress instance, with a "Create" button highlighted.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/lightsaillong-interface-process-attach.png)

### Step 5: Create a Lightsail DNS zone and map a domain to your WordPress instance
<a name="create-a-lightsail-dns-zone-and-map-a-domain-to-your-wordpress-instance"></a>

Transfer management of your domain's DNS records to Lightsail. This allows you to more easily map a domain to your WordPress instance, and manage more of your website’s resources using the Lightsail console. 

Complete the following steps to create a Lightsail DNS zone and map a domain to your WordPress instance. 

**Note**  
For more information, see [Creating a DNS zone to manage your domain’s DNS records in Amazon Lightsail](https://lightsail.aws.amazon.com/ls/docs/en_us/articles/lightsail-how-to-create-dns-entry).

1. Create a DNS zone

   On the **Networking** tab of the [Lightsail home page](https://lightsail.aws.amazon.com/), choose **Create DNS zone**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/resource-creation-interface-1.png)

1. Add your domain

   Enter your domain, then choose **Create DNS zone.**    
![The Amazon Lightsail interface for creating a DNS zone, showing a form to enter a registered domain (example.com) and options for adding tags, with a highlighted "Create DNS zone" button at the bottom.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/lightsaillong-interface-creating-zone-form.png)

1. Note the name servers

   Make note of the name server address listed on the page.  

   You add these name server addresses to your domain name’s registrar to transfer management of your domain’s DNS records to Lightsail.   
![The Amazon Lightsail DNS management page for "example.com," showing no DNS records and a list of four name servers.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/lightsaillong-management-page-example-com.png)

1. Add an A record

   After management of your domain’s DNS records are transferred to Lightsail, add an A record to point the apex of your domain to your WordPress instance, as follows: 

   You add these name server addresses to your domain name’s registrar to transfer management of your domain’s DNS records to Lightsail. 

   In the DNS zone for your domain, choose **Add record**.   
![Amazon Lightsail DNS management interface showing no DNS records, an "Add record" button, and a list of name servers for configuration.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/lightsaillong-management-interface-records.png)

1. Configure DNS settings

   Continue adding the following details to complete pointing the apex of your domain to your WordPress instance: 

   1. In the **Subdomain** box, enter an @ symbol to map the apex of your domain (such as [example.com](http://example.com)) to your instance. The @ symbol explicitly symbolizes that you’re adding an apex record. It is not added as a subdomain. 

   1. In the **Resolves to** box, choose the static IP that you attached to the WordPress instance in the previous step of this tutorial. 

   1. Choose the green **save** icon. 

   Allow time for the change to propagate through the internet's DNS before your domain begins routing traffic to your WordPress instance.   
![Amazon Lightsail DNS management interface showing DNS records for example.com, with an A record resolving to IP address 34.234.129.251.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/lightsaillong-management-interface-records-1.png)

### Clean up resources
<a name="clean-up"></a>

1. Delete instance

   On the **Instances** tab of the [Lightsail home page](https://lightsail.aws.amazon.com/), choose the ellipsis (⋮) icon next to the WordPress instance you just created and choose **Delete**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/resource-creation-interface-2.png)

1. Confirm deletion

   Choose **Yes, delete** from the prompt.   
![A confirmation dialog in Amazon Lightsail asking, "Delete this instance?" with options to cancel or confirm deletion.](http://docs.aws.amazon.com/hands-on/latest/launch-a-wordpress-website/images/confirmation-dialog-lightsaillong-asking.png)

## Congratulations
<a name="congratulations"></a>

Congratulations\! You have used Amazon Lightsail to launch and deploy a WordPress instance. 

Amazon Lightsail is a great choice to develop, build, and deploy a variety of applications like WordPress, websites, and blog platforms. 