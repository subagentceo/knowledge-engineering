---
title: Client-side errors
description: Resolve client-side errors in Turnstile widget rendering.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/turnstile/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Client-side errors

There are instances where Turnstile may encounter problems, invoking the `error-callback`.

These problems can range from network connectivity issues and browser compatibility problems to configuration errors and challenge failures.

When errors occur, implementing proper error handling ensures your visitors receive helpful feedback and your application can recover from temporary issues.

Refer to the [Error codes](https://developers.cloudflare.com/turnstile/troubleshooting/client-side-errors/error-codes/) for troubleshooting guidance to address specific error conditions.

## Error handling

The `error-callback` option for explicitly rendering widgets and the `data-error-callback` attribute for implicit rendering provides a JavaScript callback to handle potential errors that occur.

This callback mechanism gives you complete control over how errors are presented to visitors and allows you to implement custom recovery strategies tailored to your application's needs.

* [ Explicit rendering with error callback ](#tab-panel-11037)
* [ Implicit rendering with error callback ](#tab-panel-11038)

JavaScript

```

turnstile.render('#my-widget', {

  sitekey: 'your-sitekey',

  'error-callback': function(errorCode) {

    console.error('Turnstile error occurred:', errorCode);

    handleTurnstileError(errorCode);

    return true; // Indicates we handled the error

  }

});


```

HTML

```

<div class="cf-turnstile"

     data-sitekey="your-sitekey"

     data-error-callback="onTurnstileError"></div>


```

Specifying an error callback is optional, but recommended for production applications. If no error callback is set, Turnstile will throw a JavaScript exception upon error, which can disrupt your page's functionality and create a poor user experience. By providing an error callback, you can catch these exceptions and handle them.

If an error callback returns with a non-falsy result, Turnstile will assume that the error callback handled the error accordingly and will not perform any additional error logging. If the error callback returns with a falsy result (including `undefined`), Turnstile will log a warning to the JavaScript console containing the error code, which can be useful for debugging during development.

An error callback will retrieve an error code as its first parameter. This error code follows a structured format where the first three digits indicate the error family (such as configuration issues, network problems, or challenge failures), and the remaining digits specify the exact error within that family.

JavaScript

```

function handleTurnstileError(errorCode) {

  const errorFamily = Math.floor(errorCode / 1000);


  switch(errorFamily) {

    case 100:

      showMessage('Please refresh the page and try again.');

      break;

    case 110:

      showMessage('Configuration error. Please contact support.');

      break;

    case 300:

    case 600:

      showMessage('Security check failed. Please try refreshing or using a different browser.');

      break;

    default:

      showMessage('An unexpected error occurred. Please try again.');

  }

}


```

## Retry

By default, Turnstile will automatically retry upon encountering a problem, which helps handle transient network issues or temporary service disruptions without requiring user intervention.

This automatic retry mechanism is useful for [mobile visitors](https://developers.cloudflare.com/turnstile/get-started/mobile-implementation/) who may experience intermittent connectivity or visitors on networks with occasional stability issues.

When subsequent failures due to retries are observed, the error callback can be invoked multiple times for the same underlying issue. Your error handling code should account for this possibility to avoid showing duplicate error messages or performing the same recovery action repeatedly.

JavaScript

```

let retryCount = 0;


turnstile.render('#my-widget', {

  sitekey: 'your-sitekey',

  'error-callback': function(errorCode) {

    retryCount++;


    if (retryCount <= 2) {

      console.log(`Turnstile retry attempt ${retryCount}`);

      return false; // Let Turnstile handle the retry

    } else {

      showPersistentErrorMessage(errorCode);

      return true; // We'll handle it from here

    }

  }

});


```

You can adjust the retry behavior by setting the retry value to `never` instead of the default `auto`. This will result in Turnstile not automatically retrying, giving you control over when and how recovery attempts are made. If there is any issue or error verifying the visitor, the widget will not retry and will remain in the respective failure state until you take manual action.

JavaScript

```

turnstile.render('#my-widget', {

  sitekey: 'your-sitekey',

  retry: 'never',

  'error-callback': function(errorCode) {

    // You control all retry logic

    setTimeout(() => {

      turnstile.reset('#my-widget');

    }, 3000);

  }

});


```

You may call `turnstile.reset()` in the corresponding `error-callback` to manually trigger a retry. This approach is useful for when you want to implement custom retry logic, such as exponential backoff, user confirmation before retrying, or different retry strategies based on the specific error encountered.

The interval between retries for Turnstile can be configured by the `retry-interval` option, allowing you to optimize retry timing for your visitors’ typical network conditions. A longer interval may be more appropriate for visitors on slower or less reliable connections, while shorter intervals work well in environments with typically stable connectivity.

JavaScript

```

turnstile.render('#my-widget', {

  sitekey: 'your-sitekey',

  retry: 'auto',

  'retry-interval': 8000, // Wait 8 seconds between retries

  'error-callback': handleError

});


```

## Interactivity

If the visitor fails to engage with an interactive challenge within a reasonable timeframe, the timeout callback function is triggered. This timeout mechanism prevents challenges from remaining in a pending state indefinitely and ensures that visitors receive feedback when action is required.

For instance, in a scenario where the Turnstile widget is implemented within a form that may require several minutes to complete, the interactive challenge within the widget becomes outdated if it remains unaddressed for an extended period. Visitors might focus on filling out form fields and overlook the Turnstile challenge, leading to a situation where they attempt to submit the form with an expired or invalid token.

In such instances, the `timeout-callback` of the widget is activated, enabling the widget to reset itself as needed and provide appropriate guidance. This callback allows you to implement user-friendly timeout handling, such as highlighting the Turnstile widget, displaying a notification, or automatically refreshing the challenge.

JavaScript

```

turnstile.render('#my-widget', {

  sitekey: 'your-sitekey',

  callback: function(token) {

    console.log('Challenge completed successfully');

  },

  'timeout-callback': function() {

    console.log('Challenge timed out - user action required');

    document.getElementById('challenge-notice').textContent =

      'Please complete the security check above to continue.';


    // Optionally highlight the widget

    document.getElementById('my-widget').style.border = '2px solid orange';

  },

  'expired-callback': function() {

    console.log('Token expired - challenge needs refresh');

    document.getElementById('challenge-notice').textContent =

      'Security check expired. Please try again.';

  }

});


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/turnstile/troubleshooting/client-side-errors/#page","headline":"Client-side errors · Cloudflare Turnstile docs","description":"Resolve client-side errors in Turnstile widget rendering.","url":"https://developers.cloudflare.com/turnstile/troubleshooting/client-side-errors/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging","JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/turnstile/","name":"Turnstile"}},{"@type":"ListItem","position":3,"item":{"@id":"/turnstile/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/turnstile/troubleshooting/client-side-errors/","name":"Client-side errors"}}]}
```
