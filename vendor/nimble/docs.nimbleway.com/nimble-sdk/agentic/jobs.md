> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Jobs

> Run any Web Search Agent on a schedule or on demand — at scale, hands-off.

Nimble **Jobs** turn any Web Search Agent into a managed, repeatable workload. Point a job at an agent, hand it a list of inputs (CSV, Parquet, or JSON), pick a schedule — and Nimble runs the agent across every input on cadence, tracks every execution, and delivers structured results to you.

Jobs are the right tool when you need to run an agent across **thousands or millions of inputs**, on a recurring basis, without writing orchestration code. Think daily price refreshes across your full SKU catalog, hourly SERP monitoring across thousands of keywords, or weekly competitor sweeps across every product page you care about.

<CardGroup cols={2}>
  <Card title="Open Jobs" icon="play" href="https://online.nimbleway.com/jobs">
    Create your first job in Nimble Platform — no coding required
  </Card>

  <Card title="Browse Agents" icon="robot" href="https://online.staging.nimbleway.com/agent-gallery">
    Pick a pre-built agent or bring your own custom agent
  </Card>
</CardGroup>

## Quick Start

<Steps>
  <Step title="Open Jobs">
    Go to [online.nimbleway.com/jobs](https://online.nimbleway.com/jobs) and click **Create Job**.
  </Step>

  <Step title="Pick an agent">
    Choose any pre-built agent (e.g., `amazon_pdp`, `google_search`, `chatgpt`) or one of your custom agents.
  </Step>

  <Step title="Provide inputs">
    Upload a CSV/Parquet file or paste a JSON array of inputs — one entry per agent run.
  </Step>

  <Step title="Set the schedule">
    Choose **Manual Trigger Only** for on-demand runs, or **Schedule** to run every day, week, month, at a specific time, or on a custom cron expression.
  </Step>

  <Step title="Run and collect results">
    Trigger the first run manually or wait for the schedule. Download structured results as JSON, CSV, or Parquet from the run page.
  </Step>
</Steps>

## How it works

<Steps>
  <Step title="You define the job once">
    A job binds together an **agent**, an **input set**, a **destination**, and a **trigger** (manual or scheduled). Once created, a job is a stable, named workload you can run again and again with the same configuration.
  </Step>

  <Step title="Nimble fans out runs across your inputs">
    Each execution of a job is a **run**. A run reads every row from your input set and dispatches one agent invocation per row in parallel. Nimble handles concurrency, retries, anti-bot handling, and result aggregation — you don't manage workers, queues, or rate limits.
  </Step>

  <Step title="Results land in a single, structured artifact">
    When the run completes, Nimble assembles the per-row results into a single downloadable file (JSON, CSV, or Parquet) and surfaces success rate, completeness, and error samples in the run page.
  </Step>

  <Step title="The schedule keeps it fresh">
    For scheduled jobs, Nimble triggers a new run on every tick of the cadence. Each run is independent — same configuration, fresh data — so monitoring dashboards, downstream pipelines, and time-series comparisons stay current without any manual work.
  </Step>
</Steps>

## Creating a Job

The **Create Job** panel has five sections. Only Job Title, Agent, and Inputs are required — everything else has sensible defaults.

### Job Title

A human-readable name for the job. This is what you'll see in the jobs list, in run logs, and in delivered file names. Pick something descriptive — e.g., `daily-amazon-top-1000-skus` or `hourly-google-serp-priority-keywords`.

### Agent

Select the Web Search Agent that the job will run. Any agent available in your workspace can be used:

* **Pre-built agents** from the [Agent Gallery](/nimble-sdk/agentic/agent-gallery) (e.g., `amazon_pdp`, `google_search`, `chatgpt`, `tiktok_account`).
* **Custom agents** you've built in [Nimble Studio](https://online.nimbleway.com/workflow-builder).

A job runs exactly one agent. To run multiple agents over the same input set, create one job per agent.

### Inputs

The input set defines **what the agent runs against**. Each entry in the input set becomes one agent invocation in every run. Jobs support four input modes:

<ParamField path="File" type="upload">
  Upload a **CSV** or **Parquet** file. Each row is one agent invocation; column names must match the agent's input parameters (e.g., a column `asin` for `amazon_pdp`, or `keyword` for `amazon_serp`).

  Use **Download example CSV** in the Create Job panel to get a template pre-filled with the correct columns for the selected agent.
</ParamField>

<ParamField path="JSON Text" type="textarea">
  Paste a JSON array of input objects directly. Each object's keys must match the agent's input parameters. Best for quick tests or smaller, ad-hoc input sets.

  ```json theme={"system"}
  [
    { "asin": "B08N5WRWNW" },
    { "asin": "B0DLKFK6LR" },
    { "asin": "B09XS7JWHH" }
  ]
  ```
</ParamField>

<ParamField path="S3 Bucket" type="s3">
  Point the job at a CSV, JSON, or Parquet file in your S3 bucket so the input set is read at run time. The path can also point to a folder - the latest file under that prefix (by `LastModified`) is used.

  Supported extensions: `.csv`, `.json`, `.parquet`.

  Grant Nimble access to the bucket via a bucket policy. See [Jobs cloud delivery](/nimble-sdk/admin/callbacks-and-delivery#option-4-jobs-cloud-delivery) for the policy template and how to apply it. Use **Test Connection** in the Job form to verify the policy.
</ParamField>

<ParamField path="Databricks" type="delta sharing">
  Read the input set directly from a table in your **Databricks Unity Catalog** via Delta Sharing. Each Job run reads the latest contents of the shared table.

  Fields: `Provider`, `Share`, `Schema`, `Table`. Set them after publishing a Delta Sharing share whose recipient is bound to Nimble's metastore (`aws:us-east-1:2f3ba1b1-429c-491f-b37d-ebb46f22f3e9`).

  See [Jobs Databricks Delta Sharing → Input](/nimble-sdk/admin/callbacks-and-delivery#input-share-your-table-with-nimble) for the full `databricks` CLI sequence and every property.
</ParamField>

<ParamField path="Generate with AI" type="coming soon">
  Describe the input set in natural language and have Nimble generate it for you (e.g., *"the top 500 best-selling kitchen appliances on Amazon"*). Coming soon.
</ParamField>

<Tip>
  Input rows can also include the [shared params](/nimble-sdk/agentic/agents#parameters) accepted by every agent — `country`, `locale`, `tag`, `parse` — to control localization or tag rows for downstream filtering.
</Tip>

### Destination

Where Nimble delivers the assembled results when each run completes.

<ParamField path="Download files" type="default">
  Results are stored on Nimble and downloadable from the run page. Each completed run produces a single file containing every successful agent result for that run.
</ParamField>

<ParamField path="S3 Bucket" type="s3">
  Push results directly to your own S3 bucket as soon as a run completes. Choose any output format (JSON, CSV, or Parquet).

  Grant Nimble write access via the same bucket policy used for inputs. See [S3 bucket permissions](/nimble-sdk/admin/callbacks-and-delivery#option-4-jobs-cloud-delivery). Use **Test Connection** in the Job form to verify the policy before saving the job.
</ParamField>

<ParamField path="Databricks" type="delta sharing">
  Deliver results straight into your **Databricks Unity Catalog** as a Delta Sharing share. Each Job run refreshes the shared table; you mount it once as a UC catalog and query it like any other UC table.

  Fields: `Share name`, `Recipient name`, `Metastore ID` (your UC global metastore ID, in `<cloud>:<region>:<uuid>` form), `Shared as` (the `<schema>.<table>` alias visible on your side).

  **Retention: 14 days** from each successful run - beyond that window, the shared table is not guaranteed to remain available. To keep the data longer, materialize it into a UC table you own (see [Persisting the data](/nimble-sdk/admin/callbacks-and-delivery#persisting-the-data)).

  See [Jobs Databricks Delta Sharing → Destination](/nimble-sdk/admin/callbacks-and-delivery#destination-deliver-job-output-to-your-unity-catalog) for how to find your metastore ID and the `databricks` CLI sequence to mount the share.
</ParamField>

<ParamField path="Format" default="JSON" type="enum">
  Output format for the delivered file:

  * `JSON` — one JSON document per run, with all rows under a `files` array. Best for nested or unstructured agent outputs.
  * `CSV` — flat tabular output, one row per agent invocation. Best for spreadsheets and BI tools.
  * `Parquet` — columnar binary format. Best for analytical workloads, data lakes, and any pipeline where you'd otherwise convert CSV to Parquet later.
</ParamField>

<ParamField path="Include input" default="false" type="boolean">
  When enabled, each output row also includes the original input fields (e.g., the `asin` you submitted) alongside the parsed agent result. Makes it trivial to join results back to the input set without relying on row order.
</ParamField>

### Run On

Controls **when** the job executes.

<ParamField path="Manual Trigger Only" type="default">
  The job only runs when you click **Run** on the job page (or call the API). Use this for on-demand workloads where there's no fixed cadence — ad-hoc backfills, one-off competitor sweeps, or runs gated on an upstream event.
</ParamField>

<ParamField path="Schedule" type="cadence">
  Run the job automatically on a recurring cadence. Five preset modes are supported:

  | Cadence                | Description                                                                                                                                                   |
  | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `Day`                  | Once every 24 hours, anchored to the job's creation time.                                                                                                     |
  | `Week`                 | Once every 7 days, anchored to the job's creation time.                                                                                                       |
  | `Month`                | Once every calendar month, anchored to the job's creation date.                                                                                               |
  | `Day at specific time` | Once a day at a chosen time of day (HH:MM, UTC).                                                                                                              |
  | `Custom`               | A standard 5-field cron expression (UTC). e.g. `0 0 * * *` for daily at midnight UTC, `0 */6 * * *` for every 6 hours, `0 9 * * 1` for every Monday at 09:00. |

  Manually triggered runs are still allowed on scheduled jobs — pressing **Run** kicks off an extra run without affecting the schedule.
</ParamField>

## The Jobs list

The [Jobs page](https://online.nimbleway.com/jobs) shows every job in your workspace with its agent, last run timestamp, and trigger type (Manual or scheduled). Use the search box to filter by job name; the list paginates server-side, so it stays responsive even with thousands of jobs.

Click any job in the list to open its detail page.

## Monitoring runs

Every job has its own detail page with two tabs.

### Runs tab

A reverse-chronological list of every execution of the job. Each row shows:

| Column                    | Description                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------- |
| `Run ID`                  | Unique identifier for the run (e.g., `run_1204402`). Click to open the run detail page. |
| `Status`                  | `Success`, `In progress`, or `Error`.                                                   |
| `Start Time` / `End Time` | Wall-clock start and end of the run.                                                    |
| `Success Rate`            | Percentage of input rows that produced a successful agent result.                       |
| `Actions`                 | Direct download of the run's result file.                                               |

### Monitoring tab

Aggregate health and volume of the job over time:

* **Total Runs** — number of runs executed since the job was created.
* **Availability** — percentage of scheduled runs that completed (didn't fail to start).
* **Success Rate** — percentage of input rows that produced a successful agent result, averaged across runs.
* **Completeness** — percentage of expected output fields that were populated, averaged across rows. A useful proxy for "is the agent still healthy on this site".
* **Total Rows** — cumulative number of agent invocations executed across all runs.
* **Volume Overview** — bar chart of rows per run over the recent history.

<Tip>
  Use **Completeness** as your early-warning signal. Success rate can stay at 100% even when a target site quietly stops returning a particular field — completeness will drop first.
</Tip>

### Run detail

Clicking a Run ID opens a single run's detail page, which includes:

* **Status, # Inputs, # Results, Start Time, End Time, Job, Agent** — quick metadata in the side panel.
* **Results Sample** — preview of the parsed output, plus a direct download link for the full result file.
* **Inputs Sample** — the exact input set the run executed against (useful for reproducing or debugging a specific run).
* **Errors Sample** — preview of any rows that failed, with their error reasons. Used to diagnose problems without scrolling through the full result file.

The format toggle at the top of each sample (JSON / CSV / Parquet) lets you preview the same data in any of the three supported formats.

## Header actions

From any job's detail page, three header actions control the job:

* **Run** — manually trigger a run right now. Works on both manual and scheduled jobs.
* **Edit** — open the job configuration in the same panel used to create it. Editing does not affect runs already in progress; the next run picks up the new configuration.
* **Delete** — permanently remove the job and its run history. Cannot be undone.

## Use cases

<CardGroup cols={2}>
  <Card title="Daily price & inventory refresh" icon="tag">
    Run `amazon_pdp` or `walmart_pdp` every night across your full SKU catalog. Use Parquet output and an [S3 destination](/nimble-sdk/admin/callbacks-and-delivery#option-4-jobs-cloud-delivery) to land directly in your data lake.
  </Card>

  <Card title="SERP rank tracking" icon="magnifying-glass">
    Run `google_search` hourly across your priority keywords. Track rank movement over time using the run-by-run history.
  </Card>

  <Card title="LLM answer monitoring" icon="message-bot">
    Run `chatgpt`, `perplexity`, or `gemini` daily on prompts that mention your brand or category. Watch how AI platforms describe you over time.
  </Card>

  <Card title="Competitor catalog sweeps" icon="binoculars">
    Run a custom agent weekly across every competitor product page. Use **Completeness** to catch the day a competitor changes their page structure.
  </Card>
</CardGroup>

## Jobs vs other tools

| What you need                                                    | Use                                                                                                                                                               |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Run an agent **once**, on a single input                         | [Agent.run](/nimble-sdk/agentic/agents#quick-start)                                                                                                               |
| Run an agent on **a few thousand inputs**, one-time              | [Agent batch](/nimble-sdk/agentic/agents#batch)                                                                                                                   |
| Run an agent on **any size input set**, on a recurring schedule  | **Jobs**                                                                                                                                                          |
| Get notified or have results land in cloud storage automatically | Jobs with [S3 destination](/nimble-sdk/admin/callbacks-and-delivery#option-4-jobs-cloud-delivery) or [Async + callback](/nimble-sdk/admin/callbacks-and-delivery) |

Jobs are designed for **recurring, large-scale, hands-off** work. If you're calling an agent ad-hoc from your own code, the synchronous and batch APIs stay the right tool.

## Next steps

<CardGroup cols={2}>
  <Card title="Open Jobs" icon="play" href="https://online.nimbleway.com/jobs">
    Create your first job in Nimble Platform
  </Card>

  <Card title="Agent Gallery" icon="grid" href="/nimble-sdk/agentic/agent-gallery">
    Browse pre-built agents to power your jobs
  </Card>

  <Card title="Build a Custom Agent" icon="hammer" href="/guides/build-first-agent-tutorial">
    Create an agent for any website, then run it as a job
  </Card>

  <Card title="Callbacks & Delivery" icon="bell" href="/nimble-sdk/admin/callbacks-and-delivery">
    Configure result delivery, webhooks, and storage
  </Card>
</CardGroup>
