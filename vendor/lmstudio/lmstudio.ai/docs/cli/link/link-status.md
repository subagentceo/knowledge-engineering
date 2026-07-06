

The `lms link status` command shows whether LM Link is enabled on this device, and lists connected peers and their loaded models.

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22--json%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Output%20the%20status%20in%20JSON%20format%22" />

Check status [#check-status]

```shell
lms link status
```

Displays this device's name, connection state, and a list of connected peers with their currently loaded models.

JSON output [#json-output]

For scripting or automation:

```shell
lms link status --json
```

Enable or disable LM Link [#enable-or-disable-lm-link]

* [`lms link enable`](/docs/cli/link/link-enable) — enable LM Link on this device.
* [`lms link disable`](/docs/cli/link/link-disable) — disable LM Link on this device.

Learn more [#learn-more]

See the [LM Link documentation](/docs/lmlink) for a full overview of LM Link.
