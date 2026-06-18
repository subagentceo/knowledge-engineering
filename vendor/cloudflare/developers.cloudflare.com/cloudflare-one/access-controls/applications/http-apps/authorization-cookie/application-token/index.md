---
title: Application token
description: Learn how Cloudflare Access uses application tokens to secure your origin. Understand JWT structure and payloads.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Application token

Cloudflare Access includes the application token with all authenticated requests to your origin. A typical JWT looks like this:

`eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzMzhhYmUxYmFmMmZlNDkyZjY0.eyJhdWQiOlsiOTdlMmFhZ TEyMDEyMWY5MDJkZjhiYzk5ZmMzNDU5MTNh.zLYsHmLEginAQUXdygQo08gLTExWNXsN4jBc6PKdB`

As shown above, the JWT contains three Base64-URL values separated by dots:

* [Header](#header)
* [Payload](#payload)
* [Signature](#signature)

Unless your application is connected to Access through Cloudflare Tunnel, your application must [validate the token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/) to ensure the security of your origin. Validation of the header alone is not sufficient — the JWT and signature must be confirmed to avoid identity spoofing.

## Header

```

{

  "alg": "RS256",

  "kid": "9338abe1baf2fe492f646a736f25afbf7b025e35c627be4f60c414d4c73069b8",

  "typ": "JWT"

}


```

* `alg` identifies the encoding algorithm.
* `kid` identifies the key used to sign the token.
* `typ` designates the token format.

## Payload

The payload contains the actual claim and user information to pass to the application. Payload contents vary depending on whether you authenticated to the application with an identity provider or with a [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/).

### Identity-based authentication

```

{

  "aud": ["32eafc7626e974616deaf0dc3ce63d7bcbed58a2731e84d06bc3cdf1b53c4228"],

  "email": "user@example.com",

  "exp": 1659474457,

  "iat": 1659474397,

  "nbf": 1659474397,

  "iss": "https://yourteam.cloudflareaccess.com",

  "type": "app",

  "identity_nonce": "6ei69kawdKzMIAPF",

  "sub": "7335d417-61da-459d-899c-0a01c76a2f94",

  "country": "US"

}


```

| Field           | Description                                                                                                                                                                                                                                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aud             | [Application audience (AUD) tag](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/#get-your-aud-tag) of the Access application.                                                                                                                              |
| email           | The email address of the authenticated user, verified by the identity provider.                                                                                                                                                                                                                                                          |
| exp             | The expiration timestamp for the token (Unix time).                                                                                                                                                                                                                                                                                      |
| iat             | The issuance timestamp for the token (Unix time).                                                                                                                                                                                                                                                                                        |
| nbf             | The not-before timestamp for the token (Unix time), used to check if the token was received before it should be used.                                                                                                                                                                                                                    |
| iss             | The Cloudflare Access domain URL for the application.                                                                                                                                                                                                                                                                                    |
| type            | The type of Access token (app for application token or org for global session token).                                                                                                                                                                                                                                                    |
| identity\_nonce | A cache key used to get the [user's identity](#user-identity).                                                                                                                                                                                                                                                                           |
| sub             | The ID of the user. This value is unique to an email address per account. The user would get a different sub if they are [removed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/#remove-a-user) and re-added to your Zero Trust organization, or if they log into a different organization. |
| country         | The country where the user authenticated from.                                                                                                                                                                                                                                                                                           |

#### Custom SAML attributes and OIDC claims

Access allows you to add custom SAML attributes and OIDC claims to your JWT for enhanced verification, if supported by your identity provider. This is configured when you setup your [SAML](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/) or [OIDC](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/) provider.

#### User identity

User identity is useful for checking application permissions. For example, your application can validate that a given user is a member of an Okta or Microsoft Entra ID group such as `Finance-Team`.

Due to cookie size limits and bandwidth considerations, the application token only contains a subset of the user's identity. To get the user's full identity, send the `CF_Authorization` cookie to `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/get-identity`. Your request should be structured as follows:

Terminal window

```

curl -H 'cookie: CF_Authorization=<user-token>' https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/get-identity


```

Access will return a JSON structure containing the following data:

| Field                  | Description                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| email                  | The email address of the user.                                                             |
| idp                    | Data from your identity provider.                                                          |
| geo                    | The country where the user authenticated from.                                             |
| user\_uuid             | The ID of the user.                                                                        |
| devicePosture          | The device posture attributes.                                                             |
| account\_id            | The account ID for your organization.                                                      |
| iat                    | The timestamp indicating when the user logged in.                                          |
| ip                     | The IP address of the user.                                                                |
| auth\_status           | The status if authenticating with mTLS.                                                    |
| common\_name           | The common name on the mTLS client certificate.                                            |
| service\_token\_id     | The Client ID of the service token used for authentication.                                |
| service\_token\_status | True if authentication was through a service token instead of an IdP.                      |
| is\_warp               | True if the user enabled WARP.                                                             |
| is\_gateway            | True if the user enabled the Cloudflare One Client and authenticated to a Zero Trust team. |
| gateway\_account\_id   | An ID generated by the Cloudflare One Client when authenticated to a Zero Trust team.      |
| device\_id             | The ID of the device used for authentication.                                              |
| version                | The version of the get-identity object.                                                    |
| device\_sessions       | A list of all sessions initiated by the user.                                              |

### Service token authentication

```

{

  "type": "app",

  "aud": ["32eafc7626e974616deaf0dc3ce63d7bcbed58a2731e84d06bc3cdf1b53c4228"],

  "exp": 1659474457,

  "iss": "https://yourteam.cloudflareaccess.com",

  "common_name": "e367826f93b8d71185e03fe518aff3b4.access",

  "iat": 1659474397,

  "sub": ""

}


```

| Field        | Description                                                                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type         | The type of Access token (app for application token or org for global session token).                                                                                                                           |
| aud          | The [application audience (AUD) tag](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/#get-your-aud-tag) of the Access application. |
| exp          | The expiration timestamp of the JWT (Unix time).                                                                                                                                                                |
| iss          | The Cloudflare Access domain URL for the application.                                                                                                                                                           |
| common\_name | The Client ID of the service token (CF-Access-Client-Id).                                                                                                                                                       |
| iat          | The issuance timestamp of the JWT (Unix time).                                                                                                                                                                  |
| sub          | Contains an empty string when authentication was through a service token.                                                                                                                                       |

## Signature

Cloudflare generates the signature by signing the encoded header and payload using the SHA-256 algorithm (RS256). In RS256, a private key signs the JWTs and a separate [public key](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/#access-signing-keys) verifies the signature.

For more information on JWTs, refer to [jwt.io ↗](https://jwt.io/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/#page","headline":"Application token · Cloudflare One docs","description":"Learn how Cloudflare Access uses application tokens to secure your origin. Understand JWT structure and payloads.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON web token (JWT)"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/","name":"Authorization cookie"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/","name":"Application token"}}]}
```
