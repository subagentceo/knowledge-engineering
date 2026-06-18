# Account Details

Both the Twilio Login and the SendGrid account **Account Details** include two sections: **Your Account** and **Your Company**. This guide explains what you can edit on this console screen.

If you use [Twilio Login](/docs/sendgrid/ui/account-and-settings/twilio-login-overview), update your personal and account details in the [Twilio Console](https://console.twilio.com). If you have any questions about Twilio Login or need assistance, reach out to the [SendGrid support team](https://support.sendgrid.com/).

## Your account

This section provides Twilio with the necessary information to contact you with alerts and notifications as well as send and track your emails.

## Personal information

This section includes your name, email address and telephone number. For SendGrid Login users, it also includes your username and password.
SendGrid Login users *can* edit these values.
If you use Twilio Login, you can [edit these values in the Twilio Console](/docs/trust-hub/trusthub-rest-api/console-create-a-primary-customer-profile#build-an-individual-primary-customer-profile). Your Twilio Login email address is your username.

### Edit personal info

SendGrid Login users can edit the following fields.

1. Click the pencil icon to the right of the **Personal Info** section.
2. Type the first name of the representative from your company whom Twilio should contact in the **First Name** field.
3. Type the last name of the representative from your company whom Twilio should contact in the **Last Name** field.
4. Type the email address where Twilio contacts your company representative for any account-level alerts and notifications, including billing.
   This must be a valid and active email address that you check regularly.
5. To save the changes, click **Save**; to discard the changes, click **Cancel**.
6. If you change your contact email, the Console prompts you to send a confirmation email to this new email address.
   Click **Send Confirmation Email**.
7. In your email application, open the confirmation email from Twilio SendGrid and **click the confirmation link**. This ensures you receive account updates at your new email address.

### Edit SendGrid credentials

SendGrid login users *can* edit the **Username** and **Password** fields.

> \[!WARNING]
>
> *If you change the **Username**, all of your calls to SendGrid will stop working immediately.*

1. Click the pencil icon to the right of the **Username** field.
2. Enter the SendGrid Username that accesses our API and our SMTP Relay in the **Username** field.
3. Once you change the username, click **Save** to keep, or click **Cancel** to discard, the changes.
4. Click the pencil icon to the right of the **Password** field.
5. Enter a new password in the **Password** field.
   All SendGrid account passwords have the following requirements:

   * Contain between 16 to 128 characters
   * Can't contain repeating characters of 3 or more consecutive characters (like `AAAbcdef`)
   * Can't contain username or email information
   * Can't contain non-ASCII characters
6. To keep the changes, click **Save** or, to discard the changes, click **Cancel**.

### Edit your account information

You can find your SendGrid account details under the **Personal info** section, including:

* **Parent ID**: A unique, 16-digit hexadecimal identifier that begins with `sg`. This identifier is unique for the top-level SendGrid account. Provide this ID when filling support requests.
* **Account ID**: A unique identifier for both the top-level SendGrid account and any subuser accounts.
* **Account Friendly Name**: The name of your SendGrid account. Only an admin can change the friendly name.

You *can* edit the **Time Zone** field.

1. Click the pencil icon to the right of the **Time Zone** field.
2. From the **Time Zone** dropdpwn menu, select the [time zone](/docs/sendgrid/glossary/timezone/) in which your preferred company location conducts business. Other SendGrid features, such as [Statistics](/docs/sendgrid/ui/analytics-and-reporting/stats-overview/) and scheduling in [Marketing Campaigns](/docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns/) also use this value. Set your time zone to match your preferred company location. If your scheduled sends or statistics appear incorrect, verify your time zone.
3. To keep the changes, click **Save** or, to discard the changes, click **Cancel**.

## Your company

This section contains the identifying data for your company: its name, billing address, and website.

### Edit the company name

To set or update the name of your company, follow these steps.

1. Click the pencil icon to the right of the **Name** field.
2. Type the legal or DBA name of your company in the **Name** field.
3. Once you change the company name, click **Save** to keep, or click **Cancel** to discard, the changes.

### Edit the company billing address

To set or update the billing address for the preferred location where your company conducts business, follow these steps. The preferred location could be the corporate headquarters, a regional office, or a local office.

1. Click the pencil icon to the right of the **Address** block.
2. Type the first line of the address in the **Address 1** field.
3. Type the second line of the address in the **Address 2** field.
4. Type the city of the address in the **City** field.
5. Type the state or province of the address in the **State** field.
6. Type the country of the address in the **Country** field.
7. Type the postal or ZIP code of the address in the **Zip** field.
8. Once you change the address, click **Save** to keep, or click **Cancel** to discard, the changes.

### Edit the company website

To set or update the website of your company, follow these steps.

1. Click the pencil icon to the right of the **Website** field.
2. Type the URL of your company website in the **Website** field.
3. Once you change the website URL, click **Save** to keep, or click **Cancel** to discard, the changes.
