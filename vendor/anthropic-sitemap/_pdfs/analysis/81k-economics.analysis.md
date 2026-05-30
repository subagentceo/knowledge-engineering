---
report: "What 81,000 people told us about the economics of AI"
date: 2026-04-22
source_pdf:
  - vendor/anthropic-sitemap/_pdfs/3a8d990bc90098038eabd77b0d12ff636ed58d50.md
  - vendor/anthropic-sitemap/_pdfs/a42bc3fc08283562f08fd8bdee8f6f9a3d506e87.md
referrer: https://www.anthropic.com/research/81k-economics
kind: pdf-analysis
---

# What 81,000 people told us about the economics of AI

Authors: Maxim Massenkoff and Saffron Huang (Anthropic Economic Research). Published April 22, 2026. Analysis draws on the main 15-page blog PDF plus the companion 17-page methodology paper "Labor market impacts of AI: A new measure and early evidence" (Massenkoff and McCrory, March 5, 2026), which defines the `observed exposure` measure this survey correlates against.

## TL;DR

A survey of 81,000 Claude.ai personal-account users (80,508 acknowledged) asked open-ended questions about hopes and fears around AI. Using Claude-powered classifiers to infer occupation, career stage, productivity, and sentiment from free-text answers, the study finds that economic anxiety tracks real usage: people in occupations where Claude is observed doing more work (higher "observed exposure") worry more about displacement. Productivity gains are concentrated at the top and bottom of the wage distribution and come most often from expanded **scope** (doing new tasks), and the workers reporting the largest speedups are also the most anxious about their jobs.

## Key findings (with stats)

- **~20% (one fifth)** of respondents voiced concern about economic displacement.
- Perceived job threat rises with observed exposure: **+1.3 percentage points of perceived threat per 10-point increase in exposure**. Top-25%-exposure workers mentioned the worry **~3x as often** as bottom-25%.
- **Early-career respondents** were much more likely than senior workers to express displacement concern (career stage inferred for ~half of respondents).
- Mean self-reported **productivity rating = 5.1 on a 1–7 scale** ("substantially more productive").
- **~3%** reported negative or neutral productivity impact; **42%** gave no clear productivity indication.
- Productivity gains split by wage: highest- and lowest-paid occupations report the largest gains (U-ish by wage quartile); management occupations (mostly solopreneurs) top the per-group ranking, followed by computer & math; scientific and legal professions show the mildest gains.
- Productivity gain **type**: **48%** of users who mentioned productivity cited **scope** (new capabilities); **40%** cited **speed**.
- Beneficiary of gains (named in ~25% of interviews): most cited benefits **to themselves**; **10%** said employers/clients extracted more work; smaller shares cited AI companies or net-negative.
- Self-benefit by career stage: only **60%** of early-career workers said they personally benefited vs **80%** of senior professionals.
- Speedup vs job threat is **U-shaped**: those who said AI _slowed_ them down (often creative workers) AND those reporting the largest speedups both report elevated threat.

## Methodology (survey design)

- **Instrument:** "Anthropic Interviewer" embedded in Claude.ai — an open-ended, conversational survey rather than a fixed-choice questionnaire. First question: _"What's the last thing you used an AI chatbot for?"_ Subsequent questions probed visions and fears around AI advances.
- **N = 81,000** Claude users (80,508 thanked in acknowledgements); same underlying data as the companion "What 81,000 people want from AI" study, with this report adding new Claude-classifier-derived variables.
- **Derived variables via Claude-powered classifiers**, not direct questions:
  - _Occupation:_ left missing for **61%** of respondents; **39%** labeled (11% explicitly stated their job, 28% inferred from context). Robustness check: key results (Figures 1 and 3) hold on the 11% explicit-only subset.
  - _Career stage:_ inferred for ~50% of respondents (buckets: student_or_entry, junior, mid, senior_or_lead, executive, unclear).
  - _Productivity:_ rescaled 1–7 (1 = less productive, 2 = no change … 7 = transformatively more productive). Note the scale is **not centered** — original Likert answers clustered at 6s and 7s.
  - _Productivity type:_ one of speed / quality / scope / cost / not_discussed.
  - _Job-threat coding:_ respondent coded as threatened if they said their role was already being replaced/substantially reduced or likely to be soon.
- **Exposure measure** ("observed exposure") imported from the companion paper: O\*NET (~800 occupations) × Anthropic Economic Index usage × Eloundou et al. (2023) theoretical β capability, weighting automated and work-related uses more heavily; aggregated to occupation level by time-fraction.
- Example classifier prompts are reproduced in the Appendix (productivity-dimension prompt and career-stage prompt).

## Data sources

- **Sample size:** 81,000 respondents (80,508 acknowledged).
- **Population:** active **personal-account** Claude.ai users who chose to respond to the in-product survey. Enterprise users excluded.
- **Demographics:** not directly collected; occupation (39% labeled), career stage (~50% labeled), and wage (via BLS occupational median wage by quartile) are _inferred_. No direct age, gender, race, or income capture in this report.
- **Time period:** not specified in the PDF for the survey field window (companion exposure data uses Anthropic Economic Index reports from Aug & Nov 2025 usage).
- **Geographies:** not specified (companion labor-market paper is US-focused via the Current Population Survey; this survey's geography is not stated).

## Key metrics & numbers

| Metric                                      | Value                            |
| ------------------------------------------- | -------------------------------- |
| Respondents                                 | 81,000 (80,508 acknowledged)     |
| Voiced displacement concern                 | ~20%                             |
| Perceived threat per +10pp exposure         | +1.3 pp                          |
| Top vs bottom exposure quartile worry ratio | ~3x                              |
| Mean productivity rating (1–7)              | 5.1                              |
| Negative/neutral productivity               | ~3%                              |
| No clear productivity indication            | 42%                              |
| Productivity gain = scope                   | 48%                              |
| Productivity gain = speed                   | 40%                              |
| Interviews naming a beneficiary             | ~25%                             |
| Said employer/client got more work          | 10%                              |
| Early-career self-benefit                   | 60%                              |
| Senior self-benefit                         | 80%                              |
| Occupation labeled (any)                    | 39% (11% explicit, 28% inferred) |
| Occupation missing                          | 61%                              |
| Career stage inferable                      | ~50%                             |

## Figures & tables

- **Figure 1** — Perceived job threat from AI vs Observed Exposure (scatter by occupation, linear fit; green line).
- **Figure 2** — Concern about economic displacement by career stage.
- **Figure 3** — Inferred productivity gain by occupation: left panel by BLS median-wage quartile, right panel by major occupational group (95% CI error bars).
- **Figure 4** — Where the surplus from AI productivity goes (share by beneficiary, among those naming one).
- **Figure 5** — Type of productivity gain reported (scope / speed / quality / cost shares).
- **Figure 6** — Job threat vs speedup (U-shaped relationship).
- Appendix: example classifier prompts (productivity dimension; career stage). No formal tables in the main blog PDF.

## Limitations & caveats

- **Self-selected, personal-account-only sample** — active Claude users who opted into a survey; biased toward perceiving benefits as flowing to themselves. Enterprise users (who might attribute value to employers) excluded.
- **Inference, not measurement** — occupation, career stage, productivity, and sentiment are Claude-classifier inferences from open-ended text; some labels are wrong. 61% have no occupation label at all.
- **Open-ended design** — measures depend on what respondents _happen to mention_, not direct elicitation; authors call for confirmation in structured surveys.
- Productivity scale is uncentered (clustered at high end), limiting interpretation of the 5.1 mean.
- Correlational throughout; no causal claims.

## Policy & economic implications

- Public sentiment **tracks observed usage data** — people worry most where Claude actually does the most work, suggesting broad awareness of AI diffusion that policymakers can read as a leading signal.
- **Early-career anxiety** aligns with the companion paper's tentative evidence of slowed hiring of young (22–25) workers in exposed occupations — reinforces concern about a generational entry-point problem.
- Surplus distribution matters: most users perceive gains accruing to themselves, but a non-trivial 10% report employers extracting more work — a distributional question (workers vs managers vs firms) that will shape labor-policy debates.
- High- AND low-wage workers both report large gains, complicating a simple "AI hurts the low-skilled" narrative; low-wage users leveraging AI for side-business creation (delivery driver building e-commerce, landscaper building a music app) suggests mobility, not just displacement.

## Notable quotes

1. _"Well like anyone who has a white collar job these days I'm 100% concerned, pretty much 24/7 concerned about losing my job eventually to A.I."_ — Software engineer.
2. _"In terms of improving my capability, it's no doubt. [B]ut in the future AI may replace my work."_ — Market researcher.
3. _"when AI arrived, the project managers started giving harder and harder tickets and bugs to solve."_ — Software developer.
4. _"I'm a non tech guy but now I'm a full stack developer."_ — (scope-expansion example).
5. _"I have given very specific rules about what is where, how to read a legal document… but it diverges every time."_ — Lawyer (skepticism example).

## Open questions

- How would results change with enterprise / managed-account users included, who may report value accruing to employers?
- Do the classifier-inferred variables hold up against directly-asked structured-survey items?
- What is the actual survey field window and geographic distribution (not specified)?
- Is the U-shaped speedup–threat relationship causal, or does it reflect distinct populations (stifled creatives vs fast-displaced coders) sharing one curve?
- Does the self-benefit gap between early-career (60%) and senior (80%) workers reflect real surplus capture, or differences in how the two groups narrate their experience?
