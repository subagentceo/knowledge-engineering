> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fast SERP

> Realtime Google SERP APIs, sub-second structured results at high success rates

Nimble **Fast SERP** is a realtime API that returns live Google search results as structured data. Submit a query and get back organic listings, pagination, and related questions, parsed and typed at **low latency** with **high success rates**.

<Note>
  Fast SERP is currently available via the REST API (`api.us.webit.live`) only.
  Native support through the Nimble SDK, CLI, and Python client is coming soon —
  see [sdk.nimbleway.com](https://sdk.nimbleway.com).
</Note>

## Fast SERP SLA

Default SLA and limitations for Fast SERP API

|                      | Default      | Description                                           |
| -------------------- | ------------ | ----------------------------------------------------- |
| **QPS**              | 10 (600 QPM) | Rate limiter - Query per Second                       |
| **p50**              | under 700ms  | Latency                                               |
| **p90**              | under 1000ms | Latency                                               |
| **Organic Results**  | 10           | Results per requets (`google_search` only)            |
| **Page rendering**   | Disabled     | Not including rendered request                        |
| **Country / Locale** | US / en-US   | Fixed — geo-targeting for other regions not supported |

<Callout icon="headset" color="#d87dff">
  Need higher throughput? Fast SERP scales up to 1,000 QPS. [Contact Sales](https://nimbleway.com/contact-general/) to discuss your requirements.
</Callout>

## Quick Start

### Example Request

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST 'https://api.us.webit.live/api/v1/realtime/serp' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "search_engine": "google_search",
      "query": "latest on Nimble"
  }'
  ```
</CodeGroup>

### Example Response

<Accordion title="Full response">
  ```json theme={"system"}
  {
    "url": "https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=NBA+Allstars+2026&q=NBA+Allstars+2026",
    "task_id": "cafe84d0-c599-4cd5-8626-640514086808",
    "status": "success",
    "query_time": "2026-04-22T17:51:08.769Z",
    "html_content": "...",
    "status_code": 200,
    "parsing": {
      "entities": {
        "AnswerBox": [
          {
            "entity_type": "AnswerBox",
            "display_link": "",
            "snippet": "NBANBA",
            "snippet_highlighted": ["NBANBA"]
          }
        ],
        "OrganicResult": [
          {
            "entity_type": "OrganicResult",
            "position": 1,
            "title": "2026 All-Star | Roster",
            "url": "https://www.nba.com/allstar/2026/roster",
            "snippet": "2026 All-Star; Latest; Events. Feb. 13: Ruffles All-Star Celebrity Game · Feb. 13: Castrol Rising Stars...",
            "cleaned_domain": "nba",
            "displayed_url": "https://www.nba.com › allstar › 2026 › roster"
          },
          {
            "entity_type": "OrganicResult",
            "position": 2,
            "title": "2026 NBA All-Star Game",
            "url": "https://en.wikipedia.org/wiki/2026_NBA_All-Star_Game",
            "snippet": "In the championship round, the USA Stars defeated the USA Stripes to win the tournament. Anthony Edwards was named the All-Star Most Valuable Player (MVP).",
            "cleaned_domain": "wikipedia",
            "displayed_url": "https://en.wikipedia.org › wiki › 2026_NBA_All-Star_..."
          },
          {
            "entity_type": "OrganicResult",
            "position": 3,
            "title": "2026 All-Star Latest",
            "url": "https://www.nba.com/allstar/2026",
            "snippet": "Luka, Giannis lead 2026 All-Star starters. The 10 All-Star starters were revealed on Monday and will participate in the 75th NBA All-Star Game...",
            "cleaned_domain": "nba",
            "displayed_url": "https://www.nba.com › allstar"
          },
          { "...": "5 more results" }
        ],
        "Pagination": [
          {
            "entity_type": "Pagination",
            "current_page": 1,
            "next_page_url": "https://www.google.com/search?q=NBA+All+Stars+2026&hl=en&gl=us&start=10&...",
            "other_page_urls": {
              "3": "https://www.google.com/search?q=NBA+All+Stars+2026&start=20&...",
              "4": "https://www.google.com/search?q=NBA+All+Stars+2026&start=30&...",
              "...": "pages 5–10"
            }
          }
        ],
        "RelatedQuestion": [
          { "entity_type": "RelatedQuestion", "question": "Where is NBA All-Star 2026?" },
          { "entity_type": "RelatedQuestion", "question": "Why is 69 not allowed in the NBA?" },
          { "entity_type": "RelatedQuestion", "question": "How are NBA All-Star teams selected 2026?" },
          { "entity_type": "RelatedQuestion", "question": "How many All-Star players are in 2026?" }
        ],
        "RelatedSearch": [
          { "entity_type": "RelatedSearch", "position": "1", "query": "Nba all stars 2026 roster", "url": "/search?..." },
          { "entity_type": "RelatedSearch", "position": "2", "query": "Nba all stars 2026 schedule", "url": "/search?..." },
          { "entity_type": "RelatedSearch", "position": "3", "query": "NBA All-Star 2027", "url": "/search?..." },
          { "...": "5 more" }
        ]
      },
      "total_entities_count": 22,
      "entities_count": {
        "AnswerBox": 1,
        "OrganicResult": 8,
        "Pagination": 1,
        "RelatedQuestion": 4,
        "RelatedSearch": 8
      },
      "metrics": {}
    },
    "input_url": "https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=NBA+Allstars+2026&q=NBA+Allstars+2026",
    "nimble_pagination": {
      "next_page_url": "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=...",
      "other_pages": ["..."]
    },
    "nimble_links": {
      "next_page": "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=...",
      "other_pages": ["..."]
    },
    "nimble_payload": {
      "next_page": {
        "search_engine": "google_search",
        "query": "NBA Allstars 2026",
        "country": "US",
        "locale": "en",
        "page_params": "q=NBA+All+Stars+2026&start=10&..."
      },
      "other_pages": ["..."]
    },
    "driver": "vx6"
  }
  ```
</Accordion>

## How it works

<Steps>
  <Step title="Provide a query and search engine">
    Supply the search query, target engine (`google_search`), and optional
    geo-targeting
  </Step>

  <Step title="Nimble runs the search">
    Runs via Nimble's low-latency infrastructure with geo-targeting applied, no
    rendering delays, no blocking
  </Step>

  <Step title="Results returned as structured data">
    Data is returned as parsed entity arrays under `data.parsing.entities`, with
    optional raw HTML when `"html"` is included in `formats`
  </Step>
</Steps>

## Parameters

<AccordionGroup>
  <Accordion icon="magnifying-glass" title="search_engine - Required">
    <ParamField path="search_engine" type="string" required>
      The search engine to query.

      | Value           | Description                |
      | --------------- | -------------------------- |
      | `google_search` | Standard Google web search |
      | `google_news`   | Google News results        |
      | `google_images` | Google Images results      |
    </ParamField>
  </Accordion>

  <Accordion icon="text" title="query">
    <ParamField path="query" type="string">
      The search query string. Required for `google_search`, `google_news`, and `google_images`.

      **Example:** `"NBA Allstars 2026"`
    </ParamField>
  </Accordion>

  <Accordion icon="location-crosshairs" title="location">
    <ParamField path="location" type="string">
      Location context for the search. Accepted for `google_search` and `google_images`.

      You can pass either:

      * A **location string**: Nimble resolves it to the corresponding UULE value (e.g. `"United States"`, `"New York, NY"`)
      * A **raw UULE value**: Google's encoded location parameter (e.g. `"w+CAIQICIiChIJOwQ..."`)

      **Examples:**

      * `"United States"`
      * `"London, England"`
    </ParamField>
  </Accordion>

  <Accordion icon="clock" title="time">
    <ParamField path="time" type="string">
      Filter results by time range. Only supported for `google_search` and `google_images`.

      **Options:**

      | Value   | Description   |
      | ------- | ------------- |
      | `hour`  | Past hour     |
      | `day`   | Past 24 hours |
      | `week`  | Past week     |
      | `month` | Past month    |
      | `year`  | Past year     |

      If omitted, no time filter is applied.
    </ParamField>
  </Accordion>

  <Accordion icon="code" title="no_html">
    <ParamField path="no_html" type="boolean">
      When set to `true`, removes the `html_content` field from the response. Useful for reducing response size when raw HTML is not needed.

      **Default:** `false`
    </ParamField>
  </Accordion>

  <Accordion icon="list-ol" title="num_results">
    <ParamField path="num_results" type="integer" default="10">
      Number of results to return. Supported on `google_search`.

      | Engine          | Range | Default |
      | --------------- | ----- | ------- |
      | `google_search` | 1–100 | 10      |
    </ParamField>
  </Accordion>

  <Accordion icon="forward" title="start">
    <ParamField path="start" type="integer">
      Offsets the results by this number of listings. For example, `start: 20` skips the first 20 results and returns the next page.

      **Example:** `20`
    </ParamField>
  </Accordion>

  <Accordion icon="file-code" title="include_pages_html">
    <ParamField path="include_pages_html" type="boolean" default="false">
      When `true`, returns raw HTML per individual result page instead of a single stitched HTML string. Only relevant when `num_results` exceeds 10. Supported on `google_search` and `google_images`.

      **Default:** `false`
    </ParamField>
  </Accordion>

  <Accordion icon="mobile" title="device">
    <ParamField path="device" type="string">
      Emulate a specific device type. Supported on `google_search` and `google_images`.

      | Value    | Description                  |
      | -------- | ---------------------------- |
      | `mobile` | Mobile user-agent and layout |

      If omitted, defaults to desktop.
    </ParamField>
  </Accordion>
</AccordionGroup>

## Search Engines

### Google Search

Returns organic web results, pagination, related questions, top stories, answer boxes, and more.

**Supported parameters:**

* [`query`](#parameters) — search query string (required)
* [`num_results`](#parameters) — number of results to return, 1–100, default 10
* [`start`](#parameters) — result offset for fetching beyond the first batch
* [`location`](#parameters) — physical location context (string or raw UULE value)
* [`time`](#parameters) — filter results by recency (`hour`, `day`, `week`, `month`, `year`)
* [`include_pages_html`](#parameters) — return per-page HTML instead of a single stitched string
* [`device`](#parameters) — emulate a specific device type (`mobile`)
* [`no_html`](#parameters) — omit `html_content` from the response

```bash cURL theme={"system"}
curl -X POST 'https://api.us.webit.live/api/v1/realtime/serp' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search_engine": "google_search",
    "query": "NBA Allstars 2026"
}'
```

<Accordion title="Example Response">
  ```json theme={"system"}
  {
    "url": "https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=NBA+Allstars+2026&q=NBA+Allstars+2026",
    "task_id": "7c1c8d49-d277-4fa4-accc-a7838704e4f2",
    "status": "success",
    "query_time": "2026-04-22T18:32:33.448Z",
    "html_content":"...",
    "status_code": 200,
    "headers": {...},
    "parsing": {
        "entities": {
            "AnswerBox": [
                {
                    "display_link": "",
                    "entity_type": "AnswerBox",
                    "snippet": "NBANBA",
                    "snippet_highlighted": [
                        "NBANBA"
                    ]
                }
            ],
            "InlineImages": [
                {
                    "entity_type": "InlineImages",
                    "title": "Sign in to customize",
                    "url": "https://accounts.google.com/ServiceLogin?ec=oo-seaport-srp-sp-11135&continue=https://www.google.com/search?hl%3Den%26gl%3Dus%26ie%3DUTF-8%26sourceid%3Dchrome%26oq%3DNBA%2BAllstars%2B2026%26q%3DNBA%2BAllstars%2B2026%26ptid%3D11135%26ptt%3D8%26fpts%3D1776882756183"
                }
            ],
            "OrganicResult": [
                {
                    "cleaned_domain": "nba",
                    "displayed_url": "https://www.nba.com › allstar › 2026 › roster",
                    "entity_type": "OrganicResult",
                    "position": 1,
                    "snippet": "USA Stripes · PTS21.9 · AST3.8 · REB5.6 · Logo. LeBron James Headshot. #23 | Frontcourt. LeBron James. PTS21.3; AST7; REB5.7 · Logo. Kawhi Leonard Headshot. #2 ...Read more",
                    "title": "2026 All-Star | Roster",
                    "url": "https://www.nba.com/allstar/2026/roster"
                },
                {
                    "cleaned_domain": "wikipedia",
                    "displayed_url": "https://en.wikipedia.org › wiki › 2026_NBA_All-Star_...",
                    "entity_type": "OrganicResult",
                    "position": 2,
                    "snippet": "The 2026 NBA All-Star Game was a round-robin tournament played on February 15, 2026, the 75th edition. It was hosted by the Los Angeles Clippers at the Intuit ...Read more",
                    "title": "2026 NBA All-Star Game",
                    "url": "https://en.wikipedia.org/wiki/2026_NBA_All-Star_Game"
                },
                {
                    "cleaned_domain": "nba",
                    "displayed_url": "https://www.nba.com › allstar › 2026",
                    "entity_type": "OrganicResult",
                    "position": 3,
                    "snippet": "Luka, Giannis lead 2026 All-Star starters. The 10 All-Star starters were revealed on Monday and will participate in the 75th NBA All-Star Game on Feb. 15 in ...Read more",
                    "title": "2026 NBA All-Star",
                    "url": "https://www.nba.com/allstar/2026"
                },
                {
                    "cleaned_domain": "instagram",
                    "displayed_url": "2.3M+ followers",
                    "entity_type": "OrganicResult",
                    "position": 4,
                    "snippet": "The 76th NBA All-Star game will be played on Sunday, Feb. 21, at Mortgage Matchup Center, home of the Suns. ... During 2026 @nbaallstar Weekend, we brought ...Read more",
                    "title": "NBA All-Star (@nbaallstar) • Instagram photos and videos",
                    "url": "https://www.instagram.com/nbaallstar/"
                },
                {
                    "cleaned_domain": "youtube",
                    "displayed_url": "3.2M+ views  ·  2 months ago",
                    "entity_type": "OrganicResult",
                    "position": 5,
                    "thumbnails": [
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqcWF8Bn5OW-MaPYGOrRQeDzl_2KLntdg-50IJq_KrDsOVgk2l7XNfZg&s"
                    ],
                    "title": "The FULL 2026 NBA All-Star Game Tournament | USA vs. World",
                    "url": "https://www.youtube.com/watch?v=CvrN7O9i9rE"
                },
                {
                    "cleaned_domain": "nba",
                    "displayed_url": "https://nbaevents.nba.com › all-star",
                    "entity_type": "OrganicResult",
                    "position": 6,
                    "snippet": "‍Experience basketball's biggest weekend as NBA All-Star 2026 takes over Los Angeles for its historic 75th celebration — a milestone moment that unites fans ...Read more",
                    "title": "All Star 2026 - NBA Events",
                    "url": "https://nbaevents.nba.com/all-star"
                },
                {
                    "cleaned_domain": "youtube",
                    "displayed_url": "587.7K+ views  ·  2 months ago",
                    "entity_type": "OrganicResult",
                    "position": 7,
                    "thumbnails": [
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzjGEYW3zhWa0jfSlNNBqXxpozKaGRxKaUf9rvNWhKlKh70vISyajAMA&s"
                    ],
                    "title": "The FULL 2026 NBA All-Star Teams Introductions",
                    "url": "https://www.youtube.com/watch?v=W9X8fErBuhc"
                },
                {
                    "cleaned_domain": "nba",
                    "displayed_url": "https://www.nba.com › allstar › 2026 › schedule",
                    "entity_type": "OrganicResult",
                    "position": 8,
                    "snippet": "The 2026 NBA All-Star Game will take place on Sunday, Feb. 15, 2026 in Los Angeles, California at the Intuit Dome, the home of the LA Clippers.Read more",
                    "title": "2026 All-Star | Schedule",
                    "url": "https://www.nba.com/allstar/2026/schedule"
                },
                {
                    "cleaned_domain": "reddit",
                    "displayed_url": "110+ comments  ·  2 months ago",
                    "entity_type": "OrganicResult",
                    "position": 9,
                    "snippet": "Here are the team rosters for 2026 NBA All-Star Game · Jaylen Brown · Jalen Brunson · Stephen Curry · Kevin Durant · LeBron James · Kawhi ...Read more",
                    "title": "Here are the team rosters for 2026 NBA All-Star Game",
                    "url": "https://www.reddit.com/r/nba/comments/1qv9up1/here_are_the_team_rosters_for_2026_nba_allstar/"
                }
            ],
            "Pagination": [
                {
                    "current_page": 1,
                    "entity_type": "Pagination",
                    "next_page_url": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=QxTpabiuJofT5NoPsPHHkQo&start=10&sa=N&sstk=Af77f_fqrAvqh4RSU5FcjmR6jQAbPZfQh93Dv1YJhOCHeJAgqntBAHS8eQKX8znirLwPWIqDdvpHwSGPS12Yh8U9npvr-DeFQHEq3A&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8NMDegQISxAW",
                    "other_page_urls": {
                        "3": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=QxTpabiuJofT5NoPsPHHkQo&start=20&sa=N&sstk=Af77f_fqrAvqh4RSU5FcjmR6jQAbPZfQh93Dv1YJhOCHeJAgqntBAHS8eQKX8znirLwPWIqDdvpHwSGPS12Yh8U9npvr-DeFQHEq3A&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAG",
                        "4": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=QxTpabiuJofT5NoPsPHHkQo&start=30&sa=N&sstk=Af77f_fqrAvqh4RSU5FcjmR6jQAbPZfQh93Dv1YJhOCHeJAgqntBAHS8eQKX8znirLwPWIqDdvpHwSGPS12Yh8U9npvr-DeFQHEq3A&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAI",
                        "5": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=QxTpabiuJofT5NoPsPHHkQo&start=40&sa=N&sstk=Af77f_fqrAvqh4RSU5FcjmR6jQAbPZfQh93Dv1YJhOCHeJAgqntBAHS8eQKX8znirLwPWIqDdvpHwSGPS12Yh8U9npvr-DeFQHEq3A&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAK",
                        "6": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=QxTpabiuJofT5NoPsPHHkQo&start=50&sa=N&sstk=Af77f_fqrAvqh4RSU5FcjmR6jQAbPZfQh93Dv1YJhOCHeJAgqntBAHS8eQKX8znirLwPWIqDdvpHwSGPS12Yh8U9npvr-DeFQHEq3A&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAM",
                        "7": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=QxTpabiuJofT5NoPsPHHkQo&start=60&sa=N&sstk=Af77f_fqrAvqh4RSU5FcjmR6jQAbPZfQh93Dv1YJhOCHeJAgqntBAHS8eQKX8znirLwPWIqDdvpHwSGPS12Yh8U9npvr-DeFQHEq3A&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAO",
                        "8": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=QxTpabiuJofT5NoPsPHHkQo&start=70&sa=N&sstk=Af77f_fqrAvqh4RSU5FcjmR6jQAbPZfQh93Dv1YJhOCHeJAgqntBAHS8eQKX8znirLwPWIqDdvpHwSGPS12Yh8U9npvr-DeFQHEq3A&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAQ",
                        "9": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=QxTpabiuJofT5NoPsPHHkQo&start=80&sa=N&sstk=Af77f_fqrAvqh4RSU5FcjmR6jQAbPZfQh93Dv1YJhOCHeJAgqntBAHS8eQKX8znirLwPWIqDdvpHwSGPS12Yh8U9npvr-DeFQHEq3A&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAS",
                        "10": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=QxTpabiuJofT5NoPsPHHkQo&start=90&sa=N&sstk=Af77f_fqrAvqh4RSU5FcjmR6jQAbPZfQh93Dv1YJhOCHeJAgqntBAHS8eQKX8znirLwPWIqDdvpHwSGPS12Yh8U9npvr-DeFQHEq3A&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAU"
                    }
                }
            ],
            "RelatedQuestion": [
                {
                    "entity_type": "RelatedQuestion",
                    "question": "Where is NBA All-Star 2026?"
                },
                {
                    "entity_type": "RelatedQuestion",
                    "question": "Why is 69 not allowed in the NBA?"
                },
                {
                    "entity_type": "RelatedQuestion",
                    "question": "How are NBA All-Star teams selected 2026?"
                },
                {
                    "entity_type": "RelatedQuestion",
                    "question": "How many All-Star players are in 2026?"
                }
            ],
            "RelatedSearch": [
                {
                    "entity_type": "RelatedSearch",
                    "position": "1",
                    "query": "Nba all stars 2026 roster",
                    "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=Nba+all+stars+2026+roster&sa=X&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ1QJ6BAguEAE"
                },
                {
                    "entity_type": "RelatedSearch",
                    "position": "2",
                    "query": "Nba all stars 2026 schedule",
                    "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=Nba+all+stars+2026+schedule&sa=X&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ1QJ6BAhGEAE"
                },
                {
                    "entity_type": "RelatedSearch",
                    "position": "3",
                    "query": "NBA All-Star 2027",
                    "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=NBA+All-Star+2027&sa=X&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ1QJ6BAhEEAE"
                },
                {
                    "entity_type": "RelatedSearch",
                    "position": "4",
                    "query": "NBA All-Star 2026 reserves",
                    "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=NBA+All-Star+2026+reserves&sa=X&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ1QJ6BAg_EAE"
                },
                {
                    "entity_type": "RelatedSearch",
                    "position": "5",
                    "query": "NBA All-Star 2026 Celebrity Game",
                    "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=NBA+All-Star+2026+Celebrity+Game&sa=X&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ1QJ6BAg7EAE"
                },
                {
                    "entity_type": "RelatedSearch",
                    "position": "6",
                    "query": "NBA All-Star 2026 3-Point Contest",
                    "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=NBA+All-Star+2026+3-Point+Contest&sa=X&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ1QJ6BAg3EAE"
                },
                {
                    "entity_type": "RelatedSearch",
                    "position": "7",
                    "query": "NBA All-Star 2026 voting",
                    "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=NBA+All-Star+2026+voting&sa=X&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ1QJ6BAg2EAE"
                },
                {
                    "entity_type": "RelatedSearch",
                    "position": "8",
                    "query": "Nba all stars 2026 location",
                    "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=Nba+all+stars+2026+location&sa=X&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ1QJ6BAg1EAE"
                }
            ],
            "TopStory": [
                {
                    "entity_type": "TopStory",
                    "thumbnail": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFwAXAMBEQACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAFBgMEAQIHAAj/xAA6EAACAQMDAgMGBAQEBwAAAAABAgMEBREAEiEGMRNBUQciYXGBkRQyQqEVI7HBM1LR8SRTYnKS4fD/xAAaAQACAwEBAAAAAAAAAAAAAAABBAACAwUG/8QAMREAAQQABQMBBgYDAQAAAAAAAQACAxEEEiExQRMiUXEFYZGhseEUMoHB0fAjQvEG/9oADAMBAAIRAxEAPwDi+PXWiC3XCjBOTqIqaJQo3MNRRXIqh24iijGO+oG2rWonqJQxBcDny1KQtRvJliQxLHz1KQVqz2yS4vI+JRTwgtNIiFsADOB8fhrOSTINBZKZw0AlcS400ak/x70zfj6K2wQwW2zLWwMFlM3i7nZT57cFh6dgARrLJKfzOr0CaOIwrBljiv1Ovy+y3qrlTSW7+IywpV0DShPEgXa8BIJxIpJweODnB8tbgEcpFzgda0VcLGSktvq9rOu+NQ53bfXyPcEH0IOmG4h431QDiNlk3O4wBvFDSqQQWOSfv/rqVE43sVv+JeW5XL1J1OtLAsThgy/9Gc/HOuXLh5mvIFLvwe1oOmA8G/RJAAJ5Onl5Rbq4VfyD66iK3WdiPIfTRUtZQuD/AC8kn4aCi2EEr/oPzOjRKiJ2Wyy3GuSFjsiHvTOP0oO/1PYfPVZHZG5itIozI7KE53O4z0dRTJRFYKWI75GdAI0UdgB+o9uO/A9c6QiGY5378LpyuMYDWbc+Fi2WKx3qnikaBqGOKQSDw5y0QYnkKx95VJHbuM+RyNNPc5vKUiZHJwfii5siQxyzRL4LYX/iIKkEygHA385KnceSM+hyANZRvkcaWr44W0Tf6fdVaa1UEcdU8FJDFPSxGSeCVuaeR1AO04K7T3OO2PPGtXRPI1dV+FIpYWOsR3Xkqrf/AMFT0UVfGse8TSU7oScrKGyFI/7CT27Y1oyOhltZTSCTuIA9ErTV9nlkLS0jq/mExj+uiWu4KWsIJ+BXvJKdXyhUW/g0qj3m3Y9TqdoUViKFCB4UBPxxo2OArBqsrTTkcRgfPUs+EcqxSW+4XG6U9tt0Qmqag4VR2HqSfIDuToOLhohScrjQy9JwU9uLxvKw3yTLysx7Z9cDsNKujdM6idAn45WQx9u5QW/KWqdlTMk3hj3Shyoz6aYiiYG6JeaRzz3L1ru1Naoo2pZJI6hpNswz7pXy/vqkrC60YpQyl0y2r/FbfTxy04eZZmyI2Ee1lGQS2Mp2AG3k+YIGscOczdd1tiW91KZLNXXBIiKMwI8hkqEmkAaJgMiMEKNyHLc+R/zDGmc1jRLV5WK3oWlr45oLrVyLTzzLJGsIA/D4HKhscg9skZ5Oh3eiGleVZi9mXRlPGsZtwmIH53mYk/vqBo5KAJOzVxbwrdD+lCe/vHOmcrAqIFcdj1zlANh7Y0u/fRA7orQXOOleFiiyAA8MMjV920rtdRU6XWUn8FSJ4pqpFURqMszZwoHxydQgWCpn0IC7HZrLTdE9PvUVKCS5yRb6uSIbmA7+Gnn34+J59NZyvA1V2N5XL5bR1b1Vc5qz+E1e6Zs5lHhpGvko3Y4A/wDudYnFwRCs3w1UMch1ITJavZJeZ1Q3e7Q0qeccKmVvucD9jpd3tIbMHxR6Xkpttnsr6VtxEtcktYwHLVUvun5qMDSxxsrtzSOQcBB7dfrb0zcLlLcZGWkkQBHRC5JV+MY9QdN4R1ONprFgmMG6VyL2j011MosVJNlMKKirAAyfRQefrpqWYt0S2Hw4lJcePqhb9S3dJd8t4kYbsbGVdp+WAMefbSgnJdqnzhWBmi5z1bWXQXlzPcKydWXdE4dh7mTxgehzpprmkWubNG+N1JzpfYvep8Guu1DBu42xozn+2rZpDwsyGDUuRiD2KW+PH4281czDyjRFH99FrXnc/JWaGO2tF6P2W9HUYVqmnkkYd/xFScH9wNc/Fyuifka5atj8NRi32rpW2SNJY7fa/wAVTgHfCFZ0znBz3HY6pA85y9xJARynaqS51Z1zU2m4wW620K1F0qwPCkmOIowTj5k/bWz2/iNSe1R1tIaEGouueqrfV1RuU1srhFGxemX+WUYZwFPnzxzrI4aJ2gFLQxuaLNH0S/c/az1NWgrSGnoFI7wx7m+7f6a2bgYhvZSxlPASldbleLnA1TcqyuqYSSN8rMY8+n+XOmGRxs/KAqOe9w1KcupYxLYAABhaYH6rg/20ox1ShdOZtwkID03ViCCWFCFctuzn4D/fWmKB0dwqYJ1As53RDdI5LAAkdyTzpHNadc4MFlB7pcHepAQodi7T585On4IjksrnYmcOfomGt9r/AFVUqViNBTrnjZT7iPqxP9NNWfKStAq3rTqmtOJ73V4PO2NhGB/4gahajncg1VPVVPNXVVE+f+bKzf1OhlA1pAkncp99k1xpLXTXcTBkaYxYdRnsG4x9TpTFvpoBTWFjLrIV6pudPW9UUtQ6PvhjZaUbe+SNzE+vY49M6yiccppNdNoeL3UtzMbP48dHD4coHiOCuH57EHknz1ZptXeAOFzOJVYERxtt8uOw8tdGvK5A12T70THPbrdIslQzicEtTH/CRfiDwWP7fHSEswvtXRgw9DvVLqq8U0IkpfFUzMh92NcBMjgapCxz3Z+FbETNY3JykZasIp2KQc8Ea6F6UuZm1tTrdrlUAU8c8z54CIMsftzrLpRjUhadeV2lohT9JdT1USywWG4lD5mErn6HQM8Q3cq5X+EHCnnONXpBSSfmBz5DWhKFLUtnIZs/IaF6KUj3Sci+JVxRL/OeEFAD+bB5/rpPGtzMFeU7giA8+i3o6ieWrlqfd8WmfCZ/SSMZ/fVGNyih4TEdyyhvNq41v8aoMtSXMOwFmiP5HyOfT/fUikaNU5J7Nlc6nED++FmjjlEi0ENOwk8Qx7F53EfAd/loSudVpbpiM5ePPn3pyi6H6qqKbw6KmipnfvPVyBdnyUZJPz1RkJOr9vH8rCbFACmHXyt6D2FGRvEvF+d3Jywp4sEnz95ic/bTZkfVNAC5/budU2Wv2RdI28hpKF6xx+qplLA/Tt+2siJT+Z37I5hwEeabpfpeDBe12yNR2BSPUIj9T8VO4oJVe1voummMRupkI/VFA7L9wNSn8NQoeV870tivlYw/B2ivlB7FaZ8ffGmDJGN3BTK/wjNL7O+sqzG2yToD5ysqf1Oq/iIvPyKORyM0PsZ6snbMxoab4yTEn9hoidp2BQLa3KIzezeu6NmorrW1iVieMY3SnjICZU4JJPmcDtqspLmUm8Expe43sFVgjp55HnhgRTM24IB3PYZ+PP7nS7zl7F6jBYFkQ679/omG5NNbretvrVjCpThljEalT/M2sSWHcEg4wfyg51u0ZWUQuNKevOZYSRZ39Rp9Dqp7T1B09Y6ua6VPisqqymYIXbHAGMepGc+jaswtDr3Kwmw07YS54por5rNw9u9tj3C22aqqCOFaaRY1P2ydWDXXZXKNcJUuntq6oq2/4GKioE8tsZkb7tx+2jk5UtKl0606nuoIrr7Wuv8AlSTw1+yYGjQ8IWUv8vJuYl2J5Y8k6I00CCkKEd9WpRfSFT7Y+joGKxVVTPjzipmx+4Gk2hw2atKHJQqr9t9nEEj0Vpr5WBwhl2orH7k/trQR+VNEvUPtvvMlQ0dRbLcBJ/hEF1CHyDHJz5DPGrVWqgAJpBeovax1FdI57fWU1DTwE7JY442LjB8mLd+ONX3CMbzFJZGy1oYp6uRI6FmIIBVcg89/sRyPrpJ7OR/f+L1kGI6QMbj27t508f33HlWutGqIa4NJJ+JCju45UZ4wBgAc+Q1aSyN1jhJ2MORjAL8X+5Q2urBUdL1cTxrvRQ24Agg+nbtxq0Tmmgd7VcayQMkcD2lvzSKCdxGcabXllkkeZJ0FFldpzjaMDPvHv8NRFejkCyAntny1AdVFYkkYudseQOARrU2gqqI5zwxGOcaxUKmb3YY8A+efnn/bQJVq0RTpqjSpuCtMRtQFj/bWT3UExh4w5+q91RLBNcmKRqkqEpKV7Pjs3zxq8V1SriKL1ettYZbENrHxKfK5X83u+8h+/H1OspCQ4t/X9iuzh5A/CRuvuY6vXx8kyXCnnq7NT1ryO8wQNkt+YD/1rH/Wls1wZibb5pLMgJSoRBkSIVHHmRxoR6OBTuJaXQvaOQUssCSSDxroLxi9tJHAJ0Q0lBZ8P3d3GriPTVS1vGhyCFz31ZsaFqZEkcEqp4OD2763bC9w0UsBVo5pEjkRXbZIAHAHf00mAEHMDiCeFPQ0ldW1CUtDTyVEzgkRIMkgdzqZL2C0Fk0updPdIzUaqUj8Fz+dpSMjjn5j4g6ybhZZHUBomxPBhxbzR/S1vevZxb6mWeue4ywOw3Mqou0t686fdg2xxk3sudHivxGJDQKBWLf0habQWSVnqI25d5mxgjPYL6Z1zHd2pXaiPSGVvr8NleujUkVmIiBEewpGnfHGBjWJc0Ck3EHyyCt0mQUfhxI5mDOce4FOVxnWJ20XoGMOYg8UhbWf8Rd5wsaiMkts3Y4xnXcw4b0myPFg6LxftGLp4uRjdOfjqqlXbjQxw1AlQwSttwp3FB8Rq2bK8hoSJGmq6lF7M+kqK1m6XK+1M1ME3749qrt+gJJ+us3CZ/5BSuMgOq5neP4WLhMLJTyJRbysLSuWOB+rn1740zAx7Gf5NT54VHlpPZsoYLLcq5TNTwOUPGcgZONMtwkr9QFi6djTRKFLnYedI5QFta7v0NaqK39NUM9LCqzVUCSzS495yRnk+gzwPLTkAGVc/GE9TLx9kaaZgXRcKu8DAHqoJ/fVoxchJNq8oDcGwtFX91TrVEsmyQblK8g6Zc0Oic0pKF5jma9u4KGVbBWbCJ7isRx5gHH9NeSlHavaR6uASdV1k9TVU4lf3WTO0cAaVql6xmHjw7qYFMkaFWbaAdgbj10UzQQ3qMmmp6CeI4eV3jf4qO2up7Lme17mcaH6ryn/AKSJvY+tdkNuyQpFQLFBGnjgNIVByx++vQ4hrW9OgNV5GIk5rK2uEkpsVJEZZPCUTkR7vdzu9NF0bTE0n3otceo4eiE0m1o42ZFbbGOCOD73npSHZtjx9VsRwr9x6mu8lSStX4SgYCRooAAOPTV8Xj5opS1myxZh4wKpf//Z",
                    "url": "https://www.nbc.com/nbc-insider/the-2026-nba-awards-everything-to-know"
                },
                {
                    "entity_type": "TopStory",
                    "thumbnail": "data:image/jpeg;base64,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\\x3d",
                    "url": "https://www.nba.com/news/utah-jazz-announce-return-of-salt-lake-city-summer-league"
                },
                {
                    "entity_type": "TopStory",
                    "thumbnail": "data:image/jpeg;base64,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\\x3d\\x3d",
                    "url": "https://www.olympics.com/en/news/2025-26-nba-awards-full-list-mvp"
                }
            ]
        },
        "total_entities_count": 27,
        "entities_count": {
            "AnswerBox": 1,
            "InlineImages": 1,
            "OrganicResult": 9,
            "Pagination": 1,
            "RelatedQuestion": 4,
            "RelatedSearch": 8,
            "TopStory": 3
        },
        "metrics": {}
    },
    "input_url": "https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=NBA+Allstars+2026&q=NBA+Allstars+2026",
    "nimble_pagination": {
        "next_page_url": "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D10%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8NMDegQISxAW",
        "other_pages": [
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D20%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAG",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D30%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAI",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D40%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAK",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D50%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAM",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D60%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAO",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D70%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAQ",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D80%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAS",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D90%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAU"
        ]
    },
    "nimble_links": {
        "next_page": "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D10%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8NMDegQISxAW",
        "other_pages": [
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D20%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAG",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D30%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAI",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D40%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAK",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D50%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAM",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D60%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAO",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D70%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAQ",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D80%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAS",
            "https://api.us.webit.live/api/v1/realtime/serp?search_engine=google_search&query=NBA+Allstars+2026&country=US&locale=en&page_params=q%3DNBA%2BAll%2BStars%2B2026%26hl%3Den%26ei%3DQxTpabiuJofT5NoPsPHHkQo%26start%3D90%26sa%3DN%26ved%3D2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAU"
        ]
    },
    "nimble_payload": {
        "next_page": {
            "search_engine": "google_search",
            "query": "NBA Allstars 2026",
            "country": "US",
            "locale": "en",
            "page_params": "q=NBA+All+Stars+2026&hl=en&ei=QxTpabiuJofT5NoPsPHHkQo&start=10&sa=N&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8NMDegQISxAW"
        },
        "other_pages": [
            {
                "search_engine": "google_search",
                "query": "NBA Allstars 2026",
                "country": "US",
                "locale": "en",
                "page_params": "q=NBA+All+Stars+2026&hl=en&ei=QxTpabiuJofT5NoPsPHHkQo&start=20&sa=N&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAG"
            },
            {
                "search_engine": "google_search",
                "query": "NBA Allstars 2026",
                "country": "US",
                "locale": "en",
                "page_params": "q=NBA+All+Stars+2026&hl=en&ei=QxTpabiuJofT5NoPsPHHkQo&start=30&sa=N&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAI"
            },
            {
                "search_engine": "google_search",
                "query": "NBA Allstars 2026",
                "country": "US",
                "locale": "en",
                "page_params": "q=NBA+All+Stars+2026&hl=en&ei=QxTpabiuJofT5NoPsPHHkQo&start=40&sa=N&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAK"
            },
            {
                "search_engine": "google_search",
                "query": "NBA Allstars 2026",
                "country": "US",
                "locale": "en",
                "page_params": "q=NBA+All+Stars+2026&hl=en&ei=QxTpabiuJofT5NoPsPHHkQo&start=50&sa=N&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAM"
            },
            {
                "search_engine": "google_search",
                "query": "NBA Allstars 2026",
                "country": "US",
                "locale": "en",
                "page_params": "q=NBA+All+Stars+2026&hl=en&ei=QxTpabiuJofT5NoPsPHHkQo&start=60&sa=N&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAO"
            },
            {
                "search_engine": "google_search",
                "query": "NBA Allstars 2026",
                "country": "US",
                "locale": "en",
                "page_params": "q=NBA+All+Stars+2026&hl=en&ei=QxTpabiuJofT5NoPsPHHkQo&start=70&sa=N&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAQ"
            },
            {
                "search_engine": "google_search",
                "query": "NBA Allstars 2026",
                "country": "US",
                "locale": "en",
                "page_params": "q=NBA+All+Stars+2026&hl=en&ei=QxTpabiuJofT5NoPsPHHkQo&start=80&sa=N&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAS"
            },
            {
                "search_engine": "google_search",
                "query": "NBA Allstars 2026",
                "country": "US",
                "locale": "en",
                "page_params": "q=NBA+All+Stars+2026&hl=en&ei=QxTpabiuJofT5NoPsPHHkQo&start=90&sa=N&ved=2ahUKEwj429OLjIKUAxWHKVkFHbD4MaIQ8tMDegQISxAU"
            }
        ]
    },
    "driver": "vx6"
  }
  ```
</Accordion>

### Google News

Returns recent news articles matching the query, sourced from Google News.

**Supported parameters:**

* [`query`](#parameters) — search query string (required)
* [`no_html`](#parameters) — omit `html_content` from the response

<Warning>
  Pagination not supported. `location` and `time` parameters have no effect on
  this engine.
</Warning>

```bash cURL theme={"system"}
curl -X POST 'https://api.us.webit.live/api/v1/realtime/serp' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search_engine": "google_news",
    "query": "NBA Allstars 2026"
}'
```

<Accordion title="Example Response">
  ```json theme={"system"}
  {
    "url": "https://news.google.com/search?hl=en-US&gl=US&ie=UTF-8&sourceid=chrome&q=NBA+Allstars+2026&ceid=US:en",
    "task_id": "b6102f14-6eca-4a0d-ab92-120507b9b41c",
    "status": "success",
    "query_time": "2026-04-22T18:47:18.169Z",
    "html_content":"...",
    "status_code": 200,
    "headers": {...},
    "parsing": {
        "entities": {
            "NewsResults": [
                {
                    "entity_type": "NewsResults",
                    "head_title": "",
                    "menu_items": [
                        {
                            "position": "1",
                            "query": "U.S.",
                            "url": "CAAqIggKIhxDQkFTRHdvSkwyMHZNRGxqTjNjd0VnSmxiaWdBUAE"
                        },
                        {
                            "position": "2",
                            "query": "World",
                            "url": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB"
                        },
                        {
                            "position": "3",
                            "query": "Local",
                            "url": "CAAqHAgKIhZDQklTQ2pvSWJHOWpZV3hmZGpJb0FBUAE"
                        },
                        {
                            "position": "4",
                            "query": "Business",
                            "url": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pWVXlnQVAB"
                        },
                        {
                            "position": "5",
                            "query": "Technology",
                            "url": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB"
                        },
                        {
                            "position": "6",
                            "query": "Entertainment",
                            "url": "CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtVnVHZ0pWVXlnQVAB"
                        },
                        {
                            "position": "7",
                            "query": "Sports",
                            "url": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnVHZ0pWVXlnQVAB"
                        },
                        {
                            "position": "8",
                            "query": "Science",
                            "url": "CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnVHZ0pWVXlnQVAB"
                        },
                        {
                            "position": "9",
                            "query": "Health",
                            "url": "CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnVLQUFQAQ"
                        }
                    ],
                    "news_results": null,
                    "related_topics": null,
                    "sub_menu_items": [
                        {
                            "title": "Home",
                            "token": "./home?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Home",
                            "token": "./home?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "For you",
                            "token": ""
                        },
                        {
                            "title": "For you",
                            "token": ""
                        },
                        {
                            "title": "Following",
                            "token": ""
                        },
                        {
                            "title": "Following",
                            "token": ""
                        },
                        {
                            "title": "News Showcase",
                            "token": "./showcase?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "News Showcase",
                            "token": "./showcase?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "U.S.",
                            "token": "./topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNRGxqTjNjd0VnSmxiaWdBUAE?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "U.S.",
                            "token": "./topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNRGxqTjNjd0VnSmxiaWdBUAE?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "World",
                            "token": "./topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "World",
                            "token": "./topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx1YlY4U0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Local",
                            "token": "./topics/CAAqHAgKIhZDQklTQ2pvSWJHOWpZV3hmZGpJb0FBUAE?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Local",
                            "token": "./topics/CAAqHAgKIhZDQklTQ2pvSWJHOWpZV3hmZGpJb0FBUAE?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Business",
                            "token": "./topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Business",
                            "token": "./topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Technology",
                            "token": "./topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Technology",
                            "token": "./topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Entertainment",
                            "token": "./topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Entertainment",
                            "token": "./topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNREpxYW5RU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Sports",
                            "token": "./topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Sports",
                            "token": "./topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp1ZEdvU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Science",
                            "token": "./topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Science",
                            "token": "./topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Health",
                            "token": "./topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnVLQUFQAQ?hl=en-US&gl=US&ceid=US%3Aen"
                        },
                        {
                            "title": "Health",
                            "token": "./topics/CAAqIQgKIhtDQkFTRGdvSUwyMHZNR3QwTlRFU0FtVnVLQUFQAQ?hl=en-US&gl=US&ceid=US%3Aen"
                        }
                    ]
                }
            ],
            "Organization": [
                {
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "entity_type": "Organization",
                    "logo": "https://lh3.googleusercontent.com//J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=rj-w300-h300-l95-c0xffffff",
                    "url": "https://news.google.com"
                }
            ]
        },
        "total_entities_count": 2,
        "entities_count": {
            "NewsResults": 1,
            "Organization": 1
        },
        "metrics": {}
    },
    "input_url": "https://news.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&q=NBA+Allstars+2026",
    "redirects": [
        {
            "status_code": 302,
            "url": "https://news.google.com/search?hl=en-US&gl=US&ie=UTF-8&sourceid=chrome&q=NBA+Allstars+2026&ceid=US:en"
        }
    ],
    "initial_status_code": 302,
    "final_url": "https://news.google.com/search?hl=en-US&gl=US&ie=UTF-8&sourceid=chrome&q=NBA+Allstars+2026&ceid=US:en",
    "driver": "vx6"
  }
  ```
</Accordion>

### Google Images

Returns image results for a query, including image URLs, titles, and source pages.

**Supported parameters:**

* [`query`](#parameters) — search query string (required)
* [`start`](#parameters) — result offset for fetching beyond the first batch
* [`location`](#parameters) — physical location context (string or raw UULE value)
* [`time`](#parameters) — filter results by recency (`hour`, `day`, `week`, `month`, `year`)
* [`include_pages_html`](#parameters) — return per-page HTML instead of a single stitched string
* [`device`](#parameters) — emulate a specific device type (`mobile`)
* [`no_html`](#parameters) — omit `html_content` from the response

```bash cURL theme={"system"}
curl -X POST 'https://api.us.webit.live/api/v1/realtime/serp' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search_engine": "google_images",
    "query": "NBA Allstars 2026"
}'
```

<Accordion title="Example Response">
  ```json theme={"system"}
  {
    "url": "https://www.google.com/search?hl=en&gl=us&q=NBA+Allstar+2026&tbm=isch",
    "task_id": "a3f2c1e8-7b14-4d9e-bb21-3e8f9a2c0d15",
    "status": "success",
    "query_time": "2026-03-05T13:50:22.118Z",
    "html_content": "...",
    "status_code": 200,
    "parsing": {
      "entities": {
        "ImageResult": [
          {
            "entity_type": "ImageResult",
            "position": 1,
            "title": "2026 NBA All-Star Game - Wikipedia",
            "source_name": "Wikipedia",
            "source_domain": "en.wikipedia.org",
            "source_url": "https://en.wikipedia.org/wiki/2026_NBA_All-Star_Game",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/.../2026_NBA_All-Star_Game_logo.png",
            "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:...",
            "image_width": 1200,
            "image_height": 800,
            "thumbnail_image_width": 275,
            "thumbnail_image_height": 183
          },
          {
            "entity_type": "ImageResult",
            "position": 2,
            "title": "NBA All-Star 2026 at Intuit Dome - Lakers Nation",
            "source_name": "Lakers Nation",
            "source_domain": "lakersnation.com",
            "source_url": "https://lakersnation.com/nba-all-star-2026-intuit-dome/",
            "image_url": null,
            "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:...",
            "image_width": 1920,
            "image_height": 1080,
            "thumbnail_image_width": 290,
            "thumbnail_image_height": 163
          },
          {
            "entity_type": "ImageResult",
            "position": 3,
            "title": "Stephen Curry named All-Star MVP - ESPN",
            "source_name": "ESPN",
            "source_domain": "espn.com",
            "source_url": "https://www.espn.com/nba/story/_/id/nba-allstar-2026",
            "image_url": "https://a.espncdn.com/photo/2026/0215/r1234567_1296x729_16-9.jpg",
            "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:...",
            "image_width": 1296,
            "image_height": 729,
            "thumbnail_image_width": 290,
            "thumbnail_image_height": 163
          },
          {"...": "97 more results"}
        ]
      },
      "total_entities_count": 100,
      "entities_count": {
        "ImageResult": 100
      },
      "metrics": {}
    },
    "input_url": "https://www.google.com/search?hl=en&gl=us&q=NBA+Allstar+2026&tbm=isch",
    "driver": "vx6"
  }
  ```
</Accordion>

## Response

All responses share the same top-level envelope:

| Field                    | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `task_id`                | Unique request ID                                       |
| `status`                 | `"success"` or `"error"`                                |
| `query_time`             | ISO timestamp of when the query ran                     |
| `status_code`            | HTTP status code from the upstream source               |
| `html_content`           | Raw HTML (omitted when `no_html: true`)                 |
| `parsing.entities`       | Object of typed arrays, keys vary by engine (see below) |
| `parsing.entities_count` | Per-type entity counts                                  |
| `nimble_payload`         | Next-page parameters as a structured object             |
| `driver`                 | Internal routing driver used for this request           |

### Entities by engine

<AccordionGroup>
  <Accordion title="google_search: OrganicResult, AnswerBox, Pagination & more">
    **OrganicResult**: one entry per web result

    | Field            | Type    | Description                           |
    | ---------------- | ------- | ------------------------------------- |
    | `position`       | integer | Rank in the results (1-indexed)       |
    | `title`          | string  | Page title as shown in search results |
    | `url`            | string  | Full destination URL                  |
    | `snippet`        | string  | Preview text shown under the result   |
    | `cleaned_domain` | string  | Root domain without protocol or path  |
    | `displayed_url`  | string  | URL as displayed in Google results    |
    | `entity_type`    | string  | Always `"OrganicResult"`              |

    **AnswerBox**: featured snippet at the top of results

    | Field                 | Type   | Description                            |
    | --------------------- | ------ | -------------------------------------- |
    | `snippet`             | string | Answer text                            |
    | `snippet_highlighted` | array  | Highlighted terms within the snippet   |
    | `display_link`        | string | Source URL displayed in the answer box |

    **RelatedQuestion**

    | Field      | Type   | Description                  |
    | ---------- | ------ | ---------------------------- |
    | `question` | string | A "People also ask" question |

    **RelatedSearch**

    | Field      | Type   | Description                     |
    | ---------- | ------ | ------------------------------- |
    | `position` | string | Display position                |
    | `query`    | string | Related search term             |
    | `url`      | string | Google search URL for this term |

    **Pagination**

    | Field             | Type    | Description                              |
    | ----------------- | ------- | ---------------------------------------- |
    | `current_page`    | integer | Current results page number              |
    | `next_page_url`   | string  | Google URL for the next page             |
    | `other_page_urls` | object  | Map of page numbers to their Google URLs |
  </Accordion>

  <Accordion title="google_news: NewsResults">
    **NewsResults**: the full news results object

    | Field            | Type   | Description                                             |
    | ---------------- | ------ | ------------------------------------------------------- |
    | `head_title`     | string | Title of the news results section                       |
    | `menu_items`     | array  | Top-level navigation topics (U.S., World, Local, etc.)  |
    | `sub_menu_items` | array  | Secondary navigation tabs (Home, For you, Sports, etc.) |
    | `news_results`   | array  | Individual news articles (may be null for some queries) |
    | `related_topics` | array  | Related topic suggestions                               |
  </Accordion>

  <Accordion title="google_images: ImageResult">
    **ImageResult**: one entry per image

    | Field                    | Type    | Description                                     |
    | ------------------------ | ------- | ----------------------------------------------- |
    | `position`               | integer | Rank in the results (1-indexed)                 |
    | `title`                  | string  | Image title or caption                          |
    | `source_name`            | string  | Name of the source website                      |
    | `source_domain`          | string  | Domain of the source website                    |
    | `source_url`             | string  | URL of the page containing the image            |
    | `image_url`              | string  | Direct URL to the full-size image (may be null) |
    | `thumbnail_url`          | string  | URL of the thumbnail preview                    |
    | `image_width`            | integer | Full-size image width in pixels                 |
    | `image_height`           | integer | Full-size image height in pixels                |
    | `thumbnail_image_width`  | integer | Thumbnail width in pixels                       |
    | `thumbnail_image_height` | integer | Thumbnail height in pixels                      |
  </Accordion>
</AccordionGroup>

## Async & Batch Requests

### Parameters

<AccordionGroup>
  <Accordion icon="cloud" title="storage_type">
    <ParamField path="storage_type" type="string">
      Storage provider for results. When specified, results are saved to your cloud storage instead of Nimble's servers.

      **Options:** `s3` (Amazon S3), `gs` (Google Cloud Storage)
    </ParamField>
  </Accordion>

  <Accordion icon="folder" title="storage_url">
    <ParamField path="storage_url" type="string">
      Bucket path where results will be saved. Results are stored as `{task_id}.json` at the specified location.

      **Format:** `s3://your-bucket/path/prefix/`

      **Example:** `s3://my-bucket/nimble-results/`
    </ParamField>
  </Accordion>

  <Accordion icon="file-zipper" title="storage_compress">
    <ParamField path="storage_compress" type="boolean" default="false">
      Compress results with GZIP before saving. Reduces storage costs and transfer time. When `true`, results are saved as `{task_id}.json.gz`.
    </ParamField>
  </Accordion>

  <Accordion icon="tag" title="storage_object_name">
    <ParamField path="storage_object_name" type="string">
      Custom filename for the stored object instead of the default task ID.

      **Example:** `"my-custom-name"` saves as `my-custom-name.json`
    </ParamField>
  </Accordion>

  <Accordion icon="webhook" title="callback_url">
    <ParamField path="callback_url" type="string">
      Webhook URL to receive a POST request when the task completes. Nimble sends task metadata (without result data) to this URL when extraction finishes.

      **Example:** `https://your-api.com/webhook/complete`
    </ParamField>
  </Accordion>
</AccordionGroup>

<Warning>
  Cloud storage delivery requires bucket permissions to be configured before
  use. See [Bucket
  Permissions](/nimble-sdk/admin/callbacks-and-delivery#configure-bucket-permissions-one-time)
  for setup instructions.
</Warning>

### Async API

Submit a request and receive a `task_id` immediately — results are delivered via polling, webhook callback, or directly to your cloud storage bucket.

```bash cURL theme={"system"}
curl -X POST 'https://api.us.webit.live/api/v1/async/serp' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search_engine": "google_search",
    "query": "NBA Allstars 2026"
}'
```

```json Response theme={"system"}
{
  "status": "success",
  "task_id": "52907745-7672-470e-1231-a2f8feb52944"
}
```

Use the `task_id` to poll for status or retrieve results.

<Tip>
  Polling, webhooks, and cloud storage delivery are all supported. See
  [Callbacks & Delivery](/nimble-sdk/admin/callbacks-and-delivery) for the full
  guide.
</Tip>

### Batch API

Submit multiple SERP requests in a single call using the `requests` array. Each item in `requests` becomes its own task. Parameters set outside `requests` apply as defaults to all tasks — values inside a request override the defaults.

#### Examples

<AccordionGroup>
  <Accordion icon="magnifying-glass" title="Example 1: Multiple search terms">
    Search for different queries in one batch:

    ```bash cURL theme={"system"}
    curl -X POST 'https://api.us.webit.live/api/v1/batch/serp' \
    --header 'Authorization: Bearer <YOUR-API-KEY>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "requests": [
            { "query": "Coffee" },
            { "query": "Tea" },
            { "query": "Biscuits" }
        ],
        "search_engine": "google_search",
        "storage_type": "s3",
        "storage_url": "s3://your-bucket/results/",
        "callback_url": "https://your-api.com/webhook/complete"
    }'
    ```
  </Accordion>

  <Accordion icon="clock" title="Example 2: Different time filters per query">
    Per-request overrides for `time`. Requests without a time filter return all-time results:

    ```bash cURL theme={"system"}
    curl -X POST 'https://api.us.webit.live/api/v1/batch/serp' \
    --header 'Authorization: Bearer <YOUR-API-KEY>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "requests": [
            { "query": "Coffee", "time": "day" },
            { "query": "Tea",    "time": "week" },
            { "query": "Biscuits" }
        ],
        "search_engine": "google_search",
        "storage_type": "s3",
        "storage_url": "s3://your-bucket/results/",
        "callback_url": "https://your-api.com/webhook/complete"
    }'
    ```
  </Accordion>

  <Accordion icon="browser" title="Example 3: Same query across multiple engines">
    Set the query once as a default and vary the `search_engine` per request:

    ```bash cURL theme={"system"}
    curl -X POST 'https://api.us.webit.live/api/v1/batch/serp' \
    --header 'Authorization: Bearer <YOUR-API-KEY>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "requests": [
            { "search_engine": "google_search" },
            { "search_engine": "google_news" },
            { "search_engine": "google_images" }
        ],
        "query": "Coffee",
        "storage_type": "s3",
        "storage_url": "s3://your-bucket/results/",
        "callback_url": "https://your-api.com/webhook/complete"
    }'
    ```
  </Accordion>
</AccordionGroup>

#### Batch response

Each task in the batch gets its own `id`. Results are saved to `storage_url` and a callback fires per completed task.

```json theme={"system"}
{
  "batch_id": "7a07a96d-c402-4d98-a17f-4ecb390d11a3",
  "batch_size": 3,
  "tasks": [
    {
      "batch_id": "7a07a96d-c402-4d98-a17f-4ecb390d11a3",
      "id": "2e508d43-8b02-4fc0-96c7-0968ab454a0c",
      "state": "pending",
      "output_url": "s3://your-bucket/results/2e508d43-8b02-4fc0-96c7-0968ab454a0c.json",
      "callback_url": "https://your-api.com/webhook/complete",
      "status_url": "https://api.us.webit.live/api/v1/tasks/2e508d43-8b02-4fc0-96c7-0968ab454a0c",
      "created_at": "2026-03-05T08:09:23.205Z"
    },
    {
      "id": "63cc3bd5-01b4-4787-90a2-f382b9960c77",
      "state": "pending",
      "...": "..."
    },
    {
      "id": "4cb39bbf-5580-4c50-8ed4-4a7905e2ec52",
      "state": "pending",
      "...": "..."
    }
  ]
}
```

#### Check batch progress

```bash cURL theme={"system"}
curl -X GET 'https://api.us.webit.live/api/v1/batches/<batch_id>/progress' \
--header 'Authorization: Bearer <YOUR-API-KEY>'
```

```json Response theme={"system"}
{
  "status": "success",
  "completed": false,
  "progress": 0.333333
}
```

`progress` ranges from `0` to `1`. When `completed` is `true`, all tasks are done.

#### List all batches

```bash cURL theme={"system"}
curl -X GET 'https://api.us.webit.live/api/v1/batches/list?limit=20' \
--header 'Authorization: Bearer <YOUR-API-KEY>'
```

```json Response theme={"system"}
{
  "data": ["..."],
  "pagination": {
    "hasNext": true,
    "nextCursor": "...",
    "total": 102
  }
}
```

Paginate by passing `cursor` until `pagination.hasNext` is `false`.

#### Retrieve batch summary

Once complete, fetch full task details for the entire batch:

```bash cURL theme={"system"}
curl -X GET 'https://api.us.webit.live/api/v1/batches/<batch_id>' \
--header 'Authorization: Bearer <YOUR-API-KEY>'
```

```json Response theme={"system"}
{
  "status": "success",
  "completed": true,
  "progress": 1,
  "tasks": [
    {
      "batch_id": "7a07a96d-c402-4d98-a17f-4ecb390d11a3",
      "id": "2e508d43-8b02-4fc0-96c7-0968ab454a0c",
      "state": "success",
      "output_url": "s3://your-bucket/results/2e508d43-8b02-4fc0-96c7-0968ab454a0c.json",
      "created_at": "2026-03-05T08:09:23.205Z",
      "modified_at": "2026-03-05T08:10:27.244Z"
    }
  ]
}
```

## Pagination

<Note>`google_news` does not support pagination.</Note>

<Tabs>
  <Tab title="google_search">
    <Steps>
      <Step title="Pull up to 100 results in one request">
        Set `num_results: 100` to get up to 100 organic results in a single call. For most use cases, this eliminates pagination entirely.

        ```bash cURL theme={"system"}
        curl -X POST 'https://api.us.webit.live/api/v1/realtime/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_search",
            "query": "NBA Allstar 2026",
            "num_results": 100
        }'
        ```
      </Step>

      <Step title="Need more than 100? Add start to fetch the next batch">
        Combine `num_results: 100` with `start` to pull 100 results at a time beyond the first page. Increment `start` by 100 for each subsequent batch.

        ```bash cURL theme={"system"}
        curl -X POST 'https://api.us.webit.live/api/v1/realtime/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_search",
            "query": "NBA Allstar 2026",
            "num_results": 100,
            "start": 100
        }'
        ```

        `start: 100` → results 101–200, `start: 200` → results 201–300, and so on.
      </Step>
    </Steps>

    <Note>
      To receive raw HTML per result page instead of a single stitched HTML string, add `"include_pages_html": true` to your request.
    </Note>
  </Tab>

  <Tab title="google_images">
    <Steps>
      <Step title="Pull up to 100 results in one request">
        Set `num_results: 100` to get up to 100 image results in a single call. For most use cases, this eliminates pagination entirely.

        ```bash cURL theme={"system"}
        curl -X POST 'https://api.us.webit.live/api/v1/realtime/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_images",
            "query": "NBA Allstar 2026",
            "num_results": 100
        }'
        ```
      </Step>

      <Step title="Need more than 100? Add start to fetch the next batch">
        Combine `num_results: 100` with `start` to pull 100 results at a time beyond the first page. Increment `start` by 100 for each subsequent batch.

        ```bash cURL theme={"system"}
        curl -X POST 'https://api.us.webit.live/api/v1/realtime/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_images",
            "query": "NBA Allstar 2026",
            "num_results": 100,
            "start": 100
        }'
        ```

        `start: 100` → results 101–200, `start: 200` → results 201–300, and so on.
      </Step>
    </Steps>

    <Note>
      To receive raw HTML per result page instead of a single stitched HTML string, add `"include_pages_html": true` to your request.
    </Note>
  </Tab>
</Tabs>

## Limitations

| Engine          | Limitation                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| All engines     | Default QPS: 10 (600 QPM) — scales to 1,000. [Contact Sales](https://nimbleway.com/contact-general/) |
| All engines     | Page rendering disabled by default                                                                   |
| All engines     | Country and locale fixed to `US` / `en-US` — other regions not supported                             |
| `google_search` | `num_results` max 100                                                                                |
| `google_news`   | Pagination not supported                                                                             |
| `google_news`   | `location` and `time` parameters not supported                                                       |

## Next steps

<CardGroup cols={2}>
  <Card icon="code" href="/api-reference/fast-serp/fast-google-serp" title="API Reference">
    Full API reference for the Fast SERP endpoint
  </Card>

  <Card icon="arrows-to-circle" href="/nimble-sdk/web-tools/extract/quickstart" title="Extract">
    Extract structured content from any result URL
  </Card>
</CardGroup>
