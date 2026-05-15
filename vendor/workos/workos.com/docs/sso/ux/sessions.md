# SSO Session Lifecycle

## Introduction

WorkOS creates a session to track each Single Sign-On (SSO) authentication flow. Sessions can originate from different sources depending on how the flow is initiated:

- **Service Provider (SP)**: Your application initiates the flow by redirecting users to WorkOS.
- **Identity Provider (IdP)**: The IdP initiates the flow, sending users directly to WorkOS. This applies only to SAML connections. OIDC connections are always SP-initiated.
- **Admin Portal**: Test sessions are initiated through the WorkOS Admin Portal to verify SSO configuration.

As the user interacts with the IdP and the authentication progresses, the session transitions through various statuses. Understanding these statuses helps you monitor authentication activity and troubleshoot issues in your SSO implementation.

## Session Statuses

### In progress

A session is marked as <Badge color="gray" size="2"><Spinner size="1" /> In progress</Badge> when the authentication flow has been initiated but not yet completed. This status indicates that the user is currently interacting with the IdP or that the authorization code exchange is pending.

Sessions in this state are waiting for one or more of the following:

- The user to complete authentication at the IdP
- The IdP to send a response back to WorkOS
- Your application to exchange the authorization code for tokens

### Success

A session is marked as <Badge color="green" size="2">Success</Badge> when the entire authentication flow completes successfully. This means:

- The IdP authenticated the user
- WorkOS validated the IdP response
- Your application exchanged the authorization code for tokens
- User profile data was successfully retrieved

### Failed

A session is marked as <Badge color="red" size="2">Failed</Badge> when the authentication flow encounters an error. Common causes include:

- Invalid or expired certificates
- Invalid or malformed IdP response
- Profile attribute mapping misconfiguration
- Profile attribute validation errors
- CSRF token validation failure
- User denied access at the IdP
- IdP returned an authentication error

When a session fails, you can view the error details in the WorkOS Dashboard to understand what went wrong.

### Timed out

A session is marked as <Badge color="yellow" size="2">Timed out</Badge> when it remains in the "In progress" state for too long without completing. By default, sessions time out after 5 minutes.

Timeouts typically occur when:

- The user abandons the authentication flow at the IdP
- The user closes their browser before completing authentication
- Network issues prevent the IdP response from reaching WorkOS

## Test Sessions

When testing SSO connections through the Admin Portal, sessions are tracked with special test statuses:

### Test successful

A test session is marked as <Badge color="green" size="2">Test successful</Badge> when the IdP response is received and validated. This confirms that the SSO connection is properly configured and the IdP is sending valid responses.

### Test failed

A test session is marked as <Badge color="red" size="2">Test failed</Badge> when validation errors occur during the test. This helps identify configuration issues before rolling out SSO to your users.

Test sessions are not subject to the standard timeout behavior, allowing you to take your time when verifying your SSO configuration.

## Tracking SSO sessions

You can track SSO sessions in the WorkOS Dashboard by navigating to the Organization → Connection detail page and clicking on the "Sessions" tab.

The Sessions section displays a list of sessions from up to 90 days back and can be filtered by session ID, profile email, status, origin, and timestamp.

![A screenshot showing the WorkOS Dashboard SSO screen and how to navigate to the "Sessions" tab.](https://images.workoscdn.com/images/b3f5bcb4-cc92-4753-a467-49e3eeff941f.png)

Click on a session in the list to see session details, such as the request made to the IdP and the response.

![A screenshot showing the "Session Details" within the WorkOS Dashboard SSO screen.](https://images.workoscdn.com/images/b4c4e900-9fbb-43a0-96fb-d3ec3f453e87.png?auto=format\&fit=clip\&q=50)

## Monitoring SSO sessions with events

You can monitor SSO sessions by subscribing to the `authentication.sso_*` events. Here's the list of events available:

- `authentication.sso_started`: Emitted when a new SSO session is started.
- `authentication.sso_succeeded`: Emitted when an SSO session is completed successfully.
- `authentication.sso_failed`: Emitted when an SSO session fails.
- `authentication.sso_timed_out`: Emitted when an SSO session times out.

These events can be streamed to Datadog for observability and alerting.

Check the [Stream events to Datadog](https://workos.com/docs/events/observability/datadog) documentation for more details on how to stream events to Datadog and refer to the [events](https://workos.com/docs/events/authentication) documentation for more details on each event and its payload.
