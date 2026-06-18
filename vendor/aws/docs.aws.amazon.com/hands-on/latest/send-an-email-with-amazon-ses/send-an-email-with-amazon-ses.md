

# Send an Email with Amazon SES
<a name="send-an-email-with-amazon-ses"></a>


|  |  | 
| --- |--- |
| **AWS Experience** | Beginner  | 
| **Time to complete** | 10 minutes  | 
| **Cost to complete** | As part of AWS Free Tier, SES offers a flexible free tier which enables you to try the SES email features you need, free of charge.  | 
| **Get help** | [Troubleshooting Amazon SES issues](https://docs.aws.amazon.com/ses/latest/dg/troubleshoot.html)  | 
| **Last updated** | May 30, 2024  | 

## Overview
<a name="overview"></a>

Amazon Simple Email Service (SES) is a cost-effective email service built on the reliable and scalable infrastructure that [Amazon.com](http://Amazon.com) developed to serve its own customer base. With Amazon SES, you can send transactional email, marketing messages, or any other type of high-quality content to your customers. 

## What you will accomplish
<a name="what-you-will-accomplish"></a>

In this tutorial, you will: 
+ Verify your email address 
+ Verify your domain 
+ Send an email using the Amazon SES console 

## Prerequisites
<a name="prerequisites"></a>

Before starting this tutorial, you will need: 
+ **An AWS account:** If you don't already have one, follow the [Setting Up Your AWS Environment](https://docs.aws.amazon.com/hands-on/latest/setup-environment/) tutorial. 

## Implementation
<a name="implementation"></a>

### Step 1: Verify your email address
<a name="verify-your-email-address"></a>

Before you can send an email using Amazon SES, you must prove that you own the sender's email address by [verifying](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-addresses-and-domains.html) the address (or the domain of the address) with Amazon SES. If you are a new user of Amazon SES, you must also verify the recipient's address, because your account is in a test environment called the Amazon SES **sandbox**. You can later [apply](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html) to move out of the sandbox and lift the recipient address limitation.  

In this tutorial, you will send an email to and from the same email address. 

1. Open the Amazon SES console

   Navigate to the **Amazon SES console**, at [https://console.aws.amazon.com/ses](https://console.aws.amazon.com/ses). 

   On the Amazon SES home page, choose **Get started**.    
![The navigation menu interface for the Amazon SES console.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/navigation-menu-interface-console.png)

1. Enter an email address

   Enter your **email address**, and choose **Next**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/interface.png)

1. Enter a sending domain

   Enter your **sending domain**, and choose **Next**. 
   + If your domain is **www.example.com**, enter **example.com** as your domain. Don't include the "www." part, because the domain verification process won't succeed if you do. 
**Note**  
For your initial domain, it is recommended that you verify a valid domain that displays identifiable information about your organization to establish your reputation with AWS as a trusted email sender.  
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/interface-interface-element.png)

1. Keep MAIL FROM defaults

   Leave default selections for **Add MAIL FROM domain - **optional****, and choose **Next**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/interface-interface-element-1.png)

1. Review configuration

   Review your inputs, and choose **Get started**.   
![The review and confirmation interface.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/confirmation-interface.png)

1. Verify the email in your inbox.

   **Sign in** to the email client you use to receive email for the email address you entered in the previous step. 

   In your email client, **open** the message from Amazon Web Services asking you to confirm that you own the email address. **Select** the link in the message.   
![An email from Amazon SES requesting email address verification, with a verification link highlighted in a red box.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/email-requesting-address-verification-link.png)

1. Check the verification status in the SES console

   Navigate back to the **Amazon SES console**, and **confirm** that the status of the email address in the Amazon SES console is **verified**.   
![Email verification screen with a 'Verified' status marked by a green checkmark.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/email-verification-screen-verified-status.png)

### Step 2: Verify your domain
<a name="verify-your-domain"></a>

Before applying for production access, you must first verify your domain.   

1. Open setup page

   On the **Get set up** page, in the **Verify sending domain** section, choose **Get DNS records.**   
![The navigation interface.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/navigation-interface.png)

1. Get DNS records

   From the **Publish DNS records** table, **copy records** that appear in this section to be published (added) to your DNS provider. 
   + Alternatively, you can choose **Download .csv record** **set** to save a copy of the records to your computer.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/selection-interface-1.png)

1. Add DNS records

   **Log into** your domain’s DNS or web hosting provider, and then **add** the records containing the values that you copied or saved previously. 
**Note**  
Different providers have different procedures for updating DNS records. See the [DNS/Hosting provider table](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html#dns-hosting-providing-table) following these procedures.  
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/selection-interface-1.png)

1. Check verification status

   Navigate back to the Amazon SES console, and **refresh** the set up page. **Confirm** that the status of the domain in the Amazon SES console is **verified**.   
![Verification screen for sending domain with instructions, buttons for 'View all identities' and 'Assign configuration set,' and a green 'Verified' status.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/verification-screen-sending-domain.png)

### Step 3: Send an email
<a name="send-an-email"></a>

Now that you have verified an email address and domain, you can send an email. With Amazon SES, you can send an email in three ways: using the console, using the [Simple Mail Transfer Protocol (SMTP) interface](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-an-email-using-smtp.html), or using the [API](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-an-email-using-sdk.html). 

This tutorial shows how to use the simplest method, the console. After you get started with Amazon SES, you will want to send your emails using the SMTP interface or the API, because you can access those programmatically. 

With Amazon SES, you can send [formatted](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-email-formatted.html) email or [raw](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-email-raw.html) email. If you choose formatted email, Amazon SES formats the email for you. If you choose raw email, you must manually format the email, which gives you more control over the email headers and how the message displays. In this tutorial, we use raw format so that we can demonstrate how to send an email formatted in HTML. 

1. Open setup page

   Navigate back to the **Get setup** page, in the **Send test email** section, choose **Send test email**.   
![The navigation interface.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/navigation-interface-1.png)

1. Start test email

   On the **Send test email** page, make the following changes: 
   + For Email format, choose **Raw**. 
   + For From-address, leave **default input**. 
   + For Scenario, choose **Custom**. 
   + For Custom recipient, enter the **email address** you previously verified. 
   + For Message, **copy and paste** the following message into the provided text box: 

   ```
   Subject: Amazon SES TestMIME-Version: 1.0Content-Type: text/html<!DOCTYPE html><html><body><h1>You have successfully sent an email using Amazon SES!</h1><p>For more information about Amazon SES, see the <a href="http://docs.aws.amazon.com/ses/latest/DeveloperGuide/Welcome.html">Amazon SES Developer Guide</a>.</p></body></html>
   ```  
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/send-an-email-with-amazon-ses/images/interface-interface-element-2.png)

1. Send test email

   Choose **Send test email**. 

1. Check email delivery

   **Sign in** to the email client of the address you sent the email to. You will find the message that you sent. If you cannot find it, check the spam folder.  

## Congratulations
<a name="congratulations"></a>

Congratulations\! You have verified an email address and sent an email using the Amazon SES console. 

## Next steps
<a name="next-steps"></a>

You can continue your journey with AWS by following the next steps:
+ Set up a [process to handle bounces and complaints](https://docs.aws.amazon.com/ses/latest/dg/monitor-sending-activity.html).
+ Activate the [Virtual Deliverability Manager](https://docs.aws.amazon.com/ses/latest/dg/vdm-get-started.html) to ensure your account is setup for optimal email deliverability and engagement.
+ Apply for a [production access](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html). If granted, this will move your account out of the sandbox, remove the restriction on recipient addresses, and increase your sending limits.
+ Decide whether you will send your bulk email using the Amazon SES [SMTP interface](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-an-email-using-smtp.html) or [API](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-an-email-using-sdk.html). You can use the API either directly or through an [AWS SDK](https://aws.amazon.com/getting-started/tools-sdks/). 
+ Follow [deliverability best practices](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/improve-deliverability.html) to maximize the number of emails that reach your recipients’ inboxes.