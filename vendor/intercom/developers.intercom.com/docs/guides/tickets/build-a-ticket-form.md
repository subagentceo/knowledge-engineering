# Build a Ticket form

In this tutorial, we'll walk you through building a custom web form that will allow your users to submit tickets directly to Intercom, via [Tickets API](https://developers.intercom.com/intercom-api-reference/v0/reference/the-ticket-model).

## Prerequisites

* An Intercom workspace. You can use your paid workspace, or a free Intercom [development workspace](https://app.intercom.com/admins/sign_up/developer)
* Ticket Types of "Bug", "Feature request" and "Other". Create the required Ticket Types [via the API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Ticket-Types/createTicketType/) or [in the UI](https://www.intercom.com/help/en/articles/7112127-create-custom-ticket-types).


## Step 1: Create an app for your ticket form

In this tutorial, we'll use Sinatra (Ruby) to power the ticket form on your website. You can refer to official [Sinatra docs](https://sinatrarb.com/intro.html) to learn how to set up a basic Sinatra app.

For this app, you'll need two endpoints: `get /index` to display the form and `post /tickets` to create the ticket. To create a ticket, the app will make a call to [Tickets API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/ticket/):


```ruby
require 'sinatra'
require 'json'
require 'httparty'

# To create a ticket in Intercom, you need to provide the id of the corresponding Ticket Type.
# This is a simplified way to map user selection to a Ticket Type id:

TICKET_TYPES = {
  '1' => 'Bug',
  '2' => 'Feature request',
  '3' => 'Other'
}

get '/' do
  # This endpoint displays the `index` template, i.e. the ticket web form itself:

  erb :index
end

post '/tickets' do
  # This endpoint gets called when the form is submitted.

  # First, we parse the payload we receive from the form:
  ticket_type_id  = params['ticket_type']
  ticket_title = params['ticket_title']
  ticket_body = params['ticket_body']
  email = params['email']

  # Then we prepare the payload that will be sent to Intercom Tickets API:
  intercom_api_token = 'your_intercom_api_access_token'
  intercom_ticket_endpoint = "https://api.intercom.io/tickets"
  token_string= "Token token = #{intercom_api_token}"

  data = { 
    ticket_type_id: "#{ticket_type_id}",
    contacts: [{ email: "#{email}" }],
    ticket_attributes: { _default_title_: "#{ticket_title}", _default_description_: "#{ticket_body}" }
  }
  
  HTTParty.post(intercom_ticket_endpoint, body: data.to_json, headers: { 'Content-Type': 'application/json', 'Authorization': token_string, 'Intercom-Version': 'Preview'})
end
```

The code above maps Ticket Types to hardcoded numbers for simplicity sake. In a real world app, you'll likely need to query [Ticket Types API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Ticket-Types/getTicketType/) to match customer's selection to an id of a Ticket Type in your system.

## Step 2: Create a  ticket form

Add the following code to `index.erb` template to display the ticket form:


```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset='UTF-8' />
    <title> Create an Intercom ticket </title>
  </head>
  <body class='container'>
    <h2> Create a ticket </h2>
    <form action='tickets' method='post'>
    <label>Choose the type of the ticket you wish to submit:</label><br>
      <ul>
        <% TICKET_TYPES.each do |id, text| %>
          <li>
            <label>
              <input type='radio' name='ticket_type' value='<%= id %>' id='ticket_type_<%= id %>' required/>
              <%= text %>
            </label>
          </li>
        <% end %>
      </ul>
      <label>Subject</label><br>
      <input type="text" name="ticket_title"><br>
      <label>Description</label><br>
      <textarea name="ticket_body" rows="6" required></textarea><br>
      <label>Your email</label><br>
      <input type="text" name="email" required><br>
      <button type='submit'>Submit</button>
    </form>
  </body>
</html>
```

## Step 3: Fill out ticket details

Fill out the necessary details and click "submit":

![Create ticket webform](/assets/create-ticket-webform.baeacd70644a9e4e7b11f2ef40dbf25122499ec22c0970b2fd316f5747070592.71a4f21c.png)

You should now see this ticket in your Intercom Inbox:

![Webform Intercom ticket](/assets/webform-intercom-ticket.d17d7dadad6b699ee1b940e2551b62c9e866aaf6a65d4a621c371bf8628d6032.71a4f21c.png)

Congrats! You are done.

## Next steps

- [Learn more](https://www.intercom.com/help/en/collections/3659257-tickets) about Tickets as a product.
- Explore Ticket webhook [topics](https://developers.intercom.com/docs/references/preview/webhooks/webhook-models/).
- Explore [Ticket API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/ticket/).
- Build an [integration](/docs/guides/tickets/build-a-ticketing-app)  between Intercom tickets and GitHub issues.