# Composable CDP & Martech Stack Relationship - Iterable

## Composable CDP & Martech Stack Relationship

**Published by**

June 29, 2023

![Navy background with hightouch and iterable logos](https://iterable.com/wp-content/uploads/2026/04/062923_Hightouch-CDP_Blog-header.png)

_Hightouch is a leading provider of Data Activation and Customer Data Platform (CDP) solutions, enabling marketing and data teams to activate customer data directly from their data warehouse to over 200 destinations like ad platforms and CRMs._

_Hightouch is used by leading organizations like_ _Cars.com__, Spotify, TripAdvisor and GameStop to unlock a fast, flexible, and scalable CDP alternative by enabling them to activate audiences and other customer data points directly from their organization’s single source of truth – the data warehouse out to the many business tools it is needed in._

* * *

For years, marketers have relied on traditional Customer Data Platforms (CDPs) to power their most complex personalization use cases. CDPs enable marketers to collect, store, and activate customer data and attributes in their martech tools, like Iterable. However, as the martech ecosystem has evolved, many organizations are now beginning to realize that they don’t need a separate platform to activate customer data they already own–and this has given rise to the Composable CDP.

### The Evolution of MarTech

In the early 2010s, Scott Brinker coined the word martech to describe the convergence that was taking place between marketing and data tools. Since then, the martech world has witnessed a proliferation of development, with the latest martech report highlighting over 11,000 different technologies across numerous different categories.

Marketers have more tools than ever to orchestrate campaigns and touchpoints across channels, and data teams have more data available than ever before, thanks to cloud data warehouses.

Cross-channel communication platforms, like Iterable, paved the way for complex multi-touch marketing campaigns by creating a single, centralized platform where companies can easily (and automatically) orchestrate cohesive and consistent campaigns across email, web, and mobile.

Still, even with the best tools and data, many organizations fail to actually drive meaningful, personalized experiences that move the needle forward. For many years, marketing teams have been stuck doing basic personalization–usually auto-filling a few basic fields like name, email, or job title. This level of personalization doesn’t cut it today: customers want and expect personalized experiences that are tailored to their preferences.

However, many data tools weren’t built for marketers, and marketing tools weren’t built for data teams, but both teams are needed to drive personalization at scale. As more and more companies look to drive value from their data, this gap gave birth to the multi-billion dollar CDP industry.

### The Rise of CDPs

CDPs were essentially the very first managed-cloud offerings that made it possible to store and activate customer data at scale. Traditional CDPs actually pre-date cloud data warehouses in some capacity because these platforms were the very first single-platform solutions available to organizations that enabled data and marketing teams to monetize and drive value from their customer data. Interestingly enough, under the hood, most CDPs today are powered by cloud data warehouses.

Most traditional CDPs are made up of several core components:

*   **Data Storage**: Fully managed data storage for both events and customer profiles
*   **Identity Resolution**: Built-in data modeling capabilities to link online and offline actions to a single customer profile
*   **Audience Management**: Granular audience management capabilities for building and orchestrating journeys across user cohorts
*   **Data Syncing**: Pre-built integrations to automatically sync data to downstream destinations

Prior to CDPs, anytime a marketer wanted to launch a new experiment or target a specific audience, a ticket had to be submitted to the data team.

This ad-hoc manual process created several problems. Firstly, data teams had to write custom code every time data needed to be moved out of the warehouse for each desired downstream destination. For small organizations, this was not too problematic, but for larger enterprise-level organizations that operate across hundreds of marketing channels, this was an engineering nightmare because it meant building and maintaining hundreds of scripts and custom pipelines.

Without the necessary data, marketing teams were locked out from any experimentation, and simply asking for an additional data point or customer attribute could create longer lead times.

### Why Traditional CDPs Fail

What most people don’t realize is that many of the traditional CDP vendors, as you know them today, didn’t actually set out to build out a platform focused on creating and activating a 360-degree view of the customer. Many of the largest CDPs began as event collection platforms and CRMs and only transitioned into fully-managed customer data offerings after realizing that marketing teams had much more complex use cases they needed to solve.

While the core value proposition that CDPs continue to solve isn’t going away anytime soon, the bundled architectural approach of these platforms introduces several challenges:

*   **Limited Customer Understanding**: Traditional CDPs were built to collect behavioral events (e.g., page view, abandon cart, button click, etc.), which means the platforms are designed around a strict user/account model. This means you can’t leverage existing first-party data or additional attributes without substantial engineering effort.
*   **Duplicate Storage and Compute**: CDPs house data outside of your existing data infrastructure into a separate entity, forcing you to purchase an additional storage and compute layer to manage data that you already own. This can quickly introduce security and compliance issues with GDPR, HIPAA, and CCPA laws.
*   **Long Implementation Time**: The average CDP implementation takes anywhere from six months to a year, and that’s not even factoring in onboarding and training time. Additionally, anytime you want to store a new data point or attribute in your CDP, you have to build an entirely new ingestion pipeline and re-architect your CDP from scratch.
*   **Inflexible Modeling**: Because CDPs are designed to collect and store behavioral clickstream data (e.g., signup, page view, abandon cart, etc.), these platforms are often built around a strict user/account model. This makes it very difficult to solve complex personalization use cases for custom objects like playlists, pets, workspaces, albums, artists, etc.
*   **High Cost of Ownership**: Traditional CDPs make your purchase and pay for every feature in a bundle. Often this means you’re forced to pay for features you’ve already solved for upstream in your existing data stack.

### The Emergence of the Composable CDP

With the rapid adoption of cloud data warehouses, many companies are now coming to the realization that they don’t need to pay for a CDP to manage and store data they already own. This paradigm shift has given rise to what’s now commonly referred to as a Composable CDP.

A Composable CDP has the same goal as a traditional CDP—activating customer data to downstream tools—but rather than operating as a separate entity and storing data outside of your current data infrastructure like a traditional CDP does, a Composable CDP is an activation layer that lets you curate audiences, orchestrate journeys, and send your existing data to your frontline marketing tools.

![A chart depicting the flow of data from left to right. On the left is hightouch, the middle is building and syncing audiences, and the far right is Iterable.](https://iterable.com/wp-content/uploads/2023/06/Screen-Shot-2023-06-29-at-10.32.28-AM.png)

_How a Composable CDP works._

This architectural approach offers several advantages compared to bundled CDP offerings because rather than having to pay additional storage and compute costs, you can leverage your existing data assets to drive immediate value.

Because a Composable CDP is really just a data activation layer that sits on top of your existing data stores, the architecture is technology agnostic. Under the hood, a composable CDP is just powered by reverse ETL. This means you can easily scale and adjust your infrastructure to facilitate your most complex use cases.

The modularity allows you to avoid the major shortcomings of CDPs because you can take advantage of your existing data collection, data storage, and data modeling capabilities. The flexible nature of this architecture means that you’re not locked into the constraints of a single platform, and you can easily access any and all of your data to build rich audience cohorts for personalization.

Additionally, because you’re simply adding an activation layer on top of your existing data assets, you can avoid the long, drawn-out implementation time of traditional CDPs—allowing you to think in terms of use cases rather than technologies.

### How to Get Started With a Composable CDP

Unfortunately, there’s a bit of a misconception around Composable CDPs because many organizations think they need to reach a certain level of data maturity before they can actually drive value from their data. The reality is that a composable CDP is simply an activation layer that sits on top of your existing data assets, whether that’s a customer events table or a propensity model your data team has built in your warehouse.

Data activation platforms like Hightouch enable you to push your data to over 200+ destinations, including cross-channel communication platforms like Iterable. This has many benefits because having access to all of your customer data means you can power your most complex personalization use cases.

Here are a few examples of what this might look like in the context of Iterable:

*   **SMS Messages**: Notifying users when their order has been delivered
*   **Email**: Delivering a personalized email with product recommendations using a propensity model your data team has built
*   **Push Notifications**: Notifying users of a local in-store promotion

_If you’re interested in learning more about how you can use Hightouch to power your lifecycle marketing campaigns in Iterable, you can schedule a Hightouch demo and Iterable demo today._