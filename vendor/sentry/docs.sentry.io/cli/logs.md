---
title: "Logs"
description: "Learn how to view and stream logs using the Sentry CLI."
url: https://docs.sentry.io/cli/logs/
---

# Logs

The `sentry-cli` tool can be used to view and stream logs from your Sentry projects. This allows you to monitor your application logs directly from the command line.

## [Requirements](https://docs.sentry.io/cli/logs.md#requirements)

To use the logs command, you need to:

* [Install](https://docs.sentry.io/cli/installation.md) the Sentry CLI
* [Authenticate](https://docs.sentry.io/cli/configuration.md) with Sentry using an auth token
* Have logs enabled for your project

## [Configuration](https://docs.sentry.io/cli/logs.md#configuration)

The logs command uses your Sentry auth token for authentication. You can configure this using:

```bash
sentry-cli login
```

Or by setting the `SENTRY_AUTH_TOKEN` environment variable:

```bash
export SENTRY_AUTH_TOKEN=<your-sentry-auth-token>
```

Learn more about the CLI's [configuration file](https://docs.sentry.io/cli/configuration.md#configuration-file).

## [Basic Usage](https://docs.sentry.io/cli/logs.md#basic-usage)

The logs command supports two main operations: listing logs and streaming logs in real-time.

### [List Logs](https://docs.sentry.io/cli/logs.md#list-logs)

To fetch and display logs:

```bash
sentry-cli logs list --project=my-project --org=my-org
```

### [Stream Logs](https://docs.sentry.io/cli/logs.md#stream-logs)

To continuously stream logs in real-time:

```bash
sentry-cli logs list --project=my-project --org=my-org --live
```

The live streaming mode will continuously poll for new logs and display them as they arrive.

## [Command Options](https://docs.sentry.io/cli/logs.md#command-options)

### [Project and Organization](https://docs.sentry.io/cli/logs.md#project-and-organization)

Specify the project and organization explicitly:

```bash
sentry-cli logs list --project=my-project --org=my-org
```

Or use the default values from your configuration file.

## [Examples](https://docs.sentry.io/cli/logs.md#examples)

### [Monitor Application Logs](https://docs.sentry.io/cli/logs.md#monitor-application-logs)

Stream logs from your production application:

```bash
sentry-cli logs list --project=my-app --org=my-org --live
```

### [View Recent Logs](https://docs.sentry.io/cli/logs.md#view-recent-logs)

Fetch and display logs from your project:

```bash
sentry-cli logs list --project=my-app --org=my-org
```

## [Output Format](https://docs.sentry.io/cli/logs.md#output-format)

The logs command displays log entries with the following information:

* Timestamp
* Log level
* Message
* Trace ID (if present)

Log entries are displayed in a readable format, making it easy to monitor your application's logging output directly from the command line.
