# Control billing details collection

Customize the billing details you collect within the Payment Element.

You can collect billing details several ways with the Payment Element:

- `never`: Don’t collect any billing details in the Payment Element. You can set this for all [fields](https://docs.stripe.com/js/elements_object/create_payment_element#payment_element_create-options-fields) or on specific fields subcomponents, like `name`, `email`, and `address`.
- `if_required`: Collect only the address fields required for each payment method to complete the payment.
- `auto` (default): Stripe determines which billing fields to collect based on customer friction and authorization success rate for each payment method. You don’t need to pass in additional billing details at confirm time for this mode.

By default, all fields are set to `auto`. This balances minimizing customer friction and maintaining optimal authorization rates.

## Hide billing details

If you’re collecting billing details elsewhere outside of the Payment Element, you can use `never` to avoid collecting billing details entirely or to skip specific billing fields. Fields that are set to `never` are hidden for all the payment methods. Here’s an example:

```javascript
const paymentElement = elements.create('payment', {
  fields: {
    billingDetails: {
      // No address field will be collected in any of the payment method forms
      address: 'never',
    }
  }
});
```

When `never` is set, you must manually pass in the omitted billing fields at the confirmation time:

```javascript
stripe.confirmPayment({
 //...Other values
 payment_method: {
  billing_details: {
    address: {
        line1: '123 Main Street',
        city: 'Anytown',
        country: 'US',
        postal_code: '12345'
      },
   }
 } 
});
```

## Collect minimal billing details

Specify `if_required` to collect only the billing address fields needed to complete payment for each payment method.

This option helps reduce customer friction but might come with certain trade-offs, such as higher network fees, for users on a network cost plus pricing plan, and potential impacts on authorization rates.

```javascript
const paymentElement = elements.create('payment', {
  fields: {
    billingDetails: {
      address: 'if_required',
    }
  }
});
```

## Advanced: using Address Element in billing mode

If your business requires collecting the full billing address, you can use the [Address Element](https://docs.stripe.com/elements/address-element.md) billing mode in combination with the Payment Element. The billing details gathered in Address Element are automatically attached at the confirmation time.
