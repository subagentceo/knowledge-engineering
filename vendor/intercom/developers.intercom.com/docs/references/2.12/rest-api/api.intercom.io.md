# Intercom API

The Intercom API reference.

Version: 2.12
License: MIT

## Servers

The production API server
```
https://api.intercom.io
```

The european API server
```
https://api.eu.intercom.io
```

The australian API server
```
https://api.au.intercom.io
```

## Security

### bearerAuth

Type: http
Scheme: bearer

## Download OpenAPI description

[Intercom API](https://developers.intercom.com/_bundle/docs/references/@2.12/rest-api/api.intercom.io.yaml)

## Admins

Everything about your Admins

### Identify an admin

 - [GET /me](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/admins/identifyadmin.md): You can view the currently authorised admin along with the embedded app object (a "workspace" in legacy terminology).

> 🚧 Single Sign On
>
> If you are building a custom "Log in with Intercom" flow for your site, and you call the /me endpoint to identify the logged-in user, you should not accept any sign-ins from users with unverified email addresses as it poses a potential impersonation security risk.

### Set an admin to away

 - [PUT /admins/{id}/away](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/admins/setawayadmin.md): You can set an Admin as away for the Inbox.

### List all activity logs

 - [GET /admins/activity_logs](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/admins/listactivitylogs.md): You can get a log of activities by all admins in an app.

### List all admins

 - [GET /admins](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/admins/listadmins.md): You can fetch a list of admins for a given workspace.

### Retrieve an admin

 - [GET /admins/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/admins/retrieveadmin.md): You can retrieve the details of a single admin.

## AI Content

With the AI Content APIs, you can create and manage External Pages and Content Import Sources for your Fin Content Library.

&nbsp;

*External Pages* are pages that you want Fin to be able to answer questions about. The API for External Pages is a great way to ingest into your Fin Content Library pages that are not publicly accessible and hence can't be crawled by Intercom.

&nbsp;

*Content Import Sources* are the sources of those pages, and they are used to determine the default audience for the pages (configured via the UI). You should create a Content Import Source for each source of External Pages that you want to ingest into your Fin Content Library.

&nbsp;

You can then iterate through the content from that source via its API and POST it to the External Pages endpoint. That endpoint has an *external_id* parameter which allows you to specify the identifier from the source. The endpoint will then either create a new External Page or update an existing one as appropriate.",


### List content import sources

 - [GET /ai/content_import_sources](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ai-content/listcontentimportsources.md): You can retrieve a list of all content import sources for a workspace.

### Create a content import source

 - [POST /ai/content_import_sources](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ai-content/createcontentimportsource.md): You can create a new content import source by sending a POST request to this endpoint.

### Delete a content import source

 - [DELETE /ai/content_import_sources/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ai-content/deletecontentimportsource.md): You can delete a content import source by making a DELETE request this endpoint. This will also delete all external pages that were imported from this source.

### Retrieve a content import source

 - [GET /ai/content_import_sources/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ai-content/getcontentimportsource.md)

### Update a content import source

 - [PUT /ai/content_import_sources/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ai-content/updatecontentimportsource.md): You can update an existing content import source.

### List external pages

 - [GET /ai/external_pages](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ai-content/listexternalpages.md): You can retrieve a list of all external pages for a workspace.

### Create an external page (or update an external page by external ID)

 - [POST /ai/external_pages](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ai-content/createexternalpage.md): You can create a new external page by sending a POST request to this endpoint. If an external page already exists with the specified source_id and external_id, it will be updated instead.

### Delete an external page

 - [DELETE /ai/external_pages/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ai-content/deleteexternalpage.md): Sending a DELETE request for an external page will remove it from the content library UI and from being used for AI answers.

### Retrieve an external page

 - [GET /ai/external_pages/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ai-content/getexternalpage.md): You can retrieve an external page.

### Update an external page

 - [PUT /ai/external_pages/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ai-content/updateexternalpage.md): You can update an existing external page (if it was created via the API).

## Articles

Everything about your Articles

### List all articles

 - [GET /articles](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/articles/listarticles.md): You can fetch a list of all articles by making a GET request to https://api.intercom.io/articles.

> 📘 How are the articles sorted and ordered?
>
> Articles will be returned in descending order on the updated_at attribute. This means if you need to iterate through results then we'll show the most recently updated articles first.

### Create an article

 - [POST /articles](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/articles/createarticle.md): You can create a new article by making a POST request to https://api.intercom.io/articles.

### Retrieve an article

 - [GET /articles/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/articles/retrievearticle.md): You can fetch the details of a single article by making a GET request to https://api.intercom.io/articles/.

### Update an article

 - [PUT /articles/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/articles/updatearticle.md): You can update the details of a single article by making a PUT request to https://api.intercom.io/articles/.

### Delete an article

 - [DELETE /articles/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/articles/deletearticle.md): You can delete a single article by making a DELETE request to https://api.intercom.io/articles/.

### Search for articles

 - [GET /articles/search](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/articles/searcharticles.md): You can search for articles by making a GET request to https://api.intercom.io/articles/search.

## Companies

Everything about your Companies

### Create or Update a company

 - [POST /companies](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/createorupdatecompany.md): You can create or update a company.

Companies will be only visible in Intercom when there is at least one associated user.

Companies are looked up via company_id in a POST request, if not found via company_id, the new company will be created, if found, that company will be updated.

{% admonition type="warning" name="Using company_id" %}
  You can set a unique company_id value when creating a company. However, it is not possible to update company_id. Be sure to set a unique value once upon creation of the company.
{% /admonition %}

### Retrieve companies

 - [GET /companies](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/retrievecompany.md): You can fetch a single company by passing in company_id or name.

  https://api.intercom.io/companies?name={name}

  https://api.intercom.io/companies?company_id={company_id}

You can fetch all companies and filter by segment_id or tag_id as a query parameter.

  https://api.intercom.io/companies?tag_id={tag_id}

  https://api.intercom.io/companies?segment_id={segment_id}

### Retrieve a company by ID

 - [GET /companies/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/retrieveacompanybyid.md): You can fetch a single company.

### Update a company

 - [PUT /companies/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/updatecompany.md): You can update a single company using the Intercom provisioned id.

{% admonition type="warning" name="Using company_id" %}
  When updating a company it is not possible to update company_id. This can only be set once upon creation of the company.
{% /admonition %}

### Delete a company

 - [DELETE /companies/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/deletecompany.md): Delete a single company.

This endpoint does not permanently remove the company. It archives the company record and detaches any contacts attached to it; the contacts themselves are not deleted. A company.deleted webhook is sent once archival completes.

The endpoint returns 200 with "deleted": true as soon as the request is accepted — archival is processed asynchronously.

{% admonition type="warning" %}
Third-party integrations that sync companies into Intercom (for example, Salesforce or Chargebee) will recreate any company deleted through this endpoint on their next sync. To prevent recreation, remove or filter the company at the source integration before deleting it via the API.
{% /admonition %}

### List attached contacts

 - [GET /companies/{id}/contacts](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/listattachedcontacts.md): You can fetch a list of all contacts that belong to a company.

### List attached segments for companies

 - [GET /companies/{id}/segments](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/listattachedsegmentsforcompanies.md): You can fetch a list of all segments that belong to a company.

### List all companies

 - [POST /companies/list](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/listallcompanies.md): You can list companies. The company list is sorted by the last_request_at field and by default is ordered descending, most recently requested first.

Note that the API does not include companies who have no associated users in list responses.

When using the Companies endpoint and the pages object to iterate through the returned companies, there is a limit of 10,000 Companies that can be returned. If you need to list or iterate on more than 10,000 Companies, please use the Scroll API.
{% admonition type="warning" name="Pagination" %}
  You can use pagination to limit the number of results returned. The default is 20 results per page.
  See the pagination section for more details on how to use the starting_after param.
{% /admonition %}

### Scroll over all companies

 - [GET /companies/scroll](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/scrolloverallcompanies.md): The list all companies functionality does not work well for huge datasets, and can result in errors and performance problems when paging deeply. The Scroll API provides an efficient mechanism for iterating over all companies in a dataset.

- Each app can only have 1 scroll open at a time. You'll get an error message if you try to have more than one open per app.
- If the scroll isn't used for 1 minute, it expires and calls with that scroll param will fail
- If the end of the scroll is reached, "companies" will be empty and the scroll parameter will expire

{% admonition type="info" name="Scroll Parameter" %}
  You can get the first page of companies by simply sending a GET request to the scroll endpoint.
  For subsequent requests you will need to use the scroll parameter from the response.
{% /admonition %}
{% admonition type="danger" name="Scroll network timeouts" %}
  Since scroll is often used on large datasets network errors such as timeouts can be encountered. When this occurs you will see a HTTP 500 error with the following message:
  "Request failed due to an internal network error. Please restart the scroll operation."
  If this happens, you will need to restart your scroll query: It is not possible to continue from a specific point when using scroll.
{% /admonition %}

### Attach a Contact to a Company

 - [POST /contacts/{id}/companies](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/attachcontacttoacompany.md): You can attach a company to a single contact.

### List attached companies for contact

 - [GET /contacts/{id}/companies](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/listcompaniesforacontact.md): You can fetch a list of companies that are associated to a contact.

### Detach a contact from a company

 - [DELETE /contacts/{contact_id}/companies/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/detachcontactfromacompany.md): You can detach a company from a single contact.

### List attached contacts

 - [GET /companies/{id}/contacts](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listattachedcontacts.md): You can fetch a list of all contacts that belong to a company.

### Attach a Contact to a Company

 - [POST /contacts/{id}/companies](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/attachcontacttoacompany.md): You can attach a company to a single contact.

### List attached companies for contact

 - [GET /contacts/{id}/companies](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listcompaniesforacontact.md): You can fetch a list of companies that are associated to a contact.

### Detach a contact from a company

 - [DELETE /contacts/{contact_id}/companies/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/detachcontactfromacompany.md): You can detach a company from a single contact.

## Contacts

Everything about your contacts

### List attached contacts

 - [GET /companies/{id}/contacts](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/listattachedcontacts.md): You can fetch a list of all contacts that belong to a company.

### Attach a Contact to a Company

 - [POST /contacts/{id}/companies](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/attachcontacttoacompany.md): You can attach a company to a single contact.

### List attached companies for contact

 - [GET /contacts/{id}/companies](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/listcompaniesforacontact.md): You can fetch a list of companies that are associated to a contact.

### Detach a contact from a company

 - [DELETE /contacts/{contact_id}/companies/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/companies/detachcontactfromacompany.md): You can detach a company from a single contact.

### List attached contacts

 - [GET /companies/{id}/contacts](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listattachedcontacts.md): You can fetch a list of all contacts that belong to a company.

### Attach a Contact to a Company

 - [POST /contacts/{id}/companies](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/attachcontacttoacompany.md): You can attach a company to a single contact.

### List attached companies for contact

 - [GET /contacts/{id}/companies](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listcompaniesforacontact.md): You can fetch a list of companies that are associated to a contact.

### Detach a contact from a company

 - [DELETE /contacts/{contact_id}/companies/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/detachcontactfromacompany.md): You can detach a company from a single contact.

### List all notes

 - [GET /contacts/{id}/notes](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listnotes.md): You can fetch a list of notes that are associated to a contact.

### Create a note

 - [POST /contacts/{id}/notes](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/createnote.md): You can add a note to a single contact.

### List attached segments for contact

 - [GET /contacts/{contact_id}/segments](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listsegmentsforacontact.md): You can fetch a list of segments that are associated to a contact.

### List subscriptions for a contact

 - [GET /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listsubscriptionsforacontact.md): You can fetch a list of subscription types that are attached to a contact. These can be subscriptions that a user has 'opted-in' to or has 'opted-out' from, depending on the subscription type.
This will return a list of Subscription Type objects that the contact is associated with.

The data property will show a combined list of:

  1.Opt-out subscription types that the user has opted-out from.
  2.Opt-in subscription types that the user has opted-in to receiving.

### Add subscription to a contact

 - [POST /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/attachsubscriptiontypetocontact.md): You can add a specific subscription to a contact. In Intercom, we have two different subscription types based on user consent - opt-out and opt-in:

  1.Attaching a contact to an opt-out subscription type will opt that user out from receiving messages related to that subscription type.

  2.Attaching a contact to an opt-in subscription type will opt that user in to receiving messages related to that subscription type.

This will return a subscription type model for the subscription type that was added to the contact.

### Remove subscription from a contact

 - [DELETE /contacts/{contact_id}/subscriptions/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/detachsubscriptiontypetocontact.md): You can remove a specific subscription from a contact. This will return a subscription type model for the subscription type that was removed from the contact.

### List tags attached to a contact

 - [GET /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listtagsforacontact.md): You can fetch a list of all tags that are attached to a specific contact.

### Add tag to a contact

 - [POST /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/attachtagtocontact.md): You can tag a specific contact. This will return a tag object for the tag that was added to the contact.

### Remove tag from a contact

 - [DELETE /contacts/{contact_id}/tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/detachtagfromcontact.md): You can remove tag from a specific contact. This will return a tag object for the tag that was removed from the contact.

### Update a contact

 - [PUT /contacts/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/updatecontact.md): You can update an existing contact (ie. user or lead).

### Get a contact

 - [GET /contacts/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/showcontact.md): You can fetch the details of a single contact.

{% admonition type="warning" name="Merged contacts" %}
  If a contact has been merged into another contact via the Merge endpoint (POST /contacts/merge), requesting it by its original ID will return a 404 Not Found error. Use the merged-into contact's ID instead.
{% /admonition %}

### Delete a contact

 - [DELETE /contacts/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/deletecontact.md): You can delete a single contact.

### Merge a lead and a user

 - [POST /contacts/merge](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/mergecontact.md): You can merge a contact with a role of lead into a contact with a role of user.

{% admonition type="warning" name="Merged contacts are not retrievable via the API" %}
  Once a merge is completed, the source contact (from) is permanently removed from the active contact list. This means:
  - GET /contacts/{id} — Requesting the source contact by its original ID will return a 404 Not Found error.
  - POST /contacts/search — The source contact will not appear in search results, including queries filtered by updated_at.
  - GET /contacts — The source contact will not appear in list results.

  Only the target contact (into) remains accessible. If your application stores contact IDs, update them to use the target contact's ID after a merge.
{% /admonition %}

### Search contacts

 - [POST /contacts/search](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/searchcontacts.md): You can search for multiple contacts by the value of their attributes in order to fetch exactly who you want.

To search for contacts, you need to send a POST request to https://api.intercom.io/contacts/search.

This will accept a query object in the body which will define your filters in order to search for contacts.

{% admonition type="warning" name="Optimizing search queries" %}
  Search queries can be complex, so optimizing them can help the performance of your search.
  Use the AND and OR operators to combine multiple filters to get the exact results you need and utilize
  pagination to limit the number of results returned. The default is 50 results per page.
  See the pagination section for more details on how to use the starting_after param.
{% /admonition %}
### Merged Contacts

Contacts that have been merged (via POST /contacts/merge) are excluded from search results. If a contact was recently merged into another, it will no longer appear in queries filtered by updated_at or any other field. Only the target contact from the merge remains searchable.

### Contact Creation Delay

If a contact has recently been created, there is a possibility that it will not yet be available when searching. This means that it may not appear in the response. This delay can take a few minutes. If you need to be instantly notified it is recommended to use webhooks and iterate to see if they match your search filters.

### Nesting & Limitations

You can nest these filters in order to get even more granular insights that pinpoint exactly what you need. Example: (1 OR 2) AND (3 OR 4).
There are some limitations to the amount of multiple's there can be:
* There's a limit of max 2 nested filters
* There's a limit of max 15 filters for each AND or OR group

### Searching for Timestamp Fields

All timestamp fields (created_at, updated_at etc.) are indexed as Dates for Contact Search queries; Datetime queries are not currently supported. This means you can only query for timestamp fields by day - not hour, minute or second.
For example, if you search for all Contacts with a created_at value greater (>) than 1577869200 (the Unix timestamp for January 1st, 2020 9:00 AM), that will be interpreted as 1577836800 (January 1st, 2020 12:00 AM). The search results will then include Contacts created from January 2nd, 2020 12:00 AM onwards.
If you'd like to get contacts created on January 1st, 2020 you should search with a created_at value equal (=) to 1577836800 (January 1st, 2020 12:00 AM).
This behaviour applies only to timestamps used in search queries. The search results will still contain the full Unix timestamp and be sorted accordingly.

### Accepted Fields

Most key listed as part of the Contacts Model are searchable, whether writeable or not. The value you search for has to match the accepted type, otherwise the query will fail (ie. as created_at accepts a date, the value cannot be a string such as "foorbar").

| Field                              | Type                           |
| ---------------------------------- | ------------------------------ |
| id                                 | String                         |
| role                               | StringAccepts user or lead |
| name                               | String                         |
| avatar                             | String                         |
| owner_id                           | Integer                        |
| email                              | String                         |
| email_domain                       | String                         |
| phone                              | String                         |
| external_id                        | String                         |
| created_at                         | Date (Unix timestamp in seconds)          |
| signed_up_at                       | Date (Unix timestamp in seconds)          |
| updated_at                         | Date (Unix timestamp in seconds)          |
| last_seen_at                       | Date (Unix timestamp in seconds)          |
| last_contacted_at                  | Date (Unix timestamp in seconds)          |
| last_replied_at                    | Date (Unix timestamp in seconds)          |
| last_email_opened_at               | Date (Unix timestamp in seconds)          |
| last_email_clicked_at              | Date (Unix timestamp in seconds)          |
| language_override                  | String                         |
| browser                            | String                         |
| browser_language                   | String                         |
| os                                 | String                         |
| location.country                   | String                         |
| location.region                    | String                         |
| location.city                      | String                         |
| unsubscribed_from_emails           | Boolean                        |
| marked_email_as_spam               | Boolean                        |
| has_hard_bounced                   | Boolean                        |
| ios_last_seen_at                   | Date (Unix timestamp in seconds)          |
| ios_app_version                    | String                         |
| ios_device                         | String                         |
| ios_app_device                     | String                         |
| ios_os_version                     | String                         |
| ios_app_name                       | String                         |
| ios_sdk_version                    | String                         |
| android_last_seen_at               | Date (Unix timestamp in seconds)          |
| android_app_version                | String                         |
| android_device                     | String                         |
| android_app_name                   | String                         |
| andoid_sdk_version                 | String                         |
| segment_id                         | String                         |
| tag_id                             | String                         |
| custom_attributes.{attribute_name} | String                         |

### Accepted Operators

{% admonition type="warning" name="Searching based on created_at" %}
  You cannot use the = operators to search by created_at.
{% /admonition %}

The table below shows the operators you can use to define how you want to search for the value.  The operator should be put in as a string ("="). The operator has to be compatible with the field's type (eg. you cannot search with > for a given string value as it's only compatible for integer's and dates).

| Operator | Valid Types                      | Description                                                      |
| :------- | :------------------------------- | :--------------------------------------------------------------- |
| =        | All                              | Equals                                                           |
| !=       | All                              | Doesn't Equal                                                    |
| IN       | All                              | InShortcut for OR queriesValues must be in Array       |
| NIN      | All                              | Not InShortcut for OR ! queriesValues must be in Array |
| >        | IntegerDate (Unix timestamp in seconds) | Greater than                                                     |
| Date (Unix timestamp in seconds) | Lower than                                                       |
| ~        | String                           | Contains                                                         |
| !~       | String                           | Doesn't Contain                                                  |
| ^        | String                           | Starts With                                                      |
| $        | String                           | Ends With                                                        |

### List all contacts

 - [GET /contacts](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listcontacts.md): You can fetch a list of all contacts (ie. users or leads) in your workspace.
{% admonition type="info" name="Merged contacts" %}
  Contacts that have been merged (via POST /contacts/merge) will not appear in list results. Only the target contact from the merge remains accessible.
{% /admonition %}
{% admonition type="warning" name="Pagination" %}
  You can use pagination to limit the number of results returned. The default is 50 results per page.
  See the pagination section for more details on how to use the starting_after param.
{% /admonition %}

### Create contact

 - [POST /contacts](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/createcontact.md): You can create a new contact (ie. user or lead).

### Archive contact

 - [POST /contacts/{id}/archive](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/archivecontact.md): You can archive a single contact.

### Unarchive contact

 - [POST /contacts/{id}/unarchive](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/unarchivecontact.md): You can unarchive a single contact.

### List all notes

 - [GET /contacts/{id}/notes](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/notes/listnotes.md): You can fetch a list of notes that are associated to a contact.

### Create a note

 - [POST /contacts/{id}/notes](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/notes/createnote.md): You can add a note to a single contact.

### List attached segments for contact

 - [GET /contacts/{contact_id}/segments](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/segments/listsegmentsforacontact.md): You can fetch a list of segments that are associated to a contact.

### List subscriptions for a contact

 - [GET /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/subscription-types/listsubscriptionsforacontact.md): You can fetch a list of subscription types that are attached to a contact. These can be subscriptions that a user has 'opted-in' to or has 'opted-out' from, depending on the subscription type.
This will return a list of Subscription Type objects that the contact is associated with.

The data property will show a combined list of:

  1.Opt-out subscription types that the user has opted-out from.
  2.Opt-in subscription types that the user has opted-in to receiving.

### Add subscription to a contact

 - [POST /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/subscription-types/attachsubscriptiontypetocontact.md): You can add a specific subscription to a contact. In Intercom, we have two different subscription types based on user consent - opt-out and opt-in:

  1.Attaching a contact to an opt-out subscription type will opt that user out from receiving messages related to that subscription type.

  2.Attaching a contact to an opt-in subscription type will opt that user in to receiving messages related to that subscription type.

This will return a subscription type model for the subscription type that was added to the contact.

### Remove subscription from a contact

 - [DELETE /contacts/{contact_id}/subscriptions/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/subscription-types/detachsubscriptiontypetocontact.md): You can remove a specific subscription from a contact. This will return a subscription type model for the subscription type that was removed from the contact.

### List tags attached to a contact

 - [GET /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/listtagsforacontact.md): You can fetch a list of all tags that are attached to a specific contact.

### Add tag to a contact

 - [POST /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/attachtagtocontact.md): You can tag a specific contact. This will return a tag object for the tag that was added to the contact.

### Remove tag from a contact

 - [DELETE /contacts/{contact_id}/tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/detachtagfromcontact.md): You can remove tag from a specific contact. This will return a tag object for the tag that was removed from the contact.

## Notes

Everything about your Notes

### List all notes

 - [GET /contacts/{id}/notes](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listnotes.md): You can fetch a list of notes that are associated to a contact.

### Create a note

 - [POST /contacts/{id}/notes](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/createnote.md): You can add a note to a single contact.

### List all notes

 - [GET /contacts/{id}/notes](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/notes/listnotes.md): You can fetch a list of notes that are associated to a contact.

### Create a note

 - [POST /contacts/{id}/notes](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/notes/createnote.md): You can add a note to a single contact.

### Retrieve a note

 - [GET /notes/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/notes/retrievenote.md): You can fetch the details of a single note.

## Segments

Everything about your Segments

### List attached segments for contact

 - [GET /contacts/{contact_id}/segments](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listsegmentsforacontact.md): You can fetch a list of segments that are associated to a contact.

### List attached segments for contact

 - [GET /contacts/{contact_id}/segments](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/segments/listsegmentsforacontact.md): You can fetch a list of segments that are associated to a contact.

### List all segments

 - [GET /segments](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/segments/listsegments.md): You can fetch a list of all segments.

### Retrieve a segment

 - [GET /segments/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/segments/retrievesegment.md): You can fetch the details of a single segment.

## Subscription Types

Everything about subscription types

### List subscriptions for a contact

 - [GET /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listsubscriptionsforacontact.md): You can fetch a list of subscription types that are attached to a contact. These can be subscriptions that a user has 'opted-in' to or has 'opted-out' from, depending on the subscription type.
This will return a list of Subscription Type objects that the contact is associated with.

The data property will show a combined list of:

  1.Opt-out subscription types that the user has opted-out from.
  2.Opt-in subscription types that the user has opted-in to receiving.

### Add subscription to a contact

 - [POST /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/attachsubscriptiontypetocontact.md): You can add a specific subscription to a contact. In Intercom, we have two different subscription types based on user consent - opt-out and opt-in:

  1.Attaching a contact to an opt-out subscription type will opt that user out from receiving messages related to that subscription type.

  2.Attaching a contact to an opt-in subscription type will opt that user in to receiving messages related to that subscription type.

This will return a subscription type model for the subscription type that was added to the contact.

### Remove subscription from a contact

 - [DELETE /contacts/{contact_id}/subscriptions/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/detachsubscriptiontypetocontact.md): You can remove a specific subscription from a contact. This will return a subscription type model for the subscription type that was removed from the contact.

### List subscriptions for a contact

 - [GET /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/subscription-types/listsubscriptionsforacontact.md): You can fetch a list of subscription types that are attached to a contact. These can be subscriptions that a user has 'opted-in' to or has 'opted-out' from, depending on the subscription type.
This will return a list of Subscription Type objects that the contact is associated with.

The data property will show a combined list of:

  1.Opt-out subscription types that the user has opted-out from.
  2.Opt-in subscription types that the user has opted-in to receiving.

### Add subscription to a contact

 - [POST /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/subscription-types/attachsubscriptiontypetocontact.md): You can add a specific subscription to a contact. In Intercom, we have two different subscription types based on user consent - opt-out and opt-in:

  1.Attaching a contact to an opt-out subscription type will opt that user out from receiving messages related to that subscription type.

  2.Attaching a contact to an opt-in subscription type will opt that user in to receiving messages related to that subscription type.

This will return a subscription type model for the subscription type that was added to the contact.

### Remove subscription from a contact

 - [DELETE /contacts/{contact_id}/subscriptions/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/subscription-types/detachsubscriptiontypetocontact.md): You can remove a specific subscription from a contact. This will return a subscription type model for the subscription type that was removed from the contact.

### List subscription types

 - [GET /subscription_types](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/subscription-types/listsubscriptiontypes.md): You can list all subscription types. A list of subscription type objects will be returned.

## Tags

Everything about tags

### List tags attached to a contact

 - [GET /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/listtagsforacontact.md): You can fetch a list of all tags that are attached to a specific contact.

### Add tag to a contact

 - [POST /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/attachtagtocontact.md): You can tag a specific contact. This will return a tag object for the tag that was added to the contact.

### Remove tag from a contact

 - [DELETE /contacts/{contact_id}/tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/contacts/detachtagfromcontact.md): You can remove tag from a specific contact. This will return a tag object for the tag that was removed from the contact.

### Add tag to a conversation

 - [POST /conversations/{conversation_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/attachtagtoconversation.md): You can tag a specific conversation. This will return a tag object for the tag that was added to the conversation.

### Remove tag from a conversation

 - [DELETE /conversations/{conversation_id}/tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/detachtagfromconversation.md): You can remove tag from a specific conversation. This will return a tag object for the tag that was removed from the conversation.

### List tags attached to a contact

 - [GET /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/listtagsforacontact.md): You can fetch a list of all tags that are attached to a specific contact.

### Add tag to a contact

 - [POST /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/attachtagtocontact.md): You can tag a specific contact. This will return a tag object for the tag that was added to the contact.

### Remove tag from a contact

 - [DELETE /contacts/{contact_id}/tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/detachtagfromcontact.md): You can remove tag from a specific contact. This will return a tag object for the tag that was removed from the contact.

### Add tag to a conversation

 - [POST /conversations/{conversation_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/attachtagtoconversation.md): You can tag a specific conversation. This will return a tag object for the tag that was added to the conversation.

### Remove tag from a conversation

 - [DELETE /conversations/{conversation_id}/tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/detachtagfromconversation.md): You can remove tag from a specific conversation. This will return a tag object for the tag that was removed from the conversation.

### List all tags

 - [GET /tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/listtags.md): You can fetch a list of all tags for a given workspace.

### Create or update a tag, Tag or untag companies, Tag contacts

 - [POST /tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/createtag.md): You can use this endpoint to perform the following operations:

  1. Create a new tag: You can create a new tag by passing in the tag name as specified in "Create or Update Tag Request Payload" described below.

  2. Update an existing tag: You can update an existing tag by passing the id of the tag as specified in "Create or Update Tag Request Payload" described below.

  3. Tag Companies: You can tag single company or a list of companies. You can tag a company by passing in the tag name and the company details as specified in "Tag Company Request Payload" described below. Also, if the tag doesn't exist then a new one will be created automatically.

  4. Untag Companies: You can untag a single company or a list of companies. You can untag a company by passing in the tag id and the company details as specified in "Untag Company Request Payload" described below.

  5. Tag Multiple Users: You can tag a list of users. You can tag the users by passing in the tag name and the user details as specified in "Tag Users Request Payload" described below.

Each operation will return a tag object.

### Find a specific tag

 - [GET /tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/findtag.md): You can fetch the details of tags that are on the workspace by their id.
This will return a tag object.

### Delete tag

 - [DELETE /tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/deletetag.md): You can delete the details of tags that are on the workspace by passing in the id.

### Add tag to a ticket

 - [POST /tickets/{ticket_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/attachtagtoticket.md): You can tag a specific ticket. This will return a tag object for the tag that was added to the ticket.

### Remove tag from a ticket

 - [DELETE /tickets/{ticket_id}/tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/detachtagfromticket.md): You can remove tag from a specific ticket. This will return a tag object for the tag that was removed from the ticket.

### Add tag to a ticket

 - [POST /tickets/{ticket_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tickets/attachtagtoticket.md): You can tag a specific ticket. This will return a tag object for the tag that was added to the ticket.

### Remove tag from a ticket

 - [DELETE /tickets/{ticket_id}/tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tickets/detachtagfromticket.md): You can remove tag from a specific ticket. This will return a tag object for the tag that was removed from the ticket.

## Conversations

Everything about your Conversations

### Add tag to a conversation

 - [POST /conversations/{conversation_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/attachtagtoconversation.md): You can tag a specific conversation. This will return a tag object for the tag that was added to the conversation.

### Remove tag from a conversation

 - [DELETE /conversations/{conversation_id}/tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/detachtagfromconversation.md): You can remove tag from a specific conversation. This will return a tag object for the tag that was removed from the conversation.

### List all conversations

 - [GET /conversations](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/listconversations.md): You can fetch a list of all conversations.

You can optionally request the result page size and the cursor to start after to fetch the result.
{% admonition type="warning" name="Pagination" %}
  You can use pagination to limit the number of results returned. The default is 20 results per page.
  See the pagination section for more details on how to use the starting_after param.
{% /admonition %}

### Creates a conversation

 - [POST /conversations](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/createconversation.md): You can create a conversation that has been initiated by a contact (ie. user or lead).

{% admonition type="info" name="Sending for visitors" %}
You can also send a message from a visitor by specifying their user_id or id value in the from field, along with a type field value of contact.
This visitor will be automatically converted to a contact with a lead role once the conversation is created.
{% /admonition %}

This will return the Message model that has been created.

### Retrieve a conversation

 - [GET /conversations/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/retrieveconversation.md): You can fetch the details of a single conversation.

This will return a single Conversation model with all its conversation parts.

{% admonition type="warning" name="Hard limit of 500 parts" %}
The maximum number of conversation parts that can be returned via the API is 500. If you have more than that we will return the 500 most recent conversation parts.
{% /admonition %}

For AI agent conversation metadata, please note that you need to have the agent enabled in your workspace, which is a paid feature.

### Update a conversation

 - [PUT /conversations/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/updateconversation.md): You can update an existing conversation.

{% admonition type="info" name="Replying and other actions" %}
If you want to reply to a coveration or take an action such as assign, unassign, open, close or snooze, take a look at the reply and manage endpoints.
{% /admonition %}

{% admonition type="danger" name="Breaking change: duplicate custom attribute names" %}
The PUT /conversations/{id} endpoint now returns a 400 INVALID_PARAMETER error when the request includes custom_attributes and your workspace contains multiple non-archived conversation custom attributes with the same name. Previously, the update would silently apply to a non-deterministic attribute. To resolve, rename or archive the duplicate attribute in your workspace settings, then retry the request.
{% /admonition %}

### Search conversations

 - [POST /conversations/search](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/searchconversations.md): You can search for multiple conversations by the value of their attributes in order to fetch exactly which ones you want.

To search for conversations, you need to send a POST request to https://api.intercom.io/conversations/search.

This will accept a query object in the body which will define your filters in order to search for conversations.
{% admonition type="warning" name="Optimizing search queries" %}
  Search queries can be complex, so optimizing them can help the performance of your search.
  Use the AND and OR operators to combine multiple filters to get the exact results you need and utilize
  pagination to limit the number of results returned. The default is 20 results per page and maximum is 150.
  See the pagination section for more details on how to use the starting_after param.
{% /admonition %}

### Nesting & Limitations

You can nest these filters in order to get even more granular insights that pinpoint exactly what you need. Example: (1 OR 2) AND (3 OR 4).
There are some limitations to the amount of multiple's there can be:
- There's a limit of max 2 nested filters
- There's a limit of max 15 filters for each AND or OR group

### Accepted Fields

Most keys listed as part of the conversation model are searchable, whether writeable or not. The value you search for has to match the accepted type, otherwise the query will fail (ie. as created_at accepts a date, the value cannot be a string such as "foorbar").
The source.body field is unique as the search will not be performed against the entire value, but instead against every element of the value separately. For example, when searching for a conversation with a "I need support" body - the query should contain a = operator with the value "support" for such conversation to be returned. A query with a = operator and a "need support" value will not yield a result.

| Field                                     | Type                                                                                                                                                   |
| :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                        | String                                                                                                                                                 |
| created_at                                | Date (Unix timestamp in seconds)                                                                                                                                  |
| updated_at                                | Date (Unix timestamp in seconds)                                                                                                                                  |
| source.type                               | StringAccepted fields are conversation, email, facebook, instagram, phone_call, phone_switch, push, sms and whatsapp. |
| source.id                                 | String                                                                                                                                                 |
| source.delivered_as                       | String                                                                                                                                                 |
| source.subject                            | String                                                                                                                                                 |
| source.body                               | String                                                                                                                                                 |
| source.author.id                          | String                                                                                                                                                 |
| source.author.type                        | String                                                                                                                                                 |
| source.author.name                        | String                                                                                                                                                 |
| source.author.email                       | String                                                                                                                                                 |
| source.url                                | String                                                                                                                                                 |
| contact_ids                               | String                                                                                                                                                 |
| teammate_ids                              | String                                                                                                                                                 |
| admin_assignee_id                         | Integer                                                                                                                                                |
| team_assignee_id                          | Integer                                                                                                                                                |
| channel_initiated                         | String                                                                                                                                                 |
| open                                      | Boolean                                                                                                                                                |
| read                                      | Boolean                                                                                                                                                |
| state                                     | String                                                                                                                                                 |
| waiting_since                             | Date (Unix timestamp in seconds)                                                                                                                                  |
| snoozed_until                             | Date (Unix timestamp in seconds)                                                                                                                                  |
| tag_ids                                   | String                                                                                                                                                 |
| priority                                  | String                                                                                                                                                 |
| statistics.time_to_assignment             | Integer                                                                                                                                                |
| statistics.time_to_admin_reply            | Integer                                                                                                                                                |
| statistics.time_to_first_close            | Integer                                                                                                                                                |
| statistics.time_to_last_close             | Integer                                                                                                                                                |
| statistics.median_time_to_reply           | Integer                                                                                                                                                |
| statistics.first_contact_reply_at         | Date (Unix timestamp in seconds)                                                                                                                                  |
| statistics.first_assignment_at            | Date (Unix timestamp in seconds)                                                                                                                                  |
| statistics.first_admin_reply_at           | Date (Unix timestamp in seconds)                                                                                                                                  |
| statistics.first_close_at                 | Date (Unix timestamp in seconds)                                                                                                                                  |
| statistics.last_assignment_at             | Date (Unix timestamp in seconds)                                                                                                                                  |
| statistics.last_assignment_admin_reply_at | Date (Unix timestamp in seconds)                                                                                                                                  |
| statistics.last_contact_reply_at          | Date (Unix timestamp in seconds)                                                                                                                                  |
| statistics.last_admin_reply_at            | Date (Unix timestamp in seconds)                                                                                                                                  |
| statistics.last_close_at                  | Date (Unix timestamp in seconds)                                                                                                                                  |
| statistics.last_closed_by_id              | String                                                                                                                                                 |
| statistics.count_reopens                  | Integer                                                                                                                                                |
| statistics.count_assignments              | Integer                                                                                                                                                |
| statistics.count_conversation_parts       | Integer                                                                                                                                                |
| conversation_rating.requested_at          | Date (Unix timestamp in seconds)                                                                                                                                  |
| conversation_rating.replied_at            | Date (Unix timestamp in seconds)                                                                                                                                  |
| conversation_rating.score                 | Integer                                                                                                                                                |
| conversation_rating.remark                | String                                                                                                                                                 |
| conversation_rating.contact_id            | String                                                                                                                                                 |
| conversation_rating.admin_d               | String                                                                                                                                                 |
| ai_agent_participated                     | Boolean                                                                                                                                                |
| ai_agent.resolution_state                 | String                                                                                                                                                 |
| ai_agent.last_answer_type                 | String                                                                                                                                                 |
| ai_agent.rating                           | Integer                                                                                                                                                |
| ai_agent.rating_remark                    | String                                                                                                                                                 |
| ai_agent.source_type                      | String                                                                                                                                                 |
| ai_agent.source_title                     | String                                                                                                                                                 |

### Accepted Operators

The table below shows the operators you can use to define how you want to search for the value.  The operator should be put in as a string ("="). The operator has to be compatible with the field's type  (eg. you cannot search with > for a given string value as it's only compatible for integer's and dates).

| Operator | Valid Types                    | Description                                                  |
| :------- | :----------------------------- | :----------------------------------------------------------- |
| =        | All                            | Equals                                                       |
| !=       | All                            | Doesn't Equal                                                |
| IN       | All                            | In  Shortcut for OR queries  Values most be in Array       |
| NIN      | All                            | Not In  Shortcut for OR ! queries  Values must be in Array |
| >        | Integer  Date (Unix timestamp in seconds) | Greater (or equal) than                                      |
| <       | Integer  Date (Unix timestamp in seconds) | Lower (or equal) than                                        |
| ~        | String                         | Contains                                                     |
| !~       | String                         | Doesn't Contain                                              |
| ^        | String                         | Starts With                                                  |
| $        | String                         | Ends With                                                    |

### Reply to a conversation

 - [POST /conversations/{id}/reply](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/replyconversation.md): You can reply to a conversation with a message from an admin or on behalf of a contact, or with a note for admins.

{% admonition type="warning" name="Bot replies to inbound email" %}
By default, bot or Operator replies to an inbound email conversation aren't sent to your customer. The reply is stored as an unnotifiable bot comment, and no seen receipt is generated until an email is actually delivered.

To send these replies as outbound emails, reach out to your accounts team to enable the email-reply feature flag for your workspace.
{% /admonition %}

### Manage a conversation

 - [POST /conversations/{id}/parts](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/manageconversation.md): For managing conversations you can:
- Close a conversation
- Snooze a conversation to reopen on a future date
- Open a conversation which is snoozed or closed
- Assign a conversation to an admin and/or team.

### Attach a contact to a conversation

 - [POST /conversations/{id}/customers](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/attachcontacttoconversation.md): You can add participants who are contacts to a conversation, on behalf of either another contact or an admin.

{% admonition type="warning" name="Contacts without an email" %}
If you add a contact via the email parameter and there is no user/lead found on that workspace with he given email, then we will create a new contact with role set to lead.
{% /admonition %}

### Detach a contact from a group conversation

 - [DELETE /conversations/{conversation_id}/customers/{contact_id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/detachcontactfromconversation.md): You can remove participants who are contacts from a group conversation, on behalf of an admin.

{% admonition type="warning" name="Removing the last participant" %}
You cannot remove the last remaining contact from a conversation.
{% /admonition %}

### Redact a conversation part

 - [POST /conversations/redact](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/redactconversation.md): You can redact a conversation part or the source message of a conversation (as seen in the source object).

{% admonition type="info" name="Redacting parts and messages" %}
If you are redacting a conversation part, it must have a body. If you are redacting a source message, it must have been created by a contact. We will return a conversation_part_not_redactable error if these criteria are not met.
{% /admonition %}

### Convert a conversation to a ticket

 - [POST /conversations/{id}/convert](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/conversations/convertconversationtoticket.md): You can convert a conversation to a ticket.

### Add tag to a conversation

 - [POST /conversations/{conversation_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/attachtagtoconversation.md): You can tag a specific conversation. This will return a tag object for the tag that was added to the conversation.

### Remove tag from a conversation

 - [DELETE /conversations/{conversation_id}/tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/detachtagfromconversation.md): You can remove tag from a specific conversation. This will return a tag object for the tag that was removed from the conversation.

## Data Attributes

Everything about your Data Attributes

### List all data attributes

 - [GET /data_attributes](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/data-attributes/lisdataattributes.md): You can fetch a list of all data attributes belonging to a workspace for contacts, companies or conversations.

### Create a data attribute

 - [POST /data_attributes](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/data-attributes/createdataattribute.md): You can create a data attributes for a contact or a company.

### Update a data attribute

 - [PUT /data_attributes/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/data-attributes/updatedataattribute.md): You can update a data attribute.

> 🚧 Updating the data type is not possible
>
> It is currently a dangerous action to execute changing a data attribute's type via the API. You will need to update the type via the UI instead.

## Data Events

Everything about your Data Events

### Submit a data event

 - [POST /events](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/data-events/createdataevent.md): You will need an Access Token that has write permissions to send Events. Once you have a key you can submit events via POST to the Events resource, which is located at https://api.intercom.io/events, or you can send events using one of the client libraries. When working with the HTTP API directly a client should send the event with a Content-Type of application/json.

When using the JavaScript API, adding the code to your app makes the Events API available. Once added, you can submit an event using the trackEvent method. This will associate the event with the Lead or currently logged-in user or logged-out visitor/lead and send it to Intercom. The final parameter is a map that can be used to send optional metadata about the event.

With the Ruby client you pass a hash describing the event to Intercom::Event.create, or call the track_user method directly on the current user object (e.g. user.track_event).

NB: For the JSON object types, please note that we do not currently support nested JSON structure.

| Type            | Description                                                                                                                                                                                                     | Example                                                                           |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| String          | The value is a JSON String                                                                                                                                                                                      | "source":"desktop"                                                              |
| Number          | The value is a JSON Number                                                                                                                                                                                      | "load": 3.67                                                                    |
| Date            | The key ends with the String _date and the value is a Unix timestamp, assumed to be in the UTC timezone. | "contact_date": 1392036272                                                      |
| Link            | The value is a HTTP or HTTPS URI.                                                                                                                                                                               | "article": "https://example.org/ab1de.html"                                     |
| Rich Link       | The value is a JSON object that contains url and value keys.                                                                                                                                                | "article": {"url": "https://example.org/ab1de.html", "value":"the dude abides"} |
| Monetary Amount | The value is a JSON object that contains amount and currency keys. The amount key is a positive integer representing the amount in cents. The price in the example to the right denotes €349.99.          | "price": {"amount": 34999, "currency": "eur"}                                   |

Lead Events

When submitting events for Leads, you will need to specify the Lead's id.

Metadata behaviour

- We currently limit the number of tracked metadata keys to 10 per event. Once the quota is reached, we ignore any further keys we receive. The first 10 metadata keys are determined by the order in which they are sent in with the event.
- It is not possible to change the metadata keys once the event has been sent. A new event will need to be created with the new keys and you can archive the old one.
- There might be up to 24 hrs delay when you send a new metadata for an existing event.

Event de-duplication

The API may detect and ignore duplicate events. Each event is uniquely identified as a combination of the following data - the Workspace identifier, the Contact external identifier, the Data Event name and the Data Event created time. As a result, it is strongly recommended to send a second granularity Unix timestamp in the created_at field.

Duplicated events are responded to using the normal 202 Accepted code - an error is not thrown, however repeat requests will be counted against any rate limit that is in place.

### HTTP API Responses

- Successful responses to submitted events return 202 Accepted with an empty body.
- Unauthorised access will be rejected with a 401 Unauthorized or 403 Forbidden response code.
- Events sent about users that cannot be found will return a 404 Not Found.
- Event lists containing duplicate events will have those duplicates ignored.
- Server errors will return a 500 response code and may contain an error message in the body.

### List all data events

 - [GET /events](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/data-events/lisdataevents.md): > 🚧
>
> Please note that you can only 'list' events that are less than 90 days old. Event counts and summaries will still include your events older than 90 days but you cannot 'list' these events individually if they are older than 90 days

The events belonging to a customer can be listed by sending a GET request to https://api.intercom.io/events with a user or lead identifier along with a type parameter. The identifier parameter can be one of user_id, email or intercom_user_id. The type parameter value must be user.

- https://api.intercom.io/events?type=user&user_id={user_id}
- https://api.intercom.io/events?type=user&email={email}
- https://api.intercom.io/events?type=user&intercom_user_id={id} (this call can be used to list leads)

The email parameter value should be url encoded when sending.

You can optionally define the result page size as well with the per_page parameter.

### Create event summaries

 - [POST /events/summaries](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/data-events/dataeventsummaries.md): Create event summaries for a user. Event summaries are used to track the number of times an event has occurred, the first time it occurred and the last time it occurred.

## Data Export

Export message delivery and engagement statistics (opens, clicks, replies, completions, dismissals, unsubscribes, bounces) for outbound content such as Emails, Posts, Custom Bots, Surveys, Tours, and Series.

### Create content data export

 - [POST /export/content/data](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/data-export/createdataexport.md): To create your export job, you need to send a POST request to the export endpoint https://api.intercom.io/export/content/data.

This endpoint exports message delivery and engagement data for outbound content (Emails, Posts, Custom Bots, Surveys, Tours, Series, and more). The exported data includes who received each message, when they received it, and how they engaged with it (opens, clicks, replies, completions, dismissals, unsubscribes, and bounces). It does not export raw message or conversation content.

The only parameters you need to provide are the range of dates that you want exported.

>🚧 Limit of one active job
>
> You can only have one active job per workspace. You will receive a HTTP status code of 429 with the message Exceeded rate limit of 1 pending message data export jobs if you attempt to create a second concurrent job.

>❗️ Updated_at not included
>
> It should be noted that the timeframe only includes messages sent during the time period and not messages that were only updated during this period. For example, if a message was updated yesterday but sent two days ago, you would need to set the created_at_after date before the message was sent to include that in your retrieval job.

>📘 Date ranges are inclusive
>
> Requesting data for 2018-06-01 until 2018-06-30 will get all data for those days including those specified - e.g. 2018-06-01 00:00:00 until 2018-06-30 23:59:99.

### Show content data export

 - [GET /export/content/data/{job_identifier}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/data-export/getdataexport.md): You can view the status of your job by sending a GET request to the URL
https://api.intercom.io/export/content/data/{job_identifier} - the {job_identifier} is the value returned in the response when you first created the export job. More on it can be seen in the Export Job Model.

> 🚧 Jobs expire after two days
> All jobs that have completed processing (and are thus available to download from the provided URL) will have an expiry limit of two days from when the export ob completed. After this, the data will no longer be available.

### Cancel content data export

 - [POST /export/cancel/{job_identifier}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/data-export/canceldataexport.md): You can cancel your job

### Download content data export

 - [GET /download/content/data/{job_identifier}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/data-export/downloaddataexport.md): When a job has a status of complete, and thus a filled download_url, you can download your data by hitting that provided URL, formatted like so: https://api.intercom.io/download/content/data/xyz1234.

Your exported message data will be streamed continuously back down to you in a gzipped CSV format.

> 📘 Octet header required
>
> You will have to specify the header Accept: application/octet-stream when hitting this endpoint.

## Help Center

Everything about your Help Center

### List all collections

 - [GET /help_center/collections](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/help-center/listallcollections.md): You can fetch a list of all collections by making a GET request to https://api.intercom.io/help_center/collections.

Collections will be returned in descending order on the updated_at attribute. This means if you need to iterate through results then we'll show the most recently updated collections first.

### Create a collection

 - [POST /help_center/collections](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/help-center/createcollection.md): You can create a new collection by making a POST request to https://api.intercom.io/help_center/collections.

### Retrieve a collection

 - [GET /help_center/collections/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/help-center/retrievecollection.md): You can fetch the details of a single collection by making a GET request to https://api.intercom.io/help_center/collections/.

### Update a collection

 - [PUT /help_center/collections/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/help-center/updatecollection.md): You can update the details of a single collection by making a PUT request to https://api.intercom.io/collections/.

### Delete a collection

 - [DELETE /help_center/collections/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/help-center/deletecollection.md): You can delete a single collection by making a DELETE request to https://api.intercom.io/collections/.

### Retrieve a Help Center

 - [GET /help_center/help_centers/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/help-center/retrievehelpcenter.md): You can fetch the details of a single Help Center by making a GET request to https://api.intercom.io/help_center/help_center/.

### List all Help Centers

 - [GET /help_center/help_centers](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/help-center/listhelpcenters.md): You can list all Help Centers by making a GET request to https://api.intercom.io/help_center/help_centers.

## Messages

Everything about your messages

### Create a message

 - [POST /messages](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/messages/createmessage.md): You can create a message that has been initiated by an admin. The conversation can be either an in-app message or an email.

> 🚧 Sending for visitors
>
> There can be a short delay between when a contact is created and when a contact becomes available to be messaged through the API. A 404 Not Found error will be returned in this case.

This will return the Message model that has been created.

> 🚧 Retrieving Associated Conversations
>
> As this is a message, there will be no conversation present until the contact responds. Once they do, you will have to search for a contact's conversations with the id of the message.

## News

Everything about your News

### List all news items

 - [GET /news/news_items](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/news/listnewsitems.md): You can fetch a list of all news items

### Create a news item

 - [POST /news/news_items](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/news/createnewsitem.md): You can create a news item

### Retrieve a news item

 - [GET /news/news_items/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/news/retrievenewsitem.md): You can fetch the details of a single news item.

### Update a news item

 - [PUT /news/news_items/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/news/updatenewsitem.md)

### Delete a news item

 - [DELETE /news/news_items/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/news/deletenewsitem.md): You can delete a single news item.

### List all live newsfeed items

 - [GET /news/newsfeeds/{id}/items](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/news/listlivenewsfeeditems.md): You can fetch a list of all news items that are live on a given newsfeed

### List all newsfeeds

 - [GET /news/newsfeeds](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/news/listnewsfeeds.md): You can fetch a list of all newsfeeds

### Retrieve a newsfeed

 - [GET /news/newsfeeds/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/news/retrievenewsfeed.md): You can fetch the details of a single newsfeed

## Switch

Everything about Switch

### Create a phone Switch

 - [POST /phone_call_redirects](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/switch/createphoneswitch.md): You can use the API to deflect phone calls to the Intercom Messenger.
Calling this endpoint will send an SMS with a link to the Messenger to the phone number specified.

If custom attributes are specified, they will be added to the user or lead's custom data attributes.

## Tickets

Everything about your tickets

### Add tag to a ticket

 - [POST /tickets/{ticket_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/attachtagtoticket.md): You can tag a specific ticket. This will return a tag object for the tag that was added to the ticket.

### Remove tag from a ticket

 - [DELETE /tickets/{ticket_id}/tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tags/detachtagfromticket.md): You can remove tag from a specific ticket. This will return a tag object for the tag that was removed from the ticket.

### Reply to a ticket

 - [POST /tickets/{id}/reply](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tickets/replyticket.md): You can reply to a ticket with a message from an admin or on behalf of a contact, or with a note for admins.

### Add tag to a ticket

 - [POST /tickets/{ticket_id}/tags](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tickets/attachtagtoticket.md): You can tag a specific ticket. This will return a tag object for the tag that was added to the ticket.

### Remove tag from a ticket

 - [DELETE /tickets/{ticket_id}/tags/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tickets/detachtagfromticket.md): You can remove tag from a specific ticket. This will return a tag object for the tag that was removed from the ticket.

### Create a ticket

 - [POST /tickets](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tickets/createticket.md): You can create a new ticket.

### Update a ticket

 - [PUT /tickets/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tickets/updateticket.md): You can update a ticket.

### Retrieve a ticket

 - [GET /tickets/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tickets/getticket.md): You can fetch the details of a single ticket.

### Search tickets

 - [POST /tickets/search](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/tickets/searchtickets.md): You can search for multiple tickets by the value of their attributes in order to fetch exactly which ones you want.

To search for tickets, you send a POST request to https://api.intercom.io/tickets/search.

This will accept a query object in the body which will define your filters.
{% admonition type="warning" name="Optimizing search queries" %}
  Search queries can be complex, so optimizing them can help the performance of your search.
  Use the AND and OR operators to combine multiple filters to get the exact results you need and utilize
  pagination to limit the number of results returned. The default is 20 results per page.
  See the pagination section for more details on how to use the starting_after param.
{% /admonition %}

### Nesting & Limitations

You can nest these filters in order to get even more granular insights that pinpoint exactly what you need. Example: (1 OR 2) AND (3 OR 4).
There are some limitations to the amount of multiples there can be:
- There's a limit of max 2 nested filters
- There's a limit of max 15 filters for each AND or OR group

### Accepted Fields

Most keys listed as part of the Ticket model are searchable, whether writeable or not. The value you search for has to match the accepted type, otherwise the query will fail (ie. as created_at accepts a date, the value cannot be a string such as "foobar").
The source.body field is unique as the search will not be performed against the entire value, but instead against every element of the value separately. For example, when searching for a conversation with a "I need support" body - the query should contain a = operator with the value "support" for such conversation to be returned. A query with a = operator and a "need support" value will not yield a result.

| Field                                     | Type                                                                                     |
| :---------------------------------------- | :--------------------------------------------------------------------------------------- |
| id                                        | String                                                                                   |
| created_at                                | Date (Unix timestamp in seconds)                                                                    |
| updated_at                                | Date (Unix timestamp in seconds)                                                                    |
| title                           | String                                                                                   |
| description                     | String                                                                                   |
| category                                  | String                                                                                   |
| ticket_type_id                            | String                                                                                   |
| contact_ids                               | String                                                                                   |
| teammate_ids                              | String                                                                                   |
| admin_assignee_id                         | String                                                                                   |
| team_assignee_id                          | String                                                                                   |
| open                                      | Boolean                                                                                  |
| state                                     | String                                                                                   |
| snoozed_until                             | Date (Unix timestamp in seconds)                                                                    |
| ticket_attribute.{id}                     | String or Boolean or Date (Unix timestamp in seconds) or Float or Integer                           |

### Accepted Operators

{% admonition type="info" name="Searching based on created_at" %}
  You may use the = operators to search by created_at.
{% /admonition %}

The table below shows the operators you can use to define how you want to search for the value.  The operator should be put in as a string ("="). The operator has to be compatible with the field's type  (eg. you cannot search with > for a given string value as it's only compatible for integer's and dates).

| Operator | Valid Types                    | Description                                                  |
| :------- | :----------------------------- | :----------------------------------------------------------- |
| =        | All                            | Equals                                                       |
| !=       | All                            | Doesn't Equal                                                |
| IN       | All                            | In  Shortcut for OR queries  Values most be in Array       |
| NIN      | All                            | Not In  Shortcut for OR ! queries  Values must be in Array |
| >        | Integer  Date (Unix timestamp in seconds) | Greater (or equal) than                                      |
| <       | Integer  Date (Unix timestamp in seconds) | Lower (or equal) than                                        |
| ~        | String                         | Contains                                                     |
| !~       | String                         | Doesn't Contain                                              |
| ^        | String                         | Starts With                                                  |
| $        | String                         | Ends With                                                    |

## Teams

Everything about your Teams

### List all teams

 - [GET /teams](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/teams/listteams.md): This will return a list of team objects for the App.

### Retrieve a team

 - [GET /teams/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/teams/retrieveteam.md): You can fetch the details of a single team, containing an array of admins that belong to this team.

## Ticket States

Everything about your ticket states

### List all ticket states

 - [GET /ticket_states](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ticket-states/listticketstates.md): You can get a list of all ticket states for a workspace.

## Ticket Type Attributes

Everything about your ticket type attributes

### Create a new attribute for a ticket type

 - [POST /ticket_types/{ticket_type_id}/attributes](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ticket-type-attributes/createtickettypeattribute.md): You can create a new attribute for a ticket type.

### Update an existing attribute for a ticket type

 - [PUT /ticket_types/{ticket_type_id}/attributes/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ticket-type-attributes/updatetickettypeattribute.md): You can update an existing attribute for a ticket type.

## Ticket Types

Everything about your ticket types

### List all ticket types

 - [GET /ticket_types](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ticket-types/listtickettypes.md): You can get a list of all ticket types for a workspace.

### Create a ticket type

 - [POST /ticket_types](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ticket-types/createtickettype.md): You can create a new ticket type.
> 📘 Creating ticket types.
>
> Every ticket type will be created with two default attributes: _default_title_ and _default_description_.
> For the icon propery, use an emoji from Twemoji Cheatsheet

### Retrieve a ticket type

 - [GET /ticket_types/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ticket-types/gettickettype.md): You can fetch the details of a single ticket type.

### Update a ticket type

 - [PUT /ticket_types/{id}](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/ticket-types/updatetickettype.md): You can update a ticket type.

> 📘 Updating a ticket type.
>
> For the icon propery, use an emoji from Twemoji Cheatsheet

## Visitors

Everything about your Visitors

### Update a visitor

 - [PUT /visitors](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/visitors/updatevisitor.md): Sending a PUT request to /visitors will result in an update of an existing Visitor.

Option 1. You can update a visitor by passing in the user_id of the visitor in the Request body.

Option 2. You can update a visitor by passing in the id of the visitor in the Request body.

### Retrieve a visitor with User ID

 - [GET /visitors](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/visitors/retrievevisitorwithuserid.md): You can fetch the details of a single visitor.

### Convert a visitor

 - [POST /visitors/convert](https://developers.intercom.com/docs/references/2.12/rest-api/api.intercom.io/visitors/convertvisitor.md): You can merge a Visitor to a Contact of role type lead or user.

> 📘 What happens upon a visitor being converted?
>
> If the User exists, then the Visitor will be merged into it, the Visitor deleted and the User returned. If the User does not exist, the Visitor will be converted to a User, with the User identifiers replacing it's Visitor identifiers.

