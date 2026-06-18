---
title: Block page
description: Block page in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Block page

When Gateway blocks traffic with a [DNS](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/#block) or [HTTP Block policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#block), you can configure a block page to display in your users' browsers. You can provide a descriptive reason for blocking traffic and contact information, or you can redirect your users' browsers to another page. You can apply these customizations globally for every Block policy, or override the settings on a per-policy basis.

## Prerequisites

In order to display the block page as the URL of the blocked domain, your organization's devices must have a [Cloudflare certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/manual-deployment/) installed. Enterprise users can also [deploy their own root CA certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/custom-certificate/). If you do not install a certificate, the block page [will not display correctly](#certificate-error).

## Configure the block page

Gateway will display a global block page in the browser of any user whose traffic is blocked. By default, Gateway will display the block page for any DNS Block policies you turn it on for and all HTTP Block policies. You can [turn on or override the global setting](#configure-policy-block-behavior) on a per-policy basis.

To configure the global block page:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Reusable components** \> **Custom pages**.
2. Under **Account Gateway block page**, Gateway will display the current block page setting. Select **Manage**.
3. Choose whether to use the [default Gateway block page](#use-the-default-block-page), a [URL redirect](#redirect-to-a-block-page), or a [custom Gateway block page](#customize-the-block-page).
4. Select **Save**.

### Use the default block page

When you choose **Default Gateway block page**, Gateway will display a [block page hosted by Cloudflare ↗](https://blocked.teams.cloudflare.com/). This is the default option for all traffic blocked by Gateway.

### Redirect to a block page

Instead of displaying the Cloudflare block page, you can configure Gateway to return a `307` (Temporary Redirect) HTTP response code and redirect to a custom URL.

To redirect users to a non-Cloudflare block page:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com), go to **Reusable components** \> **Custom pages**.
2. Under **Account Gateway block page**, select **Manage**.
3. Choose **URL redirect**.
4. Enter the URL you want to redirect blocked traffic to.
5. (Optional) Turn on **Send policy context** to send [additional policy context](#policy-context) to the redirected URL.
6. Select **Save**.

Gateway will now redirect users to a custom page when user traffic matches a Block policy with the block page configured.

To create an HTTP policy to redirect URLs, refer to the [Redirect action](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#redirect).

#### Policy context

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

#### Redirect precedence

Paths and queries in the redirect URL take precedence over the original URL. When you turn on **Send policy context**, Gateway will append context to the end of the redirected URL. For example, if the original URL is `example.com/path/to/page?querystring=X&k=1` and the redirect URL is `cloudflare.com/redirect-path?querystring=Y`, Gateway will redirect requests to:

```

cloudflare.com/redirect-path?querystring=Y&cf_user_email=user@example.com


```

### Customize the block page

You can customize the Cloudflare-hosted block page by making global changes that Gateway will display every time a user reaches your block page. Customizations will apply regardless of the type of policy (DNS or HTTP) that blocks the traffic.

To customize your block page:

* [ Dashboard ](#tab-panel-7404)
* [ Terraform (v5) ](#tab-panel-7405)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Custom pages**.
2. Under **Account Gateway block page**, select **Customize**.
3. Choose **Custom Gateway block page**. Gateway will display a preview of your custom block page. Available customizations include:  
   * Your organization's name  
   * [Logo](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#add-a-logo-image)  
   * Header text  
   * Global block message, which will be displayed above the policy-specific block message  
   * [Mailto link](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#allow-users-to-email-an-administrator)  
   * Background color
4. Select **Save**.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. In [cloudflare\_zero\_trust\_gateway\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fgateway%5Fsettings), configure the `block_page` argument with your customizations:  
```  
resource "cloudflare_zero_trust_gateway_settings" "team_name" {  
  account_id = var.cloudflare_account_id  
  settings = {  
    block_page = {  
      enabled = true //do not use the default Gateway block page  
      mode = "customized_block_page" //use a custom block page  
      name = "Cloudflare"  
      logo_path = "https://logos.com/a.png"  
      header_text = "--header--"  
      footer_text = "--footer--"  
      mailto_address = "admin@example.com"  
      mailto_subject = "Blocked Request"  
      background_color = "#ffffff"  
      suppress_footer = false  
    }  
  }  
}  
```

Gateway will now display a custom Gateway block page when your users visit a blocked website.

#### Add a logo image

You can include an external logo image to display on your custom block page. The block page resizes all images to 146x146 pixels. The URL must be valid and no longer than 2048 characters. Accepted file types include SVG, PNG, JPEG, and GIF.

#### Allow users to email an administrator

You can add a Mailto link to your custom block page, which allows users to directly email you about the blocked site. When users select **Contact your Administrator** on your block page, an email template opens with the email address and subject line you configure, as well as the following diagnostic information:

| Field        | Description                                                                                                                                                                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Site URL     | The URL of the blocked page.                                                                                                                                                                                                                                   |
| Rule ID      | The ID of the Gateway policy that blocked the page.                                                                                                                                                                                                            |
| Source IP    | The public source IP of the user device.                                                                                                                                                                                                                       |
| Account ID   | The Cloudflare account associated with the block policy.                                                                                                                                                                                                       |
| User ID      | The ID of the user who visited the page. Currently, User IDs are not surfaced in the dashboard and can only be viewed by calling the [API](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/users/methods/list/). |
| Device ID    | The ID of the device that visited the page. This is generated by the Cloudflare One Client.                                                                                                                                                                    |
| Block Reason | Your policy-specific block message.                                                                                                                                                                                                                            |

## Configure policy block behavior

For DNS Block policies, you will need to turn on the block page for each policy you want to display it. For HTTP Block policies, Gateway automatically displays your global block page setting by default. You can override your global block page setting for both policy types within each policy's settings.

To turn on the block page or override your global block page setting for an individual policy:

* [ DNS policy ](#tab-panel-7406)
* [ HTTP policy ](#tab-panel-7407)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies** \> **DNS**.
2. Select **Add a policy** to create a new policy, or choose the policy you want to customize and select **Edit**. You can only edit the block page for policies with a Block action.
3. Under **Configure policy settings**, turn on **Modify Gateway block behavior**.
4. Choose your block behavior:  
   * **Use account-level block setting**: Use the global block page setting configured in your account settings. The global setting can be the default Gateway block page, an [HTTP redirect](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#redirect-to-a-block-page), or a [custom Gateway block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#customize-the-block-page).  
   * **Override account setting with URL redirect**: Redirect users with a `307` HTTP redirect to a URL you specify on a policy level.
5. (Optional) If your account-level block page setting uses a custom Gateway block page, you can turn on **Add an additional message to your custom block page when traffic matches this policy** to add a custom message to your custom block page when traffic is blocked by this policy. This option will replace the **Message** field.
6. Select **Save policy**.

Depending on your settings, Gateway will display a block page in your users' browsers or redirect them to a specified URL when they are blocked by this policy.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies** \> **HTTP**.
2. Select **Add a policy** to create a new policy, or choose the policy you want to customize and select **Edit**. You can only edit the block page for policies with a Block action.
3. Under **Configure policy settings**, go to **Modify Gateway block behavior**.
4. Choose your block behavior:  
   * **Use account-level block setting**: Use the global block page setting configured in your account settings. The global setting can be the default Gateway block page, an [HTTP redirect](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#redirect-to-a-block-page), or a [custom Gateway block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#customize-the-block-page).  
   * **Override account setting with URL redirect**: Redirect users with a `307` HTTP redirect to a URL you specify on a policy level.
5. (Optional) If your account-level block page setting uses a custom Gateway block page, you can turn on **Add an additional message to your custom block page when traffic matches this policy** to add a custom message to your custom block page when traffic is blocked by this policy. This option will replace the **Message** field.
6. Select **Save policy**.

Depending on your settings, Gateway will display a block page in your users' browsers or redirect them to a specified URL when they are blocked by this policy.

## Limitations

### Certificate error

If your users receive a security risk warning in their browser when visiting a blocked page, check that you have correctly [installed a certificate](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/user-side-certificates/manual-deployment/) on their devices. If a certificate is not installed or the installed certificate is invalid or expired, your user's browser may:

* Display an **HTTP Response Code: 526** error page, indicating an insecure upstream.
* Close the connection and fail to display any pages.

For more information on fixing certificate issues, refer to [Troubleshooting](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/#browser-and-certificate-issues).

### Incompatible DNS record types

To block the resolution of queries for DNS records with types other than `A` or `AAAA`, Gateway will respond with the `REFUSED (RCODE:5)` DNS return code. Gateway will block the request but will not display a block page.

### Third-party filtering conflict

Gateway will not properly filter traffic sent through third-party VPNs or other Internet filtering software, such as [iCloud Private Relay ↗](https://support.apple.com/102602) or [Google Chrome IP Protection ↗](https://github.com/GoogleChrome/ip-protection#ip-protection). To ensure your DNS policies apply to your traffic, Cloudflare recommends turning off software that may interfere with Gateway.

To turn off iCloud Private Relay, refer to the Apple user guides for [macOS ↗](https://support.apple.com/guide/mac-help/use-icloud-private-relay-mchlecadabe0/) or [iOS ↗](https://support.apple.com/guide/iphone/protect-web-browsing-icloud-private-relay-iph499d287c2/).

### Data center and IP address matching

If an HTTP request that matches a block policy does not arrive at the same Cloudflare data center as its DNS query, Gateway will display the default block page instead of your custom block page.

This applies to DNS queries sent to any Gateway resolver endpoint, including those over IPv4, IPv6, and encrypted protocols like DoH (DNS over HTTPS) and DoT (DNS over TLS). If a DNS query is routed to a different Cloudflare data center than the corresponding HTTP request (for example, if DoH traffic is sent outside the WARP tunnel), Gateway cannot correlate the two requests and will display the default block page instead of your custom block page.

If the HTTP request comes from a different IP address than the DNS request, Gateway may not display the rule ID, custom message, or other fields on the block page. This can happen when a recursive DNS resolver's source IP address differs from the user device's IP address.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#page","headline":"Block page · Cloudflare One docs","description":"Block page in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/custom-pages/","name":"Custom pages"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/custom-pages/gateway-block-page/","name":"Block page"}}]}
```
