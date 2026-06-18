

# What is Amazon Personalize?
<a name="what-is-personalize"></a>

Amazon Personalize is a fully managed machine learning service that uses your data to generate item recommendations for your users. It can also generate user segments based on the users' affinity for certain items or item metadata. 

Common use case include the following:
+ **Personalizing a video streaming app** – You can use preconfigured or customizable Amazon Personalize resources to add multiple types of personalized video recommendations to your streaming app. For example, *Top picks for you*, *More like X* and *Most popular* video recommendations. 
+ **Adding product recommendations to an ecommerce app** – You can use preconfigured or customizable Amazon Personalize resources to add multiple types of personalized product recommendations to your retail app. For example, *Recommended for you*, *Frequently bought together* and *Customers who viewed X also viewed* product recommendations. 
+ **Adding real-time next best action recommendations to your app** – You can use customizable Amazon Personalize resources to recommend the actions that your users will most likely take based on their behavior. For example, you can add real-time recommendations for enrolling in your loyalty program, downloading your mobile app, or signing up for promotional emails. 
+ **Creating personalized emails** – You can use customizable Amazon Personalize resources to generate batch recommendations for all users on an email list. Then you can use an [AWS service](#related-services) or [third party service](#third-parties) to send users personalized emails recommending items in your catalog. 
+ **Creating a targeted marketing campaign** – You can use Amazon Personalize to generate segments of users who will most likely interact with items in your catalog. Then you can use an [AWS service](#related-services) or [third party service](#third-parties) to create a targeted marketing campaign that promotes different items to different user segments.
+ **Personalizing search results** – You can use customizable Amazon Personalize resources to personalize search results for your users. For example, Amazon Personalize can re-rank search results that you generate with [OpenSearch](personalize-opensearch.md). 

For most use cases, Amazon Personalize generates recommendations primarily based on item interaction data. Item interaction data comes from your users interacting with items in your catalog. For example, users clicking different items. Your item interaction data can come from both your historical bulk interaction records in a CSV file, and real-time events from your users as they interact with your catalog. In some cases, Amazon Personalize also uses data from items and users such as genre, price, or gender. And for next best action scenarios, it uses actions and action interaction data. 

When you import bulk data, you can use Amazon SageMaker AI Data Wrangler to import data from 40\+ sources and prepare it for Amazon Personalize. For more information, see [Preparing and importing bulk data using Amazon SageMaker AI Data Wrangler](preparing-importing-with-data-wrangler.md).

Amazon Personalize includes API operations for real-time personalization, and batch operations for bulk recommendations and user segments. You can get started quickly with use-case optimized recommenders for your business domain, or you can create your own configurable custom resources. 

**Topics**
+ [Pricing for Amazon Personalize](#whatis-pricing)
+ [Guidance for first-time Amazon Personalize users](first-time-user.md)
+ [Related AWS services and solutions](#related-services)
+ [Third-party services](#third-parties)
+ [Learn more](#experienced-user)
+ [Using Amazon Personalize with an AWS SDK](sdk-general-information-section.md)

## Pricing for Amazon Personalize
<a name="whatis-pricing"></a>

 With Amazon Personalize, there are no minimum fees and no upfront commitments. The [AWS Free Tier](https://aws.amazon.com/free/) provides a monthly quota of up to 20 GB of data processing per available AWS region, up to 100 hours of training time per eligible AWS region, and up to 180,000 recommendation requests. The free tier is valid for the first two months of usage.

For a complete list of charges and prices, see [Amazon Personalize pricing](https://aws.amazon.com/personalize/pricing/).

## Related AWS services and solutions
<a name="related-services"></a>

Amazon Personalize integrates seamlessly with other AWS services and solutions. For example, you can:
+  Use Amazon SageMaker AI Data Wrangler (Data Wrangler) to import data from 40\+ sources into an Amazon Personalize dataset. Data Wrangler is a feature of Amazon SageMaker AI Studio that provides an end-to-end solution to import, prepare, transform, and analyze data. For more information, see [Preparing and importing bulk data using Amazon SageMaker AI Data Wrangler](preparing-importing-with-data-wrangler.md). 
+ Use AWS Amplify to record item interaction events. Amplify includes a JavaScript library for recording events from web client applications. And it includes a library for recording events in server code. For more information, see [Amplify Documentation](https://docs.amplify.aws/).
+  Automate and schedule Amazon Personalize tasks with [Maintaining Personalized Experiences with Machine Learning](https://aws.amazon.com/solutions/implementations/maintaining-personalized-experiences-with-ml/). This AWS Solutions Implementation automates the Amazon Personalize workflow, including data import, solution version training, and batch workflows. 

## Third-party services
<a name="third-parties"></a>

Amazon Personalize works well with various third-party services.
+ **Amplitude** – You can use Amplitude to track user actions to help you understand your users' behavior. For information on using Amplitude and Amazon Personalize, see the following AWS Partner Network (APN) blog post: [Measuring the Effectiveness of Personalization with Amplitude and Amazon Personalize](https://aws.amazon.com/blogs/apn/measuring-the-effectiveness-of-personalization-with-amplitude-and-amazon-personalize/). 
+ **Braze** – You can use Braze to send users personalized emails recommending items in your catalog. Braze is a market leading messaging platform (email, push, SMS). For a workshop that shows how to integrate Amazon Personalize and Braze, see [Amazon Personalize workshop](https://www.braze.com/docs/partners/message_personalization/dynamic_content/personalized_recommendations/amazon_personalize/workshop).
+ **Optimizely** – You can use Optimizely to perform A/B testing with Amazon Personalize recommendations. 
+ **Segment** – You can use Segment to send your data to Amazon Personalize. For more information on integrating Segment with Amazon Personalize, see [Amazon Personalize Destination](https://segment.com/docs/connections/destinations/catalog/amazon-personalize/). 

For a complete list of partners, see [Amazon Personalize Partners](https://aws.amazon.com/personalize/partners/).

## Learn more
<a name="experienced-user"></a>

The following resources provide additional information about Amazon Personalize:
+ For a quick reference to help you determine if Amazon Personalize fits your use case, see the [Amazon Personalize Cheat Sheet](https://github.com/aws-samples/amazon-personalize-samples/blob/master/PersonalizeCheatSheet2.0.md) in the [Amazon Personalize samples](https://github.com/aws-samples/amazon-personalize-samples) repository.
+ For a series of videos on how to use Amazon Personalize, see the [Amazon Personalize Deep Dive Video Series](https://www.youtube.com/watch?v=3gJmhoLaLIo) found on YouTube.
+ For in-depth tutorials and code samples, see the [amazon-personalize-samples GitHub repository](https://github.com/aws-samples/amazon-personalize-samples).