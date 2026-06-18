# Image

An image component is used to display an image.

> 🚧 HTTPS Images
If your request URLs (or website URLs) are over HTTPS, you will need to ensure that images are loaded over HTTPS likewise. Otherwise, they will not work.


## Parameters

| Parameter | Possible Values | Required | Description |
|  --- | --- | --- | --- |
| type | `image` | Yes | The type of component you are rendering. |
| id | Any string | No | A unique identifier for the component. |
| url | A valid HTTPS URL | Yes | The URL where the image is located. |
| align | `left``center``right``full_width` | No | Aligns the image inside the component.Default is `left`. |
| width | Any integer | Yes | The exact width of the image in pixels. |
| height | Any integer | Yes | The exact height of the image in pixels. |
| rounded | `true``false` | No | Rounds the corners of the image. Default is `false`. |
| bottom_margin | `none` | No | Disables a component’s margin-bottom of 10px. |
| action | Action Object | No | This can be a [URL Action](/docs/references/2.14/canvas-kit/actioncomponents/url-action) only. |


## Preview