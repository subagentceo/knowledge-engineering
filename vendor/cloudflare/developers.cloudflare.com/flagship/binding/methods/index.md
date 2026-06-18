---
title: Methods
description: Reference for all Flagship binding evaluation methods, including typed value and details methods for booleans, strings, numbers, and objects.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Methods

The Flagship binding provides the following methods for evaluating feature flags. All methods are asynchronous and return a `Promise`. Evaluation methods never throw — they always return a value, falling back to the `defaultValue` you provide on errors.

Refer to the [types reference](https://developers.cloudflare.com/flagship/binding/types/) for the definitions of `FlagshipEvaluationContext` and `FlagshipEvaluationDetails`.

## `get()`

Returns the raw flag value without type checking. Use this method when the flag type is not known at compile time.

TypeScript

```

get(flagKey: string, defaultValue?: unknown, context?: FlagshipEvaluationContext): Promise<unknown>


```

| Parameter    | Type                      | Required | Description                                                               |
| ------------ | ------------------------- | -------- | ------------------------------------------------------------------------- |
| flagKey      | string                    | Yes      | The key of the flag to evaluate.                                          |
| defaultValue | unknown                   | No       | The fallback value returned if evaluation fails or the flag is not found. |
| context      | FlagshipEvaluationContext | No       | Key-value attributes for targeting rules.                                 |

TypeScript

```

const value = await env.FLAGS.get("checkout-flow", "v1", {

  userId: "user-42",

});


```

## `getBooleanValue()`

Returns the flag value as a `boolean`.

TypeScript

```

getBooleanValue(flagKey: string, defaultValue: boolean, context?: FlagshipEvaluationContext): Promise<boolean>


```

| Parameter    | Type                      | Required | Description                                                               |
| ------------ | ------------------------- | -------- | ------------------------------------------------------------------------- |
| flagKey      | string                    | Yes      | The key of the flag to evaluate.                                          |
| defaultValue | boolean                   | Yes      | The fallback value returned if evaluation fails or the flag is not found. |
| context      | FlagshipEvaluationContext | No       | Key-value attributes for targeting rules.                                 |

TypeScript

```

const enabled = await env.FLAGS.getBooleanValue("dark-mode", false, {

  userId: "user-42",

});


```

## `getStringValue()`

Returns the flag value as a `string`.

TypeScript

```

getStringValue(flagKey: string, defaultValue: string, context?: FlagshipEvaluationContext): Promise<string>


```

| Parameter    | Type                      | Required | Description                                                               |
| ------------ | ------------------------- | -------- | ------------------------------------------------------------------------- |
| flagKey      | string                    | Yes      | The key of the flag to evaluate.                                          |
| defaultValue | string                    | Yes      | The fallback value returned if evaluation fails or the flag is not found. |
| context      | FlagshipEvaluationContext | No       | Key-value attributes for targeting rules.                                 |

TypeScript

```

const variant = await env.FLAGS.getStringValue("checkout-flow", "v1", {

  userId: "user-42",

  country: "US",

});


```

## `getNumberValue()`

Returns the flag value as a `number`.

TypeScript

```

getNumberValue(flagKey: string, defaultValue: number, context?: FlagshipEvaluationContext): Promise<number>


```

| Parameter    | Type                      | Required | Description                                                               |
| ------------ | ------------------------- | -------- | ------------------------------------------------------------------------- |
| flagKey      | string                    | Yes      | The key of the flag to evaluate.                                          |
| defaultValue | number                    | Yes      | The fallback value returned if evaluation fails or the flag is not found. |
| context      | FlagshipEvaluationContext | No       | Key-value attributes for targeting rules.                                 |

TypeScript

```

const maxRetries = await env.FLAGS.getNumberValue("max-retries", 3, {

  plan: "enterprise",

});


```

## `getObjectValue()`

Returns the flag value as a typed object. Use the generic parameter `T` to specify the expected shape.

TypeScript

```

getObjectValue<T extends object>(flagKey: string, defaultValue: T, context?: FlagshipEvaluationContext): Promise<T>


```

| Parameter    | Type                      | Required | Description                                                               |
| ------------ | ------------------------- | -------- | ------------------------------------------------------------------------- |
| flagKey      | string                    | Yes      | The key of the flag to evaluate.                                          |
| defaultValue | T                         | Yes      | The fallback value returned if evaluation fails or the flag is not found. |
| context      | FlagshipEvaluationContext | No       | Key-value attributes for targeting rules.                                 |

TypeScript

```

interface ThemeConfig {

  primaryColor: string;

  fontSize: number;

}


const theme = await env.FLAGS.getObjectValue<ThemeConfig>(

  "theme-config",

  { primaryColor: "#000", fontSize: 14 },

  { userId: "user-42" },

);


```

## `getBooleanDetails()`

Returns the flag value as a `boolean` with evaluation metadata.

TypeScript

```

getBooleanDetails(flagKey: string, defaultValue: boolean, context?: FlagshipEvaluationContext): Promise<FlagshipEvaluationDetails<boolean>>


```

| Parameter    | Type                      | Required | Description                                                               |
| ------------ | ------------------------- | -------- | ------------------------------------------------------------------------- |
| flagKey      | string                    | Yes      | The key of the flag to evaluate.                                          |
| defaultValue | boolean                   | Yes      | The fallback value returned if evaluation fails or the flag is not found. |
| context      | FlagshipEvaluationContext | No       | Key-value attributes for targeting rules.                                 |

TypeScript

```

const details = await env.FLAGS.getBooleanDetails("dark-mode", false, {

  userId: "user-42",

});

console.log(details.value); // true

console.log(details.reason); // "TARGETING_MATCH"


```

## `getStringDetails()`

Returns the flag value as a `string` with evaluation metadata.

TypeScript

```

getStringDetails(flagKey: string, defaultValue: string, context?: FlagshipEvaluationContext): Promise<FlagshipEvaluationDetails<string>>


```

| Parameter    | Type                      | Required | Description                                                               |
| ------------ | ------------------------- | -------- | ------------------------------------------------------------------------- |
| flagKey      | string                    | Yes      | The key of the flag to evaluate.                                          |
| defaultValue | string                    | Yes      | The fallback value returned if evaluation fails or the flag is not found. |
| context      | FlagshipEvaluationContext | No       | Key-value attributes for targeting rules.                                 |

TypeScript

```

const details = await env.FLAGS.getStringDetails("checkout-flow", "v1", {

  userId: "user-42",

});

console.log(details.value); // "v2"

console.log(details.variant); // "new"

console.log(details.reason); // "TARGETING_MATCH"


```

## `getNumberDetails()`

Returns the flag value as a `number` with evaluation metadata.

TypeScript

```

getNumberDetails(flagKey: string, defaultValue: number, context?: FlagshipEvaluationContext): Promise<FlagshipEvaluationDetails<number>>


```

| Parameter    | Type                      | Required | Description                                                               |
| ------------ | ------------------------- | -------- | ------------------------------------------------------------------------- |
| flagKey      | string                    | Yes      | The key of the flag to evaluate.                                          |
| defaultValue | number                    | Yes      | The fallback value returned if evaluation fails or the flag is not found. |
| context      | FlagshipEvaluationContext | No       | Key-value attributes for targeting rules.                                 |

TypeScript

```

const details = await env.FLAGS.getNumberDetails("max-retries", 3, {

  plan: "enterprise",

});

console.log(details.value); // 5

console.log(details.reason); // "TARGETING_MATCH"


```

## `getObjectDetails()`

Returns the flag value as a typed object with evaluation metadata. Use the generic parameter `T` to specify the expected shape.

TypeScript

```

getObjectDetails<T extends object>(flagKey: string, defaultValue: T, context?: FlagshipEvaluationContext): Promise<FlagshipEvaluationDetails<T>>


```

| Parameter    | Type                      | Required | Description                                                               |
| ------------ | ------------------------- | -------- | ------------------------------------------------------------------------- |
| flagKey      | string                    | Yes      | The key of the flag to evaluate.                                          |
| defaultValue | T                         | Yes      | The fallback value returned if evaluation fails or the flag is not found. |
| context      | FlagshipEvaluationContext | No       | Key-value attributes for targeting rules.                                 |

TypeScript

```

interface ThemeConfig {

  primaryColor: string;

  fontSize: number;

}


const details = await env.FLAGS.getObjectDetails<ThemeConfig>(

  "theme-config",

  { primaryColor: "#000", fontSize: 14 },

  { userId: "user-42" },

);

console.log(details.value); // { primaryColor: "#0051FF", fontSize: 16 }

console.log(details.variant); // "brand-refresh"


```

## Error handling

Evaluation methods never throw. They always return a value. When an error occurs, the method returns the `defaultValue` you provided. Use the `*Details` variants to inspect what went wrong.

### Type mismatch

If you call a typed method on a flag with a different type (for example, `getBooleanValue` on a string flag), the method returns the default value. The `*Details` variants set `errorCode` to `"TYPE_MISMATCH"`.

TypeScript

```

// Flag "checkout-flow" is a string flag, but you call getBooleanDetails.

const details = await env.FLAGS.getBooleanDetails("checkout-flow", false);

console.log(details.value); // false (the default value)

console.log(details.errorCode); // "TYPE_MISMATCH"


```

### Evaluation failure

If evaluation fails for any other reason (for example, a network error or missing flag), the method returns the default value. The `*Details` variants set `errorCode` to `"GENERAL"`.

TypeScript

```

const details = await env.FLAGS.getStringDetails(

  "nonexistent-flag",

  "fallback",

);

console.log(details.value); // "fallback"

console.log(details.errorCode); // "GENERAL"


```

## Parameters reference

The following table summarizes the parameters shared across all evaluation methods.

| Parameter    | Type                      | Required         | Description                                                                                   |
| ------------ | ------------------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| flagKey      | string                    | Yes              | The key of the flag to evaluate.                                                              |
| defaultValue | varies                    | Yes (except get) | The fallback value returned if evaluation fails or the flag is not found.                     |
| context      | FlagshipEvaluationContext | No               | Key-value attributes for targeting rules (for example, { userId: "user-42", country: "US" }). |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/flagship/binding/methods/#page","headline":"Methods · Cloudflare Flagship docs","description":"Reference for all Flagship binding evaluation methods, including typed value and details methods for booleans, strings, numbers, and objects.","url":"https://developers.cloudflare.com/flagship/binding/methods/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}},{"@type":"ListItem","position":3,"item":{"@id":"/flagship/binding/","name":"Binding API"}},{"@type":"ListItem","position":4,"item":{"@id":"/flagship/binding/methods/","name":"Methods"}}]}
```
