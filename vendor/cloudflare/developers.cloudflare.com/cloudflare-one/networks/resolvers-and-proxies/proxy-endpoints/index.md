---
title: Proxy endpoints
description: Proxy endpoints in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Proxy endpoints

Note

[Source IP proxy endpoints](#source-ip-endpoint) are only available on Enterprise plans.

Proxy endpoints allow you to apply Gateway policies without installing a client on your devices. By configuring a [Proxy Auto-Configuration (PAC) file](#what-is-a-pac-file) at the browser level, you can route traffic through Gateway for filtering and policy enforcement. Cloudflare supports configuring two types of proxy endpoints: identity-based [authorization endpoints](#authorization-endpoint) and [source IP proxy endpoints](#source-ip-endpoint).

Note

For the best experience and deepest visibility, Cloudflare recommends using the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/). Use proxy endpoints when installing a device client is not feasible for your environment.

### When to use proxy endpoints

Proxy endpoints are designed for environments where deploying the Cloudflare One Client is not an option. Common use cases include:

* **Virtual desktops (VDI)**: Users log into a virtual machine and use a browser to reach the Internet.
* **Compliance-restricted endpoints**: Environments where you are legally or technically prohibited from installing software on the endpoint.
* **Legacy SWG migration**: Organizations transitioning from legacy Secure Web Gateways that use PAC files.

### Logging

Traffic sent through proxy endpoints generates [Zero Trust Network Session Logs](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/zero%5Ftrust%5Fnetwork%5Fsessions/), which are available via [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/) and [Log Explorer](https://developers.cloudflare.com/log-explorer/).

### What is a PAC file

A PAC file is a file containing a JavaScript function which can instruct a browser to forward traffic to a proxy server instead of directly to the destination server.

When end users visit a website, their browser sends the request to a Cloudflare proxy server associated with your account to be filtered by Gateway. PAC files are evaluated by the browser for every request, determining whether traffic should go through the proxy or connect directly. Note that Gateway [cannot filter every type of HTTP traffic](#traffic-limitations) proxied using PAC files.

PAC files offer several advantages:

* **Centralized management**: Update routing rules in one location without reconfiguring individual devices
* **Flexible routing**: Route different traffic types to different proxies or direct connections based on domain, IP range, or protocol
* **Load balancing**: Distribute traffic across multiple proxy servers with automatic failover

Note

PAC files require user interaction. Authorization endpoints require users to log in through [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/). PAC files do not currently support username/password, mTLS, or Kerberos authorization. Support for additional authentication methods is planned for future releases.

### Types of proxy endpoints

Cloudflare One offers two types of proxy endpoints, each with different authorization methods.

Once you create a proxy endpoint, you cannot change its type. If you need a different authorization method, you must create a new proxy endpoint.

#### Authorization endpoint

Authorization endpoints use [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to provide Zero Trust authorization. Users must authenticate through an identity provider and pass Access policies before they can use the proxy endpoint.

Use authorization endpoints when:

* You need user-level authentication and identity-based policies
* You want to associate specific users with their proxy traffic
* Your organization requires login through identity providers (such as Okta, Microsoft Entra ID, or Google Workspace)
* You need granular control over who can access the proxy

#### Source IP endpoint

Source IP endpoints authorize traffic based on the originating IP address. Only traffic from pre-configured IP addresses can use the proxy endpoint.

Use source IP endpoints when:

* You have a fixed set of office or network locations
* You want simpler setup without user authentication
* Your devices share a common egress IP address
* You do not need to identify individual users

## 1\. Create a proxy endpoint

Warning

All devices you add to the proxy endpoint can access your Cloudflare Tunnel applications and services. If you only want to proxy web traffic, [create a Network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/common-policies/#restrict-private-network-access-to-proxy-endpoint-users) that restricts proxy endpoint traffic from connecting to your internal resources.

* [ Dashboard ](#tab-panel-7386)
* [ API ](#tab-panel-7387)

Authorization endpoint

To add an [authorization endpoint](#authorization-endpoint):

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Networks** \> **Resolvers & Proxies**, then go to **Proxy endpoints**.
2. In **Proxy endpoints**, select **Add an endpoint**.
3. Choose **Add an authorization endpoint**.
4. Name your endpoint.
5. Add [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to control who can access your applications. You can select existing policies or create new policies.
6. Choose which login methods to support. To accept all login methods, turn on **Accept all available identity providers**.
7. (Optional) If only one identity provider is configured, turn on **Apply instant authentication** to skip identity provider selection when your users reach the proxy endpoint.
8. Select **Create**.

Source IP endpoint

To add a [source IP endpoint](#source-ip-endpoint):

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Networks** \> **Resolvers & Proxies**, then go to **Proxy endpoints**.
2. In **Proxy endpoints**, select **Add an endpoint**.
3. Choose **Add a source IP endpoint**.
4. Name your endpoint.
5. Add the source IP addresses of your devices in CIDR notation. For example:  
   * **IPv4**: `192.0.2.0/8`  
   * **IPv6**: `2001:0db8:0000:0000:0000:1234:5678:0000/32`
6. Select **Save endpoint**.

Authorization endpoint

To create an authorization endpoint:

1. Use [Create a Proxy Endpoint](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/proxy%5Fendpoints/methods/create/) with the following call:  
Create a proxy endpoint  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "kind": "identity",  
    "name": "any_name"  
  }'  
```
2. The response returns output similar to the following:  
```  
{  
  "result": {  
    "kind": "identity",  
    "id": "d969d7bf-ec28-4291-9af0-86825f472c21",  
    "name": "Identity Proxy Endpoint",  
    "created_at": "2014-01-01T05:20:00.12345Z",  
    "updated_at": "2014-01-01T05:20:00.12345Z",  
    "subdomain": "3ele0ss56t"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```  
Note the `subdomain` value returned by the API. You will use this to create the Access application.
3. Use [Add An Access Application](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/applications/methods/create/) to associate the proxy endpoint with Access policies:  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `Access: Apps and Policies Write`  
Add an Access application  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "domain": "<SUBDOMAIN>.proxy.cloudflare-gateway.com",  
    "name": "Proxy Endpoint App",  
    "session_duration": "12h",  
    "type": "proxy_endpoint",  
    "policies": [  
        {  
            "id": "<ACCESS_POLICY_ID>"  
        }  
    ]  
  }'  
```  
Replace `<SUBDOMAIN>` with the subdomain from step 2 and `<ACCESS_POLICY_ID>` with the ID of an existing [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

Source IP endpoint

To create a source IP endpoint:

1. Use [Create A Proxy Endpoint](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/proxy%5Fendpoints/methods/create/) with the following call:  
Create a proxy endpoint  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "name": "any_name",  
    "ips": [  
        "<PUBLIC_IP>",  
        "<PUBLIC_IP2>",  
        "<PUBLIC_IP3>"  
    ]  
  }'  
```  
Replace `<PUBLIC_IP>` with the source IP address of your device in CIDR notation. For example:  
   * **IPv4**: `192.0.2.0/8`  
   * **IPv6**: `2001:0db8:0000:0000:0000:1234:5678:0000/32`  
Note  
Gateway limits the prefix length of source networks for proxy endpoints to `/8` for IPv4 networks and `/32` for IPv6 networks.
2. The response returns output similar to the following:  
```  
{  
  "result": {  
    "id": "d969d7bf-ec28-4291-9af0-86825f472c21",  
    "name": "test",  
    "created_at": "2022-03-02T10:57:18.094789Z",  
    "updated_at": "2022-03-02T10:57:18.094789Z",  
    "ips": ["90.90.241.229/8"],  
    "subdomain": "3ele0ss56t"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```  
Note the `subdomain` value returned by the API. Your Cloudflare proxy server domain is of the form:  
```  
<SUBDOMAIN>.proxy.cloudflare-gateway.com  
```  
In the example above, the subdomain is `3ele0ss56t` and the proxy server domain is `3ele0ss56t.proxy.cloudflare-gateway.com`.

## 2\. Create a PAC file

A PAC file is a text file written in JavaScript that specifies which traffic should redirect to the proxy server. You can create a PAC file in the Cloudflare dashboard or write your own custom PAC file.

Tip

For detailed instructions and examples for creating a PAC file, refer to [PAC file best practices](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/best-practices/).

### Create a hosted PAC file

When you create a PAC file in Cloudflare One, Cloudflare will host it in a publicly accessible Worker. Hosted PAC files are automatically distributed through Cloudflare's global network.

To create a hosted PAC file:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Networks** \> **Resolvers & Proxies**.
2. Select **Proxy endpoints**.
3. [Create a proxy endpoint](#1-create-a-proxy-endpoint) or select an existing one, then select **Edit**.
4. Select **Add PAC files**.
5. Configure your PAC file:  
In **PAC file details**:  
   1. Enter the **Basic Information**, including a name and optional description.  
   2. (Optional) Customize the **URL slug** to create a memorable URL path. The slug cannot be changed after creation.  
   3. In **PAC file configuration**, select **Browse PAC file configuration templates** and choose a pre-configured template to customize. The available templates are Okta and Azure. After you select a template, **PAC file JavaScript** will populate with the selected template.  
   4. Modify the JavaScript as needed to match your network requirements.  
In **Setup instructions**:  
   1. Choose a browser.  
   2. Follow the instructions in Cloudflare One to configure devices.
6. Select **Create**.

Your hosted PAC file URL will be:

```

https://pac.cloudflare-gateway.com/<account-id>/<slug>


```

Where:

* `<account-id>` is your [Cloudflare account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/)
* `<slug>` is the customizable path you specified (or an auto-generated value if not customized)

#### Hosted PAC file limits

Cloudflare-hosted PAC files have the following limits:

* **Maximum file size**: 256 KB per PAC file
* **Maximum PAC files per account**: 50 (non-Enterprise plans) or 1,000 (Enterprise plans)
* **Update propagation**: Changes to PAC files propagate within seconds to minutes across the global network

#### Caching behavior

Hosted PAC files are cached globally for performance and reliability:

* Browsers and operating systems may cache PAC files locally based on their own policies
* Updates to hosted PAC files automatically invalidate the cache
* If you need to force clients to fetch a new version, you may need to clear browser caches or restart browsers depending on the client configuration

### Self-hosting PAC files

You can also host PAC files on your own infrastructure, such as an internal web server or [Cloudflare Workers](https://developers.cloudflare.com/workers/). Self-hosting gives you complete control over the hosting environment but requires you to manage availability and distribution.

### Proxy endpoint limits

Each account has a maximum number of proxy endpoints:

* **Non-Enterprise plans**: 50 proxy endpoints
* **Enterprise plans**: 500 proxy endpoints

## 3\. Configure your devices

### 3a. Install Cloudflare certificate

To use Gateway HTTP policies with proxy endpoints, you must [install a Cloudflare certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) on your devices. This allows Gateway to inspect HTTPS traffic and apply policies such as blocking specific domains or displaying the Gateway block page.

### 3b. Configure browser to use PAC file

All major browsers support PAC files. You can configure individual browsers, or you can configure system-level proxy settings that apply to all browsers on the device. Multiple devices can call the same PAC file as long as their source IP addresses were included in the proxy endpoint configuration.

For detailed, OS-specific instructions (including Windows, macOS, Linux, iOS, Android, ChromeOS, and enterprise deployment), refer to [Configure a PAC file on your device](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/configure-pac-file-on-device/).

Chromium-based browsers

Chromium-based browsers (such as Google Chrome, Microsoft Edge, and Brave) rely on your operating system's proxy server settings. Configure the PAC file URL in your [operating system proxy settings](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/configure-pac-file-on-device/#configure-system-proxy-settings).

Mozilla Firefox

Firefox uses its own proxy settings and does not inherit the operating system proxy configuration by default. You must configure Firefox separately. For step-by-step instructions, refer to [Configure Firefox separately](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/configure-pac-file-on-device/#configure-firefox-separately).

Safari

Safari relies on your operating system's proxy server settings. Configure the PAC file URL in your [macOS proxy settings](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/configure-pac-file-on-device/#configure-system-proxy-settings).

## 4\. Test your HTTP policy

To test your configuration, create an [HTTP policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) to block a test domain. When you visit the blocked domain in your browser, you should see the Gateway block page.

You can now use the Proxy Endpoint selector in [network](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/#proxy-endpoint) and [HTTP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#proxy-endpoint) policies to filter traffic proxied via PAC files.

## 5\. (Optional) Configure firewall

You may need to configure your organization's firewall to allow your users to connect to a proxy endpoint. Depending on your firewall, you will need to create a rule using either your proxy endpoint's domain or IP addresses.

To get the domain of a proxy endpoint:

* [ Dashboard ](#tab-panel-7384)
* [ API ](#tab-panel-7385)

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Networks** \> **Resolvers & Proxies** \> **Proxy endpoints**.
2. Choose the proxy endpoint. Select **Edit**.
3. In **Proxy Endpoint**, copy the domain.

1. Use the [List proxy endpoints](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/proxy%5Fendpoints/methods/list/) operation to get a list of your proxy endpoints and their details. For example:  
List proxy endpoints  
```  
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```  
```  
{  
  "success": true,  
  "result": {  
    "id": "ed35569b41ce4d1facfe683550f54086",  
    "created_at": "2014-01-01T05:20:00.12345Z",  
    "ips": ["192.0.2.1/32"],  
    "name": "DevOps team",  
    "subdomain": "oli3n9zkz5.proxy.cloudflare-gateway.com",  
    "updated_at": "2014-01-01T05:20:00.12345Z"  
  }  
}  
```
2. Find the proxy endpoint you want to use.
3. Copy the value of the `subdomain` key.

Using your proxy endpoint's domain, you can get the IP addresses assigned to the proxy endpoint:

* [ macOS and Linux ](#tab-panel-7382)
* [ Windows ](#tab-panel-7383)

1. Open a terminal.
2. Run `dig` on your proxy endpoint's A records to get its IPv4 addresses. For example:  
Terminal window  
```  
dig A example.cloudflare-gateway.com +short  
```  
```  
162.159.36.5  
162.159.36.20  
```
3. Run `dig` on your proxy endpoint's AAAA records to get its IPv6 addresses. For example:  
Terminal window  
```  
dig AAAA example.cloudflare-gateway.com +short  
```  
```  
2606:4700:54::a29f:2407  
2606:4700:5c::a29f:2e07  
```

1. Open a PowerShell terminal.
2. Run `Resolve-DnsName` on your proxy endpoint's A records. Your proxy endpoint's IPv4 addresses will appear under `IPAddress`. For example:  
PowerShell  
```  
Resolve-DnsName -Name example.cloudflare-gateway.com -Type A  
```  
```  
Name                                           Type   TTL   Section    IPAddress  
----                                           ----   ---   -------    ---------  
example.cloudflare-gateway.com                 A      300   Answer     162.159.36.5  
example.cloudflare-gateway.com                 A      300   Answer     162.159.36.20  
```
3. Run `Resolve-DnsName` on your proxy endpoint's AAAA records. Your proxy endpoint's IPv6 addresses will appear under `IPAddress`. For example:  
PowerShell  
```  
Resolve-DnsName -Name example.cloudflare-gateway.com -Type AAAA  
```  
```  
Name                                           Type   TTL   Section    IPAddress  
----                                           ----   ---   -------    ---------  
example.cloudflare-gateway.com                 AAAA   300   Answer     2606:4700:5c::a29f:2e07  
example.cloudflare-gateway.com                 AAAA   300   Answer     2606:4700:54::a29f:2407  
```

To ensure responses are allowed through your firewall, add an inbound rule to allow the static IPv4 address for Cloudflare proxy endpoints, `162.159.193.21`.

## Edit proxy endpoints

You can modify proxy endpoint settings after creation.

### Edit authorization endpoint

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Networks** \> **Resolvers & Proxies** \> **Proxy endpoints**.
2. Locate your authorization endpoint (indicated by **Authorization** under **Type**).
3. Select the three dots, then select **Configure**.
4. Choose what to edit:  
   * **Basic info**: Update the endpoint name and description.  
   * **Access policies**: Add, remove, or modify Access policies that control who can use the endpoint.  
   * **Login methods**: Select which [identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) users can authenticate with.
5. Select **Save**.

### Edit source IP endpoint

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Networks** \> **Resolvers & Proxies** \> **Proxy endpoints**.
2. Locate your source IP endpoint (indicated by **Source IP** under **Type**).
3. Select the three dots, then select **Configure**.
4. Update the endpoint name or modify the allowed source IP addresses.
5. Select **Save**.

## Logs

Proxy endpoint traffic is logged in the following locations:

* **Authentication logs**: When users authenticate through an authorization endpoint, login events appear in your [Access logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/).
* **Traffic logs**: HTTP and network traffic proxied through the endpoint appears in [Gateway logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/), with the specific proxy endpoint indicated.

## Billing

Each user who authenticates through an authorization proxy endpoint occupies a [Gateway seat](https://developers.cloudflare.com/cloudflare-one/team-and-resources/users/seat-management/), the same as a user connected through the Cloudflare One Client.

## Limitations

### Authorization endpoint limitations

When using [authorization endpoints](#authorization-endpoint), be aware of the following limitations. For configuration guidance on apps with certificate pinning, refer to [PAC file best practices](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/best-practices/#apps-with-certificate-pinning).

#### Plaintext HTTP traffic

Authorization endpoints do not support plaintext HTTP traffic unless the traffic is configured through an [Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) or bypassed with the PAC file.

#### Browser Isolation

Gateway [HTTP Isolate policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#isolate) are not supported with authorization endpoints.

#### Referer header traffic

Traffic with a referer HTTP header matching the domain of a recently logged in user from the same source IP will be allowed through and logged with the following non-identity email address:

```

auth-proxy-non-identity@<your-team-name>.cloudflareaccess.com


```

Where `<your-team-name>` is your [team name](https://developers.cloudflare.com/cloudflare-one/faq/getting-started-faq/#what-is-a-team-domainteam-name).

This occurs because browsers do not tag HTTP sub-requests with the identity cookie used to verify user authentication. This is an industry-standard behavior for proxy-based Secure Web Gateways.

To filter this traffic, you have two options:

* Set up an [HTTP policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) to block or allow all traffic matching the `auth-proxy-non-identity@<your-team-name>.cloudflareaccess.com` email address.
* To restrict non-identity traffic to specific source IPs, create a [network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) that matches both the source IP and the proxy endpoint.

### Traffic limitations

Each type of proxy endpoint supports the following features:

| Feature                                                                                                              | Source IP endpoint       | Authorization endpoint   |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------------------------ |
| **HTTP/HTTPS traffic**                                                                                               | ✅[1](#user-content-fn-1) | ✅[2](#user-content-fn-2) |
| **Non-HTTP TCP traffic**                                                                                             | ✅                        | —                        |
| **UDP traffic**                                                                                                      | —                        | —                        |
| **[HTTP3](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/http3/)**                  | —                        | —                        |
| **[Identity-based policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/)** | —                        | ✅                        |
| **mTLS authentication**                                                                                              | —                        | —                        |
| **[Happy Eyeballs ↗](https://datatracker.ietf.org/doc/html/rfc6555)**                                                | —                        | —                        |
| **Browser HTTPS auto-upgrade**                                                                                       | —[3](#user-content-fn-3) | —[3](#user-content-fn-3) |

### Session duration

All connections proxied through Cloudflare Gateway have a maximum guaranteed duration of 10 hours. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/cloudflare-one/access-controls/troubleshooting/#long-lived-ssh-sessions-disconnect).

### Gateway DNS and resolver policies

Gateway [DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) and [resolver](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) policies will always apply to traffic proxied with PAC files, regardless of device configuration.

## Footnotes

1. For [source IP endpoints](#source-ip-endpoint), to access plaintext HTTP (non-HTTPS) origins, configure them as [self-hosted Access applications](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/). This allows users to access HTTP resources while maintaining security through Access policies. [↩](#user-content-fnref-1)
2. To access plaintext HTTP (non-HTTPS) origins with [authorization endpoints](#authorization-endpoint), refer to [Plaintext HTTP traffic](#plaintext-http-traffic). [↩](#user-content-fnref-2)
3. Proxy endpoints do not support HTTPS when browsers automatically upgrade HTTP requests to HTTPS (such as Chrome's automatic HTTPS upgrades). If you encounter connection issues with sites that are being auto-upgraded, you may need to disable automatic HTTPS upgrades in your browser settings or configure the site as an exception. [↩](#user-content-fnref-3) [↩2](#user-content-fnref-3-2)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/#page","headline":"Proxy endpoints · Cloudflare One docs","description":"Proxy endpoints in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/resolvers-and-proxies/","name":"Resolvers and proxies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/","name":"Proxy endpoints"}}]}
```
