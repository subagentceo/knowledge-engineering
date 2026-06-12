# Optimize Pod autoscaling based on metrics

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   Documentation
*   Guides

Send feedback

# Optimize Pod autoscaling based on metrics Stay organized with collections Save and categorize content based on your preferences.

This tutorial demonstrates how to automatically scale your Google Kubernetes Engine (GKE) workloads based on metrics available in Cloud Monitoring.

In this tutorial, you can set up autoscaling based on one of the following metrics:

### Pub/Sub

**Pub/Sub backlog**

Scale based on an external metric reporting the number of unacknowledged messages remaining in a Pub/Sub subscription. This can effectively reduce latency before it becomes a problem, but might use relatively more resources than autoscaling based on CPU utilization.

### Custom Metric

**Custom Prometheus Metric**

Scale based on a custom user-defined metric, exported in the Prometheus format via Google Managed Prometheus. Your Prometheus metric must be of type Gauge.

Autoscaling is fundamentally about finding an acceptable balance between cost and latency. You might want to experiment with a combination of these metrics and others to find a policy that works for you.

## Objectives

This tutorial covers the following tasks:

1.  How to deploy the Custom Metrics Adapter.
2.  How to export metrics from within your application code.
3.  How to view your metrics on the Cloud Monitoring interface.
4.  How to deploy a HorizontalPodAutoscaler (HPA) resource to scale your application based on Cloud Monitoring metrics.

## Costs

In this document, you use the following billable components of Google Cloud:

*   GKE
*   Pub/Sub

To generate a cost estimate based on your projected usage, use the pricing calculator.

New Google Cloud users might be eligible for a free trial.

When you finish the tasks that are described in this document, you can avoid continued billing by deleting the resources that you created. For more information, see Clean up.

## Before you begin

Take the following steps to enable the Kubernetes Engine API:

1.  Visit the Kubernetes Engine page in the Google Cloud console.
2.  Create or select a project.
3.  Wait for the API and related services to be enabled. This can take several minutes.
4.  Verify that billing is enabled for your Google Cloud project.
    

You can follow this tutorial using Cloud Shell, which comes preinstalled with the `gcloud` and `kubectl` command-line tools used in this tutorial. If you use Cloud Shell, you don't need to install these command-line tools on your workstation.

To use Cloud Shell:

1.  Go to the Google Cloud console.
2.  Click the **Activate Cloud Shell** ![Activate Shell Button](/static/shell/docs/images/activate_cloud_shell.svg) button at the top of the Google Cloud console window.
    
    A Cloud Shell session opens inside a new frame at the bottom of the Google Cloud console and displays a command-line prompt.
    
    ![Cloud Shell session](/static/shell/docs/images/new-console.png)
    

### Setting up your environment

1.  Set the default zone for the Google Cloud CLI:
    
    gcloud config set compute/zone zone
    
    Replace the following:
    
    *   `zone`: Choose a zone that's closest to you. For more information, see Regions and Zones.
2.  Set the `PROJECT_ID` and `PROJECT_NUMBER` environment variables to your Google Cloud project ID and project number:
    
    export PROJECT_ID=project-id
    export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format 'get(projectNumber)')
    
3.  Set the default zone for the Google Cloud CLI:
    
    ```
    gcloud config set project $PROJECT_ID
    ```
    
4.  Create a GKE cluster
    
    **Best practice**:
    
    For enhanced security when accessing Google Cloud services, enable Workload Identity Federation for GKE on your cluster. Although this page includes examples using the legacy method (with Workload Identity Federation for GKE disabled), enabling it improves protection.
    
    ### Workload Identity
    
    To create a cluster with Workload Identity Federation for GKE enabled, run the following command:
    
    ```
    gcloud container clusters create metrics-autoscaling --workload-pool=$PROJECT_ID.svc.id.goog
    ```
    
    ### Legacy authentication
    
    To create a cluster with Workload Identity Federation for GKE _disabled_, run the following command:
    
    ```
    gcloud container clusters create metrics-autoscaling
    ```
    

## Deploying the Custom Metrics Adapter

The Custom Metrics Adapter lets your cluster send and receive metrics with Cloud Monitoring.

### Pub/Sub

The procedure to install the Custom Metrics Adapter differs for clusters with or without Workload Identity Federation for GKE enabled. Select the option matching the setup you chose when you created your cluster.

### Workload Identity

Grant your user the ability to create required authorization roles:

```
kubectl create clusterrolebinding cluster-admin-binding \
    --clusterrole cluster-admin --user "$(gcloud config get-value account)"
```

Deploy the custom metrics adapter on your cluster:

```
kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/k8s-stackdriver/master/custom-metrics-stackdriver-adapter/deploy/production/adapter_new_resource_model.yaml
```

The adapter uses the `custom-metrics-stackdriver-adapter` Kubernetes service account in the `custom-metrics` namespace. Allow this service account to read Cloud Monitoring metrics by assigning the _Monitoring Viewer_ role:

```
gcloud projects add-iam-policy-binding projects/$PROJECT_ID \
  --role roles/monitoring.viewer \
  --member=principal://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$PROJECT_ID.svc.id.goog/subject/ns/custom-metrics/sa/custom-metrics-stackdriver-adapter
```

### Legacy Authentication

Grant your user the ability to create required authorization roles:

```
kubectl create clusterrolebinding cluster-admin-binding \
    --clusterrole cluster-admin --user "$(gcloud config get-value account)"
```

Deploy the custom metrics adapter on your cluster:

```
kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/k8s-stackdriver/master/custom-metrics-stackdriver-adapter/deploy/production/adapter_new_resource_model.yaml
```

### Custom Metric

The procedure to install the Custom Metrics Adapter differs for clusters with or without Workload Identity Federation for GKE enabled. Select the option matching the setup you chose when you created your cluster.

### Workload Identity

Grant your user the ability to create required authorization roles:

```
kubectl create clusterrolebinding cluster-admin-binding \
    --clusterrole cluster-admin --user "$(gcloud config get-value account)"
```

Deploy the custom metrics adapter on your cluster:

```
kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/k8s-stackdriver/master/custom-metrics-stackdriver-adapter/deploy/production/adapter_new_resource_model.yaml
```

The adapter uses the `custom-metrics-stackdriver-adapter` Kubernetes service account in the `custom-metrics` namespace. Allow this service account to read Cloud Monitoring metrics by assigning the _Monitoring Viewer_ role:

```
gcloud projects add-iam-policy-binding projects/$PROJECT_ID \
  --role roles/monitoring.viewer \
  --member=principal://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$PROJECT_ID.svc.id.goog/subject/ns/custom-metrics/sa/custom-metrics-stackdriver-adapter
```

### Legacy Authentication

Grant your user the ability to create required authorization roles:

```
kubectl create clusterrolebinding cluster-admin-binding \
    --clusterrole cluster-admin --user "$(gcloud config get-value account)"
```

Deploy the custom metrics adapter on your cluster:

```
kubectl apply -f https://raw.githubusercontent.com/GoogleCloudPlatform/k8s-stackdriver/master/custom-metrics-stackdriver-adapter/deploy/production/adapter_new_resource_model.yaml
```

## Deploying an application with metrics

Download the repository containing the application code for this tutorial:

### Pub/Sub

```
git clone https://github.com/GoogleCloudPlatform/kubernetes-engine-samples.git
cd kubernetes-engine-samples/databases/cloud-pubsub
```

### Custom Metric

```
git clone https://github.com/GoogleCloudPlatform/kubernetes-engine-samples.git
cd kubernetes-engine-samples/observability/custom-metrics-autoscaling/google-managed-prometheus
```

The repository contains code that exports metrics to Cloud Monitoring:

### Pub/Sub

This application polls a Pub/Sub subscription for new messages, acknowledging them as they arrive. Pub/Sub subscription metrics are automatically collected by Cloud Monitoring.

```
from google import auth
from google.cloud import pubsub_v1


def main():
    """Continuously pull messages from subsciption"""

    # read default project ID
    _, project_id = auth.default()
    subscription_id = 'echo-read'

    subscriber = pubsub_v1.SubscriberClient()
    subscription_path = subscriber.subscription_path(
        project_id, subscription_id)

    def callback(message: pubsub_v1.subscriber.message.Message) -> None:
        """Process received message"""
        print(f"Received message: ID={message.message_id} Data={message.data}")
        print(f"[{datetime.datetime.now()}] Processing: {message.message_id}")
        time.sleep(3)
        print(f"[{datetime.datetime.now()}] Processed: {message.message_id}")
        message.ack()

    streaming_pull_future = subscriber.subscribe(
        subscription_path, callback=callback)
    print(f"Pulling messages from {subscription_path}...")

    with subscriber:
        try:
            streaming_pull_future.result()
        except Exception as e:
            print(e)
```

### Custom Metric

This application responds to any web request to the `/metrics` path with a constant value metric using the Prometheus format.

```
metric := prometheus.NewGauge(
	prometheus.GaugeOpts{
		Name: *metricName,
		Help: "Custom metric",
	},
)
prometheus.MustRegister(metric)
metric.Set(float64(*metricValue))

http.Handle("/metrics", promhttp.Handler())
log.Printf("Starting to listen on :%d", *port)
err := http.ListenAndServe(fmt.Sprintf(":%d", *port), nil)
```

The repository also contains a Kubernetes manifest to deploy the application to your cluster. A _Deployment_ is a Kubernetes API object that lets you run multiple replicas of Pods that are distributed among the nodes in a cluster.:

### Pub/Sub

The manifest differs for clusters with or without Workload Identity Federation for GKE enabled. Select the option matching the setup chose when you created your cluster.

### Workload Identity

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pubsub
spec:
  selector:
    matchLabels:
      app: pubsub
  template:
    metadata:
      labels:
        app: pubsub
    spec:
      serviceAccountName: pubsub-sa
      containers:
      - name: subscriber
        image: us-docker.pkg.dev/google-samples/containers/gke/pubsub-sample:v2
```

### Legacy authentication

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: pubsub
spec:
  selector:
    matchLabels:
      app: pubsub
  template:
    metadata:
      labels:
        app: pubsub
    spec:
      volumes:
      - name: google-cloud-key
        secret:
          secretName: pubsub-key
      containers:
      - name: subscriber
        image: us-docker.pkg.dev/google-samples/containers/gke/pubsub-sample:v2
        volumeMounts:
        - name: google-cloud-key
          mountPath: /var/secrets/google
        env:
        - name: GOOGLE_APPLICATION_CREDENTIALS
          value: /var/secrets/google/key.json
```

### Custom Metric

```
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    run: custom-metrics-gmp
  name: custom-metrics-gmp
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      run: custom-metrics-gmp
  template:
    metadata:
      labels:
        run: custom-metrics-gmp
    spec:
      containers:
      # sample container generating custom metrics
      - name: prometheus-dummy-exporter
        image: us-docker.pkg.dev/google-samples/containers/gke/prometheus-dummy-exporter:v0.2.0
        command: ["./prometheus-dummy-exporter"]
        args:
        - --metric-name=custom_prometheus
        - --metric-value=40
        - --port=8080
```

With the PodMonitoring resource, the Google Cloud Managed Service for Prometheus exports the Prometheus metrics to Cloud Monitoring:

```
apiVersion: monitoring.googleapis.com/v1
kind: PodMonitoring
metadata:
  name: "custom-metrics-exporter"
spec:
  selector:
    matchLabels:
      run: custom-metrics-gmp
  endpoints:
  - port: 8080
    path: /metrics
    interval: 15s
```

Starting in GKE Standard version 1.27 or GKE Autopilot version 1.25, Google Cloud Managed Service for Prometheus is enabled. To enable Google Cloud Managed Service for Prometheus in clusters in earlier versions, see Enable managed collection.

Deploy the application to your cluster:

### Pub/Sub

The procedure to deploy your application differs for clusters with or without Workload Identity Federation for GKE enabled. Select the option matching the setup you chose when you created your cluster.

### Workload Identity

1.  Enable the Pub/Sub API on your project:
    
    ```
    gcloud services enable cloudresourcemanager.googleapis.com pubsub.googleapis.com
    ```
    
2.  Create a Pub/Sub topic and subscription:
    
    ```
    gcloud pubsub topics create echo
    gcloud pubsub subscriptions create echo-read --topic=echo
    ```
    
3.  Deploy the application to your cluster:
    
    ```
    kubectl apply -f deployment/pubsub-with-workload-identity.yaml
    ```
    
4.  This application defines a `pubsub-sa` Kubernetes service account. Assign it the _Pub/Sub subscriber_ role so that the application can publish messages to the Pub/Sub topic.
    
    ```
    gcloud projects add-iam-policy-binding projects/$PROJECT_ID \
      --role=roles/pubsub.subscriber \
      --member=principal://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/$PROJECT_ID.svc.id.goog/subject/ns/default/sa/pubsub-sa
    ```
    
    The preceding command uses a Principal Identifier, which allows IAM to directly refer to a Kubernetes service account.
    
    **Best practice**:
    
    Use Principal identifiers, but consider the limitation in the description of an alternative method.
    

### Legacy authentication

1.  Enable the Pub/Sub API on your project:
    
    ```
    gcloud services enable cloudresourcemanager.googleapis.com pubsub.googleapis.com
    ```
    
2.  Create a Pub/Sub topic and subscription:
    
    ```
    gcloud pubsub topics create echo
    gcloud pubsub subscriptions create echo-read --topic=echo
    ```
    
3.  Create a service account with access to Pub/Sub:
    
    ```
    gcloud iam service-accounts create autoscaling-pubsub-sa
    gcloud projects add-iam-policy-binding $PROJECT_ID \
      --member "serviceAccount:autoscaling-pubsub-sa@$PROJECT_ID.iam.gserviceaccount.com" \
      --role "roles/pubsub.subscriber"
    ```
    
4.  Download the service account key file:
    
    ```
    gcloud iam service-accounts keys create key.json \
      --iam-account autoscaling-pubsub-sa@$PROJECT_ID.iam.gserviceaccount.com
    ```
    
5.  Import the service account key to your cluster as a Secret:
    
    ```
    kubectl create secret generic pubsub-key --from-file=key.json=./key.json
    ```
    
6.  Deploy the application to your cluster:
    
    ```
    kubectl apply -f deployment/pubsub-with-secret.yaml
    ```

### Custom Metric

```
kubectl apply -f custom-metrics-gmp.yaml
```

After waiting a moment for the application to deploy, all Pods reach the `Ready` state:

### Pub/Sub

```
kubectl get pods
```

Output:

```
NAME                     READY   STATUS    RESTARTS   AGE
pubsub-8cd995d7c-bdhqz   1/1     Running   0          58s
```

### Custom Metric

```
kubectl get pods
```

Output:

```
NAME                                  READY   STATUS    RESTARTS   AGE
custom-metrics-gmp-865dffdff9-x2cg9   1/1     Running   0          49s
```

## Viewing metrics on Cloud Monitoring

As your application runs, it writes your metrics to Cloud Monitoring.

To view the metrics for a monitored resource by using the Metrics Explorer, do the following:

1.  In the Google Cloud console, go to the _leaderboard_ **Metrics explorer** page:
    
    Go to **Metrics explorer**
    
    If you use the search bar to find this page, then select the result whose subheading is **Monitoring**.
    
2.  In the **Metric** element, expand the **Select a metric** menu, and then select a resource type and metric type. For example, to chart the CPU utilization of a virtual machine, do the following:
    1.  (Optional) To reduce the menu's options, enter part of the metric name in the **Filter bar**. For this example, enter `utilization`.
    2.  In the **Active resources** menu, select **VM instance**.
    3.  In the **Active metric categories** menu, select **Instance**.
    4.  In the **Active metrics** menu, select **CPU utilization** and then click **Apply**.
3.  To filter which time series are displayed, use the **Filter** element.
    
4.  To combine time series, use the menus on the **Aggregation** element. For example, to display the CPU utilization for your VMs, based on their zone, set the first menu to **Mean** and the second menu to **zone**.
    
    All time series are displayed when the first menu of the **Aggregation** element is set to **Unaggregated**. The default settings for the **Aggregation** element are determined by the metric type you selected.
    

The resource type and metrics are the following:

### Pub/Sub

Metrics Explorer

Resource type: `pubsub_subscription`

Metric: `pubsub.googleapis.com/subscription/num_undelivered_messages`

### Custom Metric

Metrics Explorer

Resource type: `prometheus_target`

Metric: `prometheus.googleapis.com/custom_prometheus/gauge`

Depending on the metric, you might not see much activity on the Cloud Monitoring Metrics Explorer yet. Don't be surprised if your metric isn't updating.

## Creating a HorizontalPodAutoscaler object

When you see your metric in Cloud Monitoring, you can deploy a `HorizontalPodAutoscaler` to resize your Deployment based on your metric.

### Pub/Sub

```
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: pubsub
spec:
  minReplicas: 1
  maxReplicas: 5
  metrics:
  - external:
      metric:
       name: pubsub.googleapis.com|subscription|num_undelivered_messages
       selector:
         matchLabels:
           resource.labels.subscription_id: echo-read
      target:
        type: AverageValue
        averageValue: 2
    type: External
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: pubsub
```

### Custom Metric

```
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: custom-metrics-gmp-hpa
  namespace: default
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: custom-metrics-gmp
  minReplicas: 1
  maxReplicas: 5
  metrics:
  - type: Pods
    pods:
      metric:
        name: prometheus.googleapis.com|custom_prometheus|gauge
      target:
        type: AverageValue
        averageValue: 20
```

Deploy the `HorizontalPodAutoscaler` to your cluster:

### Pub/Sub

```
kubectl apply -f deployment/pubsub-hpa.yaml
```

### Custom Metric

```
kubectl apply -f custom-metrics-gmp-hpa.yaml
```

## Generating load

For some metrics, you might need to generate load to watch the autoscaling:

### Pub/Sub

Publish 200 messages to the Pub/Sub topic:

```
for i in {1..200}; do gcloud pubsub topics publish echo --message="Autoscaling #${i}"; done
```

### Custom Metric

Not Applicable: The code used in this sample exports a constant value of `40` for the custom metric. The HorizontalPodAutoscaler is set with a target value of `20`, so it attempts to scale up the Deployment automatically.

You might need to wait a couple minutes for the HorizontalPodAutoscaler to respond to the metric changes.

## Observing HorizontalPodAutoscaler scaling up

You can check the current number of replicas of your Deployment by running:

```
kubectl get deployments
```

After giving some time for the metric to propagate, the Deployment creates five Pods to handle the backlog.

You can also inspect the state and recent activity of the HorizontalPodAutoscaler by running:

```
kubectl describe hpa
```

## Clean up

To avoid incurring charges to your Google Cloud account for the resources used in this tutorial, either delete the project that contains the resources, or keep the project and delete the individual resources.

### Pub/Sub

1.  Clean up the Pub/Sub subscription and topic:
    
    ```
    gcloud pubsub subscriptions delete echo-read
    gcloud pubsub topics delete echo
    ```
    
2.  Delete your GKE cluster:
    
    ```
    gcloud container clusters delete metrics-autoscaling
    ```
    

### Custom Metric

Delete your GKE cluster:

 ```
 gcloud container clusters delete metrics-autoscaling
```

## What's next

*   Learn more about horizontal Pod autoscaling.
*   Learn more about autoscaling workloads based on metrics.
*   Learn how to configure horizontal Pod autoscaling.
*   Learn how to use the horizontal Pod autoscaler on Pub/Sub.
*   Explore other Kubernetes Engine tutorials.

Send feedback