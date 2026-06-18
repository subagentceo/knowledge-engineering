---
title: Service tokens
description: Service tokens in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Service tokens

You can provide automated systems with service tokens to authenticate against your Cloudflare One policies. Cloudflare Access will generate service tokens that consist of a Client ID and a Client Secret. Automated systems or applications can then use these values to reach an application protected by Access.

This section covers how to create, renew, and revoke a service token.

## Create a service token

* [ Dashboard ](#tab-panel-7171)
* [ API ](#tab-panel-7172)
* [ Terraform (v5) ](#tab-panel-7173)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **Service Tokens**.
2. Select **Create Service Token**.
3. Name the service token. The name allows you to easily identify events related to the token in the logs and to revoke the token individually.
4. Choose a **Service Token Duration**. This sets the expiration date for the token.
5. Select **Generate token**. You will see the generated Client ID and Client Secret for the service token, as well as their respective request headers.
6. Copy the Client Secret.  
Warning  
This is the only time Cloudflare Access will display the Client Secret. If you lose the Client Secret, you must generate a new service token.

1. Make a `POST` request to the [Access Service Tokens](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/service%5Ftokens/methods/create/) endpoint:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Service Tokens Write`  
Create a service token  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/service_tokens" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "CI/CD token",  
    "duration": "8760h"  
  }'  
```
2. Copy the `client_id` and `client_secret` values returned in the response.  
Response  
```  
"result": {  
  "client_id": "88bf3b6d86161464f6509f7219099e57.access",  
  "client_secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5",  
  "created_at": "2025-09-25T22:26:26Z",  
  "expires_at": "2026-09-25T22:26:26Z",  
  "id": "3537a672-e4d8-4d89-aab9-26cb622918a1",  
  "name": "CI/CD token",  
  "updated_at": "2025-09-25T22:26:26Z",  
  "duration": "8760h",  
  "client_secret_version": 1  
}  
```  
Warning  
This is the only time Cloudflare Access will display the Client Secret. If you lose the Client Secret, you must generate a new service token.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Access: Service Tokens Write`
2. Configure the [cloudflare\_zero\_trust\_access\_service\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fservice%5Ftoken) resource:  
```  
resource "cloudflare_zero_trust_access_service_token" "example_service_token" {  
  account_id = var.cloudflare_account_id  
  name       = "Example service token"  
  duration  = "8760h"  
  lifecycle {  
    create_before_destroy = true  
  }  
}  
```
3. Get the Client ID and Client Secret of the service token:  
Example: Output to CLI  
   1. Output the Client ID and Client Secret to the Terraform state file:  
   ```  
   output "example_service_token_client_id" {  
     value     = cloudflare_zero_trust_access_service_token.example_service_token.client_id  
   }  
   output "example_service_token_client_secret" {  
     value     = cloudflare_zero_trust_access_service_token.example_service_token.client_secret  
     sensitive = true  
   }  
   ```  
   2. Apply the configuration:  
   Terminal window  
   ```  
   terraform apply  
   ```  
   3. Read the Client ID and Client Secret:  
   Terminal window  
   ```  
   terraform output -raw example_service_token_client_id  
   ```  
   Terminal window  
   ```  
   terraform output -raw example_service_token_client_secret  
   ```  
Example: Store in HashiCorp Vault  
```  
  resource "vault_generic_secret" "example_service_token" {  
    path         = "kv/cloudflare/example_service_token"  
    data_json = jsonencode({  
      "CLIENT_ID"     = cloudflare_access_service_token.example_service_token.client_id  
      "CLIENT_SECRET" = cloudflare_access_service_token.example_service_token.client_secret  
    })  
  }  
```

You can now configure your Access applications and [device enrollment permissions](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/#check-for-service-token) to accept this service token. Make sure to set the policy action to [**Service Auth**](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#service-auth); otherwise, Access will prompt for an identity provider login.

## Connect your service to Access

### Initial request

To authenticate to an Access application using your service token, add the following to the headers of any HTTP request:

`CF-Access-Client-Id: <CLIENT_ID>`

`CF-Access-Client-Secret: <CLIENT_SECRET>`

For example,

Terminal window

```

curl -H "CF-Access-Client-Id: <CLIENT_ID>" -H "CF-Access-Client-Secret: <CLIENT_SECRET>" https://app.example.com


```

If the service token is valid, Access generates a JWT scoped to the application in the form of a [CF\_Authorization cookie](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/). You can use this cookie to authenticate [subsequent requests](#subsequent-requests) to the application.

#### Authenticate with a single header

You can configure a self-hosted Access application to accept a service token in a single HTTP header, as an alternative to the `CF-Access-Client-Id` and `CF-Access-Client-Secret` pair of headers. This is useful for authenticating SaaS services that only support sending one custom header in a request (for example, the `Authorization` header).

To authenticate using a single header:

1. Get your existing Access application configuration:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
   * `Access: Apps and Policies Read`  
Get an Access application  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_ID" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```
2. Make a `PUT` request with the name of the header you want to use for service token authentication. To avoid overwriting your existing configuration, the `PUT` request body should contain all fields returned by the previous `GET` request.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
Update an Access application  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_ID" \  
  --request PUT \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "domain": "app.example.com",  
    "type": "self_hosted",  
    "read_service_tokens_from_header": "Authorization"  
  }'  
```
3. Add the header to any HTTP request. For example,  
Terminal window  
```  
curl -H "Authorization: {\"cf-access-client-id\": \"<CLIENT_ID>\", \"cf-access-client-secret\": \"<CLIENT_SECRET>\"}" https://app.example.com  
```

### Subsequent requests

After you have [authenticated to the application](#initial-request) using the service token, add the resulting `CF_Authorization` cookie to the headers of all subsequent requests:

Terminal window

```

curl -H "cookie: CF_Authorization=<CF_AUTHORIZATION_COOKIE>" https://app.example.com


```

If you prefer to use a raw header, send the value as `cf-access-token`:

Terminal window

```

curl -H "cf-access-token: <CF_AUTHORIZATION_COOKIE>" https://app.example.com


```

All requests with this cookie will succeed until the JWT expires.

Note

If your Access application only has Service Auth policies, you must send the service token on every subsequent request. You can only use the JWT if the application has at least one Allow policy.

## Renew service tokens

Service tokens expire according to the token duration you selected when you created the token.

To renew the service token:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **Service Tokens**.
2. Locate the token you want to renew.
3. To extend the token's lifetime by one year, select **Refresh**.
4. To extend the token's lifetime by more than a year:  
   1. Select **Edit**.  
   2. Choose a new **Service Token Duration**.  
   3. Select **Save**. The expiration date will be extended by the selected amount of time.

## Revoke service tokens

If you need to revoke access before the token expires, simply delete the token.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **Service Tokens**.
2. **Delete** the token you need to revoke.

Services that rely on a deleted service token can no longer reach your application.

Note

When editing an Access application, selecting **Revoke existing tokens** revokes existing sessions but does not prevent the user from starting a new session. As long as the Client ID and Client Secret are still valid, they can be exchanged for a new token on the next request. To revoke access, you must delete the service token.

## Set a token expiration alert

An alert can be configured to notify a week before a service token expires to allow an administrator to invoke a token refresh.

Expiring Access Service Token Alert

**Who is it for?**

[Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) customers who want to receive a notification when their service token is about to expire.

**Other options / filters**

None.

**Included with**

Purchase of Access

**What should you do if you receive one?**

Extend the expiration date of the service token. For more details, refer to [Renew your service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/#renew-service-tokens).

To configure a service token expiration alert:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com), go to the **Notifications** page.[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select **Add**.
3. Select _Expiring Access Service Token_.
4. Enter a name for your alert and an optional description.
5. (Optional) Add other recipients for the notification email.
6. Select **Save**.

Your alert has been set and is now visible on the **Notifications** page.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/#page","headline":"Service tokens · Cloudflare One docs","description":"Service tokens in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON web token (JWT)","Authentication"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/service-credentials/","name":"Service credentials"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/service-credentials/service-tokens/","name":"Service tokens"}}]}
```
