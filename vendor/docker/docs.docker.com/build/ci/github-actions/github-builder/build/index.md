# Build with Docker GitHub Builder


The [`build.yml` reusable workflow](https://github.com/docker/github-builder?tab=readme-ov-file#build-reusable-workflow)
builds from a Dockerfile and packages the same core tasks that many repositories
wire together by hand. This page shows how to call the workflow, publish
[multi-platform images](/build/building/multi-platform/), and export local
build artifacts without rebuilding the job structure in every repository.

## Build and push an image

The following workflow builds from the repository Dockerfile, pushes on branch
and tag events, and uses metadata inputs to generate tags:

```yaml
name: ci

on:
  push:
    branches:
      - "main"
    tags:
      - "v*"
  pull_request:

permissions:
  contents: read

jobs:
  build:
    uses: docker/github-builder/.github/workflows/build.yml@v1
    permissions:
      contents: read # to fetch the repository content
      id-token: write # for signing attestation(s) with GitHub OIDC Token
    with:
      output: image
      push: ${{ github.event_name != 'pull_request' }}
      platforms: linux/amd64,linux/arm64
      meta-images: name/app
      meta-tags: |
        type=ref,event=branch
        type=ref,event=pr
        type=semver,pattern={{version}}
    secrets:
      registry-auths: |
        - registry: docker.io
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
```

When you set `output: image`, `meta-images` is required because the workflow
creates image names and [manifest tags](/build/ci/github-actions/manage-tags-labels/) from that
input. `distribute: true` is the default, so a multi-platform build can fan out
across native GitHub-hosted runners instead of forcing the whole build onto one
machine. The default `runner` mapping sends Linux Arm platforms to
`ubuntu-24.04-arm` and uses `ubuntu-24.04` for other platforms. To change that
mapping, see [runner selection](/build/ci/github-actions/github-builder/build/architecture/#runner-selection). `sign: auto`
is also the default, which means the workflow signs
[attestation manifests](/build/ci/github-actions/attestations/) when the image is pushed.

## Export local output as an artifact

The same workflow can export files instead of publishing an image. This is
useful when you want compiled assets, an unpacked root filesystem, or another
local exporter result as part of CI:

```yaml
name: ci

on:
  pull_request:

permissions:
  contents: read

jobs:
  build:
    uses: docker/github-builder/.github/workflows/build.yml@v1
    permissions:
      contents: read # to fetch the repository content
      id-token: write # for signing attestation(s) with GitHub OIDC Token
    with:
      output: local
      artifact-upload: true
      artifact-name: build-output
      platforms: linux/amd64,linux/arm64
```

With `output: local`, the workflow exports files to the runner filesystem and
merges per-platform artifacts in the finalize phase. When
`artifact-upload: true` is set, the merged result is uploaded as a GitHub
artifact, and `sign: auto` signs the uploaded artifacts. `push` is ignored for
local output, so there is no registry requirement in this form.

## Add cache, Dockerfile inputs, and metadata labels

You can tune the Dockerfile build in the same job call. This example sets a
custom Dockerfile path, a target stage, GitHub Actions cache, and metadata
labels:

```yaml
name: ci

on:
  push:
    branches:
      - "main"

permissions:
  contents: read

jobs:
  build:
    uses: docker/github-builder/.github/workflows/build.yml@v1
    permissions:
      contents: read # to fetch the repository content
      id-token: write # for signing attestation(s) with GitHub OIDC Token
    with:
      output: image
      push: true
      context: .
      file: ./docker/Dockerfile
      target: runtime
      build-args: |
        NODE_ENV=production
        VERSION=${{ github.sha }}
      cache: true
      cache-scope: myapp
      meta-images: name/app
      meta-tags: |
        type=sha
      set-meta-labels: true
    secrets:
      registry-auths: |
        - registry: docker.io
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
```

This is a Dockerfile build, so the inputs map closely to
`docker/build-push-action`. The difference is that the reusable workflow owns
Buildx setup, [BuildKit](/build/buildkit/) configuration,
[SLSA provenance](/build/metadata/attestations/slsa-provenance/) mode,
[GitHub Actions cache backend](/build/cache/backends/gha/) wiring, signing,
and manifest creation. If you need more background on metadata or platform
distribution, see [Manage tags and labels](/build/ci/github-actions/manage-tags-labels/) and
[Multi-platform image](/build/ci/github-actions/multi-platform/).

