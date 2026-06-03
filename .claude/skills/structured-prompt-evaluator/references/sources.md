# Rubric sources

The 12 criteria are harvested from these 8 pages. Aliases used inline in the rubric's `source:` field.

```yaml
refs:
  bp:  https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
  xml: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/use-xml-tags
  pt:  https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-tools
  dev: https://platform.claude.com/docs/en/test-and-evaluate/develop-tests
  ev:  https://platform.claude.com/docs/en/test-and-evaluate/eval-tool
  lat: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-latency
  hal: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
  con: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/increase-consistency
  jb:  https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks
  leak: https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-prompt-leak
  so:  https://platform.claude.com/docs/en/build-with-claude/structured-outputs
```

## Source-to-criterion map

```yaml
- smart_criteria:           dev    # the SMART table
- long_input_at_top:        bp     # "Put longform data at the top — up to 30%"
- xml_load_bearing:         bp,xml # "Structure prompts with XML tags"
- examples_present:         bp     # "Use examples effectively, 3-5"
- structured_output_for_json: con,so # "For guaranteed JSON schema conformance" admonition
- no_prefill:               con,bp # "Prefilling is not supported on..." inline notice
- tell_not_dont:            bp     # "Tell Claude what to do instead of what not to do"
- idk_permission:           hal    # "Allow Claude to say 'I don't know'"
- ground_in_quotes:         hal    # "Use direct quotes for factual grounding (>20K)"
- external_knowledge_fence: hal    # "External knowledge restriction"
- latency_aware:            lat    # "engineer correctness first, then latency"
- max_tokens_safe:          lat    # the > Note: admonition about mid-word truncation
- colleague_test:           bp     # "Golden rule: show your prompt to a colleague"
```

Criteria from `jb` and `leak` are intentionally NOT in the v0.1.0 rubric — they're safety-screen concerns that apply to a narrower band of prompts. v0.2.0 may add them as conditional rows.
