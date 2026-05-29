# Structure with XML tags; provide examples

## Structure with XML tags

When interpolating large content, wrap each section in descriptive XML tags so Claude can tell content types apart and see groupings — e.g. `<sales_records>...</sales_records>`, `<my_code>...</my_code>`, `<docs>...</docs>`. Use specific tag names ("sales_records" beats "data"). Tag even short interpolated input (e.g. `<athlete_information>`) to mark it as external input to consider. Improves output quality even for small blocks.

## Provide examples (one-shot / multi-shot)

One-shot = a single example, multi-shot = several. Structure each example with XML tags containing sample input and ideal output, wrapped clearly to distinguish from the real prompt. Use for corner cases (sarcasm/edge scenarios), complex output formats (JSON), and clarifying expected quality/style.

Best practices: add context for corner cases ("be especially careful with sarcasm"); include reasoning explaining *why* the output is ideal; reuse your highest-scoring eval examples as templates; place examples *after* the main instructions/guidelines.
