> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Nimble Documentation

> Create Web Search Agents for any website. Extract structured, real-time knowledge for AI applications, data pipelines, and analytics — no scraping expertise required.

export const EndpointNav = () => {
  const endpoints = [
    { id: 'agent', label: 'AGENT', icon: 'bullseye-pointer' },
    { id: 'extract', label: 'EXTRACT', icon: 'arrows-to-circle' },
    { id: 'search', label: 'SEARCH', icon: 'magnifying-glass' },
    { id: 'map', label: 'MAP', icon: 'sitemap' },
    { id: 'crawl', label: 'CRAWL', icon: 'spider' },
    { id: 'proxy', label: 'PROXY', icon: 'globe' },
  ];

const switchEndpoint = (id) => {
if (typeof document === 'undefined') return;
document.querySelectorAll('.ep-panel').forEach(p => p.style.display = 'none');
const panel = document.getElementById('ep-' + id);
if (panel) panel.style.display = 'block';
document.querySelectorAll('[data-ep]').forEach(b => {
delete b.dataset.active;
b.style.backgroundColor = '';
b.style.color = '';
b.style.borderColor = '';
const icon = b.querySelector('.ep-icon');
if (icon) icon.style.display = 'none';
});
document.querySelectorAll('[data-ep="' + id + '"]').forEach(b => {
b.dataset.active = 'true';
b.style.backgroundColor = '#edc602';
b.style.color = 'black';
b.style.borderColor = '#edc602';
const icon = b.querySelector('.ep-icon');
if (icon) icon.style.display = 'inline-flex';
});
};

return (

<div class="mint-flex mint-flex-row mint-flex-wrap mint-gap-2 mint-pb-5">
{endpoints.map((ep, i) => (
<button
key={ep.id}
data-ep={ep.id}
data-active={i === 0 ? 'true' : undefined}
type="button"
onClick={() => switchEndpoint(ep.id)}
class="mint-py-2 mint-px-4 mint-flex mint-items-center mint-justify-center mint-gap-1.5 mint-rounded-md mint-text-xs mint-font-mono mint-uppercase mint-transition-colors mint-border mint-bg-white dark:mint-bg-transparent mint-text-gray-600 dark:mint-text-gray-400 mint-border-gray-300 dark:mint-border-[#333] hover:mint-text-white hover:mint-border-[#edc602]"
style={i === 0 ? {transition: 'all 0.2s ease-in-out', backgroundColor: '#edc602', color: 'black', borderColor: '#edc602'} : {transition: 'all 0.2s ease-in-out'}}
onMouseEnter={(e) => { if (!e.currentTarget.dataset.active) { e.currentTarget.style.backgroundColor = '#edc602'; e.currentTarget.style.color = 'black'; e.currentTarget.style.borderColor = '#edc602'; }}}
onMouseLeave={(e) => { if (!e.currentTarget.dataset.active) { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = ''; }}} >
<span className="ep-icon" style={{display: i === 0 ? 'inline-flex' : 'none', alignItems: 'center'}}><Icon icon={ep.icon} size={14} color={'black'} /></span>
{ep.label}
</button>
))}
</div>
);
};

export const ResponsiveStyle = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
    .io-grid {
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }
    @media (min-width: 768px) {
      .io-grid {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 24px;
      }
    }
    .flow-connector-mobile {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 4px 0;
    }
    @media (min-width: 768px) {
      .flow-connector-mobile {
        padding: 0 8px;
      }
    }
  `,
    }}
  />
);

export const FlowConnector = () => (
  <div
    class="flow-connector-mobile"
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      alignSelf: "center",
    }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14m0 0l-5-5m5 5l-5 5"
        stroke="#edc602"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <img
        src="/images/favicon.png"
        style={{
          width: "40px",
          height: "40px",
          borderColor: "#a5b4fc",
        }}
        alt="Nimble"
      />
      <span
        style={{
          fontSize: "16px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#edc602",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        }}
      >
        Nimble
      </span>
    </div>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14m0 0l-5-5m5 5l-5 5"
        stroke="#edc602"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export const SectionLabel = ({ children, sub }) => (
  <div style={{ marginBottom: "8px" }}>
    <div
      style={{
        fontSize: "14px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "#a5b4fc",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      }}
    >
      {children}
    </div>
    {sub && (
      <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "3px" }}>
        {sub}
      </div>
    )}
  </div>
);

export const PageBg = () => {
  const ob = {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(120px)",
    pointerEvents: "none",
  };
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          ...ob,
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, #edc602 0%, transparent 70%)",
          top: "25%",
          left: "-10%",
          opacity: 0.35,
        }}
      />
      <div
        style={{
          ...ob,
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle,rgb(241, 208, 99) 0%, transparent 70%)",
          top: "35%",
          right: "-10%",
          opacity: 0.25,
        }}
      />
      <div
        style={{
          ...ob,
          width: "550px",
          height: "550px",
          background:
            "radial-gradient(circle,rgb(255, 249, 193) 0%, transparent 70%)",
          bottom: "-10%",
          left: "25%",
          opacity: 0.3,
        }}
      />
      <div
        style={{
          ...ob,
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle,rgb(248, 242, 129) 0%, transparent 70%)",
          top: "60%",
          left: "-8%",
          opacity: 0.2,
        }}
      />
      <div
        style={{
          ...ob,
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle,rgb(252, 242, 165) 0%, transparent 70%)",
          top: "35%",
          left: "50%",
          opacity: 0.15,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.06,
          backgroundImage:
            "radial-gradient(circle,rgb(255, 240, 124) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(180deg, transparent 0%, black 25%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 25%)",
        }}
      />
    </div>
  );
};

<PageBg />

<ResponsiveStyle />

<div className="max-w-6xl mx-auto px-6 sm:px-8" style={{ position: "relative", zIndex: 1 }}>
  <div className="py-8 md:py-10">
    <h1 className="mint-text-4xl sm:mint-text-5xl mint-tracking-tight mint-font-medium mint-flex mint-items-center mint-flex-nowrap mint-text-gray-900 dark:mint-text-white">
      <span class="mint-whitespace-nowrap">Build with Nimble</span>
    </h1>

    <h3 class="mint-text-xl mint-text-left mint-mt-3 mint-mb-6 mint-text-gray-600 dark:mint-text-gray-300">
      <span data-as="p">
        Web Search Agents that turn any website into structured knowledge for AI
      </span>
    </h3>

    <div class="mint-flex mint-flex-wrap mint-gap-4">
      <a href="https://online.nimbleway.com/studio" target="_blank" rel="noopener noreferrer" class="mint-inline-flex mint-items-center mint-justify-center mint-gap-2 mint-px-7 mint-py-2 mint-text-base mint-font-medium mint-text-black mint-border mint-border-[#edc602] mint-rounded-lg mint-transition-all mint-duration-200" style={{ backgroundColor: "#edc602" }}>
        <span>Try Nimble Studio</span>
        <span class="mint-ml-2">→</span>
      </a>

      <a href="/integrations/agent-skills/plugin-installation" class="mint-inline-flex mint-items-center mint-justify-center mint-gap-2 mint-px-7 mint-py-2 mint-text-base mint-font-medium mint-text-gray-700 dark:mint-text-gray-300 mint-bg-white dark:mint-bg-gray-800 mint-border mint-border-gray-300 dark:mint-border-gray-600 mint-rounded-lg hover:mint-bg-gray-50 dark:hover:mint-bg-gray-700 mint-transition-all mint-duration-200">
        <span>Install Plugin</span>
        <span class="mint-ml-2">→</span>
      </a>

      <a href="/nimble-sdk/getting-started/quickstart" class="mint-inline-flex mint-items-center mint-justify-center mint-gap-2 mint-px-7 mint-py-2 mint-text-base mint-font-medium mint-text-gray-700 dark:mint-text-gray-300 mint-bg-white dark:mint-bg-gray-800 mint-border mint-border-gray-300 dark:mint-border-gray-600 mint-rounded-lg hover:mint-bg-gray-50 dark:hover:mint-bg-gray-700 mint-transition-all mint-duration-200">
        <span>Quickstart Guide</span>
        <span class="mint-ml-2">→</span>
      </a>

      <a href="/api-reference/introduction" class="mint-inline-flex mint-items-center mint-justify-center mint-gap-2 mint-px-7 mint-py-2 mint-text-base mint-font-medium mint-text-gray-700 dark:mint-text-gray-300 mint-bg-white dark:mint-bg-gray-800 mint-border mint-border-gray-300 dark:mint-border-gray-600 mint-rounded-lg hover:mint-bg-gray-50 dark:hover:mint-bg-gray-700 mint-transition-all mint-duration-200">
        <span>API Reference</span>
        <span class="mint-ml-2">→</span>
      </a>
    </div>
  </div>
</div>

<div className="max-w-6xl mx-auto px-6 sm:px-8 pb-2">
  <h2 className="mint-text-2xl sm:mint-text-3xl mint-font-medium mint-text-gray-900 dark:mint-text-white mint-mb-2">
    <span data-as="p">See Nimble in Action</span>
  </h2>

  <p class="mint-text-base mint-text-gray-500 dark:mint-text-gray-400 mint-mb-4">
    <span data-as="p">
      Create a Web Search Agent for any website. Get structured, real-time data
      at scale.
    </span>
  </p>
</div>

<div class="mint-w-full mint-max-w-6xl mint-mx-auto mint-px-6 sm:mint-px-8 mint-pb-2">
  <div class="mint-w-full mint-p-6 lg:mint-p-8 mint-rounded-lg mint-border mint-border-gray-200 dark:mint-border-gray-700 mint-bg-white dark:mint-bg-transparent mint-flex mint-flex-col mint-gap-4">
    <div>
      <EndpointNav />
    </div>

    <div class="mint-flex-1 mint-rounded-xl mint-relative mint-overflow-hidden">
      <div id="ep-extract" class="ep-panel" style={{display: 'none'}}>
        Scalable data collection with stealth unblocking --> Get clean, real-time HTML and structured data from any URL

        <div class="io-grid mint-pt-8">
          <div>
            <SectionLabel sub="Target URL">
              <span style={{ color: "#edc602" }}>Input</span>
            </SectionLabel>

            <CodeGroup>
              ```python Python theme={"system"}
              from nimble_python import Nimble

              nimble = Nimble(api_key="YOUR-API-KEY")

              result = nimble.extract(
                  url= "https://www.nimbleway.com",
                  formats= ["html", "markdown"]
              )
              ```

              ```javascript Node theme={"system"}
              import Nimble from "@nimble-way/nimble-js";

              const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

              const result = await nimble.extract({
                url: "https://www.nimbleway.com",
                formats: ["html", "markdown"],
              });
              ```

              ```bash cURL theme={"system"}
              curl -X POST 'https://sdk.nimbleway.com/v1/extract' \
              --header 'Authorization: Bearer <YOUR-API-KEY>' \
              --header 'Content-Type: application/json' \
              --data-raw '{
                  "url": "https://www.nimbleway.com",
                  "formats": ["html", "markdown"]
              }'
              ```
            </CodeGroup>
          </div>

          <FlowConnector />

          <div>
            <SectionLabel sub="HTML | Markdown | Parser | Screenshots | Network Capture">
              <span style={{ color: "#edc602" }}>Output</span>
            </SectionLabel>

            ```json theme={"system"}
            {
              "url": "https://www.nimbleway.com",
              "status": "success",
              "data": {
                "html": "<!doctype html><html>...",
                "markdown": "# Nimble SDK\n...",
                "parsing": {...},
                "screenshot": [...],
                "network_capture": [...],
                ... and more
              },
              "metadata": {
                "driver": "vx8",
                ... and more
              }
            }
            ```
          </div>
        </div>

        <div class="mint-mt-2 mint-flex mint-justify-end">
          <a href="/nimble-sdk/web-tools/extract/quickstart" class="mint-text-sm mint-transition-colors" style={{ color: "#9ca3af" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#edc602")} onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>
            Explore Extract Docs →
          </a>
        </div>
      </div>

      <div id="ep-search" class="ep-panel" style={{display: 'none'}}>
        Accurate, real-time web search with --> AI Agents search the live web to retrieve precise information

        <div class="io-grid mint-pt-8">
          <div>
            <SectionLabel sub="Search Query">
              <span style={{ color: "#edc602" }}>Input</span>
            </SectionLabel>

            <CodeGroup>
              ```python Python theme={"system"}
              from nimble_python import Nimble

              nimble = Nimble(api_key="YOUR-API-KEY")

              result = nimble.search(
                  query= "latest AI developments",
                  focus= "general",
                  max_results= 5,
                  include_answer= True,
                  search_depth= "lite"
              )
              ```

              ```javascript Node theme={"system"}
              import Nimble from "@nimble-way/nimble-js";

              const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

              const result = await nimble.search({
                query: "latest AI developments",
                focus: "general",
                max_results: 5,
                include_answer: true,
                search_depth: "lite",
              });
              ```

              ```bash cURL theme={"system"}
              curl -X POST 'https://sdk.nimbleway.com/v1/search' \
              --header 'Authorization: Bearer <YOUR-API-KEY>' \
              --header 'Content-Type: application/json' \
              --data-raw '{
                  "query": "latest AI developments",
                  "focus": "general",
                  "max_results": 5,
                  "include_answer": true,
                  "search_depth": "lite"

              }'
              ```
            </CodeGroup>
          </div>

          <FlowConnector />

          <div>
            <SectionLabel sub="Search Results">
              <span style={{ color: "#edc602" }}>Output</span>
            </SectionLabel>

            ```json theme={"system"}
            {
              "status": "success",
              "query": "latest AI developments",
              "results": [
                {
                  "title": "Latest AI Developments",
                  "url": "https://example.com/ai",
                  "snippet": "Recent breakthroughs..."
                },
                ... and more
              ],
              "answer": "The latest AI developments..."
            }
            ```
          </div>
        </div>

        <div class="mint-mt-2 mint-flex mint-justify-end">
          <a href="/nimble-sdk/web-tools/search" class="mint-text-sm mint-transition-colors" style={{ color: "#9ca3af" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#edc602")} onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>
            Explore Search Docs →
          </a>
        </div>
      </div>

      <div id="ep-map" class="ep-panel" style={{display: 'none'}}>
        Fast URL discovery and site structure mapping --> Easily plan extraction workflows

        <div class="io-grid mint-pt-8">
          <div>
            <SectionLabel sub="Target URL">
              <span style={{ color: "#edc602" }}>
                <span style={{ color: "#edc602" }}>Input</span>
              </span>
            </SectionLabel>

            <CodeGroup>
              ```python Python theme={"system"}
              from nimble_python import Nimble

              nimble = Nimble(api_key="YOUR-API-KEY")

              result = nimble.map(
                  url= "https://www.nimbleway.com",
                  sitemap: "include"
              )
              ```

              ```javascript Node theme={"system"}
              import Nimble from "@nimble-way/nimble-js";

              const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

              const result = await nimble.map({
                url: "https://www.nimbleway.com",
                sitemap: "include",
              });
              ```

              ```bash cURL theme={"system"}
              curl -X POST 'https://sdk.nimbleway.com/v1/map' \
              --header 'Authorization: Bearer <YOUR-API-KEY>' \
              --header 'Content-Type: application/json' \
              --data-raw '{
                  "url": "https://www.nimbleway.com",
                  "sitemap": "include"
              }'
              ```
            </CodeGroup>
          </div>

          <FlowConnector />

          <div>
            <SectionLabel sub="List of URLs">
              <span style={{ color: "#edc602" }}>Output</span>
            </SectionLabel>

            ```json theme={"system"}
            {
              "success": true,
              "links": [
                {
                  "url": "https://www.nimbleway.com",
                  "title": "Nimble - Web Data Platform",
                  "description": "AI-powered web data collection and extraction platform"
                },
                {
                  "url": "https://www.nimbleway.com/pricing",
                  "title": "Pricing",
                  "description": "Nimble pricing plans and features"
                }
                ... and more
              ]
            }
            ```
          </div>
        </div>

        <div class="mint-mt-2 mint-flex mint-justify-end">
          <a href="/nimble-sdk/web-tools/map" class="mint-text-sm mint-transition-colors" style={{ color: "#9ca3af" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#edc602")} onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>
            Explore Map Docs →
          </a>
        </div>
      </div>

      <div id="ep-crawl" class="ep-panel" style={{display: 'none'}}>
        Extract contents from entire websites in a single request --> Collect large volumes of web data automatically

        <div class="io-grid mint-pt-8">
          <div>
            <SectionLabel sub="Target URL">
              <span style={{ color: "#edc602" }}>Input</span>
            </SectionLabel>

            <CodeGroup>
              ```python Python theme={"system"}
              from nimble_python import Nimble

              nimble = Nimble(api_key="YOUR-API-KEY")

              result = nimble.crawl.run(
                  url="https://docs.nimbleway.com/nimble-sdk",
                  limit=4
              )
              ```

              ```javascript Node theme={"system"}
              import Nimble from "@nimble-way/nimble-js";

              const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

              const result = await nimble.crawl.run({
                url: "https://docs.nimbleway.com/nimble-sdk",
                limit: 4,
              });
              ```

              ```bash cURL theme={"system"}
              curl -X POST 'https://sdk.nimbleway.com/v1/crawl' \
              --header 'Authorization: Bearer <YOUR-API-KEY>' \
              --header 'Content-Type: application/json' \
              --data-raw '{
                  "url": "https://docs.nimbleway.com/nimble-sdk",
                  "limit": 4
              }'
              ```
            </CodeGroup>
          </div>

          <FlowConnector />

          <div>
            <SectionLabel sub="List of tasks (pages) crawled">
              <span style={{ color: "#edc602" }}>Output</span>
            </SectionLabel>

            ```json theme={"system"}
            {
              "crawl_id": "85b21e98-69c5-4aa5-9d25-261a55bbf0db",
              "url": "https://docs.nimbleway.com/nimble-sdk",
              "status": "succeeded",
              "tasks": [
                {
                  "task_id": "8d2bb2fc-e469-4549-b5d8-0d307352aeb5",
                  "status": "completed",
                  "created_at": "2026-02-11T13:55:45.846Z",
                  "updated_at": "2026-02-11T13:55:52.138Z"
                },
                ... and more
              ]
            }
            ```
          </div>
        </div>

        <div class="mint-mt-2 mint-flex mint-justify-end">
          <a href="/nimble-sdk/web-tools/crawl" class="mint-text-sm mint-transition-colors" style={{ color: "#9ca3af" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#edc602")} onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>
            Explore Crawl Docs →
          </a>
        </div>
      </div>

      <div id="ep-agent" class="ep-panel">
        Web Search Agents extract structured knowledge from any website --> Pre-built agents for popular sites, or create your own in seconds

        <div class="io-grid mint-pt-8">
          <div>
            <SectionLabel sub="Agent Name + Search terms">
              <span style={{ color: "#edc602" }}>Input</span>
            </SectionLabel>

            <CodeGroup>
              ```python Python theme={"system"}
              from nimble_python import Nimble

              nimble = Nimble(api_key="YOUR-API-KEY")

              result = nimble.agent.run(
                  agent="amazon_pdp",
                  params={
                      "asin": "B0DKB1GWML"
                  }
              )
              ```

              ```javascript Node theme={"system"}
              import Nimble from "@nimble-way/nimble-js";

              const nimble = new Nimble({ apiKey: "YOUR-API-KEY" });

              const result = await nimble.agent.run({
                agent: "amazon_pdp",
                params: {
                  asin: "B0DKB1GWML",
                },
              });
              ```

              ```bash cURL theme={"system"}
              curl -X POST 'https://sdk.nimbleway.com/v1/agents/run' \
              --header 'Authorization: Bearer <YOUR-API-KEY>' \
              --header 'Content-Type: application/json' \
              --data-raw '{
                  "agent": "amazon_pdp",
                  "params": {
                      "asin": "B0DKB1GWML"
                  }
              }'
              ```
            </CodeGroup>
          </div>

          <FlowConnector />

          <div>
            <SectionLabel sub="HTML + Structured data that never breaks">
              <span style={{ color: "#edc602" }}>Output</span>
            </SectionLabel>

            ```json theme={"system"}
            {
              "url": "https://www.amazon.com/dp/B0DKB1GWML",
              "data": {
                "html": "<!doctype html><html>...",
                "parsing": {
                  "product_title": "Apple iPhone 16 Pro Max...",
                  "product_description": ".....",
                  "brand": "Apple",
                  "web_price": 819.97,
                  "availability": true,
                  ... and more
                }
              },
              "metadata":{
                "agent": "amazon_pdp",
                "driver": "wsa-6m",
                ... and more
              }
            }
            ```
          </div>
        </div>

        <div class="mint-mt-2 mint-flex mint-justify-end">
          <a href="/nimble-sdk/agentic/agents" class="mint-text-sm mint-transition-colors" style={{ color: "#9ca3af" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#edc602")} onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>
            Explore Agent Docs →
          </a>
        </div>
      </div>

      <div id="ep-proxy" class="ep-panel" style={{display: 'none'}}>
        Route requests through premium residential IPs --> Scale fast with without getting blocked

        <div class="io-grid mint-pt-8">
          <div>
            <SectionLabel sub="Connection String + Target URL">
              <span style={{ color: "#edc602" }}>Input</span>
            </SectionLabel>

            ```bash theme={"system"}
            # Proxy connection string
            PROXY=http://account-ACCOUNT-pipeline-PIPELINE-country-US:PASSWORD@ip.nimbleway.com:7000

            # Request through US residential IP
            curl -x $PROXY https://ipinfo.io/json
            ```
          </div>

          <FlowConnector />

          <div>
            <SectionLabel sub="Geolocated request from residential IP">
              <span style={{ color: "#edc602" }}>Output</span>
            </SectionLabel>

            ```json theme={"system"}
            {
              "ip": "123.0.0.123",
              "city": "Los Angeles",
              "region": "California",
              "country": "US",
              "loc": "34.0522,-118.2437",
              "org": "AS12345 Example ISP",
              "timezone": "America/Los_Angeles"
            }
            ```
          </div>
        </div>

        <div class="mint-mt-2 mint-flex mint-justify-end">
          <a href="/nimble-sdk/web-tools/proxy/quickstart" class="mint-text-sm mint-transition-colors" style={{ color: "#9ca3af" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#edc602")} onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}>
            Explore Proxy Docs →
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="mint-max-w-6xl mint-mx-auto mint-px-6 sm:mint-px-8">
  <div class="mint-py-12">
    <div class="mint-grid mint-grid-cols-2 sm:mint-grid-cols-4 mint-gap-8">
      <div>
        <h4 class="mint-text-sm mint-font-semibold mint-text-gray-900 dark:mint-text-white mint-mb-3 mint-uppercase mint-tracking-wider">
          Web Tools
        </h4>

        <ul
          style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    }}
        >
          <li>
            <a href="/nimble-sdk/web-tools/extract/quickstart" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              Extract
            </a>
          </li>

          <li>
            <a href="/nimble-sdk/web-tools/search" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              Search
            </a>
          </li>

          <li>
            <a href="/nimble-sdk/web-tools/map" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              Map
            </a>
          </li>

          <li>
            <a href="/nimble-sdk/web-tools/crawl" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              Crawl
            </a>
          </li>

          <li>
            <a href="/nimble-sdk/web-tools/proxy/quickstart" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              Proxy
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="mint-text-sm mint-font-semibold mint-text-gray-900 dark:mint-text-white mint-mb-3 mint-uppercase mint-tracking-wider">
          Get Started
        </h4>

        <ul
          style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    }}
        >
          <li>
            <a href="https://online.nimbleway.com/studio" target="_blank" rel="noopener noreferrer" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              Nimble Studio
            </a>
          </li>

          <li>
            <a href="/integrations/agent-skills/plugin-installation" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              Install Plugin
            </a>
          </li>

          <li>
            <a href="/nimble-sdk/agentic/agents" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              Search Agents
            </a>
          </li>

          <li>
            <a href="/nimble-sdk/agentic/agent-gallery" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              Agent Gallery
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="mint-text-sm mint-font-semibold mint-text-gray-900 dark:mint-text-white mint-mb-3 mint-uppercase mint-tracking-wider">
          Integrations
        </h4>

        <ul
          style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    }}
        >
          <li>
            <a href="/integrations/mcp-server/mcp-server" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              MCP Server
            </a>
          </li>

          <li>
            <a href="/integrations/connectors/langchain" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              LangChain
            </a>
          </li>

          <li>
            <a href="/integrations/agent-skills/web-tools-skills/nimble-web-expert" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              Agent Skills
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="mint-text-sm mint-font-semibold mint-text-gray-900 dark:mint-text-white mint-mb-3 mint-uppercase mint-tracking-wider">
          Resources
        </h4>

        <ul
          style={{
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    }}
        >
          <li>
            <a href="/api-reference/introduction" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              API Reference
            </a>
          </li>

          <li>
            <a href="/nimble-sdk/getting-started/installation" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              SDKs
            </a>
          </li>

          <li>
            <a href="/nimble-sdk/admin/pricing" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              Pricing
            </a>
          </li>

          <li>
            <a href="https://status.nimbleway.com/" target="_blank" rel="noopener noreferrer" class="mint-text-sm mint-text-gray-500 dark:mint-text-gray-400 hover:mint-text-[#edc602] mint-transition-colors">
              Service Status
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="mint-mt-16 mint-pt-8 mint-pb-12 mint-border-t mint-border-gray-200 dark:mint-border-gray-700">
    <div class="mint-flex mint-flex-row mint-justify-between mint-items-center">
      <div class="mint-flex mint-flex-row mint-gap-6 mint-items-center">
        <a href="https://x.com/nimble_data" target="_blank" rel="noopener noreferrer" class="mint-text-gray-400 hover:mint-text-gray-600 dark:hover:mint-text-gray-300 mint-transition-colors" aria-label="X (Twitter)">
          <svg class="mint-w-5 mint-h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        <a href="https://www.linkedin.com/company/nimbledata" target="_blank" rel="noopener noreferrer" class="mint-text-gray-400 hover:mint-text-gray-600 dark:hover:mint-text-gray-300 mint-transition-colors" aria-label="LinkedIn">
          <svg class="mint-w-5 mint-h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      <a href="https://www.nimbleway.com" target="_blank" rel="noopener noreferrer" class="mint-text-sm mint-text-gray-500 hover:mint-text-gray-700 dark:mint-text-gray-400 dark:hover:mint-text-gray-300 mint-transition-colors">
        Nimble
      </a>
    </div>
  </div>
</div>
