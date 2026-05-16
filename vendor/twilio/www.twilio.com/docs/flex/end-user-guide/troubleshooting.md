# User Guide to Troubleshooting the Flex UI

Depending on the situation, there are many ways to troubleshoot errors and other issues that you encounter while using Flex UI. This article describes some errors you might see, and how you can use the Status Report (formerly known as Debugger UI) to generate error reports you can use in troubleshooting.

If you're a developer looking to build customized error monitoring and reporting, check out the [developer documentation](/docs/flex/developer/ui/troubleshoot-the-flex-ui) instead.

## Types of errors

As you use Flex UI, you may encounter errors from:

* Third-party packages (like React, Redux, or Material UI) and Twilio packages (like Chat SDK or Sync SDK) used by Flex UI
* Custom plugins that you've built
* Flex UI itself

Errors from these sources can significantly degrade Flex functionality or lead to other unexpected behaviors.

Some of these issues are quick fixes (for example, checking your network connection). Others may require help from admins, developers, or additional support. In each case, fixing an error starts by understanding its cause and getting any additional context about the issue.

## Where errors appear

Flex can notify you about errors in these ways:

* During Flex initialization with the error page
* With an error notification
* In the Status Report (introduced in Flex UI `1.32`)

### Flex initialization errors

![Twilio Flex error: Cannot initialize due to service errors with options to retry or download report.](https://docs-resources.prod.twilio.com/437ca267f8b113844c7f91472f967e3d23c6e7bacd6556ee3126d1a4f3f04e68.png)

In most cases, if Flex experiences an issue, it's still able to start. If some of the services or components aren't available during Flex initialization, it starts in Degraded mode. However, some issues can also prevent Flex from initializing. These are mostly issues with connectivity or authentication or an ongoing incident with one of the Twilio services which is a critical component for Flex UI normal function.

If Flex UI fails to initialize, user sees an error message and an option to retry or [download a report](/docs/flex/end-user-guide/troubleshooting#error-report) with more details about the error.

Possible error messages:

* "Log in failed. Please contact your administrator and try again later."
* "We're not able to log you in right now - this might be due to an ongoing incident we're experiencing. Contact your administrator and try again later."

You can see a full list of all Twilio services, their statuses and ongoing incidents on the [Twilio Status page](https://status.twilio.com/).

### Flex UI Degraded mode

Flex platform relies on multiple Twilio services and components for it to function properly. Starting from [Flex UI v 1.31](/docs/flex/release-notes/ui-release-notes#v-1310) Flex UI will initialize with limited capabilities, even if some of the components like SDK's (TaskRouter, Conversations, Voice or Sync) are down. In case of disruptions in Twilio services, Flex users are able to log in to Flex and perform certain tasks that are still available. For example, in the case of Twilio Voice experiencing an incident, your agents can still handle messaging tasks.

Users will see a notification informing them of a possible disruption in the normal work of Flex UI and they will be able to download a thorough [report](/docs/flex/end-user-guide/troubleshooting#error-report) with error details and logs.

You can find the list of components that Flex UI relies on and can start in degraded mode in the [Flex UI API reference](https://assets.flex.twilio.com/docs/releases/flex-ui/2.6.1/overview/ClientManagerHelpers/).

Plugin developers can also force degraded mode of each Flex UI component when developing and testing plugins, to make sure that plugins can handle disruptions gracefully. Check out our [developer docs for error handling and debugging in Flex UI for more information](/docs/flex/developer/ui/errors-and-debugging#flex-ui-degraded-mode-and-client-manager).

### Warning and Error notifications

Flex handles a collection of common errors with custom, integrated error notifications. For these handled errors, like errors when dialing a phone number, Flex displays an error notification with an error code.

### Status Report

Turn on Status Report on the [**Opt-in features**](https://console.twilio.com/us1/develop/flex/settings/features) page in Twilio Console. You must be running Flex UI `v.1.32` or higher.

> \[!NOTE]
>
> This feature was previously known as the Debugger UI and was available in Public Beta from `v1.25`.

All other errors (unhandled errors) appear in the Status Report. You can open it by clicking the **Status Report** icon in the Main Header. If an unhandled error occurs, the icon shows a red badge.

The Status Report has three sections. The top of the panel displays a summary of the status of the Flex UI. It condenses the data from all other areas into a message that can help users understand the impact of any issues on the performance of the Flex UI.

### Statuses reported

| **Status**                      | **Description**                                                                                                                                                      |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No issues detected              | Flex UI is working normally. A user can still download a report if they wish to share logs from their session.                                                       |
| Operational, issues detected    | The Status Report has detected errors in the Flex UI, or one or more platform services are reporting issues. The user can continue to work but may encounter issues. |
| Operational, status unavailable | The status of platform services couldn't be loaded.                                                                                                                  |

**Platform Services** displays incidents reported by the services that Flex uses to operate. Note that this refreshes periodically, so it may take some time for all users to be notified of status changes.

**Your App** displays any errors detected while the Flex UI has been running. You can open the preview to see the full details in the log. To help with debugging issues, you can clear the log to remove the issues displayed. You can download more details of the encountered errors into a report. See [Error Report](#error-report) for more details.

If no errors occurred in the current session, you can still download a report that contains your session data and last 1000 log lines. This is particularly useful if Flex is experiencing some unexpected behavior, but you're not seeing any errors.

## Error report

You can download an error report when an error occurs during Flex initialization, or at any point while running Flex (with or without errors). The report contains the following details:

* Summary of the Status Report
* Details of any Platform service incidents at the time the report was generated
* Last 1000 debug level log lines
* For each error detected:
  * Full error description
  * Stack trace
  * Source of the error
  * User session data

> \[!WARNING]
>
> Client-side logs or errors are allowed to contain PII ([Personally Identifiable Information](/docs/glossary/what-is-personally-identifiable-information-pii)) because they're transient and aren't saved beyond a user session. By exporting them, however, PII is also exported and saved to the file. Please take proper precautions to protect your customers' data when saving and sharing this file.

### Sample Report

````bash

# Twilio Flex Error report
---


## Error: "Failed to init Flex SDK"

### LOG LINE
```
29/09/2022, 16:38:04 - initFlexSDK: Failed to init Flex SDK

Original error:
"FlexSDK Client is forced disabled. Failing initialisation"
```

### STACK TRACE
```
Error: Failed to init Flex SDK
    at new n (https://private-assets.twilio.com/flex/dev-builds/releases/flex-ui/main-62e5ef568c695eb2e78a700b5958a35511eb3498/twilio-flex.min.js:157:17890)
    at e.createAndProcessError (https://private-assets.twilio.com/flex/dev-builds/releases/flex-ui/main-62e5ef568c695eb2e78a700b5958a35511eb3498/twilio-flex.min.js:157:21065)
    at https://private-assets.twilio.com/flex/dev-builds/releases/flex-ui/main-62e5ef568c695eb2e78a700b5958a35511eb3498/twilio-flex.min.js:1603:206918
```

### DETAILS
```
{
    "message": "Failed to init Flex SDK",
    "wrappedError": "FlexSDK Client is forced disabled. Failing initialization",
    "context": "initFlexSDK",
    "type": "flexSDK",
    "severity": "normal",
    "twilioErrorCode": 45600
}
```

<details>
<summary>WRAPPED ERROR</summary>

```
message: FlexSDK Client is forced disabled. Failing initialization
stack: Error: FlexSDK Client is forced disabled. Failing initialization
    at https://private-assets.twilio.com/flex/dev-builds/releases/flex-ui/main-62e5ef568c695eb2e78a700b5958a35511eb3498/twilio-flex.min.js:1603:206386
```

</details>
---

### SESSION DATA
```
{
    "config": {
        "language": "en-US",
        "colorTheme": {
            "baseName": "FlexLight",
            "light": true,
            "preset": {
                "id": "light-blue",
                "name": "Light Blue"
            },
            "overrides": {
                "MainHeader": {
                    "Container": {
                        "background": "#233659"
                    }
                },
                "SideNav": {
                    "Button": {
                        "background": "#4F5E7A"
                    },
                    "Container": {
                        "background": "#4F5E7A"
                    }
                }
            }
        },
        "pluginService": {
            "enabled": true,
            "url": "https://flex.twilio.com/plugins?hosted=true"
        },
        "logLevel": "debug",
        "rejectPendingReservations": true,
        "initialDeviceCheck": true,
        "notifications": {
            "browser": true,
            "mode": "whenNotInFocus",
            "enabled": true
        },
        "enableClientCalling": false,
        "flexServiceUrl": "https://preview.twilio.com/Flex",
        "warmTransfers": {
            "enabled": true
        },
        "sdkOptions": {
            "insights": {
                "region": -us1",
                "productId": "flex_insights",
                "logLevel": "debug"
            },
            "voice": {
                "eventgw": "eventgw.twilio.com",
                "chunderw": "chunderw-vpc-gll.twilio.com",
                "debug": true
            },
            "flex": {
                "environmentConfig": {
                    "twilioServiceLoginUrl": "https://flex.twilio.com/admin",
                    "authServiceUrl": "https://iam.twilio.com/v1/Accounts",
                    "region": -us1",
                    "configServiceUrl": "https://flex-api.twilio.com/v1/Configuration"
                },
                "logger": {
                    "level": "debug"
                }
            },
            "worker": {
                "wsServer": "wss://event-bridge-us1.twilio.com/v1/wschannels",
                "ebServer": "https://event-bridge-us1.twilio.com/v1/wschannels",
                "logLevel": "debug"
            },
            "chat": {
                "region": -us1",
                "logLevel": "debug"
            }
        },
        "chatOrchestrationServiceUrl": "https://preview.twilio.com/Flex/WebChannels",
        "sessionUrl": "https://flex.twilio.com/api/v1/Session",
        "baseQueueManagementUrl": "https://flex.twilio.com/api",
        "showSupervisorDesktopView": true,
        "debugMode": false,
        "flexConfigServiceUrl": "https://flex-api.twilio.com/v1/Configuration",
        "taskRouterUrl": "https://taskrouter.twilio.com",
        "version_compatibility": "yes",
        "theme": {},
        "version_message": "",
        "markdown": {
            "enabled": false,
            "mode": "readWrite"
        }
    }
}
```

<details>
<summary>LOGS</summary>
<pre>
16:37:56 | info | Flex UI logger decorated
16:37:57 | info | Manager: Creating manager. flex-ui version: 1.31.2 core-ui version: 0.57.0
16:37:57 | log | Manager: Flex UI bundle type - "cdnBundledReact"
16:37:57 | log | Manager: React version - "16.5.2"
16:37:58 | info | Manager: loginHandler created
16:37:58 | info | Manager: manager created
16:37:59 | info | Manager: remote config received
16:37:59 | log | Notification handler browser enabled=true
16:37:59 | log | SessionState: setting degraded to false
16:38:01 | info | Manager: features received
16:38:01 | info | SessionState: ssoLogin
16:38:01 | info | SessionState: initializing SDK clients
16:38:04 | log | [2022-09-29 16:38:04.312] Flex SDK → TelemetryProcessor (DEBUG):  Sending 1 telemetry events
16:38:04 | log | [2022-09-29 16:38:04.313] Flex SDK → TelemetryClient (DEBUG):  creating event group with name:  rate_limiter
16:38:04 | log | [2022-09-29 16:38:04.613] Flex SDK → TelemetryProcessor (DEBUG):  Telemetry sent successfully
16:38:04 | log | SessionState: setting degraded to true
16:38:04 | log | Executing "beforeAddNotification" listeners with {"id":"DegradedModeActive","content":"DegradedWarning","type":"error","timeout":0,"recurrenceTimeout":300000,"closeButton":true,"actions":[{"type":"[Function]","key":null,"ref":null,"props":{"label":"DegradedNotificationOpenStatusPanelAction","onClick":"[Function]","notification":"[Object]"},"_owner":null}]}
16:38:04 | log | Completed "beforeAddNotification" listeners with {"id":"DegradedModeActive","content":"DegradedWarning","type":"error","timeout":0,"recurrenceTimeout":300000,"closeButton":true,"actions":[{"type":"[Function]","key":null,"ref":null,"props":{"label":"DegradedNotificationOpenStatusPanelAction","onClick":"[Function]","notification":"[Object]"},"_owner":null}]}
16:38:04 | log | Emitting "notificationAdded" event for {"id":"DegradedModeActive","content":"DegradedWarning","type":"error","timeout":0,"recurrenceTimeout":300000,"closeButton":true,"actions":[{"type":"[Function]","key":null,"ref":null,"props":{"label":"DegradedNotificationOpenStatusPanelAction","onClick":"[Function]","notification":"[Object]"},"_owner":null}]}
16:38:04 | log | Received "notificationAdded" event with {"id":"DegradedModeActive","content":"DegradedWarning","type":"error","timeout":0,"recurrenceTimeout":300000,"closeButton":true,"actions":[{"type":"[Function]","key":null,"ref":null,"props":{"label":"DegradedNotificationOpenStatusPanelAction","onClick":"[Function]","notification":"[Object]"},"_owner":null}]}
16:38:04 | log | InAppNotificationHandler handling notitification and notifying of change {"id":"DegradedModeActive","content":"DegradedWarning","type":"error","timeout":0,"recurrenceTimeout":300000,"closeButton":true,"actions":[{"type":"[Function]","key":null,"ref":null,"props":{"label":"DegradedNotificationOpenStatusPanelAction","onClick":"[Function]","notification":"[Object]"},"_owner":null}]}
16:38:04 | log | Received "notificationAdded" event with {"id":"DegradedModeActive","content":"DegradedWarning","type":"error","timeout":0,"recurrenceTimeout":300000,"closeButton":true,"actions":[{"type":"[Function]","key":null,"ref":null,"props":{"label":"DegradedNotificationOpenStatusPanelAction","onClick":"[Function]","notification":"[Object]"},"_owner":null}]}
16:38:04 | log | Flex event emitter: flexError [{"getLogTime":"[Function]","content":{"context":"initFlexSDK","type":"flexSDK","wrappedError":"[Object]","severity":"normal","twilioErrorCode":45600},"time":{},"sessionData":{"config":"[Object]","reactVersion":"16.5.2","bundleType":"cdnBundledReact","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"},"logManagerTimestamp":"16:38:01"}]
</pre>
</details>





### APPLICATION STATUS
Ongoing incident

Our services are currently experiencing disruption, which might affect your work. We're aware and trying to fix the issues. Contact your support team if you're experiencing problems.



### DEGRADED CLIENT
FlexSDKClient is degraded
### PLATFORM SERVICES
No issues detected






## General Session Information

### SESSION DATA
```
{
    "config": {
        "language": "en-US",
        "colorTheme": {
            "baseName": "FlexLight",
            "light": true,
            "preset": {
                "id": "light-blue",
                "name": "Light Blue"
            },
            "overrides": {
                "MainHeader": {
                    "Container": {
                        "background": "#233659"
                    }
                },
                "SideNav": {
                    "Button": {
                        "background": "#4F5E7A"
                    },
                    "Container": {
                        "background": "#4F5E7A"
                    }
                }
            }
        },
        "pluginService": {
            "enabled": true,
            "url": "https://flex.twilio.com/plugins?hosted=true"
        },
        "logLevel": "debug",
        "rejectPendingReservations": true,
        "initialDeviceCheck": true,
        "notifications": {
            "browser": true,
            "mode": "whenNotInFocus",
            "enabled": true
        },
        "enableClientCalling": false,
        "flexServiceUrl": "https://preview.twilio.com/Flex",
        "warmTransfers": {
            "enabled": true
        },
        "sdkOptions": {
            "insights": {
                "region": -us1",
                "productId": "flex_insights",
                "logLevel": "debug"
            },
            "voice": {
                "eventgw": "eventgw.twilio.com",
                "chunderw": "chunderw-vpc-gll.twilio.com",
                "debug": true
            },
            "flex": {
                "environmentConfig": {
                    "twilioServiceLoginUrl": "https://flex.twilio.com/admin",
                    "authServiceUrl": "https://iam.twilio.com/v1/Accounts",
                    "region": -us1",
                    "configServiceUrl": "https://flex-api.twilio.com/v1/Configuration"
                },
                "logger": {
                    "level": "debug"
                }
            },
            "worker": {
                "wsServer": "wss://event-bridge-us1.twilio.com/v1/wschannels",
                "ebServer": "https://event-bridge-us1.twilio.com/v1/wschannels",
                "logLevel": "debug"
            },
            "chat": {
                "region": -us1",
                "logLevel": "debug"
            }
        },
        "chatOrchestrationServiceUrl": "https://preview.twilio.com/Flex/WebChannels",
        "sessionUrl": "https://flex.twilio.com/api/v1/Session",
        "baseQueueManagementUrl": "https://flex.twilio.com/api",
        "showSupervisorDesktopView": true,
        "debugMode": false,
        "flexConfigServiceUrl": "https://flex-api.twilio.com/v1/Configuration",
        "taskRouterUrl": "https://taskrouter.twilio.com",
        "version_compatibility": "yes",
        "theme": {},
        "version_message": "",
        "markdown": {
            "enabled": false,
            "mode": "readWrite"
        }
    },
    "reactVersion": "16.5.2"
}
```

<details>
<summary>LOGS</summary>

<pre>
16:37:56 | info | Flex UI logger decorated
16:37:57 | info | Manager: Creating manager. flex-ui version: 1.31.2 core-ui version: 0.57.0
16:37:57 | log | Manager: Flex UI bundle type - "cdnBundledReact"
16:37:57 | log | Manager: React version - "16.5.2"
16:37:58 | info | Manager: loginHandler created
16:37:58 | info | Manager: manager created
16:37:59 | info | Manager: remote config received
16:37:59 | log | Notification handler browser enabled=true
16:37:59 | log | SessionState: setting degraded to false
16:38:01 | info | Manager: features received
16:38:01 | info | SessionState: ssoLogin
16:38:01 | info | SessionState: initializing SDK clients
16:38:04 | error | 29/09/2022, 16:38:04 - initFlexSDK: Failed to init Flex SDK

Original error:
"FlexSDK Client is forced disabled. Failing initialisation"
16:38:04 | error | Flex SDK failed to initialize. Telemetry events won't be enabled for this session
16:38:04 | info | Subscribing to Signaling events ....
16:38:04 | log | SessionState: setting degraded to true
</pre>

</details>
````
