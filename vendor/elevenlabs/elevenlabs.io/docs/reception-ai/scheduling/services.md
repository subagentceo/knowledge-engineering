> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Services

Services define what your customers can book. Each service has a type that determines how it behaves — who performs it, where it happens, and what resources are needed.

## Service types

Choose a type when you create a service. The type is permanent and cannot be changed later.

| Type              | How it works                                                      | Example                            |
| ----------------- | ----------------------------------------------------------------- | ---------------------------------- |
| **Appointment**   | One client books a time slot with a staff member at your location | Haircut, consultation, massage     |
| **Home / mobile** | You travel to the client's location — includes travel time buffer | Plumber, cleaning, mobile grooming |
| **Group session** | Multiple clients register for a scheduled session                 | Yoga class, workshop, tour         |
| **Rental**        | Clients book an asset for a time period                           | Court, kayak, studio, vehicle      |

Each type changes what configuration options are available. Rentals use assets instead of staff. Home/mobile services include travel time padding. Group sessions allow multiple registrants per slot.

## Variants

Every service needs at least one variant — a duration and price combination. Use variants to offer the same service at different lengths:

| Variant  | Duration | Price |
| -------- | -------- | ----- |
| Short    | 30 min   | \$50  |
| Standard | 60 min   | \$90  |
| Extended | 90 min   | \$125 |

You can have up to 20 variants per service. Each must have a unique duration. Variants can be individually activated or deactivated without deleting them.

## Buffer time and scheduling logic

Buffer time blocks minutes before and/or after each appointment for setup, cleanup, or transition. A 60-minute massage with 15 minutes of buffer effectively blocks 75 minutes in the calendar.

**Advance booking** controls how far into the future customers can schedule — from same-day to up to one year ahead.

**Travel time** (home/mobile services only) adds padding before and/or after the appointment for transit between locations.

## Staff and asset assignment

Each service needs either staff or assets (or both) assigned to it:

* **Staff** — Only assigned staff appear as available for this service. Choose specific people or enable random assignment to auto-assign whoever is free.
* **Assets** — If the service requires a physical resource (room, chair, equipment), assign it. The service is only bookable when the asset is free.

Rental services skip staff assignment entirely — the asset itself is what gets booked.

## Add-ons

Add-ons are optional extras customers can include when booking. Each add-on can extend the appointment duration, add cost, or both. Up to 10 per service.

For group sessions, add-ons only affect price (not duration), since all participants share the same time slot.

## Promotions

Time-limited discounts that apply to a service or a specific add-on. Each promotion targets specific days of the week and a date range. Your receptionist mentions active promotions when booking over the phone.

## Display order

The order you arrange services determines how they appear on your booking page and the sequence your receptionist uses when listing options to callers.