---
title: "Rust"
description: "Learn how to set up Sentry's Rust SDK for error monitoring and performance tracking."
url: https://docs.sentry.io/platforms/rust/
---

# Rust | Sentry for Rust

On this page, we get you up and running with Sentry's Rust SDK.

If you don't already have an account and Sentry project established, head over to [sentry.io](https://sentry.io/signup/), then return to this page.

Using a framework? Check out the other SDKs we support in the left-hand dropdown.

## Related Guides

* [![rust.actix-web icon](https://docs.sentry.io/_next/static/media/actix.dddf55da.svg)](https://docs.sentry.io/platforms/rust/guides/actix-web.md)
  #### [Actix Web](https://docs.sentry.io/platforms/rust/guides/actix-web.md)
* [![rust.axum icon](https://docs.sentry.io/_next/static/media/tokio.46967d11.svg)](https://docs.sentry.io/platforms/rust/guides/axum.md)
  #### [axum](https://docs.sentry.io/platforms/rust/guides/axum.md)
* [![rust.tracing icon](https://docs.sentry.io/_next/static/media/tracing.7f2ce724.svg)](https://docs.sentry.io/platforms/rust/guides/tracing.md)
  #### [tokio-rs/tracing](https://docs.sentry.io/platforms/rust/guides/tracing.md)

## [Install](https://docs.sentry.io/platforms/rust.md#install)

To add Sentry to your Rust project, add a new dependency to your `Cargo.toml`:

`Cargo.toml`

```toml
[dependencies]
sentry = "0.48.2"
```

## [Configure](https://docs.sentry.io/platforms/rust.md#configure)

The most convenient way to use this library is the `sentry::init` function, which starts a Sentry client with a default set of integrations, and binds it to the current Hub.

The `sentry::init` function returns a guard that when dropped, will flush Events that weren't yet sent to Sentry. It has a two-second deadline, so application shutdown may be slightly delayed as a result. Be sure to keep the guard or you won't be able to send events.

`main.rs`

```rust
let _guard = sentry::init(("___PUBLIC_DSN___", sentry::ClientOptions {
    release: sentry::release_name!(),
    // Capture user IPs and potentially sensitive headers when using HTTP server integrations
    // see https://docs.sentry.io/platforms/rust/data-management/data-collected for more info
    send_default_pii: true,
    ..Default::default()
}));
```

**Important:** Remember your DSN. The DSN (Data Source Name) tells the SDK where to send events. If you forget it, you can find it by going to: Settings -> Projects -> Client Keys (DSN) in sentry.io.

### [Async Main Function](https://docs.sentry.io/platforms/rust.md#async-main-function)

In a multithreaded application, spawned threads should inherit the Hub from the main thread. In order for that to happen, the Sentry client must be initialized before starting an async runtime or spawning threads. This means you'll have to avoid using macros such as `#[tokio::main]` or `#[actix_web::main]`, because they start the runtime first. So rather than doing this:

`main.rs`

```rust
// WRONG
#[tokio::main]
async fn main() {
let _guard = sentry::init(("___PUBLIC_DSN___", sentry::ClientOptions {
    release: sentry::release_name!(),
    // Capture user IPs and potentially sensitive headers when using HTTP server integrations
    // see https://docs.sentry.io/platforms/rust/data-management/data-collected for more info
    send_default_pii: true,
    ..Default::default()
}));

// implementation of main
}
```

Do this instead:

`main.rs`

```rust
// RIGHT
fn main() {
let _guard = sentry::init(("___PUBLIC_DSN___", sentry::ClientOptions {
    release: sentry::release_name!(),
    // Capture user IPs and potentially sensitive headers when using HTTP server integrations
    // see https://docs.sentry.io/platforms/rust/data-management/data-collected for more info
    send_default_pii: true,
    ..Default::default()
}));

tokio::runtime::Builder::new_multi_thread()
        .enable_all()
        .build()
        .unwrap()
        .block_on(async {
            // implementation of main
        });
}
```

## [Verify Setup](https://docs.sentry.io/platforms/rust.md#verify-setup)

The quickest way to verify Sentry in your Rust application is to cause a panic:

`main.rs`

```rust
fn main() {
    let _guard = sentry::init(("___PUBLIC_DSN___", sentry::ClientOptions {
        release: sentry::release_name!(),
        // Capture user IPs and potentially sensitive headers when using HTTP server integrations
        // see https://docs.sentry.io/platforms/rust/data-management/data-collected for more info
        send_default_pii: true,
        ..Default::default()
    }));

    // Sentry will capture this
    panic!("Everything is on fire!");
}
```

## [Integrations](https://docs.sentry.io/platforms/rust.md#integrations)

*Integrations* extend the functionality of the SDK for some common frameworks and libraries.

A list of integrations and their feature flags can be found [in the integration API docs](https://docs.rs/sentry/0/sentry/integrations/index.html).

If you keep debug information files in the produced binary, rather than strip them down or split them, do not add the `debug_images` integration and the corresponding `debug-images` feature flag, as it will collide with the built-in debug file processing.

Conflicts could lead to UI warning messages in Sentry, as it can be interpreted as a problem with debug files and processing your error. See this [comment](https://github.com/getsentry/sentry-rust/issues/574#issuecomment-1534316787) and connected issue for more information.

## [More Information](https://docs.sentry.io/platforms/rust.md#more-information)

* [API Docs](https://docs.rs/sentry)
* [Crates.io page](https://crates.io/crates/sentry)
* [Bug Tracker](https://github.com/getsentry/sentry-rust/issues)
* [GitHub Project](https://github.com/getsentry/sentry-rust)

## [Next Steps](https://docs.sentry.io/platforms/rust.md#next-steps)

* Explore [practical guides](https://docs.sentry.io/guides.md) on what to monitor, log, track, and investigate after setup

## Frameworks

- [Actix Web](https://docs.sentry.io/platforms/rust/guides/actix-web.md)
- [axum](https://docs.sentry.io/platforms/rust/guides/axum.md)
- [tokio-rs/tracing](https://docs.sentry.io/platforms/rust/guides/tracing.md)

## Topics

- [Extended Configuration](https://docs.sentry.io/platforms/rust/configuration.md)
- [Capturing Errors](https://docs.sentry.io/platforms/rust/usage.md)
- [Enriching Events](https://docs.sentry.io/platforms/rust/enriching-events.md)
- [Source Context](https://docs.sentry.io/platforms/rust/source-context.md)
- [Data Management](https://docs.sentry.io/platforms/rust/data-management.md)
- [Tracing](https://docs.sentry.io/platforms/rust/tracing.md)
- [Logs](https://docs.sentry.io/platforms/rust/logs.md)
- [Metrics](https://docs.sentry.io/platforms/rust/metrics.md)
- [User Feedback](https://docs.sentry.io/platforms/rust/user-feedback.md)
- [Security Policy Reporting](https://docs.sentry.io/platforms/rust/security-policy-reporting.md)
- [Troubleshooting](https://docs.sentry.io/platforms/rust/troubleshooting.md)
