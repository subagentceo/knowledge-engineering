

Use `lms dev` inside a plugin project to run a local dev server that rebuilds and reloads on file changes.

This feature is a part of LM Studio [Plugins](/docs/typescript/plugins), currently in private beta.

Run the dev plugin server [#run-the-dev-plugin-server]

```shell
lms dev
```

This verifies `manifest.json`, installs dependencies if needed, and starts a watcher that rebuilds the plugin on changes. Supported runners: Node/ECMAScript and Deno.

Install the plugin instead of running dev [#install-the-plugin-instead-of-running-dev]

```shell
lms dev --install
```

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22-i%2C%20--install%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Install%20the%20plugin%20into%20LM%20Studio%20instead%20of%20running%20the%20dev%20server%22%0A-%20name%3A%20%22--no-notify%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Do%20not%20show%20the%20%5C%22Plugin%20started%5C%22%20notification%20in%20LM%20Studio%22" />
