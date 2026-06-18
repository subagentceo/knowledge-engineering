> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Breaking changes policy

## Overview

In order to balance rapid development and maintaining stability, ElevenLabs has specific guidelines on what are considered breaking changes within the scope of the API. Outlined here are what we do and do not consider breaking changes.

All API updates and changes are published in the [changelog](/docs/changelog) on a weekly cadence.

## Response and Schema Changes

We distinguish carefully between additive and subtractive changes to API responses. Adding new fields to response models is not considered breaking. When integrating with our API it is required that your API client ignores fields that they do not recognise and do not have strict typing checks for API responses. Almost all modern API clients do this out of the box.

Removing existing response fields or modifying their structure is breaking since client applications may depend on these fields being present and maintaining their expected format.

## Parameter Modifications

Changes to API parameters follow a strict compatibility model. Adding required parameters to existing endpoints is always breaking because existing client calls will fail validation. However, adding optional parameters (those with default values or explicitly marked as optional) is not breaking since existing client calls can continue without modification. Similarly, any changes to parameter types, formats, or making previously optional parameters required are considered breaking as they alter the contract that clients expect.

## Endpoint and Path Changes

Removing entire endpoints or API paths is inherently breaking since client applications calling these endpoints will receive errors. Endpoints might be marked as deprecated, however the outright removal of them will not occur without sufficient outreach to all affected users.