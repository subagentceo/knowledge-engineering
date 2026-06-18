# Check email message delivery

Email logs provide a running record of the delivery status of all email messages that you sent. These logs might be hundreds or thousands of lines of data. To facilitate finding a specific record or range of records, you can reduce the number of messages using filters or find all sent to a specific email address.

To review the email logs when logged into the [Twilio Console][], go to **Products & Services** > **Email** > **Logs**. The **Email Logs** page appears.

## Search for messages to one email address

1. Type a specific recipient email address in the **Recipient email address** box.
2. Press the **Enter** key.

## Reduce displayed records using filters

To reduce the number of displayed delivery records, apply filters to the email logs. From the **Email Logs** page, you can turn on filtering, then choose the values for those filters.

### Turn on filters for the email log

1. Click **Add Filters**.
2. Click the checkbox next to one or more of the following filters:
   * **Subject**
   * **Date Range**
   * **Categories**
   * **Status**
   * **Response**
   * **Message ID**
   * **Timezone**
3. As each filter gets selected, it adds the dropdown menu for that filter to the console.

### Use a filter on the email log

## Subject

Limit the display of email messages in the log to an exact match of its subject line.

1. Type the subject line of the email message to find in the **Subject** box.
2. Click **Apply**.

## Date Range

Limit the display of email messages in the log to a chosen range of dates.

1. Click the necessary time range from the provided options:
   * **Last 3 Days**
   * **Last 7 Days**
   * **Last 30 Days**
   * **Custom Range**. If you select **Custom Range**, set the **Start date** and **End date**.
2. Click **Apply**.

## Categories

Limit the display of email messages in the log to a chosen category. A category applies a human-readable identifier to an email message that aids in analyzing email campaign effectiveness.

1. Choose a category from the **Category** dropdown menu.
2. Click **Apply**.

## Status

Limit the display of email messages in the log to a chosen delivery status.

1. Click one or more of the status links or checkboxes.
   * **Delivered**
   * **Processed**
   * **Deferred**
   * **Bounced**
   * **Dropped**
   * **Blocked**
2. Click **Apply**.

## Response

Limit the display of email messages in the log to an exact match of its response message.

1. Type the provider response message to the email message to find in the **Response** box.
2. Click **Apply**.

## Message ID

Limit the display of email messages in the log to an exact match of its Message ID.

1. Type the unique ID for the email message to find in the **Message ID** box.
2. Click **Apply**.

## Timezone

Limit the display of email messages in the log to a chosen Time Zone.

1. Choose the time zone for the email message to find in the **Time Zone** box.\
   This menu uses the [tz database time zone identifier][tz]
2. Click **Apply**.

### Clear the filter from the log

Click **Clear** to remove chosen filter within the dropdown menu.

### Remove the filter dropdown menu from the console

Click **Remove Filter** to remove the chosen filter as a parameter.

## Turn off search filters

* To turn off one filter, you have two options:
  1. Click the **X** to the right of the filter you want to remove.
  2. Click the filter dropdown, then click **Clear**.
* To turn off all filters, click **+ Add Filters**, then **Clear all**.

[Twilio Console]: https://1console.twilio.com

[tz]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
