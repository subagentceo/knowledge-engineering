# Email Testing

Email testing includes in-app spam testing, inbox rendering previews, and link validation without leaving your workflow. You can preview how an email performs across a wide range of inbox providers, devices, and spam filters, before sending.

* **Inbox Rendering Test**: Displays how an email message gets rendered and appears across a select group of inbox providers and devices.
* **Spam Test**: Shows how an email performs against the world's most powerful consumer (B2C) and enterprise (B2B) spam filters.
* **Link Validation Test**: Tests all links within a message for validity. The test checks for redirects, domain reputation, and critical metadata, like title text. Your inbox rendering tests include this link validation test. Link validation tests *don't* deduct from your email testing credits. To learn more about link testing, see [link validation testing][].

## Email Testing credits and pricing

The number of email testing credits that you have depends on your Marketing Campaigns or Email API plan.

To learn more about email plans, see [pricing][].

Both Inbox Rendering Tests and Spam Tests use Email Testing credits. All Email Testing credits (whether part of your plan or purchased as part of an add-on package) expire at the end of each month.

## Purchase additional credits

If you find yourself in need of more credits than your email plan offers, we offer additional Email Testing credit packages as add-ons to your monthly plan.

Twilio bills packages for additional Email Testing credits on a monthly, recurring basis. Unless removed from your account, they renew each month.

## Run an email test

Both Marketing Campaigns and emails within API plans using Dynamic Templates include email testing.

> \[!NOTE]
>
> Before you can create a test, you need to specify a Sender and include a subject for your email. If the given subject includes handlebars syntax (`{{{subject}}}`), you must add a subject value under **Preview** > **Test Data** for the Email Test to run successfully.

### Run basic email test

To perform a basic email test:

1. Log in to the Twilio SendGrid console.
2. Go to **Marketing** > [**Single Sends**][mc-single-send].
3. Click on the title of the Single Send you want to test.
4. Under **Test Your Email**, type the email addresses you want to receive your message.
5. Click **Send Test Message**.

Twilio SendGrid prepends `Test - ` to the subject line. This informs your recipients that you sent a test message a test and not the real send.

### Run advanced email test

To create an advanced test:

1. Log in to the Twilio SendGrid console.
2. Go to **Marketing** > [**Single Sends**][mc-single-send] > **Settings** > **Test Your Email**.
3. Click on the title of the Single Send you want to test.
4. Click **Create Test**. The **Select testing options** page appears.
5. Select either test or both tests to run.
   * **Spam Test**
   * **Inbox Rendering Test**
6. For a **Inbox Rendering** test, select the clients.\
   Every inbox rendering test run includes a link validation test. These tests check the validity of all URLs within your message. Link validation tests *don't* use Email Testing credits.

   #### View clients

   Desktop applications

   | Mail client       | Version | Mode  | OS         | Resolution (dpi) |
   | ----------------- | ------- | ----- | ---------- | ---------------- |
   | Apple Mail        | 16      | Light | macOS 13   | 96               |
   | Apple Mail        | 16      | Dark  | macOS 13   | 96               |
   | Outlook Microsoft | 365     | Light | macOS 13   | 96               |
   | Outlook Microsoft | 365     | Dark  | macOS 13   | 96               |
   | Outlook Microsoft | 365     | Light | Windows 11 | 96               |
   | Outlook Microsoft | 365     | Dark  | Windows 11 | 96               |
   | Outlook Office    | 365     | Light | Windows 10 | 96               |
   | Outlook Office    | 365     | Dark  | Windows 10 | 96               |
   | Outlook           | 2016    |       | Windows 10 | 96               |
   | Outlook           | 2016    |       | Windows 10 | 120              |
   | Outlook           | 2019    |       | Windows 10 | 96               |
   | Outlook           | 2019    |       | Windows 10 | 120              |
   | Outlook           | 2021    | Light | Windows 11 | 96               |
   | Outlook           | 2021    | Dark  | Windows 11 | 96               |

   Android devices

   | Device   | Mail client | Mode  | OS         |
   | -------- | ----------- | ----- | ---------- |
   | Pixel 6  | Gmail       | Light | Android 12 |
   | Pixel 6  | Gmail       | Dark  | Android 12 |
   | Pixel 7  | Gmail       | Light | Android 13 |
   | Pixel 7  | Gmail       | Dark  | Android 13 |
   | Pixel 8  | Gmail       | Light | Android 14 |
   | Pixel 8  | Gmail       | Dark  | Android 14 |
   | Pixel 9  | Gmail       | Light | Android 15 |
   | Pixel 9  | Gmail       | Dark  | Android 15 |
   | Pixel 10 | Gmail       | Light | Android 16 |
   | Pixel 10 | Gmail       | Dark  | Android 16 |
   | Pixel 6  | Outlook     | Light | Android 12 |
   | Pixel 6  | Outlook     | Dark  | Android 12 |

   iOS devices

   | Device            | Mail client | Mode  | OS     |
   | ----------------- | ----------- | ----- | ------ |
   | iPhone 13         | Outlook     | Light | iOS 15 |
   | iPhone 13         | Outlook     | Dark  | iOS 15 |
   | iPhone 14         | Mail        | Light | iOS 16 |
   | iPhone 14 Pro     | Mail        | Light | iOS 16 |
   | iPhone 14 Pro     | Mail        | Dark  | iOS 16 |
   | iPhone 14 Pro Max | Mail        | Light | iOS 16 |
   | iPhone 14 Pro Max | Mail        | Dark  | iOS 16 |
   | iPhone 15         | Mail        | Light | iOS 17 |
   | iPhone 15         | Mail        | Dark  | iOS 17 |
   | iPhone 15 Plus    | Mail        | Light | iOS 17 |
   | iPhone 15 Plus    | Mail        | Dark  | iOS 17 |
   | iPhone 15 Pro     | Mail        | Light | iOS 17 |
   | iPhone 15 Pro     | Mail        | Dark  | iOS 17 |
   | iPhone 15 Pro Max | Mail        | Light | iOS 17 |
   | iPhone 15 Pro Max | Mail        | Dark  | iOS 17 |
   | iPhone 16         | Mail        | Light | iOS 18 |
   | iPhone 16         | Mail        | Dark  | iOS 18 |
   | iPhone 16 Pro     | Mail        | Light | iOS 18 |
   | iPhone 16 Pro     | Mail        | Dark  | iOS 18 |
   | iPhone 16 Pro Max | Mail        | Light | iOS 18 |
   | iPhone 16 Pro Max | Mail        | Dark  | iOS 18 |
   | iPhone 17         | Mail        | Light | iOS 26 |
   | iPhone 17         | Mail        | Dark  | iOS 26 |
   | iPhone 17 Pro     | Mail        | Light | iOS 26 |
   | iPhone 17 Pro     | Mail        | Dark  | iOS 26 |
   | iPhone 17 Pro Max | Mail        | Dark  | iOS 26 |
   | iPhone 17 Pro Max | Mail        | Light | iOS 26 |

   Web-based clients

   | Site             | Browser | Mode  | OS         |
   | ---------------- | ------- | ----- | ---------- |
   | AOL.com          | Chrome  | Light | Windows 10 |
   | AOL.com          | Chrome  | Dark  | Windows 10 |
   | AOL.com          | Edge    | Light | Windows 10 |
   | AOL.com          | Edge    | Dark  | Windows 10 |
   | AOL.com          | Firefox | Light | Windows 10 |
   | AOL.com          | Firefox | Dark  | Windows 10 |
   | Free.fr          | Chrome  | Light | Windows 10 |
   | Free.fr          | Chrome  | Dark  | Windows 10 |
   | Free.fr          | Edge    | Light | Windows 10 |
   | Free.fr          | Edge    | Dark  | Windows 10 |
   | Free.fr          | Firefox | Light | Windows 10 |
   | Free.fr          | Firefox | Dark  | Windows 10 |
   | Gmail.com        | Chrome  | Light | Windows 10 |
   | Gmail.com        | Chrome  | Dark  | Windows 10 |
   | Gmail.com        | Edge    | Light | Windows 10 |
   | Gmail.com        | Edge    | Dark  | Windows 10 |
   | Gmail.com        | Firefox | Light | Windows 10 |
   | Gmail.com        | Firefox | Dark  | Windows 10 |
   | GMX              | Chrome  |       | Windows 10 |
   | GMX              | Edge    |       | Windows 10 |
   | GMX              | Firefox |       | Windows 10 |
   | Libero           | Chrome  |       | Windows 10 |
   | Libero           | Edge    |       | Windows 10 |
   | Libero           | Firefox |       | Windows 10 |
   | Microsoft365.com | Chrome  | Light | Windows 10 |
   | Microsoft365.com | Chrome  | Dark  | Windows 10 |
   | Microsoft365.com | Edge    | Light | Windows 10 |
   | Microsoft365.com | Edge    | Dark  | Windows 10 |
   | Microsoft365.com | Firefox | Light | Windows 10 |
   | Microsoft365.com | Firefox | Dark  | Windows 10 |
   | Outlook.com      | Chrome  | Dark  | Windows 10 |
   | Outlook.com      | Chrome  | Light | Windows 10 |
   | Outlook.com      | Edge    | Light | Windows 10 |
   | Outlook.com      | Edge    | Dark  | Windows 10 |
   | Outlook.com      | Firefox | Light | Windows 10 |
   | Outlook.com      | Firefox | Dark  | Windows 10 |
   | T-Online         | Chrome  |       | Windows 10 |
   | T-Online         | Edge    |       | Windows 10 |
   | T-Online         | Firefox |       | Windows 10 |
   | Web.de           | Chrome  |       | Windows 10 |
   | Web.de           | Edge    |       | Windows 10 |
   | Web.de           | Firefox |       | Windows 10 |
   | Yahoo.com        | Chrome  | Light | Windows 10 |
   | Yahoo.com        | Chrome  | Dark  | Windows 10 |
   | Yahoo.com        | Edge    | Light | Windows 10 |
   | Yahoo.com        | Edge    | Dark  | Windows 10 |
   | Yahoo.com        | Firefox | Light | Windows 10 |
   | Yahoo.com        | Firefox | Dark  | Windows 10 |
7. Click **Run Test**.
8. Your test begins. It may take a moment for the test to begin returning your results. Test results will appear on the **View Test Results** tab. Click any thumbnail of a rendering to open the image and view in greater detail.
9. From the **View Test Results** tab, you can select the **Inbox**, **Spam**, or **Links** tabs to view all of the details for your test.

## Test valid links

Link validation tests check links for the following:

1. Link includes a title.
   When you create links with the Twilio SendGrid console, you can't include titles. You can add the HTML anchor tag `title` attribute. The title text appears when a user hovers over the link and can help users get more information about the link before they go to it.
2. Link works and goes to a valid URL.
   Even when valid, non-HTTP links such as `tel` and `mailto` fail this check, because they don't go to a *website*. If your link fails, but goes to an `http` or `https` address, validate the link target. It must go a publicly accessible site.
3. Number of redirects taken to resolve the link.
   Having links with a high number of redirects can increase the risk that your email is detected as spam and can increase load times for the user when they go to the link.
4. Link reputation, or if the link goes to a domain that's on an email [deny list][].
   If your link's domain exists on a deny list, your email message likely gets flagged as spam.

## Additional resources

* [A/B Testing][]
* [Design Editor][]
* [Code Editor][]
* [Dynamic Templates][]

[deny list]: https://sendgrid.com/blog/avoiding-email-blacklists

[A/B Testing]: /docs/sendgrid/ui/sending-email/a-b-testing

[Design Editor]: /docs/sendgrid/ui/sending-email/editor/#-The-Design-Editor

[Code Editor]: /docs/sendgrid/ui/sending-email/editor/#the-code-editor

[Dynamic Templates]: /docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates

[mc-single-send]: https://mc.sendgrid.com/single-sends?view=raw

[pricing]: https://sendgrid.com/pricing

[link validation testing]: #test-link-validation
