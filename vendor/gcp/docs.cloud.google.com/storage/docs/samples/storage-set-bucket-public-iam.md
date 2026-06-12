# Make a bucket public

    
    
      
    

    
      
      Stay organized with collections
    
    
      
      Save and categorize content based on your preferences.

*   Home
*   Documentation
*   Storage
*   Cloud Storage
*   Samples

# Make a bucket public Stay organized with collections Save and categorize content based on your preferences.

Make a bucket public by using a bucket-level IAM policy.

## Explore further

For detailed documentation that includes this code sample, see the following:

*   Host a static website
*   Hosting a static website using HTTP
*   Make data public

## Code sample

### C++

For more information, see the Cloud Storage C++ API reference documentation.

To authenticate to Cloud Storage, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
namespace gcs = ::google::cloud::storage;
using ::google::cloud::StatusOr;
[](gcs::Client client, std::string const& bucket_name) {
  auto current_policy = client.GetNativeBucketIamPolicy(
      bucket_name, gcs::RequestedPolicyVersion(3));
  if (!current_policy) throw std::move(current_policy).status();

  current_policy->set_version(3);
  current_policy->bindings().emplace_back(
      gcs::NativeIamBinding("roles/storage.objectViewer", {"allUsers"}));

  auto updated =
      client.SetNativeBucketIamPolicy(bucket_name, *current_policy);
  if (!updated) throw std::move(updated).status();

  std::cout << "Policy successfully updated: " << *updated << "\n";
}
```

### C#

For more information, see the Cloud Storage C# API reference documentation.

To authenticate to Cloud Storage, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```

using Google.Apis.Storage.v1.Data;
using Google.Cloud.Storage.V1;
using System;
using System.Collections.Generic;

public class MakeBucketPublicSample
{
    public void MakeBucketPublic(string bucketName = "your-unique-bucket-name")
    {
        var storage = StorageClient.Create();

        Policy policy = storage.GetBucketIamPolicy(bucketName);

        policy.Bindings.Add(new Policy.BindingsData
        {
            Role = "roles/storage.objectViewer",
            Members = new List<string> { "allUsers" }
        });

        storage.SetBucketIamPolicy(bucketName, policy);
        Console.WriteLine(bucketName + " is now public ");
    }
}
```

### Go

For more information, see the Cloud Storage Go API reference documentation.

To authenticate to Cloud Storage, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
import (
	"context"
	"fmt"
	"io"

	"cloud.google.com/go/iam"
	"cloud.google.com/go/iam/apiv1/iampb"
	"cloud.google.com/go/storage"
)

// setBucketPublicIAM makes all objects in a bucket publicly readable.
func setBucketPublicIAM(w io.Writer, bucketName string) error {
	// bucketName := "bucket-name"
	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("storage.NewClient: %w", err)
	}
	defer client.Close()

	policy, err := client.Bucket(bucketName).IAM().V3().Policy(ctx)
	if err != nil {
		return fmt.Errorf("Bucket(%q).IAM().V3().Policy: %w", bucketName, err)
	}
	role := "roles/storage.objectViewer"
	policy.Bindings = append(policy.Bindings, &iampb.Binding{
		Role:    role,
		Members: []string{iam.AllUsers},
	})
	if err := client.Bucket(bucketName).IAM().V3().SetPolicy(ctx, policy); err != nil {
		return fmt.Errorf("Bucket(%q).IAM().SetPolicy: %w", bucketName, err)
	}
	fmt.Fprintf(w, "Bucket %v is now publicly readable\n", bucketName)
	return nil
}
```

### Java

For more information, see the Cloud Storage Java API reference documentation.

To authenticate to Cloud Storage, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
import com.google.cloud.Identity;
import com.google.cloud.Policy;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.storage.StorageRoles;

public class MakeBucketPublic {
  public static void makeBucketPublic(String projectId, String bucketName) {
    // The ID of your GCP project
    // String projectId = "your-project-id";

    // The ID of your GCS bucket
    // String bucketName = "your-unique-bucket-name";

    Storage storage = StorageOptions.newBuilder().setProjectId(projectId).build().getService();
    Policy originalPolicy = storage.getIamPolicy(bucketName);
    storage.setIamPolicy(
        bucketName,
        originalPolicy.toBuilder()
            .addIdentity(StorageRoles.objectViewer(), Identity.allUsers()) // All users can view
            .build());

    System.out.println("Bucket " + bucketName + " is now publicly readable");
  }
}
```

### Node.js

For more information, see the Cloud Storage Node.js API reference documentation.

To authenticate to Cloud Storage, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
// const bucketName = 'your-unique-bucket-name';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function makeBucketPublic() {
  await storage.bucket(bucketName).makePublic();

  console.log(`Bucket ${bucketName} is now publicly readable`);
}

makeBucketPublic().catch(console.error);
```

### PHP

For more information, see the Cloud Storage PHP API reference documentation.

To authenticate to Cloud Storage, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
use Google\Cloud\Storage\StorageClient;

/**
 * Update the specified bucket's IAM configuration to make it publicly accessible.
 *
 * @param string $bucketName The name of your Cloud Storage bucket.
 *        (e.g. 'my-bucket')
 */
function set_bucket_public_iam(string $bucketName): void
{
    $storage = new StorageClient();
    $bucket = $storage->bucket($bucketName);

    $policy = $bucket->iam()->policy(['requestedPolicyVersion' => 3]);
    $policy['version'] = 3;

    $role = 'roles/storage.objectViewer';
    $members = ['allUsers'];

    $policy['bindings'][] = [
        'role' => $role,
        'members' => $members
    ];

    $bucket->iam()->setPolicy($policy);

    printf('Bucket %s is now public', $bucketName);
}
```

### Python

For more information, see the Cloud Storage Python API reference documentation.

To authenticate to Cloud Storage, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
from typing import List

from google.cloud import storage


def set_bucket_public_iam(
    bucket_name: str = "your-bucket-name",
    members: List[str] = ["allUsers"],
):
    """Set a public IAM Policy to bucket"""
    # bucket_name = "your-bucket-name"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    policy = bucket.get_iam_policy(requested_policy_version=3)
    policy.bindings.append(
        {"role": "roles/storage.objectViewer", "members": members}
    )

    bucket.set_iam_policy(policy)

    print(f"Bucket {bucket.name} is now publicly readable")
```

### Ruby

For more information, see the Cloud Storage Ruby API reference documentation.

To authenticate to Cloud Storage, set up Application Default Credentials. For more information, see Set up authentication for client libraries.

```
def set_bucket_public_iam bucket_name:
  # The ID of your GCS bucket
  # bucket_name = "your-unique-bucket-name"

  require "google/cloud/storage"

  storage = Google::Cloud::Storage.new
  bucket = storage.bucket bucket_name

  bucket.policy do |p|
    p.add "roles/storage.objectViewer", "allUsers"
  end

  puts "Bucket #{bucket_name} is now publicly readable"
end
```

## What's next

To search and filter code samples for other Google Cloud products, see the Google Cloud sample browser.