

The `lms server status` command displays the current status of the LM Studio local server, including whether it's running and its configuration.

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22--json%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Output%20the%20status%20in%20JSON%20format%22%0A-%20name%3A%20%22--verbose%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Enable%20detailed%20logging%20output%22%0A-%20name%3A%20%22--quiet%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Suppress%20all%20logging%20output%22%0A-%20name%3A%20%22--log-level%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22The%20level%20of%20logging%20to%20use.%20Defaults%20to%20'info'%22" />

Check server status [#check-server-status]

Get the basic status of the server:

```shell
lms server status
```

Example output:

```
The server is running on port 1234.
```

Example usage [#example-usage]

```console
➜  ~ lms server start
Starting server...
Waking up LM Studio service...
Success! Server is now running on port 1234

➜  ~ lms server status
The server is running on port 1234.
```

JSON output [#json-output]

Get the status in machine-readable JSON format:

```shell
lms server status --json --quiet
```

Example output:

```json
{ "running": true, "port": 1234 }
```

Control logging output [#control-logging-output]

Adjust logging verbosity:

```shell
lms server status --verbose
lms server status --quiet
lms server status --log-level debug
```

You can only use one logging control flag at a time (`--verbose`, `--quiet`, or `--log-level`).
