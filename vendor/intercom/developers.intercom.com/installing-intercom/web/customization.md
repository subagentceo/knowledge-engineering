# Customizing the Messenger

Once you have installed Intercom on your site, you should see the Messenger in the bottom right of your screen. You have some control over how the Messenger appears on your site.

## Messenger alignment

By default the Messenger will appear on the bottom right corner of your site, but you can change its position using `alignment`, `horizontal_padding`, and `vertical_padding`.

Add the following to your installation script:

```javascript
window.intercomSettings = {
  app_id: 'abc123',
  alignment: 'left',        // Left or right position on the page
  horizontal_padding: 20,   // Horizontal padding
  vertical_padding: 20      // Vertical padding
};
```

## Messenger z-index

You can choose the z-index of the Intercom Messenger by providing the following attribute in your `intercomSettings`.

```javascript
​window.IntercomSettings = {
  app_id: 'abc123',
  z_index: -15
}
```

The z-index can also be updated programmatically via an [API call](/installing-intercom/web/methods#intercomupdate).

`​Intercom('update', {"z_index": -15});`

### Limitations:

* Product tours will always remain on a high z-index. Product tour steps are part of your website, not part of the Messenger. As a result, the Messenger's z-index does not influence them.
​
* The Messenger on mobile web will always remain on a high z-index. Due to the size of most mobile devices, the Messenger needs  to be displayed on the top of everything.
​
* Confetti animation will always remain on a high z-index (however if it's rendered inside the  Messenger, a lower z-index of the parent widget will take precedence).


## Messenger style override

If you have multiple brand or style configurations set up in your Intercom workspace, you can specify which style the Messenger should load at boot time using `messenger_style_id`.

```javascript
window.intercomSettings = {
  app_id: 'abc123',
  messenger_style_id: '123456'
};
```

You can also switch styles dynamically without a full page reload:

```javascript
Intercom('update', { messenger_style_id: '789012' });
```

Style IDs are available in your Intercom workspace under **Settings → Messenger → Appearance → Manage Style**.

## Test out customizations

To see how the Messenger customizations work, check out [this Codepen](https://codepen.io/intercom/pen/QGqWxw).

You can test the different configuration options and can copy the code out of the editor if you decide you want to use it in your own app.

The example here provides a test App ID, but replace it with your own if you plan to use the code snippet in your own app.