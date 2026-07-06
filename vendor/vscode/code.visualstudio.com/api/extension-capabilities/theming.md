# Theming

In Visual Studio Code, there are three types of themes:

*   **Color Theme**: A mapping from both UI Component Identifier and Text Token Identifier to colors. Color theme allows you to apply your favorite colors to both VS Code UI Components and the text in the editor.
*   **File Icon Theme**: A mapping from file type / file name to images. File icons are displayed across the VS Code UI in places such as File Explorer, Quick Open List, and Editor Tab.
*   **Product Icon Theme**: A set of icons used throughout the UI, from the Side bar, the Activity bar, status bar to the editor glyph margin.

## Color Theme

![color-theme](/assets/api/extension-capabilities/theming/color-theme.png)

As you can see in the illustration, Color Theme defines colors for UI components as well as for highlighting in the editor:

*   The `colors` mapping that controls colors for UI Components.
*   The `tokenColors` define the color and styles for highlighting in the editor. The Syntax Highlight guide has more information on that topic.
*   The `semanticTokenColors` mappings as well as the `semanticHighlighting` setting allow to enhance the highlighting in the editor. The Semantic Highlight guide explains the APIs related to that.

We have a Color Theme guide and a Color Theme sample that illustrates how to create a theme.

## File Icon Theme

File icon themes allow you to:

*   Create a mapping from unique file icon identifiers to images or font icons.
*   Associate files to these unique file icon identifiers by filenames or file language types.

The File Icon Theme guide discusses how to create a File Icon Theme. ![file-icon-theme](/assets/api/extension-capabilities/theming/file-icon-theme.png)

## Product Icon Theme

Product icon themes allow you to:

Redefine all the built-in icons used in the workbench. Examples are the icons in filter action buttons and view icons, in the status bar, breakpoints and the folding icons in trees and the editor.

The Product Icon Theme guide discusses how to create a Product Icon Theme.

7/1/2026