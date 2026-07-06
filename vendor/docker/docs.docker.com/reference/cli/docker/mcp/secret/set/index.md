# docker mcp secret set

**Description:** Set a secret in the local OS Keychain

**Usage:** `docker mcp secret set key[=value]`










## Description

Set a secret in the local OS Keychain




## Examples

### Pass the secret via STDIN

```console
echo my-secret-password > pwd.txt
cat pwd.txt | docker mcp secret set postgres_password
```



