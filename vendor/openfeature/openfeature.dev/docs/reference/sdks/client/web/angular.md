-   [](/)
-   [SDKs](/docs/reference/sdks/)
-   [Client](/docs/reference/sdks/client/)
-   [Web](/docs/reference/sdks/client/web/)
-   Angular

On this page

# OpenFeature Angular SDK

[![Specification](https://img.shields.io/static/v1?label=specification&message=v0.8.0&color=yellow&style=for-the-badge)](https://github.com/open-feature/spec/releases/tag/v0.8.0)[![Release](https://img.shields.io/static/v1?label=release&message=v1.2.0&color=blue&style=for-the-badge)](https://github.com/open-feature/js-sdk/releases/tag/angular-sdk-v1.2.0)  
[![codecov](https://codecov.io/gh/open-feature/js-sdk/branch/main/graph/badge.svg?token=3DC5XOEHMY)](https://codecov.io/gh/open-feature/js-sdk)[![NPM Download](https://img.shields.io/npm/dm/%40openfeature%2Fangular-sdk)](https://www.npmjs.com/package/@openfeature/angular-sdk)

## Overview[​](#overview "Direct link to Overview")

The OpenFeature Angular SDK adds Angular-specific functionality to the [OpenFeature Web SDK](/docs/reference/sdks/client/web).

In addition to the features provided by the [web sdk](/docs/reference/sdks/client/web), capabilities include:

-   [Overview](#overview)
-   [Quick start](#quick-start)
    -   [Requirements](#requirements)
    -   [Install](#install)
        -   [npm](#npm)
        -   [yarn](#yarn)
        -   [Required peer dependencies](#required-peer-dependencies)
    -   [Usage](#usage)
        -   [Module](#module)
            -   [Minimal Example](#minimal-example)
        -   [How to use](#how-to-use)
            -   [Structural Directives](#structural-directives)
                -   [Boolean Feature Flag](#boolean-feature-flag)
                -   [Number Feature Flag](#number-feature-flag)
                -   [String Feature Flag](#string-feature-flag)
                -   [Object Feature Flag](#object-feature-flag)
                -   [Opting-out of automatic re-rendering](#opting-out-of-automatic-re-rendering)
                -   [Consuming the evaluation details](#consuming-the-evaluation-details)
            -   [FeatureFlagService](#featureflagservice)
                -   [Using with Observables](#using-with-observables)
                -   [Using with Angular Signals](#using-with-angular-signals)
                -   [Service Options](#service-options)
            -   [Setting evaluation context](#setting-evaluation-context)
                -   [Using a static object](#using-a-static-object)
                -   [Using a factory function](#using-a-factory-function)
            -   [Observability considerations](#observability-considerations)
-   [FAQ and troubleshooting](#faq-and-troubleshooting)
-   [Resources](#resources)

## Quick start[​](#quick-start "Direct link to Quick start")

### Requirements[​](#requirements "Direct link to Requirements")

-   ES2015-compatible web browser (Chrome, Edge, Firefox, etc)
-   Angular version 16+

### Install[​](#install "Direct link to Install")

#### npm[​](#npm "Direct link to npm")

```
npm install --save @openfeature/angular-sdk
```

#### yarn[​](#yarn "Direct link to yarn")

```
# yarn requires manual installation of the peer dependencies (see below)yarn add @openfeature/angular-sdk @openfeature/web-sdk @openfeature/core
```

#### Required peer dependencies[​](#required-peer-dependencies "Direct link to Required peer dependencies")

The following list contains the peer dependencies of `@openfeature/angular-sdk`. See the [package.json](https://github.com/open-feature/js-sdk/blob/main/packages/angular/projects/angular-sdk/package.json) for the required versions.

-   `@openfeature/web-sdk`
-   `@angular/common`
-   `@angular/core`

### Usage[​](#usage "Direct link to Usage")

#### Module[​](#module "Direct link to Module")

To configure OpenFeature for your application, import the `OpenFeatureModule` and call `forRoot` to register the provider(s) and optional evaluation context.

```
import { NgModule } from '@angular/core';import { CommonModule } from '@angular/common';import { OpenFeatureModule } from '@openfeature/angular-sdk';@NgModule({  declarations: [    // Other components  ],  imports: [    CommonModule,    OpenFeatureModule.forRoot({      provider: yourFeatureProvider,      // domainBoundProviders are optional, mostly needed if more than one provider is used in the application.      domainBoundProviders: {        domain1: new YourOpenFeatureProvider(),        domain2: new YourOtherOpenFeatureProvider(),      },    }),  ],})export class AppModule {}
```

Note

The feature flag directives (`BooleanFeatureFlagDirective`, `NumberFeatureFlagDirective`, `StringFeatureFlagDirective`, `ObjectFeatureFlagDirective`) and pipes are standalone and are not re-exported by `OpenFeatureModule`. In NgModule-based apps, you must also import the directives/pipes you use into the `imports` array of the component's NgModule (or of the component itself for standalone components).

##### Minimal Example[​](#minimal-example "Direct link to Minimal Example")

You don't need to provide all the templates. Here's a minimal example using a boolean feature flag:

If `initializing` and `reconciling` are not given, the feature flag value that is returned by the provider will determine what will be rendered.

```
<div *booleanFeatureFlag="'isFeatureEnabled'; default: true">This is shown when the feature flag is enabled.</div>
```

This example shows content when the feature flag `isFeatureEnabled` is true with a default value of true. No `else`, `initializing`, or `reconciling` templates are required in this case.

#### How to use[​](#how-to-use "Direct link to How to use")

The library provides two main ways to work with feature flags:

1.  **Structural Directives** - For template-based conditional rendering
2.  **FeatureFlagService** - For programmatic access with Observables

##### Structural Directives[​](#structural-directives "Direct link to Structural Directives")

The library provides four primary directives for feature flags, `booleanFeatureFlag`, `numberFeatureFlag`, `stringFeatureFlag` and `objectFeatureFlag`.

The first value given to the directive is the flag key that should be evaluated.

For all directives, the default value passed to OpenFeature has to be provided by the `default` parameter.

For all non-boolean directives, the value to compare the evaluation result to can be provided by the `value` parameter. This parameter is optional, if omitted, the `thenTemplate` will always be rendered.

The `domain` parameter is _optional_ and will be used as domain when getting the OpenFeature provider.

The `updateOnConfigurationChanged` and `updateOnContextChanged` parameter are _optional_ and used to disable the automatic re-rendering on flag value or context change. They are set to `true` by default.

The template referenced in `else` will be rendered if the evaluated feature flag is `false` for the `booleanFeatureFlag` directive and if the `value` does not match evaluated flag value for all other directives. This parameter is _optional_.

The template referenced in `initializing` and `reconciling` will be rendered if OpenFeature provider is in the corresponding states. This parameter is _optional_, if omitted, the `then` and `else` templates will be rendered according to the flag value.

###### Boolean Feature Flag[​](#boolean-feature-flag "Direct link to Boolean Feature Flag")

```
<div  *booleanFeatureFlag="'isFeatureEnabled'; default: true; domain: 'userDomain'; else: booleanFeatureElse; initializing: booleanFeatureInitializing; reconciling: booleanFeatureReconciling">  This is shown when the feature flag is enabled.</div><ng-template #booleanFeatureElse> This is shown when the feature flag is disabled. </ng-template><ng-template #booleanFeatureInitializing> This is shown when the feature flag is initializing. </ng-template><ng-template #booleanFeatureReconciling> This is shown when the feature flag is reconciling. </ng-template>
```

###### Number Feature Flag[​](#number-feature-flag "Direct link to Number Feature Flag")

```
<div  *numberFeatureFlag="'discountRate'; value: 10; default: 5; domain: 'userDomain'; else: numberFeatureElse; initializing: numberFeatureInitializing; reconciling: numberFeatureReconciling">  This is shown when the feature flag matches the specified discount rate.</div><ng-template #numberFeatureElse>  This is shown when the feature flag does not match the specified discount rate.</ng-template><ng-template #numberFeatureInitializing> This is shown when the feature flag is initializing. </ng-template><ng-template #numberFeatureReconciling> This is shown when the feature flag is reconciling. </ng-template>
```

###### String Feature Flag[​](#string-feature-flag "Direct link to String Feature Flag")

```
<div  *stringFeatureFlag="'themeColor'; value: 'dark'; default: 'light'; domain: 'userDomain'; else: stringFeatureElse; initializing: stringFeatureInitializing; reconciling: stringFeatureReconciling">  This is shown when the feature flag matches the specified theme color.</div><ng-template #stringFeatureElse>  This is shown when the feature flag does not match the specified theme color.</ng-template><ng-template #stringFeatureInitializing> This is shown when the feature flag is initializing. </ng-template><ng-template #stringFeatureReconciling> This is shown when the feature flag is reconciling. </ng-template>
```

###### Object Feature Flag[​](#object-feature-flag "Direct link to Object Feature Flag")

```
<div  *objectFeatureFlag="'userConfig'; value: { theme: 'dark' }; default: { theme: 'light' }; domain: 'userDomain'; else: objectFeatureElse; initializing: objectFeatureInitializing; reconciling: objectFeatureReconciling">  This is shown when the feature flag matches the specified user configuration.</div><ng-template #objectFeatureElse>  This is shown when the feature flag does not match the specified user configuration.</ng-template><ng-template #objectFeatureInitializing> This is shown when the feature flag is initializing. </ng-template><ng-template #objectFeatureReconciling> This is shown when the feature flag is reconciling. </ng-template>
```

###### Opting-out of automatic re-rendering[​](#opting-out-of-automatic-re-rendering "Direct link to Opting-out of automatic re-rendering")

By default, the directive re-renders when the flag value changes or the context changes.

In cases, this is not desired, re-rendering can be disabled for both events:

```
<div  *booleanFeatureFlag="'isFeatureEnabled'; default: true; updateOnContextChanged: false; updateOnConfigurationChanged: false;">  This is shown when the feature flag is enabled.</div>
```

###### Consuming the evaluation details[​](#consuming-the-evaluation-details "Direct link to Consuming the evaluation details")

The `evaluation details` can be used when rendering the templates. The directives [`$implicit`](https://angular.dev/guide/directives/structural-directives#structural-directive-shorthand) value will be bound to the flag value and additionally the value `evaluationDetails` will be bound to the whole evaluation details. They can be referenced in all templates.

The following example shows `value` being implicitly bound and `details` being bound to the evaluation details.

```
<div  *stringFeatureFlag="'themeColor'; value: 'dark'; default: 'light'; else: stringFeatureElse; let value; let details = evaluationDetails">  It was a match! The theme color is {{ value }} because of {{ details.reason }}</div><ng-template #stringFeatureElse let-value let-details="evaluationDetails">  It was no match! The theme color is {{ value }} because of {{ details.reason }}</ng-template>
```

When the expected flag value is omitted, the template will always be rendered. This can be used to just render the flag value or details without conditional rendering.

```
<div *stringFeatureFlag="'themeColor'; default: 'light'; let value;">The theme color is {{ value }}.</div>
```

##### FeatureFlagService[​](#featureflagservice "Direct link to FeatureFlagService")

The `FeatureFlagService` provides programmatic access to feature flags through reactive patterns. All methods return Observables that automatically emit new values when flag configurations or evaluation context changes.

###### Using with Observables[​](#using-with-observables "Direct link to Using with Observables")

```
import { Component, inject } from '@angular/core';import { AsyncPipe } from '@angular/common';import { FeatureFlagService } from '@openfeature/angular-sdk';@Component({  selector: 'my-component',  standalone: true,  imports: [AsyncPipe],  template: `    <div *ngIf="(isFeatureEnabled$ | async)?.value">      Feature is enabled! Reason: {{ (isFeatureEnabled$ | async)?.reason }}    </div>    <div>Theme: {{ (currentTheme$ | async)?.value }}</div>    <div>Max items: {{ (maxItems$ | async)?.value }}</div>  `,})export class MyComponent {  private flagService = inject(FeatureFlagService);  // Boolean flag  isFeatureEnabled$ = this.flagService.getBooleanDetails('my-feature', false);  // String flag  currentTheme$ = this.flagService.getStringDetails('theme', 'light');  // Number flag  maxItems$ = this.flagService.getNumberDetails('max-items', 10);  // Object flag with type safety  config$ = this.flagService.getObjectDetails<{ timeout: number }>('api-config', { timeout: 5000 });}
```

###### Using with Angular Signals[​](#using-with-angular-signals "Direct link to Using with Angular Signals")

You can convert any Observable from the service to an Angular Signal using `toSignal()`:

```
import { Component, inject } from '@angular/core';import { toSignal } from '@angular/core/rxjs-interop';import { FeatureFlagService } from '@openfeature/angular-sdk';@Component({  selector: 'my-component',  standalone: true,  template: `    <div *ngIf="isFeatureEnabled()?.value">Feature is enabled! Reason: {{ isFeatureEnabled()?.reason }}</div>    <div>Theme: {{ currentTheme()?.value }}</div>  `,})export class MyComponent {  private flagService = inject(FeatureFlagService);  // Convert Observables to Signals  isFeatureEnabled = toSignal(this.flagService.getBooleanDetails('my-feature', false));  currentTheme = toSignal(this.flagService.getStringDetails('theme', 'light'));}
```

###### Service Options[​](#service-options "Direct link to Service Options")

The service methods accept the [same options as the directives](#opting-out-of-automatic-re-rendering):

```
const flag$ = this.flagService.getBooleanDetails('my-flag', false, 'my-domain', {  updateOnConfigurationChanged: false, // default: true  updateOnContextChanged: false, // default: true});
```

##### Setting evaluation context[​](#setting-evaluation-context "Direct link to Setting evaluation context")

To set the initial evaluation context, you can add the `context` parameter to the `OpenFeatureModule` configuration. This context can be either an object or a factory function that returns an `EvaluationContext`.

Tip

Updating the context can be done directly via the global OpenFeature API using `OpenFeature.setContext()`

Here’s how you can define and use the initial client evaluation context:

###### Using a static object[​](#using-a-static-object "Direct link to Using a static object")

```
import { NgModule } from '@angular/core';import { CommonModule } from '@angular/common';import { OpenFeatureModule } from '@openfeature/angular-sdk';const initialContext = {  user: {    id: 'user123',    role: 'admin',  },};@NgModule({  imports: [    CommonModule,    OpenFeatureModule.forRoot({      provider: yourFeatureProvider,      context: initialContext,    }),  ],})export class AppModule {}
```

###### Using a factory function[​](#using-a-factory-function "Direct link to Using a factory function")

```
import { NgModule } from '@angular/core';import { CommonModule } from '@angular/common';import { OpenFeatureModule, EvaluationContext } from '@openfeature/angular-sdk';const contextFactory = (): EvaluationContext => loadContextFromLocalStorage();@NgModule({  imports: [    CommonModule,    OpenFeatureModule.forRoot({      provider: yourFeatureProvider,      context: contextFactory,    }),  ],})export class AppModule {}
```

##### Observability considerations[​](#observability-considerations "Direct link to Observability considerations")

Angular's lifecycle can result in flags being evaluated multiple times as a user interacts with a page. If you are using an OpenFeature hook for telemetry, this can result in inflated evaluation metrics. The [OpenFeature debounce hook](https://github.com/open-feature/js-sdk-contrib/tree/main/libs/hooks/debounce) can help to reduce the amount of redundant evaluations reported to your observability platform by limiting the frequency at which evaluation metrics are reported.

#### Type-Safe Flag Keys[​](#type-safe-flag-keys "Direct link to Type-Safe Flag Keys")

For enhanced type safety and autocompletion, you can override flag key types using TypeScript module augmentation. See the [`@openfeature/core` README](https://github.com/open-feature/js-sdk/blob/main/packages/shared/README.md#type-safe-flag-keys) for details.

## FAQ and troubleshooting[​](#faq-and-troubleshooting "Direct link to FAQ and troubleshooting")

> I can import things form the `@openfeature/angular-sdk`, `@openfeature/web-sdk`, and `@openfeature/core`; which should I use?

The `@openfeature/angular-sdk` re-exports everything from its peers (`@openfeature/web-sdk` and `@openfeature/core`), and adds the Angular-specific features. You can import everything from the `@openfeature/angular-sdk` directly. Avoid importing anything from `@openfeature/web-sdk` or `@openfeature/core`.

## Resources[​](#resources "Direct link to Resources")

-   [Example repo](https://github.com/open-feature/angular-test-app)

[Edit this page](https://github.com/open-feature/openfeature.dev/edit/main/docs/reference/sdks/client/web/angular.mdx)