# Address Element

Use the Address Element to collect complete billing and shipping addresses.

The Address Element is an embeddable UI component for accepting complete addresses. Use it to collect shipping addresses, or when you need a complete billing address, such as for tax purposes.

| Option                      | Description                                                                                                                                                                                                                                                                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Theme**                   | Use the dropdown to choose a theme or customize the theme with the [Elements Appearance API](https://docs.stripe.com/elements/address-element.md#appearance).                                                                                                                                                                                        |
| **Desktop and mobile size** | Use the dropdown to set the max pixel width of the parent element that the Address Element is mounted to. You can set it to 750px (desktop) or 320px (mobile).                                                                                                                                                                                       |
| **Customer location**       | Use this [option](https://docs.stripe.com/js/elements_object/create#stripe_elements-options-locale) to choose a location for accepting complete addresses. Changing the location localizes the UI language.                                                                                                                                          |
| **Phone number**            | Enable this [option](https://docs.stripe.com/js/elements_object/create_address_element#address_element_create-options-fields-phone) to allow phone number collection when an address is entered or when using an existing contact.                                                                                                                   |
| **Autocomplete**            | Enable this [option](https://docs.stripe.com/js/elements_object/create_address_element#address_element_create-options-autocomplete) to decrease checkout time, reduce validation errors, and increase checkout conversion with built-in address autocomplete. Stripe supports 236 regional address formats, including right-to-left address formats. |
| **Contacts**                | Enable this [option](https://docs.stripe.com/js/elements_object/create_address_element#address_element_create-options-contacts) to add a new address or change an existing address or phone number.                                                                                                                                                  |

## Get started

You can use the Address Element with either the Checkout elements integration (Elements with Checkout Sessions API) or the Advanced integration (Elements with Payment Intents API). [Compare the features and availability](https://docs.stripe.com/payments/online-payments.md#compare-features-and-availability) to see which integration suits your use case.

[Collect addresses (Elements with Checkout Sessions API)](https://docs.stripe.com/payments/advanced/collect-addresses.md?payment-ui=embedded-components): Use the Checkout elements integration to collect addresses.

[Collect addresses (Advanced integration)](https://docs.stripe.com/payments/advanced/collect-addresses.md?payment-ui=elements): Use the Advanced integration to collect addresses.

[Clone a sample app (Advanced integration)](https://github.com/stripe-samples/link)

## Create an Address Element

When you create an Address Element, specify whether to use it in shipping or billing mode.

#### Shipping mode

In shipping mode, the element does two things:

- Collect a shipping address.
- Offer the customer the option to use it as a billing address too.

```javascript
const stripe = Stripe('<<YOUR_PUBLISHABLE_KEY>>');

const appearance = { /* appearance */ };
const options = { mode: 'shipping' };
const elements = stripe.elements({ clientSecret, appearance }); // In a working integration, this is a value your backend passes with details such as the amount of a payment. See full sample for details.
const addressElement = elements.create('address', options);
addressElement.mount('#address-element');
```

#### Billing mode

In billing mode, the element only collects a billing address.

```javascript
const stripe = Stripe('<<YOUR_PUBLISHABLE_KEY>>');

const appearance = { /* appearance */ };
const options = { mode: 'billing' };
const elements = stripe.elements({ clientSecret, appearance }); // In a working integration, this is a value your backend passes with details such as the amount of a payment. See full sample for details.
const addressElement = elements.create('address', options);
addressElement.mount('#address-element');
```

### Use Address Element with other elements

You can collect both shipping and billing addresses by using multiple Address Elements, one of each mode, on your page.

If you need to collect both shipping and billing addresses and only want to use one Address Element, use the Address Element in Shipping mode and use the [Payment Element](https://docs.stripe.com/payments/payment-element.md) to collect only the necessary billing address details.

When you use the Address Element with other elements, you can expect some automatic behavior when confirming the PaymentIntent or SetupIntent. The Address Element validates completeness upon confirming the PaymentIntent or SetupIntent and then displays errors for each field if there are any validation errors.

## Use an address

The Address Element automatically works with the [Payment](https://docs.stripe.com/payments/payment-element.md) or Express Checkout Element. When a customer provides an address and a payment method, Stripe combines them into a single *PaymentIntent* (The Payment Intents API tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods) with the address in the correct field.

### Automatic behavior

The element’s default behavior depends on its mode.

#### Shipping mode

In shipping mode, the address is stored in these fields:

- It appears in the [shipping](https://docs.stripe.com/api/payment_intents/confirm.md#confirm_payment_intent-shipping) field.
- If the customer indicates it’s also the billing address, it also appears in the [billing_details](https://docs.stripe.com/api/payment_intents/confirm.md#confirm_payment_intent-payment_method_data-billing_details) field.

To enable combining information, create all elements from the same `Elements` object, as in this example:

```javascript
const stripe = Stripe('<<YOUR_PUBLISHABLE_KEY>>');

const appearance = { /* appearance */ };
const options = { mode: 'shipping' };
const paymentElementOptions = { layout: 'accordion'};
const elements = stripe.elements({ clientSecret }); // In a working integration, this is a value your backend passes with details such as the amount of a payment. See full sample for details.
const addressElement = elements.create('address', options);
const paymentElement = elements.create('payment', paymentElementOptions);
addressElement.mount('#address-element');
paymentElement.mount('#payment-element');
```

#### Billing mode

In billing mode, the address is stored in the [billing_details](https://docs.stripe.com/api/payment_intents/confirm.md#confirm_payment_intent-payment_method_data-billing_details) field.

To enable combining information, create all elements from the same `Elements` object, as in this example:

```javascript
const stripe = Stripe('<<YOUR_PUBLISHABLE_KEY>>');

const appearance = { /* appearance */ };
const options = { mode: 'billing' };
const paymentElementOptions = { layout: 'accordion'};
const elements = stripe.elements({ clientSecret }); // In a working integration, this is a value your backend passes with details such as the amount of a payment. See full sample for details.
const addressElement = elements.create('address', options);
const paymentElement = elements.create('payment', paymentElementOptions);
addressElement.mount('#address-element');
paymentElement.mount('#payment-element');
```

### Custom behavior

Normally, the Address Element’s default behavior is enough. But in a complex payment flow, you might need to write custom responses to the customer’s input. For information, see [Listen for address input](https://docs.stripe.com/payments/advanced/collect-addresses.md).

## Autocomplete

If your customer selects a supported country for their address, then they see the autocomplete options. The Address Element can autocomplete addresses for the following countries:

- AU
- BE
- BR
- CA
- CH
- DE
- ES
- FR
- GB
- IE
- IN
- IT
- JP
- MX
- MY
- NL
- NO
- NZ
- PH
- PL
- RU
- SE
- SG
- TR
- US
- ZA

If you use the Address Element and the Payment Element together, Stripe enables autocomplete with no configuration required. This is done using a Stripe-provided Google Maps API key.

> By using autocomplete, you agree to comply with the [Google Maps Platform Acceptable Use Policy](https://cloud.google.com/maps-platform/terms/aup). If you violate this policy, we might disable autocomplete, or take any other action as necessary.

If you use the Address Element alone, you must use your own [Google Maps API Places Library key](https://developers.google.com/maps/documentation/javascript/places), which is managed separately from your Stripe account. Pass the key in the [autocomplete.apiKey](https://docs.stripe.com/js/elements_object/create_address_element#address_element_create-options-autocomplete-apiKey) option.

## Autofill with Link

[Link](https://docs.stripe.com/payments/link.md) saves and autofills payment and shipping information for the options you’ve enabled. For example, if the Link customer has a saved phone number, Stripe autofills the phone number only if phone number collection is enabled. When a returning Link customer authenticates, Stripe autofills their shipping information in the Address element.
![Create a payment form using multiple Elements](https://b.stripecdn.com/docs-statics-srv/assets/link-with-elements.d52f05825c982aaf84a4ad1e9bb422f3.png)

Create a payment form using multiple Elements

To enable autofill, create all elements from the same `Elements` object, as in this example:

```javascript
const stripe = Stripe('<<YOUR_PUBLISHABLE_KEY>>');

const appearance = { /* appearance */ };
const options = { mode: 'shipping' };
const paymentElementOptions = { layout: 'accordion'};
const elements = stripe.elements({ clientSecret }); // In a working integration, this is a value your backend passes with details such as the amount of a payment. See full sample for details.
const linkAuthElement = elements.create('linkAuthentication');
const addressElement = elements.create('address', options);
const paymentElement = elements.create('payment', paymentElementOptions);
linkAuthElement.mount('#link-auth-element');
addressElement.mount('#address-element');
paymentElement.mount('#payment-element');
```

## Appearance

You can use the Appearance API to control the style of all elements. Choose a theme or update specific details.
![Examples of light and dark modes for the address element.](https://b.stripecdn.com/docs-statics-srv/assets/address_appearance_example.c7884ea763b05e5881d65ed2b2afadbc.png)

For instance, choose the “flat” theme and override the primary text color.

```javascript
const stripe = Stripe('<<YOUR_PUBLISHABLE_KEY>>');

const appearance = {
  theme: 'flat',
  variables: { colorPrimaryText: '#262626' }
};
const options = { /* options */ };
const elements = stripe.elements({ clientSecret, appearance }); // In a working integration, this is a value your backend passes with details such as the amount of a payment. See full sample for details.
const addressElement = elements.create('address', options);
addressElement.mount('#address-element');
```

See the Appearance API documentation for the [Elements with Checkout Sessions API integration](https://docs.stripe.com/payments/checkout/customization/appearance.md?payment-ui=embedded-components) or the [Advanced integration](https://docs.stripe.com/elements/appearance-api.md) for a full list of themes and variables.
