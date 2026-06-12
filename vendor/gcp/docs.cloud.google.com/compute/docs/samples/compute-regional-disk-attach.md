# Attach a regional disk to a Compute Engine VM instance in read-write mode

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Samples

# Attach a regional disk to a Compute Engine VM instance in read-write mode Stay organized with collections Save and categorize content based on your preferences.

Attach a regional disk to a single virtual machine running in Google Compute Engine. The disk also needs to be mounted by the operating system before it can be used. The disk is attached in read-write mode. The disk can only be attached to one VM instance at a time.

## Code sample

### Go

Before trying this sample, follow the Go setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Go API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
import (
	"context"
	"fmt"
	"io"

	compute "cloud.google.com/go/compute/apiv1"
	computepb "cloud.google.com/go/compute/apiv1/computepb"
)

// Attaches the provided regional disk in read-write mode to the given VM
func attachRegionalDisk(w io.Writer, projectID, zone, instanceName, diskUrl string) error {
	// projectID := "your_project_id"
	// zone := "us-west3-a" // refers to the instance, not the disk
	// instanceName := "your_instance_name"
	// diskUrl := "projects/your_project/regions/europe-west3/disks/your_disk"

	ctx := context.Background()
	instancesClient, err := compute.NewInstancesRESTClient(ctx)
	if err != nil {
		return err
	}
	defer instancesClient.Close()

	req := &computepb.AttachDiskInstanceRequest{
		AttachedDiskResource: &computepb.AttachedDisk{
			Source: &diskUrl,
			// In case you want to force attach the disk
			// ForceAttach: proto.Bool(true),
		},
		Instance: instanceName,
		Project:  projectID,
		Zone:     zone,
	}

	op, err := instancesClient.AttachDisk(ctx, req)
	if err != nil {
		return fmt.Errorf("unable to attach disk: %w", err)
	}

	if err = op.Wait(ctx); err != nil {
		return fmt.Errorf("unable to wait for the operation: %w", err)
	}

	fmt.Fprintf(w, "Disk attached\n")

	return nil
}
```

### Java

Before trying this sample, follow the Java setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Java API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```

import com.google.cloud.compute.v1.AttachDiskInstanceRequest;
import com.google.cloud.compute.v1.AttachedDisk;
import com.google.cloud.compute.v1.InstancesClient;
import com.google.cloud.compute.v1.Operation;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class AttachDisk {

  public static void main(String[] args)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    // TODO(developer): Replace these variables before running the sample.
    // Project ID or project number of the Cloud project you want to use.
    String projectId = "your-project-id";

    // Name of the zone in which the instance you want to use resides.
    String zone = "zone-name";

    // Name of the compute instance you want to attach a disk to.
    String instanceName = "instance-name";

    // Full or partial URL of a persistent disk that you want to attach. This can be either
    // be a regional or zonal disk.
    // Valid formats:
    //     * https://www.googleapis.com/compute/v1/projects/{project}/zones/{zone}/disks/{disk_name}
    //     * /projects/{project}/zones/{zone}/disks/{disk_name}
    //     * /projects/{project}/regions/{region}/disks/{disk_name}
    String diskLink = String.format("/projects/%s/zones/%s/disks/%s",
        "project", "zone", "disk_name");

    // Specifies in what mode the disk will be attached to the instance. Available options are
    // `READ_ONLY` and `READ_WRITE`. Disk in `READ_ONLY` mode can be attached to
    // multiple instances at once.
    String mode = "READ_ONLY";

    attachDisk(projectId, zone, instanceName, diskLink, mode);
  }

  // Attaches a non-boot persistent disk to a specified compute instance.
  // The disk might be zonal or regional.
  // You need following permissions to execute this action:
  // https://cloud.google.com/compute/docs/disks/regional-persistent-disk#expandable-1
  public static void attachDisk(String projectId, String zone, String instanceName, String diskLink,
      String mode)
      throws IOException, ExecutionException, InterruptedException, TimeoutException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests. After completing all of your requests, call
    // the `instancesClient.close()` method on the client to safely
    // clean up any remaining background resources.
    try (InstancesClient instancesClient = InstancesClient.create()) {

      AttachDiskInstanceRequest attachDiskInstanceRequest = AttachDiskInstanceRequest.newBuilder()
          .setProject(projectId)
          .setZone(zone)
          .setInstance(instanceName)
          .setAttachedDiskResource(AttachedDisk.newBuilder()
              .setSource(diskLink)
              .setMode(mode)
              .build())
          .build();

      Operation response = instancesClient.attachDiskAsync(attachDiskInstanceRequest)
          .get(3, TimeUnit.MINUTES);

      if (response.hasError()) {
        System.out.println("Attach disk failed! " + response);
        return;
      }
      System.out.println("Attach disk - operation status: " + response.getStatus());
    }
  }
}
```

### Python

Before trying this sample, follow the Python setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Python API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for a local development environment.

```
from __future__ import annotations

import sys
from typing import Any

from google.api_core.extended_operation import ExtendedOperation
from google.cloud import compute_v1


def wait_for_extended_operation(
    operation: ExtendedOperation, verbose_name: str = "operation", timeout: int = 300
) -> Any:
    """
    Waits for the extended (long-running) operation to complete.

    If the operation is successful, it will return its result.
    If the operation ends with an error, an exception will be raised.
    If there were any warnings during the execution of the operation
    they will be printed to sys.stderr.

    Args:
        operation: a long-running operation you want to wait on.
        verbose_name: (optional) a more verbose name of the operation,
            used only during error and warning reporting.
        timeout: how long (in seconds) to wait for operation to finish.
            If None, wait indefinitely.

    Returns:
        Whatever the operation.result() returns.

    Raises:
        This method will raise the exception received from `operation.exception()`
        or RuntimeError if there is no exception set, but there is an `error_code`
        set for the `operation`.

        In case of an operation taking longer than `timeout` seconds to complete,
        a `concurrent.futures.TimeoutError` will be raised.
    """
    result = operation.result(timeout=timeout)

    if operation.error_code:
        print(
            f"Error during {verbose_name}: [Code: {operation.error_code}]: {operation.error_message}",
            file=sys.stderr,
            flush=True,
        )
        print(f"Operation ID: {operation.name}", file=sys.stderr, flush=True)
        raise operation.exception() or RuntimeError(operation.error_message)

    if operation.warnings:
        print(f"Warnings during {verbose_name}:\n", file=sys.stderr, flush=True)
        for warning in operation.warnings:
            print(f" - {warning.code}: {warning.message}", file=sys.stderr, flush=True)

    return result


def attach_disk(
    project_id: str, zone: str, instance_name: str, disk_link: str, mode: str
) -> None:
    """
    Attaches a non-boot persistent disk to a specified compute instance. The disk might be zonal or regional.

    You need following permissions to execute this action:
    https://cloud.google.com/compute/docs/disks/regional-persistent-disk#expandable-1

    Args:
        project_id: project ID or project number of the Cloud project you want to use.
        zone:name of the zone in which the instance you want to use resides.
        instance_name: name of the compute instance you want to attach a disk to.
        disk_link: full or partial URL to a persistent disk that you want to attach. This can be either
            regional or zonal disk.
            Expected formats:
                * https://www.googleapis.com/compute/v1/projects/[project]/zones/[zone]/disks/[disk_name]
                * /projects/[project]/zones/[zone]/disks/[disk_name]
                * /projects/[project]/regions/[region]/disks/[disk_name]
        mode: Specifies in what mode the disk will be attached to the instance. Available options are `READ_ONLY`
            and `READ_WRITE`. Disk in `READ_ONLY` mode can be attached to multiple instances at once.
    """
    instances_client = compute_v1.InstancesClient()

    request = compute_v1.AttachDiskInstanceRequest()
    request.project = project_id
    request.zone = zone
    request.instance = instance_name
    request.attached_disk_resource = compute_v1.AttachedDisk()
    request.attached_disk_resource.source = disk_link
    request.attached_disk_resource.mode = mode

    operation = instances_client.attach_disk(request)

    wait_for_extended_operation(operation, "disk attachement")
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.