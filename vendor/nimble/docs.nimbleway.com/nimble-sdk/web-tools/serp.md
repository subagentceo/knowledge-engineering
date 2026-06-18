> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# SERP

> Google SERP API returning live search results as structured data with high success rates

Nimble **SERP** is a realtime API that returns live Google search results as structured data. Submit a query and get back organic listings, pagination, and related questions, parsed and typed with **high success rates**.

## SERP SLA

Default SLA and limitations for SERP API

|                     | Default        | Description                                     |
| ------------------- | -------------- | ----------------------------------------------- |
| **QPS**             | 83 (5,000 QPM) | Rate limiter - Query per Second                 |
| **p50**             | \~3s           | Latency                                         |
| **p90**             | \~10s          | Latency                                         |
| **Organic Results** | 10             | Results per request (`google_search` only)      |
| **Page rendering**  | Available      | JS rendering supported (see `ads_optimization`) |

<Callout icon="headset" color="#d87dff">
  Need higher throughput? SERP scales up to 1,000 QPS. [Contact Sales](https://nimbleway.com/contact-general/) to discuss your requirements.
</Callout>

## Quick Start

### Example Request

<CodeGroup>
  ```bash cURL theme={"system"}
  curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
  --header 'Authorization: Bearer <YOUR-API-KEY>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "search_engine": "google_search",
      "query": "latest on Nimble",
      "country": "US",
      "locale": "en"
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
    "data": {
      "html": ".....",
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
    },
    "metadata": {
      "query_time": "2026-04-22T17:51:08.769Z",
      "query_duration": 9701,
      "response_parameters": {
        "input_url": "https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=NBA+Allstars+2026&q=NBA+Allstars+2026"
      },
      "driver": "vx6"
    },
    "status_code": 200
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
    Runs via Nimble's infrastructure with geo-targeting applied, no rendering
    delays, no blocking
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

      | Value                 | Description                               |
      | --------------------- | ----------------------------------------- |
      | `google_search`       | Standard Google web search                |
      | `google_aio`          | Google search with AI Overview (rendered) |
      | `google_news`         | Google News results                       |
      | `google_images`       | Google Images results                     |
      | `google_maps_search`  | Google Maps location/business search      |
      | `google_maps_place`   | Google Maps details for a specific place  |
      | `google_maps_reviews` | Google Maps reviews for a specific place  |
    </ParamField>
  </Accordion>

  <Accordion icon="text" title="query">
    <ParamField path="query" type="string">
      The search query string. Required for `google_search`, `google_aio`, `google_news`, `google_images`, and `google_maps_search`. Not used for `google_maps_place` or `google_maps_reviews` (use `place_id` instead).

      **Example:** `"NBA Allstars 2026"`
    </ParamField>
  </Accordion>

  <Accordion icon="location-dot" title="place_id / data_id - Required (Maps Place & Reviews)">
    <ParamField path="place_id" type="string">
      Google-assigned identifier for a specific place. Required for `google_maps_place` and `google_maps_reviews`. Cannot be used together with `data_id` in the same request.

      **Example:**

      ```json theme={"system"}
      {
        "search_engine": "google_maps_reviews",
        "place_id": "ChIJN1t_tDeuEmsRUsoyG83frY4"
      }
      ```
    </ParamField>

    <ParamField path="data_id" type="string">
      Alternative Google identifier for a specific place. Use instead of `place_id` when you have a `data_id`. Cannot be used together with `place_id` in the same request.

      **Example:**

      ```json theme={"system"}
      {
        "search_engine": "google_maps_place",
        "data_id": "0x89c259af336a2c5b:0x6fba0a3358e8b"
      }
      ```
    </ParamField>
  </Accordion>

  <Accordion icon="map-pin" title="coordinates">
    <ParamField path="coordinates" type="object">
      Optional center point for `google_maps_search`. Biases results around the given location.

      **Fields:**

      * `latitude` (string)
      * `longitude` (string)

      **Example:**

      ```json theme={"system"}
      {
        "search_engine": "google_maps_search",
        "query": "Cinema",
        "coordinates": {
          "latitude": "40.7123695",
          "longitude": "-74.0357317"
        }
      }
      ```
    </ParamField>
  </Accordion>

  <Accordion icon="globe" title="country">
    <ParamField path="country" type="string">
      Run the search as if from a specific country. Returns geo-localized results - Optimized for `US`

      Use ISO Alpha-2 codes: `US`, `GB`, `DE`, `FR`, `JP`, etc.

      **Example:** `"US"`
    </ParamField>
  </Accordion>

  <Accordion icon="language" title="locale">
    <ParamField path="locale" type="string">
      Language preference for the search results. Use LCID standard.

      **Examples:**

      * `en` (English)
      * `en-US` (English, United States)
      * `fr-FR` (French, France)
    </ParamField>
  </Accordion>

  <Accordion icon="location-crosshairs" title="location">
    <ParamField path="location" type="string">
      Location context for the search. Accepted for `google_search` and `google_images`. Not supported for Maps engines.

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
      When set to `true`, removes the `data.html` field from the response. Useful for reducing response size when raw HTML is not needed.

      **Default:** `false`
    </ParamField>
  </Accordion>

  <Accordion icon="arrow-up-wide-short" title="sort">
    <ParamField path="sort" type="string">
      Defines the order in which reviews are returned. Supported on `google_maps_reviews` only.

      | Value            | Description                           |
      | ---------------- | ------------------------------------- |
      | `relevant`       | Most relevant reviews first (default) |
      | `newest`         | Most recent reviews first             |
      | `lowest_rating`  | Lowest-rated reviews first            |
      | `highest_rating` | Highest-rated reviews first           |
    </ParamField>
  </Accordion>

  <Accordion icon="list-ol" title="num_results">
    <ParamField path="num_results" type="integer" default="10">
      Number of results to return. Supported on `google_search`, `google_aio`, and `google_maps_reviews`.

      | Engine                | Range | Default |
      | --------------------- | ----- | ------- |
      | `google_search`       | 1–100 | 10      |
      | `google_aio`          | 1–100 | 10      |
      | `google_maps_reviews` | 10–20 | 10      |
    </ParamField>
  </Accordion>

  <Accordion icon="forward" title="start">
    <ParamField path="start" type="integer">
      Offsets the results by this number of listings. For example, `start: 20` skips the first 20 results and returns the next page.

      **Example:** `20`
    </ParamField>
  </Accordion>

  <Accordion icon="forward-step" title="offset">
    <ParamField path="offset" type="integer">
      Offsets the results by this number of listings. Used for pagination with `google_maps_search`.

      **Example:** `20`
    </ParamField>
  </Accordion>

  <Accordion icon="file-code" title="include_pages_html">
    <ParamField path="include_pages_html" type="boolean" default="false">
      When `true`, returns raw HTML per individual result page instead of a single stitched HTML string. Only relevant when `num_results` exceeds 10. Supported on `google_search` and `google_images`.

      **Default:** `false`
    </ParamField>
  </Accordion>

  <Accordion icon="rectangle-ad" title="ads_optimization">
    <ParamField path="ads_optimization" type="boolean" default="false">
      When `true`, increases the number of paid (sponsored) ads in the results by running the request in incognito mode. Requires JS rendering.

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

  <Accordion icon="earth-americas" title="domain">
    <ParamField path="domain" type="string" default="com">
      Google domain TLD to target. Supported on `google_aio`. Allows targeting country-specific Google domains.

      **Examples:** `com`, `co.uk`, `de`, `fr`, `co.jp`

      **Default:** `com`
    </ParamField>
  </Accordion>

  <Accordion icon="key" title="paging_token_id">
    <ParamField path="paging_token_id" type="string">
      Cursor token for fetching the next page of reviews. Obtained from the previous `google_maps_reviews` response. Supported on `google_maps_reviews` only.
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
* [`country`](#parameters) — target country for localized results (ISO Alpha-2, e.g. `US`)
* [`locale`](#parameters) — language preference (LCID, e.g. `en`)
* [`location`](#parameters) — physical location context (string or raw UULE value)
* [`time`](#parameters) — filter results by recency (`hour`, `day`, `week`, `month`, `year`)
* [`include_pages_html`](#parameters) — return per-page HTML instead of a single stitched string
* [`ads_optimization`](#parameters) — boost sponsored results using incognito rendering (requires JS)
* [`device`](#parameters) — emulate a specific device type (`mobile`)
* [`no_html`](#parameters) — omit `data.html` from the response

```bash cURL theme={"system"}
curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search_engine": "google_search",
    "query": "NBA Allstars 2026",
    "country": "US",
    "locale": "en"
}'
```

<Accordion title="Example Response">
  ```json theme={"system"}
  {
    "url": "https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=NBA+Allstars+2026&q=NBA+Allstars+2026",
    "task_id": "cafe84d0-c599-4cd5-8626-640514086808",
    "status": "success",
    "data": {
      "html": ".....",
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
              "OrganicResult": [
                  {
                      "cleaned_domain": "nba",
                      "displayed_url": "https://www.nba.com › allstar › 2026 › roster",
                      "entity_type": "OrganicResult",
                      "position": 1,
                      "snippet": "2026 All-Star; Latest; Events. Feb. 13: Ruffles All-Star Celebrity Game · Feb. 13: Castrol Rising Stars · Feb. 13: NBA HBCU Classic · Feb. 14: All-Star Saturday ...Read more",
                      "title": "2026 All-Star | Roster",
                      "url": "https://www.nba.com/allstar/2026/roster"
                  },
                  {
                      "cleaned_domain": "wikipedia",
                      "displayed_url": "https://en.wikipedia.org › wiki › 2026_NBA_All-Star_...",
                      "entity_type": "OrganicResult",
                      "position": 2,
                      "snippet": "In the championship round, the USA Stars defeated the USA Stripes to win the tournament. Anthony Edwards was named the All-Star Most Valuable Player (MVP).Read more",
                      "title": "2026 NBA All-Star Game",
                      "url": "https://en.wikipedia.org/wiki/2026_NBA_All-Star_Game"
                  },
                  {
                      "cleaned_domain": "nba",
                      "displayed_url": "https://www.nba.com › allstar › 2026",
                      "entity_type": "OrganicResult",
                      "position": 3,
                      "snippet": "Luka, Giannis lead 2026 All-Star starters. The 10 All-Star starters were revealed on Monday and will participate in the 75th NBA All-Star Game on Feb. 15 in ...Read more",
                      "title": "2026 All-Star Latest",
                      "url": "https://www.nba.com/allstar/2026"
                  },
                  {
                      "cleaned_domain": "nba",
                      "displayed_url": "https://nbaevents.nba.com › all-star",
                      "entity_type": "OrganicResult",
                      "position": 4,
                      "snippet": "‍Experience basketball's biggest weekend as NBA All-Star 2026 takes over Los Angeles for its historic 75th celebration — a milestone moment that unites fans ...Read more",
                      "title": "All Star 2026 - NBA Events",
                      "url": "https://nbaevents.nba.com/all-star"
                  },
                  {
                      "cleaned_domain": "instagram",
                      "displayed_url": "2.3M+ followers",
                      "entity_type": "OrganicResult",
                      "position": 5,
                      "snippet": "The 76th NBA All-Star game will be played on Sunday, Feb. 21, at Mortgage Matchup Center, home of the Suns. ... During 2026 @nbaallstar Weekend, we brought ...Read more",
                      "title": "NBA All-Star (@nbaallstar) • Instagram photos and videos",
                      "url": "https://www.instagram.com/nbaallstar/"
                  },
                  {
                      "cleaned_domain": "nba",
                      "displayed_url": "https://www.nba.com › allstar › 2026 › schedule",
                      "entity_type": "OrganicResult",
                      "position": 6,
                      "snippet": "The 2026 NBA All-Star Game will take place on Sunday, Feb. 15, 2026 in Los Angeles, California at the Intuit Dome, the home of the LA Clippers.Read more",
                      "title": "2026 All-Star | Schedule",
                      "url": "https://www.nba.com/allstar/2026/schedule"
                  },
                  {
                      "cleaned_domain": "ncaa",
                      "displayed_url": "https://www.ncaa.com › news › article › 2026-02-04",
                      "entity_type": "OrganicResult",
                      "position": 7,
                      "snippet": "Feb 9, 2026 — The 2026 NBA All-Star Game will take place at the Intuit Dome in Inglewood, Calif. at 5 p.m. ET on Sunday, Feb. 15, debuting the new U.S vs.Read more",
                      "title": "2026 NBA All-Star Game rosters: Where the players ...",
                      "url": "https://www.ncaa.com/news/basketball-men/article/2026-02-04/2026-nba-all-star-game-rosters-where-players-attended-college"
                  },
                  {
                      "cleaned_domain": "youtube",
                      "displayed_url": "24.9K+ views  ·  5 months ago",
                      "entity_type": "OrganicResult",
                      "position": 8,
                      "thumbnails": [
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjkVXDwwFS3YDphNtqyNlm1MKghOKiUrdaZSP3Dc1uru1MVq8qW6F6QQ&s"
                      ],
                      "title": "2026 NBA All-Star Game format revealed - NBA Showtime ...",
                      "url": "https://www.youtube.com/watch?v=7EVGFlnCIR8"
                  }
              ],
              "Pagination": [
                  {
                      "current_page": 1,
                      "entity_type": "Pagination",
                      "next_page_url": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=lgrpacq0Ceft-LYP_-yTuQE&start=10&sa=N&sstk=Af77f_fxB9UNY2E0h9Glrm4VFoIwjd44JWK1IninJz1d__AB2WqymuWFnMQuzzH7AfSnJp26ZAgGHRDTsUqvv-hVKfQGRTvbIhLPbw&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ8NMDegQIVhAW",
                      "other_page_urls": {
                          "3": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=lgrpacq0Ceft-LYP_-yTuQE&start=20&sa=N&sstk=Af77f_fxB9UNY2E0h9Glrm4VFoIwjd44JWK1IninJz1d__AB2WqymuWFnMQuzzH7AfSnJp26ZAgGHRDTsUqvv-hVKfQGRTvbIhLPbw&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ8tMDegQIVhAG",
                          "4": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=lgrpacq0Ceft-LYP_-yTuQE&start=30&sa=N&sstk=Af77f_fxB9UNY2E0h9Glrm4VFoIwjd44JWK1IninJz1d__AB2WqymuWFnMQuzzH7AfSnJp26ZAgGHRDTsUqvv-hVKfQGRTvbIhLPbw&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ8tMDegQIVhAI",
                          "5": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=lgrpacq0Ceft-LYP_-yTuQE&start=40&sa=N&sstk=Af77f_fxB9UNY2E0h9Glrm4VFoIwjd44JWK1IninJz1d__AB2WqymuWFnMQuzzH7AfSnJp26ZAgGHRDTsUqvv-hVKfQGRTvbIhLPbw&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ8tMDegQIVhAK",
                          "6": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=lgrpacq0Ceft-LYP_-yTuQE&start=50&sa=N&sstk=Af77f_fxB9UNY2E0h9Glrm4VFoIwjd44JWK1IninJz1d__AB2WqymuWFnMQuzzH7AfSnJp26ZAgGHRDTsUqvv-hVKfQGRTvbIhLPbw&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ8tMDegQIVhAM",
                          "7": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=lgrpacq0Ceft-LYP_-yTuQE&start=60&sa=N&sstk=Af77f_fxB9UNY2E0h9Glrm4VFoIwjd44JWK1IninJz1d__AB2WqymuWFnMQuzzH7AfSnJp26ZAgGHRDTsUqvv-hVKfQGRTvbIhLPbw&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ8tMDegQIVhAO",
                          "8": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=lgrpacq0Ceft-LYP_-yTuQE&start=70&sa=N&sstk=Af77f_fxB9UNY2E0h9Glrm4VFoIwjd44JWK1IninJz1d__AB2WqymuWFnMQuzzH7AfSnJp26ZAgGHRDTsUqvv-hVKfQGRTvbIhLPbw&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ8tMDegQIVhAQ",
                          "9": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=lgrpacq0Ceft-LYP_-yTuQE&start=80&sa=N&sstk=Af77f_fxB9UNY2E0h9Glrm4VFoIwjd44JWK1IninJz1d__AB2WqymuWFnMQuzzH7AfSnJp26ZAgGHRDTsUqvv-hVKfQGRTvbIhLPbw&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ8tMDegQIVhAS",
                          "10": "https://www.google.com/search?q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=lgrpacq0Ceft-LYP_-yTuQE&start=90&sa=N&sstk=Af77f_fxB9UNY2E0h9Glrm4VFoIwjd44JWK1IninJz1d__AB2WqymuWFnMQuzzH7AfSnJp26ZAgGHRDTsUqvv-hVKfQGRTvbIhLPbw&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ8tMDegQIVhAU"
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
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=Nba+all+stars+2026+roster&sa=X&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ1QJ6BAg_EAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "2",
                      "query": "Nba all stars 2026 schedule",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=Nba+all+stars+2026+schedule&sa=X&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ1QJ6BAhTEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "3",
                      "query": "NBA All-Star 2027",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=NBA+All-Star+2027&sa=X&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ1QJ6BAhXEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "4",
                      "query": "NBA All-Star 2026 reserves",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=NBA+All-Star+2026+reserves&sa=X&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ1QJ6BAhUEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "5",
                      "query": "Nba all stars 2026 location",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=Nba+all+stars+2026+location&sa=X&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ1QJ6BAhVEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "6",
                      "query": "Nba all stars 2026 tickets",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=Nba+all+stars+2026+tickets&sa=X&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ1QJ6BAhSEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "7",
                      "query": "NBA All-Star 2026 Celebrity Game",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=NBA+All-Star+2026+Celebrity+Game&sa=X&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ1QJ6BAhLEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "8",
                      "query": "NBA All-Star 2026 3-Point Contest",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=NBA+All-Star+2026+3-Point+Contest&sa=X&ved=2ahUKEwjK16bugoKUAxXnNt4AHX_2JBcQ1QJ6BAhFEAE"
                  }
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
    },
    "metadata": {
      "query_time": "2026-04-22T17:51:08.769Z",
      "query_duration": 9701,
      "response_parameters": {
        "input_url": "https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=NBA+Allstars+2026&q=NBA+Allstars+2026"
      },
      "driver": "vx6"
    },
    "status_code": 200
  }
  ```
</Accordion>

### Google AI Overview

Returns Google search results with the AI Overview block rendered at the top. The page is rendered to capture Google's AI-generated answer alongside standard organic results.

**Supported parameters:**

* [`query`](#parameters) — search query string (required)
* [`num_results`](#parameters) — number of results to return, 1–100, default 10
* [`start`](#parameters) — result offset for fetching beyond the first batch
* [`country`](#parameters) — target country, defaults to US (ISO Alpha-2)
* [`locale`](#parameters) — language preference (LCID, e.g. `en`)
* [`location`](#parameters) — physical location context (string or raw UULE value)
* [`time`](#parameters) — filter results by recency (`hour`, `day`, `week`, `month`, `year`)
* [`domain`](#parameters) — Google TLD to target (e.g. `com`, `co.uk`)
* [`device`](#parameters) — emulate a specific device type (`mobile`)
* [`include_pages_html`](#parameters) — return per-page HTML instead of a single stitched string
* [`no_html`](#parameters) — omit `data.html` from the response

<Warning>
  Page rendering is always enabled and cannot be disabled. Expect higher latency
  than `google_search`.
</Warning>

```bash cURL theme={"system"}
curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search_engine": "google_aio",
    "query": "how does photosynthesis work",
    "country": "US",
    "locale": "en"
}'
```

<Accordion title="Example Response">
  ```json theme={"system"}
  {
    "url": "https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=how+does+photosynthesis+work&q=how+does+photosynthesis+work&sei=RQ_paYqPLfDIkPIP5PTI2Qk",
    "task_id": "fbe28247-7a91-4a23-884a-525a4b889496",
    "status": "success",
    "data": {
      "html": ".....",
      "parsing": {
          "entities": {
              "AIOverview": [
                  {
                      "blocks": [
                          {
                              "content": "Light-Dependent Reactions (Light Reactions):Location: Thylakoid membrane within the chloroplasts.Process: Chlorophyll captures solar energy and uses it to split water molecules (H2Ocap H sub 2 cap O𝐻2𝑂) into oxygen, protons, and electrons.Outputs: Oxygen is released as a byproduct, while the energy is stored in molecules of ATP and NADPH. PubMed Central (PMC) (.gov) +4"
                          },
                          {
                              "content": "Location: Thylakoid membrane within the chloroplasts."
                          },
                          {
                              "content": "Process: Chlorophyll captures solar energy and uses it to split water molecules (H2Ocap H sub 2 cap O𝐻2𝑂) into oxygen, protons, and electrons."
                          },
                          {
                              "content": "Outputs: Oxygen is released as a byproduct, while the energy is stored in molecules of ATP and NADPH. PubMed Central (PMC) (.gov) +4"
                          },
                          {
                              "content": "Light-Independent Reactions (Calvin Cycle):Location: Stroma of the chloroplasts.Process: Using the ATP and NADPH produced in the first stage, carbon dioxide (CO2cap C cap O sub 2𝐶𝑂2) is captured and converted into glucose (sugar).Outputs: Glucose is used by the plant for growth and energy, while ADPcap A cap D cap P𝐴𝐷𝑃 and 𝑁𝐴𝐷𝑃+ are returned to the light reactions. Wikipedia +4"
                          },
                          {
                              "content": "Location: Stroma of the chloroplasts."
                          },
                          {
                              "content": "Process: Using the ATP and NADPH produced in the first stage, carbon dioxide (CO2cap C cap O sub 2𝐶𝑂2) is captured and converted into glucose (sugar)."
                          },
                          {
                              "content": "Outputs: Glucose is used by the plant for growth and energy, while ADPcap A cap D cap P𝐴𝐷𝑃 and 𝑁𝐴𝐷𝑃+ are returned to the light reactions. Wikipedia +4"
                          },
                          {
                              "content": "Chlorophyll: The green pigment that captures light energy."
                          },
                          {
                              "content": "Chloroplasts: The specialized organelles where photosynthesis occurs."
                          },
                          {
                              "content": "Input/Output Equation: 6CO2+6H2O+Light Energy→C6H12O6+6O26 cap C cap O sub 2 plus 6 cap H sub 2 cap O plus Light Energy right arrow cap C sub 6 cap H sub 12 cap O sub 6 plus 6 cap O sub 26𝐶𝑂2+6𝐻2𝑂+Light Energy→𝐶6𝐻12𝑂6+6𝑂2."
                          },
                          {
                              "content": "Purpose: Plants use this process to create their own food (sugar) and release oxygen, which is essential for the survival of animals and humans. Science News Explores +4"
                          }
                      ],
                      "content": "View allPhotosynthesis is the process by which plants, algae, and some bacteria convert light energy, water (H2Ocap H sub 2 cap O𝐻2𝑂), and carbon dioxide (CO2cap C cap O sub 2𝐶𝑂2) into oxygen (O2cap O sub 2𝑂2) and chemical energy in the form of glucose (𝐶6𝐻12𝑂6). Occurring inside chloroplasts, chlorophyll absorbs sunlight to split water molecules and fuel the production of sugar, acting as the foundation for most life on Earth. National Geographic Society +4The Two Stages of PhotosynthesisPhotosynthesis occurs in two main stages: Light-Dependent Reactions (Light Reactions):Location: Thylakoid membrane within the chloroplasts.Process: Chlorophyll captures solar energy and uses it to split water molecules (H2Ocap H sub 2 cap O𝐻2𝑂) into oxygen, protons, and electrons.Outputs: Oxygen is released as a byproduct, while the energy is stored in molecules of ATP and NADPH. PubMed Central (PMC) (.gov) +4This video explains the light-dependent reactions of photosynthesis:51sBozeman ScienceYouTube• Apr 3, 2012Light-Independent Reactions (Calvin Cycle):Location: Stroma of the chloroplasts.Process: Using the ATP and NADPH produced in the first stage, carbon dioxide (CO2cap C cap O sub 2𝐶𝑂2) is captured and converted into glucose (sugar).Outputs: Glucose is used by the plant for growth and energy, while ADPcap A cap D cap P𝐴𝐷𝑃 and 𝑁𝐴𝐷𝑃+ are returned to the light reactions. Wikipedia +4This video explains the light-independent reactions of photosynthesis:1mAmoeba SistersYouTube• Jul 13, 2021Key Components and Purpose Chlorophyll: The green pigment that captures light energy.Chloroplasts: The specialized organelles where photosynthesis occurs.Input/Output Equation: 6CO2+6H2O+Light Energy→C6H12O6+6O26 cap C cap O sub 2 plus 6 cap H sub 2 cap O plus Light Energy right arrow cap C sub 6 cap H sub 12 cap O sub 6 plus 6 cap O sub 26𝐶𝑂2+6𝐻2𝑂+Light Energy→𝐶6𝐻12𝑂6+6𝑂2.Purpose: Plants use this process to create their own food (sugar) and release oxygen, which is essential for the survival of animals and humans. Science News Explores +4Photosynthesis - WikipediaPhotosynthesis occurs in two stages. In the first stage, light-dependent reactions or light reactions capture the energy of light ...WikipediaPhotosynthesis - National Geographic Educationphotosynthesis(foh-toh-SIHN-theh-sihs) noun. process by which plants turn water, sunlight, and carbon dioxide into water, oxygen, ...National Geographic SocietyExplainer: How photosynthesis works - Science News ExploresLet the light shine in. When light hits a plant's leaves, it shines on chloroplasts and into their thylakoid membranes. Those memb...Science News ExploresShow allPhotosynthesis - WikipediaPhotosynthesis occurs in two stages. In the first stage, light-dependent reactions or light reactions capture the energy of light ...WikipediaPhotosynthesis - National Geographic Educationphotosynthesis(foh-toh-SIHN-theh-sihs) noun. process by which plants turn water, sunlight, and carbon dioxide into water, oxygen, ...National Geographic SocietyExplainer: How photosynthesis works - Science News ExploresLet the light shine in. When light hits a plant's leaves, it shines on chloroplasts and into their thylakoid membranes. Those memb...Science News ExploresPhotosynthesis in the forest | Oregon Forest Resources InstituteHere's how photosynthesis works: * **Chlorophyll uses sunlight energy to transform carbon dioxide and water into oxygen and carbon...Oregon Forest Resources InstitutePhotosynthesis - PMC - NIHOxygenic photosynthesis involves the conversion of water and CO2 into complex organic molecules such as carbohydrates and oxygen. ...PubMed Central (PMC) (.gov)Photosynthesis - The Cell - NCBI BookshelfSunlight is absorbed by photosynthetic pigments, the most abundant of which in plants are the chlorophylls. Absorption of light ex...National Institutes of Health (.gov)Photosynthetic Cells - Photosynthesis, Chloroplast - NatureConclusion. Photosynthetic cells contain chlorophyll and other light-sensitive pigments that capture solar energy. In the presence...NatureIntro to photosynthesis (article) - Khan AcademyThe light-dependent reactions and the Calvin cycle. Photosynthesis in the leaves of plants involves many steps, but it can be divi...Khan AcademyPhotosynthesisPhotosynthesis is the process by which plants use sunlight to make food and oxygen from carbon dioxide and water. The process occu...UIUC Life SciencesWhat is the process of photosynthesis?Photosynthesis is the chemical process in which plants and other organisms combine carbon dioxide and water, using energy from the...Generation GeniusHow does photosynthesis work? #plants #biologyIn the process of photosynthesis, plants convert carbon dioxide and water into sugar and oxygen. This transformation occurs within...37sYouTube·Museums VictoriaWhat are the main products of the light-independent reactions in photosynthesis?The glucose produced in the Calvin cycle can be used by the plant for energy or stored as starch for later use. The ADP and NADP+ ...TutorChaseIntroduction To Photosynthesis Quiz #2 Flashcards | Study Prep in Pearson+The equation for photosynthesis is 6CO2 + 6H2O + light energy -> C6H12O6 + 6O2.www.pearson.com   education.nationalgeographic.orgpmc.ncbi.nlm.nih.govgenerationgenius.comkhanacademy.orgncbi.nlm.nih.goven.wikipedia.orglife.illinois.edusnexplores.orgnature.comoregonforests.orgyoutube.commonash.edututorchase.compearson.com",
                      "entity_type": "AIOverview",
                      "links": [
                          {
                              "link": "https://en.wikipedia.org/wiki/Photosynthesis#:~:text=Photosynthesis%20occurs%20in%20two%20stages.%20In%20the,products%20to%20capture%20and%20reduce%20carbon%20dioxide.",
                              "snippet": "Photosynthesis occurs in two stages. In the first stage, light-dependent reactions or light reactions capture the energy of light ...",
                              "title": "Photosynthesis - Wikipedia"
                          },
                          {
                              "link": "https://education.nationalgeographic.org/resource/photosynthesis/",
                              "snippet": "photosynthesis(foh-toh-SIHN-theh-sihs) noun. process by which plants turn water, sunlight, and carbon dioxide into water, oxygen, ...",
                              "title": "Photosynthesis - National Geographic Education"
                          },
                          {
                              "link": "https://www.snexplores.org/article/explainer-how-photosynthesis-works",
                              "snippet": "Let the light shine in. When light hits a plant's leaves, it shines on chloroplasts and into their thylakoid membranes. Those memb...",
                              "title": "Explainer: How photosynthesis works - Science News Explores"
                          },
                          {
                              "link": "https://en.wikipedia.org/wiki/Photosynthesis#:~:text=Photosynthesis%20occurs%20in%20two%20stages.%20In%20the,products%20to%20capture%20and%20reduce%20carbon%20dioxide.",
                              "snippet": "Photosynthesis occurs in two stages. In the first stage, light-dependent reactions or light reactions capture the energy of light ...",
                              "title": "Photosynthesis - Wikipedia"
                          },
                          {
                              "link": "https://education.nationalgeographic.org/resource/photosynthesis/",
                              "snippet": "photosynthesis(foh-toh-SIHN-theh-sihs) noun. process by which plants turn water, sunlight, and carbon dioxide into water, oxygen, ...",
                              "title": "Photosynthesis - National Geographic Education"
                          },
                          {
                              "link": "https://www.snexplores.org/article/explainer-how-photosynthesis-works",
                              "snippet": "Let the light shine in. When light hits a plant's leaves, it shines on chloroplasts and into their thylakoid membranes. Those memb...",
                              "title": "Explainer: How photosynthesis works - Science News Explores"
                          },
                          {
                              "link": "https://oregonforests.org/photosynthesis-forest#:~:text=Here's%20how%20photosynthesis%20works:%20*%20**Chlorophyll%20uses,dioxide%20emissions%20can%20have%20on%20the%20environment.",
                              "snippet": "Here's how photosynthesis works: * **Chlorophyll uses sunlight energy to transform carbon dioxide and water into oxygen and carbon...",
                              "title": "Photosynthesis in the forest | Oregon Forest Resources Institute"
                          },
                          {
                              "link": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5264509/",
                              "snippet": "Oxygenic photosynthesis involves the conversion of water and CO2 into complex organic molecules such as carbohydrates and oxygen. ...",
                              "title": "Photosynthesis - PMC - NIH"
                          },
                          {
                              "link": "https://www.ncbi.nlm.nih.gov/books/NBK9861/",
                              "snippet": "Sunlight is absorbed by photosynthetic pigments, the most abundant of which in plants are the chlorophylls. Absorption of light ex...",
                              "title": "Photosynthesis - The Cell - NCBI Bookshelf"
                          },
                          {
                              "link": "https://www.nature.com/scitable/topicpage/photosynthetic-cells-14025371/",
                              "snippet": "Conclusion. Photosynthetic cells contain chlorophyll and other light-sensitive pigments that capture solar energy. In the presence...",
                              "title": "Photosynthetic Cells - Photosynthesis, Chloroplast - Nature"
                          },
                          {
                              "link": "https://www.khanacademy.org/science/ap-biology/cellular-energetics/photosynthesis/a/intro-to-photosynthesis",
                              "snippet": "The light-dependent reactions and the Calvin cycle. Photosynthesis in the leaves of plants involves many steps, but it can be divi...",
                              "title": "Intro to photosynthesis (article) - Khan Academy"
                          },
                          {
                              "link": "https://www.life.illinois.edu/govindjee/page2.html#:~:text=Photosynthesis%20is%20the%20process%20by%20which%20plants,and%20NADP%20available%20to%20continue%20the%20process",
                              "snippet": "Photosynthesis is the process by which plants use sunlight to make food and oxygen from carbon dioxide and water. The process occu...",
                              "title": "Photosynthesis"
                          },
                          {
                              "link": "https://www.generationgenius.com/videolessons/photosynthesis-and-respiration-video-for-kids/#:~:text=Photosynthesis%20is%20the%20chemical%20process%20in%20which,the%20Sun%2C%20to%20produce%20sugar%20and%20oxygen.",
                              "snippet": "Photosynthesis is the chemical process in which plants and other organisms combine carbon dioxide and water, using energy from the...",
                              "title": "What is the process of photosynthesis?"
                          },
                          {
                              "link": "https://www.youtube.com/shorts/H1KJgwhNJk8",
                              "title": "How does photosynthesis work? #plants #biology"
                          },
                          {
                              "link": "https://www.tutorchase.com/answers/ib/biology/what-are-the-main-products-of-the-light-independent-reactions-in-photosynthesis#:~:text=The%20glucose%20produced%20in%20the%20Calvin%20cycle,electrons%20to%20become%20ATP%20and%20NADPH%20again.",
                              "title": "What are the main products of the light-independent reactions in photosynthesis?"
                          },
                          {
                              "link": "https://www.pearson.com/channels/biology/flashcards/topics/introduction-to-photosynthesis-Bio-1/introduction-to-photosynthesis-quiz-2#:~:text=The%20equation%20for%20photosynthesis%20is%206CO2%20+,+%20light%20energy%20%2D%3E%20C6H12O6%20+%206O2.",
                              "title": "Introduction To Photosynthesis Quiz #2 Flashcards | Study Prep in Pearson+"
                          }
                      ]
                  }
              ],
              "InlineImages": [
                  {
                      "entity_type": "InlineImages",
                      "title": "Learn more",
                      "url": "https://support.google.com/websearch?p=data_genai_search&hl=en"
                  }
              ],
              "OrganicResult": [
                  {
                      "cleaned_domain": "nationalgeographic",
                      "displayed_url": "https://education.nationalgeographic.org › resource › p...",
                      "entity_type": "OrganicResult",
                      "position": 1,
                      "snippet": "Feb 26, 2025 — Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar.Read more",
                      "title": "Photosynthesis - National Geographic Education",
                      "url": "https://education.nationalgeographic.org/resource/photosynthesis/"
                  },
                  {
                      "cleaned_domain": "snexplores",
                      "displayed_url": "https://www.snexplores.org › article › explainer-how-p...",
                      "entity_type": "OrganicResult",
                      "position": 2,
                      "snippet": "Oct 28, 2020 — Photosynthesis is the process of creating sugar and oxygen from carbon dioxide, water and sunlight. It happens through a long series of chemical reactions.Read more",
                      "title": "Explainer: How photosynthesis works",
                      "url": "https://www.snexplores.org/article/explainer-how-photosynthesis-works"
                  },
                  {
                      "cleaned_domain": "wikipedia",
                      "displayed_url": "https://en.wikipedia.org › wiki › Photosynthesis",
                      "entity_type": "OrganicResult",
                      "position": 3,
                      "snippet": "The term photosynthesis usually refers to oxygenic photosynthesis, a process that releases oxygen as a byproduct of water splitting. Photosynthetic organisms ...Read more",
                      "title": "Photosynthesis",
                      "url": "https://en.wikipedia.org/wiki/Photosynthesis"
                  },
                  {
                      "cleaned_domain": "monash",
                      "displayed_url": "https://www.monash.edu › ... › Biology › Photosynthesis",
                      "entity_type": "OrganicResult",
                      "position": 4,
                      "snippet": "During photosynthesis, plants take in carbon dioxide from the air and water from the soil. Using sunlight, they transform these into glucose (a sugar) and ...Read more",
                      "title": "The process of photosynthesis - Student Academic Success",
                      "url": "https://www.monash.edu/student-academic-success/biology/photosynthesis/the-process-of-photosynthesis"
                  },
                  {
                      "cleaned_domain": "nih",
                      "displayed_url": "https://pmc.ncbi.nlm.nih.gov › articles › PMC5264509",
                      "entity_type": "OrganicResult",
                      "position": 5,
                      "snippet": "Oct 26, 2016 — In the light reactions, water is split using light into oxygen, protons and electrons, and in the dark reactions, the protons and electrons are ...Read more",
                      "title": "Photosynthesis - PMC - NIH",
                      "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5264509/"
                  },
                  {
                      "cleaned_domain": "reddit",
                      "displayed_url": "10+ comments  ·  1 year ago",
                      "entity_type": "OrganicResult",
                      "position": 6,
                      "snippet": "In photosynthesis, sunlight is used as a catalyst for a chemical reaction, knocking an electron off one chemical so that it can be picked up by another ...Read more",
                      "title": "ELI5- HOW does photosynthesis work? : r/explainlikeimfive",
                      "url": "https://www.reddit.com/r/explainlikeimfive/comments/1ir3x1x/eli5_how_does_photosynthesis_work/"
                  },
                  {
                      "cleaned_domain": "oregonforests",
                      "displayed_url": "https://oregonforests.org › photosynthesis-forest",
                      "entity_type": "OrganicResult",
                      "position": 7,
                      "snippet": "Photosynthesis is a natural process by which trees and plants use energy from the sun and carbon dioxide from the air to make the food they need to live and ...Read more",
                      "title": "Photosynthesis in the forest | Oregon ...",
                      "url": "https://oregonforests.org/photosynthesis-forest"
                  },
                  {
                      "cleaned_domain": "khanacademy",
                      "displayed_url": "https://www.khanacademy.org › cellular-energetics › hs...",
                      "entity_type": "OrganicResult",
                      "position": 8,
                      "snippet": "During photosynthesis, photoautotrophs use energy from the sun, along with carbon dioxide and water, to form glucose and oxygen.Read more",
                      "title": "Photosynthesis review (article)",
                      "url": "https://www.khanacademy.org/science/ap-biology/cellular-energetics/photosynthesis/a/hs-photosynthesis-review"
                  }
              ],
              "Pagination": [
                  {
                      "current_page": 1,
                      "entity_type": "Pagination",
                      "next_page_url": "https://www.google.com/search?q=how+does+photosynthesis+work&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=Rg_padOYCI_DkPIP38DA6QM&start=10&sa=N&sstk=Af77f_d_Ckpn9zr4nw6Cc6BLO9H6UBjsk9uJAlWvBrlUuNVUpYrgi43XG-5B92vt17DHQtYFqA7tkfpOU1uYg1YNIukIM36zYV-pRg&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q8NMDegQIQhAW",
                      "other_page_urls": {
                          "3": "https://www.google.com/search?q=how+does+photosynthesis+work&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=Rg_padOYCI_DkPIP38DA6QM&start=20&sa=N&sstk=Af77f_d_Ckpn9zr4nw6Cc6BLO9H6UBjsk9uJAlWvBrlUuNVUpYrgi43XG-5B92vt17DHQtYFqA7tkfpOU1uYg1YNIukIM36zYV-pRg&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q8tMDegQIQhAG",
                          "4": "https://www.google.com/search?q=how+does+photosynthesis+work&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=Rg_padOYCI_DkPIP38DA6QM&start=30&sa=N&sstk=Af77f_d_Ckpn9zr4nw6Cc6BLO9H6UBjsk9uJAlWvBrlUuNVUpYrgi43XG-5B92vt17DHQtYFqA7tkfpOU1uYg1YNIukIM36zYV-pRg&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q8tMDegQIQhAI",
                          "5": "https://www.google.com/search?q=how+does+photosynthesis+work&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=Rg_padOYCI_DkPIP38DA6QM&start=40&sa=N&sstk=Af77f_d_Ckpn9zr4nw6Cc6BLO9H6UBjsk9uJAlWvBrlUuNVUpYrgi43XG-5B92vt17DHQtYFqA7tkfpOU1uYg1YNIukIM36zYV-pRg&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q8tMDegQIQhAK",
                          "6": "https://www.google.com/search?q=how+does+photosynthesis+work&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=Rg_padOYCI_DkPIP38DA6QM&start=50&sa=N&sstk=Af77f_d_Ckpn9zr4nw6Cc6BLO9H6UBjsk9uJAlWvBrlUuNVUpYrgi43XG-5B92vt17DHQtYFqA7tkfpOU1uYg1YNIukIM36zYV-pRg&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q8tMDegQIQhAM",
                          "7": "https://www.google.com/search?q=how+does+photosynthesis+work&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=Rg_padOYCI_DkPIP38DA6QM&start=60&sa=N&sstk=Af77f_d_Ckpn9zr4nw6Cc6BLO9H6UBjsk9uJAlWvBrlUuNVUpYrgi43XG-5B92vt17DHQtYFqA7tkfpOU1uYg1YNIukIM36zYV-pRg&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q8tMDegQIQhAO",
                          "8": "https://www.google.com/search?q=how+does+photosynthesis+work&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=Rg_padOYCI_DkPIP38DA6QM&start=70&sa=N&sstk=Af77f_d_Ckpn9zr4nw6Cc6BLO9H6UBjsk9uJAlWvBrlUuNVUpYrgi43XG-5B92vt17DHQtYFqA7tkfpOU1uYg1YNIukIM36zYV-pRg&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q8tMDegQIQhAQ",
                          "9": "https://www.google.com/search?q=how+does+photosynthesis+work&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=Rg_padOYCI_DkPIP38DA6QM&start=80&sa=N&sstk=Af77f_d_Ckpn9zr4nw6Cc6BLO9H6UBjsk9uJAlWvBrlUuNVUpYrgi43XG-5B92vt17DHQtYFqA7tkfpOU1uYg1YNIukIM36zYV-pRg&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q8tMDegQIQhAS",
                          "10": "https://www.google.com/search?q=how+does+photosynthesis+work&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&ei=Rg_padOYCI_DkPIP38DA6QM&start=90&sa=N&sstk=Af77f_d_Ckpn9zr4nw6Cc6BLO9H6UBjsk9uJAlWvBrlUuNVUpYrgi43XG-5B92vt17DHQtYFqA7tkfpOU1uYg1YNIukIM36zYV-pRg&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q8tMDegQIQhAU"
                      }
                  }
              ],
              "RelatedQuestion": [
                  {
                      "entity_type": "RelatedQuestion",
                      "question": "How does photosynthesis work in simple words?An error has occurred. Please try again later."
                  },
                  {
                      "entity_type": "RelatedQuestion",
                      "question": "How do we get oxygen at night?An error has occurred. Please try again later."
                  },
                  {
                      "entity_type": "RelatedQuestion",
                      "question": "What are the 7 steps of photosynthesis?An error has occurred. Please try again later.Ask anything in AI ModeExplain light-dependent reactionsDescribe the Calvin Cycle in detailSummarize ATP and NADPH production"
                  },
                  {
                      "entity_type": "RelatedQuestion",
                      "question": "What causes photosynthesis to happen?An error has occurred. Please try again later.Ask anything in AI ModeExplain light-dependent reactionsDescribe the Calvin cycleList organisms that photosynthesize"
                  }
              ],
              "RelatedSearch": [
                  {
                      "entity_type": "RelatedSearch",
                      "position": "1",
                      "query": "How does photosynthesis work step by step",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=How+does+photosynthesis+work+step+by+step&sa=X&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q1QJ6BAhLEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "2",
                      "query": "How does photosynthesis work simple",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=How+does+photosynthesis+work+simple&sa=X&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q1QJ6BAhXEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "3",
                      "query": "How does photosynthesis work in plants",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=How+does+photosynthesis+work+in+plants&sa=X&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q1QJ6BAhWEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "4",
                      "query": "What is photosynthesis",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=What+is+photosynthesis&sa=X&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q1QJ6BAhYEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "5",
                      "query": "How does photosynthesis work simple explanation",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=How+does+photosynthesis+work+simple+explanation&sa=X&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q1QJ6BAhZEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "6",
                      "query": "How does photosynthesis work diagram",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=How+does+photosynthesis+work+diagram&sa=X&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q1QJ6BAhVEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "7",
                      "query": "How does photosynthesis work for kids",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=How+does+photosynthesis+work+for+kids&sa=X&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q1QJ6BAhTEAE"
                  },
                  {
                      "entity_type": "RelatedSearch",
                      "position": "8",
                      "query": "How does photosynthesis work ai",
                      "url": "/search?sca_esv=df7c09adf3a8dae1&hl=en&gl=us&q=How+does+photosynthesis+work+ai&sa=X&ved=2ahUKEwjT07-qh4KUAxWPIUQIHV8gMD0Q1QJ6BAhOEAE"
                  }
              ],
              "SearchInformation": [
                  {
                      "entity_type": "SearchInformation",
                      "query_displayed": "how does photosynthesis work",
                      "total_results": "About 2,170 results"
                  }
              ],
              "TopStory": [
                  {
                      "entity_type": "TopStory",
                      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr3i_kS8dYvrpT6E_emfO0ZLaBJ4fIq1ixZ9s3MLXEtg-T3H-5EcKmijeJNQ&usqp=CAI&s",
                      "url": "https://medium.com/starts-with-a-bang/photosynthesis-is-nearly-100-efficient-a-quantum-experiment-shows-why-ff4ad6b582c8"
                  },
                  {
                      "entity_type": "TopStory",
                      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_6CqtCeGt_aEBkb868Fr3mB_57Lpat1Luh09E7bN540qKU9vljT9uCXc7zg&usqp=CAI&s",
                      "url": "https://www.reddit.com/r/science/comments/1ii597k/photosynthetic_organisms_use_quantum_mechanical/"
                  },
                  {
                      "entity_type": "TopStory",
                      "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-k6nWSxAr0z-mjzeccXvQYHK5NEUqOaq20Fabo4qSZgEijWcZ-wan1iexxA&usqp=CAI&s",
                      "url": "https://www.reddit.com/r/Physics/comments/11k0xph/photosynthesis_may_rely_on_quantum_mechanics_for/"
                  },
                  {
                      "entity_type": "TopStory",
                      "url": "https://www.reddit.com/r/AskPhysics/comments/1smmkby/what_would_the_visual_phenomenology_of_a/"
                  }
              ]
          },
          "total_entities_count": 28,
          "entities_count": {
              "AIOverview": 1,
              "InlineImages": 1,
              "OrganicResult": 8,
              "Pagination": 1,
              "RelatedQuestion": 4,
              "RelatedSearch": 8,
              "SearchInformation": 1,
              "TopStory": 4
          },
          "metrics": {}
      },
    },
    "metadata": {
      "query_time": "2026-04-22T18:11:12.856Z",
      "query_duration": 9701,
      "response_parameters": {
        "input_url": "https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=how+does+photosynthesis+work&q=how+does+photosynthesis+work"
      },
      "driver": "vx10-pro"
    },
    "render_flow": {
        "success": true,
        "results": [
            {
                "name": "wait_and_click",
                "status": "done",
                "duration": 2081,
                "result": true
            },
            {
                "name": "wait",
                "status": "done",
                "duration": 2000,
                "result": true
            }
        ]
    },
  }
  ```
</Accordion>

### Google News

Returns recent news articles matching the query, sourced from Google News.

**Supported parameters:**

* [`query`](#parameters) — search query string (required)
* [`country`](#parameters) — target country for localized results (ISO Alpha-2, e.g. `US`)
* [`locale`](#parameters) — language preference (LCID, e.g. `en`)
* [`no_html`](#parameters) — omit `data.html` from the response

<Warning>
  Pagination not supported. `location` and `time` parameters have no effect on
  this engine.
</Warning>

```bash cURL theme={"system"}
curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search_engine": "google_news",
    "query": "NBA Allstars 2026",
    "country": "US",
    "locale": "en"
}'
```

<Accordion title="Example Response">
  ```json theme={"system"}
  {
    "url": "https://news.google.com/search?hl=en-US&gl=US&ie=UTF-8&sourceid=chrome&q=NBA+Allstars+2026&ceid=US:en",
    "task_id": "96c70522-0a0a-4c69-9f2a-1a5ef83c2b5e",
    "status": "success",
    "data": {
      "html": ".....",
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
    },
    "metadata": {
      "query_time": "2026-04-22T18:14:16.227Z",
      "query_duration": 9701,
      "response_parameters": {
        "input_url": "https://news.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&q=NBA+Allstars+2026"
      },
      "driver": "vx6"
    },
    "redirects": [
        {
            "status_code": 302,
            "url": "https://news.google.com/search?hl=en-US&gl=US&ie=UTF-8&sourceid=chrome&q=NBA+Allstars+2026&ceid=US:en"
        }
    ],
    "final_url": "https://news.google.com/search?hl=en-US&gl=US&ie=UTF-8&sourceid=chrome&q=NBA+Allstars+2026&ceid=US:en",
  }
  ```
</Accordion>

### Google Images

Returns image results for a query, including image URLs, titles, and source pages.

**Supported parameters:**

* [`query`](#parameters) — search query string (required)
* [`start`](#parameters) — result offset for fetching beyond the first batch
* [`country`](#parameters) — target country for localized results (ISO Alpha-2, e.g. `US`)
* [`locale`](#parameters) — language preference (LCID, e.g. `en`)
* [`location`](#parameters) — physical location context (string or raw UULE value)
* [`time`](#parameters) — filter results by recency (`hour`, `day`, `week`, `month`, `year`)
* [`include_pages_html`](#parameters) — return per-page HTML instead of a single stitched string
* [`ads_optimization`](#parameters) — boost sponsored results using incognito rendering (requires JS)
* [`device`](#parameters) — emulate a specific device type (`mobile`)
* [`no_html`](#parameters) — omit `data.html` from the response

<Note>`ads_optimization` requires JS rendering.</Note>

```bash cURL theme={"system"}
curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search_engine": "google_images",
    "query": "NBA Allstars 2026",
    "country": "US",
    "locale": "en"
}'
```

<Accordion title="Example Response">
  ```json theme={"system"}
  {
    "url": "https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=NBA+Allstars+2026&q=NBA+Allstars+2026&udm=2",
    "task_id": "72747c0d-be46-489d-8c57-108f635d56d1",
    "status": "success",
    "data": {
      "html": ".....",
      "parsing": {
          "entities": {
              "ImageResult": [
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1800,
                      "image_url": "https://cdn.nba.com/manage/2026/02/UPDATED_All-Star-Teams-AS26-v5_2x3-NBAApp.jpg",
                      "image_width": 1200,
                      "position": 1,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/news/nba-all-star-faq-2026",
                      "thumbnail_image_height": 275,
                      "thumbnail_image_width": 183,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-0C24LsjHefK_P3NSRnLdP3KM8BNGcGHhg&s",
                      "title": "NBA All-Star FAQ"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 202,
                      "image_url": "https://upload.wikimedia.org/wikipedia/en/5/5f/2026_NBA_All-Star_Game_logo.png",
                      "image_width": 494,
                      "position": 2,
                      "source_domain": "en.wikipedia.org",
                      "source_name": "Wikipedia",
                      "source_url": "https://en.wikipedia.org/wiki/2026_NBA_All-Star_Game",
                      "thumbnail_image_height": 143,
                      "thumbnail_image_width": 351,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlXcT4Bxf7qbyHN8Knj2rt0OuanXxqxg0Cnw&s",
                      "title": "2026 NBA All-Star Game - Wikipedia"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1920,
                      "image_width": 1440,
                      "position": 3,
                      "source_domain": "www.instagram.com",
                      "source_name": "Instagram",
                      "source_url": "https://www.instagram.com/p/DUO_rDLEXtS/",
                      "thumbnail_image_height": 259,
                      "thumbnail_image_width": 194,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2amRRjm79WTn40b9tFeZPIzwuxD5IiU5x9g&s",
                      "title": "NBA | The NBA All-Star Starters & Reserves! The three rosters for the 2026  NBA All-Star Game will be announced Tuesday (2/3) at 7:00pm/et on... |  Instagram"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1350,
                      "image_width": 1080,
                      "position": 4,
                      "source_domain": "www.facebook.com",
                      "source_name": "Facebook",
                      "source_url": "https://www.facebook.com/nba/posts/the-first-west-returns-for-nba-all-star-2026-%EF%B8%8Fwhich-name-stands-out-to-younba-al/1482198169936820/",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkXnVch74ylN670t3A-CFTY-JAsdrzF9BH3Q&s",
                      "title": "The first WEST returns for NBA All-Star 2026! ⭐️ Which name stands out to  you? NBA All-Star Voting continues on the NBA App and NBA.com until January  14! ➡️ https://nba.smart.link/ASV26-FbFeed"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 450,
                      "image_url": "https://cdn.nba.com/manage/2026/01/east-west-starters-2026.jpg",
                      "image_width": 720,
                      "position": 5,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/news/nba-all-star-faq-2026",
                      "thumbnail_image_height": 177,
                      "thumbnail_image_width": 284,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2mWqvMdjCtokCZReQzW7xBD3ndEr-lKTUnA&s",
                      "title": "NBA All-Star FAQ"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1333,
                      "image_url": "https://ca-times.brightspotcdn.com/dims4/default/8383562/2147483647/strip/true/crop/7100x4732+0+0/resize/2000x1333!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fc3%2F03%2F7a13c1d64e29ab56002a3853406c%2Fgettyimages-2203860165.jpg",
                      "image_width": 2000,
                      "position": 6,
                      "source_domain": "www.latimes.com",
                      "source_name": "Los Angeles Times",
                      "source_url": "https://www.latimes.com/sports/story/2025-09-04/nba-all-star-game-2026-format-two-usa-teams-one-world-team-intuit-dome-los-angeles",
                      "thumbnail_image_height": 183,
                      "thumbnail_image_width": 275,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHAq9dl69ek38VzfL98g93AJVjmO0BVfQs8w&s",
                      "title": "NBA All-Star Game format changes up again for L.A. in 2026 - Los Angeles  Times"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 900,
                      "image_url": "https://cdn.nba.com/manage/2025/11/AS26-on-navy.png",
                      "image_width": 1600,
                      "position": 7,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/news/nba-all-star-faq-2026",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6DAROYs7ZvYtq41y77JXssUlh3wMcEOznsg&s",
                      "title": "NBA All-Star FAQ"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://cdn.nba.com/manage/2026/02/16x9-SquareSafezone-7.png",
                      "image_width": 1920,
                      "position": 8,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/news/2026-all-star-reserves",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi3HvFPXx6SK1mW5mW5SRN0lcyz9tpQlyb7g&s",
                      "title": "2026 NBA All-Star reserves announced on NBC/Peacock | NBA.com"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1225,
                      "image_url": "https://cdn.nba.com/manage/2026/02/GettyImages-2261852033-scaled-e1771204269331.jpg",
                      "image_width": 2176,
                      "position": 9,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/allstar/2026",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 299,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgrS7Gpx_xU2h7HAAkkgZ2rDMTVltysvfmbA&s",
                      "title": "2026 NBA All-Star"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1152,
                      "image_url": "https://cdn.nba.com/manage/2026/02/Great_NBA_All_Star_Game_Moments_021226.jpg",
                      "image_width": 2048,
                      "position": 10,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/allstar/2026",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLKLfrUUHzJKYdd2exd84s-uwOeRRKW009yw&s",
                      "title": "2026 NBA All-Star"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://cdn.nba.com/manage/2026/02/bartlett_firsttimer_16x9.jpg",
                      "image_width": 1920,
                      "position": 11,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/news/six-first-time-all-stars-2026",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThnW1B6pGab4WFwtP5s2huAdf-LzG17ODCQA&s",
                      "title": "Six first-time All-Stars include rising stars, veterans and history-makers  | NBA.com"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://cdn.basketballnews.com/images/story/12613/2026-nba-all-star-game-rosters-and-teams.jpeg",
                      "image_width": 1920,
                      "position": 12,
                      "source_domain": "www.basketballnews.com",
                      "source_name": "BasketballNews.com",
                      "source_url": "https://www.basketballnews.com/stories/2026-nba-allstar-game-rosters-revealed-ahead-of-usa-vs-world-showcase",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVKZkIBR5OP9iB3x5Gt5ZULUvtNecfZpCSFw&s",
                      "title": "2026 NBA All-Star Game rosters revealed ahead of USA vs World showcase"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://cdn.nba.com/manage/2026/02/ASUnis.jpg",
                      "image_width": 1920,
                      "position": 13,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/news/2026-all-star-uniforms-court-unveiled",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16K867hht9GbRKmlA9jLGfn5pZ6jQpAbmPw&s",
                      "title": "All-Star Game jerseys, court revealed"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 2048,
                      "image_width": 1638,
                      "position": 14,
                      "source_domain": "www.facebook.com",
                      "source_name": "Facebook",
                      "source_url": "https://www.facebook.com/nba/posts/nbaallstar-2026-is-in-los-angeles-california-the-75th-annual-nba-all-star-game-w/1227871765369463/",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtqx3PLs2eu3n-BrKgkmtmZ_KWRoprByw2Qg&s",
                      "title": "NBAAllStar 2026 is in Los Angeles, California! The 75th annual NBA All-Star  game will be played on Sunday, Feb. 15, at the Intuit Dome, the new home of  the LA Clippers."
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 360,
                      "image_url": "https://sportshub.cbsistatic.com/i/r/2026/02/15/182a5fe3-6d45-4852-82f5-b6caf8a3ace8/thumbnail/640x360/45d8b6049698c6cb15f931e34789b3de/gettyimages-2261177087-1920x1080.jpg",
                      "image_width": 640,
                      "position": 15,
                      "source_domain": "www.cbssports.com",
                      "source_name": "CBS Sports",
                      "source_url": "https://www.cbssports.com/nba/news/2026-nba-all-star-game-format-explained/",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQBSZnk3osWKe5yTNthmIdm5Tdm1moSlo4VQ&s",
                      "title": "NBA All-Star 2026: Which Team Has The Best Roster?"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://www.lasec.net/wp-content/uploads/2025/11/All-Star-26-Explainer-AS26-v716x9_03.png.jpeg",
                      "image_width": 1920,
                      "position": 16,
                      "source_domain": "www.lasec.net",
                      "source_name": "Los Angeles Sports & Entertainment Commission",
                      "source_url": "https://www.lasec.net/2026-nba-all-star-game-to-feature-new-u-s-vs-world-competition/",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhO5MCXW8w8q9pZ30EaoM4jJ-xTZ7kpfnh-A&s",
                      "title": "2026 NBA All-Star Game to feature new U.S. vs. World competition - Los  Angeles Sports & Entertainment Commission"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1500,
                      "image_width": 1200,
                      "position": 17,
                      "source_domain": "www.instagram.com",
                      "source_name": "Instagram",
                      "source_url": "https://www.instagram.com/p/DKh0qKGOTA5/",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH1W8lZwm79-L8PsUMk7exZmDtcIuDQUn0Iw&s",
                      "title": "The 2026 NBA All-Star Game is going to be 🍿 What do you think of the new  format?"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 810,
                      "image_url": "https://www.sportcal.com/wp-content/uploads/sites/32/2025/03/main67e6afdba9aa4.jpg",
                      "image_width": 1440,
                      "position": 18,
                      "source_domain": "www.sportcal.com",
                      "source_name": "Sportcal",
                      "source_url": "https://www.sportcal.com/news/nbas-silver-all-star-game-mini-tournament-format-wont-return-in-2026/",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzQFbWZTs2H4Ar2-GlZezI6Zgds3NwhmBbSw&s",
                      "title": "NBA's Silver: All-Star Game mini-tournament format won't return in 2026 -  Sportcal"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 916,
                      "image_url": "https://www.nbc.com/sites/nbcblog/files/2026/02/nba-all-stars-2026-court-design.jpg",
                      "image_width": 1825,
                      "position": 19,
                      "source_domain": "www.nbc.com",
                      "source_name": "NBC",
                      "source_url": "https://www.nbc.com/nbc-insider/the-2026-nba-all-star-game-court-design-explained",
                      "thumbnail_image_height": 159,
                      "thumbnail_image_width": 317,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu7tTV54W5l3LXsjtcKFbeOvSHG68B0y5P_w&s",
                      "title": "The 2026 NBA All-Star Game's Court Design, Explained"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 360,
                      "image_url": "https://i0.wp.com/thesource.metro.net/wp-content/uploads/2026/01/1920x1080_ID_AS.jpg?resize=640%2C360&ssl=1",
                      "image_width": 640,
                      "position": 20,
                      "source_domain": "thesource.metro.net",
                      "source_name": "Metro's The Source",
                      "source_url": "https://thesource.metro.net/nba-all-star-weekend-2026-your-complete-metro-guide-to-intuit-dome/",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmkoZZn3XBh3uUMbPzTiPznkeVpvBUzZqLjQ&s",
                      "title": "NBA All-Star Weekend 2026: Your Complete Metro Guide to Intuit Dome | The  Source"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 728,
                      "image_url": "https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2026%2F0215%2Fr1615728_1296x729_16%2D9.jpg",
                      "image_width": 1295,
                      "position": 21,
                      "source_domain": "www.espn.ph",
                      "source_name": "ESPN.com",
                      "source_url": "https://www.espn.ph/nba/story/_/id/47900664/nba-all-star-weekend-2026-live-updates-results-highlights",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8KL6y2wPOHFkUWf-7BmMYxk29P5RaNU5Zsw&s",
                      "title": "NBA All-Star 2026: Best moments, highlights from Los Angeles - ESPN"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 900,
                      "image_url": "https://www.zagsblog.com/wp-content/uploads/2026/01/AS26-on-white.png",
                      "image_width": 1600,
                      "position": 22,
                      "source_domain": "www.zagsblog.com",
                      "source_name": "Zagsblog",
                      "source_url": "https://www.zagsblog.com/2026/01/19/starters-announced-for-2026-nba-all-star-game/",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUYj6twK2As3C_6tE4_vcFqFaaHly2RJ4UWQ&s",
                      "title": "Starters announced for 2026 NBA All-Star Game | Zagsblog"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 910,
                      "image_url": "https://cdn.nba.com/manage/2026/02/GettyImages-2261254524-scaled-e1771171995776.jpg",
                      "image_width": 1620,
                      "position": 23,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/allstar/2026",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTJ-Ci0O30cKoW7Ql6d4KrZhKBPOOJkFrRtA&s",
                      "title": "2026 NBA All-Star"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1200,
                      "image_url": "https://pbs.twimg.com/media/HARi6jxXEAAlKNh.jpg",
                      "image_width": 960,
                      "position": 24,
                      "source_domain": "x.com",
                      "source_name": "x.com",
                      "source_url": "https://x.com/NBAPR/status/2018847294989520925",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJjYPc-UL9NZcwI20JaaGDW6U5erEOD2kSrg&s",
                      "title": "The team rosters are set for the 2026 NBA All-Star Game. USA Stars, USA  Stripes and Team World will compete in a round-robin mini-tournament with  four 12-minute games. Watch the 75th NBA"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 386,
                      "image_url": "https://i.ytimg.com/vi/CvrN7O9i9rE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDxSjQr7_9CKVlARe4nInA5ghw1eA",
                      "image_width": 686,
                      "position": 25,
                      "source_domain": "www.youtube.com",
                      "source_name": "YouTube",
                      "source_url": "https://www.youtube.com/watch?v=CvrN7O9i9rE",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 299,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCl324AqijWcEoVjWyGxKdsDeC91z9MRX4ow&s",
                      "title": "The FULL 2026 NBA All-Star Game Tournament | USA vs. World"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 590,
                      "image_url": "https://www.nbc.com/sites/nbcblog/files/styles/scale_862/public/2026/01/NBA-Split.jpg",
                      "image_width": 862,
                      "position": 26,
                      "source_domain": "www.nbc.com",
                      "source_name": "NBC",
                      "source_url": "https://www.nbc.com/nbc-insider/2026-nba-all-star-game-starters-revealed-everything-to-know",
                      "thumbnail_image_height": 186,
                      "thumbnail_image_width": 271,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpA0S4hkEIJhfTDd5yASn-P_Ld80LUs7JPXA&s",
                      "title": "2026 NBA All-Star Game Lineup Starters Revealed: What to know"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 524,
                      "image_url": "https://images.foxtv.com/static.foxla.com/www.foxla.com/content/uploads/2026/02/932/524/gettyimages-2261209944.jpg?ve=1&tl=1",
                      "image_width": 932,
                      "position": 27,
                      "source_domain": "www.foxla.com",
                      "source_name": "FOX 11 Los Angeles",
                      "source_url": "https://www.foxla.com/sports/2026-nba-all-star-game-usa-vs-world-format-explained",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDB_rVxNN16vezyIJAcl_dTUzDIcgQ5rnAFw&s",
                      "title": "2026 NBA All-Star Game: USA vs. World format explained | FOX 11 Los Angeles"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 998,
                      "image_url": "https://cdn.prod.website-files.com/66fd72ac6f0cd08e0277f262/68ffa1028fb4326dfaa54f53_AS26_LosAngeles_Primary_onDkBkgd.png",
                      "image_width": 2400,
                      "position": 28,
                      "source_domain": "nbaevents.nba.com",
                      "source_name": "NBA Events",
                      "source_url": "https://nbaevents.nba.com/all-star",
                      "thumbnail_image_height": 145,
                      "thumbnail_image_width": 348,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBstCfSJSbs7OsA8RqCx5NmC8ta9htTmoNVw&s",
                      "title": "All Star 2026 - NBA Events"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 386,
                      "image_url": "https://i.ytimg.com/vi/6v3rkCSy1b8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDWT4kHFJAgTvYzLWhH4oi89DXwzA",
                      "image_width": 686,
                      "position": 29,
                      "source_domain": "www.youtube.com",
                      "source_name": "YouTube",
                      "source_url": "https://www.youtube.com/watch?v=6v3rkCSy1b8",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 299,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhC6ZnNMTTPwaNWWkxhlTT-wqqM6qUSJX4PA&s",
                      "title": "NBA All Star Game Full Game Highlights – February 15, 2026 | NBA All Star  Game"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 630,
                      "image_url": "https://d2xpg1khvwxlf1.cloudfront.net/production/images/original/92602-1709855523413-19b0c0ec5dfc0faa1b7c0fcdee3b88a0.jpg",
                      "image_width": 1200,
                      "position": 30,
                      "source_domain": "nbaexperiences.com",
                      "source_name": "NBA Experiences",
                      "source_url": "https://nbaexperiences.com/blog/future-locations-nba-all-star",
                      "thumbnail_image_height": 163,
                      "thumbnail_image_width": 310,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNdFB0QDPH0tduWVyUT03HLyP_f_VIcbNbJg&s",
                      "title": "The Future Locations of NBA All-Star"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://cdn.nba.com/manage/2026/01/Rising-Stars-Draft_UPDATED_1x1-YTCom-1.jpg",
                      "image_width": 1080,
                      "position": 31,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/news/2026-rising-stars-roster-announcement",
                      "thumbnail_image_height": 225,
                      "thumbnail_image_width": 225,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvOW3LlJGDwMf1w5EzWurQU_equA6TsRSCcg&s",
                      "title": "NBA Rising Stars"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 2048,
                      "image_width": 2048,
                      "position": 32,
                      "source_domain": "www.facebook.com",
                      "source_name": "Facebook",
                      "source_url": "https://www.facebook.com/nba/posts/the-usa-stars-are-the-2026-nba-all-star-champions-/1521866379303332/",
                      "thumbnail_image_height": 225,
                      "thumbnail_image_width": 225,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6VpybHwNWQXKBU00xngVGAXDgumOOXgPz_Q&s",
                      "title": "The USA Stars are the 2026 NBA All-Star Champions! 🏆"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 3416,
                      "image_url": "https://okcthunderwire.usatoday.com/gcdn/authoring/authoring-images/2026/02/15/SOKC/88688599007-usatsi-28226230.jpg",
                      "image_width": 5124,
                      "position": 33,
                      "source_domain": "okcthunderwire.usatoday.com",
                      "source_name": "OKC Thunder Wire - USA Today",
                      "source_url": "https://okcthunderwire.usatoday.com/story/sports/nba/thunder/2026/02/15/watch-2026-nba-all-star-game-today-tv-channel-time-streaming/88688576007/",
                      "thumbnail_image_height": 183,
                      "thumbnail_image_width": 275,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLeriuZXrzX2uEKDTSv-hZj107Xt0sO_SHRg&s",
                      "title": "Watch 2026 NBA All-Star Game today: TV channel, time, streaming"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 821,
                      "image_url": "https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w1460/f_auto/primary/cadbtrxfmdzqv07fr4av",
                      "image_width": 1460,
                      "position": 34,
                      "source_domain": "www.olympics.com",
                      "source_name": "Olympics.com",
                      "source_url": "https://www.olympics.com/en/news/2026-nba-all-star-game-what-could-a-potential-starting-lineup-look-like-for-team-world",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6nIpdFw-lKakXSx9herME13vFWbfKILHD1g&s",
                      "title": "2026 NBA All-Star Game: What could a potential starting lineup look like  for Team World?"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 720,
                      "image_url": "https://www.ncaa.com/sites/default/files/public/thumbnails/2026-02/all-stars-in-MM.jpg?crop=ar&aw=1280&ah=720&ax=0.5&ay=0.5",
                      "image_width": 1280,
                      "position": 35,
                      "source_domain": "www.ncaa.com",
                      "source_name": "NCAA.com",
                      "source_url": "https://www.ncaa.com/news/basketball-men/article/2026-02-04/2026-nba-all-star-game-rosters-where-players-attended-college",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO89PB9A2Rbuu_lr0v0BM9mU5mVPNc2A58ug&s",
                      "title": "2026 NBA All-Stars and their March Madness highlights"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 3750,
                      "image_url": "https://www.lasec.net/wp-content/uploads/2025/02/LA-Clippers-and-City-of-Los-Angeles-Are-Next-Up-for-NBA-All-Star-2026.png",
                      "image_width": 6668,
                      "position": 36,
                      "source_domain": "www.lasec.net",
                      "source_name": "Los Angeles Sports & Entertainment Commission",
                      "source_url": "https://www.lasec.net/la-clippers-and-city-of-los-angeles-are-next-up-for-nba-all-star-2026/",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjVAG5kn78hBlom_kf7DwLoFdvn14uD-3GNg&s",
                      "title": "LA Clippers and City of Los Angeles Are Next Up for NBA All-Star 2026 - Los  Angeles Sports & Entertainment Commission"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 900,
                      "image_url": "https://cdn.nba.com/manage/2026/02/as26-wmk.png",
                      "image_width": 1600,
                      "position": 37,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/allstar/2026/schedule",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb2yFAzXPfDRQ2h9sOWmroDejCcnfW79FAhQ&s",
                      "title": "2026 All-Star | Schedule | NBA.com"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 2000,
                      "image_url": "https://gsp-image-cdn.wmsports.io/cms/prod/bleacher-report/2026-01/national-photorsize.jpg?w=3800&h=2000",
                      "image_width": 3556,
                      "position": 38,
                      "source_domain": "bleacherreport.com",
                      "source_name": "Bleacher Report",
                      "source_url": "https://bleacherreport.com/articles/25357475-nba-all-star-game-2026-starters-revealed-usa-vs-world-rosters-new-format",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_TfkKIQaLcU3nXkJMVBG4pB2mIRHH7MFz8A&s",
                      "title": "NBA All-Star Game 2026 Starters Revealed for USA vs. World Rosters in New  Format"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 432,
                      "image_url": "https://www.sportsnet.ca/wp-content/uploads/2026/02/Kawhi-1-768x432.jpg",
                      "image_width": 768,
                      "position": 39,
                      "source_domain": "www.sportsnet.ca",
                      "source_name": "Sportsnet",
                      "source_url": "https://www.sportsnet.ca/nba/article/2026-nba-all-star-game-live-blog-latest-updates-and-analysis/",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjnWIC1k22hQrjAC6LGH1y3pTeaPHFS1esmg&s",
                      "title": "2026 NBA All-Star Game Blog Recap: Notable moments and analysis -  Sportsnet.ca"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1250,
                      "image_url": "https://content.sportslogos.net/news/2026/02/IMG_8989-1000x1250.jpeg",
                      "image_width": 1000,
                      "position": 40,
                      "source_domain": "news.sportslogos.net",
                      "source_name": "SportsLogos.Net News",
                      "source_url": "https://news.sportslogos.net/2026/02/03/nba-reveals-uniforms-court-design-for-2026-all-star-game-in-los-angeles/basketball/",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5HEn96V1Rw9e2VEm6g1yNXDFKutPMgxVlnA&s",
                      "title": "NBA Reveals Uniforms, Court Design For 2026 All-Star Game In Los Angeles –  SportsLogos.Net News"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://cdn.nba.com/manage/2026/02/906372786.9c514a57-4433-4392-afb3-f4d95bed8093.jpeg",
                      "image_width": 1920,
                      "position": 41,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/allstar/2026",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRBKhzDB0ZRipqgqIt4I24b-I6is1jtj1l6g&s",
                      "title": "2026 NBA All-Star"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 550,
                      "image_url": "https://www.sling.com/whatson/sports/nba/media_18daf10ea34ff34707c9dfdd82d358d646565ec6a.jpg?width=750&format=jpg&optimize=medium",
                      "image_width": 750,
                      "position": 42,
                      "source_domain": "www.sling.com",
                      "source_name": "Sling TV",
                      "source_url": "https://www.sling.com/whatson/sports/nba/stream-nba-all-star-game",
                      "thumbnail_image_height": 192,
                      "thumbnail_image_width": 262,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDDktHYDAHvY1-NpwQ0H2rsRLxHIUy683QSQ&s",
                      "title": "Stream NBA All-Star Weekend with Sling"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1500,
                      "image_url": "https://espnpressroom.com/us/files/2026/02/NBA-All-Star-Celebrity-Game-Rosters.jpg",
                      "image_width": 1200,
                      "position": 43,
                      "source_domain": "espnpressroom.com",
                      "source_name": "ESPN Press Room",
                      "source_url": "https://espnpressroom.com/us/press-releases/2026/02/espn-nba-unveil-rosters-for-2026-ruffles-nba-all-star-celebrity-game/",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTx5NtB3dUgPB0lHmbnCHUPOmQEkCQx0modQ&s",
                      "title": "ESPN, NBA unveil rosters for 2026 Ruffles® NBA All-Star Celebrity Game -  ESPN Press Room U.S."
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 650,
                      "image_url": "https://www.wilson.com/en-us/media/catalog/product/article_images/WZ4043301ID_/WZ4043301ID__f3a633074f5ace1651bcfd210df7cd42.png",
                      "image_width": 650,
                      "position": 44,
                      "source_domain": "www.wilson.com",
                      "source_name": "Wilson",
                      "source_url": "https://www.wilson.com/en-us/product/2026-nba-all-star-auto-bskt-wz40433",
                      "thumbnail_image_height": 225,
                      "thumbnail_image_width": 225,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpMMwWG8WRkG2z8705JxyOjAerVC7o3zbmGg&s",
                      "title": "2026 NBA All-Star Autograph Basketball"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 800,
                      "image_url": "https://phantom.estaticos-marca.com/9b76523e58bc52d1c8941ed1f334cfb9/resize/1200/f/webp/assets/multimedia/imagenes/2026/02/14/17710707042709.png",
                      "image_width": 1200,
                      "position": 45,
                      "source_domain": "www.marca.com",
                      "source_name": "MARCA",
                      "source_url": "https://www.marca.com/en/basketball/nba/2026/02/14/69906585e2704eae408b45c1.html",
                      "thumbnail_image_height": 183,
                      "thumbnail_image_width": 275,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVAiSiHd74SKE6P85VRO7YgMnC8ACcRgBcrA&s",
                      "title": "Here's the new format and rules for the NBA All-Star Game 2026 | Marca"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 486,
                      "image_url": "https://cdn.prod.website-files.com/66fd72ac6f0cd08e0277f262/690c9a73d14f837397ea54b1_251104_NBAU6580_NBAAllStar2026_Crossover_Crossover%20Page%20Hero%20Image%20(728%20x%20485)_v1.jpg",
                      "image_width": 729,
                      "position": 46,
                      "source_domain": "nbaevents.nba.com",
                      "source_name": "NBA Events",
                      "source_url": "https://nbaevents.nba.com/all-star",
                      "thumbnail_image_height": 183,
                      "thumbnail_image_width": 275,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRey4bci8M4uoXQrq8zxKcVVLD48kHrJAOJLA&s",
                      "title": "All Star 2026 - NBA Events"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://cdn.nba.com/manage/2026/02/906368568.4548597e-3366-4952-b0eb-eb366cd0cff7.jpeg",
                      "image_width": 1920,
                      "position": 47,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/allstar/2026",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM-PXmwXgxFPSIrRdkx6CqRF2-OSdiz8JzcA&s",
                      "title": "2026 NBA All-Star"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1445,
                      "image_url": "https://www.pistons313shop.com/cdn/shop/files/PDPPhotos_2.jpg?v=1770300852&width=1445",
                      "image_width": 1445,
                      "position": 48,
                      "source_domain": "www.pistons313shop.com",
                      "source_name": "Pistons 313 Shop",
                      "source_url": "https://www.pistons313shop.com/products/detpnv0080-2026-nba-all-star-jalen-duren-full-size-platinum-basketball?srsltid=AfmBOoosZGO41JnRC0aEqCrY6t0hr3r8jtevs4SYtbvR-IIlxcksb91I",
                      "thumbnail_image_height": 225,
                      "thumbnail_image_width": 225,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRFMUEsHgEtgoWdJjTHG7fbAxHZmw7qYuxcw&s",
                      "title": "2026 NBA All Star Jalen Duren Full Size Platinum Basketball – Pistons 313  Shop"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1152,
                      "image_url": "https://cdn.nba.com/manage/2026/02/16x9-42.png",
                      "image_width": 2048,
                      "position": 49,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/allstar/2026",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8euTbNtVRhylDZAvVnI8CdYM03IK7dngynQ&s",
                      "title": "2026 NBA All-Star"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1350,
                      "image_width": 1080,
                      "position": 50,
                      "source_domain": "www.instagram.com",
                      "source_name": "Instagram",
                      "source_url": "https://www.instagram.com/p/DTtCk2ykoLT/",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1r7AjiWFbdHGIS_3k31VBC8t6OpaYoG5ihg&s",
                      "title": "ESPN | THE 2026 ALL-STAR STARTERS ARE HERE 🤩 | Instagram"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 350,
                      "image_url": "https://www.nydailynews.com/wp-content/uploads/2026/02/AP26047041838794.jpg?w=525",
                      "image_width": 525,
                      "position": 51,
                      "source_domain": "www.nydailynews.com",
                      "source_name": "New York Daily News",
                      "source_url": "https://www.nydailynews.com/2026/02/15/2026-nba-all-star-game-was-a-success-right-until-it-wasnt/",
                      "thumbnail_image_height": 183,
                      "thumbnail_image_width": 275,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx34eSz7JaSotqXzXGBLA31CclLcWnAEykHA&s",
                      "title": "2026 NBA All-Star Game was a success — right until it wasn't"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1247,
                      "image_url": "https://cdn11.bigcommerce.com/s-tpn0wqr1g7/images/stencil/1280x1280/products/10609/22144/5f536396-d754-5dd1-bd83-bfdfdf5c0d1e__45847.1767993711.png?c=2",
                      "image_width": 1280,
                      "position": 52,
                      "source_domain": "www.collectible-supplies.com",
                      "source_name": "Collectible Supplies",
                      "source_url": "https://www.collectible-supplies.com/2026-nba-all-star-game-collectors-edition-mini-basketball-los-angeles/?srsltid=AfmBOoo3ijWqJBq3pMBVsIAxilJ1LyjJNH7dTNP3P-e2WOuazWVMkGh4",
                      "thumbnail_image_height": 222,
                      "thumbnail_image_width": 227,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ71Rt6UE0mdboi5T0EfD0X5zqXpDSsaQrXtQ&s",
                      "title": "2026 NBA All-Star Game Collectors Edition Mini Basketball - Los Angeles"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 900,
                      "image_url": "https://wp.clutchpoints.com/wp-content/uploads/2025/11/Way-too-early-2026-NBA-All-Star-predictions-as-new-format-delivers-major-shake-up.jpg",
                      "image_width": 1600,
                      "position": 53,
                      "source_domain": "clutchpoints.com",
                      "source_name": "ClutchPoints",
                      "source_url": "https://clutchpoints.com/nba/nba-stories/way-too-early-2026-nba-all-star-predictions-new-format-major-shake-up",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJTs_TDYTWRMjsj7b_6esau3SeGJRwnsWjYg&s",
                      "title": "Way-too-early 2026 NBA All-Star predictions as new format delivers major  shake-up"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 960,
                      "image_url": "https://bostonglobe-prod.cdn.arcpublishing.com/resizer/v2/HOXB7UUIX6FYWVTNMZU22AHETQ.jpg?auth=ef8c223acf0272b30ce4df4b8dcca59d319d2c5707d428ce1dac326652de4cbf&width=1440",
                      "image_width": 1440,
                      "position": 54,
                      "source_domain": "www.bostonglobe.com",
                      "source_name": "The Boston Globe",
                      "source_url": "https://www.bostonglobe.com/2025/03/27/sports/nba-all-star-game-format-changing/",
                      "thumbnail_image_height": 183,
                      "thumbnail_image_width": 275,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmVVyc7c1XLtNnWUsk02mJPoMEKNnOxfulMQ&s",
                      "title": "NBA will not keep All-Star mini-tournament format for 2026"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1440,
                      "image_url": "https://platform.sbnation.com/wp-content/uploads/sites/2/2026/01/G9_62KyWMAEyFl2.jpg?quality=90&strip=all&crop=0,0,100,100",
                      "image_width": 1152,
                      "position": 55,
                      "source_domain": "www.sbnation.com",
                      "source_name": "SB Nation",
                      "source_url": "https://www.sbnation.com/nba/1098806/nba-all-star-2026-fan-voting-results-right-wrong-lebron-james-deni-avdija",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4qko9A6nCadgFQaghrAZFB5Gsdr1VO5e0uQ&s",
                      "title": "NBA All-Star 2026 fan voting results got 4 things right and 4 things wrong  thus far | SB Nation"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://cdn.nba.com/manage/2026/02/Rising-Stars-4-Players-Game-Card-AS26.png",
                      "image_width": 1920,
                      "position": 56,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/allstar/2026/schedule",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr9_gZZwOQIRGZDHx4l5TugEc_92aB-4PEYA&s",
                      "title": "2026 All-Star | Schedule | NBA.com"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://espnpressroom.com/us/files/2026/02/Celebrity-Game-Featured-Image.jpg",
                      "image_width": 1920,
                      "position": 57,
                      "source_domain": "espnpressroom.com",
                      "source_name": "ESPN Press Room",
                      "source_url": "https://espnpressroom.com/us/press-releases/2026/02/espn-nba-unveil-rosters-for-2026-ruffles-nba-all-star-celebrity-game/",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKp0dsIBqUPuSF1MH2uFSmD9tl3o07u18Hyw&s",
                      "title": "ESPN, NBA unveil rosters for 2026 Ruffles® NBA All-Star Celebrity Game -  ESPN Press Room U.S."
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 600,
                      "image_url": "https://www.nbc.com/sites/nbcblog/files/styles/scale_600/public/2026/02/rfff.jpg",
                      "image_width": 457,
                      "position": 58,
                      "source_domain": "www.nbc.com",
                      "source_name": "NBC",
                      "source_url": "https://www.nbc.com/nbc-insider/2026-nba-all-star-game-uniforms-usa-stars-usa-stripes-team-world",
                      "thumbnail_image_height": 257,
                      "thumbnail_image_width": 196,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCVuv1vKbqTgNboch0XLNJiA0aZTBHC7kXwg&s",
                      "title": "2026 NBA All-Star Game Uniforms: USA Stars, USA Stripes & Team World"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 2045,
                      "image_url": "https://images.sellbrite.com/production/20292/WZ1023201ID7/a5bce7eb-51ad-5a2b-a3df-1565fbbe2c29.jpg",
                      "image_width": 1905,
                      "position": 59,
                      "source_domain": "www.ebay.com",
                      "source_name": "eBay",
                      "source_url": "https://www.ebay.com/itm/336388274463",
                      "thumbnail_image_height": 233,
                      "thumbnail_image_width": 217,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh7yNv6FSCMVDA2ew_zcs-6-WrkXhqw1NZ6Q&s",
                      "title": "2026 Los Angeles NBA All-Star Game Official On Court Indoor Game Basketball  | eBay"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 583,
                      "image_url": "https://www.billboard.com/wp-content/uploads/2026/02/P1043RTF-e1771358684359.jpg?w=875&h=583&crop=1",
                      "image_width": 875,
                      "position": 60,
                      "source_domain": "www.billboard.com",
                      "source_name": "Billboard",
                      "source_url": "https://www.billboard.com/photos/nba-all-star-photos-celebrities-1236180681/",
                      "thumbnail_image_height": 183,
                      "thumbnail_image_width": 275,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDxUDDSPL8WTSRNKarFzALNgVV1YkLgOVRNA&s",
                      "title": "NBA All-Star Weekend 2026 Photos: Best Celebrity Pictures in L.A."
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 427,
                      "image_url": "https://s1.ticketm.net/dam/a/4a1/8ff1d687-3af0-47a3-abab-f80a74d274a1_RETINA_PORTRAIT_3_2.jpg",
                      "image_width": 640,
                      "position": 61,
                      "source_domain": "www.ticketmaster.com",
                      "source_name": "Ticketmaster",
                      "source_url": "https://www.ticketmaster.com/nba-allstar-tickets/artist/2319871",
                      "thumbnail_image_height": 183,
                      "thumbnail_image_width": 275,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk1ifkjk-fa6jTWz84FNRMosKk-yXqcp2xnA&s",
                      "title": "NBA All-Star Tickets | 2026 NBA Tickets & Schedule | Ticketmaster"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 2251,
                      "image_url": "https://assets.tegnaone.com/assets/AssociatedPress/images/7be68ada-9a70-4130-960c-6e3f784d66e6/20260209T211505/7be68ada-9a70-4130-960c-6e3f784d66e6.jpg",
                      "image_width": 3377,
                      "position": 62,
                      "source_domain": "www.kvue.com",
                      "source_name": "KVUE",
                      "source_url": "https://www.kvue.com/article/syndication/associatedpress/nba-all-star-2026-times-details-how-to-watch-the-weekends-events/616-00c9751f-80ac-417d-8192-1b32cb781a3d",
                      "thumbnail_image_height": 183,
                      "thumbnail_image_width": 275,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrjLUTc3o1YCKjikkgCXY_kbkukBEVKly1nQ&s",
                      "title": "NBA All-Star 2026: Times, details, how to watch the weekend's events |  kvue.com"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 900,
                      "image_url": "https://cdn.nba.com/manage/2026/02/assat.png",
                      "image_width": 1600,
                      "position": 63,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/allstar/2026/schedule",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjR5nwtixVN-1jKZ3bYb_M6BKuWmv0n23R6Q&s",
                      "title": "2026 All-Star | Schedule | NBA.com"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1140,
                      "image_url": "https://content.presspage.com/uploads/1441/341963fc-f7df-4295-ad3f-703ea4208d50/1920_sf_3-point_contest.jpg?46297",
                      "image_width": 1920,
                      "position": 64,
                      "source_domain": "newsroom.statefarm.com",
                      "source_name": "State Farm Newsroom",
                      "source_url": "https://newsroom.statefarm.com/state-farm-is-bringing-the-swish-to-nba-all-star-2026/",
                      "thumbnail_image_height": 173,
                      "thumbnail_image_width": 291,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1e5BocjQX5F0Bh8SA_lmj5UGSqg5UiRzUTg&s",
                      "title": "State Farm® is bringing the swish to NBA All-Star 2026"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 441,
                      "image_url": "https://cdn.nba.com/manage/2026/01/UPDATED-EAST-STARTERS_16x9-YTThumbnail-2-784x441.jpg",
                      "image_width": 784,
                      "position": 65,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/news/2026-all-star-starters",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTsgQrkHgHUTaDk-UDAjHxkoiEoBU1LjHVSA&s",
                      "title": "Luka Dončić, Giannis Antetokounmpo lead 2026 All-Star starters | NBA.com"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1288,
                      "image_url": "https://cdn.shopify.com/s/files/1/0662/9749/5709/files/4eda02975634f56be2293c4e52a854d0a395e2e0_ALL_STAR_SET.png?v=1771401801",
                      "image_width": 904,
                      "position": 66,
                      "source_domain": "www.topps.com",
                      "source_name": "Topps",
                      "source_url": "https://www.topps.com/products/2026-all-star-game-set-nba-topps-now%C2%AE-26-card-set",
                      "thumbnail_image_height": 268,
                      "thumbnail_image_width": 188,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPvHtPWAYLkj-e0YaXNs_n-0-rrwFNVy_oow&s",
                      "title": "2026 All-Star Game Set - NBA Topps NOW® - 26 Card Set - PR: 4967"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1280,
                      "image_url": "https://cdn11.bigcommerce.com/s-tpn0wqr1g7/images/stencil/1280x1280/products/10611/22153/0ac9b7c6-1f0c-5e8c-815e-08bfdde00658__98680.1767997563.png?c=2",
                      "image_width": 1237,
                      "position": 67,
                      "source_domain": "www.collectible-supplies.com",
                      "source_name": "Collectible Supplies",
                      "source_url": "https://www.collectible-supplies.com/2026-nba-all-star-game-white-panel-autograph-full-size-basketball-los-angeles/?srsltid=AfmBOori70rEg0tB1IDL5-QYKAKm_R0PL73mjKnDJLoJcxKW3XHCu3YY",
                      "thumbnail_image_height": 228,
                      "thumbnail_image_width": 221,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7wBzOF87w4U9e4EkdeeLuNEFKc2NUXYKkcQ&s",
                      "title": "2026 NBA All-Star Game White Panel Autograph Full Size Basketball - Los  Angeles"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 386,
                      "image_url": "https://i.ytimg.com/vi/jFIeiAymcSQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCF1nDsB-oIzG3aXI6kHyd3SN26GA",
                      "image_width": 686,
                      "position": 68,
                      "source_domain": "www.youtube.com",
                      "source_name": "YouTube",
                      "source_url": "https://www.youtube.com/watch?v=jFIeiAymcSQ",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 299,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcUqTpg70hq9MNXnR-WycTz90l9BugEeF78w&s",
                      "title": "NBA All-Star Weekend 2026 Like You’ve Never Seen It 🎥"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 900,
                      "image_url": "https://cdn.nba.com/manage/2026/02/kia-shooting-stars.png",
                      "image_width": 1600,
                      "position": 69,
                      "source_domain": "www.nba.com",
                      "source_name": "NBA",
                      "source_url": "https://www.nba.com/allstar/2026",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ8DFvJPZuGMMtLZ0la97O8mBm_zr3zvwvzg&s",
                      "title": "2026 NBA All-Star"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 800,
                      "image_url": "https://wonderjackets.com/wp-content/uploads/2026/02/NBA-All-Star-Warm-Up-Tracksuit-2026.webp",
                      "image_width": 600,
                      "position": 70,
                      "source_domain": "wonderjackets.com",
                      "source_name": "Wonder Jackets",
                      "source_url": "https://wonderjackets.com/product/nba-all-star-game-warmnba-all-star-warm-up-tracksuit-2026-up-tracksuit-2026/",
                      "thumbnail_image_height": 259,
                      "thumbnail_image_width": 194,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJw0HjVIJszsDJrn5Xpom-IHUNs-66WhS1rw&s",
                      "title": "NBA All-Star Warm-Up Tracksuit 2026 - Light Blue"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1085,
                      "image_url": "https://wwd.com/wp-content/uploads/2026/02/best-nba-all-star-sneakers-2026-001.jpg",
                      "image_width": 2000,
                      "position": 71,
                      "source_domain": "wwd.com",
                      "source_name": "WWD",
                      "source_url": "https://wwd.com/footwear-news/sneaker-news/nba-all-star-game-2026-best-sneakers-1238609983/",
                      "thumbnail_image_height": 165,
                      "thumbnail_image_width": 305,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZaqj-rr8vjMDzP6httvM5jwgEzyziY_x1cA&s",
                      "title": "Best Sneakers From NBA All-Star Game 2026"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1620,
                      "image_url": "https://prod.cosm-cdn.io/venue-events/Sports_Events/nba/2026/February/02_15_NBA_All_Star_Game/Product_Assets/Event_Image/PNG_021526-NBA-AllStarGame.png",
                      "image_width": 2880,
                      "position": 72,
                      "source_domain": "cosm.com",
                      "source_name": "Cosm",
                      "source_url": "https://cosm.com/los-angeles/events/nba-all-star-game-hwp-2026-02-15-1400",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuSdqyh_FiJtlMlbFoD06snrb43wC-lGWtTw&s",
                      "title": "NBA: All-Star Game"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 2560,
                      "image_url": "https://kith.com/cdn/shop/files/M_NBA_ALLSTAR_25_GRID_3x4_3dc8be98-9f96-4c0e-86c2-270dfd6b6fb4.jpg?v=1770823453&width=1920",
                      "image_width": 1920,
                      "position": 73,
                      "source_domain": "kith.com",
                      "source_name": "Kith",
                      "source_url": "https://kith.com/blogs/discover/a-closer-look-at-kith-for-nba-all-star-2026?srsltid=AfmBOoqlLEKoJFkSQDEnLVzPuj7fBZ9DZxWTrhMxkw0BcLvQIhbRiXAb",
                      "thumbnail_image_height": 259,
                      "thumbnail_image_width": 194,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbFRj6Kdh45MfrHpP268uV3tFCl3m8AuLavA&s",
                      "title": "A Closer Look at Kith for NBA All-Star 2026"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1472,
                      "image_url": "https://www.latinosports.com/wp-content/uploads/2025/11/IMG_7159.jpeg",
                      "image_width": 1179,
                      "position": 74,
                      "source_domain": "www.latinosports.com",
                      "source_name": "Latino Sports",
                      "source_url": "https://www.latinosports.com/team-rosters-set-for-the-2026-nba-all-star-game-in-los-angeles/",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPCo_jE2iIFVXmQsMCl2FQIHPAavXN6N7vZQ&s",
                      "title": "Team rosters set for the 2026 NBA All-Star Game in Los Angeles – Latino  Sports"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 2000,
                      "image_url": "https://ncataggies.com/images/2025/7/8/NBA_All-Star_Posting.jpg",
                      "image_width": 1600,
                      "position": 75,
                      "source_domain": "ncataggies.com",
                      "source_name": "North Carolina A&T",
                      "source_url": "https://ncataggies.com/news/2025/7/8/mens-basketball-hampton-and-a-t-selected-to-play-in-2026-nba-hbcu-classic-presented-by-at-t-during-nba-all-star-weekend.aspx",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPyAK7gKyzvAdtaVVgsIGG2JIoD6RQv1qBQw&s",
                      "title": "Hampton and A&T Selected to Play in 2026 NBA HBCU Classic Presented by AT&T  During NBA All-Star Weekend - North Carolina A&T"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1473,
                      "image_url": "https://www.tiktok.com/api/img/?itemId=7607299586142653727&location=0&aid=1988",
                      "image_width": 1014,
                      "position": 76,
                      "source_domain": "www.tiktok.com",
                      "source_name": "TikTok",
                      "source_url": "https://www.tiktok.com/@nba/video/7607299586142653727",
                      "thumbnail_image_height": 271,
                      "thumbnail_image_width": 186,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3gz_AZ_6KYwe2zsBBo6ooAYz9Hwql3w29JA&s",
                      "title": "Celebrities at the 2026 NBA All-Star Game: Highlights"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://library.sportingnews.com/styles/twitter_card_120x120/s3/2025-02/NBA%20All-Star%20021325.jpeg?itok=m1JD5lK_",
                      "image_width": 1920,
                      "position": 77,
                      "source_domain": "www.sportingnews.com",
                      "source_name": "The Sporting News",
                      "source_url": "https://www.sportingnews.com/us/nba/news/where-2026-nba-all-star-game-dates-locations-future-cities/044e05ad93e2b70930145ca2",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7hIf7EggkFyo0wsJ3lsNIXBvvwZ8SZPOimA&s",
                      "title": "Where is the 2026 NBA All-Star Game? Dates, locations & more to know for all  future cities | Sporting News"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 880,
                      "image_url": "https://www.eventmarketer.com/wp-content/uploads/2026/02/google-nba-all-star-weekend-20262-copy-1280x880.jpg",
                      "image_width": 1280,
                      "position": 78,
                      "source_domain": "www.eventmarketer.com",
                      "source_name": "Event Marketer",
                      "source_url": "https://www.eventmarketer.com/article/nba-all-star-2026-la-crossover-activations/",
                      "thumbnail_image_height": 186,
                      "thumbnail_image_width": 271,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmEIObYbE7GHcA6h-rchKksS9BYoyyDj96fQ&s",
                      "title": "NBA All-Star 2026: Vaults, Giant To-Go Bags, and a Rolling Logo"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1200,
                      "image_url": "https://wp.clutchpoints.com/wp-content/uploads/2026/01/2026-NBA-All-Star-reserve-predictions-Jamal-Murray-Michael-Porter-Jr-headline-vast-list-of-first-time-All-Stars.jpg?resize=1200,1200",
                      "image_width": 1200,
                      "position": 79,
                      "source_domain": "clutchpoints.com",
                      "source_name": "ClutchPoints",
                      "source_url": "https://clutchpoints.com/nba/nba-stories/2026-nba-all-star-reserve-predictions-jamal-murray-michael-porter-jr-first-time-all-stars",
                      "thumbnail_image_height": 225,
                      "thumbnail_image_width": 225,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJL9DJP9VMWisHw6KtP7sZOO6Lm11meNjiow&s",
                      "title": "2026 NBA All-Star reserve predictions: Jamal Murray, Michael Porter Jr.  headline first-time All-Stars"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1250,
                      "image_url": "https://content.sportslogos.net/news/2026/02/IMG_8988-1000x1250.jpeg",
                      "image_width": 1000,
                      "position": 80,
                      "source_domain": "news.sportslogos.net",
                      "source_name": "SportsLogos.Net News",
                      "source_url": "https://news.sportslogos.net/2026/02/03/nba-reveals-uniforms-court-design-for-2026-all-star-game-in-los-angeles/basketball/",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSczEStHwh2pVluKygS0ZE17YRCVLPNQg0V9w&s",
                      "title": "NBA Reveals Uniforms, Court Design For 2026 All-Star Game In Los Angeles –  SportsLogos.Net News"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 853,
                      "image_url": "https://img.turkiyetoday.com/images/2026/2/15/alperen-sengun-joins-global-stars-at-nba-all-star-2026-in-la-3214556_20260215100742.jpg",
                      "image_width": 1280,
                      "position": 81,
                      "source_domain": "www.turkiyetoday.com",
                      "source_name": "Türkiye Today",
                      "source_url": "https://www.turkiyetoday.com/sports/alperen-sengun-joins-global-stars-at-nba-all-star-2026-in-la-3214556",
                      "thumbnail_image_height": 183,
                      "thumbnail_image_width": 275,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_uvENYeLsAPdnXok-QMX-qWZq0-cM11IPog&s",
                      "title": "Alperen Sengun joins global stars at NBA All-Star 2026 in LA - Türkiye Today"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://cdn2.nbcuni.com/NBCUniversal/2026-02/Untitled%20design%20%286%29.jpg?VersionId=NkH5uiqwrgNsRGe_AaaGbJxCfUG34zBI",
                      "image_width": 1920,
                      "position": 82,
                      "source_domain": "www.nbcuniversal.com",
                      "source_name": "NBC Universal",
                      "source_url": "https://www.nbcuniversal.com/article/nbcuniversal-delivers-unmatched-coverage-2026-nba-all-star-weekend-across-nbc-peacock-nbcsn-and",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRGidiUOnUO3O5ID3hNkUo57DOdrSiS5YFZA&s",
                      "title": "NBCUniversal Delivers Unmatched Coverage of the 2026 NBA All-Star Weekend  Across NBC, Peacock, NBCSN and Telemundo | NBCUNIVERSAL MEDIA"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 900,
                      "image_url": "https://images.squarespace-cdn.com/content/v1/66421c2b72b91678aefa2c1e/1b62156f-0225-4921-9dc5-9e352bd0241e/2026+NBA+All-Stars+Nikola+Jokic+and+Giannis+Antetokounmpo.jpg",
                      "image_width": 1600,
                      "position": 83,
                      "source_domain": "www.thesportsnewsblitz.com",
                      "source_name": "Sports News Blitz",
                      "source_url": "https://www.thesportsnewsblitz.com/news/2026-nba-all-stars-why-the-starters-have-been-selected-and-who-missed-out",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-V5qRTyd34GCNATNBQbTtVIEPYBT2jsvjw&s",
                      "title": "2026 NBA All-Stars: Why the starters have been selected and who missed out  — Sports News Blitz"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 760,
                      "image_url": "https://images.soleretriever.com/blog/8a147a0a5a725c56061a075c14482e872adc2c87-1070x760.png?q=75&fit=clip&auto=format&width=1600",
                      "image_width": 1070,
                      "position": 84,
                      "source_domain": "www.soleretriever.com",
                      "source_name": "Sole Retriever",
                      "source_url": "https://www.soleretriever.com/news/articles/where-to-buy-jordan-nba-all-star-jerseys-2026",
                      "thumbnail_image_height": 189,
                      "thumbnail_image_width": 266,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnStUh_le2t3eSA_ifRkLIfs2Xp1Fz3LJSNw&s",
                      "title": "Nike Just Dropped NBA All-Star Jerseys Online"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1084,
                      "image_url": "https://wwd.com/wp-content/uploads/2026/02/nba-all-star-weekend-2026.jpg",
                      "image_width": 2000,
                      "position": 85,
                      "source_domain": "wwd.com",
                      "source_name": "WWD",
                      "source_url": "https://wwd.com/footwear-news/sneaker-news/nba-all-star-weekend-2026-sneaker-releases-1238566034/",
                      "thumbnail_image_height": 165,
                      "thumbnail_image_width": 305,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsNAG8BJcW9x-N4PPRKgN2QIRjC-k95tBTpg&s",
                      "title": "NBA All-Star Weekend 2026: All the Sneaker Releases to Know"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1200,
                      "image_url": "https://pbs.twimg.com/media/G_DQqg0XEAAryiH.jpg",
                      "image_width": 960,
                      "position": 86,
                      "source_domain": "x.com",
                      "source_name": "x.com",
                      "source_url": "https://x.com/NBAPR/status/2013339043338027459",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcoY0_k6hqdUMaZlP32T-WcUM-34IzmBT6Ng&s",
                      "title": "Three voting groups determined the starters for the 2026 NBA All-Star Game:  ▪️ Fans (50%) ▪️ NBA players (25%) ▪️ Media panel (25%) Complete voting  results are available here: https://t.co/0YQtBsIaGp Below are"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1562,
                      "image_url": "https://www.interbasket.net/wp-content/uploads/2026/01/NBA-all-star-roster-predictions-2026-scaled.png",
                      "image_width": 2560,
                      "position": 87,
                      "source_domain": "www.interbasket.net",
                      "source_name": "Interbasket",
                      "source_url": "https://www.interbasket.net/news/nba-all-star-roster-predictions-world-vs-usa/42706/",
                      "thumbnail_image_height": 175,
                      "thumbnail_image_width": 288,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjerzznPRdszNu4lyriXFG_MKKqfg6d_2ElQ&s",
                      "title": "2026 NBA All-Star Game Roster Predictions: World vs. USA - Interbasket"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1080,
                      "image_url": "https://cdn.wnba.com/sites/1611661329/2025/10/ALL-STAR-26-WEBSITE-1.jpg",
                      "image_width": 1920,
                      "position": 88,
                      "source_domain": "sky.wnba.com",
                      "source_name": "Chicago Sky - WNBA",
                      "source_url": "https://sky.wnba.com/news/chicago-selected-to-host-2026-all-star-weekend",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUFC6rOmWVFWUOeNEav_wuuo8pOb5kZQvKuQ&s",
                      "title": "Chicago Selected To Host 2026 All-Star Weekend"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1801,
                      "image_width": 1440,
                      "position": 89,
                      "source_domain": "www.instagram.com",
                      "source_name": "Instagram",
                      "source_url": "https://www.instagram.com/p/DTtCQ2UFbSx/",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkUlgzRLfSy67V79R1HzwoXIE4rA8qFoj_XA&s",
                      "title": "2026 West NBA All-Star starters: Luka Doncic Shai Gilgeous-Alexander  Stephen Curry Nikola Jokic Victor Wembanyama"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1440,
                      "image_url": "https://www.wjhl.com/wp-content/uploads/sites/98/2026/02/698e292b3f20d9.92688545.jpeg?w=2560&h=1440&crop=1",
                      "image_width": 2560,
                      "position": 90,
                      "source_domain": "www.wjhl.com",
                      "source_name": "WJHL",
                      "source_url": "https://www.wjhl.com/sports/us-world-sports/ap-nba-all-star-2026-times-details-how-to-watch-the-weekends-events/",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 300,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6VTi1h8Pdpvr8PKqU4wzod9QInn-gLTwnbA&s",
                      "title": "NBA All-Star 2026: Times, details, how to watch the weekend's events | WJHL  | Tri-Cities News & Weather"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1442,
                      "image_url": "https://cdn.basketballnews.com/images/story/12635/2026-nba-all-star-saturday-night.jpg",
                      "image_width": 2560,
                      "position": 91,
                      "source_domain": "www.basketballnews.com",
                      "source_name": "BasketballNews.com",
                      "source_url": "https://www.basketballnews.com/stories/2026-allstar-saturday-night-dame-wins-3rd-3pt-crown-knicks-top-shooting-stars-johnson-claim-dunk-contest",
                      "thumbnail_image_height": 168,
                      "thumbnail_image_width": 299,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtsGzNOea5SpWaDXh8hurri-pWFQT1stF63A&s",
                      "title": "2026 All-Star Saturday night: Dame wins 3rd 3pt crown; Knicks top shooting  stars; Johnson claim dunk contest"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 2501,
                      "image_url": "https://cdn.sanity.io/images/yuh6uno7/production/b96b305f60de5a09b2ee9e8c9cb3aa62c4f49280-6668x2501.jpg?auto=format",
                      "image_width": 6668,
                      "position": 92,
                      "source_domain": "la2050.org",
                      "source_name": "LA2050",
                      "source_url": "https://la2050.org/blog/nba-all-star-weekend-2026-where-to-celebrate",
                      "thumbnail_image_height": 137,
                      "thumbnail_image_width": 367,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS9N44wpo7YrhOX0rj_glnT8IhJrkWnLEIfQ&s",
                      "title": "NBA All-Star Weekend 2026: Where to Celebrate - LA2050"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1018,
                      "image_url": "https://images.footballfanatics.com/nba-all-star/mens-new-era-black-2026-nba-all-star-game-allover-logos-59fifty-fitted-hat_ss5_p-203254789+pv-1+u-7evw1lkoswuzgtwwsfy9+v-pvmf4mxrsaw5m8ayswqc.jpg?_hv=2&w=1018",
                      "image_width": 1018,
                      "position": 93,
                      "source_domain": "shop.monumentalsportsnetwork.com",
                      "source_name": "Monumental Shop - Monumental Sports Network",
                      "source_url": "https://shop.monumentalsportsnetwork.com/mens-new-era-black-2026-nba-all-star-game-allover-logos-59fifty-fitted-hat/p-137703137226303132+z-94-2245533010",
                      "thumbnail_image_height": 225,
                      "thumbnail_image_width": 225,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhCTDcqXtV_0R-8U1mhK4OGgVw9WjXk74yow&s",
                      "title": "Men's New Era Black 2026 NBA All-Star Game Allover Logos 59FIFTY Fitted Hat"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 2557,
                      "image_url": "https://od2-workbench-api.abs-cbn.com/api/upload-raw/20260216040224/d5e9fe1930446ab3e09ba1eb8a6aa175996153828982699464143b8723e8f239.jpg",
                      "image_width": 3835,
                      "position": 94,
                      "source_domain": "www.abs-cbn.com",
                      "source_name": "ABS-CBN",
                      "source_url": "https://www.abs-cbn.com/sports/basketball/2026/2/16/young-usa-stars-beat-stripes-in-nba-all-star-tourney-final-1227",
                      "thumbnail_image_height": 183,
                      "thumbnail_image_width": 275,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlBi7xDCXcqcGKDhtLp3J1xk3lUFXrssTCzA&s",
                      "title": "Young USA Stars beat Stripes in NBA All-Star tourney final | ABS-CBN Sports"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 320,
                      "image_url": "https://imageio.forbes.com/specials-images/imageserve/698e2f95a69211835441b5a1/Team-LeBron-v-Team-Giannis---NBA-All-Star-2024/0x0.jpg?format=jpg&width=480",
                      "image_width": 480,
                      "position": 95,
                      "source_domain": "www.forbes.com",
                      "source_name": "Forbes",
                      "source_url": "https://www.forbes.com/sites/bryantoporek/2026/02/12/antetokounmpo-and-curry-out-2026-nba-all-star-game-roster-tracker/",
                      "thumbnail_image_height": 183,
                      "thumbnail_image_width": 275,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPdcjmm0NvCSBf-4RJltV9krOBSuhOv2c6Ug&s",
                      "title": "Antetokounmpo And Curry Out: 2026 NBA All-Star Game Roster Tracker"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1225,
                      "image_url": "https://cdn.shopify.com/s/files/1/0662/9749/5709/files/276bc28824057e231cd181eacd7eb96e100fa929_AllStar_Unnumbered.jpg?v=1771401801",
                      "image_width": 875,
                      "position": 96,
                      "source_domain": "www.topps.com",
                      "source_name": "Topps",
                      "source_url": "https://www.topps.com/products/2026-all-star-game-set-nba-topps-now%C2%AE-26-card-set",
                      "thumbnail_image_height": 266,
                      "thumbnail_image_width": 190,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAQu44AwRCe3W83rsFmMCIDlb2AKIq_NoIow&s",
                      "title": "2026 All-Star Game Set - NBA Topps NOW® - 26 Card Set - PR: 4967"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 960,
                      "image_url": "https://www.mlive.com/resizer/v2/4LVAMQIO6NA6PCI6ZSWO7QQ6VU.png?auth=7f4f5cb7824c5506e08e6cf02f00b33cc11107184031ced0417e109d64ffaff7&width=1280&smart=true&quality=90",
                      "image_width": 1280,
                      "position": 97,
                      "source_domain": "www.mlive.com",
                      "source_name": "MLive.com",
                      "source_url": "https://www.mlive.com/shopping/2026/02/cade-cunninghams-official-2026-all-star-jersey-is-available-now-and-it-ships-free-with-this-code.html",
                      "thumbnail_image_height": 194,
                      "thumbnail_image_width": 259,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZSZY9vhTHawZ4WvCtracebLgoeb00zOzK_g&s",
                      "title": "Cade Cunningham jersey 2026 All-Star Game: Official swingman available -  mlive.com"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 760,
                      "image_url": "https://images.soleretriever.com/blog/c5390160521aa2e9df690adb61aa9d5134ac0a84-1070x760.png?q=75&fit=clip&auto=format&width=1600",
                      "image_width": 1070,
                      "position": 98,
                      "source_domain": "www.soleretriever.com",
                      "source_name": "Sole Retriever",
                      "source_url": "https://www.soleretriever.com/news/articles/where-to-buy-jordan-nba-all-star-jerseys-2026",
                      "thumbnail_image_height": 189,
                      "thumbnail_image_width": 266,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ7kbY3_sIWx7Tu58V58wOdpEaZ-DM_4ptEA&s",
                      "title": "Nike Just Dropped NBA All-Star Jerseys Online"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1250,
                      "image_url": "https://images.nowbestshirt.com/2025/08/2026-NBA-All-Star-Los-Angeles-CA-t-shirt.jpg",
                      "image_width": 1000,
                      "position": 99,
                      "source_domain": "nowbestshirt.com",
                      "source_name": "Nowbestshirt",
                      "source_url": "https://nowbestshirt.com/product/2026-nba-all-star-los-angeles-ca-shirt/",
                      "thumbnail_image_height": 251,
                      "thumbnail_image_width": 201,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI3AM6AQeKNLiygxz5sIwE9Ay4oobphG4Dcw&s",
                      "title": "2026 NBA All-Star Los Angeles CA shirt, hoodie, sweatshirt & apparel"
                  },
                  {
                      "entity_type": "ImageResult",
                      "image_height": 1018,
                      "image_url": "https://images.footballfanatics.com/nba-all-star/mens-nike-navy-2026-nba-all-star-game-standard-issue-woven-on-court-game-pants_ss5_p-203175856+pv-2+u-nn3mkmkjvb4qpnmfsucm+v-aolysbsaaadgo8fhx53a.png?_hv=2&w=1018",
                      "image_width": 1018,
                      "position": 100,
                      "source_domain": "www.hornetsfanshop.com",
                      "source_name": "Hornets Fan Shop",
                      "source_url": "https://www.hornetsfanshop.com/mens-nike-navy-2026-nba-all-star-game-standard-issue-woven-on-court-game-pants/p-132225234149860551+z-98-4221091130",
                      "thumbnail_image_height": 225,
                      "thumbnail_image_width": 225,
                      "thumbnail_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmGJoClOtD7-S_TksgCVxsduKNYaq3QeyO-g&s",
                      "title": "Men's Nike Navy 2026 NBA All-Star Game Standard Issue Woven On-Court Game  Pants"
                  }
              ],
              "Pagination": [
                  {
                      "entity_type": "Pagination",
                      "next_page_url": "https://www.google.com/search?vet=12ahUKEwic9OrziIKUAxVZJkQIHezOHs4QxK8CegQILxAC..i&ved=2ahUKEwic9OrziIKUAxVZJkQIHezOHs4Qqq4CegQILxAE&yv=3&q=NBA+All+Stars+2026&sca_esv=df7c09adf3a8dae1&hl=en&gl=us&udm=2&ei=7BDpaZzOFtnMkPIP7J378Aw&start=10&sa=N&asearch=arc&async=arc_id:srp_110,ffilt:all,ve_name:MoreResultsContainer,next_id:srp_1,use_ac:true,_id:arc-srp_110,_pms:qs,_fmt:pc"
                  }
              ]
          },
          "total_entities_count": 101,
          "entities_count": {
              "ImageResult": 100,
              "Pagination": 1
          },
          "metrics": {}
      },
    },
    "metadata": {
      "query_time": "2026-04-22T18:18:16.064Z",
      "query_duration": 9701,
      "response_parameters": {
        "input_url": "https://www.google.com/search?hl=en&gl=us&ie=UTF-8&sourceid=chrome&oq=NBA+Allstars+2026&q=NBA+Allstars+2026&udm=2"
      },
      "driver": "vx6"
    },
    "status_code": 200
  }
  ```
</Accordion>

### Google Maps Search

Returns business and location listings from Google Maps. Optionally bias results around specific coordinates.

**Supported parameters:**

* [`query`](#parameters) — search query string (required)
* [`coordinates`](#parameters) — GPS coordinates to bias results around (latitude,longitude)
* [`offset`](#parameters) — result offset for paginating through listings
* [`country`](#parameters) — target country for localized results (ISO Alpha-2, e.g. `US`)
* [`locale`](#parameters) — language preference (LCID, e.g. `en`)
* [`no_html`](#parameters) — omit `data.html` from the response

<Warning>
  Raw HTML is never returned for this engine — `no_html` is always `true`
  regardless of input.
</Warning>

```bash cURL theme={"system"}
curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search_engine": "google_maps_search",
    "query": "Cinema",
    "coordinates": {
        "latitude": "40.7123695",
        "longitude": "-74.0357317"
    }
}'
```

<Accordion title="Example Response">
  ```json theme={"system"}
  {
    "url": "https://www.google.com/search?tbm=map&tch=1&authuser=0&hl=en&ie=UTF-8&sourceid=chrome&oq=Cinema&q=Cinema&pb=...",
    "task_id": "921adbcd-0519-4144-9d6d-8e9fb4ecec43",
    "status": "success",
    "data": {
      "html": ".....",
      "parsing": {
          "entities": {
              "SearchResult": [
                  {
                      "accessibility": [
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          }
                      ],
                      "address": "30-300 Mall Dr W, Jersey City, NJ 07310",
                      "amenities": [
                          {
                              "description": "Has restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has Wi-Fi",
                              "display_name": "Wi-Fi",
                              "full_path_name": "/geo/type/establishment_poi/has_wi_fi",
                              "is_available": true
                          }
                      ],
                      "business_category": [
                          "Movie theater"
                      ],
                      "business_category_ids": [
                          "movie_theater"
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "6379073079303850828",
                      "city": "Jersey City",
                      "country": "US",
                      "crowd": [
                          {
                              "description": "Family-friendly",
                              "display_name": "Family-friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_families",
                              "is_available": true
                          }
                      ],
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c25753d132d9af:0x5887052af829cb4c",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Offers 3D movies",
                              "display_name": "3D movies",
                              "full_path_name": "/geo/type/movie_theater/has_movies_3D",
                              "is_available": true
                          },
                          {
                              "description": "Has active military discounts",
                              "display_name": "Active military discounts",
                              "full_path_name": "/geo/type/establishment_poi/has_discounts_for_active_military",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.726828499999996",
                      "longitude": "-74.0378384",
                      "number_of_reviews": "4764",
                      "offerings": [
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(201) 626-3258",
                      "place_id": "ChIJr9ky0VNXwokRTMsp-CoFh1g",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHFQqNzUGWg-OqBBv6ckjVRvCYV6NrTc8dkAues5q4WccUKBXrrq1nblzAOMBEmjfOnVQTY-j8PtW95nf6xrloqyqiMvQ1JHLQO3HGBcHd1jbgSesGEGcBN5qMeJ46Zl3QVLpI=w114-h86-k-no",
                                  "latitude": "40.7264207",
                                  "longitude": "-74.0388576",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 0,
                                  "source_type": "photos:gmm_android"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHFQqNzUGWg-OqBBv6ckjVRvCYV6NrTc8dkAues5q4WccUKBXrrq1nblzAOMBEmjfOnVQTY-j8PtW95nf6xrloqyqiMvQ1JHLQO3HGBcHd1jbgSesGEGcBN5qMeJ46Zl3QVLpI=w408-h306-k-no",
                                  "latitude": "40.7264207",
                                  "longitude": "-74.0388576",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 1,
                                  "source_type": "photos:gmm_android"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJr9ky0VNXwokRTMsp-CoFh1g&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://www.amctheatres.com/movie-theatres/jersey-city/amc-newport-centre-11?utm_medium=organic&utm_source=google&utm_campaign=local"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.726828499999996%2C-74.0378384&query_place_id=ChIJr9ky0VNXwokRTMsp-CoFh1g",
                      "position": 1,
                      "rating": "4.3 stars",
                      "review_summary": {
                          "overall_rating": 4.3,
                          "ratings_count": {
                              "1": 245,
                              "2": 117,
                              "3": 313,
                              "4": 1159,
                              "5": 2930
                          },
                          "review_count": 4764
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "30-300 Mall Dr W",
                      "title": "AMC Newport Centre 11",
                      "zip_code": "07310",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJr9ky0VNXwokRTMsp-CoFh1g",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJr9ky0VNXwokRTMsp-CoFh1g"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Offers assisted listening devices",
                              "display_name": "Assisted listening devices",
                              "full_path_name": "/geo/type/bare_properties_holder/has_assisted_listening_devices",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          }
                      ],
                      "address": "102 N End Ave, New York, NY 10282",
                      "amenities": [
                          {
                              "description": "Has restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has stadium seating",
                              "display_name": "Stadium seating",
                              "full_path_name": "/geo/type/movie_theater/has_stadium_seating",
                              "is_available": true
                          }
                      ],
                      "business_category": [
                          "Movie theater"
                      ],
                      "business_category_ids": [
                          "movie_theater"
                      ],
                      "business_description": [
                          "Standard venue for new releases",
                          "Theater complex with multiple screens featuring new release films, plush seating & concession stand."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "7697433580920019052",
                      "city": "New York",
                      "country": "US",
                      "crowd": [
                          {
                              "description": "Family-friendly",
                              "display_name": "Family-friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_families",
                              "is_available": true
                          },
                          {
                              "description": "LGBTQ+ friendly",
                              "display_name": "LGBTQ+ friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_lgbtq",
                              "is_available": true
                          }
                      ],
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c25a1b7d77ece1:0x6ad2c70f20e6986c",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Offers 3D movies",
                              "display_name": "3D movies",
                              "full_path_name": "/geo/type/movie_theater/has_movies_3D",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.7150015",
                      "longitude": "-74.01522179999999",
                      "number_of_reviews": "3616",
                      "offerings": [
                          {
                              "description": "Has arcade games",
                              "display_name": "Arcade games",
                              "full_path_name": "/geo/type/establishment_poi/has_arcade_games",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(844) 462-7342",
                      "place_id": "ChIJ4ex3fRtawokRbJjmIA_H0mo",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH_pgoMVN1NHW281t7yatJPYNxJZnKIDcx-qO_CJ6hogFfxeFPFt6nBfbNXVHgBJ_Y08uQ2XtCd25IP0E_0kzWaHC3RRtsjO30hMIbszMFG20LRJt87Fot6AHva_PhstZOwnC1C=w129-h86-k-no",
                                  "latitude": "40.7146119",
                                  "longitude": "-74.01494579999999",
                                  "max_height": 1331,
                                  "max_width": 2000,
                                  "position": 0,
                                  "source_type": "photos:dragonfly_tactile"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH_pgoMVN1NHW281t7yatJPYNxJZnKIDcx-qO_CJ6hogFfxeFPFt6nBfbNXVHgBJ_Y08uQ2XtCd25IP0E_0kzWaHC3RRtsjO30hMIbszMFG20LRJt87Fot6AHva_PhstZOwnC1C=w408-h271-k-no",
                                  "latitude": "40.7146119",
                                  "longitude": "-74.01494579999999",
                                  "max_height": 1331,
                                  "max_width": 2000,
                                  "position": 1,
                                  "source_type": "photos:dragonfly_tactile"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJ4ex3fRtawokRbJjmIA_H0mo&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://www.regmovies.com/theatres/regal-battery-park-1335?utm_source=google&utm_medium=organic&utm_campaign=gmb-listing"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.7150015%2C-74.01522179999999&query_place_id=ChIJ4ex3fRtawokRbJjmIA_H0mo",
                      "position": 2,
                      "rating": "4.5 stars",
                      "review_summary": {
                          "overall_rating": 4.5,
                          "ratings_count": {
                              "1": 116,
                              "2": 43,
                              "3": 139,
                              "4": 778,
                              "5": 2540
                          },
                          "review_count": 3616
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "102 N End Ave",
                      "title": "Regal Battery Park",
                      "zip_code": "10282",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJ4ex3fRtawokRbJjmIA_H0mo",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJ4ex3fRtawokRbJjmIA_H0mo"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          },
                          {
                              "description": "No wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": false
                          }
                      ],
                      "address": "28 Liberty St Suite SC301, New York, NY 10005",
                      "amenities": [
                          {
                              "description": "Has bar onsite",
                              "display_name": "Bar onsite",
                              "full_path_name": "/geo/type/establishment_poi/has_bar_onsite",
                              "is_available": true
                          },
                          {
                              "description": "Has gender-neutral restroom",
                              "display_name": "Gender-neutral restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom_unisex",
                              "is_available": true
                          },
                          {
                              "description": "Has restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has stadium seating",
                              "display_name": "Stadium seating",
                              "full_path_name": "/geo/type/movie_theater/has_stadium_seating",
                              "is_available": true
                          },
                          {
                              "description": "Has Wi-Fi",
                              "display_name": "Wi-Fi",
                              "full_path_name": "/geo/type/establishment_poi/has_wi_fi",
                              "is_available": true
                          }
                      ],
                      "business_category": [
                          "Movie theater",
                          "Bar",
                          "Beer hall",
                          "Cocktail bar",
                          "Dinner theater",
                          "Event venue",
                          "Restaurant"
                      ],
                      "business_category_ids": [
                          "movie_theater",
                          "bar",
                          "beer_hall",
                          "cocktail_bar",
                          "dinner_theater",
                          "event_venue",
                          "restaurant"
                      ],
                      "business_description": [
                          "Dine-in theater with craft beers & food",
                          "Stylish theater chain for new & classic films features cocktails & creative bites served seat-side."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "5062505719165588415",
                      "city": "New York",
                      "country": "US",
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c25bc7011184ad:0x4641a221183f93bf",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Offers 3D movies",
                              "display_name": "3D movies",
                              "full_path_name": "/geo/type/movie_theater/has_movies_3D",
                              "is_available": true
                          },
                          {
                              "description": "Has live performances",
                              "display_name": "Live performances",
                              "full_path_name": "/geo/type/establishment_poi/has_live_performances",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.7077585",
                      "longitude": "-74.00885029999999",
                      "number_of_reviews": "1542",
                      "offerings": [
                          {
                              "description": "Serves alcohol",
                              "display_name": "Alcohol",
                              "full_path_name": "/geo/type/establishment_poi/serves_alcohol",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "phone_number": "(332) 216-3200",
                      "place_id": "ChIJrYQRAcdbwokRv5M_GCGiQUY",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFAxg2xMG5Rb4AH0Ka7Ya2A44OZ3hJRJyJQ1W2YCHIPH7QEGSQouXTjUnBgjJFalK-zQ38HaYoLqIrLVJnhxuNDmyXOtRTTV2HCJCXict3NxGEt4jIbHy2dd5X-S-9UHyPI8RL1=w129-h86-k-no",
                                  "latitude": "40.7074663",
                                  "longitude": "-74.0085386",
                                  "max_height": 4480,
                                  "max_width": 6720,
                                  "position": 0,
                                  "source_type": "photos:gmm_android"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFAxg2xMG5Rb4AH0Ka7Ya2A44OZ3hJRJyJQ1W2YCHIPH7QEGSQouXTjUnBgjJFalK-zQ38HaYoLqIrLVJnhxuNDmyXOtRTTV2HCJCXict3NxGEt4jIbHy2dd5X-S-9UHyPI8RL1=w408-h272-k-no",
                                  "latitude": "40.7074663",
                                  "longitude": "-74.0085386",
                                  "max_height": 4480,
                                  "max_width": 6720,
                                  "position": 1,
                                  "source_type": "photos:gmm_android"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJrYQRAcdbwokRv5M_GCGiQUY&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://drafthouse.com/nyc/theater/lower-manhattan"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.7077585%2C-74.00885029999999&query_place_id=ChIJrYQRAcdbwokRv5M_GCGiQUY",
                      "position": 3,
                      "rating": "4.4 stars",
                      "review_summary": {
                          "overall_rating": 4.4,
                          "ratings_count": {
                              "1": 109,
                              "2": 43,
                              "3": 55,
                              "4": 204,
                              "5": 1131
                          },
                          "review_count": 1542
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "28 Liberty St Suite SC301",
                      "title": "Alamo Drafthouse Cinema Lower Manhattan",
                      "zip_code": "10005",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJrYQRAcdbwokRv5M_GCGiQUY",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJrYQRAcdbwokRv5M_GCGiQUY"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          }
                      ],
                      "address": "255 Vesey St, New York, NY 10282",
                      "amenities": [
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "No restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": false
                          }
                      ],
                      "business_category": [
                          "Movie theater"
                      ],
                      "business_category_ids": [
                          "movie_theater"
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "15822771118486709188",
                      "city": "New York",
                      "country": "US",
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c25b0f0a507e19:0xdb95c67fe7b5e3c4",
                      "entity_type": "SearchResult",
                      "latitude": "40.7146267",
                      "longitude": "-74.0153591",
                      "number_of_reviews": "14",
                      "offerings": [
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "phone_number": "(844) 462-7342",
                      "place_id": "ChIJGX5QCg9bwokRxOO153_Glds",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=Cat3ie5Einkbzk8iaHIzOg&cb_client=search.gws-prod.gps&w=86&h=86&yaw=327.77185&pitch=0&thumbfov=100",
                                  "latitude": "40.71428592043341",
                                  "longitude": "-74.01507566616773",
                                  "position": 0,
                                  "source_type": "launch"
                              },
                              {
                                  "image_url": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=Cat3ie5Einkbzk8iaHIzOg&cb_client=search.gws-prod.gps&w=408&h=240&yaw=327.77185&pitch=0&thumbfov=100",
                                  "latitude": "40.71428592043341",
                                  "longitude": "-74.01507566616773",
                                  "position": 1,
                                  "source_type": "launch"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJGX5QCg9bwokRxOO153_Glds&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://www.regmovies.com/"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.7146267%2C-74.0153591&query_place_id=ChIJGX5QCg9bwokRxOO153_Glds",
                      "position": 4,
                      "rating": "4.1 stars",
                      "review_summary": {
                          "overall_rating": 4.1,
                          "ratings_count": {
                              "1": 1,
                              "2": 2,
                              "3": 1,
                              "4": 1,
                              "5": 9
                          },
                          "review_count": 14
                      },
                      "sponsored": false,
                      "street_address": "255 Vesey St",
                      "title": "Regal movies",
                      "zip_code": "10282",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJGX5QCg9bwokRxOO153_Glds",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJGX5QCg9bwokRxOO153_Glds"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          }
                      ],
                      "address": "11 Fulton St, New York, NY 10038",
                      "amenities": [
                          {
                              "description": "Has bar onsite",
                              "display_name": "Bar onsite",
                              "full_path_name": "/geo/type/establishment_poi/has_bar_onsite",
                              "is_available": true
                          },
                          {
                              "description": "Has restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          }
                      ],
                      "business_category": [
                          "Movie theater"
                      ],
                      "business_category_ids": [
                          "movie_theater"
                      ],
                      "business_description": [
                          "Upscale cinema with in-theater dining",
                          "Upscale cinema chain with plush seating, gourmet light bites & cocktails, plus in-theater service."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "5250160807767905879",
                      "city": "New York",
                      "country": "US",
                      "crowd": [
                          {
                              "description": "Family-friendly",
                              "display_name": "Family-friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_families",
                              "is_available": true
                          }
                      ],
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c25a3ce36aeaed:0x48dc517028af1657",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Has live performances",
                              "display_name": "Live performances",
                              "full_path_name": "/geo/type/establishment_poi/has_live_performances",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.7067518",
                      "longitude": "-74.0034177",
                      "number_of_reviews": "3773",
                      "offerings": [
                          {
                              "description": "Serves alcohol",
                              "display_name": "Alcohol",
                              "full_path_name": "/geo/type/establishment_poi/serves_alcohol",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(212) 776-8272",
                      "place_id": "ChIJ7epq4zxawokRVxavKHBR3Eg",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH2ffl1rmkTUEfu_ipJW89rG8ltuMwY7L6yWoOdKJrDOPHK3mSzcmo3Zc-_vpiiiqluupe38Ovdfswj_FtL8w09B_rVuv2hXPJStOV_jepIsKWOQirLzn7fiil2hi-xq3SGhzgPog=w152-h86-k-no",
                                  "latitude": "40.7065902",
                                  "longitude": "-74.0034163",
                                  "max_height": 900,
                                  "max_width": 1600,
                                  "position": 0,
                                  "source_type": "photos:gmm_ios_share_extension_media_upload"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAH2ffl1rmkTUEfu_ipJW89rG8ltuMwY7L6yWoOdKJrDOPHK3mSzcmo3Zc-_vpiiiqluupe38Ovdfswj_FtL8w09B_rVuv2hXPJStOV_jepIsKWOQirLzn7fiil2hi-xq3SGhzgPog=w426-h240-k-no",
                                  "latitude": "40.7065902",
                                  "longitude": "-74.0034163",
                                  "max_height": 900,
                                  "max_width": 1600,
                                  "position": 1,
                                  "source_type": "photos:gmm_ios_share_extension_media_upload"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJ7epq4zxawokRVxavKHBR3Eg&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://www.ipic.com/new-york-city-ny-fulton-market/location?utm_source=google&utm_medium=local_listings&utm_campaign=yext"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.7067518%2C-74.0034177&query_place_id=ChIJ7epq4zxawokRVxavKHBR3Eg",
                      "position": 5,
                      "price_level": "$$$",
                      "rating": "4.3 stars",
                      "review_summary": {
                          "overall_rating": 4.3,
                          "ratings_count": {
                              "1": 272,
                              "2": 142,
                              "3": 217,
                              "4": 535,
                              "5": 2607
                          },
                          "review_count": 3773
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "11 Fulton St",
                      "title": "IPIC Theaters",
                      "zip_code": "10038",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJ7epq4zxawokRVxavKHBR3Eg",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJ7epq4zxawokRVxavKHBR3Eg"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Offers assisted listening devices",
                              "display_name": "Assisted listening devices",
                              "full_path_name": "/geo/type/bare_properties_holder/has_assisted_listening_devices",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          }
                      ],
                      "address": "850 Broadway, New York, NY 10003",
                      "amenities": [
                          {
                              "description": "Has bar onsite",
                              "display_name": "Bar onsite",
                              "full_path_name": "/geo/type/establishment_poi/has_bar_onsite",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has stadium seating",
                              "display_name": "Stadium seating",
                              "full_path_name": "/geo/type/movie_theater/has_stadium_seating",
                              "is_available": true
                          },
                          {
                              "description": "No restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": false
                          }
                      ],
                      "business_category": [
                          "Movie theater"
                      ],
                      "business_category_ids": [
                          "movie_theater"
                      ],
                      "business_description": [
                          "Standard venue for new releases",
                          "Theater complex with multiple screens featuring new release films, plush seating & concession stand."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "4900013324254305635",
                      "city": "New York",
                      "country": "US",
                      "crowd": [
                          {
                              "description": "Family-friendly",
                              "display_name": "Family-friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_families",
                              "is_available": true
                          },
                          {
                              "description": "LGBTQ+ friendly",
                              "display_name": "LGBTQ+ friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_lgbtq",
                              "is_available": true
                          }
                      ],
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c25998e72512b3:0x4400582832dbdd63",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Offers 3D movies",
                              "display_name": "3D movies",
                              "full_path_name": "/geo/type/movie_theater/has_movies_3D",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.73414",
                      "longitude": "-73.99074999999999",
                      "number_of_reviews": "6385",
                      "offerings": [
                          {
                              "description": "Serves alcohol",
                              "display_name": "Alcohol",
                              "full_path_name": "/geo/type/establishment_poi/serves_alcohol",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(844) 462-7342",
                      "place_id": "ChIJsxIl55hZwokRY93bMihYAEQ",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEPF3O_EHvm5s8nTryGi03mDI1BufmrW9OnjQ_0iiFTtTqs86WaZnyStsJmyocqaf9bgdw0ZL3fXvVc4_cEXlTZ75NSG2jNfMRapRfeLkxR3IQrVztDvjqbQPb8Y8uuRXkUiEAhnw=w114-h86-k-no",
                                  "latitude": "40.734110099999995",
                                  "longitude": "-73.9909249",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 0,
                                  "source_type": "photos:gmm_ios"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEPF3O_EHvm5s8nTryGi03mDI1BufmrW9OnjQ_0iiFTtTqs86WaZnyStsJmyocqaf9bgdw0ZL3fXvVc4_cEXlTZ75NSG2jNfMRapRfeLkxR3IQrVztDvjqbQPb8Y8uuRXkUiEAhnw=w408-h306-k-no",
                                  "latitude": "40.734110099999995",
                                  "longitude": "-73.9909249",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 1,
                                  "source_type": "photos:gmm_ios"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJsxIl55hZwokRY93bMihYAEQ&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://www.regmovies.com/theatres/regal-union-square-screenx-4dx-1320?utm_source=google&utm_medium=organic&utm_campaign=gmb-listing"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.73414%2C-73.99074999999999&query_place_id=ChIJsxIl55hZwokRY93bMihYAEQ",
                      "position": 6,
                      "rating": "4.2 stars",
                      "review_summary": {
                          "overall_rating": 4.2,
                          "ratings_count": {
                              "1": 342,
                              "2": 216,
                              "3": 743,
                              "4": 1885,
                              "5": 3199
                          },
                          "review_count": 6385
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "850 Broadway",
                      "title": "Regal Union Square",
                      "zip_code": "10003",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJsxIl55hZwokRY93bMihYAEQ",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJsxIl55hZwokRY93bMihYAEQ"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "No wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": false
                          }
                      ],
                      "address": "18 W Houston St, New York, NY 10012",
                      "amenities": [
                          {
                              "description": "Has bar onsite",
                              "display_name": "Bar onsite",
                              "full_path_name": "/geo/type/establishment_poi/has_bar_onsite",
                              "is_available": true
                          },
                          {
                              "description": "Has restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has stadium seating",
                              "display_name": "Stadium seating",
                              "full_path_name": "/geo/type/movie_theater/has_stadium_seating",
                              "is_available": true
                          }
                      ],
                      "business_category": [
                          "Movie theater",
                          "Cafe",
                          "Event venue"
                      ],
                      "business_category_ids": [
                          "movie_theater",
                          "cafe",
                          "event_venue"
                      ],
                      "business_description": [
                          "New indie & foreign flicks shown in SoHo",
                          "Popular venue for new indie & foreign films, shown on 5 screens, with on-premises cafe."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "7794567259815053441",
                      "city": "New York",
                      "country": "US",
                      "crowd": [
                          {
                              "description": "Family-friendly",
                              "display_name": "Family-friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_families",
                              "is_available": true
                          }
                      ],
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c2598fb7535443:0x6c2bdda01b2a8881",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Offers 3D movies",
                              "display_name": "3D movies",
                              "full_path_name": "/geo/type/movie_theater/has_movies_3D",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.7259068",
                      "longitude": "-73.997169",
                      "number_of_reviews": "2190",
                      "offerings": [
                          {
                              "description": "Serves alcohol",
                              "display_name": "Alcohol",
                              "full_path_name": "/geo/type/establishment_poi/serves_alcohol",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(212) 995-2570",
                      "place_id": "ChIJQ1RTt49ZwokRgYgqG6DdK2w",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFW49J7tTy4wSLNI4vYkTRKmzvxKGIBk-pPcu8JvpVkaT32thdoBhI2L_Mkf3CPz7gC8tFcm_g1v_J5TKaxzskLr8P51tfdqL9e8m6ma18lTG2WWEfpmZRt2FxfRL0DeiarMWr5=w114-h86-k-no",
                                  "latitude": "40.7258534",
                                  "longitude": "-73.9975305",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 0,
                                  "source_type": "photos:gmm_android"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFW49J7tTy4wSLNI4vYkTRKmzvxKGIBk-pPcu8JvpVkaT32thdoBhI2L_Mkf3CPz7gC8tFcm_g1v_J5TKaxzskLr8P51tfdqL9e8m6ma18lTG2WWEfpmZRt2FxfRL0DeiarMWr5=w408-h306-k-no",
                                  "latitude": "40.7258534",
                                  "longitude": "-73.9975305",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 1,
                                  "source_type": "photos:gmm_android"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJQ1RTt49ZwokRgYgqG6DdK2w&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://angelikafilmcenter.com/nyc"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.7259068%2C-73.997169&query_place_id=ChIJQ1RTt49ZwokRgYgqG6DdK2w",
                      "position": 7,
                      "rating": "4.4 stars",
                      "review_summary": {
                          "overall_rating": 4.4,
                          "ratings_count": {
                              "1": 61,
                              "2": 61,
                              "3": 174,
                              "4": 547,
                              "5": 1347
                          },
                          "review_count": 2190
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "18 W Houston St",
                      "title": "Angelika Film Center & Cafe - New York",
                      "zip_code": "10012",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJQ1RTt49ZwokRgYgqG6DdK2w",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJQ1RTt49ZwokRgYgqG6DdK2w"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Offers assisted listening devices",
                              "display_name": "Assisted listening devices",
                              "full_path_name": "/geo/type/bare_properties_holder/has_assisted_listening_devices",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          },
                          {
                              "description": "No wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": false
                          }
                      ],
                      "address": "265 Court St, Brooklyn, NY 11231",
                      "amenities": [
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "No restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": false
                          }
                      ],
                      "business_category": [
                          "Movie theater"
                      ],
                      "business_category_ids": [
                          "movie_theater"
                      ],
                      "business_description": [
                          "Updated vintage spot for varied films",
                          "Veteran local spot updated with 5 theaters, showing a mix of first-run, independent & foreign films."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "5274446056016154132",
                      "city": "Brooklyn",
                      "country": "US",
                      "crowd": [
                          {
                              "description": "Family-friendly",
                              "display_name": "Family-friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_families",
                              "is_available": true
                          },
                          {
                              "description": "LGBTQ+ friendly",
                              "display_name": "LGBTQ+ friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_lgbtq",
                              "is_available": true
                          },
                          {
                              "description": "Transgender safespace",
                              "display_name": "Transgender safespace",
                              "full_path_name": "/geo/type/bare_properties_holder/is_transgender_safespace",
                              "is_available": true
                          }
                      ],
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c25a5080eba1d3:0x493298be23cd8e14",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Has active military discounts",
                              "display_name": "Active military discounts",
                              "full_path_name": "/geo/type/establishment_poi/has_discounts_for_active_military",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.6848612",
                      "longitude": "-73.9943852",
                      "number_of_reviews": "1566",
                      "offerings": [
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(718) 596-4995",
                      "place_id": "ChIJ06HrgFBawokRFI7NI76YMkk",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHdAbWB5caqMmgOKmI337Zz_SAjjvexUYrxo6n2ebFgctkQ-tvQrrnhjosgRnHxtex2ZRizHzz61B7N5N6KdHRz8cSS6jc9LnQGM5U9RI5_S3_75HKN6f9mRSDOV9_mQF_aQh1hTA=w114-h86-k-no",
                                  "latitude": "40.6849714",
                                  "longitude": "-73.99463999999999",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 0,
                                  "source_type": "photos:gmm_ios"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHdAbWB5caqMmgOKmI337Zz_SAjjvexUYrxo6n2ebFgctkQ-tvQrrnhjosgRnHxtex2ZRizHzz61B7N5N6KdHRz8cSS6jc9LnQGM5U9RI5_S3_75HKN6f9mRSDOV9_mQF_aQh1hTA=w408-h306-k-no",
                                  "latitude": "40.6849714",
                                  "longitude": "-73.99463999999999",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 1,
                                  "source_type": "photos:gmm_ios"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJ06HrgFBawokRFI7NI76YMkk&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://www.cobblehilltheatre.com/"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.6848612%2C-73.9943852&query_place_id=ChIJ06HrgFBawokRFI7NI76YMkk",
                      "position": 8,
                      "rating": "4.2 stars",
                      "review_summary": {
                          "overall_rating": 4.2,
                          "ratings_count": {
                              "1": 88,
                              "2": 63,
                              "3": 162,
                              "4": 450,
                              "5": 803
                          },
                          "review_count": 1566
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "265 Court St",
                      "title": "Cobble Hill Cinemas",
                      "zip_code": "11231",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJ06HrgFBawokRFI7NI76YMkk",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJ06HrgFBawokRFI7NI76YMkk"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Offers assisted listening devices",
                              "display_name": "Assisted listening devices",
                              "full_path_name": "/geo/type/bare_properties_holder/has_assisted_listening_devices",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          }
                      ],
                      "address": "445 Albee Square W 4th floor, Brooklyn, NY 11201",
                      "amenities": [
                          {
                              "description": "Has bar onsite",
                              "display_name": "Bar onsite",
                              "full_path_name": "/geo/type/establishment_poi/has_bar_onsite",
                              "is_available": true
                          },
                          {
                              "description": "Has restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          }
                      ],
                      "business_category": [
                          "Movie theater",
                          "Bar",
                          "Beer hall",
                          "Cocktail bar",
                          "Dinner theater",
                          "Event venue",
                          "Restaurant"
                      ],
                      "business_category_ids": [
                          "movie_theater",
                          "bar",
                          "beer_hall",
                          "cocktail_bar",
                          "dinner_theater",
                          "event_venue",
                          "restaurant"
                      ],
                      "business_description": [
                          "Dine-in theater with craft beers & food",
                          "Stylish theater chain for new & classic films features cocktails & creative bites served seat-side."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "9147381282032936456",
                      "city": "Brooklyn",
                      "country": "US",
                      "crowd": [
                          {
                              "description": "Family-friendly",
                              "display_name": "Family-friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_families",
                              "is_available": true
                          }
                      ],
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c25a4caa1435fb:0x7ef206cfa4a16608",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Offers 3D movies",
                              "display_name": "3D movies",
                              "full_path_name": "/geo/type/movie_theater/has_movies_3D",
                              "is_available": true
                          },
                          {
                              "description": "Has active military discounts",
                              "display_name": "Active military discounts",
                              "full_path_name": "/geo/type/establishment_poi/has_discounts_for_active_military",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.6911804",
                      "longitude": "-73.9831556",
                      "number_of_reviews": "7806",
                      "offerings": [
                          {
                              "description": "Serves alcohol",
                              "display_name": "Alcohol",
                              "full_path_name": "/geo/type/establishment_poi/serves_alcohol",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(718) 513-2547",
                      "place_id": "ChIJ-zUUqkxawokRCGahpM8G8n4",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGXguMjuwnv89A7JqXiXzy6aYm5broR28fW8yh92-YNuGZVcGJPdB2wiVJOTP5AwWzghscka93Zjv1jEixaHJapybqP7P2EgUaFCApgVVw2uoZON8N2prWDid_3mpHLzvSlhwkE=w129-h86-k-no",
                                  "latitude": "40.6912046",
                                  "longitude": "-73.98345379999999",
                                  "max_height": 3840,
                                  "max_width": 5760,
                                  "position": 0,
                                  "source_type": "bizbuilder:gmb_web"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGXguMjuwnv89A7JqXiXzy6aYm5broR28fW8yh92-YNuGZVcGJPdB2wiVJOTP5AwWzghscka93Zjv1jEixaHJapybqP7P2EgUaFCApgVVw2uoZON8N2prWDid_3mpHLzvSlhwkE=w408-h272-k-no",
                                  "latitude": "40.6912046",
                                  "longitude": "-73.98345379999999",
                                  "max_height": 3840,
                                  "max_width": 5760,
                                  "position": 1,
                                  "source_type": "bizbuilder:gmb_web"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJ-zUUqkxawokRCGahpM8G8n4&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://drafthouse.com/nyc/theater/downtown-brooklyn"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.6911804%2C-73.9831556&query_place_id=ChIJ-zUUqkxawokRCGahpM8G8n4",
                      "position": 9,
                      "rating": "4.5 stars",
                      "review_summary": {
                          "overall_rating": 4.5,
                          "ratings_count": {
                              "1": 335,
                              "2": 163,
                              "3": 346,
                              "4": 1337,
                              "5": 5625
                          },
                          "review_count": 7806
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "445 Albee Square W 4th floor",
                      "title": "Alamo Drafthouse Cinema Brooklyn",
                      "zip_code": "11201",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJ-zUUqkxawokRCGahpM8G8n4",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJ-zUUqkxawokRCGahpM8G8n4"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          },
                          {
                              "description": "No wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": false
                          }
                      ],
                      "address": "66 Third Ave, E 11th St, New York, NY 10003",
                      "amenities": [
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "No restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": false
                          }
                      ],
                      "business_category": [
                          "Movie theater"
                      ],
                      "business_category_ids": [
                          "movie_theater"
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "5188084551105262114",
                      "city": "New York",
                      "country": "US",
                      "crowd": [
                          {
                              "description": "Family-friendly",
                              "display_name": "Family-friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_families",
                              "is_available": true
                          }
                      ],
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c2599eabc28bff:0x47ffc7695d523222",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Offers 3D movies",
                              "display_name": "3D movies",
                              "full_path_name": "/geo/type/movie_theater/has_movies_3D",
                              "is_available": true
                          },
                          {
                              "description": "Has active military discounts",
                              "display_name": "Active military discounts",
                              "full_path_name": "/geo/type/establishment_poi/has_discounts_for_active_military",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.7316077",
                      "longitude": "-73.9887925",
                      "number_of_reviews": "3105",
                      "offerings": [
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(212) 982-2116",
                      "place_id": "ChIJ_4vCq55ZwokRIjJSXWnH_0c",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGEsK-uEuJo-y9BGvX0hY_vM9WhJWD5UdnF6USc4AH-A2dml45vRKrlWA1FAsQPys8gEHxqbyAgyeswocWxa1wFWm19IxAXNJSKsUo-HkrE2tk2Thlp_2D_H8yXDPwDsjrR5Vk=w152-h86-k-no",
                                  "latitude": "40.7314316",
                                  "longitude": "-73.9888746",
                                  "max_height": 2160,
                                  "max_width": 3840,
                                  "position": 0,
                                  "source_type": "photos:gmm_android"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGEsK-uEuJo-y9BGvX0hY_vM9WhJWD5UdnF6USc4AH-A2dml45vRKrlWA1FAsQPys8gEHxqbyAgyeswocWxa1wFWm19IxAXNJSKsUo-HkrE2tk2Thlp_2D_H8yXDPwDsjrR5Vk=w426-h240-k-no",
                                  "latitude": "40.7314316",
                                  "longitude": "-73.9888746",
                                  "max_height": 2160,
                                  "max_width": 3840,
                                  "position": 1,
                                  "source_type": "photos:gmm_android"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJ_4vCq55ZwokRIjJSXWnH_0c&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://www.amctheatres.com/movie-theatres/new-york-city/amc-village-7?utm_medium=organic&utm_source=google&utm_campaign=local"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.7316077%2C-73.9887925&query_place_id=ChIJ_4vCq55ZwokRIjJSXWnH_0c",
                      "position": 10,
                      "rating": "4.4 stars",
                      "review_summary": {
                          "overall_rating": 4.4,
                          "ratings_count": {
                              "1": 122,
                              "2": 62,
                              "3": 228,
                              "4": 803,
                              "5": 1890
                          },
                          "review_count": 3105
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "66 Third Ave, E 11th St",
                      "title": "AMC Village 7",
                      "zip_code": "10003",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJ_4vCq55ZwokRIjJSXWnH_0c",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJ_4vCq55ZwokRIjJSXWnH_0c"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Offers assisted listening devices",
                              "display_name": "Assisted listening devices",
                              "full_path_name": "/geo/type/bare_properties_holder/has_assisted_listening_devices",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          },
                          {
                              "description": "No wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": false
                          }
                      ],
                      "address": "188 Prospect Park W, Brooklyn, NY 11215",
                      "amenities": [
                          {
                              "description": "Has bar onsite",
                              "display_name": "Bar onsite",
                              "full_path_name": "/geo/type/establishment_poi/has_bar_onsite",
                              "is_available": true
                          },
                          {
                              "description": "Has restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          }
                      ],
                      "business_category": [
                          "Movie theater"
                      ],
                      "business_category_ids": [
                          "movie_theater"
                      ],
                      "business_description": [
                          "Hip movie theater with table service",
                          "Upbeat cinema with waiters serving food & drinks during the movie, plus a bar & retro video games."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "1131607347667461728",
                      "city": "Brooklyn",
                      "country": "US",
                      "crowd": [
                          {
                              "description": "Family-friendly",
                              "display_name": "Family-friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_families",
                              "is_available": true
                          }
                      ],
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c25b7a93b3db47:0xfb446e31ef0e660",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Has trivia night",
                              "display_name": "Trivia night",
                              "full_path_name": "/geo/type/establishment_poi/has_trivia_night",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.6616346",
                      "longitude": "-73.9798179",
                      "number_of_reviews": "2415",
                      "offerings": [
                          {
                              "description": "Serves alcohol",
                              "display_name": "Alcohol",
                              "full_path_name": "/geo/type/establishment_poi/serves_alcohol",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(646) 963-9295",
                      "place_id": "ChIJR9uzk3pbwokRYObwHuNGtA8",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGcEnseI2qhdbPAlEhOZHW9Mwx9szzymDuFNZeHSOzmbduvR1am0M62zI6jFju5nUMzxM1cd_UzTck0ssS7MxAU-lny-1-cPHZfTq0_Khm9vgoeNXIiWqTCZuTll0FKmLZyqg2Bbz0CTmuF=w132-h86-k-no",
                                  "latitude": "40.6614918",
                                  "longitude": "-73.9794579",
                                  "max_height": 1489,
                                  "max_width": 2293,
                                  "position": 0,
                                  "source_type": "photos:dragonfly_tactile"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGcEnseI2qhdbPAlEhOZHW9Mwx9szzymDuFNZeHSOzmbduvR1am0M62zI6jFju5nUMzxM1cd_UzTck0ssS7MxAU-lny-1-cPHZfTq0_Khm9vgoeNXIiWqTCZuTll0FKmLZyqg2Bbz0CTmuF=w408-h264-k-no",
                                  "latitude": "40.6614918",
                                  "longitude": "-73.9794579",
                                  "max_height": 1489,
                                  "max_width": 2293,
                                  "position": 1,
                                  "source_type": "photos:dragonfly_tactile"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJR9uzk3pbwokRYObwHuNGtA8&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "http://nitehawkcinema.com/prospectpark/"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.6616346%2C-73.9798179&query_place_id=ChIJR9uzk3pbwokRYObwHuNGtA8",
                      "position": 11,
                      "rating": "4.4 stars",
                      "review_summary": {
                          "overall_rating": 4.4,
                          "ratings_count": {
                              "1": 106,
                              "2": 78,
                              "3": 129,
                              "4": 436,
                              "5": 1666
                          },
                          "review_count": 2415
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "188 Prospect Park W",
                      "title": "Nitehawk Cinema",
                      "zip_code": "11215",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJR9uzk3pbwokRYObwHuNGtA8",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJR9uzk3pbwokRYObwHuNGtA8"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          },
                          {
                              "description": "No wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": false
                          }
                      ],
                      "address": "181-189 2nd Ave, New York, NY 10003",
                      "amenities": [
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has stadium seating",
                              "display_name": "Stadium seating",
                              "full_path_name": "/geo/type/movie_theater/has_stadium_seating",
                              "is_available": true
                          },
                          {
                              "description": "No restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": false
                          }
                      ],
                      "business_category": [
                          "Movie theater",
                          "Event venue"
                      ],
                      "business_category_ids": [
                          "movie_theater",
                          "event_venue"
                      ],
                      "business_description": [
                          "Showing art & new films in Moorish decor",
                          "Vintage Moorish venue showing 7 screens of art & commercial films with stadium & balcony seating."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "15384945027930877356",
                      "city": "New York",
                      "country": "US",
                      "crowd": [
                          {
                              "description": "Family-friendly",
                              "display_name": "Family-friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_families",
                              "is_available": true
                          }
                      ],
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c2599e81b6facb:0xd5824dfd6ebb6dac",
                      "entity_type": "SearchResult",
                      "latitude": "40.7309555",
                      "longitude": "-73.9862117",
                      "number_of_reviews": "1761",
                      "offerings": [
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(212) 529-6998",
                      "place_id": "ChIJy_q2gZ5ZwokRrG27bv1NgtU",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEvxvbZb04zvUfzugCeCPi_o2aOFDfkfkZlWGmwmlwajieXnd_1KjCtssrJVzpkHcBvJy6TK1R-u0fHjWyi91kJLm4GwoCuC-nw5qhCdkkrmO4JwmdG2sJ0G3i922rpmtABofXt=w114-h86-k-no",
                                  "latitude": "40.730955472720424",
                                  "longitude": "-73.98621167315444",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 0,
                                  "source_type": "photos:gmm_android"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEvxvbZb04zvUfzugCeCPi_o2aOFDfkfkZlWGmwmlwajieXnd_1KjCtssrJVzpkHcBvJy6TK1R-u0fHjWyi91kJLm4GwoCuC-nw5qhCdkkrmO4JwmdG2sJ0G3i922rpmtABofXt=w408-h306-k-no",
                                  "latitude": "40.730955472720424",
                                  "longitude": "-73.98621167315444",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 1,
                                  "source_type": "photos:gmm_android"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJy_q2gZ5ZwokRrG27bv1NgtU&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://angelikafilmcenter.com/villageeast"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.7309555%2C-73.9862117&query_place_id=ChIJy_q2gZ5ZwokRrG27bv1NgtU",
                      "position": 12,
                      "rating": "4.3 stars",
                      "review_summary": {
                          "overall_rating": 4.3,
                          "ratings_count": {
                              "1": 59,
                              "2": 42,
                              "3": 164,
                              "4": 473,
                              "5": 1023
                          },
                          "review_count": 1761
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "181-189 2nd Ave",
                      "title": "Village East by Angelika",
                      "zip_code": "10003",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJy_q2gZ5ZwokRrG27bv1NgtU",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJy_q2gZ5ZwokRrG27bv1NgtU"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "No wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": false
                          }
                      ],
                      "address": "209 W Houston St, New York, NY 10014",
                      "amenities": [
                          {
                              "description": "Has bar onsite",
                              "display_name": "Bar onsite",
                              "full_path_name": "/geo/type/establishment_poi/has_bar_onsite",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "No restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": false
                          }
                      ],
                      "business_category": [
                          "Movie theater"
                      ],
                      "business_category_ids": [
                          "movie_theater"
                      ],
                      "business_description": [
                          "Film fan favorite for classics, indies",
                          "Fans of classics, independent & foreign films favor this Downtown movie landmark (since 1970)."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "6569791830081960642",
                      "city": "New York",
                      "country": "US",
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c2598d62ba7a5b:0x5b2c96dc784c7ac2",
                      "entity_type": "SearchResult",
                      "latitude": "40.7284097",
                      "longitude": "-74.00433",
                      "number_of_reviews": "1241",
                      "offerings": [
                          {
                              "description": "Serves alcohol",
                              "display_name": "Alcohol",
                              "full_path_name": "/geo/type/establishment_poi/serves_alcohol",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(212) 727-8110",
                      "place_id": "ChIJW3q6Yo1ZwokRwnpMeNyWLFs",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEnh7wuGFR5wvEinpJkMduQNNcJ3hm9lCu2W7OmlHJU62xFhN0wRXW0NnQVwXInyvWKyTDt14yHYzl-kORMuRvYpEZguifrcEyvEYeH6eSMCz_x1ZPPQXj0CWGNQhp878mLbpIg=w114-h86-k-no",
                                  "latitude": "40.728518099999995",
                                  "longitude": "-74.0042903",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 0,
                                  "source_type": "photos:gmm_android_review_post"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAEnh7wuGFR5wvEinpJkMduQNNcJ3hm9lCu2W7OmlHJU62xFhN0wRXW0NnQVwXInyvWKyTDt14yHYzl-kORMuRvYpEZguifrcEyvEYeH6eSMCz_x1ZPPQXj0CWGNQhp878mLbpIg=w408-h306-k-no",
                                  "latitude": "40.728518099999995",
                                  "longitude": "-74.0042903",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 1,
                                  "source_type": "photos:gmm_android_review_post"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJW3q6Yo1ZwokRwnpMeNyWLFs&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://filmforum.org/"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.7284097%2C-74.00433&query_place_id=ChIJW3q6Yo1ZwokRwnpMeNyWLFs",
                      "position": 13,
                      "rating": "4.7 stars",
                      "review_summary": {
                          "overall_rating": 4.7,
                          "ratings_count": {
                              "1": 18,
                              "2": 11,
                              "3": 29,
                              "4": 176,
                              "5": 1007
                          },
                          "review_count": 1241
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "209 W Houston St",
                      "title": "Film Forum",
                      "zip_code": "10014",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJW3q6Yo1ZwokRwnpMeNyWLFs",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJW3q6Yo1ZwokRwnpMeNyWLFs"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Offers assisted listening devices",
                              "display_name": "Assisted listening devices",
                              "full_path_name": "/geo/type/bare_properties_holder/has_assisted_listening_devices",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          },
                          {
                              "description": "No wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": false
                          }
                      ],
                      "address": "136 Metropolitan Ave, Brooklyn, NY 11249",
                      "amenities": [
                          {
                              "description": "Has bar onsite",
                              "display_name": "Bar onsite",
                              "full_path_name": "/geo/type/establishment_poi/has_bar_onsite",
                              "is_available": true
                          },
                          {
                              "description": "Has gender-neutral restroom",
                              "display_name": "Gender-neutral restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom_unisex",
                              "is_available": true
                          },
                          {
                              "description": "Has restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          }
                      ],
                      "business_category": [
                          "Movie theater",
                          "Restaurant"
                      ],
                      "business_category_ids": [
                          "movie_theater",
                          "restaurant"
                      ],
                      "business_description": [
                          "Movie theater with cocktail service",
                          "Movies screened with global fare & craft cocktails served at patrons' seats."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "10484329052287345939",
                      "city": "Brooklyn",
                      "country": "US",
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c259611db83633:0x917fd1b985e52513",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Has active military discounts",
                              "display_name": "Active military discounts",
                              "full_path_name": "/geo/type/establishment_poi/has_discounts_for_active_military",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.715972199999996",
                      "longitude": "-73.962575",
                      "number_of_reviews": "1987",
                      "offerings": [
                          {
                              "description": "Serves alcohol",
                              "display_name": "Alcohol",
                              "full_path_name": "/geo/type/establishment_poi/serves_alcohol",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(646) 963-9288",
                      "place_id": "ChIJMza4HWFZwokREyXlhbnRf5E",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFQiudqqLHuuMsSw0Gr_83eS-Igu2ZT7n_SeyNXVujKQoFlNXdeGVBc5rNZxUvewF-BFSDI50uJdFsUWvra9xzr0JlJDv8or1H-lS-Kqe6LK5r73m9LLZQ_aASI34Et_2qnpPk=w114-h86-k-no",
                                  "latitude": "40.7162266",
                                  "longitude": "-73.9624637",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 0,
                                  "source_type": "photos:gmm_android"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAFQiudqqLHuuMsSw0Gr_83eS-Igu2ZT7n_SeyNXVujKQoFlNXdeGVBc5rNZxUvewF-BFSDI50uJdFsUWvra9xzr0JlJDv8or1H-lS-Kqe6LK5r73m9LLZQ_aASI34Et_2qnpPk=w408-h306-k-no",
                                  "latitude": "40.7162266",
                                  "longitude": "-73.9624637",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 1,
                                  "source_type": "photos:gmm_android"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJMza4HWFZwokREyXlhbnRf5E&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "http://www.nitehawkcinema.com/"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.715972199999996%2C-73.962575&query_place_id=ChIJMza4HWFZwokREyXlhbnRf5E",
                      "position": 14,
                      "price_level": "$$",
                      "rating": "4.6 stars",
                      "review_summary": {
                          "overall_rating": 4.6,
                          "ratings_count": {
                              "1": 48,
                              "2": 22,
                              "3": 77,
                              "4": 320,
                              "5": 1520
                          },
                          "review_count": 1987
                      },
                      "sponsored": false,
                      "street_address": "136 Metropolitan Ave",
                      "title": "Nitehawk Cinema",
                      "zip_code": "11249",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJMza4HWFZwokREyXlhbnRf5E",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJMza4HWFZwokREyXlhbnRf5E"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "No wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": false
                          }
                      ],
                      "address": "7 Ludlow St, New York, NY 10002",
                      "amenities": [
                          {
                              "description": "Has bar onsite",
                              "display_name": "Bar onsite",
                              "full_path_name": "/geo/type/establishment_poi/has_bar_onsite",
                              "is_available": true
                          },
                          {
                              "description": "Has gender-neutral restroom",
                              "display_name": "Gender-neutral restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom_unisex",
                              "is_available": true
                          },
                          {
                              "description": "Has restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has Wi-Fi",
                              "display_name": "Wi-Fi",
                              "full_path_name": "/geo/type/establishment_poi/has_wi_fi",
                              "is_available": true
                          }
                      ],
                      "business_category": [
                          "Movie theater",
                          "American restaurant",
                          "Bar",
                          "Cafe",
                          "Lounge bar"
                      ],
                      "business_category_ids": [
                          "movie_theater",
                          "american_restaurant",
                          "bar",
                          "cafe",
                          "lounge"
                      ],
                      "business_description": [
                          "Elegant American eatery in a movie house",
                          "State-of-the-art cinema with an upscale American eatery & two bars evokes old-time Hollywood haunts."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "6245946029736917625",
                      "city": "New York",
                      "country": "US",
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c25a29b0ecc1e7:0x56ae0ed254bafa79",
                      "entity_type": "SearchResult",
                      "latitude": "40.715143",
                      "longitude": "-73.9911467",
                      "number_of_reviews": "1472",
                      "offerings": [
                          {
                              "description": "Serves alcohol",
                              "display_name": "Alcohol",
                              "full_path_name": "/geo/type/establishment_poi/serves_alcohol",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "phone_number": "(212) 660-0312",
                      "place_id": "ChIJ58HssClawokRefq6VNIOrlY",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGQj-dMb52ZqZxN47sQ7c9ZxDhuOQGqnqhjFM0bgbzGs8cwzAZxmXZu-_qnC7RGC4nV_ws1ynshy_tfl0cp014Vi85NekHtpkEkvF-o9IdGzPLcU1rH9ZFF35q_2PSgn5rxxgXi=w114-h86-k-no",
                                  "latitude": "40.7150724",
                                  "longitude": "-73.9909246",
                                  "max_height": 3036,
                                  "max_width": 4048,
                                  "position": 0,
                                  "source_type": "photos:gmm_android"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAGQj-dMb52ZqZxN47sQ7c9ZxDhuOQGqnqhjFM0bgbzGs8cwzAZxmXZu-_qnC7RGC4nV_ws1ynshy_tfl0cp014Vi85NekHtpkEkvF-o9IdGzPLcU1rH9ZFF35q_2PSgn5rxxgXi=w408-h306-k-no",
                                  "latitude": "40.7150724",
                                  "longitude": "-73.9909246",
                                  "max_height": 3036,
                                  "max_width": 4048,
                                  "position": 1,
                                  "source_type": "photos:gmm_android"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJ58HssClawokRefq6VNIOrlY&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "http://metrograph.com/"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.715143%2C-73.9911467&query_place_id=ChIJ58HssClawokRefq6VNIOrlY",
                      "position": 15,
                      "price_level": "$$$",
                      "rating": "4.6 stars",
                      "review_summary": {
                          "overall_rating": 4.6,
                          "ratings_count": {
                              "1": 29,
                              "2": 23,
                              "3": 59,
                              "4": 235,
                              "5": 1126
                          },
                          "review_count": 1472
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "7 Ludlow St",
                      "title": "Metrograph",
                      "zip_code": "10002",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJ58HssClawokRefq6VNIOrlY",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJ58HssClawokRefq6VNIOrlY"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          }
                      ],
                      "address": "217 Grand St, Brooklyn, NY 11211",
                      "amenities": [
                          {
                              "description": "Has bar onsite",
                              "display_name": "Bar onsite",
                              "full_path_name": "/geo/type/establishment_poi/has_bar_onsite",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has stadium seating",
                              "display_name": "Stadium seating",
                              "full_path_name": "/geo/type/movie_theater/has_stadium_seating",
                              "is_available": true
                          },
                          {
                              "description": "No restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": false
                          }
                      ],
                      "business_category": [
                          "Movie theater"
                      ],
                      "business_category_ids": [
                          "movie_theater"
                      ],
                      "business_description": [
                          "Modern movie theater with discounts",
                          "Glass-encased modern movie theater with stadium seating, concessions & discounted days & hours."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "3561327739675682180",
                      "city": "Brooklyn",
                      "country": "US",
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c25963d016448d:0x316c60b5e41d2584",
                      "entity_type": "SearchResult",
                      "latitude": "40.714144",
                      "longitude": "-73.959859",
                      "number_of_reviews": "3184",
                      "offerings": [
                          {
                              "description": "Serves alcohol",
                              "display_name": "Alcohol",
                              "full_path_name": "/geo/type/establishment_poi/serves_alcohol",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(718) 302-3422",
                      "place_id": "ChIJjUQW0GNZwokRhCUd5LVgbDE",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHrZYtRpF1lGYqrg8LlokOywsylJDl4ogS0adDu2chgmgpXPkftUG886YYKrb2w5ScvAnF-ClWetDqTqHeDcqovb3IY3JlJdQGmFo_HYw_Ktcl13k0yO0o70z1mlUknkD1-5pvL=w114-h86-k-no",
                                  "latitude": "40.7139394",
                                  "longitude": "-73.95991819999999",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 0,
                                  "source_type": "photos:gmm_android"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHrZYtRpF1lGYqrg8LlokOywsylJDl4ogS0adDu2chgmgpXPkftUG886YYKrb2w5ScvAnF-ClWetDqTqHeDcqovb3IY3JlJdQGmFo_HYw_Ktcl13k0yO0o70z1mlUknkD1-5pvL=w408-h306-k-no",
                                  "latitude": "40.7139394",
                                  "longitude": "-73.95991819999999",
                                  "max_height": 3024,
                                  "max_width": 4032,
                                  "position": 1,
                                  "source_type": "photos:gmm_android"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJjUQW0GNZwokRhCUd5LVgbDE&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://www.hk-cinemas.com/home"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.714144%2C-73.959859&query_place_id=ChIJjUQW0GNZwokRhCUd5LVgbDE",
                      "position": 16,
                      "rating": "4.2 stars",
                      "review_summary": {
                          "overall_rating": 4.2,
                          "ratings_count": {
                              "1": 134,
                              "2": 106,
                              "3": 328,
                              "4": 904,
                              "5": 1712
                          },
                          "review_count": 3184
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "217 Grand St",
                      "title": "Williamsburg Cinemas",
                      "zip_code": "11211",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJjUQW0GNZwokRhCUd5LVgbDE",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJjUQW0GNZwokRhCUd5LVgbDE"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          }
                      ],
                      "address": "650 Plaza Dr, Secaucus, NJ 07094",
                      "amenities": [
                          {
                              "description": "Has bar onsite",
                              "display_name": "Bar onsite",
                              "full_path_name": "/geo/type/establishment_poi/has_bar_onsite",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has stadium seating",
                              "display_name": "Stadium seating",
                              "full_path_name": "/geo/type/movie_theater/has_stadium_seating",
                              "is_available": true
                          },
                          {
                              "description": "No restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": false
                          }
                      ],
                      "business_category": [
                          "Movie theater",
                          "Restaurant"
                      ],
                      "business_category_ids": [
                          "movie_theater",
                          "restaurant"
                      ],
                      "business_description": [
                          "Cinema with current movies & concessions",
                          "Movie theater screening first-run films on wall-to-wall screens & offering standard concessions."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "1530037965590742946",
                      "city": "Secaucus",
                      "country": "US",
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c257edd7683791:0x153bc96c57e5c7a2",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Offers 3D movies",
                              "display_name": "3D movies",
                              "full_path_name": "/geo/type/movie_theater/has_movies_3D",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.785275",
                      "longitude": "-74.046663",
                      "number_of_reviews": "5819",
                      "offerings": [
                          {
                              "description": "Serves alcohol",
                              "display_name": "Alcohol",
                              "full_path_name": "/geo/type/establishment_poi/serves_alcohol",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts NFC mobile payments",
                              "display_name": "NFC mobile payments",
                              "full_path_name": "/geo/type/establishment_poi/pay_mobile_nfc",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(201) 348-5561",
                      "place_id": "ChIJkTdo1-1XwokRosflV2zJOxU",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHpTzIfeaMusico7w8Mcxvts7AMvbFYl4TuCTBh_cYqMYp0OzeKfpCgUFMv_pCoBiB7c4dtwxLR52M7aLUJInc1TWXgBkkNHf0iyYsC1LhKRPgBcu4aQ7LQUoTobTlXEcTpuwfN=w152-h86-k-no",
                                  "latitude": "40.7853224",
                                  "longitude": "-74.04660009999999",
                                  "max_height": 2988,
                                  "max_width": 5312,
                                  "position": 0,
                                  "source_type": "photos:gmm_android"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHpTzIfeaMusico7w8Mcxvts7AMvbFYl4TuCTBh_cYqMYp0OzeKfpCgUFMv_pCoBiB7c4dtwxLR52M7aLUJInc1TWXgBkkNHf0iyYsC1LhKRPgBcu4aQ7LQUoTobTlXEcTpuwfN=w426-h240-k-no",
                                  "latitude": "40.7853224",
                                  "longitude": "-74.04660009999999",
                                  "max_height": 2988,
                                  "max_width": 5312,
                                  "position": 1,
                                  "source_type": "photos:gmm_android"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJkTdo1-1XwokRosflV2zJOxU&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://www.regmovies.com/theatres/regal-secaucus-showplace-1665?utm_campaign=gmb-listing&utm_medium=organic&utm_source=google"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.785275%2C-74.046663&query_place_id=ChIJkTdo1-1XwokRosflV2zJOxU",
                      "position": 17,
                      "rating": "4.6 stars",
                      "review_summary": {
                          "overall_rating": 4.6,
                          "ratings_count": {
                              "1": 184,
                              "2": 85,
                              "3": 201,
                              "4": 1026,
                              "5": 4323
                          },
                          "review_count": 5819
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "650 Plaza Dr",
                      "title": "Regal Secaucus ShowPlace",
                      "zip_code": "07094",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJkTdo1-1XwokRosflV2zJOxU",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJkTdo1-1XwokRosflV2zJOxU"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Offers assisted listening devices",
                              "display_name": "Assisted listening devices",
                              "full_path_name": "/geo/type/bare_properties_holder/has_assisted_listening_devices",
                              "is_available": true
                          },
                          {
                              "description": "Has assistive hearing loop",
                              "display_name": "Assistive hearing loop",
                              "full_path_name": "/geo/type/establishment_poi/has_hearing_loop",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible seating",
                              "display_name": "Wheelchair accessible seating",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_seating",
                              "is_available": true
                          },
                          {
                              "description": "No wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": false
                          }
                      ],
                      "address": "323 6th Ave, New York, NY 10014",
                      "amenities": [
                          {
                              "description": "Has gender-neutral restroom",
                              "display_name": "Gender-neutral restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom_unisex",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          },
                          {
                              "description": "No restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": false
                          }
                      ],
                      "business_category": [
                          "Movie theater"
                      ],
                      "business_category_ids": [
                          "movie_theater"
                      ],
                      "business_description": [
                          "Indie, foreign & revival movie theater",
                          "Foreign, classic & offbeat indie films are screened along with short subjects at this movie theater."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "15773644455439838541",
                      "city": "New York",
                      "country": "US",
                      "crowd": [
                          {
                              "description": "Family-friendly",
                              "display_name": "Family-friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_families",
                              "is_available": true
                          },
                          {
                              "description": "LGBTQ+ friendly",
                              "display_name": "LGBTQ+ friendly",
                              "full_path_name": "/geo/type/establishment_poi/welcomes_lgbtq",
                              "is_available": true
                          },
                          {
                              "description": "Transgender safespace",
                              "display_name": "Transgender safespace",
                              "full_path_name": "/geo/type/bare_properties_holder/is_transgender_safespace",
                              "is_available": true
                          }
                      ],
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c25993cf88228d:0xdae73e0f53cd2d4d",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Offers 3D movies",
                              "display_name": "3D movies",
                              "full_path_name": "/geo/type/movie_theater/has_movies_3D",
                              "is_available": true
                          },
                          {
                              "description": "Has active military discounts",
                              "display_name": "Active military discounts",
                              "full_path_name": "/geo/type/establishment_poi/has_discounts_for_active_military",
                              "is_available": true
                          },
                          {
                              "description": "Has live performances",
                              "display_name": "Live performances",
                              "full_path_name": "/geo/type/establishment_poi/has_live_performances",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.731205599999996",
                      "longitude": "-74.0016722",
                      "number_of_reviews": "1710",
                      "offerings": [
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(212) 924-7771",
                      "place_id": "ChIJjSKIz5NZwokRTS3NUw8-59o",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAE9cthQ5b_l3AMixk0HvrcUefRdpRu9PNJS2HJP9WMxfY65fuWnQyo-gnqh2qcEXhzdkjNFr4yVnNb2i9Q1wgBMS66MnNGs69HSPzyKW6uBlmJdXyzdT67X7Cg6GvErXAiK13s=w114-h86-k-no",
                                  "latitude": "40.7311219",
                                  "longitude": "-74.0013815",
                                  "max_height": 4284,
                                  "max_width": 5712,
                                  "position": 0,
                                  "source_type": "photos:gmm_ios_review_post"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAE9cthQ5b_l3AMixk0HvrcUefRdpRu9PNJS2HJP9WMxfY65fuWnQyo-gnqh2qcEXhzdkjNFr4yVnNb2i9Q1wgBMS66MnNGs69HSPzyKW6uBlmJdXyzdT67X7Cg6GvErXAiK13s=w408-h306-k-no",
                                  "latitude": "40.7311219",
                                  "longitude": "-74.0013815",
                                  "max_height": 4284,
                                  "max_width": 5712,
                                  "position": 1,
                                  "source_type": "photos:gmm_ios_review_post"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJjSKIz5NZwokRTS3NUw8-59o&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "http://www.ifccenter.com/"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.731205599999996%2C-74.0016722&query_place_id=ChIJjSKIz5NZwokRTS3NUw8-59o",
                      "position": 18,
                      "rating": "4.6 stars",
                      "review_summary": {
                          "overall_rating": 4.6,
                          "ratings_count": {
                              "1": 28,
                              "2": 28,
                              "3": 90,
                              "4": 379,
                              "5": 1185
                          },
                          "review_count": 1710
                      },
                      "services": [
                          {
                              "description": "Onsite services available",
                              "display_name": "Onsite services",
                              "full_path_name": "/geo/type/establishment_poi/has_onsite_services",
                              "is_available": true
                          }
                      ],
                      "sponsored": false,
                      "street_address": "323 6th Ave",
                      "title": "IFC Center",
                      "zip_code": "10014",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJjSKIz5NZwokRTS3NUw8-59o",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJjSKIz5NZwokRTS3NUw8-59o"
                  },
                  {
                      "address": "70 Greene St, Jersey City, NJ 07302",
                      "business_category": [
                          "Video production service"
                      ],
                      "business_category_ids": [
                          "video_production_service"
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "8879290877075706878",
                      "city": "Jersey City",
                      "country": "US",
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c3cb48a1bc1ab5:0x7b3994021976d3fe",
                      "entity_type": "SearchResult",
                      "latitude": "40.714681",
                      "longitude": "-74.03591469999999",
                      "number_of_reviews": "5",
                      "page_index": 0,
                      "phone_number": "(732) 713-7717",
                      "place_id": "ChIJtRq8oUjLw4kR_tN2GQKUOXs",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHEissWOIbQ8gve-dheMZ8zVYDru1nZpOZ9dKh4SwfvT0LbzA0A1eTghoAYsrFQVpz6C1vqqie8etvISpgg_Hv9MTQ5U9Q7RQXCbhaA-4nuCHSkY3PkqkbZwnQaSXyn-GYX_mTX=w172-h86-k-no",
                                  "latitude": "40.71468900000001",
                                  "longitude": "-74.0359974",
                                  "max_height": 3456,
                                  "max_width": 6912,
                                  "position": 0,
                                  "source_type": "bizbuilder:gmb_on_local_universal_desktop"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHEissWOIbQ8gve-dheMZ8zVYDru1nZpOZ9dKh4SwfvT0LbzA0A1eTghoAYsrFQVpz6C1vqqie8etvISpgg_Hv9MTQ5U9Q7RQXCbhaA-4nuCHSkY3PkqkbZwnQaSXyn-GYX_mTX=w480-h240-k-no",
                                  "latitude": "40.71468900000001",
                                  "longitude": "-74.0359974",
                                  "max_height": 3456,
                                  "max_width": 6912,
                                  "position": 1,
                                  "source_type": "bizbuilder:gmb_on_local_universal_desktop"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJtRq8oUjLw4kR_tN2GQKUOXs&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "http://www.hudsonfilms.co/"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.714681%2C-74.03591469999999&query_place_id=ChIJtRq8oUjLw4kR_tN2GQKUOXs",
                      "position": 19,
                      "rating": "5 stars",
                      "review_summary": {
                          "overall_rating": 5,
                          "ratings_count": {
                              "1": 0,
                              "2": 0,
                              "3": 0,
                              "4": 0,
                              "5": 5
                          },
                          "review_count": 5
                      },
                      "sponsored": false,
                      "street_address": "70 Greene St",
                      "title": "Hudson Films",
                      "zip_code": "07302",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJtRq8oUjLw4kR_tN2GQKUOXs",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJtRq8oUjLw4kR_tN2GQKUOXs"
                  },
                  {
                      "accessibility": [
                          {
                              "description": "Has wheelchair accessible entrance",
                              "display_name": "Wheelchair accessible entrance",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_entrance",
                              "is_available": true
                          },
                          {
                              "description": "Has wheelchair accessible restroom",
                              "display_name": "Wheelchair accessible restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_restroom",
                              "is_available": true
                          },
                          {
                              "description": "No wheelchair accessible parking lot",
                              "display_name": "Wheelchair accessible parking lot",
                              "full_path_name": "/geo/type/establishment_poi/has_wheelchair_accessible_parking",
                              "is_available": false
                          }
                      ],
                      "address": "2 6th Avenue Cellar Level, New York, NY 10013",
                      "amenities": [
                          {
                              "description": "Has bar onsite",
                              "display_name": "Bar onsite",
                              "full_path_name": "/geo/type/establishment_poi/has_bar_onsite",
                              "is_available": true
                          },
                          {
                              "description": "Has restaurant",
                              "display_name": "Restaurant",
                              "full_path_name": "/geo/type/establishment_poi/has_restaurant",
                              "is_available": true
                          },
                          {
                              "description": "Has restroom",
                              "display_name": "Restroom",
                              "full_path_name": "/geo/type/establishment_poi/has_restroom",
                              "is_available": true
                          }
                      ],
                      "business_category": [
                          "Movie theater"
                      ],
                      "business_category_ids": [
                          "movie_theater"
                      ],
                      "business_description": [
                          "Longtime theater for new & indie films",
                          "Old-school, intimate theater featuring new, independent & foreign films, plus standard concessions."
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "9823317150762309152",
                      "city": "New York",
                      "country": "US",
                      "csrf_token": "VhHpaY2YK-ijqtsPu-Ky0Q8",
                      "data_id": "0x89c2598a9717144b:0x88536ee707309620",
                      "entity_type": "SearchResult",
                      "highlights": [
                          {
                              "description": "Has live performances",
                              "display_name": "Live performances",
                              "full_path_name": "/geo/type/establishment_poi/has_live_performances",
                              "is_available": true
                          }
                      ],
                      "latitude": "40.7194387",
                      "longitude": "-74.00491509999999",
                      "number_of_reviews": "237",
                      "offerings": [
                          {
                              "description": "Serves alcohol",
                              "display_name": "Alcohol",
                              "full_path_name": "/geo/type/establishment_poi/serves_alcohol",
                              "is_available": true
                          },
                          {
                              "description": "Serves food",
                              "display_name": "Food",
                              "full_path_name": "/geo/type/establishment_poi/serves_food",
                              "is_available": true
                          }
                      ],
                      "page_index": 0,
                      "payments": [
                          {
                              "description": "Accepts credit cards",
                              "display_name": "Credit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_credit_card",
                              "is_available": true
                          },
                          {
                              "description": "Accepts debit cards",
                              "display_name": "Debit cards",
                              "full_path_name": "/geo/type/establishment_poi/pay_debit_card",
                              "is_available": true
                          }
                      ],
                      "phone_number": "(212) 519-6820",
                      "place_id": "ChIJSxQXl4pZwokRIJYwB-duU4g",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHPGBlucHEKpHIwDvM4hv_5N2tw_Xc4rmImxLjCa07T9pXlyuzzwQ5V4hifcjPJuA9JpPwRiUii2JgMbkBYpylm6qo8t4PsBQhYqgznqa_ROXSvasyyyxiD5Bv9Ovoy3lAX0Qa7mQ=w129-h86-k-no",
                                  "latitude": "40.7191344",
                                  "longitude": "-74.005169",
                                  "max_height": 800,
                                  "max_width": 1200,
                                  "position": 0,
                                  "source_type": "bizbuilder"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHPGBlucHEKpHIwDvM4hv_5N2tw_Xc4rmImxLjCa07T9pXlyuzzwQ5V4hifcjPJuA9JpPwRiUii2JgMbkBYpylm6qo8t4PsBQhYqgznqa_ROXSvasyyyxiD5Bv9Ovoy3lAX0Qa7mQ=w408-h272-k-no",
                                  "latitude": "40.7191344",
                                  "longitude": "-74.005169",
                                  "max_height": 800,
                                  "max_width": 1200,
                                  "position": 1,
                                  "source_type": "bizbuilder"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJSxQXl4pZwokRIJYwB-duU4g&q=Cinema&authuser=0&hl=en&gl=US",
                          "website_url": "https://www.roxycinemanewyork.com/"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.7194387%2C-74.00491509999999&query_place_id=ChIJSxQXl4pZwokRIJYwB-duU4g",
                      "position": 20,
                      "rating": "4.5 stars",
                      "review_summary": {
                          "overall_rating": 4.5,
                          "ratings_count": {
                              "1": 10,
                              "2": 7,
                              "3": 7,
                              "4": 43,
                              "5": 170
                          },
                          "review_count": 237
                      },
                      "sponsored": false,
                      "street_address": "2 6th Avenue Cellar Level",
                      "title": "Roxy Cinema New York",
                      "zip_code": "10013",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&csrf_token=VhHpaY2YK-ijqtsPu-Ky0Q8&place_id=ChIJSxQXl4pZwokRIJYwB-duU4g",
                      "nimble_place_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_place&place_id=ChIJSxQXl4pZwokRIJYwB-duU4g"
                  }
              ]
          },
          "total_entities_count": 20,
          "entities_count": {
              "SearchResult": 20
          },
          "metrics": {}
      },
    },
    "metadata": {
      "query_time": "2026-04-22T18:19:21.506Z",
      "query_duration": 9701,
      "response_parameters": {
        "input_url": "https://www.google.com/search?tbm=map&tch=1&authuser=0&hl=en&ie=UTF-8&sourceid=chrome&oq=Cinema&q=Cinema&pb=..."
      },
      "driver": "vx6"
    },
    "status_code": 200
  }
  ```
</Accordion>

### Google Maps Place

Returns detailed information about a specific place by its Google Maps `place_id`.

**Supported parameters:**

* [`place_id`](#parameters) — Google Maps place identifier (required if `data_id` not provided)
* [`data_id`](#parameters) — Google Maps data identifier (required if `place_id` not provided)
* [`no_html`](#parameters) — omit `data.html` from the response

<Warning>
  Pagination not supported. Returns a single result per request.
</Warning>

```bash cURL theme={"system"}
curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search_engine": "google_maps_place",
    "place_id": "ChIJtRq8oUjLw4kR_tN2GQKUOXs"
}'
```

<Accordion title="Example Response">
  ```json theme={"system"}
  {
    "url": "https://www.google.com/maps/preview/place?authuser=0&hl=en&ie=UTF-8&sourceid=chrome&pb=..",
    "task_id": "09f24978-6f9f-4ccd-88e5-81930f926364",
    "status": "success",
    "data": {
      "html": ".....",
      "parsing": {
          "entities": {
              "Place": [
                  {
                      "address": "70 Greene St, Jersey City, NJ 07302",
                      "business_category": [
                          "Video production service"
                      ],
                      "business_category_ids": [
                          "video_production_service"
                      ],
                      "business_status": "OPERATIONAL",
                      "cid": "8879290877075706878",
                      "city": "Jersey City",
                      "country": "US",
                      "csrf_token": "0RHpaayVCsyaptQPuYuzqAo",
                      "data_id": "0x89c3cb48a1bc1ab5:0x7b3994021976d3fe",
                      "entity_type": "Place",
                      "floor": "Floor 1",
                      "latitude": "40.714681",
                      "located_in": "70 Greene Apartments",
                      "longitude": "-74.03591469999999",
                      "number_of_reviews": "5",
                      "page_index": 0,
                      "phone_number": "(732) 713-7717",
                      "place_id": "ChIJtRq8oUjLw4kR_tN2GQKUOXs",
                      "place_information": {
                          "photos": [
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHEissWOIbQ8gve-dheMZ8zVYDru1nZpOZ9dKh4SwfvT0LbzA0A1eTghoAYsrFQVpz6C1vqqie8etvISpgg_Hv9MTQ5U9Q7RQXCbhaA-4nuCHSkY3PkqkbZwnQaSXyn-GYX_mTX=w172-h86-k-no",
                                  "latitude": "40.71468900000001",
                                  "longitude": "-74.0359974",
                                  "max_height": 3456,
                                  "max_width": 6912,
                                  "position": 0,
                                  "source_type": "bizbuilder:gmb_on_local_universal_desktop"
                              },
                              {
                                  "image_url": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHEissWOIbQ8gve-dheMZ8zVYDru1nZpOZ9dKh4SwfvT0LbzA0A1eTghoAYsrFQVpz6C1vqqie8etvISpgg_Hv9MTQ5U9Q7RQXCbhaA-4nuCHSkY3PkqkbZwnQaSXyn-GYX_mTX=w480-h240-k-no",
                                  "latitude": "40.71468900000001",
                                  "longitude": "-74.0359974",
                                  "max_height": 3456,
                                  "max_width": 6912,
                                  "position": 1,
                                  "source_type": "bizbuilder:gmb_on_local_universal_desktop"
                              }
                          ],
                          "reviews_link": "https://search.google.com/local/reviews?placeid=ChIJtRq8oUjLw4kR_tN2GQKUOXs&authuser=0&hl=en&gl=US",
                          "website_url": "http://www.hudsonfilms.co/"
                      },
                      "place_url": "https://www.google.com/maps/search/?api=1&query=40.714681%2C-74.03591469999999&query_place_id=ChIJtRq8oUjLw4kR_tN2GQKUOXs",
                      "plus_code": {
                          "compound_code": "PX77+VJ Jersey City, New Jersey",
                          "global_code": "87G7PX77+VJ"
                      },
                      "position": 0,
                      "rating": "5 stars",
                      "review_summary": {
                          "overall_rating": 5,
                          "review_count": 5
                      },
                      "sponsored": false,
                      "street_address": "70 Greene St",
                      "title": "Hudson Films",
                      "zip_code": "07302",
                      "nimble_reviews_link": "https://sdk.nimbleway.com/v1/serp?search_engine=google_maps_reviews&place_id=ChIJtRq8oUjLw4kR_tN2GQKUOXs&csrf_token=0RHpaayVCsyaptQPuYuzqAo",
                      "nimble_reviews_link_payload": {
                          "search_engine": "google_maps_reviews",
                          "place_id": "ChIJtRq8oUjLw4kR_tN2GQKUOXs",
                          "csrf_token": "0RHpaayVCsyaptQPuYuzqAo"
                      }
                  }
              ]
          },
          "total_entities_count": 1,
          "entities_count": {
              "Place": 1
          },
          "metrics": {}
      },
    },
    "metadata": {
      "query_time": "2026-04-22T18:21:39.828Z",
      "query_duration": 9701,
      "response_parameters": {
        "input_url": "https://www.google.com/maps/preview/place?authuser=0&hl=en&ie=UTF-8&sourceid=chrome&pb=..."
      },
      "driver": "vx6"
    },
    "status_code": 200
  }
  ```
</Accordion>

### Google Maps Reviews

Returns user reviews for a specific place by its Google Maps `place_id`.

**Supported parameters:**

* [`place_id`](#parameters) — Google Maps place identifier (required if `data_id` not provided)
* [`data_id`](#parameters) — Google Maps data identifier (required if `place_id` not provided)
* [`sort`](#parameters) — review sort order (`relevant`, `newest`, `highest_rating`, `lowest_rating`)
* [`num_results`](#parameters) — number of reviews to return, range 10–20
* [`paging_token_id`](#parameters) — cursor token from previous response for next page
* [`no_html`](#parameters) — omit `data.html` from the response

<Note>`num_results` is capped at 20.</Note>

```bash cURL theme={"system"}
curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search_engine": "google_maps_reviews",
    "place_id": "ChIJuwiXF2JDfYcRkfmF4x2_psk"
}'
```

<Accordion title="Example Response">
  ```json theme={"system"}
  {
    "url": "https://www.google.com/maps/rpc/listugcposts?authuser=0&hl=en&ie=UTF-8&sourceid=chrome&pb=...",
    "task_id": "e37f4b6b-60c4-4131-910e-34476ce14cd7",
    "status": "success",
    "data": {
      "html": ".....",
      "parsing": {
          "entities": {
              "Review": [
                  {
                      "csrf_token": "eFXBEuQzaFtyLp8ybufVOkM",
                      "description": "Where you going to find a Great American barley wine in the Midwest? It's not often you find a craft brewery that doesn't only appeal to the lowest common denominator out here in the middle of the country, but Zymurcracy consistently puts out excellent and diverse beers. They don't push degenerate stuff like most of the breweries around here do and I've never been disappointed with anything I've had over the years. The staff is also personable and the prices are what you would expect from a microbrewery; I just don't have anything negative to say about them.",
                      "entity_type": "Review",
                      "paging_token_id": "CAESY0NBRVFBUnBFUTJwRlNVRlNTWEJEWjI5QlVEZGZURUZaWW5kZlgxOWZSV2hEWkUxMlJrWndZVWhDYTFWMlJtOXRPRUZCUVVGQlIyZHVPVEpUYzBOYVdpMUZOMWxyV1VGRFNVRQ==",
                      "rating": "5",
                      "relative_time": "5 months ago",
                      "review_id": "Ci9DQUlRQUNvZENodHljRjlvT2tSdVZETnFSV05QYzA1TVRrTldObFJ4ZEZWbVlrRRAB",
                      "review_like_count": 0,
                      "review_maps_link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2tSdVZETnFSV05QYzA1TVRrTldObFJ4ZEZWbVlrRRAB!2m1!1s0x0:0xc9a6bf1de385f991!3m1!1s2@1:CAIQACodChtycF9oOkRuVDNqRWNPc05MTkNWNlRxdFVmYkE%7C%7C?hl=en",
                      "review_modify_timestamp": 1762555269750471,
                      "review_timestamp": 1762555269750471,
                      "user_image_link": "https://lh3.googleusercontent.com/a-/ALV-UjWtYgMWedPa_vOi057KTrgufJzxP6r10XJfYmx_7UyM0ofSwwbA=s120-c-rp-mo-ba3-br100",
                      "user_link": "https://www.google.com/maps/contrib/102548945494828807784?hl=en",
                      "user_review_count": 11,
                      "user_title": "Local Guide · 11 reviews",
                      "username": "Levi Warren"
                  },
                  {
                      "csrf_token": "eFXBEuQzaFtyLp8ybufVOkM",
                      "description": "Friend hosted a baby shower in the back event room. It was very nice place the atmosphere is so laid back. It's clean and friendly.",
                      "entity_type": "Review",
                      "paging_token_id": "CAESY0NBRVFBaHBFUTJwRlNVRlNTWEJEWjI5QlVEZGZURUV4U2xkZlgxOWZSV2hDWWxsRWJIVTBjMEZLVFZNd1VHTmlWVUZCUVVGQlIyZHVPVEpZUlVOYVIyeDZSMFpuV1VGRFNVRQ==",
                      "rating": "5",
                      "relative_time": "3 months ago",
                      "review_id": "Ci9DQUlRQUNvZENodHljRjlvT2pKSVNtWnZRM05TUjBadlNYTk1WMnB3T0VSclVGRRAB",
                      "review_like_count": 0,
                      "review_maps_link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2pKSVNtWnZRM05TUjBadlNYTk1WMnB3T0VSclVGRRAB!2m1!1s0x0:0xc9a6bf1de385f991!3m1!1s2@1:CAIQACodChtycF9oOjJISmZvQ3NSR0ZvSXNMV2pwOERrUFE%7C%7C?hl=en",
                      "review_modify_timestamp": 1767757375399285,
                      "review_timestamp": 1767757375399285,
                      "user_image_link": "https://lh3.googleusercontent.com/a-/ALV-UjXsfucBifD-bfeEY0DTVQEnxNYaeruh4k5Dr_cCTiBiIJDyblU=s120-c-rp-mo-br100",
                      "user_link": "https://www.google.com/maps/contrib/107282709692870032386?hl=en",
                      "user_review_count": 5,
                      "user_title": "5 reviews",
                      "username": "Cortney Brooks"
                  },
                  {
                      "csrf_token": "eFXBEuQzaFtyLp8ybufVOkM",
                      "description": "Great room in the back that they rent out to the public.  The room is great for birthday parties, baby showers, and gatherings.  Very clea and friendly area.",
                      "entity_type": "Review",
                      "paging_token_id": "CAESY0NBRVFBeHBFUTJwRlNVRlNTWEJEWjI5QlVEZGZURUV5VW5SZlgxOWZSV2hFUVRKalptMUVRVEozTFVkalYzVnBXVUZCUVVGQlIyZHVPVEpZVVVOYVNHMTZjbk13V1VGRFNVRQ==",
                      "rating": "5",
                      "relative_time": "3 months ago",
                      "review_id": "Ci9DQUlRQUNvZENodHljRjlvT2kxb1MyNVVaVEZuVHpGd2JtVjJRblZVWDA1R1QxRRAB",
                      "review_like_count": 0,
                      "review_maps_link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2kxb1MyNVVaVEZuVHpGd2JtVjJRblZVWDA1R1QxRRAB!2m1!1s0x0:0xc9a6bf1de385f991!3m1!1s2@1:CAIQACodChtycF9oOi1oS25UZTFnTzFwbmV2QnVUX05GT1E%7C%7C?hl=en",
                      "review_modify_timestamp": 1767484707122344,
                      "review_timestamp": 1767484707122344,
                      "user_image_link": "https://lh3.googleusercontent.com/a/ACg8ocLtb0h_UCDqKqz6F1YSJt_s4XGNKZ_sMqcDaK77_CTdAsJ_HQ=s120-c-rp-mo-ba2-br100",
                      "user_link": "https://www.google.com/maps/contrib/116319395598113341052?hl=en",
                      "user_review_count": 5,
                      "user_title": "Local Guide · 5 reviews",
                      "username": "Michele Darling"
                  },
                  {
                      "csrf_token": "eFXBEuQzaFtyLp8ybufVOkM",
                      "description": "Amazing staff and the Meade is so good!!!!  Great brewery, highly recommend!",
                      "entity_type": "Review",
                      "paging_token_id": "CAESY0NBRVFCQnBFUTJwRlNVRlNTWEJEWjI5QlVEZGZURUpDVFdOZlgxOWZSV2hEV25JeGIxbGhhR1JaTjBSYVR6RllUVUZCUVVGQlIyZHVPVEpaTkVOaFQzZEthWEZqV1VGRFNVRQ==",
                      "photos": [
                          {
                              "image_url": "https://lh3.googleusercontent.com/geougc-cs/AMG9lETsIKKn9A2i2Pdw_e0gZiXidpN3RmMAb8Oj_uC_fQtpf9nmqAFuRvdDexnK90TzdCcOg-gEk7QdcrwgxmixsDFzySM5acL1XgARKeiKVXCrVgraiLx9KqfArrsVOMkKoevg5VqGgw",
                              "latitude": "44.03784939630107",
                              "longitude": "-103.17946620484919",
                              "max_height": 4032,
                              "max_width": 3024,
                              "position": 0
                          }
                      ],
                      "rating": "5",
                      "relative_time": "10 months ago",
                      "review_id": "ChdDSUhNMG9nS0VOcl8xNVNPX2QtSy1BRRAB",
                      "review_like_count": 0,
                      "review_maps_link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChdDSUhNMG9nS0VOcl8xNVNPX2QtSy1BRRAB!2m1!1s0x0:0xc9a6bf1de385f991!3m1!1s2@1:CIHM0ogKENr_15SO_d-K-AE%7C%7C?hl=en",
                      "review_modify_timestamp": 1748386608472437,
                      "review_timestamp": 1748386608472437,
                      "user_image_link": "https://lh3.googleusercontent.com/a-/ALV-UjWc-nKWTQYttfd1gBHCKn-09Wm9o7siL-wrREFIuZ8QwiW5Z-1bag=s120-c-rp-mo-ba6-br100",
                      "user_link": "https://www.google.com/maps/contrib/110122205189938678516?hl=en",
                      "user_review_count": 377,
                      "user_title": "Local Guide · 377 reviews",
                      "username": "Cassandra NightThunder"
                  },
                  {
                      "csrf_token": "eFXBEuQzaFtyLp8ybufVOkM",
                      "description": "This place is special!!  Always a great selection of beers, with seasonal rotations.  The atmosphere is amazing, it’s quiet & comfortable with friendly knowledgeable servers.  They have a huge event room in the back with indoor games like corn hole & ring toss.  There is outside seating in the summer with umbrellas & it’s also dog friendly.  Can’t say enough great things about this place.  Check out their website/FB for food truck schedule!",
                      "entity_type": "Review",
                      "paging_token_id": "CAESY0NBRVFCUnBFUTJwRlNVRlNTWEJEWjI5QlVEZGZURUpFYVcxZlgxOWZSV2hCYURGRmVHMW1hVU4yZDBRMlp6WkdZMEZCUVVGQlIyZHVPVEphVVVObGRrNU9YMUZaV1VGRFNVRQ==",
                      "rating": "5",
                      "relative_time": "3 years ago",
                      "review_id": "ChdDSUhNMG9nS0VJQ0FnSUQtXzh6MjRRRRAB",
                      "review_like_count": 0,
                      "review_maps_link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChdDSUhNMG9nS0VJQ0FnSUQtXzh6MjRRRRAB!2m1!1s0x0:0xc9a6bf1de385f991!3m1!1s2@1:CIHM0ogKEICAgID-_8z24QE%7C%7C?hl=en",
                      "review_modify_timestamp": 1670955270905041,
                      "review_timestamp": 1670955270905041,
                      "user_image_link": "https://lh3.googleusercontent.com/a-/ALV-UjV3zuYQ58jkyS1gqjsjtLsGRY1axHeFCIts1U8aBqZSY5gpm-Jo=s120-c-rp-mo-ba3-br100",
                      "user_link": "https://www.google.com/maps/contrib/109775739463744259132?hl=en",
                      "user_review_count": 36,
                      "user_title": "Local Guide · 36 reviews",
                      "username": "Zachary Gerow"
                  },
                  {
                      "csrf_token": "eFXBEuQzaFtyLp8ybufVOkM",
                      "description": "The beer flight holders are so stinking cool!! The beer was pretty good (I'm more a red wine guy). Knocked one star because I don't have a great reason to give it 5/5. It was a good experience and I've been back since then, and they do seem to have some pretty unique beers, but it still just doesn't feel like a full 5/5.",
                      "entity_type": "Review",
                      "paging_token_id": "CAESY0NBRVFCaHBFUTJwRlNVRlNTWEJEWjI5QlVEZGZURUpHZDFSZlgxOWZSV2hEWDNWdk5UUm1jSGRNZGtRMGQxZEtZMEZCUVVGQlIyZHVPVEphYTBOamExWmFjVGxSV1VGRFNVRQ==",
                      "rating": "4",
                      "relative_time": "2 years ago",
                      "review_id": "ChZDSUhNMG9nS0VJQ0FnSUNkcy1YOUtREAE",
                      "review_like_count": 0,
                      "review_maps_link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChZDSUhNMG9nS0VJQ0FnSUNkcy1YOUtREAE!2m1!1s0x0:0xc9a6bf1de385f991!3m1!1s2@1:CIHM0ogKEICAgICds-X9KQ%7C%7C?hl=en",
                      "review_modify_timestamp": 1708233479211339,
                      "review_timestamp": 1708233479211339,
                      "user_image_link": "https://lh3.googleusercontent.com/a-/ALV-UjXky42dwm4rR3ijaclyYaToU22Ti5IgsoXvFN2UZC6-JE6HyG38bg=s120-c-rp-mo-ba4-br100",
                      "user_link": "https://www.google.com/maps/contrib/117086595948949568549?hl=en",
                      "user_review_count": 34,
                      "user_title": "Local Guide · 34 reviews",
                      "username": "Luke Wass"
                  },
                  {
                      "csrf_token": "eFXBEuQzaFtyLp8ybufVOkM",
                      "description": "Beers are great, tasty, and they have a diverse selection of styles! They are family friendly, including pets! Customer service has always been fantastic. Will be back for more delicious beer! Bonus, they sell crowlers so we stocked up.",
                      "entity_type": "Review",
                      "paging_token_id": "CAESY0NBRVFCeHBFUTJwRlNVRlNTWEJEWjI5QlVEZGZURUpJT1VWZlgxOWZSV2hDZFhKcWNVZElPWGswYmw5RGIwazJUVUZCUVVGQlIyZHVPVEphT0VOalJGQndXa0pSV1VGRFNVRQ==",
                      "rating": "5",
                      "relative_time": "a year ago",
                      "review_id": "ChZDSUhNMG9nS0VJQ0FnSUN6eE5PT0N3EAE",
                      "review_like_count": 0,
                      "review_maps_link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChZDSUhNMG9nS0VJQ0FnSUN6eE5PT0N3EAE!2m1!1s0x0:0xc9a6bf1de385f991!3m1!1s2@1:CIHM0ogKEICAgICzxNOOCw%7C%7C?hl=en",
                      "review_modify_timestamp": 1717115984875528,
                      "review_timestamp": 1717112100195744,
                      "user_image_link": "https://lh3.googleusercontent.com/a-/ALV-UjVyF0VUUzUakqfz70_z9-7BKDjMwdcFrVm6gPFQPADKX11Ai6Y=s120-c-rp-mo-ba2-br100",
                      "user_link": "https://www.google.com/maps/contrib/102214487150764211039?hl=en",
                      "user_review_count": 10,
                      "user_title": "Local Guide · 10 reviews",
                      "username": "Leah Waldner"
                  },
                  {
                      "csrf_token": "eFXBEuQzaFtyLp8ybufVOkM",
                      "description": "The absolute best Hefeweizen you will find in Rapid City. Great atmosphere, helpful and knowledgeable staff, and the best selection of beers. No bells and whistles, just great beer and great people.",
                      "entity_type": "Review",
                      "paging_token_id": "CAESY0NBRVFDQnBFUTJwRlNVRlNTWEJEWjI5QlVEZGZURUptZGt4ZlgxOWZSV2hCZDNKSGFXVnZWV2t0YldkMlVHSlNaMEZCUVVGQlIyZHVPVEprYTBOaUxXRk1ZMmRuV1VGRFNVRQ==",
                      "photos": [
                          {
                              "image_url": "https://lh3.googleusercontent.com/geougc-cs/AMG9lEQeFuTaS7s8h-X3cbLbOSAFrBjbedV7-Y5rb93MEMopYlro1sPCyCrCWuN-I1X-afY6NV2SAxHwKSiMDfatrub-vijsC7M0vTQ0KmnVZKprs2olNRBnqr6TRcKmv8YEHbcEmg0wGQ",
                              "latitude": "44.03784939630107",
                              "longitude": "-103.17946620484919",
                              "max_height": 640,
                              "max_width": 640,
                              "position": 0
                          }
                      ],
                      "rating": "5",
                      "relative_time": "a year ago",
                      "review_id": "ChdDSUhNMG9nS0VJQ0FnSUNMLUlyWHpnRRAB",
                      "review_like_count": 0,
                      "review_maps_link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChdDSUhNMG9nS0VJQ0FnSUNMLUlyWHpnRRAB!2m1!1s0x0:0xc9a6bf1de385f991!3m1!1s2@1:CIHM0ogKEICAgICL-IrXzgE%7C%7C?hl=en",
                      "review_modify_timestamp": 1718413987319362,
                      "review_timestamp": 1718413987319362,
                      "user_image_link": "https://lh3.googleusercontent.com/a-/ALV-UjXuub6omgSYS8zjAv3ZkPPVJ0qgcc1fqckWgq6E-w5RebDeryo=s120-c-rp-mo-ba4-br100",
                      "user_link": "https://www.google.com/maps/contrib/115144067668248124664?hl=en",
                      "user_review_count": 60,
                      "user_title": "Local Guide · 60 reviews",
                      "username": "Joseph Stanfill"
                  },
                  {
                      "csrf_token": "eFXBEuQzaFtyLp8ybufVOkM",
                      "description": "Went to Zymurcracy's 4 year anniversary and premiere of their meads! Can I say wow?! I've been waiting for any mead brewery in the Black Hills, and Zymurcracy did not disappoint! I wanted bottles of each kind! And the snacks they have are so good. I pretty much ate them all to myself, sorry to my group. 😅 So good! Taking everyone there to try the mead while they have it.",
                      "entity_type": "Review",
                      "paging_token_id": "CAESY0NBRVFDUnBFUTJwRlNVRlNTWEJEWjI5QlVEZGZURUpvYWpCZlgxOWZSV2hFVUcxWU1FOXVOR3A1VjA5M1FteHlORUZCUVVGQlIyZHVPVEprTUVObGRERTFWbkJuV1VGRFNVRQ==",
                      "photos": [
                          {
                              "image_url": "https://lh3.googleusercontent.com/geougc-cs/AMG9lERgTXdwi3yTsEzQcoNg9kCCva1GioKIDv7YRlRNh_11MU7TFqXdqSmxHp_slhhn-beYF-u4sUErk5GljerF7L8mHs_UcpxO7EUD35g_ekdxY4vHnD-lng1u0ZP_KRrXssAoqE8Ijg",
                              "latitude": "44.03784939630107",
                              "longitude": "-103.17946620484919",
                              "max_height": 4000,
                              "max_width": 3000,
                              "position": 0
                          }
                      ],
                      "rating": "5",
                      "relative_time": "3 years ago",
                      "review_id": "ChdDSUhNMG9nS0VJQ0FnSUNCbFB5UnRBRRAB",
                      "review_like_count": 0,
                      "review_maps_link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChdDSUhNMG9nS0VJQ0FnSUNCbFB5UnRBRRAB!2m1!1s0x0:0xc9a6bf1de385f991!3m1!1s2@1:CIHM0ogKEICAgICBlPyRtAE%7C%7C?hl=en",
                      "review_modify_timestamp": 1671321528679707,
                      "review_timestamp": 1671321528679707,
                      "user_image_link": "https://lh3.googleusercontent.com/a/ACg8ocJ0D-mIOsRV1D_cXcNRv-xRHinltgFKptrEWUuOtWx9MOa3cg=s120-c-rp-mo-ba3-br100",
                      "user_link": "https://www.google.com/maps/contrib/115318573191173195895?hl=en",
                      "user_review_count": 46,
                      "user_title": "Local Guide · 46 reviews",
                      "username": "Shareece Tatum"
                  },
                  {
                      "csrf_token": "eFXBEuQzaFtyLp8ybufVOkM",
                      "description": "We stopped on our way to our Hotel in Rapid City after getting rained out at Mt Rushmore. Very friendly & helpful staff. Because of the rain there were only a few people there which made it very nice. Very helpful on beer selection & samples. Love the beer & the fact this place is veteran owned! If you’re in Rapid City it’s a must stop! I even bought the perfect July 4th t-shirt!",
                      "entity_type": "Review",
                      "paging_token_id": "CAESY0NBRVFDaHBFUTJwRlNVRlNTWEJEWjI5QlVEZGZURUp2YTBoZlgxOWZSV2hDU0VzelprVkVNVUZ1T0hSbFJVbEZSVUZCUVVGQlIyZHVPVEpsTkVOa2N6Rk9jbVpCV1VGRFNVRQ==",
                      "rating": "5",
                      "relative_time": "2 years ago",
                      "review_id": "ChdDSUhNMG9nS0VJQ0FnSUNKbjdYeDlRRRAB",
                      "review_like_count": 0,
                      "review_maps_link": "https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChdDSUhNMG9nS0VJQ0FnSUNKbjdYeDlRRRAB!2m1!1s0x0:0xc9a6bf1de385f991!3m1!1s2@1:CIHM0ogKEICAgICJn7Xx9QE%7C%7C?hl=en",
                      "review_modify_timestamp": 1688772694543176,
                      "review_timestamp": 1688772376263501,
                      "user_image_link": "https://lh3.googleusercontent.com/a/ACg8ocJEA-Gmp2qZp5-gfPVzV6qVhlV0dtxAu1_QSNl-xFp_-Gh8Ig=s120-c-rp-mo-br100",
                      "user_link": "https://www.google.com/maps/contrib/111839032680089892626?hl=en",
                      "user_review_count": 4,
                      "user_title": "4 reviews",
                      "username": "Tina Thomason"
                  }
              ]
          },
          "total_entities_count": 10,
          "entities_count": {
              "Review": 10
          },
          "metrics": {}
      },
    },
    "metadata": {
      "query_time": "2026-04-22T18:26:18.186Z",
      "query_duration": 9701,
      "response_parameters": {
        "input_url": "https://www.google.com/maps/rpc/listugcposts?authuser=0&hl=en&ie=UTF-8&sourceid=chrome&pb=..."
      },
      "driver": "vx6"
    },
    "status_code": 200
  }
  ```
</Accordion>

## Response

All responses share the same top-level envelope:

| Field                               | Description                                             |
| ----------------------------------- | ------------------------------------------------------- |
| `task_id`                           | Unique request ID                                       |
| `status`                            | `"success"` or `"error"`                                |
| `data.html`                         | Raw HTML (omitted when `no_html: true`)                 |
| `data.parsing.entities`             | Object of typed arrays, keys vary by engine (see below) |
| `data.parsing.entities_count`       | Per-type entity counts                                  |
| `data.parsing.total_entities_count` | Total count across all entity types                     |
| `metadata.query_time`               | ISO timestamp of when the query ran                     |
| `metadata.query_duration`           | Request duration in milliseconds                        |
| `metadata.response_parameters`      | Echo of the resolved input parameters                   |
| `metadata.driver`                   | Internal routing driver used for this request           |
| `status_code`                       | HTTP status code from the upstream source               |

### Entities by engine

<AccordionGroup>
  <Accordion title="google_search: OrganicResult, AnswerBox, Pagination & more">
    **OrganicResult**: one entry perweb result

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
    **NewsResults**: the fullnews results object

    | Field            | Type   | Description                                             |
    | ---------------- | ------ | ------------------------------------------------------- |
    | `head_title`     | string | Title of the news results section                       |
    | `menu_items`     | array  | Top-level navigation topics (U.S., World, Local, etc.)  |
    | `sub_menu_items` | array  | Secondary navigation tabs (Home, For you, Sports, etc.) |
    | `news_results`   | array  | Individual news articles (may be null for some queries) |
    | `related_topics` | array  | Related topic suggestions                               |
  </Accordion>

  <Accordion title="google_images: ImageResult">
    **ImageResult**: one entry perimage

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

  <Accordion title="google_maps_search: SearchResult">
    **SearchResult**: one entry perbusiness or location

    | Field                  | Type    | Description                                            |
    | ---------------------- | ------- | ------------------------------------------------------ |
    | `position`             | integer | Rank in the results (1-indexed)                        |
    | `title`                | string  | Business or place name                                 |
    | `address`              | string  | Full formatted address                                 |
    | `city`                 | string  | City                                                   |
    | `country`              | string  | ISO country code                                       |
    | `latitude`             | string  | Latitude coordinate                                    |
    | `longitude`            | string  | Longitude coordinate                                   |
    | `phone_number`         | string  | Business phone number                                  |
    | `rating`               | string  | Star rating (e.g. `"4.3 stars"`)                       |
    | `review_summary`       | object  | `overall_rating` (float) and `review_count` (integer)  |
    | `business_category`    | array   | List of business category labels                       |
    | `business_description` | array   | Short descriptions of the business                     |
    | `business_status`      | string  | `"OPERATIONAL"`, `"CLOSED_TEMPORARILY"`, etc.          |
    | `place_id`             | string  | Google Maps place identifier                           |
    | `sponsored`            | boolean | Whether this is a sponsored listing                    |
    | `place_information`    | object  | `photos` (array) and `website_url` (string)            |
    | `nimble_reviews_link`  | string  | Ready-to-use URL to fetch reviews for this place       |
    | `nimble_place_link`    | string  | Ready-to-use URL to fetch place details for this place |
  </Accordion>

  <Accordion title="google_maps_place: Place">
    **Place**: detailed information about a single place

    | Field                 | Type   | Description                                                       |
    | --------------------- | ------ | ----------------------------------------------------------------- |
    | `title`               | string | Business or place name                                            |
    | `address`             | string | Full formatted address                                            |
    | `city`                | string | City                                                              |
    | `country`             | string | ISO country code                                                  |
    | `street_address`      | string | Street portion of the address                                     |
    | `zip_code`            | string | Postal code                                                       |
    | `floor`               | string | Floor number if applicable                                        |
    | `located_in`          | string | Parent building or complex name if applicable                     |
    | `latitude`            | string | Latitude coordinate                                               |
    | `longitude`           | string | Longitude coordinate                                              |
    | `phone_number`        | string | Business phone number                                             |
    | `rating`              | string | Star rating (e.g. `"5 stars"`)                                    |
    | `number_of_reviews`   | string | Total review count                                                |
    | `review_summary`      | object | `overall_rating` (float) and `review_count` (integer)             |
    | `business_category`   | array  | List of business category labels                                  |
    | `business_status`     | string | `"OPERATIONAL"`, `"CLOSED_TEMPORARILY"`, etc.                     |
    | `place_id`            | string | Google Maps place identifier                                      |
    | `plus_code`           | object | `global_code` and `compound_code` (human-readable)                |
    | `place_information`   | object | `photos` (array), `website_url` (string), `reviews_link` (string) |
    | `nimble_reviews_link` | string | Ready-to-use URL to fetch reviews for this place                  |
  </Accordion>

  <Accordion title="google_maps_reviews: Review">
    **Review**: one entry peruser review

    | Field               | Type    | Description                                     |
    | ------------------- | ------- | ----------------------------------------------- |
    | `username`          | string  | Reviewer's display name                         |
    | `user_title`        | string  | Badge label (e.g. `"Local Guide · 10 reviews"`) |
    | `user_review_count` | integer | Total number of reviews by this user            |
    | `rating`            | string  | Star rating given (e.g. `"5"`)                  |
    | `description`       | string  | Review text body                                |
    | `relative_time`     | string  | Human-readable age (e.g. `"3 years ago"`)       |
    | `review_timestamp`  | integer | Unix timestamp in microseconds                  |
    | `review_id`         | string  | Unique review identifier                        |
    | `review_like_count` | integer | Number of helpful votes                         |
    | `review_maps_link`  | string  | Deep link to the review on Google Maps          |
    | `user_link`         | string  | Link to the reviewer's Google Maps profile      |
    | `user_image_link`   | string  | URL of the reviewer's profile photo             |
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
curl -X POST 'https://sdk.nimbleway.com/v1/serp/async' \
--header 'Authorization: Bearer <YOUR-API-KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search_engine": "google_search",
    "query": "NBA Allstars 2026",
    "country": "US",
    "locale": "en"
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

Submit multiple SERP requests in a single call. Use `inputs` for per-request parameters and `shared_inputs` for parameters shared across all tasks.

#### Examples

<AccordionGroup>
  <Accordion icon="magnifying-glass" title="Example 1: Multiple search terms">
    Search for different queries in one batch:

    ```bash cURL theme={"system"}
    curl -X POST 'https://sdk.nimbleway.com/v1/serp/batch' \
    --header 'Authorization: Bearer <YOUR-API-KEY>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "inputs": [
            { "query": "Coffee" },
            { "query": "Tea" },
            { "query": "Biscuits" }
        ],
        "shared_inputs": {
            "search_engine": "google_search",
            "storage_type": "s3",
            "storage_url": "s3://your-bucket/results/",
            "callback_url": "https://your-api.com/webhook/complete"
        }
    }'
    ```
  </Accordion>

  <Accordion icon="globe" title="Example 2: Different terms and countries">
    Per-request `country` and `locale` overrides. Shared inputs set the engine and delivery:

    ```bash cURL theme={"system"}
    curl -X POST 'https://sdk.nimbleway.com/v1/serp/batch' \
    --header 'Authorization: Bearer <YOUR-API-KEY>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "inputs": [
            { "query": "Coffee", "country": "US", "locale": "en-US" },
            { "query": "Tea",    "country": "FR", "locale": "fr" },
            { "query": "Biscuits", "country": "DE", "locale": "de" },
            { "query": "Eggs",   "country": "CA", "locale": "en-CA" }
        ],
        "shared_inputs": {
            "search_engine": "google_search",
            "storage_type": "s3",
            "storage_url": "s3://your-bucket/results/",
            "callback_url": "https://your-api.com/webhook/complete"
        }
    }'
    ```
  </Accordion>

  <Accordion icon="browser" title="Example 3: Same query across multiple engines">
    Set the query in `shared_inputs` and vary `search_engine` per input:

    ```bash cURL theme={"system"}
    curl -X POST 'https://sdk.nimbleway.com/v1/serp/batch' \
    --header 'Authorization: Bearer <YOUR-API-KEY>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "inputs": [
            { "search_engine": "google_search" },
            { "search_engine": "google_news" },
            { "search_engine": "google_images" }
        ],
        "shared_inputs": {
            "query": "Coffee",
            "storage_type": "s3",
            "storage_url": "s3://your-bucket/results/",
            "callback_url": "https://your-api.com/webhook/complete"
        }
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
      "status_url": "https://sdk.nimbleway.com/v1/tasks/2e508d43-8b02-4fc0-96c7-0968ab454a0c",
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
curl -X GET 'https://sdk.nimbleway.com/v1/batches/<batch_id>/progress' \
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
curl -X GET 'https://sdk.nimbleway.com/v1/batches/list?limit=20' \
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
curl -X GET 'https://sdk.nimbleway.com/v1/batches/<batch_id>' \
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

<Note>`google_news` and `google_maps_place` do not support pagination.</Note>

<Tabs>
  <Tab title="google_search">
    <Steps>
      <Step title="Pull up to 100 results in one request">
        Set `num_results: 100` to get up to 100 organic results in a single call. For most use cases, this eliminates pagination entirely.

        ```bash cURL theme={"system"}
        curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_search",
            "query": "NBA Allstar 2026",
            "country": "US",
            "locale": "en",
            "num_results": 100
        }'
        ```
      </Step>

      <Step title="Need more than 100? Add start to fetch the next batch">
        Combine `num_results: 100` with `start` to pull 100 results at a time beyond the first page. Increment `start` by 100 for each subsequent batch.

        ```bash cURL theme={"system"}
        curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_search",
            "query": "NBA Allstar 2026",
            "country": "US",
            "locale": "en",
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

  <Tab title="google_aio">
    <Steps>
      <Step title="Pull up to 100 results in one request">
        Set `num_results: 100` to get up to 100 results in a single call. For most use cases, this eliminates pagination entirely.

        ```bash cURL theme={"system"}
        curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_aio",
            "query": "how does photosynthesis work",
            "country": "US",
            "locale": "en",
            "num_results": 100
        }'
        ```
      </Step>

      <Step title="Need more than 100? Add start to fetch the next batch">
        Combine `num_results: 100` with `start` to pull 100 results at a time beyond the first page. Increment `start` by 100 for each subsequent batch.

        ```bash cURL theme={"system"}
        curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_aio",
            "query": "how does photosynthesis work",
            "country": "US",
            "locale": "en",
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
        curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_images",
            "query": "NBA Allstar 2026",
            "country": "US",
            "locale": "en",
            "num_results": 100
        }'
        ```
      </Step>

      <Step title="Need more than 100? Add start to fetch the next batch">
        Combine `num_results: 100` with `start` to pull 100 results at a time beyond the first page. Increment `start` by 100 for each subsequent batch.

        ```bash cURL theme={"system"}
        curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_images",
            "query": "NBA Allstar 2026",
            "country": "US",
            "locale": "en",
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

  <Tab title="google_maps_search">
    <Steps>
      <Step title="Make the initial request">
        Submit your Maps search query as normal.

        ```bash cURL theme={"system"}
        curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_maps_search",
            "query": "Cinema",
            "coordinates": {
                "latitude": "40.7123695",
                "longitude": "-74.0357317"
            }
        }'
        ```
      </Step>

      <Step title="Extract the next page offset from the response">
        The response includes a `Pagination` entity under `data.parsing.entities.Pagination`. Use the `offset` value from the next page entry to build your next request.

        ```json theme={"system"}
        {
          "data": {
            "parsing": {
              "entities": {
                "Pagination": [
                  {
                    "next_page_url": "https://www.google.com/maps/search/Cinema/@40.7123695,-74.0357317,14z?hl=en&start=20",
                    "offset": "20"
                  }
                ]
              }
            }
          }
        }
        ```
      </Step>

      <Step title="Submit the next request with the incremented offset">
        ```bash cURL theme={"system"}
        curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_maps_search",
            "query": "Cinema",
            "coordinates": "@40.7123695,-74.0357317,14z",
            "offset": "20"
        }'
        ```
      </Step>
    </Steps>
  </Tab>

  <Tab title="google_maps_reviews">
    <Steps>
      <Step title="Make the initial request">
        Submit your reviews request using a `place_id` or `data_id`.

        ```bash cURL theme={"system"}
        curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_maps_reviews",
            "place_id": "ChIJtRq8oUjLw4kR_tN2GQKUOXs"
        }'
        ```
      </Step>

      <Step title="Extract the paging_token_id from the response">
        The response includes a `Pagination` entity under `data.parsing.entities.Pagination`. Use the `paging_token_id` value to fetch the next page of reviews.

        ```json theme={"system"}
        {
          "data": {
            "parsing": {
              "entities": {
                "Pagination": [
                  {
                    "paging_token_id": "<token>"
                  }
                ]
              }
            }
          }
        }
        ```
      </Step>

      <Step title="Submit the next request with the paging_token_id">
        ```bash cURL theme={"system"}
        curl -X POST 'https://sdk.nimbleway.com/v1/serp' \
        --header 'Authorization: Bearer <YOUR-API-KEY>' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "search_engine": "google_maps_reviews",
            "place_id": "ChIJtRq8oUjLw4kR_tN2GQKUOXs",
            "paging_token_id": "<token>"
        }'
        ```
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Limitations

| Engine                | Limitation                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| All engines           | Default QPS: 83 (5,000 QPM) — scales to 1,000. [Contact Sales](https://nimbleway.com/contact-general/) |
| `google_search`       | `num_results` max 100                                                                                  |
| `google_search`       | `ads_optimization` requires JS rendering                                                               |
| `google_aio`          | Page rendering always enabled — cannot be disabled                                                     |
| `google_aio`          | `num_results` max 100                                                                                  |
| `google_news`         | Pagination not supported                                                                               |
| `google_news`         | `location` and `time` parameters not supported                                                         |
| `google_images`       | `ads_optimization` requires JS rendering                                                               |
| `google_maps_search`  | Raw HTML not returned — `no_html` is always `true`                                                     |
| `google_maps_place`   | Pagination not supported; single result per request                                                    |
| `google_maps_reviews` | `num_results` capped at 20                                                                             |

## Next steps

<CardGroup cols={2}>
  <Card icon="code" href="/api-reference/serp/serp" title="API Reference">
    Full API reference for the SERP endpoint
  </Card>

  <Card icon="bolt" href="/nimble-sdk/web-tools/fast-serp" title="Fast SERP">
    Lower latency variant optimized for time-sensitive workloads
  </Card>

  <Card icon="arrows-to-circle" href="/nimble-sdk/web-tools/extract/quickstart" title="Extract">
    Extract structured content from any result URL
  </Card>
</CardGroup>
