# Installation Health Check

## Overview

There may be issues that result in your app running into a state where it no longer functions after (or during) installation. This causes a poor app experience that can lead teammates to naturally churn from using your app, in most cases not ever knowing the root cause.

In order to solve this, we provide a Health Check which is designed to increase re-activation of your app and decrease any loss in retention.

## How does it work?

We will make an API call to the endpoint you provide in the Installation Status section of your app in the [Developer Hub](https://intercomrades.intercom.com/a/apps/_/developer-hub/app-packages). This will happen at least once a day for each workspace where the app is installed. With this information, we expect you to discover if the app is in a healthy state for this workspace and respond to the request telling us whether it's healthy, unhealthy, or you don't currently know.

## Request

You will receive a POST request with a JSON payload that will include the `workspace_id`:

```json
{
  "workspace_id": "exampl3"
}
```

The requests are signed by Intercom via an `X-Body-Signature` header. You should use it to verify that the request is legit. You can read more about it [here](/docs/canvas-kit#signing-notifications).

## Response

You should respond with the state of your app for the given workspace. The states you can provide are:

| State Name | State Description |
|  --- | --- |
| `OK` | The app is healthy and working correctly for the given workspace. |
| `UNHEALTHY` | Either the whole app or a part of it does not work correctly for that workspace and requires a teammate from that workspace to take action to fix it. |
| `UNKNOWN` | You are unable to determine the health status of the given workspace at this time, or you're uncertain of the state (ie. you are getting an API error that you don't know how to interpret). |


Returned payloads can contain the following attributes:

| Attribute | Accepted Values | Required? | Description |
|  --- | --- | --- | --- |
| state | `OK``UNHEALTHY``UNKNOWN` | Yes | See information above to understand which value to provide. |
| message | Any stringMax 2084 characters | Only if `state` is `UNHEALTHY` | Write a concise message of why the app is unhealthy. |
| cta_type | `URL_CTA``REINSTALL_CTA` | No | Specify whether you want a button present to fix the problem. Either choose a URL to navigate to, or to reinstall the app when clicked. |
| cta_label | Any string | Only if `cta_type` is `URL_CTA` | Write a short and concise label for the button's action. |
| cta_url | Any stringMax 2084 characters | Only if `cta_type` is `URL_CTA` | A URL where the teammate can fix the problem. Best practice is to navigate to a settings page. |


```json
{
  "state": "UNHEALTHY",
  "message": "You need to re-authenticate with Mailchimp to continue using the app.",
  "cta_type": "URL_CTA",
  "cta_url": "https://admin.mailchimp.com/account/",
  "cta_label": "Finish setup"
}
```

## What should I consider as unhealthy?

An app can be unhealthy for multiple reasons, and these vary between apps. You're best placed to determine what is unhealthy in the context of your app.

Based on previous experience, we have found the most common reasons are because a token has been revoked, an installation is incomplete (ie. you don't have any record for the given `workspace_id`) or you're missing crucial settings for the app to work at its full potential.

You should also consider the order in which you want to check for these issues. Consider which are most likely or most fundamental and ensure you check for these first, in order to return the most accurate error.

## How can I proactively notify you if I find the state has changed?

At the moment, we send these notifications once per day. Rather than waiting for up to 24 hours for you to update an app's state for a given workspace, we offer the possibility to proactively notify us when the state might have changed.

You'll need to make a POST request to `<https://api.intercom.io/app_install/status`> with the same payload as shown in the [Response](#response) section.

Please note that this endpoint is only available from Version 2.2 and upward. You will need to [update your API version](/docs/build-an-integration/learn-more/rest-apis/update-your-api-version) for this request to be accepted.

```curl
$ curl https://api.intercom.io/app_install/status \
-X POST \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
-H 'Content-Type: application/json' -d

{
  "state": "UNHEALTHY",
  "message": "You need to re-authenticate with Mailchimp to continue using the app.",
  "cta_type": "URL_CTA",
  "cta_url": "https://admin.mailchimp.com/account/",
  "cta_label": "Finish setup"
}
```

## What will customers see if I respond saying it's unhealthy?

We'll send out an email to the workspaces admins telling them that there is a problem with your app, which will include a button taking them through to the listing to see more on the issue itself.

Information on sending emails
- We only send emails once when the state changes to `UNHEALTHY`, and it's not immediate.


> - It can take up to 24 hours for the email to kick off.



![image](/assets/721a60a-screenshot_2019-11-12_at_13.28.37.a5c95c7985af76210d771f468918ed5c9698cdf006d62e8068e031ffaae52783.71a4f21c.png)

On the App Store listing, we will update the top of the listing to reflect the error. This will show the message you gave us in the response, plus any CTA to navigate them towards fixing the app if you specified one.

![image](/assets/514c244-screenshot_2019-11-12_at_13.27.33.bd8deb7a676c5005685f1b36db8289ba5567ad08306533caebc95071be5bcc6a.71a4f21c.png)