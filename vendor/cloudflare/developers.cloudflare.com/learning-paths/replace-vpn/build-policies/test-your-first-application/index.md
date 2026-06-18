---
title: Test your first application
description: Test Zero Trust policies on an application.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Test your first application

You have now set up your [Zero Trust organization](https://developers.cloudflare.com/learning-paths/replace-vpn/get-started/), [configured the Cloudflare One Client](https://developers.cloudflare.com/learning-paths/replace-vpn/configure-device-agent/), [installed it on devices](https://developers.cloudflare.com/learning-paths/replace-vpn/connect-devices/), and created your [Access and Gateway policies](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/). The next step is to test those policies.

## 1\. Manually test your policies

Test if the Access or Gateway policy that you configured is working by using a device with the Cloudflare One Client installed to reach an internal application or external website.

If you cannot reach an application protected by Access or an external application through Gateway as expected, Cloudflare recommends starting with reviewing your Cloudflare One Client configuration.

### 1.1\. Troubleshoot the Cloudflare One Client

If your manual test fails, troubleshoot the Cloudflare One Client. Cloudflare recommends starting with reviewing your Cloudflare One Client configuration because misconfiguration is the most common cause of connectivity issues.

* [WARP troubleshooting guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/troubleshooting-guide/): Step-by-step instructions to debug Cloudflare One Client issues.
* [Cloudflare One Client errors](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/client-errors/): If you are receiving an error, review the associated solutions.
* [Cloudflare One Client connectivity status](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/connectivity-status/): Review the connectivity stage of the WARP daemon as it establishes a connection from the device to Cloudflare.
* [WARP with Firewall](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/): Ensure you have exempted the correct IP addresses and domains to allow the Cloudflare One Client to connect.

### 1.2\. Review analytics

Analytics provide visualizations of [log data](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/test-your-first-application/#review-logs). To review Access or Gateway analytics:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Analytics** \> **Dashboards**.
2. Select **[Access event analytics](https://developers.cloudflare.com/cloudflare-one/insights/analytics/access/)** for a summary of login events or **[Application Access Report](https://developers.cloudflare.com/cloudflare-one/insights/analytics/application-access/)** for a summary of overall Access Activity.
3. Select the **HTTP request analytics**, **DNS query analytics** or **Network session analytics** depending on [your Gateway investigation scope](https://developers.cloudflare.com/cloudflare-one/insights/analytics/gateway/).

### 1.3\. Review logs

[Logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/) provide event-level (such as an authentication attempt or a DNS query) visibility into your Cloudflare One environment.

To review traffic activity for applications protected by Access:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Logs**.
2. Select **Access authentication logs**.
3. Review the [per-request logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/access-authentication-logs/#per-request-logs) for your application.

To review traffic activity in the [Gateway logs](https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/gateway-logs/):

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights** \> **Logs**.
2. Select **HTTP request logs**, **Network logs**, or **DNS query logs** depending on your investigation scope.

Refer to [Troubleshoot Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/troubleshoot-gateway/) to troubleshoot common issues with Gateway egress policies.

## 2\. Monitor your policies and device connectivity

After you confirm your policies work by testing manually, use DEX to monitor connectivity and performance over time.

Digital Experience Monitoring (DEX) provides visibility into device, network, and application performance across your Zero Trust organization.

With DEX, you can monitor the state of your [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) deployment and resolve issues impacting end-user productivity. DEX is designed for IT and security teams who need to proactively monitor and troubleshoot device and network health across distributed environments. DEX is available on all Cloudflare Zero Trust and SASE plans.

Refer to [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) for more information.

### Example use case

* Imagine that you have three devices, with the Cloudflare One Client installed, set up in your testing environment.
* You have set up a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) and an [Access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for your internal wiki that is available at `wiki.acme.org`.
* You [manually tested](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/test-your-first-application/#manually-test-your-policies) the three Cloudflare One Client devices, and you confirmed they can all reach `wiki.acme.org`.
* You want to set up automated connectivity and performance testing to `wiki.acme.org` for each of these Cloudflare One Client devices so you can monitor them over time.
* You set up a DEX test, and it sends an HTTP GET request to `wiki.acme.org` from all three devices on a five minute interval.
* If device connectivity drops, or if there are performance problems, you can see the DEX test results to troubleshoot the problem.

### 2.1\. Create a DEX test

With Digital Experience Monitoring (DEX), you can test if your devices can connect to a private or public endpoint through the Cloudflare One Client. Tests allow you to monitor availability for a given application and investigate performance issues reported by your end users.

Refer to [DEX tests](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) for more information.

An HTTP test sends a `GET` request from an end-user device to a specific web application. You can use the response metrics to troubleshoot connectivity issues. For example, you can check whether the application is inaccessible for all users in your organization, or only certain ones.

To set up an HTTP test for an application:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Insights** \> **Digital experience**.
2. Select the **Tests** tab.
3. Select **Add a Test**.
4. Fill in the following fields:  
   * **Name**: Enter any name for the test.  
   * **Target**: Enter the URL of the website or application that you want to test (for example, `https://jira.site.com`). Both public and private hostnames are supported. If testing a private hostname, ensure that the domain is on your [local domain fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) list.  
   * **Source device profiles**: (Optional) Select the [device profiles](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) that you want to run the test on. If no profiles are selected, the test will run on all supported devices connected to your Zero Trust organization.  
   * **Test type**: Select _HTTP Get_.  
   * **Test frequency**: Specify how often the test will run. Input a minute value between 5 and 60.
5. Select **Add test**.
6. After the test is created and running, you can [view the results](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/view-results/) of your test.

#### HTTP test results

An HTTP test measures the following data:

| Data                 | Description                                                                                                                                                               |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Resource fetch time  | Total time of all steps of the request, measured from [startTime to responseEnd ↗](https://developer.mozilla.org/en-US/docs/Web/API/Performance%5FAPI/Resource%5Ftiming). |
| Server response time | Round-trip time for the device to receive a response from the target.                                                                                                     |
| DNS response time    | Round-trip time for the DNS query to resolve.                                                                                                                             |
| HTTP status codes    | [Status code ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) returned by the target.                                                               |

### 2.2\. Set up notifications

Administrators can receive alerts when Cloudflare detects connectivity issues with the Cloudflare One Client or degraded application performance. Notifications can be delivered via email, webhook, and third-party services.

Refer to [DEX Notifications](https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/) for more information on DEX-specific notifications.

#### Device anomaly notification setup

Customers who want to be notified when Cloudflare detects a spike or drop in the number of devices connected to the Cloudflare One Client can create a [Device connectivity anomaly](https://developers.cloudflare.com/cloudflare-one/insights/dex/notifications/#available-notifications) notification.

To create a device connectivity anomaly notification:

1. In the Cloudflare dashboard, go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. Select **Add**.
3. Find **Product** DEX and **Alert type** Device connectivity anomaly, and choose **Select**.
4. Name the notification.
5. Enter an email address to receive the notifications or set up a [webhook](https://developers.cloudflare.com/notifications/get-started/configure-webhooks/).
6. (Optional) Specify any additional options for the notification, if required. For example, some notifications require that you select one or more domains or services.
7. Select **Create**.

Refer to [Notifications](https://developers.cloudflare.com/notifications/get-started/) for more information on editing, testing, and disabling notifications.

## Conclusion

Once your policies are live, you can use [DEX tests](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/test-your-first-application/#create-a-dex-test) and [notifications](https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/test-your-first-application/#notifications) to ensure your team has secure, reliable access to internal and external resources.

How it all works together

To learn how to use Logs, Analytics, and DEX together during real-world situations, like onboarding, daily monitoring, and troubleshooting, refer to [Insights](https://developers.cloudflare.com/cloudflare-one/insights/) for more example use cases.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/test-your-first-application/#page","headline":"Test your first application · Cloudflare Learning Paths","description":"Test Zero Trust policies on an application.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/build-policies/test-your-first-application/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/build-policies/","name":"Build secure access policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/build-policies/test-your-first-application/","name":"Test your first application"}}]}
```
