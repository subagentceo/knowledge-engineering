# Example: RCA Summary Request Form

This is an example of a completed RCA Summary Request Form. Please complete this form in its entirety and return to Twilio.

## 1. Incident description \[#incident-description]

**What happened? What exact dates did the fraudulent activity start and end? When did you discover it?**

On February 2, 2026, we were notified by Twilio Support that our account had been compromised. An unauthorized party created new numbers and initiated a massive volume of outbound calls within seconds of each other. The fraudulent activity began and ended on February 2, 2026. We discovered the breach the same day, immediately upon receiving the alert from Twilio, and initiated an investigation at approximately 10:05 AM EST.

## 2. Root cause \[#root-cause]

**How did it happen?**

Our investigation revealed that attackers gained access to our entire code repository by fetching the publicly exposed `.git` folder via HTTP. Because the directory resided under our webroot, a misconfigured web server allowed any visitor to download Git metadata and reconstruct the repository history. Inside this history, we found legacy scripts containing our Twilio Account SID and Auth Token in plain text. This exposure allowed the attacker to use the Twilio API to provision numbers and place calls programmatically without needing to access our Twilio Console or SSH into our virtual machines.

## 3. Resolution \[#resolution]

**What measures have you taken to fix the problem?**

Upon confirming the source of the leak, we took the following immediate actions:

* **Credential Rotation:** Revoked the compromised Auth Token and generated new credentials.
* **Immediate Lockdown:** Configured Nginx to explicitly deny all requests to the `/.git` directory, returning a `403 Forbidden` error.
* **Code Refactoring:** Migrated all Twilio credentials out of the source code. We removed every hard-coded SID/Auth Token and refactored our PHP scripts to load credentials from a secured `.env` file.
* **Asset Cleanup:** Deleted the unauthorized numbers to stop further fraudulent traffic.
* **Sanitation:** Completed all sanitation steps recommended by Twilio.

## 4. Corrective and preventive actions \[#corrective-and-preventive-actions]

**What measures have you taken to stop the activity and prevent it in the future?**

To ensure this vulnerability does not recur, we have implemented the following permanent safeguards:

### Secure credential handling \[#secure-credential-handling]

* Prohibited the use of hard-coded credentials in all development policies.
* Standardized the use of environment variables for all sensitive API keys.
* Implemented secret scanning tools in our CI/CD pipeline to detect and block any commits containing high-entropy strings or known API key formats.

### Repository and server hardening \[#repository-and-server-hardening]

* Applied a global server-level rule to block access to all hidden files and directories.
* Updated deployment scripts to ensure that `.git` metadata is excluded from production builds entirely.

### Monitoring and compliance \[#monitoring-and-compliance]

* Enabled Twilio [Usage Triggers](https://help.twilio.com/articles/223132387-Protect-your-Twilio-project-from-Fraud-with-Usage-Triggers) to alert our team automatically if account spending exceeds a set daily threshold.
* Updated our `.gitignore` templates to ensure sensitive configuration files are never tracked in version control.
