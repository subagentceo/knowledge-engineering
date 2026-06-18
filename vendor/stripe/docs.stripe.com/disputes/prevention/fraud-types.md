# Common types of online fraud

Learn about the different kinds of fraud and what your liability is.

A payment is considered fraudulent when the cardholder didn’t authorize it. Most fraudulent payments are made using stolen cards or card numbers. When a cardholder is notified that the payment has been made or they review their card statement, they contact their *card issuer* (The entity that issued a payment card to a cardholder. This could be a bank, such as with the Visa or Mastercard network, or it could be the card network itself, such as with American Express) to dispute it.

Online fraud is fundamentally different to fraud that occurs at brick-and-mortar businesses as it’s harder to be certain that the person you’re selling to is who they say they are. Some fraudulent actors adopt more sophisticated methods than just trying to make purchases on a stolen card. When accepting payments online, it’s important to be aware of the different kinds of fraud and what your liability is.

## Suspected fraud 

Another type of suspected fraud notification you might receive is an [early fraud warning](https://docs.stripe.com/disputes/how-disputes-work.md#early-fraud-warnings) from the card issuer, which indicates that fraudulent activity was reported against a card used in a payment to you.

Stripe’s AI model continuously monitors all payments processed by our users. In rare cases, you might receive a notification from Stripe that we suspect a payment is fraudulent after the card issuer authorizes it. This can occur if we detect subsequent activity on the card that now suggests it’s being used fraudulently.

Although we notify you as soon as we become aware of any suspicious activity, it might be several days after a payment is made. Keep in mind that this prediction isn’t a guarantee that a payment is fraudulent—only that we have reason to believe it is.

We provide this information to you to make sure that you can make an informed decision and take action where necessary (for example, contact the customer or place their order on hold). If you have any concerns about the payment after reviewing it, consider [refunding it immediately](https://docs.stripe.com/disputes/prevention/best-practices.md#consider-proactively-refunding-suspicious-payments) to proactively prevent a dispute and avoid a dispute fee.

> While a customer can’t dispute fully refunded payments, they can dispute partially refunded payments. Card network rules even allow for a payment that was partially refunded to be disputed for the full payment amount.

## Stolen cards 

This type of fraud makes use of stolen credit or card details to make a purchase online. The fraudulent actor might be in possession of a physical card, but it’s more likely that the cardholder’s details were stolen electronically. A business ships goods or provides service to the fraudulent actor, with the assumption that the payment is legitimate.

If a cardholder hasn’t realized yet that their card is lost or stolen (and so hasn’t notified the *card issuer* (The entity that issued a payment card to a cardholder. This could be a bank, such as with the Visa or Mastercard network, or it could be the card network itself, such as with American Express)), you can still process payments successfully. Even if a payment isn’t declined, this doesn’t mean that it was authorized.

After the cardholder discovers the fraudulent use of their card, they dispute the payment with the card issuer. If the dispute is resolved in favor of the cardholder, the business suffers a loss equal to the amount of the payment, and the cost of any goods or services already provided. The business is also subject to a dispute fee.

### Overpayment fraud 

Overpayment fraud (also known as a *payout* (A payout is the transfer of funds to an external account, usually a bank account, in the form of a deposit) scam) is a variant of stolen card fraud. The fraudulent actor presents themselves as requiring the services of a third-party service in connection with the purchase. The fraudulent actor then offers to pay the seller the cost of the goods, an extra sum for the fraudulent third-party, and often an additional convenience (tip) for accommodating the request. The fraud being committed here is that the third-party service doesn’t exist—the fraudulent actor has taken the additional funds while the seller is left with a dispute.

For example, an online antique business might be approached by a fraudulent actor claiming to live overseas. They request that the business use their preferred freight company, who they ask the business to make payment to. Using stolen card information, the fraudulent actor pays the business for the goods and fake freight fee, and includes a gratuity for the seller as an incentive.

The business complies and pays the fee to this fake freight company but no shipment ever occurs because there is no legitimate shipper. The actual cardholder discovers the unauthorized payment and disputes it with their card issuer. The payment is automatically refunded and a dispute fee deducted, even though they’ve already paid out funds separately to a fraudulent third-party.

## Card testing 

This is the practice of testing a card (or multiple cards) on one site to see if it’s still valid before using it on another site to make a fraudulent payment. Sites with free text fields, such as donation sites and “pay what you like” e-commerce businesses, are predominately the targets of card testing. Implementing [CAPTCHA](http://captcha.net/) or rate-limiting charges can help combat this type of fraud. To learn more see, [Protect yourself from card testing](https://docs.stripe.com/disputes/prevention/card-testing.md).

## Alternative refunds 

In this form of fraud, the fraudulent actor deliberately pays more than was required, then contacts the business, and claims they accidentally entered the wrong amount. The fraudulent actor requests a partial refund to rectify this, but claims they have closed the card that was used and would like a refund sent using an alternative method that’s outside of the card network (for example, check or wire transfer).

For example, a fraudulent actor donates 500 USD to a charity and contacts them shortly after to say that it should have been a 50 USD donation. The fraudulent actor asks for the return of 450 USD using a different method, so no refund is made back to the original card. When the legitimate cardholder disputes the fraudulent payment, the charity isn’t only responsible for the disputed amount, they have also lost the amount sent using the alternative method.

Never refund payments using a different method than the one originally used. If a card has legitimately been closed, you can still perform a refund. The customer should then contact that card issuer to arrange the funds to be retrieved.

## Marketplace fraud 

If you run a marketplace business (such as a *Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients) platform) where your users are responsible for providing service to your customers, this type of fraud occurs when a fraudulent business takes payments without providing the services or goods to customers.

For example, a marketplace that connects buyers and sellers can run the risk of a seller taking payment from the buyer and not sending the goods. In such cases, if the funds can’t be recovered from the seller, [responsibility](https://docs.stripe.com/connect/account-balances.md#accounting-for-negative-balances) for the disputed amount and fee is ultimately on the platform.

## Friendly fraud 

Friendly fraud—also known as “first-party misuse” or “first-party fraud”—occurs when a legitimate cardholder makes a purchase, but then disputes it at a later date. This can either be accidental, because they didn’t recognize the transaction on their statement, or deliberate (for example, due to buyer’s remorse or as an attempt to fraudulently obtain merchandise without paying).

It can be difficult to know whether friendly fraud has occurred, especially in digital sales. For those selling physical goods, shipping to a verified billing address and requiring signature on delivery can help combat this. In addition, having clear return policies prominently displayed at checkout to which the customer must agree prior to making a purchase can also help.

[Visa Compelling Evidence 3.0](https://docs.stripe.com/disputes/best-practices.md#visa-ce-30) established new rules to challenge friendly fraud by showing previous non-fraud transactions with the same cardholder within a specified period. Stripe supports Visa CE 3.0 by identifying qualifying transactions in your history on our platform to determine eligibility for evidence submission under the Visa CE 3.0 rules. We then pre-populate the dispute response with most of the required evidence you need to significantly increase your likelihood of overturning the dispute in your favor. You can also self select previous non-fraud transactions and submit them to Visa as CE 3.0 using the [Stripe API](https://docs.stripe.com/disputes/api/visa-ce3.md).

## See also

- [Verification checks](https://docs.stripe.com/disputes/prevention/verification.md)
- [Best practices for preventing fraud](https://docs.stripe.com/disputes/prevention/best-practices.md)
- [Identifying fraud](https://docs.stripe.com/disputes/prevention/identifying-fraud.md)
- [Using Radar with Connect](https://docs.stripe.com/connect/radar.md)
