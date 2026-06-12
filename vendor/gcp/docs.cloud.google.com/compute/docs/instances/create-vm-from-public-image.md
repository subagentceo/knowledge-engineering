# Create an instance from a public image

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Compute
*   Compute Engine
*   Guides

Send feedback

# Create an instance from a public image Stay organized with collections Save and categorize content based on your preferences.

An instance contains a bootloader, a boot file system, and an OS image. This document explains how to create an instance from a public OS image. If you are creating an Arm instance, then choose an OS image that is Arm-compatible.

Some images support Shielded VM features, which offer security features such as UEFI-compliant firmware, Secure Boot, and vTPM-protected Measured Boot. On Shielded VMs, vTPM and integrity monitoring are enabled by default.

## Before you begin

*   When creating instances from images by using the Google Cloud CLI or the Compute Engine API, there's a limit of 20 instances per second. If you need to create a higher number of instances per second, request a quota adjustment for the **Images** resource.

If you are bringing an existing license for your image, see Bringing your own licenses.

*   If you haven't already, set up authentication. Authentication verifies your identity for access to Google Cloud services and APIs. To run code or samples from a local development environment, you can authenticate to Compute Engine by selecting one of the following options:
    
    Select the tab for how you plan to use the samples on this page:
    
    ### Console
    
    When you use the Google Cloud console to access Google Cloud services and APIs, you don't need to set up authentication.
    
    ### gcloud
    
    1.  Install the Google Cloud CLI. After installation, initialize the Google Cloud CLI by running the following command:
        
        gcloud init
        
        If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
        
        **Note:** If you installed the gcloud CLI previously, make sure you have the latest version by running `gcloud components update`.
        
    2.  Set a default region and zone.
    
    ### REST
    
    To use the REST API samples on this page in a local development environment, you use the credentials you provide to the gcloud CLI.
    
    Install the Google Cloud CLI.
    
    If you're using an external identity provider (IdP), you must first sign in to the gcloud CLI with your federated identity.
    
    For more information, see Authenticate for using REST in the Google Cloud authentication documentation.
    

### Required roles

To get the permission that you need to create an instance from a public image, ask your administrator to grant you the Compute Instance Admin (v1) (`roles/compute.instanceAdmin.v1`) IAM role on the project. For more information about granting roles, see Manage access to projects, folders, and organizations.

This predefined role contains the `compute.instances.create` permission, which is required to create an instance from a public image.

You might also be able to get this permission with custom roles or other predefined roles.

## View a list of public images available on Compute Engine

Before you create an instance by using a public image, review the list of public images that are available on Compute Engine.

For more information about the features available with each public image, see Feature support by operating system.

### Console

1.  In the Google Cloud console, go to the **Images** page.
    
    Go to Images
    

### gcloud

1.  Run the following command:
    
    gcloud compute images list
    
2.  Make a note of the name of the image or image family and the name of the project containing the image.
    
3.  Optional: To determine whether the image supports Shielded VM features, run the following command:
    
    gcloud compute images describe IMAGE_NAME \
        --project=IMAGE_PROJECT
    
    Replace the following:
    
    *   `IMAGE_NAME`: name of the image to check for support of Shielded VM features
    *   `IMAGE_PROJECT`: project containing the image
    
    If the image supports Shielded VM features, the following line appears in the output: `type: UEFI_COMPATIBLE`.
    

### C#

Before trying this sample, follow the C# setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine C# API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```

using Google.Cloud.Compute.V1;
using System;
using System.Threading.Tasks;

public class ListImagesAsyncSample
{
    public async Task ListImagesAsync(
        // TODO(developer): Set your own default values for these parameters or pass different values when calling this method.
        string projectId = "your-project-id")
    {
        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        ImagesClient client = await ImagesClient.CreateAsync();

        // Make the request to list all non-deprecated images in a project.
        ListImagesRequest request = new ListImagesRequest
        {
            Project = projectId,
            // Listing only non-deprecated images to reduce the size of the reply.
            Filter = "deprecated.state != DEPRECATED",
            // MaxResults indicates the maximum number of items that will be returned per page.
            MaxResults = 100
        };

        // Although the MaxResults parameter is specified in the request, the sequence returned
        // by the ListAsync() method hides the pagination mechanic. The library makes multiple
        // requests to the API for you, so you can simply iterate over all the images.
        await foreach (var image in client.ListAsync(request))
        {
            // The result is an Image collection.
            Console.WriteLine($"Image: {image.Name}");
        }
    }
}
```

### Go

Before trying this sample, follow the Go setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Go API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
import (
	"context"
	"fmt"
	"io"

	compute "cloud.google.com/go/compute/apiv1"
	computepb "cloud.google.com/go/compute/apiv1/computepb"
	"google.golang.org/api/iterator"
	"google.golang.org/protobuf/proto"
)

// printImagesList prints a list of all non-deprecated image names available in given project.
func printImagesList(w io.Writer, projectID string) error {
	// projectID := "your_project_id"
	ctx := context.Background()
	imagesClient, err := compute.NewImagesRESTClient(ctx)
	if err != nil {
		return fmt.Errorf("NewImagesRESTClient: %w", err)
	}
	defer imagesClient.Close()

	// Listing only non-deprecated images to reduce the size of the reply.
	req := &computepb.ListImagesRequest{
		Project:    projectID,
		MaxResults: proto.Uint32(3),
		Filter:     proto.String("deprecated.state != DEPRECATED"),
	}

	// Although the `MaxResults` parameter is specified in the request, the iterator returned
	// by the `list()` method hides the pagination mechanic. The library makes multiple
	// requests to the API for you, so you can simply iterate over all the images.
	it := imagesClient.List(ctx, req)
	for {
		image, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return err
		}
		fmt.Fprintf(w, "- %s\n", image.GetName())
	}
	return nil
}
```

### Java

Before trying this sample, follow the Java setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Java API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```

import com.google.cloud.compute.v1.Image;
import com.google.cloud.compute.v1.ImagesClient;
import com.google.cloud.compute.v1.ImagesClient.ListPage;
import com.google.cloud.compute.v1.ListImagesRequest;
import java.io.IOException;
  // Prints a list of all non-deprecated image names available in given project.
  public static void listImages(String project) throws IOException {
    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests. After completing all of your requests, call
    // the `instancesClient.close()` method on the client to
    // safely clean up any remaining background resources.
    try (ImagesClient imagesClient = ImagesClient.create()) {

      // Listing only non-deprecated images to reduce the size of the reply.
      ListImagesRequest imagesRequest = ListImagesRequest.newBuilder()
          .setProject(project)
          .setMaxResults(100)
          .setFilter("deprecated.state != DEPRECATED")
          .build();

      // Although the `setMaxResults` parameter is specified in the request, the iterable returned
      // by the `list()` method hides the pagination mechanic. The library makes multiple
      // requests to the API for you, so you can simply iterate over all the images.
      int imageCount = 0;
      for (Image image : imagesClient.list(imagesRequest).iterateAll()) {
        imageCount++;
        System.out.println(image.getName());
      }
      System.out.printf("Image count in %s is: %s", project, imageCount);
    }
  }
```

### Node.js

Before trying this sample, follow the Node.js setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Node.js API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
/**
 * TODO(developer): Uncomment and replace these variables before running the sample.
 */
// const projectId = 'YOUR_PROJECT_ID';

const compute = require('@google-cloud/compute');

async function listImages() {
  const imagesClient = new compute.ImagesClient();

  // Listing only non-deprecated images to reduce the size of the reply.
  const images = imagesClient.listAsync({
    project: projectId,
    maxResults: 3,
    filter: 'deprecated.state != DEPRECATED',
  });

  // Although the `maxResults` parameter is specified in the request, the iterable returned
  // by the `listAsync()` method hides the pagination mechanic. The library makes multiple
  // requests to the API for you, so you can simply iterate over all the images.
  for await (const image of images) {
    console.log(` - ${image.name}`);
  }
}

listImages();
```

### PHP

Before trying this sample, follow the PHP setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine PHP API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
use Google\Cloud\Compute\V1\Client\ImagesClient;
use Google\Cloud\Compute\V1\ListImagesRequest;

/**
 * Prints a list of all non-deprecated image names available in given project.
 *
 * @param string $projectId Project ID or project number of the Cloud project you want to list images from.
 *
 * @throws \Google\ApiCore\ApiException if the remote call fails.
 */
function list_all_images(string $projectId)
{
    $imagesClient = new ImagesClient();
    // Listing only non-deprecated images to reduce the size of the reply.
    $optionalArgs = ['maxResults' => 100, 'filter' => 'deprecated.state != DEPRECATED'];

    /**
     * Although the maxResults parameter is specified in the request, the iterateAllElements() method
     * hides the pagination mechanic. The library makes multiple requests to the API for you,
     * so you can simply iterate over all the images.
     */
    $request = (new ListImagesRequest())
        ->setProject($projectId)
        ->setMaxResults($optionalArgs['maxResults'])
        ->setFilter($optionalArgs['filter']);
    $pagedResponse = $imagesClient->list($request);
    print('=================== Flat list of images ===================' . PHP_EOL);
    foreach ($pagedResponse->iterateAllElements() as $element) {
        printf(' - %s' . PHP_EOL, $element->getName());
    }
}
```

### Python

Before trying this sample, follow the Python setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Python API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
import google.cloud.compute_v1 as compute_v1

def print_images_list(project: str) -> str:
    """
    Prints a list of all non-deprecated image names available in given project.

    Args:
        project: project ID or project number of the Cloud project you want to list images from.

    Returns:
        The output as a string.
    """
    images_client = compute_v1.ImagesClient()
    # Listing only non-deprecated images to reduce the size of the reply.
    images_list_request = compute_v1.ListImagesRequest(
        project=project, max_results=100, filter="deprecated.state != DEPRECATED"
    )
    output = []

    # Although the `max_results` parameter is specified in the request, the iterable returned
    # by the `list()` method hides the pagination mechanic. The library makes multiple
    # requests to the API for you, so you can simply iterate over all the images.
    for img in images_client.list(request=images_list_request):
        print(f" -  {img.name}")
        output.append(f" -  {img.name}")
    return "\n".join(output)
```

### Ruby

Before trying this sample, follow the Ruby setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Ruby API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```

require "google/cloud/compute/v1"

# Prints a list of all non-deprecated image names available in given project.
#
# @param [String] project project ID or project number of the Cloud project you want to list images from.
def print_images_list project:
  client = ::Google::Cloud::Compute::V1::Images::Rest::Client.new

  # Make the request to list all non-deprecated images in a project.
  request = {
    project: project,
    # max_results indicates the maximum number of items that will be returned per page.
    max_results: 100,
    # Listing only non-deprecated images to reduce the size of the reply.
    filter: "deprecated.state != DEPRECATED"
  }

  # Although the `max_results` parameter is specified in the request, the iterable returned
  # by the `list` method hides the pagination mechanic. The library makes multiple
  # requests to the API for you, so you can simply iterate over all the images.
  client.list(request).each do |image|
    puts " - #{image.name}"
  end
end
```

### REST

1.  Run the following command:
    
    GET https://compute.googleapis.com/compute/v1/projects/IMAGE_PROJECT/global/images/
    
2.  Make a note of the name of the image or image family and the name of the project containing the image.
    
3.  Optional: To determine whether the image supports Shielded VM features, run the following command:
    
    GET https://compute.googleapis.com/compute/v1/projects/IMAGE_PROJECT/global/images/IMAGE_NAME
    
    Replace the following:
    
    *   `IMAGE_PROJECT`: project containing the image
    *   `IMAGE_NAME`: name of the image to check for support of Shielded VM features
    
    If the image supports Shielded VM features, the following line appears in the output: `type: UEFI_COMPATIBLE`.
    

## Create a VM instance from a public image

Google, open source communities, and third-party vendors provide and maintain public OS images. By default, all Google Cloud projects can create VMs from public OS images. However, if your Google Cloud project has a defined list of trusted images, you can use only the images on that list to create a VM.

If you create a Shielded VM image with a local SSD, you can't shield data with integrity monitoring or the virtual platform trusted module (vTPM).

### Console

1.  In the Google Cloud console, go to the **Create an instance** page.
    
    Go to Create an instance
    
    If prompted, select your project and click **Continue**. The **Create an instance** page appears and displays the **Machine configuration** pane.
    
2.  In the **Machine configuration** pane, do the following:
    
    1.  In the **Name** field, specify a name for your VM. For more information, see Resource naming convention.
    2.  Optional: In the **Zone** field, select a zone for this VM.
        
        The default selection is **Any**. If you don't change this default selection, then Google automatically chooses a zone for you based on machine type and availability.
        
    3.  Select the machine family for your VM. The Google Cloud console then displays the machine series that are available for your selected machine family. The following machine family options are available:
        
        *   **General purpose**
        *   **Compute optimized**
        *   **Memory optimized**
        *   **Storage optimized**
        *   **GPUs**
        *   **TPUs**
        
    4.  In the **Series** column, select the machine series for your VM.
        
        If you selected **GPUs** as the machine family in the previous step, then select the **GPU type** that you want. The machine series is then automatically selected for the selected GPU type.
        
    5.  In the **Machine type** section, select the machine type for your VM.
        
3.  In the navigation menu, click **OS and storage**. In the **Operating system and storage** pane that appears, configure your boot disk by doing the following:
    
    1.  Click **Change**. The **Boot disk** pane appears and displays the **Public images** tab.
    2.  In the **Operating system** list, select the OS type.
    3.  In the **Version** list, select the OS version.
    4.  In the **Boot disk type** list, select the type of the boot disk.
    5.  In the **Size (GB)** field, specify the size of the boot disk.
    6.  Optional: For Hyperdisk Balanced boot disks, specify values for the **Provisioned IOPS** and **Provisioned throughput** fields.
    7.  Optional: For advanced configuration options, expand the expand_more **Show advanced configurations** section.
    8.  To confirm your boot disk options and return to the **Operating system and storage** pane, click **Select**.
    
    **Note:** Unless you explicitly choose a different boot disk, if the name of the new VM matches the name of an existing disk, then the existing disk automatically attaches to the new VM as the boot disk.
    
4.  In the navigation menu, click **Networking**. In the **Networking** pane that appears, do the following:
    
    1.  Go to the **Firewall** section.
    2.  To permit HTTP or HTTPS traffic to the VM, select **Allow HTTP traffic** or **Allow HTTPS traffic**.
        
        The Compute Engine adds a network tag to your VM and creates the corresponding ingress firewall rule that allows all incoming traffic on `tcp:80` (HTTP) or `tcp:443` (HTTPS). The network tag associates the firewall rule with the VM. For more information, see Firewall rules overview in the Cloud Next Generation Firewall documentation.
        
5.  Optional: If you chose an OS image that supports Shielded VM features, you can modify the Shielded VM settings.
    
    To do so, in the navigation menu, Click **Security**. In the **Security** pane that appears, you can configure the following:
    
    *   To turn on Secure Boot, select the **Turn on Secure Boot** checkbox. Secure Boot is disabled by default.
        
    *   To turn off vTPM, clear the **Turn on vTPM** checkbox. vTPM is enabled by default. Disabling vTPM also disables integrity monitoring because integrity monitoring relies on data gathered by Measured Boot.
        
    *   To turn off integrity monitoring, clear the **Turn on Integrity Monitoring** checkbox. Integrity monitoring is enabled by default.
        
6.  Optional: Specify other configuration options. For more information, see Configuration options during instance creation.
    
7.  To create and start the VM, click **Create**.
    

### gcloud

1.  Select a public image. Make a note of the name of the image or image family and the name of the project containing the image.
2.  Use the `gcloud compute instances create` command to create a VM from an image family or from a specific version of an OS image.
    
    If you specify the optional `--shielded-secure-boot` flag, Compute Engine creates a VM with all three of the Shielded VM features enabled:
    
    *   Virtual trusted platform module (vTPM)
    *   Integrity monitoring
    *   Secure Boot
    
    After Compute Engine starts your VM, you must stop the VM to modify Shielded VM options.
    
    gcloud compute instances create VM_NAME \
        --zone=ZONE \
        [--image=IMAGE | --image-family=IMAGE_FAMILY] \
        --image-project=IMAGE_PROJECT
        IMAGE_FLAG \
        --machine-type=MACHINE_TYPE
    
    Replace the following:
    
    *   `VM_NAME`: name of the new VM
    *   `ZONE`: zone to create the instance in
    *   `IMAGE_PROJECT`: the project that contains the image
    *   `IMAGE_FLAG`: specify one of the following:
        
        *   Use the `--image IMAGE_NAME` flag to specify a specific version of a public image.
            
            For example, `--image debian-12-bookworm-v20241112`.
            
        *   Use the `--image-family IMAGE_FAMILY_NAME` flag to specify an image family.
            
            This creates the VM from the most recent, non-deprecated OS image in the image family. For example, if you specify `--image-family debian-12`, Compute Engine uses the latest version of the OS image in the Debian 12 image family.
            
    *   `MACHINE_TYPE`: machine type for the new VM, which can be a predefined machine type or a custom machine type.
        
        To get a list of the machine types available in a zone, use the `gcloud compute machine-types list` command with the `--zones` flag.
        
3.  Verify that Compute Engine created the VM:
    
    gcloud compute instances describe VM_NAME
    
    Replace `VM_NAME` with the name of the VM.
    

### Terraform

To create a VM, you can use the `google_compute_instance` resource

```

# Create a VM instance from a public image
# in the `default` VPC network and subnet

resource "google_compute_instance" "default" {
  name         = "my-vm"
  machine_type = "n1-standard-1"
  zone         = "us-central1-a"

  boot_disk {
    initialize_params {
      image = "ubuntu-minimal-2210-kinetic-amd64-v20230126"
    }
  }

  network_interface {
    network = "default"
    access_config {}
  }
}
```

To learn how to apply or remove a Terraform configuration, see Basic Terraform commands.

To generate the Terraform code, you can use the **Equivalent code** component in the Google Cloud console.

1.  In the Google Cloud console, go to the **VM instances** page.
    
    Go to VM Instances
    
2.  Click **Create instance**.
3.  Specify the parameters you want.
4.  At the top or bottom of the page, click **Equivalent code**, and then click the **Terraform** tab to view the Terraform code.

### C#

### C#

Before trying this sample, follow the C# setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine C# API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```

using Google.Cloud.Compute.V1;
using System.Threading.Tasks;

public class CreateInstanceAsyncSample
{
    public async Task CreateInstanceAsync(
        // TODO(developer): Set your own default values for these parameters or pass different values when calling this method.
        string projectId = "your-project-id",
        string zone = "us-central1-a",
        string machineName = "test-machine",
        string machineType = "n1-standard-1",
        string diskImage = "projects/debian-cloud/global/images/family/debian-12",
        long diskSizeGb = 10,
        string networkName = "default")
    {
        Instance instance = new Instance
        {
            Name = machineName,
            // See https://cloud.google.com/compute/docs/machine-types for more information on machine types.
            MachineType = $"zones/{zone}/machineTypes/{machineType}",
            // Instance creation requires at least one persistent disk.
            Disks =
            {
                new AttachedDisk
                {
                    AutoDelete = true,
                    Boot = true,
                    Type = ComputeEnumConstants.AttachedDisk.Type.Persistent,
                    InitializeParams = new AttachedDiskInitializeParams 
                    {
                        // See https://cloud.google.com/compute/docs/images for more information on available images.
                        SourceImage = diskImage,
                        DiskSizeGb = diskSizeGb
                    }
                }
            },
            NetworkInterfaces = { new NetworkInterface { Name = networkName } }
        };

        // Initialize client that will be used to send requests. This client only needs to be created
        // once, and can be reused for multiple requests.
        InstancesClient client = await InstancesClient.CreateAsync();

        // Insert the instance in the specified project and zone.
        var instanceCreation = await client.InsertAsync(projectId, zone, instance);

        // Wait for the operation to complete using client-side polling.
        // The server-side operation is not affected by polling,
        // and might finish successfully even if polling times out.
        await instanceCreation.PollUntilCompletedAsync();
    }
}
```

### Go

### Go

Before trying this sample, follow the Go setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Go API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
import (
	"context"
	"fmt"
	"io"

	compute "cloud.google.com/go/compute/apiv1"
	computepb "cloud.google.com/go/compute/apiv1/computepb"
	"google.golang.org/protobuf/proto"
)

// createInstance sends an instance creation request to the Compute Engine API and waits for it to complete.
func createInstance(w io.Writer, projectID, zone, instanceName, machineType, sourceImage, networkName string) error {
	// projectID := "your_project_id"
	// zone := "europe-central2-b"
	// instanceName := "your_instance_name"
	// machineType := "n1-standard-1"
	// sourceImage := "projects/debian-cloud/global/images/family/debian-12"
	// networkName := "global/networks/default"

	ctx := context.Background()
	instancesClient, err := compute.NewInstancesRESTClient(ctx)
	if err != nil {
		return fmt.Errorf("NewInstancesRESTClient: %w", err)
	}
	defer instancesClient.Close()

	req := &computepb.InsertInstanceRequest{
		Project: projectID,
		Zone:    zone,
		InstanceResource: &computepb.Instance{
			Name: proto.String(instanceName),
			Disks: []*computepb.AttachedDisk{
				{
					InitializeParams: &computepb.AttachedDiskInitializeParams{
						DiskSizeGb:  proto.Int64(10),
						SourceImage: proto.String(sourceImage),
					},
					AutoDelete: proto.Bool(true),
					Boot:       proto.Bool(true),
					Type:       proto.String(computepb.AttachedDisk_PERSISTENT.String()),
				},
			},
			MachineType: proto.String(fmt.Sprintf("zones/%s/machineTypes/%s", zone, machineType)),
			NetworkInterfaces: []*computepb.NetworkInterface{
				{
					Name: proto.String(networkName),
				},
			},
		},
	}

	op, err := instancesClient.Insert(ctx, req)
	if err != nil {
		return fmt.Errorf("unable to create instance: %w", err)
	}

	if err = op.Wait(ctx); err != nil {
		return fmt.Errorf("unable to wait for the operation: %w", err)
	}

	fmt.Fprintf(w, "Instance created\n")

	return nil
}
```

### Java

Before trying this sample, follow the Java setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Java API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```

import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.compute.v1.AttachedDisk;
import com.google.cloud.compute.v1.AttachedDisk.Type;
import com.google.cloud.compute.v1.AttachedDiskInitializeParams;
import com.google.cloud.compute.v1.InsertInstanceRequest;
import com.google.cloud.compute.v1.Instance;
import com.google.cloud.compute.v1.InstancesClient;
import com.google.cloud.compute.v1.NetworkInterface;
import com.google.cloud.compute.v1.Operation;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class CreateInstance {

  public static void main(String[] args)
      throws IOException, InterruptedException, ExecutionException, TimeoutException {
    // TODO(developer): Replace these variables before running the sample.
    String project = "your-project-id";
    String zone = "zone-name";
    String instanceName = "instance-name";
    createInstance(project, zone, instanceName);
  }


  // Create a new instance with the provided "instanceName" value in the specified project and zone.
  public static void createInstance(String project, String zone, String instanceName)
      throws IOException, InterruptedException, ExecutionException, TimeoutException {
    // Below are sample values that can be replaced.
    // machineType: machine type of the VM being created.
    // *   This value uses the format zones/{zone}/machineTypes/{type_name}.
    // *   For a list of machine types, see https://cloud.google.com/compute/docs/machine-types
    // sourceImage: path to the operating system image to mount.
    // *   For details about images you can mount, see https://cloud.google.com/compute/docs/images
    // diskSizeGb: storage size of the boot disk to attach to the instance.
    // networkName: network interface to associate with the instance.
    String machineType = String.format("zones/%s/machineTypes/n1-standard-1", zone);
    String sourceImage = String
        .format("projects/debian-cloud/global/images/family/%s", "debian-11");
    long diskSizeGb = 10L;
    String networkName = "default";

    // Initialize client that will be used to send requests. This client only needs to be created
    // once, and can be reused for multiple requests. After completing all of your requests, call
    // the `instancesClient.close()` method on the client to safely
    // clean up any remaining background resources.
    try (InstancesClient instancesClient = InstancesClient.create()) {
      // Instance creation requires at least one persistent disk and one network interface.
      AttachedDisk disk =
          AttachedDisk.newBuilder()
              .setBoot(true)
              .setAutoDelete(true)
              .setType(Type.PERSISTENT.toString())
              .setDeviceName("disk-1")
              .setInitializeParams(
                  AttachedDiskInitializeParams.newBuilder()
                      .setSourceImage(sourceImage)
                      .setDiskSizeGb(diskSizeGb)
                      .build())
              .build();

      // Use the network interface provided in the networkName argument.
      NetworkInterface networkInterface = NetworkInterface.newBuilder()
          .setName(networkName)
          .build();

      // Bind `instanceName`, `machineType`, `disk`, and `networkInterface` to an instance.
      Instance instanceResource =
          Instance.newBuilder()
              .setName(instanceName)
              .setMachineType(machineType)
              .addDisks(disk)
              .addNetworkInterfaces(networkInterface)
              .build();

      System.out.printf("Creating instance: %s at %s %n", instanceName, zone);

      // Insert the instance in the specified project and zone.
      InsertInstanceRequest insertInstanceRequest = InsertInstanceRequest.newBuilder()
          .setProject(project)
          .setZone(zone)
          .setInstanceResource(instanceResource)
          .build();

      OperationFuture<Operation, Operation> operation = instancesClient.insertAsync(
          insertInstanceRequest);

      // Wait for the operation to complete.
      Operation response = operation.get(3, TimeUnit.MINUTES);

      if (response.hasError()) {
        System.out.println("Instance creation failed ! ! " + response);
        return;
      }
      System.out.println("Operation Status: " + response.getStatus());
    }
  }
}
```

### Node.js

Before trying this sample, follow the Node.js setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Node.js API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
/**
 * TODO(developer): Uncomment and replace these variables before running the sample.
 */
// const projectId = 'YOUR_PROJECT_ID';
// const zone = 'europe-central2-b'
// const instanceName = 'YOUR_INSTANCE_NAME'
// const machineType = 'n1-standard-1';
// const sourceImage = 'projects/debian-cloud/global/images/family/debian-11';
// const networkName = 'global/networks/default';

const compute = require('@google-cloud/compute');

// Create a new instance with the values provided above in the specified project and zone.
async function createInstance() {
  const instancesClient = new compute.InstancesClient();

  console.log(`Creating the ${instanceName} instance in ${zone}...`);

  const [response] = await instancesClient.insert({
    instanceResource: {
      name: instanceName,
      disks: [
        {
          // Describe the size and source image of the boot disk to attach to the instance.
          initializeParams: {
            diskSizeGb: '10',
            sourceImage,
          },
          autoDelete: true,
          boot: true,
          type: 'PERSISTENT',
        },
      ],
      machineType: `zones/${zone}/machineTypes/${machineType}`,
      networkInterfaces: [
        {
          // Use the network interface provided in the networkName argument.
          name: networkName,
        },
      ],
    },
    project: projectId,
    zone,
  });
  let operation = response.latestResponse;
  const operationsClient = new compute.ZoneOperationsClient();

  // Wait for the create operation to complete.
  while (operation.status !== 'DONE') {
    [operation] = await operationsClient.wait({
      operation: operation.name,
      project: projectId,
      zone: operation.zone.split('/').pop(),
    });
  }

  console.log('Instance created.');
}

createInstance();
```

### PHP

Before trying this sample, follow the PHP setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine PHP API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
use Google\Cloud\Compute\V1\AttachedDisk;
use Google\Cloud\Compute\V1\AttachedDisk\Type;
use Google\Cloud\Compute\V1\AttachedDiskInitializeParams;
use Google\Cloud\Compute\V1\Client\InstancesClient;
use Google\Cloud\Compute\V1\InsertInstanceRequest;

/**
 * To correctly handle string enums in Cloud Compute library
 * use constants defined in the Enums subfolder.
 */
use Google\Cloud\Compute\V1\Instance;
use Google\Cloud\Compute\V1\NetworkInterface;

/**
 * Creates an instance in the specified project and zone.
 *
 * @param string $projectId Project ID of the Cloud project to create the instance in.
 * @param string $zone Zone to create the instance in (like "us-central1-a").
 * @param string $instanceName Unique name for this Compute Engine instance.
 * @param string $machineType Machine type of the instance being created.
 * @param string $sourceImage Boot disk image name or family.
 * @param string $networkName Network interface to associate with the instance.
 *
 * @throws \Google\ApiCore\ApiException if the remote call fails.
 * @throws \Google\ApiCore\ValidationException if local error occurs before remote call.
 */
function create_instance(
    string $projectId,
    string $zone,
    string $instanceName,
    string $machineType = 'n1-standard-1',
    string $sourceImage = 'projects/debian-cloud/global/images/family/debian-11',
    string $networkName = 'global/networks/default'
) {
    // Set the machine type using the specified zone.
    $machineTypeFullName = sprintf('zones/%s/machineTypes/%s', $zone, $machineType);

    // Describe the source image of the boot disk to attach to the instance.
    $diskInitializeParams = (new AttachedDiskInitializeParams())
        ->setSourceImage($sourceImage);
    $disk = (new AttachedDisk())
        ->setBoot(true)
        ->setAutoDelete(true)
        ->setType(Type::name(Type::PERSISTENT))
        ->setInitializeParams($diskInitializeParams);

    // Use the network interface provided in the $networkName argument.
    $network = (new NetworkInterface())
        ->setName($networkName);

    // Create the Instance object.
    $instance = (new Instance())
        ->setName($instanceName)
        ->setDisks([$disk])
        ->setMachineType($machineTypeFullName)
        ->setNetworkInterfaces([$network]);

    // Insert the new Compute Engine instance using InstancesClient.
    $instancesClient = new InstancesClient();
    $request = (new InsertInstanceRequest())
        ->setInstanceResource($instance)
        ->setProject($projectId)
        ->setZone($zone);
    $operation = $instancesClient->insert($request);

    // Wait for the operation to complete.
    $operation->pollUntilComplete();
    if ($operation->operationSucceeded()) {
        printf('Created instance %s' . PHP_EOL, $instanceName);
    } else {
        $error = $operation->getError();
        printf('Instance creation failed: %s' . PHP_EOL, $error?->getMessage());
    }
}
```

### Python

Before trying this sample, follow the Python setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Python API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
from __future__ import annotations

import re
import sys
from typing import Any
import warnings

from google.api_core.extended_operation import ExtendedOperation
from google.cloud import compute_v1


def get_image_from_family(project: str, family: str) -> compute_v1.Image:
    """
    Retrieve the newest image that is part of a given family in a project.

    Args:
        project: project ID or project number of the Cloud project you want to get image from.
        family: name of the image family you want to get image from.

    Returns:
        An Image object.
    """
    image_client = compute_v1.ImagesClient()
    # List of public operating system (OS) images: https://cloud.google.com/compute/docs/images/os-details
    newest_image = image_client.get_from_family(project=project, family=family)
    return newest_image


def disk_from_image(
    disk_type: str,
    disk_size_gb: int,
    boot: bool,
    source_image: str,
    auto_delete: bool = True,
) -> compute_v1.AttachedDisk:
    """
    Create an AttachedDisk object to be used in VM instance creation. Uses an image as the
    source for the new disk.

    Args:
         disk_type: the type of disk you want to create. This value uses the following format:
            "zones/{zone}/diskTypes/(pd-standard|pd-ssd|pd-balanced|pd-extreme)".
            For example: "zones/us-west3-b/diskTypes/pd-ssd"
        disk_size_gb: size of the new disk in gigabytes
        boot: boolean flag indicating whether this disk should be used as a boot disk of an instance
        source_image: source image to use when creating this disk. You must have read access to this disk. This can be one
            of the publicly available images or an image from one of your projects.
            This value uses the following format: "projects/{project_name}/global/images/{image_name}"
        auto_delete: boolean flag indicating whether this disk should be deleted with the VM that uses it

    Returns:
        AttachedDisk object configured to be created using the specified image.
    """
    boot_disk = compute_v1.AttachedDisk()
    initialize_params = compute_v1.AttachedDiskInitializeParams()
    initialize_params.source_image = source_image
    initialize_params.disk_size_gb = disk_size_gb
    initialize_params.disk_type = disk_type
    boot_disk.initialize_params = initialize_params
    # Remember to set auto_delete to True if you want the disk to be deleted when you delete
    # your VM instance.
    boot_disk.auto_delete = auto_delete
    boot_disk.boot = boot
    return boot_disk


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


def create_instance(
    project_id: str,
    zone: str,
    instance_name: str,
    disks: list[compute_v1.AttachedDisk],
    machine_type: str = "n1-standard-1",
    network_link: str = "global/networks/default",
    subnetwork_link: str = None,
    internal_ip: str = None,
    external_access: bool = False,
    external_ipv4: str = None,
    accelerators: list[compute_v1.AcceleratorConfig] = None,
    preemptible: bool = False,
    spot: bool = False,
    instance_termination_action: str = "STOP",
    custom_hostname: str = None,
    delete_protection: bool = False,
) -> compute_v1.Instance:
    """
    Send an instance creation request to the Compute Engine API and wait for it to complete.

    Args:
        project_id: project ID or project number of the Cloud project you want to use.
        zone: name of the zone to create the instance in. For example: "us-west3-b"
        instance_name: name of the new virtual machine (VM) instance.
        disks: a list of compute_v1.AttachedDisk objects describing the disks
            you want to attach to your new instance.
        machine_type: machine type of the VM being created. This value uses the
            following format: "zones/{zone}/machineTypes/{type_name}".
            For example: "zones/europe-west3-c/machineTypes/f1-micro"
        network_link: name of the network you want the new instance to use.
            For example: "global/networks/default" represents the network
            named "default", which is created automatically for each project.
        subnetwork_link: name of the subnetwork you want the new instance to use.
            This value uses the following format:
            "regions/{region}/subnetworks/{subnetwork_name}"
        internal_ip: internal IP address you want to assign to the new instance.
            By default, a free address from the pool of available internal IP addresses of
            used subnet will be used.
        external_access: boolean flag indicating if the instance should have an external IPv4
            address assigned.
        external_ipv4: external IPv4 address to be assigned to this instance. If you specify
            an external IP address, it must live in the same region as the zone of the instance.
            This setting requires `external_access` to be set to True to work.
        accelerators: a list of AcceleratorConfig objects describing the accelerators that will
            be attached to the new instance.
        preemptible: boolean value indicating if the new instance should be preemptible
            or not. Preemptible VMs have been deprecated and you should now use Spot VMs.
        spot: boolean value indicating if the new instance should be a Spot VM or not.
        instance_termination_action: What action should be taken once a Spot VM is terminated.
            Possible values: "STOP", "DELETE"
        custom_hostname: Custom hostname of the new VM instance.
            Custom hostnames must conform to RFC 1035 requirements for valid hostnames.
        delete_protection: boolean value indicating if the new virtual machine should be
            protected against deletion or not.
    Returns:
        Instance object.
    """
    instance_client = compute_v1.InstancesClient()

    # Use the network interface provided in the network_link argument.
    network_interface = compute_v1.NetworkInterface()
    network_interface.network = network_link
    if subnetwork_link:
        network_interface.subnetwork = subnetwork_link

    if internal_ip:
        network_interface.network_i_p = internal_ip

    if external_access:
        access = compute_v1.AccessConfig()
        access.type_ = compute_v1.AccessConfig.Type.ONE_TO_ONE_NAT.name
        access.name = "External NAT"
        access.network_tier = access.NetworkTier.PREMIUM.name
        if external_ipv4:
            access.nat_i_p = external_ipv4
        network_interface.access_configs = [access]

    # Collect information into the Instance object.
    instance = compute_v1.Instance()
    instance.network_interfaces = [network_interface]
    instance.name = instance_name
    instance.disks = disks
    if re.match(r"^zones/[a-z\d\-]+/machineTypes/[a-z\d\-]+$", machine_type):
        instance.machine_type = machine_type
    else:
        instance.machine_type = f"zones/{zone}/machineTypes/{machine_type}"

    instance.scheduling = compute_v1.Scheduling()
    if accelerators:
        instance.guest_accelerators = accelerators
        instance.scheduling.on_host_maintenance = (
            compute_v1.Scheduling.OnHostMaintenance.TERMINATE.name
        )

    if preemptible:
        # Set the preemptible setting
        warnings.warn(
            "Preemptible VMs are being replaced by Spot VMs.", DeprecationWarning
        )
        instance.scheduling = compute_v1.Scheduling()
        instance.scheduling.preemptible = True

    if spot:
        # Set the Spot VM setting
        instance.scheduling.provisioning_model = (
            compute_v1.Scheduling.ProvisioningModel.SPOT.name
        )
        instance.scheduling.instance_termination_action = instance_termination_action

    if custom_hostname is not None:
        # Set the custom hostname for the instance
        instance.hostname = custom_hostname

    if delete_protection:
        # Set the delete protection bit
        instance.deletion_protection = True

    # Prepare the request to insert an instance.
    request = compute_v1.InsertInstanceRequest()
    request.zone = zone
    request.project = project_id
    request.instance_resource = instance

    # Wait for the create operation to complete.
    print(f"Creating the {instance_name} instance in {zone}...")

    operation = instance_client.insert(request=request)

    wait_for_extended_operation(operation, "instance creation")

    print(f"Instance {instance_name} created.")
    return instance_client.get(project=project_id, zone=zone, instance=instance_name)
```

### Ruby

Before trying this sample, follow the Ruby setup instructions in the Compute Engine quickstart using client libraries. For more information, see the Compute Engine Ruby API reference documentation.

To authenticate to Compute Engine, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```

require "google/cloud/compute/v1"

# Sends an instance creation request to the Compute Engine API and waits for it to complete.
#
# @param [String] project project ID or project number of the Cloud project you want to use.
# @param [String] zone name of the zone you want to use. For example: "us-west3-b"
# @param [String] instance_name name of the new virtual machine.
# @param [String] machine_type machine type of the VM being created. For example: "e2-standard-2"
#         See https://cloud.google.com/compute/docs/machine-types for more information
#         on machine types.
# @param [String] source_image path to the operating system image to mount on your boot
#         disk. This can be one of the public images
#         (like "projects/debian-cloud/global/images/family/debian-11")
#         or a private image you have access to.
#         See https://cloud.google.com/compute/docs/images for more information on available images.
# @param [String] network_name name of the network you want the new instance to use.
#         For example: "global/networks/default" represents the `default`
#         network interface, which is created automatically for each project.
def create_instance project:, zone:, instance_name:,
                    machine_type: "n2-standard-2",
                    source_image: "projects/debian-cloud/global/images/family/debian-11",
                    network_name: "global/networks/default"
  # Initialize client that will be used to send requests. This client only needs to be created
  # once, and can be reused for multiple requests.
  client = ::Google::Cloud::Compute::V1::Instances::Rest::Client.new

  # Construct the instance object.
  # It can be either a hash or ::Google::Cloud::Compute::V1::Instance instance.
  instance = {
    name: instance_name,
    machine_type: "zones/#{zone}/machineTypes/#{machine_type}",
    # Instance creation requires at least one persistent disk.
    disks: [{
      auto_delete: true,
      boot: true,
      type: :PERSISTENT,
      initialize_params: {
        source_image: source_image,
        disk_size_gb: 10
      }
    }],
    network_interfaces: [{ name: network_name }]
  }

  # Prepare a request to create the instance in the specified project and zone.
  request = { project: project, zone: zone, instance_resource: instance }

  puts "Creating the #{instance_name} instance in #{zone}..."
  begin
    # Send the insert request.
    operation = client.insert request
    # Wait for the create operation to complete.
    operation = wait_until_done operation: operation

    if operation.error?
      warn "Error during creation:", operation.error
    else
      compute_operation = operation.operation
      warn "Warning during creation:", compute_operation.warnings unless compute_operation.warnings.empty?
      puts "Instance #{instance_name} created."
    end
  rescue ::Google::Cloud::Error => e
    warn "Exception during creation:", e
  end
end
```

### REST

1.  Select a public image. Make a note of the name of the image or image family and the name of the project containing the image.
2.  Use the `instances.insert` method to create a VM from an image family or from a specific version of an OS image:
    
    ```
    PROJECT_ID
    ```
    
    Replace the following:
    
    *   `PROJECT_ID`: ID of the project to create the VM in
    *   `ZONE`: zone to create the VM in
    *   `MACHINE_TYPE_ZONE`: zone containing the machine type to use for the new VM
    *   `MACHINE_TYPE`: machine type, predefined or custom, for the new VM
    *   `VM_NAME`: name of the new VM
    *   `IMAGE_PROJECT`: project containing the image  
        For example, if you specify `debian-10` as the image family, specify `debian-cloud` as the image project.
    *   `IMAGE`: specify one of the following:
        *   `IMAGE`: a specific version of a public image
            
            For example, `"sourceImage": "projects/debian-cloud/global/images/debian-10-buster-v20200309"`
            
        *   `IMAGE_FAMILY`: an image family
            
            This creates the VM from the most recent, non-deprecated OS image. For example, if you specify `"sourceImage": "projects/debian-cloud/global/images/family/debian-10"`, Compute Engine creates a VM from the latest version of the OS image in the `Debian 10` image family.
            
    *   `NETWORK_NAME`: the VPC network that you want to use for the VM. You can specify `default` to use your default network.
    *   `ENABLE_SECURE_BOOT`: Optional: If you chose an image that supports Shielded VM features, Compute Engine, by default, enables the virtual trusted platform module (vTPM) and integrity monitoring. Compute Engine does not enable Secure Boot by default.
        
        If you specify `true` for `enableSecureBoot`, Compute Engine creates a VM with all three Shielded VM features enabled. After Compute Engine starts your VM, to modify Shielded VM options, you must stop the VM.
        
    

## Create a bare metal instance from a public image

Google, open source communities, and third-party vendors provide and maintain public OS images. By default, all Google Cloud projects can create bare metal instances using supported public OS images. However, if your Google Cloud project has a defined list of trusted images, you can use only the images on that list to create a bare metal instance.

### Console

1.  In the Google Cloud console, go to the **Create an instance** page.
    
    Go to Create an instance
    
    If prompted, select your project and click **Continue**. The **Create an instance** page appears and displays the **Machine configuration** pane.
    
2.  In the **Machine configuration** pane, do the following:
    
    1.  In the **Name** field, specify a name for your instance. For more information, see Resource naming convention.
    2.  Optional: In the **Zone** field, select a zone for this instance. If you choose a zone that doesn't have any available bare metal servers, you are prompted to choose a different zone.
        
        The default selection is **Any**. If you don't change this default selection, then Google automatically chooses a zone for you based on machine type and availability.
        
    3.  Select your machine family and series by doing one of the following:
        
        *   For C3 bare metal series, select **General purpose** as the machine family and then, in the **Series** column, select **C3**.
        *   For X4 bare metal series, select **Memory optimized** as the machine family and then, in the **Series** column, select **X4**.
    4.  In the **Machine type** section, click the list. In the filter menu, type in `metal` and then select one of the available machine types.
        
3.  In the navigation menu, click **OS and storage**. In the **Operating system and storage** pane that appears, configure your boot disk by doing the following:
    
    1.  Click **Change**. The **Boot disk** pane appears and displays the **Public images** tab.
    2.  In the **Operating system** list, select the OS type.
    3.  In the **Version** list, select the OS version.
    4.  In the **Boot disk type** list, select the type of the boot disk.
    5.  In the **Size (GB)** field, specify the size of the boot disk.
    6.  Optional: For Hyperdisk Balanced boot disks, specify values for the **Provisioned IOPS** and **Provisioned throughput** fields.
    7.  Optional: For advanced configuration options, expand the expand_more **Show advanced configurations** section.
    8.  To confirm your boot disk options and return to the **Operating system and storage** pane, click **Select**.
        
        **Note:** Unless you explicitly choose a different boot disk, if the name of the new instance matches the name of an existing disk, then the existing disk automatically attaches to the new instance as the boot disk.
        
4.  In the navigation menu, click **Networking**. In the **Networking** pane that appears, do the following:
    
    1.  Go to the **Firewall** section.
    2.  To permit HTTP or HTTPS traffic to the instance, select **Allow HTTP traffic** or **Allow HTTPS traffic**.
        
        The Compute Engine adds a network tag to your instance and creates the corresponding ingress firewall rule that allows all incoming traffic on `tcp:80` (HTTP) or `tcp:443` (HTTPS). The network tag associates the firewall rule with the instance. For more information, see Firewall rules overview in the Cloud Next Generation Firewall documentation.
        
    3.  In the **Network performance configuration** section, verify that the **Network interface card** field is set to **IDPF**.
        
    
5.  In the navigation menu, click **Advanced**. In the **Advanced** pane that appears, do the following:
    
    1.  Expand the expand_more **VM provisioning model advanced settings** section. Verify that the **On host maintenance** field is set to `Terminate instance`.
6.  Optional. Specify any other configuration parameters of your choice. For more information about custom configuration options, see Create and start an instance.
    
7.  To create and start the bare metal instance, click **Create**.
    

### gcloud

1.  Select a public image that supports bare metal instances. Make a note of the name of the image or image family and the name of the project containing the image.
2.  Use the `gcloud compute instances create` command to create a bare metal instance from an image family or from a specific version of an OS image.
    
    gcloud compute instances create INSTANCE_NAME \
        --zone=ZONE \
        --machine-type=MACHINE_TYPE \
        --network-interface=nic-type=IDPF \
        --maintenance-policy=TERMINATE \
        --create-disk=boot=yes,type=hyperdisk-balanced,image=projects/IMAGE_PROJECT/global/images/IMAGE,provisioned-iops=IOPS,provisioned-throughput=THROUGHPUT,size=SIZE \
        --no-shielded-secure-boot
    
    Replace the following:
    
    *   `INSTANCE_NAME`: a name for the new bare metal instance
    *   `ZONE`: zone to create the bare metal instance in
    *   `MACHINE_TYPE`: the bare metal machine type to use for the instance. The name of the machine type must end in `-metal`.
        
        To get a list of the machine types available in a zone, use the `gcloud compute machine-types list` command with the `--zones` flag.
        
    *   `IMAGE_PROJECT`: the image project that contains the image
        
    *   `IMAGE`: specify one of the following:
        
        *   A specific version of the OS image—for example, `sles-15-sp4-sap-v20240208-x86-6`.
        *   An image family, which must be formatted as `family/IMAGE_FAMILY`. This creates the instance from the most recent, non-deprecated OS image. For example, if you specify `family/sles-15-sp4-sap`, Compute Engine creates a bare metal instance from the latest version of the OS image in the SUSE Linux Enterprise Server 15 SP4 image family. For more information about using image families, see Image families best practices.
    *   `IOPS`: Optional: the highest number of I/O operations per second (IOPS) that the disk can handle.
        
    *   `THROUGHPUT`: Optional: an integer that represents the highest throughput, measured in MiB per second, that the disk can handle.
        
    *   `SIZE`: Optional: the size of the new disk. The value must be a whole number. The default unit of measurement is GiB.
        
3.  Verify that Compute Engine created the instance:
    
    gcloud compute instances describe INSTANCE_NAME
    
    Replace `INSTANCE_NAME` with the name of the new instance.
    

### REST

1.  Select a public image that supports bare metal instances. Make a note of the name of the image or image family and the name of the project containing the image.
2.  Use the `instances.insert` method to create a bare metal instance from an image family or from a specific version of an OS image:
    
    POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/zones/ZONE/instances
    {
     "machineType": "projects/PROJECT_ID/zones/MACHINE_TYPE_ZONE/machineTypes/MACHINE_TYPE",
     "name": "INSTANCE_NAME",
     "disks": [
       {
         "boot": true,
         "initializeParams": {
           "diskSizeGb": "DISK_SIZE",
           "diskType": "hyperdisk-balanced",
           "provisionedIops": "IOPS_LIMIT",
           "provisionedThroughput": "THROUGHPUT_LIMIT",
           "sourceImage": "projects/IMAGE_PROJECT/global/images/IMAGE"
         }
       }
     ],
     "networkInterfaces": [
       {
         "nicType": "IDPF"
       }
     ],
     "scheduling": {
       "onHostMaintenance": "TERMINATE"
     }
    }
    
    Replace the following:
    
    *   `PROJECT_ID`: ID of the project to create the bare metal instance in
    *   `ZONE`: zone to create the bare metal instance in
    *   `MACHINE_TYPE_ZONE`: zone that contains the machine type to use for the new bare metal instance
    *   `MACHINE_TYPE`: the machine type to use for the instance. The name of the machine type must end in `-metal`.
    *   `INSTANCE_NAME`: name of the new instance
    *   `DISK_SIZE`: disk size in GiB
    *   `IOPS_LIMIT`: the number of I/O operations per second that you want to provision for the disk.
    *   `THROUGHPUT_LIMIT`: an integer that represents the throughput, measured in MB per second, that you want to provision for the disk.
    *   `IMAGE_PROJECT`: the image project that contains the image
    *   `IMAGE`: specify one of the following:
        *   A specific version of the OS image—for example, `sles-15-sp4-sap-v20240208-x86-6`.
        *   An image family, which must be formatted as `family/IMAGE_FAMILY`. This creates the instance from the most recent, non-deprecated OS image. For example, if you specify `family/sles-15-sp4-sap`, Compute Engine creates a bare metal instance from the latest version of the OS image in the SUSE Linux Enterprise Server 15 SP4 image family. For more information about using image families, see Image families best practices.

## What's next

*   Learn more about images.
*   Learn how to check the status of an instance to see when it is ready to use.
*   Learn how to connect to your instance.

Send feedback