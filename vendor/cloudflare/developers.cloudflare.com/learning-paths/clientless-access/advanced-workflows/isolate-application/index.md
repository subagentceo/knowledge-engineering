---
title: Isolate Access applications
description: Learn about isolate access applications in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Isolate Access applications

Note

Requires the Browser Isolation add-on.

[Cloudflare Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) integrates with your web-delivered Access applications to protect sensitive applications from data loss. You can build Access policies that require certain users to access your application exclusively through Browser Isolation, while other users matching different policies continue to access the application directly. For example, you may wish to layer on additional security measures for third-party contractors or other users without a corporate device.

Cloudflare sends all isolated traffic through our Secure Web Gateway inspection engine, which allows you to apply [Gateway HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) such as:

* Restrict specific actions and HTTP request methods.
* Inspect the request body to match against [Data Loss Prevention](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/) (DLP) profiles with as much specificity and control as if the user had deployed an endpoint agent.
* Control users ability to cut and paste, upload and download files, or print while in an isolated session.

## Prerequisites

Your browser must [allow third-party cookies](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/#allow-third-party-cookies-in-the-browser) on the application domain.

## Enable Browser Isolation

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Browser isolation** \> **Browser isolation settings**.
2. Turn on **Allow users to open a remote browser without the device client**.
1. Go to **Access controls** \> **Applications**.
2. Choose a [self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) and select **Configure**.
3. Go to **Policies**.
4. Choose an [Allow policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) and select **Configure**.
5. Under **Additional settings**, turn on **Isolate application**.
6. Save the policy.

Browser Isolation is now enabled for users who match this policy. After the user logs into Access, the application will launch in a remote browser. To confirm that the application is isolated, refer to [Check if a web page is isolated](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/#3-check-if-a-web-page-is-isolated).

You can optionally add another Allow policy for users on managed devices who do not require isolation.

## Example Access policies

In the following example, Policy 1 allows employees on corporate devices to access the application directly. Users who do not match Policy 1, such as employees and contractors on unmanaged devices, will load the application in an isolated browser.

flowchart LR
accTitle: Access policies for a private web application
A[Full-time employee]-->policy1-->D
B[Contractor]-->policy2-->E
subgraph C[Access application]
  policy1["Policy 1:
  Allow employees
  who pass device posture checks"]
  policy2["Policy 2:
  Allow and isolate contractors"]
end
D[Normal browsing]
E["Isolated browsing
with HTTP policies applied"]

**Policy 1: Allow employees who pass device posture checks**

* [ Dashboard ](#tab-panel-9033)
* [ API ](#tab-panel-9034)

| Action  | Rule type                                                                                                                                             | Selector                 | Value     |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | --------- |
| Allow   | Include                                                                                                                                               | Emails ending in         | @team.com |
| Require | [Device Posture - Serial Number List](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/) | Corporate serial numbers |           |

| Additional settings | Status   |
| ------------------- | -------- |
| Isolate application | Disabled |

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_UUID/policies \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

  "decision": "allow",

  "name": "Allow employees who pass device posture checks",

  "include": [

    {

      "email_domain": {

        "domain": "team.com"

      }

    }

  ],

  "exclude": [],

  "require": [

    {

      "device_posture": {

        "integration_uid": "<SERIAL_NUMBER_LIST_UUID>"

      }

    }

  ],

  "precedence": 1

}'


```

To create a list of serial numbers, refer to [Create Zero Trust list](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/lists/methods/create/).

**Policy 2: Allow and isolate contractors**

* [ Dashboard ](#tab-panel-9035)
* [ API ](#tab-panel-9036)

| Action | Rule type | Selector         | Value                       |
| ------ | --------- | ---------------- | --------------------------- |
| Allow  | Include   | Emails ending in | @team.com, @contractors.com |

| Additional settings | Status  |
| ------------------- | ------- |
| Isolate application | Enabled |

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/apps/$APP_UUID/policies \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

  "decision": "allow",

  "name": "Allow and isolate contractors",

  "include": [

    {

      "email_domain": {

        "domain": "team.com"

      }

    },

    {

      "email_domain": {

        "domain": "contractors.com"

      }

    }

  ],

  "exclude": [],

  "require": [],

  "precedence": 2,

  "isolation_required": true

}'


```

## Example HTTP policies

### Disable file downloads in isolated browser

Prevents users on unmanaged devices from downloading any files from your private application.

* [ Dashboard ](#tab-panel-9037)
* [ API ](#tab-panel-9038)

| Selector                     | Operator | Value                    | Logic | Action  |
| ---------------------------- | -------- | ------------------------ | ----- | ------- |
| Host                         | in       | internal.site.com        | And   | Isolate |
| Passed Device Posture Checks | not in   | Corporate serial numbers |       |         |

| Policy settings        | Status  |
| ---------------------- | ------- |
| Disable file downloads | Enabled |

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

  "name": "Disable file downloads in isolated browser",

  "conditions": [

    {

      "type": "traffic",

      "expression": {

        "in": {

          "lhs": "http.request.host",

          "rhs": [

            "internal.site.com"

          ]

        }

      }

    },

    {

      "type": "device_posture",

      "expression": {

        "any": {

          "in": {

            "lhs": {

              "splat": "device_posture.checks.passed"

            },

            "rhs": [

              "<SERIAL_NUMBER_LIST_UUID>"

            ]

          }

        }

      }

    }

  ],

  "action": "isolate",

  "precedence": 14002,

  "enabled": true,

  "description": "",

  "rule_settings": {

    "block_page_enabled": false,

    "block_reason": "",

    "biso_admin_controls": {

      "dcp": false,

      "dcr": false,

      "dd": true,

      "dk": false,

      "dp": false,

      "du": false

    }

  },

  "filters": [

    "http"

  ]

}'


```

To create a list of serial numbers, refer to [Create Zero Trust list](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/lists/methods/create/).

### Block file downloads of sensitive data

Note

Requires Data Loss Prevention add-on.

Block users on unmanaged devices from downloading files that contain credit card numbers. This logic requires two policies:

* **Policy 1: [Disable file downloads in isolated browser](https://developers.cloudflare.com/learning-paths/clientless-access/advanced-workflows/isolate-application/#disable-file-downloads-in-isolated-browser)**
* **Policy 2: Block credit card numbers**

* [ Dashboard ](#tab-panel-9039)
* [ API ](#tab-panel-9040)

| Selector                                                                                           | Operator | Value                      | Logic | Action |
| -------------------------------------------------------------------------------------------------- | -------- | -------------------------- | ----- | ------ |
| Host                                                                                               | in       | internal.site.com          | And   | Block  |
| [DLP Profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/) | in       | _Financial Information_    | And   |        |
| Passed Device Posture Checks                                                                       | not in   | _Corporate serial numbers_ |       |        |

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/rules \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

  "name": "Block credit card numbers",

  "conditions": [

    {

      "type": "traffic",

      "expression": {

        "and": [

          {

            "in": {

              "lhs": "http.request.host",

              "rhs": [

                "internal.site.com"

              ]

            }

          },

          {

            "any": {

              "in": {

                "lhs": {

                  "splat": "dlp.profiles"

                },

                "rhs": [

                  "<DLP_PROFILE_UUID>"

                ]

              }

            }

          }

        ]

      }

    },

    {

      "type": "device_posture",

      "expression": {

        "any": {

          "in": {

            "lhs": {

              "splat": "device_posture.checks.passed"

            },

            "rhs": [

              "<SERIAL_NUMBER_LIST_UUID>"

            ]

          }

        }

      }

    }

  ],

  "action": "block",

  "precedence": 14003,

  "enabled": true,

  "description": "",

  "rule_settings": {

    "block_page_enabled": false,

    "block_reason": "",

    "biso_admin_controls": null

  },

  "filters": [

    "http"

  ]

}'


```

To configure a DLP profile, refer to [Update predefined profile](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/dlp/subresources/profiles/subresources/predefined/methods/update/) or [Create custom profile](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/dlp/subresources/profiles/subresources/custom/methods/create/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/advanced-workflows/isolate-application/#page","headline":"Isolate Access applications · Cloudflare Learning Paths","description":"Learn about isolate access applications in this guide.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/advanced-workflows/isolate-application/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/advanced-workflows/","name":"Advanced workflows"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/advanced-workflows/isolate-application/","name":"Isolate Access applications"}}]}
```
