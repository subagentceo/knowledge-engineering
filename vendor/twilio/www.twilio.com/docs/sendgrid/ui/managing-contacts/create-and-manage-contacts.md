# Manage contacts

> \[!NOTE]
>
> These tutorials cover the latest version of Marketing Campaigns. If you're using the legacy version of Marketing Campaigns, your experience might differ. To send email with the Twilio SendGrid Email API, see the [API reference][] or the [SMTP Reference][].

[API reference]: /docs/sendgrid/api-reference

[SMTP Reference]: /docs/sendgrid/for-developers/sending-email/getting-started-smtp

This activity covers creating and setting the properties of potential recipients of your email messages called *contacts* and grouping the contacts into *contact lists*.

## What to consider when adding contacts

When you create a contact, it requires a unique identifier and it impacts your Twilio SendGrid limits, billing, and configured automations.

### Requires a unique identifier

Each contact requires a unique identifier assigned to it. Twilio SendGrid supports setting one of the following four fields as an identifier for a contact. The chosen identifier must be unique among all contacts in your account. If you provide more than one identifier, only one of those identifiers must be unique.

* **Email**. Primary email address that your contact uses.

  This serves as the default contact identifier as every Twilio SendGrid contact requires an email address.
* **Phone Number ID**. Primary phone number that your contact uses.

  The **Phone Number ID** field differs from the existing **Phone Number** field.

  #### View the differences between these fields

  | Characteristic                 | Phone Number ID field | Phone Number field |
  | ------------------------------ | --------------------- | ------------------ |
  | Must be unique value           | **Yes**               | **Yes**            |
  | Serves as a reserved field     | No                    | **Yes**            |
  | Serves as a contact identifier | **Yes**               | No                 |
  | Must use [E.164 format][e164]  | **Yes**               | **Yes**            |

  You can store the same value in both fields but that's not required.
* **External ID**. An identifier that links with data stored in an external system.
  * Twilio provides this ID for flexibility in your use cases.
* **Anonymous ID**. An identifier that link an anonymous contact with data stored in an external system.
  * Twilio provides this ID for flexibility in your use cases.

### Impacts your plan billing and limits

* Adding contacts might affect your [Twilio SendGrid bill][sg-overage].
* Deleting and re-adding contacts counts toward your [monthly limit of added contacts][mc-storage].

### Impacts your automations

* Twilio triggers automations only for contacts that you added to an entry criteria list *after* you activated the automation.
* Contacts added to a list before you activate the automation don't receive any email messages in the series.

## Add contacts to your account

To add contacts to Marketing Campaigns, choose from these four methods:

1. [Upload multiple contacts listed in a CSV file][add-csv].
2. [Add one at a time from the Twilio SendGrid console][add-ui].
3. [Create and deploy a signup form][add-form].
4. [Use the Contacts API][add-api].

### Add multiple contacts using a CSV file

To add multiple contacts at a time, upload a comma-separated value (CSV) file. These CSV files can contain a maximum of one million contacts or 5 GB in file size, whichever is less.

1. Download this [CSV template](https://docs-resources.prod.twilio.com/documents/contacts-upload-example-updated_2.csv). It ensures the correct format for your import.
2. Log in to the Twilio SendGrid console if needed.
3. Go to [**Marketing** > **Contacts**][sgc-contacts] in the Twilio SendGrid console.
4. From the **Add Contacts** menu, select **Upload CSV**.
5. A page displays where you can choose where you want to add your contacts:
   * **All Contacts**
   * To an existing list
   * To a new list you create
6. Upload your CSV file using one of two options:
   * Drag and drop it onto the upload box.
   * Click the **select a CSV file to upload**.
7. Click **Next: Review CSV Upload**.
8. Another page displays that lists all fields related to your contacts. This displays fields without a corresponding reserved or system field.
9. With each unmapped field, choose one of three options:
   1. Select a custom field from the drop-down.
   2. Click **Create New Custom Field** for a new custom field.
   3. Choose **Skip Column** for any fields you don't want to map.
10. When you're done mapping the fields, click **Next: Add Contacts**.
11. This queues your contacts for upload. Added contacts might take some time to display depending on the number of contacts added.
12. After Twilio processes the CSV file, it sends you a [notification][] email.

[CSV template]: /documents/contacts-upload-example-updated_2.csv

[notification]: /docs/sendgrid/ui/account-and-settings/notifications

[sgc-contacts]: https://mc.sendgrid.com/contacts

### Add a single contact from the console

You can add your contacts from the Contacts page.

1. Log in to the Twilio SendGrid console if needed.
2. Go to [**Marketing** > **Contacts**][sgc-contacts] in the Twilio SendGrid console.
3. Click **Add Contacts** then select **Manual Add**.
4. Choose where you want to add your contacts:
   * **All Contacts**
   * To an existing list
   * To a new list you create
5. Add your contact's email address and any other data you possess.
6. Click **Add Contacts**.

### Add a single contact using a signup form

To capture contacts and add them to Marketing Campaigns, create, then embed, [signup forms][]. You can create up to 15 signup forms.

#### Create a signup form

To create a signup form in the Twilio SendGrid console:

1. Log in to the Twilio SendGrid console if needed.
2. Go to [**Marketing** > **Signup Forms**][].
3. Click **Create a Signup Form**.
   A page displays with configuration tabs and a preview of the form.
4. On the **Settings** tab, add a **Form Name**.
5. You can populate the **Add contacts to** field with any of your contacts lists, including **All Contacts**.
6. Add a **Confirmation Message**. This field contains the text that contacts will see once they've submitted the form.
7. To add fields to the form, go to the **Build** tab.
   * To label your form, set a **Header** and any **Intro Copy** that might help customers understand the purpose of your form.
   * To set tracking data, add [Reserved Fields][] and [Custom Fields][] to the form.
     * Expand the **Reserved Fields** and **Custom Fields** menus then select any fields you want to include.
     * The selected fields display in the form preview beside the **Build** tab.
       If a contact exists in your contact database, any added or updated data gets added to or changed in that existing contact.
8. To change the look of your form, use the **Styles** tab. From this tab, you can modify fonts, colors, button styles, and the form's width.
9. Select **Save & Apply**.

#### Embed your signup form in a web page

To share a form, either embed it into your own web pages or send a direct link to the form to your customers. Twilio SendGrid hosts the link. If you choose to embed your form, it displays within an [`<iframe>`][] HTML tag.

To share the code for your signup form:

1. Log in to the Twilio SendGrid console if needed.
2. Go to the signup form you want to share or embed.
3. Click the Action menu (⋮) then select **Share Code**.
4. A modal opens where you can copy how to get to reach your form:
   * **Landing Page**. A direct link to the Twilio SendGrid-hosted form that you can paste anywhere, including in an email or on a social media site.
   * **Direct Embed**. Embeddable `<iframe>` HTML code that you can paste into the HTML of your website wherever you want to display the form.

## Find a contact

To find and view a specific contact profile:

1. Log in to the Twilio SendGrid console if needed.
2. Go to [**Marketing** > **Contacts**][sgc-contacts]. You can also search a specific list or your **All Contacts** list.
3. Type the [identifier][understand-contact-identifiers] into the **Search by identifier** field.
   * Search terms are case insensitive.
   * Partial search terms require a minimum of three characters from the beginning of the identifier.
4. Click **Search** (🔍).
5. From the search results, click the contact's identifier. The **Contact Details** page for that contact appears.

The **Contact Details** page includes three tabs: **Reserved Fields**, **Custom Fields**, and **Associated Lists** filled with the related data. You can filter custom fields using these data types: **Text**, **Date**, and **Number**.

## Edit a contact

Contact details include the Twilio SendGrid-provided reserved fields, any custom fields you've added for the contact, and any associated contact lists.

To edit a contact:

1. View the contact as described in [Find a contact][find-a-contact].
2. Click the tab with the data you want to edit:

   ## Reserved Fields

   3. Go to [**Marketing** > **Contacts**][sgc-contacts].
   4. Search for the contact you want to edit.
   5. Click the identifier of the contact you wish to edit. That contact's **Contact Details** page displays.
   6. Click the **Reserved Fields** tab.
   7. Click **✎ Edit**. The **Edit Reserved Fields** panel appears.
   8. Edit any of the displayed fields, except **Email**. That field is both required and immutable.

      #### View the list of fields

      **General**

      * First Name
      * Last Name

      **Identifier**

      * Phone Number ID
      * External ID
      * Anonymous ID

      **Address**

      * Address Line 1
      * Address Line 2
      * City
      * State Province Region
      * Postal Code
      * Country

      **Additional**

      * Alternate Emails
      * Phone Number
      * Whatsapp
      * Line
      * Facebook
      * Unique Name
   9. Accept or decline your changes:
      * To accept the changes, click **Save**.
      * To decline the changes, click **Cancel**.
        The **Edit Reserved Fields** panel closes.

   ## Custom Fields

   3. Go to [**Marketing** > **Contacts**][sgc-contacts].
   4. Search for the contact you want to edit.
   5. Click the identifier of the contact you want to edit. That contact's **Contact Details** page appears.
   6. Click the **Custom Fields** tab.
   7. Find the custom field you want to change.
   8. Click **✎** (Edit). The **Edit Custom Field** panel appears.
   9. Type the value for the custom field.
   10. Accept or decline your changes:
       * To accept the changes, click **Save**.
       * To decline the changes, click **Cancel**.
   11. The **Edit Custom Field** panel closes.

   ## Associated Lists

   3. Go to [**Marketing** > **Contacts**][sgc-contacts] and search for the contact you want to add to a list.
   4. Click the identifier of that contact. This displays that contact's **Contact Details** page.
   5. Click the **Associated Lists** tab.
   6. Click **Add to List**. The **Add to List** panel appears.
   7. Click the **Select a List** menu.
   8. Click your desired list.
   9. Click **Add**. The **Add to List** panel closes.

> \[!NOTE]
>
> * To modify a contact's identifier, Twilio recommends using the API. With the API, you can [delete the identifier][Delete a Contact Identifier] then [update the contact][Update Contact].
> * To modify an identifier field from the console, [delete the existing contact][sgc-delete-contact] then [create another contact][sgc-add-contact] with updated identifier values.

## Maintain contact list health

Sending to a well-managed address list improves successful message deliveries. List maintenance involves identifying and removing contacts flagged as undeliverable or unwanted.

### Identify suppressed email addresses

When an email sender like Twilio SendGrid chooses not to send an email message to a specific email address, they *suppress* that email address. Twilio SendGrid adds contacts to one of several different [suppression][] lists based on reasons that the recipient or recipient system provide:

* The receiving email server or ISP rejects, or [blocks][], an email message. This might occur because the recipient has a full mailbox or the server received too many messages too quickly.
* The receiving email server [bounces][] the email message. This might occur for reasons like the following:
  * The recipient's address is invalid.
  * The domain name doesn't exist.
  * The recipient is unknown.
* The recipient chose to [unsubscribe from your email marketing][unsubscribes].
* The recipient gave an [invalid email address][invalid-email].
* The recipient reported your email message as [spam][spam-reports].

When you attempt to send email messages to addresses listed in the **Bounces**, **Invalid**, **Spam Reports**, **Group Unsubscribes**, and **Global Unsubscribes** suppression lists, Twilio SendGrid supresses that attempt. You can and *should* delete these email addresses from your lists.

When you attempt to send an email to a suppressed address, the attempt consumes one email message attempt from your account quota.

### Delete suppressed contacts

As your campaigns continue, contacts might fall into a group unsubscribe, block, bounce, invalid email address, or spam report status. If you attempting to send email to these contacts, your reputation score decreases. These contacts don't want to and can't receive your marketing emails. Removing suppressed contacts involves downloading and aggregating all suppression lists into a single CSV, uploading that CSV as an additional list, then deleting that list.

To remove all of your suppressed Marketing Campaigns contacts:

1. Log in to the Twilio SendGrid console if needed.
2. Click **Suppressions**.
3. For every link under **Suppressions**, export the displayed list as a CSV file.
   1. Click the Action menu (gear wheel).
   2. Select **Export CSV**.
   3. Save each CSV file to the same directory on your computer.
4. Merge the downloaded lists into a single CSV file using the software of your choice outside the Twilio SendGrid console.
5. Go to the left-hand menu, then select **Marketing** > **Contacts**.
6. Click **Add Contacts**, then select **Upload CSV**. The **Upload CSV** page appears.
7. Click **Add Contacts to a new list**.
   Type a memorable name for this new list like `Remove Invalid Emails`.
8. Upload your CSV file in one of two ways:
   1. Drag and drop your CSV file into the upload box.
   2. Click **select a CSV file to upload** then **Next: Review CSV Upload**.
9. Map fields to the columns for your contacts.
   * Select a custom field from the drop-down.
   * Choose **Skip Column** for any fields you don't want to map.
   * The CSV reports return fields without pre-existing columns such as **reason**. Choose **Skip Column** for these fields.
10. Click **Next: Add Contacts**.
11. Twilio adds your contacts to the created list. This may take some time depending on the number of contacts.
12. Once you populate your list with these contacts, the **Marketing** > **Contacts** page shows a **Count** for that list.
13. Click the **Action** menu (⋮) next to your created list then select **Delete This List**.
14. A confirmation modal appears and asks if you want to delete the list by itself or the list with its associated contacts.
15. Select **all \<Number> contacts associated with this list.**
16. The confirmation button changes. Click **Delete This List and All \<Number> Contacts**.
17. Twilio queues this list and all associated contacts for deletion. Your contact count may take some time to update.

## Delete contacts from your account

Separate from list maintenance, you might remove one or more contacts in response to a change in marketing strategy.

### Delete individual contacts from your account

To delete a contact from your account:

1. Log in to the Twilio SendGrid console if needed.
2. Go to [**Marketing** > **Contacts**][sgc-contacts].
3. Go to the [**All Contacts**][sgc-contacts-all] list.
4. Search for the contact you want to delete. The contact should display in the list.
5. Choose how you want to delete the contact:
   * Click **Delete This Contact** next to the contact.
   * Click the link on the contact's identifier. That contact's **Contact Details** page appears.
     * Click **Delete Contact**.
6. A confirmation modal appears: **Are you sure you want to delete this contact?**.
   * To delete the contact from your account, click **Delete This Contact**.
   * To keep the contact in your account, click **Cancel**.

In compliance with the [GDPR][], Twilio deletes the contact from your account.

### Delete all contacts from your account

To delete permanently all of your contacts from your account at once:

1. Log in to the Twilio SendGrid console if needed.
2. Go to [**Marketing** > **Contacts**][sgc-contacts].
3. Click the Action menu (⋮) next to the **All Contacts** list.
4. Select **Delete All Contacts**. A confirmation modal appears: **Are you sure you want to delete all contacts?**.
5. To confirm the deletion, type `Delete All Contacts` in the form box. This turns on the **Delete All Contacts** button.
6. Click **Delete All Contacts**.

## Manage signup forms

The Action menu (⋮) on the Signup Forms page provides the following options.

* **Preview**
* **Edit**
* **Share Code**
* **Duplicate**
* **Delete**

As `<iframe>` technology displays the signup form, the form updates its display anywhere you embed the form each time you click **Save & Apply**.

## Manage contact lists

Sending to a well-managed address list improves successful message deliveries.

### Create a contact list

To create a contact list:

1. Log in to the Twilio SendGrid console if needed.
2. Go to [**Marketing** > **Contacts**][sgc-contacts].
3. Choose **New List** from the **Create** menu.
4. Type a name for this list in the **List Name** box.
5. Click **Save List**.

### Add a contact to a contact list

To add a contact to a contact list:

1. Log in to the Twilio SendGrid console if needed.
2. Go to [**Marketing** > **Contacts**][sgc-contacts] and search for the contact you want to add to a list.
3. Click the identifier of that contact. This displays that contact's **Contact Details** page.
4. Click the **Associated Lists** tab.
5. Click **Add to List**. The **Add to List** panel appears.
6. Click the **Select a List** menu.
7. Click your desired list.
8. Click **Add**.

### Remove a contact from a contact list

To remove a contact from a contact list:

1. Log in to the Twilio SendGrid console if needed.
2. Go to [**Marketing** > **Contacts**][sgc-contacts] and search for the contact you want to remove from a contact list.
3. Click the identifier of the found contact. This displays that contact's **Contact Details** page.
4. Click the **Associated Lists** tab.
5. Find the list from which you want to remove from the contact.
6. Click **Remove from list** (trash icon) next to that list. A confirmation modal appears: **Are you sure you want to remove this contact from this list?**.
7. Click **Remove List**.

This dissociates the contact with the specified list.

### Delete a contact list

> \[!WARNING]
>
> Before deleting a list, verify that the list, or any segments derived from it, aren't associated with a scheduled Single Send. If a you trigger a Single Send after deleting a list associated with that send, the contacts in that list might not receive the Single Send.

When deleting a contact list, the console offers two options:

1. Delete a list and retain the contacts in your account. This removes a list with no impact to its contacts.
2. Delete a list *and* delete all of its associated contacts from your account. This removes the list and its associated contacts from your account.

To delete a contact list:

1. Log in to the Twilio SendGrid console if needed.
2. Go to [**Marketing** > **Contacts**][sgc-contacts] in the Twilio SendGrid console.
3. From the Action menu (⋮), select **Delete This List**.
4. A confirmation modal appears: **Are you sure you want to delete this list?** offering two choices:
   * **Only delete this list and keep contacts associated with this list**
     1. To delete the list only but retain its associated contacts in your account, select this option.
     2. Click **Delete This List**.
     3. The modal closes and removes the list.
   * **Delete this list and permanently delete all \<#> contacts associated with this list from my account**
     1. To delete the list and its associated contacts from your account, select this option.
     2. Click **Delete This List and All \<#> Contacts**.
     3. The modal closes and removes the list and its associated contacts.

> \[!NOTE]
>
> When deleting a contact list, you can delete associated contacts from your account. You can't delete contacts associated with a segment in the same way. To delete a segment and delete its associated contacts, do both as separate operations: delete the contacts from your account and delete the segment. To learn more about working with segments, see the [segmentation][] documentation.

## Export contacts

To view the contents of a contact list, you can export the list to a CSV and download it to your computer.

1. Log in to the Twilio SendGrid console if needed.
2. Go to [**Marketing** > **Contacts**][sgc-contacts].
3. Locate the contact list you want to export and click the Action menu (⋮) next to the list.
4. Click **Export**.
   * This starts an export.
   * The **Active Exports** page displays with the following banner:
     ```text
     You successfully initiated your export.
     You'll receive an email notification when your export is ready to download.
     ```
   * When Twilio finishes building the export list:
     1. The **Active Exports** page refreshes with the export request displayed.
     2. Twilio sends you an email message.
5. If you left the **Active Exports** page, return to that [**page**][sgc-exports].
   * This page lists of all exports ready for download.
6. Locate your desired exported contacts list, then click **Download CSV**.

You can download the generated CSV files for 12 hours after you *initiated* the export.

## Contact management APIs

You can use the Contact Management API for list management. To learn more, see the [Marketing Campaigns Contact APIs][].

## Additional resources

* [Custom fields][]
* [Format a CSV file][]
* [Segment your contacts][]

[**Marketing** > **Signup Forms**]: https://mc.sendgrid.com/forms/signup

[`<iframe>`]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe

[add-api]: #contact-management-apis

[add-csv]: #add-multiple-contacts-using-a-csv-file

[add-form]: #add-contacts-using-a-signup-form

[add-ui]: #add-contacts-from-the-console

[blocks]: /docs/sendgrid/glossary/blocks

[bounces]: /docs/sendgrid/glossary/bounces

[Custom Fields]: /docs/sendgrid/ui/managing-contacts/custom-fields

[Delete a Contact Identifier]: /docs/sendgrid/api-reference/contacts/delete-a-contact-identifier

[e164]: /docs/glossary/what-e164

[Format a CSV file]: /docs/sendgrid/ui/managing-contacts/formatting-a-csv

[GDPR]: https://sendgrid.com/resource/general-data-protection-regulation-2

[invalid-email]: /docs/sendgrid/glossary/invalid-email

[Marketing Campaigns Contact APIs]: /docs/sendgrid/api-reference/contacts

[mc-storage]: https://support.sendgrid.com/hc/en-us/articles/1260802574530-Marketing-Campaigns-New-Contact-Storage

[Reserved Fields]: /docs/sendgrid/ui/managing-contacts/custom-fields/#reserved-fields

[Segment your Contacts]: /docs/sendgrid/ui/managing-contacts/segmenting-your-contacts

[segmentation]: /docs/sendgrid/ui/managing-contacts/segmenting-your-contacts

[sg-overage]: https://support.sendgrid.com/hc/en-us/articles/40779261694875-Twilio-SendGrid-Overage-Rates

[sgc-contacts-all]: https://mc.sendgrid.com/contacts/all

[sgc-contacts]: https://mc.sendgrid.com/contacts

[sgc-exports]: https://mc.sendgrid.com/contacts/exports

[Signup Forms]: https://mc.sendgrid.com/forms/signup

[spam-reports]: /docs/sendgrid/glossary/spam-reports

[suppression]: /docs/sendgrid/ui/sending-email/index-suppressions

[understand-contact-identifiers]: #understand-contact-identifiers

[unsubscribes]: /docs/sendgrid/glossary/unsubscribes

[Update Contact]: /docs/sendgrid/api-reference/contacts/add-or-update-a-contact

[find-a-contact]: #find-a-contact

[sgc-delete-contact]: #delete-individual-contacts-from-your-account

[sgc-add-contact]: #add-contacts-to-your-account
