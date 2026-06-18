---
title: Use cron triggers to develop time-aware applications
description: Cloudflare Workflows provide a powerful way to manage asynchronous, durable processes. The ability to explicitly schedule tasks using scheduled handlers and pause execution with `step.sleep` allows developers to build sophisticated, time-aware applications.

image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use cron triggers to develop time-aware applications

* [ Watch this episode ](#tab-panel-9306)
* [ Step-by-step tutorial ](#tab-panel-9307)
* [ Series overview ](#tab-panel-9308)

Cloudflare Workflows provide a powerful way to manage asynchronous, durable processes. The ability to explicitly schedule tasks using scheduled handlers and pause execution with `step.sleep` allows developers to build sophisticated, time-aware applications.

**Related content**

If you want to dive into detail, refer to the following pages:

* [Source code for the Punderful repository ↗](https://github.com/craigsdennis/punderful-workflows)
* [Cloudflare Workflows](https://developers.cloudflare.com/workflows/)
* [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)

Workflows allow you to kick off asynchronous processes without blocking the user. This is demonstrated in the `addInteraction` function, which creates a new instance of the `INTERACTION` workflow.

Locate the `addInteraction` function in `src/index.tsx`:

[See here ↗](https://github.com/craigsdennis/punderful-workflows/blob/main/src/index.tsx#L237)

This function is called when a user interacts with a pun (for example, likes it). Instead of performing the interaction logic directly, it offloads the work to a workflow.

Examine the `InteractionWorkflow` definition in `src/workflows/interaction.ts`. This workflow performs tasks like checking if the user/session exists and recording the interaction in the database.

[See here ↗](https://github.com/craigsdennis/punderful-workflows/blob/main/src/workflows/interaction.ts)

### Leaderboard Code

A common use case for background processes is crunching data and caching results, such as building a leaderboard.

Examine the `LeaderboardWorkflow` in `src/workflows/leaderboard.ts`. This workflow performs a database query to find trending puns and then stores the results in Cloudflare KV (Key-Value Store).

[See here ↗](https://github.com/craigsdennis/punderful-workflows/blob/main/src/workflows/leaderboard.ts)

This workflow can be scheduled to run periodically to update the leaderboard data.

### Wrangler Configuration

The Wrangler configuration file is used to configure your Worker and Workflows. This includes defining bindings to resources like KV namespaces and setting up schedules for workflows.

The episode repository uses the older pattern of a top-level `[triggers]` section plus a `scheduled` handler in the main Worker to create a `LEADERBOARD_WORKFLOW` instance on a timer.

[See here ↗](https://github.com/craigsdennis/punderful-workflows/blob/main/wrangler.toml#L68)

In current Workflows projects, you can usually schedule the Workflow directly on its binding instead:

* [  wrangler.jsonc ](#tab-panel-9304)
* [  wrangler.toml ](#tab-panel-9305)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "workflows": [

    {

      "name": "leaderboard-workflow",

      "binding": "LEADERBOARD_WORKFLOW",

      "class_name": "LeaderboardWorkflow",

      "schedules": [

        "*/30 * * * *"

      ]

    }

  ]

}


```

TOML

```

[[workflows]]

name = "leaderboard-workflow"

binding = "LEADERBOARD_WORKFLOW"

class_name = "LeaderboardWorkflow"

schedules = ["*/30 * * * *"]


```

Use a separate Cron Trigger and `scheduled` handler only when you need custom logic before deciding whether to create a Workflow instance. Use the latest Wrangler release when configuring Workflow schedules.

### Puntificator: Using AI to Develop More Puns Automatically

Workflows can also be used for more complex, multi-step processes, including interacting with AI models. The `PuntificatorWorkflow` is an example that leverages AI to generate and evaluate new puns.

Examine the `PuntificatorWorkflow` definition in `src/workflows/puntificator.ts`.

[See here ↗](https://github.com/craigsdennis/punderful-workflows/blob/main/src/workflows/puntificator.ts)

This workflow includes steps to:

1. Retrieve trending puns.
2. Create a new pun based on trends using an AI model.
3. Judge the quality of the created pun using another AI model.
4. Save the pun if it meets a certain rating threshold.

Crucially, this workflow includes a `step.sleep` call:

[See here ↗](https://github.com/craigsdennis/punderful-workflows/blob/main/src/workflows/puntificator.ts#L135)

This step pauses the workflow execution for a specified duration. This is useful for waiting to consider user feedback on a published pun before potentially taking further action based on its popularity.

### Nested Workflows

Workflows can initiate other workflows, allowing you to compose complex processes from smaller, modular units.

In the `PuntificatorWorkflow`, find where it calls the `PUBLISH` workflow.

[See here ↗](https://github.com/craigsdennis/punderful-workflows/blob/main/src/workflows/puntificator.ts#L115)

This demonstrates how one workflow can trigger another, enabling the separation of concerns and modular design.

Examine the `PublishWorkflow` in `src/workflows/publish.ts`.

[See here ↗](https://github.com/craigsdennis/punderful-workflows/blob/main/src/workflows/publish.ts)

This workflow handles the logic for publishing a pun, likely involving saving it to the database and making it visible on the site.

### Workflow Instances

You can trigger workflows manually and inspect their execution status and output using the `wrangler` command-line tool.

To trigger the `PuntificatorWorkflow` manually:

Terminal window

```

npx wrangler workflows trigger puntificator


```

This command will queue an instance of the workflow. You will receive a success message and the instance ID.

To describe the latest instance of a workflow:

Terminal window

```

npx wrangler workflows instances describe puntificator latest


```

This command will show details about the most recent run of the specified workflow, including its start time, end time, duration, state, and the state of each individual step within the workflow. You can observe steps like `create-new-pun-based-on-trends`, `judge-pun`, `save-pun`, `publish`, and `wait-for-publish` (which shows a 'Sleeping' state).

[ Watch Episode 1: Understand Cloudflare Workflows ](https://developers.cloudflare.com/learning-paths/workflows-course/series/workflows-1/) In this episode, we introduce Cloudflare Workflows, which provides durable execution capabilities, allowing developers to create reliable, repeatable workflows that run in the background. 

[ Watch Episode 2: Monitor and batch your website data ](https://developers.cloudflare.com/learning-paths/workflows-course/series/workflows-2/) In this episode, we describe how Workflows can be used to process batches of data, ensuring each item in the batch goes through a defined process with reliable execution. 

[ Watch Episode 3: Use cron triggers to develop time-aware applications ](https://developers.cloudflare.com/learning-paths/workflows-course/series/workflows-3/) In this episode, we review Workflows ability to explicitly schedule tasks using cron triggers and pause execution with \`step.sleep\` allows developers to build sophisticated, time-aware applications. 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/workflows-course/series/workflows-3/#page","headline":"Use cron triggers to develop time-aware applications · Cloudflare Learning Paths","description":"Cloudflare Workflows provide a powerful way to manage asynchronous, durable processes. The ability to explicitly schedule tasks using scheduled handlers and pause execution with step.sleep allows developers to build sophisticated, time-aware applications.","url":"https://developers.cloudflare.com/learning-paths/workflows-course/series/workflows-3/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-06-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/workflows-course/series/","name":"Overview"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/workflows-course/series/workflows-3/","name":"Use cron triggers to develop time-aware applications"}}]}
```
