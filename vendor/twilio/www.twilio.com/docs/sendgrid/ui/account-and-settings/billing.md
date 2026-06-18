# Billing

Twilio SendGrid charges your account each month. To store, process, and manage payment card processing, Twilio SendGrid relies on a *Payment Card Industry Data Security Standard* (PCI DSS) compliant third-party billing provider.

You select your plan and set your payment method on the **Account Details** page.

## Manage your billing contact and payment details

When you create or upgrade to a paid account, Twilio SendGrid prompts you to add a credit card for payments.

* Twilio only accepts credit or debit cards.
* Twilio doesn't offer prepayment, quarterly billing, or annual billing.
* Twilio doesn't accept PayPal, wire transfer, checks, prepaid cards, or any card requiring a PIN.
* Twilio can arrange invoicing for customers with a minimum committed contractual spend of USD 12,000 per year or greater.

To learn how to read your bill, see [Reading your invoice][help-invoice].

### Update your credit or debit card

To update your credit card, complete the following steps.

1. Log in to the Twilio SendGrid console.
2. Go to **Settings** > **Account Details** > [**Billing**][sg-con-acct-bill].
3. Click the pencil icon next to your **Payment Method**.
4. Update the information requested in the boxes provided.
5. Click **Submit**.

### Download previous invoices

To export past invoices, complete the following steps.

1. Log in to the Twilio SendGrid console.
2. Go to **Settings** > **Account Details** > [**Billing**][sg-con-acct-bill].
3. Find the previous invoice in the **Invoices**.
4. Click the download icon next to the desired invoice.

### Create multiple sending users or email addresses

With Twilio SendGrid, you can set up multiple users to send emails from one account, create multiple email addresses billed under one account, or both. Only subusers impact your invoices.

* To enable multiple employees to send emails, create [teammates][teammate].
* To segment your emails between different audiences, create [subusers][subuser].

#### Subusers

To create [subusers][subuser], your account must have an Advanced Marketing Campaigns, Pro Email API, or Premier Email API plan. You can create up to 15 subusers. Subusers can create contacts and have their own contact and email send limits.

Subusers impact the invoice of a parent account in two ways:

* Twilio charges the parent account for each contact added to either a subuser account or parent account.
* Twilio charges the parent account for any overages a subuser exceeds under the parent account's plan limits.

> \[!NOTE]
>
> If you migrate from the **legacy Marketing Campaigns plan** to a free Marketing Campaigns plan, your plan won't include subusers. Free plans include one [Teammate][teammate] as one of the 100 contacts.

#### Teammates

Each teammate counts as a contact toward your contact limit. This impacts your invoice only if you exceed the contact limit for your account.

* Free and Essentials Email API plans and Free or Basic Marketing Campaigns plans include one additional teammate.
* Pro or Premier Email API plans and Advanced or Custom Marketing Campaigns plans include 1,000 additional teammates.

### Resolve account freezes or terminations

If your payment is overdue, your **Account Details** page displays a warning.

* If your [card on file gets declined][cc-declined], Twilio *freezes* your account.
  * To restore your account, [update your card on file][update-card]. Twilio SendGrid attempts to process the payment after you update the card on file.
* If your card on file got declined and you have not paid by the end of that month, Twilio *terminates* your account.
  * To restore your account, the account *owner* must contact [Twilio SendGrid support][sg-support] within six months of termination.
    * Any attempt to reactivate after these six months returns a prompt to create another account.
  * If the account subscribed to a Marketing Campaigns plan, the terminated account loses all stored contacts after 30 days.

## Manage your Twilio SendGrid plans

### Email packages

Twilio SendGrid offers two packages for sending email: *Marketing Campaigns* and the *Email API*.

* [Marketing Campaigns][mktg-campaigns] packages include both contacts stored and emails sent through Single Sends or Automation within Marketing Campaigns.
* [Email API][email-api] packages include charges for any emails sent with the Twilio SendGrid Email API. Sending emails with the API doesn't impact your Marketing Campaigns package plan.

### Change your Twilio SendGrid plan

To change your plans for the Email API or Marketing Campaigns, complete the following steps:

1. Log in to the Twilio SendGrid console.
2. Go to **Settings** > **Account Details** > [**Your Products**][sg-con-acct-prdts].
3. Click **Change Plan** under **Email API** or **Marketing Campaigns**.
4. Click **Select** next to the plan that you want to use going forward.
5. Click **Submit**.

### Considerations before you downgrade your plan

If you downgrade your plan, Twilio SendGrid reduces the allowed quantity of Signup Forms, teammates, subusers, and email testing credits to the next plan's limits.

**For example**: Your account plan, Advanced, has 15 Signup Forms. You choose to downgrade to a Free plan. Twilio SendGrid retains your last updated Signup Form and removes the other 14.

If you downgrade your plan to Free, Twilio SendGrid deletes all contacts in the account.

* Download your contacts before downgrading your account to a Free plan.
* After you downgrade, you can reimport your contacts into your account.

## Request a refund

Twilio SendGrid charges their plans as a monthly subscription, not based on direct usage. Refunds apply to the latest month's subscription charge. Twilio can't apply a refund to overage or contact storage charges from prior months.

To be eligible for a refund, your account must meet the following criteria:

* Hasn't been used in the current calendar month.
* Has no overages.
* Has no contacts stored in Marketing Campaigns.

If you meet these conditions, respond to your invoice email or contact [Support][sg-support] to discuss a refund.

To avoid any future subscription charges, cancel your account.

## Cancel your subscription

To cancel your paid subscription, a Twilio SendGrid user with Administrator privileges must perform the following steps:

1. Log in to the Twilio SendGrid Console.
2. Go to **Settings** > **Account Details** > [**Your Products**][sg-con-acct-prdts].
3. At the bottom of the **Your Products** page, click **Cancel Subscription**.
4. On the **Confirm Cancellation** modal, make your choice.
   * If you want to continue with your cancellation:
     1. Select **I have read and acknowledged the above information**.
     2. Click **Continue Cancellation**.\
        A survey displays prompting for the primary reason for your cancellation.
     3. Select your reason.
     4. Click **Continue Cancellation**.\
        Two more survey questions display:
        * Select **Yes** or **No** for the email solution move question.
        * Type your response to the improve service question.
     5. Click **Confirm Cancellation**.
   * If you decided not to cancel, click **Keep my Account**.

This procedure doesn't make the following changes:

* Delete your account
* Remove your account data
* Close your Twilio Login account

To learn more about cancelling or downgrading your account, see [**Cancel/Downgrade Your Twilio SendGrid Paid Subscription**][help-cancel].

## Delete your account

1. Complete the steps in [**Cancel your subscription**](#cancel-your-subscription).
2. Contact [Twilio SendGrid Support][sg-support] for help deleting accounts and account data.

## Additional resources

* [SendGrid Pricing][mktg-campaigns]
* [Reading your invoice][help-invoice]
* [Sales Taxes and Tax-Exempt Status](/docs/sendgrid/ui/account-and-settings/taxes-and-tax-exempt/)

[subuser]: /docs/sendgrid/ui/account-and-settings/subusers

[teammate]: /docs/sendgrid/ui/account-and-settings/teammates

[sg-con-acct-bill]: https://app.sendgrid.com/account/billing

[sg-con-acct-prdts]: https://app.sendgrid.com/account/products

[help-invoice]: https://support.sendgrid.com/hc/en-us/articles/4408349549083-How-to-Read-Your-Twilio-SendGrid-Invoice

[help-cancel]: https://support.sendgrid.com/hc/en-us/articles/4408348952859-Cancel-Downgrade-Your-Twilio-SendGrid-Paid-Subscription

[cc-declined]: https://help.twilio.com/articles/223183308-Why-doesn-t-my-credit-card-work

[sg-support]: https://support.sendgrid.com

[mktg-campaigns]: https://sendgrid.com/en-us/pricing?tab=1_2

[email-api]: https://sendgrid.com/en-us/pricing?tab=1_1

[update-card]: #update-your-credit-or-debit-card
