# Create a Ticket

Tickets are a convenient way to capture and track complex customer queries in Intercom, so a lot of popular Ticket usecases are related to Customer Support.

However, Tickets can also be helpful for other teams in Intercom, to do things like track escalations or operational tasks.

For example, if you have identified some sort of user behaviour where you would want to intervene and reach out to the customer, Tickets can be useful.

A usecase we've heard from early adopters of tickets is creating follow up items for Sales teams monitoring the progress of leads and prospects through trials of your product. You might have some customers that are considered "high-value" in your system, and the definition of high value varies from business to business. You might have also noticed that a certain percentage of these high value customers don't complete your onboarding flow, so you need an easy way for your Sales team to proactively reach out to these clients and make sure they complete onboarding.

Tickets make this possible.

## Step 1: Create a ticket type

First, create a ticket type called "Onboarding" that will be a template for all future tickets of this type:

```bash
curl --request POST \
     --url https://api.intercom.io/ticket_types \
     --header 'Intercom-Version: 2.9' \
     --header 'accept: application/json' \
     --header 'authorization: Bearer <Your access token>' \
     --header 'content-type: application/json' \
     --data '
{
  "icon": "🎟️",
  "is_internal": true,
  "name": "Onboarding"
}
'
```

Next, create attributes for this Ticket Type. Attributes are data fields to capture in tickets created for users who don't complete onboarding. In this tutorial, we will create just one attribute to track the priority of the ticket, but you may choose to create multiple attributes specific to your business:

```bash
curl --request POST \
     --url https://api.intercom.io/ticket_types/1/attributes \
     --header 'Intercom-Version: 2.9' \
     --header 'accept: application/json' \
     --header 'authorization: Bearer <Your access token>' \
     --header 'content-type: application/json' \
     --data '
{
  "required_to_create": true,
  "required_to_create_for_contacts": false,
  "visible_on_create": true,
  "visible_to_contacts": false,
  "name": "Priority",
  "data_type": "list",
  "list_items": "P1, P2, P3"
}
'
```

This is what such a ticket type could look like:

![Onboarding ticket type](/assets/onboarding-ticket-type.62296a873aed7b9b5d55d80a2c8d74fcf3d139531a25f70b90c7d7040c1052c9.71a4f21c.png)

This tutorial assumes that this is the only ticket type you have in your system.

Tickets must have a Ticket Type
You can't create a ticket without first creating a corresponding Ticket Type. You'll only need to do this once.

## Step 2: Create a ticket

You can create a ticket in Intercom by making a call to the Tickets API:

```bash
curl --request POST \
     --url https://api.intercom.io/tickets \
     --header 'Intercom-Version: 2.9' \
     --header 'accept: application/json' \
     --header 'authorization: Bearer <Your access token>' \
     --header 'content-type: application/json' \
     --data '
{
  "contacts": [
    {
      "email": "john.doe@gmail.com"
    }
  ],
  "ticket_attributes": {
    "priority": "1",
    "company_size": "100",
  },
  "ticket_type_id": "1",
}
'
```

You can create a new Ticket directly from the reference docs with the interactive [API playground](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/createTicket/) using Node, Ruby, PHP, Java, Python and other languages. The reference docs provide each data field you can send to the API.

Once the ticket is created, you may also choose to assign it to a specific person or team by making an update to the ticket via [the API](https://developers.intercom.com/docs/references/rest-api/api.intercom.io/Tickets/updateTicket/). This can be your Sales team, whose task it will be to reach out to the affected customer and help them complete the onboarding.

You can also create [an Inbox rule](https://www.intercom.com/help/en/articles/6604682-automate-your-inbox-using-rules) that will auto assign a ticket to a specific team based on a ticket type.

We hope that this tutorial gives you some ideas about how your business can benefit from Intercom tickets.

## Next steps

- [Learn more](https://www.intercom.com/help/en/collections/3659257-tickets) about Tickets as a product.
- Build [an integration](/docs/guides/tickets/build-a-ticketing-app) between GitHub issues and Intercom tickets.
- Build [a custom web form](/docs/guides/tickets/build-a-ticket-form) to submit tickets directly to Intercom.