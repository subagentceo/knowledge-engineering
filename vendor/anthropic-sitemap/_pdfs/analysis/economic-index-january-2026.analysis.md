---
report: Anthropic Economic Index — January 2026 report (Economic primitives)
date: 2026-01-15
source_pdf: https://www-cdn.anthropic.com/096d94c1a91c6480806d8f24b2344c7e2a4bc666.pdf
referrer: https://www.anthropic.com/research/anthropic-economic-index-january-2026-report
kind: pdf-analysis
---

# Anthropic Economic Index — January 2026: Economic Primitives

> Fourth Anthropic Economic Index (AEI) report. Lead authors: Ruth Appel, Maxim Massenkoff, Peter McCrory (contributed equally); with Miles McCain, Ryan Heller, Tyler Neylon, Alex Tamkin. Published Jan 15, 2026. Data window: November 13–20, 2025 (pre-Opus 4.5). Classification model: Claude Sonnet 4.5.
> Bundled here with the companion research note **"Estimating AI productivity gains from Claude conversations"** (Tamkin & McCrory, Nov 5, 2025; 25p), which supplies the 1.8pp productivity baseline this report revises.

## TL;DR

The AEI introduces **five new "economic primitives"** — task complexity, human/AI skill, use case, AI autonomy, and task success — derived by having Claude (Sonnet 4.5) answer fixed questions about ~1M anonymized Claude.ai conversations and ~1M first-party (1P) API transcripts from a single week (Nov 13–20, 2025). Headline shifts since the Sept 2025 report: **augmentation retook the lead on Claude.ai (52% augmented vs. 45% automated)** after automation had briefly led in August; usage stays heavily concentrated (top 10 O*NET tasks = 24% of Claude.ai, 32% of API); coding still dominates (~34% of Claude.ai, 46% of API). The marquee new result: **incorporating task success rates roughly halves the projected aggregate productivity gain — from 1.8 to ~1.0–1.2 percentage points of annual US labor-productivity growth over the next decade.** Claude disproportionately covers *higher-education* tasks (14.4 yrs vs. economy-wide 13.2 yrs), implying a first-order **net deskilling** of many white-collar jobs if those tasks were removed. US state-level usage is converging fast (Gini 0.37 → 0.32 in one quarter; parity in ~2–5 yrs); global usage stays stubbornly uneven and GDP-pinned.

## Key findings (with stats)

1. **Augmentation flips back to dominant on Claude.ai.** Augmented share jumped **+5pp to 52%**; automated fell **−4pp to 45%** (unclassified fell 3.9% → 3.0%). Directive (a sub-mode of automation) fell **−7pp from 39% (Aug) to 32% (Nov)**. Longer arc: Jan 2025 was 56% augment / 41% automate; Aug 2025 automation briefly led (~49% vs 47%). Net multi-quarter trend still tilts toward automation despite the November reversal.
2. **Usage remains highly concentrated.** Top 10 O*NET tasks = **24% of Claude.ai** (up from 23% Aug, 21% Jan 2025) across **>3,000 unique work tasks**. Top 10 API tasks = **32%** (up from 28%). Most common task on both platforms: **"modifying software to correct errors"** — **6% of Claude.ai usage; ~1 in 10 (≈10%) API records**.
3. **Coding still dominates but is softening on consumer side.** Computer & Mathematical tasks: **~34% of Claude.ai** (down from a 40% peak in March 2025) vs **46% of 1P API** (up from 44% in Aug). Educational Instruction rose to **15% of Claude.ai** (from 9% in Jan 2025). API Office & Administrative Support rose **+3pp to 13%**.
4. **Success rate falls as tasks get harder/longer.** Claude.ai success: **70%** for sub-high-school tasks → **66%** for college-level tasks. API success: **~60%** for sub-hour tasks → **~45%** for 5h+ tasks. Effective "50% success" task horizon: **API ≈ 3.5h, Claude.ai ≈ 19h** (vs METR's 2h for Sonnet 4.5, ~5h for Opus 4.5).
5. **Productivity estimate roughly halves once reliability is priced in.** Baseline (speedup only) replicates **1.8pp/yr** for both Claude.ai and API. Discounting by task success: **1.2pp (Claude.ai), 1.0pp (API)**. Under task complementarity (CES σ=0.5): **0.7–0.9pp**; success-adjusted at σ=0.5: **0.8pp (Claude.ai), 0.6pp (API)**. At σ=1.5 (substitutes): **2.2–2.6pp**.
6. **Claude covers the higher-skill components of jobs → net deskilling.** Mean predicted education of Claude-covered tasks = **14.4 yrs** vs. economy-wide **13.2 yrs**. Removing covered tasks deskills technical writers, travel agents, teachers; *upskills* real estate / property managers.
7. **Occupation coverage rising.** Jobs with Claude used for ≥25% of their tasks: **36% (Jan 2025) → 49% (pooled)**; ~4% of jobs reach 75% task coverage. Success-weighted "effective AI coverage" reranks occupations — data entry keyers, radiologists, medical transcriptionists rise; teachers, software developers, microbiologists fall.
8. **US converging, world not.** US state AUI Gini **0.37 → 0.32** in one quarter (β̂ ≈ 0.76–0.77 OLS/WLS; 0.86–0.89 via 2SLS) → parity in **~2–5 yrs**, ~10× faster than 20th-century tech diffusion (~50 yrs). Top 5 US states = **50% of usage** but only **38% of working-age population**. Global AUI concentration essentially unchanged Aug → Nov.

## The "economic primitives" framework

Primitives are *simple, foundational measures of how Claude is used*, produced by prompting Claude as a classifier over anonymized transcripts. The report adds **five new primitives** (operationalized via **nine classifiers**) on top of the pre-existing collaboration-pattern (automation/augmentation) measure. Chain-of-thought prompting was kept for only three facets (human-time, human-with-AI-time, AI-autonomy) where it materially helped.

| Primitive | What it measures | Operationalization / sub-measures | Global avg (Claude.ai, N=999,875) |
|---|---|---|---|
| **Task complexity** | How long/hard a task is | (a) human time without AI, (b) human time with AI, (c) multitasking (multiple tasks in one convo) | Human time **3.1 h**; human+AI **15.4 min**; multitasking **9%** |
| **Human & AI skills** | Skill/expertise intensity; skill-biased substitution risk | (a) could the human have done it alone, (b) education-years to understand the human *prompt*, (c) education-years to understand the AI *response* | Human-could-do-alone **88%**; human education **12.2 yrs**; AI education **12.2 yrs** |
| **Use case** | Professional vs educational vs personal | Single classifier: work / coursework / personal | **46% work, 19% coursework, 35% personal** |
| **AI autonomy** | Degree of decision-making delegated to Claude (distinct from automation/augmentation) | 1–5 scale ("Translate this paragraph" = high automation but *low* autonomy) | **3.4 / 5** |
| **Task success** | Claude's self-assessment of whether it completed the task | Simple classifier (beat a more complex one vs human ratings) | **67%** |
| *(pre-existing)* **Collaboration pattern** | Automation vs augmentation | 5 modes: Directive, Feedback Loops (→automation); Learning, Task Iteration, Validation (→augmentation) | 45% automation / 52% augmentation |

Contrasting cluster profiles (illustrating discriminant validity):
- **Software development** (N=147,984): human time 3.3h, human education 13.8 yrs, work 64%, could-do-alone 82%, success **61%**.
- **Personal life management** (N=26,460): human time 1.8h, human education 9.1 yrs, work 17%, could-do-alone 96%, success **78%**.

Full prompt texts: online appendix at https://huggingface.co/datasets/Anthropic/EconomicIndex.

## Methodology

- **Classifier-as-Claude.** Claude Sonnet 4.5 is prompted to answer a fixed question set about each anonymized transcript; its response *is* the label (prior report used Sonnet 4 — model choice produces modest differences).
- **Privacy-preserving pipeline.** Automated system filters out any cell (country, (country,task) intersection) with <15 conversations and <5 unique accounts; bottom-up request clusters require ≥500 conversations and ≥250 accounts. Researchers only inspect transcripts where users explicitly consented (feedback transcripts) or use internal/synthetic data for API validation.
- **Aggregation.** Per-conversation estimates are aggregated to O*NET tasks by taking the **median** per task; SOC major groups roll up from there. Correlational analyses restrict to tasks with ≥100 conversations; coverage analysis uses the ≥15 privacy floor.
- **Validation (directional accuracy, not exactness).** Classifiers compared to a human researcher on consented transcripts; API classifiers on internal+synthetic data. Time-estimate self-consistency: log-scale **r = 0.89–0.93** across prompt variants. External benchmark (JIRA tickets, 1000 tasks): human devs ρ=0.50 / r_log=0.67; **Claude Sonnet 4.5 ρ=0.44 / r_log=0.46** (Sonnet 4 worse → estimates improve with capability). Claude compresses the range (overestimates short tasks, underestimates long). Human-education primitive validated against BLS bachelor's-degree share by occupation (companion Fig 2.1).
- **Productivity aggregation.** Hulten's theorem over task-level log time-savings (ln(time_without_AI) − ln(time_with_AI)), weighted by (i) Claude-estimated share of occupation time per task and (ii) occupation's share of US wage bill (OEWS May 2024). Labor share assumed 0.6 → TFP ≈ 1.08%. Reliability adjustment multiplies task speedup by task success rate before aggregating. Complementarity via two-level CES aggregator (parameter σ); diffusion via proportional-convergence regression on log AUI, estimated by OLS/WLS and 2SLS (workforce composition as instrument).

## Data sources

- **Time window:** November 13–20, 2025 (one week), just *prior to Opus 4.5 release*. (Note: the article context line says "November 2025"; the companion productivity note sampled 100k conversations from "Fall 2025.")
- **Sample size:** **1,000,000 Claude.ai** Free/Pro/Max conversations (consumer proxy) + **1,000,000 1P API** prompt-response pairs (enterprise proxy). Primitive descriptive table uses N=999,875 after filtering. Companion note used 100k Claude.ai conversations.
- **Geographies:** Country level via ISO-3166-1 (≥200 obs/country threshold; N=117 countries in education correlation); US states via ISO-3166-2 (all 50 + DC; ≥100 obs/state; N=50). Geolocation by conversation IP; VPN/anycast/hosting excluded. **Seychelles** (global) and **Wyoming** (US) excluded for abusive traffic. Working-age population from World Bank; GDP per capita external.
- **Unit of observation:** a *conversation* (Claude.ai) or a *single prompt-response pair* (API), not a user — multiple convos per user possible.

## Key metrics & numbers

| Metric | Value | Meaning |
|---|---|---|
| Augmentation share (Claude.ai, Nov 2025) | 52% (+5pp) | Collaborative use retook the lead |
| Automation share (Claude.ai, Nov 2025) | 45% (−4pp) | Delegation use receded from Aug peak |
| Directive share (Claude.ai) | 32% (−7pp from 39%) | Full-delegation mode fell |
| Top 10 task concentration (Claude.ai / API) | 24% / 32% | Usage power-law; API more concentrated |
| Most common task share | 6% (Claude.ai), ~10% (API) | "Modifying software to correct errors" |
| Computer & Math share (Claude.ai / API) | 34% / 46% | Coding dominance; ai softening, API rising |
| Global use-case split (Claude.ai) | 46% work / 19% coursework / 35% personal | Work-led but diversified |
| API use case (work) | 74% (vs 46% Claude.ai) | API is enterprise/work-centric |
| API directive | 64% (vs 32% Claude.ai) | API is automation-centric |
| Human time without AI (Claude.ai / API) | 3.1h / 1.7h | API tasks shorter/narrower |
| Human time *with* AI (Claude.ai / API) | 15 min / 5 min | Interaction depth differs |
| Task success (Claude.ai / API) | 67% / 49% | Multi-turn iteration lifts success |
| Global AI autonomy | 3.4 / 5 | Mid-range delegation |
| Human education (global avg) | 12.2 yrs | Sophistication of prompts |
| Human↔AI education correlation | r = 0.925 (countries), 0.928 (states) | "How you prompt is how Claude responds" |
| Speedup at 12 / 16 yrs education (Claude.ai) | 9× / 12× | Gains concentrate in high-human-capital tasks |
| Success at sub-HS / college (Claude.ai) | 70% / 66% | Reliability declines with complexity |
| 50%-success task horizon (API / Claude.ai) | 3.5h / 19h | vs METR 2h (Sonnet 4.5), 5h (Opus 4.5) |
| Median time savings (companion note) | 81–84% | Per-conversation speedup |
| Avg task cost handled (companion) | median ~$54 ($55 elsewhere) | Implied human-labor value per conversation |
| Productivity gain — speedup only | 1.8 pp/yr | Baseline, both platforms |
| Productivity gain — success-adjusted | 1.2pp (ai) / 1.0pp (API) | Reliability roughly halves the estimate |
| Productivity gain — CES σ=0.5 | 0.7–0.9pp (0.8/0.6 success-adj) | Bottleneck tasks bind |
| Productivity gain — CES σ=1.5 | 2.2–2.6pp | Task specialization amplifies |
| Implied TFP increase | ~1.0–1.1%/yr | Labor share 0.6 |
| Claude-covered task education | 14.4 yrs (vs 13.2 economy) | Net deskilling first-order effect |
| Occupation coverage (≥25% tasks) | 36% (Jan'25) → 49% (pooled) | Penetration rising |
| US AUI Gini | 0.37 → 0.32 (one quarter) | Rapid state convergence |
| US convergence β̂ | 0.76–0.77 (OLS/WLS); 0.86–0.89 (2SLS) | Parity in ~2–5 yrs |
| Top-5 states usage vs population | 50% usage / 38% pop | Concentration persists |
| Tech-worker elasticity | +0.36% usage per +1% C&M workers | ~⅔ of cross-state AUI variation |
| GDP elasticity (countries) | +0.7% usage per +1% GDP/cap | Global adoption GDP-pinned |
| Denmark AUI | 2.1 | ~2× expected usage for its pop share |

## Figures & tables

- **Fig 1.1** Top-10 task usage share over time by platform — concentration rising (ai 24%, API 32%).
- **Fig 1.2** Claude.ai vs API usage by SOC major group over time — coding dominance, ai softening / API rising.
- **Fig 1.3** Collaboration mode over time — Nov reversal to augmentation on Claude.ai.
- **Fig 1.4** Directive/Task-Iteration/Learning shares by SOC group — augmentation rebound broad-based.
- **Fig 1.5** Word clouds by collaboration type — Directive = create/develop/draft; Iteration = edit/rewrite/revise; Learning = help/explain/provide (privacy-preserving groupings, not raw text).
- **Fig 1.6** Lorenz/AUI concentration world vs US — US flatter (more equal) Aug→Nov; world unchanged.
- **Fig 1.7** AUI vs C&M worker share by US state — strong positive correlation (~⅔ of variance).
- **Fig 1.8** AUI Aug vs Nov across US — convergence regression (β̂≈0.76–0.89).
- **Table 2.1** The five new primitives + operationalizing prompts.
- **Fig 2.1** Human-education primitive vs BLS bachelor's-degree share — external validation.
- **Fig 2.2** Descriptive primitive stats: global vs software dev vs personal life management.
- **Fig 3.1** Share of work use globally — Balkans & Brazil highest work share; Indonesia highest coursework; NY highest work among US states.
- **Fig 3.2** GDP/cap predicts use case — work & personal rise with income; coursework falls.
- **Fig 3.3 / 3.4** AUI vs five primitives + GDP, country / US-state level.
- **Fig 3.5** Task success vs human education — negative across countries, positive (then insignificant) within US.
- **Fig 4.1** Speedup (9×→12×) and success (70%→66%) vs human years of schooling, by platform.
- **Fig 4.2** AI autonomy vs human education — ai gives more autonomy on complex tasks; API uniformly lower.
- **Fig 4.3** Task success vs human-only time — 50% crossing at API 3.5h, Claude.ai ~19h.
- **Fig 4.4** Effective AI coverage vs task coverage — high-coverage occupations fall below 45° line.
- **Fig 4.5** Education distribution: all O*NET tasks (13.2 yrs) vs Claude-covered (14.4 yrs).
- **Fig 4.6** Implied labor productivity vs CES task substitutability σ (with/without success adjustment).
- **Companion note Figs 1–10** incl. JIRA validation (ρ=0.44 vs dev 0.50), time-savings density (median 81%), per-occupation productivity contributions (software devs 19%), historical productivity trend, and prompt appendix.

## Geographic / sector breakdowns

**Global (country-level):**
- Leaders in overall Claude.ai use: **US, India, Japan, UK, South Korea**.
- **Denmark AUI = 2.1** (~2× expected for population share).
- **+1% GDP/cap → +0.7% usage/cap.** GDP "largely accounts for" cross-country variation.
- **Use case by income:** work & personal use rise with GDP/cap; **coursework falls** (highest in lowest-GDP countries). **Indonesia** highest coursework share; **Balkans & Brazil** highest work share. Converges with Microsoft's finding (AI-for-school ↔ lower income; AI-for-leisure ↔ higher income). Anthropic ties this to its **Rwanda/ALX** AI-literacy + Claude Pro pilot.
- Country-level: higher usage correlates with *shorter* tasks and *less* AI autonomy (i.e., more collaboration); **task success negatively** associated with human education cross-country (educated populations attempt harder tasks).

**United States (state-level):**
- **Top-5 states = 50% of usage, 38% of working-age population.**
- High-AUI states: **Washington D.C., Virginia, Washington** — driven by Computer & Mathematical worker share (**+1% tech workers → +0.36% usage**, ~⅔ of variance). Lower KL-divergence from global Claude usage distribution → higher usage.
- **New York** highest relative work use.
- Convergence: **Gini 0.37 → 0.32** in one quarter; β̂ 0.76–0.89; **parity in ~2–5 yrs** (~10× faster than 20th-c. tech, which took ~50 yrs — Kalanyi et al. 2025).
- Within-US, income is a *weaker* predictor than workforce composition; human-education association vanishes after controlling for GDP/other primitives; task success **positively** related to education (but insignificant with controls) — opposite sign to the cross-country pattern.

**Sector / occupation (companion + main):**
- Highest human-time tasks: Management 2.0h, Legal 1.8h, Education 1.7h, Arts/Media 1.6h; lowest: food prep / installation / transport 0.3–0.5h.
- Avg task cost: Management $133, Legal $119, C&M $82, Business/Financial $69, food prep $8.
- Productivity contribution: **Software developers 19%**, General/Operations Managers ~6%, Market Research/Marketing 5%, Customer Service 4%, Secondary Teachers 3%. Restaurants/healthcare/construction/retail contribute little (few tasks in sample).
- Effective-coverage risers: data entry keyers, radiologists, medical transcriptionists, database architects. Fallers: teachers, software developers, microbiologists.

## Limitations & caveats

- **Model estimates, not ground truth.** Claude's time/skill/success labels are imperfect, compressed in range, prone to overestimate; no real-world validation of time estimates beyond the JIRA software domain. Sonnet 4.5 vs Sonnet 4 changes some labels.
- **No post-conversation work captured.** Time spent validating/refining Claude's output outside the chat window is invisible → time savings likely **overstated**. RCTs have found smaller or even negative savings (56%, 40%, 26%, 14%, negative).
- **Selection bias.** Users bring tasks they expect to succeed → observed success rates **overstate** true capability on the full task distribution; more capable models may not move the success-vs-horizon plot if users respond by bringing harder tasks. The 19h Claude.ai horizon reflects multi-turn course-correction + selection, not a clean capability comparison to METR.
- **API = single prompt-response pairs only** (no session linkage) — not directly comparable to multi-turn Claude.ai.
- **Primitives are not causal.** GDP/education may be proxies; US-state education effect disappears under controls. Correlations differ by level of aggregation (country vs state) and can flip sign.
- **Snapshot / short window.** One week of data; diffusion estimates rest on a single 3-month comparison and "cannot rule out much slower rates."
- **O*NET taxonomy is coarse.** Tacit knowledge, relationships, judgment, task interdependencies under-captured; an end-to-end software RCT found no time savings.
- **Deskilling is a first-order accounting exercise**, not a prediction — labor markets may dynamically adjust; education ≠ Autor-Thompson "expertise."
- **Productivity figure is an exploratory "if universally adopted with current models" scenario, not a forecast**; assumes static capabilities (explicitly unlikely) → possibly a lower bound; ignores org restructuring and innovation/automation-of-science channels. Pre-Opus 4.5.
- **Data limited to Claude.ai + 1P API**; not representative of all AI use; rare tasks under-sampled. Geographies excluded (Seychelles, Wyoming, sanctioned regions, VPN traffic).

## Policy & economic implications

- **Reliability, not raw speed, gates productivity.** Pricing in task success roughly halves the macro estimate (1.8 → ~1.0–1.2pp). Even the conservative ~1.0pp would return US labor-productivity growth to late-1990s/early-2000s rates — economically significant, but the headline 1.8pp is fragile to bottleneck (complementarity) and reliability assumptions (range 0.6–2.6pp across scenarios).
- **Skill-biased / net-deskilling risk.** Claude covers the *higher-education* tasks within jobs (14.4 vs 13.2 yrs). First-order removal deskills technical writers, travel agents, teachers; upskills property/real-estate managers. But because Claude *struggles most* on the most complex tasks, the effect could instead **reinforce the value of expert human oversight** rather than displace experts.
- **Human capital is the binding constraint, especially abroad.** Near-perfect human↔AI education correlation (r≈0.93) means prompt sophistication drives output quality → "expanding access alone will not suffice; developing human capital, particularly in lower-income economies, is essential." Educational use in poorer countries may seed future AI-complementary skills (Rwanda/ALX pilot).
- **Inequality / convergence.** US states converging fast; global usage GDP-pinned and not converging → AI could **widen** international gaps even as it narrows domestic ones. Effects "mediated by existing institutional structures rather than unfolding uniformly."
- **Bottleneck economics.** Per Gans & Goldfarb (2026), partial automation can *raise* labor income on the non-automatable bottleneck tasks until a job is fully automated — complicating simple displacement narratives.
- **Leading indicator for policymakers/researchers.** The released primitives + first-ever global/regional breakdowns are positioned as an empirical foundation for AI policy; tasks "graduating" from Claude.ai chat to API deployment is flagged as a future signal of real economic impact.

## Notable quotes (verbatim)

1. "Data from November 2025 points to a broad-based shift back toward augmented use on Claude.ai: The share of conversations classified as augmented jumped 5pp to 52% and the share deemed automated fell 4pp to 45%."
2. "Adjusting productivity estimates for task reliability roughly halves the implied gains, from 1.8 to about 1.0 percentage points of annual labor productivity growth over the next decade."
3. "The mean predicted education for tasks in the economy is 13.2 years. For tasks that we see in our data, the mean prediction is about a year higher, 14.4 years... Overall, the net first-order impact is to deskill jobs, since AI removes tasks that require relatively higher levels of education."
4. "METR's benchmark suggests that Claude Sonnet 4.5... achieves 50% success rates on tasks of 2 hours. By contrast, our own API data finds that Claude is 50% successful at tasks that take nearly twice as long (around 3.5 hours), and on Claude.ai, the duration is vastly longer still—around 19 hours."
5. "For AI to benefit users globally, expanding access alone will not suffice—developing the human capital that enables effective use, particularly in lower-income economies, is essential."

## Open questions / what to watch

- **Opus 4.5 effect.** All data predates Opus 4.5. Watch whether success rates, autonomy, and effective task horizons jump in the next report — and whether selection bias masks the gain.
- **Reliability trajectory.** If task success rises with model capability, the success-adjusted productivity gap (1.0–1.2pp) should close back toward (or above) 1.8pp. Track the success-vs-horizon curve.
- **Bottleneck σ.** The true elasticity of substitution across tasks is unknown but swings the macro estimate from 0.6pp to 2.6pp — the single biggest source of uncertainty.
- **Chat → API graduation.** Tasks migrating from Claude.ai to API would signal automatability/business adoption maturing; an explicit forward indicator.
- **Diffusion durability.** US convergence rests on one quarter; will the Gini keep falling 0.05/qtr, or stall? Global convergence absent — does it ever start?
- **Deskill vs. expert-complement.** Whether removed high-education tasks displace experts or amplify the value of their oversight — depends on real-world task complementarity, not yet measured.
- **Real-world displacement mapping.** Whether Claude.ai conversations actually substitute for human work (clear for data entry; unclear for a teacher's lecture). 1P API production-workflow data is the proposed next probe.
- **Validation depth.** Time estimates validated only in software (JIRA); broader-domain ground truth still missing.
