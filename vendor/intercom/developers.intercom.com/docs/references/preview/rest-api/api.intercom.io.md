# Intercom API

The intercom API reference.

Version: Preview
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

[Intercom API](https://developers.intercom.com/_bundle/docs/references/@Preview/rest-api/api.intercom.io.yaml)

## Admins

Everything about your Admins

### Identify an admin

 - [GET /me](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/admins/identifyadmin.md): You can view the currently authorised admin along with the embedded app object (a "workspace" in legacy terminology).

> 🚧 Single Sign On
>
> If you are building a custom "Log in with Intercom" flow for your site, and you call the /me endpoint to identify the logged-in user, you should not accept any sign-ins from users with unverified email addresses as it poses a potential impersonation security risk.

### Set an admin to away

 - [PUT /admins/{id}/away](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/admins/setawayadmin.md): You can set an Admin as away for the Inbox.

### List all activity logs

 - [GET /admins/activity_logs](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/admins/listactivitylogs.md): You can get a log of activities by all admins in an app.

### Search activity logs

 - [POST /admins/activity_logs/search](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/admins/searchactivitylogs.md): Search and filter admin activity logs using a POST request with event type filter in the request body. You can find more details about the available event types in the List all activity log event types endpoint.

### List all activity log event types

 - [GET /admins/activity_log_event_types](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/admins/listactivitylogeventtypes.md): You can get a list of all activity log event types. This is useful for discovering valid values to use with the event_types filter on the List all activity logs endpoint.

### List all admins

 - [GET /admins](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/admins/listadmins.md): You can fetch a list of admins for a given workspace.

### Retrieve an admin

 - [GET /admins/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/admins/retrieveadmin.md): You can retrieve the details of a single admin.

## AI Content

With the AI Content APIs, you can create and manage External Pages and Content Import Sources for your Fin Content Library.

&nbsp;

*External Pages* are pages that you want Fin to be able to answer questions about. The API for External Pages is a great way to ingest into your Fin Content Library pages that are not publicly accessible and hence can't be crawled by Intercom.

&nbsp;

*Content Import Sources* are the sources of those pages, and they are used to determine the default audience for the pages (configured via the UI). You should create a Content Import Source for each source of External Pages that you want to ingest into your Fin Content Library.

&nbsp;

You can then iterate through the content from that source via its API and POST it to the External Pages endpoint. That endpoint has an *external_id* parameter which allows you to specify the identifier from the source. The endpoint will then either create a new External Page or update an existing one as appropriate.",


### List content import sources

 - [GET /ai/content_import_sources](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ai-content/listcontentimportsources.md): You can retrieve a list of all content import sources for a workspace.

### Create a content import source

 - [POST /ai/content_import_sources](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ai-content/createcontentimportsource.md): You can create a new content import source by sending a POST request to this endpoint.

### Delete a content import source

 - [DELETE /ai/content_import_sources/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ai-content/deletecontentimportsource.md): You can delete a content import source by making a DELETE request this endpoint. This will also delete all external pages that were imported from this source.

### Retrieve a content import source

 - [GET /ai/content_import_sources/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ai-content/getcontentimportsource.md)

### Update a content import source

 - [PUT /ai/content_import_sources/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ai-content/updatecontentimportsource.md): You can update an existing content import source.

### List external pages

 - [GET /ai/external_pages](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ai-content/listexternalpages.md): You can retrieve a list of all external pages for a workspace.

### Create an external page (or update an external page by external ID)

 - [POST /ai/external_pages](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ai-content/createexternalpage.md): You can create a new external page by sending a POST request to this endpoint. If an external page already exists with the specified source_id and external_id, it will be updated instead.

### Delete an external page

 - [DELETE /ai/external_pages/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ai-content/deleteexternalpage.md): Sending a DELETE request for an external page will remove it from the content library UI and from being used for AI answers.

### Retrieve an external page

 - [GET /ai/external_pages/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ai-content/getexternalpage.md): You can retrieve an external page.

### Update an external page

 - [PUT /ai/external_pages/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ai-content/updateexternalpage.md): You can update an existing external page (if it was created via the API).

## Articles

Everything about your Articles

### List all articles

 - [GET /articles](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/articles/listarticles.md): You can fetch a list of all articles by making a GET request to https://api.intercom.io/articles.

> 📘 How are the articles sorted and ordered?
>
> Articles will be returned in descending order on the updated_at attribute. This means if you need to iterate through results then we'll show the most recently updated articles first.

### Create an article

 - [POST /articles](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/articles/createarticle.md): You can create a new article by making a POST request to https://api.intercom.io/articles.

> 📘 Tags cannot be managed via the Articles API
>
> Article tags are read-only in responses. To create, update, or delete tags, use the Intercom UI or the Tags API endpoints.

### Retrieve an article

 - [GET /articles/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/articles/retrievearticle.md): You can fetch the details of a single article by making a GET request to https://api.intercom.io/articles/.

### Update an article

 - [PUT /articles/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/articles/updatearticle.md): You can update the details of a single article by making a PUT request to https://api.intercom.io/articles/.

> 📘 Tags cannot be managed via the Articles API
>
> Article tags are read-only in responses. To create, update, or delete tags, use the Intercom UI or the Tags API endpoints.

### Delete an article

 - [DELETE /articles/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/articles/deletearticle.md): You can delete a single article by making a DELETE request to https://api.intercom.io/articles/.

### Retrieve an article draft

 - [GET /articles/{id}/draft](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/articles/retrievearticledraft.md): Fetch the staged draft of a published article by making a GET request to
https://api.intercom.io/articles//draft. The response is the article
rendered with its draft content, leaving the live article untouched.

A draft exists only when a published article has unpublished changes staged
on top of it. Returns 404 when the article has no staged draft.

Requires the read_articles_scope OAuth scope. Set Intercom-Version: Preview.

### Stage an article draft

 - [PUT /articles/{id}/draft](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/articles/stagearticledraft.md): Stage changes to a published article as a draft by making a PUT request to
https://api.intercom.io/articles//draft. The live article remains
unchanged until the draft is published.

The article must already be published; staging a draft on an article that
has never been published returns 422.

Only versioned text content (such as title and body) is staged.
Non-versioned fields like AI availability are ignored, leaving the live
values untouched.

Requires the read_write_articles_scope OAuth scope. Set Intercom-Version: Preview.

### Publish an article draft

 - [POST /articles/{id}/draft/publish](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/articles/publisharticledraft.md): Publish a staged draft by making a POST request to
https://api.intercom.io/articles//draft/publish, promoting the draft
content to live.

On a single-language workspace no body is required. On a multilingual
workspace you must list which locales to publish via the locales array;
omitting it returns 422. Returns 422 when there is no staged draft to
publish, or when a requested locale has no pending changes.

Requires the read_write_articles_scope OAuth scope. Set Intercom-Version: Preview.

### List article versions

 - [GET /articles/{article_id}/versions](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/articles/listarticleversions.md): Fetch the version history of an article by making a GET request to
https://api.intercom.io/articles//versions. Versions are
returned newest-first as a paginated list of metadata. Use
GET /articles/{article_id}/versions/{id} to retrieve a single version
with its full content.

Requires the read_articles_scope OAuth scope. Set Intercom-Version: Preview.

### Retrieve an article version

 - [GET /articles/{article_id}/versions/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/articles/retrievearticleversion.md): Fetch a single prior version of an article, including its body content,
by making a GET request to
https://api.intercom.io/articles//versions/. Returns
the version's full content; the live article remains untouched.

Requires the read_articles_scope OAuth scope. Set Intercom-Version: Preview.

### Search for articles

 - [GET /articles/search](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/articles/searcharticles.md): You can search for articles by making a GET request to https://api.intercom.io/articles/search.

## Away Status Reasons

Everything about your Away Status Reasons

### List all away status reasons

 - [GET /away_status_reasons](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/away-status-reasons/listawaystatusreasons.md): Returns a list of all away status reasons configured for the workspace, including deleted ones.

## Audiences

Everything about your Audiences

### List all audiences

 - [GET /audiences](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/audiences/listaudiences.md): You can fetch a list of all audiences for the workspace.

### Create an audience

 - [POST /audiences](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/audiences/createaudience.md): You can create a new audience by providing a name and optional predicates.

### Retrieve an audience

 - [GET /audiences/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/audiences/retrieveaudience.md): You can fetch a single audience by its id.

### Update an audience

 - [PUT /audiences/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/audiences/updateaudience.md): You can update an existing audience by providing the fields to change.

### Delete an audience

 - [DELETE /audiences/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/audiences/deleteaudience.md): You can delete a single audience by its id.

## Banners

Retrieve the banners a contact matches and record dismissals, so you can display
banners on surfaces outside the Messenger (native mobile apps, kiosks, embedded
tools). These endpoints are part of the `Preview` API version and require an OAuth
token with the `read_write_users` scope. Requesting a contact's banners records an
impression for each banner returned, and dismissals are shared with the web Messenger.


### List banners for a contact

 - [GET /contacts/{id}/banners](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/banners/listcontactbanners.md): Returns the banners a contact currently matches, so you can display them on
surfaces outside the Messenger (native mobile apps, kiosks, embedded tools).

Each banner in the response includes a view_id. Use it to record a dismissal
with the dismiss endpoint. A returned banner is treated as shown: requesting
this endpoint records an impression for each banner returned, so call it at the
point you are about to display the banners, not speculatively.

### Dismiss a banner for a contact

 - [POST /contacts/{id}/banners/{view_id}/dismiss](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/banners/dismisscontactbanner.md): Records that a contact has dismissed a banner. Dismissals are shared across
surfaces, so a banner dismissed through this endpoint will also stop appearing
in the web Messenger for that contact, and vice versa.

The request is idempotent: dismissing an already-dismissed banner succeeds and
returns the same response.

### List banners for a contact

 - [GET /contacts/{id}/banners](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listcontactbanners.md): Returns the banners a contact currently matches, so you can display them on
surfaces outside the Messenger (native mobile apps, kiosks, embedded tools).

Each banner in the response includes a view_id. Use it to record a dismissal
with the dismiss endpoint. A returned banner is treated as shown: requesting
this endpoint records an impression for each banner returned, so call it at the
point you are about to display the banners, not speculatively.

### Dismiss a banner for a contact

 - [POST /contacts/{id}/banners/{view_id}/dismiss](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/dismisscontactbanner.md): Records that a contact has dismissed a banner. Dismissals are shared across
surfaces, so a banner dismissed through this endpoint will also stop appearing
in the web Messenger for that contact, and vice versa.

The request is idempotent: dismissing an already-dismissed banner succeeds and
returns the same response.

## Contacts

Everything about your contacts

### List banners for a contact

 - [GET /contacts/{id}/banners](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/banners/listcontactbanners.md): Returns the banners a contact currently matches, so you can display them on
surfaces outside the Messenger (native mobile apps, kiosks, embedded tools).

Each banner in the response includes a view_id. Use it to record a dismissal
with the dismiss endpoint. A returned banner is treated as shown: requesting
this endpoint records an impression for each banner returned, so call it at the
point you are about to display the banners, not speculatively.

### Dismiss a banner for a contact

 - [POST /contacts/{id}/banners/{view_id}/dismiss](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/banners/dismisscontactbanner.md): Records that a contact has dismissed a banner. Dismissals are shared across
surfaces, so a banner dismissed through this endpoint will also stop appearing
in the web Messenger for that contact, and vice versa.

The request is idempotent: dismissing an already-dismissed banner succeeds and
returns the same response.

### List attached contacts

 - [GET /companies/{id}/contacts](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/listattachedcontacts.md): You can fetch a list of all contacts that belong to a company.

### Attach a Contact to a Company

 - [POST /contacts/{id}/companies](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/attachcontacttoacompany.md): You can attach a company to a single contact.

### List attached companies for contact

 - [GET /contacts/{id}/companies](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/listcompaniesforacontact.md): You can fetch a list of companies that are associated to a contact.

### Detach a contact from a company

 - [DELETE /contacts/{contact_id}/companies/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/detachcontactfromacompany.md): You can detach a company from a single contact.

### List attached contacts

 - [GET /companies/{id}/contacts](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listattachedcontacts.md): You can fetch a list of all contacts that belong to a company.

### Attach a Contact to a Company

 - [POST /contacts/{id}/companies](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/attachcontacttoacompany.md): You can attach a company to a single contact.

### List attached companies for contact

 - [GET /contacts/{id}/companies](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listcompaniesforacontact.md): You can fetch a list of companies that are associated to a contact.

### Detach a contact from a company

 - [DELETE /contacts/{contact_id}/companies/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/detachcontactfromacompany.md): You can detach a company from a single contact.

### List all contact notes

 - [GET /contacts/{id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listnotes.md): You can fetch a list of notes that are associated to a contact.

### Create a note

 - [POST /contacts/{id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/createnote.md): You can add a note to a single contact.

### List attached segments for contact

 - [GET /contacts/{contact_id}/segments](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listsegmentsforacontact.md): You can fetch a list of segments that are associated to a contact.

### List subscriptions for a contact

 - [GET /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listsubscriptionsforacontact.md): You can fetch a list of subscription types that are attached to a contact. These can be subscriptions that a user has 'opted-in' to or has 'opted-out' from, depending on the subscription type.
This will return a list of Subscription Type objects that the contact is associated with.

The data property will show a combined list of:

  1.Opt-out subscription types that the user has opted-out from.
  2.Opt-in subscription types that the user has opted-in to receiving.

Note: This endpoint only returns subscriptions where the contact has explicitly configured their preference. Subscriptions that are in the default state — where the contact has not made an explicit opt-in or opt-out choice — are not included in the response.

### Add subscription to a contact

 - [POST /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/attachsubscriptiontypetocontact.md): You can add a specific subscription to a contact. In Intercom, we have two different subscription types based on user consent - opt-out and opt-in:

  1.Attaching a contact to an opt-out subscription type will opt that user out from receiving messages related to that subscription type.

  2.Attaching a contact to an opt-in subscription type will opt that user in to receiving messages related to that subscription type.

This will return a subscription type model for the subscription type that was added to the contact.

### Remove subscription from a contact

 - [DELETE /contacts/{contact_id}/subscriptions/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/detachsubscriptiontypetocontact.md): You can remove a specific subscription from a contact. This will return a subscription type model for the subscription type that was removed from the contact.

### List tags attached to a contact

 - [GET /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listtagsforacontact.md): You can fetch a list of all tags that are attached to a specific contact.

### Add tag to a contact

 - [POST /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/attachtagtocontact.md): You can tag a specific contact. This will return a tag object for the tag that was added to the contact.

### Remove tag from a contact

 - [DELETE /contacts/{contact_id}/tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/detachtagfromcontact.md): You can remove tag from a specific contact. This will return a tag object for the tag that was removed from the contact.

### Update a contact

 - [PUT /contacts/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/updatecontact.md): You can update an existing contact (ie. user or lead).

{% admonition type="info" %}
  This endpoint handles both contact updates and custom object associations.

  See _update a contact with an association to a custom object instance_ in the request/response examples to see the custom object association format.
{% /admonition %}

### Get a contact

 - [GET /contacts/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/showcontact.md): You can fetch the details of a single contact.

{% admonition type="info" name="Merged contacts return 410 Gone" %}
  If a contact has been merged into another contact via the Merge endpoint (POST /contacts/merge), requesting it by its original ID will return HTTP 410 Gone with a Link header pointing to the canonical (merged-into) contact.

  Response headers:
  
  Link: ; rel="canonical"
  

  Response body:
  json
  {
    "type": "error.list",
    "errors": [{ "code": "contact_merged", "message": "This contact has been merged. See the 'Link' header for the canonical contact." }]
  }
  

  The Link header contains the path to the final merge target, resolving multi-hop merge chains (up to 3 hops).
{% /admonition %}

### Delete a contact

 - [DELETE /contacts/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/deletecontact.md): You can delete a single contact.

### Merge a lead and a user

 - [POST /contacts/merge](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/mergecontact.md): You can merge a contact with a role of lead into a contact with a role of user.

{% admonition type="warning" name="Merged contacts are not retrievable via the API" %}
  Once a merge is completed, the source contact (from) is permanently removed from the active contact list. This means:
  - GET /contacts/{id} — Requesting the source contact by its original ID will return 410 Gone with a Link header pointing to the canonical (merged-into) contact.
  - POST /contacts/search — The source contact will not appear in search results, including queries filtered by updated_at.
  - GET /contacts — The source contact will not appear in list results.

  Only the target contact (into) remains accessible. If your application stores contact IDs, update them to use the target contact's ID after a merge.
{% /admonition %}

### Search contacts

 - [POST /contacts/search](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/searchcontacts.md): You can search for multiple contacts by the value of their attributes in order to fetch exactly who you want.

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
| formatted_phone                    | String                         |
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

 - [GET /contacts](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listcontacts.md): You can fetch a list of all contacts (ie. users or leads) in your workspace.
{% admonition type="info" name="Merged contacts" %}
  Contacts that have been merged (via POST /contacts/merge) will not appear in list results. Only the target contact from the merge remains accessible.
{% /admonition %}
{% admonition type="warning" name="Pagination" %}
  You can use pagination to limit the number of results returned. The default is 50 results per page.
  See the pagination section for more details on how to use the starting_after param.
{% /admonition %}

### Create contact

 - [POST /contacts](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/createcontact.md): You can create a new contact (ie. user or lead).

### Get a contact by External ID

 - [GET /contacts/find_by_external_id/{external_id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/showcontactbyexternalid.md): You can fetch the details of a single contact by external ID. Note that this endpoint only supports users and not leads.

{% admonition type="info" name="Merged contacts return 410 Gone" %}
  If the contact with this external ID has been merged into another contact, the API returns HTTP 410 Gone with a Link header pointing to the canonical (merged-into) contact. See GET /contacts/{id} for details on the response format.
{% /admonition %}

### Archive contact

 - [POST /contacts/{id}/archive](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/archivecontact.md): You can archive a single contact.

### Unarchive contact

 - [POST /contacts/{id}/unarchive](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/unarchivecontact.md): You can unarchive a single contact.

### Block contact

 - [POST /contacts/{id}/block](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/blockcontact.md): Block a single contact.Note: conversations of the contact will also be archived during the process.More details in FAQ How do I block Inbox spam?

### Get contact merge history

 - [GET /contacts/{id}/merge_history](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listcontactmergehistory.md): Retrieve the paginated list of contacts that have been merged into a given contact.

Only available for contacts with a user role. Returns a 404 if the contact is not found or has a lead role.

### List banners for a contact

 - [GET /contacts/{id}/banners](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listcontactbanners.md): Returns the banners a contact currently matches, so you can display them on
surfaces outside the Messenger (native mobile apps, kiosks, embedded tools).

Each banner in the response includes a view_id. Use it to record a dismissal
with the dismiss endpoint. A returned banner is treated as shown: requesting
this endpoint records an impression for each banner returned, so call it at the
point you are about to display the banners, not speculatively.

### Dismiss a banner for a contact

 - [POST /contacts/{id}/banners/{view_id}/dismiss](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/dismisscontactbanner.md): Records that a contact has dismissed a banner. Dismissals are shared across
surfaces, so a banner dismissed through this endpoint will also stop appearing
in the web Messenger for that contact, and vice versa.

The request is idempotent: dismissing an already-dismissed banner succeeds and
returns the same response.

### Bulk update contacts

 - [PUT /contacts/bulk](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/bulkupdatecontacts.md): You can bulk update contacts by submitting an array of contact objects with the fields to update. Each contact must include an id field identifying the contact to update.

The endpoint creates an async job that processes the updates in the background. Use the returned job ID with GET /contacts/bulk/{id} to check the job status.

{% admonition type="info" name="Limits" %}
  - Maximum of 100 contacts per request.
  - You can append tasks to an existing job by including job.id in the request body.
{% /admonition %}

### Get a bulk update job

 - [GET /contacts/bulk/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/showbulkupdatecontactsjob.md): You can check the status of a bulk contact update job. The state field indicates the overall job progress: pending, running, completed, or completed_with_errors.

### Update a contact

 - [PUT /contacts/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/custom-object-instances/updatecontact.md): You can update an existing contact (ie. user or lead).

{% admonition type="info" %}
  This endpoint handles both contact updates and custom object associations.

  See _update a contact with an association to a custom object instance_ in the request/response examples to see the custom object association format.
{% /admonition %}

### List all contact notes

 - [GET /contacts/{id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/notes/listnotes.md): You can fetch a list of notes that are associated to a contact.

### Create a note

 - [POST /contacts/{id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/notes/createnote.md): You can add a note to a single contact.

### List attached segments for contact

 - [GET /contacts/{contact_id}/segments](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/segments/listsegmentsforacontact.md): You can fetch a list of segments that are associated to a contact.

### List subscriptions for a contact

 - [GET /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/subscription-types/listsubscriptionsforacontact.md): You can fetch a list of subscription types that are attached to a contact. These can be subscriptions that a user has 'opted-in' to or has 'opted-out' from, depending on the subscription type.
This will return a list of Subscription Type objects that the contact is associated with.

The data property will show a combined list of:

  1.Opt-out subscription types that the user has opted-out from.
  2.Opt-in subscription types that the user has opted-in to receiving.

Note: This endpoint only returns subscriptions where the contact has explicitly configured their preference. Subscriptions that are in the default state — where the contact has not made an explicit opt-in or opt-out choice — are not included in the response.

### Add subscription to a contact

 - [POST /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/subscription-types/attachsubscriptiontypetocontact.md): You can add a specific subscription to a contact. In Intercom, we have two different subscription types based on user consent - opt-out and opt-in:

  1.Attaching a contact to an opt-out subscription type will opt that user out from receiving messages related to that subscription type.

  2.Attaching a contact to an opt-in subscription type will opt that user in to receiving messages related to that subscription type.

This will return a subscription type model for the subscription type that was added to the contact.

### Remove subscription from a contact

 - [DELETE /contacts/{contact_id}/subscriptions/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/subscription-types/detachsubscriptiontypetocontact.md): You can remove a specific subscription from a contact. This will return a subscription type model for the subscription type that was removed from the contact.

### List tags attached to a contact

 - [GET /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/listtagsforacontact.md): You can fetch a list of all tags that are attached to a specific contact.

### Add tag to a contact

 - [POST /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/attachtagtocontact.md): You can tag a specific contact. This will return a tag object for the tag that was added to the contact.

### Remove tag from a contact

 - [DELETE /contacts/{contact_id}/tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/detachtagfromcontact.md): You can remove tag from a specific contact. This will return a tag object for the tag that was removed from the contact.

## Brands

Everything about your Brands

### List all brands

 - [GET /brands](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/brands/listbrands.md): Retrieves all brands for the workspace, including the default brand.
The default brand id always matches the workspace

### Retrieve a brand

 - [GET /brands/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/brands/retrievebrand.md): Fetches a specific brand by its unique identifier

## Calls

Everything about your Calls

### List all calls

 - [GET /calls](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/calls/listcalls.md): Retrieve a paginated list of calls.

### Get a call

 - [GET /calls/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/calls/showcall.md): Retrieve a single call by id.

### Get call recording by call id

 - [GET /calls/{id}/recording](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/calls/showcallrecording.md): Redirects to a signed URL for the call's recording if it exists.

### Get call transcript by call id

 - [GET /calls/{id}/transcript](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/calls/showcalltranscript.md): Returns the transcript for the specified call as a downloadable text file.

### List calls with transcripts

 - [POST /calls/search](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/calls/listcallswithtranscripts.md): Retrieve calls by a list of conversation ids and include transcripts when available.
A maximum of 20 conversation_ids can be provided. If none are provided or more than 20 are provided, a 400 error is returned.

### Register a Fin Voice call

 - [POST /fin_voice/register](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/calls/registerfinvoicecall.md): Register a Fin Voice call with Intercom. This endpoint creates an external reference
that links an external call identifier to an Intercom call and conversation.

The call can be from different sources:
- AWS Connect (default)
- Five9
- Zoom Phone

### Collect Fin Voice call by ID

 - [GET /fin_voice/collect/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/calls/collectfinvoicecallbyid.md): Retrieve information about a Fin Voice call using the external reference ID.

### Collect Fin Voice call by external ID

 - [GET /fin_voice/external_id/{external_id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/calls/collectfinvoicecallbyexternalid.md): Retrieve information about a Fin Voice call using the external call identifier.

### Collect Fin Voice call by phone number

 - [GET /fin_voice/phone_number/{phone_number}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/calls/collectfinvoicecallbyphonenumber.md): Retrieve information about a Fin Voice call using the phone number.

Returns the most recent matched call for the given phone number, ordered by creation date.

### Collect Fin Voice calls by conversation ID

 - [GET /fin_voice/conversation/{conversation_id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/calls/collectfinvoicecallsbyconversationid.md): Retrieve information about Fin Voice calls associated with a conversation.

Returns all matched calls for the given conversation ID. A conversation may have multiple associated calls.

## Companies

Everything about your Companies

### Create or Update a company

 - [POST /companies](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/createorupdatecompany.md): You can create or update a company.

Companies will be only visible in Intercom when there is at least one associated user.

Companies are looked up via company_id in a POST request, if not found via company_id, the new company will be created, if found, that company will be updated.

{% admonition type="warning" name="Using company_id" %}
  You can set a unique company_id value when creating a company. However, it is not possible to update company_id. Be sure to set a unique value once upon creation of the company.
{% /admonition %}

### Retrieve companies

 - [GET /companies](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/retrievecompany.md): You can fetch a single company by passing in company_id or name.

  https://api.intercom.io/companies?name={name}

  https://api.intercom.io/companies?company_id={company_id}

You can fetch all companies and filter by segment_id or tag_id as a query parameter.

  https://api.intercom.io/companies?tag_id={tag_id}

  https://api.intercom.io/companies?segment_id={segment_id}

### Retrieve a company by ID

 - [GET /companies/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/retrieveacompanybyid.md): You can fetch a single company.

### Update a company

 - [PUT /companies/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/updatecompany.md): You can update a single company using the Intercom provisioned id.

{% admonition type="warning" name="Using company_id" %}
  When updating a company it is not possible to update company_id. This can only be set once upon creation of the company.
{% /admonition %}

### Delete a company

 - [DELETE /companies/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/deletecompany.md): Delete a single company.

This endpoint does not permanently remove the company. It archives the company record and detaches any contacts attached to it; the contacts themselves are not deleted. A company.deleted webhook is sent once archival completes.

The endpoint returns 200 with "deleted": true as soon as the request is accepted — archival is processed asynchronously.

{% admonition type="warning" %}
Third-party integrations that sync companies into Intercom (for example, Salesforce or Chargebee) will recreate any company deleted through this endpoint on their next sync. To prevent recreation, remove or filter the company at the source integration before deleting it via the API.
{% /admonition %}

### List attached contacts

 - [GET /companies/{id}/contacts](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/listattachedcontacts.md): You can fetch a list of all contacts that belong to a company.

### List attached segments for companies

 - [GET /companies/{id}/segments](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/listattachedsegmentsforcompanies.md): You can fetch a list of all segments that belong to a company.

### List all company notes

 - [GET /companies/{company_id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/listcompanynotes.md): You can fetch a list of notes that are associated to a company.

### Create a company note

 - [POST /companies/{company_id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/createcompanynote.md): You can add a note to a single company.

### List all companies

 - [POST /companies/list](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/listallcompanies.md): You can list companies. The company list is sorted by the last_request_at field and by default is ordered descending, most recently requested first.

Note that the API does not include companies who have no associated users in list responses.

When using the Companies endpoint and the pages object to iterate through the returned companies, there is a limit of 10,000 Companies that can be returned. If you need to list or iterate on more than 10,000 Companies, please use the Scroll API.
{% admonition type="warning" name="Pagination" %}
  You can use pagination to limit the number of results returned. The default is 20 results per page.
  See the pagination section for more details on how to use the starting_after param.
{% /admonition %}

### Scroll over all companies

 - [GET /companies/scroll](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/scrolloverallcompanies.md): The list all companies functionality does not work well for huge datasets, and can result in errors and performance problems when paging deeply. The Scroll API provides an efficient mechanism for iterating over all companies in a dataset.

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

 - [POST /contacts/{id}/companies](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/attachcontacttoacompany.md): You can attach a company to a single contact.

### List attached companies for contact

 - [GET /contacts/{id}/companies](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/listcompaniesforacontact.md): You can fetch a list of companies that are associated to a contact.

### Detach a contact from a company

 - [DELETE /contacts/{contact_id}/companies/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/detachcontactfromacompany.md): You can detach a company from a single contact.

### List attached contacts

 - [GET /companies/{id}/contacts](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listattachedcontacts.md): You can fetch a list of all contacts that belong to a company.

### Attach a Contact to a Company

 - [POST /contacts/{id}/companies](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/attachcontacttoacompany.md): You can attach a company to a single contact.

### List attached companies for contact

 - [GET /contacts/{id}/companies](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listcompaniesforacontact.md): You can fetch a list of companies that are associated to a contact.

### Detach a contact from a company

 - [DELETE /contacts/{contact_id}/companies/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/detachcontactfromacompany.md): You can detach a company from a single contact.

### List all company notes

 - [GET /companies/{company_id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/notes/listcompanynotes.md): You can fetch a list of notes that are associated to a company.

### Create a company note

 - [POST /companies/{company_id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/notes/createcompanynote.md): You can add a note to a single company.

## Notes

Everything about your Notes

### List all company notes

 - [GET /companies/{company_id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/listcompanynotes.md): You can fetch a list of notes that are associated to a company.

### Create a company note

 - [POST /companies/{company_id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/companies/createcompanynote.md): You can add a note to a single company.

### List all contact notes

 - [GET /contacts/{id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listnotes.md): You can fetch a list of notes that are associated to a contact.

### Create a note

 - [POST /contacts/{id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/createnote.md): You can add a note to a single contact.

### List all company notes

 - [GET /companies/{company_id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/notes/listcompanynotes.md): You can fetch a list of notes that are associated to a company.

### Create a company note

 - [POST /companies/{company_id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/notes/createcompanynote.md): You can add a note to a single company.

### List all contact notes

 - [GET /contacts/{id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/notes/listnotes.md): You can fetch a list of notes that are associated to a contact.

### Create a note

 - [POST /contacts/{id}/notes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/notes/createnote.md): You can add a note to a single contact.

### Retrieve a note

 - [GET /notes/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/notes/retrievenote.md): You can fetch the details of a single note.

## Segments

Everything about your Segments

### List attached segments for contact

 - [GET /contacts/{contact_id}/segments](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listsegmentsforacontact.md): You can fetch a list of segments that are associated to a contact.

### List attached segments for contact

 - [GET /contacts/{contact_id}/segments](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/segments/listsegmentsforacontact.md): You can fetch a list of segments that are associated to a contact.

### List all segments

 - [GET /segments](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/segments/listsegments.md): You can fetch a list of all segments.

### Retrieve a segment

 - [GET /segments/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/segments/retrievesegment.md): You can fetch the details of a single segment.

## Subscription Types

Everything about subscription types

### List subscriptions for a contact

 - [GET /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listsubscriptionsforacontact.md): You can fetch a list of subscription types that are attached to a contact. These can be subscriptions that a user has 'opted-in' to or has 'opted-out' from, depending on the subscription type.
This will return a list of Subscription Type objects that the contact is associated with.

The data property will show a combined list of:

  1.Opt-out subscription types that the user has opted-out from.
  2.Opt-in subscription types that the user has opted-in to receiving.

Note: This endpoint only returns subscriptions where the contact has explicitly configured their preference. Subscriptions that are in the default state — where the contact has not made an explicit opt-in or opt-out choice — are not included in the response.

### Add subscription to a contact

 - [POST /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/attachsubscriptiontypetocontact.md): You can add a specific subscription to a contact. In Intercom, we have two different subscription types based on user consent - opt-out and opt-in:

  1.Attaching a contact to an opt-out subscription type will opt that user out from receiving messages related to that subscription type.

  2.Attaching a contact to an opt-in subscription type will opt that user in to receiving messages related to that subscription type.

This will return a subscription type model for the subscription type that was added to the contact.

### Remove subscription from a contact

 - [DELETE /contacts/{contact_id}/subscriptions/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/detachsubscriptiontypetocontact.md): You can remove a specific subscription from a contact. This will return a subscription type model for the subscription type that was removed from the contact.

### List subscriptions for a contact

 - [GET /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/subscription-types/listsubscriptionsforacontact.md): You can fetch a list of subscription types that are attached to a contact. These can be subscriptions that a user has 'opted-in' to or has 'opted-out' from, depending on the subscription type.
This will return a list of Subscription Type objects that the contact is associated with.

The data property will show a combined list of:

  1.Opt-out subscription types that the user has opted-out from.
  2.Opt-in subscription types that the user has opted-in to receiving.

Note: This endpoint only returns subscriptions where the contact has explicitly configured their preference. Subscriptions that are in the default state — where the contact has not made an explicit opt-in or opt-out choice — are not included in the response.

### Add subscription to a contact

 - [POST /contacts/{contact_id}/subscriptions](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/subscription-types/attachsubscriptiontypetocontact.md): You can add a specific subscription to a contact. In Intercom, we have two different subscription types based on user consent - opt-out and opt-in:

  1.Attaching a contact to an opt-out subscription type will opt that user out from receiving messages related to that subscription type.

  2.Attaching a contact to an opt-in subscription type will opt that user in to receiving messages related to that subscription type.

This will return a subscription type model for the subscription type that was added to the contact.

### Remove subscription from a contact

 - [DELETE /contacts/{contact_id}/subscriptions/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/subscription-types/detachsubscriptiontypetocontact.md): You can remove a specific subscription from a contact. This will return a subscription type model for the subscription type that was removed from the contact.

### List subscription types

 - [GET /subscription_types](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/subscription-types/listsubscriptiontypes.md): You can list all subscription types. A list of subscription type objects will be returned.

## Tags

Everything about tags

### List tags attached to a contact

 - [GET /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/listtagsforacontact.md): You can fetch a list of all tags that are attached to a specific contact.

### Add tag to a contact

 - [POST /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/attachtagtocontact.md): You can tag a specific contact. This will return a tag object for the tag that was added to the contact.

### Remove tag from a contact

 - [DELETE /contacts/{contact_id}/tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/detachtagfromcontact.md): You can remove tag from a specific contact. This will return a tag object for the tag that was removed from the contact.

### Add tag to a conversation

 - [POST /conversations/{conversation_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/attachtagtoconversation.md): You can tag a specific conversation. This will return a tag object for the tag that was added to the conversation.

### Remove tag from a conversation

 - [DELETE /conversations/{conversation_id}/tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/detachtagfromconversation.md): You can remove tag from a specific conversation. This will return a tag object for the tag that was removed from the conversation.

### List tags attached to a contact

 - [GET /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/listtagsforacontact.md): You can fetch a list of all tags that are attached to a specific contact.

### Add tag to a contact

 - [POST /contacts/{contact_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/attachtagtocontact.md): You can tag a specific contact. This will return a tag object for the tag that was added to the contact.

### Remove tag from a contact

 - [DELETE /contacts/{contact_id}/tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/detachtagfromcontact.md): You can remove tag from a specific contact. This will return a tag object for the tag that was removed from the contact.

### Add tag to a conversation

 - [POST /conversations/{conversation_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/attachtagtoconversation.md): You can tag a specific conversation. This will return a tag object for the tag that was added to the conversation.

### Remove tag from a conversation

 - [DELETE /conversations/{conversation_id}/tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/detachtagfromconversation.md): You can remove tag from a specific conversation. This will return a tag object for the tag that was removed from the conversation.

### List all tags

 - [GET /tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/listtags.md): You can fetch a list of all tags for a given workspace.

### Create or update a tag, Tag or untag companies, Tag contacts

 - [POST /tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/createtag.md): You can use this endpoint to perform the following operations:

  1. Create a new tag: You can create a new tag by passing in the tag name as specified in "Create or Update Tag Request Payload" described below.

  2. Update an existing tag: You can update an existing tag by passing the id of the tag as specified in "Create or Update Tag Request Payload" described below.

  3. Tag Companies: You can tag single company or a list of companies. You can tag a company by passing in the tag name and the company details as specified in "Tag Company Request Payload" described below. Also, if the tag doesn't exist then a new one will be created automatically.

  4. Untag Companies: You can untag a single company or a list of companies. You can untag a company by passing in the tag id and the company details as specified in "Untag Company Request Payload" described below.

  5. Tag Multiple Users: You can tag a list of users. You can tag the users by passing in the tag name and the user details as specified in "Tag Users Request Payload" described below.

Each operation will return a tag object.

### Find a specific tag

 - [GET /tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/findtag.md): You can fetch the details of tags that are on the workspace by their id.
This will return a tag object.

### Delete tag

 - [DELETE /tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/deletetag.md): You can delete the details of tags that are on the workspace by passing in the id.

### Add tag to a ticket

 - [POST /tickets/{ticket_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/attachtagtoticket.md): You can tag a specific ticket. This will return a tag object for the tag that was added to the ticket.

### Remove tag from a ticket

 - [DELETE /tickets/{ticket_id}/tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/detachtagfromticket.md): You can remove tag from a specific ticket. This will return a tag object for the tag that was removed from the ticket.

### Add tag to a ticket

 - [POST /tickets/{ticket_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/attachtagtoticket.md): You can tag a specific ticket. This will return a tag object for the tag that was added to the ticket.

### Remove tag from a ticket

 - [DELETE /tickets/{ticket_id}/tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/detachtagfromticket.md): You can remove tag from a specific ticket. This will return a tag object for the tag that was removed from the ticket.

## Custom Object Instances

Everything about your Custom Object instances.
{% admonition type="warning" name="Permission Requirements" %}
  From now on, to access this endpoint, you need additional permissions. Please head over to the [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) app package authentication settings to configure the required permissions.
{% /admonition %}


### Update a contact

 - [PUT /contacts/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/contacts/updatecontact.md): You can update an existing contact (ie. user or lead).

{% admonition type="info" %}
  This endpoint handles both contact updates and custom object associations.

  See _update a contact with an association to a custom object instance_ in the request/response examples to see the custom object association format.
{% /admonition %}

### Update a conversation

 - [PUT /conversations/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/updateconversation.md): You can update an existing conversation.

{% admonition type="info" name="Replying and other actions" %}
If you want to reply to a coveration or take an action such as assign, unassign, open, close or snooze, take a look at the reply and manage endpoints.
{% /admonition %}

{% admonition type="info" %}
  This endpoint handles both conversation updates and custom object associations.

  See _update a conversation with an association to a custom object instance_ in the request/response examples to see the custom object association format.
{% /admonition %}

{% admonition type="danger" name="Breaking change: duplicate custom attribute names" %}
The PUT /conversations/{id} endpoint now returns a 400 INVALID_PARAMETER error when the request includes custom_attributes and your workspace contains multiple non-archived conversation custom attributes with the same name. Previously, the update would silently apply to a non-deterministic attribute.

To resolve, rename or archive the duplicate attribute so each name is unique, then retry the request. You can do this through:

- The Conversation Attributes API — list with GET /conversations/attributes, then rename with PUT /conversations/attributes/{id} or archive with DELETE /conversations/attributes/{id}
- Your workspace settings (Settings → Data → Conversations)
{% /admonition %}

### Update a contact

 - [PUT /contacts/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/custom-object-instances/updatecontact.md): You can update an existing contact (ie. user or lead).

{% admonition type="info" %}
  This endpoint handles both contact updates and custom object associations.

  See _update a contact with an association to a custom object instance_ in the request/response examples to see the custom object association format.
{% /admonition %}

### Update a conversation

 - [PUT /conversations/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/custom-object-instances/updateconversation.md): You can update an existing conversation.

{% admonition type="info" name="Replying and other actions" %}
If you want to reply to a coveration or take an action such as assign, unassign, open, close or snooze, take a look at the reply and manage endpoints.
{% /admonition %}

{% admonition type="info" %}
  This endpoint handles both conversation updates and custom object associations.

  See _update a conversation with an association to a custom object instance_ in the request/response examples to see the custom object association format.
{% /admonition %}

{% admonition type="danger" name="Breaking change: duplicate custom attribute names" %}
The PUT /conversations/{id} endpoint now returns a 400 INVALID_PARAMETER error when the request includes custom_attributes and your workspace contains multiple non-archived conversation custom attributes with the same name. Previously, the update would silently apply to a non-deterministic attribute.

To resolve, rename or archive the duplicate attribute so each name is unique, then retry the request. You can do this through:

- The Conversation Attributes API — list with GET /conversations/attributes, then rename with PUT /conversations/attributes/{id} or archive with DELETE /conversations/attributes/{id}
- Your workspace settings (Settings → Data → Conversations)
{% /admonition %}

### Create or Update a Custom Object Instance

 - [POST /custom_object_instances/{custom_object_type_identifier}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/custom-object-instances/createcustomobjectinstances.md): Create or update a custom object instance

### List Custom Object Instances

 - [GET /custom_object_instances/{custom_object_type_identifier}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/custom-object-instances/listcustomobjectinstances.md): List instances of a custom object type. Three modes are supported:
- No filter — returns all instances for the type.
- references_contact_id — returns instances associated with the given contact.
- references_conversation_id — returns instances associated with the given conversation.

When external_id is provided, returns a single matching instance (not a list).

### Delete a Custom Object Instance by External ID

 - [DELETE /custom_object_instances/{custom_object_type_identifier}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/custom-object-instances/deletecustomobjectinstancesbyid.md): Delete a single Custom Object instance by external_id.

### Get Custom Object Instance by ID

 - [GET /custom_object_instances/{custom_object_type_identifier}/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/custom-object-instances/getcustomobjectinstancesbyid.md): Fetch a Custom Object Instance by id.

### Delete a Custom Object Instance by ID

 - [DELETE /custom_object_instances/{custom_object_type_identifier}/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/custom-object-instances/deletecustomobjectinstancesbyexternalid.md): Delete a single Custom Object instance using the Intercom defined id.

## Content

Search and bulk operations over Knowledge Hub content (Preview)

### Search Knowledge Hub content (Preview)

 - [GET /content/search](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/content/searchcontent.md): Search across Knowledge Hub content of all supported types in a single call:
articles, content snippets, external content (webpages), file source content
(uploaded documents), and internal articles.

Articles are returned as a single item per article, with their per-locale
article_content variants nested under contents[]. Other content types are
returned as flat objects with type, id, and title.

Requires the read_content OAuth scope. Set Intercom-Version: preview.

## Content Snippets

Everything about your Content Snippets

### List all content snippets

 - [GET /content_snippets](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/content-snippets/listcontentsnippets.md): You can fetch a list of all content snippets for a workspace.

### Create a content snippet

 - [POST /content_snippets](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/content-snippets/createcontentsnippet.md): You can create a new content snippet.

### Retrieve a content snippet

 - [GET /content_snippets/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/content-snippets/getcontentsnippet.md): You can fetch a single content snippet by its id.

### Update a content snippet

 - [PUT /content_snippets/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/content-snippets/updatecontentsnippet.md): You can update an existing content snippet.

### Delete a content snippet

 - [DELETE /content_snippets/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/content-snippets/deletecontentsnippet.md): You can delete a single content snippet by its id.

## Conversations

Everything about your Conversations

### Add tag to a conversation

 - [POST /conversations/{conversation_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/attachtagtoconversation.md): You can tag a specific conversation. This will return a tag object for the tag that was added to the conversation.

### Remove tag from a conversation

 - [DELETE /conversations/{conversation_id}/tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/detachtagfromconversation.md): You can remove tag from a specific conversation. This will return a tag object for the tag that was removed from the conversation.

### List all conversations

 - [GET /conversations](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/listconversations.md): You can fetch a list of all conversations.

You can optionally request the result page size and the cursor to start after to fetch the result.
{% admonition type="warning" name="Pagination" %}
  You can use pagination to limit the number of results returned. The default is 20 results per page.
  See the pagination section for more details on how to use the starting_after param.
{% /admonition %}

### Creates a conversation

 - [POST /conversations](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/createconversation.md): You can create a conversation that has been initiated by a contact (ie. user or lead).
The conversation can be an in-app message only.

{% admonition type="info" name="Sending for visitors" %}
You can also send a message from a visitor by specifying their user_id or id value in the from field, along with a type field value of contact.
This visitor will be automatically converted to a contact with a lead role once the conversation is created.
{% /admonition %}

This will return the Message model that has been created.

### Retrieve a conversation

 - [GET /conversations/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/retrieveconversation.md): You can fetch the details of a single conversation.

This will return a single Conversation model with all its conversation parts.

{% admonition type="warning" name="Hard limit of 500 parts" %}
The maximum number of conversation parts that can be returned via the API is 500. If you have more than that we will return the 500 most recent conversation parts.
{% /admonition %}

For AI agent conversation metadata, please note that you need to have the agent enabled in your workspace, which is a paid feature.

### Update a conversation

 - [PUT /conversations/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/updateconversation.md): You can update an existing conversation.

{% admonition type="info" name="Replying and other actions" %}
If you want to reply to a coveration or take an action such as assign, unassign, open, close or snooze, take a look at the reply and manage endpoints.
{% /admonition %}

{% admonition type="info" %}
  This endpoint handles both conversation updates and custom object associations.

  See _update a conversation with an association to a custom object instance_ in the request/response examples to see the custom object association format.
{% /admonition %}

{% admonition type="danger" name="Breaking change: duplicate custom attribute names" %}
The PUT /conversations/{id} endpoint now returns a 400 INVALID_PARAMETER error when the request includes custom_attributes and your workspace contains multiple non-archived conversation custom attributes with the same name. Previously, the update would silently apply to a non-deterministic attribute.

To resolve, rename or archive the duplicate attribute so each name is unique, then retry the request. You can do this through:

- The Conversation Attributes API — list with GET /conversations/attributes, then rename with PUT /conversations/attributes/{id} or archive with DELETE /conversations/attributes/{id}
- Your workspace settings (Settings → Data → Conversations)
{% /admonition %}

### Delete a conversation

 - [DELETE /conversations/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/deleteconversation.md): {% admonition type="warning" name="Irreversible operation" %}
Deleting a conversation is permanent and cannot be reversed.
{% /admonition %}

You can delete a single conversation. The behavior depends on the retain_metrics parameter:

- With retain_metrics=true (default): Deletes the conversation while retaining reporting data. The conversation will still appear in reporting, though some data may be incomplete due to the deletion.

- With retain_metrics=false: Deletes the conversation and all associated reporting data. The conversation will be completely removed from both the inbox and all reporting.

{% admonition type="info" name="Required scope for retain_metrics=false" %}
Using retain_metrics=false requires the delete_conversations_and_metrics OAuth scope.
{% /admonition %}

For more info, see this help center article.

### Search conversations

 - [POST /conversations/search](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/searchconversations.md): You can search for multiple conversations by the value of their attributes in order to fetch exactly which ones you want.

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

Most keys listed in the conversation model are searchable, whether writeable or not. The value you search for has to match the accepted type, otherwise the query will fail (ie. as created_at accepts a date, the value cannot be a string such as "foorbar").
The source.body field is unique as the search will not be performed against the entire value, but instead against every element of the value separately. For example, when searching for a conversation with a "I need support" body - the query should contain a = operator with the value "support" for such conversation to be returned. A query with a = operator and a "need support" value will not yield a result.

| Field                                     | Type                                                                                                                                                   |
| :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                                        | String                                                                                                                                                 |
| created_at                                | Date (Unix timestamp in seconds)                                                                                                                                  |
| updated_at                                | Date (Unix timestamp in seconds)                                                                                                                                  |
| source.type                               | StringAccepted fields are conversation, email, facebook, instagram, phone_call, phone_switch, push, sms, twitter and whatsapp. |
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

 - [POST /conversations/{id}/reply](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/replyconversation.md): You can reply to a conversation with a message from an admin or on behalf of a contact, or with a note for admins.

{% admonition type="warning" name="Bot replies to inbound email" %}
By default, bot or Operator replies to an inbound email conversation aren't sent to your customer. The reply is stored as an unnotifiable bot comment, and no seen receipt is generated until an email is actually delivered.

To send these replies as outbound emails, reach out to your accounts team to enable the email-reply feature flag for your workspace.
{% /admonition %}

### Manage a conversation

 - [POST /conversations/{id}/parts](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/manageconversation.md): For managing conversations you can:
- Close a conversation
- Snooze a conversation to reopen on a future date
- Open a conversation which is snoozed or closed
- Assign a conversation to an admin and/or team.

### List handling events

 - [GET /conversations/{id}/handling_events](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/listhandlingevents.md): List all pause/resume events for a conversation. These events track when teammates paused or resumed handling a conversation.

Requires the read_conversations OAuth scope.

### List side conversations

 - [GET /conversations/{id}/side_conversations](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/listsideconversations.md): List side conversations for a given conversation. Side conversations are internal threads created by teammates from within a conversation.

Each side conversation includes its conversation parts (messages). Results are paginated.

Requires the read_conversations OAuth scope.

### Merge a conversation

 - [POST /conversations/{id}/merge](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/mergeconversation.md): Merge a secondary (source) conversation into a primary (target) conversation.
The secondary conversation is closed and linked to the primary, which
becomes the surviving thread. Returns the primary conversation on success.

Requires write_conversations OAuth scope. When the secondary is a ticket,
write_tickets scope is also required.

### Convert a conversation to a ticket

 - [POST /conversations/{id}/convert](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/convertconversationtoticket.md): You can convert a conversation to a ticket.

### List all deleted conversation IDs

 - [GET /conversations/deleted](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations/listdeletedconversationids.md): List all deleted conversation IDs.

{% admonition type="warning" name="Pagination" %}
  You can use pagination to limit the number of results returned. The default is 20 results per page. You can navigate to next pages using the page param.
{% /admonition %}

### Update a conversation

 - [PUT /conversations/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/custom-object-instances/updateconversation.md): You can update an existing conversation.

{% admonition type="info" name="Replying and other actions" %}
If you want to reply to a coveration or take an action such as assign, unassign, open, close or snooze, take a look at the reply and manage endpoints.
{% /admonition %}

{% admonition type="info" %}
  This endpoint handles both conversation updates and custom object associations.

  See _update a conversation with an association to a custom object instance_ in the request/response examples to see the custom object association format.
{% /admonition %}

{% admonition type="danger" name="Breaking change: duplicate custom attribute names" %}
The PUT /conversations/{id} endpoint now returns a 400 INVALID_PARAMETER error when the request includes custom_attributes and your workspace contains multiple non-archived conversation custom attributes with the same name. Previously, the update would silently apply to a non-deterministic attribute.

To resolve, rename or archive the duplicate attribute so each name is unique, then retry the request. You can do this through:

- The Conversation Attributes API — list with GET /conversations/attributes, then rename with PUT /conversations/attributes/{id} or archive with DELETE /conversations/attributes/{id}
- Your workspace settings (Settings → Data → Conversations)
{% /admonition %}

### Add tag to a conversation

 - [POST /conversations/{conversation_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/attachtagtoconversation.md): You can tag a specific conversation. This will return a tag object for the tag that was added to the conversation.

### Remove tag from a conversation

 - [DELETE /conversations/{conversation_id}/tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/detachtagfromconversation.md): You can remove tag from a specific conversation. This will return a tag object for the tag that was removed from the conversation.

## Conversation Parts

Update and redact individual conversation parts

### Update a conversation part

 - [PUT /conversations/{conversation_id}/conversation_parts/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversation-parts/updateconversationpart.md): You can update properties of a conversation part. Currently supports updating the send state of an external reply or marking a part as seen by an admin.

{% admonition type="warning" name="Experimental" %}
  This is an experimental endpoint. It requires a valid HMAC secret for authentication in addition to the standard bearer token.
{% /admonition %}

### Redact a conversation part

 - [POST /conversations/redact](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversation-parts/redactconversation.md): You can redact a conversation part or the source message of a conversation (as seen in the source object).

{% admonition type="info" name="Redacting parts and messages" %}
If you are redacting a conversation part, it must have a body. If you are redacting a source message, it must have been created by a contact. We will return a conversation_part_not_redactable error if these criteria are not met.
{% /admonition %}

## Conversation Participants

Manage contacts participating in conversations

### Attach a contact to a conversation

 - [POST /conversations/{id}/customers](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversation-participants/attachcontacttoconversation.md): You can add participants who are contacts to a conversation, on behalf of either another contact or an admin.

{% admonition type="warning" name="Contacts without an email" %}
If you add a contact via the email parameter and there is no user/lead found on that workspace with he given email, then we will create a new contact with role set to lead.
{% /admonition %}

### Detach a contact from a group conversation

 - [DELETE /conversations/{conversation_id}/customers/{contact_id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversation-participants/detachcontactfromconversation.md): You can remove participants who are contacts from a group conversation, on behalf of an admin.

{% admonition type="warning" name="Removing the last participant" %}
You cannot remove the last remaining contact from a conversation.
{% /admonition %}

## Conversations Attributes

Manage custom attributes for conversations

### List all conversation attributes

 - [GET /conversations/attributes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations-attributes/listconversationattributes.md): You can fetch a list of all conversation attributes for your workspace.

### Create a conversation attribute

 - [POST /conversations/attributes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations-attributes/createconversationattribute.md): Create a new conversation attribute.

### Get a conversation attribute

 - [GET /conversations/attributes/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations-attributes/getconversationattribute.md): Retrieve a single conversation attribute by ID.

### Update a conversation attribute

 - [PUT /conversations/attributes/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations-attributes/updateconversationattribute.md): Update an existing conversation attribute.

### Delete (archive) a conversation attribute

 - [DELETE /conversations/attributes/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations-attributes/deleteconversationattribute.md): Archive a conversation attribute (soft delete). The attribute is marked as archived but not permanently deleted.

### Add an option to a list conversation attribute

 - [POST /conversations/attributes/{id}/options](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations-attributes/createconversationattributeoption.md): Add a new option to a list-type conversation attribute. Returns the full attribute with the updated options array.

### Update an option on a list conversation attribute

 - [PUT /conversations/attributes/{id}/options/{option_id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations-attributes/updateconversationattributeoption.md): Update the label of a single option on a list-type conversation attribute. Returns the full attribute with the updated options array.

### Archive an option on a list conversation attribute

 - [DELETE /conversations/attributes/{id}/options/{option_id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/conversations-attributes/deleteconversationattributeoption.md): Archive a single option on a list-type conversation attribute (soft delete). The option remains in the response with archived: true. Returns the full attribute with the updated options array.

## Data Attributes

Everything about your Data Attributes

### List all data attributes

 - [GET /data_attributes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-attributes/lisdataattributes.md): You can fetch a list of all data attributes belonging to a workspace for contacts or companies.

{% admonition type="warning" name="Conversation attributes removed" %}
Conversation attributes are no longer returned by this endpoint. Calling without a model parameter no longer includes them in the response, and model=conversation returns a 422 error. Use GET /conversations/attributes instead.
{% /admonition %}

### Create a data attribute

 - [POST /data_attributes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-attributes/createdataattribute.md): You can create a data attributes for a contact or a company.

### Update a data attribute

 - [PUT /data_attributes/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-attributes/updatedataattribute.md): You can update a data attribute.

> 🚧 Updating the data type is not possible
>
> It is currently a dangerous action to execute changing a data attribute's type via the API. You will need to update the type via the UI instead.

## Data Connectors

Everything about your Data Connectors

### List all data connectors

 - [GET /data_connectors](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-connectors/listdataconnectors.md): Returns a paginated list of all data connectors for the workspace, ordered by most recently updated first. Data connectors allow workflows and AI agents to make HTTP requests to external APIs.

### Create a data connector

 - [POST /data_connectors](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-connectors/createdataconnector.md): Create a new data connector. The connector is created in draft state. Configure its URL, headers, data inputs, and other settings, then set it to live when ready.

### Retrieve a data connector

 - [GET /data_connectors/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-connectors/retrievedataconnector.md): You can retrieve the full detail of a single data connector by its ID.

The response includes configuration, data inputs, response fields, and object mappings.

### Delete a data connector

 - [DELETE /data_connectors/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-connectors/deletedataconnector.md): Delete an existing data connector. The connector must be in draft state and must not be in use by any workflows or AI agents.

### Update a data connector

 - [PATCH /data_connectors/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-connectors/updatedataconnector.md): Update an existing data connector. Only provided fields are changed. Set state to live or draft to change the connector's state.

### List execution results for a data connector

 - [GET /data_connectors/{data_connector_id}/execution_results](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-connectors/listdataconnectorexecutionresults.md): Retrieve paginated execution logs for a specific data connector.
Results from the last hour are returned by default. Use start_ts and end_ts to customize the time range.

Request/response bodies are excluded by default. Use include_bodies=true to include them.

### Retrieve an execution result

 - [GET /data_connectors/{data_connector_id}/execution_results/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-connectors/showdataconnectorexecutionresult.md): Retrieve details for a specific data connector execution result.
Always includes request/response bodies and the sanitised request URL.

## Data Events

Everything about your Data Events

### Submit a data event

 - [POST /events](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-events/createdataevent.md): You will need an Access Token that has write permissions to send Events. Once you have a key you can submit events via POST to the Events resource, which is located at https://api.intercom.io/events, or you can send events using one of the client libraries. When working with the HTTP API directly a client should send the event with a Content-Type of application/json.

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

 - [GET /events](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-events/lisdataevents.md): > 🚧
>
> Please note that you can only 'list' events that are less than 90 days old. Event counts and summaries will still include your events older than 90 days but you cannot 'list' these events individually if they are older than 90 days

The events belonging to a customer can be listed by sending a GET request to https://api.intercom.io/events with a user or lead identifier along with a type parameter. The identifier parameter can be one of user_id, email or intercom_user_id. The type parameter value must be user.

- https://api.intercom.io/events?type=user&user_id={user_id}
- https://api.intercom.io/events?type=user&email={email}
- https://api.intercom.io/events?type=user&intercom_user_id={id} (this call can be used to list leads)

The email parameter value should be url encoded when sending.

You can optionally define the result page size as well with the per_page parameter.

### Create event summaries

 - [POST /events/summaries](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-events/dataeventsummaries.md): Create event summaries for a user. Event summaries are used to track the number of times an event has occurred, the first time it occurred and the last time it occurred.

## Data Export

Export message delivery and engagement statistics (opens, clicks, replies, completions, dismissals, unsubscribes, bounces) for outbound content such as Emails, Posts, Custom Bots, Surveys, Tours, and Series.

### Create content data export

 - [POST /export/content/data](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-export/createdataexport.md): To create your export job, you need to send a POST request to the export endpoint https://api.intercom.io/export/content/data.

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

 - [GET /export/content/data/{job_identifier}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-export/getdataexport.md): You can view the status of your job by sending a GET request to the URL
https://api.intercom.io/export/content/data/{job_identifier} - the {job_identifier} is the value returned in the response when you first created the export job. More on it can be seen in the Export Job Model.

> 🚧 Jobs expire after two days
> All jobs that have completed processing (and are thus available to download from the provided URL) will have an expiry limit of two days from when the export ob completed. After this, the data will no longer be available.

### Cancel content data export

 - [POST /export/cancel/{job_identifier}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-export/canceldataexport.md): You can cancel your job

### Download content data export

 - [GET /download/content/data/{job_identifier}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/data-export/downloaddataexport.md): When a job has a status of complete, and thus a filled download_url, you can download your data by hitting that provided URL, formatted like so: https://api.intercom.io/download/content/data/xyz1234.

Your exported message data will be streamed continuously back down to you in a gzipped CSV format.

> 📘 Octet header required
>
> You will have to specify the header Accept: application/octet-stream when hitting this endpoint.

## Emails

Everything about your Emails

### List all email settings

 - [GET /emails](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/emails/listemails.md): Lists all sender email address settings for the workspace

### Retrieve an email setting

 - [GET /emails/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/emails/retrieveemail.md): Fetches a specific email setting by its unique identifier

## Fin Agent

Access Fin programmatically via the Fin Agent API endpoints.

&nbsp;

{% admonition type="warning" %}
Please reach out to your accounts team to discuss access and tailored, hands-on support.
{% /admonition %}

&nbsp;

Orchestrate Fin from your own agent: discover what Fin can do with `/fin/capabilities`, ask a one-shot question with `/fin/ask`, run a specific procedure with `/fin/procedures/{procedure_id}/run`, and continue a conversation with `/fin/reply`. Fin notifies your application of its status and responses through a set of events, delivered via webhooks or Server-Sent Events (SSE).

&nbsp;

Starting a standalone conversation with `/fin/start` remains available for existing conversational integrations and is documented below.

&nbsp;

**Events**

Configure a webhook endpoint in the Fin Agent API settings to receive events, or use the `sse_subscription_url` from the API response to subscribe via SSE. See the [setup guide](/docs/guides/fin-agent-api/setup) for configuration details.

- `fin_status_updated` - Fired when Fin's status changes (awaiting_user_reply, escalated, resolved, complete)
- `fin_replied` - Fired when Fin sends a reply to the user
- `fin_reply_chunk` - SSE-only streaming event fired during reply generation (requires streaming enabled)

All webhook requests include an `X-Fin-Agent-API-Webhook-Signature` header for request validation.


### Discover Fin's capabilities

 - [POST /fin/capabilities](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/fin-agent/listfincapabilities.md): Return a machine-readable, per-user list of what Fin can do for a given end user, so an
orchestrating agent can decide which endpoint to call.

The response is audience-matched to the supplied user: each live, API-triggerable
procedure is checked against that user before being included, alongside the static
reply and ask actions.

### Ask Fin

 - [POST /fin/ask](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/fin-agent/askfin.md): Ask Fin a single, self-contained question and receive one informational answer.

Unlike a conversation, /fin/ask is non-conversational: Fin will not ask follow-up
questions, will not run procedures, and will not escalate to a human.

Fin's answer is delivered asynchronously via the fin_replied event. The conversation
ends with a complete status — there is no awaiting_user_reply cycle.

### Reply to Fin

 - [POST /fin/reply](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/fin-agent/replytofin.md): Send a follow-up message in an existing conversation. When Fin needs more information to
complete an action, it sets the conversation to awaiting_user_reply — send the user's
response so Fin can continue.

### Run a Fin procedure

 - [POST /fin/procedures/{procedure_id}/run](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/fin-agent/runfinprocedure.md): Deterministically run a specific procedure on a new conversation. Calling this endpoint
guarantees that the named procedure runs — there is no non-deterministic routing.

Fin's progress is delivered asynchronously via events or Server-Sent Events. If the
procedure pauses for user input, the conversation status becomes awaiting_user_reply —
send the user's response with /fin/reply.

### Start a conversation with Fin

 - [POST /fin/start](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/fin-agent/startfinconversation.md): {% admonition type="info" name="Legacy — conversational mode" %}
/fin/start powers the conversational model, where your own UI drives a back-and-forth with Fin. This endpoint is no longer actively developed and is maintained only for existing integrations — new functionality lands on the orchestration endpoints.
{% /admonition %}

Initialize Fin by passing it the user's message along with conversation history and user details.

These additional pieces of context will be used by Fin to provide a better and more contextual answer to the user.

Once Fin is initialized, it progresses through a series of statuses such as thinking, replying, awaiting_user_reply, or resolved before ending with a status of complete.

During this workflow, the client should allow Fin to continue uninterrupted until a final complete status is returned, at which point control of the conversation passes back to the client.

Events can be received via webhooks or Server-Sent Events (SSE) using the sse_subscription_url in the response.

## Help Center

Everything about your Help Center

### List all redirects for a help center

 - [GET /help_center/help_centers/{help_center_id}/redirects](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/help-center/listhelpcenterredirects.md): You can fetch a list of all URL redirects for a help center by making a GET request to https://api.intercom.io/help_center/help_centers/{help_center_id}/redirects.

Redirects are returned in descending order on the updated_at attribute.

Requires the read_help_center_redirects_scope OAuth scope. Set Intercom-Version: Preview.

### Create a redirect

 - [POST /help_center/help_centers/{help_center_id}/redirects](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/help-center/createhelpcenterredirect.md): You can create a new URL redirect by making a POST request to https://api.intercom.io/help_center/help_centers/{help_center_id}/redirects.

Requires the read_write_help_center_redirects_scope OAuth scope. Set Intercom-Version: Preview.

### Retrieve a redirect

 - [GET /help_center/help_centers/{help_center_id}/redirects/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/help-center/retrievehelpcenterredirect.md): You can fetch the details of a single redirect by making a GET request to https://api.intercom.io/help_center/help_centers/{help_center_id}/redirects/{id}.

Requires the read_help_center_redirects_scope OAuth scope. Set Intercom-Version: Preview.

### Delete a redirect

 - [DELETE /help_center/help_centers/{help_center_id}/redirects/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/help-center/deletehelpcenterredirect.md): You can delete a single redirect by making a DELETE request to https://api.intercom.io/help_center/help_centers/{help_center_id}/redirects/{id}.

Requires the read_write_help_center_redirects_scope OAuth scope. Set Intercom-Version: Preview.

### List all collections

 - [GET /help_center/collections](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/help-center/listallcollections.md): You can fetch a list of all collections by making a GET request to https://api.intercom.io/help_center/collections.

Collections will be returned in descending order on the updated_at attribute. This means if you need to iterate through results then we'll show the most recently updated collections first.

### Create a collection

 - [POST /help_center/collections](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/help-center/createcollection.md): You can create a new collection by making a POST request to https://api.intercom.io/help_center/collections.

### Retrieve a collection

 - [GET /help_center/collections/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/help-center/retrievecollection.md): You can fetch the details of a single collection by making a GET request to https://api.intercom.io/help_center/collections/.

### Update a collection

 - [PUT /help_center/collections/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/help-center/updatecollection.md): You can update the details of a single collection by making a PUT request to https://api.intercom.io/collections/.

### Delete a collection

 - [DELETE /help_center/collections/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/help-center/deletecollection.md): You can delete a single collection by making a DELETE request to https://api.intercom.io/collections/.

### Retrieve a Help Center

 - [GET /help_center/help_centers/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/help-center/retrievehelpcenter.md): You can fetch the details of a single Help Center by making a GET request to https://api.intercom.io/help_center/help_center/.

### List all Help Centers

 - [GET /help_center/help_centers](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/help-center/listhelpcenters.md): You can list all Help Centers by making a GET request to https://api.intercom.io/help_center/help_centers.

## Identity Verification Secrets

Manage HMAC signing secrets for Messenger identity verification — list, create, and rotate out. Signing material is returned only once, at creation time.

### List all identity verification secrets

 - [GET /secure_mode_secrets](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/identity-verification-secrets/listidentityverificationsecrets.md): Returns the identity verification secrets configured for your workspace.

Each entry includes metadata only — the HMAC signing material itself is never returned by this endpoint. The raw secret is only available once, in the response to POST /secure_mode_secrets. Persist it at that moment.

### Create an identity verification secret

 - [POST /secure_mode_secrets](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/identity-verification-secrets/createidentityverificationsecret.md): Creates a new identity verification secret for your workspace. Intercom generates a 256-bit, cryptographically random value server-side and returns it once in the response.

This is the only opportunity to capture the secret. Store it in your secure configuration immediately. The secret field is omitted from all subsequent responses (including GET /secure_mode_secrets) — if you lose it, you must rotate a new secret in and delete this one.

You must enable the secret for at least one platform (supports_android, supports_ios, or supports_web). Rotation flow: create the new secret, roll it out to every client signing user_hash values, then delete the old secret with DELETE /secure_mode_secrets/{id} once traffic has cut over.

### Delete an identity verification secret

 - [DELETE /secure_mode_secrets/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/identity-verification-secrets/deleteidentityverificationsecret.md): Soft-deletes an identity verification secret. After deletion, any user_hash values signed with that secret will no longer verify — Messenger sessions depending on it will be rejected on their next request. Use this to complete a rotation: create a new secret, roll it out, then delete the old one.

## Internal Articles

Everything about your Internal Articles

### List all articles

 - [GET /internal_articles](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/internal-articles/listinternalarticles.md): You can fetch a list of all internal articles by making a GET request to https://api.intercom.io/internal_articles.

### Create an internal article

 - [POST /internal_articles](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/internal-articles/createinternalarticle.md): You can create a new internal article by making a POST request to https://api.intercom.io/internal_articles.

### Retrieve an internal article

 - [GET /internal_articles/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/internal-articles/retrieveinternalarticle.md): You can fetch the details of a single internal article by making a GET request to https://api.intercom.io/internal_articles/.

### Update an internal article

 - [PUT /internal_articles/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/internal-articles/updateinternalarticle.md): You can update the details of a single internal article by making a PUT request to https://api.intercom.io/internal_articles/.

### Delete an internal article

 - [DELETE /internal_articles/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/internal-articles/deleteinternalarticle.md): You can delete a single internal article by making a DELETE request to https://api.intercom.io/internal_articles/.

### Search for internal articles

 - [GET /internal_articles/search](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/internal-articles/searchinternalarticles.md): You can search for internal articles by making a GET request to https://api.intercom.io/internal_articles/search.

## Jobs

Everything about jobs

### Retrieve job status

 - [GET /jobs/status/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/jobs/jobsstatus.md): Retrieve the status of job execution.

## Macros

Operations related to saved replies (macros) in conversations

### List all macros

 - [GET /macros](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/macros/listmacros.md): You can fetch a list of all macros (saved replies) in your workspace for use in automating responses.

The macros are returned in descending order by updated_at.

Pagination

This endpoint uses cursor-based pagination via the starting_after parameter. The cursor is a Base64-encoded JSON array containing [updated_at, id] of the last item from the previous page.

Placeholder Transformation

The API transforms Intercom placeholders to a more standard XML-like format:
- From: {{user.name | fallback: 'there'}}
- To: ``

### Retrieve a macro

 - [GET /macros/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/macros/getmacro.md): You can fetch a single macro (saved reply) by its ID. The macro will only be returned if it is visible to the authenticated user based on its visibility settings.

Visibility Rules

A macro is returned based on its visible_to setting:
- everyone: Always visible to all team members
- specific_teams: Only visible if the authenticated user belongs to one of the teams specified in visible_to_team_ids

If a macro exists but is not visible to the authenticated user, a 404 error is returned.

Placeholder Transformation

The API transforms Intercom placeholders to a more standard XML-like format in the body field:
- From: {{user.name | fallback: 'there'}}
- To: ``

Default values in placeholders are HTML-escaped for security.

## Messages

Everything about your messages

### Create a message

 - [POST /messages](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/messages/createmessage.md): You can create a message that has been initiated by an admin. The conversation can be either an in-app message, an email, sms or whatsapp.

> 🚧 Sending for visitors
>
> There can be a short delay between when a contact is created and when a contact becomes available to be messaged through the API. A 404 Not Found error will be returned in this case.

This will return the Message model that has been created.

> 🚧 Retrieving Associated Conversations
>
> As this is a message, there will be no conversation present until the contact responds. Once they do, you will have to search for a contact's conversations with the id of the message.

### Get statuses of all messages sent based on the specified ruleset_id

 - [GET /messages/status](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/messages/getwhatsappmessagestatus.md): Retrieves statuses of messages sent from the Outbound module. Currently, this API only supports WhatsApp messages.


This endpoint returns paginated status events for WhatsApp messages sent via the Outbound module, providing
information about delivery state and related message details.

### Retrieve WhatsApp message delivery status

 - [GET /messages/whatsapp/status](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/messages/retrievewhatsappmessagestatus.md): Retrieves the delivery status of a specific WhatsApp message by its message ID.


Returns the current status, conversation details, and any error information if the message failed to deliver.

### Get statuses of all messages sent based on the specified ruleset_id

 - [GET /messages/status](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/whatsapp/getwhatsappmessagestatus.md): Retrieves statuses of messages sent from the Outbound module. Currently, this API only supports WhatsApp messages.


This endpoint returns paginated status events for WhatsApp messages sent via the Outbound module, providing
information about delivery state and related message details.

### Retrieve WhatsApp message delivery status

 - [GET /messages/whatsapp/status](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/whatsapp/retrievewhatsappmessagestatus.md): Retrieves the delivery status of a specific WhatsApp message by its message ID.


Returns the current status, conversation details, and any error information if the message failed to deliver.

## WhatsApp

### Get statuses of all messages sent based on the specified ruleset_id

 - [GET /messages/status](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/messages/getwhatsappmessagestatus.md): Retrieves statuses of messages sent from the Outbound module. Currently, this API only supports WhatsApp messages.


This endpoint returns paginated status events for WhatsApp messages sent via the Outbound module, providing
information about delivery state and related message details.

### Retrieve WhatsApp message delivery status

 - [GET /messages/whatsapp/status](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/messages/retrievewhatsappmessagestatus.md): Retrieves the delivery status of a specific WhatsApp message by its message ID.


Returns the current status, conversation details, and any error information if the message failed to deliver.

### Get statuses of all messages sent based on the specified ruleset_id

 - [GET /messages/status](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/whatsapp/getwhatsappmessagestatus.md): Retrieves statuses of messages sent from the Outbound module. Currently, this API only supports WhatsApp messages.


This endpoint returns paginated status events for WhatsApp messages sent via the Outbound module, providing
information about delivery state and related message details.

### Retrieve WhatsApp message delivery status

 - [GET /messages/whatsapp/status](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/whatsapp/retrievewhatsappmessagestatus.md): Retrieves the delivery status of a specific WhatsApp message by its message ID.


Returns the current status, conversation details, and any error information if the message failed to deliver.

## News

Everything about your News

### List all news items

 - [GET /news/news_items](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/news/listnewsitems.md): You can fetch a list of all news items

### Create a news item

 - [POST /news/news_items](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/news/createnewsitem.md): You can create a news item

### Retrieve a news item

 - [GET /news/news_items/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/news/retrievenewsitem.md): You can fetch the details of a single news item.

### Update a news item

 - [PUT /news/news_items/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/news/updatenewsitem.md)

### Delete a news item

 - [DELETE /news/news_items/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/news/deletenewsitem.md): You can delete a single news item.

### List all live newsfeed items

 - [GET /news/newsfeeds/{id}/items](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/news/listlivenewsfeeditems.md): You can fetch a list of all news items that are live on a given newsfeed

### List all newsfeeds

 - [GET /news/newsfeeds](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/news/listnewsfeeds.md): You can fetch a list of all newsfeeds

### Retrieve a newsfeed

 - [GET /news/newsfeeds/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/news/retrievenewsfeed.md): You can fetch the details of a single newsfeed

## Office Hours

Manage office hours schedules and their exceptions. These endpoints are part of
the `Preview` API version and require an OAuth token with the `read_write_office_hours`
scope. The API is in limited availability — the scope becomes available once the
feature is enabled for your workspace; until then requests return `403 api_plan_restricted`.


### List all office hours schedules

 - [GET /office_hours_schedules](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/office-hours/listofficehoursschedules.md): You can fetch a list of all office hours schedules for the workspace.

### Create an office hours schedule

 - [POST /office_hours_schedules](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/office-hours/createofficehoursschedule.md): You can create a new office hours schedule for the workspace.

### Retrieve an office hours schedule

 - [GET /office_hours_schedules/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/office-hours/getofficehoursschedule.md): You can fetch the details of a single office hours schedule.

### Update an office hours schedule

 - [PUT /office_hours_schedules/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/office-hours/updateofficehoursschedule.md): You can update an existing office hours schedule.

### Delete an office hours schedule

 - [DELETE /office_hours_schedules/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/office-hours/deleteofficehoursschedule.md): You can delete a single office hours schedule.

### List all office hours exceptions

 - [GET /office_hours_schedules/{office_hours_schedule_id}/office_hours_exceptions](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/office-hours/listofficehoursexceptions.md): You can fetch a list of all exceptions for an office hours schedule.

### Create an office hours exception

 - [POST /office_hours_schedules/{office_hours_schedule_id}/office_hours_exceptions](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/office-hours/createofficehoursexception.md): You can create an exception for an office hours schedule. Use closed to mark the day closed (omit time_intervals) or custom_hours to supply replacement intervals.

### Retrieve an office hours exception

 - [GET /office_hours_schedules/{office_hours_schedule_id}/office_hours_exceptions/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/office-hours/getofficehoursexception.md): You can fetch the details of a single office hours exception.

### Update an office hours exception

 - [PUT /office_hours_schedules/{office_hours_schedule_id}/office_hours_exceptions/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/office-hours/updateofficehoursexception.md): You can update an existing office hours exception.

### Delete an office hours exception

 - [DELETE /office_hours_schedules/{office_hours_schedule_id}/office_hours_exceptions/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/office-hours/deleteofficehoursexception.md): You can delete a single office hours exception.

## Procedures

Submit human-collected input to Fin Procedures via the HITL (Human in the Loop) API.

&nbsp;

When a Fin Procedure reaches a HITL step with the API channel enabled, Intercom sends a `procedure.hitl_notification.created` webhook to your system. Your system collects the required input and responds via the callback endpoint documented here.

&nbsp;

{% admonition type="warning" %}
This API requires the Procedures HITL API feature to be enabled for your workspace and an OAuth token with the `write_conversations` scope.
{% /admonition %}


### Submit human input to a Fin Procedure HITL step

 - [POST /procedures/{conversation_id}/collect_agent_input](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/procedures/collectprocedureagentinput.md): Submit human-collected input to a Fin Procedure that is paused at a Human in the Loop (HITL) step.

When a procedure reaches a HITL step with the API channel enabled, Intercom sends a procedure.hitl_notification.created webhook. Use the callback_url from that webhook payload to call this endpoint with the collected attribute values.

The step_id must match the one from the webhook payload, and attribute_values must include a value for every attribute listed in attributes_to_collect.

{% admonition type="info" name="Authentication" %}
This endpoint requires an OAuth token with the write_conversations scope. The admin associated with the token must have access to the conversation.
{% /admonition %}

{% admonition type="warning" name="Feature access" %}
This endpoint requires the Procedures HITL API feature to be enabled for your workspace.
{% /admonition %}

## Switch

Everything about Switch

### Create a phone Switch

 - [POST /phone_call_redirects](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/switch/createphoneswitch.md): You can use the API to deflect phone calls to the Intercom Messenger.
Calling this endpoint will send an SMS with a link to the Messenger to the phone number specified.

If custom attributes are specified, they will be added to the user or lead's custom data attributes.

## Tickets

Everything about your tickets

### Add tag to a ticket

 - [POST /tickets/{ticket_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/attachtagtoticket.md): You can tag a specific ticket. This will return a tag object for the tag that was added to the ticket.

### Remove tag from a ticket

 - [DELETE /tickets/{ticket_id}/tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tags/detachtagfromticket.md): You can remove tag from a specific ticket. This will return a tag object for the tag that was removed from the ticket.

### Reply to a ticket

 - [POST /tickets/{id}/reply](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/replyticket.md): You can reply to a ticket with a message from an admin or on behalf of a contact, or with a note for admins.

### Add tag to a ticket

 - [POST /tickets/{ticket_id}/tags](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/attachtagtoticket.md): You can tag a specific ticket. This will return a tag object for the tag that was added to the ticket.

### Remove tag from a ticket

 - [DELETE /tickets/{ticket_id}/tags/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/detachtagfromticket.md): You can remove tag from a specific ticket. This will return a tag object for the tag that was removed from the ticket.

### Create a ticket

 - [POST /tickets](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/createticket.md): You can create a new ticket.

### Enqueue create ticket

 - [POST /tickets/enqueue](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/enqueuecreateticket.md): Enqueues ticket creation for asynchronous processing, returning if the job was enqueued successfully to be processed. We attempt to perform a best-effort validation on inputs before tasks are enqueued. If the given parameters are incorrect, we won't enqueue the job.

### Update a ticket

 - [PUT /tickets/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/updateticket.md): You can update a ticket.

### Retrieve a ticket

 - [GET /tickets/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/getticket.md): You can fetch the details of a single ticket.

### Delete a ticket

 - [DELETE /tickets/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/deleteticket.md): {% admonition type="warning" name="Irreversible operation" %}
Deleting a ticket is permanent and cannot be reversed.
{% /admonition %}

Deleting a ticket permanently removes it from the inbox. All sensitive data is deleted, including admin and user replies, ticket attributes, uploads, and related content. The ticket will still appear in reporting, though some data may be incomplete due to the deletion.

### Change ticket type

 - [POST /tickets/{ticket_id}/change_type](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/changetickettype.md): You can change the type of a ticket. The new ticket type must be in the same category as the current type. Attributes matching by name and type are automatically transferred from the old type; values provided in ticket_attributes override transferred values.

### Search tickets

 - [POST /tickets/search](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/tickets/searchtickets.md): You can search for multiple tickets by the value of their attributes in order to fetch exactly which ones you want.

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
| admin_assignee_id                         | Integer                                                                                  |
| team_assignee_id                          | Integer                                                                                  |
| open                                      | Boolean                                                                                  |
| state                                     | String                                                                                   |
| snoozed_until                             | Date (Unix timestamp in seconds)                                                                    |
| ticket_attribute.{id}                     | String or Boolean or Date (Unix timestamp in seconds) or Float or Integer                           |

{% admonition type="info" name="Searching by Category" %}
When searching for tickets by the category field, specific terms must be used instead of the category names:
* For Customer category tickets, use the term request.
* For Back-office category tickets, use the term task.
* For Tracker category tickets, use the term tracker.
{% /admonition %}

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

### Retrieve team metrics

 - [GET /teams/{team_id}/metrics](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/teams/getteammetrics.md): Returns real-time activity metrics for admins in the specified team. For each admin, the response includes counts of open, idle, and snoozed conversations.

This endpoint requires the realtime_monitoring feature to be enabled for your workspace.

### List all teams

 - [GET /teams](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/teams/listteams.md): This will return a list of team objects for the App.

### Retrieve a team

 - [GET /teams/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/teams/retrieveteam.md): You can fetch the details of a single team, containing an array of admins that belong to this team.

## Ticket States

Everything about your ticket states

### List all ticket states

 - [GET /ticket_states](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ticket-states/listticketstates.md): You can get a list of all ticket states for a workspace.

## Ticket Type Attributes

Everything about your ticket type attributes

### Create a new attribute for a ticket type

 - [POST /ticket_types/{ticket_type_id}/attributes](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ticket-type-attributes/createtickettypeattribute.md): You can create a new attribute for a ticket type.

### Update an existing attribute for a ticket type

 - [PUT /ticket_types/{ticket_type_id}/attributes/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ticket-type-attributes/updatetickettypeattribute.md): You can update an existing attribute for a ticket type.

## Ticket Types

Everything about your ticket types

### List all ticket types

 - [GET /ticket_types](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ticket-types/listtickettypes.md): You can get a list of all ticket types for a workspace.

### Create a ticket type

 - [POST /ticket_types](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ticket-types/createtickettype.md): You can create a new ticket type.
> 📘 Creating ticket types.
>
> Every ticket type will be created with two default attributes: _default_title_ and _default_description_.
> For the icon propery, use an emoji from Twemoji Cheatsheet

### Retrieve a ticket type

 - [GET /ticket_types/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ticket-types/gettickettype.md): You can fetch the details of a single ticket type.

### Update a ticket type

 - [PUT /ticket_types/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/ticket-types/updatetickettype.md): You can update a ticket type.

> 📘 Updating a ticket type.
>
> For the icon propery, use an emoji from Twemoji Cheatsheet

## Visitors

Everything about your Visitors

### Update a visitor

 - [PUT /visitors](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/visitors/updatevisitor.md): Sending a PUT request to /visitors will result in an update of an existing Visitor.

Option 1. You can update a visitor by passing in the user_id of the visitor in the Request body.

Option 2. You can update a visitor by passing in the id of the visitor in the Request body.

### Retrieve a visitor with User ID

 - [GET /visitors](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/visitors/retrievevisitorwithuserid.md): You can fetch the details of a single visitor.

### Convert a visitor

 - [POST /visitors/convert](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/visitors/convertvisitor.md): You can merge a Visitor to a Contact of role type lead or user.

> 📘 What happens upon a visitor being converted?
>
> If the User exists, then the Visitor will be merged into it, the Visitor deleted and the User returned. If the User does not exist, the Visitor will be converted to a User, with the User identifiers replacing it's Visitor identifiers.

## Workflows

Export workflow configurations from your workspace.

### Export a workflow

 - [GET /export/workflows/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/workflows/exportworkflow.md): Export a workflow configuration by its ID. This endpoint returns the complete workflow definition including its steps, targeting rules, and attributes.

This endpoint is designed for EU Data Act compliance, allowing customers to export their workflow configurations.

{% admonition type="info" name="Preview API" %}
  This endpoint is available in the Preview API version. We may make iterative improvements, including adding new fields or refining existing ones.
{% /admonition %}

## Export

### Enqueue a new reporting data export job

 - [POST /export/reporting_data/enqueue](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/export/paths/~1export~1reporting_data~1enqueue/post.md)

### Get export job status

 - [GET /export/reporting_data/{job_identifier}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/export/paths/~1export~1reporting_data~1%7Bjob_identifier%7D/get.md)

### List available datasets and attributes

 - [GET /export/reporting_data/get_datasets](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/export/paths/~1export~1reporting_data~1get_datasets/get.md)

### Download completed export job data

 - [GET /download/reporting_data/{job_identifier}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/export/paths/~1download~1reporting_data~1%7Bjob_identifier%7D/get.md): Download the data from a completed reporting data export job.

> Octet header required
>
> You will have to specify the header Accept: application/octet-stream when hitting this endpoint.

## Folders

### List all folders

 - [GET /folders](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/folders/listfolders.md): You can fetch a list of all folders for organizing content by making a GET request to https://api.intercom.io/folders.

### Create a folder

 - [POST /folders](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/folders/createfolder.md): You can create a new folder for organizing content by making a POST request to https://api.intercom.io/folders.

### Retrieve a folder

 - [GET /folders/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/folders/retrievefolder.md): You can fetch the details of a single folder by making a GET request to https://api.intercom.io/folders/.

### Update a folder

 - [PUT /folders/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/folders/updatefolder.md): You can update a folder by making a PUT request to https://api.intercom.io/folders/.

### Delete a folder

 - [DELETE /folders/{id}](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/folders/deletefolder.md): You can delete a folder (if it contains no content) by making a DELETE request to https://api.intercom.io/folders/.

