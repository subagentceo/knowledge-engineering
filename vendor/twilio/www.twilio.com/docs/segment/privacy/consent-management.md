# Consent Management Overview

* FREE: x
* TEAM: x
* BUSINESS: ✓
* ADDON: x

Consent Management is available to customers on Business tier plans.

See the [available plans](https://segment.com/pricing), or [contact Support](https://segment.com/help/contact/)

When an end user visits your web or mobile app, they set **consent preferences**, or make decisions about the types of data they want you to collect, use, and share. These consent preferences are typically presented as a set list of categories that describe how your company intends to use that data. Some common categories include personalization, advertising, and site performance.

> \[!NOTE]
>
> Segment doesn't recommend using Consent Management for managing communication opt-ins and opt-outs, as using it for this purpose might limit your ability to handle user preferences at a more granular level. For more information, see [Why shouldn't I use Consent Management for managing communication preferences?](/docs/segment/privacy/consent-management/consent-faq/#why-shouldnt-i-use-consent-management-for-managing-communication-preferences).
>
> To manage your end users' communication preferences, Segment recommends using [custom traits](/docs/segment/unify/traits/custom-traits/) and then acting on these traits in [Twilio Engage](/docs/segment/engage/) or a third-party tool.

Segment integrates with your commercial third-party or bespoke consent management platform (CMP) that captures an end user's consent preferences and enforces those preferences by only routing events to the categories consented to by an end user.

![Flowchart of user consent from collection to API and Segment destinations.](https://docs-resources.prod.twilio.com/a28feb56b065f65772eca9381081f2abeb29516a5c405750d94e412f7a2948f3.png)

After a user sets their consent preferences on your web or mobile app, Segment requires you to add the [consent object](/docs/segment/privacy/consent-management/consent-in-segment-connections/#consent-object) to all events. If you are using OneTrust, Segment provides a wrapper for your web and mobile libraries that can add the consent object to your events. If you are using another CMP, you are required to add the consent object to your events by either creating your own wrapper or using another mechanism. For more information, see the [Configure Consent Management documentation](/docs/segment/privacy/consent-management/configure-consent-management/#step-2-integrating-your-cmp-with-segment).

The events, stamped with the consent object, are then sent downstream to any destinations in categories that an end user consented to share data with.

> \[!NOTE]
>
> Segment collects consent for both registered users and anonymous users.

For more information about consent in Segment Connections, see the [Consent in Segment Connections](/docs/segment/privacy/consent-management/consent-in-segment-connections) documentation.

If you're a Unify user, you can also see [Consent in Unify](/docs/segment/privacy/consent-management/consent-in-unify) for more information about the Segment Consent Preference Updated event, which Segment uses to add consent preference to the Profile.

Twilio Engage users can learn more about creating Audiences that respect end-user consent preferences in the [Consent in Twilio Engage](/docs/segment/privacy/consent-management/consent-in-engage) documentation.
