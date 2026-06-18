---
title: 2023-02-01 - Updates to security fields
description: Review updates to security fields in log datasets.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 2023-02-01 - Updates to security fields

Cloudflare will deploy some updates to security-related fields in Cloudflare Logs. These updates will affect the following datasets:

* [HTTP Requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/)
* [Firewall Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/firewall%5Fevents/)

## Timeline

To minimize possible impacts on our customers' existing SIEM configurations, these updates will happen in two phases according to the following timeline:

### Phase 1 (February 1, 2023)

For the log fields being added, Cloudflare will gradually start adding them to logs datasets.

For the log fields being renamed, Cloudflare will:

* **Add new fields** with the same data as the fields that will be removed on phase 2 (described in this document as old fields). These new fields will become gradually available. Refer to the next sections for details.
* **Announce the deprecation of the old fields.** Cloudflare will remove these fields from logs datasets on August 1, 2023.

For the log fields being removed, Cloudflare is announcing them as deprecated. Their removal from logs datasets will occur on August 1, 2023.

In addition to these Cloudflare Logs changes, Cloudflare will also add new security-related fields to the following [GraphQL datasets](https://developers.cloudflare.com/analytics/graphql-api/features/data-sets/):

* `httpRequestsAdaptive `
* `httpRequestsAdaptiveGroups`
* `firewallEventsAdaptive`
* `firewallEventsAdaptiveGroups`
* `firewallEventsAdaptiveByTimeGroups`

### Phase 2 (August 1, 2023)

For the log fields being renamed, Cloudflare will remove the old fields from the Cloudflare logs datasets. From August 1, 2023 onwards, only the new fields will be available.

For the log fields being removed, Cloudflare will also remove them from the Cloudflare logs datasets. From August 1, 2023 onwards, these fields will no longer be available.

## Concepts

The following concepts are used below in the reviewed field descriptions:

* **Terminating action:** One of the following actions:  
   * `block`  
   * `js_challenge`  
   * `managed_challenge`  
   * `challenge` (_Interactive Challenge_)

For more information on these actions, refer to the [Actions](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/) reference in the Rules language documentation.

* **Security rule:** One of the following rule types:  
   * [WAF managed rule](https://developers.cloudflare.com/waf/managed-rules/)  
   * [WAF custom rule](https://developers.cloudflare.com/waf/custom-rules/)  
   * [WAF rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/)

## HTTP Requests dataset changes

The following fields will be renamed in the [HTTP Requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http%5Frequests/) dataset according to the two-phase strategy outlined in the [timeline](#timeline):

| New field name          | Type         | Description                                                                        | Old field name(deprecated on Aug 1, 2023) |
| ----------------------- | ------------ | ---------------------------------------------------------------------------------- | ----------------------------------------- |
| SecurityRuleID          | String       | Rule ID of the security rule that triggered a terminating action, if any.          | WAFRuleID                                 |
| SecurityRuleDescription | String       | Rule description of the security rule that triggered a terminating action, if any. | WAFRuleMessage                            |
| SecurityAction          | String       | Rule action of the security rule that triggered a terminating action, if any.      | WAFAction                                 |
| SecurityRuleIDs         | String Array | Array of security rule IDs that matched the request.                               | FirewallMatchesRuleIDs                    |
| SecurityActions         | String Array | Array of actions that Cloudflare security products performed on the request.       | FirewallMatchesActions                    |
| SecuritySources         | String Array | Array of Cloudflare security products that matched the request.                    | FirewallMatchesSources                    |

The following fields are now deprecated and they will be removed from the HTTP Requests dataset on August 1, 2023:

| Deprecated field name | Notes                                                                 |
| --------------------- | --------------------------------------------------------------------- |
| WAFProfile            | Used in the previous version of WAF managed rules (now deprecated).   |
| EdgeRateLimitAction   | Used in the previous version of rate limiting rules (now deprecated). |
| EdgeRateLimitID       | Used in the previous version of rate limiting rules (now deprecated). |
| SecurityLevel         | N/A                                                                   |

## Firewall Events dataset changes

The following fields will be added to the [Firewall Events](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/firewall%5Fevents/) dataset:

| Field name  | Type   | Description                                                        |
| ----------- | ------ | ------------------------------------------------------------------ |
| Description | String | The description of the rule triggered by the request.              |
| Ref         | String | The user-defined identifier for the rule triggered by the request. |

## Changes to GraphQL datasets

Cloudflare will add the following fields to the `httpRequestsAdaptive `and `httpRequestsAdaptiveGroups `datasets:

| Field name     | Type   | Description                                                              |
| -------------- | ------ | ------------------------------------------------------------------------ |
| securityAction | String | Action of the security rule that triggered a terminating action, if any. |
| securitySource | String | Source of the security rule that triggered a terminating action, if any. |

Cloudflare will also add the following field to the `firewallEventsAdaptive`, `firewallEventsAdaptiveGroups`, and `firewallEventsAdaptiveByTimeGroups` datasets:

| Field name  | Type   | Description                                           |
| ----------- | ------ | ----------------------------------------------------- |
| description | String | The description of the rule triggered by the request. |

These new fields will become gradually available.

For more information on the available datasets, refer to [GraphQL datasets](https://developers.cloudflare.com/analytics/graphql-api/features/data-sets/).

## Update your Logpush jobs and SIEM systems

Cloudflare will not update existing Logpush jobs to use the renamed fields. You will need to update the jobs according to the instructions provided below.

After updating Logpush jobs, you may need to update external filters or reports in your SIEM systems to reflect the log field changes.

### Update Logpush job in the dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page.  
[ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Select **Edit** next to the Logpush job you wish to edit.
3. Under **Select data fields**, update the fields in your job. The new security log fields are available under **General**.
4. Select **Save changes**.

### Update Logpush job via API

Follow the instructions in [Update output\_options](https://developers.cloudflare.com/logs/logpush/examples/example-logpush-curl/#optional---update-output%5Foptions) to update the fields in the Logpush job.

### Update Logpush job via Terraform

If you are already managing Logpush jobs via Terraform, update the `logpull_options` in your existing [cloudflare\_logpush\_job ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/logpush%5Fjob) Terraform resource. For example:

```

resource "cloudflare_logpush_job" "example_job" {

  enabled             = true

  zone_id             = "<ZONE_ID>"

  name                = "My-logpush-job"

  logpull_options     = "fields=RayID,ClientIP,EdgeStartTimestamp,WAFAction,WAFProfile&timestamps=rfc3339"

  logpull_options     = "fields=RayID,ClientIP,EdgeStartTimestamp,SecurityAction&timestamps=rfc3339"

  destination_conf = "r2://cloudflare-logs/http_requests/date={DATE}?account-id=${var.account_id}&access-key-id=${cloudflare_api_token.logpush_r2_token.id}&secret-access-key=${sha256(cloudflare_api_token.logpush_r2_token.value)}"

  dataset             = "http_requests"

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/logs/reference/change-notices/2023-02-01-security-fields-updates/#page","headline":"2023-02-01 - Updates to security fields · Cloudflare Logs docs","description":"Review updates to security fields in log datasets.","url":"https://developers.cloudflare.com/logs/reference/change-notices/2023-02-01-security-fields-updates/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/reference/change-notices/","name":"Change notices"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/reference/change-notices/2023-02-01-security-fields-updates/","name":"2023-02-01 - Updates to security fields"}}]}
```
