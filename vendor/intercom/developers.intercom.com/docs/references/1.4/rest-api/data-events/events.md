# Data Events

Events are how you can submit user activity to Intercom. Once you're sending Intercom event data, you can filter your user base with those events and create Auto Messages to send whenever an event occurs. Every event is associated with an event name, the time it happened, the user that caused the event, and optionally some extra metadata. Events record the count, first and last occurrence of an event.

Events are different to [Custom Attributes](https://www.intercom.com/help/en/Your-users-data/your-users-data-in-intercom) in that events are information on what Users did and when they did it, whereas Custom Attributes represent the User's current state as seen in their profile. For example, the first time they subscribed to a paid plan, or the most recent time they changed their plan would be represented by events, whereas a User Attribute would be used to record their current plan.

Because Events are used for filtering and messaging, and event names are used directly in Intercom by your App's Admins we recommend sending high-level activity about your users that you would like to message on, rather than raw clickstream or user interface actions. For example an order action is a good candidate for an Event, versus all the clicks and actions that were taken to get to that point. We also recommend sending event names that combine a past tense verb and nouns, such as 'created-project'.

The Events API varies slightly from the rest of the APIs as follows -

* You can submit events using JavaScript using the `trackEvent` method.
* When there's an error or errors, a list structure is returned instead of a single error.