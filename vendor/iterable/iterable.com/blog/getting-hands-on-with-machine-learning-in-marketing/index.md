# Getting Hands-On With Machine Learning in Marketing - Iterable

## Getting Hands-On With Machine Learning in Marketing

**Published by**

January 25, 2024

![Green background, computer chip in the center with an illustrated brain in the middle of the computer chip.](https://iterable.com/wp-content/uploads/2026/04/012524_Machine-Learning_Blog-Header.png)

Machine learning (ML) is a remarkable technology that revolutionizes mundane tasks, sparing us the burden of manual labor and propelling us into a world where computers adeptly learn from data, making decisions and predictions with ever-increasing accuracy. Even in areas where we prefer human decision-making, ML can provide invaluable insights to help us make more informed and rapid decisions. As we navigate this landscape of interconnectedness, the impact of ML resonates deeply, reshaping industries, optimizing efficiency, and enriching our experiences in ways previously unimaginable.

### Machine Learning in Action

In an era where technology seamlessly integrates into our daily lives, the pervasive influence of ML stands as a testament to its transformative power. Many of our everyday experiences are powered by ML in ways we don’t even think about. ML stealthily operates behind the scenes, orchestrating experiences that range from effortlessly filtering out spam emails to delivering personalized recommendations on streaming platforms.

#### Machine Learning Filters Spam

Sometimes, the most valuable technologies are easily overlooked. Take the role of ML in spam filtering, for example. The value of spam filters lies in the ability to process vast amounts of incoming data, learn patterns from this information, and subsequently discern between legitimate and unwanted emails, all with lightning speed.

The model’s behavior involves analyzing email content, sender information, and user interactions to make split-second decisions, significantly reducing the burden of manually sifting through countless emails, all done in a way that users barely have to think about. While 10 years ago, one would frequently have to mark messages as spam or not spam, these days, the technologies have improved to the point where it’s only occasionally necessary.

#### Machine Learning Provides Video Recommendations

In the realm of video streaming services, the brilliance of ML shines through personalized recommendations. These platforms employ sophisticated algorithms that scrutinize user preferences, viewing history, and interactions with content to curate suggestions tailored to individual tastes.

When a user discovers enticing content aligned perfectly with their interests, it’s a testament to the iterative learning process of ML. These platforms continually refine their algorithms, gauging the success of recommendations based on user engagement metrics such as watch time, likes, and interactions. Through this iterative process, ML identifies patterns of user behavior and refines its suggestions, thereby enhancing the overall user experience. The viewer doesn’t have to think about the ML at all to benefit from it.

### How Machine Learning Supports Predictive Marketing

Similarly, in the domain of marketing, predictive analytics—fueled by ML—revolutionizes campaign strategies. Predictive models can analyze multifaceted data points to forecast user behavior, enabling marketers to anticipate responses accurately. This predictive prowess eliminates the guesswork involved in targeting specific user segments for campaigns.

By learning from past campaign successes and failures, these models iteratively refine their predictions, optimizing the targeting criteria and enhancing the efficacy of marketing efforts. The value proposition of ML is profound—it not only saves time for marketers and users but also elevates the quality of interactions and experiences.

#### A Real-World Marketing Example

To illustrate how a predictive model operates, behind the scenes, we’ll walk through an example of building a predictive model using marketing data from a real Portuguese banking institution. The data is open-source, and the code is available in this notebook. The notebook contains a more detailed walkthrough of the code and how the model is built, while the explanation in this article is more high-level and focuses on the impact such a hypothetical model might have.

**The Data**  
The dataset includes 16 features that give information about users, including demographic data such as their job, marital status, educational status, and marketing data like how many times they were contacted and the outcome of the previous marketing campaign. The goal will be to predict whether the client subscribes to a term deposit, which is the conversion event for this campaign.

![Table featuring various columns and rows of data.](https://iterable.com/wp-content/uploads/2024/01/Screen-Shot-2024-01-25-at-10.39.12-AM.png)

_Sample of the data used in this example._

**Data Cleaning**  
The dataset includes data for 45211 contacts. The first step in building a predictive model is data cleaning. We have to wrangle the data into a format that xgboost, a popular machine-learning algorithm, can understand. In production model development, it’s not uncommon for this stage to take the longest. See the notebook for details about how we do the cleaning.

![The same data as the previous image, but cleaned up, meaning categories are assigned correctly, nothing is left blank.](https://iterable.com/wp-content/uploads/2024/01/Screen-Shot-2024-01-25-at-10.40.51-AM.png)

_Sample data after cleaning._

**Train/Test Split**  
Next, we split these contacts into a training set and a test set. The model will learn from users in the training set, while we test the model’s accuracy in the test set. (Note: the same user cannot be in both sets, since the model would effectively be cheating off the answer key.)

Different splits can be used, but here, we’ll randomly select 80% of users to be in the training set, with the remainder in the test set. Once we’ve completed this process, we see that we have randomly split our 45211 total users into 36168 users in the training set and 9043 users in the test set.

**Model Training and Evaluation**  
Then, we’ll train the model using the xgboost algorithm. Afterwards, we’ll evaluate the resulting model. While xgboost is quite configurable, we’ll primarily use the defaults for simplicity in today’s example.

First, we look at the AUC (area under curve). This is a commonly used metric for classification models such as this one, which produces a number between 0.5 and 1. The higher the AUC, the better the model. In this case, our AUC was about 0.73, indicating that we have a medium level of model performance. This is to be expected in this type of use case because customer behavior can never fully be predicted.

![Grid of 2x2 showing actual labels on the y axis and predicted labels on the x axis. On both x and y there are "Did not convert" and "converted" labels.](https://iterable.com/wp-content/uploads/2024/01/Screen-Shot-2024-01-25-at-10.42.41-AM.png)

_The Confusion Matrix._

Next, we look at the above confusion matrix. The vertical axis represents the actual conversion outcome for users in the test set, while the horizontal axis represents the predicted conversion outcome. For example, 7638 users were correctly predicted not to convert, while 565 users were correctly predicted to convert. 314 users were predicted to convert but didn’t, while 526 users were predicted not to convert but did.

While this model is not perfect, it’s important to note that it could have been extremely useful, nonetheless, because we can use it for segmentation. Let’s examine this use case more carefully.

**Segmentation**  
Segmentation is often not covered in introductory ML tutorials, but it’s essential to making the most of your predictive models for marketing. Let’s try ranking users into 10 deciles and seeing how likely each segment is to convert. The technical details of how we do this can be found in the notebook, but we’ll stick to talking about what we do with the results here. We divide users into 10 deciles, ranked by their likelihood of converting as predicted by the model.

![Bar chart showing conversion rate by decile. The x axis is deciles 0 through 9, 9 having the largest bar chart (highest conversion), 0 having none. ](https://iterable.com/wp-content/uploads/2024/01/Screen-Shot-2024-01-25-at-10.44.16-AM.png)

_Bar chart depicting conversion rate by decile._

As we can see here, the top decile, labeled “9,” has about a 60% chance to convert, while deciles 0-5 have almost no chance to convert. Since we know this information before sending the campaign out, this information is quite actionable. We can choose, for example, not to bother sending the campaign to deciles 0 through 5 and to send out a promotion to segments 6 through 9. We could even tailor our messaging to each of these segments.

The practical demonstration with marketing data from a Portuguese banking institution vividly illustrates the practical application of predictive modeling in marketing, showcasing its ability to enable precise segmentation and optimal resource allocation.

### Machine Learning: A Marketing Game-Changer

Machine learning quietly revolutionizes our daily experiences, from filtering email spam to curating personalized recommendations on streaming platforms. Its prowess lies in learning from data, liberating us from mundane tasks, and enhancing our insight. As demonstrated in the example above, predictive analytics reshapes marketing strategies, offering insights that refine interactions and optimize resource allocation.

In marketing, predictive models equipped to analyze multifaceted data points accurately forecast user behavior, eliminating guesswork in targeting specific segments. This not only saves time but improves the quality of interactions. By discerning patterns in consumer behavior, ML empowers marketers to anticipate trends, personalize outreach, and optimize campaigns. This dynamic technology doesn’t just streamline processes; it refines targeting criteria, enhances customer experiences, and maximizes ROI.

Iterable’s Predictive Goals represents the next iteration of making your data work for you–what if you could predict what your customers will do instead of looking only at what they’ve already done? Predictive Goals, within the context of machine learning, sets the foundation for businesses to not only understand but actively engage and optimize interactions with their audience, marking a pivotal step towards a symbiotic relationship between technology and consumer engagement.

_To learn more about Iterable’s Predictive Goals, schedule a demo or reach out to your CSM._