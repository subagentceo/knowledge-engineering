> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Cal.com

## Overview

Connect your ElevenLabs AI agents with [Cal.com](https://cal.com) to manage scheduling and calendar bookings. This integration enables your agents to check availability, book appointments, cancel or reschedule meetings, and look up existing bookings through natural conversation.

## Setup

This integration uses a **Cal.com API key** for authentication (not an OAuth app).

Go to **Settings > Developer > API Keys** in your Cal.com account and click **New**. Copy the generated key immediately — it will not be shown again.

Cal.com generates two types of keys — test keys (starting with `cal_`) and live keys (starting with `cal_live_`). Use a **live key** so your agent can access real calendar data.

In the ElevenLabs integration setup, paste your Cal.com API key in the **API Key** field.

## Demo

This demo uses legacy webhook tools. If you're using the native Cal.com integration, the tools are
configured automatically — no manual webhook setup is needed.

## How it works

The agent schedules meetings by using tool calls to step through the booking process. The tabs below show a high-level summary and the detailed system prompt.

The agent asks for the meeting purpose, preferred date/time, and duration to gather scheduling information.

The agent checks calendar availability by:

* Using the `get_available_slots` tool to fetch open time slots.
* Verifying whether the requested time is available.
* Suggesting alternatives if the requested time is unavailable.
* Confirming the selected time with the caller.

Once a time is agreed upon, the agent:

* Collects and validates the attendee's full name.
* Verifies email address accuracy.
* Confirms time zone information.
* Gathers any additional required fields for the Cal.com event type.

The agent:

* Calls the `book_meeting` tool after verifying all information.
* Follows the booking template structure.
* Confirms meeting creation with the attendee.
* Informs them that they will receive a calendar invitation.

```
You are a helpful receptionist responsible for scheduling meetings using the Cal.com integration. Be friendly, precise, and concise.

Begin by briefly asking for the purpose of the meeting and the caller's preferred date and time.
Then, ask about the desired meeting duration (15, 30, or 60 minutes), and wait for the user's response before proceeding.

Once you have the meeting details, say you will check calendar availability:
- Call get_available_slots with the appropriate date range
- Verify if the requested time slot is available
- If not available, suggest alternative times from the available slots
- Continue until a suitable time is agreed upon

After confirming a time slot, gather the following contact details:
- The attendee's full name
- A valid email address. Note that the email address is transcribed from voice, so ensure it is formatted correctly.
- The attendee's time zone (in 'Continent/City' format like 'America/New_York')
- Read the email back to the caller to confirm accuracy

Once all details are confirmed, explain that you will create the meeting.
Create the meeting by using the book_meeting tool with the following parameters:
- start: The agreed meeting time in ISO 8601 format
- eventTypeId: The appropriate ID based on the meeting duration (15min: 1351800, 30min: 1351801, 60min: 1351802)
- attendee: An object containing the name, email, and timeZone

Thank the attendee and inform them they will receive a calendar invitation shortly.

Clarifications:
- Do not inform the user that you are formatting the email; simply do it.
- If the caller asks you to proceed with booking, do so with the existing information.

Guardrails:
- Do not share any internal IDs or API details with the caller.
- If booking fails, check for formatting issues in the email or time conflicts.
```

## Manual webhook setup

If you use the native Cal.com integration, tools are configured automatically. The steps below
apply only to manual webhook setup.

Store your API key securely before making authenticated requests. Generate a new [Cal.com API key](https://cal.com/docs/api-reference/v1/introduction#get-your-api-keys) if you have not already.

The Cal.com API expects the following authentication header:

```plaintext Cal request header structure
'Authorization': 'Bearer YOUR_API_KEY'
```

Store the key in the agent's secret storage to keep it secure and accessible when making requests.

To match the expected authentication structure of Cal.com, remember to prepend the API key with `Bearer ` when creating the secret.

![Tool secrets](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/5ffae070945a86b74975cd9b56679c2bb76f0ce70d05fe7b10e8e5dff6ddd630/agents-platform/pages/customization/integrations/calcom/tool-secrets.jpg)

Enable calendar bookings by creating two tools:

1. **`get_available_slots`**: When a user asks *"Is Louis free at 10:30 AM on Tuesday?"*, the agent uses [Cal.com's "Get available slots" endpoint](https://cal.com/docs/api-reference/v2/slots/find-out-when-is-an-event-type-ready-to-be-booked) to check for open time slots.

2. **`book_meeting`**: After identifying a suitable time, the agent books the meeting using [Cal.com's "Create a booking" endpoint](https://cal.com/docs/api-reference/v2/bookings/create-a-booking#create-a-booking).

Navigate to the **Tools** section of the dashboard and select **Add Tool**. Choose **Webhook** as the tool type, then fill in the following sections:

Metadata used by the agent to determine when the tool should be called:

| Field       | Value                                                                    |
| ----------- | ------------------------------------------------------------------------ |
| Name        | get\_available\_slots                                                    |
| Description | This tool checks if a particular time slot is available in the calendar. |
| Method      | GET                                                                      |
| URL         | [https://api.cal.com/v2/slots](https://api.cal.com/v2/slots)             |

Matches the request headers defined [here](https://cal.com/docs/api-reference/v2/slots/get-available-slots#get-available-slots):

| Type   | Name            | Value                               |
| ------ | --------------- | ----------------------------------- |
| Secret | Authorization   | Select the secret key created above |
| String | cal-api-version | 2024-09-04                          |

Matches the request query parameters defined [here](https://cal.com/docs/api-reference/v2/slots/get-available-slots#get-available-slots):

| Data Type | Identifier  | Required | Description                                                                                                               |
| --------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| string    | start       | Yes      | Start date/time (UTC) from which to fetch slots, e.g. '2024-08-13T09:00:00Z'.                                             |
| string    | end         | Yes      | End date/time (UTC) until which to fetch slots, e.g. '2024-08-13T17:00:00Z'.                                              |
| string    | eventTypeId | Yes      | The ID of the event type that is booked. If 15 minutes, return abc. If 30 minutes, return def. If 60 minutes, return xyz. |

Metadata used by the agent to determine when the tool should be called:

| Field       | Value                                                              |
| ----------- | ------------------------------------------------------------------ |
| Name        | book\_meeting                                                      |
| Description | This tool books a meeting in the calendar once a time is agreed.   |
| Method      | POST                                                               |
| URL         | [https://api.cal.com/v2/bookings](https://api.cal.com/v2/bookings) |

Matches the request headers defined [here](https://cal.com/docs/api-reference/v2/bookings/create-a-booking#create-a-booking):

| Type   | Name            | Value                               |
| ------ | --------------- | ----------------------------------- |
| Secret | Authorization   | Select the secret key created above |
| String | cal-api-version | 2024-08-13                          |

Matches the request body parameters defined [here](https://cal.com/docs/api-reference/v2/bookings/create-a-booking#create-a-booking):

| Identifier  | Data Type | Required | Description                                                                                                               |
| ----------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| start       | String    | Yes      | The start time of the booking in ISO 8601 format in UTC timezone, e.g. '2024-08-13T09:00:00Z'.                            |
| eventTypeId | Number    | Yes      | The ID of the event type that is booked. If 15 minutes, return abc. If 30 minutes, return def. If 60 minutes, return xyz. |
| attendee    | Object    | Yes      | The attendee's details. You must collect these fields from the user.                                                      |

The `eventTypeId` must correspond to the event types you have available in Cal. Call
[this](https://cal.com/docs/api-reference/v1/event-types/find-all-event-types#find-all-event-types)
endpoint to get a list of your account event types (or create another tool that does this
automatically).

**Attendee object:**

| Identifier | Data Type | Required | Description                                                                                                     |
| ---------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| name       | String    | Yes      | The full name of the person booking the meeting.                                                                |
| email      | String    | Yes      | The email address of the person booking the meeting.                                                            |
| timeZone   | String    | Yes      | The caller's timezone. Should be in the format of 'Continent/City' like 'Europe/London' or 'America/New\_York'. |

Test the agent by pressing the **Test AI agent** button. Adjust the system prompt as needed.

By default, the agent does not know the current date or time. Use one of the following approaches:

1. **Create a time retrieval tool**: Add a tool that fetches the current date and time.

2. **Overrides**: Use the [overrides](/docs/eleven-agents/customization/personalization/overrides) feature to inject the current date and time into the system prompt at the start of each conversation.

## Security considerations

* Use HTTPS endpoints for all webhook calls.
* Store sensitive values as secrets using the ElevenLabs Secrets Manager.
* Validate that all authorization headers follow the required format (`Bearer YOUR_API_KEY`).
* Never expose event type IDs or API details to callers.

## Useful links

* [Cal.com API documentation](https://cal.com/docs/api-reference/v2/introduction)
* [Cal.com API keys guide](https://cal.com/blog/where-is-my-api-key-and-what-can-it-do)
* [ElevenLabs tools overview](/docs/eleven-agents/customization/tools/server-tools)