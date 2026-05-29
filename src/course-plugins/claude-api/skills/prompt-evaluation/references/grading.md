# Grading

Three grader types: **code graders** (programmatic checks — length, word presence, syntax validity, readability), **model graders** (a second API call evaluating the output — most flexible, possibly inconsistent), and **human graders** (most flexible, slow). All must return an objective signal, usually a numeric score, against criteria you define upfront.

**Model grading:** prompt the grader to return strengths/weaknesses/reasoning *and* a score — never the score alone, or it defaults to middling values. Use JSON output via assistant prefill + stop sequence, parse out score and reasoning, average across cases.

**Code grading:** `validate_json()` tries to parse JSON, `validate_python()` tries AST parse, `validate_regex()` tries regex compile — each returns 10 on success, 0 on error. Pick the validator from the case's `format` key.

**Combined score:** `final = (model_score + syntax_score) / 2` — pairs semantic quality with technical validity.
