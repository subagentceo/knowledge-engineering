# The Weblink Substitution Tag

Your emails will likely be opened on a variety of email clients that all support different HTML and CSS features. Email clients may display messages incorrectly, and, in some cases, they may not open a message at all.

Inconsistent behavior across email clients is inconvenient at best, and it presents real barriers for recipients who rely on accessibility tools such as screen readers.

The Marketing Campaigns Weblink feature makes it possible for recipients to view your email in a Web browser where modern HTML and CSS, as well as accessibility features, are better supported. This feature enhances the email experience for your marketing campaigns.

> \[!NOTE]
>
> The Weblink substitution tag is a feature exclusively available in our
> Marketing Campaigns.

## Add Weblink to your design

Weblink is a [Substitution Tag](/docs/sendgrid/ui/sending-email/editor/#using-substitution-tags); however, `{{Weblink}}` is not meant to be included in your design alone. The `{{Weblink}}` tag will be replaced by a URL. This means that you must add the `{{Weblink}}` tag as the URL to a link element — usually some text. For those familiar with HTML, `{{Weblink}}` is assigned to the `href` attribute of an anchor tag.

```html
<a href="{{Weblink}}">Open this email in a Web browser</a>
```

### Design Editor

When using the Design Editor, you can add a Weblink as the URL for any link in your design.

#### Add the Weblink tag to text using a module's UI

1. In a Text module, add an appropriate call to action such as, "Open this email in a Web browser."
2. Highlight this text and format it as a link using the **Text Module Styles** options.

![Text Module Styles menu with link icon highlighted, showing email subject and preheader.](https://docs-resources.prod.twilio.com/187c9c9831a223c42f8f1aa8445fb32b5764377a60856c5df2047d2703c4441f.png)

3. A modal will appear where you can add the `{{Weblink}}` tag. Select **CustomURL** as the **Link Type**, and type `{{Weblink}}` in the `Link URL` field.

![Add Link modal with fields for Link Type and Link URL, showing 'custom' and '\{\{Weblink}}'.](https://docs-resources.prod.twilio.com/3e6a02081dbb9980b0b30ed2a3616fff99f973663c2110e1b857293a03ed9546.png)

4. Select **OK**, and your link will be included in any Single Send or Automation that uses the design.

#### Add the Weblink tag using a module's code interface

You can also add a link by modifying the underlying HTML code for a drag-and-drop module.

1. Select **Edit Module HTML** from above the module itself. The icon is an opening and closing bracket.

![Code editor showing href with Weblink placeholder and email preview with 'Open email in browser' link.](https://docs-resources.prod.twilio.com/df645e4bacee2796a2a6cee32d58c35695d160be35879d7218477c7aca1786bf.png)

2. A code editor will open where you can place an anchor tag. To achieve the same result as when using the UI, your code will look like the following example. Notice that the `{{Weblink}}` tag is placed inside the `href` attribute rather than a regular URL.

```html
<div style="font-family: inherit">
  <a href="{{Weblink}}">Open this email in a Web browser</a>.
</div>
```

![A module's code editor interface with \{Weblink} assigned to an href attribute.](https://docs-resources.prod.twilio.com/698e48be506c3a3fc1621ea8bdc9e506c01cc26b4e8764b6b1e40ac323b02d6f.png)

### Code Editor

When using the Code Editor to build your design, you can add `{{Weblink}}` as the `href` attribute for any anchor tag where the link should appear.

![The Code Editor interface with \{Weblink} assigned to an href attribute.](https://docs-resources.prod.twilio.com/aa231b66b074f02f65bd56193e59a57f6896e4887edfc14e3ee788b7048ada38.png)

## Test Weblink in your design

Weblink URLs are generated after your email is scheduled to send. For this reason, you will not be able to test the Weblink directly from the Editors' **Preview** windows when building your Single Send or Automation. Instead, you can send a test email.

1. Using either the Design or Code Editor, select your design's **Settings** tab. Then twirl open the **Test Your Email** menu.
2. Add one of your [verified senders](/docs/sendgrid/ui/sending-email/sender-verification/) in the **From Address** field and at least one address with an inbox you can check in the **Email Addresses** field.
3. Click the **Send Test Message** button.

![Settings tab showing email design and test email fields with example addresses.](https://docs-resources.prod.twilio.com/a6a608421a76dcf680fda4e6618949b2b997967ca74f5b01c89df017149977a1.png)

4. You should now be able to open the email from the inbox where you sent the message. The test message will contain a working Weblink wherever you placed it in your design.
