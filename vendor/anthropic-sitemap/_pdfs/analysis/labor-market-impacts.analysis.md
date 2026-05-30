---
report: Labor market impacts of AI: A new measure and early evidence
date: 2026-03-05
source_pdf: https://cdn.sanity.io/files/4zrzovbb/website/2b5bbaf2c1eb81dbf6e6fb813c1a24e35a64d376.pdf
referrer: https://www.anthropic.com/research/labor-market-impacts
kind: pdf-analysis
---

# Labor market impacts of AI: A new measure and early evidence

Authors: Maxim Massenkoff and Peter McCrory (Anthropic Economic Research). Published March 5, 2026; main note 17 pages + 11-page appendix. A correction was issued March 8, 2026 (Figure 7 quartile/zero-exposure inflow labels were reversed).

## TL;DR

- The paper introduces **observed exposure**, a new occupation-level AI-displacement measure that intersects _theoretical_ LLM capability (Eloundou et al. 2023 β scores) with _actual_ Claude usage from the Anthropic Economic Index, up-weighting work-related, automated, and API uses.
- The headline empirical fact is a large **capability-vs-usage gap**: AI is "far from reaching its theoretical capability." Even in the most exposed broad category (Computer & Math), Claude covers only **33%** of tasks against a theoretical ceiling of **94%**.
- Higher observed exposure correlates weakly but meaningfully with **lower BLS-projected 2024–2034 job growth** (−0.6 pp growth per +10 pp coverage); the raw Eloundou β measure shows _no_ such correlation, which the authors treat as validation of the new measure.
- Using the Current Population Survey, they find **no statistically significant rise in unemployment** for highly exposed workers since ChatGPT (late 2022). The one suggestive signal: a **~14% drop in the monthly job-finding rate for workers aged 22–25** entering exposed occupations post-ChatGPT (barely significant; no effect for those over 25).
- Most exposed workers are demographically distinct — more female, more white/Asian, more educated, and earn **47% more** on average — making this a white-collar exposure story, not a blue-collar one.

## Key findings

- **Capability >> usage.** Tasks rated β=1 (fully feasible for an LLM alone) account for **68%** of observed Claude usage; β=0 (not feasible) tasks account for just **3%**. 97% of observed tasks fall in feasible categories (β=0.5 or 1.0). (Figure 1)
- **Computer & Math:** theoretical β coverage **94%**, observed exposure only **33%**. Office & Admin theoretical β **90%**. (Figure 2)
- **Top exposed occupation: Computer Programmers at 75% coverage**, followed by Customer Service Representatives (rising in first-party API traffic) and Data Entry Keyers at **67%**. Financial Analysts also cited among most exposed. (Figure 3)
- **30% of workers have zero coverage** (tasks too infrequent to meet the gate) — e.g., Cooks, Motorcycle Mechanics, Lifeguards, Bartenders, Dishwashers, Dressing Room Attendants.
- **BLS validation:** weighted occupation-level regression → **every +10 pp coverage = −0.6 pp** in BLS projected 2024–2034 employment growth. No analogous correlation for the Eloundou β measure alone. (Figure 4)
- **Worker characteristics (Aug–Oct 2022 pre-ChatGPT baseline, CPS):** top-quartile-exposed vs zero-exposure group is **+16 pp more likely female**, **+11 pp more likely white**, **~2× more likely Asian**, earns **47% more**. Graduate degrees: **4.5%** of the unexposed group vs **17.4%** of the most exposed group (~4× difference). (Figure 5)
- **Unemployment:** the post-ChatGPT change in the exposed-vs-unexposed unemployment gap is "small and insignificant" / "indistinguishable from zero." During COVID the _less_-exposed (more in-person) group saw the larger unemployment spike. (Figure 6)
- **Young-worker hiring signal:** job-finding rate for 22–25-year-olds entering low-exposure occupations holds steady at **~2%/month**; entry into the most exposed jobs falls by **~0.5 pp**, a **14% relative drop** vs 2022 (barely statistically significant). No such effect for workers >25. (Figure 7) Echoes Brynjolfsson et al.'s reported **6–16% employment fall** for ages 22–25 in exposed occupations.

## Methodology (the new measure: "observed exposure")

**Definition.** Observed exposure asks: _of those tasks an LLM could theoretically speed up, which are actually seeing automated usage in professional settings?_ It is an occupation-level coverage score built bottom-up from tasks.

**Task-level construction (Appendix).** For each O*NET task *t\*:

1. **Theoretical gate (β).** Use Eloundou et al. (2023) β ∈ {0, 0.5, 1}. The paper sets β to **1 if β > 0** — i.e., any task that is theoretically doable with an LLM (alone, or with tools like web search / image recognition) is "upgraded." Rationale: today's LLMs largely have the tool capabilities that β=0.5 originally assumed; whether they actually help is captured downstream by usage.
2. **Usage gate.** A task counts as _covered_ only if it sees sufficient **work-related** traffic in the Economic Index (Handa et al. 2025). The hard gate: **WorkUsage_t ≥ 100 counts, or 0.0025% of traffic**; below that, exposure = 0. Work-related transcripts are isolated via the "use case primitive" from Appel et al. (2026), excluding educational and personal use. API (1P) traffic is counted regardless of work/personal classification because API calls signal production integration.
3. **Automation weighting (α).** α_t up-weights tasks with more automative use. A task with only augmentative use and no API traffic gets **α = 0.5**; a task with only automative use gets **α = 1.0**. So fully automated implementations receive full weight, augmentative use receives half weight.
4. **Shared-task handling.** Identical/near-identical O\*NET tasks (e.g., a teacher-evaluation task shared by ten K-12 teacher types) are grouped and the task count is split across jobs by employment share / semantic similarity.

**Aggregation.** Task-level exposure r̃*t is averaged to the occupation level weighted by **w_t = fraction of time spent on task t** (time-fraction estimates from Tamkin & McCrory 2025). Occupation scores are then averaged to broad categories weighted by **total employment**. The job-level number is "loosely the share of a job being performed or accelerated by an LLM," but the automation weighting means it is **not a pure percentage** — a 0.10 gap between two jobs could mean a 10 pp higher share-of-day covered \_or* a 20 pp higher automation share.

**Worked example (Appendix).** "Identify, compile, abstract, and code patient data…" (Health Information Technologists) — ~13% of their time, >2,000 observations (passes the gate), β=0.5, α=0.96 (>90% of usage is 1P API) → contributes strongly to that occupation's high coverage.

**Robustness.** Spearman (rank-rank) correlations across measurement choices are "exceedingly high." Raw Claude.ai usage vs baseline = **0.81**; raw usage vs Eloundou β = **0.72**; incorporating success rate correlates with the success-free version at **r=0.999** (success is not occupation-correlated, so it is dropped). IWA/semantic-similarity grouping vs the main grouping = **0.9**.

**Identification of effects.** Treated = top quartile of time-weighted task coverage; control = bottom (the ~30% zero-exposure group). Outcomes estimated via **difference-in-differences** around the ChatGPT release (late 2022), with the percentile cutoff varied from median to 95th as a sensitivity check.

## Data sources

- **O\*NET database** — ~**800 unique US occupations**, ~**18,000 task statements** (also 2,087 DWAs / 332 IWAs of coarser grouping).
- **Anthropic Economic Index usage data** — the paper text cites the **previous four** Economic Index reports for Figure 1; the methodology uses the **previous two** Economic Index datasets, covering usage from **August and November 2025** (footnote 5). Appendix footnote 3 sizes this as **~2M conversations from Claude.ai + ~2M from 1P API** (so usage of 100 = 0.0025% of traffic; median task time-share is 0.0014%). Note: the appendix elsewhere references "August and September" data for the use-case primitive imputation — minor internal inconsistency in the month labels; treat Aug + a later-2025 month as the window.
- **Eloundou et al. (2023)** β task-exposure ratings ("GPTs are GPTs"), reflecting LLM capability as of early 2023.
- **Current Population Survey (CPS)** — unemployment, demographics, hiring panel; pre-ChatGPT baseline window **Aug–Oct 2022**; unemployment trends shown since **2016**. O\*NET-SOC → occ1990 crosswalk from Eckhart/Goldschlag (2025).
- **BLS Employment Projections** — 2025 vintage, covering **2024–2034** for every occupation.
- **Department of Labor UI claims** — ETA 203 "Characteristics of the insured unemployed," aggregated at state-quarter level into major SOC groups (robustness check).
- **Data availability:** task- and job-level coverage published at https://huggingface.co/datasets/Anthropic/EconomicIndex.

## Key metrics & numbers

| Metric                                           | Value                                    | What it means                                  |
| ------------------------------------------------ | ---------------------------------------- | ---------------------------------------------- |
| Claude usage on β=1 tasks                        | 68%                                      | Most real usage is on fully-LLM-feasible tasks |
| Claude usage on β=0 tasks                        | 3%                                       | Almost no usage on infeasible tasks            |
| Observed tasks in feasible categories (β≥0.5)    | 97%                                      | Usage tracks theoretical capability closely    |
| Computer & Math: theoretical β                   | 94%                                      | Theoretical ceiling                            |
| Computer & Math: observed exposure               | 33%                                      | Actual coverage — the capability/usage gap     |
| Office & Admin: theoretical β                    | 90%                                      | Theoretical ceiling                            |
| Top occupation (Computer Programmers) coverage   | 75%                                      | Most exposed occupation                        |
| Data Entry Keyers coverage                       | 67%                                      | High-automation example                        |
| Workers with zero coverage                       | 30%                                      | Control / unexposed group                      |
| BLS growth sensitivity                           | −0.6 pp per +10 pp coverage              | Higher exposure → weaker projected growth      |
| Female (exposed vs unexposed)                    | +16 pp                                   | Exposed skew female                            |
| White (exposed vs unexposed)                     | +11 pp                                   | Exposed skew white                             |
| Asian (exposed vs unexposed)                     | ~2×                                      | Exposed skew Asian                             |
| Earnings premium (exposed)                       | +47%                                     | Exposed are higher-paid                        |
| Graduate degrees: unexposed                      | 4.5%                                     | Education baseline                             |
| Graduate degrees: most exposed                   | 17.4%                                    | ~4× more graduate-degreed                      |
| Usage gate                                       | WorkUsage ≥ 100 (0.0025% of traffic)     | Task inclusion threshold                       |
| α (augment-only, no API)                         | 0.5                                      | Half weight                                    |
| α (automation-only)                              | 1.0                                      | Full weight                                    |
| Young (22–25) job-finding drop, exposed          | ~14% (≈ −0.5 pp from ~2%/mo)             | Barely significant hiring slowdown             |
| Brynjolfsson et al. young-worker employment fall | 6–16%                                    | External corroboration (ADP data)              |
| Detectable differential unemployment effect      | ~1 pp                                    | Sensitivity floor of the design                |
| Hypothetical: top-10% all laid off               | top-quartile UE 3%→43%; aggregate 4%→13% | Scale calibration                              |
| Hypothetical: white-collar Great Recession       | top-quartile UE 3%→6%                    | Detectable scenario                            |
| Spearman: raw usage vs baseline                  | 0.81                                     | Measure robustness                             |
| Spearman: success-incl. vs baseline              | 0.999                                    | Success rate dropped as non-informative        |

## Figures & tables

- **Figure 1 — Share of Claude usage by Eloundou β rating.** β=1 tasks = 68% of usage; β=0 = 3%; 97% of usage is on β≥0.5 tasks. Usage and theoretical capability are highly correlated.
- **Figure 2 — Theoretical capability (blue) vs observed exposure (red) by occupational category.** Visualizes the capability/usage gap; Computer & Math 94% theoretical vs 33% observed.
- **Figure 3 — Most exposed occupations (top 10).** Computer Programmers 75% (top), Customer Service Reps, Data Entry Keyers 67%; Financial Analysts among them.
- **Figure 4 — BLS projected growth 2024–2034 vs observed exposure.** 25-bin binned scatter, employment-weighted linear fit; slope −0.6 pp per +10 pp coverage. No correlation for Eloundou β alone.
- **Figure 5 — High vs low exposure worker characteristics (CPS).** Demographics, education, earnings: +16 pp female, +11 pp white, ~2× Asian, +47% earnings, graduate degrees 4.5%→17.4%.
- **Figure 6 — Unemployment rate trends since 2016, top-quartile exposure vs zero exposure.** Upper: raw rates (less-exposed spiked harder in COVID). Lower: DiD gap — small, insignificant post-ChatGPT.
- **Figure 7 — New job starts (ages 22–25), high- vs no-exposure occupations.** Series diverge in 2024; low-exposure stable ~2%/mo, exposed down ~0.5 pp; 14% relative post-ChatGPT drop. (Corrected Mar 8, 2026 — labels had been reversed.)
- **Appendix Figure 1 — Young (22–25) unemployment trends, high vs no exposure.** Gap roughly constant; pooled DiD negative and indistinguishable from zero.
- **Appendix Figure 2 — Sensitivity to percentile cutoff (median → 95th).** Impact stays small and insignificant across cutoffs.
- **Appendix Figure 3 — Main results using UI claims to measure unemployment.** Pooled post-ChatGPT estimate +0.1 pp, insignificant. Bottom UI quartile = 1% avg coverage vs top = 31%; four high-exposure categories: Computer & Mathematical, Office & Admin Support, Business & Financial, Sales.
- **Appendix Figure 4 — Spearman correlation heatmap across exposure measure variants** (baseline, raw Claude.ai usage, Eloundou β time-frac/coreweight, ridge-imputed, DWA-level, IWA-level, success-gated).

## Limitations & caveats

- **No causal claim of impact** — the paper explicitly finds "limited evidence that AI has affected employment to date"; the framework is designed to be _re-run_ as data accrue, not to detect effects that haven't emerged.
- **Detection floor ~1 pp** — only differential unemployment increases of roughly 1 pp would be detectable with current data; a parallel rise across all workers would _not_ be attributed to AI.
- **Young-worker signal is fragile** — the 14% job-finding drop is "just barely statistically significant"; alternative explanations (workers staying put, switching jobs, returning to school) and survey mismeasurement of job transitions (Fujita et al. 2024) are flagged.
- **Usage data is Claude-only** and time-limited (two/four Economic Index windows in 2025); not representative of all AI usage; future updates expected to shift the picture.
- **Eloundou β is stale** — anchored to early-2023 LLM capabilities; the paper notes it should be updated.
- **O\*NET task granularity is arbitrary** — identically-described-but-generic tasks can look more exposed; DWA/IWA aggregation either over-groups dissimilar work or cleaves identical tasks; the chosen grouping is a judgment call (Spearman 0.9 vs alternatives).
- **Measure is not a clean percentage** — automation weighting blends "share of day covered" and "automation share."
- **UI-claims robustness check is coarse** — aggregated to major SOC groups, so exposure measurement is less precise and the exposed/unexposed gap is mechanically smaller.
- **Many judgment calls** acknowledged (gate threshold, β coding, automation up-weighting); defended via high Spearman stability rather than a single ground truth.
- **Track-record humility** — opens by noting offshorability (~¼ of jobs flagged, most grew anyway), weak government forecasts, and contradictory robot/China-shock literatures.

## Policy implications

- **Establish the baseline before the shock.** The central policy argument is methodological: lay rigorous groundwork _now_, before effects are visible, so future disruption is separable from business-cycle and trade-policy noise (AI is framed as "more like the internet or trade with China" than COVID).
- **Unemployment is the priority outcome** for policy triggers — it most directly signals economic harm (a worker who wants a job and lacks one). Declines in job postings for one role may be offset by openings in another, so postings alone shouldn't drive policy response.
- **Watch young labor-market entrants first.** The one early signal is slowed hiring of 22–25-year-olds into exposed occupations — a leading indicator that may not surface in unemployment stats (entrants without a listed occupation may exit the labor force instead).
- **Exposure is a white-collar, higher-education, higher-pay phenomenon** — distributional and reskilling policy should target educated, higher-paid, more-female occupations, inverting the typical automation-anxiety frame.
- **Re-runnable framework** — outputs are published on Hugging Face and intended for periodic re-estimation and extension to other countries/usage datasets.

## Notable quotes

- "We introduce a new measure of AI displacement risk, observed exposure, that combines theoretical LLM capability and real-world usage data, weighting automated (rather than augmentative) and work-related uses more heavily." (Key findings, p. 2)
- "AI is far from reaching its theoretical capabilities. For instance, Claude currently covers just 33% of all tasks in the Computer & Math category." (p. 7)
- "For every 10 percentage point increase in coverage, the BLS's growth projection drops by 0.6 percentage points… Interestingly, there is no such correlation using the Eloundou et al. measure alone." (p. 9)
- "The average change in the gap since the release of ChatGPT is small and insignificant, suggesting that the unemployment rate of the more exposed group has increased slightly but the effect is indistinguishable from zero." (p. 11)
- "The averaged estimate in the post-ChatGPT era is a 14% drop in the job finding rate compared to that in 2022 in the exposed occupations, although this is just barely statistically significant. (There is no such decrease for workers older than 25.)" (p. 13)
- "This framework is most useful when the effects are ambiguous—and could help identify the most vulnerable jobs before displacement is visible." (p. 3)

## Open questions / what to watch

- **Will the red area close the blue?** As capability/adoption/deployment deepen, does observed exposure climb toward the theoretical β ceiling — and does the BLS-growth correlation strengthen from its current slight −0.6 pp/10 pp?
- **Recent graduates in exposed fields** — the authors' named next step: track how graduates with credentials in exposed areas navigate the labor market (the young-worker hiring signal is the live thread).
- **Does the 22–25 hiring slowdown harden into significance** as more post-2024 CPS panel data arrives, or wash out as measurement noise?
- **Updated β** — re-estimating Eloundou-style theoretical exposure against current (not early-2023) LLM capability could materially shift both the gap and rankings.
- **Cross-country / multi-platform extension** — the method is built to ingest other usage datasets and other nations' task taxonomies.
- **Threshold/treatment definition** — whether an absolute coverage threshold (vs top-quartile) becomes the better treatment definition as low percentiles also reach high coverage (the O-ring vs mean-exposure debate: Gans & Goldfarb 2025, Hampole et al. 2025, Autor & Thompson 2025).
- **Will the 1-pp detection floor catch a "white-collar Great Recession"?** The authors argue a doubling of top-quartile unemployment (3%→6%) would be visible — the next data vintages test that claim.
