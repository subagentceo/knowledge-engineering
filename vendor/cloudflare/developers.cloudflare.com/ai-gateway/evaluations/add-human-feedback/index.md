---
title: Add Human Feedback using Dashboard
description: Annotate AI Gateway logs with thumbs-up or thumbs-down feedback in the Cloudflare dashboard.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add Human Feedback using Dashboard

Human feedback is a valuable metric to assess the performance of your AI models. By incorporating human feedback, you can gain deeper insights into how the model's responses are perceived and how well it performs from a user-centric perspective. This feedback can then be used in evaluations to calculate performance metrics, driving optimization and ultimately enhancing the reliability, accuracy, and efficiency of your AI application.

Human feedback measures the performance of your dataset based on direct human input. The metric is calculated as the percentage of positive feedback (thumbs up) given on logs, which are annotated in the Logs tab of the Cloudflare dashboard. This feedback helps refine model performance by considering real-world evaluations of its output.

This tutorial will guide you through the process of adding human feedback to your evaluations in AI Gateway using the Cloudflare dashboard.

On the next guide, you can [learn how to add human feedback via the API](https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback-api/).

## 1\. Log in to the dashboard

In the Cloudflare dashboard, go to the **AI Gateway** page.

[ Go to **AI Gateway** ](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway) 

## 2\. Access the Logs tab

1. Go to **Logs**.
2. The Logs tab displays all logs associated with your datasets. These logs show key information, including:  
   * Timestamp: When the interaction occurred.  
   * Status: Whether the request was successful, cached, or failed.  
   * Model: The model used in the request.  
   * Tokens: The number of tokens consumed by the response.  
   * Cost: The cost based on token usage.  
   * Duration: The time taken to complete the response.  
   * Feedback: Where you can provide human feedback on each log.

## 3\. Provide human feedback

1. Click on the log entry you want to review. This expands the log, allowing you to see more detailed information.
2. In the expanded log, you can view additional details such as:  
   * The user prompt.  
   * The model response.  
   * HTTP response details.  
   * Endpoint information.
3. You will see two icons:  
   * Thumbs up: Indicates positive feedback.  
   * Thumbs down: Indicates negative feedback.
4. Click either the thumbs up or thumbs down icon based on how you rate the model response for that particular log entry.

## 4\. Evaluate human feedback

After providing feedback on your logs, it becomes a part of the evaluation process.

When you run an evaluation (as outlined in the [Set Up Evaluations](https://developers.cloudflare.com/ai-gateway/evaluations/set-up-evaluations/) guide), the human feedback metric will be calculated based on the percentage of logs that received thumbs-up feedback.

Note

You need to select human feedback as an evaluator to receive its metrics.

## 5\. Review results

After running the evaluation, review the results on the Evaluations tab. You will be able to see the performance of the model based on cost, speed, and now human feedback, represented as the percentage of positive feedback (thumbs up).

The human feedback score is displayed as a percentage, showing the distribution of positively rated responses from the database.

For more information on running evaluations, refer to the documentation [Set Up Evaluations](https://developers.cloudflare.com/ai-gateway/evaluations/set-up-evaluations/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback/#page","headline":"Add Human Feedback using Dashboard · Cloudflare AI Gateway docs","description":"Annotate AI Gateway logs with thumbs-up or thumbs-down feedback in the Cloudflare dashboard.","url":"https://developers.cloudflare.com/ai-gateway/evaluations/add-human-feedback/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/evaluations/","name":"Evaluations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/evaluations/add-human-feedback/","name":"Add Human Feedback using Dashboard"}}]}
```
