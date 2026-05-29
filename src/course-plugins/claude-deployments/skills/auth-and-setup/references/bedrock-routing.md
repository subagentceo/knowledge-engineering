# Amazon Bedrock: auth, region, and the inference-profile trap

> Distilled from the *Claude with Amazon Bedrock* course.

## Install / client
- AWS `boto3`; build the runtime client with an explicit region:
  `boto3.client("bedrock-runtime", region_name="us-west-2")`.
- Auth follows the normal AWS credential chain (profile / env / role) — nothing Claude-specific.

## Model IDs and inference profiles (the trap)
- **Not every model is hosted in every region.** A raw model ID in the wrong region yields a
  cryptic error.
- Fix: use a **cross-region inference profile ID** instead of a direct model ID. The profile
  routes the request to a region where the model actually exists, guaranteeing it resolves.
- Find profile IDs in the AWS console under **"cross region inference"**, *not* under "model
  catalog."
- A wrong/typo'd model identifier fails silently in production (the *Automated Debugging* note
  shows a real case: an "invalid model identifier" error from a model-ID typo, surfaced only via
  CloudWatch logs).
