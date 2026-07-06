

The `lms daemon update` command fetches and installs the latest version of llmster.

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22--beta%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Update%20to%20the%20latest%20beta%20release%22" />

Update the daemon [#update-the-daemon]

Stop the daemon first:

```shell
lms daemon down
```

Then run the update:

```shell
lms daemon update
```

Fetches the latest stable release and installs it.

Update to the beta channel [#update-to-the-beta-channel]

```shell
lms daemon update --beta
```

After updating [#after-updating]

Start the daemon again to use the new version:

```shell
lms daemon up
```

To find out more about llmster, see [Headless Mode](/docs/developer/core/headless).
