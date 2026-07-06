

The `lms daemon status` command reports whether llmster is currently running.

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22--json%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Output%20the%20status%20in%20JSON%20format%22" />

Check daemon status [#check-daemon-status]

```shell
lms daemon status
```

JSON output [#json-output]

For scripting or automation:

```shell
lms daemon status --json
```

Example output when running:

```json
{ "status": "running", "pid": 12345, "isDaemon": true }
```

Example output when not running:

```json
{ "status": "not-running" }
```

Start or stop the daemon [#start-or-stop-the-daemon]

* [`lms daemon up`](/docs/cli/daemon/daemon-up) — start the daemon.
* [`lms daemon down`](/docs/cli/daemon/daemon-down) — stop the daemon.

To find out more about llmster, see [Headless Mode](/docs/developer/core/headless).
