# Configure ingress

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Cloud Run
*   Samples

# Configure ingress Stay organized with collections Save and categorize content based on your preferences.

Configure ingress for a Cloud Run service

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Restrict network endpoint ingress for Cloud Run services

## Code sample

### Terraform

To learn how to apply or remove a Terraform configuration, see Basic Terraform commands. For more information, see the Terraform provider reference documentation.

```
resource "google_cloud_run_v2_service" "default" {
  provider = google-beta
  name     = "ingress-service"
  location = "us-central1"

  deletion_protection = false # set to "true" in production

  # For valid annotation values and descriptions, see
  # https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service#ingress
  ingress = "INGRESS_TRAFFIC_INTERNAL_ONLY"

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello" #public image for your service
    }
  }
}
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.