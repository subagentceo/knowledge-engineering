```yaml
refs:
  cz:   https://docs.cloudzero.com/docs/connections-anthropic
  dd:   https://docs.datadoghq.com/integrations/anthropic/
  gf:   https://grafana.com/docs/grafana-cloud/monitor-infrastructure/integrations/integration-reference/integration-anthropic/
  hc:   https://docs.honeycomb.io/integrations/anthropic-usage-monitoring/
  vg:   https://docs.vantage.sh/connecting_anthropic
  uc:   vendor/anthropics/platform.claude.com/docs/en/manage-claude/usage-cost-api.md
```

# claude api cost observability — platform comparison + recommendation

## comparison

```yaml
platforms:
  - name: CloudZero
    free_tier: false          # sales-gated, no public free plan
    self_hosted: false        # SaaS-only
    otel_ingest: false        # proprietary integration
    llm_dashboards: true      # Anthropic connector documented (refs: cz)
    verdict: skip             # no free tier, no self-host

  - name: Datadog
    free_tier: partial        # 5 hosts, 14-day log retention; LLM obs is paid add-on
    self_hosted: true         # docker agent available
    otel_ingest: true         # OTLP endpoint on Datadog agent
    llm_dashboards: true      # Anthropic integration (refs: dd)
    verdict: viable_backup    # free tier too limited for production; agent adds $

  - name: Grafana OSS
    free_tier: true           # fully open-source; no usage limits when self-hosted
    self_hosted: true         # docker-compose: grafana + prometheus + otel-collector
    otel_ingest: true         # OTLP receiver in otel-collector-contrib
    llm_dashboards: partial   # no Anthropic-specific out-of-box panel; build with PromQL
    verdict: recommended      # zero cost, full control, runs on existing linux + docker

  - name: Honeycomb
    free_tier: true           # 20M events/mo, 60-day retention; no credit card
    self_hosted: false        # SaaS-only
    otel_ingest: true         # OTel-native (refs: hc)
    llm_dashboards: true      # Anthropic usage monitoring documented
    verdict: viable_cloud     # best managed option if self-host not required

  - name: Vantage
    free_tier: partial        # limited API access on free; full features paid
    self_hosted: false        # SaaS-only
    otel_ingest: false        # proprietary FinOps ingestion
    llm_dashboards: true      # Anthropic cost connector (refs: vg)
    verdict: skip             # FinOps use-case only; no OTel; no self-host
```

## recommendation

**Grafana OSS** — docker-compose stack (grafana + prometheus + otel-collector-contrib).

rationale: zero cost, no external dependency, runs on existing linux compute or as a docker service on `subagentceo`, full OTel OTLP ingest, prometheus metric storage, grafana dashboards built with PromQL on `claude.*` metric namespace. the cost poller (`src/claude-cost-poller.ts`) emits to the collector over OTLP HTTP; no grafana cloud account needed.

## tradeoffs

grafana vs honeycomb: honeycomb has better trace querying and zero infra to manage; choose it if the compute is unavailable or operational overhead is unacceptable. grafana vs datadog: datadog LLM obs is paid; free tier covers infra metrics only.

## tl;dr

grafana oss is the only option that is simultaneously free, self-hosted on docker, and accepts OTel OTLP without a paid plan. the `claude-cost-poller.ts` polls `/v1/organizations/usage_report/messages` and `/v1/organizations/cost_report` (both require `ANTHROPIC_ADMIN_KEY`, not oauth) and emits `claude.tokens.*` and `claude.cost.usd` gauges. prometheus scrapes the otel-collector and grafana visualizes. honeycomb is the viable fallback if self-hosting is not required.
