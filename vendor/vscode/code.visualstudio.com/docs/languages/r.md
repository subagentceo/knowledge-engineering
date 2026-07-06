# R in Visual Studio Code

The R programming language is a dynamic language built for statistical computing and graphics. R is commonly used in statistical analysis, scientific computing, machine learning, and data visualization.

The R extension for Visual Studio Code supports extended syntax highlighting, code completion, linting, formatting, interacting with R terminals, viewing data, plots, workspace variables, help pages, managing packages and working with R Markdown documents.

![Overview](/assets/docs/languages/r/overview.png)

## Getting started

1.  Install R (>= 3.4.0) for your platform. For Windows users, it is recommended to check **Save version number in registry** during installation so that the R extension can find the R executable automatically.
    
2.  Install `languageserver` in R.
    
    ```
    install.packages("languageserver")
    ```
    
3.  Install the R extension for Visual Studio Code.
    
4.  Create an R file and start coding.
    

To enhance the experience of using R in VS Code, the following software and packages are recommended:

*   radian: A modern R console that corrects many limitations of the official R terminal and supports many features such as syntax highlighting and auto-completion.
    
*   httpgd: An R package to provide a graphics device that asynchronously serves SVG graphics via HTTP and WebSockets. This package is required by the interactive plot viewer of the R extension for VS Code.
    

If you run into any issues installing the R packages or the R extension for VS Code, go to the installation wiki pages (Windows | macOS | Linux) for more details.

## Running R code

Running R code is simply sending code to the R terminal. Before running R code, you could create an R terminal via command **R: Create R terminal** in the Command Palette.

Once an R terminal is ready, you could either select the code or put the cursor at the beginning or ending of the code you want to run, press `(Ctrl+Enter)`, and then code will be sent to the active R terminal.

If you want to run an entire R file, open the file in the editor, and press `Ctrl+Shift+S` and the file will be sourced in the active R terminal.

For more advanced usage such as running multiple R terminals or self-managed R terminals, you can read Interacting with R terminals.

## Code completion (IntelliSense)

The R extension supports code completion and many other code editing features thanks to the R language server. The completion shows the available functions and variables in the scope and the current R workspace along with the documentation from packages or provided as comments.

![Code completion](/assets/docs/languages/r/completion.gif)

## Linting

Linting is a feature that checks the code for warnings and potential errors. R code linting is provided by lintr package. You can customize it by choosing from the list of available linters via the configuration file.

![Linting](/assets/docs/languages/r/linting.gif)

Besides code completion and linting, the R extension also supports other features such as code formatting, go to definition, rename symbol, find references. Read R Language Service for more details.

## Workspace viewer

The workspace viewer is located in the side bar in VS Code and contains the packages in use and global variables in the active R session. Select the R icon in the Activity bar and the workspace viewer and help pages viewer will show up. It is a convenient way to view the R workspace, preview existing R objects, find help topics, and read help pages interactively.

![Workspace Viewer](/assets/docs/languages/r/workspace-viewer.gif)

Besides the workspace viewer, there is also a data viewer, a plot viewer, and a widget viewer. Read Interactive viewers for more details.

## Debugging

The R debugging capabilities are provided by R Debugger extension. It supports debugging R code or an R project by launching a new R process or attaching to a running one.

When a breakpoint is hit, you can view or alter the variables of the currently selected stack frame, or evaluate an expression in the debug console in the stack frame.

Read the project README for more details.

## Next steps

This overview is a quick introduction to the R extension for VS Code. Read the extension README for a detailed list of features.

If you have any issues, suggestions or feature requests, please feel free to open an issue at the GitHub repo.

If you'd like to learn more about VS Code, try these topics:

*   Basic Editing - A quick introduction to the basics of the VS Code editor.
*   Install an Extension - Learn about other extensions are available in the Marketplace.
*   Code Navigation - Move quickly through your source code.

7/1/2026