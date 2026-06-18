

# What is Amazon GameLift Servers FleetIQ?
<a name="gsg-intro"></a>

Amazon GameLift Servers FleetIQ optimizes the use of low-cost Amazon Elastic Compute Cloud (Amazon EC2) Spot Instances for cloud-based game hosting. With Amazon GameLift Servers FleetIQ, you can work directly with your hosting resources in Amazon EC2 and Amazon EC2 Auto Scaling while taking advantage of Amazon GameLift Servers optimizations to deliver inexpensive, resilient game hosting for your players. Amazon EC2 Spot Instances, although offered at steep discounts, are not generally viable for game hosting because availability fluctuates and there is the potential for [interruptions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-interruptions.html). Amazon GameLift Servers FleetIQ significantly mitigates these limitations, making the use of low-cost Spot Instances viable for game hosting.

FleetIQ optimizations are also available when using Amazon GameLift Servers to manage your game hosting. For information on Amazon GameLift Servers hosting options, see the [Amazon GameLift Servers Developer Guide](https://docs.aws.amazon.com/gamelift/latest/developerguide/gamelift-intro.html).

The Amazon GameLift Servers FleetIQ game hosting solution is designed for game developers who: 
+ Have existing AWS deployments or want to use Amazon EC2 directly rather than through the fully managed Amazon GameLift Servers service. Amazon GameLift Servers FleetIQ works with EC2 Auto Scaling groups that you manage in your AWS account, giving you full access to your EC2 instances and groups. You can also integrate with other AWS services, including Amazon Elastic Container Service (Amazon ECS), Amazon Elastic Kubernetes Service (Amazon EKS), and AWS Shield Advanced.
+ Have existing on-premises game hosting and want to extend capacity to the cloud. With Amazon GameLift Servers FleetIQ, you can build a hybrid deployment system that uses your on-premises capacity and incrementally adds AWS cloud capacity as needed.

**Ready to start working with Amazon GameLift Servers FleetIQ?**  
Learn how to use Amazon GameLift Servers FleetIQ for your game by taking the course [Using Amazon Amazon GameLift Servers FleetIQ for Game Servers](https://explore.skillbuilder.aws/learn/course/external/view/elearning/435/using-amazon-gamelift-fleetiq-for-game-servers) on AWS Skill Builder. For an overview of related courses, see the [Game Tech Learning Plan](https://explore.skillbuilder.aws/learn/public/learning_plan/view/26/game-tech-learning-plan). Some courses are available in different languages.
Follow the instructions in [Amazon GameLift Servers FleetIQ integration steps](gsg-getting-started.md).

## Amazon GameLift Servers FleetIQ features
<a name="gsg-intro-features"></a>
+ **Optimized Spot balancing.** Amazon GameLift Servers FleetIQ periodically evaluates your instance types and replaces Spot Instances that are not considered viable due to a higher potential for game session interruptions. As your EC2 Auto Scaling group retires old instances and starts new ones, the group continually refreshes with instance types that are currently viable for game hosting.
+ **Optimum player routing.** Amazon GameLift Servers FleetIQ APIs direct new game sessions onto the most resilient Spot Instances, where they are least likely to be interrupted. In addition, game sessions are packed onto fewer instances, which improves the EC2 Auto Scaling group's ability to scale down unneeded resources and lower hosting costs.
+ **Automatic scaling based on player usage.** Amazon GameLift Servers FleetIQ emits game server utilization data as Amazon CloudWatch metrics. You can use these metrics to automatically scale your available hosting resources to track with actual player demand and reduce hosting costs.
+ **Direct management of Amazon EC2 instances.** Maintain full control of the EC2 instances and EC2 Auto Scaling groups in your AWS account. This means that you can set up instance launch templates, maintain EC2 Auto Scaling group configurations, and integrate with other AWS services. As part of its Spot balancing activity, Amazon GameLift Servers FleetIQ makes periodic updates to some EC2 Auto Scaling group properties. You can temporarily override these settings or suspend Amazon GameLift Servers FleetIQ activity as needed.
+ **Support for multiple game server executable formats.** Amazon GameLift Servers FleetIQ supports all formats that currently run on Amazon EC2, including Windows, Linux, containers, and Kubernetes. See the [Amazon EC2 FAQs](https://aws.amazon.com/ec2/faqs/) for a list of supported operating systems and runtimes.
+ **Multiple types of hosting resources. **With Amazon GameLift Servers FleetIQ, you have access to a large range of instance types for game server hosting. (Availability varies by AWS Region.) This means that you can pair your game server with the appropriate mix of CPU, memory, storage, and networking capacity to provide the best possible gaming experience for your players.
+ **Worldwide reach.** Amazon GameLift Servers FleetIQ is available in 15 Regions, including in China. With this reach, you can make your game servers available with minimal lag to players, wherever they're located. For a complete list of Regions, see [Amazon GameLift Servers endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/gamelift.html) in the *AWS General Reference*.

## Pricing for Amazon GameLift Servers FleetIQ
<a name="gsg-intro-pricing"></a>

Amazon GameLift Servers charges for instances by duration of use and for bandwidth by quantity of data transferred. For a complete list of charges and prices for Amazon GameLift Servers, see [Amazon GameLift Servers Pricing](https://aws.amazon.com/gamelift/servers/pricing).

For information on calculating the cost of hosting your games or matchmaking with Amazon GameLift Servers, see [Generating Amazon GameLift Servers pricing estimates](https://docs.aws.amazon.com/gameliftservers/latest/developerguide/gamelift-calculator.html), which describes how to use the [AWS Pricing Calculator](https://calculator.aws/#/createCalculator/GameLift).