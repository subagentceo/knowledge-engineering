---
title: Timed DNS policies
description: Reference information for Timed DNS policies in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Timed DNS policies

By default, Cloudflare Gateway policies apply at all times when turned on. With timed DNS policies, you can control when DNS policies are active — for example, to block social media only during work hours or to temporarily allow access to a restricted site for a maintenance window. You can configure a policy to be active during specific time periods or set the policy to expire after a certain duration.

There are two timed DNS policy options:

* [Policy duration](#policy-duration): The policy is active for a specific amount of time after being turned on (for example, 30 minutes).
* [Policy schedule](#policy-schedule): The policy is active during a recurring weekly schedule (for example, weekdays from 9 AM to 5 PM).

## Policy duration

You can use a time-based policy duration to set a specific time frame for the policy to turn on or configure an exact time for the policy to turn off.

To set a duration for a DNS policy:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies** \> **DNS**.
2. Create a new DNS policy or choose an existing policy and select **Edit**.
3. In **Apply durations and schedules**, turn on **Policy duration**.
4. In **Input method**, choose the type of duration:  
   * Choose _Duration_ and enter a specific amount of time until the policy turns off.  
   * Choose _Exact end date_ and enter a specific date and time in your account's time zone for the policy to turn off.
5. Select **Save policy**.

When a policy turns off, it will remain off until you turn it back on.

Warning

The duration timer does not pause when you turn the policy off. It is calculated as an absolute end time from when the policy was first turned on.

For example, you can create a policy at 12:00 PM and set it to turn off after six hours. If you turn the policy off at 3:00 PM and turn it back on at 4:00 PM, the policy will still turn off at 6:00 PM — six hours after the original activation time, not six hours of cumulative active time.

### Reset a policy's duration

When a policy's time duration expires, you can turn the policy back on for the duration you originally configured. To reset a policy's duration, select the policy and choose **Reset policy duration**.

For policies with an exact end time, you can change the time before the policy turns off. Once the policy reaches its exact end time, you will need to edit the policy and set a new end time. To set a new exact end time:

1. Select the policy.
2. Choose **Edit**.
3. Turn on **Set a policy duration**.
4. In **Input method**, choose _Exact end date_. In **Date and time**, enter a new date and time for the policy to turn off.
5. Select **Save policy**.

## Policy schedule

You can use Gateway to create a new DNS policy with a schedule or add a schedule to an existing policy.

* [ Dashboard ](#tab-panel-7600)
* [ API ](#tab-panel-7601)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Firewall policies** \> **DNS**.
2. Create a new DNS policy or choose an existing policy and select **Edit**.
3. In **Apply durations and schedules**, turn on **Policy schedule**.
4. (Optional) In **Time Zone**, choose a time zone to apply the policy based on the time zone you select, regardless of the user's location. By default, Gateway will use the end user's time zone to apply the policy based on the local time of the user making the DNS query.
5. In **Schedule template**, choose a preset schedule, or choose _Custom schedule_ to define a custom schedule. You can choose up to three non-overlapping time ranges of 15 minute intervals.
6. Select **Save policy**.

To schedule a policy with the API, use the [Create a Zero Trust Gateway rule endpoint](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/create/) with the `schedule` parameter set to your desired days of the week, times of day, and an optional time zone. For example:

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "action": "block",

    "name": "Block gambling sites on weekends",

    "traffic": "any(dns.content_category[*] in {\"Gambling\"})",

    "schedule": {

        "sat": "08:00-17:00",

        "sun": "08:00-17:00",

        "timezone": "Europe/Paris"

    }

  }'


```

The policy's schedule will appear in the Cloudflare dashboard under **Zero Trust** \> **Traffic policies** \> **Firewall policies** \> **DNS** when you select the policy.

### How Gateway determines time zone

If you [assign a time zone](#example-fixed-time-zone) to your schedule, Gateway will always use the current time at that time zone regardless of the user's location. This allows you to enable a policy during a certain fixed time period.

If you [do not specify a time zone](#example-users-time-zone), Gateway will enable the DNS policy based on the user's local time zone. The user's time zone is inferred from the IP geolocation of their source IP address. If Gateway is unable to determine the time zone from the source IP, it will fall back to the time zone of the data center where the query was received.

Note

Users on VPNs or corporate proxies may have their time zone inferred incorrectly, because their source IP geolocates to the VPN exit point rather than their physical location. If consistent enforcement is important, assign a fixed time zone to the schedule.

#### Example: Fixed time zone

The following command creates a DNS policy to block `facebook.com` only on weekdays from 8:00 AM - 12:30 PM and 1:30 PM - 5:00 PM in the Chicago, USA time zone.

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "office-no-facebook-policy",

    "action": "block",

    "traffic": "dns.fqdn == \"facebook.com\"",

    "enabled": true,

    "schedule": {

        "time_zone": "America/Chicago",

        "mon": "08:00-12:30,13:30-17:00",

        "tue": "08:00-12:30,13:30-17:00",

        "wed": "08:00-12:30,13:30-17:00",

        "thu": "08:00-12:30,13:30-17:00",

        "fri": "08:00-12:30,13:30-17:00"

    }

  }'


```

Refer to [this table ↗](https://en.wikipedia.org/wiki/List%5Fof%5Ftz%5Fdatabase%5Ftime%5Fzones#List) for a list of all time zone identifiers.

#### Example: User's time zone

The following command creates a DNS policy to block `clockin.com` only on weekends in the time zone where the user is currently located.

Create a Zero Trust Gateway rule

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "clock-in-policy",

    "action": "block",

    "traffic": "dns.fqdn == \"clockin.com\"",

    "enabled": true,

    "schedule": {

        "sat": "00:00-24:00",

        "sun": "00:00-24:00"

    }

  }'


```

Note

Gateway will not change the policy's `enabled` status when inside or outside of the time period specified. When enabled, Gateway activates or deactivates the policy according to its schedule. When disabled, the policy is always deactivated.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/timed-policies/#page","headline":"Timed DNS policies · Cloudflare One docs","description":"Reference information for Timed DNS policies in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/timed-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS","REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/dns-policies/","name":"DNS policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/dns-policies/timed-policies/","name":"Timed DNS policies"}}]}
```
