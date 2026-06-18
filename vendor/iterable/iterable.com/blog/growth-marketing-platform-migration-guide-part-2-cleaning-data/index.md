# The Growth Marketing Platform Migration Guide, Part 2: Cleaning Up Your Data - Iterable

## The Growth Marketing Platform Migration Guide, Part 2: Cleaning Up Your Data

**Published by**

June 13, 2019

![Clean data with Part 2 of the Growth Marketing Platform Migration Guide](https://iterable.com/wp-content/uploads/2026/04/061319_Migration-Pt-2_768x512-1.png)

Cleaning up your data is an essential part of any platform migration process. Much like a deep clean of your house, a full dive into organizing and cleaning up your data may not be the most glamorous of tasks, but it is necessary.

In Part 1 of our Growth Marketing Platform Migration Guide, we walked you through an often overlooked step: the message and use case audit. The worst thing you can do, though, is stop there.

With your messaging strategy sorted out, there is still much to do. Keeping your data clean prior to the migration ensures you will be in a better situation post-migration than when you started.

So, here in Part 2, we have outlined a quick and easy way to protect yourself from falling into the same trap once your platform migration project ends.

### Prepping for the Data Deep Clean

Before diving into discussing any data migration, it’s important to note a couple things.

First and foremost, if your data is a mess in your current system and you do nothing to clean it up when you migrate to the new platform, you’re going to find yourself in the exact same situation very quickly.

To put it bluntly, if you have a pile of sh*t and you move that pile of sh*t, you still have a pile of sh*t…but in a new location. Don’t come into your new platform and make it messy from the moment you sign in. That won’t work.

Cleaning up your data is the single most important piece of any migration. Your team might complain about doing this, but it’s much better to spend the time making the right changes upfront than it is to waste months on a migration only to find yourself with similar issues as before.

Secondly, even if your data schema works great in your current system, it doesn’t necessarily mean it’s going to work perfectly in the new platform.

Be aware of the differences between the two platforms and, again, spend the time making the necessary changes upfront. Be sure to ask questions about data schema when you’re evaluating different platforms so you can be aware of larger changes you might have to make.

We will dig deeper into evaluating which growth marketing platform is right for you in Part 3.

### Categorizing Your Data Schema

Similar to how you listed out your messaging in the message audit exercise, you’re going to also lay out your data schema. You should be able to break down your data into three main categories: User Data, Event Data, and General Data.

#### User Data

As the name suggests, user data is the information you’ll want to store in the new platform about each individual user.

At the simplest level, this could be information like first name and last name. In a modern growth marketing platform, your options are much more specific and numerous. Maybe you’ll have an array of product IDs that are currently being recommended to the user or product IDs attached to a user’s transaction history.

Regardless, the best place to start cleaning this data is in your current platform.

Start by getting an export of the user data you currently have and make a list of each of the user fields. Again, going through an audit process, identify which fields you want to keep and if there are any that need to be updated.

Once you’ve done that, it’s time to identify if there are new data points you’ll want to start tracking in the new platform.

The easiest way to identify these new data points is by using the message audit you already created. Are there new or updated messages you’ll be sending that require new data? If so, add it to the schema.

Aside from referencing the message audit, you should also identify new data points for users by considering new audiences that you might want to build. If there are user queries you can’t achieve in your current system, ask yourself: what user data is needed to make them possible in the new platform?

Once you have a comprehensive list of all of the data points you want to store about your users, it’s helpful to provide some further information to keep the whole team on the same page throughout the data migration.

For each of the user fields you’ve listed, add in the data type of that field (string, integer, boolean, etc.), an example field value, and a quick description of the field’s purpose if it isn’t obvious.

In completing this process, you clean your data and set yourself up for simpler tracking as you look to scale on your new platform.

#### Event Data

Event data are the actions your users take that you want to track.

As an example, let’s say your company is a fitness app. Some events you would want to track include a “Signed Up” event when a new user creates an account, a “Created Goal” event when a user adds a new fitness goal, and a “Workout Completed” event each time the user finishes a workout.

Within these events, you should be able to provide further information about what actually happened (the “event fields”). For the “Workout Completed” event, you would likely have information, such as the specific workout the user completed, the amount of calories they burned, and the length of the workout.

If you’re already tracking user actions in your current system, you should again start by listing those out and determining if any should be removed or changed before the data migration process begins.

Utilizing your message audit, determine if there are any new events you’ll need to start tracking moving forward. If you’re planning on sending new triggered messages, does it make sense for those to be triggered by a new event? If you want to build an audience based on whether the users have or haven’t done some action, is that action already something you’re tracking?

After listing out each of the events you’ll track, expand on this by adding in the event fields for each of them.

Simply knowing that users “Viewed a Page” isn’t that helpful. Ask yourself what information would make the event more useful. Is there information that would make messages triggered by this event more personalized? Which data fields do you need to query for based on these actions?

Use this process as an opportunity to get more granular, clean, and organized with your event tracking data. In doing so, you open up the possibilities for hyper-personalized messaging down the road.

#### General Data

Your general data is typically information that is common across all or most of your users.

A great example of this is an e-commerce company’s product catalog. That company might need to be able to include certain product information in their email templates, but since this data is the same for every single user, it doesn’t make sense to store it as User Data.

This data should be stored separately, either in a table that your new platform provides or perhaps within a data feed that is hosted on your own end and just referenced by the new platform.

Either way, it’s important to identify if you have any general data so that you can discuss your options for using it during your platform evaluations.

### Laying the Groundwork for Now and Later

When you return from a vacation, you don’t want to immediately have a series of chores to do to clean up your home.

In essence, you are avoiding this problem—and protecting your future self—by cleaning up your data before the platform migration process begins.

You are also increasing your chances of accelerated growth on your new platform by doing your due diligence and identifying what new data fields you should capture.

It’s a win-win, now and in the future.

_Save this post for later by downloading the pdf version. Interested in learning more about making a switch to Iterable? Schedule a custom demo today!_

![Growth Marketing Platform Migration Guide CTA Banner](https://iterable.com/wp-content/uploads/2019/06/ITE_DataMigrationGuide_CTA_Banner_L1R1.png)