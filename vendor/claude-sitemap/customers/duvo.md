# Duvo automates enterprise operations across legacy systems with Claude

Duvo builds AI agents that run procurement, supply chain, and category management processes for multi-billion-euro retail and CPG companies. The agents work across every system involved: ERPs, supplier portals, spreadsheets, email, even phone calls. Duvo is built entirely on Claude, using the Agent SDK to orchestrate across workflows, with every API call running under Anthropic's Zero Data Retention mode.

## With Claude, Duvo achieved:

- €2.8M+ in annualized savings within three months for its customer Rohlik Group, across processes that had never been systematically run
- Annual supplier negotiations shortened by one month at Rohlik Group, with approximately 80% automated from preparation through contract generation to ERP write-back
- 40%+ of team capacity freed up on average across enterprise procurement, supply chain, and retail operations by reducing manual work
- Eight weeks on average from first conversation to production deployment with measured savings
- Production deployment within days of adopting the Claude Agent SDK

## The challenge: The cost of "abandoned work" in enterprise operations

Duvo's customers have operations teams that know exactly what needs to happen but can't get to all of it. Buyers manage ordering across SAP, supplier portals, and email. Category managers track commodity prices in spreadsheets they built themselves. Procurement coordinators chase confirmations by copying status between systems. These teams cover the top 20 suppliers and the most urgent issues. But the long tail, hundreds of smaller actions worth millions in aggregate, never get touched.

"The real process lives in people's heads: which supplier needs chasing, which portal field actually matters, which exception to escalate and which to just fix," said Marek Paris, co-founder and CPTO at Duvo. “The reason no one has automated these processes before is that the work crosses too many systems.” 

The blocker isn't a missing dashboard. The work spans systems that don't connect, and no two companies use the same stack. Traditional automation stalls because there are no clean APIs, the IT backlog is years long, and every exception requires judgment. Duvo calls this "abandoned work": processes worth millions that nobody runs because there aren't enough hours in the day.

## The solution: Selecting Claude for messy, multi-step work

After evaluating multiple model providers, Duvo committed to a single-provider architecture on Claude. The product defaults to Sonnet 4.6, with browser-use agents often using Opus 4.6.

"What set Claude apart was its performance on messy, ambiguous tasks," explained Tomas Čupr, co-founder and CEO. "Parsing a supplier email that half-confirms a delivery while raising a pricing dispute. Navigating a SAP GUI screen with dozens of fields. Making judgment calls on exceptions without hallucinating business rules."

Two factors cemented the decision: First, the model’s reasoning depth was especially strong for multi-step work. Second, the developer tooling then closed the gap. MCP, the Agent SDK, and computer use gave Duvo a complete foundation for running agents in production, with structured human-in-the-loop workflows and Zero Data Retention on every API call. Building on a single provider's stack meant fewer integration seams and a consistent security model across every agent run. "Other providers offer a model. Anthropic offers the infrastructure to run agents in production with the governance enterprises require," Paris said. "When we saw all of these working together, with Claude's model quality as the foundation, going all-in was straightforward.”
