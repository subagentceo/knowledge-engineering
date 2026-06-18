# OAuth apps

OAuth apps enable OAuth 2.0 authorization for Twilio APIs using the client credentials grant type defined in [RFC 6749, section 4.4](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4). This grant type is designed for machine-to-machine (server-to-server) interactions, such as backend services, where an application authenticates directly with another application rather than on behalf of a user.

You can create OAuth apps directly in the Twilio Console. When you create an OAuth app, Twilio automatically generates a Client ID and Client Secret for that app. Next, use these credentials to request an access token from the Twilio OAuth token endpoint. After you obtain an access token, you can authenticate calls to Twilio APIs . The sequence diagram below illustrates this client credentials flow.

![OAuth apps client credential sequence diagram](https://docs-resources.prod.twilio.com/035e59094992dc5714ce21c8ef0463b6c604d265d13217f3ca8e3c9d15496b84.png)

Here are the key benefits of using OAuth Apps:

* Using OAuth credentials short lived access tokens are generated. Right now the expiry is fixed at 1 hr.
* Access tokens are scoped and have restricted access to only some APIs.

> \[!NOTE]
>
> OAuth apps currently do not support the Authorization Code grant type, which is used for third-party delegated access scenarios. For third-party delegated access, use [Twilio Connect](/docs/iam/connect) instead.

## Create an OAuth App

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate [**Settings** > **Organization settings** > **Organization API access**](https://1console.stage.twilio.com/organization/settings/oauth/apps).
2. Click **Create OAuth application**.
3. On the **Application details** page, select the grant type and enter the application details:
   * Application name
   * Application description
   * Company name
   * Images for the application
   * Homepage URL
   * Terms of service URL
   * Redirect URL
4. On the **Scopes & permissions** page, select the scopes and permission you want to include in the OAuth application.
5. On the **Copy secret** page, copy the credentials and store them somewhere secure.
6. Select the **Got it!** checkbox and click **Finish**.

## Legacy Console

1. Click **Admin > Account management** in the top right corner.
2. Under **Keys & credentials**, click **OAuth apps** (or go directly to the [Console](https://console.twilio.com/us1/account/keys-credentials/server-oauth)).
3. On the **OAuth apps** page, click **Create an OAuth app**.
4. On the **Create an OAuth app** page, enter **App name** and **Description of the app**.
5. Select **OAuth Scopes** which are permissions which an OAuth app needs access to.
6. Click **Create app**.
7. On the **Credentials** page, **copy the Client ID and Client Secret** and store it somewhere secure.
8. Select the **Got it!** checkbox and click **Finish**.

To generate the access token, use the [Token API](/docs/iam/oauth-apps/oauth-access-token).

## View or update an OAuth app

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Settings** > **Organization settings** > **Organization API access**](https://1console.stage.twilio.com/organization/settings/oauth/apps).
2. Click on the OAuth app name you want to view or update.
   * To update the app details, on the **Application details** tab, click **Edit application details** and update the details, then click **Save**.
   * To update OAuth scopes, on the **Access settings** tab, update the scopes, then click **Save**.

## Legacy Console

1. Click **Admin > Account management** in the top right corner.
2. Under **Keys & credentials**, click **OAuth apps** (or go directly to the [Console](https://console.twilio.com/us1/account/keys-credentials/server-oauth)).
3. On the **OAuth apps** page, click on the **App name**.
4. On the OAuth apps detail page view **App name, Description of the app, Date created, Created by, OAuth Scopes** and **Client ID**. You can update the **App name, Description of the app** and **OAuth Scopes**.
5. Click **Save** to update the app or **Cancel** to go back to the OAuth apps list page.

## Rotate Secret of an OAuth app

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Settings** > **Organization settings** > **Organization API access**](https://1console.stage.twilio.com/organization/settings/oauth/apps).
2. Click on the OAuth app name you want to rotate secret for.
3. On the **Credentials** tab, click **Rotate secret**, then click **Yes, rotate secret** on the confirmation pop-up.
4. Copy the new credentials and store them somewhere secure.
5. Select the **Got it!** checkbox and click **Done**.

## Legacy Console

1. Click **Admin > Account management** in the top right corner.
2. Under **Keys & credentials**, click **OAuth apps** (or go directly to the [Console](https://console.twilio.com/us1/account/keys-credentials/server-oauth)).
3. On the **OAuth apps** page, click on the **App name**.
4. On the OAuth apps detail page click on the **Credentials** tab.
5. Click on **Rotate secret**, then click on **Yes,rotate secret** on the confirmation pop-up.
6. **Copy the new Client Secret** and store it somewhere secure.
7. Select the **Got it!** checkbox and click **Done**.

> \[!NOTE]
>
> When a secret is rotated, the old secret remains valid for 24 hours before becoming inactive.

## Delete an OAuth App

## Twilio Console

1. Log in to [Twilio Console](https://1console.twilio.com/) and navigate to [**Settings** > **Organization settings** > **Organization API access**](https://1console.stage.twilio.com/organization/settings/oauth/apps).
2. In the **Action** column of the OAuth app you want to delete, click **Delete**.
3. In the pop-up, click **Delete**.

## Legacy Console

1. Click **Admin > Account management** in the top right corner.
2. Under **Keys & credentials**, click **OAuth apps** (or go directly to the [Console](https://console.twilio.com/us1/account/keys-credentials/server-oauth)).
3. On the **OAuth apps** page, click on **Delete** under Actions.
4. In the pop-up, click **Yes,delete application** to confirm deletion.

## OAuth apps Audit Events

Audit Events can be viewed from Twilio Console under [Monitor-> Insights -> Audit](https://console.twilio.com/us1/monitor/insights/audit). There are 4 Audit Events related to OAuth apps:

1. **oauth-apps.created:** This event is triggered when an oauth-app is created.
2. **oauth-apps.updated:** This event is triggered every time an oauth-app is updated.
3. **oauth-apps.deleted:** This event is triggered every time an oauth-app is deleted.
4. **oauth-apps.secret-rotated:** This event is triggered every time the client secret of an OAuth app is rotated.

### Scopes/Permissions available with OAuth apps

> \[!WARNING]
>
> An OAuth app has a limit of 100 scopes/permissions that can be associated with it.

Each permission maps to one or more endpoints/actions for each API Resource. To download a PDF of the permissions/endpoint actions, click one of the links below:

* [Messaging Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Messaging_Permissions.pdf)
* [Phone Numbers Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Numbers_Permissions.pdf)
* [Studio Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Studio_Permissons.pdf)
* [TaskRouter Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_TaskRouter.pdf)
* [Voice Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Voice_Permissions.pdf)
* [Lookup Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Lookup_Permissions.pdf)
* [Identity and Access Management (IAM) Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_IAM_Permissons.pdf)
* [Monitor Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Monitor_Permissons.pdf)
* [Verify Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Verify_Permissions.pdf)
* [Video Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Video_Permissions.pdf)
* [Event Streams Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Event_Streams_Permissions.pdf)
* [Usage Records Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Usage_Records_Permissions.pdf)
* [Serverless Permissions](https://docs-resources.prod.twilio.com/documents/Twilio_Restricted_API_Keys_Permissions_-_Serverless_Permissions.pdf)
