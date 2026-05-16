---
title: "Data Forwarding"
description: "Learn about forwarding processed events to third-party providers."
url: https://docs.sentry.io/integrations/data-forwarding/
---

# Data Forwarding

This feature is available only if your organization is on [a Trial, Business, or Enterprise plan](https://sentry.io/pricing/).

Sentry provides the ability to forward processed error events to certain third-party providers, namely [Segment](https://segment.com), [Amazon SQS](https://aws.amazon.com/sqs/), and [Splunk](https://www.splunk.com/).

This is often useful when you may want to analyze errors in relation to other datasets, empower teams outside of engineering, and other business intelligence use cases. Currently, only error events will be forwarded. Forwarding of other event types (such as spans or logs) is not supported.

For more details on setup and troubleshooting with specific data forwarders, refer to the provider documentation below:

* [Splunk](https://docs.sentry.io/integrations/data-forwarding/splunk.md)
* [Amazon SQS](https://docs.sentry.io/integrations/data-forwarding/amazon-sqs.md)
* [Segment](https://docs.sentry.io/integrations/data-forwarding/segment.md)

Note: Grafana is not a first-party data forwarder, and must be configured separately. For more details, refer to the [these docs](https://docs.sentry.io/integrations/data-forwarding/grafana.md).

## [Global Configuration](https://docs.sentry.io/integrations/data-forwarding.md#global-configuration)

Sentry owner or manager permissions are required to setup/modify a global data forwarder.

With a global data forwarding configuration, you can setup a single forwarder for your organization and apply it to how ever many projects you'd like, with the additional ability to automatically begin forwarding events from new projects as soon as they're created.

To setup a global forwarder, navigate to **Settings » Data Forwarding**, and start the setup for a new provider. Note that we only allow one forwarder per provider per organization.

When creating a new forwarder, select the provider you'd like to forward events to and fill in the required fields. Each provider requires different configuration and permissions on that service, so please refer to the documentation below for more details on your specific provider. After a forwarder is created, you will not be able to switch providers, but you can modify the forwarding details at any time.

You cannot create project-level overrides until you've setup the forwarder for the first time. Any projects you connect to the forwarder will begin forwarding (with the global configuration) as soon you complete the setup. You can also specify if new projects should automatically adopt the global configuration now.

After completing the setup, you will be redirected to the forwarder list page, where you can see the newly-enabled forwarder and it's current status. Now you can edit the forwarder to add project-level overrides, if necessary.

## [Project Overrides](https://docs.sentry.io/integrations/data-forwarding.md#project-overrides)

Owner, manager, or admin permissions are required to create/modify project-level overrides.

Users with Team Admin permissions can create/modify overrides as well, but only for their respective teams' projects.

You can manage your project overrides by navigating to **Settings » Data Forwarding » \[Provider] » Edit** and scrolling to **Manage your overrides**.

A project override will allow you to replace specified fields in the global configuration with custom values for a particular project. All the previously required fields on the provider are marked as optional, and only the specified fields will be overridden. If no value is provided for a field, the global configuration will be used.

Empty values (`""`) are permitted in the override form, so manually deleting an override will *not* revert to the global configuration. If you wish to remove an override, be sure to click the **Clear Override** button at the bottom of the form. After saving, be sure to check the status of the override in the corner of it's form.

### [Migrating from Legacy Integrations](https://docs.sentry.io/integrations/data-forwarding.md#migrating-from-legacy-integrations)

If you've been a Sentry customer for a while, you may have seen a legacy version of data forwarding which was applied at the project level through legacy integrations (plugins). This is no longer supported, and organizations should see they've been automatically migrated to the new global (organization-level) configuration.

The migration process will retain all the project-level configuration using the project-overrides, which you can manage/modify as needed.

## [Troubleshooting](https://docs.sentry.io/integrations/data-forwarding.md#troubleshooting)

For provider-specific troubleshooting, refer to the provider documentation below:

* [Splunk](https://docs.sentry.io/integrations/data-forwarding/splunk.md#troubleshooting)
* [Amazon SQS](https://docs.sentry.io/integrations/data-forwarding/amazon-sqs.md#troubleshooting)
* [Segment](https://docs.sentry.io/integrations/data-forwarding/segment.md#troubleshooting)
* [Grafana (Third-Party)](https://docs.sentry.io/integrations/data-forwarding/grafana.md)

## Pages in this section

- [Splunk](https://docs.sentry.io/integrations/data-forwarding/splunk.md)
- [Segment](https://docs.sentry.io/integrations/data-forwarding/segment.md)
- [Amazon SQS](https://docs.sentry.io/integrations/data-forwarding/amazon-sqs.md)
- [Grafana](https://docs.sentry.io/integrations/data-forwarding/grafana.md)
