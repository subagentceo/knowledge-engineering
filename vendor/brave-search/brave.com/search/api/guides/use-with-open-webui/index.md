# How to use Brave Search with Open WebUI

Search API Guides > Cookbooks

# How to use Brave Search with Open WebUI

Published May 2, 2024

Share on X (formerly Twitter) Share on Reddit Share on Telegram Share on LinkedIn

_This guide covers the steps required to enable Brave Search as the default search engine in Open WebUI, a free and extensible self-hosted AI interface. Since both Brave Search API and any Open WebUI frameworks or libraries can evolve quickly, it’s best to always check the official documentation for the most up-to-date details._

## 1. Install Open WebUI using Docker

Follow the official documentation to install Open WebUI on your choice Linux, Mac, or Windows: https://docs.openwebui.com/getting-started/quick-start

There are a few ways to do this, but Open WebUI officially supports and recommends using Docker.

 ![](/static-assets/images/optimized/search/api/guides/use-with-open-webui/images/image-1.png)

## 2. Access the WebUI in your browser.

Once the image is installed and running via a container in Docker, visit `http://localhost:3000` in your browser. Naturally, we suggest using Brave but any major browser will do.

 ![](/static-assets/images/optimized/search/api/guides/use-with-open-webui/images/image-2.png)

## 3. Sign-up and create a key for Brave Search API

*   Register or login to a Brave Search API account.
*   For use with Open WebUI, you must ensure you are subscribed to one of the “Data for AI” plans, which are found under the “Subscriptions” tab in the left hand menu of the dashboard.
*   On the same menu, visit **API keys** and click on **“Add API Key”** to generate a new key. A dialogue box will appear asking you to name the key and select which of your subscribed plans to use.

_Note: free plans are usually more than enough for personal use (2,000 free queries)_

 ![](/static-assets/images/optimized/search/api/guides/use-with-open-webui/images/image-3.png)

## 4. Add your API key to Open WebUI

Once you’ve logged-in to Open WebUI using the earlier steps, navigate to `http://localhost:3000/admin/settings`.

Next, on the left rail, select **“Web Search”** from the list of options.

On the right hand side of the screen, toggle **“Enable Web Search”**.

Then, from the list of search engines, select **“brave”**.

Finally, paste in the API key you created in the Brave Search API dashboard and hit **“Save”** in the bottom right corner.

 ![](/static-assets/images/optimized/search/api/guides/use-with-open-webui/images/image-4.png)

## 5. Test it out

Note: You’ll need to have a Large Language Model (LLM) connected to the UI. You can use hosted models via API keys, or you can host your own local model. In this case, we’re using Ollama, and following their official guides for setting up Ollama with Open WebUI.

*   Click **“New Chat”** in the upper left corner.
*   In the chat/search bar, hit the plus button and toggle **“Web Search”**
*   Type in something like _“Tell me a random fun fact about the Roman Empire”_ and watch your custom chatbot answer with the help of Brave Search.

 ![](/static-assets/images/optimized/search/api/guides/use-with-open-webui/images/image-5.png)

Share on X (formerly Twitter) Share on Reddit Share on Telegram Share on LinkedIn

Next: Mapping the AI software and…

## Related articles

### How to add Brave Search to Claude Desktop with MCP

May 6, 2025

This guide covers the steps required to enable Brave Search as a tool to be used in the Claude desktop app using the Model Context Protocol (MCP). Since both Brave’s and Anthropic’s products are evolving quickly, it’s best to always check official documentation for the most up-to-date information and instructions. In order to use MCP, you will need to have Node.js installed on your computer. Please note that some Windows users have encountered issues with MCP when using a node installer, rather than node version manager.

Read this article

### How to use Brave Search with Dify

May 6, 2025

This guide will help you get set up with the Brave Search API in Dify, an open-source platform designed to simplify AI application development, and offer real-time, accurate search results as part of AI agent orchestration. Dify offers an intuitive interface that brings together AI workflows, RAG pipelines, and agent capabilities, empowering developers to rapidly move from initial concept to production-ready applications. Sign-up and create a key for Brave Search API Register or login to a Brave Search API account.

Read this article

### How to use Brave Search with n8n (local)

May 6, 2025

This guide covers the steps to enable Brave Search via the official Brave Search community node in n8n.io, a flexible and community-driven automation platform. Please note, this covers the local version of n8n. Sign-up and create a key for Brave Search API Register or login to a Brave Search API account. For use with n8n, you must ensure you are subscribed to one of the Data for AI plans, which are found under the Subscriptions tab in the left hand menu of the dashboard.

Read this article