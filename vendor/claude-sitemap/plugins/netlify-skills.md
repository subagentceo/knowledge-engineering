# Netlify Skills

Provides comprehensive Netlify platform knowledge directly in Claude Code. This plugin bundles 12 factual, up-to-date skill references covering the full Netlify ecosystem — serverless functions, edge functions, Blobs object storage, managed Postgres (Netlify DB), Image CDN, forms, caching, configuration, CLI and deployment, framework adapters, and AI Gateway. Each skill is loaded on demand when relevant, giving Claude precise guidance on modern Netlify patterns, APIs, and best practices.

Skills cover practical details like the modern function syntax (`export default async (req, context)`), Drizzle ORM setup for Netlify DB, edge function middleware with Deno runtime, CDN cache control, image transformation URLs, `netlify.toml` configuration, and deployment workflows. The plugin emphasizes current Netlify conventions — v2 functions, `Netlify.env.get()` for environment variables, and framework-aware adapters for Vite, Astro, Next.js, and TanStack.

**How to use:** Once installed, the skills activate automatically when you're working on Netlify projects. Ask Claude to help with any Netlify feature and it will draw on the relevant skill. Example prompts:

- _"Create a serverless function that handles POST requests at /api/submit"_
- _"Set up Netlify DB with Drizzle ORM and create a users table"_
- _"Add an edge function for geolocation-based redirects"_
- _"Configure image CDN transforms for responsive thumbnails"_
- _"Set up caching headers and CDN purging for my API routes"_
- _"Deploy my site with the Netlify CLI and set up environment variables"_
- _"Route AI requests through the Netlify AI Gateway"_
