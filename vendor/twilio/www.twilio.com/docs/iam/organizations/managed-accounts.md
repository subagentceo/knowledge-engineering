# Managed accounts

> \[!NOTE]
>
> The terms 'Accounts' and 'Projects' are used interchangeably. Twilio Admin and the Organizations API use the term Accounts, and the Console primarily uses Projects. Going forward, Twilio is standardizing on Accounts.

A **Managed Account** is an account that is owned and overseen by an organization. The organization has full control over its managed accounts' lifecycles and their settings.

![Twilio organizations structure with accounts and users under an organization.](https://docs-resources.prod.twilio.com/75b6c361922a88ac5a90036c7785524e0695db0411970253c74cb34c3c79f4e7.png)

The organization encompasses multiple accounts and multiple users, who have access to some or all of those accounts.

## How managed accounts can help you

Managed accounts provide you with a way to bring all of the accounts created by your company's employees into one place. You can see precisely which accounts your organization and its users are responsible for, who has access to them — whether they are company developers or outside contractors — and manage them centrally.

There are two ways to create a managed account:

1. Create a new account in your organization. By default, this will be a managed account.
2. Import an existing account that was created outside of your organization. Once imported, it becomes a managed account.

Organization Owners and Administrators have full control over the lifecycle of any account that is part of your organization. For example, they can change the settings or close the account.

Owners and Administrators also can manage account settings, such as choosing which users have access to a given account, and requiring the use of two-factor authentication to sign into the account.

Managed accounts, whether created by the organization or imported into it, still have an Owner — i.e., a user on the account with the [Owner role](/docs/iam/organizations/managed-accounts#account-settings). That user must be a managed user who is part of the same organization as the account itself. Managed accounts cannot be owned by an independent user.

> \[!NOTE]
>
> Custom account settings or configurations are not inherited on account creation. You may need to [contact support](https://help.twilio.com/) to ensure that newly created managed accounts have the correct terms, invoicing, and specific features.

To view a list of an organization's managed accounts:

* In [Twilio Console](https://1console.twilio.com/), navigate to [**Settings** > **Organization settings** > **Accounts**](https://1console.twilio.com/organization/settings/accounts/managed-accounts).
* In the legacy Twilio Console, navigate to the [**Accounts**](https://admin.twilio.com/managed-accounts) section of the Twilio Admin and select the **Managed Accounts** tab.

### Managed accounts and independent accounts

Your organization's managed accounts belong to your organization. An Independent account is an account that belongs to an Owner who is not a part of your organization but has granted access to it to one or more of your organization's managed users. Note that managed users cannot be the Owners of independent accounts.

To add an independent account to your organization, you must invite the owner to share it, and they must accept your invitation. You can relinquish access to an independent account at any time.

![Organization structure with independent owner and accounts connected to users.](https://docs-resources.prod.twilio.com/5f146b4df1f6a5f9b81e8e1409bcd1ddb54781ed40ed65a55d2ad92d31181f86.png)

### Pending accounts

These are accounts that an Organization Admin has explicitly added to your organization, but for which the account owner has not yet confirmed the request. Whether they are managed or independent, they will be listed here until the import process is completed. See [**Add an existing account**](#add-an-existing-account) to learn how and when the added account's owner is contacted.

## Create a new account

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Settings > Organization settings > Accounts**](https://1console.twilio.com/organization/settings/accounts/managed-accounts).
2. Click **Create new account**.
3. On the **Account details** page, set **Account friendly name** and select the account owner.
4. Click **Create account**.

## Legacy Twilio Console

1. Log in to the [Console](https://console.twilio.com) and navigate to [**Twilio Admin > Accounts**](https://admin.twilio.com/managed-accounts).
2. Click the **Create New Account** button.
3. On the **Create new account** screen, name your account and select if the account will be used for Twilio or Flex.
4. On the **Review** screen, review and confirm the details of your new account.
5. Click the **Create new account** button.
6. After you create and set up your new account, it will show up under your organization's [**Accounts**](https://admin.twilio.com/managed-accounts) section under **Managed Accounts**.

## Add an existing account

You can add an existing account to your organization from the [**Account management**](https://1console.twilio.com/organization/settings/accounts/managed-accounts) page or the legacy Twilio Console's [**Accounts**](https://admin.twilio.com/managed-accounts) section. The owner of the account you want to add must have signed up to Twilio through one of your organization's [verified domains](/docs/iam/organizations/domains). The account's owner will be emailed, and they will have to confirm the request before the account is added to your organization.

You will also need the account's SID. A user with access to the account can get that for you from the Console.

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Settings > Organization settings > Accounts**](https://1console.twilio.com/organization/settings/accounts/managed-accounts).
2. Click **Add existing account**.
3. Enter **Account SID**.
4. Click **Add account**.

## Legacy Twilio Console

1. Log in to the [Console](https://console.twilio.com) and navigate to [**Twilio Admin > Accounts**](https://admin.twilio.com/managed-accounts).
2. Click **Add Existing Account**.
3. Enter the account's SID.
4. Click **Add Account**.

## Add users to accounts

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to **Settings** > **Account settings** > **User management**.\
   The **User access** page opens.

   * To view the list of active users, click **Active users**.
   * To view the list of invited users, click **Invited users**.

   You can view sub-groups of users by clicking the user and then clicking **Role assignments**. To learn more about each of these roles, see [Managed users](/docs/iam/organizations/managed-users).
2. To add users to your account, click **Invite users** and follow the instructions.

## Legacy Twilio Console

To add users to an account, click on the account in the [**Accounts**](https://admin.twilio.com/managed-accounts) section's list and then, on the account's details page, click on the **Users** tab. Here you'll see a list of users who already have access to the account, if any. You can add users to work on the account by clicking the **Invite User** button above the list.

You can view sub-groups of users by clicking on the **Select account roles** popup and clicking the **Filter** button. To learn more about each of these roles, see [Managed users](/docs/iam/organizations/managed-users).

The **Pending Users** tab will take you to a list of users who have been invited to access the account but have not yet responded to the invitation. You can **resend** pending account invitations to users here.

## Account settings

To see and update an account's settings:

* In [Twilio Console](https://1console.twilio.com/), navigate to **Settings** > **Account settings** > **Account details & security**.
* In the legacy Twilio Console, click on the account in the [**Accounts**](https://admin.twilio.com/managed-accounts) section. This will open the **General** tab of the account's details page, where you can update settings or close the account.

### Change Account Owner

* Note that Ownership can only be changed for a managed account in your organization. If you have an independent account, you will need to [add](/docs/iam/organizations/managed-accounts#add-an-existing-account) that account as a managed account to your organization.
* Ownership can only be transferred to another managed user. If your desired user is not yet managed by your organization, you will need to [invite](/docs/iam/organizations/managed-users#create-a-new-user) them to your organization.

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to **Settings** > **Account settings** > **Account details & security**.
2. Click **Change account owner**.
3. In the pop-up, select the new owner and click **Change owner**.

## Legacy Twilio Console

To change the owner, go to the [**Managed Accounts**](https://admin.twilio.com/managed-accounts) list page and click on the account you want to change. You will see the account details and in the **General** tab you will be able to change the owner by following the below steps:

1. Select the **X** in the **Account Owner** text field to remove the existing value of the Owner's email address.
2. Enter the **email address or User SID** of the new owner.
3. Select the new owner.
4. Click the **Save** button.

## Close a managed account

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to **Settings** > **Account settings** > **Account details & security**.
2. Click **Close account**.
3. Review and check all acknowledgements boxes.
4. Click **Close account**.

## Legacy Twilio Console

You can close an existing account in your organization from the [**Accounts**](https://admin.twilio.com/managed-accounts) section.

1. Log in to the [Console](https:/console.twilio.com) and navigate to [**Twilio Admin > Accounts**](https://admin.twilio.com/managed-accounts).
2. Select the name of the account you are managing.
3. Click on the red **Close Account** option at the bottom of the page.
4. Review and check off all acknowledgements on the **Close Account** pop-up screen.
5. Click the **Close Account** button.
