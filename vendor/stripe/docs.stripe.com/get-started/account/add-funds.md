# Add funds to your Stripe balance

Cover increased refunds and chargebacks by adding funds to your balance.

To add funds to pay out to connected accounts, [add funds to your platform balance](https://docs.stripe.com/connect/top-ups.md).

To maintain stability in your business when your account has a negative balance or when you expect an increase in customer refunds or disputes, you can add funds directly to your Stripe balance using a wire or bank transfer.

For businesses using automatic payouts, we recommend that you set a [minimum balance](https://docs.stripe.com/payouts/minimum-balances-for-automatic-payouts.md) to ensure timely processing of refunds.

## Payment method availability

In several markets, funds are added to a Stripe VBAN (which helps reconciliation speed) using a local bank credit transfer. These include: AMER (United States), EMEA (United Kingdom, EUR Currency markets) and APAC (Japan).

In other markets, funds are added using a wire transfer, which follows slightly different times and processes. Only wire transfers are available in the following regions and countries: AMER (Canada), EMEA (Non-EUR Currency markets: BG, CZ, HU, LI, GI, RO), APAC (AU, NZ, SG, HK, IN, TH, MY), and LatAm (BR, MX). Stripe VBAN isn’t available in these regions and countries.

## Payments balance

In the US, UK, and JP, you can add funds directly to the payments balance. We recommend this option for most businesses because it avoids transiting funds through a separate balance.

For businesses using automatic payouts, funds added to the payments balance in excess of the [minimum balance](https://docs.stripe.com/payouts/minimum-balances-for-automatic-payouts.md) are paid out in the next payout. You can configure your payout schedule and minimum balance settings in your [Payout settings](https://dashboard.stripe.com/settings/payouts).

## Refunds and disputes balance

You can also add funds to the **Future refunds or disputes balance** ([refund_and_dispute_prefunding](https://docs.stripe.com/api/balance/balance_object.md#balance_object-refund_and_dispute_prefunding)), which is a separate balance. These funds are never included in an automatic payout, but you can initiate a manual payout at any time.

Stripe first attempts to process refunds and disputes from your available payments balance. If your payments balance is insufficient, Stripe uses these reserved funds. If these reserved funds are also insufficient, then your payments balance might go negative.

> #### Payouts reconciliation
> 
> For businesses using automatic payouts, balance transactions for refunds and disputes funded from the **Future refunds or disputes balance** aren’t included in [payouts reconciliation reports](https://docs.stripe.com/payouts/reconciliation.md).

## Financial account

In the US and UK, you can add funds to a [financial account](https://docs.stripe.com/treasury.md) in the Stripe Dashboard. A financial account lets you store funds, send and receive money, convert currencies, and create spend cards.

## Add funds 

This section outlines the steps to send funds from your bank using the Dashboard to add them to your Stripe balance.

### Before you send funds

You can send funds from an external bank account to fund your financial account. In the US, you can send funds with an ACH transfer or wire. With ACH, funds are available in about 3 days after you initiate the transfer from your bank. With wire transfers, funds are available within the day. Additional charges apply if funding with a wire.

1. On the [Balances](https://dashboard.stripe.com/balance/overview) page, click **Add funds**.
2. Select the balance to add money to.
3. Enter the amount and click **Next**.
4. Verify the account details to send money through ACH, RTP, a wire, or other local payment from your bank. Click **Done**.

### After you send funds

1. After your bank has sent the funds, navigate back to the Balances page, and click **Add to balance**.
2. If the modal prompts you for a receipt, upload a screenshot or document that confirms your bank transferred the funds. To fund your Stripe balance faster, you might need to provide a screenshot or PDF of your bank’s transfer or wire confirmation.
3. Click **Confirm transfer**.

## View your funds 

After Stripe receives the funds, we show the added funds in the [Balances](https://dashboard.stripe.com/balance/overview) page.

You also receive a [balance.available](https://docs.stripe.com/api/events/types.md#event_types-balance.available) webhook. The following example event shows a balance snapshot with details of `refund_and_dispute_prefunding` balances:

#### balance-available

```json
{
  "id": "{{EVENT_ID}}",
  "object": "event",
  "type": "balance.available",
  "data": {
    "object": {
      "object": "balance",
      //...
      "available": [
        {
          "amount": 1000,
          "currency": "usd",
          "source_types" : {
            "bank_account": 100,
            "card": 900
          }
        },
        {
          "amount": 0,
          "currency": "eur",
          "source_types" : {
            "bank_account": 0,
            "card": 0
          }
        }
      ],
      "pending": [
        //...
      ],"refund_and_dispute_prefunding": {
        "available": [
          {
            "amount": 1000,
            "currency": "usd"
          },
          {
            "amount": 0,
            "currency": "eur"
          }
        ],
        "pending": [
          {
            "amount": 1000,
            "currency": "usd"
          },
          {
            "amount": 0,
            "currency": "eur"
          }
        ]
      }
      // ...
    }
  }
}
```

## Settlement timing 

This table provides the expected timing for fund settlement based on the region and payment transfer method, and can help you understand how long it typically takes for payments to process.

| Region and currency | Payment transfer method | Estimated speed                                                  |
| ------------------- | ----------------------- | ---------------------------------------------------------------- |
| USA (USD)           | Wire transfer           | 1-5 days                                                         |
| USA (USD)           | ACH Credit Transfer     | 1-3 days                                                         |
| USA (USD)           | ACH Debit Transfer      | 5 days                                                           |
| EU (EUR)            | SEPA Credit Transfer    | 1-2 days                                                         |
| UK (GBP)            | FPS                     | 2 hours - 1 day                                                  |
| UK (GBP)            | BACS                    | 2-3 days                                                         |
| Other currencies    | Wire transfer           | 1-7 days (if you provide the correct wire information to Stripe) |

Depending on your account configuration, you might not have access to all the methods mentioned above immediately after launching.

If you’re a new user and haven’t completed a substantial amount of top-ups to Stripe, the timing for fund availability might initially be delayed longer than indicated; however, your initial speed will eventually align with the outlined speeds.

## See also

- [Add funds to your platform balance](https://docs.stripe.com/connect/top-ups.md)
- [Manage prorations for modified subscriptions](https://docs.stripe.com/billing/subscriptions/prorations.md)
