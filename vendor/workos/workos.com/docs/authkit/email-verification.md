# Email Verification

## Introduction

Email verification is a process in which a new user must validate ownership of their email inbox before they can access the application, ensuring authenticity of inbox ownership.

## The email verification flow

Verification is a two-step process:

- A user signs up to your application and an email is sent with a verification code.
- The user inputs the verification code to complete the signup process.

This applies to all authentication methods including [OAuth](https://workos.com/docs/authkit/social-login) and [SSO](https://workos.com/docs/authkit/sso). This unifying interface simplifies how your application considers the authenticity of your users.

**Email verification is always on** to ensure that verified users are always returned to your application.

## Users with verified email domains

Users signing in with SSO with a [verified domain](https://workos.com/docs/authkit/domain-verification) are automatically considered verified and do not need to complete the email verification process.

## Sending verification emails

[AuthKit](https://workos.com/docs/authkit) automatically handles email verification out of the box. When a user signs up via the hosted signup form, AuthKit will automatically send the verification email, prompt the user to input the code and route them through the authentication process before they gain access to the application. If desired, you can [send these emails yourself](https://workos.com/docs/authkit/custom-emails).

If a verification email bounces or is blocked, the recipient's address may be added to your provider's suppression list, preventing future deliveries. See [Check suppression status](https://workos.com/docs/email/e-check-suppression-status) to check and resolve suppressions.
