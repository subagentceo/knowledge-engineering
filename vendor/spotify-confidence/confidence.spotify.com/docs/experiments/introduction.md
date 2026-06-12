> ## Documentation Index
> Fetch the complete documentation index at: https://confidence-auth-testing.mintlify.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction to Experiments

> Confidence is a platform for running experiments. Experiments are a way to test new ideas and measure their impact on your business. Confidence comes with multiple built-in experiment types, and you can also create your own custom experiment designs using the API.

<div className="not-prose mb-3">
  <Button variant="filled" arrow="right" href="./abtests/quickstart">
    A/B test quickstart
  </Button>
</div>

In Confidence, experiment types define common patterns used for
experimentation. Confidence supports three built-in experiment types:

<ConceptCard title="A/B test" href="../abtests">
  Experiments with one or more treatment groups, typically used in the product
  development phase where you test ideas. Can use both success and guardrail
  metrics to evaluate if new ideas are successful. A/B tests have a fixed
  allocation that you can't change.
</ConceptCard>

<ConceptCard title="Analysis" href="../analysis-workflows">
  Experiments that rely on feature flagging from a third party. With an analysis,
  you can leverage the metrics and analysis capabilities of Confidence
  together with feature flagging from a Provider other than Confidence. You can
  also re-analyze experiments that you ran in the past.
</ConceptCard>

<ConceptCard title="Rollout" href="../rollouts">
  Experiments with only a single treatment group,
  where the purpose is to gradually roll out a new variant. Rollouts have an
  adjustable level of reach to make the experience of rolling out fully flexible.
  Rollouts only use guardrails.
</ConceptCard>

## Related Resources

<CardGroup cols={2}>
  <Card title="Launch an A/B Test" href="/docs/quickstarts/launch-abtest">
    Step-by-step A/B test tutorial
  </Card>

  <Card title="Launch a Rollout" href="/docs/quickstarts/launch-rollout">
    Step-by-step rollout tutorial
  </Card>

  <Card title="Statistical Tests" href="/docs/experiments/stats/stat-tests">
    Learn about the statistics behind experiments
  </Card>
</CardGroup>
