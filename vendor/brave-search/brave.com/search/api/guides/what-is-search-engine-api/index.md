# What is a search engine API?

Search API Guides > An intro to Search APIs

# What is a search engine API?

Published Sep 22, 2023 (Last updated Jun 27, 2024)

Share on X (formerly Twitter) Share on Reddit Share on Telegram Share on LinkedIn

An application programming interface, or API, is a set of code that takes inputs and produces outputs according to specific rules. APIs are used to build websites, apps, and pretty much any other type of software. There are lots of different kinds of APIs that do all kinds of different things.

Some APIs are internal and private—designed to handle processes that make an app or website actually work (e.g. an app might use an API to enable you to save a new credit card to your profile). Other times, an API can be publicly available for developers or end users to use (e.g. the X—formerly Twitter—API which allows you to interact with X outside the app, using code and API “calls”).

A search engine API, then, is a standardized interface that’s designed to interact directly with a search engine outside of the normal interface (e.g. using code, rather than visiting a site like google.com). It’s a way to send queries to—and gather results from—a search engine within another website, program, or app.

![Search engine API](/search/api/guides/what-is-search-engine-api/images/Brave-Blog-24.svg)

Search engine API

## Why are search engine APIs important for developers?

Why would someone interact with a site like Bing or X via an API as opposed to the Bing website or the X app? It’s mainly developers who do this, and it’s mostly in order to build apps or software “on top of” another service. In fact, APIs are a crucial, everyday tool for developers—if an app or website needs some sort of functionality that you don’t want to build from scratch, using an API is usually the best (or only) option.

This is especially true for apps and sites that need search functionality. It’s extremely expensive and labor-intensive to start and run a search engine. Not to mention, Big Tech search engines like Google and Bing have several decades worth of a head start, so competing is always an uphill battle. Because it’s so difficult to start and operate a search engine, most search apps make the easy decision to do search via an API.

### Search engine APIs for AI applications

Search engine APIs are also particularly important for AI companies, or anybody developing AI-powered tools. Search engines can provide real-time data feeds to AI models, which can greatly expand a model’s capabilities.

Take, for example, large language model (LLM) chatbots, like ChatGPT. These AI models have gained recent popularity for their ability to act as powerful digital assistants, but they have some core limitations, too. Namely, many LLM models are trained on static sets of data, which is why you’ll sometimes see a message like “I’m sorry, but I don’t have access to real-time data, and my knowledge was last updated in January 2022.” AI search engine APIs provide a solution to these kinds of limitations.

## How end users interact with search engine APIs

End users may be using a search engine API and not even be aware of it (because it’s built into the app they’re using). Apps can communicate with a search engine behind the scenes, and then produce search results directly within the app. That’s exactly how DuckDuckGo works—it’s built on the Bing Search API, meaning it requests search results from Bing behind the scenes.

LinkedIn, for another example, shows users an estimated commute time when browsing jobs using the Bing Maps API. Users must provide some info (like a home address, and if they’ll be driving, walking, or taking public transportation), then LinkedIn can automatically calculate the distance and travel time associated with job listings. Users only see the travel time (e.g. “45-minute commute”), but on the back-end, LinkedIn is communicating with Bing to deliver search (and Maps) results directly on the LinkedIn website/app.

## How does a search engine API work?

Most APIs follow a similar structure: You start with some sort of input, which is then sent to the API, which then produces an output (or result). Here’s how this process works for a search engine API in particular:

### Define a query

You’ll first need a query, or the thing to be searched for. The query can be augmented with different keywords, search filters, sorting parameters, or other criteria that are designed to produce more accurate results. (Think, for example, of searching for a pizza restaurant within a 10 mile radius that’s open at 9:30pm and delivers to your address.)

### “Call” the API

The query is sent from a developer’s app, website, software, etc. to the search engine API using HTTPS requests. This process is known as “calling” the API.

### Process results

The search engine API receives the request (or query) and processes it internally. This includes analyzing keywords, applying search algorithms, and retrieving results—basically the exact same way the search engine normally operates (but in this case it’s taking place behind the scenes rather than on a search engine result page like bing.com).

### Deliver results

The results are returned to the app, website, or software that originally requested them. (Depending on the API and the developer’s application, the results can be delivered in different formats like JSON, XML, or HTML.)

### Result handling

Once the results are delivered to the program, app, or website that originally requested them, it’s up to that software to handle them. Maybe additional processing is needed, or relevant information needs to be extracted, or other functions need to be performed. Once that’s done and the results are ready to display to an end user, they’re shown in the original program, app, or website.

## The impact of search APIs

APIs are a core part of modern software development, and a vital tool for developers. They power many of the apps you use everyday—from news aggregators that might use the X API to detect trending topics, to travel apps that leverage the Bing API to help you search for flights, hotels, and rental cars. But not all search APIs are created equal. Learn more about the Brave Search API and what sets it apart.

And, if you’re looking for a free search engine API, the Brave Search API is available for free for 2,000–5,000 queries per month depending on your use case.

Share on X (formerly Twitter) Share on Reddit Share on Telegram Share on LinkedIn

Previous: Using Brave Search for higher…

## Related articles

### Using Brave Search for higher quality training data and better AI

Dec 15, 2023

Training data is the starting point for any machine learning (ML) approach to artificial intelligence (AI). Most major large language models (LLMs) are first pre-trained on vast amounts of raw text to "learn" how to predict language. But for that raw-text training data to be useful, it needs to be diverse. In this article, we'll explore how the Brave Search API can supply just such a diversity of data, and help you build better AI.

Read this article