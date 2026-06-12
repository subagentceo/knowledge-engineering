# How to use the Instrument Data to Allotrope Skill with Claude

## What is the Instrument Data to Allotrope skill?

The instrument-to-allotrope skill converts raw laboratory instrument output files (CSVs, Excel, Txt, etc.) into standardized Allotrope Simple Model (ASM) JSON format or flattened 2D CSVs for easier integration with LIMS, ELNs, and data lakes. It auto-detects instrument types and when applicable, uses the allotropy library (authored by Benchling) to parse files. It also generates exportable Python parser code so data engineers can reliably replicate the conversion in production pipelines. Users may consider customizing the skill to use their specific data schemas or file output formats instead of the Allotrope standard. 

‍

## Who should use the Instrument Data to Allotrope skill?

This skill is designed for lab scientists, data managers, and informatics teams working with laboratory instruments who need to standardize disparate instrument outputs (cell counters, plate readers, spectrophotometers, etc.) into a consistent format for downstream analysis, regulatory submissions, or integration with enterprise data systems without writing code from scratch.

‍

## How to access the skill in Claude.ai

**For Organization Owners (Team and Enterprise)**

1.  Download the ZIP for the **instrument-data-to-allotrope** skill here
2.  From Claude.ai, navigate to Admin settings > Capabilities > Skills
3.  Make sure Skills is activated for your organization
4.  Click “Organization skills library”
5.  Click “+Add”
6.  Upload the skill zip file

Learn about provisioning and managing skills for your organization

‍

**For Individual Claude Users**

1.  Download the ZIP file for the **instrument-data-to-allotrope** skill here
2.  From Claude.ai, navigate to Settings > Capabilities > Skills (if Skills is not available, contact your team admin)
3.  Click “Upload skill”
4.  Upload the skill zip file

## How to access the skills in Claude Code

Command 

`/plugin marketplace add anthropics/life-sciences`

`/plugin install instrument-data-to-allotrope@life-sciences`

‍