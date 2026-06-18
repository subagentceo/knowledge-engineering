# Passkeys

## Introduction

Passkey authentication allows users to sign up and sign in to your application using public-key cryptography, which is more secure than a traditional password.

Passkeys are built on top of the [WebAuthn](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API) standard that enable the user's device to securely store the passkey's private key, with access protected by biometrics, such as a fingerprint. When the user signs in, the private key is used to sign a payload that is verified with the matching public key.

You can read more about how WebAuthn and passkeys work at the [official FIDO alliance passkey website](https://passkeys.dev/), the consortium behind passkey web standards.

## Passkey configuration

Passkeys can be enabled in the *Authentication* section of the [WorkOS Dashboard](https://dashboard.workos.com).

![The WorkOS Dashboard displaying the configuration dialog for passkeys](https://images.workoscdn.com/images/5ed77bef-cfa0-4a40-958f-d19b23a1ec1b.png)

> **Developers should configure an [AuthKit custom domain](https://workos.com/docs/custom-domains/authkit) before enabling passkeys in production**. Passkeys are bound to the domain they were registered on. Adding the domain later would prevent the usage of passkeys that were registered on the old domain.

### Enabling progressive enrollment

Optionally, your users who are still using password-based authentication can be prompted to create a passkey on their next sign-in. This flow, known as "progressive enrollment", is disabled by default but can be enabled alongside passkey authentication in the WorkOS Dashboard.

![AuthKit displaying the passkey progressive enrollment prompt.](https://images.workoscdn.com/images/c541f4f6-5956-489d-be7e-c8b242c9923d.png)

If users skip passkey enrollment they will be reminded every two weeks, and additionally have the option to never be prompted again if they prefer passwords.

### Multi-factor auth

If [MFA](https://workos.com/docs/authkit/mfa) is also enabled and required, users who sign in with a passkey will not be prompted for a separate TOTP code. AuthKit treats passkeys as both a first and second factor by requiring user verification when a passkey is presented.

User verification in the context of a passkey means the passkey must be combined with another "authorization gesture", like the scanning of a fingerprint, or entering a separate PIN.

***

## Integrating via the API

Passkey authentication is currently only available with the hosted UI in AuthKit.
