# Stopping an in-progress send

> \[!CAUTION]
>
> If you are looking for information on how to cancel a scheduled email or campaign, see [Canceling a Scheduled Send](/docs/sendgrid/for-developers/sending-email/stopping-a-scheduled-send/).

## Stopping Transactional Email

Stopping an ongoing send that is using SMTP or the Web API can be tricky, because we strive to accept and send email requests as quickly as possible. Sometimes stopping an accidental send is not possible. However, following are several suggestions for how to halt a send in progress or a send that you have scheduled.

### 1. Change Your API Key or Password

Changing your [API key](https://app.sendgrid.com/settings/api_keys) or [password](https://app.sendgrid.com/settings/account) can break your existing email integration by causing a mismatch between what your app is trying to authenticate with and what SendGrid has on record.

This method is great if you have a runaway script or have just started a send accidentally. Be sure to verify that the credentials your app is using belong either to the parent account or a [teammate](https://app.sendgrid.com/settings/teammates) so you can change the proper one.

Using an API key has the added benefit of breaking only the services for which the key has permissions. In addition to enhanced security, the ease of change afforded by an API key is one reason we recommend using API keys to authenticate with our services.

> \[!CAUTION]
>
> We cannot guarantee that changing your API key or password will prevent 100% of your email requests from being delivered. We only recommend this method as a last resort that may allow you to stop at least some of your emails from being sent.

### 2. Contact Support

[SendGrid Support](https://support.sendgrid.com/hc/en-us) has the ability to clear any emails currently pending delivery from your account. There is a very small window of opportunity between when we accept an email request and when we actually attempt delivery to the recipient. Emails can build up in this queue, and upon request, Support can delete them entirely.

## Stopping a Marketing Campaign

You have several options for canceling or unscheduling a campaign.

### Using the User Interface

If you have **Send Immediately** under the **Scheduling** dropdown menu in the campaign builder set to OFF, then you only have a very brief window of opportunity to cancel the campaign after clicking **Send Campaign**. You have 2 options:

1. **Deleting the Campaign**

   Navigate to your [Campaigns page](https://sendgrid.com/marketing_campaigns/ui/campaigns). Find the campaign you want to stop, click the action menu and select **Delete**.
2. **Canceling the Campaign**

   Navigate to your [Campaigns page](https://sendgrid.com/marketing_campaigns/ui/campaigns). Find the campaign you want to stop and click the little red X next to the campaign name to cancel the campaign. Click **Confirm** in the confirmation window that appears. You'll see the status of your campaign change to "Canceled".

   ![Monthly Newsletter campaign in progress with cancel option highlighted.](https://docs-resources.prod.twilio.com/ec6492fc578304a6eb3bcb318991dcf6aae5fbd85ed560dbec37d423d9ecf047.png)

   ***

   ![Dialog box asking to confirm canceling email campaign with Cancel and Confirm buttons.](https://docs-resources.prod.twilio.com/396a6667473b7c09d1f6aa3336b3e9068cf54860f3748fe9490c1cab1785b260.png)

   ***

   ![Monthly Newsletter campaign canceled, 100% delivered, 0% unique opens.](https://docs-resources.prod.twilio.com/022caf0a46e10e7d8f7ffed73896d02e665cc567b97eee8b473e682b33126d21.png)

### Using the SendGrid API

#### New Marketing Campaigns

You can [cancel a scheduled send](https://sendgrid.api-docs.io/v3.0/single-sends/delete-single-send-schedule) by making a call to `/marketing/singlesends/{id}/schedule` where `{id}` is the ID of the Single Send you want to stop. A successful deletion will return a `200`.

#### Legacy Marketing Campaigns

You can [delete a campaign](https://sendgrid.api-docs.io/v3.0/campaigns-api/unschedule-a-scheduled-campaign) by making a call to `/v3/campaigns/{campaign_id}` where `{campaign_id}` is the ID of the campaign you want to stop. A successful deletion will return a `204`.

`DELETE https://api.sendgrid.com/v3/campaigns/{campaign_id}`

`HTTP/1.1 204`
