---
title: Lists
description: Lists in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Lists

With Cloudflare One, you can create lists of URLs, hostnames, or other entries to reference when creating [Gateway policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) or [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/). This allows you to quickly create rules that match and take actions against several items at once.

Before creating a list, make note of the [limitations](#limitations).

Note

The lists described in this page are not the same as [custom lists](https://developers.cloudflare.com/waf/tools/lists/custom-lists/) defined at the account level. The two types of lists support different data types and have different validation rules.

## List types

Lists can contain a single type of data each. Supported data types include:

* URLs
* Hostnames or domains
* Serial numbers
* User email addresses
* IP addresses
* Device ID numbers
* AAGUIDs (used by [Access independent MFA](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/independent-mfa/#restrict-authenticators-by-aaguid) to restrict the WebAuthn authenticators users can enroll)

## Create a list from a CSV file

To test uploading CSV lists, you can download a [sample CSV file](https://developers.cloudflare.com/cloudflare-one/static/list-test.csv) of IP address ranges or copy the following into a file:

list-test.csv

```

value,description

192.0.2.0/24,This is an IP address range in CIDR format

198.51.100.0/24,This is also an IP address range

203.0.113.0/24,This is the third IP address range


```

When you format a CSV file for upload:

* Each line should be a single entry that includes a value and an optional description.
* A header row must be present for Zero Trust to recognize descriptions.
* Trailing whitespace characters are not allowed.
* CRLF (Windows) and LF (Unix) line endings are valid.

To upload the list to the Cloudflare dashboard:

* [ Dashboard ](#tab-panel-7408)
* [ Terraform (v5) ](#tab-panel-7409)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Lists**.
2. Select **Upload CSV**.
3. Next, specify a **List name**, enter an optional description, and choose a **List type**.
4. Drag and drop a file into the **CSV file** window, or select a file.
5. Select **Create**.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Decode the contents of the CSV file and store it as a local value:  
```  
locals {  
  ip_list = csvdecode(file("${path.module}/list-test.csv"))  
}  
```
3. Create a list using the [cloudflare\_zero\_trust\_list ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Flist) resource:  
```  
resource "cloudflare_zero_trust_list" "ips_from_csv" {  
  account_id  = var.cloudflare_account_id  
  name        = "IPs imported from CSV"  
  description = "Managed by Terraform"  
  type        = "IP"  
  items       = local.ip_list  
}  
```

You can now use this list in the policy builder by choosing the _in list_ operator.

## Create a list manually

* [ Dashboard ](#tab-panel-7410)
* [ API ](#tab-panel-7411)
* [ Terraform (v5) ](#tab-panel-7412)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Lists**.
2. Select **Create manual list**.
3. Next, specify a **List name**, enter an optional description, and choose a **List type**.
4. Enter your list element manually into the **Add entry** field and select **Add**.
5. Select **Save**.

Create Zero Trust list

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "description": "Private application IPs",

    "items": [

        {

            "value": "10.226.0.177/32"

        },

        {

            "value": "10.226.1.177/32"

        }

    ],

    "name": "Corporate IP list",

    "type": "IP"

  }'


```

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Create a list using the [cloudflare\_zero\_trust\_list ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Flist) resource.  
Example list of IPs:  
```  
resource "cloudflare_zero_trust_list" "wiki_IPs" {  
  account_id  = var.cloudflare_account_id  
  name        = "Company Wiki IP addresses"  
  description = "Managed by Terraform"  
  type        = "IP"  
  items = [  
    {  
      description = "Example IP address range"  
      value = "192.0.2.0/24",  
    },  
    {  
      value = "198.51.100.0/24"  
    }  
  ]  
}  
```  
Example list of domains:  
```  
resource "cloudflare_zero_trust_list" "wiki_domains" {  
  account_id  = var.cloudflare_account_id  
  name        = "Company Wiki Domains"  
  description = "Managed by Terraform"  
  type        = "DOMAIN"  
  items = [  
    {  
      value = "wiki.example.com"  
    },  
    {  
      value = "wiki2.example.com"  
    }]  
}  
```

You can now use this list in the policy builder by choosing the _in list_ operator.

## Edit a list

1. In the **Lists** page, locate the list you want to edit.
2. Select **Edit**. This will allow you to:  
   * Edit list name and description by selecting on the three-dots menu to the right of your list's name.  
   * Delete the list by selecting the three-dots menu to the right of your list's name.  
   * Delete individual entries.  
   * Manually add entries to your list.
3. Once you have edited your list, select **Save**.

## Limitations

### List size

Your lists can include up to 1,000 entries for Standard plans and 5,000 for Enterprise plans. An uploaded CSV file must be smaller than 2 MB.

### Wildcard entries

Hostname lists do not support wildcard entries (`*.example.com`). You will need to add domains as exact matches. Adding a wildcard to lists comprised of hostnames will return an error when you save.

### Non-Latin characters

Gateway supports non-Latin characters by converting all domains and hostnames to [Punycode ↗](https://www.rfc-editor.org/rfc/rfc3492.txt). Once you save a list with non-Latin characters, Gateway will display the entry as Punycode.

### Duplicate entries

Lists cannot have duplicate entries. Because domains and hostnames are converted to [Punycode](#non-latin-characters), multiple list entries that convert to the same string will count as duplicates. For example, `éxàmple.com` converts to `xn—xmple-rqa5d.com`, so including both `éxàmple.com` and `xn—xmple-rqa5d.com` in a list will result in a duplicate error.

### URL slashes

Gateway ignores trailing forward slashes (`/`) in URLs. For example, `https://example.com` and `https://example.com/` will count as the same URL and may return a duplicate error.

### Extended email addresses

Extended email addresses (also known as plus addresses) are variants of an existing email address with `+` or `.` modifiers. Many email providers, such as Gmail and Outlook, deliver emails intended for an extended address to its original address. For example, providers will deliver emails sent to `contact+123@example.com` or `con.tact@example.com` to `contact@example.com`.

By default, Gateway will either filter only exact matches or all extended variants depending on the type of policy and action used:

DNS policies

| Action             | Behavior                             |
| ------------------ | ------------------------------------ |
| Allow              | Match exact address only             |
| Block              | Match exact address and all variants |
| Override           | Match exact address and all variants |
| Safe Search        | Match exact address and all variants |
| YouTube Restricted | Match exact address and all variants |

Network policies

| Action           | Behavior                             |
| ---------------- | ------------------------------------ |
| Allow            | Match exact address only             |
| Audit SSH        | Match exact address and all variants |
| Block            | Match exact address and all variants |
| Network Override | Match exact address only             |

HTTP policies

| Action         | Behavior                             |
| -------------- | ------------------------------------ |
| Allow          | Match exact address only             |
| Block          | Match exact address and all variants |
| Do Not Inspect | Match exact address only             |
| Do Not Isolate | Match exact address only             |
| Do Not Scan    | Match exact address only             |
| Isolate        | Match exact address and all variants |

Other policies

| Policy type     | Behavior                 |
| --------------- | ------------------------ |
| Egress policy   | Match exact address only |
| Resolver policy | Match exact address only |

To force Gateway to match all email address variants, go to **Traffic policies** \> **Traffic settings** \> **Policy settings** and turn on **Match extended email addresses**. This setting applies to all firewall, egress, and resolver policies.

### API rate limit

You can send 600 requests to the [Gateway Lists](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/lists/) endpoint per minute. If you exceed the rate limit, Cloudflare will block subsequent requests for 120 seconds.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/#page","headline":"Lists · Cloudflare One docs","description":"Lists in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/lists/","name":"Lists"}}]}
```
