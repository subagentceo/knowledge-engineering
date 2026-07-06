

The `lms daemon up` command starts llmster

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22--json%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Output%20the%20result%20in%20JSON%20format%22" />

Start the daemon [#start-the-daemon]

```shell
lms daemon up
```

If the daemon is not already running, this starts it and prints the PID. If it is already running, it reports the current status.

JSON output [#json-output]

For scripting or automation:

```shell
lms daemon up --json
```

Example output:

```json
{ "status": "running", "pid": 26754, "isDaemon": true, "version": "0.4.4+1" }
```

Check the daemon status [#check-the-daemon-status]

See [`lms daemon status`](/docs/cli/daemon/daemon-status) to check whether the daemon is running.

Learn more [#learn-more]

To find out more about llmster, see [Headless Mode](/docs/developer/core/headless).
