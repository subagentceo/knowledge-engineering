# docker dhi mirror start

**Description:** Start mirroring Docker Hardened Images

**Usage:** `docker dhi mirror start`










## Description

Start mirroring one or more Docker Hardened Images to your organization's registry.

Repository mappings are specified as arguments. The following formats are supported:

  source                  Only the source repository; destination is auto-generated as
                          <org>/dhi-<source-name>
  source,destination      Source and destination; the destination namespace is filled from config if omitted
  ns/source,ns/dest       Fully qualified source and destination

The source namespace defaults to "dhi" when not specified.
The destination namespace defaults to the configured organization (--org or config).

Examples:
  docker dhi mirror start --org myorg dhi/golang,myorg/dhi-golang dhi/node,myorg/dhi-node
  docker dhi mirror start --org myorg golang,dhi-golang node,dhi-node
  docker dhi mirror start --org myorg golang node


## Options

| Option | Default | Description |
|--------|---------|-------------|
| `-d`, `--dependencies` |  |  Mirrors any existing dependencies |
| `--json` |  |  Output in JSON format |






