

# What is AWS re:Post Private?
<a name="what-is"></a>

AWS re:Post Private is a private version of AWS re:Post for enterprises with Enterprise Support or Enterprise On-Ramp Support plans. It provides access to knowledge and experts to accelerate cloud adoption and increase developer productivity. With your organization-specific private re:Post, you can build an organization-specific developer community that drives efficiencies at scale and provides access to valuable knowledge resources. Additionally, re:Post Private centralizes trusted AWS technical content and offers private discussion forums to improve how your teams collaborate internally and with AWS to remove technical obstacles, accelerate innovation, and scale more efficiently in the cloud.

For more information, see [AWS re:Post Private](https://aws.amazon.com/repost-private/).

## Access re:Post Private
<a name="accessing"></a>

Administrators use the AWS re:Post Private console to create their organization-specific private re:Post. When administrators create a private re:Post, they can name their private re:Post and define a subdomain under `*.private.repost.aws`. Administrators for an organization’s private re:Post can configure user access using AWS IAM Identity Center and specify one of the following identity sources for authentication: Identity Center directory, Active Directory, or an external identity provider. After configuring the users, console administrators can assign a re:Post Private admin role to one or more users. re:Post Private administrators can customize their private re:Post application in line with organizational branding and knowledge needs. The AWS account team members, such as Technical Account Managers, who are familiar with the organization’s architecture and workloads are automatically added to the organization's private re:Post for collaboration.

Administrators for the re:Post Private application can customize branding, add tags to classify content, and select topics of interest for their developers to automatically populate training and technical content. They can also invite users to join their private re:Post for increased collaboration. For more information, see [AWS re:Post Private Administration Guide](https://docs.aws.amazon.com/repostprivate/latest/adminguide/what-is.html).

Non-administrative users use the re:Post Private application to sign in using credentials that are configured by their administrator. After signing in to a private re:Post, users can browse or search existing content, including tailored training and technical content that are scoped to their topics of interest. Users can also search AWS public technical content directly from their private re:Post and create private threads for internal discussions on AWS public content. Users can collaboratively solve AWS technical problems and get technical guidance from other users of the private re:Post by asking a question, providing a response, or publishing an article. Users can also convert a discussion thread into an Support case. Users can choose to add the responses from Support to the private re:Post. For more information, see [AWS re:Post Private User Guide](https://docs.aws.amazon.com/repostprivate/latest/userguide/what-is.html).

## Pricing
<a name="pricing"></a>

Only customers with Enterprise Support (ES) and Enterprise On-Ramp (EOP) Support plans can subscribe to the re:Post Private service. You can choose from the two available pricing tiers - Free tier and Standard tier. The Free tier provides you the ability to explore and try out Standard tier capabilities to full extent for six months before you can seamlessly transition to a paid tier. If you use the Standard tier, then you can pay a monthly subscription per user charge to use re:Post Private. For more information, see [Pricing](https://aws.amazon.com/repost-private/pricing/).

## Sign up for an AWS account
<a name="sign-up-for-aws"></a>

To get started with AWS, you need an AWS account. For information about creating an AWS account, see [Getting started with an AWS account](https://docs.aws.amazon.com//accounts/latest/reference/getting-started.html) in the *AWS Account Management Reference Guide*.

## Prerequisites
<a name="prerequisites"></a>

You must meet the following prerequisites before you can create a new private re:Post or manage an existing private re:Post in AWS re:Post Private:
+ You must sign up for an [Enterprise](https://aws.amazon.com/premiumsupport/plans/enterprise/) or [Enterprise On-Ramp](https://aws.amazon.com//premiumsupport/plans/enterprise-onramp/) Support Plan.
+ You must [enable AWS IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/get-started-enable-identity-center.html) in the same Region where you want to set up your private re:Post.
+ You must create an AWS Identity and Access Management role that has the required permissions to create, manage, and resolve Support cases for you. The re:Post Private service uses this role to make API calls to Support. For more information, see [Manage access to Support case creation and management in re:Post Private](repost-manage-permissions.md).