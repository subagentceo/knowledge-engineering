# Voice support

The VS Code Speech extension enables various features by using your voice. Once installed, the extension enables you to dictate into the editor, or to verbally interact with chat in VS Code.

![Screenshot of the VS Code Speech extension marketplace details](/assets/docs/configure/accessibility/accessibility/speech-extension.png)

Note

Voice support in VS Code does not require you to be online. Recordings are never sent to any online service but computed local on your machine.

## Get started

To get started with voice support in VS Code, install the VS Code Speech extension from the marketplace.

## Editor dictation

You can dictate into the editor via these commands: **Voice: Start Dictation in Editor** (⌥⌘V (Windows, Linux Ctrl+Alt+V)) and **Voice: Stop Dictation in Editor** (Escape). Once started, a little microphone icon appears where the cursor is, awaiting your voice input:

![Editor Dictation Mode](/assets/docs/configure/accessibility/accessibility/editor-dictate.png)

Press and hold the keyboard shortcut for the voice start command (⌥⌘V (Windows, Linux Ctrl+Alt+V)) to enable **walky-talky mode**. Voice recognition is active until you release the keys, after which the request is submitted automatically.

Note

Dictation even works in other places where a rich editor is used, such as the SCM commit input box and the comments input field when reviewing pull requests.

## Voice in chat

You can use your voice to talk to chat in VS Code easily. The command **Chat: Start Voice Chat** (⌘I (Windows, Linux Ctrl+I)) brings up a voice chat, regardless of where the current focus is. If the focus is in the editor, editor inline chat is started, otherwise the Chat view is opened. Alternatively, you can start voice chat in a specific location by using the **Chat: Inline Voice Chat**, **Chat: Quick Voice Chat**, or **Chat: Voice Chat in Chat View** commands.

When voice chat is active, a microphone icon appears in the chat input field, indicating that voice input is active:

![Screenshot of the chat input field showing an active microphone icon to enter a voice chat message](/assets/docs/configure/accessibility/accessibility/voice-chat.png)

Note

When using voice for chat in VS Code, the chat prompt will automatically submit when you pause. You can configure the time to wait before submitting via the accessibility.voice.speechTimeout Open in VS Code Open in VS Code Insiders setting, or disable this functionality when you configure the setting to `0`.

Chat in VS Code also supports text-to-speech capabilities. When you enable the accessibility.voice.autoSynthesize Open in VS Code Open in VS Code Insiders setting, the chat responses are automatically read out aloud when voice was also used as input. To interrupt the synthesis, select the icon or press Escape.

Each chat response also shows a new speaker icon, so that you can selectively read out a response aloud.

![Text to Speech for a Chat Response](/assets/docs/configure/accessibility/accessibility/text-to-speech.png)

## Walky talky mode

When using keyboard shortcuts to start voice (⌥⌘V (Windows, Linux Ctrl+Alt+V) or ⌘I (Windows, Linux Ctrl+I)), either in the editor or chat, you can press and hold the keyboard shortcut to start the voice recognition. When you release the keyboard shortcut, voice recognition will stop. In addition, when used in chat, the prompt will be submitted.

## "Hey Code"

It is possible to enable a mode where VS Code will always listen for the phrase "Hey Code" to start a voice chat session. Configure the accessibility.voice.keywordActivation Open in VS Code Open in VS Code Insiders setting accordingly to enable this. When VS Code is listening for "Hey Code", a microphone icon appears in the status bar to indicate as such:

![Screenshot of a status bar entry to signal active listening to "Hey Code"](/assets/docs/configure/accessibility/accessibility/hey-code.png)

## Support for multiple languages

You can select from one of the 26 supported languages by using the accessibility.voice.speechLanguage Open in VS Code Open in VS Code Insiders setting. If you set the value to `auto` (default value), the VS Code Speech extension uses the VS Code display language, if that language is available.

Each language for the speech extension comes as its own extension. When you start speech recognition for the first time, you will see an extension installation for each language you selected.

## Next steps

Read on to find out about:

*   Other VS Code accessibility features.
*   Visual Studio Code User Interface - A quick orientation to VS Code.
*   Basic Editing - Learn about the powerful VS Code editor.
*   Code Navigation - Move quickly through your source code.