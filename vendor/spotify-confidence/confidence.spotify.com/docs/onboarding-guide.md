> ## Documentation Index
> Fetch the complete documentation index at: https://confidence.spotify.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Onboarding Guide

> This page outlines the most efficient way to onboard your team or organization to Confidence. Use it to configure your organization's initial setup and integration with Confidence.

## Preconfigured Resources

To help with onboarding, Confidence comes with the following already created for you:

* `User` and `Visitor` entities to cover the most common types of experiments
* A `tutorial-feature` flag to use in quickstarts
* A client to use when resolving flags

You can add more and change as needed later.

## Review Admin Roles

Only the user that created the Confidence account has the `Admin` role by
default. When configuring your organization's initial setup, you should
assign more than one user with the `Admin` role.

Give more users the `Admin` role:

<Steps>
  <Step title="Go to Admin > Policies" />

  <Step title="Click Create Policy" />

  <Step title="Select users and give them the role Admin" />

  <Step title="Click Create" />
</Steps>

## Configure Your Integration

The first team members onboarding to Confidence are often responsible for
configuring the initial setup. This involves some basic configurations and a
first integration end-to-end. Through these initial steps, other team members
can onboard to Confidence more efficiently.

<Note>
  The goals for the first team members onboarding to Confidence are:

  * Complete the initial setup so that your organization has the basics in place
  * Understand the experimentation process end-to-end by integrating Confidence in
    a mock app or in production
  * Prepare your organization for more team members to efficiently onboard
</Note>

As one of the first ones to onboard, you should:

1. Review entities available for experimentation and optionally add new
2. Decide if you want to start testing Confidence in a mock app or in production
3. Create a feature flag to allow confidence to remotely control a part of your product
4. Create some basic metrics for your first experiments
5. Configure a warehouse for use by Confidence

### Review Entities

Entities represent the objects you want to run experiments and create metrics
on. By default, Confidence includes `User` and `Visitor`. If you want to
experiment on and create metrics for other entities, like `Session` or
`Organization`, create them now. Read more about entities in the
[entities reference](/docs/metrics/entities).

### Test In a Mock App or In Production

To get familiar with the experimentation process end-to-end, you can either
start integrating Confidence in a mock app or directly in production. Working
with a mock app can help you get familiar without affecting production. On the
other hand, integrating directly in production can allow you to see real
results and impact.

Most users start with the **production approach**.

Follow the quick starts below. As you run through the quick starts, consider:

* Testing as if you are a new user to the platform with the goal of understanding
  how to use Confidence
* Sharing your initial feedback and ideas for improvements with the rest of the
  team, so they can onboard more efficiently
* Gathering questions that arise during the onboarding process and then
  create a FAQ for your team

<CardGroup cols={3}>
  <Card title="Configure a Flag" href="/docs/quickstarts/configure-flag">
    Set up your first feature flag
  </Card>

  <Card title="Configure a Metric" href="/docs/quickstarts/configure-metric">
    Create your first metric
  </Card>

  <Card title="Launch a Rollout" href="/docs/quickstarts/launch-rollout">
    Gradually release a feature
  </Card>

  <Card title="Launch an A/B Test" href="/docs/quickstarts/launch-abtest">
    Run your first experiment
  </Card>

  <Card title="Analyze Past Experiments" href="/docs/quickstarts/analyze-past-experiment">
    Import historical data
  </Card>
</CardGroup>

### Configure a Warehouse

To use Confidence, you need to configure a warehouse. For information about how
to set up your warehouse, refer to the guides below.

<CardGroup cols={2}>
  <Card title="BigQuery Setup" href="/docs/warehouse-setup/bigquery">
    Configure BigQuery for Confidence
  </Card>

  <Card title="Snowflake Setup" href="/docs/warehouse-setup/snowflake">
    Configure Snowflake for Confidence
  </Card>

  <Card title="Redshift Setup" href="/docs/warehouse-setup/redshift">
    Configure Redshift for Confidence
  </Card>

  <Card title="Databricks Setup" href="/docs/warehouse-setup/databricks">
    Configure Databricks for Confidence
  </Card>
</CardGroup>

## Enable More Team Members to Onboard

When you finish the onboarding guide and have the basics in place, you can
invite more team members to Confidence. Read about [inviting users](/docs/iam/users) and assigning users to different [roles](/docs/iam/roles)
using [policies](/docs/iam/policies). Next, you can consider sharing the onboarding checklist
below with your team to help them onboard efficiently.

## Onboarding Checklist for Team Members

After the first team members have completed the initial setup and integration,
other team members can use this checklist to onboard to Confidence.

<Steps>
  <Step title="Complete the Configure a Flag quickstart">
    Go through the [Configure a Flag quickstart](/docs/quickstarts/configure-flag) to understand how to create and use feature flags.
  </Step>

  <Step title="Complete the Configure a Metric quickstart">
    Go through the [Configure a Metric quickstart](/docs/quickstarts/configure-metric) to understand how to create metrics.
  </Step>

  <Step title="Complete the Launch a Rollout quickstart">
    Go through the [Launch a Rollout quickstart](/docs/quickstarts/launch-rollout) to understand how to launch a rollout.
  </Step>

  <Step title="Complete the Launch an A/B Test quickstart">
    Go through the [Launch an A/B Test quickstart](/docs/quickstarts/launch-abtest) to understand how to launch an A/B test.
  </Step>

  <Step title="Review internal docs">
    Review any internal docs your organization has created about using Confidence.
  </Step>

  <Step title="Reach out with questions">
    Reach out to your team's Confidence champions with any questions.
  </Step>
</Steps>
