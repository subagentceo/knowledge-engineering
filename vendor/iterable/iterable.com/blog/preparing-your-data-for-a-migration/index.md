# Preparing Your Data for a Migration - Iterable

## Preparing Your Data for a Migration

**Published by**

June 4, 2024

![Light purple background, blog title sits to the left and a circle photo of a woman on a computer sits to the lower right.](https://iterable.com/wp-content/uploads/2026/04/060324_Data-Migration-Guide_Blog-Header.png)

Platform migration is no small feat. You not only have to get buy-in from key stakeholders and executives, but you have to document the entire process and standardize all of your data to increase efficiency and avoid derailing anything in the works. There are technical aspects, personnel aspects, functional aspects and more. A platform migration can quickly turn into a can of worms that’s impossible to reseal.

To help combat the difficulty of platform migrations, we recently published The Cross-Channel Marketing Platform Migration Guide—a detailed, step-by-step breakdown of what to consider when migrating to a new marketing platform. But, as you can imagine, there’s a lot of information jammed into that one guide. We still recommend you use it, share it, bookmark it, etc. but if you’re looking for a skimmable breakdown of the guide, you’ve come to the right place.

In this third installment of the Platform Migration series we’ll explore the next section of The Cross-Channel Marketing Platform Migration Guide: Standardizing Your Data. Prepping your data is a critical step in any platform migration process. Although collecting and documenting the necessary data for your campaigns may not seem glamorous, it establishes a clean foundation essential for effective personalization and segmentation down the road.

_If you missed part one, “Questions to Ask Before a Data Migration,” or part two, “The Team You Need for a Data Migration,” be sure to check them out._

### The Data Deep Clean

After auditing your campaigns and use cases, as we covered in part two, it’s vital to evaluate your data before initiating a platform migration. This process involves creating a source of truth that allows all stakeholders to determine which data is necessary for cross-channel marketing initiatives and needs to be transferred to the new platform.

One key aspect of deep cleaning data is standardizing the data. This involves seeing your data in a schema document, understanding its use in the new system, and identifying confusing data points for team members. Look for fields storing the same data with similar names (e.g., firstName versus FirstName) or event fields tracking similar user actions (e.g., PurchaseCreditCard versus. PurchaseApple).

While this is tedious, documenting, reviewing, and updating your data saves time in the long run. Even if your current data schema works well, it might not fit perfectly into the new platform. This process helps your team identify the differences between the platforms and make necessary adjustments upfront.  
Remember, “garbage in, garbage out.” If your data is disorganized in your current system and you migrate it as-is, you miss an opportunity to streamline processes in your new platform.

### Categorizing Your Data Schema

Similar to listing your campaigns in a campaign audit, you need to categorize your data in a data schema or tracking plan. Your data should fall into three main categories: User Data, Event Data, and General Data.

#### User Data

User data pertains to information stored about each individual user. This data, usually captured during acquisition, includes details like the user’s name, email, phone number, and product preferences. Your back-end system might add other details, like user IDs.

*   Export your current user data and listing each user field
*   Audit these fields to determine which ones to keep and if any need renaming
*   Identify new data points you want to track in the new platform
*   Use your campaign audit to spot any new or updated messages requiring new data and consider new audiences you might want to target

Once you have a comprehensive list of user data points, provide additional information to keep the team aligned during migration. For each user field, include the data type (string, integer, boolean, etc.), an example field value, and a brief description of the field’s purpose. This process simplifies tracking as you scale on your new platform.

#### Event Data

Event data tracks user actions. For instance, if your company is a fitness app, you might track events like “Signed Up” for new account creation, “Created Goal” for new fitness goals, and “Workout Completed” for finished workouts. Each event should include additional information about the action (the “event fields”).

*   If you’re already tracking user actions, list them and determine if any should be removed or changed
*   Utilize your campaign audit to identify new events needed for future tracking
*   Consider if new triggered messages require new events and if you need to build audiences based on certain actions
*   List out each event you’ll track, including the event fields

Knowing users “Viewed a Page” isn’t helpful without further details. Ask what additional information would make the event more useful and personalize messages triggered by the event. This granular approach to event tracking data opens possibilities for hyper-personalized messaging.

#### General Data

General data includes information common across all users. For example, an e-commerce company’s product catalog. This data might be included in email templates but is the same for every user, so it should be stored separately from user data.

*   Identify any general data and discuss options for using it during platform evaluations.

This data can be stored in an index or table provided by the new platform or in a data feed hosted on your end and referenced by the new platform.

### Laying the Foundation for Now and Later

Documenting and standardizing your data increases your chances of accelerated growth on your new platform. Knowing what data you need, where it’s coming from, and why you’re using it lets you launch campaigns quicker, makes reporting more insightful, and enables other teams and tools to leverage your data in new ways.

Well-organized data supports faster campaign launches, insightful reporting, and allows other teams and tools to utilize your data meaningfully. Setting up your data correctly from the start paves the way for successful cross-channel marketing initiatives and sustained growth on your new platform.

_To learn more about how the Iterable team can help aid in your platform migration, schedule a demo today. And, be sure to check out the full Cross-Channel Marketing Platform Migration Guide._