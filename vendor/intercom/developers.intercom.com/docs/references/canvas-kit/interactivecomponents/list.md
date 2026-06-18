# List

A list component renders a list of items which you provide in an array. You can make each list item take an action by adding the relevant action object to the item:

* [Trigger a submit request to be sent](/docs/references/canvas-kit/actioncomponents/submit-action)  Inbox Messenger
* [Open a link in a new page](/docs/references/canvas-kit/actioncomponents/url-action)  Inbox Messenger
* [Open a sheet](/docs/references/canvas-kit/actioncomponents/sheets-action)  Messenger


## List Parameters

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| type | `list` | Yes | The type of component you are rendering. |
| items | Array (see below) | Yes | The items that will be rendered in the list. |
| disabled | `true``false` | No | Styles all list items and prevents the action.Default is `false`. |


## Item Parameters

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| type | `item` | Yes | The type of component you are rendering. |
| id | Any string | Yes | A unique identifier for the item. |
| title | Any string | Yes | The text shown as the title for the item. |
| subtitle | Any string | No | The text shown underneath the item's title. |
| tertiary_text | Any string | No | The text shown next to the subtitle, separates by a bullet. |
| image | A valid HTTPS URL | No | An image that will be displayed to the left of the item. |
| image_width | Any integer | Yes (if `image` provided) | The exact width of the image in pixels. |
| image_height | Any integer | Yes (if `image` provided) | The exact height of the image in pixels. |
| rounded_image | `true``false` | No | Rounds the corners of the image.Default is `false`. |
| disabled | `true``false` | No | The defined state of the inputted value to render a specific style. |
| action | Action Object | No | This can be a [Submit Action](/docs/references/canvas-kit/actioncomponents/submit-action), [URL Action](/docs/references/canvas-kit/actioncomponents/url-action), or [Sheets Action](/docs/references/canvas-kit/actioncomponents/sheets-action). |