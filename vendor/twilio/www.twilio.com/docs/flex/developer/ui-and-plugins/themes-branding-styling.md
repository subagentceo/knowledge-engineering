# Override Flex UI 2.x.x themes, branding and styling

> \[!NOTE]
>
> [Auto-Generated Documentation for the Flex UI](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/) is now available. The auto-generated documentation is accurate and comprehensive and may differ from what you see in the official Flex UI documentation. It includes a [comprehensive overview of Theme options](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/theming/Theme/).

The Flex UI exposes 3 main levels of customization:

1. **Base Themes:** Flex UI 2.x.x supports two themes: Dark and Light.
2. **Base Theme Color Overrides:** Global color overrides that are inherited by all Flex UI components.
3. **Component Theme Overrides:** Granular color overrides that allow you to customize a specific component.

> \[!NOTE]
>
> If you're [migrating from Flex UI 1.x.x](/docs/flex/developer/ui/migration-guide), 2.x.x has a new configuration key called **config.theme**.

You can achieve these three levels of customization by updating the Flex theme configuration via `config.theme`. `config.theme` is defined by the following interface:

```javascript
interface ThemeConfigProps {
   isLight?: boolean; // Represents if light or dark theme
   tokens?: Tokens; // Paste tokens
   componentThemeOverrides?: Object; // Object containing component style overrides
}

```

Where:

**Tokens**: For usage documentation, see [Create a custom theme using the Paste Theme Designer](https://paste.twilio.design/customization/creating-a-custom-theme#create-a-custom-theme-using-the-paste-theme-designer).

**componentThemeOverrides**: For a list of components you can override, see [Flex UI API Reference](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/theming/Theme/).

## Defining your theme

### Base themes

Base themes provide a set of colors as a starting point for your contact center. Flex UI has two themes:

* Light
* Dark

### Configuring a base theme

You can configure the desired base theme in the Flex configuration object.

```javascript
const configuration = {
        theme: {
            isLight: false
        }
};

Flex.manager.updateConfig(configuration);

```

### Overriding base theme colors

You can also create your own variation of a theme by passing Paste token values. For Tokens documentation and details on how to generate them, see [Create a custom theme using the Paste Theme Designer](https://paste.twilio.design/customization/creating-a-custom-theme#create-a-custom-theme-using-the-paste-theme-designer).

```javascript
const configuration = {
      theme: {
        isLight: false,
        tokens: {
          backgroundColors: {
            colorBackground: "rgb(255, 0, 0)",
          },
          "textColors": {
            "colorText": "rgb(0, 0, 255)",
          }
        }
      }
    };

Flex.manager.updateConfig(configuration);

```

### Overriding individual components

Flex theming also supports granular customizations at the individual component level. In the following code sample, Flex will override the `MainHeader` background color and text color, as well as the `SideNav` background color and icon background color.

```javascript
const configuration = {
    theme: {
        componentThemeOverrides: {
            MainHeader: {
                Container: {
                    background: "#ff0000",
                    color: "#00ff00"
                }
            },
            SideNav: {
                Container: {
                    background: "#4a4e60"
                }
                Icon: {
                    background: "#4a4e60"
                },
            }
        }
    }
};

Flex.manager.updateConfig(configuration);

```

See the [complete list](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/theming/Theme/) of customizable components and properties.

## Applying your theme

Once you've defined a theme, you'll need to apply it to Flex UI.

### Applying your theme in a Flex Plugin

Define your color theme by specifying a Boolean value for `isLight`, along with optional tokens and component overrides.

*CustomTheme.js*

```javascript
const configuration = {
      theme: {
        isLight: false,
        tokens: {
          backgroundColors: {
            colorBackground: "rgb(255, 0, 0)",
          },
          "textColors": {
            "colorText": "rgb(0, 0, 255)",
          }
        },
        componentThemeOverrides: {
          MainHeader: {
              Container: {
                  background: "#ff0000",
                  color: "#00ff00"
              }
          },
          SideNav: {
              Container: {
                  background: "#0000ff"
              },
              Icon: {
                  background: "#ffc300",
                  color: "#ff5733"
              },
          }
        }
      }
}

Flex.manager.updateConfig(configuration);
```

Then set your custom theme inside the Flex configuration and apply it during plugin initialization.

*ThemePlugin.js*

```javascript
export default class ThemePlugin extends FlexPlugin {

  init(Flex, Manager) {
    const configuration = {...};

    // apply theme
    Manager.updateConfig(configuration);
  }
}

```

### Applying themes to self-hosted installations of Flex

Include your custom theme in the configuration object's `theme` property when initializing Flex.

```javascript
// refer to previous examples for setting your theme configuration
const configuration = {...}; 

Twilio.Flex.runDefault(configuration);

```

## Next Steps

* Explore the full reference of [configurable theme properties](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/theming/Theme/)
* [Write a plugin](/docs/flex/quickstart/getting-started-plugin) to customize your Flex theme
* Start changing the behavior of the Flex UI with the [Actions Framework](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/ui-actions/ActionsManager/)
