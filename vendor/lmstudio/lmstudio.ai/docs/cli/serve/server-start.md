

The `lms server start` command launches the LM Studio local server, allowing you to interact with loaded models via HTTP API calls.

Flags [#flags]

<DocsParamsTable data="-%20name%3A%20%22--port%22%0A%20%20type%3A%20%22number%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Port%20to%20run%20the%20server%20on.%20If%20not%20provided%2C%20uses%20the%20last%20used%20port%22%0A-%20name%3A%20%22--cors%22%0A%20%20type%3A%20%22flag%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Enable%20CORS%20support%20for%20web%20application%20development.%20When%20not%20set%2C%20CORS%20is%20disabled%22%0A-%20name%3A%20%22--bind%22%0A%20%20type%3A%20%22string%22%0A%20%20optional%3A%20true%0A%20%20description%3A%20%22Network%20address%20to%20bind%20the%20server%20to.%20Use%20%5C%220.0.0.0%5C%22%20to%20listen%20on%20all%20IPv4%20interfaces%2C%20or%20%5C%22127.0.0.1%5C%22%20(default)%20for%20localhost%20only.%20Can%20also%20be%20set%20via%20the%20LMS_SERVER_HOST%20environment%20variable.%22" />

Start the server [#start-the-server]

Start the server with default settings:

```shell
lms server start
```

Specify a custom port [#specify-a-custom-port]

Run the server on a specific port:

```shell
lms server start --port 3000
```

Enable CORS support [#enable-cors-support]

For usage with web applications or some VS Code extensions, you may need to enable CORS support:

```shell
lms server start --cors
```

<Callout type="warning" title="Warning - Security Risk">
  Enabling CORS can expose your server to security risks; we recommend enabling [authentication](/docs/developer/core/authentication). Only do this if you know what you're doing.
</Callout>

Bind to a network address [#bind-to-a-network-address]

To make the server available on your local network, run:

<Callout type="warning" title="Heads Up">
  Any bind other than `127.0.0.1` exposes the server beyond `localhost`; we recommend enabling [authentication](/docs/developer/core/authentication). Only do this if you know what you're doing.
</Callout>

```shell
lms server start --bind 0.0.0.0
```

Check the server status [#check-the-server-status]

See [`lms server status`](/docs/cli/serve/server-status) for more information on checking the status of the server.
