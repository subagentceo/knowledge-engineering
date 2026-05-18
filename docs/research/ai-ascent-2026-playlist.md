# AI Ascent 2026 — Sequoia Capital playlist

Source: https://www.youtube.com/playlist?list=PLOhHNjZItNnOkkZThzULo1Ygg7JR6T3MG
Fetched 2026-05-17 via Claude in Chrome (`mcp__claude-in-chrome__javascript_tool`).
13 videos, total runtime ≈ 4h 31m.

## Index

| # | Title | Video ID | Duration | Watch URL |
|---|---|---|---|---|
| 1 | This is AGI: Sequoia AI Ascent 2026 Keynote | `LRo33rnv6rQ` | 32:27 | https://youtu.be/LRo33rnv6rQ |
| 2 | Robotics' End Game: Nvidia's Jim Fan | `3Y8aq_ofEVs` | 20:03 | https://youtu.be/3Y8aq_ofEVs |
| 3 | OpenAI's Greg Brockman: Why Human Attention Is the New Bottleneck | `bBS93A0BeNI` | 28:27 | https://youtu.be/bBS93A0BeNI |
| 4 | Demis Hassabis: We're Three Quarters of the Way to AGI | `AFpeWo1GTeg` | 26:52 | https://youtu.be/AFpeWo1GTeg |
| 5 | Waymo's Dmitri Dolgov: 20 Million Rides and the Road to Full Autonomy | `I_0Kuf6Aa2c` | 27:16 | https://youtu.be/I_0Kuf6Aa2c |
| 6 | Andrej Karpathy: From Vibe Coding to Agentic Engineering | `96jN2OCOfLs` | 29:49 | https://youtu.be/96jN2OCOfLs |
| 7 | Starcloud's Philip Johnston: Why the Cheapest Compute Will Be in Space | `94b6i5jI1nE` | 11:52 | https://youtu.be/94b6i5jI1nE |
| 8 | Why AI Should Design the Chips That Power AI: Ricursive Intelligence | `K05Dh-QjM8c` | 10:38 | https://youtu.be/K05Dh-QjM8c |
| 9 | Inside the Rise of Autonomous AI Hackers: XBOW's Oege de Moor | `eHsr1Fl2jNA` | 9:02 | https://youtu.be/eHsr1Fl2jNA |
| 10 | ElevenLabs' Mati Staniszewski: How Voice Becomes the Interface for AI | `ZNzYN2jyVTU` | 26:16 | https://youtu.be/ZNzYN2jyVTU |
| 11 | Anthropic's Boris Cherny: Why Coding Is Solved, and What Comes Next | `SlGRN8jh2RI` | 24:36 | https://youtu.be/SlGRN8jh2RI |
| 12 | Why Data Is the Real AI Bottleneck: Flapping Airplanes' Ben and Asher Spector | `ZBpY7MEra9w` | 9:27 | https://youtu.be/ZBpY7MEra9w |
| 13 | Why the Brain Computes 1,000,000x More Efficiently Than A GPU: Unconventional AI's Naveen Rao | `Zw1J5pJJMGw` | 14:13 | https://youtu.be/Zw1J5pJJMGw |

## Notes

- Video #11 (Boris Cherny) is the source the operator referenced earlier in the
  session: "hundreds of agents during the day and thousands at night to 100%
  write his code." Its transcript should be prioritized for grounding the
  chassis's multi-agent posture (managed-agents-strategy adoption work, OMA1).
- Video #6 (Karpathy "Vibe Coding → Agentic Engineering") and #3 (Brockman
  "Human Attention Is the New Bottleneck") are adjacent thematically; consider
  cross-referencing in the ADR.

## Recommended transcript extraction tool

Per the research agent (2026-05-17), use **`youtube-caption-extractor`**
(v1.9.1, actively maintained, dual-extraction strategy, Workers-compatible,
scraping-based so no `YOUTUBE_DATA_API_V3_KEY` needed).

Fallback per-video if it fails: **`youtubei.js`** v17.0.1
(`Innertube.create()` → `getInfo(id).getTranscript()`).

Avoid: `youtube-captions-scraper` (broken since June 2025).

Example invocation:

```ts
import { getSubtitles, getVideoDetails } from "youtube-caption-extractor";

const videoIDs = [
  "LRo33rnv6rQ", "3Y8aq_ofEVs", "bBS93A0BeNI", "AFpeWo1GTeg",
  "I_0Kuf6Aa2c", "96jN2OCOfLs", "94b6i5jI1nE", "K05Dh-QjM8c",
  "eHsr1Fl2jNA", "ZNzYN2jyVTU", "SlGRN8jh2RI", "ZBpY7MEra9w",
  "Zw1J5pJJMGw",
];

for (const videoID of videoIDs) {
  const [subs, meta] = await Promise.all([
    getSubtitles({ videoID, lang: "en" }),
    getVideoDetails({ videoID }),
  ]);
  // subs: [{ start, dur, text }, …]
  // meta.title, meta.description
}
```

Risk note: scraping from datacenter IPs (CI, Workers in some POPs) triggers
YouTube bot-detection more aggressively than residential. For a one-off
13-video batch, run locally.
