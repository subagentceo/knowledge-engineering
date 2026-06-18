# Enrollment UX

## Introduction

Now that we've seen how the MFA APIs work, you may want to consider how you want to present the MFA enrollment experience to your users. This guide will cover some of the considerations you should take into account when designing your enrollment experience.

## Provide multiple methods

The MFA APIs support multiple methods of authentication. Consider providing your users with multiple options for enrolling in MFA. Adding flexibility will reduce friction in users adoption.

## Let users choose their primary method

If a user has enrolled in multiple methods, consider letting them select a primary. This will allow you to challenge them with the method they are most comfortable, whilst still benefiting from the security of a backup in case they lose access.

## Setup a `totp` factor accessibly

As we have previously seen, [when enrolling a `totp` factor using the MFA API](https://workos.com/docs/mfa/1-create-an-authentication-factor/enroll-the-authentication-factor), the response returns a `qr_code` and a `secret`.

The `qr_code` value can be passed directly to the source on an image tag as follows:

#### Embed QR Code

However, some users may not be able to scan the QR code. Consider providing the `secret` value in the UI as an alternate way to set up their authenticator app.

Additionally, consider describing the QR code for assistive technologies:

#### QR Code accessibility

## Interoperable one-time-passcode input

In order to make the experience as smooth as possible for your users, there are a few things to consider regarding the input they will use to fill in their one-time-passcode.

### Provide the right affordance

You may be tempted to use [a number input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number) as it will show the mobile keyboard for numbers only. This is not recommended because a browser expects a number input to be countable, rather than a sequence of multiple numbers, which can cause unexpected behavior.

Instead, we recommend using a text input (`type="text"`) with the `inputmode="numeric"` attribute to provide mobile devices with the expected numerical keyboard prompt.

### Autofill

Setting `autocomplete="one-time-code"` will enable autofill with in any user-agent that supports it. This will for example ensure Safari on iOS/macOS can suggest/auto-fill the one-time-code received via SMS.

Consider also submitting the form automatically as soon as the passcode length has been met. This should help reduce the friction of using two-factor authentication for your users.

### Validation

Consider using client-side validation to ensure the user enters a valid one-time-passcode. This will reduce the number of requests to the server and improve the user experience.

`pattern="^\d{6}$"` can be used to validate the length of the one-time-passcode.

Here is a code example implementing the above considerations:

#### One-time-passcode input

***

## Full UI interactive example

The following interactive example shows a full UI for enrolling in MFA, and encompasses all of the considerations mentioned above.
