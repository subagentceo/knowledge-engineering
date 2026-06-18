# Brave Search API

Power your agents & chatbots with the world's largest independent index of the Web.

Get started* Read the docs

*with $5 in free monthly credits

## Plans

### Search

The real-time search data your chatbots & agents need to generate answers.

Complete search results (URLs, text, news, images, and more), with additional LLM context optimized for AI.

$5 per 1,000 requests

Get started

#### Includes $5 in free credits every month

Credits are automatically applied to your account

#### Special features

*   Goggles: Custom reranking & result filtering
*   Extra alternate snippets
*   Schema-enriched results + added metadata

#### Capacity

*   50 queries per second

### Answers

Summarized, completed answers to any question.

Answers grounded on a single search or multiple searches for better accuracy & reduced hallucinations.

$4 per 1,000 requests

+ $5 per million input/output tokens

Get started

#### Includes $5 in free credits every month

Credits are automatically applied to your account

#### Special features

*   Grounding supported by citations
*   Streaming
*   OpenAI SDK compatible

#### Capacity

*   2 queries per second

### Enterprise

Need custom terms, capacity, or endpoints? Contact us about bespoke plans for large-scale deployments.

#### Special features

*   Full-funnel Zero Data Retention
*   Custom agreements & NDAs
*   Invoicing & enterprise-grade support

Contact us

## Build with the power of the web

Power agentic search

Chatbots, coding assistants, and AI-search engines all need real-time data to reduce hallucinations and ground their responses with multiple sources. The Brave Search API excels in RAG pipelines, and it’s the leading search tool for applications that use Claude MCP.

Train foundation models

The open Web is a critical source of training data for today’s state-of-the-art AI models. With up to five snippets from over 30 billion pages, the Brave Search API is the best blend of scale, quality, and cost.

Create search-enabled tools

Build comprehensive company profiles in CRM platforms, gather citations for ed-tech apps, or fetch the latest news for a stock trading assistant. Thousands of teams rely on the Brave Search API to connect their apps to the Web.

 ![Power agentic search](/static-assets/images/optimized/search/api/images/robot-arm.png)

 ![Train foundation models](/static-assets/images/optimized/search/api/images/search-training.png)

 ![Create search-enabled tools](/static-assets/images/optimized/search/api/images/search-tools.png)

## Trusted by industry leaders

![Apollo logo](/search/api/images/companies/apollo.svg)

![AWS logo](/search/api/images/companies/aws.svg)

![Axel Springer logo](/search/api/images/companies/axel-springer.png)

![Causaly logo](/search/api/images/companies/causaly.svg)

![Chegg logo](/search/api/images/companies/chegg.svg)

![Cleo logo](/search/api/images/companies/cleo.svg)

![Cohere logo](/search/api/images/companies/cohere.svg)

![Firecrawl logo](/search/api/images/companies/firecrawl.svg)

![Ghostery logo](/search/api/images/companies/ghostery.svg)

![Horizon logo](/search/api/images/companies/horizon.svg)

![Kagi logo](/search/api/images/companies/kagi.svg)

![Langdock logo](/search/api/images/companies/langdock.svg)

![Mistral AI logo](/search/api/images/companies/mistral-ai.svg)

![Motley Fool logo](/search/api/images/companies/motley-fool.svg)

![Shopify logo](/search/api/images/companies/shopify.svg)

![Snowflake logo](/search/api/images/companies/snowflake.svg)

![SoftwareOne logo](/search/api/images/companies/softwareone.svg)

![Together.ai logo](/search/api/images/companies/together-ai.png)

![Turnitin logo](/search/api/images/companies/turnitin.svg)

![You logo](/search/api/images/companies/you.png)

> The Brave Search API provides accurate search results for our academic citation services. It delivers high-quality data at a reasonable price, and with intuitive data structuring. Its speed and precision have been crucial.

—Ben Tucker, SVP of Engineering, Chegg

## Key features

*   ### World-class quality
    
    In blinded testing, Brave Search performs on par with—or better than—incumbent search giants.
    
*   ### Specialized endpoints
    
    Adapt results with different specialized endpoints, including local, images, AI summaries, and more.
    
*   ### Comprehensive and fresh
    
    Brave’s index includes over 30 billion pages, kept fresh by over 100 million page updates every day.
    
*   ### Search Goggles
    
    Discard domains or re-rank results for better control of the response to your query via the Brave Search Goggles feature.
    
*   ### Extra snippets
    
    Get up to five snippets picked in real time to maximize contextual relevance to a search.
    
*   ### Schema-enriched results
    
    Get additional formatted data for popular formats like movie reviews and wikis.
    

Web LLM Context Answers Image Video News Suggest Spellcheck

Web LLM Context Answers Image Video News Suggest Spellcheck

Python cURL JavaScript GO

```python
 1#!/usr/bin/env python
 2
 3import requests
 4
 5print(
 6    requests.get(
 7        "https://api.search.brave.com/res/v1/web/search",
 8        headers={
 9            "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
10        },
11        params={
12            "q": "greek restaurants in san francisco",
13            "count": 20,
14            "country": "us",
15            "search_lang": "en",
16        },
17    ).json()
18)
```

```bash
1curl -s --compressed "https://api.search.brave.com/res/v1/web/search?q=greek+restaurants+in+san+francisco" \
2  -H "Accept: application/json" \
3  -H "Accept-Encoding: gzip" \
4  -H "X-Subscription-Token: <YOUR_API_KEY>"
```

```javascript
 1#!/usr/bin/env node
 2
 3fetch(
 4  `https://api.search.brave.com/res/v1/web/search?${new URLSearchParams({
 5    q: "greek restaurants in san francisco",
 6    count: 10,
 7    country: "us",
 8    search_lang: "en",
 9  })}`,
10  {
11    headers: {
12      "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
13    },
14  },
15)
16  .then((response) => response.json())
17  .then((data) => console.log(data));
```

```go
 1package main
 2
 3import (
 4	"fmt"
 5	"io"
 6	"net/http"
 7	"net/url"
 8)
 9
10func main() {
11	u, _ := url.Parse("https://api.search.brave.com/res/v1/web/search")
12	q := u.Query()
13	q.Set("q", "greek restaurants in san francisco")
14	q.Set("count", "10")
15	q.Set("country", "us")
16	q.Set("search_lang", "en")
17	u.RawQuery = q.Encode()
18
19	req, _ := http.NewRequest("GET", u.String(), nil)
20	req.Header.Set("X-Subscription-Token", "<BRAVE_SEARCH_API_KEY>")
21
22	resp, _ := http.DefaultClient.Do(req)
23	defer resp.Body.Close()
24
25	body, _ := io.ReadAll(resp.Body)
26	fmt.Println(string(body))
27}
```

JSON

```json
 1{
 2    "type": "search",
 3    "web": {
 4        "type": "search",
 5        "results": [
 6            {
 7                "title": "THE 10 BEST Greek Restaurants in San Francisco (Updated 2025)",
 8                "url": "https://www.tripadvisor.com/Restaurants-g60713-c23-San_Francisco_California.html",
 9                "is_source_local": false,
10                "is_source_both": false,
11                "description": "Best <strong>Greek</strong> <strong>Restaurants</strong> <strong>in</strong> <strong>San</strong> <strong>Francisco</strong>, California: Find Tripadvisor traveller reviews of <strong>San</strong> <strong>Francisco</strong> <strong>Greek</strong> <strong>restaurants</strong> and search by price, location, and more.",
12                "profile": {
13                    "name": "Tripadvisor",
14                    "url": "https://www.tripadvisor.com/Restaurants-g60713-c23-San_Francisco_California.html",
15                    "long_name": "tripadvisor.com",
16                    "img": "https://imgs.search.brave.com/OEuNbeVBPVl2AlxDmpKDNcYk4RuERMK4gTlMyVzbpSw/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvZjQ1MjliOWZi/NmMxZWRhYmY2MmYy/MmNjMmM0ZWM3MTA4/ZTUxM2E1M2JlMzgx/ODM0N2E2NzY5OTJk/YjQwNmNlNi93d3cu/dHJpcGFkdmlzb3Iu/Y29tLw"
17                }…
```

Python cURL JavaScript GO

```python
 1#!/usr/bin/env python
 2
 3import requests
 4
 5print(
 6    requests.get(
 7        "https://api.search.brave.com/res/v1/llm/context",
 8        headers={
 9            "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
10        },
11        params={
12            "q": "what is tallest mountain in solar system",
13        },
14    ).json()
15)
```

```bash
1curl -s --compressed "https://api.search.brave.com/res/v1/llm/context?q=what+is+tallest+mountain+in+solar+system" \
2  -H "Accept: application/json" \
3  -H "Accept-Encoding: gzip" \
4  -H "X-Subscription-Token: <YOUR_API_KEY>"
```

```javascript
 1#!/usr/bin/env node
 2
 3fetch(
 4  `https://api.search.brave.com/res/v1/llm/context?${new URLSearchParams({
 5    q: "what is tallest mountain in solar system",
 6  })}`,
 7  {
 8    headers: {
 9      "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
10    },
11  },
12)
13  .then((response) => response.json())
14  .then((data) => console.log(data));
```

```go
 1package main
 2
 3import (
 4    "fmt"
 5    "io/ioutil"
 6    "net/http"
 7)
 8
 9func main() {
10    client := &http.Client{}
11    req, err := http.NewRequest("GET", "https://api.search.brave.com/res/v1/llm/context?q=what+is+tallest+mountain+in+solar+system", nil)
12    if err != nil {
13        panic(err)
14    }
15
16    req.Header.Set("Accept", "application/json")
17    req.Header.Set("Accept-Encoding", "gzip")
18    req.Header.Set("X-Subscription-Token", "<YOUR_API_KEY>")
19
20    resp, err := client.Do(req)
21    if err != nil {
22        panic(err)
23    }
24    defer resp.Body.Close()
25
26    body, err := ioutil.ReadAll(resp.Body)
27    if err != nil {
28        panic(err)
29    }
30
31    fmt.Println(string(body))
32}
```

JSON

```json
 1{
 2  "grounding": {
 3    "generic": [
 4      {
 5        "url": "https://en.wikipedia.org/wiki/List_of_tallest_mountains_in_the_Solar_System",
 6        "title": "List of tallest mountains in the Solar System",
 7        "snippets": [
 8          "{\"title\":\"List of tallest mountains in the Solar System\",\"table\":[{\"Planet\":\"Mercury\",\"Tallest peak\":\"Caloris Montes\",\"Base-to-peak height\":\"≤ 3 km (1.9 mi)\",\"% of radius\":\"0.12\",\"Origin\":\"impact\",\"Notes\":\"Formed by the Caloris impact\"},{\"Planet\":\"Venus\",\"Tallest peak\":\"Maat Mons\",\"Base-to-peak height\":\"4.9 km (3.0 mi) (approx.)\",\"% of radius\":\"0.081\",\"Origin\":\"volcanic\",\"Notes\":\"Highest volcano on Venus\"},{\"Planet\":\"Earth\",\"Tallest peak\":\"Mauna Kea and Mauna Loa\",\"Base-to-peak height\":\"10.2 km (6.3 mi)\",\"% of radius\":\"0.16\",\"Origin\":\"volcanic\",\"Notes\":\"4.2 km (2.6 mi) of this is above sea level\"},{\"Planet\":\"Earth\",\"Tallest peak\":\"Haleakalā\",\"Base-to-peak height\":\"9.1 km (5.7 mi)\",\"% of radius\":\"0.14\",\"Origin\":\"volcanic\",\"Notes\":\"Rises 3.1 km above sea level\"},{\"Planet\":\"Earth\",\"Tallest peak\":\"Pico del Teide\",\"Base-to-peak height\":\"7.5 km (4.7 mi)\",\"% of radius\":\"0.12\",\"Origin\":\"volcanic\",\"Notes\":\"Rises 3.7 km above sea level\"},{\"Planet\":\"Earth\",\"Tallest peak\":\"Denali (Mount McKinley)\",\"Base-to-peak height\":\"5.3 to 5.9 km (3.3 to 3.7 mi)\",\"% of radius\":\"0.093\",\"Origin\":\"tectonic\",\"Notes\":\"Tallest mountain base-to-peak on land\"},{\"Planet\":\"Earth\",\"Tallest peak\":\"Mount Everest\",\"Base-to-peak height\":\"3.6 to 4.6 km (2.2 to 2.9 mi)\",\"% of radius\":\"0.072\",\"Origin\":\"tectonic\",\"Notes\":\"4.6 km on north face, 3.6 km on south face; highest elevation (8.8 km) above sea level, as well as by wet and dry prominence (but not among the tallest from base to peak, nor in distance to Earth's center, as Chimborazo rises highest).\"},{\"Planet\":\"Moon\",\"Tallest peak\":\"Mons Huygens\",\"Base-to-peak height\":\"5.3 km (3.3 mi)\",\"% of radius\":\"0.31\",\"Origin\":\"impact\",\"Notes\":\"Formed by the Imbrium impact.\"},{\"Planet\":\"Moon\",\"Tallest peak\":\"Mons Mouton\",\"Base-to-peak height\":\"6 km (3.7 mi)\",\"% of radius\":\"0.35\",\"Origin\":\"impact\",\"Notes\":\"Possibly formed by the South Pole-Aitken basin impact.\"},{\"Planet\":\"Moon\",\"Tallest peak\":\"Southern Farside Mountain\",\"Base-to-peak height\":\"7 km (4.3 mi)\",\"% of radius\":\"0.40\",\"Origin\":\"impact\",\"Notes\":\"Informal name of the Moon's tallest free-standing mountain. Possibly formed by the South Pole-Aitken basin impact. Not highest lunar peak by prominence, which would be Selenean summit.\"},{\"Planet\":\"Moon\",\"Tallest peak\":\"Mons Hadley\",\"Base-to-peak height\":\"4.5 km (2.8 mi)\",\"% of radius\":\"0.26\",\"Origin\":\"impact\",\"Notes\":\"Formed by the Imbrium impact\"},{\"Planet\":\"Moon\",\"Tallest peak\":\"Mons Rümker\",\"Base-to-peak height\":\"1.3 km (0.81 mi)\",\"% of radius\":\"0.063\",\"Origin\":\"volcanic\",\"Notes\":\"Largest volcanic construct on the Moon\"},{\"Planet\":\"Mars\",\"Tallest peak\":\"Olympus Mons\",\"Base-to-peak height\":\"21.9–26 km (13.6–16.2 mi; 72,000–85,000 ft)\",\"% of radius\":\"0.65\",\"Origin\":\"volcanic\",\"Notes\":\"Tallest mountain in the Solar System. Rises 26 km above northern plains, (dry prominence) 1000 km away. Summit calderas are 60×80 km wide, up to 3.2 km deep; scarp around margin is up to 8 km high. A shield volcano, the mean flank slope is a modest 5.2 degrees.\"},{\"Planet\":\"Mars\",\"Tallest peak\":\"Ascraeus Mons\",\"Base-to-peak height\":\"14.9 km (9.3 mi)\",\"% of radius\":\"0.44\",\"Origin\":\"volcanic\",\"Notes\":\"Tallest of the three Tharsis Montes\"},{\"Planet\":\"Mars\",\"Tallest peak\":\"Elysium Mons\",\"Base-to-peak height\":\"12.6 km (7.8 mi)\",\"% of radius\":\"0.37\",\"Origin\":\"volcanic\",\"Notes\":\"Highest volcano in Elysium\"},{\"Planet\":\"Mars\",\"Tallest peak\":\"Arsia Mons\",\"Base-to-peak height\":\"11.7 km (7.3 mi)\",\"% of radius\":\"0.35\",\"Origin\":\"volcanic\",\"Notes\":\"Summit caldera is 108 to 138 km (67 to 86 mi) across\"},{\"Planet\":\"Mars\",\"Tallest peak\":\"Pavonis Mons\",\"Base-to-peak height\":\"8.4 km (5.2 mi)\",\"% of radius\":\"0.25\",\"Origin\":\"volcanic\",\"Notes\":\"Summit caldera is 4.8 km (3.0 mi) deep\"},{\"Planet\":\"Mars\",\"Tallest peak\":\"Anseris Mons\",\"Base-to-peak height\":\"6.2 km (3.9 mi)\",\"% of radius\":\"0.18\",\"Origin\":\"impact\",\"Notes\":\"Among the highest nonvolcanic peaks on Mars, formed by the Hellas impact\"},{\"Planet\":\"Mars\",\"Tallest peak\":\"Aeolis Mons (\\\"Mount Sharp\\\")\",\"Base-to-peak height\":\"4.5 to 5.5 km (2.8 to 3.4 mi)\",\"% of radius\":\"0.16\",\"Origin\":\"deposition and erosion\",\"Notes\":\"Formed from deposits in Gale crater; the MSL rover has been ascending it since November 2014.\"},{\"Planet\":\"Vesta\",\"Tallest peak\":\"Rheasilvia central peak\",\"Base-to-peak height\":\"20–22 km (12–14 mi; 66,000–72,000 ft)\",\"% of radius\":\"8.4\",\"Origin\":\"impact\",\"Notes\":\"Almost 200 km (120 mi) wide. See also: List of largest craters in the Solar System\"},{\"Planet\":\"Ceres\",\"Tallest peak\":\"Ahuna Mons\",\"Base-to-peak height\":\"4 km (2.5 mi)\",\"% of radius\":\"0.85\",\"Origin\":\"cryovolcanic\",\"Notes\":\"Isolated steep-sided dome in relatively smooth area; max. height of ~ 5 km on steepest side; roughly antipodal to largest impact basin on Ceres\"},{\"Planet\":\"Io\",\"Tallest peak\":\"Boösaule Montes \\\"South\\\"\",\"Base-to-peak height\":\"17.5 to 18.2 km (10.9 to 11.3 mi)\",\"% of radius\":\"1.0\",\"Origin\":\"tectonic\",\"Notes\":\"Has a 15 km (9 mi) high scarp on its SE margin\"},{\"Planet\":\"Io\",\"Tallest peak\":\"Ionian Mons east ridge\",\"Base-to-peak height\":\"12.7 km (7.9 mi) (approx.)\",\"% of radius\":\"0.70\",\"Origin\":\"tectonic\",\"Notes\":\"Has the form of a curved double ridge\"},{\"Planet\":\"Io\",\"Tallest peak\":\"Euboea Montes\",\"Base-to-peak height\":\"10.5 to 13.4 km (6.5 to 8.3 mi)\",\"% of radius\":\"0.74\",\"Origin\":\"tectonic\",\"Notes\":\"A NW flank landslide left a 25,000 km3 debris apron\"},{\"Planet\":\"Io\",\"Tallest peak\":\"unnamed (245° W, 30° S)\",\"Base-to-peak height\":\"2.5 km (1.6 mi) (approx.)\",\"% of radius\":\"0.14\",\"Origin\":\"volcanic\",\"Notes\":\"One of the tallest of Io's many volcanoes, with an atypical conical form\"},{\"Planet\":\"Mimas\",\"Tallest peak\":\"Herschel central peak\",\"Base-to-peak height\":\"7 km (4 mi) (approx.)\",\"% of radius\":\"3.5\",\"Origin\":\"impact\",\"Notes\":\"See also: List of largest craters in the Solar System\"},{\"Planet\":\"Dione\",\"Tallest peak\":\"Janiculum Dorsa\",\"Base-to-peak height\":\"1.5 km (0.9 mi)\",\"% of radius\":\"0.27\",\"Origin\":\"tectonic\",\"Notes\":\"Surrounding crust depressed ca. 0.3 km.\"},{\"Planet\":\"Titan\",\"Tallest peak\":\"Mithrim Montes\",\"Base-to-peak height\":\"≤ 3.3 km (2.1 mi)\",\"% of radius\":\"0.13\",\"Origin\":\"tectonic\",\"Notes\":\"May have formed due to global contraction\"},{\"Planet\":\"Titan\",\"Tallest peak\":\"Doom Mons\",\"Base-to-peak height\":\"1.45 km (0.90 mi)\",\"% of radius\":\"0.056\",\"Origin\":\"cryovolcanic\",\"Notes\":\"Adjacent to Sotra Patera, a 1.7 km (1.1 mi) deep collapse feature\"},{\"Planet\":\"Iapetus\",\"Tallest peak\":\"equatorial ridge\",\"Base-to-peak height\":\"20 km (12 mi) (approx.)\",\"% of radius\":\"2.7\",\"Origin\":\"uncertain\",\"Notes\":\"Individual peaks have not been measured\"},{\"Planet\":\"Oberon\",\"Tallest peak\":\"unnamed (\\\"limb mountain\\\")\",\"Base-to-peak height\":\"11 km (7 mi) (approx.)\",\"% of radius\":\"1.4\",\"Origin\":\"impact (?)\",\"Notes\":\"A value of 6 km was given shortly after the Voyager 2 encounter\"},{\"Planet\":\"Pluto\",\"Tallest peak\":\"Tenzing Montes, peak \\\"T2\\\"\",\"Base-to-peak height\":\"~6.2 km (3.9 mi)\",\"% of radius\":\"0.52\",\"Origin\":\"tectonic (?)\",\"Notes\":\"Composed of water ice; named after Tenzing Norgay\"},{\"Planet\":\"Pluto\",\"Tallest peak\":\"Piccard Mons\",\"Base-to-peak height\":\"~5.5 km (3.4 mi)\",\"% of radius\":\"0.46\",\"Origin\":\"cryovolcanic (?)\",\"Notes\":\"~220 km across; central depression is 11 km deep\"},{\"Planet\":\"Pluto\",\"Tallest peak\":\"Wright Mons\",\"Base-to-peak height\":\"~4.7 km (2.9 mi)\",\"% of radius\":\"0.40\",\"Origin\":\"cryovolcanic (?)\",\"Notes\":\"~160 km across; summit depression ~56 km across and 4.5 km deep\"},{\"Planet\":\"Charon\",\"Tallest peak\":\"Butler Mons\",\"Base-to-peak height\":\"≥ 4.5 km (2.8 mi)\",\"% of radius\":\"0.74\",\"Origin\":\"tectonic (?)\",\"Notes\":\"Vulcan Planitia, the southern plains, has several isolated peaks, possibly tilted crustal blocks\"},{\"Planet\":\"Charon\",\"Tallest peak\":\"Dorothy central peak\",\"Base-to-peak height\":\"~4.0 km (2.5 mi)\",\"% of radius\":\"0.66\",\"Origin\":\"impact\",\"Notes\":\"North polar impact basin Dorothy, Charon's largest, is ~240 km across and 6 km deep\"},{\"Planet\":\"Máni\",\"Tallest peak\":\"unnamed\",\"Base-to-peak height\":\"25 km (16 mi)\",\"% of radius\":\"6.3\",\"Origin\":\"impact\",\"Notes\":\"Discovered by stellar occultation; it is unclear whether this feature is a genuine topographic peak or a transiting/occulting satellite.\"}],\"caption\":\"List\",\"headers\":[\"List of t",
 9          "## List\n### Tallest mountains by elevation\n* Olympus Mons 72,000&nbsp;ft (22,000&nbsp;m)\n\n* Equatorial Ridge 65,617&nbsp;ft (20,000&nbsp;m)\n\n* Boösaule Mons 59,711&nbsp;ft (18,200&nbsp;m)\n\n* Ascraeus Mons 49,000&nbsp;ft (15,000&nbsp;m)\n\n* Ionian Mons 41,667&nbsp;ft (12,700&nbsp;m)\n\n* Elysium Mons 41,338&nbsp;ft (12,600&nbsp;m)\n\n* Arsia Mons 38,386&nbsp;ft (11,700&nbsp;m)\n\n* Limb Mountain 36,089&nbsp;ft (11,000&nbsp;m)\n\n* Euboea Montes 34,449&nbsp;ft (10,500&nbsp;m)\n\n* Mauna Kea 33,500&nbsp;ft (10,200&nbsp;m)\n\n* Mount Everest 29,029&nbsp;ft (8,848&nbsp;m)\n\n* Herschel Peak 22,966&nbsp;ft (7,000&nbsp;m)\n\n* Anseris Mons 20,341&nbsp;ft (6,200&nbsp;m)\n\n* Tenzing Montes 20,341&nbsp;ft (6,200&nbsp;m)\n\n* Denali/Mount McKinley 20,310&nbsp;ft (6,190&nbsp;m)\n\n* Mount Kilimanjaro 19,341&nbsp;ft (5,895&nbsp;m)\n\n* Mons Huygens 18,045&nbsp;ft (5,500&nbsp;m)\n\n* Aeolis Mons 18,045&nbsp;ft (5,500&nbsp;m)\n\n* Piccard Mons 18,045&nbsp;ft (5,500&nbsp;m)\n\n* Maat Mons 16,076&nbsp;ft (4,900&nbsp;m)\n\n* Wright Mons 15,420&nbsp;ft (4,700&nbsp;m)\n\n* Mons Hadley 14,764&nbsp;ft (4,500&nbsp;m)\n\n* Butler Mons 14,764&nbsp;ft (4,500&nbsp;m)\n\n* Ahuna Mons 13,500&nbsp;ft (4,100&nbsp;m)\n\n* Dorothy Peak 13,123&nbsp;ft (4,000&nbsp;m)\n\n* Mithrim Montes 10,948&nbsp;ft (3,337&nbsp;m)\n\n* Haleakalā 10,023&nbsp;ft (3,055&nbsp;m)\n\n* Caloris Montes 9,843&nbsp;ft (3,000&nbsp;m)\n\n* Io (unnamed peak) 8,202&nbsp;ft (2,500&nbsp;m)\n\n* Janiculum Dorsa 4,921&nbsp;ft (1,500&nbsp;m)\n\n* Doom Mons 4,757&nbsp;ft (1,450&nbsp;m)\n\n* Mons Rümker 4,265&nbsp;ft (1,300&nbsp;m)"
10        ]
11      },
12      ...
13    ],
14    "map": []
15  },
16  "sources": {
17    "https://en.wikipedia.org/wiki/List_of_tallest_mountains_in_the_Solar_System": {
18      "title": "List of tallest mountains in the Solar System",
19      "hostname": "en.wikipedia.org",
20      "age": [
21        "Friday, February 06, 2026",
22        "2026-02-06",
23        "11 days ago"
24      ]
25    },
26    ...
27  }
28}
```

Python cURL JavaScript GO

```python
 1from openai import OpenAI
 2
 3client = OpenAI(
 4  api_key="<YOUR_BRAVE_SEARCH_API_KEY>",
 5  base_url="https://api.search.brave.com/res/v1",
 6)
 7
 8completions = client.chat.completions.create(
 9  messages=[
10    {
11      "role": "user",
12      "content": "What is the second highest mountain?",
13    }
14  ],
15  model="brave",
16  stream=False,
17)
18
19print(completions.choices[0].message.content)
```

```bash
1curl -X POST  -s --compressed "https://api.search.brave.com/res/v1/chat/completions" \
2  -H "accept: application/json" \
3  -H "Accept-Encoding: gzip" \
4  -H "Content-Type: application/json" \
5  -d '{"stream": "false", "messages": [{"role": "user", "content": "What is the second highest mountain?"}]}' \
6  -H "x-subscription-token: <YOUR_BRAVE_SEARCH_API_KEY>"
```

```javascript
 1import OpenAI from 'openai';
 2
 3const client = new OpenAI({
 4  apiKey: process.env['BRAVE_SEARCH_API_KEY'], 
 5  baseURL: 'https://api.search.brave.com/res/v1',
 6});
 7
 8(async () => {
 9  const response = await client.chat.completions.create({
10    model: 'brave',
11    stream: false,
12    messages: [
13      { role: 'user', content: 'What is the second highest mountain?' },
14    ],
15  });
16
17  console.log(response.choices[0].message.content);
18})();
```

```go
 1package main
 2
 3import (
 4	"context"
 5	"fmt"
 6
 7	openai "github.com/openai/openai-go"
 8	"github.com/openai/openai-go/option"
 9)
10
11func main() {
12	client := openai.NewClient(
13		option.WithAPIKey("BRAVE_SEARCH_API_KEY"),
14		option.WithBaseURL("https://api.search.brave.com/res/v1"),                    
15	)
16
17	chatCompletion, err := client.Chat.Completions.New(context.TODO(), openai.ChatCompletionNewParams{
18		Messages: []openai.ChatCompletionMessageParamUnion{
19			openai.UserMessage("What is the second highest mountain?"),
20		},
21		Model: "brave",
22	})
23
24	if err != nil {
25		panic(err.Error())
26	}
27
28	fmt.Println(chatCompletion.Choices[0].Message.Content)
29}
```

JSON

```json
 1{
 2   "model": "brave-pro",
 3   "system_fingerprint": "",
 4   "choices": [
 5       {
 6           "index": 0,
 7           "message": {
 8               "role": "assistant",
 9               "content": "The second highest mountain in the world is K2, standing at 8,611 metres (28,251 ft) above sea level. It is located in the Karakoram range, on the border between the Gilgit-Baltistan region of Pakistan and the Taxkorgan Tajik Autonomous County of Xinjiang, China.\n\nK2 is known as the \"Savage Mountain,\" a nickname attributed to climber George Bell after the 1953 American expedition, due to its extreme difficulty and high fatality rate. It is considered a more challenging climb than Mount Everest, the world's highest peak, because of its steep slopes, unpredictable weather, and technical climbing routes.\n\nThe first successful ascent of K2 was achieved on July 31, 1954, by Italian climbers Lino Lacedelli and Achille Compagnoni as part of an expedition led by Ardito Desio. As of August 2023, approximately 800 people have summited K2, with 96 recorded deaths during attempts.\n\nK2 is also known by other names, including Mount Godwin-Austen and Chogori, though it is most commonly referred to by its survey designation. In January 2021, it became the last of the 14 eight-thousanders to be summited in winter, accomplished by a team of Nepalese climbers led by Nirmal Purja and Mingma Gyalje Sherpa."
10           },
11           "finish_reason": "stop"
12       }
13
14   ],
15   "created": 1754426219,
16   "id": "749fc052-ea6d-47f1-ab11-a4ae293d0b57",
17   "object": "chat.completion",
18   "usage": {
19       "completion_tokens": 305,
20       "prompt_tokens": 7275,
21       "total_tokens": 7580,
22       "completion_tokens_details": {
23           "reasoning_tokens": 0
24       }
25   }
26}
```

Python cURL JavaScript GO

```python
 1#!/usr/bin/env python
 2
 3import requests
 4
 5print(
 6    requests.get(
 7        "https://api.search.brave.com/res/v1/images/search",
 8        headers={
 9            "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
10        },
11        params={
12            "q": "munich",
13            "count": 20,
14            "country": "us",
15            "search_lang": "en",
16            "spellcheck": 1,
17        },
18    ).json()
19)
```

```bash
1curl -s --compressed "https://api.search.brave.com/res/v1/images/search?q=munich&safesearch=strict&count=20&search_lang=en&country=us&spellcheck=1" \
2  -H "Accept: application/json" \
3  -H "Accept-Encoding: gzip" \
4  -H "X-Subscription-Token: <YOUR_API_KEY>"
```

```javascript
 1#!/usr/bin/env node
 2
 3fetch(
 4  `https://api.search.brave.com/res/v1/images/search?${new URLSearchParams({
 5    q: "munich",
 6    count: 20,
 7    country: "us",
 8    search_lang: "en",
 9    spellcheck: 1,
10  })}`,
11  {
12    headers: {
13      "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
14    },
15  },
16)
17  .then((response) => response.json())
18  .then((data) => console.log(data));
```

```go
 1package main
 2
 3import (
 4    "compress/gzip"
 5    "fmt"
 6    "io"
 7    "net/http"
 8    "net/url"
 9)
10
11func main() {
12    baseUrl := "https://api.search.brave.com/res/v1/images/search"
13    params := url.Values{}
14    params.Add("q", "munich")
15    params.Add("safesearch", "strict")
16    params.Add("count", "20")
17    params.Add("search_lang", "en")
18    params.Add("country", "us")
19    params.Add("spellcheck", "1")
20
21    client := &http.Client{}
22    req, err := http.NewRequest("GET", baseUrl+"?"+params.Encode(), nil)
23    if err != nil {
24        panic(err)
25    }
26
27    req.Header.Set("Accept", "application/json")
28    req.Header.Set("Accept-Encoding", "gzip")
29    req.Header.Set("X-Subscription-Token", "<YOUR_API_KEY>")
30
31    resp, err := client.Do(req)
32    if err != nil {
33        panic(err)
34    }
35    defer resp.Body.Close()
36
37    var reader io.ReadCloser
38    if resp.Header.Get("Content-Encoding") == "gzip" {
39        reader, err = gzip.NewReader(resp.Body)
40        if err != nil {
41            panic(err)
42        }
43        defer reader.Close()
44    } else {
45        reader = resp.Body
46    }
47
48    body, err := io.ReadAll(reader)
49    if err != nil {
50        panic(err)
51    }
52
53    fmt.Println(string(body))
54}
```

JSON

```json
 1{
 2    "type": "images",
 3    "query": {
 4        "original": "hammerhead shark",
 5        "spellcheck_off": false,
 6        "show_strict_warning": false
 7    },
 8    "results": [
 9        {
10            "type": "image_result",
11            "title": "Hammerhead Shark",
12            "url": "https://stock.adobe.com/search?k=%22hammerhead+shark%22",
13            "source": "stock.adobe.com",
14            "page_fetched": "2025-02-28T23:32:43Z",
15            "thumbnail": {
16                "src": "https://imgs.search.brave.com/PlleyzpCI84WDWewoXw1E38DYRsdoNYaMVmYuuXaX-g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzczLzYxLzU0/LzM2MF9GXzM3MzYx/NTQ1MV9lbE1SWW5N/VE1zZ1ZVOXd0Nmps/dTRkS2Z3dUdwUmZK/dy5qcGc"
17            },
18            "properties": {
19                "url": "https://t3.ftcdn.net/jpg/03/73/61/54/360_F_373615451_elMRYnMTMsgVU9wt6jlu4dKfwuGpRfJw.jpg",
20                "placeholder": "https://imgs.search.brave.com/fY6pOi-eKjgdulvjAfnJ4r4I4taP73Mvk_XB_I8aWM4/rs:fit:76:0:0:0/g:ce/q:10/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAzLzczLzYxLzU0/LzM2MF9GXzM3MzYx/NTQ1MV9lbE1SWW5N/VE1zZ1ZVOXd0Nmps/dTRkS2Z3dUdwUmZK/dy5qcGc"
21            },
22            "meta_url": {
23                "scheme": "https",
24                "netloc": "stock.adobe.com",
25                "hostname": "stock.adobe.com",
26                "favicon": "https://imgs.search.brave.com/ZxIJGoK8dKjPx3r6T5VEe1HXg5wLOSkejXoCy5fIufQ/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvOTFhMDJkZGQ1/OWEwZTBhOGJjODU2/ZDcwNTQ1MzYyYmNm/NDlhYTY4Y2FhYjY4/MjYzNTgxMWUwM2Q3/YmJmZTQ2ZS9zdG9j/ay5hZG9iZS5jb20v",
27                "path": "› search"
28            },
29            "confidence": "high"
30        }
31    ]
32}
```

Python cURL JavaScript GO

```python
 1#!/usr/bin/env python
 2
 3import requests
 4
 5print(
 6    requests.get(
 7        "https://api.search.brave.com/res/v1/images/search",
 8        headers={
 9            "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
10        },
11        params={
12            "q": "black myth wukong",
13            "count": 10,
14            "country": "us",
15            "search_lang": "en",
16            "spellcheck": 1,
17        },
18    ).json()
19)
```

```bash
1curl -s --compressed "https://api.search.brave.com/res/v1/videos/search?q=black+myth+wukong&count=10&country=us&search_lang=en&spellcheck=1" \
2  -H "Accept: application/json" \
3  -H "Accept-Encoding: gzip" \
4  -H "X-Subscription-Token: <YOUR_API_KEY>"
```

```javascript
 1#!/usr/bin/env node
 2
 3fetch(
 4  `https://api.search.brave.com/res/v1/videos/search?${new URLSearchParams({
 5    q: "black myth wukong",
 6    count: 10,
 7    country: "us",
 8    search_lang: "en",
 9    spellcheck: 1,
10  })}`,
11  {
12    headers: {
13      "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
14    },
15  },
16)
17  .then((response) => response.json())
18  .then((data) => console.log(data));
```

```go
 1package main
 2
 3import (
 4    "fmt"
 5    "io/ioutil"
 6    "net/http"
 7)
 8
 9func main() {
10    client := &http.Client{}
11    req, err := http.NewRequest("GET", "https://api.search.brave.com/res/v1/videos/search?q=black+myth+wukong&count=10&country=us&search_lang=en&spellcheck=1", nil)
12    if err != nil {
13        panic(err)
14    }
15
16    req.Header.Set("Accept", "application/json")
17    req.Header.Set("Accept-Encoding", "gzip")
18    req.Header.Set("X-Subscription-Token", "<YOUR_API_KEY>")
19
20    resp, err := client.Do(req)
21    if err != nil {
22        panic(err)
23    }
24    defer resp.Body.Close()
25
26    body, err := ioutil.ReadAll(resp.Body)
27    if err != nil {
28        panic(err)
29    }
30
31    fmt.Println(string(body))
32}
```

JSON

```json
 1{
 2    "type": "videos",
 3    "query": {
 4        "original": "black myth wukong",
 5        "spellcheck_off": false,
 6        "show_strict_warning": false
 7    },
 8    "results": [
 9        {
10            "type": "video_result",
11            "url": "https://www.youtube.com/watch?v=VLnywm2XgJg",
12            "title": "Black Myth: Wukong - Before You Buy - YouTube",
13            "description": "Black Myth: Wukong (PC, PS5, Xbox Series X/S) is a fresh action game from a newer development studio. How is it? Let's talk.Subscribe for more: http://youtub...",
14            "age": "August 16, 2024",
15            "page_age": "2024-08-16T17:41:12",
16            "video": {
17                "duration": "12:22",
18                "views": 2832944,
19                "creator": "gameranx",
20                "publisher": "YouTube",
21                "requires_subscription": false,
22                "tags": [
23                    "jake baldino"
24                ],
25                "author": {
26                    "name": "gameranx",
27                    "url": "http://www.youtube.com/@gameranxTV"
28                }
29            }
30        }
31    ]
32}
```

Python cURL JavaScript GO

```python
 1#!/usr/bin/env python
 2
 3import requests
 4
 5print(
 6    requests.get(
 7        "https://api.search.brave.com/res/v1/news/search",
 8        headers={
 9            "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
10        },
11        params={
12            "q": "munich",
13            "count": 10,
14            "country": "us",
15            "search_lang": "en",
16            "spellcheck": 1,
17        },
18    ).json()
19)
```

```bash
1curl -s --compressed "https://api.search.brave.com/res/v1/news/search?q=munich&count=10&country=us&search_lang=en&spellcheck=1" \
2  -H "Accept: application/json" \
3  -H "Accept-Encoding: gzip" \
4  -H "X-Subscription-Token: <YOUR_API_KEY>"
```

```javascript
 1#!/usr/bin/env node
 2
 3fetch(
 4  `https://api.search.brave.com/res/v1/news/search?${new URLSearchParams({
 5    q: "munich",
 6    count: 10,
 7    country: "us",
 8    search_lang: "en",
 9    spellcheck: 1,
10  })}`,
11  {
12    headers: {
13      "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
14    },
15  },
16)
17  .then((response) => response.json())
18  .then((data) => console.log(data));
```

```go
 1package main
 2
 3import (
 4    "fmt"
 5    "io"
 6    "net/http"
 7)
 8
 9func main() {
10    client := &http.Client{}
11    req, err := http.NewRequest("GET", "https://api.search.brave.com/res/v1/news/search?q=munich&count=10&country=us&search_lang=en&spellcheck=1", nil)
12    if err != nil {
13        panic(err)
14    }
15
16    req.Header.Set("Accept", "application/json")
17    req.Header.Set("Accept-Encoding", "gzip")
18    req.Header.Set("X-Subscription-Token", "<YOUR_API_KEY>")
19
20    resp, err := client.Do(req)
21    if err != nil {
22        panic(err)
23    }
24    defer resp.Body.Close()
25
26    body, err := io.ReadAll(resp.Body)
27    if err != nil {
28        panic(err)
29    }
30
31    fmt.Println(string(body))
32}
```

JSON

```json
 1{
 2    "type": "news",
 3    "query": {
 4        "original": "munich",
 5        "spellcheck_off": false,
 6        "show_strict_warning": false
 7    },
 8    "results": [
 9        {
10            "type": "news_result",
11            "title": "News | Munich tops TD100 ranking for office and retail rents",
12            "url": "https://www.costar.com/article/376440806/munich-tops-td100-ranking-for-office-and-retail-rents",
13            "description": "Sister publication Thomas Daily gathers metrics like rent and yield for the top 100 cities in Germany",
14            "age": "1 day ago",
15            "page_age": "2025-04-01T13:20:42",
16            "meta_url": {
17                "scheme": "https",
18                "netloc": "costar.com",
19                "hostname": "www.costar.com",
20                "favicon": "https://imgs.search.brave.com/qKaDutjw31L2t0y0EZpwK8bCGuuuKW62BuPTjoc4EeI/rs:fit:32:32:1:0/g:ce/aHR0cDovL2Zhdmlj/b25zLnNlYXJjaC5i/cmF2ZS5jb20vaWNv/bnMvYjMyNmE3ZWY4/YjgyNzlkM2M1ZThh/MjU0YzI3ZGUyNzBi/MDUwNDUxMjUzNGEx/ZjM1Y2FmNmIzZjc3/NjU4YTg0NC93d3cu/Y29zdGFyLmNvbS8",
21                "path": "› article  › 376440806  › munich-tops-td100-ranking-for-office-and-retail-rents"
22            },
23            "thumbnail": {
24                "src": "https://imgs.search.brave.com/hZsGpoIMHbKbPOWe7zKSlocTJV9rkjPdlf_slgPUovQ/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9jb3N0/YXIuYnJpZ2h0c3Bv/dGNkbi5jb20vZGlt/czQvZGVmYXVsdC9h/Y2FmOWViLzIxNDc0/ODM2NDcvc3RyaXAv/dHJ1ZS9jcm9wLzIw/NDh4MTM2NiswKzAv/cmVzaXplLzIwNDh4/MTM2NiEvcXVhbGl0/eS8xMDAvP3VybD1o/dHRwJTNBJTJGJTJG/Y29zdGFyLWJyaWdo/dHNwb3QuczMudXMt/ZWFzdC0xLmFtYXpv/bmF3cy5jb20lMkZH/ZXR0eUltYWdlcy0x/MTczNDg0MTE4Lmpw/Zw"
25            }
26        }
27    ]
28}
```

Python cURL JavaScript GO

```python
 1#!/usr/bin/env python
 2
 3import requests
 4
 5print(
 6    requests.get(
 7        "https://api.search.brave.com/res/v1/suggest/search",
 8        headers={
 9            "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
10        },
11        params={
12            "q": "hello",
13            "count": 5,
14            "country": "us",
15        },
16    ).json()
17)
```

```bash
1curl -s --compressed "https://api.search.brave.com/res/v1/suggest/search?q=hello&country=US&count=5" \
2  -H "Accept: application/json" \
3  -H "Accept-Encoding: gzip" \
4  -H "X-Subscription-Token: <YOUR_API_KEY>"
```

```javascript
 1#!/usr/bin/env node
 2
 3fetch(
 4  `https://api.search.brave.com/res/v1/suggest/search?${new URLSearchParams({
 5    q: "hello",
 6    count: 5,
 7    country: "us",
 8  })}`,
 9  {
10    headers: {
11      "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
12    },
13  },
14)
15  .then((response) => response.json())
16  .then((data) => console.log(data));
```

```go
 1package main
 2
 3import (
 4    "fmt"
 5    "io"
 6    "net/http"
 7)
 8
 9func main() {
10    client := &http.Client{}
11    req, err := http.NewRequest("GET", "https://api.search.brave.com/res/v1/suggest/search?q=hello&country=US&count=5", nil)
12    if err != nil {
13        panic(err)
14    }
15
16    req.Header.Add("Accept", "application/json")
17    req.Header.Add("Accept-Encoding", "gzip")
18    req.Header.Add("X-Subscription-Token", "<YOUR_API_KEY>")
19
20    resp, err := client.Do(req)
21    if err != nil {
22        panic(err)
23    }
24    defer resp.Body.Close()
25
26    body, err := io.ReadAll(resp.Body)
27    if err != nil {
28        panic(err)
29    }
30
31    fmt.Println(string(body))
32}
```

JSON

```json
 1{
 2    "type": "suggest",
 3    "query": {
 4        "original": "hello"
 5    },
 6    "results": [
 7        {
 8            "query": "hello"
 9        },
10        {
11            "query": "hello chat gpt"
12        },
13        {
14            "query": "hellofresh"
15        },
16        {
17            "query": "hello kitty island adventure"
18        },
19        {
20            "query": "hello kitty"
21        }
22    ]
23}
```

Python cURL JavaScript GO

```python
 1#!/usr/bin/env python
 2
 3import requests
 4
 5print(
 6    requests.get(
 7        "https://api.search.brave.com/res/v1/spellcheck/search",
 8        headers={
 9            "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
10        },
11        params={
12            "q": "hellop",
13            "country": "us",
14        },
15    ).json()
16)
```

```bash
1curl -s --compressed "https://api.search.brave.com/res/v1/spellcheck/search?q=hellop&country=US" \
2  -H "Accept: application/json" \
3  -H "Accept-Encoding: gzip" \
4  -H "X-Subscription-Token: <YOUR_API_KEY>"
```

```javascript
 1#!/usr/bin/env node
 2
 3fetch(
 4  `https://api.search.brave.com/res/v1/spellcheck/search?${new URLSearchParams({
 5    q: "hellop",
 6    country: "us",
 7  })}`,
 8  {
 9    headers: {
10      "X-Subscription-Token": "<BRAVE_SEARCH_API_KEY>",
11    },
12  },
13)
14  .then((response) => response.json())
15  .then((data) => console.log(data));
```

```go
 1package main
 2
 3import (
 4	"fmt"
 5	"io"
 6	"net/http"
 7)
 8
 9func main() {
10	client := &http.Client{}
11	req, err := http.NewRequest("GET", "https://api.search.brave.com/res/v1/spellcheck/search?q=hellop&country=US", nil)
12	if err != nil {
13		panic(err)
14	}
15
16	req.Header.Set("Accept", "application/json")
17	req.Header.Set("Accept-Encoding", "gzip")
18	req.Header.Set("X-Subscription-Token", "<YOUR_API_KEY>")
19
20	resp, err := client.Do(req)
21	if err != nil {
22		panic(err)
23	}
24	defer resp.Body.Close()
25
26	body, _ := io.ReadAll(resp.Body)
27	fmt.Println(string(body))
28}
```

JSON

```json
 1{
 2    "type": "spellcheck",
 3    "query": {
 4        "original": "hellop"
 5    },
 6    "results": [
 7        {
 8            "query": "hello"
 9        }
10    ]
11}
```

![AWS Marketplace](/static-assets/images/optimized/search/api/images/aws-marketplace.png)

## Enterprise ready

*   ### SOC 2 attested
    
    The Brave Search API is SOC 2 Type II attested, with its strict security and privacy controls independently verified by a third-party auditor. Visit our Trust Center to learn more.
    
*   ### Zero Data Retention
    
    The only search API built with privacy at its core is also the only search API that can offer true Zero Data Retention. With ZDR, companies can meet ever-growing compliance obligations and gain a competitive advantage. Learn more about ZDR.
    
*   ### High capacity, low latency
    
    Engineered for large-scale deployments, the Brave Search API can handle the capacity needs of even the largest global enterprises. Market-leading low latencies support individual use cases and workflows.
    

## FAQ

What is the Brave Search API?

The Brave Search API is a developer tool for building applications with data from the Web. It’s powered by Brave’s independent Web index, the same index that powers Brave Search. It’s commonly used in traditional search engine products, AI search engines, AI training, and agentic (autonomous AI) search.

Why is a credit card required to subscribe to a free plan?

The credit card requirement serves as an anti-fraud measure to protect Brave from bad actors who want to abuse our API. For free plans, the card is only used to confirm your identity and will not be charged.

What other web search API options can the Brave Search API compliment or replace?

The Brave Search API can replace several competing options that may have smaller indexes (Tavily or Exa), higher latencies (SerpAPI or Serper), or more limited access (Google and Bing). It can also serve as a complement to localized API options like Baidu, Naver, Yahoo, and Yandex. The Brave Search API is powered by Brave Search, a completely independent index of the Web, which is tuned to reduce SEO spam and increase quality and recency of results.

Where does the data come from?

Every search engine that has its own index necessarily has its own Web crawler. The Brave Search crawler does not advertise a differentiated user-agent because we must avoid discrimination from websites that allow only Google to crawl them. However, if a domain or page is not crawlable by any search engine (e.g. because it has a noindex tag), or if it is not crawlable by googlebot, then Brave Search’s bot will not crawl it either.

Brave Search is also built on more than just Web crawlers: its privacy-preserving Web Discovery Project (WDP) allows Brave browser users to opt in and contribute data about searches and webpage visits. This level of voluntary human contribution to an index is unique in the world of API search and training data. WDP uses several privacy safeguards to prevent Brave from knowing who is contributing what, and the code is open-source for auditing by anyone.

What are the key benefits of the Brave Search API?

The Brave Search API offers world-class search engine capabilities at a significantly lower cost to other Search and AI Search APIs. The data is fresh, high-quality, and scales with small to large businesses. The Brave Search API is provisioned to manage thousands of requests per second (and growing) and offers customers the speed and reliability necessary for applications with millions of users around the world.

Importantly, the Brave Search API is not a scraper that simply uses bots to query Google or Bing and repackage their results. Instead, it’s our own independent index of the Web packaged with our own ranking models.

Does the Brave Search API surface recent events?

Yes. Brave Search fetches millions of webpages every day, offering extensive coverage of recent events around the world.

Can I store results retrieved from the Brave Search API?

If you would like to store the API results in part or whole (for example, to train or tune an LLM), you will need to subscribe to a plan that explicitly grants storage rights. Plans with storage rights grant special permissions which are not covered in our general Terms of Service.

What about copyright?

Brave Search API offers a ranked list of webpages that are publicly available; this list also includes information to support why the webpage is relevant to the query (for instance, via query-dependent snippets based on the content of the webpage).

The Brave Search API does not grant any rights to third-party content such as webpages. Customers who access URLs displayed in the Brave Search API must ensure their access to those webpages complies with the copyright terms of the page publishers.

Does the Brave Search API follow security and privacy best practices?

Yes. For more info, please check out our help page about API privacy and security.