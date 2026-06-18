> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Google Calendar

Google Calendar integration lets your receptionist check staff availability in real-time. When a staff member has a meeting or personal event on their Google Calendar, those times are automatically blocked for bookings.

## How it works

1. Each staff member connects their Google Calendar
2. Reception AI reads their calendar events (free/busy status)
3. When checking availability, blocked times on Google Calendar are excluded
4. New bookings from Reception AI can optionally sync back to Google Calendar

## Connecting a staff member's calendar

### Go to integrations

Navigate to **Integrations** → **Google Calendar**.

### Initiate connection

Click **Connect** next to the staff member you want to link.

### Authorize with Google

The staff member signs in with their Google account and grants access to:

* Read calendar events (free/busy)
* View calendar list
* Manage owned events (for syncing bookings back)

### Configure sync settings

Choose which calendars to monitor for availability and whether to create events for new bookings.

## Sync settings

For each connected staff member, configure:

| Setting                 | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| **Monitored calendars** | Which Google calendars to check for conflicts                 |
| **Create events**       | Whether to add Reception AI bookings to their Google Calendar |

## Troubleshooting

If the sidebar shows a warning indicator next to a staff member:

* **Token expired** — The staff member needs to re-authorize
* **Connection lost** — Network or Google API issue; try reconnecting
* **Calendar not found** — The monitored calendar was deleted or renamed

To fix, go to **Integrations** → **Google Calendar** → click the affected staff member → **Reconnect**.

If a staff member's Google Calendar connection is unhealthy, their availability won't include
Google Calendar data. This may lead to double-bookings until resolved.