

# Request a Quota Increase with Service Quotas
<a name="request-service-quota-increase"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 10 minutes  | 
| **Cost to complete** | [Free Tier](https://free/) eligible  | 
| **Services used** | [Service Quotas](https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html)  | 
| **Last updated** | February 3, 2023  | 

## Overview
<a name="overview"></a>

[Service Quotas](https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html) is an AWS service that helps you manage your quotas, formerly referred to as limits, for over 100 AWS services, from one location. In addition to viewing quota values, you can also request a quota increase from the [Service Quotas console](https://console.aws.amazon.com/servicequotas/).   

This tutorial shows you how to view and manage the service quotas for your AWS account. Your account has default quotas for each AWS service. Unless otherwise noted, each quota is specific to an [AWS Region](https://docs.aws.amazon.com/servicequotas/latest/userguide/reference_limits.html). You can request increases for some quotas; other quotas cannot be adjusted. 

When you're done with this tutorial, you will understand how to view and manage service quotas for your AWS account. 

[Get started with managing Service Quotas for free.](https://console.aws.amazon.com/servicequotas/) 

## What you'll accomplish
<a name="what-you-will-accomplish"></a>
+ After completing this tutorial, you will understand how to view and manage service quotas for your AWS account. 

## Prerequisites
<a name="prerequisites"></a>

Before starting this guide, you will need: 
+ An AWS account: If you don't already have an account, follow the [Setting Up Your AWS Environment](https://docs.aws.amazon.com/hands-on/latest/setup-environment/setup-environment.html) guide for a quick overview. 

## Implementation
<a name="implementation"></a>

### Step 1: Access and customize the Service Quotas dashboard
<a name="access-and-customize-the-service-quotas-dashboard"></a>

Complete the following steps to access the Service Quotas dashboard and customize the cards that appear on the dashboard. 

**Note**  
For more information, see [Getting started with Service Quotas](https://docs.aws.amazon.com/servicequotas/latest/userguide/getting-started.html) in the Service Quotas documentation.

1. Open the Service Quotas dashboard

   Navigate to the [AWS Management Console](https://console.aws.amazon.com/console/home). Enter Service quotas in the search bar and select the Service Quotas service.   
![The service selection interface.](http://docs.aws.amazon.com/hands-on/latest/request-service-quota-increase/images/service-selection-interface.png)

1. Review quotas for a service

   On the Service Quotas dashboard, choose **Modify dashboard cards**.   
![The AWS dashboard interface.](http://docs.aws.amazon.com/hands-on/latest/request-service-quota-increase/images/dashboard-interface.png)

1. Select services to display

   In the **Dashboard services preference** box, customize the AWS services you want to include as cards on the dashboard: 
   + Choose **Remove** to remove a service. 
   + In the search box, enter a service name to add the service. 
**Note**  
Choose up to nine services you want to display on your dashboard.

   Choose **Save**.   
![The navigation bar showing choose remove to remove a service., and in the search box, enter a service name to...](http://docs.aws.amazon.com/hands-on/latest/request-service-quota-increase/images/navigation-bar-choose-remove-service.png)

### Step 2: Review quotas for a service
<a name="review-quotas-for-a-service"></a>

Complete the following steps to review your current quotas across various AWS services. 

**Note**  
For more information, see [Viewing service quotas](https://docs.aws.amazon.com/servicequotas/latest/userguide/gs-request-quota.html) in the Service Quotas documentation.

1. Find and choose a service

   In the Service Quotas navigation pane, choose **AWS services**.   
![The service selection interface.](http://docs.aws.amazon.com/hands-on/latest/request-service-quota-increase/images/service-selection-interface-1.png)

1. Review quota values and usage

   Select a service from the list, or enter the name of the service in the search field.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/request-service-quota-increase/images/interface-interface-element.png)

1. Access quota metadata

   For each quota, the console displays its name, applied value, default value, and whether the quota is adjustable. If the applied value is not available, the console displays a dash.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/request-service-quota-increase/images/interface.png)