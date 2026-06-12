# Using autoscaling for highly scalable applications

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Guides

Send feedback

# Using autoscaling for highly scalable applications Stay organized with collections Save and categorize content based on your preferences.

This tutorial explains how to use autoscaling to automatically adjust the number of VM instances that are hosting your application, allowing your application to adapt to varying amounts of traffic.

To use autoscaling, host your application on a managed instance group. A managed instance group is a collection of instances that are all running the same application and can be managed as a single entity. When a managed instance group has autoscaling enabled, the number of VMs in the instance group automatically increases (scales out) or decreases (scales in) according to the target value that you specify for your autoscaling policy.

This tutorial includes detailed steps for launching a web application on a managed instance group, setting up autoscaling, configuring network access, and observing autoscaling by simulating load spikes and drops. Depending on your experience with these features, this tutorial takes about 20 minutes to complete.

## Objectives

*   Launch a demo web application on a managed instance group.
*   Observe the effects of autoscaling by simulating traffic spikes and drops.

## Costs

In this document, you use the following billable components of Google Cloud:

*   Compute Engine

To generate a cost estimate based on your projected usage, use the pricing calculator.

New Google Cloud users might be eligible for a free trial.

## Before you begin

*   Sign in to your Google Cloud account. If you're new to Google Cloud, create an account to evaluate how our products perform in real-world scenarios. New customers also get $300 in free credits to run, test, and deploy workloads.
*   In the Google Cloud console, on the project selector page, select or create a Google Cloud project.
    
    **Roles required to select or create a project**
    
    *   **Select a project**: Selecting a project doesn't require a specific IAM role—you can select any project that you've been granted a role on.
    *   **Create a project**: To create a project, you need the Project Creator role (`roles/resourcemanager.projectCreator`), which contains the `resourcemanager.projects.create` permission. Learn how to grant roles.
    
    **Note**: If you don't plan to keep the resources that you create in this procedure, create a project instead of selecting an existing project. After you finish these steps, you can delete the project, removing all resources associated with the project.
    
    Go to project selector
    
*   Verify that billing is enabled for your Google Cloud project.
    

*   In the Google Cloud console, on the project selector page, select or create a Google Cloud project.
    
    **Roles required to select or create a project**
    
    *   **Select a project**: Selecting a project doesn't require a specific IAM role—you can select any project that you've been granted a role on.
    *   **Create a project**: To create a project, you need the Project Creator role (`roles/resourcemanager.projectCreator`), which contains the `resourcemanager.projects.create` permission. Learn how to grant roles.
    
    **Note**: If you don't plan to keep the resources that you create in this procedure, create a project instead of selecting an existing project. After you finish these steps, you can delete the project, removing all resources associated with the project.
    
    Go to project selector
    
*   Verify that billing is enabled for your Google Cloud project.
    

## Application architecture

The application includes the following Compute Engine components:

*   Firewall rule: a Google Cloud firewall that lets you allow or deny traffic to your instances.
*   Instance template: a template used to create each VM instance in the managed instance group.
*   Regional managed instance group: a group of VM instances running the same application across multiple zones.

## Launching the web application

This tutorial uses a web application that is stored on GitHub. If you would like learn more about how the application was implemented, see the GoogleCloudPlatform/python-docs-samples repository on GitHub.

Launch the web application on every VM in a managed instance group by including a startup script in an instance template. To allow HTTP traffic to the web application, create a firewall rule.

### Create a firewall rule

**Note:** This firewall rule allows ingress HTTP traffic for all instances that are on the default network and have the `http-server` networking tag.

Create a firewall rule to allow HTTP traffic to the web application:

1.  In the Google Cloud console, go to the **Firewalls** page.
    
    Go to Firewalls
    
2.  Click **Create firewall rule**.
    
3.  Under **Name**, enter `default-allow-http`.
    
4.  Set **Network** to `default`.
    
5.  Set **Targets** to select `Specified target tags`.
    
6.  Under **Target Tags**, enter `http-server`.
    
7.  Set **Source filter** to `IPv4 ranges`.
    
8.  Under **Source IPv4 ranges**, enter `0.0.0.0/0`
    
    to allow access for all IP addresses.
    
9.  Under **Protocols and ports**, select **Specified protocols and ports**. Then, select **TCP** and enter `80` to allow access for HTTP traffic.
    
10.  Click **Create**.
     

### Create an instance template

Create an instance template that launches the demo web application on startup:

1.  In the Google Cloud console, go to the **Instance templates** page.
    
    Go to Instance templates
    
2.  Click **Create instance template**.
    
3.  Under **Name**, enter `autoscaling-web-app-template`.
    
4.  Under **Machine configuration**, set the **Machine type** to `e2-standard-2`.
    
5.  Under **Firewall**, select the **Allow HTTP traffic** checkbox. This applies the `http-server` networking tag to each instance created from this template.
    
6.  Expand the **Advanced options** section to see advanced settings.
    
7.  Expand the **Management** section.
    
8.  In the **Automation** section, enter the following startup script:
    
    sudo apt update && sudo apt -y install git gunicorn3 python3-pip
    git clone https://github.com/GoogleCloudPlatform/python-docs-samples.git
    cd python-docs-samples/compute/managed-instances/demo
    sudo pip3 install -r requirements.txt
    sudo gunicorn3 --bind 0.0.0.0:80 app:app --daemon
    
    This script causes each VM to run the web application during startup.
    
9.  Click **Create**.
    

### Create a managed instance group

Create a regional instance group to begin running the web application:

1.  In the Google Cloud console, go to the **Instance groups** page.
    
    Go to Instance groups
    
2.  Click **Create instance group** to create a new instance group.
    
3.  Select **New managed instance group (stateless)**."
    
4.  For **Name**, enter `autoscaling-web-app-group`.
    
5.  For **Instance template**, select `autoscaling-web-app-template`.
    
6.  For **Location**, select **Multiple zones**.
    
    **Pro Tip:** To ensure your application is available during extreme events, like zonal outages, Compute Engine recommends that you distribute your application across multiple zones.
    
7.  For **Region**, select **us-central1**.
    
8.  For **Zones**, select the following zones from the drop-down list:
    
    *   **us-central1-b**
    *   **us-central1-c**
    *   **us-central1-f**
9.  Configure autoscaling for the instance group:
    
    1.  For **Autoscaling mode**, select **On: add and remove instances to the group**.
    2.  Set the **Minimum number of instances** to `3`.
        
        **Pro Tip:** When creating a regional managed instance group, Compute Engine recommends that you provision enough instances so that, if all of the instances in any one zone are unavailable, the remaining instances still meet the minimum number of instances that you require. However, provisioning more instances than you need might incur additional costs. For more information, see Selecting instance group size to ensure availability.
        
    3.  Set the **Maximum number of instances** to `6`.
        
    4.  Set the **Initialization period** to `120` seconds.
        
        **Pro Tip:** The **initialization period** is the number of seconds after an instance is created that the autoscaler should wait before using information about the instance for scaling decisions. When a VM is initializing, the CPU usage is not reliable for autoscaling. To prevent the autoscaler from scaling based on inaccurate data, make sure the initialization period is longer than the time than the time it takes for the CPU utilization of your VM to initially stabilize. For more information, see Initialization period and Monitoring autoscaling charts and logs.
        
    5.  Under **Autoscaling Metrics**, select **CPU utilization** as the metric type. To learn more about autoscaling metrics, see Autoscaling policy.
        
    6.  Set the **Target CPU utilization** to `60`.
        
    7.  Click **Done**.
        
10.  Under **Autohealing**, select **No health check** from the **Health check** drop-down list.
     
11.  Click **Create**. This redirects you to the **Instance groups** page.
     
     **Note:** Wait a few minutes until all of the instances in the group are running and ready to display the web application.
     
12.  To verify that your instances are running:
     
     1.  On the **Instance groups** page in the Google Cloud console, click `autoscaling-web-app-group` to see the instances in that group.
     2.  Under **External IP**, click on an IP address to connect that instance. A new browser tab opens displaying the demo web application:
         
         ![Demo web application, which lists information about the instance and has action buttons.](/static/compute/docs/tutorials/images/high-scalability-autoscaling-web-app-group.png)
         
         **Note:** If you are unable to connect to the web application after waiting a few minutes, verify the instance status and network settings:
         
         *   Verify that the instance group is ready. If the application fails to load with an ERR_CONNECTION_REFUSED status, wait a few minutes for the startup script to finish running.
         *   Verify that the group's instance template has **Allow HTTP traffic** enabled. Then, verify that `allow-web-app-http` firewall rule was created correctly.
         
         When you are done, close the browser tab for the demo web application.
         

## Observing autoscaling

For more information about autoscaling behaviors, see Understanding autoscaling decisions.

### Monitor autoscaling

The instance group you created uses an **Autoscaling policy** based on **CPU usage**. This means that autoscaler grows or shrinks the group as needed to maintain the target CPU utilization of `60`%.

To monitor the size and CPU utilization of your instance group, use the autoscaling charts in the Google Cloud console:

1.  On the **Instance groups** page for the`autoscaling-web-app-group` instance group, click the **Monitoring** tab.
2.  You can monitor autoscaling from the **Group size** chart. The graph displays **Instances**, which represents the number of VM instances in the group over time.
3.  Optional: To monitor autoscaled capacity versus utilization, see the **Autoscaler utilization (CPU)** chart. The graph displays **Utilization**, which is the total CPU utilization of VM instances in the group, and **Capacity**, which is the cumulative target CPU utilization of the group (target CPU utilization multiplied by the number of VM instances).
    
    Autoscaling attempts to make **Capacity** match **Utilization** by changing the number of **Instances**, when possible.
    

Keep this window open.

### Simulate scale out

Scale out occurs when the average CPU utilization of the instance group is significantly higher than the target value. During scale out, autoscaler gradually increases the size of the instance group until CPU utilization decreases to the target CPU utilization value or until the instance group size equals the **Maximum number of instances**, which was set to `6`.

To trigger scale out, increase the CPU utilization for your instances:

1.  In the Google Cloud console, open Cloud Shell.
    
    Open Cloud Shell
    
    Cloud Shell opens on the bottom of the Google Cloud console. It can take a few seconds for the session to initialize.
    
    **Pro Tip:**
    
    You can open the Cloud Shell from any Google Cloud console page using the **Activate Cloud Shell** button, which is in the top right corner of every Google Cloud console page.
    
2.  Create a local bash variable for the project ID:
    
    export PROJECT_ID=[PROJECT_ID]
    
    where `PROJECT_ID` is the project ID for your current project, which is displayed on each new line in the Cloud Shell:
    
    user@cloudshell:~ ([PROJECT_ID])$
    
3.  Run the following bash script. This script causes the demo web application instances to have an increased load, which increases CPU utilization. After a few minutes, the CPU utilization will surpass the target value, prompting the autoscaling to increase the instance group size.
    
    export MACHINES=$(gcloud --project=$PROJECT_ID compute instances list --format="csv(name,networkInterfaces[0].accessConfigs[0].natIP)" | grep "autoscaling-web-app-group")
    for i in $MACHINES;
    do
      NAME=$(echo "$i" | cut -f1 -d,)
      IP=$(echo "$i" | cut -f2 -d,)
      echo "Simulating high load for instance $NAME"
      curl -q -s "http://$IP/startLoad" >/dev/null --retry 2
    done
    
4.  Open the **Monitoring** tab in the Google Cloud console.
    
    After a few minutes, the **Monitoring** tab displays that the CPU **Utilization** increased, which triggers autoscaling to increase **Capacity** by increasing the number of **Instances**.
    
    **Note:** You might need to refresh the page to see the most recent chart.
    
    You might also notice that 6 instances are now listed under the **Overview** tab.
    

Keep both windows open.

### Simulate scale in

Scale in occurs when the average CPU utilization of the instance group is significantly lower than the target value. During scale in, autoscaler gradually decreases the size of the instance group until CPU utilization increases to the target CPU utilization or until the instance group size equals the **Minimum number of instances**, which was set to `3`.

**Note:** To prevent preemptive scale in, the autoscaler calculates the group's recommended target size based on peak load over the stabilization period. The stabilization period might appear as a delay in scaling in, but it is actually a built-in feature of autoscaling. The delay ensures that the smaller group size will be enough to support peak load observed during the stabilization period. For more information about the stabilization period, see Delays in scaling in.

To trigger scale in, decrease the CPU utilization for your instances:

1.  Run the following bash script. This script causes the demo web application instances to have a decreased load, which decreases CPU utilization. After a few minutes, the CPU utilization will fall below the target value, prompting the autoscaler to decrease the instance group size.
    
    export MACHINES=$(gcloud --project=$PROJECT_ID compute instances list --format="csv(name,networkInterfaces[0].accessConfigs[0].natIP)" | grep "autoscaling-web-app-group")
    for i in $MACHINES;
    do
      NAME=$(echo "$i" | cut -f1 -d,)
      IP=$(echo "$i" | cut -f2 -d,)
      echo "Simulating low load for instance $NAME"
      curl -q -s "http://$IP/stopLoad" >/dev/null --retry 2
    done
    
2.  Open the **Monitoring** tab in the Google Cloud console.
    
    After a few minutes, the **Monitoring** tab displays that the CPU **Utilization** decreased. After the stabilization period, which verifies that the load is consistently less, autoscaling decreases **Capacity** by decreasing the number of **Instances**.
    
    **Note:** You might need to refresh the page to see the most recent chart.
    
    You might also notice that only 3 instances are listed under the **Overview** tab.
    

Close both windows when you have finished.

## Clean up

After you finish the tutorial, you can clean up the resources that you created so that they stop using quota and incurring charges. The following sections describe how to delete or turn off these resources.

If you created a separate project for this tutorial, delete the entire project. Otherwise, if the project has resources that you want to keep, only delete the resources created in this tutorial.

### Deleting the project

**Caution**: Deleting a project has the following effects:

*   **Everything in the project is deleted.** If you used an existing project for the tasks in this document, when you delete it, you also delete any other work you've done in the project.
*   **Custom project IDs are lost.** When you created this project, you might have created a custom project ID that you want to use in the future. To preserve the URLs that use the project ID, such as an `appspot.com` URL, delete selected resources inside the project instead of deleting the whole project.

If you plan to explore multiple architectures, tutorials, or quickstarts, reusing projects can help you avoid exceeding project quota limits.

2.  In the Google Cloud console, go to the **Manage resources** page.
    
    Go to Manage resources
    
3.  In the project list, select the project that you want to delete, and then click **Delete**.
4.  In the dialog, type the project ID, and then click **Shut down** to delete the project.

### Deleting specific resources

#### Deleting the instance group

1.  In the Google Cloud console, go to the **Instance groups** page.
    
    Go to Instance groups
    
2.  Select the checkbox for your `autoscaling-web-app-group` instance group.
3.  To delete the instance group, click delete **Delete**.

#### Deleting the instance template

**Note:** You must finish deleting the instance group before deleting the instance template. You cannot delete an instance template if a managed instance group is using it.

1.  In the Google Cloud console, go to the **Instance templates** page.
    
    Go to Instance templates
    
2.  Click the checkbox next to the `autoscaling-web-app-template`.
    
3.  Click delete **Delete** at the top of the page. In the new window, click **Delete** to confirm the deletion.
    

#### Deleting the firewall rule

1.  In the Google Cloud console, go to the **Firewall rules** page.
    
    Go to Firewall rules
    
2.  Click the checkbox next to the firewall rule named `default-allow-http`.
    
3.  Click delete **Delete**. In the new window, click **Delete** to confirm the deletion.
    

## What's next

*   Try another tutorial:
    *   Using autohealing for highly available applications.
    *   Using load balancing for highly available applications.
*   Learn more about Managed Instance Groups.
*   Learn more about Autoscaling.
*   Learn more about Designing Robust Systems.
*   Learn more about Building Scalable and Resilient Web Applications on Google Cloud.

Send feedback