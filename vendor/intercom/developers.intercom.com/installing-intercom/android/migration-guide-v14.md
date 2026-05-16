# Migrating to 14.0.0

Version [14.0.0](https://github.com/intercom/intercom-android/releases/tag/14.0.0) of the Intercom Android SDK adds support for the 5th version of the messenger.

In this version, we have deprecated a few methods and replaced them with new methods in our API.

The outgoing methods and their replacements are listed below.

For more information and code samples, please visit [Using Intercom](https://developers.intercom.com/installing-intercom/docs/using-intercom-android)

| Deprecated API | New API |
|  --- | --- |
| displayMessenger() | present() |
| displayConversationsList() | present(IntercomSpace.Messages) |
| displayHelpCenter() | present(IntercomSpace.HelpCenter) |
| displayHelpCenterCollections(ids) | presentContent(    IntercomContent.HelpCenterCollections(ids)) |
| displayCarousel(id) | presentContent(IntercomContent.Carousel(id)) |
| displaySurvey(id) | presentContent(IntercomContent.Survey(id)) |
| displayArticle(id) | presentContent(IntercomContent.Article(id)) |
| registerUnidentifiedUser() | loginUnidentifiedUser() |
| registerIdentifiedUser(userRegistration) | loginIdentifiedUser(userRegistration) |
| updateUser(userAttributes) | updateUser(userAttributes,statusCallback) |
| reset() | logout() |