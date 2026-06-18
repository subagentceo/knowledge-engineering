# Manage your templates with the Content Template Builder

This guide explains how to manage your templates using the Content Template Builder in the Twilio Console. Learn how to search and filter existing templates, view template details, delete and duplicate templates, submit templates for WhatsApp approval, and manage templates programmatically using the Content API.

## Twilio Console

### Search and filter existing content templates

**Search**: Search for templates by name or by any of the text content in the template. Text content includes fields like **Body**, **Title**, **Subtitle**, **Header Text**, or **Friendly Name**.

To search in the Console, enter the parameters you want to search or filter by. The Templates table will update in real time to show a matching subset of templates.

You can also search by using the Content API:

`GET` "https://content.twilio.com/v2/ContentAndApprovals?ChannelEligibility=whatsapp:unsubmitted\&Language=en"

To learn how to use the v2 template search API endpoint in the Content API, see the [Content API resources page](/docs/content/content-api-resources#template-search---v2).

### View template details

Click on the template name to view its details. You can edit the template by clicking the **Edit** button or submit the template for WhatsApp approval by clicking the **Submit for WhatsApp approval** button.

### Delete templates

To delete a template, go to **Actions**, click ⋮ and select the delete option. By clicking the **Delete** button and confirming deletion, the template will no longer be available in the Content template Builder, the Content API, or on the WhatsApp Business Account.

### Duplicate templates

To duplicate a template, go to **Actions**, click ⋮ and select the duplicate option. Duplicating a template allows you to create a new template with a different name or language and edit the new template. This is especially useful for translating a template into a different language.

### Submit templates for WhatsApp approval

To submit a template for WhatsApp approval, view your template and click the **Submit for WhatsApp approval** button. Submitting to WhatsApp for approval requires you to choose a WhatsApp template category. The entire template is submitted for WhatsApp approval. WhatsApp usually approves or rejects template submissions in 48 hours or less.

## Legacy Twilio Console

If you're using the *legacy* Twilio Console, see the following details on how to manage your templates.

### Search and filter existing content templates

**Search**: Search for templates by name or by any of the text content in the template. Text content includes fields like **Body**, **Title**, **Subtitle**, **Header Text**, or **Friendly Name**.

**Filter**: Filter templates by their **Language**, **Content Type**, **Last Updated**, or **Channel Eligibility**.

To search in the Console, enter the parameters you want to search or filter by and click the **Apply Search** button to get a matching subset of templates. You can use multiple search and filter parameters simultaneously to obtain a more specific set of templates. To access the UI, go to the Twilio Console and navigate to **Messaging** > **Content template Builder** or visit [Messaging > Content Template Builder](https://console.twilio.com/us1/develop/sms/content-template-builder).
You can also search by using the Content API:

`GET` "https://content.twilio.com/v2/ContentAndApprovals?ChannelEligibility=whatsapp:unsubmitted\&Language=en"

To learn how to use the v2 template search API endpoint in the Content API, see the [Content API resources page](/docs/content/content-api-resources#template-search---v2).

### View template details

Click on the template name to view its details. You can also access additional management options by clicking the select menu (⋮). From this menu, you can duplicate or delete templates, copy the ContentSid to your clipboard, or view the template.

From the **Details** page, you can review previously created templates. Editing templates is not supported. To make changes, use the [duplicate template feature](#duplicate-templates).

The **General Information** section provides details about the template's content type, language, last update, approval status, and more.

The **Supported Channels** section explains which channels your template can be sent to based on template type and approval status.

### Delete templates

To delete a template, click the select menu (⋮) or go to the **template Details** page and select the delete option. By clicking the **Delete** button and confirming deletion, the template will no longer be available in the Content template Builder, the Content API, or on the WhatsApp Business Account.

### Duplicate templates

To duplicate a template, click the select menu (⋮) or go to the **template Details** page and select the duplicate option. Duplicating a template allows you to create a new template with a different name or language and edit the new template. This is especially useful for translating a template into a different language.

### Submit templates for WhatsApp approval

You can submit a template for WhatsApp approval both at the time of creation and separately within the **template Details** page. Submitting to WhatsApp for approval requires you to indicate a template category. The template's approval status will be visible in the **template Details** page. To learn about best practices to avoid template rejections, see [Message template approval criteria](/docs/whatsapp/tutorial/message-template-approvals-statuses#message-template-approval-criteria).

## Content API

For all Content API endpoints for managing templates programmatically, see [Content API Public Endpoints](/docs/content/content-api-resources).

## Template status change alerts

Twilio supports new error codes for `Approved`, `Rejected`, and `Paused` WhatsApp templates. With [Twilio Alarms](/docs/messaging/guides/debugging-tools#custom-alerts), you can be notified through webhook or email when these and other errors occur.

To learn more, see [Alerts for Rejected and Paused WhatsApp templates now available](https://www.twilio.com/en-us/changelog/alerts-for-rejected-and-paused-whatsapp-templates-now-available).
