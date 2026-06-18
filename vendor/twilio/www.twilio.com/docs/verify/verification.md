# Verification Stream

## Verification status events

Verification Status tracks the overall lifecycle of a verification — from creation to resolution. It fires events when a verification transitions between states: PENDING, APPROVED, CANCELED, EXPIRED, or MAX\_ATTEMPTS\_REACHED. Each event includes the full context of the verification: all send code attempts, all check attempts, and timestamps for each state change.

## Event types

You can subscribe to five verification status events through [Event Streams](/docs/events), representing different states of a verification.

| Event type                        | Event type string                                                     | Description and timing                                                                                                                                                                                                                                                                        |
| --------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Verification pending              | `com.twilio.accountsecurity.verify.verification.pending`              | This event fires after a successful [Start New Verification API call](/docs/verify/api/verification#start-new-verification), when the verification is pending further action from the end user or client.                                                                                     |
| Verification approved             | `com.twilio.accountsecurity.verify.verification.approved`             | This event fires after a [Check Verification API call](/docs/verify/api/verification-check#check-a-verification) returns an `approved` status, or after an [Update a Verification Status API call](/docs/verify/api/verification#update-a-verification-status) sets the status to `approved`. |
| Verification canceled             | `com.twilio.accountsecurity.verify.verification.canceled`             | This event fires after an [Update a Verification Status API call](/docs/verify/api/verification#update-a-verification-status) sets the verification status to `canceled`.                                                                                                                     |
| Verification expired              | `com.twilio.accountsecurity.verify.verification.expired`              | This event fires after a verification expires. The default expiration time is 10 minutes after creation.                                                                                                                                                                                      |
| Verification max attempts reached | `com.twilio.accountsecurity.verify.verification.max-attempts-reached` | This event fires after a verification fails from 5 or more send or check attempts.                                                                                                                                                                                                            |

## Sample event payloads

```json title="Sample event payload with custom code disabled"
[
  {
    "specversion": "1.0",
    "type": "com.twilio.accountsecurity.verify.verification.approved",
    "source": "/v1/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "id": "50ae352aa7c98cbae53b8d0e6c0767b9a445b74e029bfb4f8c7d6efba8ca260b",
    "dataschema": "https://events-schemas.twilio.com/AccountSecurity.VerifyEventStreamEvent/1",
    "datacontenttype": "application/json",
    "time": "2022-02-02T09:20:25.336Z",
    "data": {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "verification_sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "my service",
      "custom_code_enabled": false,
      "custom_friendly_name": "custom friendly name",
      "created_at": "2022-02-02T09:20:25.336676Z",
      "verified_at": "2022-02-02T09:20:25.336676Z",
      "to": "+919999999999",
      "verification_status": "APPROVED",
      "country": "IN",
      "code_length": 4,
      "send_code_attempts": {
        "count": 2,
        "attempts": [
          {
            "time": "2022-08-24T12:49:09.598837Z",
            "channel": "SMS",
            "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
            "locale": "en",
            "tags": {
              "custom_tag": "test tag 1",
              "custom_tag_2": "test tag 1_2"
            }
          },
          {
            "time": "2022-08-24T12:49:44.356564Z",
            "channel": "SMS",
            "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2",
            "locale": "en",
            "tags": {
              "custom_tag": "test tag 2",
              "custom_tag_2": "test tag 2_2"
            }
          }
        ]
      },
      "check_attempts": {
        "count": 1,
        "attempts": [
          {
            "time": "2022-02-02T09:20:25.336676Z",
            "status": "SUCCESS"
          }
        ]
      },
      "expired_at": "2022-02-02T09:30:25.336676Z"
    }
  }
]
```

```json title="Sample event payload with custom code enabled and feedback disabled"
[
  {
    "specversion": "1.0",
    "type": "com.twilio.accountsecurity.verify.verification.pending",
    "source": "/v1/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "id": "50ae352aa7c98cbae53b8d0e6c0767b9a445b74e029bfb4f8c7d6efba8ca260b",
    "dataschema": "https://events-schemas.twilio.com/AccountSecurity.VerifyEventStreamEvent/1",
    "datacontenttype": "application/json",
    "time": "2022-02-02T09:20:25.336Z",
    "data": {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "verification_sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "my service",
      "custom_code_enabled": true,
      "custom_friendly_name": "custom friendly name",
      "created_at": "2022-02-02T09:20:25.336676Z",
      "to": "+919999999999",
      "verification_status": "PENDING",
      "country": "IN",
      "send_code_attempts": {
        "count": 2,
        "attempts": [
          {
            "time": "2022-08-24T12:49:09.598837Z",
            "channel": "SMS",
            "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
            "locale": "en",
            "tags": {
              "custom_tag": "test tag 1"
            }
          },
          {
            "time": "2022-08-24T12:49:44.356564Z",
            "channel": "SMS",
            "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2",
            "locale": "en",
            "tags": {
              "custom_tag": "test tag 2"
            }
          }
        ]
      },
      "check_attempts": {
        "count": 0
      },
      "expired_at": "2022-02-02T09:30:25.336676Z"
    }
  }
]
```

```json title="Sample event payload with custom code enabled and feedback enabled"
[
  {
    "specversion": "1.0",
    "type": "com.twilio.accountsecurity.verify.verification.approved",
    "source": "/v1/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "id": "50ae352aa7c98cbae53b8d0e6c0767b9a445b74e029bfb4f8c7d6efba8ca260b",
    "dataschema": "https://events-schemas.twilio.com/AccountSecurity.VerifyEventStreamEvent/1",
    "datacontenttype": "application/json",
    "time": "2022-02-02T09:20:25.336Z",
    "data": {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "verification_sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "my service",
      "custom_code_enabled": true,
      "custom_friendly_name": "custom friendly name",
      "created_at": "2022-02-02T09:20:25.336676Z",
      "verified_at": "2022-02-02T09:20:25.336676Z",
      "to": "+919999999999",
      "verification_status": "APPROVED",
      "country": "IN",
      "send_code_attempts": {
        "count": 2,
        "attempts": [
          {
            "time": "2022-08-24T12:49:09.598837Z",
            "channel": "SMS",
            "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
            "locale": "en",
            "tags": {
              "custom_tag": "test tag 1",
              "custom_tag_2": "test tag 1_2"
            }
          },
          {
            "time": "2022-08-24T12:49:44.356564Z",
            "channel": "SMS",
            "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2",
            "locale": "en",
            "tags": {
              "custom_tag": "test tag 2",
              "custom_tag_2": "test tag 2_2"
            }
          }
        ]
      },
      "check_attempts": {
        "count": 1,
        "attempts": [
          {
            "time": "2022-02-02T09:20:25.336676Z",
            "status": "SUCCESS"
          }
        ]
      },
      "expired_at": "2022-02-02T09:30:25.336676Z"
    }
  }
]
```

## Event resource properties

The verification status events you receive are based on a common schema of the following properties. Some properties are only present if they apply to that specific verification event; otherwise, they are `null`.

| Property               | Type      | Description                                                                                                                                   |
| ---------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `account_sid`          | `string`  | The SID of the Account that created the Verification.                                                                                         |
| `service_sid`          | `string`  | The unique SID identifier of the Verify Service that generated the Verification.                                                              |
| `verification_sid`     | `string`  | The unique SID identifier of the Verification.                                                                                                |
| `friendly_name`        | `string`  | The chosen friendly name of the Verify Service.                                                                                               |
| `custom_friendly_name` | `string`  | If applicable, the custom friendly name of the Verify Service.                                                                                |
| `created_at`           | `string`  | The date and time that the Verification was created in ISO 8601 format.                                                                       |
| `verified_at`          | `string`  | If applicable, the date and time that the Verification was approved in ISO 8601 format.                                                       |
| `expired_at`           | `string`  | If applicable, the date and time that the Verification expired in ISO 8601 format.                                                            |
| `verification_status`  | `string`  | The status of the Verification, can be one of: `PENDING`, `APPROVED`, `CANCELED`, `EXPIRED`, `MAX_ATTEMPTS_REACHED`.                          |
| `to`                   | `string`  | The Verification's destination phone number in E.164 format.                                                                                  |
| `country`              | `string`  | The country code that the Verification was delivered to.                                                                                      |
| `custom_code_enabled`  | `boolean` | Returns `true` if you sent the verification with a custom code, `false` otherwise.                                                            |
| `code_length`          | `integer` | The verification code length. Returns `null` if a custom code is used.                                                                        |
| `send_code_attempts`   | `object`  | An object containing information about sent Verification Attempts. See [SendCodeAttempts property definitions](#sendcodeattempts-properties). |
| `check_attempts`       | `object`  | An object containing information about Verification Check attempts. See [CheckAttempts property definitions](#checkattempts-properties).      |

### SendCodeAttempts properties

The Verification Status Event's `send_code_attempts` property provides information about all Verification Attempts sent to the end user for a Verification.

| Property   | Type      | Description                                                                                                                                                                                        |
| ---------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `count`    | `integer` | The total number of Verification Attempts sent.                                                                                                                                                    |
| `attempts` | `array`   | If applicable, an array of `SendCodeAttemptsList` objects with information on each Verification Attempt. See [`SendCodeAttemptsList` property definitions here](#sendcodeattemptslist-properties). |

### SendCodeAttemptsList properties

The Verification Status Event's `send_code_attempts` property may contain an `attempts` array that holds SendCodeAttemptsList objects. The SendCodeAttemptsList object provides information about each Verification Attempt that was made.

| Property      | Type     | Description                                                                                                                                                                 |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `time`        | `string` | The date and time that the Verification Attempt was created in ISO 8601 format.                                                                                             |
| `channel`     | `string` | The communication channel that was used, such as `SMS`.                                                                                                                     |
| `attempt_sid` | `string` | The unique SID identifier of the Verification Attempt.                                                                                                                      |
| `locale`      | `string` | The language used for the Verification Attempt.                                                                                                                             |
| `tags`        | `object` | The set of custom tags added to an attempt when including the tags parameter in the [Start New Verification](/docs/verify/api/verification#start-new-verification) endpoint |

### CheckAttempts properties

The Verification Status Event's `check_attempts` property provides information about all Verification Checks that were made for a Verification.

| Property   | Type      | Description                                                                                                                                                                                         |
| ---------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `count`    | `integer` | The total number of Verification Checks made.                                                                                                                                                       |
| `attempts` | `array`   | If applicable, an array containing CheckAttemptsList objects that contain information on each Verification Check. See [CheckAttemptsList property definitions here](#checkattemptslist-properties). |

### CheckAttemptsList properties

The Verification Status Event's `check_attempts` property may contain an `attempts` array that holds CheckAttemptsList objects. The CheckAttemptsList object provides information about each Verification Check that was made.

| Property | Type     | Description                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------- |
| `time`   | `string` | The date and time that the Verification Check was performed in ISO 8601 format. |
| `status` | `string` | The status of the Verification Check, can be one of: `SUCCESS`, `FAILURE`.      |
