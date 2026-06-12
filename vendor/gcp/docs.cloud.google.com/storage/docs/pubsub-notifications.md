# Pub/Sub notifications for Cloud Storage

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Storage
*   Cloud Storage
*   Guides

Send feedback

# Pub/Sub notifications for Cloud Storage Stay organized with collections Save and categorize content based on your preferences.

Setup

This page provides an overview of Pub/Sub notifications for Cloud Storage.

## Overview

Pub/Sub notifications sends information about changes to objects in your buckets to Pub/Sub, where the information is added to a Pub/Sub topic of your choice in the form of messages. For example, you can track objects that are created and deleted in your bucket. Each notification contains information describing both the event that triggered it and the object that changed.

You can send notifications to any Pub/Sub topic in any project for which you have sufficient permissions. Once received by the Pub/Sub topic, subscribers to the topic can receive the associated message. See Configure Pub/Sub notifications for Cloud Storage for information on connecting your Cloud Storage buckets to a Pub/Sub topic.

**Note:** When enabled, events that trigger notifications take slightly longer to complete. This impact is on the order of 0.1 seconds.

### Other notification options

Subscribing to Pub/Sub notifications is a versatile way to trigger alerts and actions in response to changes in a bucket. The following options are also available:

*   **Cloud Run functions**: If you only want to trigger a lightweight, stand-alone function in response to events and don't want to manage a Pub/Sub topic, use Cloud Run functions. Cloud Run functions allow you to execute C#, Go, Java, Node.js, Python, PHP, and Ruby functions when an object in your bucket changes. Note that your bucket must reside in the same project as Cloud Run functions. See the associated tutorial for a demonstration of using Cloud Run functions with Cloud Storage.

## Notification configurations

A _notification configuration_ is a rule you attach to a bucket that specifies:

*   The topic in Pub/Sub that receives notifications.
*   The events that trigger a notification to be sent.
*   The information contained within notifications.

You can attach multiple notification configurations to a bucket. A bucket can have up to 100 total notification configurations and up to 10 notification configurations set to trigger for a specific event.

For example, if you have a notification configuration that sends deletion notifications to one Pub/Sub topic, you can add a second notification configuration to the bucket that sends deletion notifications to another topic. However, if you try to create more than 10 notification configurations that do this, you receive an error. In addition to these notification configurations, you can also create notification configurations that send notifications for other events, such as object creation, either to Pub/Sub topics used by the deletion notifications, or to different topics.

Each notification configuration is identified by an integer. This integer is returned:

*   When you create the notification configuration.
*   When you list the notification configurations attached to a bucket.
*   In the `notificationConfig` attribute of each notification triggered by the notification configuration.

Creating and deleting notification configurations increment a bucket's metageneration number.

## Event types

The following is a list of event types supported by Cloud Storage:

Event type

Description

`OBJECT_FINALIZE`

Sent when a new object (or a new generation of an existing object) is successfully created in the bucket. This includes copying, rewriting, or restoring an existing object. This also includes finalizing an object in a zonal bucket. A failed upload does not trigger this event.

`OBJECT_INITIALIZE`

Sent when an object starts creation in a zonal bucket.

`OBJECT_METADATA_UPDATE`

Sent when the metadata of an existing object changes.

`OBJECT_DELETE`

Sent when an object has been permanently deleted. This includes objects that are replaced or deleted as part of the bucket's lifecycle configuration. This does not include objects that become noncurrent (see `OBJECT_ARCHIVE`) or aborted multipart uploads.

`OBJECT_ARCHIVE`

Only sent when a bucket has enabled object versioning. This event indicates that the live version of an object has become a noncurrent version, either because it was explicitly made noncurrent or because it was replaced by the upload of an object of the same name.

For other Cloud Storage events, such as bucket operations or object reads, you can enable the appropriate type of audit log in Cloud Audit Logs and route the audit logs to Pub/Sub using a filter.

### Replacing objects

Replacing an existing object with a new one of the same name triggers two separate events: `OBJECT_FINALIZE` for the new version of the object and either `OBJECT_ARCHIVE` or `OBJECT_DELETE` for the replaced object. The `OBJECT_FINALIZE` event contains an additional attribute `overwroteGeneration`, which provides the generation number of the object that was replaced. The `OBJECT_ARCHIVE` or `OBJECT_DELETE` event contains an additional attribute `overwrittenByGeneration`, which provides the generation number of the new object.

## Notification format

Notifications sent to the Pub/Sub topic consist of two parts:

*   **Attributes**: A set of key:value pairs describing the event.
*   **Payload**: A string that contains the metadata of the changed object.

### Attributes

Attributes are key:value pairs contained in all notifications sent by Cloud Storage to your Pub/Sub topic. Notifications always contain the following set of key:value pairs, regardless of the notification's payload:

Attribute name

Example

Description

**notificationConfig**

`projects/_/buckets/foo/notificationConfigs/3`

An identifier for the notification configuration that triggered this notification.

**eventType**

`OBJECT_FINALIZE`

The type of event that has just occurred. See Event types for a list of possible values.

**payloadFormat**

`JSON_API_V1`

The format of the object payload. See Payload for a list of possible values.

**bucketId**

`foo`

The name of the bucket that contains the changed object.

**objectId**

`bar`

The name of the changed object.

**objectGeneration**

`123456`

The generation number of the changed object.

**eventTime**

`2021-01-15T01:30:15.01Z`

The time that the event took place, expressed in the RFC 3339 format.

Notifications sometimes contain the following set of key:value pairs, regardless of the notification's payload:

Attribute name

Example

Description

**overwrittenByGeneration**

`107458`

The generation number of the object that replaced the object that this notification pertains to. This attribute only appears in `OBJECT_ARCHIVE` or `OBJECT_DELETE` events in the case of a replacement.

**overwroteGeneration**

`352947`

The generation number of the object that was replaced by the object that this notification pertains to. This attribute only appears in `OBJECT_FINALIZE` events in the case of a replacement.

In addition to the above attributes, a notification configuration can contain up to 10 custom attributes. Custom attributes are defined when creating a notification configuration, using the `--custom-attributes` in a `gcloud storage` command, or the `custom_attributes` object in the body of a `POST notificationConfigs` JSON request.

### Payload

The payload is a string that contains the metadata of the changed object. When you create a notification configuration, you specify a type of payload to include in notifications triggered by that configuration. You can specify the following types of payload:

Payload type

Description

**NONE**

No payload is included with the notification.

**JSON_API_V1**

The payload will be a UTF-8 string containing the resource representation of the object’s metadata.

For `OBJECT_DELETE` notifications, the metadata contained in the payload represents the object metadata as it was before the delete, along with an additional `timeDeleted` property. For all other notifications, the metadata included in the payload represents the object metadata _after_ the change occurs.

For example, say you have a notification configuration that tracks `OBJECT_METADATA_UPDATE` events. If a user changes the `contentType` property of an object from `binary/octet-stream` to `video/mp4`, an `OBJECT_METADATA_UPDATE` notification is sent, and the metadata in the payload includes `"contentType":"video/mp4"`.

## Delivery guarantees

**Important:** There is no SLA for delivery time, but notifications are typically delivered within seconds. In some circumstances notifications might be delayed substantially longer.

When you add a notification configuration, Cloud Storage may take up to 30 seconds to begin sending notifications associated with it. Once started, Cloud Storage guarantees at-least-once delivery to Pub/Sub. Pub/Sub also offers at-least-once delivery to the recipient, which means that you could receive multiple messages, with multiple IDs, that represent the same Cloud Storage event.

Notifications are not guaranteed to be published in the order Pub/Sub receives them. If you plan to modify the Cloud Storage object based on a notification, it is recommended that you use the object's generation and metageneration numbers as preconditions on your update request.

If a notification consistently cannot be delivered to a Pub/Sub topic, Cloud Storage may delete the notification after 7 days. Delivery failure can occur when the Pub/Sub topic no longer exists, when Cloud Storage no longer has permission to publish to the topic, or when the project that owns the topic exceeds its publishing quota.

## What's next

*   Configure Pub/Sub notifications for Cloud Storage.
*   Learn more about Pub/Sub.
*   Subscribe a bucket to receive notifications sent to Pub/Sub.
*   Use Cloud Run functions to deliver events with a Cloud Storage trigger.
*   Use Pub/Sub notifications for event-driven transfers between Cloud Storage buckets.

Send feedback