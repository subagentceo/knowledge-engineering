---
title: Botnet Threat Feed
description: Receive threat intelligence about DDoS botnets targeting your network infrastructure.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Botnet Threat Feed

The Cloudflare DDoS Botnet Threat Feed is a threat intelligence feed for service providers (SPs) such as hosting providers and Internet service providers (ISPs) that provides information about their own IP addresses that have participated in HTTP DDoS attacks as observed from Cloudflare's global network. The feed aims to help service providers stop the abuse and reduce DDoS attacks originating from within their networks.

Each offense is a mitigated HTTP request from the specific IP address. For example, if an IP has 3,000 offenses, it means that Cloudflare has mitigated 3,000 HTTP requests from that IP.

A service provider can only get information about IP addresses associated with their autonomous system numbers (ASNs). The affiliation of a service provider with their ASNs will be checked against [PeeringDB ↗](https://www.peeringdb.com/), a reliable and globally recognized interconnection database.

To ensure the feed's accuracy, Cloudflare will only include IP addresses that have participated in multiple HTTP DDoS attacks and have triggered high-confidence rules.

## Context

A single DDoS attack consisting of thousands of bots can involve as little as one single IP per service provider. Service providers usually only see a small fraction of the attack traffic leaving their network, and it can be hard to correlate it to malicious activity, while trying to identify abusers.

In the case of HTTPS DDoS attacks, service providers only see encrypted payloads leaving their network without any possibility to decrypt or understand if it is malicious or legitimate traffic. However, Cloudflare can see an entire attack and all of its sources if the attack targets an Internet property that uses Cloudflare's services. This global view can help service providers stop the abusers.

For more details, refer to [How DDoS protection works](https://developers.cloudflare.com/ddos-protection/about/how-ddos-protection-works/).

## Availability

The Cloudflare DDoS Botnet Threat Feed is available for free to service providers. For more information, refer to the [Terms of Use ↗](https://www.cloudflare.com/en-gb/service-specific-terms-application-services/#ddos-botnet-threat-feed).

---

## Before you begin

Make sure that:

* You have [created a Cloudflare account](https://developers.cloudflare.com/fundamentals/account/).

## Get started

### 1\. Authenticate your ASN via PeeringDB

1. In the Cloudflare dashboard, go to your account settings page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Select **DDoS Threat Feed ASNs**.
3. On the list of ASNs configured for your threat feed, select **Add ASN**.
4. You will be redirected to the PeeringDB authentication page, where you can log in and consent to share the affiliation data with us. You will be redirected back to the configuration page once it is successful.

Note

You can add multiple ASNs to your threat feed.

### 2\. Obtain Cloudflare API token

You must [obtain a Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with at least the following account-level permission:

* _DDoS Botnet Feed_ \> _Read_

### 3\. Call Botnet Threat Feed API

Invoke one of the Botnet Threat Feed API endpoints:

* [Get full report](#get-full-report)
* [Get day report](#get-day-report)

---

## Available API endpoints

Important notes

* The API URI path is planned to change from `.../botnet_feed/...` to `.../ddos_botnet_feed/...` in the future.
* Responses with no IP addresses in the results (empty state) will return an `HTTP 200` status code (success), with an empty list in the `result` property.
* When the response is a success but the result is `0` or `null`, this means that there are no detected offenses.

To invoke an API endpoint, append the operation endpoint to the Cloudflare API base URL:

```

https://api.cloudflare.com/client/v4


```

### Get full report

Retrieves all the data in the botnet tracking database for a given ASN (currently two weeks worth of data).

* HTTP verb: `GET`
* Operation endpoint: `/accounts/{account_id}/botnet_feed/asn/{asn}/full_report`

The provided `{asn}` must be affiliated with your account.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DDoS Botnet Feed Write`
* `DDoS Botnet Feed Read`

Get full report

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/botnet_feed/asn/$ASN_ID/full_report" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": [

    {

      "cidr": "127.0.0.1/32",

      "date": "1970-01-01T00:00:00Z",

      "offense_count": 10000

    },

    // ... other entries ...

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

### Get day report

Retrieves all the data the botnet tracking database has for a given ASN on a given date. This operation currently allows dates greater than two weeks prior, but in this case it will return an empty dataset (the database currently stores two-weeks worth of data).

* HTTP verb: `GET`
* Operation endpoint: `/accounts/{account_id}/botnet_feed/asn/{asn}/day_report?date={date}`

The provided `{asn}` must be affiliated with your account.

`{date}` must be an ISO 8601-formatted date: `YYYY-MM-DD`. If no date is specified, the API responds with the data from the day before.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DDoS Botnet Feed Write`
* `DDoS Botnet Feed Read`

Get daily report

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/botnet_feed/asn/$ASN_ID/day_report" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

```

{

  "result": [

    {

      "cidr": "127.0.0.1/32",

      "date": "2024-05-05T00:00:00Z",

      "offense_count": 10000

    },

    // ... other entries ...

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/botnet-threat-feed/#page","headline":"DDoS Botnet Threat Feed for service providers · Cloudflare DDoS Protection docs","description":"Receive threat intelligence about DDoS botnets targeting your network infrastructure.","url":"https://developers.cloudflare.com/ddos-protection/botnet-threat-feed/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/botnet-threat-feed/","name":"Botnet Threat Feed"}}]}
```
