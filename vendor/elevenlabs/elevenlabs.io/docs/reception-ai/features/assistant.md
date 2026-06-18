> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Business assistant

The business assistant is a built-in AI chat interface for managing your business through natural language requests.

## What the assistant can do

The assistant has access to all your business data and can perform actions across every area:

| Category          | Example requests                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| **Scheduling**    | "Show me tomorrow's appointments", "Book John for a haircut at 3pm Friday"                      |
| **Clients**       | "Find the client who called yesterday about pricing", "Create a new client for Sarah, 555-0123" |
| **Services**      | "Add a new service called Deep Tissue Massage, 60 min, \$90"                                    |
| **Staff**         | "Who's working this Saturday?", "Add a day off for Mark next Wednesday"                         |
| **Analytics**     | "What's my revenue this week vs last week?", "How many bookings came from the website?"         |
| **Configuration** | "Update our Friday hours to close at 6pm", "Change the booking page slug to 'downtown-salon'"   |
| **Products**      | "Add a product: Organic Shampoo, \$24.99"                                                       |
| **Calendar**      | "Cancel all appointments for next Monday — we're closed"                                        |

## How to access it

The assistant is accessible in two ways:

* **Full page** — Click **Assistant** in the sidebar for a dedicated chat view.
* **Docked panel** — Toggle the assistant panel from the header on any page.

## Confirmable changes

When you ask the assistant to modify data (create, update, or delete anything), it shows exactly what it plans to do and waits for your confirmation before executing.

For batch operations (like cancelling multiple appointments), it shows the full list of changes for you to approve or reject.

The assistant never changes data without explicit approval.

## Rich responses

The assistant's responses can include clickable mentions of:

* **Staff** — Click to see staff details
* **Services** — Click to see service configuration
* **Assets** — Click to see asset info
* **Clients** — Click to see client profile
* **Products** — Click to see product details

## Conversation history

Your past conversations are saved in the sidebar. You can:

* Browse previous chats
* Continue an old conversation
* Start a new conversation
* Delete conversations you no longer need

## Daily message limit

Each plan has a daily message cap that resets at midnight UTC:

| Plan    | Messages per day |
| ------- | ---------------- |
| Trial   | 500              |
| Basic   | 150              |
| Plus    | 300              |
| Premium | 500              |

A banner appears when approaching or reaching the limit, with an option to upgrade.

## Setup

The assistant is created automatically when you first access it. If it hasn't been set up yet, you'll see a **Create Assistant** button — click it and the assistant agent is provisioned for your workspace.