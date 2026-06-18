---
title: Commands
description: Execute commands and manage background processes in Sandbox SDK containers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Commands

Execute commands and manage background processes in the sandbox's isolated container environment.

## Methods

### `exec()`

Execute a command and return the complete result.

TypeScript

```

const result = await sandbox.exec(command: string, options?: ExecOptions): Promise<ExecuteResponse>


```

**Parameters**:

* `command` \- The command to execute (can include arguments)
* `options` (optional):  
   * `stream` \- Enable streaming callbacks (default: `false`)  
   * `onOutput` \- Callback for real-time output: `(stream: 'stdout' | 'stderr', data: string) => void`  
   * `timeout` \- Maximum execution time in milliseconds  
   * `env` \- Environment variables for this command: `Record<string, string | undefined>`  
   * `cwd` \- Working directory for this command  
   * `stdin` \- Data to pass to the command's standard input (enables arbitrary input without shell injection risks)

**Returns**: `Promise<ExecuteResponse>` with `success`, `stdout`, `stderr`, `exitCode`

* [  JavaScript ](#tab-panel-10109)
* [  TypeScript ](#tab-panel-10110)

JavaScript

```

const result = await sandbox.exec("npm run build");


if (result.success) {

  console.log("Build output:", result.stdout);

} else {

  console.error("Build failed:", result.stderr);

}


// With streaming

await sandbox.exec("npm install", {

  stream: true,

  onOutput: (stream, data) => console.log(`[${stream}] ${data}`),

});


// With environment variables (undefined values are skipped)

await sandbox.exec("node app.js", {

  env: {

    NODE_ENV: "production",

    PORT: "3000",

    DEBUG_MODE: undefined, // Skipped, uses container default or unset

  },

});


// Pass input via stdin (no shell injection risks)

const result = await sandbox.exec("cat", {

  stdin: "Hello, world!",

});

console.log(result.stdout); // "Hello, world!"


// Process user input safely

const userInput = "user@example.com\nsecret123";

await sandbox.exec("python process_login.py", {

  stdin: userInput,

});


```

TypeScript

```

const result = await sandbox.exec('npm run build');


if (result.success) {

  console.log('Build output:', result.stdout);

} else {

  console.error('Build failed:', result.stderr);

}


// With streaming

await sandbox.exec('npm install', {

  stream: true,

  onOutput: (stream, data) => console.log(`[${stream}] ${data}`)

});


// With environment variables (undefined values are skipped)

await sandbox.exec('node app.js', {

  env: {

    NODE_ENV: 'production',

    PORT: '3000',

    DEBUG_MODE: undefined // Skipped, uses container default or unset

  }

});


// Pass input via stdin (no shell injection risks)

const result = await sandbox.exec('cat', {

  stdin: 'Hello, world!'

});

console.log(result.stdout); // "Hello, world!"


// Process user input safely

const userInput = 'user@example.com\nsecret123';

await sandbox.exec('python process_login.py', {

  stdin: userInput

});


```

Timeout behavior

When a command times out, the SDK raises an error on the caller side and closes the connection. The underlying process **continues running** inside the container. To stop a timed-out process, delete the session with [deleteSession()](https://developers.cloudflare.com/sandbox/api/sessions/#deletesession) or destroy the sandbox with [destroy()](https://developers.cloudflare.com/sandbox/api/lifecycle/#destroy).

Timeout precedence: per-command `timeout` on `exec()` \> session-level `commandTimeoutMs` on [createSession()](https://developers.cloudflare.com/sandbox/api/sessions/#createsession) \> global [COMMAND\_TIMEOUT\_MS](https://developers.cloudflare.com/sandbox/configuration/environment-variables/#command%5Ftimeout%5Fms) environment variable. If none are set, commands run without a timeout.

### `execStream()`

Execute a command and return a Server-Sent Events stream for real-time processing.

TypeScript

```

const stream = await sandbox.execStream(command: string, options?: ExecOptions): Promise<ReadableStream>


```

**Parameters**:

* `command` \- The command to execute
* `options` \- Same as `exec()` (including `stdin` support)

**Returns**: `Promise<ReadableStream>` emitting `ExecEvent` objects (`start`, `stdout`, `stderr`, `complete`, `error`)

* [  JavaScript ](#tab-panel-10105)
* [  TypeScript ](#tab-panel-10106)

JavaScript

```

import { parseSSEStream } from "@cloudflare/sandbox";


const stream = await sandbox.execStream("npm run build");


for await (const event of parseSSEStream(stream)) {

  switch (event.type) {

    case "stdout":

      console.log("Output:", event.data);

      break;

    case "complete":

      console.log("Exit code:", event.exitCode);

      break;

    case "error":

      console.error("Failed:", event.error);

      break;

  }

}


// Stream with stdin input

const inputStream = await sandbox.execStream(

  'python -c "import sys; print(sys.stdin.read())"',

  {

    stdin: "Data from Workers!",

  },

);


for await (const event of parseSSEStream(inputStream)) {

  if (event.type === "stdout") {

    console.log("Python received:", event.data);

  }

}


```

TypeScript

```

import { parseSSEStream, type ExecEvent } from '@cloudflare/sandbox';


const stream = await sandbox.execStream('npm run build');


for await (const event of parseSSEStream<ExecEvent>(stream)) {

  switch (event.type) {

    case 'stdout':

      console.log('Output:', event.data);

      break;

    case 'complete':

      console.log('Exit code:', event.exitCode);

      break;

    case 'error':

      console.error('Failed:', event.error);

      break;

  }

}


// Stream with stdin input

const inputStream = await sandbox.execStream('python -c "import sys; print(sys.stdin.read())"', {

  stdin: 'Data from Workers!'

});


for await (const event of parseSSEStream<ExecEvent>(inputStream)) {

  if (event.type === 'stdout') {

    console.log('Python received:', event.data);

  }

}


```

### `startProcess()`

Start a long-running background process.

TypeScript

```

const process = await sandbox.startProcess(command: string, options?: ProcessOptions): Promise<Process>


```

**Parameters**:

* `command` \- The command to start as a background process
* `options` (optional):  
   * `cwd` \- Working directory  
   * `env` \- Environment variables: `Record<string, string | undefined>`  
   * `stdin` \- Data to pass to the command's standard input  
   * `timeout` \- Maximum execution time in milliseconds  
   * `processId` \- Custom process ID  
   * `encoding` \- Output encoding (default: `'utf8'`)  
   * `autoCleanup` \- Whether to clean up process on sandbox sleep

**Returns**: `Promise<Process>` object with:

* `id` \- Unique process identifier
* `pid` \- System process ID
* `command` \- The command being executed
* `status` \- Current status (`'running'`, `'exited'`, etc.)
* `kill()` \- Stop the process
* `getStatus()` \- Get current status
* `getLogs()` \- Get accumulated logs
* `waitForPort()` \- Wait for process to listen on a port
* `waitForLog()` \- Wait for pattern in process output
* `waitForExit()` \- Wait for process to terminate and return exit code

* [  JavaScript ](#tab-panel-10089)
* [  TypeScript ](#tab-panel-10090)

JavaScript

```

const server = await sandbox.startProcess("python -m http.server 8000");

console.log("Started with PID:", server.pid);


// With custom environment

const app = await sandbox.startProcess("node app.js", {

  cwd: "/workspace/my-app",

  env: { NODE_ENV: "production", PORT: "3000" },

});


// Start process with stdin input (useful for interactive applications)

const interactive = await sandbox.startProcess("python interactive_app.py", {

  stdin: "initial_config\nstart_mode\n",

});


```

TypeScript

```

const server = await sandbox.startProcess('python -m http.server 8000');

console.log('Started with PID:', server.pid);


// With custom environment

const app = await sandbox.startProcess('node app.js', {

  cwd: '/workspace/my-app',

  env: { NODE_ENV: 'production', PORT: '3000' }

});


// Start process with stdin input (useful for interactive applications)

const interactive = await sandbox.startProcess('python interactive_app.py', {

  stdin: 'initial_config\nstart_mode\n'

});


```

### `listProcesses()`

List all running processes.

TypeScript

```

const processes = await sandbox.listProcesses(): Promise<ProcessInfo[]>


```

* [  JavaScript ](#tab-panel-10085)
* [  TypeScript ](#tab-panel-10086)

JavaScript

```

const processes = await sandbox.listProcesses();


for (const proc of processes) {

  console.log(`${proc.id}: ${proc.command} (PID ${proc.pid})`);

}


```

TypeScript

```

const processes = await sandbox.listProcesses();


for (const proc of processes) {

  console.log(`${proc.id}: ${proc.command} (PID ${proc.pid})`);

}


```

### `killProcess()`

Terminate a specific process and all of its child processes.

TypeScript

```

await sandbox.killProcess(processId: string, signal?: string): Promise<void>


```

**Parameters**:

* `processId` \- The process ID (from `startProcess()` or `listProcesses()`)
* `signal` \- Signal to send (default: `"SIGTERM"`)

Sends the signal to the entire process group, ensuring that both the main process and any child processes it spawned are terminated. This prevents orphaned processes from continuing to run after the parent is killed.

* [  JavaScript ](#tab-panel-10091)
* [  TypeScript ](#tab-panel-10092)

JavaScript

```

const server = await sandbox.startProcess("python -m http.server 8000");

await sandbox.killProcess(server.id);


// Example with a process that spawns children

const script = await sandbox.startProcess(

  'bash -c "sleep 10 & sleep 10 & wait"',

);

// killProcess terminates both sleep commands and the bash process

await sandbox.killProcess(script.id);


```

TypeScript

```

const server = await sandbox.startProcess('python -m http.server 8000');

await sandbox.killProcess(server.id);


// Example with a process that spawns children

const script = await sandbox.startProcess('bash -c "sleep 10 & sleep 10 & wait"');

// killProcess terminates both sleep commands and the bash process

await sandbox.killProcess(script.id);


```

### `killAllProcesses()`

Terminate all running processes.

TypeScript

```

await sandbox.killAllProcesses(): Promise<void>


```

* [  JavaScript ](#tab-panel-10087)
* [  TypeScript ](#tab-panel-10088)

JavaScript

```

await sandbox.killAllProcesses();


```

TypeScript

```

await sandbox.killAllProcesses();


```

### `streamProcessLogs()`

Stream logs from a running process in real-time.

TypeScript

```

const stream = await sandbox.streamProcessLogs(processId: string): Promise<ReadableStream>


```

**Parameters**:

* `processId` \- The process ID

**Returns**: `Promise<ReadableStream>` emitting `LogEvent` objects

* [  JavaScript ](#tab-panel-10095)
* [  TypeScript ](#tab-panel-10096)

JavaScript

```

import { parseSSEStream } from "@cloudflare/sandbox";


const server = await sandbox.startProcess("node server.js");

const logStream = await sandbox.streamProcessLogs(server.id);


for await (const log of parseSSEStream(logStream)) {

  console.log(`[${log.timestamp}] ${log.data}`);


  if (log.data.includes("Server started")) break;

}


```

TypeScript

```

import { parseSSEStream, type LogEvent } from '@cloudflare/sandbox';


const server = await sandbox.startProcess('node server.js');

const logStream = await sandbox.streamProcessLogs(server.id);


for await (const log of parseSSEStream<LogEvent>(logStream)) {

  console.log(`[${log.timestamp}] ${log.data}`);


  if (log.data.includes('Server started')) break;

}


```

### `getProcessLogs()`

Get accumulated logs from a process.

TypeScript

```

const logs = await sandbox.getProcessLogs(processId: string): Promise<string>


```

**Parameters**:

* `processId` \- The process ID

**Returns**: `Promise<string>` with all accumulated output

* [  JavaScript ](#tab-panel-10093)
* [  TypeScript ](#tab-panel-10094)

JavaScript

```

const server = await sandbox.startProcess("node server.js");

await new Promise((resolve) => setTimeout(resolve, 5000));


const logs = await sandbox.getProcessLogs(server.id);

console.log("Server logs:", logs);


```

TypeScript

```

const server = await sandbox.startProcess('node server.js');

await new Promise(resolve => setTimeout(resolve, 5000));


const logs = await sandbox.getProcessLogs(server.id);

console.log('Server logs:', logs);


```

## Standard input (stdin)

All command execution methods support passing data to a command's standard input via the `stdin` option. This enables secure processing of user input without shell injection risks.

### How stdin works

When you provide the `stdin` option:

1. The input data is written to a temporary file inside the container
2. The command receives this data through its standard input stream
3. The temporary file is automatically cleaned up after execution

This approach prevents shell injection attacks that could occur when embedding user data directly in commands.

* [  JavaScript ](#tab-panel-10097)
* [  TypeScript ](#tab-panel-10098)

JavaScript

```

// Safe: User input goes through stdin, not shell parsing

const userInput = "user@domain.com; rm -rf /";

const result = await sandbox.exec("python validate_email.py", {

  stdin: userInput,

});


// Instead of unsafe: `python validate_email.py "${userInput}"`

// which could execute the embedded `rm -rf /` command


```

TypeScript

```

// Safe: User input goes through stdin, not shell parsing

const userInput = 'user@domain.com; rm -rf /';

const result = await sandbox.exec('python validate_email.py', {

  stdin: userInput

});


// Instead of unsafe: `python validate_email.py "${userInput}"`

// which could execute the embedded `rm -rf /` command


```

### Common patterns

**Processing form data:**

* [  JavaScript ](#tab-panel-10101)
* [  TypeScript ](#tab-panel-10102)

JavaScript

```

const formData = JSON.stringify({

  username: "john_doe",

  email: "john@example.com",

});


const result = await sandbox.exec("python process_form.py", {

  stdin: formData,

});


```

TypeScript

```

const formData = JSON.stringify({

  username: 'john_doe',

  email: 'john@example.com'

});


const result = await sandbox.exec('python process_form.py', {

  stdin: formData

});


```

**Interactive command-line tools:**

* [  JavaScript ](#tab-panel-10099)
* [  TypeScript ](#tab-panel-10100)

JavaScript

```

// Simulate user responses to prompts

const responses = "yes\nmy-app\n1.0.0\n";

const result = await sandbox.exec("npm init", {

  stdin: responses,

});


```

TypeScript

```

// Simulate user responses to prompts

const responses = 'yes\nmy-app\n1.0.0\n';

const result = await sandbox.exec('npm init', {

  stdin: responses

});


```

**Data transformation:**

* [  JavaScript ](#tab-panel-10103)
* [  TypeScript ](#tab-panel-10104)

JavaScript

```

const csvData = "name,age,city\nJohn,30,NYC\nJane,25,LA";

const result = await sandbox.exec("python csv_processor.py", {

  stdin: csvData,

});


console.log("Processed data:", result.stdout);


```

TypeScript

```

const csvData = 'name,age,city\nJohn,30,NYC\nJane,25,LA';

const result = await sandbox.exec('python csv_processor.py', {

  stdin: csvData

});


console.log('Processed data:', result.stdout);


```

## Process readiness methods

The `Process` object returned by `startProcess()` includes methods to wait for the process to be ready before proceeding.

### `process.waitForPort()`

Wait for a process to listen on a port.

TypeScript

```

await process.waitForPort(port: number, options?: WaitForPortOptions): Promise<void>


```

**Parameters**:

* `port` \- The port number to check
* `options` (optional):  
   * `mode` \- Check mode: `'http'` (default) or `'tcp'`  
   * `timeout` \- Maximum wait time in milliseconds  
   * `interval` \- Check interval in milliseconds (default: `100`)  
   * `path` \- HTTP path to check (default: `'/'`, HTTP mode only)  
   * `status` \- Expected HTTP status range (default: `{ min: 200, max: 399 }`, HTTP mode only)

**HTTP mode** (default) makes an HTTP GET request and checks the response status:

* [  JavaScript ](#tab-panel-10111)
* [  TypeScript ](#tab-panel-10112)

JavaScript

```

const server = await sandbox.startProcess("node server.js");


// Wait for server to be ready (HTTP mode)

await server.waitForPort(3000);


// Check specific endpoint and status

await server.waitForPort(8080, {

  path: "/health",

  status: { min: 200, max: 299 },

  timeout: 30000,

});


```

TypeScript

```

const server = await sandbox.startProcess('node server.js');


// Wait for server to be ready (HTTP mode)

await server.waitForPort(3000);


// Check specific endpoint and status

await server.waitForPort(8080, {

  path: '/health',

  status: { min: 200, max: 299 },

  timeout: 30000

});


```

**TCP mode** checks if the port accepts connections:

* [  JavaScript ](#tab-panel-10107)
* [  TypeScript ](#tab-panel-10108)

JavaScript

```

const db = await sandbox.startProcess("redis-server");


// Wait for database to accept connections

await db.waitForPort(6379, {

  mode: "tcp",

  timeout: 10000,

});


```

TypeScript

```

const db = await sandbox.startProcess('redis-server');


// Wait for database to accept connections

await db.waitForPort(6379, {

  mode: 'tcp',

  timeout: 10000

});


```

**Throws**:

* `ProcessReadyTimeoutError` \- If port does not become ready within timeout
* `ProcessExitedBeforeReadyError` \- If process exits before becoming ready

### `process.waitForLog()`

Wait for a pattern to appear in process output.

TypeScript

```

const result = await process.waitForLog(pattern: string | RegExp, timeout?: number): Promise<WaitForLogResult>


```

**Parameters**:

* `pattern` \- String or RegExp to match in stdout/stderr
* `timeout` \- Maximum wait time in milliseconds (optional)

**Returns**: `Promise<WaitForLogResult>` with:

* `line` \- The matching line of output
* `matches` \- Array of capture groups (for RegExp patterns)

* [  JavaScript ](#tab-panel-10115)
* [  TypeScript ](#tab-panel-10116)

JavaScript

```

const server = await sandbox.startProcess("node server.js");


// Wait for string pattern

const result = await server.waitForLog("Server listening");

console.log("Ready:", result.line);


// Wait for RegExp with capture groups

const result = await server.waitForLog(/Server listening on port (\d+)/);

console.log("Port:", result.matches[1]); // Extracted port number


// With timeout

await server.waitForLog("Ready", 30000);


```

TypeScript

```

const server = await sandbox.startProcess('node server.js');


// Wait for string pattern

const result = await server.waitForLog('Server listening');

console.log('Ready:', result.line);


// Wait for RegExp with capture groups

const result = await server.waitForLog(/Server listening on port (\d+)/);

console.log('Port:', result.matches[1]); // Extracted port number


// With timeout

await server.waitForLog('Ready', 30000);


```

**Throws**:

* `ProcessReadyTimeoutError` \- If pattern is not found within timeout
* `ProcessExitedBeforeReadyError` \- If process exits before pattern appears

### `process.waitForExit()`

Wait for a process to terminate and return the exit code.

TypeScript

```

const result = await process.waitForExit(timeout?: number): Promise<WaitForExitResult>


```

**Parameters**:

* `timeout` \- Maximum wait time in milliseconds (optional)

**Returns**: `Promise<WaitForExitResult>` with:

* `exitCode` \- The process exit code

* [  JavaScript ](#tab-panel-10113)
* [  TypeScript ](#tab-panel-10114)

JavaScript

```

const build = await sandbox.startProcess("npm run build");


// Wait for build to complete

const result = await build.waitForExit();

console.log("Build finished with exit code:", result.exitCode);


// With timeout

const result = await build.waitForExit(60000); // 60 second timeout


```

TypeScript

```

const build = await sandbox.startProcess('npm run build');


// Wait for build to complete

const result = await build.waitForExit();

console.log('Build finished with exit code:', result.exitCode);


// With timeout

const result = await build.waitForExit(60000); // 60 second timeout


```

**Throws**:

* `ProcessReadyTimeoutError` \- If process does not exit within timeout

## Related resources

* [Background processes guide](https://developers.cloudflare.com/sandbox/guides/background-processes/) \- Managing long-running processes
* [Files API](https://developers.cloudflare.com/sandbox/api/files/) \- File operations

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/api/commands/#page","headline":"Commands · Cloudflare Sandbox SDK docs","description":"Execute commands and manage background processes in Sandbox SDK containers.","url":"https://developers.cloudflare.com/sandbox/api/commands/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/api/","name":"API reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/api/commands/","name":"Commands"}}]}
```
