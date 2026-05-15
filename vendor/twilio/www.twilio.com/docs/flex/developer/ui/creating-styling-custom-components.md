# Create and Style Custom Components

As with most development, there are many ways for you to approach your customizations on top of Flex. These guidelines are based on our experience building Flex Plugins.

## Custom components

When building a new component, we recommend following the conventions demoed by the [Plugin Builder](/docs/flex/quickstart/getting-started-plugin#set-up-a-sample-flex-plugin). Create a directory within `/src/components`, and then a trio of files to represent the content and styles of your component.

```bash
src
├── components
│   └── MyComponent
│   │   └── MyComponent.jsx
│   │   └── MyComponent.Container.js
│   │   └── MyComponent.Styles.js
```

In this example:

* `MyComponent.jsx` will return a React component that could be added by one of Flex's `Content.add()` APIs
* `MyComponent.Container.js` connects the presentational component (`MyComponent.jsx`) to the Redux store
* `MyComponent.Styles.js` manages the styles you will apply to your component and its children

### Using Twilio Paste

Flex UI 2.0 leverages [Twilio Paste](https://paste.twilio.design/) for many of its components. To learn more, refer to [Use Twilio Paste with a Flex Plugin](/docs/flex/developer/ui/use-paste-with-a-plugin).

## Styling components

We've found it easier to manage plugin development when your styles and your code are bundled together as part of your plugin. We recommend using [Emotion](https://emotion.sh/docs/introduction) for managing the styles of your custom components. If you choose to use Emotion, make sure to include it in your `package.json` dependencies.

### Structure

We suggest defining a component-level style wrapper for each of your components. However, if the same styles are applied on the same type of element or you want to do dynamic styling, create separate styled components for better reusability.

Following the file structure above, we recommend keeping your styles alongside your components in files such as `MyComponent.Styles.js`.

### Using Emotion

There are many ways you can use Emotion to style your components. We suggest using [`styled`](https://emotion.sh/docs/styled) to define a component-level style wrapper. This `styled` component will include all of the styles for your main component and its children.

```javascript
// Panel.ts
import React from 'react';
import { PanelStyles } from './Panel.Styles';

const Panel = () => {
 return (
   <PanelStyles>
     <ul>
       <li className="first-item">A</li>
       <li className="second-item">B</li>
       <li className="third-item">C</li>
     </ul>
   </PanelStyles>
 );
};

export default Panel;

// Panel.Styles.ts
import { styled } from "@twilio/flex-ui";

export const PanelStyles = styled('div')`
   text-align: center;
   background: #D8BFD8;
   color: #fff;
   height: 100%;

   ul {
       Padding-top: 10px;
   }
   .first-item {
       font-size: 30px;
   }
   .second-item {
       font-size: 40px;
   }
   .third-item {
       font-size: 50px;
   }
`;
```

This approach also introduces useful conventions:

* Using classnames over individually styled elements favors using HTML elements whose semantics are clearer and more familiar to developers.
* When an element has a classname, you can infer that it is only styled with CSS and there is no custom functionality.

### Applying dynamic styles

`styled` can also be used to implement dynamic styles based on props. The Flex theme is automatically accessible within `styled` components via `props.theme` because Flex UI wraps all of its components in a `ThemeProvider`. You can also use this approach to pass in custom props, like `bgColor` in the example below.

```javascript
// MyView.Styles.ts
import { styled, Theme as FlexTheme } from "@twilio/flex-ui";

export const SubHeader = styled('div')<{ bgColor: string, theme?: FlexTheme }>`
   color: ${props => props.theme.tokens.textColors.colorText};
   background-color: ${props => props.bgColor};
   font-weight: bold;
   text-transform: uppercase;
`;

// MyView.tsx
render() {
    return (
        <div>
            <SubHeader bgColor="red">This font color should be red.</SubHeader>
            <SubHeader bgColor="blue">This font color should be blue.</SubHeader>
        </div>
    );
}
```

### Global styles

To add global styles to your plugin, use `injectGlobal` from Emotion. We suggest keeping a separate file for your global styles and importing it in your top-level plugin.

```javascript
// GlobalStyles.ts
import { injectGlobal } from 'react-emotion';

injectGlobal`
   .block {
       display: block;
   }
   .inline-block {
       display: inline-block;
   }
`;

// MyPlugin.tsx
import '../common/GlobalStyles.ts
```

#### Using a CSS file with your plugin

You can also declare your styles in a CSS file and import that into a JS file for your global styles.

```javascript
// GlobalStyles.js
import { injectGlobal } from 'react-emotion';
import global from './global.css';
injectGlobal`
  ${global}
`;

```

```css
/* global.css */
.SidePanel-Custom-Container {
  height: 100%;
  border: 1px blue;
}

```

You can then use `displayName` to load a stock Flex component (like [the SidePanel](https://assets.flex.twilio.com/releases/flex-webchat-ui/2.4.0/docs/SidePanel.html)) and dynamically set its CSS class name based on the string that you set.

```javascript
<Container>
   <StyledSidePanel
        displayName="Custom"
        themeOverride={theme && theme.OutboundDialerPanel}
        handleCloseClick={handleClose}
        title={title}
   >
      <ListContainer
          itemList={itemList}
          itemType={itemType}
      />
   </StyledSidePanel>
</Container>

```

In this example, the styles you've declared within `.SidePanel-Custom-Container` in your CSS file will be applied.

> \[!WARNING]
>
> When you use CSS in Flex, do not use `Twilio-` in any of your class names.

## External styles

It may not always be practical to define your styles alongside each component. Maybe you are using shared stylesheets across a suite of applications. Or maybe you're building multiple plugins that should share a central CSS asset.

The `loadCSS` and `loadJS` methods from `flex-plugin` can be used in these situations to load external resources when initializing your plugin.

```javascript
import { FlexPlugin, loadCSS, loadJS } from 'flex-plugin';

export default class AdminPlugin extends FlexPlugin {
   constructor() {
       super('AdminPlugin');
   }

   public init(flex, manager) {
       loadCSS('https://dancing-owl-1234.twil.io/assets/test.css');
       loadJS('https://dancing-owl-1234.twil.io/assets/test.js');
  }
}
```

One difficulty with this approach is ensuring that your external URLs can be used in whichever environment you're deploying your plugin. For example, you wouldn't want to re-build your plugin if the styles depend on versioned URLs or if the assets are different in your development vs. production environment.

One approach is to use the Flex Configuration API to store the URLs as attributes, and then to reference these attributes from within your plugin.

```bash
curl https://flex-api.twilio.com/v1/Configuration -X POST -u ACxxx:auth_token \
    -H 'Content-Type: application/json' \
    -d '{
        "account_sid": "ACxxx",
        "attributes": {
            "stylesheet_url": "https://example.com/styles.css"
        }
    }'
```

```javascript
public init(flex, manager) {
   loadCSS(manager.serviceConfiguration.attributes.stylesheet_url);
}
```
