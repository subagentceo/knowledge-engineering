# Flex UI local logging

> \[!NOTE]
>
> This Twilio product is currently available as a pilot release. Some features are not yet implemented and others may be
> changed before the product is declared as Generally Available. *Pilot and beta products are not covered by a Twilio
> SLA.* Learn more
> about [how Twilio supports products that are not yet GA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-Product-Support).

Local logging allow a user to capture client side logs into a text file which can then be shared with Twilio support to help troubleshooting issues.

## How it works?

If local logging is enabled (See [How to enable local logging](#how-to-enable-local-logging)), users will see a "bug" icon in the header.

![Twilio Flex UI showing no active tasks and no CRM configured with user idle status.](https://docs-resources.prod.twilio.com/220bf64101e92395750e445a6b8500fd6c6baf5e471aa3732c6d641d9a2f9819.png)

### **Steps**

1. Click on the bug button
2. Start logging and reproduce the issue. Logs will be captured until logging is stopped, even if user logs out.

   ![Twilio Flex UI showing active logging with options to finish and download logs.](https://docs-resources.prod.twilio.com/9121407764421df67c59476c97755b770a3c5bf563773cfe59cb30b3fc7f4edb.png)
3. Once the issue was reproduced, stop logging and download file

   ![flex ui local logging.](https://docs-resources.prod.twilio.com/c44dbda81a77c7fb3a11934b2d5737c095b4764fa3f4e4c891477c90d0b71236.png)
4. Send the file to Twilio support with issue description

## How to enable local logging?

There are 2 ways to enable local logging:

* For hosted and self-hosted Flex: Upload [plugin-logger](https://docs-resources.prod.twilio.com/documents/plugin-logger.js) plugin to assets
* For self-hosted Flex: add the following flag to configuration file (appConfig.js)

```javascript
var appConfig = {
<..>
      logger: { type:"file" },
<..>
};

```
