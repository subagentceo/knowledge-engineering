# docker pass plugins 1password setup

**Description:** Set the 1Password service account token and enable the plugin.

**Usage:** `docker pass plugins 1password setup`





> [!NOTE]
> **Experimental**
>
> This command is experimental. Experimental features are intended for testing and feedback as their functionality or design may change between releases without warning or can be removed entirely in a future release.





## Description

Store a 1Password [service account token](https://developer.1password.com/docs/service-accounts/get-started/) in the local OS keychain and enable the `1password-sdk` plugin.

The token is read from STDIN and replaces any previously stored token. Once it is stored, the secrets engine is asked to enable the plugin so subsequent lookups resolve against 1Password.

Service account tokens are scoped to a fixed set of vaults; only items in those vaults are reachable through the plugin.







