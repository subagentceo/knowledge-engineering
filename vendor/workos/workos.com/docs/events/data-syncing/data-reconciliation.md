# Data reconciliation

## Introduction

While the events API makes it easier to keep your app in sync with WorkOS, there may still be cases where your app gets out of sync. For example, your app may have a bug in its event processing logic or in rarer cases, may experience some data loss.

Data reconciliation refers to the process of comparing and aligning the state of objects between WorkOS and your app to ensure consistency. Depending on the scope of the issue, you can reconcile your app state by either replaying events from the [events API](https://workos.com/docs/reference/events) or by using the WorkOS [state API](https://workos.com/docs/reference).

## Definitions

**Data reconciliation**
: Refers to the process of comparing and aligning data from different sources or systems to ensure consistency and accuracy. The goal of data reconciliation is to ensure that all relevant data sources are synchronized and reflect the same information.

**Event replay**
: Is the act of reprocessing recorded events in an app. It is used to recreate past event sequences for debugging, testing, auditing, or ensuring data consistency.

**Side effects**
: These are secondary consequences that arise from data modifications in an app. They can alter related data, trigger additional processes, update external systems, or affect the app's overall state. e.g., Sending an email on a user's profile change.

**Periodic reconciliation**
: Is the regular process of comparing and synchronizing data between systems to ensure accuracy and consistency. It involves scheduled checks to identify and resolve discrepancies in data integrity.

## Reconciling via the events API

In general, reconciling state changes between WorkOS and your app using the events API is simplest. Pick your cursor, which is usually the last known cursor you have processed, and paginate through events using the `after` parameter.

For special cases such as webhook migration or event replay, you can specify a starting time for event consumption using the `range_start` parameter.

### Handling side effects in the case of event replay

Side effects, such as sending emails, updating 3rd party APIs, or performing other actions specific to your app, present challenges during event replay.

Separating data handling from business logic allows you to exercise control over what actions you want your app to make. This allows your app to replay events to sync data but bypass transactional logic e.g., not sending out the same email twice.

## Reconciling via the WorkOS state API

Your app may perform data reconciliation by syncing state via the WorkOS [state APIs](https://workos.com/docs/reference) e.g., in disaster recovery scenarios.

Data reconciliation using state APIs requires performing diffs to identify deletions to ensure the correct state is maintained. This introduces additional complexity, making it essential to carefully design and test the reconciliation process.

The general approach for reconciling data via the state API is as follows:

1. Pull state from WorkOS API for the objects your app is interested in.
2. Update based on `updated_at`. If the timestamp is out of date, update the object.
3. Identify deactivated objects or deletions and sync that state.

If you need to force all objects to update state, perform a complete resynchronization of the affected data instead of relying solely on the `updated_at` timestamp. Update all objects regardless of the individual `updated_at` timestamp.

### Considerations for periodic reconciliation

In some cases, you may want to run periodic reconciliation jobs to proactively check and reconcile the state between WorkOS and your app. When implementing such jobs, it is important to account for potential race conditions for concurrent updates. Additionally, consider the specific characteristics of your app to determine the frequency and scope of periodic reconciliation.
