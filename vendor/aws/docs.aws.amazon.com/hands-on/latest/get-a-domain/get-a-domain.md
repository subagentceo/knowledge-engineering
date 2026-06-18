

# How to Register a Domain Name with Amazon Route 53
<a name="get-a-domain"></a>


|  |  | 
| --- |--- |
| **AWS experience** | Beginner  | 
| **Time to complete** | 10 minutes  | 
| **Cost to complete** | See [Cost implications:](#cost-implications)  | 
| **Requires** |  [See the AWS documentation website for more details](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/get-a-domain.html)  | 
| **Last updated** | November 8, 2022  | 

## Overview
<a name="overview"></a>

In this guide, you will register a new domain name for your web application. You will then connect that domain name through the Domain Name System (DNS) to a [running web application fronted by an Application Load Balancer (ALB).](https://catalog.us-east-1.prod.workshops.aws/workshops/3de93ad5-ebbe-4258-b977-b45cdfe661f1/en-US/introduction) 

## Cost implications:
<a name="cost-implications"></a>

There's an annual fee to register a domain. The fee can range from $9 to several hundred dollars depending on the top-level domain. This fee is not refundable. See the [Amazon Route 53 domain pricing](https://aws.amazon.com/route53/pricing/#Domain_Names) documentation for full details. 

When you register a domain, we automatically create a hosted zone that has the same name as the domain. You use the hosted zone to specify where you want Amazon Route 53 to route traffic for your domain. The fee for a hosted zone is $0.50 per month. You can delete the hosted zone if you want to avoid this charge. See the [Amazon Route 53 Hosted Zone pricing](https://aws.amazon.com/route53/pricing/#Hosted_Zones_and_Records) documentation for full details. 

## What you will accomplish
<a name="what-you-will-accomplish"></a>

In this guide, you will learn how to: 
+ Register a new domain using Amazon Route 53 in the AWS console.  
+ Update DNS records to point to an existing Application Load Balancer. 

## Prerequisites
<a name="prerequisites"></a>

Before starting this guide, you will need: 
+ An AWS account: If you don't already have one, follow the [Setting Up Your AWS Environment](https://docs.aws.amazon.com/hands-on/latest/setup-environment/) getting started guide for a quick overview. 

## Implementation
<a name="implementation"></a>

### Step 1: Register a domain name
<a name="register-a-domain-name"></a>

1. Open the AWS Management Console

   Open a browser and navigate to the [AWS Management Console](https://console.aws.amazon.com/). 

   Once you have logged in, ensure you have selected your desired Region in the upper right hand corner based on your infrastructure requirements. 

   **Pro tip:** You can learn about the console through the [Getting Started with the AWS Management Console](https://docs.aws.amazon.com/hands-on/latest/getting-started-with-aws-management-console/) tutorial.   
![The navigation menu interface for the AWS Management console.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/navigation-menu-interface-management.png)

1. Open Route 53

   Enter **Route 53** in the search bar and select **Route 53** to open the service console.   
![The navigation interface.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/navigation-interface-1.png)

1. Choose Register domain

   Choose the **Register domain** button. 

   **Dive deeper:** Read the [documentation for registering a new domain](https://docs.aws.amazon.com/Route 53/latest/DeveloperGuide/domain-register.html).   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/selection-interface.png)

1. Enter a domain name

   Enter a desired domain name in the text box and choose an extension such as .com in the dropdown list and choose the **Check** button. 

   Choose the **Add to cart** button next to the domain that you want to purchase. 

   Choose the **Continue** button at the bottom of the page. 

   If the domain you chose is not available, choose one of the related domain suggestions or try again with a different domain name.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/interface-controls-buttons.png)

1. Enter your contact information

   Enter the registrant contact detail for your domain. 

   Choose the **Continue** button on the bottom of the page.   
![The interface controls and buttons.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/interface-controls-buttons-1.png)

1. Complete your order

   Verify your contact details. 

   Choose either **Enable** or **Disable** in the auto renewal section. 

   Select the check box after reading and agreeing to the terms and conditions. 

   Choose **Complete Order**. 

   You will receive an email when your domain registration has been approved. To determine the current status of your request, see [Viewing the status of a domain registration](https://docs.aws.amazon.com/Route 53/latest/DeveloperGuide/domain-view-status.html).   
![The configuration settings interface.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/configuration-settings-interface.png)

### Step 2: Configure DNS
<a name="configure-dns"></a>

1. Open Route 53

   After domain registration is complete, return to the AWS console. 

   Enter **Route 53** in the search bar and select **Route 53** to open the service console.   
![The navigation interface.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/navigation-interface-1.png)

1. Choose hosted zones

   Choose **Hosted zones** from the left navigation pane.   
![The AWS Route 53 dashboard showing DNS management, traffic management, domain registration, and routing control options, with one hosted zone and zero policy records, readiness checks, and control panels.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/dashboard-management-traffic-domain.png)

1. Select your hosted zone

   Select the hosted zone with your domain name that Route 53 created for you as part of the domain registration.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/selection-interface-1.png)

1. Create a record

   You can now create DNS records for your domain. In this guide, we will create a simple A record type. Choose the Create record button to get started. 

   **Dive deeper:** Read the [Route 53 documentation](https://docs.aws.amazon.com/route53/) for a full overview of the various records you can create.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/resource-creation-interface.png)

1. Switch to quick create

   Choose **Switch to quick create** if you are currently in the wizard view.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/resource-creation-interface-1.png)

1. Configure IPv4 record

   To allow clients to connect to your ALB using IPv4, enter your A record information and ensure **A** is selected in the **Record type** field. For this guide, we will enter **www** for **Record name**. 
   + Turn on **Alias**. 
   + Select **Alias to Application and Classic Load Balancer** in the **Choose an end point** dropdown menu. 
   + In the **Choose Region** dropdown menu, select the Region in which your ALB is located. 
   + In the **Choose load balancer** dropdown menu, select the existing ALB that you want to receive traffic from this domain. 
   + Choose the **Create records** button once you have finished. 

   **Pro tip:** You can add multiple record types at one time by using the **Add another record** button before finalizing. 

   Your domain is now ready to use with IPv4. Open a browser and enter http://www.<your domain name>. (Make sure you have your application load balancer and target EC2 instance properly set up as a web server before browsing to your domain URL.)   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/resource-creation-interface-2.png)

1. Configure IPv6 record

   To allow clients to connect to your ALB with IPv6, enter in your AAAA record information and ensure **AAAA** is selected in the Record type field. For this guide, we will enter **www** for **Record name**. 
   + Turn on **Alias**. 
   + Select **Alias to Application and Classic Load Balancer** in the **Choose an end point** dropdown menu. 
   + In the **Choose Region** dropdown menu, select the region in which your ALB is located. 
   + In the **Choose load balancer** dropdown menu, select the existing ALB that you want to receive traffic from this domain. 
   + Choose the **Create records** button once you have finished. 

   **Pro tip:** You can add multiple record types at one time by using the **Add another record** button before finalizing. 

   Your domain is now ready to use with IPv6. Open a browser and enter http://www.<your domain name>. (Please make sure you have your ALB and target EC2 instance properly set up as a web server before browsing to your domain URL).   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/get-a-domain/images/resource-creation-interface-3.png)

## Conclusion
<a name="conclusion"></a>

Congratulations\! You have finished the **How to Register a Domain Name with Amazon Route** **53 **how-to guide.  

In this guide, you learned how to provision a public IP address, register a new domain name, and configure DNS. 