# Flex Insights API General Usage

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

## Prerequisites

Before you start exporting data, you will need to have:

* A [provisioned Flex Insights Workspace](https://help.twilio.com/articles/360010705874-Getting-Started-with-Flex-Insights)
* The credentials of a user with direct access to the [Analytics Portal](https://analytics.ytica.com/)

## API Authentication

The procedure requires 2 API calls.

The first authenticates and returns an SST (*Super Secured Token*) using your login and password. Once the SST is available, a TT (*Temporary Token*) must be requested. The TT has to be included in any subsequent API calls.

> \[!WARNING]
>
> In order to obtain the password for direct login, please [contact the Flex Insights Support Team](https://help.twilio.com).

Flex Insights - API Authentication

```bash
curl -X POST https://analytics.ytica.com/gdc/account/login \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
        "postUserLogin":{
          "login":"{email_address}",
          "password":"{password}",
          "remember": 0,
          "verify_level": 2
        }
      }'
```

```json
{ 
   "userLogin":{ 
      "profile":"/gdc/account/profile/{profile_id}",
      "state":"/gdc/account/login/{profile_id}",
      "token":"{super_secured_token}"
   }
}
```

SuperSecure Tokens (SST) have a default lifetime of two weeks.

> \[!WARNING]
>
> If you received a status code of `429`, this means that you made too many invalid login requests. Check your credentials, and look for the `Retry-After HTTP` header in the response: this specifies the period (in seconds) after which you can attempt to log in again.

## Retrieving the Temporary Token

You must have a valid *Temporary Token (TT)* for all subsequent calls to the API. To get a valid *TT*, use the following API:

Flex Insights - Get Temporary Token

```bash
curl -X GET https://analytics.ytica.com/gdc/account/token \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-GDC-AuthSST: {super_secured_token}'
```

```json
{ 
   "userToken":{ 
      "token":"{temporary_token}}"
   }
}
```

If you are using a REST client which supports *cookies*, on the initial `login` request you can set `"verify_level": 0` and use the returned cookie called `GDCAuthTT`  (which contains the *Temporary Token*) directly in subsequent API calls. This way, you don't need to adjust the Header manually.

Temporary Token (TT) is valid for 10 minutes. Once the Temporary Token expires, you have to call the `Token` API to refresh it.

## Further Usage

For any subsequent API calls, ensure that the *TT* is always passed in the headers as a cookie with the name `GDCAuthTT`

```bash title="Flex Insights - Usage Example"
curl -X GET https://analytics.ytica.com/gdc/{any_api} \
 -H 'Accept: application/json' \
 -H 'Content-Type: application/json' \
 -b '{temporary_token}}; path=/gdc; secure; HttpOnly' 
```

After successful authentication you can [Export Data from Flex Insights via API](/docs/flex/developer/insights/api/export-data).

## Log out

After you performed all necessary operations, you should log out to invalidate the SST. For this, you need to know your profile ID which can be found in the [API Authentication](/docs/flex/developer/insights/api/general-usage) response. Note the `{profile_id}` is *only* the last part (the alphanumeric string) of the userLogin "profile" object: `/gdc/account/profile/{profile_id}`.

Flex Insights - API Log out

```bash
curl --location --request DELETE 'https://analytics.ytica.com/gdc/account/login/{profile_id}' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'X-GDC-AuthSST: {super_secured_token}' \
--header 'Cookie: GDCAuthTT=XXXXX-XXXXX-XXXXX'
```

```json
204 No Content
```

## Delete a User Profile

If you no longer require access to the portal, you can delete your own profile from the [Flex Insights Analytics Portal](https://analytics.ytica.com/). After that, you will no longer be able to access the Analytics Portal and the Insights API with your direct credentials, and your user account will be removed from *all* workspaces. To get started, retrieve your `profile_id` from the profile link in the user login JSON response during [authentication](#api-authentication):

```json
"profile":"/gdc/account/profile/{profile_id}"
```

Run the following command to perform the deletion:

Flex Insights - API Delete a User Profile

```bash
curl --location --request DELETE 'https://analytics.ytica.com/gdc/account/profile/{profile_id}' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'X-GDC-AuthSST: {super_secured_token}' \
--header 'Cookie: GDCAuthTT=XXXXX-XXXXX-XXXXX'
```

```json
204 No Content
```

> \[!WARNING]
>
> Deleting a profile is only allowed for the currently logged in user. If you need to delete another user's profile, please contact Twilio Support.
