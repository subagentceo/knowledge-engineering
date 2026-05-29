# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
#   "python-dotenv>=1.0",
# ]
# ///
# Image and PDF input, plus citations.
# Source: "Image Support", "PDF Support", "Citations"
#   — projects/courses/building-with-the-claude-api__1p.txt
#
# Up to 100 images per request; images consume tokens by pixel area. PDFs use the same pattern
# with type "document" and media_type "application/pdf". Citations expose exact source for
# verification.

import base64
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()

client = Anthropic()
model = "claude-sonnet-4-5"


def image_request(image_path):
    with open(image_path, "rb") as f:
        data = base64.standard_b64encode(f.read()).decode("utf-8")
    return client.messages.create(
        model=model,
        max_tokens=1000,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/png",
                            "data": data,
                        },
                    },
                    {"type": "text", "text": "Describe this image step by step."},
                ],
            }
        ],
    )


def pdf_request_with_citations(pdf_path):
    with open(pdf_path, "rb") as f:
        data = base64.standard_b64encode(f.read()).decode("utf-8")
    return client.messages.create(
        model=model,
        max_tokens=1000,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "document",
                        "source": {
                            "type": "base64",
                            "media_type": "application/pdf",
                            "data": data,
                        },
                        "title": "Quarterly Report",  # required for citations
                        "citations": {"enabled": True},
                    },
                    {"type": "text", "text": "What was Q3 revenue?"},
                ],
            }
        ],
    )
    # Response text blocks may carry a `citations` array: citation_page_location (PDF) or
    # citation_char_location (plain text).
