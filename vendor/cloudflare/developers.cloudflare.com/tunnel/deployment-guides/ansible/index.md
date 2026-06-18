---
title: Ansible
description: Deploy Cloudflare Tunnel with Ansible automation.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Ansible

Ansible is a software tool that enables at scale management of infrastructure. Ansible is agentless — all it needs to function is the ability to SSH to the target and Python installed on the target.

Ansible works alongside Terraform to streamline the Cloudflare Tunnel setup process. In this guide, you will use Terraform to deploy an SSH server on Google Cloud and create a [locally-managed tunnel](https://developers.cloudflare.com/tunnel/advanced/local-management/create-local-tunnel/) that makes the server available over the Internet. Terraform will automatically run an Ansible playbook that installs and configures `cloudflared` on the server.

## Prerequisites

To complete the steps in this guide, you will need:

* [A Google Cloud Project ↗](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating%5Fa%5Fproject) and [GCP CLI installed and authenticated ↗](https://cloud.google.com/sdk/docs/install).
* [Basic knowledge of Terraform](https://developers.cloudflare.com/tunnel/deployment-guides/terraform/) and [Terraform installed](https://developer.hashicorp.com/terraform/tutorials/certification-associate-tutorials/install-cli).
* [A zone on Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).
* [A Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Cloudflare Tunnel` and `DNS` permissions.

## 1\. Install Ansible

Refer to the [Ansible installation instructions ↗](https://docs.ansible.com/ansible/latest/installation%5Fguide/index.html).

## 2\. (Optional) Create an SSH key pair

Terraform and Ansible require an unencrypted SSH key to connect to the GCP server. If you do not already have a key, you can generate one as follows:

1. Open a terminal and type the following command:  
Terminal window  
```  
ssh-keygen -t rsa -f ~/.ssh/gcp_ssh -C <username in GCP>  
```
2. When prompted for a passphrase, press the `Enter` key twice to leave it blank. Terraform cannot decode encrypted private keys.

Two files will be generated: `gcp_ssh` which contains the private key, and `gcp_ssh.pub` which contains the public key.

## 3\. Create a configuration directory

1. Create a folder for your Terraform and Ansible configuration files:  
Terminal window  
```  
mkdir ansible-tunnel  
```
2. Change to the new directory:  
Terminal window  
```  
cd ansible-tunnel  
```

## 4\. Create Terraform configuration files

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

### Configure Cloudflare resources

The following configuration will modify settings in your Cloudflare account.

1. In your configuration directory, create a `.tf` file:  
Terminal window  
```  
touch Cloudflare-config.tf  
```
2. Add the following resources to `Cloudflare-config.tf`:  
```  
# Creates a new remotely-managed tunnel for the GCP VM.  
resource "cloudflare_zero_trust_tunnel_cloudflared" "gcp_tunnel" {  
  account_id    = var.cloudflare_account_id  
  name          = "Ansible GCP tunnel"  
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
        service  = "http://localhost:80"  
      },  
      {  
        service  = "http_status:404"  
      }  
    ]  
  }  
}  
```

### Configure GCP resources

The following configuration defines the specifications for the GCP virtual machine and installs Python3 on the machine. Python3 allows Ansible to configure the GCP instance instead of having to run a [startup script](https://developers.cloudflare.com/tunnel/deployment-guides/terraform/#create-a-startup-script) on boot.
1. In your configuration directory, create a `.tf` file:  
Terminal window  
```  
touch GCP-config.tf  
```
2. Open the file in a text editor and copy and paste the following example. Be sure to insert your own GCP username and SSH key pair.  
```  
# Selects the OS for the GCP VM.  
data "google_compute_image" "image" {  
family  = "ubuntu-2204-lts"  
project = "ubuntu-os-cloud"  
}  
# Sets up a GCP VM instance.  
resource "google_compute_instance" "http_server" {  
name         = "ansible-inst"  
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
    // Ephemeral IP  
    }  
}  
scheduling {  
    preemptible = true  
    automatic_restart = false  
}  
// Installs Python3 on the VM.  
provisioner "remote-exec" {  
    inline = [  
    "sudo apt update", "sudo apt install python3 -y",  "echo Done!"  
    ]  
    connection {  
    host = self.network_interface.0.access_config.0.nat_ip  
    user = "<username in GCP>"  
    type = "ssh"  
    private_key= file("<path to private key>")  
    }  
}  
provisioner "local-exec" {  
    // If specifying an SSH key and user, add `--private-key <path to private key> -u var.name`  
    command = "ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -u <username in GCP> --private-key <path to private key> -i ${self.network_interface.0.access_config.0.nat_ip}, playbook.yml"  
}  
metadata = {  
    cf-email     = var.cloudflare_email  
    cf-zone      = var.cloudflare_zone  
    ssh-keys     = "<username in GCP>:${file("<path to public key>")}"  
}  
depends_on = [  
    local_file.tf_ansible_vars_file  
]  
}  
```

### Export variables to Ansible

The following Terraform resource exports the [tunnel token](https://developers.cloudflare.com/tunnel/configuration/#tunnel-tokens) and other variables to `tf_ansible_vars_file.yml`. Ansible will use the tunnel token to configure and run `cloudflared` on the server.
1. In your configuration directory, create a new `tf` file:  
Terminal window  
```  
touch export.tf  
```
2. Copy and paste the following content into `export.tf`:  
```  
resource "local_file" "tf_ansible_vars_file" {  
  content = <<-DOC  
    # Ansible vars_file containing variable values from Terraform.  
    tunnel_id: ${cloudflare_zero_trust_tunnel_cloudflared.gcp_tunnel.id}  
    tunnel_name: ${cloudflare_zero_trust_tunnel_cloudflared.gcp_tunnel.name}  
    tunnel_token: ${data.cloudflare_zero_trust_tunnel_cloudflared_token.gcp_tunnel_token.token}  
    DOC  
  filename = "./tf_ansible_vars_file.yml"  
}  
```

## 5\. Create the Ansible playbook

Ansible playbooks are YAML files that declare the configuration Ansible will deploy.

1. Create a new `.yml` file:  
Terminal window  
```  
touch playbook.yml  
```
2. Open the file in a text editor and copy and paste the following content:

```

---

- hosts: all

  become: yes

  # Import tunnel variables into the VM.

  vars_files:

    - ./tf_ansible_vars_file.yml

  # Execute the following commands on the VM.

  tasks:

    - name: Download the cloudflared Linux package.

      shell: wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb

    - name: Depackage cloudflared.

      shell: sudo dpkg -i cloudflared-linux-amd64.deb

    - name: Install the tunnel as a systemd service.

      shell: "cloudflared service install {{ tunnel_token }}"

    - name: Start the tunnel.

      systemd:

        name: cloudflared

        state: started

        enabled: true

        masked: no

    - name: Deploy an example Apache web server on port 80.

      shell: apt update && apt -y install apache2

    - name: Edit the default Apache index file.

      copy:

        dest: /var/www/html/index.html

        content: |

          <!DOCTYPE html>

          <html>

          <body>

            <h1>Hello Cloudflare!</h1>

            <p>This page was created for a Cloudflare demo.</p>

          </body>

          </html>


```

[Keywords ↗](https://docs.ansible.com/ansible/latest/reference%5Fappendices/playbooks%5Fkeywords.html#play) define how Ansible will execute the configuration. In the example above, the `vars_files` keyword specifies where variable definitions are stored, and the `tasks` keyword specifies the actions Ansible will perform.

[Modules ↗](https://docs.ansible.com/ansible/2.9/user%5Fguide/modules.html) specify what tasks to complete. In this example, the `copy` module creates a file and populates it with content.

## 6\. Deploy the configuration

Once you have created the configuration files, you can deploy them through Terraform. The Ansible deployment happens within the Terraform deployment when the `ansible-playbook` command is run.

1. Initialize your configuration directory:  
Terminal window  
```  
terraform init  
```
2. (Optional) Preview everything that will be created:  
Terminal window  
```  
terraform plan  
```
3. Deploy the configuration:  
Terminal window  
```  
terraform apply  
```
It may take several minutes for the GCP instance and tunnel to come online. You can view your new tunnel in the [Cloudflare dashboard](https://dash.cloudflare.com/) under **Networking** \> **Tunnels**.

## 7\. Test the connection

To test, open a browser and go to `http://http_app.<CLOUDFLARE_ZONE>.com` (for example, `http_app.example.com`). You should see the **Hello Cloudflare!** test page.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/deployment-guides/ansible/#page","headline":"Ansible · Cloudflare Docs","description":"Deploy Cloudflare Tunnel with Ansible automation.","url":"https://developers.cloudflare.com/tunnel/deployment-guides/ansible/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Integration"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/deployment-guides/","name":"Deployment guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/tunnel/deployment-guides/ansible/","name":"Ansible"}}]}
```
