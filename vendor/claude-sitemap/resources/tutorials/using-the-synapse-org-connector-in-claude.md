# Using the Synapse.org Connector in Claude

The Synapse.org integration by Sage Bionetworks allows researchers to discover biomedical data across all of Synapse, see the structure of projects, and retrieve information on their data assets for authorized users. This article explains how to set up and use the Synapse.org integration with Claude to advance your research and analysis workflows.

The Synapse.org integration relies upon Claude's ability to use remote connectors.

## What this integration provides

Services include search and (meta)data retrieval services. Data access will be governed by the access controls defined for each project. Some data are publicly available, while others require approval from Synapse’s governance team prior to access.

## Who can access the Synapse.org integration

- Individuals who have a registered Synapse account (register for free)
- Data access may be subject to use restriction from contributors

More details on accessing the integration can be found in Synapse’s MCP Server Documentation.

## Setting up the Synapse.org integration

**For Organization Owners (Team and Enterprise)**

1.  Navigate to Admin settings > Connectors
2.  Click "Browse connectors"
3.  Click “**Synapse.org**”
4.  Click “Add to your team”

**For Individual Claude Users**

1.  Navigate to Settings > Connectors
2.  Click “Connect”
3.  Follow the instructions to authenticate with your Synapse.org account

Learn about finding and connecting tools in Claude.

**For Claude Code Users**

1.  Command: `/plugin marketplace add anthropics/life-sciences`‍
2.  Command: `/plugin install synapse@life-sciences`‍
3.  Restart Claude Code
4.  Verify that the server is connected with `/mcp`

Technical details of the Synapse.org integration can be found in Synapse’s MCP Server Documentation.

## Common use cases

- Search for reusable scientific data across all of the Synapse.org platform
  - _“Find RNA-seq datasets related to Alzheimer's disease in Synapse”_
  - _“Search Synapse for single-cell transcriptomics datasets”_
  - _"Find genomic sequencing data for plexiform neurofibromas in the NF Data Portal”_
- Authorized users can see hierarchy of folders, files, tables, datasets within projects to help organize and monitor data assets
  - _“Explain the files and folders in the public AACR Project GENIE project”_
  - _“Give me a quick overview of the data assets in the SEA-AD challenge project with agentic track (syn66496696)?”_
- Get custom metadata of entities in Synapse
  - _“What are the annotations and metadata for file syn4553239?”_
  - _“Show me the custom metadata fields for dataset syn66364675”_
- Get provenance information for entities in Synapse to help understand past data processing
  - _“What's the processing history for file syn51543273?”_
  - _“Show me the data lineage and upstream dependencies for the dataset syn68719289”_

‍
