---
title: Define device enrollment permissions
description: Control which devices can enroll.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Define device enrollment permissions

Device enrollment permissions determine which users can connect new devices to your organization's Cloudflare Zero Trust instance. Once the user registers their device, the Cloudflare One Client will store their identity token and use it to authenticate to services in your private network.

## Set device enrollment permissions

* [ Dashboard ](#tab-panel-9266)
* [ Terraform (v5) ](#tab-panel-9267)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **Management**.
2. In **Device enrollment** \> **Device enrollment permissions**, select **Manage**.
3. In the **Policies** tab, configure one or more [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to define who can join their device. For example, you could allow all users with a company email address:  
| Rule type | Selector         | Value        |  
| --------- | ---------------- | ------------ |  
| Include   | Emails ending in | @company.com |

Note

Device posture checks are not supported in device enrollment policies. The Cloudflare One Client (formerly WARP) can only perform posture checks after the device is enrolled.

1. In the **Login methods** tab:  
a. Select the [identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) users can authenticate with. If you have not integrated an identity provider, you can use the [one-time PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/).  
b. (Optional) If you plan to only allow access via a single IdP, turn on **Apply instant authentication**. End users will not be shown the Cloudflare Access login page. Instead, Cloudflare will redirect users directly to your SSO login event.
2. Select **Save**.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Access: Apps and Policies Write`
2. Create a reusable Access policy using the [cloudflare\_zero\_trust\_access\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fpolicy) resource:  
```  
resource "cloudflare_zero_trust_access_policy" "allow_company_emails" {  
  account_id   = var.cloudflare_account_id  
  name         = "Allow company emails"  
  decision     = "allow"  
  include      = [  
    {  
      email_domain = {  
        domain = "@example.com"  
      }  
    }  
  ]  
}  
```
3. Use the [cloudflare\_zero\_trust\_access\_application ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fapplication) resource to create an application with type `warp`.  
```  
resource "cloudflare_zero_trust_access_application" "device_enrollment" {  
  account_id       = var.cloudflare_account_id  
  type             = "warp"  
  name             = "Warp device enrollment"  
  allowed_idps              = [cloudflare_zero_trust_access_identity_provider.microsoft_entra_id.id]  
  auto_redirect_to_identity = true  
  app_launcher_visible      = false  
  policies = [  
    {  
      id = cloudflare_zero_trust_access_policy.allow_company_emails.id  
      precedence = 1  
    }  
  ]  
}  
```

## Only allow corporate devices

Device posture evaluation happens after a device has already enrolled in your Zero Trust organization. If you want only specific devices to be able to enroll, we recommend adding a [mutual TLS authentication](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/) rule to your device enrollment policy. This rule will check for the presence of a specific client certificate on the enrolling devices.

Note

Mutual TLS authentication is only available on Enterprise plans.

Certificate requirements

* The CA certificate can be from a publicly trusted CA or self-signed.
* In the certificate `Basic Constraints`, the attribute `CA` must be set to `TRUE`.
* The certificate must use one of the signature algorithms listed below:  
Allowed signature algorithms  
`x509.SHA1WithRSA`  
`x509.SHA256WithRSA`  
`x509.SHA384WithRSA`  
`x509.SHA512WithRSA`  
`x509.ECDSAWithSHA1`  
`x509.ECDSAWithSHA256`  
`x509.ECDSAWithSHA384`  
`x509.ECDSAWithSHA512`

To check for an mTLS certificate:

* [ Dashboard ](#tab-panel-9268)
* [ Terraform (v5) ](#tab-panel-9269)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Service credentials** \> **Mutual TLS**.
2. Select **Add mTLS Certificate**.
3. Enter any name for the root CA.
4. In **Certificate content**, paste the contents of your root CA.  
If the client certificate is directly signed by the root CA, you only need to upload the root. If the client certificate is signed by an intermediate certificate, you must upload the entire CA chain (intermediate and root). For example:  
```  
-----BEGIN CERTIFICATE-----  
<intermediate.pem>  
-----END CERTIFICATE-----  
-----BEGIN CERTIFICATE-----  
<rootCA.pem>  
-----END CERTIFICATE-----  
```
1. In **Associated hostnames**, enter your Zero Trust team domain: `<team-name>.cloudflareaccess.com`
2. In your [device enrollment permissions](#set-device-enrollment-permissions), add a _Common Name_ or _Valid Certificate_ rule. For example, the following policy requires a client certificate with a specific common name:  
| Action | Rule type | Selector    | Value              |  
| ------ | --------- | ----------- | ------------------ |  
| Allow  | Require   | Common Name | <CERT-COMMON-NAME> |
3. On your device, add the client certificate to the [system keychain](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#test-in-the-browser).

1. Add the following permissions to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Access: Mutual TLS Certificates Write`  
   * `Access: Apps and Policies Write`
2. Use the [cloudflare\_zero\_trust\_access\_mtls\_certificate ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Faccess%5Fmtls%5Fcertificate) resource to add an mTLS certificate to your account:  
```  
resource "cloudflare_zero_trust_access_mtls_certificate" "example_mtls_cert" {  
  account_id     = var.cloudflare_account_id  
  name           = "WARP enrollment mTLS cert"  
  certificate    = <<EOT  
  -----BEGIN CERTIFICATE-----  
  xxxx  
  xxxx  
  -----END CERTIFICATE-----  
  EOT  
  associated_hostnames = ["your-team-name.cloudflareaccess.com"]  
}  
```
3. Create the following Access policy:  
```  
resource "cloudflare_zero_trust_access_policy" "warp_enrollment_mtls" {  
  account_id     = var.cloudflare_account_id  
  name           = "Allow employees with mTLS cert"  
  decision       = "allow"  
  include = [  
    {  
      email_domain = {  
        domain = "@example.com"  
      }  
    }  
  ]  
  require = [  
    {  
      common_name = {  
        common_name = "Common name 1"  
      }  
    },  
        {  
      common_name = {  
        common_name = "Common name 2"  
      }  
    }  
  ]  
}  
```
4. Add the policy to your [cloudflared\_zero\_trust\_access\_application for the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/device-enrollment/#set-device-enrollment-permissions).
5. On your device, add the client certificate to the [system keychain](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/#test-in-the-browser).

## Best practices

Most businesses use a single identity provider as the source of truth for their user directory. You should use this source of truth to onboard your corporate users to Zero Trust, for example by requiring company email addresses to login with your primary identity provider. Later on, you can add other login methods or identity providers as necessary for any contractors, vendors, or acquired corporations who may need access to your network.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/device-enrollment-permissions/#page","headline":"Define device enrollment permissions · Cloudflare Learning Paths","description":"Control which devices can enroll.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/device-enrollment-permissions/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/configure-device-agent/","name":"Configure the device agent"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/configure-device-agent/device-enrollment-permissions/","name":"Define device enrollment permissions"}}]}
```
