# Before going live

Best practices to build a production-ready Stripe Identity integration.

As you complete each item and check it off, the state of each checkbox is stored within your browser’s cache. You can refer back to this page at any time to see what you’ve completed so far.

### Before going live

- [ ] Make sure your use case and business are supported
      Review the [supported use cases](https://docs.stripe.com/identity/use-cases.md) and [terms of service](https://stripe.com/identity/legal) to make sure that your business can use Stripe Identity.

- [ ] Setup branding
      The verification experience shows your company name, logo, and color. Make sure to configure the [branding settings](https://dashboard.stripe.com/settings/branding?tab=identity) for your account before going live.

- [ ] Understand pricing & billing
      [Stripe Identity](https://stripe.com/pricing#identity) pricing is usage-based and charges apply for each *completed* verification. Make sure you understand how these charges appear on your invoice and how they interact with other Stripe products. See [Billing for Stripe Identity](https://support.stripe.com/questions/billing-for-stripe-identity) for a detailed breakdown of costs and billing descriptors.

- [ ] Limit the number of submission attempts
      To prevent fraudsters from abusing your verification flow and incurring charges on your account, we recommend that you limit the number of times a user can verify themselves.

- [ ] Limit how much sensitive information you store
      As much as possible, store only references to the verification and use the API to [retrieve the VerificationSession](https://docs.stripe.com/api/identity/verification_sessions/retrieve.md) when you need access to sensitive information. This simplifies your integration and limits your exposure from a security perspective, and helps you comply with privacy laws (such as GDPR) that require you to minimize data retention.

- [ ] Always authenticate your user
      We recommend that you authenticate your user before showing or sending them to Stripe Identity. This allows you to keep relevant internal references and adds a layer of security to prevent fraudsters from abusing your verification flow.

- [ ] Handle session link expiration
      If your integration uses the [web redirect session url](https://docs.stripe.com/identity/verify-identity-documents.md?platform=web&type=modal#create-a-verificationsession) or you [create verification links from the Stripe Dashboard](https://docs.stripe.com/identity/verify-identity-documents.md?platform=no-code&type=dashboard#share-verification-link), you must handle link expiration. The links expire 48 hours after creation and are single-use. You can refresh a link in the API using [retrieve the verification session](https://docs.stripe.com/api/identity/verification_sessions/retrieve.md) or by clicking **Copy link** on the verification session’s detail page in the [Dashboard](https://dashboard.stripe.com/identity/verification-sessions).

- [ ] Update your support process with an alternative verification method
      Stripe Identity might not be able to verify all of your users. For example, your user might decline to be verified using biometric technology, they might attempt to verify with an unsupported document type, or they might not be covered by Identity’s [verification checks](https://docs.stripe.com/identity/verification-checks.md). We recommend that you provide alternative ways to verify your user, and update your support process to handle new questions from users. In some jurisdictions, privacy laws (such as GDPR) might require you to offer a non-biometric verification option for users who decline to consent to using their biometric information.

- [ ] Follow webhook best practices
      If your integration depends on [webhooks](https://docs.stripe.com/webhooks.md), make sure you’ve [tested](https://docs.stripe.com/identity/handle-verification-outcomes.md#test) that your integration handles Identity events correctly and that you’re following the [Best practices for using webhooks](https://docs.stripe.com/webhooks.md#best-practices).

- [ ] Follow the Stripe development checklist
      Follow the [Development checklist](https://docs.stripe.com/get-started/checklist/go-live.md) to ensure a smooth transition when taking your integration live.

- [ ] Update your privacy policy if necessary
      Stripe Identity collects sensitive information, such as facial and identity document images. Make sure that your own privacy policy tells your customers about all the ways you may use or reuse the collected identity data and that this data is shared with Stripe. You could add the following paragraph to your policy if it doesn’t already include information about how their data is disclosed to Stripe:

      > We use Stripe for identity document verification. Stripe collects identity document images, facial images, ID numbers and addresses as well as advanced fraud signals and information about the devices that connect to its services. Stripe shares this information with us and also uses this information to operate and improve the services it provides, including for fraud detection. You may also choose to allow Stripe to use your data to improve Stripe’s biometric verification technology. You can learn more about Stripe and read its privacy policy at https://stripe.com/privacy.

- [ ] Provide a URL to your privacy policy
      Make sure your [account settings](https://dashboard.stripe.com/settings/account?support_details=true) include a link to your privacy policy. This URL will be linked from Stripe Identity.

- [ ] Explain ID verification and Stripe Identity to your customers
      Add information to your site answering common questions about identity verification and your use of Stripe Identity. See the [FAQ template](https://docs.stripe.com/identity/explaining-identity.md).

- [ ] Explain to your users how to delete their data from Stripe's servers
      When your users request their data to be deleted, [redact the VerificationSession](https://docs.stripe.com/identity/verification-sessions.md#redact) and let your users know that they’ll need to contact Stripe support to remove their data from Stripe’s servers. You could add the following paragraph to your application:

      > We use Stripe for identity document verification. Stripe retains a copy of all the data provided as part of a verification. You may also have consented to allow Stripe to use your data to improve their technology. You can delete your information from Stripe’s servers or revoke your consent by contacting us using the form at Stripe support: https://support.stripe.com.

## See also

- [Is my use case supported?](https://docs.stripe.com/identity/use-cases.md)
- [Development checklist](https://docs.stripe.com/get-started/checklist/go-live.md)
- [Take webhooks live](https://docs.stripe.com/webhooks.md#register-webhook)
