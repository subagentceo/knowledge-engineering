# Identifying potential fraud

Learn about the most common fraud indicators.

Because Stripe users are responsible for fulfilling orders for customers and possess the most information about their customer at the time of purchase, they’re best equipped to determine whether or not a payment is potentially fraudulent. There are external indicators that indicate a payment might be fraud, such as [Early Fraud Warnings](https://docs.stripe.com/disputes/how-disputes-work.md#early-fraud-warnings), but fraud activity also has many implicit indicators that by themselves don’t unambiguously signal fraud. However, the existence of several of these indicators at the same time can more clearly suggest a payment is fraudulent.

With *Radar* (Stripe Radar helps detect and block fraud for any type of business using machine learning that trains on data across millions of global companies. It’s built into Stripe and requires no additional setup to get started) for Fraud Teams, card payments that have an elevated risk of fraud are automatically placed into [review](https://docs.stripe.com/radar/reviews.md). However, you might want to create additional rules based on the following factors to place additional payments into review—or block them completely. Although our recommendations can help prevent disputes and fraud, they can’t eliminate them completely. We want our users to be as informed as possible, both so that they can accept or refund any payments they believe are fraudulent and so they’re equipped to accept the [financial responsibility](https://stripe.com/terms#chargebacks) of any suspicious payments that enter their Stripe account.

## Common types of fraud indicators

There are many types of fraud indicators, some of which are easy to identify such as false numbers or email addresses, other types may be more intuitive and nuanced, such as a conversation with a customer that seems off. Having an understanding of the various ways fraudsters use false information to make fraudulent transactions will better help you to protect against them. Some of the most common types of fraud indicators are:

- Use of likely false information (for example, fake phone numbers and email addresses like **asdkf12495@freemail.example.com**).
- Inconsistencies in customer details across multiple purchases (for example, using the same e-mail address but a different name for another payment).
- Communication that doesn’t sounds quite right. Fraudsters often use a canned response that is sent to multiple sellers using common phrases. If any communication appears scripted, use a search engine (putting the short phrase in quotes) to see if it’s been used elsewhere (for example, [this particular phrase](https://www.google.com/search?sourceid=gmail&rls=gm&q=%22%20I%20%20would%20like%20to%20proceed%20with%20the%20payment.%20I%27m%20buying%20it%20for%20someone%20special%20as%20a%20gift.%20%22&gws_rd=ssl) has been used many times).
- Unusually large orders (for example, multiples of the same item, only your most expensive merchandise, expensive items or total order amount that seems inconsistent with normal customer behavior).
- Many payments (including those that have been declined) made with:
  - The same card but different shipping addresses.
  - Many cards that use the same shipping address.
  - The same card from the same IP address.
  - The same customer name/email address.
  - If each failed attempt is associated with a different credit card, any successful payment carries a much greater risk for fraud.
  - Similar or the same card numbers, especially over a short duration and for smaller amount. This is especially true for crowdfunding/fundraising sites.
- Any requests to:
  - Split a large order into multiple payments across different cards that don’t share the same verified billing address information.
  - Process a payment manually, either through the Dashboard or your store. Fraudsters may make this request to have the charge run with your local IP address instead of their own.
  - Charge a card more than the required amount (known as an “overcharge”) and pay out a third-party (for example, driver, shipper or freight company) using a different payment method (for example, cash, money order).
  - Charge a card and then provide a refund outside the card network (for example, check, wire transfer).

Declined payments can provide valuable information and should also be regularly reviewed.

## Shipping physical goods

Fraudsters can take advantage of various shipping methods to steal physical goods. When shipping products be sure to:

- Check whether the shipping and billing addresses match. Although a difference in address by itself doesn’t indicate fraud (for example, the customer might have purchased a gift), it indicates that the charge should be looked at more carefully. If the addresses do match and the customer is using a credit card from the US, Canada, or UK, check to see if the postal code and street address verifications passed.
- Watch for customers who ask to change the shipping address after the order is placed. Fraudsters may use a legitimate address to obtain a successful charge but later ask that products be shipped elsewhere.
- Evaluate rush orders or requests for overnight delivery (which would allow fraudsters to take advantage of timing).
- Review the credit card’s country of origin (the country in which it was issued) in a charge’s payment detail in the Stripe Dashboard. The billing address provided should match this country. Where the shipping country that doesn’t match the card’s origin or is a country typically not shipped to, it’s important to take extra steps to verify the legitimacy of the charge.
- Ensure that shipping methods are appropriate, especially for overnight shipping at a high cost. People using stolen credit cards don’t usually worry about how expensive the shipping is and want goods right away, before the card number is reported as stolen or compromised. Never agree to use a customer’s “preferred shipper” or agree to pay a third party shipping company on your customer’s behalf; these are usually a second front for fraud.
- Consider instituting a 24-48 hour shipping delay for high-value orders or shipments to non-verified addresses or first-time customers.
- If you have a verified billing postal code, make sure the shipping label generated by your shipper displays this postal code after you enter the address. Some fraudsters provide a valid billing postal code, but the rest of the address (street, city, and state) is fraudulent, and automated systems such as USPS self-service often autocorrect the postal code you enter—effectively changing it from the verified billing postal code to the fraudster’s.
- Use of international cards or orders with international shipping addresses.
- Be aware of high-risk shipping destinations.
- Take extra care when shipping to a [freight forwarder](http://www.forwarders.com/home/directories.html).

If you’d like to familiarize yourself with the postal code prefixes in the US by region, use this [reference map](http://upload.wikimedia.org/wikipedia/commons/thumb/2/24/ZIP_Code_zones.svg/1024px-ZIP_Code_zones.svg.png).

Generally, Stripe can’t see the shipping address customers provide and shipping information isn’t necessary to successfully accept a payment. However, you can improve Stripe’s fraud detection by sending the shipping address when [creating a payment](https://docs.stripe.com/api/payment_intents/create.md).

## Digital goods or services

*Customers* (Customer objects represent customers of your business. They let you reuse payment methods and give you the ability to track multiple payments) that misuse digital goods or services are more likely to be using stolen credit cards. It’s very important to collect and verify as many card details as possible, including CVC, street address, and postal code. Consider rejecting charges that fail the CVC and postal code checks. As a general rule when selling digital goods or services, be sure to:

- Be aware of customers sending spam using a product for messaging or making many purchases in a short period of time for downloadable content or “in-game” items.
- Watch for multiple accounts using similar email addresses or the same credit card. You can include this in your review queue through a [review rule](https://dashboard.stripe.com/fraud/rules).
- Watch for multiple charges to the same email address in rapid succession. You can include this in your review queue through a [review rule](https://dashboard.stripe.com/fraud/rules).
- Watch for unexpected or significant changes in account activity. If the purchase frequency or dollar amount of payments for an account increases significantly, it may be an indication of fraudulent activity.
- View evidence about the payments, including IP address, email logs, usage logs (that is, did they log in and actually use the service?), and so on. Pass this information to us, so that you can view it as you review a charge.

## Donations or crowdfunding

Make sure the donation makes sense for your campaign. If you’re running a small, personal campaign and you receive a very large donation from an unknown individual, scrutinize it carefully. Consider refunding if you can’t verify the individual making the donation.

If you receive a large donation and the donor reaches out to you to say they made a mistake and only meant to donate part of the amount, be cautious. Fraudsters sometimes make a large donation (such as 1,000 USD) and later tell you they only meant to donate a smaller amount (like 100 USD) and ask you to refund the rest. This is done to test a stolen card’s credit limit. If this scenario appears, it may be prudent to refund the entire donation.

Monitor your declined payments. Many of them that used different cards in rapid succession indicate a fraudster is testing stolen card numbers. If it does look like someone is testing cards on your website, consider adding a delay or implementing a [CAPTCHA](http://captcha.net/) during checkout to slow them down. This usually encourages a card tester to move on.

## Mark a payment as fraudulent

You can mark a payment as fraudulent using either the Stripe API or the Dashboard. For instructions, see the [Feedback on risk evaluations](https://docs.stripe.com/radar/risk-evaluation.md#feedback-on-risk-evaluations) section in the Risk evaluation guide.

## See also

- [Common types of fraud](https://docs.stripe.com/disputes/prevention/fraud-types.md)
- [Verification checks](https://docs.stripe.com/disputes/prevention/verification.md)
- [Best practices for preventing fraud](https://docs.stripe.com/disputes/prevention/best-practices.md)
