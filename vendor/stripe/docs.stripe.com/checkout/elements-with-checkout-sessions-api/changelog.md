# Elements with Checkout Sessions API beta changelog

Keep track of changes to the Elements with Checkout Sessions API beta integration.

> This doc contains changelogs related to beta versions of Elements with Checkout Sessions API.
> 
> This changelog doesn’t apply to you if you’re on [Clover](https://docs.stripe.com/changelog/clover.md) or later. Refer to the [Stripe changelog](https://docs.stripe.com/changelog.md) instead.

## Migrating to Clover

### Clover changes

- (Breaking) The [stripe.initCheckout](https://docs.stripe.com/js/custom_checkout/init) method is now synchronous instead of asynchronous. This reduces render latency and enables Elements to show skeleton loaders earlier. See [Updates initCheckout to be synchronous](https://docs.stripe.com/changelog/clover/2025-09-30/update-init-checkout-synchronous.md) for migration details.
- (Breaking) Saved payment methods are now automatically enabled in the Payment Element when configured on the Checkout Session, without requiring additional client-side configuration. See [Updates default behavior for saved payment methods](https://docs.stripe.com/changelog/clover/2025-09-30/custom-checkout-saved-payment-method-defaults.md) for details.
- (Breaking) Postal codes are no longer automatically collected for card payments in Canada, UK, and Puerto Rico. See [Removes postal code for card payments](https://docs.stripe.com/changelog/clover/2025-09-30/postal_code_in_card_form_for_non_us_countries.md) if you rely on this data.
- (Breaking) For React integrations:
  - Import paths have changed from `@stripe/react-stripe-js` to `@stripe/react-stripe-js/checkout`.
  - [useCheckout](https://docs.stripe.com/js/react_stripe_js/checkout/use_checkout) now returns a disjoint union describing the asynchronous state (`{type: 'loading'}`, `{type: 'success', checkout: ...}`, or `{type: 'error', error: ...}`) instead of throwing an error.
  - [CheckoutProvider](https://docs.stripe.com/js/react_stripe_js/checkout/checkout_provider) now renders children unconditionally instead of rendering `null` when [initCheckout](https://docs.stripe.com/js/custom_checkout/init) hasn’t succeeded.

### Clover upgrade

Before migrating to Clover, first [update your integration](https://docs.stripe.com/checkout/elements-with-checkout-sessions-api/changelog.md#migrating-to-basil) to Basil.

- If you’re using any Stripe NPM packages, you must upgrade `@stripe/stripe-js` to at least `8.0.0` and `@stripe/react-stripe-js` to at least `5.0.0`.
- If you’re loading Stripe.js through the script tag, update the tag to reference `clover` using the [versioned Stripe.js nomenclature](https://docs.stripe.com/sdks/stripejs-versioning.md) as follows:

```html
<head>
  <title>Checkout</title><script src="https://js.stripe.com/clover/stripe.js"></script>
</head>
```

- Update the API version to be at least `2025-09-30.clover` on your back-end integration.

#### HTML + JS

Update your integration as follows:

1. Remove any `await` or `.then()` calls associated with `initCheckout`.
2. Replace your `fetchClientSecret` function with a client secret string or Promise that resolves to a client secret string.
3. Call the new asynchronous function `checkout.loadActions()` to access actions such as `getSession()`, which replaces `session()`, or `confirm()`. You only need to call `loadActions()` once.
4. If you previously wrapped `initCheckout` in a `try...catch` block, examine the resolved `type` value of `loadActions()` instead to check for errors.

```javascript
const clientSecret = fetch("/create-checkout-session", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
})
  .then((r) => r.json())
  .then((r) => r.clientSecret);
const checkout = stripe.initCheckout({
  clientSecret
});
const paymentElement = checkout.createPaymentElement();
paymentElement.mount("#payment-element");
const loadActionsResult = await checkout.loadActions();
if (loadActionsResult.type === 'success') {
  const session = loadActionsResult.actions.getSession();
}
```

#### React

Upgrade your `@stripe/react-stripe-js` dependency to at least version `5.0.0`. If you upgrade from a version earlier than `4.0.0`, make sure you read the [v4.0.0 release notes](https://github.com/stripe/react-stripe-js/releases/tag/v4.0.0) for additional migration steps.

#### Import changes

Update your imports to use the new checkout-specific entrypoint:

```jsx
import {useCheckout, PaymentElement} from '@stripe/react-stripe-js/checkout';
```

#### CheckoutProvider and useCheckout changes

Replace `fetchClientSecret` with `clientSecret`. You can now render Elements without first checking if `useCheckout` returned `type: 'success'`, which reduces latency and enables Elements to show skeleton loaders earlier.

```jsx
const App = () => {
  const promise = useMemo(() => {
    return fetch('/create-checkout-session', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{clientSecret: promise
      }}
    >
      <CheckoutPage />
    </CheckoutProvider>
  );
}

const CheckoutPage = () => {
  const {type, ...rest} = useCheckout();

  return (
    <div><PaymentElement />
    </div>
  );
}
```

For more details, see the [Updates initCheckout to be synchronous](https://docs.stripe.com/changelog/clover/2025-09-30/update-init-checkout-synchronous.md) changelog entry.

## Migrating to Basil

### Basil changes

- (Breaking) Asynchronous methods, such as [confirm](https://docs.stripe.com/js/custom_checkout/confirm) or [applyPromotionCode](https://docs.stripe.com/js/custom_checkout/apply_promotion_code), resolve with a different schema:
  - If successful, the updated session state is populated under the `session` key. Previously, this was under the `success` key.
- (Breaking) An error is now thrown when passing in [returnUrl](https://docs.stripe.com/js/custom_checkout/confirm#custom_checkout_session_confirm-options-returnUrl) on [confirm](https://docs.stripe.com/js/custom_checkout/confirm) when [return_url](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-return_url) has been already set on the Checkout Session.
- (Breaking) The return URL redirected to after a successful confirmation previously had inconsistent query parameters. Extra parameters are now removed and the URL only contains what’s provided in [returnUrl](https://docs.stripe.com/js/custom_checkout/confirm#custom_checkout_session_confirm-options-returnUrl) on [confirm](https://docs.stripe.com/js/custom_checkout/confirm) or [return_url](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-return_url) on the Checkout Session.
- (Breaking) Improves latency on Checkout Session API for subscription-mode Sessions and fixes a bug that prevented your customers from updating a Session after the first payment attempt
  - The change creates the subscription after the user has completed the payment, so `checkout_session.invoice` and `checkout_session.subscription` are null until the Checkout Session completes.
  - If you currently rely on the deprecated `payment_intent.invoice` field, we recommend using the `checkout_session.completed` webhook, which ensures an invoice is present, and `checkout_session.invoice` or [Invoice Payment list](https://docs.stripe.com/api/invoice-payment/list.md) to find the associated invoice.
  - To learn more, read the [2025-03-31.basil API changelog](https://docs.stripe.com/changelog/basil/2025-03-31/checkout-legacy-subscription-upgrade.md).
- Added [percentOff](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-discountAmounts-percentOff) to [discountAmounts](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-discountAmounts) as an option to display discounts.

### Basil upgrade

Before migrating to Basil, first [update your integration](https://docs.stripe.com/checkout/elements-with-checkout-sessions-api/changelog.md#beta-changelog) to `custom_checkout_beta_6`.

- If you’re using any Stripe NPM packages, you must first upgrade `@stripe/stripe-js` to at least `7.0.0` and `@stripe/react-stripe-js` to at least `3.6.0`.
- If you’re loading Stripe.js through the script tag, and you’re still using `v3` or `acacia`, update the tag to reference `basil` using the [versioned Stripe.js nomenclature](https://docs.stripe.com/sdks/stripejs-versioning.md) as follows:

```html
<head>
  <title>Checkout</title><script src="https://js.stripe.com/basil/stripe.js"></script>
</head>
```

- Remove the Stripe.js beta header when initializing Stripe.js.

#### HTML + JS

```js
const stripe = Stripe(
  '<<YOUR_PUBLISHABLE_KEY>>', {
  }
);
```

#### React

```javascript
import {loadStripe} from '@stripe/stripe-js';
const stripe = loadStripe("<<YOUR_PUBLISHABLE_KEY>>", {
});
```

- Remove the API version beta header and specify the API version to be at least `2025-03-31.basil` on your back-end integration.

### Before

#### TypeScript

```javascript
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import Stripe from 'stripe';
// Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
const stripe = new Stripe('<<YOUR_SECRET_KEY>>', {
  apiVersion: '2026-05-27.dahlia; custom_checkout_beta=v1' as any,
});
```

### After

#### TypeScript

```javascript
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
import Stripe from 'stripe';
// Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
const stripe = new Stripe('<<YOUR_SECRET_KEY>>', {
  apiVersion: '2025-03-31.basil' as any,
});
```

## Beta changelog

Elements with Checkout Sessions API beta uses two kinds of beta versions:

- A Stripe.js beta header (for example, `custom_checkout_beta_6`), which is set on your front-end integration.
- An API version beta header (for example, `custom_checkout_beta=v1`), which is set on your back-end integration.

### Front-end beta versions

Specify the front-end beta version when [initializing Stripe.js](https://docs.stripe.com/payments/quickstart-checkout-sessions.md).

#### custom_checkout_beta_6

If you’re using any Stripe NPM packages, you must first upgrade `@stripe/stripe-js` to at least `6.1.0` and `@stripe/react-stripe-js` to at least `3.5.0`.

- (Breaking) The sign of [total.appliedBalance](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-total-appliedBalance) has been flipped. A positive number now increases the amount to be paid, and a negative number decreases the amount to be paid.
- (Breaking) Replaced `clientSecret` with [fetchClientSecret](https://docs.stripe.com/js/custom_checkout/init#custom_checkout_init-options-clientSecret). Update your integration to pass an async function resolving to the client secret instead of passing a static value.
- (Breaking) Elements methods has been renamed.
  - If you’re using React Stripe.js, you don’t need to do anything except upgrade `@stripe/react-stripe-js`.
  - If you’re using HTML/JS:
    - Use `createPaymentElement()` instead of `createElement('payment')`.
    - Use `createBillingAddressElement()` instead of `createElement('address', {mode: 'billing'})`.
    - Use `createShippingAddressElement()` instead of `createElement('address', {mode: 'shipping'})`.
    - Use `createExpressCheckoutElement()` instead of `createElement('expressCheckout')`.
    - Use `getPaymentElement()` instead of `getElement('payment')`.
    - Use `getBillingAddressElement()` instead of `getElement('address', {mode: 'billing'})`.
    - Use `getShippingAddressElement()` instead of `getElement('address', {mode: 'shipping'})`.
    - Use `getExpressCheckoutElement()` instead of `getElement('expressCheckout')`.
- (Breaking) Updated fields related to confirmation to more accurately reflect session state.
  - [canConfirm](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-canConfirm) now responds to any mounted Billing Address Element or Shipping Address Element.
  - [canConfirm](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-canConfirm) now becomes `false` if there is an in-flight confirmation.
  - Removed `confirmationRequirements`.
- (Breaking) [updateEmail](https://docs.stripe.com/js/custom_checkout/update_email) now throws an error if [customer_email](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer_email) was provided when creating the Checkout Session. If you intend to prefill an email that your customer can update, call `updateEmail` as soon as the page loads instead of passing `customer_email`.
- (Breaking) [returnUrl](https://docs.stripe.com/js/custom_checkout/confirm#custom_checkout_session_confirm-options-returnUrl) must be an absolute URL (for example, starts with `https://` rather than a relative URL, like `/success`).
- (Breaking) Updated pricing fields to a nested object for ease of rendering.
  - Replaced numeric values with an object containing `amount` (a formatted currency string, such as `$10.00`) and `minorUnitsAmount`, an integer representing the value in the currency’s smallest unit. If you’re already reading the amount, read instead from `minorUnitsAmount`.
    - For example, replace `total.total` with [`total.total.minorUnitsAmount`](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-total-total-minorUnitsAmount).
  - You must either read `total.total.amount` or each of `total.total.minorUnitsAmount` and `currency` and `minorUnitsAmountDivisor` from the `checkout` object and display in your UI, otherwise an error will be thrown. This helps keep your checkout page in sync as the CheckoutSession updates, including adding future Stripe features, with minimal UI code changes.
- Customer tax IDs can now be collected. Learn how to [collect tax IDs](https://docs.stripe.com/tax/checkout/tax-ids.md).
- A test mode-only assistant is now available at the bottom of your checkout page, offering guidance for your integration and shortcuts for common test scenarios.

#### custom_checkout_beta_5

- (Breaking) The `initCustomCheckout` function has been renamed to [initCheckout](https://docs.stripe.com/js/custom_checkout/init)
  - Within React Stripe.js, `CustomCheckoutProvider` has been renamed to `CheckoutProvider` and `useCustomCheckout` has been renamed to `useCheckout`.
- (Breaking) To confirm the Express Checkout Element, call [confirm](https://docs.stripe.com/js/custom_checkout/confirm), passing the [confirm event](https://docs.stripe.com/js/elements_object/express_checkout_element_confirm_event) as `expressCheckoutConfirmEvent`.
  - Previously, Express Checkout Element was confirmed by calling `event.confirm()`.
- (Breaking) When [confirm](https://docs.stripe.com/js/custom_checkout/confirm) is called, Payment Element and Address Element will validate form inputs and render any errors.
- (Breaking) Error messages have been standardized and improved.
  - Errors returned/resolved by a function represent known scenarios like invalid payment details or insufficient funds. These are predictable issues that can be communicated to your customer by displaying the `message` on the checkout page.
  - Errors thrown/rejected by a function represent errors in the integration itself, such as invalid parameters or configuration. These errors aren’t meant to be displayed to your customers.
- (Breaking) Asynchronous methods, such as [confirm](https://docs.stripe.com/js/custom_checkout/confirm) or [applyPromotionCode](https://docs.stripe.com/js/custom_checkout/apply_promotion_code), resolve with a different schema:
  - A `type="success"|"error"` discriminator field has been added.
  - If successful, the updated session state is populated under the `success` key. Previously, this was under the `session` key.
  - Otherwise, the error continues to be populated under the `error` key.
- Added the `email`, `phoneNumber`, `billingAddress`, and `shippingAddress` options to [confirm](https://docs.stripe.com/js/custom_checkout/confirm).
- (Breaking) Address Element no longer automatically updates the [billingAddress](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-billingAddress) or [shippingAddress](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-shippingAddress) fields on the Session.
  - So long as Address Element is mounted, form values will automatically be used when calling [confirm](https://docs.stripe.com/js/custom_checkout/confirm).
  - Listen to the [change event](https://docs.stripe.com/js/element/events/on_change?type=addressElement) to use the Address Element value before confirmation.

#### custom_checkout_beta_4

- Added [images](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-lineItems-images) to the [Session object](https://docs.stripe.com/js/custom_checkout/session_object).
- Added [fields](https://docs.stripe.com/js/custom_checkout/create_payment_element#custom_checkout_create_payment_element-options-fields) as an option when creating the Payment Element.
- Added [paymentMethods](https://docs.stripe.com/js/custom_checkout/create_express_checkout_element#custom_checkout_create_express_checkout_element-options-paymentMethods) as an option when creating the Express Checkout Element.
- (Breaking) Passing invalid options to [createElement](https://docs.stripe.com/js/custom_checkout/create_payment_element) now throws an error. Previously, unrecognized options would be silently ignored.
- (Breaking) [updateEmail](https://docs.stripe.com/js/custom_checkout/update_email) and [updatePhoneNumber](https://docs.stripe.com/js/custom_checkout/update_phone_number) apply changes asynchronously. Calling these methods before the customer finishes entering complete values might cause poor performance.
  - Instead of calling `updateEmail` or `updatePhoneNumber` on each input’s change event, wait until your customer finishes the input, such as on input blur or when they submit the form for payment.
  - `updateEmail` now validates that the input is a properly formed email address and returns an error if an invalid input is used.
  - `updatePhoneNumber` still performs no validation on the input string.

#### custom_checkout_beta_3

- The following fields have been added to the [Session object](https://docs.stripe.com/js/custom_checkout/session_object):
  - [id](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-id)
  - [livemode](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-livemode)
  - [businessName](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-businessName)
- Saved cards can now be reused. Learn how to [save and reuse](https://docs.stripe.com/payments/checkout/save-during-payment.md) payment methods.
- (Breaking) The default [layout](https://docs.stripe.com/js/elements_object/create_payment_element#payment_element_create-options-layout) of the Payment Element has been changed to `accordion`.
  - To continue using the previous default layout, you must explicitly specify `layout='tabs'`.
- (Breaking) The default behavior of [confirm](https://docs.stripe.com/js/custom_checkout/confirm) has been changed to always redirect to your `return_url` after a successful confirmation.
  - Previously, `confirm` redirected only if the customer chooses a redirect-based payment method. To continue using the old behavior, you must pass [redirect=‘if_required’](https://docs.stripe.com/js/custom_checkout/confirm#custom_checkout_session_confirm-options-redirect) to `confirm`.

#### custom_checkout_beta_2

- (Breaking) The `lineItem.recurring.interval_count` field has been removed and replaced with [lineItem.recurring.intervalCount](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-lineItems-recurring-intervalCount).
- (Breaking) The `lineItem.amount` field has been removed and replaced with the following:
  - [lineItem.amountSubtotal](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-lineItems-amountSubtotal)
  - [lineItem.amountDiscount](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-lineItems-amountDiscount)
  - [lineItem.amountTaxInclusive](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-lineItems-amountTaxInclusive)
  - [lineItem.amountTaxExclusive](https://docs.stripe.com/js/custom_checkout/session_object#custom_checkout_session_object-lineItems-amountTaxExclusive)

#### custom_checkout_beta_1

*This is the initial front-end beta version.*

### Back-end versions

Specify the back-end beta version when [setting up your server library](https://docs.stripe.com/payments/quickstart-checkout-sessions.md#init-stripe).

*There are no changes to the back-end beta version.*
