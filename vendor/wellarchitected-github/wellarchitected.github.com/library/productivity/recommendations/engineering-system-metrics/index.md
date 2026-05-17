[Content Library](/library/)

[⚙️ Productivity](/library/productivity/)

[Recommendations](/library/productivity/recommendations/)

Engineering System Metrics

# Engineering System Metrics

Kitty Chiu·[@kittychiu](https://github.com/kittychiu)

April 24, 2025

|

Updated December 10, 2025

## Recommendation overview[](#recommendation-overview)

How well your DevSecOps system performs goes beyond merely measuring the outputs of individual developers (e.g. lines of code) and systems (e.g. number of workflow runs). You need to seek clarity on your system’s leading and lagging indicators, so that your working focus is on the leading indicators that provide early signals and enable steering of the downstream impacts.

[Engineering System Success](../../design-principles/#design-for-engineering-system-success) goes beyond engineering excellence - it focuses on optimization. Success is to work altogether with a foundation of quality, velocity, and developer happiness, to drive improvements in desired business outcomes.

## Key design strategies and checklist[](#key-design-strategies-and-checklist)

-   Are the performance metrics balanced, encompassing the people, process, and technology aspects of the engineering system?
-   Have you tailored the performance metrics to your specific organization/team needs?
-   Are the performance metrics balanced between leading and lagging indicators to enable early signals, learning, and interventions?
-   Are the performance metrics supported by both qualitative and quantitative data?
-   Are the data collected reliable, and the collection process and cadence consistent?
-   Are the performance metrics considered for possible gamification and incentive misalignment?

## Assumptions and preconditions[](#assumptions-and-preconditions)

This recommendation recognises the leading DevEx and DevOps metrics frameworks like [SPACE](https://queue.acm.org/detail.cfm?id=3454124), [DevEx](https://queue.acm.org/detail.cfm?id=3595878), [DX Core 4](https://getdx.com/research/measuring-developer-productivity-with-the-dx-core-4/), and [DORA](https://dora.dev/).

## Four zones and twelve metrics[](#four-zones-and-twelve-metrics)

### Four zones of engineering system success[](#four-zones-of-engineering-system-success)

Taking a layered approach, _Business Outcomes_ sits at the top, supported by foundations of _Quality_, _Velocity_, and _Developer Happiness_:

-   **Business outcomes**: Ship code that enables the business to innovate and meet their strategic objectives with increasing efficiency.
-   **Quality**: Ship secure, reliable, and easily maintainable code.
-   **Velocity**: Ship regularly and at a pace that can help you meet business needs.
-   **Developer happiness**: Developers are enabled to do their best work and experience satisfaction.

### Twelve primary metrics[](#twelve-primary-metrics)

For each zone, there are three suggested downstream metrics to improve engineering performance, as shown in the table below.

Quality

Velocity

Developer happiness

Business outcomes

Change failure rate

(Median) Lead time

(Median) Flow state experience

(Percentage) AI leverage

(Median) Failed deployment recovery time

Deployment frequency

(Median) Engineering tooling satisfaction

(Percentage) Engineering expenses to revenue

(Median) Code security and maintainability

(Mean) PRs merged per developer

(Median) Copilot satisfaction

(Percentage) Feature engineering expenses to total engineering expenses

Each organization’s context can differ and may prefer different downstream metrics.

## Additional solution detail and trade-offs to consider[](#additional-solution-detail-and-trade-offs-to-consider)

### Data integration[](#data-integration)

The calculation of the twelve metrics should align with your specific workflows, tech stack, and tools. It is important to understand your teams’ workflows to determine which data to use from GitHub or other data sources in your engineering system. Data integration from systems like ITSM tools or incident management platforms may be required for metrics such as lead time or recovery time. Work with business owners to define key metrics like “production failure” and “in production” to ensure consistency.

### Qualitative and quantitative data[](#qualitative-and-quantitative-data)

Metrics like tooling satisfaction or change failure rate can may be complimented with developer surveys, offering valuable insights without adding complexity. Surveys are particularly useful for organizations still developing DevEx or DevOps metrics. Leaders should balance the effort and benefits of telemetry-based measurement versus qualitative feedback.

### Companion metrics for insight[](#companion-metrics-for-insight)

You may employ companion metrics to provide context to these primary metrics, offering insights to the performance. For example, pairing lead time with change failure rate ensures shorter lead times reflect real improvements rather than rushed deployments. Striking the right balance is key — too many metrics can dilute focus, while too few risk misinterpretation. Individual teams should tailor companion metrics to their workflows, ensuring a holistic view of the engineering system is captured.

### Metrics are interdependent[](#metrics-are-interdependent)

These four zones are a form of companion metric-thinking by highlighting their interdependence. Improvements in one zone should complement others, avoiding trade-offs that undermine overall success. This balanced approach fosters sustainable engineering system performance aligned with business goals.

### Balance cost and benefits of measurement[](#balance-cost-and-benefits-of-measurement)

Strike a pragmatic balance between measurement effort and benefits by implementing critical metrics first, leveraging existing data sources, automating collection pipelines, and regularly evaluating each metric’s relevancy. Remain cautious about potential suboptimization or gaming behaviors for incentive rather than actual engineering system success.

## Seeking further assistance[](#seeking-further-assistance)

### GitHub Support[](#github-support)

Visit the [GitHub Support Portal](https://support.github.com/) for a comprehensive collection of articles, tutorials, and guides on using GitHub features and services.

Can’t find what you’re looking for? You can contact GitHub Support by [opening a ticket](https://support.github.com/contact).

### GitHub Expert Services[](#github-expert-services)

GitHub’s [Expert Services Team](https://github.com/services) is here to help you architect, implement, and optimize a solution that meets your unique needs. [Contact us](https://github.com/services#services-contact) to learn more about how we can help you.

### GitHub Partners[](#github-partners)

GitHub partners with the world’s leading technology and service providers to help our customers achieve their end-to-end business objectives. Find a GitHub Partner that can help you with your specific needs [here](https://portal.github.partners/#/page/directory).

### GitHub Community[](#github-community)

Join the [GitHub Community Forum](https://github.com/orgs/community/discussions?discussions_q=label%3A%22GitHub+Well-Architected%22) to ask questions, share knowledge, and connect with other GitHub users. It’s a great place to get advice and solutions from experienced users.

## Related links[](#related-links)

### GitHub Documentation[](#github-documentation)

For more details about GitHub’s features and services, check out [GitHub Documentation](https://docs.github.com/).

Explore further on four zones and twelve metrics in the [Engineering System Success Playbook](https://resources.github.com/engineering-system-success-playbook/).

Last updated on December 10, 2025

[Adopting GitHub Copilot at Scale](/library/productivity/recommendations/adopting-copilot-at-scale/ "Adopting GitHub Copilot at Scale")