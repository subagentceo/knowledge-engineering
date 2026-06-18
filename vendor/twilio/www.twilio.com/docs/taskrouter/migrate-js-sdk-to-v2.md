# Upgrade to TaskRouter SDK version 2

If you are using Twilio TaskRouter SDK version 1, it's critical that you update to version 2 to ensure that your systems stay current, robust, and well-supported with the latest improvements and developments. TaskRouter SDK version 2 is not just the newer version, but it is the platform that Twilio will provide long-term support for.

**Note**: Updates and support for TaskRouter SDK version 1 will be discontinued, and only version 2 will continue to be updated.

## New features and key updates

* [Promises instead of callbacks](#promises-instead-of-callbacks): Callbacks have been replaced with promises. Promises have become the standard for JS SDK apps.
* [Worker activity management](#activity-access-changes): A worker now has an activity object tied to it, rather than being defined by properties.
* [Workspace activity list fetching](#fetching-workspace-activities): Version 2 provides a more intuitive way to fetch the activity list for the workspace.
* [Update worker activity](#updating-worker-activity): Activity updates are more intuitive and handled more efficiently in version 2.
* [Event name titles](#event-listening): Event names are updated to match the new standard.
* [Nested reservation handlers](#reservation-event-handling): Version 2 requires an event handler for reservation before listening to other types of reservation events, such as `accepted`, `canceled`, `rejected`, `rescinded`, and `timed out`.
* Performance enhancements: Version 2 reduces the need for multiple round-trips to the API by:

  * Sending the full task and reservation payload to the JS SDK.
  * Allowing all active tasks and reservations for the worker to be listed in memory.

  As a result of these updates, a hard refresh is required to re-fetch from the API in version 2.
* Transfers and wrapping a reservation or task: These are features only supported in version 2.

## Breaking changes and updates

When you migrate to TaskRouter SDK version 2, you'll need to make updates for the following changes:

* DisconnectActivitySid: No longer available in version 2.
* Tokens: Version 2 uses grant-based tokens, not REST API tokens as in version 1.
* API usage: Version 2 uses the TaskRouter version 1 API. There is no TaskRouter version 2 API.
* Workspace and TaskQueue JS SDKs: These SDKs have been updated for version 2.

## Upgrade steps

Complete the following steps to upgrade to TaskRouter SDK version 2 and address any breaking changes.

1. Update the project reference to use TaskRouter SDK version 2.
2. [Reconfigure callback functions to use promises](#promises-instead-of-callbacks).
3. Update workers, events, and reservations as necessary. For more information, see [Version 2 update details and examples](#version-2-update-details-and-examples) below.
4. Test all your integrations to ensure they work correctly on the new SDK.

The main changes from v1 to v2 are the migration of callbacks to promises and different organization of the worker's activity and event handling. The SDK is now more efficient, accomplished by sending the entire Task and Reservation payload down the JS SDK and listing all active Tasks and Reservations for the Worker in memory.

## Version 2 update details and examples

Use the information in this section to update your workers, events, and reservations for version 2.

### Promises instead of callbacks

Version 2 uses promises instead of callbacks.

#### Version 1

```javascript
worker.on("ready", function (worker) {
  updateWorker(worker);
});
```

#### Version 2

```javascript
worker.on("ready", () => {
  updateWorker(worker);
});
```

### Activity access changes

In version 1, the activity was defined by properties. In version 2, the worker has an activity object instead.

#### Version 1 \[#version-1-2]

```javascript
function updateWorker(worker) {
  console.log(worker.activityName);
  console.log(worker.available);
}
```

#### Version 2 \[#version-2-2]

```javascript
function updateWorker(worker) {
  console.log(worker.activity.name);
  console.log(worker.activity.available);
}
```

### Fetching workspace activities

Version 1 used a `fetchActivityList` function call to fetch the API workspace activity list. In version 2, you can simply loop through `worker.activities`.

#### Version 1 \[#version-1-3]

```javascript
worker.fetchActivityList(
    function(error, activityList) { //body} );
```

#### Version 2 \[#version-2-3]

```javascript
worker.activities.forEach((activity) => {
  console.log(activity.name);
});
```

### Fetching workspace workers

Starting from Version 2.1.0, both `fetchWorker()` and `fetchWorkers()` are deprecated.
You should now use `fetchWorkerInfo()` and \`fetchWorkersInfo(), respectively.

* `fetchWorkerInfo()` returns a single WorkerInfo object for the specified worker.
* `fetchWorkersInfo()` returns a map of string and WorkerInfo, allowing you to retrieve multiple workers' information.

#### Version 1 \[#version-1-4]

```javascript
const workspace = new Workspace("WSxxxx");

workspace.fetchWorker("WKxxxxxx").then(worker => {
  console.log(worker.info)
});

workspace.fetchWorkers({ FriendlyName: 'Alice' }).then(workers => {
    for (const worker of workers.values()) {
        console.log(worker.friendlyName)
    }
});
```

#### Version 2 \[#version-2-4]

```javascript
const workspace = new Workspace("WSxxxx");

workspace.fetchWorkerInfo("WKxxxxxx").then(worker => {
  console.log(worker.info)
});

workspace.fetchWorkersInfo({ FriendlyName: 'Alice' }).then(workers => {
    for (const worker of workers.values()) {
        console.log(worker.friendlyName)
    }
});
```

### Updating worker activity

#### Version 1 \[#version-1-5]

```javascript
worker.updateActivity(onlineActivitySid);
```

#### Version 2 \[#version-2-5]

```javascript
worker.activities.forEach((activity) => {
  if (activity.name === "Idle") {
    activity.setAsCurrent().then(() => {
      console.log(worker.activity.name);
    });
  }
});
```

### Event listening

#### Version 1 \[#version-1-6]

```javascript
worker.on("activity.update", function (worker) {
  updateWorker(worker);
});
```

#### Version 2 \[#version-2-6]

```javascript
worker.on("activityUpdated", function (worker) {
  updateWorker(worker);
});
```

### Reservation event handling

In version 2, you must have an event handler for reservation before you can listen for reservation events (accepted, canceled, rejected, rescinded, and timed out).

#### Version 1 \[#version-1-7]

```javascript
worker.on("reservation.accepted", function (reservation) {
  console.log(reservation.task.attributes);
});
```

#### Version 2 \[#version-2-7]

```javascript
worker.on("reservationCreated", function(reservation) {
    reservation.on("accepted", function(reservation) {
        console.log(reservation.task.attributes);
    });
});
```
