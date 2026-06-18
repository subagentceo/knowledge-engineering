> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Phone numbers

Every Reception AI account gets at least one dedicated US phone number. This is the number customers call to reach your AI receptionist.

## Getting your first number

During onboarding, you choose a preferred 3-digit area code (e.g., 415, 212). Reception AI assigns an available number from the pool matching that area code.

## Managing phone numbers

Phone numbers are managed in **Receptionists** → select a receptionist → **Call settings** → **Phone numbers** section.

### Claiming a number

On higher-tier plans, you can claim additional phone numbers:

1. Click **Add phone number**
2. Optionally filter by area code
3. A number is assigned from the available pool
4. Assign it to a receptionist

### Reassigning a number

Move a phone number from one receptionist to another:

1. Select the number
2. Choose a different active receptionist as the target

### Releasing a number

Release a number back to the pool when you no longer need it.

Releasing is permanent. You cannot get the same number back. The number returns to the shared pool
and may be assigned to someone else.

## Plan limits

| Plan    | Phone numbers |
| ------- | ------------- |
| Trial   | 1             |
| Basic   | 1             |
| Plus    | 3             |
| Premium | 5             |

## How inbound calls are routed

When a call arrives at your number, the system processes it in the following order:

1. **Blocked number check** — Rejected if the caller is on your block list.
2. **Answering mode check** — If staff-first is enabled and within schedule, the staff phone rings first.
3. **Staff timeout** — If staff does not answer within the configured ring time, the call continues to AI.
4. **AI receptionist** — Greets the caller and handles the conversation.
5. **Entitlement check** — Requires an active subscription or trial. Deactivated numbers do not accept calls.

## Number deactivation

Numbers can be deactivated (stop accepting calls) when:

* You manually deactivate the receptionist assigned to it
* Your subscription is cancelled or expires (14-day grace period before release)
* You exceed your plan's phone number limit after a downgrade

Deactivated numbers are reserved for you during the grace period — they can be reactivated by upgrading or renewing.