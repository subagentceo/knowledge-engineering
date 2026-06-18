# How to use Brave Search with Dify

Search API Guides > Cookbooks

# How to use Brave Search with Dify

Published May 6, 2025

Share on X (formerly Twitter) Share on Reddit Share on Telegram Share on LinkedIn

_This guide will help you get set up with the Brave Search API in Dify, an open-source platform designed to simplify AI application development, and offer real-time, accurate search results as part of AI agent orchestration. Dify offers an intuitive interface that brings together AI workflows, RAG pipelines, and agent capabilities, empowering developers to rapidly move from initial concept to production-ready applications._

## Sign-up and create a key for Brave Search API

Register or login to a Brave Search API account.

For use with Open WebUI, you must ensure you are subscribed to one of the “Data for AI” plans, which are found under the “Subscriptions” tab in the left hand menu of the dashboard.

On the same menu, visit **API keys** and click **Add API Key** to generate a new key. A dialogue box will appear asking you to name the key and select which of your subscribed plans to use.

_Note: free plans are usually more than enough for personal use (2,000 free queries)_

 ![](/static-assets/images/optimized/search/api/guides/use-with-dify/images/image-1.png)

## Choose your Dify configuration

**Cloud**: Access Dify online.

**Self-hosted**: Clone the Dify repository and follow the Docker Compose installation guide, or set it up directly from the local source code.

## Install and configure the Brave Search plugin

Navigate to the **Plugin Marketplace**, search for the Brave tool, and install it to Dify.

 ![](/static-assets/images/optimized/search/api/guides/use-with-dify/images/image-2.png)

Once installed, you’ll be able to insert the API key you created in step one. This will allow Dify to make API requests as part of your AI workflows.

 ![](/static-assets/images/optimized/search/api/guides/use-with-dify/images/image-3.png)

## Use Brave Search in an AI agent workflow

You’re now ready to use the Brave Search tool in a range of ways via the Dify platform. To get familiar with Brave Search in Dify, navigate to **Studio**, and **Create from Blank**. Select the **Agent** app type, which is compatible with tools from the plugin marketplace. This will set you up with a fresh canvas for building your AI agent. You can alternatively browse templates from the Dify community to start from an existing framework someone has built.

 ![](/static-assets/images/optimized/search/api/guides/use-with-dify/images/image-4.png)

Click **Tools** and enable the newly-installed **Brave Search** plugin. Then, using the **Debug & Preview** section of the interface, ask your agent a question and watch in real time as Brave Search is used to fetch context from the Web.

 ![](/static-assets/images/optimized/search/api/guides/use-with-dify/images/image-5.png)

Share on X (formerly Twitter) Share on Reddit Share on Telegram Share on LinkedIn

Previous: How to use Brave Search with n8n…

Next: How to add Brave Search to Claude…

## Related articles

### How to add Brave Search to Claude Desktop with MCP

May 6, 2025

This guide covers the steps required to enable Brave Search as a tool to be used in the Claude desktop app using the Model Context Protocol (MCP). Since both Brave’s and Anthropic’s products are evolving quickly, it’s best to always check official documentation for the most up-to-date information and instructions. In order to use MCP, you will need to have Node.js installed on your computer. Please note that some Windows users have encountered issues with MCP when using a node installer, rather than node version manager.

Read this article

### How to use Brave Search with n8n (local)

May 6, 2025

This guide covers the steps to enable Brave Search via the official Brave Search community node in n8n.io, a flexible and community-driven automation platform. Please note, this covers the local version of n8n. Sign-up and create a key for Brave Search API Register or login to a Brave Search API account. For use with n8n, you must ensure you are subscribed to one of the Data for AI plans, which are found under the Subscriptions tab in the left hand menu of the dashboard.

Read this article

### How to use Brave Search with Open WebUI

May 2, 2024

This guide covers the steps required to enable Brave Search as the default search engine in Open WebUI, a free and extensible self-hosted AI interface. Since both Brave Search API and any Open WebUI frameworks or libraries can evolve quickly, it’s best to always check the official documentation for the most up-to-date details. 1. Install Open WebUI using Docker Follow the official documentation to install Open WebUI on your choice Linux, Mac, or Windows: https://docs.

Read this article