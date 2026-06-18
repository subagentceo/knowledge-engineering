

# What is Amazon GameLift Servers?
<a name="gamelift-intro"></a>

Use Amazon GameLift Servers to deploy, operate, and scale dedicated, low-cost servers in the cloud for session-based multiplayer games. Built on AWS global computing infrastructure, Amazon GameLift Servers helps deliver high-performance, high-reliability game servers while dynamically scaling your resource usage to meet worldwide player demand.

## Key features
<a name="gamelift-servers-intro-features"></a>

### Global reach and low latency
<a name="gamelift-servers-intro-features-global"></a>
+ Deploy hosting in AWS Regions and Local Zones worldwide to bring your games to new players. See a complete list of [locations supported by Amazon GameLift Servers](gamelift-regions.md).
+ Deliver lowest possible latency and great player experience, wherever your players are located.
+ Use multi-location placement queues to dynamically place players into game sessions with optimal player experiences.

### Automatic scaling for managed fleets
<a name="gamelift-servers-intro-features-scaling"></a>
+ Optimize fleet capacity for cost efficiency while maintaining quality of service.
+ Scale capacity based on player demand using target-based auto scaling
+ Maintain capacity buffer to handle sudden player influxes.

### Flexible hosting options
<a name="gamelift-servers-intro-features-deployment"></a>

See more details at [Amazon GameLift Servers game hosting options](gamelift-intro-flavors.md).
+ Game hosting in the cloud, managed by Amazon GameLift Servers
  + Host game servers on Amazon Elastic Compute Cloud (Amazon EC2) infrastructure. Choose from resource types including compute-optimized (C-family), memory-optimized (R-family), and cost-efficient ARM-based Graviton instances.
  + Customize how Amazon GameLift Servers manages all aspects of your game hosting solution, from deploying game servers and starting game sessions to matching players and getting them into games.
  + Use multi-location fleets to streamline global game server deployment. 
  + Take advantage of low-cost hosting with [Amazon EC2 Spot Instances](https://aws.amazon.com/ec2/spot/).
  + Deploy Windows or Linux game servers with managed EC2 hosting.
  + Deploy Linux-based containers with your game server with managed container hosting.
+ Game hosting managed by you, with Amazon GameLift Servers Anywhere
  + Leverage Amazon GameLift Servers game session placement and session management capabilities.
  + Self-manage game server deployments and scaling on your own hardware, on-premises infrastructure, or other cloud providers. 
+ Hybrid game hosting
  + Create a game hosting solution that uses a combination of Amazon GameLift Servers managed fleets and Anywhere fleets to work with existing solutions or support migration.

### Game session management
<a name="gamelift-servers-intro-features-sessions"></a>
+ Let Amazon GameLift Servers manage game server processes for you, track game server status and availability, and place new game sessions on request. 
+ Use game session placement features to help players find and join game sessions that will provide the best possible player experience. Rely on Amazon GameLift Servers decision-making, or customize around criteria such as hosting cost, player latency, and geographic location.
+ Create game session placement queues to efficiently process new game session requests. Use features to set a balance between placement quality and speed that fits your game and player expectations.
+ Take advantage of optional player session features to reserve player slots in game sessions, validate players on connection, and monitor slot availability. Search or filter existing game sessions to find available slots.

### Advanced matchmaking with FlexMatch
<a name="gamelift-servers-intro-features-matchmaking"></a>
+ Add robust matchmaking that's fully integrated with your Amazon GameLift Servers hosting solution.
+ Build custom matchmaking rules based on player attributes and preferences, such as skill level or character choice, and use complex logic as needed.
+ Set up team-based matches for competitive or cooperative gameplay. Balance players across team and/or match composition. 
+ Optimize the matchmaking algorithm to balance match quality and wait times.
+ Support matches from 2 to 200 concurrent players.
+ Support match backfilling to fill available player slots and keep game sessions full.

### Comprehensive monitoring
<a name="gamelift-servers-intro-features-monitoring"></a>
+ Get real-time metrics on usage and performance for game sessions and player activity, as well as hosting performance and health for managed fleets.
+ Integrate with Amazon CloudWatch for alerts and dashboards.
+ Access server logs and event tracking for troubleshooting.
+ Analyze performance and utilization data to optimize scaling (managed fleets) or resource allocation (self-managed fleets).

### Customization and extensibility
<a name="gamelift-servers-intro-customization"></a>
+ Customize game session placement logic, including prioritizing for latency, cost, and location.
+ For managed hosting, choose your game hosting resources and provide instructions for launching and running game servers on each instance. For managed containers, fine-tune resource allocation across containers.
+ Define your own matchmaking rules. 
+ Implement custom strategies for capacity scaling.
+ Add game server code to integrate with your existing AWS services, such as databases or content storage tools.
+ Create a backend service with custom features to manage player join requests (such as player parties), handle authentication, or add custom logic and persistence. 

### Integration with AWS ecosystem
<a name="gamelift-servers-intro-features-integration"></a>
+ Use services such as Amazon DynamoDB, Amazon Simple Storage Service, and Amazon Aurora DSQL for game state persistence.
+ Implement Amazon Cognito for player authentication.
+ Process game analytics with Amazon Kinesisand Amazon S3.
+ Add voice chat with Amazon Chime SDK.
+ Create custom game features using AWS Lambda and Amazon API Gateway.

## How to work with Amazon GameLift Servers
<a name="gamelift-intro-access"></a>

Use these tools to work with Amazon GameLift Servers.

**AWS CLI**  
Use the AWS Command Line Interface (AWS CLI) to make calls to the AWS SDK, including the service API for Amazon GameLift Servers. See [Getting started with the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) in the *AWS Command Line Interface User Guide*.

**Amazon GameLift Servers console**  
Use the [AWS Management Console for Amazon GameLift Servers](https://console.aws.amazon.com/gamelift) to configure resources, manage your game server deployments, and track performance and usage metrics. The Amazon GameLift Servers console is a GUI alternative to managing resources programmatically or with the AWS CLI.

**Amazon GameLift Servers SDKs**  
The Amazon GameLift Servers SDKs contain the libraries required to establish communication between your game clients, game servers, and game services and the Amazon GameLift Servers service. For more information, see [Get Amazon GameLift Servers development tools](gamelift-supported.md).

**AWS CloudFormation**  
Use AWS CloudFormation to model, provision, and manage AWS resources for your game hosting solution by treating infrastructue as code. Create templates that describe the resources, and CloudFormation automates the tasks of configuring and deploying resources to the locations you specify.