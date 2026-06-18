# Explain Identity to your customers

Answer customer questions about ID verification and Stripe Identity.

If you use Stripe Identity for ID verification, copy and customize these questions and answers to create Frequently Asked Questions (FAQs) around ID verification. To obtain Stripe logos, badges, and buttons for your site, visit the **Media assets** section on [stripe.com](https://stripe.com/newsroom/information).

## Pre-approved content 

In your Stripe Identity FAQ, address the following questions by using the provided pre-approved copy:

### How does identity verification work?

PLATFORM works with [Stripe](https://stripe.com/) to conduct identity verification online. Stripe builds technology that’s used by millions of companies around the world such as Amazon, Google, and Zoom. Stripe helps with everything from accepting payments to managing *subscriptions* (A Subscription represents the product details associated with the plan that your customer subscribes to. Allows you to charge the customer on a recurring basis) to verifying identities.

Stripe helps PLATFORM confirm your identity by conducting the following checks:

1. **Stripe captures images of the front and back of your government-issued photo ID and reviews it to make sure that the document is authentic.** They’ve built an automated identity verification technology that looks for patterns to help determine if a government-issued ID document is real or fake. This process is like a bank teller checking your ID document to confirm that it’s real.

2. **Stripe captures photos of your face and reviews them to confirm that the photo ID belongs to you.** They’ve built automated identity verification technology that uses distinctive physiological characteristics of your face (known as [biometric identifiers](https://en.wikipedia.org/wiki/Biometrics)) to match the photos of your face with the photo on the ID document. This process is similar to a bank teller confirming that the photo on your ID document is you based on your appearance—but it’s a higher-tech and more accurate way to identify you as a unique person.

3. **Stripe collects your name, date of birth, and government ID number, and validates that it’s real.** They’ll check this information against a global set of databases to confirm that it exists.

Stripe asks for your consent before collecting and using your biometric information. They only use your verification data in accordance with the [permissions](https://support.stripe.com/questions/common-questions-about-stripe-identity#verification-permissions) you grant before starting the verification process, and based on their [Privacy Policy](https://stripe.com/privacy).

Learn more about how Stripe [handles and stores your data](https://support.stripe.com/questions/common-questions-about-stripe-identity).

### Additional information 

Update the checks based on the verification methods that you use, and include your privacy policy in your answer.

Be sure to transparently disclose to your users the information you’re receiving and how you’re using, storing, and sharing it, including the use of cookies if that’s part of your integration. Also disclose that you use Stripe as a service provider:

We use Stripe Identity for identity verification and other business services. Stripe collects identifying information about you and the devices that connect to its services, which includes the use of cookies. Stripe uses this information to operate and improve the services it provides to us, including for fraud detection, authentication, and analytics. You can learn more about [Stripe](https://stripe.com), [Stripe Identity](https://support.stripe.com/questions/common-questions-about-stripe-identity), and read its privacy policy at https://stripe.com/privacy.

### What are the best practices for a successful verification?

Before starting the verification process, here’s what you need:

- **A valid government-issued photo ID document.** Not a photocopy or a picture of a government-issued ID document. Make sure that the ID document isn’t expired.
- **A device with a camera—use a mobile device if possible.** Cameras on mobile devices typically take higher-quality photos than a webcam.

The quality of the images you capture affects success rates dramatically. Below are a few best practices to help make sure that your verification succeeds:

- **Capture a clear image.** Make sure that the images aren’t too dark or bright, and don’t have a glare. Hold steady and allow your camera to focus to avoid blurry photos.
- **Don’t block any part of your ID document in the image.** Ideally you can lay it flat to take the photo.
- **Don’t block any part of your face.** Remove sunglasses, masks, or other accessories.
- **Find a location with ambient lighting.** Avoid spaces with strong overhead lights that cast a shadow on your face or ID document. Avoid sitting directly in front of a bright light which can wash out your face and add a glare to your ID document.

### Additional information 

We recommend adding these best practices before a user starts the verification process so they know what to expect.

### Who has access to my verification data?

Both PLATFORM and Stripe have access to the information that you submit through the verification flow. We rely on Stripe to help store your verification data. Stripe uses access controls and security standards that are at least as stringent as those used to handle their own KYC and payments compliance data.

Learn more about how Stripe [handles and stores your data](https://support.stripe.com/questions/common-questions-about-stripe-identity).

### Additional information 

Include this question and answer **only** if you don’t store additional copies of verification data on your systems. Insert your own store and access control policies in the answer.

## Open-ended questions 

For the following questions, provide your preferred answer:

| Question                                             | Additional information                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Why am I asked to verify my identity?**            | Provide your preferred answer. Some users might be hesitant to share their ID information, so it’s important to help them understand why you’re asking for this information                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Why was I rejected?**                              | You might want to offer alternative methods for verification if a user disputes their results.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Can I get verified using a different method?**     | Privacy laws might require you to provide an alternative verification process that doesn’t use biometric technology if the user doesn’t consent to use of their biometric information. Consult your legal counsel for regional requirements.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **How can I access or delete my verification data?** | Provide your data privacy process.

  The Identity API has a [redaction endpoint](https://docs.stripe.com/api/identity/verification_sessions/redact.md) that allows you to delete the verification data that Stripe Identity stores on behalf of your business. For example, you can use this tool to meet your deletion requirements when an end-user from Europe or California asks you to delete their data, or when you collect an ID from a country such as Germany that requires you to delete an ID card upon completion of the verification even if there’s no deletion request from the end user. If you’ve created additional copies of a user’s data, you might also need to delete these as well.

  Stripe doesn’t delete data on your behalf when we store the data as your processor, even if your end-user asks us to, because we recognize you must conduct your own legal analysis on whether deletion is appropriate.

  If your end-user reaches out to us requesting deletion, we’ll respond to the request with respect to any data that we hold as data controller, and also recommend the end-user reach out to you to request deletion.

  Likewise, remind any of your end-users who request deletion to also reach out to Stripe, because we’re also holding verification data as an independent controller. They can also contact us if they want to opt-out of Stripe using their biometric data. They can contact us at [privacy@stripe.com](mailto:privacy@stripe.com).

  Learn more about privacy considerations for [handling ID verification data](https://support.stripe.com/questions/privacy-considerations-for-handling-id-verification-data-as-a-business) as a business. |
