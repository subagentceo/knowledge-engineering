# Single Sends 2020 Update

> \[!CAUTION]
>
> **Action required to ensure successful create, read, and update operations using the Single Sends API**.
>
> The Single Sends API has changed. Please check this page for instructions.

To improve your experience when working with the Single Sends API, Twilio SendGrid has streamlined the API's request and response formats. You can now pass all the required information to create a Single Send in one request, eliminating the need to first create a template.

These improvements require modifications to your code. To ease this transition, we initially released the updated API while continuing to provide the previous API at a new root path until June 6, 2020. The previous API should not be relied on after June 6, 2020 and will be removed. The information below outlines the changes between the two APIs to help you migrate your code if you have not done so already.

## Migrating to the new API

**New API available at**: `https://api.sendgrid.com/v3/marketing/singlesends`

All requests to the `/marketing/singlesends` root path must use the updated request format. Any requests to `/marketing/singlesends` using the previous Single Sends format will result in a `400`-level error.

## API request and response bodies

The new Single Sends API request and response bodies have been refined to contain only five top level fields: `name`, `categories`, `send_at`, `send_to`, and `email_config`. Both `send_to` and `email_config` are object types containing additional fields.

The `email_config` field provides the ability to send data that would currently be associated with a template. Rather than first creating a template and then passing a template ID to the Single Sends create endpoint, all template data can be passed in the initial request using the fields in the `email_config` object.

The table below provides a list of all available fields for both the existing API and updated API. Notes are made where fields have been reorganized in the schema. Please see our [API reference](https://sendgrid.api-docs.io/v3.0/single-sends) for full documentation and code samples.

### Single Sends API fields

| Field: Existing Single Sends API | Field: Updated Single Sends API          | Notes                                             | Response or Request Field | Data Type       |
| -------------------------------- | ---------------------------------------- | ------------------------------------------------- | ------------------------- | --------------- |
| `name`                           | `name`                                   |                                                   | Both                      | `string`        |
| `categories`                     | `categories`                             |                                                   | Both                      | `array[string]` |
| `sender_id`                      | `sender_id`                              | Moved to `email_config`: `sender_id`              | Both                      | `integer`       |
| `status`                         | `status`                                 |                                                   | Response                  | `string`        |
| `custom_unsubscribe_url`         | `email_config`: `custom_unsubscribe_url` | Moved to `email_config`: `custom_unsubscribe_url` | Both                      | `string`        |
| `id`                             | `id`                                     |                                                   | Response                  | `string`        |
| `suppression_group_id`           | `id`                                     | Moved to `email_config`: `suppression_group_id`   | Both                      | `integer`       |
| `filter`: `list_ids`             | `send_to`: `list_ids`                    | Moved to `send_to`: `list_ids`                    | Both                      | `array[string]` |
| `filter`: `send_to_all`          | `send_to`: `all`                         | Moved to `send_to`: `all`                         | Both                      | `boolean`       |
| `send_at`                        | `send_at`                                |                                                   | Both                      | `string`        |
| `template_id`                    | NA                                       |                                                   |                           | `string`        |
| `updated_at`                     | `updated_at`                             |                                                   | Response                  | `string`        |
| `created_at`                     | `created_at`                             |                                                   | Response                  | `string`        |
| `ip_pool`                        | `email_config`: `ip_pool`                | Moved to `email_config`: `ip_pool`                | Both                      | `string`        |
| NA                               | `send_to`: `segment_ids`                 |                                                   | Both                      | `array[string]` |
| NA                               | `email_config`: `subject`                |                                                   | Both                      | `string`        |
| NA                               | `email_config`: `html_content`           |                                                   | Both                      | `string`        |
| NA                               | `email_config`: `plain_content`          |                                                   | Both                      | `string`        |
| NA                               | `email_config`: `generate_plain_content` |                                                   | Both                      | `boolean`       |
| NA                               | `email_config`: `design_id`              |                                                   | Request                   | `string`        |
| NA                               | `email_config`: `editor`                 |                                                   | Both                      | `string`        |
