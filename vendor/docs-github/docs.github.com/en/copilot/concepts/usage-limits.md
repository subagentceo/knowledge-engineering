# Usage limits for GitHub Copilot

Learn about GitHub Copilot usage limits and what to do if you hit a limit.

Rate limiting is a mechanism used to control the number of requests a user or application can make in a given time period. GitHub uses rate limits to ensure everyone has fair access to GitHub Copilot and to protect against abuse.

## Why does GitHub use rate limits?

GitHub enforces rate limits for several reasons.

* **Capacity:** There is a limited amount of computing power available to serve all Copilot users. Rate limiting helps prevent the system from being overloaded.
* **High usage:** Popular features and models may receive bursts of requests. Rate limits ensure no single user or group can monopolize these resources.
* **Fairness:** Rate limits ensure that all users have equitable access to Copilot.
* **Abuse mitigation:** Without rate limits, malicious actors could exploit Copilot, leading to degraded service for everyone or even denial of service.

## Types of usage limits

GitHub Copilot has two limits: a **session** and a **weekly (7-day) limit**.

* **Session limit.** If you hit the session limit, you must wait until it resets before you can resume using Copilot.
* **Weekly limit.** This limit caps the total number of tokens you can consume during a 7-day period. If you hit a weekly limit and you have premium requests remaining, you can continue using Copilot with Auto model selection. Model choice will be re-enabled when the weekly period resets.

## What you will see when approaching a limit

VS Code and GitHub Copilot CLI both display a warning when you are approaching a limit. These indicators are designed to help you avoid hitting a limit unexpectedly.

## What to do if you approach a limit

If you are approaching a limit, the following steps can help reduce the chances of hitting it.

* **Use a model with a smaller multiplier for simpler tasks.** The larger the multiplier, the faster you will reach the limit.
* **Use plan mode.** In VS Code and Copilot CLI, plan mode can improve task efficiency and task success, reducing overall token consumption.
* **Reduce parallel workflows.** Parallelized tools result in higher token consumption. Use them sparingly if you are nearing your limits.
* **Upgrade your plan.** If you are on a Copilot Pro plan, upgrading to Copilot Pro+ provides significantly higher usage limits.

## What to do if you hit a limit

If you receive a usage limit error when using Copilot, you should:

* **Wait until your limit time resets.** 
* **Switch to Copilot auto model selection.** If you hit a **weekly** usage limit, you can continue using Copilot with Auto model selection until exhausting your premium requests.
* **Upgrade your plan.** If you are on an individual Copilot plan, upgrading your plan will allow for additional usage. 
* **Contact Support.** If you repeatedly hit usage limits and believe it’s impacting legitimate use, contact [GitHub Support](https://support.github.com) for assistance.