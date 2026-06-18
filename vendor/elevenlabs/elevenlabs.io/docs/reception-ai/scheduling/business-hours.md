> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Business hours

Business hours define when your business is open and accepting bookings. Your receptionist uses these hours to inform callers and only offers appointment slots within your configured schedule.

## Weekly schedule

Set open and close times for each day of the week. You can define multiple time blocks per day (e.g., 9:00–12:00 and 14:00–18:00 for a lunch break) or mark entire days as closed.

These hours apply business-wide by default. Individual [staff members](/docs/reception-ai/scheduling/staff) and assets can have their own schedules that override the defaults.

## Time-off exceptions

Exceptions override your regular schedule for specific dates — holidays, vacation days, special closures, or extended hours for events.

Each exception targets a specific scope:

| Scope        | Effect                           | Example                            |
| ------------ | -------------------------------- | ---------------------------------- |
| **Business** | Entire business closed           | Public holiday, annual shutdown    |
| **Staff**    | Specific team member unavailable | Vacation, sick day, personal leave |
| **Asset**    | Specific resource unavailable    | Equipment maintenance, renovation  |

### Conflict handling

When time off overlaps with existing appointments, the system warns you and lists all affected bookings. You then choose to:

* Cancel conflicting appointments (affected clients can be notified automatically)
* Keep them as-is (useful for tentative closures or partial-day exceptions)

Time off never silently removes existing bookings.

Add all known holidays at the beginning of the year so your receptionist never accidentally books
during a closure.

## How availability is calculated

A time slot is bookable only when **all** of the following conditions are met:

1. The business is open during that time
2. At least one assigned staff member is working
3. Required assets are free
4. No conflicting appointments exist
5. No time-off exceptions apply
6. Google Calendar (if connected) shows the staff member as free

If any single condition fails, the slot is not offered — whether by phone, booking page, or dashboard.