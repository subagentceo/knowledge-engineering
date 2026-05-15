# Use Twilio Paste with a Flex Plugin

Not every component you build needs to start from scratch. Existing React component libraries can help you use components that have already been built with browser compatibility, responsive screen sizes, and accessibility in mind. Internally, the Flex UI leverages [Twilio Paste](https://paste.twilio.design/) for many of its components. You can similarly use Paste to create components that start with a similar style to Flex UI's existing layout.

We recommend using the following versions of Paste Core and Icons, to match the versions used in Flex UI:

```text
  "@twilio-paste/core": "^15.3.1",
  "@twilio-paste/icons": "^9.2.0",
```

If you need a Paste component added after v15, you can use other versions of Paste up to `twilio-paste/core` version `^18.0.0` and `twilio-paste/icons` version `^10.0.0`. Make sure to follow instructions described [here](#set-up-your-plugin-to-use-paste).

## **Design tokens**

Paste design tokens can be referenced as is from within the props of any Paste components.

```javascript
import { Text } from "@twilio-paste/core/text";


Flex.MainHeader.Content.add(<Text as="p" color="colorTextBrandHighlight" key="some-text">Hello</Text>, {
  sortOrder: -1,
  align: "end"
});

```

For more information, please refer to [Twilio Paste Tokens](https://paste.twilio.design/tokens).

> \[!NOTE]
>
> Creating a custom theme following the official Paste docs may not work. To override default design tokens when using Paste, please see [Theming Flex UI - Paste tokens](/docs/flex/developer/ui/overview-of-flex-ui-programmability-options#theming-flex-ui).

## Set up your plugin to use Paste

In order to use Twilio Paste inside your plugin, please use [Flex.setProviders()](https://assets.flex.twilio.com/docs/releases/flex-ui/2.0.0-beta.3/theming/ThemeProvider/#setproviders-providers-void) as follows which will wrap the Flex UI with the passed Paste theme provider. This will allow you to use Paste elements and design tokens within your plugin. Ensure this is done before [declaring any components](/docs/flex/developer/ui/add-components-flex-ui).

```typescript
import { CustomizationProvider } from "@twilio-paste/core/customization";
import { Button as PasteButton } from "@twilio-paste/core/button";

Flex.setProviders({
  PasteThemeProvider: CustomizationProvider
});

Flex.AgentDesktopView.Panel1.Content.add(
  <div key="A">
     <PasteButton key="A" variant="primary">
        Paste Button
     </PasteButton>
  </div>
);
```

## Customize Paste components using elements

To override Paste components styling using Paste's `elements`, you can use [Flex.setProviders()](https://assets.flex.twilio.com/docs/releases/flex-ui/2.0.0-beta.3/theming/ThemeProvider/#setproviders-providers-void) to wrap a custom Paste theme provider. In this, you can pass it an `elements` prop to customize specific components. Refer to [Providing Component elements](https://paste.twilio.design/customization/customization-provider/#providing-component-elements) for more details.

> \[!WARNING]
>
> You can only replace the `elements` property in the following code examples. `baseTheme`, `theme`, and `style` need to be included as provided.

## JavaScript example

```javascript
import { CustomizationProvider } from "@twilio-paste/core/customization";

Flex.setProviders({
   CustomProvider: (RootComponent) => (props) => {
       const pasteProviderProps = {
           baseTheme: props.theme?.isLight ? "default" : "dark",
           theme: props.theme?.tokens,
           style: { minWidth: "100%", height: "100%" },
           elements: {
               BUTTON: {
                   backgroundColor: "transparent"
               }
           }
       };

       return (
           <CustomizationProvider {...pasteProviderProps}>
               <RootComponent {...props} />
           </CustomizationProvider>
       );
   }
});
```

## TypeScript example

```typescript
import { CustomizationProvider, CustomizationProviderProps, PasteCustomCSS } from "@twilio-paste/core/customization";

Flex.setProviders({
   CustomProvider: (RootComponent) => (props) => {
       const pasteProviderProps: CustomizationProviderProps & { style: PasteCustomCSS } = {
           baseTheme: props.theme?.isLight ? "default" : "dark",
           theme: props.theme?.tokens,
           style: { minWidth: "100%", height: "100%" }
           elements: {
               BUTTON: {
                   backgroundColor: "transparent"
               }
           }
       };

       return (
           <CustomizationProvider {...pasteProviderProps}>
               <RootComponent {...props} />
           </CustomizationProvider>
       );
   }
});
```
