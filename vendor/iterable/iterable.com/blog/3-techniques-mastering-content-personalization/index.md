# 3 Techniques for Mastering the Art of Content Personalization - Iterable

## 3 Techniques for Mastering the Art of Content Personalization

**Published by**

June 9, 2020

![3 ways to personalize content with Iterable](https://iterable.com/wp-content/uploads/2026/04/060320_3-Ways-to-Personalize-Content_768x512.png)

When building a first-class customer experience, every little detail counts. Look no further than the experiences that Spotify, Amazon and Netflix offer. They set the new standards of consumer convenience and personalization. Now it’s on all brands to live up to them.

Consumers, too, understand the stakes at hand. Thankfully, they’ve seen the first-hand value of personalization and are overwhelmingly willing to share their data if it benefits their experience. 

This where Iterable can help! Data-driven, cross-channel messaging is the most direct, flexible and relevant (in other words, _personalized_) way to support the customer experience.

In today’s post, we’ll cover how you enable content personalization using Iterable’s three different approaches:

1.  **User profile data**
2.  **Data feeds**
3.  **Catalog**

(_Note: we’re going to talk about first-party data activation, so if you’re unfamiliar with our data management approach, make sure to read about that first_)

### The Basics

Before we jump into content personalization using the methods mentioned above, we have to acknowledge that a personalized experience comprises much more than content alone.

Luckily, Iterable checks the boxes of each of these personalization factors:

*   **Picking the right audiences:** Your users’ profile details—list memberships, contact properties, events, and their associated metadata are perfect filters for cutting highly specific segments. Plus, events taking place on your website or app dynamically qualify your customers in and out of different audience groups in real-time.
*   **Building the perfect template**: Help your content shine with a standout template. We offer different template building options so your aesthetic design goals are always in reach. Dial-in the look and feel you’re after by customizing your links, copy, content, images and more. 
*   **Incorporating customer data**: Iterable’s Handlebars templating language transforms your data into personalized content. Handlebars reference your users’ attributes and event histories at send time. The result? Curated message content for all recipients. Read more about Handlebars here.

![Iterable Handlebars inside a template](https://iterable.com/wp-content/uploads/2020/06/Handlebars-editor.png)

_Handlebars turn curly braces into personalized details._

*   **Delivering when the moment strikes**: You have full control over how and when your campaigns are sent—be it one-time, recurring or triggered in real-time. When the moment strikes, you’re ready to follow up with an automated, customized message.

These are the building blocks of sophisticated personalization. Remember, your content has a much higher chance of resonating once it’s properly aligned to your customer’s experience.

### Solving the Content Personalization Riddle

Now that we know how data shapes a messaging experience, we’ll examine the ways Iterable delivers personalized content.

Now, keep in mind that there’s no right or best way to personalize your marketing—the reason we offer three approaches is that we want marketers to succeed in their own impactful ways. Let’s jump in!

#### 1. User Profile Data

What it is: By now you know that the depths of user attribute and event data unlock all sorts of powerful marketing capabilities. The most straightforward (yet effective) of these lies in personalizing content with this same data.

Typical Content Personalization Use Cases:

*   **General personalization**: _Incorporating names and profile details, highlighting recent purchases_
*   **Lifecycle stage-specific initiatives**: _Upselling subscription levels, recalling abandoned cart items_

How it works: Templates query user profile data the moment your message sends. Since customer attributes are unique, the fields referenced in your message template return each person’s specific information: names, locations, stated preferences, transactions, etc.

Any standalone or combination of these types of categorical elements can be dynamically strung together using Handlebars throughout the body of your templates as part of a highly personalized message.

In the following example with Netflix*, Iterable pulls in profile-specific attributes and events into a message template. Your customers’ content and messaging are directly influenced by their interests, behaviors and interactions.

_*Note: Netflix is not an Iterable customer._

Example:

Meet our Netflix user, Ryan (as reflected by his hypothetical Iterable profile below).

Naturally, Netflix is interested in learning what its customers watch—this information helps the streaming service recommend future content. As you can see in his profile, Ryan identified that he enjoys the genres “adventure” and “action.”

![Iterable user profile standard view](https://iterable.com/wp-content/uploads/2020/06/User-Profile-Genres.png)

_Adventure and Action genres are nested data points in the object known as Content Interests._

To learn which particular programs Ryan watches, Netflix would create a custom event category that collects the details of the different programs he watches.

As it relates to this example, any of the following could be applicable: the movie’s title, the genre, when it was watched, and much more. Very easy to do inside Iterable!

![New Iterable custom event](https://iterable.com/wp-content/uploads/2020/06/Custom-Event.png)

_This Iterable Custom Event documents watched programs._

As detailed in the custom event information below, you’ll see Ryan watched “Avengers: Infinity War” on May 24. This matters for what comes next—the personalized email!

![Event histories possess engagement details](https://iterable.com/wp-content/uploads/2020/06/Custom-Event-Details.png)

_Essential program details live inside this Custom Event._

Netflix thrives on user feedback and a content rating system. In the example below, let’s pretend Netflix wants Ryan’s “Avengers” rating while it’s still fresh.

To do that, the team would trigger a rating request message—anywhere from hours to days after Ryan’s watch event. Using the movie’s essential information inside the event history, Handlebars maps these key details directly into the message.

![Content personalization placeholders using Handlebars](https://iterable.com/wp-content/uploads/2020/06/User-Attributes-Handlebars.png)

_With data properly stored and organized, personalization is practically plug-and-play._

And what you get from this exercise is painlessly personalized content tying directly to Ryan’s recent experience.

Let’s recap the personalized elements of this message:

*   The email addresses him by the name submitted in his user profile {{firstName}}
*   It notes the film name from the watch event’s detail {{movieName}}
*   Showing the movie’s cover image from the watch event {{imageURL}} adds visual flair
*   It’s delivered automatically while the experience is fresh

![User profile-base personalized email](https://iterable.com/wp-content/uploads/2020/06/Profile-Attribute-Rendered.png)

_This rating request email is on-brand, on point and on time._

#### Data Feeds

What it is: Data feeds are direct connections between your third-party systems or web services and Iterable. Data feeds retrieve content from an external source that then gets incorporated into your template—content living outside of your messaging ecosystem is now at your disposal.

All connected data feed content is requested at send time, making data feeds a great option for factoring time-sensitive content into your messaging.

Typical content personalization use cases:

*   **Active offers**: S_haring current coupon codes, updating users about new inventory_
*   **User-level recommendations**: _Proprietary or third-party recommendation engine content_

How it works: Just like profile-based personalization, Iterable checks the queries inside your template and returns your data feed’s specific content.

Depending on how your templates are customized, single or even multiple data feeds can generate different user-specific content inside your message. Once the data feeds are set up, they remain in place and readily pull in new personalized content as it’s updated—this is a great asset when building recurring messages or newsletters.

Example: Using Netflix’s knowledge about Ryan’s profile and watch history, let’s show how to upgrade that ratings request email with data feed recommendations.

Let’s start with the template. First, they’ll build in their desired look and feel of their recommendation “experience” into the email body—in this example, by displaying three movie options of the same “action” genre as Avengers.

![Data feed content personalization template](https://iterable.com/wp-content/uploads/2020/06/Datafeeds-with-Handlebars-1.png)

_Similar template, enhanced experience using data feeds._

On the backend, Netflix’s genre-based data feed will pull in Ryan’s similar “action” genre movie content. In this case, it’s information from “Hancock,” “Godzilla” and “The Time Machine.”

![Data feed genre-based recommendations](https://iterable.com/wp-content/uploads/2020/06/Data-Feed-Output-1.png)

_Our hypothetical Netflix recommendation data feed serves up some great action-based content._

Now, in addition to a personalized ask to rate his Avenger’s viewing experience, Netflix sweetens the email deal with a few additional movies of potential interest.

![Data feed recommendations inside sample email](https://iterable.com/wp-content/uploads/2020/06/Data-Feed-Rendering.png)

_Since Ryan likes action movies, he’s now seeing three similar options in Netflix’s potential email recommendations._

You’ve probably noticed the symbiotic relationship between data and experience. Using user profile data to inform data feeds adds yet another touch upon the content personalization endeavor.

#### Catalog

What it is: Iterable Catalog is a recommendation builder. Catalog brings non-user related and third-party data (products, locations, menus, inventories, etc.) together inside the Iterable platform where it’s easy to sort, group and build associative data into Collections of specific products, locations and offers.

Catalog builds dynamic content groupings with the same depth and precision as our segmentation tool. Each Collection’s built-in logic checks the known attributes and preferences of your customers and then generates the criteria-based content that _best_ complements their characteristics.

Typical content personalization use cases:

*   **Multi-attribute related content**: _Top options matching previous purchase category and price range, similar listings to last product search (category, size, style, etc.)_
*   **Location-based initiatives**: _Top locations near area codes, related locations near area codes_

How it works: Catalog functionality starts by first uploading product inventory into Iterable. After that, you can sort and band your products’ and services’ data into different lists of groupings.

Use the Collection Builder to build Collections of personalized content groupings. Once inserted into your message template, Collections reference two stores of data before rendering customer-specific content: your Collection-specific product metadata and each user’s specific profile data.

Catalog creates individualized content blocks after product metadata (product types, store locations, prices, etc.) matches against the user data (behaviors, preferences, geolocation, etc.).

Example: With Catalog, Netflix could take its content personalization experience even further. 

Catalog generates recommendations from multiple criteria—unlike the singular data points of data feeds. 

Now, instead of Handlebars pointing to a specific data feed, they now point to Netflix’s “topRatedAction” Collection.

![Catalog multi-attribute content personalization](https://iterable.com/wp-content/uploads/2020/06/Catalog-Template-with-Handlebars-1.png)

_Notice how adding “top rated” movies adds another element of intrigue to these recommendations._

Let’s pretend that Netflix wanted to not only recommend action movies, but also specify popular ones. These movies must boast an overall star rating of 4.5 or higher.

After Catalog queries the action genre library, the “topRatedAction” Collection features: “Spider-Man: Into the Spider-Verse,” “Ant-Man and The Wasp” and “Solo: A Star Wars Story.”

![Collection Builder for personalized content](https://iterable.com/wp-content/uploads/2020/06/Catalog-Collection.png)

_The Iterable Catalog Collection Builder curates selected content from Netflix’s content query._

In the finished product below, we’ve taken the original rating request email and tailored it specifically to Ryan’s interests. In this scenario, Netflix has successfully munged Ryan’s data, its product data and the ratings of millions of other users into an orderly and personalized email!

![Netflix example Catalog content personalization](https://iterable.com/wp-content/uploads/2020/06/Catalog-Rendering.png)

_Things to do: Open email, rate Avengers, BINGE._

#### C.R.E.A.M. (Content Rules Everything About Marketing)

Content personalization means different things to different marketers. We get that! We all work within our unique sets of resources, data sets and business needs. Our customers value personalized content, and it’s important that we as marketers continue pushing the limits of possibility.

To see the Iterable personalization engine in action, sign up for a customized demo today.