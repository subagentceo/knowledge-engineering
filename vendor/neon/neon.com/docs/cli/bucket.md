> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Functions, storage & data > bucket
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: The Neon CLI `neonctl bucket` command manages branch object-storage buckets and their contents: create, list, and delete buckets, and use the `neonctl bucket object` subcommands to list, download, upload, and delete objects. Object listing supports prefixes, a --delimiter to collapse keys into folders, and cursor-based pagination; `bucket object delete --recursive` removes every object under a prefix.

# Neon CLI command: bucket

Manage branch object-storage buckets and their objects

**Coming Soon: Private Preview**

This feature is in private preview: it's not ready for production use, and it may be briefly unavailable as we deploy updates. To get access, [sign up here](https://neon.com/blog/were-building-backends#access).

The `bucket` command manages branch object-storage buckets and their objects. Buckets belong to a branch; the `object` subcommands work with the objects inside a bucket.

Subcommands: [create](https://neon.com/docs/cli/bucket#create), [list](https://neon.com/docs/cli/bucket#list), [delete](https://neon.com/docs/cli/bucket#delete), [object](https://neon.com/docs/cli/bucket#object)

## neonctl bucket create

Creates a bucket on a branch.

```bash
neonctl bucket create <name> [options]
```

| Option           | Description                                                            | Type   | Default   | Required |
| ---------------- | ---------------------------------------------------------------------- | ------ | --------- | :------: |
| `--project-id`   | Project ID                                                             | string | —         |    No    |
| `--branch`       | Branch ID or name                                                      | string | —         |    No    |
| `--access-level` | The visibility of the bucket Possible values: `private`, `public_read` | string | `private` |    No    |

Create a private bucket on a branch:

```bash
neonctl bucket create my-bucket --access-level private
```

## neonctl bucket list

Lists the buckets on a branch.

```bash
neonctl bucket list [options]
```

| Option         | Description | Type   | Default | Required |
| -------------- | ----------- | ------ | ------- | :------: |
| `--project-id` | Project ID  | string | —       |    No    |

List the buckets on a branch with `json` output:

```bash
neonctl bucket list --output json
```

## neonctl bucket delete

Deletes a bucket from a branch.

```bash
neonctl bucket delete <name> [options]
```

| Option         | Description | Type   | Default | Required |
| -------------- | ----------- | ------ | ------- | :------: |
| `--project-id` | Project ID  | string | —       |    No    |

```bash
neonctl bucket delete my-bucket
```

## Bucket objects

Lists, downloads, uploads, or deletes objects in a bucket.

Subcommands: [list](https://neon.com/docs/cli/bucket#object-list), [get](https://neon.com/docs/cli/bucket#object-get), [put](https://neon.com/docs/cli/bucket#object-put), [delete](https://neon.com/docs/cli/bucket#object-delete)

### neonctl bucket object list

Lists objects in a bucket.

```bash
neonctl bucket object list <bucket>[/<prefix>] [options]
```

| Option         | Description                                                   | Type   | Default | Required |
| -------------- | ------------------------------------------------------------- | ------ | ------- | :------: |
| `--project-id` | Project ID                                                    | string | —       |    No    |
| `--branch`     | Branch ID or name                                             | string | —       |    No    |
| `--delimiter`  | Collapse keys sharing a common prefix (e.g. "/") into folders | string | —       |    No    |
| `--cursor`     | Pagination cursor returned as next\_cursor by a previous call | string | —       |    No    |
| `--limit`      | Maximum number of items (objects + folders) to return         | number | —       |    No    |

List the objects under a prefix, collapsing keys into folders:

```bash
neonctl bucket object list my-bucket/images --delimiter /
```

### neonctl bucket object get

Downloads an object from a bucket to a local file.

```bash
neonctl bucket object get <bucket>/<key> [options]
```

| Option         | Description                                                                                       | Type   | Default | Required |
| -------------- | ------------------------------------------------------------------------------------------------- | ------ | ------- | :------: |
| `--project-id` | Project ID                                                                                        | string | —       |    No    |
| `--branch`     | Branch ID or name                                                                                 | string | —       |    No    |
| `--file`       | Path to write the downloaded object to (defaults to the object filename in the current directory) | string | —       |    No    |

```bash
neonctl bucket object get my-bucket/images/logo.png --file ./logo.png
```

### neonctl bucket object put

Uploads a local file to a bucket as an object.

```bash
neonctl bucket object put <bucket>/<key> [options]
```

| Option           | Description                                             | Type   | Default | Required |
| ---------------- | ------------------------------------------------------- | ------ | ------- | :------: |
| `--project-id`   | Project ID                                              | string | —       |    No    |
| `--branch`       | Branch ID or name                                       | string | —       |    No    |
| `--file`         | Path to the local file to upload                        | string | —       |    Yes   |
| `--content-type` | Content-Type to store the object with (e.g. text/plain) | string | —       |    No    |

Upload a file, optionally setting the Content-Type to store it with:

```bash
neonctl bucket object put my-bucket/images/logo.png --file ./logo.png
neonctl bucket object put my-bucket/notes/readme.txt --file ./readme.txt --content-type text/plain
```

### neonctl bucket object delete

Deletes an object, or every object under a prefix.

```bash
neonctl bucket object delete <bucket>/<key> [options]
```

| Option         | Description                                                              | Type    | Default | Required |
| -------------- | ------------------------------------------------------------------------ | ------- | ------- | :------: |
| `--project-id` | Project ID                                                               | string  | —       |    No    |
| `--branch`     | Branch ID or name                                                        | string  | —       |    No    |
| `--recursive`  | Delete every object under the given prefix. The prefix must end with "/" | boolean | `false` |    No    |

With `--recursive`, the target is treated as a prefix, which must end with `/`.

Delete a single object, or every object under a prefix:

```bash
neonctl bucket object delete my-bucket/images/logo.png
neonctl bucket object delete my-bucket/images/ --recursive
```

---

## Related docs (Functions, storage & data)

- [functions](https://neon.com/docs/cli/functions)
- [data-api](https://neon.com/docs/cli/data-api)
- [neon-auth](https://neon.com/docs/cli/neon-auth)
