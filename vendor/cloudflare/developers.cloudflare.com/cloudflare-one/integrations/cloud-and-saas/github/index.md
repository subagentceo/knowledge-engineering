---
title: GitHub
description: Reference information for GitHub in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# GitHub

The GitHub integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated GitHub Organization that could leave you and your organization vulnerable.

## Integration prerequisites

* A GitHub account with a Free, Pro, or Enterprise plan
* Membership to a GitHub Organization with Owner or GitHub App manager permissions

## Integration permissions

For the GitHub integration to function, Cloudflare CASB requires the following GitHub API permissions:

| Permission                  | Access    | Description                                                                                             |
| --------------------------- | --------- | ------------------------------------------------------------------------------------------------------- |
| Administration              | Read-only | View basic administrative information from the account.                                                 |
| Members                     | Read-only | View metadata on organization members                                                                   |
| Metadata                    | Read-only | View metadata surrounding an organization's assets, excluding sensitive private repository information. |
| Organization administration | Read-only | View information on organization settings                                                               |

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [GitHub App permissions reference ↗](https://docs.github.com/en/rest/overview/permissions-required-for-github-apps).

## Security findings

The GitHub integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/github.mdx.atom).

### Branches and merges

| Finding type                                                                           | FindingTypeID                        | Severity | Description                                                                                                              |
| -------------------------------------------------------------------------------------- | ------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| GitHub: Repository has no Default Branch Protection                                    | 5a0428fa-5c13-44b8-a028-9351c1d10a91 | Medium   | A repository's default branch does not have any branch protection rules enabled.                                         |
| GitHub: Repository Default Branch Protection does not have PR Review Required          | edd3f193-af01-421d-9a50-cb1d147bf3a6 | Medium   | A repository's default branch does not have a **Require pull request reviews before merging** rule.                      |
| GitHub: Repository Default Branch Protection does not have Force Pushes Disabled       | efc3e582-ef39-4316-b1f3-d4717ef30867 | Medium   | A repository's default branch has enabled **Allow force pushes**.                                                        |
| GitHub: Repository Default Branch Protection does not have Stale PR Approvals Disabled | 7dc170d7-b1ef-4138-95fb-403d16e7ed43 | Medium   | A repository's default branch does not have a **Dismiss stale pull request approvals when new commits are pushed** rule. |
| GitHub: Repository Default Branch Protection does not have Admin Restrictions          | 4e4aec5b-e763-41ac-9099-af874606959b | Medium   | A repository's default branch does not have a **Do not allow bypassing the above settings** rule for administrators.     |
| GitHub: Repository Default Branch Protection does not have Status Checks               | 1eba1aeb-9827-4a03-9c47-8290bd3a83d5 | Medium   | A repository's default branch does not have a **Require status checks to pass before merging** rule.                     |
| GitHub: Organization repository has default WRITE permission                           | fc074da0-1e1c-4982-8673-0852d70bf80c | Medium   | A repository's default write protection settings were not changed.                                                       |
| GitHub: Repository not updated in 12+ months                                           | 68b6ef6d-7e00-4761-b3f1-fcf323dc9c26 | Medium   | No changes were made to a repository in at least a year.                                                                 |

Learn more about [GitHub branch protection rules ↗](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule).

### User accounts

| Finding type                                                 | FindingTypeID                        | Severity | Description                                                                                              |
| ------------------------------------------------------------ | ------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------- |
| GitHub: Organization two-factor authentication disabled      | 47d01030-0ed8-496d-9484-f77899b21d59 | High     | An organization does not have its organization-wide two-factor authentication (2FA) requirement enabled. |
| GitHub: Organization user two-factor authentication disabled | dfed92b2-a45e-46ed-a86b-8c7e3db01f3c | High     | A member of the organization does not have two-factor authentication (2FA) enabled.                      |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/github/#page","headline":"GitHub - CASB · Cloudflare One docs","description":"Reference information for GitHub in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/github/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GitHub"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/github/","name":"GitHub"}}]}
```
