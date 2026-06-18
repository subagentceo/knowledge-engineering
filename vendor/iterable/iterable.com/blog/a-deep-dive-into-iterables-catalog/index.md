# A Deep Dive Into Iterable’s Catalog - Iterable

## A Deep Dive Into Iterable’s Catalog

**Published by**

October 10, 2023

![Woman shopping on her phone and laptop at the same time](https://iterable.com/wp-content/uploads/2026/04/101023_Deep-Dive-Iterable-Catalog_Blog.png)

Whether you’re a marketer in retail, restaurants, education, or entertainment, the data you’re able to activate in your customer communications makes all the difference. Every day, you’re accessing information about the products or services you offer: categories, descriptions, prices, images, and countless other variables.

Greater personalization is made possible when you can dynamically match this data to customers based on their interests, preferences, and shopping behavior. How can you increase the effectiveness of your marketing campaigns and take the guesswork out of individualization?

Enter Iterable’s Catalog.

In this post, we’re diving deeper into Catalog—what it is, how it works, and why leading brands rely on it as their ultimate recommendation engine.

Let’s jump in.

### What is Catalog?

Iterable’s Catalog gives marketers the ability to create no-code recommendations with dynamic content, allowing one template to serve thousands of unique customers.

This product uses two main terminologies:

*   **Catalogs**: A catalog holds entries of non-user information, such as products, services, events, or content. This information is stored directly in Iterable and used to personalize the messages you send.
*   **Collections**: In Iterable’s user interface, marketers create rules for what items get recommended. A collection refers to both the ruleset and the list of items returned by that ruleset.

For each of a brand’s recipients, Iterable-powered marketing campaigns can use collections to search, at send time, the information stored in catalogs. Collections (the rule sets) match users with catalog data based on their interests, preferences, locations, and historical activity—anything stored on their Iterable user profile.

For example, with Catalog you can send messages that provide:

*   Products similar to a customer’s past purchases
*   Retail store locations in close proximity to the user’s shipping address
*   Real estate listings within a certain radius of a recipient’s preferred location that match specific search criteria (budget, number of bedrooms, etc.)
*   Music, movies, or TV shows that match a subscriber’s preferred genres, actors, or directors
*   Restaurants based on cuisine, price, location, and rating preferences
*   Flights or hotels that match a recipient’s preferred carriers or destinations
*   Online classes based on a student’s interests or course history

Historically, this type of personalization at scale required your organization to host and maintain a set of web services that could be queried for each of a campaign’s recipients. With Iterable’s Catalog, there’s no additional infrastructure required—Iterable hosts the data and queries it while sending a campaign.

### What are the Benefits of Using Catalog?

As the examples above demonstrate, there’s no limit to what Iterable’s Catalog can be used for. This provides numerous benefits for your marketing efforts:

*   **Individualized campaigns**: Messages are dynamically personalized in real time, tailoring product recommendations based on any criteria you select, including geolocation and user preferences.
*   **Marketer empowerment**: Iterable’s native platform UI provides marketers the ability to access a recommendation engine without requiring any technical assistance from engineering or data science teams.
*   **Upleveled A/B testing**: With multiple collections, you can generate and test different dynamic content experiences to audience segments. Instead of testing which messages are best for your brand, you can now determine which messages matter most to your customers.

Much like the rest of the Iterable platform, Catalog offers flexibility and ease of use, making it easy to build modifiable collections of personalized content in just a matter of minutes.  
How Does Catalog Work?

Iterable’s Catalog works in three easy steps:

1.  Upload a catalog
2.  Create a collection
3.  Reference the collection in your message

To illustrate each step, the example below imagines how a food delivery app could suggest restaurants to customers based on their favorite cuisines.

Let’s start with the first step of uploading a catalog.

![the basic logic behind Iterable Catalog](https://iterable.com/wp-content/uploads/2023/10/Screen-Shot-2023-10-10-at-12.36.38-PM.png)

_By matching a catalog of restaurants to users’ favorite cuisines, a food delivery app can make individualized recommendations._

#### 1. Uploading a Catalog

To use Iterable’s Catalog, you start by uploading a catalog of information. In our example, the catalog data is depicted in red and includes the names of each restaurant and the cuisine offered.

Catalog stores information about your organization and projects right in the Iterable platforms, making it possible to use this data to personalize campaign messages at send time.

Iterable’s web interface provides a variety of ways to create and edit catalog items:

*   To create and edit a single catalog item, you can use the JSON or text editors
*   To bulk create up to 1,000 catalog items at once, you can upload a CSV file
*   For programmatic updates, you can use APIs

Iterable stores catalog items in JSON and supports the following data types: string, long, boolean, double, date, object, and geo_location. To learn more about catalog creation, please refer to Iterable’s Catalog documentation.

After the catalog is uploaded, it’s time to create a collection.

#### 2. Creating a Collection

Marketers can create a collection within the Iterable platform that sets the rules for its recommendations. In our example, the collection is matching cuisine to the favorite listed in each user profile in Iterable.

Collections use information about a recipient to search for relevant catalog items.

To search for these catalog items, the Collection Builder supports boolean logic, static search criteria, dynamic search criteria, various search operators, ordering, sorting, and limiting. Marketers can combine multiple groups of static and dynamic search criteria into a single, overall search that finds relevant items in a catalog.

Once the catalog and collection are prepared, all that’s left is to reference the collection to display in your message.

#### 3. Referencing the Collection to Display in Your Message

Referencing a collection is done by using Iterable handlebars, which in our example above, automatically populate the user’s first name and the restaurant recommendation in the subject line.

After the collection has been created, Iterable will generate handlebars for you, which can be pasted inside your message template within brackets. Handlebars can reference text, images, and colors with the use of HTML and CSS.

To give you a visual depiction of how Iterable handlebars are used, the image below represents a cart abandonment email that is personalized by product name, brand, and price.

With Iterable handlebars (pictured on the left with curly braces), this cart abandonment email is personalized by first name and features both the items left behind and similar products.

![Example of what handlebars look like when using Iterable Catalog](https://iterable.com/wp-content/uploads/2023/10/Screen-Shot-2023-10-10-at-12.32.30-PM.png)

_With Iterable handlebars (pictured on the left with curly braces), this cart abandonment email is personalized by first name and features both the items left behind and similar products._

### How Can I Get Started With Catalog?

Consumers’ preferences and interests aren’t static—and your communications to them shouldn’t be either. Building dynamic content doesn’t have to be a burden. In just a few steps, Iterable’s Catalog gives marketers more flexibility and creative capability to personalize their messages better than ever before.

For even more examples of how leading brands are creating 1:1 experiences with Catalog, check out these Iterable customer success stories:

*   UNiDAYS saved nearly 200 hours annually, allowing the team to further optimize their CRM program
*   Omnia Fishing grew its subscribers by 55% and achieved an 18% increase in click-through rate with more personalized emails
*   The Dyrt saw a 2X increase in weekly retention rates and a 150% improvement in its push open rates

To get started creating dynamic product recommendations with Catalog, reach out and schedule a custom demo today.