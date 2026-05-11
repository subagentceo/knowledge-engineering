---
title: Types
description: TypeScript type definitions for the Flagship binding, including Flagship, FlagshipEvaluationContext, and FlagshipEvaluationDetails.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Types

The Flagship binding uses the following TypeScript types. These are available from the `@cloudflare/workers-types` package after running `npx wrangler types`.

## `Flagship`

The binding type. Each Flagship binding in your Wrangler configuration is typed as `Flagship` on the `Env` interface.

TypeScript

```

interface Env {

  FLAGS: Flagship;

}


```

Refer to the [methods reference](https://developers.cloudflare.com/flagship/binding/methods/) for the full list of evaluation methods available on the binding.

## `FlagshipEvaluationContext`

A record of attribute names to values passed for [targeting rules](https://developers.cloudflare.com/flagship/targeting/). Use this to provide user attributes such as user ID, country, or plan type.

TypeScript

```

type FlagshipEvaluationContext = Record<string, string | number | boolean>;


```

## `FlagshipEvaluationDetails`

Returned by the `*Details` methods. Contains the evaluated value and metadata about how Flagship resolved the flag.

TypeScript

```

interface FlagshipEvaluationDetails<T> {

  flagKey: string;

  value: T;

  variant?: string;

  reason?: string;

  errorCode?: string;

  errorMessage?: string;

}


```

| Property     | Type   | Description                                                                         |
| ------------ | ------ | ----------------------------------------------------------------------------------- |
| flagKey      | string | The key of the evaluated flag.                                                      |
| value        | T      | The resolved flag value.                                                            |
| variant      | string | The name of the matched variation, if any.                                          |
| reason       | string | Why the flag resolved to this value (for example, "TARGETING\_MATCH" or "DEFAULT"). |
| errorCode    | string | An error code if evaluation failed (for example, "TYPE\_MISMATCH" or "GENERAL").    |
| errorMessage | string | A human-readable description of the error.                                          |

Refer to [evaluation reasons and error codes](https://developers.cloudflare.com/flagship/reference/evaluation-reasons/) for the full list of possible values.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}},{"@type":"ListItem","position":3,"item":{"@id":"/flagship/binding/","name":"Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/flagship/binding/types/","name":"Types"}}]}
```
