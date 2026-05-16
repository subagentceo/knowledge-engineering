# Truth Data System

# Overview

Arkose Bot Manager utilizes many data points, collected on both the client and server sides, to detect attacks. Nonetheless, there will be times when conflicting signals lead to ambiguity about whether a session is valid, or if it is an attack. As a customer, you can see how sessions turn out based on how the end-user interacted with your platform. Arkose’s Truth Data system lets you provide this feedback to Arkose via the Arkose Command Center. This feedback:

* Provides Arkose with additional data points to improve our detection abilities.
* Helps customers understand why a session was a false positive via Command Center dashboards dedicated to Truth Data.

## Sending Truth Data Via The Arkose Command Center

Follow these steps to upload truth data to Arkose via our Command Center:

1. Go to the Arkose Command Center and login.

2. In the left vertical menu bar, navigate to **Truth Data -> Upload**, as shown below. If you don’t see the **Truth Data tab**, please contact Arkose to enable it.

   ![](https://files.readme.io/10cc762c90ec4ceae353f5cd6f7869d67980682f025dba2a6c86f1be44936730-image.png)

3. Use the **DOWNLOAD SAMPLE FILE** tab to download a file with the column headers that Arkose expects. Using this as a template for your data file greatly reduces the chances of an upload failure.

   ![](https://files.readme.io/5c27aba0b6825b9a86cdb8b10203c4f52c13887b666b9bd83ff3f6f4d02f3ff1-image.png)

4. After downloading the sample file, fill in the data you want to upload to Arkose and, if desired, rename it to what you consider appropriate. The mandatory and optional fields shown here are described below in the Truth Data API Fields table.

5. When you finish entering your data, save it and click on the **UPLOAD DATA** tab. You will see an **Import data from CSV…** message as shown below. Select the file you want to upload and click the **UPLOAD FILES** button. Note that you can only upload one file at a time. The maximum file size is 100 MB. After uploading, you will see a status screen as shown below. *Note that it may take up to 30 minutes to upload the file.*

![](https://files.readme.io/2be2f3c-image.png)

![](https://files.readme.io/24b0bec-image.png)

6. Once the file is successfully uploaded, a Zendesk ticket file automatically opens under your Arkose account. You will be notified of any Arkose SOC analysis, recommendations, or telltale modifications or creations via the Zendesk ticket.

## Sending Truth Data via Truth Data API

To learn how to send data via the Truth Data API please visit: [Truth Data API](https://developer.arkoselabs.com/docs/truth-data-api#/)