# Deploy on AWS

Deploy applications to AWS through a guided five-stage workflow: analyze your codebase, receive service recommendations, get monthly cost estimates, generate Infrastructure as Code (CDK/CloudFormation), and execute deployments — all without leaving your editor. The plugin defaults to dev-sized configurations and makes straightforward decisions automatically, only prompting you when choices are genuinely ambiguous.

Three MCP servers power the experience: **awsknowledge** for architecture validation and AWS documentation, **awspricing** for real-time cost calculations, and **awsiac** for infrastructure-as-code best practices. Security defaults are applied during code generation, and a security check runs before every deployment.

**How to use:** Trigger the deploy skill with natural language prompts such as `deploy to AWS`, `host on AWS`, `estimate AWS cost`, or `generate infrastructure`. For production workloads, specify "production-ready" to get multi-AZ, redundant configurations instead of the default minimal setup. Requires AWS CLI with configured credentials.
