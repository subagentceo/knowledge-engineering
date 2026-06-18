# Console: Create a Primary Customer Profile

> \[!NOTE]
>
> Twilio is rolling out a new Trust Hub experience in the updated Console. If your Console looks different from the screenshots below, see [Understanding the New Trust Hub Experience](https://help.twilio.com/articles/49705055364635-Understanding-the-New-Trust-Hub-Experience) for a guide on the changes.

## Navigate to the Customer Profiles dashboard

Currently, you can only create a Primary Customer Profile in the Twilio Console on a master account level. Navigate to **Account > Trust Hub >** **Customer Profile**, and choose to create either an Individual or Business/Organization Primary Customer Profile.

![Create Profile page with options for Individual or Business/Organization profiles.](https://docs-resources.prod.twilio.com/094160f5a608fb715e608f9254a5358cd254fe8d86a8aec16b46f04a3926789b.png)

## Build a Business Primary Customer Profile

### General Information

Fill in your company's general information including your business name and physical address. Please be sure to use the business name as listed on your registration authority.

![Form to enter business legal name, profile name, and address for verification.](https://docs-resources.prod.twilio.com/e483b5b044cbef2c89f6e44c5a402a1fe010763e84e2e409765d43b26d21cb0b.png)

### Business Information

After saving your general information, you will need to fill in the Business Information section.

![Form for creating a primary profile with fields for business type, industry, registration ID, and operation regions.](https://docs-resources.prod.twilio.com/ea9fee5c3e4099da2444301d2e888427cfac85f2750cb4f6b0bd85e971f4a461.png)

### Authorized Representative

A Primary Customer Profile requires an authorized representative from your company whom Twilio can reach out to confirm the business and use case.

![Form for entering authorized representative details in Twilio Trust Hub.](https://docs-resources.prod.twilio.com/f1043864e24805c3633387a6a886ba38892d6ab63e6f26a3459273efa0447389.png)

### Notification Settings

Twilio can notify you when your Primary Customer Profile gets approved or rejected. You can choose to receive this notification via email or through a status callback webhook.

![Notification settings for creating a primary business profile with email and webhook fields.](https://docs-resources.prod.twilio.com/2904068c2388dc62cd47cbb3dc52a2066716058e76db62c66a97d894f08f6f09.png)

### Terms

Review the terms of service and privacy policy before submitting for review.

![Terms of service and privacy policy agreement for creating a primary profile in Twilio.](https://docs-resources.prod.twilio.com/1253a1cd7d7d60a6a7691e9a73c8614888e582554ea6ce2ac922f77d06da2ae3.png)

## Build an Individual Primary Customer Profile

### General Information

Provide the general information for your Primary Customer Profile, including your email address and phone number.

![Form fields for profile name, email, phone, and government ID country.](https://docs-resources.prod.twilio.com/a5eb1f8f7595b37753fc3b0308d856a5f9b0ae3b963942797385bf2073cbd44c.png)

### Individual Details

Next, fill in your individual details: your name, date of birth, and physical address.

![Form for entering individual details including name, date of birth, and address.](https://docs-resources.prod.twilio.com/df0740b8ad5d173276e8ce7ab080b0d49218a16876234ac6eb1d6b662b50230f.png)

### Upload a Photo ID

You need to upload a photo ID for your Customer Profile. The list of allowed ID types varies based on the country you selected on the previous page.

![Upload a ID with options like Driver License, Passport, or National ID.](https://docs-resources.prod.twilio.com/993dc7d385adc0f0ab7d8f9b57ce799e27dfef572d8adeac9c11b6b7109ec812.png)

### Identity Verification

To verify your identity, you must take a photo of yourself via the Console.

![Prompt to verify identity by positioning face in camera center and moving left and right.](https://docs-resources.prod.twilio.com/600a37df4b5e7856c54d4d84bb211d34b028c25fc72c24edaa2cfdeb5bcd80ed.png)

### Terms

Review the terms of service and privacy policy before submitting for review.

![Privacy Acknowledgement checkbox and Continue button for Twilio customer profiles.](https://docs-resources.prod.twilio.com/48bf82a625ead4e97f7e25a52d5e67d81d0f380e01b43ff1de67258b9c9ee884.png)

## Submit for Review

Once you accept the terms of service, your profile will be submitted for review. After that, if all the required information has been filled in correctly, your Primary Customer Profile will move to **`In Review`** status, waiting for Twilio to review. Once your Primary Customer Profile is in review, you *cannot* edit it anymore.

![Profile details with business profile in review and phone number assignment option.](https://docs-resources.prod.twilio.com/91e7a1ebd110a358df2bd749a3ed381c4eb6653974d0abda135a616d072a952d.png)

If there is any missing or wrong information, your Primary Customer Profile will be rejected immediately and the status will be **`Twilio Rejected`**. In that case, you can still edit your information and resubmit when you're done based on the Rejection Reasons displayed in the Console.

![Business profile rejected with option to edit and resubmit.](https://docs-resources.prod.twilio.com/1634f32a4bc3ce0d47d97563d045ce5696c7f068723e254546a63b3c7b99c7e1.png)

## Approve

Your Customer Profile will get approved after Twilio vets your information. Once approved, the status will change to `Twilio Approved` and you cannot edit the profile anymore.

![Profile details showing business profile SID and Twilio approved status.](https://docs-resources.prod.twilio.com/e391fb555fb74f9d41e502e12eea3630c7a80632d5dafefe1a60c72a31525da8.png)

Congratulations! You've successfully created your Primary Customer Profile.
