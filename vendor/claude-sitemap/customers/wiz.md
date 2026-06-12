# Wiz migrates a 50,000-line codebase with Claude Code, achieving 2x performance gains

Wiz is a cloud security platform with over 2,000 employees that helps security teams gain visibility into their cloud environments, manage security posture, and take remediation steps across the full development lifecycle. Wiz’s Data Security Posture Management (DSPM) team is responsible for scanning customer files across every environment and reading their contents to identify security issues like exposed credentials or sensitive data. 

## With Claude, Wiz achieved:

*   **~1 day of active development** to migrate a 50,000-line Python library to Go — a project estimated at 2-3 human months manually
*   **2x+ faster PDF processing in production**, with the new Go library fully replacing the sandboxed Python solution
*   **Full codebase ownership**, enabling bug fixes and customizations impossible in the original open-source library (including Hebrew language support)
*   **A 20,000-line C++ library migrated to Go in 2 days**, with Claude Code generating Go assembly code as part of the process
*   **20-30x estimated output multiplication** as the team integrates Claude Code across engineering workflows

## The challenge: Parsing PDF files at scale

Wiz's entire codebase is written in Go, a programming language known for its memory safety and security properties. But for one critical task—parsing PDF files—no adequate Go library existed. The PDF specification is decades old, with hundreds of different implementations across applications and devices, making comprehensive parsing extremely complex. As Liron Levin, a software engineer on the DSPM team, explained: “If you go to Reddit or any other blog, you will see tons of questions like ‘how do I solve this in Go?’ and they will tell you, you can’t.”

The only reliable solution was pypdf, a Python library with over 20 years of development and more than 50,000 lines of code. But running Python inside a Go environment meant wrapping it in a resource-intensive sandbox—essentially a mini virtual machine—that hurt performance and couldn’t run everywhere. Some environments used the sandboxed Python approach; others relied on incomplete Go packages. The result was inconsistency: different tools producing different results for the same file.

“We had a large discrepancy,” Levin said. “It made the code more complicated, and I never felt safe just running it. I wanted to fix this for two years, but the manual effort to port 50,000 lines of a 20-year-old Python library to Go would have taken two to three months of a highly specialized engineer's time. No product manager would ever prioritize that." The project stayed on the backlog.