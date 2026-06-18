---
title: "Java"
url: https://docs.sentry.io/platforms/java/
---

# Java | Sentry for Java

Sentry's Java SDK enables capturing sessions for Release health as well as reporting messages and errors.

Sentry for Java is a collection of modules provided by Sentry; it supports Java 1.8 and above. At its core, Sentry for Java provides a raw client for sending events to Sentry. To begin, we **highly recommend** you use one of the logging libraries or framework integrations.

The Sentry Java SDK can be used with Kotlin, Scala, and other JVM languages. Code examples are typically provided in both Java and Kotlin.

On this page, we get you up and running with Sentry's SDK.

##### Using a framework?

Check out the other SDKs we support in the left-hand dropdown.

Don't already have an account and Sentry project established? Head over to [sentry.io](https://sentry.io/signup/), then return to this page.

## [Install](https://docs.sentry.io/platforms/java.md#install)

Sentry captures data by using an SDK within your application’s runtime.

Error Monitoring\[ ]Tracing\[ ]Profiling\[ ]Logs\[x]OpenTelemetry

**\[groovy] build.gradle**

```groovy
plugins {
  id "io.sentry.jvm.gradle" version "6.11.0"
}
// ___PRODUCT_OPTION_START___ profiling
dependencies {
  implementation 'io.sentry:sentry-async-profiler:8.44.0'
}
// ___PRODUCT_OPTION_END___ profiling
```

**\[Maven Plugin] pom.xml**

```xml
<plugin>
  <groupId>io.sentry</groupId>
  <artifactId>sentry-maven-plugin</artifactId>
  <version>0.11.0</version>
  <!-- Required to allow auto-install of Sentry SDK and Integrations -->
  <extensions>true</extensions>
  <configuration>
    <!-- In case you're self hosting, provide the URL here -->
    <!-- <url>http://localhost:8000/</url> -->
    <org>___SENTRY_ORG_SLUG___</org>
    <project>___SENTRY_PROJECT_SLUG___</project>
    <!-- Do not commit your auth token with this file, you should provide it via the SENTRY_AUTH_TOKEN environment variable or similar -->
    <!-- <authToken>${env.SENTRY_AUTH_TOKEN}</authToken> -->
    <authToken>___SENTRY_AUTH_TOKEN___</authToken>
    <!-- Enable debugging to see logs in case something goes wrong when uploading the source bundle -->
    <debugSentryCli>true</debugSentryCli>
   </configuration>
   <executions>
    <execution>
      <goals>
        <!-- Generates a source bundle and uploads it to Sentry -->
        <!-- This enables source context, allowing you to see your source code as part of your stack traces in Sentry -->
        <!-- Learn more about this feature in its dedicated "Source Context" docs page -->
        <goal>uploadSourceBundle</goal>
        <!--  Validates Sentry SDK dependency versions. -->
        <!--  Mixing SDK dependency versions can result in build or run time errors. -->
        <!--  If mixed versions are detected, the build will fail. -->
        <goal>validateSdkDependencyVersions</goal>
      </goals>
    </execution>
  </executions>
</plugin>
// ___PRODUCT_OPTION_START___ profiling
<dependencies>
  <dependency>
      <groupId>io.sentry</groupId>
      <artifactId>sentry-async-profiler</artifactId>
      <version>8.44.0</version>
  </dependency>
</dependencies>
// ___PRODUCT_OPTION_END___ profiling
```

**SBT**

```scala
libraryDependencies += "io.sentry" % "sentry" % "8.44.0"
// ___PRODUCT_OPTION_START___ profiling
libraryDependencies += "io.sentry" % "sentry-async-profiler" % "8.44.0"
// ___PRODUCT_OPTION_END___ profiling
```

We recommend using our Gradle plugin as it can add integrations and provide source context for events.

If you are manually adding multiple Sentry dependencies, you can add a [bill of materials](https://docs.sentry.io/platforms/java/configuration/bill-of-materials.md) to avoid specifying the version of each dependency.

When running your application, please add our `sentry-opentelemetry-agent` to the `java` command.

Download the latest version of the `sentry-opentelemetry-agent-8.44.0.jar` from [MavenCentral](https://search.maven.org/artifact/io.sentry/sentry-opentelemetry-agent):

```bash
curl https://repo1.maven.org/maven2/io/sentry/sentry-opentelemetry-agent/8.44.0/sentry-opentelemetry-agent-8.44.0.jar -o sentry-opentelemetry-agent-8.44.0.jar
```

Then run your application with:

```bash
SENTRY_PROPERTIES_FILE=sentry.properties JAVA_TOOL_OPTIONS="-javaagent:sentry-opentelemetry-agent-8.44.0.jar" java -jar your-application.jar
```

*Other available variations of the above snippet: Java CLI argument*

## [Configure](https://docs.sentry.io/platforms/java.md#configure)

Configuration should happen as early as possible in your application's lifecycle.

```java
import io.sentry.Sentry;

Sentry.init(options -> {
  options.setDsn("https://<key>@o<orgId>.ingest.sentry.io/<projectId>");

  // Add data like request headers and IP for users,
  // see https://docs.sentry.io/platforms/java/data-management/data-collected/ for more info
  options.setSendDefaultPii(true);
  // ___PRODUCT_OPTION_START___ performance

  // Set traces_sample_rate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production.
  options.setTracesSampleRate(1.0);
  // ___PRODUCT_OPTION_END___ performance
  // ___PRODUCT_OPTION_START___ profiling

  // Enable profiling
  options.setProfileSessionSampleRate(1.0);
  options.setProfileLifecycle(ProfileLifecycle.TRACE);
  // ___PRODUCT_OPTION_END___ profiling
  // ___PRODUCT_OPTION_START___ logs

  // Enable logs to be sent to Sentry
  options.getLogs().setEnabled(true);
  // ___PRODUCT_OPTION_END___ logs
});
```

*Other available variations of the above snippet: Kotlin*

Learn more about setting up logging in our [Logs documentation](https://docs.sentry.io/platforms/java/logs.md).

The SDK can be configured using a `sentry.properties` file:

```properties
dsn=https://<key>@o<orgId>.ingest.sentry.io/<projectId>
# Add data like request headers and IP for users,
# see https://docs.sentry.io/platforms/java/data-management/data-collected/ for more info
send-default-pii=true
# ___PRODUCT_OPTION_START___ performance
traces-sample-rate=1.0
# ___PRODUCT_OPTION_END___ performance
// ___PRODUCT_OPTION_START___ logs
logs.enabled=true
// ___PRODUCT_OPTION_END___ logs
// ___PRODUCT_OPTION_START___ profiling

# Enable profiling
profile-session-sample-rate=1.0
profile-lifecycle=TRACE
// ___PRODUCT_OPTION_END___ profiling
```

Learn more about setting up logging in our [Logs documentation](https://docs.sentry.io/platforms/java/logs.md).

## [Verify](https://docs.sentry.io/platforms/java.md#verify)

This snippet includes an intentional error, so you can test that everything is working as soon as you set it up.

```java
import io.sentry.Sentry;

try {
  throw new Exception("This is a test.");
} catch (Exception e) {
  Sentry.captureException(e);
}
```

*Other available variations of the above snippet: Kotlin*

Learn more about manually capturing an error or message in our [Usage documentation](https://docs.sentry.io/platforms/java/usage.md).

To view and resolve the recorded error, log into [sentry.io](https://sentry.io) and select your project. Clicking on the error's title will open a page where you can see detailed information and mark it as resolved.

## [Next Steps](https://docs.sentry.io/platforms/java.md#next-steps)

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup

## Frameworks

- [java.util.logging](https://docs.sentry.io/platforms/java/guides/jul.md)
- [Log4j 2.x](https://docs.sentry.io/platforms/java/guides/log4j2.md)
- [Logback](https://docs.sentry.io/platforms/java/guides/logback.md)
- [Servlet](https://docs.sentry.io/platforms/java/guides/servlet.md)
- [Spring](https://docs.sentry.io/platforms/java/guides/spring.md)
- [Spring Boot](https://docs.sentry.io/platforms/java/guides/spring-boot.md)

## Topics

- [Capturing Errors](https://docs.sentry.io/platforms/java/usage.md)
- [Enriching Events](https://docs.sentry.io/platforms/java/enriching-events.md)
- [Extended Configuration](https://docs.sentry.io/platforms/java/configuration.md)
- [Logs](https://docs.sentry.io/platforms/java/logs.md)
- [Integrations](https://docs.sentry.io/platforms/java/integrations.md)
- [Tracing](https://docs.sentry.io/platforms/java/tracing.md)
- [Application Metrics](https://docs.sentry.io/platforms/java/metrics.md)
- [Data Management](https://docs.sentry.io/platforms/java/data-management.md)
- [Profiling](https://docs.sentry.io/platforms/java/profiling.md)
- [Security Policy Reporting](https://docs.sentry.io/platforms/java/security-policy-reporting.md)
- [Crons](https://docs.sentry.io/platforms/java/crons.md)
- [User Feedback](https://docs.sentry.io/platforms/java/user-feedback.md)
- [Feature Flags](https://docs.sentry.io/platforms/java/feature-flags.md)
- [Source Context](https://docs.sentry.io/platforms/java/source-context.md)
- [Gradle](https://docs.sentry.io/platforms/java/gradle.md)
- [Maven](https://docs.sentry.io/platforms/java/maven.md)
- [OpenTelemetry Support](https://docs.sentry.io/platforms/java/opentelemetry.md)
- [Migration Guides](https://docs.sentry.io/platforms/java/migration.md)
- [Troubleshooting](https://docs.sentry.io/platforms/java/troubleshooting.md)
- [Legacy SDK (1.7)](https://docs.sentry.io/platforms/java/legacy.md)
