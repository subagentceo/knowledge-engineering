# The collection & section models

## Example Collection Object

### JSON

```json
{  \"id\": 1,  \"type\": \"collection\",  \"workspace_id\": \"abcdef\",  \"name\": \"Default language name\",  \"description\": \"Default language description\",   \"created_at\": 123456,  \"updated_at\": 123456,  \"url\": \"http://intercom.test/help/collection/name\",  \"icon\": \"http://intercom/help_center/icon-1\",  \"order\": 0,  \"default_locale\": \"en\",  \"translated_content\": {    \"type\": \"group_translated_content\",    \"fr\": {      \"type\": \"group_content\",      \"name\": \"French name\",      \"description\": \"French description\"    }  }}
```

## Example Section Object

```json
{
  "id": 1,
  "type": "section",
  "workspace_id": "abcdef",
  "name": "Default language name",
  "created_at": 123456,
  "updated_at": 123456,
  "url": "http://intercom.test/help/section/name",
  "icon": "http://intercom/help_center/icon-1",
  "order": 0,
  "collection_id": "1",
  "default_locale": "en",
  "translated_content": {
    "type": "group_translated_content",
    "fr": {
      "type": "group_content",
      "name": "French name"
    }
  }
}
```

The Help Center API is a central place to gather all information and take actions on those elements within a Help Center - namely the collections and sections. Collections are top level containers for Articles within the Help Center. Sections are subdivisions of a collection, with a collection potentially having multiple sections.

For articles you should refer to the [Articles endpoint](https://developers.intercom.com/docs/references/2.1/rest-api/articles/the-article-model/).

### Collection Object

| Key | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `collection`. |
| id | String | The unique identifier for the collection which is given by Intercom. |
| workspace_id | String | The id of the workspace which the collection belongs to. |
| name | String | The name of the collection.  For multilingual help centers, this will be the title of the default language's content. |
| description | String | The description of the collection.  For multilingual help centers, this will be the description of the collection for the default language. |
| created_at | Timestamp | The time when the article was created.  For multilingual articles, this will be the timestamp of creation of the default language's content. |
| updated_at | Timestamp | The time when the article was last updated.  For multilingual articles, this will be the timestamp of last update of the default language's content. |
| url | String | The URL of the collection.  For multilingual help centers, this will be the URL of the collection for the default language. |
| icon | String | The icon for the collection. |
| order | Integer | The order of the section in relation to others sections within a collection.  Values go from `0` upwards.  `0` is the default if there's no order. |
| default_locale | String | The default locale of the help center.  This field is only returned for multilingual help centers. |
| translated_content | Object | An [Group Translated Content Object](#section-group-translated-content-object) for multilingual articles.  This field is only returned for multilingual help centers. |


### Section Object

| Key | Type | Description |
|  --- | --- | --- |
| type | String | The type of object - `section`. |
| id | String | The unique identifier for the section which is given by Intercom. |
| workspace_id | String | The id of the workspace which the section belongs to. |
| name | String | The name of the section.  For multilingual help centers, this will be the name of the section for the default language. |
| created_at | Timestamp | The time when the section was created.  For multilingual help centers, this will be the timestamp of the section's creation for the default language. |
| updated_at | Timestamp | The time when the section was last updated.  For multilingual help centers, this will be the timestamp of the section's last update for the default language. |
| url | String | The URL of the section.  For multilingual help centers, this will be the URL of the section for the default language. |
| icon | String | The icon for the section. |
| order | Integer | The order of the section in relation to others sections within a collection.  Values go from `0` upwards.  `0` is the default if there's no order. |
| parent_id | String | The id of the collection to which this section belongs to. |
| default_locale | String | The default locale of the help center.  This field is only returned for multilingual help centers. |
| translated_content | Object | An [Group Translated Content Object](#group-translated-content-object) for multilingual articles.  This field is only returned for multilingual help centers. |


### Group Translated Content Object

| Key | Type | Writeable? | Description |
|  --- | --- | --- | --- |
| type | String | No | The type of object - `group_translated_content`. |
| <locale>    `ar`, `bg`, `bs`, `ca`, `cs`, `da`, `de`, `'de-form'`, `el`, `en`, `es`, `et`, `fi`, `fr`, `he`, `hr`, `hu`, `id`, `it`, `ja`, `ko`, `lt`, `lv`, `mn`, `nb`, `nl`, `pl`, `'pt-BR'`, `pt`, `ro`, `ru`, `sl`, `sr`, `sv`, `tr`, `vi`, `'zh-CN'`, `'zh-TW'` | Object | Yes | An [Group Content Object](#group-content-object) for each supported locale of the multilingual help center.  The default locale's content and information will be contained in the initial [Collection Object](#collection-object) or [Section Object](#section-object) respectively.  If there's no content for a locale, the value will be `nil`. |


### Group Content Object

| Key | Type | Writeable? | Description |
|  --- | --- | --- | --- |
| type | String | No | The type of object - `group_content`. |
| name | String | Yes | The name of the collection or section. |
| description | String | Yes | The description of the collection.  Only available for collections. |