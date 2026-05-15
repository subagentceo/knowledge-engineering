> This page location: Tools & Workflows > API, CLI & SDKs > CLI > completion
> Full Neon documentation index: https://neon.com/docs/llms.txt

> Summary: Covers the usage of the `completion` command in the Neon CLI to generate a script that enhances command-line efficiency by providing auto-completion for `neonctl` commands and options.

# Neon CLI command: completion

Generate shell completion scripts for neonctl commands and options

## Before you begin

Before running the `completion` command, ensure that you have [installed the Neon CLI](https://neon.com/docs/reference/cli-install).

## The `completion` command

This command generates a completion script for the `neonctl` command-line interface (CLI). The completion script, when installed, helps you type `neon` commands faster and more accurately. It does this by presenting the possible commands and options when you press the **tab** key after typing or partially typing a command or option.

### Usage

```bash
neon completion
```

The command outputs a completion script similar to the one shown below.

**Important:** Use the completion script that is output to your terminal or command window, as the script may differ depending on your operating environment.

```text
###-begin-neonctl-completions-###
#
# yargs command completion script
#
# Installation: neonctl completion >> ~/.bashrc
#    or neonctl completion >> ~/.bash_profile on OSX.
#
_neonctl_yargs_completions()
{
    local cur_word args type_list

    cur_word="${COMP_WORDS[COMP_CWORD]}"
    args=("${COMP_WORDS[@]}")

    # ask yargs to generate completions.
    type_list=$(neonctl --get-yargs-completions "${args[@]}")

    COMPREPLY=( $(compgen -W "${type_list}" -- ${cur_word}) )

    # if no match was found, fall back to filename completion
    if [ ${#COMPREPLY[@]} -eq 0 ]; then
      COMPREPLY=()
    fi

    return 0
}
complete -o bashdefault -o default -F _neonctl_yargs_completions neonctl
###-end-neonctl-completions-###
```

Use the commands provided below to add the completion script to your shell configuration file, which is typically found in your `home` directory. Your shell configuration file may differ by platform. For example, on Ubuntu, you should have a `.bashrc` file, and on macOS, you might have `bash_profile` or `.zshrc` file. The `source` command causes the changes to take effect immediately in the current shell session.

**bashrc**

```bash
neon completion >> ~/.bashrc
source ~/.bashrc
```

**bash_profile**

```bash
neon completion >> ~/.bash_profile
source ~/.bash_profile
```

**profile**

```bash
neon completion >> ~/.profile
source ~/.profile
```

**zshrc**

```bash
neon completion >> ~/.zshrc
source ~/.zshrc
```

---

## Related docs (CLI)

- [Overview](https://neon.com/docs/reference/neon-cli)
- [Quickstart](https://neon.com/docs/reference/cli-quickstart)
- [Install and connect](https://neon.com/docs/reference/cli-install)
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
