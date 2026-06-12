# Upgrade commitments

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Guides

Send feedback

# Upgrade commitments Stay organized with collections Save and categorize content based on your preferences.

You can upgrade 1-year commitments to convert them into 3-year commitments. When you upgrade a commitment, Compute Engine changes its plan from 1-year to 3-year, which lets you get a higher discount rate for your committed resources and continue receiving committed use discounts (CUDs) for a longer time period.

This document explains how commitment upgrades work and provides steps to upgrade your 1-year commitments to 3-year commitments.

## How commitment upgrades work

When you upgrade a 1-year commitment, Compute Engine changes its plan from 1-year to 3-year and moves the expiration date of its **ongoing term** (the term that is active when you request the upgrade) two years into the future. The upgrade becomes valid at 12 AM US and Canadian Pacific Time (UTC-8, or UTC-7 during daylight saving time) on the day following the upgrade operation, and you begin to receive the new CUD rate that is applicable for 3-year commitments.

Upgrading a commitment changes the term extension eligibility window for your commitment. After the upgrade takes effect, Compute Engine updates the eligibility window to remain open for up to one year from the start date of the ongoing term. When you upgrade a commitment, the following properties of the commitment don't change:

*   Name
*   Start date
*   Region
*   Project
*   Commitment type
*   Auto-renewal setting
*   Committed resources

The commitment upgrade process remains the same regardless of whether your commitment has a preset term length or a custom term length. Any attached reservations for your commitment continue to exist throughout the lifetime of your upgraded term, unless you manually replace them.

### Example of an upgraded commitment

The following table shows an example of a commitment (`commitment-1`) with a 1-year term. The commitment plan for the commitment is upgraded from 1-year to 3-year:

**Commitment property**

**Before upgrade**

**After upgrade**

Name

commitment-1

commitment-1

Type

N2

N2

Region

us-central1

us-central1

Project

example-project-1

example-project-1

Resources

*   vCPUs: 200

*   Memory: 200 GB

*   v Hs: 200

*   Memory: 200 GB

Plan

1-year

3-year

Start date*

January 1, 2020

January 1, 2020

End date†

January 1, 2021

January 1, 2023

Term extension eligibility window open until

May 1, 2020

January 1, 2021

Auto-renewal setting

Disabled

Disabled

*Commitment starts at 12 AM US and Canadian Pacific Time (UTC-8 or UTC-7) on the specified start date.  
†Commitment ends at 12 AM US and Canadian Pacific Time (UTC-8 or UTC-7) on the specified end date.

### Quota considerations

You don't typically need to request additional quota when you upgrade a commitment. However, if you upgrade a commitment on the same day that it expires, you must verify that you still have sufficient quota available. That's because on the day that a commitment expires, whatever quota the commitment was using up gets released back into your pool of available quota, and it might get used up by your other business needs.

### Pricing implications

Your commitment fee is the sum of the discounted prices of all your committed resources. When you upgrade a commitment, Compute Engine applies the new 3-year CUD rate and recalculates the discounted price for each committed resource. To do this recalculation, Compute Engine uses the prevailing on-demand price of each resource on the day your original term became active. This new discounted price for each resource stays the same until the end of your upgraded term, even if the on-demand prices change.

**Note:** If you merge or split your commitments, then the discounted prices for your committed resources might change on the day your merged or split commitments become active.

## Limitations

*   You can upgrade only active commitments.
*   You can't upgrade software license commitments.

## Upgrade a commitment

Upgrade a commitment by using the gcloud CLI, Google Cloud console, or REST.

**Note:** If you are using the gcloud CLI or REST to upgrade a commitment and also want to enable auto-renewal on that commitment, then you must do so using two separate operations. You can perform these two operations at the same time using the Google Cloud console, but on the gcloud CLI or REST, you must enable auto-renewal either before or after you upgrade the commitment.

#### Permissions required for this task

To perform this task, you must have the following permissions:

*   `compute.commitments.update` on the project or organization.

### Console

1.  In the Google Cloud console, select the project where you want to upgrade a commitment, and go to the **Committed use discounts** page.
    
    Go to Committed use discounts
    
2.  To initiate the upgrade operation for a commitment, select the commitment in the **Hardware commitments** tab of the **Commitment list** page and click event_available **Upgrade**.
    
3.  In the **Upgrade committed use discount** pane that appears, review the **New end time** of your modified commitment and click **Upgrade**.
    
4.  To finish the upgrade operation and return to the **Commitment list** page, in the **Upgrade your commitment?** dialog that appears, review the terms and conditions and then click **Upgrade**.
    

### gcloud

To upgrade a commitment, use the gcloud compute commitments update command with the `--plan` flag.

gcloud compute commitments update COMMITMENT_NAME \
    **--plan=36-month** \
    --region=REGION \
    --project=PROJECT_NAME

Replace the following:

*   `COMMITMENT_NAME`: the name of the commitment that you want to upgrade.
*   `REGION`: the region of the commitment that you want to upgrade.
*   `PROJECT_NAME`: the name of the project for which you want to upgrade the commitment.

For example, consider a commitment (`commitment-upgrade-example`) in the `us-central1` region. The commitment plan for the commitment is `12-month`. The following gcloud CLI command upgrades the commitment plan to `36-month`.

gcloud compute commitments update commitment-upgrade-example \
    --plan=36-month \
    --region=us-central1 \
    --project=project-upgrade-example

### REST

To upgrade a commitment, use the `regionCommitments.update` method.

PATCH https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/commitments/COMMITMENT_NAME
{
  "name": COMMITMENT_NAME,
  **"plan": "THIRTY_SIX_MONTH"**,
}

Replace the following:

*   `PROJECT_ID`: the project ID of the project where you want to upgrade a commitment.
*   `REGION`: the region of the commitment that you want to upgrade.
*   `COMMITMENT_NAME`: the name of the commitment that you want to upgrade.

For example, consider a commitment (`commitment-upgrade-example`) in the `us-central1` region. The commitment plan for the commitment is `TWELVE_MONTH`. The following request upgrades the commitment plan to `THIRTY_SIX_MONTH`.

PATCH https://compute.googleapis.com/compute/v1/projects/project-upgrade-example/regions/us-central1/commitments/commitment-upgrade-example
{
  "name": "commitment-upgrade-example",
  "plan": "THIRTY_SIX_MONTH",
}

## What's next

*   Learn how to analyze the effectiveness of your CUDs.
*   Learn how to renew commitments automatically.
*   Learn how to extend the term length of resource-based commitments.
*   Learn how to merge and split resource-based commitments.

Send feedback