# Installing your App

Installation setup is dependent on whether your app is [public](/docs/build-an-integration/learn-more/authentication/installing-uninstalling-apps#public-apps-set-up-your-app-for-third-party-installation) or [private](/docs/build-an-integration/learn-more/authentication/installing-uninstalling-apps#private-apps-install-in-your-workspaces).

## Private Apps: Install in your workspaces

You may want to install your app on a different development workspace for testing purposes or so you can use your app in the your paid production workspaces that you own.

Intercom workspaces for EU and AU
Development workspaces are for US region only. If you are using a development workspace to develop a private app, you will only be able to install your app into a paid Intercom workspace that is also in the US region.

If you are building a private app in EU or AU, we recommend using your paid Intercom workspace to develop the app; to use a development workspace, you will have to manually copy over your settings and endpoints into your paid workspace.

If you visit the **Test & Publish > Your Workspaces** page of your app in the [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) then you should see all the workspaces you (as an Intercom teammate) are a member of.

You can click on **Install app** next to the workspace you want to install the given app on. This app will then be installed and an [Access Token](/docs/build-an-integration/learn-more/authentication#access-tokens) will be provided for that workspace so you can access its data through the API.

![Your workspaces in the developer hub where you can install your app](/assets/app_install.b917166dececfdcb492331587cfcf058e4b2161acbca9db857dac5de7d179be4.71a4f21c.png)

You can also then regenerate the Access Token (by clicking **Regenerate token** or uninstall this app which will revoke the Access Token (by clicking **Uninstall app**).

Consider how the app is being used before uninstalling
The app will no longer have access to data or be able to take actions on the workspace when uninstalled. Ensure uninstalling does not impact any workflows or teammates usage as it can be disruptive and is destructive. We give a warning box to ensure the action is deliberate before uninstallation and tell you where the app is currently being used if Canvas Kit capabilities are utilized.

## Public Apps: Set up your app for third-party installation

If your app is going to be public for any customer to install, you can set it as [listed](/docs/publish-to-the-app-store/review-publish-your-app#listed-apps) or [unlisted](/docs/publish-to-the-app-store/review-publish-your-app#unlisted-apps).

For listed apps, customers may install your app directly from the Intercom App Store or through your product or website.

OAuth required for both installation types
Note that whether you decide to allow customers to install your app directly from the App Store or you provide installation through your own product or website, **OAuth must be configured** and functioning properly.

Unlisted apps do not need an Installation status
Unlisted apps do not need to fill out the Installation status section. Please provide clear instructions in your own product on how customers can install and use your app.

### Installation Status: Set the Installation URL

Third-parties (i.e. other Intercom workspaces) must authenticate via OAuth. This flow will be kicked off via a URL **hosted by you**, which should then redirect to the Intercom OAuth URL. [Our Setting up OAuth tutorial](/docs/build-an-integration/learn-more/authentication/setting-up-oauth) provides details on how to set up the flow.

Once this flow is working, you need to decide where you want your app to be installed from. You can choose your method by going to the Installation status page of your [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) under the Test and publish section.

When you click installation, you have the option to set a Direct installation URL (listed apps) or a Learn more URL (unlisted apps).

### Allow installation directly from your app listing (recommended)

Canvas Kit requirements
If your app uses any form of Canvas Kit capability, **it's mandatory to allow your app to be installed through the listing on the App Store.** This is because apps which use the Canvas Kit work from within Intercom by default, are often discovered through the product itself, and have onboarding built in to the listing to help people get started.

This method allows customers to install your app directly from the listing in the Intercom App Store. This is strongly recommended because it drives higher install rates and reduces confusion on the part of teammates installing the app.

To choose this method, you will need to select **Directly from the Intercom App Store** from the form, and insert the URL that kicks off the OAuth flow in the **Direct installation URL** field.

![Intercom installation status for direct installation](/assets/app_installation.ab2c6a48cffe45d6400413d0757c091ca3f220100ea56750359888357e4af10f.71a4f21c.png)

Successful Installation
If installation was successful, you should redirect the user to `<https://app.intercom.com/appstore/redirect?install_success=true`>. This URL will bring them back to the App Store and will display a success message.

Failed Installation
If installation was unsuccessful, you should redirect the user to `<https://app.intercom.com/appstore/redirect?install_success=false&error_message=><your error message>`. You can fill in the `error_message` parameter with any error information you feel is beneficial for the end user to know.

### Allow installation from your own product or website only

Your app can also be installed through your own product or website exclusively. This means that you kick off the OAuth installation flow through your own product and redirect the user back there once complete.

For this method, choose **Through your own product or website** from the form. In the text field you must provide a **Learn more URL**. This URL must go to a page where customers can install your app. It's recommended to provide detailed steps on how they can install your app if it's isn't clear how to do so from the user experience.

![Intercom installation status section for the learn more link](/assets/app_learn_more.563eaf914f398c8ee65c103194b8da3a33881aa2beccbd132dfa9edfe7447c32.71a4f21c.png)

You can use UTM tags if you want to track referrals from your listing.

### Uninstallation

#### Notifications

If you want to be notified when someone uninstalls your app or revokes access through any means, then you can optionally provide a URL for us to send you a POST request to.

You can use this to handle any cleanup or de-authorization on your side. The JSON payload will be as follows:

```json
{
  "app_id": "abc123"
}
```

#### Revoking access

You can also uninstall an app and revoke access either for yourself or on behalf of a customer by making a POST request to the `https://api.intercom.io/auth/uninstall` endpoint with the given Access Token you want to deauthorize.

```curl
$ curl https://api.intercom.io/auth/uninstall \
-X POST \
-H 'Authorization:Bearer <Access token>' \
-H 'Accept:application/json'
-H 'Content-Type: application/json' -d
```