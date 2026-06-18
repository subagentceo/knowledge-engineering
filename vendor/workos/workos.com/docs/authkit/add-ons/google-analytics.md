# Google Analytics

## Introduction

The Google Analytics AuthKit Add-on gives you data about logins, sign ups, and many other AuthKit activities inside of Google Analytics. You can use that data to better understand the effectiveness of your marketing campaigns and your users' full journeys across your website and AuthKit.

***

## Configuring the Add-on

### (1) Confirm your domain

To use the Add-on, your [Authentication API Domain](https://workos.com/docs/custom-domains/auth-api) must share the same root as the domain where you set up Google Analytics through Google Tag Manager or gtag.js. This gives the Add-on access to your users' Google Analytics client IDs, which the Add-on uses to associate events in AuthKit with users from your website.

For example, if your Google Analytics script lives at www.example.com:

- **Valid:** auth.example.com is a valid Authentication API Domain
- **Invalid:** auth.workos.com is not a valid Authentication API Domain

### (2) Visit the Add-ons page

In the WorkOS Dashboard, click the *Authentication* icon in the sidebar. Then click *Add-ons*.

![Add-ons page in the Authentication section of the WorkOS Dashboard](https://images.workoscdn.com/images/d5b867bb-8f04-440b-8443-4f9a1026a0cb.png?auto=format\&fit=clip\&q=50)

### (3) Enable the Add-on

Click *Enable* next to *Google Analytics.*

![Google Analytics modal with Measurement ID and Measurement Protocol API Secret fields in the WorkOS Dashboard](https://images.workoscdn.com/images/40f61f05-32d2-4439-ae68-3c3b8f8aaf87.png?auto=format\&fit=clip\&q=50)

In another browser tab, visit Google Analytics to get your credentials. Click the *Admin* icon in the bottom left corner.

![Admin icon on the Google Analytics website](https://images.workoscdn.com/images/21267275-4fde-431b-95d6-8e1ec3cc8190.png?auto=format\&fit=clip\&q=50)

Under *Data collection and modification*, click *Data streams.*

![Data steams link on the Google Analytics website](https://images.workoscdn.com/images/8f967c62-d63f-4130-8510-dc97a249d0b4.png?auto=format\&fit=clip\&q=50)

Click the data stream that you used to set up Google Analytics on your website. Under *Measurement ID*, click the copy icon. Paste your Measurement ID in the Measurement ID field in the WorkOS Dashboard.

![Measurement ID on the Google Analytics website](https://images.workoscdn.com/images/68dbf576-dae1-4940-b3d4-6840086f94b5.png?auto=format\&fit=clip\&q=50)

Under *Events*, click *Measurement Protocol API secrets*.

![Measurement Protocol API Secrets section on the Google Analytics website](https://images.workoscdn.com/images/cdf958e3-6714-4700-9c77-71e46af96bc5.png?auto=format\&fit=clip\&q=50)

Click *Create*. Give your new secret a name, like *WorkOS AuthKit* *Add-on*. Copy the *Secret value.* The secret value may be cut off on narrower windows, so try double clicking the value before copying it to ensure you have selected the full value.

![Measurement Protocol API Secret value on the Google Analytics website](https://images.workoscdn.com/images/8bd84bdf-eb85-4987-97a2-c13c863508a3.png?auto=format\&fit=clip\&q=50)

Paste the secret value in the API Secret field in the WorkOS Dashboard. Click *Save changes*. The Google Analytics AuthKit Add-on is enabled and will begin sending AuthKit events to Google Analytics.

![Google Analytics AuthKit Add-on enabled in the WorkOS Dashboard](https://images.workoscdn.com/images/0e47d2b4-29ad-4a47-9ab6-470dee7cc63c.png?auto=format\&fit=clip\&q=50)

***

## Events sent to Google Analytics

The Add-on sends events to Google Analytics when certain [WorkOS Events](https://workos.com/docs/events) occur:

- `user.created` sends Google a [`sign_up` recommended event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#sign_up)
- `authentication.magic_auth_succeeded`, `authentication.mfa_succeeded`, `authentication.oauth_succeeded`, `authentication.passkey_succeeded`, `authentication.password_succeeded`, and `authentication.sso_succeeded` send Google a [`login` recommended event](https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag#login) including a `method` parameter matching the login method
- The remaining *Authentication* events, *Email verification* events, *Magic Auth* events, *Password reset* events, and `session.created` send Google events based on the WorkOS event name, with underscores replacing periods
- `authentication.email_verification_succeeded` is shortened to `auth_email_verification_succeeded` to meet Google's requirement that event names be 40 characters or shorter

***

## Verifying events

After enabling the Add-on, visit your website, click your sign in button, and sign in to your application. Visit Google Analytics and click *Reports* in the sidebar. Then click *Realtime overview*. Within five minutes, you should see a `login` event under *Event count by Event name*.

If you do not see a login event, visit the Add-ons page in the WorkOS Dashboard to verify your Measurement ID and API Secret match the values from Google Analytics. If after confirming the values match you still need support, please reach out to us in Slack.
