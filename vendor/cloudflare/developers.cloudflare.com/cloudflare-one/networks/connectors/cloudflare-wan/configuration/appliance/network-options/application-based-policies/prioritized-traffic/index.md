---
title: Prioritized traffic
description: Prioritized traffic allows you to define which applications are processed first by Connector.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Prioritized traffic

Prioritized traffic allows you to define which applications Cloudflare One Appliance (formerly Magic WAN Connector) should process first. Applications not in the list will be queued behind prioritized traffic.

Similarly to breakout traffic, prioritized traffic also works via DNS requests inspection.

Warning 

Prioritized traffic will not work for applications that use DNS-over-HTTPS.

## Add an application to your account

Before you can add or remove Prioritized traffic applications to your Cloudflare One Appliance, you need to create an account-level list with the applications that you want to configure. Currently, adding to or modifying this list is only possible via API, through the [managed\_app\_id](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/apps/methods/create/) endpoint.

To add applications to your account:

Send a `POST` request to add new apps to your account.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Magic WAN Write`
* `Magic Transit Write`

Create a new App

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "managed_app_id": "<APP_ID>",

    "name": "<APP_NAME>",

    "type": "<APP_TYPE>"

  }'


```

```

{

  "result": {

    "account_app_id": "eb09v665c0784618a3e4ba9809258fd4",

    "name": "<APP_NAME>",

    "type": "<APP_TYPE>",

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

You can now add this new app to the Prioritized traffic list in your Cloudflare One Appliance.

### Add an application to Cloudflare One Appliance

You need to configure Prioritized traffic applications for each of your existing sites, as this is a per-site configuration.

* [ Dashboard ](#tab-panel-7352)
* [ API ](#tab-panel-7353)

1. Log in to the [Cloudflare One dashboard](https://one.dash.cloudflare.com/), and go to **Networks**.
2. Go to **Connectors** \> **Appliances** \> **Profiles**.
1. Select the Cloudflare One Appliance you want to configure > **Edit**.
2. Select **Traffic Steering**.
3. In **Prioritized traffic**, select **Create**.
4. Select one or more applications that should bypass Cloudflare filtering from the list. You can also use the search box.
1. Select **Save**.

The traffic for the application you chose is now processed first by Connector.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

1. Send a `GET` [request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/apps/methods/list/) to list the applications associated with an account.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Magic WAN Write`  
   * `Magic WAN Read`  
   * `Magic Transit Read`  
   * `Magic Transit Write`  
List Apps  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
```  
  {  
    "result": [  
      {  
        "managed_app_id": "<APP_ID>",  
        "name": "<APP_NAME>",  
        "type": "File Sharing",  
        "hostnames": [  
          "<app_name.com>",  
          "<app-name.info>"  
        ]  
      }  
    ]  
  }  
```  
Take note of the `"managed_app_id"` value for any application you want to add.
2. Send a `POST` request to add new apps to the Prioritized traffic policy.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Magic WAN Write`  
   * `Magic Transit Write`  
Create a new App Config  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "managed_app_id": "<MANAGED_APP_ID>",  
    "breakout": true  
  }'  
```  
```  
{  
  "result": {  
    "account_app_id": "<APP_ID>",  
    "name": "<APP_NAME>",  
    "type": "<BREAKOUT_OR_PRIORITY>"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```

### Delete an application from Cloudflare One Appliance

* [ Dashboard ](#tab-panel-7350)
* [ API ](#tab-panel-7351)

1. Log in to the [Cloudflare One dashboard](https://one.dash.cloudflare.com/), and go to **Networks**.
2. Go to **Connectors** \> **Appliances** \> **Profiles**.
1. Select the Appliance you want to configure > **Edit**.
2. Select **Traffic Steering**.
3. In **Prioritized traffic**, find the application you want to delete > select the **three dots** next to it > **Remove application traffic**.
4. (Optional) If you have several pages of applications, you can use the search box to quickly find the application you are looking for.

Note

You will need your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/) to use the API.

You need to delete Prioritized traffic applications for each of your existing sites, as this is a per-site configuration.

1. Send a [GET request](https://developers.cloudflare.com/api/resources/magic%5Ftransit/subresources/apps/methods/list/) to list the applications associated with a site.  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Magic WAN Write`  
   * `Magic WAN Read`  
   * `Magic Transit Read`  
   * `Magic Transit Write`  
List App Configs  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
```  
  {  
    "result": [  
      {  
        "id": "<APP_ID>",  
        "site_id": "<SITE_ID>",  
        "managed_app_id": "<APP_NAME>",  
        "breakout": true  
      }  
    ]  
  }  
```  
Take note of the `"id"` value for the application that you want to delete.
2. Send a `DELETE` request to delete an application from the Prioritized traffic policy.  
Terminal window  
```  
curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/magic/sites/%7Bsite_id%7D/app_configs/%7Bid%7D" \  
  --request DELETE  
```  
```  
{  
    "result": {  
        "id": "<APP_ID>",  
        "site_id": "<SITE_ID>",  
        "managed_app_id": "<APP_NAME>",  
        "breakout": true  
    },  
    "success": true,  
    "errors": [],  
    "messages": []  
}  
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/prioritized-traffic/#page","headline":"Prioritized traffic · Cloudflare One docs","description":"Prioritized traffic allows you to define which applications are processed first by Connector.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/prioritized-traffic/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/","name":"Configure with Connector"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/","name":"Network options"}},{"@type":"ListItem","position":9,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/","name":"Application-aware policies"}},{"@type":"ListItem","position":10,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/appliance/network-options/application-based-policies/prioritized-traffic/","name":"Prioritized traffic"}}]}
```
