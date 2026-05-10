# Cross-sells

Enable customers to purchase complementary products at checkout by using cross-sells.

# Stripe-hosted page

> This is a Stripe-hosted page for when payment-ui is stripe-hosted. View the full page at https://docs.stripe.com/payments/checkout/cross-sells?payment-ui=stripe-hosted.
![Cross-sell product in Checkout](https://b.stripecdn.com/docs-statics-srv/assets/cross-sell-session.8fe2f9cfc326da5998ae2e2ebebf7dc9.png)

A cross-sell is a product that you can add to an order using Checkout.

Cross-sells enable customers to optionally purchase other related products using Checkout. Cross-sells can increase your average order value and revenue. For Checkout to offer a product as a cross-sell, the product must meet the following criteria:

- The product must be associated with only a single [Price](https://docs.stripe.com/api/prices/object.md#price_object-product).
- The [currency](https://docs.stripe.com/api/prices/object.md#price_object-currency) of the cross-sell product’s price must match the currency of the other prices in the Checkout Session.
- If the cross-sell product’s price [type](https://docs.stripe.com/api/prices/object.md#price_object-type) is `recurring`, the Checkout Session must be in subscription mode and its recurring interval must match the recurring interval of the other prices in the Checkout Session.
- If you’re using [subscription upsells](https://docs.stripe.com/payments/checkout/upsells.md), cross-sells only support products with non-recurring prices. For example, you can cross-sell a one-time setup fee while also upselling a monthly subscription to annual billing.
- If you’re using [automatic taxes](https://docs.stripe.com/tax.md), cross-sells only support products with prices with specified [tax behavior](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#tax-behavior). You can either [set tax behavior for a price](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#set-tax-behavior-on-price) or set the default tax behavior for all prices under [Tax Settings](https://dashboard.stripe.com/test/settings/tax) in the Stripe Dashboard.
- If you’re using [Managed Payments](https://docs.stripe.com/payments/managed-payments.md), cross-sells only support products that are [eligible for Managed Payments](https://docs.stripe.com/payments/managed-payments/eligibility.md#product-eligibility).

## Create a cross-sell 
![Configure a cross-sell on the Product details page](https://b.stripecdn.com/docs-statics-srv/assets/add-cross-sell.685564769c217a27f88b9ab9605d9c65.gif)

Configure a cross-sell on the Product details page.

You can configure a cross-sell in the [Dashboard](https://dashboard.stripe.com/products?active=true) on the Product details page. Visit the Product details page for the product that you want to use to cross-sell another complementary product. You’ll see a **Cross-sells** section with a dropdown menu containing your other products. Select a product with a single price. After you configure it, all eligible Checkout Sessions cross-sell the product selected from the dropdown menu. For example, a customer purchasing a subscription to the ‘Professional’ tier would be cross-sold the ‘Professional Services: Deployment’ product.

## Checkout flow 

In Checkout, buyers see an option to add the cross-sell to their purchase. If buyers add the cross-sell to the Checkout Session, they can also remove it. If they remove it, the option to add the cross-sell appears again.

> The quantity of cross-sell line items can’t be adjusted. The current maximum is 1.
![](https://docs.stripecdn.com/73a4baa89ea5ac0e30a39cd03f33b21e35979759cdc9293b680695226a5b7dbe.mp4)
## Retrieve Checkout Session line items 

After a customer adds a cross-sell, the `line_items` for the Checkout Session update to reflect the addition. When [fulfilling your order](https://docs.stripe.com/checkout/fulfillment.md#create-payment-event-handler) using the `checkout.session.completed` webhook, make sure to [retrieve the line items](https://docs.stripe.com/api/checkout/sessions/line_items.md).

## Remove a cross-sell 

You can remove a cross-sell on the Product details page. After you remove it, the product won’t be offered to any new Checkout Sessions.
![Remove a cross-sell from the Product details page](https://b.stripecdn.com/docs-statics-srv/assets/remove-cross-sell.a08765b1278a8187c282964f89641b92.gif)

Remove a cross-sell.


# Full embedded page

> This is a Full embedded page for when payment-ui is embedded-page. View the full page at https://docs.stripe.com/payments/checkout/cross-sells?payment-ui=embedded-page.
![Cross-sell product in Checkout](https://b.stripecdn.com/docs-statics-srv/assets/cross-sell-session.8fe2f9cfc326da5998ae2e2ebebf7dc9.png)

A cross-sell is a product that you can add to an order using Checkout.

Cross-sells enable customers to optionally purchase other related products using Checkout. Cross-sells can increase your average order value and revenue. For Checkout to offer a product as a cross-sell, the product must meet the following criteria:

- The product must be associated with only a single [Price](https://docs.stripe.com/api/prices/object.md#price_object-product).
- The [currency](https://docs.stripe.com/api/prices/object.md#price_object-currency) of the cross-sell product’s price must match the currency of the other prices in the Checkout Session.
- If the cross-sell product’s price [type](https://docs.stripe.com/api/prices/object.md#price_object-type) is `recurring`, the Checkout Session must be in subscription mode and its recurring interval must match the recurring interval of the other prices in the Checkout Session.
- If you’re using [subscription upsells](https://docs.stripe.com/payments/checkout/upsells.md), cross-sells only support products with non-recurring prices. For example, you can cross-sell a one-time setup fee while also upselling a monthly subscription to annual billing.
- If you’re using [automatic taxes](https://docs.stripe.com/tax.md), cross-sells only support products with prices with specified [tax behavior](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#tax-behavior). You can either [set tax behavior for a price](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#set-tax-behavior-on-price) or set the default tax behavior for all prices under [Tax Settings](https://dashboard.stripe.com/test/settings/tax) in the Stripe Dashboard.
- If you’re using [Managed Payments](https://docs.stripe.com/payments/managed-payments.md), cross-sells only support products that are [eligible for Managed Payments](https://docs.stripe.com/payments/managed-payments/eligibility.md#product-eligibility).

## Create a cross-sell 
![Configure a cross-sell on the Product details page](https://b.stripecdn.com/docs-statics-srv/assets/add-cross-sell.685564769c217a27f88b9ab9605d9c65.gif)

Configure a cross-sell on the Product details page.

You can configure a cross-sell in the [Dashboard](https://dashboard.stripe.com/products?active=true) on the Product details page. Visit the Product details page for the product that you want to use to cross-sell another complementary product. You’ll see a **Cross-sells** section with a dropdown menu containing your other products. Select a product with a single price. After you configure it, all eligible Checkout Sessions cross-sell the product selected from the dropdown menu. For example, a customer purchasing a subscription to the ‘Professional’ tier would be cross-sold the ‘Professional Services: Deployment’ product.

## Checkout flow 

In Checkout, buyers see an option to add the cross-sell to their purchase. If buyers add the cross-sell to the Checkout Session, they can also remove it. If they remove it, the option to add the cross-sell appears again.

> The quantity of cross-sell line items can’t be adjusted. The current maximum is 1.
![](https://docs.stripecdn.com/73a4baa89ea5ac0e30a39cd03f33b21e35979759cdc9293b680695226a5b7dbe.mp4)
## Retrieve Checkout Session line items 

After a customer adds a cross-sell, the `line_items` for the Checkout Session update to reflect the addition. When [fulfilling your order](https://docs.stripe.com/checkout/fulfillment.md#create-payment-event-handler) using the `checkout.session.completed` webhook, make sure to [retrieve the line items](https://docs.stripe.com/api/checkout/sessions/line_items.md).

## Remove a cross-sell 

You can remove a cross-sell on the Product details page. After you remove it, the product won’t be offered to any new Checkout Sessions.
![Remove a cross-sell from the Product details page](https://b.stripecdn.com/docs-statics-srv/assets/remove-cross-sell.a08765b1278a8187c282964f89641b92.gif)

Remove a cross-sell.

