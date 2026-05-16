# Set up a Workspace

Your Intercom workspace is where you and teammates can access all your Intercom products. As a developer, you can create apps that may be installed on one or more workspace.

In this guide, you will set up your workspace and learn how to create an app in your [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub).

## Step 1: Create an Intercom workspace

### For public app developers

If you are building a public app to share with multiple customers, you **must** [create a new development workspace](https://app.intercom.com/admins/sign_up/developer) to develop and publish the app.

Development workspaces are free and intended for development purposes only.

You can create as many development workspaces as you would like.

### For private app developers

If you are building a private app for your paid Intercom workspace, log in through the [Intercom app sign in](https://app.intercom.io/admins/sign_in) and then go to the [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) to create an app for that workspace, which we will show in the next step.

You may create a development workspace if you wish for testing purposes. However, this is **not recommended** if your account is in the Europe or Australia regions because you will not be able to install development workspace apps into your paid workspace.

Development Workspace Limitations
Development workspaces do not have all the functionalities of a paid Intercom production workspace. Limitations include:

- **Cannot be converted into production workspaces**.
- Only available in the US region.
- No outbound emailing or push notifications.
- [Help Center Sites](https://www.intercom.com/articles) can never be set live.
- A watermarked Messenger, showing that it's linked to a development workspace.
- A **maximum of 20 users/leads** (if you have more than 20 users/leads, the oldest extras will be archived automatically on a regular basis).


## Step 2: Create an app

You can create an app for any of your workspaces (paid or development) in the Your apps section of the [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub).

Everything is an app
To interact with the Intercom Platform you need an app. Think of apps as containers for various pieces of functionality that you have access to on the Intercom Platform. Apps can be managed and installed in to any of your Intercom workspaces independently as long as the workspaces are in the same region.

In **Your Apps**, click New App

![A screenshot of the Intercom Developer Hub, with the "Create new app" button highlighted](/assets/create-new-app-screen.a1b11c1de74f90b825862ff75735745cfe56415caedd4e6e194dbfa4072104e7.71a4f21c.png)

In the modal box, put the name of your app and select the workspace where you want to install it. You can also create a new development workspace from the dropdown.

![A screenshot of the app creation modal](/assets/entering-an-app-name.7726a67098ba73c314d67e365df34c12baba738329645e24459ccaebdde53d87.71a4f21c.png)

Click **Create app**. This will create the app and pre-install it to your selected workspace.

Get your Access Token on the **Authentication** page to use in the next step.

![A screenshot of the Authentication page, with the Access Token highlighted](/assets/view-access-token.14ff036c0df12d76a46f5aafb12e3f6bce30bd472f706b42cdc9c04a7aa6ec6a.71a4f21c.png)

Authentication: Access Token vs. OAuth
An Access Token is used to access *your own* app data via the API. **You should never give your Access Token to a third-party.** For private apps, use the Access Token. For public apps, you will need to configure OAuth. See more details on both in the [authentication guide](/docs/build-an-integration/learn-more/authentication).

## Step 3: Make your first API Call

Now you can take actions in your new app. Create a new [Contact](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Contacts/contact/) in Intercom. You can do this by making a `POST` request to `https://api.intercom.io/contacts`.

Copy the snippet below into your terminal, making sure to swap `YOUR_ACCESS_TOKEN` for the access token of your app from Step 2, or expand the "Try It" section to run it here.

details
summary
Try Creating a Contact

```bash
curl -i -X POST \
  https://api.intercom.io/contacts \
  -H 'Authorization: Bearer <YOUR_TOKEN_HERE>' \
  -H 'Content-Type: application/json' \
  -H 'Intercom-Version: 2.11' \
  -d '{
    "email": "joebloggs@intercom.io"
  }'
```

If successful, you should see a response that looks like the below:


```
{
  "type": "contact",
  "id": "667559f6b87a49792720b62f",
  "workspace_id": "yourworkspaceid",
  "external_id": null,
  "role": "user",
  "email": "joebloggs@intercom.io",
  "phone": null,
  "name": null,
  "avatar": null,
  "owner_id": null,
  "social_profiles": {
    "type": "list",
    "data": []
  },
  "has_hard_bounced": false,
  "marked_email_as_spam": false,
  "unsubscribed_from_emails": false,
  "created_at": 1718966774,
  "updated_at": 1718966774,
  "signed_up_at": null,
  "last_seen_at": null,
  "last_replied_at": null,
  "last_contacted_at": null,
  "last_email_opened_at": null,
  "last_email_clicked_at": null,
  "language_override": null,
  "browser": null,
  "browser_version": null,
  "browser_language": null,
  "os": null,
  "location": {
    "type": "location",
    "country": null,
    "region": null,
    "city": null,
    "country_code": null,
    "continent_code": null
  },
  "android_app_name": null,
  "android_app_version": null,
  "android_device": null,
  "android_os_version": null,
  "android_sdk_version": null,
  "android_last_seen_at": null,
  "ios_app_name": null,
  "ios_app_version": null,
  "ios_device": null,
  "ios_os_version": null,
  "ios_sdk_version": null,
  "ios_last_seen_at": null,
  "custom_attributes": {},
  "tags": {
    "type": "list",
    "data": [],
    "url": "/contacts/667559f6b87a49792720b62f/tags",
    "total_count": 0,
    "has_more": false
  },
  "notes": {
    "type": "list",
    "data": [],
    "url": "/contacts/667559f6b87a49792720b62f/notes",
    "total_count": 0,
    "has_more": false
  },
  "companies": {
    "type": "list",
    "data": [],
    "url": "/contacts/667559f6b87a49792720b62f/companies",
    "total_count": 0,
    "has_more": false
  },
  "opted_out_subscription_types": {
    "type": "list",
    "data": [],
    "url": "/contacts/667559f6b87a49792720b62f/subscriptions",
    "total_count": 0,
    "has_more": false
  },
  "opted_in_subscription_types": {
    "type": "list",
    "data": [],
    "url": "/contacts/667559f6b87a49792720b62f/subscriptions",
    "total_count": 0,
    "has_more": false
  },
  "utm_campaign": null,
  "utm_content": null,
  "utm_medium": null,
  "utm_source": null,
  "utm_term": null,
  "referrer": null,
  "sms_consent": false,
  "unsubscribed_from_sms": false
}
```

## Step 4: Learn more

This was just the beginning. Here are some ideas of what you might do next:

* [Build a Messenger App](/docs/build-an-integration/getting-started/build-an-app-for-your-messenger)
* [Build an Inbox App](/docs/build-an-integration/getting-started/build-an-app-for-your-inbox)
* [Explore Intercom APIs](/docs/references/preview/introduction)
* [Check out Intercom App Store](https://intercom.com/app-store)
* [Join our Community forum](https://community.intercom.com/)