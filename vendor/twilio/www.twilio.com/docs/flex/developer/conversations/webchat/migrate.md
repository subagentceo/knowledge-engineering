# Migrate to Webchat 3.x.x

This page describes the [differences](#webchat-app-comparison) between Webchat 3.x.x and other Flex webchat versions, as well as [how to migrate](#how-to-migrate) to Webchat 3.x.x from another webchat version.

Previously, Flex released two other versions of webchat for Flex:

* Flex [Webchat 2.0](/docs/flex/developer/messaging/webchat) is no longer supported. If you're using Webchat 2.0, migrate to Webchat 3.x.x.
* The [Webchat React app](/docs/flex/developer/conversations/integrate-twilio-webchat-react-app), open-source project that provides an example of how to build, integrate, and use webchat. You can continue using your Webchat React app implementation or migrate to Webchat 3.x.x.

## Webchat app comparison

|                                                              | **Webchat 3.x.x**                                                                                                    | **Webchat React app**                                                                        | **Webchat 2.0 (no longer supported)**              |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Best for organizations that**                              | Are setting up webchat for the first time<br /><br />Are migrating from Webchat 2.0                                  | Want to fully customize webchat and have development resources to build, deploy, and host it | n/a                                                |
| **Works with**                                               | Flex UI 2.x.x                                                                                                        | Flex UI 2.x.x and 1.x.x                                                                      | Flex UI 2.x.x and 1.x.x                            |
| **App type**                                                 | Flex native                                                                                                          | Open-source                                                                                  | Flex native                                        |
| **Hosted by Twilio**                                         | Yes                                                                                                                  | No                                                                                           | Yes                                                |
| **Supported by Twilio**                                      | Yes                                                                                                                  | Yes (provided code only; additional customizations are not Twilio-supported)                 | No                                                 |
| **Built on…**                                                | [Twilio Conversations](/docs/conversations-classic)                                                                  | [Twilio Conversations](/docs/conversations-classic)                                          | [Programmable Chat](/docs/chat) (legacy messaging) |
| **Auto-generated embed code to add webchat to your website** | Yes                                                                                                                  | No                                                                                           | Yes                                                |
| **Shields account information with a deployment key**        | Yes                                                                                                                  | No                                                                                           | No                                                 |
| **Uses fingerprinting for enhanced security**                | Yes                                                                                                                  | No                                                                                           | No                                                 |
| **Chat attachments available**                               | Yes                                                                                                                  | Yes                                                                                          | Yes, if enabled                                    |
| **Requires development effort to build**                     | No                                                                                                                   | Yes                                                                                          | No                                                 |
| **Ability to include configurable pre-engagement form**      | Yes                                                                                                                  | Yes                                                                                          | Yes                                                |
| **Ability to change the theme, style, and brand of webchat** | No. You can change to [light or dark mode](/docs/flex/developer/conversations/webchat/setup#customize-webchat) only. | Yes                                                                                          | Yes                                                |

## How to migrate

### If you're currently using Webchat 2.0

Webchat 2.0 is built on legacy messaging, which is no longer supported. Upgrade to Webchat 3.x.x, which is built on Conversations and includes enhanced security features.

If you are using Flex UI 1.x.x, you must [upgrade to Flex UI 2.x.x](/docs/flex/developer/ui/migration-guide) before you can use Webchat 3.x.x.

To migrate to Webchat 3.x.x:

1. Follow the [instructions to set up a new Webchat 3.x.x widget](/docs/flex/developer/conversations/webchat/setup).
   * When setting up your pre-engagement form, you must re-create your form in Webchat 3.x.x, rather than copying and pasting your Webchat 2.0 pre-engagement form. Because there are so many changes between the two versions, this will save you time.
   * In Webchat 3.1.0 and later, the pre-engagement form is enabled by default. For information about how to configure it or turn it off, see [Configure a pre-engagement form and context](/docs/flex/developer/conversations/webchat/pre-engagement-and-context).
2. In [Step 4: Embed the webchat widget on your website](/docs/flex/developer/conversations/webchat/setup#step-4-embed-the-webchat-widget-on-your-website), delete your Webchat 2.0 embed code and replace it with Webchat 3.x.x embed code.

You'll also want to be aware of the following additional differences between Webchat 2.0 and Webchat 3.x.x:

* We have updated the name of the pre-engagement form attributes that control the text at the top of your pre-engagement form:
  * `title`: Name or greeting that appears as the heading at the top of the form.
  * `description`: Introductory text for the form that appears below the title.
  * The `CheckboxItem` field type is now available, which enables you to include checkboxes in your forms. The checkbox can include accompanying plain or HTML-formatted text, including links.
  * The new `pattern` field attribute is now available. This attribute enables you to add custom validation to your fields.

### If you're currently using the Webchat React app

If you're using the [Webchat React app](/docs/flex/developer/conversations/integrate-twilio-webchat-react-app), you can continue to use your existing webchat or migrate to Webchat 3.x.x. However, Twilio does not provide support for your implementation of the Webchat React app. You may want to migrate to Webchat 3.x.x if you'd like a solution that doesn't require development effort to build or maintain, is hosted by Twilio Flex, and includes enhanced security features.

To migrate to Webchat 3.x.x:

1. Follow the [instructions to set up a new Webchat 3.x.x widget](/docs/flex/developer/conversations/webchat/setup) to create new chat addresses that are linked to deployment keys.
2. Update your website to remove your existing Webchat React app deployment and add the embed code for the Webchat 3.x.x widget.
