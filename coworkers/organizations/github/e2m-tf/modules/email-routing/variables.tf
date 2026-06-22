variable "zone_id" {
  type = string
}

variable "domain" {
  type = string
}

variable "worker_name" {
  description = "Name of the Worker that handles inbound mail."
  type        = string
}

variable "roles" {
  description = "Local-parts; each becomes <role>@<domain> routed to the Worker."
  type        = list(string)
}
