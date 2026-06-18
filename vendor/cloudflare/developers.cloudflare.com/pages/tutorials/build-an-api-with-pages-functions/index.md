---
title: Build an API for your front end using Pages Functions
description: This tutorial builds a full-stack Pages application using the React framework.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build an API for your front end using Pages Functions

**Last reviewed:**  over 1 year ago 

In this tutorial, you will build a full-stack Pages application. Your application will contain:

* A front end, built using Cloudflare Pages and the [React framework](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/).
* A JSON API, built with [Pages Functions](https://developers.cloudflare.com/pages/functions/get-started/), that returns blog posts that can be retrieved and rendered in your front end.

If you prefer to work with a headless CMS rather than an API to render your blog content, refer to the [headless CMS tutorial](https://developers.cloudflare.com/pages/tutorials/build-a-blog-using-nuxt-and-sanity/).

## Video Tutorial

## 1\. Build your front end

To begin, create a new Pages application using the React framework.

### Create a new React project

In your terminal, create a new React project called `blog-frontend` using the `create-vite` command. Go into the newly created `blog-frontend` directory and start a local development server:

Create a new React application

```

npx create-vite -t react blog-frontend

cd blog-frontend

npm install

npm run dev


```

### Set up your React project

To set up your React project:

1. Install the [React Router ↗](https://reactrouter.com/en/main/start/tutorial) in the root of your `blog-frontend` directory.

 npm  yarn  pnpm  bun 

```
npm i react-router-dom@6
```

```
yarn add react-router-dom@6
```

```
pnpm add react-router-dom@6
```

```
bun add react-router-dom@6
```

s 
1. Clear the contents of `src/App.js`. Copy and paste the following code to import the React Router into `App.js`, and set up a new router with two routes:

JavaScript

```

import { Routes, Route } from "react-router-dom";


import Posts from "./components/posts";

import Post from "./components/post";


function App() {

  return (

    <Routes>

      <Route path="/" element={<Posts />} />

      <Route path="/posts/:id" element={<Post />} />

    </Routes>

  );

}


export default App;


```

1. In the `src` directory, create a new folder called `components`.
2. In the `components` directory, create two files: `posts.js`, and `post.js`. These files will load the blog posts from your API, and render them.
3. Populate `posts.js` with the following code:

JavaScript

```

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";


const Posts = () => {

  const [posts, setPosts] = useState([]);


  useEffect(() => {

    const getPosts = async () => {

      const resp = await fetch("/api/posts");

      const postsResp = await resp.json();

      setPosts(postsResp);

    };


    getPosts();

  }, []);


  return (

    <div>

      <h1>Posts</h1>

      {posts.map((post) => (

        <div key={post.id}>

          <h2>

            <Link to={`/posts/${post.id}`}>{post.title}</Link>

          </h2>

        </div>

      ))}

    </div>

  );

};


export default Posts;


```

1. Populate `post.js` with the following code:

JavaScript

```

import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";


const Post = () => {

  const [post, setPost] = useState({});

  const { id } = useParams();


  useEffect(() => {

    const getPost = async () => {

      const resp = await fetch(`/api/post/${id}`);

      const postResp = await resp.json();

      setPost(postResp);

    };


    getPost();

  }, [id]);


  if (!Object.keys(post).length) return <div />;


  return (

    <div>

      <h1>{post.title}</h1>

      <p>{post.text}</p>

      <p>

        <em>Published {new Date(post.published_at).toLocaleString()}</em>

      </p>

      <p>

        <Link to="/">Go back</Link>

      </p>

    </div>

  );

};


export default Post;


```

## 2\. Build your API

You will now create a Pages Functions that stores your blog content and retrieves it via a JSON API.

### Write your Pages Function

To create the Pages Function that will act as your JSON API:

1. Create a `functions` directory in your `blog-frontend` directory.
2. In `functions`, create a directory named `api`.
3. In `api`, create a `posts.js` file in the `api` directory.
4. Populate `posts.js` with the following code:

JavaScript

```

import posts from "./post/data";


export function onRequestGet() {

  return Response.json(posts);

}


```

This code gets blog data (from `data.js`, which you will make in step 8) and returns it as a JSON response from the path `/api/posts`.

1. In the `api` directory, create a directory named `post`.
2. In the `post` directory, create a `data.js` file.
3. Populate `data.js` with the following code. This is where your blog content, blog title, and other information about your blog lives.

JavaScript

```

const posts = [

  {

    id: 1,

    title: "My first blog post",

    text: "Hello world! This is my first blog post on my new Cloudflare Workers + Pages blog.",

    published_at: new Date("2020-10-23"),

  },

  {

    id: 2,

    title: "Updating my blog",

    text: "It's my second blog post! I'm still writing and publishing using Cloudflare Workers + Pages :)",

    published_at: new Date("2020-10-26"),

  },

];


export default posts;


```

1. In the `post` directory, create an `[[id]].js` file.
2. Populate `[[id]].js` with the following code:

\[\[id\]\].js

```

import posts from "./data";


export function onRequestGet(context) {

  const id = context.params.id;


  if (!id) {

    return new Response("Not found", { status: 404 });

  }


  const post = posts.find((post) => post.id === Number(id));


  if (!post) {

    return new Response("Not found", { status: 404 });

  }


  return Response.json(post);

}


```

`[[id]].js` is a [dynamic route](https://developers.cloudflare.com/pages/functions/routing#dynamic-routes) which is used to accept a blog post `id`.

## 3\. Deploy

After you have configured your Pages application and Pages Function, deploy your project using the Wrangler or via the dashboard.

### Deploy with Wrangler

In your `blog-frontend` directory, run [wrangler pages deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) to deploy your project to the Cloudflare dashboard.

Terminal window

```

wrangler pages deploy blog-frontend


```

### Deploy via the dashboard

To deploy via the Cloudflare dashboard, you will need to create a new Git repository for your Pages project and connect your Git repository to Cloudflare. This tutorial uses GitHub as its Git provider.

#### Create a new repository

Create a new GitHub repository by visiting [repo.new ↗](https://repo.new). After creating a new repository, prepare and push your local application to GitHub by running the following commands in your terminal:

Terminal window

```

git init

git remote add origin https://github.com/<YOUR-GH-USERNAME>/<REPOSITORY-NAME>

git add .

git commit -m "Initial commit"

git branch -M main

git push -u origin main


```

#### Deploy with Cloudflare Pages

Deploy your application to Pages:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application** \> **Pages** \> **Import an existing Git repository**.
3. Select the new GitHub repository that you created and, in the **Set up builds and deployments** section, provide the following information:

| Configuration option | Value         |
| -------------------- | ------------- |
| Production branch    | main          |
| Build command        | npm run build |
| Build directory      | build         |

After configuring your site, begin your first deploy. You should see Cloudflare Pages installing `blog-frontend`, your project dependencies, and building your site.

By completing this tutorial, you have created a full-stack Pages application.

## Related resources

* Learn about [Pages Functions routing](https://developers.cloudflare.com/pages/functions/routing)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/tutorials/build-an-api-with-pages-functions/#page","headline":"Build an API for your front end using Pages Functions · Cloudflare Pages docs","description":"This tutorial builds a full-stack Pages application using the React framework.","url":"https://developers.cloudflare.com/pages/tutorials/build-an-api-with-pages-functions/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/tutorials/build-an-api-with-pages-functions/","name":"Build an API for your front end using Pages Functions"}}]}
```
