# The stdio Transport

- The client launches the server as a **separate process** and communicates over standard input/output: client writes to the server's stdin and reads its stdout; server writes stdout, reads stdin.
- **Full bidirectional** — either side can initiate a request at any time. So sampling, progress, and logging all work cleanly.
- **Limitation:** only works when client and server run on the **same physical machine**.

Initialization sequence: (1) initialize request (client→server), (2) initialize result (server→client), (3) initialize notification (client→server, no response).

See [`scripts/stdio_server.py`](../scripts/stdio_server.py) for a server running over stdio.
