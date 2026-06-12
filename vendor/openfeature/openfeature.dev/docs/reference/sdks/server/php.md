# OpenFeature PHP SDK

![Specification](https://img.shields.io/static/v1?label=specification&message=v0.5.1&color=yellow&style=for-the-badge)![Release](https://img.shields.io/static/v1?label=release&message=v2.1.2&color=blue&style=for-the-badge)  
![Total Downloads](https://poser.pugx.org/open-feature/sdk/downloads)![PHP 8.0+](https://img.shields.io/badge/php-\>=8.0-blue.svg)![License](https://poser.pugx.org/open-feature/sdk/license)![OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org/projects/6853/badge)

## Quick start​

**MCP Install**📋 Copy Prompt

Follow the MCP Getting Started guide to quickly set up the OpenFeature MCP server and connect your AI tool.

*   Run this prompt: `"Install OpenFeature into this app"`

**Quick Install:**

📦 Install in Cursor📦 Install in VS Code

```
claude mcp add --transport stdio openfeature npx -y @openfeature/mcp
```

### Requirements​

This library targets PHP version 8.0 and newer. As long as you have any compatible version of PHP on your system you should be able to utilize the OpenFeature SDK.

This package also has a `.tool-versions` file for use with PHP version managers like `asdf`.

### Install​

```
composer require open-feature/sdk
```

### Usage​

```
use OpenFeature\OpenFeatureAPI;use OpenFeature\Providers\Flagd\FlagdProvider;function example(){    $api = OpenFeatureAPI::getInstance();        // configure a provider    $api->setProvider(new FlagdProvider());    // create a client    $client = $api->getClient();        // get a bool flag value    $client->getBooleanValue('v2_enabled', false);}
```

#### Extended Example​

```
use OpenFeature\OpenFeatureAPI;use OpenFeature\OpenFeatureClient;class MyClass {  private OpenFeatureClient $client;  public function __construct()   {    $this->client = OpenFeatureAPI::getInstance()->getClient('MyClass');  }  public function booleanExample(): UI  {      // Should we render the redesign? Or the default webpage?       if ($this->client->getBooleanValue('redesign_enabled', false)) {          return render_redesign();      }      return render_normal();  }  public function stringExample(): Template  {      // Get the template to load for the custom new homepage      $template = $this->client->getStringValue('homepage_template', 'default-homepage.html');      return render_template($template);  }  public function numberExample(): array  {      // How many modules should we be fetching?      $count = $this->client->getIntegerValue('module-fetch-count', 4);      return fetch_modules($count);  }  public function structureExample(): HomepageModule  {      $obj = $this->client->getObjectValue('hero-module', $previouslyDefinedDefaultStructure);      return HomepageModuleBuilder::new()              ->title($obj->getValue('title'))              ->body($obj->getValue('description'))              ->build();  }}
```

## Features​

Status

Features

Description

✅

Providers

Integrate with a commercial, open source, or in-house feature management tool.

✅

Targeting

Contextually-aware flag evaluation using evaluation context.

✅

Hooks

Add functionality to various stages of the flag evaluation life-cycle.

✅

Logging

Integrate with popular logging packages.

❌

Named clients

Utilize multiple providers in a single application.

⚠️

Eventing

React to state changes in the provider or flag management system.

❌

Shutdown

Gracefully clean up a provider during application shutdown.

✅

Extending

Extend OpenFeature with custom providers and hooks.

Implemented: ✅ | In-progress: ⚠️ | Not implemented yet: ❌

### Providers​

Providers are an abstraction between a flag management system and the OpenFeature SDK. Look here for a complete list of available providers. If the provider you're looking for hasn't been created yet, see the develop a provider section to learn how to build it yourself.

Once you've added a provider as a dependency, it can be registered with OpenFeature like this:

```
$api = OpenFeatureAPI::getInstance();$api->setProvider(new MyProvider());
```

### Targeting​

Sometimes, the value of a flag must consider some dynamic criteria about the application or user, such as the user's location, IP, email address, or the server's location. In OpenFeature, we refer to this as targeting. If the flag management system you're using supports targeting, you can provide the input data using the evaluation context.

```
// add a value to the global context$api = OpenFeatureAPI::getInstance();$api->setEvaluationContext(new EvaluationContext('targetingKey', new Attributes(['myGlobalKey' => 'myGlobalValue'])));// add a value to the client context$client = $api->getClient();$client->setEvaluationContext(new EvaluationContext('targetingKey', new Attributes(['myClientKey' => 'myClientValue'])));// add a value to the invocation context$context = new EvaluationContext('targetingKey', new Attributes(['myInvocationKey' => 'myInvocationValue']));$boolValue = $client->getBooleanValue('boolFlag', false, $context);
```

### Hooks​

Hooks allow for custom logic to be added at well-defined points of the flag evaluation life-cycle. Look here for a complete list of available hooks. If the hook you're looking for hasn't been created yet, see the develop a hook section to learn how to build it yourself.

Once you've added a hook as a dependency, it can be registered at the global, client, or flag invocation level.

```
// add a hook globally, to run on all evaluations$api = OpenFeatureAPI::getInstance();$api->addHooks(new ExampleGlobalHook());// add a hook on this client, to run on all evaluations made by this client$client = $api->getClient();$client->addHooks(new ExampleClientHook());// add a hook for this evaluation only$value = $client->getBooleanValue("boolFlag", false, $context, new EvaluationOptions([new ExampleInvocationHook()]));
```

### Logging​

The PHP SDK utilizes several of the PHP Standards Recommendation, one of those being PSR-3 which provides a standard `LoggerInterface`. The SDK makes use of a `LoggerAwareTrait` on several components, including the client for flag evaluation, the hook executor, and the global `OpenFeatureAPI` instance. When an OpenFeature client is created by the API, it will automatically utilize the configured logger in the API for it. The logger set in the client is also automatically used for the hook execution.

> ⚠️ Once the client is instantiated, updates to the API's logger will not synchronize. This is done to support the separation of named clients. If you must update an existing client's logger, do so directly!

```
$api = OpenFeatureAPI::getInstance();$logger = new FancyLogger();$defaultLoggerClient = $api->getClient('default-logger');$api->setLogger(new CustomLogger());$customLoggerClient = $api->getClient('custom-logger');$overrideLoggerClient = $api->getClient('override-logger');$overrideLoggerClient->setLogger($logger);// now let's do some evaluations with these!$defaultLoggerClient->getBooleanValue('A', false);// uses default logger in the SDK$customLoggerClient->getBooleanValue('B', false);// uses the CustomLogger set in the API before the client was made$overrideLoggerClient->getBooleanValue('C', false);// uses the FancyLogger set directly on the client
```

### Named clients​

Named clients are not yet available in the PHP SDK. Progress on this feature can be tracked here.

### Eventing​

Events are not yet available in the PHP SDK. Progress on this feature can be tracked here.

### Shutdown​

A shutdown method is not yet available in the PHP SDK. Progress on this feature can be tracked here.

## Extending​

### Develop a provider​

To develop a provider, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. You’ll then need to write the provider by implementing the `Provider` interface exported by the OpenFeature SDK.

```
declare(strict_types=1);namespace OpenFeature\Example\Providers;use OpenFeature\implementation\common\Metadata;use OpenFeature\interfaces\common\Metadata as IMetadata;use OpenFeature\interfaces\flags\EvaluationContext;use OpenFeature\interfaces\hooks\Hook;use OpenFeature\interfaces\provider\Provider;use OpenFeature\interfaces\provider\ResolutionDetails;class ExampleProviderImplementation implements Provider{    public function setLogger(LoggerInterface $logger): void    {        $this->logger = $logger;        // or, utilize the OpenFeature\interfaces\common\LoggerAwareTrait    }    /**     * @return Hook[]     */    public function getHooks(): array    {        return $this->hooks; // implement according to the OpenFeature specification    }    /**     * Returns the metadata for the current resource     */    public function getMetadata(): IMetadata    {        return new Metadata(self::class);    }    public function resolveBooleanValue(string $flagKey, bool $defaultValue, ?EvaluationContext $context = null): ResolutionDetails    {        // resolve some ResolutionDetails    }    public function resolveStringValue(string $flagKey, string $defaultValue, ?EvaluationContext $context = null): ResolutionDetails    {        // resolve some ResolutionDetails    }    public function resolveIntegerValue(string $flagKey, int $defaultValue, ?EvaluationContext $context = null): ResolutionDetails    {        // resolve some ResolutionDetails    }    public function resolveFloatValue(string $flagKey, float $defaultValue, ?EvaluationContext $context = null): ResolutionDetails    {        // resolve some ResolutionDetails    }    /**     * @inheritdoc     */    public function resolveObjectValue(string $flagKey, array $defaultValue, ?EvaluationContext $context = null): ResolutionDetails    {        // resolve some ResolutionDetails    }}
```

As you can see, this ends up requiring some boilerplate to fulfill all of the functionality that a Provider expects. Another option for implementing a provider is to utilize the AbstractProvider base class. This provides some internally wiring and simple scaffolding so you can skip some of it and focus on what's most important: resolving feature flags!

```
declare(strict_types=1);namespace OpenFeature\Example\Providers;use OpenFeature\implementation\provider\AbstractProvider;use OpenFeature\interfaces\flags\EvaluationContext;use OpenFeature\interfaces\provider\ResolutionDetails as ResolutionDetailsInterface;class ExampleProviderExtension extends AbstractProvider{    protected static string $NAME = self::class;    public function resolveBooleanValue(string $flagKey, bool $defaultValue, ?EvaluationContext $context = null): ResolutionDetailsInterface    {        // resolve some ResolutionDetails    }    public function resolveStringValue(string $flagKey, string $defaultValue, ?EvaluationContext $context = null): ResolutionDetailsInterface    {        // resolve some ResolutionDetails    }    public function resolveIntegerValue(string $flagKey, int $defaultValue, ?EvaluationContext $context = null): ResolutionDetailsInterface    {        // resolve some ResolutionDetails    }    public function resolveFloatValue(string $flagKey, float $defaultValue, ?EvaluationContext $context = null): ResolutionDetailsInterface    {        // resolve some ResolutionDetails    }    /**     * @inheritdoc     */    public function resolveObjectValue(string $flagKey, array $defaultValue, ?EvaluationContext $context = null): ResolutionDetailsInterface    {        // resolve some ResolutionDetails    }}
```

> Built a new provider? Let us know so we can add it to the docs!

### Develop a hook​

To develop a hook, you need to create a new project and include the OpenFeature SDK as a dependency. This can be a new repository or included in the existing contrib repository available under the OpenFeature organization. Implement your own hook by conforming to the `Hook` interface. To satisfy the interface, all methods (`before`/`after`/`finally`/`error`) need to be defined. You can also extend one of the typed abstract base classes (`BooleanHook`, `StringHook`, `IntegerHook`, `FloatHook`, `ObjectHook`) which automatically implement `supportsFlagValueType()` for the corresponding flag type.

```
declare(strict_types=1);namespace OpenFeature\Example\Hooks;use OpenFeature\interfaces\flags\EvaluationContext;use OpenFeature\interfaces\flags\FlagValueType;use OpenFeature\interfaces\hooks\Hook;use OpenFeature\interfaces\hooks\HookContext;use OpenFeature\interfaces\hooks\HookHints;use OpenFeature\interfaces\provider\ResolutionDetails;use Throwable;class ExampleStringHookImplementation implements Hook{    public function before(HookContext $context, HookHints $hints): ?EvaluationContext    {    }    public function after(HookContext $context, ResolutionDetails $details, HookHints $hints): void    {    }    public function error(HookContext $context, Throwable $error, HookHints $hints): void    {    }    public function finally(HookContext $context, HookHints $hints): void    {    }    public function supportsFlagValueType(string $flagValueType): bool    {        return $flagValueType === FlagValueType::STRING;    }}
```

You can also make use of existing base classes for various types and behaviors. Suppose you want to make this same hook, and have no limitation around extending a base class, you could do the following:

```
declare(strict_types=1);namespace OpenFeature\Example\Hooks;use OpenFeature\implementation\hooks\StringHook;use OpenFeature\interfaces\flags\EvaluationContext;use OpenFeature\interfaces\flags\FlagValueType;use OpenFeature\interfaces\hooks\HookContext;use OpenFeature\interfaces\hooks\HookHints;use OpenFeature\interfaces\provider\ResolutionDetails;use Throwable;class ExampleStringHookExtension extends StringHook{    public function before(HookContext $context, HookHints $hints): ?EvaluationContext    {    }    public function after(HookContext $context, ResolutionDetails $details, HookHints $hints): void    {    }    public function error(HookContext $context, Throwable $error, HookHints $hints): void    {    }    public function finally(HookContext $context, HookHints $hints): void    {    }}
```

> Built a new hook? Let us know so we can add it to the docs!