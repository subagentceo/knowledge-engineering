# docker scout vex get

**Description:** Get VEX attestation for image

**Usage:** `docker scout vex get OPTIONS IMAGE`





> [!NOTE]
> **Experimental**
>
> This command is experimental. Experimental features are intended for testing and feedback as their functionality or design may change between releases without warning or can be removed entirely in a future release.





## Description

The docker scout vex get command gets a VEX attestation for images.


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `--key` | `https://registry.scout.docker.com/keyring/dhi/latest.pub` |  Signature key to use for verification |
| `--org` |  |  Namespace of the Docker organization |
| `-o`, `--output` |  |  Write the report to a file |
| `--platform` |  |  Platform of image to analyze |
| `--ref` |  |  Reference to use if the provided tarball contains multiple references.<br>Can only be used with archive |
| `--skip-tlog` |  |  Skip signature verification against public transaction log |
| `--verify` |  |  Verify the signature on the attestation |






