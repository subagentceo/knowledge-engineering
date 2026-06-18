# Stop sending unwanted email

Suppressions prevent the sending of email messages to recipients that rejected your prior email messages. Either an inbox provider or a recipient can trigger a suppression. These conditions include:

* When an inbox provider [blocks][] or [bounces][] an email message or marks an email address as [invalid][].
* When a recipient files a [spam report][] or [unsubscribes][] from your email list.

## Blocks

A *block* temporarily rejects email messages sent from your sending IP address.

* To reduce the number of email addresses in the list, you can search for an email address or apply a filter.
  * To find an email address, type the address you want in the **Search** box and press **Enter**.
  * To filter the email addresses in the list:
    1. Click **Add Filters**.
    2. Click **Date Range**. The **Date Range** dropdown menu appears.
    3. From the **Date Range** dropdown menu, choose the desired time range:
       * **Last 3 Days**
       * **Last 7 Days**
       * **Last 30 Days**
       * **Custom Range**. If you select **Custom Range**, set the **Start date** and **End date**.
    4. Click **Apply**.
* To remove all blocked email addresses displayed, click **Delete all**.
* To export a list of all blocked email addresses displayed, click **Export all**. The list of blocks includes:

| Email                 | Date                          | Reason                      |
| --------------------- | ----------------------------- | --------------------------- |
| Blocked email address | When this address got blocked | Why the address got blocked |

If no email addresses have been blocked, **No blocks yet** displays instead of a list of addresses.

## Bounces

A *bounce* permanently rejects emails messages sent from your sending IP address.

* To reduce the number of email addresses in the list, you can search for an email address or apply a filter.
  * To find an email address, type the address you want in the **Search** box and press **Enter**.
  * To filter the email addresses in the list:
    1. Click **Add Filters**.
    2. Click **Date Range**. The **Date Range** dropdown menu appears.
    3. From the **Date Range** dropdown menu, choose the desired time range:
       * **Last 3 Days**
       * **Last 7 Days**
       * **Last 30 Days**
       * **Custom Range**. If you select **Custom Range**, set the **Start date** and **End date**.
    4. Click **Apply**.
* To remove all bounced email addresses displayed, click **Delete all**.
* To export a list of all bounced email addresses displayed, click **Export all**.

The list of bounces includes:

| Email                 | Date                          | Reason                      |
| --------------------- | ----------------------------- | --------------------------- |
| Bounced email address | When this address got bounced | Why the address got bounced |

If no email addresses have been bounced, **No bounces yet** displays instead of a list of addresses.

## Global Unsubscribes

A *global unsubscribe* represents a recipient's voluntary decision to remove themself from all email messages sent from the sender's bulk email service.

* To reduce the number of email addresses in the list, you can search for an email address or apply a filter.
  * To find an email address, type the address you want in the **Search** box and press **Enter**.
  * To filter the email addresses in the list:
    1. Click **Add Filters**.
    2. Click **Date Range**. The **Date Range** dropdown menu appears.
    3. From the **Date Range** dropdown menu, choose the desired time range:
       * **Last 3 Days**
       * **Last 7 Days**
       * **Last 30 Days**
       * **Custom Range**. If you select **Custom Range**, set the **Start date** and **End date**.
    4. Click **Apply**.
* To remove all unsubscribed email addresses displayed, click **︙**, then **Delete all**.
* To export a list of all unsubscribed email addresses displayed, click **Export all**.
* To unsubscribe email addresses from all of your email lists, click **Add global unsubscribes**. The **Add global unsubscribes** panel appears.
  1. Type email addresses you want unsubscribed in the **Email Addresses** box.
     * You can add up to 500 addresses at a time.
     * Separate addresses with commas or new lines.
  2. Choose to add or ignore these email addresses:
     * To add these email addresses, click **Add**.
     * To close this panel without adding any addresses, click **Cancel**. The list of unsubscribes includes:

The list of unsubscribes include:

| Email                      | Date                                     |
| -------------------------- | ---------------------------------------- |
| Unsubscribed email address | When recipient unsubscribed this address |

If no email addresses have been blocked, **No global unsubscribes yet** displays instead of a list of addresses.

## Invalid Emails

An *invalid email address* doesn't conform to the [Internet Engineering Task Force (IETF)][IETF] [email address syntax standards][invalid].

* To reduce the number of email addresses in the list, you can search for an email address or apply a filter.
  * To find an email address, type the address you want in the **Search** box and press **Enter**.
  * To filter the email addresses in the list:
    1. Click **Add Filters**.
    2. Click **Date Range**. The **Date Range** dropdown menu appears.
    3. From the **Date Range** dropdown menu, choose the desired time range:
       * **Last 3 Days**
       * **Last 7 Days**
       * **Last 30 Days**
       * **Custom Range**. If you select **Custom Range**, set the **Start date** and **End date**.
    4. Click **Apply**.
* To remove all invalid email addresses displayed, click **Delete all**.
* To export a list of all invalid email addresses displayed, click **Export all**.

The list of invalid email includes:

| Email                     | Date                              | Reason                          |
| ------------------------- | --------------------------------- | ------------------------------- |
| Invalidated email address | When this address got invalidated | Why the address got invalidated |

If no email addresses have been invalidated, **No invalid emails yet** displays instead of a list of addresses.

## Spam Reports

The mechanism that identifies email messages as abusing the transmission medium. *Spam reports* get sent to an authority for remediation.

* To reduce the number of email addresses in the list, you can search for an email address or apply a filter.
  * To find an email address, type the address you want in the **Search** box and press **Enter**.
  * To filter the email addresses in the list:
    1. Click **Add Filters**.
    2. Click **Date Range**. The **Date Range** dropdown menu appears.
    3. From the **Date Range** dropdown menu, choose the desired time range:
       * **Last 3 Days**
       * **Last 7 Days**
       * **Last 30 Days**
       * **Custom Range**. If you select **Custom Range**, set the **Start date** and **End date**.
    4. Click **Apply**.
* To remove all spam reports displayed, click **Delete all**.
* To export a list of all spam reports displayed, click **Export all**.

The list of spam reports includes:

| Email                  | Date                           |
| ---------------------- | ------------------------------ |
| Reported email address | When this address got reported |

If no email addresses have been marked as spam, **No spam reports yet** displays instead of a list of addresses.

[blocks]: /docs/glossary/blocks

[bounces]: /docs/glossary/bounces

[spam report]: /docs/glossary/spam-reports

[invalid]: /docs/glossary/invalid-email

[unsubscribes]: /docs/glossary/unsubscribes

[IETF]: https://www.ietf.org
