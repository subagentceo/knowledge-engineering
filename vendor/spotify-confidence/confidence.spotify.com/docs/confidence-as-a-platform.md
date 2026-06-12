> ## Documentation Index
> Fetch the complete documentation index at: https://confidence-auth-testing.mintlify.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Confidence as a Platform (APIs)

> Use Confidence as a true platform and build what you need on top of it.

At the foundational level, Confidence provides a set of independent APIs for
performing experimentation-related tasks. These APIs are modular and extensible,
allowing you to build your own experimentation platform on top of Confidence.

<img src="https://mintcdn.com/confidence-auth-testing/YnQm99fG-Zh7IGxq/images/overview.png?fit=max&auto=format&n=YnQm99fG-Zh7IGxq&q=85&s=a83c1f2ae381a1ac6aa37a1c662ea912" alt="Overview" width="1400" height="837" data-path="images/overview.png" />

The main APIs are:

* **Flags**: Control experiences using feature flags.
* **Events**: Collect data from your users and store it in a data warehouse.
* **Metrics**: Define and compute metrics.
* **Stats**: Perform statistical testing and analysis.
* **Workflows**: Implement workflows to orchestrate experimentation designs.

## Highlights of the Confidence APIs

* **Extensible**: Confidence is by design extensible. You can build your
  own experimentation platform on top of Confidence by using the APIs. Leverage
  the parts of Confidence that makes sense for you, and build the rest yourself.

* **Warehouse-centric**: Confidence doesn't store any of your users data. Instead
  it connects to your data warehouse to write events or compute metrics for
  analysis. This allows you to use your existing data infrastructure and tools
  for experimentation, and minimizes the risk for data breaches.

* **Usage-based pricing**: You only pay for what you use. The price you pay depends on what
  features you use and how much you consume. You can start small and scale up as
  your experimentation program grows, without having to worry about upfront
  costs.

* **Built for scale**: Confidence supports large-scale experimentation
  programs, helping you with coordination and planning of experiments across teams
  and products. Use it with hundreds of teams to run thousands of experiments.

## Learn More

Read more about the independent APIs that allow you to integrate Confidence with your existing tooling and infrastructure:

<Cards>
  <Card href="/docs/api/flags" title="Flags" description="Feature flagging" />

  <Card href="/docs/api/stats" title="Stats" description="Spotify's statistics engine" />

  <Card href="/docs/api/metrics" title="Metrics" description="Metrics engine" />

  <Card href="/docs/experiments/workflows/abtests" title="Workflows" description="Experiment orchestration" />
</Cards>

You can follow the [API quickstart](../docs/api/quickstart) tutorial to learn how to
make your first API call. Read more about how the APIs work in the [API basics](../docs/api/api-basics)
section.
