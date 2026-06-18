# Button

A button component is used to trigger an action. Depending on the action type, a button can:

- [Submit an action](#section-submit-action)
- Open a link in a new page
- Open a sheet


Buttons are submittable, meaning that when they are clicked, they will dispatch a webhook to the url specified through the relevant action. Read more about this by clicking on the different actions that can be taken above.

```json
{  type:  "button",  id: "button-123",  label: "Submit form",  style: "secondary",  disabled: true,  action: {    type: "url",    url: "https://www.intercom.com/"  }}
```

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| id | Any string | Yes | Unique identifier for the component within this card. |
| label | Any string | Yes | The text that will be rendered inside the button. |
| action | Object | Yes | This can be a [Submit Action](/docs/references/1.1/canvas-kit/actioncomponents/submit-action), [URL Action](/docs/references/1.1/canvas-kit/actioncomponents/url-action), or [Sheets Action](/docs/references/1.1/canvas-kit/actioncomponents/sheets-action). |
| style | primary (default)secondarylink | No | Styles the button in a specific preset style. |
| disabled | false (default)true | No | Styles as complete and prevents further editing or interaction. |


> 🚧 Line Breaks
Line breaks are not converted into tags in the rendered HTML, so all text will appear on a single line.


## Card View

![](/assets/c952743-button_card_view.258b38af99a5f97c0da4ec5b8648331a42685e670fa5cf1fc1a5a6443d1b6f72.71a4f21c.png)

## Frame View

![](/assets/8a8ef8a-button_frame_view.1e3fbde13903bd33a7db0ee6a9c9b999e4b4c65fd94559f1402a2dd7dc6dfcf1.71a4f21c.png)