# Branding

import { DocsAccordionHydrator } from "../../../components/docs-accordion-hydrator";
import { DocsAccordion } from "../../../components/docs-accordion";

## Introduction

You can customize the look and feel of AuthKit via the *Branding* section of the [WorkOS Dashboard](https://dashboard.workos.com/branding).

The brand editor allows you to:

- Upload logos and favicons
- Set brand colors for buttons, links, and backgrounds
- Manage visual properties such as page layouts, corner radius, and dark mode appearance
- Include custom copy, images, and links to your app's terms-of-service and privacy policy
- Preview auth screens and emails in various languages, and translate custom text into every supported locale

The AuthKit preview will update in real-time as you make changes and accurately reflect the available authentication methods, giving you a clear picture of the authentication experience with AuthKit.

![Branding in the Dashboard](https://images.workoscdn.com/images/fc67ec10-44e1-467c-a094-32ed3ff5bd92.png?auto=format\&fit=clip\&q=80)

## Custom domains

WorkOS supports custom domains for both email and [ACS URLs](https://workos.com/docs/glossary/acs-url). For for information, see the [custom domains documentation](https://workos.com/docs/custom-domains).

## Appearance

AuthKit supports both light and dark mode; each brand configuration option is split across both so that they can be configured independently. You can enforce a specific appearance, or allow the user's OS system settings to determine which to use.

The corner radius applied to UI elements can also be configured; a lower value will result in a more formal aesthetic while a higher value has a more rounded, playful feel.

![Appearance options highlighted in the branding editor](https://images.workoscdn.com/images/3465072a-87a2-46cc-8577-4e9d4213009a.png?auto=format\&fit=clip\&q=50)

## Font Family

You can customize the font family used across AuthKit pages to match your brand's typography. The font family selector allows you to choose from a wide variety of Google Fonts to align with your product's brand. Only Google Fonts are supported for font family customization. This ensures optimal loading performance and reliability across all devices and browsers.

![Font family options in the branding editor](https://images.workoscdn.com/images/4db463c8-4eb6-414d-801b-e7460407b238.png?auto=format\&fit=clip\&q=80)

## Assets

You can upload custom brand assets to display in AuthKit, transactional emails, and the [Admin Portal](https://workos.com/docs/admin-portal).

![Asset options highlighted in the branding editor](https://images.workoscdn.com/images/2a6e77b6-c1fe-4850-a95b-f3e7b7d8bf87.png?auto=format\&fit=clip\&q=50)

There are three types of assets you can upload:

1. **Logo:** Your full size brand logo, styles vary but this would typically include the wordmark. Must be at least 160x160 px (JPG, PNG, or SVG. 100 KB max size)
2. **Logo icon:** A smaller, square version of the logo. This is often simply the logomark. Must be at least 160x160 px with a 1:1 aspect ratio (JPG, PNG, or SVG. 100 KB max size)
3. **Favicon:** A small icon that serves as branding for your website. It is often displayed in the browser tab alongside the address bar. Must be at least 32x32 px with a 1:1 aspect ratio (JPG, PNG, GIF, SVG, WebP, AVIF, or ICO. 100 KB max size)

### Logo style

Either the logo or the logo icon can be displayed in AuthKit. To select which to use, click the logo in the AuthKit preview after uploading both assets.

![Logo selection dialog open in the branding editor](https://images.workoscdn.com/images/2fbd9b69-3434-412b-ab53-e73568f3eb9a.png?auto=format\&fit=clip\&q=50)

## Color

You can control four colors across light and dark mode:

- Page background color
- Button background colors
- Button text color
- Link color

Other colors used in the UI, like the focus outline, hover styles, or borders, are created automatically based on the four colors you provide, ensuring a consistent look and feel.

![Color options in the branding editor](https://images.workoscdn.com/images/b6a2eb40-2510-4e54-bdca-0c91953fb84d.png?auto=format\&fit=clip\&q=50)

## Localization

You can preview how your auth pages and emails appear in various different languages. AuthKit is [localized](https://workos.com/docs/authkit/hosted-ui/localization) in many languages by default, and users are served in their preferred language automatically.

To preview your brand in different languages, use the language picker in the AuthKit preview pane.

![A preview of a user-facing email, translated in Spanish](https://images.workoscdn.com/images/663ee483-a14c-420b-9ba5-5c4c1f277b2c.png?auto=format\&fit=clip\&q=50)

## Copy

The page title and alternate action link text on AuthKit pages can be customized to fit your brand's tone of voice. They can be edited directly inside the AuthKit preview pane.

> An *alternate action* refers to the action a user will take to navigate between AuthKit pages. For example, if a user is on the sign-in page and they don't have an account, the alternate action will navigate to the signup page.

Start by selecting the page you want to edit. Then, click on the text you want to change from the preview pane.

![AuthKit page selector in the branding editor](https://images.workoscdn.com/images/6b2c0b3d-9f2f-404f-a893-23c3ec8a2d6f.png?auto=format\&fit=clip\&q=50)

![Text customization highlighted in the branding editor](https://images.workoscdn.com/images/07734ffb-c639-4abd-8d99-bd1feb9d5eda.png?auto=format\&fit=clip\&q=50)

When you edit copy in English, it automatically gets translated into [every supported language](https://workos.com/docs/authkit/hosted-ui/localization). A loading indicator appears next to the language picker during this process. After you save, your users will be served the translation that closest matches their locale.

## Page settings

AuthKit pages can optionally display a link to your app's privacy policy and/or terms-of-service. The link will then appear below the authentication form.

AuthKit also allows you to choose whether or not the first name and last name fields are displayed when signing up. To configure these options, select the *Page Settings* panel and update the respective field.

![Page settings in the branding editor](https://images.workoscdn.com/images/6b2e6b35-5658-42ab-8c6a-6b6aa0d9b381.png?auto=format\&fit=clip\&q=80)

## Page layout

The layout for AuthKit pages can be customized to fit your brand's needs. You can choose between a centered, one-column layout, or a two-column layout using [custom HTML and CSS](#custom-code-details-and-limitations) for the secondary column.

![Page settings in the branding editor](https://images.workoscdn.com/images/70acf0d4-caf8-435e-bedd-1960e8cd27c4.png?auto=format\&fit=clip\&q=80)

### Split layouts

Split page layouts allow you to add a secondary panel on AuthKit pages that can be customized with HTML and CSS. This can be used to display marketing content or decorative elements on the page.

To enable this feature, select the page you want to customize. Then, select the *Split* layout option under *Page Settings*. The secondary panel can be displayed to the left or right of the primary panel, and optionally hidden on mobile devices.

![Split layout setting in the branding editor](https://images.workoscdn.com/images/057b92eb-bf5d-4832-b8c3-33f470e766f1.png?auto=format\&fit=clip\&q=80)

Click on the secondary column from the preview pane. This will open a dialog where you can enter your HTML and CSS.

> Note: content in the content panel will not automatically be [localized](https://workos.com/docs/authkit/hosted-ui/localization).

![Custom code editor dialog in the branding editor](https://images.workoscdn.com/images/e0c512c9-dee0-470b-aa55-7d89c1b44a5c.png?auto=format\&fit=clip\&q=80)

### Custom code details and limitations

Any HTML and CSS entered into the custom code dialog will only be applied to the secondary column of the selected page. This allows you a high level of flexibility without impacting content elsewhere on the page.

For security purposes, all code input is sanitized and stripped of any potentially harmful elements. This means that you can't use JavaScript or any other dynamic content in your HTML. This includes `script`, `iframe`, `form`, and `object` elements—as well as inline event handlers for any elements.

For example, the following code will be sanitized from this:

```html
<h1 onclick="onClick()">Welcome to SuperApp</h1>
<script>
  const onClick = () => alert('Warning!');
</script>
```

…to this:

```html
<h1>Welcome to SuperApp</h1>
```

HTML `style` elements will also be removed to prevent overriding any content outside of the secondary panel. All custom CSS should be entered into the CSS editor.

CSS selectors will be scoped to the secondary column via [CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting). For compatibility with older browsers, we use a light transform step to convert the nested CSS to a flat structure.

For example, the following CSS will be transformed from this:

```css
h1 {
  color: var(--primary-color);
}
```

…to this:

```css
:where([data-hak-custom-html]) h1 {
  color: var(--primary-color);
}
```

## Last used sign-in badge

AuthKit sign-in pages can optionally display a *Last used* badge on an authentication method. This will indicate the most recent sign-in method for the user. The badge is shown by default and only shown when multiple sign-in methods are available.

![AuthKit Last used sign-in badge](https://images.workoscdn.com/images/2f0e3778-08f3-4eb4-b590-0b39ff92e0d7.png?auto=format\&fit=clip\&q=50)

## Custom CSS

For more granular control over AuthKit branding, element styles can be overridden using custom CSS. Custom CSS applies globally across all AuthKit pages to ensure consistency across the entire authentication experience. It does not affect emails or Admin Portal.

> AuthKit is powered by [Radix](https://www.radix-ui.com/) which has built-in accessibility and dark mode. If overriding styles, please make sure to test thoroughly, especially if removing original element styles.

![AuthKit Custom CSS in the brand editor](https://images.workoscdn.com/images/0f48c7f3-b99c-417a-bee9-2e54780515df.png?auto=format\&fit=clip\&q=80)

### Customize a specific page

Target specific pages using the `data-hak-page` attribute selector:

```css
.ak-Header {
  /* focus-start */
  [data-hak-page='sign-up'] & {
    .ak-Heading {
      font-size: 3rem;
      line-height: 1;
    }
  }
  /* focus-end */
}
```

List of all available pages

**`sign-in`**
: Main sign-in page

**`sign-in/password`**
: Password-based sign-in

**`sign-in/passkey/enroll`**
: Passkey enrollment during sign-in

**`sign-up`**
: Main signup page

**`sign-up/password`**
: Password-based signup

**`sign-up/passkey`**
: Passkey-based signup

**`sign-up/magic-auth`**
: Magic link signup

**`sign-up/registration`**
: Custom registration form

**`oauth`**
: OAuth provider selection

**`magic-code`**
: Magic code verification

**`magic-code/send`**
: Magic code request form

**`mfa/enrollment`**
: MFA setup/enrollment

**`mfa/verification`**
: MFA code verification

**`email-verification`**
: Email verification page

**`radar-challenge`**
: Fraud detection challenge

**`radar-challenge/send`**
: Phone number input for SMS challenge

**`radar-challenge/verify`**
: SMS verification code input

**`invite`**
: Invitation acceptance page

**`reset-password`**
: Password reset flow

**`organization-selection`**
: Organization picker

**`device`**
: Device activation page

**`device/success`**
: Successful device connection

**`device/denied`**
: Device connection denied

**`application-authorization`**
: App consent/authorization page

**`default-redirect`**
: Default redirect after successful auth

**`not-found`**
: 404 error page

**`auth-disabled`**
: Authentication disabled message

### Light and dark theme

Use the [light-dark](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark) CSS function to easily target both light and dark themes with a single declaration:

```css
.ak-PrimaryButton {
  /* focus-start */
  color: light-dark(#333333, #f0f0f0);
  /* focus-end */
}
```

For more control, target the parent theme selectors directly:

```css
.ak-Background {
  /* focus-start */
  .dark-theme & {
    background: linear-gradient(0deg, #333, #111);
  }

  .light-theme & {
    background: linear-gradient(0deg, #fff, #ccc);
  }
  /* focus-end */
}
```

> Media queries targeting `prefers-color-scheme` are not supported – use only the `.dark-theme` and `.light-theme` selectors.

### Nested selectors

AuthKit provides intelligent autocomplete support for CSS selectors. When you type a period (`.`) in the custom CSS editor, a popover will automatically appear showing available nested selectors for AuthKit elements, making it easier to target specific components and their child elements.

![Nested CSS selectors](https://images.workoscdn.com/images/e8e41033-9e08-40c5-bfc9-0e223b1bd890.png?auto=format\&fit=clip\&q=80)

### Examples

#### Custom background image

You can use external images as background images by specifying the URL in the `background-image` property.

```css
.ak-Background {
  /* focus-start */
  background-image: url('https://i.imgur.com/HO2EBgR.jpeg');
  background-size: cover;
  /* focus-end */
}
```

#### Reorder OAuth buttons

You can target an individual provider button by its `data-method` attribute.

```css
.ak-AuthButton {
  /* focus-start */
  /* Display Microsoft OAuth button first */
  &[data-method='microsoft'] {
    order: -1;
  }
  /* focus-end */
}
```

#### Adding custom text

Use CSS pseudo-elements to add custom text content.

Custom text content in CSS cannot be [localized](https://workos.com/docs/authkit/hosted-ui/localization). To learn how to automatically localize the text of your custom headings and links, read the [Copy](https://workos.com/docs/authkit/branding/copy) section.

```css
.ak-Header {
  /* focus-start */
  &::after {
    content: 'Sub heading';
    display: block;
  }
  /* focus-end */
}
```

> Some elements may already style the `::before` and `::after` pseudo-elements, so test your changes carefully.
