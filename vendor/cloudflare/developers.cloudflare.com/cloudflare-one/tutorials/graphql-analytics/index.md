---
title: GraphQL Analytics
description: Use the GraphQL Analytics API to review data for Cloudflare Network Firewall network traffic related to rules matching your traffic.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# GraphQL Analytics

**Last reviewed:**  over 4 years ago 

Use the GraphQL Analytics API to review data for Cloudflare Network Firewall network traffic related to rules matching your traffic. This contains both rules you configured in the Cloudflare Network Firewall dashboard, and the rules managed by Cloudflare as a part of [Cloudflare Network Firewall Managed rules](https://developers.cloudflare.com/cloudflare-network-firewall/how-to/enable-managed-rulesets/) and [Cloudflare Network Firewall IDS](https://developers.cloudflare.com/cloudflare-network-firewall/about/ids/) features.

Before you begin, you must have an [API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/). For additional help getting started with GraphQL Analytics, refer to [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/).

## Obtain Cloudflare Account ID

To construct a Network Firewall GraphQL query for an object, you will need a Cloudflare Account ID

### Obtain your Cloudflare Account ID

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account.
2. The URL in your browser's address bar should show `https://dash.cloudflare.com/` followed by a hex string. The hex string is your Cloudflare Account ID.

### Obtain the rule ID for a firewall rule

To construct queries to gather analytics for a particular rule, you need the rule ID for each firewall rule.

1. In the Cloudflare dashboard, go to the **Cloudflare Network Firewall** page.  
[ Go to **Firewall policies** ](https://dash.cloudflare.com/?to=/:account/network-security/magic%5Ffirewall)
2. In the **Custom rules** tab, locate the rule you need the rule ID for from the list and select the three dots > **Edit**.
3. Locate the **Rule ID** and select the copy button.
4. Select **Cancel** to return to the **Cloudflare Network Firewall** page.

## Explore GraphQL schema with Cloudflare Network Firewall query example

In this section, you will run a test query to retrieve a five minute count of all configured Cloudflare Network Firewall rules within five minute intervals. You can copy and paste the code below into GraphiQL.

For additional information about the Analytics schema, refer to [Explore the Analytics schema with GraphiQL](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/).

```

query MagicFirewallExample($accountTag: string!, $start: Time, $end: Time) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      magicFirewallSamplesAdaptiveGroups(

        filter: { datetime_geq: $start, datetime_leq: $end }

        limit: 2

        orderBy: [datetimeFiveMinute_DESC]

      ) {

        sum {

          bits

          packets

        }

        dimensions {

          datetimeFiveMinute

          ruleId

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAsgQwOYEsDGAxFEwHcEA2BAogB4IC2ADgWABQAkCaaA9iAHYAuAKsgFwwAzlwgoOSAIQAaGAxEIIXQTxQUwshmA4ATFWrABKGAG8AUDBgA3FHkimLlmMzacuQugDMUBLpEEmzizs3HxIgkzBbmEwAL7G5k5OFMjoWDj4RADKlDRgQgCCOghUXChWYADiEOxUHo5Jlt6+-qYwxX5l6gD6SGDAEQpKsh1gXWDdtANy2jpxDY0EaijKMABMC0msEDqQAEJQggDao+NYFXDiIH7dACLEWQDCALqbMAlvlkIgFA6NjQAjFZCT5OKjMADWYxB-0ssVBOgMHCEKFYyL+sMspwM5zAlw41zAoMsEBAtAAkjpQfD-jSnHT4bEgA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQBnRMAJ0SxACYAGbgGwBaXsICMAdmRiAHJlmYAzDIBaDEAFN4AEy59BI8TOS9e8ucrUBfIA)

## Example queries for Cloudflare Network Firewall

### Obtain analytics for a specific rule

Use the example below to display the total number of packets and bits for the top ten suspected malicious traffic streams within the last hour. After receiving the results, you can sort by packet rates with a five minute average.

For each stream, display the:

* Source and destination IP addresses
* Ingress Cloudflare data centers that received it
* Total traffic volume in bits and packets received within the hour
* Actions taken by the firewall rule

```

query MagicFirewallObtainRules(

  $accountId: string!

  $ruleId: string

  $start: Time

  $end: Time

) {

  viewer {

    accounts(filter: { accountTag: $accountId }) {

      magicFirewallNetworkAnalyticsAdaptiveGroups(

        filter: { ruleId: $ruleId, datetime_geq: $start, datetime_leq: $end }

        limit: 10

        orderBy: [avg_packetRateFiveMinutes_DESC]

      ) {

        sum {

          bits

          packets

        }

        dimensions {

          coloCity

          ipDestinationAddress

          ipSourceAddress

          outcome

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAsgQwOYEsDGAxFEwHcEA2BA8gEYAuCKAdgEogFgDOAFAFAwwAkCaaA9iGrkAkgBMAXDCbkINJAEIO3CAzDipMudSTKuMhBHJSAKigC2YPWGqSYZy2wCUMAN7KAbijyQ3yzrwCQuSsAGYoBOSQUq4wgYLCJshSPHwJomIwAL4u7pz5MObI6Fg4+EQAcmDkuPwQANYAgtSEUOToTI1iCAAO7R5gAOIQgj2s-gUw4ZHRbjCqjBoqauIANDDdUe2WAPpIYMApBkbrm9UWYDuMh9w2mVkTBQQWKMYwAIwADI-5dWKQACEoFIANoIDxIHY9Xj1aq0BBRLADOA0EBRJg7AAiAFEAMoAYQAuj9cj9OEwQOY-JNJqRXkwyfloWhYSFGQ8aZwxBdqEwUPxedTOZwBAR+PjXlBGZwUD1Mcx2i12gKumIcEwGcKZT1cYIIGgwKr1ZqtYJyAJHMKOZNrZxrQ8skA&variables=N4IghgxhD2CuB2AXAkgExALhAJQKIAUAZAQQGFcB9AdWQBUAJC5AERABoQAnWAGwFM0mHARLlqdRi3YgAzojCdEQgEwAGZQDYAtKu0BGAOy09ADgymMAZhMAtaX3josazTv0naq1ebPW7AXyA)

### Obtain IDS analytics

Use the example below to display the total number of packets and bits for the top 10 traffic streams that Cloudflare Network Firewall IDS has detected in the last hour.

By setting `verdict` to `drop` and `outcome` as `pass`, we are filtering for traffic that was marked as a detection (i.e. verdict was drop) but was not dropped (for example, outcome was `pass`). This is because currently, Cloudflare Network Firewall IDS only detects malicious traffic but does not drop the traffic.

For each stream, display the:

* Source and destination IP addresses.
* Ingress Cloudflare data centers that received it.
* Total traffic volume in bits and packets received within the hour.

```

query MagicFirewallObtainIDS($accountTag: string!, $start: Time, $end: Time) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      magicIDPSNetworkAnalyticsAdaptiveGroups(

        filter: {

          datetime_geq: $start

          datetime_leq: $end

          verdict: drop

          outcome: pass

        }

        limit: 10

        orderBy: [avg_packetRateFiveMinutes_DESC]

      ) {

        sum {

          bits

          packets

        }

        dimensions {

          coloCity

          ipDestinationAddress

          ipSourceAddress

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAsgQwOYEsDGAxFEwHcEA2BA8gEYAuCKAdgJIAiAygBQAkCaaA9iNeQCrIAXDADO5CDSQBCADQxW4hBHIj+KALZh5rMNQAmazWACUMAN4AoGDABuKPJAvWbMDt17lRzAGYoC5JAi5m6cPHyCSCLsYZ6RMAC+ZlaurhrI6AwACowAcmDkuFwQANYAgtSEUOToomX6CAAONbZgAOIQPI3eLqk2fgFBzn19DYE1WgD6SGDA0UoqvSMwYwXGkwSz0Xr6SyOtEProqiudjXt9POTcWiKNCKKiFzYJzzAEmignAIwADG-FfSQABCUBEAG0ELYkJN7mgSgUAEoIQJYVpwGggQKiSb0ACijAAwgBdC7JN6iEAaYbLGykL5PWk2OEIrxvV60o5aaiiFBcHk02ncAhcQlfKBvGwoRr0MDiGgovnUer6HCPSUwaWMHgQNBgFVqxnLDl9E0vFyvBJAA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQBnRMAJ0SxACYAGbgGwBaXsICMAdmRiAHJlmYAzDIBaDEAFN4AEy59BI8TOS9e8ucrUBfIA)

Alternatively, to inspect all traffic that was analyzed, but grouped into malicious traffic and other traffic, the example below can be used. The response will contain two entries for each five minute timestamp. `verdict` will be set to `drop` for malicious traffic, and `verdict` will be set to `pass` for traffic that did not match any of the IDS rules.

```

query MagicFirewallTraffic($accountTag: string!, $start: Time, $end: Time) {

  viewer {

    accounts(filter: { accountTag: $accountTag }) {

      magicIDPSNetworkAnalyticsAdaptiveGroups(

        filter: { datetime_geq: $start, datetime_leq: $end }

        limit: 10

        orderBy: [avg_packetRateFiveMinutes_DESC]

      ) {

        sum {

          bits

          packets

        }

        dimensions {

          coloCity

          ipDestinationAddress

          ipSourceAddress

          verdict

        }

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBAsgQwOYEsDGAxFEwHcEA2BAKhAgGbnoAUAJAmmgPYgB2ALscgFwwDO7CClZIAhABoYtAQgjtexFAFswk2mFYATBcrABKGAG8AUDBgA3FHkhHTZmA2Zt2falQLtIvQw8YsOXEi89H7OgTAAvgYm9vZKyOgAkgAiAAoAygByYOy4TBAA1gCCrIRQ7Oh8RZoIAA4V5mAA4hAsta52sWbunhDeMDWeFSoA+khgwMEycpKDObojBBPBGpqRnV0EyijyMACMAAwbsfmakABCULwA2gjmSCO1DAU5AEoInliNcMIgnnwjZIAUXSAGEALrHGDRKFmPggJS2LpdABGOz4sPsTzQLxcmIimM0ulYfBQTBJSOR9mYBCYoJ2UExZhQtWSYAEwg+ZNY1U0OD4GKp9hZ6RYEDQYF5-MFQoskCJaHY+KhBNiqvWESAA&variables=N4IghgxhD2CuB2AXAKmA5iAXCAggYTwHkBVAOWQH0BJAERABoQBnRMAJ0SxACYAGbgGwBaXsICMAdmRiAHJlmYAzDIBaDEAFN4AEy59BI8TOS9e8ucrUBfIA)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/tutorials/graphql-analytics/#page","headline":"GraphQL Analytics · Cloudflare One docs","description":"Use the GraphQL Analytics API to review data for Cloudflare Network Firewall network traffic related to rules matching your traffic.","url":"https://developers.cloudflare.com/cloudflare-one/tutorials/graphql-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GraphQL"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/tutorials/graphql-analytics/","name":"GraphQL Analytics"}}]}
```
