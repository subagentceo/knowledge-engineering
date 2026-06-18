---
title: Gateway block page
description: Set up custom Gateway block pages.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Gateway block page

With Cloudflare Zero Trust, you can deliver actionable feedback to users when they are blocked by a Gateway policy. Custom block messages can reduce user confusion and decrease your IT ticket load.

There are two different ways to surface block messages:

* [Custom block page](#custom-block-page)
* [Cloudflare One Client block notifications](#cloudflare-one-client-block-notifications)

## Custom block page

You can display a custom block page in the browser when users are blocked by a Gateway DNS or HTTP policy. This is a static page that educates users on why they were blocked and how to contact IT.

The custom block page has a few drawbacks:

* To display the block page, you must install a [user-side certificate](https://developers.cloudflare.com/learning-paths/replace-vpn/configure-device-agent/enable-tls-decryption/#configure-user-side-certificates) on the end user device.
* The block page does not appear when users are blocked by a Gateway network policy.
* The custom block page only displays when the user loads a site in a browser. If, for instance, the user is allowed to visit a site but not allowed to upload a file, the file upload would fail silently and the user would not get a block page.

To work around these limitations, we recommend using [Cloudflare One Client block notifications](#cloudflare-one-client-block-notifications).

Note

The Gateway custom block page is a different concept from [Access custom block pages](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/access-block-page/), which are used in conjunction with Cloudflare Access policies.

### Enable the block page for DNS policies

For DNS policies, you will need to enable the block page on a per-policy basis.

* [ Dashboard ](#tab-panel-9091)
* [ Terraform (v5) ](#tab-panel-9092)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies** \> **DNS**.
2. Select **Add a policy** to create a new policy, or choose the policy you want to customize and select **Edit**. You can only edit the block page for policies with a Block action.
3. Under **Configure policy settings**, turn on **Modify Gateway block behavior**.
4. Choose your block behavior:  
   * **Use account-level block setting**: Use the global block page setting configured in your account settings. The global setting can be the default Gateway block page, an [HTTP redirect](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#redirect-to-a-block-page), or a [custom Gateway block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#customize-the-block-page).  
   * **Override account setting with URL redirect**: Redirect users with a `307` HTTP redirect to a URL you specify on a policy level.
5. (Optional) If your account-level block page setting uses a custom Gateway block page, you can turn on **Add an additional message to your custom block page when traffic matches this policy** to add a custom message to your custom block page when traffic is blocked by this policy. This option will replace the **Message** field.
6. Select **Save policy**.

Depending on your settings, Gateway will display a block page in your users' browsers or redirect them to a specified URL when they are blocked by this policy.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Choose a DNS policy with a Block action.
3. In the policy's [rule\_settings ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fgateway%5Fpolicy), turn on `block_page_enabled`. If you have configured a [custom Gateway block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/#customize-the-block-page), you can optionally show an additional `block_reason` when traffic is blocked by this policy.  
```  
resource "cloudflare_zero_trust_gateway_policy" "dns_block_security_categories" {  
  name        = "Block DNS Security Categories"  
  enabled     = true  
  account_id  = var.cloudflare_account_id  
  description = "Managed by Terraform - Generic security policy based on Cloudflare Threat Intelligence categories."  
  precedence  = 101  
  action      = "block"  
  filters     = ["dns"]  
  /* Categories being enabled here:  
    - 80:  "Command and Control & Botnet"  
    - 83:  "Cryptomining"  
    - 117: "Malware"  
    - 131: "Phishing"  
    - 153: "Spyware"  
    - 175: "DNS Tunneling"  
    - 176: "DGA Domains"  
    - 178: "Brand Embedding"  
  */  
  traffic = "any(dns.security_category[*] in {80 83 117 131 153 175 176 178})"  
  identity = ""  
  rule_settings = {  
    block_page_enabled = true  
    block_reason  = "This domain has been flagged as a potential security risk." // Adds an additional message to the custom block page. Requires enabling custom block page in cloudflare_zero_trust_gateway_settings.  
  }  
}  
```

### Customize the block page

You can customize the Cloudflare-hosted block page by making global changes that Gateway will display every time a user reaches your block page. Customizations will apply regardless of the type of policy (DNS or HTTP) that blocks the traffic.

To customize your block page:

* [ Dashboard ](#tab-panel-9089)
* [ Terraform (v5) ](#tab-panel-9090)

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

## Cloudflare One Client block notifications

Note

Only available on Enterprise plans.

For more granular user feedback, you can enable Cloudflare One Client block notifications on any Gateway DNS or Network _Block_ policy. Blocked users will receive an operating system notification from the Cloudflare One Client with a custom message you set.

Client notifications provide additional functionality over the [custom block page](#custom-block-page):

* Client notifications work with network policies, which means you can surface feedback for all partial actions on user traffic including blocking a specific port, file upload, or protocol.
* Client notifications allow you to direct users to a unique link per individual policy. For example, you could link users to your organization's acceptable use policy, data protection policy, or any existing IT troubleshooting infrastructure. If no infrastructure for this exists within your organization, you can quickly deploy an HTML site on [Cloudflare Pages](https://developers.cloudflare.com/pages/), put the site behind a [Cloudflare Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/), and provide dynamic feedback based on the identity and device posture values found in the user's [Access JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/block-page/#page","headline":"Gateway block page · Cloudflare Learning Paths","description":"Set up custom Gateway block pages.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/block-page/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/build-policies/","name":"Build secure access policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/build-policies/block-page/","name":"Gateway block page"}}]}
```
