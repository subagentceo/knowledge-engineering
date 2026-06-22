/**
 * infra/crawler/applications.ts
 * Canonical application catalog seed — /Applications/ → AlloyDB + Redis.
 *
 * Uses canonical patterns: AlloyDB pool, ioredis cache-aside, Zod validation.
 * No hand-rolled types — all schemas from types.ts.
 *
 * Run:
 *   DEBUG=e2m:* NODE_PATH=./node_modules npx tsx infra/crawler/applications.ts
 */

import { pool }           from "../alloydb/pool.js";
import { createE2MRedis, REDIS_CONFIGS } from "../redis/client.js";
import {
  ApplicationSchema,
  TailscaleDeviceSchema,
  type Application,
  type TailscaleDevice,
} from "./types.js";
import debug from "debug";

const log = debug("e2m:applications");

// ── Redis keys ────────────────────────────────────────────────────────────────

const REDIS_KEY = {
  applications: () => `e2m:catalog:applications`,
  tailscale:    () => `e2m:catalog:tailscale_devices`,
} as const;

const TTL_MS = 6 * 60 * 60 * 1000; // 6h — apps change rarely

// ── Application registry (canonical, static seed) ────────────────────────────
// Derived from: ls /Applications/ + bundle metadata introspection 2026-06-09
// device_type and runtime are classified from LSApplicationCategoryType +
// Electron framework detection + bundle ID prefix heuristics.

const APPLICATIONS: Omit<Application, "crawledAt">[] = [
  { appName: "Air",                        appPath: "/Applications/Air.app",                        bundleId: "com.jetbrains.air",                      version: "261.681.18",           deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: "public.app-category.developer-tools",   vendor: "JetBrains",   isElectron: false },
  { appName: "Amphetamine",                appPath: "/Applications/Amphetamine.app",                bundleId: "com.if.Amphetamine",                     version: "5.3.2",                deviceType: "system_utility",      runtime: "native_macos",  lsCategory: "public.app-category.utilities",         vendor: "if.works",    isElectron: false },
  { appName: "Antigravity IDE",            appPath: "/Applications/Antigravity IDE.app",            bundleId: "com.google.antigravity-ide",             version: "2.0.4",                deviceType: "ai_assistant",        runtime: "electron",      lsCategory: "public.app-category.developer-tools",   vendor: "Google",      isElectron: true  },
  { appName: "Antigravity",               appPath: "/Applications/Antigravity.app",               bundleId: "com.google.antigravity",                version: "2.0.11",               deviceType: "ai_assistant",        runtime: "electron",      lsCategory: "public.app-category.developer-tools",   vendor: "Google",      isElectron: true  },
  { appName: "Canva",                      appPath: "/Applications/Canva.app",                      bundleId: "com.canva.canvaeditor",                  version: "1.122.1",              deviceType: "design",              runtime: "electron",      lsCategory: "public.app-category.graphics-design",   vendor: "Canva",       isElectron: true  },
  { appName: "Claude",                     appPath: "/Applications/Claude.app",                     bundleId: "com.anthropic.claudefordesktop",         version: "1.11187.4",            deviceType: "ai_assistant",        runtime: "electron",      lsCategory: "public.app-category.developer-tools",   vendor: "Anthropic",   isElectron: true  },
  { appName: "Confluence",                 appPath: "/Applications/Confluence.app",                 bundleId: undefined,                                version: undefined,              deviceType: "project_management",  runtime: "unknown",       lsCategory: undefined,                               vendor: "Atlassian",   isElectron: false },
  { appName: "Copilot",                    appPath: "/Applications/Copilot.app",                    bundleId: "com.microsoft.copilot-mac",              version: "25.6.440430001",       deviceType: "ai_assistant",        runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Microsoft",   isElectron: false },
  { appName: "Cursor",                     appPath: "/Applications/Cursor.app",                     bundleId: "com.todesktop.230313mzl4w4u92",          version: "3.7.12",               deviceType: "developer_tool",      runtime: "electron",      lsCategory: "public.app-category.developer-tools",   vendor: "Anysphere",   isElectron: true  },
  { appName: "DBeaver",                    appPath: "/Applications/DBeaver.app",                    bundleId: "org.jkiss.dbeaver.core.product",         version: "26.0.2",               deviceType: "developer_tool",      runtime: "java_jvm",      lsCategory: undefined,                               vendor: "DBeaver",     isElectron: false },
  { appName: "Developer",                  appPath: "/Applications/Developer.app",                  bundleId: "developer.apple.wwdc-Release",           version: "11.0.1",               deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: "public.app-category.reference",         vendor: "Apple",       isElectron: false },
  { appName: "Docker",                     appPath: "/Applications/Docker.app",                     bundleId: "com.docker.docker",                      version: "4.77.0",               deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: "public.app-category.developer-tools",   vendor: "Docker",      isElectron: false },
  { appName: "Dropbox",                    appPath: "/Applications/Dropbox.app",                    bundleId: "com.getdropbox.dropbox",                 version: "254.4.2518",           deviceType: "productivity",        runtime: "electron",      lsCategory: undefined,                               vendor: "Dropbox",     isElectron: true  },
  { appName: "Firefox",                    appPath: "/Applications/Firefox.app",                    bundleId: "org.mozilla.firefox",                   version: "149.0.2",              deviceType: "browser",             runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Mozilla",     isElectron: false },
  { appName: "Ghostty",                    appPath: "/Applications/Ghostty.app",                    bundleId: "com.mitchellh.ghostty",                  version: "1.3.1",                deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: "public.app-category.developer-tools",   vendor: "Mitchell Hashimoto", isElectron: false },
  { appName: "Google Chrome Dev",          appPath: "/Applications/Google Chrome Dev.app",          bundleId: "com.google.Chrome.dev",                  version: "151.0.7872.0",         deviceType: "browser",             runtime: "native_macos",  lsCategory: undefined,                               vendor: "Google",      isElectron: false },
  { appName: "Google Chrome",             appPath: "/Applications/Google Chrome.app",             bundleId: "com.google.Chrome",                     version: "148.0.7778.216",       deviceType: "browser",             runtime: "native_macos",  lsCategory: undefined,                               vendor: "Google",      isElectron: false },
  { appName: "Google Docs",               appPath: "/Applications/Google Docs.app",               bundleId: "com.google.drivefs.shortcuts.docs",     version: "126.0",                deviceType: "productivity",        runtime: "web_shortcut",  lsCategory: undefined,                               vendor: "Google",      isElectron: false },
  { appName: "Google Sheets",             appPath: "/Applications/Google Sheets.app",             bundleId: "com.google.drivefs.shortcuts.sheets",   version: "126.0",                deviceType: "productivity",        runtime: "web_shortcut",  lsCategory: undefined,                               vendor: "Google",      isElectron: false },
  { appName: "Google Slides",             appPath: "/Applications/Google Slides.app",             bundleId: "com.google.drivefs.shortcuts.slides",   version: "126.0",                deviceType: "productivity",        runtime: "web_shortcut",  lsCategory: undefined,                               vendor: "Google",      isElectron: false },
  { appName: "Helm",                       appPath: "/Applications/Helm.app",                       bundleId: "com.modumhq.Helm",                       version: "2.3",                  deviceType: "communication",       runtime: "native_macos",  lsCategory: "public.app-category.developer-tools",   vendor: "Helm",        isElectron: false },
  { appName: "Hype4",                      appPath: "/Applications/Hype4.app",                      bundleId: "com.tumult.Hype4",                       version: "4.1.20",               deviceType: "design",              runtime: "native_macos",  lsCategory: "public.app-category.graphics-design",   vendor: "Tumult",      isElectron: false },
  { appName: "JetBrains Toolbox",          appPath: "/Applications/JetBrains Toolbox.app",          bundleId: "com.jetbrains.toolbox",                  version: "3.5.0.84344",          deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: "public.app-category.developer-tools",   vendor: "JetBrains",   isElectron: false },
  { appName: "Jira",                       appPath: "/Applications/Jira.app",                       bundleId: undefined,                                version: undefined,              deviceType: "project_management",  runtime: "unknown",       lsCategory: undefined,                               vendor: "Atlassian",   isElectron: false },
  { appName: "Karabiner-Elements",         appPath: "/Applications/Karabiner-Elements.app",         bundleId: "org.pqrs.Karabiner-Elements.Settings",   version: "16.0.7",               deviceType: "system_utility",      runtime: "native_macos",  lsCategory: undefined,                               vendor: "pqrs.org",    isElectron: false },
  { appName: "Karabiner-EventViewer",      appPath: "/Applications/Karabiner-EventViewer.app",      bundleId: "org.pqrs.Karabiner-EventViewer",         version: "16.0.7",               deviceType: "system_utility",      runtime: "native_macos",  lsCategory: undefined,                               vendor: "pqrs.org",    isElectron: false },
  { appName: "Keynote",                    appPath: "/Applications/Keynote.app",                    bundleId: "com.apple.iWork.Keynote",                version: "14.4",                 deviceType: "productivity",        runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Apple",       isElectron: false },
  { appName: "Linear",                     appPath: "/Applications/Linear.app",                     bundleId: "com.linear",                             version: "1.29.5",               deviceType: "project_management",  runtime: "electron",      lsCategory: "public.app-category.developer-tools",   vendor: "Linear",      isElectron: true  },
  { appName: "Lovable",                    appPath: "/Applications/Lovable.app",                    bundleId: undefined,                                version: undefined,              deviceType: "ai_assistant",        runtime: "unknown",       lsCategory: undefined,                               vendor: "Lovable",     isElectron: false },
  { appName: "Microsoft Excel",            appPath: "/Applications/Microsoft Excel.app",            bundleId: "com.microsoft.Excel",                    version: "16.109.3",             deviceType: "productivity",        runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Microsoft",   isElectron: false },
  { appName: "Microsoft OneNote",          appPath: "/Applications/Microsoft OneNote.app",          bundleId: "com.microsoft.onenote.mac",              version: "16.109.3",             deviceType: "productivity",        runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Microsoft",   isElectron: false },
  { appName: "Microsoft Outlook",          appPath: "/Applications/Microsoft Outlook.app",          bundleId: "com.microsoft.Outlook",                  version: "16.109.3",             deviceType: "communication",       runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Microsoft",   isElectron: false },
  { appName: "Microsoft PowerPoint",       appPath: "/Applications/Microsoft PowerPoint.app",       bundleId: "com.microsoft.Powerpoint",               version: "16.109.3",             deviceType: "productivity",        runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Microsoft",   isElectron: false },
  { appName: "Microsoft Word",             appPath: "/Applications/Microsoft Word.app",             bundleId: "com.microsoft.Word",                     version: "16.109.3",             deviceType: "productivity",        runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Microsoft",   isElectron: false },
  { appName: "Numbers",                    appPath: "/Applications/Numbers.app",                    bundleId: "com.apple.iWork.Numbers",                version: "14.4",                 deviceType: "productivity",        runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Apple",       isElectron: false },
  { appName: "OneDrive",                   appPath: "/Applications/OneDrive.app",                   bundleId: "com.microsoft.OneDrive-mac",             version: "26.084.0504",          deviceType: "productivity",        runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Microsoft",   isElectron: false },
  { appName: "Pages",                      appPath: "/Applications/Pages.app",                      bundleId: "com.apple.iWork.Pages",                  version: "14.4",                 deviceType: "productivity",        runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Apple",       isElectron: false },
  { appName: "Rectangle",                  appPath: "/Applications/Rectangle.app",                  bundleId: "com.knollsoft.Rectangle",                version: "0.92",                 deviceType: "system_utility",      runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Rectangle",   isElectron: false },
  { appName: "Rev",                        appPath: "/Applications/Rev.app",                        bundleId: undefined,                                version: undefined,              deviceType: "media",               runtime: "unknown",       lsCategory: undefined,                               vendor: "Rev",         isElectron: false },
  { appName: "SQLPro Studio",              appPath: "/Applications/SQLPro Studio.app",              bundleId: "com.hankinsoft.osx.sqlprostudio",        version: "2026.114",             deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: "public.app-category.developer-tools",   vendor: "Hankinsoft",  isElectron: false },
  { appName: "Safari",                     appPath: "/Applications/Safari.app",                     bundleId: "com.apple.Safari",                       version: "26.5",                 deviceType: "browser",             runtime: "native_macos",  lsCategory: "public.app-category.productivity",      vendor: "Apple",       isElectron: false },
  { appName: "Slack",                      appPath: "/Applications/Slack.app",                      bundleId: "com.tinyspeck.slackmacgap",              version: "4.49.89",              deviceType: "communication",       runtime: "electron",      lsCategory: "public.app-category.business",          vendor: "Slack",       isElectron: true  },
  { appName: "Slack 2",                    appPath: "/Applications/Slack 2.app",                    bundleId: "com.tinyspeck.slackmacgap",              version: "4.50.128",             deviceType: "communication",       runtime: "electron",      lsCategory: "public.app-category.business",          vendor: "Slack",       isElectron: true  },
  { appName: "Stats",                      appPath: "/Applications/Stats.app",                      bundleId: "eu.exelban.Stats",                       version: "2.12.15",              deviceType: "system_utility",      runtime: "native_macos",  lsCategory: "public.app-category.utilities",         vendor: "exelban",     isElectron: false },
  { appName: "Stripe",                     appPath: "/Applications/Stripe.app",                     bundleId: undefined,                                version: undefined,              deviceType: "business",            runtime: "unknown",       lsCategory: undefined,                               vendor: "Stripe",      isElectron: false },
  { appName: "Swift Playground",           appPath: "/Applications/Swift Playground.app",           bundleId: "com.apple.PlaygroundsMac",               version: "4.7",                  deviceType: "education",           runtime: "native_macos",  lsCategory: "public.app-category.education",         vendor: "Apple",       isElectron: false },
  { appName: "Swiftify for Xcode",         appPath: "/Applications/Swiftify for Xcode.app",         bundleId: "com.Swiftify.Xcode",                     version: "6.2",                  deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: "public.app-category.developer-tools",   vendor: "Swiftify",    isElectron: false },
  { appName: "Tailscale",                  appPath: "/Applications/Tailscale.app",                  bundleId: "io.tailscale.ipn.macsys",               version: "1.98.5",               deviceType: "networking_security", runtime: "native_macos",  lsCategory: "public.app-category.utilities",         vendor: "Tailscale",   isElectron: false },
  { appName: "Telegram",                   appPath: "/Applications/Telegram.app",                   bundleId: "ru.keepcoder.Telegram",                  version: "12.6",                 deviceType: "communication",       runtime: "native_macos",  lsCategory: "public.app-category.social-networking", vendor: "Telegram",    isElectron: false },
  { appName: "Telegram 2",                 appPath: "/Applications/Telegram 2.app",                 bundleId: "ru.keepcoder.Telegram",                  version: "12.6",                 deviceType: "communication",       runtime: "native_macos",  lsCategory: "public.app-category.social-networking", vendor: "Telegram",    isElectron: false },
  { appName: "Termius",                    appPath: "/Applications/Termius.app",                    bundleId: "com.termius.mac",                        version: "9.39.0",               deviceType: "developer_tool",      runtime: "electron",      lsCategory: "public.app-category.developer-tools",   vendor: "Termius",     isElectron: true  },
  { appName: "TestFlight",                 appPath: "/Applications/TestFlight.app",                 bundleId: "com.apple.TestFlight",                   version: "4.2.0",                deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: "public.app-category.developer-tools",   vendor: "Apple",       isElectron: false },
  { appName: "Testcontainers Desktop",     appPath: "/Applications/Testcontainers Desktop.app",     bundleId: "com.atomicjar.desktop",                  version: "1.25.0",               deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: undefined,                               vendor: "AtomicJar",   isElectron: false },
  { appName: "Transporter",                appPath: "/Applications/Transporter.app",                bundleId: "com.apple.TransporterApp",               version: "1.4",                  deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: "public.app-category.utilities",         vendor: "Apple",       isElectron: false },
  { appName: "VLC",                        appPath: "/Applications/VLC.app",                        bundleId: "org.videolan.vlc",                       version: "3.0.23",               deviceType: "media",               runtime: "native_macos",  lsCategory: "public.app-category.video",             vendor: "VideoLAN",    isElectron: false },
  { appName: "Visual Studio Code",         appPath: "/Applications/Visual Studio Code.app",         bundleId: "com.microsoft.VSCode",                   version: "1.123.0",              deviceType: "developer_tool",      runtime: "electron",      lsCategory: "public.app-category.developer-tools",   vendor: "Microsoft",   isElectron: true  },
  { appName: "Visual Studio Code Insiders",appPath: "/Applications/Visual Studio Code - Insiders.app",bundleId: "com.microsoft.VSCodeInsiders",        version: "1.119.0-insider",      deviceType: "developer_tool",      runtime: "electron",      lsCategory: "public.app-category.developer-tools",   vendor: "Microsoft",   isElectron: true  },
  { appName: "WireGuard",                  appPath: "/Applications/WireGuard.app",                  bundleId: "com.wireguard.macos",                    version: "1.0.16",               deviceType: "networking_security", runtime: "native_macos",  lsCategory: "public.app-category.utilities",         vendor: "WireGuard",   isElectron: false },
  { appName: "Xcode",                      appPath: "/Applications/Xcode.app",                      bundleId: "com.apple.dt.Xcode",                     version: "26.5",                 deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: "public.app-category.developer-tools",   vendor: "Apple",       isElectron: false },
  { appName: "Zed",                        appPath: "/Applications/Zed.app",                        bundleId: "dev.zed.Zed",                            version: "1.3.6",                deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: undefined,                               vendor: "Zed",         isElectron: false },
  { appName: "Zed Preview",               appPath: "/Applications/Zed Preview.app",               bundleId: "dev.zed.Zed-Preview",                   version: "1.4.1",                deviceType: "developer_tool",      runtime: "native_macos",  lsCategory: undefined,                               vendor: "Zed",         isElectron: false },
  { appName: "claude-devtools",            appPath: "/Applications/claude-devtools.app",            bundleId: "com.claudecode.context",                 version: "0.4.7",                deviceType: "developer_tool",      runtime: "electron",      lsCategory: "public.app-category.developer-tools",   vendor: "Anthropic",   isElectron: true  },
];

// ── Tailscale device seed (from opencoworkers.org.github-devices CSV) ─────────

const TAILSCALE_DEVICES: Omit<TailscaleDevice, never>[] = [
  TailscaleDeviceSchema.parse({
    deviceName: "alexs-macbook-pro",   deviceId: "ndFkCu2h7Q11CNTRL",
    managedBy: "alex-osa@github",       creator: "alex-osa@github",
    os: "macOS",                        osVersion: "26.5.1",
    domain: "alexs-macbook-pro.tail5af6de.ts.net",
    tailscaleVersion: "1.98.5-t8f8fe6a2e-gc1619fb10",
    tailscaleIps: ["100.123.215.25", "fd7a:115c:a1e0::1237:d71a"],
    keyExpiry: "2026-12-06T01:04:53Z",  createdAt: "2026-06-06T23:04:25Z",
    tailnet: "tail5af6de.ts.net",
  }),
  TailscaleDeviceSchema.parse({
    deviceName: "desktop-ufngrm3",     deviceId: "nQ9DYGTMY321CNTRL",
    managedBy: "alex-osa@github",       creator: "alex-osa@github",
    os: "windows",                      osVersion: "10.0.26200.8524",
    domain: "desktop-ufngrm3.tail5af6de.ts.net",
    tailscaleVersion: "1.98.4-t9e69045b2-ged3a62f14",
    tailscaleIps: ["100.93.169.93", "fd7a:115c:a1e0::5337:a95f"],
    keyExpiry: "2026-12-03T23:30:03Z",  createdAt: "2026-06-06T23:30:03Z",
    tailnet: "tail5af6de.ts.net",
  }),
  TailscaleDeviceSchema.parse({
    deviceName: "ipad-gen-6",           deviceId: "n9wiRLeAVZ11CNTRL",
    managedBy: "alex-osa@github",       creator: "alex-osa@github",
    os: "iOS",                          osVersion: "17.7.11",
    domain: "ipad-gen-6.tail5af6de.ts.net",
    tailscaleVersion: "1.98.5-t8f8fe6a2e-gc1619fb10",
    tailscaleIps: ["100.77.45.39", "fd7a:115c:a1e0::b537:2d28"],
    keyExpiry: "2026-12-04T00:09:18Z",  createdAt: "2026-06-07T00:09:18Z",
    tailnet: "tail5af6de.ts.net",
  }),
  TailscaleDeviceSchema.parse({
    deviceName: "iphone-11",            deviceId: "nsi43SYEmy11CNTRL",
    managedBy: "alex-osa@github",       creator: "alex-osa@github",
    os: "iOS",                          osVersion: "18.7.8",
    domain: "iphone-11.tail5af6de.ts.net",
    tailscaleVersion: "1.98.5-t8f8fe6a2e-gc1619fb10",
    tailscaleIps: ["100.70.138.33", "fd7a:115c:a1e0::1937:8a22"],
    keyExpiry: "2026-12-04T00:08:25Z",  createdAt: "2026-06-07T00:08:25Z",
    tailnet: "tail5af6de.ts.net",
  }),
];

// ── Seed functions ────────────────────────────────────────────────────────────

async function seedApplications(redis: ReturnType<typeof createE2MRedis>): Promise<number> {
  const crawledAt = new Date().toISOString();
  const apps: Application[] = APPLICATIONS.map((a) =>
    ApplicationSchema.parse({ ...a, crawledAt }),
  );

  // Redis: store full catalog as JSON
  await redis.client.set(REDIS_KEY.applications(), JSON.stringify(apps), "PX", TTL_MS);

  // AlloyDB: upsert on (app_path) — path is the stable identity
  const client = await pool.connect();
  let upserted = 0;
  try {
    await client.query("BEGIN");
    for (const app of apps) {
      await client.query(
        `INSERT INTO fact_applications (
           app_name, app_path, bundle_id, version, min_os_version,
           device_type, runtime, ls_category, vendor, is_electron, crawled_at
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         ON CONFLICT (app_path) DO UPDATE SET
           version      = EXCLUDED.version,
           device_type  = EXCLUDED.device_type,
           runtime      = EXCLUDED.runtime,
           is_electron  = EXCLUDED.is_electron,
           crawled_at   = EXCLUDED.crawled_at`,
        [
          app.appName, app.appPath, app.bundleId ?? null,
          app.version ?? null, app.minOsVersion ?? null,
          app.deviceType, app.runtime,
          app.lsCategory ?? null, app.vendor ?? null,
          app.isElectron, app.crawledAt,
        ],
      );
      upserted++;
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  log("Applications seeded: %d", upserted);
  return upserted;
}

async function seedTailscaleDevices(redis: ReturnType<typeof createE2MRedis>): Promise<number> {
  // Redis: cache device list
  await redis.client.set(
    REDIS_KEY.tailscale(),
    JSON.stringify(TAILSCALE_DEVICES),
    "PX", TTL_MS,
  );

  const client = await pool.connect();
  let upserted = 0;
  try {
    await client.query("BEGIN");
    for (const dev of TAILSCALE_DEVICES) {
      await client.query(
        `INSERT INTO dim_tailscale_devices (
           device_name, device_id, managed_by, creator, os, os_version,
           domain, tailscale_version, tailscale_ips, key_expiry,
           created_at, last_seen, is_subnet_router, is_exit_node,
           is_ephemeral, tailscale_ssh, tailnet
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
         ON CONFLICT (device_id) DO UPDATE SET
           os_version        = EXCLUDED.os_version,
           tailscale_version = EXCLUDED.tailscale_version,
           tailscale_ips     = EXCLUDED.tailscale_ips,
           key_expiry        = EXCLUDED.key_expiry,
           last_seen         = EXCLUDED.last_seen`,
        [
          dev.deviceName, dev.deviceId, dev.managedBy ?? null, dev.creator ?? null,
          dev.os, dev.osVersion ?? null, dev.domain ?? null,
          dev.tailscaleVersion ?? null,
          dev.tailscaleIps,                 // text[] — pg driver handles JS array
          dev.keyExpiry ?? null,
          dev.createdAt, dev.lastSeen ?? null,
          dev.isSubnetRouter, dev.isExitNode,
          dev.isEphemeral, dev.tailscaleSsh,
          dev.tailnet ?? null,
        ],
      );
      upserted++;
    }
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }

  log("Tailscale devices seeded: %d", upserted);
  return upserted;
}

// ── Entry point ───────────────────────────────────────────────────────────────

export async function seedCatalog(): Promise<{ apps: number; devices: number }> {
  const redis = createE2MRedis(REDIS_CONFIGS.localDocker());
  await redis.client.connect();

  const [apps, devices] = await Promise.all([
    seedApplications(redis),
    seedTailscaleDevices(redis),
  ]);

  await redis.disconnect();
  await pool.end();
  return { apps, devices };
}

// Run directly
seedCatalog()
  .then((r) => { console.log("Seeded:", r); process.exit(0); })
  .catch((err) => { console.error(err); process.exit(1); });
