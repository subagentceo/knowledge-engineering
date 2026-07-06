# Best practices for using AI in VS Code

This article covers proven practices for getting the most out of using AI in Visual Studio Code. Each section provides actionable guidance with links to deeper documentation.

## Optimize your project for AI

By configuring your project and codebase with AI in mind, you can improve the accuracy of AI responses and ensure the AI follows your team's coding standards and practices.

VS Code supports several mechanisms to configure AI behavior for your project. Enter `/init` in chat to generate a starter configuration.

Mechanism

Best for

Get started

Custom instructions

Project-wide coding standards and architectural context

Type `/init` to generate always-on instructions for your project

Custom agents

Specialized workflows or personas (TDD, security audit)

Type `/create-agent <description>` to generate a custom agent

Skills

Domain-specific capabilities (testing, deployment)

Type `/create-skill <description>` to generate a skill

Tools and MCP servers

Connecting to external systems (databases, APIs, CLIs)

Configure in `mcp.json`

Tips for effective project configuration:

*   **Keep instruction files concise.** They load on every chat interaction. Focus on information the AI can't infer from code, such as non-default conventions, architectural decisions, or environment setup.
*   **Scope instructions with `applyTo` patterns.** Enter `/instructions` to create language-specific or folder-specific instruction files instead of putting everything in one file.
*   **Limit enabled tools.** Fewer active tools means faster, more relevant responses. Enable tools only when the task needs them.
*   **Exclude generated and noisy files from search.** Configure search.exclude Open in VS Code Open in VS Code Insiders and files.exclude Open in VS Code Open in VS Code Insiders so agent text search and grep stay focused on source code. See improve agent search with exclusion settings.

For full setup details, see Customize agent behavior in VS Code.

## Pick the right tool for the task

AI in VS Code offers several interaction modes. Choosing the right one for the task at hand saves time and produces better results.

Tool

Best for

Example

Inline suggestions

Staying in the flow while writing code

Inline suggestions, variable names, boilerplate

Ask (chat)

Questions, brainstorming, exploring ideas

"How does authentication work in this project?"

Inline chat

Targeted, in-place edits without switching context

Refactoring a function, adding error handling

Agents

Multi-file changes that require autonomous planning and tool use

Implementing a feature end-to-end

Plan

Structured planning before implementation

Designing an architecture or migration strategy

Smart actions

Built-in, specialized one-step tasks

Generating commit messages, fixing errors, renaming symbols

## Choose the right agent type

When working with agents, pick the agent type that matches your task and workflow. Each type trades off interactivity, speed, and isolation differently.

*   **Use local agents for interactive work.** Local agents run in your editor with full access to your workspace, tools, and extensions. Choose them when you need to iterate quickly, review changes as they happen, or use VS Code-specific tools like the integrated browser or MCP servers.
    
*   **Offload well-defined tasks to background agents.** Use Copilot CLI or cloud agents when the task is clear enough that you don't need to watch every step.
    
*   **Use cloud agents for team collaboration.** Cloud agents run remotely and create pull requests, making them ideal for tasks that benefit from team review or when you want to assign a GitHub issue directly to an agent.
    
*   **Run parallel sessions for independent tasks.** Spin up multiple agent sessions, across local, background, and cloud environments, to work on unrelated tasks simultaneously. Monitor them from the sessions list.
    
*   **Hand off between agent types.** Start interactively with a local agent to explore and plan, then hand off to a background or cloud agent for implementation. The conversation history carries over.
    

For more information, see using agents and the agents tutorial.

## Write effective prompts

The quality of AI responses depends on the clarity and specificity of your prompt. These techniques help you get better results.

*   **Be specific about inputs, outputs, and constraints.** State the programming language, frameworks, and libraries you want to use. Describe expected behavior or include example input and output.
    
    ```
    Write a TypeScript function that validates email addresses.
    Return true for valid addresses, false otherwise. Don't use regex.
    Example: validateEmail("user@example.com") returns true
    Example: validateEmail("invalid") returns false
    ```
    
*   **Break down complex tasks.** Instead of asking for an entire feature at once, decompose it into smaller, well-scoped steps. This approach produces more reliable results and makes it easier to catch problems early.
    
*   **Include expected output for verification.** Provide test cases, expected results, or acceptance criteria so the AI can verify its own work. This step is one of the highest-leverage things you can do.
    
    ```
    Implement a rate limiter using the token bucket algorithm.
    Write unit tests that verify: 10 requests/second allowed,
    11th request rejected, bucket refills after 1 second.
    Run the tests after implementing.
    ```
    
*   **Avoid vague prompts.** A prompt like "make this better" gives the AI no direction. Instead, specify what "better" means: "reduce the time complexity" or "add input validation for null values."
    
*   **Iterate with follow-up prompts.** Refine responses by adding constraints or corrections in follow-up messages rather than rewriting the entire prompt.
    
*   **Course-correct early.** If the AI is heading in the wrong direction, steer it with a follow-up message to redirect the current request, queue a follow-up request, or stop and send a new prompt.
    
*   **Tell the AI to ask clarifying questions.** If a task is ambiguous, instruct the AI to ask you questions before proceeding. This leads to more accurate results than guessing at requirements.
    
*   **Parallel tasks.** If you have multiple independent tasks, ask the AI to run them in parallel to save time. For example, "Perform isolated research about X and Y in parallel and summarize the findings."
    

For more information, find practical prompt examples in the GitHub Copilot documentation.

## Provide the right context

The AI responds more accurately when it has relevant context. Use these techniques to point the AI at the right information:

*   The AI automatically performs code search to gather relevant context. When your prompt is ambiguous, you can guide the AI by referencing specific files, folders, or symbols in your prompt with `#<file>`, `#<folder>`, or `#<symbol>`.
    
*   To pull information from web pages or GitHub repositories, use `#fetch` to provide the AI with up-to-date information beyond your codebase or use tools from MCP servers like GitHub MCP.
    
*   Reference VS Code environment context such as source control changes, terminal output, or test failures to help the AI understand the current state of your project and provide more relevant responses.
    
*   Add images or screenshots to let the AI analyze visual content.
    
*   Use the integrated browser to preview your app and select page elements to use as context.
    

For more information, see adding context to chat prompts and configuring tools.

## Choose the right model

Each AI model has different strengths. Some are better at reasoning, others excel at code generation or faster responses. Choosing the right model for your task improves results.

*   **Match model to task complexity.** Use fast models for simple completions and boilerplate. Switch to reasoning-optimized models for planning, debugging, or architectural decisions.
    
*   **Use latest models.** Newer models often have improved capabilities. VS Code continuously adds support for new models and model versions. Check the available models and use the latest models.
    
*   **Pin models in prompt files and agents.** Specify preferred models in your prompt file or custom agent definitions to ensure the right model is used consistently for specific tasks.
    
*   **Experiment and compare.** If you're not satisfied with a response, try a different model. Different models can produce significantly different results for the same prompt.
    
*   **Adjust thinking effort for reasoning models.** Use the thinking effort control in the model picker to increase effort for complex tasks or reduce it for simpler ones.
    
*   **Use BYOK for additional control.** Bring your own API key for more model choices and hosting options.
    
*   **Consider credit consumption.** More capable models consume more AI credits per token. Auto model selection balances quality and cost automatically. For more tips, see optimize AI credit usage.
    

For more information, see selecting AI models and available models for Copilot Chat.

## Plan first, then implement

For complex changes that span multiple files, separate planning from implementation. This approach prevents the AI from solving the wrong problem and avoids spending AI credits on code that needs to be thrown away.

1.  **Explore.** Use ask mode or a subagent to read the relevant code and understand how it works before making changes.
2.  **Plan.** Use the Plan agent to create a structured implementation plan. Review and refine the plan before executing.
3.  **Implement.** Switch to agent mode and implement from the plan. Include tests or expected outputs so the agent can verify its own work. Hand off to a background agent or cloud agent for longer tasks.
4.  **Review.** Use checkpoints to review progress, rewind if the agent goes off track, or request a Copilot code review on the resulting pull request.

For more information, see the context engineering workflow.

## Review and verify AI output

AI-generated code can contain bugs, security issues, or subtle logic errors. Always treat AI output as a starting point that needs review.

*   **Review before accepting.** Read through generated code before accepting changes. Pay attention to edge cases, error handling, and assumptions the AI might have made.
    
*   **Run tests after AI changes.** Include test cases in your prompt so the AI can verify its own work. If the AI doesn't run tests automatically, run them yourself before moving on.
    
*   **Use checkpoints to rewind.** If the agent goes off track, use checkpoints to roll back to a known good state instead of trying to fix cascading errors.
    
*   **Check for security issues.** Review AI-generated code for common vulnerabilities such as injection flaws, hardcoded secrets, or missing input validation. Avoid pasting credentials or sensitive data into prompts.
    

For more information, see GitHub Copilot security and the GitHub Copilot Trust Center.

## Manage context and sessions

AI responses might degrade as the conversation fills with irrelevant context. Manage your sessions proactively.

*   **Start new sessions for unrelated tasks.** Don't keep piling unrelated questions into one conversation. Context pollution reduces response quality and wastes tokens on irrelevant history.
    
*   **Remove irrelevant history.** Delete past questions and responses that are no longer relevant, or start a fresh session.
    
*   **Compact context.** Use /compact and provide instructions to selectively compact the context and retain only the most relevant information. Compacting reduces the tokens sent with each subsequent request, which helps manage AI credit usage.
    
*   **Verify cache performance.** Keep the early parts of your prompt stable across turns to reuse the prompt cache and reduce cost and latency. Use the Cache Explorer to check cache hit rates and find where the cache breaks.
    
*   **Use subagents for investigation.** Hint the AI to perform research and exploration in isolation by using subagents so the findings don't clutter your main context.
    
*   **Choose the right session type.** Use local sessions for quick tasks on your current code that need your immediate attention, background tasks for tasks that can run locally and isolated from your main context, or cloud sessions that can benefit from team-collaboration.
    
*   **Scale with parallel sessions.** Run multiple sessions in parallel for independent tasks to save time and keep contexts separate. You can have multiple sessions running at once, across local, background, and cloud environments, and switch between them via the sessions list in VS Code.
    
*   **Fork instead of re-prompting.** Use `/fork` to explore alternatives without losing context, instead of starting over and re-establishing context from scratch.
    

For more information, see session management, workspace indexing, and optimize AI credit usage.

## Optimize AI credit usage

Many of the practices in this article also help you control cost. More capable models, large contexts, and throwaway work all consume AI credits. A few levers have the biggest impact:

*   **Match the model to the task.** Use faster, cheaper models for simple work and reserve premium models for planning, debugging, and architectural decisions. Auto model selection balances quality and cost for you.
    
*   **Keep context lean.** Send only relevant context, compact long conversations, and start fresh sessions for unrelated tasks to avoid paying for irrelevant history on every request.
    
*   **Plan before you implement.** Separating planning from implementation avoids spending credits on code you throw away.
    

For a complete set of techniques, see optimize AI credit usage.

## Work with large codebases

Copilot is designed to work effectively with large, complex, and multi-root workspaces. Use these practices to get the best results at scale.

*   **Use workspace indexing.** VS Code automatically indexes your project using semantic search, language intelligence, and GitHub's code search for deep cross-file reasoning. This works for both small projects and large enterprise codebases. For large repositories, use remote indexing for fast, comprehensive results across your repository and related repositories on GitHub.
    
*   **Scope work with multi-root workspaces.** For monorepos or projects with multiple services, use multi-root workspaces to give the AI clear boundaries and focused context.
    
*   **Provide project-level instructions.** Use custom instructions to describe your project's architecture, module boundaries, and conventions that the AI can't infer from code alone. This gives the AI the context it needs for architecture-level changes.
    
*   **Run parallel sessions for independent changes.** Break large tasks into independent subtasks and run them in parallel sessions, each focused on a different area of the codebase.
    
*   **Use the Plan agent for cross-cutting changes.** For changes that span many files or modules, start with the Plan agent to create a structured implementation plan before executing.
    

For more information, see workspace context and agents.

## Related resources

*   Context engineering guide
*   Optimize AI credit usage
*   Customize agent behavior in VS Code
*   Cheat sheet
*   GitHub Copilot security
*   Best Practices for using GitHub Copilot in the GitHub Copilot documentation

7/1/2026