---
title: "JavaScript"
description: "Learn how to manually set up Sentry in your JavaScript app and capture your first errors."
url: https://docs.sentry.io/platforms/javascript/
---

# Browser JavaScript | Sentry for JavaScript

##### Using a framework?

This guide focuses on plain JavaScript. If you're working with React, Next.js, or any other framework, choose the fitting SDK from the left-hand dropdown.

## [Prerequisites](https://docs.sentry.io/platforms/javascript.md#prerequisites)

You need:

* A Sentry [account](https://sentry.io/signup/) and [project](https://docs.sentry.io/product/projects.md)
* Your application up and running

Choose the features you want to configure, and this guide will show you how:

Error Monitoring\[ ]Tracing\[ ]Session Replay\[ ]Logs\[ ]User Feedback

Want to learn more about these features?

* [**Issues**](https://docs.sentry.io/product/issues.md) (always enabled): Sentry's core error monitoring product that automatically reports errors, uncaught exceptions, and unhandled rejections. If you have something that looks like an exception, Sentry can capture it.
* [**Tracing**](https://docs.sentry.io/product/tracing.md): Track software performance while seeing the impact of errors across multiple systems. For example, distributed tracing allows you to follow a request from the frontend to the backend and back.
* [**Session Replay**](https://docs.sentry.io/product/explore/session-replay/web.md): Get to the root cause of an issue faster by viewing a video-like reproduction of what was happening in the user's browser before, during, and after the problem.
* [**Logs**](https://docs.sentry.io/product/explore/logs.md): Centralize and analyze your application logs to correlate them with errors and performance issues. Search, filter, and visualize log data to understand what's happening in your applications.
* [**User Feedback**](https://docs.sentry.io/product/user-feedback.md): Collect feedback directly from users when they encounter errors, allowing them to describe what happened and provide context that helps you understand and resolve issues faster.

## [Install](https://docs.sentry.io/platforms/javascript.md#install)

We recommend installing Sentry via a package manager. If that isn't an option for you, you can use the [Loader Script](https://docs.sentry.io/platforms/javascript/install/loader.md) or a CDN bundle.

#### [Option 1: Package Manager (Recommended)](https://docs.sentry.io/platforms/javascript.md#option-1-package-manager-recommended)

Run the command for your preferred package manager to add the Sentry SDK to your application:

```bash
npm install @sentry/browser --save
```

*Other available variations of the above snippet: yarn, pnpm*

#### [Option 2: Loader Script](https://docs.sentry.io/platforms/javascript.md#option-2-loader-script)

In Sentry, go to **Settings > Projects > (select project) > SDK Setup > Loader Script**. Enable the features you want (for example, Tracing or Session Replay), copy the script tag, and place it before all other scripts in your app.

#### [Option 3: CDN Bundle](https://docs.sentry.io/platforms/javascript.md#option-3-cdn-bundle)

Sentry provides different bundles that include specific feature combinations. Go to our list of [available bundles](https://docs.sentry.io/platforms/javascript/install/loader.md#cdn) and copy the one that fits your needs. Next, place the script tag before all other scripts in your app.

If you're updating your Sentry SDK to the latest version, check out our [migration guide](https://github.com/getsentry/sentry-javascript/blob/master/MIGRATION.md) to learn more about breaking changes.

## [Configure](https://docs.sentry.io/platforms/javascript.md#configure)

### [Initialize the Sentry SDK](https://docs.sentry.io/platforms/javascript.md#initialize-the-sentry-sdk)

Initialize Sentry as early as possible in your application's lifecycle. The setup differs slightly depending on how you installed the Sentry SDK. Be sure to follow the instructions in the related tab (npm, Loader, CDN):

**npm**

```javascript
import * as Sentry from "<sdk-package-name>";

Sentry.init({
  dsn: "https://<key>@o<orgId>.ingest.sentry.io/<projectId>",

  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },

  // Alternatively, use `process.env.npm_package_version` for a dynamic release version
  // if your build tool supports it.
  release: "my-project-name@2.3.12",
  integrations: [
    // ___PRODUCT_OPTION_START___ performance
    Sentry.browserTracingIntegration(),
    // ___PRODUCT_OPTION_END___ performance
    // ___PRODUCT_OPTION_START___ session-replay
    Sentry.replayIntegration(),
    // ___PRODUCT_OPTION_END___ session-replay
    // ___PRODUCT_OPTION_START___ user-feedback
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
    // ___PRODUCT_OPTION_END___ user-feedback
  ],
  // ___PRODUCT_OPTION_START___ logs

  // Enable logs to be sent to Sentry
  enableLogs: true,
  // ___PRODUCT_OPTION_END___ logs
  // ___PRODUCT_OPTION_START___ performance

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // ___PRODUCT_OPTION_END___ performance
  // ___PRODUCT_OPTION_START___ session-replay

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  // ___PRODUCT_OPTION_END___ session-replay
});
```

**Loader**

```html
<script
  src="https://js.sentry-cdn.com/<your-public-key>.min.js"
  crossorigin="anonymous"
></script>

<script>
  window.sentryOnLoad = function () {
    Sentry.init({
      dsn: "https://<key>@o<orgId>.ingest.sentry.io/<projectId>",

      dataCollection: {
        // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
        // https://docs.sentry.io/platforms/javascript/configuration/options/#dataCollection
        // userInfo: false,
        // httpBodies: [],
      },

      // Alternatively, use `process.env.npm_package_version` for a dynamic release version
      // if your build tool supports it.
      release: "my-project-name@2.3.12",
      integrations: [
        // ___PRODUCT_OPTION_START___ performance
        Sentry.browserTracingIntegration(),
        // ___PRODUCT_OPTION_END___ performance
        // ___PRODUCT_OPTION_START___ session-replay
        Sentry.replayIntegration(),
        // ___PRODUCT_OPTION_END___ session-replay
        // ___PRODUCT_OPTION_START___ user-feedback
        Sentry.feedbackIntegration({
          // Additional SDK configuration goes in here, for example:
          colorScheme: "system",
        }),
        // ___PRODUCT_OPTION_END___ user-feedback
      ],
      // ___PRODUCT_OPTION_START___ logs

      // Enable logs to be sent to Sentry
      enableLogs: true,
      // ___PRODUCT_OPTION_END___ logs
      // ___PRODUCT_OPTION_START___ performance

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for tracing.
      // We recommend adjusting this value in production
      // Learn more at
      // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
      tracesSampleRate: 1.0,

      // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
      tracePropagationTargets: [
        "localhost",
        /^https:\/\/yourserver\.io\/api/,
      ],
      // ___PRODUCT_OPTION_END___ performance
      // ___PRODUCT_OPTION_START___ session-replay

      // Capture Replay for 10% of all sessions,
      // plus for 100% of sessions with an error
      // Learn more at
      // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      // ___PRODUCT_OPTION_END___ session-replay
    });
  };
</script>
```

**CDN**

```html
<script
  src="https://browser.sentry-cdn.com/10.58.0/bundle.tracing.min.js"
  integrity="sha384-kds8iO3vDj6X38OxubDgbg45botpNZVBJJPEvhtXGaxOK27CfWEBvSFjD/pBYFu/"
  crossorigin="anonymous"
></script>

<script>
  Sentry.init({
    dsn: "https://<key>@o<orgId>.ingest.sentry.io/<projectId>",

    dataCollection: {
      // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
      // https://docs.sentry.io/platforms/javascript/configuration/options/#dataCollection
      // userInfo: false,
      // httpBodies: [],
    },

    // Alternatively, use `process.env.npm_package_version` for a dynamic release version
    // if your build tool supports it.
    release: "my-project-name@2.3.12",
    integrations: [
      // ___PRODUCT_OPTION_START___ performance
      Sentry.browserTracingIntegration(),
      // ___PRODUCT_OPTION_END___ performance
      // ___PRODUCT_OPTION_START___ session-replay
      Sentry.replayIntegration(),
      // ___PRODUCT_OPTION_END___ session-replay
      // ___PRODUCT_OPTION_START___ user-feedback
      Sentry.feedbackIntegration({
        // Additional SDK configuration goes in here, for example:
        colorScheme: "system",
      }),
      // ___PRODUCT_OPTION_END___ user-feedback
    ],
    // ___PRODUCT_OPTION_START___ logs

    // Enable logs to be sent to Sentry
    enableLogs: true,
    // ___PRODUCT_OPTION_END___ logs
    // ___PRODUCT_OPTION_START___ performance

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for tracing.
    // We recommend adjusting this value in production
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
    tracesSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    // ___PRODUCT_OPTION_END___ performance
    // ___PRODUCT_OPTION_START___ session-replay

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    // ___PRODUCT_OPTION_END___ session-replay
  });
</script>
```

### [Add Readable Stack Traces With Source Maps (Optional)](https://docs.sentry.io/platforms/javascript.md#add-readable-stack-traces-with-source-maps-optional)

The stack traces in your Sentry errors probably won't look like your actual code without unminifying them. To fix this, upload your source maps to Sentry. The easiest way to do this is by using the Sentry Wizard.

Alternatively, take a look at our [Uploading Source Maps](https://docs.sentry.io/platforms/javascript/sourcemaps/uploading.md) documentation.

```bash
npx @sentry/wizard@latest -i sourcemaps
```

### [Avoid Ad Blockers With Tunneling (Optional)](https://docs.sentry.io/platforms/javascript.md#avoid-ad-blockers-with-tunneling-optional)

You can prevent ad blockers from blocking Sentry events using tunneling. Use the `tunnel` option in `Sentry.init` to add an API endpoint in your application that forwards Sentry events to Sentry servers.

This will send all events to the `tunnel` endpoint. However, the events need to be parsed and redirected to Sentry, so you'll need to do additional configuration on the server. You can find a detailed explanation on how to do this on our [Troubleshooting page](https://docs.sentry.io/platforms/javascript/troubleshooting.md#using-the-tunnel-option).

```javascript
Sentry.init({
  dsn: "https://<key>@o<orgId>.ingest.sentry.io/<projectId>",
  tunnel: "/tunnel",
});
```

## [Verify Your Setup](https://docs.sentry.io/platforms/javascript.md#verify-your-setup)

Let's test your setup and confirm that data reaches your Sentry project.

### [Issues](https://docs.sentry.io/platforms/javascript.md#issues)

To verify that Sentry captures errors and creates issues in your Sentry project, add a button that throws an error when clicked.

Open the page in a browser and click the button to throw an error.

##### Important

Errors triggered from within your browser's developer tools (like the browser console) are sandboxed, so they will not trigger Sentry's error monitoring.

```html
<script>
  function triggerError() {
    throw new Error("Sentry Test Error");
  }
</script>

<button onclick="triggerError()">Break the World</button>
```

### [Tracing](https://docs.sentry.io/platforms/javascript.md#tracing)

To test your tracing configuration, update the previous code to simulate a longer operation and start a trace.

Open the page in a browser and click the button to throw an error and create a trace.

```html
<script>
  function triggerError() {
       await Sentry.startSpan(
        { name: "Example Frontend Span", op: "test" },
        async () => {
          await new Promise(resolve => setTimeout(resolve, 200));

          throw new Error("Sentry Test Error");
        },
      );
     }
</script>

<button onclick="triggerError()">Break the World</button>
```

### [Logs NEW](https://docs.sentry.io/platforms/javascript.md#logs-)

To verify that Sentry catches your logs, add some log statements to your application:

```javascript
Sentry.logger.info("User example action completed");

Sentry.logger.warn("Slow operation detected", {
  operation: "data_fetch",
  duration: 3500,
});

Sentry.logger.error("Validation failed", {
  field: "email",
  reason: "Invalid email",
});
```

### [View Captured Data in Sentry](https://docs.sentry.io/platforms/javascript.md#view-captured-data-in-sentry)

Now, head over to your project on [Sentry.io](https://sentry.io) to view the collected data (it takes a couple of moments for the data to appear).

Need help locating the captured errors in your Sentry project?

* Open the [**Issues**](https://sentry.io/orgredirect/organizations/:orgslug/issues/) page and select an error from the issues list to view the full details and context of this error. For more details, see this [interactive walkthrough](https://docs.sentry.io/product/sentry-basics/integrate-frontend/generate-first-error.md#ui-walkthrough).
* Open the [**Traces**](https://sentry.io/orgredirect/organizations/:orgslug/explore/traces/) page and select a trace to reveal more information about each span, its duration, and any errors. For an interactive UI walkthrough, click [here](https://docs.sentry.io/product/sentry-basics/distributed-tracing/generate-first-error.md#ui-walkthrough).
* Open the [**Replays**](https://sentry.io/orgredirect/organizations/:orgslug/replays/) page and select an entry from the list to get a detailed view where you can replay the interaction and get more information to help you troubleshoot.
* Open the [**Logs**](https://sentry.io/orgredirect/organizations/:orgslug/explore/logs/) page and filter by service, environment, or search keywords to view log entries from your application. For an interactive UI walkthrough, click [here](https://docs.sentry.io/product/explore/logs.md#overview).
* Open the [**User Feedback**](https://sentry.io/orgredirect/organizations/:orgslug/feedback/) page and click on individual feedback to see more details all in one view. For more information, click [here](https://docs.sentry.io/product/user-feedback.md).

## [Next Steps](https://docs.sentry.io/platforms/javascript.md#next-steps)

At this point, you should have integrated Sentry into your JavaScript application and should already be sending data to your Sentry project.

Now's a good time to customize your setup and look into more advanced topics. Our next recommended steps for you are:

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup
* Extend Sentry to your backend using one of our [SDKs](https://docs.sentry.io/.md)
* Learn how to [manually capture errors](https://docs.sentry.io/platforms/javascript/usage.md)
* Continue to [customize your configuration](https://docs.sentry.io/platforms/javascript/configuration.md)
* Get familiar with [Sentry's product features](https://docs.sentry.io/product.md) like tracing, insights, and alerts

Are you having problems setting up the SDK?

* Find various support topics in [troubleshooting](https://docs.sentry.io/platforms/javascript/troubleshooting.md)
* [Get support](https://www.sentry.help/en/)

## Frameworks

- [Angular](https://docs.sentry.io/platforms/javascript/guides/angular.md)
- [Astro](https://docs.sentry.io/platforms/javascript/guides/astro.md)
- [AWS Lambda](https://docs.sentry.io/platforms/javascript/guides/aws-lambda.md)
- [Azure Functions](https://docs.sentry.io/platforms/javascript/guides/azure-functions.md)
- [Bun](https://docs.sentry.io/platforms/javascript/guides/bun.md)
- [Capacitor](https://docs.sentry.io/platforms/javascript/guides/capacitor.md)
- [Cloud Functions for Firebase](https://docs.sentry.io/platforms/javascript/guides/firebase.md)
- [Cloudflare](https://docs.sentry.io/platforms/javascript/guides/cloudflare.md)
- [Connect](https://docs.sentry.io/platforms/javascript/guides/connect.md)
- [Cordova](https://docs.sentry.io/platforms/javascript/guides/cordova.md)
- [Deno](https://docs.sentry.io/platforms/javascript/guides/deno.md)
- [Effect](https://docs.sentry.io/platforms/javascript/guides/effect.md)
- [Electron](https://docs.sentry.io/platforms/javascript/guides/electron.md)
- [Elysia](https://docs.sentry.io/platforms/javascript/guides/elysia.md)
- [Ember](https://docs.sentry.io/platforms/javascript/guides/ember.md)
- [Express](https://docs.sentry.io/platforms/javascript/guides/express.md)
- [Fastify](https://docs.sentry.io/platforms/javascript/guides/fastify.md)
- [Gatsby](https://docs.sentry.io/platforms/javascript/guides/gatsby.md)
- [Google Cloud Functions](https://docs.sentry.io/platforms/javascript/guides/gcp-functions.md)
- [Hapi](https://docs.sentry.io/platforms/javascript/guides/hapi.md)
- [Hono](https://docs.sentry.io/platforms/javascript/guides/hono.md)
- [Koa](https://docs.sentry.io/platforms/javascript/guides/koa.md)
- [Nest.js](https://docs.sentry.io/platforms/javascript/guides/nestjs.md)
- [Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs.md)
- [Nitro](https://docs.sentry.io/platforms/javascript/guides/nitro.md)
- [Node.js](https://docs.sentry.io/platforms/javascript/guides/node.md)
- [Nuxt](https://docs.sentry.io/platforms/javascript/guides/nuxt.md)
- [React](https://docs.sentry.io/platforms/javascript/guides/react.md)
- [React Router Framework](https://docs.sentry.io/platforms/javascript/guides/react-router.md)
- [Remix](https://docs.sentry.io/platforms/javascript/guides/remix.md)
- [Solid](https://docs.sentry.io/platforms/javascript/guides/solid.md)
- [SolidStart](https://docs.sentry.io/platforms/javascript/guides/solidstart.md)
- [Svelte](https://docs.sentry.io/platforms/javascript/guides/svelte.md)
- [SvelteKit](https://docs.sentry.io/platforms/javascript/guides/sveltekit.md)
- [TanStack Start React](https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react.md)
- [Vue](https://docs.sentry.io/platforms/javascript/guides/vue.md)
- [Wasm](https://docs.sentry.io/platforms/javascript/guides/wasm.md)

## Topics

- [Installation Methods](https://docs.sentry.io/platforms/javascript/install.md)
- [Capturing Errors](https://docs.sentry.io/platforms/javascript/usage.md)
- [Source Maps](https://docs.sentry.io/platforms/javascript/sourcemaps.md)
- [Logs](https://docs.sentry.io/platforms/javascript/logs.md)
- [Session Replay](https://docs.sentry.io/platforms/javascript/session-replay.md)
- [Tracing](https://docs.sentry.io/platforms/javascript/tracing.md)
- [AI Agent Monitoring](https://docs.sentry.io/platforms/javascript/ai-agent-monitoring-browser.md)
- [Application Metrics](https://docs.sentry.io/platforms/javascript/metrics.md)
- [JavaScript](https://docs.sentry.io/platforms/javascript/legacy-sdk.md)
- [Profiling](https://docs.sentry.io/platforms/javascript/profiling.md)
- [User Feedback](https://docs.sentry.io/platforms/javascript/user-feedback.md)
- [Sampling](https://docs.sentry.io/platforms/javascript/sampling.md)
- [Enriching Events](https://docs.sentry.io/platforms/javascript/enriching-events.md)
- [Extended Configuration](https://docs.sentry.io/platforms/javascript/configuration.md)
- [Feature Flags](https://docs.sentry.io/platforms/javascript/feature-flags.md)
- [Data Management](https://docs.sentry.io/platforms/javascript/data-management.md)
- [Security Policy Reporting](https://docs.sentry.io/platforms/javascript/security-policy-reporting.md)
- [Special Use Cases](https://docs.sentry.io/platforms/javascript/best-practices.md)
- [Migration Guide](https://docs.sentry.io/platforms/javascript/migration.md)
- [Troubleshooting](https://docs.sentry.io/platforms/javascript/troubleshooting.md)
