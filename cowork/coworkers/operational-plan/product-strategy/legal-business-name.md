# Product strategy — the legal business name

> OP1 Hour 1, product-strategy item #1. Author: **product-manager**, with **legal-manager** (distinctiveness /
> clearance) and **finance-manager** (one domain, registration economics) consulted. Decision owner: **operator**.
>
> Not legal advice. Before filing, **legal-manager** must run a real USPTO/TESS + common-law clearance search;
> a name being available as a `.com` (all 5 are owned) does **not** mean it is registrable as a trademark.

## The 5 candidates (all `.com`, owned, in Cloudflare)

We score on five axes, 1–5 (5 best):

| candidate                  | says-what-it-is | memorable / typeable | brand fit (coworkers) | distinctiveness (™ strength) | family fit (`subagentknowledge.com`) | total |
|----------------------------|:--------------:|:--------------------:|:---------------------:|:----------------------------:|:------------------------------------:|:-----:|
| **subagentcoworkers.com**  | 4 | 3 | 5 | 4 | 5 | **21** |
| **managedcoworkers.com**   | 5 | 4 | 5 | 2 | 2 | **18** |
| **subagentworkers.com**    | 3 | 4 | 3 | 4 | 5 | **19** |
| **opencoworkers.com**      | 4 | 4 | 5 | 2 | 2 | **17** |
| **agentknowledgeworkers.com** | 5 | 2 | 3 | 2 | 3 | **15** |

### How to read this

- **Brand fit** rewards the literal product noun — we standardized on *coworkers* everywhere (`coworkers/`,
  `cowork/`, the npm `@coworkers` scope, the OP1 manager/coworker roles). Names with "coworkers" reinforce it.
- **Distinctiveness** is the trademark axis. Descriptive words — *managed, open, agent, knowledge, workers* —
  are weak marks (hard to register, easy to dilute). The **coined** prefix *subagent* is the only inherently
  distinctive element on offer, so it scores highest on registrability.
- **Family fit** rewards continuity with the one brand already live in production: **subagentknowledge.com**
  (the `mail.` / `calendar.` workers ship there today). A `subagent*` company name makes the product a family,
  not a one-off.

## Recommendation

**Primary: `subagentcoworkers.com`.** It is the only candidate that wins on three of the axes that matter most
— the product noun (*coworkers*), a distinctive/registrable root (*subagent*), and continuity with the live
**subagentknowledge.com** brand. The cost is length and a mild redundancy (*subagent* and *coworker* are both
agent words); the payoff is a defensible mark and a coherent `subagent*` family (`subagentknowledge.com` =
the knowledge layer, `subagentcoworkers.com` = the product/company).

**Runner-up: `managedcoworkers.com`.** The cleanest statement of the thesis — *managed coworkers* literally
describes the manager → coworker hierarchy, and it already names artifacts in the repo (`apps/managed-coworkers`,
`apps/open-managed-agents`). It loses only on trademark strength (fully descriptive) and brand-family fit.

**Hold:** `agentknowledgeworkers.com` (too long to type/say; descriptive) — keep as a redirect, not the mark.

## Decision requested (operator)

Pick the legal business name from the ranked list. On a pick, next steps: legal-manager runs trademark
clearance; finance-manager consolidates the other four as redirects (one renewal line, defensive holds);
product-manager aligns the GitHub org + npm `@coworkers` scope + app name to the chosen mark.
