# How to use the Clinical Trial Protocol Draft Generation sample skill with Claude

## What is the Clinical Trial Protocol Draft Generation demo skill?

The Clinical Trial Protocol Draft Generation demo skill digests initial documentation about a new medical device or investigational drug, and follows regulatory guidelines to generate an initial phase 2 or 3 trial protocol draft.  It does this by:

1.  Searching for relevant FDA guidances to determine classification & pathway
2.  Reviews OpenFDA and ClinicalTrials.gov for predicate devices and similar trials
3.  Uses a statistically significant sample size calculator to the determine treatment arm
4.  Drafts an initial full protocol following the formal FDA/NIH template for IND & IVD protocols

This is a sample skill that gives you a starting point to customize for your own use cases. Be sure to review the README.md file before using the skill.

‍

## Who should use the Clinical Trial Protocol Draft Generation demo skill?

This skill is designed for regulatory affairs professionals at pharmaceutical and medical device companies who need to draft clinical trial protocols and determine their regulatory pathway without writing code from scratch.

‍

## How to access the skill in Claude.ai

**For Organization Owners (Team and Enterprise)**

1.  Download the ZIP for the  **clinical-trial-protocol-skill** here‍
2.  Review the sample skill thoroughly and make edits and adjustments to fit your organization’s workflows
3.  From Claude.ai, navigate to Admin settings > Capabilities > Skills
4.  Make sure Skills is activated for your organization
5.  Click “Organization skills library”
6.  Click “+Add”
7.  Upload the skill zip file

Learn about provisioning and managing skills for your organization

**For Individual Claude Users**

1.  Download the ZIP file for **clinical-trial-protocol-skill** here
2.  Review the sample skill thoroughly and make edits and adjustments to fit your workflow
3.  From Claude.ai, navigate to Settings > Capabilities > Skills (if Skills is not available, contact your team admin)
4.  Click “Upload skill”
5.  Upload the skill zip file

## How to access the skill in Claude Code

Command 

`/plugin marketplace add anthropics/life-sciences`

`/plugin install clinical-trial-protocol@life-sciences`
