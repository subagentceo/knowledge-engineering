# Data-Table

A data-table component is used for rendering a table of key-value pairs. For Messenger, text will wrap around on multiple lines. For Inbox and Frame (ie. Configure) views, we will truncate and use tooltips on hover if the text overflows.

## Data-Table Parameters

| Parameter | Possible Values | Required | Description |
|  --- | --- | --- | --- |
| type | `data-table` | Yes | The type of component you are rendering. |
| items | Array (See Below) | Yes | The items that will be rendered in the data-table. |


## Field-Value Parameters

| Parameter | Possible Values | Required | Description |
|  --- | --- | --- | --- |
| type | `field-value` | Yes | The type of component you are rendering. |
| field | Any string | Yes | The text of the key in your key-value pair. |
| value | Any string | Yes | The text of the value in your key-value pair. |


## Preview

div
iframe
This browser cannot load our Canvas Kit Builder. Please use another browser.