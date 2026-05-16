# Localize a plugin (Public Beta)

> \[!IMPORTANT]
>
> Localization is currently available as a Public Beta product and the information contained in this document is subject to change. Some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

## Overview

Use this guide to localize your plugins so they display in the same language as the native Flex UI when a user [changes their language setting](/docs/flex/end-user-guide/change-display-language).

To render plugin text in a different language, follow these steps:

1. [Add a file with localized static strings](#step-1-add-your-language-files-and-localized-static-strings) for each language that's available.
2. In the same file, [add localized dynamic strings](#step-2-add-localized-dynamic-strings).
3. In your plugin file, [add code to read Flex's current locale](#step-3-read-flexs-current-locale) so the plugin can determine which language to use.
4. [Update your plugin components](#step-4-localize-your-plugin-components) to use the localized strings.

## Plugin directory structure

This guide assumes your plugin uses a file structure similar to this:

* `PluginName`
  * `src`
    * `components`: directory that contains your plugin components.
    * `locales`: directory that contains your localization files.
      * `es-MX.js`: file that contains the localized strings for Español (México).
      * `en-US.js`: file that contains the localized strings for English (US).
      * `pt-BR.js`: file that contains the localized strings for Português (Brasil).
    * `index.ts`
    * `PluginName.ts`: file that contains the plugin code, including the [code to read Flex's locale setting](#step-3-read-flexs-current-locale).

## Step 1: Add your language files and localized static strings

1. In your `locales` directory, add a file for each supported language.
2. In each file, define your custom strings and their translations.

The code samples below show an example string for Español (México) and for English (US), respectively.

```javascript {title="es-MX.js"}
export const mexicanSpanishStrings = {
    WelcomeButton: "Bienvenido"
};
```

```javascript {title="en-US.js"}
export const usEnglishStrings = {
    WelcomeButton: "Welcome"
};
```

## Step 2: Add localized dynamic strings

To localize dynamic strings, such as agent status, add strings and their translations to the localization file for each language using the following format. You can localize both default and custom strings.

```javascript {title="es-MX.js"}
 if (manager.localization.localeTag === "es-MX") {
                manager.strings = {
                    ...manager.strings,
                    tr_activity_Available: "Disponible",
                    tr_activity_Offline: "Desconectado",
                    "tr_activity_On vacation": "De vacaciones"
                };
            }
```

```javascript {title="pt-BR.js"}
if (manager.localization.localeTag === "pt-BR") {
                manager.strings = {
                    ...manager.strings,
                    tr_activity_Available: "Disponível",
                    tr_activity_Offline: "Desconectado",
                    "tr_activity_On vacation": "De férias"
                };
            }
```

## Step 3: Read Flex's current locale

Your plugin can read Flex's current locale setting from the `manager` object at `manager.localization.localeTag`. The `localeTag` property defines the Internet Engineering Task Force (IETF) language tag of the current UI locale. For example, `en-US`.

To read Flex's current locale:

1. In your plugin file, add code to read the locale and apply the defined strings based on the `localeTag` value.<br />

```javascript
// Read Flex's locale setting
const localeTag = manager.localization.localeTag; // e.g. "en-US"
// Conditionally apply the relevant strings
switch (localeTag) {
case "en-US":
manager.strings = {...usEnglishStrings, ...manager.strings }
break;
case "es-MX":
manager.strings = {...mexicanSpanishStrings, ...manager.strings }
break;
}
```

2. (Optional) If you want to make other locale-related customizations, see the [Flex UI API reference](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/localization/LocalizationType/) for more information about these available properties:
   * `availableLocales`: The list of locales the user sees when setting their language. Currently, this list is read-only.
   * `setLocalePreference`: A method to save the user's locale preference without using the native language selector. You can use this for implementing a custom locale selection widget.

## Step 4: Localize your plugin components

In the definition for each component, add the custom string label you defined to localize that component. For example, [step 1](#step-1-add-your-language-files-and-localized-static-strings) shows how to define a string for `WelcomeButton`, and the code sample below shows how to add that string to the `WelcomeButton` component.

```javascript
// Use your localized strings in a component
const WelcomeButton = ({strings}) => (<Button>{strings.WelcomeButton}</Button>));
...
<WelcomeButton strings={customStrings}/>
```

This lets Flex show the locale-specific string based on the current UI locale.
