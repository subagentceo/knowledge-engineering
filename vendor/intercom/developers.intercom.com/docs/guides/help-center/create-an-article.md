# Create an Article

This tutorial will walk you through creating an Article inside a Collection via Intercom API.

## Step 1: Create a collection

[A collection](https://www.intercom.com/help/en/articles/56647-create-collections-in-your-help-center) is a way to group your Help Center articles by topics and provide easy navigation for your users.

To create a collection in Intercom, you need to make a call to [Collections API](https://developers.intercom.com/intercom-api-reference/reference/createcollection):


```curl
curl --request POST \
     --url https://api.intercom.io/help_center/collections \
     --header 'Intercom-Version: 2.9' \
     --header 'accept: application/json' \
     --header 'authorization: Bearer <Your access token>' \
     --header 'content-type: application/json' \
     --data '
{
  "name": "Getting started",
  "description": "Everything you need to get started with articles"
}
'
```

This will return the Collection object. You'll need its id in Step 3.

## Step 2: Fetch an author for the article

To create an article, you need to provide the id of its author. In this tutorial, we'll use the currently logged in admin user as an author. You may use the id of any Intercom admin that has the permission to create articles: if they don't, the API will return a `401` error.

We provide a dedicated API to find the admin user who is logged in:


```curl
curl --request GET \
     --url https://api.intercom.io/me \
     --header 'accept: application/json' \
     --header 'authorization: Bearer <Your access token>'
```

This will return the Admin object. You'll need its id in Step 3.

## Step 3: Create an article

To create an article in Intercom, you need to make a call to Articles API :


```curl
curl --request POST \
     --url https://api.intercom.io/articles \
     --header 'accept: application/json' \
     --header 'authorization: Bearer <Your access token>' \
     --header 'content-type: application/json' \
     --data '
{
  "title": "How to create an article",
  "body": "An easy way to create an article is via Intercom API. You can also create an article via Intercom UI.",
  "author_id": <admin_id>,
  "state": "draft",
  "parent_type": "collection",
  "parent_id": <collection_id>,
}
'
```

Once the article is created, you may also choose to make it public by making an update to its state via [the API](https://developers.intercom.com/intercom-api-reference/reference/updatearticle):


```curl
curl --request PUT \
     --url https://api.intercom.io/articles/<article_id> \
     --header 'accept: application/json' \
     --header 'authorization: Bearer <Your access token>' \
     --header 'content-type: application/json' \
     --data '
{
  "state": "published"
}
'
```

You should now see this article in your Help Center:

![Help Center Article](/assets/article.676a14ec0cad9de28b842dae0725baae1caf53e15b95034976220ae92935cd05.71a4f21c.png)

Congrats! You are done.

## Next steps

- See how to [add translated content to your Help Center](/docs/guides/help-center/localize-your-help-center).
- [Learn more](https://www.intercom.com/help/en/collections/2094785-articles) about Articles as a product.
- Explore the [Articles API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Articles/).
- Explore the [Collections API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Help-Center/listAllCollections/).