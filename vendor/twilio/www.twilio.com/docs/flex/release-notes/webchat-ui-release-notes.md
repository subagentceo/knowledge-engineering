# Flex Webchat release notes

## Overview

This page provides release notes for Flex Webchat. For details about setting up and using Webchat, see our [Webchat 3.x.x documentation](/docs/flex/developer/conversations/webchat).

To find other release information, go to these pages:

* If you're looking for information about Flex UI, see the [Flex UI release notes](/docs/flex/release-notes/flex-ui-release-notes-for-v2xx).
* For historical release notes for earlier Webchat versions, see the [archived Webchat release notes](/docs/flex/release-notes/webchat-release-notes-archive).

## v 3.4.0

*release date April 9, 2026*

### Added

* Added support for [styling customizations](/docs/flex/developer/conversations/webchat/styling-customizations). You can now adjust the appearance of Webchat components to match your organization's style guide.

## v 3.3.0

*release date April 2, 2025*

### Changed

* Updated [Twilio Paste](https://paste.twilio.design/) to version 21.0.0.
* Security-related updates.

## General availability

*announced March 20, 2025*

We're excited to announce that Flex Webchat 3.x.x is now generally available (GA).

For information about updating from Webchat 2.x, see our [Webchat migration guide](/docs/flex/developer/conversations/webchat/migrate).

## v 3.2.0

*release date March 10, 2025*

### Changed

* Updated to provide enhanced security.

### Fixed

* Fixed an error that occurred when using Webchat with the [Google Dialogflow CX native integration in Flex for virtual agents](/docs/flex/admin-guide/integrations/google-dialogflow-cx-native-integration). Previously, when the webchat reloaded or refreshed in a conversation that included a Dialogflow participant, the chat would freeze and the following error appeared in the Console log: "Error: Getting User is not supported for this Participant type: dialogflowcx."
* Corrected an issue that caused unsent attachments from a previous chat to unexpectedly appear in a new chat. For customer-initiated chats, if a customer attached a file but left the chat before sending it, the attachment reappeared if the customer started a new chat.

## v 3.1.0

*release date December 9, 2024*

### Added

* Webchat 3.1.0 supports [pre-engagement form configuration and context](/docs/flex/developer/conversations/webchat/pre-engagement-and-context). These features enable you to gather additional information to help with routing decisions and provide agents with details that can make their interactions more efficient and effective.
* Customers can now leave the chat by closing the chat window. Previously, only an agent could end the chat. **Note**: If you're updating from Webchat 3.0.x and have implemented custom functionality to allow customers to end the chat, you must ensure that any conflicts with this new feature are resolved before you update to this version. For more information, see [Set up and use Webchat 3.x.x](/docs/flex/developer/conversations/webchat/setup).{" "}
* In Flex UI 2.10.0 and later, you can enable an option to show a message to agents to let them know when the customer has left the chat. This setting is turned off by default. To use it, turn on the new **Show message when customer leaves webchat** feature on the Flex [**Feature Settings**](https://flex.twilio.com/admin/features) page.

## v 3.0.0

*release date December 12, 2023*

### Summary

To get started with Webchat 3.0, see the [Webchat 3.0 overview](/docs/flex/developer/conversations/webchat). This release is in Public Beta.

Webchat 3.0 works with Flex UI version 2.0.x and later.

This release includes breaking changes from Webchat 2.0. If you want to upgrade from Webchat 2.0, you must [migrate to the new version](/docs/flex/developer/conversations/webchat/migrate).

### Added

* Webchat 3.0 is now deployed to your website using a deployment key, which [shields your account information](/docs/flex/developer/conversations/webchat/security).
* When a new chat begins, Webchat [captures a fingerprint](/docs/flex/developer/conversations/webchat/security) of the user's browser and device, then validates that fingerprint with every new message to prevent spoofing.

### Changed

* Webchat 3.0 is built on [Flex Conversations](/docs/flex/conversations), rather than [legacy messaging](/docs/flex/developer/messaging).

## v 2.9.4

*release date May 28, 2024*

### Changed

* Webchat now uses the Open Sans font hosted on Twilio's CDN instead of the file hosted on Google's CDN.

## v 2.9.3

*release date September 15, 2023*

### Fixed

* Fixed support for .me links in markdown in CDN version

## v 2.9.2

*release date September 15, 2023*

### Fixed \[#fixed-2]

* Fixed support for .me links in markdown in NPM version

## v 2.9.1

*release date June 15, 2021*

### Dependencies updated

* Upgraded Handlebars version to 4.7.7

## v 2.9.0

*release date May 11, 2021*

### Fixed \[#fixed-3]

* A fix to allow markdown links to be rendered correctly even if there is a space between the link text and the URL it's linking to

## v 2.8.1

*release date FEB 26, 2021*

### Fixed \[#fixed-4]

* Characters being dropped intermittently when typing in the input field

## v 2.8.0

*release date FEB 24, 2021*

### Added \[#added-2]

* Added .app domain to the allow list

### Fixed \[#fixed-5]

* Fixed the issue with WebChat not loading in mobile Safari
* Fixed the markdown code element overflow bug

## v 2.7.1

*release date JAN 13, 2021*

### Dependencies updated \[#dependencies-updated-2]

* \[axios] To version 0.21.1

## v 2.7.0

*release date DEC 9, 2020*

### Added / Changed

* [Markdown](/docs/flex/end-user-guide/messaging#markdown) feature improvements including support for new elements (headings, ordered lists, code snippets, block quotes) and several bugfixes. **Note**, implementation now relies more on semantic HTML, so if you have styled generic html elements, keep an eye on how they look in chat.

### Dependencies updated \[#dependencies-updated-3]

> \[!NOTE]
>
> New versions of dependencies can contain changes in internal APIs that we do not document in release notes. If you're using any undocumented apis of upgraded dependencies, please review your code and update your customizations as needed. Any changes in undocumented api's are not considered breaking changes, however, if you are using them, this might break your customizations.
>
> Example: This version of chat-sdk contains changes in internal API. To access channel attributes, `channel.attributes` is supported as per [https://media.twiliocdn.com/sdk/js/chat/releases/3.4.0/docs/Channel.html](https://media.twiliocdn.com/sdk/js/chat/releases/3.4.0/docs/Channel.html) and not `channel.state.attributes`.

* \[[twilio-chat\] To version 3.4.0](https://media.twiliocdn.com/sdk/js/chat/releases/3.4.0/docs/)

## v 2.6.1

*release date OCT 27, 2020*

* Upgraded lodash transient dependency in CDN bundle to remove a security vulnerability
* Fixed a bug with drag and drop into chat input field

### **Dependencies updated**

* \[handlebars] upgraded to version 4.7.6

## v 2.6.0

*release date SEP 16, 2020*

### **Added**

* You can now set character limit of a message programmatically. Default limit is 32768 characters

`MessagingCanvas.defaultProps.charLimit = 1000`

### **Changed**

* Size of CDN bundle has been reduced from 550kb to 390kb

### **Fixed**

* Domain links with parameters, not separated by a slash, are now recognized as links. For instance: `http://flex.twilio.com?test=true`.

## v 2.5.1

*release date SEP 01, 2020*

> \[!NOTE]
>
> Web Chat UI API Reference for this version of Web Chat UI is available
> [here](https://assets.flex.twilio.com/docs/releases/flex-webchat-ui/2.5.1/)

### Fixed \[#fixed-6]

* Chat link parser now recognize domain and parameters not separated by a slash. For instance: `http://flex.twilio.com?test=true`.

## v 2.5.0

*release date JUN 23, 2020*

### Added \[#added-3]

* Image and file sharing for Web Chat channel in Pilot - Agents and Customers can now share images, documents and other files during a chat conversation. You can learn more about Chat attachments [here](/docs/flex/developer/messaging/webchat/enable-attachments).
* A new Boolean property in the **MainContainer** component called **showNotificationBar** which by default is `true`. It's used to render the notification bar below the main header. You can find out more about the Notifications Framework here

### Fixed \[#fixed-7]

* CSS font style fix for title child (key=text) in `MessageCanvasTray`

## v 2.4.0

*release date APR 27, 2020*

### Dependencies updated \[#dependencies-updated-4]

* \[handlebars] to version 4.7.3

> \[!WARNING]
>
> **Handlebars Dependency Upgrade:** Handlebars provides templating for the
> strings exposed by Flex UI and Flex WebChat UI. In this release we are
> upgrading Handlebars to 4.7.3 to fix critical security vulnerabilities exposed
> in previous versions of Handlebars. This may be a breaking change if you use
> certain undocumented Handlebars features. You can find more information about
> this change at[the following
> link](https://github.com/handlebars-lang/handlebars.js/blob/master/release-notes.md#v460---january-8th-2020).

### Changed \[#changed-2]

* We restructured our internal dependencies and stopped using a bundled dependency for our internal libraries. Developers can now manage their project dependencies using **yarn**.

### Fixed \[#fixed-8]

* Improved chat message input rendering performance by debouncing store update on keypress.
* Fixed illegal unquoted character error when submitting WebChat messages via Enter button.

## v 2.3.1

*release date MAR 04, 2020*

### Fixed \[#fixed-9]

* Highlight URLs in chat messages only if they are not part of another string

## v 2.3.0

*release date JAN 16, 2020*

### Fixed \[#fixed-10]

* Issue with WebChat messages being marked as read
* Attempt to create a manager instance using incompatible redux store will now throw an error instead of string

### Changed \[#changed-3]

* `MainContainer` max-height set to `80vh` to make webchat accessible from smaller screens.

## v 2.2.1

*release date OCT 30, 2019*

### Changed

* Numbered List support for Markdown has been temporarily suspended due to some side effects found with the implementation. All other markdown options are still available as part of the released feature. Find out more about Markdown support [here](/docs/flex/end-user-guide/messaging)

## v 2.2.0

*release date OCT 07, 2019*

### **Added**

**Markdown**

* WebChat now has basic markdown support. A user can use Flex standard markdown syntax when typing a WebChat message and it will be displayed to agent and WebChat user as formatted text

![Chat interface showing markdown support with bold and italic text.](https://docs-resources.prod.twilio.com/182a37321a3672e54adee5c81726bfabfb79fb514f62fe9f4b63b02a9cb68560.png)

* Messages with markdown syntax can also be sent with [Programmable Chat REST API](/docs/chat/rest/message-resource) into the chat channel using the same Flex markdown syntax and they will displayed for Flex and WebChat users as formatted text.
* Flex user must be using [Flex UI V1.4.0](/docs/flex/release-notes/ui-release-notes) or later
* Flex standard markdown syntax:

| **Options**   | **Syntax**                                    |
| ------------- | --------------------------------------------- |
| Bold          | \*\*Bold\*\*                                  |
| Italic        | \*Italic\*                                    |
| Strikethrough | \~Strikethrough\~                             |
| Bullet list   | \* List<br /><br />\* List<br /><br />\* List |
| Numbered list | 1. One<br /><br />2. Two<br /><br />3. Three  |

### **Changed**

* The Message Input component's useLocalState flag is obsolete
* Typing indicator in chat canvas now shows count of people typing if that number is above 1.

## v 2.1.2

*release date AUG 29, 2019*

* `DynamicForm` email validation now correctly supports 2-chars domains, subdomains.

## v 2.1.1

*release date AUG 12, 2019*

### Added \[#added-4]

* Bundled code now transpiles to IE11-compatible version. If you're integrating Flex NPM package into your application, you also have to include polyfills for required features at the top of your application's entry point. For instance, in case of `create-react-app`:

```javascript
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
```

## v 2.1.0

*release date JUL 17, 2019*

### Dependencies updated \[#dependencies-updated-5]

* [twilio-chat](/docs/chat) from version 3.0.2 to version 3.2.3
* @material-ui/core from version 1.3.1 to version 3.9.3

### Added \[#added-5]

* Aria props properties to the following components to support accessibility:

  * MessageInput:

    * `sendButtonAriaProps` • AriaProps • Send button aria props (`{ ariaLabel: "Send Message" }` by default).
    * `textAreaAriaProps` • AriaProps • Text area aria props (`{ ariaLabel: "Enter your message here to get help" }` by default)
  * MessageList:

    * `listContainerAriaProps` • AriaProps • List container aria props (`{ ariaLive: AriaLive.Off }` by default).
  * EntryPoint:

    * `collapsedIconAriaProps` • AriaProps • Collapsed icon aria props (`{ariaLabel: "Click here to open Web Chat and get help."}` by default).
    * `openedIconAriaProps` • AriaProps • Opened icon aria props (`{ariaLabel: "Hide Chat"}` by default).

*Example on how to set aria attributes:*

```javascript
FlexWebChat.MessageInput.defaultProps.sendButtonAriaProps = {
  ariaLabel: "Send Message",
  ariaLive: FlexWebChat.AriaLive.Polite,
};

FlexWebChat.MessageInput.defaultProps.textAreaAriaProps = {
  ariaLabel: "Enter your message here to get help",
  ariaLive: FlexWebChat.AriaLive.Assertive,
};
```

* Chat "Send message" button can now be themed with `theme.Chat.MessageInput.Button`.

*Example on how to change the icon for a text:*

```javascript
appConfig = {
    <...>
    Chat: {
        MessageInput: {
            Button: {
                borderRadius: "5px",
                width: "100px",
                fontSize: "18px",
                svg: {
                    display: "none"
                },
                ":after": {
                    content: '"Send Button text"'
                }
            }
        }
    },
    <...>
```

### Changed \[#changed-4]

* General Flex UI styles (like headers, paragraphs or links) are now applied only to HTML elements that have a class starting with Twilio or their direct descendants without any class
* CSS reset is no longer applied automatically.

### Fixed \[#fixed-11]

* EntryPoint.tagline can now be set also via [config's ComponentProps](/docs/flex/developer/messaging/webchat/configuration).
* Polyfills for IE11 support. Now WebChat [is added to the page from CDN](/docs/flex/developer/messaging/webchat/setup), it will work in IE11 with some minor style issues.
* Email validation in the [pre-engagement form](/docs/flex/developer/messaging/webchat/pre-engagement-and-context) now allows numbers in the email.

### Removed

* Unused `AppState.tryGet` method

## v 2.0.0

*@twilio/flex-webchat-ui@2.0.0*

*release date APR 1, 2019*

> \[!WARNING]
>
> This major version contains breaking changes

> \[!NOTE]
>
> This WebChat version works with any Flex UI version starting from version
> 1.0.0

### Fixed \[#fixed-12]

* We have added a character limit of 32kB to `MessagingCanvas.` Users will see a character limit notification and message submit will be disabled if the limit is reached. The `SendMessage` action will validate the character limit and fail the action if the limit is reached.
* `Required` validation in the [pre-engagement form](/docs/flex/developer/messaging/webchat/pre-engagement-and-context) was fixed. Users will not be able to submit the form if all required fields are not filled.
* We have fixed several issues causing chat messages to be sent or rendered twice.

### Added \[#added-6]

* **Breaking change:** Set `predefinedMessage` defaultProp to `Messaging` to display and customize a predefined initial message to the user. It is set to be displayed by default, but can be customized or turned off completely. Read more about how predefined message is used in [Installing and using Flex WebChat](/docs/flex/developer/messaging/webchat/setup)
* Added `sdkOptions.chat` key to configuration object that can be used to pass options to chat SDK during initialization.
* **Breaking change:** New function `Twilio.FlexWebChat.renderWebChat` added to initialize and render WebChat automatically. To create and render WebChat automatically (without configuring anything). Read more about ways to initializing and configure WebChat in [Installing and using Flex WebChat](/docs/flex/developer/messaging/webchat/setup).
* We have added an `email` type field to the [pre-engagement form](/docs/flex/developer/messaging/webchat/pre-engagement-and-context). Data entered in that filed by the user will need to pass email validation to be submitted.

### Changed \[#changed-5]

* **Breaking change:** Global `Twilio.Flex` renamed to `Twilio.FlexWebChat`.
* **Breaking change:** `Twilio.FlexWebChat.createWebChat` now only creates an instance of WebChat, but does not render it automatically. Use `Twilio.FlexWebChat.renderWebChat` to render automatically (instead of `createWebChat`). Read more about ways to initializing and configure WebChat in [Installing and using Flex WebChat](/docs/flex/developer/messaging/webchat/setup).
* **Breaking change:** We have removed `configure()` method from returned `Twilio.Flex.createWebChat` object. Use `manager.configuration` member to set the configuration.
* **Breaking change:** We have removed a default pre-engagement form from the out-of-the-box WebChat experience. Now `startEngagementOnInit` by default is `true`, and the default `preEngagementConfig` is removed. Read about how to add a pre-engagement form in [Pre-engagement and context](/docs/flex/developer/messaging/webchat/pre-engagement-and-context)
* **Breaking change:** We have changed the following [component props](/docs/flex/developer/messaging/webchat/configuration) of the `EntryPoint` component:

  * `hideTaglineWhenExpanded` - choose whether to hide the `tagline` when chat box is expanded.
  * `iconClosed` - name of the icon to be shown when chat box is closed.
  * `iconExpanded` - name of the icon to be shown when chat box is expanded.
  * `tagline` - tagline content.
* We have also removed the following **EntryPoint** props in favor `EntryPoint.Container` defined in the [colorTheme](/docs/flex/developer/messaging/webchat/theming) object:

  * `entryPointStyle`
  * `entryPointBorderStyle`
  * `entryPointClassName`
  * `widgetClassName`
  * `entryPointSize`
  * `entryPointLocation`
  * `bottom`
  * `right`
  * `background`
  * `color`
* **Breaking change:** Added footer text as an attribute to [pre-engagement config](/docs/flex/developer/messaging/webchat/pre-engagement-and-context). Now use `preEngagementConfig.footerLabel` to set it. To style pre-engagement form footer text, use `PreEngagementCanvas.Footer` in [colorTheme object](/docs/flex/developer/messaging/webchat/theming).
* `logLevel` by default is set to `error`.
* **Breaking change:** Chat's `MessageInput` now uses `localState` by default. This will allow the developer to store the message input value in the component state instead of the Redux state. `MessageInput.defaultProps.useLocalState` should be set to `false` if there's the intention of changing the input value using the `SetInputText` action.
* Group engagement stage constants in an Enum `EngagementStage`
* **Breaking change:** `setEngagementStage()` method has been removed from returned `Twilio.Flex.createWebChat` object. Engagement stage is determined by configuration and chat state.
* We have removed the following unused config options:

  * `Config.canvasBottom` prop
  * `Config.postEngagementConfig` prop
  * `Config.timeoutEngagementConfig` prop
  * `SessionState.sessionData` prop
  * `SessionState.waitingTimeoutSeconds` prop
  * `SessionState.preEngagementReady` prop
  * Engagement stages
  * Session Actions
