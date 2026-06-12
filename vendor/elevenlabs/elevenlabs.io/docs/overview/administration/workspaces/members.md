> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Members

ElevenLabs workspaces use a seat-based model. Every member in a workspace occupies one seat, and the seat type they hold determines what they can access and how credits are consumed.

There are two seat types available in ElevenLabs workspaces:

* **Full Seats** — full access to all ElevenLabs products, including ElevenCreative, ElevenAgents, and ElevenAPI.
* **Basic Seats** — designed for members who primarily work with ElevenAgents or ElevenAPI, with limited access to ElevenCreative.

Workspace admins can assign, change, and manage seat types at any time from Settings → [Members](https://elevenlabs.io/app/workspace/members).

Admin is a role within your workspace, which gives enhanced permissions such as adding and
removing members, setting permissions, and managing the workspace subscription. Admins always
occupy a Full Seat.

## Seat types & included allocations by plan

Your workspace has two separate limits that work together:

* **Full Seat limit** — the maximum number of Full Seats your plan allows. Once this is reached, you cannot add more Full Seat users. Enterprise customers can purchase additional seats, or you can free up Full Seats by moving Full Seat members to Basic Seats, or lock workspace members to free up their seats.

* **Basic Seat limit** — the maximum number Basic Seats your workspace can hold. If you are using fewer Full Seats than your plan allows, those unused Full Seat slots can also be filled by Basic Seat users. This means that you can have more Basic Seats than your allocation, as long as you have Full Seats available.

Once the total limit is reached, no new members of any type can be added without purchasing more seats, or unless existing workspace members are locked by a workspace admin.

The number of Full Seats and Basic Seats included depends on your subscription:

| Plan              | Included Full Seats | Included Basic Seats   |
| ----------------- | ------------------- | ---------------------- |
| Free              | 1                   | 20                     |
| PAYG              | 1                   | 20                     |
| Starter           | 1                   | 20                     |
| Creator           | 1                   | 20                     |
| Pro               | 1                   | 20                     |
| Scale             | 3                   | 20                     |
| Business          | 10                  | 20                     |
| Business (Legacy) | 5                   | 20                     |
| Enterprise        | 11 (negotiable)     | 1,000 (see note below) |

Enterprise Basic Seat counts are defined in your contract and may vary — the 1,000 figure is a
soft cap. Enterprise Basic Seats are effectively unlimited within your contract terms.

## Full Seats

Full Seats provide unrestricted access to all ElevenLabs products and features within a workspace.

### What Full Seat users can do

* Access and generate content in ElevenCreative without a monthly credit ceiling, subject to the workspace's shared credit pool
* Build, deploy, and manage agents via ElevenAgents
* Create personal API keys and access the ElevenAPI for programmatic workflows
* View and use all shared workspace assets — voices, projects, files, and agents

### Credit usage

Full Seat users draw from the workspace's shared credit pool with no individual monthly ceiling with the ability for admins to create billing groups with specific limits per group. Usage resets in line with the workspace's billing cycle.

For Enterprise customers, purchasing additional Full Seats increases the available usage for your workspace — the cost of each additional seat is added to your monthly commitment and unlocks the equivalent amount in usage for the whole workspace.

### Pricing

Additional seats are not available for standard subscription plans. Enterprise customers can contact their account manager for information about purchasing additional Full Seats.

## Basic Seats

Basic Seats are designed for team members who primarily work with ElevenAgents and ElevenAPI, or who only need limited access to ElevenCreative.

With Basic Seats, workspace admins can expand their team without giving everyone full access to ElevenCreative, keeping costs manageable and permissions organized.

### What Basic Seat users can do

* Use ElevenAgents — draws from the workspace's shared credit pool with no individual ceiling
* Use the ElevenAPI — draws from the workspace's shared credit pool with no individual ceiling
* View and browse all shared workspace assets — voices, projects, files, and agents
* Generate content in ElevenCreative up to a 50,000 credit monthly ceiling (\$5 for Enterprise customers), drawn from the workspace's shared credit pool — view access is always retained even after hitting the limit

### Credit usage

Every user in a workspace draws from the same shared credit pool — Basic Seat users do not receive their own credit allocation. The 50,000 credit figure (\$5 for Enterprise customers) is a per-user ceiling on how much of that shared pool each Basic Seat user can consume through ElevenCreative in a billing period. It is not additional capacity added on top of your plan.

For example, if your workspace plan includes 100,000 credits, that is the total available to all members. A Basic Seat user can use at most 50,000 of those credits in ElevenCreative — they do not receive an additional 50,000 credits. If the shared pool runs out before a Basic Seat user hits their ceiling, they will not be able to generate content.

* ElevenAgents usage draws from the workspace's shared credit pool with no individual ceiling: this does not count toward the 50,000 credit limit
* ElevenAPI usage also draws from the shared pool with no individual ceiling: this does not count toward the 50,000 credit limit
* ElevenCreative generation is subject to a 50,000 credit per-user monthly ceiling (\$5 for Enterprise customers), drawn from the workspace's shared pool
* Credits reset monthly in line with the workspace's billing cycle
* If a Basic Seat user reaches their 50,000 credit ceiling, they will no longer be able to generate content on ElevenCreative for the remainder of that billing period but retain view and browse access, and their access to ElevenAgents and ElevenAPI is unaffected
* If the shared workspace pool is exhausted, Basic Seat users cannot generate content even if they have not reached their individual 50,000 credit ceiling
* If a Full Seat user downgrades to a Basic Seat, credits used while they were a Full Seat user are counted towards the 50,000 credit ceiling

50,000 credits can be consumed quickly with regular ElevenCreative use. If a team member needs
more creative access, consider upgrading them to a Full Seat.

## Managing seats

Workspace admins can assign and manage seat types from Settings → [Members](https://elevenlabs.io/app/workspace/members).

### Assigning a seat type

### Navigate to Settings → Members

### Find the team member you want to update

### Select their current seat type from the dropdown and change it to Basic or Full

### Inviting new members

When inviting new users to your workspace, you can select their seat type during the invite flow.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/7f526bee02bc0530073df4473b8319f3ed59c3e284b9ca019799c2b2a8c4c70b/assets/images/product-guides/administration/members-invite-new.webp" alt="Inviting a new member to workspace" />

### Adding more seats

* **Basic Seats (Enterprise)**: Enterprise workspaces can add Basic Seats up to the limit defined in your contract. To request additional Basic Seats beyond your allocation, contact your account manager.
* **Full Seats (Enterprise)**: Enterprise workspaces can add additional Full Seats. Additional seats can be added from Workspace settings > [General](https://elevenlabs.io/app/workspace) using **Add More Seats**. Contact your account manager for pricing information.
* **Standard subscription plans**: It is not possible to purchase additional seats.

## FAQ

Full Seats provide unrestricted access to all ElevenLabs products, including unlimited ElevenCreative usage (subject to the workspace credit pool), and the ability to create personal API keys.

Basic Seats are designed for users primarily working with ElevenAgents or ElevenAPI — ElevenCreative generation is capped at a 50,000 credit monthly ceiling (\$5 for Enterprise customers) per user, drawn from the shared workspace pool. This is a ceiling on consumption, not a separate allocation.

No. The 50,000 credit ceiling applies to ElevenCreative usage only. ElevenAgents and ElevenAPI usage draws freely from the workspace's shared credit pool with no individual ceiling.

They will not be able to generate new content in ElevenCreative for the remainder of the billing period. Their access to ElevenAgents and ElevenAPI is unaffected. Their workspace admin can upgrade them to a Full Seat if they need more creative access.

Yes. Admins can upgrade or downgrade any seat type at any time from the Members settings page.

Only workspace admins can assign and change seat types.

See the Seat Types & Included Allocations by Plan table above. All plans now include 20 Basic Seats. Full Seat allocations vary by plan tier.

Enterprise customers can purchase additional Full Seats. Contact your account manager for pricing information. It's not possible to purchase additional seats for standard subscription plans.