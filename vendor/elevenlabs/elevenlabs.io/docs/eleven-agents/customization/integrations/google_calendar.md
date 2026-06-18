> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Google Calendar

## Overview

Connect your ElevenLabs AI agents with [Google Calendar](https://calendar.google.com) to manage scheduling and calendar appointments. This integration enables your agents to check availability, create events with attendees and optional Google Meet conferencing, list upcoming events, and discover accessible calendars through natural conversation.

## Setup

This integration uses **Google OAuth 2.0** for authentication. You authorize ElevenLabs to access your Google Calendar on your behalf.

In the ElevenLabs integration setup, click **Connect**. You are redirected to Google to authorize access.

Choose the Google account whose calendar data your agent should access. If your browser is signed into multiple Google accounts, select the correct one.

Review the permissions requested and click **Allow**. The integration requests access to manage events on calendars you own, view your calendar list, and check free/busy information.

## OAuth scopes

The integration requests the following Google OAuth 2.0 scopes:

| Scope                            | Purpose                                                                       |
| -------------------------------- | ----------------------------------------------------------------------------- |
| `calendar.events.owned`          | Create, read, update, and delete events on calendars you own.                 |
| `calendar.calendarlist.readonly` | View the list of calendars accessible to your account (names and IDs).        |
| `calendar.freebusy`              | Check free/busy availability across calendars without exposing event details. |

## How it works

The agent schedules meetings by using tool calls to step through the booking process. The tabs below show a high-level summary and a detailed system prompt.

The agent lists accessible calendars to identify the correct one for scheduling. For most users, this is the primary calendar.

The agent checks free/busy availability by:

* Using the `google_calendar_check_availability` tool to query busy time blocks.
* Verifying whether the requested time is open.
* Suggesting alternatives if the requested time conflicts with an existing event.
* Confirming the selected time with the caller.

Once a time is agreed upon, the agent:

* Collects the attendee's full name and email address.
* Confirms the email by reading it back to the caller.
* Verifies time zone information.

The agent:

* Calls the `google_calendar_create_event` tool with the confirmed details.
* Optionally adds a Google Meet link if video conferencing is requested.
* Confirms event creation and informs the attendee that they will receive a calendar invitation.

```
You are a helpful scheduling assistant responsible for managing calendar bookings using Google Calendar. Be friendly, precise, and concise.

Begin by briefly asking for the purpose of the meeting and the caller's preferred date and time.
Then, ask about the desired meeting duration (15, 30, or 60 minutes), and wait for the user's response before proceeding.

Once you have the meeting details, check calendar availability:
- Call google_calendar_check_availability with the appropriate time range and calendar ID (use 'primary' for the main calendar)
- The tool returns busy time blocks — any time not listed as busy is available
- If the requested time overlaps with a busy block, suggest alternative times
- Continue until a suitable time is agreed upon

After confirming a time slot, gather the following contact details:
- The attendee's full name
- A valid email address. Note that the email address is transcribed from voice, so ensure it is formatted correctly.
- The attendee's time zone (in 'Continent/City' format like 'America/New_York')
- Read the email back to the caller to confirm accuracy

Once all details are confirmed, create the event:
- Call google_calendar_create_event with calendarId set to 'primary'
- Set summary to a descriptive meeting title
- Set start and end times in RFC 3339 format with the attendee's time zone
- Add the attendee's email to the attendees array
- If the caller requests a video call, include conferenceData with conferenceSolutionKey type 'hangoutsMeet' and set the conferenceDataVersion query parameter to 1
- Set sendUpdates to 'all' so attendees receive calendar invitations

Thank the attendee and inform them they will receive a calendar invitation shortly.

Clarifications:
- Do not inform the user that you are formatting the email; do it silently.
- If the caller asks you to proceed with booking, do so with the existing information.
- Use google_calendar_list_calendars if the caller asks to schedule on a specific calendar other than their primary one.
- Use google_calendar_list_events if the caller asks what meetings they have coming up.

Guardrails:
- Do not share any internal IDs or API details with the caller.
- If event creation fails, check for formatting issues in the email or time conflicts.
```

## Agent tools

When you add Google Calendar tools to an agent, the following built-in tools are available:

| Tool                                 | Description                                                                                                                                                                              |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `google_calendar_check_availability` | Check free/busy availability for one or more calendars within a time range. Returns busy time blocks so the agent can find open slots. Use before creating events to avoid conflicts.    |
| `google_calendar_create_event`       | Create a new event on a Google Calendar with optional attendees, location, and Google Meet conferencing. Sends email notifications to all participants.                                  |
| `google_calendar_list_events`        | List upcoming events from a calendar within a time range, ordered by start time. Supports free-text search across event summaries, descriptions, locations, and attendee details.        |
| `google_calendar_list_calendars`     | List all calendars accessible to the connected Google account. Returns calendar names and IDs. Use to discover which calendar to target before checking availability or creating events. |

## Useful links

* [Google Calendar API documentation](https://developers.google.com/calendar/api/v3/reference)
* [Google OAuth 2.0 scopes for Calendar](https://developers.google.com/identity/protocols/oauth2/scopes#calendar)
* [Google Calendar API quickstart](https://developers.google.com/calendar/api/quickstart/python)
* [ElevenLabs tools overview](/docs/eleven-agents/customization/tools/server-tools)