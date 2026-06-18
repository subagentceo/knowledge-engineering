# Build your own reports

You may want to use the API to access data to build your own reports. There are several metrics that we display in the Intercom reporting UI that are not available via the API because they are *calculated* metrics. In this document, we describe those metrics and how you can calculate them yourself.

Search APIs
The performance of search APIs may be slower than the average API speed depending on the complexity of the queries. It's recommended to use pagination and optimize your query to improve performance.

## Team Performance

### Conversations assigned by team

Defined as the number of unique conversations assigned to a team in the selected time period.

[Search for conversations](https://developers.intercom.com/intercom-api-reference/reference/searchconversations) within the chosen date range and the `team_assignee_id` attribute.

```JSON
{
	"query": {
		"operator": "AND",
		"value": [
      {
				"field": "created_at",
				"operator": ">",
				"value": "1666414800"
			},
			{
				"field": "created_at",
				"operator": "<",
				"value": 1673589599
			},
			{
				"field": "team_assignee_id",
				"operator": "=",
				"value": 12345
			}
		]
	},
  "pagination": {
    "per_page": 5
  }
}
```

### Median first response time by team assigned

The median time to reply to the first incoming message in a conversation.

1. Filter conversations by `team_assignee_id`
2. Find the total number of conversations using `total_count`
3. Retrieve the `statistics.first_admin_reply_at` value for each conversation and calculate the median of this value.


### Teammate performance overview

#### Assigned

1. Filter conversations by the `admin_assignee_id` attribute for each teammate.
2. Sum the `total_count` of the conversations from step 1.


```JSON
{
  "query": {
    "field":"admin_assignee_id",
    "operator": "=",
    "value":"5569718"
  },
  "pagination": {
    "per_page": 5
  }
}
```

#### Participated

The number of unique conversations an admin replied to.

The Participated Filter
The **participated** filter only shows conversations where the selected teammate(s) sent user visible replies.

Calculate this number using conversation parts:

1. Filter all conversation parts where `part_type.author = admin` and `created_at` is within the given date range.
2. Count the unique number of conversations in those parts.


```JSON
{
"query": {
  "field":"teammate_ids",
  "operator": "=",
  "value":"5618076"
  },
  "pagination": {
    "per_page": 5
  }
}
```

#### Replies sent

Total number of individual replies sent for all conversations within the given time period.

Calculate this number using conversation parts:

1. Filter all conversation parts where `part_type.author = admin` and `created_at` is within the given date range.
2. Calculate total number of replies.


#### Closed conversations

The number of unique conversations closed, filtered by the time they were closed.

Closed Conversations
A single conversation can be closed multiple times.

1. Filter all conversation parts where `part_type = close` and `created_at` is within the given date range.
2. Count the unique number of conversations in those parts.


```JSON
{
  "query": {
    "operator": "AND",
    "value": [
      {
        "field":"state",
        "operator": "=",
        "value":"closed"
      },
      {
        "field":"admin_assignee_id",
        "operator":"=",
        "value": "5565920"
      }
    ]
  },
  "pagination": {
    "per_page": 5
  }
}
```

#### Notes

Number of notes created by admin, filtered by the time they were created at.

1. Filter all conversation parts where `part_type = note`.


#### Assigned

Number of unique conversations assigned to each teammate, filtered by the time they were assigned at.

Calculate this number using conversation parts:

1. Filter all conversation parts where `part_type = assigned_to` is present and `created_at` is within the given date range.
2. Count the unique number of conversations in those parts.


## Responsiveness

### Median response time

The median of the `median_time_to_reply` value for each conversation.

Median response time (MRT) is defined as the median time it took for an admin to respond to a customer's last reply, at any point during a conversation, including their first response and any subsequent response.

Each individual response time for a conversation's MRT is calculated by comparing the last User response and the following admin response.

### Median first response time

#### First response time

`time_to_admin_reply`

#### Median first response time

Median value of `time_to_admin_reply` across all conversations.

`Time_to_admin_reply` is the duration from `first_contact_reply_at` to `first_admin_reply_at`.

### Median time to close

The median value of the `time_to_last_close` attribute for all conversations within the selected time period

Time to close
To calculate the time to close, we take into account when the conversation was created and the last time it was closed (in case it has been reopened and closed at some point).

## Conversational Support

### Proactive Support Messages

#### General

Any interaction a customer has with the Article Inserter, Article Search, Interacting with the Messenger, Viewing Your Help Center, or Fin AI Agent.

Resolved with self-serve content covers all of the above that were closed without starting a conversation with a human.

#### Served by a teammate after self-serve

All of the customers who participated in a Self-Serve interaction and ended up starting a conversation with a teammate.

To calculate the most popular articles read by customers (by title) you should query all articles and sort by number of views
To calculate the number of proactive messages sent you should use `// TODO - Confirm this with CS //` Messages (unstable API) to download CSV of all outbound sent

## Effectiveness

### Conversations replied to

The number of **unique conversations** that a teammate replied to, filtered by the time the reply was sent.

Calculate this number using conversation parts:

1. Filter all conversation parts where `part_type = comment` and `created_at` is within the given date range.
2. Count the unique number of conversations in those parts.


### Conversations reassigned

Filter conversations where `statistics.first_contact_reply_at` is in the time range and `statistics.count_assignments > 1`.

```JSON
{
  "query":  {
    "operator":"AND",
    "value": [
      {
        "field": "statistics.first_contact_reply_at",
        "operator": ">",
        "value": "1666414800"
      },
      {
        "field": "created_at",
        "operator": "<",
        "value": "1673589599"
      },
      {
        "field": "statistics.count_assignments",
        "operator": ">",
        "value": "1"
      }
     ]
   },
  "pagination": {
    "per_page": 5
  }
  }
```

### Median time to first assignment

Statistics object → median of `time_to_assignment` value

### Median time from first assignment to close

This is the duration from `last_assignment_admin_reply_at` to `last_close_at`.

## Customer Satisfaction

### Conversation ratings

In the Customer Satisfaction Report, conversation ratings are calculated by the date in which the conversation rating was given.

In the API, you should use `created_at` in the `conversation_rating` object of each conversation to view the date the conversation rating was given

Created At Object
`created_at` returns the timestamp when the **first** rating was given.

Conversation Ratings by Date

```JSON
{
  "query": {
    "field": "conversation_rating.replied_at",
    "operator": ">",
    "value": "1666414800"
  },
  "pagination": {
    "per_page": 5
  }
}
```

Conversation Ratings by Rating Value

```JSON
{
  "query": {
    "field":"conversation_rating.score",
    "operator": "=",
    "value":"5"
  },
  "pagination": {
    "per_page": 5
  }
}
```

### Remarks from Customers

To access any remarks from customers, you should first retrieve the conversation, then the `conversation_rating` object, and finally the `remark` attribute for each conversation you are querying.

## Conversations

### New Conversations

[Search for conversations](https://developers.intercom.com/intercom-api-reference/reference/searchconversations) with `created_at` within the given date range.

```JSON
{
  "query": {
    "operator":"AND",
    "value": [
      {
        "field": "created_at",
        "operator": ">",
         "value": "1666414800"
      },
      {
        "field": "created_at",
        "operator": "<",
        "value": "1673589599"
      }
    ]
  },
  "pagination": {
    "per_page": 5
  }
}
```

### New inbound conversations

[Search for conversations](https://developers.intercom.com/intercom-api-reference/reference/searchconversations) where `source.delivered_at = customer_initiated`

```JSON
{
  "query": {
    "field":"source.delivered_as",
    "operator": "=",
    "value":"customer_initiated"
    },
  "pagination": {
    "per_page": 5
  }
  }
```

### Conversations replied to by teammates

[Search for conversations](https://developers.intercom.com/intercom-api-reference/reference/searchconversations) where `statistics.first_admin_reply_at` is within the given date range.

Conversation Date Range
Conversations returned from this query may have **started before** the given date range.

### Closed conversations

The number of unique conversations closed, filtered by the time they were closed.

[Search for conversations](https://developers.intercom.com/intercom-api-reference/reference/searchconversations) where `state = closed`

```JSON
{
  "query": {
    "field":"state",
    "operator": "=",
    "value":"closed"
  },
  "pagination": {
    "per_page": 5
  }
}
```

### Open conversations

The number of conversations with a status of *Open* at the end of the given time period.

[Search for conversations](https://developers.intercom.com/intercom-api-reference/reference/searchconversations) where `created_at` is within the given date range and `open = true`

```JSON
{
  "query": {
    "field":"open",
    "operator": "=",
    "value":"true"
  },
  "pagination": {
    "per_page": 5
  }
}
```

### Snoozed conversations

[Search for conversations](https://developers.intercom.com/intercom-api-reference/reference/searchconversations) where `created_at` is within the given date range and `state = snoozed`

```JSON
{
  "query": {
    "field":"state",
    "operator": "=",
    "value":"closed"
  },
  "pagination": {
    "per_page": 5
  }
}
```

### Reopened conversations

[Search for conversations](https://developers.intercom.com/intercom-api-reference/reference/searchconversations) where `created_at` is within the given date range and `statistics.count_reopens > 0`

```JSON
{
  "query": {
    "field":"statistics.count_reopens",
    "operator": ">",
    "value":"0"
    },
  "pagination": {
    "per_page": 5
  }
  }
```

## Additional metrics

### Tagged conversations

List all tags and filter conversations by the `tag_id` attribute.

Single Tag Report

```JSON
{
  "query": {
    "field":"tag_ids",
    "operator": "=",
    "value":"7020308"
  },
  "pagination": {
    "per_page": 5
  }
}
```

Multiple Tag Report

```JSON
{
  "query": {
    "field":"tag_ids",
    "operator": "IN",
    "value":["7020308","7538295","6927004"]
  },
  "pagination": {
    "per_page": 5
  }
}
```

### AI Agent Conversations

You can use the [search](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/searchConversations/) or [list](https://developers.intercom.com/docs/references/preview/rest-api/api.intercom.io/Conversations/listConversations/) conversation APIs to get the fields required for generating Fin AI Agent reports. The following examples are for the search API.

#### Search by Delivered As

To get a total count of conversations where AI Agent was involved and the conversation was initiated by the agent, search for all conversations where `source.delivered_as = operator_initiated`. You can also specify `source.body` with the text of the agent message.

```JSON
{
  "query": {
    "operator": "AND",
    "value": [
      {
        "field": "source.delivered_as",
        "operator": "=",
        "value": "operator"
      },
      {
        "field": "source.body",
        "operator": "~",
        "value": "Body of first resolution bot response"
      }
    ]
  },
  "pagination": {
    "per_page": 5
  }
}
```

#### Search by AI Agent Participated

In the Preview version you can now search by when `ai_agent_participated` equals `true` to get conversations with AI Agent involvement.

Filter out preview sources
You can [preview and test Fin AI Agent](https://www.intercom.com/help/en/articles/7837514-add-your-support-content-for-fin-ai-agent#h_3bd76bb9da) in the Intercom UI. However, these instances should not be included in reports. The examples below filter out `fin_preview` and `workflow_preview`.

```JSON
{
  "query": {
    "operator": "AND",
    "value": [
      {
        "field": "ai_agent_participated",
        "operator": "=",
        "value": true
      },
      {
        "field": "ai_agent.source_type",
        "operator": "!=",
        "value": "fin_preview"
      },
      {
        "field": "ai_agent.source_type",
        "operator": "!=",
        "value": "workflow_preview"
      }
    ]
  },
  "pagination": {
    "per_page": 5
  }
}
```

#### Search by Customer Satisfaction Ratings

To replicate the results for [Fin AI Agent Customer Satisfaction (CSAT) reports](https://www.intercom.com/help/en/articles/8368157-fin-ai-agent-csat#h_5a60aad1c0) you can search by where the `ai_agent.rating` field exists. You can determine the CSAT rating by finding the percentage of conversations with a `4` or `5` rating out of all AI agent rated conversations.

```JSON
{
  "query": {
    "operator": "AND",
    "value": [
      {
        "field": "ai_agent_participated",
        "operator": "=",
        "value": true
      },
      {
        "field": "ai_agent.rating",
        "operator": "!=",
        "value": null
      }
    ]
  },
  "pagination": {
    "per_page": 5
  }
}
```