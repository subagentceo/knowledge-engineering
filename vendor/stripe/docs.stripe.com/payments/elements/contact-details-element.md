# Contact Details Element

Use the Contact Details Element to integrate Link.

[Link](https://stripe.com/payments/link) saves and autofills customer payment and shipping information. Customers can use different funding sources to pay with Link, including credit cards, debit cards, and US bank accounts. Learn more at [link.com](https://www.link.com).

Use the [Contact Details Element](https://docs.stripe.com/js/element/contact_details_element) (previously known as the Link Authentication Element) to create a single email input field for both email collection and Link authentication.

| Option                | Description                                                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Customer location** | Localize the UI language and display locally relevant payment methods.                                                                                         |
| **Size**              | Set the maximum pixel width of the parent Element that the Contact Details Element is mounted to. You can set it to 750px (**Desktop**) or 320px (**Mobile**). |
| **Theme**             | Select the general appearance of the Element.                                                                                                                  |
| **Layout**            | Use the dropdown to align the funding sources list horizontally (**Tabs**) or vertically (**Accordion**).                                                      |

## Start with examples 

To see the Contact Details Element in action, start with one of these examples:

[Quickstart](https://docs.stripe.com/payments/link/add-link-elements-integration.md): Code and instructions for accepting a payment and using the Contact Details Element to integrate Link.

[Clone a sample app on GitHub](https://github.com/stripe-samples/accept-a-payment)

## Before you begin

Before you start, you need to [register your domain](https://docs.stripe.com/payments/payment-methods/pmd-registration.md).

## Create the Contact Details Element 

The following code [creates](https://docs.stripe.com/js/elements_object/create_contact_details_element) an instance of the Contact Details Element and [mounts](https://docs.stripe.com/js/element/mount) it to the DOM:

#### HTML + JS

```javascript
// Enable the skeleton loader UI for the optimal loading experience.
const loader = 'auto';

// Create an elements group from the Stripe instance passing in the clientSecret and enabling the loader UI.
const elements = stripe.elements({clientSecret, loader});

// Create an instance of the Contact Details Element.
const contactDetailsElement = elements.create("contactDetails");

// Mount the Elements to their corresponding DOM node
contactDetailsElement.mount("#contact-details-element");
paymentElement.mount("#payment-element");
```

#### React

```jsx
import {loadStripe} from "@stripe/stripe-js";
import {
  Elements,
  ContactDetailsElement,
  PaymentElement,
} from "@stripe/react-stripe-js";

const stripe = loadStripe('<<YOUR_PUBLISHABLE_KEY>>');

// Enable the skeleton loader UI for the optimal loading experience.
const loader = 'auto';

const CheckoutPage = ({clientSecret}) => (
  <Elements stripe={stripe} options={{clientSecret, appearance, loader}}>
    <CheckoutForm />
  </Elements>
);

export default function CheckoutForm() {
  return (
    <form>
      <h3>Contact info</h3>
      <ContactDetailsElement/>
      <h3>Payment</h3>
      <PaymentElement/>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Retrieving email address 

You can retrieve the email address details using the `onChange` prop on the `contactDetailsElement` component. The `onChange` handler fires whenever the user updates the email field, or when a saved customer email is autofilled.

```javascript
contactDetailsElement.on('change', (event) => {
  const email = event.value.email;
});
```

## Prefill customer data  

The Contact Details Element accepts an email address. Providing a customer’s email address starts the Link authentication flow as soon as the customer lands on the payment page using the [defaultValues](https://docs.stripe.com/js/elements_object/create_contact_details_element#contact_details_element_create-options-defaultValues) option:

```javascript
// Create the Contact Details Element with the defaultValues option
const contactDetailsElement = elements.create("contactDetails", {defaultValues: {email: "foo@bar.com"}});

// Mount the Contact Details Element to its corresponding DOM node
contactDetailsElement.mount("#contact-details-element");
```

If you want to prefill additional customer data, add the [defaultValues.billingDetails](https://docs.stripe.com/js/elements_object/create_payment_element#payment_element_create-options-defaultValues-billingDetails) object to the [Payment Element](https://docs.stripe.com/payments/payment-element.md). This prefills a customer’s name, phone number, and shipping addresses. By prefilling as much of your customer’s information as possible, you simplify Link account creation and reuse.

The following code shows a Payment Element with all of its values prefilled:

#### React

```jsx
<PaymentElement
  options={{
    defaultValues: {
      billingDetails: {
        name: 'John Doe',
        phone: '888-888-8888',
        address: {
          postal_code: '10001',
          country: 'US',
        }
      },
    },
  }}
/>;
```

#### HTML + JS

```javascript
const paymentElement = elements.create('payment', {
  defaultValues: {
    billingDetails: {
      name: 'John Doe',
      phone: '888-888-8888',
      address: {
        postal_code: '10001',
        country: 'US',
      },
    },
  },
});

// Mount the Element to its corresponding DOM node
paymentElement.mount("#payment-element");
```

## Combine Elements 

The Contact Details Element only interacts with the Payment Element by prefilling payment information for returning Link users. However, it can still be displayed with other Elements as well, like the following example with the Contact Details Element, Address Element, and Payment Element:
![A checkout page that includes the Contact Details Element, Address Element, and Payment Element.](https://b.stripecdn.com/docs-statics-srv/assets/cde-with-ae-pe.30a772ba14b5b6b62ea625aea56d6d0c.png)

Use the Contact Details Element with other Elements to compose your checkout page

## Appearance 

You can use the [Appearance API](https://docs.stripe.com/elements/appearance-api.md) to control the style of all Elements. Choose a theme or update specific details.
![Examples of light and dark modes for the Payment Element checkout form.](https://b.stripecdn.com/docs-statics-srv/assets/appearance_example.e076cc750983bf552baf26c305e7fc90.png)

Use the Appearance API to change the look and style of your Elements

In the following example, the “flat” theme overrides the default text color used for Elements:

```javascript
const stripe = Stripe('<<YOUR_PUBLISHABLE_KEY>>');

const appearance = {
  theme: 'flat'
  variables: { colorPrimaryText: '#262626' }
};
const options = { /* options */ };
const elements = stripe.elements({ clientSecret, appearance }); // In a working integration, this is a value your back end passes with details such as the amount of a payment. See full sample for details.
const paymentElement = elements.create('payment', options);
paymentElement.mount('#payment-element');
```
