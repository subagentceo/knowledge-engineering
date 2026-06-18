# Self-hosted Flex: additional SSO configuration

## What is self-hosted Flex?

Self-hosted Flex lets you manage the Flex UI frontend package on your own infrastructure while still using the Twilio platform for backend services. With this setup, you must independently manage your Flex UI version, which can make it harder to stay up-to-date and benefit from the most recent version. You also carry the infrastructure risk for UI package availability. Given these reasons, we recommend Twilio-hosted Flex over self-hosted Flex unless you have specific needs that require self-hosting.

## SSO for self-hosted Flex

If you're configuring SSO for a self-hosted Flex deployment, you need to update the `appconfig.js` configuration object to support authentication and single sign-on using a third-party identity provider (IdP).

For complete details about the configuration object and its properties, see the [Flex UI API Reference](https://assets.flex.twilio.com/docs/releases/flex-ui/2.6.1/overview/Config/).

The [type of SSO](/docs/flex/admin-guide/setup/sso-configuration#enhanced-and-legacy-sso-configuration) you're using determines the changes you need to make:

* **Legacy SSO configuration (2.6.x or earlier)**: Configure the `sso` object.
* **Enhanced SSO configuration (2.7.x or later)**: Configure the `sso` object, and then add and configure the `oauth` object.

> \[!WARNING]
>
> As soon as the `oauth` object exists in your `appconfig.js` file, Flex UI will try to use enhanced SSO for authorization. If you're setting up an enhanced SSO connection (either for the first time or to migrate), make sure you configure the `oauth` object *after* completing the SSO setup or [migration steps](/docs/flex/admin-guide/setup/sso-configuration/migration-guide) in Console.

## Configure the `sso` object

1. Set the `sso` object as follows:

```javascript
appConfig.sso = {
    accountSid: string,
    loginPopup: boolean,
    loginPopupFeatures: string,
};
```

* `accountSid` is the Account SID of your Twilio project.
* `loginPopup` indicates whether to launch the IdP login in a new window. The default is false.
* `loginPopupFeatures` defines standard window.open() features to apply to the popup window.

## Configure the `oauth` object

1. Add the `oauth` object as follows:

```javascript
appConfig.oauth = {
    connection: `${CONNECTION_NAME}`,
    clientId: `${CLIENT_ID}`,
    redirectUrl: `${DOMAIN_REDIRECT_URL}`,
};
```

2. Retrieve the `connection` and `clientId` values using this request, and then add them to the configuration. Make sure to add your Account SID before running the request:

```bash
curl --location 'https://services.twilio.com/v1/Flex/Authentication/Config?AccountSid={{YOUR_ACCOUNT_SID}}'
```

3. For the `redirectUrl` value, add any domains where Flex is hosted. You must register these domains in the **Trusted URLs** section of the [**Single sign-on (SSO)** page](https://console.twilio.com/us1/develop/flex/users-and-access/single-sign-on) in Flex Console.

> \[!NOTE]
>
> Both **Trusted URLs** and **Default redirect URL** are required to set up SSO to a self-hosted domain. You must complete these fields in addition to the fields marked as required when you configure SSO in Console.

## Test your self-hosted SSO configuration

To test that your appconfig.js configuration is working, see the [Validate successful connection in Flex](/docs/flex/admin-guide/setup/sso-configuration/migration-guide#step-4-validate-successful-connection-in-flex) section of the SSO migration guide, and make sure you follow the instructions for self-hosted customers.
