> ## Documentation Index
> Fetch the complete documentation index at: https://confidence.spotify.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Resolver Test

Test and build intuition for the resolving of rules on a flag by providing an
evaluation context and resolving it against a client.

Go to **Flags** and select the flag you want to test. In the **Rules** section, click the test button (beaker icon) to open the Resolver test page.

Select a client and credentials, then click **Add evaluation context** to provide the context you want to test. Toggle between key-value editing and JSON input using the buttons above the context fields.

The resolver test returns a detailed response explaining which rules match and which don't, together with the reasons why.

## Common Reasons Rules Fail

The most common reasons for a rule not returning a variant are:

* The rule is not enabled
* The evaluation context lacks a field used in the inclusion criteria of the rule
* The evaluation context has a value on a field that doesn't match the criterion on that field in the rule
* The rule is not considered because it has a lower priority than another rule that matches the evaluation context
* The entity value provided in the evaluation context used for random sampling of units might be outside of the sample for the rule due to chance

## Related Resources

<CardGroup cols={2}>
  <Card title="Test Flag Resolution" href="/docs/how-to-guides/test-flag-resolution">
    Step-by-step testing guide
  </Card>

  <Card title="Rules Reference" href="/docs/flags/define-rules">
    Understand rule types and evaluation
  </Card>

  <Card title="Context Schema" href="/docs/flags/context-schema">
    Configure evaluation context attributes
  </Card>
</CardGroup>
