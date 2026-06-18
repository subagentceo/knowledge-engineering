# Train a model with PyTorch, Ray, and Google Kubernetes Engine (GKE)

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   GKE AI/ML
*   Guides

Send feedback

# Train a model with PyTorch, Ray, and Google Kubernetes Engine (GKE) Stay organized with collections Save and categorize content based on your preferences.

Autopilot Standard

You can efficiently train and deploy machine learning (ML) models in a robust, scalable environment. This is possible by combining Ray, PyTorch, and the Ray Operator add-on on Google Kubernetes Engine (GKE). GKE provides the control and performance needed for demanding AI/ML workloads. These workloads include training large foundation models and serving inference requests at scale. In this tutorial, you use GKE's autoscaling and Ray's distributed computing to streamline your machine learning workflows.

## About Ray

Ray is an open-source scalable compute framework for AI/ML applications. Ray Train is a component within Ray designed for distributed model training and fine-tuning. You can use the Ray Train API to scale training across multiple machines and to integrate with machine learning libraries such as PyTorch.

You can deploy Ray training jobs using the RayCluster or RayJob resource. You should use a RayJob resource when deploying Ray jobs in production for the following reasons

*   The RayJob resource creates an ephemeral Ray cluster that can be automatically deleted when a job completes.
*   The RayJob resource supports retry policies for resilient job execution.
*   You can manage Ray jobs using familiar Kubernetes API patterns.

## Objectives

This guide is intended for Generative AI customers, new or existing users of GKE, ML Engineers, MLOps (DevOps) engineers, or platform administrators who are interested in using Kubernetes container orchestration capabilities for serving models using Ray.

*   Create a GKE cluster.
*   Create a Ray cluster using the RayCluster custom resource.
*   Train a model using a Ray job.
*   Deploy a Ray job using the RayJob custom resource.

## Costs

In this document, you use the following billable components of Google Cloud:

*   GKE

To generate a cost estimate based on your projected usage, use the pricing calculator.

New Google Cloud users might be eligible for a free trial.

When you finish the tasks that are described in this document, you can avoid continued billing by deleting the resources that you created. For more information, see Clean up.

## Before you begin

Cloud Shell is preinstalled with the software you need for this tutorial, including `kubectl`, and the gcloud CLI. If you don't use Cloud Shell, you must install the gcloud CLI.

*   Sign in to your Google Cloud account. If you're new to Google Cloud, create an account to evaluate how our products perform in real-world scenarios. New customers also get $300 in free credits to run, test, and deploy workloads.
*   Install the Google Cloud CLI.
    
    **Note:** If you installed the gcloud CLI previously, make sure you have the latest version by running `gcloud components update`.
    
*   If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
*   To initialize the gcloud CLI, run the following command:
    
    gcloud init
    
*   Create or select a Google Cloud project.
    
    **Roles required to select or create a project**
    
    *   **Select a project**: Selecting a project doesn't require a specific IAM role—you can select any project that you've been granted a role on.
    *   **Create a project**: To create a project, you need the Project Creator role (`roles/resourcemanager.projectCreator`), which contains the `resourcemanager.projects.create` permission. Learn how to grant roles.
    
    **Note**: If you don't plan to keep the resources that you create in this procedure, create a project instead of selecting an existing project. After you finish these steps, you can delete the project, removing all resources associated with the project.
    
    *   Create a Google Cloud project:
        
        gcloud projects create PROJECT_ID
        
        Replace `PROJECT_ID` with a name for the Google Cloud project you are creating.
        
    *   Select the Google Cloud project that you created:
        
        gcloud config set project PROJECT_ID
        
        Replace `PROJECT_ID` with your Google Cloud project name.
        
*   Verify that billing is enabled for your Google Cloud project.
    
*   Enable the GKE API:
    
    **Roles required to enable APIs**
    
    To enable APIs, you need the Service Usage Admin IAM role (`roles/serviceusage.serviceUsageAdmin`), which contains the `serviceusage.services.enable` permission. Learn how to grant roles.
    
    gcloud services enable container.googleapis.com
    

*   Install the Google Cloud CLI.
    
    **Note:** If you installed the gcloud CLI previously, make sure you have the latest version by running `gcloud components update`.
    
*   If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
*   To initialize the gcloud CLI, run the following command:
    
    gcloud init
    
*   Create or select a Google Cloud project.
    
    **Roles required to select or create a project**
    
    *   **Select a project**: Selecting a project doesn't require a specific IAM role—you can select any project that you've been granted a role on.
    *   **Create a project**: To create a project, you need the Project Creator role (`roles/resourcemanager.projectCreator`), which contains the `resourcemanager.projects.create` permission. Learn how to grant roles.
    
    **Note**: If you don't plan to keep the resources that you create in this procedure, create a project instead of selecting an existing project. After you finish these steps, you can delete the project, removing all resources associated with the project.
    
    *   Create a Google Cloud project:
        
        gcloud projects create PROJECT_ID
        
        Replace `PROJECT_ID` with a name for the Google Cloud project you are creating.
        
    *   Select the Google Cloud project that you created:
        
        gcloud config set project PROJECT_ID
        
        Replace `PROJECT_ID` with your Google Cloud project name.
        
*   Verify that billing is enabled for your Google Cloud project.
    
*   Enable the GKE API:
    
    **Roles required to enable APIs**
    
    To enable APIs, you need the Service Usage Admin IAM role (`roles/serviceusage.serviceUsageAdmin`), which contains the `serviceusage.services.enable` permission. Learn how to grant roles.
    
    gcloud services enable container.googleapis.com
    

2.  Grant roles to your user account. Run the following command once for each of the following IAM roles: `roles/container.clusterAdmin, roles/container.admin`
    
    gcloud projects add-iam-policy-binding PROJECT_ID --member="user:USER_IDENTIFIER" --role=ROLE
    
    Replace the following:
    
    *   `PROJECT_ID`: Your project ID.
    *   `USER_IDENTIFIER`: The identifier for your user account. For example, `myemail@example.com`.
    *   `ROLE`: The IAM role that you grant to your user account.

### Prepare your environment

To prepare your environment, follow these steps:

1.  Launch a Cloud Shell session from the Google Cloud console, by clicking ![Cloud Shell activation icon](/static/shell/docs/images/activate_cloud_shell.svg) **Activate Cloud Shell** in the Google Cloud console. This launches a session in the bottom pane of the Google Cloud console.
    
2.  Set environment variables:
    
    ```
    export PROJECT_ID=PROJECT_ID
    export CLUSTER_NAME=ray-cluster
    export COMPUTE_REGION=us-central1
    export COMPUTE_ZONE=us-central1-c
    export CLUSTER_VERSION=CLUSTER_VERSION
    export TUTORIAL_HOME=`pwd`
    ```
    
    Replace the following:
    
    *   `PROJECT_ID`: your Google Cloud project ID.
    *   `CLUSTER_VERSION`: the GKE version to use. Must be `1.30.1` or later.
3.  Clone the GitHub repository:
    
    ```
    git clone https://github.com/GoogleCloudPlatform/kubernetes-engine-samples
    ```
    
4.  Change to the working directory:
    
    ```
    cd kubernetes-engine-samples/ai-ml/gke-ray/raytrain/pytorch-mnist
    ```
    
5.  Create a Python virtual environment:
    
    ```
    python -m venv myenv && \
    source myenv/bin/activate
    ```
    
6.  Install Ray.
    

## Create a GKE cluster

Create an Autopilot or Standard GKE cluster:

### Autopilot

Create an Autopilot cluster:

```
gcloud container clusters create-auto ${CLUSTER_NAME}  \
    --enable-ray-operator \
    --cluster-version=${CLUSTER_VERSION} \
    --location=${COMPUTE_REGION}
```

### Standard

Create a Standard cluster:

```
gcloud container clusters create ${CLUSTER_NAME} \
    --addons=RayOperator \
    --cluster-version=${CLUSTER_VERSION}  \
    --machine-type=e2-standard-8 \
    --location=${COMPUTE_ZONE} \
    --num-nodes=4
```

## Deploy a RayCluster resource

Deploy a RayCluster resource to your cluster:

1.  Review the following manifest:
    
    ```
    apiVersion: ray.io/v1
    kind: RayCluster
    metadata:
      name: pytorch-mnist-cluster
    spec:
      rayVersion: '2.37.0'
      headGroupSpec:
        rayStartParams:
          dashboard-host: '0.0.0.0'
        template:
          metadata:
          spec:
            containers:
            - name: ray-head
              image: rayproject/ray:2.37.0
              ports:
              - containerPort: 6379
                name: gcs
              - containerPort: 8265
                name: dashboard
              - containerPort: 10001
                name: client
              resources:
                limits:
                  cpu: "2"
                  ephemeral-storage: "9Gi"
                  memory: "4Gi"
                requests:
                  cpu: "2"
                  ephemeral-storage: "9Gi"
                  memory: "4Gi"
      workerGroupSpecs:
      - replicas: 4
        minReplicas: 1
        maxReplicas: 5
        groupName: worker-group
        rayStartParams: {}
        template:
          spec:
            containers:
            - name: ray-worker
              image: rayproject/ray:2.37.0
              resources:
                limits:
                  cpu: "4"
                  ephemeral-storage: "9Gi"
                  memory: "8Gi"
                requests:
                  cpu: "4"
                  ephemeral-storage: "9Gi"
                  memory: "8Gi"
    ```
    
    This manifest describes a RayCluster custom resource.
    
2.  Apply the manifest to your GKE cluster:
    
    ```
    kubectl apply -f ray-cluster.yaml
    ```
    
3.  Verify the RayCluster resource is ready:
    
    ```
    kubectl get raycluster
    ```
    
    The output is similar to the following:
    
    ```
    NAME                    DESIRED WORKERS   AVAILABLE WORKERS   CPUS   MEMORY   GPUS   STATUS   AGE
    pytorch-mnist-cluster   2                 2                   6      20Gi     0      ready    63s
    ```
    
    In this output, `ready` in the `STATUS` column indicates the RayCluster resource is ready.
    

## Connect to the RayCluster resource

Connect to the RayCluster resource to submit a Ray job.

1.  Verify that GKE created the RayCluster Service:
    
    ```
    kubectl get svc pytorch-mnist-cluster-head-svc
    ```
    
    The output is similar to the following:
    
    ```
    NAME                             TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)                                AGE
    pytorch-mnist-cluster-head-svc   ClusterIP   34.118.238.247   <none>        10001/TCP,8265/TCP,6379/TCP,8080/TCP   109s
    ```
    
2.  Establish a port-forwarding session to the Ray head:
    
    ```
    kubectl port-forward svc/pytorch-mnist-cluster-head-svc 8265:8265 2>&1 >/dev/null &
    ```
    
3.  Verify the Ray client can connect to the Ray cluster using localhost:
    
    ```
    ray list nodes --address http://localhost:8265
    ```
    
    The output is similar to the following:
    
    ```
    Stats:
    ------------------------------
    Total: 3
    
    Table:
    ------------------------------
        NODE_ID                                                   NODE_IP     IS_HEAD_NODE    STATE    NODE_NAME    RESOURCES_TOTAL                 LABELS
    0  1d07447d7d124db641052a3443ed882f913510dbe866719ac36667d2  10.28.1.21  False           ALIVE    10.28.1.21   CPU: 2.0                        ray.io/node_id: 1d07447d7d124db641052a3443ed882f913510dbe866719ac36667d2
    # Several lines of output omitted
    ```
    

## Train a model

Train a PyTorch model using the Fashion MNIST dataset:

1.  Submit a Ray job and wait for the job to complete:
    
    ```
    ray job submit --submission-id pytorch-mnist-job --working-dir . --runtime-env-json='{"pip": ["torch", "torchvision"], "excludes": ["myenv"]}' --address http://localhost:8265 -- python train.py
    ```
    
    The output is similar to the following:
    
    ```
    Job submission server address: http://localhost:8265
    
    --------------------------------------------
    Job 'pytorch-mnist-job' submitted successfully
    --------------------------------------------
    
    Next steps
      Query the logs of the job:
        ray job logs pytorch-mnist-job
      Query the status of the job:
        ray job status pytorch-mnist-job
      Request the job to be stopped:
        ray job stop pytorch-mnist-job
    
    Handling connection for 8265
    Tailing logs until the job exits (disable with --no-wait):
    ...
    ...
    ```
    
2.  Verify the Job status:
    
    ```
    ray job status pytorch-mnist
    ```
    
    The output is similar to the following:
    
    ```
    Job submission server address: http://localhost:8265
    Status for job 'pytorch-mnist-job': RUNNING
    Status message: Job is currently running.
    ```
    
    Wait for the `Status for job` to be `COMPLETE`. This can take 15 minutes or longer.
    
3.  View Ray job logs:
    
    ```
    ray job logs pytorch-mnist
    ```
    
    The output is similar to the following:
    
    ```
    Training started with configuration:
    ╭─────────────────────────────────────────────────╮
    │ Training config                                  │
    ├──────────────────────────────────────────────────┤
    │ train_loop_config/batch_size_per_worker       8  │
    │ train_loop_config/epochs                     10  │
    │ train_loop_config/lr                      0.001  │
    ╰─────────────────────────────────────────────────╯
    
    # Several lines omitted
    
    Training finished iteration 10 at 2024-06-19 08:29:36. Total running time: 9min 18s
    ╭───────────────────────────────╮
    │ Training result                │
    ├────────────────────────────────┤
    │ checkpoint_dir_name            │
    │ time_this_iter_s      25.7394  │
    │ time_total_s          351.233  │
    │ training_iteration         10  │
    │ accuracy               0.8656  │
    │ loss                  0.37827  │
    ╰───────────────────────────────╯
    
    # Several lines omitted
    -------------------------------
    Job 'pytorch-mnist' succeeded
    -------------------------------
    ```
    

## Deploy a RayJob

The RayJob custom resource manages the lifecycle of a RayCluster resource during the execution of a single Ray job.

1.  Review the following manifest:
    
    ```
    apiVersion: ray.io/v1
    kind: RayJob
    metadata:
      name: pytorch-mnist-job
    spec:
      shutdownAfterJobFinishes: true
      entrypoint: python ai-ml/gke-ray/raytrain/pytorch-mnist/train.py
      runtimeEnvYAML: |
        pip:
          - torch
          - torchvision
        working_dir: "https://github.com/GoogleCloudPlatform/kubernetes-engine-samples/archive/main.zip"
        env_vars:
          NUM_WORKERS: "4"
          CPUS_PER_WORKER: "2"
      rayClusterSpec:
        rayVersion: '2.37.0'
        headGroupSpec:
          rayStartParams: {}
          template:
            spec:
              containers:
                - name: ray-head
                  image: rayproject/ray:2.37.0
                  ports:
                    - containerPort: 6379
                      name: gcs-server
                    - containerPort: 8265
                      name: dashboard
                    - containerPort: 10001
                      name: client
                  resources:
                    limits:
                      cpu: "2"
                      ephemeral-storage: "9Gi"
                      memory: "4Gi"
                    requests:
                      cpu: "2"
                      ephemeral-storage: "9Gi"
                      memory: "4Gi"
        workerGroupSpecs:
          - replicas: 4
            minReplicas: 1
            maxReplicas: 5
            groupName: small-group
            rayStartParams: {}
            template:
              spec:
                containers:
                  - name: ray-worker
                    image: rayproject/ray:2.37.0
                    resources:
                      limits:
                        cpu: "4"
                        ephemeral-storage: "9Gi"
                        memory: "8Gi"
                      requests:
                        cpu: "4"
                        ephemeral-storage: "9Gi"
                        memory: "8Gi"
    ```
    
    This manifest describes a RayJob custom resource.
    
2.  Apply the manifest to your GKE cluster:
    
    ```
    kubectl apply -f ray-job.yaml
    ```
    
3.  Verify the RayJob resource is running:
    
    ```
    kubectl get rayjob
    ```
    
    The output is similar to the following:
    
    ```
    NAME                JOB STATUS   DEPLOYMENT STATUS   START TIME             END TIME   AGE
    pytorch-mnist-job   RUNNING      Running             2024-06-19T15:43:32Z              2m29s
    ```
    
    In this output, the `DEPLOYMENT STATUS` column indicates the RayJob resource is `Running`.
    
4.  View the RayJob resource status:
    
    ```
    kubectl logs -f -l job-name=pytorch-mnist-job
    ```
    
    The output is similar to the following:
    
    ```
    Training started with configuration:
    ╭─────────────────────────────────────────────────╮
    │ Training config                                  │
    ├──────────────────────────────────────────────────┤
    │ train_loop_config/batch_size_per_worker       8  │
    │ train_loop_config/epochs                     10  │
    │ train_loop_config/lr                      0.001  │
    ╰─────────────────────────────────────────────────╯
    
    # Several lines omitted
    
    Training finished iteration 10 at 2024-06-19 08:29:36. Total running time: 9min 18s
    ╭───────────────────────────────╮
    │ Training result                │
    ├────────────────────────────────┤
    │ checkpoint_dir_name            │
    │ time_this_iter_s      25.7394  │
    │ time_total_s          351.233  │
    │ training_iteration         10  │
    │ accuracy               0.8656  │
    │ loss                  0.37827  │
    ╰───────────────────────────────╯
    
    # Several lines omitted
    -------------------------------
    Job 'pytorch-mnist' succeeded
    -------------------------------
    ```
    
5.  Verify the Ray job is complete:
    
    ```
    kubectl get rayjob
    ```
    
    The output is similar to the following:
    
    ```
    NAME                JOB STATUS   DEPLOYMENT STATUS   START TIME             END TIME               AGE
    pytorch-mnist-job   SUCCEEDED    Complete            2024-06-19T15:43:32Z   2024-06-19T15:51:12Z   9m6s
    ```
    
    In this output, the `DEPLOYMENT STATUS` column indicates the RayJob resource is `Complete`.
    

## Observe your Ray workloads

To view details for your RayJobs, you can navigate to the **Kubernetes Engine > AI/ML > Jobs** section in Google Cloud console.

View RayJobs in Google Cloud console

## Clean up

### Delete the project

**Caution**: Deleting a project has the following effects:

*   **Everything in the project is deleted.** If you used an existing project for the tasks in this document, when you delete it, you also delete any other work you've done in the project.
*   **Custom project IDs are lost.** When you created this project, you might have created a custom project ID that you want to use in the future. To preserve the URLs that use the project ID, such as an `appspot.com` URL, delete selected resources inside the project instead of deleting the whole project.

If you plan to explore multiple architectures, tutorials, or quickstarts, reusing projects can help you avoid exceeding project quota limits.

Delete a Google Cloud project:

gcloud projects delete PROJECT_ID

### Delete individual resources

If you used an existing project and you don't want to delete it, you can delete the individual resources. To delete the cluster, type:

```
gcloud container clusters delete ${CLUSTER_NAME}
```

## What's next

*   Explore reference architectures, diagrams, and best practices about Google Cloud. Take a look at our Cloud Architecture Center.

Send feedback