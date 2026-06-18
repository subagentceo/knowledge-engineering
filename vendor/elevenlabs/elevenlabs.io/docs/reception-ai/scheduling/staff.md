> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Staff

Staff members represent the people who deliver your services. The scheduling system uses their availability, service assignments, and calendar data to determine which time slots to offer customers.

## How staff affect availability

When a customer wants to book a service, the system:

1. Identifies which staff members can perform that service
2. Checks who is working at the requested time
3. Excludes anyone with a conflicting appointment or busy Google Calendar event
4. Offers the remaining open slots

If no qualified staff member is available, the slot is not offered — even if the business is technically open.

## Schedule options

Each staff member's working hours can be configured independently:

* **Inherit company hours** — Follows the business-wide schedule automatically. Changes to business hours propagate to these staff members.
* **Custom schedule** — Per-day time slots independent of business hours. Use for part-time employees or staggered shifts.
* **Location-specific hours** — Different availability per location. A stylist might work Monday–Wednesday at one salon and Thursday–Saturday at another.

## Service assignments

Assigning a staff member to a service is bidirectional — it updates both the staff profile and the service configuration. Only assigned staff appear as options when that service is booked.

For services with **random assignment** enabled, the system automatically picks whichever qualified staff member has the earliest available slot.

## Google Calendar sync

Connecting a staff member's Google Calendar enables two-way awareness:

* **Inbound** — Personal calendar events block Reception AI availability in real-time. If Google shows "busy," that slot is not offered.
* **Outbound** — Reception AI bookings can sync back to their Google Calendar so staff see appointments alongside personal events.

You choose which of their calendars to monitor for conflicts (work, personal, or both).

If a staff member's Google Calendar connection expires or becomes unhealthy, their availability
won't reflect external events. This may lead to double-bookings until the connection is restored.

## Staff on the booking page

On your public booking page, you control whether customers can pick a specific person:

* **Show all staff** (default) — Customers choose who they want
* **Hide specific staff** — Some team members are only bookable by phone
* **Disable selection** — The system auto-assigns based on availability; customers just pick a time