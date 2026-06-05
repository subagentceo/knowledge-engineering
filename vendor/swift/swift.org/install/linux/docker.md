# Swift on Linux via Docker — Official Guide

> Source: https://www.swift.org/install/linux/docker/
> Crawled: 2026-06-05

## Overview

Swift publishes official Docker images to Docker Hub at `hub.docker.com/_/swift`. Using a Swift container is the fastest way to get a working Swift environment on any Linux host without touching the host's package manager. Nightly snapshot images are published under the `swiftlang` namespace.

## Pulling the image

```bash
# Latest stable
docker pull swift

# Pin to a specific release
docker pull swift:6.1
```

## Running a container

```bash
# Privileged interactive session (gives LLDB full access)
docker run --privileged --interactive --tty \
  --name swift-latest swift:latest /bin/bash

# Resume an existing named container
docker start swift-latest
docker attach swift-latest
```

## Building a Swift app in a container — single-stage

For development and CI where image size is not a concern:

```dockerfile
FROM swift:latest

WORKDIR /app
COPY . .
RUN swift build -c release

CMD [".build/release/MyApp"]
```

Build and run:

```bash
docker build -t my-swift-app .
docker run --rm my-swift-app
```

## Multi-stage Dockerfile (recommended for production)

Separate the build environment (full Swift compiler) from the runtime image (slim, no compiler). This significantly reduces the final image size.

```dockerfile
# Stage 1: build
FROM swift:latest AS builder
WORKDIR /root
COPY . .
RUN swift build -c release

# Stage 2: runtime
FROM swift:slim
WORKDIR /root
COPY --from=builder /root/.build/release/MyApp .
CMD ["./MyApp"]
```

The `swift:slim` image contains only the Swift runtime libraries needed to execute a compiled binary — the compiler itself is not included.

## Volume-mount workflow for local development

Mount your package directory into the container so edits on the host are immediately visible:

```bash
docker run -it --rm \
  -v "$(pwd)":/workspace \
  -w /workspace \
  swift:latest \
  swift build
```

Run tests the same way:

```bash
docker run -it --rm \
  -v "$(pwd)":/workspace \
  -w /workspace \
  swift:latest \
  swift test
```

## Nightly snapshots

Nightly images are available under the `swiftlang` Docker Hub namespace:

```bash
docker pull swiftlang/swift:nightly-main
docker pull swiftlang/swift:nightly-6.1
```

These correspond to the Swift.org downloadable toolchain snapshots and are rebuilt nightly.

## Image sources

Dockerfiles for official images are maintained in the `swiftlang/swift-docker` GitHub repository. Community issues and PRs for the images should be filed there.

## CI example (GitHub Actions)

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: swift:6.1
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: swift build -c release
      - name: Test
        run: swift test
```
