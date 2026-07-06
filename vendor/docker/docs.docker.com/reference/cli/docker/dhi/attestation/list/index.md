# docker dhi attestation list

**Description:** List attestations for a Docker Hardened Image

**Usage:** `docker dhi attestation list <image>`










## Description

List all attestations attached to a Docker Hardened Image.

The image can be specified as:
  - name:tag (e.g., nginx:1.27)
  - namespace/name:tag (e.g., dhi/nginx:1.27)
  - name@sha256:digest (e.g., nginx@sha256:abc123...)

When a tag is provided, the digest is resolved from the container registry.
Use --platform to select a specific platform manifest when the image is a multi-platform index.

Attestations are retrieved via the OCI Referrers API from the Docker Scout referrer registry.

Examples:
  # List attestations for an image by tag
  docker dhi attestation list dhi/nginx:1.27

  # List attestations for a specific platform
  docker dhi attestation list dhi/nginx:1.27 --platform linux/amd64

  # List attestations for an image by digest
  docker dhi attestation list dhi/nginx@sha256:abc123...

  # Filter by predicate type
  docker dhi attestation list dhi/nginx:1.27 --predicate-type https://spdx.dev/Document

  # Filter by multiple predicate types
  docker dhi attestation list dhi/nginx:1.27 --predicate-type https://spdx.dev/Document --predicate-type https://slsa.dev/provenance/v1

  # Output in JSON format
  docker dhi attestation list dhi/nginx:1.27 --json


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--json` |  |  Output in JSON format |
| `--platform` |  |  Platform to filter by (e.g., linux/amd64). Defaults to the Docker daemon platform<br> |
| `--predicate-type` |  |  Filter by predicate type (can be specified multiple times) |






