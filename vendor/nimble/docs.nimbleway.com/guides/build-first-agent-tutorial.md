> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Build Your First Agent

> Give Claude one prompt and let the Nimble Agents skill handle agent discovery, custom agent generation, and script writing — end to end

## What You'll Build

A Python script that pulls running shoe data from **Amazon**, **Walmart**, and **Nike.com** and outputs a ranked, cross-retailer price comparison — all from a single prompt to your AI coding assistant.

This tutorial shows the core power of Nimble: **Web Search Agents work with any website**, not just the ones in the gallery.

The Nimble Agents skill handles the rest:

* **Finds** pre-built agents for sites already in the gallery (Amazon, Walmart)
* **Generates** a custom agent on the fly for Nike.com — a site with no pre-built agent
* **Writes** the full analysis script using the agents it collected

## Prerequisites

<CardGroup cols={2}>
  <Card title="Nimble Account" icon="user" href="https://online.nimbleway.com/signup">
    Sign up free and grab your API key from Account Settings
  </Card>

  <Card title="Plugin Installed" icon="puzzle-piece" href="/integrations/agent-skills/plugin-installation">
    Install the Nimble plugin for Claude Code or Cursor
  </Card>
</CardGroup>

You'll also need Python 3.8+ and the Nimble SDK:

```bash theme={"system"}
pip install nimble_python
```

***

## Step 1: Give Claude the Prompt

Open a new session in Claude Code (or Cursor) and paste this prompt:

<Tabs>
  <Tab title="Claude Code">
    ```
    Build a Python script that runs competitive analysis on running shoes across
    Amazon, Walmart, and Nike.com. Use Nimble for all data collection.

    For each retailer:
    - Search the Nimble agent gallery for an existing agent. Use it if one exists.
    - If no agent exists for that site, use the Nimble Agents skill to generate
      a custom one, then publish it for reuse.

    The script should collect product name, price, rating (if available), and URL
    from each source, then print a unified list sorted by price and save the full
    results to shoe_analysis.json.

    My Nimble API key is set as the NIMBLE_API_KEY environment variable.
    ```
  </Tab>

  <Tab title="Cursor">
    ```
    Build a Python script that runs competitive analysis on running shoes across
    Amazon, Walmart, and Nike.com. Use Nimble for all data collection.

    For each retailer:
    - Search the Nimble agent gallery for an existing agent. Use it if one exists.
    - If no agent exists for that site, use the Nimble Agents skill to generate
      a custom one, then publish it for reuse.

    The script should collect product name, price, rating (if available), and URL
    from each source, then print a unified list sorted by price and save the full
    results to shoe_analysis.json.

    My Nimble API key is set as the NIMBLE_API_KEY environment variable.
    ```
  </Tab>
</Tabs>

That's it. Claude takes it from here.

***

## What Claude Does Next

Claude works through the task autonomously using the Nimble Agents skill. Here's what happens under the hood:

<Steps>
  <Step title="Searches the gallery for Amazon">
    Claude calls `nimble_agents_list` with the query `"amazon"` and finds `amazon_serp` — a pre-built agent for Amazon search results. It inspects the schema and confirms `keyword` is the required input.
  </Step>

  <Step title="Searches the gallery for Walmart">
    Same flow for Walmart — finds `walmart_search`, confirms it takes a `keyword` param and returns product name, price, and rating.
  </Step>

  <Step title="Finds no agent for Nike — generates one">
    No public agent exists for `nike.com`. Claude calls `nimble_agents_generate` with a description of what's needed, waits for the agent to be created, runs a test extraction, and publishes it as `nike_running_shoes_plp`.
  </Step>

  <Step title="Writes the script">
    With all three agents confirmed, Claude writes `shoe_analysis.py` using the Nimble Python SDK and the agent names it just collected.
  </Step>
</Steps>

The script Claude produces will look something like this:

```python theme={"system"}
import json
import os
from nimble_python import Nimble

nimble = Nimble(api_key=os.environ["NIMBLE_API_KEY"])

KEYWORD = "running shoes"
NIKE_URL = "https://www.nike.com/w/mens-running-shoes"


def fetch_amazon():
    result = nimble.agent.run(
        agent="amazon_serp",
        params={"keyword": KEYWORD}
    )
    products = result.data.parsing.get("parsed", [])
    return [
        {
            "source": "Amazon",
            "name": p.get("product_name"),
            "price": p.get("price"),
            "rating": p.get("average_rating"),
            "url": p.get("product_url"),
        }
        for p in products
        if p.get("price")
    ]


def fetch_walmart():
    result = nimble.agent.run(
        agent="walmart_search",
        params={"keyword": KEYWORD}
    )
    products = result.data.parsing.get("parsed", [])
    return [
        {
            "source": "Walmart",
            "name": p.get("product_name"),
            "price": p.get("price"),
            "rating": p.get("rating"),
            "url": p.get("product_url"),
        }
        for p in products
        if p.get("price")
    ]


def fetch_nike():
    result = nimble.agent.run(
        agent="nike_running_shoes_plp",
        params={"url": NIKE_URL}
    )
    products = result.data.parsing.get("parsed", [])
    return [
        {
            "source": "Nike",
            "name": p.get("product_name"),
            "price": p.get("price"),
            "colors": p.get("colors", []),
            "url": p.get("url"),
        }
        for p in products
        if p.get("price")
    ]


def run_analysis():
    print(f'Competitive analysis: "{KEYWORD}"\n')

    all_products = []

    print("Fetching Amazon...")
    all_products.extend(fetch_amazon())

    print("Fetching Walmart...")
    all_products.extend(fetch_walmart())

    print("Fetching Nike...")
    all_products.extend(fetch_nike())

    sorted_products = sorted(all_products, key=lambda x: x["price"])

    print(f"\n{'=' * 55}")
    print(f"  RESULTS — {len(all_products)} products across 3 retailers")
    print(f"{'=' * 55}\n")

    for i, p in enumerate(sorted_products[:15], 1):
        stars = f" ★{p['rating']}" if p.get("rating") else ""
        colors = f" ({len(p['colors'])} colors)" if p.get("colors") else ""
        print(f"{i:2}. [{p['source']:7}] ${p['price']:<8.2f} {p['name']}{stars}{colors}")

    with open("shoe_analysis.json", "w") as f:
        json.dump(all_products, f, indent=2)

    print(f"\nFull results saved to shoe_analysis.json")


if __name__ == "__main__":
    run_analysis()
```

<Note>
  The exact agent names (e.g. `nike_running_shoes_plp`) are chosen by the skill at generation time. Claude will use whatever names were returned and write the script accordingly — you don't need to track them manually.
</Note>

***

## Step 2: Run the Script

```bash theme={"system"}
python shoe_analysis.py
```

Expected output:

```
Competitive analysis: "running shoes"

Fetching Amazon...
Fetching Walmart...
Fetching Nike...

=======================================================
  RESULTS — 62 products across 3 retailers
=======================================================

 1. [Walmart ] $19.98   Athletic Works Men's Knit Running Shoe ★4.1
 2. [Walmart ] $29.98   Starter Men's Athletic Running Shoe ★4.0
 3. [Walmart ] $44.97   Skechers Go Run Consistent ★4.3
 4. [Amazon  ] $54.99   New Balance Men's 515 V3 Sneaker ★4.5
 5. [Walmart ] $54.98   Nike Downshifter 12 ★4.5
 6. [Amazon  ] $64.99   Adidas Men's Runfalcon 3.0 ★4.6
 7. [Amazon  ] $69.99   Nike Men's Revolution 7 ★4.6
 8. [Nike    ] $110.00  Nike Pegasus Trail 5 (3 colors)
 9. [Amazon  ] $119.95  Brooks Ghost 15 ★4.7
10. [Nike    ] $130.00  Nike Pegasus 41 (5 colors)
...

Full results saved to shoe_analysis.json
```

***

## What's Next

<CardGroup cols={2}>
  <Card title="Talk to an Expert" icon="phone" href="https://nimbleway.com/contact-general/">
    Need help choosing the right approach or scaling up?
  </Card>

  <Card title="Pricing" icon="credit-card" href="/nimble-sdk/admin/pricing">
    View plans and subscribe
  </Card>
</CardGroup>
