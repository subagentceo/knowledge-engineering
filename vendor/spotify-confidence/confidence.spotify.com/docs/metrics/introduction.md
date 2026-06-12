> ## Documentation Index
> Fetch the complete documentation index at: https://confidence-auth-testing.mintlify.io/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction to Metrics

> Confidence Metrics is a managed service that computes metrics for experiments. Use Confidence Metrics integrated with your data warehouse if you are a Warehouse-Native Confidence user, or, base your metrics on events that you track and emit directly to Confidence with the Confidence SDKs if you are a Total Confidence user.

## Get Started

To use Confidence you need to have a cloud data warehouse and give permissions
to Confidence to read and write data to the warehouse. You can limit access so
Confidence only has access to the data it needs.

Follow one of the quickstart guides to set up Confidence with your data
warehouse:

<div className="grid grid-cols-3 gap-3 not-prose">
  <CardLink href="/docs/data-warehouse-native/quickstart/bigquery">
    Google BigQuery
  </CardLink>

  <CardLink href="/docs/data-warehouse-native/quickstart/snowflake">
    Snowflake
  </CardLink>

  <CardLink href="/docs/data-warehouse-native/quickstart/redshift">
    Redshift
  </CardLink>

  <CardLink href="/docs/data-warehouse-native/quickstart/databricks">
    Databricks
  </CardLink>
</div>

After you have connected Confidence with your data warehouse, follow the
metrics quickstart guide to create a metric.

<div className="not-prose">
  <Button variant="filled" arrow="right" href="./quickstart">Quickstart Guide</Button>
</div>

## What is a Metric?

In Confidence, a metric is a way to measure the behavior of a user, a system or
something else of interest. Use metrics to verify the success of an
experiment, and to decide if a change has had a positive or negative impact
on the exposed audience.

<div className="not-prose mb-10">
  <Button variant="outline" arrow="right" href="../metrics">
    Read more about metrics
  </Button>
</div>

The key concepts for defining a metric are:

<ConceptCard title="Entity" href="/docs/metrics/entities">
  The unit that you want to measure, such as a user. [Entities](/docs/metrics/entities) are
  identified by a unique ID, like a user ID.
</ConceptCard>

<ConceptCard title="Assignment Table" href="../assignment-tables">
  A query that returns data about how entities were assigned to experiments and
  variants. Confidence uses assignments to compute exposure for an experiment.
</ConceptCard>

<ConceptCard title="Fact Table" href="../fact-tables">
  A query that returns data
  about "facts" or measurements of interest, such as sales revenue, quantity
  sold, number of customer orders, or any other measurable data points.
</ConceptCard>

## How Confidence Computes Metrics

<img src="https://mintcdn.com/confidence-auth-testing/YnQm99fG-Zh7IGxq/images/avg-metric.png?fit=max&auto=format&n=YnQm99fG-Zh7IGxq&q=85&s=38d1f545fd71353cf45ad23b5b9e324c" alt="metric processing" width="1400" height="507" data-path="images/avg-metric.png" />

To compute a metric, Confidence goes through the following steps:

<Steps>
  <Step title="Exposure">
    Exposure aggregates assignment data. The assignment data can have multiple
    records of when a user was assigned to a variant. When computing exposure, Confidence
    identifies the first time a user was assigned to a variant and uses that as the
    exposure record. **First exposure** is the timestamp for when the user was first exposed,
    which metric calculations use to get the right facts.

    <div className="not-prose mb-8">
      <Button variant="text" arrow="right" href="../assignment-tables">
        Read about assignment tables
      </Button>
    </div>
  </Step>

  <Step title="Per-Entity Aggregation">
    For metrics that are measuring an average across entities, metrics compute a
    per-entity aggregation as a first step. This aggregation step reduces multiple facts per
    entity into a single value.
    You select the aggregation function (for example the sum, count, or average) in the metric
    definition.

    <div className="not-prose mb-8">
      <Button variant="text" arrow="right" href="../fact-tables">
        Read about fact tables
      </Button>
    </div>
  </Step>

  <Step title="Metric Result">
    The metric calculation joins the per-entity measurements, or facts for metrics that do not require
    a per-entity aggregation, with exposure.
    After the join, the calculation averages the per-entity measurements per variant.
    The first exposure timestamp selects the correct per-entity measurement, taking into account the
    exposure offset parameter of the metric.

    <div className="not-prose mb-8">
      <Button variant="text" arrow="right" href="../metrics#metric-parameters">
        Read about metric configuration
      </Button>
    </div>
  </Step>
</Steps>

To improve performance, Confidence caches the data by writing the intermediate steps, such as the
exposure tables, to your data warehouse.

## Related Resources

<CardGroup cols={2}>
  <Card title="Configure a Metric" href="/docs/quickstarts/configure-metric">
    Step-by-step metric setup tutorial
  </Card>

  <Card title="Create Metrics" href="/docs/how-to-guides/create-metric">
    Metric creation guide
  </Card>

  <Card title="Metrics Reference" href="/docs/metrics/metrics">
    Deep dive into metric types
  </Card>

  <Card title="Fact Tables" href="/docs/metrics/fact-tables">
    Configure measurement data sources
  </Card>
</CardGroup>
