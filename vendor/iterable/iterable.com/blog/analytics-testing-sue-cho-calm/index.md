# A Q&A on Analytics and Testing With Sue Cho From Calm - Iterable

## A Q&A on Analytics and Testing With Sue Cho From Calm

**Published by**

May 12, 2020

![Sue Cho, Head of Lifecycle Marketing at Calm](https://iterable.com/wp-content/uploads/2026/04/051220_Calm-Recap_768x512.png)

When it comes to having a strong testing mentality at the cornerstone of your growth marketing strategy, nobody does it better than Sue Cho, Head of Lifecycle Marketing at Calm. She’s been an Iterable MVP for years, ever since she served as the Director of Email Marketing at Autolist.

We recently sat down with Sue to recap her recent webinar with us and Amplitude on the three truths she found through analytics and testing.

Read on to learn the ins-and-outs of Calm’s tech stack, their most important metric and more valuable insights!

### An Interview With Sue Cho From Calm

#### Tell us about yourself, Sue.

I am the Head of Lifecycle Marketing for Calm and I oversee all things retention, engagement and conversion. I run campaigns on channels, like email, push notifications, and even direct mail (which we call snail mail).

I’ve been doing email and retention marketing for 10+ years, mostly focused on the subscription e-commerce space. I’m also an active member of Email Geeks, which is a worldwide organization, and I run the San Francisco chapter of the Email Geeks meetup. I’m also a charter member of an organization called Women of Email.

I’ve been with Calm for about two years and in that time, I’ve been able to draw some really cool insights thanks to all the technologies that we have in place. 

#### In your own words, what is Calm?

Calm is the #1 app for sleep, meditation and relaxation. We were named App of the Year by Apple in 2017. We have content for sleep and meditations, and we have exclusive music, white noise, soothing backgrounds, master classes, and even body exercises. We have 80 million global downloads.

My favorite portion of the app is actually the fun sleep stories, like “Once Upon a Time in GDPR,” where a lovely, boring British male voice reads you the entire law book of GDPR. I’m not sure if that’ll give you nightmares or get you to a soothing slumber, but we have it. 

We also have sleep stories from people like Matthew McConaughey, if you want him to read you a bedtime story. And we have some exclusive Calm music by some pretty cool artists, like Sam Smith and Lindsey Stirling.

#### What’s the tech stack at Calm look like?

Our growth marketing tool is Iterable. I’ve actually been an Iterable client across several different companies. I’m a big fan. It’s one of the most powerful automation tools for email and push notifications there is in the market.

Then we use Amplitude as our data aggregator and visualization tool. The cool thing about these two tools is that we actually have a bi-directional integration where Iterable auto-streams data into Amplitude about email opens and send data, and all of the user properties nested in those, and we have the capability to push Amplitude cohorts and segments into Iterable as well.

#### How are you using this data?

With all of this data—including from Iterable—feeding into Amplitude, it allows us to visualize full-funnel on what a user does. 

We can look at things like:

*   User behavior from an app download
*   Whether or not they open an email
*   When they sign up for a subscription
*   What they actually do once they open the app

In other words, these technologies combined together allow us to see beyond superficial metrics, like opens and clicks, and gives us visibility into what the user actually is doing inside of the app _after_ they open and click.

#### Why do you love analytics and testing?

I think it’s really exciting and gratifying to see the great results that you’ve had from running tests. Whether or not the test results are what you predicted, you can get validation through concrete data, which helps you make objective and informed decisions.

And by optimizing our programs to give the users what they want, we’re able to get positive feedback, like a recent Facebook comment we got that said, “The best part of Sunday night is when the Calm email comes, and the preview for the upcoming Daily Calms, and what you need to work on, is there.” 

I’m so used to being at companies and getting emails from angry consumers saying, “Stop spamming me. Get me off your list. This is junk.” And now we get people writing in upset that they didn’t get the Sunday email that talks about the Daily Calms, so it’s really gratifying.

#### What’s an interesting insight you’ve learned from testing?

We found through data that the “Sunday Scaries” are real. We saw a distinct cyclical pattern of usage: People start to freak out on Sundays because they’re stressing out over all the work that’s coming on Monday. Clearly, there’s a pattern where every Sunday, we get an uptick. On the weekends, people don’t need to reach for Calm anymore. 

But what about throughout the day? Instead of looking at daily rates over 60 days, we looked at hourly rates over five days. Now we saw a double hump cycle: The larger hump is at nighttime around 10 PM when people are trying to fall asleep, and the smaller hump is in the daytime when people are getting ready and getting their mind straight for the day. So we optimized most of our campaigns to go out early evenings, early mornings, Sundays, and never, ever, ever on a Friday or a Saturday.

#### What is your most valuable metric, that you look at daily, weekly, or monthly?

#1 is always revenue. And then we have the supplementary metrics that lead to revenue that we also focus on: The number of coupon redemptions and conversion metrics, like install-to-trial, trial-to-paid, the number of distinct days interacted with the app during a trial, and the number of sessions completed while in a paid membership.

#### How do you measure conversion?

We have a conversion event for web and also have webhooks to fetch conversion data from Apple and Google. To access those conversion events and attribute them to campaigns, I have several options thanks to our tech stack:

1.  In **Iterable**, I’m able to define a custom conversion event for every campaign. I can set the attribution period based on an email send, open or click, as well as the time period between the email event and the conversion event.
2.  **Amplitude** also receives a stream of Iterable event data. I can use Amplitude’s feature “Funnel Analysis,” which allows me to see how many users did X event after Y event— i.e. how many users completed a session after opening the email? Amplitude also allows you to set a custom attribution period.
3.  We also have **UTM / Google Tags**, which we don’t leverage as much.

#### Do you have a standardized framework for how long you run your tests?

Yes and no. The answer for how long we should run the test is always dependent on when we reach significance. For complex tests, we pull in a data scientist to analyze our average traffic and tell us—before the tests starts—how long we need to run it in order to gain significance. 

For smaller tests like subject lines, Amplitude has an A/B testing significance calculator. So I, honestly, just refresh it until it reaches significance. But we can always pull in a data scientist, and they can calculate how much power we need and how much time we need to get to the power level.

#### How do you prioritize what to test?

Money [laughs]. We look at the biggest opportunity, and it’s usually a function of volume. With that said, if management wants to test something, sometimes that just trumps money.

#### To recap your webinar, what are the three truths you learned through analytics and testing?

1.  **Don’t be fooled by superficial metrics**, especially when working with email. A lot of people get distracted by opens and clicks, but usually, our end goal is a conversion or a certain type of activity. Make sure your campaigns are optimized for the actual events that you want the user to do.
2.  **Learn from your most engaged users**. If you don’t know where to start, study the people who are using the product the most. That’ll nudge you in the right direction on what content to show and how often you should message. Build your campaign with your superstar user in mind to convince the others that aren’t as engaged to start exhibiting and practicing those behaviors.
3.  Neither #1 nor #2 are possible unless you **invest in the tools** that will help you gain these insights faster. Empowering your team to have tools to be able to draw their own insights and iterate quickly, is key.

To learn more about Sue Cho and Calm’s growth marketing and testing strategies, watch our webinar on-demand.