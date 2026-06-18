# Use custom styling for Webchat components in Webchat 3.x.x

To customize the style of Flex Webchat components, enable the `isCustomizationEnabled` attribute when you initialize Webchat. After you enable this attribute, override the CSS classes of the components that you want to customize.

## Configure customization

```js
const appConfig = {
    // Webchat configuration    
    deploymentKey: "{your_key}", // Replace with your deployment key
    appStatus: "open",
    isCustomizationEnabled: true
}
```

## Components and override classes

Use the following class names to override the styling for each component:

| Component                      | Component class name                             | Component description                                       |
| ------------------------------ | ------------------------------------------------ | ----------------------------------------------------------- |
| `entryPoint`                   | `twilio-webchat-entry-point`                     | Button that launches the webchat widget                     |
| `headerPanel`                  | `twilio-webchat-header-panel`                    | Header panel of the webchat widget                          |
| `headerPanelTitle`             | `twilio-webchat-header-panel-title`              | Title in the header panel of the webchat widget             |
| `headerPanelCloseIcon`         | `twilio-webchat-header-panel-close-icon`         | Close icon in the header panel of the webchat widget        |
| `webchatPanel`                 | `twilio-webchat-panel`                           | Main container of the webchat widget                        |
| `startChatBtn`                 | `twilio-webchat-start-chat-btn`                  | Button that starts the chat after the pre-engagement form   |
| `chatBubbleCustomer`           | `twilio-webchat-chat-bubble-customer`            | Chat bubble for customer messages                           |
| `chatBubbleAgent`              | `twilio-webchat-chat-bubble-agent`               | Chat bubble for agent messages                              |
| `chatBubbleAgentAvatar`        | `twilio-webchat-chat-bubble-agent-avatar`        | Avatar in the agent chat bubble                             |
| `endChatModal`                 | `twilio-webchat-end-chat-modal`                  | Modal that appears when the user clicks **End chat**        |
| `endChatModalCancelBtn`        | `twilio-webchat-end-chat-modal-cancel-btn`       | **Cancel** button in the end-chat modal                     |
| `endChatModalConfirmBtn`       | `twilio-webchat-end-chat-modal-confirm-btn`      | **Confirm** button in the end-chat modal                    |
| `loadingSpinner`               | `twilio-webchat-loading-spinner`                 | Spinner that appears while the webchat widget loads         |
| `messageInput`                 | `twilio-webchat-message-input`                   | Message input field                                         |
| `messageInputSendBtn`          | `twilio-webchat-message-input-send-btn`          | **Send** button for the message input field                 |
| `newChatBtn`                   | `twilio-webchat-new-chat-btn`                    | Button that starts a new chat after ending a chat           |
| `preEngagementForm`            | `twilio-webchat-pre-engagement-form`             | Pre-engagement form container                               |
| `preEngagementFormTitle`       | `twilio-webchat-pre-engagement-form-title`       | Title of the pre-engagement form                            |
| `preEngagementFormDescription` | `twilio-webchat-pre-engagement-form-description` | Description of the pre-engagement form                      |
| `notificationBar`              | `twilio-webchat-notification-bar`                | Notification bar that appears above the message input field |
