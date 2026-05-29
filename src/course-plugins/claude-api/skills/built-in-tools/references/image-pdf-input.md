# Image and PDF input

Add an image block to a user message — `type: image`, `source` with `base64`, `media_type` (e.g. `image/png`), `data` — or a URL reference. Up to 100 images per request; images consume tokens by pixel area; accuracy depends heavily on prompting (step-by-step instructions, multi-shot alternating image/text examples, verification steps). PDFs use the same pattern with `type: "document"` and `media_type: "application/pdf"`; Claude reads text, images, charts, and tables.
