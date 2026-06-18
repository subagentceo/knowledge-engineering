---
title: Files
description: Read, write, and manage files in the Sandbox SDK filesystem.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Files

Read, write, and manage files in the sandbox filesystem. All paths are absolute (e.g., `/workspace/app.js`).

## Methods

### `writeFile()`

Write content to a file.

TypeScript

```

await sandbox.writeFile(path: string, content: string, options?: WriteFileOptions): Promise<void>


```

**Parameters**:

* `path` \- Absolute path to the file
* `content` \- Content to write
* `options` (optional):  
   * `encoding` \- File encoding (`"utf-8"` or `"base64"`, default: `"utf-8"`)

* [  JavaScript ](#tab-panel-10119)
* [  TypeScript ](#tab-panel-10120)

JavaScript

```

await sandbox.writeFile("/workspace/app.js", `console.log('Hello!');`);


// Binary data

await sandbox.writeFile("/tmp/image.png", base64Data, { encoding: "base64" });


```

TypeScript

```

await sandbox.writeFile('/workspace/app.js', `console.log('Hello!');`);


// Binary data

await sandbox.writeFile('/tmp/image.png', base64Data, { encoding: 'base64' });


```

Base64 validation

When using `encoding: 'base64'`, content must contain only valid base64 characters (A-Z, a-z, 0-9, +, /, =). Invalid base64 content returns a validation error.

#### Large files and binary data

When using the [rpc transport](https://developers.cloudflare.com/sandbox/configuration/transport/) the `writeFile()` method supports passing a `ReadableStream` as the `content` parameter. This allows binary data and files greater than [32 MiB](https://developers.cloudflare.com/workers/runtime-apis/rpc/#limitations) to be written to the sandbox. It replaces the `"base64"` encoding option.

JavaScript

```

// Requires SANDBOX_TRANSPORT to be "rpc" in wrangler.jsonc

const req = await fetch("https://example.com/archive.tar.gz");

await sandbox.writeFile('/workspace/archive.tar.gz', req.body);


```

### `readFile()`

Read a file from the sandbox. By default returns the content as a string. This is useful for small text files. For larger files and binary data use `encoding: "none"` to get back a `ReadableStream` with the file data.

TypeScript

```

const file = await sandbox.readFile(path: string, options?: ReadFileOptions): Promise<ReadFileResult | ReadFileStreamResult>


```

**Parameters**:

* `path` \- Absolute path to the file
* `options` (optional):  
   * `encoding` \- File encoding (`"utf-8"`, `"base64"` or `"none"`, default: auto-detected from MIME type)

**Returns**: `Promise<ReadFileResult | ReadFileStreamResult>`.

Encoding

The `"none"` encoding property was added in 0.10.1 and aims to improve support for streaming binary data. When `encoding: "none"` is provided the `content` field will be a `ReadableStream<Uint8Array>`. It is only supported with the [RPC transport](https://developers.cloudflare.com/sandbox/configuration/transport/).

* [  JavaScript ](#tab-panel-10133)
* [  TypeScript ](#tab-panel-10134)

JavaScript

```

const file = await sandbox.readFile("/workspace/package.json");

const pkg = JSON.parse(file.content);


// Binary data (since 0.10.1 using `rpc` transport)

const { content, size, mimeType } = await sandbox.readFile(

  "/workspace/archive.tar.gz",

  {

    encoding: "none",

  },

);


// Example 1: Store on R2:

const stream = request.body.pipeThrough(new FixedLengthStream(size));

await env.MY_BUCKET.put("/bucket/archive.tar.gz", stream, {

  httpMetadata: { contentType: mimeType },

});


// Example 2: Stream an HTTP response:

return new Response(content, { headers: { "Content-Type": mimeType } });


// Older versions/transports used the base64 encoding for binary data:

const archive = await sandbox.readFile("/workspace/archive.tar.gz", {

  encoding: "base64",

});

console.log(archive.content); // => "<base64 encoded string>";


```

TypeScript

```

const file = await sandbox.readFile('/workspace/package.json');

const pkg = JSON.parse(file.content);


// Binary data (since 0.10.1 using `rpc` transport)

const { content, size, mimeType } = await sandbox.readFile("/workspace/archive.tar.gz", {

  encoding: "none"

});


// Example 1: Store on R2:

const stream = request.body.pipeThrough(new FixedLengthStream(size));

await env.MY_BUCKET.put('/bucket/archive.tar.gz', stream, {

  httpMetadata: { contentType: mimeType }

});


// Example 2: Stream an HTTP response:

return new Response(content, { headers: { "Content-Type": mimeType } });


// Older versions/transports used the base64 encoding for binary data:

const archive = await sandbox.readFile("/workspace/archive.tar.gz", {

  encoding: "base64"

});

console.log(archive.content); // => "<base64 encoded string>";


```

Encoding behavior

When `encoding` is specified, it overrides MIME-based auto-detection. Without `encoding`, the SDK detects the appropriate encoding from the file's MIME type.

### `exists()`

Check if a file or directory exists.

TypeScript

```

const result = await sandbox.exists(path: string): Promise<FileExistsResult>


```

**Parameters**:

* `path` \- Absolute path to check

**Returns**: `Promise<FileExistsResult>` with `exists` boolean

* [  JavaScript ](#tab-panel-10129)
* [  TypeScript ](#tab-panel-10130)

JavaScript

```

const result = await sandbox.exists("/workspace/package.json");

if (result.exists) {

  const file = await sandbox.readFile("/workspace/package.json");

  // process file

}


// Check directory

const dirResult = await sandbox.exists("/workspace/src");

if (!dirResult.exists) {

  await sandbox.mkdir("/workspace/src");

}


```

TypeScript

```

const result = await sandbox.exists('/workspace/package.json');

if (result.exists) {

  const file = await sandbox.readFile('/workspace/package.json');

  // process file

}


// Check directory

const dirResult = await sandbox.exists('/workspace/src');

if (!dirResult.exists) {

  await sandbox.mkdir('/workspace/src');

}


```

Available on sessions

Both `sandbox.exists()` and `session.exists()` are supported.

### `mkdir()`

Create a directory.

TypeScript

```

await sandbox.mkdir(path: string, options?: MkdirOptions): Promise<void>


```

**Parameters**:

* `path` \- Absolute path to the directory
* `options` (optional):  
   * `recursive` \- Create parent directories if needed (default: `false`)

* [  JavaScript ](#tab-panel-10123)
* [  TypeScript ](#tab-panel-10124)

JavaScript

```

await sandbox.mkdir("/workspace/src");


// Nested directories

await sandbox.mkdir("/workspace/src/components/ui", { recursive: true });


```

TypeScript

```

await sandbox.mkdir('/workspace/src');


// Nested directories

await sandbox.mkdir('/workspace/src/components/ui', { recursive: true });


```

### `deleteFile()`

Delete a file.

TypeScript

```

await sandbox.deleteFile(path: string): Promise<void>


```

**Parameters**:

* `path` \- Absolute path to the file

* [  JavaScript ](#tab-panel-10121)
* [  TypeScript ](#tab-panel-10122)

JavaScript

```

await sandbox.deleteFile("/workspace/temp.txt");


```

TypeScript

```

await sandbox.deleteFile('/workspace/temp.txt');


```

### `renameFile()`

Rename a file.

TypeScript

```

await sandbox.renameFile(oldPath: string, newPath: string): Promise<void>


```

**Parameters**:

* `oldPath` \- Current file path
* `newPath` \- New file path

* [  JavaScript ](#tab-panel-10125)
* [  TypeScript ](#tab-panel-10126)

JavaScript

```

await sandbox.renameFile("/workspace/draft.txt", "/workspace/final.txt");


```

TypeScript

```

await sandbox.renameFile('/workspace/draft.txt', '/workspace/final.txt');


```

### `moveFile()`

Move a file to a different directory.

TypeScript

```

await sandbox.moveFile(sourcePath: string, destinationPath: string): Promise<void>


```

**Parameters**:

* `sourcePath` \- Current file path
* `destinationPath` \- Destination path

* [  JavaScript ](#tab-panel-10127)
* [  TypeScript ](#tab-panel-10128)

JavaScript

```

await sandbox.moveFile("/tmp/download.txt", "/workspace/data.txt");


```

TypeScript

```

await sandbox.moveFile('/tmp/download.txt', '/workspace/data.txt');


```

### `gitCheckout()`

Clone a git repository.

TypeScript

```

await sandbox.gitCheckout(repoUrl: string, options?: GitCheckoutOptions): Promise<void>


```

**Parameters**:

* `repoUrl` \- Git repository URL
* `options` (optional):  
   * `branch` \- Branch to checkout (default: repository default branch)  
   * `targetDir` \- Directory to clone into (default: `/workspace/{repoName}`)  
   * `depth` \- Clone depth for shallow clones (e.g., `1` for latest commit only)

* [  JavaScript ](#tab-panel-10131)
* [  TypeScript ](#tab-panel-10132)

JavaScript

```

await sandbox.gitCheckout("https://github.com/user/repo");


// Specific branch

await sandbox.gitCheckout("https://github.com/user/repo", {

  branch: "develop",

  targetDir: "/workspace/my-project",

});


// Shallow clone (faster for large repositories)

await sandbox.gitCheckout("https://github.com/facebook/react", {

  depth: 1,

});


```

TypeScript

```

await sandbox.gitCheckout('https://github.com/user/repo');


// Specific branch

await sandbox.gitCheckout('https://github.com/user/repo', {

  branch: 'develop',

  targetDir: '/workspace/my-project'

});


// Shallow clone (faster for large repositories)

await sandbox.gitCheckout('https://github.com/facebook/react', {

  depth: 1

});


```

## Related resources

* [Manage files guide](https://developers.cloudflare.com/sandbox/guides/manage-files/) \- Detailed guide with best practices
* [Commands API](https://developers.cloudflare.com/sandbox/api/commands/) \- Execute commands

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/api/files/#page","headline":"Files · Cloudflare Sandbox SDK docs","description":"Read, write, and manage files in the Sandbox SDK filesystem.","url":"https://developers.cloudflare.com/sandbox/api/files/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/api/","name":"API reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/api/files/","name":"Files"}}]}
```
