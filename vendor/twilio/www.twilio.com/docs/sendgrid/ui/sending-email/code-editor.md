# Use the Code Editor

Twilio SendGrid provides a marketer-friendly HTML Code Editor. This Code Editor features a split-screen editing experience for email messages with custom HTML and other features common in full-featured code editors.

To use the Code Editor, log in to the [Twilio SendGrid console][console].

## Get started

Decide what you want to create: a *Single Send* or an *Automation* message.

## Single Sends

For Single Sends, you can choose one of three design options:

* A blank template
* A custom template that you have already created
* A pre-built template from Twilio SendGrid

To use the Code Editor for Single Sends:

1. Go to **Marketing** > **Single Sends**.
2. Decide if you want to create a message or edit an existing message.

<TabGroup>
  <Tab title="Create message">
    4) Click **Create a Single Send**. The **Select a Design** page appears.
    5) Choose from either **Your Email Designs** or **SendGrid Email Designs**.\
       As you hover over each design, text appears under the design indicating which editor, if any, someone used to create the design. You can choose a different editor, but Twilio recommends the editor displayed.
    6) Hover over your chosen template and click **Select**. The **Select Your Editing Experience** page appears.
    7) Click **Select** in the **Code Editor** box. The Code Editor page appears with a banner that states **Success! You've added a new single send.**
  </Tab>

  <Tab title="Modify existing message">
    4. From the list of Single Sends, choose an existing Single Send.
    5. Click `⋮` (action menu) next to that Single Send.
    6. Choose **Edit**. The editor page last used for the message, Code or Design, appears.
       > \[!WARNING]
       >
       > You can only edit unsent emails.
  </Tab>

  <Tab title="Design based on existing message">
    4. From the list of Single Sends, choose an existing Single Send.
    5. Click `⋮` (action menu) next to that Single Send.
    6. Choose **Create Design**. The **Select Your Editing Experience** page appears.
    7. Click **Select** in the **Code Editor** box. The Code Editor page appears with a banner that states **Success! You've added a new single send.**
  </Tab>
</TabGroup>

## Create message

4. Click **Create a Single Send**. The **Select a Design** page appears.
5. Choose from either **Your Email Designs** or **SendGrid Email Designs**.\
   As you hover over each design, text appears under the design indicating which editor, if any, someone used to create the design. You can choose a different editor, but Twilio recommends the editor displayed.
6. Hover over your chosen template and click **Select**. The **Select Your Editing Experience** page appears.
7. Click **Select** in the **Code Editor** box. The Code Editor page appears with a banner that states **Success! You've added a new single send.**

## Modify existing message

4. From the list of Single Sends, choose an existing Single Send.
5. Click `⋮` (action menu) next to that Single Send.
6. Choose **Edit**. The editor page last used for the message, Code or Design, appears.
   > \[!WARNING]
   >
   > You can only edit unsent emails.

## Design based on existing message

4. From the list of Single Sends, choose an existing Single Send.
5. Click `⋮` (action menu) next to that Single Send.
6. Choose **Create Design**. The **Select Your Editing Experience** page appears.
7. Click **Select** in the **Code Editor** box. The Code Editor page appears with a banner that states **Success! You've added a new single send.**

## Automations

For Automations, you can choose one of two options:

* A welcome message triggered when someone joins your list.
* A custom automation that follows your workflow.

To use the Code Editor for Automations:

1. Go to **Marketing** > **Automations**.
2. Decide if you want to create a welcome message or a custom existing message.

<TabGroup>
  <Tab title="Create welcome automation">
    3) Click **Create an Automation**. The **Select an automation type** page appears.
    4) Under **Welcome Automation**, click **Select**. The **Edit Automation** page appears.
    5) Define the automation workflow and settings.

       | Question                                                                          | Properties                              |                                                                                                                                                                                            |
       | --------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
       | What is the name of this automation?                                              | Automation Name                         |                                                                                                                                                                                            |
       | When will your contacts enter the automation?                                     | Entry Criteria                          | An automation triggered when someone gets added to a list or segment.                                                                                                                      |
       | When will your contacts leave the automation?                                     | Exit Criteria                           | Choose when a contact leaves the workflow:<br />Contacts have received all emails in the automation<br />Contacts no longer meet the entry criteria<br />Contact meets following criteria. |
       | What Unsubscribe Group and Categories would you like to assign to these messages? | Unsubscribe Group, Categories, IP Pools | The group for recipients who unsubscribe from your email, the topics that organize your email, and the groups of IP addresses from which your emails get sent.                             |
       | What email(s) are included in your automation?                                    |                                         | Define either a single message or a workflow for a series of messages. Choose when each message gets sent.                                                                                 |
    6) For each email message in the series, hover over the design and click **Edit**. The Design Editor appears.
       > \[!NOTE]
       >
       > You can edit the **Welcome Series** Automation only with the [Design Editor][].
    7) Click **Save**.
    8) To activate the automation, click **Automation Settings**, then **Set Live**.
  </Tab>

  <Tab title="Create custom automation">
    3. Click **Create an Automation**. The **Select an automation type** page appears.
    4. Under **Custom Automation**, click **Select**.
    5. Give the automation a name, entry criteria, exit criteria, and select an [Unsubscribe Group][].
    6. Select the send time.
    7. Click ✎ (edit button) next to **Email 1**.
    8. Click **Code Editor**.
    9. Click **Continue**.
  </Tab>
</TabGroup>

## Create welcome automation

3. Click **Create an Automation**. The **Select an automation type** page appears.
4. Under **Welcome Automation**, click **Select**. The **Edit Automation** page appears.
5. Define the automation workflow and settings.

   | Question                                                                          | Properties                              |                                                                                                                                                                                            |
   | --------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
   | What is the name of this automation?                                              | Automation Name                         |                                                                                                                                                                                            |
   | When will your contacts enter the automation?                                     | Entry Criteria                          | An automation triggered when someone gets added to a list or segment.                                                                                                                      |
   | When will your contacts leave the automation?                                     | Exit Criteria                           | Choose when a contact leaves the workflow:<br />Contacts have received all emails in the automation<br />Contacts no longer meet the entry criteria<br />Contact meets following criteria. |
   | What Unsubscribe Group and Categories would you like to assign to these messages? | Unsubscribe Group, Categories, IP Pools | The group for recipients who unsubscribe from your email, the topics that organize your email, and the groups of IP addresses from which your emails get sent.                             |
   | What email(s) are included in your automation?                                    |                                         | Define either a single message or a workflow for a series of messages. Choose when each message gets sent.                                                                                 |
6. For each email message in the series, hover over the design and click **Edit**. The Design Editor appears.
   > \[!NOTE]
   >
   > You can edit the **Welcome Series** Automation only with the [Design Editor][].
7. Click **Save**.
8. To activate the automation, click **Automation Settings**, then **Set Live**.

## Create custom automation

3. Click **Create an Automation**. The **Select an automation type** page appears.
4. Under **Custom Automation**, click **Select**.
5. Give the automation a name, entry criteria, exit criteria, and select an [Unsubscribe Group][].
6. Select the send time.
7. Click ✎ (edit button) next to **Email 1**.
8. Click **Code Editor**.
9. Click **Continue**.

To learn more, see [Marketing Campaigns email designs][].

> \[!WARNING]
>
> Once you create a Single Send or automation email in the Code Editor, you can't edit with the Design Editor unless you add our [Drag and Drop Markup][].

## Write your email message

When you add HTML code, you can write from scratch or use code from another HTML editor.
To use HTML code from another application, copy and paste that code into the content area of the Code Editor.

When you write your HTML code, consider the following examples. They show the recommended structure and organization of custom HTML code. Twilio represents the content of your modules as `[MODULE CONTENT]`.

Twilio SendGrid doesn't lint or otherwise validate your HTML code outside of flagging errors.

## Text

```html
  <table class="module" role="module" data-type="text">
    <tr>
      <td style="[CSS rules]; background-color: [some color]">
        [MODULE CONTENT]
      </td>
    </tr>
  </table>
```

## Image

```html
<table class="wrapper" role="module" data-type="image">
  <tr>
    <td style="[CSS rules]; text-align: [left|right]">
      [MODULE CONTENT]
    </td>
  </tr>
</table>
```

## Image and Text

```html
  <table role="module" data-type="imagetext">
    <tr>
      <td>
        <table>
          <tr role="module-content">
            <td class="templateColumnContainer" >
              <table>
                <tr>
                  <td class="leftColumnContent" role="column-one">
                    <table role="module" data-type="image">
                      <tr>
                        <td role="module-content">
                          [MODULE CONTENT]
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
            <td class="templateColumnContainer" >
              <table>
                <tr>
                  <td class="rightColumnContent" role="column-two">
                    <table role="module" data-type="text">
                      <tr>
                        <td role="module-content">
                          [MODULE CONTENT]
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
```

## Code

```html
  <table class="module" role="module" data-type="code">
    <tr>
      <td>
        [MODULE CONTENT]
      </td>
    </tr>
  </table>
```

## Columns

```html
  <table role="module" data-type="columns">
    <tr>
      <td style="[CSS rules]; background-color: [some color]">
        <table>
          <tr>
            <td class="templateColumnContainer column-drop-area">
            [MODULE CONTENT]
            </td>
            <td class="templateColumnContainer column-drop-area">
            [ANOTHER MODULE CONTENT]
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
```

## Button

```html
  <table class="module" role="module" data-type="button">
    <tr>
      <td style="[CSS rules]; background-color: [some color]; text-align: [left|right]">
        <table class="wrapper-mobile">
          <tr>
            <td style="[CSS rules]; background-color: [some color]">
              [MODULE CONTENT]
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
```

## Divider

```html
  <table class="module" role="module" data-type="divider">
    <tr>
      <td style="[CSS rules]; background-color: [some color]">
        <table height=[some height]>
          <tr>
            <td style="background-color: [some color]"></td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
```

## Spacer

```html
  <table class="module" role="module" data-type="spacer">
    <tr>
      <td style="padding: 50px 0 0 0; background-color: [some color]">
      </td>
    </tr>
  </table>
```

## Social

```html
  <table class="module" role="module" data-type="social">
    <tbody>
      <tr>
      <td style="[CSS rules]" data-align="[left|right|center]">
        <table>
        <tbody>
          <tr>
          [MODULE CONTENT]
          </tr>
        </tbody>
        </table>
      </td>
      </tr>
    </tbody>
  </table>
```

## Preview your email message

You can review your email message or template in a preview.

1. To preview your email message or template, click **Preview**.
2. To view the desktop preview, click **Desktop**.
3. To view the mobile preview, click **Mobile**.
4. To view a plain-text version of your email message or template, click **Plain Text**.

Previews also display your chosen **From** name, **Subject**, and **Preheader** text.

## Upload images

To add images to your image library, upload the image files into Twilio SendGrid.

1. If you went away from the Code Editor, go to **Marketing** > **Single Sends** or **Automations** page.
2. Click on your desired email message. The **Code** page for that email message appears.
3. Select the **images** icon atop the HTML code. The **Image Library** appears.
4. Click the image you want to add to your email. The **Image Details** panel appears.
5. Click **Copy Image URL**. The **Image URL Copied** banner appears.
6. Close the **Image Library** page.
7. In your email message or template HTML code, paste this URL into an `img` source tag.

   ```html
   <img src="hostname/path/to/image.ext" />
   ```

## Add personalized data

Twilio SendGrid provides personalization of email messages. To accomplish this, you add substitution tags to your email messages or templates and provide test data to validate the tags.

### Add substitution tags

To add a substitution tag to your email template or message:

1. Click the **Settings** drawer. The **Settings** panel appears.
2. Click **Tags**. The **Tags** panel appears.
3. Locate the tag you want to add to your email.
4. Click the **copy** icon next to that tag.
5. Paste the tag into the module.
   #### View the substitution tags for the sender
   To add personalized data about the sender, use one or more of the following substitution tags:
   | Substitution tag     | Substituted with                                                       |
   | -------------------- | ---------------------------------------------------------------------- |
   | `{{Sender_Name}}`    | The name of the sender selected when sending your email                |
   | `{{Sender_Email}}`   | The email of the sender selected when sending your email               |
   | `{{Sender_Address}}` | The address on record for the sender selected when sending your email  |
   | `{{Sender_City}}`    | The city on record for the sender selected when sending your email     |
   | `{{Sender_State}}`   | The state on record for the sender selected when sending your email    |
   | `{{Sender_Zip}}`     | The zip code on record for the sender selected when sending your email |
   | `{{Sender_Country}}` | The country on record for the sender selected when sending your email  |
   Sender tags don't use and don't need default values.
   #### View the substitution tags for recipients
   To add personalized data about your recipients, use one or more of the following substitution tags.

   Recipient-specific tags come from the values on [**Contact Details** page][contacts] for each recipient. These include:
   | Substitution tag            | Replaces the tag with the recipient's               | Status     |
   | --------------------------- | --------------------------------------------------- | ---------- |
   | `{{first_name}}`            | First name                                          |            |
   | `{{last_name}}`             | Last name                                           |            |
   | `{{email}}`                 | Email address                                       |            |
   | `{{alternate_emails}`       | Alternate email addresses                           |            |
   | `{{address_line_1}}`        | First line of their mailing address                 |            |
   | `{{address_line_2}}`        | Second line of their mailing address                |            |
   | `{{city}}`                  | City of their mailing address                       |            |
   | `{{state_province_region}}` | Region, Province, or State of their mailing address |            |
   | `{{postal_code}}`           | Postal code of their mailing address                |            |
   | `{{country}}`               | Country of their mailing address                    |            |
   | `{{phone_number}}`          | Phone number                                        |            |
   | `{{whatsapp}}`              | [WhatsApp][] number                                 | Deprecated |
   | `{{line}}`                  | [Line][] ID                                         | Deprecated |
   | `{{facebook}}`              | [Facebook][] Profile ID                             | Deprecated |
   | `{{unique_name}}`           | Unique name                                         | Deprecated |
   Subscription management-specific tags include:
   | Substitution tag                | Replaces the tag with                                                          |
   | ------------------------------- | ------------------------------------------------------------------------------ |
   | `{{{unsubscribe}}}`             | A link to unsubscribe from any emails you send.                                |
   | `{{{unsubscribe_preferences}}}` | A list of unsubscribe options and a link to your unsubscribe preferences page. |
   | [`{{Weblink}}`][weblink]        | A link that opens the email message on a Twilio SendGrid-hosted web page.      |
   When you copy and paste a tag from the **Tags** tab, the editor adds a tag with a default value using the `insert` keyword.
   ```html {title="Result of pasting the first_name tag into the Code Editor"}
   {{ insert first_name 'default=default' }}
   ```
   You can type a tag with a default value using the syntax shown on the **Tags** panel.
   ```html {title="Accepted syntax for a tag with a default value"}
   {{ first_name | Pat Bloggs }}
   ```
   The editor converts it to the standard default value tag syntax:
   ```html {title="Converted tag after "}
   {{ insert first_name 'default=Pat Bloggs' }}
   ```
   To learn more about working with default values and Handlebars, see [Adding Dynamic Content with Handlebars in Marketing Campaigns][handlebars-data].

   [handlebars-data]: /docs/sendgrid/ui/sending-email/adding-dynamic-content-with-handlebars-in-marketing-campaigns
   [weblink]: /docs/sendgrid/ui/sending-email/weblink
   [contacts]: /docs/sendgrid/ui/managing-contacts/create-and-manage-contacts
   [line]: https://www.line.me/en
   [facebook]: https://www.facebook.com
   [whatsapp]: https://www.whatsapp.com
6. When you have finished changes to your design, click **Save**.

## Add unsubscribe tags

All Twilio SendGrid templates include an unsubscribe HTML code block.

### Preview personalization with test data

To view a preview with the integrated test data:

1. Open a design in the Design Editor.
2. Click **Preview**.
3. Click **{} Show Test Data**. The test data panel appears.
4. Insert contact data into the code window.

   * The data uses JavaScript Object Notation (JSON) syntax.
   * JSON structures data as a collection of key-value pairs.

   > \[!NOTE]
   >
   > If you use the `first_name` substitution tag, the key is `first_name` and the value is the customer's name. Think of these keys as variables. Like a variable in algebra, these variables represent a value you don't yet know.
   >
   > ```json {title="Example of JSON document for sample data"}
   > {
   >   "first_name": "Tira",
   >   "last_name": "Misu",
   >   "email": "recipient@example.com",
   >   "alternate_emails": "recipient+@example.com",
   >   "address_line_1": "1234 N. Real Ave.",
   >   "address_line_2": "Suite 200",
   >   "city": "Denver",
   >   "state_province_region": "CO",
   >   "postal_code": 80202,
   >   "country": "United States",
   >   "phone_number": "+15555555555",
   >   "Sender_Name": "Orders",
   >   "Sender_Email": "orders@example2.com",
   >   "Sender_Address": "1234 N. Exist St.",
   >   "Sender_City": "Portland",
   >   "Sender_State": "OR",
   >   "Sender_Zip": 97227,
   >   "Sender_Country": "United States"
   > }
   > ```
5. When you have finished changes to your data, click **Save**.
6. After you save the test data, any substitution tags should display the data in the email preview.

## Add categories

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

To add categories:

1. Click the **Settings** drawer. The **Settings** panel appears.
2. Expand the **Single Send Settings** menu.
3. In the **Categories** box, add categories in one of two ways:
   1. Click in the **Categories** box and choose a category from the dropdown menu.
   2. Click in the **Categories** box and type the name of a category you want to add.
      * If the category exists, it displays once you type enough characters in its name.
      * If it doesn't exist, it prompts you to add a category with that name.

## Add metadata and styling to email messages

Every email message includes machine-readable information like its title and what styles get applied to its content. With the editor, you can add this information, or metadata, to your email messages.

### Edit the HTML \<head> tag

The HTML \[`<head>`]\[] element contain any metadata you want in your email message or template.

To define any custom fonts or CSS styles, you can use the `<head>` element.

To edit the HTML head of your email message or template:

1. Click the **Settings** drawer. The **Settings** panel appears.
2. Click **Build**. The **Build** panel appears.
3. Expand the **Advanced** menu.
4. Click the **Edit** next to **Edit HTML Head**. The **Edit HTML Head** appears.
   ```html
   <head></head>
   ```
5. Make your desired changes.
6. Click **Update**.

### Add custom fonts to the HTML \<head> section

Using the tag to reference a [web font][webfonts] hosted on the internet, users add custom fonts like \[Google Fonts]\[]. Define a web-safe font as a fallback should one of your recipient's clients not support your custom font.

The following popular clients support web fonts:

* Apple Mail
* Outlook.com app
* Outlook 2000
* Default Android Mail app (not the Android Gmail app)
* iOS Mail

This list might change. Twilio can't guarantee web font support. Some inbox providers don't support fonts.

To add a custom font using the HTML `<head>`:

1. Open the HTML Head by navigating to the **Build** tab in the Design Editor.
2. Scroll down to the **Advanced** drop-down menu and select **Edit HTML Head**.
3. Click **Edit** to begin making your changes.
4. Insert a `<link>` tag containing an `href` attribute that points to your web font.
   ```html
   <link href="https://fonts.google.com/specimen/Oswald" rel="stylesheet" />
   ```
5. To indicate that you want to use the web font, add an HTML `<style>` tag with CSS rules:

   ```html
   <style>
     body { font-family: 'Oswald', sans-serif; }
   </style>
   ```

## Import exported HTML

Twilio SendGrid hosts the images included in the pre-built templates and any images you have uploaded to the image library, so when you export a template's HTML from the design editor, the embedded URLs in each `<img>` tag remains valid.

## Single Sends

To open exported HTML in the Code Editor using Single Sends:

1. Go to **Marketing** > **Single Sends**.
2. Click **Create a Single Send**. The **Select a Design** page appears.
3. Click **Your Email Designs**.
4. Hover over **Blank Template** and click **Select**. The **Select Your Editing Experience** page appears.
5. Click **Code Editor**.
6. Paste the raw template HTML into the Code Editor.

## Automations

To open exported HTML in the Code Editor using Automations:

1. Go to **Marketing** > **Automations**.
2. Click **Create an Automation**. The **Select an automation type** page appears.
3. Under **Custom Automation**, click **Select**. The **Edit Automation** page appears.
4. Go to **Email 1** in the Automation series.
5. Click **Edit Email Content**.
6. Locate the blank template and click **Select**.
7. Select **Code Editor**.
8. Paste the raw template HTML into the Code Editor.

## Additional resources

* [Sending an Email][]
* [A/B Testing][]
* [Campaign Statistics][]
* [Marketing Campaigns Email Designs][]

[A/B Testing]: /docs/sendgrid/ui/sending-email/a-b-testing

[Campaign Statistics]: /docs/sendgrid/ui/analytics-and-reporting/marketing-campaigns-stats

[Design Editor]: /docs/sendgrid/ui/sending-email/editor

[Drag and Drop Markup]: /docs/sendgrid/ui/sending-email/design-editor#use-drag-and-drop-modules

[Marketing Campaigns Email Designs]: /docs/sendgrid/ui/sending-email/working-with-marketing-campaigns-email-designs

[Sending an Email]: /docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns

[Unsubscribe Group]: /docs/sendgrid/ui/sending-email/create-and-manage-unsubscribe-groups

[console]: https://mc.sendgrid.com

[webfonts]: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling/Web_fonts
