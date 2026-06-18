---
title: DNS over HTTPS (DoH)
description: DNS over HTTPS (DoH) in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNS over HTTPS (DoH)

With Cloudflare Gateway, you can filter DNS over HTTPS (DoH) requests by [DNS location](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/) or by user without needing to install the Cloudflare One Client on your devices.

Location-based policies require that you send DNS requests to a [location-specific DoH endpoint](#filter-doh-requests-by-location), while identity-based policies require that requests include a [user-specific DoH token](#filter-doh-requests-by-user).

## Filter DoH requests by location

Location-based policies require that you send DNS queries to a unique DoH endpoint assigned to the location:

```

https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query


```

### Prerequisites

Obtain your location's DoH subdomain.

### Configure browser for DoH

Browsers can be configured to use any DNS over HTTPS (DoH) endpoint. If you choose to configure DoH directly in your browser, you must choose a Gateway DNS location as your DoH endpoint, otherwise DNS filtering will not occur in that browser.

Mozilla Firefox

1. In Firefox, go to **Settings**.
2. In **Privacy & Security**, go to **DNS over HTTPS**.
3. Under **Enable secure DNS using**, select _Max Protection_.
4. In **Choose provider**, choose _Custom_.
5. In the field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

Firefox is now configured to use your DoH endpoint. For more information on configuring DoH settings in Firefox, refer to [Mozilla's documentation ↗](https://support.mozilla.org/kb/dns-over-https).

Note

If you want to enforce DNS policies through the Cloudflare One Client instead of over DoH, you can disable DoH for your organization by blocking the [Firefox DoH canary domain ↗](https://support.mozilla.org/kb/canary-domain-use-application-dnsnet).

Google Chrome

1. In Chrome, go to **Settings** \> **Privacy and security** \> **Security**.
2. Scroll down and turn on **Use secure DNS**.
3. Select **With Custom**.
4. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

Read more about [enabling DNS over HTTPS ↗](https://www.chromium.org/developers/dns-over-https) on Chrome.

Microsoft Edge

1. In Microsoft Edge, go to **Settings**.
2. Select **Privacy, Search, and Services**, and scroll down to **Security**.
3. Turn on **Use secure DNS**.
4. Select **Choose a service provider**.
5. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

Brave

1. In Brave, go to **Settings** \> **Security and Privacy** \> **Security**.
2. Turn on **Use secure DNS**.
3. Select **With Custom**.
4. In the **Enter custom provider** field, enter `https://<YOUR_DOH_SUBDOMAIN>.cloudflare-gateway.com/dns-query`.

Safari

Currently, Safari does not support DNS over HTTPS.

Your DNS queries will now be sent to Gateway for filtering. To filter these requests, build a DNS policy using the [**DNS Location**](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/) selector.

### Configure operating system for DoH

Windows 11

1. Obtain the `A` and `AAAA` record values associated with your location's DoH endpoint.  
   1. Run the following command to obtain your `A` record values:  
PowerShell  
```  
nslookup -type=A <your-subdomain>.cloudflare-gateway.com  
```  
   1. Obtain your `AAAA` record values.  
PowerShell  
```  
nslookup -type=AAAA <your-subdomain>.cloudflare-gateway.com  
```  
   1. Copy the resulting IP addresses.
2. Add the addresses to your list of known DoH servers.  
   1. Run the following command for each address:  
PowerShell  
```  
Add-DnsClientDohServerAddress -ServerAddress <IP-address> -DohTemplate https://<your-subdomain>.cloudflare-gateway.com/dns-query -AllowFallbackToUdp $False -AutoUpgrade $False  
```  
   1. Confirm the addresses were added.  
PowerShell  
```  
Get-DnsClientDohServerAddress  
```
3. In Windows, go to **Settings** \> **Network & internet** \> your active Internet connection. This option may be either **Ethernet** or **Wi-Fi**.
4. Under **DNS server assignment**, select **Edit**.
5. In the drop-down menu, choose _Manual_.
6. Enable **IPv4**.
7. In **Preferred DNS** and **Alternate DNS**, enter the IPv4 addresses from your `A` record command. Set **DNS over HTTPS** to _On (automatic template)_.
8. Enable **IPv6**.
9. In **Preferred DNS** and **Alternate DNS**, enter the IPv6 addresses from your `AAAA` record command. Set **DNS over HTTPS** to _On (automatic template)_.

Windows Server 2022

Obtain the `A` and `AAAA` record values associated with your location's DoH endpoint.

1. Run the following command to obtain your `A` record values:

PowerShell

```

nslookup -type=A <your-subdomain>.cloudflare-gateway.com


```

1. Obtain your `AAAA` record values.

PowerShell

```

nslookup -type=AAAA <your-subdomain>.cloudflare-gateway.com


```

1. Copy the resulting IP addresses.
2. [Add the addresses ↗](https://learn.microsoft.com/en-us/windows-server/networking/dns/doh-client-support#add-a-new-doh-server-to-the-list-of-known-servers) to your list of known DoH servers.
3. [Configure the Windows Server client ↗](https://learn.microsoft.com/en-us/windows-server/networking/dns/doh-client-support#configure-the-dns-client-to-support-doh) or [set up a Group Policy ↗](https://learn.microsoft.com/en-us/windows-server/networking/dns/doh-client-support#configuring-doh-through-group-policy) to use DoH.

For more information, refer to [Microsoft's DoH guide ↗](https://learn.microsoft.com/en-us/windows-server/networking/dns/doh-client-support) for Windows Server 2022 and newer.

### Use generic DoH endpoint

You can send DoH requests to the generic Cloudflare DoH endpoint, `dns.cloudflare-gateway.com`. To specify a location in your request, include a header named `cf-dns-location` with a value of your location's DoH subdomain. For example:

```

GET /dns-query?name=example.com&type=A HTTP/2

Host: dns.cloudflare-gateway.com

cf-dns-location: 9y65g5srsm

Accept: application/dns-message


```

## Filter DoH requests by user

In order to filter DoH queries based on user identity, each query must include a user-specific authentication token. If you have several devices per user and want to apply device-specific policies, you will need to map each device to a different email.

Currently, authentication tokens can only be generated through the API. You can run this [interactive Python script](https://developers.cloudflare.com/cloudflare-one/static/authenticated-doh.py) which automates the setup procedure, or follow the steps described below.

### 1\. Create a service token for the account

Each Cloudflare account can only have one active Access [service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) authorized for DNS over HTTPS (DoH) at a time.

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/service_tokens" \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{"name":"ACME Corporation service token"}'


```

Save the service token's `client_id`, `client_secret`, and `id`.

Example response

```

{

  "result": {

    "client_id": "88bf3b6d86161464f6509f7219099e57.access",

    "client_secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5",

    "created_at": "2022-06-09T01:59:17Z",

    "expires_at": "2023-06-09T01:59:17Z",

    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",

    "name": "ACME Corporation service token",

    "updated_at": "2022-06-09T01:59:17Z"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

### 2\. Enable DoH functionality for the service token

Terminal window

```

curl --request PUT \

"https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/organizations/doh/$SERVICE_TOKEN_ID" \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

If you get an `access.api.error.service_token_not_found` error, check that `$SERVICE_TOKEN_ID` is the value of `id` and not `client_id`.

Note

Although you can create multiple valid service tokens, only one service token can be designated for issuing DoH tokens. Calling the API to enable DoH on a new service token replaces the previously active service token. If a new token overrides an active service token, the API call will fail.

Example response

```

{

  "result": {

    "client_id": "88bf3b6d86161464f6509f7219099e57.access",

    "created_at": "2022-06-09T01:59:17Z",

    "expires_at": "2023-06-09T01:59:17Z",

    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",

    "name": "ACME Corporation service token",

    "updated_at": "2022-06-09T01:59:17Z",

    "duration": "8760h"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

### 3\. Create a user

Create a new user and optionally add them to a group.

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/users" \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

  "name": "John Doe",

  "email": "jdoe@acme.com",

  "custom": {"groups":[{"id": "02fk6b3p3majl10", "email": "finance@acme.com", "name": "Finance"}]}

}'


```

Save the user's `id` returned in the response.

Example response

```

{

  "result": {

    "id": "54d425de-7a78-4186-9975-d43c88ee7899",

    "created_at": "2022-03-16T21:18:39.93598Z",

    "updated_at": "2022-05-17T23:50:39.598345Z",

    "uid": "54d425de-7a78-4186-9975-d43c88ee7899",

    "name": "John Doe",

    "email": "jdoe@acme.com",

    "custom": {

      "groups": [

        {

          "email": "finance@acme.com",

          "id": "02fk6b3p3majl10",

          "name": "Finance"

        }

      ]

    }

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Note

Steps 1-3 above only need to be completed once, while Steps 4-5 below would occur during normal operation.

### 4\. Generate a DoH token for the user

Request a DoH token for the user, using your service token to authenticate into your team domain.

Terminal window

```

curl "https://<TEAM_NAME>.cloudflareaccess.com/cdn-cgi/access/doh-token?account-id=<ACCOUNT_ID>&user-id=<USER_ID>&auth-domain=<TEAM_NAME>.cloudflareaccess.com" \

--header "Cf-Access-Client-Id: <CLIENT_ID>" \

--header "Cf-Access-Client-Secret: <CLIENT_SECRET>"


```

The response contains a unique DoH token associated with the user. This token expires in 24 hours. We recommend setting up a refresh flow for the DoH token instead of generating a new one for every DoH query.

Example response

```

{

  "token": "y2khbGciOiJSUzI1NiIsImtpZCI6ImJlZjVkYjg4ZTEwMjk3ZDEwNzhkMmEyYjE0MjMxZTljYTQwMjQ2NjAwOTQzNmJhOTQwOGJkODY3ZmI4OWFiOGQifQ.eyJ0eXBlIjoiZG9oIiwiYXVkIjoiY2xvdWRmbGFyZS1nYXRld2F5LmNvbSIsImlhdCI6MTY1NDc1MTg3NSwiZXhwIjoxNjU0ODM4Mjc1LCJhY2NvdW50LWlkIjoiMTA4MDM0OGIyZGYzYmQwN2QxZmI1MjM3Y2Q1ZDU5M2EiLCJ1c2VyLWlkIjoiNTRkNDI1ZGUtN2E3OC00MTg2LTk5NzUtZDQzYzg4ZWU3ODk5In0.I5p4WsH2dPhQ8vwy84zF05PsoBHCsUSXAaMpNhEH36oFZ3tXcs9ksLz7OzpZ_x3HxUfO3n57LlpAF1VehaBt2i94XCkvSgtHpYcwd_qZydLp-BGtcyfU1LbdXQC3m6zxKcIWu5VySi8I-J25UYlpyJhYgZ4DQUZIpqbSSt6WcVRKvA7OBa7xjkTux4OcqWAViO_ZS-GLwl-fqhvolmiwk37seBD3YuV1zG06VeWXfrMkZ5MbhooHD1DZDBHOZpTtmN8MbeKeI4tlY1mb_O3-jE-um6F9Hrl4NQm89MKFzsum-_Rywi5m4PTSlDza7fjdJs7RzFgJd3VWgzG-jgyQKw"

}


```

### 5\. Send an authenticated DoH query

Send DoH queries to the resolver at `https://<ACCOUNT_ID>.cloudflare-gateway.com/dns-query`, making sure to include the user's DoH token in the `CF-Authorization` header.

Terminal window

```

curl --silent "https://<ACCOUNT_ID>.cloudflare-gateway.com/dns-query?name=example.com" \

--header "accept: application/dns-json" \

--header "CF-Authorization: <USER_DOH_TOKEN>" | jq


```

If the site is blocked and you have turned on the [block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#configure-policy-block-behavior) for the policy, the query will return `162.159.36.12` (the IP address of the Gateway block page). If the block page is disabled, the response will be `0.0.0.0`.

Example response

```

{

  "Status": 0,

  "TC": false,

  "RD": true,

  "RA": true,

  "AD": false,

  "CD": false,

  "Question": [

    {

      "name": "example.com",

      "type": 1

    }

  ],

  "Answer": [

    {

      "name": "example.com",

      "type": 1,

      "TTL": 60,

      "data": "162.159.36.12"

    }

  ]

}


```

You can verify that the request was associated with the correct user email by checking your [Gateway DNS logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/). To filter these requests, build a DNS policy using any of the Gateway [identity-based selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/dns-over-https/#page","headline":"DNS over HTTPS (DoH) · Cloudflare One docs","description":"DNS over HTTPS (DoH) in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/dns-over-https/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/resolvers-and-proxies/","name":"Resolvers and proxies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/resolvers-and-proxies/dns/","name":"DNS"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/resolvers-and-proxies/dns/dns-over-https/","name":"DNS over HTTPS (DoH)"}}]}
```
