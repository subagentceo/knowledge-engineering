> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Quickstart Guide

> Get structured data from any website in minutes — with code or without.

<Tip>
  **Just want to see what Nimble can do?** Skip the setup and [open Nimble
  Studio](https://online.nimbleway.com/workflow-builder) — create a Web Search
  Agent for any website in seconds, no coding required.
</Tip>

<Steps>
  <Step title="Sign Up and Login" titleSize="h3">
    Create your Nimble account at [Nimble Sign Up](https://online.nimbleway.com/signup).

    Already have an account? Just login to [Nimble dashboard](https://online.nimbleway.com/signup).
  </Step>

  <Step title="Get Your API Key" titleSize="h3">
    Now, obtain your API key from the [Account Settings](https://online.nimbleway.com/account-settings/api-keys).
  </Step>

  <Step title="Install the Nimble Plugin" titleSize="h3">
    The fastest way to use Nimble is through Claude Code or Cursor. Install the plugin and your AI assistant can create Web Search Agents for any website automatically.

    <Tabs>
      <Tab title="Claude Code">
        ```bash theme={"system"}
        claude plugin marketplace add Nimbleway/agent-skills
        claude plugin install nimble@nimble-plugin-marketplace
        ```
      </Tab>

      <Tab title="Cursor">
        Add the MCP server (one-click):

        <a href="cursor://anysphere.cursor-deeplink/mcp/install?name=nimble-mcp-server&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vbWNwLm5pbWJsZXdheS5jb20vbWNwIiwiaGVhZGVycyI6eyJBdXRob3JpemF0aW9uIjoiQmVhcmVyIE5JTUJMRV9BUElfS0VZIn19">
          <img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Add to Cursor" noZoom style={{height: "32px"}} />
        </a>

        Then install skills:

        ```bash theme={"system"}
        npx skills add Nimbleway/agent-skills -a cursor
        ```
      </Tab>
    </Tabs>
  </Step>

  <Step title="Try It — Prompt Examples" titleSize="h3">
    With the plugin installed, just describe what you need in plain language. Here are real prompts to try right now:

    **Compare prices across retailers**

    ```
    Compare prices for the Sony WH-1000XM5 headphones across Amazon, Walmart,
    and Best Buy. Show me a table with price, availability, and rating from each.
    ```

    **Monitor a competitor's product catalog**

    ```
    Extract all product names, prices, and categories from https://www.allbirds.com/collections/mens
    and save the results to a JSON file.
    ```

    **Research a market**

    ```
    Search the web for "best CRM tools for startups 2026" and give me a summary
    of the top 10 results with their key features and pricing.
    ```

    **Track search rankings**

    ```
    Search Google for "project management software" and extract the top 20 organic
    results with their title, URL, and position.
    ```

    **Build a lead list from Google Maps**

    ```
    Find all dentists in Austin, TX using Google Maps. Extract their name, address,
    phone number, rating, and number of reviews. Save to a CSV.
    ```

    **Analyze AI responses about your brand**

    ```
    Ask ChatGPT, Perplexity, and Gemini "What is the best web data platform?"
    and compare their responses. Do they mention Nimble?
    ```

    Each prompt works in Claude Code or Cursor with the Nimble plugin. The AI assistant automatically finds or creates the right Web Search Agent, runs it, and returns structured results.

    <Tip>
      These prompts work because the Nimble plugin gives your AI assistant access to Web Search Agents for any website. No need to write code — just describe what data you need.
    </Tip>

    <Card title="Build Your First Agent — Full Tutorial" icon="bullseye-pointer" href="/guides/build-first-agent-tutorial">
      Step-by-step walkthrough: competitive shoe analysis across Amazon, Walmart, and Nike from a single prompt
    </Card>
  </Step>

  <Step title="Next Steps" titleSize="h3">
    <CardGroup cols={2}>
      <Card title="Talk to an Expert" icon="phone" href="https://nimbleway.com/contact-general/">
        Need help choosing the right approach or scaling up?
      </Card>

      <Card title="Pricing" icon="credit-card" href="/nimble-sdk/admin/pricing">
        View plans and subscribe
      </Card>
    </CardGroup>
  </Step>
</Steps>

***

<Card title="Want to build directly with code?" icon="code" href="/nimble-sdk/getting-started/sdk-examples">
  View SDK code examples for Python, Node, and cURL — ready-to-use snippets for
  every Nimble API including Agents, Extract, Search, Map, and Crawl.
</Card>
