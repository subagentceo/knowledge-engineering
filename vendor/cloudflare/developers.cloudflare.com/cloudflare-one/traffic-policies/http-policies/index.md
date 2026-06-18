---
title: HTTP policies
description: Configure HTTP policies in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# HTTP policies

Note

To use HTTP policies, install a [Cloudflare root certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/) or a [custom certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/custom-certificate/).

HTTP policies allow you to filter all HTTP and HTTPS requests based on URLs, hostnames, HTTP methods, file types, and other request attributes. Unlike [network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) which operate at Layer 4 (TCP/UDP), HTTP policies operate at Layer 7 and can inspect the full content of web traffic.

By default, Gateway inspects HTTP traffic on port `80` and, with [TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/) turned on, HTTPS traffic on port `443`. You can also configure Gateway to [inspect HTTP/HTTPS traffic on all ports](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/protocol-detection/#inspect-on-all-ports). Gateway supports HTTP/3 inspection with the [UDP proxy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/http3/) turned on.

An HTTP policy consists of an **Action** and a logical expression that determines the scope of the policy. To build an expression, choose a **Selector** and an **Operator**, then enter a value or range of values in the **Value** field. You can use **And** and **Or** logical operators to evaluate multiple conditions.

* [Actions](#actions)
* [Selectors](#selectors)
* [Comparison operators](#comparison-operators)
* [Value](#value)
* [Logical operators](#logical-operators)

If a condition in an expression joins a query attribute (such as _Source IP_) and a response attribute (such as _Resolved IP_), then the condition will be evaluated when the response is received.

Terraform provider v4 precedence limitation

To avoid conflicts, version 4 of the Terraform Cloudflare provider applies a hash calculation to policy precedence. For example, a precedence of `1000` may become `1000901`. This can cause errors when reordering policies. To avoid this issue, manually set the precedence of policies created with Terraform using the [Update a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/update/) endpoint.

To ensure your precedence is set correctly, Cloudflare recommends [upgrading your Terraform provider to version 5 ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/guides/version-5-upgrade).

## Actions

Actions in HTTP policies allow you to choose what to do with a given set of elements (domains, IP addresses, file types, and so on). You can assign one action per policy.

### Allow

API value: `allow`

Available selectors

**Traffic**

* [Access Infrastructure Target](#access-infrastructure-target)
* [Access Private App](#access-private-app)
* [Application](#application)
* [Content Categories](#content-categories)
* [Destination Continent IP Geolocation](#destination-continent)
* [Destination Country IP Geolocation](#destination-country)
* [Destination IP](#destination-ip)
* [DLP Profile](#dlp-profile)
* [Domain](#domain)
* [Download File Types](#download-and-upload-file-types)
* [Download Mime Type](#download-and-upload-mime-type)
* [Host](#host)
* [HTTP Method](#http-method)
* [HTTP Response](#http-response)
* [Proxy Endpoint](#proxy-endpoint)
* [Security Categories](#security-risks)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source Internal IP](#source-internal-ip)
* [Source IP](#source-ip)
* [Upload File Types](#download-and-upload-file-types)
* [Upload Mime Type](#download-and-upload-mime-type)
* [URL](#url)
* [URL Path](#url-path)
* [URL Path & Query](#url-path-and-query)
* [URL Query](#url-query)
* [Virtual Network](#virtual-network)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

**Device Posture**

* [Passed Device Posture Checks](#device-posture)

The Allow action allows outbound traffic to reach destinations you specify within the [Selectors](#selectors) and [Value](#value) fields. For example, the following configuration allows traffic to reach all websites we categorize as belonging to the Education content category:

| Selector           | Operator | Value       | Action |
| ------------------ | -------- | ----------- | ------ |
| Content Categories | in       | _Education_ | Allow  |

#### Untrusted certificates

The **Untrusted certificate action** determines how to handle insecure requests.

| Option       | Action                                                                                                                                                                                                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Error        | Display Gateway error page. Matches the default behavior when no action is configured.                                                                                                                                                                                                    |
| Block        | Display [block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/) as set in the Cloudflare dashboard.                                                                                                                           |
| Pass through | Bypass insecure connection warnings and seamlessly connect to the upstream. For more information on what statuses are bypassed, refer to [Troubleshooting Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/troubleshooting/#error-526-invalid-ssl-certificate). |

### Block

API value: `block`

Available selectors

**Traffic**

* [Access Infrastructure Target](#access-infrastructure-target)
* [Access Private App](#access-private-app)
* [Application](#application)
* [Content Categories](#content-categories)
* [Destination Continent IP Geolocation](#destination-continent)
* [Destination Country IP Geolocation](#destination-country)
* [Destination IP](#destination-ip)
* [DLP Profile](#dlp-profile)
* [Domain](#domain)
* [Download File Types](#download-and-upload-file-types)
* [Download Mime Type](#download-and-upload-mime-type)
* [Host](#host)
* [HTTP Method](#http-method)
* [HTTP Response](#http-response)
* [Proxy Endpoint](#proxy-endpoint)
* [Security Categories](#security-risks)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source Internal IP](#source-internal-ip)
* [Source IP](#source-ip)
* [Upload File Types](#download-and-upload-file-types)
* [Upload Mime Type](#download-and-upload-mime-type)
* [URL](#url)
* [URL Path](#url-path)
* [URL Path & Query](#url-path-and-query)
* [URL Query](#url-query)
* [Virtual Network](#virtual-network)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

**Device Posture**

* [Passed Device Posture Checks](#device-posture)

The Block action blocks outbound traffic from reaching destinations you specify within the [Selectors](#selectors) and [Value](#value) fields. For example, the following configuration blocks users from being able to upload any file type to Google Drive:

| Selector         | Operator      | Value        | Logic | Action |
| ---------------- | ------------- | ------------ | ----- | ------ |
| Application      | in            | Google Drive | And   | Block  |
| Upload Mime Type | matches regex | .\*          |       |        |

#### Cloudflare One Client block notifications

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/plans/zero-trust-services/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Traffic and DNS mode Traffic only mode                                                                                             | Enterprise                                                                  |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2024.1.159.0           |
| macOS    | ✅            | 2024.1.160.0           |
| Linux    | ❌            |                        |
| iOS      | ✅            | 1.7                    |
| Android  | ✅            | 1.4                    |
| ChromeOS | ✅            | 1.4                    |

Turn on **Display block notification for Cloudflare One Client** to display notifications for Gateway block events. Blocked users will receive an operating system notification from the Cloudflare One Client with a custom message you set. If you do not set a custom message, the Cloudflare One Client will display a default message. Custom messages must be 100 characters or less. The Cloudflare One Client will only display one notification per minute.

Upon selecting the notification, the Cloudflare One Client will direct your users to the [Gateway block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/) you have configured. Optionally, you can direct users to a custom URL, such as an internal support form.

When you turn on **Send policy context**, Gateway will append details of the matching request to the redirected URL as a query string. Not every context field will be included. Potential policy context fields include:

Policy context fields

| Field                 | Definition                                                                                                                                       | Example                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| User email            | Email of the user that made the query.                                                                                                           | &cf\_user\_email=user@example.com                                    |
| Site URL              | Full URL of the original HTTP request or domain name in DNS query.                                                                               | &cf\_site\_uri=https%3A%2F%2Fmalware.testcategory.com%2F             |
| URL category          | [Domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) of the URL to be redirected.           | &cf\_request\_categories=New%20Domains,Newly%20Seen%20Domains        |
| Original HTTP referer | For HTTP traffic, the original HTTP referer header of the HTTP request.                                                                          | &cf\_referer=https%3A%2F%2Fexample.com%2F                            |
| Rule ID               | ID of the Gateway policy that matched the request.                                                                                               | &cf\_rule\_id=6d48997c-a1ec-4b16-b42e-d43ab4d071d1                   |
| Source IP             | Source IP address of the device that matched the policy.                                                                                         | &cf\_source\_ip=203.0.113.5                                          |
| Device ID             | UUID of the device that matched the policy.                                                                                                      | &cf\_device\_id=6d48997c-a1ec-4b16-b42e-d43ab4d071d1                 |
| Application names     | Name of the application the redirected domain corresponds to, if any.                                                                            | &cf\_application\_name=Salesforce                                    |
| Filter                | The traffic type filter that triggered the block.                                                                                                | &cf\_filter=http, &cf\_filter=dns, &cf\_filter=av, or &cf\_filter=l4 |
| Account ID            | [Cloudflare account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) of the associated Zero Trust account. | &cf\_account\_id=d57c3de47a013c03ca7e237dd3e61d7d                    |
| Query ID              | ID of the DNS query for which the redirect took effect.                                                                                          | &cf\_query\_id=f8dc6fd3-a7a5-44dd-8b77-08430bb4fac3                  |
| Connection ID         | ID of the proxy connection for which the redirect took effect.                                                                                   | &cf\_connection\_id=f8dc6fd3-a7a5-44dd-8b77-08430bb4fac3             |
| Request ID            | ID of the HTTP request for which the redirect took effect.                                                                                       | &cf\_request\_id=f8dc6fd3-a7a5-44dd-8b77-08430bb4fac3                |

Ensure that your operating system allows notifications for the Cloudflare One Client. Your device may not display notifications if focus, do not disturb, or screen sharing settings are turned on. To turn on client notifications on macOS devices running DisplayLink software, you may have to allow system notifications when mirroring your display. For more information, refer to the [macOS documentation ↗](https://support.apple.com/guide/mac-help/change-notifications-settings-mh40583/mac).

### Redirect

API value: `redirect`

Available selectors

**Traffic**

* [Access Infrastructure Target](#access-infrastructure-target)
* [Application](#application)
* [Content Categories](#content-categories)
* [Destination Continent IP Geolocation](#destination-continent)
* [Destination Country IP Geolocation](#destination-country)
* [Destination IP](#destination-ip)
* [Domain](#domain)
* [Host](#host)
* [HTTP Method](#http-method)
* [Proxy Endpoint](#proxy-endpoint)
* [Security Risks](#security-risks)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source Internal IP](#source-internal-ip)
* [Source IP](#source-ip)
* [URL](#url)
* [URL Path](#url-path)
* [URL Path & Query](#url-path-and-query)
* [URL Query](#url-query)
* [Virtual Network](#virtual-network)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

**Device Posture**

* [Passed Device Posture Checks](#device-posture)

The Redirect action allows you to redirect matched HTTP requests to a different URL you specify. For example, if your users browse to the public web page of a SaaS app, you can redirect them to your own self-hosted instance, a single sign-on page, or an internal policy page.

To redirect URLs with a Block action and the block page, refer to [Redirect to a block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#redirect-to-a-block-page).

#### Policy settings

In **Policy URL redirect**, you can define what URL to redirect matched requests to. The redirect URL can contain paths and queries. For example, you can redirect `example.com` to `cloudflare.com/path/to/page?querystring=x`.

When you turn on **Send policy context**, Gateway will append details of the matching request to the redirected URL as a query string. Not every context field will be included. Potential policy context fields include:

Policy context fields

| Field                 | Definition                                                                                                                                       | Example                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| User email            | Email of the user that made the query.                                                                                                           | &cf\_user\_email=user@example.com                                    |
| Site URL              | Full URL of the original HTTP request or domain name in DNS query.                                                                               | &cf\_site\_uri=https%3A%2F%2Fmalware.testcategory.com%2F             |
| URL category          | [Domain categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/) of the URL to be redirected.           | &cf\_request\_categories=New%20Domains,Newly%20Seen%20Domains        |
| Original HTTP referer | For HTTP traffic, the original HTTP referer header of the HTTP request.                                                                          | &cf\_referer=https%3A%2F%2Fexample.com%2F                            |
| Rule ID               | ID of the Gateway policy that matched the request.                                                                                               | &cf\_rule\_id=6d48997c-a1ec-4b16-b42e-d43ab4d071d1                   |
| Source IP             | Source IP address of the device that matched the policy.                                                                                         | &cf\_source\_ip=203.0.113.5                                          |
| Device ID             | UUID of the device that matched the policy.                                                                                                      | &cf\_device\_id=6d48997c-a1ec-4b16-b42e-d43ab4d071d1                 |
| Application names     | Name of the application the redirected domain corresponds to, if any.                                                                            | &cf\_application\_name=Salesforce                                    |
| Filter                | The traffic type filter that triggered the block.                                                                                                | &cf\_filter=http, &cf\_filter=dns, &cf\_filter=av, or &cf\_filter=l4 |
| Account ID            | [Cloudflare account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) of the associated Zero Trust account. | &cf\_account\_id=d57c3de47a013c03ca7e237dd3e61d7d                    |
| Query ID              | ID of the DNS query for which the redirect took effect.                                                                                          | &cf\_query\_id=f8dc6fd3-a7a5-44dd-8b77-08430bb4fac3                  |
| Connection ID         | ID of the proxy connection for which the redirect took effect.                                                                                   | &cf\_connection\_id=f8dc6fd3-a7a5-44dd-8b77-08430bb4fac3             |
| Request ID            | ID of the HTTP request for which the redirect took effect.                                                                                       | &cf\_request\_id=f8dc6fd3-a7a5-44dd-8b77-08430bb4fac3                |

When you turn on **Preserve original path and query string**, Gateway will append the original path and query string to the redirected URL. Paths and queries in the redirect URL take precedence over the original URL. For example, if the original URL is `example.com/path/to/page?querystring=X` and the redirect URL is `cloudflare.com/redirect-path?querystring=Y`, Gateway will redirect requests to:

```

cloudflare.com/redirect-path/path/to/page?querystring=Y


```

When you turn on both options, Gateway will preserve the original path and query string, then append policy context to the end of the redirect URL. For example, if the original URL is `example.com/path/to/page?querystring=X&k=1` and the redirect URL is `cloudflare.com/redirect-path?querystring=Y`, Gateway will redirect requests to:

```

cloudflare.com/redirect-path/path/to/page?querystring=Y&k=1&cf_user_email=user@example.com


```

### Isolate

API value: `isolate`

Available selectors

**Traffic**

* [Application](#application)
* [Content Categories](#content-categories)
* [Domain](#domain)
* [Host](#host)
* [HTTP Method](#http-method)
* [Security Risks](#security-risks)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [URL](#url)
* [URL Path](#url-path)
* [URL Path & Query](#url-path-and-query)
* [URL Query](#url-query)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

**Device Posture**

* [Passed Device Posture Checks](#device-posture)

The Isolate action serves matched traffic to users via [Cloudflare Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/). For more information on this action, refer to [Isolation policies](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/#isolate).

### Do Not Inspect

API value: `off`

Available selectors

**Traffic**

* [Application](#application)
* [Content Categories](#content-categories)
* [Destination Continent IP Geolocation](#destination-continent)
* [Destination Country IP Geolocation](#destination-country)
* [Destination IP](#destination-ip)
* [Domain](#domain)
* [Host](#host)
* [Proxy Endpoint](#proxy-endpoint)
* [Security Risks](#security-risks)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source Internal IP](#source-internal-ip)
* [Source IP](#source-ip)
* [Virtual Network](#virtual-network)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

**Device Posture**

* [Passed Device Posture Checks](#device-posture)

Visibility limitation

When you create a Do Not Inspect policy for a given hostname, application, or app type, you will lose the ability to log or block HTTP requests, apply DLP policies, and perform AV scanning.

Information contained within HTTPS encryption, such as the full requested URL, will not be visible if it bypasses Gateway inspection. However, you can still apply [network policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) to this traffic. For more information, refer to [TLS decryption](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/).

Do Not Inspect lets you bypass certain elements from inspection. To prevent Gateway from decrypting and inspecting HTTPS traffic, your policy must match against the Server Name Indication (SNI) in the TLS header. When accessing a Do Not Inspect site in the browser, your browser may display a **Your connection is not private** warning, which you can proceed through to connect. For more information about applications which may require a Do Not Inspect policy, refer to [TLS decryption limitations](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#inspection-limitations).

Note

All Do Not Inspect policies are evaluated before any Allow or Block policies, regardless of their position in the policy list. For more information, refer to [Order of enforcement](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#http-policies).

### Do Not Isolate

API value: `noisolate`

Available selectors

**Traffic**

* [Application](#application)
* [Content Categories](#content-categories)
* [Domain](#domain)
* [Host](#host)
* [HTTP Method](#http-method)
* [Security Risks](#security-risks)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [URL](#url)
* [URL Path](#url-path)
* [URL Path & Query](#url-path-and-query)
* [URL Query](#url-query)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

**Device Posture**

* [Passed Device Posture Checks](#device-posture)

The Do Not Isolate action turns off browser isolation for matched traffic. For more information on this action, refer to [Isolation policies](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/isolation-policies/#do-not-isolate).

### Do Not Scan

API value: `noscan`

Available selectors

**Traffic**

* [Application](#application)
* [Content Categories](#content-categories)
* [Destination Continent IP Geolocation](#destination-continent)
* [Destination Country IP Geolocation](#destination-country)
* [Destination IP](#destination-ip)
* [Domain](#domain)
* [Host](#host)
* [HTTP Method](#http-method)
* [Proxy Endpoint](#proxy-endpoint)
* [Security Risks](#security-risks)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source Internal IP](#source-internal-ip)
* [Source IP](#source-ip)
* [URL](#url)
* [URL Path](#url-path)
* [URL Path & Query](#url-path-and-query)
* [URL Query](#url-query)
* [Virtual Network](#virtual-network)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

**Device Posture**

* [Passed Device Posture Checks](#device-posture)

When an admin enables AV scanning for uploads and/or downloads, Gateway will scan every supported file. Admins can selectively choose to disable scanning by leveraging the HTTP rules. For example, to prevent AV scanning of files uploaded to or downloaded from `example.com`, an admin would configure the following rule:

| Selector | Operator      | Value          | Action      |
| -------- | ------------- | -------------- | ----------- |
| Hostname | matches regex | .\*example.com | Do Not Scan |

When a Do Not Scan rule matches, nothing is scanned, regardless of file size or whether the file type is supported or not.

### Quarantine

API value: `quarantine`

Available selectors

**Traffic**

* [Application](#application)
* [Content Categories](#content-categories)
* [Destination Continent IP Geolocation](#destination-continent)
* [Destination Country IP Geolocation](#destination-country)
* [Destination IP](#destination-ip)
* [Domain](#domain)
* [Host](#host)
* [HTTP Method](#http-method)
* [Proxy Endpoint](#proxy-endpoint)
* [Security Risks](#security-risks)
* [Source Continent IP Geolocation](#source-continent)
* [Source Country IP Geolocation](#source-country)
* [Source Internal IP](#source-internal-ip)
* [Source IP](#source-ip)
* [URL](#url)
* [URL Path](#url-path)
* [URL Path & Query](#url-path-and-query)
* [URL Query](#url-query)
* [Virtual Network](#virtual-network)

**Identity**

* [SAML Attributes](#users)
* [User Email](#users)
* [User Group Emails](#users)
* [User Group IDs](#users)
* [User Group Names](#users)
* [User Name](#users)

**Device Posture**

* [Passed Device Posture Checks](#device-posture)

The Quarantine action sends files in matching requests to a file sandbox to scan for malware. Gateway will only quarantine files not previously seen in the file sandbox. For more information on this action, refer to [File sandboxing](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/file-sandboxing/).

#### Sandbox file types

In **Sandbox file types**, you can select which file types to quarantine with your policy. You must select at least one file type.

File sandboxing supports scanning the following file types:

Supported sandboxing file types

* `.exe`
* `.pdf`
* `.doc`
* `.docm`
* `.docx`
* `.rtf`
* `.ppt`
* `.pptx`
* `.xls`
* `.xlsm`
* `.xlsx`
* `.zip`
* `.rar`

## Selectors

Note

Policies created using the URL selector are case-sensitive.

Gateway matches HTTP traffic against the following selectors, or criteria:

### Access Infrastructure Target

All [targets](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/#1-add-a-target) secured by an [Access infrastructure application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/infrastructure-apps/).

| UI name                      | API example   |
| ---------------------------- | ------------- |
| Access Infrastructure Target | access.target |

### Access Private App

All destination IPs and hostnames secured by an [Access self-hosted private application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/).

| UI name                                     | API example         |
| ------------------------------------------- | ------------------- |
| Self-hosted Access App with Private Address | access.private\_app |

### Application Approval Status

The review approval status of an application from [Shadow IT Discovery](https://developers.cloudflare.com/cloudflare-one/insights/analytics/shadow-it-discovery/) or the [Application Library](https://developers.cloudflare.com/cloudflare-one/team-and-resources/app-library/). For more information, refer to [Review applications](https://developers.cloudflare.com/cloudflare-one/team-and-resources/app-library/#review-applications).

| UI name            | API example                           |
| ------------------ | ------------------------------------- |
| Application Status | any(app.statuses\[\*\] == "approved") |

### Application

You can apply HTTP policies to a growing list of popular web applications. Refer to [Application and app types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/) for more information.

| UI name     | API example                 |
| ----------- | --------------------------- |
| Application | any(app.ids\[\*\] in {505}) |

Multiple API selectors required for Terraform

When using Terraform to create a policy with the [Do Not Inspect](#do-not-inspect) action, you must use the `app.hosts_ids` and `app.supports_ids` selectors. For example, to create a Do Not Inspect policy for Google Cloud Platform traffic, create a policy with both `any(app.hosts_ids[*] in {1245})` and `any(app.supports_ids[*] in {1245})`.

#### Granular controls

When using the _is_ operator with the _Application_ selector, you can use Application Granular Controls to choose specific actions and operations to match application traffic. For example, you can block file uploads to ChatGPT without blocking all ChatGPT traffic:

| Selector    | Operator | Value     | Controls | Action |
| ----------- | -------- | --------- | -------- | ------ |
| Application | is       | _ChatGPT_ | _Upload_ | Block  |

You can match traffic based on **Application Controls**, which group multiple user actions together, or **Operations**, which allow for granular control of supported API-level actions for an application.

For more information, refer to [Application Granular Controls](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/granular-controls/).

### Body Phase

The phase of an HTTP request. You can use this selector to specify whether to scan either the data sent in an HTTP request to your user's device or from your user's device to a destination. Policies without this selector will scan both the HTTP request and response bodies.

| UI name    | API example                        |
| ---------- | ---------------------------------- |
| Body Phase | http.body\_phase == \\"download\\" |

Body phase mismatch

When combining this selector with the [Download and Upload File Types selectors](#download-and-upload-file-types), ensure you use the matching phase together. For example, use the `download` body phase with the Download File Types selector. If body phase and file type selector logic do not match, the policy may not filter traffic as intended.

### Content Categories

Applications within a specific [security category](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#content-categories) as categorized by [Cloudflare Radar](https://developers.cloudflare.com/radar/glossary/#content-categories).

| UI name            | API example                                          |
| ------------------ | ---------------------------------------------------- |
| Content Categories | any(http.request.uri.content\_category\[\*\] in {1}) |

### Destination Continent

Note

Only applies to traffic sent through the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/set-up/#gateway-with-warp-default).

The continent where the request is destined. Geolocation is determined from the target IP address. To specify a continent, enter its two-letter code into the **Value** field:

| Continent     | Code |
| ------------- | ---- |
| Africa        | AF   |
| Antarctica    | AN   |
| Asia          | AS   |
| Europe        | EU   |
| North America | NA   |
| Oceania       | OC   |
| South America | SA   |
| Tor network   | T1   |

| UI name                              | API example                        |
| ------------------------------------ | ---------------------------------- |
| Destination Continent IP Geolocation | http.dst\_ip.geo.continent == "EU" |

### Destination Country

Note

Only applies to traffic sent through the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/set-up/#gateway-with-warp-default).

The country that the request is destined for. Geolocation is determined from the target IP address. To specify a country, enter its [ISO 3166-1 Alpha 2 code ↗](https://www.iso.org/obp/ui/#search/code/) in the **Value** field.

| UI name                            | API example                      |
| ---------------------------------- | -------------------------------- |
| Destination Country IP Geolocation | http.dst\_ip.geo.country == "RU" |

### Destination IP

Note

Only applies to traffic sent through the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/set-up/#gateway-with-warp-default).

The IP address of the request's target.

| UI name        | API example                                  |
| -------------- | -------------------------------------------- |
| Destination IP | any(http.conn.dst\_ip\[\*\] in {10.0.0.0/8}) |

### Device Posture

With the Device Posture selector, admins can use signals from end-user devices to secure access to their internal and external resources. For example, a security admin can choose to limit all access to internal applications based on whether specific software is installed on a device and/or if the device or software are configured in a particular way.

For more information on device posture checks, refer to [Device posture](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

| UI name                      | API example                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Passed Device Posture Checks | any(device\_posture.checks.failed\[\*\] in {"1308749e-fcfb-4ebc-b051-fe022b632644"}), any(device\_posture.checks.passed\[\*\] in {"1308749e-fcfb-4ebc-b051-fe022b632644"})" |

### Domain

Use this selector to match against a domain and all subdomains. For example, you can match `example.com` and its subdomains, such as `www.example.com`.

| UI name | API example                                      |
| ------- | ------------------------------------------------ |
| Domain  | any(http.request.domains\[\*\] == "example.com") |

Gateway policies do not support domains with non-Latin characters directly. To use a domain with non-Latin characters, add it to a [list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/).

### Download and Upload File Size

Use these selectors to limit the file size of upload or download transactions. File sizes are measured in mebibytes (MiB).

| UI name                  | API example                   |
| ------------------------ | ----------------------------- |
| Download File Size (MiB) | http.download.file.size >= 10 |

| UI name                | API example                |
| ---------------------- | -------------------------- |
| Upload File Size (MiB) | http.upload.file.size < 10 |

### Download and Upload File Types

Deprecated selectors

The _Download File Types_ and _Upload File Types_ selectors supersede the _Download File Type_ and _Upload File Type_ selectors. Gateway will still evaluate policies with the previous selectors. However, Cloudflare recommends migrating any policies with deprecated selectors to the new corresponding selectors.

These selectors will scan file signatures in the HTTP body. You can select from file categories or [specific file types](#supported-file-types), such as executables, archives and compressed files, unscannable files, Microsoft 365/Office documents, and Adobe files.

| UI name             | API example                                          |
| ------------------- | ---------------------------------------------------- |
| Download File Types | any(http.download.file.types\[\*\] in {"docx" "7z"}) |

| UI name           | API example                                         |
| ----------------- | --------------------------------------------------- |
| Upload File Types | any(http.upload.file.types\[\*\] in {"compressed"}) |

#### Supported file types

Gateway supports the following file types for use with the _Download File Types_ and _Upload File Types_ selectors:

Compressed

* 7-Zip archive (`.7z`)
* `bzip2` archive (`.bz2`)
* GNU Gzip archive (`.gz`)
* Microsoft Cabinet file (`.cab`)
* Microsoft Compiled HTML Help file (`.chm`)
* RAR archive (`.rar`)
* `xz` archive (`.xz`)
* ZIP archive (`.zip`)

Documents

* Microsoft Office/365 files  
   * Word document (`.doc`, `.docx`, `.docm`)  
   * Excel spreadsheet (`.xls`, `.xlsx`, `.xlsm`)  
   * PowerPoint presentation (`.ppt`, `.pptx`, `.pptm`)
* PDF document (`.pdf`)

Executable

* Apple Software Package (`.pkg`)
* Dynamic-link library (DLL) file (`.dll`)
* Executable and Linkable Format (ELF) file (`.elf`)
* Java archive (JAR) package (`.jar`)
* Java class file (`.class`)
* Mach object (Mach-O) file (`.macho`)
* Microsoft Windows installer (`.msi`)
* Microsoft Software Installer (`.msix`, `.appx`)
* Microsoft Windows executable (`.exe`)

Image

* Adobe Photoshop document (`.psd`)
* Bitmap image (`.bmp`)
* GIF image (`.gif`)
* Icon file (`.ico`)
* JPEG image (`.jpg`, `.jpeg`)
* PNG image (`.png`)
* WebP image (`.webp`)

Other

* BitTorrent file (`.torrent`)

System

* Apple Disk Image (`.dmg`)

Unscannable

* Password-protected Microsoft Office document
* Password-protected PDF
* Password-protected ZIP archive
* Unscannable ZIP archive

### Download and Upload Mime Type

These selectors depend on the `Content-Type` header being present in the request (for uploads) or response (for downloads). The MIME type value must match the format used in the `Content-Type` header (for example, `image/png`, `application/pdf`).

| UI name            | API example                       |
| ------------------ | --------------------------------- |
| Download Mime Type | http.download.mime == "image/png" |

| UI name          | API example                     |
| ---------------- | ------------------------------- |
| Upload Mime Type | http.upload.mime == "image/png" |

### DLP Profile

Use [Cloudflare Data Loss Prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) to scan HTTP traffic for the presence of sensitive data such as personally identifiable information (PII) or source code. You must configure a [DLP profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/) before you can use this selector in a policy.

| UI name     | API example                                                             |
| ----------- | ----------------------------------------------------------------------- |
| DLP Profile | any(dlp.profiles\[\*\] in {\\"a0cabf16-7491-4c9a-ac02-f64cabc66394\\"}) |

### Host

Use this selector to match against only the hostname specified. For example, you can match `test.example.com` but not `example.com` or `www.test.example.com`.

| UI name | API example                        |
| ------- | ---------------------------------- |
| Host    | http.request.host == "example.com" |

Gateway policies do not support hostnames with non-Latin characters directly. To use a hostname with non-Latin characters, add it to a [list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/).

Note

Some hostnames (`example.com`) will invisibly redirect to the www subdomain (`www.example.com`). To match this type of website, use the [Domain](#domain) selector instead of the Host selector.

### HTTP Method

The HTTP request method used in the traffic.

| UI name     | API example                  |
| ----------- | ---------------------------- |
| HTTP Method | http.request.method == "GET" |

### HTTP Response

The HTTP response status code received by the traffic.

| UI name | API example                         |
| ------- | ----------------------------------- |
| URL     | http.response.status\_code == "200" |

### Proxy Endpoint

The [proxy server](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) where your browser forwards HTTP traffic.

| UI name        | API example                                                 |
| -------------- | ----------------------------------------------------------- |
| Proxy Endpoint | proxy.endpoint == "3ele0ss56t.proxy.cloudflare-gateway.com" |

### Security Risks

Applications within a specific [security category](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#security-categories) as categorized by [Cloudflare Radar](https://developers.cloudflare.com/radar/glossary/#content-categories).

| UI name             | API example                                           |
| ------------------- | ----------------------------------------------------- |
| Security Categories | any(http.request.uri.security\_category\[\*\] in {1}) |

### Source Continent

The continent of the user making the request. 

Geolocation is determined from the device's public IP address (typically assigned by the user's ISP). To specify a continent, enter its two-letter code into the **Value** field:

| Continent     | Code |
| ------------- | ---- |
| Africa        | AF   |
| Antarctica    | AN   |
| Asia          | AS   |
| Europe        | EU   |
| North America | NA   |
| Oceania       | OC   |
| South America | SA   |
| Tor network   | T1   |

| UI name                         | API example                                   |
| ------------------------------- | --------------------------------------------- |
| Source Continent IP Geolocation | http.src\_ip.geo.continent == "North America" |

### Source Country

The country of the user making the request. 

Geolocation is determined from the device's public IP address (typically assigned by the user's ISP). To specify a country, enter its [ISO 3166-1 Alpha-2 code ↗](https://www.iso.org/obp/ui/#search/code/) in the **Value** field.

| UI name                       | API example                      |
| ----------------------------- | -------------------------------- |
| Source Country IP Geolocation | http.src\_ip.geo.country == "RU" |

### Source Internal IP

Use this selector to apply HTTP policies to a private IP address, assigned by a user's local network, that requests arrive to Gateway from.

| UI name            | API example                                      |
| ------------------ | ------------------------------------------------ |
| Source Internal IP | http.conn.internal\_src\_ip == "192.168.86.0/27" |

### Source IP

The originating IP address or addresses of a device proxied by Gateway.

| UI name   | API example                             |
| --------- | --------------------------------------- |
| Source IP | http.conn.src\_ip\[\*\] in {10.0.0.0/8} |

### URL

Gateway ignores trailing forward slashes (`/`) in URLs. For example, `https://example.com` and `https://example.com/` will count as the same URL and may return a duplicate error.

| UI name | API example                          |
| ------- | ------------------------------------ |
| URL     | http.request.uri matches "/r/gaming" |

### URL Path

The pathname of a webpage's URL.

| UI name  | API example                             |
| -------- | --------------------------------------- |
| URL Path | http.request.uri.path == \\"/foo/bar\\" |

### URL Path and Query

The pathname and query of a webpage's URL.

| UI name            | API example                                                       |
| ------------------ | ----------------------------------------------------------------- |
| URL Path and Query | http.request.uri.path\_and\_query == \\"/foo/bar?ab%242=%2A342\\" |

### URL Query

The query of a webpage's URL.

| UI name   | API example                               |
| --------- | ----------------------------------------- |
| URL Query | http.request.uri.query == "ab%242=%2A342" |

### Users

Use these selectors to match against identity attributes.

| UI name           | API example                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| User Email        | identity.email == "user@example.com"                                                                            |
| User Name         | identity.name == "Test User"                                                                                    |
| User Group IDs    | any(identity.groups\[\*\].id in {"group\_id"})                                                                  |
| User Group Names  | any(identity.groups\[\*\].name in {"group\_name"})                                                              |
| User Group Emails | any(identity.groups\[\*\].email in {"group@example.com"})                                                       |
| SAML Attributes   | any(identity.saml\_attributes\["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"\] in {"Test User"}) |

### Virtual Network

Use this selector to match all traffic routed through a specific [Virtual Network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/) via the Cloudflare One Client.

| UI name         | API example                                                  |
| --------------- | ------------------------------------------------------------ |
| Virtual Network | http.conn.vnet\_id == "957fc748-591a-e96s-a15d-1j90204a7923" |

## Comparison operators

Comparison operators are the way Gateway matches traffic to a selector. When you choose a **Selector** in the dashboard policy builder, the **Operator** dropdown menu will display the available options for that selector.

| Operator                 | Meaning                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| is                       | equals the defined value                                                                                           |
| is not                   | does not equal the defined value                                                                                   |
| in                       | matches at least one of the defined values                                                                         |
| not in                   | does not match any of the defined values                                                                           |
| in list                  | in a pre-defined [list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) of values     |
| not in list              | not in a pre-defined [list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) of values |
| matches regex            | regex evaluates to true                                                                                            |
| does not match regex     | regex evaluates to false                                                                                           |
| greater than             | exceeds the defined number                                                                                         |
| greater than or equal to | exceeds or equals the defined number                                                                               |
| less than                | below the defined number                                                                                           |
| less than or equal to    | below or equals the defined number                                                                                 |

## Value

In the **Value** field, you can input a single value when using an equality comparison operator (such as _is_) or multiple values when using a containment comparison operator (such as _in_). Additionally, you can use [regular expressions](#regular-expressions) (or regex) to specify a range of values for supported selectors.

### Regular expressions

Regular expressions are evaluated using Rust. The Rust implementation is slightly different than regex libraries used elsewhere. For more information, refer to our guide for [Wildcards](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/app-paths/#wildcards). To evaluate if your regex matches, you can use [Rustexp ↗](https://rustexp.lpil.uk/).

If you want to match multiple values, you can use the pipe symbol (`|`) as an OR operator. You do not need to use an escape character (`\`) before the pipe symbol. For example, the following expression evaluates to true when the hostname matches either `.*whispersystems.org` or `.*signal.org`:

| Selector | Operator      | Value                                |
| -------- | ------------- | ------------------------------------ |
| Host     | matches regex | .\*whispersystems.org\|.\*signal.org |

In addition to regular expressions, you can use [logical operators](#logical-operators) to match multiple values.

## Logical operators

To evaluate multiple conditions in an expression, select the **And** logical operator. These expressions can be compared further with the **Or** logical operator.

| Operator | Meaning                                       |
| -------- | --------------------------------------------- |
| And      | match all of the conditions in the expression |
| Or       | match any of the conditions in the expression |

The **Or** operator will only work with conditions in the same expression group. For example, you cannot compare conditions in **Traffic** with conditions in **Identity** or **Device Posture**.

If a condition in an expression joins a request attribute (such as _Source IP_) and a response attribute (such as _a DLP Profile_), then the condition will be evaluated when the response is received.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#page","headline":"HTTP policies · Cloudflare One docs","description":"Configure HTTP policies in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS","SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/http-policies/","name":"HTTP policies"}}]}
```
