# Sign-in Consent

The sign-in consent screen is an extra layer of protection against login CSRF attacks or phishing attempts.

A user may click a link that appears legitimate, but which unknowingly leads them to signing in through a malicious identity provider controlled by an attacker. The sign-in consent screen mitigates this risk by displaying the user's email and the identity provider's domain, ensuring the user is aware of how they are signing in to the application.

## How it works

The sign-in consent screen is an interstitial page that appears during the Single Sign-on flow, after the user has gone through the identity provider (IdP), before redirecting to the application.

![Sign-in consent screen](https://images.workoscdn.com/images/32760d6d-eb42-480f-92bc-fe6d2e8709ea.png?auto=format\&fit=clip\&q=80)

This page displays to the user the `email` returned from the IdP, as well as the IdP origin. With this information, the user must either consent to or deny the sign-in flow.

- **Consenting sign-in** leads to completing the SSO flow, where the authorization code is forwarded to the application callback.
- **Denying the sign-in** will result in an SSO session failure and the user will be redirected to the application callback with a `signin_consent_denied` error.

## Enabling sign-in consent

In order to activate the sign-in consent protection, you should go to the **Authentication** section and enable the sign-in consent checkbox in the Single Sign-On settings.

![Enable sign-in consent checkbox](https://images.workoscdn.com/images/0ab5bb9f-6acb-45d0-a351-468a7e57a428.png?auto=format\&fit=clip\&q=80)

## Handling the `signin_consent_denied` error

We recommend using the `signin_consent_denied` error code to display useful information to the user, so that they can contact their admin and your support team for information about a possible phishing attempt.

When a user denies the sign-in consent, your application's callback will receive an error response:

```url title="Redirect URI with signin_consent_denied error"
https://your-app.com/callback?error=signin_consent_denied&error_description=User%20cancelled%20the%20authentication%20request&state=123456789
```

For more information about error handling, see the [Get Authorization URL error codes](https://workos.com/docs/reference/sso/get-authorization-url/error-codes) documentation.

## When sign-in consent is displayed

WorkOS determines whether the sign-in consent screen should be displayed, based on the identity provider, user fingerprint, and SSO flow parameters.

Once a user accepts the sign-in consent screen, the system remembers this approval and avoids displaying the page again for a better user experience.

The sign-in consent screen is always displayed in the following scenarios:

- **IdP-initiated flows**: The sign-in consent screen is always displayed for IdP-initiated flows (i.e. users clicking on a tile in their IdP), regardless of the identity provider, if the user has not previously approved it.
- **Custom SAML or OIDC connections**: The sign-in consent screen is displayed for custom connections if the user has not previously approved sign-in consent.

## Branding

The sign-in consent screen automatically inherits the Admin Portal branding and is served through your custom authentication API domain, if available. If you have AuthKit enabled, the sign-in consent screen will follow your AuthKit branding instead. Ensure you review the primary button color and logos before enabling this feature. This ensures a trusted experience for your customers.

## Availability

The sign-in consent screen is available for both AuthKit and Standalone SSO users. It is enabled by default for new environments.
