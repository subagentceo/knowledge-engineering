# Masked Calling

Masked Calling is a technique used in ecommerce to protect buyers' and sellers' personal phone numbers. Each party gets a temporary number, allowing them to communicate for a specified time period. When the time period expires, the numbers are recycled and reassigned to other parties on the platform. This prevents transactions from happening outside the platform.

Masked Calling is made possible by [Voice APIs](https://www.twilio.com/en-us/voice) like Twilio where a developer can set up phone number proxies to keep parties from knowing each other's real phone numbers during a call. The same technique can also allow the parties to send SMS to each other without revealing their personal phone numbers.

The basic technique involves using an intermediate number to forward the call to the user's real number. The customer may see number AAA-AAAA, but behind the scenes, AAA-AAAA is being forwarded to the seller's true number, BBB-BBBB. When the seller's phone rings, or an SMS arrives, she also sees AAA-AAAA as the caller ID as, even though the buyer's real number is CCC-CCCC.

Applications using Masked Calling usually leave the numbers assigned for a set period of time: say, the length of the taxi ride plus a couple hours in case the rider left her backpack in the car. After this time, the numbers are recycled and reassigned.

**More resources**

* Read how [Uber uses Twilio for Masked Calling.](https://customers.twilio.com/208/uber/)
* Learn why you might want to use [Masked Calling](/docs/proxy).
* See the basic steps to [build Masked Calling](https://www.twilio.com/en-us/phone-numbers),
* Run this code tutorial on [using Masked Calling with C#](/docs/messaging/tutorials/masked-numbers/csharp).
