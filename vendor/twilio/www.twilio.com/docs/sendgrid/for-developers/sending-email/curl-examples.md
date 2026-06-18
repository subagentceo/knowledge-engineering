# cURL Examples for Common Use Cases

## Exploring cURL Examples for Seamless SendGrid Integration

To achieve effortless email integration with SendGrid through cURL, we've compiled a series of comprehensive examples that cover various use cases. Whether you're sending messages, multiple recipient emails, using templates, or scheduling emails, our cURL examples make the process a breeze.

Here's a cURL example to send a "Hello, World!" email through SendGrid's v3 Mail Send endpoint. Replace YOUR\_API\_KEY with your actual API key:

## Hello, World

```bash
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"personalizations": [{"to": [{"email": "recipient@example.com"}]}],"from": {"email": "sendeexampexample@example.com"},"subject": "Hello, World!","content": [{"type": "text/plain", "value": "Heya!"}]}'
```

## Sending a Basic Email to Multiple Recipients

For scenarios involving multiple recipients, our cURL example demonstrates how to send an email to multiple addresses:

```bash
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header 'authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"personalizations": [{"to": [{"email": "recipient@example.com"}],"cc": [{"email":"recipient2@example.com"}, {"email": "recipient3@example.com"}, {"email":"recipient4@example.com"}]}], "from": {"email": "sendeexampexample@example.com"},"subject":"Hello, World!", "content": [{"type": "text/plain", "value": "Heya!"}]}'
```

## Sending a Basic Email Using a Template

If you prefer to use templates for your emails, this cURL example shows you how to send an email using a template. Replace YOUR\_TEMPLATE\_ID with your actual template ID:

```bash
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header 'authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"personalizations": [{"to": [{"email": "recipient@example.com"}]}],"from": {"email": "sendeexampexample@example.com"},"subject":"Hello, World!","content": [{"type": "text/plain","value": "Heya!"}], "template_id" : "YOUR_TEMPLATE_ID"}'
```

## Sending a Basic Email with Attachment

Our cURL example demonstrates how to send an email with attachments, catering to scenarios where you need to include files with your emails:

```bash
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header 'authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"personalizations": [{"to": [{"email": "recipient@example.com"}]}],"from": {"email": "sender@example.com"},"subject":"Hello, World!","content": [{"type": "text/html","value": "Hey, Please find attachment."}], "attachments": [{"content": "BASE64_ENCODED_CONTENT", "type": "text/plain", "filename": "attachment.txt"}]}'
```

## Sending a Basic Email at a Scheduled Time

In cases where scheduling emails is necessary, our cURL example demonstrates how to send an email at a specified time. Replace UNIX\_TIMESTAMP\_HERE with your desired timestamp:

```bash
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header 'authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"personalizations": [{"to": [{"email": "recipient@example.com"}]}],"from": {"email": "sendeexampexample@example.com"},"subject":"Hello, World!","content": [{"type": "text/plain","value": "Heya!"}], "send_at" : UNIX_TIMESTAMP_HERE}'
```

## Scheduling and Cancelling an Email

To explore advanced scheduling and email cancellation, we provide step-by-step guidance. You can schedule an email for future delivery and even cancel it if necessary.

You may schedule an email to be sent up to 72 hours in the future by using the `send_at` parameter. You may cancel this same scheduled email by using the [Cancel Scheduled Sends endpoint](/docs/sendgrid/api-reference/cancel-scheduled-sends).

**Step 1: Generate a batch ID**

```bash
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/batch \
  --header 'authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
```

**Step 2: Schedule the email to be sent, using your new batch ID**

```bash
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header 'authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"personalizations": [{"to": [{"email": "recipient@example.com"}]}],"from": {"email": "sendeexampexample@example.com"},"subject":"Hello, World!","content": [{"type": "text/plain","value": "Heya!"}], "send_at" : UNIX_TIMESTAMP_HERE, "batch_id" : "YOUR_BATCH_ID"}'
```

**Step 3: Cancel the scheduled email**

```bash
curl --request POST \
  --url https://api.sendgrid.com/v3/user/scheduled_sends \
  --header 'authorization: Bearer YOUR_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"batch_id":"YOUR_BATCH_ID","status":"cancel"}'
```
