# Get started with Automation

> \[!NOTE]
>
> To access this feature, upgrade to Advanced Marketing Campaigns from [Your Products][].

To send a recurring email or drip series to contacts at a defined cadence, create an Automation series. Once you create an Automation, the messages trigger when you add recipients to a linked list or segment.

With Automation, you can build email campaigns to:

* Welcome new contacts when they join your list with a warm message and introductory tips.
* Engage contacts who've downloaded an asset from you with follow-up content.
* Promote an upcoming event to a list of invitees with a series of reasons to attend.

To work with Automations, log in to the [Twilio SendGrid console][console].

## Prerequisites

Complete the following tasks before you create an Automation:

* Add a [notification][] email
* Create [Unsubscribe Groups][]
* Add a [sender][]
* Add a [contact list][list]

## Create an Automation

Twilio SendGrid provides two types of Automations: Welcome and Custom.

To receive messages from your Automation, you must add contacts to the chosen list or segment for entry criteria *after* you enable the Automation.

## Custom Automation

To create a Custom Automation:

1. Go to **Marketing** > **Automations**.
2. Click **Create an Automation**.
3. Under **Custom**, click **Select**.
4. Define the automation workflow and settings.
   | Question                                                                              | Properties             | Action                                                                                                                                                                                                                                                                                                                                                                                                                                       |
   | ------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | **What is the name of this automation?**                                              | Automation Name        | Enter a human-readable name for this Automation series.                                                                                                                                                                                                                                                                                                                                                                                      |
   | **When will your contacts enter the automation?**                                     | Entry Criteria         | Choose the [list][] or [segment][] that this series targets. Any contact added to this list or segment gets sent the messages in the series. Change the default value of **All Contacts**. Otherwise, any contact you add also gets added to this Automation series, resulting in additional unwanted email messages.                                                                                                                        |
   | **When will your contacts leave the automation?**                                     | Exit Criteria          | Choose the condition that removes a contact leaves the workflow:                                                                                                                                                                                                                                                                                                                                                                             |
   |                                                                                       |                        | **Contacts have received all emails in the automation**: The contact exits the Automation series after they receive every message in the series.                                                                                                                                                                                                                                                                                             |
   |                                                                                       |                        | **Contacts no longer meet the entry criteria**: Before sending an email message in your series, Twilio SendGrid checks that each contact belongs to the entry criteria list or segment. Any contacts on the list or segment get removed from the next send.                                                                                                                                                                                  |
   |                                                                                       |                        | **Contact meets following criteria**: To filter and remove contacts from your Automation, you can build a specific condition. Recipients that meet this condition exit the Automation series within 24 hours. Twilio SendGrid limits each parent account and [subuser][] to *15* exit criteria across all Teammates. When you reach that limit, you can't duplicate, save, or enable Automations using **Contact meets following criteria**. |
   | **What Unsubscribe Group and Categories would you like to assign to these messages?** | [Unsubscribe Group][]  | Choose the group into which Twilio places recipients who unsubscribe from your email series.                                                                                                                                                                                                                                                                                                                                                 |
   |                                                                                       | [Categories][category] | Choose or create one or more self-titled topics that help organize and track your email series.                                                                                                                                                                                                                                                                                                                                              |
   |                                                                                       | [IP Pools][]           | If you have dedicated IP addresses grouped into IP Pools, choose a pool through which Twilio sends messages in the Automation series.                                                                                                                                                                                                                                                                                                        |
   | **What email(s) are included in your automation?**                                    |                        | Define either a single message or a workflow for a series of messages. Choose when each message gets sent. Keep workflows to 10 messages, longer workflows risk server timeouts and save failures.                                                                                                                                                                                                                                           |
   [category]: /docs/sendgrid/glossary/categories
   [IP Pools]: /docs/sendgrid/ui/account-and-settings/ip-pools
   [list]: /docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns/#add-contacts
   [segment]: /docs/sendgrid/ui/managing-contacts/segmenting-your-contacts
   [subuser]: /docs/sendgrid/ui/account-and-settings/subusers
   [Unsubscribe Group]: /docs/sendgrid/ui/sending-email/create-and-manage-unsubscribe-groups/#create-an-unsubscribe-group
   #### View parameters and operators for criteria
   Choice of criteria parameters
   | Grouping        | Parameter             | Data type |
   | --------------- | --------------------- | --------- |
   | Contact Profile | First Name            | String    |
   |                 | Last Name             | String    |
   |                 | Email                 | String    |
   |                 | Address Line 1        | String    |
   |                 | Address Line 2        | String    |
   |                 | City                  | String    |
   |                 | State Province Region | String    |
   |                 | Postal Code           | String    |
   |                 | Country               | String    |
   |                 | Phone Number ID       | String    |
   |                 | External ID           | String    |
   |                 | Anonymous ID          | String    |
   |                 | Date Added            | Date      |
   |                 | Last Updated          | Date      |
   | Email Activity  | Last Clicked          | Date      |
   |                 | Last Opened           | Date      |
   |                 | Last Emailed          | Date      |
   | Single Sends    | Single Send Activity  | Event     |
   | Automation      | Automation Activity   | Event     |
   | Custom Fields   |                       | String    |
   Operators applied to parameters
   ## String operators
   * is
   * is not
   * contains
   * does not contain
   * starts with
   * does not start with
   * ends with
   * does not end with
   * is blank
   * is not blank
   ## Timestamp operators
   * is
   * is not
   * is after
   * is at or after
   * is before
   * is at or before
   * on
   * not on
   * is between
   * is not between
   * is within
   * is not within
   ## Event operators
   * was sent
   * has clicked
   * has opened
   #### Warning about categories and personal information
   > \[!CAUTION]
   >
   > Twilio stores category names as non-[*personally identifiable information* (PII)][pii]. Twilio SendGrid doesn't treat this data as PII.
   >
   > * Twilio can use this data for counting or other operations as Twilio SendGrid runs its systems.
   > * You can't redact or remove these fields.
   > * Twilio employees can view this value.
   > * Twilio stores this data long-term, even after you've left the Twilio SendGrid platform.
   [pii]: /docs/glossary/what-is-personally-identifiable-information-pii
5. To design your email message, click **Add Email Content**. The **Select a Design** page appears.
   1. Choose from either **Your Email Designs** or **SendGrid Email Designs**.\
      As you hover over each design, text appears under the design indicating which editor, if any, someone used to create the design. You can choose a different editor, but Twilio recommends the editor displayed.
   2. Hover over your chosen template and click **Select**. The **Select Your Editing Experience** page appears.
   3. Click **Select** in either the [**Code Editor**][code-editor] or [**Design Editor**][design-editor] box.
   4. Design the email message using the editor.
   5. Click **Save**.
   6. To return to the Automation series, click **←**.
6. To add more emails to this automated series, click **Add an Email**. This adds a timing block and email message to the Automation.
   1. To edit the send timing from the previous email message in the series, click ✎ (edit button) for the added message. The **Select Send Time** panel appears.
   2. Change the number of units of time in the box and the units of time in the dropdown menu. From this dropdown, choose **day(s)** and **hour(s)**.
   3. Click **Update**.
   4. Repeat the previous step and this step until you have added all email messages to your Automation series.
7. After creating all of your emails for the Automation, click **Save**.
8. Click **Automation Options**, then **Set Live**.

## String operators

* is
* is not
* contains
* does not contain
* starts with
* does not start with
* ends with
* does not end with
* is blank
* is not blank

## Timestamp operators

* is
* is not
* is after
* is at or after
* is before
* is at or before
* on
* not on
* is between
* is not between
* is within
* is not within

## Event operators

* was sent
* has clicked
* has opened

## Welcome Automation

The pre-built **Welcome** Automation provides a template for creating your tailored welcome series. To create a Welcome Series:

1. Go to **Marketing** > **Automations**.
2. Click **Create an Automation**.
3. Under **Welcome**, click **Select**.
4. Define the automation workflow and settings.
   | Question                                                                              | Properties             | Action                                                                                                                                                                                                                                                                                                                                                                                                                                       |
   | ------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | **What is the name of this automation?**                                              | Automation Name        | Enter a human-readable name for this Automation series.                                                                                                                                                                                                                                                                                                                                                                                      |
   | **When will your contacts enter the automation?**                                     | Entry Criteria         | Choose the [list][] or [segment][] that this series targets. Any contact added to this list or segment gets sent the messages in the series. Change the default value of **All Contacts**. Otherwise, any contact you add also gets added to this Automation series, resulting in additional unwanted email messages.                                                                                                                        |
   | **When will your contacts leave the automation?**                                     | Exit Criteria          | Choose the condition that removes a contact leaves the workflow:                                                                                                                                                                                                                                                                                                                                                                             |
   |                                                                                       |                        | **Contacts have received all emails in the automation**: The contact exits the Automation series after they receive every message in the series.                                                                                                                                                                                                                                                                                             |
   |                                                                                       |                        | **Contacts no longer meet the entry criteria**: Before sending an email message in your series, Twilio SendGrid checks that each contact belongs to the entry criteria list or segment. Any contacts on the list or segment get removed from the next send.                                                                                                                                                                                  |
   |                                                                                       |                        | **Contact meets following criteria**: To filter and remove contacts from your Automation, you can build a specific condition. Recipients that meet this condition exit the Automation series within 24 hours. Twilio SendGrid limits each parent account and [subuser][] to *15* exit criteria across all Teammates. When you reach that limit, you can't duplicate, save, or enable Automations using **Contact meets following criteria**. |
   | **What Unsubscribe Group and Categories would you like to assign to these messages?** | [Unsubscribe Group][]  | Choose the group into which Twilio places recipients who unsubscribe from your email series.                                                                                                                                                                                                                                                                                                                                                 |
   |                                                                                       | [Categories][category] | Choose or create one or more self-titled topics that help organize and track your email series.                                                                                                                                                                                                                                                                                                                                              |
   |                                                                                       | [IP Pools][]           | If you have dedicated IP addresses grouped into IP Pools, choose a pool through which Twilio sends messages in the Automation series.                                                                                                                                                                                                                                                                                                        |
   | **What email(s) are included in your automation?**                                    |                        | Define either a single message or a workflow for a series of messages. Choose when each message gets sent. Keep workflows to 10 messages, longer workflows risk server timeouts and save failures.                                                                                                                                                                                                                                           |
   [category]: /docs/sendgrid/glossary/categories
   [IP Pools]: /docs/sendgrid/ui/account-and-settings/ip-pools
   [list]: /docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns/#add-contacts
   [segment]: /docs/sendgrid/ui/managing-contacts/segmenting-your-contacts
   [subuser]: /docs/sendgrid/ui/account-and-settings/subusers
   [Unsubscribe Group]: /docs/sendgrid/ui/sending-email/create-and-manage-unsubscribe-groups/#create-an-unsubscribe-group
   #### View parameters and operators for criteria
   Choice of criteria parameters
   | Grouping        | Parameter             | Data type |
   | --------------- | --------------------- | --------- |
   | Contact Profile | First Name            | String    |
   |                 | Last Name             | String    |
   |                 | Email                 | String    |
   |                 | Address Line 1        | String    |
   |                 | Address Line 2        | String    |
   |                 | City                  | String    |
   |                 | State Province Region | String    |
   |                 | Postal Code           | String    |
   |                 | Country               | String    |
   |                 | Phone Number ID       | String    |
   |                 | External ID           | String    |
   |                 | Anonymous ID          | String    |
   |                 | Date Added            | Date      |
   |                 | Last Updated          | Date      |
   | Email Activity  | Last Clicked          | Date      |
   |                 | Last Opened           | Date      |
   |                 | Last Emailed          | Date      |
   | Single Sends    | Single Send Activity  | Event     |
   | Automation      | Automation Activity   | Event     |
   | Custom Fields   |                       | String    |
   Operators applied to parameters
   ## String operators
   * is
   * is not
   * contains
   * does not contain
   * starts with
   * does not start with
   * ends with
   * does not end with
   * is blank
   * is not blank
   ## Timestamp operators
   * is
   * is not
   * is after
   * is at or after
   * is before
   * is at or before
   * on
   * not on
   * is between
   * is not between
   * is within
   * is not within
   ## Event operators
   * was sent
   * has clicked
   * has opened
   #### Warning about categories and personal information
   > \[!CAUTION]
   >
   > Twilio stores category names as non-[*personally identifiable information* (PII)][pii]. Twilio SendGrid doesn't treat this data as PII.
   >
   > * Twilio can use this data for counting or other operations as Twilio SendGrid runs its systems.
   > * You can't redact or remove these fields.
   > * Twilio employees can view this value.
   > * Twilio stores this data long-term, even after you've left the Twilio SendGrid platform.
   [pii]: /docs/glossary/what-is-personally-identifiable-information-pii
5. The pre-built Welcome series includes three placeholder emails by default.\
   Perform the following tasks for each email:
   1. Click on the **Subject** or **From Sender** links. The **Edit Inbox Details** panel appears.
   2. Update the email subject from the **Subject** box.
   3. Choose a sender from the **Sender** dropdown menu.
   4. Click **Update**. The [**Edit Automation**][edit-auto] page appears.
   5. Click **Save**.
6. To add more emails to this Automation series, scroll to the end of the Automation series and click **Add an Email**. This adds a timing block and email message to the Automation.
   1. To edit the send timing from the previous email message in the series, click ✎ (edit button) for the added message. The **Select Send Time** panel appears.
   2. Change the number of units of time in the box and the units of time in the dropdown menu. From this dropdown, choose **day(s)** and **hour(s)**.
   3. Click **Update**.
   4. Update the subject and sender for the added message.
   5. Click **Add Email Content**. The **Select a Design** page appears.
   6. Choose from either **Your Email Designs** or **SendGrid Email Designs**.\
      As you hover over each design, text appears under the design indicating which editor, if any, someone used to create the design. You can choose a different editor, but Twilio recommends the editor displayed.
   7. Hover over your chosen template and click **Select**. The **Select Your Editing Experience** page appears.
   8. Click **Select** in either the [**Code Editor**][code-editor] or [**Design Editor**][design-editor] box.
   9. Design the email message using the editor.
   10. Click **Save**.
   11. To return to the Automation series, click **←**.
7. Click **Save**.
8. Click **Automation Options**, then **Set Live**.

## String operators

* is
* is not
* contains
* does not contain
* starts with
* does not start with
* ends with
* does not end with
* is blank
* is not blank

## Timestamp operators

* is
* is not
* is after
* is at or after
* is before
* is at or before
* on
* not on
* is between
* is not between
* is within
* is not within

## Event operators

* was sent
* has clicked
* has opened

## Manage Automations

To edit, delete, or duplicate your Automations, return to the **Automations** page.

### Duplicate an Automation

To duplicate an Automation:

1. Go to **Marketing** > **Automations**.
2. Find the Automation you want to duplicate.
3. Select the Action Menu to the right of the Automation.
4. Click **Duplicate**.
5. Once you create the duplicate, the Automation will open to the edit page. From here, you can change any or all of the settings within the Automation.

### Edit an Automation

You can edit the content, subject line, and sender for any emails in your Automation. To edit an Automation:

1. Go to **Marketing** > **Automations**.
2. Select the series you want to edit.
3. From the list of Automations, choose an existing Automation.
4. Click **Edit** on each email you'd like to modify.
   To create a template from an existing email within your Automation series, click `⋮` (action menu) next to the email you'd like to reuse and selecting **Create Template**.
5. Make your changes in the editor, then click **Save**.
6. Click the arrow in the upper left-hand corner.
7. The edited email displays an alert that changes have not yet been applied to the live Automation.
   1. If you want to apply the changes, click **Save and Apply**.

### Disable an Automation

When you disable an Automation, your Automation stops sending messages from its series to the contacts in its linked lists or segments. While your Automation remains disabled, you can't add contacts to its linked lists or segments.

To disable an Automation:

1. Go to **Marketing** > **Automations**.
2. Find the Automation series you want to disable.
3. Click `⋮` (action menu) next to the Automation.
4. Click **Disable Automation**.

### Re-enable an Automation

When you re-enable the Automation, contacts might resume receiving email messages from where they left off in the series. This depends on the timing of the interval between email messages:

* If the interval hasn't elapsed, contacts receive email messages from the series.
* If the interval has elapsed, contacts don't receive email messages from the series.

When Automations in a disabled state, don't add contacts to their entry criteria lists. These contacts don't get added to the Automation.

To re-enable a disabled Automation:

1. Go to **Marketing** > **Automations**.
2. Find the Automation series you want to re-enable.
3. Click `⋮` (action menu) next to the Automation.
4. Click **Set Live**.

## Automation use cases

To illustrate how you would use an Automation series, consider the following examples.

### Segment-triggered nurture series

Automations can encourage your free customers to upgrade to paid customers. Consider a [drip campaign][].

This type of Automation sends messages to free users until they meet one of two conditions:

* They reach the end of the email sequence
* They upgrade to paid

1. Create a [segment][] called **Free customers**.
2. Set the target condition to contacts with the custom field **Plan Type** set to `Free`.
3. Create an Automation.
4. Set **What is the name of this automation?** to `Free Customers`.
5. Set **When will your contacts enter the automation?** to:
   1. **The first time a contact** `Free customers`.
   2. Choose **is added to a segment**
   3. Select the `Free customers` segment.
6. Set the exit criteria as **Contacts no longer meet entry criteria**.
7. Draft a series of emails that encourage contacts to pay for your service.

Whenever you add a contact who has the **Free** plan type, this Automation adds them to the relevant segment and enters them into its series. If they upgrade their plan during the drip series, Automation removes them from the series.

[list]: /docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns/#add-contacts

[notification]: /docs/sendgrid/ui/account-and-settings/notifications

[sender]: /docs/sendgrid/ui/sending-email/senders

[Unsubscribe Groups]: /docs/sendgrid/ui/sending-email/create-and-manage-unsubscribe-groups

[Your Products]: https://app.sendgrid.com/account/billing/choose_plan_marketing_campaigns

[edit-auto]: #edit-an-automation

[drip campaign]: /docs/sendgrid/glossary/drip-campaign

[segment]: /docs/sendgrid/ui/managing-contacts/segmenting-your-contacts

[console]: https://app.sendgrid.com

[design-editor]: /docs/sendgrid/ui/sending-email/design-editor

[code-editor]: /docs/sendgrid/ui/sending-email/code-editor
