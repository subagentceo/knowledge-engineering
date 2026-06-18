---
title: Create a rule via API
description: Create cache response rules using the Rulesets API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a rule via API

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to create a Cache Response Rule via API. To configure the Cloudflare API, refer to the [API documentation](https://developers.cloudflare.com/fundamentals/api/get-started/).

## Basic rule settings

When creating a Cache Response Rule via API, make sure you:

* Set the rule action to one of the [available actions](https://developers.cloudflare.com/cache/how-to/cache-response-rules/settings/#available-actions).
* Define the parameters in the `action_parameters` field according to the [settings](https://developers.cloudflare.com/cache/how-to/cache-response-rules/settings/) you wish to configure for matching responses.
* Deploy the rule to the `http_response_cache_settings` phase entry point ruleset.

## Procedure

1. Use the [List zone rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) method to check if a ruleset already exists for the `http_response_cache_settings` phase.
2. If the phase ruleset does not exist, create it using the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. In the new ruleset properties, set the following values:  
   * kind: `zone`  
   * phase: `http_response_cache_settings`
3. Use the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation to add rules to the ruleset. Alternatively, include the rules in the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) request mentioned in the previous step.

## Example requests

These examples demonstrate all the available actions in Cache Response Rules using request and response matching criteria. Using these examples directly will cause any existing rules in the phase to be replaced.

Example: Strip response headers from JS files before caching

Update a zone entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_response_cache_settings/entrypoint" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "expression": "http.request.uri.path.extension eq \"js\"",

            "description": "Strip caching headers from JS files",

            "action": "set_cache_settings",

            "action_parameters": {

                "strip_etags": true,

                "strip_set_cookie": true,

                "strip_last_modified": true

            }

        }

    ]

  }'


```

Example: Set static cache tags on API responses

Update a zone entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_response_cache_settings/entrypoint" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "expression": "http.request.uri.path starts_with \"/api/\"",

            "description": "Tag API responses for targeted purging",

            "action": "set_cache_tags",

            "action_parameters": {

                "operation": "set",

                "values": [

                    "api-response",

                    "dynamic-content"

                ]

            }

        }

    ]

  }'


```

Example: Add cache tags from a response header using an expression

Update a zone entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_response_cache_settings/entrypoint" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "expression": "any(http.response.headers.names[*] == \"Surrogate-Keys\")",

            "description": "Extract cache tags from alternative CDN response header",

            "action": "set_cache_tags",

            "action_parameters": {

                "operation": "add",

                "expression": "split(http.response.headers[\"Surrogate-Keys\"][0], \",\", 1)"

            }

        }

    ]

  }'


```

Example: Override cache-control with max-age 

Update a zone entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_response_cache_settings/entrypoint" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "expression": "http.response.code eq 200",

            "description": "Override cache-control for successful responses",

            "action": "set_cache_control",

            "action_parameters": {

                "max-age": {

                    "operation": "set",

                    "value": 3600,

                    "cloudflare_only": true

                }

            }

        }

    ]

  }'


```

Example: Set private directive with qualifiers

Update a zone entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_response_cache_settings/entrypoint" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "expression": "http.request.uri.path starts_with \"/user/\"",

            "description": "Mark user content as private",

            "action": "set_cache_control",

            "action_parameters": {

                "private": {

                    "operation": "set",

                    "qualifiers": [

                        "X-User-Id",

                        "X-Session-Token"

                    ]

                },

                "no-cache": {

                    "operation": "set"

                }

            }

        }

    ]

  }'


```

Example: Set immutable for static font assets

Update a zone entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_response_cache_settings/entrypoint" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "expression": "http.request.uri.path.extension in {\"woff2\" \"woff\" \"ttf\"}",

            "description": "Mark fonts as immutable",

            "action": "set_cache_control",

            "action_parameters": {

                "immutable": {

                    "operation": "set"

                },

                "max-age": {

                    "operation": "set",

                    "value": 31536000

                }

            }

        }

    ]

  }'


```

Example: Multiple rules with strip headers, tag responses, and set cache control

Update a zone entry point ruleset

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_response_cache_settings/entrypoint" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "rules": [

        {

            "expression": "http.response.code eq 200 and http.request.uri.path.extension eq \"html\"",

            "description": "Strip tracking headers from HTML responses",

            "action": "set_cache_settings",

            "action_parameters": {

                "strip_etags": true,

                "strip_set_cookie": true

            }

        },

        {

            "expression": "http.request.uri.path starts_with \"/products/\"",

            "description": "Tag product pages for purging",

            "action": "set_cache_tags",

            "action_parameters": {

                "operation": "add",

                "values": [

                    "product-catalog",

                    "storefront"

                ]

            }

        },

        {

            "expression": "http.response.code eq 200",

            "description": "Set cache control for all 200 responses",

            "action": "set_cache_control",

            "action_parameters": {

                "s-maxage": {

                    "operation": "set",

                    "value": 86400,

                    "cloudflare_only": true

                },

                "must-revalidate": {

                    "operation": "set"

                }

            }

        }

    ]

  }'


```

## Required API token permissions

The API token used in API requests to manage Cache Response Rules must have the following permissions:

* _Zone_ \> _Cache Rules_ \> _Edit_
* _Account Rulesets_ \> _Edit_
* _Account Filter Lists_ \> _Edit_

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-response-rules/create-api/#page","headline":"Create a Cache Response Rule via API · Cloudflare Cache (CDN) docs","description":"Create cache response rules using the Rulesets API.","url":"https://developers.cloudflare.com/cache/how-to/cache-response-rules/create-api/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/how-to/","name":"Cache configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/how-to/cache-response-rules/","name":"Cache Response Rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/cache/how-to/cache-response-rules/create-api/","name":"Create a rule via API"}}]}
```
