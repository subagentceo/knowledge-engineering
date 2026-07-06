# Interface: ExecResult


**`Since`**

0.2.0

## Hierarchy

- [`RawExecResult`](/reference/api/extensions-sdk/ExecResult/RawExecResult/)

  ↳ **`ExecResult`**

## Methods

### lines

▸ **lines**(): `string`[]

Split output lines.

#### Returns

`string`[]

The list of lines.

___

### parseJsonLines

▸ **parseJsonLines**(): `any`[]

Parse each output line as a JSON object.

#### Returns

`any`[]

The list of lines where each line is a JSON object.

___

### parseJsonObject

▸ **parseJsonObject**(): `any`

Parse a well-formed JSON output.

#### Returns

`any`

The JSON object.

## Properties

### cmd

• `Optional` `Readonly` **cmd**: `string`

#### Inherited from

[RawExecResult](/reference/api/extensions-sdk/ExecResult/RawExecResult/).[cmd](/reference/api/extensions-sdk/ExecResult/RawExecResult/#cmd)

___

### killed

• `Optional` `Readonly` **killed**: `boolean`

#### Inherited from

[RawExecResult](/reference/api/extensions-sdk/ExecResult/RawExecResult/).[killed](/reference/api/extensions-sdk/ExecResult/RawExecResult/#killed)

___

### signal

• `Optional` `Readonly` **signal**: `string`

#### Inherited from

[RawExecResult](/reference/api/extensions-sdk/ExecResult/RawExecResult/).[signal](/reference/api/extensions-sdk/ExecResult/RawExecResult/#signal)

___

### code

• `Optional` `Readonly` **code**: `number`

#### Inherited from

[RawExecResult](/reference/api/extensions-sdk/ExecResult/RawExecResult/).[code](/reference/api/extensions-sdk/ExecResult/RawExecResult/#code)

___

### stdout

• `Readonly` **stdout**: `string`

#### Inherited from

[RawExecResult](/reference/api/extensions-sdk/ExecResult/RawExecResult/).[stdout](/reference/api/extensions-sdk/ExecResult/RawExecResult/#stdout)

___

### stderr

• `Readonly` **stderr**: `string`

#### Inherited from

[RawExecResult](/reference/api/extensions-sdk/ExecResult/RawExecResult/).[stderr](/reference/api/extensions-sdk/ExecResult/RawExecResult/#stderr)

