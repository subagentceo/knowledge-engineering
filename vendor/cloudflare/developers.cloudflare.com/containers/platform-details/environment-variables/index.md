---
title: Environment Variables
description: Runtime and user-defined environment variables available inside Container instances.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Environment Variables

## Runtime environment variables

The container runtime automatically sets the following variables:

* `CLOUDFLARE_APPLICATION_ID` \- the ID of the Containers application
* `CLOUDFLARE_COUNTRY_A2` \- the [ISO 3166-1 Alpha 2 code ↗](https://www.iso.org/obp/ui/#search/code/) of a country the container is placed in
* `CLOUDFLARE_LOCATION` \- a name of a location the container is placed in
* `CLOUDFLARE_REGION` \- a region name
* `CLOUDFLARE_DURABLE_OBJECT_ID` \- the ID of the Durable Object instance that the container is bound to. You can use this to identify particular container instances on the dashboard.

## User-defined environment variables

You can set environment variables when defining a Container in your Worker, or when starting a container instance.

For example:

JavaScript

```

class MyContainer extends Container {

  defaultPort = 4000;

  envVars = {

    MY_CUSTOM_VAR: "value",

    ANOTHER_VAR: "another_value",

  };

}


```

More details about defining environment variables and secrets can be found in [this example](https://developers.cloudflare.com/containers/examples/env-vars-and-secrets).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/platform-details/environment-variables/#page","headline":"Environment Variables · Cloudflare Containers docs","description":"Runtime and user-defined environment variables available inside Container instances.","url":"https://developers.cloudflare.com/containers/platform-details/environment-variables/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/platform-details/","name":"Platform Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/containers/platform-details/environment-variables/","name":"Environment Variables"}}]}
```
