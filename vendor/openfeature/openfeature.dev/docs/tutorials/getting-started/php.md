# Getting Started with the OpenFeature PHP SDK on Laravel

## Introduction[​](#introduction "Direct link to Introduction")

This walk-through teaches you the basics of using OpenFeature with PHP using Laravel.

You'll learn how to:

-   Install the OpenFeature PHP SDK
-   Install and configure an OpenFeature provider
-   Perform basic feature flagging

## Requirements[​](#requirements "Direct link to Requirements")

This walk-through assumes that:

-   You should have a good understanding of PHP syntax, data types, operators, functions, and control structures.
-   You have PHP 8.0 or later.
-   You have Docker installed and running on the host system.

## Walk-through[​](#walk-through "Direct link to Walk-through")

### Step 1: Create a new Laravel PHP project[​](#step-1-create-a-new-laravel-php-project "Direct link to Step 1: Create a new Laravel PHP project")

To get started, create a new folder, bootstrap the project, and install the dependencies. This can be done by running the following commands.

```
composer create-project --prefer-dist laravel/laravel openfeature-php-introcd openfeature-php-intro
```

### Step 2: Create a sample response[​](#step-2-create-a-sample-response "Direct link to Step 2: Create a sample response")

Define a route for your API by adding the following code to the `routes/api.php` file.

```
Route::get('/hello', function () {    return response()->json(['message' => 'Hello, World!']);});
```

### Step 3: Add the OpenFeature SDK[​](#step-3-add-the-openfeature-sdk "Direct link to Step 3: Add the OpenFeature SDK")

Let's install the OpenFeature SDK using the following command.

```
composer require open-feature/sdk
```

Update `routes/api.php` to import the SDK

```
use Illuminate\Http\Request;use Illuminate\Support\Facades\Route;use OpenFeature\OpenFeatureAPI;
```

The client can now be used to get a feature flag value. In this case, we'll get a boolean value using the welcome-message flag key.

The second argument is the fallback value, which is returned if there's abnormal behavior.

```
Route::get('/hello', function () {    $api = OpenFeatureAPI::getInstance();    $client = $api->getClient();    if($client->getBooleanValue("welcome-message", false)){        return response()->json(['message' => 'Hello, World! open feature']);    }    return response()->json(['message' => 'Hello, World!']);});
```

### Step 4: Run the application[​](#step-4-run-the-application "Direct link to Step 4: Run the application")

Let's start the app and see it in action. Run the following command to start the server.

```
php artisan serve
```

Open your favorite browser and navigate to [http://localhost:8000/api/hello](http://localhost:8000/api/hello).

If all goes as planned, you should see the message "Hello, World!" in glorious monochrome.

"Why I'm I seeing that value?", you may ask. Well, it's because a provider hasn't been configured yet. Without a provider to actually evaluate flags, OpenFeature will return the default value. In the next step, you'll learn how to add a provider.

> NOTE: You should stop the app by using the keyboard short `ctrl + c` before moving on to the next step.

### Step 5: Configure a provider (flagd)[​](#step-5-configure-a-provider-flagd "Direct link to Step 5: Configure a provider (flagd)")

Providers are an important concept in OpenFeature because they are responsible for the flag evaluation itself. As we saw in the previous step, OpenFeature without a provider always returns the default value. If we want to actually perform feature flagging, we'll need to register a provider.

Create a new file named `flags.flagd.json` and add the following JSON. Notice that there's a flag called `welcome-message` which matches the flag key referenced earlier. The `welcome-message` flag has `on` and `off` variants that return `true` and `false` respectively. The state property controls whether the feature flag is active or not. Finally, the defaultVariant property controls the variant that should be returned. In this case, the defaultVariant is `off`, therefore the value `false` would be returned.

```
{  "flags": {    "welcome-message": {      "variants": {        "on": true,        "off": false      },      "state": "ENABLED",      "defaultVariant": "off"    }  }}
```

> NOTE: This configuration is specific for flagd and varies across providers.

With the flagd configuration in place, start flagd service with the following docker command.

> NOTE: On Windows WSL is required both for running docker and to store the file. This is a limitation of Docker ([https://github.com/docker/for-win/issues/8479](https://github.com/docker/for-win/issues/8479))

```
docker run -p 8013:8013 -v $(pwd)/:/etc/flagd/ -it ghcr.io/open-feature/flagd:latest start --uri file:/etc/flagd/flags.flagd.json
```

Also, we have to install PHP flagd provider. Open up your terminal and write this command.

```
composer require open-feature/flagd-provider
```

Now let's make the required code changes in our application.

Now, update `routes/api.php` to import the `flagd provider`.

```
use OpenFeature\OpenFeatureAPI;use OpenFeature\Providers\Flagd\FlagdProvider;use OpenFeature\Providers\Flagd\config\HttpConfig;use GuzzleHttp\Client;use GuzzleHttp\Psr7\HttpFactory;
```

Finally, we need to register the provider with OpenFeature.

```
Route::get('/hello', function () {    $api = OpenFeatureAPI::getInstance();    $httpClient = new Client();    $httpFactory = new HttpFactory();    $api->setProvider(new FlagdProvider([        'httpConfig' => new HttpConfig(            $httpClient,            $httpFactory,            $httpFactory,        )    ]));    $client = $api->getClient();    if($client->getBooleanValue("welcome-message", false)){        return response()->json(['message' => 'Hello, World! open feature']);    }    return response()->json(['message' => 'Hello, World!']);});
```

### Step 6: Rerun the application[​](#step-6-rerun-the-application "Direct link to Step 6: Rerun the application")

Now that everything is in place, let's start the app again.

```
php artisan serve
```

Open your favorite browser and navigate to [http://localhost:8000/api/hello](http://localhost:8000/api/hello) should show the same value as before.

This difference is now the feature flag value can be changed at runtime!

Let's change the feature flag in our `flags.flagd.json`, making `defaultVariant` to `on`

```
{  "flags": {    "welcome-message": {      "variants": {        "on": true,        "off": false      },      "state": "ENABLED",      "defaultVariant": "off"      "defaultVariant": "on"    }  }}
```

Save the changes to `flags.flagd.json` and refresh the browser tab.

## Conclusion[​](#conclusion "Direct link to Conclusion")

This walk-through introduced you to the OpenFeature PHP SDK. It covered how a provider can be configured to perform the flag evaluation and introduced basic feature flagging concepts. It also showcased how feature flags can be updated at runtime, without requiring a redeployment.