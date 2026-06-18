# Update your API version

You can select which version of the API to apply to any given app. Visit your [Developer Hub](https://app.intercom.io/a/apps/_/developer-hub) page to see a list of all your apps. From there, you can select which version of the API to apply to any particular app by:

1. Selecting it via your `Developer Hub` app settings page, or
2. Setting the version on each API call via an HTTP header


> ❗️ Always test new versions of the API
Some API versions may be breaking changes and require you to change your code if you are using that feature. We will highlight this when we provide information on the new version but you should always test new versions of the API to ensure they are fully compatible with your system


## Selecting the version via the Developer Hub

1. Go to your [Developer Hub](https://app.intercom.io/a/apps/_/developer-hub) and choose the relevant app.
2. Then go to the `API Version` menu, click on the `Change version` box and select your new version. Once you have selected the appropriate version for your app all subsequent API requests will use this version.


![api version menu](/assets/da1f58a-api_version_menu.ee8c7d45dfe218ed206a7cd2dcdd2101d6ea224164d29fabe4e7848197d33a46.71a4f21c.png)

Any conflicts between the topics available in the new version and the topics in the existing subscription will be displayed in a table below. Topics which are not available in the new version will have a status of 'Off'. These will need to be deleted before proceeding. If you wish to continue receiving webhooks for the topic, please check the [webhook topics](https://developers.intercom.com/intercom-api-reference/reference/webhook-models) of the respective version.

[Topic conflict table](/assets/74e3411-debfcbc-topic_conflict_table.455bfd9a4953d4d70779aae9cbe7d6a5ec99c929ee244066642a8cde5dc02d36.71a4f21c.png)

## Selecting the version via the API request

1. Identify the version you want to test (e.g. 1.x or 2.x). You can check the change log or look at the available versions in the app dropdown above to confirm the version number you want to use.
2. Add an HTTP header of `Intercom-Version` to your API request.
3. Using the `Access token` for your app make an API request with the header and the appropriate version.


```curl
httpstat https://api.intercom.io/users?email=cathalhoran@gmail.com \
-H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
-H 'Accept: application/json' \
-H 'Intercom-Version: 1.1'
```

## Important API questions

### How can I test new versions?

There are two options for testing new versions"

1. Via the API
2. Via a Private app


#### Via API

The best way to test new versions of the API is by setting the version in a HTTP header (see above). That way you can check what has changed and see whether it is compatible with your code, or whether you need to make a change before adopting the new version.

#### Via Private App

Alternatively, you can create a new private app on the target API version. Ensure you have selected the desired webhook topics, and provided a webhook url endpoint. Then you can use Intercom to test the new webhook topics and payloads. This will allow you to check see whether the version is compatible with your code, or whether you need to make changes before adopting the new version.

### Can I rollback after making a change?

Yes, if you select a new version for your app and you discover an issue you can switch back to an older version.

### How do I switch over to a new version for my production app?

You can start by setting the version via the HTTP header. This way you can ship code to production which changes the version and any new code needed at the same time. Once this is working in production you can change the version in your app and then remove the headers if you like.

For OAuth apps, this setting also dictates which version your clients use. [All access tokens granted via OAuth](https://developers.intercom.com/build-an-integration/docs/setting-up-oauth#section-trade-your-authorization-code-for-an-access-token) (even those granted before the change) use the version that you have specified in your app settings and/or HTTP header.

### Can I set the header version and the version in the app?

Yes, but the header version in the API request will override the version selected in the app.

### Where can I find out information on the different versions?

The [change log](https://developers.intercom.com/build-an-integration/docs/api-changelog) is the best place to find information on the different versions and the changes they contain. We will highlight breaking changes in the change log clearly so you are aware of versions that may require you to make a change on your end.

### Will I always have a choice to upgrade?

Usually, but there may be security updates which necessitate mandatory changes. In these cases we will attempt to minimize any impact on older versions. For example, if we have to remove an attribute we will do that in the new version and may only change the value in older versions so as to minimize the impact until you upgrade to the newer version.