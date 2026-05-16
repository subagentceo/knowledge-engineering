# System checkup

## Overview

Run system checkup to help identify configuration errors in your Flex instance.

## Considerations

System checkup can help you spot common Flex configuration issues. When using this tool, keep the following considerations in mind:

* System checkup only looks at the set of common configuration items that are listed on the page. It can't detect errors in other areas of your setup.
* System checkup labels configuration issues as errors if they don't match the expected standard configuration for that item. If you intentionally applied a custom configuration to your instance, system checkup might incorrectly flag this as an error. You control whether to apply the suggested fix for each error that system checkup finds, so you may choose not to apply a fix if it impacts your custom configuration.

## Run system checkup

1. From Twilio Console, open the [System checkup page](https://console.twilio.com/us1/develop/flex/resources/system-checkup) at **Flex** > **Tools and resources** > **System checkup**.
2. Click **Run system checkup**.

System checkup involves these processes:

* **Check**: checks your setup against a standard configuration. Each item checked has one of the following results:
  * **Success**: checkup didn't find any errors.
  * **Fail**: checkup found differences compared to a standard configuration. Review the details provided and decide if this is an error in your Flex instance.
  * **Not executed**: checkup couldn't check the item because its dependencies failed.
* **Fix**: lets you fix individual errors that checkup identified by clicking **Fix** next to the item. You only see this option if checkup identifies errors in your configuration.

The following image shows how Console displays the results of a check. Notice that failed items have a **Fix** option available, while items that weren't executed don't. Because there may be dependencies among items, start by correcting items that have a **Fix** option available before moving on to address items that weren't executed.

![System checkup page showing the result of a checkup. Shows examples of items that have success, fail, and not executed results.](https://docs-resources.prod.twilio.com/6273a603a9481e8b129eb00f57db6b325705c945aae9f60dc157df37c56ae5db.png)
