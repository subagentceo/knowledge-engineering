# Image

An image component is used to display an image inside a messenger card.

> 🚧 HTTPS Images
If your request URLs (or website URLs) are over HTTPS, you will need to ensure that images are loaded over HTTPS likewise. Otherwise, they will not work.


```json
{  type: "image",   url:  "https://somesite.com/images640_480.png",  width:  640,  height: 480}
```

| Parameter | Possible Values | Required | Function |
|  --- | --- | --- | --- |
| id | Any string | No | Unique identifier for the component within this card. |
| url | A valid URL | Yes | The URL where the image is located. |
| align | left (default)centerright | No | Aligns the image inside the component. |
| width | Any number | Yes | Width of the image in pixels. |
| height | Any number | Yes | Height of the image in pixels. |
| rounded | truefalse (default) | No | Rounds the corners of the image if true. |


## Card View

![](/assets/c3a5705-image_card_view.31598128efd29b2428256dd73f80abca6ca204ba963fcda58a6dcb4a7a38ec2c.71a4f21c.png)

## Frame View

![](/assets/3f73cb9-image_frame_view.f3cea348f74387211aae141c176fba4a43406303a72525122282b1992011f334.71a4f21c.png)