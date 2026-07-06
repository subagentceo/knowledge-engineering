# docker scout attestation list

**Description:** List attestations for image

**Usage:** `docker scout attestation list OPTIONS IMAGE`

**Aliases:** `docker scout attest list`



> [!NOTE]
> **Experimental**
>
> This command is experimental. Experimental features are intended for testing and feedback as their functionality or design may change between releases without warning or can be removed entirely in a future release.





## Description

The docker scout attestation list command lists attestations for images.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--format` | `list` |  Output format:<br>- list: list of attestations of the image<br>- json: json representation of the attestation list (default "json") |
| `--org` |  |  Namespace of the Docker organization |
| `-o`, `--output` |  |  Write the report to a file |
| `--platform` |  |  Platform of image to analyze |
| `--predicate-type` |  |  Predicate-type for attestations |
| `--ref` |  |  Reference to use if the provided tarball contains multiple references.<br>Can only be used with archive |






