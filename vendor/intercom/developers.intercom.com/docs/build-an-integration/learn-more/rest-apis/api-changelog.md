# About the API Changelogs

Below you can find links to changelogs that detail changes to the API from each version. You can also see our definition of a breaking change.

To access new features, you'll need to [change your API version in the Developer Hub](/docs/build-an-integration/learn-more/rest-apis/update-your-api-version#selecting-the-version-via-the-developer-hub) or [set a version in the header](/docs/build-an-integration/learn-more/rest-apis/update-your-api-version#can-i-set-the-header-version-and-the-version-in-the-app) of your API call.

## Changelogs

| Changelog | Release date | Docs |
|  --- | --- | --- |
| [Unversioned changes](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) | Ongoing | [Reference](/docs/build-an-integration/learn-more/rest-apis/unversioned-changes) |
| [Preview](/docs/references/preview/changelog) | Ongoing | [Reference](/docs/references/preview/introduction) |
| [2.15](/docs/references/changelog) | 2026-02-10 | [Reference](/docs/references/introduction) |
| [2.14](/docs/references/2.14/changelog) | 2025-08-15 | [Reference](/docs/references/2.14/introduction) |
| [2.13](/docs/references/2.13/changelog) | 2024-03-13 | [Reference](/docs/references/2.13/introduction) |
| [2.12](/docs/references/2.12/changelog) | 2024-01-07 | [Reference](/docs/references/2.12/introduction) |
| [2.11](/docs/references/2.11/changelog) | 2024-05-03 | [Reference](/docs/references/2.11/introduction) |
| [2.10](/docs/references/2.10/changelog) | 2023-09-14 | [Reference](/docs/references/2.10/introduction) |
| [2.9](/docs/references/2.9/changelog) | 2023-01-24 | [Reference](/docs/references/2.9/introduction) |
| [2.8](/docs/references/2.8/changelog) | 2023-01-24 | [Reference](/docs/references/2.8/introduction) |
| [2.7](/docs/references/2.7/changelog) | 2022-12-07 | [Reference](/docs/references/2.7/introduction) |
| [2.6](/docs/references/2.6/changelog) | 2022-10-18 | [Reference](/docs/references/2.6/introduction) |
| [2.5](/docs/references/2.5/changelog) | 2022-06-07 | [Reference](/docs/references/2.5/introduction) |
| [2.4](/docs/references/2.4/changelog) | 2021-12-13 | [Reference](/docs/references/2.4/introduction) |
| [2.3](/docs/references/2.3/changelog) | 2020-11-12 | [Reference](/docs/references/2.3/introduction) |
| [2.2](/docs/references/2.2/changelog) | 2020-08-12 | [Reference](/docs/references/2.2/introduction) |
| [2.1](/docs/references/2.1/changelog) | 2020-07-14 | [Reference](/docs/references/2.1/introduction) |
| [2.0](/docs/references/2.0/changelog) | 2020-01-30 | [Reference](/docs/references/2.0/introduction) |
| [1.4](/docs/references/1.4/changelog) | 2019-09-26 | [Reference](/docs/references/1.4/introduction) |
| [1.3](/docs/references/1.3/changelog) | 2019-06-05 | [Reference](/docs/references/1.3/introduction) |
| [1.2](/docs/references/1.2/changelog) | 2019-05-03 | [Reference](/docs/references/1.2/introduction) |
| [1.1](/docs/references/1.1/changelog) | 2018-10-16 | [Reference](/docs/references/1.1/introduction) |
| [1.0](/docs/references/1.0/changelog) | 2018-10-15 | [Reference](/docs/references/1.0/introduction) |


## About breaking changes in the Intercom API

The Intercom API is a versioned API. The version number increments by `0.1` each release, unless we introduce major new functionality, in which case we will increment by `1`. We do not follow [Semantic Versioning](https://semver.org).

Any breaking changes will be released in a new API version. Breaking changes are changes that can potentially break an integration. Breaking changes can include:

- removing an entire operation
- removing or renaming a parameter
- removing or renaming a response field
- adding a new required parameter
- making a previously optional parameter required
- changing the type of a parameter or response field
- removing enum values
- adding a new validation rule to an existing parameter
- changing authentication or authorization requirements