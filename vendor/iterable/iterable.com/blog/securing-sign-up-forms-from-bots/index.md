# Securing Sign-Up Forms From Bots - Iterable

## Securing Sign-Up Forms From Bots

**Published by**

September 19, 2023

![Iterable green background, illustrated laptop with envelope on the screen and a piece of paper with a robot on it coming out of the envelope](https://iterable.com/wp-content/uploads/2026/04/091923_Deliverability-Pt3_Blog-Header.png)

It’s not uncommon to see bot traffic targeting email sign-up forms. Many times, these bots aren’t even specifically targeting your site, they just happen to come across an unsecured form and start working their magic by submitting mass sign-ups. Once bot email addresses get on your list, there’s no quick fix to get them removed—they can use common email domains like gmail.com or yahoo.com, so it’s crucial to prevent them from getting on the list in the first place.

### How do Bots Affect Sender Reputation?

While it might seem like no big deal to have bad email addresses sign up, these can cause deliverability problems that can be detrimental to your sending reputation. Some of the possible issues you can run into include invalid addresses or hard bounces, increased complaints, a rise in spam traps, or even a decrease in overall engagement.

All of these examples can cause deliverability issues as they all have varying levels of negative indicators for your reputation. Some of these indicators include hard and soft bounces, spam traps, lower opens and clicks, etc. Once mailbox providers start seeing too many of these negative indicators, you can expect to experience a range of challenges from increased spam folder placement all the way to getting a SpamHaus listing causing massive blocking from multiple providers. In fact, SpamHaus even mentions that a lack of bot prevention is considered a negative indicator for sites or senders.

### How Can You Spot Sign-Ups From a Bot?

The first tip off is usually you’ll see a large influx of new sign ups in a short period of time. If you see this, you’ll want to start digging into the new sign ups to see if you can determine their legitimacy.

Sometimes, you can manually spot the addresses—like a string of nonsensical letters and numbers that’s longer than most people would normally use. Other times, you can usually see patterns in the sign ups, like a large number of sign ups coming from the same country, IP address, or using the same information in sign up fields.

However, when you have thousands of addresses, it would be a painstaking effort to review them all manually, and you still can’t be sure they’re not the result of a bot attack. This is why prevention is key.

### Bot Prevention Best Practices

Adding any of the following techniques will help cut down the number of bad addresses you attract to your lists. What’s better is if you can implement a number of these concurrently. Bots do get “smarter” by adapting to some of the techniques used to root them out, so adding additional layers of protection isn’t a bad idea to stay ahead of the game.

*   **Double/Confirmed Opt-In** – This is when a user signs up and then your brand sends a confirmation email to the subscriber asking them to click a link to confirm their selection. Only after they confirm the subscriber is added to the list. Because this process requires a confirmation step, many bad addresses do not get added as a result.
*   **ReCAPTCHA** – We’ve all run into this one. It presents some sort of image/text/numbers that must be identified and submitted, which can usually only be completed by humans. Because of the wavy text or blurry images, it helps obfuscate the details enough that a computer/bot would have a harder time completing.
*   **Hidden Sign Up/Honey Pot Fields** – This one is not as noticeable from the subscriber’s standpoint, which I guess is the point, right? This method entails adding some hidden fields in the form that one would only see on the source code of the page. As many bots use the source code of pages, they won’t know this is a hidden field and will populate it with information. As a result, any entry that has information in this hidden field will be considered a bot and can be purged.
*   **Adding a Test Question or Simple Math Problem to the Sign Up Form** – Because bots are used to using predefined fields like Name, Email Address, etc. They have a hard time adapting to dynamic fields like this. These types of fields would cause a bot to fail or get the answer wrong because it can’t do the “thinking” required to complete it successfully.
*   **Third-Party Validation** – Third-party services can do email validation in real time when users sign up to ensure the email addresses are valid. Based on the settings you can choose to reject failed addresses which prevents those users from getting added to your list. We partner with both Everest and Kickbox for list validation services.

### How do I Get Rid of Bots Already in My List?

If you’ve been attacked, you’re going to need to do some investigating to see if you’re able to identify the bad addresses. As previously mentioned, you can review the sign ups for commonalities like IP address, country origin, sign up date/time frame affected, or other details you may have captured. Usually, using a combination of these, you should be able to identify a large portion of the bad addresses and remove them.

You can also try using a list validation company, like our partners Everest and Kickbox, which may be able to clean up some of the bad addresses or bad domains. However, keep in mind that none of these companies can clean 100% of your lists all the time so it’s not a magic pill, but they might be able to clean out another chunk of them if you’re having trouble identifying these addresses based on the information you do have.

Finally, once you’ve been able to hopefully clean up a good portion of the list using the above methods, the remaining addresses can be resolved using standard engagement segmentation. Unfortunately, this will be the slowest method but this should allow the bad addresses to fall off over time as you focus on subscribers that open, click or otherwise engage with your email. If you aren’t currently using engagement-based segmentation (based on opens, clicks, purchases, website visits, etc,) it would be a good idea to start doing this.

### Bye Bye Bots

As you can see, removing bots from your list can cost you a fair amount of time and effort but it can be done methodically. Not to mention, you don’t get to plan for when it might happen. This is why it’s important to implement some practices discussed above to prevent them from getting on your list in the first place. While it might take a little more effort initially, the time saved once it happens will be well worth it.

_Looking to learn more about deliverability? Connect with Iterable’s Professional Services team or, if you’re not yet an Iterable customer, schedule a custom demo today._

Want to take your deliverability to the next level? Download _**Email Deliverability 101: How to Reach the Inbox Every Time**_—your complete guide to building trust, boosting engagement, and ensuring your messages land where they belong.