# Provider icons

# Provider icons

Icons for third-party providers are available through the WorkOS CDN. These icons cover identity providers, Directory Sync, and domain verification services used within the Admin Portal.

## List Provider Icons

Get a list of all of existing provider icons.

#### Request

#### Response

## Get a Provider Icon

To use an icon in your project, you can reference the CDN link directly. You can alternate between light and dark mode icons by changing the path in the URL or using CSS media queries.

```html title="Example icon"
<picture>
  <source
    srcset="https://cdn.workos.com/provider-icons/dark/okta.svg"
    media="(prefers-color-scheme: dark)"
  />
  <img
    src="https://cdn.workos.com/provider-icons/light/okta.svg"
    alt="Okta icon"
  />
</picture>
```

You can change the icons to grayscale by adding the `filter` CSS property.

```css title="Grayscale style"
img {
  filter: grayscale(100%);
}
```