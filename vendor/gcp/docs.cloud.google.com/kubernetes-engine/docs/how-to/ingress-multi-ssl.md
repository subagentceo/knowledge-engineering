# Secure traffic for GKE Ingress

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Google Kubernetes Engine (GKE)
*   GKE networking
*   Guides

Send feedback

# Secure traffic for GKE Ingress Stay organized with collections Save and categorize content based on your preferences.

Autopilot Standard

This page shows you how to secure and optimize traffic for Google Kubernetes Engine (GKE) Ingress. You can configure SSL certificates between the client and the load balancer, and secure traffic between the load balancer and your backend application. Before you continue, ensure that you're familiar with how GKE secures Ingress with HTTPS.

This page is for Networking specialists who design and architect the network for their organization and install, configure, and support network equipment. To learn more about common roles and example tasks that we reference in Google Cloud content, see Common GKE user roles and tasks.

## Secure and optimize traffic between client and load balancer

To accept HTTPS requests from your clients, the load balancer must have a certificate to prove its identity to your clients. The load balancer must also have a private key to complete the HTTPS handshake. To learn more about providing SSL certificates to an HTTP(S) load balancer, see Configuring TLS between the client and the load balancer.

### Use Google-managed certificates

To configure one or more Google-managed SSL certificates and associate them with an Ingress, you need to:

*   Create one or more `ManagedCertificate` objects in the same namespace as the Ingress. You can specify up to 15 certificates for the load balancer
*   Associate the `ManagedCertificate` objects to an Ingress by adding the `networking.gke.io/managed-certificates` annotation to the Ingress. This annotation is a comma-separated list of `ManagedCertificate` objects.

**Note:** Using Google-managed SSL certificates with Ingress doesn't affect how you configure Ingress traffic rules.

#### Limitations

This section describes the limitations of Google-managed certificates. If you require self-managed certificates or if you already own SSL certificates that you would like to configure on your Ingress, see Setting up HTTPS (TLS) between client and load balancer.

*   Google-managed certificates are less flexible than certificates you obtain and manage yourself. Google-managed certificates support up to 100 non-wildcard domains. Unlike self-managed certificates, Google-managed certificates don't support wildcard domains.
    
*   The number and type of certificates supported by an Ingress are defined by the limits of Google-managed SSL certificates.
    
*   Updates on Google-managed certificates are not supported. For more information, see Manually updating a Google-managed certificate.
    
*   If the certificate is revoked directly with the Certificate Authority, Google does not automatically rotate the certificate. You must delete the ManagedCertificate and create a new one.
    
*   GKE Ingress does not support certificates managed by Certificate Manager. To use certificates managed by Certificate Manager, use the Gateway API.
    

**Warning:** The load balancer's target proxy created by ingress resource can reference up to 15 Compute Engine SSL certificates. The Ingress annotation `ingress.gcp.kubernetes.io/pre-shared-cert` includes all SSL certificates `managed-certificates` and `self-managed` that are provisioned with the load balancer's target proxy.

#### Prerequisites

*   You must own the domain name. The domain name must be no longer than 63 characters. You can use any domain name registrar to obtain a domain name.
    
    **Note:** Google Domains is no longer in operation. Squarespace now manages domains previously purchased from Google Domains. You can manage your domain and its DNS records from your Squarespace account.
    
*   If you use a GKE Standard cluster, the `HttpLoadBalancing` add-on must be enabled.
    
*   Your Ingress manifest must include the `kubernetes.io/ingress.class: "gce"` annotation. The `ingressClassName` field is not supported.
    
*   You must apply `Ingress` and `ManagedCertificate` resources in the same project and namespace.
    
*   Create a reserved (static) external IP address. Reserving a static IP address helps ensure that it remains yours, even if you delete the Ingress. If you don't reserve an IP address, it might change, requiring you to reconfigure your domain's DNS records. Use Google Cloud CLI or the Google Cloud console to create a reserved IP address.
    
    ### gcloud
    
    To create a reserved IP address, run the following command:
    
    ```
    gcloud compute addresses create ADDRESS_NAME --global
    ```
    
    Replace `ADDRESS_NAME` with the name of the reserved IP address you are creating.
    
    To find the static IP address you created, run the following command:
    
    ```
    gcloud compute addresses describe ADDRESS_NAME --global
    ```
    
    The output is similar to the following:
    
    ```
    address: 203.0.113.32
    ...
    ```
    
    ### Console
    
    To create a reserved IP address, perform the following steps:
    
    1.  Go to the **External IP addresses** page in the Google Cloud console.
        
        Go to External IP addresses
        
    2.  Specify a name for the IP address (for example, `example-ip-address`).
        
    3.  Specify if you want an **IPv4** or **IPv6** address.
        
    4.  Select the **Global** option for **Type**.
        
    5.  Click **Reserve**. The IP address is listed in the **External Address** column.
        
    
    ### Config Connector
    
    **Note:** This step requires Config Connector. Follow the installation instructions to install Config Connector on your cluster.
    
    ```
    apiVersion: compute.cnrm.cloud.google.com/v1beta1
    kind: ComputeAddress
    metadata:
      name: example-ip-address
    spec:
      location: global
    ```
    
    To deploy this manifest, download it to your machine as `compute-address.yaml`, and run:
    
    ```
    kubectl apply -f compute-address.yaml
    ```
    

#### Setting up a Google-managed certificate

1.  Create a `ManagedCertificate` object. This resource specifies the domains for the SSL certificate. Wildcard domains are not supported.
    
    The following manifest describes a `ManagedCertificate` object. Save the manifest as `managed-cert.yaml`.
    
    ```
    apiVersion: networking.gke.io/v1
    kind: ManagedCertificate
    metadata:
      name: FIRST_CERT_NAME
    spec:
      domains:
        - FIRST_DOMAIN
    ---
    apiVersion: networking.gke.io/v1
    kind: ManagedCertificate
    metadata:
      name: SECOND_CERT_NAME
    spec:
      domains:
        - SECOND_DOMAIN
    ```
    
    Replace the following:
    
    *   `FIRST_CERT_NAME`: the name of your first `ManagedCertificate` object.
    *   `FIRST_DOMAIN`: the first domain that you own.
    *   `SECOND_CERT_NAME`: the name of the second `ManagedCertificate` object.
    *   `SECOND_DOMAIN`: the second domain that you own.
    
    The names of the `ManagedCertificate` objects are different from the names of the actual certificates that they create. You only need to know the names of the `ManagedCertificate` objects to use them in your Ingress.
    
2.  Apply the manifest to your cluster:
    
    ```
    kubectl apply -f managed-cert.yaml
    ```
    
3.  Follow the instructions to create a Deployment and a Service to expose your application to the internet.
    
4.  For this `ManagedCertificate` object to become `Active`, attach it to your Ingress by using the `networking.gke.io/managed-certificates` annotation, as in the following example. The `ManagedCertificate` does not have to already be `Active` for you to attach it to an Ingress.
    
     ```
     apiVersion: networking.k8s.io/v1
     kind: Ingress
     metadata:
       name: my-gmc-ingress
       annotations:
         networking.gke.io/managed-certificates: "FIRST_CERT_NAME,SECOND_CERT_NAME"
     spec:
       rules:
       - host: FIRST_DOMAIN
         http:
           paths:
           - pathType: ImplementationSpecific
             backend:
               service:
                 name: my-mc-service
                 port:
                   number: 60001
       - host: SECOND_DOMAIN
         http:
           paths:
           - pathType: ImplementationSpecific
             backend:
               service:
                 name: my-mc-service
                 port:
                   number: 60002
     ```
    
    Replace <code><var>FIRST_DOMAIN</var></code> and
    <code><var>SECOND_DOMAIN</var></code> with your domain names.
    
    This manifest describes an Ingress that lists pre-shared certificate
    resources in an annotation.
    
    Note: It might take several hours for Google Cloud to provision the load
    balancer and the managed certificates, and for the load balancer to begin
    using the new certificates. For more information, see
    [Deploy a Google-managed certificate with load balancer authorization](/certificate-manager/docs/deploy-google-managed-lb-auth#wait_until_the_certificate_has_been_activated).
    ```
    
5.  Wait for the Google-managed certificates to finish provisioning. This might take up to 60 minutes. You can check the status of the certificates using the following command:
    
    ```
    kubectl describe managedcertificate managed-cert
    ```
    
    The output is similar to the following:
    
    ```
    Name:         managed-cert
    Namespace:    default
    Labels:       <none>
    Annotations:  <none>
    API Version:  networking.gke.io/v1
    Kind:         ManagedCertificate
    (...)
    Spec:
     Domains:
       FQDN_1
       FQDN_2
    Status:
     CertificateStatus: Active
    (...)
    ```
    
    The value of the `Status.CertificateStatus` field indicates the certificate is provisioned. If `Status.CertificateStatus` is not `Active`, the certificate is not yet provisioned.
    
6.  Verify that SSL is working by visiting your domains using the `https://` prefix. Your browser indicates that the connection is secure and you can view the certificate details.
    

#### Migrating to Google-managed certificates from self-managed certificates

When you migrate an Ingress from using self-managed SSL certificates to Google-managed SSL certificates, don't delete any self-managed SSL certificates before the Google-managed SSL certificates are active. After the Google-managed SSL certificates are successfully provisioned, they automatically become active. When the Google-managed SSL certificates are active, you can delete your self-managed SSL certificates.

Use these instructions for migrating from self-managed to Google-managed SSL certificates.

1.  Add a new Google-managed certificate to the Ingress, as described in the preceding section.
2.  Wait until the status of the Google-managed certificate resource is `Active`. Check the status of the certificate with the following command:
    
    ```
    kubectl describe managedcertificate managed-cert
    ```
    
3.  When the status is `Active`, update the Ingress to remove the references to the self-managed certificate.
    

#### Removing a Google-managed certificate

To remove a Google-managed certificate from your cluster you must delete the `ManagedCertificate` object and remove the Ingress annotation that references it.

1.  Delete the `ManagedCertificate` object:
    
    ```
    kubectl delete -f managed-cert.yaml
    ```
    
    The output is similar to the following:
    
    ```
    managedcertificate.networking.gke.io "managed-cert" deleted
    ```
    
2.  Remove the annotation from the Ingress:
    
    ```
    kubectl annotate ingress managed-cert-ingress networking.gke.io/managed-certificates-
    ```
    
    Notice the minus sign, `-`, at the end of the command.
    
3.  Release the static IP address that you reserved for your load balancer.
    
    You can use the Google Cloud CLI, the Google Cloud console, or Config Connector to release a reserved IP address.
    
    ### gcloud
    
    Use the following command to release the reserved IP address:
    
    ```
    gcloud compute addresses delete ADDRESS_NAME --global
    ```
    
    Replace `ADDRESS_NAME` with the name of the IP address.
    
    ### Console
    
    To release the reserved IP address, perform the following steps:
    
    1.  Go to the **External IP addresses** page in the Google Cloud console.
        
        Go to External IP addresses
        
    2.  Select the checkbox next to the IP address you want to release.
        
    3.  Click **Release IP address**.
        
    
    ### Config Connector
    
    **Note:** This step requires Config Connector. Follow the installation instructions to install Config Connector on your cluster.
    
    ```
    apiVersion: compute.cnrm.cloud.google.com/v1beta1
    kind: ComputeAddress
    metadata:
      name: example-ip-address
    spec:
      location: global
    ```
    
    To deploy this manifest, download it to your machine as `compute-address.yaml`, and run:
    
    ```
    kubectl delete -f compute-address.yaml
    ```
    

### Create certificates and keys

To use pre-shared certificates or Kubernetes Secrets, you first need one or more certificates, with corresponding private keys. Each certificate must have a Common Name (CN) that is equal to a domain name that you own. If you already have two certificate files with the appropriate values for Common Name, you can skip ahead to the next section.

1.  Create your first key:
    
    ```
    openssl genrsa -out test-ingress-1.key 2048
    ```
    
2.  Create your first certificate signing request:
    
    ```
    openssl req -new -key test-ingress-1.key -out test-ingress-1.csr \
        -subj "/CN=FIRST_DOMAIN"
    ```
    
    Replace `FIRST_DOMAIN` with a domain name that you own, such as `example.com`.
    
3.  Create your first certificate:
    
    ```
    openssl x509 -req -days 365 -in test-ingress-1.csr -signkey test-ingress-1.key \
        -out test-ingress-1.crt
    ```
    
4.  Create your second key:
    
    ```
    openssl genrsa -out test-ingress-2.key 2048
    ```
    
5.  Create your second certificate signing request:
    
    ```
    openssl req -new -key test-ingress-2.key -out test-ingress-2.csr \
        -subj "/CN=SECOND_DOMAIN"
    ```
    
    Replace `SECOND_DOMAIN` with another domain name that you own, such as `examplepetstore.com`.
    
6.  Create your second certificate:
    
    ```
    openssl x509 -req -days 365 -in test-ingress-2.csr -signkey test-ingress-2.key \
        -out test-ingress-2.crt
    ```
    

For more information about certificates and keys, see the SSL certificates overview.

You now have two certificate files and two key files.

The remaining tasks use the following placeholders to refer to your domains, certificates, and keys:

*   `FIRST_CERT_FILE`: the path to your first certificate file.
*   `FIRST_KEY_FILE`: the path to the key file that goes with your first certificate.
*   `FIRST_DOMAIN`: a domain name that you own.
*   `FIRST_SECRET_NAME`: the name of the Secret containing your first certificate and key.
*   `SECOND_CERT_FILE`: the path to your second certificate file.
*   `SECOND_KEY_FILE`: the path to the key file that goes with your second certificate.
*   `SECOND_DOMAIN`: a second domain name that you own.
*   `SECOND_SECRET_NAME`: the name of the Secret containing your second certificate and key.

**Note:** The words FIRST and SECOND don't designate an order. They help to keep track of your two domains, your two certificate files, and the corresponding key files.

### Use pre-shared certificates

You can use self-managed SSL certificates that you upload to your Google Cloud project. These are called pre-shared certificates. You can specify one or more pre-shared certificates for an Ingress.

To use multiple pre-shared certificates, follow these steps:

1.  For each of your certificate and key pairs, create a publicly-visible SSL certificate resource in Google Cloud.
    
     ```
     gcloud compute ssl-certificates create FIRST_CERT_NAME \
         --certificate=FIRST_CERT_FILE \
         --private-key=FIRST_KEY_FILE
     ```
    
    ```sh
     gcloud compute ssl-certificates create SECOND_CERT_NAME \
         --certificate=SECOND_CERT_FILE \
         --private-key=SECOND_KEY_FILE
     ```
    
    Replace the following:
    ```
    *   `FIRST_CERT_NAME`, `SECOND_CERT_NAME`: the names of your first and second certificates.
    *   `FIRST_CERT_FILE`, `SECOND_CERT_FILE`: your first and second certificate files.
    *   `FIRST_KEY_FILE`:, `SECOND_KEY_FILE` your first and second key files.
2.  In your Ingress manifest, add the `ingress.gcp.kubernetes.io/pre-shared-cert` annotation. The value of the annotation is a comma-separated list of your certificate names. Also, in the `spec.rules` section, include the `host` fields to specify the domains for your services.
    
     ```
     apiVersion: networking.k8s.io/v1
     kind: Ingress
     metadata:
       name: my-psc-ingress
       annotations:
         ingress.gcp.kubernetes.io/pre-shared-cert: "FIRST_CERT_NAME,SECOND_CERT_NAME"
     spec:
       rules:
       - host: FIRST_DOMAIN
         http:
           paths:
           - pathType: ImplementationSpecific
             backend:
               service:
                 name: my-mc-service
                 port:
                   number: 60001
       - host: SECOND_DOMAIN
         http:
           paths:
           - pathType: ImplementationSpecific
             backend:
               service:
                 name: my-mc-service
                 port:
                   number: 60002
     ```
    
    Replace <code><var>FIRST_DOMAIN</var></code> and
    <code><var>SECOND_DOMAIN</var></code> with your domain names.
    
    This manifest describes an Ingress that lists pre-shared certificate
    resources in an annotation.
    ```
    

### Use Kubernetes Secrets

To provide an HTTP(S) load balancer with a certificates and keys that you created yourself, create one or more Kubernetes Secret objects. Each Secret holds a certificate and key. You add the Secrets to the `tls` field of your `Ingress` manifest. The load balancer uses Server Name Indication (SNI) to determine which certificate to present to the client, based on the domain name in the TLS handshake.

To use multiple certificates, follow these steps:

1.  Create a Secret for each of your certificate and key pairs:
    
     ```
     kubectl create secret tls FIRST_SECRET_NAME \
         --cert=FIRST_CERT_FILE \
         --key=FIRST_KEY_FILE
     ```
    
    ```sh
     kubectl create secret tls SECOND_SECRET_NAME \
         --cert=SECOND_CERT_FILE \
         --key=SECOND_KEY_FILE
     ```
    ```
    
2.  In your Ingress manifest, in the `spec.tls` section, list the Secrets that you created. Also, in the `spec.rules` section, include the `host` fields to specify the domains for your services.
    
    ```
    apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: my-mc-ingress
    spec:
      tls:
      - secretName: FIRST_SECRET_NAME
      - secretName: SECOND_SECRET_NAME
      rules:
      - host: FIRST_DOMAIN
        http:
          paths:
          - pathType: ImplementationSpecific
            backend:
              service:
                name: my-mc-service
                port:
                  number: 60001
      - host: SECOND_DOMAIN
        http:
          paths:
          - pathType: ImplementationSpecific
            backend:
              service:
                name: my-mc-service
                port:
                  number: 60002
    ```
    
    Replace `FIRST_DOMAIN` and `SECOND_DOMAIN` with domain names that you own, for example `example.com` and `examplepetstore.com`.
    

Changes to Secrets are picked up periodically so if you modify the data inside of the Secret, it will take a max of 10 minutes for those changes to be applied to the load balancer.

To secure HTTPS encrypted Ingress for your GKE clusters, see example Secure Ingress.

### Disabling HTTP

If you want all traffic between the client and the load balancer to use HTTPS, you can disable HTTP by including the `kubernetes.io/ingress.allow-http` annotation in your Ingress manifest. Set the value of the annotation to `"false"`.

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress-2
  annotations:
    kubernetes.io/ingress.allow-http: "false"
spec:
  tls:
  - secretName: SECRET_NAME
  ...
```

This manifests includes the `SECRET_NAME` that is the name of the Secret you created.

**Note:** If you are using the annotation `networking.gke.io/managed-certificates` you cannot use the annotation `kubernetes.io/ingress.allow-http: false`. You can update the Ingress and add the annotation `kubernetes.io/ingress.allow-http: false` only after the external Application Load Balancer is fully programmed.

**Caution:** Disabling HTTP is not supported for Multi Cluster Ingress.

### HTTP/2 between client and load balancer

Clients can use HTTP/2 to send requests to the load balancer. No configuration is required.

## Secure and optimize traffic between load balancer and application

You can configure the protocol used for communication between the load balancer and your application Pods to ensure end-to-end security or to optimize internal traffic performance. While the load balancer defaults to unencrypted HTTP/1.1 for backend connections, you can enable HTTPS or HTTP/2 to meet your application's specific requirements.

### HTTPS between load balancer and application

If your application, running in a GKE Pod, is capable of receiving HTTPS requests, you can configure the load balancer to use HTTPS when it forwards requests to your application. For more information, see HTTPS (TLS) between load balancer and your application.

To configure the protocol used between the load balancer and your application, use the `cloud.google.com/app-protocols` annotation in your Service manifest. This Service manifest must include `type: NodePort` unless you're using container-native load balancing. If you use container-native load balancing, use the `type: ClusterIP`.

The following Service manifest specifies two ports. The annotation says that when an HTTP(S) load balancer targets port 80 of the Service, it should use HTTP. And when the load balancer targets port 443 of the Service, it should use HTTPS.

The Service manifest must include a `name` value in the port annotation. You can only edit the Service port by referring to its assigned `name`, not by its `targetPort` value.

**Caution:** To limit potential downtime, don't edit the Service's port name when you enable this feature. If your Service's port doesn't have a name, use the empty port name as the key in the annotation, similar to `cloud.google.com/app-protocols: '{"": "HTTPS"}'`. Editing the port name or annotation after the initial setup might cause downtime for your applications.

```
apiVersion: v1
kind: Service
metadata:
  name: my-service-3
  annotations:
    cloud.google.com/app-protocols: '{"my-https-port":"HTTPS","my-http-port":"HTTP"}'
spec:
  type: NodePort
  selector:
    app: metrics
    department: sales
  ports:
  - name: my-https-port
    port: 443
    targetPort: 8443
  - name: my-http-port
    port: 80
    targetPort: 50001
```

### Use HTTP/2 between load balancer and application

If your application, running in a GKE Pod, is capable of receiving HTTP/2 requests, you can configure the load balancer to use HTTP/2 when it forwards requests to your application.

To enable HTTP/2, you must use the `cloud.google.com/app-protocols` annotation on the Kubernetes Service manifest. This annotation specifies the protocol the load balancer uses to communicate with your application. To ensure that the load balancer makes a correct HTTP/2 request to your backend, your backend must be configured with SSL.

The following is an example of a Service manifest configured for HTTP/2:

```
apiVersion: v1
kind: Service
metadata:
  name: my-http2-service
  annotations:
    cloud.google.com/app-protocols: '{"my-port":"HTTP2"}'
spec:
  type: NodePort
  selector:
    app: my-app
  ports:
  - name: my-port
    protocol: TCP
    port: 443
    targetPort: 8443
```

Note the following:

*   The `cloud.google.com/app-protocols` annotation is set to `'{"my-port":"HTTP2"}'`, which instructs the load balancer to use HTTP/2 for traffic sent to the port named `my-port`.
*   The port is set to `443` and directs traffic to Pods on `targetPort` `8443`.

Send feedback