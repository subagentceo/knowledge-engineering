

# Amazon EKS Best Practices Guide
<a name="introduction"></a>

**Tip**  
 [Explore](https://aws-experience.com/emea/smb/events/series/get-hands-on-with-amazon-eks?trk=4a9b4147-2490-4c63-bc9f-f8a84b122c8c&sc_channel=el) best practices through Amazon EKS workshops.

Welcome to the EKS Best Practices Guides. The primary goal of this project is to offer a set of best practices for day 2 operations for Amazon EKS. We elected to publish this guidance to GitHub so we could iterate quickly, provide timely and effective recommendations for variety of concerns, and easily incorporate suggestions from the broader community.

We currently have published guides for the following topics:
+  [Best Practices for Security](security.md) 
+  [Best Practices for Reliability](reliability.md) 
+  [Best Practices for Cluster Autoscaling: Karpenter](karpenter.md) 
+  [Best Practices for Cluster Autoscaling: cluster-autoscaler](cas.md) 
+  [Best Practices for Cluster Autoscaling: EKS Auto Mode](automode.md) 
+  [Best Practices for Networking](networking.md) 
+  [Best Practices for Scalability](scalability.md) 
+  [Best Practices for Cluster Upgrades](cluster-upgrades.md) 
+  [Best Practices for Cost Optimization](cost-opt.md) 
+  [Best Practices for Running Windows Containers](windows.md) 
+  [Best Practices for Hybrid Deployments](hybrid.md) 
+  [Best Practices for Running AI/ML Workloads](aiml.md) 

We also open sourced a Python based CLI (Command Line Interface) called [hardeneks](https://github.com/aws-samples/hardeneks) to check some of the recommendations from this guide.

In the future we will be publishing best practices guidance for performance, cost optimization, and operational excellence.

## Related guides
<a name="related-guides"></a>

In addition to the [EKS User Guide](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html), AWS has published several other guides that may help you with your implementation of EKS.
+  [EMR Containers Best Practices Guides](https://aws.github.io/aws-emr-containers-best-practices/) 
+  [Data on EKS](https://awslabs.github.io/data-on-eks/) 
+  [AWS Observability Best Practices](https://aws-observability.github.io/observability-best-practices/) 
+  [Amazon EKS Blueprints for Terraform](https://aws-ia.github.io/terraform-aws-eks-blueprints/) 
+  [Amazon EKS Blueprints Quick Start](https://aws-quickstart.github.io/cdk-eks-blueprints/) 

## Contributing
<a name="contributing"></a>

We encourage you to contribute to these guides. If you have implemented a practice that has proven to be effective, please share it with us by opening an issue or a pull request. Similarly, if you discover an error or flaw in the guidance we’ve already published, please submit a PR to correct it. The guidelines for submitting PRs can be found in our [Contributing Guidelines](https://github.com/aws/aws-eks-best-practices/blob/master/CONTRIBUTING.md).