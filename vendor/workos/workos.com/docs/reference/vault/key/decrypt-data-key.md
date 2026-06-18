# Encryption key management

The key management APIs can be used to generate isolated encryption keys for local encryption and decryption operations.

## Create a data key

Generate a data key for local encryption based on the provided key context.

The encrypted data key **MUST** be stored by the application, as it cannot be retrieved after generation.

#### Request

#### Response

## Decrypt a data key

Decrypt a previously encrypted data key from WorkOS Vault.

#### Request

#### Response

## Decrypt data

Decrypt data that was previously encrypted with Vault. The data key in the ciphertext is decrypted using the Vault API and used to decrypt the remaining data. The decryption operations happen locally and neither the plaintext nor encrypted data are sent over the network.

#### Request

#### Response

## Encrypt data

Perform a local encryption option. A data key is generated based on the provided key context and used to encrypt the data. The operation happens locally and neither the plaintext nor encrypted data are sent over the network.

#### Request

#### Response

## Rekey a data key

Re-encrypt an existing data key using the provided key context.

Use this endpoint to migrate data keys from one key context to another without re-encrypting the underlying data.

If the encrypted data key includes multiple key entries, Vault decrypts the data key with the first entry it can decrypt and re-encrypts it using the provided key context.

#### Request

#### Response

### /vault/v1/keys/data-key

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `context` | object | Yes | Map of values used to determine the encryption key. |

### /vault/v1/keys/decrypt

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `keys` | string | Yes | Base64-encoded encrypted data key to decrypt. |

### /vault/v1/keys/rekey

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `context` | object | Yes | Map of values used to determine the new encryption key. |
| `encrypted_keys` | string | Yes | The encrypted data key returned by Create a data key or a previous Rekey call. |