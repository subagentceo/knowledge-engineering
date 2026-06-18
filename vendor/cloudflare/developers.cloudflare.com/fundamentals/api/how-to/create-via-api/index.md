---
title: Create tokens via API
description: Learn how to create API tokens via Cloudflare's API. Follow steps to define access policies, set restrictions, and generate tokens securely.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create tokens via API

Generate new API tokens on the fly via the API. Before you can do this, you must create an API token in the Cloudflare dashboard that can create subsequent tokens.

Note

The API Token Template [**Create additional tokens**](https://developers.cloudflare.com/fundamentals/api/reference/template/) must be used to generate the token. The option for **API Tokens::Edit** is not available in any other template or in the Custom Token builder.

## Generating the initial token

Before you can create tokens via the API, you need to [generate the initial token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) via the Cloudflare dashboard.

Warning

The token secret is **only shown once**. Do not store the secret in plaintext where others can access it. Anyone with this token can perform the authorized actions against the resources that the token has access to.

### Recommendations

Cloudflare highly recommends that you do not grant other permissions to the token when using this template. Make sure you safeguard the new token because it can create tokens with access to any of a user's resources.

Cloudflare also recommends limiting the use of the token via client IP address filtering or TTL to reduce the potential for abuse in the event that the token is compromised. Refer to [Restrict token use](https://developers.cloudflare.com/fundamentals/api/how-to/restrict-tokens/) for more information.

## Creating API tokens with the API

You can create a user owned token or account owned token to use with the API. Refer to the [user owned token](https://developers.cloudflare.com/api/resources/user/subresources/tokens/methods/create/) or the [account owned token](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/methods/create/) API schema docs for more information.

To create a token:

1. Define the policy.
2. Define the restrictions.
3. Create the token.

### 1\. Define the Access Policy

An Access Policy defines what resources the token can act on and what permissions the token has to those resources. This process is similar to how you [create tokens in the Cloudflare dashboard](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

Each token can contain multiple policies.

```

[

  {

    "id": "f267e341f3dd4697bd3b9f71dd96247f",

    "effect": "allow",

    "resources": {

      "com.cloudflare.api.account.zone.eb78d65290b24279ba6f44721b3ea3c4": "*",

      "com.cloudflare.api.account.zone.22b1de5f1c0e4b3ea97bb1e963b06a43": "*"

    },

    "permission_groups": [

      {

        "id": "c8fed203ed3043cba015a93ad1616f1f",

        "name": "Zone Read"

      },

      {

        "id": "82e64a83756745bbbb1c9c2701bf816b",

        "name": "DNS Read"

      }

    ]

  }

]


```

| Field              | Description                                                                                                                                                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                 | Unique read-only identifier for the policy generated after creation.                                                                                                                                                                |
| effect             | Defines whether this policy is allowing or denying access. If only creating one policy, use allow. The evaluation order for policies is as follows: 1\. Explicit DENY Policies; 2\. Explicit ALLOW Policies; 3\. Implicit DENY ALL. |
| resources          | Defines what resources are allowed to be configured.                                                                                                                                                                                |
| permission\_groups | Defines what permissions the policy grants to the included resources.                                                                                                                                                               |

#### Resources

API token policies support three resource types: `User`, `Account`, and `Zone`.

Note

Fetch each object's ID by calling the appropriate `GET <object>` API. Refer to [User](https://developers.cloudflare.com/api/resources/user/methods/get/), [Account](https://developers.cloudflare.com/api/resources/accounts/methods/list/), and [Zone](https://developers.cloudflare.com/api/resources/zones/methods/list/) documentation for more details.

##### Account

Include a single account or all accounts in a token policy.

* A **single account** is denoted as:`"com.cloudflare.api.account.<ACCOUNT_ID>": "*"`.
* **All accounts** is denoted as:`"com.cloudflare.api.account.*": "*"`

##### Zone

Include a **single zone**, **all zones in an account**, or **all zones in all accounts** in a token policy.

* A **single zone** is denoted as:`"com.cloudflare.api.account.zone.<ZONE_ID>": "*"`
* **All Zones in an account** are denoted as:`"com.cloudflare.api.account.<ACCOUNT_ID>": {"com.cloudflare.api.account.zone.*": "*"}`
* **All zones in all accounts** is denoted as:`"com.cloudflare.api.account.zone.*": "*"`

##### User

For user resources, you can only reference yourself, which is denoted as:`"com.cloudflare.api.user.<USER_TAG>": "*"`

#### Permission groups

Add permission groups to the API token by specifying their `id` values. We recommend using `id` as the key for interacting with Cloudflare APIs; the permission `name` is cosmetic and subject to change. Permission groups are scoped to specific resources (user, account, or zone), so a permission group in a policy will only apply to the resource type it is scoped for.

To fetch all available permission groups and their IDs, use the [List permission groups](https://developers.cloudflare.com/api/resources/user/subresources/tokens/subresources/permission%5Fgroups/methods/list/) endpoint:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `API Tokens Write`
* `API Tokens Read`

List Token Permission Groups

```

curl "https://api.cloudflare.com/client/v4/user/tokens/permission_groups" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": [

    {

      "id": "19637fbb73d242c0a92845d8db0b95b1",

      "name": "AI Crawl Control Read",

      "description": "Grants access to reading AI Crawl Control",

      "scopes": [

        "com.cloudflare.api.account.zone"

      ]

    },

    {

      "id": "1ba6ab4cacdb454b913bbb93e1b8cb8c",

      "name": "AI Crawl Control Write",

      "description": "Grants access to reading and editing AI Crawl Control",

      "scopes": [

        "com.cloudflare.api.account.zone"

      ]

    },

    // (...)

  ]

}


```

### 2\. Define the restrictions

Set up any limitations on how the token can be used. API tokens allow restrictions for client IP address filtering and TTLs. Refer to [Restrict token use](https://developers.cloudflare.com/fundamentals/api/how-to/restrict-tokens/) for more information.

When defining TTLs, you can set the time at which a token becomes active with `not_before` and the time when it expires with `expires_on`. Both of these fields take UTC timestamps in the following format: `"2018-07-01T05:20:00Z"`.

Limit usage of a token by client IP address filters with the following object:

```

{

  "request.ip": {

    "in": ["199.27.128.0/21", "2400:cb00::/32"],

    "not_in": ["199.27.128.0/21", "2400:cb00::/32"]

  }

}


```

Each parameter in the `in` and `not_in` objects must be in CIDR notation. For example, use `192.168.0.1/32` to specify a single IP address.

### 3\. Create the token

Combine the previous information to create a token as in the following example:

* [ Account token ](#tab-panel-8569)
* [ User token ](#tab-panel-8570)

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/{account_id}/tokens" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "name": "readonly token",

  "policies": [

    {

      "effect": "allow",

      "resources": {

        "com.cloudflare.api.account.zone.eb78d65290b24279ba6f44721b3ea3c4": "*",

        "com.cloudflare.api.account.zone.22b1de5f1c0e4b3ea97bb1e963b06a43": "*"

      },

      "permission_groups": [

        {

          "id": "c8fed203ed3043cba015a93ad1616f1f",

          "name": "Zone Read"

        },

        {

          "id": "82e64a83756745bbbb1c9c2701bf816b",

          "name": "DNS Read"

        }

      ]

    }

  ],

  "not_before": "2020-04-01T05:20:00Z",

  "expires_on": "2020-04-10T00:00:00Z",

  "condition": {

    "request.ip": {

      "in": [

        "199.27.128.0/21",

        "2400:cb00::/32"

      ],

      "not_in": [

        "199.27.128.1/32"

      ]

    }

  }

}'


```

Terminal window

```

curl "https://api.cloudflare.com/client/v4/user/tokens" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "name": "readonly token",

  "policies": [

    {

      "effect": "allow",

      "resources": {

        "com.cloudflare.api.account.zone.eb78d65290b24279ba6f44721b3ea3c4": "*",

        "com.cloudflare.api.account.zone.22b1de5f1c0e4b3ea97bb1e963b06a43": "*"

      },

      "permission_groups": [

        {

          "id": "c8fed203ed3043cba015a93ad1616f1f",

          "name": "Zone Read"

        },

        {

          "id": "82e64a83756745bbbb1c9c2701bf816b",

          "name": "DNS Read"

        }

      ]

    }

  ],

  "not_before": "2020-04-01T05:20:00Z",

  "expires_on": "2020-04-10T00:00:00Z",

  "condition": {

    "request.ip": {

      "in": [

        "199.27.128.0/21",

        "2400:cb00::/32"

      ],

      "not_in": [

        "199.27.128.1/32"

      ]

    }

  }

}'


```

Terminal window

```

curl "https://api.cloudflare.com/client/v4/user/tokens" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data '{

  "name": "readonly token",

  "policies": [

    {

      "effect": "allow",

      "resources": {

        "com.cloudflare.api.account.zone.eb78d65290b24279ba6f44721b3ea3c4": "*",

        "com.cloudflare.api.account.zone.22b1de5f1c0e4b3ea97bb1e963b06a43": "*"

      },

      "permission_groups": [

        {

          "id": "c8fed203ed3043cba015a93ad1616f1f",

          "name": "Zone Read"

        },

        {

          "id": "82e64a83756745bbbb1c9c2701bf816b",

          "name": "DNS Read"

        }

      ]

    }

  ],

  "not_before": "2020-04-01T05:20:00Z",

  "expires_on": "2020-04-10T00:00:00Z",

  "condition": {

    "request.ip": {

      "in": [

        "199.27.128.0/21",

        "2400:cb00::/32"

      ],

      "not_in": [

        "199.27.128.1/32"

      ]

    }

  }

}'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/how-to/create-via-api/#page","headline":"Create tokens via API · Cloudflare Fundamentals docs","description":"Learn how to create API tokens via Cloudflare's API. Follow steps to define access policies, set restrictions, and generate tokens securely.","url":"https://developers.cloudflare.com/fundamentals/api/how-to/create-via-api/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/api/","name":"Cloudflare's API"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/api/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/api/how-to/create-via-api/","name":"Create tokens via API"}}]}
```
