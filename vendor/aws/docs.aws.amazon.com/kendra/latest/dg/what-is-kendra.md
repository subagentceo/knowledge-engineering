

# What is Amazon Kendra?
<a name="what-is-kendra"></a>

Amazon Kendra is a managed information retrieval and intelligent search service that uses natural language processing and advanced deep learning model. Unlike traditional keyword-based search, Amazon Kendra uses semantic and contextual similarity—and ranking capabilities—to decide whether a text chunk or document is relevant to a retrieval query.

With Amazon Kendra, you can create a unified search and retrieval experience by connecting multiple data repositories to an index and ingesting and crawling documents. You can use your document metadata to create a feature-rich and customized search experience for your users, helping them efficiently find the right answers to their queries.

Amazon Kendra offers a GenAI index that's highly accurate for retrieval augmented generation (RAG) as well as enterprise search on your data. You can use Kendra GenAI indices in [Amazon Q Business](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/what-is.html) and [Amazon Bedrock knowledge bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html) to build generative AI applications using your proprietary data.

**Note**  
You can also use Amazon Kendra's semantic search capabilities to re-rank another search service's results. See [Amazon Kendra Intelligent Ranking](https://docs.aws.amazon.com/kendra/latest/dg/intelligent-rerank.html) for more details.


|  | 
| --- |
|  [![AWS Videos](http://img.youtube.com/vi/59kbpMnncC8/0.jpg)](http://www.youtube.com/watch?v=59kbpMnncC8)  | 

## Querying Amazon Kendra
<a name="kendra-query-types"></a>

You can ask Amazon Kendra the following types of queries:

**Factoid questions**—Simple who, what, when, or where questions, such as *Where is the nearest service center to Seattle?* Factoid questions have fact-based answers that can be returned as a single word or phrase. The answer is retrieved from a FAQ or from your indexed documents.

**Descriptive questions**—Questions where the answer could be a sentence, passage, or an entire document. For example, *How do I connect my Echo Plus to my network?* Or, *How do I get tax benefits for lower income families?*

**Keyword and natural language questions**—Questions that include complex, conversational content where the meaning may not be clear. For example, *keynote address*. When Amazon Kendra encounters a word like "address", which has multiple contextual meanings, it correctly infers the meaning behind the search query and returns relevant information.

## Benefits of Amazon Kendra
<a name="what-is-benefits"></a>

Amazon Kendra is highly scalable, capable of meeting performance demands, is tightly integrated with other AWS services such as [Amazon Q Business](https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/what-is.html), [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html), [Amazon S3](https://docs.aws.amazon.com/kendra/latest/dg/data-source-s3.html) and [Amazon Lex](https://docs.aws.amazon.com/lexv2/latest/dg/faq-bot-kendra-search.html), and offers enterprise-grade security. Some of the benefits of using Amazon Kendra include:

**Simplicity**—Amazon Kendra provides a console and API for managing the documents that you want to search. You can use a simple search API to integrate Amazon Kendra into your client applications, such as websites or mobile applications.

**Connectivity**—Amazon Kendra can connect to third-party data repositories or data sources such as Microsoft SharePoint. You can easily index and search your documents using your data source.

**Accuracy**—Unlike traditional search services that use keyword searches, Amazon Kendra attempts to understand the context of the question and returns the most relevant word, snippet, or document for your query. Amazon Kendra uses machine learning to improve search results over time.

**Security**—Amazon Kendra delivers a highly secure enterprise search experience. Your search results reflect the security model of your organization and can be filtered based on the user or group access to documents. Customers are responsible for authenticating and authorizing user access.

## Amazon Kendra Editions
<a name="kendra-editions"></a>

Amazon Kendra offers three index types: GenAI Enterprise Edition, Basic Enterprise Edition and Basic Developer Edition.

The GenAI Enterprise Edition delivers the highest accuracy by leveraging the latest information retrieval technologies and semantic models. It offers high-availability and is built for production workloads. For the best experience, we recommend using the GenAI Index.

The Basic Enterprise Edition provides semantic search capabilities and offers a high-availability service suitable for production workloads. The Basic Developer Edition also offers semantic search capabilities, designed for building proof-of-concept solutions, but it is not recommended for production workloads. 

For an overview of these indices, see [Index types](https://docs.aws.amazon.com/kendra/latest/dg/hiw-index-types.html).

**Note**  
For a list of regions, endpoints, and service quotas supported by Amazon Kendra, see [Amazon Kendra endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/kendra.html).

## Pricing for Amazon Kendra
<a name="pricing"></a>

You can get started for free with the Amazon Kendra GenAI Enterprise Edition index or the Amazon Kendra Developer Edition index that provides usage of up to 750 hours for the first 30 days. 

**Note**  
Connector usage doesn't qualify for free usage.

After your trial expires, you are charged for all provisioned Amazon Kendra indices, even if they are empty and no queries are run. After the trial expires, there are additional charges for scanning and syncing documents using the Amazon Kendra data sources.

For a complete list of charges and prices, see [Amazon Kendra pricing](https://aws.amazon.com/kendra/pricing/).

## Are you a first-time Amazon Kendra user?
<a name="first-time-user"></a>

If you are a first-time user of Amazon Kendra, we recommend that you read the following sections in order:


|  **1** **[How Amazon Kendra works](how-it-works.md)**  |  **2** **[Getting started](getting-started.md)**  |  **3** **[Creating an index](create-index.md)**  |  **4** **[Adding documents directly to an index with batch upload](in-adding-documents.md)**  |  **5** **[Creating a data source connector](data-source.md)**  |  **6** **[Searching an index](searching.md)**  | 
| --- | --- | --- | --- | --- | --- | 
| Introduces Amazon Kendra components and describes how you use them to create a search solution. | Explains how to set up your account and test the Amazon Kendra search API. | Explains how to use Amazon Kendra to create a search index and to add data sources to sync your documents. | Explains how to add documents directly to an Amazon Kendra index. | Explains how to add documents from your data repository to an Amazon Kendra index. | Explains how to use the Amazon Kendra search API to search an index. | 