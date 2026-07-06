# Extension UI API


The extensions UI runs in a sandboxed environment and doesn't have access to any
electron or nodejs APIs.

The extension UI API provides a way for the frontend to perform different actions
and communicate with the Docker Desktop dashboard or the underlying system.

JavaScript API libraries, with Typescript support, are available in order to get all the API definitions in to your extension code.

- [@docker/extension-api-client](https://www.npmjs.com/package/@docker/extension-api-client) gives access to the extension API entrypoint `DockerDesktopClient`.
- [@docker/extension-api-client-types](https://www.npmjs.com/package/@docker/extension-api-client-types) can be added as a dev dependency in order to get types auto-completion in your IDE.

```Typescript
import { createDockerDesktopClient } from '@docker/extension-api-client';

export function App() {
  // obtain Docker Desktop client
  const ddClient = createDockerDesktopClient();
  // use ddClient to perform extension actions
}
```

The `ddClient` object gives access to various APIs:

- [Extension Backend](/extensions/extensions-sdk/dev/api/overview/backend/)
- [Docker](/extensions/extensions-sdk/dev/api/overview/docker/)
- [Dashboard](/extensions/extensions-sdk/dev/api/overview/dashboard/)
- [Navigation](/extensions/extensions-sdk/dev/api/overview/dashboard-routes-navigation/)

See also the [Extensions API reference](/reference/api/extensions-sdk/).

