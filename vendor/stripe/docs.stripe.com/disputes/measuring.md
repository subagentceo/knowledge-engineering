# Measuring disputes

Learn about the potential issues that occur from excessive disputes, and how to avoid them.

The Stripe Dashboard displays two different calculations to measure your disputes: dispute activity and dispute rate.

- **Dispute activity** represents the percentage of disputes on successful payments by *dispute* date.

- **Dispute rate** represents the percentage of disputes on successful payments by *charge* date.

The two calculations are best understood with an example. Let’s say you processed 1,000 payments in a given week. In that same week, you also received 10 disputes.

Only 3 of those disputes were from the 1,000 payments processed that week. The other 7 disputes were from payments that were processed at an earlier date. (Because disputes take a while to come in, this delay is very common.)

The dispute activity for this week would be 1% (10 disputes on 1,000 payments). The dispute rate for this week would be 0.3% (3 disputes on 1,000 payments).

## Dispute activity 

Dispute activity and dispute rate serve different purposes. The *card networks’* (A network that processes the transactions of a particular card brand. It might be an intermediary in front of an issuing bank as with Visa or Mastercard, or a standalone entity as with American Express) [dispute and card fraud monitoring programs](https://docs.stripe.com/disputes/monitoring-programs.md) use the dispute *activity* calculation. If the dispute activity for your business exceeds the thresholds set by the networks for a prolonged period of time (usually multiple months), you might be subject to fines. You can find the dispute activity for your account in the [Dashboard](https://dashboard.stripe.com)’s **Analytics** section.
![](https://b.stripecdn.com/docs-statics-srv/assets/dispute-activity.046c3a284d88711a779563ddfdf1d694.png)

## Dispute rate 

The dispute *rate* is a more accurate representation of fraud and disputes for your business, because it shows which actual payments were disputed. For example, you could use the dispute rate to see a particular sale that resulted in more disputes than usual, or to pick out fraud attack patterns.

Because cardholders can dispute a charge up to 120 days after a payment was made ([and sometimes even later](https://docs.stripe.com/disputes/how-disputes-work.md#timing)), the dispute rate might change for dates more recent than 120 days old. We show this calculation on the [Radar for Fraud Teams](https://dashboard.stripe.com/radar) page in the Dashboard.
![](https://b.stripecdn.com/docs-statics-srv/assets/dispute-rate.66d11e172aa7ab72dc50ad8fbb1d939d.png)

## Excessive dispute activity 

Each *card network* (A network that processes the transactions of a particular card brand. It might be an intermediary in front of an issuing bank as with Visa or Mastercard, or a standalone entity as with American Express) maintains a series of [dispute and card fraud monitoring programs](https://docs.stripe.com/disputes/monitoring-programs.md) that apply to businesses operating with high dispute activity. Excessive dispute activity not only affects your ability to process with Stripe, but with other processors as well—and can even result in fines from the card networks. All disputes, whether they’re won or lost, count towards your dispute rate, so the best strategy to avoid monitoring programs is [dispute prevention](https://docs.stripe.com/disputes/prevention.md).

The credit card processing industry standard recognizes dispute activity above 0.75% as excessive, but other factors, such as a sudden spike or steep upward trend can trigger placement in a monitoring program before dispute activity reaches the 0.75% threshold. For this reason, if we ever see higher dispute activity or a significant increase in potentially fraudulent activity on your account, we’ll proactively reach out to see how we can help.

## Predicted dispute activity 

In some cases, our AI models can predict if your account might be in danger of excessive dispute activity at a point in the future. If that happens, we’ll alert you so that you can take proactive steps to [identify and prevent disputes and fraud](https://docs.stripe.com/disputes/prevention.md).
![](https://b.stripecdn.com/docs-statics-srv/assets/dispute-fraud.07e969ae8b005b82469897fb166764f0.png)

Though we can predict dispute trends with some confidence, we can’t predict which particular payments will be disputed. Keep in mind that we can’t be certain of the predicted rate—your actual dispute activity depends upon any further disputes received.

## Early fraud warnings 

[Early fraud warnings](https://docs.stripe.com/disputes/how-disputes-work.md#early-fraud-warnings) (EFWs) are messages from Visa, Mastercard, and JCB that *card issuers* (The entity that issued a payment card to a cardholder. This could be a bank, such as with the Visa or Mastercard network, or it could be the card network itself, such as with American Express) on these three networks generate to flag payments they suspect might be fraudulent.

These aren’t informational notes from the *card networks* (A network that processes the transactions of a particular card brand. It might be an intermediary in front of an issuing bank as with Visa or Mastercard, or a standalone entity as with American Express). EFWs do sometimes provide the opportunity for you to refund a fraudulent payment before it becomes a fraud dispute, but they’re equally as important when used as a metric by the networks to measure a business’s propensity for fraudulent transactions. Visa in particular counts these fraud warnings toward identification in their [VAMP monitoring program](https://docs.stripe.com/disputes/monitoring-programs.md#VAMP).

## See also

Now that you have learned about measuring disputes, you may want to learn more about how to prevent disputes, or move on to related subjects:

- [Preventing disputes and fraud](https://docs.stripe.com/disputes/prevention.md)
- [How to continuously improve your fraud management with Radar](https://stripe.com/guides/improve-fraud-management-with-radar-for-fraud-teams-and-stripe-data)
- [Identifying fraud](https://docs.stripe.com/disputes/prevention/identifying-fraud.md)
- [Query disputes and fraud data](https://docs.stripe.com/data/query-disputes-and-fraud-data.md)
- [Types of fraud](https://docs.stripe.com/disputes/prevention/fraud-types.md)
