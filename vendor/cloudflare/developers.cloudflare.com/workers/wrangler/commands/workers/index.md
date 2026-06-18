---
title: Workers
description: Wrangler commands for creating, developing, deploying, and managing Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers

Wrangler commands for creating, developing, deploying, and managing Workers.

## `init`

Create a new project via the [create-cloudflare-cli (C3) tool](https://developers.cloudflare.com/workers/get-started/guide/#1-create-a-new-worker-project). A variety of web frameworks are available to choose from as well as templates. Dependencies are installed by default, with the option to deploy your project immediately.

```

wrangler init [<NAME>] [OPTIONS]


```

* `NAME` ` string ` optional (default: name of working directory)  
   * The name of the Workers project. This is both the directory name and `name` property in the generated [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/).
* `--yes` ` boolean ` optional  
   * Answer yes to any prompts for new projects.
* `--from-dash` ` string ` optional  
   * Fetch a Worker initialized from the dashboard. This is done by passing the flag and the Worker name. `wrangler init --from-dash <WORKER_NAME>`.  
   * The `--from-dash` command will not automatically sync changes made to the dashboard after the command is used. Therefore, it is recommended that you continue using the CLI.

The following global flags work on every command:

* `--help` ` boolean `  
   * Show help.
* `--config` ` string ` (not supported by Pages)  
   * Path to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).
* `--cwd` ` string `  
   * Run as if Wrangler was started in the specified directory instead of the current working directory.

---

## `dev`

Start a local server for developing your Worker.

```

wrangler dev [<SCRIPT>] [OPTIONS]


```

Note

None of the options for this command are required. Many of these options can be set in your Wrangler file. Refer to the [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration) documentation for more information.

* `SCRIPT` ` string `  
   * The path to an entry point for your Worker. Only required if your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) does not include a `main` key (for example, `main = "index.js"`).
* `--name` ` string ` optional  
   * Name of the Worker.
* `--config`, `-c` ` string[] ` optional  
   * Path(s) to [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). If not provided, Wrangler will use the nearest config file based on your current working directory.  
   * You can provide multiple configuration files to run multiple Workers in one dev session like this: `wrangler dev -c ./wrangler.toml -c ../other-worker/wrangler.toml`. The first config will be treated as the _primary_ Worker, which will be exposed over HTTP. The remaining config files will only be accessible via a service binding from the primary Worker.
* `--no-bundle` ` boolean ` (default: false) optional  
   * Skip Wrangler's build steps. Particularly useful when using custom builds. Refer to [Bundling](https://developers.cloudflare.com/workers/wrangler/bundling/) for more information.
* `--env` ` string ` optional  
   * Perform on a specific environment.
* `--compatibility-date` ` string ` optional  
   * A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used.
* `--compatibility-flags`, `--compatibility-flag` ` string[] ` optional  
   * Flags to use for compatibility checks.
* `--latest` ` boolean ` (default: true) optional  
   * Use the latest version of the Workers runtime.
* `--ip` ` string ` optional  
   * IP address to listen on, defaults to `localhost`.
* `--port` ` number ` optional  
   * Port to listen on.
* `--inspector-port` ` number ` optional  
   * Port for devtools to connect to.
* `--routes`, `--route` ` string[] ` optional  
   * Routes to upload.  
   * For example: `--route example.com/*`.
* `--host` ` string ` optional  
   * Host to forward requests to, defaults to the zone of project.
* `--local-protocol` ` 'http'|'https' ` (default: http) optional  
   * Protocol to listen to requests on.
* `--https-key-path` ` string ` optional  
   * Path to a custom certificate key.
* `--https-cert-path` ` string ` optional  
   * Path to a custom certificate.
* `--local-upstream` ` string ` optional  
   * Host to act as origin in local mode, defaults to `dev.host` or route.
* `--assets` ` string ` optional beta  
   * Folder of static assets to be served. Replaces [Workers Sites](https://developers.cloudflare.com/workers/configuration/sites/). Visit [assets](https://developers.cloudflare.com/workers/static-assets/) for more information.
* `--site` ` string ` optional deprecated, use \`--assets\`  
   * Folder of static assets for Workers Sites.  
   Warning  
   Workers Sites is deprecated. Please use [Workers Assets](https://developers.cloudflare.com/workers/static-assets/) or [Pages](https://developers.cloudflare.com/pages/).
* `--site-include` ` string[] ` optional deprecated  
   * Array of `.gitignore`\-style patterns that match file or directory names from the sites directory. Only matched items will be uploaded.
* `--site-exclude` ` string[] ` optional deprecated  
   * Array of `.gitignore`\-style patterns that match file or directory names from the sites directory. Matched items will not be uploaded.
* `--upstream-protocol` ` 'http'|'https' ` (default: https) optional  
   * Protocol to forward requests to host on.
* `--var` ` key:value\[] ` optional  
   * Array of `key:value` pairs to inject as variables into your code. The value will always be passed as a string to your Worker.  
   * For example, `--var "git_hash:'$(git rev-parse HEAD)'" "test:123"` makes the `git_hash` and `test` variables available in your Worker's `env`.  
   * This flag is an alternative to defining [vars](https://developers.cloudflare.com/workers/wrangler/configuration/#non-inheritable-keys) in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). If defined in both places, this flag's values will be used.
* `--define` ` key:value\[] ` optional  
   * Array of `key:value` pairs to replace global identifiers in your code.  
   * For example, `--define "GIT_HASH:'$(git rev-parse HEAD)'"` will replace all uses of `GIT_HASH` with the actual value at build time.  
   * This flag is an alternative to defining [define](https://developers.cloudflare.com/workers/wrangler/configuration/#non-inheritable-keys) in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). If defined in both places, this flag's values will be used.
* `--tsconfig` ` string ` optional  
   * Path to a custom `tsconfig.json` file.
* `--minify` ` boolean ` optional  
   * Minify the Worker.
* `--persist-to` ` string ` optional  
   * Specify directory to use for local persistence.
* `--remote` ` boolean ` (default: false) optional  
   * Develop against remote resources and data stored on Cloudflare's network.
* `--tunnel` ` boolean ` (default: false) optional  
   * Expose your local dev server over a Cloudflare Tunnel. For more information, refer to [Share a local dev server](https://developers.cloudflare.com/workers/development-testing/local-dev-tunnels/).
* `--tunnel-name` ` string ` optional  
   * Use an existing named Cloudflare Tunnel. Combine with `--tunnel` to open it automatically at startup.
* `--test-scheduled` ` boolean ` (default: false) optional  
   * Exposes a `/__scheduled` fetch route which will trigger a scheduled event (Cron Trigger) for testing during development. To simulate different cron patterns, a `cron` query parameter can be passed in: `/__scheduled?cron=*+*+*+*+*` or `/cdn-cgi/handler/scheduled?cron=*+*+*+*+*`.
* `--log-level` ` 'debug'|'info'|'log'|'warn'|'error|'none' ` (default: log) optional  
   * Specify Wrangler's logging level.
* `--show-interactive-dev-session` ` boolean ` (default: true if the terminal supports interactivity) optional  
   * Show the interactive dev session.
* `--alias` `Array<string>`  
   * Specify modules to alias using [module aliasing](https://developers.cloudflare.com/workers/wrangler/configuration/#module-aliasing).
* `--types` ` boolean ` (default: false) optional  
   * Generate types from your Worker configuration.
* `--local` ` boolean ` (default: false) optional  
   * Run in local mode. In this mode:  
         * the Worker code is running locally on your machine  
         * all [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) are disabled, which behaves exactly as if they were configured with `remote: false`.

The following global flags work on every command:

* `--help` ` boolean `  
   * Show help.
* `--config` ` string ` (not supported by Pages)  
   * Path to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).
* `--cwd` ` string `  
   * Run as if Wrangler was started in the specified directory instead of the current working directory.

`wrangler dev` is a way to [locally test](https://developers.cloudflare.com/workers/development-testing/) your Worker while developing. With `wrangler dev` running, send HTTP requests to `localhost:8787` and your Worker should execute as expected. You will also see `console.log` messages and exceptions appearing in your terminal.

Note

`wrangler dev` runs the local `workerd` runtime with `TZ=UTC` to match the production Cloudflare runtime. `Date` and `Intl` APIs inside your Worker observe UTC during local development, regardless of your machine's timezone.

---

## `deploy`

Deploy your Worker to Cloudflare.

When you run `wrangler deploy` in a project directory without a Wrangler configuration file, Wrangler will [automatically detect your framework](https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/) and configure your project for Cloudflare Workers. This command will prompt you to confirm the detected settings before applying changes. Confirm that you would like to proceed, and your project will be configured and deployed.

To configure your project without deploying, use [wrangler setup](#setup) instead.

```

wrangler deploy [<PATH>] [OPTIONS]


```

Note

None of the options for this command are required. Also, many can be set in your Wrangler file. Refer to the [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) documentation for more information.

* `PATH` ` string `  
   * A path specific what needs to be deployed, this can either be:  
         * The path to an entry point for your Worker.  
                  * Only required if your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) does not include a `main` key (for example, `main = "index.js"`).  
         * Or the path to an assets directory for the deployment of a static site.  
                  * Visit [assets](https://developers.cloudflare.com/workers/static-assets/) for more information.  
                  * This overrides the eventual `assets` configuration in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).  
                  * This is equivalent to the `--assets` option listed below.  
                  * Note: this option currently only works only in interactive mode (so not in CI systems).
* `--name` ` string ` optional  
   * Name of the Worker.
* `--no-bundle` ` boolean ` (default: false) optional  
   * Skip Wrangler's build steps. Particularly useful when using custom builds. Refer to [Bundling](https://developers.cloudflare.com/workers/wrangler/bundling/) for more information.
* `--env` ` string ` optional  
   * Perform on a specific environment.  
   Note  
   If you're using the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/), you select the environment at dev or build time via the `CLOUDFLARE_ENV` environment variable rather than the `--env` flag. Otherwise, environments are defined in your Worker config file as usual. For more detail on using environments with the Cloudflare Vite plugin, refer to the [plugin documentation](https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/).
* `--outdir` ` string ` optional  
   * Path to directory where Wrangler will write the bundled Worker files.
* `--compatibility-date` ` string ` optional  
   * A date in the form yyyy-mm-dd, which will be used to determine which version of the Workers runtime is used.
* `--compatibility-flags`, `--compatibility-flag` ` string[] ` optional  
   * Flags to use for compatibility checks.
* `--latest` ` boolean ` (default: true) optional  
   * Use the latest version of the Workers runtime.
* `--assets` ` string ` optional beta  
   * Folder of static assets to be served. Replaces [Workers Sites](https://developers.cloudflare.com/workers/configuration/sites/). Visit [assets](https://developers.cloudflare.com/workers/static-assets/) for more information.
* `--site` ` string ` optional deprecated, use \`--assets\`  
   * Folder of static assets for Workers Sites.  
   Warning  
   Workers Sites is deprecated. Please use [Workers Assets](https://developers.cloudflare.com/workers/static-assets/) or [Pages](https://developers.cloudflare.com/pages/).
* `--site-include` ` string[] ` optional deprecated  
   * Array of `.gitignore`\-style patterns that match file or directory names from the sites directory. Only matched items will be uploaded.
* `--site-exclude` ` string[] ` optional deprecated  
   * Array of `.gitignore`\-style patterns that match file or directory names from the sites directory. Matched items will not be uploaded.
* `--var` ` key:value\[] ` optional  
   * Array of `key:value` pairs to inject as variables into your code. The value will always be passed as a string to your Worker.  
   * For example, `--var git_hash:$(git rev-parse HEAD) test:123` makes the `git_hash` and `test` variables available in your Worker's `env`.  
   * This flag is an alternative to defining [vars](https://developers.cloudflare.com/workers/wrangler/configuration/#non-inheritable-keys) in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). If defined in both places, this flag's values will be used.
* `--define` ` key:value\[] ` optional  
   * Array of `key:value` pairs to replace global identifiers in your code.  
   * For example, `--define GIT_HASH:$(git rev-parse HEAD)` will replace all uses of `GIT_HASH` with the actual value at build time.  
   * This flag is an alternative to defining [define](https://developers.cloudflare.com/workers/wrangler/configuration/#non-inheritable-keys) in your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). If defined in both places, this flag's values will be used.
* `--triggers`, `--schedule`, `--schedules` ` string[] ` optional  
   * Cron schedules to attach to the deployed Worker. Refer to [Cron Trigger Examples](https://developers.cloudflare.com/workers/configuration/cron-triggers/#examples).
* `--routes`, `--route` string\[\] optional  
   * Routes where this Worker will be deployed.  
   * For example: `--route example.com/*`.
* `--domain` ` string[] ` optional  
   * Custom domains where this Worker will be deployed.  
   * For example: `--domain example.com`.
* `--tsconfig` ` string ` optional  
   * Path to a custom `tsconfig.json` file.
* `--minify` ` boolean ` optional  
   * Minify the bundled Worker before deploying.
* `--dry-run` ` boolean ` (default: false) optional  
   * Compile a project without actually deploying to live servers. Combined with `--outdir`, this is also useful for testing the output of `npx wrangler deploy`. It also gives developers a chance to upload our generated sourcemap to a service like Sentry, so that errors from the Worker can be mapped against source code, but before the service goes live.
* `--keep-vars` ` boolean ` (default: false) optional  
   * It is recommended best practice to treat your Wrangler developer environment as a source of truth for your Worker configuration, and avoid making changes via the Cloudflare dashboard.  
   * If you change your environment variables in the Cloudflare dashboard, Wrangler will override them the next time you deploy. If you want to disable this behaviour set `keep-vars` to `true`.  
   * Secrets are never deleted by a deployment whether this flag is true or false.
* `--secrets-file` ` string ` optional  
   * Path to a file containing secrets to upload alongside the deployment. Accepts JSON or `.env` format — the same formats used by [wrangler secret bulk](#secret-bulk). Existing secrets not included in the file are preserved from the previous version. Refer to [Secrets — Upload secrets alongside code](https://developers.cloudflare.com/workers/configuration/secrets/#upload-secrets-alongside-code) for more details.
* `--dispatch-namespace` ` string ` optional  
   * Specify the [Workers for Platforms dispatch namespace](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dispatch-namespace) to upload this Worker to.
* `--metafile` ` string ` optional  
   * Specify a file to write the build metadata from esbuild to. If flag is used without a path string, this defaults to `bundle-meta.json` inside the directory specified by `--outdir`. This can be useful for understanding the bundle size.
* `--containers-rollout` ` immediate | gradual ` optional  
   * Specify the [rollout strategy](https://developers.cloudflare.com/containers/faq#how-do-container-updates-and-rollouts-work) for [Containers](https://developers.cloudflare.com/containers) associated with the Worker. If set to `immediate`, 100% of container instances will be updated in one rollout step, overriding any configuration in `rollout_step_percentage`. Note that `rollout_active_grace_period`, if configured, still applies.  
   * Defaults to `gradual`, where the default rollout is 10% then 100% of instances.
* `--strict` ` boolean ` (default: false) optional  
   * Turns on strict mode for the deployment command, meaning that the command will be more defensive and prevent deployments which could introduce potential issues. In particular, this mode prevents deployments if the deployment would potentially override remote settings in non-interactive environments.
* `--tag` ` string ` optional  
   * A tag for this Worker version. Matches the behavior of `wrangler versions upload --tag`.
* `--message` ` string ` optional  
   * A descriptive message for this Worker version and deployment. Matches the behavior of `wrangler versions upload --message`. The message is also applied to the deployment.
* `--yes` ` boolean ` (default: false) optional  
   * Skip confirmation prompts and run [automatic project configuration](https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/) non-interactively using detected settings. Only applicable when no Wrangler configuration file exists in your project.

The following global flags work on every command:

* `--help` ` boolean `  
   * Show help.
* `--config` ` string ` (not supported by Pages)  
   * Path to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).
* `--cwd` ` string `  
   * Run as if Wrangler was started in the specified directory instead of the current working directory.

---

## `delete`

Delete your Worker and all associated Cloudflare developer platform resources.

```

wrangler delete [<SCRIPT>] [OPTIONS]


```

* `SCRIPT` ` string `  
   * The path to an entry point for your Worker. Only required if your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) does not include a `main` key (for example, `main = "index.js"`).
* `--name` ` string ` optional  
   * Name of the Worker.
* `--env` ` string ` optional  
   * Perform on a specific environment.
* `--dry-run` ` boolean ` (default: false) optional  
   * Do not actually delete the Worker. This is useful for testing the output of `wrangler delete`.

The following global flags work on every command:

* `--help` ` boolean `  
   * Show help.
* `--config` ` string ` (not supported by Pages)  
   * Path to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).
* `--cwd` ` string `  
   * Run as if Wrangler was started in the specified directory instead of the current working directory.

---

## `setup`

🪄 Setup a project to work on Cloudflare

* [  npm ](#tab-panel-12741)
* [  pnpm ](#tab-panel-12742)
* [  yarn ](#tab-panel-12743)

Terminal window

```

npx wrangler setup


```

Terminal window

```

pnpm wrangler setup


```

Terminal window

```

yarn wrangler setup


```

* `--yes` ` boolean ` alias: --y default: false  
Answer "yes" to any prompts for configuring your project
* `--build` ` boolean ` default: false  
Run your project's build command once it has been configured
* `--dry-run` ` boolean `  
Runs the command without applying any filesystem modifications

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

This command configures your project for Cloudflare Workers without deploying. It performs the same [automatic project configuration](https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/) as `wrangler deploy`, but does not deploy. This is useful when you want to review the generated configuration before deploying.

---

## `secret`

Manage the secret variables for a Worker.

This action creates a new [version](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#versions) of the Worker and [deploys](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#deployments) it immediately. To only create a new version of the Worker, use the [wrangler versions secret](#versions-secret-put) commands.

### `secret put`

Create or update a secret for a Worker

* [  npm ](#tab-panel-12744)
* [  pnpm ](#tab-panel-12745)
* [  yarn ](#tab-panel-12746)

Terminal window

```

npx wrangler secret put [KEY]


```

Terminal window

```

pnpm wrangler secret put [KEY]


```

Terminal window

```

yarn wrangler secret put [KEY]


```

* `[KEY]` ` string ` required  
The variable name to be accessible in the Worker
* `--name` ` string `  
Name of the Worker. If this is not specified, it will default to the name specified in your Wrangler config file.

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

When running this command, you will be prompted to input the secret's value:

Terminal window

```

npx wrangler secret put FOO


```

```

? Enter a secret value: > ***

🌀 Creating the secret for script worker-app

✨ Success! Uploaded secret FOO


```

The `put` command can also receive piped input. For example:

Terminal window

```

echo "-----BEGIN PRIVATE KEY-----\nM...==\n-----END PRIVATE KEY-----\n" | wrangler secret put PRIVATE_KEY


```

### `secret delete`

Delete a secret from a Worker

* [  npm ](#tab-panel-12747)
* [  pnpm ](#tab-panel-12748)
* [  yarn ](#tab-panel-12749)

Terminal window

```

npx wrangler secret delete [KEY]


```

Terminal window

```

pnpm wrangler secret delete [KEY]


```

Terminal window

```

yarn wrangler secret delete [KEY]


```

* `[KEY]` ` string ` required  
The variable name to be accessible in the Worker
* `--name` ` string `  
Name of the Worker. If this is not specified, it will default to the name specified in your Wrangler config file.

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

### `secret list`

List all secrets for a Worker

* [  npm ](#tab-panel-12750)
* [  pnpm ](#tab-panel-12751)
* [  yarn ](#tab-panel-12752)

Terminal window

```

npx wrangler secret list


```

Terminal window

```

pnpm wrangler secret list


```

Terminal window

```

yarn wrangler secret list


```

* `--name` ` string `  
Name of the Worker. If this is not specified, it will default to the name specified in your Wrangler config file.
* `--format` ` "json" | "pretty" ` default: json  
The format to print the secrets in

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

The following is an example of listing the secrets for the current Worker.

Terminal window

```

npx wrangler secret list


```

```

[

  {

    "name": "FOO",

    "type": "secret_text"

  }

]


```

---

### `secret bulk`

Create, update, or delete multiple secrets for a Worker in a single request, with up to 100 secrets per command.

* [  npm ](#tab-panel-12753)
* [  pnpm ](#tab-panel-12754)
* [  yarn ](#tab-panel-12755)

Terminal window

```

npx wrangler secret bulk [FILE]


```

Terminal window

```

pnpm wrangler secret bulk [FILE]


```

Terminal window

```

yarn wrangler secret bulk [FILE]


```

* `[FILE]` ` string `  
The file of key-value pairs to create, update, or delete, as JSON in form {"key": "value", ...} or .env file in the form KEY=VALUE. Set a key to null in the JSON file to delete it. Deletion is not supported with .env files. If omitted, Wrangler expects to receive input from stdin rather than a file.
* `--name` ` string `  
Name of the Worker. If this is not specified, it will default to the name specified in your Wrangler config file.

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

Note

Deleting secrets by setting a key to `null` requires wrangler version 4.97.0 or later and JSON format. Deletion is not supported with `.env` files.

The following is an example of creating, updating, and deleting secrets from a JSON file redirected to `stdin`. Set a key to `null` to delete it.

```

{

  "secret-name-1": "secret-value-1",

  "secret-name-2": "secret-value-2",

  "secret-name-3": null

}


```

Terminal window

```

npx wrangler secret bulk < secrets.json


```

```

🌀 Processing the secrets for the Worker "script-name"

✨ Successfully created secret for key: secret-name-1

✨ Successfully created secret for key: secret-name-2

💥 Successfully deleted secret for key: secret-name-3


Finished processing secrets file:

✨ 2 secrets successfully created

💥 1 secrets successfully deleted


```

---

## `tail`

🦚 Start a log tailing session for a Worker

* [  npm ](#tab-panel-12756)
* [  pnpm ](#tab-panel-12757)
* [  yarn ](#tab-panel-12758)

Terminal window

```

npx wrangler tail [WORKER]


```

Terminal window

```

pnpm wrangler tail [WORKER]


```

Terminal window

```

yarn wrangler tail [WORKER]


```

* `[WORKER]` ` string `  
Name or route of the worker to tail
* `--format` ` "json" | "pretty" `  
The format of log entries
* `--status` ` "ok" | "error" | "canceled" `  
Filter by invocation status
* `--header` ` string `  
Filter by HTTP header
* `--method` ` string `  
Filter by HTTP method
* `--sampling-rate` ` number `  
Adds a percentage of requests to log sampling rate
* `--search` ` string `  
Filter by a text match in console.log messages
* `--ip` ` string `  
Filter by the IP address the request originates from. Use "self" to filter for your own IP
* `--version-id` ` string `  
Filter by Worker version

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

After starting `wrangler tail`, you will receive a live feed of console and exception logs for each request your Worker receives.

If your Worker has a high volume of traffic, the tail might enter sampling mode. This will cause some of your messages to be dropped and a warning to appear in your tail logs. To prevent messages from being dropped, add the options listed above to filter the volume of tail messages.

Note

It may take up to 1 minute (60 seconds) for a tail to exit sampling mode after adding an option to filter tail messages.

If sampling persists after using options to filter messages, consider using [instant logs](https://developers.cloudflare.com/logs/instant-logs/).

---

## `versions`

Note

The minimum required wrangler version to use these commands is 3.40.0\. For versions before 3.73.0, you will need to add the `--x-versions` flag.

### `versions upload`

Upload a new [version](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#versions) of your Worker that is not deployed immediately.

* [  npm ](#tab-panel-12759)
* [  pnpm ](#tab-panel-12760)
* [  yarn ](#tab-panel-12761)

Terminal window

```

npx wrangler versions upload [PATH]


```

Terminal window

```

pnpm wrangler versions upload [PATH]


```

Terminal window

```

yarn wrangler versions upload [PATH]


```

* `[PATH]` ` string `  
The path to an entry point for your Worker or a directory of static assets
* `--name` ` string `  
Name of the Worker
* `--tag` ` string `  
A tag for this Worker Version
* `--message` ` string `  
A descriptive message for this Worker Version
* `--no-bundle` ` boolean ` default: false  
Skip internal build steps and directly upload Worker
* `--outdir` ` string `  
Output directory for the bundled Worker
* `--outfile` ` string `  
Output file for the bundled worker
* `--compatibility-date` ` string `  
Date to use for compatibility checks
* `--compatibility-flags` ` string ` alias: --compatibility-flag  
Flags to use for compatibility checks
* `--latest` ` boolean ` default: false  
Use the latest version of the Workers runtime
* `--assets` ` string `  
Static assets to be served. Replaces Workers Sites.
* `--var` ` string `  
A key-value pair to be injected into the script as a variable
* `--define` ` string `  
A key-value pair to be substituted in the script
* `--alias` ` string `  
A module pair to be substituted in the script
* `--jsx-factory` ` string `  
The function that is called for each JSX element
* `--jsx-fragment` ` string `  
The function that is called for each JSX fragment
* `--tsconfig` ` string `  
Path to a custom tsconfig.json file
* `--minify` ` boolean `  
Minify the Worker
* `--upload-source-maps` ` boolean `  
Include source maps when uploading this Worker
* `--dry-run` ` boolean `  
Compile a project and run checks without actually uploading the Worker
* `--secrets-file` ` string `  
Path to a file containing secrets to upload with the version (JSON or .env format). Applies additively with secrets from previous deployments - omitted secrets will not be deleted.
* `--keep-vars` ` boolean ` default: false  
When not used (or set to false), Wrangler will delete all vars before setting those found in the Wrangler configuration. When used (and set to true), the environment variables are not deleted before the deployment. If you set variables via the dashboard you probably want to use this flag. Note that secrets are never deleted by deployments.
* `--preview-alias` ` string `  
Name of an alias for this Worker version

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

### `versions deploy`

Deploy a previously created [version](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#versions) of your Worker all at once or create a [gradual deployment](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/) to incrementally shift traffic to a new version by following an interactive prompt.

* [  npm ](#tab-panel-12762)
* [  pnpm ](#tab-panel-12763)
* [  yarn ](#tab-panel-12764)

Terminal window

```

npx wrangler versions deploy [VERSION-SPECS]


```

Terminal window

```

pnpm wrangler versions deploy [VERSION-SPECS]


```

Terminal window

```

yarn wrangler versions deploy [VERSION-SPECS]


```

* `--name` ` string `  
Name of the worker
* `--version-id` ` string `  
Worker Version ID(s) to deploy
* `--percentage` ` number `  
Percentage of traffic to split between Worker Version(s) (0-100)
* `[VERSION-SPECS]` ` string `  
Shorthand notation to deploy Worker Version(s) \[<version-id>@<percentage>..\]. Omitted percentages share the remaining traffic.
* `--version-tag` ` string `  
Worker Version tag(s) to deploy, resolved to a Version ID against the deployable versions. Supports the shorthand notation \[<version-tag>@<percentage>..\].
* `--message` ` string `  
Description of this deployment (optional)
* `--yes` ` boolean ` alias: --y default: false  
Automatically accept defaults to prompts
* `--dry-run` ` boolean ` default: false  
Don't actually deploy

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

Note

The non-interactive version of this prompt is: `wrangler versions deploy version-id-1@percentage-1% version-id-2@percentage-2 -y`

For example:`wrangler versions deploy 095f00a7-23a7-43b7-a227-e4c97cab5f22@10% 1a88955c-2fbd-4a72-9d9b-3ba1e59842f2@90% -y`

### `versions list`

Retrieve details for the 10 most recent versions. Details include `Version ID`, `Created on`, `Author`, `Source`, and optionally, `Tag` or `Message`.

* [  npm ](#tab-panel-12765)
* [  pnpm ](#tab-panel-12766)
* [  yarn ](#tab-panel-12767)

Terminal window

```

npx wrangler versions list


```

Terminal window

```

pnpm wrangler versions list


```

Terminal window

```

yarn wrangler versions list


```

* `--name` ` string `  
Name of the Worker
* `--json` ` boolean ` default: false  
Display output as JSON

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

### `versions view`

View the details of a specific version of your Worker

* [  npm ](#tab-panel-12768)
* [  pnpm ](#tab-panel-12769)
* [  yarn ](#tab-panel-12770)

Terminal window

```

npx wrangler versions view [VERSION-ID]


```

Terminal window

```

pnpm wrangler versions view [VERSION-ID]


```

Terminal window

```

yarn wrangler versions view [VERSION-ID]


```

* `[VERSION-ID]` ` string ` required  
The Worker Version ID to view
* `--name` ` string `  
Name of the worker
* `--json` ` boolean ` default: false  
Display output as JSON

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

### `versions secret put`

Create or update a secret variable for a Worker

* [  npm ](#tab-panel-12771)
* [  pnpm ](#tab-panel-12772)
* [  yarn ](#tab-panel-12773)

Terminal window

```

npx wrangler versions secret put [KEY]


```

Terminal window

```

pnpm wrangler versions secret put [KEY]


```

Terminal window

```

yarn wrangler versions secret put [KEY]


```

* `[KEY]` ` string `  
The variable name to be accessible in the Worker
* `--name` ` string `  
Name of the Worker
* `--message` ` string `  
Description of this deployment
* `--tag` ` string `  
A tag for this version

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

### `versions secret delete`

Delete a secret variable from a Worker

* [  npm ](#tab-panel-12774)
* [  pnpm ](#tab-panel-12775)
* [  yarn ](#tab-panel-12776)

Terminal window

```

npx wrangler versions secret delete [KEY]


```

Terminal window

```

pnpm wrangler versions secret delete [KEY]


```

Terminal window

```

yarn wrangler versions secret delete [KEY]


```

* `[KEY]` ` string `  
The variable name to be accessible in the Worker
* `--name` ` string `  
Name of the Worker
* `--message` ` string `  
Description of this deployment
* `--tag` ` string `  
A tag for this version

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

### `versions secret bulk`

Create or update a secret variable for a Worker

* [  npm ](#tab-panel-12777)
* [  pnpm ](#tab-panel-12778)
* [  yarn ](#tab-panel-12779)

Terminal window

```

npx wrangler versions secret bulk [FILE]


```

Terminal window

```

pnpm wrangler versions secret bulk [FILE]


```

Terminal window

```

yarn wrangler versions secret bulk [FILE]


```

* `[FILE]` ` string `  
The file of key-value pairs to upload, as JSON in form {"key": value, ...} or .dev.vars file in the form KEY=VALUE
* `--name` ` string `  
Name of the Worker
* `--message` ` string `  
Description of this deployment
* `--tag` ` string `  
A tag for this version

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

---

## `triggers`

Note

The minimum required wrangler version to use these commands is 3.40.0\. For versions before 3.73.0, you will need to add the `--x-versions` flag.

### `triggers deploy`

  
Experimental 

Apply changes to triggers (Routes or domains and Cron Triggers) when using `wrangler versions upload`

* [  npm ](#tab-panel-12780)
* [  pnpm ](#tab-panel-12781)
* [  yarn ](#tab-panel-12782)

Terminal window

```

npx wrangler triggers deploy


```

Terminal window

```

pnpm wrangler triggers deploy


```

Terminal window

```

yarn wrangler triggers deploy


```

* `--name` ` string `  
Name of the worker
* `--triggers` ` string ` aliases: --schedule, --schedules  
cron schedules to attach
* `--routes` ` string ` alias: --route  
Routes to upload
* `--dry-run` ` boolean `  
Don't actually deploy

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

---

## `deployments`

[Deployments](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#deployments) track the version(s) of your Worker that are actively serving traffic.

Note

The minimum required wrangler version to use these commands is 3.40.0\. For versions before 3.73.0, you will need to add the `--x-versions` flag.

### `deployments list`

Displays the 10 most recent deployments of your Worker

* [  npm ](#tab-panel-12783)
* [  pnpm ](#tab-panel-12784)
* [  yarn ](#tab-panel-12785)

Terminal window

```

npx wrangler deployments list


```

Terminal window

```

pnpm wrangler deployments list


```

Terminal window

```

yarn wrangler deployments list


```

* `--name` ` string `  
Name of the Worker
* `--json` ` boolean ` default: false  
Display output as JSON

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

### `deployments status`

View the current state of your production

* [  npm ](#tab-panel-12786)
* [  pnpm ](#tab-panel-12787)
* [  yarn ](#tab-panel-12788)

Terminal window

```

npx wrangler deployments status


```

Terminal window

```

pnpm wrangler deployments status


```

Terminal window

```

yarn wrangler deployments status


```

* `--name` ` string `  
Name of the Worker
* `--json` ` boolean ` default: false  
Display output as JSON

Global flags

* `--v` ` boolean ` alias: --version  
Show version number
* `--cwd` ` string `  
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c  
Path to Wrangler configuration file
* `--env` ` string ` alias: --e  
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `  
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true  
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true  
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `rollback`

Warning

A rollback will immediately create a new deployment with the specified version of your Worker and become the active deployment across all your deployed routes and domains. This change will not affect work in your local development environment.

```

wrangler rollback [<VERSION_ID>] [OPTIONS]


```

* `VERSION_ID` ` string ` optional  
   * The ID of the version you wish to roll back to. If not supplied, the `rollback` command defaults to the version uploaded before the latest version.
* `--name` ` string ` optional  
   * Perform on a specific Worker rather than inheriting from the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).
* `--message` ` string ` optional  
   * Add message for rollback. Accepts empty string. When specified, interactive prompts for rollback confirmation and message are skipped.

The following global flags work on every command:

* `--help` ` boolean `  
   * Show help.
* `--config` ` string ` (not supported by Pages)  
   * Path to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).
* `--cwd` ` string `  
   * Run as if Wrangler was started in the specified directory instead of the current working directory.

---

## `types`

Generate types based on your Worker configuration, including `Env` types based on your bindings, module rules, and [runtime types](https://developers.cloudflare.com/workers/languages/typescript/) based on the`compatibility_date` and `compatibility_flags` in your [config file](https://developers.cloudflare.com/workers/wrangler/configuration/).

```

wrangler types [<PATH>] [OPTIONS]


```

Note

If you are running a version of Wrangler that is greater than `3.66.0` but below `4.0.0`, you will need to include the `--experimental-include-runtime` flag. During its experimental release, runtime types were output to a separate file (`.wrangler/types/runtime.d.ts` by default). If you have an older version of Wrangler, you can access runtime types through the `@cloudflare/workers-types` package.

### Multi-environment support

By default, `wrangler types` generates types for bindings from **all environments** defined in your configuration file. This ensures your generated `Env` type includes all bindings that might be used across different deployment environments (such as staging and production), preventing TypeScript errors when accessing environment-specific bindings.

For example, if you have a KV namespace binding only in production and an R2 bucket binding only in staging, both will be included in the generated types as optional properties.

To generate types for only a specific environment, use the `--env` flag.

### Options

* `PATH` ` string ` (default: \`./worker-configuration.d.ts\`)  
   * The path to where types for your Worker will be written.  
   * The path must have a `d.ts` extension.
* `--env` ` string ` optional  
   * Generate types for bindings in a specific environment only, rather than aggregating bindings from all environments.
* `--env-interface` ` string ` (default: \`Env\`)  
   * The name of the interface to generate for the environment object.  
   * Not valid if the Worker uses the Service Worker syntax.
* `--include-runtime` ` boolean ` (default: true)  
   * Whether to generate runtime types based on the`compatibility_date` and `compatibility_flags` in your [config file](https://developers.cloudflare.com/workers/wrangler/configuration/).
* `--include-env` ` boolean ` (default: true)  
   * Whether to generate `Env` types based on your Worker bindings.
* `--strict-vars` ` boolean ` optional (default: true)  
   * Control the types that Wrangler generates for `vars` bindings.  
   * If `true`, (the default) Wrangler generates literal and union types for bindings (e.g. `myVar: 'my dev variable' | 'my prod variable'`).  
   * If `false`, Wrangler generates generic types (e.g. `myVar: string`). This is useful when variables change frequently, especially when working across multiple environments.
* `--check` ` boolean ` optional  
   * Check if the generated types at the specified path are up-to-date without regenerating them.  
   * Exits with code 0 if types are up-to-date, or code 1 if types are out-of-date.  
   * Useful for CI/CD pipelines and pre-commit hooks to ensure types have been regenerated after configuration changes.
* `--config`, `-c` ` string[] ` optional  
   * Path(s) to [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). If the Worker you are generating types for has service bindings or bindings to Durable Objects, you can also provide the paths to those configuration files so that the generated `Env` type will include RPC types. For example, given a Worker with a service binding, `wrangler types -c wrangler.toml -c ../bound-worker/wrangler.toml` will generate an `Env` type like this:  
TypeScript  
```  
interface Env {  
  SERVICE_BINDING: Service<import("../bound-worker/src/index").Entrypoint>;  
}  
```

---

## `check`

### `startup`

Generate a CPU profile of your Worker's startup phase.

After you run `wrangler check startup`, you can import the profile into Chrome DevTools or open it directly in VSCode to view a flamegraph of your Worker's startup phase. Additionally, when a Worker deployment fails with a startup time error Wrangler will automatically generate a CPU profile for easy investigation.

Note

This command measures performance of your Worker locally, on your own machine — which has a different CPU than when your Worker runs on Cloudflare. This means results can vary widely.

You should use the CPU profile that `wrangler check startup` generates in order to understand where time is spent at startup, but you should not expect the overall startup time in the profile to match exactly what your Worker's startup time will be when deploying to Cloudflare.

Terminal window

```

wrangler check startup


```

* `--args` ` string ` optional  
   * To customise the way `wrangler check startup` builds your Worker for analysis, provide the exact arguments you use when deploying your Worker with `wrangler deploy`, or your Pages project with `wrangler pages functions build`. For instance, if you deploy your Worker with `wrangler deploy --no-bundle`, you should use `wrangler check startup --args="--no-bundle"` to profile the startup phase.
* `--worker` ` string ` optional  
   * If you don't use Wrangler to deploy your Worker, you can use this argument to provide a Worker bundle to analyse. This should be a file path to a serialized multipart upload, with the exact same format as [the API expects](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/methods/update/).
* `--pages` ` boolean ` optional  
   * If you don't use a Wrangler config file with your Pages project (i.e. a Wrangler config file containing `pages_build_output_dir`), use this flag to force `wrangler check startup` to treat your project as a Pages project.

The following global flags work on every command:

* `--help` ` boolean `  
   * Show help.
* `--config` ` string ` (not supported by Pages)  
   * Path to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/).
* `--cwd` ` string `  
   * Run as if Wrangler was started in the specified directory instead of the current working directory.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/workers/#page","headline":"Workers · Cloudflare Workers docs","description":"Wrangler commands for creating, developing, deploying, and managing Workers.","url":"https://developers.cloudflare.com/workers/wrangler/commands/workers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/workers/","name":"Workers"}}]}
```
