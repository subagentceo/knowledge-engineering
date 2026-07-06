# Edit Jupyter notebooks with AI in VS Code

Visual Studio Code supports working with Jupyter notebooks natively, and through Python code files. The AI features in VS Code can help you in creating and editing notebooks, as well as analyzing and visualizing data. In this article, you learn how to use the AI features in VS Code to work with Jupyter notebooks.

## Scaffold a new notebook

To accelerate getting started with a new notebook, you can use the AI features in VS Code to scaffold a new notebook. Use natural language to provide details about what functionality you want to add and which libraries you want to use.

To create a new notebook with AI, choose either of these options:

*   Type the `/newNotebook` slash command in the chat input box, followed by the details of the notebook to create.
    
*   Choose Agent and type a natural language prompt asking to create a new notebook.
    

See the Prompt examples article for effective notebook prompts.

The following screenshot shows how the output from the agent to the prompt _Create a Jupyter notebook to read data from #housing.csv_ (you can get this dataset from Kaggle):

![Screenshot that shows a new notebook created by the agent that reads the 'housing.csv' file in the workspace.](/assets/docs/agents/notebooks-with-ai/agent-mode-create-new-notebook.png)

Notice that a new `.ipynb` file is created, which contains Markdown and code cells for reading the CSV file and displaying the first few rows of the data.

You can now further edit the notebook manually, or use AI to make inline edits or send follow-up chat requests to modify the notebook.

## Make inline edits in notebook cells

If you already have a notebook and want to make some inline changes in a cell, you can use inline chat, like you would in a code file.

To make inline edits in a cell, press ⌘I (Windows, Linux Ctrl+I). This opens the inline chat view, where you can enter your prompt.

Tip

You can reference kernel variables in your chat prompt. Type `#` followed by the variable name to reference it. For example, if you have a variable named `df`, you can type `#df` in your chat prompt to reference it.

![Screenshot that shows the inline chat view in a notebook cell.](/assets/docs/agents/notebooks-with-ai/notebook-inline-chat.png)

When the response is generated, notice that the code is updated in the notebook cell. You can **Accept** the changes and decide to **Accept and Run** the cell changes.

To generate a new cell with AI, select the **Generate** button in the notebook view, or don't focus on a cell and press ⌘I (Windows, Linux Ctrl+I) to open the inline chat view for a new cell.

## Make edits across multiple cells

To make larger edits, across multiple cells, you can switch to use agents in the Chat view. Provide a prompt to request changes to the notebook and the agent will iterate through the tasks to implement the changes.

![Screenshot that shows the response from chat to the prompt 'Plot a graph of the price distribution'.](/assets/docs/agents/notebooks-with-ai/notebook-agent-mode-plot-prices.png)

Notice that you can use the overlay controls to navigate between the different edit suggestions, and to keep or undo the changes.

## Ask questions about notebook content

You can use the chat interface to ask questions about the content of your notebook. This is useful for getting explanations of code, data, or visualizations. You can add extra context to your chat request, such as the cell output, graphs, or errors.

The following example shows how to ask questions about a visualization in a notebook.

1.  Select `...` next to the graph, and select **Add Cell Output to Chat** to add the chart as context to your chat request.
    
    ![Screenshot that shows the context menu for a graph in a notebook cell.](/assets/docs/agents/notebooks-with-ai/notebook-ask-mode-add-cell-output.png)
    
2.  Enter the prompt _Explain this chart_ in the chat input field.
    
    Notice that you get a detailed explanation of the chart.
    
    ![Screenshot that shows the response from chat to the prompt 'Explain this chart'.](/assets/docs/agents/notebooks-with-ai/notebook-ask-mode-explain-chart.png)
    

## Perform data analysis and visualization

You can do a full data analysis and visualization notebook of a dataset by using agents in chat. The agent analyzes the dataset, and then scaffolds a new notebook, implements the code for performing the data analysis, and runs the cells to process and visualize the data. As needed, the agent invokes relevant tools and terminal commands to complete its tasks.

For example, to perform a data analysis of the housing dataset:

1.  Select Agent from the agent picker in the Chat view.
    
2.  Enter the following prompt in the chat input field: _Perform data analysis of the data in #housing.csv_.
    
    Notice that the agent iterates through the different tasks. When needed, approve the tool and command invocations.
    
3.  The result is a new notebook with a complete data analysis of the dataset, including data cleaning, data visualization, and statistical analysis.
    
    ![Screenshot that shows the response from chat to the prompt 'Perform data analysis of the data in housing.csv'.](/assets/docs/agents/notebooks-with-ai/notebook-agent-mode-data-analysis.png)
    

You can now further edit the notebook manually, or use AI to make inline edits or send follow-up chat requests to modify the notebook.

## Next steps

*   Learn more about Jupyter notebooks in VS Code
*   Learn more about the AI features in VS Code
*   Learn more about chat in VS Code

7/1/2026