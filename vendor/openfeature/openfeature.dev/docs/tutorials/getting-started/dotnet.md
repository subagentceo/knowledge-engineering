-   [](/)
-   [Getting Started](/docs/category/getting-started)
-   .NET SDK and ASP.NET Core

On this page

# Getting Started with the OpenFeature .NET SDK

## Introduction[​](#introduction "Direct link to Introduction")

This walk-through teaches you the basics of using OpenFeature in .NET within a ASP.NET Core Web application.

You'll learn how to:

-   Integrate the OpenFeature .NET SDK
-   Install and configure the OpenFeature provider
-   Perform basic feature flagging

## Requirements[​](#requirements "Direct link to Requirements")

This walk-through assumes that:

-   You have a basic knowledge of C# and .NET
-   You have installed the [.NET 8](https://dotnet.microsoft.com/en-us/) or later SDK
-   You have Docker installed and running on the host system

## Walk-through[​](#walk-through "Direct link to Walk-through")

### Step 1: Create a .NET 8 Web application[​](#step-1-create-a-net-8-web-application "Direct link to Step 1: Create a .NET 8 Web application")

To get started you can use the .NET SDK to initialise a web application. Open a terminal (**shell**, **Command Prompt**, or **bash**) and paste the following commands:

```
dotnet new webapi -o openfeature-dotnet-samplecd openfeature-dotnet-sampledotnet run
```

### Step 2: Add dependencies[​](#step-2-add-dependencies "Direct link to Step 2: Add dependencies")

With NuGet you can install the latest [OpenFeature](https://www.nuget.org/packages/OpenFeature) package into your .NET web application.

```
dotnet add package OpenFeaturedotnet add package OpenFeature.Hosting
```

### Step 3: Add code[​](#step-3-add-code "Direct link to Step 3: Add code")

The following will initialise an `InMemoryProvider` for use within the web application. Open a code editor and add the C# code below to the Program.cs.

```
using Microsoft.AspNetCore.Mvc;using OpenFeature;using OpenFeature.Hosting.Providers.Memory;using OpenFeature.Providers.Memory;var builder = WebApplication.CreateBuilder(args);// Add services to the container.// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapibuilder.Services.AddOpenApi();// Register your feature flag providerbuilder.Services.AddOpenFeature(featureBuilder =>{    featureBuilder        .AddInMemoryProvider(_ => new Dictionary<string, Flag>()        {            {                "welcome-message", new Flag<bool>(                    new Dictionary<string, bool> { { "show", true }, { "hide", false } }, "show")            }        });});var app = builder.Build();// Configure the HTTP request pipeline.if (app.Environment.IsDevelopment()){    app.MapOpenApi();}app.UseHttpsRedirection();var summaries = new[]{    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"};app.MapGet("/weatherforecast", () =>{    var forecast = Enumerable.Range(1, 5).Select(index =>        new WeatherForecast        (            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),            Random.Shared.Next(-20, 55),            summaries[Random.Shared.Next(summaries.Length)]        ))        .ToArray();    return forecast;}).WithName("GetWeatherForecast");app.MapGet("/hello", async ([FromServices] IFeatureClient featureClient) =>{    if (await featureClient.GetBooleanValueAsync("welcome-message", false))    {        return "Hello, welcome to this OpenFeature-enabled website!";    }    return "Hello!";}).WithName("GetHello");app.Run();record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary){    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);}
```

At this point, we are ready to run the initial version of our application.

### Step 4: Run the initial application[​](#step-4-run-the-initial-application "Direct link to Step 4: Run the initial application")

Let's compile and run the application.

```
dotnet builddotnet run
```

In the logs you should see a line with the following `Now listening on: http://localhost:5251`, although the port number may differ. You can visit the following URL in your browser [http://localhost:5251/hello](http://localhost:5251/hello) (adjust port number as necessary) to view the hello world message. You should see the message "Hello!".

"Why I'm I seeing that value?", you may ask. Well, it's because a provider hasn't been configured yet. Without a provider to actually evaluate flags, OpenFeature will return the default value. In the next step, you'll learn how to add a provider.

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

Before we can use the Flagd provider in .NET we need to install the [.NET OpenFeature Flagd](https://www.nuget.org/packages/OpenFeature.Contrib.Providers.Flagd/) package.

```
dotnet add package OpenFeature.Contrib.Providers.Flagd
```

Finally, let's add the required code change to enable the flagd provider in our .NET application.

```
using Microsoft.AspNetCore.Mvc;using OpenFeature;using OpenFeature.DependencyInjection.Providers.Flagd;using OpenFeature.Providers.Memory;using OpenFeature.Hosting.Providers.Memory;var builder = WebApplication.CreateBuilder(args);// Add services to the container.// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapibuilder.Services.AddOpenApi();var app = builder.Build();// Register your feature flag providerbuilder.Services.AddOpenFeature(featureBuilder =>{    featureBuilder        .AddInMemoryProvider(_ => new Dictionary<string, Flag>()        {            {                "welcome-message", new Flag<bool>(                    new Dictionary<string, bool> { { "show", true }, { "hide", false } }, "show")            }        });        .AddFlagdProvider();});// Configure the HTTP request pipeline.if (app.Environment.IsDevelopment()){    app.MapOpenApi();}app.UseHttpsRedirection();app.MapGet("/hello", async ([FromServices] IFeatureClient featureClient) =>{    if (await featureClient.GetBooleanValueAsync("welcome-message", false))    {        return "Hello, welcome to this OpenFeature-enabled website!";    }    return "Hello!";}).WithName("GetHello");app.Run();
```

### Step 6: Rerun the application[​](#step-6-rerun-the-application "Direct link to Step 6: Rerun the application")

We can use the .NET CLI to build and run our application.

```
dotnet builddotnet run
```

You can visit the following URL in your browser [http://localhost:5251/hello](http://localhost:5251/hello) (adjust port number as necessary) to view the hello world message. You should see the message "Hello!".

Let's change the feature flag in our `flags.flagd.json`, making `defaultVariant` to `on`

```
{  "flags": {    "welcome-message": {      "variants": {        "on": true,        "off": false      },      "state": "ENABLED",      "defaultVariant": "off"      "defaultVariant": "on"    }  }}
```

Revisit the endpoint [http://localhost:5251/hello](http://localhost:5251/hello) and you will be greeted with `Hello, welcome to this OpenFeature-enabled website!`

## Conclusion[​](#conclusion "Direct link to Conclusion")

This walk-through introduced you to the OpenFeature .NET SDK. It covered how a provider can be configured to perform the flag evaluation and introduced basic feature flagging concepts. It also showcased how feature flags can be updated at runtime, without requiring a code change and a redeployment.

[Edit this page](https://github.com/open-feature/openfeature.dev/edit/main/docs/tutorials/getting-started/dotnet.mdx)