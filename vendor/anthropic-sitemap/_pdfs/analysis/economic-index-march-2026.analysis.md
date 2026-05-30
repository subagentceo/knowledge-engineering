---
report: Anthropic Economic Index — March 2026 report (Learning curves)
date: 2026-03-24
source_pdf: https://cdn.sanity.io/files/4zrzovbb/website/4053bf3440c0c85b8852052770c5b4cf882689c3.pdf
referrer: https://www.anthropic.com/research/economic-index-march-2026-report
kind: pdf-analysis
---

# Anthropic Economic Index — Learning curves (March 2026)

## TL;DR

The fifth Anthropic Economic Index report studies Claude usage in February 2026 (Feb 5–12 sample), three months after Claude Opus 4.5 and coincident with Opus 4.6. Two stories: (1) Claude.ai usage **diversified and shifted slightly lower-value** (top-10 task concentration 24%→19%; average task wage $49.3→$47.9/hr), while coding migrated to the 1P API (which concentrated, 28%→33%); (2) a new "learning curves" analysis shows **higher-tenure users (6+ months) succeed more, collaborate more, and bring harder, more work-related tasks** — a ~4pp higher success rate that survives full controls, read as evidence of learning-by-doing rather than just selection. The headline policy worry: this is a channel for **skill-biased technological change**, where early high-skill adopters compound their advantage.

## Key findings (with stats)

- **Claude.ai diversified.** Top-10 O*NET task concentration fell from **24% (Nov 2025) to 19% (Feb 2026)**. 1P API concentration rose from **28% to 33%** since Aug 2025 (roughly flat across the immediate period despite coding influx).
- **Use-case mix shifted.** Coursework **19%→12%**; personal **35%→42%**; work shown as **46%→45%** (Figure 1.2). Management occupations in Claude.ai **3%→5%**.
- **Average task value dropped on Claude.ai.** Volume-weighted mean wage **$49.3→$47.9/hr** (vs US avg hourly wage $37.3). 1P API rose to **$50.7**. (Figure 1.4 series: Jan'25 $49.3, ... Feb'26 Claude.ai $47.9, API $50.7.)
- **Augmentation rose slightly** in Claude.ai (driven by validation + learning); automation **fell sharply in the 1P API** (Appendix Fig A.3). Claude.ai augmentation reached **53%** / automation **47%** in Feb 2026 (Fig 1.3 latest pair).
- **Model selection tracks task value.** Among paid Claude.ai users, 51% of overall usage is Opus; **55% of Computer & Mathematical tasks** use Opus (+4.4pp), vs **45% of Educational** (−6.5pp). Opus is +4pp for coding, −7pp for tutoring vs average. Slope: **+1.5pp Opus per +$10/hr task wage** on Claude.ai, **+2.8pp** on the API (~2× steeper).
- **Tenure → success.** Raw effect **~5pp** higher success for high-tenure (6+ month) users; **~3pp** with task/cluster fixed effects; **~4pp** with full controls (model, use case, country FE).
- **49% of jobs** have seen at least a quarter of their tasks performed using Claude (essentially unchanged).
- **Coverage of occupations:** Computer & Mathematical tasks = **35%** of Claude.ai conversations. Since Aug 2025, this category's share **+14% in the API, −18% in Claude.ai**.

## What "learning curves" means here (the core concept + how measured)

"Learning curves" = whether and how a user's effectiveness with Claude improves with **tenure** (time since signup). The report tests learning-by-doing: do experienced users get better at extracting value? It is measured two ways:

1. **Tenure cohorts** — "high tenure" = signed up ≥6 months before the data pull; "low tenure" = everyone else. Cross-tabulated against collaboration mode, use case, success rate, task concentration, and education-year primitives (Table 2.1).
2. **Log-level regressions** — a binary success outcome regressed on a high-tenure indicator with increasingly stringent controls: (1) raw, (2) + O*NET-task & request-cluster fixed effects, (3) + model, use-case, and country fixed effects (Figure 2.4). The persistence of a positive coefficient under within-task fixed effects is the evidence that the effect is not merely task-mix selection.

Success itself is "Claude's assessment of whether the conversation was successful" (a primitive defined in the prior report).

## Methodology (builds on the Jan economic-primitives framework — note what's new vs prior)

- Builds directly on the **economic-primitives framework introduced in the previous report** (published Jan 2026, using Nov 2025 data). Privacy-preserving aggregation; no individual transcripts revealed.
- **Five interaction types** (directive, feedback loop, task iteration, validation, learning) → two categories (automation, augmentation). Carried over from prior reports.
- **Economic Primitives** (Table A.1): human/AI education years, task complexity (human time, human-with-AI time), multitasking, AI autonomy (1–5), task success, use case (work/coursework/personal), human-ability-to-complete-alone.
- **New in this report:** first analysis of **model selection** (Opus share by task/occupation/wage) and **tenure/learning curves with log-level regression and fixed effects**. The report explicitly says it "analyzed model selection and success for the first time."
- **O*NET vintage change:** this report uses **2019 O*NET-SOC codes**; prior reports used the 2010 vintage (a methodological discontinuity to note when comparing occupational shares).
- Wage/task-value source: **May 2024 BLS OEWS Tables**, employment- and time-weighted averaging.
- Log-level analysis applies minimum aggregate thresholds on unique accounts and conversations; cells failing privacy requirements are dropped before estimation.

## Data sources (February 2026 usage data per the article; sample, geographies)

- **Sample window:** February 5–12, 2026.
- **Two 1M samples:** 1M Claude.ai conversations (Free/Pro/Max — "consumer data") + 1M first-party (1P) API transcripts ("enterprise data," includes Claude Code). Each 1P record is a prompt-response pair, sometimes mid-session.
- **Geographies:** US states (Anthropic Usage Index, AUI, population-adjusted) and countries. Top-20-country and top-state concentration tracked over time.
- **Context:** three months after Claude Opus 4.5 release; coincident with Opus 4.6 release. Sampling overlapped Anthropic's **Super Bowl ad**, which brought many first-time (low-tenure) users.
- **Open data:** https://huggingface.co/datasets/Anthropic/EconomicIndex

## Key metrics & numbers (table)

| Metric | Nov 2025 | Feb 2026 | Δ |
|---|---|---|---|
| Top-10 task concentration, Claude.ai | 24% | 19% | −5pp |
| Top-10 task concentration, 1P API (since Aug'25 28%) | — | 33% | +5pp vs Aug'25 |
| Coursework share, Claude.ai | 19% | 12% | −7pp |
| Personal share, Claude.ai | 35% (Fig: 35%) | 42% | +7pp |
| Work share, Claude.ai (Fig 1.2) | 46% | 45% | −1pp |
| Management occupations, Claude.ai | 3% | 5% | +2pp |
| Avg task value, Claude.ai | $49.3/hr | $47.9/hr | −$1.4 |
| Avg task value, 1P API | ~$50.5 (Nov) | $50.7/hr | rising |
| Human education years (input) | 12.21 | 11.92 | −0.29 |
| AI autonomy (1–5) | 3.38 | 3.41 | +0.02 |
| Human time (min) | 185.53 | 183.77 | −1.76 |
| Human + AI time (min) | 15.35 | 14.30 | −1.05 |
| Human can't do alone (%) | 12.09 | 12.24 | +0.15 |
| Top-20 countries' share of per-capita usage | 45% | 48% | +3pp |
| Top-10 states' share of usage | 40% | 38% | −2pp |
| Top-5 states' share (Aug'25 30%) | — | 24% | −6pp vs Aug'25 |

US states Gini: Aug'25 **0.37** → Nov'25 **0.31** → Feb'26 **0.29** (converging). Countries Gini: Aug'25 **0.48** → Nov'25 **0.46** → Feb'26 **0.50** (diverging).

**Tenure table (Table 2.1), low vs high tenure:**

| Primitive | Low tenure | High tenure | Δ |
|---|---|---|---|
| Directive | 38.1% | 29.4% | −8.7pp |
| Feedback loop | 11.7% | 12.1% | +0.5pp |
| Task iteration | 24.5% | 28.2% | +3.6pp |
| Validation | 4.4% | 5.6% | +1.3pp |
| Learning | 21.3% | 24.7% | +3.4pp |
| Work | 41.6% | 48.9% | +7.3pp |
| Personal | 44.3% | 40.3% | −4.0pp |
| Coursework | 14.1% | 10.8% | −3.3pp |
| Task success rate | 66.7% | 73.1% | +6.4pp |
| Top-10 tasks' share | 22.2% | 20.7% | −1.6pp |
| AI autonomy (1–5) | 3.42 | 3.40 | −0.6% |
| Human education (yr) | 11.5 | 12.3 | +6.6% |
| AI education (yr) | 11.7 | 12.4 | +6.0% |

(Note: page 15 of the main PDF contains a stray editorial annotation — "It gets rounded to 3.4 and 3.4. Needs to be 3.42 and 3.40" — an un-removed production comment on the AI-autonomy row.)

## Figures & tables (list + finding)

- **Figure 1.1** — Top-10 task concentration over time by platform. Claude.ai diverging down (24→19%), API up (to 33%).
- **Figure 1.2** — Work/personal/coursework composition. Personal ↑, coursework ↓.
- **Figure 1.3** — Collaboration mode share, Claude.ai. Augmentation rose to 53%.
- **Figure 1.4** — Average task value over time. Claude.ai $49.3→$47.9; API rising to $50.7; US avg $37.3.
- **Figure 1.5** — Geographic convergence (Lorenz curves). States converging, countries diverging.
- **Table 1.1** — Changes in key primitives (Nov vs Feb); all p<0.001 except human-only time p<0.05.
- **Figure 2.1** — Opus share by occupational domain (Computer & Math +4.4pp, Educational −6.5pp).
- **Figure 2.2** — Opus share vs occupation wage. Slopes +1.48pp (Claude.ai) / +2.79pp (API) per $10/hr.
- **Table 2.1** — High vs low tenure differences (see above).
- **Figure 2.3** — Tenure vs education years (left, ↑ ~1 yr per yr of usage) and personal use (right, 44%→38%).
- **Figure 2.4** — Tenure→success regression (~5pp raw → ~3pp +task FE → ~4pp full controls, 95% CIs).
- **Appendix Fig A.1** — Usage-share shifts across occupational categories by platform.
- **Appendix Fig A.2** — Cumulative job coverage (25/50/75% thresholds); ~49% of jobs at ≥25%.
- **Appendix Fig A.3** — Collaboration mode share, 1P API (automation fell sharply).
- **Table A.1** — Economic Primitives definitions/overview.

## Trends over time (any deltas vs prior Economic Index reports — quote the comparison)

- Concentration series (Claude.ai): "21%, 24%, 23%, 24%, 19%" across Jan'25→Feb'26; API "28%, ..., 33%."
- Task value: "dropped slightly from $49.3 to $47.9" on Claude.ai; "rising among API users."
- "Since August 2025, 1P API usage has become more concentrated, with the top 10 O*NET tasks now accounting for 33% of traffic, up from 28%."
- "Computer and Mathematical... the share of tasks in this category has increased by 14% in the API and decreased by 18% in Claude.ai" since Aug 2025.
- Convergence slowdown (quoted): "at this rate states would arrive at roughly equal usage per capita in **5–9 years, rather than 2–5**."
- Direct reversal of a prior hypothesis: "This pushes back against a hypothesis we made last year that automated use may be more typical of more experienced, sophisticated users; instead, we find that the most advanced users are more likely to iterate with Claude."

## Limitations & caveats

- **Survivorship bias:** "We do not observe people who signed up a year ago but are no longer using Claude" — surviving high-tenure users may be self-selecting on positive results.
- **Cohort/selection effects:** high-tenure users are self-selected (e.g., programmer early adopters); differences may reflect stable traits, not learning. Fixed effects rule out *simple* confounds (task mix) but not all.
- **O*NET vintage discontinuity** (2019 vs 2010 codes) complicates cross-report occupational comparisons.
- **Academic-calendar confound:** coursework drop partly mechanical (winter break — 12pp drop in break countries vs 5pp where term active).
- **Super Bowl ad** injected a wave of casual, low-tenure users into the sample, mechanically shifting mix toward personal/low-value.
- **Task value is a proxy** (US OEWS wages), not realized economic value; "not broadly representative of the US economy."
- Success is **Claude's own self-assessment** of conversation success — a model-graded, not human-graded, measure.

## Policy & economic implications

- **Skill-biased technological change channel identified:** "early adopters with high-skill tasks have more successful interactions with Claude than later, less technical adopters." If complementary skills are acquired through use and self-reinforcing, early-adopter benefits compound — potentially deepening labor-market inequality.
- **Dual exposure:** early high-skill adopters "may simultaneously be the most exposed to AI-driven disruption and most aided by AI in these initial, augmentative waves."
- **Global adoption gap persisting/widening** at the country level (Gini 0.46→0.50) even as US states converge — a geographic-equity concern for policymakers.
- **Migration to API signals labor-market transformation:** tasks moving from Claude.ai (augmentative) to API (automated/directive) "may signal more imminent transformation of work" for affected occupations (e.g., Customer Service Representatives).
- **Emerging automation clusters** (≥2× growth): business sales/outreach automation and automated trading/market ops — sectors to watch for near-term automation exposure.

## Notable quotes (3–5 verbatim)

1. "Most strikingly, people in this higher-tenure group have a 10% higher success rate in their conversations, an association that is not explained by their task selection, country of origin, or other factors."
2. "The more time one spends using AI, the more effective one becomes at harnessing it."
3. "Our analysis in this report identifies a channel through which such skill-biased transformation may already be unfolding: early adopters with high-skill tasks have more successful interactions with Claude than later, less technical adopters."
4. "This pushes back against a hypothesis we made last year that automated use may be more typical of more experienced, sophisticated users; instead, we find that the most advanced users are more likely to iterate with Claude."
5. "Overall, Claude is used for high-value, complex work that is not broadly representative of the US economy. But as the user base has grown, less remunerated tasks have become a slightly larger share of traffic."

## Open questions / what to watch

- Can Anthropic **cleanly separate learning-by-doing from cohort/survivorship bias** over time? (Stated as a future goal.)
- Will the **country-level divergence** (Gini rising) continue or reverse as adoption broadens globally?
- Does the **Claude.ai→API migration of coding** continue, and does it presage automation/displacement in Computer & Mathematical occupations?
- Will the **task-value decline on Claude.ai** continue as consumer adoption broadens, and how does it diverge from the rising API task value?
- How durable is the **+4pp tenure success premium** as the userbase matures and onboarding improves — does the gap narrow (learning democratizes) or widen (compounding advantage)?
- Whether emerging automation clusters (sales outreach, trading/market ops) scale into measurable occupational disruption in subsequent reports.
