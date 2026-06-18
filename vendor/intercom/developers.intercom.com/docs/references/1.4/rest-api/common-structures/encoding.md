# Encoding

Data is encoded as defined by JSON in [RFC4627](http://www.ietf.org/rfc/rfc4627.txt). The default encoding for APIs is UTF-8. Certain characters, such as Emojji may be handled as surrogate unicode pairs (see section '2.5. Strings' of [RFC4627](http://www.ietf.org/rfc/rfc4627.txt)).

Some query parameters may need to be [url encoded](http://en.wikipedia.org/wiki/Percent-encoding) when sending - for example, the `email` parameter value used to query users should be encoded.

HTML Encoding
It should be noted that the following identifiers are encoded to protect from potential cross-site scripting attacks: '*name*', '*user_id*', '*company_id*' and '*email*'. As a result you may see these identifiers in their encoded format when you retrieve them via the API. \nNote that the characters we encode are double quote, single quote, ampersand, less than and greater than symbols i.e " ' & < >

### HTML Encoding example

```html
Let's say you have a company name like \"X&Y's\". \nThen when you retrieve it from the API it will look like this:\n\"X&amp;Y&#39;s\"
```