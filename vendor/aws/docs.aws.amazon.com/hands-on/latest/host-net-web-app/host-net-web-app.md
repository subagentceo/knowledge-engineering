

# Publish a .NET Application to a Windows Server 2022 Instance in Amazon Lightsail
<a name="host-net-web-app"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Minimum time to complete** | 60 minutes  | 
| **Cost to complete** | [Free Tier](https://free/) eligible  | 
| **Services used** | [Amazon Lightsail](https://lightsail/)  | 
| **Last updated** | April 28, 2023  | 

## Overview
<a name="overview"></a>

[Amazon Lightsail](https://aws.amazon.com/free/compute/lightsail/) is one of the easiest ways to get started with AWS. lt includes everything you need to launch your project quickly for a low, predictable price. 

This tutorial shows you how to publish a .NET application on a Windows Server 2022 instance in Amazon Lightsail. 

[Get started with Lightsail for free](https://portal.aws.amazon.com/billing/signup?client=lightsail&fid=1A3F6B376ECAC516-2C15C39C5ACECACB&redirect_url=https%3A%2F%2Flightsail.aws.amazon.com%2Fls%2Fsignup#/start) 

## What you will accomplish
<a name="what-you-will-accomplish"></a>

In this tutorial, you will: 
+ Install the required server roles and features 
+ Configure Visual Studio 2022 Community edition to connect to your instance 
+ Publish the ASP.NET core web application template to your instance 

## Prerequisites
<a name="prerequisites"></a>

Before starting this tutorial, you will need: 
+ An AWS account: If you don't already have an account, follow the [Setting Up Your AWS Environment](https://docs.aws.amazon.com/hands-on/latest/setup-environment/) guide for a quick overview. 

## Implementation
<a name="implementation"></a>

### Step 1: Create an Amazon Lightsail account
<a name="create-an-amazon-lightsail-account"></a>
+ This tutorial is free tier eligible with [Amazon Lightsail](https://lightsail/), but costs may apply. 

  [Sign up for AWS](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html?client=lightsail&fid=3BE5EA8FA64943AD-0284EED1954F5F15) 

  Already have an account? [Sign in](https://lightsail.aws.amazon.com/ls/) 

### Step 2: Create a Windows Server 2022 instance in Amazon Lightsail
<a name="create-a-windows-server-2022-instance-in-amazon-lightsail"></a>
+ This tutorial requires that you create a Windows Server 2022 instance in Lightsail. To do so, follow the steps in the [Launch a Windows Virtual Machine with Amazon Lightsail](https://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/launch-windows-vm.html) tutorial, but make sure to select **Windows Server 2022** when choosing the operating system-only instance image. 

### Step 3: Install the required roles and features on your instance
<a name="install-the-required-roles-and-features-on-your-instance"></a>

You can connect to your Windows Server 2022 instance using the browser-based RDP client in the Lightsail console. After you’re connected, you can install the required server roles and features that will allow you to connect to your instance through Visual Studio and run .NET applications. 

1. Connect to your instance

   On the **Instances** tab of the [Lightsail home page](https://lightsail.aws.amazon.com/), choose the **RDP quick-connect icon** for your Windows Server 2022 instance. 

1. Open Server Manager

   After the browser-based RDP client window opens, choose the Windows icon and open **Server Manager**. 

1. Turn off IE Enhanced Security Configuration

   Choose **Local Server** in the left navigation menu, then choose **On** next to **IE Enhanced Security Configuration** (choosing **On** turns it **Off**). 
**Note**  
Turning off IE Enhanced Security Configuration will allow you to download resources later in this tutorial.  
![The navigation menu interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/navigation-menu-interface.png)

1. Turn IE Enhanced Security Configuration off for administrators

   In the configuration prompt, choose to turn off the feature only for administrators, and then choose **OK**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/interface.png)

1. Add roles and features

   In **Server Manager**, choose **Dashboard** in the left navigation menu, then choose **Add roles and features**.   
![Server Manager dashboard interface showing options to configure a local server, add roles and features, and manage server groups.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/server-manager-dashboard-interface-options.png)

1. Continue through the wizard

   Choose **Next** in the **Add Roles and Features Wizard**.   
![The configuration settings interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/configuration-settings-interface.png)

1. Choose an installation type

   Choose **Role-based or feature-based installation** in the **Select installation type** screen, and choose **Next**.   
![Windows Server Add Roles and Features Wizard displaying the 'Select installation type' step with options for role-based or feature-based installation and remote desktop services installation.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/windows-server-roles-features-wizard.png)

1. Select a destination server

   Choose **Next** in the **Select destination server** screen.   
![Add Roles and Features Wizard showing server selection with one server listed, running Microsoft Windows Server 2022 Datacenter.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/roles-features-wizard-server-selection-one.png)

1. Select a server role

   Choose **Web Server (IIS)** in the **Select server roles** screen. Choose **Add features** when you are asked if you would like to add the required features. Choose **Next**.   
![Windows Server Add Roles and Features Wizard showing 'Web Server (IIS)' selected under server roles with a description on the right.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/windows-server-roles-features-wizard-1.png)

1. Select features

   Choose the features highlighted in this screenshot in the **Select features** screen, and then choose **Next**.   
![The "Add Roles and Features Wizard" in Windows Server, showing .NET Framework 4.8 features selected, including ASP.NET 4.8 and WCF Services.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/roles-features-wizard-windows-server-net.png)

1. Review the information about web server roles

   Choose **Next** in the **Web Server Role (IIS)** screen.   
![The Add Roles and Features Wizard in Windows Server, showing the Web Server Role (IIS) description and options to proceed with installation.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/roles-features-wizard-windows-server-role.png)

1. Select web server services

   Choose the role services highlighted in this screenshot under the **Web Server** service.   
![The "Add Roles and Features Wizard" in Windows Server, showing selected role services for Web Server (IIS), including "WebDAV Publishing" highlighted.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/roles-features-wizard-windows-server.png)

1. Select performance and security services

   Choose the role services highlighted in this screenshot under the **Performance** and **Security** services.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/selection-interface.png)

1. Select FTP server and management tools services

   Choose the role services highlighted in this screenshot under the **FTP Server** and **Management Tools** services.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/selection-interface-1.png)

1. Select application development services

   Choose the role services highlighted in this screenshot under the **Application Development** service.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/selection-interface-2.png)

1. Confirm selections

   Choose **Next** after you confirm that you selected all of the correct role services highlighted in the previous steps. 

1. Restart the destination server

   Choose **Restart the destination server automatically if required**, and then choose **Install** in the **Confirm installation selections** screen. 

   The roles and features will require a few minutes to download and install.   
![Windows Server Add Roles and Features Wizard showing confirmation of selected features, including .NET Framework 4.8 and Web Server (IIS), with the Install button highlighted.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/windows-server-roles-features-wizard-2.png)

### Step 4: Install Web Deploy on your instance
<a name="install-web-deploy-on-your-instance"></a>

You must install the Web Deploy 4.0 extension on your Windows Server 2022 instance to enable deployment of web applications and websites to your server. 

1. Download Web Deploy

   On your Windows Server 2022 instance, open Internet Explorer and [download Web Deploy 4.0](https://download.visualstudio.microsoft.com/download/pr/e1828da1-907a-46fe-a3cf-f3b9ea1c485c/035860f3c0d2bab0458e634685648385/webdeploy_amd64_en-us.msi). 

1. Open the file

   After the download completes, choose Open file to start the installer.   
![The navigation interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/navigation-interface.png)

1. Start installation

   Choose **Next** on the initial Setup Wizard screen.   
![Microsoft Web Deploy 4.0 Setup Wizard screen with options to proceed or cancel installation.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/microsoft-setup-wizard-screen-options.png)

1. Accept terms

   Accept the terms in the license agreement, and choose **Next** in the **Microsoft Web Deploy 4.0 Setup** screen.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/interface-1.png)

1. Choose a setup type

   Choose **Complete** on the **Choose Setup Type** screen.   
![Microsoft Web Deploy 4.0 Setup window showing setup type options: Typical, Custom, and Complete, with 'Complete' selected.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/microsoft-setup-window-type-options.png)

1. Install Web Deploy

   Choose **Install** to start the installation, then choose **Finish** to close the installer when the installation is complete.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/interface-interface-element.png)

### Step 5: Install ASP.NET Core 6.0 Hosting Bundle
<a name="install-asp.net-core-6.0-hosting-bundle"></a>

Because we’re going to publish an ASP.NET Core Web App to the Windows Server 2022 instance, you need to install the ASP.NET Core 6.0 Hosting Bundle. 

1. Download Hosting Bundle

   On your Windows Server 2022 instance, open Internet Explorer and [download ASP.NET Core 6.0 Hosting Bundle](https://dotnet.microsoft.com/en-us/download/dotnet/6.0).   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/interface-2.png)

1. Open the file

   After the download completes, choose **Open file**.   
![Browser downloads panel showing a file named 'dotnet-hosting-6.0.15-win.exe' with a cursor hovering over the 'Open file' option.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/browser-downloads-panel-file-named-dotnet.png)

1. Accept the terms

   Accept the terms in the license agreement, and choose **Install** in the **Windows Server Hosting Setup** screen.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/interface-3.png)

1. Verify installation

   After the installation completes, choose **Close**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/resource-creation-interface.png)

### Step 6: Create an ASP.NET Core Web Application in Visual Studio 2022
<a name="create-an-asp.net-core-web-application-in-visual-studio-2022"></a>

In these steps, you will create an application using the ASP.NET Core Web App template in Visual Studio 2022 Community edition. To download and install Visual Studio 2022 Community edition, see the [Visual Studio](https://visualstudio.microsoft.com/) website. 

1. Open Visual Studio

   Open Visual Studio 2022 Community edition on your local computer (not the Windows Server 2022 instance). 

1. Create a project

   Choose **Create a new project**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/resource-creation-interface-1.png)

1. Choose a language

   Choose **C\#** in the language dropdown menu. Choose **ASP.NET Core Web App** in the list of available projects, and choose **Next**.   
![The navigation menu interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/navigation-menu-interface-1.png)

1. Configure project

   Choose a **Project name**, and choose **Next**.   
![The configuration settings interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/configuration-settings-interface-1.png)

1. Create the project

   On the **Additional information** screen, make sure the **Framework** selected is **.NET 6.0**, and choose **Create**. 

   After this step, you will have an ASP.NET core website project template that you can edit in Visual Studio. When you are done editing your project, continue to the next section to publish your project to your Windows Server 2022 instance.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/resource-creation-interface-2.png)

### Step 7: Publish your .NET application to your Windows Server 2022 instance
<a name="publish-your-.net-application-to-your-windows-server-2022-instance"></a>

In these steps, you will configure Visual Studio to connect to your Windows Server 2022 instance so that you can publish your .NET core project to your server. 

1. Add a firewall rule

   For publishing to work from a remote network, you need to add a firewall rule to your Windows Server 2022 instance. Open your [Lightsail console](https://lightsail.aws.amazon.com/ls/webapp/home/instances) and open the **Networking** tab of your instance. Choose **\+ Add rule** and enter **8172** as the port, then choose **Create**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/resource-creation-interface-3.png)

1. Choose a publishing target

   Choose **Web Server (IIS)** and choose **Next** in the **Publish** screen.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/selection-interface-3.png)

1. Choose Web Deploy

   Select **Web Deploy** and choose **Next**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/selection-interface-4.png)

1. Get the public IP

   Get the public IP address of your Windows Server 2022 instance from the [Lightsail console](https://lightsail.aws.amazon.com/ls/webapp/home/instances).   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/interface-4.png)

1. Get the public DNS name

   Perform a reverse DNS lookup by running **nslookup PublicIpAddress** in PowerShell to get the public DNS name for your Windows Server 2022 instance’s IP address; this **PublicHostname** will be used in the next step as the server name.   
![Windows PowerShell window displaying server and address details, with the hostname "ec2-44-201-34-227.compute-1.amazonaws.com" highlighted in red.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/windows-powershell-window-displaying.png)

1. Configure web server connection

   On the next screen, enter the following information: 

   Enter **PublicHostname** in the **Server** text box. Replace **PublicHostname** with the public DNS name of your Windows Server 2022 instance retrieved in the previous step. 

   Enter **Default Web Site** in the **Site name** text box. 
   + This is name of the default website automatically configured when you installed Internet Information Services (IIS) on your Windows Server 2022 instance. 

   Enter **http://PublicHostname** in the **Destination URL** text box. Replace **PublicHostname** with the public DNS name of your Windows Server 2022 instance retrieved in the previous step.   
![The service configuration interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/service-configuration-interface.png)

1. Enter credentials

   Enter **Administrator** in the **User name** text box. This is the default administrator user name for your Windows Server 2022 instance. 

   Enter the administrator password in the **Password** text box. 

   You can get the administrator password by going to the instance’s management page in the Lightsail console, and choosing **Retrieve default password** under the **Connect** tab.   
![Screen displaying a default password for an instance with a button labeled 'Okay, got it!'.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/screen-displaying-default-password.png)

1. Validate the connection

   Choose **Validate Connection** to test the connection. You might get a certificate error like the one in the screenshot when connecting the first time. This is because the server uses a default certificate and you can safely accept it if the hostname displayed matches the one you intended to connect to. 

   A checkmark icon will appear if the validation is successful. If the validation is unsuccessful, confirm that you entered the correct information into the form (confirm the administrator password and the IP address).   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/interface-5.png)

1. Monitor profile creation

   Choose **Finish**, then choose **Close** when the **Publish profile creation progress** completes successfully.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/interface-6.png)

1. Publish your project

   Choose **Publish** in Visual Studio when you are ready to publish your project to your server.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/interface-7.png)

1. Check the output

   The **Output** in Visual Studio will show a successful message if your project was successfully published to your server.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/interface-8.png)

1. Confirm the project creation

   Browse to the **PublicHostname** of your Windows Server 2022 instance to confirm that the project was successfully published. 

   Your project was successfully published if you see a page similar to the following screenshot.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/interface-9.png)

### Clean up resources
<a name="clean-up-resources"></a>

In the following steps, you clean up the resources you created in this tutorial. It is a best practice to delete instances and resources that you are no longer using so that you are not continually charged for them. 

1. Delete the instance

   On the **Instances** tab of the [Lightsail home page](https://lightsail.aws.amazon.com/), choose the ellipsis (⋮) icon next to the Windows Server instance you just created and choose **Delete**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/resource-creation-interface-4.png)

1. Confirm deletion

   Choose **Yes, delete** from the prompt.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/host-net-web-app/images/resource-creation-interface-5.png)

## Conclusion
<a name="conclusion"></a>

Congratulations\! You have published a .NET core web application to your Windows Server 2022 instance in Amazon Lightsail. 

Amazon Lightsail is a great choice to develop, build, and deploy a variety of applications like content management systems, websites, and other platforms. 