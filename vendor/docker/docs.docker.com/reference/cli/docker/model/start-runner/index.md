# docker model start-runner

**Description:** Start Docker Model Runner (Docker Engine only)

**Usage:** `docker model start-runner`










## Description

This command starts the Docker Model Runner without pulling container images. Use this command to start the runner when you already have the required images locally.

For the first-time setup or to ensure you have the latest images, use `docker model install-runner` instead.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--backend` |  |  Specify backend (llama.cpp|vllm|diffusers). Default: llama.cpp |
| `--debug` |  |  Enable debug logging |
| `--do-not-track` |  |  Do not track models usage in Docker Model Runner |
| `--gpu` | `auto` |  Specify GPU support (none|auto|cuda|rocm|musa|cann) |
| `--host` | `127.0.0.1` |  Host address to bind Docker Model Runner |
| `--port` |  |  Docker container port for Docker Model Runner (default: 12434 for Docker Engine, 12435 for Cloud mode)<br> |
| `--proxy-cert` |  |  Path to a CA certificate file for proxy SSL inspection |
| `--tls` |  |  Enable TLS/HTTPS for Docker Model Runner API |
| `--tls-cert` |  |  Path to TLS certificate file (auto-generated if not provided) |
| `--tls-key` |  |  Path to TLS private key file (auto-generated if not provided) |
| `--tls-port` |  |  TLS port for Docker Model Runner (default: 12444 for Docker Engine, 12445 for Cloud mode)<br> |






