# Event de-duplication

The API may detect and ignore duplicate events. Each event is uniquely identified as a combination of the following data - the App identifier, the User identifier, the Event name, the Event created time and the Event metadata. As a result, it is **strongly recommended** to send a second granularity Unix timestamp in the `created_at` field.

Duplicated events are responded to using the normal `202 Accepted` code - an error is not thrown, however repeat requests will be counted against any rate limit that is in place.