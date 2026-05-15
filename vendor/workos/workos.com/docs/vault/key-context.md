# Key Context

When encrypting data with Vault, a set of key-value metadata pairs called the key context is required. This determines which key or keys will be used to encrypt the data without needing to explicitly list IDs for the keys. The key context is used both when [creating an encrypted object](https://workos.com/docs/reference/vault/object/create) and when [encrypting locally](https://workos.com/docs/reference/vault/key/encrypt-data) with Vault-managed keys.

## Key matching

Each item in the context is used to identify a long-lived key within the WorkOS environment called a key-encrypting key (KEK). The key material lives in a Hardware Security Module (HSM) and cannot be exported to plaintext - it can only be used to generate or decrypt data keys.
KEKs are created just-in-time and don't require any configuration in advance.

### Bring Your Own Key (BYOK)

When Vault is used with a BYOK setup, the customer-managed key (CMK) is used in place of the WorkOS managed KEK. Matching the encryption operation to the CMK is still done based on the key context.

For example, if Vault is configured to use a CMK called `key_abc` for all data of `organization_abc123`, then that key would automatically be used when the key context is set to `{"organization_id": "organization_abc123"}`. The same operation with a context of `{"organization_id": "organization_xzy987"}` would instead use a WorkOS managed KEK.

## Data keys

Although the KEKs identified by key context are long-lived, they aren't directly used for encrypting data. A random data-encrypting key (DEK) is generated for an encryption operation. The DEK is then encrypted using each KEK from the key context, resulting in a single plaintext key and one or more encrypted keys. The encrypted keys are then stored with the encrypted data for future decryption. This ensures that the data and keys have the same durability while keeping the keys safe. It also means that even if one key is exposed, not all of the data will be at risk since many different data keys are used for the same key context.

## Limitations

The following limitations are enforced by the Vault API for the key context object:

- All values in the context must be strings.
- A maximum of 10 items can be present in a single context.
- Each context name has a maximum length of 120 characters.
- Each context value has a maximum length of 500 characters.
