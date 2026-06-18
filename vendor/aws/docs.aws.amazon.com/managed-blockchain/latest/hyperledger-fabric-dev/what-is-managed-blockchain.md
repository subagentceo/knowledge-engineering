

# What Is Amazon Managed Blockchain (AMB) Hyperledger Fabric?
<a name="what-is-managed-blockchain"></a>

Amazon Managed Blockchain (AMB) Access provides you with public blockchain nodes for Ethereum and Bitcoin, and you can also create private blockchain networks with the Hyperledger Fabric framework. Choose from various methods to engage with public blockchains, including fully managed, single-tenant (dedicated), and serverless multi-tenant API operations to public blockchain nodes. For use cases where access controls are important, you can choose from fully managed private blockchain networks. Standardized API operations give you instant scalability on a fully managed, resilient infrastructure, so you can build blockchain applications.

AMB Access gives you two distinct types of blockchain infrastructure services: multi-tenant blockchain network access API operations and dedicated blockchain nodes and networks. With dedicated blockchain infrastructure, you can create and use public Ethereum blockchain nodes and private Hyperledger Fabric blockchain networks for your own use. Multi-tenant, API-based offerings, however, such as AMB Access Bitcoin, are composed of a fleet of Bitcoin nodes behind an API layer where the underlying blockchain node infrastructure is shared among customers.

You can deploy a private, permissioned blockchain with the Hyperledger Fabric framework in minutes without complex configuration tasks. Once your network is created, you can launch one or more blockchain peer nodes for high availability using the AWS Management Console. Whether your use case demands a large consortium of members to join the network or you simply wish to create a development network within your organization, AMB simplifies the process. You can invite other organizations to join your blockchain network through their AWS accounts, or you can create additional members (organizations) in your AWS account to build a simulated network for testing.

This guide covers the fundamentals of creating and working with a Hyperledger Fabric blockchain network using AMB Access. For information about working with AMB Access Ethereum, see [Amazon Managed Blockchain (AMB) Access Ethereum Developer Guide](https://docs.aws.amazon.com/managed-blockchain/latest/ethereum-dev/).

## How to Get Started with AMB Access Hyperledger Fabric
<a name="how-to-start"></a>

We recommend the following resources to get started with Hyperledger Fabric networks and chaincode on AMB Access:
+ [Key Concepts: Amazon Managed Blockchain (AMB) Networks, Members, and Peer Nodes](network-components.md)

  This overview helps you understand the fundamental building blocks of a Hyperledger Fabric network on AMB Access. It also tells you how to identify and communicate with network resources.
+ [Get Started Creating a Hyperledger Fabric Blockchain Network Using Amazon Managed Blockchain (AMB)](managed-blockchain-get-started-tutorial.md)

  Use this tutorial to create your first Hyperledger Fabric network, set up a Hyperledger Fabric client on EC2, and use the open-source Hyperledger Fabric peer CLI to query and update the ledger. You then invite another member to the network. The member can be from a different AWS account, or you can invite a new member in your own account to simulate a multi-account network. The new member then queries and updates the ledger.
+ [Hyperledger Fabric Documentation (v2.2)](https://hyperledger-fabric.readthedocs.io/en/release-2.2/)

  The open-source documentation for Hyperledger Fabric is a starting point for key concepts and the architecture of the Hyperledger Fabric blockchain network that you build using AMB Access. As you develop your blockchain application, you can reference this document for key tasks and code samples. Use the documentation version that corresponds to the version of Hyperledger Fabric that you use.