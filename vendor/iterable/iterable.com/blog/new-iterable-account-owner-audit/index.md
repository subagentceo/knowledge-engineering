# New Iterable Account Owner Audit - Iterable

## New Iterable Account Owner Audit

**Published by**

November 28, 2023

![](https://iterable.com/wp-content/uploads/2026/04/112823_Audit-Checklist_Blog-Header-1.png)

You’ve started a new job, and now you’re an Admin on your company’s Iterable instance. How do you make sure everything is ship-shape and get to know your new program?

Beyond sending any marketing communications, there are a lot of things you want to be aware of as your company’s Iterable account owner. Who has access? What data goes in and out? How is data formatted?

Whether you’ve never used Iterable before (welcome!), or whether you’re a power user, this checklist is a great start to making sure you’re keeping an eye on the infrastructure that enables you and your team to keep sending great campaigns.

### Organization Level

#### Review Roles and Permissions

Let’s start at the organization level with roles and permissions. Roles are essentially designated sets of permissions (specific tasks people are or are not allowed to do in Iterable). You can customize them, or we have some pre-built ones as well. An example of a role might be that you want some members of your team to be able to build emails and access performance analytics. But permissions like “Manage and launch campaigns” should be limited to key trusted individuals.

**Navigate to Settings > Roles. I made a loom:** 

https://iterable.com/wp-content/uploads/2023/11/Campaigns-28-November-2023.mp4

*   How many people are assigned to each role? (If everyone has ended up as assigned to the Marketing Admin role, or you have only one person designated as a Marketing User, that may mean you need to review what permission sets are assigned to each role.)
*   Is there documentation elsewhere explaining who should get assigned what level of access? It’s important to make sure things like sending capability are limited to those who truly need it

**Next, go to Settings > Organization Members**

*   Does everyone you see here still work for the company? (Bonus question: How is Iterable access wrapped into your company’s on- and off-boarding procedures?)
*   When was the last time they logged in? If it was a while ago, it’s a good chance to start a conversation as to whether they still need access.
*   Are roles assigned appropriately? In particular, do enough people have Super Admin/Account Owner access? Do too many?

_Here’s more information about roles and permissions, in case you decide you want to make any updates._

#### Review Usage and Billing

Settings > Usage and Billing takes you to…Usage and Billing. 

https://iterable.com/wp-content/uploads/2023/11/Usage-and-Billing-2.mp4

For obvious reasons, usage and billing with Iterable is not actually a concern for me. Since your instance hopefully ISN’T full of zeroes, here’s what I’d recommend checking on in your situation:

*   Review your send usage across email, SMS, and push
*   Scroll down further to check on user volumes and event usage
*   Pop back up to the date filters in the top right corner and play around with different ranges–do you notice any quarters or months that seem higher than others?
*   Click the “View project breakdown” link for each section. Are there any surprises?
*   Compare these numbers to your contracted amounts

### Project Level

#### Explore Your Projects

First, you’ll want to get to know your data. Starting with how it’s moving in and out of your projects. This is a section you may wish to review with a colleague from engineering, or someone else who is familiar with your martech stack. While you’re doing this, it’s a good idea to make a list of systems as you go with notes about who the admin is and what data it’s sending to or receiving from Iterable.

![Project exploration in Iterable](https://iterable.com/wp-content/uploads/2023/11/Screenshot-2023-11-16-at-4.30.45-PM-1.png)

**Click your initials in the top right corner to see a list of your projects.**

*   How many projects do you have? What are they all for?

**Under the Integrations tab:**

*   Check your API Keys
*   Do you know what everything does? You can change names to clarify using the Edit button
*   If it’s disabled, find out why
*   Is there anything that should be turned off or removed?

**Rinse and repeat with:**

*   Third Party
*   System Webhooks
*   Journey Webhooks
*   Facebook

Set up a reminder to review these on a regular basis (I try to take a peek every month or so, but you do you). Because these integrations handle customer data in and out of Iterable, it’s important to make sure you’re keeping things up-to-date!

#### Get a Handle on Your Data Schema

**Settings > Project Settings, scroll down to Custom Event Management to see a full list of custom events feeding into your project.**

*   Toggle the buttons “Lock custom events” and “Lock custom event fields” to the green (locked) position. (This feature is currently in beta).
*   View overall volume for custom events and how they’re leveraged in Settings > Custom Event Usage…or Data Schema Management if you’re in the beta(Loom: https://www.loom.com/share/6170a7dfdfd24670be21a5628d9cf1cc)

**Scroll down a bit more to User Field Management. This is where you can find the FULL list of user fields, including hidden ones.**

*   Is there anything duplicative that SHOULD be hidden? What fields (if any) don’t make sense?
*   Again with fangirling over the “Lock user fields” button. My preference is to keep them in their green (locked) position–no random fields are getting in on my watch!

**After you’re done looking over everything on the Settings page, you can snoop some more by heading to Audience > Segmentation and clicking the green “Refresh Results” button**

*   Pick a user at random in the list that populates
*   The User Fields section lets you see how the data plays out with actual field values
*   Events lets you check out what activity is tracked for this user
*   In both cases, click the carets to pull down and see any objects on the user profile or event data
*   Use what you’re seeing to play around and practice segmentation

The other settings are good to review as well to familiarize yourself with your instance.

https://iterable.com/wp-content/uploads/2023/11/User-Profile-info.mp4

Last but not least, a few important things to check when sending messages (which may need its very own blog post!)

**Head back to Settings > Message Channels and Types. There should be a pulldown caret labeled “X Message Types” so you can see the types tied to each channel.**

*   Do these match what you expect your program to be using? 

https://iterable.com/wp-content/uploads/2023/11/Message-Channels-and-Types-1.mp4

**Go to Messaging > Campaigns and click the “Live” filter towards the top left, or go to Insights > Messaging Insights and set the “State” filter to “Running,” and click the Campaigns tab**

![Iterable campaign filter showing running campaigns](https://iterable.com/wp-content/uploads/2023/11/Screenshot-2023-11-27-at-10.44.15-AM.png)

*   Do all of these campaigns make sense to you? If not, click a campaign to snoop further!
*   Are there any delivery or other performance concerns?
*   Does the branding look right?
*   When was the last time someone made edits? (easiest to see on the list in the Messaging > Campaigns tab)

**Go to Messaging > Journeys and snoop to your heart’s content. But keep an eye out for:**

*   Are there any zombie journeys? These are journeys that are still turned on, but when you look at the email stats, nothing has been sent in a while.
*   Are there any operational journeys? These are easy to spot because there are no campaigns listed next to the journey status.
*   Do you feel like the key points of your customer lifecycle are covered?
*   Check on any journeys triggering off of events happening elsewhere (like a pop-up form that collects new users). Do the numbers match?

And there you have it! If that was your first time, hopefully you now feel like you know your Iterable instance better, and can feel confident that your data and infrastructure are set up to match your needs. You may also have a LOT of questions. Along with picking the brains of coworkers, I’ve also found answers by reviewing relevant modules in our Academy, checking out pertinent documentation, and talking things through with my CSM.

You may have a lengthy to-do list now too. I tend to lay this list out, but hold off until I’ve gathered more information before taking anything live. However, I do recommend setting a reminder to review this checklist regularly. Personally I try to do that quarterly, but choose your own adventure!

_Ready to explore your Iterable instance? Go for it._