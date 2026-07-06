# Docker Build GitHub Actions


GitHub Actions is a popular CI/CD platform for automating your build, test, and
deployment pipeline. Docker provides a set of official GitHub Actions for you to
use in your workflows. These official actions are reusable, easy-to-use
components for building, annotating, and pushing images.

The following GitHub Actions are available:

- [Build and push Docker images](https://github.com/marketplace/actions/build-and-push-docker-images):
  build and push Docker images with BuildKit.
- [Docker Buildx Bake](https://github.com/marketplace/actions/docker-buildx-bake):
  enables using high-level builds with [Bake](/bake/).
- [Docker Login](https://github.com/marketplace/actions/docker-login):
  sign in to a Docker registry.
- [Docker Setup Buildx](https://github.com/marketplace/actions/docker-setup-buildx):
  creates and boots a BuildKit builder.
- [Docker Metadata action](https://github.com/marketplace/actions/docker-metadata-action):
  extracts metadata from Git reference and GitHub events to generate tags,
  labels, and annotations.
- [Docker Setup Compose](https://github.com/marketplace/actions/docker-setup-compose):
  installs and sets up [Compose](/../compose).
- [Docker Setup Docker](https://github.com/marketplace/actions/docker-setup-docker):
  installs Docker Engine.
- [Docker Setup QEMU](https://github.com/marketplace/actions/docker-setup-qemu):
  installs [QEMU](https://github.com/qemu/qemu) static binaries for
  multi-platform builds.
- [Docker Scout](https://github.com/docker/scout-action):
  analyze Docker images for security vulnerabilities.

Using Docker's actions provides an easy-to-use interface, while still allowing
flexibility for customizing build parameters.

## Examples

If you're looking for examples on how to use the Docker GitHub Actions,
refer to the following sections:


- [Add image annotations with GitHub Actions](/build/ci/github-actions/annotations/)

- [Add SBOM and provenance attestations with GitHub Actions](/build/ci/github-actions/attestations/)

- [Validating build configuration with GitHub Actions](/build/ci/github-actions/checks/)

- [Using secrets with GitHub Actions](/build/ci/github-actions/secrets/)

- [GitHub Actions build summary](/build/ci/github-actions/build-summary/)

- [Configuring your GitHub Actions builder](/build/ci/github-actions/configure-builder/)

- [Cache management with GitHub Actions](/build/ci/github-actions/cache/)

- [Copy image between registries with GitHub Actions](/build/ci/github-actions/copy-image-registries/)

- [Export to Docker with GitHub Actions](/build/ci/github-actions/export-docker/)

- [Docker GitHub Builder](/build/ci/github-actions/github-builder/)

- [Local registry with GitHub Actions](/build/ci/github-actions/local-registry/)

- [Multi-platform image with GitHub Actions](/build/ci/github-actions/multi-platform/)

- [Named contexts with GitHub Actions](/build/ci/github-actions/named-contexts/)

- [Push to multiple registries with GitHub Actions](/build/ci/github-actions/push-multi-registries/)

- [Reproducible builds with GitHub Actions](/build/ci/github-actions/reproducible-builds/)

- [Share built image between jobs with GitHub Actions](/build/ci/github-actions/share-image-jobs/)

- [Manage tags and labels with GitHub Actions](/build/ci/github-actions/manage-tags-labels/)

- [Test before push with GitHub Actions](/build/ci/github-actions/test-before-push/)

- [Update Docker Hub description with GitHub Actions](/build/ci/github-actions/update-dockerhub-desc/)



## Get started with GitHub Actions

The [Introduction to GitHub Actions with Docker](/guides/gha/) guide walks
you through the process of setting up and using Docker GitHub Actions for
building Docker images, and pushing images to Docker Hub.

