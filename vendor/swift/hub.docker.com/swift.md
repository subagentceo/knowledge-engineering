# Swift — Official Docker Hub Image

> Source: https://hub.docker.com/_/swift
> Crawled: 2026-06-05

## Overview

The `swift` image is the official Docker image for the Swift programming language, maintained by the Swift community. It is hosted at `hub.docker.com/_/swift` and supports `amd64`, `arm64v8`, and `windows-amd64` architectures.

## Image tags

### Current stable releases (Ubuntu Noble 24.04 default base)

| Tag | Notes |
|---|---|
| `swift:latest`, `6.3.2`, `6.3` | Latest stable release |
| `6.2.4`, `6.2` | Previous stable |
| `6.1.3`, `6.1` | LTS-adjacent release |
| `6.0.3`, `6.0` | Older stable |

### Distribution-specific tags

Each version is available on multiple Linux distributions. Append the distribution suffix after the version:

| Suffix | Base OS |
|---|---|
| `swift:6.1-noble` | Ubuntu 24.04 (Noble) |
| `swift:6.1-jammy` | Ubuntu 22.04 (Jammy) |
| `swift:6.1-bookworm` | Debian 12 (Bookworm) |
| `swift:6.1-amazonlinux2` | Amazon Linux 2 |
| `swift:6.1-amazonlinux2023` | Amazon Linux 2023 |
| `swift:6.1-rhel-ubi9` | RHEL UBI 9 |

### Slim variants

Every distribution tag has a corresponding `-slim` variant that omits the Swift compiler and development tools — suitable for running pre-compiled binaries only:

```
swift:6.1-jammy-slim
swift:6.1-bookworm-slim
swift:6.3-slim
```

## Pulling images

```bash
# Latest stable
docker pull swift

# Specific version
docker pull swift:6.1

# Version + distro
docker pull swift:6.1-jammy

# Slim runtime image
docker pull swift:6.1-jammy-slim
```

## Running the Swift REPL

```bash
# Linux host (requires seccomp override for LLDB)
docker run --security-opt seccomp=unconfined -it --rm swift

# macOS host
docker run --privileged -it --rm swift

# Alternative flag (works on both)
docker run --cap-add sys_ptrace -it --rm swift swift
```

## Interactive bash session

```bash
# Ephemeral container
docker run -it --rm swift /bin/bash

# Named container (persists between sessions)
docker run -it --name swiftfun swift /bin/bash
docker start swiftfun
docker attach swiftfun
```

## Volume mounts — developing on the host

Mount your Swift package directory into the container for iterative development without rebuilding the image:

```bash
docker run -it --rm \
  -v "$(pwd)":/workspace \
  -w /workspace \
  swift swift build
```

Run tests:

```bash
docker run -it --rm \
  -v "$(pwd)":/workspace \
  -w /workspace \
  swift swift test
```

## Building a Swift project inside a container

Copy sources at container start (no persistent volume):

```bash
docker run --rm \
  -v "$(pwd)":/workspace \
  -w /workspace \
  swift:6.1-jammy \
  swift build -c release
```

The compiled artifacts land in `.build/release/` on the host filesystem (because the directory is volume-mounted).

## Nightly / snapshot images

Nightly builds are published under the `swiftlang` namespace rather than `swift`:

```bash
docker pull swiftlang/swift:nightly-main
docker pull swiftlang/swift:nightly-6.2
```

## Supported architectures

- `linux/amd64`
- `linux/arm64` (`arm64v8`)
- `windows/amd64` (Windows Server Core LTSC 2022, for Windows containers)
