---
title: Rule groups
description: How Rule groups works in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rule groups

A rule group is a collection of Access rules that can be configured once and then quickly applied across many Access policies. Rule groups use the same [rule types](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#rule-types) and [selectors](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#selectors) shown in the Access policy builder.

Note

Rule groups are distinct from groups in your identity provider, like Okta groups. Rule groups can contain a mix of individual users, groups from identity providers, and service authentication options like service tokens.

## Create a rule group

To create an Access rule group:

* [ Dashboard ](#tab-panel-7169)
* [ API ](#tab-panel-7170)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Policies**, and select the **Rule groups** tab.
2. Select **Add a group**.
3. Enter a name for the group (for example, `Lisbon-team`).
4. Specify as many rules as needed to define your user group. For example, the following rules define a team based in Lisbon, Portugal:  
| Rule type | Selector         | Value     |  
| --------- | ---------------- | --------- |  
| Include   | Country          | Portugal  |  
| Require   | Emails Ending In | @team.com |
5. Select **Save**.

Send a `POST` request to the [/access/groups](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/access/subresources/groups/methods/create/) endpoint:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Organizations, Identity Providers, and Groups Write`

Create an Access group

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/groups" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Lisbon-team",

    "include": [

        {

            "geo": {

                "country_code": "PT"

            }

        }

    ],

    "exclude": [],

    "require": [

        {

            "email_domain": {

                "domain": "team.com"

            }

        }

    ],

    "is_default": false

  }'


```

You can now add this group to an Access policy using the _Rule groups_ selector.

## Use cases

### IP-based rules

We recommend using rule groups to define any IP address-based rules you configure in policies. Keeping IP addresses in one place allows you to modify or remove addresses once, rather than in each policy, and reduces the potential for mistakes.

Note

If adding more than one IP address or range to a rule group, use an Include rule for the IPs. If you do not use an Include rule, the policy will require traffic to originate from all ranges.

### Country requirements

You can create a rule group that consists of countries to allow or block. Access will treat the countries in the Include rule with an OR logical operator. When building policies for an Access application, you can assign this rule group to a Require policy to require at least one of the countries inside of the group. For an example policy, refer to [Require rules with OR operators](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#require-rules-with-or-operators).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/groups/#page","headline":"Rule groups · Cloudflare One docs","description":"How Rule groups works in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/groups/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/policies/","name":"Policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/policies/groups/","name":"Rule groups"}}]}
```
