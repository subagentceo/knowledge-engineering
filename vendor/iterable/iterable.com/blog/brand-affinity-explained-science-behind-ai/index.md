# Brand Affinity™ Explained: The Science Behind the AI - Iterable

## Brand Affinity™ Explained: The Science Behind the AI

**Published by**

January 27, 2021

![Illustration to depict Iterable AI](https://iterable.com/wp-content/uploads/2026/04/012821_Brand-Affinity-Explained_768x512.png)

Artificial Intelligence (AI) is arguably the most talked about—yet most misunderstood—technologies in digital marketing. From machine learning, to neural networks, to data science, AI has plenty of buzz but often leaves marketers feeling uncertain in fully embracing this strange new technology.  
   
We believe that AI is the future of marketing, and we’re not alone. In fact, in a recent survey of B2C marketers we conducted, 88% of marketers have made AI a key part of their 2021 marketing strategy and plan to expand their in-house AI capabilities in the new year.

2020 was an important year for Iterable and our AI development. We set out to build easy yet powerful AI tools that complement today’s marketer, not replace them. We focused on creating intuitive AI solutions to empower marketers to automate routine tasks, accelerate growth, and deliver more meaningful experiences at every step of the customer journey—all without replacing the authenticity and empathy in their messaging.

### Brand Affinity™

Late last year, we released Brand Affinity™, an intelligent personalization solution powered by Iterable AI that gives marketers the power to transform customer engagement into more meaningful cross-channel experiences.

Brand Affinity takes a holistic look at engagement across all of your messaging and calculates a score that indicates how likely each contact will interact with future marketing messages. We pipe the data through our AI and label each of your contacts based on their engagement.

At any given point in time, each customer has one of the following Brand Affinity labels:

*   `loyal` – Highly engaged with your messages, and frequently interacts with them.
*   `positive` – Generally engaged with your messages, and often interacts with them (but less frequently than loyal contacts).
*   `neutral` – Sometimes engaged with your messages, and only occasionally interacts with them.
*   `negative` – Usually disengaged with your messages, and generally does not interact with them.
*   `unscored` – Has not yet received enough messages for Iterable to generate a meaningful Brand Affinity label.

Instead of brands having to rely on their data science team or spend hours manually querying customer databases, across multiple channels, to create complex segmentation queries, you can use Brand Affinity to quickly and easily identify users by overall engagement. Using Brand Affinity, you can leave the segmentation to the AI and focus on delivering amazing experiences for your customers.

### Under the Hood of Our AI

To generate Brand Affinity labels for your contacts, we look at email, mobile push, and in-app engagement across all of your campaigns and workflows. More recent engagement signals are weighted more heavily, with a time-based exponential decay applied as engagement becomes older.

We also dynamically determine how far back in time to look based on how you send and how to decay the importance of older interactions over time.

Our AI models take into consideration the percentage of messages that contacts have interacted with because we do not want to score contacts down for not receiving enough messaging. Maybe your contacts want to hear from you!

For example, someone who opens 4 out of 5 emails will have a similar Brand Affinity as someone who opens 8 out of 10. However, for the latter contact, the AI can add a boost for the contact that opened eight messages.

We include transactional messaging interactions as a secondary signal because e-commerce receipts and even password resets are positive signals for your brand.

We pipe all of this data through our AI and output a single scalar that predicts a propensity for future engagement, and we turn that number into the Brand Affinity label that you see in the Iterable UI. The boundaries of where we draw the line between labels, for example, between positive and loyal, is determined dynamically for each project.

We also continuously monitor how well our models perform and make adjustments over time to improve their overall accuracy and usefulness.

### How to Get Started

We want to bring the power of AI to your fingertips, so we have intentionally designed Brand Affinity to be integrated across the Iterable platform to deliver highly personalized experiences.

Marketers can take advantage of Brand Affinity in Segmentation to intelligently segment and target customers by creating dynamic audiences; tailor and personalize customer journeys in Workflow Studio; or populate dynamic content through conditional logic to match customers with personalized experiences by affinity.

With Brand Affinity labels being stored on the user profile, you can easily personalize the customer experience at every stage of the lifecycle, anywhere a contact property can be used, including:

*   **Segmentation** – as a contact property criteria field
*   **Workflow Studio** – as a field split node, field match node, or triggered event
*   **User Profile** – as a contact property nested under `brandAffinityLabel`
*   **Handlebars** – as dynamic message content and conditional logic
*   **Data feeds** – as a parameter of a data feed call to return the right recommendations for someone
*   **Catalog** – in a collection, to offer recommendations based on users that match Brand Affinity labels

### Learn More About Iterable AI

If you would like to learn more about Brand Affinity or any of Iterable’s AI products, please contact your Customer Success Manager or visit iterable.com/ai for more information and schedule a demo.