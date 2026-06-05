# Swiftly — Swift Version Manager for Linux

> Source: https://www.swift.org/install/linux/swiftly/
> Crawled: 2026-06-05

## What swiftly is

Swiftly is the official Swift toolchain version manager for Linux, maintained by the Swift community and recommended by swift.org. It lets you install, switch between, and uninstall Swift toolchains without system-level package managers. Swiftly manages toolchains under `~/.local/share/swiftly/` by default and configures your shell's PATH automatically.

## Installation

### Download and extract

```bash
curl -O "https://download.swift.org/swiftly/linux/swiftly-1.1.2-$(uname -m).tar.gz"
tar -zxf "swiftly-1.1.2-$(uname -m).tar.gz"
```

### Optional: verify the signature

```bash
curl https://www.swift.org/keys/all-keys.asc | gpg --import -
curl -O "https://download.swift.org/swiftly/linux/swiftly-1.1.2-$(uname -m).tar.gz.sig"
gpg --verify "swiftly-1.1.2-$(uname -m).tar.gz.sig" "swiftly-1.1.2-$(uname -m).tar.gz"
```

### Initialize swiftly

```bash
./swiftly init
```

`swiftly init` installs the binary, sets up `SWIFTLY_HOME_DIR` / `SWIFTLY_BIN_DIR`, and writes activation snippets into your shell profile.

## Shell activation

After `init`, source the env file to activate swiftly in the current shell session.

### bash / zsh

```bash
source ~/.local/share/swiftly/env.sh
```

### fish

Swiftly writes a conf.d snippet during `init`. Open a new terminal, or manually source:

```fish
source ~/.config/fish/conf.d/swiftly.fish
```

### Customise install location

Set these environment variables before running `swiftly init` to change the default directories:

```bash
export SWIFTLY_HOME_DIR="$HOME/.swiftly"
export SWIFTLY_BIN_DIR="$HOME/.local/bin"
./swiftly init
```

## Version selection

### Install the latest stable release

```bash
swiftly install latest
```

### Install a specific release

```bash
swiftly install 6.1
swiftly install 5.10
```

### Install a snapshot toolchain

```bash
swiftly install main-snapshot
swiftly install 6.0-snapshot
```

### Use (activate) an installed toolchain

```bash
swiftly use 6.1
swiftly use main-snapshot
```

### List installed toolchains

```bash
swiftly list
```

### List available toolchains from swift.org

```bash
swiftly list-available
```

### Verify the active toolchain

```bash
swift --version
```

## Updating swiftly itself

```bash
swiftly self-update
```

## Uninstall a toolchain

```bash
swiftly uninstall 5.10
swiftly uninstall all
```

## Uninstall swiftly

```bash
swiftly self-uninstall
```

Manual removal (if `self-uninstall` is unavailable):

1. `swiftly uninstall all` — remove all toolchains
2. Remove `~/.local/share/swiftly/` (or `$SWIFTLY_HOME_DIR`)
3. Remove the swiftly binary from `$SWIFTLY_BIN_DIR`
4. Delete the activation lines from `~/.bashrc`, `~/.zshrc`, or `~/.config/fish/conf.d/swiftly.fish`
5. Restart your shell
