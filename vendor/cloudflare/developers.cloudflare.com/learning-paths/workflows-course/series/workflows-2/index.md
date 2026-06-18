---
title: Monitor and batch your website data
description: Workflows can be used to process batches of data, ensuring each item in the batch goes through a defined process with reliable execution. This section demonstrates processing a batch of puns using the Punderful application as an example.

image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Monitor and batch your website data

* [ Watch this episode ](#tab-panel-9301)
* [ Step-by-step tutorial ](#tab-panel-9302)
* [ Series overview ](#tab-panel-9303)

Workflows can be used to process batches of data, ensuring each item in the batch goes through a defined process with reliable execution. This section demonstrates processing a batch of puns using the Punderful application as an example.

**Related content**

If you want to dive into detail, refer to the following pages:

* [Source code for the Punderful repository ↗](https://github.com/craigsdennis/punderful-workflows)
* [Cloudflare Workflows](https://developers.cloudflare.com/workflows/)
* [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)

The Punderful application processes user-submitted puns by performing content moderation, creating embeddings, categorizing, and adding them to a vector store. This process is defined as a Workflow. To process a batch of existing puns (from an open-source dataset called OPun), a batch endpoint is created that iterates through the puns and triggers the defined Workflow for each one.

#### Batch Processing Code

The following code snippet shows the endpoint responsible for batch processing:

[See here ↗](https://github.com/craigsdennis/punderful-workflows/tree/main/src/index.tsx#L291)

This code:

1. Fetches the list of puns from a JSON file (`puns.json`).
2. Logs the number of puns being processed.
3. Sets a user ID for tracking.
4. Loops through each pun.
5. Performs basic text cleaning on the pun.
6. Inserts the pun into the database (handled by `insertPun`).
7. Triggers the `PUBLISH` Workflow for each individual pun using `c.env.PUBLISH.create()`. The Workflow is given a unique ID using `crypto.randomUUID()`.

### Monitoring Workflow Instances via CLI

The Cloudflare Wrangler CLI provides commands to monitor and manage Workflows and their instances.

To list the available workflows associated with your account:

Terminal window

```

npx wrangler workflows list


```

To list the instances of a specific workflow (for example, the `publish` workflow):

Terminal window

```

npx wrangler workflows instances list publish


```

This command will show a list of workflow instances, their status (Queued, Running, Completed, Errored), and timestamps.

To view the details of a specific workflow instance, including its steps and their status, duration, and output:

Terminal window

```

npx wrangler workflows instances describe publish <instance-id>


```

Replace `<instance-id>` with the actual ID of a running or completed instance from the `list` command output.

#### Example CLI Output (Describe Instance)

Describing a workflow instance provides a detailed breakdown of its execution:

```

Workflow Name: publish

Instance ID: oPun-batch-aea07d75-95fa-448f-9573-6e435388eff7

Version ID: 75665fce-24a1-4c83-a561-088aabc91e5f

Status: Completed

Trigger: API

Queued: 10/24/2024, 1:43:45 AM

Success: Yes

Start: 10/24/2024, 1:43:45 AM

End: 10/24/2024, 1:43:49 AM

Duration: 4 seconds

Last Successful Step: update-status-to-published-1

Steps:


Name: content-moderation-1

Type: Step

Start: 10/24/2024, 1:43:45 AM

End: 10/24/2024, 1:43:45 AM

Duration: 0 seconds

Success: Yes

Output: "true"

Config: {"retries":{"limit":5,"delay":1000,"backoff":"exponential"},"timeout":"10 minutes"}

Attempts:

  Status: Completed

  Start Time: Oct 23, 2024 6:44:57 PM

  End Time: Oct 23, 2024 6:44:57 PM

  Wall Time: 180 ms

... (additional steps like create-pun-embedding-1, categorize-pun-1, add-embeddings-to-vector-store-1, update-status-to-published-1)


```

This output shows the status, start/end times, duration, success status, and even the output and configuration for each step within the workflow instance.

### Monitoring Workflow Instances via Cloudflare Dashboard

You can also monitor Workflows and their instances directly in the Cloudflare Dashboard.

This dashboard view provides a user-friendly way to observe the progress of your batch jobs, identify failed instances, and inspect the execution details of each step.

[ Watch Episode 1: Understand Cloudflare Workflows ](https://developers.cloudflare.com/learning-paths/workflows-course/series/workflows-1/) In this episode, we introduce Cloudflare Workflows, which provides durable execution capabilities, allowing developers to create reliable, repeatable workflows that run in the background. 

[ Watch Episode 2: Monitor and batch your website data ](https://developers.cloudflare.com/learning-paths/workflows-course/series/workflows-2/) In this episode, we describe how Workflows can be used to process batches of data, ensuring each item in the batch goes through a defined process with reliable execution. 

[ Watch Episode 3: Use cron triggers to develop time-aware applications ](https://developers.cloudflare.com/learning-paths/workflows-course/series/workflows-3/) In this episode, we review Workflows ability to explicitly schedule tasks using cron triggers and pause execution with \`step.sleep\` allows developers to build sophisticated, time-aware applications. 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/workflows-course/series/workflows-2/#page","headline":"Monitor and batch your website data · Cloudflare Learning Paths","description":"Workflows can be used to process batches of data, ensuring each item in the batch goes through a defined process with reliable execution. This section demonstrates processing a batch of puns using the Punderful application as an example.","url":"https://developers.cloudflare.com/learning-paths/workflows-course/series/workflows-2/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/workflows-course/series/","name":"Overview"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/workflows-course/series/workflows-2/","name":"Monitor and batch your website data"}}]}
```
