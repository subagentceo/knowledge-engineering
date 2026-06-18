> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Scheduling

Reception AI includes a full scheduling system. Your receptionist uses it to book appointments over the phone, and your customers can also book directly through your public booking page.

## How scheduling works

The scheduling system connects four things:

1. **Services** — What you offer (haircut, consultation, equipment rental)
2. **Staff** — Who provides the service
3. **Assets** — Resources needed (rooms, chairs, equipment)
4. **Availability** — When everything is free

When a customer wants to book, the receptionist checks all four to find open slots. A time slot is only offered when the business is open, at least one qualified staff member is free, required assets are available, and no conflicts exist.

## Booking channels

Appointments arrive from three sources, all feeding into the same calendar:

* **Phone** — Booked by your AI receptionist during calls
* **Website** — Self-scheduled by customers on your [booking page](/docs/reception-ai/features/booking-page)
* **Dashboard** — Created manually by you or your team

## Multiple locations

If your business operates from more than one address, each location has its own hours, staff assignments, and assets. The receptionist asks callers which location they prefer, and the booking page allows customers to choose.

## Assets

Assets represent physical resources required for appointments — rooms, chairs, courts, or equipment. Use them when a service needs a specific resource with limited availability.

Assets follow the same availability logic as staff: they have their own working hours, support time-off exceptions, and are only bookable when not already reserved.

For rental businesses, the asset *is* the service — create a rental-type service and link it to the corresponding asset.

## Time off

Time-off exceptions block specific dates for the entire business, individual staff members, or specific assets. If time off overlaps with existing appointments, you'll be warned about conflicts and can choose to cancel or keep them.

Add all known holidays at the beginning of the year so your receptionist never accidentally books
during a closure.

Service types, pricing, variants, and add-ons.

Operating hours, time-off exceptions, and availability logic.

Staff schedules, assignments, and calendar sync.