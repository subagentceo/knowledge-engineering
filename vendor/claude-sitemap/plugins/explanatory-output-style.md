This plugin adds educational insights about implementation choices and codebase patterns to Claude's responses. It recreates the functionality of the deprecated "Explanatory" output style as a session hook that activates automatically when you start a new session.

When enabled, Claude will provide 2-3 key educational points about your codebase as you work, formatted in a distinctive insight box. These insights focus on implementation choices specific to your codebase, pattern conventions, and design trade-offs — not generic programming concepts.

**How to use:** Simply install the plugin and it activates automatically on each new session. Claude will include educational insights as it writes code, helping you learn about the codebase while completing tasks. Note that this plugin increases token usage due to the additional instructional output.

**Example output format:**  
`★ Insight ─────────────────────────────────────`  
\[2-3 key educational points about the code\]  
`─────────────────────────────────────────────────`