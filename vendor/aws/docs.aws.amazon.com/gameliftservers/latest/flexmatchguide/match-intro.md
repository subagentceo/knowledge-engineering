

# What is Amazon GameLift Servers FlexMatch?
<a name="match-intro"></a>

Amazon GameLift Servers FlexMatch is a customizable matchmaking service for multiplayer games. With FlexMatch, you can build a custom set of rules that define what a multiplayer match looks like for your game, and determines how to evaluate and select compatible players for each match. You can also fine-tune key aspects of the matchmaking algorithm to fit your game needs.

Use FlexMatch as a standalone matchmaking service or integrated with an Amazon GameLift Servers game hosting solution. For example, you might implement FlexMatch as a standalone feature with games with a peer-to-peer architecture or games that use other cloud compute solutions. Or you might add FlexMatch to your Amazon GameLift Servers managed EC2 or managed containers hosting, or on-premises hosting with Amazon GameLift Servers Anywhere. This guide provides detailed information on how to build a FlexMatch matchmaking system for your particular scenario.

FlexMatch gives you the flexibility to set matchmaking priorities depending on your game requirements. For example, you can do the following:
+ Find a balance between match speed and quality. Set match rules to quickly find matches that are good enough, or have players wait a little longer to find the best possible match for an optimum player experience.
+ Make matches based on well-matched players or well-matched teams. Create matches where all players have similar characteristics such as skill or experience. Or form matches where the combined characteristics of each team meet a common criteria.
+ Prioritize how player latency factors into matchmaking. Do you want to set a hard limit on latency for all players, or are higher latencies acceptable as long as everyone in the match has similary latency?

**Ready to start working with FlexMatch?**  
For step-by-step guidance on getting your game up and running with FlexMatch, see the following topics:  
[Roadmap: Add matchmaking to a Amazon GameLift Servers hosting solution](match-tasks.md)
[Roadmap: Create a standalone matchmaking solution with FlexMatch](match-tasks-safm.md)

## Key FlexMatch features
<a name="match-intro-features"></a>

The following features are available with all FlexMatch scenarios, whether you use FlexMatch as a standalone service or with Amazon GameLift Servers game hosting.
+ **Customizable player matching.** Design and build matchmakers to suit all of the game modes that you offer your players. Build a set of custom rules to evaluate key player attributes (such as skill level or role) and geographic latency data to form great player matches for your game.
+ **Latency-based matching.** Provide player latency data and create match rules that require players in a match to have similar response times. This feature is useful when your player matchmaking pools span multiple geographic regions.
+ **Support for match sizes up to 200 players.** Create matches of up to 40 players using match rules that are customized for your game. Create matches of up to 200 players using a matching process that uses a streamlined custom matching process to keep player wait times manageable.
+ **Player acceptance.** Require players to opt in to a proposed match before finalizing the match and starting a game session. Use this feature to initiate your custom acceptance workflow and report player responses to FlexMatch before placing a new game session for the match. If not all players accept a match, the proposed match fails and players who did accept automatically return to the matchmaking pool.
+ **Player parties support.** Generate matches for groups of players who want to play together on the same team. Use FlexMatch to find additional players to fill out the match as needed.
+ **Expandable matching rules.** Gradually relax the match requirements after a certain amount of time has passed without finding a successful match. Rule expansion lets you decide where and when to relax the initial match rules, so that players can get into playable games more quickly.
+ **Match backfill.** Fill the empty player slots in an existing game session with well-matched new players. Customize when and how to request new players, and use the same custom match rules to find additional players.

## FlexMatch with Amazon GameLift Servers hosting
<a name="match-intro-hosting"></a>

FlexMatch offers the following additional features for use with games that you're hosting with Amazon GameLift Servers on managed EC2 fleets, managed container fleets, or Amazon GameLift Servers Anywhere fleets. This includes games with custom game servers or Amazon GameLift Servers Realtime. 
+ **Game session placement.** When a match is successfully made, FlexMatch automatically requests a new game session placement from Amazon GameLift Servers. The data generated during matchmaking, including player IDs and team assignments, is provided to the game server so that it can use that information to start the game session for the match. FlexMatch then passes back game session connection information so that game clients can join the game. To minimize the latency experienced by players in a match, game session placement with Amazon GameLift Servers can also use regional player latency data, if provided.
+ **Automatic match backfill.** With this feature enabled, FlexMatch automatically sends a match backfill request when a new game session starts with unfilled player slots. Your matchmaking system starts the game session placement process with a minimum number of players, and then quickly fills the remaining slots. You cannot use automatic backfill to replace players who drop out of a matched game session. 

If you use Amazon GameLift Servers FleetIQ with games that are hosted with Amazon Elastic Compute Cloud (Amazon EC2) resources, implement FlexMatch as a standalone service.

## Pricing for Amazon GameLift Servers FlexMatch
<a name="match-intro-pricing"></a>

Amazon GameLift Servers charges for instances by duration of use and for bandwidth by quantity of data transferred. If you host your games on Amazon GameLift Servers, FlexMatch usage is included in the fees for Amazon GameLift Servers. If you host your games on another server solution, FlexMatch usage is charged separately. For a complete list of charges and prices for Amazon GameLift Servers, see [Amazon GameLift Servers Pricing](https://aws.amazon.com/gamelift/servers/pricing).

For information on calculating the cost of hosting your games or matchmaking with Amazon GameLift Servers, see [Generating Amazon GameLift Servers pricing estimates](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-calculator.html), which describes how to use the [AWS Pricing Calculator](https://calculator.aws/#/createCalculator/GameLift).