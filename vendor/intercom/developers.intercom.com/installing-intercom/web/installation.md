# Installation

You have options on how you can install Intercom, using code snippets or third parties, including:

- [Basic JavaScript](#basic-javascript)
- [Single-page app](#single-page-app)
- [Rails gem](#rails-gem)
- [WordPress](#wordpress)
- [Google Tag Manager](#google-tag-manager)
- [Shopify](#shopify)
- [Segment](#segment)


## Getting started

First you’ll need to ensure that the Messenger for Web is enabled from inside the [Intercom settings panel](https://app.intercom.com/a/apps/_/settings/web).

You enable the Messenger for Web. When this is disabled, all requests to Intercom will fail.

When enabled you should see a green check mark next to the step.

![](/assets/install_messenger_step_1.db2f7b885d40b81f894ae01a5ad2b3c905505c93f108142ad38f1c851c8073eb.71a4f21c.png)

Now you may select the installation method you'd like to use. Once you make the choice, you need to toggle "enable user traffic for messenger" on in order to start accepting user requests from your messenger.

It's important to enable user traffic before you install the Messenger. If you don't, you may experience failed requests.

![](/assets/enable_user_traffic.50c2af08437c91eed0697b36225d9d61d09596957dd499c7b07f5c348031d038.71a4f21c.png)

## Basic JavaScript

If you have a web app with multiple pages where each one triggers a new page refresh then you will most likely need the basic JavaScript method. This means you will not need to create separate actions which trigger when the Messenger will appear or update: The page refresh itself will trigger the action.

To get the Messenger to appear on your web app copy and paste the snippet below before the `</body>` tag on every page where you want the Messenger to appear for website visitors or in your Node.js file.

Workspace ID and App ID
You may see references to "Workspace ID" and "App ID". These are the same values.

In the code, you will need your own workspace ID at the placeholder that says `"Your-Workspace-ID"`.

You can find this value in the URL when you are logged into Intercom. It will be a string of numbers and letters directly after `apps/`. So for `https://app.intercom.com/a/apps/ecahpwf5/home` the workspace ID is `ecahpwf5`.


```JavaScript
<script>
  const APP_ID = "Your-Workspace-ID" // IMPORTANT: Replace with your workspace ID

  window.intercomSettings = {
    api_base: "https://api-iam.intercom.io",
    app_id: APP_ID,
    user_id: user.id, // IMPORTANT: Replace "user.id" with the variable you use to capture the user's ID
    name: user.name, // IMPORTANT: Replace "user.name" with the variable you use to capture the user's name
    email: user.email, // IMPORTANT: Replace "user.email" with the variable you use to capture the user's email address
    created_at: user.createdAt, // IMPORTANT: Replace "user.createdAt" with the variable you use to capture the user's sign-up date
  };
</script>

<script>
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/' + APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s, x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>
```


```NPM
import Intercom from "@intercom/messenger-js-sdk";
//Set your APP_ID
var APP_ID = "Your-Workspace-ID";

// ...

Intercom({
  app_id: APP_ID
})
```

The snippet above is set to use the US as the default regional data host. If you are using a data center hosted in the EU or Australia, you will need to choose the associated API base:

| Regional Location | API Base to Set |
|  --- | --- |
| US | `https://api-iam.intercom.io` |
| EU | `https://api-iam.eu.intercom.io` |
| Australia | `https://api-iam.au.intercom.io` |



```JavaScript
window.intercomSettings = {
    app_id: REGIONAL_APP_ID,
    api_base: `see table above`
  };
```


```NPM
Intercom({
  region: "us", // "eu" | "au" | "us" - default: "us"
  app_id: REGIONAL_APP_ID
})
```

### For website visitors without logins

The examples so far have been for logged-in users, which allows the Messenger to display information like customer names and previous conversations across devices. This is the recommended approach.

However, you may install the Messenger for anonymous website visitors who aren’t logged in by excluding the user details from the settings object. Conversations will be saved in the browser via a cookie.


```JavaScript
<script>
  const APP_ID = "Your-Workspace-ID" // IMPORTANT: Replace with your workspace ID

  window.intercomSettings = {
    api_base: "https://api-iam.intercom.io",
    app_id: APP_ID,
  };
</script>


<script>
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/' + APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>
```


```NPM
import Intercom from "@intercom/messenger-js-sdk";
//Set your APP_ID and correct user data
var APP_ID = "APP_ID";
var current_user_email = "sartre@existentialist.com";
var current_user_name = "Jean Paul Sartre";
var current_user_id = "1940";

Intercom({
  app_id: APP_ID,
  name: current_user_name, // Full name
  email: current_user_email, // Email address
  user_id: current_user_id // current_user_id
})
```

## Single-Page App

For a single-page app, add the below before the  tag or in your Node.js file.


```JavaScript
<script>
  const APP_ID = "Your-Workspace-ID" // IMPORTANT: Replace with your workspace ID

  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/' + APP_ID;var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>
```


```NPM
import Intercom from "@intercom/messenger-js-sdk";
//Set your APP_ID
var APP_ID = "APP_ID";

// ...

Intercom({
  app_id: APP_ID
})
```

Be sure to set your APP_ID!
One of the most common issues people have when setting up Intercom first is they forget to include their App ID in the above library code and copy and paste it into their site. The problem is you won't see any error message and Intercom will not show up when you boot the Messenger in the next step. You can set it using a var as noted in the above example or manually in the code itself. You might need to include the App ID in multiple places so using a var is generally a good idea.

You can find your workspace ID in the URL when you are logged into Intercom. It will be a string of numbers and letters directly after `apps/`. So for `https://app.intercom.com/a/apps/ecahpwf5/home` the workspace ID is `ecahpwf5`.

Now you can setup the Messenger to start up. Replace the example variables below in the boot call with your own user data variables. Once your app initializes, add the boot call where you load user data.

This step is not needed for installations with NPM Package.


```javascript
window.Intercom("boot", {
  api_base: "https://api-iam.intercom.io",
  APP_ID: APP_ID,
});
```

The above example is the most basic way you can launch the Messenger. It does not include any information when it boots. You can include information here if you like but that will depend on what Intercom products you are using and what information you need from your users.

If you have the launcher on page where a user need to sign in to get to then you can include more info in that boot code.


```JavaScript
window.Intercom('boot', {
  app_id: APP_ID,
  email: 'example@example.com',
  user_id: 'abc123',
  created_at: 1234567890,
});
```


```NPM
Intercom({
  app_id: APP_ID,
  email: 'example@example.com',
  user_id: 'abc123',
  created_at: 1234567890,
})
```

You may update Intercom whenever the view or URL changes in your app. This will allow people to receive your most recent messages.


```javascript
window.Intercom("update");
```

## Rails gem

If you have a Rails app then you can use our Rails gem to install Intercom.

First, add Intercom to your Gemfile.


```ruby
gem "intercom-rails"
```

Make sure Intercom is installed by running this command:


```ruby
bundle install
```

Generate a config file with this command:


```ruby
rails generate intercom:config <YOUR APP ID>
```

You can find your workspace ID in the URL when you are logged into Intercom. It will be a string of numbers and letters directly after `apps/`. So for `https://app.intercom.com/a/apps/ecahpwf5/home` the workspace ID is `ecahpwf5`.

Add the below line to the config file:


```ruby
config.api_base = "https://api-iam.intercom.io"
```

Make sure your user object is accessible within your controllers as current_user or @user and that it responds to an id or email method. Once you’ve completed your changes, open your website. Your Messenger should appear in the bottom right corner.

## WordPress

Using WordPress
In order to use Intercom with WordPress you must have WordPress v4.2.0 or higher.

1. Install the Intercom plugin, either for [self-hosted sites](https://www.intercom.com/help/en/articles/173-install-intercom-on-your-wordpress-site) or for [hosted WordPress sites](https://wordpress.com/plugins/intercom).
2. Choose "Connect with Intercom" from the plugin's settings page & complete authentication.
3. Open your WordPress site. Your messenger should appear in the bottom right corner.


## Google Tag Manager

1. Copy your workspace ID
2. Follow the [instructions from our Help Center](https://www.intercom.com/help/en/articles/2631808-install-intercom-with-google-tag-manager) to complete the set up.


## Shopify

1. Install the Shopify app from the [Intercom App Store](https://app.intercom.com/a/apps/hfegwpea/appstore?app_package_code=shopify).
2. Ensure [customer accounts are enabled](https://help.shopify.com/en/manual/customers/customer-accounts) for your Shopify store.
3. Log in to your Shopify store as a customer.
4. Send a message as a customer to test the installation.


## Segment

1. Follow Segment's instructions to [add Intercom as a destination](https://segment.com/docs/connections/destinations/catalog/actions-intercom-web/).
2. Activate Intercom.
3. [Add sources with identified users](https://segment.com/docs/connections/destinations/catalog/actions-intercom-web/#identify-user) to send user data to Intercom.


## Ending a session

Intercom allows you to put the Intercom Messenger on any public facing site that you own (your marketing site, your docs site, your developer hub, etc). In order to maintain continuity of conversations across all of these potentially different subdomains while your users are logged in, we set a cookie in your user's browser. This cookie expires after one week.

Any user that uses a shared computer and browser with someone else will be able to see the most recently logged in user's conversation history until the cookie expires. Because of this, it's very important to properly shutdown Intercom when a user's session on your app ends (via manually or automatically logging out).

### How to shut down Intercom:

1. You will have already begun tracking your user via the Intercom JS snippet or the "boot" method.
2. When your user logs out of Intercom (or is automatically logged out by your app), call Intercom('shutdown'); from our JavaScript API or simply shutdown(); for NPM installations, to end the Intercom session and clear the cookie.
3. If applicable, call Intercom('boot', {app_id: 'Your-Workspace-ID'}) to start a fresh session.


The Intercom('shutdown') method will automatically reset Intercom to a clean state for logging in another user or booting Intercom for logged-out areas of your application

## Next Steps

- Set up [identity verification](/installing-intercom/web/identity-verification)
- [Customize](/installing-intercom/web/customization) the look and feel of the Messenger
- Try out the [JavaScript methods](/installing-intercom/web/methods) for Web