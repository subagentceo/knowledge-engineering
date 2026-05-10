# Limit customers to one subscription

Direct customers to manage their subscription when they already have one.

# Full hosted page

> This is a Full hosted page for when payment-ui is stripe-hosted. View the full page at https://docs.stripe.com/payments/checkout/limit-subscriptions?payment-ui=stripe-hosted.

You can redirect customers that already have an active subscription to the *customer portal* (The customer portal is a secure, Stripe-hosted page that lets your customers manage their subscriptions and billing details) or your website to manage their subscription. This redirection works with *Checkout* (A low-code payment integration that creates a customizable form for collecting payments. You can embed Checkout directly in your website, redirect customers to a Stripe-hosted payment page, or create a customized checkout page with Stripe Elements) (including the [pricing table](https://docs.stripe.com/payments/checkout/pricing-table.md)) and Payment Links.

Stripe uses either the [Customer object](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-customer) (if you provide it in the Checkout Session) or the email address to detect if a customer already has an active subscription.
![Manage subscription](https://b.stripecdn.com/docs-statics-srv/assets/manage-subscription.47036dfee120d3651fc3819c8b7abfbb.png)

## Direct your customers to the customer portal or your website

#### Customer portal

1. [Activate the no-code customer portal](https://docs.stripe.com/customer-management/activate-no-code-customer-portal.md) to allow your customers to log in and manage their subscriptions. You need to keep the login link for the customer portal enabled to keep this feature enabled. Disabling the login link disables this feature, which means that customers can create multiple subscriptions.
1. Enable redirecting your customers to the customer portal in your [Checkout and Payment Links settings](https://dashboard.stripe.com/settings/checkout#subscriptions).
![Subscription settings](https://b.stripecdn.com/docs-statics-srv/assets/subscription-settings.28f8c4efc7a1ca0efceeee8ebeae4786.png)

#### Your website

You can redirect customers with active subscriptions to your website. To do this, go to the [Checkout and Payment Links settings](https://dashboard.stripe.com/settings/checkout#subscriptions) page. Optionally, provide `{CHECKOUT_SESSION_ID}` and `{CUSTOMER_EMAIL}` in the URL to populate them when customers redirect to your website:

```
https://example.com/login?session_id={CHECKOUT_SESSION_ID}&customer_email={CUSTOMER_EMAIL}
```
![Subscription settings](https://b.stripecdn.com/docs-statics-srv/assets/subscription-settings-website.3cafc5e43ce9f4d7647a2fd9a811b29f.png)

## Active subscription statuses

Active subscriptions have the following [four statuses](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-status):

- `Active`
- `PastDue`
- `Unpaid`
- `Paused`


# Full embedded page

> This is a Full embedded page for when payment-ui is embedded-page. View the full page at https://docs.stripe.com/payments/checkout/limit-subscriptions?payment-ui=embedded-page.

You can redirect customers that already have an active subscription to the *customer portal* (The customer portal is a secure, Stripe-hosted page that lets your customers manage their subscriptions and billing details) or your website to manage their subscription. This redirection works with *Checkout* (A low-code payment integration that creates a customizable form for collecting payments. You can embed Checkout directly in your website, redirect customers to a Stripe-hosted payment page, or create a customized checkout page with Stripe Elements) (including the [pricing table](https://docs.stripe.com/payments/checkout/pricing-table.md)) and Payment Links.

Stripe uses either the [Customer object](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-customer) (if you provide it in the Checkout Session) or the email address to detect if a customer already has an active subscription.
![Manage subscription](https://b.stripecdn.com/docs-statics-srv/assets/manage-subscription.47036dfee120d3651fc3819c8b7abfbb.png)

## Direct your customers to the customer portal or your website

#### Customer portal

1. [Activate the no-code customer portal](https://docs.stripe.com/customer-management/activate-no-code-customer-portal.md) to allow your customers to log in and manage their subscriptions. You need to keep the login link for the customer portal enabled to keep this feature enabled. Disabling the login link disables this feature, which means that customers can create multiple subscriptions.
1. Enable redirecting your customers to the customer portal in your [Checkout and Payment Links settings](https://dashboard.stripe.com/settings/checkout#subscriptions).
![Subscription settings](https://b.stripecdn.com/docs-statics-srv/assets/subscription-settings.28f8c4efc7a1ca0efceeee8ebeae4786.png)

#### Your website

You can redirect customers with active subscriptions to your website. To do this, go to the [Checkout and Payment Links settings](https://dashboard.stripe.com/settings/checkout#subscriptions) page. Optionally, provide `{CHECKOUT_SESSION_ID}` and `{CUSTOMER_EMAIL}` in the URL to populate them when customers redirect to your website:

```
https://example.com/login?session_id={CHECKOUT_SESSION_ID}&customer_email={CUSTOMER_EMAIL}
```
![Subscription settings](https://b.stripecdn.com/docs-statics-srv/assets/subscription-settings-website.3cafc5e43ce9f4d7647a2fd9a811b29f.png)

## Active subscription statuses

Active subscriptions have the following [four statuses](https://docs.stripe.com/api/subscriptions/object.md#subscription_object-status):

- `Active`
- `PastDue`
- `Unpaid`
- `Paused`

