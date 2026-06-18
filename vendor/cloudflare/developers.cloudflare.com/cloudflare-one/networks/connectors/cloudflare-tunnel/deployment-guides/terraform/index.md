---
title: Terraform
description: Learn how to deploy a Cloudflare Tunnel using Terraform and our lightweight server-side daemon, cloudflared.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Terraform

[Terraform ↗](https://www.terraform.io/) is an infrastructure as code software tool that allows you to deploy services from different providers using a standardized configuration syntax. When creating a Terraform configuration file, you define the final state of the configuration rather than the step-by-step procedure. This allows you to easily deploy, modify, and manage your Tunnels alongside your other infrastructure.

In this guide, you will use Terraform to deploy:

* A Google Cloud Project (GCP) virtual machine that runs an HTTP test server
* A Cloudflare Tunnel that makes the server available over the Internet
* A Cloudflare Access policy that defines who can connect to the server

Tip

If your server is behind a restrictive firewall, verify it can reach Cloudflare on port `7844` before proceeding. Refer to [Connectivity pre-checks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/troubleshoot-tunnels/connectivity-prechecks/).

## Prerequisites

To complete the following procedure, you will need:

* [A Google Cloud Project ↗](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating%5Fa%5Fproject)
* [A zone on Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/)
* Enabled [one-time PIN login](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/) or integrated an [identity provider](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/)

## 1\. Install Terraform

Refer to the [Terraform installation guide ↗](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) for your operating system.

## 2\. Install the gcloud CLI

1. [Install the gcloud CLI ↗](https://cloud.google.com/sdk/docs/install) so that Terraform can interact with your GCP account.
2. Authenticate with the CLI by running:  
Terminal window  
```  
gcloud auth application-default login  
```

## 3\. Create a Cloudflare API token

[Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) so that Terraform can interact with your Cloudflare account. At minimum, your token should include the following permissions:

| Type    | Item                      | Permission |
| ------- | ------------------------- | ---------- |
| Account | Cloudflare Tunnel         | Edit       |
| Account | Access: Apps and Policies | Edit       |
| Zone    | DNS                       | Edit       |

## 4\. Create a configuration directory

Terraform functions through a working directory that contains configuration files. You can store your configuration in multiple files or just one — Terraform will evaluate all of the configuration files in the directory as if they were in a single document.

1. Create a folder for your Terraform configuration:  
Terminal window  
```  
mkdir cloudflare-tf  
```
2. Change into the directory:  
Terminal window  
```  
cd cloudflare-tf  
```

## 5\. Create Terraform configuration files

### Define input variables

The following variables will be passed into your GCP and Cloudflare configuration.

1. In your configuration directory, create a `.tf` file:  
Terminal window  
```  
touch variables.tf  
```
2. Open the file in a text editor and copy and paste the following:  
```  
# GCP variables  
variable "gcp_project_id" {  
  description = "Google Cloud Platform (GCP) project ID"  
  type        = string  
}  
variable "zone" {  
  description = "Geographical zone for the GCP VM instance"  
  type        = string  
}  
variable "machine_type" {  
  description = "Machine type for the GCP VM instance"  
  type        = string  
}  
# Cloudflare variables  
variable "cloudflare_zone" {  
  description = "Domain used to expose the GCP VM instance to the Internet"  
  type        = string  
}  
variable "cloudflare_zone_id" {  
  description = "Zone ID for your domain"  
  type        = string  
}  
variable "cloudflare_account_id" {  
  description = "Account ID for your Cloudflare account"  
  type        = string  
  sensitive   = true  
}  
variable "cloudflare_email" {  
  description = "Email address for your Cloudflare account"  
  type        = string  
  sensitive   = true  
}  
variable "cloudflare_token" {  
  description = "Cloudflare API token"  
  type        = string  
  sensitive   = true  
}  
```

### Assign values to the variables

1. In your configuration directory, create a `.tfvars` file:  
Terminal window  
```  
touch terraform.tfvars  
```  
Terraform will automatically use these variables if the file is named `terraform.tfvars`, otherwise the variable file will need to be manually passed in.
2. Add the following variables to `terraform.tfvars`. Be sure to modify the example with your own values.  
```  
cloudflare_zone           = "example.com"  
cloudflare_zone_id        = "023e105f4ecef8ad9ca31a8372d0c353"  
cloudflare_account_id     = "372e67954025e0ba6aaa6d586b9e0b59"  
cloudflare_email          = "user@example.com"  
cloudflare_token          = "y3AalHS_E7Vabk3c3lX950F90_Xl7YtjSlzyFn_X"  
gcp_project_id            = "testvm-123"  
zone                      = "us-central1-a"  
machine_type              = "e2-medium"  
```

Warning

To prevent accidentally exposing sensitive credentials, do not save `terraform.tfvars` in your version control system. For example, if your version control is git, add `terraform.tfvars` to your `.gitignore` file.

### Configure Terraform providers

You will need to declare the [providers ↗](https://registry.terraform.io/browse/providers) used to provision the infrastructure.

1. In your configuration directory, create a `.tf` file:  
Terminal window  
```  
touch providers.tf  
```
2. Add the following providers to `providers.tf`. The `random` provider is used to generate a tunnel secret.  
   * [ Terraform (v5) ](#tab-panel-7268)  
   * [ Terraform (v4) ](#tab-panel-7269)  
```  
terraform {  
  required_providers {  
    cloudflare = {  
      source = "cloudflare/cloudflare"  
      version = ">= 5.8.2"  
    }  
    google = {  
      source = "hashicorp/google"  
    }  
  }  
  required_version = ">= 1.2"  
}  
# Providers  
provider "cloudflare" {  
  api_token    = var.cloudflare_token  
}  
provider "google" {  
  project    = var.gcp_project_id  
}  
provider "random" {  
}  
```  
```  
terraform {  
  required_providers {  
    cloudflare = {  
      source = "cloudflare/cloudflare"  
      version = ">= 4.40.0, < 5.0.0"  
    }  
    google = {  
      source = "hashicorp/google"  
    }  
    random = {  
      source = "hashicorp/random"  
    }  
  }  
  required_version = ">= 1.2"  
}  
# Providers  
provider "cloudflare" {  
  api_token    = var.cloudflare_token  
}  
provider "google" {  
  project    = var.gcp_project_id  
}  
provider "random" {  
}  
```

### Configure Cloudflare resources

The following configuration will modify settings in your Cloudflare account.

1. In your configuration directory, create a `.tf` file:  
Terminal window  
```  
touch Cloudflare-config.tf  
```
2. Add the following resources to `Cloudflare-config.tf`:  
   * [ Terraform (v5) ](#tab-panel-7264)  
   * [ Terraform (v4) ](#tab-panel-7265)  
```  
# Creates a new remotely-managed tunnel for the GCP VM.  
resource "cloudflare_zero_trust_tunnel_cloudflared" "gcp_tunnel" {  
  account_id    = var.cloudflare_account_id  
  name          = "Terraform GCP tunnel"  
  config_src    = "cloudflare"  
}  
# Reads the token used to run the tunnel on the server.  
data "cloudflare_zero_trust_tunnel_cloudflared_token" "gcp_tunnel_token" {  
  account_id   = var.cloudflare_account_id  
  tunnel_id   = cloudflare_zero_trust_tunnel_cloudflared.gcp_tunnel.id  
}  
# Creates the CNAME record that routes http_app.${var.cloudflare_zone} to the tunnel.  
resource "cloudflare_dns_record" "http_app" {  
  zone_id = var.cloudflare_zone_id  
  name    = "http_app"  
  content = "${cloudflare_zero_trust_tunnel_cloudflared.gcp_tunnel.id}.cfargotunnel.com"  
  type    = "CNAME"  
  ttl     = 1  
  proxied = true  
}  
# Configures tunnel with a published application for clientless access.  
resource "cloudflare_zero_trust_tunnel_cloudflared_config" "gcp_tunnel_config" {  
  tunnel_id  = cloudflare_zero_trust_tunnel_cloudflared.gcp_tunnel.id  
  account_id = var.cloudflare_account_id  
  config     = {  
    ingress   = [  
      {  
        hostname = "http_app.${var.cloudflare_zone}"  
        service  = "http://httpbin:80"  
      },  
      {  
        service  = "http_status:404"  
      }  
    ]  
  }  
}  
# (Optional) Routes internal IP of GCP instance through the tunnel for private network access using WARP.  
resource "cloudflare_zero_trust_tunnel_cloudflared_route" "example_tunnel_route" {  
account_id         = var.cloudflare_account_id  
tunnel_id          = cloudflare_zero_trust_tunnel_cloudflared.gcp_tunnel.id  
network            = google_compute_instance.http_server.network_interface.0.network_ip  
comment            = "Example tunnel route"  
}  
# Creates a reusable Access policy.  
resource "cloudflare_zero_trust_access_policy" "allow_emails" {  
  account_id   = var.cloudflare_account_id  
  name         = "Allow email addresses"  
  decision     = "allow"  
  include      = [  
    {  
      email = {  
        email = var.cloudflare_email  
      }  
    },  
    {  
      email_domain = {  
        domain = "@example.com"  
      }  
    }  
  ]  
}  
# Creates an Access application to control who can connect to the public hostname.  
resource "cloudflare_zero_trust_access_application" "http_app" {  
  account_id       = var.cloudflare_account_id  
  type             = "self_hosted"  
  name             = "Access application for http_app.${var.cloudflare_zone}"  
  domain           = "http_app.${var.cloudflare_zone}"  
  policies = [  
    {  
      id = cloudflare_zero_trust_access_policy.allow_emails.id  
      precedence = 1  
    }  
  ]  
}  
```  
```  
# Generates a 32-byte secret for the tunnel.  
resource "random_bytes" "tunnel_secret" {  
  byte_length = 32  
}  
# Creates a new remotely-managed tunnel for the GCP VM.  
resource "cloudflare_zero_trust_tunnel_cloudflared" "gcp_tunnel" {  
  account_id = var.cloudflare_account_id  
  name       = "Terraform GCP tunnel"  
  secret     = random_bytes.tunnel_secret.base64  
}  
# Creates the CNAME record that routes http_app.${var.cloudflare_zone} to the tunnel.  
resource "cloudflare_record" "http_app" {  
  zone_id = var.cloudflare_zone_id  
  name    = "http_app"  
  content   = "${cloudflare_zero_trust_tunnel_cloudflared.gcp_tunnel.cname}"  
  type    = "CNAME"  
  proxied = true  
}  
# Configures tunnel with a published application for clientless access.  
resource "cloudflare_zero_trust_tunnel_cloudflared_config" "gcp_tunnel_config" {  
  tunnel_id = cloudflare_zero_trust_tunnel_cloudflared.gcp_tunnel.id  
  account_id = var.cloudflare_account_id  
  config {  
    ingress_rule {  
      hostname = "${cloudflare_record.http_app.hostname}"  
      service  = "http://httpbin:80"  
    }  
    ingress_rule {  
      service  = "http_status:404"  
    }  
  }  
}  
# (Optional) Route internal IP of GCP instance through the tunnel for private network access using WARP.  
resource "cloudflare_zero_trust_tunnel_route" "example_tunnel_route" {  
account_id         = var.cloudflare_account_id  
tunnel_id          = cloudflare_zero_trust_tunnel_cloudflared.gcp_tunnel.id  
network            = google_compute_instance.http_server.network_interface.0.network_ip  
comment            = "Example tunnel route"  
}  
# Creates an Access application to control who can connect to the public hostname.  
resource "cloudflare_zero_trust_access_application" "http_app" {  
  account_id          = var.cloudflare_account_id  
  name             = "Access application for http_app.${var.cloudflare_zone}"  
  domain           = "http_app.${var.cloudflare_zone}"  
}  
# Creates a (legacy) Access policy for the Access application.  
resource "cloudflare_zero_trust_access_policy" "allow_emails" {  
  application_id = cloudflare_zero_trust_access_application.http_app.id  
  account_id        = var.cloudflare_account_id  
  name           = "Example policy for http_app.${var.cloudflare_zone}"  
  precedence     = "1"  
  decision       = "allow"  
  include {  
    email = [var.cloudflare_email]  
  }  
}  
```

To learn more about these resources, refer to the [Cloudflare provider documentation ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs).

### Configure GCP resources

The following configuration defines the specifications for the GCP virtual machine and configures a startup script to run upon boot.

1. In your configuration directory, create a `.tf` file:  
Terminal window  
```  
touch GCP-config.tf  
```
2. Add the following content to `GCP-config.tf`:  
   * [ Terraform (v5) ](#tab-panel-7266)  
   * [ Terraform (v4) ](#tab-panel-7267)  
```  
# OS the server will use  
data "google_compute_image" "image" {  
  family  = "ubuntu-2204-lts"  
  project = "ubuntu-os-cloud"  
}  
# GCP Instance resource  
resource "google_compute_instance" "http_server" {  
  name         = "test"  
  machine_type = var.machine_type  
  zone         = var.zone  
  tags         = []  
  boot_disk {  
    initialize_params {  
      image = data.google_compute_image.image.self_link  
    }  
  }  
  network_interface {  
    network = "default"  
    access_config {  
      //Ephemeral IP  
    }  
  }  
  // Optional config to make instance ephemeral  
/*  scheduling {  
    preemptible       = true  
    automatic_restart = false  
  } */  
  // Pass the tunnel token to the GCP server so that the server can install and run the tunnel upon startup.  
  metadata_startup_script = templatefile("./install-tunnel.tftpl",  
    {  
      tunnel_token = data.cloudflare_zero_trust_tunnel_cloudflared_token.gcp_tunnel_token.token  
    })  
}  
```  
```  
# OS the server will use  
data "google_compute_image" "image" {  
  family  = "ubuntu-2204-lts"  
  project = "ubuntu-os-cloud"  
}  
# GCP Instance resource  
resource "google_compute_instance" "http_server" {  
  name         = "test"  
  machine_type = var.machine_type  
  zone         = var.zone  
  tags         = []  
  boot_disk {  
    initialize_params {  
      image = data.google_compute_image.image.self_link  
    }  
  }  
  network_interface {  
    network = "default"  
    access_config {  
      //Ephemeral IP  
    }  
  }  
  // Optional config to make instance ephemeral  
/*  scheduling {  
    preemptible       = true  
    automatic_restart = false  
  } */  
  // Pass the tunnel token to the GCP server so that the server can install and run the tunnel upon startup.  
  metadata_startup_script = templatefile("./install-tunnel.tftpl",  
    {  
      tunnel_token = cloudflare_zero_trust_tunnel_cloudflared.gcp_tunnel.tunnel_token  
    })  
}  
```

### Create a startup script

The following script will install `cloudflared` and run the tunnel as a service. This example also installs a lightweight HTTP application that you can use to test connectivity.

1. In your configuration directory, create a Terraform template file:  
Terminal window  
```  
touch install-tunnel.tftpl  
```
2. Open the file in a text editor and copy and paste the following bash script:  
Terminal window  
```  
# Script to install Cloudflare Tunnel and Docker resources  
# Docker configuration  
cd /tmp  
sudo apt-get install software-properties-common  
# Retrieving the docker repository for this OS  
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -  
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"  
# The OS is updated and docker is installed  
sudo apt update -y && sudo apt upgrade -y  
sudo apt install docker docker-compose -y  
# Add the HTTPBin application and run it on localhost:8080.  
cat > /tmp/docker-compose.yml << "EOF"  
version: '3'  
services:  
  httpbin:  
    image: kennethreitz/httpbin  
    restart: always  
    container_name: httpbin  
    ports:  
      - 8080:80  
  cloudflared:  
    image: cloudflare/cloudflared:latest  
    restart: always  
    container_name: cloudflared  
    command: tunnel run --token ${tunnel_token}  
EOF  
cd /tmp  
sudo docker-compose up -d  
```

## 6\. Deploy Terraform

To deploy the configuration files:

1. Initialize your configuration directory:  
Terminal window  
```  
terraform init  
```
2. Preview everything that will be created:  
Terminal window  
```  
terraform plan  
```
3. Apply the configuration:  
Terminal window  
```  
terraform apply  
```

It may take several minutes for the GCP instance and tunnel to come online. You can view your new tunnel in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) under **Zero Trust** \> **Networks** \> **Connectors**, and your Access application and policy under **Zero Trust** \> **Access controls** \> **Applications**. The new DNS records are available on the [**DNS Records** page](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

Remove Terraform resources

If you need to roll back the configuration, run `terraform destroy` to delete everything created through Terraform. Both `terraform apply` and `terraform destroy` prompt for user input before applying the changes. To run without requiring user input, you can add the `-auto-approve` flag to the command.

## 7\. Test the connection

1. In **Networks** \> **Connectors** \> **Cloudflare Tunnels**, verify that your tunnel is active.
2. In **Access controls** \> **Applications**, verify that your Cloudflare email is allowed by the Access policy.
3. From any device, open a browser and go to `http_app.<CLOUDFLARE_ZONE>` (for example, `http_app.example.com`).  
You will see the Access login page if you have not recently logged in.
4. Log in with your Cloudflare email.  
You should see the [HTTPBin ↗](https://httpbin.org/) homepage.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/terraform/#page","headline":"Deploy Tunnels with Terraform · Cloudflare One docs","description":"Learn how to deploy a Cloudflare Tunnel using Terraform and our lightweight server-side daemon, cloudflared.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/terraform/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/","name":"Environments"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-tunnel/deployment-guides/terraform/","name":"Terraform"}}]}
```
