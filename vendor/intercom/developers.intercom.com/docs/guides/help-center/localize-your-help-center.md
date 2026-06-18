# Localize your Help Center

This tutorial will walk you through adding content in multiple languages to your Help Center. It assumes you already have at least one article that you wish to present in other languages, to serve your customers better. If you don't, follow [this tutorial](/docs/guides/help-center/create-an-article) to create an article in English.

What you'll need:

- `article_id` for the article you'd like to localize
- Help Center content written in an additional language (German in this tutorial)
- Help Center that is set up to [support multiple locales](https://www.intercom.com/help/en/articles/3107388-support-multiple-languages-in-your-help-center)


Once you have that, adding a locale support takes one API call:

```curl
curl --request PUT \
     --url https://api.intercom.io/articles/<article_id> \
     --header 'Intercom-Version: 2.9' \
     --header 'accept: application/json' \
     --header 'authorization: Bearer <Your access token>' \
     --header 'content-type: application/json' \
     --data '
{
  "translated_content": {
    "de": {
      "type": "article_content",
      "title": "So erstellen Sie einen Hilfeartikel",
      "body": "Eine einfache Möglichkeit, einen Artikel zu erstellen, ist die Intercom API.",
      "state": "published"
    },
    "type": "article_translated_content"
  }
}
'
```

You should now see the German article in your Help Center:

![Translated Help Center Article](/assets/translated-article.04bfd1d0b5b89822058f6dde01d146d4a5ab082628fa2645c5ec923d6dc653c8.71a4f21c.png)

In case you decide to hide this translation from your Help Center at a later stage, update the state of the German locale from `published` to `draft`:

```curl
curl --request PUT \
     --url https://api.intercom.io/articles/<article_id> \
     --header 'Intercom-Version: 2.9' \
     --header 'accept: application/json' \
     --header 'authorization: Bearer <Your access token>' \
     --header 'content-type: application/json' \
     --data '
{
  "translated_content": {
    "de": {
      "type": "article_content",
      "state": "draft"
    },
    "type": "article_translated_content"
  }
}
'
```

The German version of the article will be hidden from your Help Center, while the original will remain active. Both versions will still be available for editing from inside Intercom.

## Next steps

- [Learn more](https://www.intercom.com/help/en/collections/2094785-articles) about Articles as a product.
- Explore [Articles API](https://developers.intercom.com/intercom-api-reference/reference/listarticles).
- Explore [Collections and Sections API](https://developers.intercom.com/intercom-api-reference/reference/listallcollections).