---
title: Backups
description: Create point-in-time snapshots of sandbox directories and restore them with copy-on-write overlays.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Backups

Create point-in-time snapshots of sandbox directories and restore them with copy-on-write overlays.

## Methods

### `createBackup()`

Create a point-in-time snapshot of a directory and upload it to R2 storage.

TypeScript

```

await sandbox.createBackup(options: BackupOptions): Promise<DirectoryBackup>


```

**Parameters**:

* `options` \- Backup configuration (see [BackupOptions](#backupoptions)):  
   * `dir` (required) - Absolute path to the directory to back up (for example, `"/workspace"`)  
   * `name` (optional) - Human-readable name for the backup. Maximum 256 characters, no control characters.  
   * `ttl` (optional) - Time-to-live in seconds until the backup expires. Default: `259200` (3 days). Must be a positive number.  
   * `useGitignore` (optional) - When `true`, excludes files matching `.gitignore` rules from the backup. Default: `false`. If the directory is not inside a git repository, no exclusions are applied. Requires `git` to be available in the container.  
   * `localBucket` (optional) - When `true`, uses the `BACKUP_BUCKET` R2 binding directly instead of presigned URLs. Intended for use with `wrangler dev`. Default: `false`.

**Returns**: `Promise<DirectoryBackup>` containing:

* `id` \- Unique backup identifier (UUID)
* `dir` \- Directory that was backed up

* [  JavaScript ](#tab-panel-10075)
* [  TypeScript ](#tab-panel-10076)

JavaScript

```

import { getSandbox } from "@cloudflare/sandbox";


const sandbox = getSandbox(env.Sandbox, "my-sandbox");


// Create a backup of /workspace

const backup = await sandbox.createBackup({ dir: "/workspace" });


// Later, restore the backup

await sandbox.restoreBackup(backup);


```

TypeScript

```

import { getSandbox } from "@cloudflare/sandbox";


const sandbox = getSandbox(env.Sandbox, "my-sandbox");


// Create a backup of /workspace

const backup = await sandbox.createBackup({ dir: "/workspace" });


// Later, restore the backup

await sandbox.restoreBackup(backup);


```

**How it works**:

In production:

1. The container creates a compressed squashfs archive from the directory.
2. The container uploads the archive directly to R2 using a presigned URL.
3. Metadata is stored alongside the archive in R2.
4. The local archive is cleaned up.

With `localBucket: true` (local development):

1. The container creates a compressed squashfs archive from the directory.
2. The archive is uploaded directly to the `BACKUP_BUCKET` R2 binding.
3. Metadata is stored alongside the archive in R2.
4. The local archive is cleaned up.

**Throws**:

* `InvalidBackupConfigError` \- If `dir` is not absolute, contains `..`, the `BACKUP_BUCKET` binding is missing, or (in production) the R2 presigned URL credentials are not configured
* `BackupCreateError` \- If the container fails to create the archive, the upload to R2 fails, or `useGitignore` is `true` but `git` is not available in the container

R2 binding required

You must configure a `BACKUP_BUCKET` R2 binding in your `wrangler.jsonc` before using backup methods. For production, you must also configure R2 presigned URL credentials (`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `CLOUDFLARE_ACCOUNT_ID`, `BACKUP_BUCKET_NAME`). Refer to the [backup and restore guide](https://developers.cloudflare.com/sandbox/guides/backup-restore/#prerequisites) for setup details.

Path permissions

The backup process uses `mksquashfs`, which must have read access to every file and subdirectory in the target path. If any file has restrictive permissions (for example, directories owned by a different user), the backup fails with a `BackupCreateError: mksquashfs failed: Could not create destination file: Permission denied` error. Run `chmod -R a+rX` on the target directory before backing up, or refer to the [path permissions guide](https://developers.cloudflare.com/sandbox/guides/backup-restore/#path-permissions) for other options.

Partial writes

Partially-written files may not be captured consistently. Only completed writes are guaranteed to be included in the backup.

---

### `restoreBackup()`

Restore a previously created backup into a directory.

TypeScript

```

await sandbox.restoreBackup(backup: DirectoryBackup): Promise<RestoreBackupResult>


```

**Parameters**:

* `backup` \- The backup handle returned by `createBackup()`. Contains `id` and `dir`. (see [DirectoryBackup](#directorybackup))

**Returns**: `Promise<RestoreBackupResult>` containing:

* `success` \- Whether the restore succeeded
* `dir` \- Directory that was restored
* `id` \- Backup ID that was restored

* [  JavaScript ](#tab-panel-10077)
* [  TypeScript ](#tab-panel-10078)

JavaScript

```

// Create a named backup with 24-hour TTL

const backup = await sandbox.createBackup({

  dir: "/workspace",

  name: "before-refactor",

  ttl: 86400,

});


// Store the handle for later use

await env.KV.put(`backup:${userId}`, JSON.stringify(backup));


```

TypeScript

```

// Create a named backup with 24-hour TTL

const backup = await sandbox.createBackup({

  dir: "/workspace",

  name: "before-refactor",

  ttl: 86400,

});


// Store the handle for later use

await env.KV.put(`backup:${userId}`, JSON.stringify(backup));


```

**How it works**:

In production:

1. Metadata is downloaded from R2 and the TTL is checked. If expired, an error is thrown (with a 60-second buffer).
2. The container downloads the archive directly from R2 using a presigned URL.
3. The container mounts the squashfs archive with FUSE overlayfs.

With `localBucket: true` (local development):

1. Metadata is downloaded from the `BACKUP_BUCKET` R2 binding and the TTL is checked.
2. The archive is downloaded from the R2 binding.
3. The archive is extracted into the target directory using `unsquashfs`.

**Throws**:

* `InvalidBackupConfigError` \- If `backup.id` is missing or not a valid UUID, or `backup.dir` is invalid
* `BackupNotFoundError` \- If the backup metadata or archive is not found in R2
* `BackupExpiredError` \- If the backup TTL has elapsed
* `BackupRestoreError` \- If the container fails to restore

Copy-on-write

In production, restore uses copy-on-write semantics. The backup is mounted as a read-only lower layer, and new writes go to a writable upper layer. The backup can be restored into a different directory than the original. In local development, the directory is replaced on restore.

Ephemeral mount

In production, the FUSE mount is lost when the sandbox sleeps or restarts. Re-restore from the backup handle to recover. Stop processes writing to the target directory before restoring.

## Usage patterns

### Exclude gitignored files

Use `useGitignore` to exclude files matching `.gitignore` rules (such as `node_modules/` or `dist/`) from the backup. This reduces backup size for git repositories.

* [  JavaScript ](#tab-panel-10079)
* [  TypeScript ](#tab-panel-10080)

JavaScript

```

const sandbox = getSandbox(env.Sandbox, "my-sandbox");


// Exclude gitignored files from the backup

const backup = await sandbox.createBackup({

  dir: "/workspace",

  useGitignore: true,

});


// Without useGitignore (default), all files are included

const fullBackup = await sandbox.createBackup({

  dir: "/workspace",

});


```

TypeScript

```

const sandbox = getSandbox(env.Sandbox, "my-sandbox");


// Exclude gitignored files from the backup

const backup = await sandbox.createBackup({

  dir: "/workspace",

  useGitignore: true,

});


// Without useGitignore (default), all files are included

const fullBackup = await sandbox.createBackup({

  dir: "/workspace",

});


```

If the directory is not inside a git repository, `useGitignore` has no effect and all files are included. If `useGitignore` is `true` but `git` is not installed in the container, a `BackupCreateError` is thrown.

### Checkpoint and restore

Use backups as checkpoints before risky operations.

* [  JavaScript ](#tab-panel-10081)
* [  TypeScript ](#tab-panel-10082)

JavaScript

```

// Save checkpoint before risky operation

const checkpoint = await sandbox.createBackup({ dir: "/workspace" });


try {

  await sandbox.exec("npm install some-experimental-package");

  await sandbox.exec("npm run build");

} catch (error) {

  // Restore to the checkpoint if something goes wrong

  await sandbox.restoreBackup(checkpoint);

}


```

TypeScript

```

// Save checkpoint before risky operation

const checkpoint = await sandbox.createBackup({ dir: "/workspace" });


try {

  await sandbox.exec("npm install some-experimental-package");

  await sandbox.exec("npm run build");

} catch (error) {

  // Restore to the checkpoint if something goes wrong

  await sandbox.restoreBackup(checkpoint);

}


```

### Error handling

* [  JavaScript ](#tab-panel-10083)
* [  TypeScript ](#tab-panel-10084)

JavaScript

```

import { getSandbox } from "@cloudflare/sandbox";


const sandbox = getSandbox(env.Sandbox, "my-sandbox");


try {

  const backup = await sandbox.createBackup({ dir: "/workspace" });

  console.log(`Backup created: ${backup.id}`);

} catch (error) {

  if (error.code === "INVALID_BACKUP_CONFIG") {

    console.error("Configuration error:", error.message);

  } else if (error.code === "BACKUP_CREATE_FAILED") {

    console.error("Backup failed:", error.message);

  }

}


```

TypeScript

```

import { getSandbox } from "@cloudflare/sandbox";


const sandbox = getSandbox(env.Sandbox, "my-sandbox");


try {

  const backup = await sandbox.createBackup({ dir: "/workspace" });

  console.log(`Backup created: ${backup.id}`);

} catch (error) {

  if (error.code === "INVALID_BACKUP_CONFIG") {

    console.error("Configuration error:", error.message);

  } else if (error.code === "BACKUP_CREATE_FAILED") {

    console.error("Backup failed:", error.message);

  }

}


```

## Behavior

* Concurrent backup and restore operations on the same sandbox are automatically serialized.
* The returned `DirectoryBackup` handle is serializable — store it in KV, D1, or Durable Object storage.
* Overlapping backups are independent. Restoring a parent directory overwrites subdirectory mounts.

### TTL enforcement

The `ttl` value controls when a backup is considered expired. The SDK enforces this at **restore time only** — when you call `restoreBackup()`, the SDK reads the backup metadata from R2 and checks whether the TTL has elapsed. If it has, the restore is rejected with a `BACKUP_EXPIRED` error.

The TTL does **not** automatically delete objects from R2\. Expired backup archives and metadata remain in your R2 bucket until you delete them. To automatically clean up expired objects, configure an [R2 object lifecycle rule](https://developers.cloudflare.com/r2/buckets/object-lifecycles/) on your backup bucket. Without a lifecycle rule, expired backups continue to consume R2 storage.

## Types

### `BackupOptions`

TypeScript

```

interface BackupOptions {

  dir: string;

  name?: string;

  ttl?: number;

  useGitignore?: boolean;

  localBucket?: boolean;

}


```

**Fields**:

* `dir` (required) - Absolute path to the directory to back up
* `name` (optional) - Human-readable backup name. Maximum 256 characters, no control characters.
* `ttl` (optional) - Time-to-live in seconds. Default: `259200` (3 days). Must be a positive number.
* `useGitignore` (optional) - When `true`, excludes files matching `.gitignore` rules if the directory is inside a git repository. Default: `false`. If the directory is not inside a git repository, no git-based exclusions are applied.
* `localBucket` (optional) - When `true`, uses the `BACKUP_BUCKET` R2 binding directly instead of presigned URLs. Intended for use with `wrangler dev`. Default: `false`.

### `DirectoryBackup`

TypeScript

```

interface DirectoryBackup {

  readonly id: string;

  readonly dir: string;

}


```

**Fields**:

* `id` \- Unique backup identifier (UUID)
* `dir` \- Directory that was backed up

### `RestoreBackupResult`

TypeScript

```

interface RestoreBackupResult {

  success: boolean;

  dir: string;

  id: string;

}


```

**Fields**:

* `success` \- Whether the restore succeeded
* `dir` \- Directory that was restored
* `id` \- Backup ID that was restored

## Related resources

* [Storage API](https://developers.cloudflare.com/sandbox/api/storage/) \- Mount S3-compatible buckets
* [Files API](https://developers.cloudflare.com/sandbox/api/files/) \- Read and write files
* [Wrangler configuration](https://developers.cloudflare.com/sandbox/configuration/wrangler/) \- Configure bindings

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/api/backups/#page","headline":"Backups · Cloudflare Sandbox SDK docs","description":"Create point-in-time snapshots of sandbox directories and restore them with copy-on-write overlays.","url":"https://developers.cloudflare.com/sandbox/api/backups/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/api/","name":"API reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/api/backups/","name":"Backups"}}]}
```
