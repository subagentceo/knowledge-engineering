# Docker GitHub Builder


Docker GitHub Builder is a set of [reusable workflows](https://docs.github.com/en/actions/how-tos/reuse-automations/reuse-workflows)
in the [`docker/github-builder` repository](https://github.com/docker/github-builder)
for building container images and local artifacts with [BuildKit](/buildkit/).
This section explains what the workflows solve, how they differ from wiring
together individual GitHub Actions in each repository, and when to use
[`build.yml`](/build/ci/github-actions/github-builder/build/) or [`bake.yml`](/build/ci/github-actions/github-builder/bake/).

If you compose a build job from `docker/login-action`, `docker/setup-buildx-action`,
`docker/metadata-action`, and either `docker/build-push-action` or
`docker/bake-action`, your repository owns every detail of how the build runs.
That approach works, but it also means every repository has to maintain its own
runner selection, [cache setup](/build/ci/cache/), [Provenance settings](/build/ci/attestations/),
signing behavior, and [multi-platform manifest handling](/build/ci/multi-platform/).
Docker GitHub Builder moves that implementation into Docker-maintained reusable
workflows, so your workflow only decides when to build and which inputs to pass.

The difference is easiest to see in the job definition. A conventional workflow
spells out each action step:

```yaml
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Login to Docker Hub
        uses: docker/login-action@v4
        with:
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v4
        
      - name: Docker meta
        uses: docker/metadata-action@v6
        id: meta
        with:
          images: name/app

      - name: Build and push
        uses: docker/build-push-action@v7
        with:
          push: ${{ github.event_name != 'pull_request' }}
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha
```

With Docker GitHub Builder, the same build is a reusable workflow call:

```yaml
jobs:
  build:
    uses: docker/github-builder/.github/workflows/build.yml@v1
    permissions:
      contents: read # to fetch the repository content
      id-token: write # for signing attestation(s) with GitHub OIDC Token
    with:
      output: image
      push: ${{ github.event_name != 'pull_request' }}
      meta-images: name/app
    secrets:
      registry-auths: |
        - registry: docker.io
          username: ${{ vars.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
```

This model gives you a build pipeline that is maintained in the Docker
organization, uses a pinned [BuildKit](/buildkit/) environment,
distributes [multi-platform builds](/building/multi-platform/) across
runners when that helps, and emits signed [SLSA provenance](/metadata/attestations/slsa-provenance/)
that records both the source commit and the builder identity.

That tradeoff is intentional. You keep control of when the build runs and which
inputs it uses, but the build implementation itself lives in the
Docker-maintained workflow rather than in per-repository job steps.

Use [`build.yml`](/build/ci/github-actions/github-builder/build/) when your repository builds from a Dockerfile and
the familiar `build-push-action` inputs map cleanly to your workflow. Use
[`bake.yml`](/build/ci/github-actions/github-builder/bake/) when your repository already describes builds in a
[Bake definition](/bake/), or when you want Bake targets,
overrides, and variables to stay as the source of truth.

Both workflows support image output, local output, cache export to the
[GitHub Actions cache backend](/cache/backends/gha/),
[SBOM generation](/metadata/attestations/sbom/), and signing. The
Bake workflow adds Bake definition validation and builds one target per workflow
call.


- [Docker GitHub Builder architecture](/build/ci/github-actions/github-builder/architecture/)

- [Build with Docker GitHub Builder](/build/ci/github-actions/github-builder/build/)

- [Bake with Docker GitHub Builder](/build/ci/github-actions/github-builder/bake/)



