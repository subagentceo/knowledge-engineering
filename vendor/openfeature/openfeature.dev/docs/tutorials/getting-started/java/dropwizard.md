# Getting Started with the OpenFeature Java SDK and Dropwizard

## Introduction[​](#introduction "Direct link to Introduction")

This walk-through teaches you the basics of using OpenFeature in Java in the context of a Dropwizard application.

You'll learn how to:

-   Integrate the OpenFeature Java SDK
-   Install and configure the OpenFeature provider
-   Perform basic feature flagging

## Requirements[​](#requirements "Direct link to Requirements")

This walk-through assumes that:

-   You have a basic knowledge of Java and Dropwizard
-   You have Java 8 or later
-   You have Docker installed and running on the host system

This guide uses Java 21 syntax, adjustments might be needed for earlier Java versions.

## Walk-through[​](#walk-through "Direct link to Walk-through")

### Step 1: Create a Dropwizard application[​](#step-1-create-a-dropwizard-application "Direct link to Step 1: Create a Dropwizard application")

Create a new Dropwizard application following the guide on [dropwizard.io](https://www.dropwizard.io/en/stable/getting-started.html).

For this example we are using the maven archetype

```
$ mvn archetype:generate -DarchetypeGroupId=io.dropwizard.archetypes -DarchetypeArtifactId=java-simple -DarchetypeVersion=4.0.13...Define value for property 'name': OpenFeatureExample...Define value for property 'groupId': dev.openfeatureDefine value for property 'artifactId': openfeature-exampleDefine value for property 'version' 1.0-SNAPSHOT:Define value for property 'package' dev.openfeature:Confirm properties configuration:name: OpenFeatureExampledescription: nullshaded: truegroupId: dev.openfeatureartifactId: openfeature-exampleversion: 1.0-SNAPSHOTpackage: dev.openfeature Y: Y...
```

We now have an application we can open

```
cd openfeature-example
```

### Step 2: Add dependencies[​](#step-2-add-dependencies "Direct link to Step 2: Add dependencies")

For dropwizard we can either use the SDK directly, or use a community module [dropwizard-openfeature](https://github.com/sideshowcoder/dropwizard-openfeature), and while dropwizard-openfeature provides some benefits like built-in healthchecks, and managing the startup and shutdown of resources associated with the OpenFeature Java SDK, it is not however not officially supported, so use at your own risk.

Depending what you choose add the following to your `pom.xml`

-   sdk-only
-   dropwizard-openfeature

```
<dependency>    <groupId>dev.openfeature</groupId>    <artifactId>sdk</artifactId>    <version>1.20.1</version></dependency><dependency>    <groupId>dev.openfeature.contrib.providers</groupId>    <artifactId>flagd</artifactId>    <version>0.11.8</version></dependency>
```

```
<dependency>    <groupId>io.github.sideshowcoder</groupId>    <artifactId>dropwizard-openfeature</artifactId>    <version>1.0.1</version></dependency>
```

### Step 3: Create a resource[​](#step-3-create-a-resource "Direct link to Step 3: Create a resource")

We create a resource to serve the `/welcome` endpoint. Depending on the value of the feature flag named `"welcome-message"`, it serves different messages.

```
@Path("/welcome")@Produces(TEXT_PLAIN)public class WelcomeResource {    private final Client client;    public WelcomeResource(Client client) {        this.client = client;    }    @GET    public String getWelcome() {        if(client.getBooleanValue("welcome-message", false)) {            return "Welcome to OpenFeature in Dropwizard!\n";        }        return "Welcome!\n";    }}
```

to make this resource available we need to register it, and inject the OpenFeature `Client`.

```
public class OpenFeatureExampleApplication extends Application<OpenFeatureExampleConfiguration> {    public static void main(final String[] args) throws Exception {        new OpenFeatureExampleApplication().run(args);    }    @Override    public String getName() {        return "OpenFeatureExample";    }    @Override    public void initialize(final Bootstrap<OpenFeatureExampleConfiguration> bootstrap) {        // TODO: application initialization    }    @Override    public void run(final OpenFeatureExampleConfiguration configuration, final Environment environment) {        // TODO: implement application        var client = OpenFeatureAPI.getInstance().getClient("dev.openfeature.OpenFeatureExample");        var welcomeResource = new WelcomeResource(client);        environment.jersey().register(welcomeResource);    }}
```

### Step 4: Run the application[​](#step-4-run-the-application "Direct link to Step 4: Run the application")

Now we can build and run the initial version of the application.

```
$ mvn clean package$ java -jar target/openfeature-example-1.0-SNAPSHOT.jar server config.ymlINFO  [2025-06-13 10:00:00,000] io.dropwizard.core.server.DefaultServerFactory: Registering jersey handler with root path prefix: /INFO  [2025-06-13 10:00:00,000] io.dropwizard.core.server.DefaultServerFactory: Registering admin handler with root path prefix: /INFO  [2025-06-13 10:00:00,000] io.dropwizard.core.server.ServerFactory: Starting OpenFeatureExample================================================================================                              OpenFeatureExample================================================================================INFO  [2025-06-13 10:00:00,000] org.eclipse.jetty.setuid.SetUIDListener: Opened application@748e9b20{HTTP/1.1, (http/1.1)}{0.0.0.0:8080}INFO  [2025-06-13 10:00:00,000] org.eclipse.jetty.setuid.SetUIDListener: Opened admin@2063c53e{HTTP/1.1, (http/1.1)}{0.0.0.0:8081}INFO  [2025-06-13 10:00:00,000] org.eclipse.jetty.server.Server: jetty-11.0.25; built: 2025-03-13T00:15:57.301Z; git: a2e9fae3ad8320f2a713d4fa29bba356a99d1295; jvm 21+35INFO  [2025-06-13 10:00:00,000] io.dropwizard.jersey.DropwizardResourceConfig: The following paths were found for the configured resources:    GET     /welcome (com.sideshowcoder.resources.WelcomeResource)...
```

In the output we can see the resource being available under `/welcome` as well as the application listening to `http://0.0.0.0:8080`, where `0.0.0.0` refers to all interfaces. Using `curl` we can see the application working.

```
$ curl -i http://localhost:8080/welcomeHTTP/1.1 200 OKDate: Fri, 13 Jun 2025 10:00:00 GMTContent-Type: text/plainVary: Accept-EncodingContent-Length: 9Welcome!
```

"Why I'm I seeing that value?", you may ask. Well, it's because a provider hasn't been configured yet. Without a provider to actually evaluate flags, OpenFeature will return the default value. In the next step, you'll learn how to add a provider.

### Step 5: Configure flagd as a provider[​](#step-5-configure-flagd-as-a-provider "Direct link to Step 5: Configure flagd as a provider")

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

Now we configure flagd as the provider in our application

-   sdk-only
-   dropwizard-openfeature

```
public class OpenFeatureExampleApplication extends Application<OpenFeatureExampleConfiguration> {    public static void main(final String[] args) throws Exception {        new OpenFeatureExampleApplication().run(args);    }    @Override    public String getName() {        return "OpenFeatureExample";    }    @Override    public void initialize(final Bootstrap<OpenFeatureExampleConfiguration> bootstrap) {        // nothing to do here    }    @Override    public void run(final OpenFeatureExampleConfiguration configuration, final Environment environment) {        // Use flagd as the OpenFeature provider and use default configurations        try {            OpenFeatureAPI.getInstance().setProviderAndWait(new FlagdProvider());        } catch (OpenFeatureError e) {            throw new RuntimeException("Failed to set OpenFeature provider", e);        }        var client = OpenFeatureAPI.getInstance().getClient("dev.openfeature.OpenFeatureExample");        var welcomeResource = new WelcomeResource(client);        environment.jersey().register(welcomeResource);    }}
```

Add the bundle configuration to the existing application configuration

```
public class OpenFeatureExampleConfiguration extends Configuration {public class OpenFeatureExampleConfiguration extends Configuration implements OpenFeatureBundleConfiguration {    // TODO: implement service configuration    @Valid    @NotNull    @JsonProperty    private OpenFeatureConfiguration openfeature;    @Override    public OpenFeatureConfiguration getOpenFeatureConfiguration() {        return openfeature;    }}
```

add the bundle configuration to the `config.yml` file

```
---logging:  level: INFO  loggers:    dev.openfeature: DEBUGopenfeature:  provider: flagd
```

initialize the bundle

```
public class OpenFeatureExampleApplication extends Application<OpenFeatureExampleConfiguration> {    public static void main(final String[] args) throws Exception {        new OpenFeatureExampleApplication().run(args);    }    @Override    public String getName() {      return "OpenFeatureExample";    }    @Override    public void initialize(final Bootstrap<OpenFeatureExampleConfiguration> bootstrap) {        bootstrap.addBundle(new OpenFeatureBundle());    }    @Override    public void run(final OpenFeatureExampleConfiguration configuration, final Environment environment) {        var client = OpenFeatureAPI.getInstance().getClient("dev.openfeature.OpenFeatureExample");        var welcomeResource = new WelcomeResource(client);        environment.jersey().register(welcomeResource);    }}
```

> NOTE: dropwizard-openfeature not only configures the provider, but also adds a healthcheck and hooks the provider into the application startup and shutdown lifecycle.

### Step 6: Rerun the application[​](#step-6-rerun-the-application "Direct link to Step 6: Rerun the application")

We can now rerun the application

```
$ mvn clean package$ java -jar target/openfeature-example-1.0-SNAPSHOT.jar server config.ymlINFO  [2025-06-13 10:00:00,000] io.dropwizard.core.server.DefaultServerFactory: Registering jersey handler with root path prefix: /INFO  [2025-06-13 10:00:00,000] io.dropwizard.core.server.DefaultServerFactory: Registering admin handler with root path prefix: /INFO  [2025-06-13 10:00:00,000] io.dropwizard.core.server.ServerFactory: Starting OpenFeatureExample================================================================================OpenFeatureExample================================================================================INFO  [2025-06-13 10:00:00,000] org.eclipse.jetty.setuid.SetUIDListener: Opened application@748e9b20{HTTP/1.1, (http/1.1)}{0.0.0.0:8080}INFO  [2025-06-13 10:00:00,000] org.eclipse.jetty.setuid.SetUIDListener: Opened admin@2063c53e{HTTP/1.1, (http/1.1)}{0.0.0.0:8081}INFO  [2025-06-13 10:00:00,000] org.eclipse.jetty.server.Server: jetty-11.0.25; built: 2025-03-13T00:15:57.301Z; git: a2e9fae3ad8320f2a713d4fa29bba356a99d1295; jvm 21+35INFO  [2025-06-13 10:00:00,000] io.dropwizard.jersey.DropwizardResourceConfig: The following paths were found for the configured resources:GET     /welcome (com.sideshowcoder.resources.WelcomeResource)...
```

Using `curl` to again fetch the `/welcome` resource will show again the default message

```
$ curl -i http://localhost:8080/welcomeHTTP/1.1 200 OKDate: Fri, 13 Jun 2025 10:00:00 GMTContent-Type: text/plainVary: Accept-EncodingContent-Length: 9Welcome!
```

Let's change the feature flag in our `flags.flagd.json`, making `defaultVariant` to `on`

```
{  "flags": {    "welcome-message": {      "variants": {        "on": true,        "off": false      },      "state": "ENABLED",      "defaultVariant": "off"      "defaultVariant": "on"    }  }}
```

fetching `/welcome` now will show the message for `"welcome-message"` being `true`.

```
$ curl -i http://localhost:8080/welcomeHTTP/1.1 200 OKDate: Fri, 13 Jun 2025 10:00:00 GMTContent-Type: text/plainVary: Accept-EncodingContent-Length: 38Welcome to OpenFeature in Dropwizard!
```

## Conclusion[​](#conclusion "Direct link to Conclusion")

In this walkthrough we learned how to integrate OpenFeature into a Dropwizard application, using flagd to provide the feature flags at runtime. We saw how changing the flags definition can change the runtime behaviour of our application, without the need to redeploy or restart the application.