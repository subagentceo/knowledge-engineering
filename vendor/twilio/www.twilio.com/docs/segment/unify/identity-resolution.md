# Identity Resolution Overview

* FREE: x
* TEAM: x
* BUSINESS: ✓
* ADDON: ✓

Unify requires a Business tier account and is included with Engage.

See the [available plans](https://segment.com/pricing), or [contact Support](https://segment.com/help/contact/)

## Identity Graph

Identity Resolution sits at the core of Segment. The Identity Graph merges the complete history of each customer into a single profile, no matter where they interact with your business. Identity Resolution allows you to understand a user's interaction across web, mobile, server, and third-party partner touch-points in real time, using an online and offline ID graph with support for cookie IDs, device IDs, emails, and custom external IDs. If you are sending the [Group call](/docs/segment/connections/spec/group), you can also understand user behavior at the account-level.

![An example of how the Identity Graph consolidates mobile, in-store, and website data into a single user profile.](https://docs-resources.prod.twilio.com/e198f30215b73e10a99a6727d172b10fbc241268833c1dd17ca08249ff155825.png)

## Highlights

1. **Supports existing data** — no additional code or set up required.
2. **Supports all channels** — stitches web + mobile + server + third party interactions into the same user.
3. **Supports anonymous identity stitching** — by merging child sessions into parent sessions.
4. **Supports user:account relationships** - for B2B companies, generates a graph of relationships between users and accounts.
5. **Real-time performance** - reliable real-time data stream merges with minimal latency.

## Technical highlights

1. **Supports custom external IDs** - bring your own external IDs.
2. **Customizable ID Rules** — allows you to enforce uniqueness on select external IDs and customize which external IDs and sources cause associations.
3. **Merge Protection** - automatically detects and solves identity issues, like non-unique anonymous IDs and the library problem using the priority trust algorithm.
4. **Maintains persistent ID** - multiple external IDs get matched to one persistent ID.

## Identifier case insensitivity

Segment's Identity Resolution treats all identifiers, including `userId`, `anonymousId`, and `groupId`, as case insensitive.

When Segment receives identifiers with different casing (for example, `User_123` and `user_123`), it resolves them to the same profile. When an identifier is first received, Segment stores and uses that original casing as the canonical representation within the profile. Subsequent events with the same identifier in different casings match to the same identity.

> \[!NOTE]
>
> While Segment merges case variants into one profile, the Profile explorer may display multiple casing variants as separate entries.

## FAQs

#### Can I use the Profile API on the client-side?

For security reasons, Segment requires that the [Profile API](/docs/segment/unify/profile-api/) only be used server-side. The Profile API allows you to look up data about any user given an identifier (for example, `email`, `anonymousId`, or `userId`) and an authorized access secret. While this enables powerful personalization workflows, it could also let your customers' data fall into the wrong hands if the access secret were exposed on the client.

Instead, by creating an authenticated personalization endpoint server-side backed by the Profile API, you can serve up personalized data to your users without the risk of their information falling into the wrong hands.
