> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Consolidated billing

Consolidated billing is an Enterprise feature that allows you to link multiple workspaces under a
single billing account.

## Overview

Consolidated billing enables you to manage multiple workspaces across different environments while maintaining a single billing account.
This feature is particularly useful for organizations that need to operate in multiple regions or maintain separate workspaces for different teams while keeping billing centralized.

With consolidated billing, you have:

* **Unified billing** – Receive a single invoice for all linked workspaces.
* **Shared credit pools** – All workspaces share the same credit allocation.
* **Per-workspace limits** – Optionally cap how many credits each reporting workspace can draw from the shared pool, as well as its number of concurrent text to speech requests.
* **Cross-environment support** – Link workspaces from isolated environments (e.g., EU, India) to the US billing workspace.
* **Independent management** – Each workspace maintains its own members, SSO configurations, and settings.

## How it works

Consolidated billing creates a relationship between workspaces where one workspace (the "billing workspace") receives usage reports from other workspaces (the "reporting workspaces"). All usage is then billed through the billing workspace.

### Billing workspace

The billing workspace must be located in the US environment (`elevenlabs.io`). This workspace:

* Receives usage reports from all linked workspaces.
* Issues a single monthly invoice.
* Shows general usage coming from each reporting workspace.

### Reporting workspaces

Reporting workspaces can be located on elevenlabs.io or in an isolated environment. These workspaces:

* Report their usage to the billing workspace.
* Maintain their own members and configurations.
* Show, as usual, granular usage analytics for that workspace.

Within the same region, users cannot be members of multiple workspaces. This limitation only
applies within the same environment.

## Setup process

Consolidated billing is an Enterprise feature that requires configuration by our team. To enable consolidated billing for your organization, contact your dedicated Customer Success Manager.

## Usage tracking

The billing workspace will be able to see the usage of all linked workspaces.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/1b4a2896939345df00263961ea080724f268655a4b258c6988b7344cb3c6ebb0/assets/images/product-guides/administration/consolidated-billing-reporting.png" alt="Consolidated billing reporting view" />

The reporting workspace will only be able to see analytics for its own usage. However, the total credits left shown in the sidebar will be the sum of all linked workspaces.

## Credit limits

By default, every reporting workspace can draw from the full shared credit pool. Admins of the billing workspace can optionally set a credit limit on each reporting workspace to control how many credits it can consume during a billing cycle.

Credit limits are managed from the billing workspace's settings page. For each reporting workspace, you can set a credit limit or leave it unlimited so the workspace continues to draw from the full shared pool.

Credit limits reset at the start of each billing cycle, aligned with the billing workspace's subscription cycle. Admins can adjust or remove a workspace's credit limit at any time, and changes take effect immediately. When a reporting workspace reaches its credit limit, all requests made from that workspace are rejected until the next billing cycle or the limit is removed.

## TTS concurrency limits

Billing workspace admins can set a text to speech (TTS) concurrency limit on each reporting workspace.

TTS concurrency limits are managed from the billing workspace's settings page. For each reporting workspace, you can set a concurrency limit or leave it uncapped (in which case, the parent workspace concurrency limit applies). Admins can adjust or remove a workspace's TTS concurrency limit at any time, and changes take effect immediately.

## FAQ

Yes. While all workspaces share the same credit pool, billing workspace admins can set an
optional credit limit on each reporting workspace to cap how many credits it can consume during
a billing cycle. See [Credit limits](#credit-limits).

No, all workspaces must share the same subscription. The billing workspace determines the
subscription level for all linked workspaces.

Yes, you can disable consolidated billing on any reporting workspace. This will require setting
up a new subscription for that workspace or removing that workspace entirely. To do so, get in
touch with your dedicated Customer Success Manager.

Yes, both workspaces can be located on elevenlabs.io - this is useful if you want to have
multiple segregated teams. Sharing resources between workspaces is not possible so consider
using permissions with [user groups](/docs/overview/administration/workspaces/user-groups)
before enabling consolidated billing.