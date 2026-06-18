# Organizations

A Twilio organization is a container that helps you manage all of your company's Twilio accounts. Organizations reduce operational risk by centralizing management for the following items:

* Your Twilio accounts
* Your Twilio users
* Security policies that govern Twilio user access

### How organizations fit into Twilio

When you first sign up with Twilio, we create the following unique resources for you:

* A **user**, which represents the developer.
* An **account**, which contains the application you build and resources such as phone numbers. The account also stores billing information, allowing each application to have its own billing method.
* Your first **organization**, which groups together your user and account.

![Diagram showing connection between Account and User.](https://docs-resources.prod.twilio.com/bf7dc002fc131bf90a4fdfabfa2640c4c2f792824fb3b18fbf612f8a72124385.png)

Every account has one specific user who is its **owner**, but there's no limit to the number of users that you can invite to access the account. You can even invite users who have accounts of their own.

![Diagram showing one user linked to multiple accounts.](https://docs-resources.prod.twilio.com/ac84e8f2ada26c1c637a1a38651f378c7c7cc69e26afbb1f3d8310ee3f753e08.png)

This model lets anyone visit Twilio, sign up, create an account, and start building straight away. As your business grows, you can create new accounts—new applications—and invite additional users to access them.

However, as your company scales, you need a more structured approach to user and account management than the basic account model can provide. This is where organizations can help. Organizations allow you to consolidate all of your accounts and manage them centrally.

![Twilio Organizations structure with accounts and users under an organization.](https://docs-resources.prod.twilio.com/75b6c361922a88ac5a90036c7785524e0695db0411970253c74cb34c3c79f4e7.png)

All of your accounts, regardless of which employee created them, can roll up into one organization. Your designated Organization Admins can then perform appropriate management actions, such as adding and removing users, assigning users to accounts, and updating account settings.

If you have personnel changes, the organization lets you transfer administrative responsibilities to different members of your team.

### Organization ownership

When you create an organization, you become the **Organization Owner**. All of the accounts that you currently own become part of the organization too. Your users will continue to have permission to access their accounts, which you can now review and manage.

### Organization roles

You can assign **Organization Roles** to users when you invite them into the organization. These roles govern what actions a user can perform within your organization. You can set and change these roles in a user's detail page, accessed from the Twilio Admin's [**Users**](https://admin.twilio.com/managed-users) area.

> \[!NOTE]
>
> Organization roles are different from account roles, which are roles you can assign to users within a given account. To learn more, see [Managed Accounts](/docs/iam/organizations/managed-accounts).

You can assign the following organization roles:

* **Owner**: This role is automatically assigned to the person who created the organization, and gives them full control of the organization. There can be only one organization owner at a time. Only the Organization Owner can delete the organization.
* **Administrator**: A managed user in the organization who has permission to manage it. For example, they can invite and remove users, add existing accounts, create new accounts, modify accounts, and change organization settings. However, they can't delete the organization.
* **Standard User (Account Creation)**: A managed user who doesn't have permission to manage your organization in any capacity. This role is the default you would assign to most of the users in your organization. Standard users have access only to the accounts that you specify.
* **Organization Billing Admin**: View and manage billing settings, payment methods, usage, and invoices for Billing Groups and linked accounts across the organization.
* **Organization Billing Viewer**: View-only access to billing settings, payment methods, usage, and invoices for Billing Groups and linked accounts across the organization.

## Create your organization

Twilio creates your first organization by default. To create another organization, complete the following steps:

1. Log in to the [Twilio Console](https://console.twilio.com/).
2. Select 'Admin' in the upper right corner of the Console's top navigation bar. From the drop-down menu, select **Create Organization**.
3. On the **Create Your Organization** page, enter a name for your organization. Usually, this is your company's name, but you can enter anything you like. You can change the organization's name later by going to the Twilio Admin's [**Settings**](https://admin.twilio.com/settings) page.
4. Click the **Create Organization** button. Twilio creates a container that holds all your company's accounts and users.

> \[!WARNING]
>
> You must be the Owner of an account with a verified phone number to create an organization. To add a verified phone number, see [How to Add and Remove a Verified Phone Number or Caller ID with Twilio](https://help.twilio.com/articles/223180048-How-to-Add-and-Remove-a-Verified-Phone-Number-or-Caller-ID-with-Twilio_).

## Manage accounts

The [**Account management**](https://1console.twilio.com/organization/settings/accounts/managed-accounts) page or the legacy Twilio Console's [**Accounts**](https://admin.twilio.com/managed-accounts) page provides you with lists of all your managed accounts, independent accounts, and pending accounts. You can also add existing accounts to your organization and create new accounts within your organization from the Accounts page.

In the legacy Twilio Console, see Twilio Admin's [**Accounts**](https://admin.twilio.com/managed-accounts) page.

An organization can include the following types of accounts:

* **Managed accounts** are part of your organization. Organization Admins can change the settings and lifecycle of all managed accounts.
* **Independent accounts** aren't managed by your organization, but are accounts that your managed users have access to.
* **Pending accounts** are the accounts that an Organization Admin has invited to become part of your organization, but the account owner hasn't yet accepted your invitation.

> \[!NOTE]
>
> To find out more about working with managed accounts, see [Managed Accounts](/docs/iam/organizations/managed-accounts).

## Manage users

The [**User management**](https://1console.twilio.com/organization/settings/users/managed-users) or the legacy Twilio Console's [**Users**](https://admin.twilio.com/managed-users) page is where you can view lists of all your managed users, independent users, and pending users. You can also invite users to be part of your organization from the page.

The following types of users can work with an organization:

* **Managed users** are part of your organization. Organization Admins can control their settings and access.
* **Independent users** aren't part of your organization, but they have access to one or more of your [managed accounts](#manage-accounts).
* **Pending users** are users that an Organization Admin has explicitly invited to join your organization, but the users haven't yet accepted your invitation.

> \[!NOTE]
>
> To find out more about working with managed users, see [Managed Users](/docs/iam/organizations/managed-users) page.

## Update your organization

### Settings

You can update your organization name on the [**Organization overview**](https://1console.twilio.com/organization/settings/overview) page or the legacy Twilio Console's [**Settings**](https://admin.twilio.com/settings) page.

The **Domain Settings** selection determines how Twilio processes new users from your registered domain(s) when the users attempt to create Twilio accounts. You can set domain settings to perform any of the following actions:

* Prevent users from signing up with email addresses from your domain, unless they have been explicitly invited to do so by the organization. In this case, users must request an invitation or sign up using an alternative email address if they're setting up an entirely separate user entity.
* Users that sign up with email addresses from your domain automatically join this organization, and Twilio grants the users permission to create accounts within the organization. This allows your employees to get working as quickly as possible.
* Users that sign up with email addresses from your domain can't join this organization. Use this to tightly restrict access to your organization and its accounts.

These settings apply to any or all of the domains you have verified. To learn more, see [**Domains**](/docs/iam/organizations/domains).

### Billing

Billing is independent of the organization. New accounts created in the organization operate in trial mode until you [upgrade the account](https://help.twilio.com/articles/223183208-Upgrading-to-a-paid-Twilio-Account) or [add the account to your invoice](https://help.twilio.com/articles/223135647-Can-I-set-up-billing-by-invoice-for-my-Twilio-project-). New accounts don't inherit custom pricing models.

### Privacy

Organizations introduce a new [Personally Identifiable Information](/docs/glossary/what-is-personally-identifiable-information-pii) (PII) element: the organization's friendly name. Twilio retains this name for up to 30 days after you delete an organization (PII MTL: 30 DAYS).

### Turn on HIPAA and eligible Accounts

For customers subject to the Health Insurance Portability and Accountability Act (HIPAA), Twilio will execute a Business Associate Addendum (BAA) to Twilio's Terms of Service. To obtain a BAA, please contact your Twilio Account Representative.

If your organization has a BAA with Twilio for usage subject to HIPAA, you can manage HIPAA Accounts through the Twilio Admin.

To turn on or turn off HIPAA for the accounts of your organization, follow these steps:

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com) and navigate to [**Settings** > **Organization settings** > **Accounts**](https://1console.twilio.com/organization/settings/accounts/managed-accounts).
2. On the [**Account management**](https://1console.twilio.com/organization/settings/accounts/managed-accounts) page, click the name of the account you want to manage.
3. On the **Security** tab, in the **HIPAA** section, turn on or turn off HIPAA for the account.

## Legacy Twilio Console

1. Log in to the [Console](https://console.twilio.com) and navigate to [**Twilio Admin > Accounts**](https://admin.twilio.com/managed-accounts).
2. Click the name of the account you want to manage.
3. In the **HIPAA enablement** section, select **Enable HIPAA for this account** or **Disable HIPAA for this account**.
4. Click **Save**.

> \[!NOTE]
>
> You must repeat the steps to turn on HIPAA for all existing Subaccounts to designate them as HIPAA. Once you designate an Account as HIPAA, any future Subaccounts created in that Account are also automatically designated as HIPAA Subaccounts.
>
> Any new Accounts that you create don't automatically become designated as HIPAA eligible. It's the Customer's responsibility to ensure that all Accounts and Subaccounts requiring HIPAA are designated as such through the Twilio Admin or Console.
>
> To learn more about how to build a HIPAA-compliant workflow using Twilio's offerings, see [Architecting for HIPAA on Twilio](https://twil.io/architecting-for-hipaa).

### Delete an Organization

You can't delete your organization from the Console. If you need to delete your organization, [contact the Twilio support team](https://help.twilio.com/).

### Change the Organization's Owner

**Note**: Only the current Organization Owner can complete this update.

## Twilio Console

1. Ensure the new owner is a user listed within the organization. If they're not a user in the organization, you must add them as a user first. To learn how to add a new user, see the [Manage users](#manage-users).
2. Go to the [**Organization overview**](https://1console.twilio.com/organization/settings/overview) page.
3. Click **Change organization owner**.
4. Select the new owner from the dropdown menu and click **Change Owner**.

## Legacy Twilio Console

1. Ensure the new owner is a user listed within the organization. If they're not a user in the organization, you must add them as a user first. To learn how to add a new user, see the [Manage users](#manage-users).
2. Go to the [**Users**](https://admin.twilio.com/managed-users) section within the **Twilio Admin** and select the name of the organization's Owner. The organization's Owner displays with the role **Owner** under the **Organization Roles** column.
3. On the Owner's profile page, click on **Change Ownership** in the **Organization Role** section.
4. Under the **Change Organization Ownership** panel, type the new owner's email into the **Choose a new owner** field, select their user, and click **Change Owner**.

## Merge Organizations

This feature allows you to merge two organizations. The organization that initiates the merge (Prime Organization) absorbs the other organization (Candidate Organization). The Owner of the Candidate Organization must use an email address from the same verified domain as the Prime Organization.

After a successful merge, you can expect the following:

* The Candidate Organization no longer exists independently.
* Twilio adds Candidate Organization Managed Accounts and Users to the Prime Organization.
* There is no impact on Candidate Organization Accounts billing, compliance, or Twilio product functionality.
* Candidate Organization Users retain the same Account-level roles and access. They don't automatically get access to Accounts in the Prime Organization.
* If the Prime Organization has SSO turned on at its verified domain level, SSO is enforced for Candidate Organization Users.

You can merge organizations either by using an invitation or by using import. You must meet the following prerequisites before you can merge with either method.

### Prerequisites

Before you begin merging organizations, ensure the following:

1. The Prime Organization has one or more verified domains.
2. The Candidate Organization doesn't have any verified domains.
3. The Candidate Organization Owner's email address belongs to one of the Prime Organization's verified domains.

### Merge by using an invitation

To merge organizations by using an invitation, follow these steps:

## Twilio Console

1. Navigate to the [**User management**](https://1console.twilio.com/organization/settings/users/managed-users) page.
2. The Prime Organization Owner or Admin selects the **Invite User** button and sends an invitation to the Candidate Organization Owner to join the Prime Organization.
   * The Prime Organization Owner or Admin can choose if the Candidate Organization Owner becomes an Admin or Standard User in the Prime Organization. Candidate Organization Admins become Standard Users by default. The Prime Organization Owner or Admin can update user roles after the merge.
   * The Candidate Organization Owner displays as a Pending User in the Prime Organization until the Candidate Organization Owner accepts the invitation or the invitation expires.
3. Candidate Organization Owner receives the invitation. The invitation informs the Candidate Organization Owner that if they accept, their organization will merge into the Prime Organization.
4. Candidate Organization Owner accepts the invitation.
5. The Candidate Organization merges into the Prime Organization.

## Legacy Twilio Console

1. Navigate to the [Twilio Admin's Users section](https://admin.twilio.com/managed-users).
2. The Prime Organization Owner or Admin selects the **Invite User** button and sends an invitation to the Candidate Organization Owner to join the Prime Organization.
   * The Prime Organization Owner or Admin can choose if the Candidate Organization Owner becomes an Admin or Standard User in the Prime Organization. Candidate Organization Admins become Standard Users by default. The Prime Organization Owner or Admin can update user roles after the merge.
   * The Candidate Organization Owner displays as a Pending User in the Prime Organization until the Candidate Organization Owner accepts the invitation or the invitation expires.
3. Candidate Organization Owner receives the invitation. The invitation informs the Candidate Organization Owner that if they accept, their organization will merge into the Prime Organization.
4. Candidate Organization Owner accepts the invitation.
5. The Candidate Organization merges into the Prime Organization.

### Merge by using import

To merge organizations by using import, follow these steps:

## Twilio Console

1. Request access to the Import Users feature for the Prime Organization by [contacting Twilio support](https://help.twilio.com).
2. On the [**User management**](https://1console.twilio.com/organization/settings/users/managed-users) page, click the **Imported** tab.
3. Prime Organization Owner or Admin imports the Owner of the Candidate Organization with the Import Users feature.
   * The Owner of the Candidate Organization can't opt out of the merge.
   * If the Prime Organization chose to notify the User of the Import process, the Candidate Organization Owner receives a notification after the import and merge complete.
4. The Candidate Organization merges into the Prime Organization.
5. The Candidate Organization Owner and Admins become Standard Users in the Prime Organization. The Prime Organization Owner or Admin can update user roles after the merge.

## Legacy Twilio Console

1. Request access to the Import Users feature for the Prime Organization by [contacting Twilio support](https://help.twilio.com).
2. Navigate to the [Twilio Admin's Import Users section](https://admin.twilio.com/import-users).
3. Prime Organization Owner or Admin imports the Owner of the Candidate Organization with the Import Users feature.
   * The Owner of the Candidate Organization can't opt out of the merge.
   * If the Prime Organization chose to notify the User of the Import process, the Candidate Organization Owner receives a notification after the import and merge complete.
4. The Candidate Organization merges into the Prime Organization.
5. The Candidate Organization Owner and Admins become Standard Users in the Prime Organization. The Prime Organization Owner or Admin can update user roles after the merge.
