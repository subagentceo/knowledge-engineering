

# About the Conductor Live solution
<a name="what-is"></a>

AWS Elemental Conductor Live lets you create and manage channels on AWS Elemental Live and/or MPTSes on AWS Elemental Statmux. 

Each of the three products — AWS Elemental Conductor Live, AWS Elemental Live and AWS Elemental Statmux — runs on its own node. Conductor Live is a *management node*. Elemental Live and Elemental Statmux node are each *worker nodes*. And all the nodes are organized in a *cluster.* 

A cluster contains at least one Conductor Live node and one Elemental Live node. If you want to produce MPTSes, a cluster contains at least one Conductor Live node, one Elemental Live node, and one Elemental Statmux node. 