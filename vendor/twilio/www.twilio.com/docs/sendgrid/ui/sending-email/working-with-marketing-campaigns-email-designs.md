# Create an email design

> \[!NOTE]
>
> These tutorials cover the latest version of Marketing Campaigns. If you're using the legacy version of Marketing Campaigns, your experience might differ. To send email with the Twilio SendGrid Email API, see the [API reference][] or the [SMTP Reference][].

[API reference]: /docs/sendgrid/api-reference

[SMTP Reference]: /docs/sendgrid/for-developers/sending-email/getting-started-smtp

To design your email messages, Twilio SendGrid provides templates called *designs*. These designs exist in the **Design Library**. From the [**Design Library**][tsc-design-library], you can modify an existing design or create one from scratch using the [Design Editor][design-editor] or [Code Editor][code-editor].

When you want to send an email message, choose one of the designs you stored in the **Design Library**. Twilio SendGrid supports two types of messaging: *Single Sends* and *Automations*.

* A [Single Send][gl-single-send] is an email message that a organization sends to a defined group of recipients for a single purpose at a specific time. Purposes can range from promoting a product to distributing a newsletter.
* An [Automation][gl-automations] defines a workflow of multiple Single Send email messages sent in response to recipient actions or defined schedules. The email messages in the workflow can include receipts for purchase on a website to follow up satisfaction surveys.

To create and manage Designs, log in to the [Twilio SendGrid console][console].

## Manage existing designs

From the [Design Library][tsc-design-library], you can edit, delete, duplicate, and create the design of later Single Send email messages.

In addition to storing your designs, you can browse and duplicate the pre-built [**SendGrid Email Designs**][tsc-designs] and manage [**Your Images**][tsc-images] from the Design Library as well.

To learn more about managing images, see [Image Editor][image-editor].

> \[!NOTE]
>
> To manage your designs, use the [Design Library API][api-designs].

## Create a design

To create a template or *design*, build from a blank template or duplicate an existing template.

## Build from blank template

To create a template, you can create a template from an empty design.

1. Click **Design Library**. The **Design Library** page displays with the **Your Email Designs** tab selected.
2. Click **Create Email Design**. The **Select Your Editing Experience** page appears.
3. Click **Select** in either the [**Code Editor**][code-editor] or [**Design Editor**][design-editor] box.
4. The selected editor displays with a blank template.

> \[!NOTE]
>
> To upload a design, use the [Create Design API][api-create-design].

## Duplicate an existing design

To create a template, you can duplicate one of your existing templates or one of the Twilio SendGrid pre-built designs.

1. Click **Design Library**. The **Design Library** page displays with the **Your Email Designs** tab selected.
2. Click **SendGrid Email Designs**.
3. Find the design you want to copy.
4. Under that design, click `⋮` (action menu) then **Duplicate**. The **Select Your Editing Experience** page appears.\
   When you duplicate a design, Twilio prepends `Duplicate:` to the **Email Design Name**. This differentiates a duplicate from the original design.
5. The chosen editor loads your chosen design.

> \[!NOTE]
>
> * To duplicate your design, use the [Duplicate Design resource][api-dupe-design].
> * To duplicate a Twilio SendGrid design, use the [Duplicate Pre-built Design resource][api-dupe-prebuilt-design].

To learn about best practices regarding HTML email design, see [Cross-Platform Email Design][cp-email-design].

## Edit a design

You can edit any of the designs in the **Your Email Designs** tab. You can't edit one of the pre-built designs directly; you must duplicate the template first and make changes to your copy.

1. Go to the design you want to edit.
2. Click `⋮` (action menu) under the design you want to modify and select **Edit**.
3. The template opens in the editor that created the campaign.

To modify that particular template after you create a design, you can't switch between the design and code editor. To switch editors, duplicate the design and select the alternate editor during the duplication process.

## Designs and single sends

To deliver a [Single Send][gl-single-send], use any of your designs.

Single Sends are one-time non-automated email messages commonly used to deliver newsletters, promotions, policy updates, and more. You can either create a Single Send from a design or add a design to your Design Library from a Single Send.

## Create a Single Send from an existing design

1. In the **Design Library**, select either the **Your Email Designs** or **SendGrid Email Designs** tab. The **Select a Design** page appears.
2. Click `⋮` (action menu) under the design you want to use then select **Create Single Send**.
3. Choose from either **Your Email Designs** or **SendGrid Email Designs**.\
   As you hover over each design, text appears under the design indicating which editor, if any, someone used to create the design. You can choose a different editor, but Twilio recommends the editor displayed.
4. Hover over your chosen template and click **Select**. The **Select Your Editing Experience** page appears.
5. Click **Select** in the **Design Editor** box. The Design Editor page appears with a banner that states **Success! You've added a new single send.**

To learn how to deliver a Single Send, see [How to Send Email with Marketing Campaigns][docs-gs-mc].

> \[!NOTE]
>
> To program Single Sends, use the [Single Sends API][api-single-sends].

## Create a new design from an existing Single Send

If you have a Single Send that uses a design you would like to manage in your Design Library, you can add the design from the Single Send.

1. From the left-hand navigation, select **Marketing**, and then click **Single Sends**.
2. Find the Single Send you would like to create a design from, click the **action menu** and select **Create Design**.
3. After clicking **Create Design**, a new window opens where you can select which editor you wish to use—the **Design Editor** or the **Code Editor**.
4. The Design used by the Single Send will now be added to your Design Library where you can edit, duplicate, and use it to deliver more Single Sends or Automations.

## Designs and automations

To send recurring emails or drip series at a cadence you define, use [Automations][docs-gs-auto]. You can use any of the designs in the **Your Email Designs** or **SendGrid Email Designs** tabs to deliver one of the messages in your Automation series. You can also save a design from an Automation email to your Design Library.

### Create a new template from an existing Automation email

1. From the left-hand navigation, select **Marketing**, and then click **Automations**.
2. Click the action menu next to the automation you want to duplicate an email from and then select **Edit**.
3. After selecting **Edit**, the Automation loads. Scroll to the email in the Automation that you would like to create a design from.
4. Click the **action menu**, and then select **Create Design**.
5. After clicking **Create Design**, a new window will open where you can select which editor you wish to use—the **Design Editor** or the **Code Editor**.
6. The Design used by the Automation email will now be added to your Design Library where you can edit, duplicate, and use it to deliver more Automations or Single Sends.

To learn more about creating an Automation and assigning designs to the emails in a series, see [Get Started with Automations][docs-gs-auto].

## Use the design and code editors

The Design and Code editors are both feature rich applications that include live previews, the ability to add test data, and more. For more detailed documentation about working with each editor, see our [Design and Code Editor documentation][editor].

## Additional resources

* [Sending an Email][send-email]
* [The Design and Code Editors][editor]
* [Cross-Platform Email Design][cp-email-design]
* [Handlebars][]
* [Designs API reference][api-designs]

[api-create-design]: /docs/sendgrid/api-reference/designs-api/create-design

[api-designs]: /docs/sendgrid/api-reference/designs-api

[api-dupe-design]: /docs/sendgrid/api-reference/designs-api/duplicate-design

[api-dupe-prebuilt-design]: /docs/sendgrid/api-reference/designs-api/duplicate-sendgrid-pre-built-design

[api-single-sends]: /docs/sendgrid/api-reference/single-sends/create-single-send

[cp-email-design]: /docs/sendgrid/ui/sending-email/cross-platform-html-design

[docs-gs-auto]: /docs/sendgrid/ui/sending-email/getting-started-with-automation

[docs-gs-mc]: /docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns

[design-editor]: /docs/sendgrid/ui/sending-email/design-editor

[code-editor]: /docs/sendgrid/ui/sending-email/code-editor

[console]: https://mc.sendgrid.com

[editor]: /docs/sendgrid/ui/sending-email/editor

[gl-automations]: /docs/sendgrid/glossary/automated-email

[gl-single-send]: /docs/sendgrid/glossary/single-send

[Handlebars]: /docs/sendgrid/for-developers/sending-email/using-handlebars

[image-editor]: /docs/sendgrid/ui/sending-email/image-editor

[send-email]: /docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns

[tsc-design-library]: https://mc.sendgrid.com/design-library/your-designs

[tsc-designs]: https://mc.sendgrid.com/design-library/sendgrid-designs

[tsc-images]: https://mc.sendgrid.com/design-library/your-images
