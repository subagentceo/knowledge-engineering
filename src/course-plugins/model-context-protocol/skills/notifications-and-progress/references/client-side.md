# Client Side — Handling Notifications

- Create a **logging callback** and pass it to the **client session**.
- Create a separate **progress callback** and pass it to **`call_tool`**.
- The callbacks decide how to display the info (terminal output, web UI, etc.).

## Why
Prevents confusion about stalled/failed calls and gives visibility into long-running operations. Both are server-to-client traffic, so they depend on a transport that supports that direction.
