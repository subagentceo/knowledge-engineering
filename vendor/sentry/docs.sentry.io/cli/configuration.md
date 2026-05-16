---
title: "Configuration and Authentication"
description: "Learn about the functionality of Sentry’s command line interface, including installation, configuration, and authentication."
url: https://docs.sentry.io/cli/configuration/
---

# Configuration and Authentication

For most functionality you need to authenticate with Sentry. Setting this up can be done either automatically, using `sentry-cli`, or manually via [Organization Tokens](https://sentry.io/orgredirect/organizations/:orgslug/settings/auth-tokens/).

## [To use the automatic option:](https://docs.sentry.io/cli/configuration.md#to-use-the-automatic-option)

```bash
sentry-cli login
```

This will give you the option to visit your auth token user settings, where you can create a new auth token, or simply copy an existing one. When you return to the CLI, you'll paste in your token and it will get added to `~/.sentryclirc` automatically.

By default, `sentry-cli` will connect to sentry.io, but for self-hosted you can also sign in elsewhere:

```bash
sentry-cli --url https://myserver.invalid/ login
```

## [To Authenticate Manually:](https://docs.sentry.io/cli/configuration.md#to-authenticate-manually)

You can manually create an [Organization Token](https://sentry.io/orgredirect/organizations/:orgslug/settings/auth-tokens/) and pass it to sentry-cli.

You can also sign in to your Sentry account (if you're not already) and create an Auth Token directly from this page.

Some CLI functionality, such as [Crons Monitoring](https://docs.sentry.io/cli/crons.md), is dependent on [Data Source Name (DSN)](https://docs.sentry.io/concepts/key-terms/dsn-explainer.md) authentication.

You can create an Auth Token from this page in one of the following three ways:

* add it to `~/.sentryclirc`:

  ```ini
  [auth]
  token=___ORG_AUTH_TOKEN___
  ```

* export it as an environment variable:

  ```bash
  export SENTRY_AUTH_TOKEN=___ORG_AUTH_TOKEN___
  ```

* pass it as a parameter when you invoke `sentry-cli`:

  ```bash
  $ sentry-cli login --auth-token ___ORG_AUTH_TOKEN___
  ```

## [Configuration File](https://docs.sentry.io/cli/configuration.md#configuration-file)

The `sentry-cli` tool can be configured with a config file named `.sentryclirc` as well as environment variables and `.env` files. The config file is looked for upwards from the current path and defaults from `~/.sentryclirc` are always loaded. You can also override these settings from command line parameters.

The config file uses standard INI syntax.

By default `sentry-cli` will connect to sentry.io. For on-prem you can export the `SENTRY_URL` environment variable and point it to your installation:

```bash
export SENTRY_URL=https://mysentry.invalid/
```

Alternatively you can add it to your `~/.sentryclirc` config. This is also what the `login` command does:

```ini
[defaults]
url = https://mysentry.invalid/
```

## [Configuration Values](https://docs.sentry.io/cli/configuration.md#configuration-values)

The following settings are available (first is the environment variable, the value in the parentheses is the config key in the config file):

`SENTRY_AUTH_TOKEN` (*auth.token*):

The authentication token to use for all communication with Sentry.

`SENTRY_API_KEY` (*auth.api\_key*):

The legacy API key for authentication if you have one.

`SENTRY_DSN` (*auth.dsn*):

The DSN to use to connect to Sentry.

`SENTRY_URL` (*defaults.url*):

The URL to use to connect to Sentry. This defaults to `https://sentry.io/`.

`SENTRY_ORG` (*defaults.org*):

The ID or slug of the organization to use for a command.

`SENTRY_PROJECT` (*defaults.project*):

The ID or slug of the project to use for a command.

`SENTRY_VCS_REMOTE` (*defaults.vcs\_remote*):

The name of the *remote* in the versioning control system. This defaults to `origin`.

`SENTRY_PIPELINE` (*defaults.pipeline*):

The name of the environment to be appended to `User-Agent` header.

`CUSTOM_HEADER` (*defaults.custom\_header*):

The header that will be added to every outgoing request in `key:value` format.

`SENTRY_ALLOW_FAILURE`

Note: This option will ignore the CLI's failure when uploading symbols. **BE AWARE** this will unblock your CI in case Sentry has issues, but you won't have unminified/unsymbolicated crashes in production. When using this flag, you should download your sourcemaps/debug files from CI, to re-run the upload symbols command at a later point once Sentry is available.

(*http.keepalive*):

This ini only setting is used to control the behavior of the SDK with regards to HTTP keepalives. The default is *true* but it can be set to *false* to disable keepalive support.

`http_proxy` (*http.proxy\_url*):

The URL that should be used for the HTTP proxy. The standard `http_proxy` environment variable is also honored. Note that it is lowercase.

(*http.proxy\_username*):

This ini only setting sets the proxy username in case proxy authentication is required.

(*http.proxy\_password*):

This ini only setting sets the proxy password in case proxy authentication is required.

(*http.verify\_ssl*):

This can be used to disable SSL verification when set to false. You should never do that unless you are working with a known self signed server locally.

(*http.check\_ssl\_revoke*):

If this is set to false then SSL revocation checks are disabled on Windows. This can be useful when working with a corporate SSL MITM proxy that does not properly implement revocation checks. Do not use this unless absolutely necessary.

`SENTRY_HTTP_MAX_RETRIES` (*http.max\_retries*):

Sets the maximum number of retry attempts for HTTP requests, which may be experiencing a transient failure. The default is `5`.

(*ui.show\_notifications*):

If this is set to false some operating system notifications are disabled. This currently primarily affects xcode builds which will not show notifications for background builds.

`SENTRY_LOG_LEVEL` (*log.level*):

Configures the log level for the SDK. The default is `warn`. If you want to see what the library is doing you can set it to `info` which will spit out more information which might help to debug some issues with permissions. Possible values are `trace`, `debug`, `info`, `warn`, and `error`.

(*dif.max\_upload\_size*):

Sets the maximum upload size in bytes (before compression) of debug symbols into one batch. The default is 35MB or 100MB (depending on the version of sentry-cli) which is suitable for sentry.io but if you are using a different Sentry server you might want to change this limit if necessary. (Prior to version 1.72.0, this option was called `dsym.max_upload_size`.)

(*dif.max\_item\_size*):

Sets the maximum file size of a single file inside DIF bundle. The default is 1MB.

`SENTRY_DISABLE_UPDATE_CHECK` (*update.disable\_check*):

If set to `true`, then the automatic update check in sentry-cli is disabled. The update check is also not enabled for npm based installations of sentry-cli at the moment.

`SENTRY_NO_PROGRESS_BAR`:

If set to `1`, then `sentry-cli` will not display progress bars for any operations.

`SENTRY_LOAD_DOTENV`:

Set to `0` to prevent sentry-cli from loading an `.env` file.

`SENTRY_DOTENV_PATH`:

Specify a path to `.env` file to be loaded during setup. This was introduced in version 1.70.

`DEVICE_FAMILY` (*device.family*):

Device family value reported to Sentry.

`DEVICE_MODEL` (*device.model*):

Device model value reported to Sentry.

## [Validating The Config](https://docs.sentry.io/cli/configuration.md#validating-the-config)

To make sure everything works you can run `sentry-cli info` and it should print out some basic information about the Sentry installation you connect to as well as some authentication information.

## [Working with Projects](https://docs.sentry.io/cli/configuration.md#working-with-projects)

Many commands require you to specify the organization and project to work with. There are multiple ways in which you can specify this.

### [Config Defaults](https://docs.sentry.io/cli/configuration.md#config-defaults)

If you are always working with the same projects you can set it in the `.sentryclirc` file:

```ini
[defaults]
project=my-project
org=my-org
```

### [Environment Variables](https://docs.sentry.io/cli/configuration.md#environment-variables)

You can also set these defaults in environment variables. There are two environment variables that control this (`SENTRY_ORG` and `SENTRY_PROJECT`) which you can export:

```bash
export SENTRY_ORG=my-org
export SENTRY_PROJECT=my-project
```

### [Properties Files](https://docs.sentry.io/cli/configuration.md#properties-files)

Additionally `sentry-cli` supports loading configuration values from `.properties` files (common in the Java environment). You can instruct `sentry-cli` to load config files from there by exporting the path to a properties file in the `SENTRY_PROPERTIES` environment variable. This is commonly done automatically for some of our client integrations like [Java](https://docs.sentry.io/platforms/java.md) and [React Native](https://docs.sentry.io/platforms/react-native.md).

Inside the properties files you just use the dotted notation to set values. Example:

```ini
defaults.url=https://mysentry.invalid/
```

To then instruct `sentry-cli` to use that file use this:

```bash
export SENTRY_PROPERTIES=/path/to/sentry.properties
sentry-cli ...
```

### [Explicit Options](https://docs.sentry.io/cli/configuration.md#explicit-options)

Lastly you can also provide these values explicitly to the command you are executing. The parameters are always called `--org` or `-o` for the organization and `--project` or `-p` for the project.

Note that they do not always go to the same command. For instance if you are managing releases (which are shared across the organization) you usually supply the organization to the `releases` command but the projects to the subcommand on it:

```bash
sentry-cli releases -o my-org new -p my-project 1.0
```

For more information use the `help` command which will display documentation for all parameters.
