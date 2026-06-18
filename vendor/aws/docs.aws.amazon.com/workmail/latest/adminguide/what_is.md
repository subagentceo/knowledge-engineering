

End of support notice: On March 31, 2027, AWS will end support for Amazon WorkMail. After March 31, 2027, you will no longer be able to access the Amazon WorkMail console or Amazon WorkMail resources. For more information, see [Amazon WorkMail end of support](https://docs.aws.amazon.com/workmail/latest/adminguide/workmail-end-of-support.html). 

# What is Amazon WorkMail?
<a name="what_is"></a>

Amazon WorkMail is a secure, managed business email and calendaring service with support for existing desktop and mobile email clients. Amazon WorkMail users can access their email, contacts, and calendars using Microsoft Outlook, their browser, or their native iOS and Android email applications. You can integrate Amazon WorkMail with your existing corporate directory and control both the keys that encrypt your data and the location in which your data is stored.

For a list of supported AWS Regions and endpoints, see [AWS Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html#wm_region).

**Topics**
+ [Amazon WorkMail system requirements](#workmail_reqs)
+ [Amazon WorkMail concepts](#workmail_concepts)
+ [Related AWS services](#related_services)
+ [Amazon WorkMail pricing](#workmail_pricing)
+ [Amazon WorkMail resources](#RelatedResources)

## Amazon WorkMail system requirements
<a name="workmail_reqs"></a>

When your Amazon WorkMail administrator invites you to sign in to your Amazon WorkMail account, you can sign in using the Amazon WorkMail web client.

Amazon WorkMail also works with all major mobile devices and operating systems that support the Exchange ActiveSync protocol. These devices include the iPad, iPhone, Android, and Windows Phone. Users of macOS can add their Amazon WorkMail account to their Mail, Calendar, and Contacts apps.

Amazon WorkMail supports the following operating system versions:
+ Windows – Windows 7 SP1 or later
+ MacOS – MacOS 10.12 (Sierra) or later
+ Android – Andriod 5.0 or later
+ iPhone – iOS 5 or later
+ Windows phone – Windows 8.1 or later
+ Blackberry – Blackberry OS 10.3.3.3216

If you have a valid Microsoft Outlook license, you can access Amazon WorkMail using the following versions of Microsoft Outlook:
+ Outlook 2013 or later
+ Outlook 2013 Click-to-Run or later
+ Outlook for Mac 2016 or later

You can access the Amazon WorkMail web client using the following browser versions:
+ Google Chrome – Version 22 or later
+ Mozilla Firefox – Version 27 or later
+ Safari – Version 7 or later
+ Internet Explorer – Version 11
+ Microsoft Edge

You can also use Amazon WorkMail with your preferred IMAP client.

## Amazon WorkMail concepts
<a name="workmail_concepts"></a>

The terminology and concepts that are central to your understanding and use of Amazon WorkMail are described below.

**Organization**  
A tenant setup for Amazon WorkMail.

**Alias**  
A globally unique name to identify your organization. The alias is used to access the Amazon WorkMail web application (https://{{alias}}.awsapps.com/mail).

**Domain**  
The web address that comes after the @ symbol in an email address. You can add a domain that receives mail and delivers it to mailboxes in your organization.

**Test mail domain**  
A domain is automatically configured during setup that can be used for testing Amazon WorkMail. The test mail domain is {{alias}}.awsapps.com and is used as the default domain if you don't configure your own domain. The test mail domain is subject to different limits. For more information, see [Amazon WorkMail quotas](workmail_limits.md).

**Directory**  
An AWS Simple AD, AWS Managed AD, or AD Connector created in AWS Directory Service. If you create an organization using the Amazon WorkMail Quick setup, we create a WorkMail directory for you. You can't view a WorkMail directory in AWS Directory Service.

**User**  
A user created in the AWS Directory Service. The user can be created in an *USER* or *REMOTE\_USER* role. When a user is created and enabled with an *USER* role, they receive their own mailbox to access. When a user is disabled, they can't access Amazon WorkMail.  
User created and enabled with a *REMOTE\_USER* role is listed in the address book but do not get a mailbox in Amazon WorkMail. The *REMOTE\_USER* can have the mailbox hosted outside Amazon WorkMail but will still be listed as any other user with mailbox in the Amazon WorkMail address book and can look up each others calendar to find free or busy information.

**Group**  
A group used in AWS Directory Service. A group can be used as a distribution list or a security group in Amazon WorkMail. Groups don't have their own mailboxes.

**Resource**  
A resource represents a meeting room or equipment resource that can be booked by Amazon WorkMail users.

**Mobile device policy**  
Various IT policy rules that control the security features and behavior of a mobile device.

## Related AWS services
<a name="related_services"></a>

The following services are used along with Amazon WorkMail:
+ **AWS Directory Service**—You can integrate Amazon WorkMail with an existing AWS Simple AD, AWS Managed AD, or AD Connector. Create a directory in the AWS Directory Service and then enable Amazon WorkMail for this directory. After you've configured this integration, you can choose which users you would like to enable for Amazon WorkMail from a list of users in your existing directory, and users can log in using their existing Active Directory credentials. For more information, see [AWS Directory Service Administration Guide](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/).
+ **Amazon Simple Email Service**—Amazon WorkMail uses Amazon SES to send all outgoing email. The test mail domain and your domains are available for management in the Amazon SES console. There is no cost for outgoing email sent from Amazon WorkMail. For more information, see [Amazon Simple Email Service Developer Guide](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/).
+ **AWS Identity and Access Management**—The AWS Management Console requires your user name and password so that any service you use can determine whether you have permission to access its resources. We recommend that you avoid using AWS account credentials to access AWS because AWS account credentials can't be revoked or limited in any way. Instead, we recommend that you create an IAM user and add the user to an IAM group with administrative permissions. You can then access the console using the IAM user credentials.

  If you signed up for AWS but have not created an IAM user for yourself, you can create one using the IAM console. For more information, see [Create individual IAM users](https://docs.aws.amazon.com/IAM/latest/UserGuide/IAMBestPractices.html#create-iam-users) in the *IAM User Guide*.
+ **AWS Key Management Service**—Amazon WorkMail is integrated with AWS KMS for encryption of customer data. Key management can be performed from the AWS KMS console. For more information, see [What is the AWS Key Management Service](https://docs.aws.amazon.com/kms/latest/developerguide/overview.html) in the *AWS Key Management Service Developer Guide*.

## Amazon WorkMail pricing
<a name="workmail_pricing"></a>

With Amazon WorkMail, there are no upfront fees or commitments. You pay only for active user accounts. For more specific information about pricing, see [Pricing](http://aws.amazon.com/workmail/pricing).

## Amazon WorkMail resources
<a name="RelatedResources"></a>

The following related resources can help you as you work with this service.
+  [Classes & Workshops](https://aws.amazon.com/training/course-descriptions/) – Links to role-based and specialty courses, in addition to self-paced labs to help sharpen your AWS skills and gain practical experience.
+  [AWS Developer Center](https://aws.amazon.com/developer/?ref=docs_id=res1) – Explore tutorials, download tools, and learn about AWS developer events.
+  [AWS Developer Tools](https://aws.amazon.com/developer/tools/?ref=docs_id=res1) – Links to developer tools, SDKs, IDE toolkits, and command line tools for developing and managing AWS applications.
+  [Getting Started Resource Center](https://aws.amazon.com/getting-started/?ref=docs_id=res1) – Learn how to set up your AWS account, join the AWS community, and launch your first application.
+  [Hands-On Tutorials](https://aws.amazon.com/getting-started/hands-on/?ref=docs_id=res1) – Follow step-by-step tutorials to launch your first application on AWS.
+  [AWS Whitepapers](https://aws.amazon.com/whitepapers/) – Links to a comprehensive list of technical AWS whitepapers, covering topics such as architecture, security, and economics and authored by AWS Solutions Architects or other technical experts.
+  [AWS Support Center](https://console.aws.amazon.com/support/home#/) – The hub for creating and managing your AWS Support cases. Also includes links to other helpful resources, such as forums, technical FAQs, service health status, and AWS Trusted Advisor.
+  [Support](https://aws.amazon.com/premiumsupport/) – The primary webpage for information about Support, a one-on-one, fast-response support channel to help you build and run applications in the cloud.
+  [Contact Us](https://aws.amazon.com/contact-us/) – A central contact point for inquiries concerning AWS billing, account, events, abuse, and other issues. 
+  [AWS Site Terms](https://aws.amazon.com/terms/) – Detailed information about our copyright and trademark; your account, license, and site access; and other topics.