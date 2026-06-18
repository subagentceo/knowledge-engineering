

# What is AWS Infrastructure Composer?
<a name="what-is-composer"></a>

 AWS Infrastructure Composer allows you to visually compose modern applications on AWS. More specifically, you can use Infrastructure Composer to visualize, build, and deploy modern applications from all AWS services that are supported by AWS CloudFormation without needing to be an expert in CloudFormation.

As you compose your AWS CloudFormation infrastructure, through a delightful drag-and-drop interface, Infrastructure Composer creates your infrastructure as code (IaC) templates, all while following AWS best practices. The following image shows how easy it is to drag, drop, configure, and connect resources on Infrastructure Composer's visual canvas.

![The Infrastructure Composer canvas with an API Gateway API, Lambda function, and DynamoDB table being connected together.](http://docs.aws.amazon.com/infrastructure-composer/latest/dg/images/aac_00.gif)


Infrastructure Composer can be used from the Infrastructure Composer console, the AWS Toolkit for Visual Studio Code, and in CloudFormation console mode.

**Topics**
+ [Compose your application architecture](#what-is-composer-design)
+ [Define your infrastructure as code (IaC) templates](#what-is-composer-define)
+ [Integrate with your existing workflows](#what-is-composer-integrate)
+ [Ways to access Infrastructure Composer](#what-is-composer-access)
+ [Learn more](#what-is-composer-learn)
+ [Next steps](#what-is-composer-next)
+ [Serverless concepts for AWS Infrastructure Composer](what-is-concepts.md)

## Compose your application architecture
<a name="what-is-composer-design"></a>

**Build with cards**  <a name="what-is-composer-design-cards"></a>
Place cards on the Infrastructure Composer canvas to visualize and build your application architecture.  

![The Infrastructure Composer canvas with an unconnected API Gateway API, Lambda function, and DynamoDB table.](http://docs.aws.amazon.com/infrastructure-composer/latest/dg/images/aac_ref_05.gif)


**Connect cards together**  <a name="what-is-composer-configure"></a>
Configure how your resources interact with each other by visually connecting them together. Specify their properties further through a curated properties panel.  

![The Infrastructure Composer canvas with an API Gateway API, Lambda function, and DynamoDB table. The table is selected to configure its properties.](http://docs.aws.amazon.com/infrastructure-composer/latest/dg/images/aac_intro_02.gif)


**Work with any AWS CloudFormation resource**  <a name="what-is-composer-any"></a>
Drag any CloudFormation resource onto the canvas to compose your application architecture. Infrastructure Composer provides a starting IaC template that you can use to specify the properties of your resource. To learn more, see [Configure and modify cards in Infrastructure Composer](using-composer-cards.md).  

![An imported application template displayed on the Infrastructure Composer canvas, showing various card types.](http://docs.aws.amazon.com/infrastructure-composer/latest/dg/images/aac_intro_05.png)


**Access additional capabilities with featured AWS services**  <a name="what-is-composer-design-featured"></a>
Infrastructure Composer features AWS services that are commonly used or configured together when building applications. To learn more, see [Integrate with Amazon VPC](using-composer-services-vpc.md).  
The following is an example of the AWS Step Functions feature, which provides an integration to launch Step Functions Workflow Studio directly within the Infrastructure Composer canvas.  

![Launching Step Functions Workflow Studio from Infrastructure Composer.](http://docs.aws.amazon.com/infrastructure-composer/latest/dg/images/aac_intro_06.gif)


## Define your infrastructure as code (IaC) templates
<a name="what-is-composer-define"></a>

**Infrastructure Composer creates your infrastructure code**  <a name="what-is-composer-define-create"></a>
As you compose, Infrastructure Composer automatically creates your AWS CloudFormation and AWS Serverless Application Model (AWS SAM) templates, following AWS best practices. You can view and modify your templates directly from within Infrastructure Composer. Infrastructure Composer automatically syncs changes between the visual canvas and your template code.  

![The Infrastructure Composer Template view of an API Gateway API, Lambda function, and DynamoDB table.](http://docs.aws.amazon.com/infrastructure-composer/latest/dg/images/aac_intro_03.png)


## Integrate with your existing workflows
<a name="what-is-composer-integrate"></a>

**Import existing templates and projects**  <a name="what-is-composer-integrate-import"></a>
Import existing CloudFormation and AWS SAM templates to visualize them for better understanding and modify their design. Export the templates that you create within Infrastructure Composer and integrate them into your existing workflows towards deployment.  

![The Infrastructure Composer canvas synced with a local machine using local sync mode.](http://docs.aws.amazon.com/infrastructure-composer/latest/dg/images/aac_other_ide_01.gif)


## Ways to access Infrastructure Composer
<a name="what-is-composer-access"></a>

**From the Infrastructure Composer console**  <a name="what-is-composer-access-console"></a>
Access Infrastructure Composer through the Infrastructure Composer console to get started quickly. Additionally, you can use **local sync** mode to automatically sync and save Infrastructure Composer with your local machine.  

![The Infrastructure Composer canvas synced with a local machine using local sync mode.](http://docs.aws.amazon.com/infrastructure-composer/latest/dg/images/aac_other_ide_01.gif)


**From the CloudFormation console**  <a name="what-is-composer-from-cfn-console"></a>
The Infrastructure Composer console also supports [CloudFormation console mode](using-composer-console-cfn-mode.md), an improvement from CloudFormation Designer that is integrated with the CloudFormation stack workflow. This new tool is now the recommended tool to visualize your CloudFormation templates.

**From the Lambda console**  <a name="what-is-composer-from-lam-console"></a>
With Infrastructure Composer, you can also import Lambda functions from the Lambda console. To learn more, see [Import functions into Infrastructure Composer from the Lambda console](other-services-lambda.md).

**From the AWS Toolkit for Visual Studio Code**  <a name="what-is-composer-access-ide"></a>
Access Infrastructure Composer through the Toolkit for VS Code extension to bring Infrastructure Composer into your local development environment.  

![Infrastructure Composer being accessed through the AWS Toolkit for Visual Studio Code.](http://docs.aws.amazon.com/infrastructure-composer/latest/dg/images/aac_intro_07.gif)


## Learn more
<a name="what-is-composer-learn"></a>

To continue learning about Infrastructure Composer, see the following resources:
+ [Infrastructure Composer cards](using-composer-cards-intro.md)
+ [Visually compose and create serverless applications \| Serverless Office Hours](https://www.youtube.com/watch?v=G7Gp2pzSMYY) – Overview and demo of Infrastructure Composer.

## Next steps
<a name="what-is-composer-next"></a>

To set up Infrastructure Composer, see [Getting started with the Infrastructure Composer console](getting-started.md).