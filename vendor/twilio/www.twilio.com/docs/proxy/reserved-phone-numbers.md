# Reserved Phone Numbers

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

When you set up a Proxy Service, you add one or more Proxy Numbers (Twilio Phone Numbers) to its pool. When you then add Participants to Proxy Sessions, Proxy selects numbers from this pool as the Participant's Proxy Identifier.

You can read more about how Proxy selects which Phone Number to use in a certain Session in [Understanding Phone Number Management](/docs/proxy/understanding-phone-number-management), but essentially, Proxy will assign phone numbers from the Proxy Numbers Pool to Participants in order to enable masked communication.

There are some situations where you might want a number in your pool to be set aside and not randomly assigned to Participants. For these situations, Proxy allows you to mark a number in your pool as Reserved.

* For example, you may decide to remove a Number from your pool to move to another Service, or to use in a non-Proxy use case. In order to do this safely, though, you need to wait until no active Participants are using the number. By marking the Number as Reserved, you will allow it to "drain" until it becomes safe to remove from the pool.
* Another common scenario for which Reserved numbers are useful is that in which you wish to associate a Proxy Number with only one real-world Phone Number (for instance, if you wanted to publish a number on a business card or advertisement) while still using Proxy's number masking functionality.

When [adding a Phone Number to the Proxy Number Pool](/docs/proxy/api/phone-number), you have the ability to mark a Phone Number as a Reserved Phone Number with the `is_reserved` option. You can also do this [through the console](https://console.twilio.com/us1/develop/proxy/services?frameUrl=%2Fconsole%2Fproxy%2Fservices%3Fx-target-region%3Dus1) by marking your proxy phone number as a Reserved Number.
