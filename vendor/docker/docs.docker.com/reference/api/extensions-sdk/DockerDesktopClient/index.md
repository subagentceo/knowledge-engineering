# Interface: DockerDesktopClient


An amalgam of the v0 and v1 interfaces of the Docker Desktop API client,
provided for backwards compatibility reasons. Unless you're working with
a legacy extension, use the v1 type instead.

## Properties

### backend

• `Readonly` **backend**: `undefined` \| [`BackendV0`](/reference/api/extensions-sdk/DockerDesktopClient/BackendV0/)

The `window.ddClient.backend` object can be used to communicate with the backend defined in the vm section of
the extension metadata.
The client is already connected to the backend.

> [!WARNING]
>
> It will be removed in a future version. Use [extension](/reference/api/extensions-sdk/DockerDesktopClient/DockerDesktopClient/#extension) instead.

#### Inherited from

DockerDesktopClientV0.backend

___

### extension

• `Readonly` **extension**: [`Extension`](/reference/api/extensions-sdk/DockerDesktopClient/Extension/)

The `ddClient.extension` object can be used to communicate with the backend defined in the vm section of the
extension metadata.
The client is already connected to the backend.

#### Inherited from

DockerDesktopClientV1.extension

___

### desktopUI

• `Readonly` **desktopUI**: [`DesktopUI`](/reference/api/extensions-sdk/DockerDesktopClient/DesktopUI/)

#### Inherited from

DockerDesktopClientV1.desktopUI

___

### host

• `Readonly` **host**: [`Host`](/reference/api/extensions-sdk/DockerDesktopClient/Host/)

#### Inherited from

DockerDesktopClientV1.host

___

### docker

• `Readonly` **docker**: [`Docker`](/reference/api/extensions-sdk/DockerDesktopClient/Docker/)

#### Inherited from

DockerDesktopClientV1.docker

## Container Methods

### listContainers

▸ **listContainers**(`options`): `Promise`<`unknown`\>

Get the list of running containers (same as `docker ps`).

By default, this will not list stopped containers.
You can use the option `{"all": true}` to list all the running and stopped containers.

```typescript
const containers = await window.ddClient.listContainers();
```

> [!WARNING]
>
> It will be removed in a future version. Use [listContainers](/reference/api/extensions-sdk/DockerDesktopClient/Docker/#listcontainers) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `never` | (Optional). A JSON like `{ "all": true, "limit": 10, "size": true, "filters": JSON.stringify({ status: ["exited"] }), }` For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/reference/api/engine/version/v1.52/#operation/ContainerList). |

#### Returns

`Promise`<`unknown`\>

#### Inherited from

DockerDesktopClientV0.listContainers

___

## Image Methods

### listImages

▸ **listImages**(`options`): `Promise`<`unknown`\>

Get the list of images

```typescript
const images = await window.ddClient.listImages();
```

> [!WARNING]
>
> It will be removed in a future version. Use [listImages](/reference/api/extensions-sdk/DockerDesktopClient/Docker/#listimages) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `never` | (Optional). A JSON like `{ "all": true, "filters": JSON.stringify({ dangling: ["true"] }), "digests": true }` For more information about the different properties see [the Docker API endpoint documentation](https://docs.docker.com/reference/api/engine/version/v1.52/#tag/Image). |

#### Returns

`Promise`<`unknown`\>

#### Inherited from

DockerDesktopClientV0.listImages

___

## Navigation Methods

### navigateToContainers

▸ **navigateToContainers**(): `void`

Navigate to the container's window in Docker Desktop.
```typescript
window.ddClient.navigateToContainers();
```

> [!WARNING]
>
> It will be removed in a future version. Use [viewContainers](/reference/api/extensions-sdk/DockerDesktopClient/NavigationIntents/#viewcontainers) instead.

#### Returns

`void`

#### Inherited from

DockerDesktopClientV0.navigateToContainers

___

### navigateToContainer

▸ **navigateToContainer**(`id`): `Promise`<`any`\>

Navigate to the container window in Docker Desktop.
```typescript
await window.ddClient.navigateToContainer(id);
```

> [!WARNING]
>
> It will be removed in a future version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`any`\>

A promise that fails if the container doesn't exist.

#### Inherited from

DockerDesktopClientV0.navigateToContainer

___

### navigateToContainerLogs

▸ **navigateToContainerLogs**(`id`): `Promise`<`any`\>

Navigate to the container logs window in Docker Desktop.
```typescript
await window.ddClient.navigateToContainerLogs(id);
```

> [!WARNING]
>
> It will be removed in a future version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`any`\>

A promise that fails if the container doesn't exist.

#### Inherited from

DockerDesktopClientV0.navigateToContainerLogs

___

### navigateToContainerInspect

▸ **navigateToContainerInspect**(`id`): `Promise`<`any`\>

Navigate to the container inspect window in Docker Desktop.
```typescript
await window.ddClient.navigateToContainerInspect(id);
```

> [!WARNING]
>
> It will be removed in a future version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`any`\>

A promise that fails if the container doesn't exist.

#### Inherited from

DockerDesktopClientV0.navigateToContainerInspect

___

### navigateToContainerStats

▸ **navigateToContainerStats**(`id`): `Promise`<`any`\>

Navigate to the container stats to see the CPU, memory, disk read/write and network I/O usage.

```typescript
await window.ddClient.navigateToContainerStats(id);
```

> [!WARNING]
>
> It will be removed in a future version.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The full container id, e.g. `46b57e400d801762e9e115734bf902a2450d89669d85881058a46136520aca28`. You can use the `--no-trunc` flag as part of the `docker ps` command to display the full container id. |

#### Returns

`Promise`<`any`\>

A promise that fails if the container doesn't exist.

#### Inherited from

DockerDesktopClientV0.navigateToContainerStats

___

### navigateToImages

▸ **navigateToImages**(): `void`

Navigate to the images window in Docker Desktop.
```typescript
await window.ddClient.navigateToImages(id);
```

> [!WARNING]
>
> It will be removed in a future version. Use [viewImages](/reference/api/extensions-sdk/DockerDesktopClient/NavigationIntents/#viewimages) instead.

#### Returns

`void`

#### Inherited from

DockerDesktopClientV0.navigateToImages

___

### navigateToImage

▸ **navigateToImage**(`id`, `tag`): `Promise`<`any`\>

Navigate to a specific image referenced by `id` and `tag` in Docker Desktop.
In this navigation route you can find the image layers, commands, created time and size.

```typescript
await window.ddClient.navigateToImage(id, tag);
```

> [!WARNING]
>
> It will be removed in a future version. Use [viewImage](/reference/api/extensions-sdk/DockerDesktopClient/NavigationIntents/#viewimage) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The full image id (including sha), e.g. `sha256:34ab3ae068572f4e85c448b4035e6be5e19cc41f69606535cd4d768a63432673`. |
| `tag` | `string` | The tag of the image, e.g. `latest`, `0.0.1`, etc. |

#### Returns

`Promise`<`any`\>

A promise that fails if the container doesn't exist.

#### Inherited from

DockerDesktopClientV0.navigateToImage

___

### navigateToVolumes

▸ **navigateToVolumes**(): `void`

Navigate to the volumes window in Docker Desktop.

```typescript
await window.ddClient.navigateToVolumes();
```

> [!WARNING]
>
> It will be removed in a future version. Use [viewVolumes](/reference/api/extensions-sdk/DockerDesktopClient/NavigationIntents/#viewvolumes) instead.

#### Returns

`void`

#### Inherited from

DockerDesktopClientV0.navigateToVolumes

___

### navigateToVolume

▸ **navigateToVolume**(`volume`): `void`

Navigate to a specific volume in Docker Desktop.

```typescript
window.ddClient.navigateToVolume(volume);
```

> [!WARNING]
>
> It will be removed in a future version. Use [viewVolume](/reference/api/extensions-sdk/DockerDesktopClient/NavigationIntents/#viewvolume) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `volume` | `string` | The name of the volume, e.g. `my-volume`. |

#### Returns

`void`

#### Inherited from

DockerDesktopClientV0.navigateToVolume

___

## Other Methods

### execHostCmd

▸ **execHostCmd**(`cmd`): `Promise`<[`ExecResultV0`](/reference/api/extensions-sdk/DockerDesktopClient/ExecResultV0/)\>

Invoke a binary on the host. The binary is typically shipped with your extension using the host section in the extension metadata. Note that extensions run with user access rights, this API is not restricted to binaries listed in the host section of the extension metadata (some extensions might install software during user interaction, and invoke newly installed binaries even if not listed in the extension metadata) 

```typescript
window.ddClient.execHostCmd(`cliShippedOnHost xxx`).then((cmdResult: any) => {
 console.log(cmdResult);
});
```

> [!WARNING]
>
> It will be removed in a future version. Use [exec](/reference/api/extensions-sdk/DockerDesktopClient/ExtensionCli/#exec) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to be executed. |

#### Returns

`Promise`<[`ExecResultV0`](/reference/api/extensions-sdk/DockerDesktopClient/ExecResultV0/)\>

#### Inherited from

DockerDesktopClientV0.execHostCmd

___

### spawnHostCmd

▸ **spawnHostCmd**(`cmd`, `args`, `callback`): `void`

Invoke an extension binary on your host and get the output stream.

```typescript
window.ddClient.spawnHostCmd(
  `cliShippedOnHost`,
  [`arg1`, `arg2`],
  (data: any, err: any) => {
    console.log(data.stdout, data.stderr);
    // Once the command exits we get the status code
    if (data.code) {
      console.log(data.code);
    }
  }
);
```

> [!WARNING]
>
> It will be removed in a future version. Use [exec](/reference/api/extensions-sdk/DockerDesktopClient/ExtensionCli/#exec) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to be executed. |
| `args` | `string`[] | The arguments of the command to execute. |
| `callback` | (`data`: `any`, `error`: `any`) => `void` | The callback function where to listen from the command output data and errors. |

#### Returns

`void`

#### Inherited from

DockerDesktopClientV0.spawnHostCmd

___

### execDockerCmd

▸ **execDockerCmd**(`cmd`, `...args`): `Promise`<[`ExecResultV0`](/reference/api/extensions-sdk/DockerDesktopClient/ExecResultV0/)\>

You can also directly execute the Docker binary.

```typescript
const output = await window.ddClient.execDockerCmd("info");
```

> [!WARNING]
>
> It will be removed in a future version. Use [exec](/reference/api/extensions-sdk/DockerDesktopClient/DockerCommand/#exec) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to execute. |
| `...args` | `string`[] | The arguments of the command to execute. |

#### Returns

`Promise`<[`ExecResultV0`](/reference/api/extensions-sdk/DockerDesktopClient/ExecResultV0/)\>

The result will contain both the standard output and the standard error of the executed command:
```json
{
  "stderr": "...",
  "stdout": "..."
}
```
For convenience, the command result object also has methods to easily parse it depending on the output format:

- `output.lines(): string[]` splits output lines.
- `output.parseJsonObject(): any` parses a well-formed JSON output.
- `output.parseJsonLines(): any[]` parses each output line as a JSON object.

If the output of the command is too long, or you need to get the output as a stream you can use the
 * spawnDockerCmd function:

```typescript
window.ddClient.spawnDockerCmd("logs", ["-f", "..."], (data, error) => {
  console.log(data.stdout);
});
```

#### Inherited from

DockerDesktopClientV0.execDockerCmd

___

### spawnDockerCmd

▸ **spawnDockerCmd**(`cmd`, `args`, `callback`): `void`

> [!WARNING]
>
> It will be removed in a future version. Use [exec](/reference/api/extensions-sdk/DockerDesktopClient/DockerCommand/#exec) instead.

#### Parameters

| Name | Type |
| :------ | :------ |
| `cmd` | `string` |
| `args` | `string`[] |
| `callback` | (`data`: `any`, `error`: `any`) => `void` |

#### Returns

`void`

#### Inherited from

DockerDesktopClientV0.spawnDockerCmd

___

### openExternal

▸ **openExternal**(`url`): `void`

Opens an external URL with the system default browser.

```typescript
window.ddClient.openExternal("https://docker.com");
```

> [!WARNING]
>
> It will be removed in a future version. Use [openExternal](/reference/api/extensions-sdk/DockerDesktopClient/Host/#openexternal) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL the browser opens (must have the protocol `http` or `https`). |

#### Returns

`void`

#### Inherited from

DockerDesktopClientV0.openExternal

___

## Toast Methods

### toastSuccess

▸ **toastSuccess**(`msg`): `void`

Display a toast message of type success.

```typescript
window.ddClient.toastSuccess("message");
```

>**Warning`**
>
> It will be removed in a future version. Use [success](/reference/api/extensions-sdk/DockerDesktopClient/Toast/#success) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the toast. |

#### Returns

`void`

#### Inherited from

DockerDesktopClientV0.toastSuccess

___

### toastWarning

▸ **toastWarning**(`msg`): `void`

Display a toast message of type warning.

```typescript
window.ddClient.toastWarning("message");
```

> [!WARNING]
>
> It will be removed in a future version. Use [warning](/reference/api/extensions-sdk/DockerDesktopClient/Toast/#warning) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the toast. |

#### Returns

`void`

#### Inherited from

DockerDesktopClientV0.toastWarning

___

### toastError

▸ **toastError**(`msg`): `void`

Display a toast message of type error.

```typescript
window.ddClient.toastError("message");
```

> [!WARNING]
>
> It will be removed in a future version. Use [error](/reference/api/extensions-sdk/DockerDesktopClient/Toast/#error) instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `msg` | `string` | The message to display in the toast. |

#### Returns

`void`

#### Inherited from

DockerDesktopClientV0.toastError

