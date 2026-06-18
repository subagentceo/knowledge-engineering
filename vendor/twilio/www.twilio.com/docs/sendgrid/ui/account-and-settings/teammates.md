# Teammates

Teammates allows multiple users, or Teammates, to send emails from a single SendGrid account. It enables groups of users with different roles and responsibilities to share one account, providing each user with access to specific SendGrid features based on their needs. By granting individual team members access only to the features necessary for their roles, you can limit access to sensitive areas of your account. Teammates makes it easy to add, remove, and manage different users.

> \[!NOTE]
>
> Free and Essentials plans allow for adding one Teammate per account and don't offer Single Sign-On (SSO), while Pro and higher plans allow for up to 1,000 teammates and include SSO and other features. [Learn more about the different Email API Plans](https://sendgrid.com/en-us/pricing).

## Adding Teammates

As an account owner or administrator, you can add a Teammate to your SendGrid account. Depending on your Email API Plan, you have the option to add a [password](#add-a-password-teammate) or an [SSO](#add-an-sso-teammate) Teammate. A password Teammate logs in with a username, password, and Twilio SendGrid 2FA (when configured), while the latter logs in via SSO.

### Free and Essentials plans

You can add one password Teammate to your account using the [SendGrid UI](https://login.sendgrid.com/login/identifier):

1. Navigate to **Settings** and click on **Teammates**.
   This is where you can see the list of all of your current Teammates with their details: username, email address, first name, and last name.
2. To add a new Teammate, click **Add Teammate**.
3. Enter the Teammate's email address and then select their [permission level](#configuring-permissions).
   Depending on the selected permission level, you may need to do some additional permission configuration.
4. Click **Invite**.
   Your pending invitation should appear on the **Invited** list next to **All**. The **Invited** list contains the email address of the invitee and the invitation expiration date.

### Pro and Premier plans

You can add up to 1,000 Teammates to your account. On these plans, you have the option to add a Teammate via password or [SSO](#add-an-sso-teammate) authentication:

#### Add a password Teammate

1. Navigate to **Settings**, and click on **Teammates**.
2. On the Teammates page, click **Add Teammate > Add password Teammate**.
3. Refer to steps 3 and 4 in [Adding Teammates: Free and Essentials Plans](#free-and-essentials-plans).

#### Add an SSO Teammate

Before adding an SSO Teammate, [enable Single Sign-On](/docs/sendgrid/ui/account-and-settings/sso) for your SendGrid account. To add a Teammate:

1. Navigate to **Settings**, and click on **Teammates**.
2. Click **Add Teammate > Add SSO Teammate**.
3. Enter the Teammate's email address, first name, and last name.
4. Select **Add to this parent account** or **Add to specific subuser accounts**. If you're adding a Teammate to the parent account, select their [permissions](#configuring-permissions). Click **Invite**. If you're adding a Teammate to a specific subuser account, search for the subuser account on the next screen to assign the new Teammate to. Click **Save**.

> \[!NOTE]
>
> Teammate invitations are valid for 7 days. Before the expiration, you can resend or delete the invitation.
>
> While only account owners and administrators can create Teammates, it's possible for an administrator to create another Teammate with administrator permissions. This new Teammate will then be able to create and manage other Teammates and have access to the account's billing settings. **Please be very careful when assigning administrator permissions**.

> \[!NOTE]
>
> Only administrator Teammates may impersonate [subusers](/docs/sendgrid/ui/account-and-settings/subusers).

## Multi-account access with one credential

As an existing SendGrid user, you can access multiple SendGrid accounts through a single, shared SendGrid and Twilio credential. This is useful if you manage multiple accounts or subusers and want to switch between them without needing to log in and out.

The multi-account access feature is available for Twilio Login users.

### How it works

* Teammates are added to a SendGrid account using the standard teammate invitation process on the teammate management page.
* SendGrid users who log in with [Twilio Login](/docs/sendgrid/ui/account-and-settings/twilio-login-overview), either as [new signups](https://www.twilio.com/en-us/blog/products/launches/announcing-twilio-signup-sendgrid-segment) or [existing linked users](https://www.twilio.com/en-us/blog/insights/sendgrid-twilio-single-login), can be invited to a second SendGrid account using the same email address.
* When the user accepts the invitation, they gain access to the second SendGrid account, without needing to create new credentials.

> \[!WARNING]
>
> If you're not using Twilio Login, the teammate invitation may fail with an "email already exists" error, or you may unintentionally create a separate set of credentials that's not linked to your original account when accepting the invitation.

#### How to check if you're using Twilio Login

To ensure you're using Twilio Login, check if you're redirected to the Twilio Login page when signing into SendGrid. If you're redirected, you're using Twilio Login.

Since mid-2024, all SendGrid signups and teammate invitations automatically use Twilio Login. If you signed up before mid-2024, you may need to [link your SendGrid account to your Twilio account](/docs/sendgrid/ui/account-and-settings/twilio-login-overview#linking-your-sendgrid-account-to-your-twilio-account) to use Twilio Login.

If you can't link your SendGrid account to your Twilio account, your account may not be eligible yet. As a workaround, you can delete and recreate the teammate using your target email address.

### Multi-account Console

After you log in, you'll see an account selection page where you can select which account to access. This page displays both the account friendly name and its unique user ID. By default, the account friendly name is set to "My SendGrid account," but account administrators can change this name in the account settings.

The user ID is unique to each parent account or subuser, and is also displayed on the account settings page. Click **Login** and you're in the SendGrid dashboard for that account.

![Twilio SendGrid account dashboard with options to log in to multiple accounts and a logout button.](https://docs-resources.prod.twilio.com/97db2d98df914e4dd1647c8c77337431dfc34e72ed208658377d7a5b865eca45.png)

If you need to switch accounts, use the top navigation button in the Console to return to the account selection page.

![Twilio SendGrid logo with Production Email USA dropdown and Dashboard icon.](https://docs-resources.prod.twilio.com/9bb11fc791896748e54d24900ed882240417ee0a0e9424f56a0918e582ea08a4.png)

**Note**: Admin Teammates who have full [subuser access](/docs/sendgrid/ui/account-and-settings/sso#sso-and-subuser-access) will see the **View Subusers** option when they toggle the top navigation button. Selecting this option will take them to a separate account selection page where they can choose a subuser account to manage.

![Twilio SendGrid setup screen with options to create sender identity and learn email sending via API or marketing campaigns.](https://docs-resources.prod.twilio.com/f31cce6d9db7114f709d3453765faf0558b47a5052898552b6b57286e9f9bb6a.png)

## Receive a Teammate invitation

After a SendGrid account administrator adds you as a Teammate, your onboarding flow is determined by the type of Teammate invitation.

### Password Teammate invitation

If you are added as a password Teammate, SendGrid sends you a welcome email with a link to set up your profile.

1. Click the link in the welcome email, which takes you to the Twilio signup page.
2. Set up your credentials (email address and password).
3. Set up two-factor authentication (2FA), which is required for future logins.
4. You are then redirected to the SendGrid dashboard with your assigned permissions.

### SSO Teammate invitation

Consult with your SSO administrator for logging in as an SSO Teammate and understanding your SendGrid account permissions.

> \[!NOTE]
>
> An administrator can grant SSO Teammates restricted access to specific subuser accounts and define their permissions for each subuser.

## Manage Teammates

### Configuring permissions

There are three permission levels:

* **Restricted Access -** Teammates with no access to a feature can't change that feature's settings or view it within the SendGrid UI. However, you can still [grant them access to specific features](#grant-feature-access).
* **Read-only Access -** Teammates with read-only access won't be able to change or configure a feature. However, they will be able to view any information provided by that feature.
* **Admin -** Teammates with full access that can view and make any changes.

If you select **Invite with Restricted Access** when inviting a Teammate, you need to select a preset access level or create your own by selecting **Custom Access**. You can choose from several predefined permission levels to fit a variety of roles: Developer Access, Marketer Access, and Accountant Access or you can customize access for the Teammate.

*To modify an existing Teammate's permissions:*

1. Navigate to the **Teammates Page** under **Settings**.
2. Under the list of current teammates, click the action menu next to the teammate you would like to edit.
3. Click **Edit** to open a modal window presenting the teammate's current permissions.
4. Make your desired changes and click **Update**.

### Removing Teammates

*To delete a Teammate*:

1. Navigate to the **Teammates** page under **Settings**.
2. Click the action menu next to the Teammate you want to delete and click **Delete**.

> \[!CAUTION]
>
> You can't recover deleted Teammates. Once a Teammate has been deleted, it can never be restored. SendGrid won't remove any templates, campaigns, contacts, or API keys created by the Teammate.

## Request feature access

If you are already signed into a SendGrid account as a Teammate, but don't have access to a page or feature, you may request access to that page by clicking **Request Access**.

Once a request is made, all account administrators receive a notification in the **Teammates** page (**Settings > Teammates**) that a request is pending approval.

### Grant feature access

You can find any access requests listed under **Pending Requests** on the **Teammates** page in your settings. The request will list the username of the Teammate, their email address, their first and last names, along with the feature that they requested access to.

To grant that Teammate access to the feature, click **Approve**.

> \[!CAUTION]
>
> **By clicking "Approve," you are giving that Teammate full access to the feature.** If you only want to give them limited access to the feature, you must navigate back to their Teammate settings to adjust their granular permissions.

If you don't want to grant them access, click **Deny**.

For a complete list of permissions or scopes available to a Teammate, see [**Teammate Permissions**](/docs/sendgrid/ui/account-and-settings/teammate-permissions).

> \[!NOTE]
>
> The Teammate receives a notification email when they're either granted or denied access. SendGrid delivers these emails, but the "reply to" address is the email address on file for the account owner.

## Teammates and API keys

API keys are used to authenticate API calls. Just as a Teammate can be given specific permissions, API keys can be assigned specific [permissions](/docs/sendgrid/api-reference/api-key-permissions) to restrict which API calls they can authenticate.

> \[!NOTE]
>
> You can use API keys and Teammates as different methods of restricting access to the same SendGrid features.
>
> However, a Teammate can't change their own permissions via API key. For example, a Teammate with restricted access to features in the SendGrid user interface but full access to API Keys can't make an API call to modify their permissions in the UI.

## Related resources

* [API Reference](/docs/sendgrid/api-reference/teammates/invite-teammate)
* [Glossary](/docs/sendgrid/glossary/teammates)
* [Blog Post: Introducing Our New Teammates Feature](https://sendgrid.com/en-us/blog/secure-account-sharing-introducing-our-new-teammates-feature)
