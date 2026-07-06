# docker sandbox network proxy

**Description:** Manage proxy configuration for a sandbox

**Usage:** `docker sandbox network proxy <sandbox> [OPTIONS]`










## Description

> [!WARNING]
> The Docker Desktop-integrated `docker sandbox` commands are deprecated and
> replaced by the standalone [`sbx` CLI](/ai/sandboxes/).
> This deprecation applies only to the Docker Desktop integration, not to Docker
> Sandboxes.

Manage proxy configuration for a sandbox


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--allow-cidr` |  |  Remove an IP range in CIDR notation from the block or bypass lists (can be specified multiple times)<br> |
| `--allow-host` |  |  Permit access to a domain or IP (can be specified multiple times) |
| `--block-cidr` |  |  Block access to an IP range in CIDR notation (can be specified multiple times)<br> |
| `--block-host` |  |  Block access to a domain or IP (can be specified multiple times) |
| `--bypass-cidr` |  |  Bypass MITM proxy for an IP range in CIDR notation (can be specified multiple times)<br> |
| `--bypass-host` |  |  Bypass MITM proxy for a domain or IP (can be specified multiple times)<br> |
| `--policy` |  |  Set the default policy |



## Examples

### Block access to a domain

```console
$ docker sandbox network proxy my-sandbox --block-host example.com
```

### Block multiple domains

```console
$ docker sandbox network proxy my-sandbox \
  --block-host example.com \
  --block-host malicious.site
```

### Block IP range (--block-cidr) {#block-cidr}

```text
--block-cidr CIDR
```

Block access to an IP range in CIDR notation:

```console
$ docker sandbox network proxy my-sandbox --block-cidr 192.168.1.0/24
```

### Allow specific domain (--allow-host) {#allow-host}

```text
--allow-host DOMAIN
```

Permit access to a domain (useful with deny-by-default policy):

```console
$ docker sandbox network proxy my-sandbox \
  --policy deny \
  --allow-host api.trusted-service.com
```

### Bypass MITM proxy for domain (--bypass-host) {#bypass-host}

```text
--bypass-host DOMAIN
```

Bypass MITM proxy for specific domains:

```console
$ docker sandbox network proxy my-sandbox --bypass-host localhost
```

### Bypass MITM proxy for IP range (--bypass-cidr) {#bypass-cidr}

```text
--bypass-cidr CIDR
```

Bypass MITM proxy for an IP range:

```console
$ docker sandbox network proxy my-sandbox --bypass-cidr 127.0.0.0/8
```

### Set default policy (--policy) {#policy}

```text
--policy allow|deny
```

Set the default policy for network access:

```console
# Allow by default, block specific hosts
$ docker sandbox network proxy my-sandbox \
  --policy allow \
  --block-host dangerous.example

# Deny by default, allow specific hosts
$ docker sandbox network proxy my-sandbox \
  --policy deny \
  --allow-host api.trusted.com \
  --allow-host cdn.trusted.com
```

### Remove rules

Use `--allow-cidr` to remove IP ranges from block or bypass lists:

```console
$ docker sandbox network proxy my-sandbox --allow-cidr 192.168.1.0/24
```



