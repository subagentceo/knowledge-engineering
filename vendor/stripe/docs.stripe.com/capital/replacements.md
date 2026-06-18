# Replacements

Learn how to handle financing offer replacements.

> Capital for platforms is available in [public preview](https://docs.stripe.com/release-phases.md).

Capital financing applications allow connected accounts to link third-party data to receive updated financing offer terms, such as a higher financing amount. Financing offer replacements give your platform visibility into the offer history of your connected accounts. This guide describes how to manage financing offer replacements.

Without replacements, when an account receives an offer with new terms, Stripe updates the existing [FinancingOffer](https://docs.stripe.com/api/capital/connect_financing_object.md). Your platform can’t access any record of previous offers. With replacements, Stripe creates a `FinancingOffer` object representing the new offer, giving your platform the ability to access both existing and new offers.

The following example illustrates how a connected account might receive a replacement offer:

1. Stripe creates an undelivered financing offer for the connected account with a maximum loan amount of 5,000 USD.
2. Your platform sends the connected account an offer email and marks the offer as delivered.
3. The connected account navigates to the Capital financing application and links their bank account.
4. Stripe determines the connected account is eligible for a new maximum loan amount of 10,000 USD.
5. Stripe replaces the connected account’s original 5,000 USD offer with a new 10,000 USD offer.

## Before you begin

- This guide assumes you completed an [API integration](https://docs.stripe.com/capital/api-integration.md).
- Financing offer replacements aren’t enabled by default. After you update your integration to support replacements, you must submit details about your integration and API use to Stripe for compliance review using the [Change Request Form](https://form.asana.com/?k=8K51UWmWhttehNFD5qBLdg&d=974470123217835).

## Create a delivered test offer

1. [Create a sandbox](https://docs.stripe.com/sandboxes/dashboard/manage.md#create-a-sandbox).

2. Go to the [Capital](https://dashboard.stripe.com/test/connect/capital) page in the Dashboard.

3. To generate a test offer, click **Create** and select the parameters for the offer creation.

   - For the connected account, select an existing connected account by searching for the account’s ID or leave it blank and Stripe will generate an account for you.
   - You can select the type of offer and, if it’s a refill, the test account. You can also select the offer terms (amount, fee, and payment rate).
   - If you prefer, create a new connected account in the [Stripe Dashboard](https://docs.stripe.com/connect/dashboard/managing-individual-accounts.md#creating-accounts).
   - For test offers, you don’t need to link the bank account.
   - View account details of your newly created connected account: `https://dashboard.stripe.com/test/connect/accounts/:merchant_id`.

4. Before finalizing the offer creation by clicking **Create Financing Offer**, first set the offer status to `delivered` because the actual offer delivery in an email isn’t necessary for testing.

5. Click **Create Financing Offer** to create the offer for the test connected account.

   The result is a `delivered` test financing offer. In the Dashboard, you can view each financing offer for your connected accounts in the [Financing Reporting](https://dashboard.stripe.com/test/connect/capital/financing_offers) page. You can view [metrics](https://docs.stripe.com/capital/reporting.md) in the [Financing Overview](https://dashboard.stripe.com/test/connect/capital) page.

## Replace the offer

1. Click the overflow menu (⋯) next to the delivered offer, and select **Replace offer**.

   > **Replace offer** only appears for offers that have never been replaced and have a `status` of `undelivered` or `delivered`.

2. Click **Replace** at the bottom of the modal to replace the offer.

   Stripe sends the `capital.financing_offer.replacement_created` webhook after a replacement [financing offer](https://docs.stripe.com/api/capital/connect_financing_object.md) is created. The body of the webhook contains details about the replacement financing offer.

   ```json
   {
       "type": "capital.financing_offer.replacement_created",
       "data": {
           "object": {
               "id": "financingoffer_xyz456",
               "object": "capital.financing_offer",
               "account": "acct_efg678",
               "status": "delivered",
               "financing_type": "flex_loan",
               "offered_terms": {
                   "currency": "usd",
                   "advance_amount": 100000,
                   "fee_amount": 10000,
                   "withhold_rate": 0.15
               },
               "replacement_for": "financingoffer_abc123",
               ...
           }
       }
   }
   ```

   Notice that the replacement offer has status delivered. When a connected account receives a replacement offer, it becomes their current active offer.

3. Update your *webhook* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) integration to handle the `capital.financing_offer.replacement_created` webhook. If your internal data models store the connected account’s active financing offer ID, make sure you update the ID to the connected account’s replacement offer.

## Retrieve the replaced offer

After replacing the offer, you’re redirected to a page with details about the replacement offer. The events table contains an event **Account acct\_egg678 has a replacement financing offer for financingoffer\_abc123**, providing a reference to the user’s original offer ID.

[Retrieve](https://docs.stripe.com/api/capital/financing_offers/retrieve.md#retrieve_financing_offer) `financingoffer_abc123`. Notice that the status is `replaced`, and the `replacement` attribute has the value `financingoffer_xyz456`, indicating `financingoffer_xyz456` replaced `financingoffer_abc123`.

```json
{
  "id": "financingoffer_abc123",
  "object": "capital.financing_offer",
  "status": "replaced",
  "replacement": "financingoffer_xyz456",
  ...
}
```

`Replaced` is a terminal state. If the connected account accepts their replacement offer, all future offer state transitions affect the replacement offer.

## See also

- [Set up an API integration](https://docs.stripe.com/capital/api-integration.md)
