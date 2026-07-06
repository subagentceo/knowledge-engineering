# docker dhi customization create

**Description:** Create a new customization from YAML file

**Usage:** `docker dhi customization create <file>`










## Description

Create a new Docker Hardened Images customization using a YAML file as input.
The file should contain the complete customization structure without an 'id' field.

Flags can override values from the YAML file (see --help for details).
Shell completions are available for --destination and --tag-definition-id flags.
Run 'docker dhi completion --help' to set up shell completions.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-d`, `--destination` |  |  Override the destination repository (e.g. myorg/dhi-golang) |
| `--json` |  |  Output in JSON format |
| `-n`, `--name` |  |  Override the customization name from the YAML file |
| `-t`, `--tag-definition-id` |  |  Override the tag definition ID (single-target only) |






