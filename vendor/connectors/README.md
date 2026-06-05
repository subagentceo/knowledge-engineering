# Claude Connectors Catalog

## What are Claude Connectors?

Claude connectors are MCP-based (Model Context Protocol) integrations that give Claude direct, permissioned access to external services and data sources. They enable Claude to read, search, create, and act within third-party platforms from a single conversation — without switching tabs or copying data between tools.

Connectors are distinct from plugins and skills:

| Concept | Description |
| --- | --- |
| **Connector** | MCP server integration giving Claude live access to a specific external service (e.g., Slack, Google Drive, HubSpot). OAuth-gated; respects the service's existing permission model. |
| **Plugin** | Packaged Claude capability installable from a marketplace (`.claude-plugin/marketplace.json`). May bundle one or more connectors plus Skills. |
| **Skill** | A prompt/workflow template that orchestrates Claude's behavior within a session. Does not call external APIs directly. |

Connectors surface on `claude.ai` (web) and in Claude Desktop via MCP server configuration. The `surface` field in `catalog.json` records which deployment a connector targets.

## Major Categories

| Category | Count | Representative Connectors |
| --- | --- | --- |
| Productivity & Collaboration | 33 | Slack, Google Drive, Notion, Airtable, Asana, Microsoft 365, Box, Calendly, ClickUp, Linear |
| Developer Tools & Data | 24 | GitLab, Vercel, Supabase, Snowflake, Databricks, Sentry, Datadog, BigQuery, PostHog, Context7 |
| CRM & Sales | 20 | HubSpot, Attio, Apollo.io, Close, Outreach, ZoomInfo, Lusha, Crossbeam, Common Room |
| Design & Creative | 19 | Adobe (Creativity, AEM, AJO, Marketing), Figma, Canva, Miro, Cloudinary, Gamma, Eraser |
| Travel & Lifestyle | 19 | Booking.com, TripAdvisor, Expedia, Uber, DoorDash, Instacart, AllTrails, Viator |
| Marketing & Automation | 18 | Braze, ActiveCampaign, Klaviyo, Customer.io, Zapier, Make, n8n, Workato, Tines |
| Financial Data & Research | 18 | PitchBook, CB Insights, Morningstar, FactSet, Moody's Analytics, S&P Global, IbisWorld |
| Analytics & Business Intelligence | 17 | Amplitude, Mixpanel, Semrush, Ahrefs, Metabase, Sigma, Hex, Thoughtspot, Monte Carlo |
| Finance & Payments | 17 | Stripe, Plaid, Brex, Mercury, Ramp, PayPal, Xero, QuickBooks, Airwallex, Razorpay |
| Life Sciences & Research | 16 | Benchling, 10x Genomics, bioRxiv, ChEMBL, PubMed, ClinicalTrials.gov, Synthesize Bio |
| Legal & Compliance | 14 | Harvey, CoCounsel, Lawve, Midpage, Ironclad, DocuSign, CourtListener, NetDocuments |
| Meeting Intelligence | 11 | Zoom, Otter.ai, Fireflies, Fathom, Grain, Granola, Fellow, Circleback, tl;dv, Krisp |
| Healthcare & Medical | 9 | AdisInsight, CMS Coverage, Healthex, NPI Registry, ICD-10, BoardWise, Cortellis |
| HR & Recruitment | 9 | Gusto, Workable, Indeed, ZipRecruiter, Dice, Udemy Business, Visier |
| Infrastructure & Security | 8 | Cloudflare, Twilio, Stytch, Clerk, Malwarebytes, GoDaddy, AWS Marketplace |
| AI & Specialized Tools | 6 | GovTribe, Clarity AI, PEEC AI, Solve Intelligence, Natoma, Lorikeet |
| Crypto & Web3 | 5 | Blockscout, Crypto.com, CoinDesk, LunarCrush, Interactive Brokers |
| Customer Success & Support | 5 | Zoho CRM, Zoho Desk, DevRev, Gainsight, Pylon |
| Knowledge Management & Search | 4 | Glean, Guru, Exa, Tavily |
| Media & Entertainment | 4 | Spotify, Audible, StubHub, Splice |
| Forms & Documents | 3 | Jotform, DocuSeal, SignNow |
| E-commerce & Web | 3 | Shopify, Wix, Webflow |
| ERP & Operations | 2 | Oracle NetSuite, CData Connect AI |
| Nonprofit & Social Impact | 1 | Blackbaud, Benevity, Candid |
| Business Applications | 44 | Various enterprise and specialized tools |

**Total: 329 connectors** as of 2026-06-05.

## catalog.json

`catalog.json` is a JSON array of 329 connector objects. Schema:

```json
{
  "id": "string",        // URL slug (matches claude.ai/connectors/<id>)
  "name": "string",      // Display name
  "category": "string",  // Category from table above
  "surface": "claude.ai" | "claude-desktop" | "both",
  "description": "string", // First-sentence description from connector page
  "source": "string"     // Relative path to the mirrored vendor page
}
```

All entries were crawled from `https://claude.ai/connectors/*` and mirrored under `vendor/claude-sitemap/connectors/`. The `source` field points to the local mirror; the live page is `https://claude.ai/connectors/<id>`.

## Full connector list

The authoritative live list is at: `https://claude.ai/connectors`

Local mirror: `vendor/claude-sitemap/connectors/` (329 `.md` files as of 2026-06-05).
