# Text

The text component is used for rendering blocks of text inside messenger cards. It does not accept most styling information (e.g. font size and text color). Links and bold font can be rendered through Markdown however.

```json
{  "type":  "text",  "text":  "Welcome to the messenger app framework",  "style": "header",  "align": "left"}
```

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| id | Any string | No | Unique identifier for the component within this card. |
| text | Any stringMarkdown (ie. [](), **) | Yes | The text that will be rendered inside the component. |
| align | left (default)centerright | No | Aligns the text inside the component. |
| style | headerparagraph (default)mutederror | No | Styles the text in a specific preset style. |
| bottom_margin | none | No | Disables a component’s default margin-bottom of 10px. |


> 🚧 Line Breaks
Line breaks are not converted into tags in the rendered HTML, so all text will appear on a single line.


## Card View

![](/assets/55b5596-text_card_view.ad20a616c5f0c529a1440e2c5e91c1283714e23682ea0b2dd1193e976a21a440.71a4f21c.png)

## Frame View

![](/assets/f04c8bc-text_frame_view.d2c9b9038eae9bc8f2181c8c57c0d92e6f6ed5def3f84ea72fc3bdf3f6c6a268.71a4f21c.png)