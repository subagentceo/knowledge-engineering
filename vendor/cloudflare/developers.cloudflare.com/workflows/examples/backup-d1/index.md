---
title: Export and save D1 database
description: Send invoice when shopping cart is checked out and paid for
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Export and save D1 database

**Last reviewed:**  over 1 year ago 

Export a D1 database into R2 storage with Workflows

In this example, we implement a Workflow that runs on a schedule using the `schedules` field on the Workflow binding. That Workflow initiates a backup for a D1 database using the REST API, and then stores the SQL dump in an [R2](https://developers.cloudflare.com/r2) bucket.

When the Workflow is triggered, it fetches the REST API to initiate an export job for a specific database. Then it fetches the same endpoint to check if the backup job is ready and the SQL dump is available to download.

As shown in this example, Workflows handles both the responses and failures, thereby removing the burden from the developer. Workflows retries the following steps:

* API calls until it gets a successful response
* Fetching the backup from the URL provided
* Saving the file to [R2](https://developers.cloudflare.com/r2)

The Workflow can run until the backup file is ready, handling all of the possible conditions until it is completed.

This example provides simplified steps for backing up a [D1](https://developers.cloudflare.com/d1) database to help you understand the possibilities of Workflows. In every step, it uses the [default](https://developers.cloudflare.com/workflows/build/sleeping-and-retrying) sleeping and retrying configuration. In a real-world scenario, more steps and additional logic would likely be needed.

TypeScript

```

import {

  WorkflowEntrypoint,

  WorkflowStep,

  WorkflowEvent,

} from "cloudflare:workers";


// We are using R2 to store the D1 backup

type Env = {

  BACKUP_WORKFLOW: Workflow;

  D1_REST_API_TOKEN: string;

  BACKUP_BUCKET: R2Bucket;

  ACCOUNT_ID: string;

  DATABASE_ID: string;

};


// Workflow logic

export class backupWorkflow extends WorkflowEntrypoint<Env> {

  async run(_event: WorkflowEvent<unknown>, step: WorkflowStep) {

    const accountId = this.env.ACCOUNT_ID;

    const databaseId = this.env.DATABASE_ID;


    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/export`;

    const method = "POST";

    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    headers.append("Authorization", `Bearer ${this.env.D1_REST_API_TOKEN}`);


    const bookmark = await step.do(

      `Starting backup for ${databaseId}`,

      async () => {

        const payload = { output_format: "polling" };


        const res = await fetch(url, {

          method,

          headers,

          body: JSON.stringify(payload),

        });

        const { result } = (await res.json()) as any;


        // If we don't get `at_bookmark` we throw to retry the step

        if (!result?.at_bookmark) throw new Error("Missing `at_bookmark`");


        return result.at_bookmark;

      },

    );


    await step.do("Check backup status and store it on R2", async () => {

      const payload = { current_bookmark: bookmark };


      const res = await fetch(url, {

        method,

        headers,

        body: JSON.stringify(payload),

      });

      const { result } = (await res.json()) as any;


      // The endpoint sends `signed_url` when the backup is ready to download.

      // If we don't get `signed_url` we throw to retry the step.

      if (!result?.signed_url) throw new Error("Missing `signed_url`");


      const dumpResponse = await fetch(result.signed_url);

      if (!dumpResponse.ok) throw new Error("Failed to fetch dump file");


      // Finally, stream the file directly to R2

      await this.env.BACKUP_BUCKET.put(result.filename, dumpResponse.body);

    });

  }

}


export default {

  async fetch(req: Request, env: Env): Promise<Response> {

    return new Response("Not found", { status: 404 });

  },

};


```

Here is a minimal package.json:

```

{

  "devDependencies": {

    "wrangler": "^3.99.0"

  }

}


```

Create `D1_REST_API_TOKEN` as a [secret](https://developers.cloudflare.com/workers/configuration/secrets/) with permission to export the target D1 database.

Here is a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-13059)
* [  wrangler.toml ](#tab-panel-13060)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "backup-d1",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": [

    "nodejs_compat"

  ],

  "vars": {

    "ACCOUNT_ID": "account-id",

    "DATABASE_ID": "database-id"

  },

  "workflows": [

    {

      "name": "backup-workflow",

      "binding": "BACKUP_WORKFLOW",

      "class_name": "backupWorkflow",

      "schedules": ["0 0 * * *"]

    }

  ],

  "r2_buckets": [

    {

      "binding": "BACKUP_BUCKET",

      "bucket_name": "d1-backups"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "backup-d1"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = [ "nodejs_compat" ]


[vars]

ACCOUNT_ID = "account-id"

DATABASE_ID = "database-id"


[[workflows]]

name = "backup-workflow"

binding = "BACKUP_WORKFLOW"

class_name = "backupWorkflow"

schedules = [ "0 0 * * *" ]


[[r2_buckets]]

binding = "BACKUP_BUCKET"

bucket_name = "d1-backups"


```

Each scheduled run creates a new Workflow instance automatically.

Scheduled instances include the matching cron expression and scheduled trigger time on `event.schedule`.

Use the latest Wrangler release when configuring Workflow schedules. If your local Wrangler schema does not recognize `schedules` yet, update Wrangler before deploying.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/examples/backup-d1/#page","headline":"Export and save D1 database · Cloudflare Workflows docs","description":"Send invoice when shopping cart is checked out and paid for","url":"https://developers.cloudflare.com/workflows/examples/backup-d1/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-02","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TypeScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/examples/backup-d1/","name":"Export and save D1 database"}}]}
```
