# Running Large Backend Migrations Safely - Iterable

## Running Large Backend Migrations Safely

**Published by**

March 3, 2026

![](https://iterable.com/wp-content/uploads/2026/04/Purple-13.png)

When you run a customer engagement platform at scale, some changes are like renovating a room. Others are like swapping out an airplane engine while you’re still flying.

This was the latter.

Recently, our engineering team migrated a core piece of infrastructure that powers Journeys—Iterable’s automated, multi-step customer engagement flows. These are the welcome sequences, cart abandonment campaigns, and post-purchase follow-ups our customers rely on every day.

The challenge? We needed to fundamentally change how we store and access journey visitor data while maintaining—or improving—performance, durability, and correctness.

Here’s how we did it.

### First, Some Context

A quick glossary to ground this in the context of Iterable’s platform:

*   **Journey**: An automated, multi-step customer engagement flow—think welcome sequences, cart abandonment campaigns, or post-purchase follow-ups.
*   **Tiles**: The building blocks for journeys, each one representing different actions (sending messages, waiting for delays, filtering users based on conditions, or calling webhooks).
*   **User**: A person in a brand’s audience whose profile and contact information are stored in Iterable. Brands on Iterable are typically B2C companies.
*   **Visitor**: A single instance of a user progressing through a journey.

By default, a journey can have only one visitor. However, one user can have multiple concurrent visitors in the same journey. For example, if someone makes three purchases in quick succession, they may enter the purchase confirmation journey three separate times—creating three concurrent “visitors.”

That distinction matters because we track it all.

### The Architectural Gap

Until recently, we used a sharded relational database to track users and their journey visitors. In a sharded database, data is split across multiple database instances (called shards) so that no single instance has to handle all the load. Each shard is responsible for a subset of the data. You can think of sharding like dividing a large library across multiple buildings. Each building holds part of the collection, which helps with scale but adds complexity.

Relational databases are excellent at many things, but they’re not optimized for a very high volume of random-access reads at scale.

To avoid overloading the database, we intentionally limited certain types of reads. Over time, that led to workarounds which resulted in:

*   Storage bloat & duplication: visitor data was replicated across multiple layers, resulting in inflated storage costs.
*   Excessive CPU usage: the workarounds introduced to limit direct reads added computational overhead to journey execution.
*   Increasing system complexity: each workaround added another layer that the team had to maintain.

It worked—but it wasn’t scalable long term and cost more money to run. Eventually, we reached the point every engineering team recognizes: The workarounds were costing more than fixing the root cause.

 It was time to address the architectural gap.

### The New Architecture: Journey Visitor Registry

The first step was to implement an architecture that supports a high volume of random-access reads. To address the issue, we introduced a new component: the **Journey Visitor Registry**, powered by AWS MemoryDB. This cluster stores two mappings:

*   User → Journeys
*   (User, Journey) → (Entrance Time, Visitors)

While we’ve used Redis/Valkey clusters extensively at Iterable, this was our first time deploying MemoryDB. That introduced a new category of risk: performance uncertainty. **Would it behave the way we expected under real production load?**

There was only one responsible way to find out.

### Mitigating Performance Risk: A Phased Rollout

Rather than flipping a global switch, to address the risks of unforeseen bugs and poor performance, we deployed in two waves using feature flags.

*   **Wave 1:** The first wave targeted stable, lower-ARR accounts with strong health scores and no upcoming renewals—customers whose business impact from any unexpected issue would be contained. We created a new dashboard to monitor the performance. 
*   **Wave 2:** If the first wave looked okay, we would then enable the second wave, which would include the remaining customers. 

Customer segmentation wasn’t random. We carefully excluded accounts from Wave 1 if they met risk-related criteria, such as:

*   Large ARR
*   Low health score
*   Upcoming renewal within the quarter

Via our new performance monitoring dashboard, if we found any problems after enabling it for all customers, we could still turn off writing to the new data store. This allowed us to limit potential business impact while validating performance in real-world conditions. 

After enabling Wave 1, we observed that the average write latency (the time it takes for the system to successfully record new data) was typically under **10 milliseconds** with no meaningful performance degradation. For context on just how fast that is, the blink of an eye is about 100–400 milliseconds.

With those signals, we enabled the remaining customers in Wave 2 and found that performance remained stable.

### When Things Didn’t Go as Planned

No large migration is complete without encountering an unexpected edge case. During the verification rollout, we encountered one that temporarily brought down the Journey Visitor Registry. But, because we had introduced the system behind feature flags and preserved the ability to quickly disable reads and writes, an on-call engineer was able to immediately identify the issue and disable access to the new registry. Journey processing continued normally.

Once isolated, we diagnosed and resolved the performance issue. We then re-enabled writes, allowed 2–3 days for data backfill, and resumed verification.

From a customer perspective, the impact was limited to approximately 30 minutes of degraded performance with no data loss. This was exactly the scenario the phased migration strategy was designed for: the ability to pause, recover, and resume at our own pace—without risking data integrity or widespread disruption.

### Mitigating Durability Risk: What If It Fails?

Performance is one thing. Durability is another. We configured MemoryDB with “primary” and “replica” nodes, allowing a replica node to automatically take over if a primary node failed. After writing to MemoryDB for some time, we actually did see instances where the primary node failed over to the replica node.

**But what would happen if both the primary and replica fail?** For Redis / Valkey clusters, such an event could cause catastrophic data loss. 

So we tested it deliberately.

We asked AWS to force simultaneous failure of both the primary and replica for a shard while we were writing to the Journey Visitor Registry and checking reads in the background. We saw that the failed shard came back online in minutes, and when we compared the data against what we had written during the failure window, everything was consistent—no records were lost or corrupted. This confirmed that MemoryDB’s durability guarantees held up even under a worst-case simultaneous failure scenario.

It’s one thing to assume durability. It’s one thing to simulate a disaster and another to verify it.

### Mitigating Correctness Risk: Is the Data Right?

Even if a system is fast and durable, it’s useless if it’s wrong. The final major risk category was correctness:

*   Was the Journey Visitor Registry being populated accurately?
*   Were there race conditions causing inconsistent updates?

Because every visitor must eventually exit a journey, we validated that every visitor existed in the Journey Visitor Registry before exit. To build confidence incrementally, we followed a phased comparison pattern:

1.  Enabled reading from the Journey Visitor Registry in 2 waves, comparing results against the sharded relational database 100% of the time.
2.  Enabled returning results from Journey Visitor Registry in 2 waves, still comparing results 100% of the time, so we could investigate any reported discrepancies..
3.  Scaled down comparison to just 1% of the time, reducing load on the sharded relational database while maintaining continuous verification.

This gave us a smooth path from full validation to steady-state monitoring without any significant increase in load on the old database.

### What We Learned

To run a large-scale data migration, we recommend:

*   Dual writing to the old and the new data stores to check write performance
*   Adding comparison to the new data store
*   Start returning results from the new data store
*   Retaining a fraction of continuous verification if the old data store is still around. Otherwise, disable writing to the old data store.

To further de-risk, we would take each action in at least 2 waves to reduce customer churn risk. If possible, test your assumption on your new data store as well. In our case, we asked AWS to manually bring a shard down to test recovery.

### Scaling Without Compromise

From the outside, nothing changed. Journeys continued running. Messages continued to be sent. But under the hood, we eliminated architectural constraints that were limiting our ability to scale efficiently.

The migration:

*   Reduced database strain
*   Eliminated costly workarounds
*   Improved long-term scalability
*   Validated a new datastore in production under real failure conditions

Most importantly, we did it without customer disruption. That’s the real measure of success in large backend migrations:  **Not that something changed, but that no one noticed.**