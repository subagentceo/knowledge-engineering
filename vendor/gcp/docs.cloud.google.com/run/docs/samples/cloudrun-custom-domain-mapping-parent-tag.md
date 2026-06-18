# Map a Cloud Run service to a custom domain

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Cloud Run
*   Samples

# Map a Cloud Run service to a custom domain Stay organized with collections Save and categorize content based on your preferences.

Sample demonstrating how to map your Cloud Run service to a custom domain that you've created. Replace verified-domain.com with your custom verified domain, for example, example.com or subdomain.example.com

## Code sample

### Terraform

To learn how to apply or remove a Terraform configuration, see Basic Terraform commands. For more information, see the Terraform provider reference documentation.

```
resource "google_cloud_run_v2_service" "default" {
  name     = "custom-domain" # Replace with your service name
  location = "us-central1"

  deletion_protection = false # set to true to prevent destruction of the resource

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello" # Replace with your container image
    }
  }
}
data "google_project" "project" {}

resource "google_cloud_run_domain_mapping" "default" {
  name     = "verified-domain.com"
  location = google_cloud_run_v2_service.default.location
  metadata {
    namespace = data.google_project.project.project_id
  }
  spec {
    route_name = google_cloud_run_v2_service.default.name
  }
}
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.