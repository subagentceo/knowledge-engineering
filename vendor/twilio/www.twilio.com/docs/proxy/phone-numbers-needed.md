# How many Phone Numbers do I need?

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

> \[!WARNING]
>
> We strongly recommend you read the Proxy [Phone Number Management introduction](/docs/proxy/understanding-phone-number-management) first.

An important setup task with Twilio Proxy is adding phone numbers to your Proxy [Service](/docs/proxy/api/service), as you'll see from the [quickstart](/docs/proxy/quickstart) and [REST API](/docs/proxy/api) documentation. How many phone numbers should you add to your service?

In the quickstart, you add only a single number with no additional configuration options set. This means that Proxy will use that single number to pair Participants in each Session. If you try and pair the same individuals in additional Sessions while the first Session is still open, you'll get an error because Proxy has used all available numbers.

The exact "number of numbers" you'll need in the Proxy number pool is based on a number of factors, but the *Proxy number rule of thumb* comes from this question:

## How many concurrent Sessions might my participants be active in?

This question is crucial for assessing how many Twilio numbers will be required in the Service. The reason is that one single participant cannot be assigned to the same Proxy number in concurrently active (open or in-progress) sessions. So if the same participant will be active in two concurrent sessions, at least two Twilio numbers will be required as Proxy Numbers in the Service. That being said, one single proxy Identifier (the Twilio number in the Service) can be used in multiple active sessions, but by distinct participants.

Let's illustrate this with an example. Let's suppose we have a ride-sharing app where a driver is paired with only one passenger at a time, and the Session closes as soon as the ride is complete. In this case, we can use a single Twilio number in the Service\*. In the table, we describe each ride's Sessions:

| Session                                        | Driver               | Passenger            |
| ---------------------------------------------- | -------------------- | -------------------- |
| A (Driver A, Passenger A) From 10AM to 10:20AM | Using Proxy Number 1 | Using Proxy Number 1 |
| B (Driver A, Passenger B) From 10:25AM to 11AM | Using Proxy Number 1 | Using Proxy Number 1 |

This works because at any given time, when Driver A calls Proxy Number 1, she will reach her current passenger. Note, a passenger cannot call or message the driver after the ride is complete since their respective Session will have closed.

But now let's say that we need a way for the Driver or Passenger to get in touch for some period of time *after* the ride - for example, the Passenger left his wallet in the car and the Driver needs to let him know. In order to enable this, we'll need to keep the Session in-progress even after the ride is complete (let's say the ride takes 1 hour). In this case, because the Driver may need to be able to communicate with both passengers during the overlap time, she'll need two different Proxy Numbers. Let's illustrate this with a table:

| Session                                        | Driver               | Passenger                  |
| ---------------------------------------------- | -------------------- | -------------------------- |
| A (Driver A, Passenger A) From 10AM to 11:20AM | Using Proxy Number 1 | Using Any Proxy Number\*\* |
| B (Driver A, Passenger B) From 10:25AM to 11AM | Using Proxy Number 2 | Using Any Proxy Number\*\* |

From 10:25AM to 11:20AM, the Driver will be a participant in two active Sessions. Thus, we'll need at least two Proxy Numbers in our pool to allow Driver to have a unique Proxy Number as identifier per active Session.

**Remember**: The best time to create a Session is when it's needed. For example, show a "Call" button in-app, then create the Session and add the Participants, and then finally retrieve the assigned phone numbers.

\* For simplicity, we will use the minimum number of Proxy numbers required in the Service.\
\*\* For this example, the Proxy Number assigned to the Passenger is irrelevant. It is worth clarifying, though, that when you allow Proxy to assign Proxy Numbers to Participants, sometimes both Participants will have the same Proxy Number (especially when you have very few numbers in your pool). This is fine but is by no means a requirement.

## What other factors affect how many Phone Numbers are required?

### Sessions per Phone Number

At high scale, you may start to encounter issues if too many *Sessions are concurrently using the same Phone Number*. This is particularly true if your application sends a high volume of bulk messages over multiple sessions at once or if you deployed Proxy outside of the US. In these cases, we recommend limiting your use of Proxy to **100 unique Sessions per Phone Number**. This is to ensure message and voice traffic over a single Phone Number does not encounter throttling and/or blocking by carriers. If you have a high volume of Sessions and you need more guidance in scoping how many Phone Numbers you should have in your pool, don't hesitate to reach out to us.

### GeoMatching

Setting strict GeoMatching rules on your Proxy Service will mean that you require far more local Phone Numbers in your pool to successfully match Participants.

## How can I tell if I need more Phone Numbers?

When adding [Participants](/docs/proxy/api/participant) to a [Session](/docs/proxy/api/session), you will receive an error if your Proxy Phone Number pool has no available Phone Numbers. This error is reported to debugger events. In the future, a metrics API will allow you to check utilization of your Phone Number pool. We are also investigating automated alerts when your Phone Number pool is approaching full utilization.

If that doesn't answer all of your questions about how to estimate the number of phone numbers you will need in your Twilio Proxy service, and you've already read our guide to [Phone Number Management](/docs/proxy/understanding-phone-number-management), then please contact using the support channel below.

Hopefully, it does, and you're ready to dig into the [Proxy API Reference](/docs/proxy/api) next.
