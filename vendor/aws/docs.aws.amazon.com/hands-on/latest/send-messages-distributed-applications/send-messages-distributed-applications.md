

# Send Messages Between Distributed Applications
<a name="send-messages-distributed-applications"></a>


|  |  | 
| --- |--- |
| **Cost to Complete** | Free Tier  | 
| **Services Used** | [Amazon SQS](https://aws.amazon.com/sqs/)  | 
| Sending Messages on AWS Requires an Account | AWS Free Tier includes 1,000,000 requests of Amazon Simple Queue Service. <br />[View AWS Free Tier Details »](https://aws.amazon.com/free/?e=gs21&src=introduction_freetier) <br />[Create a Free Account in Minutes](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html?e=gs21&src=introduction_signup)  | 

## Overview
<a name="overview"></a>

In this tutorial, you will learn how to set up asynchronous messaging with [Amazon Simple Queue Service (Amazon SQS)](https://aws.amazon.com/sqs/). Amazon SQS is the AWS service that allows application components to communicate in the cloud. You will use the Amazon SQS console to create and configure a message queue, send a message, receive and delete that message, and then delete the queue. 

The AWS services you use in this tutorial are within the [AWS Free Tier](https://aws.amazon.com/free/). 

## Implementation
<a name="implementation"></a>

### Step 1: Open the Amazon SQS console
<a name="open-sqs-console"></a>

1. Launch the AWS Management Console

   When you [click here](https://console.aws.amazon.com/console/home), the AWS Management Console will open in a new browser window, so you can keep this step-by-step guide open.  When the screen loads, enter your user name and password to get started. Then type **queue** in the search bar and select **Simple Queue Service** to open the console.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/resource-creation-interface.png)

1. Start the Amazon SQS Console

   If the SQS console landing page appears, as shown on by the screenshot, click **Get Started Now.** If you don't see this page, skip to the next step.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/resource-creation-interface-1.png)

### Step 2: Create an Amazon SQS Queue
<a name="create-an-amazon-sqs-queue"></a>

In this step, you will create and configure an Amazon SQS queue. A queue is a reliable, highly-scalable buffer that stores messages as they travel between distributed applications or microservices. Queues help to decouple applications, connect microservices, batch tasks, or store notifications. 

Our use case for this tutorial will simulate the storage of incoming orders from an e-commerce application. 

1. Enter a queue name

   First, we will create a simple queue that stores orders that are placed on the store. Enter **Orders** in the **Queue Name** field.    
![The configuration settings interface.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/configuration-settings-interface.png)

1. Choose a queue type

   For this tutorial, we do not require strict ordering, so we won’t make any changes to the queue type. Leave **Standard Queue** selected.     
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/selection-interface.png)

1. Create the queue

   You can configure your queue to modify settings such as retention period, maximum message size and delivery delays. For this tutorial, we will keep the default parameters. Choose **Quick-Create Queue**.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/resource-creation-interface-2.png)

1. Verify queue creation

   Your new queue is created and selected in the queue list.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/resource-creation-interface-3.png)

### Step 3: Send messages to the Queue
<a name="send-messages-to-the-queue"></a>

Once you have created your queue, it is ready to receive messages from the online store that capture the details of each new order. 

1. Send a message

   Your queue is already selected in the list. From **Queue Actions**, select **Send a Message**. The **Send a Message to Orders** dialog box is displayed.   
![The resource creation interface.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/resource-creation-interface-4.png)

1. Enter message content

   The **Send a Message to Orders** dialog box is displayed. On the **Message Body** tab, enter the following text to represent a sample order: 

   **1 x Widget @ $29.99 USD 2 x Widget Cables @ $4.99**  
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/interface.png)

1. Enter message attributes

   Select the **Message Attributes** tab to add some optional metadata about this message for easy processing. Let’s add an order type to the order. Enter **Order-Type** in the **Name** field, **String** in the **Type** field, and **Online** in the **Value** field. Click **Add Attribute**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/interface-1.png)

1. Send message

   To send the message immediately, click **Send Message**. Confirmation that your message was sent is displayed in the **Send a Message to Orders** dialog box. Click **Close**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/interface-interface-element.png)

### Step 4: Retrieve and Delete a Message
<a name="retrieve-and-delete-a-message"></a>

After you send a message to a queue, another application can consume it from the queue and do something with it. In this example, you will simply retrieve the message to view the order, and then delete it. 

1. View or delete messages

   Ensure that your **Orders** queue is selected in the queue list. Next, from **Queue Actions**, select **View/Delete Messages**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/interface-2.png)

1. Poll for messages

   The **View/Delete Messages** **in Orders** dialog box is displayed. When you request a message from a queue, you don't specify request a specific message. Instead, you specify the maximum number of messages (up to 10) that you want to retrieve. 

   Click **Start Polling for messages** to retrieve messages from the queue.     
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/interface-3.png)

1. Select and delete the message

   Once a consumer has received and processed a message, it can be deleted from the queue. Select the message that you want to delete and then choose **Delete 1 Message**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/selection-interface-1.png)

1. Confirm deletion

   The **Delete Messages** dialog box is displayed. Check the box next to the message and click **Yes, Delete Checked Messages**. The selected message is deleted. Choose **Close**.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/interface-interface-element-1.png)

### Step 5: Clean Up Resources
<a name="clean-up-resources"></a>

When you no longer need to use an Amazon SQS queue, we recommend that you delete the queue as a best practice. 

1. Select and delete queue

   In the queue list, select the **Orders** queue. Then, from **Queue Actions**, select **Delete Queue**.   
![The selection interface.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/selection-interface-2.png)

1. Confirm deletion

   The **Delete Queues** dialog box is displayed. You can still delete your queue, even though you still have messages in it. Choose **Yes, Delete Queue**. The queue is deleted.   
![Interface element requiring manual review.](http://docs.aws.amazon.com/hands-on/latest/send-messages-distributed-applications/images/interface-4.png)

## Conclusion
<a name="conclusion"></a>

You have created your first Amazon Simple Queue Service (Amazon SQS) message queue, sent messages to your queue, retrieved and deleted messages, and then deleted the queue. You are now ready to use Amazon SQS queues to store and move data between distributed application components and microservices. 