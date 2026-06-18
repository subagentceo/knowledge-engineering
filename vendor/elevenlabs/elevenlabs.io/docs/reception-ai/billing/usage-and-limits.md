> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Usage and limits

## Credit system

Your plan includes a monthly pool of credits. Credits are consumed by different activities at different rates:

| Activity                         | Credit cost     |
| -------------------------------- | --------------- |
| AI receptionist phone call       | 1.0 per minute  |
| Web chat session                 | 0.5 per minute  |
| Staff-first mode (human answers) | 1.0 per minute  |
| Assistant chat message           | 0.1 per message |

### Checking usage

Go to **Settings** → **Billing** to see:

* Total credits in your pool
* Credits used this billing period
* Credits remaining
* Breakdown by type (phone minutes, web minutes, chat messages)

## Resource limits

Each plan has hard limits on:

| Resource               | Basic | Plus | Premium |
| ---------------------- | ----- | ---- | ------- |
| Phone numbers          | 1     | 3    | 5       |
| Receptionists          | 1     | 3    | 5       |
| Locations              | 1     | 5    | 20      |
| Knowledge sources      | 10    | 20   | 50      |
| Concurrent calls       | 3     | 10   | 20      |
| Assistant messages/day | 150   | 300  | 500     |

## Credit refresh

Credits reset at the start of each billing period. Unused credits do not roll over.

## Overage

On paid plans, exceeding your credit pool triggers overage billing at **\$0.40 per credit**. This means:

* Extra phone minutes: \$0.40/min
* Extra web minutes: $0.20/min (0.5 credits × $0.40)
* Extra chat messages: $0.04/message (0.1 credits × $0.40)

## Assistant daily limit

The business assistant has a separate daily message cap that resets at midnight UTC:

| Plan    | Messages per day |
| ------- | ---------------- |
| Trial   | 500              |
| Basic   | 150              |
| Plus    | 300              |
| Premium | 500              |

When the limit is reached, a banner appears with an option to upgrade.