# How to use the Prior Auth Review sample skill with Claude

## What is the Prior Auth Review sample skill?

The Prior Authorization skill is a sample skill that digests request packet documentation and performs several initial checks to be verified by a human reviewer.  These include:

*   NPI Physician Registry
*   ICD-10 Lookup
*   CMS Coverage Database
*   CPT Codes

It then extracts clinical data to summarize the argument for medical necessity and confirms all the required documentation is present.

This is a sample skill that gives you a starting point to customize for your own use cases. Be sure to review the README.md file before using the skill.

## Who should use the Prior Auth Review sample skill?

This skill is designed for payer clinical reviewers who need to significantly reduce the time to initial recommendation without writing code from scratch.

## How to access the skill in Claude.ai

**For Organization Owners (Team and Enterprise)**

1.  Download the ZIP for the **prior-auth-review-skill** here
2.  Review the sample skill thoroughly and make edits and adjustments to fit your organization’s workflows
3.  From Claude.ai, navigate to Admin settings > Capabilities > Skills
4.  Make sure Skills is activated for your organization
5.  Click “Organization skills library”
6.  Click “+Add”
7.  Upload the skill zip file

Learn about provisioning and managing skills for your organization

**For Individual Claude Users**

1.  Download the ZIP file for the **prior-auth-review-skill** here
2.  Review the sample skill thoroughly and make edits and adjustments to fit your workflow
3.  From Claude.ai, navigate to Settings > Capabilities > Skills (if Skills is not available, contact your team admin)
4.  Click “Upload skill”
5.  Upload the skill zip file

## How to access the skill in Claude Code

Command 

`/plugin marketplace add anthropics/healthcare`

`/plugin install prior-auth-review@healthcare`