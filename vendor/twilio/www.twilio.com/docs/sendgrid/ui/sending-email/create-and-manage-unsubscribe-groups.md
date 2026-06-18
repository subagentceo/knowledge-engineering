# Manage recipients who unsubscribe

This tutorial describes the Marketing Campaigns experience. If you're using legacy Marketing Campaigns, your workflow and screens might differ. To learn more about the Marketing Campaigns experience, see [Twilio SendGrid Pricing](https://sendgrid.com/pricing).

## Create an Unsubscribe Group

Adding unsubscribe groups to your emails helps you comply with anti-spam laws, protect your sender reputation, and respect your recipients' preferences.

1. Log in to the Twilio SendGrid console.
2. Go to **Marketing** > **Unsubscribe Groups**.
3. Click **Create New Group**.
4. Add a human-readable name for this group in the **Group Name** box.
5. Add a human-readable description for this group in the **Group Description** box.
6. If you want the Unsubscribe Group displayed on the unsubscribe preferences page, select **Display this group on your unsubscribe preferences page**.
7. Click **Save Unsubscribe Group**.

> \[!NOTE]
>
> To view the unsubscribe preferences page, select the action menu next to an Unsubscribe Group and then click **Preview**. Toggle to the Unsubscribe Preferences tab to view all of the options listed.

## Add an Unsubscribe Group to your email

To add an Unsubscribe Group to your [Single Send][create-send] or [Automation][create-automation] series message, edit or create a message, then follow the steps

## Design editor

1. Open a design in the Design Editor.
2. Click the **Settings** drawer. The **Settings** panel appears.
3. From the **Build** tab, drag the **Unsubscribe** module into your message.
4. From the **Unsubscribe Group** dropdown menu, choose an existing Unsubscribe Group, **Create Unsubscribe Group**, or **Use Global Unsubscribe**.
   * If you choose **Create Unsubscribe Group**, the **Create an Unsubscribe Group** modal displays.
     1. Click **Create an Unsubscribe Group**.
     2. Follow the same steps from the [Create an Unsubscribe Group section][create-unsub-grp].
5. When you have finished changes to your design, click **Save**.

## Code editor

1. Open a design in the Code Editor.
2. Click the **Settings** drawer. The **Settings** panel appears.
3. From the **Unsubscribe Group** dropdown menu, choose an existing Unsubscribe Group, **Create Unsubscribe Group**, or **Use Global Unsubscribe**.
   * If you choose **Create Unsubscribe Group**, the **Create an Unsubscribe Group** modal displays.
     1. Click **Create an Unsubscribe Group**.
     2. Follow the same steps from the [Create an Unsubscribe Group section][create-unsub-grp].
4. Find the default unsubscribe block. All Twilio SendGrid templates include one.

   #### View the default HTML for an unsubscribe block

   ```html {title="Default HTML for an unsubscribe block"}
   <!-- !focus(12:20) -->
   <div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
     <div class="Unsubscribe--addressLine">
       <p class="Unsubscribe--senderName"
         style="font-size:12px;line-height:20px"
       >
         {{Sender_Name}}
       </p>
       <p style="font-size:12px;line-height:20px">
         <span class="Unsubscribe--senderAddress">{{Sender_Address}}</span>, <span class="Unsubscribe--senderCity">{{Sender_City}}</span>, <span class="Unsubscribe--senderState">{{Sender_State}}</span> <span class="Unsubscribe--senderZip">{{Sender_Zip}}</span>
       </p>
     </div>
     <p style="font-size:12px; line-height:20px;">
       <a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="font-family:sans-serif;text-decoration:none;">
         Unsubscribe
       </a>
       -
       <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="font-family:sans-serif;text-decoration:none;">
         Unsubscribe Preferences
       </a>
     </p>
   </div>
   ```

   * You can change the text `Unsubscribe` and `Unsubscribe Preferences` as you would any HTML link text.
5. When you have finished changes to your design, click **Save**.

## Custom unsubscribe link in Design editor

For senders with their own subscription management tools, Marketing Campaigns supports custom unsubscribe links.

1. Open a design in the Design Editor.
2. Click the **Settings** drawer. The **Settings** panel appears.
3. From the **Unsubscribe Group** dropdown menu, choose **Use custom link...**.
4. Type your unsubscribe link into the **Custom Unsubscribe Link** box.
5. Highlight any text within the body of your email where the link goes.
6. Click the small link icon.
7. In the **URL** field that displays, enter the tag `{{{unsubscribe}}}`.
8. When you have finished changes to your design, click **Save**.

Twilio SendGrid replace the Unsubscribe Tag with your custom URL.

## Add recipients to an Unsubscribe Group

To add recipients to an Unsubscribe Group, choose from three options: upload a CSV of email addresses, type each email address in the console, or use the API.

## Upload CSV of emails

To upload a CSV of recipients:

1. Find the group you want to add recipients to
2. Click the action dropdown menu (the three vertical dots).
3. Select **Upload a CSV**.
4. Drag the CSV you want to upload into the field or click **select a CSV file to upload** and locate the file you want to upload from your files.
5. Click **Upload CSV**.

## Type emails by hand

To add recipients to an Unsubscribe Group:

1. Find the group to which you want to add recipients.
2. Click the action dropdown menu (the three vertical dots).
3. Select **Manually Add**.
4. Enter a recipient email address.
5. Click **Save**.

## Use the API

* To create an Unsubscribe Group, see [Create a suppression group](/docs/sendgrid/api-reference/suppressions-unsubscribe-groups/create-a-new-suppression-group).
* To add email addresses to an Unsubscribe Group, see [Update a suppression group](/docs/sendgrid/api-reference/suppressions-unsubscribe-groups/update-a-suppression-group).

## Manage your unsubscribe groups

From the console, you can edit unsubscribe groups or download a list of recipients that have unsubscribed from your emails. To learn more about managing unsubscribed emails, see the [Suppressions Overview](/docs/sendgrid/ui/sending-email/index-suppressions/#managing-unsubscribes).

### Export an Unsubscribe Group list

To export an Unsubscribe Group list:

1. Go to the Unsubscribe Group you want to export.
2. Click the action dropdown menu (the three vertical dots).
3. Select **Export**.
4. Once the export completes, Twilio SendGrid sends you a download link to the email address you used to register or set to receive [notifications](/docs/sendgrid/ui/account-and-settings/notifications/).

### Edit an Unsubscribe Group

To edit an Unsubscribe Group:

1. Go to the Unsubscribe Group you want to edit.
2. Click the action dropdown menu (the three vertical dots).
3. Select **Edit**. The **Edit Group** page displays.
4. From the **Edit Group** page, you can change the **Group Name**, **Group Description**, and display preferences.
5. Click **Save Unsubscribe Group**.

### Delete an Unsubscribe Group

To delete an Unsubscribe Group:

1. Go to the Unsubscribe Group you want to delete.
2. Click the action dropdown menu (the three vertical dots).
3. Select **Edit**. The **Edit Group** page displays.
4. Click **Delete Group**. A confirmation modal displays.
5. If you want to delete the selected group, click **Delete**.

## Additional resources

* [Suppressions overview](/docs/sendgrid/ui/sending-email/index-suppressions/)
* [Group unsubscribes](/docs/sendgrid/ui/sending-email/group-unsubscribes/)
* [Global unsubscribes](/docs/sendgrid/ui/sending-email/global-unsubscribes/)

[create-unsub-grp]: #create-an-unsubscribe-group

[create-send]: /docs/sendgrid/ui/sending-email/single-sends

[create-automation]: /docs/sendgrid/ui/sending-email/getting-started-with-automation
