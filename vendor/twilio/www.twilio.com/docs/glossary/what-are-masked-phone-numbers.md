# What are Masked Phone Numbers?

*Masked Phone Numbers* are a common pattern to anonymize communication between multiple parties and hide participant phone numbers. Instead of dialing directly from phone to phone, users communicate via a third ('proxy') phone number that forwards a call to the eventual destination.

## Privacy and the Need to Mask Phone Numbers

Many business use cases require a flurry of communications over a limited time frame. Having a service provider and a customer trade phone numbers for a transaction that will be over quickly is wholly unnecessary. While communications via text message and phone are necessary for logistical purposes, there often isn't a social need for two parties to trade phone numbers.

This is where the need for so-called masked phone numbers arises. Also known as *proxied*, *anonymized*, or *cloaked* phone communications, your business can enable this time-boxed communication without revealing unnecessary customer - or worker - information.

Many business cases have use for this pattern; a non-exhaustive list of where masked phone numbers might make sense is:

* Real Estate Agencies
* Ride-sharing Services
* Delivery Companies
* Food Delivery Services
* Peer-to-Peer Vacation Rentals
* Dating Applications

While setting up the infrastructure for anonymous communications is often a good choice for your users and workers, it also has a strong business case. With masked phone numbers, you add friction for users attempting to move off your platform for transactions, keeping more business with your company.

See more of our [guidance on anonymous communications.](/docs/proxy)

### Business Needs and Safety

In many cases, revealing a private phone number is a major cause of friction. In *extreme* cases, keeping phone numbers and other personally identifiable information private can even be a safety issue.

For limited duration conversations needed for logistics, there is no need for one party to continue to contact the other when the transaction or service is complete. By proxying communications from the start, your business can avoid any potential problems down the road - or even just annoyance from accidental dials.

## Twilio's Solution to Cloaked Communication

[Twilio's Proxy](/docs/proxy) automatically puts the infrastructure in place for your business to support masked phone numbers. From a phone number pool, Proxy will automatically assign and route communications back and forth, without revealing 'true' phone numbers unnecessarily.

![Diagram showing Twilio proxy session creation between customer and delivery driver using proxy numbers.](https://docs-resources.prod.twilio.com/f74d5bd01700c4a4c47e5f0cc86aed918984c174922cb35676b8d9837c6ba3b6.png)

For the self-service types, our [Voice APIs](/docs/iam/api) help you build your own masked communication infrastructure. We have extensive documentation on [building masked numbers into your web application](/docs/messaging/tutorials/masked-numbers/python).

Want to learn more about masked phone numbers? [Talk to Twilio Sales](https://www.twilio.com/en-us/help/sales), and we'll be happy to talk you through how anonymous calling can help your bottom line.
