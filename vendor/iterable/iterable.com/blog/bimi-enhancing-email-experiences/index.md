# BIMI: Enhancing Email Experiences - Iterable

## BIMI: Enhancing Email Experiences

**Published by**

July 17, 2023

![Iterable light blue background with lighter blue top right and bottom left corners. An illustration of an inbox sits in the center with a small yellow email envelop sitting on the right side of the illustration with a red notification bubble.](https://iterable.com/wp-content/uploads/2026/04/071723_Deliverability-Pt1_Blog-header.png)

In the vast landscape of email communication, standing out from the crowd can be quite the challenge. This channel continues to be vital for connecting individuals and brands worldwide. With the rise of phishing attacks and email impersonation, the credibility of email has been called into question.

But fear not, this is where Brand Indicators for Message Identification (BIMI) comes into play. BIMI (pronounced Bih-mee) is an email specification developed by the AuthIndicators Working Group—a collective effort of industry leaders. AuthIndicator Group’s primary goal is to combat email fraud, phishing, and email impersonation by providing visual cues to users that an email is legitimate and sent from a trusted source. It’s supported by an ever growing list of mail clients.

BIMI has emerged as a new standard that allows organizations to display their brand logos alongside authenticated emails, thereby improving email security and establishing trust with recipients. In this article, we will explore what BIMI is, how it works for email, and how someone can implement BIMI to enhance their email communications.

### What is BIMI?

Imagine you’re attending an event where security is of utmost importance. To ensure the authenticity and legitimacy of the attendees, a strict verification process is in place. This process involves two crucial elements: identity verification and personalized badges.

BIMI can be likened to the personalized badges provided to event attendees. These badges serve two purposes: identification and trust.

1.  **Identification**: Just like personalized badges displaying an attendee’s name and affiliation, BIMI enables email clients to display the sender’s brand logo in the recipient’s inbox. This identification helps recipients quickly recognize and associate emails with brands.
2.  **Trust**: The personalized badges at the event serve as an indicator of trustworthiness. When recipients see a brand logo displayed through BIMI, it signifies that the email has passed through an authentication process, ensuring its legitimacy. This builds trust between the brand and the recipient, making it easier to discern genuine messages from potential phishing or spoofed emails.

By implementing BIMI, email senders can establish a visual indicator of trust. This way, recipients can have increased confidence in the legitimacy of the emails they receive, mitigating the risk of falling victim to scams or fraudulent activities.

#### How Does BIMI Work?

The implementation of BIMI involves a few key components. Firstly, it relies on established email authentication protocols such as SPF (Sender Policy Framework) and DKIM (DomainKeys Identified Mail). These protocols work together to verify the authenticity. and integrity of an email, ensuring it was sent from an authorized server and has not been tampered with during transit.

### Benefits of BIMI

With over 80% of Iterable customers’ monthly sending volume going to Mailbox Providers that support BIMI, this technical standard is simply beneficial to everyone. Implementing BIMI offers several benefits for your email marketing strategy:

*   **Enhanced brand visibility & recognition:** Display your brand logo directly in the recipient’s email client. This visual representation of your brand enhances brand visibility and recognition. When recipients consistently see your logo in their inboxes, it reinforces brand recall and distinguishes your emails from generic or potentially harmful messages.
*   **Enhanced email authentication & security**: Email spoofing and phishing attacks have become prevalent, posing significant risks to businesses and individuals. BIMI helps combat these threats by requiring the implementation of strong email authentication protocols. By ensuring that only legitimate senders can display their brand logos, BIMI helps recipients distinguish between genuine emails and potential phishing attempts, thus bolstering email security.**Improved recipient trust & user experience**: When recipients see your brand logo prominently displayed in their email clients, it establishes a sense of trust and authenticity. They can quickly associate the logo with your brand identity, reinforcing the legitimacy of your emails. This increased trust can lead to higher engagement rates, as recipients are more likely to open and interact with emails from recognized and trusted sources.
*   **Potential deliverability benefits**: By implementing these protocols and using BIMI, you demonstrate to email service providers (ESPs) and mailbox providers that you take email security seriously. This, in turn, increases your email deliverability rates as your messages are more likely to pass through spam filters and reach the intended recipients’ inboxes.
*   **Stand out from the crowd**: In a crowded digital landscape, standing out from the competition is crucial. BIMI provides a unique opportunity to differentiate your brand’s email communications.

By leveraging BIMI, you can elevate your email branding efforts and establish a strong and credible presence in recipients’ inboxes.

### How to Implement BIMI

Now that we’ve covered what BIMI is, let’s dive into the implementation process of BIMI:

#### Step 1: Evaluate Readiness

Before diving into BIMI implementation, assess your email infrastructure and ensure it meets the prerequisites for email authentication. This involves setting up SPF and DKIM records to establish a strong foundation for BIMI.

If you are unsure if your domain already uses BIMI, enter your domain in the BIMI Inspector tool.

#### Step 2: Authenticate your Domain

Implement DMARC policies that align with your email authentication goals. Gradually increase the policy strictness to maximize the benefits of BIMI while ensuring a smooth transition for your email ecosystem.

#### Step 3: Register Your Trademark

Before you can display your brand logo using BIMI, you need to have a registered trademark associated with your domain. This ensures that only legitimate brand owners can utilize BIMI for email branding.

#### Step 4: Create a Verified Mark Certificate (VMC)

A VMC is a digital certificate that confirms your ownership of the brand logo you want to display alongside your emails. You will need to work with an authorized Certification Authority (CA) to obtain a VMC.* The CA will verify your ownership and issue the certificate.

_*There is a cost associated with a VMC_

#### Step 5: Publish BIMI Records

Once you have a VMC, publish a BIMI record in your domain’s DNS (Domain Name System) settings. This record points to the location of your brand logo and includes the VMC information. It acts as a reference for email clients to retrieve and display your logo.

#### Step 6: Monitor and Maintain

Regularly monitor your DMARC reports to identify any email authentication failures or unauthorized use of your domain. Stay vigilant and update your BIMI record and VMC if any changes to your branding or logo occur.

This may seem overwhelming, but Iterable professional services, and our partners, are here to help.

### Build Trust with BIMI

BIMI represents a significant step forward in email authentication and brand visibility. By combining email authentication protocols with visual brand indicators, BIMI helps organizations combat email fraud, strengthen security, and build relationships with their audiences.

_Read more about our Deliverability Services and schedule a demo if you’re interested in working with the best deliverability team there is._

Want to take your deliverability to the next level? Download _**Email Deliverability 101: How to Reach the Inbox Every Time**_—your complete guide to building trust, boosting engagement, and ensuring your messages land where they belong.