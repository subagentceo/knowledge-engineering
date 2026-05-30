---
report: "Coding agents in the social sciences"
date: 2026-05-27
source_pdf:
  - vendor/anthropic-sitemap/_pdfs/403415e54964751190003985896630e56829e797.md
referrer: https://www.anthropic.com/research/coding-agents-social-sciences
kind: pdf-analysis
---

# Coding agents in the social sciences

Authors: Thomas Lyttelton (MIT), Maxim Massenkoff (Anthropic), and Nathan Wilmers (MIT). Published May 27, 2026. The PDF analyzed here is the technical **Appendix** (6 pages) to the blog post; the article body supplies the headline results. This is the baseline wave of a larger ongoing study (the "Work, Frontier, Lab" / WFL Baseline Survey) that includes a randomized experiment granting researchers Claude Code access.

## TL;DR

A survey of 1,260 quantitative social scientists (US/Canada R1 universities) finds that while 81% have tried AI chatbots in research, only **20% regularly use coding agents** like Claude Code. Adoption is sharply unequal — twice as high among researchers with typically male names, and 40% higher at top-25 universities. Coding-agent users report more early-pipeline output (project starts, working papers, grant proposals) but **no more journal submissions**, and researchers are markedly more optimistic about AI's effect on their own paper productivity than about its effect on the social sciences as a field.

## Key findings (with stats)

- **81%** of respondents have used genAI in research; only **20%** regularly (>1×/week) use a command-line coding agent.
- Among coding-agent users, **86%** use Claude Code (next: Codex at 31%).
- **Gender gap:** typically-male-named researchers adopt coding agents at **>2x** the rate of typically-female-named ones; gap persists within discipline/career stage and even among those who have tried AI.
- **Institution gap:** top-25 universities ~**40% more likely** to use coding agents; 28% of respondents are from top-25 institutions.
- **Discipline gradient:** economists **39%**, political scientists **25%**, down to single digits — public health **6%**, education **4%**, communication **6%**.
- **Career-stage gradient:** just over a quarter of doctoral students/postdocs use coding agents weekly; among tenured professors the rate falls by more than half.
- **Use cases:** **97%** of coding-agent users (and 77% of other AI users) use AI to generate analysis code; editing prose next; only ~1/3 of all AI users have ever used it to draft prose.
- **Output (adjusted):** coding-agent users start ~0.25 more projects and post ~0.5 more working papers; range **~10% (projects started) to ~75% (working papers posted)** more productive than peers — but **no** increase in journal submissions/resubmissions.
- **Beliefs:** on a 1–10 productivity slider, **88%** scored above 5 and half scored ≥8; **70%** are more optimistic about paper productivity than about broader field impact. All inter-group adoption differences significant at **p < 0.05**.

## Methodology (experimental / survey setup)

- **Design:** baseline (pre-treatment) wave of a planned randomized experiment. The experiment itself (Claude Code access vs control, measuring research productivity) is **ongoing and not reported here**; this report is purely descriptive/cross-sectional.
- **Field window:** February 20 – March 24, 2026 (article says "late February and March"). A separate smaller **pilot** ran early February.
- **Recruitment (five channels):** (1) scraped faculty/student contacts from sociology, political science, management, economics, psychology, education, and public health departments at R1 + major Canadian research universities; (2) OpenAlex to find research-active social scientists (published within last year); (3) academic conference programs; (4) directors of graduate studies distributing to grad students; (5) scholarly-community lists (Academy of Management, American Sociological Association). **44,700 academics directly emailed.**
- **Screener:** restricted to US/Canada researchers actively doing quantitative empirical work; doctoral students required ≥2 years training completed and intent to enter academia.
- **Incentives:** $10 gift card for completion; eligibility for a randomized experiment providing Claude Max account access (a stated source of selection bias).
- **Analytic sample:** 1,260 respondents who passed the screener and completed the full survey.
- **Adjusted output model (Figure 5b):** OLS, `Output_i = β·CodingAgentUser_i + γ·X_i + ε_i`, where X = fixed effects for career stage (5 categories: PhD student, postdoc, assistant/associate/full professor), discipline bucket (9 categories), and survey-completion calendar week; heteroskedasticity-robust SEs; β divided by control-group outcome mean to express percent differences. Poisson spec gives similar results.
- **Classification:** discipline collapsed from 318 free-text values into 8 buckets + "Other" (mix of Claude classification and hand coding); gender inferred from first name via the `gender_guesser` Python library (male/mostly_male → "typically male"; unknown/androgynous dropped); institutions ranked via Nature Index 2025 Leading Institutions (top 25).
- **Selection check:** results compared against the early-February pilot, which used a generic "research workflows" invitation with **no** AI-experiment advertising, to gauge selection-into-experiment bias (Table A2).

## Data sources

- **Sample size:** 1,260 (analytic); 44,700 directly emailed; pilot sample smaller (size not specified).
- **Population:** active quantitative empirical social scientists at R1 US + major Canadian universities.
- **Demographics:** discipline (~1/5 each economics, political science, sociology; management & psychology close behind; smaller public health, education, communications). Career stage: ~40% full/associate professors, ~25% assistant professors, ~30% doctoral students. Gender via name inference. 28% from top-25 institutions.
- **Time period:** survey Feb 20 – Mar 24, 2026; output measures self-reported over the prior six months.
- **Geographies:** United States and Canada only.

## Key metrics & numbers

| Metric | Value |
|---|---|
| Analytic sample | 1,260 |
| Academics emailed | 44,700 |
| Tried genAI in research | 81% |
| Regular coding-agent use | 20% |
| Claude Code share among agent users | 86% |
| Codex share among agent users | 31% |
| Male-name vs female-name adoption | >2x |
| Top-25 university uplift | ~40% |
| From top-25 institutions | 28% |
| Economists using agents | 39% |
| Political scientists | 25% |
| Public health / education / communication | 6% / 4% / 6% |
| Code generation (agent users) | 97% |
| Code generation (other AI users) | 77% |
| Adjusted output uplift range | ~10% to ~75% |
| Productivity slider >5 | 88% |
| Productivity slider ≥8 | ~50% |
| More optimistic on productivity than field | 70% |

## Figures & tables

- **Figure 1** — Coding-agent use by discipline (economists/political scientists highest).
- **Figure 2** — Adoption by career stage (AI use vs coding-agent use series).
- **Figure 3** — Adoption disparities by career stage, sex, university tier (all p<0.05).
- **Figure 4** — Use cases (code vs edit vs draft) by agent-user status and by discipline.
- **Figure 5 / 5b** — Research-output differences (adjusted), 95% CIs.
- **Figure 6** — Beliefs: paper productivity vs field impact (10-point sliders).
- **Figure A1** (appendix) — *Unadjusted* output differences (agent users post more working papers, submit more grants, but submit fewer journal papers; * p<0.05, ** p<0.01).
- **Table A1** — Sample by career stage × discipline.
- **Table A2** — Main vs pilot sample comparison (selection-bias check).

## Limitations & caveats

- **Non-representative, self-selected sample** recruited explicitly for a Claude-access study — respondents likely heavier AI users and more optimistic than non-responders.
- **Descriptive, not causal** — coding-agent users self-select; early adopters may already have been more productive/different in unmeasured ways. No adjustment can fix selection.
- **Quantity, not quality** — only counts of projects/papers; nothing about output quality (future updates promise content comparison vs a clean comparison group).
- **CLI-only agent definition** — survey ran ~1 month after Claude Cowork release and before OpenAI's Codex app, so the question targeted command-line tools; researchers using agents only via desktop apps are uncounted.
- **Name-based gender inference** drops androgynous/unknown names and is imperfect.
- Output differences could reflect submission timelines (agent use is recent) rather than a true journal-submission ceiling.

## Policy & economic implications

- **Inequality of adoption** is steeper for coding agents than for general LLM use — concentrating in men, juniors, and elite institutions. If coding agents materially boost research output, this could widen existing resource and prestige gaps in academia.
- **Field-level externality concern:** the productivity/field-impact optimism gap (70% more bullish on their own output than on the discipline) signals researcher fear of congestion in the scholarly record, overloaded peer review, and amplified selective/incremental research ("academic AI slop").
- Coding agents help most at the **front of the research pipeline** (starting projects, working papers, grants), not the **last mile** (journal submission) — implying near-term effects on the volume and pace of preliminary work rather than on the certified literature.
- AI's "distinctive analytical choices" increasingly mediate how the economy and society are studied — a methodological-governance question for the social sciences.

## Notable quotes

1. *"for the first time, core research tasks can be handed off to machines."*
2. *"fast research execution should mean cheap and plentiful discovery."* (the optimistic case for agents)
3. *"Only 20% of respondents use coding agents… even among interested respondents who self-selected into our survey, only ⅕ had adopted agents into their workflow."*
4. *"those with typically male names have adopted coding agents at more than twice the rate of respondents with typically female names."*
5. *"coding agents are more useful at getting projects up and running than they are at the last mile of perfecting a paper for journal submission."*

## Open questions

- Will the forthcoming **randomized experiment** show a causal productivity effect, separating early-adopter selection from the tool itself?
- Does coding-agent-augmented work differ in **content/quality**, not just quantity?
- Will the early-pipeline surge (working papers, grants) eventually convert into journal submissions, or is there a genuine last-mile ceiling?
- Does the steep gender and institution gap narrow as tools diffuse, or does early-period inequality persist/compound?
- Pilot size and full Table A1/A2 magnitudes are not specified in the extracted text — what are the exact discipline × career-stage cell counts?
