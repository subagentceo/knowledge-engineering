# Create a MIG with stateful disks that are deleted when its VM gets permanently deleted

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Samples

# Create a MIG with stateful disks that are deleted when its VM gets permanently deleted Stay organized with collections Save and categorize content based on your preferences.

This sample creates a managed instance group (MIG) with stateful disks and sets the disks to delete when its VM is permanently deleted from the MIG.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Configuring stateful persistent disks in MIGs

## Code sample

### Terraform

To learn how to apply or remove a Terraform configuration, see Basic Terraform commands. For more information, see the Terraform provider reference documentation.

```
resource "google_compute_instance_group_manager" "default" {
  name               = "example-database-group"
  base_instance_name = "shard"
  target_size        = 12
  zone               = "us-central1-f"
  version {
    instance_template = google_compute_instance_template.default.id
    name              = "primary"
  }
  stateful_disk {
    device_name = "data-disk"
    delete_rule = "ON_PERMANENT_INSTANCE_DELETION"
  }
}
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.