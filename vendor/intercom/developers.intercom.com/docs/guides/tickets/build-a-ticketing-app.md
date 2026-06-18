# Link an Intercom Ticket with GitHub issues

[Tickets](https://www.intercom.com/help/en/articles/6436600-tickets-explained) are a great way to track work in Intercom, but frequently your engineering team will have their workflows in a tool like GitHub. In this tutorial we'll walk you through how you would sync information between Intercom tickets and GitHub issues. We'll cover registering a webhook, creating an Intercom ticket, writing a listener for your app and creating a corresponding GitHub issue. The Intercom ticket will also be updated with a link to the GitHub issue to make navigation between systems easier.

About this tutorial
This tutorial is written in Ruby and is aimed toward developers familiar with making API requests. It requires exposing a public endpoint to set for webhook notifications. You can use this [Replit template](https://replit.com/@IntercomDevs/Integration-with-Intercom-Tickets-and-GitHub-Issues?v=1) to run the code.

## Prerequisites

* An Intercom workspace. You can use your paid workspace, or a free Intercom [development workspace](https://app.intercom.com/admins/sign_up/developer)
* A GitHub [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with access to the GitHub repo where you'd like to create your new issues.


## The GitHub Access Token

If  you are using a pre-existing repo, you will want to make sure that the access token that you set up has permissions to create issues in that repo. [Fine-grained access tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) are a beta feature but they provide a better measure of security and GitHub recommends using them when possible.

Create the access token and grant it access on your repository of choice.

![GitHub settings where you can set the repository access.](/assets/repository_access.385e2d52a9eca5c65d166e59c05b62a04735d0d83b844a2fa1e43c400ee01a28.71a4f21c.png)

Then scroll down through the permissions and make sure that the token is granted read and write access to Issues.

![GitHub permissions settings with Issues set to read and write.](/assets/issues_permissions.68a1c83397fa799121376c632fdb10f92079e67a872d8796bc5b2262befe1791.71a4f21c.png)

Now keep your access token handy as you'll need it in a later step.

## Step 1: Register a “ticket.created” webhook

To be notified when a new ticket is created in Intercom, you need to subscribe to `“ticket.created”` webhook. Navigate to your app in your [Developer Hub](https://app.intercom.com/a/apps/_/developer-hub) and under the configure menu, select webhooks to set up a Webhook subscription.

Choose the `“ticket.created”` topic from the dropdown:

![Ticket created webhook](/assets/ticket-created-webhook.22300bb8d8772a448467a27c16b3c7b435fb233c9f620cfd96ceb25880531c1a.71a4f21c.png)

Before you save the settings, you need to add a URL pointing to the endpoint that will handle the webhook payload from Intercom and create the GitHub issue.

## Step 2: Handle webhook payload

Your endpoint needs to handle a `POST` request that Intercom will send to it once a new ticket is created in Intercom.

Exposing the endpoint
The URL needs to be publicly available in order to handle the request. You can use [ngrok](https://ngrok.com/), [webhook.site](https://webhook.site/), [Replit](https://replit.com/) or any other proxy service of your choice.

The example code is written in Sinatra (Ruby). You will need:

- [sinatra](https://rubygems.org/gems/sinatra/versions/1.4.7?locale=en) for the framework
- [json](https://rubygems.org/gems/json) for parsing the request body
- [octokit](https://rubygems.org/gems/octokit) for working with the GitHub API
- [httparty](https://rubygems.org/gems/httparty) for making HTTP requests


Install the gems from the command line or using a bundler.

Then create a new `.env` file and add the target repo name and the two access tokens.

```json
REPO_NAME_WITH_OWNER = 'your-github-username/reponame'
GITHUB_ACCESS_TOKEN = 'GitHub-Token'
INTERCOM_ACCESS_TOKEN = 'Intercom-Token'
```

Create a file called `main.rb` and put in the following code.

```ruby
post '/tickets' do
  # Create a GitHub issue from Intercom ticket payload:
  notification = JSON.parse(request.body.read)

  # If the notification is the ping on the setup test, we will log that the setup has worked
  if notification['data']['item']['type'] === 'ping'
    puts 'webhook set up successfully'
  else
  # If the notification is from an incoming ticket, we will get the ticket data to pass on to GitHub
    ticket_title = notification['data']['item']['ticket_attributes']['_default_title_']
    ticket_description = notification['data']['item']['ticket_attributes']['_default_description_']
    ticket_id = notification['data']['item']['id']

    client = Octokit::Client.new(access_token: GITHUB_ACCESS_TOKEN)

    # Note that we store Intercom ticket id within the issue title, we'll need it in Step 5 of this tutorial:
    github_issue = client.create_issue(REPO_NAME_WITH_OWNER, ticket_title + ' [Intercom ticket number: ' + ticket_id + ']', ticket_description)

    # Update the Intercom ticket with the GitHub issue link:
    github_issue_url = github_issue.html_url

    intercom_ticket_endpoint = "https://api.intercom.io/tickets/#{ticket_id}"
    token_string = "Token token = #{INTERCOM_ACCESS_TOKEN}"
    data = { ticket_attributes: { github_issue_url: github_issue_url.to_s } }
    response = HTTParty.put(intercom_ticket_endpoint, body: data.to_json, headers: { 'Content-Type': 'application/json', 'Authorization': token_string, 'Intercom-Version': 'Preview' })
    # Cast the response to a string to avoid TypeErrors
    response_string = response.to_s
  end
end
```

In this code, you are first getting the request body from the webhook notification. When you set up notifications for the first time, it will send a ping to make sure the connection is live. You can also re-test it by clicking the "Send a test request" button in the webhooks section of your developer hub.

If the notification is coming from an incoming ticket, you will get the `ticket_title`, `ticket_description`, and `ticket_id` from the request body. Then, you will invoke the GitHub client and use it to create a new issue in the repo path you defined as an environment variable.

Once the issue has been created, you will pass the `github_issue_url` link back to Intercom and update the ticket with the url.

Now run the file using `ruby main.rb` and get the URL from your service and paste it into the endpoint URL field in the developer hub. Don't forget to click save in the upper right. If this is successful, you should see a banner at the top of the page and you will see the log in your terminal.

![A successful webhook setup](/assets/webhook_success.8565dbd5735aa9d3f2e5fad1063763245aca718c987669c2aa9bfa757f0f578f.71a4f21c.png)

## Step 3: Create the ticket type using the API and a ticket in Intercom Help Desk

Next, you can use the API to [create a new ticket type](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/createTicket/) called "Bug", which will be [categorized as a `Back-office` ticket](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/ticket_type/) since it should only be available for teammates and does not need to be viewed by customers.

```curl
curl -i -X POST \
  https://api.intercom.io/ticket_types \               
  -H 'Authorization: Bearer <Your-Intercom-Token>' \
  -H 'Content-Type: application/json' \
  -H 'Intercom-Version: 2.10' \
  -d '{
    "name": "Bug",             
    "description": "log something is broken",
    "icon": "🐛",         ,
    category": "Back-office"
  }'
```

If successful you should get a response that looks something like this.

`{"type":"ticket_type","id":"7","name":"Bug" ...}`

After creating the ticket type, you also need to add an attribute called `github_issue_url` for tickets of type "Bug". This is necessary to update the ticket with the URL once the corresponding GitHub issue is created. Use the `id` from the response to make the next request.

```curl
curl -i -X POST \
  'https://api.intercom.io/ticket_types/{id}/attributes' \
  -H 'Authorization: Bearer <Your-Intercom-Token>' \
  -H 'Content-Type: application/json' \
  -H 'Intercom-Version: 2.10' \
  -d '{
    "name": "github_issue_url",
    "description": "GitHub Issue URL",
    "data_type": "string",
    "required_to_create": false
  }'
```

Now you can [create a ticket](https://www.intercom.com/help/en/articles/7112463-how-to-create-a-customer-ticket#h_6b7e91306c) from your help desk by clicking on the compose button in the top left and then selecting Ticket. Be sure to choose the ticket type "Bug" that you just created.

![Create a new ticket in your help desk.](/assets/create_ticket.4330e4287e306555a0fd8699b8e08248ff6221e7e0a62d1ce33fba053f01250f.71a4f21c.png)

## Step 4: Check that your issue was created in GitHub

If the ticket was created successfully in Intercom, data about your Intercom ticket should be synced to a corresponding GitHub issue:

![New issue](/assets/new-github-issue.a769c1ed8af9b31ce631a1ee9a73af496919ff56c31ee3d13a4c31d992612910.71a4f21c.png)

The ticket you created in Intercom should be updated with a link to the GitHub issue:

![Link to GitHub issue](/assets/link-to-github-issue.9f909928d6d674f60024ff12e3f969172500dd048c524057693e7f34aa936239.71a4f21c.png)

Issue failed to create
If your issue was not created in GitHub, make sure that your GitHub access token has read and write permissions set for the target repo. Additionally make sure you are using the right Intercom access token for the workspace that you are in and that you've added both of these tokens to your `.env`.

## Step 5: Close the issue in GitHub

When it's time to close this GitHub issue, you'll probably want to mark the corresponding Intercom ticket as "resolved".

To achieve this, you first need to subscribe your GitHub repo to a webhook that will fire when an issue is closed. Refer to [GitHub documentation](https://docs.github.com/en/webhooks-and-events/webhooks/creating-webhooks#setting-up-a-webhook) for how to do this.

You'll also need to add another endpoint to your app that will handle the incoming webhook from GitHub:

```ruby
post '/issues' do
  notification = JSON.parse(request.body.read)

  if notification["action"] == "closed"
    # Parse the ticket id from the issue title:
    ticket_id = notification["issue"]["title"][/Intercom ticket number:\s*(\d+)\]/, 1]

    intercom_ticket_endpoint = "https://api.intercom.io/tickets/#{ticket_id}"
    token_string= "Token token=#{INTERCOM_ACCESS_TOKEN}"
    data = { state: "resolved" }

    # Update Intercom ticket state to mark it as "resolved":
    response = HTTParty.put(intercom_ticket_endpoint, body: data.to_json, headers: { 'Content-Type': 'application/json', 'Authorization': token_string, 'Intercom-Version': 'Preview'})
  end
end
```

Now, if you close the issue in GitHub, the Intercom ticket will be closed as well:

![Ticket closed](/assets/ticket-closed.14d36b8fb93a0f8ae5fbfd44c8a3c3d6693820f5c644514f3de631cee452a788.71a4f21c.png)

Congrats! Your integration should be up and running.

In this tutorial you set up GitHub issue creation, but this is just one example of a connection you can set up with your Intercom help desk and ticketing system. Whatever issue tracker your team uses can be utilized as long as they have an API. You can also add any attributes needed to make the system as customized possible to your team's needs.

How did it go?
We hope you found this tutorial helpful. If you have any feedback on this page please let us know in the form at the bottom, and you can always contact us with questions or feedback in the Messenger in the bottom right.

## Next steps

- [Learn more](https://www.intercom.com/help/en/collections/3659257-tickets) about how Tickets work.
- Try out other Ticket webhook [topics](https://developers.intercom.com/docs/references/preview/webhooks/webhook-models/).
- Explore the [Ticket API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/ticket/).