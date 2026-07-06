# Release notes for Docker Home, the Admin Console, billing, security, and subscription features


This page provides details on new features, enhancements, known issues, and bug fixes across Docker Home, the Admin Console, billing, security, and subscription functionalities.

## 2026-02-13

### New

- Administrators can now control whether organization members can push content
  to their personal namespaces on Docker Hub with [namespace access
  control](/enterprise/security/hardened-desktop/namespace-access/).
- Administrators can now prevent creating public repositories within
  organization namespaces using the [Disable public
  repositories](/docker-hub/settings/#disable-creation-of-public-repos) setting.

## 2026-01-27

### New

- Administrators can now use an allow list with [Image Access
  Management](/enterprise/security/hardened-desktop/image-access-management/)
  to approve specific repositories that bypass image access controls.

## 2025-01-30

### New

- Installing Docker Desktop via the PKG installer is now generally available.
- Enforcing sign-in via configuration profiles is now generally available.

## 2024-12-10

### New

- New Docker subscriptions are now available. For more information, see [Docker
  subscriptions and features](https://www.docker.com/pricing?ref=Docs&refAction=DocsPlatformReleaseNotes) and [Announcing
  Upgraded Docker Plans: Simpler, More Value, Better Development and
  Productivity](https://www.docker.com/blog/november-2024-updated-plans-announcement/).

## 2024-11-18

### New

- Administrators can now:
  - Enforce sign-in with [configuration profiles](/enterprise/security/enforce-sign-in/methods/#configuration-profiles-method-mac-only) (Early Access).
  - Enforce sign-in for more than one organization at a time (Early Access).
  - Deploy Docker Desktop for Mac in bulk with the [PKG installer](/enterprise/enterprise-deployment/pkg-install-and-configure/) (Early Access).
  - [Use Desktop Settings Management via the Docker Admin Console](/enterprise/security/hardened-desktop/settings-management/configure-admin-console/) (Early Access).

### Bug fixes and enhancements

- Enhance Container Isolation (ECI) has been improved to:
  - Permit admins to [turn off Docker socket mount restrictions](/enterprise/security/hardened-desktop/enhanced-container-isolation/config/#allowing-all-containers-to-mount-the-docker-socket).
  - Support wildcard tags when using the [`allowedDerivedImages` setting](/enterprise/security/hardened-desktop/enhanced-container-isolation/config/#docker-socket-mount-permissions-for-derived-images).

## 2024-11-11

### New

- [Personal access tokens](/security/access-tokens/) (PATs) now support expiration dates.

## 2024-10-15

### New

- Beta: You can now create [organization access tokens](/security/for-admins/access-tokens/) (OATs) to enhance security for organizations and streamline access management for organizations in the Docker Admin Console.

## 2024-08-29

### New

- Deploying Docker Desktop via the [MSI installer](/enterprise/enterprise-deployment/msi-install-and-configure/) is now generally available.
- Two new methods to [enforce sign-in](/enterprise/security/enforce-sign-in/) (Windows registry key and `.plist` file) are now generally available.

## 2024-08-24

### New

- Administrators can now view [organization Insights](/admin/insights/).

## 2024-07-17

### New

- You can now centrally access and manage Docker products in [Docker Home](https://app.docker.com).
