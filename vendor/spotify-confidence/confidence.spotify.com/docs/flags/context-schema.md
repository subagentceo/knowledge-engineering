> ## Documentation Index
> Fetch the complete documentation index at: https://confidence.spotify.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Context Schema

You find the context schema under **Admin > Clients** and the **Context Schema** tab.

A context schema lets you map a field in the evaluation context of a feature
flag to name and a data type. Context schemas let Confidence know
what can exist in the evaluation context before Confidence has detected it. Confidence automatically
keeps track of fields you include in your evaluation context and uses them to
populate relevant options in the app. For example, when you define your target audience.

Confidence by default maps the field `visitor_id`
to the entity Visitor as this is an identifier the Confidence flag SDKs automatically emit.
This means that when you create a rollout
targeting the entity Visitor, Confidence randomizes treatment assignment
based on the `visitor_id` value in the evaluation context
of the feature flag.

## Mark Fields as Non-PII

You can mark context fields as not containing personally identifiable information.
When you mark a field as non-PII, Confidence samples the values
that your application sends for that field. This helps you in two ways:

* **Discover field values**: See what values your application sends for a field.
* **Easier targeting**: Get autocomplete suggestions when you create targeting rules.

<Warning>
  Only mark fields as non-PII if they truly don't contain personally identifiable information.
  Confidence samples and displays these values to help with targeting, so you must ensure
  the field doesn't contain sensitive data like email addresses, phone numbers, or user IDs.
</Warning>

### How Confidence Samples Values

Confidence collects sample values from flag resolution requests for fields marked as non-PII.
Confidence only samples values when it detects that a field has low cardinality, which means
the field has a limited set of distinct values. For example, fields like `country`, `platform`,
or `subscription_tier` are good candidates.

To protect user privacy, Confidence only includes a value in the samples if many users send
that same value. If only a few users send a specific value, Confidence doesn't sample it because
the value might be specific to those users and could reveal identifying information.

The sampled values appear as autocomplete suggestions when you create targeting rules.
For example, if you mark the `country` field as non-PII, you see
a list of countries that your application has sent, making it easier to create
targeting rules.

### Mark a Field as Non-PII

<Steps>
  <Step title="Go to Confidence">
    Navigate to [Confidence](https://app.confidence.spotify.com).
  </Step>

  <Step title="Open Clients settings">
    On the left sidebar, select **Admin** and click **Clients**.
  </Step>

  <Step title="Select the client">
    Select the client you want to update.
  </Step>

  <Step title="Go to Context Schema">
    Go to the **Context Schema** tab.
  </Step>

  <Step title="Find the field">
    Find the field you want to mark as non-PII.
  </Step>

  <Step title="Mark as Non-PII">
    Select the checkbox in the **Non-PII** column for that field.
  </Step>
</Steps>

Confidence starts sampling values for this field during flag resolution.

## Related Resources

<CardGroup cols={2}>
  <Card title="Define Audience Criteria" href="/docs/how-to-guides/define-audience-criteria">
    Use context fields for targeting
  </Card>

  <Card title="Rules Reference" href="/docs/flags/define-rules">
    Understand how rules use context
  </Card>

  <Card title="Test Flag Resolution" href="/docs/how-to-guides/test-flag-resolution">
    Test context-based resolution
  </Card>

  <Card title="Entities Reference" href="/docs/metrics/entities">
    Map context fields to entities
  </Card>
</CardGroup>
