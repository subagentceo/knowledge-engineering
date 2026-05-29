<notes>
<critical>
Below are notes from a video course about working with the Claude language model.
Use these notes as a resource to answer the user's question.
Write your answer as a standalone response - do not refer directly to these notes unless specifically requested by the user.
</critical>
<note title="Accessing the API">
AWS Bedrock API Access:

Chat bot flow = User submits text → Server receives request → Bedrock client makes API call to AWS Bedrock → Request includes user message + model ID → Model generates text → Returns assistant message → Server sends response to browser

Key API components = User message (input text), Model ID (specifies which model), Assistant message (generated output)

Course focus = Communication between bedrock client and bedrock service, API requests, text access, design patterns

Critical distinction = AWS Bedrock API ≠ Anthropic API. Same Claude models (Sonnet, Haiku) but different services, different SDKs, different documentation. Must use AWS Bedrock-specific resources.

Claude models = Hosted on both AWS Bedrock and official Anthropic API, but accessing through AWS Bedrock in this context.
</note>

<note title="Making a Request">
AWS Bedrock API Request Basics:

Three requirements for API requests:
1. Boto3 client = connects to Bedrock runtime service (specify region like US West 2)
2. Model ID = identifier for specific model to run
3. User message = specially formatted object containing input text

Model ID complexity:
- Not all models hosted in every region
- Wrong region = cryptic error messages
- Inference profiles = route requests to regions where model actually exists
- Use inference profile ID instead of direct model ID for guaranteed routing
- Found in AWS console under "cross region inference" not "model catalog"

Message structure:
- User message = {"role": "user", "content": [{"text": "your input"}]}
- Assistant message = response from model with same structure but role="assistant"
- Content is list because messages can contain multiple parts (text + images)

Making request:
- Use client.converse(modelId="profile_id", messages=[user_message])
- Access response text via: response["output"]["message"]["content"][0]["text"]

Message types:
- User message = input to model
- Assistant message = model-generated response
</note>

<note title="Multi-Turn Conversations">
Multi-Turn Conversations = conversations with multiple back-and-forth exchanges that maintain context

Key constraint: Bedrock/Claude APIs = stateless, store no messages or responses

Requirements for multi-turn conversations:
1. Manual message management = maintain complete list of all exchanged messages in your code
2. Full context transmission = send entire message history with every follow-up request

Message structure rules:
- Messages = list of alternating user/assistant roles
- Never have consecutive messages with same role
- Pattern must be: user → assistant → user → assistant

Implementation approach:
- Create helper functions to add user/assistant messages to list
- Include previous messages + responses in each new API call
- Build conversation history incrementally

Example flow:
1. Send "what's 1+1?" → get "2"
2. Add both to message list
3. Send full list + "and three more" → get "5" (with proper context)

Without message history: follow-up questions produce nonsensical responses because model lacks context.
</note>

<note title="System Prompts">
System Prompts = instructions that assign a role to language models to guide their responses

Implementation = pass system prompt to converse function using system keyword parameter

Purpose = control response behavior by making model "pretend" to have specific job/role instead of listing explicit do/don't requirements

Example = "You are an AWS cloud support specialist" makes model respond like real support specialist, automatically avoiding competitor mentions and refusing non-cloud questions

Technical Requirements = system prompt must have at least 1 character, passed as list with dictionary containing text field

Benefits = more natural constraint enforcement than explicit rule lists, role-based responses automatically handle edge cases

Best Practice = make system prompt parameter optional in chat functions for reusability, defaults to none to avoid empty string errors
</note>

<note title="Temperature">
**Temperature = decimal parameter (0-1) that controls randomness in Claude's token selection**

**Text Generation Process:**
1. Tokenization - breaks input into chunks
2. Prediction - assigns probabilities to possible next tokens  
3. Sampling - selects token based on probabilities

**Temperature Effects:**
- Temperature 0 = deterministic output, always selects highest probability token
- Higher temperature = increases chance of selecting lower probability tokens
- Default temperature = 1.0 (maximum creativity)

**Usage Guidelines:**
- Low temperature (near 0) = data extraction, factual tasks, consistent output
- High temperature (near 1) = creative writing, brainstorming, jokes, marketing

**Implementation:**
- Pass temperature parameter in inference_config when calling converse function
- Lower temperature produces more similar/predictable responses
- Higher temperature produces more varied/creative responses

**Key Takeaway:** Temperature directly controls creativity vs consistency tradeoff in model outputs.
</note>

<note title="Streaming">
**Streaming in Chat Interfaces**

Problem = User expectations for immediate feedback vs actual response time (3-30 seconds) when generating text responses.

Solution = Converse Stream function - streams generated text as it's being produced by model instead of waiting for complete response.

**How Streaming Works:**
1. User submits question → server sends request to bedrock via converse stream
2. Immediate initial response received (no text, just acknowledgment)
3. Stream of events received containing pieces of generated response
4. Each event contains small text chunks sent to browser/app for display
5. User sees response building in real-time

**Event Types:**
- Message start (first event)
- Content block delta (contains actual generated text chunks)
- Content block stop
- Message stop
- Metadata (last event)

**Key Implementation Points:**
- Response contains 'stream' key = event stream object/generator
- Iterate over stream to get individual events
- Only content block delta events matter for text generation
- Text chunks found at: event['content_block_delta']['delta']['text']
- Collect chunks to reconstruct full message if needed

**Code Pattern:**
\`\`\`
for event in response['stream']:
    if 'content_block_delta' in event:
        chunk = event['content_block_delta']['delta']['text']
        # Send chunk to user interface
        total_text += chunk
\`\`\`
</note>

<note title="Controlling Model Output">
Model output control methods:

Pre-filling assistant messages = manually adding assistant message at end of message list to steer response direction. Claude continues from where pre-filled text ends, not from beginning. Must concatenate pre-filled text with returned response for complete output.

Stop sequences = strings that force Claude to stop generation immediately when encountered. Provided as parameter to converse function. Can specify multiple sequences. Stopping sequence itself is excluded from final response.

Key mechanics:
- Pre-filling: Claude sees partial assistant response, assumes already authored, continues from exact endpoint
- Stop sequences: Generation halts at first matching string, partial response returned
- Both techniques strongly influence output beyond prompt modification alone

Implementation: Add stop_sequences parameter to chat function, pass to inference_config. Pre-filling requires manual message list construction with assistant role.
</note>

<note title="Structured Data">
Structured Data Generation = combining stop sequences + assistant message prefilling to extract only desired content without extra commentary

Problem: Claude naturally adds headers/footers/explanatory text when generating structured data (JSON, Python, lists), but applications often need only the raw content for copying/parsing.

Solution Pattern:
1. Pre-fill assistant message with opening delimiter (e.g., "\`\`\`json")
2. Set stop sequence to match closing delimiter (e.g., "\`\`\`")
3. Claude assumes it already wrote the opening, generates only the content, stops at closing delimiter

Result: Returns only the structured data between delimiters, no additional commentary.

Example Flow:
User: "generate JSON rule"
Assistant prefill: "\`\`\`json"
Stop sequence: "\`\`\`"
Output: raw JSON only

Technique works for any structured data format, not just JSON. Essential for applications requiring clean, parseable output without manual text extraction.
</note>

<note title="Prompt Evaluation">
Prompt Engineering = techniques for writing/editing prompts to help Claude understand requests and desired responses.

Prompt Evaluation = automated testing of prompts with objective metrics to measure effectiveness.

Three paths after writing a prompt:
1. Test once/twice, use in production (trap)
2. Test with custom inputs, minor tweaks (trap)  
3. Run through evaluation pipeline for objective scoring (recommended)

Options 1 and 2 are common traps - engineers don't test prompts enough for serious applications.

Recommended process: Write prompt → evaluation pipeline → get objective score → iterate → optimize performance.

Prompt evaluation comes before prompt engineering in the workflow to establish measurement baseline before optimization.
</note>

<note title="A Typical Eval Workflow">
Typical eval workflow = iterative process to improve prompts through systematic testing and scoring

No standard methodology exists - many different approaches and tools available (open source packages, paid options). Can start simple and scale up.

Core workflow steps:
1. Initial prompt draft = write baseline prompt to improve
2. Evaluation dataset = collection of test inputs (can be hand-crafted or AI-generated, ranging from tens to thousands of records)
3. Prompt execution = feed each dataset input into prompt, generate responses from LLM
4. Grading = score each response using grader system (typically 1-10 scale where 10 = perfect, lower scores indicate improvement needed)
5. Averaging = calculate overall performance score across all test cases
6. Iteration = modify prompt based on results, repeat entire process

Comparison methodology = run multiple prompt versions through same pipeline, compare average scores to identify better performing version

Objective = establish quantitative way to measure prompt performance improvements rather than relying on subjective assessment

Key insight = lightweight custom implementation possible, don't need heavy enterprise solutions to get started with prompt evaluation
</note>

<note title="Generating Test Datasets">
Custom Prompt Evaluation Workflow = building system to test prompt performance for AWS code generation tasks

Goal = prompt accepts user task, outputs one of three formats: Python code, JSON configuration, or regular expression (no extra explanation/formatting)

Evaluation Dataset = collection of test inputs (JSON objects with task properties) fed into prompt to measure performance

Dataset Generation Methods = manual assembly or automatic generation using LLMs

Implementation Steps:
1. Draft prompt (V1: "please provide solution to following task")
2. Generate test dataset using Haiku model (faster/cheaper for dataset generation)
3. Create generate_dataset() function with lengthy prompt requesting AWS-related tasks
4. Use JSON extraction technique: pre-filled assistant message + stop sequences
5. Parse JSON response and return structured data
6. Save dataset to JSON file for reuse

Key Technical Details:
- Uses inference profile for Haiku model (speed optimization)
- Requests array of objects with task properties
- Example generates 3 test cases (real-world needs many more)
- JSON extraction pattern: backticks + stop sequence
- Dataset structure will evolve (mentioned future changes)

Output = structured test dataset for evaluating AWS code generation prompt performance
</note>

<note title="Running the Eval">
Running the Eval = process of executing test cases through LLM and collecting results for grading.

Test case = individual record from generated dataset (JSON objects containing tasks).

Run prompt function = takes test case, merges with prompt template, sends to Claude, returns output. Basic V1 prompt: "please solve the following task [test_case_task]". Currently no output formatting constraints.

Run test case function = takes individual case, calls run prompt, grades result (placeholder hardcoded score of 10), returns dictionary with output/test_case/score.

Run eval function = loads dataset, loops through all test cases calling run test case, assembles results into list.

Eval pipeline structure = vast majority is just these three functions plus grading component. Minimal code required.

Runtime = ~31 seconds with Haiku model for full dataset. Speed optimization techniques exist.

Output format = array of objects, each containing Claude's output (verbose/unformatted), original test case definition, and score.

Current limitations = no output formatting in prompt leads to verbose responses, hardcoded scoring placeholder needs actual grading implementation.

Next step = implement actual graders to evaluate Claude's responses against expected outputs.
</note>

<note title="Model Based Grading">
Model Based Grading = Using additional AI models to evaluate original model outputs by providing objective scoring

Three grader types:
- Code graders = Programmatic checks (length, syntax, keywords, readability scores)
- Model graders = Additional API calls to evaluate quality, instruction following, completeness  
- Human graders = Manual evaluation (flexible but time-consuming)

Model grader process:
1. Take original model output
2. Feed into evaluation model with detailed prompt
3. Request reasoning + score (typically 1-10 scale)
4. Return structured assessment

Key implementation points:
- Evaluation criteria must be defined upfront
- Prompts should request reasoning/strengths/weaknesses to avoid default middling scores
- JSON response format with pre-filled assistant messages for clean parsing
- Average scores across test cases for objective metrics

Common evaluation criteria:
- Format compliance (correct output type)
- Syntax validation
- Task completion accuracy
- General response quality

Model graders provide flexibility for subjective quality assessment that code graders cannot handle programmatically.
</note>

<note title="Code Based Grading">
Code Based Grading = automated validation system for model outputs containing code/structured data

Core Components:
- validate_json(): parses JSON using json.loads(), returns 10 if valid else 0
- validate_python(): parses Python using AST, returns 10 if valid else 0  
- validate_regex(): compiles regex pattern, returns 10 if valid else 0
- grade_syntax(): router function that calls appropriate validator based on test case format

Implementation Requirements:
- Dataset must include "format" key specifying expected output type (JSON/Python/regex)
- Prompt template updated to specify "respond only with Python, JSON, or plain regex, no comments"
- Assistant message pre-filled with \`\`\`code to force raw code output
- Stop sequence using closing backticks
- Final score = (model_score + syntax_score) / 2

Key Mechanism = try/catch parsing - successful parse = full score, parsing error = zero score

Purpose = ensures model outputs valid, executable code without explanatory text or syntax errors
</note>

<note title="Prompt Engineering">
Prompt Engineering = improving written prompts to get more reliable and higher quality outputs from language models.

Core Process:
1. Set goal for prompt
2. Write initial version (usually poor quality)
3. Evaluate prompt performance
4. Apply prompt engineering techniques iteratively
5. Re-evaluate after each improvement

Example Goal: Generate one-day meal plan for athletes based on height, weight, goals, dietary restrictions.

Evaluation Setup:
- Uses flexible evaluation pipeline with prompt evaluator class
- Supports concurrency for faster processing (adjust based on rate limits)
- Generates test datasets with specified inputs and criteria
- Creates output.html reports for detailed analysis

Key Components:
- prompt_inputs = dictionary containing variables to interpolate into prompt
- run_prompt function = executes once per test case
- extra_criteria = additional validation requirements for model grading
- Dataset generation requires: prompt purpose description, input specifications, number of test cases

Initial Performance: Typically poor scores (baseline for improvement measurement).

Iterative Improvement: Each prompt engineering technique application followed by re-evaluation to measure performance gains.
</note>

<note title="Being Clear and Direct">
Being Clear and Direct = using simple, direct language with action verbs in the first line of prompts to specify exact tasks.

First line = most important part of prompt. Should contain action verb + clear task description.

Action verbs = write, generate, create, identify, analyze, etc.

Good examples:
- "Write three paragraphs about how solar panels work"
- "Identify three countries that use geothermal energy and include generation stats for each"
- "Generate a one day meal plan for an athlete that meets their dietary restrictions"

Structure = Action verb + specific task + output expectations

Result = clearer task understanding, better output quality. In example, score improved from 2.32 to 3.92 by applying this technique.
</note>

<note title="Being Specific">
Being Specific = adding guidelines or steps to direct model output in particular direction

Two types of guidelines:
- Type A: List qualities/attributes for output (length, structure, format requirements)
- Type B: Provide step-by-step process for model to follow (forces consideration of specific elements, improves reasoning quality)

Both can be combined in professional prompts.

When to use:
- Type A (attributes): Almost always recommended for any prompt
- Type B (steps): Use for complex problems requiring broader perspective or when model needs to consider additional viewpoints beyond natural inclination

Example improvement: Adding guidelines improved evaluation score from 3.92 to 7.86, demonstrating significant impact on output quality.
</note>

<note title="Structure with XML Tags">
XML Tags for Prompt Structure = Method to organize and clarify different content sections within prompts using custom XML-style tags.

Purpose = Helps language models distinguish between different types of content when large amounts of text are interpolated into prompts.

Implementation = Wrap content sections in descriptive tags like <sales_records></sales_records> or <my_code></my_code> and <docs></docs>.

Tag naming = Use specific, descriptive names rather than generic ones. "sales_records" better than "data".

Use cases = Essential when prompt contains multiple large content blocks that could be confused (code vs documentation, data vs instructions). Also useful for smaller content to explicitly mark it as external input.

Benefits = Reduces ambiguity about content boundaries and context, leading to improved model performance and output quality.

Example application = Wrapping athlete information (height, weight, goals, restrictions) in <athlete_information></athlete_information> tags to clarify it as external input for meal plan generation.
</note>

<note title="Providing Examples">
Example-based prompting = providing sample inputs and ideal outputs in prompts to guide model behavior

One-shot prompting = providing single example
Multi-shot prompting = providing multiple examples

Implementation = wrap examples in XML tags for structure, include sample input and ideal output

Use cases = handling corner cases (like sarcasm detection), complex output formats (JSON structures), improving consistency

Corner case handling = explicitly warn model about specific scenarios then provide example demonstrating proper handling

Output format guidance = show complex structures through examples rather than just describing them

Prompt evaluation optimization = find highest-scoring outputs from testing, use as examples in prompts, optionally include reasoning why output is ideal

Effectiveness boost = explaining why example output is ideal helps reinforce desired behavior patterns

Common application = anytime you need consistent handling of edge cases or specific output formatting requirements
</note>

<note title="Introducing Tool Use">
Tool use = Claude accessing external information beyond training data

Problem: Claude lacks real-time data (e.g., current weather, recent events)

Tool use flow:
1. Send request to Claude + tool instructions
2. Claude requests specific external data
3. Server runs code to fetch data from external APIs
4. Send fetched data back to Claude
5. Claude generates final response with external data

Weather example:
User asks weather → Claude requests weather data → Server calls weather API → Claude receives weather info → Claude responds with current weather

Key challenge: Code implementation order differs from logical flow. Developers typically write: tool function → JSON schema → tool result handling → include schema in request. This jumping around makes tool use conceptually difficult.

Solution: Reference the logical flow diagram frequently when implementing to maintain clarity on which piece is being built.
</note>

<note title="Tool Functions">
Tool Functions = Python functions automatically called by Claude to solve tasks it cannot handle natively.

Claude limitations requiring tools:
- Doesn't know exact current time
- Imperfect time-based calculations 
- Cannot actually set reminders/perform external actions

Tool implementation approach = Create dedicated function for each limitation. Example project uses 3 tools: get_current_datetime, add_duration_to_date, set_reminder.

Tool function best practices:
- Use descriptive argument names (critical for Claude understanding)
- Validate inputs when possible, raise errors for invalid data
- Write as plain Python functions that return useful data

Tool creation process = Multi-step: 1) Write tool function 2) Create JSON schema spec 3) Register with Claude 4) Test integration.

Example tool function:
\`\`\`
def get_current_datetime(date_format="%Y%m%d%H%M%S"):
    return datetime.now().strftime(date_format)
\`\`\`

Tool functions bridge gap between Claude's knowledge and real-world system capabilities.
</note>

<note title="JSON Schema for Tools">
JSON Schema for Tools = specification format describing tool function arguments that helps Claude understand how to use functions.

JSON Schema = general-purpose data validation technique, not specific to LLMs or tool use.

Schema structure = two main parts: name/description at top, JSON object defining function parameters.

Schema creation process:
1. Create dictionary with function arguments as keys and sample data as values
2. Convert to JSON format (Python True → JSON true)
3. Use online "JSON to JSON schema converter" tools
4. Remove $schema statement from output
5. Add description field to each property

Description best practices:
- Overall tool description = 3-4 sentences explaining what tool does, when to use it, what data it returns
- Property descriptions = detailed explanations of each argument's purpose
- Can use Claude to generate descriptions by pasting function code

Schema purpose = sent to Claude in requests to enable proper function calling with correct argument types and structure.
</note>

<note title="Handling Tool Use Responses">
Tool Use Response Structure:

Response = dictionary with stop_reason key. stop_reason values indicate why model stopped generating output.

stop_reason = "tool_use" signals model wants to call a tool.

Assistant Message Structure:

content = list of parts (not single text object)
- text part = helpful message to user
- tool_use part = instruction for developers to run specified tool

Tool Use Part Components:

tool_use_id = unique identifier for tracking
name = exact tool name from JSON schema
input = dictionary of arguments to pass to tool function

Conversation History Requirements:

Must include entire conversation history in follow-up requests including:
- Original user message
- Complete assistant message (all parts)
- Tool result parts (for subsequent requests)

Implementation Changes:

chat() function returns both text and parts (not just text)
add_assistant_message() and add_user_message() accept either string or list of parts
Content parameter replaces text parameter for flexibility

Tool Choice Configuration:

auto = Claude decides whether to use tools (default)
any = forces Claude to use any available tool
{tool: {name: "tool_name"}} = forces specific tool (useful for testing)

Key Takeaway: Tool use responses contain multiple message parts requiring conversation history management to maintain context across tool calls.
</note>

<note title="Running Tool Functions">
Tool Function Execution = Process of running actual tool functions based on tool use parts received from Claude

Key Components:

Tool Use Parts Extraction = Filter message parts to find dictionaries containing "tool_use" key
Multiple Tool Handling = Claude can send multiple tool use requests in parallel within single message
Required Extraction = tool_use_id, name, input from each tool use part

Tool Execution Function:
- Match tool name to actual function
- Use **tool_input to splat dictionary arguments into function
- Handle unknown tool names with exceptions
- Return function output

Tool Result Parts = Response format sent back to Claude after tool execution
Structure: {tool_result: {tool_use_id, content: [text output], status: success/error}}

Tool Use ID System = Unique identifiers linking tool requests to results when multiple tools run in parallel

Error Handling = Wrap tool execution in try/except, return error status to Claude instead of failing
- Claude can analyze errors and potentially retry with corrected arguments
- Error tool result includes error message in content

Output Processing = JSON serialize tool outputs to strings for consistent formatting
Final Step = Return list of tool result parts to send back to Claude
</note>

<note title="Sending Tool Results">
Tool results completion process:

Tool result parts = list of outputs from executed tools that must be added to conversation history

Message history management = add assistant message with tool use requests, then add user message with tool result parts to maintain conversation flow

Final API call requirements = send complete message history + original tool schemas to Claude (schemas必须included or Claude gets confused about tool definitions)

Conversation structure = User message → Assistant message (tool requests) → User message (tool results) → Assistant response

Verification method = successful tool execution evidenced by Claude accessing real-time data it normally wouldn't have (like current time vs just date)

Critical requirement = tool schemas must be included in follow-up calls for Claude to understand tool definitions and process results correctly.
</note>

<note title="Multi-Turn Conversations with Tools">
Multi-turn conversations with tools = conversations where AI can iteratively use tools and respond based on results until task completion.

Key implementation pattern:
1. Check response.stop_reason to determine if tool use needed
2. If stop_reason != "tool_use", conversation complete
3. If stop_reason == "tool_use", process tool requests and continue loop

Essential components:
- Chat function returns: parts list, stop_reason, text content
- Run_conversation function: handles while loop until non-tool-use stop reason
- Message flow: user message → assistant with tool_use → tool results → assistant final response

Critical logic: Only process tool requests when stop_reason indicates tool use needed. Prevents adding empty tool result messages when no tools requested.

Function structure:
\`\`\`
run_conversation(messages):
  while True:
    result = chat(messages, tools)
    add assistant_message(result.parts) to messages
    if result.stop_reason != "tool_use": break
    tool_results = run_tools(result.parts)
    add user_message(tool_results) to messages
  return messages
\`\`\`

Benefits: Handles both tool-requiring and non-tool conversations automatically. Maintains proper message ordering throughout multi-turn interactions.
</note>

<note title="Adding Multiple Tools">
Multiple Tools Implementation = Adding tools beyond initial single tool requires minimal code changes

Tool Addition Process:
1. Add tool schemas to conversation function (JSON specs define tool parameters/structure)
2. Add corresponding cases to run_tools function (maps tool names to actual function calls)
3. Rerun cells to activate changes

Example Flow: "Set reminder for doctor appointment in 100 days"
- Claude plans: get current date → add 100 days duration → set reminder
- Executes three tools sequentially to complete task

Key Insight: Initial tool use setup is complex, but adding additional tools afterward is straightforward - just schema registration + function mapping.

Tool Schema = JSON specification defining tool parameters and structure
Run Tools Function = Dispatcher that maps tool names to actual function implementations
</note>

<note title="Batch Tool Use">
Batch Tool Use = technique to parallelize tool calls by implementing a special "batch tool" that can execute multiple tool operations simultaneously.

Problem: Claude can send multiple tool use parts in one message but often executes them sequentially rather than in parallel, even when operations are independent.

Solution: Create batch tool with spec containing:
- Tool name: "batch_tool" 
- Input: list called "invocations"
- Each invocation object has: tool name + arguments (JSON encoded string)

Implementation:
- Add batch tool case to run_tool function
- Create run_batch function that loops through invocations
- Parse JSON arguments with json.loads()
- Delegate to existing run_tool function for each invocation
- Collect all outputs in batch_output list
- Return combined results as single tool response

Result: Claude treats multiple tool calls as single batch operation, achieving parallelization.

Key insight: By providing batch capability as a tool option, Claude is "tricked" into grouping parallel-eligible operations into single request rather than making sequential calls.
</note>

<note title="Structured Data with Tools">
Structured Data with Tools = method for extracting JSON from Claude using tool schemas instead of prompt-based techniques with message pre-fill and stop sequences.

Core Concept = Define a JSON schema as a fake tool where inputs match the desired data structure. Claude calls this tool with extracted data as arguments.

Process Flow:
1. Create tool schema with desired output structure as input parameters
2. Send prompt + data + schema to Claude with tool_choice parameter
3. Claude responds with assistant message containing tool use call
4. Extract JSON arguments from tool call response
5. End conversation (don't continue after getting data)

Advantages = More reliable than prompt-based extraction
Disadvantages = More complex setup, requires tool schema definition

Tool Choice Parameter = Forces Claude to use specific tool instead of auto-deciding. Options: "auto", "any", or specific tool name.

Example Structure = For financial data extraction: tool inputs would be balance (integer) and key_insights (string array), matching desired JSON output format.

Implementation = Use tool_choice parameter set to specific tool name to ensure Claude calls the extraction tool rather than responding normally.

Key Difference from Prompt Method = Uses Claude's tool-calling mechanism instead of JSON formatting in text responses, providing more structured and reliable output parsing.
</note>

<note title="Flexible Tool Extraction">
Flexible Tool Extraction = method to avoid writing large JSON schemas for structured data extraction

Core approach: Create single schema named "toJSON" with flexible object input allowing any properties Claude wants to add. Specify desired structure in prompt text instead of rigid schema.

Implementation steps:
1. Define toJSON tool with flexible object parameter
2. Write prompt listing exact properties and types needed
3. Tell Claude to call toJSON with specified structure
4. Use escaped curly braces in F-strings for property definitions

Benefits: Easy structure modifications by editing prompt text only, no schema rewrites needed

Trade-off: Slightly lower quality results compared to dedicated schemas, but still produces high-quality JSON

Use case recommendation: Flexible approach for general extraction, dedicated schemas for critical data extraction tasks requiring maximum accuracy

Key advantage: Rapid iteration and structure changes without managing complex JSON schema definitions
</note>

<note title="The Text Editor Tool">
Text Editor Tool = built-in tool for Claude providing file/directory manipulation capabilities

JSON Schema = provided by Claude automatically, defines tool interface and parameters  
Tool Implementation = must be written by developer to handle actual file operations

Required Tool Names:
- Claude 3-7: "str_replace_editor"  
- Claude 3-5: "str_replace_based_edit_tool"
- Must use exact string IDs for AWS Bedrock

Five Commands Claude Can Request:
1. view = read file/directory contents
2. str_replace = replace specific text in file
3. create = make new file/directory
4. insert = add text at specific line
5. undo_edit = reverse previous edit

Tool Flow:
1. User sends prompt requiring file access
2. Claude responds with assistant message containing tool_use part
3. Developer code processes command using text editor class
4. Tool result sent back to Claude as user message
5. Claude provides final response

Key Point = Developer must implement all five command handlers despite Claude having built-in schema. Enables Claude to act as software engineer with file system access.

Use Case = Replicates AI code editor functionality - can refactor files, create new features, generate test files automatically.
</note>

<note title="Introducing Retrieval Augmented Generation">
RAG = Retrieval Augmented Generation, technique for querying large documents with LLMs.

Problem: Need to extract specific information from large documents (100-1000 pages) using Claude, but face context limits and performance issues.

Option 1 - Direct approach: Put entire document text into prompt with question. Issues: hits token limits, reduced effectiveness with long prompts, higher costs, slower processing.

Option 2 - RAG approach: Two-step process. Step 1: Break document into small chunks. Step 2: For user question, find most relevant chunks and include only those in prompt with question.

RAG advantages: Claude focuses on relevant content only, scales to very large/multiple documents, smaller prompts = faster/cheaper processing.

RAG disadvantages: Higher complexity, requires preprocessing step, need search mechanism to find relevant chunks, must define "relevance", no guarantee chunks contain complete context, multiple chunking strategies possible (equal portions vs headers vs other methods).

Key tradeoff: RAG adds technical complexity but enables handling of large documents that would otherwise exceed token limits or perform poorly.

Implementation requires: document chunking strategy, relevance search mechanism, evaluation of chunking approaches for specific use case.
</note>

<note title="Text Chunking Strategies">
Text Chunking Strategies = process of dividing documents into smaller text segments for RAG pipelines

**Core Problem**: Poor chunking creates context errors. Example: medical text containing "bug" gets retrieved for software engineering questions due to word overlap without proper context.

**Three Main Strategies**:

1. **Size-based chunking** = divide document into equal-length strings
   - Pros: easiest to implement, most common in production
   - Cons: cuts off words mid-sentence, lacks context
   - Solution: overlap strategy = include characters from neighboring chunks to add context
   - Trade-off: creates text duplication but improves meaning

2. **Structure-based chunking** = divide based on document structure (headers, paragraphs, sections)
   - Example: split on markdown headers (##)
   - Pros: creates well-formed, contextual sections
   - Cons: requires structured documents, doesn't work with plain PDFs/unformatted text

3. **Semantic-based chunking** = use NLP to group related sentences/sections
   - Most advanced technique
   - Groups consecutive sentences by semantic similarity
   - Infinite possible chunking variations exist

**Strategy Selection**:
- Structured documents with format guarantees = structure-based chunking
- Unstructured documents = sentence-based chunking
- Code or complex formats = character-based chunking (most reliable fallback)

**Key Parameters**:
- Chunk size
- Overlap amount
- Splitting criteria (characters, sentences, sections)

Character-based chunking = most reliable default despite suboptimal results because it works across document types.
</note>

<note title="Text Embeddings">
Text Embeddings = numerical representation of meaning in text generated by embedding models

Process: Text input → Embedding model → List of numbers (typically 1024 elements, values -1 to +1)

Key concepts:
- Each number represents score of some text quality/feature
- Actual meaning of individual numbers is unknown/opaque
- Useful mental model: imagine numbers as scores for different qualities (happiness, topic relevance, etc.)
- Multiple embedding models available (e.g., Titan embed text V2)

Purpose in RAG: Enable semantic search to find text chunks related to user queries by comparing numerical representations rather than exact text matching

Implementation: Simple API call to embedding service, returns long array of float values representing text meaning in high-dimensional space
</note>

<note title="The Full RAG Flow">
RAG Flow = complete pipeline merging text chunking, embeddings, and retrieval for document-based AI responses.

Step 1: Document chunking = split source documents into separate text pieces.

Step 2: Generate embeddings = convert text chunks into numerical vectors using embedding models. Embeddings = multi-dimensional arrays representing semantic meaning of text.

Step 3: Normalization = scale vector magnitudes to 1.0 (handled automatically by embedding APIs).

Step 4: Vector database storage = specialized database for storing, comparing, and retrieving numerical vectors.

Step 5: User query processing = embed user question using same embedding model.

Step 6: Similarity search = vector database finds most similar stored embeddings to user query.

Cosine similarity = measure of similarity between vectors, calculated as cosine of angle between them. Results range from -1 to 1, where values closer to 1 indicate higher similarity.

Cosine distance = 1 minus cosine similarity. Values closer to 0 indicate higher similarity.

Step 7: Prompt construction = combine user question with most relevant retrieved text chunks.

Step 8: LLM generation = send combined prompt to language model for response.

Vector databases use cosine similarity calculations to identify semantically related content without exact keyword matching.
</note>

<note title="Implementing the Rag Flow">
RAG Flow Implementation = 5-step process for retrieval-augmented generation using vector database

Step 1: Text Chunking = Split document into sections using chunk_by_section function on report.MD file

Step 2: Embedding Generation = Loop through chunks, generate embeddings via API calls using generate_embedding function for each text chunk

Step 3: Vector Store Creation = Create vector_index instance, store embedding-chunk pairs using zip operation. Store both embedding vector + original text content in dictionary format for later text retrieval

Step 4: Query Processing = Generate embedding for user question ("what did software entering depth do last year")

Step 5: Similarity Search = Use store.search with user embedding, retrieve top 2 most relevant chunks based on cosine distance

Results = Section 2 (distance 0.71) and Methodology section (distance 0.72) identified as most relevant chunks

Key Design Choice = Store original text with embeddings because raw embeddings lack meaning for developers - need text or chunk ID for practical use

Vector Database Class = Custom implementation called vector_index for storing and searching embeddings

Search Output = Returns document content + cosine distance score for relevance ranking

Current Limitations = Workflow functional but has scenarios requiring improvements
</note>

<note title="BM25 Lexical Search">
BM25 = Best Match 25, a lexical search algorithm used in RAG pipelines to improve search results through keyword-based text matching.

Problem with pure semantic search = Can miss documents with exact keyword matches, returning irrelevant results despite semantic similarity.

Hybrid search strategy = Run semantic search and lexical search in parallel, then merge results to get both semantic understanding and exact keyword matching.

BM25 algorithm steps:
1. Tokenize user query into individual terms (remove punctuation, split on spaces)
2. Count frequency of each term across all document chunks
3. Assign importance weights - rare terms get higher weights, common terms get lower weights
4. Return chunks that contain higher-weighted terms more frequently

Term weighting logic = Frequently used terms (like "a", "the") are less important, rare specific terms (like "incident 2023") are more important for search relevance.

BM25 advantages = Better handles exact keyword matches that semantic search might miss, especially for specific identifiers, codes, or technical terms.

Implementation approach = Create unified API where both semantic and lexical search systems have add_document() and search() functions for easy integration.

Next step = Merge semantic and lexical search results to combine benefits of both approaches.
</note>

<note title="A Multi-Search RAG Pipeline">
Multi-Search RAG Pipeline = RAG system combining semantic search (vector index) and lexical search (BM25 index) for improved retrieval accuracy.

Core Components:
- Vector Index = semantic search using embeddings
- BM25 Index = lexical search using keyword matching
- Retriever Class = wrapper that coordinates both indexes with unified API (add_document, search methods)

Reciprocal Rank Fusion (RRF) = technique for merging results from multiple search methods. Formula: score = sum of (1/(1+rank)) for each search method's ranking of a document. Higher scores indicate better relevance.

RRF Process:
1. Execute same query on both indexes
2. Collect all unique results with their ranks from each method
3. Apply RRF formula to calculate combined score
4. Sort by score (highest to lowest)

Example: Document ranked 1st in vector search and 2nd in BM25 gets score = 1/(1+1) + 1/(1+2) = 0.5 + 0.33 = 0.83

Benefits:
- Improved search accuracy by combining semantic and lexical strengths
- Modular design allows easy addition of new search methods
- Unified API enables seamless integration
- Better handling of edge cases where single method fails

Implementation uses consistent API across all search components, enabling straightforward composition and extension.
</note>

<note title="Reranking Results">
Reranking = post-processing step that uses LLM to reorder search results by relevance after initial retrieval

Process: Vector + BM25 search → merge results → pass to LLM (Claude) with prompt asking to rank documents by relevance to user query

Implementation details:
- Assigns temporary IDs to documents for efficiency (LLM returns ordered IDs rather than full text)
- Uses XML formatting for document presentation to LLM
- Requests specific number of most relevant results in decreasing order
- Uses assistant message pre-fill + stop sequence for structured JSON output

Benefits: Improves retrieval accuracy by leveraging LLM's understanding of semantic relevance between query and documents

Tradeoffs: Increases latency due to additional LLM call but significantly improves search result quality

Example improvement: Query "What did engineering team do with incident 2023?" correctly surfaces software engineering section to top position after reranking, whereas hybrid retrieval alone ranked it second.
</note>

<note title="Contextual Retrieval">
Contextual Retrieval = technique to improve RAG pipeline accuracy by adding context to document chunks before vector storage.

Problem: When documents are split into chunks, each chunk loses context from the original document.

Solution: Pre-processing step that uses LLM to generate contextual information for each chunk before inserting into retriever database.

Process:
1. Take individual chunk + original source document
2. Send to LLM with prompt asking to situate the chunk within larger document context
3. LLM generates brief contextual description
4. Combine generated context + original chunk = contextualized chunk
5. Insert contextualized chunk into vector/BM25 indexes

Large Document Handling: If source document too large for single prompt, use subset strategy:
- Include chunks from document start (summary/abstract)
- Include chunks immediately before target chunk
- Skip middle sections that provide less relevant context

Output Example: LLM adds context like "This is section X from larger report covering Y domains, following methodology Z, before financial analysis section"

Implementation: add_context() function takes text chunk + source text, prompts LLM for context, returns contextualized chunk for indexing.

Benefit: Chunks retain connection to overall document structure and cross-references, improving retrieval accuracy for complex documents with interconnected sections.
</note>

<note title="Extended Thinking">
Extended Thinking = Claude's feature that allows reasoning before generating final response

Key mechanics:
- Displays separate thinking process in chat UIs
- Generates reasoning content part + text part in response
- Reasoning content part contains thinking text + cryptographic signature
- Signature prevents tampering with reasoning text (security measure)
- Redacted content = encrypted thinking text flagged by safety systems

Trade-offs:
- Increased accuracy for complex tasks
- Higher cost (charged for thinking tokens)
- Increased latency

When to use:
- Run prompt evals first
- Enable only if accuracy insufficient after prompt optimization efforts
- No universal rule - depends on specific use case evals

Technical implementation:
- thinking parameter (boolean)
- thinking_budget parameter (minimum 1024 tokens)
- Budget = max tokens Claude can spend on thinking phase
- Optimal budget determined by evals, not rules of thumb

Testing:
- Magic string available to force redacted content responses
- Used only for testing application's handling of redacted content blocks

Core principle: Decision to use extended thinking must be eval-driven, not assumption-based.
</note>

<note title="Image Support">
Claude Vision Capabilities = ability to process images in messages alongside text

Image Requirements:
- Max 20 images per request across all messages
- Size/dimension limitations apply
- Images consume tokens based on pixel dimensions (height × width)

Image Implementation:
- Images = message parts in user messages
- One image part per image
- Multiple images = multiple image parts in same message

Critical Success Factor = Strong prompting techniques required for accurate results

Common Mistake = Simple prompts with images produce poor results
Example: "How many marbles?" → incorrect count (13 instead of 12)

Effective Techniques:
1. Step-by-step analysis instructions
   - Break down image analysis into sequential steps
   - Provide verification/recount mechanisms
   - Compare results for accuracy

2. One-shot/multi-shot prompting
   - Alternate image parts with text parts
   - Provide example image with correct analysis
   - Format: Image → Text explanation → Target Image → Query

Real-world Application Example = Fire risk assessment for insurance
- Satellite imagery analysis
- Multi-step evaluation: residence identification, tree density, fire service access, roof overhang assessment
- Structured scoring system with detailed criteria
- Final risk rating with summary

Key Takeaway = Image accuracy depends heavily on prompt engineering, not just image quality. Apply same advanced prompting techniques used for text-only interactions.
</note>

<note title="Prompt Caching">
Prompt Caching = feature that speeds up Claude's responses and reduces text generation costs by reusing computational work from previous requests.

Normal Request Flow:
1. User sends message to Claude
2. Claude creates internal data structures and performs calculations on input text
3. Claude generates output using that work
4. Claude sends response back
5. Claude discards all calculations and internal work

Problem = Claude repeatedly processes identical input text, wasting computational resources and time.

Solution = Prompt Caching:
- Instead of discarding calculations, Claude stores them in temporary cache
- When follow-up requests contain identical input messages, Claude retrieves cached work
- Reuses previous calculations rather than reprocessing same text
- Results in faster response times and lower costs

Key Benefit = Dramatic speed improvement for conversations or requests with repeated content by eliminating redundant processing.
</note>

<note title="Rules of Prompt Caching">
Prompt Caching = temporary storage of Claude's processing work for 5 minutes to avoid reprocessing identical content

Cache Point = special message part that marks where caching should occur - caches all content before the cache point

Key mechanics:
- Initial request processes content and saves work to cache
- Follow-up requests reuse cached work if content before cache point is identical
- Content after cache point is never cached
- Works across multiple messages/parts including assistant messages

Requirements:
- Minimum 1024 tokens of content before cache point required for caching
- Content before cache point must be exactly identical between requests
- Any difference in pre-cache-point content invalidates cache usage

Common applications:
- Tool definition schemas (JSON specs often reused)
- System prompts (rarely change between requests)
- Repeated content processing scenarios

Cache points can be applied to:
- Text parts within messages
- Tool definition lists
- System prompts
- Multi-message conversations

Most useful for scenarios with repeated identical content sent to Claude multiple times.
</note>

<note title="Prompt Caching in Action">
Prompt caching = storing processed prompt parts to reuse in subsequent requests, reducing cost and latency

Implementation:
- Add cache_point with type="default" to system prompt parts
- Concatenate cache_point to tools list 
- Include usage field in response to monitor cache activity

Cache behavior:
- First request = cache_write (stores processed tokens)
- Subsequent requests = cache_read (retrieves cached tokens)
- Cache expires after 5 minutes of inactivity
- Changing cached content triggers new cache_write

Usage monitoring:
- cache_write_input_tokens = tokens stored to cache
- cache_read_input_tokens = tokens retrieved from cache
- Monitor usage field to verify caching effectiveness

Best practices:
- Cache system prompts (rarely change between requests)
- Cache tool schemas (static definitions, often >1024 tokens)
- Minimum 1024 tokens required for caching
- Cache survives text changes below cache_point
- Cache invalidated by content changes above cache_point

Benefits = reduced generation cost + faster response times for repeated prompt components
</note>

<note title="Introducing MCP">
MCP = Model Context Protocol, communication layer providing Claude with context and tools without requiring developers to write tedious code.

MCP Architecture: Client-server model. Server contains tools, resources, and prompts as internal components.

Core Problem Solved: Eliminates developer burden of authoring, testing, and maintaining numerous tool schemas and functions for external service integrations like GitHub APIs.

MCP Server = Interface to outside service that wraps functionality into pre-built tools. Shifts tool definition and execution from your server to dedicated MCP server.

Key Benefits: Developers no longer author tool schemas and function implementations themselves. MCP server handles GitHub/AWS/other service integrations with ready-made tools.

Common Questions:
- Who authors MCP servers? Anyone, but often service providers create official implementations
- How different from direct API calls? Saves time by eliminating need to author schemas and function implementations yourself
- MCP vs tool use? They're complementary, not the same. MCP handles who does the work, tool use is the mechanism

Essential Point: MCP servers provide pre-built tools for external services, removing integration development overhead from application developers.
</note>

<note title="MCP Clients">
MCP Client = communication layer between your server and MCP server, provides access to server's tools

Transport agnostic = client/server can communicate via multiple protocols (stdio, HTTP, WebSockets, etc.)

Common setup = MCP client + server on same machine communicating via standard input/output

Communication = message exchange defined by MCP spec

Key message types:
- list tools request = client asks server for available tools
- list tools result = server responds with tool list  
- call tool request = client asks server to run specific tool with arguments
- call tool result = server returns tool execution results

Typical flow:
1. User queries server
2. Server requests tool list via MCP client
3. MCP client sends list tools request to MCP server
4. Server gets tools, sends query + tools to Claude
5. Claude responds with tool use request
6. Server asks MCP client to execute tool
7. MCP client sends call tool request to MCP server
8. MCP server executes tool (e.g., GitHub API call)
9. Results flow back: MCP server → MCP client → server → Claude
10. Claude formulates final response with tool results
</note>

<note title="Project Setup">
Project Setup = Building CLI-based chatbot to understand MCP client-server interaction

Goal = Create MCP client + custom MCP server in single project for learning (normally would build only client OR server)

Features = Work with fake documents stored in memory, 2 tools (read document contents, update document contents)

Setup steps = Download CLI project.zip starter code, configure environment variables (bedrock region + model ID from previous notebooks), install Python dependencies via uv or pip

Running = "uv run main.py" or "python main.py" launches chat prompt

Key note = Educational project combines both client and server development, real projects typically focus on one side only
</note>

<note title="Defining Tools with MCP">
MCP tools = functions that language models can call to perform specific actions

MCP Python SDK = official package that simplifies MCP server creation and tool definition without manual JSON schema writing

Tool definition syntax = @mcp.tool decorator with name, description, and typed parameters using pydantic Field

Tool implementation process:
1. Use @mcp.tool decorator
2. Define function with typed parameters  
3. Add Field descriptions for each parameter
4. Implement function logic
5. SDK auto-generates JSON schema

Example tools implemented:
- read_doc_contents = takes doc_id string, returns document content from in-memory dictionary
- edit_document = takes doc_id, old_string, new_string, performs find/replace operation

Error handling = check if doc_id exists in docs dictionary, raise ValueError if not found

Key advantage = MCP SDK eliminates manual JSON schema creation, significantly simplifying tool development compared to raw schema definitions
</note>

<note title="The Server Inspector">
MCP Inspector = in-browser debugger for testing MCP servers without connecting to applications

Access method: Run \`mcp dev [server-filename.py]\` in terminal with activated Python environment → opens server on port → navigate to provided localhost address

Key features:
- Connect button = starts MCP server
- Top menu bar = shows resources, prompts, tools sections
- Tools section = lists available tools from server
- Right panel = manual tool invocation interface for testing

Testing workflow:
1. Click Connect to start server
2. Navigate to Tools → List Tools
3. Select tool to test
4. Input required parameters in right panel
5. Click Run Tool to execute and verify results

Purpose = live development testing of MCP servers without full application integration

Note: UI subject to change during active development, but core functionality remains similar
</note>

<note title="Implementing a Client">
MCP Client Implementation:

MCP Client = wrapper class around client session for resource management and cleanup

Client Session = actual connection to MCP server (part of MCP Python SDK)

Client Purpose = expose MCP server functionality to rest of codebase, handle resource cleanup through async enter/exit functions

Key Functions:
- list_tools() = await self.session.list_tools(), return result.tools
- call_tool() = await self.session.call_tool(tool_name, tool_input)

Tool Schema Conversion = MCP tool definitions differ from Bedrock expectations, requires conversion via to_bedrock_tools() function

Testing = run MCP client directly to verify server connection and tool retrieval

Workflow = client gets tool list for Claude, executes tools when Claude requests them, manages server connection lifecycle

Implementation Note = typical projects use either client OR server, not both - this project shows both sides for demonstration
</note>

<note title="Defining Resources">
MCP Resources = mechanism for MCP servers to expose data to clients for read operations

Resource Types:
- Direct/Static Resources = fixed URI (e.g., "docs://documents")
- Templated Resources = parameterized URI with wildcards (e.g., "docs://documents/{doc_id}")

Resource Flow:
1. Client sends read resource request with URI to MCP server
2. Server matches URI to resource function
3. Server executes function and returns result
4. Client receives data in read resource result message

Implementation:
- Use @mcp.resource decorator with URI and MIME type
- MIME types: application/json for structured data, text/plain for raw text
- Templated resource parameters become function keyword arguments
- Python MCP SDK auto-serializes return values to strings

Example Use Case:
- List documents resource returns available document names for autocomplete
- Fetch document resource returns specific document content by ID
- Enables @ mentions in chat without requiring tool calls

Key Points:
- One resource per distinct read operation
- Resources expose data, tools perform actions
- Client handles deserialization based on MIME type
- Error handling with exceptions (e.g., ValueError for missing documents)
</note>

<note title="Accessing Resources">
MCP Resource Access = reading resources from MCP server by URI

Function Implementation:
- read_resource(uri) = main client function to fetch and parse resources
- Uses session.read_resource(AnyURL(uri)) to make server request
- Takes result.contents[0] = first resource from response list

Content Parsing Logic:
- Check resource.mime_type property from server response
- If mime_type == "application/json": return json.loads(resource.text)
- Otherwise: return resource.text as plain text

Integration Flow:
- MCP client function called by other application components
- Client requests resource list from server
- User selects resource via CLI interface
- Resource content inserted into prompt and sent to Claude
- No tool calls needed since content already retrieved

Key Point: Resources expose server information to clients through standardized URI-based access with automatic content-type parsing.
</note>

<note title="Defining Prompts">
MCP Prompts = pre-defined, tested prompts exposed by servers for specialized tasks

Purpose = Allow server developers to create high-quality, domain-specific prompts that clients can use instead of users writing ad-hoc prompts

Implementation = Use @prompt decorator with name/description, return list of messages (user/assistant format)

Key Benefits = Better results than user-written prompts, reusable across clients, specialized for server's domain

Example Use Case = Document formatting prompt that instructs Claude to read document via tools, reformat to markdown, and save changes

Structure = Prompt function receives parameters (like document ID), returns base.UserMessage objects with interpolated prompt text

Testing = Use MCP development inspector to list prompts, select prompt, enter parameters, get formatted message list ready for LLM

Core Concept = Server authors create optimized prompts for their domain (document management, etc.) that any client can leverage without prompt engineering
</note>

<note title="Prompts in the Client">
**Prompts in MCP Client Implementation**

**Core Functions:**
- list_prompts() = await self.session.list_prompts(), return result.props
- get_prompt() = await self.session.get_prompt(prompt_name, arguments), return result.messages

**Prompt Flow:**
1. Define prompts in MCP server with argument placeholders (e.g., document_id)
2. Client requests prompt by name + provides arguments dictionary
3. Server interpolates arguments into prompt template
4. Returns formatted messages for LLM consumption

**Key Concepts:**
- Prompts = templates with variable placeholders for dynamic content
- Arguments = key-value pairs passed to prompt functions as keyword arguments
- result.messages = conversation format fed directly to LLM (Claude)
- CLI integration shows prompts as commands with argument selection

**Example Usage:**
format_document prompt expects document_id argument → Client provides document_id → Server returns formatted prompt with document reference → LLM uses prompt + tools to complete task

**Purpose:** Allows clients to retrieve server-defined prompt templates with runtime variable substitution for consistent LLM interactions.
</note>

<note title="MCP Review">
MCP Server Primitives = 3 types with distinct control patterns and purposes

Tools = Model-controlled. Claude decides when to execute. Purpose: Add capabilities to Claude. Example: JavaScript execution for calculations.

Resources = App-controlled. Application code decides when to fetch/use data. Purpose: Provide data to UI or augment prompts. Example: Auto-complete options, document content injection.

Prompts = User-controlled. User triggers via UI buttons, slash commands, etc. Purpose: Predefined workflows. Example: Chat starter buttons in Claude interface.

Control Pattern Summary:
- Tools serve the model
- Resources serve the app  
- Prompts serve users

Usage Guidelines:
- Need Claude capabilities → implement tools
- Need app data/UI content → use resources
- Need predefined workflows → create prompts

Real Examples in Claude.ai:
- Buttons below chat input = prompts
- Google Drive document listing = resources
- Automatic code execution = tools
</note>

<note title="Claude Code in Action">
Claude Code = AI coding assistant that functions as another engineer on your team, not just a code generator

Key workflow:
1. Download project zip, extract, open in editor
2. Run \`claude\` command in terminal
3. Ask Claude to read README and execute setup directions
4. Run \`init\` command - Claude scans codebase, creates claude.md file with project architecture/coding style notes
5. claude.md automatically included as context in future requests

Three memory types: project, local, user
- Use # + note to append specific directions to claude.md
- Can manually edit claude.md or rerun init to update

Effort multiplier principle = small effort in directing Claude yields significantly better results

Two effective workflows for complex features:

Workflow 1 - Three-step approach:
1. Identify relevant files, ask Claude to read/analyze them
2. Describe feature, ask Claude to plan solution (no code yet)
3. Ask Claude to implement the plan

Workflow 2 - Test-driven development:
1. Ask Claude to read relevant context
2. Ask Claude to suggest tests for feature (no implementation)
3. Select most relevant tests, ask Claude to implement them
4. Ask Claude to write code until tests pass

Example feature: document-to-markdown conversion tool
- Reads PDF/Word documents from file path
- Converts to markdown format
- Includes error handling for unsupported files

Commands:
- \`claude\` = launch Claude Code
- \`init\` = scan codebase, generate claude.md
- \`/clear\` = reset conversation history
- \`# [note]\` = append note to claude.md
</note>

<note title="Enhancements with MCP Servers">
MCP Servers in Claude Code = embedded MCP client allows connecting external MCP servers to expand functionality dynamically

Setup Process:
- Command: \`claude mcp add [server-name] [startup-command]\`
- Example: \`claude mcp add documents "uv run main.py"\`
- Restart Claude Code with \`claude\` command

Demonstration = Document Path to Markdown tool allows Claude Code to read PDF/Word documents, convert to Markdown format

Use Cases:
- Sentry MCP server = fetch production error details
- Jira MCP server = view ticket contents  
- Slack MCP server = send completion notifications
- Custom development workflow integrations

Key Benefit = Dramatically expands Claude Code capabilities through modular MCP server connections, enabling specialized functionality for specific development needs
</note>

<note title="Parallelizing Claude Code">
Parallelizing Claude Code = running multiple Claude instances simultaneously to complete different tasks in parallel, allowing one developer to manage multiple virtual software engineers.

Core Challenge = file conflicts when multiple Claude instances modify same files simultaneously.

Solution = Git work trees. Each Claude instance gets isolated workspace with complete project copy on separate branch.

Git Work Trees = Git feature creating total project copies in separate directories, each corresponding to different branch. Enables complete isolation between parallel tasks.

Workflow = create work tree → assign task to Claude instance → work in isolation → commit changes → merge back to main branch.

Automation via Custom Commands = create .claude/commands directory with markdown files containing prompts. Use $ARGUMENTS placeholder for dynamic inputs. Access via /project:command-name syntax.

Implementation Steps:
1. Create multiple work trees for different features
2. Launch Claude in each work tree with specific task
3. Let instances work in parallel
4. Commit completed work in each branch  
5. Merge all branches back to main (Claude can handle merge conflicts)
6. Clean up work trees

Benefits = massive productivity increase, scales to as many parallel instances as developer can manage. Claude handles Git operations including conflict resolution.

Key Insight = delegate entire workflow management to Claude itself, including work tree creation, merging, and cleanup.
</note>

<note title="Automated Debugging">
Automated Debugging = using AI agents to automatically detect, diagnose, and fix production errors without manual intervention.

Core workflow: GitHub Action runs daily → pulls CloudWatch logs → filters/deduplicates errors → Claude analyzes each error → generates fixes → commits changes → opens pull request for review.

Key components:
- Error detection: Automated log monitoring from production systems
- Error analysis: AI examines stack traces and error messages 
- Fix generation: AI writes code corrections based on error context
- Integration: Commits fixes and creates PRs automatically

Example case: Production app failing silently (worked locally) → AI found "invalid model identifier" error in logs → identified typo in model ID → corrected configuration → submitted fix via PR.

Benefits: Catches production-only issues, reduces manual log hunting, provides explained fixes with context, maintains code review process through PRs.

Implementation: Requires CI/CD pipeline, log access (CloudWatch/similar), AI coding assistant integration, version control automation.

Limitation: Still requires human review of proposed fixes before merging.
</note>

<note title="Computer Use">
Computer Use = Claude's ability to directly interact with and control computer interfaces through visual input and actions.

Key capabilities:
- Takes screenshots to see current screen state
- Performs mouse clicks, keyboard input, scrolling
- Navigates web browsers and applications
- Executes multi-step workflows autonomously

Primary use cases:
- QA testing automation - Claude can run test cases, identify UI bugs, generate reports
- Web application testing - navigates sites, fills forms, validates functionality
- General computer task automation

Implementation:
- Runs in isolated Docker container for security
- Uses chat interface for instruction input
- Processes visual feedback to determine next actions
- Provides detailed reports on task completion

Benefits:
- Saves developer time on repetitive testing
- Identifies edge cases and failures automatically
- Handles complex multi-step processes
- Works with existing applications without modification

The feature essentially turns Claude into an automated user that can perform any task a human could do through a computer interface.
</note>

<note title="How Computer Use Works">
Tool use flow = User sends request with tool schema to Claude → Claude responds with tool use part (ID, name, input) → Server executes code and returns result → Claude receives tool result.

Computer use = Special case of tool use system. Uses minimal schema that expands into large structure describing action function with arguments (mouse move, left click, screenshot, etc.).

Implementation = Docker container simulates computing environment, executes programmatic key presses/mouse movements based on Claude's tool requests. Claude doesn't directly manipulate computer - relies on external execution environment.

Key point = Claude decides to use tools but developers must provide actual tool execution (weather API, Docker environment, etc.).

Setup = Docker + local AWS profile + simple Docker command. Anthropic provides reference implementation with pre-built container for testing computer use functionality.
</note>

<note title="Qualities of Agents">
Agent = language model with tool access executed repeatedly until goal achieved

Key Agent Qualities:
- Tool-centric operation = agents use tools in loops until goal/error
- Information gathering focus = most tool calls gather environment data vs modify it
- Context dependency = agents rely on tools for environment inspection, not RAG/detailed prompts
- Focused toolset = small set of tools with clear purposes
- High-value, low-risk tasks = valuable work where mistakes don't cause major economic/safety damage

Tool Usage Patterns:
- Claude Code = reads files (info gathering) + writes files (modification) + runs tests
- Computer Use = screenshots provide automatic visual feedback of environment state
- Primary info source = tool calls rather than pre-written knowledge

Agent Design Principles:
- Context is king = LM has no inherent world knowledge, depends entirely on tool-provided environment data
- Evaluation critical = EVALS necessary to ensure agent effectiveness
- Risk assessment = suitable for high-value tasks with manageable failure costs

Core Loop: Tool execution → Environment inspection → Goal progress → Repeat until success/failure
</note>
</notes>