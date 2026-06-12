---
title: "Crons (CLI)"
description: "Follow this guide to set up and manage monitors using the Sentry CLI."
url: https://docs.sentry.io/cli/crons/
---

# Crons (CLI)

##### Deprecation Notice

Starting with v2.16.1 of the Sentry CLI, the ability to monitor check-ins using an auth token for authorization has been deprecated. Read on to learn how to update your CLI and use your project's DSN instead.

Sentry Crons allows you to monitor the uptime and performance of any scheduled, recurring job. Once implemented, it'll allow you to get alerts and metrics to help you solve errors, detect timeouts, and prevent disruptions to your service.

## [Requirements](https://docs.sentry.io/cli/crons.md#requirements)

To begin monitoring your recurring, scheduled job:

* [Install](https://docs.sentry.io/cli/installation.md) the Sentry CLI (min v2.16.1).
* Create and configure your first Monitor in [Sentry](https://sentry.io/issues/alerts/new/crons/) or [via the CLI](https://docs.sentry.io/cli/crons.md#creating-or-updating-a-monitor-through-a-check-in-optional).

## [Configuration](https://docs.sentry.io/cli/crons.md#configuration)

The Sentry CLI uses your Monitor's project DSN to authorize check-ins. To set it up, export the `SENTRY_DSN` environment variable:

```bash
export SENTRY_DSN=https://<key>@o<orgId>.ingest.sentry.io/<projectId>
```

Alternatively, you can add it to your `~/.sentryclirc` config:

```ini
[auth]
dsn = https://<key>@o<orgId>.ingest.sentry.io/<projectId>
```

Learn more about the CLI's [configuration file](https://docs.sentry.io/cli/configuration.md#configuration-file).

## [Job Monitoring](https://docs.sentry.io/cli/crons.md#job-monitoring)

Use the Sentry CLI to run your job and notify you if it doesn't start when expected (missed) or if it exceeded its maximum runtime (failed).

```bash
sentry-cli monitors run <monitor_slug> -- <command> <args>
```

Usage examples:

```bash
sentry-cli monitors run my-monitor-slug -- python path/to/file.py
```

*Other available variations of the above snippet: Node.JS*

### [Creating or Updating a Monitor Through a Check-In (Optional)](https://docs.sentry.io/cli/crons.md#creating-or-updating-a-monitor-through-a-check-in-optional)

You can also use the Sentry CLI to create or update your cron monitor when you run your job. This way, you can avoid having to first set up the monitor through the Sentry web interface.

Configure the cron monitor by providing the cron schedule in crontab format using the `--schedule` or the equivalent `-s` argument when executing the `sentry cli monitors run` command. Please make sure to enclose the schedule in quotes, so that your shell parses the argument correctly, like so:

```bash
sentry-cli monitors run --schedule "<expected schedule>" <monitor-slug> -- <command> <args>
```

When providing the `--schedule` argument, we also support the following optional arguments to provide additional configuration:

* `--check-in-margin`: The allowed margin of minutes after the expected check-in time that the monitor will not be considered missed for.
* `--max-runtime`: The allowed duration in minutes that the monitor may be in progress for before being considered failed due to timeout.
* `--timezone`: A valid [tz database identifier string](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List) (e.g. "Europe/Vienna") representing the monitor's execution schedule's timezone.

Below are some usage examples:

```bash
sentry-cli monitors run -s "* * * * *" -- my-command
```

*Other available variations of the above snippet: Every Hour (+ Optional Arguments)*

### [Specifying Monitor Environments (Optional)](https://docs.sentry.io/cli/crons.md#specifying-monitor-environments-optional)

If your cron monitor runs in multiple environments you can use the `-e` flag to specify which [Monitor Environment](https://docs.sentry.io/product/monitors-and-alerts/monitors/crons/job-monitoring.md#multiple-environments) to send check-ins to.

```bash
sentry-cli monitors run -e dev my-monitor-slug -- node path/to/file.js
```
