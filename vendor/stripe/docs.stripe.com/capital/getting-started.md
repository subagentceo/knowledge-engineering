# Set up Capital

Determine which integration option to use when you set up Stripe Capital.

> Capital for platforms is available in [public preview](https://docs.stripe.com/release-phases.md).

Use Stripe Capital to set up a Capital program, and provide access to financing offers to your eligible connected accounts. Use the quickstart below to launch your program with a no-code integration. After launch, you can customize your integration with embedded components or Stripe APIs.

## Quickstart

Use the Dashboard to launch a Capital program to offer financing to your connected accounts. Launching your program means you enable sending automatic financing offers to all eligible connected accounts. The quickstart guides you to choose options that allow you to launch your program as fast as possible (usually within minutes to a few days).

1. In the [Capital](https://dashboard.stripe.com/connect/capital/discovery) page in the Stripe Dashboard, click **Get Started**.

2. Select either:

   - **No-code** (Recommended): If you choose this option, Stripe sends all emails on your behalf to your eligible connected accounts, including co-branded emails with financing offers, weekly paydown progress update emails, and any servicing or collections emails if needed. Co-branded emails contain a button that redirects connected accounts to a Stripe-hosted Capital page, where they can apply for an offer or track their weekly paydown progress. Only available for platforms in the US.
   - **Custom**: If you choose this option, you’re responsible for sending financial offers and payment progress emails to your connected accounts by monitoring webhook events and updating offers as delivered using the Stripe APIs. Sending your own email copy requires additional compliance reviews from Stripe, which might take up to 5-7 days for approval.

3. You can market your Capital program to your connected accounts in several ways. Select either:

   - **Stripe co-branded marketing only** (Recommended): Opt into Stripe sending co-branded emails with financing offers to your connected accounts. You can always add custom marketing assets (such as announcement landing pages, ads, and social media posts) that comply with our [guidelines](https://docs.stripe.com/capital/marketing.md#promoting-capital) after you launch. This option is only available to platforms in the US.
   - **Stripe co-branded and custom marketing**: Stripe automatically sends co-branded [emails](https://docs.stripe.com/capital/how-capital-for-platforms-works.md#emails) to your connected accounts (excluding marketing emails outside of the US), and you provide additional custom marketing (such as additional emails, landing page, social media posts, advertisements) of your Capital program. Any custom marketing you upload must pass compliance review, which can take up to 5–7 business days.
     > To build a Capital program with the minimal amount of Stripe co-branding as possible, see [Set up an API integration](https://docs.stripe.com/capital/api-integration.md). This requires you to use APIs, and therefore isn’t a quickstart option. For compliance reasons, eligible connected accounts still must apply for your Capital program in a Stripe-hosted Capital page if you choose this option.

4. Confirm that onboarding to Capital can affect the data shown in any existing financial reports you might already provide to connected accounts in your platform’s UI. Review your options for providing paydown information in the [Reconcile and provide reports](https://docs.stripe.com/capital/getting-started.md#after-quickstart-launch).

5. Sign the partnership contract, and send automatic financing offers to eligible connected accounts.

## After quickstart launch

As you wait for connected accounts to accept their Capital financing offers or at any point after you enable automatic offers, you can customize your Capital program.

1. Reconcile and provide financial reports for connected accounts.

   If you already provide existing financial reports to your connected accounts in your platform’s UI, onboarding to Capital might affect the amount reflected in those transactions. Confirm with your team developer the types of reports and the level of detail you provide to your connected accounts.

   Depending on the complexity (usually if your reports have filtering or grouping functionality), you might need to synchronize the data for these reports with Capital’s transactions. Alternatively, you can provide separate Capital reports (using embedded components or Stripe APIs) in the designated Capital page in your platform’s UI to your connected accounts. To learn more, see [Reconcile and provide reports](https://docs.stripe.com/capital/reporting-and-reconciliation.md).

2. (optional) Promote your program.

   After launch, you can use embedded components to help with program outreach and discoverability. This means connected accounts can learn about and accept an offer for Capital financing directly in your platform’s UI. You can also use embedded components to help your connected accounts manage payments on your platform’s UI, instead of requiring them to access a separate Stripe-hosted Capital page. To learn more, see:

   - [Embed the Capital promo tile component](https://docs.stripe.com/capital/promotional-tile.md)
   - [Embed the Capital financing component](https://docs.stripe.com/connect/supported-embedded-components/capital-financing.md)

3. (Optional) Customize marketing assets.

   In addition to co-branded offer emails, you might want to send your own marketing emails, publish a blog post, or have an updated landing page so your connected accounts can learn more about your Capital Program.

   For compliance reasons, Stripe reviews all custom marketing assets to make sure they’re in compliance with our [guidelines](https://docs.stripe.com/capital/marketing.md). This also includes any copy used alongside any of the embedded components, including: headers, footers, landing page title, and URLs. Review and approval might take up to 5-7 business days. To learn more, see:

   - [Marketing for Capital](https://docs.stripe.com/capital/marketing.md)
   - [Pre-approved FAQ and support page](https://docs.stripe.com/capital/servicing.md)

4. (Optional) Increase eligibility.

   Stripe might be able to improve the eligibility of your connected accounts if you share additional payment data from current connected accounts that also process payments off Stripe. Providing non-Stripe payment data allows us to review the full scope of each connected account’s business for financing eligibility. To learn more, see [Import non-Stripe data into Capital underwiting](https://docs.stripe.com/capital/import-non-stripe-data.md).

## Onboarding integration types

|  |
|  |
| [No-code](https://docs.stripe.com/capital/no-code-integration.md)                        | Launch a program without code using the Dashboard. You also have the option to use minimal code to customize your integration with embedded components or the API after launch.                                                                                                                                                                                 |
| [Embedded components](https://docs.stripe.com/capital/embedded-component-integration.md) | Build a Capital program with minimal coding. This option might require additional compliance reviews from Stripe, with approval taking up to 5-7 business days. This integration also allows you to customize your program by adding embedded components directly in your platform’s UI.                                                                        |
| [API](https://docs.stripe.com/capital/api-integration.md)                                | Build a Capital program with the most control over your Capital program. However, if you send custom emails, these emails still redirect connected accounts to complete their financing application in a Stripe-hosted UI for compliance reasons. This option requires additional compliance reviews from Stripe, with approval taking up to 5-7 business days. |

## Compare integrations

The following table describes the differences of the onboarding integration types for Capital for platforms. We recommend you launch your program with the [Quickstart](https://docs.stripe.com/capital/getting-started.md#quickstart), and then customize it with embedded components or the API.

| Program                        | No-code                                                                                                                                                         | Embedded components (Recommended)                                                                                                                                                                                                                                                                                        | API                                                                    |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **Country availability**       | Available in the US                                                                                                                                             | Available in the US, AU, GB, FR, DE                                                                                                                                                                                                                                                                                      | Available in the US, AU, GB, FR, DE                                    |
| **Estimated integration time** | Minutes (with no additional marketing)                                                                                                                          | Hours to days                                                                                                                                                                                                                                                                                                            | Weeks                                                                  |
| **Capital offer emails**       | Stripe sends co-branded offer emails                                                                                                                            | (Optional) Stripe sends co-branded offer emails (US only) or (Recommended) the platform sends offer emails (AU, GB, FR, DE)                                                                                                                                                                                              | (Recommended) Platform sends offer emails                              |
| **In-product notifications**   | (Optional) Use embeddable components to notify connected accounts in your website (such as a [promo tile](https://docs.stripe.com/capital/promotional-tile.md)) | Use the [promo tile](https://docs.stripe.com/capital/promotional-tile.md) or [financing promotion](https://docs.stripe.com/connect/supported-embedded-components/capital-financing-promotion.md) embedded component to promote new financing offers                                                                      | (Optional) Platform can build custom notifications or banners          |
| **Capital application**        | Stripe-hosted co-branded application flow                                                                                                                       | Use the Capital [financing promotion](https://docs.stripe.com/connect/supported-embedded-components/capital-financing-promotion.md) or [financing application](https://docs.stripe.com/connect/supported-embedded-components/capital-financing-application.md) component to embed the application flow into your website | Stripe-hosted UI application flow or embedded components               |
| **Marketing**                  | Use Stripe to send co-branded emails and [pre-approved marketing assets](https://docs.stripe.com/capital/servicing.md#support-article-template).                | Publish [pre-approved marketing assets](https://docs.stripe.com/capital/servicing.md#support-article-template) or edit existing marketing templates or publish your own marketing assets                                                                                                                                 | Edit existing marketing templates or publish your own marketing assets |
| **Metrics and insights**       | View metrics in the Stripe Dashboard                                                                                                                            | View metrics in the Stripe Dashboard                                                                                                                                                                                                                                                                                     | View some metrics in the Stripe Dashboard                              |
| **Compliance**                 | Stripe conducts a compliance review of custom marketing assets and periodic program audits                                                                      |
| **Underwriting and pricing**   | Stripe manages the entire underwriting process and sets pricing                                                                                                 |
| **Servicing**                  | Stripe manages servicing of customer financing                                                                                                                  |

To update metrics about offer emails, [call the API](https://docs.stripe.com/capital/api-integration.md#mark-the-offer-as-delivered).

## See also

- [Set up a no-code integration](https://docs.stripe.com/capital/no-code-integration.md)
- [Set up an embedded components integration](https://docs.stripe.com/capital/embedded-component-integration.md)
- [Set up an API integration](https://docs.stripe.com/capital/api-integration.md)
