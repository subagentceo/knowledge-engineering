# The appConfig.js object

You can control the behavior and appearance of your **self-hosted** Flex UI instance by specifying configuration properties in a JavaScript object housed within a file named `appConfig.js`.

This file must be made accessible on your Flex UI server at the location:

```bash
public/assets/appConfig.js
```

The Flex UI application attempts to load the `appConfig.js` file from your server at startup. Flex UI then fetches your account's current Configuration resource via the [Flex Configuration REST API](/docs/flex/developer/config/flex-configuration-rest-api), and merges any properties found in the `ui_attributes` field with the properties defined in `appConfig.js` to determine the app's effective configuration. Values defined in your server's `appConfig.js` take precedence over corresponding values defined in `ui_attributes` via the REST API.

See the [REST API configuration guide](/docs/flex/developer/config/flex-configuration-rest-api) to learn more about the Flex Configuration REST API.

> \[!NOTE]
>
> The `appConfig.js` object is only directly accessible if you are running a self-hosted instance of Flex UI. If you are not running a self-hosted Flex instance (i.e. if you access Flex at [https://flex.twilio.com](https://flex.twilio.com)), use the Flex Configuration REST API to manage your Flex instance's configuration.

## Configuration properties

To see a complete list of fields you can specify in the configuration object, check out the Flex UI reference docs for the major version of Flex UI that you are using:

* [Flex UI 1.x.x](https://assets.flex.twilio.com/docs/releases/flex-ui/1.33.2/Configuration.html)
* [Flex UI 2.x.x](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/overview/Config/)

## Sample content

This is example content for a valid Flex UI 2.x.x `appConfig.js` file.

```javascript
var appConfig = {
  serviceBaseUrl: "https://dancing-owl-1234.twil.io/",
  sso: {
    accountSid: "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  },
  sdkOptions: {
      chat: {},
      insights: {},
      voice: {},
      worker: {}
  },
  logLevel: "debug",
  theme: {
    isLight: false
  },
  componentProps: {
    CRMContainer: {
      uriCallback: (task) => task
        ? `https://www.bing.com/search?q=${task.attributes.name}`
        : "http://bing.com"
    }
  },
  router: {
    type: "memory",
    history: {
      initialEntries: [ "/agent-desktop" ]
    }
  }
};
```
