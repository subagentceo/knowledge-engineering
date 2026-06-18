

# What is Amazon GameLift Servers Realtime?
<a name="realtime-intro"></a>

If you're looking for a game server solution for your multiplayer game, but you don't want to expend the time and resources to develop, test, and deploy a fully custom game server, consider using Amazon GameLift Servers Realtime. Realtime servers are lightweight, ready-to-go game servers that Amazon GameLift Servers provides for you.

**Amazon GameLift Servers Realtimekey features**
+ Full network stack for game client and server interaction
+ Core game server functionality
+ Customizable server logic
+ Live updates to Realtime configurations and server logic
+ FlexMatch matchmaking
+ Flexible control of hosting resources

**How to set up Realtime servers**

Setting up your game to use Realtime servers involves these tasks:
+ Get the default Realtime script (JavaScript) and configure it for your game. You can optionally add server-side logic.
+ Deploy a fleet of hosting resources with Realtime servers configured for your game.
+ Create a simple backend service that your game client can use to find or start game sessions on your Realtime servers.
+ Add functionality to your game client (using provided APIs) to request a game session, connect to it, and play the game.