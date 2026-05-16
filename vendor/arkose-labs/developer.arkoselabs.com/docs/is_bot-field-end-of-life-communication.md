# is_bot Field End Of Life Communication

## Why is this change happening?

We are deprecating the `is_bot` field from Verify API response, effective from May 13, 2025. This decision has been made after careful consideration and is aimed at enhancing the accuracy and reliability of the data provided to you.

## Reasons for Deprecation:

1. **Non-Originating Source**: The `is_bot` is gathered from external intelligence and is not related to the bot intelligence detection done by the Arkose protection platform. This has led to inconsistencies in how the data is generated and interpreted, which can affect the overall quality of the insights you receive.
2. **Customer Feedback**: We have received feedback from many of our users expressing confusion regarding the efficacy of this field.
3. **Misleading Information**: The `is_bot` can be misleading due to the inherent nature of IP intelligence. IP addresses, particularly those associated with low-cost ISPs, are often recycled. This results in a significant number of trailing false positives, as the field may inaccurately flag used and discarded IPs. Relying on this field could therefore lead to suboptimal outcomes.

## What do I need to do?

* **Action Required:** We recommend that you review your current use of the is\_bot and begin transitioning to alternative data points. One data point that can be used is `session_risk` which contains `risk_category` to identify threats detected during a session (e.g., standard bot, advanced bot, fraud farm, custom).  Our team is available to assist you to ensure a smooth transition.
* **Timeline:** The `is_bot` will be fully deprecated by May 13, 2025. After this date, the field will no longer be available or supported within our platform.

We at Arkose Labs are committed to supporting you through this transition. If you have any questions or need further assistance, please do not hesitate to contact your Customer Success Manager.

**If we do not hear back, we'll proceed with the deprecation as per the scheduled dates.**