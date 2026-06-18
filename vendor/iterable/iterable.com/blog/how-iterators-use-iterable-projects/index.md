# How Iterators Use Iterable Projects - Iterable

## How Iterators Use Iterable Projects

**Published by**

September 26, 2023

![](https://iterable.com/wp-content/uploads/2026/04/092623_Moving-Iterable-Emails-to-Iterable_Blog-Header.png)

My name is Jeanette Woodburn, I’m a Senior Marketing Operations Manager at Iterable—which means my job is, well, Iterable.

After a previous career as a fundraiser and marketer in museums and other fun nonprofits, I decided to give startup life a try, and made the shift to lifecycle and CRM marketing. I’m a huge fan of Iterable–I’ve implemented our product twice in previous roles (shoutout to customers HopSkipDrive and BURST Oral Care).

Now, my day-to-day involves working with our customer marketing project—the instance of our own product we use to market to our customers—and continue to expand its functionality to showcase the rich capabilities of our product.

But, recently, as I dug into our project, I realized there were some optimizations we could do to make our own day-to-day a lot easier and efficient. I figured sharing my experience might be helpful for others using Iterable, so let’s get into it.

### Intro to Iterable Projects

Iterable projects are essentially buckets that hold separate data. So, for example, if your brand is an umbrella brand with multiple smaller brands under it, each brand could be its own project. Or, maybe you have two audiences that need to stay really separate to manage separate experiences with your brands—like buyers and sellers—or, maybe you have a live instance and a sandbox instance.

The Iterable project architecture also allows you to maintain control of access—so, if your different projects are different brands, someone working with one brand can’t accidentally make changes to another brand. And, since API keys and other integrations are set up on a project by project basis, you won’t unintentionally cross your data streams.

But you can share resources across projects so no one has to take up a second career in wheel (re)invention. So, for example, email templates and journeys can be cloned across projects within the same organization.

### My Experience—as an Iterator—With Iterable Projects

Now it’s time to get a little meta. Our customer marketing project kicked off when Iterable itself was only a few years old. Through experimentation and rapid growth, over time, the project accumulated some issues. (How many ways can you label a firstName field? We had nine.)

To be clear, this is very normal for any project that grows with a company. We’ve all had to move quickly at one point or another and were forced to choose the quickest path instead of the methodical, no-stone-unturned path.

All of that hampered our ability to leverage some of Iterable’s greatest features. For example, starting an email with “Hello {{firstName}}” is treacherous if you don’t know whether you should be using {{first_name}} or {{First_Name}}.

Ultimately, to tackle these issues we decided the best route would be to start fresh. A new org and project(s) would allow us to start over with a revised data schema, and choose what betas we want to participate in and when. I was also able to start instating and documenting processes so that we won’t accumulate as many zombie or bonus items going forward.

### Selecting the Data to Migrate

Hand in hand with _how_ you’re passing data is _what_ data you’re sending. Some advice for those getting ready for an Iterable (or really any) implementation: minimalism is your friend. We stripped our data schema down to the bare necessities for building segmentation. Initially, we also restricted the project to one audience: our customers. Both these things made it dramatically easier to ensure that the sync I built was functioning properly.

I went through multiple drafts until I was satisfied with the data schema. To make it easier to navigate the user profile data, I grouped data fields of similar purpose or sources under the same object. For example, anything like accountId or accountType was placed under the “account” object.

It was also important to me that our naming was consistent. All data fields were named with camelCase because Iterable is case-sensitive. This may seem like a minor detail to fixate on, but it makes things like inserting merge fields, or building new routes for your data much easier when you don’t have to look back every time to see whether it’s Id or ID.

![Screenshot from the Iterable platform showing a variety of projects.](https://iterable.com/wp-content/uploads/2023/09/Screen-Shot-2023-09-26-at-4.40.35-PM.png)

_Screenshot of Iterable project settings._

### Turning on Events

Once user profile data (what I sometimes think of as the flat data) was flowing, we also needed to turn on events. Examples of event data include things like when a user clicks an email or makes a purchase, but Iterable also offers custom events that customers can build to track everything from a user signing in, to viewing a page in an app. You can also set up event fields under a custom event to track things like the date something happened, or which page was viewed.

Events provide a richer understanding of your users. While it’s nice to know that Sally has two dogs and lives near Los Angeles, knowing recent events in Sally’s history–like she just checked out your webpage selling your company’s new dog food—means you can craft a better experience to market to her (at least…you can with Iterable).

I took the approach of only allowing into the project what was necessary—I didn’t want the clutter of events we don’t need. The first priority was events we wanted to use to trigger a journey (like when a user signed in to our platform).

### Enjoying the Fruits of Our Labor

It’s amazing looking back on the “before” of this project, and realizing how far we’ve come. Thanks to the data schema management beta, I’ve been able to keep fewer bonus fields from entering our production project.

While we continue to deploy new user profile fields and events, we’ve got an established process for testing and releasing them, and we continue to build on our segmentation and personalization capabilities, and have even started moving in audiences beyond our customers.

And I’m even more thrilled that some things I once categorized as “someday” have now very much entered the realm of the possible. I’ve started playing with catalog to support a product usage summary email (and a growing list of other use cases).

We’re starting the process of bringing in event data that is more conversion-related (rather than what we need to kick off a journey) so we can start playing with some of our fancy AI toys like predictive goals.

Plus, best of all (at least to me!), our new org has reached the maturity level where I get to pre-beta new features and can actually give meaningful feedback. Win-win.

_To learn more about Iterable and how you can get started, schedule a demo today._