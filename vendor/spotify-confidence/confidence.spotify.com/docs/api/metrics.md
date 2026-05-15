> ## Documentation Index
> Fetch the complete documentation index at: https://confidence.spotify.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Metrics Concepts

> Understand the key concepts in Confidence Metrics.

This section overviews Confidence Metrics key concepts, and should give you a broad understanding of which building blocks exists, and what they can do.

The metric subsystem centers around a `Metric`, which is a description of how to compute a metric. A metric is an aggregation over measurements performed on an `Entity`. The entity is typically a user but can also be something a user interacts with, like an ad. A `ScheduledMetricCalculation` performs the actual computation of the metrics by tying together the entity measurements from a `FactTable` with exposures from an `ExposureTable`. Confidence calculates exposures from a `AssignmentTable` that either Confidence Flags, the customer or some third party system provides. A `ScheduledExposureCalculation` computes exposure by periodically creating a job that takes the assignments and summarizes them into a first exposure for each entity. The rest of this section goes through each key concept in more detail, but still on a high level.

## Key Concepts

### Data Warehouse

The `Data Warehouse` is where you store your data and run your queries. Confidence connects to your data warehouse to run queries, but all the data is in your data warehouse. Confidence supports integration with BigQuery, Databricks, Snowflake and Redshift.

### Entity

An `Entity` is an abstract term for some part of your business that can be uniquely identified, measured and experimented on. The canonical example is a user, but it can also be something your customers interact with, like an ad. In Confidence, both measurements and assignments relate to an entity.

### Tables

Tables describe the structure of the data in your data warehouse so that Confidence can understand it. Three important tables in Confidence are: `AssignmentTable`, `ExposureTable` and `FactTable`.

The `AssignmentTable` points to a table in your data warehouse that stores information on when and which variant was assigned to one of your entities. Either Confidence Flags, your internal feature flagging, or some third party service provides this table. The only requirement is that you map out its columns in the `AssignmentTable`.

The `ExposureTable` points to a table that is an aggregation over the assignments table. It takes the assignments for each entity and determines the point of time of the first assignment of each variant. The time of the first assignment is called first exposure. In Confidence, the `ExposureTable` belongs to a single experiment, meaning that it filters out the assignments from the `AssignmentTable` that originates from the experiment before it aggregates them.

The `FactTable` represents a collection of measurements of an entity involved in some business process. It points to a table in your data warehouse that has the events relating to that business process. It could, for example, be the sales amount and checkout time of each user that placed an order on an ecommerce site. To define a fact table, you need the 1) the timestamp when the event occurred, 2) the entities involved in the event, and 3) a measurement of those entities.

### Metrics

A `Metric` is a description of how to aggregate a measurement across entities. In essence, it consists of a type, an aggregation and a time window. Two types of metrics exist in Confidence: *average* and *ratio* metrics. The average metric takes average of a measurement across entities, and a ratio separately aggregates a numerator and denominator and divides them. The metric aggregation determines how to aggregate values within an entity, typically, an entity has more than one event associated with them in the fact table. Finally, the time window specifies when to measure the metric relative to exposure. For example, sum all sales that occurred during the second week since first exposure. The metric is also computed on a set of dimensions like date, variant group and one or more dimensions of the entity itself.

### Schedules

The metric itself doesn't perform any calculation. A metric is only an abstract representation of how to compute it. A schedule defines from which data source and at what frequency to calculate a metric. Two schedules exist in Confidence: `ScheduledExposureCalculation` to calculate first exposures, and `ScheduledMetricCalculation` to calculate metrics. These schedules operate at a given, possibly variable, rate, and trigger `MetricCalculation`s and `ExposureCalculation`s that represent the calculation of the metric or exposure table within a specific time window.
