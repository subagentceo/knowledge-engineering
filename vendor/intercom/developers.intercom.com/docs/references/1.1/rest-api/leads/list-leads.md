# List Leads

## Example Request

```curl
$ curl https://api.intercom.io/contacts \\\n-H 'Authorization:Bearer <Your access token>' \\\n-H 'Accept: application/json'\n\n\n
```

```curl
HTTP/1.1 200 OK\n\n{\n  \"type\": \"contact.list\",\n  \"total_count\": 105,\n  \"contacts\": [\n    {\n      \"type\": \"contact\",\n      \"id\": \"530370b477ad7120001d\",\n       ...\n     },\n     ...\n   ],\n  \"pages\": {\n    \"next\": \"https://api.intercom.io/contacts?per_page=50&page=2\",\n    \"page\": 1,\n    \"per_page\": 50,\n    \"total_pages\": 3\n  }\n}\n\n# NB: Full Contact objects are returned
```

```ruby
intercom.contacts.all.each { ... }
```

```php
<?php\n$leads= $intercom->leads->getLeads([]);\nforeach ($leads->contacts as $lead) {\n    print_r($lead->id);\n    echo \"\\n\";\n}\n?>
```

```java
ContactCollection contacts = Contact.list();\n\n// get first page...\nList<Contact> items = contacts.getPageItems();\n\n// ...or iterate over all pages\nwhile (contacts.hasNext()) {\n    out.println(contacts.next().getID());\n}
```

You can fetch a list of all leads. The lead list is sorted by the `created_at` field and by default is ordered descending, most recently created first. Apart from sorting, the same parameters for the [User list](#list-users) apply here.