# Profiles

Profiles allow you to store and group together credentials and certain settings in the Twilio CLI. This is handy for persisting your preferred options between terminal sessions, and allows for streamlined context switching between multiple accounts.

## Create a profile

To issue CLI commands that include your Twilio credentials, you must first create a profile. To create a profile, use:

```bash
twilio login
```

You will be prompted for your Account SID and Auth Token, both of which you can find on the dashboard of your [Twilio console](https://www.twilio.com/console).

When you run `twilio login` (an alias for `twilio profiles:create`), it uses your Account SID and Auth Token to generate an API key, stores the key in a configuration file, and associates the key with the profile to authenticate future requests.

For security, your Auth Token is *only* used to generate the API key, and is not stored locally once the profile has been created.

### Additional profiles

Use additional profiles to quickly switch between different sets of configurations within the same account, or between entirely different Twilio accounts.

To create additional profiles, run `twilio login` again, but provide a different shorthand identifier for the profile when prompted.

For example, to create a profile named "dev":

```bash
$ twilio login
You can find your Account SID and Auth Token at https://www.twilio.com/console
 » Your Auth Token will be used once to create an API Key for future CLI access to your Twilio Account or Subaccount, and then forgotten.
? The Account SID for your Twilio Account or Subaccount: ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
? Your Twilio Auth Token for your Twilio Account or Subaccount: [hidden]
? Shorthand identifier for your profile: dev
```

> \[!NOTE]
>
> Your Account SID and Auth Token are accessible from the first page of the [Twilio Console](https://console.twilio.com/), under **Account Info**.

### Regional profiles

For instructions on creating regional profiles, including valid region and edge combinations and how to obtain region-specific credentials, see [Regional CLI usage](/docs/twilio-cli/general-usage/regional).

## Set an active profile

By default, the credentials associated with the "active" profile are used when you run a Twilio CLI command that doesn't reference a specific profile to use.

To set a profile as "active", run:

```bash
twilio profiles:use PROFILE_ID
```

> \[!NOTE]
>
> `twilio login` does not set the provided profile as "active". Use the instructions above to set a newly-created profile as the "active" profile.

## Use multiple profiles

To use non-active profiles with commands, include `-p PROFILE_ID` in the command. This could look like:

```bash
twilio phone-numbers:list -p dev
```

Alternatively, as shown [earlier](#set-an-active-profile), you may change the active profile with the `twilio profiles:use` command:

```bash
twilio profiles:use dev
```

To see the full list of local profiles (including which profile is active), run:

```bash
twilio profiles:list
```

## Remove a profile

To remove a profile, use:

```bash
twilio profiles:remove PROFILE_ID
```

For example, if you want to remove the `dev` profile, you would execute `twilio profiles:remove dev`

## Use environment variables

Instead of (or in addition to) using a profile, you may define credentials as environment variables before issuing CLI commands.

* `TWILIO_ACCOUNT_SID` - your Account SID from [the console](https://www.twilio.com/console)
* `TWILIO_API_KEY` - an [API Key SID](https://twil.io/get-api-key)
* `TWILIO_API_SECRET` - the secret for the API Key
* `TWILIO_REGION` (optional) - the Region for the account (default is 'us1'). When using a regional profile, ensure you also specify the appropriate edge location.
* `TWILIO_EDGE` (optional) - the Edge Location for API requests

If these environment variables are set, a profile is not required to issue commands with the Twilio CLI.

> \[!CAUTION]
>
> If you are in the rare situation where you can *not* make use of an API Key, you can instead leverage your primary account credentials:
>
> * `TWILIO_ACCOUNT_SID` - your Account SID
> * `TWILIO_AUTH_TOKEN` - your Auth Token
>
> This is highly discouraged due to increased risk of exposing your Auth Token.

## Precedence of stored credentials

The CLI will attempt to load credentials in the following order of priority:

1. From the profile specified by the `-p` parameter
2. From environment variables, if set
3. From the active profile
