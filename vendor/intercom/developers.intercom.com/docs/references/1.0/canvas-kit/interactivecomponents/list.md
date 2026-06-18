# List

A list component renders a collection of list items. Below you can see what's needed for both the List Component and List's `Items` array.

```json
{  "type": "list",  "disabled": "true",  "items": [    {      "type": "item",      "id": "article-123",      "title": "How to install the messenger",      "subtitle": "An article explaining how to integrate Intercom",      "image": "http://somesite.com/article.png",      "image_width": 48,      "image_height": 48,      "roundedImage": false,      "disabled": "true",      "action": {        "type": "submit"      }    }  ]}
```

## List

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| items | Array (see below) | Yes | The items that will be rendered in the list. |
| disabled | truefalse | No | The defined state of the inputted value to render a specific style. |


## List Items

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| id | Any string | Yes | Unique identifier for the component within this card. |
| title | Any string | Yes | The text shown as the title for the list item. |
| subtitle | Any string | No | The text shown underneath the list item's title. |
| image | A valid URL | No | An image that will be displayed on the left-hand side of the list |
| image_width | Any number | Yes (if image provided) | Width of the image in pixels. |
| image_height | Any number | Yes (if image provided) | Height of the image in pixels. |
| rounded_image | truefalse (default) | No | Rounds the corners of the image if true. |
| disabled | truefalse | No | The defined state of the inputted value to render a specific style. |
| action | Action object | No | This can be a [Submit Action](/docs/references/1.0/canvas-kit/actioncomponents/submit-action), [URL Action](/docs/references/1.0/canvas-kit/actioncomponents/url-action), or [Sheets Action](/docs/references/1.0/canvas-kit/actioncomponents/sheets-action). |


## Card View

![](/assets/b3a8cce-list_card_view.dd37babb813e36cf8b97fb8bf07591c3f74d7bba12c7bde741b07b5b1cbb6233.71a4f21c.png)

## Frame View

![](/assets/ef24bac-list_frame_view.86cff0e2b8878fd4681287ae5dc7df9fe496481512625c4057feec47615d4d28.71a4f21c.png)