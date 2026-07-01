# Claude enterprise solutions

✻ Migration plan: legacy-auth → auth-v2

‍

Audited 47 services, 312 call sites, 8 distinct usage patterns.

‍

Recommended order

‍

Phase 1 — Low risk (weeks 1–2, 12 services)  
Internal admin tools with no external dependencies. Safe to validate the auth-v2 codemod and surface unknown patterns.

Phase 2 — Leaf services (weeks 3–5, 18 services)  
No downstream consumers in the dependency graph. Failures stay contained; single staged rollout per service.

Phase 3 — Core services (weeks 6–9, 17 services)  
Auth-critical paths with downstream impact. Requires feature flags, shadow traffic comparison, and per-team rollback plans.

‍

Risk callouts

‍

payments-api — blocker  
Uses undocumented legacy-auth.signWithRotation() not present in auth-v2. Needs design discussion before migration.

mobile-bff — needs review  
Integration tests pinned to legacy-auth response format. Token envelope changed (token.claims → token.payload); 23 fixtures to update.

identity-gateway — coordinated cutover  
Sits in front of 31 of 47 services. Recommend cutover at the Phase 2 → 3 boundary with a 48-hour dual-write window.

‍

Suggested next steps

‍

1. Open an RFC for the signWithRotation equivalent in auth-v2.  
2. Run the codemod against Phase 1 services, one PR per service.  
3. Add a CI check that fails on new legacy-auth imports in week 2.  
4. Schedule identity-gateway cutover with platform for week 5.

‍