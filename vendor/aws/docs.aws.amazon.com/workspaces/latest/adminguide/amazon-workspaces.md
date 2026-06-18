

# What is Amazon WorkSpaces?
<a name="amazon-workspaces"></a>

Amazon WorkSpaces enables you to provision virtual, cloud-based desktops known as *WorkSpaces* for your users. These desktops can run Microsoft Windows, Ubuntu Linux, Rocky Linux, or Red Hat Enterprise Linux. WorkSpaces eliminates the need to procure and deploy hardware or install complex software. You can quickly add or remove users as your needs change. Users can access their virtual desktops from multiple devices or web browsers.

Amazon WorkSpaces allows you to choose between WorkSpaces Personal and WorkSpaces Pools depending on your organization and user needs.
+ **WorkSpaces Personal** - Choose WorkSpaces Personal if you need persistent virtual desktops that are tailored for users who need a highly-personalized desktop provisioned for their exclusive use. This is similar to a physical desktop computer that's assigned to an individual. For more information, see [Create a WorkSpace in WorkSpaces Personal](create-workspaces-personal.md).
+ **WorkSpaces Pool** - Choose WorkSpaces Pool for non-persistent virtual desktops that are tailored for users who need access to highly-curated desktop environments hosted on ephemeral infrastructure. For more information, see [Administer WorkSpaces Pools](managing-stacks-fleets.md).

You can set up WorkSpaces desktops in a variety of ways:
+ Choose from a range of hardware configurations, software configurations, and AWS Regions. For more information, see [ Amazon WorkSpaces Bundles](https://aws.amazon.com/workspaces/details/#Amazon_WorkSpaces_Bundles) and [Create a custom WorkSpaces image and bundle for WorkSpaces Personal](create-custom-bundle.md).
+ If your WorkSpaces is running Windows, you can bring your own licenses and applications or purchase them from the AWS Marketplace for Desktop Apps.
+ If your WorkSpaces is running Windows 10 or 11, you can join your WorkSpaces to Microsoft Entra ID so that your users can use their existing Entra ID credentials to obtain seamless access to Microsoft 365 Apps for enterprise. You can also enroll your WorkSpaces into Intune to manage your virtual desktops using Intune. For more information, see [Create a dedicated Microsoft Entra ID directory with WorkSpaces Personal](launch-entra-id.md). To learn more about Microsoft Entra ID, see [What is Microsoft Entra ID?](https://learn.microsoft.com/en-us/entra/fundamentals/whatis). To learn more about Microsoft Intune, please see [ Microsoft Intune securely manages identities, manages apps, and manages devices](https://learn.microsoft.com/en-us/mem/intune/fundamentals/what-is-intune).
+ Choose a PCoIP or DCV protocol. For more information, see [Protocols for WorkSpaces Personal](amazon-workspaces-networking.md#amazon-workspaces-protocols).
+ Create a standalone managed Microsoft Active Directory for your users, or connect your WorkSpaces to your on-premises Active Directory so that your users can use their existing credentials to obtain seamless access to corporate resources. For more information, see [Manage directories for WorkSpaces Personal](manage-workspaces-directory.md).
+ Use the same tools to manage WorkSpaces that you use to manage on-premises desktops.
+ Use multi-factor authentication (MFA) for additional security.
+ Use AWS Key Management Service (AWS KMS) to encrypt data at rest, disk I/O, and volume snapshots.
+ Choose which IP addresses your users are allowed to use to access their WorkSpaces.
+ Choose monthly or hourly billing for WorkSpaces. For more information, see [WorkSpaces Pricing](https://aws.amazon.com/workspaces/pricing/).
+ Use Amazon WorkSpaces Advisor to identify and resolve issues impacting your WorkSpaces Personal resources with AI-powered troubleshooting. For more information, see [What is Amazon WorkSpaces Advisor?](workspaces-advisor.md).

For more information about working with WorkSpaces, see: 
+ [ Amazon WorkSpaces resources](https://aws.amazon.com/workspaces/resources/) — includes whitepapers, blog posts, webinars, and re:Invent sessions
+ [Provision Desktops in the Cloud](https://aws.amazon.com/getting-started/hands-on/provision-cloud-desktops/)
+ [Best Practices for Deploying Amazon WorkSpaces](https://docs.aws.amazon.com/whitepapers/latest/best-practices-deploying-amazon-workspaces/best-practices-deploying-amazon-workspaces.html)
+ [Amazon WorkSpaces FAQs](https://aws.amazon.com/workspaces/faqs/)
+ For WorkSpaces pricing details and examples, see [WorkSpaces Pricing](https://aws.amazon.com/workspaces/pricing/). 