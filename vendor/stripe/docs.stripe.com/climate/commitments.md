# Climate Commitments

Direct a fraction of your revenue to help advance carbon removal.

Help emerging permanent carbon removal technologies scale by allocating a fraction of your revenue to Climate Commitments in the [Dashboard](https://dashboard.stripe.com/setup/climate/activate). Stripe puts these contributions toward projects that remove carbon dioxide (CO2) from the atmosphere to help those projects scale. We select [various projects with the help of scientific expert reviewers](https://stripe.com/climate) and use a [transparent application process](https://github.com/stripe/negative-emissions-source-materials). Following the common pattern of a portfolio approach, some projects might deliver results, and others might fail. To make carbon neutral or net zero claims, use [Climate Orders](https://docs.stripe.com/climate/orders.md).

## Manage and understand your commitment

You can manage your contribution percentage and monitor impact in the [Dashboard](https://dashboard.stripe.com/climate). Stripe Climate Commitments also sends you regular updates with details about your contribution.

You can also manage your commitment from the terminal with the [Stripe CLI](https://docs.stripe.com/stripe-cli.md):

- Set your contribution percentage: `stripe climate commitment enable <rate>` (for example, `stripe climate commitment enable 1` for 1%)
- View your current program: `stripe climate commitment show`
- Turn off your commitment: `stripe climate commitment disable`

## Enable Climate Commitments for Connect

You can enable Climate Commitments for your platform, without affecting accounts on your platform, in your [Dashboard](https://dashboard.stripe.com/climate). If you take an application fee from your connected accounts, you’ll see this reflected in your percentage-based contributions. For destination charges, we apply the percentage-based contribution to the charge minus the transferred amount. For separate charges and transfers, we apply the percentage-based contribution to the entire charge amount.

**For Standard accounts**:

- You can allow new Standard account users to enable Climate contributions during onboarding with the [Climate setting in the Dashboard](https://dashboard.stripe.com/settings/connect/climate). This contributes a portion of their revenue towards carbon removal.
![The Stripe Climate onboarding page for connected accounts](https://b.stripecdn.com/docs-statics-srv/assets/ClimateConnectOnboardingPreview.b8ec04318a01e28f3a24b6ffc0381911.png)

Optional step shown during Standard account onboarding

- Existing Standard accounts can log into their Dashboard to independently enable Climate Commitments. Doing so won’t affect your platform. To inform your Standard connected accounts about Climate Commitments, you can share this direct link to the Climate section of their Dashboard: <https://dashboard.stripe.com/get-started/climate>.

## Promote your commitment

You can demonstrate and explain your commitment to users by doing the following:

- Use the [Climate badge](https://dashboard.stripe.com/climate/commitment) on [Stripe Checkout](https://docs.stripe.com/payments/checkout.md), [Invoices](https://docs.stripe.com/invoicing.md), or [Receipts](https://docs.stripe.com/receipts.md?payment-ui=payment-links).
- Direct them to your Stripe-hosted custom [webpage](https://dashboard.stripe.com/climate/commitment).
- Add an [embeddable badge](https://dashboard.stripe.com/climate/commitment) directly on your website.
- Use reference language from the [Stripe Climate](http://stripe.com/climate) page.

All Climate Commitments users can publish a custom climate page in a few clicks, create embeddable badges, or download our badge asset kit to add the Climate logo to your site, directly from your [Stripe Dashboard](https://dashboard.stripe.com/climate/commitment).
