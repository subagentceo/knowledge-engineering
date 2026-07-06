# VS Code API

**VS Code API** is a set of JavaScript APIs that you can invoke in your Visual Studio Code extension. This page lists all VS Code APIs available to extension authors.

## API namespaces and classes

This listing is compiled from the vscode.d.ts file from the VS Code repository.

## authentication

Namespace for authentication.

#### Events

onDidChangeSessions: Event<AuthenticationSessionsChangeEvent>

An Event which fires when the authentication sessions of an authentication provider have been added, removed, or changed.

#### Functions

getAccounts(providerId: string): Thenable<readonly AuthenticationSessionAccountInformation[]>

Get all accounts that the user is logged in to for the specified provider. Use this paired with getSession in order to get an authentication session for a specific account.

Currently, there are only two authentication providers that are contributed from built in extensions to the editor that implement GitHub and Microsoft authentication: their providerId's are 'github' and 'microsoft'.

Note: Getting accounts does not imply that your extension has access to that account or its authentication sessions. You can verify access to the account by calling getSession.

Parameter

Description

providerId: string

The id of the provider to use

Returns

Description

Thenable<readonly AuthenticationSessionAccountInformation[]>

A thenable that resolves to a readonly array of authentication accounts.

getSession(providerId: string, scopeListOrRequest: readonly string[] | AuthenticationWwwAuthenticateRequest, options: AuthenticationGetSessionOptions & {createIfNone: true | AuthenticationGetSessionPresentationOptions}): Thenable<AuthenticationSession>

Get an authentication session matching the desired scopes or satisfying the WWW-Authenticate request. Rejects if a provider with providerId is not registered, or if the user does not consent to sharing authentication information with the extension. If there are multiple sessions with the same scopes, the user will be shown a quickpick to select which account they would like to use.

Built-in auth providers include:

*   'github' - For GitHub.com
*   'microsoft' For both personal & organizational Microsoft accounts
*   (less common) 'github-enterprise' - for alternative GitHub hostings, GHE.com, GitHub Enterprise Server
*   (less common) 'microsoft-sovereign-cloud' - for alternative Microsoft clouds

Parameter

Description

providerId: string

The id of the provider to use

scopeListOrRequest: readonly string[] | AuthenticationWwwAuthenticateRequest

A scope list of permissions requested or a WWW-Authenticate request. These are dependent on the authentication provider.

options: AuthenticationGetSessionOptions & {createIfNone: true | AuthenticationGetSessionPresentationOptions}

The AuthenticationGetSessionOptions to use

Returns

Description

Thenable<AuthenticationSession>

A thenable that resolves to an authentication session

getSession(providerId: string, scopeListOrRequest: readonly string[] | AuthenticationWwwAuthenticateRequest, options: AuthenticationGetSessionOptions & {forceNewSession: true | AuthenticationGetSessionPresentationOptions}): Thenable<AuthenticationSession>

Get an authentication session matching the desired scopes or request. Rejects if a provider with providerId is not registered, or if the user does not consent to sharing authentication information with the extension. If there are multiple sessions with the same scopes, the user will be shown a quickpick to select which account they would like to use.

Built-in auth providers include:

*   'github' - For GitHub.com
*   'microsoft' For both personal & organizational Microsoft accounts
*   (less common) 'github-enterprise' - for alternative GitHub hostings, GHE.com, GitHub Enterprise Server
*   (less common) 'microsoft-sovereign-cloud' - for alternative Microsoft clouds

Parameter

Description

providerId: string

The id of the provider to use

scopeListOrRequest: readonly string[] | AuthenticationWwwAuthenticateRequest

A scope list of permissions requested or a WWW-Authenticate request. These are dependent on the authentication provider.

options: AuthenticationGetSessionOptions & {forceNewSession: true | AuthenticationGetSessionPresentationOptions}

The AuthenticationGetSessionOptions to use

Returns

Description

Thenable<AuthenticationSession>

A thenable that resolves to an authentication session

getSession(providerId: string, scopeListOrRequest: readonly string[] | AuthenticationWwwAuthenticateRequest, options?: AuthenticationGetSessionOptions): Thenable<AuthenticationSession | undefined>

Get an authentication session matching the desired scopes or request. Rejects if a provider with providerId is not registered, or if the user does not consent to sharing authentication information with the extension. If there are multiple sessions with the same scopes, the user will be shown a quickpick to select which account they would like to use.

Built-in auth providers include:

*   'github' - For GitHub.com
*   'microsoft' For both personal & organizational Microsoft accounts
*   (less common) 'github-enterprise' - for alternative GitHub hostings, GHE.com, GitHub Enterprise Server
*   (less common) 'microsoft-sovereign-cloud' - for alternative Microsoft clouds

Parameter

Description

providerId: string

The id of the provider to use

scopeListOrRequest: readonly string[] | AuthenticationWwwAuthenticateRequest

A scope list of permissions requested or a WWW-Authenticate request. These are dependent on the authentication provider.

options?: AuthenticationGetSessionOptions

The AuthenticationGetSessionOptions to use

Returns

Description

Thenable<AuthenticationSession | undefined>

A thenable that resolves to an authentication session or undefined if a silent flow was used and no session was found

registerAuthenticationProvider(id: string, label: string, provider: AuthenticationProvider, options?: AuthenticationProviderOptions): Disposable

Register an authentication provider.

There can only be one provider per id and an error is being thrown when an id has already been used by another provider. Ids are case-sensitive.

Parameter

Description

id: string

The unique identifier of the provider.

label: string

The human-readable name of the provider.

provider: AuthenticationProvider

The authentication provider provider.

options?: AuthenticationProviderOptions

Additional options for the provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

## chat

Namespace for chat functionality. Users interact with chat participants by sending messages to them in the chat view. Chat participants can respond with markdown or other types of content via the ChatResponseStream.

#### Functions

createChatParticipant(id: string, handler: ChatRequestHandler): ChatParticipant

Create a new chat participant instance.

Parameter

Description

id: string

A unique identifier for the participant.

handler: ChatRequestHandler

A request handler for the participant.

Returns

Description

ChatParticipant

A new chat participant

## commands

Namespace for dealing with commands. In short, a command is a function with a unique identifier. The function is sometimes also called _command handler_.

Commands can be added to the editor using the registerCommand and registerTextEditorCommand functions. Commands can be executed manually or from a UI gesture. Those are:

*   palette - Use the `commands`-section in `package.json` to make a command show in the command palette.
*   keybinding - Use the `keybindings`-section in `package.json` to enable keybindings for your extension.

Commands from other extensions and from the editor itself are accessible to an extension. However, when invoking an editor command not all argument types are supported.

This is a sample that registers a command handler and adds an entry for that command to the palette. First register a command handler with the identifier `extension.sayHello`.

```
commands.registerCommand('extension.sayHello', () => {
  window.showInformationMessage('Hello World!');
});
```

Second, bind the command identifier to a title under which it will show in the palette (`package.json`).

```
{
  "contributes": {
    "commands": [
      {
        "command": "extension.sayHello",
        "title": "Hello World"
      }
    ]
  }
}
```

#### Functions

executeCommand<T>(command: string, ...rest: any[]): Thenable<T>

Executes the command denoted by the given command identifier.

*   _Note 1:_ When executing an editor command not all types are allowed to be passed as arguments. Allowed are the primitive types `string`, `boolean`, `number`, `undefined`, and `null`, as well as Position, Range, Uri and Location.
*   _Note 2:_ There are no restrictions when executing commands that have been contributed by extensions.

Parameter

Description

command: string

Identifier of the command to execute.

...rest: any[]

Parameters passed to the command function.

Returns

Description

Thenable<T>

A thenable that resolves to the returned value of the given command. Returns `undefined` when the command handler function doesn't return anything.

getCommands(filterInternal?: boolean): Thenable<string[]>

Retrieve the list of all available commands. Commands starting with an underscore are treated as internal commands.

Parameter

Description

filterInternal?: boolean

Set `true` to not see internal commands (starting with an underscore)

Returns

Description

Thenable<string[]>

Thenable that resolves to a list of command ids.

registerCommand(command: string, callback: (args: any[]) => any, thisArg?: any): Disposable

Registers a command that can be invoked via a keyboard shortcut, a menu item, an action, or directly.

Registering a command with an existing command identifier twice will cause an error.

Parameter

Description

command: string

A unique identifier for the command.

callback: (args: any[]) => any

A command handler function.

thisArg?: any

The `this` context used when invoking the handler function.

Returns

Description

Disposable

Disposable which unregisters this command on disposal.

registerTextEditorCommand(command: string, callback: (textEditor: TextEditor, edit: TextEditorEdit, args: any[]) => void, thisArg?: any): Disposable

Registers a text editor command that can be invoked via a keyboard shortcut, a menu item, an action, or directly.

Text editor commands are different from ordinary commands as they only execute when there is an active editor when the command is called. Also, the command handler of an editor command has access to the active editor and to an edit-builder. Note that the edit-builder is only valid while the callback executes.

Parameter

Description

command: string

A unique identifier for the command.

callback: (textEditor: TextEditor, edit: TextEditorEdit, args: any[]) => void

A command handler function with access to an editor and an edit.

thisArg?: any

The `this` context used when invoking the handler function.

Returns

Description

Disposable

Disposable which unregisters this command on disposal.

## comments

#### Functions

createCommentController(id: string, label: string): CommentController

Creates a new comment controller instance.

Parameter

Description

id: string

An `id` for the comment controller.

label: string

A human-readable string for the comment controller.

Returns

Description

CommentController

An instance of comment controller.

## debug

Namespace for debug functionality.

#### Variables

activeDebugConsole: DebugConsole

The currently active debug console. If no debug session is active, output sent to the debug console is not shown.

activeDebugSession: DebugSession | undefined

The currently active debug session or `undefined`. The active debug session is the one represented by the debug action floating window or the one currently shown in the drop down menu of the debug action floating window. If no debug session is active, the value is `undefined`.

activeStackItem: DebugThread | DebugStackFrame | undefined

The currently focused thread or stack frame, or `undefined` if no thread or stack is focused. A thread can be focused any time there is an active debug session, while a stack frame can only be focused when a session is paused and the call stack has been retrieved.

breakpoints: readonly Breakpoint[]

List of breakpoints.

#### Events

onDidChangeActiveDebugSession: Event<DebugSession | undefined>

An Event which fires when the active debug session has changed. _Note_ that the event also fires when the active debug session changes to `undefined`.

onDidChangeActiveStackItem: Event<DebugThread | DebugStackFrame | undefined>

An event which fires when the debug.activeStackItem has changed.

onDidChangeBreakpoints: Event<BreakpointsChangeEvent>

An Event that is emitted when the set of breakpoints is added, removed, or changed.

onDidReceiveDebugSessionCustomEvent: Event<DebugSessionCustomEvent>

An Event which fires when a custom DAP event is received from the debug session.

onDidStartDebugSession: Event<DebugSession>

An Event which fires when a new debug session has been started.

onDidTerminateDebugSession: Event<DebugSession>

An Event which fires when a debug session has terminated.

#### Functions

addBreakpoints(breakpoints: readonly Breakpoint[]): void

Add breakpoints.

Parameter

Description

breakpoints: readonly Breakpoint[]

The breakpoints to add.

Returns

Description

void

asDebugSourceUri(source: DebugProtocolSource, session?: DebugSession): Uri

Converts a "Source" descriptor object received via the Debug Adapter Protocol into a Uri that can be used to load its contents. If the source descriptor is based on a path, a file Uri is returned. If the source descriptor uses a reference number, a specific debug Uri (scheme 'debug') is constructed that requires a corresponding ContentProvider and a running debug session

If the "Source" descriptor has insufficient information for creating the Uri, an error is thrown.

Parameter

Description

source: DebugProtocolSource

An object conforming to the Source type defined in the Debug Adapter Protocol.

session?: DebugSession

An optional debug session that will be used when the source descriptor uses a reference number to load the contents from an active debug session.

Returns

Description

Uri

A uri that can be used to load the contents of the source.

registerDebugAdapterDescriptorFactory(debugType: string, factory: DebugAdapterDescriptorFactory): Disposable

Register a debug adapter descriptor factory for a specific debug type. An extension is only allowed to register a DebugAdapterDescriptorFactory for the debug type(s) defined by the extension. Otherwise an error is thrown. Registering more than one DebugAdapterDescriptorFactory for a debug type results in an error.

Parameter

Description

debugType: string

The debug type for which the factory is registered.

factory: DebugAdapterDescriptorFactory

The debug adapter descriptor factory to register.

Returns

Description

Disposable

A Disposable that unregisters this factory when being disposed.

registerDebugAdapterTrackerFactory(debugType: string, factory: DebugAdapterTrackerFactory): Disposable

Register a debug adapter tracker factory for the given debug type.

Parameter

Description

debugType: string

The debug type for which the factory is registered or '*' for matching all debug types.

factory: DebugAdapterTrackerFactory

The debug adapter tracker factory to register.

Returns

Description

Disposable

A Disposable that unregisters this factory when being disposed.

registerDebugConfigurationProvider(debugType: string, provider: DebugConfigurationProvider, triggerKind?: DebugConfigurationProviderTriggerKind): Disposable

Register a debug configuration provider for a specific debug type. The optional triggerKind can be used to specify when the `provideDebugConfigurations` method of the provider is triggered. Currently two trigger kinds are possible: with the value `Initial` (or if no trigger kind argument is given) the `provideDebugConfigurations` method is used to provide the initial debug configurations to be copied into a newly created launch.json. With the trigger kind `Dynamic` the `provideDebugConfigurations` method is used to dynamically determine debug configurations to be presented to the user (in addition to the static configurations from the launch.json). Please note that the `triggerKind` argument only applies to the `provideDebugConfigurations` method: so the `resolveDebugConfiguration` methods are not affected at all. Registering a single provider with resolve methods for different trigger kinds, results in the same resolve methods called multiple times. More than one provider can be registered for the same type.

Parameter

Description

debugType: string

The debug type for which the provider is registered.

provider: DebugConfigurationProvider

The debug configuration provider to register.

triggerKind?: DebugConfigurationProviderTriggerKind

The trigger for which the 'provideDebugConfiguration' method of the provider is registered. If `triggerKind` is missing, the value `DebugConfigurationProviderTriggerKind.Initial` is assumed.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

removeBreakpoints(breakpoints: readonly Breakpoint[]): void

Remove breakpoints.

Parameter

Description

breakpoints: readonly Breakpoint[]

The breakpoints to remove.

Returns

Description

void

startDebugging(folder: WorkspaceFolder, nameOrConfiguration: string | DebugConfiguration, parentSessionOrOptions?: DebugSession | DebugSessionOptions): Thenable<boolean>

Start debugging by using either a named launch or named compound configuration, or by directly passing a DebugConfiguration. The named configurations are looked up in '.vscode/launch.json' found in the given folder. Before debugging starts, all unsaved files are saved and the launch configurations are brought up-to-date. Folder specific variables used in the configuration (e.g. '${workspaceFolder}') are resolved against the given folder.

Parameter

Description

folder: WorkspaceFolder

The workspace folder for looking up named configurations and resolving variables or `undefined` for a non-folder setup.

nameOrConfiguration: string | DebugConfiguration

Either the name of a debug or compound configuration or a DebugConfiguration object.

parentSessionOrOptions?: DebugSession | DebugSessionOptions

Debug session options. When passed a parent debug session, assumes options with just this parent session.

Returns

Description

Thenable<boolean>

A thenable that resolves when debugging could be successfully started.

stopDebugging(session?: DebugSession): Thenable<void>

Stop the given debug session or stop all debug sessions if session is omitted.

Parameter

Description

session?: DebugSession

The debug session to stop; if omitted all sessions are stopped.

Returns

Description

Thenable<void>

A thenable that resolves when the session(s) have been stopped.

## env

Namespace describing the environment the editor runs in.

#### Variables

appHost: string

The hosted location of the application On desktop this is 'desktop' In the web this is the specified embedder i.e. 'github.dev', 'codespaces', or 'web' if the embedder does not provide that information

appName: string

The application name of the editor, like 'VS Code'.

appRoot: string

The application root folder from which the editor is running.

_Note_ that the value is the empty string when running in an environment that has no representation of an application root folder.

clipboard: Clipboard

The system clipboard.

isAppPortable: boolean

Indicates whether the application is running in portable mode.

Portable mode is enabled when the application is run from a folder that contains a `data` directory, allowing for self-contained installations.

Learn more about Portable Mode.

isNewAppInstall: boolean

Indicates that this is a fresh install of the application. `true` if within the first day of installation otherwise `false`.

isTelemetryEnabled: boolean

Indicates whether the users has telemetry enabled. Can be observed to determine if the extension should send telemetry.

language: string

Represents the preferred user-language, like `de-CH`, `fr`, or `en-US`.

logLevel: LogLevel

The current log level of the editor.

machineId: string

A unique identifier for the computer.

remoteName: string | undefined

The name of a remote. Defined by extensions, popular samples are `wsl` for the Windows Subsystem for Linux or `ssh-remote` for remotes using a secure shell.

_Note_ that the value is `undefined` when there is no remote extension host but that the value is defined in all extension hosts (local and remote) in case a remote extension host exists. Use Extension.extensionKind to know if a specific extension runs remote or not.

sessionId: string

A unique identifier for the current session. Changes each time the editor is started.

shell: string

The detected default shell for the extension host, this is overridden by the `terminal.integrated.defaultProfile` setting for the extension host's platform. Note that in environments that do not support a shell the value is the empty string.

uiKind: UIKind

The UI kind property indicates from which UI extensions are accessed from. For example, extensions could be accessed from a desktop application or a web browser.

uriScheme: string

The custom uri scheme the editor registers to in the operating system.

#### Events

onDidChangeLogLevel: Event<LogLevel>

An Event which fires when the log level of the editor changes.

onDidChangeShell: Event<string>

An Event which fires when the default shell changes. This fires with the new shell path.

onDidChangeTelemetryEnabled: Event<boolean>

An Event which fires when the user enabled or disables telemetry. `true` if the user has enabled telemetry or `false` if the user has disabled telemetry.

#### Functions

asExternalUri(target: Uri): Thenable<Uri>

Resolves a uri to a form that is accessible externally.

#### http: or https: scheme

Resolves an _external_ uri, such as a `http:` or `https:` link, from where the extension is running to a uri to the same resource on the client machine.

This is a no-op if the extension is running on the client machine.

If the extension is running remotely, this function automatically establishes a port forwarding tunnel from the local machine to `target` on the remote and returns a local uri to the tunnel. The lifetime of the port forwarding tunnel is managed by the editor and the tunnel can be closed by the user.

_Note_ that uris passed through `openExternal` are automatically resolved and you should not call `asExternalUri` on them.

#### vscode.env.uriScheme

Creates a uri that - if opened in a browser (e.g. via `openExternal`) - will result in a registered UriHandler to trigger.

Extensions should not make any assumptions about the resulting uri and should not alter it in any way. Rather, extensions can e.g. use this uri in an authentication flow, by adding the uri as callback query argument to the server to authenticate to.

_Note_ that if the server decides to add additional query parameters to the uri (e.g. a token or secret), it will appear in the uri that is passed to the UriHandler.

**Example** of an authentication flow:

```
vscode.window.registerUriHandler({
  handleUri(uri: vscode.Uri): vscode.ProviderResult<void> {
    if (uri.path === '/did-authenticate') {
      console.log(uri.toString());
    }
  }
});

const callableUri = await vscode.env.asExternalUri(
  vscode.Uri.parse(vscode.env.uriScheme + '://my.extension/did-authenticate')
);
await vscode.env.openExternal(callableUri);
```

_Note_ that extensions should not cache the result of `asExternalUri` as the resolved uri may become invalid due to a system or user action — for example, in remote cases, a user may close a port forwarding tunnel that was opened by `asExternalUri`.

#### Any other scheme

Any other scheme will be handled as if the provided URI is a workspace URI. In that case, the method will return a URI which, when handled, will make the editor open the workspace.

Parameter

Description

target: Uri

Returns

Description

Thenable<Uri>

A uri that can be used on the client machine.

createTelemetryLogger(sender: TelemetrySender, options?: TelemetryLoggerOptions): TelemetryLogger

Creates a new telemetry logger.

Parameter

Description

sender: TelemetrySender

The telemetry sender that is used by the telemetry logger.

options?: TelemetryLoggerOptions

Options for the telemetry logger.

Returns

Description

TelemetryLogger

A new telemetry logger

openExternal(target: Uri): Thenable<boolean>

Opens a link externally using the default application. Depending on the used scheme this can be:

*   a browser (`http:`, `https:`)
*   a mail client (`mailto:`)
*   VSCode itself (`vscode:` from `vscode.env.uriScheme`)

_Note_ that showTextDocument is the right way to open a text document inside the editor, not this function.

Parameter

Description

target: Uri

The uri that should be opened.

Returns

Description

Thenable<boolean>

A promise indicating if open was successful.

## extensions

Namespace for dealing with installed extensions. Extensions are represented by an Extension-interface which enables reflection on them.

Extension writers can provide APIs to other extensions by returning their API public surface from the `activate`-call.

```
export function activate(context: vscode.ExtensionContext) {
  let api = {
    sum(a, b) {
      return a + b;
    },
    mul(a, b) {
      return a * b;
    }
  };
  // 'export' public api-surface
  return api;
}
```

When depending on the API of another extension add an `extensionDependencies`-entry to `package.json`, and use the getExtension-function and the exports-property, like below:

```
let mathExt = extensions.getExtension('genius.math');
let importedApi = mathExt.exports;

console.log(importedApi.mul(42, 1));
```

#### Variables

all: readonly Extension<any>[]

All extensions currently known to the system.

#### Events

onDidChange: Event<void>

An event which fires when `extensions.all` changes. This can happen when extensions are installed, uninstalled, enabled or disabled.

#### Functions

getExtension<T>(extensionId: string): Extension<T> | undefined

Get an extension by its full identifier in the form of: `publisher.name`.

Parameter

Description

extensionId: string

An extension identifier.

Returns

Description

Extension<T> | undefined

An extension or `undefined`.

## l10n

Namespace for localization-related functionality in the extension API. To use this properly, you must have `l10n` defined in your extension manifest and have bundle.l10n..json files. For more information on how to generate bundle.l10n..json files, check out the vscode-l10n repo.

Note: Built-in extensions (for example, Git, TypeScript Language Features, GitHub Authentication) are excluded from the `l10n` property requirement. In other words, they do not need to specify a `l10n` in the extension manifest because their translated strings come from Language Packs.

#### Variables

bundle: | undefined

The bundle of localized strings that have been loaded for the extension. It's undefined if no bundle has been loaded. The bundle is typically not loaded if there was no bundle found or when we are running with the default language.

uri: Uri | undefined

The URI of the localization bundle that has been loaded for the extension. It's undefined if no bundle has been loaded. The bundle is typically not loaded if there was no bundle found or when we are running with the default language.

#### Functions

t(message: string, ...args: Array<string | number | boolean>): string

Marks a string for localization. If a localized bundle is available for the language specified by env.language and the bundle has a localized value for this message, then that localized value will be returned (with injected args values for any templated values).

**Example**

```
l10n.t('Hello {0}!', 'World');
```

Parameter

Description

message: string

The message to localize. Supports index templating where strings like `{0}` and `{1}` are replaced by the item at that index in the args array.

...args: Array<string | number | boolean>

The arguments to be used in the localized string. The index of the argument is used to match the template placeholder in the localized string.

Returns

Description

string

localized string with injected arguments.

t(message: string, args: Record<string, string | number | boolean>): string

Marks a string for localization. If a localized bundle is available for the language specified by env.language and the bundle has a localized value for this message, then that localized value will be returned (with injected args values for any templated values).

**Example**

```
l10n.t('Hello {name}', { name: 'Erich' });
```

Parameter

Description

message: string

The message to localize. Supports named templating where strings like `{foo}` and `{bar}` are replaced by the value in the Record for that key (foo, bar, etc).

args: Record<string, string | number | boolean>

The arguments to be used in the localized string. The name of the key in the record is used to match the template placeholder in the localized string.

Returns

Description

string

localized string with injected arguments.

t(options: {args: Array<string | number | boolean> | Record<string, string | number | boolean>, comment: string | string[], message: string}): string

Marks a string for localization. If a localized bundle is available for the language specified by env.language and the bundle has a localized value for this message, then that localized value will be returned (with injected args values for any templated values).

Parameter

Description

options: {args: Array<string | number | boolean> | Record<string, string | number | boolean>, comment: string | string[], message: string}

The options to use when localizing the message.

Returns

Description

string

localized string with injected arguments.

## languages

Namespace for participating in language-specific editor features, like IntelliSense, code actions, diagnostics etc.

Many programming languages exist and there is huge variety in syntaxes, semantics, and paradigms. Despite that, features like automatic word-completion, code navigation, or code checking have become popular across different tools for different programming languages.

The editor provides an API that makes it simple to provide such common features by having all UI and actions already in place and by allowing you to participate by providing data only. For instance, to contribute a hover all you have to do is provide a function that can be called with a TextDocument and a Position returning hover info. The rest, like tracking the mouse, positioning the hover, keeping the hover stable etc. is taken care of by the editor.

```
languages.registerHoverProvider('javascript', {
  provideHover(document, position, token) {
    return new Hover('I am a hover!');
  }
});
```

Registration is done using a document selector which is either a language id, like `javascript` or a more complex filter like `{ language: 'typescript', scheme: 'file' }`. Matching a document against such a selector will result in a score that is used to determine if and how a provider shall be used. When scores are equal the provider that came last wins. For features that allow full arity, like hover, the score is only checked to be `>0`, for other features, like IntelliSense the score is used for determining the order in which providers are asked to participate.

#### Events

onDidChangeDiagnostics: Event<DiagnosticChangeEvent>

An Event which fires when the global set of diagnostics changes. This is newly added and removed diagnostics.

#### Functions

createDiagnosticCollection(name?: string): DiagnosticCollection

Create a diagnostics collection.

Parameter

Description

name?: string

The name of the collection.

Returns

Description

DiagnosticCollection

A new diagnostic collection.

createLanguageStatusItem(id: string, selector: DocumentSelector): LanguageStatusItem

Creates a new language status item.

Parameter

Description

id: string

The identifier of the item.

selector: DocumentSelector

The document selector that defines for what editors the item shows.

Returns

Description

LanguageStatusItem

A new language status item.

getDiagnostics(resource: Uri): Diagnostic[]

Get all diagnostics for a given resource.

Parameter

Description

resource: Uri

A resource

Returns

Description

Diagnostic[]

An array of diagnostics objects or an empty array.

getDiagnostics(): Array<[Uri, Diagnostic[]]>

Get all diagnostics.

Parameter

Description

Returns

Description

Array<[Uri, Diagnostic[]]>

An array of uri-diagnostics tuples or an empty array.

getLanguages(): Thenable<string[]>

Return the identifiers of all known languages.

Parameter

Description

Returns

Description

Thenable<string[]>

Promise resolving to an array of identifier strings.

match(selector: DocumentSelector, document: TextDocument): number

Compute the match between a document selector and a document. Values greater than zero mean the selector matches the document.

A match is computed according to these rules:

1.  When DocumentSelector is an array, compute the match for each contained `DocumentFilter` or language identifier and take the maximum value.
2.  A string will be desugared to become the `language`-part of a DocumentFilter, so `"fooLang"` is like `{ language: "fooLang" }`.
3.  A DocumentFilter will be matched against the document by comparing its parts with the document. The following rules apply:
    1.  When the `DocumentFilter` is empty (`{}`) the result is `0`
    2.  When `scheme`, `language`, `pattern`, or `notebook` are defined but one doesn't match, the result is `0`
    3.  Matching against `*` gives a score of `5`, matching via equality or via a glob-pattern gives a score of `10`
    4.  The result is the maximum value of each match

Samples:

```
// default document from disk (file-scheme)
doc.uri; //'file:///my/file.js'
doc.languageId; // 'javascript'
match('javascript', doc); // 10;
match({ language: 'javascript' }, doc); // 10;
match({ language: 'javascript', scheme: 'file' }, doc); // 10;
match('*', doc); // 5
match('fooLang', doc); // 0
match(['fooLang', '*'], doc); // 5

// virtual document, e.g. from git-index
doc.uri; // 'git:/my/file.js'
doc.languageId; // 'javascript'
match('javascript', doc); // 10;
match({ language: 'javascript', scheme: 'git' }, doc); // 10;
match('*', doc); // 5

// notebook cell document
doc.uri; // `vscode-notebook-cell:///my/notebook.ipynb#gl65s2pmha`;
doc.languageId; // 'python'
match({ notebookType: 'jupyter-notebook' }, doc); // 10
match({ notebookType: 'fooNotebook', language: 'python' }, doc); // 0
match({ language: 'python' }, doc); // 10
match({ notebookType: '*' }, doc); // 5
```

Parameter

Description

selector: DocumentSelector

A document selector.

document: TextDocument

A text document.

Returns

Description

number

A number `>0` when the selector matches and `0` when the selector does not match.

registerCallHierarchyProvider(selector: DocumentSelector, provider: CallHierarchyProvider): Disposable

Register a call hierarchy provider.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: CallHierarchyProvider

A call hierarchy provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerCodeActionsProvider(selector: DocumentSelector, provider: CodeActionProvider<CodeAction>, metadata?: CodeActionProviderMetadata): Disposable

Register a code action provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: CodeActionProvider<CodeAction>

A code action provider.

metadata?: CodeActionProviderMetadata

Metadata about the kind of code actions the provider provides.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerCodeLensProvider(selector: DocumentSelector, provider: CodeLensProvider<CodeLens>): Disposable

Register a code lens provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: CodeLensProvider<CodeLens>

A code lens provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerColorProvider(selector: DocumentSelector, provider: DocumentColorProvider): Disposable

Register a color provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: DocumentColorProvider

A color provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerCompletionItemProvider(selector: DocumentSelector, provider: CompletionItemProvider<CompletionItem>, ...triggerCharacters: string[]): Disposable

Register a completion provider.

Multiple providers can be registered for a language. In that case providers are sorted by their score and groups of equal score are sequentially asked for completion items. The process stops when one or many providers of a group return a result. A failing provider (rejected promise or exception) will not fail the whole operation.

A completion item provider can be associated with a set of `triggerCharacters`. When trigger characters are being typed, completions are requested but only from providers that registered the typed character. Because of that trigger characters should be different than word characters, a common trigger character is `.` to trigger member completions.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: CompletionItemProvider<CompletionItem>

A completion provider.

...triggerCharacters: string[]

Trigger completion when the user types one of the characters.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerDeclarationProvider(selector: DocumentSelector, provider: DeclarationProvider): Disposable

Register a declaration provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: DeclarationProvider

A declaration provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerDefinitionProvider(selector: DocumentSelector, provider: DefinitionProvider): Disposable

Register a definition provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: DefinitionProvider

A definition provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerDocumentDropEditProvider(selector: DocumentSelector, provider: DocumentDropEditProvider<DocumentDropEdit>, metadata?: DocumentDropEditProviderMetadata): Disposable

Registers a new DocumentDropEditProvider.

Multiple drop providers can be registered for a language. When dropping content into an editor, all registered providers for the editor's language will be invoked based on the mimetypes they handle as specified by their DocumentDropEditProviderMetadata.

Each provider can return one or more DocumentDropEdits. The edits are sorted using the DocumentDropEdit.yieldTo property. By default the first edit will be applied. If there are any additional edits, these will be shown to the user as selectable drop options in the drop widget.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider applies to.

provider: DocumentDropEditProvider<DocumentDropEdit>

A drop provider.

metadata?: DocumentDropEditProviderMetadata

Additional metadata about the provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when disposed of.

registerDocumentFormattingEditProvider(selector: DocumentSelector, provider: DocumentFormattingEditProvider): Disposable

Register a formatting provider for a document.

Multiple providers can be registered for a language. In that case providers are sorted by their score and the best-matching provider is used. Failure of the selected provider will cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: DocumentFormattingEditProvider

A document formatting edit provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerDocumentHighlightProvider(selector: DocumentSelector, provider: DocumentHighlightProvider): Disposable

Register a document highlight provider.

Multiple providers can be registered for a language. In that case providers are sorted by their score and groups sequentially asked for document highlights. The process stops when a provider returns a `non-falsy` or `non-failure` result.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: DocumentHighlightProvider

A document highlight provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerDocumentLinkProvider(selector: DocumentSelector, provider: DocumentLinkProvider<DocumentLink>): Disposable

Register a document link provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: DocumentLinkProvider<DocumentLink>

A document link provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerDocumentPasteEditProvider(selector: DocumentSelector, provider: DocumentPasteEditProvider<DocumentPasteEdit>, metadata: DocumentPasteProviderMetadata): Disposable

Registers a new DocumentPasteEditProvider.

Multiple providers can be registered for a language. All registered providers for a language will be invoked for copy and paste operations based on their handled mimetypes as specified by the DocumentPasteProviderMetadata.

For copy operations, changes to the DataTransfer made by each provider will be merged into a single DataTransfer that is used to populate the clipboard.

For [DocumentPasteEditProvider.providerDocumentPasteEdits paste operations](#DocumentPasteEditProvider.providerDocumentPasteEdits paste operations), each provider will be invoked and can return one or more DocumentPasteEdits. The edits are sorted using the DocumentPasteEdit.yieldTo property. By default the first edit will be applied and the rest of the edits will be shown to the user as selectable paste options in the paste widget.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider applies to.

provider: DocumentPasteEditProvider<DocumentPasteEdit>

A paste editor provider.

metadata: DocumentPasteProviderMetadata

Additional metadata about the provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when disposed of.

registerDocumentRangeFormattingEditProvider(selector: DocumentSelector, provider: DocumentRangeFormattingEditProvider): Disposable

Register a formatting provider for a document range.

_Note:_ A document range provider is also a document formatter which means there is no need to register a document formatter when also registering a range provider.

Multiple providers can be registered for a language. In that case providers are sorted by their score and the best-matching provider is used. Failure of the selected provider will cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: DocumentRangeFormattingEditProvider

A document range formatting edit provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerDocumentRangeSemanticTokensProvider(selector: DocumentSelector, provider: DocumentRangeSemanticTokensProvider, legend: SemanticTokensLegend): Disposable

Register a semantic tokens provider for a document range.

_Note:_ If a document has both a `DocumentSemanticTokensProvider` and a `DocumentRangeSemanticTokensProvider`, the range provider will be invoked only initially, for the time in which the full document provider takes to resolve the first request. Once the full document provider resolves the first request, the semantic tokens provided via the range provider will be discarded and from that point forward, only the document provider will be used.

Multiple providers can be registered for a language. In that case providers are sorted by their score and the best-matching provider is used. Failure of the selected provider will cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: DocumentRangeSemanticTokensProvider

A document range semantic tokens provider.

legend: SemanticTokensLegend

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerDocumentSemanticTokensProvider(selector: DocumentSelector, provider: DocumentSemanticTokensProvider, legend: SemanticTokensLegend): Disposable

Register a semantic tokens provider for a whole document.

Multiple providers can be registered for a language. In that case providers are sorted by their score and the best-matching provider is used. Failure of the selected provider will cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: DocumentSemanticTokensProvider

A document semantic tokens provider.

legend: SemanticTokensLegend

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerDocumentSymbolProvider(selector: DocumentSelector, provider: DocumentSymbolProvider, metaData?: DocumentSymbolProviderMetadata): Disposable

Register a document symbol provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: DocumentSymbolProvider

A document symbol provider.

metaData?: DocumentSymbolProviderMetadata

metadata about the provider

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerEvaluatableExpressionProvider(selector: DocumentSelector, provider: EvaluatableExpressionProvider): Disposable

Register a provider that locates evaluatable expressions in text documents. The editor will evaluate the expression in the active debug session and will show the result in the debug hover.

If multiple providers are registered for a language an arbitrary provider will be used.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: EvaluatableExpressionProvider

An evaluatable expression provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerFoldingRangeProvider(selector: DocumentSelector, provider: FoldingRangeProvider): Disposable

Register a folding range provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. If multiple folding ranges start at the same position, only the range of the first registered provider is used. If a folding range overlaps with an other range that has a smaller position, it is also ignored.

A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: FoldingRangeProvider

A folding range provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerHoverProvider(selector: DocumentSelector, provider: HoverProvider): Disposable

Register a hover provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: HoverProvider

A hover provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerImplementationProvider(selector: DocumentSelector, provider: ImplementationProvider): Disposable

Register an implementation provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: ImplementationProvider

An implementation provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerInlayHintsProvider(selector: DocumentSelector, provider: InlayHintsProvider<InlayHint>): Disposable

Register a inlay hints provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: InlayHintsProvider<InlayHint>

An inlay hints provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerInlineCompletionItemProvider(selector: DocumentSelector, provider: InlineCompletionItemProvider): Disposable

Registers an inline completion provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: InlineCompletionItemProvider

An inline completion provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerInlineValuesProvider(selector: DocumentSelector, provider: InlineValuesProvider): Disposable

Register a provider that returns data for the debugger's 'inline value' feature. Whenever the generic debugger has stopped in a source file, providers registered for the language of the file are called to return textual data that will be shown in the editor at the end of lines.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: InlineValuesProvider

An inline values provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerLinkedEditingRangeProvider(selector: DocumentSelector, provider: LinkedEditingRangeProvider): Disposable

Register a linked editing range provider.

Multiple providers can be registered for a language. In that case providers are sorted by their score and the best-matching provider that has a result is used. Failure of the selected provider will cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: LinkedEditingRangeProvider

A linked editing range provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerOnTypeFormattingEditProvider(selector: DocumentSelector, provider: OnTypeFormattingEditProvider, firstTriggerCharacter: string, ...moreTriggerCharacter: string[]): Disposable

Register a formatting provider that works on type. The provider is active when the user enables the setting `editor.formatOnType`.

Multiple providers can be registered for a language. In that case providers are sorted by their score and the best-matching provider is used. Failure of the selected provider will cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: OnTypeFormattingEditProvider

An on type formatting edit provider.

firstTriggerCharacter: string

A character on which formatting should be triggered, like `}`.

...moreTriggerCharacter: string[]

More trigger characters.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerReferenceProvider(selector: DocumentSelector, provider: ReferenceProvider): Disposable

Register a reference provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: ReferenceProvider

A reference provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerRenameProvider(selector: DocumentSelector, provider: RenameProvider): Disposable

Register a rename provider.

Multiple providers can be registered for a language. In that case providers are sorted by their score and asked in sequence. The first provider producing a result defines the result of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: RenameProvider

A rename provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerSelectionRangeProvider(selector: DocumentSelector, provider: SelectionRangeProvider): Disposable

Register a selection range provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: SelectionRangeProvider

A selection range provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerSignatureHelpProvider(selector: DocumentSelector, provider: SignatureHelpProvider, ...triggerCharacters: string[]): Disposable

Register a signature help provider.

Multiple providers can be registered for a language. In that case providers are sorted by their score and called sequentially until a provider returns a valid result.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: SignatureHelpProvider

A signature help provider.

...triggerCharacters: string[]

Trigger signature help when the user types one of the characters, like `,` or `(`.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerSignatureHelpProvider(selector: DocumentSelector, provider: SignatureHelpProvider, metadata: SignatureHelpProviderMetadata): Disposable

_See also_ languages.registerSignatureHelpProvider

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: SignatureHelpProvider

A signature help provider.

metadata: SignatureHelpProviderMetadata

Information about the provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerTypeDefinitionProvider(selector: DocumentSelector, provider: TypeDefinitionProvider): Disposable

Register a type definition provider.

Multiple providers can be registered for a language. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: TypeDefinitionProvider

A type definition provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerTypeHierarchyProvider(selector: DocumentSelector, provider: TypeHierarchyProvider): Disposable

Register a type hierarchy provider.

Parameter

Description

selector: DocumentSelector

A selector that defines the documents this provider is applicable to.

provider: TypeHierarchyProvider

A type hierarchy provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerWorkspaceSymbolProvider(provider: WorkspaceSymbolProvider<SymbolInformation>): Disposable

Register a workspace symbol provider.

Multiple providers can be registered. In that case providers are asked in parallel and the results are merged. A failing provider (rejected promise or exception) will not cause a failure of the whole operation.

Parameter

Description

provider: WorkspaceSymbolProvider<SymbolInformation>

A workspace symbol provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

setLanguageConfiguration(language: string, configuration: LanguageConfiguration): Disposable

Set a language configuration for a language.

Parameter

Description

language: string

A language identifier like `typescript`.

configuration: LanguageConfiguration

Language configuration.

Returns

Description

Disposable

A Disposable that unsets this configuration.

setTextDocumentLanguage(document: TextDocument, languageId: string): Thenable<TextDocument>

Set (and change) the language that is associated with the given document.

_Note_ that calling this function will trigger the onDidCloseTextDocument event followed by the onDidOpenTextDocument event.

Parameter

Description

document: TextDocument

The document which language is to be changed

languageId: string

The new language identifier.

Returns

Description

Thenable<TextDocument>

A thenable that resolves with the updated document.

## lm

Namespace for language model related functionality.

#### Variables

tools: readonly LanguageModelToolInformation[]

A list of all available tools that were registered by all extensions using lm.registerTool. They can be called with lm.invokeTool with input that match their declared `inputSchema`.

#### Events

onDidChangeChatModels: Event<void>

An event that is fired when the set of available chat models changes.

#### Functions

invokeTool(name: string, options: LanguageModelToolInvocationOptions<object>, token?: CancellationToken): Thenable<LanguageModelToolResult>

Invoke a tool listed in lm.tools by name with the given input. The input will be validated against the schema declared by the tool

A tool can be invoked by a chat participant, in the context of handling a chat request, or globally by any extension in any custom flow.

In the former case, the caller shall pass the toolInvocationToken, which comes from a chat request. This makes sure the chat UI shows the tool invocation for the correct conversation.

A tool result is an array of text- and prompt-tsx-parts. If the tool caller is using `vscode/prompt-tsx`, it can incorporate the response parts into its prompt using a `ToolResult`. If not, the parts can be passed along to the LanguageModelChat via a user message with a LanguageModelToolResultPart.

If a chat participant wants to preserve tool results for requests across multiple turns, it can store tool results in the ChatResult.metadata returned from the handler and retrieve them on the next turn from ChatResponseTurn.result.

Parameter

Description

name: string

The name of the tool to call.

options: LanguageModelToolInvocationOptions<object>

The options to use when invoking the tool.

token?: CancellationToken

A cancellation token. See CancellationTokenSource for how to create one.

Returns

Description

Thenable<LanguageModelToolResult>

The result of the tool invocation.

registerLanguageModelChatProvider(vendor: string, provider: LanguageModelChatProvider<LanguageModelChatInformation>): Disposable

Registers a LanguageModelChatProvider Note: You must also define the language model chat provider via the `languageModelChatProviders` contribution point in package.json

Parameter

Description

vendor: string

The vendor for this provider. Must be globally unique. An example is `copilot` or `openai`.

provider: LanguageModelChatProvider<LanguageModelChatInformation>

The provider to register

Returns

Description

Disposable

A disposable that unregisters the provider when disposed

registerMcpServerDefinitionProvider(id: string, provider: McpServerDefinitionProvider<McpServerDefinition>): Disposable

Registers a provider that publishes Model Context Protocol servers for the editor to consume. This allows MCP servers to be dynamically provided to the editor in addition to those the user creates in their configuration files.

Before calling this method, extensions must register the `contributes.mcpServerDefinitionProviders` extension point with the corresponding id, for example:

```
    "contributes": {
        "mcpServerDefinitionProviders": [
            {
                "id": "cool-cloud-registry.mcp-servers",
                "label": "Cool Cloud Registry",
            }
        ]
    }
```

When a new McpServerDefinitionProvider is available, the editor will, by default, automatically invoke it to discover new servers and tools when a chat message is submitted. To enable this flow, extensions should call `registerMcpServerDefinitionProvider` during activation.

Parameter

Description

id: string

The ID of the provider, which is unique to the extension.

provider: McpServerDefinitionProvider<McpServerDefinition>

The provider to register

Returns

Description

Disposable

A disposable that unregisters the provider when disposed.

registerTool<T>(name: string, tool: LanguageModelTool<T>): Disposable

Register a LanguageModelTool. The tool must also be registered in the package.json `languageModelTools` contribution point. A registered tool is available in the lm.tools list for any extension to see. But in order for it to be seen by a language model, it must be passed in the list of available tools in LanguageModelChatRequestOptions.tools.

Parameter

Description

name: string

tool: LanguageModelTool<T>

Returns

Description

Disposable

A Disposable that unregisters the tool when disposed.

selectChatModels(selector?: LanguageModelChatSelector): Thenable<LanguageModelChat[]>

Select chat models by a selector. This can yield multiple or no chat models and extensions must handle these cases, esp. when no chat model exists, gracefully.

```
const models = await vscode.lm.selectChatModels({ family: 'gpt-3.5-turbo' });
if (models.length > 0) {
    const [first] = models;
    const response = await first.sendRequest(...)
    // ...
} else {
    // NO chat models available
}
```

A selector can be written to broadly match all models of a given vendor or family, or it can narrowly select one model by ID. Keep in mind that the available set of models will change over time, but also that prompts may perform differently in different models.

_Note_ that extensions can hold on to the results returned by this function and use them later. However, when the onDidChangeChatModels-event is fired the list of chat models might have changed and extensions should re-query.

Parameter

Description

selector?: LanguageModelChatSelector

A chat model selector. When omitted all chat models are returned.

Returns

Description

Thenable<LanguageModelChat[]>

An array of chat models, can be empty!

## notebooks

Namespace for notebooks.

The notebooks functionality is composed of three loosely coupled components:

1.  NotebookSerializer enable the editor to open, show, and save notebooks
2.  NotebookController own the execution of notebooks, e.g they create output from code cells.
3.  NotebookRenderer present notebook output in the editor. They run in a separate context.

#### Functions

createNotebookController(id: string, notebookType: string, label: string, handler?: (cells: NotebookCell[], notebook: NotebookDocument, controller: NotebookController) => void | Thenable<void>): NotebookController

Creates a new notebook controller.

Parameter

Description

id: string

Identifier of the controller. Must be unique per extension.

notebookType: string

A notebook type for which this controller is for.

label: string

The label of the controller.

handler?: (cells: NotebookCell[], notebook: NotebookDocument, controller: NotebookController) => void | Thenable<void>

The execute-handler of the controller.

Returns

Description

NotebookController

A new notebook controller.

createRendererMessaging(rendererId: string): NotebookRendererMessaging

Creates a new messaging instance used to communicate with a specific renderer.

*   _Note 1:_ Extensions can only create renderer that they have defined in their `package.json`-file
*   _Note 2:_ A renderer only has access to messaging if `requiresMessaging` is set to `always` or `optional` in its `notebookRenderer` contribution.

Parameter

Description

rendererId: string

The renderer ID to communicate with

Returns

Description

NotebookRendererMessaging

A new notebook renderer messaging object.

registerNotebookCellStatusBarItemProvider(notebookType: string, provider: NotebookCellStatusBarItemProvider): Disposable

Register a cell statusbar item provider for the given notebook type.

Parameter

Description

notebookType: string

The notebook type to register for.

provider: NotebookCellStatusBarItemProvider

A cell status bar provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

## scm

Namespace for source control management.

#### Variables

inputBox: SourceControlInputBox

The input box for the last source control created by the extension.

*   _deprecated_ - Use SourceControl.inputBox instead

#### Functions

createSourceControl(id: string, label: string, rootUri?: Uri): SourceControl

Creates a new source control instance.

Parameter

Description

id: string

An `id` for the source control. Something short, e.g.: `git`.

label: string

A human-readable string for the source control. E.g.: `Git`.

rootUri?: Uri

An optional Uri of the root of the source control. E.g.: `Uri.parse(workspaceRoot)`.

Returns

Description

SourceControl

An instance of source control.

## tasks

Namespace for tasks functionality.

#### Variables

taskExecutions: readonly TaskExecution[]

The currently active task executions or an empty array.

#### Events

onDidEndTask: Event<TaskEndEvent>

Fires when a task ends.

onDidEndTaskProcess: Event<TaskProcessEndEvent>

Fires when the underlying process has ended. This event will not fire for tasks that don't execute an underlying process.

onDidStartTask: Event<TaskStartEvent>

Fires when a task starts.

onDidStartTaskProcess: Event<TaskProcessStartEvent>

Fires when the underlying process has been started. This event will not fire for tasks that don't execute an underlying process.

#### Functions

executeTask(task: Task): Thenable<TaskExecution>

Executes a task that is managed by the editor. The returned task execution can be used to terminate the task.

*   _throws_ - When running a ShellExecution or a ProcessExecution task in an environment where a new process cannot be started. In such an environment, only CustomExecution tasks can be run.

Parameter

Description

task: Task

the task to execute

Returns

Description

Thenable<TaskExecution>

A thenable that resolves to a task execution.

fetchTasks(filter?: TaskFilter): Thenable<Task[]>

Fetches all tasks available in the systems. This includes tasks from `tasks.json` files as well as tasks from task providers contributed through extensions.

Parameter

Description

filter?: TaskFilter

Optional filter to select tasks of a certain type or version.

Returns

Description

Thenable<Task[]>

A thenable that resolves to an array of tasks.

registerTaskProvider(type: string, provider: TaskProvider<Task>): Disposable

Register a task provider.

Parameter

Description

type: string

The task kind type this provider is registered for.

provider: TaskProvider<Task>

A task provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

## tests

Namespace for testing functionality. Tests are published by registering TestController instances, then adding TestItems. Controllers may also describe how to run tests by creating one or more TestRunProfile instances.

#### Functions

createTestController(id: string, label: string): TestController

Creates a new test controller.

Parameter

Description

id: string

Identifier for the controller, must be globally unique.

label: string

A human-readable label for the controller.

Returns

Description

TestController

An instance of the TestController.

## window

Namespace for dealing with the current window of the editor. That is visible and active editors, as well as, UI elements to show messages, selections, and asking for user input.

#### Variables

activeColorTheme: ColorTheme

The currently active color theme as configured in the settings. The active theme can be changed via the `workbench.colorTheme` setting.

activeNotebookEditor: NotebookEditor | undefined

The currently active notebook editor or `undefined`. The active editor is the one that currently has focus or, when none has focus, the one that has changed input most recently.

activeTerminal: Terminal | undefined

The currently active terminal or `undefined`. The active terminal is the one that currently has focus or most recently had focus.

activeTextEditor: TextEditor | undefined

The currently active editor or `undefined`. The active editor is the one that currently has focus or, when none has focus, the one that has changed input most recently.

state: WindowState

Represents the current window's state.

tabGroups: TabGroups

Represents the grid widget within the main editor area

terminals: readonly Terminal[]

The currently opened terminals or an empty array.

visibleNotebookEditors: readonly NotebookEditor[]

The currently visible notebook editors or an empty array.

visibleTextEditors: readonly TextEditor[]

The currently visible editors or an empty array.

#### Events

onDidChangeActiveColorTheme: Event<ColorTheme>

An Event which fires when the active color theme is changed or has changes.

onDidChangeActiveNotebookEditor: Event<NotebookEditor | undefined>

An Event which fires when the active notebook editor has changed. _Note_ that the event also fires when the active editor changes to `undefined`.

onDidChangeActiveTerminal: Event<Terminal | undefined>

An Event which fires when the active terminal has changed. _Note_ that the event also fires when the active terminal changes to `undefined`.

onDidChangeActiveTextEditor: Event<TextEditor | undefined>

An Event which fires when the active editor has changed. _Note_ that the event also fires when the active editor changes to `undefined`.

onDidChangeNotebookEditorSelection: Event<NotebookEditorSelectionChangeEvent>

An Event which fires when the notebook editor selections have changed.

onDidChangeNotebookEditorVisibleRanges: Event<NotebookEditorVisibleRangesChangeEvent>

An Event which fires when the notebook editor visible ranges have changed.

onDidChangeTerminalShellIntegration: Event<TerminalShellIntegrationChangeEvent>

Fires when shell integration activates or one of its properties changes in a terminal.

onDidChangeTerminalState: Event<Terminal>

An Event which fires when a terminal's state has changed.

onDidChangeTextEditorOptions: Event<TextEditorOptionsChangeEvent>

An Event which fires when the options of an editor have changed.

onDidChangeTextEditorSelection: Event<TextEditorSelectionChangeEvent>

An Event which fires when the selection in an editor has changed.

onDidChangeTextEditorViewColumn: Event<TextEditorViewColumnChangeEvent>

An Event which fires when the view column of an editor has changed.

onDidChangeTextEditorVisibleRanges: Event<TextEditorVisibleRangesChangeEvent>

An Event which fires when the visible ranges of an editor has changed.

onDidChangeVisibleNotebookEditors: Event<readonly NotebookEditor[]>

An Event which fires when the visible notebook editors has changed.

onDidChangeVisibleTextEditors: Event<readonly TextEditor[]>

An Event which fires when the array of visible editors has changed.

onDidChangeWindowState: Event<WindowState>

An Event which fires when the focus or activity state of the current window changes. The value of the event represents whether the window is focused.

onDidCloseTerminal: Event<Terminal>

An Event which fires when a terminal is disposed.

onDidEndTerminalShellExecution: Event<TerminalShellExecutionEndEvent>

This will be fired when a terminal command is ended. This event will fire only when shell integration is activated for the terminal.

onDidOpenTerminal: Event<Terminal>

An Event which fires when a terminal has been created, either through the createTerminal API or commands.

onDidStartTerminalShellExecution: Event<TerminalShellExecutionStartEvent>

This will be fired when a terminal command is started. This event will fire only when shell integration is activated for the terminal.

#### Functions

createInputBox(): InputBox

Creates a InputBox to let the user enter some text input.

Note that in many cases the more convenient window.showInputBox is easier to use. window.createInputBox should be used when window.showInputBox does not offer the required flexibility.

Parameter

Description

Returns

Description

InputBox

A new InputBox.

createOutputChannel(name: string, languageId?: string): OutputChannel

Creates a new output channel with the given name and language id If language id is not provided, then **Log** is used as default language id.

You can access the visible or active output channel as a text document from visible editors or active editor and use the language id to contribute language features like syntax coloring, code lens etc.,

Parameter

Description

name: string

Human-readable string which will be used to represent the channel in the UI.

languageId?: string

The identifier of the language associated with the channel.

Returns

Description

OutputChannel

A new output channel.

createOutputChannel(name: string, options: {log: true}): LogOutputChannel

Creates a new log output channel with the given name.

Parameter

Description

name: string

Human-readable string which will be used to represent the channel in the UI.

options: {log: true}

Options for the log output channel.

Returns

Description

LogOutputChannel

A new log output channel.

createQuickPick<T extends QuickPickItem>(): QuickPick<T>

Creates a QuickPick to let the user pick an item from a list of items of type `T`.

Note that in many cases the more convenient window.showQuickPick is easier to use. window.createQuickPick should be used when window.showQuickPick does not offer the required flexibility.

Parameter

Description

Returns

Description

QuickPick<T>

A new QuickPick.

createStatusBarItem(id: string, alignment?: StatusBarAlignment, priority?: number): StatusBarItem

Creates a status bar item.

Parameter

Description

id: string

The identifier of the item. Must be unique within the extension.

alignment?: StatusBarAlignment

The alignment of the item.

priority?: number

The priority of the item. Higher values mean the item should be shown more to the left.

Returns

Description

StatusBarItem

A new status bar item.

createStatusBarItem(alignment?: StatusBarAlignment, priority?: number): StatusBarItem

Creates a status bar item.

_See also_ createStatusBarItem for creating a status bar item with an identifier.

Parameter

Description

alignment?: StatusBarAlignment

The alignment of the item.

priority?: number

The priority of the item. Higher values mean the item should be shown more to the left.

Returns

Description

StatusBarItem

A new status bar item.

createTerminal(name?: string, shellPath?: string, shellArgs?: string | readonly string[]): Terminal

Creates a Terminal with a backing shell process. The cwd of the terminal will be the workspace directory if it exists.

*   _throws_ - When running in an environment where a new process cannot be started.

Parameter

Description

name?: string

Optional human-readable string which will be used to represent the terminal in the UI.

shellPath?: string

Optional path to a custom shell executable to be used in the terminal.

shellArgs?: string | readonly string[]

Optional args for the custom shell executable. A string can be used on Windows only which allows specifying shell args in command-line format.

Returns

Description

Terminal

A new Terminal.

createTerminal(options: TerminalOptions): Terminal

Creates a Terminal with a backing shell process.

*   _throws_ - When running in an environment where a new process cannot be started.

Parameter

Description

options: TerminalOptions

A TerminalOptions object describing the characteristics of the new terminal.

Returns

Description

Terminal

A new Terminal.

createTerminal(options: ExtensionTerminalOptions): Terminal

Creates a Terminal where an extension controls its input and output.

Parameter

Description

options: ExtensionTerminalOptions

An ExtensionTerminalOptions object describing the characteristics of the new terminal.

Returns

Description

Terminal

A new Terminal.

createTextEditorDecorationType(options: DecorationRenderOptions): TextEditorDecorationType

Create a TextEditorDecorationType that can be used to add decorations to text editors.

Parameter

Description

options: DecorationRenderOptions

Rendering options for the decoration type.

Returns

Description

TextEditorDecorationType

A new decoration type instance.

createTreeView<T>(viewId: string, options: TreeViewOptions<T>): TreeView<T>

Create a TreeView for the view contributed using the extension point `views`.

Parameter

Description

viewId: string

Id of the view contributed using the extension point `views`.

options: TreeViewOptions<T>

Options for creating the TreeView

Returns

Description

TreeView<T>

a TreeView.

createWebviewPanel(viewType: string, title: string, showOptions: ViewColumn | {preserveFocus: boolean, viewColumn: ViewColumn}, options?: WebviewPanelOptions & WebviewOptions): WebviewPanel

Create and show a new webview panel.

Parameter

Description

viewType: string

Identifies the type of the webview panel.

title: string

Title of the panel.

showOptions: ViewColumn | {preserveFocus: boolean, viewColumn: ViewColumn}

Where to show the webview in the editor. If preserveFocus is set, the new webview will not take focus.

options?: WebviewPanelOptions & WebviewOptions

Settings for the new panel.

Returns

Description

WebviewPanel

New webview panel.

registerCustomEditorProvider(viewType: string, provider: CustomTextEditorProvider | CustomReadonlyEditorProvider<CustomDocument> | CustomEditorProvider<CustomDocument>, options?: {supportsMultipleEditorsPerDocument: boolean, webviewOptions: WebviewPanelOptions}): Disposable

Register a provider for custom editors for the `viewType` contributed by the `customEditors` extension point.

When a custom editor is opened, an `onCustomEditor:viewType` activation event is fired. Your extension must register a CustomTextEditorProvider, CustomReadonlyEditorProvider, CustomEditorProviderfor `viewType` as part of activation.

Parameter

Description

viewType: string

Unique identifier for the custom editor provider. This should match the `viewType` from the `customEditors` contribution point.

provider: CustomTextEditorProvider | CustomReadonlyEditorProvider<CustomDocument> | CustomEditorProvider<CustomDocument>

Provider that resolves custom editors.

options?: {supportsMultipleEditorsPerDocument: boolean, webviewOptions: WebviewPanelOptions}

Options for the provider.

Returns

Description

Disposable

Disposable that unregisters the provider.

registerFileDecorationProvider(provider: FileDecorationProvider): Disposable

Register a file decoration provider.

Parameter

Description

provider: FileDecorationProvider

A FileDecorationProvider.

Returns

Description

Disposable

A Disposable that unregisters the provider.

registerTerminalLinkProvider(provider: TerminalLinkProvider<TerminalLink>): Disposable

Register provider that enables the detection and handling of links within the terminal.

Parameter

Description

provider: TerminalLinkProvider<TerminalLink>

The provider that provides the terminal links.

Returns

Description

Disposable

Disposable that unregisters the provider.

registerTerminalProfileProvider(id: string, provider: TerminalProfileProvider): Disposable

Registers a provider for a contributed terminal profile.

Parameter

Description

id: string

The ID of the contributed terminal profile.

provider: TerminalProfileProvider

The terminal profile provider.

Returns

Description

Disposable

A disposable that unregisters the provider.

registerTreeDataProvider<T>(viewId: string, treeDataProvider: TreeDataProvider<T>): Disposable

Register a TreeDataProvider for the view contributed using the extension point `views`. This will allow you to contribute data to the TreeView and update if the data changes.

**Note:** To get access to the TreeView and perform operations on it, use createTreeView.

Parameter

Description

viewId: string

Id of the view contributed using the extension point `views`.

treeDataProvider: TreeDataProvider<T>

A TreeDataProvider that provides tree data for the view

Returns

Description

Disposable

A disposable that unregisters the TreeDataProvider.

registerUriHandler(handler: UriHandler): Disposable

Registers a uri handler capable of handling system-wide uris. In case there are multiple windows open, the topmost window will handle the uri. A uri handler is scoped to the extension it is contributed from; it will only be able to handle uris which are directed to the extension itself. A uri must respect the following rules:

*   The uri-scheme must be `vscode.env.uriScheme`;
*   The uri-authority must be the extension id (e.g. `my.extension`);
*   The uri-path, -query and -fragment parts are arbitrary.

For example, if the `my.extension` extension registers a uri handler, it will only be allowed to handle uris with the prefix `product-name://my.extension`.

An extension can only register a single uri handler in its entire activation lifetime.

*   _Note:_ There is an activation event `onUri` that fires when a uri directed for the current extension is about to be handled.

Parameter

Description

handler: UriHandler

The uri handler to register for this extension.

Returns

Description

Disposable

A disposable that unregisters the handler.

registerWebviewPanelSerializer(viewType: string, serializer: WebviewPanelSerializer<unknown>): Disposable

Registers a webview panel serializer.

Extensions that support reviving should have an `"onWebviewPanel:viewType"` activation event and make sure that `registerWebviewPanelSerializer` is called during activation.

Only a single serializer may be registered at a time for a given `viewType`.

Parameter

Description

viewType: string

Type of the webview panel that can be serialized.

serializer: WebviewPanelSerializer<unknown>

Webview serializer.

Returns

Description

Disposable

A disposable that unregisters the serializer.

registerWebviewViewProvider(viewId: string, provider: WebviewViewProvider, options?: {webviewOptions: {retainContextWhenHidden: boolean}}): Disposable

Register a new provider for webview views.

Parameter

Description

viewId: string

Unique id of the view. This should match the `id` from the `views` contribution in the package.json.

provider: WebviewViewProvider

Provider for the webview views.

options?: {webviewOptions: {retainContextWhenHidden: boolean}}

Returns

Description

Disposable

Disposable that unregisters the provider.

setStatusBarMessage(text: string, hideAfterTimeout: number): Disposable

Set a message to the status bar. This is a short hand for the more powerful status bar items.

Parameter

Description

text: string

The message to show, supports icon substitution as in status bar items.

hideAfterTimeout: number

Timeout in milliseconds after which the message will be disposed.

Returns

Description

Disposable

A disposable which hides the status bar message.

setStatusBarMessage(text: string, hideWhenDone: Thenable<any>): Disposable

Set a message to the status bar. This is a short hand for the more powerful status bar items.

Parameter

Description

text: string

The message to show, supports icon substitution as in status bar items.

hideWhenDone: Thenable<any>

Thenable on which completion (resolve or reject) the message will be disposed.

Returns

Description

Disposable

A disposable which hides the status bar message.

setStatusBarMessage(text: string): Disposable

Set a message to the status bar. This is a short hand for the more powerful status bar items.

_Note_ that status bar messages stack and that they must be disposed when no longer used.

Parameter

Description

text: string

The message to show, supports icon substitution as in status bar items.

Returns

Description

Disposable

A disposable which hides the status bar message.

showErrorMessage<T extends string>(message: string, ...items: T[]): Thenable<T | undefined>

Show an error message.

_See also_ showInformationMessage

Parameter

Description

message: string

The message to show.

...items: T[]

A set of items that will be rendered as actions in the message.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined` when being dismissed.

showErrorMessage<T extends string>(message: string, options: MessageOptions, ...items: T[]): Thenable<T | undefined>

Show an error message.

_See also_ showInformationMessage

Parameter

Description

message: string

The message to show.

options: MessageOptions

Configures the behaviour of the message.

...items: T[]

A set of items that will be rendered as actions in the message.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined` when being dismissed.

showErrorMessage<T extends MessageItem>(message: string, ...items: T[]): Thenable<T | undefined>

Show an error message.

_See also_ showInformationMessage

Parameter

Description

message: string

The message to show.

...items: T[]

A set of items that will be rendered as actions in the message.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined` when being dismissed.

showErrorMessage<T extends MessageItem>(message: string, options: MessageOptions, ...items: T[]): Thenable<T | undefined>

Show an error message.

_See also_ showInformationMessage

Parameter

Description

message: string

The message to show.

options: MessageOptions

Configures the behaviour of the message.

...items: T[]

A set of items that will be rendered as actions in the message.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined` when being dismissed.

showInformationMessage<T extends string>(message: string, ...items: T[]): Thenable<T | undefined>

Show an information message to users. Optionally provide an array of items which will be presented as clickable buttons.

Parameter

Description

message: string

The message to show.

...items: T[]

A set of items that will be rendered as actions in the message.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined` when being dismissed.

showInformationMessage<T extends string>(message: string, options: MessageOptions, ...items: T[]): Thenable<T | undefined>

Show an information message to users. Optionally provide an array of items which will be presented as clickable buttons.

Parameter

Description

message: string

The message to show.

options: MessageOptions

Configures the behaviour of the message.

...items: T[]

A set of items that will be rendered as actions in the message.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined` when being dismissed.

showInformationMessage<T extends MessageItem>(message: string, ...items: T[]): Thenable<T | undefined>

Show an information message.

_See also_ showInformationMessage

Parameter

Description

message: string

The message to show.

...items: T[]

A set of items that will be rendered as actions in the message.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined` when being dismissed.

showInformationMessage<T extends MessageItem>(message: string, options: MessageOptions, ...items: T[]): Thenable<T | undefined>

Show an information message.

_See also_ showInformationMessage

Parameter

Description

message: string

The message to show.

options: MessageOptions

Configures the behaviour of the message.

...items: T[]

A set of items that will be rendered as actions in the message.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined` when being dismissed.

showInputBox(options?: InputBoxOptions, token?: CancellationToken): Thenable<string | undefined>

Opens an input box to ask the user for input.

The returned value will be `undefined` if the input box was canceled (e.g., pressing ESC). Otherwise the returned value will be the string typed by the user or an empty string if the user did not type anything but dismissed the input box with OK.

Parameter

Description

options?: InputBoxOptions

Configures the behavior of the input box.

token?: CancellationToken

A token that can be used to signal cancellation.

Returns

Description

Thenable<string | undefined>

A thenable that resolves to a string the user provided or to `undefined` in case of dismissal.

showNotebookDocument(document: NotebookDocument, options?: NotebookDocumentShowOptions): Thenable<NotebookEditor>

Show the given NotebookDocument in a notebook editor.

Parameter

Description

document: NotebookDocument

A text document to be shown.

options?: NotebookDocumentShowOptions

Editor options to configure the behavior of showing the notebook editor.

Returns

Description

Thenable<NotebookEditor>

A promise that resolves to an notebook editor.

showOpenDialog(options?: OpenDialogOptions): Thenable<Uri[] | undefined>

Shows a file open dialog to the user which allows to select a file for opening-purposes.

Parameter

Description

options?: OpenDialogOptions

Options that control the dialog.

Returns

Description

Thenable<Uri[] | undefined>

A promise that resolves to the selected resources or `undefined`.

showQuickPick(items: readonly string[] | Thenable<readonly string[]>, options: QuickPickOptions & {canPickMany: true}, token?: CancellationToken): Thenable<string[] | undefined>

Shows a selection list allowing multiple selections.

Parameter

Description

items: readonly string[] | Thenable<readonly string[]>

An array of strings, or a promise that resolves to an array of strings.

options: QuickPickOptions & {canPickMany: true}

Configures the behavior of the selection list.

token?: CancellationToken

A token that can be used to signal cancellation.

Returns

Description

Thenable<string[] | undefined>

A thenable that resolves to the selected items or `undefined`.

showQuickPick(items: readonly string[] | Thenable<readonly string[]>, options?: QuickPickOptions, token?: CancellationToken): Thenable<string | undefined>

Shows a selection list.

Parameter

Description

items: readonly string[] | Thenable<readonly string[]>

An array of strings, or a promise that resolves to an array of strings.

options?: QuickPickOptions

Configures the behavior of the selection list.

token?: CancellationToken

A token that can be used to signal cancellation.

Returns

Description

Thenable<string | undefined>

A thenable that resolves to the selected string or `undefined`.

showQuickPick<T extends QuickPickItem>(items: readonly T[] | Thenable<readonly T[]>, options: QuickPickOptions & {canPickMany: true}, token?: CancellationToken): Thenable<T[] | undefined>

Shows a selection list allowing multiple selections.

Parameter

Description

items: readonly T[] | Thenable<readonly T[]>

An array of items, or a promise that resolves to an array of items.

options: QuickPickOptions & {canPickMany: true}

Configures the behavior of the selection list.

token?: CancellationToken

A token that can be used to signal cancellation.

Returns

Description

Thenable<T[] | undefined>

A thenable that resolves to the selected items or `undefined`.

showQuickPick<T extends QuickPickItem>(items: readonly T[] | Thenable<readonly T[]>, options?: QuickPickOptions, token?: CancellationToken): Thenable<T | undefined>

Shows a selection list.

Parameter

Description

items: readonly T[] | Thenable<readonly T[]>

An array of items, or a promise that resolves to an array of items.

options?: QuickPickOptions

Configures the behavior of the selection list.

token?: CancellationToken

A token that can be used to signal cancellation.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined`.

showSaveDialog(options?: SaveDialogOptions): Thenable<Uri | undefined>

Shows a file save dialog to the user which allows to select a file for saving-purposes.

Parameter

Description

options?: SaveDialogOptions

Options that control the dialog.

Returns

Description

Thenable<Uri | undefined>

A promise that resolves to the selected resource or `undefined`.

showTextDocument(document: TextDocument, column?: ViewColumn, preserveFocus?: boolean): Thenable<TextEditor>

Show the given document in a text editor. A column can be provided to control where the editor is being shown. Might change the active editor.

Parameter

Description

document: TextDocument

A text document to be shown.

column?: ViewColumn

A view column in which the editor should be shown. The default is the active. Columns that do not exist will be created as needed up to the maximum of ViewColumn.Nine. Use ViewColumn.Beside to open the editor to the side of the currently active one.

preserveFocus?: boolean

When `true` the editor will not take focus.

Returns

Description

Thenable<TextEditor>

A promise that resolves to an editor.

showTextDocument(document: TextDocument, options?: TextDocumentShowOptions): Thenable<TextEditor>

Show the given document in a text editor. Options can be provided to control options of the editor is being shown. Might change the active editor.

Parameter

Description

document: TextDocument

A text document to be shown.

options?: TextDocumentShowOptions

Editor options to configure the behavior of showing the editor.

Returns

Description

Thenable<TextEditor>

A promise that resolves to an editor.

showTextDocument(uri: Uri, options?: TextDocumentShowOptions): Thenable<TextEditor>

A short-hand for `openTextDocument(uri).then(document => showTextDocument(document, options))`.

_See also_ workspace.openTextDocument

Parameter

Description

uri: Uri

A resource identifier.

options?: TextDocumentShowOptions

Editor options to configure the behavior of showing the editor.

Returns

Description

Thenable<TextEditor>

A promise that resolves to an editor.

showWarningMessage<T extends string>(message: string, ...items: T[]): Thenable<T | undefined>

Show a warning message.

_See also_ showInformationMessage

Parameter

Description

message: string

The message to show.

...items: T[]

A set of items that will be rendered as actions in the message.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined` when being dismissed.

showWarningMessage<T extends string>(message: string, options: MessageOptions, ...items: T[]): Thenable<T | undefined>

Show a warning message.

_See also_ showInformationMessage

Parameter

Description

message: string

The message to show.

options: MessageOptions

Configures the behaviour of the message.

...items: T[]

A set of items that will be rendered as actions in the message.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined` when being dismissed.

showWarningMessage<T extends MessageItem>(message: string, ...items: T[]): Thenable<T | undefined>

Show a warning message.

_See also_ showInformationMessage

Parameter

Description

message: string

The message to show.

...items: T[]

A set of items that will be rendered as actions in the message.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined` when being dismissed.

showWarningMessage<T extends MessageItem>(message: string, options: MessageOptions, ...items: T[]): Thenable<T | undefined>

Show a warning message.

_See also_ showInformationMessage

Parameter

Description

message: string

The message to show.

options: MessageOptions

Configures the behaviour of the message.

...items: T[]

A set of items that will be rendered as actions in the message.

Returns

Description

Thenable<T | undefined>

A thenable that resolves to the selected item or `undefined` when being dismissed.

showWorkspaceFolderPick(options?: WorkspaceFolderPickOptions): Thenable<WorkspaceFolder | undefined>

Shows a selection list of workspace folders to pick from. Returns `undefined` if no folder is open.

Parameter

Description

options?: WorkspaceFolderPickOptions

Configures the behavior of the workspace folder list.

Returns

Description

Thenable<WorkspaceFolder | undefined>

A promise that resolves to the workspace folder or `undefined`.

withProgress<R>(options: ProgressOptions, task: (progress: Progress<{increment: number, message: string}>, token: CancellationToken) => Thenable<R>): Thenable<R>

Show progress in the editor. Progress is shown while running the given callback and while the promise it returned isn't resolved nor rejected. The location at which progress should show (and other details) is defined via the passed ProgressOptions.

Parameter

Description

options: ProgressOptions

A ProgressOptions-object describing the options to use for showing progress, like its location

task: (progress: Progress<{increment: number, message: string}>, token: CancellationToken) => Thenable<R>

A callback returning a promise. Progress state can be reported with the provided Progress-object.

To report discrete progress, use `increment` to indicate how much work has been completed. Each call with a `increment` value will be summed up and reflected as overall progress until 100% is reached (a value of e.g. `10` accounts for `10%` of work done). Note that currently only `ProgressLocation.Notification` is capable of showing discrete progress.

To monitor if the operation has been cancelled by the user, use the provided CancellationToken. Note that currently only `ProgressLocation.Notification` is supporting to show a cancel button to cancel the long running operation.

Returns

Description

Thenable<R>

The thenable the task-callback returned.

withScmProgress<R>(task: (progress: Progress<number>) => Thenable<R>): Thenable<R>

Show progress in the Source Control viewlet while running the given callback and while its returned promise isn't resolve or rejected.

*   _deprecated_ - Use `withProgress` instead.

Parameter

Description

task: (progress: Progress<number>) => Thenable<R>

A callback returning a promise. Progress increments can be reported with the provided Progress-object.

Returns

Description

Thenable<R>

The thenable the task did return.

## workspace

Namespace for dealing with the current workspace. A workspace is the collection of one or more folders that are opened in an editor window (instance).

It is also possible to open an editor without a workspace. For example, when you open a new editor window by selecting a file from your platform's File menu, you will not be inside a workspace. In this mode, some of the editor's capabilities are reduced but you can still open text files and edit them.

Refer to https://code.visualstudio.com/docs/editor/workspaces for more information on the concept of workspaces.

The workspace offers support for listening to fs events and for finding files. Both perform well and run _outside_ the editor-process so that they should be always used instead of nodejs-equivalents.

#### Variables

fs: FileSystem

A file system instance that allows to interact with local and remote files, e.g. `vscode.workspace.fs.readDirectory(someUri)` allows to retrieve all entries of a directory or `vscode.workspace.fs.stat(anotherUri)` returns the meta data for a file.

isTrusted: boolean

When true, the user has explicitly trusted the contents of the workspace.

name: string | undefined

The name of the workspace. `undefined` when no workspace has been opened.

Refer to https://code.visualstudio.com/docs/editor/workspaces for more information on the concept of workspaces.

notebookDocuments: readonly NotebookDocument[]

All notebook documents currently known to the editor.

rootPath: string | undefined

The uri of the first entry of workspaceFolders as `string`. `undefined` if there is no first entry.

Refer to https://code.visualstudio.com/docs/editor/workspaces for more information on workspaces.

*   _deprecated_ - Use workspaceFolders instead.

textDocuments: readonly TextDocument[]

All text documents currently known to the editor.

workspaceFile: Uri | undefined

The location of the workspace file, for example:

`file:///Users/name/Development/myProject.code-workspace`

or

`untitled:1555503116870`

for a workspace that is untitled and not yet saved.

Depending on the workspace that is opened, the value will be:

*   `undefined` when no workspace is opened
*   the path of the workspace file as `Uri` otherwise. if the workspace is untitled, the returned URI will use the `untitled:` scheme

The location can e.g. be used with the `vscode.openFolder` command to open the workspace again after it has been closed.

**Example:**

```
vscode.commands.executeCommand('vscode.openFolder', uriOfWorkspace);
```

Refer to https://code.visualstudio.com/docs/editor/workspaces for more information on the concept of workspaces.

**Note:** it is not advised to use `workspace.workspaceFile` to write configuration data into the file. You can use `workspace.getConfiguration().update()` for that purpose which will work both when a single folder is opened as well as an untitled or saved workspace.

workspaceFolders: readonly WorkspaceFolder[] | undefined

List of workspace folders (0-N) that are open in the editor. `undefined` when no workspace has been opened.

Refer to https://code.visualstudio.com/docs/editor/workspaces for more information on workspaces.

#### Events

onDidChangeConfiguration: Event<ConfigurationChangeEvent>

An event that is emitted when the configuration changed.

onDidChangeNotebookDocument: Event<NotebookDocumentChangeEvent>

An event that is emitted when a notebook has changed.

onDidChangeTextDocument: Event<TextDocumentChangeEvent>

An event that is emitted when a text document is changed. This usually happens when the contents changes but also when other things like the dirty-state changes.

onDidChangeWorkspaceFolders: Event<WorkspaceFoldersChangeEvent>

An event that is emitted when a workspace folder is added or removed.

**Note:** this event will not fire if the first workspace folder is added, removed or changed, because in that case the currently executing extensions (including the one that listens to this event) will be terminated and restarted so that the (deprecated) `rootPath` property is updated to point to the first workspace folder.

onDidCloseNotebookDocument: Event<NotebookDocument>

An event that is emitted when a notebook is disposed.

_Note 1:_ There is no guarantee that this event fires when an editor tab is closed.

_Note 2:_ A notebook can be open but not shown in an editor which means this event can fire for a notebook that has not been shown in an editor.

onDidCloseTextDocument: Event<TextDocument>

An event that is emitted when a text document is disposed or when the language id of a text document has been changed.

_Note 1:_ There is no guarantee that this event fires when an editor tab is closed, use the onDidChangeVisibleTextEditors-event to know when editors change.

_Note 2:_ A document can be open but not shown in an editor which means this event can fire for a document that has not been shown in an editor.

onDidCreateFiles: Event<FileCreateEvent>

An event that is emitted when files have been created.

_Note:_ This event is triggered by user gestures, like creating a file from the explorer, or from the workspace.applyEdit-api, but this event is _not_ fired when files change on disk, e.g triggered by another application, or when using the workspace.fs-api.

onDidDeleteFiles: Event<FileDeleteEvent>

An event that is emitted when files have been deleted.

_Note 1:_ This event is triggered by user gestures, like deleting a file from the explorer, or from the workspace.applyEdit-api, but this event is _not_ fired when files change on disk, e.g triggered by another application, or when using the workspace.fs-api.

_Note 2:_ When deleting a folder with children only one event is fired.

onDidGrantWorkspaceTrust: Event<void>

Event that fires when the current workspace has been trusted.

onDidOpenNotebookDocument: Event<NotebookDocument>

An event that is emitted when a notebook is opened.

onDidOpenTextDocument: Event<TextDocument>

An event that is emitted when a text document is opened or when the language id of a text document has been changed.

To add an event listener when a visible text document is opened, use the TextEditor events in the window namespace. Note that:

*   The event is emitted before the document is updated in the active text editor
*   When a text document is already open (e.g.: open in another visible text editor) this event is not emitted

onDidRenameFiles: Event<FileRenameEvent>

An event that is emitted when files have been renamed.

_Note 1:_ This event is triggered by user gestures, like renaming a file from the explorer, and from the workspace.applyEdit-api, but this event is _not_ fired when files change on disk, e.g triggered by another application, or when using the workspace.fs-api.

_Note 2:_ When renaming a folder with children only one event is fired.

onDidSaveNotebookDocument: Event<NotebookDocument>

An event that is emitted when a notebook is saved.

onDidSaveTextDocument: Event<TextDocument>

An event that is emitted when a text document is saved to disk.

onWillCreateFiles: Event<FileWillCreateEvent>

An event that is emitted when files are being created.

_Note 1:_ This event is triggered by user gestures, like creating a file from the explorer, or from the workspace.applyEdit-api. This event is _not_ fired when files change on disk, e.g triggered by another application, or when using the workspace.fs-api.

_Note 2:_ When this event is fired, edits to files that are are being created cannot be applied.

onWillDeleteFiles: Event<FileWillDeleteEvent>

An event that is emitted when files are being deleted.

_Note 1:_ This event is triggered by user gestures, like deleting a file from the explorer, or from the workspace.applyEdit-api, but this event is _not_ fired when files change on disk, e.g triggered by another application, or when using the workspace.fs-api.

_Note 2:_ When deleting a folder with children only one event is fired.

onWillRenameFiles: Event<FileWillRenameEvent>

An event that is emitted when files are being renamed.

_Note 1:_ This event is triggered by user gestures, like renaming a file from the explorer, and from the workspace.applyEdit-api, but this event is _not_ fired when files change on disk, e.g triggered by another application, or when using the workspace.fs-api.

_Note 2:_ When renaming a folder with children only one event is fired.

onWillSaveNotebookDocument: Event<NotebookDocumentWillSaveEvent>

An event that is emitted when a notebook document will be saved to disk.

_Note 1:_ Subscribers can delay saving by registering asynchronous work. For the sake of data integrity the editor might save without firing this event. For instance when shutting down with dirty files.

_Note 2:_ Subscribers are called sequentially and they can delay saving by registering asynchronous work. Protection against misbehaving listeners is implemented as such:

*   there is an overall time budget that all listeners share and if that is exhausted no further listener is called
*   listeners that take a long time or produce errors frequently will not be called anymore

The current thresholds are 1.5 seconds as overall time budget and a listener can misbehave 3 times before being ignored.

onWillSaveTextDocument: Event<TextDocumentWillSaveEvent>

An event that is emitted when a text document will be saved to disk.

_Note 1:_ Subscribers can delay saving by registering asynchronous work. For the sake of data integrity the editor might save without firing this event. For instance when shutting down with dirty files.

_Note 2:_ Subscribers are called sequentially and they can delay saving by registering asynchronous work. Protection against misbehaving listeners is implemented as such:

*   there is an overall time budget that all listeners share and if that is exhausted no further listener is called
*   listeners that take a long time or produce errors frequently will not be called anymore

The current thresholds are 1.5 seconds as overall time budget and a listener can misbehave 3 times before being ignored.

#### Functions

applyEdit(edit: WorkspaceEdit, metadata?: WorkspaceEditMetadata): Thenable<boolean>

Make changes to one or many resources or create, delete, and rename resources as defined by the given workspace edit.

All changes of a workspace edit are applied in the same order in which they have been added. If multiple textual inserts are made at the same position, these strings appear in the resulting text in the order the 'inserts' were made, unless that are interleaved with resource edits. Invalid sequences like 'delete file a' -> 'insert text in file a' cause failure of the operation.

When applying a workspace edit that consists only of text edits an 'all-or-nothing'-strategy is used. A workspace edit with resource creations or deletions aborts the operation, e.g. consecutive edits will not be attempted, when a single edit fails.

Parameter

Description

edit: WorkspaceEdit

A workspace edit.

metadata?: WorkspaceEditMetadata

Optional metadata for the edit.

Returns

Description

Thenable<boolean>

A thenable that resolves when the edit could be applied.

asRelativePath(pathOrUri: string | Uri, includeWorkspaceFolder?: boolean): string

Returns a path that is relative to the workspace folder or folders.

When there are no workspace folders or when the path is not contained in them, the input is returned.

Parameter

Description

pathOrUri: string | Uri

A path or uri. When a uri is given its fsPath is used.

includeWorkspaceFolder?: boolean

When `true` and when the given path is contained inside a workspace folder the name of the workspace is prepended. Defaults to `true` when there are multiple workspace folders and `false` otherwise.

Returns

Description

string

A path relative to the root or the input.

createFileSystemWatcher(globPattern: GlobPattern, ignoreCreateEvents?: boolean, ignoreChangeEvents?: boolean, ignoreDeleteEvents?: boolean): FileSystemWatcher

Creates a file system watcher that is notified on file events (create, change, delete) depending on the parameters provided.

By default, all opened workspace folders will be watched for file changes recursively.

Additional paths can be added for file watching by providing a RelativePattern with a `base` path to watch. If the path is a folder and the `pattern` is complex (e.g. contains `**` or path segments), it will be watched recursively and otherwise will be watched non-recursively (i.e. only changes to the first level of the path will be reported).

_Note_ that paths that do not exist in the file system will be monitored with a delay until created and then watched depending on the parameters provided. If a watched path is deleted, the watcher will suspend and not report any events until the path is created again.

If possible, keep the use of recursive watchers to a minimum because recursive file watching is quite resource intense.

Providing a `string` as `globPattern` acts as convenience method for watching file events in all opened workspace folders. It cannot be used to add more folders for file watching, nor will it report any file events from folders that are not part of the opened workspace folders.

_Note_ that case-sensitivity of the globPattern parameter will depend on the file system where the watcher is running: on Windows and macOS the matching will be case-insensitive and on Linux it will be case-sensitive.

Optionally, flags to ignore certain kinds of events can be provided.

To stop listening to events the watcher must be disposed.

_Note_ that file events from deleting a folder may not include events for the contained files. For example, when a folder is moved to the trash, only one event is reported because technically this is a rename/move operation and not a delete operation for each files within. On top of that, performance optimizations are in place to fold multiple events that all belong to the same parent operation (e.g. delete folder) into one event for that parent. As such, if you need to know about all deleted files, you have to watch with `**` and deal with all file events yourself.

_Note_ that file events from recursive file watchers may be excluded based on user configuration. The setting `files.watcherExclude` helps to reduce the overhead of file events from folders that are known to produce many file changes at once (such as `.git` folders). As such, it is highly recommended to watch with simple patterns that do not require recursive watchers where the exclude settings are ignored and you have full control over the events.

_Note_ that symbolic links are not automatically followed for file watching unless the path to watch itself is a symbolic link.

_Note_ that the file paths that are reported for having changed may have a different path casing compared to the actual casing on disk on case-insensitive platforms (typically macOS and Windows but not Linux). We allow a user to open a workspace folder with any desired path casing and try to preserve that. This means:

*   if the path is within any of the workspace folders, the path will match the casing of the workspace folder up to that portion of the path and match the casing on disk for children
*   if the path is outside of any of the workspace folders, the casing will match the case of the path that was provided for watching In the same way, symbolic links are preserved, i.e. the file event will report the path of the symbolic link as it was provided for watching and not the target.

### Examples

The basic anatomy of a file watcher is as follows:

```
const watcher = vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(<folder>, <pattern>));

watcher.onDidChange(uri => { ... }); // listen to files being changed
watcher.onDidCreate(uri => { ... }); // listen to files/folders being created
watcher.onDidDelete(uri => { ... }); // listen to files/folders getting deleted

watcher.dispose(); // dispose after usage
```

#### Workspace file watching

If you only care about file events in a specific workspace folder:

```
vscode.workspace.createFileSystemWatcher(
  new vscode.RelativePattern(vscode.workspace.workspaceFolders[0], '**/*.js')
);
```

If you want to monitor file events across all opened workspace folders:

```
vscode.workspace.createFileSystemWatcher('**/*.js');
```

_Note:_ the array of workspace folders can be empty if no workspace is opened (empty window).

#### Out of workspace file watching

To watch a folder for changes to *.js files outside the workspace (non recursively), pass in a `Uri` to such a folder:

```
vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(vscode.Uri.file(<path to folder outside workspace>), '*.js'));
```

And use a complex glob pattern to watch recursively:

```
vscode.workspace.createFileSystemWatcher(new vscode.RelativePattern(vscode.Uri.file(<path to folder outside workspace>), '**/*.js'));
```

Here is an example for watching the active editor for file changes:

```
vscode.workspace.createFileSystemWatcher(
  new vscode.RelativePattern(vscode.window.activeTextEditor.document.uri, '*')
);
```

Parameter

Description

globPattern: GlobPattern

A glob pattern that controls which file events the watcher should report.

ignoreCreateEvents?: boolean

Ignore when files have been created.

ignoreChangeEvents?: boolean

Ignore when files have been changed.

ignoreDeleteEvents?: boolean

Ignore when files have been deleted.

Returns

Description

FileSystemWatcher

A new file system watcher instance. Must be disposed when no longer needed.

decode(content: Uint8Array): Thenable<string>

Decodes the content from a `Uint8Array` to a `string`. You MUST provide the entire content at once to ensure that the encoding can properly apply. Do not use this method to decode content in chunks, as that may lead to incorrect results.

Will pick an encoding based on settings and the content of the buffer (for example byte order marks).

_Note_ that if you decode content that is unsupported by the encoding, the result may contain substitution characters as appropriate.

*   _throws_ - This method will throw an error when the content is binary.

Parameter

Description

content: Uint8Array

The text content to decode as a `Uint8Array`.

Returns

Description

Thenable<string>

A thenable that resolves to the decoded `string`.

decode(content: Uint8Array, options: {encoding: string}): Thenable<string>

Decodes the content from a `Uint8Array` to a `string` using the provided encoding. You MUST provide the entire content at once to ensure that the encoding can properly apply. Do not use this method to decode content in chunks, as that may lead to incorrect results.

_Note_ that if you decode content that is unsupported by the encoding, the result may contain substitution characters as appropriate.

*   _throws_ - This method will throw an error when the content is binary.

Parameter

Description

content: Uint8Array

The text content to decode as a `Uint8Array`.

options: {encoding: string}

Additional context for picking the encoding.

Returns

Description

Thenable<string>

A thenable that resolves to the decoded `string`.

decode(content: Uint8Array, options: {uri: Uri}): Thenable<string>

Decodes the content from a `Uint8Array` to a `string`. You MUST provide the entire content at once to ensure that the encoding can properly apply. Do not use this method to decode content in chunks, as that may lead to incorrect results.

The encoding is picked based on settings and the content of the buffer (for example byte order marks).

_Note_ that if you decode content that is unsupported by the encoding, the result may contain substitution characters as appropriate.

*   _throws_ - This method will throw an error when the content is binary.

Parameter

Description

content: Uint8Array

The content to decode as a `Uint8Array`.

options: {uri: Uri}

Additional context for picking the encoding.

Returns

Description

Thenable<string>

A thenable that resolves to the decoded `string`.

encode(content: string): Thenable<Uint8Array>

Encodes the content of a `string` to a `Uint8Array`.

Will pick an encoding based on settings.

Parameter

Description

content: string

The content to decode as a `string`.

Returns

Description

Thenable<Uint8Array>

A thenable that resolves to the encoded `Uint8Array`.

encode(content: string, options: {encoding: string}): Thenable<Uint8Array>

Encodes the content of a `string` to a `Uint8Array` using the provided encoding.

Parameter

Description

content: string

The content to decode as a `string`.

options: {encoding: string}

Additional context for picking the encoding.

Returns

Description

Thenable<Uint8Array>

A thenable that resolves to the encoded `Uint8Array`.

encode(content: string, options: {uri: Uri}): Thenable<Uint8Array>

Encodes the content of a `string` to a `Uint8Array`.

The encoding is picked based on settings.

Parameter

Description

content: string

The content to decode as a `string`.

options: {uri: Uri}

Additional context for picking the encoding.

Returns

Description

Thenable<Uint8Array>

A thenable that resolves to the encoded `Uint8Array`.

findFiles(include: GlobPattern, exclude?: GlobPattern, maxResults?: number, token?: CancellationToken): Thenable<Uri[]>

Find files across all workspace folders in the workspace.

**Example**

```
findFiles('**/*.js', '**/node_modules/**', 10);
```

Parameter

Description

include: GlobPattern

A glob pattern that defines the files to search for. The glob pattern will be matched against the file paths of resulting matches relative to their workspace. Use a relative pattern to restrict the search results to a workspace folder.

exclude?: GlobPattern

A glob pattern that defines files and folders to exclude. The glob pattern will be matched against the file paths of resulting matches relative to their workspace. When `undefined`, default file-excludes (e.g. the `files.exclude`-setting but not `search.exclude`) will apply. When `null`, no excludes will apply.

maxResults?: number

An upper-bound for the result.

token?: CancellationToken

A token that can be used to signal cancellation to the underlying search engine.

Returns

Description

Thenable<Uri[]>

A thenable that resolves to an array of resource identifiers. Will return no results if no workspace folders are opened.

getConfiguration(section?: string, scope?: ConfigurationScope): WorkspaceConfiguration

Get a workspace configuration object.

When a section-identifier is provided only that part of the configuration is returned. Dots in the section-identifier are interpreted as child-access, like `{ myExt: { setting: { doIt: true }}}` and `getConfiguration('myExt.setting').get('doIt') === true`.

When a scope is provided configuration confined to that scope is returned. Scope can be a resource or a language identifier or both.

Parameter

Description

section?: string

A dot-separated identifier.

scope?: ConfigurationScope

A scope for which the configuration is asked for.

Returns

Description

WorkspaceConfiguration

The full configuration or a subset.

getWorkspaceFolder(uri: Uri): WorkspaceFolder | undefined

Returns the workspace folder that contains a given uri.

*   returns `undefined` when the given uri doesn't match any workspace folder
*   returns the _input_ when the given uri is a workspace folder itself

Parameter

Description

uri: Uri

An uri.

Returns

Description

WorkspaceFolder | undefined

A workspace folder or `undefined`

openNotebookDocument(uri: Uri): Thenable<NotebookDocument>

Open a notebook. Will return early if this notebook is already loaded. Otherwise the notebook is loaded and the onDidOpenNotebookDocument-event fires.

_Note_ that the lifecycle of the returned notebook is owned by the editor and not by the extension. That means an onDidCloseNotebookDocument-event can occur at any time after.

_Note_ that opening a notebook does not show a notebook editor. This function only returns a notebook document which can be shown in a notebook editor but it can also be used for other things.

Parameter

Description

uri: Uri

The resource to open.

Returns

Description

Thenable<NotebookDocument>

A promise that resolves to a notebook

openNotebookDocument(notebookType: string, content?: NotebookData): Thenable<NotebookDocument>

Open an untitled notebook. The editor will prompt the user for a file path when the document is to be saved.

_See also_ workspace.openNotebookDocument

Parameter

Description

notebookType: string

The notebook type that should be used.

content?: NotebookData

The initial contents of the notebook.

Returns

Description

Thenable<NotebookDocument>

A promise that resolves to a notebook.

openTextDocument(uri: Uri, options?: {encoding: string}): Thenable<TextDocument>

Opens a document. Will return early if this document is already open. Otherwise the document is loaded and the didOpen-event fires.

The document is denoted by an Uri. Depending on the scheme the following rules apply:

*   `file`-scheme: Open a file on disk (`openTextDocument(Uri.file(path))`). Will be rejected if the file does not exist or cannot be loaded.
*   `untitled`-scheme: Open a blank untitled file with associated path (`openTextDocument(Uri.file(path).with({ scheme: 'untitled' }))`). The language will be derived from the file name.
*   For all other schemes contributed text document content providers and file system providers are consulted.

_Note_ that the lifecycle of the returned document is owned by the editor and not by the extension. That means an onDidClose-event can occur at any time after opening it.

Parameter

Description

uri: Uri

Identifies the resource to open.

options?: {encoding: string}

Returns

Description

Thenable<TextDocument>

A promise that resolves to a document.

openTextDocument(path: string, options?: {encoding: string}): Thenable<TextDocument>

A short-hand for `openTextDocument(Uri.file(path))`.

_See also_ workspace.openTextDocument

Parameter

Description

path: string

A path of a file on disk.

options?: {encoding: string}

Returns

Description

Thenable<TextDocument>

A promise that resolves to a document.

openTextDocument(options?: {content: string, encoding: string, language: string}): Thenable<TextDocument>

Opens an untitled text document. The editor will prompt the user for a file path when the document is to be saved. The `options` parameter allows to specify the _language_ and/or the _content_ of the document.

Parameter

Description

options?: {content: string, encoding: string, language: string}

Options to control how the document will be created.

Returns

Description

Thenable<TextDocument>

A promise that resolves to a document.

registerFileSystemProvider(scheme: string, provider: FileSystemProvider, options?: {isCaseSensitive: boolean, isReadonly: boolean | MarkdownString}): Disposable

Register a filesystem provider for a given scheme, e.g. `ftp`.

There can only be one provider per scheme and an error is being thrown when a scheme has been claimed by another provider or when it is reserved.

Parameter

Description

scheme: string

The uri-scheme the provider registers for.

provider: FileSystemProvider

The filesystem provider.

options?: {isCaseSensitive: boolean, isReadonly: boolean | MarkdownString}

Immutable metadata about the provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerNotebookSerializer(notebookType: string, serializer: NotebookSerializer, options?: NotebookDocumentContentOptions): Disposable

Register a notebook serializer.

A notebook serializer must be contributed through the `notebooks` extension point. When opening a notebook file, the editor will send the `onNotebook:<notebookType>` activation event, and extensions must register their serializer in return.

Parameter

Description

notebookType: string

A notebook.

serializer: NotebookSerializer

A notebook serializer.

options?: NotebookDocumentContentOptions

Optional context options that define what parts of a notebook should be persisted

Returns

Description

Disposable

A Disposable that unregisters this serializer when being disposed.

registerTaskProvider(type: string, provider: TaskProvider<Task>): Disposable

Register a task provider.

*   _deprecated_ - Use the corresponding function on the `tasks` namespace instead

Parameter

Description

type: string

The task kind type this provider is registered for.

provider: TaskProvider<Task>

A task provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

registerTextDocumentContentProvider(scheme: string, provider: TextDocumentContentProvider): Disposable

Register a text document content provider.

Only one provider can be registered per scheme.

Parameter

Description

scheme: string

The uri-scheme to register for.

provider: TextDocumentContentProvider

A content provider.

Returns

Description

Disposable

A Disposable that unregisters this provider when being disposed.

save(uri: Uri): Thenable<Uri | undefined>

Saves the editor identified by the given resource and returns the resulting resource or `undefined` if save was not successful or no editor with the given resource was found.

**Note** that an editor with the provided resource must be opened in order to be saved.

Parameter

Description

uri: Uri

the associated uri for the opened editor to save.

Returns

Description

Thenable<Uri | undefined>

A thenable that resolves when the save operation has finished.

saveAll(includeUntitled?: boolean): Thenable<boolean>

Save all dirty files.

Parameter

Description

includeUntitled?: boolean

Also save files that have been created during this session.

Returns

Description

Thenable<boolean>

A thenable that resolves when the files have been saved. Will return `false` for any file that failed to save.

saveAs(uri: Uri): Thenable<Uri | undefined>

Saves the editor identified by the given resource to a new file name as provided by the user and returns the resulting resource or `undefined` if save was not successful or cancelled or no editor with the given resource was found.

**Note** that an editor with the provided resource must be opened in order to be saved as.

Parameter

Description

uri: Uri

the associated uri for the opened editor to save as.

Returns

Description

Thenable<Uri | undefined>

A thenable that resolves when the save-as operation has finished.

updateWorkspaceFolders(start: number, deleteCount: number, ...workspaceFoldersToAdd: Array<{name: string, uri: Uri}>): boolean

This method replaces `deleteCount` workspace folders starting at index `start` by an optional set of `workspaceFoldersToAdd` on the `vscode.workspace.workspaceFolders` array. This "splice" behavior can be used to add, remove and change workspace folders in a single operation.

**Note:** in some cases calling this method may result in the currently executing extensions (including the one that called this method) to be terminated and restarted. For example when the first workspace folder is added, removed or changed the (deprecated) `rootPath` property is updated to point to the first workspace folder. Another case is when transitioning from an empty or single-folder workspace into a multi-folder workspace (see also: https://code.visualstudio.com/docs/editor/workspaces).

Use the onDidChangeWorkspaceFolders() event to get notified when the workspace folders have been updated.

**Example:** adding a new workspace folder at the end of workspace folders

```
workspace.updateWorkspaceFolders(workspace.workspaceFolders ? workspace.workspaceFolders.length : 0, null, { uri: ...});
```

**Example:** removing the first workspace folder

```
workspace.updateWorkspaceFolders(0, 1);
```

**Example:** replacing an existing workspace folder with a new one

```
workspace.updateWorkspaceFolders(0, 1, { uri: ...});
```

It is valid to remove an existing workspace folder and add it again with a different name to rename that folder.

**Note:** it is not valid to call updateWorkspaceFolders() multiple times without waiting for the onDidChangeWorkspaceFolders() to fire.

Parameter

Description

start: number

the zero-based location in the list of currently opened workspace folders from which to start deleting workspace folders.

deleteCount: number

the optional number of workspace folders to remove.

...workspaceFoldersToAdd: Array<{name: string, uri: Uri}>

the optional variable set of workspace folders to add in place of the deleted ones. Each workspace is identified with a mandatory URI and an optional name.

Returns

Description

boolean

true if the operation was successfully started and false otherwise if arguments were used that would result in invalid workspace folder state (e.g. 2 folders with the same URI).

### AccessibilityInformation

Accessibility information which controls screen reader behavior.

#### Properties

label: string

Label to be read out by a screen reader once the item has focus.

role?: string

Role of the widget which defines how a screen reader interacts with it. The role should be set in special cases when for example a tree-like element behaves like a checkbox. If role is not specified the editor will pick the appropriate role automatically. More about aria roles can be found here https://w3c.github.io/aria/#widget_roles

### AuthenticationForceNewSessionOptions

Optional options to be used when calling authentication.getSession with the flag `forceNewSession`.

*   _deprecated_ - Use AuthenticationGetSessionPresentationOptions instead.

AuthenticationForceNewSessionOptions: AuthenticationGetSessionPresentationOptions

### AuthenticationGetSessionOptions

Options to be used when getting an AuthenticationSession from an AuthenticationProvider.

#### Properties

account?: AuthenticationSessionAccountInformation

The account that you would like to get a session for. This is passed down to the Authentication Provider to be used for creating the correct session.

clearSessionPreference?: boolean

Whether the existing session preference should be cleared.

For authentication providers that support being signed into multiple accounts at once, the user will be prompted to select an account to use when getSession is called. This preference is remembered until getSession is called with this flag.

Note: The preference is extension specific. So if one extension calls getSession, it will not affect the session preference for another extension calling getSession. Additionally, the preference is set for the current workspace and also globally. This means that new workspaces will use the "global" value at first and then when this flag is provided, a new value can be set for that workspace. This also means that pre-existing workspaces will not lose their preference if a new workspace sets this flag.

Defaults to false.

createIfNone?: boolean | AuthenticationGetSessionPresentationOptions

Whether login should be performed if there is no matching session.

If true, a modal dialog will be shown asking the user to sign in. If false, a numbered badge will be shown on the accounts activity bar icon. An entry for the extension will be added under the menu to sign in. This allows quietly prompting the user to sign in.

If you provide options, you will also see the dialog but with the additional context provided.

If there is a matching session but the extension has not been granted access to it, setting this to true will also result in an immediate modal dialog, and false will add a numbered badge to the accounts icon.

Defaults to false.

Note: you cannot use this option with silent.

forceNewSession?: boolean | AuthenticationGetSessionPresentationOptions

Whether we should attempt to reauthenticate even if there is already a session available.

If true, a modal dialog will be shown asking the user to sign in again. This is mostly used for scenarios where the token needs to be re minted because it has lost some authorization.

If you provide options, you will also see the dialog but with the additional context provided.

If there are no existing sessions and forceNewSession is true, it will behave identically to createIfNone.

This defaults to false.

silent?: boolean

Whether we should show the indication to sign in in the Accounts menu.

If false, the user will be shown a badge on the Accounts menu with an option to sign in for the extension. If true, no indication will be shown.

Defaults to false.

Note: you cannot use this option with any other options that prompt the user like createIfNone.

### AuthenticationGetSessionPresentationOptions

Optional options to be used when calling authentication.getSession with interactive options `forceNewSession` & `createIfNone`.

#### Properties

detail?: string

An optional message that will be displayed to the user when we ask to re-authenticate. Providing additional context as to why you are asking a user to re-authenticate can help increase the odds that they will accept.

### AuthenticationProvider

A provider for performing authentication to a service.

#### Events

onDidChangeSessions: Event<AuthenticationProviderAuthenticationSessionsChangeEvent>

An Event which fires when the array of sessions has changed, or data within a session has changed.

#### Methods

createSession(scopes: readonly string[], options: AuthenticationProviderSessionOptions): Thenable<AuthenticationSession>

Prompts a user to login.

If login is successful, the onDidChangeSessions event should be fired.

If login fails, a rejected promise should be returned.

If the provider has specified that it does not support multiple accounts, then this should never be called if there is already an existing session matching these scopes.

Parameter

Description

scopes: readonly string[]

A list of scopes, permissions, that the new session should be created with.

options: AuthenticationProviderSessionOptions

Additional options for creating a session.

Returns

Description

Thenable<AuthenticationSession>

A promise that resolves to an authentication session.

getSessions(scopes: readonly string[], options: AuthenticationProviderSessionOptions): Thenable<AuthenticationSession[]>

Get a list of sessions.

Parameter

Description

scopes: readonly string[]

An optional list of scopes. If provided, the sessions returned should match these permissions, otherwise all sessions should be returned.

options: AuthenticationProviderSessionOptions

Additional options for getting sessions.

Returns

Description

Thenable<AuthenticationSession[]>

A promise that resolves to an array of authentication sessions.

removeSession(sessionId: string): Thenable<void>

Removes the session corresponding to session id.

If the removal is successful, the onDidChangeSessions event should be fired.

If a session cannot be removed, the provider should reject with an error message.

Parameter

Description

sessionId: string

The id of the session to remove.

Returns

Description

Thenable<void>

### AuthenticationProviderAuthenticationSessionsChangeEvent

An Event which fires when an AuthenticationSession is added, removed, or changed.

#### Properties

added: readonly AuthenticationSession[]

The AuthenticationSessions of the AuthenticationProvider that have been added.

changed: readonly AuthenticationSession[]

The AuthenticationSessions of the AuthenticationProvider that have been changed. A session changes when its data excluding the id are updated. An example of this is a session refresh that results in a new access token being set for the session.

removed: readonly AuthenticationSession[]

The AuthenticationSessions of the AuthenticationProvider that have been removed.

### AuthenticationProviderInformation

Basic information about an AuthenticationProvider

#### Properties

id: string

The unique identifier of the authentication provider.

label: string

The human-readable name of the authentication provider.

### AuthenticationProviderOptions

Options for creating an AuthenticationProvider.

#### Properties

supportsMultipleAccounts?: boolean

Whether it is possible to be signed into multiple accounts at once with this provider. If not specified, will default to false.

### AuthenticationProviderSessionOptions

The options passed in to the AuthenticationProvider.getSessions and AuthenticationProvider.createSession call.

#### Properties

account?: AuthenticationSessionAccountInformation

The account that is being asked about. If this is passed in, the provider should attempt to return the sessions that are only related to this account.

### AuthenticationSession

Represents a session of a currently logged in user.

#### Properties

accessToken: string

The access token. This token should be used to authenticate requests to a service. Popularized by OAuth.

*   _reference_ - https://oauth.net/2/access-tokens/

account: AuthenticationSessionAccountInformation

The account associated with the session.

id: string

The identifier of the authentication session.

idToken?: string

The ID token. This token contains identity information about the user. Popularized by OpenID Connect.

*   _reference_ - https://openid.net/specs/openid-connect-core-1_0.html#IDToken

scopes: readonly string[]

The permissions granted by the session's access token. Available scopes are defined by the AuthenticationProvider.

### AuthenticationSessionAccountInformation

The information of an account associated with an AuthenticationSession.

#### Properties

id: string

The unique identifier of the account.

label: string

The human-readable name of the account.

### AuthenticationSessionsChangeEvent

An Event which fires when an AuthenticationSession is added, removed, or changed.

#### Properties

provider: AuthenticationProviderInformation

The AuthenticationProvider that has had its sessions change.

### AuthenticationWwwAuthenticateRequest

Represents parameters for creating a session based on a WWW-Authenticate header value. This is used when an API returns a 401 with a WWW-Authenticate header indicating that additional authentication is required. The details of which will be passed down to the authentication provider to create a session.

*   _note_ - The authorization provider must support handling challenges and specifically the challenges in this WWW-Authenticate value.

*   _note_ - For more information on WWW-Authenticate please see https://developer.mozilla.org/docs/Web/HTTP/Reference/Headers/WWW-Authenticate

#### Properties

fallbackScopes?: readonly string[]

The fallback scopes to use if no scopes are found in the WWW-Authenticate header.

wwwAuthenticate: string

The raw WWW-Authenticate header value that triggered this challenge. This will be parsed by the authentication provider to extract the necessary challenge information.

### AutoClosingPair

Describes pairs of strings where the close string will be automatically inserted when typing the opening string.

#### Properties

close: string

The closing string that will be automatically inserted when typing the opening string.

notIn?: SyntaxTokenType[]

A set of tokens where the pair should not be auto closed.

open: string

The string that will trigger the automatic insertion of the closing string.

### BranchCoverage

Contains coverage information for a branch of a StatementCoverage.

#### Constructors

new BranchCoverage(executed: number | boolean, location?: Range | Position, label?: string): BranchCoverage

Parameter

Description

executed: number | boolean

The number of times this branch was executed, or a boolean indicating whether it was executed if the exact count is unknown. If zero or false, the branch will be marked as un-covered.

location?: Range | Position

The branch position.

label?: string

Returns

Description

BranchCoverage

#### Properties

executed: number | boolean

The number of times this branch was executed, or a boolean indicating whether it was executed if the exact count is unknown. If zero or false, the branch will be marked as un-covered.

label?: string

Label for the branch, used in the context of "the ${label} branch was not taken," for example.

location?: Range | Position

Branch location.

### Breakpoint

The base class of all breakpoint types.

#### Constructors

new Breakpoint(enabled?: boolean, condition?: string, hitCondition?: string, logMessage?: string): Breakpoint

Creates a new breakpoint

Parameter

Description

enabled?: boolean

Is breakpoint enabled.

condition?: string

Expression for conditional breakpoints

hitCondition?: string

Expression that controls how many hits of the breakpoint are ignored

logMessage?: string

Log message to display when breakpoint is hit

Returns

Description

Breakpoint

#### Properties

condition?: string

An optional expression for conditional breakpoints.

enabled: boolean

Is breakpoint enabled.

hitCondition?: string

An optional expression that controls how many hits of the breakpoint are ignored.

id: string

The unique ID of the breakpoint.

logMessage?: string

An optional message that gets logged when this breakpoint is hit. Embedded expressions within {} are interpolated by the debug adapter.

### BreakpointsChangeEvent

An event describing the changes to the set of breakpoints.

#### Properties

added: readonly Breakpoint[]

Added breakpoints.

changed: readonly Breakpoint[]

Changed breakpoints.

removed: readonly Breakpoint[]

Removed breakpoints.

### CallHierarchyIncomingCall

Represents an incoming call, e.g. a caller of a method or constructor.

#### Constructors

new CallHierarchyIncomingCall(item: CallHierarchyItem, fromRanges: Range[]): CallHierarchyIncomingCall

Create a new call object.

Parameter

Description

item: CallHierarchyItem

The item making the call.

fromRanges: Range[]

The ranges at which the calls appear.

Returns

Description

CallHierarchyIncomingCall

#### Properties

from: CallHierarchyItem

The item that makes the call.

fromRanges: Range[]

The range at which at which the calls appears. This is relative to the caller denoted by this.from.

### CallHierarchyItem

Represents programming constructs like functions or constructors in the context of call hierarchy.

#### Constructors

new CallHierarchyItem(kind: SymbolKind, name: string, detail: string, uri: Uri, range: Range, selectionRange: Range): CallHierarchyItem

Creates a new call hierarchy item.

Parameter

Description

kind: SymbolKind

name: string

detail: string

uri: Uri

range: Range

selectionRange: Range

Returns

Description

CallHierarchyItem

#### Properties

detail?: string

More detail for this item, e.g. the signature of a function.

kind: SymbolKind

The kind of this item.

name: string

The name of this item.

range: Range

The range enclosing this symbol not including leading/trailing whitespace but everything else, e.g. comments and code.

selectionRange: Range

The range that should be selected and revealed when this symbol is being picked, e.g. the name of a function. Must be contained by the range.

tags?: readonly SymbolTag[]

Tags for this item.

uri: Uri

The resource identifier of this item.

### CallHierarchyOutgoingCall

Represents an outgoing call, e.g. calling a getter from a method or a method from a constructor etc.

#### Constructors

new CallHierarchyOutgoingCall(item: CallHierarchyItem, fromRanges: Range[]): CallHierarchyOutgoingCall

Create a new call object.

Parameter

Description

item: CallHierarchyItem

The item being called

fromRanges: Range[]

The ranges at which the calls appear.

Returns

Description

CallHierarchyOutgoingCall

#### Properties

fromRanges: Range[]

The range at which this item is called. This is the range relative to the caller, e.g the item passed to provideCallHierarchyOutgoingCalls and not this.to.

to: CallHierarchyItem

The item that is called.

### CallHierarchyProvider

The call hierarchy provider interface describes the contract between extensions and the call hierarchy feature which allows to browse calls and caller of function, methods, constructor etc.

#### Methods

prepareCallHierarchy(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<CallHierarchyItem | CallHierarchyItem[]>

Bootstraps call hierarchy by returning the item that is denoted by the given document and position. This item will be used as entry into the call graph. Providers should return `undefined` or `null` when there is no item at the given location.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<CallHierarchyItem | CallHierarchyItem[]>

One or multiple call hierarchy items or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

provideCallHierarchyIncomingCalls(item: CallHierarchyItem, token: CancellationToken): ProviderResult<CallHierarchyIncomingCall[]>

Provide all incoming calls for an item, e.g all callers for a method. In graph terms this describes directed and annotated edges inside the call graph, e.g the given item is the starting node and the result is the nodes that can be reached.

Parameter

Description

item: CallHierarchyItem

The hierarchy item for which incoming calls should be computed.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<CallHierarchyIncomingCall[]>

A set of incoming calls or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

provideCallHierarchyOutgoingCalls(item: CallHierarchyItem, token: CancellationToken): ProviderResult<CallHierarchyOutgoingCall[]>

Provide all outgoing calls for an item, e.g call calls to functions, methods, or constructors from the given item. In graph terms this describes directed and annotated edges inside the call graph, e.g the given item is the starting node and the result is the nodes that can be reached.

Parameter

Description

item: CallHierarchyItem

The hierarchy item for which outgoing calls should be computed.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<CallHierarchyOutgoingCall[]>

A set of outgoing calls or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

### CancellationError

An error type that should be used to signal cancellation of an operation.

This type can be used in response to a cancellation token being cancelled or when an operation is being cancelled by the executor of that operation.

#### Constructors

new CancellationError(): CancellationError

Creates a new cancellation error.

Parameter

Description

Returns

Description

CancellationError

### CancellationToken

A cancellation token is passed to an asynchronous or long running operation to request cancellation, like cancelling a request for completion items because the user continued to type.

To get an instance of a `CancellationToken` use a CancellationTokenSource.

#### Properties

isCancellationRequested: boolean

Is `true` when the token has been cancelled, `false` otherwise.

onCancellationRequested: Event<any>

An Event which fires upon cancellation.

### CancellationTokenSource

A cancellation source creates and controls a cancellation token.

#### Constructors

new CancellationTokenSource(): CancellationTokenSource

Parameter

Description

Returns

Description

CancellationTokenSource

#### Properties

token: CancellationToken

The cancellation token of this source.

#### Methods

cancel(): void

Signal cancellation on the token.

Parameter

Description

Returns

Description

void

dispose(): void

Dispose object and free resources.

Parameter

Description

Returns

Description

void

### CharacterPair

A tuple of two characters, like a pair of opening and closing brackets.

CharacterPair: [string, string]

### ChatContext

Extra context passed to a participant.

#### Properties

history: ReadonlyArray<ChatRequestTurn | ChatResponseTurn>

All of the chat messages so far in the current chat session. Currently, only chat messages for the current participant are included.

### ChatErrorDetails

Represents an error result from a chat request.

#### Properties

message: string

An error message that is shown to the user.

responseIsFiltered?: boolean

If set to true, the response will be partly blurred out.

### ChatFollowup

A followup question suggested by the participant.

#### Properties

command?: string

By default, the followup goes to the same participant/command. But this property can be set to invoke a different command.

label?: string

A title to show the user. The prompt will be shown by default, when this is unspecified.

participant?: string

By default, the followup goes to the same participant/command. But this property can be set to invoke a different participant by ID. Followups can only invoke a participant that was contributed by the same extension.

prompt: string

The message to send to the chat.

### ChatFollowupProvider

Will be invoked once after each request to get suggested followup questions to show the user. The user can click the followup to send it to the chat.

#### Methods

provideFollowups(result: ChatResult, context: ChatContext, token: CancellationToken): ProviderResult<ChatFollowup[]>

Provide followups for the given result.

Parameter

Description

result: ChatResult

This object has the same properties as the result returned from the participant callback, including `metadata`, but is not the same instance.

context: ChatContext

Extra context passed to a participant.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<ChatFollowup[]>

### ChatLanguageModelToolReference

A reference to a tool that the user manually attached to their request, either using the `#`-syntax inline, or as an attachment via the paperclip button.

#### Properties

name: string

The tool name. Refers to a tool listed in lm.tools.

range?: [start: number, end: number]

The start and end index of the reference in the prompt. When undefined, the reference was not part of the prompt text.

_Note_ that the indices take the leading `#`-character into account which means they can be used to modify the prompt as-is.

### ChatParticipant

A chat participant can be invoked by the user in a chat session, using the prefix. When it is invoked, it handles the chat request and is solely responsible for providing a response to the user. A ChatParticipant is created using chat.createChatParticipant.

#### Events

onDidReceiveFeedback: Event<ChatResultFeedback>

An event that fires whenever feedback for a result is received, e.g. when a user up- or down-votes a result.

The passed result is guaranteed to have the same properties as the result that was previously returned from this chat participant's handler.

#### Properties

followupProvider?: ChatFollowupProvider

This provider will be called once after each request to retrieve suggested followup questions.

iconPath?: IconPath

An icon for the participant shown in UI.

id: string

A unique ID for this participant.

requestHandler: ChatRequestHandler

The handler for requests to this participant.

#### Methods

dispose(): void

Dispose this participant and free resources.

Parameter

Description

Returns

Description

void

### ChatParticipantToolToken

A token that can be passed to lm.invokeTool when invoking a tool inside the context of handling a chat request.

ChatParticipantToolToken: never

### ChatPromptReference

A reference to a value that the user added to their chat request.

#### Properties

id: string

A unique identifier for this kind of reference.

modelDescription?: string

A description of this value that could be used in an LLM prompt.

range?: [start: number, end: number]

The start and end index of the reference in the prompt. When undefined, the reference was not part of the prompt text.

_Note_ that the indices take the leading `#`-character into account which means they can used to modify the prompt as-is.

value: unknown

The value of this reference. The `string | Uri | Location` types are used today, but this could expand in the future.

### ChatRequest

A request to a chat participant.

#### Properties

command: string

The name of the [ChatCommand command](#ChatCommand command) that was selected for this request.

model: LanguageModelChat

This is the model that is currently selected in the UI. Extensions can use this or use lm.selectChatModels to pick another model. Don't hold onto this past the lifetime of the request.

prompt: string

The prompt as entered by the user.

Information about references used in this request is stored in ChatRequest.references.

_Note_ that the [ChatParticipant.name name](#ChatParticipant.name name) of the participant and the [ChatCommand.name command](#ChatCommand.name command) are not part of the prompt.

references: readonly ChatPromptReference[]

The list of references and their values that are referenced in the prompt.

_Note_ that the prompt contains references as authored and that it is up to the participant to further modify the prompt, for instance by inlining reference values or creating links to headings which contain the resolved values. References are sorted in reverse by their range in the prompt. That means the last reference in the prompt is the first in this list. This simplifies string-manipulation of the prompt.

toolInvocationToken: never

A token that can be passed to lm.invokeTool when invoking a tool inside the context of handling a chat request. This associates the tool invocation to a chat session.

toolReferences: readonly ChatLanguageModelToolReference[]

The list of tools that the user attached to their request.

When a tool reference is present, the chat participant should make a chat request using LanguageModelChatToolMode.Required to force the language model to generate input for the tool. Then, the participant can use lm.invokeTool to use the tool attach the result to its request for the user's prompt. The tool may contribute useful extra context for the user's request.

### ChatRequestHandler

ChatRequestHandler: (request: ChatRequest, context: ChatContext, response: ChatResponseStream, token: CancellationToken) => ProviderResult<ChatResult | void>

### ChatRequestTurn

Represents a user request in chat history.

#### Properties

command?: string

The name of the [ChatCommand command](#ChatCommand command) that was selected for this request.

participant: string

The id of the chat participant to which this request was directed.

prompt: string

The prompt as entered by the user.

Information about references used in this request is stored in ChatRequestTurn.references.

_Note_ that the [ChatParticipant.name name](#ChatParticipant.name name) of the participant and the [ChatCommand.name command](#ChatCommand.name command) are not part of the prompt.

references: ChatPromptReference[]

The references that were used in this message.

toolReferences: readonly ChatLanguageModelToolReference[]

The list of tools were attached to this request.

### ChatResponseAnchorPart

Represents a part of a chat response that is an anchor, that is rendered as a link to a target.

#### Constructors

new ChatResponseAnchorPart(value: Uri | Location, title?: string): ChatResponseAnchorPart

Create a new ChatResponseAnchorPart.

Parameter

Description

value: Uri | Location

A uri or location.

title?: string

An optional title that is rendered with value.

Returns

Description

ChatResponseAnchorPart

#### Properties

title?: string

An optional title that is rendered with value.

value: Uri | Location

The target of this anchor.

### ChatResponseCommandButtonPart

Represents a part of a chat response that is a button that executes a command.

#### Constructors

new ChatResponseCommandButtonPart(value: Command): ChatResponseCommandButtonPart

Create a new ChatResponseCommandButtonPart.

Parameter

Description

value: Command

A Command that will be executed when the button is clicked.

Returns

Description

ChatResponseCommandButtonPart

#### Properties

value: Command

The command that will be executed when the button is clicked.

### ChatResponseFileTree

Represents a file tree structure in a chat response.

#### Properties

children?: ChatResponseFileTree[]

An array of child file trees, if the current file tree is a directory.

name: string

The name of the file or directory.

### ChatResponseFileTreePart

Represents a part of a chat response that is a file tree.

#### Constructors

new ChatResponseFileTreePart(value: ChatResponseFileTree[], baseUri: Uri): ChatResponseFileTreePart

Create a new ChatResponseFileTreePart.

Parameter

Description

value: ChatResponseFileTree[]

File tree data.

baseUri: Uri

The base uri to which this file tree is relative.

Returns

Description

ChatResponseFileTreePart

#### Properties

baseUri: Uri

The base uri to which this file tree is relative

value: ChatResponseFileTree[]

File tree data.

### ChatResponseMarkdownPart

Represents a part of a chat response that is formatted as Markdown.

#### Constructors

new ChatResponseMarkdownPart(value: string | MarkdownString): ChatResponseMarkdownPart

Create a new ChatResponseMarkdownPart.

Parameter

Description

value: string | MarkdownString

A markdown string or a string that should be interpreted as markdown. The boolean form of MarkdownString.isTrusted is NOT supported.

Returns

Description

ChatResponseMarkdownPart

#### Properties

value: MarkdownString

A markdown string or a string that should be interpreted as markdown.

### ChatResponsePart

Represents the different chat response types.

ChatResponsePart: ChatResponseMarkdownPart | ChatResponseFileTreePart | ChatResponseAnchorPart | ChatResponseProgressPart | ChatResponseReferencePart | ChatResponseCommandButtonPart

### ChatResponseProgressPart

Represents a part of a chat response that is a progress message.

#### Constructors

new ChatResponseProgressPart(value: string): ChatResponseProgressPart

Create a new ChatResponseProgressPart.

Parameter

Description

value: string

A progress message

Returns

Description

ChatResponseProgressPart

#### Properties

value: string

The progress message

### ChatResponseReferencePart

Represents a part of a chat response that is a reference, rendered separately from the content.

#### Constructors

new ChatResponseReferencePart(value: Uri | Location, iconPath?: IconPath): ChatResponseReferencePart

Create a new ChatResponseReferencePart.

Parameter

Description

value: Uri | Location

A uri or location

iconPath?: IconPath

Icon for the reference shown in UI

Returns

Description

ChatResponseReferencePart

#### Properties

iconPath?: IconPath

The icon for the reference.

value: Uri | Location

The reference target.

### ChatResponseStream

The ChatResponseStream is how a participant is able to return content to the chat view. It provides several methods for streaming different types of content which will be rendered in an appropriate way in the chat view. A participant can use the helper method for the type of content it wants to return, or it can instantiate a ChatResponsePart and use the generic ChatResponseStream.push method to return it.

#### Methods

anchor(value: Uri | Location, title?: string): void

Push an anchor part to this stream. Short-hand for `push(new ChatResponseAnchorPart(value, title))`. An anchor is an inline reference to some type of resource.

Parameter

Description

value: Uri | Location

A uri or location.

title?: string

An optional title that is rendered with value.

Returns

Description

void

button(command: Command): void

Push a command button part to this stream. Short-hand for `push(new ChatResponseCommandButtonPart(value, title))`.

Parameter

Description

command: Command

A Command that will be executed when the button is clicked.

Returns

Description

void

filetree(value: ChatResponseFileTree[], baseUri: Uri): void

Push a filetree part to this stream. Short-hand for `push(new ChatResponseFileTreePart(value))`.

Parameter

Description

value: ChatResponseFileTree[]

File tree data.

baseUri: Uri

The base uri to which this file tree is relative.

Returns

Description

void

markdown(value: string | MarkdownString): void

Push a markdown part to this stream. Short-hand for `push(new ChatResponseMarkdownPart(value))`.

_See also_ ChatResponseStream.push

Parameter

Description

value: string | MarkdownString

A markdown string or a string that should be interpreted as markdown. The boolean form of MarkdownString.isTrusted is NOT supported.

Returns

Description

void

progress(value: string): void

Push a progress part to this stream. Short-hand for `push(new ChatResponseProgressPart(value))`.

Parameter

Description

value: string

A progress message

Returns

Description

void

push(part: ChatResponsePart): void

Pushes a part to this stream.

Parameter

Description

part: ChatResponsePart

A response part, rendered or metadata

Returns

Description

void

reference(value: Uri | Location, iconPath?: IconPath): void

Push a reference to this stream. Short-hand for `push(new ChatResponseReferencePart(value))`.

_Note_ that the reference is not rendered inline with the response.

Parameter

Description

value: Uri | Location

A uri or location

iconPath?: IconPath

Icon for the reference shown in UI

Returns

Description

void

### ChatResponseTurn

Represents a chat participant's response in chat history.

#### Properties

command?: string

The name of the command that this response came from.

participant: string

The id of the chat participant that this response came from.

response: ReadonlyArray<ChatResponseMarkdownPart | ChatResponseFileTreePart | ChatResponseAnchorPart | ChatResponseCommandButtonPart>

The content that was received from the chat participant. Only the stream parts that represent actual content (not metadata) are represented.

result: ChatResult

The result that was received from the chat participant.

### ChatResult

The result of a chat request.

#### Properties

errorDetails?: ChatErrorDetails

If the request resulted in an error, this property defines the error details.

metadata?:

Arbitrary metadata for this result. Can be anything, but must be JSON-stringifyable.

### ChatResultFeedback

Represents user feedback for a result.

#### Properties

kind: ChatResultFeedbackKind

The kind of feedback that was received.

result: ChatResult

The ChatResult for which the user is providing feedback. This object has the same properties as the result returned from the participant callback, including `metadata`, but is not the same instance.

### ChatResultFeedbackKind

Represents the type of user feedback received.

#### Enumeration Members

Unhelpful: 0

The user marked the result as unhelpful.

Helpful: 1

The user marked the result as helpful.

### Clipboard

The clipboard provides read and write access to the system's clipboard.

#### Methods

readText(): Thenable<string>

Read the current clipboard contents as text.

Parameter

Description

Returns

Description

Thenable<string>

A thenable that resolves to a string.

writeText(value: string): Thenable<void>

Writes text into the clipboard.

Parameter

Description

value: string

Returns

Description

Thenable<void>

A thenable that resolves when writing happened.

### CodeAction

A code action represents a change that can be performed in code, e.g. to fix a problem or to refactor code.

A CodeAction must set either edit and/or a command. If both are supplied, the `edit` is applied first, then the command is executed.

#### Constructors

new CodeAction(title: string, kind?: CodeActionKind): CodeAction

Creates a new code action.

A code action must have at least a title and edits and/or a command.

Parameter

Description

title: string

The title of the code action.

kind?: CodeActionKind

The kind of the code action.

Returns

Description

CodeAction

#### Properties

command?: Command

A Command this code action executes.

If this command throws an exception, the editor displays the exception message to users in the editor at the current cursor position.

diagnostics?: Diagnostic[]

Diagnostics that this code action resolves.

disabled?: {reason: string}

Marks that the code action cannot currently be applied.

*   Disabled code actions are not shown in automatic lightbulb code action menu.
    
*   Disabled actions are shown as faded out in the code action menu when the user request a more specific type of code action, such as refactorings.
    
*   If the user has a keybinding that auto applies a code action and only a disabled code actions are returned, the editor will show the user an error message with `reason` in the editor.
    

Parameter

Description

reason: string

Human readable description of why the code action is currently disabled.

This is displayed in the code actions UI.

edit?: WorkspaceEdit

A workspace edit this code action performs.

isPreferred?: boolean

Marks this as a preferred action. Preferred actions are used by the `auto fix` command and can be targeted by keybindings.

A quick fix should be marked preferred if it properly addresses the underlying error. A refactoring should be marked preferred if it is the most reasonable choice of actions to take.

kind?: CodeActionKind

Kind of the code action.

Used to filter code actions.

title: string

A short, human-readable, title for this code action.

### CodeActionContext

Contains additional diagnostic information about the context in which a code action is run.

#### Properties

diagnostics: readonly Diagnostic[]

An array of diagnostics.

only: CodeActionKind

Requested kind of actions to return.

Actions not of this kind are filtered out before being shown by the lightbulb.

triggerKind: CodeActionTriggerKind

The reason why code actions were requested.

### CodeActionKind

Kind of a code action.

Kinds are a hierarchical list of identifiers separated by `.`, e.g. `"refactor.extract.function"`.

Code action kinds are used by the editor for UI elements such as the refactoring context menu. Users can also trigger code actions with a specific kind with the `editor.action.codeAction` command.

#### Static

Empty: CodeActionKind

Empty kind.

Notebook: CodeActionKind

Base kind for all code actions applying to the entire notebook's scope. CodeActionKinds using this should always begin with `notebook.`

This requires that new CodeActions be created for it and contributed via extensions. Pre-existing kinds can not just have the new `notebook.` prefix added to them, as the functionality is unique to the full-notebook scope.

Notebook CodeActionKinds can be initialized as either of the following (both resulting in `notebook.source.xyz`):

*   `const newKind = CodeActionKind.Notebook.append(CodeActionKind.Source.append('xyz').value)`
*   `const newKind = CodeActionKind.Notebook.append('source.xyz')`

Example Kinds/Actions:

*   `notebook.source.organizeImports` (might move all imports to a new top cell)
*   `notebook.source.normalizeVariableNames` (might rename all variables to a standardized casing format)

QuickFix: CodeActionKind

Base kind for quickfix actions: `quickfix`.

Quick fix actions address a problem in the code and are shown in the normal code action context menu.

Refactor: CodeActionKind

Base kind for refactoring actions: `refactor`

Refactoring actions are shown in the refactoring context menu.

RefactorExtract: CodeActionKind

Base kind for refactoring extraction actions: `refactor.extract`

Example extract actions:

*   Extract method
*   Extract function
*   Extract variable
*   Extract interface from class
*   ...

RefactorInline: CodeActionKind

Base kind for refactoring inline actions: `refactor.inline`

Example inline actions:

*   Inline function
*   Inline variable
*   Inline constant
*   ...

RefactorMove: CodeActionKind

Base kind for refactoring move actions: `refactor.move`

Example move actions:

*   Move a function to a new file
*   Move a property between classes
*   Move method to base class
*   ...

RefactorRewrite: CodeActionKind

Base kind for refactoring rewrite actions: `refactor.rewrite`

Example rewrite actions:

*   Convert JavaScript function to class
*   Add or remove parameter
*   Encapsulate field
*   Make method static
*   ...

Source: CodeActionKind

Base kind for source actions: `source`

Source code actions apply to the entire file. They must be explicitly requested and will not show in the normal lightbulb menu. Source actions can be run on save using `editor.codeActionsOnSave` and are also shown in the `source` context menu.

SourceFixAll: CodeActionKind

Base kind for auto-fix source actions: `source.fixAll`.

Fix all actions automatically fix errors that have a clear fix that do not require user input. They should not suppress errors or perform unsafe fixes such as generating new types or classes.

SourceOrganizeImports: CodeActionKind

Base kind for an organize imports source action: `source.organizeImports`.

#### Constructors

new CodeActionKind(value: string): CodeActionKind

Private constructor, use static `CodeActionKind.XYZ` to derive from an existing code action kind.

Parameter

Description

value: string

The value of the kind, such as `refactor.extract.function`.

Returns

Description

CodeActionKind

#### Properties

value: string

String value of the kind, e.g. `"refactor.extract.function"`.

#### Methods

append(parts: string): CodeActionKind

Create a new kind by appending a more specific selector to the current kind.

Does not modify the current kind.

Parameter

Description

parts: string

Returns

Description

CodeActionKind

contains(other: CodeActionKind): boolean

Checks if `other` is a sub-kind of this `CodeActionKind`.

The kind `"refactor.extract"` for example contains `"refactor.extract"` and ``"refactor.extract.function"`, but not` "unicorn.refactor.extract"`, or` "refactor.extractAll"`or`refactor`.

Parameter

Description

other: CodeActionKind

Kind to check.

Returns

Description

boolean

intersects(other: CodeActionKind): boolean

Checks if this code action kind intersects `other`.

The kind `"refactor.extract"` for example intersects `refactor`, `"refactor.extract"` and `"refactor.extract.function"`, but not `"unicorn.refactor.extract"`, or `"refactor.extractAll"`.

Parameter

Description

other: CodeActionKind

Kind to check.

Returns

Description

boolean

### CodeActionProvider<T>

Provides contextual actions for code. Code actions typically either fix problems or beautify/refactor code.

Code actions are surfaced to users in a few different ways:

*   The lightbulb feature, which shows a list of code actions at the current cursor position. The lightbulb's list of actions includes both quick fixes and refactorings.
*   As commands that users can run, such as `Refactor`. Users can run these from the command palette or with keybindings.
*   As source actions, such `Organize Imports`.
*   Quick fixes are shown in the problems view.
*   Change applied on save by the `editor.codeActionsOnSave` setting.

#### Methods

provideCodeActions(document: TextDocument, range: Range | Selection, context: CodeActionContext, token: CancellationToken): ProviderResult<Array<Command | T>>

Get code actions for a given range in a document.

Only return code actions that are relevant to user for the requested range. Also keep in mind how the returned code actions will appear in the UI. The lightbulb widget and `Refactor` commands for instance show returned code actions as a list, so do not return a large number of code actions that will overwhelm the user.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

range: Range | Selection

The selector or range for which the command was invoked. This will always be a selection if the actions are being requested in the currently active editor.

context: CodeActionContext

Provides additional information about what code actions are being requested. You can use this to see what specific type of code actions are being requested by the editor in order to return more relevant actions and avoid returning irrelevant code actions that the editor will discard.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<Array<Command | T>>

An array of code actions, such as quick fixes or refactorings. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

We also support returning `Command` for legacy reasons, however all new extensions should return `CodeAction` object instead.

resolveCodeAction(codeAction: T, token: CancellationToken): ProviderResult<T>

Given a code action fill in its edit-property. Changes to all other properties, like title, are ignored. A code action that has an edit will not be resolved.

_Note_ that a code action provider that returns commands, not code actions, cannot successfully implement this function. Returning commands is deprecated and instead code actions should be returned.

Parameter

Description

codeAction: T

A code action.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T>

The resolved code action or a thenable that resolves to such. It is OK to return the given `item`. When no result is returned, the given `item` will be used.

### CodeActionProviderMetadata

Metadata about the type of code actions that a CodeActionProvider provides.

#### Properties

documentation?: ReadonlyArray<{command: Command, kind: CodeActionKind}>

Static documentation for a class of code actions.

Documentation from the provider is shown in the code actions menu if either:

*   Code actions of `kind` are requested by the editor. In this case, the editor will show the documentation that most closely matches the requested code action kind. For example, if a provider has documentation for both `Refactor` and `RefactorExtract`, when the user requests code actions for `RefactorExtract`, the editor will use the documentation for `RefactorExtract` instead of the documentation for `Refactor`.
    
*   Any code actions of `kind` are returned by the provider.
    

At most one documentation entry will be shown per provider.

providedCodeActionKinds?: readonly CodeActionKind[]

List of CodeActionKinds that a CodeActionProvider may return.

This list is used to determine if a given `CodeActionProvider` should be invoked or not. To avoid unnecessary computation, every `CodeActionProvider` should list use `providedCodeActionKinds`. The list of kinds may either be generic, such as `[CodeActionKind.Refactor]`, or list out every kind provided, such as `[CodeActionKind.Refactor.Extract.append('function'), CodeActionKind.Refactor.Extract.append('constant'), ...]`.

### CodeActionTriggerKind

The reason why code actions were requested.

#### Enumeration Members

Invoke: 1

Code actions were explicitly requested by the user or by an extension.

Automatic: 2

Code actions were requested automatically.

This typically happens when current selection in a file changes, but can also be triggered when file content changes.

### CodeLens

A code lens represents a Command that should be shown along with source text, like the number of references, a way to run tests, etc.

A code lens is _unresolved_ when no command is associated to it. For performance reasons the creation of a code lens and resolving should be done to two stages.

_See also_

*   CodeLensProvider.provideCodeLenses
*   CodeLensProvider.resolveCodeLens

#### Constructors

new CodeLens(range: Range, command?: Command): CodeLens

Creates a new code lens object.

Parameter

Description

range: Range

The range to which this code lens applies.

command?: Command

The command associated to this code lens.

Returns

Description

CodeLens

#### Properties

command?: Command

The command this code lens represents.

isResolved: boolean

`true` when there is a command associated.

range: Range

The range in which this code lens is valid. Should only span a single line.

### CodeLensProvider<T>

A code lens provider adds commands to source text. The commands will be shown as dedicated horizontal lines in between the source text.

#### Events

onDidChangeCodeLenses?: Event<void>

An optional event to signal that the code lenses from this provider have changed.

#### Methods

provideCodeLenses(document: TextDocument, token: CancellationToken): ProviderResult<T[]>

Compute a list of lenses. This call should return as fast as possible and if computing the commands is expensive implementors should only return code lens objects with the range set and implement resolve.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T[]>

An array of code lenses or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

resolveCodeLens(codeLens: T, token: CancellationToken): ProviderResult<T>

This function will be called for each visible code lens, usually when scrolling and after calls to compute-lenses.

Parameter

Description

codeLens: T

Code lens that must be resolved.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T>

The given, resolved code lens or thenable that resolves to such.

### Color

Represents a color in RGBA space.

#### Constructors

new Color(red: number, green: number, blue: number, alpha: number): Color

Creates a new color instance.

Parameter

Description

red: number

The red component.

green: number

The green component.

blue: number

The blue component.

alpha: number

The alpha component.

Returns

Description

Color

#### Properties

alpha: number

The alpha component of this color in the range `[0-1]`.

blue: number

The blue component of this color in the range `[0-1]`.

green: number

The green component of this color in the range `[0-1]`.

red: number

The red component of this color in the range `[0-1]`.

### ColorInformation

Represents a color range from a document.

#### Constructors

new ColorInformation(range: Range, color: Color): ColorInformation

Creates a new color range.

Parameter

Description

range: Range

The range the color appears in. Must not be empty.

color: Color

The value of the color.

Returns

Description

ColorInformation

#### Properties

color: Color

The actual color value for this color range.

range: Range

The range in the document where this color appears.

### ColorPresentation

A color presentation object describes how a Color should be represented as text and what edits are required to refer to it from source code.

For some languages one color can have multiple presentations, e.g. css can represent the color red with the constant `Red`, the hex-value `#ff0000`, or in rgba and hsla forms. In csharp other representations apply, e.g. `System.Drawing.Color.Red`.

#### Constructors

new ColorPresentation(label: string): ColorPresentation

Creates a new color presentation.

Parameter

Description

label: string

The label of this color presentation.

Returns

Description

ColorPresentation

#### Properties

additionalTextEdits?: TextEdit[]

An optional array of additional text edits that are applied when selecting this color presentation. Edits must not overlap with the main edit nor with themselves.

label: string

The label of this color presentation. It will be shown on the color picker header. By default this is also the text that is inserted when selecting this color presentation.

textEdit?: TextEdit

An edit which is applied to a document when selecting this presentation for the color. When `falsy` the label is used.

### ColorTheme

Represents a color theme.

#### Properties

kind: ColorThemeKind

The kind of this color theme: light, dark, high contrast dark and high contrast light.

### ColorThemeKind

Represents a color theme kind.

#### Enumeration Members

Light: 1

A light color theme.

Dark: 2

A dark color theme.

HighContrast: 3

A dark high contrast color theme.

HighContrastLight: 4

A light high contrast color theme.

### Command

Represents a reference to a command. Provides a title which will be used to represent a command in the UI and, optionally, an array of arguments which will be passed to the command handler function when invoked.

#### Properties

arguments?: any[]

Arguments that the command handler should be invoked with.

command: string

The identifier of the actual command handler.

_See also_ commands.registerCommand

title: string

Title of the command, like `save`.

tooltip?: string

A tooltip for the command, when represented in the UI.

### Comment

A comment is displayed within the editor or the Comments Panel, depending on how it is provided.

#### Properties

author: CommentAuthorInformation

The author information of the comment

body: string | MarkdownString

The human-readable comment body

contextValue?: string

Context value of the comment. This can be used to contribute comment specific actions. For example, a comment is given a context value as `editable`. When contributing actions to `comments/comment/title` using `menus` extension point, you can specify context value for key `comment` in `when` expression like `comment == editable`.

```
    "contributes": {
        "menus": {
            "comments/comment/title": [
                {
                    "command": "extension.deleteComment",
                    "when": "comment == editable"
                }
            ]
        }
    }
```

This will show action `extension.deleteComment` only for comments with `contextValue` is `editable`.

label?: string

Optional label describing the Comment Label will be rendered next to authorName if exists.

mode: CommentMode

Comment mode of the comment

reactions?: CommentReaction[]

Optional reactions of the Comment

timestamp?: Date

Optional timestamp that will be displayed in comments. The date will be formatted according to the user's locale and settings.

### CommentAuthorInformation

Author information of a Comment

#### Properties

iconPath?: Uri

The optional icon path for the author

name: string

The display name of the author of the comment

### CommentController

A comment controller is able to provide comments support to the editor and provide users various ways to interact with comments.

#### Properties

commentingRangeProvider?: CommentingRangeProvider

Optional commenting range provider. Provide a list ranges which support commenting to any given resource uri.

If not provided, users cannot leave any comments.

id: string

The id of this comment controller.

label: string

The human-readable label of this comment controller.

options?: CommentOptions

Comment controller options

reactionHandler?: (comment: Comment, reaction: CommentReaction) => Thenable<void>

Optional reaction handler for creating and deleting reactions on a Comment.

Parameter

Description

comment: Comment

reaction: CommentReaction

Returns

Description

Thenable<void>

#### Methods

createCommentThread(uri: Uri, range: Range, comments: readonly Comment[]): CommentThread

Create a comment thread. The comment thread will be displayed in visible text editors (if the resource matches) and Comments Panel once created.

Parameter

Description

uri: Uri

The uri of the document the thread has been created on.

range: Range

The range the comment thread is located within the document.

comments: readonly Comment[]

The ordered comments of the thread.

Returns

Description

CommentThread

dispose(): void

Dispose this comment controller.

Once disposed, all comment threads created by this comment controller will also be removed from the editor and Comments Panel.

Parameter

Description

Returns

Description

void

### CommentingRangeProvider

Commenting range provider for a comment controller.

#### Methods

provideCommentingRanges(document: TextDocument, token: CancellationToken): ProviderResult<Range[] | CommentingRanges>

Provide a list of ranges which allow new comment threads creation or null for a given document

Parameter

Description

document: TextDocument

token: CancellationToken

Returns

Description

ProviderResult<Range[] | CommentingRanges>

### CommentingRanges

The ranges a CommentingRangeProvider enables commenting on.

#### Properties

enableFileComments: boolean

Enables comments to be added to a file without a specific range.

ranges?: Range[]

The ranges which allow new comment threads creation.

### CommentMode

Comment mode of a Comment

#### Enumeration Members

Editing: 0

Displays the comment editor

Preview: 1

Displays the preview of the comment

### CommentOptions

Represents a comment controller's options.

#### Properties

placeHolder?: string

An optional string to show as placeholder in the comment input box when it's focused.

prompt?: string

An optional string to show on the comment input box when it's collapsed.

### CommentReaction

Reactions of a Comment

#### Properties

authorHasReacted: boolean

Whether the author of the comment has reacted to this reaction

count: number

The number of users who have reacted to this reaction

iconPath: string | Uri

Icon for the reaction shown in UI.

label: string

The human-readable label for the reaction

### CommentReply

Command argument for actions registered in `comments/commentThread/context`.

#### Properties

text: string

The value in the comment editor

thread: CommentThread

The active comment thread

### CommentRule

Describes how comments for a language work.

#### Properties

blockComment?: CharacterPair

The block comment character pair, like `/* block comment *&#47;`

lineComment?: string | LineCommentRule

The line comment token, like `// this is a comment`

### CommentThread

A collection of comments representing a conversation at a particular range in a document.

#### Properties

canReply: boolean | CommentAuthorInformation

Whether the thread supports reply. Defaults to true.

collapsibleState: CommentThreadCollapsibleState

Whether the thread should be collapsed or expanded when opening the document. Defaults to Collapsed.

comments: readonly Comment[]

The ordered comments of the thread.

contextValue?: string

Context value of the comment thread. This can be used to contribute thread specific actions. For example, a comment thread is given a context value as `editable`. When contributing actions to `comments/commentThread/title` using `menus` extension point, you can specify context value for key `commentThread` in `when` expression like `commentThread == editable`.

```
"contributes": {
  "menus": {
    "comments/commentThread/title": [
      {
        "command": "extension.deleteCommentThread",
        "when": "commentThread == editable"
      }
    ]
  }
}
```

This will show action `extension.deleteCommentThread` only for comment threads with `contextValue` is `editable`.

label?: string

The optional human-readable label describing the Comment Thread

range: Range

The range the comment thread is located within the document. The thread icon will be shown at the last line of the range. When set to undefined, the comment will be associated with the file, and not a specific range.

state?: CommentThreadState

The optional state of a comment thread, which may affect how the comment is displayed.

uri: Uri

The uri of the document the thread has been created on.

#### Methods

dispose(): void

Dispose this comment thread.

Once disposed, this comment thread will be removed from visible editors and Comment Panel when appropriate.

Parameter

Description

Returns

Description

void

### CommentThreadCollapsibleState

Collapsible state of a comment thread

#### Enumeration Members

Collapsed: 0

Determines an item is collapsed

Expanded: 1

Determines an item is expanded

### CommentThreadState

The state of a comment thread.

#### Enumeration Members

Unresolved: 0

Unresolved thread state

Resolved: 1

Resolved thread state

### CompletionContext

Contains additional information about the context in which completion provider is triggered.

#### Properties

triggerCharacter: string

Character that triggered the completion item provider.

`undefined` if the provider was not triggered by a character.

The trigger character is already in the document when the completion provider is triggered.

triggerKind: CompletionTriggerKind

How the completion was triggered.

### CompletionItem

A completion item represents a text snippet that is proposed to complete text that is being typed.

It is sufficient to create a completion item from just a label. In that case the completion item will replace the word until the cursor with the given label or insertText. Otherwise the given edit is used.

When selecting a completion item in the editor its defined or synthesized text edit will be applied to _all_ cursors/selections whereas additionalTextEdits will be applied as provided.

_See also_

*   CompletionItemProvider.provideCompletionItems
*   CompletionItemProvider.resolveCompletionItem

#### Constructors

new CompletionItem(label: string | CompletionItemLabel, kind?: CompletionItemKind): CompletionItem

Creates a new completion item.

Completion items must have at least a label which then will be used as insert text as well as for sorting and filtering.

Parameter

Description

label: string | CompletionItemLabel

The label of the completion.

kind?: CompletionItemKind

The kind of the completion.

Returns

Description

CompletionItem

#### Properties

additionalTextEdits?: TextEdit[]

An optional array of additional text edits that are applied when selecting this completion. Edits must not overlap with the main edit nor with themselves.

command?: Command

An optional Command that is executed _after_ inserting this completion. _Note_ that additional modifications to the current document should be described with the additionalTextEdits-property.

commitCharacters?: string[]

An optional set of characters that when pressed while this completion is active will accept it first and then type that character. _Note_ that all commit characters should have `length=1` and that superfluous characters will be ignored.

detail?: string

A human-readable string with additional information about this item, like type or symbol information.

documentation?: string | MarkdownString

A human-readable string that represents a doc-comment.

filterText?: string

A string that should be used when filtering a set of completion items. When `falsy` the label is used.

Note that the filter text is matched against the leading word (prefix) which is defined by the range-property.

insertText?: string | SnippetString

A string or snippet that should be inserted in a document when selecting this completion. When `falsy` the label is used.

keepWhitespace?: boolean

Keep whitespace of the insertText as is. By default, the editor adjusts leading whitespace of new lines so that they match the indentation of the line for which the item is accepted - setting this to `true` will prevent that.

kind?: CompletionItemKind

The kind of this completion item. Based on the kind an icon is chosen by the editor.

label: string | CompletionItemLabel

The label of this completion item. By default this is also the text that is inserted when selecting this completion.

preselect?: boolean

Select this item when showing. _Note_ that only one completion item can be selected and that the editor decides which item that is. The rule is that the _first_ item of those that match best is selected.

range?: Range | {inserting: Range, replacing: Range}

A range or a insert and replace range selecting the text that should be replaced by this completion item.

When omitted, the range of the current word is used as replace-range and as insert-range the start of the current word to the current position is used.

_Note 1:_ A range must be a single line and it must contain the position at which completion has been requested. _Note 2:_ A insert range must be a prefix of a replace range, that means it must be contained and starting at the same position.

sortText?: string

A string that should be used when comparing this item with other items. When `falsy` the label is used.

Note that `sortText` is only used for the initial ordering of completion items. When having a leading word (prefix) ordering is based on how well completions match that prefix and the initial ordering is only used when completions match equally well. The prefix is defined by the range-property and can therefore be different for each completion.

tags?: readonly CompletionItemTag[]

Tags for this completion item.

textEdit?: TextEdit

*   _deprecated_ - Use `CompletionItem.insertText` and `CompletionItem.range` instead.

An edit which is applied to a document when selecting this completion. When an edit is provided the value of insertText is ignored.

The Range of the edit must be single-line and on the same line completions were requested at.

### CompletionItemKind

Completion item kinds.

#### Enumeration Members

Text: 0

The `Text` completion item kind.

Method: 1

The `Method` completion item kind.

Function: 2

The `Function` completion item kind.

Constructor: 3

The `Constructor` completion item kind.

Field: 4

The `Field` completion item kind.

Variable: 5

The `Variable` completion item kind.

Class: 6

The `Class` completion item kind.

Interface: 7

The `Interface` completion item kind.

Module: 8

The `Module` completion item kind.

Property: 9

The `Property` completion item kind.

Unit: 10

The `Unit` completion item kind.

Value: 11

The `Value` completion item kind.

Enum: 12

The `Enum` completion item kind.

Keyword: 13

The `Keyword` completion item kind.

Snippet: 14

The `Snippet` completion item kind.

Color: 15

The `Color` completion item kind.

File: 16

The `File` completion item kind.

Reference: 17

The `Reference` completion item kind.

Folder: 18

The `Folder` completion item kind.

EnumMember: 19

The `EnumMember` completion item kind.

Constant: 20

The `Constant` completion item kind.

Struct: 21

The `Struct` completion item kind.

Event: 22

The `Event` completion item kind.

Operator: 23

The `Operator` completion item kind.

TypeParameter: 24

The `TypeParameter` completion item kind.

User: 25

The `User` completion item kind.

Issue: 26

The `Issue` completion item kind.

### CompletionItemLabel

A structured label for a completion item.

#### Properties

description?: string

An optional string which is rendered less prominently after CompletionItemLabel.detail. Should be used for fully qualified names or file path.

detail?: string

An optional string which is rendered less prominently directly after label, without any spacing. Should be used for function signatures or type annotations.

label: string

The label of this completion item.

By default this is also the text that is inserted when this completion is selected.

### CompletionItemProvider<T>

The completion item provider interface defines the contract between extensions and IntelliSense.

Providers can delay the computation of the detail and documentation properties by implementing the resolveCompletionItem-function. However, properties that are needed for the initial sorting and filtering, like `sortText`, `filterText`, `insertText`, and `range`, must not be changed during resolve.

Providers are asked for completions either explicitly by a user gesture or -depending on the configuration- implicitly when typing words or trigger characters.

#### Methods

provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken, context: CompletionContext): ProviderResult<CompletionList<T> | T[]>

Provide completion items for the given position and document.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

token: CancellationToken

A cancellation token.

context: CompletionContext

How the completion was triggered.

Returns

Description

ProviderResult<CompletionList<T> | T[]>

An array of completions, a completion list, or a thenable that resolves to either. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

resolveCompletionItem(item: T, token: CancellationToken): ProviderResult<T>

Given a completion item fill in more data, like doc-comment or details.

The editor will only resolve a completion item once.

_Note_ that this function is called when completion items are already showing in the UI or when an item has been selected for insertion. Because of that, no property that changes the presentation (label, sorting, filtering etc) or the (primary) insert behaviour (insertText) can be changed.

This function may fill in additionalTextEdits. However, that means an item might be inserted _before_ resolving is done and in that case the editor will do a best effort to still apply those additional text edits.

Parameter

Description

item: T

A completion item currently active in the UI.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T>

The resolved completion item or a thenable that resolves to of such. It is OK to return the given `item`. When no result is returned, the given `item` will be used.

### CompletionItemTag

Completion item tags are extra annotations that tweak the rendering of a completion item.

#### Enumeration Members

Deprecated: 1

Render a completion as obsolete, usually using a strike-out.

### CompletionList<T>

Represents a collection of completion items to be presented in the editor.

#### Constructors

new CompletionList<T extends CompletionItem>(items?: T[], isIncomplete?: boolean): CompletionList<T>

Creates a new completion list.

Parameter

Description

items?: T[]

The completion items.

isIncomplete?: boolean

The list is not complete.

Returns

Description

CompletionList<T>

#### Properties

isIncomplete?: boolean

This list is not complete. Further typing should result in recomputing this list.

items: T[]

The completion items.

### CompletionTriggerKind

How a completion provider was triggered

#### Enumeration Members

Invoke: 0

Completion was triggered normally.

TriggerCharacter: 1

Completion was triggered by a trigger character.

TriggerForIncompleteCompletions: 2

Completion was re-triggered as current completion list is incomplete

### ConfigurationChangeEvent

An event describing the change in Configuration

#### Methods

affectsConfiguration(section: string, scope?: ConfigurationScope): boolean

Checks if the given section has changed. If scope is provided, checks if the section has changed for resources under the given scope.

Parameter

Description

section: string

Configuration name, supports _dotted_ names.

scope?: ConfigurationScope

A scope in which to check.

Returns

Description

boolean

`true` if the given section has changed.

### ConfigurationScope

The configuration scope which can be:

*   a Uri representing a resource
*   a TextDocument representing an open text document
*   a WorkspaceFolder representing a workspace folder
*   an object containing:
    *   `uri`: an optional Uri of a text document
    *   `languageId`: the language identifier of a text document

ConfigurationScope: Uri | TextDocument | WorkspaceFolder | {languageId: string, uri: Uri}

### ConfigurationTarget

The configuration target

#### Enumeration Members

Global: 1

Global configuration

Workspace: 2

Workspace configuration

WorkspaceFolder: 3

Workspace folder configuration

### CustomDocument

Represents a custom document used by a CustomEditorProvider.

Custom documents are only used within a given `CustomEditorProvider`. The lifecycle of a `CustomDocument` is managed by the editor. When no more references remain to a `CustomDocument`, it is disposed of.

#### Properties

uri: Uri

The associated uri for this document.

#### Methods

dispose(): void

Dispose of the custom document.

This is invoked by the editor when there are no more references to a given `CustomDocument` (for example when all editors associated with the document have been closed.)

Parameter

Description

Returns

Description

void

### CustomDocumentBackup

A backup for an CustomDocument.

#### Properties

id: string

Unique identifier for the backup.

This id is passed back to your extension in openCustomDocument when opening a custom editor from a backup.

#### Methods

delete(): void

Delete the current backup.

This is called by the editor when it is clear the current backup is no longer needed, such as when a new backup is made or when the file is saved.

Parameter

Description

Returns

Description

void

### CustomDocumentBackupContext

Additional information used to implement CustomDocumentBackup.

#### Properties

destination: Uri

Suggested file location to write the new backup.

Note that your extension is free to ignore this and use its own strategy for backup.

If the editor is for a resource from the current workspace, `destination` will point to a file inside `ExtensionContext.storagePath`. The parent folder of `destination` may not exist, so make sure to created it before writing the backup to this location.

### CustomDocumentContentChangeEvent<T>

Event triggered by extensions to signal to the editor that the content of a CustomDocument has changed.

_See also_ CustomEditorProvider.onDidChangeCustomDocument.

#### Properties

document: T

The document that the change is for.

### CustomDocumentEditEvent<T>

Event triggered by extensions to signal to the editor that an edit has occurred on an CustomDocument.

_See also_ CustomEditorProvider.onDidChangeCustomDocument.

#### Properties

document: T

The document that the edit is for.

label?: string

Display name describing the edit.

This will be shown to users in the UI for undo/redo operations.

#### Methods

redo(): void | Thenable<void>

Redo the edit operation.

This is invoked by the editor when the user redoes this edit. To implement `redo`, your extension should restore the document and editor to the state they were in just after this edit was added to the editor's internal edit stack by CustomEditorProvider.onDidChangeCustomDocument.

Parameter

Description

Returns

Description

void | Thenable<void>

undo(): void | Thenable<void>

Undo the edit operation.

This is invoked by the editor when the user undoes this edit. To implement `undo`, your extension should restore the document and editor to the state they were in just before this edit was added to the editor's internal edit stack by CustomEditorProvider.onDidChangeCustomDocument.

Parameter

Description

Returns

Description

void | Thenable<void>

### CustomDocumentOpenContext

Additional information about the opening custom document.

#### Properties

backupId: string

The id of the backup to restore the document from or `undefined` if there is no backup.

If this is provided, your extension should restore the editor from the backup instead of reading the file from the user's workspace.

untitledDocumentData: Uint8Array

If the URI is an untitled file, this will be populated with the byte data of that file

If this is provided, your extension should utilize this byte data rather than executing fs APIs on the URI passed in

### CustomEditorProvider<T>

Provider for editable custom editors that use a custom document model.

Custom editors use CustomDocument as their document model instead of a TextDocument. This gives extensions full control over actions such as edit, save, and backup.

You should use this type of custom editor when dealing with binary files or more complex scenarios. For simple text based documents, use CustomTextEditorProvider instead.

#### Events

onDidChangeCustomDocument: Event<CustomDocumentEditEvent<T>> | Event<CustomDocumentContentChangeEvent<T>>

Signal that an edit has occurred inside a custom editor.

This event must be fired by your extension whenever an edit happens in a custom editor. An edit can be anything from changing some text, to cropping an image, to reordering a list. Your extension is free to define what an edit is and what data is stored on each edit.

Firing onDidChangeCustomDocument causes the editors to be marked as being dirty. This is cleared when the user either saves or reverts the file.

Editors that support undo/redo must fire a CustomDocumentEditEvent whenever an edit happens. This allows users to undo and redo the edit using the editor's standard keyboard shortcuts. The editor will also mark the editor as no longer being dirty if the user undoes all edits to the last saved state.

Editors that support editing but cannot use the editor's standard undo/redo mechanism must fire a CustomDocumentContentChangeEvent. The only way for a user to clear the dirty state of an editor that does not support undo/redo is to either `save` or `revert` the file.

An editor should only ever fire CustomDocumentEditEvent events, or only ever fire CustomDocumentContentChangeEvent events.

#### Methods

backupCustomDocument(document: T, context: CustomDocumentBackupContext, cancellation: CancellationToken): Thenable<CustomDocumentBackup>

Back up a dirty custom document.

Backups are used for hot exit and to prevent data loss. Your backupCustomDocument method should persist the resource in its current state, i.e. with the edits applied. Most commonly this means saving the resource to disk in the `ExtensionContext.storagePath`. When the editor reloads and your custom editor is opened for a resource, your extension should first check to see if any backups exist for the resource. If there is a backup, your extension should load the file contents from there instead of from the resource in the workspace.

backupCustomDocument is triggered approximately one second after the user stops editing the document. If the user rapidly edits the document, backupCustomDocument will not be invoked until the editing stops.

backupCustomDocument is not invoked when `auto save` is enabled (since auto save already persists the resource).

Parameter

Description

document: T

Document to backup.

context: CustomDocumentBackupContext

Information that can be used to backup the document.

cancellation: CancellationToken

Token that signals the current backup since a new backup is coming in. It is up to your extension to decided how to respond to cancellation. If for example your extension is backing up a large file in an operation that takes time to complete, your extension may decide to finish the ongoing backup rather than cancelling it to ensure that the editor has some valid backup.

Returns

Description

Thenable<CustomDocumentBackup>

A Thenable signaling that the backup has completed.

openCustomDocument(uri: Uri, openContext: CustomDocumentOpenContext, token: CancellationToken): T | Thenable<T>

Create a new document for a given resource.

`openCustomDocument` is called when the first time an editor for a given resource is opened. The opened document is then passed to resolveCustomEditor so that the editor can be shown to the user.

Already opened CustomDocuments are re-used if the user opened additional editors. When all editors for a given resource are closed, the CustomDocuments is disposed of. Opening an editor at this point will trigger another call to `openCustomDocument`.

Parameter

Description

uri: Uri

Uri of the document to open.

openContext: CustomDocumentOpenContext

Additional information about the opening custom document.

token: CancellationToken

A cancellation token that indicates the result is no longer needed.

Returns

Description

T | Thenable<T>

The custom document.

resolveCustomEditor(document: T, webviewPanel: WebviewPanel, token: CancellationToken): void | Thenable<void>

Resolve a custom editor for a given resource.

This is called whenever the user opens a new editor for this `CustomEditorProvider`.

Parameter

Description

document: T

Document for the resource being resolved.

webviewPanel: WebviewPanel

The webview panel used to display the editor UI for this resource.

During resolve, the provider must fill in the initial html for the content webview panel and hook up all the event listeners on it that it is interested in. The provider can also hold onto the `WebviewPanel` to use later for example in a command. See WebviewPanel for additional details.

token: CancellationToken

A cancellation token that indicates the result is no longer needed.

Returns

Description

void | Thenable<void>

Optional thenable indicating that the custom editor has been resolved.

revertCustomDocument(document: T, cancellation: CancellationToken): Thenable<void>

Revert a custom document to its last saved state.

This method is invoked by the editor when the user triggers `File: Revert File` in a custom editor. (Note that this is only used using the editor's `File: Revert File` command and not on a `git revert` of the file).

The implementer must make sure all editor instances (webviews) for document are displaying the document in the same state is saved in. This usually means reloading the file from the workspace.

Parameter

Description

document: T

Document to revert.

cancellation: CancellationToken

Token that signals the revert is no longer required.

Returns

Description

Thenable<void>

A Thenable signaling that the revert has completed.

saveCustomDocument(document: T, cancellation: CancellationToken): Thenable<void>

Save a custom document.

This method is invoked by the editor when the user saves a custom editor. This can happen when the user triggers save while the custom editor is active, by commands such as `save all`, or by auto save if enabled.

The implementer must persist the custom editor. This usually means writing the file data for the custom document to disk. After saveCustomDocument completes, any associated editor instances will no longer be marked as dirty.

Parameter

Description

document: T

Document to save.

cancellation: CancellationToken

Token that signals the save is no longer required (for example, if another save was triggered).

Returns

Description

Thenable<void>

A Thenable that saving has completed.

saveCustomDocumentAs(document: T, destination: Uri, cancellation: CancellationToken): Thenable<void>

Save a custom document to a different location.

This method is invoked by the editor when the user triggers 'save as' on a custom editor. The implementer must persist the custom editor to destination.

When the user accepts save as, the current editor is be replaced by an non-dirty editor for the newly saved file.

Parameter

Description

document: T

Document to save.

destination: Uri

Location to save to.

cancellation: CancellationToken

Token that signals the save is no longer required.

Returns

Description

Thenable<void>

A Thenable signaling that saving has completed.

### CustomExecution

Class used to execute an extension callback as a task.

#### Constructors

new CustomExecution(callback: (resolvedDefinition: TaskDefinition) => Thenable<Pseudoterminal>): CustomExecution

Constructs a CustomExecution task object. The callback will be executed when the task is run, at which point the extension should return the Pseudoterminal it will "run in". The task should wait to do further execution until Pseudoterminal.open is called. Task cancellation should be handled using Pseudoterminal.close. When the task is complete fire Pseudoterminal.onDidClose.

Parameter

Description

callback: (resolvedDefinition: TaskDefinition) => Thenable<Pseudoterminal>

The callback that will be called when the task is started by a user. Any ${} style variables that were in the task definition will be resolved and passed into the callback as `resolvedDefinition`.

Returns

Description

CustomExecution

### CustomReadonlyEditorProvider<T>

Provider for readonly custom editors that use a custom document model.

Custom editors use CustomDocument as their document model instead of a TextDocument.

You should use this type of custom editor when dealing with binary files or more complex scenarios. For simple text based documents, use CustomTextEditorProvider instead.

#### Methods

openCustomDocument(uri: Uri, openContext: CustomDocumentOpenContext, token: CancellationToken): T | Thenable<T>

Create a new document for a given resource.

`openCustomDocument` is called when the first time an editor for a given resource is opened. The opened document is then passed to resolveCustomEditor so that the editor can be shown to the user.

Already opened CustomDocuments are re-used if the user opened additional editors. When all editors for a given resource are closed, the CustomDocuments is disposed of. Opening an editor at this point will trigger another call to `openCustomDocument`.

Parameter

Description

uri: Uri

Uri of the document to open.

openContext: CustomDocumentOpenContext

Additional information about the opening custom document.

token: CancellationToken

A cancellation token that indicates the result is no longer needed.

Returns

Description

T | Thenable<T>

The custom document.

resolveCustomEditor(document: T, webviewPanel: WebviewPanel, token: CancellationToken): void | Thenable<void>

Resolve a custom editor for a given resource.

This is called whenever the user opens a new editor for this `CustomEditorProvider`.

Parameter

Description

document: T

Document for the resource being resolved.

webviewPanel: WebviewPanel

The webview panel used to display the editor UI for this resource.

During resolve, the provider must fill in the initial html for the content webview panel and hook up all the event listeners on it that it is interested in. The provider can also hold onto the `WebviewPanel` to use later for example in a command. See WebviewPanel for additional details.

token: CancellationToken

A cancellation token that indicates the result is no longer needed.

Returns

Description

void | Thenable<void>

Optional thenable indicating that the custom editor has been resolved.

### CustomTextEditorProvider

Provider for text based custom editors.

Text based custom editors use a TextDocument as their data model. This considerably simplifies implementing a custom editor as it allows the editor to handle many common operations such as undo and backup. The provider is responsible for synchronizing text changes between the webview and the TextDocument.

#### Methods

resolveCustomTextEditor(document: TextDocument, webviewPanel: WebviewPanel, token: CancellationToken): void | Thenable<void>

Resolve a custom editor for a given text resource.

This is called when a user first opens a resource for a `CustomTextEditorProvider`, or if they reopen an existing editor using this `CustomTextEditorProvider`.

Parameter

Description

document: TextDocument

Document for the resource to resolve.

webviewPanel: WebviewPanel

The webview panel used to display the editor UI for this resource.

During resolve, the provider must fill in the initial html for the content webview panel and hook up all the event listeners on it that it is interested in. The provider can also hold onto the WebviewPanel to use later for example in a command. See WebviewPanel for additional details.

token: CancellationToken

A cancellation token that indicates the result is no longer needed.

Returns

Description

void | Thenable<void>

Thenable indicating that the custom editor has been resolved.

### DataTransfer

A map containing a mapping of the mime type of the corresponding transferred data.

Drag and drop controllers that implement `handleDrag` can add additional mime types to the data transfer. These additional mime types will only be included in the `handleDrop` when the drag was initiated from an element in the same drag and drop controller.

#### Constructors

new DataTransfer(): DataTransfer

Parameter

Description

Returns

Description

DataTransfer

#### Methods

[iterator](): IterableIterator<[mimeType: string, item: DataTransferItem]>

Get a new iterator with the `[mime, item]` pairs for each element in this data transfer.

Parameter

Description

Returns

Description

IterableIterator<[mimeType: string, item: DataTransferItem]>

forEach(callbackfn: (item: DataTransferItem, mimeType: string, dataTransfer: DataTransfer) => void, thisArg?: any): void

Allows iteration through the data transfer items.

Parameter

Description

callbackfn: (item: DataTransferItem, mimeType: string, dataTransfer: DataTransfer) => void

Callback for iteration through the data transfer items.

thisArg?: any

The `this` context used when invoking the handler function.

Returns

Description

void

get(mimeType: string): DataTransferItem

Retrieves the data transfer item for a given mime type.

Parameter

Description

mimeType: string

The mime type to get the data transfer item for, such as `text/plain` or `image/png`. Mimes type look ups are case-insensitive.

Special mime types:

*   `text/uri-list` — A string with `toString()`ed Uris separated by `\r\n`. To specify a cursor position in the file, set the Uri's fragment to `L3,5`, where 3 is the line number and 5 is the column number.

Returns

Description

DataTransferItem

set(mimeType: string, value: DataTransferItem): void

Sets a mime type to data transfer item mapping.

Parameter

Description

mimeType: string

The mime type to set the data for. Mimes types stored in lower case, with case-insensitive looks up.

value: DataTransferItem

The data transfer item for the given mime type.

Returns

Description

void

### DataTransferFile

A file associated with a DataTransferItem.

Instances of this type can only be created by the editor and not by extensions.

#### Properties

name: string

The name of the file.

uri?: Uri

The full file path of the file.

May be `undefined` on web.

#### Methods

data(): Thenable<Uint8Array>

The full file contents of the file.

Parameter

Description

Returns

Description

Thenable<Uint8Array>

### DataTransferItem

Encapsulates data transferred during drag and drop operations.

#### Constructors

new DataTransferItem(value: any): DataTransferItem

Parameter

Description

value: any

Custom data stored on this item. Can be retrieved using DataTransferItem.value.

Returns

Description

DataTransferItem

#### Properties

value: any

Custom data stored on this item.

You can use `value` to share data across operations. The original object can be retrieved so long as the extension that created the `DataTransferItem` runs in the same extension host.

#### Methods

asFile(): DataTransferFile

Try getting the file associated with this data transfer item.

Note that the file object is only valid for the scope of the drag and drop operation.

Parameter

Description

Returns

Description

DataTransferFile

The file for the data transfer or `undefined` if the item is either not a file or the file data cannot be accessed.

asString(): Thenable<string>

Get a string representation of this item.

If DataTransferItem.value is an object, this returns the result of json stringifying DataTransferItem.value value.

Parameter

Description

Returns

Description

Thenable<string>

### DebugAdapter

A debug adapter that implements the Debug Adapter Protocol can be registered with the editor if it implements the DebugAdapter interface.

#### Events

onDidSendMessage: Event<DebugProtocolMessage>

An event which fires after the debug adapter has sent a Debug Adapter Protocol message to the editor. Messages can be requests, responses, or events.

#### Methods

dispose(): any

Dispose this object.

Parameter

Description

Returns

Description

any

handleMessage(message: DebugProtocolMessage): void

Handle a Debug Adapter Protocol message. Messages can be requests, responses, or events. Results or errors are returned via onSendMessage events.

Parameter

Description

message: DebugProtocolMessage

A Debug Adapter Protocol message

Returns

Description

void

### DebugAdapterDescriptor

Represents the different types of debug adapters

DebugAdapterDescriptor: DebugAdapterExecutable | DebugAdapterServer | DebugAdapterNamedPipeServer | DebugAdapterInlineImplementation

### DebugAdapterDescriptorFactory

A debug adapter factory that creates debug adapter descriptors.

#### Methods

createDebugAdapterDescriptor(session: DebugSession, executable: DebugAdapterExecutable): ProviderResult<DebugAdapterDescriptor>

'createDebugAdapterDescriptor' is called at the start of a debug session to provide details about the debug adapter to use. These details must be returned as objects of type DebugAdapterDescriptor. Currently two types of debug adapters are supported:

*   a debug adapter executable is specified as a command path and arguments (see DebugAdapterExecutable),
*   a debug adapter server reachable via a communication port (see DebugAdapterServer). If the method is not implemented the default behavior is this: createDebugAdapter(session: DebugSession, executable: DebugAdapterExecutable) { if (typeof session.configuration.debugServer === 'number') { return new DebugAdapterServer(session.configuration.debugServer); } return executable; }

Parameter

Description

session: DebugSession

The debug session for which the debug adapter will be used.

executable: DebugAdapterExecutable

The debug adapter's executable information as specified in the package.json (or undefined if no such information exists).

Returns

Description

ProviderResult<DebugAdapterDescriptor>

a debug adapter descriptor or undefined.

### DebugAdapterExecutable

Represents a debug adapter executable and optional arguments and runtime options passed to it.

#### Constructors

new DebugAdapterExecutable(command: string, args?: string[], options?: DebugAdapterExecutableOptions): DebugAdapterExecutable

Creates a description for a debug adapter based on an executable program.

Parameter

Description

command: string

The command or executable path that implements the debug adapter.

args?: string[]

Optional arguments to be passed to the command or executable.

options?: DebugAdapterExecutableOptions

Optional options to be used when starting the command or executable.

Returns

Description

DebugAdapterExecutable

#### Properties

args: string[]

The arguments passed to the debug adapter executable. Defaults to an empty array.

command: string

The command or path of the debug adapter executable. A command must be either an absolute path of an executable or the name of an command to be looked up via the PATH environment variable. The special value 'node' will be mapped to the editor's built-in Node.js runtime.

options?: DebugAdapterExecutableOptions

Optional options to be used when the debug adapter is started. Defaults to undefined.

### DebugAdapterExecutableOptions

Options for a debug adapter executable.

#### Properties

cwd?: string

The current working directory for the executed debug adapter.

env?:

The additional environment of the executed program or shell. If omitted the parent process' environment is used. If provided it is merged with the parent process' environment.

### DebugAdapterInlineImplementation

A debug adapter descriptor for an inline implementation.

#### Constructors

new DebugAdapterInlineImplementation(implementation: DebugAdapter): DebugAdapterInlineImplementation

Create a descriptor for an inline implementation of a debug adapter.

Parameter

Description

implementation: DebugAdapter

Returns

Description

DebugAdapterInlineImplementation

### DebugAdapterNamedPipeServer

Represents a debug adapter running as a Named Pipe (on Windows)/UNIX Domain Socket (on non-Windows) based server.

#### Constructors

new DebugAdapterNamedPipeServer(path: string): DebugAdapterNamedPipeServer

Create a description for a debug adapter running as a Named Pipe (on Windows)/UNIX Domain Socket (on non-Windows) based server.

Parameter

Description

path: string

Returns

Description

DebugAdapterNamedPipeServer

#### Properties

path: string

The path to the NamedPipe/UNIX Domain Socket.

### DebugAdapterServer

Represents a debug adapter running as a socket based server.

#### Constructors

new DebugAdapterServer(port: number, host?: string): DebugAdapterServer

Create a description for a debug adapter running as a socket based server.

Parameter

Description

port: number

host?: string

Returns

Description

DebugAdapterServer

#### Properties

host?: string

The host.

port: number

The port.

### DebugAdapterTracker

A Debug Adapter Tracker is a means to track the communication between the editor and a Debug Adapter.

#### Events

onDidSendMessage(message: any): void

The debug adapter has sent a Debug Adapter Protocol message to the editor.

Parameter

Description

message: any

Returns

Description

void

onWillReceiveMessage(message: any): void

The debug adapter is about to receive a Debug Adapter Protocol message from the editor.

Parameter

Description

message: any

Returns

Description

void

onWillStartSession(): void

A session with the debug adapter is about to be started.

Parameter

Description

Returns

Description

void

onWillStopSession(): void

The debug adapter session is about to be stopped.

Parameter

Description

Returns

Description

void

#### Methods

onError(error: Error): void

An error with the debug adapter has occurred.

Parameter

Description

error: Error

Returns

Description

void

onExit(code: number, signal: string): void

The debug adapter has exited with the given exit code or signal.

Parameter

Description

code: number

signal: string

Returns

Description

void

### DebugAdapterTrackerFactory

A debug adapter factory that creates debug adapter trackers.

#### Methods

createDebugAdapterTracker(session: DebugSession): ProviderResult<DebugAdapterTracker>

The method 'createDebugAdapterTracker' is called at the start of a debug session in order to return a "tracker" object that provides read-access to the communication between the editor and a debug adapter.

Parameter

Description

session: DebugSession

The debug session for which the debug adapter tracker will be used.

Returns

Description

ProviderResult<DebugAdapterTracker>

A debug adapter tracker or undefined.

### DebugConfiguration

Configuration for a debug session.

#### Properties

name: string

The name of the debug session.

request: string

The request type of the debug session.

type: string

The type of the debug session.

### DebugConfigurationProvider

A debug configuration provider allows to add debug configurations to the debug service and to resolve launch configurations before they are used to start a debug session. A debug configuration provider is registered via debug.registerDebugConfigurationProvider.

#### Methods

provideDebugConfigurations(folder: WorkspaceFolder, token?: CancellationToken): ProviderResult<DebugConfiguration[]>

Provides debug configuration to the debug service. If more than one debug configuration provider is registered for the same type, debug configurations are concatenated in arbitrary order.

Parameter

Description

folder: WorkspaceFolder

The workspace folder for which the configurations are used or `undefined` for a folderless setup.

token?: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<DebugConfiguration[]>

An array of debug configurations.

resolveDebugConfiguration(folder: WorkspaceFolder, debugConfiguration: DebugConfiguration, token?: CancellationToken): ProviderResult<DebugConfiguration>

Resolves a debug configuration by filling in missing values or by adding/changing/removing attributes. If more than one debug configuration provider is registered for the same type, the resolveDebugConfiguration calls are chained in arbitrary order and the initial debug configuration is piped through the chain. Returning the value 'undefined' prevents the debug session from starting. Returning the value 'null' prevents the debug session from starting and opens the underlying debug configuration instead.

Parameter

Description

folder: WorkspaceFolder

The workspace folder from which the configuration originates from or `undefined` for a folderless setup.

debugConfiguration: DebugConfiguration

The debug configuration to resolve.

token?: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<DebugConfiguration>

The resolved debug configuration or undefined or null.

resolveDebugConfigurationWithSubstitutedVariables(folder: WorkspaceFolder, debugConfiguration: DebugConfiguration, token?: CancellationToken): ProviderResult<DebugConfiguration>

This hook is directly called after 'resolveDebugConfiguration' but with all variables substituted. It can be used to resolve or verify a debug configuration by filling in missing values or by adding/changing/removing attributes. If more than one debug configuration provider is registered for the same type, the 'resolveDebugConfigurationWithSubstitutedVariables' calls are chained in arbitrary order and the initial debug configuration is piped through the chain. Returning the value 'undefined' prevents the debug session from starting. Returning the value 'null' prevents the debug session from starting and opens the underlying debug configuration instead.

Parameter

Description

folder: WorkspaceFolder

The workspace folder from which the configuration originates from or `undefined` for a folderless setup.

debugConfiguration: DebugConfiguration

The debug configuration to resolve.

token?: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<DebugConfiguration>

The resolved debug configuration or undefined or null.

### DebugConfigurationProviderTriggerKind

A DebugConfigurationProviderTriggerKind specifies when the `provideDebugConfigurations` method of a `DebugConfigurationProvider` is triggered. Currently there are two situations: to provide the initial debug configurations for a newly created launch.json or to provide dynamically generated debug configurations when the user asks for them through the UI (e.g. via the "Select and Start Debugging" command). A trigger kind is used when registering a `DebugConfigurationProvider` with debug.registerDebugConfigurationProvider.

#### Enumeration Members

Initial: 1

`DebugConfigurationProvider.provideDebugConfigurations` is called to provide the initial debug configurations for a newly created launch.json.

Dynamic: 2

`DebugConfigurationProvider.provideDebugConfigurations` is called to provide dynamically generated debug configurations when the user asks for them through the UI (e.g. via the "Select and Start Debugging" command).

### DebugConsole

Represents the debug console.

#### Methods

append(value: string): void

Append the given value to the debug console.

Parameter

Description

value: string

A string, falsy values will not be printed.

Returns

Description

void

appendLine(value: string): void

Append the given value and a line feed character to the debug console.

Parameter

Description

value: string

A string, falsy values will be printed.

Returns

Description

void

### DebugConsoleMode

Debug console mode used by debug session, see options.

#### Enumeration Members

Separate: 0

Debug session should have a separate debug console.

MergeWithParent: 1

Debug session should share debug console with its parent session. This value has no effect for sessions which do not have a parent session.

### DebugProtocolBreakpoint

A DebugProtocolBreakpoint is an opaque stand-in type for the Breakpoint type defined in the Debug Adapter Protocol.

### DebugProtocolMessage

A DebugProtocolMessage is an opaque stand-in type for the ProtocolMessage type defined in the Debug Adapter Protocol.

### DebugProtocolSource

A DebugProtocolSource is an opaque stand-in type for the Source type defined in the Debug Adapter Protocol.

### DebugSession

A debug session.

#### Properties

configuration: DebugConfiguration

The "resolved" debug configuration of this session. "Resolved" means that

*   all variables have been substituted and
*   platform specific attribute sections have been "flattened" for the matching platform and removed for non-matching platforms.

id: string

The unique ID of this debug session.

name: string

The debug session's name is initially taken from the debug configuration. Any changes will be properly reflected in the UI.

parentSession?: DebugSession

The parent session of this debug session, if it was created as a child.

_See also_ DebugSessionOptions.parentSession

type: string

The debug session's type from the debug configuration.

workspaceFolder: WorkspaceFolder

The workspace folder of this session or `undefined` for a folderless setup.

#### Methods

customRequest(command: string, args?: any): Thenable<any>

Send a custom request to the debug adapter.

Parameter

Description

command: string

args?: any

Returns

Description

Thenable<any>

getDebugProtocolBreakpoint(breakpoint: Breakpoint): Thenable<DebugProtocolBreakpoint>

Maps a breakpoint in the editor to the corresponding Debug Adapter Protocol (DAP) breakpoint that is managed by the debug adapter of the debug session. If no DAP breakpoint exists (either because the editor breakpoint was not yet registered or because the debug adapter is not interested in the breakpoint), the value `undefined` is returned.

Parameter

Description

breakpoint: Breakpoint

A Breakpoint in the editor.

Returns

Description

Thenable<DebugProtocolBreakpoint>

A promise that resolves to the Debug Adapter Protocol breakpoint or `undefined`.

### DebugSessionCustomEvent

A custom Debug Adapter Protocol event received from a debug session.

#### Properties

body: any

Event specific information.

event: string

Type of event.

session: DebugSession

The debug session for which the custom event was received.

### DebugSessionOptions

Options for starting a debug session.

#### Properties

compact?: boolean

Controls if the debug session's parent session is shown in the CALL STACK view even if it has only a single child. By default, the debug session will never hide its parent. If compact is true, debug sessions with a single child are hidden in the CALL STACK view to make the tree more compact.

consoleMode?: DebugConsoleMode

Controls whether this session should have a separate debug console or share it with the parent session. Has no effect for sessions which do not have a parent session. Defaults to Separate.

lifecycleManagedByParent?: boolean

Controls whether lifecycle requests like 'restart' are sent to the newly created session or its parent session. By default (if the property is false or missing), lifecycle requests are sent to the new session. This property is ignored if the session has no parent session.

noDebug?: boolean

Controls whether this session should run without debugging, thus ignoring breakpoints. When this property is not specified, the value from the parent session (if there is one) is used.

parentSession?: DebugSession

When specified the newly created debug session is registered as a "child" session of this "parent" debug session.

suppressDebugStatusbar?: boolean

When true, the window statusbar color will not be changed for this session.

suppressDebugToolbar?: boolean

When true, the debug toolbar will not be shown for this session.

suppressDebugView?: boolean

When true, the debug viewlet will not be automatically revealed for this session.

suppressSaveBeforeStart?: boolean

When true, a save will not be triggered for open editors when starting a debug session, regardless of the value of the `debug.saveBeforeStart` setting.

testRun?: TestRun

Signals to the editor that the debug session was started from a test run request. This is used to link the lifecycle of the debug session and test run in UI actions.

### DebugStackFrame

Represents a stack frame in a debug session.

#### Properties

frameId: number

ID of the stack frame in the debug protocol.

session: DebugSession

Debug session for thread.

threadId: number

ID of the associated thread in the debug protocol.

### DebugThread

Represents a thread in a debug session.

#### Properties

session: DebugSession

Debug session for thread.

threadId: number

ID of the associated thread in the debug protocol.

### Declaration

The declaration of a symbol representation as one or many locations or location links.

Declaration: Location | Location[] | LocationLink[]

### DeclarationCoverage

Contains coverage information for a declaration. Depending on the reporter and language, this may be types such as functions, methods, or namespaces.

#### Constructors

new DeclarationCoverage(name: string, executed: number | boolean, location: Range | Position): DeclarationCoverage

Parameter

Description

name: string

executed: number | boolean

The number of times this declaration was executed, or a boolean indicating whether it was executed if the exact count is unknown. If zero or false, the declaration will be marked as un-covered.

location: Range | Position

The declaration position.

Returns

Description

DeclarationCoverage

#### Properties

executed: number | boolean

The number of times this declaration was executed, or a boolean indicating whether it was executed if the exact count is unknown. If zero or false, the declaration will be marked as un-covered.

location: Range | Position

Declaration location.

name: string

Name of the declaration.

### DeclarationProvider

The declaration provider interface defines the contract between extensions and the go to declaration feature.

#### Methods

provideDeclaration(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Declaration>

Provide the declaration of the symbol at the given position and document.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<Declaration>

A declaration or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

### DecorationInstanceRenderOptions

Represents render options for decoration instances. See DecorationOptions.renderOptions.

#### Properties

after?: ThemableDecorationAttachmentRenderOptions

Defines the rendering options of the attachment that is inserted after the decorated text.

before?: ThemableDecorationAttachmentRenderOptions

Defines the rendering options of the attachment that is inserted before the decorated text.

dark?: ThemableDecorationInstanceRenderOptions

Overwrite options for dark themes.

light?: ThemableDecorationInstanceRenderOptions

Overwrite options for light themes.

### DecorationOptions

Represents options for a specific decoration in a decoration set.

#### Properties

hoverMessage?: MarkdownString | MarkedString | Array<MarkdownString | MarkedString>

A message that should be rendered when hovering over the decoration.

range: Range

Range to which this decoration is applied. The range must not be empty.

renderOptions?: DecorationInstanceRenderOptions

Render options applied to the current decoration. For performance reasons, keep the number of decoration specific options small, and use decoration types wherever possible.

### DecorationRangeBehavior

Describes the behavior of decorations when typing/editing at their edges.

#### Enumeration Members

OpenOpen: 0

The decoration's range will widen when edits occur at the start or end.

ClosedClosed: 1

The decoration's range will not widen when edits occur at the start or end.

OpenClosed: 2

The decoration's range will widen when edits occur at the start, but not at the end.

ClosedOpen: 3

The decoration's range will widen when edits occur at the end, but not at the start.

### DecorationRenderOptions

Represents rendering styles for a text editor decoration.

#### Properties

after?: ThemableDecorationAttachmentRenderOptions

Defines the rendering options of the attachment that is inserted after the decorated text.

backgroundColor?: string | ThemeColor

Background color of the decoration. Use rgba() and define transparent background colors to play well with other decorations. Alternatively a color from the color registry can be referenced.

before?: ThemableDecorationAttachmentRenderOptions

Defines the rendering options of the attachment that is inserted before the decorated text.

border?: string

CSS styling property that will be applied to text enclosed by a decoration.

borderColor?: string | ThemeColor

CSS styling property that will be applied to text enclosed by a decoration. Better use 'border' for setting one or more of the individual border properties.

borderRadius?: string

CSS styling property that will be applied to text enclosed by a decoration. Better use 'border' for setting one or more of the individual border properties.

borderSpacing?: string

CSS styling property that will be applied to text enclosed by a decoration. Better use 'border' for setting one or more of the individual border properties.

borderStyle?: string

CSS styling property that will be applied to text enclosed by a decoration. Better use 'border' for setting one or more of the individual border properties.

borderWidth?: string

CSS styling property that will be applied to text enclosed by a decoration. Better use 'border' for setting one or more of the individual border properties.

color?: string | ThemeColor

CSS styling property that will be applied to text enclosed by a decoration.

cursor?: string

CSS styling property that will be applied to text enclosed by a decoration.

dark?: ThemableDecorationRenderOptions

Overwrite options for dark themes.

fontStyle?: string

CSS styling property that will be applied to text enclosed by a decoration.

fontWeight?: string

CSS styling property that will be applied to text enclosed by a decoration.

gutterIconPath?: string | Uri

An **absolute path** or an URI to an image to be rendered in the gutter.

gutterIconSize?: string

Specifies the size of the gutter icon. Available values are 'auto', 'contain', 'cover' and any percentage value. For further information: https://msdn.microsoft.com/en-us/library/jj127316(v=vs.85).aspx

isWholeLine?: boolean

Should the decoration be rendered also on the whitespace after the line text. Defaults to `false`.

letterSpacing?: string

CSS styling property that will be applied to text enclosed by a decoration.

light?: ThemableDecorationRenderOptions

Overwrite options for light themes.

opacity?: string

CSS styling property that will be applied to text enclosed by a decoration.

outline?: string

CSS styling property that will be applied to text enclosed by a decoration.

outlineColor?: string | ThemeColor

CSS styling property that will be applied to text enclosed by a decoration. Better use 'outline' for setting one or more of the individual outline properties.

outlineStyle?: string

CSS styling property that will be applied to text enclosed by a decoration. Better use 'outline' for setting one or more of the individual outline properties.

outlineWidth?: string

CSS styling property that will be applied to text enclosed by a decoration. Better use 'outline' for setting one or more of the individual outline properties.

overviewRulerColor?: string | ThemeColor

The color of the decoration in the overview ruler. Use rgba() and define transparent colors to play well with other decorations.

overviewRulerLane?: OverviewRulerLane

The position in the overview ruler where the decoration should be rendered.

rangeBehavior?: DecorationRangeBehavior

Customize the growing behavior of the decoration when edits occur at the edges of the decoration's range. Defaults to `DecorationRangeBehavior.OpenOpen`.

textDecoration?: string

CSS styling property that will be applied to text enclosed by a decoration.

### Definition

The definition of a symbol represented as one or many locations. For most programming languages there is only one location at which a symbol is defined.

Definition: Location | Location[]

### DefinitionLink

Information about where a symbol is defined.

Provides additional metadata over normal Location definitions, including the range of the defining symbol

DefinitionLink: LocationLink

### DefinitionProvider

The definition provider interface defines the contract between extensions and the go to definition and peek definition features.

#### Methods

provideDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Definition | LocationLink[]>

Provide the definition of the symbol at the given position and document.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<Definition | LocationLink[]>

A definition or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

### Diagnostic

Represents a diagnostic, such as a compiler error or warning. Diagnostic objects are only valid in the scope of a file.

#### Constructors

new Diagnostic(range: Range, message: string, severity?: DiagnosticSeverity): Diagnostic

Creates a new diagnostic object.

Parameter

Description

range: Range

The range to which this diagnostic applies.

message: string

The human-readable message.

severity?: DiagnosticSeverity

The severity, default is error.

Returns

Description

Diagnostic

#### Properties

code?: string | number | {target: Uri, value: string | number}

A code or identifier for this diagnostic. Should be used for later processing, e.g. when providing code actions.

message: string

The human-readable message.

range: Range

The range to which this diagnostic applies.

relatedInformation?: DiagnosticRelatedInformation[]

An array of related diagnostic information, e.g. when symbol-names within a scope collide all definitions can be marked via this property.

severity: DiagnosticSeverity

The severity, default is error.

source?: string

A human-readable string describing the source of this diagnostic, e.g. 'typescript' or 'super lint'.

tags?: DiagnosticTag[]

Additional metadata about the diagnostic.

### DiagnosticChangeEvent

The event that is fired when diagnostics change.

#### Properties

uris: readonly Uri[]

An array of resources for which diagnostics have changed.

### DiagnosticCollection

A diagnostics collection is a container that manages a set of diagnostics. Diagnostics are always scopes to a diagnostics collection and a resource.

To get an instance of a `DiagnosticCollection` use createDiagnosticCollection.

#### Properties

name: string

The name of this diagnostic collection, for instance `typescript`. Every diagnostic from this collection will be associated with this name. Also, the task framework uses this name when defining problem matchers.

#### Methods

clear(): void

Remove all diagnostics from this collection. The same as calling `#set(undefined)`;

Parameter

Description

Returns

Description

void

delete(uri: Uri): void

Remove all diagnostics from this collection that belong to the provided `uri`. The same as `#set(uri, undefined)`.

Parameter

Description

uri: Uri

A resource identifier.

Returns

Description

void

dispose(): void

Dispose and free associated resources. Calls clear.

Parameter

Description

Returns

Description

void

forEach(callback: (uri: Uri, diagnostics: readonly Diagnostic[], collection: DiagnosticCollection) => any, thisArg?: any): void

Iterate over each entry in this collection.

Parameter

Description

callback: (uri: Uri, diagnostics: readonly Diagnostic[], collection: DiagnosticCollection) => any

Function to execute for each entry.

thisArg?: any

The `this` context used when invoking the handler function.

Returns

Description

void

get(uri: Uri): readonly Diagnostic[]

Get the diagnostics for a given resource. _Note_ that you cannot modify the diagnostics-array returned from this call.

Parameter

Description

uri: Uri

A resource identifier.

Returns

Description

readonly Diagnostic[]

An immutable array of diagnostics or `undefined`.

has(uri: Uri): boolean

Check if this collection contains diagnostics for a given resource.

Parameter

Description

uri: Uri

A resource identifier.

Returns

Description

boolean

`true` if this collection has diagnostic for the given resource.

set(uri: Uri, diagnostics: readonly Diagnostic[]): void

Assign diagnostics for given resource. Will replace existing diagnostics for that resource.

Parameter

Description

uri: Uri

A resource identifier.

diagnostics: readonly Diagnostic[]

Array of diagnostics or `undefined`

Returns

Description

void

set(entries: ReadonlyArray<[Uri, readonly Diagnostic[]]>): void

Replace diagnostics for multiple resources in this collection.

_Note_ that multiple tuples of the same uri will be merged, e.g `[[file1, [d1]], [file1, [d2]]]` is equivalent to `[[file1, [d1, d2]]]`. If a diagnostics item is `undefined` as in `[file1, undefined]` all previous but not subsequent diagnostics are removed.

Parameter

Description

entries: ReadonlyArray<[Uri, readonly Diagnostic[]]>

An array of tuples, like `[[file1, [d1, d2]], [file2, [d3, d4, d5]]]`, or `undefined`.

Returns

Description

void

### DiagnosticRelatedInformation

Represents a related message and source code location for a diagnostic. This should be used to point to code locations that cause or related to a diagnostics, e.g. when duplicating a symbol in a scope.

#### Constructors

new DiagnosticRelatedInformation(location: Location, message: string): DiagnosticRelatedInformation

Creates a new related diagnostic information object.

Parameter

Description

location: Location

The location.

message: string

The message.

Returns

Description

DiagnosticRelatedInformation

#### Properties

location: Location

The location of this related diagnostic information.

message: string

The message of this related diagnostic information.

### DiagnosticSeverity

Represents the severity of diagnostics.

#### Enumeration Members

Error: 0

Something not allowed by the rules of a language or other means.

Warning: 1

Something suspicious but allowed.

Information: 2

Something to inform about but not a problem.

Hint: 3

Something to hint to a better way of doing it, like proposing a refactoring.

### DiagnosticTag

Additional metadata about the type of a diagnostic.

#### Enumeration Members

Unnecessary: 1

Unused or unnecessary code.

Diagnostics with this tag are rendered faded out. The amount of fading is controlled by the `"editorUnnecessaryCode.opacity"` theme color. For example, `"editorUnnecessaryCode.opacity": "#000000c0"` will render the code with 75% opacity. For high contrast themes, use the `"editorUnnecessaryCode.border"` theme color to underline unnecessary code instead of fading it out.

Deprecated: 2

Deprecated or obsolete code.

Diagnostics with this tag are rendered with a strike through.

### Disposable

Represents a type which can release resources, such as event listening or a timer.

#### Static

from(...disposableLikes: Array<{dispose: () => any}>): Disposable

Combine many disposable-likes into one. You can use this method when having objects with a dispose function which aren't instances of `Disposable`.

Parameter

Description

...disposableLikes: Array<{dispose: () => any}>

Objects that have at least a `dispose`-function member. Note that asynchronous dispose-functions aren't awaited.

Returns

Description

Disposable

Returns a new disposable which, upon dispose, will dispose all provided disposables.

#### Constructors

new Disposable(callOnDispose: () => any): Disposable

Creates a new disposable that calls the provided function on dispose.

_Note_ that an asynchronous function is not awaited.

Parameter

Description

callOnDispose: () => any

Function that disposes something.

Returns

Description

Disposable

#### Methods

dispose(): any

Dispose this object.

Parameter

Description

Returns

Description

any

### DocumentColorProvider

The document color provider defines the contract between extensions and feature of picking and modifying colors in the editor.

#### Methods

provideColorPresentations(color: Color, context: {document: TextDocument, range: Range}, token: CancellationToken): ProviderResult<ColorPresentation[]>

Provide representations for a color.

Parameter

Description

color: Color

The color to show and insert.

context: {document: TextDocument, range: Range}

A context object with additional information

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<ColorPresentation[]>

An array of color presentations or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

provideDocumentColors(document: TextDocument, token: CancellationToken): ProviderResult<ColorInformation[]>

Provide colors for the given document.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<ColorInformation[]>

An array of color information or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

### DocumentDropEdit

An edit operation applied on drop.

#### Constructors

new DocumentDropEdit(insertText: string | SnippetString, title?: string, kind?: DocumentDropOrPasteEditKind): DocumentDropEdit

Parameter

Description

insertText: string | SnippetString

The text or snippet to insert at the drop location.

title?: string

Human readable label that describes the edit.

kind?: DocumentDropOrPasteEditKind

Kind of the edit.

Returns

Description

DocumentDropEdit

#### Properties

additionalEdit?: WorkspaceEdit

An optional additional edit to apply on drop.

insertText: string | SnippetString

The text or snippet to insert at the drop location.

kind?: DocumentDropOrPasteEditKind

Kind of the edit.

title?: string

Human readable label that describes the edit.

yieldTo?: readonly DocumentDropOrPasteEditKind[]

Controls the ordering or multiple edits. If this provider yield to edits, it will be shown lower in the list.

### DocumentDropEditProvider<T>

Provider which handles dropping of resources into a text editor.

This allows users to drag and drop resources (including resources from external apps) into the editor. While dragging and dropping files, users can hold down `shift` to drop the file into the editor instead of opening it. Requires `editor.dropIntoEditor.enabled` to be on.

#### Methods

provideDocumentDropEdits(document: TextDocument, position: Position, dataTransfer: DataTransfer, token: CancellationToken): ProviderResult<T | T[]>

Provide edits which inserts the content being dragged and dropped into the document.

Parameter

Description

document: TextDocument

The document in which the drop occurred.

position: Position

The position in the document where the drop occurred.

dataTransfer: DataTransfer

A DataTransfer object that holds data about what is being dragged and dropped.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T | T[]>

A DocumentDropEdit or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

resolveDocumentDropEdit(edit: T, token: CancellationToken): ProviderResult<T>

Optional method which fills in the DocumentDropEdit.additionalEdit before the edit is applied.

This is called once per edit and should be used if generating the complete edit may take a long time. Resolve can only be used to change DocumentDropEdit.additionalEdit.

Parameter

Description

edit: T

The DocumentDropEdit to resolve.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T>

The resolved edit or a thenable that resolves to such. It is OK to return the given `edit`. If no result is returned, the given `edit` is used.

### DocumentDropEditProviderMetadata

Provides additional metadata about how a DocumentDropEditProvider works.

#### Properties

dropMimeTypes: readonly string[]

List of DataTransfer mime types that the provider can handle.

This can either be an exact mime type such as `image/png`, or a wildcard pattern such as `image/*`.

Use `text/uri-list` for resources dropped from the explorer or other tree views in the workbench.

Use `files` to indicate that the provider should be invoked if any files are present in the DataTransfer. Note that DataTransferFile entries are only created when dropping content from outside the editor, such as from the operating system.

providedDropEditKinds?: readonly DocumentDropOrPasteEditKind[]

List of kinds that the provider may return in provideDocumentDropEdits.

This is used to filter out providers when a specific kind of edit is requested.

### DocumentDropOrPasteEditKind

Identifies a DocumentDropEdit or DocumentPasteEdit

#### Static

Empty: DocumentDropOrPasteEditKind

Text: DocumentDropOrPasteEditKind

The root kind for basic text edits.

This kind should be used for edits that insert basic text into the document. A good example of this is an edit that pastes the clipboard text while also updating imports in the file based on the pasted text. For this we could use a kind such as `text.updateImports.someLanguageId`.

Even though most drop/paste edits ultimately insert text, you should not use Text as the base kind for every edit as this is redundant. Instead a more specific kind that describes the type of content being inserted should be used instead. For example, if the edit adds a Markdown link, use `markdown.link` since even though the content being inserted is text, it's more important to know that the edit inserts Markdown syntax.

TextUpdateImports: DocumentDropOrPasteEditKind

Root kind for edits that update imports in a document in addition to inserting text.

#### Constructors

new DocumentDropOrPasteEditKind(value: string): DocumentDropOrPasteEditKind

Use DocumentDropOrPasteEditKind.Empty instead.

Parameter

Description

value: string

Returns

Description

DocumentDropOrPasteEditKind

#### Properties

value: string

The raw string value of the kind.

#### Methods

append(...parts: string[]): DocumentDropOrPasteEditKind

Create a new kind by appending additional scopes to the current kind.

Does not modify the current kind.

Parameter

Description

...parts: string[]

Returns

Description

DocumentDropOrPasteEditKind

contains(other: DocumentDropOrPasteEditKind): boolean

Checks if `other` is a sub-kind of this `DocumentDropOrPasteEditKind`.

The kind `"text.plain"` for example contains `"text.plain"` and `"text.plain.list"`, but not `"text"` or `"unicorn.text.plain"`.

Parameter

Description

other: DocumentDropOrPasteEditKind

Kind to check.

Returns

Description

boolean

intersects(other: DocumentDropOrPasteEditKind): boolean

Checks if this kind intersects `other`.

The kind `"text.plain"` for example intersects `text`, `"text.plain"` and `"text.plain.list"`, but not `"unicorn"`, or `"textUnicorn.plain"`.

Parameter

Description

other: DocumentDropOrPasteEditKind

Kind to check.

Returns

Description

boolean

### DocumentFilter

A document filter denotes a document by different properties like the language, the scheme of its resource, or a glob-pattern that is applied to the path.

**Example** A language filter that applies to typescript files on disk

```
{ language: 'typescript', scheme: 'file' }
```

**Example** A language filter that applies to all package.json paths

```
{ language: 'json', pattern: '**/package.json' }
```

#### Properties

language?: string

A language id, like `typescript`.

notebookType?: string

The type of a notebook, like `jupyter-notebook`. This allows to narrow down on the type of a notebook that a cell document belongs to.

_Note_ that setting the `notebookType`-property changes how `scheme` and `pattern` are interpreted. When set they are evaluated against the notebook uri, not the document uri.

**Example** Match python document inside jupyter notebook that aren't stored yet (`untitled`)

```
{ language: 'python', notebookType: 'jupyter-notebook', scheme: 'untitled' }
```

pattern?: GlobPattern

A glob pattern that is matched on the absolute path of the document. Use a relative pattern to filter documents to a workspace folder.

scheme?: string

A Uri scheme, like `file` or `untitled`.

### DocumentFormattingEditProvider

The document formatting provider interface defines the contract between extensions and the formatting-feature.

#### Methods

provideDocumentFormattingEdits(document: TextDocument, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]>

Provide formatting edits for a whole document.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

options: FormattingOptions

Options controlling formatting.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<TextEdit[]>

A set of text edits or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

### DocumentHighlight

A document highlight is a range inside a text document which deserves special attention. Usually a document highlight is visualized by changing the background color of its range.

#### Constructors

new DocumentHighlight(range: Range, kind?: DocumentHighlightKind): DocumentHighlight

Creates a new document highlight object.

Parameter

Description

range: Range

The range the highlight applies to.

kind?: DocumentHighlightKind

The highlight kind, default is text.

Returns

Description

DocumentHighlight

#### Properties

kind?: DocumentHighlightKind

The highlight kind, default is text.

range: Range

The range this highlight applies to.

### DocumentHighlightKind

A document highlight kind.

#### Enumeration Members

Text: 0

A textual occurrence.

Read: 1

Read-access of a symbol, like reading a variable.

Write: 2

Write-access of a symbol, like writing to a variable.

### DocumentHighlightProvider

The document highlight provider interface defines the contract between extensions and the word-highlight-feature.

#### Methods

provideDocumentHighlights(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<DocumentHighlight[]>

Provide a set of document highlights, like all occurrences of a variable or all exit-points of a function.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<DocumentHighlight[]>

An array of document highlights or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

### DocumentLink

A document link is a range in a text document that links to an internal or external resource, like another text document or a web site.

#### Constructors

new DocumentLink(range: Range, target?: Uri): DocumentLink

Creates a new document link.

Parameter

Description

range: Range

The range the document link applies to. Must not be empty.

target?: Uri

The uri the document link points to.

Returns

Description

DocumentLink

#### Properties

range: Range

The range this link applies to.

target?: Uri

The uri this link points to.

tooltip?: string

The tooltip text when you hover over this link.

If a tooltip is provided, is will be displayed in a string that includes instructions on how to trigger the link, such as `{0} (ctrl + click)`. The specific instructions vary depending on OS, user settings, and localization.

### DocumentLinkProvider<T>

The document link provider defines the contract between extensions and feature of showing links in the editor.

#### Methods

provideDocumentLinks(document: TextDocument, token: CancellationToken): ProviderResult<T[]>

Provide links for the given document. Note that the editor ships with a default provider that detects `http(s)` and `file` links.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T[]>

An array of document links or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

resolveDocumentLink(link: T, token: CancellationToken): ProviderResult<T>

Given a link fill in its target. This method is called when an incomplete link is selected in the UI. Providers can implement this method and return incomplete links (without target) from the provideDocumentLinks method which often helps to improve performance.

Parameter

Description

link: T

The link that is to be resolved.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T>

### DocumentPasteEdit

An edit the applies a paste operation.

#### Constructors

new DocumentPasteEdit(insertText: string | SnippetString, title: string, kind: DocumentDropOrPasteEditKind): DocumentPasteEdit

Create a new paste edit.

Parameter

Description

insertText: string | SnippetString

The text or snippet to insert at the pasted locations.

title: string

Human readable label that describes the edit.

kind: DocumentDropOrPasteEditKind

Kind of the edit.

Returns

Description

DocumentPasteEdit

#### Properties

additionalEdit?: WorkspaceEdit

An optional additional edit to apply on paste.

insertText: string | SnippetString

The text or snippet to insert at the pasted locations.

If your edit requires more advanced insertion logic, set this to an empty string and provide an additional edit instead.

kind: DocumentDropOrPasteEditKind

Kind of the edit.

title: string

Human readable label that describes the edit.

yieldTo?: readonly DocumentDropOrPasteEditKind[]

Controls ordering when multiple paste edits can potentially be applied.

If this edit yields to another, it will be shown lower in the list of possible paste edits shown to the user.

### DocumentPasteEditContext

Additional information about the paste operation.

#### Properties

only: DocumentDropOrPasteEditKind

Requested kind of paste edits to return.

When a explicit kind if requested by PasteAs, providers are encourage to be more flexible when generating an edit of the requested kind.

triggerKind: DocumentPasteTriggerKind

The reason why paste edits were requested.

### DocumentPasteEditProvider<T>

Provider invoked when the user copies or pastes in a TextDocument.

#### Methods

prepareDocumentPaste(document: TextDocument, ranges: readonly Range[], dataTransfer: DataTransfer, token: CancellationToken): void | Thenable<void>

Optional method invoked after the user copies from a text editor.

This allows the provider to attach metadata about the copied text to the DataTransfer. This data transfer is then passed back to providers in provideDocumentPasteEdits.

Note that currently any changes to the DataTransfer are isolated to the current editor window. This means that any added metadata cannot be seen by other editor windows or by other applications.

Parameter

Description

document: TextDocument

Text document where the copy took place.

ranges: readonly Range[]

Ranges being copied in document.

dataTransfer: DataTransfer

The data transfer associated with the copy. You can store additional values on this for later use in provideDocumentPasteEdits. This object is only valid for the duration of this method.

token: CancellationToken

A cancellation token.

Returns

Description

void | Thenable<void>

Optional thenable that resolves when all changes to the `dataTransfer` are complete.

provideDocumentPasteEdits(document: TextDocument, ranges: readonly Range[], dataTransfer: DataTransfer, context: DocumentPasteEditContext, token: CancellationToken): ProviderResult<T[]>

Invoked before the user pastes into a text editor.

Returned edits can replace the standard pasting behavior.

Parameter

Description

document: TextDocument

Document being pasted into

ranges: readonly Range[]

Range in the document to paste into.

dataTransfer: DataTransfer

The data transfer associated with the paste. This object is only valid for the duration of the paste operation.

context: DocumentPasteEditContext

Additional context for the paste.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T[]>

Set of potential edits that can apply the paste. Only a single returned DocumentPasteEdit is applied at a time. If multiple edits are returned from all providers, then the first is automatically applied and a widget is shown that lets the user switch to the other edits.

resolveDocumentPasteEdit(pasteEdit: T, token: CancellationToken): ProviderResult<T>

Optional method which fills in the DocumentPasteEdit.additionalEdit before the edit is applied.

This is called once per edit and should be used if generating the complete edit may take a long time. Resolve can only be used to change DocumentPasteEdit.insertText or DocumentPasteEdit.additionalEdit.

Parameter

Description

pasteEdit: T

The DocumentPasteEdit to resolve.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T>

The resolved paste edit or a thenable that resolves to such. It is OK to return the given `pasteEdit`. If no result is returned, the given `pasteEdit` is used.

### DocumentPasteProviderMetadata

Provides additional metadata about how a DocumentPasteEditProvider works.

#### Properties

copyMimeTypes?: readonly string[]

Mime types that prepareDocumentPaste may add on copy.

pasteMimeTypes?: readonly string[]

Mime types that provideDocumentPasteEdits should be invoked for.

This can either be an exact mime type such as `image/png`, or a wildcard pattern such as `image/*`.

Use `text/uri-list` for resources dropped from the explorer or other tree views in the workbench.

Use `files` to indicate that the provider should be invoked if any files are present in the DataTransfer. Note that DataTransferFile entries are only created when pasting content from outside the editor, such as from the operating system.

providedPasteEditKinds: readonly DocumentDropOrPasteEditKind[]

List of kinds that the provider may return in provideDocumentPasteEdits.

This is used to filter out providers when a specific kind of edit is requested.

### DocumentPasteTriggerKind

The reason why paste edits were requested.

#### Enumeration Members

Automatic: 0

Pasting was requested as part of a normal paste operation.

PasteAs: 1

Pasting was requested by the user with the `paste as` command.

### DocumentRangeFormattingEditProvider

The document formatting provider interface defines the contract between extensions and the formatting-feature.

#### Methods

provideDocumentRangeFormattingEdits(document: TextDocument, range: Range, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]>

Provide formatting edits for a range in a document.

The given range is a hint and providers can decide to format a smaller or larger range. Often this is done by adjusting the start and end of the range to full syntax nodes.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

range: Range

The range which should be formatted.

options: FormattingOptions

Options controlling formatting.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<TextEdit[]>

A set of text edits or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

provideDocumentRangesFormattingEdits(document: TextDocument, ranges: Range[], options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]>

Provide formatting edits for multiple ranges in a document.

This function is optional but allows a formatter to perform faster when formatting only modified ranges or when formatting a large number of selections.

The given ranges are hints and providers can decide to format a smaller or larger range. Often this is done by adjusting the start and end of the range to full syntax nodes.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

ranges: Range[]

The ranges which should be formatted.

options: FormattingOptions

Options controlling formatting.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<TextEdit[]>

A set of text edits or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

### DocumentRangeSemanticTokensProvider

The document range semantic tokens provider interface defines the contract between extensions and semantic tokens.

#### Events

onDidChangeSemanticTokens?: Event<void>

An optional event to signal that the semantic tokens from this provider have changed.

#### Methods

provideDocumentRangeSemanticTokens(document: TextDocument, range: Range, token: CancellationToken): ProviderResult<SemanticTokens>

_See also_ provideDocumentSemanticTokens.

Parameter

Description

document: TextDocument

range: Range

token: CancellationToken

Returns

Description

ProviderResult<SemanticTokens>

### DocumentSelector

A language selector is the combination of one or many language identifiers and language filters.

_Note_ that a document selector that is just a language identifier selects _all_ documents, even those that are not saved on disk. Only use such selectors when a feature works without further context, e.g. without the need to resolve related 'files'.

**Example**

```
let sel: DocumentSelector = { scheme: 'file', language: 'typescript' };
```

DocumentSelector: DocumentFilter | string | ReadonlyArray<DocumentFilter | string>

### DocumentSemanticTokensProvider

The document semantic tokens provider interface defines the contract between extensions and semantic tokens.

#### Events

onDidChangeSemanticTokens?: Event<void>

An optional event to signal that the semantic tokens from this provider have changed.

#### Methods

provideDocumentSemanticTokens(document: TextDocument, token: CancellationToken): ProviderResult<SemanticTokens>

Tokens in a file are represented as an array of integers. The position of each token is expressed relative to the token before it, because most tokens remain stable relative to each other when edits are made in a file.

* * *

In short, each token takes 5 integers to represent, so a specific token `i` in the file consists of the following array indices:

*   at index `5*i` - `deltaLine`: token line number, relative to the previous token
*   at index `5*i+1` - `deltaStart`: token start character, relative to the previous token (relative to 0 or the previous token's start if they are on the same line)
*   at index `5*i+2` - `length`: the length of the token. A token cannot be multiline.
*   at index `5*i+3` - `tokenType`: will be looked up in `SemanticTokensLegend.tokenTypes`. We currently ask that `tokenType` < 65536.
*   at index `5*i+4` - `tokenModifiers`: each set bit will be looked up in `SemanticTokensLegend.tokenModifiers`

* * *

### How to encode tokens

Here is an example for encoding a file with 3 tokens in a uint32 array:

```
   { line: 2, startChar:  5, length: 3, tokenType: "property",  tokenModifiers: ["private", "static"] },
   { line: 2, startChar: 10, length: 4, tokenType: "type",      tokenModifiers: [] },
   { line: 5, startChar:  2, length: 7, tokenType: "class",     tokenModifiers: [] }
```

1.  First of all, a legend must be devised. This legend must be provided up-front and capture all possible token types. For this example, we will choose the following legend which must be passed in when registering the provider:

```
   tokenTypes: ['property', 'type', 'class'],
   tokenModifiers: ['private', 'static']
```

2.  The first transformation step is to encode `tokenType` and `tokenModifiers` as integers using the legend. Token types are looked up by index, so a `tokenType` value of `1` means `tokenTypes[1]`. Multiple token modifiers can be set by using bit flags, so a `tokenModifier` value of `3` is first viewed as binary `0b00000011`, which means `[tokenModifiers[0], tokenModifiers[1]]` because bits 0 and 1 are set. Using this legend, the tokens now are:

```
   { line: 2, startChar:  5, length: 3, tokenType: 0, tokenModifiers: 3 },
   { line: 2, startChar: 10, length: 4, tokenType: 1, tokenModifiers: 0 },
   { line: 5, startChar:  2, length: 7, tokenType: 2, tokenModifiers: 0 }
```

3.  The next step is to represent each token relative to the previous token in the file. In this case, the second token is on the same line as the first token, so the `startChar` of the second token is made relative to the `startChar` of the first token, so it will be `10 - 5`. The third token is on a different line than the second token, so the `startChar` of the third token will not be altered:

```
   { deltaLine: 2, deltaStartChar: 5, length: 3, tokenType: 0, tokenModifiers: 3 },
   { deltaLine: 0, deltaStartChar: 5, length: 4, tokenType: 1, tokenModifiers: 0 },
   { deltaLine: 3, deltaStartChar: 2, length: 7, tokenType: 2, tokenModifiers: 0 }
```

4.  Finally, the last step is to inline each of the 5 fields for a token in a single array, which is a memory friendly representation:

```
   // 1st token,  2nd token,  3rd token
   [  2,5,3,0,3,  0,5,4,1,0,  3,2,7,2,0 ]
```

_See also_ SemanticTokensBuilder for a helper to encode tokens as integers. _NOTE_: When doing edits, it is possible that multiple edits occur until the editor decides to invoke the semantic tokens provider. _NOTE_: If the provider cannot temporarily compute semantic tokens, it can indicate this by throwing an error with the message 'Busy'.

Parameter

Description

document: TextDocument

token: CancellationToken

Returns

Description

ProviderResult<SemanticTokens>

provideDocumentSemanticTokensEdits(document: TextDocument, previousResultId: string, token: CancellationToken): ProviderResult<SemanticTokens | SemanticTokensEdits>

Instead of always returning all the tokens in a file, it is possible for a `DocumentSemanticTokensProvider` to implement this method (`provideDocumentSemanticTokensEdits`) and then return incremental updates to the previously provided semantic tokens.

* * *

### How tokens change when the document changes

Suppose that `provideDocumentSemanticTokens` has previously returned the following semantic tokens:

```
   // 1st token,  2nd token,  3rd token
   [  2,5,3,0,3,  0,5,4,1,0,  3,2,7,2,0 ]
```

Also suppose that after some edits, the new semantic tokens in a file are:

```
   // 1st token,  2nd token,  3rd token
   [  3,5,3,0,3,  0,5,4,1,0,  3,2,7,2,0 ]
```

It is possible to express these new tokens in terms of an edit applied to the previous tokens:

```
   [  2,5,3,0,3,  0,5,4,1,0,  3,2,7,2,0 ] // old tokens
   [  3,5,3,0,3,  0,5,4,1,0,  3,2,7,2,0 ] // new tokens

   edit: { start:  0, deleteCount: 1, data: [3] } // replace integer at offset 0 with 3
```

_NOTE_: If the provider cannot compute `SemanticTokensEdits`, it can "give up" and return all the tokens in the document again. _NOTE_: All edits in `SemanticTokensEdits` contain indices in the old integers array, so they all refer to the previous result state.

Parameter

Description

document: TextDocument

previousResultId: string

token: CancellationToken

Returns

Description

ProviderResult<SemanticTokens | SemanticTokensEdits>

### DocumentSymbol

Represents programming constructs like variables, classes, interfaces etc. that appear in a document. Document symbols can be hierarchical and they have two ranges: one that encloses its definition and one that points to its most interesting range, e.g. the range of an identifier.

#### Constructors

new DocumentSymbol(name: string, detail: string, kind: SymbolKind, range: Range, selectionRange: Range): DocumentSymbol

Creates a new document symbol.

Parameter

Description

name: string

The name of the symbol.

detail: string

Details for the symbol.

kind: SymbolKind

The kind of the symbol.

range: Range

The full range of the symbol.

selectionRange: Range

The range that should be reveal.

Returns

Description

DocumentSymbol

#### Properties

children: DocumentSymbol[]

Children of this symbol, e.g. properties of a class.

detail: string

More detail for this symbol, e.g. the signature of a function.

kind: SymbolKind

The kind of this symbol.

name: string

The name of this symbol.

range: Range

The range enclosing this symbol not including leading/trailing whitespace but everything else, e.g. comments and code.

selectionRange: Range

The range that should be selected and reveal when this symbol is being picked, e.g. the name of a function. Must be contained by the range.

tags?: readonly SymbolTag[]

Tags for this symbol.

### DocumentSymbolProvider

The document symbol provider interface defines the contract between extensions and the go to symbol-feature.

#### Methods

provideDocumentSymbols(document: TextDocument, token: CancellationToken): ProviderResult<DocumentSymbol[] | SymbolInformation[]>

Provide symbol information for the given document.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<DocumentSymbol[] | SymbolInformation[]>

An array of document highlights or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

### DocumentSymbolProviderMetadata

Metadata about a document symbol provider.

#### Properties

label?: string

A human-readable string that is shown when multiple outlines trees show for one document.

### EndOfLine

Represents an end of line character sequence in a document.

#### Enumeration Members

LF: 1

The line feed `\n` character.

CRLF: 2

The carriage return line feed `\r\n` sequence.

### EnterAction

Describes what to do when pressing Enter.

#### Properties

appendText?: string

Describes text to be appended after the new line and after the indentation.

indentAction: IndentAction

Describe what to do with the indentation.

removeText?: number

Describes the number of characters to remove from the new line's indentation.

### EnvironmentVariableCollection

A collection of mutations that an extension can apply to a process environment.

#### Properties

description: string | MarkdownString

A description for the environment variable collection, this will be used to describe the changes in the UI.

persistent: boolean

Whether the collection should be cached for the workspace and applied to the terminal across window reloads. When true the collection will be active immediately such when the window reloads. Additionally, this API will return the cached version if it exists. The collection will be invalidated when the extension is uninstalled or when the collection is cleared. Defaults to true.

#### Methods

append(variable: string, value: string, options?: EnvironmentVariableMutatorOptions): void

Append a value to an environment variable.

Note that an extension can only make a single change to any one variable, so this will overwrite any previous calls to replace, append or prepend.

Parameter

Description

variable: string

The variable to append to.

value: string

The value to append to the variable.

options?: EnvironmentVariableMutatorOptions

Options applied to the mutator, when no options are provided this will default to `{ applyAtProcessCreation: true }`.

Returns

Description

void

clear(): void

Clears all mutators from this collection.

Parameter

Description

Returns

Description

void

delete(variable: string): void

Deletes this collection's mutator for a variable.

Parameter

Description

variable: string

The variable to delete the mutator for.

Returns

Description

void

forEach(callback: (variable: string, mutator: EnvironmentVariableMutator, collection: EnvironmentVariableCollection) => any, thisArg?: any): void

Iterate over each mutator in this collection.

Parameter

Description

callback: (variable: string, mutator: EnvironmentVariableMutator, collection: EnvironmentVariableCollection) => any

Function to execute for each entry.

thisArg?: any

The `this` context used when invoking the handler function.

Returns

Description

void

get(variable: string): EnvironmentVariableMutator

Gets the mutator that this collection applies to a variable, if any.

Parameter

Description

variable: string

The variable to get the mutator for.

Returns

Description

EnvironmentVariableMutator

prepend(variable: string, value: string, options?: EnvironmentVariableMutatorOptions): void

Prepend a value to an environment variable.

Note that an extension can only make a single change to any one variable, so this will overwrite any previous calls to replace, append or prepend.

Parameter

Description

variable: string

The variable to prepend.

value: string

The value to prepend to the variable.

options?: EnvironmentVariableMutatorOptions

Options applied to the mutator, when no options are provided this will default to `{ applyAtProcessCreation: true }`.

Returns

Description

void

replace(variable: string, value: string, options?: EnvironmentVariableMutatorOptions): void

Replace an environment variable with a value.

Note that an extension can only make a single change to any one variable, so this will overwrite any previous calls to replace, append or prepend.

Parameter

Description

variable: string

The variable to replace.

value: string

The value to replace the variable with.

options?: EnvironmentVariableMutatorOptions

Options applied to the mutator, when no options are provided this will default to `{ applyAtProcessCreation: true }`.

Returns

Description

void

### EnvironmentVariableMutator

A type of mutation and its value to be applied to an environment variable.

#### Properties

options: EnvironmentVariableMutatorOptions

Options applied to the mutator.

type: EnvironmentVariableMutatorType

The type of mutation that will occur to the variable.

value: string

The value to use for the variable.

### EnvironmentVariableMutatorOptions

Options applied to the mutator.

#### Properties

applyAtProcessCreation?: boolean

Apply to the environment just before the process is created. Defaults to false.

applyAtShellIntegration?: boolean

Apply to the environment in the shell integration script. Note that this _will not_ apply the mutator if shell integration is disabled or not working for some reason. Defaults to false.

### EnvironmentVariableMutatorType

A type of mutation that can be applied to an environment variable.

#### Enumeration Members

Replace: 1

Replace the variable's existing value.

Append: 2

Append to the end of the variable's existing value.

Prepend: 3

Prepend to the start of the variable's existing value.

### EnvironmentVariableScope

The scope object to which the environment variable collection applies.

#### Properties

workspaceFolder?: WorkspaceFolder

Any specific workspace folder to get collection for.

### EvaluatableExpression

An EvaluatableExpression represents an expression in a document that can be evaluated by an active debugger or runtime. The result of this evaluation is shown in a tooltip-like widget. If only a range is specified, the expression will be extracted from the underlying document. An optional expression can be used to override the extracted expression. In this case the range is still used to highlight the range in the document.

#### Constructors

new EvaluatableExpression(range: Range, expression?: string): EvaluatableExpression

Creates a new evaluatable expression object.

Parameter

Description

range: Range

The range in the underlying document from which the evaluatable expression is extracted.

expression?: string

If specified overrides the extracted expression.

Returns

Description

EvaluatableExpression

#### Properties

expression?: string

If specified the expression overrides the extracted expression.

range: Range

The range is used to extract the evaluatable expression from the underlying document and to highlight it.

### EvaluatableExpressionProvider

The evaluatable expression provider interface defines the contract between extensions and the debug hover. In this contract the provider returns an evaluatable expression for a given position in a document and the editor evaluates this expression in the active debug session and shows the result in a debug hover.

#### Methods

provideEvaluatableExpression(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<EvaluatableExpression>

Provide an evaluatable expression for the given document and position. The editor will evaluate this expression in the active debug session and will show the result in the debug hover. The expression can be implicitly specified by the range in the underlying document or by explicitly returning an expression.

Parameter

Description

document: TextDocument

The document for which the debug hover is about to appear.

position: Position

The line and character position in the document where the debug hover is about to appear.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<EvaluatableExpression>

An EvaluatableExpression or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

### Event<T>

Represents a typed event.

A function that represents an event to which you subscribe by calling it with a listener function as argument.

**Example**

```
item.onDidChange(function(event) {
  console.log('Event happened: ' + event);
});
```

(listener: (e: T) => any, thisArgs?: any, disposables?: Disposable[]): Disposable

A function that represents an event to which you subscribe by calling it with a listener function as argument.

Parameter

Description

listener: (e: T) => any

The listener function will be called when the event happens.

thisArgs?: any

The `this`-argument which will be used when calling the event listener.

disposables?: Disposable[]

An array to which a Disposable will be added.

Returns

Description

Disposable

A disposable which unsubscribes the event listener.

### EventEmitter<T>

An event emitter can be used to create and manage an Event for others to subscribe to. One emitter always owns one event.

Use this class if you want to provide event from within your extension, for instance inside a TextDocumentContentProvider or when providing API to other extensions.

#### Constructors

new EventEmitter<T>(): EventEmitter<T>

Parameter

Description

Returns

Description

EventEmitter<T>

#### Properties

event: Event<T>

The event listeners can subscribe to.

#### Methods

dispose(): void

Dispose this object and free resources.

Parameter

Description

Returns

Description

void

fire(data: T): void

Notify all subscribers of the event. Failure of one or more listener will not fail this function call.

Parameter

Description

data: T

The event object.

Returns

Description

void

### Extension<T>

Represents an extension.

To get an instance of an `Extension` use getExtension.

#### Properties

exports: T

The public API exported by this extension (return value of `activate`). It is an invalid action to access this field before this extension has been activated.

extensionKind: ExtensionKind

The extension kind describes if an extension runs where the UI runs or if an extension runs where the remote extension host runs. The extension kind is defined in the `package.json`-file of extensions but can also be refined via the `remote.extensionKind`-setting. When no remote extension host exists, the value is ExtensionKind.UI.

extensionPath: string

The absolute file path of the directory containing this extension. Shorthand notation for Extension.extensionUri.fsPath (independent of the uri scheme).

extensionUri: Uri

The uri of the directory containing the extension.

id: string

The canonical extension identifier in the form of: `publisher.name`.

isActive: boolean

`true` if the extension has been activated.

packageJSON: any

The parsed contents of the extension's package.json.

#### Methods

activate(): Thenable<T>

Activates this extension and returns its public API.

Parameter

Description

Returns

Description

Thenable<T>

A promise that will resolve when this extension has been activated.

### ExtensionContext

An extension context is a collection of utilities private to an extension.

An instance of an `ExtensionContext` is provided as the first parameter to the `activate`-call of an extension.

#### Properties

environmentVariableCollection: GlobalEnvironmentVariableCollection

Gets the extension's global environment variable collection for this workspace, enabling changes to be applied to terminal environment variables.

extension: Extension<any>

The current `Extension` instance.

extensionMode: ExtensionMode

The mode the extension is running in. See ExtensionMode for possible values and scenarios.

extensionPath: string

The absolute file path of the directory containing the extension. Shorthand notation for ExtensionContext.extensionUri.fsPath (independent of the uri scheme).

extensionUri: Uri

The uri of the directory containing the extension.

globalState: Memento & {setKeysForSync}

A memento object that stores state independent of the current opened workspace.

globalStoragePath: string

An absolute file path in which the extension can store global state. The directory might not exist on disk and creation is up to the extension. However, the parent directory is guaranteed to be existent.

Use globalState to store key value data.

*   _deprecated_ - Use globalStorageUri instead.

globalStorageUri: Uri

The uri of a directory in which the extension can store global state. The directory might not exist on disk and creation is up to the extension. However, the parent directory is guaranteed to be existent.

Use globalState to store key value data.

_See also_ workspace.fs for how to read and write files and folders from an uri.

languageModelAccessInformation: LanguageModelAccessInformation

An object that keeps information about how this extension can use language models.

_See also_ LanguageModelChat.sendRequest

logPath: string

An absolute file path of a directory in which the extension can create log files. The directory might not exist on disk and creation is up to the extension. However, the parent directory is guaranteed to be existent.

*   _deprecated_ - Use logUri instead.

logUri: Uri

The uri of a directory in which the extension can create log files. The directory might not exist on disk and creation is up to the extension. However, the parent directory is guaranteed to be existent.

_See also_ workspace.fs for how to read and write files and folders from an uri.

secrets: SecretStorage

A secret storage object that stores state independent of the current opened workspace.

storagePath: string

An absolute file path of a workspace specific directory in which the extension can store private state. The directory might not exist on disk and creation is up to the extension. However, the parent directory is guaranteed to be existent.

Use workspaceState or globalState to store key value data.

*   _deprecated_ - Use storageUri instead.

storageUri: Uri

The uri of a workspace specific directory in which the extension can store private state. The directory might not exist and creation is up to the extension. However, the parent directory is guaranteed to be existent. The value is `undefined` when no workspace nor folder has been opened.

Use workspaceState or globalState to store key value data.

_See also_ workspace.fs for how to read and write files and folders from a uri.

subscriptions: Array<{dispose}>

An array to which disposables can be added. When this extension is deactivated the disposables will be disposed.

_Note_ that asynchronous dispose-functions aren't awaited.

workspaceState: Memento

A memento object that stores state in the context of the currently opened workspace.

#### Methods

asAbsolutePath(relativePath: string): string

Get the absolute path of a resource contained in the extension.

_Note_ that an absolute uri can be constructed via Uri.joinPath and extensionUri, e.g. `vscode.Uri.joinPath(context.extensionUri, relativePath);`

Parameter

Description

relativePath: string

A relative path to a resource contained in the extension.

Returns

Description

string

The absolute path of the resource.

### ExtensionKind

In a remote window the extension kind describes if an extension runs where the UI (window) runs or if an extension runs remotely.

#### Enumeration Members

UI: 1

Extension runs where the UI runs.

Workspace: 2

Extension runs where the remote extension host runs.

### ExtensionMode

The ExtensionMode is provided on the `ExtensionContext` and indicates the mode the specific extension is running in.

#### Enumeration Members

Production: 1

The extension is installed normally (for example, from the marketplace or VSIX) in the editor.

Development: 2

The extension is running from an `--extensionDevelopmentPath` provided when launching the editor.

Test: 3

The extension is running from an `--extensionTestsPath` and the extension host is running unit tests.

### ExtensionTerminalOptions

Value-object describing what options a virtual process terminal should use.

#### Properties

color?: ThemeColor

The icon ThemeColor for the terminal. The standard `terminal.ansi*` theme keys are recommended for the best contrast and consistency across themes.

iconPath?: IconPath

The icon path or ThemeIcon for the terminal.

isTransient?: boolean

Opt-out of the default terminal persistence on restart and reload. This will only take effect when `terminal.integrated.enablePersistentSessions` is enabled.

location?: TerminalEditorLocationOptions | TerminalSplitLocationOptions | TerminalLocation

The TerminalLocation or TerminalEditorLocationOptions or TerminalSplitLocationOptions for the terminal.

name: string

A human-readable string which will be used to represent the terminal in the UI.

pty: Pseudoterminal

An implementation of Pseudoterminal that allows an extension to control a terminal.

shellIntegrationNonce?: string

The nonce to use to verify shell integration sequences are coming from a trusted source. An example impact of UX of this is if the command line is reported with a nonce, it will not need to verify with the user that the command line is correct before rerunning it via the shell integration command decoration.

This should be used if the terminal includes custom shell integration support. It should be set to a random GUID. Inside the Pseudoterminal implementation, this value can be passed through in the relevant sequences to make them trusted.

### FileChangeEvent

The event filesystem providers must use to signal a file change.

#### Properties

type: FileChangeType

The type of change.

uri: Uri

The uri of the file that has changed.

### FileChangeType

Enumeration of file change types.

#### Enumeration Members

Changed: 1

The contents or metadata of a file have changed.

Created: 2

A file has been created.

Deleted: 3

A file has been deleted.

### FileCoverage

Contains coverage metadata for a file.

#### Static

fromDetails(uri: Uri, details: readonly FileCoverageDetail[]): FileCoverage

Creates a FileCoverage instance with counts filled in from the coverage details.

Parameter

Description

uri: Uri

Covered file URI

details: readonly FileCoverageDetail[]

Detailed coverage information

Returns

Description

FileCoverage

#### Constructors

new FileCoverage(uri: Uri, statementCoverage: TestCoverageCount, branchCoverage?: TestCoverageCount, declarationCoverage?: TestCoverageCount, includesTests?: TestItem[]): FileCoverage

Parameter

Description

uri: Uri

Covered file URI

statementCoverage: TestCoverageCount

Statement coverage information. If the reporter does not provide statement coverage information, this can instead be used to represent line coverage.

branchCoverage?: TestCoverageCount

Branch coverage information

declarationCoverage?: TestCoverageCount

Declaration coverage information

includesTests?: TestItem[]

Test cases included in this coverage report, see FileCoverage.includesTests

Returns

Description

FileCoverage

#### Properties

branchCoverage?: TestCoverageCount

Branch coverage information.

declarationCoverage?: TestCoverageCount

Declaration coverage information. Depending on the reporter and language, this may be types such as functions, methods, or namespaces.

includesTests?: TestItem[]

A list of test cases that generated coverage in this file. If set, then TestRunProfile.loadDetailedCoverageForTest should also be defined in order to retrieve detailed coverage information.

statementCoverage: TestCoverageCount

Statement coverage information. If the reporter does not provide statement coverage information, this can instead be used to represent line coverage.

uri: Uri

File URI.

### FileCoverageDetail

Coverage details returned from TestRunProfile.loadDetailedCoverage.

FileCoverageDetail: StatementCoverage | DeclarationCoverage

### FileCreateEvent

An event that is fired after files are created.

#### Properties

files: readonly Uri[]

The files that got created.

### FileDecoration

A file decoration represents metadata that can be rendered with a file.

#### Constructors

new FileDecoration(badge?: string, tooltip?: string, color?: ThemeColor): FileDecoration

Creates a new decoration.

Parameter

Description

badge?: string

A letter that represents the decoration.

tooltip?: string

The tooltip of the decoration.

color?: ThemeColor

The color of the decoration.

Returns

Description

FileDecoration

#### Properties

badge?: string

A very short string that represents this decoration.

color?: ThemeColor

The color of this decoration.

propagate?: boolean

A flag expressing that this decoration should be propagated to its parents.

tooltip?: string

A human-readable tooltip for this decoration.

### FileDecorationProvider

The decoration provider interfaces defines the contract between extensions and file decorations.

#### Events

onDidChangeFileDecorations?: Event<Uri | Uri[]>

An optional event to signal that decorations for one or many files have changed.

_Note_ that this event should be used to propagate information about children.

_See also_ EventEmitter

#### Methods

provideFileDecoration(uri: Uri, token: CancellationToken): ProviderResult<FileDecoration>

Provide decorations for a given uri.

_Note_ that this function is only called when a file gets rendered in the UI. This means a decoration from a descendent that propagates upwards must be signaled to the editor via the onDidChangeFileDecorations-event.

Parameter

Description

uri: Uri

The uri of the file to provide a decoration for.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<FileDecoration>

A decoration or a thenable that resolves to such.

### FileDeleteEvent

An event that is fired after files are deleted.

#### Properties

files: readonly Uri[]

The files that got deleted.

### FilePermission

Permissions of a file.

#### Enumeration Members

Readonly: 1

The file is readonly.

_Note:_ All `FileStat` from a `FileSystemProvider` that is registered with the option `isReadonly: true` will be implicitly handled as if `FilePermission.Readonly` is set. As a consequence, it is not possible to have a readonly file system provider registered where some `FileStat` are not readonly.

### FileRenameEvent

An event that is fired after files are renamed.

#### Properties

files: ReadonlyArray<{newUri: Uri, oldUri: Uri}>

The files that got renamed.

### FileStat

The `FileStat`-type represents metadata about a file

#### Properties

ctime: number

The creation timestamp in milliseconds elapsed since January 1, 1970 00:00:00 UTC.

mtime: number

The modification timestamp in milliseconds elapsed since January 1, 1970 00:00:00 UTC.

_Note:_ If the file changed, it is important to provide an updated `mtime` that advanced from the previous value. Otherwise there may be optimizations in place that will not show the updated file contents in an editor for example.

permissions?: FilePermission

The permissions of the file, e.g. whether the file is readonly.

_Note:_ This value might be a bitmask, e.g. `FilePermission.Readonly | FilePermission.Other`.

size: number

The size in bytes.

_Note:_ If the file changed, it is important to provide an updated `size`. Otherwise there may be optimizations in place that will not show the updated file contents in an editor for example.

type: FileType

The type of the file, e.g. is a regular file, a directory, or symbolic link to a file.

_Note:_ This value might be a bitmask, e.g. `FileType.File | FileType.SymbolicLink`.

### FileSystem

The file system interface exposes the editor's built-in and contributed file system providers. It allows extensions to work with files from the local disk as well as files from remote places, like the remote extension host or ftp-servers.

_Note_ that an instance of this interface is available as workspace.fs.

#### Methods

copy(source: Uri, target: Uri, options?: {overwrite: boolean}): Thenable<void>

Copy files or folders.

Parameter

Description

source: Uri

The existing file.

target: Uri

The destination location.

options?: {overwrite: boolean}

Defines if existing files should be overwritten.

Returns

Description

Thenable<void>

createDirectory(uri: Uri): Thenable<void>

Create a new directory (Note, that new files are created via `write`-calls).

_Note_ that missing directories are created automatically, e.g this call has `mkdirp` semantics.

Parameter

Description

uri: Uri

The uri of the new folder.

Returns

Description

Thenable<void>

delete(uri: Uri, options?: {recursive: boolean, useTrash: boolean}): Thenable<void>

Delete a file.

Parameter

Description

uri: Uri

The resource that is to be deleted.

options?: {recursive: boolean, useTrash: boolean}

Defines if trash can should be used and if deletion of folders is recursive

Returns

Description

Thenable<void>

isWritableFileSystem(scheme: string): boolean

Check if a given file system supports writing files.

Keep in mind that just because a file system supports writing, that does not mean that writes will always succeed. There may be permissions issues or other errors that prevent writing a file.

Parameter

Description

scheme: string

The scheme of the filesystem, for example `file` or `git`.

Returns

Description

boolean

`true` if the file system supports writing, `false` if it does not support writing (i.e. it is readonly), and `undefined` if the editor does not know about the filesystem.

readDirectory(uri: Uri): Thenable<Array<[string, FileType]>>

Retrieve all entries of a directory.

Parameter

Description

uri: Uri

The uri of the folder.

Returns

Description

Thenable<Array<[string, FileType]>>

An array of name/type-tuples or a thenable that resolves to such.

readFile(uri: Uri): Thenable<Uint8Array>

Read the entire contents of a file.

Parameter

Description

uri: Uri

The uri of the file.

Returns

Description

Thenable<Uint8Array>

An array of bytes or a thenable that resolves to such.

rename(source: Uri, target: Uri, options?: {overwrite: boolean}): Thenable<void>

Rename a file or folder.

Parameter

Description

source: Uri

The existing file.

target: Uri

The new location.

options?: {overwrite: boolean}

Defines if existing files should be overwritten.

Returns

Description

Thenable<void>

stat(uri: Uri): Thenable<FileStat>

Retrieve metadata about a file.

Parameter

Description

uri: Uri

The uri of the file to retrieve metadata about.

Returns

Description

Thenable<FileStat>

The file metadata about the file.

writeFile(uri: Uri, content: Uint8Array): Thenable<void>

Write data to a file, replacing its entire contents.

Parameter

Description

uri: Uri

The uri of the file.

content: Uint8Array

The new content of the file.

Returns

Description

Thenable<void>

### FileSystemError

A type that filesystem providers should use to signal errors.

This class has factory methods for common error-cases, like `FileNotFound` when a file or folder doesn't exist, use them like so: `throw vscode.FileSystemError.FileNotFound(someUri);`

#### Static

FileExists(messageOrUri?: string | Uri): FileSystemError

Create an error to signal that a file or folder already exists, e.g. when creating but not overwriting a file.

Parameter

Description

messageOrUri?: string | Uri

Message or uri.

Returns

Description

FileSystemError

FileIsADirectory(messageOrUri?: string | Uri): FileSystemError

Create an error to signal that a file is a folder.

Parameter

Description

messageOrUri?: string | Uri

Message or uri.

Returns

Description

FileSystemError

FileNotADirectory(messageOrUri?: string | Uri): FileSystemError

Create an error to signal that a file is not a folder.

Parameter

Description

messageOrUri?: string | Uri

Message or uri.

Returns

Description

FileSystemError

FileNotFound(messageOrUri?: string | Uri): FileSystemError

Create an error to signal that a file or folder wasn't found.

Parameter

Description

messageOrUri?: string | Uri

Message or uri.

Returns

Description

FileSystemError

NoPermissions(messageOrUri?: string | Uri): FileSystemError

Create an error to signal that an operation lacks required permissions.

Parameter

Description

messageOrUri?: string | Uri

Message or uri.

Returns

Description

FileSystemError

Unavailable(messageOrUri?: string | Uri): FileSystemError

Create an error to signal that the file system is unavailable or too busy to complete a request.

Parameter

Description

messageOrUri?: string | Uri

Message or uri.

Returns

Description

FileSystemError

#### Constructors

new FileSystemError(messageOrUri?: string | Uri): FileSystemError

Creates a new filesystem error.

Parameter

Description

messageOrUri?: string | Uri

Message or uri.

Returns

Description

FileSystemError

#### Properties

code: string

A code that identifies this error.

Possible values are names of errors, like FileNotFound, or `Unknown` for unspecified errors.

### FileSystemProvider

The filesystem provider defines what the editor needs to read, write, discover, and to manage files and folders. It allows extensions to serve files from remote places, like ftp-servers, and to seamlessly integrate those into the editor.

*   _Note 1:_ The filesystem provider API works with uris and assumes hierarchical paths, e.g. `foo:/my/path` is a child of `foo:/my/` and a parent of `foo:/my/path/deeper`.
*   _Note 2:_ There is an activation event `onFileSystem:<scheme>` that fires when a file or folder is being accessed.
*   _Note 3:_ The word 'file' is often used to denote all kinds of files, e.g. folders, symbolic links, and regular files.

#### Events

onDidChangeFile: Event<FileChangeEvent[]>

An event to signal that a resource has been created, changed, or deleted. This event should fire for resources that are being watched by clients of this provider.

_Note:_ It is important that the metadata of the file that changed provides an updated `mtime` that advanced from the previous value in the stat and a correct `size` value. Otherwise there may be optimizations in place that will not show the change in an editor for example.

#### Methods

copy(source: Uri, destination: Uri, options: {overwrite: boolean}): void | Thenable<void>

Copy files or folders. Implementing this function is optional but it will speedup the copy operation.

*   _throws_ - FileNotFound when `source` doesn't exist.

*   _throws_ - FileNotFound when parent of `destination` doesn't exist, e.g. no mkdirp-logic required.

*   _throws_ - FileExists when `destination` exists and when the `overwrite` option is not `true`.

*   _throws_ - NoPermissions when permissions aren't sufficient.

Parameter

Description

source: Uri

The existing file.

destination: Uri

The destination location.

options: {overwrite: boolean}

Defines if existing files should be overwritten.

Returns

Description

void | Thenable<void>

createDirectory(uri: Uri): void | Thenable<void>

Create a new directory (Note, that new files are created via `write`-calls).

*   _throws_ - FileNotFound when the parent of `uri` doesn't exist, e.g. no mkdirp-logic required.

*   _throws_ - FileExists when `uri` already exists.

*   _throws_ - NoPermissions when permissions aren't sufficient.

Parameter

Description

uri: Uri

The uri of the new folder.

Returns

Description

void | Thenable<void>

delete(uri: Uri, options: {recursive: boolean}): void | Thenable<void>

Delete a file.

*   _throws_ - FileNotFound when `uri` doesn't exist.

*   _throws_ - NoPermissions when permissions aren't sufficient.

Parameter

Description

uri: Uri

The resource that is to be deleted.

options: {recursive: boolean}

Defines if deletion of folders is recursive.

Returns

Description

void | Thenable<void>

readDirectory(uri: Uri): Array<[string, FileType]> | Thenable<Array<[string, FileType]>>

Retrieve all entries of a directory.

*   _throws_ - FileNotFound when `uri` doesn't exist.

Parameter

Description

uri: Uri

The uri of the folder.

Returns

Description

Array<[string, FileType]> | Thenable<Array<[string, FileType]>>

An array of name/type-tuples or a thenable that resolves to such.

readFile(uri: Uri): Uint8Array | Thenable<Uint8Array>

Read the entire contents of a file.

*   _throws_ - FileNotFound when `uri` doesn't exist.

Parameter

Description

uri: Uri

The uri of the file.

Returns

Description

Uint8Array | Thenable<Uint8Array>

An array of bytes or a thenable that resolves to such.

rename(oldUri: Uri, newUri: Uri, options: {overwrite: boolean}): void | Thenable<void>

Rename a file or folder.

*   _throws_ - FileNotFound when `oldUri` doesn't exist.

*   _throws_ - FileNotFound when parent of `newUri` doesn't exist, e.g. no mkdirp-logic required.

*   _throws_ - FileExists when `newUri` exists and when the `overwrite` option is not `true`.

*   _throws_ - NoPermissions when permissions aren't sufficient.

Parameter

Description

oldUri: Uri

The existing file.

newUri: Uri

The new location.

options: {overwrite: boolean}

Defines if existing files should be overwritten.

Returns

Description

void | Thenable<void>

stat(uri: Uri): FileStat | Thenable<FileStat>

Retrieve metadata about a file.

Note that the metadata for symbolic links should be the metadata of the file they refer to. Still, the SymbolicLink-type must be used in addition to the actual type, e.g. `FileType.SymbolicLink | FileType.Directory`.

*   _throws_ - FileNotFound when `uri` doesn't exist.

Parameter

Description

uri: Uri

The uri of the file to retrieve metadata about.

Returns

Description

FileStat | Thenable<FileStat>

The file metadata about the file.

watch(uri: Uri, options: {excludes: readonly string[], recursive: boolean}): Disposable

Subscribes to file change events in the file or folder denoted by `uri`. For folders, the option `recursive` indicates whether subfolders, sub-subfolders, etc. should be watched for file changes as well. With `recursive: false`, only changes to the files that are direct children of the folder should trigger an event.

The `excludes` array is used to indicate paths that should be excluded from file watching. It is typically derived from the `files.watcherExclude` setting that is configurable by the user. Each entry can be be:

*   the absolute path to exclude
*   a relative path to exclude (for example `build/output`)
*   a simple glob pattern (for example `**/build`, `output/**`)

_Note_ that case-sensitivity of the excludes patterns for built-in file system providers will depend on the underlying file system: on Windows and macOS the matching will be case-insensitive and on Linux it will be case-sensitive.

It is the file system provider's job to call onDidChangeFile for every change given these rules. No event should be emitted for files that match any of the provided excludes.

Parameter

Description

uri: Uri

The uri of the file or folder to be watched.

options: {excludes: readonly string[], recursive: boolean}

Configures the watch.

Returns

Description

Disposable

A disposable that tells the provider to stop watching the `uri`.

writeFile(uri: Uri, content: Uint8Array, options: {create: boolean, overwrite: boolean}): void | Thenable<void>

Write data to a file, replacing its entire contents.

*   _throws_ - FileNotFound when `uri` doesn't exist and `create` is not set.

*   _throws_ - FileNotFound when the parent of `uri` doesn't exist and `create` is set, e.g. no mkdirp-logic required.

*   _throws_ - FileExists when `uri` already exists, `create` is set but `overwrite` is not set.

*   _throws_ - NoPermissions when permissions aren't sufficient.

Parameter

Description

uri: Uri

The uri of the file.

content: Uint8Array

The new content of the file.

options: {create: boolean, overwrite: boolean}

Defines if missing files should or must be created.

Returns

Description

void | Thenable<void>

### FileSystemWatcher

A file system watcher notifies about changes to files and folders on disk or from other FileSystemProviders.

To get an instance of a `FileSystemWatcher` use createFileSystemWatcher.

#### Events

onDidChange: Event<Uri>

An event which fires on file/folder change.

onDidCreate: Event<Uri>

An event which fires on file/folder creation.

onDidDelete: Event<Uri>

An event which fires on file/folder deletion.

#### Properties

ignoreChangeEvents: boolean

true if this file system watcher has been created such that it ignores change file system events.

ignoreCreateEvents: boolean

true if this file system watcher has been created such that it ignores creation file system events.

ignoreDeleteEvents: boolean

true if this file system watcher has been created such that it ignores delete file system events.

#### Methods

dispose(): any

Dispose this object.

Parameter

Description

Returns

Description

any

### FileType

Enumeration of file types. The types `File` and `Directory` can also be a symbolic links, in that case use `FileType.File | FileType.SymbolicLink` and `FileType.Directory | FileType.SymbolicLink`.

#### Enumeration Members

Unknown: 0

The file type is unknown.

File: 1

A regular file.

Directory: 2

A directory.

SymbolicLink: 64

A symbolic link to a file.

### FileWillCreateEvent

An event that is fired when files are going to be created.

To make modifications to the workspace before the files are created, call the waitUntil-function with a thenable that resolves to a workspace edit.

#### Properties

files: readonly Uri[]

The files that are going to be created.

token: CancellationToken

A cancellation token.

#### Methods

waitUntil(thenable: Thenable<WorkspaceEdit>): void

Allows to pause the event and to apply a workspace edit.

_Note:_ This function can only be called during event dispatch and not in an asynchronous manner:

```
workspace.onWillCreateFiles(event => {
  // async, will *throw* an error
  setTimeout(() => event.waitUntil(promise));

  // sync, OK
  event.waitUntil(promise);
});
```

Parameter

Description

thenable: Thenable<WorkspaceEdit>

A thenable that delays saving.

Returns

Description

void

waitUntil(thenable: Thenable<any>): void

Allows to pause the event until the provided thenable resolves.

_Note:_ This function can only be called during event dispatch.

Parameter

Description

thenable: Thenable<any>

A thenable that delays saving.

Returns

Description

void

### FileWillDeleteEvent

An event that is fired when files are going to be deleted.

To make modifications to the workspace before the files are deleted, call the `waitUntil`-function with a thenable that resolves to a workspace edit.

#### Properties

files: readonly Uri[]

The files that are going to be deleted.

token: CancellationToken

A cancellation token.

#### Methods

waitUntil(thenable: Thenable<WorkspaceEdit>): void

Allows to pause the event and to apply a workspace edit.

_Note:_ This function can only be called during event dispatch and not in an asynchronous manner:

```
workspace.onWillCreateFiles(event => {
  // async, will *throw* an error
  setTimeout(() => event.waitUntil(promise));

  // sync, OK
  event.waitUntil(promise);
});
```

Parameter

Description

thenable: Thenable<WorkspaceEdit>

A thenable that delays saving.

Returns

Description

void

waitUntil(thenable: Thenable<any>): void

Allows to pause the event until the provided thenable resolves.

_Note:_ This function can only be called during event dispatch.

Parameter

Description

thenable: Thenable<any>

A thenable that delays saving.

Returns

Description

void

### FileWillRenameEvent

An event that is fired when files are going to be renamed.

To make modifications to the workspace before the files are renamed, call the `waitUntil`-function with a thenable that resolves to a workspace edit.

#### Properties

files: ReadonlyArray<{newUri: Uri, oldUri: Uri}>

The files that are going to be renamed.

token: CancellationToken

A cancellation token.

#### Methods

waitUntil(thenable: Thenable<WorkspaceEdit>): void

Allows to pause the event and to apply a workspace edit.

_Note:_ This function can only be called during event dispatch and not in an asynchronous manner:

```
workspace.onWillCreateFiles(event => {
  // async, will *throw* an error
  setTimeout(() => event.waitUntil(promise));

  // sync, OK
  event.waitUntil(promise);
});
```

Parameter

Description

thenable: Thenable<WorkspaceEdit>

A thenable that delays saving.

Returns

Description

void

waitUntil(thenable: Thenable<any>): void

Allows to pause the event until the provided thenable resolves.

_Note:_ This function can only be called during event dispatch.

Parameter

Description

thenable: Thenable<any>

A thenable that delays saving.

Returns

Description

void

### FoldingContext

Folding context (for future use)

### FoldingRange

A line based folding range. To be valid, start and end line must be bigger than zero and smaller than the number of lines in the document. Invalid ranges will be ignored.

#### Constructors

new FoldingRange(start: number, end: number, kind?: FoldingRangeKind): FoldingRange

Creates a new folding range.

Parameter

Description

start: number

The start line of the folded range.

end: number

The end line of the folded range.

kind?: FoldingRangeKind

The kind of the folding range.

Returns

Description

FoldingRange

#### Properties

end: number

The zero-based end line of the range to fold. The folded area ends with the line's last character. To be valid, the end must be zero or larger and smaller than the number of lines in the document.

kind?: FoldingRangeKind

Describes the Kind of the folding range such as Comment or Region. The kind is used to categorize folding ranges and used by commands like 'Fold all comments'. See FoldingRangeKind for an enumeration of all kinds. If not set, the range is originated from a syntax element.

start: number

The zero-based start line of the range to fold. The folded area starts after the line's last character. To be valid, the end must be zero or larger and smaller than the number of lines in the document.

### FoldingRangeKind

An enumeration of specific folding range kinds. The kind is an optional field of a FoldingRange and is used to distinguish specific folding ranges such as ranges originated from comments. The kind is used by commands like `Fold all comments` or `Fold all regions`. If the kind is not set on the range, the range originated from a syntax element other than comments, imports or region markers.

#### Enumeration Members

Comment: 1

Kind for folding range representing a comment.

Imports: 2

Kind for folding range representing a import.

Region: 3

Kind for folding range representing regions originating from folding markers like `#region` and `#endregion`.

### FoldingRangeProvider

The folding range provider interface defines the contract between extensions and Folding in the editor.

#### Events

onDidChangeFoldingRanges?: Event<void>

An optional event to signal that the folding ranges from this provider have changed.

#### Methods

provideFoldingRanges(document: TextDocument, context: FoldingContext, token: CancellationToken): ProviderResult<FoldingRange[]>

Returns a list of folding ranges or null and undefined if the provider does not want to participate or was cancelled.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

context: FoldingContext

Additional context information (for future use)

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<FoldingRange[]>

### FormattingOptions

Value-object describing what options formatting should use.

#### Properties

insertSpaces: boolean

Prefer spaces over tabs.

tabSize: number

Size of a tab in spaces.

### FunctionBreakpoint

A breakpoint specified by a function name.

#### Constructors

new FunctionBreakpoint(functionName: string, enabled?: boolean, condition?: string, hitCondition?: string, logMessage?: string): FunctionBreakpoint

Create a new function breakpoint.

Parameter

Description

functionName: string

enabled?: boolean

condition?: string

hitCondition?: string

logMessage?: string

Returns

Description

FunctionBreakpoint

#### Properties

condition?: string

An optional expression for conditional breakpoints.

enabled: boolean

Is breakpoint enabled.

functionName: string

The name of the function to which this breakpoint is attached.

hitCondition?: string

An optional expression that controls how many hits of the breakpoint are ignored.

id: string

The unique ID of the breakpoint.

logMessage?: string

An optional message that gets logged when this breakpoint is hit. Embedded expressions within {} are interpolated by the debug adapter.

### GlobalEnvironmentVariableCollection

A collection of mutations that an extension can apply to a process environment. Applies to all scopes.

#### Properties

description: string | MarkdownString

A description for the environment variable collection, this will be used to describe the changes in the UI.

persistent: boolean

Whether the collection should be cached for the workspace and applied to the terminal across window reloads. When true the collection will be active immediately such when the window reloads. Additionally, this API will return the cached version if it exists. The collection will be invalidated when the extension is uninstalled or when the collection is cleared. Defaults to true.

#### Methods

append(variable: string, value: string, options?: EnvironmentVariableMutatorOptions): void

Append a value to an environment variable.

Note that an extension can only make a single change to any one variable, so this will overwrite any previous calls to replace, append or prepend.

Parameter

Description

variable: string

The variable to append to.

value: string

The value to append to the variable.

options?: EnvironmentVariableMutatorOptions

Options applied to the mutator, when no options are provided this will default to `{ applyAtProcessCreation: true }`.

Returns

Description

void

clear(): void

Clears all mutators from this collection.

Parameter

Description

Returns

Description

void

delete(variable: string): void

Deletes this collection's mutator for a variable.

Parameter

Description

variable: string

The variable to delete the mutator for.

Returns

Description

void

forEach(callback: (variable: string, mutator: EnvironmentVariableMutator, collection: EnvironmentVariableCollection) => any, thisArg?: any): void

Iterate over each mutator in this collection.

Parameter

Description

callback: (variable: string, mutator: EnvironmentVariableMutator, collection: EnvironmentVariableCollection) => any

Function to execute for each entry.

thisArg?: any

The `this` context used when invoking the handler function.

Returns

Description

void

get(variable: string): EnvironmentVariableMutator

Gets the mutator that this collection applies to a variable, if any.

Parameter

Description

variable: string

The variable to get the mutator for.

Returns

Description

EnvironmentVariableMutator

getScoped(scope: EnvironmentVariableScope): EnvironmentVariableCollection

Gets scope-specific environment variable collection for the extension. This enables alterations to terminal environment variables solely within the designated scope, and is applied in addition to (and after) the global collection.

Each object obtained through this method is isolated and does not impact objects for other scopes, including the global collection.

Parameter

Description

scope: EnvironmentVariableScope

The scope to which the environment variable collection applies to.

If a scope parameter is omitted, collection applicable to all relevant scopes for that parameter is returned. For instance, if the 'workspaceFolder' parameter is not specified, the collection that applies across all workspace folders will be returned.

Returns

Description

EnvironmentVariableCollection

Environment variable collection for the passed in scope.

prepend(variable: string, value: string, options?: EnvironmentVariableMutatorOptions): void

Prepend a value to an environment variable.

Note that an extension can only make a single change to any one variable, so this will overwrite any previous calls to replace, append or prepend.

Parameter

Description

variable: string

The variable to prepend.

value: string

The value to prepend to the variable.

options?: EnvironmentVariableMutatorOptions

Options applied to the mutator, when no options are provided this will default to `{ applyAtProcessCreation: true }`.

Returns

Description

void

replace(variable: string, value: string, options?: EnvironmentVariableMutatorOptions): void

Replace an environment variable with a value.

Note that an extension can only make a single change to any one variable, so this will overwrite any previous calls to replace, append or prepend.

Parameter

Description

variable: string

The variable to replace.

value: string

The value to replace the variable with.

options?: EnvironmentVariableMutatorOptions

Options applied to the mutator, when no options are provided this will default to `{ applyAtProcessCreation: true }`.

Returns

Description

void

### GlobPattern

A file glob pattern to match file paths against. This can either be a glob pattern string (like `**/*.{ts,js}` or `*.{ts,js}`) or a relative pattern.

Glob patterns can have the following syntax:

*   `*` to match zero or more characters in a path segment
*   `?` to match on one character in a path segment
*   `**` to match any number of path segments, including none
*   `{}` to group conditions (e.g. `**/*.{ts,js}` matches all TypeScript and JavaScript files)
*   `[]` to declare a range of characters to match in a path segment (e.g., `example.[0-9]` to match on `example.0`, `example.1`, …)
*   `[!...]` to negate a range of characters to match in a path segment (e.g., `example.[!0-9]` to match on `example.a`, `example.b`, but not `example.0`)

Note: a backslash (``) is not valid within a glob pattern. If you have an existing file path to match against, consider to use the relative pattern support that takes care of converting any backslash into slash. Otherwise, make sure to convert any backslash to slash when creating the glob pattern.

GlobPattern: string | RelativePattern

### Hover

A hover represents additional information for a symbol or word. Hovers are rendered in a tooltip-like widget.

#### Constructors

new Hover(contents: MarkdownString | MarkedString | Array<MarkdownString | MarkedString>, range?: Range): Hover

Creates a new hover object.

Parameter

Description

contents: MarkdownString | MarkedString | Array<MarkdownString | MarkedString>

The contents of the hover.

range?: Range

The range to which the hover applies.

Returns

Description

Hover

#### Properties

contents: Array<MarkdownString | MarkedString>

The contents of this hover.

range?: Range

The range to which this hover applies. When missing, the editor will use the range at the current position or the current position itself.

### HoverProvider

The hover provider interface defines the contract between extensions and the hover-feature.

#### Methods

provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover>

Provide a hover for the given position and document. Multiple hovers at the same position will be merged by the editor. A hover can have a range which defaults to the word range at the position when omitted.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<Hover>

A hover or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

### IconPath

Represents an icon in the UI. This is either an uri, separate uris for the light- and dark-themes, or a theme icon.

IconPath: Uri | {dark: Uri, light: Uri} | ThemeIcon

### ImplementationProvider

The implementation provider interface defines the contract between extensions and the go to implementation feature.

#### Methods

provideImplementation(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Definition | LocationLink[]>

Provide the implementations of the symbol at the given position and document.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<Definition | LocationLink[]>

A definition or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

### IndentAction

Describes what to do with the indentation when pressing Enter.

#### Enumeration Members

None: 0

Insert new line and copy the previous line's indentation.

Indent: 1

Insert new line and indent once (relative to the previous line's indentation).

IndentOutdent: 2

Insert two new lines:

*   the first one indented which will hold the cursor
*   the second one at the same indentation level

Outdent: 3

Insert new line and outdent once (relative to the previous line's indentation).

### IndentationRule

Describes indentation rules for a language.

#### Properties

decreaseIndentPattern: RegExp

If a line matches this pattern, then all the lines after it should be unindented once (until another rule matches).

increaseIndentPattern: RegExp

If a line matches this pattern, then all the lines after it should be indented once (until another rule matches).

indentNextLinePattern?: RegExp

If a line matches this pattern, then **only the next line** after it should be indented once.

unIndentedLinePattern?: RegExp

If a line matches this pattern, then its indentation should not be changed and it should not be evaluated against the other rules.

### InlayHint

Inlay hint information.

#### Constructors

new InlayHint(position: Position, label: string | InlayHintLabelPart[], kind?: InlayHintKind): InlayHint

Creates a new inlay hint.

Parameter

Description

position: Position

The position of the hint.

label: string | InlayHintLabelPart[]

The label of the hint.

kind?: InlayHintKind

The kind of the hint.

Returns

Description

InlayHint

#### Properties

kind?: InlayHintKind

The kind of this hint. The inlay hint kind defines the appearance of this inlay hint.

label: string | InlayHintLabelPart[]

The label of this hint. A human readable string or an array of label parts.

_Note_ that neither the string nor the label part can be empty.

paddingLeft?: boolean

Render padding before the hint. Padding will use the editor's background color, not the background color of the hint itself. That means padding can be used to visually align/separate an inlay hint.

paddingRight?: boolean

Render padding after the hint. Padding will use the editor's background color, not the background color of the hint itself. That means padding can be used to visually align/separate an inlay hint.

position: Position

The position of this hint.

textEdits?: TextEdit[]

Optional text edits that are performed when accepting this inlay hint. The default gesture for accepting an inlay hint is the double click.

_Note_ that edits are expected to change the document so that the inlay hint (or its nearest variant) is now part of the document and the inlay hint itself is now obsolete.

_Note_ that this property can be set late during resolving of inlay hints.

tooltip?: string | MarkdownString

The tooltip text when you hover over this item.

_Note_ that this property can be set late during resolving of inlay hints.

### InlayHintKind

Inlay hint kinds.

The kind of an inline hint defines its appearance, e.g the corresponding foreground and background colors are being used.

#### Enumeration Members

Type: 1

An inlay hint that is for a type annotation.

Parameter: 2

An inlay hint that is for a parameter.

### InlayHintLabelPart

An inlay hint label part allows for interactive and composite labels of inlay hints.

#### Constructors

new InlayHintLabelPart(value: string): InlayHintLabelPart

Creates a new inlay hint label part.

Parameter

Description

value: string

The value of the part.

Returns

Description

InlayHintLabelPart

#### Properties

command?: Command

An optional command for this label part.

The editor renders parts with commands as clickable links. The command is added to the context menu when a label part defines location and command .

_Note_ that this property can be set late during resolving of inlay hints.

location?: Location

An optional source code location that represents this label part.

The editor will use this location for the hover and for code navigation features: This part will become a clickable link that resolves to the definition of the symbol at the given location (not necessarily the location itself), it shows the hover that shows at the given location, and it shows a context menu with further code navigation commands.

_Note_ that this property can be set late during resolving of inlay hints.

tooltip?: string | MarkdownString

The tooltip text when you hover over this label part.

_Note_ that this property can be set late during resolving of inlay hints.

value: string

The value of this label part.

### InlayHintsProvider<T>

The inlay hints provider interface defines the contract between extensions and the inlay hints feature.

#### Events

onDidChangeInlayHints?: Event<void>

An optional event to signal that inlay hints from this provider have changed.

#### Methods

provideInlayHints(document: TextDocument, range: Range, token: CancellationToken): ProviderResult<T[]>

Provide inlay hints for the given range and document.

_Note_ that inlay hints that are not contained by the given range are ignored.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

range: Range

The range for which inlay hints should be computed.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T[]>

An array of inlay hints or a thenable that resolves to such.

resolveInlayHint(hint: T, token: CancellationToken): ProviderResult<T>

Given an inlay hint fill in tooltip, text edits, or complete label parts.

_Note_ that the editor will resolve an inlay hint at most once.

Parameter

Description

hint: T

An inlay hint.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T>

The resolved inlay hint or a thenable that resolves to such. It is OK to return the given `item`. When no result is returned, the given `item` will be used.

### InlineCompletionContext

Provides information about the context in which an inline completion was requested.

#### Properties

selectedCompletionInfo: SelectedCompletionInfo

Provides information about the currently selected item in the autocomplete widget if it is visible.

If set, provided inline completions must extend the text of the selected item and use the same range, otherwise they are not shown as preview. As an example, if the document text is `console.` and the selected item is `.log` replacing the `.` in the document, the inline completion must also replace `.` and start with `.log`, for example `.log()`.

Inline completion providers are requested again whenever the selected item changes.

triggerKind: InlineCompletionTriggerKind

Describes how the inline completion was triggered.

### InlineCompletionItem

An inline completion item represents a text snippet that is proposed inline to complete text that is being typed.

_See also_ InlineCompletionItemProvider.provideInlineCompletionItems

#### Constructors

new InlineCompletionItem(insertText: string | SnippetString, range?: Range, command?: Command): InlineCompletionItem

Creates a new inline completion item.

Parameter

Description

insertText: string | SnippetString

The text to replace the range with.

range?: Range

The range to replace. If not set, the word at the requested position will be used.

command?: Command

An optional Command that is executed _after_ inserting this completion.

Returns

Description

InlineCompletionItem

#### Properties

command?: Command

An optional Command that is executed _after_ inserting this completion.

filterText?: string

A text that is used to decide if this inline completion should be shown. When `falsy` the InlineCompletionItem.insertText is used.

An inline completion is shown if the text to replace is a prefix of the filter text.

insertText: string | SnippetString

The text to replace the range with. Must be set. Is used both for the preview and the accept operation.

range?: Range

The range to replace. Must begin and end on the same line.

Prefer replacements over insertions to provide a better experience when the user deletes typed text.

### InlineCompletionItemProvider

The inline completion item provider interface defines the contract between extensions and the inline completion feature.

Providers are asked for completions either explicitly by a user gesture or implicitly when typing.

#### Methods

provideInlineCompletionItems(document: TextDocument, position: Position, context: InlineCompletionContext, token: CancellationToken): ProviderResult<InlineCompletionList | InlineCompletionItem[]>

Provides inline completion items for the given position and document. If inline completions are enabled, this method will be called whenever the user stopped typing. It will also be called when the user explicitly triggers inline completions or explicitly asks for the next or previous inline completion. In that case, all available inline completions should be returned. `context.triggerKind` can be used to distinguish between these scenarios.

Parameter

Description

document: TextDocument

The document inline completions are requested for.

position: Position

The position inline completions are requested for.

context: InlineCompletionContext

A context object with additional information.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<InlineCompletionList | InlineCompletionItem[]>

An array of completion items or a thenable that resolves to an array of completion items.

### InlineCompletionList

Represents a collection of inline completion items to be presented in the editor.

#### Constructors

new InlineCompletionList(items: InlineCompletionItem[]): InlineCompletionList

Creates a new list of inline completion items.

Parameter

Description

items: InlineCompletionItem[]

Returns

Description

InlineCompletionList

#### Properties

items: InlineCompletionItem[]

The inline completion items.

### InlineCompletionTriggerKind

Describes how an inline completion provider was triggered.

#### Enumeration Members

Invoke: 0

Completion was triggered explicitly by a user gesture. Return multiple completion items to enable cycling through them.

Automatic: 1

Completion was triggered automatically while editing. It is sufficient to return a single completion item in this case.

### InlineValue

Inline value information can be provided by different means:

*   directly as a text value (class InlineValueText).
*   as a name to use for a variable lookup (class InlineValueVariableLookup)
*   as an evaluatable expression (class InlineValueEvaluatableExpression) The InlineValue types combines all inline value types into one type.

InlineValue: InlineValueText | InlineValueVariableLookup | InlineValueEvaluatableExpression

### InlineValueContext

A value-object that contains contextual information when requesting inline values from a InlineValuesProvider.

#### Properties

frameId: number

The stack frame (as a DAP Id) where the execution has stopped.

stoppedLocation: Range

The document range where execution has stopped. Typically the end position of the range denotes the line where the inline values are shown.

### InlineValueEvaluatableExpression

Provide an inline value through an expression evaluation. If only a range is specified, the expression will be extracted from the underlying document. An optional expression can be used to override the extracted expression.

#### Constructors

new InlineValueEvaluatableExpression(range: Range, expression?: string): InlineValueEvaluatableExpression

Creates a new InlineValueEvaluatableExpression object.

Parameter

Description

range: Range

The range in the underlying document from which the evaluatable expression is extracted.

expression?: string

If specified overrides the extracted expression.

Returns

Description

InlineValueEvaluatableExpression

#### Properties

expression?: string

If specified the expression overrides the extracted expression.

range: Range

The document range for which the inline value applies. The range is used to extract the evaluatable expression from the underlying document.

### InlineValuesProvider

The inline values provider interface defines the contract between extensions and the editor's debugger inline values feature. In this contract the provider returns inline value information for a given document range and the editor shows this information in the editor at the end of lines.

#### Events

onDidChangeInlineValues?: Event<void>

An optional event to signal that inline values have changed.

_See also_ EventEmitter

#### Methods

provideInlineValues(document: TextDocument, viewPort: Range, context: InlineValueContext, token: CancellationToken): ProviderResult<InlineValue[]>

Provide "inline value" information for a given document and range. The editor calls this method whenever debugging stops in the given document. The returned inline values information is rendered in the editor at the end of lines.

Parameter

Description

document: TextDocument

The document for which the inline values information is needed.

viewPort: Range

The visible document range for which inline values should be computed.

context: InlineValueContext

A bag containing contextual information like the current location.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<InlineValue[]>

An array of InlineValueDescriptors or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

### InlineValueText

Provide inline value as text.

#### Constructors

new InlineValueText(range: Range, text: string): InlineValueText

Creates a new InlineValueText object.

Parameter

Description

range: Range

The document line where to show the inline value.

text: string

The value to be shown for the line.

Returns

Description

InlineValueText

#### Properties

range: Range

The document range for which the inline value applies.

text: string

The text of the inline value.

### InlineValueVariableLookup

Provide inline value through a variable lookup. If only a range is specified, the variable name will be extracted from the underlying document. An optional variable name can be used to override the extracted name.

#### Constructors

new InlineValueVariableLookup(range: Range, variableName?: string, caseSensitiveLookup?: boolean): InlineValueVariableLookup

Creates a new InlineValueVariableLookup object.

Parameter

Description

range: Range

The document line where to show the inline value.

variableName?: string

The name of the variable to look up.

caseSensitiveLookup?: boolean

How to perform the lookup. If missing lookup is case sensitive.

Returns

Description

InlineValueVariableLookup

#### Properties

caseSensitiveLookup: boolean

How to perform the lookup.

range: Range

The document range for which the inline value applies. The range is used to extract the variable name from the underlying document.

variableName?: string

If specified the name of the variable to look up.

### InputBox

A concrete QuickInput to let the user input a text value.

Note that in many cases the more convenient window.showInputBox is easier to use. window.createInputBox should be used when window.showInputBox does not offer the required flexibility.

#### Events

onDidAccept: Event<void>

An event signaling when the user indicated acceptance of the input value.

onDidChangeValue: Event<string>

An event signaling when the value has changed.

onDidHide: Event<void>

An event signaling when this input UI is hidden.

There are several reasons why this UI might have to be hidden and the extension will be notified through onDidHide. Examples include: an explicit call to hide, the user pressing Esc, some other input UI opening, etc.

onDidTriggerButton: Event<QuickInputButton>

An event signaling when a button was triggered.

#### Properties

busy: boolean

Determines if the UI should show a progress indicator. Defaults to `false`.

Change this to `true`, for example, while loading more data or validating user input.

buttons: readonly QuickInputButton[]

Buttons for actions in the UI.

enabled: boolean

Determines if the UI should allow for user input. Defaults to `true`.

Change this to `false`, for example, while validating user input or loading data for the next step in user input.

ignoreFocusOut: boolean

Determines if the UI should stay open even when losing UI focus. Defaults to `false`. This setting is ignored on iPad and is always `false`.

password: boolean

Determines if the input value should be hidden. Defaults to `false`.

placeholder: string

Optional placeholder text shown when no value has been input.

prompt: string

An optional prompt text providing some ask or explanation to the user.

step: number

An optional current step count for multi-step input flows.

title: string

An optional title for the input UI.

totalSteps: number

An optional total step count for multi-step input flows.

validationMessage: string | InputBoxValidationMessage

An optional validation message indicating a problem with the current input value.

By setting a string, the InputBox will use a default InputBoxValidationSeverity of Error. Returning `undefined` clears the validation message.

value: string

The current input value.

valueSelection: readonly [number, number]

Selection range in the input value.

Defined as tuple of two numbers where the first is the inclusive start index and the second the exclusive end index. When `undefined` the whole pre-filled value will be selected, when empty (start equals end) only the cursor will be set, otherwise the defined range will be selected.

This property does not get updated when the user types or makes a selection, but it can be updated by the extension.

#### Methods

dispose(): void

Dispose of this input UI and any associated resources.

If it is still visible, it is first hidden. After this call the input UI is no longer functional and no additional methods or properties on it should be accessed. Instead a new input UI should be created.

Parameter

Description

Returns

Description

void

hide(): void

Hides this input UI.

This will also fire an onDidHide event.

Parameter

Description

Returns

Description

void

show(): void

Makes the input UI visible in its current configuration.

Any other input UI will first fire an onDidHide event.

Parameter

Description

Returns

Description

void

### InputBoxOptions

Options to configure the behavior of the input box UI.

#### Properties

ignoreFocusOut?: boolean

Set to `true` to keep the input box open when focus moves to another part of the editor or to another window. This setting is ignored on iPad and is always false.

password?: boolean

Controls if a password input is shown. Password input hides the typed text.

placeHolder?: string

An optional string to show as placeholder in the input box to guide the user what to type.

prompt?: string

The text to display underneath the input box.

title?: string

An optional string that represents the title of the input box.

value?: string

The value to pre-fill in the input box.

valueSelection?: [number, number]

Selection of the pre-filled value. Defined as tuple of two number where the first is the inclusive start index and the second the exclusive end index. When `undefined` the whole pre-filled value will be selected, when empty (start equals end) only the cursor will be set, otherwise the defined range will be selected.

#### Methods

validateInput(value: string): string | InputBoxValidationMessage | Thenable<string | InputBoxValidationMessage>

An optional function that will be called to validate input and to give a hint to the user.

Parameter

Description

value: string

The current value of the input box.

Returns

Description

string | InputBoxValidationMessage | Thenable<string | InputBoxValidationMessage>

Either a human-readable string which is presented as an error message or an InputBoxValidationMessage which can provide a specific message severity. Return `undefined`, `null`, or the empty string when 'value' is valid.

### InputBoxValidationMessage

Represents a validation message for an InputBox.

#### Properties

message: string

The validation message to display to the user.

severity: InputBoxValidationSeverity

The severity level of the validation message.

**Note:** When using InputBoxValidationSeverity.Error, the user will not be able to accept the input (e.g., by pressing Enter). Info and Warning severities will still allow the input to be accepted.

### InputBoxValidationSeverity

Severity levels for input box validation messages.

#### Enumeration Members

Info: 1

Indicates an informational message that does not prevent input acceptance.

Warning: 2

Indicates a warning message that does not prevent input acceptance.

Error: 3

Indicates an error message that prevents the user from accepting the input.

### LanguageConfiguration

The language configuration interfaces defines the contract between extensions and various editor features, like automatic bracket insertion, automatic indentation etc.

#### Properties

__characterPairSupport?: {autoClosingPairs: Array<{close: string, notIn: string[], open: string}>}

**Deprecated** Do not use.

*   _deprecated_ - * Use the autoClosingPairs property in the language configuration file instead.

Parameter

Description

autoClosingPairs: Array<{close: string, notIn: string[], open: string}>

*   _deprecated_

__electricCharacterSupport?: {brackets: any, docComment: {close: string, lineStart: string, open: string, scope: string}}

**Deprecated** Do not use.

*   _deprecated_ - Will be replaced by a better API soon.

Parameter

Description

brackets: any

This property is deprecated and will be **ignored** from the editor.

*   _deprecated_

docComment: {close: string, lineStart: string, open: string, scope: string}

This property is deprecated and not fully supported anymore by the editor (scope and lineStart are ignored). Use the autoClosingPairs property in the language configuration file instead.

*   _deprecated_

autoClosingPairs?: AutoClosingPair[]

The language's auto closing pairs.

brackets?: CharacterPair[]

The language's brackets. This configuration implicitly affects pressing Enter around these brackets.

comments?: CommentRule

The language's comment settings.

indentationRules?: IndentationRule

The language's indentation settings.

onEnterRules?: OnEnterRule[]

The language's rules to be evaluated when pressing Enter.

wordPattern?: RegExp

The language's word definition. If the language supports Unicode identifiers (e.g. JavaScript), it is preferable to provide a word definition that uses exclusion of known separators. e.g.: A regex that matches anything except known separators (and dot is allowed to occur in a floating point number):

```
/(-?\d*\.\d\w*)|([^\`\~\!\\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>/\?\s]+)/g
```

### LanguageModelAccessInformation

Represents extension specific information about the access to language models.

#### Events

onDidChange: Event<void>

An event that fires when access information changes.

#### Methods

canSendRequest(chat: LanguageModelChat): boolean

Checks if a request can be made to a language model.

_Note_ that calling this function will not trigger a consent UI but just checks for a persisted state.

Parameter

Description

chat: LanguageModelChat

A language model chat object.

Returns

Description

boolean

`true` if a request can be made, `false` if not, `undefined` if the language model does not exist or consent hasn't been asked for.

### LanguageModelChat

Represents a language model for making chat requests.

_See also_ lm.selectChatModels

#### Properties

family: string

Opaque family-name of the language model. Values might be `gpt-3.5-turbo`, `gpt4`, `phi2`, or `llama` but they are defined by extensions contributing languages and subject to change.

id: string

Opaque identifier of the language model.

maxInputTokens: number

The maximum number of tokens that can be sent to the model in a single request.

name: string

Human-readable name of the language model.

vendor: string

A well-known identifier of the vendor of the language model. An example is `copilot`, but values are defined by extensions contributing chat models and need to be looked up with them.

version: string

Opaque version string of the model. This is defined by the extension contributing the language model and subject to change.

#### Methods

countTokens(text: string | LanguageModelChatMessage, token?: CancellationToken): Thenable<number>

Count the number of tokens in a message using the model specific tokenizer-logic.

Parameter

Description

text: string | LanguageModelChatMessage

A string or a message instance.

token?: CancellationToken

Optional cancellation token. See CancellationTokenSource for how to create one.

Returns

Description

Thenable<number>

A thenable that resolves to the number of tokens.

sendRequest(messages: LanguageModelChatMessage[], options?: LanguageModelChatRequestOptions, token?: CancellationToken): Thenable<LanguageModelChatResponse>

Make a chat request using a language model.

_Note_ that language model use may be subject to access restrictions and user consent. Calling this function for the first time (for an extension) will show a consent dialog to the user and because of that this function must _only be called in response to a user action!_ Extensions can use LanguageModelAccessInformation.canSendRequest to check if they have the necessary permissions to make a request.

This function will return a rejected promise if making a request to the language model is not possible. Reasons for this can be:

*   user consent not given, see `NoPermissions`
*   model does not exist anymore, see `NotFound`
*   quota limits exceeded, see `Blocked`
*   other issues in which case extension must check [LanguageModelError.cause `LanguageModelError.cause`](#LanguageModelError.cause `LanguageModelError.cause`)

An extension can make use of language model tool calling by passing a set of tools to LanguageModelChatRequestOptions.tools. The language model will return a LanguageModelToolCallPart and the extension can invoke the tool and make another request with the result.

Parameter

Description

messages: LanguageModelChatMessage[]

An array of message instances.

options?: LanguageModelChatRequestOptions

Options that control the request.

token?: CancellationToken

A cancellation token which controls the request. See CancellationTokenSource for how to create one.

Returns

Description

Thenable<LanguageModelChatResponse>

A thenable that resolves to a LanguageModelChatResponse. The promise will reject when the request couldn't be made.

### LanguageModelChatCapabilities

Various features that the LanguageModelChatInformation supports such as tool calling or image input.

#### Properties

imageInput?: boolean

Whether image input is supported by the model. Common supported images are jpg and png, but each model will vary in supported mimetypes.

toolCalling?: number | boolean

Whether tool calling is supported by the model. If a number is provided, that is the maximum number of tools that can be provided in a request to the model.

### LanguageModelChatInformation

Represents a language model provided by a LanguageModelChatProvider.

#### Properties

capabilities: LanguageModelChatCapabilities

Various features that the model supports such as tool calling or image input.

detail?: string

An optional, human-readable string which will be rendered alongside the model. Useful for distinguishing models of the same name in the UI.

family: string

Opaque family-name of the language model. Values might be `gpt-3.5-turbo`, `gpt4`, `phi2`, or `llama`

id: string

Unique identifier for the language model. Must be unique per provider, but not required to be globally unique.

maxInputTokens: number

The maximum number of tokens the model can accept as input.

maxOutputTokens: number

The maximum number of tokens the model is capable of producing.

name: string

Human-readable name of the language model.

tooltip?: string

The tooltip to render when hovering the model. Used to provide more information about the model.

version: string

Opaque version string of the model. This is used as a lookup value in LanguageModelChatSelector.version An example is how GPT 4o has multiple versions like 2024-11-20 and 2024-08-06

### LanguageModelChatMessage

Represents a message in a chat. Can assume different roles, like user or assistant.

#### Static

Assistant(content: string | Array<LanguageModelTextPart | LanguageModelDataPart | LanguageModelToolCallPart>, name?: string): LanguageModelChatMessage

Utility to create a new assistant message.

Parameter

Description

content: string | Array<LanguageModelTextPart | LanguageModelDataPart | LanguageModelToolCallPart>

The content of the message.

name?: string

The optional name of a user for the message.

Returns

Description

LanguageModelChatMessage

User(content: string | Array<LanguageModelTextPart | LanguageModelToolResultPart | LanguageModelDataPart>, name?: string): LanguageModelChatMessage

Utility to create a new user message.

Parameter

Description

content: string | Array<LanguageModelTextPart | LanguageModelToolResultPart | LanguageModelDataPart>

The content of the message.

name?: string

The optional name of a user for the message.

Returns

Description

LanguageModelChatMessage

#### Constructors

new LanguageModelChatMessage(role: LanguageModelChatMessageRole, content: string | LanguageModelInputPart[], name?: string): LanguageModelChatMessage

Create a new user message.

Parameter

Description

role: LanguageModelChatMessageRole

The role of the message.

content: string | LanguageModelInputPart[]

The content of the message.

name?: string

The optional name of a user for the message.

Returns

Description

LanguageModelChatMessage

#### Properties

content: LanguageModelInputPart[]

A string or heterogeneous array of things that a message can contain as content. Some parts may be message-type specific for some models.

name: string

The optional name of a user for this message.

role: LanguageModelChatMessageRole

The role of this message.

### LanguageModelChatMessageRole

Represents the role of a chat message. This is either the user or the assistant.

#### Enumeration Members

User: 1

The user role, e.g the human interacting with a language model.

Assistant: 2

The assistant role, e.g. the language model generating responses.

### LanguageModelChatProvider<T>

A LanguageModelChatProvider implements access to language models, which users can then use through the chat view, or through extension API by acquiring a LanguageModelChat. An example of this would be an OpenAI provider that provides models like gpt-5, o3, etc.

#### Events

onDidChangeLanguageModelChatInformation?: Event<void>

An optional event fired when the available set of language models changes.

#### Methods

provideLanguageModelChatInformation(options: PrepareLanguageModelChatModelOptions, token: CancellationToken): ProviderResult<T[]>

Get the list of available language models provided by this provider

Parameter

Description

options: PrepareLanguageModelChatModelOptions

Options which specify the calling context of this function

token: CancellationToken

A cancellation token

Returns

Description

ProviderResult<T[]>

The list of available language models

provideLanguageModelChatResponse(model: T, messages: readonly LanguageModelChatRequestMessage[], options: ProvideLanguageModelChatResponseOptions, progress: Progress<LanguageModelResponsePart>, token: CancellationToken): Thenable<void>

Returns the response for a chat request, passing the results to the progress callback. The LanguageModelChatProvider must emit the response parts to the progress callback as they are received from the language model.

Parameter

Description

model: T

The language model to use

messages: readonly LanguageModelChatRequestMessage[]

The messages to include in the request

options: ProvideLanguageModelChatResponseOptions

Options for the request

progress: Progress<LanguageModelResponsePart>

The progress to emit the streamed response chunks to

token: CancellationToken

A cancellation token

Returns

Description

Thenable<void>

A promise that resolves when the response is complete. Results are actually passed to the progress callback.

provideTokenCount(model: T, text: string | LanguageModelChatRequestMessage, token: CancellationToken): Thenable<number>

Returns the number of tokens for a given text using the model-specific tokenizer logic

Parameter

Description

model: T

The language model to use

text: string | LanguageModelChatRequestMessage

The text to count tokens for

token: CancellationToken

A cancellation token

Returns

Description

Thenable<number>

The number of tokens

### LanguageModelChatRequestMessage

The provider version of LanguageModelChatMessage.

#### Properties

content: readonly unknown[]

A heterogeneous array of things that a message can contain as content. Some parts may be message-type specific for some models.

name: string

The optional name of a user for this message.

role: LanguageModelChatMessageRole

The role of this message.

### LanguageModelChatRequestOptions

Options for making a chat request using a language model.

_See also_ LanguageModelChat.sendRequest

#### Properties

justification?: string

A human-readable message that explains why access to a language model is needed and what feature is enabled by it.

modelOptions?:

A set of options that control the behavior of the language model. These options are specific to the language model and need to be looked up in the respective documentation.

toolMode?: LanguageModelChatToolMode

The tool-selecting mode to use. LanguageModelChatToolMode.Auto by default.

tools?: LanguageModelChatTool[]

An optional list of tools that are available to the language model. These could be registered tools available via lm.tools, or private tools that are just implemented within the calling extension.

If the LLM requests to call one of these tools, it will return a LanguageModelToolCallPart in LanguageModelChatResponse.stream. It's the caller's responsibility to invoke the tool. If it's a tool registered in lm.tools, that means calling lm.invokeTool.

Then, the tool result can be provided to the LLM by creating an Assistant-type LanguageModelChatMessage with a LanguageModelToolCallPart, followed by a User-type message with a LanguageModelToolResultPart.

### LanguageModelChatResponse

Represents a language model response.

_See also_ ChatRequest

#### Properties

stream: AsyncIterable<unknown>

An async iterable that is a stream of text and tool-call parts forming the overall response. A LanguageModelTextPart is part of the assistant's response to be shown to the user. A LanguageModelToolCallPart is a request from the language model to call a tool. The latter will only be returned if tools were passed in the request via LanguageModelChatRequestOptions.tools. The `unknown`-type is used as a placeholder for future parts, like image data parts.

_Note_ that this stream will error when during data receiving an error occurs. Consumers of the stream should handle the errors accordingly.

To cancel the stream, the consumer can cancel the token that was used to make the request or break from the for-loop.

**Example**

```
try {
  // consume stream
  for await (const chunk of response.stream) {
    if (chunk instanceof LanguageModelTextPart) {
      console.log('TEXT', chunk);
    } else if (chunk instanceof LanguageModelToolCallPart) {
      console.log('TOOL CALL', chunk);
    }
  }
} catch (e) {
  // stream ended with an error
  console.error(e);
}
```

text: AsyncIterable<string>

This is equivalent to filtering everything except for text parts from a LanguageModelChatResponse.stream.

_See also_ LanguageModelChatResponse.stream

### LanguageModelChatSelector

Describes how to select language models for chat requests.

_See also_ lm.selectChatModels

#### Properties

family?: string

A family of language models.

_See also_ LanguageModelChat.family

id?: string

The identifier of a language model.

_See also_ LanguageModelChat.id

vendor?: string

A vendor of language models.

_See also_ LanguageModelChat.vendor

version?: string

The version of a language model.

_See also_ LanguageModelChat.version

### LanguageModelChatTool

A tool that is available to the language model via LanguageModelChatRequestOptions. A language model uses all the properties of this interface to decide which tool to call, and how to call it.

#### Properties

description: string

The description of the tool.

inputSchema?: object

A JSON schema for the input this tool accepts.

name: string

The name of the tool.

### LanguageModelChatToolMode

A tool-calling mode for the language model to use.

#### Enumeration Members

Auto: 1

The language model can choose to call a tool or generate a message. Is the default.

Required: 2

The language model must call one of the provided tools. Note- some models only support a single tool when using this mode.

### LanguageModelDataPart

A language model response part containing arbitrary data. Can be used in responses, chat messages, tool results, and other language model interactions.

#### Static

image(data: Uint8Array, mime: string): LanguageModelDataPart

Create a new LanguageModelDataPart for an image.

Parameter

Description

data: Uint8Array

Binary image data

mime: string

The MIME type of the image. Common values are `image/png` and `image/jpeg`.

Returns

Description

LanguageModelDataPart

json(value: any, mime?: string): LanguageModelDataPart

Create a new LanguageModelDataPart for a json.

_Note_ that this function is not expecting "stringified JSON" but an object that can be stringified. This function will throw an error when the passed value cannot be JSON-stringified.

Parameter

Description

value: any

A JSON-stringifyable value.

mime?: string

Optional MIME type, defaults to `application/json`

Returns

Description

LanguageModelDataPart

text(value: string, mime?: string): LanguageModelDataPart

Create a new LanguageModelDataPart for text.

_Note_ that an UTF-8 encoder is used to create bytes for the string.

Parameter

Description

value: string

Text data

mime?: string

The MIME type if any. Common values are `text/plain` and `text/markdown`.

Returns

Description

LanguageModelDataPart

#### Constructors

new LanguageModelDataPart(data: Uint8Array, mimeType: string): LanguageModelDataPart

Construct a generic data part with the given content.

Parameter

Description

data: Uint8Array

The byte data for this part.

mimeType: string

The mime type of the data.

Returns

Description

LanguageModelDataPart

#### Properties

data: Uint8Array

The byte data for this part.

mimeType: string

The mime type which determines how the data property is interpreted.

### LanguageModelError

An error type for language model specific errors.

Consumers of language models should check the code property to determine specific failure causes, like `if(someError.code === vscode.LanguageModelError.NotFound.name) {...}` for the case of referring to an unknown language model. For unspecified errors the `cause`-property will contain the actual error.

#### Static

Blocked(message?: string): LanguageModelError

The requestor is blocked from using this language model.

Parameter

Description

message?: string

Returns

Description

LanguageModelError

NoPermissions(message?: string): LanguageModelError

The requestor does not have permissions to use this language model

Parameter

Description

message?: string

Returns

Description

LanguageModelError

NotFound(message?: string): LanguageModelError

The language model does not exist.

Parameter

Description

message?: string

Returns

Description

LanguageModelError

#### Constructors

new LanguageModelError(message?: string): LanguageModelError

Parameter

Description

message?: string

Returns

Description

LanguageModelError

#### Properties

code: string

A code that identifies this error.

Possible values are names of errors, like NotFound, or `Unknown` for unspecified errors from the language model itself. In the latter case the `cause`-property will contain the actual error.

### LanguageModelInputPart

The various message types which can be sent via LanguageModelChat.sendRequest and processed by a LanguageModelChatProvider

LanguageModelInputPart: LanguageModelTextPart | LanguageModelToolResultPart | LanguageModelToolCallPart | LanguageModelDataPart

### LanguageModelPromptTsxPart

A language model response part containing a PromptElementJSON from `vscode/prompt-tsx`.

_See also_ LanguageModelToolResult

#### Constructors

new LanguageModelPromptTsxPart(value: unknown): LanguageModelPromptTsxPart

Construct a prompt-tsx part with the given content.

Parameter

Description

value: unknown

The value of the part, the result of `renderElementJSON` from `vscode/prompt-tsx`.

Returns

Description

LanguageModelPromptTsxPart

#### Properties

value: unknown

The value of the part.

### LanguageModelResponsePart

The various message types which a LanguageModelChatProvider can emit in the chat response stream

LanguageModelResponsePart: LanguageModelTextPart | LanguageModelToolResultPart | LanguageModelToolCallPart | LanguageModelDataPart

### LanguageModelTextPart

A language model response part containing a piece of text, returned from a LanguageModelChatResponse.

#### Constructors

new LanguageModelTextPart(value: string): LanguageModelTextPart

Construct a text part with the given content.

Parameter

Description

value: string

The text content of the part.

Returns

Description

LanguageModelTextPart

#### Properties

value: string

The text content of the part.

### LanguageModelTool<T>

A tool that can be invoked by a call to a LanguageModelChat.

#### Methods

invoke(options: LanguageModelToolInvocationOptions<T>, token: CancellationToken): ProviderResult<LanguageModelToolResult>

Invoke the tool with the given input and return a result.

The provided LanguageModelToolInvocationOptions.input has been validated against the declared schema.

Parameter

Description

options: LanguageModelToolInvocationOptions<T>

token: CancellationToken

Returns

Description

ProviderResult<LanguageModelToolResult>

prepareInvocation(options: LanguageModelToolInvocationPrepareOptions<T>, token: CancellationToken): ProviderResult<PreparedToolInvocation>

Called once before a tool is invoked. It's recommended to implement this to customize the progress message that appears while the tool is running, and to provide a more useful message with context from the invocation input. Can also signal that a tool needs user confirmation before running, if appropriate.

*   _Note 1:_ Must be free of side-effects.
*   _Note 2:_ A call to `prepareInvocation` is not necessarily followed by a call to `invoke`.

Parameter

Description

options: LanguageModelToolInvocationPrepareOptions<T>

token: CancellationToken

Returns

Description

ProviderResult<PreparedToolInvocation>

### LanguageModelToolCallPart

A language model response part indicating a tool call, returned from a LanguageModelChatResponse, and also can be included as a content part on a LanguageModelChatMessage, to represent a previous tool call in a chat request.

#### Constructors

new LanguageModelToolCallPart(callId: string, name: string, input: object): LanguageModelToolCallPart

Create a new LanguageModelToolCallPart.

Parameter

Description

callId: string

The ID of the tool call.

name: string

The name of the tool to call.

input: object

The input with which to call the tool.

Returns

Description

LanguageModelToolCallPart

#### Properties

callId: string

The ID of the tool call. This is a unique identifier for the tool call within the chat request.

input: object

The input with which to call the tool.

name: string

The name of the tool to call.

### LanguageModelToolConfirmationMessages

When this is returned in PreparedToolInvocation, the user will be asked to confirm before running the tool. These messages will be shown with buttons that say "Continue" and "Cancel".

#### Properties

message: string | MarkdownString

The body of the confirmation message.

title: string

The title of the confirmation message.

### LanguageModelToolInformation

Information about a registered tool available in lm.tools.

#### Properties

description: string

A description of this tool that may be passed to a language model.

inputSchema: object

A JSON schema for the input this tool accepts.

name: string

A unique name for the tool.

tags: readonly string[]

A set of tags, declared by the tool, that roughly describe the tool's capabilities. A tool user may use these to filter the set of tools to just ones that are relevant for the task at hand.

### LanguageModelToolInvocationOptions<T>

Options provided for tool invocation.

#### Properties

input: T

The input with which to invoke the tool. The input must match the schema defined in LanguageModelToolInformation.inputSchema

tokenizationOptions?: LanguageModelToolTokenizationOptions

Options to hint at how many tokens the tool should return in its response, and enable the tool to count tokens accurately.

toolInvocationToken: undefined

An opaque object that ties a tool invocation to a chat request from a chat participant.

The _only_ way to get a valid tool invocation token is using the provided toolInvocationToken from a chat request. In that case, a progress bar will be automatically shown for the tool invocation in the chat response view, and if the tool requires user confirmation, it will show up inline in the chat view.

If the tool is being invoked outside of a chat request, `undefined` should be passed instead, and no special UI except for confirmations will be shown.

_Note_ that a tool that invokes another tool during its invocation, can pass along the `toolInvocationToken` that it received.

### LanguageModelToolInvocationPrepareOptions<T>

Options for LanguageModelTool.prepareInvocation.

#### Properties

input: T

The input that the tool is being invoked with.

### LanguageModelToolResult

A result returned from a tool invocation. If using `vscode/prompt-tsx`, this result may be rendered using a `ToolResult`.

#### Constructors

new LanguageModelToolResult(content: unknown[]): LanguageModelToolResult

Create a LanguageModelToolResult

Parameter

Description

content: unknown[]

A list of tool result content parts

Returns

Description

LanguageModelToolResult

#### Properties

content: unknown[]

A list of tool result content parts. Includes `unknown` because this list may be extended with new content types in the future.

_See also_ lm.invokeTool.

### LanguageModelToolResultPart

The result of a tool call. This is the counterpart of a tool call and it can only be included in the content of a User message

#### Constructors

new LanguageModelToolResultPart(callId: string, content: unknown[]): LanguageModelToolResultPart

Parameter

Description

callId: string

The ID of the tool call.

content: unknown[]

The content of the tool result.

Returns

Description

LanguageModelToolResultPart

#### Properties

callId: string

The ID of the tool call.

_Note_ that this should match the callId of a tool call part.

content: unknown[]

The value of the tool result.

### LanguageModelToolTokenizationOptions

Options related to tokenization for a tool invocation.

#### Properties

tokenBudget: number

If known, the maximum number of tokens the tool should emit in its result.

#### Methods

countTokens(text: string, token?: CancellationToken): Thenable<number>

Count the number of tokens in a message using the model specific tokenizer-logic.

Parameter

Description

text: string

A string.

token?: CancellationToken

Optional cancellation token. See CancellationTokenSource for how to create one.

Returns

Description

Thenable<number>

A thenable that resolves to the number of tokens.

### LanguageStatusItem

A language status item is the preferred way to present language status reports for the active text editors, such as selected linter or notifying about a configuration problem.

#### Properties

accessibilityInformation?: AccessibilityInformation

Accessibility information used when a screen reader interacts with this item

busy: boolean

Controls whether the item is shown as "busy". Defaults to `false`.

command: Command

A command for this item.

detail?: string

Optional, human-readable details for this item.

id: string

The identifier of this item.

name: string

The short name of this item, like 'Java Language Status', etc.

selector: DocumentSelector

A selector that defines for what editors this item shows.

severity: LanguageStatusSeverity

The severity of this item.

Defaults to information. You can use this property to signal to users that there is a problem that needs attention, like a missing executable or an invalid configuration.

text: string

The text to show for the entry. You can embed icons in the text by leveraging the syntax:

`My text $(icon-name) contains icons like $(icon-name) this one.`

Where the icon-name is taken from the ThemeIcon icon set, e.g. `light-bulb`, `thumbsup`, `zap` etc.

#### Methods

dispose(): void

Dispose and free associated resources.

Parameter

Description

Returns

Description

void

### LanguageStatusSeverity

Represents the severity level of a language status.

#### Enumeration Members

Information: 0

Informational severity level.

Warning: 1

Warning severity level.

Error: 2

Error severity level.

### LineCommentRule

Configuration for line comments.

#### Properties

comment: string

The line comment token, like `//`

noIndent?: boolean

Whether the comment token should not be indented and placed at the first column. Defaults to false.

### LinkedEditingRangeProvider

The linked editing range provider interface defines the contract between extensions and the linked editing feature.

#### Methods

provideLinkedEditingRanges(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<LinkedEditingRanges>

For a given position in a document, returns the range of the symbol at the position and all ranges that have the same content. A change to one of the ranges can be applied to all other ranges if the new content is valid. An optional word pattern can be returned with the result to describe valid contents. If no result-specific word pattern is provided, the word pattern from the language configuration is used.

Parameter

Description

document: TextDocument

The document in which the provider was invoked.

position: Position

The position at which the provider was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<LinkedEditingRanges>

A list of ranges that can be edited together

### LinkedEditingRanges

Represents a list of ranges that can be edited together along with a word pattern to describe valid range contents.

#### Constructors

new LinkedEditingRanges(ranges: Range[], wordPattern?: RegExp): LinkedEditingRanges

Create a new linked editing ranges object.

Parameter

Description

ranges: Range[]

A list of ranges that can be edited together

wordPattern?: RegExp

An optional word pattern that describes valid contents for the given ranges

Returns

Description

LinkedEditingRanges

#### Properties

ranges: Range[]

A list of ranges that can be edited together. The ranges must have identical length and text content. The ranges cannot overlap.

wordPattern: RegExp

An optional word pattern that describes valid contents for the given ranges. If no pattern is provided, the language configuration's word pattern will be used.

### Location

Represents a location inside a resource, such as a line inside a text file.

#### Constructors

new Location(uri: Uri, rangeOrPosition: Range | Position): Location

Creates a new location object.

Parameter

Description

uri: Uri

The resource identifier.

rangeOrPosition: Range | Position

The range or position. Positions will be converted to an empty range.

Returns

Description

Location

#### Properties

range: Range

The document range of this location.

uri: Uri

The resource identifier of this location.

### LocationLink

Represents the connection of two locations. Provides additional metadata over normal locations, including an origin range.

#### Properties

originSelectionRange?: Range

Span of the origin of this link.

Used as the underlined span for mouse definition hover. Defaults to the word range at the definition position.

targetRange: Range

The full target range of this link.

targetSelectionRange?: Range

The span of this link.

targetUri: Uri

The target resource identifier of this link.

### LogLevel

Log levels

#### Enumeration Members

Off: 0

No messages are logged with this level.

Trace: 1

All messages are logged with this level.

Debug: 2

Messages with debug and higher log level are logged with this level.

Info: 3

Messages with info and higher log level are logged with this level.

Warning: 4

Messages with warning and higher log level are logged with this level.

Error: 5

Only error messages are logged with this level.

### LogOutputChannel

A channel for containing log output.

To get an instance of a `LogOutputChannel` use createOutputChannel.

#### Events

onDidChangeLogLevel: Event<LogLevel>

An Event which fires when the log level of the channel changes.

#### Properties

logLevel: LogLevel

The current log level of the channel. Defaults to editor log level.

name: string

The human-readable name of this output channel.

#### Methods

append(value: string): void

Append the given value to the channel.

Parameter

Description

value: string

A string, falsy values will not be printed.

Returns

Description

void

appendLine(value: string): void

Append the given value and a line feed character to the channel.

Parameter

Description

value: string

A string, falsy values will be printed.

Returns

Description

void

clear(): void

Removes all output from the channel.

Parameter

Description

Returns

Description

void

debug(message: string, ...args: any[]): void

Outputs the given debug message to the channel.

The message is only logged if the channel is configured to display debug log level or lower.

Parameter

Description

message: string

debug message to log

...args: any[]

Returns

Description

void

dispose(): void

Dispose and free associated resources.

Parameter

Description

Returns

Description

void

error(error: string | Error, ...args: any[]): void

Outputs the given error or error message to the channel.

The message is only logged if the channel is configured to display error log level or lower.

Parameter

Description

error: string | Error

Error or error message to log

...args: any[]

Returns

Description

void

hide(): void

Hide this channel from the UI.

Parameter

Description

Returns

Description

void

info(message: string, ...args: any[]): void

Outputs the given information message to the channel.

The message is only logged if the channel is configured to display info log level or lower.

Parameter

Description

message: string

info message to log

...args: any[]

Returns

Description

void

replace(value: string): void

Replaces all output from the channel with the given value.

Parameter

Description

value: string

A string, falsy values will not be printed.

Returns

Description

void

show(preserveFocus?: boolean): void

Reveal this channel in the UI.

Parameter

Description

preserveFocus?: boolean

When `true` the channel will not take focus.

Returns

Description

void

show(column?: ViewColumn, preserveFocus?: boolean): void

Reveal this channel in the UI.

*   _deprecated_ - Use the overload with just one parameter (`show(preserveFocus?: boolean): void`).

Parameter

Description

column?: ViewColumn

This argument is **deprecated** and will be ignored.

preserveFocus?: boolean

When `true` the channel will not take focus.

Returns

Description

void

trace(message: string, ...args: any[]): void

Outputs the given trace message to the channel. Use this method to log verbose information.

The message is only logged if the channel is configured to display trace log level.

Parameter

Description

message: string

trace message to log

...args: any[]

Returns

Description

void

warn(message: string, ...args: any[]): void

Outputs the given warning message to the channel.

The message is only logged if the channel is configured to display warning log level or lower.

Parameter

Description

message: string

warning message to log

...args: any[]

Returns

Description

void

### MarkdownString

Human-readable text that supports formatting via the markdown syntax.

Rendering of theme icons via the `$(<name>)`-syntax is supported when the supportThemeIcons is set to `true`.

Rendering of embedded html is supported when supportHtml is set to `true`.

#### Constructors

new MarkdownString(value?: string, supportThemeIcons?: boolean): MarkdownString

Creates a new markdown string with the given value.

Parameter

Description

value?: string

Optional, initial value.

supportThemeIcons?: boolean

Optional, Specifies whether ThemeIcons are supported within the MarkdownString.

Returns

Description

MarkdownString

#### Properties

baseUri?: Uri

Uri that relative paths are resolved relative to.

If the `baseUri` ends with `/`, it is considered a directory and relative paths in the markdown are resolved relative to that directory:

```
const md = new vscode.MarkdownString(`[link](./file.js)`);
md.baseUri = vscode.Uri.file('/path/to/dir/');
// Here 'link' in the rendered markdown resolves to '/path/to/dir/file.js'
```

If the `baseUri` is a file, relative paths in the markdown are resolved relative to the parent dir of that file:

```
const md = new vscode.MarkdownString(`[link](./file.js)`);
md.baseUri = vscode.Uri.file('/path/to/otherFile.js');
// Here 'link' in the rendered markdown resolves to '/path/to/file.js'
```

isTrusted?: boolean | {enabledCommands: readonly string[]}

Indicates that this markdown string is from a trusted source. Only _trusted_ markdown supports links that execute commands, e.g. `[Run it](command:myCommandId)`.

Defaults to `false` (commands are disabled).

supportHtml?: boolean

Indicates that this markdown string can contain raw html tags. Defaults to `false`.

When `supportHtml` is false, the markdown renderer will strip out any raw html tags that appear in the markdown text. This means you can only use markdown syntax for rendering.

When `supportHtml` is true, the markdown render will also allow a safe subset of html tags and attributes to be rendered. See https://github.com/microsoft/vscode/blob/6d2920473c6f13759c978dd89104c4270a83422d/src/vs/base/browser/markdownRenderer.ts#L296 for a list of all supported tags and attributes.

supportThemeIcons?: boolean

Indicates that this markdown string can contain ThemeIcons, e.g. `$(zap)`.

value: string

The markdown string.

#### Methods

appendCodeblock(value: string, language?: string): MarkdownString

Appends the given string as codeblock using the provided language.

Parameter

Description

value: string

A code snippet.

language?: string

An optional language identifier.

Returns

Description

MarkdownString

appendMarkdown(value: string): MarkdownString

Appends the given string 'as is' to this markdown string. When supportThemeIcons is `true`, ThemeIcons in the `value` will be iconified.

Parameter

Description

value: string

Markdown string.

Returns

Description

MarkdownString

appendText(value: string): MarkdownString

Appends and escapes the given string to this markdown string.

Parameter

Description

value: string

Plain text.

Returns

Description

MarkdownString

### MarkedString

MarkedString can be used to render human-readable text. It is either a markdown string or a code-block that provides a language and a code snippet. Note that markdown strings will be sanitized - that means html will be escaped.

*   _deprecated_ - This type is deprecated, please use MarkdownString instead.

MarkedString: string | {language: string, value: string}

### McpHttpServerDefinition

McpHttpServerDefinition represents an MCP server available using the Streamable HTTP transport.

#### Constructors

new McpHttpServerDefinition(label: string, uri: Uri, headers?: Record<string, string>, version?: string): McpHttpServerDefinition

Parameter

Description

label: string

The human-readable name of the server.

uri: Uri

The URI of the server.

headers?: Record<string, string>

Optional additional heads included with each request to the server.

version?: string

Returns

Description

McpHttpServerDefinition

#### Properties

headers: Record<string, string>

Optional additional heads included with each request to the server.

label: string

The human-readable name of the server.

uri: Uri

The URI of the server. The editor will make a POST request to this URI to begin each session.

version?: string

Optional version identification for the server. If this changes, the editor will indicate that tools have changed and prompt to refresh them.

### McpServerDefinition

Definitions that describe different types of Model Context Protocol servers, which can be returned from the McpServerDefinitionProvider.

McpServerDefinition: McpStdioServerDefinition | McpHttpServerDefinition

### McpServerDefinitionProvider<T>

A type that can provide Model Context Protocol server definitions. This should be registered using lm.registerMcpServerDefinitionProvider during extension activation.

#### Events

onDidChangeMcpServerDefinitions?: Event<void>

Optional event fired to signal that the set of available servers has changed.

#### Methods

provideMcpServerDefinitions(token: CancellationToken): ProviderResult<T[]>

Provides available MCP servers. The editor will call this method eagerly to ensure the availability of servers for the language model, and so extensions should not take actions which would require user interaction, such as authentication.

Parameter

Description

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T[]>

An array of MCP available MCP servers

resolveMcpServerDefinition(server: T, token: CancellationToken): ProviderResult<T>

This function will be called when the editor needs to start a MCP server. At this point, the extension may take any actions which may require user interaction, such as authentication. Any non-`readonly` property of the server may be modified, and the extension should return the resolved server.

The extension may return undefined to indicate that the server should not be started, or throw an error. If there is a pending tool call, the editor will cancel it and return an error message to the language model.

Parameter

Description

server: T

The MCP server to resolve

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T>

The resolved server or thenable that resolves to such. This may be the given `server` definition with non-readonly properties filled in.

### McpStdioServerDefinition

McpStdioServerDefinition represents an MCP server available by running a local process and operating on its stdin and stdout streams. The process will be spawned as a child process of the extension host and by default will not run in a shell environment.

#### Constructors

new McpStdioServerDefinition(label: string, command: string, args?: string[], env?: Record<string, string | number>, version?: string): McpStdioServerDefinition

Parameter

Description

label: string

The human-readable name of the server.

command: string

The command used to start the server.

args?: string[]

Additional command-line arguments passed to the server.

env?: Record<string, string | number>

Optional additional environment information for the server.

version?: string

Optional version identification for the server.

Returns

Description

McpStdioServerDefinition

#### Properties

args: string[]

Additional command-line arguments passed to the server.

command: string

The command used to start the server. Node.js-based servers may use `process.execPath` to use the editor's version of Node.js to run the script.

cwd?: Uri

The working directory used to start the server.

env: Record<string, string | number>

Optional additional environment information for the server. Variables in this environment will overwrite or remove (if null) the default environment variables of the editor's extension host.

label: string

The human-readable name of the server.

version?: string

Optional version identification for the server. If this changes, the editor will indicate that tools have changed and prompt to refresh them.

### Memento

A memento represents a storage utility. It can store and retrieve values.

#### Methods

get<T>(key: string): T

Return a value.

Parameter

Description

key: string

A string.

Returns

Description

T

The stored value or `undefined`.

get<T>(key: string, defaultValue: T): T

Return a value.

Parameter

Description

key: string

A string.

defaultValue: T

A value that should be returned when there is no value (`undefined`) with the given key.

Returns

Description

T

The stored value or the defaultValue.

keys(): readonly string[]

Returns the stored keys.

Parameter

Description

Returns

Description

readonly string[]

The stored keys.

update(key: string, value: any): Thenable<void>

Store a value. The value must be JSON-stringifyable.

_Note_ that using `undefined` as value removes the key from the underlying storage.

Parameter

Description

key: string

A string.

value: any

A value. MUST not contain cyclic references.

Returns

Description

Thenable<void>

### MessageItem

Represents an action that is shown with an information, warning, or error message.

_See also_

*   showInformationMessage
*   showWarningMessage
*   showErrorMessage

#### Properties

isCloseAffordance?: boolean

A hint for modal dialogs that the item should be triggered when the user cancels the dialog (e.g. by pressing the ESC key).

Note: this option is ignored for non-modal messages.

title: string

A short title like 'Retry', 'Open Log' etc.

### MessageOptions

Options to configure the behavior of the message.

_See also_

*   showInformationMessage
*   showWarningMessage
*   showErrorMessage

#### Properties

detail?: string

Human-readable detail message that is rendered less prominent. _Note_ that detail is only shown for modal messages.

modal?: boolean

Indicates that this message should be modal.

### NotebookCell

Represents a cell of a notebook, either a code-cell or markup-cell.

NotebookCell instances are immutable and are kept in sync for as long as they are part of their notebook.

#### Properties

document: TextDocument

The text of this cell, represented as text document.

executionSummary: NotebookCellExecutionSummary

The most recent execution summary for this cell.

index: number

The index of this cell in its containing notebook. The index is updated when a cell is moved within its notebook. The index is `-1` when the cell has been removed from its notebook.

kind: NotebookCellKind

The kind of this cell.

metadata:

The metadata of this cell. Can be anything but must be JSON-stringifyable.

notebook: NotebookDocument

The notebook that contains this cell.

outputs: readonly NotebookCellOutput[]

The outputs of this cell.

### NotebookCellData

NotebookCellData is the raw representation of notebook cells. Its is part of NotebookData.

#### Constructors

new NotebookCellData(kind: NotebookCellKind, value: string, languageId: string): NotebookCellData

Create new cell data. Minimal cell data specifies its kind, its source value, and the language identifier of its source.

Parameter

Description

kind: NotebookCellKind

The kind.

value: string

The source value.

languageId: string

The language identifier of the source value.

Returns

Description

NotebookCellData

#### Properties

executionSummary?: NotebookCellExecutionSummary

The execution summary of this cell data.

kind: NotebookCellKind

The kind of this cell data.

languageId: string

The language identifier of the source value of this cell data. Any value from getLanguages is possible.

metadata?:

Arbitrary metadata of this cell data. Can be anything but must be JSON-stringifyable.

outputs?: NotebookCellOutput[]

The outputs of this cell data.

value: string

The source value of this cell data - either source code or formatted text.

### NotebookCellExecution

A NotebookCellExecution is how notebook controller modify a notebook cell as it is executing.

When a cell execution object is created, the cell enters the [NotebookCellExecutionState.Pending Pending](#NotebookCellExecutionState.Pending Pending) state. When start(...) is called on the execution task, it enters the [NotebookCellExecutionState.Executing Executing](#NotebookCellExecutionState.Executing Executing) state. When end(...) is called, it enters the [NotebookCellExecutionState.Idle Idle](#NotebookCellExecutionState.Idle Idle) state.

#### Properties

cell: NotebookCell

The cell for which this execution has been created.

executionOrder: number

Set and unset the order of this cell execution.

token: CancellationToken

A cancellation token which will be triggered when the cell execution is canceled from the UI.

_Note_ that the cancellation token will not be triggered when the controller that created this execution uses an interrupt-handler.

#### Methods

appendOutput(out: NotebookCellOutput | readonly NotebookCellOutput[], cell?: NotebookCell): Thenable<void>

Append to the output of the cell that is executing or to another cell that is affected by this execution.

Parameter

Description

out: NotebookCellOutput | readonly NotebookCellOutput[]

Output that is appended to the current output.

cell?: NotebookCell

Cell for which output is cleared. Defaults to the cell of this execution.

Returns

Description

Thenable<void>

A thenable that resolves when the operation finished.

appendOutputItems(items: NotebookCellOutputItem | readonly NotebookCellOutputItem[], output: NotebookCellOutput): Thenable<void>

Append output items to existing cell output.

Parameter

Description

items: NotebookCellOutputItem | readonly NotebookCellOutputItem[]

Output items that are append to existing output.

output: NotebookCellOutput

Output object that already exists.

Returns

Description

Thenable<void>

A thenable that resolves when the operation finished.

clearOutput(cell?: NotebookCell): Thenable<void>

Clears the output of the cell that is executing or of another cell that is affected by this execution.

Parameter

Description

cell?: NotebookCell

Cell for which output is cleared. Defaults to the cell of this execution.

Returns

Description

Thenable<void>

A thenable that resolves when the operation finished.

end(success: boolean, endTime?: number): void

Signal that execution has ended.

Parameter

Description

success: boolean

If true, a green check is shown on the cell status bar. If false, a red X is shown. If undefined, no check or X icon is shown.

endTime?: number

The time that execution finished, in milliseconds in the Unix epoch.

Returns

Description

void

replaceOutput(out: NotebookCellOutput | readonly NotebookCellOutput[], cell?: NotebookCell): Thenable<void>

Replace the output of the cell that is executing or of another cell that is affected by this execution.

Parameter

Description

out: NotebookCellOutput | readonly NotebookCellOutput[]

Output that replaces the current output.

cell?: NotebookCell

Cell for which output is cleared. Defaults to the cell of this execution.

Returns

Description

Thenable<void>

A thenable that resolves when the operation finished.

replaceOutputItems(items: NotebookCellOutputItem | readonly NotebookCellOutputItem[], output: NotebookCellOutput): Thenable<void>

Replace all output items of existing cell output.

Parameter

Description

items: NotebookCellOutputItem | readonly NotebookCellOutputItem[]

Output items that replace the items of existing output.

output: NotebookCellOutput

Output object that already exists.

Returns

Description

Thenable<void>

A thenable that resolves when the operation finished.

start(startTime?: number): void

Signal that the execution has begun.

Parameter

Description

startTime?: number

The time that execution began, in milliseconds in the Unix epoch. Used to drive the clock that shows for how long a cell has been running. If not given, the clock won't be shown.

Returns

Description

void

### NotebookCellExecutionSummary

The summary of a notebook cell execution.

#### Properties

executionOrder?: number

The order in which the execution happened.

success?: boolean

If the execution finished successfully.

timing?: {endTime: number, startTime: number}

The times at which execution started and ended, as unix timestamps

Parameter

Description

endTime: number

Execution end time.

startTime: number

Execution start time.

### NotebookCellKind

A notebook cell kind.

#### Enumeration Members

Markup: 1

A markup-cell is formatted source that is used for display.

Code: 2

A code-cell is source that can be executed and that produces output.

### NotebookCellOutput

Notebook cell output represents a result of executing a cell. It is a container type for multiple output items where contained items represent the same result but use different MIME types.

#### Constructors

new NotebookCellOutput(items: NotebookCellOutputItem[], metadata?: ): NotebookCellOutput

Create new notebook output.

Parameter

Description

items: NotebookCellOutputItem[]

Notebook output items.

metadata?:

Optional metadata.

Returns

Description

NotebookCellOutput

#### Properties

items: NotebookCellOutputItem[]

The output items of this output. Each item must represent the same result. _Note_ that repeated MIME types per output is invalid and that the editor will just pick one of them.

```
new vscode.NotebookCellOutput([
  vscode.NotebookCellOutputItem.text('Hello', 'text/plain'),
  vscode.NotebookCellOutputItem.text('<i>Hello</i>', 'text/html'),
  vscode.NotebookCellOutputItem.text('_Hello_', 'text/markdown'),
  vscode.NotebookCellOutputItem.text('Hey', 'text/plain') // INVALID: repeated type, editor will pick just one
]);
```

metadata?:

Arbitrary metadata for this cell output. Can be anything but must be JSON-stringifyable.

### NotebookCellOutputItem

One representation of a notebook output, defined by MIME type and data.

#### Static

error(value: Error): NotebookCellOutputItem

Factory function to create a `NotebookCellOutputItem` that uses uses the `application/vnd.code.notebook.error` mime type.

Parameter

Description

value: Error

An error object.

Returns

Description

NotebookCellOutputItem

A new output item object.

json(value: any, mime?: string): NotebookCellOutputItem

Factory function to create a `NotebookCellOutputItem` from a JSON object.

_Note_ that this function is not expecting "stringified JSON" but an object that can be stringified. This function will throw an error when the passed value cannot be JSON-stringified.

Parameter

Description

value: any

A JSON-stringifyable value.

mime?: string

Optional MIME type, defaults to `application/json`

Returns

Description

NotebookCellOutputItem

A new output item object.

stderr(value: string): NotebookCellOutputItem

Factory function to create a `NotebookCellOutputItem` that uses uses the `application/vnd.code.notebook.stderr` mime type.

Parameter

Description

value: string

A string.

Returns

Description

NotebookCellOutputItem

A new output item object.

stdout(value: string): NotebookCellOutputItem

Factory function to create a `NotebookCellOutputItem` that uses uses the `application/vnd.code.notebook.stdout` mime type.

Parameter

Description

value: string

A string.

Returns

Description

NotebookCellOutputItem

A new output item object.

text(value: string, mime?: string): NotebookCellOutputItem

Factory function to create a `NotebookCellOutputItem` from a string.

_Note_ that an UTF-8 encoder is used to create bytes for the string.

Parameter

Description

value: string

A string.

mime?: string

Optional MIME type, defaults to `text/plain`.

Returns

Description

NotebookCellOutputItem

A new output item object.

#### Constructors

new NotebookCellOutputItem(data: Uint8Array, mime: string): NotebookCellOutputItem

Create a new notebook cell output item.

Parameter

Description

data: Uint8Array

The value of the output item.

mime: string

The mime type of the output item.

Returns

Description

NotebookCellOutputItem

#### Properties

data: Uint8Array

The data of this output item. Must always be an array of unsigned 8-bit integers.

mime: string

The mime type which determines how the data-property is interpreted.

Notebooks have built-in support for certain mime-types, extensions can add support for new types and override existing types.

### NotebookCellStatusBarAlignment

Represents the alignment of status bar items.

#### Enumeration Members

Left: 1

Aligned to the left side.

Right: 2

Aligned to the right side.

### NotebookCellStatusBarItem

A contribution to a cell's status bar

#### Constructors

new NotebookCellStatusBarItem(text: string, alignment: NotebookCellStatusBarAlignment): NotebookCellStatusBarItem

Creates a new NotebookCellStatusBarItem.

Parameter

Description

text: string

The text to show for the item.

alignment: NotebookCellStatusBarAlignment

Whether the item is aligned to the left or right.

Returns

Description

NotebookCellStatusBarItem

#### Properties

accessibilityInformation?: AccessibilityInformation

Accessibility information used when a screen reader interacts with this item.

alignment: NotebookCellStatusBarAlignment

Whether the item is aligned to the left or right.

command?: string | Command

An optional Command or identifier of a command to run on click.

The command must be known.

Note that if this is a Command object, only the command and arguments are used by the editor.

priority?: number

The priority of the item. A higher value item will be shown more to the left.

text: string

The text to show for the item.

tooltip?: string

A tooltip to show when the item is hovered.

### NotebookCellStatusBarItemProvider

A provider that can contribute items to the status bar that appears below a cell's editor.

#### Events

onDidChangeCellStatusBarItems?: Event<void>

An optional event to signal that statusbar items have changed. The provide method will be called again.

#### Methods

provideCellStatusBarItems(cell: NotebookCell, token: CancellationToken): ProviderResult<NotebookCellStatusBarItem | NotebookCellStatusBarItem[]>

The provider will be called when the cell scrolls into view, when its content, outputs, language, or metadata change, and when it changes execution state.

Parameter

Description

cell: NotebookCell

The cell for which to return items.

token: CancellationToken

A token triggered if this request should be cancelled.

Returns

Description

ProviderResult<NotebookCellStatusBarItem | NotebookCellStatusBarItem[]>

One or more cell statusbar items

### NotebookController

A notebook controller represents an entity that can execute notebook cells. This is often referred to as a kernel.

There can be multiple controllers and the editor will let users choose which controller to use for a certain notebook. The notebookType-property defines for what kind of notebooks a controller is for and the updateNotebookAffinity-function allows controllers to set a preference for specific notebook documents. When a controller has been selected its onDidChangeSelectedNotebooks-event fires.

When a cell is being run the editor will invoke the executeHandler and a controller is expected to create and finalize a notebook cell execution. However, controllers are also free to create executions by themselves.

#### Events

onDidChangeSelectedNotebooks: Event<{notebook: NotebookDocument, selected: boolean}>

An event that fires whenever a controller has been selected or un-selected for a notebook document.

There can be multiple controllers for a notebook and in that case a controllers needs to be _selected_. This is a user gesture and happens either explicitly or implicitly when interacting with a notebook for which a controller was _suggested_. When possible, the editor _suggests_ a controller that is most likely to be _selected_.

_Note_ that controller selection is persisted (by the controllers id) and restored as soon as a controller is re-created or as a notebook is opened.

#### Properties

description?: string

The human-readable description which is rendered less prominent.

detail?: string

The human-readable detail which is rendered less prominent.

executeHandler: (cells: NotebookCell[], notebook: NotebookDocument, controller: NotebookController) => void | Thenable<void>

The execute handler is invoked when the run gestures in the UI are selected, e.g Run Cell, Run All, Run Selection etc. The execute handler is responsible for creating and managing execution-objects.

Parameter

Description

cells: NotebookCell[]

notebook: NotebookDocument

controller: NotebookController

Returns

Description

void | Thenable<void>

id: string

The identifier of this notebook controller.

_Note_ that controllers are remembered by their identifier and that extensions should use stable identifiers across sessions.

interruptHandler?: (notebook: NotebookDocument) => void | Thenable<void>

Optional interrupt handler.

By default cell execution is canceled via tokens. Cancellation tokens require that a controller can keep track of its execution so that it can cancel a specific execution at a later point. Not all scenarios allow for that, eg. REPL-style controllers often work by interrupting whatever is currently running. For those cases the interrupt handler exists - it can be thought of as the equivalent of `SIGINT` or `Control+C` in terminals.

_Note_ that supporting cancellation tokens is preferred and that interrupt handlers should only be used when tokens cannot be supported.

Parameter

Description

notebook: NotebookDocument

Returns

Description

void | Thenable<void>

label: string

The human-readable label of this notebook controller.

notebookType: string

The notebook type this controller is for.

supportedLanguages?: string[]

An array of language identifiers that are supported by this controller. Any language identifier from getLanguages is possible. When falsy all languages are supported.

Samples:

```
// support JavaScript and TypeScript
myController.supportedLanguages = ['javascript', 'typescript'];

// support all languages
myController.supportedLanguages = undefined; // falsy
myController.supportedLanguages = []; // falsy
```

supportsExecutionOrder?: boolean

Whether this controller supports execution order so that the editor can render placeholders for them.

#### Methods

createNotebookCellExecution(cell: NotebookCell): NotebookCellExecution

Create a cell execution task.

_Note_ that there can only be one execution per cell at a time and that an error is thrown if a cell execution is created while another is still active.

This should be used in response to the execution handler being called or when cell execution has been started else, e.g when a cell was already executing or when cell execution was triggered from another source.

Parameter

Description

cell: NotebookCell

The notebook cell for which to create the execution.

Returns

Description

NotebookCellExecution

A notebook cell execution.

dispose(): void

Dispose and free associated resources.

Parameter

Description

Returns

Description

void

updateNotebookAffinity(notebook: NotebookDocument, affinity: NotebookControllerAffinity): void

A controller can set affinities for specific notebook documents. This allows a controller to be presented more prominent for some notebooks.

Parameter

Description

notebook: NotebookDocument

The notebook for which a priority is set.

affinity: NotebookControllerAffinity

A controller affinity

Returns

Description

void

### NotebookControllerAffinity

Notebook controller affinity for notebook documents.

_See also_ NotebookController.updateNotebookAffinity

#### Enumeration Members

Default: 1

Default affinity.

Preferred: 2

A controller is preferred for a notebook.

### NotebookData

Raw representation of a notebook.

Extensions are responsible for creating NotebookData so that the editor can create a NotebookDocument.

_See also_ NotebookSerializer

#### Constructors

new NotebookData(cells: NotebookCellData[]): NotebookData

Create new notebook data.

Parameter

Description

cells: NotebookCellData[]

An array of cell data.

Returns

Description

NotebookData

#### Properties

cells: NotebookCellData[]

The cell data of this notebook data.

metadata?:

Arbitrary metadata of notebook data.

### NotebookDocument

Represents a notebook which itself is a sequence of code or markup cells. Notebook documents are created from notebook data.

#### Properties

cellCount: number

The number of cells in the notebook.

isClosed: boolean

`true` if the notebook has been closed. A closed notebook isn't synchronized anymore and won't be re-used when the same resource is opened again.

isDirty: boolean

`true` if there are unpersisted changes.

isUntitled: boolean

Is this notebook representing an untitled file which has not been saved yet.

metadata:

Arbitrary metadata for this notebook. Can be anything but must be JSON-stringifyable.

notebookType: string

The type of notebook.

uri: Uri

The associated uri for this notebook.

_Note_ that most notebooks use the `file`-scheme, which means they are files on disk. However, **not** all notebooks are saved on disk and therefore the `scheme` must be checked before trying to access the underlying file or siblings on disk.

_See also_ FileSystemProvider

version: number

The version number of this notebook (it will strictly increase after each change, including undo/redo).

#### Methods

cellAt(index: number): NotebookCell

Return the cell at the specified index. The index will be adjusted to the notebook.

Parameter

Description

index: number

The index of the cell to retrieve.

Returns

Description

NotebookCell

A cell.

getCells(range?: NotebookRange): NotebookCell[]

Get the cells of this notebook. A subset can be retrieved by providing a range. The range will be adjusted to the notebook.

Parameter

Description

range?: NotebookRange

A notebook range.

Returns

Description

NotebookCell[]

The cells contained by the range or all cells.

save(): Thenable<boolean>

Save the document. The saving will be handled by the corresponding serializer.

Parameter

Description

Returns

Description

Thenable<boolean>

A promise that will resolve to true when the document has been saved. Will return false if the file was not dirty or when save failed.

### NotebookDocumentCellChange

Describes a change to a notebook cell.

_See also_ NotebookDocumentChangeEvent

#### Properties

cell: NotebookCell

The affected cell.

document: TextDocument

The document of the cell or `undefined` when it did not change.

_Note_ that you should use the onDidChangeTextDocument-event for detailed change information, like what edits have been performed.

executionSummary: NotebookCellExecutionSummary

The new execution summary of the cell or `undefined` when it did not change.

metadata:

The new metadata of the cell or `undefined` when it did not change.

outputs: readonly NotebookCellOutput[]

The new outputs of the cell or `undefined` when they did not change.

### NotebookDocumentChangeEvent

An event describing a transactional notebook change.

#### Properties

cellChanges: readonly NotebookDocumentCellChange[]

An array of cell changes.

contentChanges: readonly NotebookDocumentContentChange[]

An array of content changes describing added or removed cells.

metadata:

The new metadata of the notebook or `undefined` when it did not change.

notebook: NotebookDocument

The affected notebook.

### NotebookDocumentContentChange

Describes a structural change to a notebook document, e.g newly added and removed cells.

_See also_ NotebookDocumentChangeEvent

#### Properties

addedCells: readonly NotebookCell[]

Cells that have been added to the document.

range: NotebookRange

The range at which cells have been either added or removed.

Note that no cells have been removed when this range is empty.

removedCells: readonly NotebookCell[]

Cells that have been removed from the document.

### NotebookDocumentContentOptions

Notebook content options define what parts of a notebook are persisted. Note

For instance, a notebook serializer can opt-out of saving outputs and in that case the editor doesn't mark a notebooks as dirty when its output has changed.

#### Properties

transientCellMetadata?:

Controls if a cell metadata property change event will trigger notebook document content change events and if it will be used in the diff editor, defaults to false. If the content provider doesn't persist a metadata property in the file document, it should be set to true.

transientDocumentMetadata?:

Controls if a document metadata property change event will trigger notebook document content change event and if it will be used in the diff editor, defaults to false. If the content provider doesn't persist a metadata property in the file document, it should be set to true.

transientOutputs?: boolean

Controls if output change events will trigger notebook document content change events and if it will be used in the diff editor, defaults to false. If the content provider doesn't persist the outputs in the file document, this should be set to true.

### NotebookDocumentShowOptions

Represents options to configure the behavior of showing a notebook document in an notebook editor.

#### Properties

preserveFocus?: boolean

An optional flag that when `true` will stop the notebook editor from taking focus.

preview?: boolean

An optional flag that controls if an notebook editor-tab shows as preview. Preview tabs will be replaced and reused until set to stay - either explicitly or through editing. The default behaviour depends on the `workbench.editor.enablePreview`-setting.

selections?: readonly NotebookRange[]

An optional selection to apply for the document in the notebook editor.

viewColumn?: ViewColumn

An optional view column in which the notebook editor should be shown. The default is the active. Columns that do not exist will be created as needed up to the maximum of ViewColumn.Nine. Use ViewColumn.Beside to open the editor to the side of the currently active one.

### NotebookDocumentWillSaveEvent

An event that is fired when a notebook document will be saved.

To make modifications to the document before it is being saved, call the waitUntil-function with a thenable that resolves to a workspace edit.

#### Properties

notebook: NotebookDocument

The notebook document that will be saved.

reason: TextDocumentSaveReason

The reason why save was triggered.

token: CancellationToken

A cancellation token.

#### Methods

waitUntil(thenable: Thenable<WorkspaceEdit>): void

Allows to pause the event loop and to apply workspace edit. Edits of subsequent calls to this function will be applied in order. The edits will be _ignored_ if concurrent modifications of the notebook document happened.

_Note:_ This function can only be called during event dispatch and not in an asynchronous manner:

```
workspace.onWillSaveNotebookDocument(event => {
  // async, will *throw* an error
  setTimeout(() => event.waitUntil(promise));

  // sync, OK
  event.waitUntil(promise);
});
```

Parameter

Description

thenable: Thenable<WorkspaceEdit>

A thenable that resolves to workspace edit.

Returns

Description

void

waitUntil(thenable: Thenable<any>): void

Allows to pause the event loop until the provided thenable resolved.

_Note:_ This function can only be called during event dispatch.

Parameter

Description

thenable: Thenable<any>

A thenable that delays saving.

Returns

Description

void

### NotebookEdit

A notebook edit represents edits that should be applied to the contents of a notebook.

#### Static

deleteCells(range: NotebookRange): NotebookEdit

Utility to create an edit that deletes cells in a notebook.

Parameter

Description

range: NotebookRange

The range of cells to delete.

Returns

Description

NotebookEdit

insertCells(index: number, newCells: NotebookCellData[]): NotebookEdit

Utility to create an edit that replaces cells in a notebook.

Parameter

Description

index: number

The index to insert cells at.

newCells: NotebookCellData[]

The new notebook cells.

Returns

Description

NotebookEdit

replaceCells(range: NotebookRange, newCells: NotebookCellData[]): NotebookEdit

Utility to create a edit that replaces cells in a notebook.

Parameter

Description

range: NotebookRange

The range of cells to replace

newCells: NotebookCellData[]

The new notebook cells.

Returns

Description

NotebookEdit

updateCellMetadata(index: number, newCellMetadata: ): NotebookEdit

Utility to create an edit that update a cell's metadata.

Parameter

Description

index: number

The index of the cell to update.

newCellMetadata:

The new metadata for the cell.

Returns

Description

NotebookEdit

updateNotebookMetadata(newNotebookMetadata: ): NotebookEdit

Utility to create an edit that updates the notebook's metadata.

Parameter

Description

newNotebookMetadata:

The new metadata for the notebook.

Returns

Description

NotebookEdit

#### Constructors

new NotebookEdit(range: NotebookRange, newCells: NotebookCellData[]): NotebookEdit

Create a new notebook edit.

Parameter

Description

range: NotebookRange

A notebook range.

newCells: NotebookCellData[]

An array of new cell data.

Returns

Description

NotebookEdit

#### Properties

newCellMetadata?:

Optional new metadata for the cells.

newCells: NotebookCellData[]

New cells being inserted. May be empty.

newNotebookMetadata?:

Optional new metadata for the notebook.

range: NotebookRange

Range of the cells being edited. May be empty.

### NotebookEditor

Represents a notebook editor that is attached to a notebook. Additional properties of the NotebookEditor are available in the proposed API, which will be finalized later.

#### Properties

notebook: NotebookDocument

The notebook document associated with this notebook editor.

selection: NotebookRange

The primary selection in this notebook editor.

selections: readonly NotebookRange[]

All selections in this notebook editor.

The primary selection (or focused range) is `selections[0]`. When the document has no cells, the primary selection is empty `{ start: 0, end: 0 }`;

viewColumn?: ViewColumn

The column in which this editor shows.

visibleRanges: readonly NotebookRange[]

The current visible ranges in the editor (vertically).

#### Methods

revealRange(range: NotebookRange, revealType?: NotebookEditorRevealType): void

Scroll as indicated by `revealType` in order to reveal the given range.

Parameter

Description

range: NotebookRange

A range.

revealType?: NotebookEditorRevealType

The scrolling strategy for revealing `range`.

Returns

Description

void

### NotebookEditorRevealType

Represents a notebook editor that is attached to a notebook.

#### Enumeration Members

Default: 0

The range will be revealed with as little scrolling as possible.

InCenter: 1

The range will always be revealed in the center of the viewport.

InCenterIfOutsideViewport: 2

If the range is outside the viewport, it will be revealed in the center of the viewport. Otherwise, it will be revealed with as little scrolling as possible.

AtTop: 3

The range will always be revealed at the top of the viewport.

### NotebookEditorSelectionChangeEvent

Represents an event describing the change in a notebook editor's selections.

#### Properties

notebookEditor: NotebookEditor

The notebook editor for which the selections have changed.

selections: readonly NotebookRange[]

The new value for the notebook editor's selections.

### NotebookEditorVisibleRangesChangeEvent

Represents an event describing the change in a notebook editor's visibleRanges.

#### Properties

notebookEditor: NotebookEditor

The notebook editor for which the visible ranges have changed.

visibleRanges: readonly NotebookRange[]

The new value for the notebook editor's visibleRanges.

### NotebookRange

A notebook range represents an ordered pair of two cell indices. It is guaranteed that start is less than or equal to end.

#### Constructors

new NotebookRange(start: number, end: number): NotebookRange

Create a new notebook range. If `start` is not before or equal to `end`, the values will be swapped.

Parameter

Description

start: number

start index

end: number

end index.

Returns

Description

NotebookRange

#### Properties

end: number

The exclusive end index of this range (zero-based).

isEmpty: boolean

`true` if `start` and `end` are equal.

start: number

The zero-based start index of this range.

#### Methods

with(change: {end: number, start: number}): NotebookRange

Derive a new range for this range.

Parameter

Description

change: {end: number, start: number}

An object that describes a change to this range.

Returns

Description

NotebookRange

A range that reflects the given change. Will return `this` range if the change is not changing anything.

### NotebookRendererMessaging

Renderer messaging is used to communicate with a single renderer. It's returned from notebooks.createRendererMessaging.

#### Events

onDidReceiveMessage: Event<{editor: NotebookEditor, message: any}>

An event that fires when a message is received from a renderer.

#### Methods

postMessage(message: any, editor?: NotebookEditor): Thenable<boolean>

Send a message to one or all renderer.

Parameter

Description

message: any

Message to send

editor?: NotebookEditor

Editor to target with the message. If not provided, the message is sent to all renderers.

Returns

Description

Thenable<boolean>

a boolean indicating whether the message was successfully delivered to any renderer.

### NotebookSerializer

The notebook serializer enables the editor to open notebook files.

At its core the editor only knows a notebook data structure but not how that data structure is written to a file, nor how it is read from a file. The notebook serializer bridges this gap by deserializing bytes into notebook data and vice versa.

#### Methods

deserializeNotebook(content: Uint8Array, token: CancellationToken): NotebookData | Thenable<NotebookData>

Deserialize contents of a notebook file into the notebook data structure.

Parameter

Description

content: Uint8Array

Contents of a notebook file.

token: CancellationToken

A cancellation token.

Returns

Description

NotebookData | Thenable<NotebookData>

Notebook data or a thenable that resolves to such.

serializeNotebook(data: NotebookData, token: CancellationToken): Uint8Array | Thenable<Uint8Array>

Serialize notebook data into file contents.

Parameter

Description

data: NotebookData

A notebook data structure.

token: CancellationToken

A cancellation token.

Returns

Description

Uint8Array | Thenable<Uint8Array>

An array of bytes or a thenable that resolves to such.

### OnEnterRule

Describes a rule to be evaluated when pressing Enter.

#### Properties

action: EnterAction

The action to execute.

afterText?: RegExp

This rule will only execute if the text after the cursor matches this regular expression.

beforeText: RegExp

This rule will only execute if the text before the cursor matches this regular expression.

previousLineText?: RegExp

This rule will only execute if the text above the current line matches this regular expression.

### OnTypeFormattingEditProvider

The document formatting provider interface defines the contract between extensions and the formatting-feature.

#### Methods

provideOnTypeFormattingEdits(document: TextDocument, position: Position, ch: string, options: FormattingOptions, token: CancellationToken): ProviderResult<TextEdit[]>

Provide formatting edits after a character has been typed.

The given position and character should hint to the provider what range the position to expand to, like find the matching `{` when `}` has been entered.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

ch: string

The character that has been typed.

options: FormattingOptions

Options controlling formatting.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<TextEdit[]>

A set of text edits or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

### OpenDialogOptions

Options to configure the behavior of a file open dialog.

*   Note 1: On Windows and Linux, a file dialog cannot be both a file selector and a folder selector, so if you set both `canSelectFiles` and `canSelectFolders` to `true` on these platforms, a folder selector will be shown.
*   Note 2: Explicitly setting `canSelectFiles` and `canSelectFolders` to `false` is futile and the editor then silently adjusts the options to select files.

#### Properties

canSelectFiles?: boolean

Allow to select files, defaults to `true`.

canSelectFolders?: boolean

Allow to select folders, defaults to `false`.

canSelectMany?: boolean

Allow to select many files or folders.

defaultUri?: Uri

The resource the dialog shows when opened.

filters?:

A set of file filters that are used by the dialog. Each entry is a human-readable label, like "TypeScript", and an array of extensions, for example:

```
{
    'Images': ['png', 'jpg'],
    'TypeScript': ['ts', 'tsx']
}
```

openLabel?: string

A human-readable string for the open button.

title?: string

Dialog title.

This parameter might be ignored, as not all operating systems display a title on open dialogs (for example, macOS).

### OutputChannel

An output channel is a container for readonly textual information.

To get an instance of an `OutputChannel` use createOutputChannel.

#### Properties

name: string

The human-readable name of this output channel.

#### Methods

append(value: string): void

Append the given value to the channel.

Parameter

Description

value: string

A string, falsy values will not be printed.

Returns

Description

void

appendLine(value: string): void

Append the given value and a line feed character to the channel.

Parameter

Description

value: string

A string, falsy values will be printed.

Returns

Description

void

clear(): void

Removes all output from the channel.

Parameter

Description

Returns

Description

void

dispose(): void

Dispose and free associated resources.

Parameter

Description

Returns

Description

void

hide(): void

Hide this channel from the UI.

Parameter

Description

Returns

Description

void

replace(value: string): void

Replaces all output from the channel with the given value.

Parameter

Description

value: string

A string, falsy values will not be printed.

Returns

Description

void

show(preserveFocus?: boolean): void

Reveal this channel in the UI.

Parameter

Description

preserveFocus?: boolean

When `true` the channel will not take focus.

Returns

Description

void

show(column?: ViewColumn, preserveFocus?: boolean): void

Reveal this channel in the UI.

*   _deprecated_ - Use the overload with just one parameter (`show(preserveFocus?: boolean): void`).

Parameter

Description

column?: ViewColumn

This argument is **deprecated** and will be ignored.

preserveFocus?: boolean

When `true` the channel will not take focus.

Returns

Description

void

### OverviewRulerLane

Represents different positions for rendering a decoration in an overview ruler. The overview ruler supports three lanes.

#### Enumeration Members

Left: 1

The left lane of the overview ruler.

Center: 2

The center lane of the overview ruler.

Right: 4

The right lane of the overview ruler.

Full: 7

All lanes of the overview ruler.

### ParameterInformation

Represents a parameter of a callable-signature. A parameter can have a label and a doc-comment.

#### Constructors

new ParameterInformation(label: string | [number, number], documentation?: string | MarkdownString): ParameterInformation

Creates a new parameter information object.

Parameter

Description

label: string | [number, number]

A label string or inclusive start and exclusive end offsets within its containing signature label.

documentation?: string | MarkdownString

A doc string.

Returns

Description

ParameterInformation

#### Properties

documentation?: string | MarkdownString

The human-readable doc-comment of this signature. Will be shown in the UI but can be omitted.

label: string | [number, number]

The label of this signature.

Either a string or inclusive start and exclusive end offsets within its containing signature label. _Note_: A label of type string must be a substring of its containing signature information's label.

### Position

Represents a line and character position, such as the position of the cursor.

Position objects are **immutable**. Use the with or translate methods to derive new positions from an existing position.

#### Constructors

new Position(line: number, character: number): Position

Parameter

Description

line: number

A zero-based line value.

character: number

A zero-based character value.

Returns

Description

Position

#### Properties

character: number

The zero-based character value.

Character offsets are expressed using UTF-16 code units.

line: number

The zero-based line value.

#### Methods

compareTo(other: Position): number

Compare this to `other`.

Parameter

Description

other: Position

A position.

Returns

Description

number

A number smaller than zero if this position is before the given position, a number greater than zero if this position is after the given position, or zero when this and the given position are equal.

isAfter(other: Position): boolean

Check if this position is after `other`.

Parameter

Description

other: Position

A position.

Returns

Description

boolean

`true` if position is on a greater line or on the same line on a greater character.

isAfterOrEqual(other: Position): boolean

Check if this position is after or equal to `other`.

Parameter

Description

other: Position

A position.

Returns

Description

boolean

`true` if position is on a greater line or on the same line on a greater or equal character.

isBefore(other: Position): boolean

Check if this position is before `other`.

Parameter

Description

other: Position

A position.

Returns

Description

boolean

`true` if position is on a smaller line or on the same line on a smaller character.

isBeforeOrEqual(other: Position): boolean

Check if this position is before or equal to `other`.

Parameter

Description

other: Position

A position.

Returns

Description

boolean

`true` if position is on a smaller line or on the same line on a smaller or equal character.

isEqual(other: Position): boolean

Check if this position is equal to `other`.

Parameter

Description

other: Position

A position.

Returns

Description

boolean

`true` if the line and character of the given position are equal to the line and character of this position.

translate(lineDelta?: number, characterDelta?: number): Position

Create a new position relative to this position.

Parameter

Description

lineDelta?: number

Delta value for the line value, default is `0`.

characterDelta?: number

Delta value for the character value, default is `0`.

Returns

Description

Position

A position which line and character is the sum of the current line and character and the corresponding deltas.

translate(change: {characterDelta: number, lineDelta: number}): Position

Derived a new position relative to this position.

Parameter

Description

change: {characterDelta: number, lineDelta: number}

An object that describes a delta to this position.

Returns

Description

Position

A position that reflects the given delta. Will return `this` position if the change is not changing anything.

with(line?: number, character?: number): Position

Create a new position derived from this position.

Parameter

Description

line?: number

Value that should be used as line value, default is the existing value

character?: number

Value that should be used as character value, default is the existing value

Returns

Description

Position

A position where line and character are replaced by the given values.

with(change: {character: number, line: number}): Position

Derived a new position from this position.

Parameter

Description

change: {character: number, line: number}

An object that describes a change to this position.

Returns

Description

Position

A position that reflects the given change. Will return `this` position if the change is not changing anything.

### PreparedToolInvocation

The result of a call to LanguageModelTool.prepareInvocation.

#### Properties

confirmationMessages?: LanguageModelToolConfirmationMessages

The presence of this property indicates that the user should be asked to confirm before running the tool. The user should be asked for confirmation for any tool that has a side-effect or may potentially be dangerous.

invocationMessage?: string | MarkdownString

A customized progress message to show while the tool runs.

### PrepareLanguageModelChatModelOptions

The list of options passed into LanguageModelChatProvider.provideLanguageModelChatInformation

#### Properties

silent: boolean

Whether or not the user should be prompted via some UI flow, or if models should be attempted to be resolved silently. If silent is true, all models may not be resolved due to lack of info such as API keys.

### ProcessExecution

The execution of a task happens as an external process without shell interaction.

#### Constructors

new ProcessExecution(process: string, options?: ProcessExecutionOptions): ProcessExecution

Creates a process execution.

Parameter

Description

process: string

The process to start.

options?: ProcessExecutionOptions

Optional options for the started process.

Returns

Description

ProcessExecution

new ProcessExecution(process: string, args: string[], options?: ProcessExecutionOptions): ProcessExecution

Creates a process execution.

Parameter

Description

process: string

The process to start.

args: string[]

Arguments to be passed to the process.

options?: ProcessExecutionOptions

Optional options for the started process.

Returns

Description

ProcessExecution

#### Properties

args: string[]

The arguments passed to the process. Defaults to an empty array.

options?: ProcessExecutionOptions

The process options used when the process is executed. Defaults to undefined.

process: string

The process to be executed.

### ProcessExecutionOptions

Options for a process execution

#### Properties

cwd?: string

The current working directory of the executed program or shell. If omitted the tools current workspace root is used.

env?:

The additional environment of the executed program or shell. If omitted the parent process' environment is used. If provided it is merged with the parent process' environment.

### Progress<T>

Defines a generalized way of reporting progress updates.

#### Methods

report(value: T): void

Report a progress update.

Parameter

Description

value: T

A progress item, like a message and/or an report on how much work finished

Returns

Description

void

### ProgressLocation

A location in the editor at which progress information can be shown. It depends on the location how progress is visually represented.

#### Enumeration Members

SourceControl: 1

Show progress for the source control viewlet, as overlay for the icon and as progress bar inside the viewlet (when visible). Neither supports cancellation nor discrete progress nor a label to describe the operation.

Window: 10

Show progress in the status bar of the editor. Neither supports cancellation nor discrete progress. Supports rendering of theme icons via the `$(<name>)`-syntax in the progress label.

Notification: 15

Show progress as notification with an optional cancel button. Supports to show infinite and discrete progress but does not support rendering of icons.

### ProgressOptions

Value-object describing where and how progress should show.

#### Properties

cancellable?: boolean

Controls if a cancel button should show to allow the user to cancel the long running operation. Note that currently only `ProgressLocation.Notification` is supporting to show a cancel button.

location: ProgressLocation | {viewId: string}

The location at which progress should show.

title?: string

A human-readable string which will be used to describe the operation.

### ProvideLanguageModelChatResponseOptions

The provider version of LanguageModelChatRequestOptions

#### Properties

modelOptions?:

A set of options that control the behavior of the language model. These options are specific to the language model.

toolMode: LanguageModelChatToolMode

The tool-selecting mode to use. The provider must implement respecting this.

tools?: readonly LanguageModelChatTool[]

An optional list of tools that are available to the language model. These could be registered tools available via lm.tools, or private tools that are just implemented within the calling extension.

If the LLM requests to call one of these tools, it will return a LanguageModelToolCallPart in LanguageModelChatResponse.stream. It's the caller's responsibility to invoke the tool. If it's a tool registered in lm.tools, that means calling lm.invokeTool.

Then, the tool result can be provided to the LLM by creating an Assistant-type LanguageModelChatMessage with a LanguageModelToolCallPart, followed by a User-type message with a LanguageModelToolResultPart.

### ProviderResult<T>

A provider result represents the values a provider, like the HoverProvider, may return. For once this is the actual result type `T`, like `Hover`, or a thenable that resolves to that type `T`. In addition, `null` and `undefined` can be returned - either directly or from a thenable.

The snippets below are all valid implementations of the HoverProvider:

```
let a: HoverProvider = {
  provideHover(doc, pos, token): ProviderResult<Hover> {
    return new Hover('Hello World');
  }
};

let b: HoverProvider = {
  provideHover(doc, pos, token): ProviderResult<Hover> {
    return new Promise(resolve => {
      resolve(new Hover('Hello World'));
    });
  }
};

let c: HoverProvider = {
  provideHover(doc, pos, token): ProviderResult<Hover> {
    return; // undefined
  }
};
```

ProviderResult: T | undefined | null | Thenable<T | undefined | null>

### Pseudoterminal

Defines the interface of a terminal pty, enabling extensions to control a terminal.

#### Events

onDidChangeName?: Event<string>

An event that when fired allows changing the name of the terminal.

Events fired before Pseudoterminal.open is called will be be ignored.

**Example:** Change the terminal name to "My new terminal".

```
const writeEmitter = new vscode.EventEmitter<string>();
const changeNameEmitter = new vscode.EventEmitter<string>();
const pty: vscode.Pseudoterminal = {
  onDidWrite: writeEmitter.event,
  onDidChangeName: changeNameEmitter.event,
  open: () => changeNameEmitter.fire('My new terminal'),
  close: () => {}
};
vscode.window.createTerminal({ name: 'My terminal', pty });
```

onDidClose?: Event<number | void>

An event that when fired will signal that the pty is closed and dispose of the terminal.

Events fired before Pseudoterminal.open is called will be be ignored.

A number can be used to provide an exit code for the terminal. Exit codes must be positive and a non-zero exit codes signals failure which shows a notification for a regular terminal and allows dependent tasks to proceed when used with the `CustomExecution` API.

**Example:** Exit the terminal when "y" is pressed, otherwise show a notification.

```
const writeEmitter = new vscode.EventEmitter<string>();
const closeEmitter = new vscode.EventEmitter<void>();
const pty: vscode.Pseudoterminal = {
  onDidWrite: writeEmitter.event,
  onDidClose: closeEmitter.event,
  open: () => writeEmitter.fire('Press y to exit successfully'),
  close: () => {},
  handleInput: data => {
    if (data !== 'y') {
      vscode.window.showInformationMessage('Something went wrong');
    }
    closeEmitter.fire();
  }
};
const terminal = vscode.window.createTerminal({ name: 'Exit example', pty });
terminal.show(true);
```

onDidOverrideDimensions?: Event<TerminalDimensions>

An event that when fired allows overriding the dimensions of the terminal. Note that when set, the overridden dimensions will only take effect when they are lower than the actual dimensions of the terminal (ie. there will never be a scroll bar). Set to `undefined` for the terminal to go back to the regular dimensions (fit to the size of the panel).

Events fired before Pseudoterminal.open is called will be be ignored.

**Example:** Override the dimensions of a terminal to 20 columns and 10 rows

```
const dimensionsEmitter = new vscode.EventEmitter<vscode.TerminalDimensions>();
const pty: vscode.Pseudoterminal = {
  onDidWrite: writeEmitter.event,
  onDidOverrideDimensions: dimensionsEmitter.event,
  open: () => {
    dimensionsEmitter.fire({
      columns: 20,
      rows: 10
    });
  },
  close: () => {}
};
vscode.window.createTerminal({ name: 'My terminal', pty });
```

onDidWrite: Event<string>

An event that when fired will write data to the terminal. Unlike Terminal.sendText which sends text to the underlying child pseudo-device (the child), this will write the text to parent pseudo-device (the _terminal_ itself).

Note writing `\n` will just move the cursor down 1 row, you need to write `\r` as well to move the cursor to the left-most cell.

Events fired before Pseudoterminal.open is called will be be ignored.

**Example:** Write red text to the terminal

```
const writeEmitter = new vscode.EventEmitter<string>();
const pty: vscode.Pseudoterminal = {
  onDidWrite: writeEmitter.event,
  open: () => writeEmitter.fire('\x1b[31mHello world\x1b[0m'),
  close: () => {}
};
vscode.window.createTerminal({ name: 'My terminal', pty });
```

**Example:** Move the cursor to the 10th row and 20th column and write an asterisk

```
writeEmitter.fire('\x1b[10;20H*');
```

#### Methods

close(): void

Implement to handle when the terminal is closed by an act of the user.

Parameter

Description

Returns

Description

void

handleInput(data: string): void

Implement to handle incoming keystrokes in the terminal or when an extension calls Terminal.sendText. `data` contains the keystrokes/text serialized into their corresponding VT sequence representation.

Parameter

Description

data: string

The incoming data.

**Example:** Echo input in the terminal. The sequence for enter (`\r`) is translated to CRLF to go to a new line and move the cursor to the start of the line.

```
const writeEmitter = new vscode.EventEmitter<string>();
const pty: vscode.Pseudoterminal = {
  onDidWrite: writeEmitter.event,
  open: () => {},
  close: () => {},
  handleInput: data => writeEmitter.fire(data === '\r' ? '\r\n' : data)
};
vscode.window.createTerminal({ name: 'Local echo', pty });
```

Returns

Description

void

open(initialDimensions: TerminalDimensions): void

Implement to handle when the pty is open and ready to start firing events.

Parameter

Description

initialDimensions: TerminalDimensions

The dimensions of the terminal, this will be undefined if the terminal panel has not been opened before this is called.

Returns

Description

void

setDimensions(dimensions: TerminalDimensions): void

Implement to handle when the number of rows and columns that fit into the terminal panel changes, for example when font size changes or when the panel is resized. The initial state of a terminal's dimensions should be treated as `undefined` until this is triggered as the size of a terminal isn't known until it shows up in the user interface.

When dimensions are overridden by onDidOverrideDimensions, `setDimensions` will continue to be called with the regular panel dimensions, allowing the extension continue to react dimension changes.

Parameter

Description

dimensions: TerminalDimensions

The new dimensions.

Returns

Description

void

### QuickDiffProvider

A quick diff provider provides a uri to the original state of a modified resource. The editor will use this information to render ad'hoc diffs within the text.

#### Methods

provideOriginalResource(uri: Uri, token: CancellationToken): ProviderResult<Uri>

Provide a Uri to the original resource of any given resource uri.

Parameter

Description

uri: Uri

The uri of the resource open in a text editor.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<Uri>

A thenable that resolves to uri of the matching original resource.

### QuickInput

The base interface for all quick input types.

Quick input provides a unified way for extensions to interact with users through simple UI elements. A quick input UI is initially not visible. After configuring it through its properties the extension can make it visible by calling show.

There are several reasons why this UI might have to be hidden and the extension will be notified through onDidHide. Examples include: an explicit call to hide, the user pressing Esc, some other input UI opening, etc.

A user pressing Enter or some other gesture implying acceptance of the current state does not automatically hide this UI component. It is up to the extension to decide whether to accept the user's input and if the UI should indeed be hidden through a call to hide.

When the extension no longer needs this input UI, it should dispose it to allow for freeing up any resources associated with it.

See QuickPick and InputBox for concrete UIs.

#### Events

onDidHide: Event<void>

An event signaling when this input UI is hidden.

There are several reasons why this UI might have to be hidden and the extension will be notified through onDidHide. Examples include: an explicit call to hide, the user pressing Esc, some other input UI opening, etc.

#### Properties

busy: boolean

Determines if the UI should show a progress indicator. Defaults to `false`.

Change this to `true`, for example, while loading more data or validating user input.

enabled: boolean

Determines if the UI should allow for user input. Defaults to `true`.

Change this to `false`, for example, while validating user input or loading data for the next step in user input.

ignoreFocusOut: boolean

Determines if the UI should stay open even when losing UI focus. Defaults to `false`. This setting is ignored on iPad and is always `false`.

step: number

An optional current step count for multi-step input flows.

title: string

An optional title for the input UI.

totalSteps: number

An optional total step count for multi-step input flows.

#### Methods

dispose(): void

Dispose of this input UI and any associated resources.

If it is still visible, it is first hidden. After this call the input UI is no longer functional and no additional methods or properties on it should be accessed. Instead a new input UI should be created.

Parameter

Description

Returns

Description

void

hide(): void

Hides this input UI.

This will also fire an onDidHide event.

Parameter

Description

Returns

Description

void

show(): void

Makes the input UI visible in its current configuration.

Any other input UI will first fire an onDidHide event.

Parameter

Description

Returns

Description

void

### QuickInputButton

A button for an action in a QuickPick or InputBox.

#### Properties

iconPath: IconPath

The icon for the button.

location?: QuickInputButtonLocation

The location where the button should be rendered.

Defaults to QuickInputButtonLocation.Title.

**Note:** This property is ignored if the button was added to a QuickPickItem.

toggle?: {checked: boolean}

When present, indicates that the button is a toggle button that can be checked or unchecked.

Parameter

Description

checked: boolean

Indicates whether the toggle button is currently checked. This property will be updated when the button is toggled.

tooltip?: string

An optional tooltip displayed when hovering over the button.

### QuickInputButtonLocation

Specifies the location where a QuickInputButton should be rendered.

#### Enumeration Members

Title: 1

The button is rendered in the title bar.

Inline: 2

The button is rendered inline to the right of the input box.

Input: 3

The button is rendered at the far end inside the input box.

### QuickInputButtons

Predefined buttons for QuickPick and InputBox.

#### Static

Back: QuickInputButton

A predefined back button for QuickPick and InputBox.

This button should be used for consistency when a navigation back button is needed. It comes with a predefined icon, tooltip, and location.

### QuickPick<T>

A concrete QuickInput to let the user pick an item from a list of items of type `T`.

The items can be filtered through a filter text field and there is an option canSelectMany to allow for selecting multiple items.

Note that in many cases the more convenient window.showQuickPick is easier to use. window.createQuickPick should be used when window.showQuickPick does not offer the required flexibility.

#### Events

onDidAccept: Event<void>

An event signaling when the user indicated acceptance of the selected item(s).

onDidChangeActive: Event<readonly T[]>

An event signaling when the active items have changed.

onDidChangeSelection: Event<readonly T[]>

An event signaling when the selected items have changed.

onDidChangeValue: Event<string>

An event signaling when the value of the filter text has changed.

onDidHide: Event<void>

An event signaling when this input UI is hidden.

There are several reasons why this UI might have to be hidden and the extension will be notified through onDidHide. Examples include: an explicit call to hide, the user pressing Esc, some other input UI opening, etc.

onDidTriggerButton: Event<QuickInputButton>

An event signaling when a button was triggered.

This event fires for buttons stored in the buttons array. This event does not fire for buttons on a QuickPickItem.

onDidTriggerItemButton: Event<QuickPickItemButtonEvent<T>>

An event signaling when a button in a particular QuickPickItem was triggered.

This event does not fire for buttons in the title bar which are part of buttons.

#### Properties

activeItems: readonly T[]

Active items. This can be read and updated by the extension.

busy: boolean

Determines if the UI should show a progress indicator. Defaults to `false`.

Change this to `true`, for example, while loading more data or validating user input.

buttons: readonly QuickInputButton[]

Buttons for actions in the UI.

canSelectMany: boolean

Determines if multiple items can be selected at the same time. Defaults to `false`.

enabled: boolean

Determines if the UI should allow for user input. Defaults to `true`.

Change this to `false`, for example, while validating user input or loading data for the next step in user input.

ignoreFocusOut: boolean

Determines if the UI should stay open even when losing UI focus. Defaults to `false`. This setting is ignored on iPad and is always `false`.

items: readonly T[]

Items to pick from. This can be read and updated by the extension.

keepScrollPosition?: boolean

Determines if the scroll position is maintained when the quick pick items are updated. Defaults to `false`.

matchOnDescription: boolean

Determines if the filter text should also be matched against the description of the items. Defaults to `false`.

matchOnDetail: boolean

Determines if the filter text should also be matched against the detail of the items. Defaults to `false`.

placeholder: string

Optional placeholder text displayed in the filter text box when no value has been entered.

prompt: string

Optional text that provides instructions or context to the user.

The prompt is displayed below the input box and above the list of items.

selectedItems: readonly T[]

Selected items. This can be read and updated by the extension.

step: number

An optional current step count for multi-step input flows.

title: string

An optional title for the input UI.

totalSteps: number

An optional total step count for multi-step input flows.

value: string

The current value of the filter text.

#### Methods

dispose(): void

Dispose of this input UI and any associated resources.

If it is still visible, it is first hidden. After this call the input UI is no longer functional and no additional methods or properties on it should be accessed. Instead a new input UI should be created.

Parameter

Description

Returns

Description

void

hide(): void

Hides this input UI.

This will also fire an onDidHide event.

Parameter

Description

Returns

Description

void

show(): void

Makes the input UI visible in its current configuration.

Any other input UI will first fire an onDidHide event.

Parameter

Description

Returns

Description

void

### QuickPickItem

Represents an item that can be selected from a list of items.

#### Properties

alwaysShow?: boolean

Determines if this item is always shown, even when filtered out by the user's input.

**Note:** This property is ignored when kind is set to QuickPickItemKind.Separator.

buttons?: readonly QuickInputButton[]

Optional buttons that will be rendered on this particular item.

These buttons will trigger an QuickPickItemButtonEvent when pressed. Buttons are only rendered when using a quick pick created by the createQuickPick API. Buttons are not rendered when using the showQuickPick API.

**Note:** This property is ignored when kind is set to QuickPickItemKind.Separator.

description?: string

A human-readable string which is rendered less prominently in the same line.

Supports rendering of theme icons via the `$(<name>)`-syntax.

**Note:** This property is ignored when kind is set to QuickPickItemKind.Separator.

detail?: string

A human-readable string which is rendered less prominently in a separate line.

Supports rendering of theme icons via the `$(<name>)`-syntax.

**Note:** This property is ignored when kind is set to QuickPickItemKind.Separator.

iconPath?: IconPath

The icon for the item.

kind?: QuickPickItemKind

The kind of this item that determines how it is rendered in the quick pick.

When not specified, the default is QuickPickItemKind.Default.

label: string

A human-readable string which is rendered prominently.

Supports rendering of theme icons via the `$(<name>)`-syntax.

**Note:** When kind is set to QuickPickItemKind.Default (so a regular item instead of a separator), it supports rendering of theme icons via the `$(<name>)`-syntax.

picked?: boolean

Optional flag indicating if this item is initially selected.

This is only honored when using the showQuickPick API. To do the same thing with the createQuickPick API, simply set the selectedItems to the items you want selected initially.

**Note:** This is only honored when the picker allows multiple selections.

_See also_ QuickPickOptions.canPickMany

**Note:** This property is ignored when kind is set to QuickPickItemKind.Separator.

resourceUri?: Uri

A Uri representing the resource associated with this item.

When set, this property is used to automatically derive several item properties if they are not explicitly provided:

*   **Label**: Derived from the resource's file name when label is not provided or is empty.
*   **Description**: Derived from the resource's path when description is not provided or is empty.
*   **Icon**: Derived from the current file icon theme when iconPath is set to ThemeIcon.File or ThemeIcon.Folder.

### QuickPickItemButtonEvent<T>

An event describing a button that was pressed on a QuickPickItem.

#### Properties

button: QuickInputButton

The button that was pressed.

item: T

The item that the button belongs to.

### QuickPickItemKind

Defines the kind of quick pick item.

#### Enumeration Members

Separator: -1

A separator item that provides a visual grouping.

When a QuickPickItem has a kind of Separator, the item is just a visual separator and does not represent a selectable item. The only property that applies is label. All other properties on QuickPickItem will be ignored and have no effect.

Default: 0

The default kind for an item that can be selected in the quick pick.

### QuickPickOptions

Options to configure the behavior of the quick pick UI.

#### Events

onDidSelectItem(item: string | QuickPickItem): any

An optional function that is invoked whenever an item is selected.

Parameter

Description

item: string | QuickPickItem

Returns

Description

any

#### Properties

canPickMany?: boolean

Determines if the picker allows multiple selections. When `true`, the result is an array of picks.

ignoreFocusOut?: boolean

Set to `true` to keep the picker open when focus moves to another part of the editor or to another window. This setting is ignored on iPad and is always `false`.

matchOnDescription?: boolean

Determines if the description should be included when filtering items. Defaults to `false`.

matchOnDetail?: boolean

Determines if the detail should be included when filtering items. Defaults to `false`.

placeHolder?: string

An optional string to show as placeholder in the input box to guide the user.

prompt?: string

Optional text that provides instructions or context to the user.

The prompt is displayed below the input box and above the list of items.

title?: string

An optional title for the quick pick.

### Range

A range represents an ordered pair of two positions. It is guaranteed that start.isBeforeOrEqual(end)

Range objects are **immutable**. Use the with, intersection, or union methods to derive new ranges from an existing range.

#### Constructors

new Range(start: Position, end: Position): Range

Create a new range from two positions. If `start` is not before or equal to `end`, the values will be swapped.

Parameter

Description

start: Position

A position.

end: Position

A position.

Returns

Description

Range

new Range(startLine: number, startCharacter: number, endLine: number, endCharacter: number): Range

Create a new range from number coordinates. It is a shorter equivalent of using `new Range(new Position(startLine, startCharacter), new Position(endLine, endCharacter))`

Parameter

Description

startLine: number

A zero-based line value.

startCharacter: number

A zero-based character value.

endLine: number

A zero-based line value.

endCharacter: number

A zero-based character value.

Returns

Description

Range

#### Properties

end: Position

The end position. It is after or equal to start.

isEmpty: boolean

`true` if `start` and `end` are equal.

isSingleLine: boolean

`true` if `start.line` and `end.line` are equal.

start: Position

The start position. It is before or equal to end.

#### Methods

contains(positionOrRange: Range | Position): boolean

Check if a position or a range is contained in this range.

Parameter

Description

positionOrRange: Range | Position

A position or a range.

Returns

Description

boolean

`true` if the position or range is inside or equal to this range.

intersection(range: Range): Range

Intersect `range` with this range and returns a new range or `undefined` if the ranges have no overlap.

Parameter

Description

range: Range

A range.

Returns

Description

Range

A range of the greater start and smaller end positions. Will return undefined when there is no overlap.

isEqual(other: Range): boolean

Check if `other` equals this range.

Parameter

Description

other: Range

A range.

Returns

Description

boolean

`true` when start and end are equal to start and end of this range.

union(other: Range): Range

Compute the union of `other` with this range.

Parameter

Description

other: Range

A range.

Returns

Description

Range

A range of smaller start position and the greater end position.

with(start?: Position, end?: Position): Range

Derived a new range from this range.

Parameter

Description

start?: Position

A position that should be used as start. The default value is the current start.

end?: Position

A position that should be used as end. The default value is the current end.

Returns

Description

Range

A range derived from this range with the given start and end position. If start and end are not different `this` range will be returned.

with(change: {end: Position, start: Position}): Range

Derived a new range from this range.

Parameter

Description

change: {end: Position, start: Position}

An object that describes a change to this range.

Returns

Description

Range

A range that reflects the given change. Will return `this` range if the change is not changing anything.

### ReferenceContext

Value-object that contains additional information when requesting references.

#### Properties

includeDeclaration: boolean

Include the declaration of the current symbol.

### ReferenceProvider

The reference provider interface defines the contract between extensions and the find references-feature.

#### Methods

provideReferences(document: TextDocument, position: Position, context: ReferenceContext, token: CancellationToken): ProviderResult<Location[]>

Provide a set of project-wide references for the given position and document.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

context: ReferenceContext

Additional information about the references request.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<Location[]>

An array of locations or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

### RelativePattern

A relative pattern is a helper to construct glob patterns that are matched relatively to a base file path. The base path can either be an absolute file path as string or uri or a workspace folder, which is the preferred way of creating the relative pattern.

#### Constructors

new RelativePattern(base: string | Uri | WorkspaceFolder, pattern: string): RelativePattern

Creates a new relative pattern object with a base file path and pattern to match. This pattern will be matched on file paths relative to the base.

Example:

```
const folder = vscode.workspace.workspaceFolders?.[0];
if (folder) {
  // Match any TypeScript file in the root of this workspace folder
  const pattern1 = new vscode.RelativePattern(folder, '*.ts');

  // Match any TypeScript file in `someFolder` inside this workspace folder
  const pattern2 = new vscode.RelativePattern(folder, 'someFolder/*.ts');
}
```

Parameter

Description

base: string | Uri | WorkspaceFolder

A base to which this pattern will be matched against relatively. It is recommended to pass in a workspace folder if the pattern should match inside the workspace. Otherwise, a uri or string should only be used if the pattern is for a file path outside the workspace.

pattern: string

A file glob pattern like `*.{ts,js}` that will be matched on paths relative to the base.

Returns

Description

RelativePattern

#### Properties

base: string

A base file path to which this pattern will be matched against relatively.

This matches the `fsPath` value of RelativePattern.baseUri.

_Note:_ updating this value will update RelativePattern.baseUri to be a uri with `file` scheme.

*   _deprecated_ - This property is deprecated, please use RelativePattern.baseUri instead.

baseUri: Uri

A base file path to which this pattern will be matched against relatively. The file path must be absolute, should not have any trailing path separators and not include any relative segments (`.` or `..`).

pattern: string

A file glob pattern like `*.{ts,js}` that will be matched on file paths relative to the base path.

Example: Given a base of `/home/work/folder` and a file path of `/home/work/folder/index.js`, the file glob pattern will match on `index.js`.

### RenameProvider

The rename provider interface defines the contract between extensions and the rename-feature.

#### Methods

prepareRename(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Range | {placeholder: string, range: Range}>

Optional function for resolving and validating a position _before_ running rename. The result can be a range or a range and a placeholder text. The placeholder text should be the identifier of the symbol which is being renamed - when omitted the text in the returned range is used.

_Note:_ This function should throw an error or return a rejected thenable when the provided location doesn't allow for a rename.

Parameter

Description

document: TextDocument

The document in which rename will be invoked.

position: Position

The position at which rename will be invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<Range | {placeholder: string, range: Range}>

The range or range and placeholder text of the identifier that is to be renamed. The lack of a result can signaled by returning `undefined` or `null`.

provideRenameEdits(document: TextDocument, position: Position, newName: string, token: CancellationToken): ProviderResult<WorkspaceEdit>

Provide an edit that describes changes that have to be made to one or many resources to rename a symbol to a different name.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

newName: string

The new name of the symbol. If the given name is not valid, the provider must return a rejected promise.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<WorkspaceEdit>

A workspace edit or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

### RunOptions

Run options for a task.

#### Properties

reevaluateOnRerun?: boolean

Controls whether task variables are re-evaluated on rerun.

### SaveDialogOptions

Options to configure the behaviour of a file save dialog.

#### Properties

defaultUri?: Uri

The resource the dialog shows when opened.

filters?:

A set of file filters that are used by the dialog. Each entry is a human-readable label, like "TypeScript", and an array of extensions, for example:

```
{
    'Images': ['png', 'jpg'],
    'TypeScript': ['ts', 'tsx']
}
```

saveLabel?: string

A human-readable string for the save button.

title?: string

Dialog title.

This parameter might be ignored, as not all operating systems display a title on save dialogs (for example, macOS).

### SecretStorage

Represents a storage utility for secrets (or any information that is sensitive) that will be stored encrypted. The implementation of the secret storage will be different on each platform and the secrets will not be synced across machines.

#### Events

onDidChange: Event<SecretStorageChangeEvent>

Fires when a secret is stored or deleted.

#### Methods

delete(key: string): Thenable<void>

Remove a secret from storage.

Parameter

Description

key: string

The key the secret was stored under.

Returns

Description

Thenable<void>

get(key: string): Thenable<string>

Retrieve a secret that was stored with key. Returns undefined if there is no password matching that key.

Parameter

Description

key: string

The key the secret was stored under.

Returns

Description

Thenable<string>

The stored value or `undefined`.

keys(): Thenable<string[]>

Retrieve the keys of all the secrets stored by this extension.

Parameter

Description

Returns

Description

Thenable<string[]>

store(key: string, value: string): Thenable<void>

Store a secret under a given key.

Parameter

Description

key: string

The key to store the secret under.

value: string

The secret.

Returns

Description

Thenable<void>

### SecretStorageChangeEvent

The event data that is fired when a secret is added or removed.

#### Properties

key: string

The key of the secret that has changed.

### SelectedCompletionInfo

Describes the currently selected completion item.

#### Properties

range: Range

The range that will be replaced if this completion item is accepted.

text: string

The text the range will be replaced with if this completion is accepted.

### Selection

Represents a text selection in an editor.

#### Constructors

new Selection(anchor: Position, active: Position): Selection

Create a selection from two positions.

Parameter

Description

anchor: Position

A position.

active: Position

A position.

Returns

Description

Selection

new Selection(anchorLine: number, anchorCharacter: number, activeLine: number, activeCharacter: number): Selection

Create a selection from four coordinates.

Parameter

Description

anchorLine: number

A zero-based line value.

anchorCharacter: number

A zero-based character value.

activeLine: number

A zero-based line value.

activeCharacter: number

A zero-based character value.

Returns

Description

Selection

#### Properties

active: Position

The position of the cursor. This position might be before or after anchor.

anchor: Position

The position at which the selection starts. This position might be before or after active.

end: Position

The end position. It is after or equal to start.

isEmpty: boolean

`true` if `start` and `end` are equal.

isReversed: boolean

A selection is reversed if its anchor is the end position.

isSingleLine: boolean

`true` if `start.line` and `end.line` are equal.

start: Position

The start position. It is before or equal to end.

#### Methods

contains(positionOrRange: Range | Position): boolean

Check if a position or a range is contained in this range.

Parameter

Description

positionOrRange: Range | Position

A position or a range.

Returns

Description

boolean

`true` if the position or range is inside or equal to this range.

intersection(range: Range): Range

Intersect `range` with this range and returns a new range or `undefined` if the ranges have no overlap.

Parameter

Description

range: Range

A range.

Returns

Description

Range

A range of the greater start and smaller end positions. Will return undefined when there is no overlap.

isEqual(other: Range): boolean

Check if `other` equals this range.

Parameter

Description

other: Range

A range.

Returns

Description

boolean

`true` when start and end are equal to start and end of this range.

union(other: Range): Range

Compute the union of `other` with this range.

Parameter

Description

other: Range

A range.

Returns

Description

Range

A range of smaller start position and the greater end position.

with(start?: Position, end?: Position): Range

Derived a new range from this range.

Parameter

Description

start?: Position

A position that should be used as start. The default value is the current start.

end?: Position

A position that should be used as end. The default value is the current end.

Returns

Description

Range

A range derived from this range with the given start and end position. If start and end are not different `this` range will be returned.

with(change: {end: Position, start: Position}): Range

Derived a new range from this range.

Parameter

Description

change: {end: Position, start: Position}

An object that describes a change to this range.

Returns

Description

Range

A range that reflects the given change. Will return `this` range if the change is not changing anything.

### SelectionRange

A selection range represents a part of a selection hierarchy. A selection range may have a parent selection range that contains it.

#### Constructors

new SelectionRange(range: Range, parent?: SelectionRange): SelectionRange

Creates a new selection range.

Parameter

Description

range: Range

The range of the selection range.

parent?: SelectionRange

The parent of the selection range.

Returns

Description

SelectionRange

#### Properties

parent?: SelectionRange

The parent selection range containing this range.

range: Range

The Range of this selection range.

### SelectionRangeProvider

The selection range provider interface defines the contract between extensions and the "Expand and Shrink Selection" feature.

#### Methods

provideSelectionRanges(document: TextDocument, positions: readonly Position[], token: CancellationToken): ProviderResult<SelectionRange[]>

Provide selection ranges for the given positions.

Selection ranges should be computed individually and independent for each position. The editor will merge and deduplicate ranges but providers must return hierarchies of selection ranges so that a range is contained by its parent.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

positions: readonly Position[]

The positions at which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<SelectionRange[]>

Selection ranges or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

### SemanticTokens

Represents semantic tokens, either in a range or in an entire document.

_See also_

*   provideDocumentSemanticTokens for an explanation of the format.
*   SemanticTokensBuilder for a helper to create an instance.

#### Constructors

new SemanticTokens(data: Uint32Array, resultId?: string): SemanticTokens

Create new semantic tokens.

Parameter

Description

data: Uint32Array

Token data.

resultId?: string

Result identifier.

Returns

Description

SemanticTokens

#### Properties

data: Uint32Array

The actual tokens data.

_See also_ provideDocumentSemanticTokens for an explanation of the format.

resultId: string

The result id of the tokens.

This is the id that will be passed to `DocumentSemanticTokensProvider.provideDocumentSemanticTokensEdits` (if implemented).

### SemanticTokensBuilder

A semantic tokens builder can help with creating a `SemanticTokens` instance which contains delta encoded semantic tokens.

#### Constructors

new SemanticTokensBuilder(legend?: SemanticTokensLegend): SemanticTokensBuilder

Creates a semantic tokens builder.

Parameter

Description

legend?: SemanticTokensLegend

A semantic tokens legend.

Returns

Description

SemanticTokensBuilder

#### Methods

build(resultId?: string): SemanticTokens

Finish and create a `SemanticTokens` instance.

Parameter

Description

resultId?: string

Returns

Description

SemanticTokens

push(line: number, char: number, length: number, tokenType: number, tokenModifiers?: number): void

Add another token.

Parameter

Description

line: number

The token start line number (absolute value).

char: number

The token start character (absolute value).

length: number

The token length in characters.

tokenType: number

The encoded token type.

tokenModifiers?: number

The encoded token modifiers.

Returns

Description

void

push(range: Range, tokenType: string, tokenModifiers?: readonly string[]): void

Add another token. Use only when providing a legend.

Parameter

Description

range: Range

The range of the token. Must be single-line.

tokenType: string

The token type.

tokenModifiers?: readonly string[]

The token modifiers.

Returns

Description

void

### SemanticTokensEdit

Represents an edit to semantic tokens.

_See also_ provideDocumentSemanticTokensEdits for an explanation of the format.

#### Constructors

new SemanticTokensEdit(start: number, deleteCount: number, data?: Uint32Array): SemanticTokensEdit

Create a semantic token edit.

Parameter

Description

start: number

Start offset

deleteCount: number

Number of elements to remove.

data?: Uint32Array

Elements to insert

Returns

Description

SemanticTokensEdit

#### Properties

data: Uint32Array

The elements to insert.

deleteCount: number

The count of elements to remove.

start: number

The start offset of the edit.

### SemanticTokensEdits

Represents edits to semantic tokens.

_See also_ provideDocumentSemanticTokensEdits for an explanation of the format.

#### Constructors

new SemanticTokensEdits(edits: SemanticTokensEdit[], resultId?: string): SemanticTokensEdits

Create new semantic tokens edits.

Parameter

Description

edits: SemanticTokensEdit[]

An array of semantic token edits

resultId?: string

Result identifier.

Returns

Description

SemanticTokensEdits

#### Properties

edits: SemanticTokensEdit[]

The edits to the tokens data. All edits refer to the initial data state.

resultId: string

The result id of the tokens.

This is the id that will be passed to `DocumentSemanticTokensProvider.provideDocumentSemanticTokensEdits` (if implemented).

### SemanticTokensLegend

A semantic tokens legend contains the needed information to decipher the integer encoded representation of semantic tokens.

#### Constructors

new SemanticTokensLegend(tokenTypes: string[], tokenModifiers?: string[]): SemanticTokensLegend

Creates a semantic tokens legend.

Parameter

Description

tokenTypes: string[]

An array of token types.

tokenModifiers?: string[]

An array of token modifiers.

Returns

Description

SemanticTokensLegend

#### Properties

tokenModifiers: string[]

The possible token modifiers.

tokenTypes: string[]

The possible token types.

### ShellExecution

Represents a task execution that happens inside a shell.

#### Constructors

new ShellExecution(commandLine: string, options?: ShellExecutionOptions): ShellExecution

Creates a shell execution with a full command line.

Parameter

Description

commandLine: string

The command line to execute.

options?: ShellExecutionOptions

Optional options for the started the shell.

Returns

Description

ShellExecution

new ShellExecution(command: string | ShellQuotedString, args: Array<string | ShellQuotedString>, options?: ShellExecutionOptions): ShellExecution

Creates a shell execution with a command and arguments. For the real execution the editor will construct a command line from the command and the arguments. This is subject to interpretation especially when it comes to quoting. If full control over the command line is needed please use the constructor that creates a `ShellExecution` with the full command line.

Parameter

Description

command: string | ShellQuotedString

The command to execute.

args: Array<string | ShellQuotedString>

The command arguments.

options?: ShellExecutionOptions

Optional options for the started the shell.

Returns

Description

ShellExecution

#### Properties

args: Array<string | ShellQuotedString>

The shell args. Is `undefined` if created with a full command line.

command: string | ShellQuotedString

The shell command. Is `undefined` if created with a full command line.

commandLine: string

The shell command line. Is `undefined` if created with a command and arguments.

options?: ShellExecutionOptions

The shell options used when the command line is executed in a shell. Defaults to undefined.

### ShellExecutionOptions

Options for a shell execution

#### Properties

cwd?: string

The current working directory of the executed shell. If omitted the tools current workspace root is used.

env?:

The additional environment of the executed shell. If omitted the parent process' environment is used. If provided it is merged with the parent process' environment.

executable?: string

The shell executable.

shellArgs?: string[]

The arguments to be passed to the shell executable used to run the task. Most shells require special arguments to execute a command. For example `bash` requires the `-c` argument to execute a command, `PowerShell` requires `-Command` and `cmd` requires both `/d` and `/c`.

shellQuoting?: ShellQuotingOptions

The shell quotes supported by this shell.

### ShellQuotedString

A string that will be quoted depending on the used shell.

#### Properties

quoting: ShellQuoting

The quoting style to use.

value: string

The actual string value.

### ShellQuoting

Defines how an argument should be quoted if it contains spaces or unsupported characters.

#### Enumeration Members

Escape: 1

Character escaping should be used. This for example uses \ on bash and ` on PowerShell.

Strong: 2

Strong string quoting should be used. This for example uses " for Windows cmd and ' for bash and PowerShell. Strong quoting treats arguments as literal strings. Under PowerShell echo 'The value is $(2 * 3)' will print `The value is $(2 * 3)`

Weak: 3

Weak string quoting should be used. This for example uses " for Windows cmd, bash and PowerShell. Weak quoting still performs some kind of evaluation inside the quoted string. Under PowerShell echo "The value is $(2 * 3)" will print `The value is 6`

### ShellQuotingOptions

The shell quoting options.

#### Properties

escape?: string | {charsToEscape: string, escapeChar: string}

The character used to do character escaping. If a string is provided only spaces are escaped. If a `{ escapeChar, charsToEscape }` literal is provide all characters in `charsToEscape` are escaped using the `escapeChar`.

strong?: string

The character used for strong quoting. The string's length must be 1.

weak?: string

The character used for weak quoting. The string's length must be 1.

### SignatureHelp

Signature help represents the signature of something callable. There can be multiple signatures but only one active and only one active parameter.

#### Constructors

new SignatureHelp(): SignatureHelp

Parameter

Description

Returns

Description

SignatureHelp

#### Properties

activeParameter: number

The active parameter of the active signature.

activeSignature: number

The active signature.

signatures: SignatureInformation[]

One or more signatures.

### SignatureHelpContext

Additional information about the context in which a SignatureHelpProvider was triggered.

#### Properties

activeSignatureHelp: SignatureHelp

The currently active SignatureHelp.

The `activeSignatureHelp` has its activeSignature field updated based on the user arrowing through available signatures.

isRetrigger: boolean

`true` if signature help was already showing when it was triggered.

Retriggers occur when the signature help is already active and can be caused by actions such as typing a trigger character, a cursor move, or document content changes.

triggerCharacter: string

Character that caused signature help to be triggered.

This is `undefined` when signature help is not triggered by typing, such as when manually invoking signature help or when moving the cursor.

triggerKind: SignatureHelpTriggerKind

Action that caused signature help to be triggered.

### SignatureHelpProvider

The signature help provider interface defines the contract between extensions and the parameter hints-feature.

#### Methods

provideSignatureHelp(document: TextDocument, position: Position, token: CancellationToken, context: SignatureHelpContext): ProviderResult<SignatureHelp>

Provide help for the signature at the given position and document.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

token: CancellationToken

A cancellation token.

context: SignatureHelpContext

Information about how signature help was triggered.

Returns

Description

ProviderResult<SignatureHelp>

Signature help or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

### SignatureHelpProviderMetadata

Metadata about a registered SignatureHelpProvider.

#### Properties

retriggerCharacters: readonly string[]

List of characters that re-trigger signature help.

These trigger characters are only active when signature help is already showing. All trigger characters are also counted as re-trigger characters.

triggerCharacters: readonly string[]

List of characters that trigger signature help.

### SignatureHelpTriggerKind

How a SignatureHelpProvider was triggered.

#### Enumeration Members

Invoke: 1

Signature help was invoked manually by the user or by a command.

TriggerCharacter: 2

Signature help was triggered by a trigger character.

ContentChange: 3

Signature help was triggered by the cursor moving or by the document content changing.

### SignatureInformation

Represents the signature of something callable. A signature can have a label, like a function-name, a doc-comment, and a set of parameters.

#### Constructors

new SignatureInformation(label: string, documentation?: string | MarkdownString): SignatureInformation

Creates a new signature information object.

Parameter

Description

label: string

A label string.

documentation?: string | MarkdownString

A doc string.

Returns

Description

SignatureInformation

#### Properties

activeParameter?: number

The index of the active parameter.

If provided, this is used in place of SignatureHelp.activeParameter.

documentation?: string | MarkdownString

The human-readable doc-comment of this signature. Will be shown in the UI but can be omitted.

label: string

The label of this signature. Will be shown in the UI.

parameters: ParameterInformation[]

The parameters of this signature.

### SnippetString

A snippet string is a template which allows to insert text and to control the editor cursor when insertion happens.

A snippet can define tab stops and placeholders with `$1`, `$2` and `${3:foo}`. `$0` defines the final tab stop, it defaults to the end of the snippet. Variables are defined with `$name` and `${name:default value}`. Also see the full snippet syntax.

#### Constructors

new SnippetString(value?: string): SnippetString

Create a new snippet string.

Parameter

Description

value?: string

A snippet string.

Returns

Description

SnippetString

#### Properties

value: string

The snippet string.

#### Methods

appendChoice(values: readonly string[], number?: number): SnippetString

Builder-function that appends a choice (`${1|a,b,c|}`) to the value of this snippet string.

Parameter

Description

values: readonly string[]

The values for choices - the array of strings

number?: number

The number of this tabstop, defaults to an auto-increment value starting at 1.

Returns

Description

SnippetString

This snippet string.

appendPlaceholder(value: string | (snippet: SnippetString) => any, number?: number): SnippetString

Builder-function that appends a placeholder (`${1:value}`) to the value of this snippet string.

Parameter

Description

value: string | (snippet: SnippetString) => any

The value of this placeholder - either a string or a function with which a nested snippet can be created.

number?: number

The number of this tabstop, defaults to an auto-increment value starting at 1.

Returns

Description

SnippetString

This snippet string.

appendTabstop(number?: number): SnippetString

Builder-function that appends a tabstop (`$1`, `$2` etc) to the value of this snippet string.

Parameter

Description

number?: number

The number of this tabstop, defaults to an auto-increment value starting at 1.

Returns

Description

SnippetString

This snippet string.

appendText(string: string): SnippetString

Builder-function that appends the given string to the value of this snippet string.

Parameter

Description

string: string

A value to append 'as given'. The string will be escaped.

Returns

Description

SnippetString

This snippet string.

appendVariable(name: string, defaultValue: string | (snippet: SnippetString) => any): SnippetString

Builder-function that appends a variable (`${VAR}`) to the value of this snippet string.

Parameter

Description

name: string

The name of the variable - excluding the `$`.

defaultValue: string | (snippet: SnippetString) => any

The default value which is used when the variable name cannot be resolved - either a string or a function with which a nested snippet can be created.

Returns

Description

SnippetString

This snippet string.

### SnippetTextEdit

A snippet edit represents an interactive edit that is performed by the editor.

_Note_ that a snippet edit can always be performed as a normal text edit. This will happen when no matching editor is open or when a workspace edit contains snippet edits for multiple files. In that case only those that match the active editor will be performed as snippet edits and the others as normal text edits.

#### Static

insert(position: Position, snippet: SnippetString): SnippetTextEdit

Utility to create an insert snippet edit.

Parameter

Description

position: Position

A position, will become an empty range.

snippet: SnippetString

A snippet string.

Returns

Description

SnippetTextEdit

A new snippet edit object.

replace(range: Range, snippet: SnippetString): SnippetTextEdit

Utility to create a replace snippet edit.

Parameter

Description

range: Range

A range.

snippet: SnippetString

A snippet string.

Returns

Description

SnippetTextEdit

A new snippet edit object.

#### Constructors

new SnippetTextEdit(range: Range, snippet: SnippetString): SnippetTextEdit

Create a new snippet edit.

Parameter

Description

range: Range

A range.

snippet: SnippetString

A snippet string.

Returns

Description

SnippetTextEdit

#### Properties

keepWhitespace?: boolean

Whether the snippet edit should be applied with existing whitespace preserved.

range: Range

The range this edit applies to.

snippet: SnippetString

The snippet this edit will perform.

### SourceBreakpoint

A breakpoint specified by a source location.

#### Constructors

new SourceBreakpoint(location: Location, enabled?: boolean, condition?: string, hitCondition?: string, logMessage?: string): SourceBreakpoint

Create a new breakpoint for a source location.

Parameter

Description

location: Location

enabled?: boolean

condition?: string

hitCondition?: string

logMessage?: string

Returns

Description

SourceBreakpoint

#### Properties

condition?: string

An optional expression for conditional breakpoints.

enabled: boolean

Is breakpoint enabled.

hitCondition?: string

An optional expression that controls how many hits of the breakpoint are ignored.

id: string

The unique ID of the breakpoint.

location: Location

The source and line position of this breakpoint.

logMessage?: string

An optional message that gets logged when this breakpoint is hit. Embedded expressions within {} are interpolated by the debug adapter.

### SourceControl

An source control is able to provide resource states to the editor and interact with the editor in several source control related ways.

#### Properties

acceptInputCommand?: Command

Optional accept input command.

This command will be invoked when the user accepts the value in the Source Control input.

commitTemplate?: string

Optional commit template string.

The Source Control viewlet will populate the Source Control input with this value when appropriate.

count?: number

The UI-visible count of resource states of this source control.

If undefined, this source control will

*   display its UI-visible count as zero, and
*   contribute the count of its resource states to the UI-visible aggregated count for all source controls

id: string

The id of this source control.

inputBox: SourceControlInputBox

The input box for this source control.

label: string

The human-readable label of this source control.

quickDiffProvider?: QuickDiffProvider

An optional quick diff provider.

rootUri: Uri

The (optional) Uri of the root of this source control.

statusBarCommands?: Command[]

Optional status bar commands.

These commands will be displayed in the editor's status bar.

#### Methods

createResourceGroup(id: string, label: string): SourceControlResourceGroup

Create a new resource group.

Parameter

Description

id: string

label: string

Returns

Description

SourceControlResourceGroup

dispose(): void

Dispose this source control.

Parameter

Description

Returns

Description

void

### SourceControlInputBox

Represents the input box in the Source Control viewlet.

#### Properties

enabled: boolean

Controls whether the input box is enabled (default is `true`).

placeholder: string

A string to show as placeholder in the input box to guide the user.

value: string

Setter and getter for the contents of the input box.

visible: boolean

Controls whether the input box is visible (default is `true`).

### SourceControlResourceDecorations

The decorations for a source control resource state. Can be independently specified for light and dark themes.

#### Properties

dark?: SourceControlResourceThemableDecorations

The dark theme decorations.

faded?: boolean

Whether the source control resource state should be faded in the UI.

iconPath?: string | Uri | ThemeIcon

The icon path for a specific source control resource state.

light?: SourceControlResourceThemableDecorations

The light theme decorations.

strikeThrough?: boolean

Whether the source control resource state should be striked-through in the UI.

tooltip?: string

The title for a specific source control resource state.

### SourceControlResourceGroup

A source control resource group is a collection of source control resource states.

#### Properties

contextValue?: string

Context value of the resource group. This can be used to contribute resource group specific actions. For example, if a resource group is given a context value of `exportable`, when contributing actions to `scm/resourceGroup/context` using `menus` extension point, you can specify context value for key `scmResourceGroupState` in `when` expressions, like `scmResourceGroupState == exportable`.

```
"contributes": {
  "menus": {
    "scm/resourceGroup/context": [
      {
        "command": "extension.export",
        "when": "scmResourceGroupState == exportable"
      }
    ]
  }
}
```

This will show action `extension.export` only for resource groups with `contextValue` equal to `exportable`.

hideWhenEmpty?: boolean

Whether this source control resource group is hidden when it contains no source control resource states.

id: string

The id of this source control resource group.

label: string

The label of this source control resource group.

resourceStates: SourceControlResourceState[]

This group's collection of source control resource states.

#### Methods

dispose(): void

Dispose this source control resource group.

Parameter

Description

Returns

Description

void

### SourceControlResourceState

An source control resource state represents the state of an underlying workspace resource within a certain source control group.

#### Properties

command?: Command

The Command which should be run when the resource state is open in the Source Control viewlet.

contextValue?: string

Context value of the resource state. This can be used to contribute resource specific actions. For example, if a resource is given a context value as `diffable`. When contributing actions to `scm/resourceState/context` using `menus` extension point, you can specify context value for key `scmResourceState` in `when` expressions, like `scmResourceState == diffable`.

```
"contributes": {
  "menus": {
    "scm/resourceState/context": [
      {
        "command": "extension.diff",
        "when": "scmResourceState == diffable"
      }
    ]
  }
}
```

This will show action `extension.diff` only for resources with `contextValue` is `diffable`.

decorations?: SourceControlResourceDecorations

The decorations for this source control resource state.

resourceUri: Uri

The Uri of the underlying resource inside the workspace.

### SourceControlResourceThemableDecorations

The theme-aware decorations for a source control resource state.

#### Properties

iconPath?: string | Uri | ThemeIcon

The icon path for a specific source control resource state.

### StatementCoverage

Contains coverage information for a single statement or line.

#### Constructors

new StatementCoverage(executed: number | boolean, location: Range | Position, branches?: BranchCoverage[]): StatementCoverage

Parameter

Description

executed: number | boolean

The number of times this statement was executed, or a boolean indicating whether it was executed if the exact count is unknown. If zero or false, the statement will be marked as un-covered.

location: Range | Position

The statement position.

branches?: BranchCoverage[]

Coverage from branches of this line. If it's not a conditional, this should be omitted.

Returns

Description

StatementCoverage

#### Properties

branches: BranchCoverage[]

Coverage from branches of this line or statement. If it's not a conditional, this will be empty.

executed: number | boolean

The number of times this statement was executed, or a boolean indicating whether it was executed if the exact count is unknown. If zero or false, the statement will be marked as un-covered.

location: Range | Position

Statement location.

### StatusBarAlignment

Represents the alignment of status bar items.

#### Enumeration Members

Left: 1

Aligned to the left side.

Right: 2

Aligned to the right side.

### StatusBarItem

A status bar item is a status bar contribution that can show text and icons and run a command on click.

#### Properties

accessibilityInformation: AccessibilityInformation

Accessibility information used when a screen reader interacts with this StatusBar item

alignment: StatusBarAlignment

The alignment of this item.

backgroundColor: ThemeColor

The background color for this entry.

_Note_: only the following colors are supported:

*   `new ThemeColor('statusBarItem.errorBackground')`
*   `new ThemeColor('statusBarItem.warningBackground')`

More background colors may be supported in the future.

_Note_: when a background color is set, the statusbar may override the `color` choice to ensure the entry is readable in all themes.

color: string | ThemeColor

The foreground color for this entry.

command: string | Command

Command or identifier of a command to run on click.

The command must be known.

Note that if this is a Command object, only the command and arguments are used by the editor.

id: string

The identifier of this item.

_Note_: if no identifier was provided by the window.createStatusBarItem method, the identifier will match the extension identifier.

name: string

The name of the entry, like 'Python Language Indicator', 'Git Status' etc. Try to keep the length of the name short, yet descriptive enough that users can understand what the status bar item is about.

priority: number

The priority of this item. Higher value means the item should be shown more to the left.

text: string

The text to show for the entry. You can embed icons in the text by leveraging the syntax:

`My text $(icon-name) contains icons like $(icon-name) this one.`

Where the icon-name is taken from the ThemeIcon icon set, e.g. `light-bulb`, `thumbsup`, `zap` etc.

tooltip: string | MarkdownString

The tooltip text when you hover over this entry.

#### Methods

dispose(): void

Dispose and free associated resources. Call hide.

Parameter

Description

Returns

Description

void

hide(): void

Hide the entry in the status bar.

Parameter

Description

Returns

Description

void

show(): void

Shows the entry in the status bar.

Parameter

Description

Returns

Description

void

### SymbolInformation

Represents information about programming constructs like variables, classes, interfaces etc.

#### Constructors

new SymbolInformation(name: string, kind: SymbolKind, containerName: string, location: Location): SymbolInformation

Creates a new symbol information object.

Parameter

Description

name: string

The name of the symbol.

kind: SymbolKind

The kind of the symbol.

containerName: string

The name of the symbol containing the symbol.

location: Location

The location of the symbol.

Returns

Description

SymbolInformation

new SymbolInformation(name: string, kind: SymbolKind, range: Range, uri?: Uri, containerName?: string): SymbolInformation

Creates a new symbol information object.

*   _deprecated_ - Please use the constructor taking a Location object.

Parameter

Description

name: string

The name of the symbol.

kind: SymbolKind

The kind of the symbol.

range: Range

The range of the location of the symbol.

uri?: Uri

The resource of the location of symbol, defaults to the current document.

containerName?: string

The name of the symbol containing the symbol.

Returns

Description

SymbolInformation

#### Properties

containerName: string

The name of the symbol containing this symbol.

kind: SymbolKind

The kind of this symbol.

location: Location

The location of this symbol.

name: string

The name of this symbol.

tags?: readonly SymbolTag[]

Tags for this symbol.

### SymbolKind

A symbol kind.

#### Enumeration Members

File: 0

The `File` symbol kind.

Module: 1

The `Module` symbol kind.

Namespace: 2

The `Namespace` symbol kind.

Package: 3

The `Package` symbol kind.

Class: 4

The `Class` symbol kind.

Method: 5

The `Method` symbol kind.

Property: 6

The `Property` symbol kind.

Field: 7

The `Field` symbol kind.

Constructor: 8

The `Constructor` symbol kind.

Enum: 9

The `Enum` symbol kind.

Interface: 10

The `Interface` symbol kind.

Function: 11

The `Function` symbol kind.

Variable: 12

The `Variable` symbol kind.

Constant: 13

The `Constant` symbol kind.

String: 14

The `String` symbol kind.

Number: 15

The `Number` symbol kind.

Boolean: 16

The `Boolean` symbol kind.

Array: 17

The `Array` symbol kind.

Object: 18

The `Object` symbol kind.

Key: 19

The `Key` symbol kind.

Null: 20

The `Null` symbol kind.

EnumMember: 21

The `EnumMember` symbol kind.

Struct: 22

The `Struct` symbol kind.

Event: 23

The `Event` symbol kind.

Operator: 24

The `Operator` symbol kind.

TypeParameter: 25

The `TypeParameter` symbol kind.

### SymbolTag

Symbol tags are extra annotations that tweak the rendering of a symbol.

#### Enumeration Members

Deprecated: 1

Render a symbol as obsolete, usually using a strike-out.

### SyntaxTokenType

Enumeration of commonly encountered syntax token types.

#### Enumeration Members

Other: 0

Everything except tokens that are part of comments, string literals and regular expressions.

Comment: 1

A comment.

String: 2

A string literal.

RegEx: 3

A regular expression.

### Tab

Represents a tab within a group of tabs. Tabs are merely the graphical representation within the editor area. A backing editor is not a guarantee.

#### Properties

group: TabGroup

The group which the tab belongs to.

input: unknown

Defines the structure of the tab i.e. text, notebook, custom, etc. Resource and other useful properties are defined on the tab kind.

isActive: boolean

Whether or not the tab is currently active. This is dictated by being the selected tab in the group.

isDirty: boolean

Whether or not the dirty indicator is present on the tab.

isPinned: boolean

Whether or not the tab is pinned (pin icon is present).

isPreview: boolean

Whether or not the tab is in preview mode.

label: string

The text displayed on the tab.

### TabChangeEvent

An event describing change to tabs.

#### Properties

changed: readonly Tab[]

Tabs that have changed, e.g have changed their active state.

closed: readonly Tab[]

The tabs that have been closed.

opened: readonly Tab[]

The tabs that have been opened.

### TabGroup

Represents a group of tabs. A tab group itself consists of multiple tabs.

#### Properties

activeTab: Tab

The active tab in the group. This is the tab whose contents are currently being rendered.

_Note_ that there can be one active tab per group but there can only be one active group.

isActive: boolean

Whether or not the group is currently active.

_Note_ that only one tab group is active at a time, but that multiple tab groups can have an active tab.

_See also_ Tab.isActive

tabs: readonly Tab[]

The list of tabs contained within the group. This can be empty if the group has no tabs open.

viewColumn: ViewColumn

The view column of the group.

### TabGroupChangeEvent

An event describing changes to tab groups.

#### Properties

changed: readonly TabGroup[]

Tab groups that have changed, e.g have changed their active state.

closed: readonly TabGroup[]

Tab groups that have been closed.

opened: readonly TabGroup[]

Tab groups that have been opened.

### TabGroups

Represents the main editor area which consists of multiple groups which contain tabs.

#### Events

onDidChangeTabGroups: Event<TabGroupChangeEvent>

An event which fires when tab groups have changed.

onDidChangeTabs: Event<TabChangeEvent>

An event which fires when tabs have changed.

#### Properties

activeTabGroup: TabGroup

The currently active group.

all: readonly TabGroup[]

All the groups within the group container.

#### Methods

close(tab: Tab | readonly Tab[], preserveFocus?: boolean): Thenable<boolean>

Closes the tab. This makes the tab object invalid and the tab should no longer be used for further actions. Note: In the case of a dirty tab, a confirmation dialog will be shown which may be cancelled. If cancelled the tab is still valid

Parameter

Description

tab: Tab | readonly Tab[]

The tab to close.

preserveFocus?: boolean

When `true` focus will remain in its current position. If `false` it will jump to the next tab.

Returns

Description

Thenable<boolean>

A promise that resolves to `true` when all tabs have been closed.

close(tabGroup: TabGroup | readonly TabGroup[], preserveFocus?: boolean): Thenable<boolean>

Closes the tab group. This makes the tab group object invalid and the tab group should no longer be used for further actions.

Parameter

Description

tabGroup: TabGroup | readonly TabGroup[]

The tab group to close.

preserveFocus?: boolean

When `true` focus will remain in its current position.

Returns

Description

Thenable<boolean>

A promise that resolves to `true` when all tab groups have been closed.

### TabInputCustom

The tab represents a custom editor.

#### Constructors

new TabInputCustom(uri: Uri, viewType: string): TabInputCustom

Constructs a custom editor tab input.

Parameter

Description

uri: Uri

The uri of the tab.

viewType: string

The viewtype of the custom editor.

Returns

Description

TabInputCustom

#### Properties

uri: Uri

The uri that the tab is representing.

viewType: string

The type of custom editor.

### TabInputNotebook

The tab represents a notebook.

#### Constructors

new TabInputNotebook(uri: Uri, notebookType: string): TabInputNotebook

Constructs a new tab input for a notebook.

Parameter

Description

uri: Uri

The uri of the notebook.

notebookType: string

The type of notebook. Maps to NotebookDocuments's notebookType

Returns

Description

TabInputNotebook

#### Properties

notebookType: string

The type of notebook. Maps to NotebookDocuments's notebookType

uri: Uri

The uri that the tab is representing.

### TabInputNotebookDiff

The tabs represents two notebooks in a diff configuration.

#### Constructors

new TabInputNotebookDiff(original: Uri, modified: Uri, notebookType: string): TabInputNotebookDiff

Constructs a notebook diff tab input.

Parameter

Description

original: Uri

The uri of the original unmodified notebook.

modified: Uri

The uri of the modified notebook.

notebookType: string

The type of notebook. Maps to NotebookDocuments's notebookType

Returns

Description

TabInputNotebookDiff

#### Properties

modified: Uri

The uri of the modified notebook.

notebookType: string

The type of notebook. Maps to NotebookDocuments's notebookType

original: Uri

The uri of the original notebook.

### TabInputTerminal

The tab represents a terminal in the editor area.

#### Constructors

new TabInputTerminal(): TabInputTerminal

Constructs a terminal tab input.

Parameter

Description

Returns

Description

TabInputTerminal

### TabInputText

The tab represents a single text based resource.

#### Constructors

new TabInputText(uri: Uri): TabInputText

Constructs a text tab input with the given URI.

Parameter

Description

uri: Uri

The URI of the tab.

Returns

Description

TabInputText

#### Properties

uri: Uri

The uri represented by the tab.

### TabInputTextDiff

The tab represents two text based resources being rendered as a diff.

#### Constructors

new TabInputTextDiff(original: Uri, modified: Uri): TabInputTextDiff

Constructs a new text diff tab input with the given URIs.

Parameter

Description

original: Uri

The uri of the original text resource.

modified: Uri

The uri of the modified text resource.

Returns

Description

TabInputTextDiff

#### Properties

modified: Uri

The uri of the modified text resource.

original: Uri

The uri of the original text resource.

### TabInputWebview

The tab represents a webview.

#### Constructors

new TabInputWebview(viewType: string): TabInputWebview

Constructs a webview tab input with the given view type.

Parameter

Description

viewType: string

The type of webview. Maps to WebviewPanel's viewType

Returns

Description

TabInputWebview

#### Properties

viewType: string

The type of webview. Maps to WebviewPanel's viewType

### Task

A task to execute

#### Constructors

new Task(taskDefinition: TaskDefinition, scope: WorkspaceFolder | Global | Workspace, name: string, source: string, execution?: ProcessExecution | ShellExecution | CustomExecution, problemMatchers?: string | string[]): Task

Creates a new task.

Parameter

Description

taskDefinition: TaskDefinition

The task definition as defined in the taskDefinitions extension point.

scope: WorkspaceFolder | Global | Workspace

Specifies the task's scope. It is either a global or a workspace task or a task for a specific workspace folder. Global tasks are currently not supported.

name: string

The task's name. Is presented in the user interface.

source: string

The task's source (e.g. 'gulp', 'npm', ...). Is presented in the user interface.

execution?: ProcessExecution | ShellExecution | CustomExecution

The process or shell execution.

problemMatchers?: string | string[]

the names of problem matchers to use, like '$tsc' or '$eslint'. Problem matchers can be contributed by an extension using the `problemMatchers` extension point.

Returns

Description

Task

new Task(taskDefinition: TaskDefinition, name: string, source: string, execution?: ProcessExecution | ShellExecution, problemMatchers?: string | string[]): Task

Creates a new task.

*   _deprecated_ - Use the new constructors that allow specifying a scope for the task.

Parameter

Description

taskDefinition: TaskDefinition

The task definition as defined in the taskDefinitions extension point.

name: string

The task's name. Is presented in the user interface.

source: string

The task's source (e.g. 'gulp', 'npm', ...). Is presented in the user interface.

execution?: ProcessExecution | ShellExecution

The process or shell execution.

problemMatchers?: string | string[]

the names of problem matchers to use, like '$tsc' or '$eslint'. Problem matchers can be contributed by an extension using the `problemMatchers` extension point.

Returns

Description

Task

#### Properties

definition: TaskDefinition

The task's definition.

detail?: string

A human-readable string which is rendered less prominently on a separate line in places where the task's name is displayed. Supports rendering of theme icons via the `$(<name>)`-syntax.

execution?: ProcessExecution | ShellExecution | CustomExecution

The task's execution engine

group?: TaskGroup

The task group this tasks belongs to. See TaskGroup for a predefined set of available groups. Defaults to undefined meaning that the task doesn't belong to any special group.

isBackground: boolean

Whether the task is a background task or not.

name: string

The task's name

presentationOptions: TaskPresentationOptions

The presentation options. Defaults to an empty literal.

problemMatchers: string[]

The problem matchers attached to the task. Defaults to an empty array.

runOptions: RunOptions

Run options for the task

scope: WorkspaceFolder | Global | Workspace

The task's scope.

source: string

A human-readable string describing the source of this shell task, e.g. 'gulp' or 'npm'. Supports rendering of theme icons via the `$(<name>)`-syntax.

### TaskDefinition

A structure that defines a task kind in the system. The value must be JSON-stringifyable.

#### Properties

type: string

The task definition describing the task provided by an extension. Usually a task provider defines more properties to identify a task. They need to be defined in the package.json of the extension under the 'taskDefinitions' extension point. The npm task definition for example looks like this

```
interface NpmTaskDefinition extends TaskDefinition {
  script: string;
}
```

Note that type identifier starting with a '$' are reserved for internal usages and shouldn't be used by extensions.

### TaskEndEvent

An event signaling the end of an executed task.

This interface is not intended to be implemented.

#### Properties

execution: TaskExecution

The task item representing the task that finished.

### TaskExecution

An object representing an executed Task. It can be used to terminate a task.

This interface is not intended to be implemented.

#### Properties

task: Task

The task that got started.

#### Methods

terminate(): void

Terminates the task execution.

Parameter

Description

Returns

Description

void

### TaskFilter

A task filter denotes tasks by their version and types

#### Properties

type?: string

The task type to return;

version?: string

The task version as used in the tasks.json file. The string support the package.json semver notation.

### TaskGroup

A grouping for tasks. The editor by default supports the 'Clean', 'Build', 'RebuildAll' and 'Test' group.

#### Static

Build: TaskGroup

The build task group;

Clean: TaskGroup

The clean task group;

Rebuild: TaskGroup

The rebuild all task group;

Test: TaskGroup

The test all task group;

#### Constructors

new TaskGroup(id: string, label: string): TaskGroup

Private constructor

Parameter

Description

id: string

Identifier of a task group.

label: string

The human-readable name of a task group.

Returns

Description

TaskGroup

#### Properties

id: string

The ID of the task group. Is one of TaskGroup.Clean.id, TaskGroup.Build.id, TaskGroup.Rebuild.id, or TaskGroup.Test.id.

isDefault: boolean

Whether the task that is part of this group is the default for the group. This property cannot be set through API, and is controlled by a user's task configurations.

### TaskPanelKind

Controls how the task channel is used between tasks

#### Enumeration Members

Shared: 1

Shares a panel with other tasks. This is the default.

Dedicated: 2

Uses a dedicated panel for this tasks. The panel is not shared with other tasks.

New: 3

Creates a new panel whenever this task is executed.

### TaskPresentationOptions

Controls how the task is presented in the UI.

#### Properties

clear?: boolean

Controls whether the terminal is cleared before executing the task.

close?: boolean

Controls whether the terminal is closed after executing the task.

echo?: boolean

Controls whether the command associated with the task is echoed in the user interface.

focus?: boolean

Controls whether the panel showing the task output is taking focus.

panel?: TaskPanelKind

Controls if the task panel is used for this task only (dedicated), shared between tasks (shared) or if a new panel is created on every task execution (new). Defaults to `TaskInstanceKind.Shared`

reveal?: TaskRevealKind

Controls whether the task output is reveal in the user interface. Defaults to `RevealKind.Always`.

showReuseMessage?: boolean

Controls whether to show the "Terminal will be reused by tasks, press any key to close it" message.

### TaskProcessEndEvent

An event signaling the end of a process execution triggered through a task

#### Properties

execution: TaskExecution

The task execution for which the process got started.

exitCode: number

The process's exit code. Will be `undefined` when the task is terminated.

### TaskProcessStartEvent

An event signaling the start of a process execution triggered through a task

#### Properties

execution: TaskExecution

The task execution for which the process got started.

processId: number

The underlying process id.

### TaskProvider<T>

A task provider allows to add tasks to the task service. A task provider is registered via tasks.registerTaskProvider.

#### Methods

provideTasks(token: CancellationToken): ProviderResult<T[]>

Provides tasks.

Parameter

Description

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T[]>

an array of tasks

resolveTask(task: T, token: CancellationToken): ProviderResult<T>

Resolves a task that has no execution set. Tasks are often created from information found in the `tasks.json`-file. Such tasks miss the information on how to execute them and a task provider must fill in the missing information in the `resolveTask`-method. This method will not be called for tasks returned from the above `provideTasks` method since those tasks are always fully resolved. A valid default implementation for the `resolveTask` method is to return `undefined`.

Note that when filling in the properties of `task`, you _must_ be sure to use the exact same `TaskDefinition` and not create a new one. Other properties may be changed.

Parameter

Description

task: T

The task to resolve.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T>

The resolved task

### TaskRevealKind

Controls the behaviour of the terminal's visibility.

#### Enumeration Members

Always: 1

Always brings the terminal to front if the task is executed.

Silent: 2

Only brings the terminal to front if a problem is detected executing the task (e.g. the task couldn't be started because).

Never: 3

The terminal never comes to front when the task is executed.

### TaskScope

The scope of a task.

#### Enumeration Members

Global: 1

The task is a global task. Global tasks are currently not supported.

Workspace: 2

The task is a workspace task

### TaskStartEvent

An event signaling the start of a task execution.

This interface is not intended to be implemented.

#### Properties

execution: TaskExecution

The task item representing the task that got started.

### TelemetryLogger

A telemetry logger which can be used by extensions to log usage and error telemetry.

A logger wraps around an sender but it guarantees that

*   user settings to disable or tweak telemetry are respected, and that
*   potential sensitive data is removed

It also enables an "echo UI" that prints whatever data is send and it allows the editor to forward unhandled errors to the respective extensions.

To get an instance of a `TelemetryLogger`, use `createTelemetryLogger`.

#### Events

onDidChangeEnableStates: Event<TelemetryLogger>

An Event which fires when the enablement state of usage or error telemetry changes.

#### Properties

isErrorsEnabled: boolean

Whether or not error telemetry is enabled for this logger.

isUsageEnabled: boolean

Whether or not usage telemetry is enabled for this logger.

#### Methods

dispose(): void

Dispose this object and free resources.

Parameter

Description

Returns

Description

void

logError(eventName: string, data?: Record<string, any>): void

Log an error event.

After completing cleaning, telemetry setting checks, and data mix-in calls `TelemetrySender.sendEventData` to log the event. Differs from `logUsage` in that it will log the event if the telemetry setting is Error+. Automatically supports echoing to extension telemetry output channel.

Parameter

Description

eventName: string

The event name to log

data?: Record<string, any>

The data to log

Returns

Description

void

logError(error: Error, data?: Record<string, any>): void

Log an error event.

Calls `TelemetrySender.sendErrorData`. Does cleaning, telemetry checks, and data mix-in. Automatically supports echoing to extension telemetry output channel. Will also automatically log any exceptions thrown within the extension host process.

Parameter

Description

error: Error

The error object which contains the stack trace cleaned of PII

data?: Record<string, any>

Additional data to log alongside the stack trace

Returns

Description

void

logUsage(eventName: string, data?: Record<string, any>): void

Log a usage event.

After completing cleaning, telemetry setting checks, and data mix-in calls `TelemetrySender.sendEventData` to log the event. Automatically supports echoing to extension telemetry output channel.

Parameter

Description

eventName: string

The event name to log

data?: Record<string, any>

The data to log

Returns

Description

void

### TelemetryLoggerOptions

Options for creating a TelemetryLogger

#### Properties

additionalCommonProperties?: Record<string, any>

Any additional common properties which should be injected into the data object.

ignoreBuiltInCommonProperties?: boolean

Whether or not you want to avoid having the built-in common properties such as os, extension name, etc injected into the data object. Defaults to `false` if not defined.

ignoreUnhandledErrors?: boolean

Whether or not unhandled errors on the extension host caused by your extension should be logged to your sender. Defaults to `false` if not defined.

### TelemetrySender

The telemetry sender is the contract between a telemetry logger and some telemetry service. **Note** that extensions must NOT call the methods of their sender directly as the logger provides extra guards and cleaning.

```
const sender: vscode.TelemetrySender = {...};
const logger = vscode.env.createTelemetryLogger(sender);

// GOOD - uses the logger
logger.logUsage('myEvent', { myData: 'myValue' });

// BAD - uses the sender directly: no data cleansing, ignores user settings, no echoing to the telemetry output channel etc
sender.logEvent('myEvent', { myData: 'myValue' });
```

#### Methods

flush(): void | Thenable<void>

Optional flush function which will give this sender a chance to send any remaining events as its TelemetryLogger is being disposed

Parameter

Description

Returns

Description

void | Thenable<void>

sendErrorData(error: Error, data?: Record<string, any>): void

Function to send an error. Used within a TelemetryLogger

Parameter

Description

error: Error

The error being logged

data?: Record<string, any>

Any additional data to be collected with the exception

Returns

Description

void

sendEventData(eventName: string, data?: Record<string, any>): void

Function to send event data without a stacktrace. Used within a TelemetryLogger

Parameter

Description

eventName: string

The name of the event which you are logging

data?: Record<string, any>

A serializable key value pair that is being logged

Returns

Description

void

### TelemetryTrustedValue<T>

A special value wrapper denoting a value that is safe to not clean. This is to be used when you can guarantee no identifiable information is contained in the value and the cleaning is improperly redacting it.

#### Constructors

new TelemetryTrustedValue<T>(value: T): TelemetryTrustedValue<T>

Creates a new telemetry trusted value.

Parameter

Description

value: T

A value to trust

Returns

Description

TelemetryTrustedValue<T>

#### Properties

value: T

The value that is trusted to not contain PII.

### Terminal

An individual terminal instance within the integrated terminal.

#### Properties

creationOptions: Readonly<TerminalOptions | ExtensionTerminalOptions>

The object used to initialize the terminal, this is useful for example to detecting the shell type of when the terminal was not launched by this extension or for detecting what folder the shell was launched in.

exitStatus: TerminalExitStatus

The exit status of the terminal, this will be undefined while the terminal is active.

**Example:** Show a notification with the exit code when the terminal exits with a non-zero exit code.

```
window.onDidCloseTerminal(t => {
  if (t.exitStatus && t.exitStatus.code) {
    vscode.window.showInformationMessage(`Exit code: ${t.exitStatus.code}`);
  }
});
```

name: string

The name of the terminal.

processId: Thenable<number>

The process ID of the shell process.

shellIntegration: TerminalShellIntegration

An object that contains shell integration-powered features for the terminal. This will always be `undefined` immediately after the terminal is created. Listen to window.onDidChangeTerminalShellIntegration to be notified when shell integration is activated for a terminal.

Note that this object may remain undefined if shell integration never activates. For example Command Prompt does not support shell integration and a user's shell setup could conflict with the automatic shell integration activation.

state: TerminalState

The current state of the Terminal.

#### Methods

dispose(): void

Dispose and free associated resources.

Parameter

Description

Returns

Description

void

hide(): void

Hide the terminal panel if this terminal is currently showing.

Parameter

Description

Returns

Description

void

sendText(text: string, shouldExecute?: boolean): void

Send text to the terminal. The text is written to the stdin of the underlying pty process (shell) of the terminal.

Parameter

Description

text: string

The text to send.

shouldExecute?: boolean

Indicates that the text being sent should be executed rather than just inserted in the terminal. The character(s) added are `\n` or `\r\n`, depending on the platform. This defaults to `true`.

Returns

Description

void

show(preserveFocus?: boolean): void

Show the terminal panel and reveal this terminal in the UI.

Parameter

Description

preserveFocus?: boolean

When `true` the terminal will not take focus.

Returns

Description

void

### TerminalDimensions

Represents the dimensions of a terminal.

#### Properties

columns: number

The number of columns in the terminal.

rows: number

The number of rows in the terminal.

### TerminalEditorLocationOptions

Assumes a TerminalLocation of editor and allows specifying a ViewColumn and preserveFocus property

#### Properties

preserveFocus?: boolean

An optional flag that when `true` will stop the Terminal from taking focus.

viewColumn: ViewColumn

A view column in which the terminal should be shown in the editor area. The default is the active. Columns that do not exist will be created as needed up to the maximum of ViewColumn.Nine. Use ViewColumn.Beside to open the editor to the side of the currently active one.

### TerminalExitReason

Terminal exit reason kind.

#### Enumeration Members

Unknown: 0

Unknown reason.

Shutdown: 1

The window closed/reloaded.

Process: 2

The shell process exited.

User: 3

The user closed the terminal.

Extension: 4

An extension disposed the terminal.

### TerminalExitStatus

Represents how a terminal exited.

#### Properties

code: number

The exit code that a terminal exited with, it can have the following values:

*   Zero: the terminal process or custom execution succeeded.
*   Non-zero: the terminal process or custom execution failed.
*   `undefined`: the user forcibly closed the terminal or a custom execution exited without providing an exit code.

reason: TerminalExitReason

The reason that triggered the exit of a terminal.

### TerminalLink

A link on a terminal line.

#### Constructors

new TerminalLink(startIndex: number, length: number, tooltip?: string): TerminalLink

Creates a new terminal link.

Parameter

Description

startIndex: number

The start index of the link on TerminalLinkContext.line.

length: number

The length of the link on TerminalLinkContext.line.

tooltip?: string

The tooltip text when you hover over this link.

If a tooltip is provided, is will be displayed in a string that includes instructions on how to trigger the link, such as `{0} (ctrl + click)`. The specific instructions vary depending on OS, user settings, and localization.

Returns

Description

TerminalLink

#### Properties

length: number

The length of the link on TerminalLinkContext.line.

startIndex: number

The start index of the link on TerminalLinkContext.line.

tooltip?: string

The tooltip text when you hover over this link.

If a tooltip is provided, is will be displayed in a string that includes instructions on how to trigger the link, such as `{0} (ctrl + click)`. The specific instructions vary depending on OS, user settings, and localization.

### TerminalLinkContext

Provides information on a line in a terminal in order to provide links for it.

#### Properties

line: string

This is the text from the unwrapped line in the terminal.

terminal: Terminal

The terminal the link belongs to.

### TerminalLinkProvider<T>

A provider that enables detection and handling of links within terminals.

#### Methods

handleTerminalLink(link: T): ProviderResult<void>

Handle an activated terminal link.

Parameter

Description

link: T

The link to handle.

Returns

Description

ProviderResult<void>

provideTerminalLinks(context: TerminalLinkContext, token: CancellationToken): ProviderResult<T[]>

Provide terminal links for the given context. Note that this can be called multiple times even before previous calls resolve, make sure to not share global objects (eg. `RegExp`) that could have problems when asynchronous usage may overlap.

Parameter

Description

context: TerminalLinkContext

Information about what links are being provided for.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T[]>

A list of terminal links for the given line.

### TerminalLocation

The location of the terminal.

#### Enumeration Members

Panel: 1

In the terminal view

Editor: 2

In the editor area

### TerminalOptions

Value-object describing what options a terminal should use.

#### Properties

color?: ThemeColor

The icon ThemeColor for the terminal. The `terminal.ansi*` theme keys are recommended for the best contrast and consistency across themes.

cwd?: string | Uri

A path or Uri for the current working directory to be used for the terminal.

env?:

Object with environment variables that will be added to the editor process.

hideFromUser?: boolean

When enabled the terminal will run the process as normal but not be surfaced to the user until `Terminal.show` is called. The typical usage for this is when you need to run something that may need interactivity but only want to tell the user about it when interaction is needed. Note that the terminals will still be exposed to all extensions as normal. The hidden terminals will not be restored when the workspace is next opened.

iconPath?: IconPath

The icon path or ThemeIcon for the terminal.

isTransient?: boolean

Opt-out of the default terminal persistence on restart and reload. This will only take effect when `terminal.integrated.enablePersistentSessions` is enabled.

location?: TerminalEditorLocationOptions | TerminalSplitLocationOptions | TerminalLocation

The TerminalLocation or TerminalEditorLocationOptions or TerminalSplitLocationOptions for the terminal.

message?: string

A message to write to the terminal on first launch, note that this is not sent to the process but, rather written directly to the terminal. This supports escape sequences such a setting text style.

name?: string

A human-readable string which will be used to represent the terminal in the UI.

shellArgs?: string | string[]

Args for the custom shell executable. A string can be used on Windows only which allows specifying shell args in command-line format.

shellIntegrationNonce?: string

The nonce to use to verify shell integration sequences are coming from a trusted source. An example impact of UX of this is if the command line is reported with a nonce, it will not need to verify with the user that the command line is correct before rerunning it via the shell integration command decoration.

This should be used if the terminal includes custom shell integration support. It should be set to a random GUID which will then set the `VSCODE_NONCE` environment variable. Inside the shell, this should then be removed from the environment so as to protect it from general access. Once that is done it can be passed through in the relevant sequences to make them trusted.

shellPath?: string

A path to a custom shell executable to be used in the terminal.

strictEnv?: boolean

Whether the terminal process environment should be exactly as provided in `TerminalOptions.env`. When this is false (default), the environment will be based on the window's environment and also apply configured platform settings like `terminal.integrated.env.windows` on top. When this is true, the complete environment must be provided as nothing will be inherited from the process or any configuration.

### TerminalProfile

A terminal profile defines how a terminal will be launched.

#### Constructors

new TerminalProfile(options: TerminalOptions | ExtensionTerminalOptions): TerminalProfile

Creates a new terminal profile.

Parameter

Description

options: TerminalOptions | ExtensionTerminalOptions

The options that the terminal will launch with.

Returns

Description

TerminalProfile

#### Properties

options: TerminalOptions | ExtensionTerminalOptions

The options that the terminal will launch with.

### TerminalProfileProvider

Provides a terminal profile for the contributed terminal profile when launched via the UI or command.

#### Methods

provideTerminalProfile(token: CancellationToken): ProviderResult<TerminalProfile>

Provide the terminal profile.

Parameter

Description

token: CancellationToken

A cancellation token that indicates the result is no longer needed.

Returns

Description

ProviderResult<TerminalProfile>

The terminal profile.

### TerminalShellExecution

A command that was executed in a terminal.

#### Properties

commandLine: TerminalShellExecutionCommandLine

The command line that was executed. The confidence of this value depends on the specific shell's shell integration implementation. This value may become more accurate after window.onDidEndTerminalShellExecution is fired.

**Example**

```
// Log the details of the command line on start and end
window.onDidStartTerminalShellExecution(event => {
  const commandLine = event.execution.commandLine;
  console.log(`Command started\n${summarizeCommandLine(commandLine)}`);
});
window.onDidEndTerminalShellExecution(event => {
  const commandLine = event.execution.commandLine;
  console.log(`Command ended\n${summarizeCommandLine(commandLine)}`);
});
function summarizeCommandLine(commandLine: TerminalShellExecutionCommandLine) {
  return [
    `  Command line: ${command.commandLine.value}`,
    `  Confidence: ${command.commandLine.confidence}`,
    `  Trusted: ${command.commandLine.isTrusted}
  ].join('\n');
}
```

cwd: Uri

The working directory that was reported by the shell when this command executed. This Uri may represent a file on another machine (eg. ssh into another machine). This requires the shell integration to support working directory reporting.

#### Methods

read(): AsyncIterable<string>

Creates a stream of raw data (including escape sequences) that is written to the terminal. This will only include data that was written after `read` was called for the first time, ie. you must call `read` immediately after the command is executed via TerminalShellIntegration.executeCommand or window.onDidStartTerminalShellExecution to not miss any data.

**Example**

```
// Log all data written to the terminal for a command
const command = term.shellIntegration.executeCommand({ commandLine: 'echo "Hello world"' });
const stream = command.read();
for await (const data of stream) {
  console.log(data);
}
```

Parameter

Description

Returns

Description

AsyncIterable<string>

### TerminalShellExecutionCommandLine

A command line that was executed in a terminal.

#### Properties

confidence: TerminalShellExecutionCommandLineConfidence

The confidence of the command line value which is determined by how the value was obtained. This depends upon the implementation of the shell integration script.

isTrusted: boolean

Whether the command line value came from a trusted source and is therefore safe to execute without user additional confirmation, such as a notification that asks "Do you want to execute (command)?". This verification is likely only needed if you are going to execute the command again.

This is `true` only when the command line was reported explicitly by the shell integration script (ie. high confidence) and it used a nonce for verification.

value: string

The full command line that was executed, including both the command and its arguments.

### TerminalShellExecutionCommandLineConfidence

The confidence of a TerminalShellExecutionCommandLine value.

#### Enumeration Members

Low: 0

The command line value confidence is low. This means that the value was read from the terminal buffer using markers reported by the shell integration script. Additionally one of the following conditions will be met:

*   The command started on the very left-most column which is unusual, or
*   The command is multi-line which is more difficult to accurately detect due to line continuation characters and right prompts.
*   Command line markers were not reported by the shell integration script.

Medium: 1

The command line value confidence is medium. This means that the value was read from the terminal buffer using markers reported by the shell integration script. The command is single-line and does not start on the very left-most column (which is unusual).

High: 2

The command line value confidence is high. This means that the value was explicitly sent from the shell integration script or the command was executed via the TerminalShellIntegration.executeCommand API.

### TerminalShellExecutionEndEvent

An event signalling that an execution has ended in a terminal.

#### Properties

execution: TerminalShellExecution

The terminal shell execution that has ended.

exitCode: number

The exit code reported by the shell.

When this is `undefined` it can mean several things:

*   The shell either did not report an exit code (ie. the shell integration script is misbehaving)
*   The shell reported a command started before the command finished (eg. a sub-shell was opened).
*   The user canceled the command via ctrl+c.
*   The user pressed enter when there was no input.

Generally this should not happen. Depending on the use case, it may be best to treat this as a failure.

**Example**

```
const execution = shellIntegration.executeCommand({
  command: 'echo',
  args: ['Hello world']
});
window.onDidEndTerminalShellExecution(event => {
  if (event.execution === execution) {
    if (event.exitCode === undefined) {
      console.log('Command finished but exit code is unknown');
    } else if (event.exitCode === 0) {
      console.log('Command succeeded');
    } else {
      console.log('Command failed');
    }
  }
});
```

shellIntegration: TerminalShellIntegration

The shell integration object.

terminal: Terminal

The terminal that shell integration has been activated in.

### TerminalShellExecutionStartEvent

An event signalling that an execution has started in a terminal.

#### Properties

execution: TerminalShellExecution

The terminal shell execution that has ended.

shellIntegration: TerminalShellIntegration

The shell integration object.

terminal: Terminal

The terminal that shell integration has been activated in.

### TerminalShellIntegration

Shell integration-powered capabilities owned by a terminal.

#### Properties

cwd: Uri

The current working directory of the terminal. This Uri may represent a file on another machine (eg. ssh into another machine). This requires the shell integration to support working directory reporting.

#### Methods

executeCommand(commandLine: string): TerminalShellExecution

Execute a command, sending ^C as necessary to interrupt any running command if needed.

*   _throws_ - When run on a terminal doesn't support this API, such as task terminals.

**Example**

```
// Execute a command in a terminal immediately after being created
const myTerm = window.createTerminal();
window.onDidChangeTerminalShellIntegration(async ({ terminal, shellIntegration }) => {
  if (terminal === myTerm) {
    const execution = shellIntegration.executeCommand('echo "Hello world"');
    window.onDidEndTerminalShellExecution(event => {
      if (event.execution === execution) {
        console.log(`Command exited with code ${event.exitCode}`);
      }
    });
  }
}));
// Fallback to sendText if there is no shell integration within 3 seconds of launching
setTimeout(() => {
  if (!myTerm.shellIntegration) {
    myTerm.sendText('echo "Hello world"');
    // Without shell integration, we can't know when the command has finished or what the
    // exit code was.
  }
}, 3000);
```

**Example**

```
// Send command to terminal that has been alive for a while
const commandLine = 'echo "Hello world"';
if (term.shellIntegration) {
  const execution = shellIntegration.executeCommand({ commandLine });
  window.onDidEndTerminalShellExecution(event => {
    if (event.execution === execution) {
      console.log(`Command exited with code ${event.exitCode}`);
    }
  });
} else {
  term.sendText(commandLine);
  // Without shell integration, we can't know when the command has finished or what the
  // exit code was.
}
```

Parameter

Description

commandLine: string

The command line to execute, this is the exact text that will be sent to the terminal.

Returns

Description

TerminalShellExecution

executeCommand(executable: string, args: string[]): TerminalShellExecution

Execute a command, sending ^C as necessary to interrupt any running command if needed.

_Note_ This is not guaranteed to work as shell integration must be activated. Check whether TerminalShellExecution.exitCode is rejected to verify whether it was successful.

**Example**

```
// Execute a command in a terminal immediately after being created
const myTerm = window.createTerminal();
window.onDidChangeTerminalShellIntegration(async ({ terminal, shellIntegration }) => {
  if (terminal === myTerm) {
    const command = shellIntegration.executeCommand({
      command: 'echo',
      args: ['Hello world']
    });
    const code = await command.exitCode;
    console.log(`Command exited with code ${code}`);
  }
}));
// Fallback to sendText if there is no shell integration within 3 seconds of launching
setTimeout(() => {
  if (!myTerm.shellIntegration) {
    myTerm.sendText('echo "Hello world"');
    // Without shell integration, we can't know when the command has finished or what the
    // exit code was.
  }
}, 3000);
```

**Example**

```
// Send command to terminal that has been alive for a while
const commandLine = 'echo "Hello world"';
if (term.shellIntegration) {
  const command = term.shellIntegration.executeCommand({
    command: 'echo',
    args: ['Hello world']
  });
  const code = await command.exitCode;
  console.log(`Command exited with code ${code}`);
} else {
  term.sendText(commandLine);
  // Without shell integration, we can't know when the command has finished or what the
  // exit code was.
}
```

Parameter

Description

executable: string

A command to run.

args: string[]

Arguments to launch the executable with. The arguments will be escaped such that they are interpreted as single arguments when the argument both contains whitespace and does not include any single quote, double quote or backtick characters.

Note that this escaping is not intended to be a security measure, be careful when passing untrusted data to this API as strings like `$(...)` can often be used in shells to execute code within a string.

Returns

Description

TerminalShellExecution

### TerminalShellIntegrationChangeEvent

An event signalling that a terminal's shell integration has changed.

#### Properties

shellIntegration: TerminalShellIntegration

The shell integration object.

terminal: Terminal

The terminal that shell integration has been activated in.

### TerminalSplitLocationOptions

Uses the parent Terminal's location for the terminal

#### Properties

parentTerminal: Terminal

The parent terminal to split this terminal beside. This works whether the parent terminal is in the panel or the editor area.

### TerminalState

Represents the state of a Terminal.

#### Properties

isInteractedWith: boolean

Whether the Terminal has been interacted with. Interaction means that the terminal has sent data to the process which depending on the terminal's _mode_. By default input is sent when a key is pressed or when a command or extension sends text, but based on the terminal's mode it can also happen on:

*   a pointer click event
*   a pointer scroll event
*   a pointer move event
*   terminal focus in/out

For more information on events that can send data see "DEC Private Mode Set (DECSET)" on https://invisible-island.net/xterm/ctlseqs/ctlseqs.html

shell: string

The detected shell type of the Terminal. This will be `undefined` when there is not a clear signal as to what the shell is, or the shell is not supported yet. This value should change to the shell type of a sub-shell when launched (for example, running `bash` inside `zsh`).

Note that the possible values are currently defined as any of the following: 'bash', 'cmd', 'csh', 'fish', 'gitbash', 'julia', 'ksh', 'node', 'nu', 'pwsh', 'python', 'sh', 'wsl', 'xonsh', 'zsh'.

### TestController

Entry point to discover and execute tests. It contains TestController.items which are used to populate the editor UI, and is associated with run profiles to allow for tests to be executed.

#### Properties

id: string

The id of the controller passed in tests.createTestController. This must be globally unique.

items: TestItemCollection

A collection of "top-level" TestItem instances, which can in turn have their own children to form the "test tree."

The extension controls when to add tests. For example, extensions should add tests for a file when workspace.onDidOpenTextDocument fires in order for decorations for tests within a file to be visible.

However, the editor may sometimes explicitly request children using the resolveHandler See the documentation on that method for more details.

label: string

Human-readable label for the test controller.

refreshHandler: (token: CancellationToken) => void | Thenable<void>

If this method is present, a refresh button will be present in the UI, and this method will be invoked when it's clicked. When called, the extension should scan the workspace for any new, changed, or removed tests.

It's recommended that extensions try to update tests in realtime, using a FileSystemWatcher for example, and use this method as a fallback.

Parameter

Description

token: CancellationToken

Returns

Description

void | Thenable<void>

A thenable that resolves when tests have been refreshed.

resolveHandler?: (item: TestItem) => void | Thenable<void>

A function provided by the extension that the editor may call to request children of a test item, if the TestItem.canResolveChildren is `true`. When called, the item should discover children and call TestController.createTestItem as children are discovered.

Generally the extension manages the lifecycle of test items, but under certain conditions the editor may request the children of a specific item to be loaded. For example, if the user requests to re-run tests after reloading the editor, the editor may need to call this method to resolve the previously-run tests.

The item in the explorer will automatically be marked as "busy" until the function returns or the returned thenable resolves.

Parameter

Description

item: TestItem

An unresolved test item for which children are being requested, or `undefined` to resolve the controller's initial items.

Returns

Description

void | Thenable<void>

#### Methods

createRunProfile(label: string, kind: TestRunProfileKind, runHandler: (request: TestRunRequest, token: CancellationToken) => void | Thenable<void>, isDefault?: boolean, tag?: TestTag, supportsContinuousRun?: boolean): TestRunProfile

Creates a profile used for running tests. Extensions must create at least one profile in order for tests to be run.

Parameter

Description

label: string

A human-readable label for this profile.

kind: TestRunProfileKind

Configures what kind of execution this profile manages.

runHandler: (request: TestRunRequest, token: CancellationToken) => void | Thenable<void>

Function called to start a test run.

isDefault?: boolean

Whether this is the default action for its kind.

tag?: TestTag

Profile test tag.

supportsContinuousRun?: boolean

Whether the profile supports continuous running.

Returns

Description

TestRunProfile

An instance of a TestRunProfile, which is automatically associated with this controller.

createTestItem(id: string, label: string, uri?: Uri): TestItem

Creates a new managed TestItem instance. It can be added into the TestItem.children of an existing item, or into the TestController.items.

Parameter

Description

id: string

Identifier for the TestItem. The test item's ID must be unique in the TestItemCollection it's added to.

label: string

Human-readable label of the test item.

uri?: Uri

URI this TestItem is associated with. May be a file or directory.

Returns

Description

TestItem

createTestRun(request: TestRunRequest, name?: string, persist?: boolean): TestRun

Creates a TestRun. This should be called by the TestRunProfile when a request is made to execute tests, and may also be called if a test run is detected externally. Once created, tests that are included in the request will be moved into the queued state.

All runs created using the same `request` instance will be grouped together. This is useful if, for example, a single suite of tests is run on multiple platforms.

Parameter

Description

request: TestRunRequest

Test run request. Only tests inside the `include` may be modified, and tests in its `exclude` are ignored.

name?: string

The human-readable name of the run. This can be used to disambiguate multiple sets of results in a test run. It is useful if tests are run across multiple platforms, for example.

persist?: boolean

Whether the results created by the run should be persisted in the editor. This may be false if the results are coming from a file already saved externally, such as a coverage information file.

Returns

Description

TestRun

An instance of the TestRun. It will be considered "running" from the moment this method is invoked until TestRun.end is called.

dispose(): void

Unregisters the test controller, disposing of its associated tests and unpersisted results.

Parameter

Description

Returns

Description

void

invalidateTestResults(items?: TestItem | readonly TestItem[]): void

Marks an item's results as being outdated. This is commonly called when code or configuration changes and previous results should no longer be considered relevant. The same logic used to mark results as outdated may be used to drive continuous test runs.

If an item is passed to this method, test results for the item and all of its children will be marked as outdated. If no item is passed, then all test owned by the TestController will be marked as outdated.

Any test runs started before the moment this method is called, including runs which may still be ongoing, will be marked as outdated and deprioritized in the editor's UI.

Parameter

Description

items?: TestItem | readonly TestItem[]

Item to mark as outdated. If undefined, all the controller's items are marked outdated.

Returns

Description

void

### TestCoverageCount

A class that contains information about a covered resource. A count can be give for lines, branches, and declarations in a file.

#### Constructors

new TestCoverageCount(covered: number, total: number): TestCoverageCount

Parameter

Description

covered: number

Value for TestCoverageCount.covered

total: number

Value for TestCoverageCount.total

Returns

Description

TestCoverageCount

#### Properties

covered: number

Number of items covered in the file.

total: number

Total number of covered items in the file.

### TestItem

An item shown in the "test explorer" view.

A `TestItem` can represent either a test suite or a test itself, since they both have similar capabilities.

#### Properties

busy: boolean

Controls whether the item is shown as "busy" in the Test Explorer view. This is useful for showing status while discovering children.

Defaults to `false`.

canResolveChildren: boolean

Indicates whether this test item may have children discovered by resolving.

If true, this item is shown as expandable in the Test Explorer view and expanding the item will cause TestController.resolveHandler to be invoked with the item.

Default to `false`.

children: TestItemCollection

The children of this test item. For a test suite, this may contain the individual test cases or nested suites.

description?: string

Optional description that appears next to the label.

error: string | MarkdownString

Optional error encountered while loading the test.

Note that this is not a test result and should only be used to represent errors in test discovery, such as syntax errors.

id: string

Identifier for the `TestItem`. This is used to correlate test results and tests in the document with those in the workspace (test explorer). This cannot change for the lifetime of the `TestItem`, and must be unique among its parent's direct children.

label: string

Display name describing the test case.

parent: TestItem

The parent of this item. It's set automatically, and is undefined top-level items in the TestController.items and for items that aren't yet included in another item's children.

range: Range

Location of the test item in its uri.

This is only meaningful if the `uri` points to a file.

sortText?: string

A string that should be used when comparing this item with other items. When `falsy` the label is used.

tags: readonly TestTag[]

Tags associated with this test item. May be used in combination with tags, or simply as an organizational feature.

uri: Uri

URI this `TestItem` is associated with. May be a file or directory.

### TestItemCollection

Collection of test items, found in TestItem.children and TestController.items.

#### Properties

size: number

Gets the number of items in the collection.

#### Methods

add(item: TestItem): void

Adds the test item to the children. If an item with the same ID already exists, it'll be replaced.

Parameter

Description

item: TestItem

Item to add.

Returns

Description

void

delete(itemId: string): void

Removes a single test item from the collection.

Parameter

Description

itemId: string

Item ID to delete.

Returns

Description

void

forEach(callback: (item: TestItem, collection: TestItemCollection) => unknown, thisArg?: any): void

Iterate over each entry in this collection.

Parameter

Description

callback: (item: TestItem, collection: TestItemCollection) => unknown

Function to execute for each entry.

thisArg?: any

The `this` context used when invoking the handler function.

Returns

Description

void

get(itemId: string): TestItem

Efficiently gets a test item by ID, if it exists, in the children.

Parameter

Description

itemId: string

Item ID to get.

Returns

Description

TestItem

The found item or undefined if it does not exist.

replace(items: readonly TestItem[]): void

Replaces the items stored by the collection.

Parameter

Description

items: readonly TestItem[]

Items to store.

Returns

Description

void

### TestMessage

Message associated with the test state. Can be linked to a specific source range -- useful for assertion failures, for example.

#### Static

diff(message: string | MarkdownString, expected: string, actual: string): TestMessage

Creates a new TestMessage that will present as a diff in the editor.

Parameter

Description

message: string | MarkdownString

Message to display to the user.

expected: string

Expected output.

actual: string

Actual output.

Returns

Description

TestMessage

#### Constructors

new TestMessage(message: string | MarkdownString): TestMessage

Creates a new TestMessage instance.

Parameter

Description

message: string | MarkdownString

The message to show to the user.

Returns

Description

TestMessage

#### Properties

actualOutput?: string

Actual test output. If given with expectedOutput , a diff view will be shown.

contextValue?: string

Context value of the test item. This can be used to contribute message- specific actions to the test peek view. The value set here can be found in the `testMessage` property of the following `menus` contribution points:

*   `testing/message/context` - context menu for the message in the results tree
*   `testing/message/content` - a prominent button overlaying editor content where the message is displayed.

For example:

```
"contributes": {
  "menus": {
    "testing/message/content": [
      {
        "command": "extension.deleteCommentThread",
        "when": "testMessage == canApplyRichDiff"
      }
    ]
  }
}
```

The command will be called with an object containing:

*   `test`: the TestItem the message is associated with, _if_ it is still present in the TestController.items collection.
*   `message`: the TestMessage instance.

expectedOutput?: string

Expected test output. If given with actualOutput , a diff view will be shown.

location?: Location

Associated file location.

message: string | MarkdownString

Human-readable message text to display.

stackTrace?: TestMessageStackFrame[]

The stack trace associated with the message or failure.

### TestMessageStackFrame

A stack frame found in the TestMessage.stackTrace.

#### Constructors

new TestMessageStackFrame(label: string, uri?: Uri, position?: Position): TestMessageStackFrame

Parameter

Description

label: string

The name of the stack frame

uri?: Uri

position?: Position

The position of the stack frame within the file

Returns

Description

TestMessageStackFrame

#### Properties

label: string

The name of the stack frame, typically a method or function name.

position?: Position

Position of the stack frame within the file.

uri?: Uri

The location of this stack frame. This should be provided as a URI if the location of the call frame can be accessed by the editor.

### TestRun

A TestRun represents an in-progress or completed test run and provides methods to report the state of individual tests in the run.

#### Events

onDidDispose: Event<void>

An event fired when the editor is no longer interested in data associated with the test run.

#### Properties

isPersisted: boolean

Whether the test run will be persisted across reloads by the editor.

name: string

The human-readable name of the run. This can be used to disambiguate multiple sets of results in a test run. It is useful if tests are run across multiple platforms, for example.

token: CancellationToken

A cancellation token which will be triggered when the test run is canceled from the UI.

#### Methods

addCoverage(fileCoverage: FileCoverage): void

Adds coverage for a file in the run.

Parameter

Description

fileCoverage: FileCoverage

Returns

Description

void

appendOutput(output: string, location?: Location, test?: TestItem): void

Appends raw output from the test runner. On the user's request, the output will be displayed in a terminal. ANSI escape sequences, such as colors and text styles, are supported. New lines must be given as CRLF (`\r\n`) rather than LF (`\n`).

Parameter

Description

output: string

Output text to append.

location?: Location

Indicate that the output was logged at the given location.

test?: TestItem

Test item to associate the output with.

Returns

Description

void

end(): void

Signals the end of the test run. Any tests included in the run whose states have not been updated will have their state reset.

Parameter

Description

Returns

Description

void

enqueued(test: TestItem): void

Indicates a test is queued for later execution.

Parameter

Description

test: TestItem

Test item to update.

Returns

Description

void

errored(test: TestItem, message: TestMessage | readonly TestMessage[], duration?: number): void

Indicates a test has errored. You should pass one or more TestMessages to describe the failure. This differs from the "failed" state in that it indicates a test that couldn't be executed at all, from a compilation error for example.

Parameter

Description

test: TestItem

Test item to update.

message: TestMessage | readonly TestMessage[]

Messages associated with the test failure.

duration?: number

How long the test took to execute, in milliseconds.

Returns

Description

void

failed(test: TestItem, message: TestMessage | readonly TestMessage[], duration?: number): void

Indicates a test has failed. You should pass one or more TestMessages to describe the failure.

Parameter

Description

test: TestItem

Test item to update.

message: TestMessage | readonly TestMessage[]

Messages associated with the test failure.

duration?: number

How long the test took to execute, in milliseconds.

Returns

Description

void

passed(test: TestItem, duration?: number): void

Indicates a test has passed.

Parameter

Description

test: TestItem

Test item to update.

duration?: number

How long the test took to execute, in milliseconds.

Returns

Description

void

skipped(test: TestItem): void

Indicates a test has been skipped.

Parameter

Description

test: TestItem

Test item to update.

Returns

Description

void

started(test: TestItem): void

Indicates a test has started running.

Parameter

Description

test: TestItem

Test item to update.

Returns

Description

void

### TestRunProfile

A TestRunProfile describes one way to execute tests in a TestController.

#### Events

onDidChangeDefault: Event<boolean>

Fired when a user has changed whether this is a default profile. The event contains the new value of isDefault

#### Properties

configureHandler: () => void

If this method is present, a configuration gear will be present in the UI, and this method will be invoked when it's clicked. When called, you can take other editor actions, such as showing a quick pick or opening a configuration file.

Parameter

Description

Returns

Description

void

isDefault: boolean

Controls whether this profile is the default action that will be taken when its kind is actioned. For example, if the user clicks the generic "run all" button, then the default profile for TestRunProfileKind.Run will be executed, although the user can configure this.

Changes the user makes in their default profiles will be reflected in this property after a onDidChangeDefault event.

kind: TestRunProfileKind

Configures what kind of execution this profile controls. If there are no profiles for a kind, it will not be available in the UI.

label: string

Label shown to the user in the UI.

Note that the label has some significance if the user requests that tests be re-run in a certain way. For example, if tests were run normally and the user requests to re-run them in debug mode, the editor will attempt use a configuration with the same label of the `Debug` kind. If there is no such configuration, the default will be used.

loadDetailedCoverage?: (testRun: TestRun, fileCoverage: FileCoverage, token: CancellationToken) => Thenable<FileCoverageDetail[]>

An extension-provided function that provides detailed statement and function-level coverage for a file. The editor will call this when more detail is needed for a file, such as when it's opened in an editor or expanded in the **Test Coverage** view.

The FileCoverage object passed to this function is the same instance emitted on TestRun.addCoverage calls associated with this profile.

Parameter

Description

testRun: TestRun

fileCoverage: FileCoverage

token: CancellationToken

Returns

Description

Thenable<FileCoverageDetail[]>

loadDetailedCoverageForTest?: (testRun: TestRun, fileCoverage: FileCoverage, fromTestItem: TestItem, token: CancellationToken) => Thenable<FileCoverageDetail[]>

An extension-provided function that provides detailed statement and function-level coverage for a single test in a file. This is the per-test sibling of TestRunProfile.loadDetailedCoverage, called only if a test item is provided in FileCoverage.includesTests and only for files where such data is reported.

Often TestRunProfile.loadDetailedCoverage will be called first when a user opens a file, and then this method will be called if they drill down into specific per-test coverage information. This method should then return coverage data only for statements and declarations executed by the specific test during the run.

The FileCoverage object passed to this function is the same instance emitted on TestRun.addCoverage calls associated with this profile.

Parameter

Description

testRun: TestRun

The test run that generated the coverage data.

fileCoverage: FileCoverage

The file coverage object to load detailed coverage for.

fromTestItem: TestItem

The test item to request coverage information for.

token: CancellationToken

A cancellation token that indicates the operation should be cancelled.

Returns

Description

Thenable<FileCoverageDetail[]>

runHandler: (request: TestRunRequest, token: CancellationToken) => void | Thenable<void>

Handler called to start a test run. When invoked, the function should call TestController.createTestRun at least once, and all test runs associated with the request should be created before the function returns or the returned promise is resolved.

If supportsContinuousRun is set, then TestRunRequest.continuous may be `true`. In this case, the profile should observe changes to source code and create new test runs by calling TestController.createTestRun, until the cancellation is requested on the `token`.

Parameter

Description

request: TestRunRequest

Request information for the test run.

token: CancellationToken

Returns

Description

void | Thenable<void>

supportsContinuousRun: boolean

Whether this profile supports continuous running of requests. If so, then TestRunRequest.continuous may be set to `true`. Defaults to false.

tag: TestTag

Associated tag for the profile. If this is set, only TestItem instances with the same tag will be eligible to execute in this profile.

#### Methods

dispose(): void

Deletes the run profile.

Parameter

Description

Returns

Description

void

### TestRunProfileKind

The kind of executions that TestRunProfiles control.

#### Enumeration Members

Run: 1

The `Run` test profile kind.

Debug: 2

The `Debug` test profile kind.

Coverage: 3

The `Coverage` test profile kind.

### TestRunRequest

A TestRunRequest is a precursor to a TestRun, which in turn is created by passing a request to TestController.createTestRun. The TestRunRequest contains information about which tests should be run, which should not be run, and how they are run (via the profile).

In general, TestRunRequests are created by the editor and pass to TestRunProfile.runHandler, however you can also create test requests and runs outside of the `runHandler`.

#### Constructors

new TestRunRequest(include?: readonly TestItem[], exclude?: readonly TestItem[], profile?: TestRunProfile, continuous?: boolean, preserveFocus?: boolean): TestRunRequest

Parameter

Description

include?: readonly TestItem[]

Array of specific tests to run, or undefined to run all tests

exclude?: readonly TestItem[]

An array of tests to exclude from the run.

profile?: TestRunProfile

The run profile used for this request.

continuous?: boolean

Whether to run tests continuously as source changes.

preserveFocus?: boolean

Whether to preserve the user's focus when the run is started

Returns

Description

TestRunRequest

#### Properties

continuous?: boolean

Whether the profile should run continuously as source code changes. Only relevant for profiles that set TestRunProfile.supportsContinuousRun.

exclude: readonly TestItem[]

An array of tests the user has marked as excluded from the test included in this run; exclusions should apply after inclusions.

May be omitted if no exclusions were requested. Test controllers should not run excluded tests or any children of excluded tests.

include: readonly TestItem[]

A filter for specific tests to run. If given, the extension should run all of the included tests and all their children, excluding any tests that appear in TestRunRequest.exclude. If this property is undefined, then the extension should simply run all tests.

The process of running tests should resolve the children of any test items who have not yet been resolved.

preserveFocus: boolean

Controls how test Test Results view is focused. If true, the editor will keep the maintain the user's focus. If false, the editor will prefer to move focus into the Test Results view, although this may be configured by users.

profile: TestRunProfile

The profile used for this request. This will always be defined for requests issued from the editor UI, though extensions may programmatically create requests not associated with any profile.

### TestTag

Tags can be associated with TestItems and TestRunProfiles. A profile with a tag can only execute tests that include that tag in their TestItem.tags array.

#### Constructors

new TestTag(id: string): TestTag

Creates a new TestTag instance.

Parameter

Description

id: string

ID of the test tag.

Returns

Description

TestTag

#### Properties

id: string

ID of the test tag. `TestTag` instances with the same ID are considered to be identical.

### TextDocument

Represents a text document, such as a source file. Text documents have lines and knowledge about an underlying resource like a file.

#### Properties

encoding: string

The file encoding of this document that will be used when the document is saved.

Use the onDidChangeTextDocument-event to get notified when the document encoding changes.

Note that the possible encoding values are currently defined as any of the following: 'utf8', 'utf8bom', 'utf16le', 'utf16be', 'windows1252', 'iso88591', 'iso88593', 'iso885915', 'macroman', 'cp437', 'windows1256', 'iso88596', 'windows1257', 'iso88594', 'iso885914', 'windows1250', 'iso88592', 'cp852', 'windows1251', 'cp866', 'cp1125', 'iso88595', 'koi8r', 'koi8u', 'iso885913', 'windows1253', 'iso88597', 'windows1255', 'iso88598', 'iso885910', 'iso885916', 'windows1254', 'iso88599', 'windows1258', 'gbk', 'gb18030', 'cp950', 'big5hkscs', 'shiftjis', 'eucjp', 'euckr', 'windows874', 'iso885911', 'koi8ru', 'koi8t', 'gb2312', 'cp865', 'cp850', 'cp857'.

eol: EndOfLine

The end of line sequence that is predominately used in this document.

fileName: string

The file system path of the associated resource. Shorthand notation for TextDocument.uri.fsPath. Independent of the uri scheme.

isClosed: boolean

`true` if the document has been closed. A closed document isn't synchronized anymore and won't be re-used when the same resource is opened again.

isDirty: boolean

`true` if there are unpersisted changes.

isUntitled: boolean

Is this document representing an untitled file which has never been saved yet. _Note_ that this does not mean the document will be saved to disk, use Uri.scheme to figure out where a document will be saved, e.g. `file`, `ftp` etc.

languageId: string

The identifier of the language associated with this document.

lineCount: number

The number of lines in this document.

uri: Uri

The associated uri for this document.

_Note_ that most documents use the `file`-scheme, which means they are files on disk. However, **not** all documents are saved on disk and therefore the `scheme` must be checked before trying to access the underlying file or siblings on disk.

_See also_

*   FileSystemProvider
*   TextDocumentContentProvider

version: number

The version number of this document (it will strictly increase after each change, including undo/redo).

#### Methods

getText(range?: Range): string

Get the text of this document. A substring can be retrieved by providing a range. The range will be adjusted.

Parameter

Description

range?: Range

Include only the text included by the range.

Returns

Description

string

The text inside the provided range or the entire text.

getWordRangeAtPosition(position: Position, regex?: RegExp): Range

Get a word-range at the given position. By default words are defined by common separators, like space, -, _, etc. In addition, per language custom [word definitions] can be defined. It is also possible to provide a custom regular expression.

*   _Note 1:_ A custom regular expression must not match the empty string and if it does, it will be ignored.
*   _Note 2:_ A custom regular expression will fail to match multiline strings and in the name of speed regular expressions should not match words with spaces. Use TextLine.text for more complex, non-wordy, scenarios.

The position will be adjusted.

Parameter

Description

position: Position

A position.

regex?: RegExp

Optional regular expression that describes what a word is.

Returns

Description

Range

A range spanning a word, or `undefined`.

lineAt(line: number): TextLine

Returns a text line denoted by the line number. Note that the returned object is _not_ live and changes to the document are not reflected.

Parameter

Description

line: number

A line number in `[0, lineCount)`.

Returns

Description

TextLine

A line.

lineAt(position: Position): TextLine

Returns a text line denoted by the position. Note that the returned object is _not_ live and changes to the document are not reflected.

The position will be adjusted.

_See also_ TextDocument.lineAt

Parameter

Description

position: Position

A position.

Returns

Description

TextLine

A line.

offsetAt(position: Position): number

Converts the position to a zero-based offset.

The position will be adjusted.

Parameter

Description

position: Position

A position.

Returns

Description

number

A valid zero-based offset in UTF-16 code units.

positionAt(offset: number): Position

Converts a zero-based offset to a position.

Parameter

Description

offset: number

A zero-based offset into the document. This offset is in UTF-16 code units.

Returns

Description

Position

A valid Position.

save(): Thenable<boolean>

Save the underlying file.

Parameter

Description

Returns

Description

Thenable<boolean>

A promise that will resolve to `true` when the file has been saved. If the save failed, will return `false`.

validatePosition(position: Position): Position

Ensure a position is contained in the range of this document.

Parameter

Description

position: Position

A position.

Returns

Description

Position

The given position or a new, adjusted position.

validateRange(range: Range): Range

Ensure a range is completely contained in this document.

Parameter

Description

range: Range

A range.

Returns

Description

Range

The given range or a new, adjusted range.

### TextDocumentChangeEvent

An event describing a transactional document change.

#### Properties

contentChanges: readonly TextDocumentContentChangeEvent[]

An array of content changes.

document: TextDocument

The affected document.

reason: TextDocumentChangeReason

The reason why the document was changed. Is `undefined` if the reason is not known.

### TextDocumentChangeReason

Reasons for why a text document has changed.

#### Enumeration Members

Undo: 1

The text change is caused by an undo operation.

Redo: 2

The text change is caused by an redo operation.

### TextDocumentContentChangeEvent

An event describing an individual change in the text of a document.

#### Properties

range: Range

The range that got replaced.

rangeLength: number

The length of the range that got replaced.

rangeOffset: number

The offset of the range that got replaced.

text: string

The new text for the range.

### TextDocumentContentProvider

A text document content provider allows to add readonly documents to the editor, such as source from a dll or generated html from md.

Content providers are registered for a uri-scheme. When a uri with that scheme is to be loaded the content provider is asked.

#### Events

onDidChange?: Event<Uri>

An event to signal a resource has changed.

#### Methods

provideTextDocumentContent(uri: Uri, token: CancellationToken): ProviderResult<string>

Provide textual content for a given uri.

The editor will use the returned string-content to create a readonly document. Resources allocated should be released when the corresponding document has been closed.

**Note**: The contents of the created document might not be identical to the provided text due to end-of-line-sequence normalization.

Parameter

Description

uri: Uri

An uri which scheme matches the scheme this provider was registered for.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<string>

A string or a thenable that resolves to such.

### TextDocumentSaveReason

Represents reasons why a text document is saved.

#### Enumeration Members

Manual: 1

Manually triggered, e.g. by the user pressing save, by starting debugging, or by an API call.

AfterDelay: 2

Automatic after a delay.

FocusOut: 3

When the editor lost focus.

### TextDocumentShowOptions

Represents options to configure the behavior of showing a document in an editor.

#### Properties

preserveFocus?: boolean

An optional flag that when `true` will stop the editor from taking focus.

preview?: boolean

An optional flag that controls if an editor-tab shows as preview. Preview tabs will be replaced and reused until set to stay - either explicitly or through editing.

_Note_ that the flag is ignored if a user has disabled preview editors in settings.

selection?: Range

An optional selection to apply for the document in the editor.

viewColumn?: ViewColumn

An optional view column in which the editor should be shown. The default is the active. Columns that do not exist will be created as needed up to the maximum of ViewColumn.Nine. Use ViewColumn.Beside to open the editor to the side of the currently active one.

### TextDocumentWillSaveEvent

An event that is fired when a document will be saved.

To make modifications to the document before it is being saved, call the waitUntil-function with a thenable that resolves to an array of text edits.

#### Properties

document: TextDocument

The document that will be saved.

reason: TextDocumentSaveReason

The reason why save was triggered.

#### Methods

waitUntil(thenable: Thenable<readonly TextEdit[]>): void

Allows to pause the event loop and to apply pre-save-edits. Edits of subsequent calls to this function will be applied in order. The edits will be _ignored_ if concurrent modifications of the document happened.

_Note:_ This function can only be called during event dispatch and not in an asynchronous manner:

```
workspace.onWillSaveTextDocument(event => {
  // async, will *throw* an error
  setTimeout(() => event.waitUntil(promise));

  // sync, OK
  event.waitUntil(promise);
});
```

Parameter

Description

thenable: Thenable<readonly TextEdit[]>

A thenable that resolves to pre-save-edits.

Returns

Description

void

waitUntil(thenable: Thenable<any>): void

Allows to pause the event loop until the provided thenable resolved.

_Note:_ This function can only be called during event dispatch.

Parameter

Description

thenable: Thenable<any>

A thenable that delays saving.

Returns

Description

void

### TextEdit

A text edit represents edits that should be applied to a document.

#### Static

delete(range: Range): TextEdit

Utility to create a delete edit.

Parameter

Description

range: Range

A range.

Returns

Description

TextEdit

A new text edit object.

insert(position: Position, newText: string): TextEdit

Utility to create an insert edit.

Parameter

Description

position: Position

A position, will become an empty range.

newText: string

A string.

Returns

Description

TextEdit

A new text edit object.

replace(range: Range, newText: string): TextEdit

Utility to create a replace edit.

Parameter

Description

range: Range

A range.

newText: string

A string.

Returns

Description

TextEdit

A new text edit object.

setEndOfLine(eol: EndOfLine): TextEdit

Utility to create an eol-edit.

Parameter

Description

eol: EndOfLine

An eol-sequence

Returns

Description

TextEdit

A new text edit object.

#### Constructors

new TextEdit(range: Range, newText: string): TextEdit

Create a new TextEdit.

Parameter

Description

range: Range

A range.

newText: string

A string.

Returns

Description

TextEdit

#### Properties

newEol?: EndOfLine

The eol-sequence used in the document.

_Note_ that the eol-sequence will be applied to the whole document.

newText: string

The string this edit will insert.

range: Range

The range this edit applies to.

### TextEditor

Represents an editor that is attached to a document.

#### Properties

document: TextDocument

The document associated with this text editor. The document will be the same for the entire lifetime of this text editor.

options: TextEditorOptions

Text editor options.

selection: Selection

The primary selection on this text editor. Shorthand for `TextEditor.selections[0]`.

selections: readonly Selection[]

The selections in this text editor. The primary selection is always at index 0.

viewColumn: ViewColumn

The column in which this editor shows. Will be `undefined` in case this isn't one of the main editors, e.g. an embedded editor, or when the editor column is larger than three.

visibleRanges: readonly Range[]

The current visible ranges in the editor (vertically). This accounts only for vertical scrolling, and not for horizontal scrolling.

#### Methods

edit(callback: (editBuilder: TextEditorEdit) => void, options?: {undoStopAfter: boolean, undoStopBefore: boolean}): Thenable<boolean>

Perform an edit on the document associated with this text editor.

The given callback-function is invoked with an edit-builder which must be used to make edits. Note that the edit-builder is only valid while the callback executes.

Parameter

Description

callback: (editBuilder: TextEditorEdit) => void

A function which can create edits using an edit-builder.

options?: {undoStopAfter: boolean, undoStopBefore: boolean}

The undo/redo behavior around this edit. By default, undo stops will be created before and after this edit.

Returns

Description

Thenable<boolean>

A promise that resolves with a value indicating if the edits could be applied.

hide(): void

Hide the text editor.

*   _deprecated_ - Use the command `workbench.action.closeActiveEditor` instead. This method shows unexpected behavior and will be removed in the next major update.

Parameter

Description

Returns

Description

void

insertSnippet(snippet: SnippetString, location?: Range | Position | readonly Range[] | readonly Position[], options?: {keepWhitespace: boolean, undoStopAfter: boolean, undoStopBefore: boolean}): Thenable<boolean>

Insert a snippet and put the editor into snippet mode. "Snippet mode" means the editor adds placeholders and additional cursors so that the user can complete or accept the snippet.

Parameter

Description

snippet: SnippetString

The snippet to insert in this edit.

location?: Range | Position | readonly Range[] | readonly Position[]

Position or range at which to insert the snippet, defaults to the current editor selection or selections.

options?: {keepWhitespace: boolean, undoStopAfter: boolean, undoStopBefore: boolean}

The undo/redo behavior around this edit. By default, undo stops will be created before and after this edit.

Returns

Description

Thenable<boolean>

A promise that resolves with a value indicating if the snippet could be inserted. Note that the promise does not signal that the snippet is completely filled-in or accepted.

revealRange(range: Range, revealType?: TextEditorRevealType): void

Scroll as indicated by `revealType` in order to reveal the given range.

Parameter

Description

range: Range

A range.

revealType?: TextEditorRevealType

The scrolling strategy for revealing `range`.

Returns

Description

void

setDecorations(decorationType: TextEditorDecorationType, rangesOrOptions: readonly Range[] | readonly DecorationOptions[]): void

Adds a set of decorations to the text editor. If a set of decorations already exists with the given decoration type, they will be replaced. If `rangesOrOptions` is empty, the existing decorations with the given decoration type will be removed.

_See also_ createTextEditorDecorationType.

Parameter

Description

decorationType: TextEditorDecorationType

A decoration type.

rangesOrOptions: readonly Range[] | readonly DecorationOptions[]

Either ranges or more detailed options.

Returns

Description

void

show(column?: ViewColumn): void

Show the text editor.

*   _deprecated_ - Use window.showTextDocument instead.

Parameter

Description

column?: ViewColumn

The column in which to show this editor. This method shows unexpected behavior and will be removed in the next major update.

Returns

Description

void

### TextEditorCursorStyle

Rendering style of the cursor.

#### Enumeration Members

Line: 1

Render the cursor as a vertical thick line.

Block: 2

Render the cursor as a block filled.

Underline: 3

Render the cursor as a thick horizontal line.

LineThin: 4

Render the cursor as a vertical thin line.

BlockOutline: 5

Render the cursor as a block outlined.

UnderlineThin: 6

Render the cursor as a thin horizontal line.

### TextEditorDecorationType

Represents a handle to a set of decorations sharing the same styling options in a text editor.

To get an instance of a `TextEditorDecorationType` use createTextEditorDecorationType.

#### Properties

key: string

Internal representation of the handle.

#### Methods

dispose(): void

Remove this decoration type and all decorations on all text editors using it.

Parameter

Description

Returns

Description

void

### TextEditorEdit

A complex edit that will be applied in one transaction on a TextEditor. This holds a description of the edits and if the edits are valid (i.e. no overlapping regions, document was not changed in the meantime, etc.) they can be applied on a document associated with a text editor.

#### Methods

delete(location: Range | Selection): void

Delete a certain text region.

Parameter

Description

location: Range | Selection

The range this operation should remove.

Returns

Description

void

insert(location: Position, value: string): void

Insert text at a location. You can use `\r\n` or `\n` in `value` and they will be normalized to the current document. Although the equivalent text edit can be made with replace, `insert` will produce a different resulting selection (it will get moved).

Parameter

Description

location: Position

The position where the new text should be inserted.

value: string

The new text this operation should insert.

Returns

Description

void

replace(location: Range | Position | Selection, value: string): void

Replace a certain text region with a new value. You can use `\r\n` or `\n` in `value` and they will be normalized to the current document.

Parameter

Description

location: Range | Position | Selection

The range this operation should remove.

value: string

The new text this operation should insert after removing `location`.

Returns

Description

void

setEndOfLine(endOfLine: EndOfLine): void

Set the end of line sequence.

Parameter

Description

endOfLine: EndOfLine

The new end of line for the document.

Returns

Description

void

### TextEditorLineNumbersStyle

Rendering style of the line numbers.

#### Enumeration Members

Off: 0

Do not render the line numbers.

On: 1

Render the line numbers.

Relative: 2

Render the line numbers with values relative to the primary cursor location.

Interval: 3

Render the line numbers on every 10th line number.

### TextEditorOptions

Represents a text editor's options.

#### Properties

cursorStyle?: TextEditorCursorStyle

The rendering style of the cursor in this editor. When getting a text editor's options, this property will always be present. When setting a text editor's options, this property is optional.

indentSize?: string | number

The number of spaces to insert when insertSpaces is true.

When getting a text editor's options, this property will always be a number (resolved). When setting a text editor's options, this property is optional and it can be a number or `"tabSize"`.

insertSpaces?: string | boolean

When pressing Tab insert n spaces. When getting a text editor's options, this property will always be a boolean (resolved). When setting a text editor's options, this property is optional and it can be a boolean or `"auto"`.

lineNumbers?: TextEditorLineNumbersStyle

Render relative line numbers w.r.t. the current line number. When getting a text editor's options, this property will always be present. When setting a text editor's options, this property is optional.

tabSize?: string | number

The size in spaces a tab takes. This is used for two purposes:

*   the rendering width of a tab character;
*   the number of spaces to insert when insertSpaces is true and `indentSize` is set to `"tabSize"`.

When getting a text editor's options, this property will always be a number (resolved). When setting a text editor's options, this property is optional and it can be a number or `"auto"`.

### TextEditorOptionsChangeEvent

Represents an event describing the change in a text editor's options.

#### Properties

options: TextEditorOptions

The new value for the text editor's options.

textEditor: TextEditor

The text editor for which the options have changed.

### TextEditorRevealType

Represents different reveal strategies in a text editor.

#### Enumeration Members

Default: 0

The range will be revealed with as little scrolling as possible.

InCenter: 1

The range will always be revealed in the center of the viewport.

InCenterIfOutsideViewport: 2

If the range is outside the viewport, it will be revealed in the center of the viewport. Otherwise, it will be revealed with as little scrolling as possible.

AtTop: 3

The range will always be revealed at the top of the viewport.

### TextEditorSelectionChangeEvent

Represents an event describing the change in a text editor's selections.

#### Properties

kind: TextEditorSelectionChangeKind

The change kind which has triggered this event. Can be `undefined`.

selections: readonly Selection[]

The new value for the text editor's selections.

textEditor: TextEditor

The text editor for which the selections have changed.

### TextEditorSelectionChangeKind

Represents sources that can cause selection change events.

#### Enumeration Members

Keyboard: 1

Selection changed due to typing in the editor.

Mouse: 2

Selection change due to clicking in the editor.

Command: 3

Selection changed because a command ran.

### TextEditorViewColumnChangeEvent

Represents an event describing the change of a text editor's view column.

#### Properties

textEditor: TextEditor

The text editor for which the view column has changed.

viewColumn: ViewColumn

The new value for the text editor's view column.

### TextEditorVisibleRangesChangeEvent

Represents an event describing the change in a text editor's visible ranges.

#### Properties

textEditor: TextEditor

The text editor for which the visible ranges have changed.

visibleRanges: readonly Range[]

The new value for the text editor's visible ranges.

### TextLine

Represents a line of text, such as a line of source code.

TextLine objects are **immutable**. When a document changes, previously retrieved lines will not represent the latest state.

#### Properties

firstNonWhitespaceCharacterIndex: number

The offset of the first character which is not a whitespace character as defined by `/\s/`. **Note** that if a line is all whitespace the length of the line is returned.

isEmptyOrWhitespace: boolean

Whether this line is whitespace only, shorthand for TextLine.firstNonWhitespaceCharacterIndex === TextLine.text.length.

lineNumber: number

The zero-based line number.

range: Range

The range this line covers without the line separator characters.

rangeIncludingLineBreak: Range

The range this line covers with the line separator characters.

text: string

The text of this line without the line separator characters.

### ThemableDecorationAttachmentRenderOptions

Represents theme specific rendering styles for before and after the content of text decorations.

#### Properties

backgroundColor?: string | ThemeColor

CSS styling property that will be applied to the decoration attachment.

border?: string

CSS styling property that will be applied to the decoration attachment.

borderColor?: string | ThemeColor

CSS styling property that will be applied to text enclosed by a decoration.

color?: string | ThemeColor

CSS styling property that will be applied to the decoration attachment.

contentIconPath?: string | Uri

An **absolute path** or an URI to an image to be rendered in the attachment. Either an icon or a text can be shown, but not both.

contentText?: string

Defines a text content that is shown in the attachment. Either an icon or a text can be shown, but not both.

fontStyle?: string

CSS styling property that will be applied to the decoration attachment.

fontWeight?: string

CSS styling property that will be applied to the decoration attachment.

height?: string

CSS styling property that will be applied to the decoration attachment.

margin?: string

CSS styling property that will be applied to the decoration attachment.

textDecoration?: string

CSS styling property that will be applied to the decoration attachment.

width?: string

CSS styling property that will be applied to the decoration attachment.

### ThemableDecorationInstanceRenderOptions

Represents themable render options for decoration instances.

#### Properties

after?: ThemableDecorationAttachmentRenderOptions

Defines the rendering options of the attachment that is inserted after the decorated text.

before?: ThemableDecorationAttachmentRenderOptions

Defines the rendering options of the attachment that is inserted before the decorated text.

### ThemableDecorationRenderOptions

Represents theme specific rendering styles for a text editor decoration.

#### Properties

after?: ThemableDecorationAttachmentRenderOptions

Defines the rendering options of the attachment that is inserted after the decorated text.

backgroundColor?: string | ThemeColor

Background color of the decoration. Use rgba() and define transparent background colors to play well with other decorations. Alternatively a color from the color registry can be referenced.

before?: ThemableDecorationAttachmentRenderOptions

Defines the rendering options of the attachment that is inserted before the decorated text.

border?: string

CSS styling property that will be applied to text enclosed by a decoration.

borderColor?: string | ThemeColor

CSS styling property that will be applied to text enclosed by a decoration. Better use 'border' for setting one or more of the individual border properties.

borderRadius?: string

CSS styling property that will be applied to text enclosed by a decoration. Better use 'border' for setting one or more of the individual border properties.

borderSpacing?: string

CSS styling property that will be applied to text enclosed by a decoration. Better use 'border' for setting one or more of the individual border properties.

borderStyle?: string

CSS styling property that will be applied to text enclosed by a decoration. Better use 'border' for setting one or more of the individual border properties.

borderWidth?: string

CSS styling property that will be applied to text enclosed by a decoration. Better use 'border' for setting one or more of the individual border properties.

color?: string | ThemeColor

CSS styling property that will be applied to text enclosed by a decoration.

cursor?: string

CSS styling property that will be applied to text enclosed by a decoration.

fontStyle?: string

CSS styling property that will be applied to text enclosed by a decoration.

fontWeight?: string

CSS styling property that will be applied to text enclosed by a decoration.

gutterIconPath?: string | Uri

An **absolute path** or an URI to an image to be rendered in the gutter.

gutterIconSize?: string

Specifies the size of the gutter icon. Available values are 'auto', 'contain', 'cover' and any percentage value. For further information: https://msdn.microsoft.com/en-us/library/jj127316(v=vs.85).aspx

letterSpacing?: string

CSS styling property that will be applied to text enclosed by a decoration.

opacity?: string

CSS styling property that will be applied to text enclosed by a decoration.

outline?: string

CSS styling property that will be applied to text enclosed by a decoration.

outlineColor?: string | ThemeColor

CSS styling property that will be applied to text enclosed by a decoration. Better use 'outline' for setting one or more of the individual outline properties.

outlineStyle?: string

CSS styling property that will be applied to text enclosed by a decoration. Better use 'outline' for setting one or more of the individual outline properties.

outlineWidth?: string

CSS styling property that will be applied to text enclosed by a decoration. Better use 'outline' for setting one or more of the individual outline properties.

overviewRulerColor?: string | ThemeColor

The color of the decoration in the overview ruler. Use rgba() and define transparent colors to play well with other decorations.

textDecoration?: string

CSS styling property that will be applied to text enclosed by a decoration.

### ThemeColor

A reference to one of the workbench colors as defined in https://code.visualstudio.com/api/references/theme-color. Using a theme color is preferred over a custom color as it gives theme authors and users the possibility to change the color.

#### Constructors

new ThemeColor(id: string): ThemeColor

Creates a reference to a theme color.

Parameter

Description

id: string

of the color. The available colors are listed in https://code.visualstudio.com/api/references/theme-color.

Returns

Description

ThemeColor

#### Properties

id: string

The id of this color.

### ThemeIcon

A reference to a named icon. Currently, File, Folder, and ThemeIcon ids are supported. Using a theme icon is preferred over a custom icon as it gives product theme authors the possibility to change the icons.

_Note_ that theme icons can also be rendered inside labels and descriptions. Places that support theme icons spell this out and they use the `$(<name>)`-syntax, for instance `quickPick.label = "Hello World $(globe)"`.

#### Static

File: ThemeIcon

Reference to an icon representing a file. The icon is taken from the current file icon theme or a placeholder icon is used.

Folder: ThemeIcon

Reference to an icon representing a folder. The icon is taken from the current file icon theme or a placeholder icon is used.

#### Constructors

new ThemeIcon(id: string, color?: ThemeColor): ThemeIcon

Creates a reference to a theme icon.

Parameter

Description

id: string

id of the icon. The available icons are listed in https://code.visualstudio.com/api/references/icons-in-labels#icon-listing.

color?: ThemeColor

optional `ThemeColor` for the icon. The color is currently only used in TreeItem.

Returns

Description

ThemeIcon

#### Properties

color?: ThemeColor

The optional ThemeColor of the icon. The color is currently only used in TreeItem.

id: string

The id of the icon. The available icons are listed in https://code.visualstudio.com/api/references/icons-in-labels#icon-listing.

### TreeCheckboxChangeEvent<T>

An event describing the change in a tree item's checkbox state.

#### Properties

items: ReadonlyArray<[T, TreeItemCheckboxState]>

The items that were checked or unchecked.

### TreeDataProvider<T>

A data provider that provides tree data

#### Events

onDidChangeTreeData?: Event<void | T | T[]>

An optional event to signal that an element or root has changed. This will trigger the view to update the changed element/root and its children recursively (if shown). To signal that root has changed, do not pass any argument or pass `undefined` or `null`.

#### Methods

getChildren(element?: T): ProviderResult<T[]>

Get the children of `element` or root if no element is passed.

_Note:_ The result is not mutated by the API consumer; readonly arrays may be cast to `T[]`.

Parameter

Description

element?: T

The element from which the provider gets children. Can be `undefined`.

Returns

Description

ProviderResult<T[]>

Children of `element` or root if no element is passed.

getParent(element: T): ProviderResult<T>

Optional method to return the parent of `element`. Return `null` or `undefined` if `element` is a child of root.

**NOTE:** This method should be implemented in order to access reveal API.

Parameter

Description

element: T

The element for which the parent has to be returned.

Returns

Description

ProviderResult<T>

Parent of `element`.

getTreeItem(element: T): TreeItem | Thenable<TreeItem>

Get TreeItem representation of the `element`

Parameter

Description

element: T

The element for which TreeItem representation is asked for.

Returns

Description

TreeItem | Thenable<TreeItem>

TreeItem representation of the element.

resolveTreeItem(item: TreeItem, element: T, token: CancellationToken): ProviderResult<TreeItem>

Called on hover to resolve the TreeItem property if it is undefined. Called on tree item click/open to resolve the TreeItem property if it is undefined. Only properties that were undefined can be resolved in `resolveTreeItem`. Functionality may be expanded later to include being called to resolve other missing properties on selection and/or on open.

Will only ever be called once per TreeItem.

onDidChangeTreeData should not be triggered from within resolveTreeItem.

_Note_ that this function is called when tree items are already showing in the UI. Because of that, no property that changes the presentation (label, description, etc.) can be changed.

Parameter

Description

item: TreeItem

Undefined properties of `item` should be set then `item` should be returned.

element: T

The object associated with the TreeItem.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<TreeItem>

The resolved tree item or a thenable that resolves to such. It is OK to return the given `item`. When no result is returned, the given `item` will be used.

### TreeDragAndDropController<T>

Provides support for drag and drop in `TreeView`.

#### Properties

dragMimeTypes: readonly string[]

The mime types that the `handleDrag` method of this `TreeDragAndDropController` may add to the tree data transfer. This could be well-defined, existing, mime types, and also mime types defined by the extension.

The recommended mime type of the tree (`application/vnd.code.tree.<treeidlowercase>`) will be automatically added.

dropMimeTypes: readonly string[]

The mime types that the `handleDrop` method of this `DragAndDropController` supports. This could be well-defined, existing, mime types, and also mime types defined by the extension.

To support drops from trees, you will need to add the mime type of that tree. This includes drops from within the same tree. The mime type of a tree is recommended to be of the format `application/vnd.code.tree.<treeidlowercase>`.

Use the special `files` mime type to support all types of dropped files files, regardless of the file's actual mime type.

To learn the mime type of a dragged item:

1.  Set up your `DragAndDropController`
2.  Use the Developer: Set Log Level... command to set the level to "Debug"
3.  Open the developer tools and drag the item with unknown mime type over your tree. The mime types will be logged to the developer console

Note that mime types that cannot be sent to the extension will be omitted.

#### Methods

handleDrag(source: readonly T[], dataTransfer: DataTransfer, token: CancellationToken): void | Thenable<void>

When the user starts dragging items from this `DragAndDropController`, `handleDrag` will be called. Extensions can use `handleDrag` to add their `DataTransferItem` items to the drag and drop.

Mime types added in `handleDrag` won't be available outside the application.

When the items are dropped on **another tree item** in **the same tree**, your `DataTransferItem` objects will be preserved. Use the recommended mime type for the tree (`application/vnd.code.tree.<treeidlowercase>`) to add tree objects in a data transfer. See the documentation for `DataTransferItem` for how best to take advantage of this.

To add a data transfer item that can be dragged into the editor, use the application specific mime type "text/uri-list". The data for "text/uri-list" should be a string with `toString()`ed Uris separated by `\r\n`. To specify a cursor position in the file, set the Uri's fragment to `L3,5`, where 3 is the line number and 5 is the column number.

Parameter

Description

source: readonly T[]

The source items for the drag and drop operation.

dataTransfer: DataTransfer

The data transfer associated with this drag.

token: CancellationToken

A cancellation token indicating that drag has been cancelled.

Returns

Description

void | Thenable<void>

handleDrop(target: T, dataTransfer: DataTransfer, token: CancellationToken): void | Thenable<void>

Called when a drag and drop action results in a drop on the tree that this `DragAndDropController` belongs to.

Extensions should fire onDidChangeTreeData for any elements that need to be refreshed.

Parameter

Description

target: T

The target tree element that the drop is occurring on. When undefined, the target is the root.

dataTransfer: DataTransfer

The data transfer items of the source of the drag.

token: CancellationToken

A cancellation token indicating that the drop has been cancelled.

Returns

Description

void | Thenable<void>

### TreeItem

A tree item is an UI element of the tree. Tree items are created by the data provider.

#### Constructors

new TreeItem(label: string | TreeItemLabel, collapsibleState?: TreeItemCollapsibleState): TreeItem

Parameter

Description

label: string | TreeItemLabel

A human-readable string describing this item

collapsibleState?: TreeItemCollapsibleState

TreeItemCollapsibleState of the tree item. Default is TreeItemCollapsibleState.None

Returns

Description

TreeItem

new TreeItem(resourceUri: Uri, collapsibleState?: TreeItemCollapsibleState): TreeItem

Parameter

Description

resourceUri: Uri

The Uri of the resource representing this item.

collapsibleState?: TreeItemCollapsibleState

TreeItemCollapsibleState of the tree item. Default is TreeItemCollapsibleState.None

Returns

Description

TreeItem

#### Properties

accessibilityInformation?: AccessibilityInformation

Accessibility information used when screen reader interacts with this tree item. Generally, a TreeItem has no need to set the `role` of the accessibilityInformation; however, there are cases where a TreeItem is not displayed in a tree-like way where setting the `role` may make sense.

checkboxState?: TreeItemCheckboxState | {accessibilityInformation: AccessibilityInformation, state: TreeItemCheckboxState, tooltip: string}

TreeItemCheckboxState of the tree item. onDidChangeTreeData should be fired when checkboxState changes.

collapsibleState?: TreeItemCollapsibleState

TreeItemCollapsibleState of the tree item.

command?: Command

The Command that should be executed when the tree item is selected.

Please use `vscode.open` or `vscode.diff` as command IDs when the tree item is opening something in the editor. Using these commands ensures that the resulting editor will appear consistent with how other built-in trees open editors.

contextValue?: string

Context value of the tree item. This can be used to contribute item specific actions in the tree. For example, a tree item is given a context value as `folder`. When contributing actions to `view/item/context` using `menus` extension point, you can specify context value for key `viewItem` in `when` expression like `viewItem == folder`.

```
"contributes": {
  "menus": {
    "view/item/context": [
      {
        "command": "extension.deleteFolder",
        "when": "viewItem == folder"
      }
    ]
  }
}
```

This will show action `extension.deleteFolder` only for items with `contextValue` is `folder`.

description?: string | boolean

A human-readable string which is rendered less prominent. When `true`, it is derived from resourceUri and when `falsy`, it is not shown.

iconPath?: string | IconPath

The icon path or ThemeIcon for the tree item. When `falsy`, Folder Theme Icon is assigned, if item is collapsible otherwise File Theme Icon. When a file or folder ThemeIcon is specified, icon is derived from the current file icon theme for the specified theme icon using resourceUri (if provided).

id?: string

Optional id for the tree item that has to be unique across tree. The id is used to preserve the selection and expansion state of the tree item.

If not provided, an id is generated using the tree item's label. **Note** that when labels change, ids will change and that selection and expansion state cannot be kept stable anymore.

label?: string | TreeItemLabel

A human-readable string describing this item. When `falsy`, it is derived from resourceUri.

resourceUri?: Uri

A Uri representing the resource associated with this item.

When set, this property is used to automatically derive several item properties if they are not explicitly provided:

*   **Label**: Derived from the resource's file name when label is not provided.
*   **Description**: Derived from the resource's path when description is set to `true`.
*   **Icon**: Derived from the current file icon theme when iconPath is set to ThemeIcon.File or ThemeIcon.Folder.

tooltip?: string | MarkdownString

The tooltip text when you hover over this item.

### TreeItemCheckboxState

Checkbox state of the tree item

#### Enumeration Members

Unchecked: 0

Determines an item is unchecked

Checked: 1

Determines an item is checked

### TreeItemCollapsibleState

Collapsible state of the tree item

#### Enumeration Members

None: 0

Determines an item can be neither collapsed nor expanded. Implies it has no children.

Collapsed: 1

Determines an item is collapsed

Expanded: 2

Determines an item is expanded

### TreeItemLabel

Label describing the Tree item

#### Properties

highlights?: Array<[number, number]>

Ranges in the label to highlight. A range is defined as a tuple of two number where the first is the inclusive start index and the second the exclusive end index

label: string

A human-readable string describing the Tree item.

### TreeView<T>

Represents a Tree view

#### Events

onDidChangeCheckboxState: Event<TreeCheckboxChangeEvent<T>>

An event to signal that an element or root has either been checked or unchecked.

onDidChangeSelection: Event<TreeViewSelectionChangeEvent<T>>

Event that is fired when the selection has changed

onDidChangeVisibility: Event<TreeViewVisibilityChangeEvent>

Event that is fired when visibility has changed

onDidCollapseElement: Event<TreeViewExpansionEvent<T>>

Event that is fired when an element is collapsed

onDidExpandElement: Event<TreeViewExpansionEvent<T>>

Event that is fired when an element is expanded

#### Properties

badge?: ViewBadge

The badge to display for this TreeView. To remove the badge, set to undefined.

description?: string

An optional human-readable description which is rendered less prominently in the title of the view. Setting the title description to null, undefined, or empty string will remove the description from the view.

message?: string

An optional human-readable message that will be rendered in the view. Setting the message to null, undefined, or empty string will remove the message from the view.

selection: readonly T[]

Currently selected elements.

title?: string

The tree view title is initially taken from the extension package.json Changes to the title property will be properly reflected in the UI in the title of the view.

visible: boolean

`true` if the tree view is visible otherwise `false`.

#### Methods

dispose(): any

Dispose this object.

Parameter

Description

Returns

Description

any

reveal(element: T, options?: {expand: number | boolean, focus: boolean, select: boolean}): Thenable<void>

Reveals the given element in the tree view. If the tree view is not visible then the tree view is shown and element is revealed.

By default revealed element is selected. In order to not to select, set the option `select` to `false`. In order to focus, set the option `focus` to `true`. In order to expand the revealed element, set the option `expand` to `true`. To expand recursively set `expand` to the number of levels to expand.

*   _NOTE:_ You can expand only to 3 levels maximum.
*   _NOTE:_ The TreeDataProvider that the `TreeView` is registered with with must implement getParent method to access this API.

Parameter

Description

element: T

options?: {expand: number | boolean, focus: boolean, select: boolean}

Returns

Description

Thenable<void>

### TreeViewExpansionEvent<T>

The event that is fired when an element in the TreeView is expanded or collapsed

#### Properties

element: T

Element that is expanded or collapsed.

### TreeViewOptions<T>

Options for creating a TreeView

#### Properties

canSelectMany?: boolean

Whether the tree supports multi-select. When the tree supports multi-select and a command is executed from the tree, the first argument to the command is the tree item that the command was executed on and the second argument is an array containing all selected tree items.

dragAndDropController?: TreeDragAndDropController<T>

An optional interface to implement drag and drop in the tree view.

manageCheckboxStateManually?: boolean

By default, when the children of a tree item have already been fetched, child checkboxes are automatically managed based on the checked state of the parent tree item. If the tree item is collapsed by default (meaning that the children haven't yet been fetched) then child checkboxes will not be updated. To override this behavior and manage child and parent checkbox state in the extension, set this to `true`.

Examples where TreeViewOptions.manageCheckboxStateManually is false, the default behavior:

1.  A tree item is checked, then its children are fetched. The children will be checked.
    
2.  A tree item's parent is checked. The tree item and all of it's siblings will be checked.
    

*    Parent
    *    Child 1
    *    Child 2 When the user checks Parent, the tree will look like this:
*    Parent
    *    Child 1
    *    Child 2

3.  A tree item and all of it's siblings are checked. The parent will be checked.

*    Parent
    *    Child 1
    *    Child 2 When the user checks Child 1 and Child 2, the tree will look like this:
*    Parent
    *    Child 1
    *    Child 2

4.  A tree item is unchecked. The parent will be unchecked.

*    Parent
    *    Child 1
    *    Child 2 When the user unchecks Child 1, the tree will look like this:
*    Parent
    *    Child 1
    *    Child 2

showCollapseAll?: boolean

Whether to show collapse all action or not.

treeDataProvider: TreeDataProvider<T>

A data provider that provides tree data.

### TreeViewSelectionChangeEvent<T>

The event that is fired when there is a change in tree view's selection

#### Properties

selection: readonly T[]

Selected elements.

### TreeViewVisibilityChangeEvent

The event that is fired when there is a change in tree view's visibility

#### Properties

visible: boolean

`true` if the tree view is visible otherwise `false`.

### TypeDefinitionProvider

The type definition provider defines the contract between extensions and the go to type definition feature.

#### Methods

provideTypeDefinition(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Definition | LocationLink[]>

Provide the type definition of the symbol at the given position and document.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<Definition | LocationLink[]>

A definition or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

### TypeHierarchyItem

Represents an item of a type hierarchy, like a class or an interface.

#### Constructors

new TypeHierarchyItem(kind: SymbolKind, name: string, detail: string, uri: Uri, range: Range, selectionRange: Range): TypeHierarchyItem

Creates a new type hierarchy item.

Parameter

Description

kind: SymbolKind

The kind of the item.

name: string

The name of the item.

detail: string

The details of the item.

uri: Uri

The Uri of the item.

range: Range

The whole range of the item.

selectionRange: Range

The selection range of the item.

Returns

Description

TypeHierarchyItem

#### Properties

detail?: string

More detail for this item, e.g. the signature of a function.

kind: SymbolKind

The kind of this item.

name: string

The name of this item.

range: Range

The range enclosing this symbol not including leading/trailing whitespace but everything else, e.g. comments and code.

selectionRange: Range

The range that should be selected and revealed when this symbol is being picked, e.g. the name of a class. Must be contained by the range-property.

tags?: readonly SymbolTag[]

Tags for this item.

uri: Uri

The resource identifier of this item.

### TypeHierarchyProvider

The type hierarchy provider interface describes the contract between extensions and the type hierarchy feature.

#### Methods

prepareTypeHierarchy(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<TypeHierarchyItem | TypeHierarchyItem[]>

Bootstraps type hierarchy by returning the item that is denoted by the given document and position. This item will be used as entry into the type graph. Providers should return `undefined` or `null` when there is no item at the given location.

Parameter

Description

document: TextDocument

The document in which the command was invoked.

position: Position

The position at which the command was invoked.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<TypeHierarchyItem | TypeHierarchyItem[]>

One or multiple type hierarchy items or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

provideTypeHierarchySubtypes(item: TypeHierarchyItem, token: CancellationToken): ProviderResult<TypeHierarchyItem[]>

Provide all subtypes for an item, e.g all types which are derived/inherited from the given item. In graph terms this describes directed and annotated edges inside the type graph, e.g the given item is the starting node and the result is the nodes that can be reached.

Parameter

Description

item: TypeHierarchyItem

The hierarchy item for which subtypes should be computed.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<TypeHierarchyItem[]>

A set of direct subtypes or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

provideTypeHierarchySupertypes(item: TypeHierarchyItem, token: CancellationToken): ProviderResult<TypeHierarchyItem[]>

Provide all supertypes for an item, e.g all types from which a type is derived/inherited. In graph terms this describes directed and annotated edges inside the type graph, e.g the given item is the starting node and the result is the nodes that can be reached.

Parameter

Description

item: TypeHierarchyItem

The hierarchy item for which super types should be computed.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<TypeHierarchyItem[]>

A set of direct supertypes or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined` or `null`.

### UIKind

Possible kinds of UI that can use extensions.

#### Enumeration Members

Desktop: 1

Extensions are accessed from a desktop application.

Web: 2

Extensions are accessed from a web browser.

### Uri

A universal resource identifier representing either a file on disk or another resource, like untitled resources.

#### Static

file(path: string): Uri

Create an URI from a file system path. The scheme will be `file`.

The _difference_ between Uri.parse and Uri.file is that the latter treats the argument as path, not as stringified-uri. E.g. `Uri.file(path)` is _not_ the same as `Uri.parse('file://' + path)` because the path might contain characters that are interpreted (# and ?). See the following sample:

```
const good = URI.file('/coding/c#/project1');
good.scheme === 'file';
good.path === '/coding/c#/project1';
good.fragment === '';

const bad = URI.parse('file://' + '/coding/c#/project1');
bad.scheme === 'file';
bad.path === '/coding/c'; // path is now broken
bad.fragment === '/project1';
```

Parameter

Description

path: string

A file system or UNC path.

Returns

Description

Uri

A new Uri instance.

from(components: {authority: string, fragment: string, path: string, query: string, scheme: string}): Uri

Create an URI from its component parts

_See also_ Uri.toString

Parameter

Description

components: {authority: string, fragment: string, path: string, query: string, scheme: string}

The component parts of an Uri.

Returns

Description

Uri

A new Uri instance.

joinPath(base: Uri, ...pathSegments: string[]): Uri

Create a new uri which path is the result of joining the path of the base uri with the provided path segments.

*   Note 1: `joinPath` only affects the path component and all other components (scheme, authority, query, and fragment) are left as they are.
*   Note 2: The base uri must have a path; an error is thrown otherwise.

The path segments are normalized in the following ways:

*   sequences of path separators (`/` or `\`) are replaced with a single separator
*   for `file`-uris on windows, the backslash-character (``) is considered a path-separator
*   the `..`-segment denotes the parent segment, the `.` denotes the current segment
*   paths have a root which always remains, for instance on windows drive-letters are roots so that is true: `joinPath(Uri.file('file:///c:/root'), '../../other').fsPath === 'c:/other'`

Parameter

Description

base: Uri

An uri. Must have a path.

...pathSegments: string[]

One more more path fragments

Returns

Description

Uri

A new uri which path is joined with the given fragments

parse(value: string, strict?: boolean): Uri

Create an URI from a string, e.g. `http://www.example.com/some/path`, `file:///usr/home`, or `scheme:with/path`.

_Note_ that for a while uris without a `scheme` were accepted. That is not correct as all uris should have a scheme. To avoid breakage of existing code the optional `strict`-argument has been added. We _strongly_ advise to use it, e.g. `Uri.parse('my:uri', true)`

_See also_ Uri.toString

Parameter

Description

value: string

The string value of an Uri.

strict?: boolean

Throw an error when `value` is empty or when no `scheme` can be parsed.

Returns

Description

Uri

A new Uri instance.

#### Constructors

new Uri(scheme: string, authority: string, path: string, query: string, fragment: string): Uri

Use the `file` and `parse` factory functions to create new `Uri` objects.

Parameter

Description

scheme: string

authority: string

path: string

query: string

fragment: string

Returns

Description

Uri

#### Properties

authority: string

Authority is the `www.example.com` part of `http://www.example.com/some/path?query#fragment`. The part between the first double slashes and the next slash.

fragment: string

Fragment is the `fragment` part of `http://www.example.com/some/path?query#fragment`.

fsPath: string

The string representing the corresponding file system path of this Uri.

Will handle UNC paths and normalize windows drive letters to lower-case. Also uses the platform specific path separator.

*   Will _not_ validate the path for invalid characters and semantics.
*   Will _not_ look at the scheme of this Uri.
*   The resulting string shall _not_ be used for display purposes but for disk operations, like `readFile` et al.

The _difference_ to the path-property is the use of the platform specific path separator and the handling of UNC paths. The sample below outlines the difference:

```
const u = URI.parse('file://server/c$/folder/file.txt');
u.authority === 'server';
u.path === '/c$/folder/file.txt';
u.fsPath === '\\serverc$\folder\file.txt';
```

path: string

Path is the `/some/path` part of `http://www.example.com/some/path?query#fragment`.

query: string

Query is the `query` part of `http://www.example.com/some/path?query#fragment`.

scheme: string

Scheme is the `http` part of `http://www.example.com/some/path?query#fragment`. The part before the first colon.

#### Methods

toJSON(): any

Returns a JSON representation of this Uri.

Parameter

Description

Returns

Description

any

An object.

toString(skipEncoding?: boolean): string

Returns a string representation of this Uri. The representation and normalization of a URI depends on the scheme.

*   The resulting string can be safely used with Uri.parse.
*   The resulting string shall _not_ be used for display purposes.

_Note_ that the implementation will encode _aggressive_ which often leads to unexpected, but not incorrect, results. For instance, colons are encoded to `%3A` which might be unexpected in file-uri. Also `&` and `=` will be encoded which might be unexpected for http-uris. For stability reasons this cannot be changed anymore. If you suffer from too aggressive encoding you should use the `skipEncoding`-argument: `uri.toString(true)`.

Parameter

Description

skipEncoding?: boolean

Do not percentage-encode the result, defaults to `false`. Note that the `#` and `?` characters occurring in the path will always be encoded.

Returns

Description

string

A string representation of this Uri.

with(change: {authority: string, fragment: string, path: string, query: string, scheme: string}): Uri

Derive a new Uri from this Uri.

```
let file = Uri.parse('before:some/file/path');
let other = file.with({ scheme: 'after' });
assert.ok(other.toString() === 'after:some/file/path');
```

Parameter

Description

change: {authority: string, fragment: string, path: string, query: string, scheme: string}

An object that describes a change to this Uri. To unset components use `null` or the empty string.

Returns

Description

Uri

A new Uri that reflects the given change. Will return `this` Uri if the change is not changing anything.

### UriHandler

A uri handler is responsible for handling system-wide uris.

_See also_ window.registerUriHandler.

#### Methods

handleUri(uri: Uri): ProviderResult<void>

Handle the provided system-wide Uri.

_See also_ window.registerUriHandler.

Parameter

Description

uri: Uri

Returns

Description

ProviderResult<void>

### ViewBadge

A badge presenting a value for a view

#### Properties

tooltip: string

A label to present in tooltip for the badge.

value: number

The value to present in the badge.

### ViewColumn

Denotes a location of an editor in the window. Editors can be arranged in a grid and each column represents one editor location in that grid by counting the editors in order of their appearance.

#### Enumeration Members

Beside: -2

A _symbolic_ editor column representing the column to the side of the active one. This value can be used when opening editors, but the _resolved_ viewColumn-value of editors will always be `One`, `Two`, `Three`,... or `undefined` but never `Beside`.

Active: -1

A _symbolic_ editor column representing the currently active column. This value can be used when opening editors, but the _resolved_ viewColumn-value of editors will always be `One`, `Two`, `Three`,... or `undefined` but never `Active`.

One: 1

The first editor column.

Two: 2

The second editor column.

Three: 3

The third editor column.

Four: 4

The fourth editor column.

Five: 5

The fifth editor column.

Six: 6

The sixth editor column.

Seven: 7

The seventh editor column.

Eight: 8

The eighth editor column.

Nine: 9

The ninth editor column.

### Webview

Displays html content, similarly to an iframe.

#### Events

onDidReceiveMessage: Event<any>

Fired when the webview content posts a message.

Webview content can post strings or json serializable objects back to an extension. They cannot post `Blob`, `File`, `ImageData` and other DOM specific objects since the extension that receives the message does not run in a browser environment.

#### Properties

cspSource: string

Content security policy source for webview resources.

This is the origin that should be used in a content security policy rule:

```
`img-src https: ${webview.cspSource} ...;`;
```

html: string

HTML contents of the webview.

This should be a complete, valid html document. Changing this property causes the webview to be reloaded.

Webviews are sandboxed from normal extension process, so all communication with the webview must use message passing. To send a message from the extension to the webview, use postMessage. To send message from the webview back to an extension, use the `acquireVsCodeApi` function inside the webview to get a handle to the editor's api and then call `.postMessage()`:

```
<script>
    const vscode = acquireVsCodeApi(); // acquireVsCodeApi can only be invoked once
    vscode.postMessage({ message: 'hello!' });
</script>
```

To load a resources from the workspace inside a webview, use the asWebviewUri method and ensure the resource's directory is listed in WebviewOptions.localResourceRoots.

Keep in mind that even though webviews are sandboxed, they still allow running scripts and loading arbitrary content, so extensions must follow all standard web security best practices when working with webviews. This includes properly sanitizing all untrusted input (including content from the workspace) and setting a content security policy.

options: WebviewOptions

Content settings for the webview.

#### Methods

asWebviewUri(localResource: Uri): Uri

Convert a uri for the local file system to one that can be used inside webviews.

Webviews cannot directly load resources from the workspace or local file system using `file:` uris. The `asWebviewUri` function takes a local `file:` uri and converts it into a uri that can be used inside of a webview to load the same resource:

```
webview.html = `<img src="${webview.asWebviewUri(
  vscode.Uri.file('/Users/codey/workspace/cat.gif')
)}">`;
```

Parameter

Description

localResource: Uri

Returns

Description

Uri

postMessage(message: any): Thenable<boolean>

Post a message to the webview content.

Messages are only delivered if the webview is live (either visible or in the background with `retainContextWhenHidden`).

Parameter

Description

message: any

Body of the message. This must be a string or other json serializable object.

For older versions of vscode, if an `ArrayBuffer` is included in `message`, it will not be serialized properly and will not be received by the webview. Similarly any TypedArrays, such as a `Uint8Array`, will be very inefficiently serialized and will also not be recreated as a typed array inside the webview.

However if your extension targets vscode 1.57+ in the `engines` field of its `package.json`, any `ArrayBuffer` values that appear in `message` will be more efficiently transferred to the webview and will also be correctly recreated inside of the webview.

Returns

Description

Thenable<boolean>

A promise that resolves when the message is posted to a webview or when it is dropped because the message was not deliverable.

Returns `true` if the message was posted to the webview. Messages can only be posted to live webviews (i.e. either visible webviews or hidden webviews that set `retainContextWhenHidden`).

A response of `true` does not mean that the message was actually received by the webview. For example, no message listeners may be have been hooked up inside the webview or the webview may have been destroyed after the message was posted but before it was received.

If you want confirm that a message as actually received, you can try having your webview posting a confirmation message back to your extension.

### WebviewOptions

Content settings for a webview.

#### Properties

enableCommandUris?: boolean | readonly string[]

Controls whether command uris are enabled in webview content or not.

Defaults to `false` (command uris are disabled).

If you pass in an array, only the commands in the array are allowed.

enableForms?: boolean

Controls whether forms are enabled in the webview content or not.

Defaults to true if scripts are enabled. Otherwise defaults to false. Explicitly setting this property to either true or false overrides the default.

enableScripts?: boolean

Controls whether scripts are enabled in the webview content or not.

Defaults to false (scripts-disabled).

localResourceRoots?: readonly Uri[]

Root paths from which the webview can load local (filesystem) resources using uris from `asWebviewUri`

Default to the root folders of the current workspace plus the extension's install directory.

Pass in an empty array to disallow access to any local resources.

portMapping?: readonly WebviewPortMapping[]

Mappings of localhost ports used inside the webview.

Port mapping allow webviews to transparently define how localhost ports are resolved. This can be used to allow using a static localhost port inside the webview that is resolved to random port that a service is running on.

If a webview accesses localhost content, we recommend that you specify port mappings even if the `webviewPort` and `extensionHostPort` ports are the same.

_Note_ that port mappings only work for `http` or `https` urls. Websocket urls (e.g. `ws://localhost:3000`) cannot be mapped to another port.

### WebviewPanel

A panel that contains a Webview.

#### Events

onDidChangeViewState: Event<WebviewPanelOnDidChangeViewStateEvent>

Fired when the panel's view state changes.

onDidDispose: Event<void>

Fired when the panel is disposed.

This may be because the user closed the panel or because dispose was called on it.

Trying to use the panel after it has been disposed throws an exception.

#### Properties

active: boolean

Whether the panel is active (focused by the user).

iconPath?: IconPath

Icon for the panel shown in UI.

options: WebviewPanelOptions

Content settings for the webview panel.

title: string

Title of the panel shown in UI.

viewColumn: ViewColumn

Editor position of the panel. This property is only set if the webview is in one of the editor view columns.

viewType: string

Identifies the type of the webview panel, such as `'markdown.preview'`.

visible: boolean

Whether the panel is visible.

webview: Webview

Webview belonging to the panel.

#### Methods

dispose(): any

Dispose of the webview panel.

This closes the panel if it showing and disposes of the resources owned by the webview. Webview panels are also disposed when the user closes the webview panel. Both cases fire the onDidDispose event.

Parameter

Description

Returns

Description

any

reveal(viewColumn?: ViewColumn, preserveFocus?: boolean): void

Show the webview panel in a given column.

A webview panel may only show in a single column at a time. If it is already showing, this method moves it to a new column.

Parameter

Description

viewColumn?: ViewColumn

View column to show the panel in. Shows in the current WebviewPanel.viewColumn if undefined.

preserveFocus?: boolean

When `true`, the webview will not take focus.

Returns

Description

void

### WebviewPanelOnDidChangeViewStateEvent

Event fired when a webview panel's view state changes.

#### Properties

webviewPanel: WebviewPanel

WebviewPanel whose view state changed.

### WebviewPanelOptions

Content settings for a webview panel.

#### Properties

enableFindWidget?: boolean

Controls if the find widget is enabled in the panel.

Defaults to `false`.

retainContextWhenHidden?: boolean

Controls if the webview panel's content (iframe) is kept around even when the panel is no longer visible.

Normally the webview panel's html context is created when the panel becomes visible and destroyed when it is hidden. Extensions that have complex state or UI can set the `retainContextWhenHidden` to make the editor keep the webview context around, even when the webview moves to a background tab. When a webview using `retainContextWhenHidden` becomes hidden, its scripts and other dynamic content are suspended. When the panel becomes visible again, the context is automatically restored in the exact same state it was in originally. You cannot send messages to a hidden webview, even with `retainContextWhenHidden` enabled.

`retainContextWhenHidden` has a high memory overhead and should only be used if your panel's context cannot be quickly saved and restored.

### WebviewPanelSerializer<T>

Restore webview panels that have been persisted when vscode shuts down.

There are two types of webview persistence:

*   Persistence within a session.
*   Persistence across sessions (across restarts of the editor).

A `WebviewPanelSerializer` is only required for the second case: persisting a webview across sessions.

Persistence within a session allows a webview to save its state when it becomes hidden and restore its content from this state when it becomes visible again. It is powered entirely by the webview content itself. To save off a persisted state, call `acquireVsCodeApi().setState()` with any json serializable object. To restore the state again, call `getState()`

```
// Within the webview
const vscode = acquireVsCodeApi();

// Get existing state
const oldState = vscode.getState() || { value: 0 };

// Update state
setState({ value: oldState.value + 1 });
```

A `WebviewPanelSerializer` extends this persistence across restarts of the editor. When the editor is shutdown, it will save off the state from `setState` of all webviews that have a serializer. When the webview first becomes visible after the restart, this state is passed to `deserializeWebviewPanel`. The extension can then restore the old `WebviewPanel` from this state.

#### Methods

deserializeWebviewPanel(webviewPanel: WebviewPanel, state: T): Thenable<void>

Restore a webview panel from its serialized `state`.

Called when a serialized webview first becomes visible.

Parameter

Description

webviewPanel: WebviewPanel

Webview panel to restore. The serializer should take ownership of this panel. The serializer must restore the webview's `.html` and hook up all webview events.

state: T

Persisted state from the webview content.

Returns

Description

Thenable<void>

Thenable indicating that the webview has been fully restored.

### WebviewPortMapping

Defines a port mapping used for localhost inside the webview.

#### Properties

extensionHostPort: number

Destination port. The `webviewPort` is resolved to this port.

webviewPort: number

Localhost port to remap inside the webview.

### WebviewView

A webview based view.

#### Events

onDidChangeVisibility: Event<void>

Event fired when the visibility of the view changes.

Actions that trigger a visibility change:

*   The view is collapsed or expanded.
*   The user switches to a different view group in the sidebar or panel.

Note that hiding a view using the context menu instead disposes of the view and fires `onDidDispose`.

onDidDispose: Event<void>

Event fired when the view is disposed.

Views are disposed when they are explicitly hidden by a user (this happens when a user right clicks in a view and unchecks the webview view).

Trying to use the view after it has been disposed throws an exception.

#### Properties

badge?: ViewBadge

The badge to display for this webview view. To remove the badge, set to undefined.

description?: string

Human-readable string which is rendered less prominently in the title.

title?: string

View title displayed in the UI.

The view title is initially taken from the extension `package.json` contribution.

viewType: string

Identifies the type of the webview view, such as `'hexEditor.dataView'`.

visible: boolean

Tracks if the webview is currently visible.

Views are visible when they are on the screen and expanded.

webview: Webview

The underlying webview for the view.

#### Methods

show(preserveFocus?: boolean): void

Reveal the view in the UI.

If the view is collapsed, this will expand it.

Parameter

Description

preserveFocus?: boolean

When `true` the view will not take focus.

Returns

Description

void

### WebviewViewProvider

Provider for creating WebviewView elements.

#### Methods

resolveWebviewView(webviewView: WebviewView, context: WebviewViewResolveContext<unknown>, token: CancellationToken): void | Thenable<void>

Resolves a webview view.

`resolveWebviewView` is called when a view first becomes visible. This may happen when the view is first loaded or when the user hides and then shows a view again.

Parameter

Description

webviewView: WebviewView

Webview view to restore. The provider should take ownership of this view. The provider must set the webview's `.html` and hook up all webview events it is interested in.

context: WebviewViewResolveContext<unknown>

Additional metadata about the view being resolved.

token: CancellationToken

Cancellation token indicating that the view being provided is no longer needed.

Returns

Description

void | Thenable<void>

Optional thenable indicating that the view has been fully resolved.

### WebviewViewResolveContext<T>

Additional information the webview view being resolved.

#### Properties

state: T

Persisted state from the webview content.

To save resources, the editor normally deallocates webview documents (the iframe content) that are not visible. For example, when the user collapse a view or switches to another top level activity in the sidebar, the WebviewView itself is kept alive but the webview's underlying document is deallocated. It is recreated when the view becomes visible again.

You can prevent this behavior by setting [WebviewOptions.retainContextWhenHidden retainContextWhenHidden](#WebviewOptions.retainContextWhenHidden retainContextWhenHidden) in the WebviewOptions. However this increases resource usage and should be avoided wherever possible. Instead, you can use persisted state to save off a webview's state so that it can be quickly recreated as needed.

To save off a persisted state, inside the webview call `acquireVsCodeApi().setState()` with any json serializable object. To restore the state again, call `getState()`. For example:

```
// Within the webview
const vscode = acquireVsCodeApi();

// Get existing state
const oldState = vscode.getState() || { value: 0 };

// Update state
setState({ value: oldState.value + 1 });
```

The editor ensures that the persisted state is saved correctly when a webview is hidden and across editor restarts.

### WindowState

Represents the state of a window.

#### Properties

active: boolean

Whether the window has been interacted with recently. This will change immediately on activity, or after a short time of user inactivity.

focused: boolean

Whether the current window is focused.

### WorkspaceConfiguration

Represents the configuration. It is a merged view of

*   _Default Settings_
*   _Global (User) Settings_
*   _Workspace settings_
*   _Workspace Folder settings_ - From one of the Workspace Folders under which requested resource belongs to.
*   _Language settings_ - Settings defined under requested language.

The _effective_ value (returned by get) is computed by overriding or merging the values in the following order:

1.  `defaultValue` (if defined in `package.json` otherwise derived from the value's type)
2.  `globalValue` (if defined)
3.  `workspaceValue` (if defined)
4.  `workspaceFolderValue` (if defined)
5.  `defaultLanguageValue` (if defined)
6.  `globalLanguageValue` (if defined)
7.  `workspaceLanguageValue` (if defined)
8.  `workspaceFolderLanguageValue` (if defined)

**Note:** Only `object` value types are merged and all other value types are overridden.

Example 1: Overriding

```
defaultValue = 'on';
globalValue = 'relative';
workspaceFolderValue = 'off';
value = 'off';
```

Example 2: Language Values

```
defaultValue = 'on';
globalValue = 'relative';
workspaceFolderValue = 'off';
globalLanguageValue = 'on';
value = 'on';
```

Example 3: Object Values

```
defaultValue = { a: 1, b: 2 };
globalValue = { b: 3, c: 4 };
value = { a: 1, b: 3, c: 4 };
```

_Note:_ Workspace and Workspace Folder configurations contains `launch` and `tasks` settings. Their basename will be part of the section identifier. The following snippets shows how to retrieve all configurations from `launch.json`:

```
// launch.json configuration
const config = workspace.getConfiguration(
  'launch',
  vscode.workspace.workspaceFolders[0].uri
);

// retrieve values
const values = config.get('configurations');
```

Refer to Settings for more information.

#### Methods

get<T>(section: string): T

Return a value from this configuration.

Parameter

Description

section: string

Configuration name, supports _dotted_ names.

Returns

Description

T

The value `section` denotes or `undefined`.

get<T>(section: string, defaultValue: T): T

Return a value from this configuration.

Parameter

Description

section: string

Configuration name, supports _dotted_ names.

defaultValue: T

A value should be returned when no value could be found, is `undefined`.

Returns

Description

T

The value `section` denotes or the default.

has(section: string): boolean

Check if this configuration has a certain value.

Parameter

Description

section: string

Configuration name, supports _dotted_ names.

Returns

Description

boolean

`true` if the section doesn't resolve to `undefined`.

inspect<T>(section: string): {defaultLanguageValue: T, defaultValue: T, globalLanguageValue: T, globalValue: T, key: string, languageIds: string[], workspaceFolderLanguageValue: T, workspaceFolderValue: T, workspaceLanguageValue: T, workspaceValue: T}

Retrieve all information about a configuration setting. A configuration value often consists of a _default_ value, a global or installation-wide value, a workspace-specific value, folder-specific value and language-specific values (if WorkspaceConfiguration is scoped to a language).

Also provides all language ids under which the given configuration setting is defined.

_Note:_ The configuration name must denote a leaf in the configuration tree (`editor.fontSize` vs `editor`) otherwise no result is returned.

Parameter

Description

section: string

Configuration name, supports _dotted_ names.

Returns

Description

{defaultLanguageValue: T, defaultValue: T, globalLanguageValue: T, globalValue: T, key: string, languageIds: string[], workspaceFolderLanguageValue: T, workspaceFolderValue: T, workspaceLanguageValue: T, workspaceValue: T}

Information about a configuration setting or `undefined`.

update(section: string, value: any, configurationTarget?: boolean | ConfigurationTarget, overrideInLanguage?: boolean): Thenable<void>

Update a configuration value. The updated configuration values are persisted.

A value can be changed in

*   Global settings: Changes the value for all instances of the editor.
*   Workspace settings: Changes the value for current workspace, if available.
*   Workspace folder settings: Changes the value for settings from one of the Workspace Folders under which the requested resource belongs to.
*   Language settings: Changes the value for the requested languageId.

_Note:_ To remove a configuration value use `undefined`, like so: `config.update('somekey', undefined)`

*   _throws_ - error while updating
    *   configuration which is not registered.
    *   window configuration to workspace folder
    *   configuration to workspace or workspace folder when no workspace is opened.
    *   configuration to workspace folder when there is no workspace folder settings.
    *   configuration to workspace folder when WorkspaceConfiguration is not scoped to a resource.

Parameter

Description

section: string

Configuration name, supports _dotted_ names.

value: any

The new value.

configurationTarget?: boolean | ConfigurationTarget

The configuration target or a boolean value. - If `true` updates Global settings. - If `false` updates Workspace settings. - If `undefined` or `null` updates to Workspace folder settings if configuration is resource specific, otherwise to Workspace settings.

overrideInLanguage?: boolean

Whether to update the value in the scope of requested languageId or not. - If `true` updates the value under the requested languageId. - If `undefined` updates the value under the requested languageId only if the configuration is defined for the language.

Returns

Description

Thenable<void>

### WorkspaceEdit

A workspace edit is a collection of textual and files changes for multiple resources and documents.

Use the applyEdit-function to apply a workspace edit.

#### Constructors

new WorkspaceEdit(): WorkspaceEdit

Parameter

Description

Returns

Description

WorkspaceEdit

#### Properties

size: number

The number of affected resources of textual or resource changes.

#### Methods

createFile(uri: Uri, options?: {contents: Uint8Array | DataTransferFile, ignoreIfExists: boolean, overwrite: boolean}, metadata?: WorkspaceEditEntryMetadata): void

Create a regular file.

Parameter

Description

uri: Uri

Uri of the new file.

options?: {contents: Uint8Array | DataTransferFile, ignoreIfExists: boolean, overwrite: boolean}

Defines if an existing file should be overwritten or be ignored. When `overwrite` and `ignoreIfExists` are both set `overwrite` wins. When both are unset and when the file already exists then the edit cannot be applied successfully. The `content`-property allows to set the initial contents the file is being created with.

metadata?: WorkspaceEditEntryMetadata

Optional metadata for the entry.

Returns

Description

void

delete(uri: Uri, range: Range, metadata?: WorkspaceEditEntryMetadata): void

Delete the text at the given range.

Parameter

Description

uri: Uri

A resource identifier.

range: Range

A range.

metadata?: WorkspaceEditEntryMetadata

Optional metadata for the entry.

Returns

Description

void

deleteFile(uri: Uri, options?: {ignoreIfNotExists: boolean, recursive: boolean}, metadata?: WorkspaceEditEntryMetadata): void

Delete a file or folder.

Parameter

Description

uri: Uri

The uri of the file that is to be deleted.

options?: {ignoreIfNotExists: boolean, recursive: boolean}

metadata?: WorkspaceEditEntryMetadata

Optional metadata for the entry.

Returns

Description

void

entries(): Array<[Uri, TextEdit[]]>

Get all text edits grouped by resource.

Parameter

Description

Returns

Description

Array<[Uri, TextEdit[]]>

A shallow copy of `[Uri, TextEdit[]]`-tuples.

get(uri: Uri): TextEdit[]

Get the text edits for a resource.

Parameter

Description

uri: Uri

A resource identifier.

Returns

Description

TextEdit[]

An array of text edits.

has(uri: Uri): boolean

Check if a text edit for a resource exists.

Parameter

Description

uri: Uri

A resource identifier.

Returns

Description

boolean

`true` if the given resource will be touched by this edit.

insert(uri: Uri, position: Position, newText: string, metadata?: WorkspaceEditEntryMetadata): void

Insert the given text at the given position.

Parameter

Description

uri: Uri

A resource identifier.

position: Position

A position.

newText: string

A string.

metadata?: WorkspaceEditEntryMetadata

Optional metadata for the entry.

Returns

Description

void

renameFile(oldUri: Uri, newUri: Uri, options?: {ignoreIfExists: boolean, overwrite: boolean}, metadata?: WorkspaceEditEntryMetadata): void

Rename a file or folder.

Parameter

Description

oldUri: Uri

The existing file.

newUri: Uri

The new location.

options?: {ignoreIfExists: boolean, overwrite: boolean}

Defines if existing files should be overwritten or be ignored. When overwrite and ignoreIfExists are both set overwrite wins.

metadata?: WorkspaceEditEntryMetadata

Optional metadata for the entry.

Returns

Description

void

replace(uri: Uri, range: Range, newText: string, metadata?: WorkspaceEditEntryMetadata): void

Replace the given range with given text for the given resource.

Parameter

Description

uri: Uri

A resource identifier.

range: Range

A range.

newText: string

A string.

metadata?: WorkspaceEditEntryMetadata

Optional metadata for the entry.

Returns

Description

void

set(uri: Uri, edits: ReadonlyArray<TextEdit | SnippetTextEdit>): void

Set (and replace) text edits or snippet edits for a resource.

Parameter

Description

uri: Uri

A resource identifier.

edits: ReadonlyArray<TextEdit | SnippetTextEdit>

An array of edits.

Returns

Description

void

set(uri: Uri, edits: ReadonlyArray<[TextEdit | SnippetTextEdit, WorkspaceEditEntryMetadata]>): void

Set (and replace) text edits or snippet edits with metadata for a resource.

Parameter

Description

uri: Uri

A resource identifier.

edits: ReadonlyArray<[TextEdit | SnippetTextEdit, WorkspaceEditEntryMetadata]>

An array of edits.

Returns

Description

void

set(uri: Uri, edits: readonly NotebookEdit[]): void

Set (and replace) notebook edits for a resource.

Parameter

Description

uri: Uri

A resource identifier.

edits: readonly NotebookEdit[]

An array of edits.

Returns

Description

void

set(uri: Uri, edits: ReadonlyArray<[NotebookEdit, WorkspaceEditEntryMetadata]>): void

Set (and replace) notebook edits with metadata for a resource.

Parameter

Description

uri: Uri

A resource identifier.

edits: ReadonlyArray<[NotebookEdit, WorkspaceEditEntryMetadata]>

An array of edits.

Returns

Description

void

### WorkspaceEditEntryMetadata

Additional data for entries of a workspace edit. Supports to label entries and marks entries as needing confirmation by the user. The editor groups edits with equal labels into tree nodes, for instance all edits labelled with "Changes in Strings" would be a tree node.

#### Properties

description?: string

A human-readable string which is rendered less prominent on the same line.

iconPath?: IconPath

The icon path or ThemeIcon for the edit.

label: string

A human-readable string which is rendered prominent.

needsConfirmation: boolean

A flag which indicates that user confirmation is needed.

### WorkspaceEditMetadata

Additional data about a workspace edit.

#### Properties

isRefactoring?: boolean

Signal to the editor that this edit is a refactoring.

### WorkspaceFolder

A workspace folder is one of potentially many roots opened by the editor. All workspace folders are equal which means there is no notion of an active or primary workspace folder.

#### Properties

index: number

The ordinal number of this workspace folder.

name: string

The name of this workspace folder. Defaults to the basename of its uri-path

uri: Uri

The associated uri for this workspace folder.

_Note:_ The Uri-type was intentionally chosen such that future releases of the editor can support workspace folders that are not stored on the local disk, e.g. `ftp://server/workspaces/foo`.

### WorkspaceFolderPickOptions

Options to configure the behavior of the workspace folder pick UI.

#### Properties

ignoreFocusOut?: boolean

Set to `true` to keep the picker open when focus moves to another part of the editor or to another window. This setting is ignored on iPad and is always `false`.

placeHolder?: string

An optional string to show as placeholder in the input box to guide the user.

### WorkspaceFoldersChangeEvent

An event describing a change to the set of workspace folders.

#### Properties

added: readonly WorkspaceFolder[]

Added workspace folders.

removed: readonly WorkspaceFolder[]

Removed workspace folders.

### WorkspaceSymbolProvider<T>

The workspace symbol provider interface defines the contract between extensions and the symbol search-feature.

#### Methods

provideWorkspaceSymbols(query: string, token: CancellationToken): ProviderResult<T[]>

Project-wide search for a symbol matching the given query string.

The `query`-parameter should be interpreted in a _relaxed way_ as the editor will apply its own highlighting and scoring on the results. A good rule of thumb is to match case-insensitive and to simply check that the characters of _query_ appear in their order in a candidate symbol. Don't use prefix, substring, or similar strict matching.

To improve performance implementors can implement `resolveWorkspaceSymbol` and then provide symbols with partial location-objects, without a `range` defined. The editor will then call `resolveWorkspaceSymbol` for selected symbols only, e.g. when opening a workspace symbol.

Parameter

Description

query: string

A query string, can be the empty string in which case all symbols should be returned.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T[]>

An array of document highlights or a thenable that resolves to such. The lack of a result can be signaled by returning `undefined`, `null`, or an empty array.

resolveWorkspaceSymbol(symbol: T, token: CancellationToken): ProviderResult<T>

Given a symbol fill in its location. This method is called whenever a symbol is selected in the UI. Providers can implement this method and return incomplete symbols from provideWorkspaceSymbols which often helps to improve performance.

Parameter

Description

symbol: T

The symbol that is to be resolved. Guaranteed to be an instance of an object returned from an earlier call to `provideWorkspaceSymbols`.

token: CancellationToken

A cancellation token.

Returns

Description

ProviderResult<T>

The resolved symbol or a thenable that resolves to that. When no result is returned, the given `symbol` is used.

## API Patterns

These are some of the common patterns we use in the VS Code API.

### Promises

The VS Code API represents asynchronous operations with promises. From extensions, **any** type of promise can be returned, like ES6, WinJS, A+, etc.

Being independent of a specific promise library is expressed in the API by the `Thenable`-type. `Thenable` represents the common denominator which is the then method.

In most cases the use of promises is optional and when VS Code calls into an extension, it can handle the _result type_ as well as a `Thenable` of the _result type_. When the use of a promise is optional, the API indicates this by returning `or`-types.

```
provideNumber(): number | Thenable<number>
```

### Cancellation Tokens

Often operations are started on volatile state which changes before operations can finish. For instance, computing IntelliSense starts and the user continues to type making the result of that operation obsolete.

APIs that are exposed to such behavior will get passed a `CancellationToken` on which you can check for cancellation (`isCancellationRequested`) or get notified when cancellation occurs (`onCancellationRequested`). The cancellation token is usually the last parameter of a function call and optional.

### Disposables

The VS Code API uses the dispose pattern for resources that are obtained from VS Code. This applies to event listening, commands, interacting with the UI, and various language contributions.

For instance, the `setStatusBarMessage(value: string)` function returns a `Disposable` which upon calling `dispose` removes the message again.

### Events

Events in the VS Code API are exposed as functions which you call with a listener-function to subscribe. Calls to subscribe return a `Disposable` which removes the event listener upon dispose.

```
var listener = function(event) {
  console.log('It happened', event);
};

// start listening
var subscription = fsWatcher.onDidDelete(listener);

// do more stuff

subscription.dispose(); // stop listening
```

Names of events follow the `on[Will|Did]VerbNoun?` pattern. The name signals if the event is going to happen _(onWill)_ or already happened _(onDid)_, what happened _(verb)_, and the context _(noun)_ unless obvious from the context.

An example from the VS Code API is `window.onDidChangeActiveTextEditor` which is an event fired when the active text editor _(noun)_ has been (_onDid_) changed (_verb_).

### Strict null

The VS Code API uses the `undefined` and `null` TypeScript types where appropriate to support strict null checking.

02/04/2026