# How ATG Entertainment Built a Recommendation Engine at Scale - Iterable

## How ATG Entertainment Built a Recommendation Engine at Scale

**Published by**

Manasi Patel

June 4, 2026

![](https://iterable.com/wp-content/uploads/2026/06/Blog-Header02.png)

### Key Takeaways

*   Personalization starts with customer relevance, not technology.
*   Most brands get stuck because of mindset, data, or execution challenges.
*   ATG transformed one static campaign into thousands of unique experiences using a simple recommendation model.
*   Recommendation engines do not need AI to drive measurable business results.
*   Building the customer experience first makes technical decisions much easier.

* * *

At Activate Summit, Oliver Marley, Senior Data Scientist at ATG Entertainment, shared how his team built a recommendation engine that transformed static email campaigns into thousands of personalized customer experiences.

The challenge was familiar: producers wanted maximum exposure for their shows, while customers wanted content that felt relevant to their interests.

Rather than investing in unnecessary AI systems, ATG built a practical personalization framework powered by customer behavior, catalog data, and dynamic content. Here’s how they did it.

**Check our Marley’s full session,** **How Leading Brands Leverage Data to Scale Personalization****.**

## Is Your CRM Stuck? Three Reasons Most Brands Are Stuck in Batch-and-Blast

Many personalization projects fail before they start because teams focus on technology first.

ATG’s experience suggests a different way to think about the challenge. Before evaluating recommendation engines or customer data platforms, it helps to identify where your organization is actually stuck.

### 1. Mindset: Product-Centric vs. Customer-Centric Marketing

This was ATG’s first challenge. Like many organizations, different stakeholders wanted maximum exposure for their products. The result was often high-volume marketing focused on individual shows rather than customer interests. Over time, that approach creates a relevance problem. Customers receive more content, but not necessarily better content.

The shift toward personalization started when ATG began asking a different question: **What would this customer actually want to see next?**

### 2. Data Foundations: Can You Act on What You Know?

Customer data alone does not create personalization. Teams also need:

*   Accessible behavioral data
*   Product or catalog data
*   A system for connecting the two

For ATG, that meant bringing transactional data and show information together to support recommendations at the individual customer level.

### 3. Execution: Can You Deliver Personalized Experiences Consistently?

Many brands have useful customer insights sitting in dashboards. The challenge is operationalizing them.

Personalization only creates value when customer intelligence can be surfaced consistently inside emails, campaigns, and journeys. That requires templates, processes, and infrastructure designed to support dynamic content at scale.

Once ATG addressed those three areas, the team was ready to build something much more ambitious.

## How ATG’s “Top Picks” Campaign Turned 8 Shows Into Thousands of Unique Emails

The inspiration came from a pattern customers already understood. Streaming platforms, retailers, and social networks all use personalized sections like for recommended content, top picks, and “because you watched” collections. ATG wanted to bring the same concept to email.

The result was a campaign called “**Top Picks”**.

![](https://iterable.com/wp-content/uploads/2026/06/ATG-Top-Picks-1-1.png)

![](https://iterable.com/wp-content/uploads/2026/06/ATG-Top-Picks-2-2.png)

Instead of presenting the same shows to every subscriber, each customer received a list of shows ranked according to their individual interests. Here’s what changed:

**Traditional Campaign**

**Top Picks Campaign**

Marketing teams manually selected 8 shows

Recommendations generated for each individual customer

Content driven by business priorities

Content driven by customer relevance

One experience for every recipient

Thousands of unique combinations

Manual formatting and updates

Dynamic content populated automatically

Importantly, the format stayed the same. Customers still saw eight featured shows in the email. The difference was that those eight spots could now be filled from a catalog containing more than 100 active shows rather than a small, manually selected list.

That shift dramatically increased relevance without increasing complexity for the customer.

### The Results

**Across more than 30 campaign tests, ATG’s “Top Picks” approach increased click-through rates by 41%.**

The personalized version consistently outperformed static campaigns, generating:

*   Higher click-through rates
*   Improved conversion performance
*   Greater catalog exposure across the full portfolio of shows

Just as important, it eliminated much of the manual work previously required to build campaigns. Instead of dragging, dropping, formatting, and updating individual show placements, content could be generated dynamically from customer preferences and catalog data.

## The End-to-End Pipeline Behind ATG’s Recommendation Engine

One reason many personalization projects stall is that they seem more complicated than they actually are. ATG’s recommendation engine is sophisticated in its outcomes, but the underlying framework follows a relatively straightforward process.

### Step 1: Bring Customer and Catalog Data Together

The foundation starts with two core data sources:

*   Transactional data, including ticket purchases and booking history
*   Show and catalog data, including titles, dates, venues, and availability

ATG stores both inside Snowflake, creating a single source of truth for customer activity and showing inventory.

Without this foundation, personalization becomes difficult because customer preferences and available content live in separate systems.

### Step 2: Generate Recommendations

Rather than building a complex AI model, ATG started with a simpler recommendation approach called collaborative filtering. If the audiences for two shows frequently overlap, those shows are likely to share interest patterns.

For example:

*   Customers who purchase tickets for _The Lion King_ may also be interested in _Wicked_
*   Fans of a specific comedian may show interest in similar performers
*   Theater audiences often demonstrate repeat preferences across genres

Using those audience relationships, ATG generates a ranked list of recommended shows for each customer.

### Step 3: Push Recommendations Into the CRM

Once recommendations are generated, they need to be accessible to marketers.

Using Iterable Smart Ingest, ATG pushes recommendation data directly into customer profiles, making personalized content available at send time without requiring marketers to configure campaigns manually.

By making recommendations part of the customer profile, ATG ensured personalized content became a natural part of the campaign workflow rather than a separate system marketers had to manage.

### Step 4: Prevent Recommendation Fatigue

One of the smartest parts of ATG’s approach is what the team calls an **exposure ledger**.

The challenge is simple: recommendation engines tend to keep suggesting the same content repeatedly. Customers may have an affinity for a particular show, but seeing it every week creates fatigue.

To address that, ATG tracks:

*   What customers have already been shown
*   What they’ve clicked
*   What they’ve ignored
*   How frequently has content been surfaced

Those signals influence future rankings. The result is a recommendation system that evolves alongside customer behavior rather than repeating the same suggestions indefinitely.

### Step 5: Surface Recommendations in Email

The final step is presentation. ATG separates recommendation logic from email design through a modular template structure.

Using Iterable Snippets, the team created one layer to handle recommendation and catalog logic and a second layer to control the visual presentation of show cards and content blocks. 

This approach made templates easier to maintain, troubleshoot, and scale as personalization efforts expanded. It also makes personalization more sustainable because marketers can update creative without rebuilding recommendation logic.

## How to Stop Every Email From Looking the Same

As ATG expanded personalization, the challenge shifted from relevance to variety. Customers may enjoy personalized recommendations, but the experience can still become repetitive if every email follows the same structure.

To create more engaging campaigns, the team focused on three areas:

*   **Mix different types of content.** Instead of relying entirely on recommendations, ATG combines sections like “Recommended for You”, “Coming Up”, and “Now On Sale” to balance personalization with discovery.

*   **Use Collections to organize content dynamically.** Collections allow the team to surface content based on criteria such as market, availability, and performance dates, making it easier to combine personalized and contextual content within the same campaign.

*   **Introduce visual variety.** Content is only part of the experience. The team continues experimenting with different layouts and presentation styles so emails feel fresh even when recommendations overlap.

The broader lesson is that personalization is not just a recommendation problem. Recommendations help determine what customers see, but the overall experience determines whether they continue engaging.

## 5 Lessons From Building Personalization End-to-End

Building a recommendation engine taught ATG several lessons that apply far beyond entertainment marketing:

*   **Start with the customer experience.** The team defined the “Top Picks” experience first, then built the technology needed to support it.

*   **Start simple.** A collaborative filtering model delivered measurable results without requiring complex AI or years of development.

*   **Build modular systems.** Separating recommendation logic from presentation made campaigns easier to manage, update, and scale.

*   **Design for your constraints.** Every organization has different data, resources, and business requirements. The best solution is the one that fits your environment.

*   **Let results drive alignment.** Positive test results helped shift stakeholder conversations from opinion to evidence, making it easier to build support for a customer-centric approach.

## What Comes Next: Real-Time Signals and Personalization at Full Scale

ATG sees its current recommendation engine as a foundation for what’s next. Future priorities include:

*   **Incorporating browsing behavior** to better understand customer interests before a purchase occurs.

*   **Reducing recommendation latency.** ATG is exploring Iterable Data Feeds to retrieve recommendations closer to send time, helping ensure content reflects the most current customer behavior.

*   **Expanding personalization coverage** so dynamic content becomes a standard part of every campaign.

The goal is to make customer relevance easier to scale across the entire marketing program.

## Your Recommendation Engine Is Closer Than You Think

Many marketers assume personalization requires advanced AI, massive teams, or perfect data. ATG’s experience suggests otherwise. The biggest breakthrough wasn’t a more sophisticated algorithm. It was a shift from promoting what needed selling to understanding what customers were most likely to care about.

By starting with a clear customer experience, building a simple recommendation model, and iterating over time, ATG created a scalable personalization framework that delivered measurable results.

For teams considering a similar approach, the lesson is simple: start with the experience, build the simplest system that supports it, and improve from there.

**To hear the full session and learn more recommendation engine best practices from Oliver Marley, watch** **How Leading Brands Leverage Data to Scale Personalization** **on demand from Activate Summit.**