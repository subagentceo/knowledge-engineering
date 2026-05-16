# App Review and Publishing

In order to make your app public and available for customers to install, you will need to submit it for a review from the Intercom team.

In this guide you will learn:

- Which apps require a review
- The difference between listed and unlisted apps
- How to submit your public app for review
- Submission requirements and common pitfalls
- How to submit updates to your app


## Which apps require a review?

If you are building an app that can be installed and used by any customer on Intercom, and will have access to their workspace data, you are building a **public app**. This means that the Intercom team must review and approve your app before it is available to install.

Private apps that only access your own paid workspace data **do not require a review.** You can ignore the rest of this page!

## Listed vs Unlisted?

Your public app has the option of being [listed](/docs/publish-to-the-app-store/review-publish-your-app#listed-apps) or [unlisted](/docs/publish-to-the-app-store/review-publish-your-app#unlisted-apps).

### Listed apps

A listed app will be available for anyone to discover and install in the [Intercom App Store](https://www.intercom.com/app-store).

This requires filling out the App Listing and App Partner Program pages in the Developer Hub and ensuring that all the requirements for each are met. Read more in the [listing your app](/docs/publish-to-the-app-store/listing-your-app) guide.

#### Installation Status

For listed apps, you can give your customers the option to install your app from the App Store or on your own website or app. You can set this in the Installation status section.

Installation status for listed apps
You must fill out the Installation status section in order to submit your app to be listed in the App Store. Providing broken or unclear links will result in an application rejection, and you will have to resubmit for review.

Choose "Directly from the Intercom App Store" and provide the [Direct installation url](/docs/build-an-integration/learn-more/authentication/installing-uninstalling-apps#allow-installation-directly-from-your-app-listing-recommended), which should be the link that will kick off the OAuth flow right from the App Store.

![Intercom installation status section where you can describe how to install your app](/assets/app_installation.ab2c6a48cffe45d6400413d0757c091ca3f220100ea56750359888357e4af10f.71a4f21c.png)

Choose "Through your own product or website" and provide a [Learn more URL](/docs/build-an-integration/learn-more/authentication/installing-uninstalling-apps#allow-installation-from-your-own-product-or-website-only), which should give clear instructions on how to install your app and provide a method for installation.

![Intercom installation status section for the learn more link](/assets/app_learn_more.563eaf914f398c8ee65c103194b8da3a33881aa2beccbd132dfa9edfe7447c32.71a4f21c.png)

### Unlisted apps

An unlisted app is a public app that is available for anyone to install but is **not** listed in the App Store: It must be installed via your own product or website.

Please provide clear instructions to your customers on how they can install your app.

Unlisted apps do not need an Installation status
Unlisted apps do not need to fill out the Installation status section. Please provide clear instructions in your own product on how customers can install and use your app.

## How do I submit my app for review?

Review required for all public apps
Both unlisted and listed apps must be submitted for review.

Once you've finished developing your public app and have [successfully set up OAuth](/docs/build-an-integration/learn-more/authentication/setting-up-oauth), you can submit your app for review and choose when to make it available for install by filling out the pages in the Test and publish section of your [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub).

The following sections detail important aspects of these forms that you will want to pay warning to.

### App listing and start guide

If you plan to list your app in the App Store, you need to fill out the [App Store listing](/docs/publish-to-the-app-store/listing-your-app) and [Start guide](/docs/publish-to-the-app-store/writing-your-start-guide) sections located in the sidebar.

Please ensure that you have met the requirements for the App Store listing — one common pitfall is submitting images that are not in marketing format. Check the [images section](/docs/publish-to-the-app-store/listing-your-app#app-images) of the listing guide to make sure that your images are in the correct format before you submit for review.

### App Partner Program information

In the sidebar, you will find a section on the App Partner Program. This form asks for information including your company details, target use cases, points of contact, and more. This ensures we always have the right contact information on hand for technical, co-marketing, or co-selling opportunities.

![App Partner Program Info](/assets/01dba54-app_partner_program_info.81cd37f48215cbefa6147b023dd44db8caa95f8cfc19227128de3f4062bfe14f.71a4f21c.png)

### Submit for a review

The final step is to fill in the [app description](/docs/publish-to-the-app-store/review-publish-your-app#app-description) and [end-to-end video](/docs/publish-to-the-app-store/review-publish-your-app#end-to-end-video) sections on the "Submit for a review" page.

![Intercom](/assets/app_submit_for_review.6ddb353fea26d762224705bc8550d01e074779285149708bdb2152a37fc3ea77.71a4f21c.png)

Review notifications
Once the review process starts, **teammates who created the app and teammates who submitted the review will receive notifications** via email and in-app in the Messenger. These notifications include when feedback and approval is given by the Intercom team for any of the actions taken.

#### App Description

Write a brief description of your app and how it works with Intercom.

In order to access your app we will need to test out the full functionality. This means if your app requires a subscription or account with your service, you'll need to provide us with test account credentials or set up instructions within the description.

#### End-to-End Video

You are required to submit a video to the team that shows:

- Installation of the app with OAuth successfully working
- The end-to-end experience and functionality of your app
- Uninstallation of the app with OAuth


Ensure you follow the guidelines
Before you make your video, please check that you are following the guidelines outlined here:

- [Canvas Kit: Messenger Best Practices](https://developers.intercom.com/build-an-integration/docs/canvas-kit-messenger-best-practices)
- [Canvas Kit: Inbox Best Practices](https://developers.intercom.com/build-an-integration/docs/canvas-kit-inbox-best-practices)
- [Building Successful Apps](/docs/build-an-integration/learn-more/building-successful-apps) guides.


This is in addition to our [developer terms](/docs/publish-to-the-app-store/intercom-developer-terms) and [platform guidelines](/docs/publish-to-the-app-store/intercom-platform-guidelines)

Please show the full `client_id` and state parameter in the OAuth URL.

The purpose of the video is to understand if the OAuth flow works and if your app meets our [app guidelines](/docs/build-an-integration/learn-more/building-successful-apps). It is also to determine whether the scopes match the required functionality of the app: If you have requested scopes outside of the current functionality, you may be asked to adjust your scopes and resubmit the app.

It is better to show too much of your app than not enough. If you do not show all of the functionality of your app as well as the OAuth processes, you will have to resubmit your video.

Click "Submit for Review" to submit your app to our team.

If you need to discard any changes that have been made to your app to start over, you can use the Discard Changes button on this page.

![Discard Changes](/assets/discard_button.a34769baebcef96e583cabb22e9d505f06103a5e5fece67614d4d7808e1f4f46.71a4f21c.png)

## The review process

Once your app is with the Intercom team, we will review it to ensure it meets our requirements.

You will see a yellow banner at the top of the screen stating it can take up to seven business days for review.

### Communicating with the Intercom team

Our team will reach back out to you in an in-app conversation in the Messenger (find it at the bottom right of any Intercom pages you visit) to let you know about any changes that need to be made to your app. Feel free to ask any questions in that conversation.

If you are asked to make changes, you may resubmit your app after making the requested changes and our team will review it further.

![Intercom](/assets/6c5593e-intercom.cb4e9dedf94b0b2d6b6e8427038749b8be77ed3b60a73776de2896c542f345db.71a4f21c.png)

### Your application's status and visibility

During this process, your app will be **private** and can only be used by you and your team.

When your app is approved, it will become a **public unlisted** app.

You'll see the following green banner and blue pill:

![Review blurred](/assets/7cf41e3-review_blurred.7c75e72ffa68b53f13330976b60b047f0903beb48f86723ed47d554bcb2dbc69.71a4f21c.png)

Why is my app unlisted?
We allow your app to be public but unlisted so that you don't necessarily have to set the listing live straight away. You can instead **test out your app in a separate staging environment, or send to your customers individually to collect feedback (ie. when in beta)**.

When you want to set your listing live for public installs via the App Store, you will need to select the **List in App store** option on the App Store listing page.

![App store](/assets/3a4f18d-11_-_app_store.32e4cae778aad1b540ceb49462cb047469743a361f073a182eda616b2d0b38b2.71a4f21c.png)

## Updating your app

You may need to make changes to the current details about your app in the review, listing, or OAuth pages. There are two different systems depending on whether this is due to a rejected application or an approved application.

### Changing a rejected application

If your app is rejected, you will need to resubmit your app after you have made the changes that our team has requested.

We'll show you exactly where the issue is on the given page, under the header **Feedback from Intercom**. You can also ask use any questions you may have about the changes in the in-app conversation in the Messenger with our team.

![Review](/assets/78b6cea-10_-_review.54ed67bdb2d9d8e4bb9246fe0291a122149f8f119609579c86373f69192e68eb.71a4f21c.png)

Your application can take up to seven business days to review, so ensure everything is fixed. You can then resubmit via the **Submit for Review** button.

### Changing an approved application

Once your app is approved you are ready to publish. However, if you need to make any changes in the future the app will need to be re-approved by the Intercom team.

In the approval flow before your app was published, your app remained in a private state until the team approved it. However, in cases where an app is updated after it is approved and published, the app will remain public with the current functionality until your updates have been approved.

You can see and review all the changes in the **Review changes** tab in your Developer Hub before you submit again.

![Review](/assets/1e22737-15_-_review.29edcc657a8faf8fea1df7377c4ed363a981ee4d3ba18773553151cc4897ce46.71a4f21c.png)

You can also see the changes to the listing being reviewed in your **Pending configuration** tab, and what's currently visible on the App store in the **Approved configuration** tab. These can be found on your App store listing page.

![App store](/assets/900bc6d-16_-_app_store.c0c3953845c38cda8e94e8fd51342ff83df1968cd79b97c2ba689e536e91ff3b.71a4f21c.png)

## Further app development

Once your app has been approved, you may want to continue iterating and developing without touching your production app.

We recommend [creating a new app](https://app.intercom.io/a/apps/_/developer-hub) on the Developer Hub home page if you haven't already, which can be used purely as a staging app for development purposes. You can populate this with all the URLs and settings for development.

What's best practice to prevent editing my production app?
A good rule is to name the development app the same as your production app but append something such as `[Staging]` or `[Dev]` at the end to differentiate these. You'll also see that the production app will be labeled as `Public` and your development app will be labeled as `Private`.