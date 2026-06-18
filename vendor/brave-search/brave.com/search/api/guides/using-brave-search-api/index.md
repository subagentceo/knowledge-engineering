# Using Brave Search for higher quality training data and better AI

Search API Guides > An intro to Search APIs

# Using Brave Search for higher quality training data and better AI

Published Dec 15, 2023

Share on X (formerly Twitter) Share on Reddit Share on Telegram Share on LinkedIn

Training data is the starting point for any machine learning (ML) approach to artificial intelligence (AI). Most of the major large language models (LLMs) making headlines in the AI industry today are first pre-trained on vast amounts of raw text to “learn” how to model language through next-word prediction (and, by proxy, to “understand” and “speak” language). But in order for that raw-text training data to be useful, it needs to be diverse—that is, to span a wide variety of genres, topics, viewpoints, languages, and more.

Large and diverse data sets can help reduce the errors, biases, and misrepresentations that might be more pronounced in smaller data sets. These larger data sets can also help mitigate the risk of ML models internalizing and perpetuating biases or other misrepresentations. By training on sufficiently large and diverse data sets, ML models can become more knowledgeable, fair, and representative of the real world.

## The world’s largest data source: the Internet

When people look for information, they typically turn to the Internet—because it contains a virtually unlimited amount of data consisting of diverse topics, languages, styles, and so on. For this reason, the Web is also an excellent resource for those working in AI. Some LLMs can ingest raw text from the Web, and even take in additional inputs like images.

Taking Google’s search index as the lower bound of the volume of data on the Web, we can safely assume that there are hundreds of billions of webpages, which total at least hundreds of petabytes (or hundreds of millions of gigabytes) in size. The actual size of the Internet is, of course, substantially larger than what’s represented in Google’s search index—if you include the Dark Web, Deep Web, and other private or unindexed parts. And the Web continues to grow at an enormous rate: projections indicate that 97 petabytes of data—that’s 97 _trillion_ gigabytes—were added to the Internet in 2022 alone.

### Organizing the mess of data to make it more useful

The Web is certainly a large data set, but it can actually be _too_ large to be useful, particularly because so much of that data can be poor quality. There’ve been many attempts to distill the Web’s massive amount of data into a smaller, higher-quality data set. The Common Crawl, for example, is one of the most popular starting points to meaningfully organize, or index, the Web.

![Distilling the Web&rsquo;s data](/search/api/guides/using-brave-search-api/images/Brave-Blog-05.svg)

Distilling the Web’s data

The Common Crawl is a non-profit organization that crawls the Web and provides snapshots of its contents, usually on a monthly basis. The October 2023 crawl, for example, contains 3.4 billion webpages, and almost half a petabyte of uncompressed content. It’s a very large data set that’s often cited as a training source for large, well-funded LLMs like Google T5, OpenAI’s GPT-3, and Gopher. Smaller LLMs with fewer resources will often use smaller, more curated data sets.

Despite its popularity, the Common Crawl isn’t perfect. While it boasts a large and fairly broad data set, researchers have observed that the Common Crawl shows an overrepresentation of young people from developed countries. Two key sources for that data (Reddit and Wikipedia) skew young and male. (Reddit, for example, has a user base that’s 62% male, and 39% between the ages of 18–29; only 9–15% of Wikipedia contributors are female.) This means AI models trained on the Common Crawl would incorporate similar biases.

To counter this, there have been many attempts to take massive data sets like the Common Crawl and refine, filter, or supplement them so the data is more manageable and equitable. These include:

*   WebText/OpenWebText (40 GB)
*   C4 (806 GB)
*   GPT-3 (2.7 PB)
*   The Pile (825 GB)

### Key takeaways for AI models trained on Internet text

In attempting to catalog all of the information on the Web, and then distill the most useful and relevant information out of it, a few key insights have emerged:

*   There’s a massive amount of (public and private) data out there
*   Computing and resource limitations prevent most LLMs from training on large data sets (e.g. the Common Crawl)
*   The quality of uncurated data sets is much lower than curated ones
*   It’s important to be aware of inherent biases and flaws in training data
*   AI projects should look for more accessible, better curated, high-quality data sets that fit their needs

## How Brave can help with AI training data

Brave’s private, independent, AI-driven search engine—Brave Search—is worth any developer’s consideration to fuel AI training data needs. In this section, we’ll provide some background on what makes Brave Search unique, discuss a few ways Brave Search integrates AI, and show how you can use search data (via the Brave Search API) to train and power your own AI.

### What’s Brave Search?

Brave Search is Brave’s independent search engine, and the default search engine for many of the Brave Browser’s 65M+ users. Brave is unique in that it has its own index of the Web—it doesn’t rely on any other search engine for its results. It’s the only independent, global-scale search engine outside of Google and Bing. (Supposedly “alternative” search engines like Yahoo or DuckDuckGo are totally reliant on Microsoft Bing).

But this independence doesn’t mean compromising on index size, completeness, or quality. The Brave Search index contains over 19 billion webpages, and indexes about 50–70 million new pages every day, including new and refreshed content for timely results. Brave Search also supports 30 different languages.

And thanks to Brave’s Web Discovery Project mechanism (which allows real users to contribute anonymous data about the pages they’re actually visiting), Brave’s index is much more representative of the Web people actually care about. It’s not burdened with the junk or spam pages that get included when the main indexing method is simple Web crawlers.

Contrast that with Google/Bing (and the engines that use those Big Tech indexes) which have an extremely long tail of junk sites—spam, dead links, duplicates, and more—that make it into their respective indexes. In this sense, Brave considers its index to represent the 99% of the Web that people _actually_ want to visit.

Just as others have filtered and curated the Common Crawl, Brave Search is like a filtered search index that’s been curated by its millions of actual users.

### How Brave Search integrates AI

Brave introduced AI-powered experiences into Brave Search more than a year before the current AI craze began. This gives Brave a leg up in data quality. One such implementation is the AI Summarizer, which returns AI-powered, contextual answers at the top of the search results page (SERP). And, unlike other, similar experiences, the Summarizer cites its sources, which gives users confidence that responses aren’t hallucinations, but rather rooted in real results.

### How to use search data to optimize AI inference

Today, search engines are helpful for (some would say critical to) AI applications. There’s a reason why AI chatbots partner with search engines (e.g. ChatGPT partnering with Bing, and Bard heavily leveraging Google search)—search engines are probably the best tool for grounding LLM responses in real-world information.

And this is true for a couple reasons:

*   Search engines return real-time results (as opposed to a static data set that has a cutoff time).
*   Search engines can augment user queries with extra information, which is a crucial step for many AI applications.

Most AI applications don’t just take user prompts and feed them directly into an LLM; they first run user inputs through a search engine to gather formatted search results, and _then_ run both parts through an LLM. Doing so helps prevent hallucinations, and provides some confidence as to where a language model’s information is coming from and how accurate it may be.

For example, Brave built the Summarizer on a much smaller ML model than many of the big names in AI right now, yet it’s still capable of achieving extremely high performance. This is because the Summarizer is hooked up to a real-time feed of search data.

To this end, the Brave Search index (via the Brave Search API) can be used for two key AI applications:

*   To serve as a crawler for assembling a data set to train AI models
*   To help at the time of inference—when a trained model must make predictions or outputs on entirely new data or inputs—via a process known as retrieval augmentation generation, or RAG (basically when a model retrieves new information that it wasn’t originally trained on)

## What is the Brave Search API, and why should it be used for AI applications?

When it comes to AI training, the Brave Search API is a viable and affordable alternative to Big Tech search APIs. The Brave Search API offers a unique index built on high-quality data from real user visits to real webpages. The Brave Search API can be used to train AI models (with full access to the entire index), and to feed results to AI models for inference.

It’s also available at affordable prices, with different plans and tiers to accommodate different use cases and usage rates for developers—including AI-specific offerings and free plans. Brave is proud to offer AI developers access to its high-quality, independent search engine that’s backed by Brave’s open-source philosophy—Brave doesn’t support walled gardens, prohibitive pricing, or other measures that limit users’ ability to access valuable data.

Learn more about what sets the Brave Search API apart from competitors, or visit brave.com/api/ to get started.

Share on X (formerly Twitter) Share on Reddit Share on Telegram Share on LinkedIn

Previous: How does the Brave Search API…

Next: What is a search engine API?

## Related articles

### What is a search engine API?

Sep 22, 2023

An application programming interface, or API, is a set of code that takes inputs, and produces outputs according to specific rules. In this quick primer, learn how search engine APIs work, and how they can power the AI applications you use everyday.

Read this article