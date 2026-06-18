# Build a custom Capital program

Integrate with our API to build a custom Capital program.

> Capital for platforms is available in [public preview](https://docs.stripe.com/release-phases.md).

[Stripe Capital](https://docs.stripe.com/capital/how-capital-for-platforms-works.md) enables your platform to retrieve prequalified financing offers for your connected accounts, expose a compliant financing offer application, and provide ongoing reporting for in-progress financing.

This guide describes how [Connect](https://docs.stripe.com/connect.md) platforms can integrate with the [Capital API](https://docs.stripe.com/api/capital/financing_offers.md).

### Capital lifecycle

To launch the program, your platform must support the three phases of the Capital lifecycle:

- Marketing financing offers to eligible users.
- Providing access to the financing reporting page for in-progress financing.
- Continuing to provide access to the financing reporting page after users have fully paid their financing.

This guide explains how to:

- Retrieve financing offers for eligible users.
- Make the financing application available to users.
- Provide users access to the financing reporting page.

## Confirm your branding settings [Dashboard]

All users who receive Capital offers see your business name, icon, logo, and branding color in the offer emails, application, and financing reporting page.

Navigate to your **[Connect branding settings](https://dashboard.stripe.com/settings/connect/stripe-dashboard/branding)**, and make sure your platform’s branding settings are correct.
![Capital offer application page](https://b.stripecdn.com/docs-statics-srv/assets/offer-page.66c647c99e2b25b314b7ca8be2cc98a4.png)

## Create a test undelivered financing offer [Dashboard]

We recommend using a *sandbox* (A sandbox is an isolated test environment that allows you to test Stripe functionality in your account without affecting your live integration. Use sandboxes to safely experiment with new features and changes) to build your integration. In a sandbox, visit the [Capital Dashboard](https://dashboard.stripe.com/test/connect/capital).

1. Click **Create** to open the **Create financing offer** modal, which allows you to create test financing offers. The default options create an undelivered financing offer with a 1,000 USD financing amount.
2. Leave the default options, and click **Create financing offer**.
3. From the Dashboard, click the row corresponding to the offer you created.

The loans and financing section of the connected account details page displays details about the user’s financing offer.

## Retrieve financing offers [Server-side]

You can retrieve financing offers for all of your platform’s users with the [List financing offers](https://docs.stripe.com/api/capital/financing_offers/list.md) endpoint.

#### curl

```bash
curl https://api.stripe.com/v1/capital/financing_offers \
  -u <<YOUR_SECRET_KEY>>:
```

If the offer is successfully created, you receive a response similar to the following:

```json
{
  "object": "list",
  "url": "/v1/capital/financing_offers",
  "has_more": false,
  "data": [
    {
      "id": "financingoffer_abc123",
      "object": "capital.financing_offer"
      ...
    },
    {...}
  ]
}
```

You can look up a financing offer using the [Retrieve financing offer](https://docs.stripe.com/api/capital/financing_offers/retrieve.md#retrieve_financing_offer) endpoint. Retrieve the first financing offer from the list above.

#### curl

```bash
curl https://api.stripe.com/v1/capital/financing_offers/financingoffer_abc123 \
  -u <<YOUR_SECRET_KEY>>:
```

## Send offer email [Server-side]

Stripe sends the `capital.financing_offer.created` *webhook* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) after a financing offer is created. Update your webhook integration to listen for the `capital.financing_offer.created` webhook. If you send your own offer emails, the webhook is an important notification to notify the user of their offer.

You must configure Capital webhook events from your account, not as Connect webhooks. Although these events carry data about connected accounts, Stripe creates and manages financing offers on your platform account. Set up your Capital webhook endpoint in the [Dashboard](https://dashboard.stripe.com/webhooks) or using the [Webhook Endpoints API](https://docs.stripe.com/api/webhook_endpoints/create.md) without a `connect` parameter to register it as a platform account webhook rather than a Connect webhook that listens for activity on connected accounts.

> Make sure the contents of your offer email comply with banking regulations by reviewing the [marketing guidance](https://docs.stripe.com/capital/marketing.md) page. Submit all changes to user-facing materials for review and approval using the [Change Request Form](https://form.asana.com/?k=8K51UWmWhttehNFD5qBLdg&d=974470123217835).

In the email, link users to a dedicated Capital section in your platform dashboard. Users access the Capital financing application with [Account Links](https://docs.stripe.com/api/account_links.md). Account Links expire shortly after they’re generated, so provide a way for users to regenerate the application link. Include a link to the financing application in your platform dashboard by generating an Account Link of type `capital_financing_offer`.

### Handle Account Link Expiration

Don’t send an Account Link URL directly in an offer email because the Account Link can expire before the recipient even opens the email. Instead, include a stable URL hosted on your platform (for example, `https://yourplatform.com/capital/accept_offer`). Configure the link to:

1. Authenticate the user.
2. Generate a new Account Link using the API.
3. Redirect the user to the newly generated Account Link URL.

This way, the user always receives a fresh, valid Account Link regardless of when they open the email.

#### curl

```bash
curl https://api.stripe.com/v1/account_links \
  -u <<YOUR_SECRET_KEY>>: \-d account=acct_123 \
  # The URL the user will be redirected to if the account link is expired, has been previously-visited, or is otherwise invalid.
  -d refresh_url="https://example.com/reauth" \
  # The URL the user will be redirected to after completing the linked flow.
  -d return_url="https://example.com/thanks" \
  -d type=capital_financing_offer
```

If the creation of an account link is successful, you receive a response similar to the following:

```json
{
  "object": "account_link",
  "created": 1611264596,
  "expires_at": 1611264896,
  "url": "https://connect.stripe.com/capital/offer/SrjgLUfa0O7K"
}
```

After updating your webhook integration, create another offer in the [Dashboard](https://dashboard.stripe.com/test/connect/capital), and verify you receive the `capital.financing_offer.created` webhook.

### Mark the offer as delivered

Update your webhook integration to [mark the financing offer as delivered](https://docs.stripe.com/api/capital/financing_offers/mark_delivered.md) after sending the offer email. You can verify that the financing offer’s status is delivered using either the [Dashboard](https://dashboard.stripe.com/test/connect/capital) or the [Financing Offers API](https://docs.stripe.com/api/capital/financing_offers/retrieve.md).

#### curl

```bash
curl https://api.stripe.com/v1/capital/financing_offers/financingoffer_abc123/mark_delivered \
  -u <<YOUR_SECRET_KEY>>:
```

You must mark an offer as delivered to verify with Stripe that you’ve marketed the offer to the connected account. When you send your offer emails, you need to BCC [capital-offers@stripe.com](mailto:capital-offers@stripe.com).

## Listen for status changes [Server-side]

In addition to the `capital.financing_offer.created` webhook, Stripe sends additional webhooks as the financing offer transitions through different states. Stripe sends all Capital webhooks to your platform account webhook endpoint, not to a Connect webhook endpoint. You can receive any of the following webhooks related to Capital:

| **Webhook identifier**                        | **Trigger**                                                                                               |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `capital.financing_offer.created`             | Financing offer is created                                                                                |
| `capital.financing_offer.accepted`            | User submits their offer application                                                                      |
| `capital.financing_offer.paid_out`            | Stripe approves the offer application and funds are paid out to the user                                  |
| `capital.financing_offer.fully_repaid`        | User fully pays the financing balance                                                                     |
| `capital.financing_offer.canceled`            | User cancels the financing offer                                                                          |
| `capital.financing_offer.rejected`            | User’s application isn’t approved                                                                         |
| `capital.financing_offer.expired`             | Financing offer expires and is no longer available                                                        |
| `capital.financing_offer.replacement_created` | Financing offer is [replaced](https://docs.stripe.com/capital/replacements.md) with a new financing offer |

From the [Dashboard](https://dashboard.stripe.com/test/connect/capital), find the offer you delivered earlier.

1. Click the overflow menu (⋯).
2. Click the **Expire offer** option, which lets you simulate expiring the offer.
3. Verify you receive the `capital.financing_offer.expired` webhook.

With the exception of `capital.financing_offer.canceled`, you can simulate all webhooks while in a testing environment.

## Apply for an offer [Dashboard] [Server-side]

You can simulate the `capital.financing_offer.accepted` webhook by applying for an offer.

1. From the [Dashboard](https://dashboard.stripe.com/test/connect/capital), create a delivered offer with a maximum financing amount of 20,000 USD.
2. Generate an account link of type `capital_financing_offer`, and go to the link. Here, you can preview what the application looks like for your users.
3. Continue to the end of the application, and click **Submit**.
4. Verify you received the `capital.financing_offer.accepted` webhook.
5. View the offer in the Dashboard, and check it has status accepted.

### View the application tracker

A financing offer with status accepted is pending application review by the Stripe [servicing](https://docs.stripe.com/capital/servicing.md) team. While this review takes place, you can direct the user to the financing reporting page. The financing reporting page contains an application tracker with an approximate timeline of the application review.

Generate an [Account Link](https://docs.stripe.com/api/account_links.md) of type `capital_financing_reporting`.

#### curl

```bash
curl https://api.stripe.com/v1/account_links \
  -u <<YOUR_SECRET_KEY>>: \-d account=acct_123 \
  # When the user refreshes the page, where should we redirect them
  -d refresh_url="https://example.com/reauth" \
  # When the user completes the application, where should they return
  -d return_url="https://example.com/thanks" \
  -d type=capital_financing_reporting
```

Navigate to the link, and view the application tracker.

## Approve the application [Dashboard]

In the [Dashboard](https://dashboard.stripe.com/test/connect/capital), find the row corresponding to the accepted offer.

1. Click the overflow menu (⋯).
2. Click the **Approve and disburse funds** option, which lets you simulate an application approval and funds disbursal.
3. Verify you receive the `capital.financing_offer.paid_out` webhook, which notifies you that the financing has been paid out.
4. Generate another [Account Link](https://docs.stripe.com/api/account_links.md) of type `capital_financing_reporting`. This reporting page provides access to outstanding balance and payout and payment transaction details for the user’s in-progress financing.
5. Click **Make payment**, and create a manual payment.

> It takes up to 15 minutes for the **Make payment** button to be enabled on the reporting page for test financing offers.

After the transaction is processed, view the payment in the transactions table. You can programmatically view the user’s paid-down financing amount for in-progress financing using the [financing summary API](https://docs.stripe.com/api/capital/financing_summary.md).

#### curl

```bash
curl https://api.stripe.com/v1/capital/financing_summary \
  -u <<YOUR_SECRET_KEY>>: \
  -H "Stripe-Account: {{CONNECTED_ACCOUNT_ID}}" \
```

If the retrieval of the financing summary is successful, you receive a response similar to the following:

```json
{
  "object": "capital.financing_summary",
  "details": {
    "currency": "usd",
    "advance_amount": 1000000,
    "fee_amount": 100000,
    "withhold_rate": 0.2,
    "remaining_amount": 999950,
    "paid_amount": 50,
    "current_repayment_interval": {
      "due_at": 123456789,
      "remaining_amount": 50,
      "paid_amount": 50
    },
    "repayments_begin_at": 123456789,
    "advance_paid_out_at": 123456789
  }
}
```

## Fully pay the financing [Dashboard]

In the [Dashboard](https://dashboard.stripe.com/test/connect/capital), find the row corresponding to the paid-out financing.

1. Click the overflow menu (⋯).
2. Click the **Repay offer** option, which lets you simulate fully paying down the financing balance.
3. Verify you receive the `capital.financing_offer.fully_repaid` webhook, which notifies you that the financing has been fully paid.
4. Generate another [Account Link](https://docs.stripe.com/api/account_links.md) of type `capital_financing_reporting`.

After a user pays the total amount of their financing, they can access past financing details on the reporting page at any time.

## Review your test integration

By now, your integration:

- Responds to the `capital.financing_offer.created` webhook by sending an offer email and marking the offer as delivered
- Exposes the financing application link in your platform dashboard
- Exposes the financing reporting link in your platform dashboard

The Capital section of your platform dashboard might appear differently depending on which phase the user’s financing is in. Review the state diagram below for a list of possible financing offer status values.
Capital financing offer state machine (See full diagram at https://docs.stripe.com/capital/api-integration)
## Prepare to enable automatic offers

When automatic offers are enabled in live mode, Stripe automatically creates financing offers for your users on a daily basis. Before enabling automatic offers, make sure that you:

1. Confirm and update email addresses for your users through the [Comms Center](https://dashboard.stripe.com/connect/comms_center/collect) if you’re planning to leverage Stripe co-branded no-code offer emails. To be eligible for Capital financing, users must have an email saved with Stripe so that they can receive transactional emails such as payment progress updates.
2. [Contact us](mailto:capital-review@stripe.com) to enable live mode access to the financing offers API.

### Enable additional features

Over time, some of your users might become eligible for refills. Refills are additional financing offers sent to users who have made substantial payment progress towards their in-progress loans. Follow the [refills integration guide](https://docs.stripe.com/capital/refills.md) to update your integration to support refill financing offers.

If you want to include Capital transactions on your platform dashboard and update your users payout reporting, refer to the [reporting and reconciliation guide](https://docs.stripe.com/capital/reporting-and-reconciliation.md).

## See also

- [Refill offers](https://docs.stripe.com/capital/refills.md)
- [Replace offers](https://docs.stripe.com/capital/replacements.md)
