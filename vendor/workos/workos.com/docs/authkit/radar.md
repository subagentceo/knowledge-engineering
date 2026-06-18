# Radar

## Introduction

Radar adds automated protections on top of AuthKit by collecting signals on the behavior of users as they sign in to your app.
These signals feed into an engine that identifies abusive or anomalous behavior.
When Radar detects a suspicious authentication attempt, it can block or challenge that attempt based on the settings you configure.

Radar leverages device fingerprinting to identify which client is being used to authenticate with AuthKit.
This enables Radar to differentiate between legitimate and malicious users, so that automated protections won't impact your app's availability during an attack.
It's also a signal for suspicious behavior, such as when a device is used for multiple accounts or multiple devices are using the same account.

## Getting Started

Radar works with AuthKit without additional integration effort.
You can enable Radar directly from the WorkOS dashboard.
If you are interested in using Radar but are not an AuthKit customer, please reach out to [our team](mailto:support@workos.com), or for current customers, drop a note in your shared Slack channel.

## Dashboard

Radar's dashboard provides a summary of authentication activity in your app.
The top chart shows counts of suspicious events that Radar is detecting, along with automated actions that Radar took based on configuration.
The counts are updated in real time to make it easy to spot spikes in anomalous behavior.
To see historical trends, the time range for the chart can be toggled between 24 hours, 7 days and 30 days.

![Radar dashboard](https://images.workoscdn.com/images/87812b47-e72f-4edb-8164-e171545c9d8d.png?auto=format\&fit=clip\&q=50)

Below the top chart is a set of cards that show Radar detection activity for different user identifiers.
This is helpful to understand which types of devices, locations, users, etc. have been detected most often by Radar.
Each card is linked to the events page to drill into a list of individual event activity.

![Radar identifier cards](https://images.workoscdn.com/images/a2239641-2ef4-4742-bf9c-97189069ddaa.png?auto=format\&fit=clip\&q=50)

## Event list

A complete list of Radar events appears under the "Events" tab.
This list can be filtered by detection type, action taken, or a specific user ID or email.
By clicking into a single event, you can view all of the metadata related to that action including device, location, user agent and IP address.
Reviewing events in Radar can help inform when custom restrictions may be useful, such as allowing a known legitimate user to bypass detections, or blocking an IP range that is abusing your sign-in.

![Radar events](https://images.workoscdn.com/images/bde4e906-d680-4f18-baa5-d33fac803a7d.png?auto=format\&fit=clip\&q=50)

## Configuration

Radar gives you full control over the automated actions that are taken to suppress suspicious activity.
Depending on the detection, you can configure Radar to block, challenge, or notify on an authentication attempt that exhibits suspicious behavior.

**Blocking** an attempt will cause the authentication to fail, even if valid credentials are provided.
The user will see a message indicating their sign-in was not successful, and can reach out to an administrator for more detail.

**Challenging** an attempt will send the user an email with a one-time passcode (OTP).
The user is then prompted to enter that code to continue authentication.
Challenging suspicious authentication attempts with an OTP is effective in stopping bots that are capable of solving CAPTCHAs,
as well as malicious users who have stolen credentials but don't have access to the user's email account.

Radar also supports [SMS challenges](#sms-challenges) for sign up attempts, where suspicious sign ups are verified with a phone number instead of email.

**Notifying** on an attempt will send an informational email to users and/or admins when Radar detects a suspicious behavior.
This is helpful to proactively make individuals aware that an attack might be taking place, or their account was compromised.

![Radar configuration](https://images.workoscdn.com/images/f9f112c8-e731-4b8a-9e83-7bcea4527ac9.png?auto=format\&fit=clip\&q=50)

Out of the box, Radar ships with the following detections:

### Bot detection

Automatically block or challenge sign-in attempts that are initiated by a bot or program.
When enabled, Radar will determine the appropriate action without additional configuration.

In addition to detecting that the client is a bot, Radar can differentiate between different types of bots
such as AI agents or search engine crawlers.

![Radar bot configuration](https://images.workoscdn.com/images/5748359e-3d07-44ae-bef1-a9ebd55a817f.png?auto=format\&fit=clip\&q=50)

### Brute force

Block or challenge sign-in attempts that are part of an attempt to break into accounts using brute force.

These are attacks where a bad actor is trying many sign-ins over a short period of time.
Radar leverages the device fingerprint to identify and isolate bad actors from legitimate traffic, ensuring that your users
can use your app even when it's under attack.

![Radar brute force configuration](https://images.workoscdn.com/images/28988276-a698-4517-8d9b-48e75d4e1b2b.png?auto=format\&fit=clip\&q=50)

### Impossible travel

Block or challenge sign-in attempts that occur from different geolocations in short succession.

By tracking device geolocation, Radar can detect when subsequent authentication requests are spread around the globe.
Radar will detect if these attempts happen over a short period where it's not possible for the person to physically travel that distance

![Radar impossible travel configuration](https://images.workoscdn.com/images/458b59af-a3e8-4646-b8a2-1bc04ae27e8e.png?auto=format\&fit=clip\&q=50)

### Repeat sign up

Block or challenge repeat sign up attempts from the same email. By default, AuthKit fully deletes users.

If your application allows for account deletion and has a free-trial, then users may be able to delete their account and sign up again to get a new free-trial.
This protection restricts an email to a max of three uses before denying further sign ups.

![Radar Repeat Sign Up protection modal](https://images.workoscdn.com/images/3e4a6937-c891-4076-b2bf-a2ed829c8004.png?auto=format\&fit=clip\&q=50)

### Stale accounts

Get notified when an account that has been dormant without use becomes active

In contexts such as financial services, a dormant account becoming active might be an indication that the account
has been taken over from the user and is being used for fraud.
For these kinds of apps, Radar can notify the user and administrator if an account that hasn't been used in a while has a sign-in attempt.
Accounts are considered stale if there have been no successful sign-in in the past 60 days.

![Radar stale account configuration](https://images.workoscdn.com/images/f7a1a8e9-61ba-4c54-9cdb-d54ae7890092.png?auto=format\&fit=clip\&q=50)

### Unrecognized device

Get notified when a device that has never been used before signs in to an account

Using the device fingerprint, Radar checks if the device being used has been part of a successful sign-in before.
If it hasn't, both the user and an administrator can be notified by email.

![Radar unrecognized device configuration](https://images.workoscdn.com/images/f574e3d9-feed-43bc-aadb-2790cbfd2ce0.png?auto=format\&fit=clip\&q=50)

### Domain protections

Block or challenge authentication attempts from email addresses on suspicious domains.

When enabled, Radar automatically identifies and takes action on authentication attempts that use email addresses from disposable, throwaway, or known fraudulent email providers. This consolidates domain-based protections into a single setting, making it easy to guard against abuse from temporary or suspicious email services without needing to manage individual domain lists.

Domain protections can be enabled or disabled from the Protections section of the [Radar configuration page](https://dashboard.workos.com/environment/radar/configuration) in the WorkOS Dashboard.

![Radar domain protections configuration](https://images.workoscdn.com/images/2f6ddec4-eee8-477b-a3b6-84184e5df7f6.png?auto=format\&fit=clip\&q=50)

## SMS challenges

SMS challenges add a layer of verification that is effective against bots and fraudulent sign ups, since a valid phone number is required to complete the challenge. When enabled, Radar uses signals such as email domain reputation and geographic mismatches between IP address and phone number to determine when to trigger an SMS challenge. SMS challenges apply to sign up attempts only — sign in attempts continue to use email challenges.

SMS usage is billed at cost — WorkOS does not up-charge. The cost per message varies by destination country. SMS charges will appear on your next invoice as a separate line item.

You can enable SMS challenges from the Policies section of the [Radar configuration page](https://dashboard.workos.com/environment/radar/configuration) in the WorkOS Dashboard.

## Managed lists

### Disposable email domains

Radar maintains a constantly updated list of email domains known to provide disposable email services.
Disposable email services may be used to bypass free account or free trial limits in your application.

You can choose to block or log registrations that match an email domain in this list.
Logging is useful to verify no adverse impact will occur before blocking all the domains.

![Radar Disposable Email List Protection](https://images.workoscdn.com/images/33d5c007-a5c3-4451-8da2-745bb4096268.png?auto=format\&fit=clip\&q=50)

### U.S. Sanctioned countries

Block users from countries under US Sanctions from signing up or logging into your application. Contact [support](mailto:support@workos.com) to get the current list of countries.

> If you need to block a different set of countries, please reach out to support via [email](mailto:support@workos.com) or slack to configure regional blocks.
> Radar supports any region in the [ISO 3166-1 specification](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

![Radar US sanctions country managed lists](https://images.workoscdn.com/images/a2cff432-daf6-4c8f-a192-f33071afacf5.png?auto=format\&fit=clip\&q=50)

## Custom restrictions

Specific user identifiers can be configured to always allow or deny an authentication attempt.
Examples of using a custom restrictions:

- Restricting sign-ins to a corporate IP range
- Allow a script with a specific user agent to bypass bot detection
- Banning specific devices (i.e. iPods) from using your app
- Allowing certain users to bypass detections that are false positives

> Note: the allow list takes preference -- if an user matches an identifier that is in the allow list, they will bypass all other Radar rules.

![Radar restrictions configuration](https://images.workoscdn.com/images/bda02327-1d15-4e9c-b559-08b101930880.png?auto=format\&fit=clip\&q=50)

### Email aliases

When blocking or allowing an email address, Radar treats email aliases (the `+` suffix, e.g. `user+test@gmail.com`) as follows:

- **Blocking or allowing a specific alias** (e.g. `user+test@gmail.com`) only affects that exact alias. Other aliases like `user+other@gmail.com` and the root address `user@gmail.com` are not affected.
- **Blocking or allowing the root address** (e.g. `user@gmail.com`) will match all aliases of that address during sign up attempts. For example, blocking `user@gmail.com` will also block sign ups from `user+test@gmail.com`, `user+other@gmail.com`, and so on.

> Note: For Gmail addresses, Radar also normalizes dots in the local part (e.g. `u.s.e.r@gmail.com` is treated the same as `user@gmail.com`) and treats `googlemail.com` as equivalent to `gmail.com` during sign up matching.
