<notes>
<critical>
Below are notes from a video course about working with the Claude language model.
Use these notes as a resource to answer the user's question.
Write your answer as a standalone response - do not refer directly to these notes unless specifically requested by the user.
</critical>
<note title="Introducing MCP">
MCP = Model Context Protocol, communication layer providing Claude with context and tools without requiring developers to write tedious code.

Core Architecture: MCP client connects to MCP server. MCP server contains tools, resources, and prompts as internal components.

Problem Solved: Traditional approach requires developers to manually author tool schemas and functions for each service integration (like GitHub API tools). This creates maintenance burden for complex services with many features.

MCP Solution: Shifts tool definition and execution from developer's server to dedicated MCP server. MCP server = interface to outside service, wrapping functionality into pre-built tools.

Key Benefits: Eliminates need for developers to write/maintain tool schemas and function implementations. Someone else authors the tools, packages them in MCP server.

Common Questions:
- Who authors MCP servers? Anyone, but often service providers create official implementations
- Difference from direct API calls? Saves developer time by providing pre-built tool schemas/functions instead of manual authoring
- Relationship to tool use? MCP and tool use are complementary, not identical. MCP focuses on who does the work of creating tools

Core Value: Reduces developer burden by outsourcing tool creation to MCP server implementations rather than requiring custom tool development for each service integration.
</note>

<note title="MCP Clients">
MCP Client = communication interface between your server and MCP server, provides access to server's tools.

Transport agnostic = client/server can communicate via multiple protocols (stdin/stdout, HTTP, WebSockets, etc). Common setup: both on same machine using stdin/stdout.

Communication = message exchange defined by MCP spec. Key message types:
- list tools request/result = client asks server for available tools, server responds with tool list
- call tool request/result = client asks server to run tool with arguments, server returns execution result

Typical flow: User query → Server asks MCP client for tools → MCP client sends list tools request to MCP server → Server gets tool list → Server sends query + tools to Claude → Claude requests tool execution → Server asks MCP client to run tool → MCP client sends call tool request to MCP server → MCP server executes tool (e.g., GitHub API call) → Results flow back through chain → Claude formulates final response → User gets answer.

MCP client acts as intermediary - doesn't execute tools itself, just facilitates communication between your server and MCP server that actually runs the tools.
</note>

<note title="Project Setup">
MCP Learning Project = CLI-based chatbot implementing both client and server components for educational purposes.

Project Structure = Custom MCP client connects to custom MCP server, both built in same project.

Document System = Fake documents stored in memory only, no persistence.

Server Tools = Two tools implemented: read document contents, update document contents.

Real-world Context = Normally projects implement either client OR server, not both. This project does both for learning.

Setup Requirements = Download CLI_project.zip, extract, configure .env with API key, install dependencies.

Running Project = "uv run main.py" (with UV) or "python main.py" (without UV).

Verification = Chat prompt appears, responds to basic queries like "what's one plus one".
</note>

<note title="Defining Tools with MCP">
MCP server implementation = Python SDK simplifies tool creation vs manual JSON schemas

Tool definition syntax = @mcp.tool decorator + function with typed parameters + Field descriptions

Document storage = in-memory dictionary with doc_id keys and content values

Tool 1 - read_doc_contents = takes doc_id string parameter, returns document content from docs dictionary, raises ValueError if doc not found

Tool 2 - edit_document = takes doc_id, old_string, new_string parameters, performs find/replace operation on document content, includes existence validation

MCP Python SDK benefits = auto-generates JSON schemas from decorated functions, single line server creation, eliminates manual schema writing

Parameter definition = use Field() with description for tool arguments, import from pydantic

Error handling = validate document existence before operations, raise ValueError for missing documents

Implementation pattern = decorator → function definition → parameter typing → validation → core logic
</note>

<note title="The Server Inspector">
MCP Inspector = in-browser debugger for testing MCP servers without connecting to actual applications

Access: Run \`mcp dev [server_file.py]\` in terminal with activated Python environment → opens server on port → visit provided localhost address

Interface: Left sidebar with Connect button → top navigation bar shows Resources/Prompts/Tools sections → Tools section lists available tools → click tool to open right panel for manual testing

Testing process: Select tool → input required parameters (like document ID) → click Run Tool → verify output/success message

Key features: Live development testing, tool invocation simulation, parameter input fields, success/failure feedback

Status: Inspector in active development - UI may change but core functionality remains similar

Usage pattern: Essential for MCP server development and debugging before production deployment
</note>

<note title="Implementing a Client">
MCP Client Implementation:

MCP Client = wrapper class around client session for connecting to MCP server with resource cleanup management

Client Session = actual connection to MCP server from MCP Python SDK, requires cleanup when closing

Resource Cleanup = necessary process when shutting down, handled by connect/cleanup/async enter/async exit functions

Client Purpose = exposes MCP server functionality to rest of codebase, provides interface between application code and server

Key Functions:
- list_tools() = await self.session.list_tools(), return result.tools
- call_tool() = await self.session.call_tool(tool_name, tool_input)

Implementation Flow:
1. Application requests tool list for Claude
2. Client calls list_tools() to get server's available tools
3. Claude selects tool and provides parameters
4. Client calls call_tool() to execute on server
5. Results returned to Claude

Testing = run MCP client.py directly with testing harness to verify connection and tool listing

Integration = once implemented, can run CLI to have Claude use tools (e.g., "what is contents of report.pdf document")

Common Practice = wrap client session in larger class rather than using directly for better resource management
</note>

<note title="Defining Resources">
Resources = MCP server feature that exposes data to clients for read operations

Resource types:
- Direct/Static = static URI (e.g., docs://documents)
- Templated = parameterized URI with wildcards (e.g., documents/{doc_id})

Resource flow:
1. Client sends read resource request with URI
2. MCP server matches URI to resource function
3. Server executes function, returns result
4. Client receives data via read resource result message

Implementation:
- Use @mcp.resource decorator
- Define URI (route-like address)
- Set MIME type (application/json, text/plain, etc.)
- Templated resources: URI parameters become function keyword arguments
- Python MCP SDK auto-serializes return values to strings

Common pattern = One resource per distinct read operation (list items vs fetch single item)

MIME types = hints to client about returned data format for proper deserialization
</note>

<note title="Accessing Resources">
MCP Resource Access = method for clients to retrieve data from server resources

Client Implementation:
- read_resource function = takes URI parameter, requests resource from MCP server
- Uses await self.session.read_resource(AnyUrl(uri)) for server communication
- Accesses result.contents[0] = first resource from returned contents list

Response Parsing:
- Checks resource.mime_type property to determine data format
- If mime_type == "application/json": returns json.loads(resource.text)
- Otherwise: returns resource.text as plain text

Resource Integration:
- MCP client functions called by other application components
- Enables document selection via CLI interface with arrow keys + space
- Selected resource contents automatically included in LLM prompts
- Eliminates need for tools to read document contents during chat

Key Dependencies: json module, pydantic.AnyUrl for type handling
</note>

<note title="Defining Prompts">
Prompts = pre-written, tested instructions that MCP servers expose to clients for specialized tasks

MCP Prompts Feature:
- Servers define high-quality prompts tailored to their domain
- Clients can access these prompts via slash commands (e.g., /format)
- Alternative to users writing their own prompts manually

Implementation Pattern:
- Use @prompt decorator with name and description
- Function receives arguments (e.g., document ID)
- Returns list of messages (user/assistant format)
- Messages sent directly to Claude

Key Benefit: Server authors create optimized, tested prompts rather than leaving prompt quality to end users

Example Structure:
\`\`\`
@prompt(name="format", description="rewrites document in markdown")
def format_document(doc_id: str) -> list[messages]:
    return [base.user_message(prompt_text)]
\`\`\`

Workflow: User types /format → selects document → server returns specialized prompt → client sends to Claude → Claude uses tools to read/reformat/save document

Purpose = encapsulate domain expertise in prompt engineering within specialized MCP servers
</note>

<note title="Prompts in the Client">
MCP Client Prompt Implementation:

List prompts function = await self.session.list_prompts(), return result.props

Get prompt function = await self.session.get_prompt(prompt_name, arguments), return result.messages

Prompt workflow = Client requests prompt by name → passes arguments as keyword parameters → MCP server interpolates arguments into prompt template → returns formatted messages for AI model

Arguments flow = Client arguments → prompt function keyword arguments → interpolated into prompt text (e.g., document_id parameter gets inserted into prompt template)

Return format = Messages array that forms conversation input for AI model

CLI usage = /format command → select document → prompt with document ID sent to Claude → Claude uses tools to fetch document → returns formatted result

Key concept = Prompts are server-defined templates that clients can invoke with parameters, enabling reusable AI instructions with dynamic content insertion.
</note>

<note title="MCP Review">
MCP Server Primitives = 3 types: tools, resources, prompts

Tools = model-controlled primitives where Claude decides when to execute them. Used to add capabilities to Claude (e.g., JavaScript execution for calculations). Serve the model.

Resources = app-controlled primitives where application code decides when to fetch data. Used to get data into apps for UI display or prompt augmentation (e.g., autocomplete options, document listings from Google Drive). Serve the app.

Prompts = user-controlled primitives triggered by user actions like button clicks or slash commands. Used for predefined workflows (e.g., chat starter buttons in Claude interface). Serve users.

Control patterns determine purpose: Need Claude capabilities → implement tools. Need app data → use resources. Need user workflows → create prompts.

Real examples: Claude's chat starter buttons use prompts, Google Drive document selection uses resources, code execution uses tools.
</note>
</notes>