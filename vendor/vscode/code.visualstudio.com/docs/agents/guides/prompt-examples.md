# Prompt examples

This article provides example prompts for chat in Visual Studio Code across different scenarios and agents. Use these examples as inspiration to craft effective prompts for your own development tasks.

If you are new to using chat in VS Code, learn more about getting started with chat or review best practices for prompt crafting.

## General coding and technology questions

Use the **Ask** agent to get quick answers about coding concepts, technology topics, and general programming questions.

```
What is a linked list?
```

```
Provide 3 ways to implement a search feature in React.
```

```
Explain the difference between async/await and promises.
```

## Understanding and exploring your codebase

Use the **Ask** agent with `#codebase` to understand how your project works, locate specific functionality, or explore code relationships.

```
Explain how authentication works in #codebase
```

```
Where is the database connection string configured? #codebase
```

```
How do I build this #codebase?
```

```
Which testing framework is used for #calculator.test.js?
```

## Code generation and editing

Use **Agent** for multi-file creation and **inline chat** (⌘I (Windows, Linux Ctrl+I)) for targeted, in-place edits.

```
Add a login button and style it based on #styles.css
```

```
Create a meal-planning web app using React and Node.js
```

```
Refactor this code to use async/await
```

## Testing and quality assurance

Use **Agent** to generate tests or fix failing tests.

```
Add unit tests for the user service.
```

```
Fix the failing tests #testFailure
```

## Debugging and fixing issues

Use **Agent** for fixing issues across files, or **Ask** to understand the root cause first.

```
Fix the issues in #problems
```

```
Why is this function returning undefined?
```

## Working with source control

Use chat to work with your pending changes and generate release documentation.

```
Summarize the #changes
```

```
Generate release notes based on the #changes
```

## Working with external resources

Use `#fetch` to reference content from the web or use the GitHub MCP server to search for code examples in public GitHub repositories.

```
How do I use the 'useState' hook in react 18? #fetch https://18.react.dev/reference/react/useState#usage
```

```
Build an API endpoint to fetch address info, use the template from GitHub repo contoso/api-templates
```

```
What are the top #extensions for this workspace?
```

## Terminal and command-line tasks

Use terminal inline chat to get help with shell commands and terminal operations.

```
How do I install npm packages?
```

```
List the top 5 largest files in the src directory
```

```
undo the last git commit
```

## Working with Jupyter notebooks

Use **Agent** to create, edit, and work with Jupyter notebooks.

```
/newNotebook use pandas and seaborn to read and visualize the titanic dataset. Show key information from the dataset.
```

```
Create a notebook to read data from #housing.csv and plot the distribution of prices
```

```
Make sure the data is cleaned before visualizing and processing it
```

```
Show the correlation between different features in the dataset
```

## Multi-turn conversation examples

Chat supports follow-up prompts within the same session. Use multi-turn conversations to iterate on results and refine the AI's output.

**First prompt:**

```
Create a REST API with Express.js that has endpoints for users and products
```

**Follow-up prompts:**

```
Add input validation and error handling to both endpoints
```

```
Now add unit tests for the validation logic
```

By building on earlier responses, the AI maintains context from the previous steps and generates more coherent code.

## Tips for crafting effective prompts

*   **Be specific**: Include details about what you want to accomplish, the technologies to use, and the expected output format.
*   **Add context**: Use #-mentions to reference files, symbols, or context variables like `#codebase`, `#changes`, or `#problems`.
*   **Iterate**: Start with a simple prompt and refine it based on the response. Ask follow-up questions to improve the results.
*   **Break down complex tasks**: Instead of asking for everything at once, break large tasks into smaller, manageable steps.

Learn more about best practices for crafting prompts and adding context to your prompts.

## Related resources

*   Chat overview
*   Add context to your chat prompt
*   Inline chat
*   Copilot Chat Cookbook in the GitHub documentation

7/1/2026