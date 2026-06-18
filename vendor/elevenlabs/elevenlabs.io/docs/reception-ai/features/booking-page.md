> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Booking page

Your public booking page is a hosted page where customers can browse services and book appointments online without calling.

## How it works

When you enable your booking page, Reception AI generates a URL like:

```
https://app.reception.ai/book/your-business-slug
```

Customers visiting this page can:

1. Browse your available services
2. Select a preferred staff member (optional)
3. Choose an available date and time
4. Enter their contact details
5. Confirm the booking

They receive a confirmation email with a unique confirmation number and a management link.

## Scheduling behavior

The booking page respects the same availability rules as phone bookings:

| Setting                      | What it controls                                  | Default |
| ---------------------------- | ------------------------------------------------- | ------- |
| **Slot interval**            | Time increments shown (10, 15, 20, 30, or 60 min) | 15 min  |
| **Advance booking window**   | How far ahead customers can book (7–365 days)     | 14 days |
| **Concurrent booking limit** | Max overlapping appointments per location         | Off     |

## Self-service booking management

After booking, customers receive a secure management link (unique per booking, no login required). They can:

* **Reschedule** — Move to a different available time slot
* **Cancel** — Cancel the appointment entirely
* **View details** — See date, time, service, and staff

The AI receptionist can also help callers manage existing bookings by looking up their phone number or confirmation number.

Changing your booking page URL slug breaks existing links. Update any published URLs if you change
it.

## Group events

Group events are sessions where multiple customers participate at the same time — yoga classes, cooking workshops, group training sessions, and similar activities.

Unlike regular appointments (one customer, one time slot), group events have:

* **Fixed schedule** — The event happens at a set date and time
* **Capacity** — Maximum number of participants (2–200)
* **Per-person seats** — Customers can book multiple spots (e.g., bringing a friend)
* **Add-ons** — Optional extras per participant (add price only, not duration)

To set up a group event, create a service with type **Group**, set the capacity, define available add-ons, then create specific event sessions in the calendar.

On your booking page, customers see upcoming group events with available spots, price per person, and optional add-ons. After registering, they receive a management link where they can cancel, change the number of seats, modify add-ons, or switch to a different session.

## Sharing your booking page

Link to your booking page from:

* Your website (add a "Book now" button)
* Google Business Profile
* Social media bios
* Email signatures