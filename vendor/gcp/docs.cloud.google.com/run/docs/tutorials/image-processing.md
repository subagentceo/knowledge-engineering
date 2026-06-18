# Process images from Cloud Storage tutorial

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Application hosting
*   Cloud Run
*   Guides

Send feedback

# Process images from Cloud Storage tutorial Stay organized with collections Save and categorize content based on your preferences.

This tutorial demonstrates using Cloud Run, Cloud Vision API, and ImageMagick to detect and blur offensive images uploaded to a Cloud Storage bucket. This tutorial builds on the tutorial Use Pub/Sub with Cloud Run.

This tutorial walks through modifying an existing sample app. You can also download the completed sample if you want.

## Objectives

*   Write, build, and deploy an asynchronous data processing service to Cloud Run.
*   Invoke the service by uploading a file to Cloud Storage, creating a Pub/Sub message.
*   Use the Cloud Vision API to detect violent or adult content.
*   Use ImageMagick to blur offensive images.
*   Test the service by uploading an image of a flesh-eating zombie.

## Costs

In this document, you use the following billable components of Google Cloud:

*   Artifact Registry
*   Cloud Build
*   Pub/Sub
*   Cloud Run
*   Cloud Storage
*   Cloud Vision API

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
    

2.  Enable the Artifact Registry, Cloud Build, Pub/Sub, Cloud Run, Cloud Storage and Cloud Vision APIs.
    
    **Roles required to enable APIs**
    
    To enable APIs, you need the Service Usage Admin IAM role (`roles/serviceusage.serviceUsageAdmin`), which contains the `serviceusage.services.enable` permission. Learn how to grant roles.
    
    Enable the APIs
    
3.  Install and initialize the gcloud CLI.
4.  Update components:
    
    gcloud components update
    
5.  Set up a Pub/Sub topic, a secure push subscription, and an initial Cloud Run service to handle messages by following the Use Pub/Sub tutorial

### Required roles

To get the permissions that you need to complete the tutorial, ask your administrator to grant you the following IAM roles on your project:

*   Cloud Build Editor (`roles/cloudbuild.builds.editor`)
*   Cloud Run Admin (`roles/run.admin`)
*   Logs View Accessor (`roles/logging.viewAccessor`)
*   Project IAM Admin (`roles/resourcemanager.projectIamAdmin`)
*   Pub/Sub Admin (`roles/pubsub.admin`)
*   Service Account User (`roles/iam.serviceAccountUser`)
*   Service Usage Consumer (`roles/serviceusage.serviceUsageConsumer`)
*   Storage Admin (`roles/storage.admin`)

For more information about granting roles, see Manage access to projects, folders, and organizations.

You might also be able to get the required permissions through custom roles or other predefined roles.

**Note:** IAM basic roles might also contain permissions to complete the tutorial. You shouldn't grant basic roles in a production environment, but you can grant them in a development or test environment.

## Setting up gcloud defaults

To configure gcloud with defaults for your Cloud Run service:

1.  Set your default project:
    
    gcloud config set project PROJECT_ID
    
    Replace PROJECT_ID with the name of the project you created for this tutorial.
    
2.  Configure gcloud for your chosen region:
    
    gcloud config set run/region REGION
    
    Replace REGION with the supported Cloud Run region of your choice.
    

### Cloud Run locations

Cloud Run is regional, which means the infrastructure that runs your Cloud Run services is located in a specific region and is managed by Google to be redundantly available across all the zones within that region.  
  

Meeting your latency, availability, or durability requirements are primary factors for selecting the region where your Cloud Run services are run. You can generally select the region nearest to your users but you should consider the location of the other Google Cloud products that are used by your Cloud Run service. Using Google Cloud products together across multiple locations can affect your service's latency as well as cost.  
  

Cloud Run is available in the following regions:

#### Subject to Tier 1 pricing

*   `asia-east1` (Taiwan)
*   `asia-northeast1` (Tokyo)
*   `asia-northeast2` (Osaka)
*   `asia-south1` (Mumbai, India)
*   `asia-southeast3` (Bangkok)
*   `europe-north1` (Finland) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `europe-north2` (Stockholm) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `europe-southwest1` (Madrid) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `europe-west1` (Belgium) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `europe-west4` (Netherlands) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `europe-west8` (Milan)
*   `europe-west9` (Paris) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `me-west1` (Tel Aviv)
*   `northamerica-south1` (Mexico)
*   `us-central1` (Iowa) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `us-east1` (South Carolina)
*   `us-east4` (Northern Virginia)
*   `us-east5` (Columbus)
*   `us-south1` (Dallas) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `us-west1` (Oregon) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2

#### Subject to Tier 2 pricing

*   `africa-south1` (Johannesburg)
*   `asia-east2` (Hong Kong)
*   `asia-northeast3` (Seoul, South Korea)
*   `asia-southeast1` (Singapore)
*   `asia-southeast2` (Jakarta)
*   `asia-south2` (Delhi, India)
*   `australia-southeast1` (Sydney)
*   `australia-southeast2` (Melbourne)
*   `europe-central2` (Warsaw, Poland)
*   `europe-west10` (Berlin)
*   `europe-west12` (Turin)
*   `europe-west2` (London, UK) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `europe-west3` (Frankfurt, Germany)
*   `europe-west6` (Zurich, Switzerland) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `me-central1` (Doha)
*   `me-central2` (Dammam)
*   `northamerica-northeast1` (Montreal) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `northamerica-northeast2` (Toronto) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `southamerica-east1` (Sao Paulo, Brazil) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `southamerica-west1` (Santiago, Chile) ![leaf icon](https://cloud.google.com/sustainability/region-carbon/gleaf.svg) Low CO2
*   `us-west2` (Los Angeles)
*   `us-west3` (Salt Lake City)
*   `us-west4` (Las Vegas)

If you already created a Cloud Run service, you can view the region in the Cloud Run dashboard in the Google Cloud console.

OK

## Understanding the sequence of operations

The flow of data in this tutorial follows these steps:

1.  A user uploads an image to a Cloud Storage bucket.
2.  Cloud Storage publishes a message about the new file to Pub/Sub.
3.  Pub/Sub pushes the message to the Cloud Run service.
4.  The Cloud Run service retrieves the image file referenced in the Pub/Sub message.
5.  The Cloud Run service uses the Cloud Vision API to analyze the image.
6.  If violent or adult content is detected, the Cloud Run service uses ImageMagick to blur the image.
7.  The Cloud Run service uploads the blurred image to another Cloud Storage bucket for use.

Subsequent use of the blurred image is left as an exercise for the reader.

## Create an Artifact Registry standard repository

Create an Artifact Registry standard repository to store your container image:

gcloud artifacts repositories create REPOSITORY \
    --repository-format=docker \
    --location=REGION

Replace:

*   REPOSITORY with a unique name for the repository.
*   REGION with the Google Cloud region to be used for the Artifact Registry repository.

## Set up Cloud Storage buckets

### gcloud

1.  Create a Cloud Storage bucket for uploading images, where INPUT_BUCKET_NAME is a globally unique bucket name:
    
    gcloud storage buckets create gs://INPUT_BUCKET_NAME
    
    The Cloud Run service only reads from this bucket.
    
2.  Create a second Cloud Storage bucket to receive blurred images, where BLURRED_BUCKET_NAME is a globally unique bucket name:
    
    gcloud storage buckets create gs://BLURRED_BUCKET_NAME
    
    The Cloud Run service uploads blurred images to this bucket. Using a separate bucket prevents processed images from re-triggering the service.
    
    By default, Cloud Run revisions execute as the Compute Engine default service account.
    
    If, instead, you are using a user-managed service account, ensure that you have assigned the required IAM roles so that it has `storage.objects.get` permission for reading from INPUT_BUCKET_NAME and `storage.objects.create` permission for uploading to BLURRED_BUCKET_NAME.
    

### Terraform

To learn how to apply or remove a Terraform configuration, see Basic Terraform commands.

Create two Cloud Storage buckets: one for uploading original images and another for the Cloud Run service to upload blurred images.

To create both Cloud Storage buckets with globally unique names, add the following to your existing `main.tf` file:

```
resource "random_id" "bucket_suffix" {
  byte_length = 8
}

resource "google_storage_bucket" "imageproc_input" {
  name     = "input-bucket-${random_id.bucket_suffix.hex}"
  location = "us-central1"
}

output "input_bucket_name" {
  value = google_storage_bucket.imageproc_input.name
}

resource "google_storage_bucket" "imageproc_output" {
  name     = "output-bucket-${random_id.bucket_suffix.hex}"
  location = "us-central1"
}

output "blurred_bucket_name" {
  value = google_storage_bucket.imageproc_output.name
}
```

By default, Cloud Run revisions execute as the Compute Engine default service account.

If, instead, you are using a user-managed service account, ensure that you have assigned the required IAM roles so that it has `storage.objects.get` permission for reading from `google_storage_bucket.imageproc_input` and `storage.objects.create` permission for uploading to `google_storage_bucket.imageproc_output`.

In the following steps, you create and deploy a service that processes notification of file uploads to the INPUT_BUCKET_NAME. You turn on notification delivery after you deploy and test the service, to avoid premature invocation of the new service.

## Modify the Pub/Sub tutorial sample code

This tutorial builds on the code assembled in the Use Pub/Sub tutorial. If you have not yet completed that tutorial, do so now, skipping the cleanup steps, then return here to add image processing behavior.

### Add image processing code

The image processing code is separated from request handling for readability and ease of testing. To add image processing code:

1.  Change to the directory of the Pub/Sub tutorial sample code.
    
2.  Add code to import the image processing dependencies, including libraries to integrate with Google Cloud services, ImageMagick, and the file system.
    
    ### Node.js
    
    Open a new `image.js` file in your editor, and copy in the following:
    
    ```
    const fs = require('fs').promises;
    const sharp = require('sharp');
    const path = require('path');
    const vision = require('@google-cloud/vision');
    
    const {Storage} = require('@google-cloud/storage');
    const storage = new Storage();
    const client = new vision.ImageAnnotatorClient();
    
    const {BLURRED_BUCKET_NAME} = process.env;
    ```
    
    ### Python
    
    Open a new `image.py` file in your editor, and copy in the following:
    
    ```
    import os
    import tempfile
    
    from google.cloud import storage, vision
    from wand.image import Image
    
    storage_client = storage.Client()
    vision_client = vision.ImageAnnotatorClient()
    ```
    
    ### Go
    
    Open a new `imagemagick/imagemagick.go` file in your editor, and copy in the following:
    
    ```
    
    // Package imagemagick contains an example of using ImageMagick to process a
    // file uploaded to Cloud Storage.
    package imagemagick
    
    import (
    	"context"
    	"errors"
    	"fmt"
    	"log"
    	"os"
    	"os/exec"
    
    	"cloud.google.com/go/storage"
    	vision "cloud.google.com/go/vision/apiv1"
    	"cloud.google.com/go/vision/v2/apiv1/visionpb"
    )
    
    // Global API clients used across function invocations.
    var (
    	storageClient *storage.Client
    	visionClient  *vision.ImageAnnotatorClient
    )
    
    func init() {
    	// Declare a separate err variable to avoid shadowing the client variables.
    	var err error
    
    	storageClient, err = storage.NewClient(context.Background())
    	if err != nil {
    		log.Fatalf("storage.NewClient: %v", err)
    	}
    
    	visionClient, err = vision.NewImageAnnotatorClient(context.Background())
    	if err != nil {
    		log.Fatalf("vision.NewAnnotatorClient: %v", err)
    	}
    }
    ```
    
    ### Java
    
    Open a new `src/main/java/com/example/cloudrun/ImageMagick.java` file in your editor, and copy in the following:
    
    ```
    import com.google.cloud.storage.Blob;
    import com.google.cloud.storage.BlobId;
    import com.google.cloud.storage.BlobInfo;
    import com.google.cloud.storage.Storage;
    import com.google.cloud.storage.StorageOptions;
    import com.google.cloud.vision.v1.AnnotateImageRequest;
    import com.google.cloud.vision.v1.AnnotateImageResponse;
    import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
    import com.google.cloud.vision.v1.Feature;
    import com.google.cloud.vision.v1.Feature.Type;
    import com.google.cloud.vision.v1.Image;
    import com.google.cloud.vision.v1.ImageAnnotatorClient;
    import com.google.cloud.vision.v1.ImageSource;
    import com.google.cloud.vision.v1.SafeSearchAnnotation;
    import com.google.gson.JsonObject;
    import java.io.IOException;
    import java.nio.file.Files;
    import java.nio.file.Path;
    import java.nio.file.Paths;
    import java.util.ArrayList;
    import java.util.List;
    
    public class ImageMagick {
    
      private static final String BLURRED_BUCKET_NAME = System.getenv("BLURRED_BUCKET_NAME");
      private static Storage storage = StorageOptions.getDefaultInstance().getService();
    ```
    
3.  Add code to receives a Pub/Sub message as an event object and control the image processing.
    
    The event contains data about the originally uploaded image. This code determines if the image needs be blurred by checking the results of a Cloud Vision analysis for violent or adult content.
    
    ### Node.js
    
    ```
    // Blurs uploaded images that are flagged as Adult or Violence.
    exports.blurOffensiveImages = async event => {
      // This event represents the triggering Cloud Storage object.
      const object = event;
    
      if (object.bucket === BLURRED_BUCKET_NAME) {
        console.log(
          'Event triggered by the blurred bucket; skip to avoid recursion'
        );
        return;
      }
    
      const file = storage.bucket(object.bucket).file(object.name);
      const filePath = `gs://${object.bucket}/${object.name}`;
    
      console.log(`Analyzing ${file.name}.`);
    
      try {
        const [result] = await client.safeSearchDetection(filePath);
        const detections = result.safeSearchAnnotation || {};
    
        if (
          // Levels are defined in https://cloud.google.com/vision/docs/reference/rest/v1/AnnotateImageResponse#likelihood
          detections.adult === 'VERY_LIKELY' ||
          detections.violence === 'VERY_LIKELY'
        ) {
          console.log(`Detected ${file.name} as inappropriate.`);
          return blurImage(file, BLURRED_BUCKET_NAME);
        } else {
          console.log(`Detected ${file.name} as OK.`);
        }
      } catch (err) {
        console.error(`Failed to analyze ${file.name}.`, err);
        throw err;
      }
    };
    ```
    
    ### Python
    
    ```
    def blur_offensive_images(data):
        """Blurs uploaded images that are flagged as Adult or Violence.
    
        Args:
            data: Pub/Sub message data
        """
        file_data = data
    
        file_name = file_data["name"]
        bucket_name = file_data["bucket"]
    
        blob = storage_client.bucket(bucket_name).get_blob(file_name)
        blob_uri = f"gs://{bucket_name}/{file_name}"
        blob_source = vision.Image(source=vision.ImageSource(image_uri=blob_uri))
    
        # Ignore already-blurred files
        if file_name.startswith("blurred-"):
            print(f"The image {file_name} is already blurred.")
            return
    
        print(f"Analyzing {file_name}.")
    
        result = vision_client.safe_search_detection(image=blob_source)
        detected = result.safe_search_annotation
    
        # Process image
        if detected.adult == 5 or detected.violence == 5:
            print(f"The image {file_name} was detected as inappropriate.")
            return __blur_image(blob)
        else:
            print(f"The image {file_name} was detected as OK.")
    ```
    
    ### Go
    
    ```
    
    // GCSEvent is the payload of a GCS event.
    type GCSEvent struct {
    	Bucket string `json:"bucket"`
    	Name   string `json:"name"`
    }
    
    // BlurOffensiveImages blurs offensive images uploaded to GCS.
    func BlurOffensiveImages(ctx context.Context, e GCSEvent) error {
    	outputBucket := os.Getenv("BLURRED_BUCKET_NAME")
    	if outputBucket == "" {
    		return errors.New("BLURRED_BUCKET_NAME must be set")
    	}
    
    	img := vision.NewImageFromURI(fmt.Sprintf("gs://%s/%s", e.Bucket, e.Name))
    
    	resp, err := visionClient.DetectSafeSearch(ctx, img, nil)
    	if err != nil {
    		return fmt.Errorf("AnnotateImage: %w", err)
    	}
    
    	if resp.GetAdult() == visionpb.Likelihood_VERY_LIKELY ||
    		resp.GetViolence() == visionpb.Likelihood_VERY_LIKELY {
    		return blur(ctx, e.Bucket, outputBucket, e.Name)
    	}
    	log.Printf("The image %q was detected as OK.", e.Name)
    	return nil
    }
    ```
    
    ### Java
    
    ```
    // Blurs uploaded images that are flagged as Adult or Violence.
    public static void blurOffensiveImages(JsonObject data) {
      String fileName = data.get("name").getAsString();
      String bucketName = data.get("bucket").getAsString();
      BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, fileName).build();
      // Construct URI to GCS bucket and file.
      String gcsPath = String.format("gs://%s/%s", bucketName, fileName);
      System.out.println(String.format("Analyzing %s", fileName));
    
      // Construct request.
      List<AnnotateImageRequest> requests = new ArrayList<>();
      ImageSource imgSource = ImageSource.newBuilder().setImageUri(gcsPath).build();
      Image img = Image.newBuilder().setSource(imgSource).build();
      Feature feature = Feature.newBuilder().setType(Type.SAFE_SEARCH_DETECTION).build();
      AnnotateImageRequest request =
          AnnotateImageRequest.newBuilder().addFeatures(feature).setImage(img).build();
      requests.add(request);
    
      // Send request to the Vision API.
      try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
        BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
        List<AnnotateImageResponse> responses = response.getResponsesList();
        for (AnnotateImageResponse res : responses) {
          if (res.hasError()) {
            System.out.println(String.format("Error: %s\n", res.getError().getMessage()));
            return;
          }
          // Get Safe Search Annotations
          SafeSearchAnnotation annotation = res.getSafeSearchAnnotation();
          if (annotation.getAdultValue() == 5 || annotation.getViolenceValue() == 5) {
            System.out.println(String.format("Detected %s as inappropriate.", fileName));
            blur(blobInfo);
          } else {
            System.out.println(String.format("Detected %s as OK.", fileName));
          }
        }
      } catch (Exception e) {
        System.out.println(String.format("Error with Vision API: %s", e.getMessage()));
      }
    }
    ```
    
4.  Retrieve the referenced image from the Cloud Storage input bucket created above, use ImageMagick to transform the image with a blur effect, and upload the result to the output bucket.
    
    ### Node.js
    
    ```
    // Blurs the given file using sharp, and uploads it to another bucket.
    const blurImage = async (file, blurredBucketName) => {
      const tempLocalPath = `/tmp/${path.parse(file.name).base}`;
      const tempLocalBlurredPath = `/tmp/blurred-${path.parse(file.name).base}`;
    
      // Download file from bucket.
      try {
        await file.download({destination: tempLocalPath});
    
        console.log(`Downloaded ${file.name} to ${tempLocalPath}.`);
      } catch (err) {
        throw new Error(`File download failed: ${err}`);
      }
    
      try {
        await sharp(tempLocalPath).blur(16).toFile(tempLocalBlurredPath);
    
        console.log(`Blurred image: ${file.name}`);
      } catch (err) {
        console.error('Failed to blur image.', err);
        throw err;
      }
    
      // Upload result to a different bucket, to avoid re-triggering this function.
      const blurredBucket = storage.bucket(blurredBucketName);
    
      // Upload the Blurred image back into the bucket.
      const gcsPath = `gs://${blurredBucketName}/${file.name}`;
      try {
        await blurredBucket.upload(tempLocalBlurredPath, {destination: file.name});
        console.log(`Uploaded blurred image to: ${gcsPath}`);
      } catch (err) {
        throw new Error(`Unable to upload blurred image to ${gcsPath}: ${err}`);
      } finally {
        // Delete the temporary file.
        await Promise.allSettled([
          fs.unlink(tempLocalPath),
          fs.unlink(tempLocalBlurredPath),
        ]);
      }
    };
    ```
    
    ### Python
    
    ```
    def __blur_image(current_blob):
        """Blurs the given file using ImageMagick.
    
        Args:
            current_blob: a Cloud Storage blob
        """
        file_name = current_blob.name
        _, temp_local_filename = tempfile.mkstemp()
    
        # Download file from bucket.
        current_blob.download_to_filename(temp_local_filename)
        print(f"Image {file_name} was downloaded to {temp_local_filename}.")
    
        # Blur the image using ImageMagick.
        with Image(filename=temp_local_filename) as image:
            image.resize(*image.size, blur=16, filter="hamming")
            image.save(filename=temp_local_filename)
    
        print(f"Image {file_name} was blurred.")
    
        # Upload result to a second bucket, to avoid re-triggering the function.
        # You could instead re-upload it to the same bucket + tell your function
        # to ignore files marked as blurred (e.g. those with a "blurred" prefix)
        blur_bucket_name = os.getenv("BLURRED_BUCKET_NAME")
        blur_bucket = storage_client.bucket(blur_bucket_name)
        new_blob = blur_bucket.blob(file_name)
        new_blob.upload_from_filename(temp_local_filename)
        print(f"Blurred image uploaded to: gs://{blur_bucket_name}/{file_name}")
    
        # Delete the temporary file.
        os.remove(temp_local_filename)
    ```
    
    ### Go
    
    ```
    
    // blur blurs the image stored at gs://inputBucket/name and stores the result in
    // gs://outputBucket/name.
    func blur(ctx context.Context, inputBucket, outputBucket, name string) error {
    	inputBlob := storageClient.Bucket(inputBucket).Object(name)
    	r, err := inputBlob.NewReader(ctx)
    	if err != nil {
    		return fmt.Errorf("NewReader: %w", err)
    	}
    
    	outputBlob := storageClient.Bucket(outputBucket).Object(name)
    	w := outputBlob.NewWriter(ctx)
    	defer w.Close()
    
    	// Use - as input and output to use stdin and stdout.
    	cmd := exec.Command("convert", "-", "-blur", "0x8", "-")
    	cmd.Stdin = r
    	cmd.Stdout = w
    
    	if err := cmd.Run(); err != nil {
    		return fmt.Errorf("cmd.Run: %w", err)
    	}
    
    	log.Printf("Blurred image uploaded to gs://%s/%s", outputBlob.BucketName(), outputBlob.ObjectName())
    
    	return nil
    }
    ```
    
    ### Java
    
      ```
      // Blurs the file described by blobInfo using ImageMagick,
      // and uploads it to the blurred bucket.
      public static void blur(BlobInfo blobInfo) throws IOException {
        String bucketName = blobInfo.getBucket();
        String fileName = blobInfo.getName();
        // Download image
        Blob blob = storage.get(BlobId.of(bucketName, fileName));
        Path download = Paths.get("/tmp/", fileName);
        blob.downloadTo(download);
    
        // Construct the command.
        List<String> args = new ArrayList<>();
        args.add("convert");
        args.add(download.toString());
        args.add("-blur");
        args.add("0x8");
        Path upload = Paths.get("/tmp/", "blurred-" + fileName);
        args.add(upload.toString());
        try {
          ProcessBuilder pb = new ProcessBuilder(args);
          Process process = pb.start();
          process.waitFor();
        } catch (Exception e) {
          System.out.println(String.format("Error: %s", e.getMessage()));
        }
    
        // Upload image to blurred bucket.
        BlobId blurredBlobId = BlobId.of(BLURRED_BUCKET_NAME, fileName);
        BlobInfo blurredBlobInfo =
            BlobInfo.newBuilder(blurredBlobId).setContentType(blob.getContentType()).build();
        try {
          byte[] blurredFile = Files.readAllBytes(upload);
          Blob blurredBlob = storage.create(blurredBlobInfo, blurredFile);
          System.out.println(
              String.format("Blurred image uploaded to: gs://%s/%s", BLURRED_BUCKET_NAME, fileName));
        } catch (Exception e) {
          System.out.println(String.format("Error in upload: %s", e.getMessage()));
        }
    
        // Remove images from fileSystem
        Files.delete(download);
        Files.delete(upload);
      }
    }
    ```
    

### Integrate image processing into the Pub/Sub sample code

To modify the existing service to incorporate the image processing code:

1.  Add new dependencies for your service, including the Cloud Vision and Cloud Storage client libraries:
    
    ### Node.js
    
    `npm install gm @google-cloud/storage @google-cloud/vision`
    
    ### Python
    
    Add the necessary client libraries so that your `requirements.txt` will look something like this:
    
    ```
    Flask==3.1.3; python_version >= '3.9'
    google-cloud-storage==2.12.0
    google-cloud-vision==3.8.1
    gunicorn==23.0.0
    Wand==0.6.13
    Werkzeug==3.1.8; python_version >= '3.9'
    ```
    
    ### Go
    
    The go sample application uses go modules, the new dependencies added above in the `imagemagick/imagemagick.go` import statement will automatically download by the next command that needs them.
    
    ### Java
    
    Add the following dependency under `<dependencyManagement>` in the `pom.xml`:
    
    ```
    <dependency>
      <groupId>com.google.cloud</groupId>
      <artifactId>spring-cloud-gcp-dependencies</artifactId>
      <version>4.9.2</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
    ```
    
    Add the following dependencies under `<dependencies>` in the `pom.xml`:
    
    ```
    <dependency>
      <groupId>com.google.code.gson</groupId>
      <artifactId>gson</artifactId>
      <scope>compile</scope>
    </dependency>
    <dependency>
      <groupId>com.google.cloud</groupId>
      <artifactId>spring-cloud-gcp-starter-vision</artifactId>
    </dependency>
    <dependency>
      <groupId>com.google.cloud</groupId>
      <artifactId>spring-cloud-gcp-starter-storage</artifactId>
    </dependency>
    ```
    
2.  Add the ImageMagick system package to your container by modifying the `Dockerfile` below the `FROM` statement. If using a "multi-stage" Dockerfile, place this in the final stage.
    
    Debian/Ubuntu
    
    ```
    
    # Install Imagemagick into the container image.
    # For more on system packages review the system packages tutorial.
    # https://cloud.google.com/run/docs/tutorials/system-packages#dockerfile
    RUN set -ex; \
      apt-get -y update; \
      apt-get -y install imagemagick; \
      rm -rf /var/lib/apt/lists/*
    ```
    
    Alpine
    
    ```
    
    # Install Imagemagick into the container image.
    # For more on system packages review the system packages tutorial.
    # https://cloud.google.com/run/docs/tutorials/system-packages#dockerfile
    RUN apk add --no-cache imagemagick
    ```
    
    Read more about working with system packages in your Cloud Run service in the Using system packages tutorial.
    
3.  Replace the existing Pub/Sub message handling code with a function call to our new blurring logic.
    
    ### Node.js
    
    The `app.js` file defines the Express.js app and prepares received Pub/Sub messages for use. Make the following changes:
    
    *   Add code to import the new `image.js` file
    *   Remove the existing "Hello World" code from the route
    *   Add code to further validate the Pub/Sub message
    *   Add code to call the new image processing function
        
        When you are finished, the code will look like this:
        
    
    ```
    
    const express = require('express');
    const app = express();
    
    // This middleware is available in Express v4.16.0 onwards
    app.use(express.json());
    
    const image = require('./image');
    
    app.post('/', async (req, res) => {
      if (!req.body) {
        const msg = 'no Pub/Sub message received';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
      }
      if (!req.body.message || !req.body.message.data) {
        const msg = 'invalid Pub/Sub message format';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
      }
    
      // Decode the Pub/Sub message.
      const pubSubMessage = req.body.message;
      let data;
      try {
        data = Buffer.from(pubSubMessage.data, 'base64').toString().trim();
        data = JSON.parse(data);
      } catch (err) {
        const msg =
          'Invalid Pub/Sub message: data property is not valid base64 encoded JSON';
        console.error(`error: ${msg}: ${err}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
      }
    
      // Validate the message is a Cloud Storage event.
      if (!data.name || !data.bucket) {
        const msg =
          'invalid Cloud Storage notification: expected name and bucket properties';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
      }
    
      try {
        await image.blurOffensiveImages(data);
        res.status(204).send();
      } catch (err) {
        console.error(`error: Blurring image: ${err}`);
        res.status(500).send();
      }
    });
    ```
    
    ### Python
    
    The `main.py` file defines the Flask app and prepares received Pub/Sub messages for use. Make the following changes:
    
    *   Add code to import the new `image.py` file
    *   Remove the existing "Hello World" code from the route
    *   Add code to further validate the Pub/Sub message
    *   Add code to call the new image processing function
        
        When you are finished, the code will look like this:
        
    
    ```
    import base64
    import json
    import os
    
    from flask import Flask, request
    
    import image
    
    
    app = Flask(__name__)
    
    
    @app.route("/", methods=["POST"])
    def index():
        """Receive and parse Pub/Sub messages containing Cloud Storage event data."""
        envelope = request.get_json()
        if not envelope:
            msg = "no Pub/Sub message received"
            print(f"error: {msg}")
            return f"Bad Request: {msg}", 400
    
        if not isinstance(envelope, dict) or "message" not in envelope:
            msg = "invalid Pub/Sub message format"
            print(f"error: {msg}")
            return f"Bad Request: {msg}", 400
    
        # Decode the Pub/Sub message.
        pubsub_message = envelope["message"]
    
        if isinstance(pubsub_message, dict) and "data" in pubsub_message:
            try:
                data = json.loads(base64.b64decode(pubsub_message["data"]).decode())
    
            except Exception as e:
                msg = (
                    "Invalid Pub/Sub message: "
                    "data property is not valid base64 encoded JSON"
                )
                print(f"error: {e}")
                return f"Bad Request: {msg}", 400
    
            # Validate the message is a Cloud Storage event.
            if not data["name"] or not data["bucket"]:
                msg = (
                    "Invalid Cloud Storage notification: "
                    "expected name and bucket properties"
                )
                print(f"error: {msg}")
                return f"Bad Request: {msg}", 400
    
            try:
                image.blur_offensive_images(data)
                return ("", 204)
    
            except Exception as e:
                print(f"error: {e}")
                return ("", 500)
    
        return ("", 500)
    ```
    
    ### Go
    
    The `main.go` file defines the HTTP service and prepares received Pub/Sub messages for use. Make the following changes:
    
    *   Add code to import the new `imagemagick.go` file
    *   Remove the existing "Hello World" code from the handler
    *   Add code to further validate the Pub/Sub message
    *   Add code to call the new image processing function
    
    ```
    
    // Sample image-processing is a Cloud Run service which performs asynchronous processing on images.
    package main
    
    import (
    	"encoding/json"
    	"io"
    	"log"
    	"net/http"
    	"os"
    
    	"github.com/GoogleCloudPlatform/golang-samples/run/image-processing/imagemagick"
    )
    
    func main() {
    	http.HandleFunc("/", HelloPubSub)
    	// Determine port for HTTP service.
    	port := os.Getenv("PORT")
    	if port == "" {
    		port = "8080"
    	}
    	// Start HTTP server.
    	log.Printf("Listening on port %s", port)
    	if err := http.ListenAndServe(":"+port, nil); err != nil {
    		log.Fatal(err)
    	}
    }
    
    // PubSubMessage is the payload of a Pub/Sub event.
    // See the documentation for more details:
    // https://cloud.google.com/pubsub/docs/reference/rest/v1/PubsubMessage
    type PubSubMessage struct {
    	Message struct {
    		Data []byte `json:"data,omitempty"`
    		ID   string `json:"id"`
    	} `json:"message"`
    	Subscription string `json:"subscription"`
    }
    
    // HelloPubSub receives and processes a Pub/Sub push message.
    func HelloPubSub(w http.ResponseWriter, r *http.Request) {
    	var m PubSubMessage
    	body, err := io.ReadAll(r.Body)
    	if err != nil {
    		log.Printf("ioutil.ReadAll: %v", err)
    		http.Error(w, "Bad Request", http.StatusBadRequest)
    		return
    	}
    	if err := json.Unmarshal(body, &m); err != nil {
    		log.Printf("json.Unmarshal: %v", err)
    		http.Error(w, "Bad Request", http.StatusBadRequest)
    		return
    	}
    
    	var e imagemagick.GCSEvent
    	if err := json.Unmarshal(m.Message.Data, &e); err != nil {
    		log.Printf("json.Unmarshal: %v", err)
    		http.Error(w, "Bad Request", http.StatusBadRequest)
    		return
    	}
    
    	if e.Name == "" || e.Bucket == "" {
    		log.Printf("invalid GCSEvent: expected name and bucket")
    		http.Error(w, "Bad Request", http.StatusBadRequest)
    		return
    	}
    
    	if err := imagemagick.BlurOffensiveImages(r.Context(), e); err != nil {
    		log.Printf("imagemagick.BlurOffensiveImages: %v", err)
    		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
    	}
    }
    ```
    
    ### Java
    
    The `PubSubController.java` file defines the controller that handles HTTP requests and prepares received Pub/Sub messages for use. Make the following changes:
    
    *   Add the new imports
    *   Remove the existing "Hello World" code from the controller
    *   Add code to further validate the Pub/Sub message
    *   Add code to call the new image processing function
    
    ```
    import com.google.gson.JsonObject;
    import com.google.gson.JsonParser;
    import java.util.Base64;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestMethod;
    import org.springframework.web.bind.annotation.RestController;
    
    // PubsubController consumes a Pub/Sub message.
    @RestController
    public class PubSubController {
      @RequestMapping(value = "/", method = RequestMethod.POST)
      public ResponseEntity<String> receiveMessage(@RequestBody Body body) {
        // Get PubSub message from request body.
        Body.Message message = body.getMessage();
        if (message == null) {
          String msg = "Bad Request: invalid Pub/Sub message format";
          System.out.println(msg);
          return new ResponseEntity<>(msg, HttpStatus.BAD_REQUEST);
        }
    
        // Decode the Pub/Sub message.
        String pubSubMessage = message.getData();
        JsonObject data;
        try {
          String decodedMessage = new String(Base64.getDecoder().decode(pubSubMessage));
          data = JsonParser.parseString(decodedMessage).getAsJsonObject();
        } catch (Exception e) {
          String msg = "Error: Invalid Pub/Sub message: data property is not valid base64 encoded JSON";
          System.out.println(msg);
          return new ResponseEntity<>(msg, HttpStatus.BAD_REQUEST);
        }
    
        // Validate the message is a Cloud Storage event.
        if (data.get("name") == null || data.get("bucket") == null) {
          String msg = "Error: Invalid Cloud Storage notification: expected name and bucket properties";
          System.out.println(msg);
          return new ResponseEntity<>(msg, HttpStatus.BAD_REQUEST);
        }
    
        try {
          ImageMagick.blurOffensiveImages(data);
        } catch (Exception e) {
          String msg = String.format("Error: Blurring image: %s", e.getMessage());
          System.out.println(msg);
          return new ResponseEntity<>(msg, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.OK);
      }
    }
    ```
    

### Download the complete sample

To retrieve the complete Image Processing code sample for use:

1.  Clone the sample app repository to your local machine:
    
    ### Node.js
    
    git clone https://github.com/GoogleCloudPlatform/nodejs-docs-samples.git
    
    Alternatively, you can download the sample as a zip file and extract it.
    
    ### Python
    
    git clone https://github.com/GoogleCloudPlatform/python-docs-samples.git
    
    Alternatively, you can download the sample as a zip file and extract it.
    
    ### Go
    
    git clone https://github.com/GoogleCloudPlatform/golang-samples.git
    
    Alternatively, you can download the sample as a zip file and extract it.
    
    ### Java
    
    git clone https://github.com/GoogleCloudPlatform/java-docs-samples.git
    
    Alternatively, you can download the sample as a zip file and extract it.
    
2.  Change to the directory that contains the Cloud Run sample code:
    
    ### Node.js
    
    cd nodejs-docs-samples/run/image-processing/
    
    ### Python
    
    cd python-docs-samples/run/image-processing/
    
    ### Go
    
    cd golang-samples/run/image-processing/
    
    ### Java
    
    cd java-docs-samples/run/image-processing/
    

## Ship the code

Shipping code consists of three steps: building a container image with Cloud Build, uploading the container image to Artifact Registry, and deploying the container image to Cloud Run.

To ship your code:

1.  Build your container and publish on Artifact Registry:
    
    ### Node.js
    
    gcloud builds submit --tag REGION-docker.pkg.dev/PROJECT_ID
    /REPOSITORY/pubsub
    
    Where `pubsub` is the name of your service.
    
    Replace:
    
    *   PROJECT_ID with your Google Cloud project ID
    *   REPOSITORY with the name of the Artifact Registry repository.
    *   REGION with the Google Cloud region to be used for the Artifact Registry repository.
    
    Upon success, you will see a SUCCESS message containing the ID, creation time, and image name. The image is stored in Artifact Registry and can be re-used if required.
    
    ### Python
    
    gcloud builds submit --tag REGION-docker.pkg.dev/PROJECT_ID
    /REPOSITORY/pubsub
    
    Where `pubsub` is the name of your service.
    
    Replace:
    
    *   PROJECT_ID with your Google Cloud project ID
    *   REPOSITORY with the name of the Artifact Registry repository.
    *   REGION with the Google Cloud region to be used for the Artifact Registry repository.
    
    Upon success, you will see a SUCCESS message containing the ID, creation time, and image name. The image is stored in Artifact Registry and can be re-used if required.
    
    ### Go
    
    gcloud builds submit --tag REGION-docker.pkg.dev/PROJECT_ID
    /REPOSITORY/pubsub
    
    Where `pubsub` is the name of your service.
    
    Replace:
    
    *   PROJECT_ID with your Google Cloud project ID
    *   REPOSITORY with the name of the Artifact Registry repository.
    *   REGION with the Google Cloud region to be used for the Artifact Registry repository.
    
    Upon success, you will see a SUCCESS message containing the ID, creation time, and image name. The image is stored in Artifact Registry and can be re-used if required.
    
    ### Java
    
    This sample uses Jib to build Docker images using common Java tools. Jib optimizes container builds without the need for a Dockerfile or having Docker installed. Learn more about building Java containers with Jib.
    
    1.  Using the Dockerfile, configure and build a base image with the system packages installed to override Jib's default base image:
        
        ```
        # Use eclipse-temurin for base image.
        # It's important to use JDK 8u191 or above that has container support enabled.
        # https://hub.docker.com/_/eclipse-temurin/
        # https://docs.docker.com/develop/develop-images/multistage-build/#use-multi-stage-builds
        FROM eclipse-temurin:17.0.18_8-jre
        
        # Install Imagemagick into the container image.
        # For more on system packages review the system packages tutorial.
        # https://cloud.google.com/run/docs/tutorials/system-packages#dockerfile
        RUN set -ex; \
          apt-get -y update; \
          apt-get -y install imagemagick; \
          rm -rf /var/lib/apt/lists/*
        ```
        
        gcloud builds submit --tag REGION-docker.pkg.dev/PROJECT_ID
        /REPOSITORY/imagemagick
        
        Replace:
        
        *   PROJECT_ID with your Google Cloud project ID
        *   REPOSITORY with the name of the Artifact Registry repository.
        *   REGION with the Google Cloud region to be used for the Artifact Registry repository.
    2.  Use the gcloud credential helper to authorize Docker to push to your Artifact Registry.
        
        gcloud auth configure-docker
        
    3.  Build your final container with Jib and publish on Artifact Registry:
        
        ```
        <plugin>
          <groupId>com.google.cloud.tools</groupId>
          <artifactId>jib-maven-plugin</artifactId>
          <version>3.4.0</version>
          <configuration>
            <from>
              <image>gcr.io/PROJECT_ID/imagemagick</image>
            </from>
            <to>
              <image>gcr.io/PROJECT_ID/pubsub</image>
            </to>
          </configuration>
        </plugin>
        ```
        
        mvn compile jib:build \
          -Dimage=REGION-docker.pkg.dev/PROJECT_ID
        /REPOSITORY/pubsub \
          -Djib.from.image=REGION-docker.pkg.dev/PROJECT_ID
        /REPOSITORY/imagemagick
        
        Replace:
        
        *   PROJECT_ID with your Google Cloud project ID
        *   REPOSITORY with the name of the Artifact Registry repository.
        *   REGION with the Google Cloud region to be used for the Artifact Registry repository.
    
2.  Run the following command to deploy your service, using the same service name you used in the Use Pub/Sub tutorial:
    
    ### Node.js
    
    gcloud run deploy pubsub-tutorial --image REGION-docker.pkg.dev/PROJECT_ID
    /REPOSITORY/pubsub --set-env-vars=BLURRED_BUCKET_NAME=BLURRED_BUCKET_NAME --no-allow-unauthenticated
    
    ### Python
    
    gcloud run deploy pubsub-tutorial --image REGION-docker.pkg.dev/PROJECT_ID
    /REPOSITORY/pubsub --set-env-vars=BLURRED_BUCKET_NAME=BLURRED_BUCKET_NAME --no-allow-unauthenticated
    
    ### Go
    
    gcloud run deploy pubsub-tutorial --image REGION-docker.pkg.dev/PROJECT_ID
    /REPOSITORY/pubsub --set-env-vars=BLURRED_BUCKET_NAME=BLURRED_BUCKET_NAME --no-allow-unauthenticated
    
    ### Java
    
    gcloud run deploy pubsub-tutorial --image REGION-docker.pkg.dev/PROJECT_ID
    /REPOSITORY/pubsub --set-env-vars=BLURRED_BUCKET_NAME=BLURRED_BUCKET_NAME --memory 512M --no-allow-unauthenticated
    
    Where `pubsub` is the container name and `pubsub-tutorial` is the name of the service. Notice that the container image is deployed to the service and region (Cloud Run) that you configured previously under Setting up gcloud defaults. Replace:
    
    *   PROJECT_ID with your Google Cloud project ID
    *   REPOSITORY with the name of the Artifact Registry repository.
    *   REGION with the Google Cloud region to be used for the Artifact Registry repository.
    *   BLURRED_BUCKET_NAME with your Cloud Storage bucket you created earlier to receive blurred images to set the environment variable.
    
    The `--no-allow-unauthenticated` flag restricts unauthenticated access to the service. By keeping the service private you can rely on Cloud Run's automatic Pub/Sub integration to authenticate requests. See Integrating with Pub/Sub for more details on how this is configured. See Managing Access for more details on IAM-based authentication.
    
    Wait until the deployment is complete: this can take about half a minute. On success, the command line displays the service URL.
    

## Turn on notifications from Cloud Storage

Configure Cloud Storage to publish a message to a Pub/Sub topic whenever a file (known as an object), is uploaded or changed. Send the notification to the previously created topic so any new file upload will invoke the service.

### gcloud

gcloud storage service-agent --project=PROJECT_ID
gcloud storage buckets notifications create gs://INPUT_BUCKET_NAME --topic=myRunTopic --payload-format=json

`myRunTopic` is the topic you created in the previous tutorial.

Replace INPUT_BUCKET_NAME with the name you used when you created the buckets.

For more details about storage bucket notifications, see Configure Pub/Sub notifications for Cloud Storage.

### Terraform

To learn how to apply or remove a Terraform configuration, see Basic Terraform commands.

In order to enable notifications, the Cloud Storage service account unique to the project must exist and have the IAM permission `pubsub.publisher` on the Pub/Sub topic. To grant this permission and create a Cloud Storage notification, add the following to your existing `main.tf` file:

```
data "google_storage_project_service_account" "gcs_account" {}

resource "google_pubsub_topic_iam_binding" "binding" {
  topic   = google_pubsub_topic.default.name
  role    = "roles/pubsub.publisher"
  members = ["serviceAccount:${data.google_storage_project_service_account.gcs_account.email_address}"]
}

resource "google_storage_notification" "notification" {
  bucket         = google_storage_bucket.imageproc_input.name
  payload_format = "JSON_API_V1"
  topic          = google_pubsub_topic.default.id
  depends_on     = [google_pubsub_topic_iam_binding.binding]
}
```

## Try it out

1.  Upload an offensive image, such as this image of a flesh-eating zombie:
    
    curl -o zombie.jpg https://cdn.pixabay.com/photo/2015/09/21/14/24/zombie-949916_960_720.jpg
    gcloud storage cp zombie.jpg gs://INPUT_BUCKET_NAME
    
    where INPUT_BUCKET_NAME is the Cloud Storage bucket you created earlier for uploading images.
    
2.  Navigate to the service logs:
    
    1.  Navigate to the Cloud Run page in the Google Cloud Console
    2.  Click the `pubsub-tutorial` service.
    3.  Select the **Logs** tab. Logs might take a few moments to appear. If you don't see them immediately, check again after a few moments.
3.  Look for the `Blurred image: zombie.png` message.
    
4.  You can view the blurred images in the BLURRED_BUCKET_NAME Cloud Storage bucket you created earlier: locate the bucket in the Cloud Storage page in the Google Cloud Console
    
    **Success:** You deployed a Cloud Run service with Cloud Vision API and ImageMagick to detect images uploaded to a Cloud Storage bucket.
    

## Clean up

To avoid additional charges to your Google Cloud account, delete all the resources you deployed with this tutorial.

### Delete the project

If you created a new project for this tutorial, delete the project. If you used an existing project and need to keep it without the changes you added in this tutorial, delete resources that you created for the tutorial.

The easiest way to eliminate billing is to delete the project that you created for the tutorial.

To delete the project:

**Caution**: Deleting a project has the following effects:

*   **Everything in the project is deleted.** If you used an existing project for the tasks in this document, when you delete it, you also delete any other work you've done in the project.
*   **Custom project IDs are lost.** When you created this project, you might have created a custom project ID that you want to use in the future. To preserve the URLs that use the project ID, such as an `appspot.com` URL, delete selected resources inside the project instead of deleting the whole project.

If you plan to explore multiple architectures, tutorials, or quickstarts, reusing projects can help you avoid exceeding project quota limits.

2.  In the Google Cloud console, go to the **Manage resources** page.
    
    Go to Manage resources
    
3.  In the project list, select the project that you want to delete, and then click **Delete**.
4.  In the dialog, type the project ID, and then click **Shut down** to delete the project.

### Delete tutorial resources

1.  Delete the Cloud Run service you deployed in this tutorial. Cloud Run services don't incur costs until they receive requests.
    
    To delete your Cloud Run service, run the following command:
    
    gcloud run services delete SERVICE-NAME
    
    Replace SERVICE-NAME with the name of your service.
    
    You can also delete Cloud Run services from the Google Cloud console.
    
2.  Remove the `gcloud` default region configuration you added during tutorial setup:
    
     ```
     gcloud config unset run/region
    ```
    
3.  Remove the project configuration:
    
     ```
     gcloud config unset project
    ```
    
4.  Delete other Google Cloud resources created in this tutorial:
    
    *   Delete the Pub/Sub topic `myRunTopic`
    *   Delete the Pub/Sub subscription `myRunSubscription`
    *   Delete your container image from Artifact Registry.
    *   Delete the invoker service account `cloud-run-pubsub-invoker@PROJECT_ID.iam.gserviceaccount.com`
    *   Delete the Cloud Storage buckets created for the placeholders `INPUT_BUCKET_NAME` and `BLURRED_BUCKET_NAME`

## What's next

*   Learn more about persisting data with Cloud Run using Cloud Storage.
*   Understand how to use Cloud Vision API to detect things besides explicit content.
*   Explore reference architectures, diagrams, and best practices about Google Cloud. Take a look at our Cloud Architecture Center.

Send feedback