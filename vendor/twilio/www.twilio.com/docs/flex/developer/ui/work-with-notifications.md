# Work with Notifications

Flex UI provides a client-side API to manage notifications in Flex UI.

**What is a notification in Flex?**

A notification is an alert that tells the user what state change or error has occurred to a component or page when they are no longer viewing that component or page

Users can be notified in Flex using a Notification Bar or Browser notifications or both.

With notifications framework, you can:

* Register custom notifications including browser notifications
* Customize standard notifications
* Turn off standard UI notifications
* Override standard notifications per Task Channel Definition
* Customize how standard UI notifications are displayed
* Register your custom UI notifications and specify how to render them

## NotificationBar

NotificationBar is an `in-app` way to alert user. NotificationBar has a variety of options like icon, actions, timeout.

![Twilio Flex interface showing a disruption alert and chat messages.](https://docs-resources.prod.twilio.com/acdd7ca85df7290051f81f4a23cbf06fcbbe289c17f198294282a2766235a3c4.png)

### Browser Notifications

Flex uses the standard [Browser Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) as the basis for its browser notifications implementation. Browser notifications can be enabled in [the Admin Dashboard of the Flex UI](/docs/flex/admin-guide/core-concepts/flex-ui).

Browser notifications are shown if Flex is minimized.

Note, due to [security constraints across browsers](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API), Browser Notifications are not supported when Flex is iframed within a cross-domain webpage. This includes the Salesforce and Zendesk integrations.

**Requesting permissions**

To start showing browser notifications, the user needs to first grant permissions. By default, Flex will request user for permissions if they are not granted or blocked.

If you want to add custom logic around requesting permissions, like request it based on some user action in the UI, then you can [dispatch](/docs/flex/developer/ui/work-with-notifications#dispatch-custom-notifications) `Notification.requestPermission()` from your custom code.

**Browser notifications handler**

To display a browser notification, use the `options` key with a `browser` tag in it. Flex API docs contain [an exhaustive list of available properties](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/nsa/NotificationManager). If no `browser` key is passed to `options`, Flex *will not* show any browser notifications.

### NotificationBar actions

A helper component `NotificationBar.Action`, that can be used for providing clickable action to notification definition.

```javascript
interface NotificationBarActionProps {
    label: React.ReactText; // Can be simple text string or a template string
    onClick: NotificationBarActionCallback;
    icon?: string;
}
```

The [full reference for the Notification Manager](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/nsa/NotificationManager) and [a list of standard notifications](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/nsa/Notifications) are available in Flex API docs.

## Register a custom notification with Browser notification handler

```javascript
Flex.Notifications.registerNotification({
    id: "customNotification",
    closeButton: true,
    content: "Custom Notification",
    timeout: 0,
    type: NotificationType.warning,
    actions: [
        <NotificationBar.Action
            onClick={(_, notification) => {
                Flex.Notifications.dismissNotification(notification);
            }}
            label="Hello World"
            icon="Bell"
        />
    ],
    options: {
      browser: {
          title: "Custom Notification",
          body: "Hello World!"
      }
  }
});
```

## Override standard notifications for a specific task type using Task Channel Definitions API

### Use custom notification for new reservation of a Call task

```javascript
Flex.DefaultTaskChannels.Call.notifications.override.IncomingTask = () => {
  Flex.Notifications.showNotification("customNotification");
}
```

### Change content of a standard notification for incoming call task

```javascript
const originalIncomingTaskNotification = Flex.DefaultTaskChannels.Call.notifications.override.IncomingTask;
Flex.DefaultTaskChannels.Call.notifications.override.IncomingTask = (notification, cancel) => {
  originalIncomingTaskNotification(notification, cancel);
  notification.content = "Some text";
};
```

### Change content of a standard notification for new chat message

```javascript
const originalIncomingTaskNotification = Flex.DefaultTaskChannels.Chat.notifications.override.IncomingTask;
Flex.DefaultTaskChannels.Chat.notifications.override.IncomingTask = (notification, cancel) => {
  Object.assign(notification, {
    ...originalIncomingTaskNotification,
    content: "some text"
  });
};
```

## Turn off Standard Notifications

### Do not show notificationBar notifications

```javascript
Flex.MainContainer.defaultProps.showNotificationBar = false;
```

### Disable notification by ID

```javascript
Flex.Notifications.registeredNotifications.delete("notification_id");
```

## Customize Standard Notifications

### Change text of the notification

```javascript
const notification = Flex.Notifications.registeredNotifications.get("notificationId");
if (notification) {
   notification.content = "Display some text";
}
```

### Change text of the notification with template

```javascript
flex.manager.getInstance().strings.myNotification = "Current time: {{time}}"
const notification = Flex.Notifications.registeredNotifications.get("notificationId");
if (notification) {
  notification.content = "myNotification";
}
Flex.Notifications.showNotification("notificationId", {time: Date.now()})
```

Read more about overriding strings in [Overview of Flex UI programmability.](/docs/flex/developer/ui/overview-of-flex-ui-programmability-options)

### Render custom component in a notification

```javascript
const notification = Flex.Notifications.registeredNotifications.get("notificationId");
if (notification) {
   notification.content = <MyAwesomePopup/>;
}
```

### Change props of the notification

```javascript
const notification = Flex.Notifications.registeredNotifications.get("PendingReservationsOnActivityStateChange");
if (notification) {
   notification.content = "Some text to display";
   notification.backgroundColor = "blue";
   notification.closeButton = false;
}
```

## Register Custom Notifications

### Option 1: string

```javascript
Flex.Notifications.registerNotification({
  id: "myNotificationId",
  content: "Custom content", // string
  type: NotificationType.error
});
```

### Option 2: template

```javascript
Flex.Notifications.registerNotification({
  id: "myNotificationId",
  content: "NotificationMessage", // template
  type: NotificationType.error
});
```

Read more about overriding strings in [Overview of Flex UI programmability.](/docs/flex/developer/ui/overview-of-flex-ui-programmability-options)

### Option 3: custom React component

```javascript
interface CustomNotificationProps extends NotificationContentProps {
   customProp?: string;
   notificationContext?: any;
}

export class CustomNotificationElement extends React.Component<CustomNotificationProps, undefined> {
   render() {
       const { customProp, notificationContext } = this.props;
       return(
           <div>
               {notificationContext.message}
               <div />
               {customProp}
           </div>
       );
   }
}


Flex.Notifications.registerNotification({
    id: "myNotificationId",
    content: <CustomNotificationElement customProp="custom prop" />,
    type: NotificationType.error
    }
);
```

## Dispatch Custom Notifications

### Option 1: string \[#option-1--string-2]

```javascript
Flex.Notifications.showNotification("myNotificationId", undefined);
```

### Option 2 & 3: template & custom React component

```javascript
Flex.Notifications.showNotification("myNotificationId", { message: "custom context" } );
```

## Add Custom Notification Event Listeners

```javascript
import * as Flex from "@twilio/flex-ui";

Flex.Notifications.addListener("beforeAddNotification", (payload) => {
  console.log("<---beforeTransferTask Listener--->", payload);
});
```
