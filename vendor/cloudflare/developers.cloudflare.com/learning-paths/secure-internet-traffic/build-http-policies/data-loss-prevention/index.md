---
title: Build Data Loss Prevention (DLP) policies
description: Configure DLP profiles and policies.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build Data Loss Prevention (DLP) policies

In order to use Data Loss Prevention (DLP) tools within Cloudflare Zero Trust, you first need to define your DLP profiles. [DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/) are complex objects with dictionaries, pre-built detections, and custom logic that you can reference as selectors within your Gateway policies.

## Configure a DLP profile

You may either use DLP profiles predefined by Cloudflare, or create your own custom profiles based on regular expressions (regex), predefined detection entries, and DLP datasets.

### Configure a predefined profile

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Profiles**.
2. Choose a [predefined profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/predefined-profiles/) and select **Edit**.
3. Enable one or more **Detection entries** according to your preferences.
4. Select **Save profile**.

Most predefined profiles match when any enabled detection entry matches. The **Personally Identifiable Information (PII) Record** profile is an exception and requires at least three unique detection entries in close proximity before the profile matches.

### Build a custom profile

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Data loss prevention** \> **Profiles**.
2. Select **Create profile**.
3. Enter a name and optional description for the profile.
4. Add detection entries to the profile.  
Create a custom entry  
   1. Select **Create custom entry**.  
   2. Choose the type of detection entry you want to create and configure its values.  
   For information on supported detection entry types, refer to [Configure detection entries](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/).  
   3. To save the detection entry, select **Done**.  
Add existing entries  
Existing entries include [predefined](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/predefined-detection-entries/) and [user-defined](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/) detection entries that you manage from the Detection entries section.  
   1. Select **Add existing entries**.  
   2. Choose which entries you want to add, then select **Confirm**.  
   3. To finish, select **Done**.
5. (Optional) Add data classes to include reusable classification rules.  
   * Select **Add data classes**  
   * Choose the data classes you want to add, then select **Confirm**
6. (Optional) Use labels as match criteria for the profile.  
   * Select a sensitivity schema and minimum sensitivity level.  
   * Select a data tag group and one or more data tags.  
For more information on labels, templates, and data classes, refer to [Data Classification](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/data-classification/).
7. (Optional) Configure [**profile settings**](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/advanced-settings/) for the profile.
8. Select **Save profile**.

## Build effective DLP profiles

For many Cloudflare users, Zero Trust is often one of the only measures for preventing the loss of sensitive data. For other users, Zero Trust may be the one of the early in-line measures of a complex Internet and SaaS app security strategy. No matter which model you most resemble, developing effective and appropriate DLP policies and practices starts with first-principles definitions.

### Define your sensitive data

#### Existing data patterns

If your organization is most concerned about general data patterns that fit existing classifications such as personal identifiable information (PII), protected health information (PHI), financial information, or source code, we recommend using the [default predefined profiles](#configure-a-predefined-profile).

To help this better match the needs of your organization, you can also build a complex profile that matches data to both an existing library and a custom string detection or database. For example:

* [ Dashboard ](#tab-panel-9198)
* [ API ](#tab-panel-9199)

| Selector    | Operator | Value                     | Logic | Action |
| ----------- | -------- | ------------------------- | ----- | ------ |
| DLP Profile | in       | _Credentials and Secrets_ | Or    | Block  |
| DLP Profile | in       | _AWS Key Dataset_         |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "block",

    "description": "Detect secrets and AWS keys",

    "enabled": true,

    "filters": [

        "http"

    ],

    "name": "Secrets and AWS keys",

    "precedence": 0,

    "traffic": "any(dlp.profiles[*] in <CREDENTIALS_DLP_PROFILE_UUID>) or any(dlp.profiles[*] in <AWS_DLP_PROFILE_UUID>)"

  }'


```

#### Assorted data patterns

If your data patterns take many different forms and contexts, consider building a custom profile using one or multiple regexes.

Rust regular expressions

Cloudflare implements regular expressions with Rust. Make sure you account for this difference when writing expressions or using regular expression builders and generative AI.

To validate your regex, use [Rustexp ↗](https://rustexp.lpil.uk/).

For example, you can use a custom expression to detect when your users share product SKUs in the format `CF1234-56789`:

* [ Dashboard ](#tab-panel-9200)
* [ API ](#tab-panel-9201)

1. [Build a custom profile](#build-a-custom-profile) with the following custom entry:  
| Detection entry name | Value                     |  
| -------------------- | ------------------------- |  
| Product SKUs         | CF\[0-9\]{1,4}-\[0-9\]{5} |
2. Create an HTTP policy with the following expressions:  
| Selector    | Operator      | Value                        | Logic | Action |  
| ----------- | ------------- | ---------------------------- | ----- | ------ |  
| DLP Profile | in            | _Product SKUs_               | And   | Block  |  
| User Email  | matches regex | \[a-z0-9\]{0,15}@example.com |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "block",

    "description": "Detect product SKUs shared by users in organization",

    "enabled": true,

    "filters": [

        "http"

    ],

    "name": "Detect product SKU leaks",

    "precedence": 0,

    "traffic": "any(dlp.profiles[*] in <SKU_DLP_PROFILE_UUID>)",

    "identity": "identity.email matches \"[a-z0-9]{0,15}@example.com\""

  }'


```

#### DLP datasets

If your data is a distinct [dataset](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/detection-entries/configure-detection-entries/#exact-data-match-datasets) you have defined, you can build a profile by uploading a database to use in an Exact Data Match or Custom Wordlist function. Exact Data Match and Custom Wordlist feature some key differences:

| Exact Data Match    | Custom Wordlist                                         |                                                                    |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| **Encryption**      | Hashed and compared to encrypted traffic                | Stored as plaintext                                                |
| **Payload logging** | Matches redacted in logs                                | Matches appear in logs                                             |
| **Usage**           | PII (such as names, addresses, and credit card numbers) | Non-sensitive data (such as intellectual property and SKU numbers) |

We recommend using Exact Data Match for highly sensitive datasets and Custom Wordlists for lists of keywords.

As your datasets change and grow, we recommend building a pipeline to update the data source in Cloudflare Zero Trust. For more information, contact your account team.

#### Microsoft Information Protection (MIP) labels

If your data already contains Microsoft Information Protection (MIP) labeling schema, Cloudflare can detect those values in-transit automatically. To get started, connect your Microsoft 365 account with a [CASB integration](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/). Cloudflare will automatically pull in your existing MIP definitions into Zero Trust. You can then use the MIP definitions to build DLP profiles for use in Gateway policies.

For more information, refer to [Integration profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/integration-profiles/).

## Build DLP policies

The best way to start applying data loss prevention to your traffic, minimize the chance of false positives, and collect actionable data is to start with the known knowns in your sensitive data policies. Rather than building policies to detect sensitive data like SSNs or financial information across all of your traffic, you should start by building policies that target both sensitive data types and destinations that are known data sources or points of high risk. These sources can be inside or outside your organization.

### Example

Many organizations want to detect and log financial information egressing from user devices to critical SaaS applications. To limit the risk of false positives and to filter out logging noise, Cloudflare recommends building your first series of policies to specify both target data and target destination. For example, you can block financial information from being sent to AI chatbots, such as ChatGPT and Gemini:

* [ Dashboard ](#tab-panel-9202)
* [ API ](#tab-panel-9203)

| Selector           | Operator | Value                     | Logic | Action |
| ------------------ | -------- | ------------------------- | ----- | ------ |
| DLP Profile        | in       | _Financial Information_   | And   | Block  |
| Content Categories | in       | _Artificial Intelligence_ |       |        |

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "block",

    "description": "Prevent financial information from being shared with AI tools",

    "enabled": true,

    "filters": [

        "http"

    ],

    "name": "Block AI financial info",

    "precedence": 0,

    "traffic": "any(dlp.profiles[*] in <FINANCIAL_INFO_DLP_PROFILE_UUID>) and any(http.request.uri.content_category[*] in {184})"

  }'


```

Once you have analyzed the flow and magnitude of data from the known sources, you can begin focusing on more specialized or explicit datasets for more generalized sources. You may want to allow sources that are known internal locations where sensitive data is intentionally transferred.

After developing a level of confidence from reviewing the logs and evaluating a rate of false positives for both types of policies, you can feel more confident in experimenting more broadly with data loss prevention policies.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-http-policies/data-loss-prevention/#page","headline":"Build Data Loss Prevention (DLP) policies · Cloudflare Learning Paths","description":"Configure DLP profiles and policies.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/build-http-policies/data-loss-prevention/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/build-http-policies/","name":"Build HTTP security policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/build-http-policies/data-loss-prevention/","name":"Build Data Loss Prevention (DLP) policies"}}]}
```
