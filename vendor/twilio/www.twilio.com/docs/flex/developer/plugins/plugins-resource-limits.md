# Plugins Resource Limits

Flex Plugins has **default** limits on the number of plugins, versions and the size of your plugin package being uploaded on your Flex application. [Archive](/docs/flex/developer/plugins/cli/archive) your unused plugins and plugin versions if you run into these limits. If archiving is not an option, [please reach out to our support team](https://help.twilio.com). We're happy to help work with you to increase some of these limits or help optimize how you use plugins on your Flex application.

## **Resource Limits**

The following limits will apply when developing Plugins on your Twilio account.

| **Resource**                                                       | **Default Limit** | **Notes**                                                                  |
| ------------------------------------------------------------------ | ----------------- | -------------------------------------------------------------------------- |
| [Plugins](/docs/flex/developer/plugins/api/plugin)                 | 25                | Used to extend and modify the Flex UI's capabilities. This is per account. |
| [Plugin Versions](/docs/flex/developer/plugins/api/plugin-version) | 500               | Used to track the modifications to a Plugin's code. This is per account.   |
| Plugin Package Size                                                | 10MB              | The file size of the plugin boilerplate and additional code.               |
