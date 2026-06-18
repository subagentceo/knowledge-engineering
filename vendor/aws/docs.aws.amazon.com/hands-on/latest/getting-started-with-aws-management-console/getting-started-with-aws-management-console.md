

# Getting Started with the AWS Management Console
<a name="getting-started-with-aws-management-console"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 15 minutes  | 
| **Cost to complete** | [Free Tier](https://aws.amazon.com/free/) eligible  | 
| **Requires** | [See the AWS documentation website for more details](http://docs.aws.amazon.com/hands-on/latest/getting-started-with-aws-management-console/getting-started-with-aws-management-console.html)Accounts created within the past 24 hours might not yet have access to the services required for this tutorial.  | 
| **Last updated** | March 12, 2022  | 

## Overview
<a name="overview"></a>

The AWS Management Console is a web application that comprises a broad collection of service consoles for managing AWS resources. When you first sign in, you see the Console Home page. The home page provides access to each service console and offers a single place to access the information you need to perform your AWS related tasks. You can also customize the Console Home page by adding, removing, and rearranging widgets, such as recently visited, AWS Health, Trusted Advisor, and more. 

The individual service consoles, on the other hand, offer a wide range of tools for cloud computing, as well as information about your account and about your billing. 

## What You Will Learn
<a name="what-you-will-learn"></a>

In this guide, you will learn: 
+ The different sections of the Console Home 
+ How to access account information 
+ How to switch AWS Regions 
+ How to work with widgets on the Console Home 

## Prerequisites
<a name="prerequisites"></a>

Before starting this guide, you will need: 
+ An AWS account: if you don't already have one, follow the [Setting Up Your Environment](https://docs.aws.amazon.com/hands-on/latest/setup-environment/) getting started guide for a quick overview. 

## Implementation
<a name="implementation"></a>

### Console Home
<a name="console-home"></a>

After signing up for a new AWS account and logging in, you will see the console dashboard. This is the starting point for interacting with the various AWS services and other important console components. The dashboard consists of a navigation bar at the top and a number of widgets in the main body of the page, which you can configure and rearrange. AWS is developing more widgets so you can further customize your console experience. 

We will start by taking a look at the navigation bar at the top. In the image to the right, we have highlighted five controls within the navigation bar:  

1. Account information 

1. Region selector 

1. Service selector 

1. Search box 

1. AWS CloudShell 

![The navigation bar showing account information, region selector, service selector, search box, and aws cloudshell.](http://docs.aws.amazon.com/hands-on/latest/getting-started-with-aws-management-console/images/navigation-bar-account-information-region.png)


### AWS Account Information
<a name="aws-account-information"></a>

The first highlighted menu contains information and links for your account. It displays the AWS Account ID, and the current user logged in to the console, along with links to navigate to the following pages: 
+ **Account** - Details about your account, including the address, contact information, billing settings, and more. For a full list of topics that describe how to manage your account, see [Managing your AWS account](https://docs.aws.amazon.com/accounts/latest/reference/managing-accounts.html) in the **AWS Account Management Reference Guide**. 
+ **Organization **- AWS Organizations is an account management service that enables you to consolidate multiple AWS accounts into an organization that you create and centrally manage. For more details, see the [AWS Organizations User Guide](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html). 
+ **Service Quotas** - Quotas, also referred to as limits in AWS services, are the maximum values for the resources, actions, and items in your AWS account. When a new account is created, there are default values, such as assigning five [Elastic IP addresses](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html). These limits can be increased by logging a [support ticket](https://docs.aws.amazon.com/servicequotas/latest/userguide/request-quota-increase.html). For more details, please see the [quotas documentation](https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html). 
+ **Billing Dashboard **- You can use the dashboard page of the AWS Billing and Cost Management console to gain a general view of your AWS spending. For more details, see [Using the AWS Billing and Cost Management console dashboard](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/view-billing-dashboard.html) in the **AWS Billing and Cost Management User Guide**. 
+ **Security Credentials **- This link will take you to your AWS IAM user's page in the IAM part of the console where you can change your password, add 2 factor authentication, generate AWS API keys, and more. For more details, see the [AWS Identity and Access Management User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html). 
+ **Settings** - This link will take you to General Settings configuration page. From here you can manage console global settings such as default language and region as well preferences to optimize your console display experience. 

![The region selection interface.](http://docs.aws.amazon.com/hands-on/latest/getting-started-with-aws-management-console/images/region-selection-interface.png)


### AWS Regions
<a name="aws-regions"></a>

The second highlighted menu shows the currently selected AWS Region. AWS global infrastructure is grouped into [Regions](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/), and each service is hosted in a Region, unless it is a global service, such as AWS IAM or Amazon Route 53. The menu will display the currently selected Region, or "Global" when you have selected a global service. The text consists of the Region group, such as "US East"; region name, such as "N. Virginia"; and the Region string used by the AWS CLI, SDK, and other services, such as "us-east-1". 

When you click on the currently selected Region, a dropdown will appear with all the available Regions, and you can switch the console to a different Region by clicking on one in the list. 

Use the scroll bar on the right-hand side to see the full list of available options. 

![The navigation menu interface.](http://docs.aws.amazon.com/hands-on/latest/getting-started-with-aws-management-console/images/navigation-menu-interface.png)


### AWS Service Selector
<a name="aws-service-selector"></a>

The third highlighted menu is the AWS service selector. You can use this to navigate between services grouped by top-level categories, such as Compute, which includes Amazon EC2, along with other services like AWS Elastic Beanstalk and Amazon Lightsail. This is a great way to explore the various services by category, especially if you are new to AWS.  

You can also mark services as favorites by selecting the star next to their names, which will pin them to the navigation bar. This can be done anywhere you see the star, including the search box. 

![The service selection interface.](http://docs.aws.amazon.com/hands-on/latest/getting-started-with-aws-management-console/images/service-selection-interface.png)


### AWS Search
<a name="aws-search"></a>

The fourth highlighted item is the search box. When you enter text into the box, the underlying search engine searches across a number of different locations to match the text that you entered. It will return matches in eight sections: 
+ **Services**: List of AWS services 
+ **Features**: List of features of AWS services 
+ **Blogs**: Posts from the AWS blog 
+ **Documentation**: AWS Documentation 
+ **Knowledge Articles**: AWS Support Knowledge Center 
+ **Tutorials**: Hands-on guides from the AWS Getting Started Resource Center 
+ **Events**: AWS hosted events that are upcoming, or available on-demand 
+ **Marketplace**: AWS Marketplace offerings that you can deploy in your AWS account 

The Search is a quick way to find and navigate to services and resources that you are looking for. If the search engine is unable to find a match within one of these sections, the section will not be included in the list. You can add services to the navigation bar by selecting the star to favorite them. 

![The navigation menu interface.](http://docs.aws.amazon.com/hands-on/latest/getting-started-with-aws-management-console/images/navigation-menu-interface-1.png)


### AWS CloudShell
<a name="aws-cloudshell"></a>

The fifth highlighted item is the AWS CloudShell icon. By selecting this icon, you will launch a browser-based shell environment that is pre-authenticated with your console credentials. Use this to execute AWS CLI commands or scripts using the AWS CDK from your browser. If you add any files to CloudShell (up to the 1GB limit), it will persist the files between sessions. 

CloudShell is a useful tool for securely interacting with your AWS account, and is Region specific, so any files that you upload are specific to that Region. The current selected Region is displayed in orange above the terminal. 

![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/getting-started-with-aws-management-console/images/interface-interface-element.png)


### AWS Dashboard Widgets
<a name="aws-dashboard-widgets"></a>

The dashboard also contains a number of widgets to help you get started. We will discuss the widgets that appear by default, but you can move and resize these, or add different ones from the "Actions" dropdown. Three of the widgets provide you with static links to learn how to build a solution or to explore AWS (Welcome to AWS, Build a solution, and Explore AWS). The other five are dynamic and provide important information about AWS services, your AWS costs and usage, and best practices: 
+ **AWS Health**: information on events that might affect your AWS infrastructure and account 
+ **Cost and usage**: an overview of service costs, with a breakdown by AWS service 
+ **Favorites**: a list of your favorite AWS services 
+ **Recently visited**: a list of top recently visited services 
+ **Trusted Advisor**: recommendations to follow AWS best practices 

![The navigation bar showing cost and usage: an overview of service costs, and with a breakdown by aws service,...](http://docs.aws.amazon.com/hands-on/latest/getting-started-with-aws-management-console/images/navigation-bar-cost-usage-overview-service.png)


## Conclusion
<a name="conclusion"></a>

Congratulations\! You have finished the **Getting Started with the AWS Management Console** getting started guide.  

In this guide, you learned about the various parts of the AWS Management Console dashboard, and how to use the dashboard to navigate to services and account and billing information; search for services, features, articles, and guides; and view your billing dashboard. 

To gain experience using the console, we recommend the following hands-on guides: 
+ [Host a Static Website](https://docs.aws.amazon.com/hands-on/latest/host-static-website/) 
+ [Launch a Windows Virtual Machine in Amazon Lightsail](https://docs.aws.amazon.com/hands-on/latest/launch-windows-vm/) 