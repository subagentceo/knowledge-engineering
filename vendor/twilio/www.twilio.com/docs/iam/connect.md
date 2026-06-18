# Twilio Connect

> \[!CAUTION]
>
> Connect Apps do not have access to the full functionality offered by Twilio services. Please see [Twilio Connect Limitations](https://help.twilio.com/articles/36665782139931-Twilio-Connect-Limitations)for full details.

> \[!CAUTION]
>
> In order for a customer to authorize your Connect App they must have previously [created](https://www.twilio.com/try-twilio) and [upgraded](https://help.twilio.com/hc/en-us/articles/223183208-Upgrading-to-a-paid-Twilio-Account) Twilio account.

## Overview \[#overview]

Twilio Connect lets your customers grant you access to their Twilio accounts so that your application — your 'Connect App' — can buy phone numbers, make phone calls, and send SMS. Because your customers are using their own Twilio account, you don't need to worry about billing them for their usage of Twilio services: Twilio will charge your customers directly.

Additionally, users can grant your Connect App access to their Twilio call and SMS log data. With this information, you can implement analytics and other read-only use cases.

> \[!NOTE]
>
> Want to get started right away? Jump right in with our [Twilio Connect Quickstarts](/docs/iam/connect/quickstart).

### Manage your Connect Apps

Create and manage Connect Apps from the Twilio Console. To find it, go to **Settings** > **Connect applications**.

You can also update your Connect Apps with the [Connect REST API](/docs/iam/connect-apps/api).

> \[!NOTE]
>
> Only upgraded accounts can create Connect Apps.

### How it works \[#how-it-works]

When creating your Connect Apps, there are two different permissions you can request from your users:

* **Charge account for usage** allows your application to buy phone numbers, make phone calls, send text messages, and perform other tasks that result in Twilio billing the user directly.
* **Read all account data** allows your application to access calls, SMS, and other logs for analytics and other read-only use cases.

These permissions are not mutually exclusive. You select both **Charge account for usage** and **Read all account data** when setting up your Connect App or select one at the start and add the second later. However, if you change your Connect App permissions, you will not be able to use any new permission until the user reauthorizes your Connect App.

See the [permissions section](#permissions), below, for more details.

When you create your Connect App, you will be given a snippet of HTML to drop into your webpage. This HTML will display a **Connect** button that users can click to authorize their Connect App to use their Twilio account. If a user doesn't yet have a Twilio account, they will be prompted to sign up.

When a user clicks the **Connect** button, they will be asked to authorize their Connect App according to the permissions you selected when you set the App up. After the user authorizes your Connect App, Twilio will redirect their browser to a URL that you specify during setup: the **Authorize URL** under **Endpoints**. This redirect will include `AccountSid` as a `GET` query string parameter. The value of `AccountSid` is the SID of a subaccount set up under the user's Twilio account. You authenticate Connect requests made by your app with that Account SID and your own Auth Token.

If you add a query string parameter called `state` to the target URL of the **Connect** button, Twilio will also pass that parameter back in the request it makes to your Authorize URL. This parameter is useful for passing metadata, like a customer's username or some other unique identifier, to your cloud.

If you have **Charge account for usage** permission (`"post-all"` in the API), you can make `POST` requests to the user's account's subresource URLs to buy numbers, make phone calls, and send SMS messages on their behalf.

If you have **Read all account data** access (`"get-all"` in the API), you can make `GET` requests to the `/accounts` endpoint to see all the user's accounts. You can also make `GET` requests to any subresource owned by those accounts.

### SDKs

You can use the existing [Twilio SDKs](/docs/libraries) to make authorized requests to your users' Twilio accounts. Just use the `AccountSid` value provided by the request Twilio makes to your Authorize URL after the user has granted your Connect App access rights.

## Best practices \[#best-practices]

Twilio Connect is a new way of thinking about your applications. Here are some best practices that you should follow to make sure your Connect App is both secure and error-free.

### Do

1. **Do place your Connect button behind some form of authentication**\
   Twilio Connect allows end-users to authorize your application to make
   requests on their behalf, but it does not serve as an authentication mechanism
   for your end-users. As such, your application should provide its
   authentication mechanism. For more information please read the
   [**How it works** section](#how-it-works).

   When presenting your **Connect** button, you should inform users that
   Twilio will bill them directly for your Connect App's voice and SMS usage.
2. **Do redirect to another page after your Authorize URL**\
   Your Authorize URL should only be used by your Connect App. We will pass your
   user's Account SID to your Authorize URL. After you store the user's Account SID,
   you should redirect the user to a follow-on page.
3. **Do have a Deauthorize URL**\
   When a user revokes permission for your Connect App's permissions, Twilio will make an HTTP
   request to any URL you specified as a `DeauthorizeCallbackURL` value. You should use this
   request to update your user database to reflect the loss of permissions.
4. **Do have a FAQ**\
   Include a FAQ to let your customers know they are required to create and upgrade a Twilio account if they haven't done so already.

### Do not

1. **Do not make a user's Account SID available to others**\
   Although all requests made to the Twilio API must be authenticated with
   your own Auth Token, you should treat the Account SID you receive from Twilio
   as you would other user data.
2. **Do not change your Connect App permissions haphazardly**\
   If you [change the permissions](#how-it-works) that your Connect App
   requires, you will not be able to use them until your user reauthorizes your Connect App.
   Changing your Connect App permissions frequently may lead to situations
   where you're not sure what permissions you have for a particular account. We
   recommend you change permissions only when a new feature requires it.

## Permissions \[#permissions]

There are two permissions available for Twilio Connect Apps:

### Read all account data

This allows your Connect App to see all the user's data, including calls, SMS, recordings, and transcriptions. Your Connect App will also have access to Twilio data generated by other Connect Apps, any subaccount, and the parent account. A Connect App with this permission alone will only be able to perform `GET` requests on the user's accounts.

### Charge account for usage

This allows your Connect App to perform actions that charge your user's Twilio account such as making and receiving phone calls, sending and receiving SMS messages, and buying phone numbers. Your Connect App will not have access to resources in the user's parent account, like phone numbers. Instead, your Connect App must buy phone numbers on behalf of the user, using the Account SID passed to your Authorize URL.

The Account SID that Twilio returns to your Authorize URL — as the value of `AccountSid` — is a subaccount just for your application within the user's account. This allows your Connect App to buy numbers and make calls without other Connect Apps modifying your data.

## Connect App configuration options \[#configuration-options]

Connect Apps have a variety of configuration options that Twilio uses in different parts of the authorization flow and the account portal.

| Option                      | Description                                                                                                                                                                                                                                                                                                                                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Friendly Name               | The name of your Connect App. It will be displayed on the authorization screen and the user's list of authorized apps. Required                                                                                                                                                                                                                                                                       |
| Application Logo            | A logo or picture associated with your Connect App. It will be displayed on the authorization screen and in the user's list of authorized apps. Required                                                                                                                                                                                                                                              |
| Company Name                | The name of the Connect App's developer, ie., your company. Displayed on the authorization screen and the user's list of authorized apps. Required                                                                                                                                                                                                                                                    |
| Description                 | A brief description of what your Connect App does. Displayed on the authorization screen                                                                                                                                                                                                                                                                                                              |
| Homepage URL                | The homepage of your Connect App, displayed in the user's list of authorized apps                                                                                                                                                                                                                                                                                                                     |
| Terms of Service URL        | The URL where users can read your Connect App's Terms of Service. It will be displayed in the user's list of authorized apps                                                                                                                                                                                                                                                                          |
| Authorize URL               | The URL to which the user will be redirected after they go through the authorization flow. If the user approves access to your Connect App, they will be redirected to this URL with their Account SID as an HTTP `GET` query string parameter named `AccountSid`.If a user chooses to decline authorization they will be redirected to this URL with a single parameter: `error=unauthorized_client` |
| Deauthorize URL             | The URL to which Twilio makes a request when a user revokes access to your Connect App. This is a server-to-server request; your users will never be directed to this location. Two parameters will be sent as part of this request: -`AccountSid` is the Account SID of the user who has deauthorized your Connect App.-`ConnectAppSid` is the SID of the Connect App that has been deauthorized.    |
| Deauthorize URL HTTP Method | The HTTP method used when requesting your Deauthorize URL. You can select either `GET` or `POST`                                                                                                                                                                                                                                                                                                      |
| Access Required             | This defines the types of API access your Connect App will require. Read the [permissions section](#permissions) for more details.                                                                                                                                                                                                                                                                    |
