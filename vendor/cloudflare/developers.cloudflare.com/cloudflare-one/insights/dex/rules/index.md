---
title: Rules
description: Reference information for Rules in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rules

DEX rules allow you to create and manage testing policies for targeted user groups within your [fleet](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) (all devices with the Cloudflare One Client installed and connected to your Zero Trust organization). After creating a rule, you can use it to define the scope of a [test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/) to specific groups such as departments (like finance or sales), devices, and/or users. You can apply and reuse rules on your desired tests.

Use DEX rules to scope a test to a specific group within your fleet for more precise problem detection and resolution.

## Create a rule

To create a rule:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Insights** \> **Digital experience**.
2. Select the **Rules** tab.
3. Select **Add a rule**.
4. Give your rule a name and build your desired expressions.
5. Select **Create rule** to finalize your rule.

### Selectors

Selectors are required categories in a DEX rule expression that define a group within a fleet. The selector(s) you have defined in a rule will determine which group a test will impact.

Review the available selectors and their scope in the following list.

| Selector                     | Description                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **User email**               | For specifying [user emails](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#user-email).                                    |
| **User group emails**        | For specifying [group emails](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#user-group-email).                             |
| **User group IDs**           | For specifying [group IDs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#user-group-ids).                                  |
| **User group names**         | For specifying a [group name](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#user-group-names).                             |
| **Operating systems**        | For specifying operating systems.                                                                                                                                  |
| **Operating system version** | For specifying an operating system version (use Operator in) or versions (use Operator is).                                                                        |
| **Managed network**          | For specifying users accessing the network from the office (managed network) compared to those accessing remotely.                                                 |
| **SAML attributes**          | For specifying a value from the [SAML Attribute Assertion](https://developers.cloudflare.com/cloudflare-one/traffic-policies/identity-selectors/#saml-attributes). |
| **Colos**                    | For specifying a Cloudflare data center (colocation) that users are connected to.                                                                                  |

## Add a rule to a test

After you have created a rule, you can add it to a test. If you do not add a rule to a test, the test will run on your entire device fleet.

To add a rule to a test:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Insights** \> **Digital experience**.
2. Select the **Tests** tab.
3. Choose an existing test and select **Edit**, or select **Add a test** to make a new test.
4. Under **Select DEX rules**, select the rule you would like to apply.
5. Select **Save test** for an existing rule or **Add rule** for the new test.

Note

It may take up to 10 minutes for newly updated settings to propagate to devices.

To view which tests a rule is being applied to:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Insights** \> **Digital experience**.
2. Select the **Rules** tab.
3. Choose a rule and select **Edit**.
4. Select the **DEX tests** tab and review the list of tests that include your selected rule.

## Create a test using a rule

You can create a new test from the [DEX test dashboard as described above](https://developers.cloudflare.com/cloudflare-one/insights/dex/rules/#add-a-rule-to-a-test) or directly from the DEX rules dashboard.

To create a new test using a rule from DEX rules:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Insights** \> **Digital experience**.
2. Select the **Rules** tab.
3. Select a rule and select **Edit**.
4. Select the **DEX tests** tab.
5. You will be able to review all the tests that currently include this rule. To create a new test, select **Create a test using this rule**.
6. Enter all required information, making sure that the box next to your rule name is checked.
7. Select **Add test**.

## Related resources

* [DEX HTTP test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/http/) \- Assess the accessibility of a web application.
* [DEX Traceroute test](https://developers.cloudflare.com/cloudflare-one/insights/dex/tests/traceroute/) \- Measure the network path of an IP packet from an end-user device to a server.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/dex/rules/#page","headline":"Rules · Cloudflare One docs","description":"Reference information for Rules in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/dex/rules/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/rules/","name":"Rules"}}]}
```
