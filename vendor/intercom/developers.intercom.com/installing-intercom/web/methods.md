# Javascript API: Methods

Loading the Intercom JavaScript library provides an Intercom JavaScript object that responds to a few methods. These allow you to update users without a page refresh and interact with the messenger window.

## Intercom('boot', intercomSettings)

If you'd like to control when Intercom is loaded, you can use the 'boot' method. This is useful in situations like a one-page Javascript based application where the user may not be logged in when the page loads. You call this method with the standard intercomSettings object.


```JavaScript
Intercom('boot', {  
    app_id: 'abc12345',  
    email: 'john.doe@example.com',
    created_at: 1234567890,
    name: 'John Doe',
    user_id: '9876'
});
```


```NPM
import { boot } from "@intercom/messenger-js-sdk";
// ...
boot({
  app_id: 'abc12345',  
  email: 'john.doe@example.com',
  created_at: 1234567890,
  name: 'John Doe',
  user_id: '9876'
})
```

## Intercom('shutdown')

If you have the Inbox product (combined with another product like Messages) you should call the Intercom shutdown method to clear your users’ conversations anytime they logout of your application. Otherwise, the cookie we use to track who was most recently logged in on a given device or computer will keep these conversations in the Messenger for one week. This method will effectively clear out any user data that you have been passing through the JS API.


```JavaScript
Intercom('shutdown');
```


```NPM
import { shutdown } from "@intercom/messenger-js-sdk";
// ...
shutdown();
```

### Deleting cookies

If you need to delete cookies created by the Messenger but are unable to use this method (e.g. because our JavaScript hasn’t been loaded), all cookies are prefixed with `intercom-` and are created on your domain.

## Intercom('update')

Calling the update method with some new user data will trigger the JavaScript to look for new messages that should be displayed to the current user (the one whose details are in the window.intercomSettings variable) and show them if they exist.

Calling the update method with a JSON object of user details will update those fields on the current user in addition to logging an impression at the current URL and looking for new messages for the user.


```JavaScript
Intercom('update');
```


```JavaScript
Intercom('update', {"name": "Inigo Montoya"});
```


```JavaScript
// Enable dark mode
Intercom('update', {theme_mode: 'dark'});

// Enable light mode  
Intercom('update', {theme_mode: 'light'});

// Use system preference
Intercom('update', {theme_mode: 'system'});
```


```NPM
import { update } from "@intercom/messenger-js-sdk";
// ...
update({"name": "Inigo Montoya"}); // argument is optional

// Theme mode examples
update({theme_mode: 'dark'});
update({theme_mode: 'light'});
update({theme_mode: 'system'});
```

### IDs & Data

If the person's ID is not found in the user list when calling the update, a new user will be created.

If trying to update a `custom_attribute`, you do not need to include those values as an object. Include them in-line with the standard Intercom fields and they will be applied accordingly.

### Update Throttling

You can call `Intercom('update')` without getting throttled up to 20 times per 30 minutes. After the 20th call, you'll be throttled and the quota of 20 calls will get reset every 30 minutes. Reloading the page will refresh this state.

## Intercom('hide')

This will hide the main Messenger panel if it is open. It will not hide the Messenger Launcher.


```JavaScript
Intercom('hide');
```


```NPM
import { hide } from "@intercom/messenger-js-sdk";
// ...
hide();
```

## Intercom('hideNotifications', hidden)

This controls visibility of in-app notifications in the Messenger. Pass `true` to hide notifications, or `false` to show them. Default is `false` or `window.intercomSettings.hide_notifications` if set.


```JavaScript
// Hide notifications
Intercom('hideNotifications', true);

// Show notifications
Intercom('hideNotifications', false);
```


```NPM
import { hideNotifications } from "@intercom/messenger-js-sdk";
// ...
// Hide notifications
hideNotifications(true);
// Show notifications
hideNotifications(false);
```

## Intercom('show')

This will show the Messenger. If there are no new conversations, it will open to the Messenger Home. If there are, it will open with the message list.


```JavaScript
Intercom('show');
```


```NPM
import { show } from "@intercom/messenger-js-sdk";
// ...
show();
```

## Intercom('showSpace', spaceName)

This will open a specific space in the Messenger, if that space is enabled. The `spaceName` must be one of: `home` (Messenger Home screen), `messages` (conversation list), `help` (Help Center article search), `news` (News section), `tasks` (Checklists), or `tickets` (Tickets list). These are built-in Messenger sections — passing a value not in this list has no effect.


```JavaScript
Intercom('showSpace', 'home');
Intercom('showSpace', 'messages');
Intercom('showSpace', 'help');
Intercom('showSpace', 'news');
Intercom('showSpace', 'tasks');
Intercom('showSpace', 'tickets');
```


```NPM
import { showSpace } from "@intercom/messenger-js-sdk";
// ...
showSpace('home');
showSpace('messages');
showSpace('help');
showSpace('news');
showSpace('tasks');
showSpace('tickets');
```

## Intercom('showMessages')

This will open the Messenger with the message list.


```JavaScript
Intercom('showMessages');
```


```NPM
import { showMessages } from "@intercom/messenger-js-sdk";
// ...
showMessages();
```

## Intercom('showNewMessage')

This will open the Messenger as if a new conversation was just created.

This function can also take an optional second parameter, used to pre-populate the message composer as shown in the code example below..

### Open For New Messages


```JavaScript
Intercom('showNewMessage');
```


```NPM
import { showNewMessage } from "@intercom/messenger-js-sdk";
// ...
showNewMessage();
```

### Pre-Populate Messages


```JavaScript
Intercom('showNewMessage', 'pre-populated content');
```


```html
Send us <a href="#" onclick="Intercom('showNewMessage', 'Feedback on the new reports feature:')">your feedback on the reports feature</a>
```


```npm
showNewMessage('pre-populated content');
```

## Intercom('startConversation', message)

This will start a new conversation with the provided message. Unlike `showNewMessage`, which pre-populates the composer, this method immediately sends the message and starts the conversation.


```JavaScript
Intercom('startConversation', 'I need help with my account');
```


```NPM
import { startConversation } from "@intercom/messenger-js-sdk";
// ...
startConversation('I need help with my account');
```

## Intercom('onHide')

When we hide the messenger, you can hook into the event. This requires a function argument.


```JavaScript
Intercom('onHide', function() { /** Do stuff **/ });
```


```NPM
import { onHide } from "@intercom/messenger-js-sdk";
// ...
onHide();
```

## Intercom('onShow')

When we show the messenger, you can hook into the event. This requires a function argument.


```JavaScript
Intercom('onShow', function() { /** Do stuff **/ });
```


```NPM
import { onShow } from "@intercom/messenger-js-sdk";
// ...
onShow();
```

## Intercom('onUnreadCountChange')

This method allows you to register a function that will be called immediately when invoked, and again whenever the current number of unread messages changes.


```JavaScript
Intercom('onUnreadCountChange', function(unreadCount) {
  // Do stuff...
});
```


```NPM
import { onUnreadCountChange } from "@intercom/messenger-js-sdk";
// ...
onUnreadCountChange(function(unreadCount) {
  // Do stuff...
});
```

### Using with a Custom Launcher

If you use a custom launcher and also want to use the 'badge' delivery option, we recommend that you use the `onUnreadCountChange` method to show a badge on your custom launcher. If you use a custom launcher without a badge, you shouldn't use the badge delivery option.

## Intercom('trackEvent')

You can submit an event using the `trackEvent` method. This will associate the event with the currently logged in user and send it to Intercom. The final parameter is a map that can be used to send optional metadata about the event.

You can also add custom information to events in the form of event metadata, which can be included in event based messages to your customers.


```JavaScript
Intercom('trackEvent', 'invited-friend');
```


```JavaScript
var metadata = {
  invitee_email: 'pi@example.org',
  invite_code: 'ADDAFRIEND'
};

Intercom('trackEvent', 'invited-friend', metadata);
```


```NPM
import { trackEvent } from "@intercom/messenger-js-sdk";
// ...
trackEvent('invite-friend');
// or
trackEvent({ invite_code: 'ADDFRIEND' });
```

## Intercom('getVisitorId')

A visitor is someone who goes to your site but does not use the messenger. You can track these visitors via the visitor `user_id`. This `user_id` can be used to retrieve the visitor or lead through the REST API.


```JavaScript
Intercom('getVisitorId')
```


```NPM
import { getVisitorId } from "@intercom/messenger-js-sdk";
// ...
getVisitorId();
```

## Intercom('startTour', tourId)

If you would like to trigger a tour based on an action a user or visitor takes in your site or application, you can use this API method. You need to call this method with the id of the tour you wish to show. The id of the tour can be found in the “Use tour everywhere” section of the tour editor.

Please note that tours shown via this API must be published and the “Use tour everywhere” section must be turned on. If you're calling this API using an invalid tour id, nothing will happen. Nothing will happen if you call this API on mobile web as tours do not work on mobile.


```JavaScript
Intercom('startTour', 123);
```


```html
How about you <a href="#" onclick="Intercom('startTour', 123)">take a tour of our new feature</a>.
```


```NPM
import { startTour } from "@intercom/messenger-js-sdk";
// ...
startTour(123);
```

## Intercom('showArticle', articleId)

If you would like to trigger an article in the Messenger, you can use the `showArticle` method. The article will be shown within the Messenger, and clicking the Messenger back button will return to the previous context.
If the Messenger is closed when the method is called, it will be opened first and then the article will be shown.


```JavaScript
Intercom('showArticle', 123);
```


```html
# You can add a link anywhere on your site to open an article in the Messenger:

<a href="#" onclick="Intercom('showArticle', 123)">Open article</a>
```


```NPM
import { showArticle } from "@intercom/messenger-js-sdk";
// ...
showArticle(123);
```

## Intercom('showNews', newsItemId)

If you would like to trigger a news item in the Messenger, you can use the `showNews` method. The news item will be shown within the Messenger, and clicking the Messenger back button will return to the previous context.
If the Messenger is closed when the method is called, it will be opened first and then the news item will be shown.


```JavaScript
Intercom('showNews', 123);
```


```html
# You can add a link anywhere on your site to open a news item in the Messenger:

<a href="#" onclick="Intercom('showNews', 123)">Open news item</a>
```


```NPM
import { showNews } from "@intercom/messenger-js-sdk";
// ...
showNews(newsId);
```

## Intercom('startSurvey', surveyId)

If you would like to trigger a survey in the Messenger, you can use the `startSurvey` method. The id of the survey can be found in the “Additional ways to share your survey” section of the survey editor as well as in the URL of the editor.

Please note that surveys shown via this API must be live. If you're calling this API using an invalid survey id, nothing will happen.


```JavaScript
Intercom('startSurvey', 123);
```


```html
Please take our <a href="#" onclick="Intercom('startSurvey', 123)">short survey</a>.
```


```NPM
import { startSurvey } from "@intercom/messenger-js-sdk";
// ...
startSurvey(surveyId);
```

## Intercom('startChecklist', checklistId)

If you would like to trigger a checklist in the Messenger, you can use the `startChecklist` method. The `id` of the checklist can be found in the “Additional ways to share your checklist” section of the checklist editor as well as in the URL of the editor.

Please note that checklists shown via this API must be live. If you're calling this API using an invalid checklist `id`, nothing will happen.


```JavaScript
Intercom('startChecklist', 123);
```


```html
Please take our <a href="#" onclick="Intercom('startChecklist', 123);">short survey</a>.
```


```NPM
import { startChecklist } from "@intercom/messenger-js-sdk";
// ...
startChecklist(checklistId);
```

## Intercom('showTicket', ticketId)

If you would like to trigger a ticket in the Messenger, you can use the `showTicket` method. The ticket will be shown within the Messenger, and clicking the Messenger back button will return to the previous context.
If the Messenger is closed when the method is called, it will be opened first and then the ticket will be shown.


```JavaScript
Intercom('showTicket', 123);
```


```html
# You can add a link anywhere on your site to open a ticket in the Messenger:

<a href="#" onclick="Intercom('showTicket', 123)">Open ticket</a>
```


```NPM
import { showTicket } from "@intercom/messenger-js-sdk";
// ...
showTicket(ticketId);
```

## Intercom('showConversation', conversationId);

You can show a conversation programatically in the Messenger by calling `showConversation` method


```JavaScript
Intercom('showConversation', 123);
```


```html
# You can add a link anywhere on your site to open a conversation in the Messenger:

<a href="#" onclick="Intercom('showConversation', 123)">Open conversation</a>
```


```NPM
import { showConversation } from "@intercom/messenger-js-sdk";
// ...
showConversation(conversationId);
```

## Intercom('onUserEmailSupplied')

When a visitor enters their email into the Messenger, you can hook into the event. This requires a function argument.


```JavaScript
Intercom('onUserEmailSupplied', function () {
  // Do stuff...
});
```


```NPM
import { onUserEmailSupplied } from "@intercom/messenger-js-sdk";
// ...
onUserEmailSupplied(function () {
  // Do stuff...
});
```