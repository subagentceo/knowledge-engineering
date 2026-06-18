

# Developing workflow actions for Amazon CodeCatalyst
<a name="action-development-intro"></a>

Amazon CodeCatalyst provides software development teams one place to plan work, collaborate on code, and build, test, and deploy applications with continuous integration and continuous delivery (CI/CD) tools. For more information, see [What is Amazon CodeCatalyst?](https://docs.aws.amazon.com/codecatalyst/latest/userguide/welcome.html)

In CodeCatalyst, an action is the main building block of a workflow. The actions you author define a logical unit of work to perform during a workflow run. This guide provides steps on how to create custom actions that you can use in workflows and publish to the CodeCatalyst actions catalog for others to use. By creating actions and workflows, you can automate procedures that describe how to build, test, and deploy your code as part of a continuous integration and continuous delivery (CI/CD) system. For more information, see [ Working with actions](https://docs.aws.amazon.com/codecatalyst/latest/userguide/workflows-actions.html).

## Getting started with action development
<a name="adk-intro"></a>

With the Action Development Kit (ADK), you can develop custom actions. This ADK provides tooling and support to help you develop actions using libraries and frameworks. To learn more about ADK, see [Custom actions concepts](adk-concepts.md).

## Testing and publishing custom actions
<a name="adk-intro"></a>

After creating custom actions with the ADK, you can use the CodeCatalyst console to test the custom actions before publishing the actions to the CodeCatalyst actions catalog, where other users can add them to workflows. For more information, see [Working with custom actions](amh-actions.md).

**Important**  
Currently, only verified partners can create custom actions, test unpublished action versions in workflows, and publish actions to the CodeCatalyst actions catalog.