---
title: Generic SAML application
description: Generic SAML application in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Generic SAML application

This page provides generic instructions for setting up a SaaS application in Cloudflare Access using the SAML authentication protocol.

## Prerequisites

* An [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) configured in Cloudflare One
* Admin access to the account of the SaaS application

## 1\. Get SaaS application URLs

Obtain the following URLs from your SaaS application account:

* **Entity ID**: A unique URL issued for your SaaS application, for example `https://<your-domain>.my.salesforce.com`.
* **Assertion Consumer Service URL**: The service provider's endpoint for receiving and parsing SAML assertions.

## 2\. Add your application to Access

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Select **Create new application**.
3. Select **SaaS application**.
4. Select your **Application** from the drop-down menu. If your application is not listed, enter a custom name in the **Application** field and select the textbox that appears below.
5. Select **SAML**.
6. Select **Add application**.
7. Enter the **Entity ID** and **Assertion Consumer Service URL** obtained from your SaaS application account.
8. Select the **Name ID Format** expected by your SaaS application (usually _Email_).
9. (Optional) Configure any additional [SAML attribute statements](#saml-attributes) required by your SaaS application.
10. Copy the **SSO endpoint**, **Access Entity ID or Issuer**, and **Public key**.

IdP groups

If you are using Okta, Microsoft Entra ID (formerly Azure AD), Google Workspace, or GitHub as your IdP, Access will automatically send a SAML attribute titled `groups` with all of the user's associated groups as attribute values.

1. Under **Access policies**, add an existing policy or [create a new policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/policy-management/) to control who can connect to your application. All Access applications are deny by default -- a user must match an Allow policy before they are granted access.
2. Configure how users will authenticate:  
   1. Select the [identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) you want to enable for your application.  
   2. (Recommended) If you plan to only allow access via a single IdP, turn on **Apply instant authentication**. End users will not be shown the [Cloudflare Access login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/). Instead, Cloudflare will redirect users directly to your SSO login event.  
   3. (Optional) Turn on **Authenticate with Cloudflare One Client** to allow users to authenticate to the application using their [ Cloudflare One Client session identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/).
3. (Optional) Go to **Additional settings** to customize the application experience:  
   * **App Launcher customization**: Configure how this application appears to users in the [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/).  
   * **Custom block pages**: Choose what users will see when they are denied access to the application.  
         * **Cloudflare default**: Reload the [login page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-login-page/) and display a block message below the Cloudflare Access logo. The default message is `That account does not have access`, or you can enter a custom message.  
         * **Redirect URL**: Redirect to the specified website.  
         * **Custom page template**: Display a [custom block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-block-page/) hosted in Cloudflare One.
4. Select **Create**.

## 3\. Configure SSO in your SaaS application

Next, configure your SaaS application to require users to log in through Cloudflare Access. Refer to your SaaS application documentation for instructions on how to configure a third-party SAML SSO provider. You will need the following values from the Cloudflare One:

* **SSO endpoint**
* **Access Entity ID or Issuer**
* **Public key**

You can either manually enter this data into your SaaS application or upload a metadata XML file. The metadata is available at the URL: `<SSO endpoint>/saml-metadata`.

### Validate SAML Response

When acting as a SAML identity provider, Cloudflare will sign both the SAML Response and the SAML Assertion using the SHA-256 algorithm. The SaaS application can validate this signature using the **Public key** that you upload to the SaaS application.

## 4\. Test the integration

Open an incognito browser window and go to the SaaS application's login URL. You will be redirected to the Cloudflare Access login screen and prompted to sign in with your identity provider.

## SAML attributes

[SAML attributes](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#saml-headers-and-attributes) refer to the user identity characteristics that Cloudflare Access shares with your SAML SaaS application upon successful authentication. By default, Cloudflare Access passes the following attributes (if available) to the SaaS application:

* `id` \- UUID of the user's Access identity
* `name` \- Full name of the user (for example, `John Doe`)
* `email` \- User's email address
* `groups` \- Identity provider group membership

In Access for SaaS, you can add additional SAML attributes or customize the SAML statement sent to the SaaS application. This allows you to integrate SaaS applications which have specific SAML attribute requirements.

### SAML attribute statements

To send additional SAML attributes to your SaaS application, configure the following fields for each attribute:

* **Name**: SAML attribute name
* **SAML friendly name**: (Optional) A human readable name for the SAML attribute
* **Name format**: Specify the **Name** format expected by the SaaS application:  
   * `Unspecified`: (default) No specific format required.  
   * `URI`: Name is in a format such as `urn:ietf:params:scim:schemas:core:2.0:User:userName` or `urn:oid:2.5.4.42`.  
   * `Basic`: Name is a normal string such as `userName`.
* **IdP claim**: The identity provider value that should map to this SAML attribute. You can select any [SAML attribute](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-saml/#saml-headers-and-attributes) or [OIDC claim](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/#custom-oidc-claims) that was configured in a Cloudflare One IdP integration.
* **Required**: If an attribute is marked as required but is not provided by an IdP, Cloudflare will fail the authentication request and show an error page.
* **Add per IdP claim**: (Optional) If you turned on multiple identity providers for the SaaS application, you can choose different attribute mappings for each IdP. These values will override the parent **IdP claim**.

### JSONata attribute transforms

In **Advanced settings** \> **Transformation**, you can enter a [JSONata ↗](https://jsonata.org/) script that modifies a copy of the [User Registry identity](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/users/). This is useful for setting default values, excluding email addresses, or ensuring usernames meet arbitrary criteria. Access will send the modified user identity to the SaaS application as SAML attributes.

This corresponds to the `saml_attribute_transform_jsonata` field in the [Access applications API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/create/).

Note

JSONata transformations are not compatible with [SAML attribute statements](#saml-attribute-statements). JSONata transformations will override any specified SAML attributes.

For example, the following JSONata script merges group names into a list and adds an `eduPersonPrincipalName` field which maps to the user email.

JSONata expression

```

$merge([$, {"groups": groups.name, 'eduPersonPrincipalName': email}])


```

Here is an example of a user identity before applying the JSONata transform:

User identity before JSONata transform

```

{

  "account_id": "699d98642c564d2e855e9661899b7252",

  "amr": [

    "pwd"

  ],

  "auth_status": "NONE",

  "common_name": "",

  "device_id": "c1744f8b-faa1-48a4-9e5c-02ac921467fa",

  "device_sessions": {

    "49e653db-991e-11ee-af26-2243bf8c3428": {

      "last_authenticated": 1703004275

    }

  },

  "devicePosture": {

    "8534a230-e85e-4183-8964-a4b7dcf72986": {

      "rule_name": "Warp",

      "success": true,

      "type": "warp"

    }

  },

  "email": "jdoe@company.com",

  "gateway_account_id": "bTSquyUGwLQjYJn8cI8S1h6M6wU",

  "geo": {

    "country": "US"

  },

  "groups": [

    {

      "id": "12fdf91a-fb23-41b3-995a-de2f72c61d0e",

      "name": "IdentityProtection-RiskyUser-RiskLevel-low"

    },

    {

      "id": "12348f47-8234-4860-a03f-c2a1513f267b",

      "name": "Global Administrator"

    },

    {

      "id": "11235980-87d7-4917-b0aa-74c01914c40e",

      "name": "Application Administrator"

    }

  ],

  "iat": 1659474397,

  "id": "OidHvkPt-I-13IBSnd77UJ8cHgsrUpjs3W6_4t6ES7M",

  "idp": {

    "id": "b08e8c0c-a75d-4b3f-8e7b-cd427b7c7b47",

    "type": "azureAD"

  }

}


```

Result after applying the example JSONata script:

```

{

  "account_id": "699d98642c564d2e855e9661899b7252",

  "amr": [

    "pwd"

  ],

  "auth_status": "NONE",

  "common_name": "",

  "device_id": "c1744f8b-faa1-48a4-9e5c-02ac921467fa",

  "device_sessions": {

    "49e653db-991e-11ee-af26-2243bf8c3428": {

      "last_authenticated": 1703004275

    }

  },

  "devicePosture": {

    "8534a230-e85e-4183-8964-a4b7dcf72986": {

      "rule_name": "Warp",

      "success": true,

      "type": "warp"

    }

  },

  "email": "jdoe@company.com",

  "gateway_account_id": "bTSquyUGwLQjYJn8cI8S1h6M6wU",

  "geo": {

    "country": "US"

  },

  "groups": [

    "IdentityProtection-RiskyUser-RiskLevel-low",

    "Global Administrator",

    "Application Administrator"

  ],

  "iat": 1659474397,

  "id": "OidHvkPt-I-13IBSnd77UJ8cHgsrUpjs3W6_4t6ES7M",

  "idp": {

    "id": "b08e8c0c-a75d-4b3f-8e7b-cd427b7c7b47",

    "type": "azureAD"

  },

  "eduPersonPrincipalName": "jdoe@company.com"

}


```

For more JSONata transform use cases, refer to the following examples.

Remove groups attribute

The following JSONata script removes the `groups` SAML attribute. This can be useful if your SaaS application does not need to receive user group information.

JSONata expression

```

$ ~> |$|{}, ['groups']|


```

Result after applying the JSONata transform:

```

{

  "account_id": "699d98642c564d2e855e9661899b7252",

  "amr": [

    "pwd"

  ],

  "auth_status": "NONE",

  "common_name": "",

  "device_id": "c1744f8b-faa1-48a4-9e5c-02ac921467fa",

  "device_sessions": {

    "49e653db-991e-11ee-af26-2243bf8c3428": {

      "last_authenticated": 1703004275

    }

  },

  "devicePosture": {

    "8534a230-e85e-4183-8964-a4b7dcf72986": {

      "rule_name": "Warp",

      "success": true,

      "type": "warp"

    }

  },

  "email": "jdoe@company.com",

  "gateway_account_id": "bTSquyUGwLQjYJn8cI8S1h6M6wU",

  "geo": {

    "country": "US"

  },

  "iat": 1659474397,

  "id": "OidHvkPt-I-13IBSnd77UJ8cHgsrUpjs3W6_4t6ES7M",

  "idp": {

    "id": "b08e8c0c-a75d-4b3f-8e7b-cd427b7c7b47",

    "type": "azureAD"

  }

}


```

Rename groups field and remove group ID

The following JSONata script changes the `groups.name` field from `name` to `group_name` and removes the `groups.id` field:

JSONata expression

```

{

  "account_id": account_id,

  "amr": amr,

  "auth_status": auth_status,

  "common_name": common_name,

  "devicePosture": devicePosture,

  "device_id": device_id,

  "device_sessions": device_sessions,

  "email": email,

  "gateway_account_id": gateway_account_id,

  "geo": geo,

  "groups": $map($.groups, function($group) {

    {"group_name": $group.name}}),

  "iat": iat,

  "id": id,

  "idp": idp

}


```

Result after applying the JSONata transform:

```

{

  "account_id": "699d98642c564d2e855e9661899b7252",

  "amr": [

    "pwd"

  ],

  "auth_status": "NONE",

  "common_name": "",

  "devicePosture": {

    "8534a230-e85e-4183-8964-a4b7dcf72986": {

      "rule_name": "Warp",

      "success": true,

      "type": "warp"

    }

  },

  "device_id": "c1744f8b-faa1-48a4-9e5c-02ac921467fa",

  "device_sessions": {

    "49e653db-991e-11ee-af26-2210bf8c3428": {

      "last_authenticated": 1703004275

    }

  },

  "email": "jdoe@company.com",

  "gateway_account_id": "bTSquyUGwLQjYJn8cI8S1h6M6wU",

  "geo": {

    "country": "US"

  },

  "groups": [

    {

      "group_name": "IdentityProtection-RiskyUser-RiskLevel-low"

    },

    {

      "group_name": "Global Administrator"

    },

    {

      "group_name": "Application Administrator"

    }

  ],

  "iat": 1659474397,

  "id": "OidHvkPt-I-13IBSnd77UJ8cHgsrUpjs3W6_4t6ES7M",

  "idp": {

    "id": "b08e8c0c-a75d-4b3f-8e7b-cd427b7c7b47",

    "type": "azureAD"

  }

}


```

Filter groups by name

The following JSONata script filters groups to those that match a regular expression.

JSONata expression

```

$merge([$, { "groups": $filter(groups, function($v) { $contains($v.name, /Administrator/) }) }])


```

Result after applying the JSONata transform:

```

{

  "account_id": "699d98642c564d2e855e9661899b7252",

  "amr": [

    "pwd"

  ],

  "auth_status": "NONE",

  "common_name": "",

  "device_id": "c1744f8b-faa1-48a4-9e5c-02ac921467fa",

  "device_sessions": {

    "49e653db-991e-11ee-af26-2243bf8c3428": {

      "last_authenticated": 1703004275

    }

  },

  "devicePosture": {

    "8534a230-e85e-4183-8964-a4b7dcf72986": {

      "rule_name": "Warp",

      "success": true,

      "type": "warp"

    }

  },

  "email": "jdoe@company.com",

  "gateway_account_id": "bTSquyUGwLQjYJn8cI8S1h6M6wU",

  "geo": {

    "country": "US"

  },

  "groups": [

    {

      "id": "12348f47-8234-4860-a03f-c2a1513f267b",

      "name": "Global Administrator"

    },

    {

      "id": "11235980-87d7-4917-b0aa-74c01914c40e",

      "name": "Application Administrator"

    }

  ],

  "iat": 1659474397,

  "id": "OidHvkPt-I-13IBSnd77UJ8cHgsrUpjs3W6_4t6ES7M",

  "idp": {

    "id": "b08e8c0c-a75d-4b3f-8e7b-cd427b7c7b47",

    "type": "azureAD"

  }

}


```

### NameID transform

By default, Access sends the user's email address as the SAML `NameID`. Some SaaS applications require a different value, such as an employee ID, a modified email address, or a username from a legacy system.

You can customize the `NameID` by setting the `name_id_transform_jsonata` field on the SaaS application via the [Access applications API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/create/). This field accepts a [JSONata ↗](https://jsonata.org/) expression that evaluates against the user's identity and must return a single string value. The result replaces the default `NameID` in the SAML assertion.

Note

The NameID transform is only available through the API. To configure it, update the `saas_app.name_id_transform_jsonata` field on your Access application.

For example, to modify the user's email so that it includes a `+sandbox` suffix (useful when connecting multiple instances of the same SaaS app):

Set a NameID transform via the API

```

curl --request PUT \

https://api.cloudflare.com/client/v4/accounts/{account_id}/access/apps/{app_id} \

--header "Authorization: Bearer {api_token}" \

--header "Content-Type: application/json" \

--data '{

  "saas_app": {

    "auth_type": "saml",

    "name_id_transform_jsonata": "$substringBefore(email, '\''@'\'') & '\''+sandbox@'\'' & $substringAfter(email, '\''@'\'')"

  }

}'


```

Given a user with the email `jdoe@company.com`, this expression produces a `NameID` of `jdoe+sandbox@company.com`.

Use employee ID as NameID

To send a non-email attribute such as an employee ID, reference the attribute name directly in the JSONata expression. The attribute must be available in the user's identity from the IdP.

Set employee\_id as NameID

```

curl --request PUT \

https://api.cloudflare.com/client/v4/accounts/{account_id}/access/apps/{app_id} \

--header "Authorization: Bearer {api_token}" \

--header "Content-Type: application/json" \

--data '{

  "saas_app": {

    "auth_type": "saml",

    "name_id_transform_jsonata": "employee_id"

  }

}'


```

Given a user identity that contains `"employee_id": "efgh5678"`, the `NameID` sent in the SAML assertion will be `efgh5678`.

Remove NameID transform

To revert to the default behavior (sending the user's email as the `NameID`), set the field to an empty string:

Remove NameID transform

```

curl --request PUT \

https://api.cloudflare.com/client/v4/accounts/{account_id}/access/apps/{app_id} \

--header "Authorization: Bearer {api_token}" \

--header "Content-Type: application/json" \

--data '{

  "saas_app": {

    "auth_type": "saml",

    "name_id_transform_jsonata": ""

  }

}'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/generic-saml-saas/#page","headline":"Generic SAML application · Cloudflare One docs","description":"Generic SAML application in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/generic-saml-saas/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/","name":"Add web applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/","name":"SaaS applications"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/access-controls/applications/http-apps/saas-apps/generic-saml-saas/","name":"Generic SAML application"}}]}
```
