# Authentication errors

Integrating the authentication API directly requires handling error responses for email verification, MFA challenges, identity linking, and organization selection. One or more of these responses may be returned for an authentication attempt with any authentication method.

Hosted AuthKit handles authentication errors for you and may be a good choice if you prefer a simpler integration.

## Email verification required error

This error indicates that a user with an unverified email address attempted to authenticate in an environment where email verification is required. It includes a pending authentication token that should be used to complete the authentication.

#### Email verification required error

When this error occurs and the [email setting](https://workos.com/docs/authkit/custom-emails) for email verification is enabled, WorkOS will automatically send a one-time email verification code to the user's email address and issue a pending authentication token. If the email setting is not enabled, [retrieve the email verification code](https://workos.com/docs/reference/authkit/email-verification/get) to send the email verification email yourself. To complete the authentication process, use the pending authentication token from the error and the one-time code the user received to [authenticate](https://workos.com/docs/reference/authkit/authentication) them and to verify their email address.

The same applies when a user attempts to authenticate with OAuth or SSO, but there was already an account with a matching unverified email address.

## MFA challenge error

This error indicates that a user enrolled into MFA attempted to authenticate in an environment where MFA is required. It includes a pending authentication token and a list of factors that the user is enrolled in that should be used to complete the authentication.

#### MFA challenge error

When this error occurs, you'll need to present an MFA challenge UI to the user and authenticate them with their [TOTP code](https://workos.com/docs/reference/authkit/authentication/totp), the pending authentication token from this error, and a [challenge](https://workos.com/docs/reference/mfa/challenge/create) that corresponds to one of the authentication factors.

MFA can be enabled via the [Authentication page](https://dashboard.workos.com/environment/authentication/features) in the WorkOS dashboard.

## MFA enrollment error

This error indicates that a user who is not enrolled into MFA attempted to authenticate in an environment where MFA is required. It includes a pending authentication token that should be used to authenticate the user once they enroll into MFA.

#### MFA enrollment error

When this error occurs, you'll need to present an [MFA enrollment](https://workos.com/docs/reference/authkit/mfa/enroll-auth-factor) UI to the user. Once the user has enrolled, present an MFA challenge UI to the user and authenticate them with their [TOTP code](https://workos.com/docs/reference/authkit/authentication/totp) and the pending authentication token from this error.

MFA can be enabled via the [Authentication page](https://dashboard.workos.com/environment/authentication/features) in the WorkOS dashboard.

## Organization authentication required error

This error indicates that a user attempted to authenticate with an authentication method that is not allowed by the organization that has a [domain policy](https://workos.com/docs/authkit/organization-policies) managing this user. It includes all the possible methods the user can use to authenticate.

#### Organization authentication required error

When this error occurs, you'll need to present the user with these options so they can choose which method to continue authentication.

## Organization selection required error

This error indicates that the user is a member of multiple organizations and must select which organization to sign in to. It includes a list of organizations the user is a member of and a pending authentication token that should be used to complete the authentication.

#### Organization selection required error

When this error occurs, you'll need to display the list of organizations that the user is a member of and authenticate them with the [selected organization](https://workos.com/docs/reference/authkit/authentication/organization-selection) using the pending authentication token from the error.

## SSO required error

This error indicates that a user attempted to authenticate into an organization that requires SSO using a different authentication method. It includes a list of SSO connections that may be used to complete the authentication.

#### SSO required error

When this error occurs, you'll need to use one of the SSO connections from the error to [get the authorization URL](https://workos.com/docs/reference/authkit/authentication/get-authorization-url) and redirect the user to that URL to complete the authentication with the organization's identity provider.