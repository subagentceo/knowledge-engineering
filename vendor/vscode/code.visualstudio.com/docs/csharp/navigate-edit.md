# Navigate and Edit

The navigation and editing tools described in this overview are enabled by the C# Dev Kit extension, a lightweight extension to enhance your C# development experience in Visual Studio Code.

## Code Navigation

With the Outline view, you can conveniently navigate the members within the current file. Installing the C# Dev Kit extension also gives you the Solution Explorer view. This view helps you add, manage, and modify your projects contained within a larger solution without switching between the command line and the editor.

## Go To Definition

The **Go To Definition** feature navigates to the source or file of a type or member, and opens the result in a new tab. If you are a keyboard user, place your text cursor somewhere inside the symbol name and press F12. If you are a mouse user, either right-click the symbol name and select **Go To Definition** from the context menu or Ctrl+click the symbol name. You can also use Ctrl+Alt+click to open the definition on the side.

![Go to Definition example](/assets/docs/csharp/navigate-edit/go-to-definition.gif)

## Peek Definition

You can take a quick look at how a symbol was defined by using the **Peek Definition** feature. This feature displays a few lines of code near the definition inside a peek window, so you can take a look without navigating away from your current location.

To peek at a symbol's definition, place your cursor on the symbol anywhere it's used in your source code and then press ⌥F12 (Windows Alt+F12, Linux Ctrl+Shift+F10). Alternatively, you can choose **Peek Definition** from the context menu (right-click, then choose **Peek > Peek Definition**).

![Peek Definition example](/assets/docs/csharp/navigate-edit/peek-definition.gif)

## Peek Implementations

You can take a quick, inline view at how and where a class, method, or symbol was implemented using the **Peek Implementations** feature.

To view the list of implementation locations, place the cursor on the symbol anywhere it's used in your source code and then press ⇧⌘F12 (Windows, Linux Ctrl+Shift+F12). Alternatively, you can choose **Peek Implementations** from the context menu (right-click, then choose **Peek > Peek Implementations**).

## Peek References

You can get an inline list of sources where a selected symbol has been referenced in your code using the **Peek References** feature. Place the cursor on the symbol anywhere it's used in your source code, right-click, then choose **Peek > Peek References**.

![Peek References example](/assets/docs/csharp/navigate-edit/peek-references.gif)

## Collapse or expand code snippets

To better view the source code, hover over the editor gutter to collapse or expand code snippets using the caret that appears.

![Collapse or expand code snippet example](/assets/docs/csharp/navigate-edit/collapse-or-expand-code-snippets.gif)

## Smart selection

With smart selection (semantic selection), you can expand or shrink the selection range based on the semantic information of the caret position in your source code.

*   To expand the selection, use ⌃⇧⌘→ (Windows, Linux Shift+Alt+Right)
*   To shrink the selection, use ⌃⇧⌘← (Windows, Linux Shift+Alt+Left)

## Inlay hints

Inlay hints are subtle annotations that appear inline in your code to provide additional context about your code elements. In C#, these hints can show parameter names at call sites, type information for variables, and other helpful details that make your code more readable without having to navigate to the definition. These hints can be particularly helpful when working with methods that have multiple parameters or when type inference makes it less obvious what type a variable is.

![Inlay hints examples](/assets/docs/csharp/navigate-edit/inlay-hints.png)

To change which inlay hints you want to enable or disable, view the csharp.inlayHints Open in VS Code Open in VS Code Insiders settings.

6/6/2023