# OpenTelemetry

> The open standard for telemetry

---

LLMS index: [llms.txt](/llms.txt)

---

<link rel="preload" as="image" href="/homepage-hero-background_hu_4ab5d65bd9c2a4bb.png" media="(max-width: 1200px)">
<link rel="preload" as="image" href="/homepage-hero-background_hu_bbf44ed9e8a396f1.png" media="(min-width: 1200px)">
<style>
#td-cover-block-0 {
  background-image: url(/homepage-hero-background_hu_4ab5d65bd9c2a4bb.png);
}
@media only screen and (min-width: 1200px) {
  #td-cover-block-0 {
    background-image: url(/homepage-hero-background_hu_bbf44ed9e8a396f1.png);
  }
}
</style>
<section id="td-cover-block-0" class="row td-cover-block td-cover-block--height-max td-below-navbar td-overlay td-overlay--dark -bg-dark" >
  <div class="col-12">
    <div class="container td-overlay__inner">
      <div class="text-center">
        <div class="pt-3 lead">
          

<!-- prettier-ignore -->
![OpenTelemetry](/img/logos/opentelemetry-horizontal-color.svg)
{.otel-logo}

<!-- prettier-ignore -->
The open standard for telemetry
{.display-6}

<!-- prettier-ignore -->
<div class="td-cta-buttons my-5">
  <a class="btn btn-lg btn-primary" role="button" href="docs/what-is-opentelemetry/">
    Learn More
  </a>
  <a class="btn btn-lg btn-secondary" role="button" href="docs/demo/">
    Try the demo
  </a>
</div>

</div>
      </div>
    </div>
  </div>
  
</section>


<section class="row td-box td-box--white hero-search-section">
  <div class="col-12">
    <div class="container">
      <div class="hero-search">
        <div class="hero-search__input-wrapper">
          <div class="td-search hero-search__search">
            <div class="td-search__icon"></div>
            <input
              type="search"
              data-bs-toggle="popover"
              data-bs-trigger="focus"
              data-bs-html="true"
              data-bs-content='&lt;a id=&#39;ask-ai-trigger&#39; href=&#39;#&#39;&gt;Ask AI&lt;/a&gt; (&amp;#x2318;-K)'
              class="td-search__input form-control td-search-input"
              placeholder="Search OpenTelemetry docs..."
              aria-label="Search OpenTelemetry docs..."
              autocomplete="off">
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<section class="row td-box td-box--white intro-section">
  <div class="col-12">
    <div class="container">
      <div class="intro-content">
        <div class="intro-text">
          

**OpenTelemetry** is an open source observability framework for cloud native
software. It provides a single set of APIs, libraries, agents, and collector
services to capture distributed traces and metrics from your application.

OpenTelemetry builds upon years of experience from the OpenTracing and
OpenCensus projects, combined with best-of-breed ideas and practices from the
community.

</div>
        <div class="intro-image">
          <img src="/img/homepage/collector-pipeline.svg" alt="OpenTelemetry overview" class="img-fluid">
        </div>
        </div>
    </div>
  </div>
</section>


<section class="main-features-section">
  <div class="main-features">
    

<div class="main-feature-wrapper">
  <div class="main-feature main-feature--image-left">
    <div class="main-feature__image">
      
      <img src="/img/homepage/data-sources.svg" alt="Vendor-neutral instrumentation" loading="lazy">
      
    </div>
    <div class="main-feature__content">
      <h3 class="main-feature__title">Vendor-neutral instrumentation</h3>
      <div class="main-feature__description">
        <p>Instrument your code once using OpenTelemetry APIs and SDKs. Export telemetry
data to any observability backend—Jaeger, Prometheus, commercial vendors, or
your own solution. Switch backends without touching your application code.</p>
</div>
    </div>
  </div>
</div>


<div class="main-feature-wrapper">
  <div class="main-feature main-feature--image-right">
    <div class="main-feature__image">
      
      <img src="/img/homepage/unified-signals.svg" alt="Unified observability signals" loading="lazy">
      
    </div>
    <div class="main-feature__content">
      <h3 class="main-feature__title">Unified observability signals</h3>
      <div class="main-feature__description">
        <p>Correlate traces, metrics, and logs with shared context that flows through your
entire request path. Get a complete picture of your application&rsquo;s behavior
across all components and services.</p>
</div>
    </div>
  </div>
</div>


<div class="main-feature-wrapper">
  <div class="main-feature main-feature--image-left">
    <div class="main-feature__image">
      
      <img src="/img/homepage/global-deployment.svg" alt="Run anywhere" loading="lazy">
      
    </div>
    <div class="main-feature__content">
      <h3 class="main-feature__title">Run anywhere</h3>
      <div class="main-feature__description">
        <p>OpenTelemetry is 100% open source and vendor-neutral. Deploy on-premises, in
hybrid environments, or across multiple clouds with full flexibility and zero
lock-in. Move workloads wherever they matter to you.</p>
</div>
    </div>
  </div>
</div>



  </div>
</section>


<section class="row signals-showcase-section">
  <div class="col-12">
    <div class="container">
      
      <h2 class="signals-showcase__title">Observability Signals</h2>
      
      <div class="signals-showcase__grid">
        
<a href="/docs/concepts/signals/traces/" class="signal-card">
  <div class="signal-card__icon"><img src="/img/homepage/signal-traces.svg" alt="Traces" class="signal-card__img"></div>
  <div class="signal-card__name">Traces</div>
  
    <div class="signal-card__description">Distributed traces</div>
  
</a>

<a href="/docs/concepts/signals/metrics/" class="signal-card">
  <div class="signal-card__icon"><img src="/img/homepage/signal-metrics.svg" alt="Metrics" class="signal-card__img"></div>
  <div class="signal-card__name">Metrics</div>
  
    <div class="signal-card__description">Measurements over time</div>
  
</a>

<a href="/docs/concepts/signals/logs/" class="signal-card">
  <div class="signal-card__icon"><img src="/img/homepage/signal-logs.svg" alt="Logs" class="signal-card__img"></div>
  <div class="signal-card__name">Logs</div>
  
    <div class="signal-card__description">Timestamped records</div>
  
</a>

<a href="/docs/concepts/signals/baggage/" class="signal-card">
  <div class="signal-card__icon"><img src="/img/homepage/signal-baggage.svg" alt="Baggage" class="signal-card__img"></div>
  <div class="signal-card__name">Baggage</div>
  
    <div class="signal-card__description">Contextual metadata</div>
  
</a>
 
      </div>
    </div>
  </div>
</section>


<section class="row td-box td-box--white otel-features-section">
  <div class="col-12">
    <div class="container">
      
      <h2 class="otel-features__title text-center">OpenTelemetry Features</h2>
      
      
      <div class="otel-features otel-features--cols-2">
        

<div class="otel-feature"><div class="otel-feature__icon">
    <img src="/img/homepage/feature-auto-instrumentation.svg" alt="Auto-instrumentation" class="otel-feature__img">
  </div><h3 class="otel-feature__title"><a href="/docs/concepts/instrumentation/zero-code/">Auto-instrumentation</a></h3>
  <div class="otel-feature__description">
    Get started in minutes with zero-code instrumentation for popular frameworks and
libraries. Automatic instrumentation agents capture traces, metrics, and logs
without modifying your source code.
  </div>
</div>


<div class="otel-feature"><div class="otel-feature__icon">
    <img src="/img/homepage/feature-pipeline.svg" alt="Collector pipeline" class="otel-feature__img">
  </div><h3 class="otel-feature__title"><a href="/docs/collector/">Collector pipeline</a></h3>
  <div class="otel-feature__description">
    Process, filter, and route telemetry data with the OpenTelemetry Collector.
Deploy as an agent or gateway to receive, process, and export telemetry at scale
with 200+ components.
  </div>
</div>


<div class="otel-feature"><div class="otel-feature__icon">
    <img src="/img/homepage/feature-observability.svg" alt="Context propagation" class="otel-feature__img">
  </div><h3 class="otel-feature__title"><a href="/docs/concepts/context-propagation/">Context propagation</a></h3>
  <div class="otel-feature__description">
    Automatically correlate traces across service boundaries. Distributed context
flows through your entire request path, connecting logs, metrics, and traces
into a unified view.
  </div>
</div>


<div class="otel-feature"><div class="otel-feature__icon">
    <img src="/img/homepage/feature-multi-language.svg" alt="Multi-language support" class="otel-feature__img">
  </div><h3 class="otel-feature__title"><a href="/docs/languages/">Multi-language support</a></h3>
  <div class="otel-feature__description">
    Native SDKs for 12+ languages including Java, Kotlin, Python, Go, JavaScript,
.NET, Ruby, PHP, Rust, C++, Swift, and Erlang. Use your preferred language with
first-class OpenTelemetry support.
  </div>
</div>


<div class="otel-feature"><div class="otel-feature__icon">
    <img src="/img/homepage/feature-production-ready.svg" alt="Stable and production-ready" class="otel-feature__img">
  </div><h3 class="otel-feature__title"><a href="/status/">Stable and production-ready</a></h3>
  <div class="otel-feature__description">
    Tracing and metrics APIs are stable across all major languages. Thousands of
organizations run OpenTelemetry in production. Backed by the CNCF and major
cloud providers.
  </div>
</div>


<div class="otel-feature"><div class="otel-feature__icon">
    <img src="/img/homepage/feature-openness.svg" alt="Open specifications" class="otel-feature__img">
  </div><h3 class="otel-feature__title"><a href="/docs/specs/status/">Open specifications</a></h3>
  <div class="otel-feature__description">
    Built on open, vendor-neutral specifications for APIs, SDKs, and the wire
protocol (OTLP). Transparent governance under the CNCF ensures long-term
stability and community-driven evolution.
  </div>
</div>



      </div>
    </div>
  </div>
</section>


<section class="row td-box td-box--primary ecosystem-stats-section">
  <div class="col-12">
    <div class="container">
      
      <h2 class="text-center mb-4">The OpenTelemetry Ecosystem</h2>
      
      <div class="ecosystem-stats">
        
<div class="ecosystem-stat">
  <div class="ecosystem-stat__number"><a href="/docs/languages/">12&#43;</a></div>
  <div class="ecosystem-stat__label">Languages</div>
</div>

<div class="ecosystem-stat">
  <div class="ecosystem-stat__number"><a href="/docs/collector/">200&#43;</a></div>
  <div class="ecosystem-stat__label">Collector Components</div>
</div>

<div class="ecosystem-stat">
  <div class="ecosystem-stat__number"><a href="/ecosystem/registry/">1007&#43;</a></div>
  <div class="ecosystem-stat__label">Integrations</div>
</div>

<div class="ecosystem-stat">
  <div class="ecosystem-stat__number"><a href="/ecosystem/vendors/">101&#43;</a></div>
  <div class="ecosystem-stat__label">Vendors</div>
</div>


      </div>
    </div>
  </div>
</section>


<section class="row td-box td-box--white adopters-showcase-section">
  <div class="col-12">
    <div class="container">
      
      <h2 class="adopters-showcase__title">Trusted by Industry Leaders</h2>
      
      <div class="adopters-showcase__grid"><a href="/blog/2025/otip-alibaba/" class="adopters-showcase__item" target="_blank" rel="noopener" title="Alibaba - blog post"><img src="https://cdn.brandfetch.io/alibaba.com/w/120/h/50" alt="Alibaba logo" loading="lazy"></a><a href="/blog/2022/why-and-how-ebay-pivoted-to-opentelemetry/" class="adopters-showcase__item" target="_blank" rel="noopener" title="eBay - blog post"><img src="https://cdn.brandfetch.io/ebay.com/w/120/h/50" alt="eBay logo" loading="lazy"></a><a href="https://github.blog/2021-05-26-why-and-how-github-is-adopting-opentelemetry/" class="adopters-showcase__item" target="_blank" rel="noopener" title="GitHub - blog post"><img src="https://cdn.brandfetch.io/github.com/w/120/h/50" alt="GitHub logo" loading="lazy"></a><a href="https://youtu.be/5iM8n3uCo_U?si=PJ6tFYcYED3lhAcK" class="adopters-showcase__item" target="_blank" rel="noopener" title="Heroku - CNCF talk"><img src="https://cdn.brandfetch.io/heroku.com/w/120/h/50" alt="Heroku logo" loading="lazy"></a><a href="https://medium.com/mercadolibre-tech/building-a-large-scale-observability-ecosystem-1edf654b249e" class="adopters-showcase__item" target="_blank" rel="noopener" title="Mercado Libre - blog post"><img src="https://cdn.brandfetch.io/mercadolibre.com/w/120/h/50" alt="Mercado Libre logo" loading="lazy"></a><a href="https://www.shopify.com/" class="adopters-showcase__item" target="_blank" rel="noopener" title="Shopify"><img src="https://cdn.brandfetch.io/shopify.com/w/120/h/50" alt="Shopify logo" loading="lazy"></a><a href="https://www.infoq.com/presentations/opentelemetry-observability/" class="adopters-showcase__item" target="_blank" rel="noopener" title="Skyscanner - presentation"><img src="https://cdn.brandfetch.io/skyscanner.com/w/120/h/50" alt="Skyscanner logo" loading="lazy"></a><a href="https://engineering.uipath.com/scaling-observability-with-opentelemetry-adx-how-we-improve-the-monitoring-with-cost-reduced-42100a99b89a" class="adopters-showcase__item" target="_blank" rel="noopener" title="UiPath - blog post"><img src="https://cdn.brandfetch.io/uipath.com/w/120/h/50" alt="UiPath logo" loading="lazy"></a><a href="https://colocatedeventseu2023.sched.com/event/1Jo8E/ingesting-65-tb-of-telemetry-data-daily-through-open-telemetry-protocol-and-collectors-gustavo-pantuza-vtex" class="adopters-showcase__item" target="_blank" rel="noopener" title="VTEX - presentation"><img src="https://cdn.brandfetch.io/vtex.com/w/120/h/50" alt="VTEX logo" loading="lazy"></a><a href="https://www.youtube.com/watch?v=VAgT7CY572U" class="adopters-showcase__item" target="_blank" rel="noopener" title="Zalando - conference talk"><img src="https://cdn.brandfetch.io/zalando.com/w/120/h/50" alt="Zalando logo" loading="lazy"></a></div>
      <div class="adopters-showcase__cta">
        <a href="/ecosystem/adopters/" class="btn btn-primary">View all adopters →</a>
      </div>
    </div>
  </div>
</section>


<div><a id="td-block-8" class="td-anchor-no-extra-offset"></a></div>
<section class="row td-box td-box--secondary td-box--height-auto">
<div class="col">
<div class="cncf">



**OpenTelemetry is a [CNCF][] [graduated][] project**.<br> Formed through a
merger of the OpenTracing and OpenCensus projects.

[![CNCF logo][]][cncf]

[cncf]: https://cncf.io
[cncf logo]: /img/logos/cncf-white.svg
[graduated]: https://www.cncf.io/projects/

</div>
</div>
</section>

---

Section pages:

- [Announcements](/announcements/)
- [API references](/api/)
- [Blog](/blog/): OpenTelemetry blog
- [Community](/community/)
- [Documentation](/docs/)
- [OpenTelemetry Ecosystem](/ecosystem/): OpenTelemetry's thriving ecosystem of components, examples, integrations and vendors
- [Search Results](/search/)
- [Status](/status/): Maturity-level of the main OpenTelemetry components
- [Training](/training/): OpenTelemetry certifications and courses
- [About this website](/site/): How this site is built, maintained, and deployed.
