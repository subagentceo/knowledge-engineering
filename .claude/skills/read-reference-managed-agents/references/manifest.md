# Managed Agents reference — section index

Generated outline of every H1/H2/H3 in the bundled `.md` files. Use this to locate the right file/section before opening it. For machine-readable line ranges, see `manifest.tsv`.

## `overview.md`
- # Claude Managed Agents overview  *(L1–L115)*
  - ## Core concepts  *(L26–L36)*
  - ## How it works  *(L37–L56)*
  - ## When to use Claude Managed Agents  *(L57–L65)*
  - ## Supported tools  *(L66–L76)*
  - ## Beta access  *(L77–L89)*
  - ## Rate limits  *(L90–L100)*
  - ## Branding guidelines  *(L101–L115)*

## `quickstart.md`
- # Get started with Claude Managed Agents  *(L1–L179)*
  - ## Core concepts  *(L13–L21)*
  - ## Prerequisites  *(L22–L26)*
  - ## Install the CLI  *(L27–L74)*
  - ## Install the SDK  *(L75–L120)*
  - ## Create your first session  *(L121–L153)*
  - ## What's happening  *(L154–L163)*
  - ## Next steps  *(L164–L179)*

## `onboarding.md`
- # Prototype in Console  *(L1–L41)*
  - ## How to build an agent  *(L13–L23)*
  - ## Testing an agent  *(L24–L27)*
  - ## From prototype to code  *(L28–L41)*

## `agent-setup.md`
- # Define your agent  *(L1–L99)*
  - ## Agent configuration fields  *(L15–L28)*
  - ## Create an agent  *(L29–L49)*
  - ## Update an agent  *(L50–L72)*
    - ### Update semantics  *(L64–L72)*
  - ## Agent lifecycle  *(L73–L94)*
    - ### List versions  *(L81–L87)*
    - ### Archive an agent  *(L88–L94)*
  - ## Next steps  *(L95–L99)*

## `define-outcomes.md`
- # Define outcomes  *(L1–L128)*
  - ## Create a rubric  *(L17–L52)*
  - ## Create a session with an outcome  *(L53–L79)*
  - ## Outcome events  *(L80–L101)*
    - ### Outcome evaluation end  *(L90–L101)*
  - ## Checking on outcome status  *(L102–L113)*
  - ## Retrieving deliverables  *(L114–L128)*

## `tools.md`
- # Tools  *(L1–L116)*
  - ## Available tools  *(L15–L29)*
  - ## Configuring the toolset  *(L30–L78)*
    - ### Disabling specific tools  *(L49–L62)*
    - ### Enabling only specific tools  *(L63–L78)*
  - ## Custom tools  *(L79–L116)*
    - ### Best practices for custom tool definitions  *(L111–L116)*

## `skills.md`
- # Skills  *(L1–L49)*
  - ## Enable skills on a session  *(L20–L42)*
  - ## Skill types  *(L43–L49)*

## `mcp-connector.md`
- # MCP connector  *(L1–L66)*
  - ## Declare MCP servers on the agent  *(L20–L47)*
  - ## Provide auth at session creation  *(L48–L61)*
  - ## Supported MCP server types  *(L62–L66)*

## `multi-agent.md`
- # Multiagent sessions  *(L1–L121)*
  - ## How it works  *(L13–L28)*
    - ### What to delegate  *(L21–L28)*
  - ## Configure the coordinator  *(L29–L57)*
  - ## Create the session  *(L58–L66)*
  - ## Threads  *(L67–L121)*
    - ### List threads  *(L79–L85)*
    - ### Interrupt a session thread  *(L86–L96)*
    - ### Archive a session thread  *(L97–L105)*
    - ### Primary thread events  *(L106–L116)*
    - ### Tool permissions and custom tools  *(L117–L121)*

## `sessions.md`
- # Start a session  *(L1–L112)*
  - ## Creating a session  *(L13–L36)*
  - ## MCP authentication through vaults  *(L37–L48)*
  - ## Starting the session  *(L49–L68)*
  - ## Session statuses  *(L69–L79)*
  - ## Other session operations  *(L80–L112)*
    - ### Retrieving a session  *(L82–L88)*
    - ### Listing sessions  *(L89–L95)*
    - ### Archiving a session  *(L96–L103)*
    - ### Deleting a session  *(L104–L112)*

## `events-and-streaming.md`
- # Session event stream  *(L1–L316)*
  - ## Event types  *(L13–L73)*
    - ### User events  *(L21–L30)*
    - ### Agent events  *(L31–L45)*
    - ### Session events  *(L46–L59)*
    - ### Span events  *(L60–L73)*
  - ## Integrating events  *(L74–L189)*
    - ### Sending events  *(L76–L118)*
    - ### Streaming events  *(L119–L170)*
    - ### Listing past events  *(L171–L189)*
  - ## Additional scenarios  *(L190–L302)*
    - ### Handling custom tool calls  *(L192–L226)*
    - ### Tool confirmation  *(L227–L257)*
    - ### Resuming an idle session  *(L258–L285)*
    - ### Tracking usage  *(L286–L302)*
  - ## Console observability  *(L303–L310)*
  - ## Debugging tips  *(L311–L316)*

## `environments.md`
- # Cloud environment setup  *(L1–L126)*
  - ## Create an environment  *(L13–L28)*
  - ## Use the environment in a session  *(L29–L39)*
  - ## Configuration options  *(L40–L100)*
    - ### Packages  *(L42–L70)*
    - ### Networking  *(L71–L100)*
  - ## Environment lifecycle  *(L101–L107)*
  - ## Manage environments  *(L108–L123)*
  - ## Pre-installed runtimes  *(L124–L126)*

## `cloud-containers.md`
- # Container reference  *(L1–L71)*
  - ## Programming languages  *(L13–L25)*
  - ## Databases  *(L26–L37)*
  - ## Utilities  *(L38–L62)*
    - ### System tools  *(L40–L48)*
    - ### Development tools  *(L49–L56)*
    - ### Text processing  *(L57–L62)*
  - ## Container specifications  *(L63–L71)*

## `permission-policies.md`
- # Permission policies  *(L1–L126)*
  - ## Permission policy types  *(L13–L19)*
  - ## Set a policy for a toolset  *(L20–L66)*
    - ### Agent toolset permissions  *(L22–L42)*
    - ### MCP toolset permissions  *(L43–L66)*
  - ## Override an individual tool policy  *(L67–L87)*
  - ## Respond to confirmation requests  *(L88–L123)*
  - ## Custom tools  *(L124–L126)*

## `vaults.md`
- # Authenticate with vaults  *(L1–L146)*
  - ## Create a vault  *(L15–L30)*
  - ## Add a credential  *(L31–L86)*
    - ### MCP OAuth credential  *(L35–L58)*
    - ### Static bearer credential  *(L59–L86)*
  - ## Reference the vault at session creation  *(L87–L103)*
  - ## Credential refresh  *(L104–L123)*
    - ### Diagnose an OAuth refresh failure  *(L116–L123)*
  - ## Rotate a credential  *(L124–L140)*
  - ## Other operations  *(L141–L146)*

## `files.md`
- # Adding files  *(L1–L119)*
  - ## Uploading files  *(L13–L21)*
  - ## Mounting files in a session  *(L22–L45)*
  - ## Multiple files  *(L46–L59)*
  - ## Managing files on a running session  *(L60–L82)*
  - ## Listing and downloading session files  *(L83–L100)*
  - ## Supported file types  *(L101–L110)*
  - ## File paths  *(L111–L119)*

## `memory.md`
- # Using agent memory  *(L1–L216)*
  - ## Overview  *(L13–L20)*
  - ## Create a memory store  *(L21–L50)*
    - ### Seed it with content (optional)  *(L35–L50)*
  - ## Attach a memory store to a session  *(L51–L83)*
    - ### How the agent accesses memory  *(L78–L83)*
  - ## View and edit memories  *(L84–L156)*
    - ### List memories  *(L88–L100)*
    - ### Read a memory  *(L101–L110)*
    - ### Create a memory  *(L111–L122)*
    - ### Update a memory  *(L123–L147)*
    - ### Delete a memory  *(L148–L156)*
  - ## Audit memory changes  *(L157–L194)*
    - ### List versions  *(L163–L173)*
    - ### Retrieve a version  *(L174–L183)*
    - ### Redact a version  *(L184–L194)*
  - ## Manage memory stores  *(L195–L213)*
    - ### List stores  *(L197–L203)*
    - ### Archive a store  *(L204–L213)*
  - ## Limits  *(L214–L216)*

## `github.md`
- # Accessing GitHub  *(L1–L93)*
  - ## GitHub MCP and Session Resources  *(L15–L37)*
  - ## Token permissions  *(L38–L52)*
  - ## Multiple repositories  *(L53–L56)*
  - ## Managing repositories on a running session  *(L57–L73)*
  - ## Creating pull requests  *(L74–L93)*

## `webhooks.md`
- # Subscribe to webhooks  *(L1–L114)*
  - ## Supported event types  *(L11–L37)*
    - ### Session events  *(L13–L25)*
    - ### Vault events  *(L26–L37)*
  - ## Register an endpoint  *(L38–L47)*
  - ## Verify the signature  *(L48–L79)*
  - ## Handle an event  *(L80–L108)*
  - ## Delivery behavior  *(L109–L114)*

## `dreams.md`
- # Dreams  *(L1–L146)*
  - ## How it works  *(L21–L29)*
  - ## Create a dream  *(L30–L51)*
  - ## Track progress  *(L52–L76)*
    - ### Lifecycle  *(L63–L72)*
    - ### Watch the pipeline run  *(L73–L76)*
  - ## Use the output  *(L77–L101)*
  - ## Cancel a dream  *(L102–L109)*
  - ## Archive a dream  *(L110–L117)*
  - ## List dreams  *(L118–L124)*
  - ## Errors  *(L125–L135)*
  - ## Billing  *(L136–L139)*
  - ## Limits  *(L140–L146)*

