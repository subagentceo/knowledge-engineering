# Subusers

> \[!NOTE]
>
> Subusers require a paid Twilio SendGrid account. If you have a **Pro or Premier API plan** or an **Advanced Marketing Campaigns Plan**, you may create up to 15 subusers through your account. If you require more subusers, submit a ticket at [Twilio SendGrid Support](https://support.sendgrid.com).

Subusers help you segment your email sending and API activity. When you create the subuser, you can assign it permissions and credit limits. Consider creating subusers for each type of email you send: one subuser for transactional emails and another for marketing emails. This allows you to generate separate statistics for each type.

## Create a subuser

By default, new Twilio SendGrid accounts *don't* include subusers. To create subusers, use the parent account.

To create a new subuser, follow these steps.

1. Log in to [app.sendgrid.com](https://app.sendgrid.com/).
2. Navigate to **Settings** in the Twilio SendGrid app.
3. Click [**Subuser Management**](https://app.sendgrid.com/settings/subusers).
4. Click **Create New Subuser**.
5. Enter the username that your subuser uses to access the app and the API into the **Username** field.
6. Enter a valid contact email address for this subuser into the **Email Address** field.
   This must be an active email account as Twilio may contact a subuser to provide support, resolve sending and deliverability issues, or to enforce [Twilio's Terms of Service](https://www.twilio.com/en-us/legal/tos). Whenever we contact a subuser, we contact the parent account at their email address at the same time.

   If you use a [gravatar](https://gravatar.com) for other applications, Twilio adds it to the **Avatar** field. Twilio associates the gravatar with this subuser when you enter a linked email address. This simplifies identifying all of the subusers attached to your account.
7. Enter the password associated with the subuser's username in the **Password** field.
8. Assign an IP Address to the subuser account.
   Twilio assigns you a dedicated IP address when you create a Pro 100k plan or higher. If you send at a high volume, and you're using subusers to separate out your sending traffic, it's best practice to purchase a separate IP for each sending type.

## Manage subusers

To manage a subuser from the SendGrid app, follow these steps.

1. Navigate to **Settings** and select **Subuser Management**.
2. Select the name of the subuser. This takes you to the subuser's account and profile settings. From there, you can manage and update your subuser Settings.

You can also manage subusers with [Subuser API](/docs/sendgrid/api-reference/subusers-api).

### Provide optional profile information

If the data doesn't match your parent account's data, providing this data for this subuser improves deliverability. If an issue arises with the subuser's account, Twilio can contact your subuser to resolve it.

Optional data for a subuser profile includes the following fields.

| Field                | Intended Value                                         |
| -------------------- | ------------------------------------------------------ |
| First Name           | Given name of the person responsible for this subuser. |
| Last Name            | Surname of the person responsible for this subuser.    |
| Company              | Name of your subuser's company.                        |
| Address 1            | First line of your subuser's business address.         |
| Address 2            | Second line of your subuser's business address.        |
| City                 | City of your subuser's business address.               |
| State                | State or province of your subuser's business address.  |
| Country              | Country of your subuser's business address.            |
| Zip                  | Postal code of your subuser's business address.        |
| Company Phone Number | Phone number for your subuser's business.              |
| Company Website      | Website for your subuser's business.                   |

### Allocate or remove credits from a subuser

> \[!NOTE]
>
> To allocate credits, select the nonrecurring or recurring credit option.

If your subuser account has non-recurring or recurring credits, you can allocate credits to, or remove credits from this subuser account. On the subuser's profile, click **Change Credit Rules** and then choose the appropriate credit amount for the subuser.

You may assign more credits to your subuser regardless of having the recurring option on **Change Credit Limits**.

### Deactivate a subuser account

To turn off a subuser's access to SendGrid on a temporary basis, follow these steps.

1. Log in to [app.sendgrid.com](https://app.sendgrid.com/).
2. Navigate to **Settings** in the Twilio SendGrid app.
3. Click [**Subuser Management**](https://app.sendgrid.com/settings/subusers).
4. Locate the subuser account to disable.
5. Click on the subuser's name to view their account details.
6. Click **Disable Account**.

To re-enable a subuser's account, follow the previous steps 1-3, then click **Enable Account**.

### Delete a subuser account

> \[!CAUTION]
>
> You can't undo deleting a subuser account. Deleting this subuser results in immediate revocation of all Twilio SendGrid access.

1. Log in to [app.sendgrid.com](https://app.sendgrid.com/).
2. Navigate to **Settings** in the Twilio SendGrid app.
3. Click [**Subuser Management**](https://app.sendgrid.com/settings/subusers).
4. Locate the subuser account to delete.
5. Click on the subuser's name to view their account details.
6. On the **Account Settings** page, click **Delete**.
   A confirmation window displays.
7. Click **Confirm**.

The deleted subuser loses all Twilio SendGrid access.

## Link a subuser to a dedicated IP address

Linking subusers to [dedicated IP addresses](/docs/sendgrid/ui/account-and-settings/dedicated-ip-addresses) can help separate your sending traffic and improve your deliverability rate.

1. Log in to [app.sendgrid.com](https://app.sendgrid.com/).
2. Navigate to **Settings** in the Twilio SendGrid app.
3. Click [**Subuser Management**](https://app.sendgrid.com/settings/subusers).
4. Click the subuser to which you want to link to a dedicated IP address.
5. Click **Change Sending**.
6. Under IP Addresses, select an IP address to link to the subuser.
7. Click **Save**.

## Impersonate a Subuser

When you set up subusers, you may want to see the subuser's settings and their view of the SendGrid UI.

To simplify this, you can impersonate a subuser from your parent account. From there, you can manage the subuser the same way as if you had logged in with that user's credentials. This doesn't require you to log out of your parent account.

## Twilio login users

1. Log in to your SendGrid account with your Twilio login. A vertical navigation bar displays at the top.
2. Go to the top navigation bar and click on the name of the SendGrid account. You find the account name in bold and within a white box to the right of the Twilio SendGrid logo.
3. When the submenu appears, click **View subusers**.
4. To impersonate a subuser, click that subuser's name.

This page refreshes. A yellow button displays **Subuser** to the right of the subuser's username.

### Switch to another subuser account

If you have more than one subuser, you *can* switch to another subuser. To impersonate a different subuser, repeat steps 2-4 in the previous section.

### Return to your parent account

Under the Account Name submenu, click **View all accounts**. Click the name of your parent account. This returns you to your parent account portal.

## SendGrid login users

1. Log in to the SendGrid app.
2. Click on your name above the navigation menu at the top left corner of the portal screen.
3. Click **Change Account**.
4. To impersonate a subuser, click that subuser's name.

The page refreshes. A message at the top of the screen displays "You're currently logged in as \[subuser name]".

### Switch to another subuser account

If you have more than one subuser, you *can* switch to another subuser. To impersonate a different subuser, click **Switch Subuser** in the top-right corner.

### Return to your parent account

Click the **Back to Parent Account** link at the top left. This logs you out of the subuser account and returns you to your parent account portal.

## Export subuser data

To compare the performance of your subusers, download the subuser data.

1. Log in to [app.sendgrid.com](https://app.sendgrid.com/).
2. Navigate to **Settings** in the Twilio SendGrid app.
3. Click [**Subuser Management**](https://app.sendgrid.com/settings/subusers).
4. Click **Export Data**.
   This downloads a CSV file with each subuser's reputation as well as the number of requests they made for the current and last month.

## Additional Resources

* [Assigning an Authenticated Domain to a subuser](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication#assign-to-a-subuser)
* [Teammates](/docs/sendgrid/ui/account-and-settings/teammates/)
