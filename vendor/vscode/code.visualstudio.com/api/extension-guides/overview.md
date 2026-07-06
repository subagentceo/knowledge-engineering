# Extension Guides

Once you have learned the basics of Visual Studio Code Extension API in the Hello World sample, it's time to build some real-world extensions. While the Extension Capabilities section offers high-level overviews of what an extension **can** do, this section contains a list of detailed code guides and samples that explains **how** to use a specific VS Code API.

In each guide or sample, you can expect to find:

*   Thoroughly commented source code.
*   A gif or image showing the usage of the sample extension.
*   Instructions for running the sample extension.
*   Listing of VS Code API being used.
*   Listing of Contribution Points being used.
*   Real-world extensions resembling the sample.
*   Explanation of API concepts.

## Guides & Samples

Here are the guides on the VS Code website, including their usage of the VS Code API and Contribution Points. Don't forget to refer to the UX Guidelines to learn the user interface best practices for creating extensions.

Guide on VS Code Website

API & Contribution

Command

commands  
contributes.commands

Color Theme

contributes.themes

File Icon Theme

contributes.iconThemes

Product Icon Theme

contributes.productIconThemes

Tree View

window.createTreeView  
window.registerTreeDataProvider  
TreeView  
TreeDataProvider  
contributes.views  
contributes.viewsContainers

Webview

window.createWebviewPanel  
window.registerWebviewPanelSerializer

Custom Editors

window.registerCustomEditorProvider  
CustomTextEditorProvider  
contributes.customEditors

Virtual Documents

workspace.registerTextDocumentContentProvider  
commands.registerCommand  
window.showInputBox

Virtual Workspaces

workspace.fs  
capabilities.virtualWorkspaces

Workspace Trust

workspace.isTrusted  
workspace.onDidGrantWorkspaceTrust  
capabilities.untrustedWorkspaces

Task Provider

tasks.registerTaskProvider  
Task  
ShellExecution  
contributes.taskDefinitions

Source Control

workspace.workspaceFolders  
SourceControl  
SourceControlResourceGroup  
scm.createSourceControl  
TextDocumentContentProvider  
contributes.menus

Debugger Extension

contributes.breakpoints  
contributes.debuggers  
debug

Markdown Extension

markdown.previewStyles  
markdown.markdownItPlugins  
markdown.previewScripts

Test Extension

TestController  
TestItem

Custom Data Extension

contributes.html.customData  
contributes.css.customData

  

Here is a list of additional samples from the VS Code Extensions samples repo.

Sample on GitHub Repo

API & Contribution

Webview Sample

window.createWebviewPanel  
window.registerWebviewPanelSerializer

Status Bar Sample

window.createStatusBarItem  
StatusBarItem

Tree View Sample

window.createTreeView  
window.registerTreeDataProvider  
TreeView  
TreeDataProvider  
contributes.views  
contributes.viewsContainers

Task Provider Sample

tasks.registerTaskProvider  
Task  
ShellExecution  
contributes.taskDefinitions

Multi Root Sample

workspace.getWorkspaceFolder  
workspace.onDidChangeWorkspaceFolders

Completion Provider Sample

languages.registerCompletionItemProvider  
CompletionItem  
SnippetString

File System Provider Sample

workspace.registerFileSystemProvider

Editor Decorator Sample

TextEditor.setDecorations  
DecorationOptions  
DecorationInstanceRenderOptions  
ThemableDecorationInstanceRenderOptions  
window.createTextEditorDecorationType  
TextEditorDecorationType  
contributes.colors

L10N Sample

Terminal Sample

window.createTerminal  
window.onDidChangeActiveTerminal  
window.onDidCloseTerminal  
window.onDidOpenTerminal  
window.Terminal  
window.terminals

Vim Sample

commands  
StatusBarItem  
window.createStatusBarItem  
TextEditorCursorStyle  
window.activeTextEditor  
Position  
Range  
Selection  
TextEditor  
TextEditorRevealType  
TextDocument

Source Control Sample

workspace.workspaceFolders  
SourceControl  
SourceControlResourceGroup  
scm.createSourceControl  
TextDocumentContentProvider  
contributes.menus

Commenting API Sample

Document Editing Sample

commands  
contributes.commands

Getting Started Sample

contributes.walkthroughs

Test extension

TestController  
TestItem

## Language Extension Samples

These samples are Language Extensions samples:

Sample

Guide on VS Code Website

Snippet Sample

/api/language-extensions/snippet-guide

Language Configuration Sample

/api/language-extensions/language-configuration-guide

LSP Sample

/api/language-extensions/language-server-extension-guide

LSP Log Streaming Sample

N/A

LSP Multi Root Server Sample

https://github.com/microsoft/vscode/wiki/Adopting-Multi-Root-Workspace-APIs#language-client--language-server (GitHub repo wiki)

LSP Web Extension Sample

/api/language-extensions/language-server-extension-guide

7/1/2026