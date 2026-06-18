# Managed users

Individuals whose logins are owned and overseen by an organization are called **Managed Users**. The organization has full control over the lifecycle and settings of its managed users. When we refer to 'users', we're referring to those individuals' records in the system.

![Twilio organizations structure with accounts and users under an organization.](https://docs-resources.prod.twilio.com/75b6c361922a88ac5a90036c7785524e0695db0411970253c74cb34c3c79f4e7.png)

## How can managed users help you

Adding users to your organization, thereby making them managed users, means that you can supervise them centrally. They can be managed by an Organization Owner or Administrator, who will have full control over the user's lifecycle and can delete users, change their name, assign them to accounts, reset their passwords — forcing them to create a new one — or require that they use two-factor authentication when signing in.

To create a managed user, an Organization Owner or Organization Administrator can navigate to the [**User management**](https://1console.twilio.com/organization/settings/users/managed-users) page or the legacy Console's [**Users**](https://admin.twilio.com/managed-users) section, click the **Invite User** button, and enter the user's email address.

If there's no user associated with the email address, Twilio will create a new user in the system. By default, this is a managed user.

If the invited user does exist in the system, Twilio will send an invitation to the user. Once they have accepted the invitation, the user will join the organization as a managed user.

### Managed users and external users

Managed users belong to an organization. An external user exists outside of an organization but has access to one or more of the organization's managed accounts. For example, you might want to add a contractor so that they can access the account they have been hired to build. Rather than add external users to your organization as you would manage users, you instead add them to the [specific account(s) you want them to access](#invite-a-user-to-an-account).

![Organization structure with accounts and users, external user linked to one account.](https://docs-resources.prod.twilio.com/9193e3c601e0a68444457f21da827f161291b26d9c4f7e6d3c8223f8fde3232e.png)

To view your organization's external users:

## Twilio Console

In [Twilio Console](https://1console.twilio.com), navigate to [**Settings** > **Organization settings** > **User management**](https://1console.twilio.com/organization/settings/users/managed-users) and click the **External** tab.

## Legacy Twilio Console

In the legacy Twilio Console, navigate to [**Users**](https://admin.twilio.com/managed-users) and click the **Independent Users** tab.

> \[!NOTE]
>
> To learn more about how organizations wrangle accounts, and the different types of accounts available, see [Managed Accounts](/docs/iam/organizations/managed-accounts).

### Invited users

Users who have been invited to join an organization but have yet to respond are called "invited users." You can choose to prompt folks taking too long to confirm their acceptance of your invitation by resending the invite.

To view your organization's invited users:

## Twilio Console

In [Twilio Console](https://1console.twilio.com), navigate to [**Settings** > **Organization settings** > **User management**](https://1console.twilio.com/organization/settings/users/managed-users) and click the **Invited** tab.

## Legacy Twilio Console

In the legacy Twilio Console, navigate to [**Users**](https://admin.twilio.com/managed-users) and click the **Pending Users** tab.

## Create a new user

To invite a user, you must first have verified the domain that owns the user's email address on the [**Domains**](https://1console.twilio.com/organization/settings/domains/list) page or in the legacy Console's [**Domains**](https://admin.twilio.com/domains) section. If they are not part of your company — i.e., their email address is not in a domain you own — then you invite them in [a different way](#invite-a-user-to-an-account).

To learn more about how an organization connects to its company's Internet domain, see [Domains](/docs/iam/organizations/domains).

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com) and navigate to [**Settings** > **Organization settings** > **User management**](https://1console.twilio.com/organization/settings/users/managed-users).
2. Click **Invite User**.
3. Select the accounts to invite users to and roles for the users, then click **Next**.
4. Enter the email addresses for the people you want to invite, then click **Next**.

The users will appear under the **Invited** tab until they accept the invitation.

## Legacy Twilio Console

1. Log in to the [Console](https://console.twilio.com/) and navigate to [**Twilio Admin > Users**](https://admin.twilio.com/managed-users).
2. Click the **Invite User** button.
3. In the **Invite User to Organization** panel that now appears, enter the user's email address.
4. Choose their user role:

* **Administrator** — This grants them permission to manage your organization and its users and accounts.
* **Standard User (Account Creation)** — This limits their access to the role they have been assigned for each of the accounts they have access to, if any. They can create new accounts in the organization but have no other management access: for example, they won't be able to access the Twilio Admin.

5. Click the **Invite User** button.

The user will appear under the **Pending Users** tab until they accept the invitation.

> \[!NOTE]
>
> When you invite a user to the organization with an admin user role, the user will be able to add themselves or invite any other user to any account managed by the organization with any role.
>
> When you add a user to the organization with a standard user role, the user will only have access to the accounts they already have access to. To grant access to other accounts for a standard user, you must [invite the user](/docs/iam/organizations/managed-users#invite-a-user-to-an-account) to the account from the accounts screen.

## Import users

> \[!WARNING]
>
> This feature isn't enabled for all organizations. If you don't see this feature for your organization, contact [Twilio support](https://help.twilio.com).

## Twilio Console

You can bulk import existing Twilio users belonging to your verified domain into your organization on the [**User management**](https://1console.twilio.com/organization/settings/users/managed-users) page.

1. Log in to [Twilio Console](https://1console.twilio.com) and navigate to [**Settings** > **Organization settings** > **User management**](https://1console.twilio.com/organization/settings/users/managed-users).
2. Click **Imported**.
3. Click **Import users** and follow the instructions.

## Legacy Twilio Console

You can bulk import existing Twilio users belonging to your verified domain into your organization by visiting the Admin Center's [**Users**](https://admin.twilio.com/import-users) section.

To import users, you must first have verified one or more domains. You can do that in the Admin Center's [**Domains**](https://admin.twilio.com/domains) section.

1. Log in to the [Console](https://console.twilio.com) and navigate to [**Twilio Admin / Admin Center > Import Users**](https://admin.twilio.com/import-users). If you have a verified domain, you may see a banner with a message that you have users eligible to import.
2. Click the **Import User** button and carefully read the instructions on how user import works.
3. Click **Continue**. You are then shown a new page with three options.
   * **Yes, I want to review a list of existing users using my domain** — This is the default option and you should use this option in most cases. With this option you are able to select one or more domains, review and select the users who can be imported to your Organization.
   * **I have already reviewed the CSV list of existing users using my domain and want to continue with the import** — This option should be used if you previously downloaded the list of users from your domain and want to import them now.
   * **No, I don't want to review. Import all existing users using my domain(s)** — With this option you are not able to review and select the users. If selected, all eligible users from the verified domains in your Organization are imported.
4. If you selected the option to review the list of users before importing, then you need to select from the verified domain(s) in your Organization. You can remove the pre-selected domains if you want to but you have to select at least one domain.
5. Click the **Download CSV of all users** button to download a CSV file containing the list of users who are eligible for import into your Organization.
6. Review the list of users and remove any users from the file who you don't want to import. Make sure that you save the file after making any changes. Note that the import only works for the users in this downloaded list. **If you add any other users to the file, the import will not work.**
7. When you are done making changes and you're ready to import, click **Next**. Select and upload the CSV file from the previous step. Note that only CSV files with the same format as the downloaded file are accepted.
8. Select whether you want Twilio to notify the users being imported via email or not.
9. Click **Next** to see a review of your selections thus far. Review the selected domains, count of users, and the notification option you have selected for the import.
10. Click the **Start importing users and accounts** button.
11. You are redirected to the **Import Users**. The status of the import process is displayed. You can revisit this page any time in future and see the import summary along with status and other details.

## Invite a user to an account

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to **Settings** > **Account settings** > **User management**.\
   The **User access** page opens.
2. Click **Invite users**.
3. Enter the email addresses for the users you want to invite.
4. Select the roles for each user, then confirm the invitation.

## Legacy Twilio Console

1. Log in to the [Console](https://console.twilio.com) and navigate to [**Twilio Admin > Accounts**](https://admin.twilio.com/managed-accounts).
2. Click on the name of the account you are managing.
3. Click on the **Users** tab.
4. Click the **Invite User** button.
5. In the **Invite User to Account** panel that now appears, enter their email address.
6. Choose their account role:
   * **Administrator** — They will be able to manage the account, including adding further users.
   * **Billing Manager** — They can only access Console pages related to account billing.
   * **Developer** — They have access to the account's development resources — they can add phone numbers and API credentials, for instance — but have no management control over it.
   * **Support** — They can only access the logs and usage.
7. Click **Submit**.

If the user is already part of your organization, they will be given access to the selected account according to the role you chose. If they are not yet part of your organization, they will be sent an email invitation — just like creating the user from scratch, as outlined above.

> \[!NOTE]
>
> Account roles are not exclusive. For example, a user can be assigned both the Developer and Billing Manager roles. Because the Administrator role has the same permissions as both of these roles, if you tick the **Administrator** box, the others will be de-selected. You find out more about account roles in [this support document](https://help.twilio.com/hc/en-us/articles/223136227-What-s-the-Difference-Between-User-Roles-Owner-Administrator-Developer-Billing-Manager-and-Support-).

## Remove a user from the organization

This action will remove a user's access to your organization and all managed accounts while leaving their user active. They can continue to log into Twilio and access accounts not managed by your organization, but can be invited to the organization and/or other managed accounts in the future.

1. Log in to the [Console](https://console.twilio.com) and navigate to [**Twilio Admin > Users**](https://admin.twilio.com/managed-users).
2. Click on the name of the user you are managing.
3. Click on the **Remove user** option at the bottom of the page
4. Check **I have reviewed and acknowledge the points above** to acknowledge:
   * This user will be removed from the Organization.
   * This user will lose access to all managed accounts.
   * The user will lose access to any role granted by the Organization.
   * Access to managed accounts can still be granted in the future.
   * The Organization will no longer be able to control the lifecycle or setting of the user.
5. Choose the owner of the account(s).
6. Click on the **Remove User** button.

You can select the same user as the owner of the accounts but the organization will no longer be able to control the lifecycle or setting of the account(s). If you want to keep the account under the organization's control, select a new user who is a managed user of the organization.

## Delete a user

This action will immediately delete and remove the user from Twilio's system, but not the accounts they own or have access to. They can create a new user for that email again in the future, but will not have access to the accounts they were previously invited to.

1. Log in to the [Console](https://console.twilio.com) and navigate to [**Twilio Admin > Users**](https://admin.twilio.com/managed-users).
2. Click on the name of the user you are managing.
3. Click on the **Delete User** option at the bottom of the page
4. Review and check off all acknowledgements on the **Delete User** pop-up screen.
5. Choose the owner of the account(s).
6. Click on the **Delete User** button.
