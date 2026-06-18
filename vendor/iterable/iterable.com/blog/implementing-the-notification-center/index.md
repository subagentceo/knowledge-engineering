# Implementing the Notification Center - Iterable

## Implementing the Notification Center

**Published by**

July 27, 2018

Marketers use Iterable to launch a variety of powerful campaigns and workflows. There are a lot of complex moving parts and they would ideally be able to know the status/completion of certain actions and be warned or alerted about errors that occur.

For instance, they might want to know when a workflow webhook they have setup is returning error codes—and that could affect millions of users going through that workflow.

The goal of the Notification Center is to provide an actionable, dynamic feedback system that alerts Iterable users.

This post covers some of the key design and engineering decisions. The code has been simplified to illustrate the main points made in this blog post.

### Notification Center Design Decisions

We did some user story research and ended up deciding that:

*   Notifications should be dynamic and updatable. We would want one notification reporting on 5,000 workflow webhook errors over 5,000 separate workflow webhook notifications.
*   Notifications are at the Iterable Project level, but since there could be many users per Project, their read/unread statuses’ for each notification should be isolated. User 1 reading notification A, should not make that notification to be marked as read for User 2.
*   Notifications should be easy to create from an engineering perspective.
*   Notifications should know how to update themselves (more on this in the fingerprinting section)

#### Version 1 – Naive Version

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-30-at-5.38.25-PM.png)

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-30-at-5.38.43-PM.png)

This is the naive Notification Center prototype. It works but is clearly deficient in many ways.

*   You can’t update (or add new information) into an existing Notification easily as there’s no easy way to parse what is already in there (since title and description are Strings).
*   Secondly, if it references Iterable data such as a List or Workflow, the name of that List or Workflow could change so the description might end up being something like “Your Old List Name list has been updated”.
*   Lastly, there’s no way of mapping multiple notifications to to the same event and just updating an occurrence count.

#### Version 2 – Notification Context

From the main Iterable app, we wanted to make it as easy as possible to notify the notification center service of anything new. So the interface looks something like this:

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-30-at-5.38.55-PM.png)

We iterated on this and introduced a `NotificationContext` that is an interface that each type of notification will generate. Many of its functions take in the `Notification` parent with the metadata so we can dynamically generate things like the description based on all the data available to us.

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-30-at-5.39.19-PM.png)

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-30-at-5.39.31-PM.png)

#### Fingerprinting and Updating

One key is the introduction of fingerprinting our notifications so we know what “maps” to the same notification. In other words, we decide on the granularity of each notification. For instance, let’s say we have many workflow webhook errors going on, and each webook has a different URL but they are all part of the same workflow.

Now we can do something like:

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-30-at-5.45.48-PM.png)

This would generate a notification per workflow, per project. As seen from the code above, it knows how to update itself so that when the fingerprints match, we know that we are updating an existing notification and not creating a new one, and the `NotificationContext` knows how to update itself.

#### Dynamic Rendering of Description and Title

Among other fields, the description and title are now functions which means we have separated the persistence of data the notification needs, from the transformation of that into a human readable string. The only downside is that we need to store things like the workflow name.

The other downside is that perhaps the user might delete some of the WorkflowCampaignIds we reference, so the resulting notification can be invalid in the sense that it describes or references deleted / non-existent data.

#### Latest Version

But we still faced the issue of how we would be able to make sure that any references to Iterable data (which could change) was up to date. Referenced names and counts of Lists and such could change so we needed a way to dynamically retrieve that data and couldn’t store it just as Strings.

The solution was to introduce a rendering step. So upon `getNotifications()`, we would get the notifications from the database, then render them before returning them to the front-end.

#### Iterable Dependencies

We introduce an explicit dependencies field where we note what data we need to fetch from Iterable.

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-30-at-5.40.11-PM.png)

We also add in a rendering service class that does the actual rendering. In short, it fetches the `dependencies` needed for any notification. If the dependencies cannot be fetched or is found to be deleted, we mark that notification as invalid and delete it.

For instance, a notification may reference a campaign that was deleted, so that notification should be deleted. We want our notifications to not only be dynamic in being able to update itself, but accurately reflect the state of Iterable data as well.

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-30-at-5.40.20-PM.png)

#### Accurate Dynamic Rendering

Now, the data we need to persist for capturing the statistics of a notification is completely separate from our decision in how to render that. Now in our `WorkflowWebhookNotificationContext` we can refer to the latest workflow name and other properties based on the fetched dependencies.

![](https://iterable.com/wp-content/uploads/2022/01/Screen-Shot-2022-01-30-at-5.40.38-PM.png)

### Other Considerations

We knew that this design was going to lead to a high write, low read load on our Postgres database. Upon `IterableNotificationCenterService.notify()`, many of those calls may map to the same stored notification (same fingerprint) so we could have dirty reads or lost writes.

There are other optimizations we could make in the future, but at the time we decided it was best to have less captured notifications than to allow for invalid notifications (lost writes, where the data in the notification isn’t consistent) so we used a transaction level of repeatable reads for all update notification calls.

There are other features of the notification center as well (such as being able to change the `notificationLevel` from warning to errors based on custom thresholds…etc.) but at a high-level, we hope this shows how we went from generating static, string based notifications to dynamic, actionable notifications that help the user gain visibility and control as well as make it easy for engineers to add new notification classes or modify existing ones.