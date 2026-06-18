# Analyze: Investigate

Even if you completed a thorough review during the [Validate phase](/docs/usage/fraud-response-guide/validate), it's important to perform a deeper investigation and build a detailed timeline of the fraud event. This timeline will help you determine root cause and support completion of your final [Root Cause Analysis (RCA) report](/docs/usage/fraud-response-guide/diagnose#root-cause-analysis).

Investigating fraud on the Twilio platform typically involves reviewing logs that capture administrative actions and unauthorized voice and messaging activity. As part of this process, look for abnormal or unexpected usage patterns and correlate activity across log sources to reconstruct the sequence of events. Common log sources used to investigate ATO, AIT, and smishing/vishing include Monitor Events, Programmable Messaging and Voice Logs, Error Logs, and Twilio Verify logs (if applicable).

The sections below describe how each log source can support your investigation and highlight specific fields that are most useful when [building an event timeline](/docs/usage/fraud-response-guide/diagnose#building-an-event-timeline).

## Monitor Events \[#monitor-events]

[Monitor Events](https://www.twilio.com/docs/usage/monitor-events) provide a chronological log of administrative and resource changes across your entire Twilio account. Specifically, it tracks actions performed against the API using your Twilio Account SID, as well as actions made in the Twilio Console. This includes resource creation, modification, deletion, and user authentication events. Monitor Events is the most critical source for ATO investigation.

> \[!NOTE]
>
> **ATO:** Detects unauthorized API key creation, password changes, phone number configuration changes (like webhook URL updates for data exfiltration), and suspicious login locations.

### Relevant Log Field Descriptions \[#monitor-events-fields]

| Field Name        | Description                                                                                                                                                                                                                                                | Investigation Relevance                                                                                                    |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `eventDate`       | The date and time in GMT when the event was recorded, specified in ISO 8601 format.                                                                                                                                                                        | Establishes the timeline of the ATO.                                                                                       |
| `actorSid`        | The SID of the actor that caused the event, if available. Can be a User SID (`US...`) or an Account SID (`AC...`). Null if not available.                                                                                                                  | Identifies the SID of the Twilio account or user that made the call. See Important Notes on actorSid for more information. |
| `eventType`       | The event's type, typically in the form RESOURCE\_TYPE.ACTION (e.g., phone-number.created). See [Monitor Event Types](https://www.twilio.com/docs/usage/monitor-events#event-types) for a full list.                                                       | The specific action performed by the threat actor (e.g., account-api-keys.created is a common post-ATO step).              |
| `resourceSid`     | The SID of the resource that was affected.                                                                                                                                                                                                                 | Links the log to the resource that was modified and potentially used for fraud.                                            |
| `source`          | The originating system or interface that caused the event. Can be: `web` for events caused by user action in the Twilio Console, `api` for events caused by a request to the API, or `twilio` for events caused by an automated or internal Twilio system. | Can indicate whether an ATO is due to username/password or Auth Token/API key disclosure.                                  |
| `sourceIpAddress` | The IP address of the source, if the source is outside the Twilio cloud. Null for events with a source of `twilio`.                                                                                                                                        | Crucial for identifying logins or API calls from suspicious/unexpected geographic locations or VPNs.                       |
| `eventData`       | An object with additional data about the event. The contents depend on the event type. For RESOURCE.updated events, this value contains a resource\_properties dictionary that describes the previous and updated properties of the resource.              | Reveals the actual malicious change, such as a new malicious webhook URL added to a phone number.                          |

### Example Log Output for ATO \[#monitor-events-example]

The following is an example Monitor Events log entry depicting a successful API Key creation, typically seen after an ATO:

```json
{
  "accountSid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "actorSid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "actorType": "account",
  "description": null,
  "eventData": {
    "resource_properties": {
      "status": {
        "updated": "Active",
        "previous": null
      },
      "friendly_name": {
        "updated": "new_evil_key_01",
        "previous": null
      },
      "secret": {
        "updated": "[REDACTED]",
        "previous": null
      },
      "flags": {
        "updated": "REST API, Signing",
        "previous": null
      }
    }
  },
  "eventDate": "2025-10-13T19:25:35.000Z",
  "eventType": "account-api-keys.created",
  "resourceSid": "SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "resourceType": "account-api-keys",
  "sid": "AEzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
  "source": "api",
  "sourceIpAddress": "203.0.113.42",
  "url": "https://monitor.twilio.com/v1/Events/AEzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
  "links": {
    "actor": "https://api.twilio.com/2010-04-01/Accounts/ACyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
    "resource": null
  }
}
```

### CLI Access Instructions \[#monitor-events-cli]

To access Monitor Events via the CLI, you must have the Twilio CLI installed and authenticated. To fetch a list of commands for interacting with these logs using the CLI, you can use the following:

```bash
twilio api:monitor:v1:events:list --help
```

#### Useful Options \[#monitor-events-cli-options]

* `--start-date yyyy-MM-dd'T'HH:mm:ss'Z'` - Only include events on or after this date (UTC).
* `--end-date yyyy-MM-dd'T'HH:mm:ss'Z'` - Only include events on or before this date (UTC).
* `--event-type <event_type>` - Filter by a specific event type (e.g., account.updated).
* `--actor-sid <USxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx>` - Filter by the actor SID (user or API credentials).
* `--resource-sid <SID>` - Filter by the resource SID (e.g., a phone number, account, etc.).
* `--source-ip-address <IP>` - Filter by the originating IP address.
* `--page-size <number>` - Number of results per page (default: 50, max: 1000).

Only one filter property (besides date) can be used at a time.

**Example: The 20 most recent events in JSON**

```bash
twilio api:monitor:v1:events:list -o=json --limit 20
```

**Example: Events within the specific time range of the ATO**

```bash
twilio api:monitor:v1:events:list --start-date 2025-10-05T19:00:35.000+0000 --end-date 2025-10-13T19:25:35.000+0000
```

**Example: Events for API key creation**

```bash
twilio api:monitor:v1:events:list --event-type account-api-keys.created
```

### Console Access Instructions \[#monitor-events-console]

> **Note:** Full logs of Monitor Events can't be accessed directly from the console, as some key fields such as `actorSid` may not be visible.

1. Log in to the Twilio Console.
2. Navigate to **Monitor > Insights > Audit > Audit Events Log**.
3. If you have advanced insights with custom filters, filter the logs by Date/Time Range and look for sensitive EventType values:
   * `user-session.created` (Look for foreign/unexpected SourceIpAddress).
   * `account-api-keys.created` or `account-api-keys.updated`.
   * `phone_number.updated` (Check the Properties for unauthorized TwiML or webhook URL changes).

## Programmable Messaging Logs \[#programmable-messaging-logs]

[Programmable Messaging logs](/docs/messaging/features/messaging-logs) capture the details of every SMS and MMS message that your Twilio phone numbers or Messaging Services send or receive. You can use this information to identify SMS pumping, smishing, and other fraudulent activity.

> \[!NOTE]
>
> **SMS Pumping:** Shows a massive, rapid increase in outbound-api messages to high-cost international destinations.
>
> **Smishing:** Identifies outbound messages containing malicious URLs or social engineering text.

### Relevant Log Field Descriptions \[#messaging-fields]

| Field Name  | Description                                                                                                                                                                                                                                                                                                                                 | Fraud Investigation Value                                                                                                                                                          |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dateSent`  | The RFC 2822 timestamp (in GMT) of when the message was sent. For an outgoing message, this is when Twilio sent the message. For an incoming message, this is when Twilio sent the HTTP request to your incoming message webhook URL.                                                                                                       | Pinpoints the start of a mass-sending event.                                                                                                                                       |
| `to`        | The recipient's phone number (in E.164 format) or channel address.                                                                                                                                                                                                                                                                          | Identifies the targets of the fraudulent campaign, often to premium-rate numbers internationally.                                                                                  |
| `from`      | The sender's phone number (in E.164 format), alphanumeric sender ID, Wireless SIM, short code, or channel address. For incoming messages, this is the number or channel address of the sender. For outgoing messages, this is a Twilio phone number, alphanumeric sender ID, short code, or channel address from which the message is sent. | The compromised resource used for sending.                                                                                                                                         |
| `body`      | The text content of the message.                                                                                                                                                                                                                                                                                                            | Contains the smishing link or scam text.                                                                                                                                           |
| `direction` | The direction of the message. Can be: `inbound` for incoming messages, `outbound-api` for messages created by the REST API, `outbound-call` for messages created during a call, or `outbound-reply` for messages created in response to an incoming message.                                                                                | Toll Fraud/ATO: Look for sudden spikes in outbound-api traffic. The threat actor could be hitting a web form or API endpoint on your server (e.g., "Click-to-Call" or "Send 2FA"). |
| `status`    | The status of the message. Possible values: `accepted`, `scheduled`, `canceled`, `queued`, `sending`, `sent`, `failed`, `delivered`, `undelivered`, `receiving`, `received`, or `read` (WhatsApp only).                                                                                                                                     | High failure rates (with specific error codes) can indicate bulk-sending that is being blocked by carriers.                                                                        |

### Example Log Output for Smishing \[#messaging-example]

A single conceptual log entry showing an outbound smishing message:

```json
{
  "body": "Twilio ALERT: Your account has been compromised. Log in now at twillio-support.com/reset to avoid suspension.",
  "numSegments": "1",
  "direction": "outbound-api",
  "from": "+19876543210",
  "to": "+15551234567",
  "dateUpdated": "2025-05-19T22:56:35.000Z",
  "price": "-0.00830",
  "errorMessage": null,
  "uri": "/2010-04-01/Accounts/ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Messages/SM9e64f73150f598b433bb87c015cdd6b2.json",
  "accountSid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "numMedia": "0",
  "status": "delivered",
  "messagingServiceSid": null,
  "sid": "SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "dateSent": "2025-05-19T22:56:34.000Z",
  "dateCreated": "2025-05-19T22:56:34.000Z",
  "errorCode": null,
  "priceUnit": "USD",
  "apiVersion": "2010-04-01",
  "subresourceUris": {
    "feedback": "/2010-04-01/Accounts/ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Messages/SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Feedback.json",
    "media": "/2010-04-01/Accounts/ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Messages/SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Media.json"
  }
}
```

### CLI Access Instructions \[#messaging-cli]

To access Programmable Messaging logs via the CLI, you must have the Twilio CLI installed and authenticated. To fetch a list of commands for interacting with these logs using the CLI, you can use the following:

```bash
twilio api:core:messages:list --help
```

#### Useful Options \[#messaging-cli-options]

* `--date-sent-after YYYY-MM-DD --date-sent-before YYYY-MM-DD` - Filter by a date range.
* `--from +number / --to +number` - Filter by specific senders and/or recipient phone numbers.
* `--limit N` - Set the maximum number of records that are returned.
* `--properties sid,status,to,from,errorCode,dateSent` - Select the specific fields you would like returned.

**Example: Export the last 500 messages into a portable format for offline analysis**

```bash
twilio api:core:messages:list --limit 500 -o=json > messages.json
```

**Example: Messages between a specific date range, starting with the beginning of the incident**

```bash
twilio api:core:messages:list --date-sent-after 2025-10-01 --date-sent-before 2025-10-15
```

**Example: Messages sent after a specific date to any number beginning with a specific high-risk country prefix**

```bash
twilio api:core:messages:list --to "+7958*" --date-sent-after $(date +%Y-%m-%d)
```

### Console Access Instructions \[#messaging-console]

> **Note:** Though relevant fields for programmable messaging logs can be accessed directly from the Console, some key fields such as `body` may not be filterable.

1. Log in to the Twilio Console.
2. Navigate to **Monitor > Logs > Messaging**.
3. Filter by a suspicious Date/Time Range or use the search bar to filter on specific message SIDs.
4. Export the logs via CSV for useful high-volume analysis such as calculating number counts by country/prefix or filtering on specific smishing-related keywords in message bodies.
5. Navigate to **Monitor > Insights > Messages** for graphic visualizations of trends over time such as outgoing messages volume, top destination countries, and top 20 involved subaccounts.

## Programmable Voice Logs \[#programmable-voice-logs]

The [Programmable Voice call logs](/docs/voice/api/call-resource) record every call placed through Twilio. Use these logs as the primary data source when you investigate toll fraud or traffic-pumping activity on voice channels.

Each entry captures inbound and outbound calls made with your Twilio numbers and includes information such as duration, call direction, and call status (for example, `answered`, `completed`, or `busy`).

> \[!NOTE]
>
> **Voice Toll Fraud:** Detects unusual call volume, long call durations to high-cost destinations, or high-frequency calls to premium-rate numbers globally (Traffic Pumping).
>
> **Vishing:** Identifies outbound calls used in voice-based social engineering attacks.

### Relevant Log Field Descriptions \[#voice-fields]

| Field Name    | Description                                                                                                                                                                                         | Fraud Investigation Value                                                                          |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| `sid`         | The unique string that Twilio created to identify this Call resource.                                                                                                                               | Used to inspect the full details of the call, including call legs and TwiML used.                  |
| `dateCreated` | The date and time in UTC that this resource was created, specified in RFC 2822 format.                                                                                                              | Helps establish the pattern of fraudulent calling.                                                 |
| `to`          | The phone number, SIP address, Client identifier, or SIM SID that received this call. Phone numbers are in E.164 format (e.g., +16175551212).                                                       | CRITICAL: Identifying high-cost or unexpected international prefixes is key to finding toll fraud. |
| `duration`    | The length of the call in seconds. This value is empty for busy, failed, unanswered, or ongoing calls.                                                                                              | Toll fraud calls often have long durations (e.g., >30 seconds) to maximize revenue share.          |
| `direction`   | A string describing the direction of the call. Can be: `inbound` for inbound calls, `outbound-api` for calls initiated via the REST API, or `outbound-dial` for calls initiated by a `<Dial>` verb. | Toll Fraud/ATO: Look for unexpected surges in outbound-api calls.                                  |
| `status`      | The status of this call. Can be: `queued`, `ringing`, `in-progress`, `canceled`, `completed`, `failed`, `busy`, or `no-answer`.                                                                     | Helps analyze the success rate of the attempted fraud.                                             |

### Example Log Output for Toll Fraud \[#voice-example]

A single call to a high-cost destination with a longer duration:

```json
{
  "sid": "CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "dateCreated": "2025-10-07T19:00:00Z",
  "dateUpdated": "2025-10-07T23:18:05.000Z",
  "parentCallSid": null,
  "accountSid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "to": "+88213xxxxxxxxxxx",
  "toFormatted": "(213) xxx-xxxx",
  "from": "+19876543210",
  "fromFormatted": "(555) 555-5555",
  "phoneNumberSid": "PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "status": "completed",
  "startTime": "2025-02-05T23:17:54.000Z",
  "endTime": "2025-02-05T23:19:54.000Z",
  "duration": "180",
  "price": "-0.55000",
  "priceUnit": "USD",
  "direction": "outbound-api",
  "answeredBy": null,
  "apiVersion": "2010-04-01",
  "forwardedFrom": "+1213xxxxxxx",
  "groupSid": null,
  "callerName": null,
  "queueTime": "0",
  "trunkSid": "",
  "uri": "/2010-04-01/Accounts/ACa240dbc3740b513706fb92166de463ad/Calls/CA472ba55b04f872d9c088cd4a7bda6826.json",
  "subresourceUris": {}
}
```

### CLI Access Instructions \[#voice-cli]

To access Programmable Voice logs via the CLI, you must have the Twilio CLI installed and authenticated. To fetch a list of commands for interacting with these logs using the CLI, you can use the following:

```bash
twilio api:core:calls:list --help
```

#### Useful Options \[#voice-cli-options]

* `--date-sent-after YYYY-MM-DD --date-sent-before YYYY-MM-DD` - Filter by a date range.
* `--from +number / --to +number` - Filter by specific senders and/or recipient phone numbers.
* `--limit N` - Set the maximum number of records that are returned.
* `--properties sid,status,to,from,errorCode,dateSent` - Select the specific fields you would like returned.

**Example: High volume of outbound calls from one of your owned numbers**

```bash
twilio api:core:calls:list --from "+15551234567" --start-time "2025-11-04" --limit 200
```

**Example: Longer calls and return specific properties**

```bash
twilio api:core:calls:list --duration > "3600" \
  --properties "sid,to,from,startTime,duration,price"
```

**Example: Calls that cost a minimum price of $1.00**

```bash
twilio api:core:calls:list --price > "1.00"
```

### Console Access Instructions \[#voice-console]

1. Log in to the Twilio Console.
2. Navigate to **Monitor > Logs > Calls**.
3. Filter by Date & Time Range. For toll fraud, include a specific From number to quickly spot unusual activity from a specific number that you own.
4. Examine the To numbers for international prefixes that you do not normally interact with.
5. Navigate to **Insights > Voice > Calls** for graphic visualizations of trends over time such as total calls, average call length, and connection rate.

## Error Logs \[#error-logs]

The [Error logs (Monitor REST API: Alerts) resource](/docs/usage/monitor-alert) records error codes and warnings. These logs can indicate that Twilio blocked a potentially malicious action during its internal security checks. Error logs include API request errors, TwiML errors, and warnings generated by security features such as Geo Permissions.

An error indicates that Twilio could not process the request. A warning indicates that Twilio encountered an issue but still processed the request.

> \[!NOTE]
>
> **Toll Fraud:** A high volume of alerts with specific error codes could indicate a threat actor is attempting to send traffic to high-risk destinations that you have blocked via Geo Permissions.
>
> **Smishing/vishing:** Messages could be blocked due to carrier or acceptable use violations.

### Relevant Log Field Descriptions \[#error-logs-fields]

| Field Name    | Description                                                                                                                                                                                                                                                                                               | Fraud Investigation Value                                                                                                                        |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `dateCreated` | The date and time in GMT when the resource was created, specified in ISO 8601 format.                                                                                                                                                                                                                     | Correlates with the exact moment a malicious action was attempted.                                                                               |
| `errorCode`   | The error code for the condition that generated the alert. See the [Error Dictionary](https://www.twilio.com/docs/api/errors) for possible causes and solutions.                                                                                                                                          | CRITICAL: Codes like 21215 (SMS Geo Permission blocked) or 13227 (Voice Geo Permission blocked) are direct proof of blocked toll fraud attempts. |
| `logLevel`    | The log level. Can be: `error`, `warning`, `notice`, or `debug`.                                                                                                                                                                                                                                          | Alerts with security-related error codes should be prioritized.                                                                                  |
| `requestUrl`  | The URL of the request that generated the alert. If the alert was generated by a request Twilio made to your server, this is the URL on your server that generated the alert. If the alert was generated by a request from your application to the Twilio API, this is the URL of the resource requested. | Helps identify the specific compromised service being used for the attack.                                                                       |
| `resourceSid` | The SID of the resource for which the alert was generated. This value is empty if the alert was not generated for a particular resource.                                                                                                                                                                  | Allows you to pivot to the Programmable Logs for full message/call details.                                                                      |

### Error Codes \[#error-codes]

Fraud attempts often trigger specific error codes (e.g., blocked by Fraud Guard). After exporting, review the `errorCode` field for patterns. Error codes that may indicate fraudulent activity or message blocking and relevant for fraud investigations can include:

| Error Code          | Error Message / Description                                                                                                     | Fraud/Abuse Relevance                                                                                                                                         |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 13227, 21215, 32205 | Geo Permission configuration is not permitting call / SIP Trunking: Geo Permission configuration is not permitting call (32205) | A user dialed a destination to which your application is not enabled to support.                                                                              |
| 20003               | Permission denied                                                                                                               | Can indicate a brute-force or credential stuffing attack attempting to guess account credentials.                                                             |
| 30004               | Message blocked                                                                                                                 | The destination number is blocked from receiving this message (e.g., call blocking, DND, or carrier policy). Can indicate spam, unwanted, or abusive content. |
| 30007               | Message filtered                                                                                                                | Message flagged as objectionable by the carrier. Often due to spam, phishing, or content violating carrier and/or Twilio policies.                            |
| 30002               | Account suspended                                                                                                               | Your account was suspended between message send and delivery. May be due to detected fraud/abuse and/or billing overages.                                     |
| 30444               | Toll Free verification rejection - Disallowed: Fraud                                                                            | Toll-free number verification was rejected due to suspected fraud. Messaging traffic is blocked until verified.                                               |
| 30442               | Toll-Free phone number verification rejection - Disallowed: Spam                                                                | Message blocked because it was identified as spam.                                                                                                            |
| 30450               | Message delivery blocked                                                                                                        | SMS Pumping Protection identified potentially fraudulent messages being sent and has blocked them.                                                            |
| 32201               | SIP: Source IP address not in ACL                                                                                               | INVITE requests are being sent from an IP address not on that ACL for your SIP trunk.                                                                         |
| 32202               | SIP: Bad user credentials                                                                                                       | There is a Credentials List on your trunk and a call is rejected due to a wrong username and/or password as a part of the INVITE Authentication Digest.       |
| 32203               | SIP: Call blocked by Twilio                                                                                                     | Outbound call blocked by Twilio. Potential causes can include fraud or regulatory reasons.                                                                    |
| 14107, 20429, 63018 | SMS send rate limit exceeded / Too many requests / Rate limit exceeded for Channel                                              | Multiple identical messages to the recipient detected. Can indicate SMS pumping or bot activity.                                                              |
| 30006               | Landline or unreachable carrier                                                                                                 | Sending to this network/country is blocked, often due to fraud risk.                                                                                          |
| 30003               | Unreachable destination handset                                                                                                 | Sometimes used by carriers to filter numbers after spam complaints.                                                                                           |
| 30005               | Unknown destination handset                                                                                                     | May indicate the number is deactivated after abuse.                                                                                                           |
| 30008               | Unknown error                                                                                                                   | If seen in high volume, it may indicate systemic blocking or filtering.                                                                                       |
| 60410               | Verification delivery attempt blocked                                                                                           | Fraud Guard has identified potential fraudulent messages being sent.                                                                                          |

### Example Log Output (Conceptual: Blocked Toll Fraud) \[#error-logs-example]

An alert indicating a blocked outbound SMS attempt to a country blocked by Geo Permissions:

```json
{
  "accountSid": "NOxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "alert_text": "Geo Permission configuration is not permitting SMS to +880xxxxxxxxxxx.",
  "apiVersion": null,
  "dateCreated": "2025-10-07T17:30:00Z",
  "errorCode": "21215",
  "logLevel": "warning",
  "moreInfo": "https://www.twilio.com/docs/errors/21215",
  "requestMethod": null,
  "requestUrl": "https://api.twilio.com/2010-04-01/Accounts/AC.../Messages.json",
  "resourceSid": "SMyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
  "sid": "NOxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "url": "https://monitor.twilio.com/v1/Alerts/NO5f318364d31f4981c38b85386c4768fb",
  "serviceSid": null
}
```

### CLI Access Instructions \[#error-logs-cli]

To access Error logs via the CLI, you must have the Twilio CLI installed and authenticated. To fetch a list of commands for interacting with these logs using the CLI, you can use the following:

```bash
twilio api:monitor:v1:alerts:list --help
```

#### Useful Options \[#error-logs-cli-options]

* `--start-date YYYY-MM-DD --end-date YYYY-MM-DD` - Filter by a date range.
* `--log-level error` - Return only errors and filter out warnings.

**Example: Alerts with error code 21215, indicating blocking geo permissions**

```bash
twilio api:monitor:v1:alerts:list --log-level error --properties="sid, errorCode, alertText, dateCreated" | grep "21215"
```

**Example: The latest 100 alerts that contain the text "Usage trigger" and in JSON format (useful if you have already set up usage triggers for things like account spend)**

```bash
twilio api:monitor:v1:alerts:list -o=json --limit 100 | grep "Usage trigger"
```

**Example: Print out a list of just error codes and dates so it is easier to see spikes in error codes over time**

```bash
twilio api:monitor:v1:alerts:list --start-date "2025-12-13" --properties="errorCode,dateCreated"
```

### Console Access Instructions \[#error-logs-console]

1. Log in to the Twilio Console.
2. Navigate to **Monitor > Logs > Errors > Error logs**.
3. Filter by Error Code and search for known fraud-related codes such as those found under [Error Codes](#error-codes).
4. A high count of these errors over a short period may indicate fraudulent activity.

## Verify Logs \[#verify-logs]

If you use Twilio Verify to send one-time passwords (OTPs) for user authentication, you can consult the [Verify attempt logs](/docs/verify/api/attempts) to monitor potential efforts to bypass your two-factor authentication (2FA) flow, including SMS pumping or OTP interception.

> \[!NOTE]
>
> **SMS Pumping:** Records every verification attempt/OTP, including the channel used, status, and any intervention by Twilio's security tools. A surge in pending or max\_attempts\_reached status logs, often accompanied by blocks listed in the Blocked Verifications tab by Verify Fraud Guard. This indicates a threat actor is trying to brute-force or pump your verification flow.

### Relevant Log Field Descriptions \[#verify-fields]

| Field Name         | Description                                                                                                                                                                         | Fraud Investigation Value                                                                       |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| `sid`              | The SID that uniquely identifies the verification attempt resource.                                                                                                                 | Links to the transaction that failed or was blocked.                                            |
| `to`               | Destination of a verification. It is phone number in E.164 format.                                                                                                                  | Helps identify if the threat actor is targeting high-cost prefixes or known fraudulent numbers. |
| `conversionStatus` | A string specifying the conversion status of the verification. A conversion happens when the user is able to provide the correct code. Possible values: `converted`, `unconverted`. | Many `unconverted` attempts is a strong sign of a brute-force or pumping attack.                |
| `channel`          | A string specifying the communication channel used for the verification attempt. Possible values: `sms`, `call`, `email`, `whatsapp`, `rbm`.                                        | Shows which communication channel the threat actor is abusing.                                  |

### Example Log Output (Conceptual: SMS Pumping Block) \[#verify-example]

Multiple logs showing a fraud pattern that contains sequential To numbers, a high-risk destination country, and a high frequency of signups:

```json
[
  {
    "sid": "VLaa001111111111111111111111111111",
    "accountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "serviceSid": "VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "dateCreated": "2025-11-06T19:50:01Z",
    "dateUpdated": "2025-11-06T19:50:01Z",
    "conversionStatus": "unconverted",
    "channel": "sms",
    "price": { "currency": "USD", "value": "1.25" },
    "channelData": { "to": "+79581118001", "country": "RU" },
    "url": "https://verify.twilio.com/v2/Attempts/VLaa001111111111111111111111111111"
  },
  {
    "sid": "VLaa002222222222222222222222222222",
    "accountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "serviceSid": "VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "dateCreated": "2025-11-06T19:50:02Z",
    "dateUpdated": "2025-11-06T19:50:02Z",
    "conversionStatus": "unconverted",
    "channel": "sms",
    "price": { "currency": "USD", "value": "1.25" },
    "channelData": { "to": "+79581118002", "country": "RU" },
    "url": "https://verify.twilio.com/v2/Attempts/VLaa002222222222222222222222222222"
  },
  {
    "sid": "VLaa003333333333333333333333333333",
    "accountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "serviceSid": "VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "dateCreated": "2025-11-06T19:50:03Z",
    "dateUpdated": "2025-11-06T19:50:03Z",
    "conversionStatus": "unconverted",
    "channel": "sms",
    "price": { "currency": "USD", "value": "1.25" },
    "channelData": { "to": "+79581118003", "country": "RU" },
    "url": "https://verify.twilio.com/v2/Attempts/VLaa003333333333333333333333333333"
  }
]
```

### CLI Access Instructions \[#verify-cli]

To access Verify logs via the CLI, you must have the Twilio CLI installed and authenticated. To fetch a list of commands for interacting with these logs using the CLI, you can use the following:

```bash
twilio api:verify:v2:attempts:list --help
```

#### Useful Options \[#verify-cli-options]

* `--status` - Filter verify attempts by those that have been fully converted or unconverted (token has been verified or not).
* `--country` - Return verification attempts sent to specific countries.

**Example: Every verification attempt that has not been completed after a specific date**

```bash
twilio api:verify:v2:attempts:list --status unconverted --date-created-after $(date +%Y-%m-%d)
```

**Example: Export all verification attempts from a specific Verify service and after a specific date into a JSON file**

```bash
twilio api:verify:v2:attempts:list --verify-service-sid VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX --date-created-after $(date +%Y-%m-%d) -o=json > messages.json
```

**Example: Count all verification attempts starting today and group them by country (you will need jq installed)**

```bash
twilio api:verify:v2:attempts:list --date-created-after $(date +%Y-%m-%d) -o json | jq '.[] | .channelData.country' | sort | uniq -c | sort -nr
```

### Console Access Instructions \[#verify-console]

1. Log in to the Twilio Console.
2. Navigate to **Monitor > Logs > Verify**.
3. Under the Verifications tab, you can view and sort verification attempts by useful values such as by Country and by Status.
4. Click the **Blocked Verifications** tab to see what has been blocked by Twilio features such as Fraud Guard or Geo Permissions.
5. Alternatively, if you are using Fraud Guard, navigate to **Monitor > Insights > Verify > Fraud** to view attempts to send SMS that were detected and blocked by Verify's Fraud Guard, Geo-permissions, etc.
