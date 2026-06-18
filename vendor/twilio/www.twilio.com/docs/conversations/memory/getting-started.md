# Getting started with Conversation Memory

To use Conversation Memory, you'll need to provide Twilio access to your Twilio Conversations.

Twilio Conversations turns messaging (SMS, RCS, and WhatsApp) and Voice traffic into normalized conversations with participants, communications, and identity built in. Conversation Memory creates a profile for each participant, extracts text snippets, and saves them to the profile to personalize future conversations.

## Getting started

To get started with Conversation Memory:

1. [Set up a memory store](#set-up-your-memory-store)
2. [Set up a conversation configuration](#set-up-a-conversation-configuration)
3. Optional: [Add user data to your memory store](#optional-add-user-data-to-your-memory-store)

### Set up your memory store

A memory store is a container for customer profiles. Each profile contains:

* **Conversational Memory**: Contextual text snippets captured from conversations with your customer.
* **Factual Memory**: Facts about a profile, including identifiers, traits, and events.

You can create more than one memory store per account to separate profiles as needed.

To create a memory store:

1. In the Console, go to **Products & services** > **Conversation Memory** > **Overview**.
2. If you haven't already done so, click **Upgrade your account for full access**, then click **Upgrade account**.
3. Click **Get started**.
4. Twilio creates and names your memory store. To edit this name, go to **Settings** > **Edit settings**, update your memory store name and description, and click **Save**.

> \[!WARNING]
>
> If your Twilio account has multiple memory stores (for example, to separate sandbox from production data), you might encounter duplicate profiles for a customer. There is no way to reconcile profile data across memory stores.

For detailed guidance on when to create multiple memory stores versus when to reuse a single store, including architecture patterns and use case examples, see [Memory stores](/docs/conversations/memory/memory-stores).

### Set up a conversation configuration

From the Conversation Memory overview page, set up a conversation configuration. This step is optional but recommended — it allows Twilio to use conversations data to create and update customer profiles.

Conversation configurations define the data types used to create customer profiles, store conversations, and resolve interaction data into profiles.

To set up conversation configurations:

1. From the Overview page (**Conversation Memory** > **Overview**) click **Set up Twilio Conversations**.
2. Add a conversation configuration friendly name and description.
3. On the **Configure lifecycle** page, configure your default lifecycle and conversation timeout.

* **Basic**: Conversations move from **Open** to **Closed**.
* **Include "inactive" state**: Conversations move from **Open** to **Inactive** (no active streaming data, but can be reopened) to **Closed**.
* Conversation timeout is how long after the last customer communication the conversation moves to **Closed**. Conversation Memory only creates new observations from **Inactive** or **Closed** conversations. If you don't set a timeout, Twilio applies the [default conversation timeouts](#default-conversation-timeouts).

4. Select [phone numbers](https://www.twilio.com/console/phone-numbers/search) to capture communications traffic from, then click **Create conversation configuration**.
5. To enable [Observations](/docs/conversations/memory/key-terms#observations), select the **Turn on observations and summaries** checkbox. This automatically extracts observations and summaries from Twilio Conversations.

* You can turn Observations on or off at any time. Go to **Data sources**, select your conversation configuration, and click **Edit**.

6. From the **Summary** screen, review your settings, then click **Create Conversation Configuration**.

After setup, go to **Products & services** > **Conversation Orchestrator** > **Conversation Configurations** to view and manage your configurations.

#### Default conversation timeouts

If you set up one conversation channel, Twilio applies the default for that channel. If you set up two or more conversation channels, Twilio applies the longest conversation timeout to all channels.

| Conversation channel         | Default timeout |
| ---------------------------- | --------------- |
| [Voice](/docs/voice)         | On hang up      |
| [Messaging](/docs/messaging) | 15 minutes      |
| [WhatsApp](/docs/whatsapp)   | 15 minutes      |

## Using traits with Conversation Memory

Traits are structured facts about a customer (for example, name, location, subscription status, or tier) that appear as fields on their profile. You can organize traits into [trait groups](#create-a-trait-group) for consistency.

Configure traits and trait groups from the **Traits** tab or the onboarding wizard's **Configure traits and identifiers** option.

Use the **Traits** tab for the following actions:

* Add trait groups
* Add traits
* Delete trait groups and traits

### Create a trait group

Trait groups organize similar traits into a single object, making it easier for agents to consistently reference information across customer interactions.

Trait groups include one default group, Contact, which contains first name, last name, phone number, and address. You can create additional groups for other customer attributes like preferences, behaviors, or interests.

> \[!WARNING]
>
> You can't move a trait from one trait group to another. Carefully consider trait categorization before assigning a trait to a trait group.

To add a trait to an existing trait group:

1. In the Console, go to **Products & services** > **Conversation Memory** > **Settings**.
2. Select **Traits**, identify the trait group you'd like to update, and click **+ Add trait**.
3. On the **Add trait** side sheet, enter a name for your trait, select a data type, and enter a brief description.
4. When you're finished, click **Save**.

On the Traits page of the Conversation Memory settings, you can create trait groups by selecting **+ Add trait group**. You can delete trait groups by selecting **Delete trait group** under the trait group's header.

### Add a trait

To add traits to a trait group:

1. In Conversation Memory go to **Traits** and select the trait group you'd like to add traits to.
2. Select **+ Add Trait**.
3. Add a unique name for the trait.
4. Select a data type (string, number, boolean, or array).
5. Add a description for the trait.
6. Click **Save**.

You can also delete a trait field from a group by selecting the **more actions (ellipsis)** and selecting **Delete trait field**.

## Using identifiers with Conversation Memory

Identifiers are unique pieces of customer data, such as email addresses, phone numbers, or user IDs. Conversation Memory uses identifiers to match events and data to individual customers.

You can configure identifiers by clicking **Configure traits and identifiers** in the onboarding wizard or by selecting the **Identifiers** tab to add identity rules, edit priority rankings, and delete rules.

### Default Identity Resolution rules

Note the following default Identity Resolution rules for Conversation Memory:

* `phone`
* `email`
* `whatsappid`
* `chat`

You can also create custom ID rules such as `user_id` or other fields.

Learn more about [Identity Resolution](/docs/conversations/memory/key-terms#identity-resolution) in Conversation Memory.

### Add Identity Resolution rules

[Identity rules](/docs/conversations/memory/key-terms#identity-rules) are the logic that determines how identifiers are used to create, match, and merge profiles.

To add Identity Resolution rules:

1. In your memory store, select **Identifiers**.
2. Click **Add identity rule**.
3. Define your Identity Resolution rules. You can define Identity Resolution rules in one of two ways:
   * **With the API**: Create a rule and send identifier values directly with the API. Use this method when the identifier does not exist as a stored trait/field in your memory store.
   * **Mapping Traits**: Select an existing trait from the **Select traits** drop down menu or create a new one from the traits settings page. When you're finished defining your rules, click **Next**.
4. Rank the [priority](/docs/conversations/memory/key-terms) of your identifiers then click **Next**. New rules are added lowest priority by default.
5. Confirm your Identity Resolution rules and priority rankings, then click **Create rule**.

### Edit priority rankings

Identifier resolution priority determines the search order and conflict resolution when an incoming event (like a message) matches multiple identifiers.

To edit Identity Resolution priority rankings:

1. Click **Edit priority** from the Identifiers tab.
2. From the side modal, you can select or drag and drop identifiers based on your preferred priority.
3. Click **Save**.

### Edit or delete identifier rules

You can use the **Identifiers** tab to edit or delete Identifier rules.

To edit identifier rules:

1. Under **Actions** click the **more actions (ellipsis)** and select **Edit rule**.
2. On the **Edit identity rule** screen edit your name, limit, map additional traits, and edit priority rankings.
3. Click **Save changes**.

To delete identifier rules:

1. Under **Actions** click the **more actions (ellipsis)** and select **Delete rule**.
2. Confirm by selecting **Delete rule**. Note that deleting an identity rule means that traits associated with it will no longer be used to merge and match profiles. This change does not affect historical merges.

### Optional: Add user data to your memory store

Once you've set up a memory store and a conversation configuration, you can upload a CSV file to add or update user profiles and traits.

To upload a CSV file:

1. In the Console, go to **Products & services** > **Conversation Memory** > **\[Your Memory Store]** > **+ Add profiles**.
2. On the *Select a CSV* page, select a CSV file to import and click **Next**.
   You can use the provided [CSV template](https://docs-resources.prod.twilio.com/documents/profile-template.csv) to ensure your CSV is formatted correctly.
3. On the *Map CSV columns* page, you can decide if you want to import the data in each CSV column. For the columns you want to import, you can map your data to existing trait groups and traits.
4. When you've finished mapping your CSV data to trait groups and traits, click **Complete**.

#### CSV file upload guidelines

When uploading CSV files:

* You can only upload CSV files.
* Upload one CSV file at a time.
* Each file can have up to 1,000,000 rows.
* Each file can have up to 100 columns.
* Your data must include at least one of the default identifiers (`phone`, `email`, or `whatsappid`). You must include both an identifier column and a value for each row.
* Files can't be empty and must include at least two trait columns.
* You can't have multiple columns with the same header.
* Your CSV file can't include traits with trailing, leading, or multiple consecutive spaces between characters, or unallowed characters.

> \[!WARNING]
>
> The following applies to empty cells and special values:
>
> * Empty cells (both completely empty and `""`) overwrite existing trait values with an empty string. For example, if a profile has `firstName = "ExampleName"`, an empty cell in the firstName column changes it to `firstName = ""`.
> * The `\N` value deletes traits completely from the profile. For example, if a profile has `firstName = "ExampleName"`, entering `\N` in the firstName column removes the firstName trait from the profile entirely.

##### Allowed characters

You can use these characters in your CSV file:

* Alphabetic English characters in both upper and lower case
* The numerals 0-9
* These special characters:
  ```text
  !@#$%^&*()_+-=[]{}:\\|.\`~<>\/?
  ```
* The following non-English characters:
  ```text
  àáâäǎæãåāçćčċďðḍèéêëěẽēėęğġgg͟hħḥh̤ìíîïǐĩīıįķk͟hłļľl̥ṁm̐òóôöǒœøõōřṛr̥ɽßşșśšṣs̤s̱sțťþṭt̤ʈùúûüǔũūűůŵýŷÿźžżẓz̤ÀÁ
  ÄǍÆÃÅĀÇĆČĊĎÐḌÈÉÊËĚẼĒĖĘĞĠGG͟HĦḤH̤ÌÍÎÏǏĨĪIĮĶK͟HŁĻĽL̥ṀM̐ÒÓÔÖǑŒØÕŌŘṚR̥ɌSẞŚŠŞȘṢS̤S̱ȚŤÞṬT̤ƮÙÚÛÜǓŨŪŰŮŴÝŶŸŹŽŻẒZ
  ```

#### Map CSV columns

To import your profile data, you'll [add traits and groups in Conversation Memory](#create-a-trait-group), then map each column in your CSV to a customer profile trait.

To map customer data to a trait, select the trait group and trait you'd like to map to the column.

> \[!WARNING]
>
> You can't move a trait from one trait group to another. Carefully consider trait categorization before assigning a trait to a trait group.

If you don't want to import a specific column, you can leave it unmapped or deselect its *Import?* toggle.

#### Errors

After you upload a CSV, Twilio returns a status of `Completed` or `Failed`.

`Completed` files were successfully ingested into Conversation Memory.

> \[!NOTE]
>
> Twilio shows `Completed` status both for files where all of the rows were successfully ingested and for files that contained fewer than 100 rows that failed on ingestion.

`Failed` files weren't ingested into Conversation Memory because there was either an internal server error or Twilio was unable to ingest more than 100 rows in your file.

To view more details about an uploaded file, go to **Products & services** > **Conversation Memory** > **Data sources** > **CSV Upload** and select the file.
