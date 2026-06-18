# Unique Emails

## Introduction

Directory Sync requires directory user emails to be unique among active users within a directory. If an identity provider tries to provision or update a directory user with an email that another active user in the same directory already has, that request is declined and the affected user won't sync until the conflict is resolved. This is scoped per directory; the same email can still exist in different directories.

Only active users count toward uniqueness. Deactivating a duplicate record in the identity provider immediately frees its email for the active user that should hold it.

### Why unique emails matter

Unique emails make user resolution predictable. When each active user in a directory has a distinct email, just-in-time provisioning and your own application can reliably resolve a person by their email address. This keeps downstream authentication and account-linking behavior consistent for your users.

***

## Best practices for IT Admins

Email conflicts originate in your customers' identity providers, so the fixes are IT admin actions. Share this guidance with the affected admins to keep directories syncing cleanly.

- **Keep the username a stable field.** WorkOS identifies a directory user by their SCIM username. When a person's username changes, most providers re-provision them to WorkOS as a brand-new user instead of updating the existing one. To avoid this, map userName to a value that doesn't change for a person rather than something mutable; don't re-point the username mapping on a live directory; and don't rename users while you're also moving them between synced groups or reassigning them.
- **Genuinely distinct identities need distinct emails.** Give each identity its own email address. For service or secondary accounts that don't need to sync, exclude them from the provisioning application instead. And on rehire, either reactivate the original user record, or deactivate the old record before re-provisioning so that only one active record holds the email.
