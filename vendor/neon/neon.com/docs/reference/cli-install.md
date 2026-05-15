> This page location: Tools & Workflows > API, CLI & SDKs > CLI > Install and connect
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: How to install the Neon CLI on macOS, Windows, and Linux, and connect using web authentication or API key for terminal management of Neon.

# Neon CLI: Install and connect

Install the Neon CLI and connect with web auth or API key

This section describes how to install the Neon CLI and connect via web authentication or API key.

**macOS**

**Install with [Homebrew](https://formulae.brew.sh/formula/neonctl)**

```bash
brew install neonctl
```

**Install via [npm](https://www.npmjs.com/package/neonctl)**

```shell
npm i -g neonctl
```

Requires [Node.js 18.0](https://nodejs.org/en/download/) or higher.

**Install with bun**

```bash
bun install -g neonctl
```

**macOS binary**

Download the binary. No installation required.

```bash
curl -sL https://github.com/neondatabase/neonctl/releases/latest/download/neonctl-macos -o neonctl
```

Run the CLI from the download directory:

```bash
neon <command> [options]
```

**Windows**

**Install via [npm](https://www.npmjs.com/package/neonctl)**

```shell
npm i -g neonctl
```

Requires [Node.js 18.0](https://nodejs.org/en/download/) or higher.

**Install with bun**

```bash
bun install -g neonctl
```

**Windows binary**

Download the binary. No installation required.

```bash
curl -sL -O https://github.com/neondatabase/neonctl/releases/latest/download/neonctl-win.exe
```

Run the CLI from the download directory:

```bash
neonctl-win.exe <command> [options]
```

**Linux**

**Install via [npm](https://www.npmjs.com/package/neonctl)**

```shell
npm i -g neonctl
```

**Install with bun**

```bash
bun install -g neonctl
```

**Linux binary**

Download the x64 or ARM64 binary, depending on your processor type. No installation required.

x64:

```bash
curl -sL https://github.com/neondatabase/neonctl/releases/latest/download/neonctl-linux-x64 -o neonctl
```

ARM64:

```bash
 curl -sL https://github.com/neondatabase/neonctl/releases/latest/download/neonctl-linux-arm64 -o neonctl
```

Run the CLI from the download directory:

```bash
neon <command> [options]
```

**Note: Use the Neon CLI without installing**

You can run the Neon CLI without installing it using **npx** (Node Package eXecute) or the `bun` equivalent, **bunx**. For example:

```shell
# npx
npx neonctl <command>

# bunx
bunx neonctl <command>
```

### Upgrade

When a new version is released, you can update your Neon CLI using the methods described below, depending on how you installed the CLI initially. To check for the latest version, refer to the **Releases** information on the [Neon CLI GitHub repository](https://github.com/neondatabase/neonctl) page. To check your installed version of the Neon CLI, run the following command:

```bash
neon --version
```

**npm**

To upgrade the Neon CLI via [npm](https://www.npmjs.com/package/neonctl):

```shell
npm update -g neonctl
```

**Homebrew**

To upgrade the Neon CLI with [Homebrew](https://formulae.brew.sh/formula/neonctl):

```bash
brew upgrade neonctl
```

**Binary**

To upgrade a [binary](https://github.com/neondatabase/neonctl/releases) version, download the `latest` binary as described in the install instructions above, and replace your old binary with the new one.

If you're using the Neon CLI in CI/CD tools like GitHub Actions, you can safely pin the Neon CLI to `latest`, as we prioritize stability for CI/CD processes.

**npm**

In your GitHub Actions workflow, you can use the `latest` tag with `npm`:

```yaml
- name: Install Neon CLI
  run: npm install -g neonctl@latest
```

**Homebrew**

Homebrew automatically fetches the latest version when running the `install` or `upgrade` command. You can include the following in your workflow:

```yaml
- name: Install Neon CLI
  run: brew install neonctl || brew upgrade neonctl
```

**Binary**

If you're downloading a binary, reference the latest release from the [Releases page](https://github.com/neondatabase/neonctl/releases). For example, you can use `curl` or `wget` in your workflow:

```yaml
- name: Install Neon CLI
  run: |
    curl -L https://github.com/neondatabase/neonctl/releases/latest/download/neonctl-linux-amd64 -o /usr/local/bin/neon
    chmod +x /usr/local/bin/neon
```

## Connect

The Neon CLI supports connecting via web authentication or API key.

### Web authentication

Run the following command to connect to Neon via web authentication:

```bash
neon auth
```

The [neon auth](https://neon.com/docs/reference/cli-auth) command launches a browser window where you can authorize the Neon CLI to access your Neon account. If you have not authenticated previously, running a Neon CLI command automatically launches the web authentication process unless you have specified an API key.

**Note:** If you use Neon through the [Vercel-Managed Integration](https://neon.com/docs/guides/vercel-managed-integration), you must authenticate connections from the CLI client using a Neon API key (see below). The `neon auth` command requires an account registered through Neon rather than Vercel.

### API key

To authenticate with a Neon API key, you can specify the `--api-key` option when running a Neon CLI command. For example, the following `neon projects list` command authenticates to Neon using the `--api-key` option:

```bash
neon projects list --api-key <neon_api_key>
```

To avoid including the `--api-key` option with each CLI command, you can export your API key to the `NEON_API_KEY` environment variable.

```bash
export NEON_API_KEY=<neon_api_key>
```

For information about obtaining an Neon API key, see [Create an API key](https://neon.com/docs/manage/api-keys#create-an-api-key).

## Configure autocompletion

The Neon CLI supports autocompletion, which you can configure in a few easy steps. See [Neon CLI commands — completion](https://neon.com/docs/reference/cli-completion) for instructions.

---

## Related docs (CLI)

- [Overview](https://neon.com/docs/reference/neon-cli)
- [Quickstart](https://neon.com/docs/reference/cli-quickstart)
- [auth](https://neon.com/docs/reference/cli-auth)
- [me](https://neon.com/docs/reference/cli-me)
- [orgs](https://neon.com/docs/reference/cli-orgs)
- [projects](https://neon.com/docs/reference/cli-projects)
- [ip-allow](https://neon.com/docs/reference/cli-ip-allow)
- [vpc](https://neon.com/docs/reference/cli-vpc)
- [branches](https://neon.com/docs/reference/cli-branches)
- [databases](https://neon.com/docs/reference/cli-databases)
- [roles](https://neon.com/docs/reference/cli-roles)
- [operations](https://neon.com/docs/reference/cli-operations)
- [connection-string](https://neon.com/docs/reference/cli-connection-string)
- [set-context](https://neon.com/docs/reference/cli-set-context)
- [init](https://neon.com/docs/reference/cli-init)
- [completion](https://neon.com/docs/reference/cli-completion)
