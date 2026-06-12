# Custom Properties Best Practices

Libraries

Governance

Recommendations

Managing Repositories at Scale

Custom Properties Best Practices

# Custom Properties Best Practices

Collin McNeese·@collinmcneese

September 2, 2025

## Scenario overview

Organizations need consistent metadata to govern repositories at scale, track compliance requirements, and make informed decisions about their codebase. GitHub repository custom properties provide structured metadata that enables automated governance, improves visibility across repositories, and supports regulatory compliance requirements.

## Key design strategies and checklist

1.  **Define your metadata schema**
    *   Identify governance problems custom properties will solve (compliance tracking, ownership, criticality classification).
    *   Design property types that support automated decision-making and policy enforcement.
    *   Plan for organizational growth and potential schema evolution.
2.  **Start with core governance properties**
    *   Begin with properties that address immediate pain points (owner identification, business criticality).
    *   Focus on metadata that enables automation rather than just manual reporting.
3.  **Establish property governance**
    *   Create RACI matrix for property definition, updates, and enforcement.
    *   Document property meanings, valid values, and usage guidelines.
4.  **Automate property management**
    *   Use APIs and scripts to populate properties at repository creation.
    *   Configure required properties that must be set during repository creation workflow.
    *   Implement validation and drift detection to maintain data quality.
5.  **Integrate with policy enforcement**
    *   Connect custom properties to repository rulesets for automated governance.
    *   Use properties to trigger different workflows and security policies.
6.  **Plan for enterprise-wide consistency**
    *   Start with organization-level properties and promote to enterprise level when patterns emerge.
    *   Balance central control with team autonomy for property values.

### Quick checklist

Area

Action

Schema Design

Property schema documented; governance use cases defined

Property Coverage

≥90% active repositories have required properties populated

Automation

API scripts for property management and validation

Integration

Properties integrated with rulesets and workflow automation

Documentation

Property meanings and usage guidelines published

Compliance

Audit trail for property changes via API logging

## Assumptions and preconditions

*   Clear understanding of organizational governance requirements and compliance frameworks.
*   Agreement on repository classification and metadata taxonomy.
*   Plan availability for custom properties - GitHub allows up to 100 property definitions per organization.
*   Required roles:
    *   Organization owners or custom role with the ability to manage repository custom properties for organization-level properties
    *   Enterprise owners for enterprise-level property management
    *   Repository users with appropriate permissions for setting property values (if delegated).

## Recommended implementation

### 1. Core property schema

Define properties that address your most pressing governance needs. Start with a minimal set and expand based on proven value. The following table provides example properties that many organizations find useful, but you should customize based on your specific governance requirements:

Property

Type

Purpose

Example Values

business-criticality

single-select

Risk assessment and policy targeting

Critical, High, Medium, Low

owner-team

string

Responsibility and escalation

“platform-team”, “customer-experience”

compliance-frameworks

multi-select

Regulatory requirement tracking

SOX, HIPAA, GDPR, PCI, FedRAMP

data-classification

single-select

Data handling requirements

Public, Internal, Confidential, Restricted

environment

single-select

Deployment tier classification

Production, Staging, Development, Sandbox

public-facing

true_false

External exposure assessment

true, false

ℹ️

For public repositories, avoid properties that could expose sensitive organizational information. Consider using generic classifications rather than specific internal project names or security postures.

**Example property configurations** for different repository types:

```yaml
# Financial services repository (SOX, PCI DSS)
compliance-frameworks: ["SOX", "PCI-DSS"]
data-classification: "Restricted"
business-criticality: "Critical"
environment: "Production"
public-facing: "true"

# Platform service repository
service-tier: "Platform"
business-criticality: "Critical"
owner-team: "platform-ops"
environment: "Production"

# Legacy modernization candidate
tech-stack: ["Java", "Spring Boot"]
architecture-pattern: "Monolith"
modernization-candidate: "true"
migration-priority: "High"
business-criticality: "Medium"
```

### 2. Integration with repository rulesets

Connect custom properties to automated policy enforcement through repository rulesets. While rulesets define the “what” of your governance policies, custom properties enable the “when” and “where” - allowing you to apply different governance rules based on repository characteristics rather than manually managing which repositories get which rules.

Read more on working with rulesets in repository rulesets best practices.

This integration solves common governance challenges:

*   **Scalable policy application**: Instead of manually adding repositories to rulesets, properties enable dynamic targeting. As your organization grows from dozens to hundreds of repositories, this automation becomes essential.
*   **Context-aware enforcement**: A development sandbox repository may not need to have the same security requirements as a production payment processing service. Properties allow rulesets to automatically adjust enforcement based on risk level, compliance requirements, and operational context.
*   **Compliance audit trails**: Properties create clear documentation of why certain repositories have specific security controls, making it easier to demonstrate compliance during audits.

**Production Repository Ruleset Targeting**:

*   Target repositories where `environment = "Production"` OR `business-criticality = "Critical"`
*   Apply enhanced security requirements: required approvals, code scanning, deployment gates

**Compliance Framework Enforcement**:

*   Target repositories where `compliance-frameworks` includes “SOX” or “HIPAA”
*   Enforce signed commits, restrict file paths, require security workflows

**Public-Facing Application Controls**:

*   Target repositories where `public-facing = true`
*   Require additional security scanning, dependency review, and deployment validation

### 3. Integration with repository policies

Custom properties enable flexible targeting for repository policies that govern repository lifecycle events such as creation, deletion, naming, and visibility changes. These policies can be implemented at both organization and enterprise levels for scalable governance.

When custom properties are marked as required for repository creation, teams must set these properties during the repository setup process, which may influence repository naming and visibility choices.

**Example policy targeting:**

*   Prevent repositories with `data-classification = "Restricted"` from being made public
*   Require repositories with `service-type = "microservice"` to use `svc-` prefix for operational clarity
*   Restrict deletion of repositories where `environment = "Production"` to organization owners only

### 4. Reporting and monitoring

Implement monitoring to track property coverage and identify governance gaps. Without visibility into property adoption and accuracy, organizations face several practical challenges:

*   **Compliance blind spots**: During regulatory audits, organizations need to quickly demonstrate which repositories handle regulated data and what controls apply. Missing or incorrect properties can result in audit findings or unnecessary remediation work on misclassified repositories.
*   **Security incident response**: When vulnerabilities affect specific technologies or components, security teams need to rapidly identify all repositories using those technologies. Without accurate technical metadata, teams spend valuable time manually inventorying affected systems during incidents.
*   **Governance drift**: Properties assigned during repository creation often become outdated as projects evolve. A repository’s risk profile or operational context may change over time, requiring different governance controls. Regular monitoring helps identify these changes before they create compliance or security gaps.

An example method for scanning repository properties involves using the GitHub API to retrieve custom property values for all repositories in an organization, then identifying those that are missing required properties or have outdated values.

```bash
gh api orgs/ORG/properties/values --paginate | jq -r '
  .[] |
  "\(.repository_name),\((.properties[] | select(.property_name == "business-criticality") | .value) // "MISSING"),\((.properties[] | select(.property_name == "owner-team") | .value) // "MISSING")"
' | column -t -s,
```

For more targeted analysis, you can use the `repository_query` parameter to focus on specific repositories. For example, to find only repositories missing the `business-criticality` property:

```bash
gh api 'orgs/ORG/properties/values?repository_query=no:props.business-criticality' --paginate | jq -r '
  .[].repository_name
'
```

## Additional solution detail and trade-offs to consider

### Choosing the right scope for your properties

When implementing custom properties, one of the first decisions is whether to start at the organization level or think enterprise-wide from the beginning.

**Start with organization-level properties when:**

*   Piloting the approach or working within a single business unit
*   You need to iterate quickly and test different property schemas
*   Proving value before expanding to other organizations
*   Working with smaller, more agile teams

**Move to enterprise-level properties when:**

*   You need consistency across multiple organizations
*   Compliance requirements demand standardized metadata
*   You have proven patterns that work across business units
*   Centralized governance becomes more important than speed

Keep in mind that **enterprise-level properties require more coordination** and slower change management - you’ll need buy-in from multiple stakeholders before making schema changes.

### Managing who can set property values

The question of **who controls property values significantly impacts adoption and data quality**.

**Centralized control** works well for compliance-critical properties where consistency matters more than speed:

*   Governance teams manage values for properties like `data-classification`
*   Ensures accuracy and regulatory compliance
*   May create bottlenecks for new repositories
*   Best for highly regulated environments

**Delegated management** increases adoption and reduces friction:

*   Repository teams can set operational metadata
*   Requires clear documentation about property meanings
*   Works well for team ownership, project status, tech stack
*   Risk of inconsistent or incorrect metadata

**Hybrid approach** (most common):

*   **Governance teams control**: compliance properties (regulatory frameworks, data classification)
*   **Teams self-manage**: operational properties (environment designation, tech stack)
*   Requires clear boundaries and good documentation to prevent confusion

### Maintaining data quality over time

**Properties become stale as repositories evolve.** A repository might start as a proof-of-concept but eventually handle production traffic, changing its risk profile entirely.

**Automated validation** helps catch obvious problems:

*   Use GitHub Actions workflows to check properties during pull requests or deployments
*   Validate missing required properties, invalid values, or unclassified repositories
*   Generate alerts for properties that need attention

**Regular auditing** is equally important but often overlooked:

*   **Schedule regular reviews** to compare property values against reality
*   Check whether repositories marked as “Development” are actually handling production workloads
*   Verify properties align with external systems (CMDB, service catalogs)
*   Update properties based on organizational changes

**Start simple.** Begin with **5-6 essential properties** that solve real problems rather than trying to capture every possible piece of metadata. You can always expand later once the foundational patterns are working well.

⚠️

Avoid creating too many properties initially. Start with essential properties and expand based on proven value. Too many properties can create maintenance overhead and reduce adoption.

## Seeking further assistance

### GitHub Support

Visit the GitHub Support Portal for a comprehensive collection of articles, tutorials, and guides on using GitHub features and services.

Can’t find what you’re looking for? You can contact GitHub Support by opening a ticket.

### GitHub Expert Services

GitHub’s Expert Services Team is here to help you architect, implement, and optimize a solution that meets your unique needs. Contact us to learn more about how we can help you.

### GitHub Partners

GitHub partners with the world’s leading technology and service providers to help our customers achieve their end-to-end business objectives. Find a GitHub Partner that can help you with your specific needs here.

### GitHub Community

Join the GitHub Community Forum to ask questions, share knowledge, and connect with other GitHub users. It’s a great place to get advice and solutions from experienced users.

## Related links

### GitHub Documentation

For more details about GitHub’s features and services, check out GitHub Documentation.

Specific custom properties documentation can be found here:

*   Managing custom properties for repositories in your organization
*   Managing custom properties for repositories in your enterprise
*   Using the API to manage custom properties
*   Repository search syntax

Last updated on September 2, 2025

Managing Repositories at ScaleRulesets Best Practices