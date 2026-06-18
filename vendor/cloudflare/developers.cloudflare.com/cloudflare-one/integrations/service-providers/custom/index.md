---
title: Custom device posture integration
description: Configure custom device posture checks in Cloudflare One using a service-to-service integration.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom device posture integration

Cloudflare One allows you to enforce custom device posture checks on your applications. This involves configuring a Cloudflare One Client service-to-service integration that periodically calls the external API of your choice, whether it is a third-party endpoint provider or a home built solution. When called, the API will receive device identifying information from Cloudflare and be expected to return a value between `0` to `100`. You can then set up a device posture check that determines if the returned value counts as a pass or fail; for example, you could allow access to a user only if their device has a posture value greater than `60`.

sequenceDiagram
    participant Cloudflare One Client
		participant Cloudflare Access
    participant External API
    Cloudflare One Client->>Cloudflare Access: Client ID and Secret
		Cloudflare Access->>External API: Application token
		Cloudflare One Client->>External API: JSON with user and device identity
    External API-->>Cloudflare One Client: JSON with 0-100 result

## External API requirements

The custom service provider integration works with any API service that meets the following specifications. For an example of a custom device posture integration API, refer to our [Cloudflare Workers sample code ↗](https://github.com/cloudflare/custom-device-posture-integration-example-worker).

### Authentication

The Cloudflare One Client authenticates to the external API through Cloudflare Access. The external API should [validate the application token](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/) issued by Cloudflare Access to ensure that any requests which bypass Access (for example, due to a network misconfiguration) are rejected.

### Data passed to external API

Cloudflare will pass the following parameters to the configured API endpoint. You can use this data to identify the device and assign a posture score. For some devices, not all identifying information will apply, in which case the field will be blank. A maximum of 1,000 devices will be sent per a request.

| Field          | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| device\_id     | Device UUID assigned by the Cloudflare One Client            |
| email          | Email address used to authenticate the Cloudflare One Client |
| serial\_number | Device serial number                                         |
| mac\_address   | Device MAC address                                           |
| virtual\_ipv4  | Device virtual IPv4 address                                  |
| hostname       | Device name                                                  |

Note

Devices are identified by their serial numbers. You must ensure that each of your devices has a unique serial number. If multiple devices have the same serial number, Cloudflare and your external API will not be able to accurately match them.

Example request body:

```

{

  "devices": {

    [

      {

        "device_id": "9ece5fab-7398-488a-a575-e25a9a3dec07",

        "email": "jdoe@mycompany.com",

        "serial_number": "jdR44P3d",

        "mac_address": "74:1d:3e:23:e0:fe",

        "virtual_ipv4": "100.96.0.10",

        "hostname": "string",

      },

      {...},

      {...}

    ]

  }

}


```

### Expected response from external API

For each Cloudflare `device_id`, the API service is expected to return a posture score and optionally a third-party device ID.

| Field   | Description                                         |
| ------- | --------------------------------------------------- |
| s2s\_id | Third party device ID (empty string if unavailable) |
| score   | Integer value between 0 \- 100                      |

Example response body:

```

{

  "result": {

    "9ece5fab-7398-488a-a575-e25a9a3dec07": {

      "s2s_id": "",

      "score": 10

    },

    "device_id2": {...},

    "device_id3": {...}

  }

}


```

## Set up custom device posture checks

### 1\. Create a service token

The Cloudflare One Client uses an Access Client ID and Access Client Secret to securely authenticate to the external API. If you do not already have an Access Client ID and Access Client Secret, [create a new service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/#create-a-service-token).

### 2\. Create an Access application

Next, secure the external API behind Cloudflare Access so that the Cloudflare One Client can authenticate with the service token. To add the API endpoint to Access:

1. [Create a self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) for your API endpoint.
2. Add the following Access policy to the application. Make sure that **Action** is set to _Service Auth_ (not _Allow_).  
| Action       | Rule type | Selector      | Value        |  
| ------------ | --------- | ------------- | ------------ |  
| Service Auth | Include   | Service Token | <TOKEN-NAME> |

### 3\. Add a service provider integration

To create a custom service-to-service integration:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Service providers**.
2. Select **Add new**.
3. Select **Custom service provider**.
4. Enter any name for the provider. This name will be used throughout the dashboard to reference this connection.
1. In **Access client ID** and **Access client secret**, enter the Access service token used to authenticate to your external API.
2. In **Rest API URL**, enter the external API endpoint that Cloudflare will query for posture information (for example, `https://api.example.com`). For more information, refer to [External API requirements](#external-api-requirements).
3. In **Polling frequency**, choose how often Cloudflare One should query the external API for information.
4. Select **Test and save**. The test checks if Cloudflare can authenticate to the API URL using the provided Access credentials.

Next, [configure a device posture check](#4-configure-the-posture-check) to determine if a given posture score constitutes a pass or fail.

### 4\. Configure the posture check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks** \> **Service provider checks**.
2. Select **Add a check**.
3. Select the Custom service provider provider.
4. Enter any name for the posture check.
5. Configure the [attributes](#device-posture-attributes) required for the device to pass the posture check.
6. Select **Save**.
7. To test, go to **Insight** \> **Logs** \> **Posture logs** and verify that the service provider posture check is returning the expected results.

You can now use this posture check in a [device posture policy](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/#3-build-a-device-posture-policy).

## Device posture attributes

| Selector | Description                            | Value    |
| -------- | -------------------------------------- | -------- |
| Score    | Posture score returned by external API | 0 to 100 |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/custom/#page","headline":"Custom device posture integration · Cloudflare One docs","description":"Configure custom device posture checks in Cloudflare One using a service-to-service integration.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/custom/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture","REST API","JSON"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/service-providers/","name":"Service providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/service-providers/custom/","name":"Custom device posture integration"}}]}
```
