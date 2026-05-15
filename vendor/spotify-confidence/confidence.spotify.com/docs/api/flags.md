> ## Documentation Index
> Fetch the complete documentation index at: https://confidence.spotify.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Flag Concepts

> Understand the key concepts in Confidence Flags.

This section explains the core concepts in Confidence Flags. These primitives work together to enable Confidence to flexibly support a broad range of applications where you need to remotely change an experience or behavior of your app.

## Flags

A `Flag` is a mechanism to remotely configure different parts of an application. The configuration can either be deterministic such that, for example, all employees see a blue button and everyone else sees a red button. It can also be random such as if users are randomly assigned a blue or red button.

## Variants

A `Variant` is a named configuration. For example, you could have a variant called `big red button` that configures a button to be big and red. You can have as many variants as you want, but a user (or service) can only resolve one variant at a time for a given flag.

```js Example variant value theme={null}
{
  "color": "red",
  "size": 12
}
```

The value of a variant is a JSON object that conforms to a `Schema`. The schema describes the structure of the value. It ensures that the value is valid and that it conforms to the expectations of the application.

```js Example schema theme={null}
{
  "schema": {
    "color": {
      "stringSchema": {}
    },
    "size": {
      "intSchema": {}
    }
  }
}
```

## Segments

A `Segment` is a mechanism to define a subpopulation of users. For example, you could have a segment that represents 10% of users from Sweden. A set of `Criteria` determines what users are in a segment. A `Criteria` is a mechanism to define a property of a user. For example, you could have a criteria that says that a user is an employee if they have the `employee` attribute set to `true`.

Segments have two key parts:

* **Targeting**: A set of criteria that filter users based on attributes
* **Allocation**: What percentage (0% to 100%) of the targeted users should be in the segment

Segments can be mutually exclusive or overlapping. For example, you could have a segment that represents users from Sweden, and another segment that represents users from the United States. These two segments are mutually exclusive, meaning that no user can be in both segments. You could also have a segment that represents 10% of users from Sweden and another segment that represents 10% of users from Sweden that are also employees. These two segments are overlapping, meaning that some users can be in both segments. With coordination and exclusivity tags it's possible to create exclusive segments that would naturally be overlapping.

## Targeting Criteria

Targeting criteria allow you to filter users based on attributes in the evaluation context. You define named criteria and compose them into expressions using logical operators.

Targeting has two parts:

* **Criteria**: Named conditions that define individual filters
* **Expression**: Logical composition of criteria using operators

### Attribute Criteria

Attribute criteria match a value in the evaluation context against a specified value using an operator. You can use different value types (Boolean, Number, String, Timestamp, Version) and matching operators (equality, set, range).

You can reference nested fields using dot notation (for example, `device.model` to access `{device: {model: "iPhone14"}}`).

### Segment Criteria

Segment criteria check if a user is part of another segment, allowing for composing sophisticated targeting logic by combining multiple segments.

## Randomization and Allocation

Confidence randomizes users based on a field in the evaluation context (defaults to `targeting_key`). The randomization is:

* **Consistent**: The same user always gets the same allocation
* **Distributed**: On average, Confidence allocates the specified percentage of users to the segment

If the randomization field is missing or `null` in the evaluation context, the segment doesn't match.

## Coordination

Coordination makes segments mutually exclusive, ensuring users can only be in one experiment at a time. This uses two sets of tags on each segment:

* **Exclusivity tags**: Incoming tags that identify what this segment is (for example, `ranking-experiment`, `checkout-flow`)
* **Exclusive to tags**: Outgoing tags that specify which other segments to exclude from

Two segments are mutually exclusive if there's an overlap between one segment's exclusivity tags and another segment's exclusive-to tags.

For example:

* Segment A has `exclusivityTags: ["ranking"]` and `exclusiveTo: ["ranking"]`
* Segment B has `exclusivityTags: ["ranking"]` and `exclusiveTo: ["ranking"]`
* These segments are exclusive because A's exclusivity tags overlap with B's exclusive-to tags (and vice versa)

When allocating a segment with coordination tags, Confidence verifies there's enough available space. The allocation fails if:

* Too many coordinating segments already exist
* The combined allocations exceed 100%
* There's insufficient space for the requested proportion

If allocation fails, you must reduce the proportion, archive other segments, or adjust coordination tags.

## Rules

A `Rule` combines a segment (who is eligible) with variant assignments (what they receive). Rules are the mechanism that determines which variant a user gets.

Rules evaluate in priority order, with lower priority numbers evaluated first. The first rule that matches determines the variant. Newly created rules start disabled—you must explicitly enable them.

## Evaluation Context

The evaluation context is how clients give contextual data for rule evaluation. It's a schema-less key-value map (JSON object) containing any data needed for targeting, such as:

* User IDs or identifiers
* User attributes (country, device, browser, etc.)
* Session or environment information

Example:

```json theme={null}
{
  "user_id": "rosling",
  "country": "SE",
  "device": {
    "vendor": "apple",
    "os": "ios"
  }
}
```

## Variant Assignment

When a rule matches, Confidence assigns a variant using bucket-based randomization. This ensures consistent, stable assignments while distributing users across variants.

Here's how it works:

1. **Hash computation**: Computes a hash of the field value specified by `targetingKeySelector` (defaults to `targeting_key`) from the evaluation context
2. **Bucket calculation**: Normalizes the hash to a bucket number: `hash % bucketCount`
3. **Variant selection**: Assigns the variant whose bucket range includes the calculated bucket number

The `targetingKeySelector` specifies which field from the evaluation context to use for randomization. Common patterns include using `targeting_key` for general user identification, `user_id` for user-level randomization, `device_id` for device-level randomization, or `session_id` for session-level randomization.

If the specified field is missing or `null`, the rule doesn't match. The empty string `""` is a valid value.

## Resolve a Flag

Resolving a flag is the process of determining which variant a user should see for a given flag. The application passes in an evaluation context that has information about the user and other information that you can use to decide if a user should be eligible. If no rule matches the user, the application normally falls back to a default variant.

The rules evaluate in order. The rule used is the first rule that matches the user. This means that you can have a rule that says that all employees should see the `big red button` variant, and a rule that says that 50% of users should see the `big red button` variant and 50% should see the `small blue button` variant. In this case, all employees would see the `big red button` variant, and the other 50% would be randomly assigned a variant.

A rule can "fall through." This means that the rule matches, but instead of assigning a variant to the user, the user is assigned a variant from one of the following rules.

## Apply a Flag

When you resolve a flag and use the value in your application, the flag is **applied**. You must report this back to Confidence using the apply operation. Confidence then writes "flag applied" events to your data warehouse via a configured connector.

Apply events matter because they:

* **Track exposure**: Compute who was exposed to which variants and how many times
* **Enable analysis**: Enable accurate A/B test and experiment analysis
* **Measure adoption**: Track how often features are actually used
* **Aid debugging**: Help debug flag behavior and targeting issues

Apply a flag when:

* The user sees a UI element controlled by the flag
* The application executes code controlled by the flag
* A backend service makes a decision based on the flag value

Do NOT apply a flag when:

* You resolved it but didn't use the value
* You cached the value but haven't displayed it yet
* A conditional check prevented you from using the flag

## Flag Clients

A flag client represents a single application that uses flags. The flag client authenticates with Confidence using a shared secret. You have to authenticate flags with a flag client before they are available for use by that client.

## Archive

When flags and segments are no longer needed, archive them instead of deleting. Archiving preserves resources for historical reference and analysis while removing them from active use.

Confidence uses archiving instead of deletion to:

* Keep historical data for analysis
* Keep references in experiment results
* Prevent breaking changes to existing integrations
* Keep audit trails intact
* Allow potential restoration (contact support)

When you archive a flag, resolve requests return the user-specified default value and you can't use the flag in new experiments. When you archive a segment, it enters the `ARCHIVED` state and you can't use it in new rules, but existing rules using the segment continue to work.
