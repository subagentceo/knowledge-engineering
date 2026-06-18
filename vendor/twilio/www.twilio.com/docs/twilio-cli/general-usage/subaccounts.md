# Subaccounts

The Twilio CLI also features support for issuing commands tied to [subaccounts](https://help.twilio.com/hc/en-us/articles/360011132374-Getting-Started-with-Twilio-Accounts-and-Subaccounts). Subaccounts are commonly created to separate usage by team, product, customer, and more.

Instructions on how to create a Twilio subaccount can be found in this [Twilio Support guide](https://help.twilio.com/hc/en-us/articles/360011348693-View-and-Create-New-Twilio-Subaccounts), and there is more general information about subaccounts in the [Twilio IAM docs](/docs/iam/api/subaccounts).

## API commands

For all non-`twilio api:core` commands, please create a [profile](/docs/twilio-cli/general-usage/profiles) (`twilio login` or `twilio profiles:create`) using the subaccount SID and an [API Key SID and Secret](https://www.twilio.com/console/project/api-keys/create).

Some examples of "non-core" commands are:

* `twilio phone-numbers:list`
* `twilio email:set`
* `twilio api:serverless:v1:services:list`

Below are the two methods for issuing commands tied to a subaccount.

### Set a subaccount as the active profile

To make all subsequent CLI commands via the intended subaccount:

1. Set the subaccount's profile as active

   ```bash
    twilio profiles:use SUBACCOUNT_PROFILE_ID
   ```
2. Issue commands as usual. Commands will use the active subaccount's credentials

   ```bash
    twilio phone-numbers:list
   ```

### Specify the subaccount profile

You can apply the subaccount to individual commands by using the `-p` or `--profile` flag:

```shell
twilio phone-numbers:list -p SUBACCOUNT_PROFILE_ID
```

Refer to the [profiles documentation](/docs/twilio-cli/general-usage/profiles#use-multiple-profiles) for more information about profiles and profile management.

## Core API commands

Core API commands are any CLI command that reference resources under the V2010 API (`twilio api:core:.*`), such as `twilio api:core:messages:create`.

Profiles created for parent accounts cannot be used to manage subaccounts, as the `twilio login` process creates a [Standard API Key](/docs/iam/api-keys/key-resource-v2010). An appropriate **Main** API Key is necessary to work with subaccounts, and can be created [here](https://www.twilio.com/console/project/api-keys/create).

You must use environment variables if you want access to subaccounts for this family of commands. There are two options: use a Main API Key, or the Parent Account SID and Auth Token.

Once you have your subaccount SID, you can add the `--account-sid` parameter to a command to reference a specific subaccount, provided it's a `twilio api:core` command.

For example:

```shell
$ export TWILIO_ACCOUNT_SID=ACXXXXXXXX
$ export TWILIO_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
$ export TWILIO_API_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
$ twilio api:core:available-phone-numbers:local:list \
    --area-code="415" \
    --country-code US \
    --account-sid=SUBACCOUNT_SID
```

> \[!CAUTION]
>
> In the rare case that you cannot create an API Key or do not have access to one, you can leverage the Account SID and Auth Token of the subaccount's parent account as environment variables for authorization.
>
> The Account SID and Auth Token can be retrieved from the [console](https://twil.io/console).
>
> ```bash
> $ export TWILIO_ACCOUNT_SID=ACXXXXXXXX
> $ export TWILIO_AUTH_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
> $ twilio api:core:available-phone-numbers:local:list \
>     --area-code="415" \
>     --country-code US \
>     --account-sid=SUBACCOUNT_SID
> ```
>
> Using this method is highly discouraged as it increases the risk of exposing your Auth Token.
