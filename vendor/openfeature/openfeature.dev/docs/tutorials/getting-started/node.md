-   [](/)
-   [Getting Started](/docs/category/getting-started)
-   JavaScript SDK and Express

On this page

# Getting Started with the OpenFeature JavaScript SDK on Express

## Introduction[​](#introduction "Direct link to Introduction")

This walk-through teaches you the basics of using OpenFeature with JavaScript using Express. You'll learn how to:

-   Install the JavaScript SDK
-   Install and configure a provider
-   Perform basic feature flagging

## Requirements[​](#requirements "Direct link to Requirements")

This walk-through assumes that:

-   You have a basic understanding of JavaScript, Node.js and Express. If not, please review the [Introduction to Node.js](https://nodejs.dev/en/learn/) and the [Express documentation](https://expressjs.com/).
-   You have Node 16 or later. The latest version of Node can be found [here](https://nodejs.org/en/download/).
-   You have Docker installed and running on the host system. The latest version of Docker can be found [here](https://docs.docker.com/engine/install/).

## Walk-through[​](#walk-through "Direct link to Walk-through")

### Step 1: Create a new Node.js project[​](#step-1-create-a-new-nodejs-project "Direct link to Step 1: Create a new Node.js project")

To get started, create a new folder, bootstrap the project, and install the dependencies. This can be done by running the following commands.

-   JavaScript
-   TypeScript

```
mkdir openfeature-js-introcd openfeature-js-intronpm init -ynpm install express
```

```
mkdir openfeature-ts-introcd openfeature-ts-intronpm init -ynpm install expressnpm i -D typescript @types/express @types/node ts-nodenpx tsc --init
```

### Step 2: Create an Express app[​](#step-2-create-an-express-app "Direct link to Step 2: Create an Express app")

-   JavaScript
-   TypeScript

Create a new file named `index.js` and include the following code.

```
const express = require('express');const app = express();const port = 8080;app.get('/', (_, res) => {  res.send('Express + TypeScript Server');});app.listen(port, () => {  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);});
```

Create a new file named `index.ts` and include the following code.

```
import express from 'express';const app = express();const port = 8080;app.get('/', (_, res) => {  res.send('Express + TypeScript Server');});app.listen(port, () => {  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);});
```

### Step 3: Add the OpenFeature SDK[​](#step-3-add-the-openfeature-sdk "Direct link to Step 3: Add the OpenFeature SDK")

Let's install the OpenFeature SDK using the following command.

```
npm install @openfeature/server-sdk
```

-   JavaScript
-   TypeScript

Update `index.js` to import the SDK.

```
const express = require('express');const { OpenFeature } = require('@openfeature/server-sdk');
```

Update `index.ts` to import the SDK.

```
import express from "express";import { OpenFeature } from "@openfeature/server-sdk";
```

Once you've imported `OpenFeature`, a new client can be created.

```
const port = 8080;const client = OpenFeature.getClient();
```

The client can now be used to get a feature flag value. In this case, we'll get a `boolean` value using the `welcome-message` [flag key](/specification/glossary#flag-key).

The second argument is the fallback value, which is returned if there's abnormal behavior.

```
app.get("/", (_, res) => {app.get("/", async (_, res) => {  const showWelcomeMessage = await client.getBooleanValue("welcome-message", false);  if (showWelcomeMessage) {    res.send("Express + TypeScript + OpenFeature Server");  } else {  res.send("Express + TypeScript Server");    res.send("Express + TypeScript Server");  }});
```

### Step 4: Run the application[​](#step-4-run-the-application "Direct link to Step 4: Run the application")

Let's start the app and see it in action. Run the following command to start the server.

-   JavaScript
-   TypeScript

```
node index.js
```

```
npx ts-node index.ts
```

Open your favorite browser and navigate to [http://localhost:8080](http://localhost:8080). If all goes as planned, you should see "Express + TypeScript Server" in glorious monochrome.

"Why I'm I seeing that value?", you may ask. Well, it's because a provider hasn't been configured yet. Without a provider to actually evaluate flags, OpenFeature will return the default value. In the next step, you'll learn how to add a provider.

> NOTE: You should stop the app by using the keyboard short `ctrl + c` before moving on to the next step.

### Step 5: Configure a provider (flagd)[​](#step-5-configure-a-provider-flagd "Direct link to Step 5: Configure a provider (flagd)")

Providers are an important concept in OpenFeature because they are responsible for the flag evaluation itself. As we saw in the previous step, OpenFeature without a provider always returns the default value. If we want to actually perform feature flagging, we'll need to register a provider.

Create a new file named `flags.flagd.json` and add the following JSON. Notice that there's a flag called `welcome-message` which matches the flag key referenced earlier. The `welcome-message` flag has `on` and `off` variants that return `true` and `false` respectively. The state property controls whether the feature flag is active or not. Finally, the defaultVariant property controls the variant that should be returned. In this case, the defaultVariant is `off`, therefore the value `false` would be returned.

```
{  "flags": {    "welcome-message": {      "variants": {        "on": true,        "off": false      },      "state": "ENABLED",      "defaultVariant": "off"    }  }}
```

> NOTE: This configuration is specific for flagd and varies across providers.

With the flagd configuration in place, start flagd service with the following docker command.

> NOTE: On Windows WSL is required both for running docker and to store the file. This is a limitation of Docker ([https://github.com/docker/for-win/issues/8479](https://github.com/docker/for-win/issues/8479))

```
docker run -p 8013:8013 -v $(pwd)/:/etc/flagd/ -it ghcr.io/open-feature/flagd:latest start --uri file:/etc/flagd/flags.flagd.json
```

Now let's make the required code changes in our application.

Using NPM, install the `flagd provider` with the following command:

```
npm install @openfeature/flagd-provider
```

-   JavaScript
-   TypeScript

Now, update `index.js` to import the `flagd provider`.

```
const { OpenFeature } = require('@openfeature/server-sdk');const { FlagdProvider } = require('@openfeature/flagd-provider');
```

Now, update `index.ts` to import the `flagd provider`.

```
import { OpenFeature } from "@openfeature/server-sdk";import { FlagdProvider } from "@openfeature/flagd-provider";
```

Finally, we need to register the provider with OpenFeature.

```
const port = 8080;OpenFeature.setProvider(new FlagdProvider());const client = OpenFeature.getClient();
```

### Step 6: Rerun the application[​](#step-6-rerun-the-application "Direct link to Step 6: Rerun the application")

Now that everything is in place, let's start the app again.

-   JavaScript
-   TypeScript

```
node index.js
```

```
npx ts-node index.ts
```

Open your favorite browser and navigate to [http://localhost:8080](http://localhost:8080) should show the same value as before. This difference is now the feature flag value can be changed at runtime!

Let's change the feature flag in our `flags.flagd.json`, making `defaultVariant` to `on`

```
{  "flags": {    "welcome-message": {      "variants": {        "on": true,        "off": false      },      "state": "ENABLED",      "defaultVariant": "off"      "defaultVariant": "on"    }  }}
```

Save the changes to `flag.json` and refresh the browser tab. You should now be greeted with `Express + TypeScript + OpenFeature Server`.

## Conclusion[​](#conclusion "Direct link to Conclusion")

This walk-through introduced you to the OpenFeature JS SDK. It covered how a provider can be configured to perform the flag evaluation and introduced basic feature flagging concepts. It also showcased how feature flags can be updated at runtime, without requiring a redeployment.

[Edit this page](https://github.com/open-feature/openfeature.dev/edit/main/docs/tutorials/getting-started/node.mdx)