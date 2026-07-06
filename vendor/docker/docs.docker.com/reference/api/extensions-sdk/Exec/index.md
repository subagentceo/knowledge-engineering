# Interface: Exec


## Callable

### Exec

▸ **Exec**(`cmd`, `args`, `options?`): `Promise`<[`ExecResult`](/reference/api/extensions-sdk/Exec/ExecResult/)\>

Executes a command.

**`Since`**

0.2.0

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to execute. |
| `args` | `string`[] | The arguments of the command to execute. |
| `options?` | [`ExecOptions`](/reference/api/extensions-sdk/Exec/ExecOptions/) | The list of options. |

#### Returns

`Promise`<[`ExecResult`](/reference/api/extensions-sdk/Exec/ExecResult/)\>

A promise that will resolve once the command finishes.

### Exec

▸ **Exec**(`cmd`, `args`, `options`): [`ExecProcess`](/reference/api/extensions-sdk/Exec/ExecProcess/)

Streams the result of a command if `stream` is specified in the `options` parameter.

Specify the `stream` if the output of your command is too long or if you need to stream things indefinitely (for example container logs).

**`Since`**

0.2.2

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cmd` | `string` | The command to execute. |
| `args` | `string`[] | The arguments of the command to execute. |
| `options` | [`SpawnOptions`](/reference/api/extensions-sdk/Exec/SpawnOptions/) | The list of options. |

#### Returns

[`ExecProcess`](/reference/api/extensions-sdk/Exec/ExecProcess/)

The spawned process.

